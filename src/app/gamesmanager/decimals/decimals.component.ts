import { Component, OnInit, Renderer } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, ValidatorFn } from '@angular/forms';
import { isNull } from 'util';
import { CongratsDialogComponent } from './congrats-dialog.component';
import { Router } from '@angular/router';


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function matchesExpected(exp: number): ValidatorFn {

  console.log('In matchesExpected expecting ==' + exp);
  return (c: AbstractControl): { [key: string]: boolean } | null => {

    if (c.value == undefined || c.value == '') {
      return null;
    }

    if ((isNaN(c.value) || c.value != exp)) {
      console.log('In matchesExpected func returning true (in error) ==');
      return { 'expected': true }
    }
    return null;
  }
}

@Component({
  selector: 'app-decimals',
  templateUrl: './decimals.component.html',
  styleUrls: ['./decimals.component.scss']
})

export class DecimalsComponent implements OnInit {

  static count: number = 0;
  title: string;

  wholeNumbers: number[] = [25, 50, 75, 125, 150, 175];
  decimals: number[] = [0.25, 0.5, 0.75, 1.25, 1.5, 1.75, 2.25, 2.5];

  maxCorrect: number = 8;
  number1: number;
  number2: number;
  expected: number;
  actual: number;
  guessedCorrectly: boolean;

  guessForm: FormGroup;
  guessControl: AbstractControl;

  validationMessage = 'Try again';
  errorMessage: string;


  constructor(private fb: FormBuilder, private dialog: MatDialog, private renderer: Renderer, public router: Router) { }

  ngOnInit() {

    console.log("* In ngOnInit *");

    DecimalsComponent.count++;
    console.log("* static count=" + DecimalsComponent.count);

    if (DecimalsComponent.count > 3) {
      this.number1 = this.decimals[getRandomInt(1, 8) - 1];
      this.number2 = this.decimals[getRandomInt(1, 8) - 1];
      this.title = 'Now, its real decimals!'

    }
    else {
      this.number1 = this.wholeNumbers[getRandomInt(1, 6) - 1];
      this.number2 = this.wholeNumbers[getRandomInt(1, 6) - 1];
      this.title = 'Preparing for decimals, lets start with whole numbers...'
    }

    this.expected = this.number1 + this.number2;

    this.guessedCorrectly = false;
    this.errorMessage = '';

    this.guessForm = this.fb.group({
      actual: ['', matchesExpected(this.expected)],
    })

    this.guessControl = this.guessForm.get('actual');

    this.guessControl.statusChanges
      .subscribe(value => this.resetError(this.guessControl));

    this.setFocusOnInput();

  }

  setFocusOnInput() {
    console.log("In reset & setFocusOnInput");
    const element = this.renderer.selectRootElement('#input1');
    setTimeout(() => element.focus(), 0);
  }

  checkInError(c: AbstractControl): void {
    this.errorMessage = '';

    console.log('checkInError value=%s, pristine=%s, touched=%s, dirty=%s, errors=%s, valid=%s', c.value, c.pristine, c.touched, c.dirty, c.errors, c.valid);

    if (c.pristine || isNaN(c.value) || isNull(c.value)) {
      console.log('checkInError found pristine');
      this.errorMessage = 'Enter a number';
      this.setFocusOnInput();
      return;
    }

    if ((c.touched || c.dirty) && c.errors) {
      console.log('checkInError is in error');
      this.errorMessage = this.validationMessage;
      this.guessedCorrectly = false;
      this.setFocusOnInput();
    }
    else {
      console.log('checkInError not in error')
      if (this.guessedCorrectly) {
        //for 8 correct
        if (DecimalsComponent.count >= this.maxCorrect) {
          DecimalsComponent.count=0;
          this.openCongratsDialog();
        }
        else {
          this.ngOnInit();
        }
      }
      else {
        console.log("checkInError setting guessedCorrectly, disabling");
        this.guessedCorrectly = true;
        //disable user input
        this.guessControl.disable();
        //focus on submit button
        document.getElementById('go1').focus();
      }
    }
  }

  resetError(c: AbstractControl): void {
    console.log('In resetError');
    if (c.valid || c.pristine) {
      console.log("...resetting errorMessage");
      this.errorMessage = '';
    }
  }

  save() {
    console.log("In save() - which is onSubmit");
    const guessControl = this.guessForm.get('actual');
    this.checkInError(guessControl);
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
