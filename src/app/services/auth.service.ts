import { Injectable, inject } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { browserLocalPersistence } from 'firebase/auth';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$ = user(this.afAuth);

  constructor(private readonly afAuth: Auth, readonly router: Router) {
    afAuth.setPersistence(browserLocalPersistence).then(() => {});
    afAuth.onAuthStateChanged((user) => {
      if (user === null) {
        router.navigate(['/landing']);
      }
    });
  }
}
