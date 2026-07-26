import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { CurriculumFormStore } from '../../../../core/services/curriculum-form-store';

@Component({
  selector: 'app-resume-informations',
  imports: [TitleCasePipe, DatePipe],
  templateUrl: './resume-informations.html',
})
export class ResumeInformations {
  private readonly _router = inject(Router);
  private readonly _curriculumFormStore = inject(CurriculumFormStore);

  personalData = this._curriculumFormStore.personalFormGroup.value;
  professionalData = this._curriculumFormStore.professionalFormArray.value;
  academicData = this._curriculumFormStore.academicFormArray.value;

  newCurriculum() {
    this._curriculumFormStore.curriculumFormGroup.reset();
    this._curriculumFormStore.resetProfessionalFormArray();
    this._curriculumFormStore.resetAcademicFormArray();
    this._router.navigate(['/']);
  }
}
