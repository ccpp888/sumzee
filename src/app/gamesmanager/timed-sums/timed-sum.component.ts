import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';

import { Component, OnInit, Renderer } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { Subject } from 'rxjs/Subject';
import { isNull } from 'util';

import { PreDialogComponent } from './pre-dialog.component';
import { TimesupDialogComponent } from './timesup-dialog.component';
import { UtilsService } from '../../shared/utils.service';
import { SumbaseComponent } from '../../shared/sumbase.component';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-timed-sum',
  templateUrl: './timed-sum.component.html',
  styleUrls: ['./timed-sum.component.scss']
})
export class TimedSumComponent extends SumbaseComponent implements OnInit {

  public countdown: number;
  private durationInSecs:number = 10;  
  private readyTitle: string;    
  private opened: boolean;
  private timer: Observable<number>;
  private subscription: Subscription;
  private subject = new Subject();
  private unsubscribed: boolean;

  constructor(fb: FormBuilder, dialog: MatDialog, renderer: Renderer, router: Router, route: ActivatedRoute, utils: UtilsService) { 
    super(fb, dialog, renderer,router, route, utils);
  }

  ngOnInit() {
    console.log('TimedSumComponent in ngOnInit');

    this.setNumbers();
    this.opened = false;
    super.setupForm();
    super.setFocusOnInput();
  }

  setNumbers() {
    this.number1 = this.utils.getRandom(1, 10);   
    this.number2 = this.utils.getRandom(10, 100);   
    this.expected = this.number1 + this.number2;    
  }

  ngAfterViewInit() {    
    this.openPreDialog();
  }

  openPreDialog(): void {
    console.log('In openPreDialog()');
    
    let dialogRef = this.dialog.open(PreDialogComponent, {
      height: '110px',
      width: '200px',
      panelClass: 'transparent'      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('dialogRef.afterClosed()');         
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
    console.log('In endTimer() for guessedCorrectly=%s unsubscribed=%s', this.guessedCorrectly, this.unsubscribed)
    if (this.guessedCorrectly || this.unsubscribed) {
      console.log('--guessedCorrectly')
      return;      
    } else {
      if (this.opened) {
        console.log('--already opened')
      } else {
        console.log('--NOT guessedCorrectly or opened, calling openTimesUpDialog(false)')
        this.openTimesUpDialog(false);
      }
    }
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
        console.log('checkInError setting guessedCorrectly, stopping timer');
        this.unsubscribed = true;
        this.subject.next(); //complete timer
        this.guessedCorrectly = true;        
        this.guessControl.disable();        
        this.openTimesUpDialog(true);
      }
    }
  }

  openTimesUpDialog(correct: boolean): void {
    console.log('In openTimesUpDialog() for boolean=' + correct);
    this.opened = true;

    let dialogRef = this.dialog.open(TimesupDialogComponent, {
      height: '270px',
      width: '220px',
    });

    dialogRef.componentInstance.correct = correct;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {             
        if (this.subscription == null) {
          console.log('dialogRef.afterClosed - this.subscription==null');
    
        } else {
          console.log('dialogRef.afterClosed - unsubscribing');
          this.unsubscribed = true;
          this.subscription.unsubscribe();
        }                
        this.setNumbers();
        this.openPreDialog();
              
        
      }
    });
  }

  getCount() {
    return this.countdown;
  }

  resetCount() {    
    //not required
  }

  ngOnDestroy() {    
    if (this.subscription == null) {
      console.log('ngOnDestroy - this.subscription==null');
    } else {
      console.log('ngOnDestroy - unsubscribing');
      this.unsubscribed = true;
      this.subscription.unsubscribe();
    }    
  }

}
