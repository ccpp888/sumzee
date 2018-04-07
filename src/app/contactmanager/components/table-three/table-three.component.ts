import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilKeyChanged';
import { Router } from '@angular/router';
import { Table3DialogComponent } from './table3-dialog.component';
import { MatDialog } from '@angular/material';

function matchesExpected(exp: number): ValidatorFn {

  return (c: AbstractControl) : {[key: string]: boolean} | null => {

    if (c.value != undefined && (isNaN(c.value) || c.value != exp)) {
      console.log('== func returning true (in error) ==');
      return { 'expected': true }
    }
    return null;
  }
}

@Component({
  selector: 'app-table-three',
  templateUrl: './table-three.component.html',
  styleUrls: ['./table-three.component.scss']
})

export class TableThreeComponent implements OnInit {

  timesNumber: number = 3;
  generatedNumber: number;

  guessForm: FormGroup;
  guess: number;
  expected: number;

  validationMessage = 'Try again';
  errorMessage: string;

  guessedCorrectly: boolean;
  
  constructor(private fb: FormBuilder, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {    

    console.log('**** In ngOnInit ***');
    this.guessedCorrectly = false;
    this.errorMessage = '';
    this.generatedNumber = Math.floor(Math.random() * 10);
    this.expected = this.timesNumber * this.generatedNumber;
    this.guessForm = this.fb.group({
      result: ['', matchesExpected(this.expected)],
    })

    //create watcher    
    const guessControl = this.guessForm.get('result');
     guessControl.statusChanges   
                 .subscribe(value => this.resetError(guessControl));
    
   }

  setMessage(c: AbstractControl): void {
    this.errorMessage='';
      if ((c.touched || c.dirty) && c.errors) {
        this.errorMessage = this.validationMessage;
        this.guessedCorrectly = false;
      }
      else {
        console.log('setMessage found control NOT in error - we can open dialog from here!')
        
        if (this.guessedCorrectly) {
          this.ngOnInit();
        }
        else {
          this.guessedCorrectly = true;
        }
      }
  }

  resetError(c: AbstractControl): void {
    this.errorMessage='';
    console.log('In resetError')
      
  }

  save() {    
    console.log("--- in save() which is onSubmit ---");
    const guessControl = this.guessForm.get('result');
    this.setMessage(guessControl)
  }

  openTableDialog(): void {

    console.log('In table3 open dialog');
    let dialogRef = this.dialog.open(Table3DialogComponent, {
      height: '775px',
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
