import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { take } from 'rxjs/operators';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-pre-dialog',
  templateUrl: './pre-dialog.component.html',
  styleUrls: ['./pre-dialog.component.scss']
})
export class PreDialogComponent implements OnInit {

  readyTitle: string;

  constructor(public dialogRef: MatDialogRef<PreDialogComponent>) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('* In ngAfterViewInit *');
    this.displayRSG();   
  }

  displayRSG() {    
    let words = ['Ready', 'Set', 'Go!', ''];
    const intrval = interval(900);
    const sequence = intrval.pipe(take(4));           
    const sub = sequence
        .finally(() => {
          console.log('Finally callback')
          this.closeDialog();          
        })
        .subscribe(i => {         
        this.readyTitle = words[i];     
        })
  }

  closeDialog() {
    console.log('PreDialogComponent closeDialog')
    this.dialogRef.close('Closing!');
  }

}
