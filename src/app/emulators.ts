import { connectAuthEmulator, Auth } from '@angular/fire/auth';
import { connectDatabaseEmulator, Database } from '@angular/fire/database';
import { connectFirestoreEmulator, Firestore } from '@angular/fire/firestore';
import { connectFunctionsEmulator, Functions } from '@angular/fire/functions';
import { connectStorageEmulator, Storage } from '@angular/fire/storage';

export const connectAuthEmulatorInDevMode = (auth: Auth) =>
  connectAuthEmulator(auth, 'http://192.168.1.82:9099', {
    disableWarnings: true,
  });

export const connectFirestoreEmulatorInDevMode = (firestore: Firestore) =>
  connectFirestoreEmulator(firestore, '192.168.1.82', 8080);

export const connectStorageEmulatorInDevMode = (storage: Storage) =>
  connectStorageEmulator(storage, '192.168.1.82', 9199);

export const connectFunctionsEmulatorInDevMode = (functions: Functions) =>
  connectFunctionsEmulator(functions, '192.168.1.82', 5001);

export const connectDatabaseEmulatorInDevMode = (database: Database) =>
  connectDatabaseEmulator(database, '192.168.1.82', 9000);
