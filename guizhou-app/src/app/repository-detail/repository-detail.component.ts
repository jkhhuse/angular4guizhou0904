import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {isUndefined} from "util";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-repository-detail',
    templateUrl: './repository-detail.component.html',
    styleUrls: ['./repository-detail.component.css']
})
export class RepositoryDetailComponent implements OnInit {
    // 标签名
    public title: String = '详情内容';
    mirrorImgUrl = 'assets/service/mirror.png';
    imgUrl = environment.api + '/api/' + environment.groupId + '/files/app/fileName/';
    mirrorDetail: any;
    mirrorVersions: any;
    name: string;
    module: string;
    private tabName: string;
    private firstVersionId: string;
    private firstVersionVersion: string;

    // 获取流
    getServiceDetail() {
        return this.http.get(environment.api + '/api/' + environment.groupId + '/warehouse/repository/' + this.name + '?region=' + this.tabName).map(res => res.json().images);
    }
    // 获取流
    getAppVersions() {
        return this.http.get(environment.apiApp + '/apiApp' + '/groups/' + environment.groupId + '/applications/' + this.name + '/versions').map(res => res.json());
    }
    // 获取流
    getAppDetail(firstVersionId) {
        return this.http.get(environment.apiApp + '/apiApp' + '/groups/' + environment.groupId + '/applications/' + firstVersionId).map(res => res.json());
    }
    constructor(private routeInfo: ActivatedRoute, private http: Http) {
    }
    deleteVersion(moudule, versionId) {
        if (moudule === 'repository') {
            alert(moudule);
        } else if (moudule === 'app') {
            console.log(moudule);
            console.log(versionId);
            this.http.delete(environment.apiApp + '/apiApp' + '/groups/' + environment.groupId + '/applications/' + versionId).subscribe((data) => {
                alert('成功删除版本id为' + versionId + '的' + moudule);
            });
        }
}
    ngOnInit() {
        this.name = this.routeInfo.snapshot.params['name'];
        this.tabName = this.routeInfo.snapshot.params['tabName'];
        this.module = this.routeInfo.snapshot.params['module'];
        if (this.module === 'repository') {
            this.mirrorDetail = this.getServiceDetail();
            // 订阅流
            this.getServiceDetail().subscribe((data) => {
                this.mirrorDetail = data;
            });
            // 订阅流
            this.getServiceDetail().subscribe((data) => {
                this.mirrorVersions = data.opRepository;
                this.firstVersionId = data.opRepository[0].id;
                this.firstVersionVersion = data.opRepository[0].version;
            });
        } else if (this.module === 'app') {
            // this.mirrorVersions = this.getAppVersions();
            // 订阅流
            this.getAppVersions().subscribe((data) => {
                this.mirrorVersions = data;
                this.firstVersionId = data[0].id;
                this.firstVersionVersion = data[0].version;
                // console.log(this.mirrorVersions);
                // console.log(this.firstVersionId);
                // 订阅流
                    this.mirrorDetail = this.getAppDetail(this.firstVersionId);
                    this.getAppDetail(this.firstVersionId).subscribe((data) => {
                        this.mirrorDetail = data;
                        // console.log(this.mirrorDetail);
                    });
            });
        } else {
            alert('get module name error');
        }
    }

}
