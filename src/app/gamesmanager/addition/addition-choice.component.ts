import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addition-choice',
  templateUrl: './addition-choice.component.html',
  styleUrls: ['./addition-choice.component.scss']
})
export class AdditionChoiceComponent {

  constructor(private router: Router) { }

  routeToAddition(difficulty: number) {
    console.log("AdditionChoiceComponent:difficulty="+difficulty);
    this.router.navigateByUrl("/gamesmanager/add/"+difficulty);
  }

}
