import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: []
})
export class HelpDialogComponent  {

  constructor(public dialogRef: MatDialogRef<HelpDialogComponent>) { }

  closeDialog() {
    console.log("In closeDialog")
    this.dialogRef.close('Closing!');    
  }

}
