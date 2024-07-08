import { Device } from '@capacitor/device';
import { initializeApp } from 'firebase/app';

export const initFirebase = async () => {
  const device = await Device.getInfo();
  if (device.platform !== 'web') {
    return;
  }

  // Your web app's Firebase configuration
  // need to move these to environment files
  const firebaseConfig = {
    apiKey: 'AIzaSyDWY3GVBhwfpMJb-rNA4a4My4XpdcJTwmI',
    authDomain: 'baby-bot-d8ef9.firebaseapp.com',
    projectId: 'baby-bot-d8ef9',
    storageBucket: 'baby-bot-d8ef9.appspot.com',
    messagingSenderId: '173955966068',
    appId: '1:173955966068:web:58b5fc11d0a6f2d01c9d21',
    measurementId: 'G-FHQX26X0MB',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
};
