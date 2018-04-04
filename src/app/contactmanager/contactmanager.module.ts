import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

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


const routes: Routes = [
  { path: '', component: ContactmanagerAppComponent,
    children: [      
      { path: 'bonds', component: BondsComponent },
      { path: 'bonds100', component: Bonds100Component },
      { path: 'bonds1000', component: Bonds1000Component },
      { path: 'table2', component: TableTwoComponent },
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
    SuccessDialogComponent, TableTwoComponent, Table2DialogComponent    
  ],
  entryComponents: [
    SuccessDialogComponent,
    Table2DialogComponent
  ]
})
export class ContactmanagerModule { }
