import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-table3-dialog',
  templateUrl: './table3-dialog.component.html',
  styleUrls: ['./table3-dialog.component.scss']
})
export class Table3DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<Table3DialogComponent>) { }

  closeDialog() {
    console.log("In closeDialog")
    this.dialogRef.close('Closing!');    
  }

  ngOnInit() {
  }

}
