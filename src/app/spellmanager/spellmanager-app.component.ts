import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: `  
    <app-sp-sidenav></app-sp-sidenav>        
  `,
  styles: []
})
export class SpellmanagerAppComponent {

  constructor(public router: Router) {   

    this.router.navigate(['/spellmanager/spmenu']);
 }


}
