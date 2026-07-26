import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CurriculumFormStore } from '../../../../core/services/curriculum-form-store';
import { ReactiveFormsModule } from '@angular/forms';
import { StatesAndCitiesApi } from '../../../../core/services/states-and-cities-api';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-step-personal',
  imports: [ReactiveFormsModule],
  templateUrl: './step-personal.html',
})
export class StepPersonal {
  readonly _curriculumFormStore = inject(CurriculumFormStore);
  private readonly _router = inject(Router);
  private readonly _statesAndCitiesApi = inject(StatesAndCitiesApi);

  statesResource = rxResource({
    params: () => true,
    stream: () => this._statesAndCitiesApi.getStates(),
  });

  statesList = computed(() => {
    const ERROR_ON_RESPONSE = !!this.statesResource.error();

    if (ERROR_ON_RESPONSE) return [];

    return this.statesResource.value();
  });

  goToProfessional() {
    this._router.navigate(['/professional']);
  }
}
