import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({ 
  templateUrl: './help-dialog.component.html'
})
export class HelpDialogComponent  {

  constructor(public dialogRef: MatDialogRef<HelpDialogComponent>) { }

  closeDialog() {
    console.log('In closeDialog')
    this.dialogRef.close('Closing!');    
  }

}
