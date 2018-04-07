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
  exclusion = [];
  
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
	  }else if(this.exclusion.indexOf(data.new_ing) > -1){
      alert("already exist in exclusion!");
    }else{
		 this.kitchen.push(data.new_ing);
     if(this.exclusion.length>0){
      this.http.get("http://localhost:3000/searchWithExclusion/"+this.kitchen+"/"+this.exclusion).
        map((response) => response.json()).
        subscribe((data) => {
          this.allRecipes = data.data;
        });
     }else{
       this.http.get("http://localhost:3000/searchByIngredients/"+ this.kitchen).
        map((response) => response.json()).
        subscribe((data) => {
          this.allRecipes = data.data;
        });
     }
		 
	  }
  }
  
  removeIngredient(data){
	  let ind = this.kitchen.indexOf(data);
	  this.kitchen.splice(ind,1);
    if(this.kitchen.length===0){
      this.allRecipes = [];
    }
    this.http.get("http://localhost:3000/searchByIngredients/"+ this.kitchen).
      map((response) => response.json()).
      subscribe((data) => {
        this.allRecipes = data.data;
      });
  }
  
  remove_all_ingredients(){
	  this.kitchen = [];
	  this.allRecipes = [];
  }
  
  searchwithExclusion(data){
    if(this.exclusion.indexOf(data.new_exclusion) > -1){
      alert("already exist in exclusion!");
    } else if(this.kitchen.indexOf(data.new_exclusion) > -1){
      alert("already exist in kitchen!");
    }else{
     this.exclusion.push(data.new_exclusion);
     if(this.kitchen.length === 0){
      this.allRecipes = [];
     }else{
       this.http.get("http://localhost:3000/searchWithExclusion/"+this.kitchen+"/"+this.exclusion).
        map((response) => response.json()).
        subscribe((data) => {
          this.allRecipes = data.data;
        });
      }
    }
  }

  exc_remove(data){
    let ind = this.exclusion.indexOf(data);
    this.exclusion.splice(ind,1);
    if(this.exclusion.length>0){
      this.http.get("http://localhost:3000/searchWithExclusion/"+this.kitchen+"/"+this.exclusion).
        map((response) => response.json()).
        subscribe((data) => {
          this.allRecipes = data.data;
        });
    }else {
      this.http.get("http://localhost:3000/searchByIngredients/"+ this.kitchen).
        map((response) => response.json()).
        subscribe((data) => {
          this.allRecipes = data.data;
        });
    }
  }
}
