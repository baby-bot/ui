import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../types';
import {
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  readonly _firestore = inject(Firestore);
  readonly auth = inject(Auth);

  constructor() {
    return;
  }

  list(): Observable<Activity[]> {
    const activityCollection = collection(
      this._firestore,
      'activities'
    ) as CollectionReference<Activity>;
    const userActivitiesQuery = query(
      activityCollection,
      where('ownerId', '==', this.auth.currentUser.uid)
    );
    return collectionData(userActivitiesQuery) as Observable<Activity[]>;
  }
}
