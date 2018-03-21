import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {FileUploader, FileSelectDirective} from 'ng2-file-upload';
import {environment} from '../../environments/environment';
import {FieldConfig} from '../dynamic-form/models/field-config.interface';
import {DynamicFormComponent} from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import {HttpClient} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Router, RouterModule} from '@angular/router';
import * as _ from 'lodash';
import {ActivatedRoute} from '@angular/router';
import {ServicesService} from '../shared/services.service';

// import { NameValidator } from '../util/reg-pattern/reg-name.directive';

@Component({
  selector: 'app-build-image',
  templateUrl: './build-image.component.html',
  styleUrls: ['./build-image.component.scss']
})
export class BuildImageComponent implements OnInit {
  mirrorName: '';
  repoName: '';
  _isSpinning = false;
  _isSpinning2 = false;
  fileValid;

  // 这里后端api有一个Module，是存放文件的目录，比如应用，那么就是app，服务，涉及到文件上传时，就是service，镜像，就是image
  // 这里前端定义好，后面有Get请求，需要用到这个module的话，可以参照
  public url: string = environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/upload/image/fileName/';
  // 这里的itemAlias是设置的name ="newname"，本来是name="file"，相当于form的name值
  // public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'newname' });
  public uploader: FileUploader = new FileUploader({
    url: this.url,
    queueLimit: 1,
    // todo next这里限制文件格式，tar，有问题
    // 还有一个是allowedMimeType可以限制图片格式
    // allowedFileType: ['tar'],
  });
  _dataSet = this.uploader.queue;

  radioValue = 'newImage';
  images: string[] = [];
  imageOriginId: string;
  // imageIdArr: object[] = [];
  // repositories: string[] = [];
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  formConfig: FieldConfig[] = [
    /*  {
        type: 'input',
        label: '镜像名称',
        name: 'imageName',
        placeholder: '请输入镜像名称',
        validation: [Validators.required, Validators.pattern(/^[a-z0-9][a-z0-9\-\_]*[a-z0-9]$/i)],
        styles: {
          'width': '400px'
        }
      },*/
    {
      type: 'input',
      label: '镜像版本',
      name: 'version',
      placeholder: '请输入镜像版本',
      validation: [Validators.required, Validators.pattern(/^[a-zA-Z0-9]([.a-zA-Z0-9]*[a-zA-Z0-9])?$/i), Validators.maxLength(6)],
      styles: {
        'width': '400px'
      }
    },
    /*{
      type: 'input',
      label: '镜像描述',
      name: 'description',
      placeholder: '请输入镜像描述',
      // validation: [Validators.required],
      notNecessary: true,
      inputType: 'textarea',
      styles: {
        'width': '400px'
      }
    },*/
    {
      label: '构建',
      name: 'submit',
      type: 'button',
      buttonType: 'primary',
      styles: {
        'margin-left': '20%'
      },
      divStyles: {
        'width': '80%',
        'border-top': '1px solid #ddd',
        'padding-top': '20px'
      }
    },
  ];

  constructor(private _notification: NzNotificationService,
              private routeInfo: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private confirmServ: NzModalService,
              private servicesService: ServicesService) {
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    console.log('form11', this.form.controls);
    this.form.setDisabled('submit', true);
    // }, 0);
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      console.log('submit', this.form.valid);
      console.log('previousValid', previousValid);
      // if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      // }
    });
  }
  ngOnInit() {
    this.mirrorName = this.routeInfo.snapshot.params['mirrorName'];
    this.repoName = this.routeInfo.snapshot.params['name'];
    console.log('mirrorName: ' + this.mirrorName);
    console.log('repoName: ' + this.repoName);
    this.getImageOrigin();
    this.getImages();
  }

  createNotification = (type, title, content) => {
    this._notification.create(type, title, content);
  }

  FileSelected(uploaderType: any) {
    console.log('文件选择完了', this.uploader);
    if (uploaderType === 'image') {
      this.uploader.onBeforeUploadItem = (item) => {
          // 开始上传时，disable掉构建按钮
          console.log('文件开始上传');
        this.fileValid = this.form.valid;
        console.log('fileValid: ' + this.fileValid);
        this.form.setDisabled('submit', true);
        this._isSpinning = true;
        item.withCredentials = false;
        item.url = this.url + item.file.name;
      };
      // onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any;
      this.uploader.onSuccessItem = (item, response, status, headers) => {
          this._isSpinning = false;
          console.log('文件上传完成');
        console.log('fileValid2222: ' + this.fileValid);

        this.form.setDisabled('submit', !this.fileValid);
      };
    } else {
      // console.log('Icon文件上传完了', this.uploaderIcon);
      // this.uploaderIcon.onBeforeUploadItem = (item) => {
      //   item.withCredentials = false;
      //   item.url = this.urlIcon + item.file.name;
      // }
    }
  }

  toggleRadio() {
    console.log(this.radioValue);
    if (this.radioValue === 'newImage') {
      this.formConfig[0] = {
        type: 'input',
        label: '镜像名称',
        name: 'imageName',
        placeholder: '请输入镜像名称',
        validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), Validators.maxLength(20)],
        styles: {
          'width': '400px'
        }
      };
      // console.log('form333', this.form);
    } else {
      this.formConfig[0] = {
        type: 'select',
        label: '镜像名称',
        name: 'imageName',
        options: this.images,
        placeholder: '请选择镜像',
        styles: {
          'width': '400px'
        }
      };
      // console.log('form333', this.form);
    }
    this.form.setValue('imageName', this.formConfig[0]);
    console.log(this.formConfig);
  }

  async submit(value: { [name: string]: any }) {
    await this.loadImage(value);
    console.log('镜像上传');

  }

  async loadImage(formValue) {
    const fileArr = _.map(this._dataSet, (value, key) => {
      if (value['isSuccess'] === true) {
        return {
          name: value['file']['name'],
          size: value['file']['size']
        };
      }
    });
    const fileArrErr = _.map(_.compact(fileArr), (value, key) => {
      return value;
    });
    console.log('formValue', formValue);
    if (fileArrErr.length === 0) {
      this.createNotification('error', '服务器错误', '请上传镜像文件!');
    } else {
      return new Promise((resolve, reject) => {
        // 开始上传时，disable掉构建按钮
          this.form.setDisabled('submit', true);
          this._isSpinning2 = true;
          // 这里箭头函数，解决闭包之后This指向windows的问题
        // setTimeout(() => {
        console.log('测试promise', this);
        _.map(_.compact(fileArr), (value, key) => {
          // const repositoryName = this.radioValue === 'newImage' ? formValue.imageName + '-' +
          // _.replace(value, '.', '') : formValue.imageName
          this.http.post(environment.api + '/api/' + this.servicesService.getCookie('groupID') +
           '/warehouse/repository?module=image&size=' + value.size, {
            // "description": formValue.description,
            'description': '',
            'fileName': value.name,
            'isApp': false,
            'registryId': this.imageOriginId,
            // "description": formValue.description,
            // "repositoryName": formValue.imageName,
            'repositoryName': this.repoName,
            'version': formValue.version
          }).subscribe(response => {
            console.log('这是response', response);
            this._isSpinning2 = false;
            const thisParent = this;
            this.confirmServ.success({
              maskClosable: false,
              title: '构建镜像成功!',
              content: '点确认按钮跳转到镜像详情',
              okText: '确定',
              onOk() {
                // .contentControl = true;
                // console.log('form11', thisParent.form);
                // const redirect = window.location.host + '/#/appStore';
                // window.location.href = window.location.origin + '/#/repositoryStore';
                // repositoryDetail/repository/asdasdasd/private
                thisParent.router.navigate(['repositoryDetail', 'repository', thisParent.repoName, thisParent.mirrorName]);
              },
              onCancel() {
              }
            });
            // this.imageIdArr[key] = response;
            // this.repositories[key] = this.imageIdArr[key]['id'];
            resolve();
          },
            err => {
                // console.log(err);
                // this._isSpinning2 = false;
                // this.createNotification('error', '创建失败', err.error.message);
            });
        });
        // resolve();
        // }, 0);
      });
    }
  }

  getImageOrigin() {
    this.http.get(environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/registry').subscribe(data => {
      const dataValue = data;
      this.imageOriginId = dataValue['id'];
      // this.imageOriginId = dataValue.id;
    });
  }

  getImages() {
    this.http.get(environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/repository?region=' + this.mirrorName).subscribe(data => {
      this.images = _.map(data['images'], (value, key) => {
        return value['repositoryName'];
      });
    });
  }

}
