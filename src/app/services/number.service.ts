import { Injectable, inject } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import {
  PurchaseNumberQueryFilters,
  PurchaseNumberQueryResult,
} from '@baby-bot/types';
import { from, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NumberService {
  readonly functions = inject(Functions);
  private readonly listNumbers = httpsCallable<
    Partial<PurchaseNumberQueryFilters>,
    PurchaseNumberQueryResult[]
  >(this.functions, 'listNumbers');

  constructor() {
    return;
  }

  queryNumbers(query: Partial<PurchaseNumberQueryFilters>) {
    return from(this.listNumbers(query)).pipe(map((x) => x.data));
  }
}
