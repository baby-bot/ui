import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription, filter, tap } from 'rxjs';
import { NumberPurchaseStore } from 'src/app/store';
import {
  IonSelect,
  IonSelectOption,
  IonList,
  IonItem,
  IonInput,
  IonRadioGroup,
  IonRadio,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-number-search',
  templateUrl: './number-search.component.html',
  styleUrls: ['./number-search.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonRadio,
    IonRadioGroup,
    IonInput,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonList,
    ReactiveFormsModule,
  ],
})
export class NumberSearchComponent implements OnInit, OnDestroy {
  readonly numberPurchaseStore = inject(NumberPurchaseStore);
  readonly formGroup = new FormGroup({
    numberType: new FormControl('', Validators.required),
    countryCode: new FormControl('US', Validators.required),
    areaCode: new FormControl('972'),
  });
  private readonly _subscriptions: Subscription[] = [];
  constructor() {}

  ngOnInit() {
    this._subscriptions.push(
      this.formGroup.valueChanges
        .pipe(
          filter((_) => this.formGroup.valid),
          tap((x) => this.numberPurchaseStore.updateFilters(x))
        )
        .subscribe()
    );
    return;
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((x) => x.unsubscribe());
  }

  reset() {
    this.formGroup.reset();
  }
}
