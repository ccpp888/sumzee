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
import { TableThreeComponent } from './table-three/table-three.component';
import { TableFourComponent } from './table-four/table-four.component';
import { Table3DialogComponent } from './table-three/table3-dialog.component';
import { TableSixComponent } from './table-six/table-six.component';
import { TableSevenComponent } from './table-seven/table-seven.component';
import { TableEightComponent } from './table-eight/table-eight.component';


const routes: Routes = [
  { path: '', component: GamesmanagerAppComponent,
    children: [      
      { path: 'bonds', component: BondsComponent },
      { path: 'bonds100', component: Bonds100Component },
      { path: 'bonds1000', component: Bonds1000Component },
      { path: 'table2', component: TableTwoComponent },
      { path: 'table3', component: TableThreeComponent },
      { path: 'table4', component: TableFourComponent },
      { path: 'table6', component: TableSixComponent },
      { path: 'table7', component: TableSevenComponent },
      { path: 'table8', component: TableEightComponent },
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
    SuccessDialogComponent, TableTwoComponent, Table2DialogComponent, TableThreeComponent, TableFourComponent, Table3DialogComponent, TableSixComponent, TableSevenComponent, TableEightComponent    
  ],
  entryComponents: [
    SuccessDialogComponent,
    Table2DialogComponent,
    Table3DialogComponent
  ]
})
export class GamesmanagerModule { }
