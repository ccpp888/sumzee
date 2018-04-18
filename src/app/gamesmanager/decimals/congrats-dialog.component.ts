import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-congrats-dialog',
  templateUrl: './congrats-dialog.component.html',
  styleUrls: ['./congrats-dialog.component.scss']
})
export class CongratsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CongratsDialogComponent>) { }

  closeDialog() {
    console.log("In closeDialog")
    this.dialogRef.close('Closing!');    

  }

  ngOnInit() {
  }

}

