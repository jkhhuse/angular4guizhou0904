import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BackendReturn, EnvFileDetail } from '../app-env-arg.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-env-arg-detail',
  styleUrls: ['./app-env-arg-detail.component.css'],
  templateUrl: './app-env-arg-detail.component.html'
})
export class AppEnvArgDetailComponent implements OnInit {

  detailView: BackendReturn; // 详情视图
  groupId: string;
  cmdLine: string;

  constructor(private _http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // this.groupId = this._service.getCookie('groupID');
    this.groupId = '8';
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getEnvFileDetail(params['name']);
    });
  }

  routerBack() {
    this.router.navigate(['envArg']);
  }

  // 获取环境变量文件详情
  getEnvFileDetail(envfileName: string) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json' as 'json'
    };
    this._http.get<EnvFileDetail>(environment.apiConfig + '/configCenter/' + this.groupId + '/env-files/' + envfileName, options)
    .subscribe(
      (res) => {
        this.detailView = res.backend_return;
      },
      error => {
        console.log(error);
      },
      () => { }
    );
  }

}
