import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { SumbaseComponent } from '../../shared/sumbase.component';
import { UtilsService } from '../../shared/utils.service';

@Component({  
  templateUrl: './multiplication.component.html'
})
export class MultiplicationComponent extends SumbaseComponent implements OnInit {

  private static count: number = 0;
  
  constructor(fb: FormBuilder, dialog: MatDialog, renderer: Renderer, router: Router, route: ActivatedRoute, utils: UtilsService) {
    super(fb, dialog, renderer, router, route, utils);
  }

  ngOnInit() {

    console.log('MultiplicationComponent in ngOnInit, count=%s', MultiplicationComponent.count);
    MultiplicationComponent.count++;

    switch (super.getLevel()) {
      case 0: {
        this.title = 'Warm sums';
        this.number1 = this.utils.getRandom(1, 5);
        this.number2 = this.utils.getRandom(1, 10);
        break;
      }
      case 1: {
        this.title = 'Hot sums';
        this.number1 = this.utils.getRandom(1, 10);    
        this.number2 = this.utils.getRandom(3, 20);    
        break;
      }
      case 2: {
        this.title = 'Hotter sums';
        this.number1 = this.utils.getRandom(2, 5);    
        this.number2 = this.utils.getRandom(10, 150);    
        //round to nearest 5     
        this.number2 = this.utils.roundnum(this.number2, 5);
        break;
      }
      default: {
        this.title = 'Hottest sums!';
        this.number1 = this.utils.getRandom(1, 10);    
        if (this.number1 == 1) this.number1 = 2;
        this.number2 = this.utils.getRandom(10, 100);    
        break;
      }
    }
    this.expected = this.number1 * this.number2; 

    super.setupForm();
    super.setFocusOnInput();
  }

  getCount() {
    return MultiplicationComponent.count;
  }

  resetCount() {    
    MultiplicationComponent.count = 0;
  }

  ngOnDestroy() {
    console.log('MultiplicationComponent in ngOnDestory');
    this.resetCount();
  }

}

