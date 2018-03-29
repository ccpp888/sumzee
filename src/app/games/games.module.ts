import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { GamesRoutingModule } from './games-routing.module';
import { BondsComponent } from './bonds/bonds.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    GamesRoutingModule
  ],
  declarations: [BondsComponent]
})

export class GamesModule { }
