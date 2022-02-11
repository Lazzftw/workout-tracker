import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { IonicModule } from '@ionic/angular';

import { ExerciceListPageRoutingModule } from './exercice-list-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExerciceListPageRoutingModule
  ],
  declarations: []
})
export class ExerciceListPageModule {}
