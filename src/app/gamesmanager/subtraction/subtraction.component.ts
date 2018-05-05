import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilsService } from '../../shared/utils.service';
import { SumbaseComponent } from '../../shared/sumbase.component';

@Component({
  selector: 'app-subtraction',
  templateUrl: './subtraction.component.html'
})
export class SubtractionComponent extends SumbaseComponent implements OnInit {

  private static count: number = 0;

  constructor(fb: FormBuilder, dialog: MatDialog, renderer: Renderer, router: Router, route: ActivatedRoute, utils: UtilsService) { 
    super(fb, dialog, renderer,router, route, utils);
  }

  ngOnInit() {
    console.log('SubtractionComponent in ngOnInit');

    SubtractionComponent.count++;

    switch (super.getLevel()) {
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
    this.expected = this.number1 - this.number2;
    
    super.setupForm();
    super.setFocusOnInput();
  }

  doLevelHot() {
    this.title = 'Hot sums';
    this.number1 = this.utils.getRandom(9, 25);  
    this.number2 = this.utils.getRandom(1, 8);    
  }

  doLevelHotter() { 
    this.title = 'Hotter sums';
    this.number1 = this.utils.getRandom(100, 1000);  
    this.number2 = this.utils.getRandom(1, 100);  
    //round to nearest 25 (easier)
    this.number1 = this.utils.roundnum(this.number1, 25);
    this.number2 = this.utils.roundnum(this.number2, 5);    
  }
  
  doLevelHottest() { 
    this.title = 'Hottest sums';
    this.number1 = this.utils.getRandom(100, 500);  
    this.number2 = this.utils.getRandom(1, 20);      
  }

  getCount() {
    return SubtractionComponent.count;
  }

  resetCount() {    
    SubtractionComponent.count = 0;
  }

  ngOnDestroy() {
    console.log('SubtractionComponent in ngOnDestory');
    this.resetCount();
  }

}

