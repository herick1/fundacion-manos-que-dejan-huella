import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EsPage } from './es.page';

const routes: Routes = [
  {
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
        ]
      },
      {
      path: 'login2',
      children: [
        {
          path: '',
          loadChildren:  '../auth/login/login.module#LoginPageModule' 
        }
      ]
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
        ]
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
