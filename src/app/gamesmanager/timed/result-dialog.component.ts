import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent {

  numCorrect: number;

  constructor(public dialogRef: MatDialogRef<ResultDialogComponent>) { }

  closeDialog() {
    console.log("ResultDialogComponent closeDialog")
    this.dialogRef.close('Closing!');    
  }

}
