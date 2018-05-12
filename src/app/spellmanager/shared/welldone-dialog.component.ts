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
    this.image_url = '/assets/words/congrats/ani' + filenum + '.gif';    
  }

  continue() {    
    this.dialogRef.close('Continue');
  }


  closeDialog() {    
    this.dialogRef.close('Main');
  }

}
