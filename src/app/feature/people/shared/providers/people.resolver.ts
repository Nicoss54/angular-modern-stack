import { PeopleService } from '@ams/core/services/people.service';
import { type People } from '@ams/shared/models/people.model';
import { inject } from '@angular/core';
import { type ActivatedRouteSnapshot } from '@angular/router';
import { type Observable } from 'rxjs';

export function getPeopleByIdResolver(route: ActivatedRouteSnapshot): Observable<People> {
  const peopleService = inject(PeopleService);
  const idPeople = route.paramMap.get('id') as string;
  return peopleService.retrievePeople(idPeople);
}
