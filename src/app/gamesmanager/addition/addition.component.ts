import { Component, OnInit, ViewChildren, Renderer, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';

import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../bonds/success-dialog.component';
import { isNull } from 'util';
import { CongratsDialogComponent } from '../decimals/congrats-dialog.component';

function matchesExpected(exp: number): ValidatorFn {

  return (c: AbstractControl): { [key: string]: boolean } | null => {

    if (c.value == undefined || c.value == '') {
      return null;
    }

    if ((isNaN(c.value) || c.value != exp)) {
      console.log('In matchesExpected func returning true (in error) ==');
      return { 'expected': true }
    }
    return null;
  }
}


function roundnum(num, rounder) {
  return Math.round(num / rounder) * rounder;
}

@Component({
  selector: 'app-addition',
  templateUrl: './addition.component.html',
  styleUrls: []
})
export class AdditionComponent implements OnInit {

  static count: number = 0;
  static alreadyGenerated: number[] = [];

  title: string;
  maxCorrect: number = 8;
  number1: number;
  number2: number;
  expected: number;
  actual: number;
  difficulty: number;
  guessedCorrectly: boolean;

  guessForm: FormGroup;
  guessControl: AbstractControl;

  validationMessage = 'Try again';
  errorMessage: string;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private renderer: Renderer, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    console.log("* AdditionComponent : in ngOnInit, count==" + AdditionComponent.count);

    AdditionComponent.count++;

    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      console.log("param==" + param);
      let id = +param //cast to number from string
      this.difficulty = id;
    }
    else {
      console.error("no param for id found");
    }


    if (this.difficulty == 1) {
      //easy
      this.title = 'easier sums';

      this.number1 = Math.floor(Math.random() * 10) + 1;
      this.number2 = Math.floor(Math.random() * 100) + 10;

    } else if (this.difficulty == 2) {
      //tricky
      this.title = 'tricky sums';

      this.number1 = Math.floor(Math.random() * 1000) + 100;
      this.number2 = Math.floor(Math.random() * 8000) + 1000;

      //round to nearest 50
      this.number1 = roundnum(this.number1, 50);
      this.number2 = roundnum(this.number2, 50);
    } else {
      //hardest
      this.title = 'hardest sums!';

      this.number1 = Math.floor(Math.random() * 100) + 10;
      this.number2 = Math.floor(Math.random() * 8000) + 1000;
    }


    this.expected = this.number1 + this.number2;
    this.guessedCorrectly = false;
    this.errorMessage = '';

    this.guessForm = this.fb.group({
      actual: ['', matchesExpected(this.expected)],
    })

    this.guessControl = this.guessForm.get('actual');

    this.guessControl.statusChanges
      .subscribe(value => this.resetError(this.guessControl));

    this.setFocusOnInput();

  }

  refocus() {
    if (this.guessedCorrectly) {
      this.setFocusOnInput();
    }
  }

  setFocusOnInput() {
    console.log("In reset & setFocusOnInput");
    const element = this.renderer.selectRootElement('#input1');
    setTimeout(() => element.focus(), 0);
  }

  checkInError(c: AbstractControl): void {
    this.errorMessage = '';

    console.log('checkInError value=%s, pristine=%s, touched=%s, dirty=%s, errors=%s, valid=%s', c.value, c.pristine, c.touched, c.dirty, c.errors, c.valid);

    if (c.pristine || isNaN(c.value) || isNull(c.value) || (c.value == '')) {
      console.log('checkInError found pristine');
      this.errorMessage = 'Enter a number';
      this.setFocusOnInput();
      return;
    }

    if ((c.touched || c.dirty) && c.errors) {
      console.log('checkInError is in error');
      this.errorMessage = this.validationMessage;
      this.guessedCorrectly = false;
      this.setFocusOnInput();
    }
    else {
      console.log('checkInError not in error')
      if (this.guessedCorrectly) {
        if (AdditionComponent.count >= this.maxCorrect) {
          AdditionComponent.count = 0;
          this.openCongratsDialog();
        }
        else {
          this.ngOnInit();
        }
      }
      else {
        console.log("checkInError setting guessedCorrectly, disabling");
        this.guessedCorrectly = true;
        //disable user input
        this.guessControl.disable();
        //focus on submit button
        document.getElementById('go1').focus();

      }
    }
  }

  /** 
   * Called from subscribing to form input status changes, this resets the errorMessage
   * to '' if the input field is empty/valid: this handles the case where user deletes
   * an incorrect guess to try again.
   */
  resetError(c: AbstractControl): void {
    console.log('In resetError');
    if (c.valid || c.pristine) {
      console.log("...resetting errorMessage");
      this.errorMessage = '';
    }
  }

  save() {
    console.log("In save() - which is onSubmit");
    const guessControl = this.guessForm.get('actual');
    this.checkInError(guessControl);
  }

  returnToMenu() {
    this.router.navigateByUrl("/gamesmanager/menu");
  }


  openCongratsDialog(): void {

    let dialogRef = this.dialog.open(CongratsDialogComponent, {
      height: '500px',
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("openSuccessDialog result==true");
        this.router.navigateByUrl("/gamesmanager/menu");
      }
    });
  }

  public ngOnDestroy() {
    console.log("* AdditionComponent in ngOnDestory *");
    AdditionComponent.count = 0;
  }

}
