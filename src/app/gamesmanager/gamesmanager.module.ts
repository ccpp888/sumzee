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
import { CongratsDialogComponent } from '../shared/congrats-dialog/congrats-dialog.component';
import { AdditionComponent } from './addition/addition.component';
import { SubtractionComponent } from './subtraction/subtraction.component';
import { DivisionComponent } from './division/division.component';
import { MultiplicationComponent } from './multiplication/multiplication.component';
import { AdditionChoiceComponent } from './addition/addition-choice.component';
import { TimesupDialogComponent } from './timed-sums/timesup-dialog.component';
import { ResultDialogComponent } from './countdown/result-dialog.component';
import { TimedSumComponent } from './timed-sums/timed-sum.component';
import { CountdownComponent } from './countdown/countdown.component';
import { DivChoiceComponent } from './division/div-choice.component';
import { SubtractChoiceComponent } from './subtraction/subtract-choice.component';
import { MultiChoiceComponent } from './multiplication/multi-choice.component';
import { PreDialogComponent } from './timed-sums/pre-dialog.component';
import { UtilsService } from '../shared/utils.service';


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
      { path: 'subtract', component: SubtractChoiceComponent },
      { path: 'subtract/:id', component: SubtractionComponent },
      { path: 'divide', component: DivChoiceComponent },
      { path: 'divide/:id', component: DivisionComponent },
      { path: 'multiply', component: MultiChoiceComponent },
      { path: 'multiply/:id', component: MultiplicationComponent },
      { path: 'countdown', component: CountdownComponent },
      { path: 'timed', component: TimedSumComponent },
      { path: 'menu', component: MenuComponent }
    ] },      
  { path: 'spellmanager', redirectTo: '/spellmanager/spmenu' },
  { path: '**', redirectTo: 'menu' },  
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
  providers: [UtilsService],
  declarations: [
    GamesmanagerAppComponent, 
    ToolbarComponent,     
    SidenavComponent, 
    BondsChoiceComponent,    
    BondsComponent,     
    MenuComponent, 
    SuccessDialogComponent, 
    TableGenericComponent, 
    TableChoiceComponent, 
    FailureDialogComponent, 
    HelpDialogComponent, 
    DecimalsComponent, 
    CongratsDialogComponent, 
    AdditionComponent, 
    SubtractionComponent, 
    SubtractChoiceComponent,
    DivisionComponent, 
    DivChoiceComponent, 
    MultiplicationComponent, 
    AdditionChoiceComponent, 
    TimedSumComponent, 
    TimesupDialogComponent,     
    CountdownComponent, 
    ResultDialogComponent, 
    MultiplicationComponent,
    MultiChoiceComponent,
    PreDialogComponent
  ],
  entryComponents: [
    SuccessDialogComponent,
    FailureDialogComponent,
    HelpDialogComponent,
    CongratsDialogComponent,
    TimesupDialogComponent,
    ResultDialogComponent,
    PreDialogComponent
  ]
})
export class GamesmanagerModule { }
