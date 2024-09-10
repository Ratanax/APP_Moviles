import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FondoQRPage } from './fondo-qr.page';

const routes: Routes = [
  {
    path: '',
    component: FondoQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FondoQRPageRoutingModule {}
