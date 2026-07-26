import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appInputValidation]',
  standalone: true,
})
export class InputValidationDirective {
  @Input() errorMessage = 'Campo inválido';

  ngOnInit() {
    console.log('OnInit errorMessage:', this.errorMessage);
  }
}
