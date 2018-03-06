import { Component, OnInit, Input} from '@angular/core';
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  mainpage = 'main content';
  @Input() recipes :HeaderComponent;
  constructor() { }

  ngOnInit() {
	console.log("Main");
	console.log(this.recipes);
  }
}
