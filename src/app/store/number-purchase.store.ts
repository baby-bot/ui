import { inject } from '@angular/core';
import {
  PurchaseNumberQueryFilters,
  PurchaseNumberQueryResult,
} from '@baby-bot/types';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { NumberService } from '../services/number.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  debounceTime,
  distinctUntilChanged,
  of,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import { tapResponse } from '@ngrx/operators';

type NumberPurchaseStore = {
  loading: boolean;
  queryResult: PurchaseNumberQueryResult[];
  selectedNumber: string | null;
};

const initialState: NumberPurchaseStore = {
  loading: false,
  queryResult: [],
  selectedNumber: null,
};

export const NumberPurchaseStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, numberService = inject(NumberService)) => ({
    updateFilters: rxMethod(
      pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap((_) => {
          patchState(store, { loading: true });
        }),
        switchMap((filters: PurchaseNumberQueryFilters) => {
          return numberService.queryNumbers(filters).pipe(
            tapResponse({
              next: (queryResult) => {
                patchState(store, { queryResult, loading: false });
              },
              error: (error) => {
                patchState(store, { loading: false });
              },
            })
          );
        })
      )
    ),
  }))
);
