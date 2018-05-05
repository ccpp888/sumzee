import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({  
  templateUrl: './failure-dialog.component.html'
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
