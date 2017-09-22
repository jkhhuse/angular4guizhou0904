import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter'
})
export class AppFilterPipe implements PipeTransform {

  transform(appList: any[], filterField: string, keyword: string): any {
    /*console.log(filterField);
    console.log(keyword);
    console.log(appList);*/
    if (!filterField || !keyword) {
      return appList;
    }
    // 服务管理的过滤不需要添加name字段
    if (filterField === 'instanceName') {
    } else {
        filterField = filterField + 'Name';
    }
     // console.log(filterField);
    return appList.filter(app => {
        let appValue: string = app[filterField];
      return appValue.indexOf(keyword) >= 0;
    });
  }

}
