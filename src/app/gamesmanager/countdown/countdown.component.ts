import { Component, OnInit, Renderer, EventEmitter } from '@angular/core';
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
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})

export class CountdownComponent implements OnInit {

  static count: number = 0;

  durationInSecs: number = 60;
  countdown: number;
  
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

  timer;
  subscription;
  subject = new Subject();
  unsubscribed: boolean;
  started: boolean = false;

  returnToMain: boolean = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private renderer: Renderer, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log("* In ngInit *");
    this.initFormAndNumbers();  
    //this.setFocusOnInput();
    //this.setFocusOnStartButton();
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
    this.setFocusOnInput();
  }

  endTimer() {
    console.log("In endTimer() for guessedCorrectly=%s unsubscribed=%s", this.guessedCorrectly, this.unsubscribed)
    if (this.unsubscribed) {
      console.log("--unsubscribed")
      return;
    } else {
      console.log("--NOT guessedCorrectly or opened, calling openTimesUpDialog(false)")
      this.openResultDialog();
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

  // setFocusOnStartButton() {    
  //   const element = this.renderer.selectRootElement('#start1');
  //   setTimeout(() => element.focus(), 0);
  // }

  checkInError(c: AbstractControl): void {
    this.errorMessage = '';

    //console.log('checkInError value=%s, pristine=%s, touched=%s, dirty=%s, errors=%s, valid=%s', c.value, c.pristine, c.touched, c.dirty, c.errors, c.valid);

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
      }
      else {
        console.log("checkInError setting guessedCorrectly");
        this.guessedCorrectly = true;
        this.guessControl.disable();
        document.getElementById('go1').focus();
        CountdownComponent.count++;
        console.log("count==" + CountdownComponent.count);
      }
    }
  }

  resetError(c: AbstractControl): void {
    console.log('In resetError');
    if (c.valid || c.pristine) {
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
        console.log("dialogRef.afterClosed() resetting count, calling ngOnInit");
        dialogRef.componentInstance.onMenu.unsubscribe();
        CountdownComponent.count = 0;
        if (this.returnToMain) {
          this.returnToMenu();
        } else {
          this.ngOnInit();
        }
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
    CountdownComponent.count = 0;
  }

}
