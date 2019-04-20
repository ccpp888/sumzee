import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UtilsService } from '../shared/utils.service';
import { SpellmanagerAppComponent } from './spellmanager-app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuComponent } from './menu/menu.component';
import { SpellingComponent } from './spelling/spelling.component';
import { WelldoneDialogComponent } from './shared/welldone-dialog.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { WordgameComponent } from './wordgame/wordgame.component';
import { EndDialogComponent } from './wordgame/end-dialog/end-dialog.component';

const routes: Routes = [  
  { path: '', component: SpellmanagerAppComponent,
    children: [                     
      { path: 'wordgame', component: WordgameComponent },
      { path: 'spelling', component: SpellingComponent },
      { path: 'spelling/:id', component: SpellingComponent },     
      { path: 'weekly/:id', component: WeeklyComponent },     
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
  providers: [UtilsService],
  declarations: [
    SpellmanagerAppComponent, 
    ToolbarComponent,     
    SidenavComponent, 
    ToolbarComponent, 
    MenuComponent,    
    WelldoneDialogComponent,
    SpellingComponent,
    WeeklyComponent,
    WordgameComponent,
    EndDialogComponent
  ],
  entryComponents: [WelldoneDialogComponent,EndDialogComponent]
})
export class SpellmanagerModule { }
