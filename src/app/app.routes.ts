import { Routes } from '@angular/router';
import { authGuard, notAuthGuard } from './guards';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard], 
    children: [
      {
        path: '',
        loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes)
      }
    ]
  },
  {
    path: 'landing',
    canActivate: [notAuthGuard],
    loadComponent: () => import('./pages').then( m => m.LandingPage)
  },
];
