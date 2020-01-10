import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, timer, Subscriber } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  nowDate = new Date().getUTCFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()

  headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient, private config: ConfigService) {
    this.headers = new HttpHeaders();

  }


  sendRequest(url: string, data: object): Observable<any> {

    return this.http.post(`${this.config.apiConfig.host}/${url}`, data);

  }

  checkDateMin(leaveDate: string) {
    //year leaveDate>nowDate
    if (parseInt(leaveDate.slice(0, 4)) > parseInt(this.nowDate.slice(0, 4))) {
      return true;
    }
    //same year, month leaveDate>nowDate
    else if (parseInt(leaveDate.slice(0, 4)) === parseInt(this.nowDate.slice(0, 4)) && parseInt(leaveDate.slice(5, 7)) > parseInt(this.nowDate.slice(5, 7))) {
      return true;
    }
    //same year, same month, date leaveDate>nowDate
    else if (parseInt(leaveDate.slice(0, 4)) === parseInt(this.nowDate.slice(0, 4)) && parseInt(leaveDate.slice(5, 7)) === parseInt(this.nowDate.slice(5, 7)) && parseInt(leaveDate.slice(8, 10)) >= parseInt(this.nowDate.slice(7, 10))) {
      return true;
    }
    else {
      return false;
    }

  }

}
