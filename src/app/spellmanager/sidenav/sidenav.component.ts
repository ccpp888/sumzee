import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sp-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  isDarkTheme: boolean = false;

  constructor(zone: NgZone, private router: Router) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = mql));
    
  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit() {
    this.router.events.subscribe(() => {
      if (this.isScreenSmall())
        this.sidenav.close();
    })
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  routeChoice(choice: number) {
    console.log('SidenavComponent:choice=' + choice);
    this.router.navigateByUrl('/spellmanager/spelling/' + choice);
  }

  weeklyChoice(choice: number) {
    console.log('SidenavComponent:choice=' + choice);
    this.router.navigateByUrl('/spellmanager/weekly/' + choice);
  }
}
