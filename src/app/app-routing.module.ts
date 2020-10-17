import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuard } from './shared/guard';
const routes: Routes = [
{ path: '', loadChildren: './es/es.module#EsPageModule' },
  //{ path: '', loadChildren: () => import('./es/es.module').then(m => m.EsPageModule)},
  //{ path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioPageModule),canActivate: [AuthGuard]  }
/*
const routes: Routes = [  { path: '', loadChildren: './es/es.module#EsPageModule' },
    { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
    { path: '**', redirectTo: 'not-found' }
];
*/
  
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
