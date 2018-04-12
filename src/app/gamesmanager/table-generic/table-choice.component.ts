import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-choice',
  templateUrl: './table-choice.component.html',
  styleUrls: []
})
export class TableChoiceComponent {

  constructor(private router: Router) { }

  createTable(tableNum: number) {
    console.log("TableChoiceComponent:tableNum="+tableNum);
    this.router.navigateByUrl("/gamesmanager/table/"+tableNum);
  }

}
