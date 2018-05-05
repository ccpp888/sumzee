import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({  
  templateUrl: './bonds-choice.component.html'
})
export class BondsChoiceComponent {

  constructor(private router: Router) { }

  routeToBonds(bondsNum: number) {
    console.log("BondsChoiceComponent:bondsNum="+bondsNum);
    this.router.navigateByUrl("/gamesmanager/bonds/"+bondsNum);
  }

}

