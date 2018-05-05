import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({  
  templateUrl: './multi-choice.component.html'
})
export class MultiChoiceComponent {
  
  constructor(private router: Router) { }

  routeToAddition(level: number) {
    console.log('AdditionChoiceComponent:level='+level);
    this.router.navigateByUrl('/gamesmanager/multiply/'+level);
  }
}
