import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router)  { }

  ngOnInit() {
  }

  routeChoice(choice: number) {
    console.log('MenuComponent:routeChoice:choice=' + choice);
    this.router.navigateByUrl('/spellmanager/spelling/' + choice);
  }

  weeklyChoice(choice: number) {
    console.log('MenuComponent:weeklyChoice:choice=' + choice);
    this.router.navigateByUrl('/spellmanager/weekly/' + choice);
  }

}
