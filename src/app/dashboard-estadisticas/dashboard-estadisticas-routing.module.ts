import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { dashboardEstadisticasPage } from './dashboard-estadisticas.page';

const routes: Routes = [
  {
    path: '',
    component: dashboardEstadisticasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class dashboardEstadisticasPageRoutingModule {}
