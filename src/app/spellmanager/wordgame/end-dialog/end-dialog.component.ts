import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-end-dialog',
  templateUrl: './end-dialog.component.html',
  styleUrls: ['./end-dialog.component.scss']
})
export class EndDialogComponent {

  onMenu = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<EndDialogComponent>) { }

  closeDialog() {
    console.log('EndDialogComponent closeDialog')
    this.dialogRef.close('Closing!');    
  }

  closeToMain() {
    console.log('EndDialogComponent closeToMain')
    this.onMenu.emit('Menu');
    this.dialogRef.close('Closing!');
  }


}
