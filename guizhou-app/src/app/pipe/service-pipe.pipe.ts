import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'servicePipe'
})
export class ServicePipePipe implements PipeTransform {

  transform(serviceList: any, moduleName: string, keyword: string): any {
    console.log('moduleName: ' + moduleName);
    console.log('keyword: ' + keyword);
    console.log('serviceList: ' + serviceList);

    if (!moduleName || !keyword) {
      return serviceList;
    }
    if ( moduleName === 'service'){
      if(serviceList == '' ||serviceList == null) {
        return serviceList.filter(service => {
          console.log('servicePipe222');
          let serviceValue = service['serviceType'];
          return serviceValue.indexOf(keyword) >= 0;
        });
      }
    }
  }
}
