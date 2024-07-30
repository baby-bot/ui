import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './services';
import { Auth } from '@angular/fire/auth';
import { ActivitiesStore } from './store';
// import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  readonly activitiesStore = inject(ActivitiesStore);
  constructor(
    private readonly authService: AuthService,
    private readonly auth: Auth
  ) {
    this.activitiesStore.loadUserActivities(null);
    // loadStripe(
    //   'pk_test_51BHNAwJddnDhGA7ArkYn0ViyjA3AtIILQxuQll7kiEiQFutfM2Oc20eQzVD3dvYj6ezPdPekpgXeKEjaN2CqwOwp00x1eXKfbJ'
    // ).then((stripe) => {
    //   console.log('Stripe loaded', stripe);
    // });
  }
}
