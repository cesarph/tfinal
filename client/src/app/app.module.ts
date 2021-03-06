import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Http, HttpModule, JsonpModule, RequestOptions, Response, Headers, URLSearchParams } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { AppRoutingModule } from './/app-routing.module';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PersonalComponent } from './inicio/personal/personal.component';
import { PostersComponent } from './inicio/posters/posters.component';
import { AreasComponent } from './inicio/areas/areas.component';
import { AppobservableService } from './services/appobservable.service'

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    FooterComponent,
    PersonalComponent,
    PostersComponent,
    AreasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: null,
      headerName: null
    }),
  ],
  exports: [],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: NoopInterceptor,
    multi: true,
  },
  AppobservableService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
