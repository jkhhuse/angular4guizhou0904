import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-mirror-store',
  templateUrl: './mirror-store.component.html',
  styleUrls: ['./mirror-store.component.css']
})
export class MirrorStoreComponent implements OnInit {
    _current = 1;
    // 标签名
    public title: String = '镜像仓库';
    mirrorImgUrl = 'assets/service/mysql.png';
    mirrorName: String = 'private';
    titleFilter: FormControl = new FormControl();

    // 分页
    private tabs = [
        {
            index: 1,
            name: '我的镜像',
            tabName: 'private'
        },
        {
            index: 2,
            name: '共有镜像',
            tabName: 'public'
        }
    ];
    changeMirrorName(mirrorName): void {
        this.mirrorName = mirrorName;
    }
  constructor() { }

  ngOnInit() {
  }

}
