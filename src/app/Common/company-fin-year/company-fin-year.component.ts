import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-fin-year',
  templateUrl: './company-fin-year.component.html',
  styleUrls: ['./company-fin-year.component.css']
})
export class CompanyFinYearComponent implements OnInit {
  FROM_DATE:any;
  TO_DATE:any;
  constructor() { }

  ngOnInit(): void {
  }

}
