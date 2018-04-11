import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TableDialogComponent } from './table-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-choice',
  templateUrl: './table-choice.component.html',
  styleUrls: ['./table-choice.component.scss']
})
export class TableChoiceComponent {

  constructor(private dialog: MatDialog, private router: Router) { }

  createTable(tableNum: number) {
    console.log("tableNum="+tableNum);
    this.router.navigateByUrl("/gamesmanager/table/"+tableNum);
  }

}
