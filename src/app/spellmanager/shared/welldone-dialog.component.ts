import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

function getRandom(startFrom, maxNum) {
  return Math.floor(Math.random() * maxNum) + startFrom;
}

@Component({
  selector: 'app-welldone-dialog',
  templateUrl: './welldone-dialog.component.html',
  styleUrls: ['./welldone-dialog.component.scss']
})
export class WelldoneDialogComponent implements OnInit {

  image_url: string;

  constructor(public dialogRef: MatDialogRef<WelldoneDialogComponent>) { }

  ngOnInit() {    
    let filenum = getRandom(1,2);
    this.image_url = '/assets/spimages/congrats/ani' + filenum + '.gif';    
  }

  continue() {
    console.log("IN CONTINUE dialog");
    this.dialogRef.close('Continue');
  }


  closeDialog() {
    console.log('In closeDialog')
    this.dialogRef.close('Main');
  }

}
