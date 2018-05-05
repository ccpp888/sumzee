import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent {

  numCorrect: number;
  onMenu = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<ResultDialogComponent>) { }

  closeDialog() {
    console.log('ResultDialogComponent closeDialog')
    this.dialogRef.close('Closing!');    
  }

  closeToMain() {
    console.log('ResultDialogComponent closeToMain')
    this.onMenu.emit('Menu');
    this.dialogRef.close('Closing!');
  }

}
