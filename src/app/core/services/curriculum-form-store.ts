import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CurriculumFormStore {
  private readonly curriculumForm = new FormGroup({
    personal: new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl(null, [Validators.required, Validators.min(18)]),
      address: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      maritalStatus: new FormControl('', [Validators.required]),
    }),
    professional: new FormArray(
      [
        new FormGroup({
          position: new FormControl('', [Validators.required]),
          company: new FormControl('', [Validators.required]),
          description: new FormControl('', [Validators.required]),
        }),
      ],
      [Validators.required],
    ),
  });

  get curriculumFormGroup() {
    return this.curriculumForm;
  }

  get personalFormGroup() {
    return this.curriculumForm.get('personal') as FormGroup;
  }

  get professionalFormArray() {
    return this.curriculumForm.get('professional') as FormArray;
  }
}
