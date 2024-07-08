import { APP_INITIALIZER, enableProdMode, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  Auth,
  connectAuthEmulator,
  getAuth,
  provideAuth,
} from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { connectAuthEmulatorInDevMode } from './app/emulators';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: (auth: Auth) => {
        return () => {
          return auth.authStateReady();
        };
      },
      deps: [Auth],
      multi: true,
    },
    provideFirebaseApp(() => initializeApp(environment.firebaseOptions)),
    provideAuth(() => {
      const auth = getAuth();
      connectAuthEmulatorInDevMode(auth);
      return auth;
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
});
