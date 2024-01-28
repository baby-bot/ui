import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../services';

/**
 *
 * @param next
 * @param state
 * @returns true | urlTree
 *
 * Prevents a logged in user from visiting the landing page
 */
export const notAuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  var loggedIn: boolean = inject(AuthService).isUserLoggedIn();

  if (loggedIn) {
    return inject(Router).parseUrl('/');
  }

  return true;
};
