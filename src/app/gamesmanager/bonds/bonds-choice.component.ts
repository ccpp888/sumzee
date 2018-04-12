import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bonds-choice',
  templateUrl: './bonds-choice.component.html',
  styleUrls: []
})
export class BondsChoiceComponent {

  constructor(private router: Router) { }

  routeToBonds(bondsNum: number) {
    console.log("BondsChoiceComponent:bondsNum="+bondsNum);
    this.router.navigateByUrl("/gamesmanager/bonds/"+bondsNum);
  }

}

