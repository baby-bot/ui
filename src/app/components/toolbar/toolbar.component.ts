import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivitiesStore } from '../../store';

@Component({
  standalone: true,
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [IonicModule],
})
export class ToolbarComponent implements OnInit {
  readonly activitiesStore = inject(ActivitiesStore);
  constructor() {}

  ngOnInit() {
    return;
  }
}
