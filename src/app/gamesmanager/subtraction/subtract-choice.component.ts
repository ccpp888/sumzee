import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subtract-choice',
  templateUrl: './subtract-choice.component.html',
  styleUrls: ['./subtract-choice.component.scss']
})
export class SubtractChoiceComponent {

  constructor(private router: Router) { }

  routeTo(level: number) {   
    this.router.navigateByUrl('/gamesmanager/subtract/'+level);
  }

}
