import { ENVIRONMENT } from '@ams/environments/environment';
import { type People, type PersonForm } from '@ams/shared/models/people.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { type Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PeopleDataService {
  readonly #httpClient = inject(HttpClient);
  readonly #backendUrl = ENVIRONMENT.BACK_END_SERVER;

  getPeoples(): Observable<Array<People>> {
    return this.#httpClient.get<Array<People>>(`${this.#backendUrl}/api/peoples`);
  }

  getRandomPeople(): Observable<People> {
    return this.#httpClient.get<People>(`${this.#backendUrl}/api/peoples/random`);
  }

  postPeople(person: PersonForm): Observable<void> {
    return this.#httpClient.post<void>(`${this.#backendUrl}/api/peoples`, person);
  }
}
