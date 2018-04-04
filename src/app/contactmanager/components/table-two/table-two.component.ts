import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialog, ErrorStateMatcher } from '@angular/material';
import { SuccessDialogComponent } from '../bonds/success-dialog.component';
import { Router } from '@angular/router';
import { Table2DialogComponent } from './table2-dialog.component';

@Component({
  selector: 'app-table-two',
  templateUrl: './table-two.component.html',
  styleUrls: ['./table-two.component.scss']
})

export class TableTwoComponent implements OnInit {

  timesNumber: number = 2;
  generatedNumber: number;
  guess: number;
  initd: boolean;

  isInError: boolean = false;
  guessedCorrectly: boolean = false;

  //constructor(private dialog: MatDialog, public router: Router, private defaultMatcher: ErrorStateMatcher) { }
  constructor(private dialog: MatDialog, public router: Router) { }

  ngOnInit() {
    this.generatedNumber = Math.floor(Math.random() * 10);
    this.guess = null;
    this.isInError = false;
    this.guessedCorrectly = false;
    this.initd = true;

    console.log("In ngOnInit() initd=%s", this.initd)
  }

  //replace with touched check on form
  //return true if guess is a number, or false if NaN (init)
  showError(): boolean {
    console.log("In showError guess=%s", this.guess);  
    if (this.isInError && (this.guess != null)) {
      console.log("In showError returning true");  
      return true;
    }
    console.log("In showError returning false");  
    return false;
  }

  guessit(): void {
    console.log("In guessit guess=%d", this.guess);
    this.initd = false;
    if (this.generatedNumber * this.timesNumber == this.guess) {
      this.isInError = false;
      this.guessedCorrectly = true;
    }
    else {
      this.isInError = true;
      this.guess = null;
    }
    console.log("isInError=%s", this.isInError);
  }

  //will need to return boolean if using in validation
  onEnter(): void {
    console.log("In onEnter guess=%d", this.guess);

    if (this.guessedCorrectly) {
      console.log("In onEnter calling ngOnInit [guessedCorrectly=true]");
      this.ngOnInit();
    }
    //CHECK DIRTY
    //if (this.initd) {
    //  console.log("In onEnter returning [initd=true]");
    //  return;
   // }

    console.log("In onEnter calling guessit");
    this.guessit();
  }

  onEnterCorrectGuess(): void {
    console.log("In onEnterCorrectGuess guess=%d", this.guess);
    this.ngOnInit();
  }

  openTableDialog(): void {

    let dialogRef = this.dialog.open(Table2DialogComponent, {
      height: '750px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (result) {
        console.log("if(result) called == true, calling ngOnInit");
        //this.ngOnInit();
      }
    });

  }

}

