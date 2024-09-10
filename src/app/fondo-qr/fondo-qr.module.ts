import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FondoQRPageRoutingModule } from './fondo-qr-routing.module';

import { FondoQRPage } from './fondo-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FondoQRPageRoutingModule
  ],
  declarations: [FondoQRPage]
})
export class FondoQRPageModule {}
