import { FieldValue } from '@angular/fire/firestore';

export interface Activity {
  id: string;
  name: string;
  createdAt: FieldValue;
  ownerId: string;
}
