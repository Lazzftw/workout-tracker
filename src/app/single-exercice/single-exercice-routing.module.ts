import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleExercicePage } from './single-exercice.page';

const routes: Routes = [
  {
    path: '',
    component: SingleExercicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleExercicePageRoutingModule {}
