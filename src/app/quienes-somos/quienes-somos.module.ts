import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IonicModule } from '@ionic/angular';
import { QuienesSomosPage } from './quienes-somos.page';

const routes: Routes = [
  {
    path: '',
    component: QuienesSomosPage
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
  declarations: [QuienesSomosPage]
})
export class QuienesSomosPageModule {}
