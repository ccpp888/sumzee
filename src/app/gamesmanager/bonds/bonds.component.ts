import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { isNull } from 'util';

import { SumbaseComponent } from '../../shared/sumbase.component';
import { FailureDialogComponent } from './failure-dialog.component';
import { SuccessDialogComponent } from './success-dialog.component';
import { UtilsService } from '../../shared/utils.service';

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html'
})

export class BondsComponent extends SumbaseComponent implements OnInit {

  static count: number = 0;
  static alreadyGenerated: number[] = [];

  maxCorrect: number = 8;
  bondNumber: number;
  generatedNumber: number;
  guess: number;

  hasBondError: boolean = false;

  constructor(fb: FormBuilder, dialog: MatDialog, renderer: Renderer, router: Router, route: ActivatedRoute, utils: UtilsService) { 
    super(fb, dialog, renderer,router, route, utils);
  }

  ngOnInit() {
    console.log('In BondsComponent ngOnInit');
    BondsComponent.count++;
    this.setFocusOnInput();    
    this.bondNumber = super.getLevel();    

    //avoid generating a number already guessed
    let alreadyGen = true;
    while (alreadyGen) {
      this.generatedNumber = Math.floor(Math.random() * this.bondNumber);

      if (BondsComponent.alreadyGenerated.includes(this.generatedNumber)) {
        console.log('Trying again - already generated number='+this.generatedNumber);
      }
      else {
        alreadyGen = false;        
        BondsComponent.alreadyGenerated.push(this.generatedNumber);
      }
    }        
    this.guess = null;
  }

  guessit() {
    console.log('In guessit guess=%d', this.guess);

    if (isNull(this.guess)) {
      return; //no dialog for empty input (keep focus)
    }

    if (this.generatedNumber + this.guess == this.bondNumber) {
      this.hasBondError = false;      
      if (BondsComponent.count >= this.maxCorrect) {
        BondsComponent.count=0;
        this.openCongratsDialog();
      }
      else {
        this.openSuccessDialog();
      }      
    }
    else {
      this.hasBondError = true;
      this.guess = null;
      this.openFailureDialog();
    }
    console.log('hasBondError=%s', this.hasBondError);
  }
    
  openSuccessDialog() {
    let dialogRef = this.dialog.open(SuccessDialogComponent, {
      height: '260px',
      width: '200px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {        
        this.ngOnInit();        
      }
    });
  }

  openFailureDialog() {
    let dialogRef = this.dialog.open(FailureDialogComponent, {
      height: '260px',
      width: '200px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {        
        this.setFocusOnInput();
      }
    });
  }
  
  getCount() {
    return BondsComponent.count;
  }

  resetCount() {    
    BondsComponent.count = 0;
  }

  ngOnDestroy() {
    console.log('BondsComponent in ngOnDestory');
    this.resetCount();
  }  
}
