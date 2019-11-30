import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './es/es.module#EsPageModule' },
  //{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
  //{ path: 'quienes-somos', loadChildren: './quienes-somos/quienes-somos.module#QuienesSomosPageModule' },
  //{ path: 'no-found', loadChildren: './no-found/no-found.module#NoFoundPageModule' },
  //{ path: 'layout', loadChildren: './layout/layout.module#LayoutPageModule' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
