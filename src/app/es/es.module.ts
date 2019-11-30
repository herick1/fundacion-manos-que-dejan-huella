import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EsPageRoutingModule } from './es.router.module';

import { EsPage } from './es.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    EsPageRoutingModule
  ],
  declarations: [EsPage]
})
export class EsPageModule {}
