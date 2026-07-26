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
      address: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[^,]+,\s*[^,]+,\s*[^,]+$/),
      ]),
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
    academic: new FormArray([this.createAcademicFormGroup()], [Validators.required]),
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

  get academicFormArray() {
    return this.curriculumForm.get('academic') as FormArray;
  }

  createAcademicFormGroup() {
    return new FormGroup({
      institution: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      inProgress: new FormControl(false),
    });
  }

  resetProfessionalFormArray() {
    this.professionalFormArray.clear();
    this.professionalFormArray.push(
      new FormGroup({
        position: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
      }),
    );
  }

  resetAcademicFormArray() {
    this.academicFormArray.clear();
    this.academicFormArray.push(this.createAcademicFormGroup());
  }
}
