import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  //an attribute selector would look like this: [appLayout]
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild('sideNav') sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

}
