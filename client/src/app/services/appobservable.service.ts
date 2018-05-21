import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestOptions, Response, XHRBackend } from '@angular/http';

import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})
export class AppobservableService {
  headers: Headers;
  options: RequestOptions;
  apiUrl= null;

  constructor(private http: Http,
   
    private router: Router
  ) { }


  createService(url: string, param: any, ishome?: boolean): Observable<any> {
    
    let body = JSON.stringify(param);
    return this.http
        .post(this.apiUrl + url, body, this.options)
        .map(data => data)
       
        
}
}
