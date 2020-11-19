import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EsPage } from './es.page';

import { AuthGuard } from '../shared/guard';
import { LoginGuard } from '../shared/guard-login';
const routes: Routes = [
/*
path: '',
        component: LayoutComponent,
        children: [
 { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)},
 { path: 'quienes-somos', loadChildren: () => import('../quienes-somos/quienes-somos.module').then(m => m.QuienesSomosPageModule)},
 { path: 'no-found', loadChildren: () => import('../no-found/no-found.module').then(m => m.NoFoundPageModule)},
 { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule),canActivate: [LoginGuard]},
 { path: 'usuario', loadChildren: () => import('../usuario/usuario.module').then(m => m.UsuarioPageModule),canActivate: [AuthGuard]},
 { path: 'publicaciones', loadChildren: () => import('../publicaciones/publicaciones.module').then(m => m.PublicacionesPageModule)},
 { path: 'contactanos', loadChildren: () => import('../contactanos/contactanos.module').then(m => m.ContactanosPageModule)},
 {path: '',redirectTo: 'home',pathMatch: 'prefix'}
 ]
 */{
   path: 'es',
   component: EsPage,
   children: [
   {
     path: 'tab1',
     children: [
     {
       path: '',
       loadChildren: '../tab1/tab1.module#Tab1PageModule'
     }
     ]
   },
   {
     path: 'tab2',
     children: [
     {
       path: '',
       loadChildren: '../tab2/tab2.module#Tab2PageModule'
     }
     ]
   },
   {
     path: 'tab3',
     children: [
     {
       path: '',
       loadChildren: '../tab3/tab3.module#Tab3PageModule'
     }
     ]
   },
   {
     path: 'quienes-somos',
     children: [
     {
       path: '',
       loadChildren: '../quienes-somos/quienes-somos.module#QuienesSomosPageModule'
     }
     ]
   },
   {
     path: 'no-found',
     children: [
     {
       path: '',
       loadChildren: '../no-found/no-found.module#NoFoundPageModule'
     }
     ]
   },
   {
     path: 'home',
     children: [
     {
       path: '',
       loadChildren: '../home/home.module#HomePageModule'
     }
     ]
   },
   {
     path: 'login',
     children: [
     {
       path: '',
       loadChildren: '../login/login.module#LoginPageModule'
     }
     ], canActivate: [LoginGuard]
   },
   {
     path: 'layout',
     children: [
     {
       path: '',
       loadChildren: '../layout/layout.module#LayoutPageModule'
     }
     ]
   },
   {
     path: 'publicaciones',
     children: [
     {
       path: '',
       loadChildren: '../publicaciones/publicaciones.module#PublicacionesPageModule'
     }
     ]
   },
   {
     path: 'contactanos',
     children: [
     {
       path: '',
       loadChildren: '../contactanos/contactanos.module#ContactanosPageModule'
     }
     ]
   },
   {
     path: 'usuario',
     children: [
     {
       path: '',
       loadChildren: '../usuario/usuario.module#UsuarioPageModule'
     }
     ],canActivate: [AuthGuard]
   },
   {
     path: 'eventos',
     children: [
     {
       path: '',
       loadChildren: '../eventos/eventos.module#EventosPageModule'
     }
     ]
   },
   {
     path: 'dashboardEstadisticas',
     children: [
     {
       path: '',
       loadChildren: '../dashboard-estadisticas/dashboard-estadisticas.module#dashboardEstadisticasPageModule'
     }
     ],canActivate: [AuthGuard]
   },
   {
     path: '',
     redirectTo: '/es/home',
     pathMatch: 'full'
   }
   ]
 },
 {
   path: '',
   redirectTo: '/es/home',
   pathMatch: 'full'
 }
 ];

 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
 export class EsPageRoutingModule {}
