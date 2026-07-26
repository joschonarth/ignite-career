import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IStatesResponse, StatesListResponse } from '../../shared/models/states-response';

@Injectable({
  providedIn: 'root',
})
export class StatesAndCitiesApi {
  private readonly _httpClient = inject(HttpClient);

  getStates(): Observable<StatesListResponse> {
    return this._httpClient
      .post<IStatesResponse>('https://countriesnow.space/api/v0.1/countries/states', {
        country: 'Brazil',
      })
      .pipe(map((statesResponse) => statesResponse.data.states));
  }

  getCities(state: string) {}
}
