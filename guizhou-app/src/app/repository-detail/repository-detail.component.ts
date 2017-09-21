import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

@Component({
    selector: 'app-repository-detail',
    templateUrl: './repository-detail.component.html',
    styleUrls: ['./repository-detail.component.css']
})
export class RepositoryDetailComponent implements OnInit {
    // 标签名
    public title: String = '镜像仓库';
    mirrorImgUrl = 'assets/service/mysql.png';
    mirrorDetail: any;
    mirrorVersions: any;
    repositoryName: string;
    private tabName: string;

    // 获取流
    getServiceDetail() {
        return this.http.get('/api/2/warehouse/repository/' + this.repositoryName + '?region=' + this.tabName).map(res => res.json().images);
    }

    constructor(private routeInfo: ActivatedRoute, private http: Http) {
    }

    ngOnInit() {
        this.repositoryName = this.routeInfo.snapshot.params['repositoryName'];
        this.tabName = this.routeInfo.snapshot.params['tabName'];

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
