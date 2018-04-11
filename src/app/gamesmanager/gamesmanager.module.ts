import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GamesmanagerAppComponent } from './gamesmanager-app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { BondsComponent } from './bonds/bonds.component';
import { MenuComponent } from './menu/menu.component';
import { SuccessDialogComponent } from './bonds/success-dialog.component';
import { Bonds100Component } from './bonds100/bonds100.component';
import { Bonds1000Component } from './bonds1000/bonds1000.component';
import { TableTwoComponent } from './table-two/table-two.component';
import { Table2DialogComponent } from './table-two/table2-dialog.component';

import { TableGenericComponent } from './table-generic/table-generic.component';
import { TableChoiceComponent } from './table-generic/table-choice.component';
import { TableDialogComponent } from './table-generic/table-dialog.component';


const routes: Routes = [
  { path: '', component: GamesmanagerAppComponent,
    children: [      
      { path: 'bonds', component: BondsComponent },
      { path: 'bonds100', component: Bonds100Component },
      { path: 'bonds1000', component: Bonds1000Component },
      { path: 'table2', component: TableTwoComponent },
      { path: 'tablec', component: TableChoiceComponent },
      { path: 'table/:id', component: TableGenericComponent },
      { path: 'menu', component: MenuComponent }
    ] },    
  { path: 'brefresh', redirectTo: 'bonds' },
  { path: '**', redirectTo: 'menu' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  declarations: [GamesmanagerAppComponent, 
    ToolbarComponent,     
    SidenavComponent, 
    BondsComponent, 
    Bonds100Component, 
    Bonds1000Component,
    MenuComponent, 
    SuccessDialogComponent, TableTwoComponent, Table2DialogComponent, TableGenericComponent, TableChoiceComponent, TableDialogComponent    
  ],
  entryComponents: [
    SuccessDialogComponent,
    Table2DialogComponent    
  ]
})
export class GamesmanagerModule { }
