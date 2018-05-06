import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SpellmanagerAppComponent } from './spellmanager-app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuComponent } from './menu/menu.component';
import { Spelling1Component } from './spelling1/spelling1.component';

const routes: Routes = [  
  { path: '', component: SpellmanagerAppComponent,
    children: [                     
      { path: 'spelling1', component: Spelling1Component },
      { path: 'spmenu', component: MenuComponent }
    ] },          
  { path: '**', redirectTo: 'spmenu' }
];


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SpellmanagerAppComponent, 
    ToolbarComponent,     
    SidenavComponent, ToolbarComponent, MenuComponent, Spelling1Component
  ],
  entryComponents: []
})
export class SpellmanagerModule { }
