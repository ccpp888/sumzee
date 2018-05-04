import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilsService } from '../../shared/utils.service';
import { SumbaseComponent } from '../../shared/sumbase.component';
import { HelpDialogComponent } from './help-dialog.component';

@Component({
  templateUrl: './table-generic.component.html',
  styleUrls: ['./table-generic.component.scss']
})

export class TableGenericComponent extends SumbaseComponent implements OnInit {

  static count: number = 0;
  static alreadyGenerated: number[] = [];

  timesNumber: number;
  generatedNumber: number;


  constructor(fb: FormBuilder, dialog: MatDialog, renderer: Renderer, router: Router, route: ActivatedRoute, utils: UtilsService) { 
    super(fb, dialog, renderer,router, route, utils);
    }

  ngOnInit() {
    console.log('In ngOnInit of TableGenericComponent count=%s', TableGenericComponent.count);    
    TableGenericComponent.count++;

    this.timesNumber = super.getLevel();
    this.checkNewNumber();
    this.expected = this.timesNumber * this.generatedNumber;
    super.setupForm();
    super.setFocusOnInput();
  }

  /*
   * Avoid generating a number already guessed
   */ 
  checkNewNumber() {
    let alreadyGen = true;
    while (alreadyGen) {
      this.generatedNumber = Math.floor(Math.random() * 12);

      if (TableGenericComponent.alreadyGenerated.includes(this.generatedNumber)) {
        console.log("Trying again - already generated number=" + this.generatedNumber);
      }
      else {
        alreadyGen = false;
        TableGenericComponent.alreadyGenerated.push(this.generatedNumber);
      }
    }
  }

  /**
   * Display a basic matrix table help
   */
  openDialog(): void {

    let dialogRef = this.dialog.open(HelpDialogComponent, {
      height: '420px',
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("openDialog result==true");
        this.setFocusOnInput(); 
      }
    });
  }

  getCount() {
    return TableGenericComponent.count;
  }

  resetCount() {    
    TableGenericComponent.count = 0;
  }

  ngOnDestroy() {
    console.log('TableGenericComponent in ngOnDestory');
    this.resetCount();
  }
}
