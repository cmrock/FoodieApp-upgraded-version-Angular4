import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from './recipe';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  allRecipes:Recipe[]=[];
  constructor(private http: Http) {}

  ngOnInit() {}
  searchRecipeName(data:string){
    this.http.get("http://localhost:3000/searchByRecipeName/"+ data).
    map((response) => response.json()).
    subscribe((data) => {
      this.allRecipes = data.data;
    });
  }
}
