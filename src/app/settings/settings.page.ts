import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { httpsCallable, Functions } from '@angular/fire/functions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SettingsPage implements OnInit {
  private functions = inject(Functions);
  userPaymentMethods: any;

  constructor(private readonly auth: Auth) {}

  ngOnInit() {
    const listUserPaymentsMethods = httpsCallable(this.functions, 'addMessage');
    listUserPaymentsMethods({})
      .then((result) => {
        // Read result of the Cloud Function.
        /** @type {any} */
        const data = result.data;
        // const sanitizedMessage = data.text;
      })
      .catch((error) => {
        // Getting the Error details.
        const code = error.code;
        const message = error.message;
        const details = error.details;
        // ...
      });
    return;
  }

  signout() {
    this.auth.signOut();
  }
}
