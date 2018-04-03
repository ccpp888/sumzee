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


const routes: Routes = [
  { path: '', component: ContactmanagerAppComponent,
    children: [      
      { path: 'bonds', component: BondsComponent },
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
    MenuComponent, 
    SuccessDialogComponent
  ],
  entryComponents: [
    SuccessDialogComponent
  ]
})
export class ContactmanagerModule { }
