import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({  
  templateUrl: './addition-choice.component.html'
})
export class AdditionChoiceComponent {

  constructor(private router: Router) { }

  routeToAddition(difficulty: number) {
    console.log('AdditionChoiceComponent:difficulty='+difficulty);
    this.router.navigateByUrl('/gamesmanager/add/'+difficulty);
  }

}
