import {
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputValidation]',
  standalone: true,
})
export class InputValidationDirective {
  private readonly _ngControl = inject(NgControl, { self: true });
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer2 = inject(Renderer2);

  private errorElement: HTMLElement | null = null;

  @Input() errorMessage = 'Campo inválido';

  ngOnInit() {
    this._ngControl.statusChanges?.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this.updateStatus();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['errorMessage'] && this.errorElement) {
      this._renderer2.setProperty(this.errorElement, 'textContent', this.errorMessage);
    }
  }

  @HostListener('blur')
  onBlur() {
    this.updateStatus();
  }

  private updateStatus() {
    const control = this._ngControl.control;

    if (!control) return;

    const isInvalid = control.invalid && control.touched;

    if (isInvalid) {
      this.setInvalidStyles();
      this.showError();
    } else {
      this.setValidStyles();
      this.hideError();
    }
  }

  private setInvalidStyles() {
    const el = this._elementRef.nativeElement;

    this._renderer2.removeClass(el, 'border-zinc-800');
    this._renderer2.removeClass(el, 'focus:border-violet-500');
    this._renderer2.removeClass(el, 'focus:ring-violet-500');

    this._renderer2.addClass(el, 'border-red-500');
    this._renderer2.addClass(el, 'focus:border-red-500');
    this._renderer2.addClass(el, 'focus:ring-red-500');
  }

  private setValidStyles() {
    const el = this._elementRef.nativeElement;

    this._renderer2.removeClass(el, 'border-red-500');
    this._renderer2.removeClass(el, 'focus:border-red-500');
    this._renderer2.removeClass(el, 'focus:ring-red-500');

    this._renderer2.addClass(el, 'border-zinc-800');
    this._renderer2.addClass(el, 'focus:border-violet-500');
    this._renderer2.addClass(el, 'focus:ring-violet-500');
  }

  private hideError() {
    if (!this.errorElement) return;

    const parent = this._elementRef.nativeElement.parentNode;
    this._renderer2.removeChild(parent, this.errorElement);
    this.errorElement = null;
  }

  private showError() {
    if (this.errorElement) return;

    this.errorElement = this._renderer2.createElement('p');
    const text = this._renderer2.createText(this.errorMessage);
    this._renderer2.appendChild(this.errorElement, text);

    this._renderer2.addClass(this.errorElement, 'text-red-500');
    this._renderer2.addClass(this.errorElement, 'text-sm');
    this._renderer2.addClass(this.errorElement, 'mt-1');

    const parent = this._elementRef.nativeElement.parentNode;
    const nextSibling = this._elementRef.nativeElement.nextSibling;

    if (nextSibling) {
      this._renderer2.insertBefore(parent, this.errorElement, nextSibling);
    } else {
      this._renderer2.appendChild(parent, this.errorElement);
    }
  }
}
