import { Component, OnInit, ViewChildren, Renderer } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from './success-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FailureDialogComponent } from './failure-dialog.component';

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: []
})

export class BondsComponent implements OnInit {

  bondNumber: number;
  generatedNumber: number;
  guess: number;

  hasBondError: boolean = false;

  constructor(private dialog: MatDialog, private route: ActivatedRoute, public router: Router, private renderer: Renderer) { }

  ngOnInit() {

    console.log("* In ngOnInit *");
    
    this.setFocusOnInput();

    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      console.log("BondsComponent param[id]==%s", param);
      let id = +param //cast to number from string
      this.bondNumber = id;
    }
    else {
      console.error("no param for id found");
    }

    this.generatedNumber = Math.floor(Math.random() * this.bondNumber);
    this.guess = null;
  }

  guessit(): void {
    console.log("In guessit guess=%d", this.guess);
    if (this.generatedNumber + this.guess == this.bondNumber) {
      this.hasBondError = false;
      this.openSuccessDialog();
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
}
