import { Routes } from '@angular/router';
import { StepPersonal } from './features/user-informations/pages/step-personal/step-personal';
import { StepProfessional } from './features/user-informations/pages/step-professional/step-professional';

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
];
