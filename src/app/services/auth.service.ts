import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  setPersistence,
  Persistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

export interface User {
  id: string;
  email: string;
  displayName: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly auth: Auth, private readonly router: Router) {
    auth.setPersistence(browserLocalPersistence).then(() => {});
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        router.navigate(['/landing']);
      }
    });
  }
}
