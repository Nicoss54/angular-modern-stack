import { type People } from '@ams/shared/models/people.model';
import { inject, Injectable } from '@angular/core';
import { type Observable } from 'rxjs';
import { PeopleDataService } from '../data-services/people-data.service';

@Injectable({ providedIn: 'root' })
export class PeopleService {
  readonly #peopleDataService = inject(PeopleDataService);

  retrieveRandomPeople(): Observable<People> {
    return this.#peopleDataService.getRandomPeople();
  }

  retrievePeoples(): Observable<People[]> {
    return this.#peopleDataService.getPeoples();
  }
}
