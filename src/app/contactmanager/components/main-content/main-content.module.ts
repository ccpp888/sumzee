import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../../../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MainContentComponent } from './main-content.component';
import { MenuComponent } from '../menu/menu.component';
import { BondsComponent } from '../bonds/bonds.component';

const routes: Routes = [
  { path: '', component: MainContentComponent,
  //{ path: 'menu', component: MenuComponent,
  //  children: [      
  //    { path: 'menu', component: MenuComponent },
  //    { path: 'bonds', component: BondsComponent },      
  //  ] 
  },  
    { path: 'menu', component: MenuComponent  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainContentComponent, BondsComponent, MenuComponent]
})
export class MainContentModule { }
