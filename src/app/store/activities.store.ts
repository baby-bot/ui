import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

import { Activity } from '../types';
import { inject } from '@angular/core';
import { ActivityService, AuthService } from '../services';
import { of, pipe, switchMap } from 'rxjs';

type ActivitiesState = {
  activities: Activity[];
  isLoading: boolean;
  selectedActivity: string | null;
  defaultActivity: string | null;
  // filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: ActivitiesState = {
  activities: [],
  isLoading: false,
  selectedActivity: null,
  defaultActivity: null,
  // filter: { query: '', order: 'asc' },
};

export const ActivitiesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      activityService = inject(ActivityService),
      auth = inject(AuthService)
    ) => ({
      selectActivity(activityId: string): void {
        patchState(store, (state) => ({ selectedActivity: activityId }));
      },
      loadUserActivities: rxMethod(
        pipe(
          switchMap(() => {
            return auth.user$.pipe(
              switchMap((user) => {
                if (!user) {
                  return of(null);
                }
                return activityService.list().pipe(
                  tapResponse({
                    next: (activities) => {
                      if (!activities) {
                        patchState(store, { activities, isLoading: false });
                      } else {
                        patchState(store, {
                          activities: activities,
                          isLoading: false,
                        });
                      }
                    },
                    error: (err) => {
                      patchState(store, { isLoading: false });
                      // console.error(err);
                    },
                  })
                );
              })
            );
          })
        )
      ),
    })
  ),
  withHooks({
    onInit(store) {
      console.log('ActivitiesStore initialized');
    },
    onDestroy(store) {
      console.log('ActivitiesStore destroyed');
    },
  })
);
