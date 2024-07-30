import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  serverTimestamp,
  FieldValue,
  where,
} from '@angular/fire/firestore';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Activity } from '../types';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth } from '@angular/fire/auth';
import { ActivitiesStore } from '../store';
import { getState } from '@ngrx/signals';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    JsonPipe,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivitiesPage implements OnInit {
  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore
  readonly activitiesStore = inject(ActivitiesStore);

  @ViewChild(IonModal) modal: IonModal;
  createActivitySuccessToastOpen = false;

  activityName = new FormControl('', Validators.required);

  activities$: Observable<Activity[]>;

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  constructor(private readonly router: Router, private auth: Auth) {
    effect(() => {
      // 👇 The effect will be re-executed whenever the state changes.
      const state = getState(this.activitiesStore);
      console.log('books state changed', state);
    });
    const activityCollection = collection(
      this.firestore,
      'activities'
    ) as CollectionReference<Activity>;
    const userActivitiesQuery = query(
      activityCollection,
      where('ownerId', '==', this.auth.currentUser.uid)
    );
    this.activities$ = collectionData(userActivitiesQuery) as Observable<
      Activity[]
    >;
  }

  ngOnInit() {
    return;
  }

  confirm() {
    if (this.activityName.valid) {
      addDoc(collection(this.firestore, 'activities'), <Omit<Activity, 'id'>>{
        name: this.activityName.value,
        ownerId: this.auth.currentUser.uid,
        createdAt: serverTimestamp(),
      }).then((x) => {
        console.log(x.id);
        this.modal.dismiss();
      });
    }
  }

  cancel() {
    this.modal.dismiss();
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  createActivityToastSetOpen() {
    this.createActivitySuccessToastOpen = true;
  }
}
