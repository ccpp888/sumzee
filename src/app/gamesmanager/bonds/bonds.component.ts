import { Component, OnInit, ViewChildren, Renderer } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from './success-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FailureDialogComponent } from './failure-dialog.component';
import { isNull } from 'util';
import { CongratsDialogComponent } from '../decimals/congrats-dialog.component';

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: []
})

export class BondsComponent implements OnInit {

  static count: number = 0;
  static alreadyGenerated: number[] = [];

  maxCorrect: number = 8;
  bondNumber: number;
  generatedNumber: number;
  guess: number;

  hasBondError: boolean = false;

  constructor(private dialog: MatDialog, private route: ActivatedRoute, public router: Router, private renderer: Renderer) { }

  ngOnInit() {

    console.log("* In ngOnInit *");
    
    this.setFocusOnInput();

    BondsComponent.count++;
    console.log("* static count=" + BondsComponent.count);

    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      console.log("BondsComponent param[id]==%s", param);
      let id = +param //cast to number from string
      this.bondNumber = id;
    }
    else {
      console.error("no param for id found");
    }

    //Avoid generating a number already guessed
    let alreadyGen = true;
    while (alreadyGen) {
      this.generatedNumber = Math.floor(Math.random() * this.bondNumber);

      if (BondsComponent.alreadyGenerated.includes(this.generatedNumber)) {
        console.log("Trying again - already generated number="+this.generatedNumber);
      }
      else {
        alreadyGen = false;        
        BondsComponent.alreadyGenerated.push(this.generatedNumber);
      }
    }
    
    //console.log("alreadyGenerated list="+BondsComponent.alreadyGenerated.toString());    
    this.guess = null;
  }

  guessit(): void {
    console.log("In guessit guess=%d", this.guess);

    if (isNull(this.guess)) {
      return; //no dialog for empty input (keep focus)
    }

    if (this.generatedNumber + this.guess == this.bondNumber) {
      this.hasBondError = false;
      //for 8 correct
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
    console.log("hasBondError=%s", this.hasBondError);
  }

  //will need to return boolean if using in validation
  onEnter(): void {
    console.log("In onEnter guess=%d", this.guess);
    this.guessit();
  }

  returnToMenu() {
    this.router.navigateByUrl("/gamesmanager/menu");
  }

  setFocusOnInput() {
    console.log("In setFocusOnInput");    
    const element = this.renderer.selectRootElement('#input1');
    setTimeout(() => element.focus(), 0);    
  }

  openSuccessDialog(): void {

    let dialogRef = this.dialog.open(SuccessDialogComponent, {
      height: '260px',
      width: '200px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("openSuccessDialog result==true");
        this.ngOnInit();        
      }
    });
  }

  openFailureDialog(): void {

    let dialogRef = this.dialog.open(FailureDialogComponent, {
      height: '260px',
      width: '200px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("openFailureDialog result==true");
        this.setFocusOnInput();
      }
    });
  }

  openCongratsDialog(): void {

    let dialogRef = this.dialog.open(CongratsDialogComponent, {
      height: '500px',
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("openSuccessDialog result==true");
        this.router.navigateByUrl("/gamesmanager/menu");        
      }
    });
  }
}
