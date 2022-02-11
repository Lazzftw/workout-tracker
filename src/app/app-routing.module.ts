import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'day1',
    loadChildren: () => import('./days/day1/day1.module').then( m => m.Day1PageModule)
  },
  {
    path: 'day2',
    loadChildren: () => import('./days/day2/day2.module').then( m => m.Day2PageModule)
  },
  {
    path: 'day3',
    loadChildren: () => import('./days/day3/day3.module').then( m => m.Day3PageModule)
  },
  {
    path: 'exercice',
    loadChildren: () => import('./exercice/exercice.module').then( m => m.ExercicePageModule)
  },
  {
    path: 'exercice-list',
    loadChildren: () => import('./exercice-list/exercice-list.module').then( m => m.ExerciceListPageModule)
  },
  {
    path: 'exercice-list/:id',
    loadChildren: () => import('./single-exercice/single-exercice.module').then( m => m.SingleExercicePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
