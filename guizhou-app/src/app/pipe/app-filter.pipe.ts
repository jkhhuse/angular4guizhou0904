import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter'
})
export class AppFilterPipe implements PipeTransform {

  transform(appList: any[], filterField: string, keyword: string): any {
    if (!filterField || !keyword) {
      return appList;
    }
    return appList.filter(app => {
      let appValue: string = app[filterField];
      return appValue.indexOf(keyword) >= 0;
    });
  }

}
