import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';

const routes: Routes = [
  { path: 'gamesmanager', loadChildren: './gamesmanager/gamesmanager.module#GamesmanagerModule' },    
  { path: 'spellmanager', loadChildren: './spellmanager/spellmanager.module#SpellmanagerModule' },
  { path: 'sp', redirectTo: 'spellmanager' },
  { path: '**', component: MainmenuComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
