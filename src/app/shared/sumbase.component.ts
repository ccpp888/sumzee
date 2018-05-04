import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { isNull } from 'util';

import { CongratsDialogComponent } from '../gamesmanager/decimals/congrats-dialog.component';
import { UtilsService } from './utils.service';

function matchesExpected(exp: number): ValidatorFn {

  return (c: AbstractControl): { [key: string]: boolean } | null => {

    if (c.value == undefined || c.value == '') {
      return null;
    }

    if ((isNaN(c.value) || c.value != exp)) {
      console.log("In matchesExpected func returning true (in error) ==");
      return { "expected": true }
    }
    return null;
  }
}

export abstract class SumbaseComponent {

  protected maxCorrect: number = 8;

  public number1: number;
  public number2: number;
  public expected: number;

  public guessedCorrectly: boolean;
  public guessForm: FormGroup;
  public guessControl: AbstractControl;

  public title: string;
  public validationMessage = "Try again";
  public errorMessage: string;

  constructor(protected fb: FormBuilder, protected dialog: MatDialog, protected renderer: Renderer, protected router: Router, protected route: ActivatedRoute, protected utils: UtilsService) { }

  abstract ngOnInit();

  abstract resetCount();
  abstract getCount();

  getLevel(): number {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      //console.log("param==" + param);
      let id = +param //cast to number from string
      return id;
    }
    else {
      console.error("no param for id found");
      return 0;
    }
  }

  setupForm() {
    this.guessForm = this.fb.group({
      actual: ['', matchesExpected(this.expected)],
    })
    this.guessControl = this.guessForm.get('actual');
    this.guessControl.statusChanges
      .subscribe(value => this.resetError(this.guessControl));

    this.guessedCorrectly = false;
    this.errorMessage = '';
  }

  /** 
   * Called from subscribing to form input status changes, this resets the errorMessage
   * to '' if the input field is empty/valid: this handles the case where user deletes
   * an incorrect guess to try again.
   */
  resetError(c: AbstractControl) {

    if (c.valid || c.pristine) {      
      this.errorMessage = '';
    }
  }

  refocus() {  
    if (this.guessedCorrectly) {
      this.setFocusOnInput();
    }
  }

  setFocusOnInput() {
    const element = this.renderer.selectRootElement('#input1');
    setTimeout(() => element.focus(), 0);
  }
  
  returnToMenu() {
    this.router.navigateByUrl('/gamesmanager/menu');
  }

  openCongratsDialog() {
    let dialogRef = this.dialog.open(CongratsDialogComponent, {
      height: '500px',
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {        
        this.returnToMenu();
      }
    });
  }

  save() {    
    const guessControl = this.guessForm.get('actual');
    this.checkInError(guessControl);
  }

  checkInError(c: AbstractControl) {    
    console.log('checkInError value=%s, pristine=%s, touched=%s, dirty=%s, errors=%s, valid=%s', c.value, c.pristine, c.touched, c.dirty, c.errors, c.valid);
    this.errorMessage = '';

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
        if (this.getCount() >= this.maxCorrect) {
          this.resetCount();
          this.openCongratsDialog();
        }
        else {
          this.ngOnInit();
        }
      }
      else {
        console.log('checkInError setting guessedCorrectly, disabling');
        this.guessedCorrectly = true;        
        this.guessControl.disable();        
        document.getElementById('go1').focus(); //focus on submit button
      }
    }
  }  
}
