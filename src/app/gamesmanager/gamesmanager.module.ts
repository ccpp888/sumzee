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
import { DecimalsComponent } from './decimals/decimals.component';
import { CongratsDialogComponent } from './decimals/congrats-dialog.component';
import { AdditionComponent } from './addition/addition.component';
import { SubtractionComponent } from './subtraction/subtraction.component';
import { DivisionComponent } from './division/division.component';
import { MultiplicationComponent } from './multiplication/multiplication.component';
import { AdditionChoiceComponent } from './addition/addition-choice.component';
import { TimedComponent } from './timed/timed.component';
import { TimesupDialogComponent } from './countdown/timesup-dialog.component';
import { CountdownComponent } from './countdown/countdown.component';
import { ResultDialogComponent } from './timed/result-dialog.component';


const routes: Routes = [
  { path: '', component: GamesmanagerAppComponent,
    children: [      
      { path: 'bondsc', component: BondsChoiceComponent },         
      { path: 'bonds/:id', component: BondsComponent },         
      { path: 'tablec', component: TableChoiceComponent },
      { path: 'decimals', component: DecimalsComponent },
      { path: 'table/:id', component: TableGenericComponent },
      { path: 'add', component: AdditionChoiceComponent },
      { path: 'add/:id', component: AdditionComponent },
      { path: 'subtract', component: SubtractionComponent },
      { path: 'divide', component: DivisionComponent },
      { path: 'timed', component: TimedComponent },
      { path: 'countdown', component: CountdownComponent },
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
    FailureDialogComponent, HelpDialogComponent, DecimalsComponent, CongratsDialogComponent, AdditionComponent, SubtractionComponent, DivisionComponent, MultiplicationComponent, AdditionChoiceComponent, TimedComponent, TimesupDialogComponent, CountdownComponent, ResultDialogComponent
  ],
  entryComponents: [
    SuccessDialogComponent,
    FailureDialogComponent,
    HelpDialogComponent,
    CongratsDialogComponent,
    TimesupDialogComponent,
    ResultDialogComponent
  ]
})
export class GamesmanagerModule { }
