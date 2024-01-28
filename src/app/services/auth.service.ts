import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor() {
    return;
  }

  isUserLoggedIn(): boolean {
    return false;
  }
}
