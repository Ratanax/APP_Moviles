import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BILBAOPageRoutingModule } from './bilbao-routing.module';

import { BILBAOPage } from './bilbao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BILBAOPageRoutingModule
  ],
  declarations: [BILBAOPage]
})
export class BILBAOPageModule {}
