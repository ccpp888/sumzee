import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-congrats-dialog',
  templateUrl: './congrats-dialog.component.html',
  styleUrls: []
})
export class CongratsDialogComponent implements OnInit {

  r_image: number;
  image_url: string;

  constructor(public dialogRef: MatDialogRef<CongratsDialogComponent>) { }

  ngOnInit() {
    this.r_image = Math.floor(Math.random() * 9) + 1;    
    this.image_url = "/assets/images/dialog/" + this.r_image + ".gif";    
  }

  closeDialog() {
    console.log("In closeDialog")
    this.dialogRef.close('Closing!');
  }
}

