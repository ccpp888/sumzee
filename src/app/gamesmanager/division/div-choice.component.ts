import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-div-choice',
  templateUrl: './div-choice.component.html',
  styleUrls: []
})
export class DivChoiceComponent {

  constructor(private router: Router) { }

  routeTo(level: number) {
    console.log('DivChoiceComponent:level='+level);
    this.router.navigateByUrl('/gamesmanager/divide/'+level);
  }

}
