import { Component, OnInit, ViewChildren, Renderer, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';

import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../bonds/success-dialog.component';
import { isNull } from 'util';
import { CongratsDialogComponent } from '../decimals/congrats-dialog.component';

function matchesExpected(exp: number): ValidatorFn {

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


function roundnum(num) {
  return Math.round(num / 10) * 10;
}

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: []
})
export class DivisionComponent implements OnInit {

  static count: number = 0;
  static alreadyGenerated: number[] = [];

  title: string;

  level: number;
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

  constructor(private fb: FormBuilder, private dialog: MatDialog, private renderer: Renderer, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    console.log("* DivisionComponent : in ngOnInit *");

    DivisionComponent.count++;

    this.setLevel();

    switch (this.level) {
      case 1: {
        this.doLevelHot();
        break;
      }
      case 2: {
        this.doLevelHotter();
        break;
      }
      default: {
        this.doLevelHottest();
        break;
      }
    }

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

  doLevelHot() {

    this.title = 'Hot sums';
    this.number1 = Math.floor(Math.random() * 20) + 5;
    this.number2 = Math.floor(Math.random() * 5) + 2;

    let noMod = true;
    let counter = 1;
    while (noMod) {
      if (counter == 100) {
        console.log("** counter reached 100 **");
        //multiple by 2 ensures even number (divisible whole number)
        this.number1 = (Math.floor(Math.random() * 10) + 1) * 2;
        this.number2 = 2;
        console.log (">> reset as number1=%s, number2=%s", this.number1, this.number2);
        break;
      }
      if (this.number1 % this.number2 == 0) {
        noMod = false;
      }
      else {
        this.number2 = Math.floor(Math.random() * 5) + 2;
        noMod = true;
        counter++;
      }      
    }
    this.expected = this.number1 / this.number2;
    console.log(">> number1=%s, number2=%s, expected=%s", this.number1, this.number2, this.expected);
  }

  doLevelHotter() {

    this.title = 'Hotter sums';
    this.number1 = Math.floor(Math.random() * 100) + 10;
    this.number2 = Math.floor(Math.random() * 10) + 2;

    let noMod = true;
    let counter = 1;
    while (noMod) {
      if (counter == 200) {
        console.log("** counter reached 200 **");
        this.number1 = (Math.floor(Math.random() * 50)) * 2;
        this.number2 = 2;
        console.log (">> reset as number1=%s, number2=%s", this.number1, this.number2);        
        break;
      }
      if (this.number1 % this.number2 == 0) {
        noMod = false;
      }
      else {
        this.number2 = Math.floor(Math.random() * 10) + 2;
        noMod = true;
        counter++;
      }     
    }
    this.expected = this.number1 / this.number2;
    console.log("number1=%s, number2=%s, expected=%s", this.number1, this.number2, this.expected);
  }

  doLevelHottest() {

    this.title = 'Hottest sums';
    let divisors = [10,20,50,100];
    let startingPoint = Math.floor(Math.random() * 50) + 10;    
    this.number2 = divisors[Math.floor(Math.random() * divisors.length)];
    this.number1 = startingPoint * this.number2;
    
    this.expected = this.number1 / this.number2;
    console.log("number1=%s, number2=%s, expected=%s", this.number1, this.number2, this.expected);
  }

  setLevel() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      console.log("param==" + param);
      let id = +param //cast to number from string
      this.level = id;
    }
    else {
      console.error("no param for id found");
    }
  }

  refocus() {
    if (this.guessedCorrectly) {
      this.setFocusOnInput();
    }
  }

  setFocusOnInput() {
    console.log("In reset & setFocusOnInput");
    const element = this.renderer.selectRootElement('#input1');
    setTimeout(() => element.focus(), 0);
  }

  checkInError(c: AbstractControl): void {
    this.errorMessage = '';

    console.log('checkInError value=%s, pristine=%s, touched=%s, dirty=%s, errors=%s, valid=%s', c.value, c.pristine, c.touched, c.dirty, c.errors, c.valid);

    if (c.pristine || isNaN(c.value) || isNull(c.value) || (c.value == '')) {
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
        if (DivisionComponent.count >= this.maxCorrect) {
          DivisionComponent.count = 0;
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

  /** 
   * Called from subscribing to form input status changes, this resets the errorMessage
   * to '' if the input field is empty/valid: this handles the case where user deletes
   * an incorrect guess to try again.
   */
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

  returnToMenu() {
    this.router.navigateByUrl("/gamesmanager/menu");
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

  public ngOnDestroy() {
    console.log("* DivisionComponent in ngOnDestory *");
    DivisionComponent.count = 0;
  }

}

