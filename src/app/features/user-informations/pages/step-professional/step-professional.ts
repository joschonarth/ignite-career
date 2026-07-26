import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumFormStore } from '../../../../core/services/curriculum-form-store';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputValidationDirective } from '../../../../shared/directives/input-validation-directive';

@Component({
  selector: 'app-step-professional',
  imports: [RouterLink, ReactiveFormsModule, InputValidationDirective],
  templateUrl: './step-professional.html',
})
export class StepProfessional {
  readonly _curriculumFormStore = inject(CurriculumFormStore);

  addExperience() {
    this._curriculumFormStore.professionalFormArray.push(
      new FormGroup({
        position: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
      }),
    );
  }

  removeExperience(index: number) {
    this._curriculumFormStore.professionalFormArray.removeAt(index);
  }

  submit() {
    alert('🚀 Currículo enviado para a órbita!');
  }
}
