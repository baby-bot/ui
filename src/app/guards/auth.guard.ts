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
 * Redirects a non logged in user to the landing page, othwise continues navigation.
 */
export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // your  logic goes here
  var loggedIn: boolean = inject(AuthService).isUserLoggedIn(); // TODO: get this information from the authentication service.

  if (loggedIn) {
    return true;
  }

  return inject(Router).parseUrl('/landing');
};
