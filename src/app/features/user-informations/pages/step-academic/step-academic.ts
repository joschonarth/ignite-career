import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurriculumFormStore } from '../../../../core/services/curriculum-form-store';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputValidationDirective } from '../../../../shared/directives/input-validation-directive';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-step-academic',
  imports: [RouterLink, ReactiveFormsModule, InputValidationDirective],
  templateUrl: './step-academic.html',
})
export class StepAcademic {
  readonly _curriculumFormStore = inject(CurriculumFormStore);
  private readonly _router = inject(Router);

  academicArrayControls = toSignal(
    this._curriculumFormStore.academicFormArray.valueChanges.pipe(
      map(() => [...this._curriculumFormStore.academicFormArray.controls]),
    ),
    {
      initialValue: [...this._curriculumFormStore.academicFormArray.controls],
    },
  );

  addAcademic() {
    this._curriculumFormStore.academicFormArray.push(
      this._curriculumFormStore.createAcademicFormGroup(),
    );
  }

  removeAcademic(index: number) {
    this._curriculumFormStore.academicFormArray.removeAt(index);
  }

  onInProgressChange(index: number) {
    const group = this._curriculumFormStore.academicFormArray.at(index) as FormGroup;
    const inProgress = group.get('inProgress')?.value as boolean;
    const endDateControl = group.get('endDate') as FormControl;

    if (inProgress) {
      endDateControl.setValue('');
      endDateControl.clearValidators();
      endDateControl.disable();
    } else {
      endDateControl.enable();
      endDateControl.setValidators([Validators.required]);
    }

    endDateControl.updateValueAndValidity();
  }

  goToResume() {
    this._router.navigate(['/resume-informations']);
  }
}
