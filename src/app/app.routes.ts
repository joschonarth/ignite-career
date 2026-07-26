import { Routes } from '@angular/router';
import { StepPersonal } from './features/user-informations/pages/step-personal/step-personal';
import { StepProfessional } from './features/user-informations/pages/step-professional/step-professional';
import { StepAcademic } from './features/user-informations/pages/step-academic/step-academic';
import { ResumeInformations } from './features/user-informations/pages/resume-informations/resume-informations';

export const routes: Routes = [
  { path: '', redirectTo: 'personal', pathMatch: 'full' },
  {
    path: 'personal',
    component: StepPersonal,
  },
  {
    path: 'professional',
    component: StepProfessional,
  },
  {
    path: 'academic',
    component: StepAcademic,
  },
  {
    path: 'resume-informations',
    component: ResumeInformations,
  },
];
