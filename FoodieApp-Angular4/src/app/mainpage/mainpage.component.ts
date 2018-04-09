import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from './recipe';
import { RecipesService } from '../recipes.service';
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

  constructor(private http: Http, private recipesService: RecipesService) {}

  ngOnInit() {}

  /*
  * @params (data- recipe name)
  * @description
  * Function to get recipe by recipe name from recipeService
  * */
  searchRecipeName(data: string){
    this.recipesService.recipeSearchByName(data)
      .subscribe(data => {
        this.allRecipes = data.data;
      });
  }

  /*
  * @description
  * Function to get recipe by array of ingredients from recipeService
  * */
  searchByIngredients(data){
	  if(this.kitchen.indexOf(data.new_ing) > -1){
		  alert("already exist in kitchen!");
	  }else if(this.exclusion.indexOf(data.new_ing) > -1){
      alert("already exist in exclusion!");
    }else{
		  this.kitchen.push(data.new_ing);
      if(this.exclusion.length>0){
        this.recipesService.recipeSearchByIngWithExcl(this.kitchen, this.exclusion)
          .subscribe(data => {
            this.allRecipes = data.data;
          });
      }else{
        this.recipesService.recipeSearchByIng(this.kitchen)
          .subscribe(data => {
            this.allRecipes = data.data;
          });
      }
	  }
  }
  /*
  * @description
  * Function to remove ingredient from kitchen area and return recipes from recipeService
  * */
  removeIngredient(data){
	  let ind = this.kitchen.indexOf(data);
	  this.kitchen.splice(ind,1);
    if(this.kitchen.length===0){
      this.allRecipes = [];
    }
    this.recipesService.recipeSearchByIng(this.kitchen)
      .subscribe(data => {
        this.allRecipes = data.data;
      });
  }

  remove_all_ingredients(){
	  this.kitchen = [];
	  this.allRecipes = [];
  }
  /*
  * @params
  * @description
  * Function to get recipe by array of ingredients of kitchen area with exclusion of ingredients from exclusion area
  * and get the recipes from recipeService
  * */
  searchWithExclusion(data){
    if(this.exclusion.indexOf(data.new_exclusion) > -1){
      alert("already exist in exclusion!");
    }else if(this.kitchen.indexOf(data.new_exclusion) > -1){
      alert("already exist in kitchen!");
    }else{
      this.exclusion.push(data.new_exclusion);

      if(this.kitchen.length === 0){
        this.allRecipes = [];
      }else{
      this.recipesService.recipeSearchByIngWithExcl(this.kitchen, this.exclusion)
        .subscribe(data => {
          this.allRecipes = data.data;
        });
      }
    }
  }

  /*
  * @description
  * Function to remove ingredients from exclusion area
  * and get the recipes from recipeService
  * */
  exc_remove(data){
    let ind = this.exclusion.indexOf(data);
    this.exclusion.splice(ind,1);
    if(this.exclusion.length>0){
      this.recipesService.recipeSearchByIngWithExcl(this.kitchen, this.exclusion)
        .subscribe(data => {
          this.allRecipes = data.data;
        });
    }else {
      this.recipesService.recipeSearchByIng(this.kitchen)
        .subscribe(data => {
          this.allRecipes = data.data;
        });
    }
  }
}
