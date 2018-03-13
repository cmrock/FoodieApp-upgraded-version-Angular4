import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() result:string = "";
  @Output() clicked = new EventEmitter<string>();
	constructor() {}

	ngOnInit() {}

  searchRecipeName(searchTerm:string){
	  this.clicked.emit(searchTerm);
  }
}
