import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.scss']
})

export class BondsComponent implements OnInit {

  bondNumber: number = 10;
  generatedNumber: number;
  guess: number;

  hasBondError: boolean = false;

  constructor() { }

  ngOnInit() {
    this.generatedNumber = Math.floor(Math.random() * 10);
  }

  guessit() : boolean {
    console.log("In guessit guess=%d", this.guess);
    if (this.generatedNumber + this.guess == this.bondNumber) {
      this.hasBondError = false;
      return true;
    }
    this.hasBondError = true;
    console.log("hasBondError=%s",this.hasBondError);
    return false;    
 }

 //will need to return boolean if using in validation
 onEnter() : void {
  console.log("In onEnter guess=%d", this.guess);
  this.guessit();
 }

}
