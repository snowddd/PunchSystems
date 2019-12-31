import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, timer, Subscriber } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FactoryService {
  headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient, private config: ConfigService) {
    this.headers = new HttpHeaders();

  }
  id;


  sendRequest(url:string,data:object): Observable<any> {

   return this.http.post(`${this.config.apiConfig.host}/${url}`, data);

  }
}
