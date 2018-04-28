import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { isNull } from 'util';

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/map";
import { TimesupDialogComponent } from './timesup-dialog.component';
import { Subject } from 'rxjs/Subject';


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
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  static count: number = 0;
  static alreadyGenerated: number[] = [];

  countdown: number;
  durationInSecs:number = 6;

  //maxCorrect: number = 8;
  number1: number;
  number2: number;
  expected: number;
  actual: number;
  difficulty: number;
  guessedCorrectly: boolean;

  guessForm: FormGroup;
  guessControl: AbstractControl;

  validationMessage = 'Try again';
  errorMessage: string;

  opened: boolean;
  timer;
  subscription;
  subject = new Subject();
  unsubscribed: boolean;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private renderer: Renderer, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    console.log("* In ngInit *");

    this.number1 = Math.floor(Math.random() * 10) + 1;
    this.number2 = Math.floor(Math.random() * 100) + 10;


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

    this.opened = false;

    this.startCountdownTimer();


    console.log("* ngInit complete *");

  }

  startCountdownTimer() {

    this.unsubscribed = false;
    const interval = 1000;
    const duration = this.durationInSecs * 1000;
    //const duration = 5 * 1000;
    //const stream$ = Observable.timer(0, interval)
    this.timer = Observable.timer(0, interval)
      .finally(() => this.endTimer())
      .takeUntil(Observable.timer(duration + interval))
      .takeUntil(this.subject)
      .map(value => (duration - value * interval) / 1000);
    //stream$.subscribe(value => this.countdown = value);
    this.subscription = this.timer.subscribe(value => this.countdown = value);        

  }

  endTimer() {
    console.log("In endTimer() for guessedCorrectly=%s unsubscribed=%s", this.guessedCorrectly, this.unsubscribed)
    if (this.guessedCorrectly || this.unsubscribed) {
      console.log("--guessedCorrectly")
      return;      
    } else {
      if (this.opened) {
        console.log("--already opened")
      } else {
        console.log("--NOT guessedCorrectly or opened, calling openTimesUpDialog(false)")
        this.openTimesUpDialog(false);
      }
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
        //ignore re-entry
      }
      else {
        console.log("checkInError setting guessedCorrectly, stopping timer");
        this.unsubscribed = true;
        this.subject.next(); //complete timer
        this.guessedCorrectly = true;        
        this.guessControl.disable();        
        this.openTimesUpDialog(true);
      }
    }
  }

  resetError(c: AbstractControl): void {
    //console.log('In resetError');
    if (c.valid || c.pristine) {
      //console.log("...resetting errorMessage");
      this.errorMessage = '';
    }
  }

  save() {    
    const guessControl = this.guessForm.get('actual');
    this.checkInError(guessControl);
  }

  returnToMenu() {
    this.router.navigateByUrl("/gamesmanager/menu");
  }

  openTimesUpDialog(correct: boolean): void {
    console.log("In openTimesUpDialog() for boolean=" + correct);
    this.opened = true;

    let dialogRef = this.dialog.open(TimesupDialogComponent, {
      height: '270px',
      width: '220px',
    });

    dialogRef.componentInstance.correct = correct;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("dialogRef.afterClosed()");        
        if (this.subscription == null) {
          console.log("-- this.subscription==null");
    
        } else {
          console.log("-- unsubscribing");
          this.unsubscribed = true;
          this.subscription.unsubscribe();
        }        
        this.ngOnInit();
      }
    });
  }

  ngOnDestroy() {
    console.log("= In ngOnDestroy =");
    if (this.subscription == null) {
      console.log("-- this.subscription==null");
    } else {
      console.log("-- unsubscribing");
      this.unsubscribed = true;
      this.subscription.unsubscribe();
    }
  }

}
