import { DestroyRef, Directive, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputValidation]',
  standalone: true,
})
export class InputValidationDirective {
  private readonly _ngControl = inject(NgControl, { self: true });
  private readonly _destroyRef = inject(DestroyRef);

  @Input() errorMessage = 'Campo inválido';

  ngOnInit() {
    console.log('OnInit errorMessage:', this.errorMessage);

    this._ngControl.statusChanges?.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this.updateStatus();
    });
  }

  private updateStatus() {
    const control = this._ngControl.control;

    if (!control) return;

    const isInvalid = control.invalid && control.touched;

    if (isInvalid) {
      console.log('Está inválido');
    } else {
      console.log('Está válido');
    }
  }
}
