import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';

import { Component, OnInit, Renderer } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { isNull } from 'util';

import { SumbaseComponent } from '../../shared/sumbase.component';
import { UtilsService } from '../../shared/utils.service';
import { ResultDialogComponent } from './result-dialog.component';
import { Subscription } from 'rxjs/Subscription';

@Component({  
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent extends SumbaseComponent implements OnInit {

  private static count: number = 0;

  public symbol: string;  
  public countdown: number;
  private durationInSecs: number = 60;
  
  private timer: Observable<number>;
  private subscription: Subscription;
  private subject = new Subject();
  private unsubscribed: boolean;
  private started: boolean = false;

  private returnToMain: boolean = false;

  constructor(fb: FormBuilder, dialog: MatDialog, renderer: Renderer, router: Router, route: ActivatedRoute, utils: UtilsService) { 
    super(fb, dialog, renderer,router, route, utils);
  }

  ngOnInit() {
    console.log('In CountdownComponent ngInit');    
    this.initFormAndNumbers();  
    this.guessForm.disable(); 
  }
 
  initFormAndNumbers() {    
    let calc = Math.floor(Math.random() * 8);
    console.log('calc for sum type='+calc)

    switch(calc) {

    }
    switch (calc) {
      case 0: {
        this.doDivision();
        break;
      }
      case 1:
      case 2: {
        this.doSubtraction();
        break;
      }
      case 3:
      case 4: {
        this.doMultiplication();
        break;
      }
      default: {
        this.doAddition();
        break;
      }
    }
    
    super.setupForm();
  }

  doAddition() {
    this.symbol = '+';
    this.number1 = Math.floor(Math.random() * 15) + 4;
    this.number2 = Math.floor(Math.random() * 60) + 10;
    this.expected = this.number1 + this.number2;
  }

  doSubtraction() {
    this.symbol = '-';
    this.number1 = Math.floor(Math.random() * 30) + 11;
    this.number2 = Math.floor(Math.random() * 10) + 3;
    this.expected = this.number1 - this.number2;
  }

  doMultiplication() {
    this.symbol = 'x';
    this.number1 = Math.floor(Math.random() * 5) + 1;
    this.number2 = Math.floor(Math.random() * 17) + 3;
    this.expected = this.number1 * this.number2;
  }

  doDivision() {
    this.symbol = '/';
    let divisors = [2,3,4,5,6];
    let startingPoint = Math.floor(Math.random() * 10) + 1;    
    this.number2 = divisors[Math.floor(Math.random() * divisors.length)];
    this.number1 = startingPoint * this.number2;    
    this.expected = this.number1 / this.number2;
  }

  startCountdownTimer() {    

    this.unsubscribed = false;
    const interval = 1000;
    const duration = this.durationInSecs * 1000;

    this.timer = Observable.timer(0, interval)
      .finally(() => this.endTimer())
      .takeUntil(Observable.timer(duration + interval))
      .takeUntil(this.subject)
      .map(value => (duration - value * interval) / 1000);

    this.subscription = this.timer.subscribe(value => this.countdown = value);

    this.started = true;
    this.guessForm.enable();    
    this.setFocusOnInput();
  }

  endTimer() {
    console.log('In endTimer() for guessedCorrectly=%s unsubscribed=%s', this.guessedCorrectly, this.unsubscribed)
    if (this.unsubscribed) {
      console.log('--unsubscribed')
      return;
    } else {
      console.log('--NOT guessedCorrectly or opened, calling openTimesUpDialog(false)')
      this.openResultDialog();
    }
  }

  countdownStarted() {
    return this.started;
  }

  tryDifferentSum() {
    this.initFormAndNumbers();
    this.setFocusOnInput();
  }

  checkInError(c: AbstractControl): void {
    this.errorMessage = '';
    console.log('checkInError value=%s, pristine=%s, touched=%s, dirty=%s, errors=%s, valid=%s', c.value, c.pristine, c.touched, c.dirty, c.errors, c.valid);

    if (!this.started) {
      this.errorMessage = 'Start the countdown!';
      this.setFocusOnInput();
      return;
    }

    if (c.pristine || isNaN(c.value) || isNull(c.value) || (c.value == '')) {
      this.errorMessage = 'Enter a number';
      this.setFocusOnInput();
      return;
    }

    if ((c.touched || c.dirty) && c.errors) {
      this.errorMessage = this.validationMessage;
      this.guessedCorrectly = false;
      this.setFocusOnInput();
    }
    else {
      console.log('checkInError not in error')
      if (this.guessedCorrectly) {
        this.initFormAndNumbers();
        this.setFocusOnInput();
      }
      else {
        console.log('checkInError setting guessedCorrectly');
        this.guessedCorrectly = true;
        this.guessControl.disable();
        document.getElementById('go1').focus();
        CountdownComponent.count++;
        this.setFocusOnInput();
        console.log('count==' + CountdownComponent.count);
      }
    }
  }

  openResultDialog(): void {
    console.log('In openResultDialog()');

    let dialogRef = this.dialog.open(ResultDialogComponent, {
      height: '320px',
      width: '280px',
    });

    dialogRef.componentInstance.numCorrect = CountdownComponent.count;

    const sub = dialogRef.componentInstance.onMenu.subscribe(() => {
      this.returnToMain = true;
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('dialogRef.afterClosed() resetting count, calling ngOnInit');
        dialogRef.componentInstance.onMenu.unsubscribe();
        CountdownComponent.count = 0;
        if (this.returnToMain) {
          this.returnToMenu();
        } else {
          this.ngOnDestroy(); 
          this.ngOnInit();            
        }
      }
    });
  }

  //running total
  get count() {
    return CountdownComponent.count;
  }

  getCount() {
    return CountdownComponent.count;
  }

  resetCount() {    
    CountdownComponent.count = 0;
  }

  ngOnDestroy() {
    console.log('= In ngOnDestroy =');
    this.started = false;
    if (this.subscription == null) {
      console.log('-- this.subscription==null');
    } else {
      console.log('-- unsubscribing');
      this.unsubscribed = true;
      this.subscription.unsubscribe();
    }
    this.resetCount();
  }

}
