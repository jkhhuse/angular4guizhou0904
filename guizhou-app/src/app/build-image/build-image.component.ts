import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { environment } from "../../environments/environment";
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { HttpClient } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import * as _ from 'lodash';

@Component({
  selector: 'app-build-image',
  templateUrl: './build-image.component.html',
  styleUrls: ['./build-image.component.scss']
})
export class BuildImageComponent implements OnInit {

  public url: string = environment.api + '/api/2/upload/app/fileName/';
  // 这里的itemAlias是设置的name ="newname"，本来是name="file"，相当于form的name值
  // public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'newname' });
  public uploader: FileUploader = new FileUploader({ url: this.url });
  _dataSet = this.uploader.queue;

  radioValue: string = 'newImage';
  images: string[] = [];

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  formConfig: FieldConfig[] = [
    {
      type: 'input',
      label: '镜像名称',
      name: 'imageName',
      placeholder: '请输入镜像名称',
      validation: [Validators.required],
      styles: {
        'width': '400px'
      }
    },
    {
      type: 'input',
      label: '镜像版本',
      name: 'version',
      placeholder: '请输入镜像版本',
      validation: [Validators.required],
      styles: {
        'width': '400px'
      }
    },
    {
      label: '发布',
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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getImages();
  }

  FileSelected(uploaderType: any) {
    if (uploaderType === 'image') {
      console.log('文件上传完了', this.uploader);
      this.uploader.onBeforeUploadItem = (item) => {
        item.withCredentials = false;
        item.url = this.url + item.file.name;
      }
    } else {
      // console.log('Icon文件上传完了', this.uploaderIcon);
      // this.uploaderIcon.onBeforeUploadItem = (item) => {
      //   item.withCredentials = false;
      //   item.url = this.urlIcon + item.file.name;
      // }
    }
  }

  toggleRadio() {
    console.log(this.radioValue)
    if (this.radioValue === 'newImage') {
      this.formConfig[0] = {
        type: 'input',
        label: '镜像名称',
        name: 'imageName',
        placeholder: '请输入镜像名称',
        validation: [Validators.required],
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
    console.log('镜像上传');
  }

  getImages() {
    this.http.get(environment.api + '/api/2/warehouse/repository').subscribe(data => {
      this.images = _.map(data['images'], (value, key) => {
        return value['repositoryName'];
      })
    })
  }

}
