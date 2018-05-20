import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestOptions, Response, XHRBackend } from '@angular/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
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
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    private notification: NotificationsService
  ) { }


  chekheaders(): void {
    this.headers = null;
      this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
  }
  showErrorNotificationApi(msg) {
    this.notification.error(
      'Error: ',
      msg,
      {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 10
      }
    );
  }
  showErrorNotificationHeader(error) {
    if(error.status >= 300){
      var msg = JSON.parse(error._body).msg;
      this.notification.error(
        'Error: ',
        msg,
        {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 10
        }
      );

      if(error.status == 401){
        if(error._body.includes("expired")){
          this.router.navigate(["login"]);
        }
      }
    }
  }
  createService(url: string, param: any, ishome?: boolean): Observable<any> {
    this.spinnerService.show();
    this.chekheaders();
    let body = JSON.stringify(param);
    return this.http
        .post(this.apiUrl + url, body, this.options)
        .map(data => {
          let body = data.json() || {};
         
           if(body.code != null && body.code != undefined && body.code < 0){
            this.showErrorNotificationApi(body.msg);
          } else if(body.code != null && body.code != undefined && body.code == 0){
            return body.data || {};
          } else {
            return body || {};
          }
        })
        .catch(err =>  { 
          if(ishome){
            this.notification.error(
              'Usuario o contraseña',
              'incorrectos ' ,
              {
                  timeOut: 5000,
                  showProgressBar: true,
                  pauseOnHover: false,
                  clickToClose: false,
                  maxLength: 10
              }
            );
          }else{
          this.showErrorNotificationHeader(err);
        }
          let errMsg = (err.message) ? err.message :
                        err.status ? `${err.status} - ${err.statusText}` : 'Server error';      
          console.log(errMsg);
          return Observable.throw(errMsg);
        })
        .finally(() => this.spinnerService.hide());
        
}
}
