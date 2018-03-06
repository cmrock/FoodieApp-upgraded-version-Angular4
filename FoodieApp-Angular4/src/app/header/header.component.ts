import {Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	recipes = [];
    constructor( private http: Http) {}
	  ngOnInit() {}

    searchRecipeName(data) {
        console.log(data.textSearch);
        this.http.get("http://localhost:3000/searchByRecipeName/"+ data.textSearch).
        map((response) => response.json()).
        subscribe((data) => {
          this.recipes = data.data;
		  console.log("Hello");
		  console.log(this.recipes);
        });
    }
}
