import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from './success-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.scss']
})

export class BondsComponent implements OnInit {

  bondNumber: number = 10;
  generatedNumber: number;
  guess: number;

  hasBondError: boolean = false;

  constructor(private dialog: MatDialog, public router: Router) { }

  ngOnInit() {
    this.generatedNumber = Math.floor(Math.random() * 10);
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
    }
    console.log("hasBondError=%s", this.hasBondError);
  }

  //will need to return boolean if using in validation
  onEnter(): void {
    console.log("In onEnter guess=%d", this.guess);
    this.guessit();
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
