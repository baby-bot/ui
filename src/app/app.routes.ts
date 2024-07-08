import { Routes } from '@angular/router';
import { authGuard, nonAuthGuard } from './guards';

export const routes: Routes = [
  {
    path: '',
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
    loadComponent: () => import('./pages').then((m) => m.LandingPage),
  },
];
