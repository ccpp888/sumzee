import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

export abstract class SumbaseComponent {
 
  protected maxCorrect: number = 8;
  protected title: string;
  protected number1: number;
  protected number2: number;
  protected expected: number;  
  protected guessedCorrectly: boolean;
  protected guessForm: FormGroup;
  protected guessControl: AbstractControl;  

  constructor(protected fb: FormBuilder, protected dialog: MatDialog, protected renderer: Renderer, protected router: Router, protected route: ActivatedRoute) { }
  //constructor() { }


  getLevel(): number {

    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      console.log("param==" + param);
      let id = +param //cast to number from string
      return id;
    }
    else {
      console.error("no param for id found");
      return 0;
    }
  }
}
