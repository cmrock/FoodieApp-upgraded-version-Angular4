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
  kitchen = [];
  constructor(private http: Http) {}

  ngOnInit() {}
  searchRecipeName(data:string){
    this.http.get("http://localhost:3000/searchByRecipeName/"+ data).
    map((response) => response.json()).
    subscribe((data) => {
      this.allRecipes = data.data;
    });
  }
  searchByIngredients(data){
	  if(this.kitchen.indexOf(data.new_ing) > -1){
		  alert("already exist in kitchen!");
	  }else{
		 this.kitchen.push(data.new_ing);
		 this.http.get("http://localhost:3000/searchByIngredients/"+ this.kitchen).
			map((response) => response.json()).
			subscribe((data) => {
			  this.allRecipes = data.data;
			});
	  }
  }
  removeIngredient(data){
	  let ind = this.kitchen.indexOf(data);
	  this.kitchen.splice(ind,1);
  }
  remove_all_ingredients(){
	  this.kitchen = [];
	  this.allRecipes = [];
  }
}
