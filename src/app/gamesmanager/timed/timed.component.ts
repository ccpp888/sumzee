import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CongratsDialogComponent } from '../decimals/congrats-dialog.component';
import { isNull } from 'util';

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/map";
import { Subject } from 'rxjs/Subject';
import { ResultDialogComponent } from './result-dialog.component';


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
  selector: 'app-timed',
  templateUrl: './timed.component.html',
  styleUrls: ['./timed.component.scss']
})

export class TimedComponent implements OnInit {

  static count: number = 0;
  static alreadyGenerated: number[] = [];

  durationInSecs: number = 10;
  countdown: number;

  maxCorrect: number = 8;
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

  //opened: boolean;
  timer;
  subscription;
  subject = new Subject();
  unsubscribed: boolean;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private renderer: Renderer, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    console.log("* In ngInit *");

    //this.opened = false;

    this.initFormAndNumbers();

    this.startCountdownTimer();

    console.log("* ngInit complete *");

  }

  initFormAndNumbers() {

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
    if (this.unsubscribed) {
      console.log("--unsubscribed")
      return;
      //this.openTimesUpDialog(true);
    } else {

      console.log("--NOT guessedCorrectly or opened, calling openTimesUpDialog(false)")
      this.openResultDialog();

      // if (this.opened) {
      //   console.log("--already opened")
      // } else {
      //   console.log("--NOT guessedCorrectly or opened, calling openTimesUpDialog(false)")
      //   this.openResultDialog();
      // }

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

    //console.log('checkInError value=%s, pristine=%s, touched=%s, dirty=%s, errors=%s, valid=%s', c.value, c.pristine, c.touched, c.dirty, c.errors, c.valid);

    if (c.pristine || isNaN(c.value) || isNull(c.value) || (c.value == '')) {
      //console.log('checkInError found pristine');
      this.errorMessage = 'Enter a number';
      this.setFocusOnInput();
      return;
    }

    if ((c.touched || c.dirty) && c.errors) {
      //console.log('checkInError is in error');
      this.errorMessage = this.validationMessage;
      this.guessedCorrectly = false;
      this.setFocusOnInput();
    }
    else {
      console.log('checkInError not in error')
      if (this.guessedCorrectly) {
        //this.ngOnInit();
        this.initFormAndNumbers();
      }
      else {
        console.log("checkInError setting guessedCorrectly");
        //this.subscription.unsubscribe();
        //this.subject.next();
        this.guessedCorrectly = true;
        //disable user input
        this.guessControl.disable();
        //focus on submit button
        document.getElementById('go1').focus();
        TimedComponent.count++;
        console.log("count==" + TimedComponent.count);
        //this.openResultDialog(true);
      }
    }
  }

  resetError(c: AbstractControl): void {
    console.log('In resetError');
    if (c.valid || c.pristine) {
      //console.log("...resetting errorMessage");
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


  openResultDialog(): void {
    console.log("In openResultDialog()");
    //this.opened = true;

    let dialogRef = this.dialog.open(ResultDialogComponent, {
      height: '350px',
      width: '280px',
    });

    dialogRef.componentInstance.numCorrect = TimedComponent.count;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("dialogRef.afterClosed() calling ngOnInit");
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
