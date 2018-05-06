import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({  
  template: `  
    <app-sidenav></app-sidenav>        
  `,
  styles: []
})
export class GamesmanagerAppComponent {

  constructor(public router: Router) {   

      this.router.navigate(['/gamesmanager/menu']);
   }
  
}
