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
export class GamesmanagerAppComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public router: Router) {
    iconRegistry.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg'));

      this.router.navigate(['/gamesmanager/menu']);
   }

  ngOnInit() {
  }

}
