import { Component } from '@angular/core';

@Component({
  selector: 'calendar-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')]
})
export class AppComponent {

    public startDate: Date;
    public numberOfDays: number;
    public countryCode: string;

    constructor() {
    }

    createCalendars() {

    }
}