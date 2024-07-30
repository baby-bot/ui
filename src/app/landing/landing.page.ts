import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LandingPage implements OnInit {
  private readonly authenticationInProgress = new BehaviorSubject<boolean>(
    false
  );
  readonly authenticationInProgress$ =
    this.authenticationInProgress.asObservable();

  constructor(private readonly router: Router) {}

  ngOnInit() {
    return;
  }

  async loginWithGoogle() {
    try {
      this.authenticationInProgress.next(true);

      const result = await FirebaseAuthentication.signInWithGoogle({});
      if (result.user === null) {
        // User cancelled sign-in flow.
        this.authenticationInProgress.next(false);
      }

      // navigate to home page
      this.router.navigate(['/']);
      this.authenticationInProgress.next(false);

      // else keep the auth
    } catch (err) {
      this.authenticationInProgress.next(false);
    }
  }
}
