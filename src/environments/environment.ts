// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { FirebaseOptions } from 'firebase/app';

const firebaseOptions: FirebaseOptions = {
  projectId: 'my-local-project',
  appId: '1:173955966068:web:58b5fc11d0a6f2d01c9d21',
  storageBucket: 'baby-bot-d8ef9.appspot.com',
  apiKey: 'AIzaSyDWY3GVBhwfpMJb-rNA4a4My4XpdcJTwmI',
  authDomain: 'baby-bot-d8ef9.firebaseapp.com',
  messagingSenderId: '173955966068',
  measurementId: 'G-FHQX26X0MB',
};

export const environment = {
  production: false,
  firebaseOptions,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
