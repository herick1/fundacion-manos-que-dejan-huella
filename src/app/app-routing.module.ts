import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './es/es.module#EsPageModule' }

  
  //{ path: 'contactanos', loadChildren: './contactanos/contactanos.module#ContactanosPageModule' },
  //{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
  //{ path: 'quienes-somos', loadChildren: './quienes-somos/quienes-somos.module#QuienesSomosPageModule' },
  //{ path: 'no-found', loadChildren: './no-found/no-found.module#NoFoundPageModule' },
  //{ path: 'layout', loadChildren: './layout/layout.module#LayoutPageModule' }

];
  const routerOptions: ExtraOptions = {
              anchorScrolling: 'enabled',
              //onSameUrlNavigation: 'reload',
              //scrollPositionRestoration: 'enabled'
        };
@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
