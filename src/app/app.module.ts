import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { LocationStrategy, HashLocationStrategy, CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ AppComponent ],
    imports: [ BrowserModule, FormsModule, CommonModule, HttpModule],
    providers: [ ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }