import { Routes } from '@angular/router';
import { authGuard, nonAuthGuard } from './guards';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'activity/:id',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: 'landing',
    canActivate: [nonAuthGuard],
    loadComponent: () =>
      import('./landing/landing.page').then((m) => m.LandingPage),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then((m) => m.SettingsPage),
  },
];
