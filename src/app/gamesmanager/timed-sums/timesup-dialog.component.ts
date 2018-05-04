import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-timesup-dialog',
  templateUrl: './timesup-dialog.component.html' 
})
export class TimesupDialogComponent  {

  correct: boolean;

  constructor(public dialogRef: MatDialogRef<TimesupDialogComponent>) { }

  closeDialog() {
    console.log("TimesupDialogComponent closeDialog")
    this.dialogRef.close('Closing!');    
  }

}
