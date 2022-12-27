import { type Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'peoples', pathMatch: 'full' },
  { path: 'peoples', loadChildren: async () => await import('@ams/feature/people.route') },
];
