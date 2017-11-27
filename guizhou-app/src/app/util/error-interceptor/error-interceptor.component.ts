import { Component, OnInit, Injectable, Inject, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NzNotificationService } from 'ng-zorro-antd';
import 'rxjs/add/operator/catch';
import { TranslateService } from '@ngx-translate/core';
import { ServiceTestService } from '../../service-test/service-test.service';

@Component({
  selector: 'app-error-interceptor',
  templateUrl: './error-interceptor.component.html',
  styleUrls: ['./error-interceptor.component.css']
})
@Injectable()
export class ErrorInterceptorComponent implements HttpInterceptor, OnInit {
  createNotification = (type, messageType, messageContent) => {
    this._notification.create(type, messageType, messageContent);
  };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // install an error handler
    // 这里是注入translateService，不能在constructor里面注入
    const translateService = this.inj.get(TranslateService);
    const serviceTest = this.inj.get(ServiceTestService);
    translateService.addLangs(["zh", "en"]);
    // translateService.setDefaultLang("zh");
    const browserLang = translateService.getBrowserLang();
    // translateService.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
    // 这里是注入translateService，不能在constructor里面注入
    return next.handle(req).catch((err: HttpErrorResponse) => {
      console.log(err);
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred111:', err.error.message);
      } else {
        // translateService.setDefaultLang("zh");
        const errMsg = JSON.parse(JSON.parse(err.error).message)['errors'][0]['code'];
        // 这里存在两个问题：
        // 1、需要确定.json file loaded之后，才进行调用translateService.get method，但是调试发现第一次httperror，并不会
        // 加载出来.json文件，第二次触发才能加载。
        // 2、translateService.get(errMsg)，文件不翻译问题，已经提issue: https://github.com/ngx-translate/core/issues/733
        translateService.use(browserLang.match(/zh|en/) ? browserLang : 'zh').subscribe(() => {
          translateService.get(errMsg).subscribe((res) => {
            this.createNotification('error', '服务器错误', res);
          });
        });
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code222 ${err.status}, body was: ${err.error}`);
        // console.log(`err message ${errMsg}`);
      }
      // 这里必须return才可以
      // return Observable.throw(new Error('Your custom error'));
      // this.createNotification('error', '服务器错误', err.error);
      return Observable.throw(err.error || 'backend server error');
    });
  }

  // 1、当constructor(private _notification: NzNotificationService, public translateService: TranslateService)的时候
  // 这里会报错https://stackoverflow.com/questions/47091872/angular-4-cannot-instantiate-cyclic-dependency-injectiontoken-http-interceptor
  // 循环依赖，因为TranslateService，去看下app.module.ts，发现他是需要httpclient注入的，所以就形成这样的依赖：
  // app.module.ts:
  // TranslateService : 依赖于httpclient
  // 然后这里err，是集成httpErr，也就是httpclient，这里如果注入TranslateService，那么就是httpclient依赖于TranslateService了
  // 2、下面是引入inj，然后用get方法解决循环依赖，但是会出现Maximum call stack size exceeded这样一个错误
  // constructor(private inj: Injector) {
  //   this.translateService = inj.get(TranslateService);
  //   this._notification = inj.get(NzNotificationService);
  // 这个maximum错误，经过断点调试，发现先constructor，之后一直在跑createNotification = (type, messageType, messageContent) => {这个定义
  constructor(private _notification: NzNotificationService, private inj: Injector) {
    // 这里根据https://github.com/angular/angular/issues/18224里面tarasbobak的settimeout大法，可以解决问题
    // 然后把this.translateService.addLangs(["zh", "en"]);
    // this.translateService.setDefaultLang("en");
    // const browserLang = this.translateService.getBrowserLang();
    // this.translateService.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
    // 从constructor移到ngOninit里面，因为settimeout是异步的，会报错addLangs undefined
    // 但是会有问题，setTimeout之后，调试发现ngOninit不执行，所以这个黑科技还是放弃，继续先把private _notification: NzNotificationService注入进来
    // 然后按照https://github.com/angular/angular/issues/18224里面perusopersonale的说法，不要在constructor里面注入translateSerivce，在
    // intercept里面注入这个service
    // setTimeout( () => {
    //   this.translateService = inj.get(TranslateService);
    //   this._notification = inj.get(NzNotificationService);
    // }, 0);
  }

  ngOnInit() {
    // console.log('这是oninit');
    // this.translateService.addLangs(["zh", "en"]);
    // this.translateService.setDefaultLang("en");
    // const browserLang = this.translateService.getBrowserLang();
    // this.translateService.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
  }
}
