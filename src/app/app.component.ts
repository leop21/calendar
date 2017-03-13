import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService} from './app.service';

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

    constructor(private calendarService: CalendarService) {
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

    addHoliday(year:string, month:string, day:string, weekDay:number, currentCalendar:number, currentWeek: number ) {
        this.calendarService.isHoliday(this.countryCode, year, month, day).subscribe(
            res => {

                if(res.holidays.length>0) {
                    this.calendar[currentCalendar].weeks[currentWeek].days[weekDay].holiday = true;
                    console.log(res);
                }
            },
            error => {

            }
        );
    }

    createCalendars() {
        
        let currentDate: Date = this.string2Date(this.startDate, "yyyy-mm-dd");
        let newMonth: Boolean = true;
        let newWeek: Boolean;
        let currentCalendar: number = 0;
        let currentWeek: number = 0;

        for(let i=0; i<this.numberOfDays; i++)
        {
            if(newMonth) {
                this.calendar.push({
                    monthLabel: this.getMonthLabel(currentDate.getMonth()),
                    yearLabel: currentDate.getFullYear(), 
                    weeks: []
                });
                newMonth = false;
                currentWeek = 0;

                this.calendar[currentCalendar].weeks.push({days:[]});


                let startingDayOfWeek = currentDate.getDay();
                for(let e=0; e<startingDayOfWeek; e++) {
                    this.calendar[currentCalendar].weeks[currentWeek].days.push({
                        dayNumber: "",
                        visible: false,
                        holiday: false,
                        weekend: false,
                        dayOfWeek: e
                    });
                }
                newWeek = false;
            }
            if(newWeek) {
                currentWeek ++;      
                this.calendar[currentCalendar].weeks.push({days:[]});
                let startingDayOfWeek = currentDate.getDay();
                for(let e=0; e<startingDayOfWeek; e++) {
                    this.calendar[currentCalendar].weeks[currentWeek].days.push({
                        dayNumber: "",
                        visible: false,
                        holiday: false,
                        weekend: false,
                        dayOfWeek: e
                    });
                }
                this.addHoliday(currentDate.getFullYear().toString(), (currentDate.getMonth()+1).toString(), currentDate.getDate().toString(), currentDate.getDay(), currentCalendar, currentWeek);
                newWeek = false;                
            }

            this.calendar[currentCalendar].weeks[currentWeek].days.push({
                dayNumber: currentDate.getDate(),
                visible: true,
                holiday: false,
                weekend: (currentDate.getDay() == 6 || currentDate.getDay() == 0),
                dayOfWeek: currentDate.getDay()
            });



            let lastDayOfWeek = currentDate.getDay();
            currentDate.setDate(currentDate.getDate() + 1);

            if((currentDate.getDate()) == 1){
                for(let e=currentDate.getDay(); e<=6; e++) {
                    this.calendar[currentCalendar].weeks[currentWeek].days.push({
                        dayNumber: "",
                        visible: false,
                        holiday: false,
                        weekend: false,
                        dayOfWeek: e
                    });
                }
                newMonth = true;
                currentCalendar ++;
            }

            if(currentDate.getDay() == 0)
                newWeek = true;

        }

        if(currentDate.getDay()!=0)
            for(let e=currentDate.getDay(); e<=6; e++) {
                console.log(e);
                this.calendar[currentCalendar].weeks[currentWeek].days.push({
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