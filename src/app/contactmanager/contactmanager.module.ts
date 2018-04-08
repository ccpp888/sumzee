import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { BondsComponent } from './components/bonds/bonds.component';
import { MenuComponent } from './components/menu/menu.component';
import { SuccessDialogComponent } from './components/bonds/success-dialog.component';
import { Bonds100Component } from './components/bonds100/bonds100.component';
import { Bonds1000Component } from './components/bonds1000/bonds1000.component';
import { TableTwoComponent } from './components/table-two/table-two.component';
import { Table2DialogComponent } from './components/table-two/table2-dialog.component';
import { TableThreeComponent } from './components/table-three/table-three.component';
import { TableFourComponent } from './components/table-four/table-four.component';
import { Table3DialogComponent } from './components/table-three/table3-dialog.component';
import { TableSixComponent } from './components/table-six/table-six.component';
import { TableSevenComponent } from './components/table-seven/table-seven.component';
import { TableEightComponent } from './components/table-eight/table-eight.component';


const routes: Routes = [
  { path: '', component: ContactmanagerAppComponent,
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
  declarations: [ContactmanagerAppComponent, 
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
export class ContactmanagerModule { }
