import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BondsComponent } from './bonds/bonds.component';

const routes: Routes = [
  { path: 'bonds', component: BondsComponent },  
  { path: '**', redirectTo: 'bonds' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GamesRoutingModule { }
