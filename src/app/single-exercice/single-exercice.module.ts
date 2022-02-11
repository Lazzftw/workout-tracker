import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleExercicePageRoutingModule } from './single-exercice-routing.module';

import { SingleExercicePage } from './single-exercice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleExercicePageRoutingModule
  ],
  declarations: [SingleExercicePage],
})
export class SingleExercicePageModule {}
