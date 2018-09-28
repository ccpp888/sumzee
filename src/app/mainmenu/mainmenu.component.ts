import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  siteChoice(choice: number) {
    console.log('MainmenuComponent:siteChoice:choice=' + choice);
    if (choice==0)
    {
      this.router.navigateByUrl('/spellmanager/menu');
    }
    else
    {
      this.router.navigateByUrl('/gamesmanager/menu');
    }
    
  }

}
