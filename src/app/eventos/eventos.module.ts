import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicModule } from '@ionic/angular';

import { EventosPage } from './eventos.page';

const routes: Routes = [
  {
    path: '',
    component: EventosPage
  }
];

@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventosPage]
})
export class EventosPageModule {}
