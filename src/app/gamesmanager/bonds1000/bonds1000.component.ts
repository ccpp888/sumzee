import { Component, OnInit, ViewChildren } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../bonds/success-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bonds1000',
  templateUrl: './bonds1000.component.html',
  styleUrls: ['./bonds1000.component.scss']
})
export class Bonds1000Component implements OnInit {

  bondNumber: number = 1000;
  generatedNumber: number;
  guess: number;

  hasBondError: boolean = false;

  constructor(private dialog: MatDialog, public router: Router) { }

  @ViewChildren('input') vc;
  
  ngAfterViewInit() {            
       this.vc.first.nativeElement.focus();
   }

  ngOnInit() {
    //this.generatedNumber = Math.round((Math.random()*(900-100)+100)/100)*100;
    this.generatedNumber = Math.floor(Math.random() * 1000);
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

  openSuccessDialog(): void {

    let dialogRef = this.dialog.open(SuccessDialogComponent, {
      height: '300px',
      width: '250px',            
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (result) {
        console.log("if(result) called == true, calling ngOnInit");
        this.ngOnInit();
          
      }
    });

  }

}
