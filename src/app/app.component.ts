import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'calendar-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')]
})
export class AppComponent {

    public startDate: string;
    public numberOfDays: number;
    public countryCode: string;

    public calendar: any = [];

    constructor() {
    }

    public string2Date(dateString: string, dateFormat: string) {
        let formatArray = dateFormat.split('-');
        let dateArray = dateString.split('-');
        let day: string;
        let month: string;
        let year: string;
        for (let i = 0; i < formatArray.length; i++) {
            switch (formatArray[i]) {
                case 'dd':
                    day = dateArray[i];
                    break;
                case 'mm':
                    month = (parseInt(dateArray[i]) - 1).toString();
                    break;
                case 'yyyy':
                    year = dateArray[i];
                    break;
            }
        }
        return new Date(parseInt(year), parseInt(month), parseInt(day));
    }

    createCalendars() {
        let currentDate: Date = this.string2Date(this.startDate, "yyyy-mm-dd");
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
                let startingDayOfWeek = currentDate.getDay();
                for(let e=0; e<startingDayOfWeek; e++) {
                    this.calendar[currentCalendar].days.push({
                        dayNumber: null,
                        visible: false,
                        holiday: false,
                        weekend: false,
                        dayOfWeek: e
                    });
                }
            }

            this.calendar[currentCalendar].days.push({
                dayNumber: currentDate.getDate(),
                visible: true,
                holiday: false,
                weekend: false,
                dayOfWeek: currentDate.getDay()
            });
            let lastDayOfWeek = currentDate.getDay();
            currentDate.setDate(currentDate.getDate() + 1);
            if((currentDate.getDate()) == 1){
                for(let e=lastDayOfWeek; e<=6; e++) {
                    this.calendar[currentCalendar].days.push({
                        dayNumber: null,
                        visible: false,
                        holiday: false,
                        weekend: false,
                        dayOfWeek: e
                    });
                }
                newMonth = true;
                currentCalendar ++;
            }

        }

        for(let e=currentDate.getDay(); e<=6; e++) {
            this.calendar[currentCalendar].days.push({
                dayNumber: null,
                visible: false,
                holiday: false,
                weekend: false,
                dayOfWeek: e
            });
        }

        console.log(this.calendar);
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
}