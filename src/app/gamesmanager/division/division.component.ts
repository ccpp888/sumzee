import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilsService } from '../../shared/utils.service';
import { SumbaseComponent } from '../../shared/sumbase.component';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html'
})
export class DivisionComponent extends SumbaseComponent implements OnInit {

  static count: number = 0;  
  
  constructor(fb: FormBuilder, dialog: MatDialog, renderer: Renderer, router: Router, route: ActivatedRoute, utils: UtilsService) { 
    super(fb, dialog, renderer,router, route, utils);
  }

  ngOnInit() {
    console.log('In DivisionComponent ngOnInit');
    DivisionComponent.count++;

    switch (super.getLevel()) {
      case 0: {
        this.doLevelWarm();
        break;
      }
      case 1: {
        this.doLevelHot();
        break;
      }
      case 2: {
        this.doLevelHotter();
        break;
      }
      default: {
        this.doLevelHottest();
        break;
      }
    }
    this.expected = this.number1 / this.number2; 
    console.log('count=%s, number1=%s, number2=%s, expected=%s', DivisionComponent.count, this.number1, this.number2, this.expected);

    super.setupForm();
    super.setFocusOnInput();
  } 

  doLevelWarm() {
    this.title = 'Warm sums';    
    let divisors = [1,2,3,4];    
    let startingPoint = this.utils.getRandom(4, 10);    
    this.number2 = divisors[Math.floor(Math.random() * divisors.length)];
    this.number1 = startingPoint * this.number2;       
  }

  doLevelHot() {
    this.title = 'Hot sums';
    let startingPoint = this.utils.getRandom(5, 15);    
    this.number2 = this.utils.getRandom(2, 5);  
    this.number1 = startingPoint * this.number2;          
  }

  doLevelHotter() {
    this.title = 'Hotter sums';
    let startingPoint = this.utils.getRandom(10, 30);  
    this.number2 = this.utils.getRandom(2, 10);  
    this.number1 = startingPoint * this.number2;         

    // let noMod = true;
    // let counter = 1;
    // while (noMod) {
    //   if (counter == 200) {
    //     console.log('** counter reached 200 **');
    //     this.number1 = (Math.floor(Math.random() * 50)) * 2;
    //     this.number2 = 2;
    //     console.log ('>> reset as number1=%s, number2=%s', this.number1, this.number2);        
    //     break;
    //   }
    //   if (this.number1 % this.number2 == 0) {
    //     noMod = false;
    //   }
    //   else {
    //     this.number2 = Math.floor(Math.random() * 10) + 2;
    //     noMod = true;
    //     counter++;
    //   }     
    // }
  }

  doLevelHottest() {
    this.title = 'Hottest sums';
    let divisors = [10,20,50,100];
    let startingPoint = this.utils.getRandom(10, 50);   
    this.number2 = divisors[Math.floor(Math.random() * divisors.length)];
    this.number1 = startingPoint * this.number2;        
  }

  getCount() {
    return DivisionComponent.count;
  }

  resetCount() {    
    DivisionComponent.count = 0;
  }

  ngOnDestroy() {
    console.log('* DivisionComponent in ngOnDestory *');
    this.resetCount();
  }

}

