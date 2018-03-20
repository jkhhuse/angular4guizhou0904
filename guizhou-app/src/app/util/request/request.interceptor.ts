import { Injectable, forwardRef, Injector } from '@angular/core';
import { HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {


  constructor(private _cookieService: CookieService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const userName = this.auth.getUserName();
    const customReq = req.clone({
      // withCredentials: true,
      headers: new HttpHeaders().append('BDOC-User', this._cookieService.get('userName'))
    });

    return next
      .handle(customReq);
  }
}
