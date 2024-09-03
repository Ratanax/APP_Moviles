import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialAngularPageRoutingModule } from './material-angular-routing.module';
import { MaterialAngularPage } from './material-angular.page';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialAngularPageRoutingModule,
  ],
  providers: [provideNativeDateAdapter()],
  declarations: [MaterialAngularPage],
})
export class MaterialAngularPageModule {}
