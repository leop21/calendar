import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'calendar-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')]
})
export class AppComponent {

    public startDate: Date;
    public numberOfDays: number;
    public countryCode: string;

    public calendar: any = [];

    constructor() {
    }

    getMonthLabel(monthNumber: number) {
        let monthLabel:string;
        switch(monthNumber) {
            case 0:
                monthLabel = "January";
                break;
            case 1:
                monthLabel = "February";
                break;
            case 2:
                monthLabel = "March";
                break;
            case 3:
                monthLabel = "April";
                break;
            case 4:
                monthLabel = "May";
                break;
            case 5:
                monthLabel = "June";
                break;
            case 6:
                monthLabel = "July";
                break;
            case 7:
                monthLabel = "August";
                break;
            case 8:
                monthLabel = "September";
                break;
            case 9:
                monthLabel = "October";
                break;
            case 10:
                monthLabel = "November";
                break;
            case 11:
                monthLabel = "December";
                break;

        }
        return monthLabel;
    }

    createCalendars() {
        console.log(this.startDate);
        let currentDate = new Date(this.startDate);
        let newMonth: Boolean = true;
        let currentCalendar: number = 0;

        for(let i=0; i<this.numberOfDays; i++)
        {
            if(newMonth) {
                this.calendar.push({
                    monthLabel: this.getMonthLabel(currentDate.getMonth()),
                    yearLabel: currentDate.getFullYear(), 
                    days: []
                });
                newMonth = false;
            }

            this.calendar[currentCalendar].days.push({
                dayNumber: currentDate.getDate(),
                visible: true,
                holiday: false,
                weekend: false,
                dayOfWeek: currentDate.getDay()
            });

            currentDate.setDate(currentDate.getDate() + 1);
            if(currentDate.getDate() == 1)
                newMonth = true;

        }

        console.log(this.calendar);
    }
}