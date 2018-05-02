import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
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
