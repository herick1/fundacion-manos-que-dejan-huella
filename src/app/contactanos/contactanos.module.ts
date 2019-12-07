import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IonicModule } from '@ionic/angular';

import { ContactanosPage } from './contactanos.page';

const routes: Routes = [
  {
    path: '',
    component: ContactanosPage
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
  declarations: [ContactanosPage]
})
export class ContactanosPageModule {}
