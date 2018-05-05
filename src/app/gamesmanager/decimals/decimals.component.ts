import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../shared/utils.service';
import { SumbaseComponent } from '../../shared/sumbase.component';

@Component({
  selector: 'app-decimals',
  templateUrl: './decimals.component.html'
})

export class DecimalsComponent extends SumbaseComponent implements OnInit {

  private static count: number = 0;

  private wholeNumbers: number[] = [25, 50, 75, 125, 150, 175];
  private decimals: number[] = [0.25, 0.5, 0.75, 1.25, 1.5, 1.75, 2.25, 2.5];

  constructor(fb: FormBuilder, dialog: MatDialog, renderer: Renderer, router: Router, route: ActivatedRoute, utils: UtilsService) { 
    super(fb, dialog, renderer,router, route, utils);
  }

  ngOnInit() {
    console.log('In DecimalsComponent ngOnInit count=%s', DecimalsComponent.count);
    DecimalsComponent.count++;
   
    if (DecimalsComponent.count > 3) {
      this.number1 = this.decimals[this.utils.getRandomInt(1, 8) - 1];
      this.number2 = this.decimals[this.utils.getRandomInt(1, 8) - 1];
      this.title = 'Now, its real decimals!'

    }
    else {
      this.number1 = this.wholeNumbers[this.utils.getRandomInt(1, 6) - 1];
      this.number2 = this.wholeNumbers[this.utils.getRandomInt(1, 6) - 1];
      this.title = 'Preparing for decimals, lets start with whole numbers...'
    }

    this.expected = this.number1 + this.number2;
    
    super.setupForm();
    super.setFocusOnInput();
  }

  getCount() {
    return DecimalsComponent.count;
  }

  resetCount() {    
    DecimalsComponent.count = 0;
  }

  ngOnDestroy() {
    console.log('DecimalsComponent in ngOnDestory');
    this.resetCount();
  }
}
