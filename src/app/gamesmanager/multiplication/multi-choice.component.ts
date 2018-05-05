import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrls: ['./multi-choice.component.scss']
})
export class MultiChoiceComponent {
  
  constructor(private router: Router) { }

  routeToAddition(level: number) {
    console.log('AdditionChoiceComponent:level='+level);
    this.router.navigateByUrl('/gamesmanager/multiply/'+level);
  }
}
