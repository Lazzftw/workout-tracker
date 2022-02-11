import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExerciceListPage } from './exercice-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExerciceListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciceListPageRoutingModule {}
