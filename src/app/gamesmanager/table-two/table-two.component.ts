import { Component, OnInit, ViewChildren, Renderer, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';

import { Router } from '@angular/router';
import { Table2DialogComponent } from './table2-dialog.component';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../bonds/success-dialog.component';
import { DOCUMENT } from '@angular/platform-browser';

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
  templateUrl: './table-two.component.html',
  styleUrls: ['./table-two.component.scss']
})

export class TableTwoComponent implements OnInit {

  timesNumber: number = 2;
  generatedNumber: number;

  guessForm: FormGroup;
  expected: number;

  validationMessage = 'Try again';
  errorMessage: string;

  guessedCorrectly: boolean;

  guessControl: AbstractControl;

  constructor(private fb: FormBuilder, private router: Router, private dialog: MatDialog, private renderer: Renderer, @Inject(DOCUMENT) document) { }

  ngOnInit() {

    console.log('* In ngOnInit *');

    this.guessedCorrectly = false;
    this.errorMessage = '';
    this.generatedNumber = Math.floor(Math.random() * 10);
    this.expected = this.timesNumber * this.generatedNumber;
    this.guessForm = this.fb.group({
      result: ['', matchesExpected(this.expected)],
    })

    this.guessControl = this.guessForm.get('result');
        
    this.guessControl.statusChanges
       .subscribe(value => this.resetError(this.guessControl));

    this.setFocusOnInput();

    const element = this.renderer.selectRootElement('#input1');
    setTimeout(() => element.focus(), 0);
  }


  setFocusOnInput() {
    console.log("In reset & setFocusOnInput");    
    const element = this.renderer.selectRootElement('#input1');
    setTimeout(() => element.focus(), 0);    
  }

  checkInError(c: AbstractControl): void {
    this.errorMessage = '';

    if (c.pristine) {
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
        this.ngOnInit();
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

}
