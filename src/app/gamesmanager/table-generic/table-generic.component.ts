import { Component, OnInit, ViewChildren, Renderer, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';

import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../bonds/success-dialog.component';
import { DOCUMENT } from '@angular/platform-browser';
import { HelpDialogComponent } from './help-dialog.component';
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

@Component({
  templateUrl: './table-generic.component.html',
  styleUrls: ['./table-generic.component.scss']
})

export class TableGenericComponent implements OnInit {

  static count: number = 0;
  static alreadyGenerated: number[] = [];

  maxCorrect: number = 8;
  timesNumber: number;
  generatedNumber: number;

  guessForm: FormGroup;
  expected: number;

  validationMessage = 'Try again';
  errorMessage: string;

  guessedCorrectly: boolean;

  guessControl: AbstractControl;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private route: ActivatedRoute, private router: Router, private renderer: Renderer, @Inject(DOCUMENT) document) { }

  ngOnInit() {

    console.log('* In ngOnInit of TableGenericComponent *');

    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      console.log("param==" + param);
      let id = +param //cast to number from string
      this.timesNumber = id;
    }
    else {
      console.error("no param for id found");
    }


    //Avoid generating a number already guessed
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

    this.guessedCorrectly = false;
    this.errorMessage = '';    
    this.expected = this.timesNumber * this.generatedNumber;
    this.guessForm = this.fb.group({
      result: ['', matchesExpected(this.expected)],
    })

    this.guessControl = this.guessForm.get('result');

    this.guessControl.statusChanges
      .subscribe(value => this.resetError(this.guessControl));

    this.setFocusOnInput();

    TableGenericComponent.count++;
    console.log("* static count=" + TableGenericComponent.count);
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
        if (TableGenericComponent.count >= this.maxCorrect) {
          TableGenericComponent.count=0;
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
    const guessControl = this.guessForm.get('result');
    this.checkInError(guessControl);
  }

  returnToMenu() {
    this.router.navigateByUrl("/gamesmanager/menu");
  }

  openDialog(): void {

    let dialogRef = this.dialog.open(HelpDialogComponent, {
      height: '825px',
      width: '1050px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("openDialog result==true");

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
