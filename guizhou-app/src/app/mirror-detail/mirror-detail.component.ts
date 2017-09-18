import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

@Component({
  selector: 'app-mirror-detail',
  templateUrl: './mirror-detail.component.html',
  styleUrls: ['./mirror-detail.component.css']
})
export class MirrorDetailComponent implements OnInit {
    // 标签名
    public title: String = '镜像仓库';
    mirrorImgUrl = 'assets/service/mysql.png';
    mirrorDetail: any;
    mirrorVersions: any;
    repositoryName: string;
    // 获取流
    getServiceDetail() {
        return this.http.get('/api/2/warehouse/repository/' + this.repositoryName).map(res => res.json().images);
    }
    constructor(private routeInfo: ActivatedRoute, private http: Http) {
}
  ngOnInit() {
      this.repositoryName = this.routeInfo.snapshot.params['repositoryName'];
      this.mirrorDetail = this.getServiceDetail();
      // 订阅流
      this.getServiceDetail().subscribe((data) => {
          this.mirrorDetail = data;
      });
      // 订阅流
      this.getServiceDetail().subscribe((data) => {
          this.mirrorVersions = data.opRepository;
      });
  }

}
