import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServicesService } from '../shared/services.service';
import { EnvFile, EnvFiles, BackendReturn, EnvFileDetail, EnvfileAddReqBody, EnvfileModifyReqBody } from './app-env-arg.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-env-arg',
  styleUrls: ['./app-env-arg.component.css'],
  templateUrl: './app-env-arg.component.html'
})
export class AppEnvArgComponent implements OnInit {
  authEnvSearch = true;
  authEnvCreate = true;
  authEnvDelete = true;
  authEnvUpdate = true;

  title: String = '环境变量文件';
  validateForm: FormGroup;
  updateValidateForm: FormGroup;
  searchValue: string; // 搜索关键词
  pageSizeSelectorValues: [10, 20, 50, 100];
  showSizeChanger: true;
  pagination: true;
  total: number;
  pageSize: number;
  currentPage: number;
  dataSet: EnvFile[];
  isCreateModalVisible = false; // 创建环境变量模块框显示
  isUpdateModalVisible = false;
  isDeleteModalVisible = false;
  searchOptions;
  selectedOption;
  groupId: string;
  _allChecked = false;
  _indeterminate = false;
  _displayData = [];
  loading = false;
  deleteList = []; // 删除列表
  deleteListString = ''; // 删除变量名
  maskClosable = true;
  hasChecked: boolean; // 删除按钮是否disable

  constructor( private fb: FormBuilder, private _service: ServicesService, private _http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.getAuth();
    this.searchOptions = [];
    this.validateForm = this.fb.group({
      name       : [ null, [ Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern('\\w+')] ],
      desc       : [ null, [ Validators.required, Validators.maxLength(80) ] ],
      content    : [ null, [ Validators.required ] ],
      // selectedOption: [ this.selectedOption ]
    });
    this.currentPage = 1;
    this.updateValidateForm = this.fb.group({
      name       : [ null, [ Validators.required, Validators.minLength(4), Validators.maxLength(25)] ],
      desc       : [ null, [ Validators.required, Validators.maxLength(80) ] ],
      content    : [ null, [ Validators.required ] ],
    });
    this.pageSize = 10;
    this.dataSet = [];
    this.total = 0;
    this.hasChecked = true;
    this.searchValue = '';
    this.groupId = this._service.getCookie('groupID');
    this.getEnvFiles(this.searchValue);
  }

  groupidHandler(event: any) {
    this.groupId = event;
    this.getEnvFiles(this.searchValue);
  }

  routerToDetail(name) {
    this.router.navigate(['/envArgDetail/' + name + '/' + this.groupId]);
  }

  showCreateModal() {
    this.isCreateModalVisible = true;
  }

  // 打开更新模态框
  showUpdateModal(data) {
    this.getEnvFileDetail(data.name);
  }

  // 打开删除模态框
  showDeleteModal() {
    if (this.hasChecked) {
      this.isDeleteModalVisible = true;
      this.deleteList = [];
      this._displayData.forEach(value => {
        if (value.checked === true) {
          this.deleteList.push(value.name);
        }
      });
      this.deleteListString = this.deleteList.join(',');
    }
  }

  // 打开删除模态框
  showSingleDeleteModal(name: string) {
    this.isDeleteModalVisible = true;
    this.deleteListString = name;
  }

  cancelCreate() {
    this.isCreateModalVisible = false;
  }

  // 创建环境变量
  postCreate($event) {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
    }

    if (this.validateForm.valid) {
      // 验证通过, 组装reqbody
      const name = this.validateForm.value['name'];
      const tempContent = this.validateForm.value['content'];
      const desc = this.validateForm.value['desc'];
      const userId = this._service.getUserId();
      const content = [];
      tempContent.split('\n').forEach((value, key) => {
        const temp = [];
        temp.push(value.split('=')[0]);
        temp.push(value.split('=')[1]);
        content.push(temp);
      });
      const reqbody = new EnvfileAddReqBody();
      reqbody.create_use_id = Number.parseInt(userId);
      reqbody.description = desc;
      reqbody.name = name;
      reqbody.content = content;
      this.createEnvFile(reqbody);
    } else {
      return;
    }
  }

  cancelUpdate() {
    this.isUpdateModalVisible = false;
  }

  // 提交更新环境变量
  postUpdate($event) {
    for (const i of Object.keys(this.updateValidateForm.controls)) {
      this.updateValidateForm.controls[ i ].markAsDirty();
    }
    if (this.updateValidateForm.valid) {
      // 验证通过, 组装reqbody
      const name = this.updateValidateForm.value['name'];
      const tempContent = this.updateValidateForm.value['content'];
      const desc = this.updateValidateForm.value['desc'];
      const userId = this._service.getUserId();
      const content = [];
      tempContent.split('\n').forEach((value, key) => {
        const temp = [];
        temp.push(value.split('=')[0]);
        temp.push(value.split('=')[1]);
        content.push(temp);
      });
      const reqbody = new EnvfileModifyReqBody();
      reqbody.update_use_id = Number.parseInt(userId);
      reqbody.description = desc;
      reqbody.content = content;

      this.updateEnvFile(name, reqbody);
    } else {
      return;
    }
  }

  // 取消删除环境变量
  cancelDelete() {
    this.isDeleteModalVisible = false;
  }

  // 删除环境变量
  postDelete() {
    this.deleteEnvFile(this.deleteListString);
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  getUpdateFormControl(name) {
    return this.updateValidateForm.controls[ name ];
  }

  // 选择环境变量模板填入到环境变量内容中
  // selectEnvArgContent() {
  //   this.validateForm.get('selectedOption');
  // }

  onSearch($event) {
    this.getEnvFiles($event.target.value);
  }

  // 获取环境变量文件列表
  getEnvFiles(searchText: string, reset = false) {
    if (reset) {
      this.currentPage = 1;
    }
    this.loading = true;
    const params: HttpParams = new HttpParams()
    .append('page', this.currentPage.toString())
    .append('size', this.pageSize.toString())
    .append('search_name', searchText);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json' as 'json',
      params: params
    };
    this._http.get<EnvFiles>(environment.apiConfig + '/configCenter/' + this._service.getCookie('groupID') + '/env-files', options)
      .subscribe(
        (res) => {
          this.loading = false;
          this.total = res.countEnvfile;
          this.dataSet = res.opEnvfilesList;
          this.currentPage = res.page;
          this._displayData = this.dataSet;
          this.hasChecked = this._displayData.some(value => value.checked === true);
        },
        error => {
          console.log(error);
        },
        () => { }
      );
  }

  // 获取环境变量文件详情
  getEnvFileDetail(envfileName: string) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json' as 'json'
    };
    this._http.get<EnvFileDetail>(environment.apiConfig + '/configCenter/' + this._service.getCookie('groupID') + '/env-files/' + envfileName, options)
    .subscribe(
      (res) => {
        let tempContent = '';
        res.backend_return.content.forEach((array, key) => {
          if (key !== res.backend_return.content.length - 1 ) {
            tempContent = tempContent + array[0] + '=' + array[1] + '\n';
          } else {
            tempContent = tempContent + array[0] + '=' + array[1];
          }
        });
        this.updateValidateForm = this.fb.group({
          name       : [ envfileName, [ Validators.required, Validators.minLength(4), Validators.maxLength(25)] ],
          desc       : [ res.backend_return.description, [ Validators.required, Validators.maxLength(80) ] ],
          content    : [ tempContent, [ Validators.required ] ],
        });
        this.isUpdateModalVisible = true;
      },
      error => {
        console.log(error);
      },
      () => { }
    );
  }

  // 删除环境变量
  deleteEnvFile(envfileName: string) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json' as 'json'
    };
    this._http.delete(environment.apiConfig + '/configCenter/' + this._service.getCookie('groupID') + '/env-files/' + envfileName, options)
    .subscribe(
      (res) => {
        this.isDeleteModalVisible = false;
        this.getEnvFiles(this.searchValue);
      },
      error => {
        console.log(error);
      },
      () => { }
    );
  }

  // 创建环境变量
  createEnvFile(envfileAddReqBody: EnvfileAddReqBody) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json' as 'json',
    };
    this._http.post(environment.apiConfig + '/configCenter/' + this._service.getCookie('groupID') + '/env-files', envfileAddReqBody, options)
    .subscribe(
      (res) => {
        this.isCreateModalVisible = false;
        // 重置创建变量创建模态框数据
        this.validateForm = this.fb.group({
          name       : [ null, [ Validators.required, Validators.minLength(4), Validators.maxLength(25)] ],
          desc       : [ null, [ Validators.required, Validators.maxLength(80) ] ],
          content    : [ null, [ Validators.required ] ],
          // selectedOption: [ this.selectedOption ]
        });
        this.getEnvFiles(this.searchValue);
      },
      error => {
        console.log(error);
      },
      () => { }
    );
  }

  // 更新环境变量
  updateEnvFile(envfileName: string, envfileModifyReqBody: EnvfileModifyReqBody) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json' as 'json',
    };
    this._http.put(environment.apiConfig + '/configCenter/' + this._service.getCookie('groupID') + '/env-files/' + envfileName, envfileModifyReqBody, options)
    .subscribe(
      (res) => {
        this.isUpdateModalVisible = false;
        this.updateValidateForm = this.fb.group({
          name       : [ null, [ Validators.required, Validators.minLength(4), Validators.maxLength(25)] ],
          desc       : [ null, [ Validators.required, Validators.maxLength(80) ] ],
          content    : [ null, [ Validators.required ] ],
        });
      },
      error => {
        console.log(error);
      },
      () => { }
    );
  }

  _refreshStatus() {
    this.hasChecked = this._displayData.some(value => value.checked === true);
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    if (allChecked) {
      this._allChecked = true;
      this._indeterminate = false;
    } else if (allUnChecked) {
      this._allChecked = false;
      this._indeterminate = false;
    } else {
      this._allChecked = false;
      this._indeterminate = true;
    }
  }

  _checkAll(_value) {
    this.hasChecked = this._displayData.some(value => value.checked === true);
    if (_value) {
      this._displayData.forEach(data => {
        data.checked = true;
      });
    } else {
      this._displayData.forEach(data => {
        data.checked = false;
      });
    }
    this._refreshStatus();
  }

  getAuth() {
    let res = this._service.getAuthList().subscribe((res: any) => {
      let tempEnvSearch = false;
      let tempEnvCraete = false;
      let tempEnvDelete = false;
      let tempEnvUpdate = false;

      if (res != '') {
        res.permissions.forEach((data, index) => {
          if (data.lang1 === '环境变量搜索') {
            tempEnvSearch = true;
          } else if (data.lang1 === '环境变量文件创建') {
            tempEnvCraete = true;
          } else if (data.lang1 === '环境变量文件删除') {
            tempEnvDelete = true;
          } else if (data.lang1 === '环境变量文件更新') {
            tempEnvUpdate = true;
          }
        });
        this.authEnvSearch = tempEnvSearch;
        this.authEnvCreate = tempEnvCraete;
        this.authEnvDelete = tempEnvDelete;
        this.authEnvUpdate = tempEnvUpdate;
      }
    })
  }
}
