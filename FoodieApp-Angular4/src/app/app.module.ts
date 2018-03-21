import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SlideshowModule} from 'ng-simple-slideshow';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainpageComponent } from './mainpage/mainpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainpageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    SlideshowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
