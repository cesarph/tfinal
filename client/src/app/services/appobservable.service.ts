import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestOptions, Response, XHRBackend } from '@angular/http';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';

// we can now access environment.apiUrl
const API_URL = environment.apiUrl;

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})
export class AppobservableService {
  headers: Headers;
  options: RequestOptions;
  apiUrl= API_URL;

  constructor(private http: Http,
    private router: Router,
    private notification: SimpleNotificationsModule) {
      this.headers = new Headers({ 'Content-Type': 'application/json' });
      this.options = new RequestOptions({ headers: this.headers });
  
   }


  createService(url: string, param: any, ishome?: boolean): Observable<any> {
    
    let body = JSON.stringify(param);
    console.log(this.apiUrl+url)
    return this.http  
        .post(this.apiUrl + url, body, this.options)
        .map(data => {
          console.log(data)
         return data
        })
      
        
}
}