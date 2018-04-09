import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Recipe } from './mainpage/recipe';

@Injectable()
export class RecipesService {

  constructor(private http: Http) {}

  /*
  * @params (name)
  * @description
  * It returns recipe by recipe name
  * */
  recipeSearchByName(name:string): Observable<any> {
    return this.http.get("http://localhost:3000/searchByRecipeName/"+ name).
      map((response) => response.json());
  }

  /*
  * @params (kitchen- array of ingredients)
  * @description
  * It returns all the recipes including all the ingredients of kitchen area
  * */
  recipeSearchByIng(kitchen:Recipe[]): Observable<any> {
    return this.http.get("http://localhost:3000/searchByIngredients/"+ kitchen).
      map((response) => response.json());
  }

  /*
  * @params (kitchen, exclusion)
  * @description
  * It returns all the recipes which includes all the ingredients of kitchen area
  * with exclusion of all the ingredients of exclusion area
  * */
  recipeSearchByIngWithExcl(kitchen:Recipe[], exclusion:Recipe[]): Observable<any> {
    return this.http.get("http://localhost:3000/searchWithExclusion/"+kitchen+"/"+exclusion).
      map((response) => response.json());
  }
}
