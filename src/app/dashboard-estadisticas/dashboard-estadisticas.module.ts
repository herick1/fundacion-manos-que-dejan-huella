import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IonicModule } from '@ionic/angular';

import { dashboardEstadisticasPage } from './dashboard-estadisticas.page';

const routes: Routes = [
  {
    path: '',
    component: dashboardEstadisticasPage
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
  declarations: [dashboardEstadisticasPage]
})
export class dashboardEstadisticasPageModule {}
