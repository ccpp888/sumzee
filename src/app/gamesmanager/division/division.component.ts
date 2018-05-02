import { Component, OnInit, ViewChildren, Renderer, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../bonds/success-dialog.component';
import { isNull } from 'util';

import { CongratsDialogComponent } from '../decimals/congrats-dialog.component';
import { UtilsService } from '../../shared/utils.service';
import { SumbaseComponent } from '../../shared/sumbase.component';


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
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: []
})
export class DivisionComponent extends SumbaseComponent implements OnInit {

  static count: number = 0;  
  
  
  validationMessage = 'Try again';
  errorMessage: string;

  constructor(fb: FormBuilder, dialog: MatDialog, renderer: Renderer, router: Router, route: ActivatedRoute) { 
    super(fb, dialog, renderer,router, route);
  }

  ngOnInit() {

    DivisionComponent.count++;

    switch (this.getLevel()) {
      case 0: {
        this.doLevelWarm();
        break;
      }
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
    console.log("number1=%s, number2=%s, expected=%s", this.number1, this.number2, this.expected);

    this.guessedCorrectly = false;
    this.errorMessage = '';
    
    this.setupForm();
    this.setFocusOnInput();
  }

  setupForm() {

    this.guessForm = this.fb.group({
      actual: ['', matchesExpected(this.expected)],
    })
    this.guessControl = this.guessForm.get('actual');
    this.guessControl.statusChanges
      .subscribe(value => this.resetError(this.guessControl));
  }

  doLevelWarm() {

    this.title = 'Warm sums';    
    let divisors = [1,2,3,4];
    let startingPoint = Math.floor(Math.random() * 10) + 4;    
    this.number2 = divisors[Math.floor(Math.random() * divisors.length)];
    this.number1 = startingPoint * this.number2;    
    this.expected = this.number1 / this.number2;    
  }

  doLevelHot() {

    this.title = 'Hot sums';
    let startingPoint = Math.floor(Math.random() * 15) + 5;    
    this.number2 = Math.floor(Math.random() * 5) + 2;
    this.number1 = startingPoint * this.number2;    
    this.expected = this.number1 / this.number2;    
  }

  doLevelHotter() {

    this.title = 'Hotter sums';
    let startingPoint = Math.floor(Math.random() * 30) + 10;    
    this.number2 = Math.floor(Math.random() * 10) + 2;
    this.number1 = startingPoint * this.number2;    
    this.expected = this.number1 / this.number2;    

    // let noMod = true;
    // let counter = 1;
    // while (noMod) {
    //   if (counter == 200) {
    //     console.log("** counter reached 200 **");
    //     this.number1 = (Math.floor(Math.random() * 50)) * 2;
    //     this.number2 = 2;
    //     console.log (">> reset as number1=%s, number2=%s", this.number1, this.number2);        
    //     break;
    //   }
    //   if (this.number1 % this.number2 == 0) {
    //     noMod = false;
    //   }
    //   else {
    //     this.number2 = Math.floor(Math.random() * 10) + 2;
    //     noMod = true;
    //     counter++;
    //   }     
    // }
  }

  doLevelHottest() {

    this.title = 'Hottest sums';
    let divisors = [10,20,50,100];
    let startingPoint = Math.floor(Math.random() * 50) + 10;    
    this.number2 = divisors[Math.floor(Math.random() * divisors.length)];
    this.number1 = startingPoint * this.number2;    
    this.expected = this.number1 / this.number2;    
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
      
    if (c.valid || c.pristine) {
      console.log("...resetting errorMessage");
      this.errorMessage = '';
    }
  }

  save() {

    console.log("In save()/submit");
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

