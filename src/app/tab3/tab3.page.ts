import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonLabel,
  IonItem,
  IonInput,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import {
  Auth,
  PhoneAuthProvider,
  RecaptchaVerifier,
  User,
  linkWithCredential,
  signInWithPhoneNumber,
  updateProfile,
} from '@angular/fire/auth';
import * as firebase from 'firebase/compat/app';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonCardSubtitle,
    IonButton,
    IonCard,
    IonLabel,
    IonItem,
    IonInput,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class Tab3Page implements OnInit, OnDestroy {
  user: User | null = null;
  userProfileForm: FormGroup;
  originalDisplayName: string = '';
  private displayNameSubscription: Subscription;

  phoneNumberForm: FormGroup;
  verificationForm: FormGroup;
  verificationSent = false;
  verificationId?: string;

  constructor(private readonly afAuth: Auth, private fb: FormBuilder) {
    afAuth.onAuthStateChanged((user) => {
      this.user = user;
    });
    this.userProfileForm = this.fb.group({
      providerId: [{ value: '', disabled: true }],
      displayName: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      emailVerified: [{ value: '', disabled: true }],
    });

    this.displayNameSubscription = this.userProfileForm
      .get('displayName')!
      .valueChanges.subscribe((value) => {
        if (this.user) {
          this.userProfileForm
            .get('displayName')!
            .setValue(value, { emitEvent: false });
        }
      });

    this.phoneNumberForm = this.fb.group({
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+[1-9]\d{1,14}$/)],
      ],
    });

    this.verificationForm = this.fb.group({
      verificationCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = this.afAuth.currentUser;

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.originalDisplayName = user.displayName || '';
        this.userProfileForm.patchValue({
          providerId: user.providerData[0]?.providerId || '',
          displayName: this.originalDisplayName,
          email: user.email || '',
          emailVerified: user.emailVerified ? 'Yes' : 'No',
        });
      }
    });
  }

  updateDisplayName() {
    if (this.user) {
      const displayName = this.userProfileForm.get('displayName')?.value;
      if (displayName !== this.originalDisplayName) {
        updateProfile(this.user, { displayName })
          .then(() => {
            this.originalDisplayName = displayName;
            // Handle successful update
          })
          .catch((error) => {
            // Handle error
            console.error('Error updating display name:', error);
          });
      }
    }
  }

  ngOnDestroy(): void {
    this.displayNameSubscription.unsubscribe();
  }

  canSave(): boolean {
    return (
      this.userProfileForm.get('displayName')?.value !==
      this.originalDisplayName
    );
  }

  logout() {
    this.afAuth.signOut();
  }

  async sendVerificationCode() {
    const phoneNumber = this.phoneNumberForm.get('phoneNumber')?.value;

    const appVerifier = new RecaptchaVerifier(
      this.afAuth,
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response: any) => {
          this.sendVerificationCode();
        },
      }
    );

    try {
      const confirmationResult = await signInWithPhoneNumber(
        this.afAuth,
        phoneNumber,
        appVerifier
      );

      this.verificationId = confirmationResult.verificationId;
      this.verificationSent = true;
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  }

  async verifyCode() {
    const verificationCode =
      this.verificationForm.get('verificationCode')?.value;
    new PhoneAuthProvider(this.afAuth);
    const credential = firebase.default.auth.PhoneAuthProvider.credential(
      this.verificationId!,
      verificationCode
    );

    try {
      await linkWithCredential(this.user!, credential);

      alert('Phone number verified successfully!');
      this.verificationSent = false;
      this.phoneNumberForm.reset();
      this.verificationForm.reset();
    } catch (error) {
      console.error('Error verifying phone number:', error);
    }
  }
}
