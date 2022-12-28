import { type Routes } from '@angular/router';
import { EditComponent } from './people/edit/edit.component';
import { ListComponent } from './people/list/list.component';
import { RandomComponent } from './people/random/random.component';
import { getPeopleByIdResolver } from './people/shared/providers/people.resolver';

const PEOPLE_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'random', pathMatch: 'prefix' },
      { path: 'random', component: RandomComponent },
      { path: 'list', component: ListComponent },
      { path: 'edit/:id', component: EditComponent, resolve: { person: getPeopleByIdResolver } },
    ],
  },
];

export default PEOPLE_ROUTES;
