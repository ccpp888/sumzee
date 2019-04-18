import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { EndDialogComponent } from './end-dialog/end-dialog.component';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';

export interface Element {
  C1: string;
  C2: string;
  C3: string;
  C4: string;
}

@Component({
  selector: 'app-wordgame',
  templateUrl: './wordgame.component.html',
  styleUrls: ['./wordgame.component.scss']
})

export class WordgameComponent implements OnInit {

  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4'];
  dataSource: Element[];

  //length=56
  alphabet: string[] = ['t', 'o', 'e', 's', 's', 'i', 'd', 'r', 'x', 'i', 'l', 'e', 't', 't', 'o', 'a', 'w', 'a', 'o', 'm', 't', 'o', 'i', 'u', 'c', 'o', 'n', 'qu', 'n', 'm', 'i', 'h', 'l', 'r', 'n', 'h', 'z', 'e', 'n', 'g', 'e', 'a', 'a', 'e', 'a', 's', 'p', 'k', 'f', 'a', 'y', 'y', 'g', 'h', 'f', 'a'];

  public countdown: number;
  private durationInSecs: number = 180; //3 mins

  private returnToMain: boolean = false;
  
  private timer: Observable<number>;
  private subscription: Subscription;
  private subject = new Subject();
  private unsubscribed: boolean;
  private started: boolean = false;


  constructor(private dialog: MatDialog, 
    private route: ActivatedRoute, 
    private router: Router)  { }

  ngOnInit() {
    console.log('* WordgameComponent ngOnInit *');
    this.setLetters();
  }

  getRandomLetter(): string {
    var char = this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
    console.log('getRandomLetter returning char=%s', char);
    return char;
  }

  setLetters() {
    console.log('In setLetters using alphabet array length=%s', this.alphabet.length);
    this.dataSource = [
      { C1: this.getRandomLetter(), C2: this.getRandomLetter(), C3: this.getRandomLetter(), C4: this.getRandomLetter() },
      { C1: this.getRandomLetter(), C2: this.getRandomLetter(), C3: this.getRandomLetter(), C4: this.getRandomLetter() },
      { C1: this.getRandomLetter(), C2: this.getRandomLetter(), C3: this.getRandomLetter(), C4: this.getRandomLetter() },
      { C1: this.getRandomLetter(), C2: this.getRandomLetter(), C3: this.getRandomLetter(), C4: this.getRandomLetter() },
    ];

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
  }

  endTimer() {
    console.log('In endTimer() for unsubscribed=%s', this.unsubscribed)
    if (this.unsubscribed) {
      console.log('-unsubscribed')
      return;
    } else {
      console.log('-opened, calling openDialog(false)')
      this.openDialog();
    }
  }

  countdownStarted() {
    return this.started;
  }

  openDialog(): void {
    console.log('In openDialog()');

    this.playAudio();

    let dialogRef = this.dialog.open(EndDialogComponent, {
      height: '320px',
      width: '280px',
    });

    const sub = dialogRef.componentInstance.onMenu.subscribe(() => {
      this.returnToMain = true;
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('dialogRef.afterClosed()');
        dialogRef.componentInstance.onMenu.unsubscribe();
        if (this.returnToMain) {
          this.returnToMenu();
        } else {
          this.ngOnDestroy(); 
          this.ngOnInit();            
        }
      }
    });
  }

  returnToMenu() {
    this.router.navigateByUrl('/spellmanager/spmenu');
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "/assets/bikehorn.wav";
    audio.load();
    audio.play();
  }

  ngOnDestroy() {
    console.log('= In ngOnDestroy =');
    this.started = false;
    if (this.subscription == null) {
      console.log('-this.subscription==null');
    } else {
      console.log('-unsubscribing');
      this.unsubscribed = true;
      this.subscription.unsubscribe();
    }
    
  }


}
