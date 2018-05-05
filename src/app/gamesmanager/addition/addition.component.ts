import { Component, OnInit, Renderer } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SumbaseComponent } from '../../shared/sumbase.component';
import { UtilsService } from '../../shared/utils.service';

@Component({  
  templateUrl: './addition.component.html'
})
export class AdditionComponent extends SumbaseComponent implements OnInit {

  private static count: number = 0;

  constructor(fb: FormBuilder, dialog: MatDialog, renderer: Renderer, route: ActivatedRoute, router: Router, utils: UtilsService) {
    super(fb, dialog, renderer, router, route, utils);
  }

  ngOnInit() {

    console.log('In AdditionComponent ngOnInit');
    AdditionComponent.count++;

    switch (this.getLevel()) {
      case 0: {
        this.title = 'Warm sums';
        this.number1 = this.utils.getRandom(1, 10);
        this.number2 = this.utils.getRandom(1, 20);
        break;
      }
      case 1: {
        this.title = 'Hot sums';
        this.number1 = this.utils.getRandom(1, 10);
        this.number2 = this.utils.getRandom(10, 100);
        break;
      }
      case 2: {
        this.title = 'Hotter sums';
        this.number1 = this.utils.getRandom(100, 1000);
        this.number2 = this.utils.getRandom(1000, 8000);
        //round to nearest 50
        this.number1 = this.utils.roundnum(this.number1, 50);
        this.number2 = this.utils.roundnum(this.number2, 50);
        break;
      }
      default: {
        this.title = 'Hottest sums!';
        this.number1 = this.utils.getRandom(10, 100);
        this.number2 = this.utils.getRandom(1000, 8000);
        break;
      }
    }
    this.expected = this.number1 + this.number2;

    super.setupForm();
    super.setFocusOnInput();
  }

  getCount() {
    return AdditionComponent.count;
  }

  resetCount() {
    AdditionComponent.count = 0;
  }

  ngOnDestroy() {
    console.log("* AdditionComponent in ngOnDestory *");
    this.resetCount();
  }
}
