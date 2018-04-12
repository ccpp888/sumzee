import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-failure-dialog',
  templateUrl: './failure-dialog.component.html',
  styleUrls: []
})
export class FailureDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FailureDialogComponent>) { }

  closeDialog() {
    console.log("In closeDialog")
    this.dialogRef.close('Closing!');    
  }

  ngOnInit() {
  }

}
