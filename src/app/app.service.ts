import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CalendarService {
    
    constructor(private http: Http) {
    }

    public extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    isHoliday(countryCode:string, year:string, month:string, day:string): Observable<any> {
        return this.http.get("https://holidayapi.com/v1/holidays?key=1e35baae-d3aa-4239-b52a-ca100abb6860&country="
            +countryCode+"&year="+year+"&month="+month+"&day="+day)
        .map(this.extractData);
    }

}