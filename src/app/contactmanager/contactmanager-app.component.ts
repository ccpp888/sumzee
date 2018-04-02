import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactmanager-app',
  template: `  
    <app-sidenav></app-sidenav>        
  `,
  styles: []
})
export class ContactmanagerAppComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public router: Router) {
    iconRegistry.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg'));

      this.router.navigate(['/contactmanager/menu']);
   }

  ngOnInit() {
  }

}
