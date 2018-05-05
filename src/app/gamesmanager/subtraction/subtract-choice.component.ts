import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({  
  templateUrl: './subtract-choice.component.html'
})
export class SubtractChoiceComponent {

  constructor(private router: Router) { }

  routeTo(level: number) {   
    this.router.navigateByUrl('/gamesmanager/subtract/'+level);
  }

}
