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
import { TableGenericComponent } from './table-generic/table-generic.component';
import { TableChoiceComponent } from './table-generic/table-choice.component';
import { SuccessDialogComponent } from './bonds/success-dialog.component';
import { FailureDialogComponent } from './bonds/failure-dialog.component';
import { BondsChoiceComponent } from './bonds/bonds-choice.component';
import { HelpDialogComponent } from './table-generic/help-dialog.component';


const routes: Routes = [
  { path: '', component: GamesmanagerAppComponent,
    children: [      
      { path: 'bondsc', component: BondsChoiceComponent },         
      { path: 'bonds/:id', component: BondsComponent },         
      { path: 'tablec', component: TableChoiceComponent },
      { path: 'table/:id', component: TableGenericComponent },
      { path: 'menu', component: MenuComponent }
    ] },      
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
    BondsChoiceComponent,    
    BondsComponent,     
    MenuComponent, 
    SuccessDialogComponent, 
    TableGenericComponent, 
    TableChoiceComponent, 
    FailureDialogComponent, HelpDialogComponent
  ],
  entryComponents: [
    SuccessDialogComponent,
    FailureDialogComponent,
    HelpDialogComponent
  ]
})
export class GamesmanagerModule { }
