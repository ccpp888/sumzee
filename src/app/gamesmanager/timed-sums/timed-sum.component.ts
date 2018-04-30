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
import { interval } from 'rxjs/observable/interval';
import { take } from 'rxjs/operators';

import { TimesupDialogComponent } from './timesup-dialog.component';
import { Subject } from 'rxjs/Subject';
import { PreDialogComponent } from './pre-dialog.component';


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


function sequenceSubscriber(observer) {
  const seq = ["Ready","Set","Go"];
  let timeoutId;

  console.log(">>> sequenceSubscriber emitting values");
  // Will run through an array of numbers, emitting one value
  // per second until it gets to the end of the array.
  function doSequence(arr, idx) {
    console.log("In func doSeq: idx==%s", idx);
    timeoutId = setTimeout(() => {
      observer.next(arr[idx]);
      //if (idx === arr.length - 1) {
      if (idx == arr.length - 1) {
        console.log(">>> idx == arr.length-1, completing");
        observer.complete();
      } else {
        console.log("Not complete: calling doSeq for idx==%s", idx);
        doSequence(arr, ++idx);
      }
    }, 2000);
  }

  console.log(">>> sequenceSubscriber calling doSequence");
  doSequence(seq, 0);

  // Unsubscribe should clear the timeout to stop execution
  return {unsubscribe() {
    clearTimeout(timeoutId);
  }};
}

@Component({
  selector: 'app-timed-sum',
  templateUrl: './timed-sum.component.html',
  styleUrls: ['./timed-sum.component.scss']
})
export class TimedSumComponent implements OnInit {

  countdown: number;
  durationInSecs:number = 10;
  
  readyTitle: string;
  displayReady: boolean;

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

    //this.displayReady = true;

    this.setNumbers();

    //this.startCountdownTimer();

    console.log("* ngInit complete *");

  }

  setNumbers() {
    this.number1 = Math.floor(Math.random() * 10) + 1;
    this.number2 = Math.floor(Math.random() * 100) + 10;

    this.expected = this.number1 + this.number2;
    this.guessedCorrectly = false;
    this.opened = false;
    this.errorMessage = '';

    this.guessForm = this.fb.group({
      actual: ['', matchesExpected(this.expected)],
    })
    this.guessControl = this.guessForm.get('actual');
    this.guessControl.statusChanges
      .subscribe(value => this.resetError(this.guessControl));

    this.setFocusOnInput();
  }

  ngAfterViewInit() {
    console.log("* In ngAfterViewInit *");
    this.openPreDialog();

    //this.callSequence2();   
    //this.displayReady = true;

  }

  callSequence2() {
    let words = ['Ready', 'Set', 'Go!', ''];

    const intrval = interval(1500);
    const sequence = intrval.pipe(take(4));
           
    const sub = sequence
        .finally(() => {
          console.log('Finally callback')
          this.displayReady = false;
        })
        .subscribe(i => { 
        console.log(i); 
        console.log(words[i]); 
        this.readyTitle = words[i];     
        })   

      sub.unsubscribe();
  }

  callSequence() {
    const sequence = new Observable(sequenceSubscriber);

    sequence.subscribe({
      next(str) { 
        console.log(str); 
        this.title = str;
      },
      complete() { console.log('Finished sequence'); }
    });
  }

  openPreDialog(): void {
    console.log("In openPreDialog()");
    
    let dialogRef = this.dialog.open(PreDialogComponent, {
      height: '90px',
      width: '200px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("dialogRef.afterClosed()");         
        this.setFocusOnInput();       
        this.startCountdownTimer();
      }
    });
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
    if (c.valid || c.pristine) {      
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
        //this.ngOnInit();
        this.setNumbers();
        this.openPreDialog();
              
        
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
