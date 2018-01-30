import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'convertTagPipe'})
export class ConvertTagPipe implements PipeTransform {
  transform(value: string): string {
    let newValue = '';
    switch (value) {
      case 'LOGIN': {
        newValue = '登录';
        break;
      }
      case 'login': {
        newValue = '登录';
        break;
      }
      case 'LOGOUT': {
        newValue = '登出';
        break;
      }
      case 'logout': {
        newValue = '登出';
        break;
      }
      case 'POST': {
        newValue = '创建';
        break;
      }
      case 'PUT': {
        newValue = '更新';
        break;
      }
      case 'GET': {
        newValue = '查看';
        break;
      }
      case 'DELETE': {
        newValue = '删除';
        break;
      }
      case 'successed': {
        newValue = '成功';
        break;
      }
      case 'failed': {
        newValue = '失败';
        break;
      }
      default: {
        newValue = value;
      }
    }
    return newValue;
  }
}
