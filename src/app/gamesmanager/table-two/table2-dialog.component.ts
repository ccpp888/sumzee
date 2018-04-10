import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-table2-dialog',
  templateUrl: './table2-dialog.component.html',
  styleUrls: ['./table2-dialog.component.scss']
})
export class Table2DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<Table2DialogComponent>) { }

  closeDialog() {
    console.log("In closeDialog")
    this.dialogRef.close('Closing!');    
  }

  ngOnInit() {
  }

}