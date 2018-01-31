webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./opera-monitor/opera-monitor.module": [
		"../../../../../src/app/opera-monitor/opera-monitor.module.ts"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-deploy/app-deploy.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"padding:20px\">\n  <nz-steps [(nzCurrent)]=\"current\">\n    <nz-step [nzTitle]=\"'应用部署'\"></nz-step>\n    <nz-step [nzTitle]=\"'镜像配置'\"></nz-step>\n    <nz-step [nzTitle]=\"'服务配置'\"></nz-step>\n    <nz-step [nzTitle]=\"'部署成功'\"></nz-step>\n  </nz-steps>\n  <div class=\"steps-content\">\n    <!-- {{index}} -->\n    <!-- 这里是四个form，都写出来，然后每个是不同的div布局，可以把这四个分步骤表单看成一个页面，然后控制ngif可见性\n          最后把四个form的数据封装到一起 -->\n    <div>\n      <!-- 应用部署 -->\n      <div [hidden]=\"current !== 0\">\n        <nz-layout>\n          <nz-content>\n            <div class=\"marginTop20\">\n              <p>应用部署</p>\n              <div class=\"borderTop80\" nz-row>\n                <dynamic-form #formFirstProject [config]=\"formFirst\">\n                </dynamic-form>\n                <div nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <span style=\"display: block;\n                              font-size: 13px;\n                              font-weight: 400;\n                              letter-spacing: 0px;\n                              margin-bottom: 10px;\n                              color: rgba(0, 0, 0, 0.9);\">资源池</span>\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <!-- <nz-radio-group [(ngModel)]=\"this.radioValue\" (click)=\"toggleButton()\"> -->\n                    <nz-radio-group [(ngModel)]=\"this.radioValue\">\n                      <label nz-radio [nzValue]=\"'product'\" style=\"margin-right: 25px\">\n                        <span>生产域</span>\n                        <!-- <nz-tooltip [nzPlacement]=\"'rightTop'\">\n                          <i nz-tooltip class=\"anticon anticon-question-circle-o\" style=\"position: absolute; right: -10px;\"></i>\n                          <ng-template #nzTemplate>\n                            <div>\n                              <p>如果选了生产域</p>\n                              <p>每个镜像的基本配置中添加区域选项(互联网、portal、核心)</p>\n                              <p>\n                                每个服务的基本配置中添加区域选项(互联网、portal、核心)\n                              </p>\n                            </div>\n                          </ng-template>\n                        </nz-tooltip> -->\n                        <!-- <i class=\"anticon anticon-question-circle-o\" style=\"position: absolute; right: -10px;\"></i> -->\n                      </label>\n                      <label nz-radio [nzValue]=\"'test'\">\n                        <span>测试域</span>\n                      </label>\n                    </nz-radio-group>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </nz-content>\n        </nz-layout>\n      </div>\n\n      <!-- 镜像配置 -->\n      <div [hidden]=\"current !== 1\">\n        <nz-layout>\n          <nz-content>\n            <div class=\"marginTop20\">\n              <p>镜像配置</p>\n              <div class=\"borderTop80\">\n                <nz-tabset [nzTabPosition]=\"'top'\" [nzType]=\"'card'\">\n                  <nz-tab (nzSelect)=\"choosedImageFunc(tab)\" *ngFor=\"let tab of imageTabs\">\n                    <ng-template #nzTabHeading>\n                      {{tab}}\n                    </ng-template>\n                    <!-- <span>Content of Tab Pane {{tab.index}}</span> -->\n                  </nz-tab>\n                </nz-tabset>\n              </div>\n            </div>\n\n            <div class=\"marginTop20\">\n              <p class=\"borderBottom80\">基本配置</p>\n              <div nz-row style=\"margin-bottom: 15px\">\n                <div style=\"margin-bottom: 10px\" *ngIf=\"this.radioValue === 'product'\" nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <span style=\"display: block;\n                                      font-size: 13px;\n                                      font-weight: 400;\n                                      letter-spacing: 0px;\n                                      margin-bottom: 10px;\n                                      color: rgba(0, 0, 0, 0.9);\">集群</span>\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <!-- 这里需要绑定click事件，触发toggleButton事件，现在的逻辑是在资源池选择上，会触发getIptags函数，因为每个资源池下只有一个集群，可以测试，但是当每个资源池下的\n              集群数量》1的时候，需要在这里绑定click事件，切换集群的时候，重新调用getIp函数，现在线上没有多集群，所以暂时不测试 -->\n                    <nz-radio-group [(ngModel)]=\"this.networkRadioValue\">\n                      <label *ngFor=\"let cluster of prodCluster\" nz-radio [nzValue]=\"cluster.name\">\n                        <span>{{ cluster.displayName }}</span>\n                      </label>\n                    </nz-radio-group>\n                  </div>\n                </div>\n                <div style=\"margin-bottom: 10px\" *ngIf=\"this.radioValue === 'test'\" nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <span style=\"display: block;\n                                      font-size: 13px;\n                                      font-weight: 400;\n                                      letter-spacing: 0px;\n                                      margin-bottom: 10px;\n                                      color: rgba(0, 0, 0, 0.9);\">集群</span>\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <nz-radio-group [(ngModel)]=\"this.networkRadioValue2\">\n                      <label *ngFor=\"let cluster of testCluster\" nz-radio [nzValue]=\"cluster.name\">\n                        <span>{{ cluster.name }}</span>\n                      </label>\n                    </nz-radio-group>\n                  </div>\n                </div>\n                <dynamic-form #formSecondProject [config]=\"formSecond\">getValue('tabname')\n                </dynamic-form>\n                <div nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <span style=\"display: block;\n                              font-size: 13px;\n                              font-weight: 400;\n                              letter-spacing: 0px;\n                              margin-bottom: 10px;\n                              color: rgba(0, 0, 0, 0.9);\">容器实例大小</span>\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px\">\n                    <app-container-instance #instanceSecond [config]=\"instanceConfig\">\n                    </app-container-instance>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"marginTop20\">\n              <p class=\"borderBottom80\">网络配置</p>\n              <div nz-row style=\"margin-bottom: 15px\">\n                <div style=\"margin-bottom: 10px\" nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <span style=\"display: block;\n                                      font-size: 13px;\n                                      font-weight: 400;\n                                      letter-spacing: 0px;\n                                      margin-bottom: 10px;\n                                      color: rgba(0, 0, 0, 0.9);\">网络模式</span>\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <nz-radio-group [(ngModel)]=\"this.networkConfig\">\n                      <label nz-radio [nzValue]=\"'FLANNEL'\">\n                        <span>Flannel</span>\n                      </label>\n                    </nz-radio-group>\n                  </div>\n                </div>\n              </div>\n              <dynamic-form #formImgNetworkProject [config]=\"formImgNetwork\"></dynamic-form>\n              <!-- todo next -->\n              <div nz-row>\n                <div style=\"margin-bottom: 10px\" nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <!-- <span style=\"display: block;\n                                      font-size: 13px;\n                                      font-weight: 400;\n                                      letter-spacing: 0px;\n                                      margin-bottom: 10px;\n                                      color: rgba(0, 0, 0, 0.9);\">网络模式</span> -->\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <div nz-row>\n                      <div nz-col [nzMd]=\"20\">\n                        <div nz-row [nzGutter]=\"16\">\n                          <div nz-col [nzSpan]=\"4\" *ngFor=\"let label of lbControlLabel\">\n                            <span>{{ label.value }}</span>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div nz-row>\n                <div style=\"margin-bottom: 10px\" nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <!-- <span style=\"display: block;\n                                      font-size: 13px;\n                                      font-weight: 400;\n                                      letter-spacing: 0px;\n                                      margin-bottom: 10px;\n                                      color: rgba(0, 0, 0, 0.9);\">网络模式</span> -->\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <div nz-row>\n                      <div nz-col [nzMd]=\"20\">\n                        <form nz-form class=\"dynamic-form\" [formGroup]=\"loadBanlancerForm\">\n                          <div nz-row [nzGutter]=\"16\">\n                            <div nz-col [nzSpan]=\"4\" *ngFor=\"let control of lbControlArray\" [class.d-none]=\"!control.show\">\n                              <div nz-form-item nz-row>\n                                <!-- <div nz-form-label nz-col>\n                                  <label [attr.for]=\"'field' + control.index\">Field {{control.index}}</label>\n                                </div> -->\n                                <div *ngIf=\"control.type === 'input'\" nz-form-control nz-col>\n                                  <nz-input [ngModel]=\"control.defaultValue\" [nzType]=\"control.inputType\" [nzDisabled]=\"control.disabled\" [nzSize]=\"'large'\"\n                                    [nzPlaceHolder]=\"control.placeholder\" [formControlName]=\"control.name\"></nz-input>\n                                </div>\n                                <div *ngIf=\"control.type === 'select'\" nz-form-control nz-col [nzSm]=\"20\">\n                                  <nz-select [(ngModel)]=\"control.selectedOption\" [formControlName]=\"control.name\" [nzPlaceHolder]=\"control.placeholder\" nzAllowClear\n                                    [nzDisabled]=\"control.disabled\">\n                                    <nz-option *ngFor=\"let option of control.options\" [nzValue]=\"option\" [nzLabel]=\"option\">\n                                    </nz-option>\n                                  </nz-select>\n                                </div>\n                              </div>\n                            </div>\n                          </div>\n                        </form>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"marginTop20\">\n              <p class=\"borderBottom80\">高级配置</p>\n              <div nz-row>\n                <div style=\"margin-bottom: 10px\" nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <span style=\"display: block;\n                                        font-size: 13px;\n                                        font-weight: 400;\n                                        letter-spacing: 0px;\n                                        margin-bottom: 10px;\n                                        color: rgba(0, 0, 0, 0.9);\">服务类型</span>\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <nz-radio-group [(ngModel)]=\"this.serviceType\">\n                      <label nz-radio [nzValue]=\"'stateless'\">\n                        <span>无状态服务</span>\n                      </label>\n                      <!-- <label nz-radio [nzValue]=\"'stateful'\">\n                        <span>有状态服务</span>\n                      </label> -->\n                    </nz-radio-group>\n                  </div>\n                </div>\n              </div>\n              <div nz-row>\n                <div style=\"margin-bottom: 10px\" nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <!-- <span style=\"display: block;\n                                          font-size: 13px;\n                                          font-weight: 400;\n                                          letter-spacing: 0px;\n                                          margin-bottom: 10px;\n                                          color: rgba(0, 0, 0, 0.9);\">日志文件</span> -->\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <div nz-row>\n                      <div nz-col [nzMd]=\"20\">\n                        <div nz-row [nzGutter]=\"16\">\n                          <div nz-col [nzSpan]=\"4\" *ngFor=\"let label of serviceAdvancedLabel\">\n                            <span>{{ label.value }}</span>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <dynamic-form #logFormProject1 [config]=\"logFormConfig\">\n              </dynamic-form>\n              <!-- todo next -->\n              <!-- <div nz-row>\n                <div style=\"margin-bottom: 10px\" nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <div nz-row>\n                      <div nz-col [nzMd]=\"20\">\n                        <div nz-row [nzGutter]=\"16\">\n                          <div nz-col [nzSpan]=\"4\">\n                            <span>名称</span>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div> -->\n              <!-- todo next -->\n              <!-- todo next -->\n              <!-- <dynamic-form #envFormProject1 [config]=\"envFormConfig\">\n              </dynamic-form> -->\n              <!-- todo next -->\n              <!-- todo next -->\n              <div nz-row>\n                <div style=\"margin-bottom: 10px\" nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <div nz-row>\n                      <div nz-col [nzMd]=\"20\">\n                        <div nz-row [nzGutter]=\"16\">\n                          <div nz-col [nzSpan]=\"10\" *ngFor=\"let label of env1\">\n                            <span>{{ label.value }}</span>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <!-- todo next -->\n              <div nz-row>\n                <div nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <span style=\"display: block;\n                                        font-size: 13px;\n                                        font-weight: 400;\n                                        letter-spacing: 0px;\n                                        margin-bottom: 10px;\n                                        color: rgba(0, 0, 0, 0.9);\">环境变量</span>\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <div nz-row>\n                      <div nz-col [nzMd]=\"20\">\n                        <form nz-form class=\"dynamic-form\" [formGroup]=\"env1Form\">\n                          <div nz-row [nzGutter]=\"16\">\n                            <div nz-col [nzSpan]=\"10\" *ngFor=\"let control of env1Array\">\n                              <div nz-form-item nz-row>\n                                <div *ngIf=\"control.type === 'input'\" nz-form-control nz-col>\n                                  <nz-input [nzSize]=\"'large'\" [nzPlaceHolder]=\"control.placeholder\" [formControlName]=\"control.name\"></nz-input>\n                                </div>\n                              </div>\n                            </div>\n                          </div>\n                        </form>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <!-- 配置文件 -->\n              <div nz-row>\n                <div style=\"margin-bottom: 10px\" nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <!-- <span style=\"display: block;\n                                          font-size: 13px;\n                                          font-weight: 400;\n                                          letter-spacing: 0px;\n                                          margin-bottom: 10px;\n                                          color: rgba(0, 0, 0, 0.9);\">日志文件</span> -->\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <div nz-row>\n                      <div nz-col [nzMd]=\"20\">\n                        <div nz-row [nzGutter]=\"16\">\n                          <div nz-col [nzSpan]=\"4\">\n                            <span>配置文件</span>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div nz-row>\n                <div style=\"margin-bottom: 10px\" nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <span style=\"display: block;\n                                        font-size: 13px;\n                                        font-weight: 400;\n                                        letter-spacing: 0px;\n                                        margin-bottom: 10px;\n                                        color: rgba(0, 0, 0, 0.9);\">内容选取方式</span>\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <nz-radio-group [(ngModel)]=\"this.configFileRadio\">\n                      <label nz-radio [nzValue]=\"'config'\" style=\"margin-right: 25px\">\n                        <span>选择</span>\n                      </label>\n                    </nz-radio-group>\n                  </div>\n                </div>\n              </div>\n              <dynamic-form #configFileForm [config]=\"configFile\">\n              </dynamic-form>\n              <!-- todo next -->\n            </div>\n          </nz-content>\n        </nz-layout>\n      </div>\n\n      <!-- 服务配置 -->\n      <div [hidden]=\"current !== 2\">\n        <nz-layout>\n          <nz-content [hidden]=\"serviceTabs.length === 0\">\n            <div class=\"marginTop20\">\n              <p>服务配置</p>\n              <div class=\"borderTop80\">\n                <!-- <nz-tabset [nzTabPosition]=\"'top'\" [nzType]=\"'card'\">\n                  <nz-tab (nzSelect)=\"choosedServiceFunc(tab)\" *ngFor=\"let tab of serviceTabs\">\n                    <ng-template #nzTabHeading>\n                      {{tab}}\n                    </ng-template>\n                  </nz-tab>\n                </nz-tabset> -->\n                <dynamic-form #formThird5Project [config]=\"formThird5\"></dynamic-form>\n                <!-- <nz-alert class=\"service-tips\" [nzType]=\"'info'\">\n                  <span alert-body nz-row>\n                    <div style=\"text-align: center; font-size: 20px; color:#10a5ef\" nz-col [nzSpan]=\"1\">\n                      <i class=\"anticon anticon-exclamation-circle-o\"></i>\n                    </div>\n                    <div nz-col [nzSpan]=\"21\">\n                      <div>\n                        <p>基本信息</p>\n                        <span>该模板用于在IT-PaaS 上部署 {{ choosedServiceName }}</span>\n                      </div>\n                    </div>\n                  </span>\n                </nz-alert> -->\n              </div>\n            </div>\n            <div class=\"marginTop20\" *ngIf=\"true === false\">\n              <p class=\"borderBottom80\">基本配置</p>\n              <div nz-row style=\"margin-bottom: 15px\">\n                <div style=\"margin-bottom: 10px\" *ngIf=\"this.radioValue === 'product'\" nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <span style=\"display: block;\n                                      font-size: 13px;\n                                      font-weight: 400;\n                                      letter-spacing: 0px;\n                                      margin-bottom: 10px;\n                                      color: rgba(0, 0, 0, 0.9);\">集群</span>\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <nz-radio-group [(ngModel)]=\"this.networkRadioValue\">\n                      <label *ngFor=\"let cluster of prodCluster\" nz-radio [nzValue]=\"cluster.name\">\n                        <span>{{ cluster.displayName }}</span>\n                      </label>\n                    </nz-radio-group>\n                  </div>\n                </div>\n                <div style=\"margin-bottom: 10px\" *ngIf=\"this.radioValue === 'test'\" nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <span style=\"display: block;\n                                      font-size: 13px;\n                                      font-weight: 400;\n                                      letter-spacing: 0px;\n                                      margin-bottom: 10px;\n                                      color: rgba(0, 0, 0, 0.9);\">集群</span>\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <nz-radio-group [(ngModel)]=\"this.networkRadioValue2\">\n                      <label *ngFor=\"let cluster of testCluster\" nz-radio [nzValue]=\"cluster.name\">\n                        <span>{{ cluster.displayName }}</span>\n                      </label>\n                    </nz-radio-group>\n                  </div>\n                </div>\n                <dynamic-form #formThirdProject [config]=\"formThird\">\n                </dynamic-form>\n                <div *ngIf=\"formThird1.length > 0 && formThird1Radios.length > 0\">\n                  <div *ngIf=\"choosedServiceName  === 'redis'\" class=\"marginBottom15\" nz-row>\n                    <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                      <span style=\"display: block;\n                                    font-size: 13px;\n                                    font-weight: 400;\n                                    letter-spacing: 0px;\n                                    margin-bottom: 10px;\n                                    color: rgba(0, 0, 0, 0.9);\">运行模式</span>\n                    </div>\n                    <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                      <nz-radio-group (click)=\"toggleRadio()\" [(ngModel)]=\"this.modelValue\">\n                        <label nz-radio [nzValue]=\"'replication'\">\n                          <span>replication</span>\n                        </label>\n                      </nz-radio-group>\n                    </div>\n                  </div>\n                  <!-- 这里可以用zookeeper && radio === true，也可以和上面redis一样的处理逻辑 -->\n                  <!-- <dynamic-form *ngIf=\"choosedServiceName  === 'zookeeper'\" #formThird4Project [config]=\"formThird4\"></dynamic-form> -->\n                  <dynamic-form #formThird1Project [config]=\"formThird1\">\n                  </dynamic-form>\n                  <dynamic-form *ngIf=\"choosedServiceName  === 'redis'\" #formThird3Project [config]=\"formThird3\"></dynamic-form>\n                  <div nz-row>\n                    <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                      <span style=\"display: block;\n                                  font-size: 13px;\n                                  font-weight: 400;\n                                  letter-spacing: 0px;\n                                  margin-bottom: 10px;\n                                  color: rgba(0, 0, 0, 0.9);\">容器实例大小</span>\n                    </div>\n                    <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px\">\n                      <app-container-instance #instanceThird [config]=\"formThird1Radios\">\n                      </app-container-instance>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"marginTop20\" *ngIf=\"true === false\">\n              <p class=\"borderBottom80\">高级配置</p>\n              <div nz-row style=\"margin-bottom: 15px\">\n                <dynamic-form #formThird2Project [config]=\"formThird2\"></dynamic-form>\n                <div class=\"marginBottom15\" *ngFor=\"let formThird2Radio of formThird2Radios\" nz-row>\n                  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                    <span style=\"display: block;\n                                  font-size: 13px;\n                                  font-weight: 400;\n                                  letter-spacing: 0px;\n                                  margin-bottom: 10px;\n                                  color: rgba(0, 0, 0, 0.9);\">{{ formThird2Radio.label }}</span>\n                  </div>\n                  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                    <nz-radio-group (click)=\"toggleRadio()\" [(ngModel)]=\"formThird2Radio.defaultValue\">\n                      <label *ngFor=\"let labelContent of formThird2Radio.labelContent\" nz-radio [nzValue]=\"labelContent\">\n                        <span>{{ labelContent }}</span>\n                      </label>\n                    </nz-radio-group>\n                  </div>\n                </div>\n                <!-- <dynamic-form *ngIf=\"choosedServiceName  === 'redis'\" #formThird3Project [config]=\"formThird3\"></dynamic-form> -->\n                <!-- 这里可以用zookeeper && radio === true，也可以和上面redis一样的处理逻辑 -->\n                <dynamic-form *ngIf=\"choosedServiceName  === 'zookeeper'\" #formThird4Project [config]=\"formThird4\"></dynamic-form>\n              </div>\n            </div>\n          </nz-content>\n          <nz-content *ngIf=\"serviceTabs.length === 0\">\n            <div class=\"marginTop20\">\n              <div class=\"borderTop80\">\n                <nz-alert class=\"service-tips\" [nzType]=\"'info'\">\n                  <span alert-body nz-row>\n                    <div style=\"text-align: center; font-size: 20px; color:#10a5ef\" nz-col [nzSpan]=\"1\">\n                      <i class=\"anticon anticon-exclamation-circle-o\"></i>\n                    </div>\n                    <div nz-col [nzSpan]=\"21\">\n                      <div>\n                        <p>无需服务配置</p>\n                        <span>该应用没有依赖服务，请直接进行部署!</span>\n                      </div>\n                    </div>\n                  </span>\n                </nz-alert>\n              </div>\n            </div>\n          </nz-content>\n        </nz-layout>\n      </div>\n    </div>\n  </div>\n  <div class=\"steps-action\" nz-row>\n    <!-- TODO -->\n    <!-- disabled? next函数控制 -->\n    <div nz-col [nzSpan]=\"4\"></div>\n    <div nz-col [nzSpan]=\"18\">\n      <span [hidden]=\"current >= 2\">\n        <button [disabled]=\"buttonDisabled()\" nz-button [nzType]=\"'primary'\" (click)=\"next()\">\n          <span>下一步</span>\n        </button>\n      </span>\n      <span [hidden]=\"current !== 2\">\n        <button [disabled]=\"buttonDisabled()\" nz-button [nzType]=\"'primary'\" (click)=\"done()\">\n          <span>部署</span>\n        </button>\n      </span>\n      <span [hidden]=\"current <= 0\">\n        <button nz-button [nzType]=\"'default'\" (click)=\"pre()\">\n          <span>上一步</span>\n        </button>\n      </span>\n      <span [hidden]=\"current !== 0\">\n        <button nz-button [nzType]=\"'default'\" (click)=\"pre()\">\n          <span>取消</span>\n        </button>\n      </span>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/app-deploy/app-deploy.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".steps-action {\n  border-top: 1px solid #ddd;\n  width: 80%;\n  padding-top: 20px; }\n\nnz-header, nz-content, nz-footer {\n  background: #fff; }\n\nnz-content {\n  padding: 0px; }\n\np {\n  font-size: 16px; }\n\n.service-tips p {\n  font-weight: bold; }\n\n.borderTop80 {\n  border-top: 1px solid #ddd;\n  padding-top: 20px;\n  width: 80%; }\n\n.borderBottom80 {\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 20px;\n  width: 80%; }\n\n.marginTop20 {\n  margin-bottom: 20px; }\n\n.marginBottom15 {\n  margin-bottom: 15px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-deploy/app-deploy.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppDeployComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__ = __webpack_require__("../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__container_instance_container_instance_component__ = __webpack_require__("../../../../../src/app/container-instance/container-instance.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dynamic_form_services_component_service_service__ = __webpack_require__("../../../../../src/app/dynamic-form/services/component-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

// enableProdMode();











// import { NameValidator } from '../util/reg-pattern/reg-name.directive';
var AppDeployComponent = (function () {
    function AppDeployComponent(fb, router, confirmServ, _message, http, routeInfo, componentSer, servicesService) {
        this.fb = fb;
        this.router = router;
        this.confirmServ = confirmServ;
        this._message = _message;
        this.http = http;
        this.routeInfo = routeInfo;
        this.componentSer = componentSer;
        this.servicesService = servicesService;
        this.configFileRadio = '';
        this.appId = '';
        this.formData = {
            createUserId: 1,
            groupId: this.servicesService.getCookie('groupID'),
            microservices: [
                {
                    storageSize: 0,
                    scaling_mode: 'MANUAL',
                    space_name: 'admin'
                }
            ],
            serviceInstances: []
        };
        this.current = 0;
        this.formFirst = [
            {
                type: 'input',
                label: '应用名称',
                name: 'instanceName',
                placeholder: '请输入应用名称',
                validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].maxLength(20)],
                styles: {
                    'width': '400px'
                }
            }
        ];
        this.radioValue = 'product';
        this.modelValue = 'replication';
        this.formSecond = [
            {
                type: 'input',
                label: '实例名称',
                name: 'microserviceName',
                placeholder: '请输入实例名称',
                validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].maxLength(20)],
                styles: {
                    'width': '400px'
                }
            },
            {
                type: 'input',
                label: '容器实例数量',
                name: 'podsCount',
                placeholder: '请输入容器实例数量',
                validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].min(1), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].max(256)],
                inputType: 'number',
                styles: {
                    'width': '400px'
                }
            }
        ];
        // 这里表单2和表单3都有用到
        this.instanceConfig = [
            {
                instance_size: 'XXS',
                cpuSize: 0.125,
                memSize: 256,
                focused: true,
                currentClass: {
                    'focused': true
                }
            },
            {
                instance_size: 'XS',
                cpuSize: 0.25,
                memSize: 512,
                focused: false,
                currentClass: {
                    'focused': false
                }
            },
            {
                instance_size: 'S',
                cpuSize: 0.5,
                memSize: 1,
                focused: false,
                currentClass: {
                    'focused': false
                }
            },
            {
                instance_size: 'M',
                cpuSize: 1,
                memSize: 2,
                focused: false,
                currentClass: {
                    'focused': false
                }
            },
            {
                instance_size: 'L',
                cpuSize: 2,
                memSize: 4,
                focused: false,
                currentClass: {
                    'focused': false
                }
            },
            {
                instance_size: 'XL',
                cpuSize: 4,
                memSize: 8,
                focused: false,
                currentClass: {
                    'focused': false
                }
            },
        ];
        this.images = [];
        this.imageTabs = [];
        this.choosedImageName = '';
        // todo next
        // repositoryId: string[] = [];
        this.repositoryId = '';
        this.networkRadioValue = '';
        this.networkRadioValue2 = '';
        // 镜像配置里的网络配置
        this.networkConfig = '';
        this.loadBanlancer$ = [];
        this.lbControlLabel = [];
        this.lbControlArray = [];
        this.testOptions = [];
        this.formImgNetwork = [
            {
                type: 'input',
                label: '容器暴露端口',
                name: 'ports',
                inputType: 'number',
                placeholder: '回车或者空格确定',
                // validation: [Validators.required, Validators.min(1)],
                styles: {
                    'width': '400px'
                },
                defaultValue: 80,
                notNecessary: true
            },
            {
                type: 'select',
                label: '负载均衡器',
                name: 'loadbanlancer',
                options: ['haproxy-10-198-102-207 ( HAPROXY / 外网 / 10.198.102.207 )'] || this.loadBanlancer$,
                placeholder: '选择负载均衡器',
                // validation: [Validators.required],
                styles: {
                    'width': '400px'
                },
                notNecessary: true
                // ifTags: 'true'
            },
        ];
        // 镜像配置里的高级配置
        this.serviceType = '';
        this.serviceAdvancedLabel = [];
        this.env$ = [];
        this.logFormConfig = [{
                type: 'input',
                label: '日志文件',
                placeholder: '文件路径，支持文件名通配符，如/var/logo/*.log',
                name: 'logPath',
                // validation: [Validators.required],
                styles: {
                    'width': '400px'
                },
                notNecessary: true
            }];
        this.envFormConfig = [{
                type: 'select',
                label: '环境变量文件',
                placeholder: '请选择环境变量文件',
                options: [],
                name: 'envconfig',
                validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required],
                styles: {
                    'width': '400px'
                }
            }];
        this.env1 = [];
        this.env1Enty = {};
        this.env1Array = [];
        this.configFile = [
            {
                type: 'input',
                label: '文件路径',
                placeholder: '',
                name: 'path',
                // validation: [Validators.required],
                styles: {
                    'width': '400px'
                },
                notNecessary: true
            },
            {
                type: 'select',
                label: '配置',
                placeholder: '请选择配置文件',
                options: [],
                name: 'name',
                // validation: [Validators.required],
                styles: {
                    'width': '400px'
                },
                notNecessary: true,
                valueUpdate: true
            },
            {
                type: 'select',
                label: '键',
                placeholder: '请选择键值',
                options: [],
                name: 'key',
                // validation: [Validators.required],
                styles: {
                    'width': '400px'
                },
                notNecessary: true
            }
        ];
        // 这里，主机标签有个数量count1，集群节点数有个数量count2，应该是先获取count1，然后count2要小于《count1，然后再选择count2之后，主机标签这里也要限制选择的数量
        this.formThird1 = [];
        this.formThird1Radios = [];
        this.formThird1RadioEntity = {};
        this.formThird = [
            {
                type: 'input',
                label: '实例名称',
                name: 'instanceName',
                placeholder: '请输入实例名称',
                validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].maxLength(20)],
                styles: {
                    'width': '400px'
                }
            },
        ];
        this.serviceTabs = [];
        this.services = [];
        this.choosedServiceName = '';
        this.serviceId = '';
        this.formThird2 = [];
        this.formThird2Radios = [];
        this.formThird2RadioEntity = {};
        this.formThird3 = [
            {
                type: 'input',
                inputType: 'number',
                label: '从节点数',
                name: 'replicas_per_shard',
                placeholder: '设置从节点的个数',
                validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].min(1)],
                styles: {
                    'width': '400px'
                }
            },
            {
                type: 'select',
                label: 'Master 节点地址',
                name: 'master_node_addr',
                options: [],
                placeholder: '请先选择主机标签地址!',
                validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required],
                styles: {
                    'width': '400px'
                },
            }
        ];
        this.operateMode = [];
        this.formThird3Entity = {};
        this.formThird4 = [];
        this.formThird4Entity = {};
        this.mysqlOption = [];
        this.redisOption = [];
        this.zookeeperOption = [];
        this.formThird5Data = {};
        this.formThird5 = [
            {
                type: 'select',
                label: 'mysql服务',
                name: 'service_mysql',
                options: [],
                placeholder: '请选择依赖的mysql服务!',
                // validation: [Validators.required],
                notNecessary: true,
                styles: {
                    'width': '400px'
                },
            },
            {
                type: 'select',
                label: 'redis服务',
                name: 'service_redis',
                options: [],
                placeholder: '请选择依赖的redis服务!',
                // validation: [Validators.required],
                notNecessary: true,
                styles: {
                    'width': '400px'
                },
            },
            {
                type: 'select',
                label: 'zookeeper服务',
                name: 'service_zookeeper',
                options: [],
                placeholder: '请选择依赖的zookeeper服务!',
                // validation: [Validators.required],
                notNecessary: true,
                styles: {
                    'width': '400px'
                },
            }
        ];
    }
    // async toggleButton() {
    //   await this.getIpTag();
    //   this.formThird[3] = {
    //     type: 'select',
    //     label: '主机标签',
    //     name: 'ip_tag',
    //     options: this.ipTag$,
    //     placeholder: '选择主机标签',
    //     // validation: [Validators.required, Validators.minLength(3)],
    //     styles: {
    //       'width': '400px'
    //     },
    //     ifTags: 'true'
    //   },
    //     this.formThirdProject.setValue('ip_tag', this.formThird[3]);
    // }
    AppDeployComponent.prototype.buttonDisabled = function () {
        switch (this.current) {
            case 0: {
                return !this.formFirstProject.valid;
            }
            case 1: {
                return !this.formSecondProject.valid || !this.formImgNetworkProject.valid ||
                    !this.logFormProject1.valid;
                // todo next
                // !this.logFormProject1.valid || !this.envFormProject1.valid;
            }
            case 2: {
                if (this.serviceTabs.length === 0) {
                    return false;
                }
                else {
                    return !this.formThird5Project.valid;
                    // let ThirdValid;
                    // if (this.choosedServiceName === 'redis' && this.formThird3Project !== undefined) {
                    //   if (this.formThird3Project.config.length > 0 && this.formThird3Project['config'][0]['label'] === '发布') {
                    //     ThirdValid = false;
                    //   } else {
                    //     ThirdValid = !this.formThird3Project.valid;
                    //   }
                    // }
                    // return !this.formThirdProject.valid || !this.formThird2Project.valid ||
                    //   !this.formThird1Project.valid || ThirdValid;
                }
                // return  !this.formThird2Project.valid || !this.formThird1Project.valid;
            }
        }
    };
    AppDeployComponent.prototype.getIpTag = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.radioValue === 'product') {
                _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiAlauda + '/regions/' + __WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].namespace + '/' + _this.networkRadioValue + '/labels').
                    subscribe(function (data) {
                    console.log('这是主机标签', data);
                    _this.ipTag$ = __WEBPACK_IMPORTED_MODULE_6_lodash__["compact"](__WEBPACK_IMPORTED_MODULE_6_lodash__["map"](data['labels'], function (value, key) {
                        // if (value['labels'].length > 0) {
                        // if (value['node_tag']) {
                        return value['value'];
                        // }
                    }));
                    resolve();
                });
            }
            else {
                _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiAlauda + '/regions/' + __WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].namespace + '/' + _this.networkRadioValue2 + '/labels').
                    subscribe(function (data) {
                    console.log('这是主机标签', data);
                    _this.ipTag$ = __WEBPACK_IMPORTED_MODULE_6_lodash__["compact"](__WEBPACK_IMPORTED_MODULE_6_lodash__["map"](data['labels'], function (value, key) {
                        // if (value['labels'].length > 0) {
                        // if (value['node_tag']) {
                        return value['value'];
                        // }
                    }));
                    resolve();
                });
            }
        });
    };
    AppDeployComponent.prototype.getServiceVersion = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiService + '/apiService/services/' + _this.serviceId).subscribe(function (data) {
                console.log('这是服务详情', data);
                var serviceVer = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](data['basic_config'], function (value, key) {
                    if (value['attribute_name'] === 'image_tag') {
                        return __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](value['option'], function (value1, key1) {
                            return value1['version'];
                        });
                    }
                });
                _this.serviceVersion$ = __WEBPACK_IMPORTED_MODULE_6_lodash__["flatten"](__WEBPACK_IMPORTED_MODULE_6_lodash__["compact"](serviceVer));
                resolve();
            });
        });
    };
    AppDeployComponent.prototype.getServiceBasic = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiService + '/apiService/services/' + _this.serviceId).subscribe(function (data) {
                // 这里每次都需要清除一次数据，不然数据会重复
                _this.formThird1 = [];
                _this.formThird1Radios = [];
                __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](data['basic_config'], function (value, key) {
                    switch (value['type']) {
                        case 'string': {
                            // this.formThird1
                            _this.formThird1[key] = {
                                type: 'input',
                                defaultValue: value['default_value'],
                                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                name: value['attribute_name'],
                                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                    value['description']['zh'] : value['attribute_name'],
                                validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required],
                                // notNecessary: true,
                                styles: {
                                    'width': '400px'
                                }
                            };
                            break;
                        }
                        case 'int': {
                            _this.formThird1[key] = {
                                type: 'input',
                                defaultValue: value['default_value'],
                                inputType: 'number',
                                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                name: value['attribute_name'],
                                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                    value['description']['zh'] : value['attribute_name'],
                                validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].min(1)],
                                // notNecessary: true,
                                styles: {
                                    'width': '400px'
                                }
                            };
                            break;
                        }
                        case 'radio_group_tab': {
                            // const radioAttriName = value['attribute_name']
                            _this.formThird1Radios[key] = {
                                label: value['display_name']['zh'],
                                name: value['attribute_name'],
                                labelContent: value['option'],
                                defaultValue: value['option'][0]
                            };
                            break;
                        }
                        case 'option': {
                            var options$ = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](value['option'], function (value1, key1) {
                                if (__WEBPACK_IMPORTED_MODULE_6_lodash__["isObject"](value1)) {
                                    var optionType_1 = [];
                                    __WEBPACK_IMPORTED_MODULE_6_lodash__["forIn"](value1, function (value2, key2) {
                                        optionType_1[key1] = key2;
                                    });
                                    return value1[optionType_1[key1]];
                                }
                                else {
                                    return value1;
                                }
                            });
                            if (value['attribute_name'] === 'cluster_size') {
                                var cluserOption_1 = [];
                                __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](options$, function (valueOp, keyOp) {
                                    switch (valueOp) {
                                        case 'XXS': {
                                            cluserOption_1[keyOp] = {
                                                insSize: valueOp,
                                                cpuSize: 0.125,
                                                memSize: 256,
                                                choosed: true
                                            };
                                            break;
                                        }
                                        case 'XS': {
                                            cluserOption_1[keyOp] = {
                                                insSize: valueOp,
                                                cpuSize: 0.25,
                                                memSize: 512
                                            };
                                            break;
                                        }
                                        case 'S': {
                                            cluserOption_1[keyOp] = {
                                                insSize: valueOp,
                                                cpuSize: 0.5,
                                                memSize: 1
                                            };
                                            break;
                                        }
                                        case 'M': {
                                            cluserOption_1[keyOp] = {
                                                insSize: valueOp,
                                                cpuSize: 1,
                                                memSize: 2
                                            };
                                            break;
                                        }
                                        case 'L': {
                                            cluserOption_1[keyOp] = {
                                                insSize: valueOp,
                                                cpuSize: 2,
                                                memSize: 4
                                            };
                                            break;
                                        }
                                        case 'XL': {
                                            cluserOption_1[keyOp] = {
                                                insSize: valueOp,
                                                cpuSize: 4,
                                                memSize: 8
                                            };
                                            break;
                                        }
                                        default:
                                            break;
                                    }
                                });
                                __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](cluserOption_1, function (valueIns, keyIns) {
                                    _this.formThird1Radios[keyIns] = {
                                        name: value['attribute_name'],
                                        instance_size: valueIns.insSize,
                                        cpuSize: valueIns.cpuSize,
                                        memSize: valueIns.memSize,
                                        focused: valueIns.choosed ? true : false,
                                        currentClass: {
                                            'focused': valueIns.choosed ? true : false
                                        }
                                    };
                                });
                            }
                            else {
                                _this.formThird1[key] = {
                                    selectedOption: undefined,
                                    type: 'select',
                                    label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                    name: value['attribute_name'],
                                    options: options$,
                                    placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                        value['description']['zh'] : value['attribute_name'],
                                    validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required],
                                    styles: {
                                        'width': '400px'
                                    },
                                };
                            }
                            break;
                        }
                        case 'multi_option': {
                            var options$ = void 0;
                            if (value['option'].length !== 0 && value['option'].length !== undefined) {
                                options$ = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](value['option'], function (value1, key1) {
                                    if (__WEBPACK_IMPORTED_MODULE_6_lodash__["isObject"](value1)) {
                                        var optionType_2 = [];
                                        __WEBPACK_IMPORTED_MODULE_6_lodash__["forIn"](value1, function (value2, key2) {
                                            optionType_2[key1] = key2;
                                        });
                                        return value1[optionType_2[key1]];
                                    }
                                    else {
                                        return value1;
                                    }
                                });
                            }
                            else {
                                options$ = _this.ipTag$;
                            }
                            _this.formThird1[key] = {
                                ifTags: value['attribute_name'] === 'ip_tag' ? 'true' : 'false',
                                type: 'select',
                                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                name: value['attribute_name'],
                                options: options$,
                                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                    value['description']['zh'] : value['attribute_name'],
                                validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required],
                                styles: {
                                    'width': '400px'
                                },
                                valueUpdate: true
                            };
                            break;
                        }
                        default:
                            break;
                    }
                });
                _this.formThird1 = __WEBPACK_IMPORTED_MODULE_6_lodash__["uniqWith"](__WEBPACK_IMPORTED_MODULE_6_lodash__["compact"](_this.formThird1), __WEBPACK_IMPORTED_MODULE_6_lodash__["isEqual"]);
                _this.formThird1Radios = __WEBPACK_IMPORTED_MODULE_6_lodash__["uniqWith"](__WEBPACK_IMPORTED_MODULE_6_lodash__["compact"](_this.formThird1Radios), __WEBPACK_IMPORTED_MODULE_6_lodash__["isEqual"]);
                resolve();
            });
        });
    };
    AppDeployComponent.prototype.getServiceAdvanced = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiService + '/apiService/services/' + _this.serviceId).subscribe(function (data) {
                // 这里每次都需要清除一次数据，不然数据会重复
                _this.formThird2 = [];
                _this.formThird2Radios = [];
                console.log('这是服务详情advanced', data['advanced_config']);
                // this.formThird2 = data['advanced_config'];
                __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](data['advanced_config'], function (value, key) {
                    switch (value['type']) {
                        case 'string': {
                            // this.formThird2
                            _this.formThird2[key] = {
                                type: 'input',
                                defaultValue: value['default_value'],
                                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                name: value['attribute_name'],
                                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                    value['description']['zh'] : value['attribute_name'],
                                // validation: [Validators.required],
                                notNecessary: true,
                                styles: {
                                    'width': '400px'
                                }
                            };
                            break;
                        }
                        case 'int': {
                            _this.formThird2[key] = {
                                type: 'input',
                                defaultValue: value['default_value'],
                                inputType: 'number',
                                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                name: value['attribute_name'],
                                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                    value['description']['zh'] : value['attribute_name'],
                                validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].min(1)],
                                notNecessary: true,
                                styles: {
                                    'width': '400px'
                                }
                            };
                            break;
                        }
                        case 'radio_group_tab': {
                            // const radioAttriName = value['attribute_name']
                            _this.formThird2Radios[key] = {
                                label: value['display_name']['zh'],
                                name: value['attribute_name'],
                                labelContent: value['option'],
                                defaultValue: value['option'][0]
                            };
                            break;
                        }
                        case 'option': {
                            var options$ = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](value['option'], function (value1, key1) {
                                return value1['type'];
                            });
                            _this.formThird2[key] = {
                                type: 'select',
                                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                name: value['attribute_name'],
                                options: options$,
                                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                    value['description']['zh'] : value['attribute_name'],
                                validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required],
                                styles: {
                                    'width': '400px'
                                },
                            };
                            break;
                        }
                        default:
                            break;
                    }
                });
                _this.formThird2 = __WEBPACK_IMPORTED_MODULE_6_lodash__["uniqWith"](__WEBPACK_IMPORTED_MODULE_6_lodash__["compact"](_this.formThird2), __WEBPACK_IMPORTED_MODULE_6_lodash__["isEqual"]);
                __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](data['true_config'], function (value, key) {
                    switch (value['type']) {
                        case 'string': {
                            _this.formThird4[key] = {
                                type: 'input',
                                defaultValue: value['default_value'],
                                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                name: value['attribute_name'],
                                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                    value['description']['zh'] : value['attribute_name'],
                                // validation: [Validators.required],
                                notNecessary: true,
                                styles: {
                                    'width': '400px'
                                }
                            };
                            break;
                        }
                        default:
                            break;
                    }
                });
                _this.formThird4 = __WEBPACK_IMPORTED_MODULE_6_lodash__["uniqWith"](__WEBPACK_IMPORTED_MODULE_6_lodash__["compact"](_this.formThird4), __WEBPACK_IMPORTED_MODULE_6_lodash__["isEqual"]);
                if (_this.choosedServiceName === 'kafka') {
                    var config$ = {
                        ifTags: 'true',
                        type: 'select',
                        label: '已经部署的zookeeper集群',
                        name: 'ip_tag_zoo',
                        options: _this.ipTag$,
                        placeholder: '请选择',
                        validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required],
                        styles: {
                            'width': '400px'
                        },
                    };
                    _this.formThird2 = __WEBPACK_IMPORTED_MODULE_6_lodash__["concat"](config$, _this.formThird2);
                }
                _this.formThird2Radios = __WEBPACK_IMPORTED_MODULE_6_lodash__["uniqWith"](__WEBPACK_IMPORTED_MODULE_6_lodash__["compact"](_this.formThird2Radios), __WEBPACK_IMPORTED_MODULE_6_lodash__["isEqual"]);
                resolve();
            });
        });
    };
    //region pre
    AppDeployComponent.prototype.pre = function () {
        this.current -= 1;
        if (this.current === -1) {
            // window.location.href = window.location.origin + '/#/appStore';
            this.router.navigate(['appStore']);
        }
        this.changeContent();
    };
    //endregion pre
    AppDeployComponent.prototype.next = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var configKeyValue1_1;
            return __generator(this, function (_a) {
                switch (this.current) {
                    case 0: {
                        // console.log('0', this.formFirst);
                        console.log(this.networkRadioValue);
                        this.formData['instanceName'] = this.formFirstProject.value['instanceName'];
                        this.formData['clusterZone'] = this.radioValue;
                        console.log('form222', this.formSecondProject);
                        break;
                        // if(this.formFirst.disabled) {
                        // }
                    }
                    case 1: {
                        console.log(this.formImgNetworkProject, this.envFormProject1, this.logFormProject1, this.env1Form);
                        this.env1Enty[this.env1Form.value['key']] = this.env1Form.value['value'];
                        // todo next
                        // 这里logPath好像接口上没注明，需要立果确认
                        // 还有配置文件，传参和灵雀云不太一样，看下飞信聊天以及实例接口文档
                        this.env1Enty['__ALAUDA_FILE_LOG_PATH__'] = this.logFormProject1.value['logPath'];
                        // 下面是对object假值的处理：https://stackoverflow.com/questions/30812765/how-to-remove-undefined-and-null-values-from-an-object-using-lodash
                        this.env1Enty = __WEBPACK_IMPORTED_MODULE_6_lodash__["pickBy"](this.env1Enty, __WEBPACK_IMPORTED_MODULE_6_lodash__["identity"]);
                        __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](this.configKeyValueArr, function (value, key) {
                            if (value['key'] === _this.configFileForm.value['key']) {
                                configKeyValue1_1 = value['id'];
                            }
                        });
                        // console.log('form333', this.formThirdProject);
                        // todo next
                        // _.map(this.repositoryId, (value1, key1) => {
                        //   this.formData['microservices'][key1] = {
                        //     storageSize: 0,
                        //     scaling_mode: 'MANUAL',
                        //     space_name: 'admin',
                        //     microserviceName: this.formSecondProject.value['microserviceName'],
                        //     podsCount: parseInt(this.formSecondProject.value['podsCount']),
                        //     repositoryId: value1,
                        //     instance_size: this.instanceSecond.value['instance_size'],
                        //     // 这里由于线上可用的集群就两个：cmss和ebd，所以先暂时写死
                        //     clusterName: this.radioValue === 'prodDomain' ? 'cmss' : 'ebd'
                        //   }
                        // });
                        this.formData['microservices'][0] = {
                            storageSize: 0,
                            scaling_mode: 'MANUAL',
                            space_name: 'admin',
                            microserviceName: this.formSecondProject.value['microserviceName'],
                            podsCount: parseInt(this.formSecondProject.value['podsCount']),
                            repositoryId: this.repositoryId,
                            instance_size: this.instanceSecond.value['instance_size'],
                            // 这里由于线上可用的集群就两个：cmss和ebd，所以先暂时写死
                            clusterName: this.radioValue === 'product' ? this.networkRadioValue : this.networkRadioValue2,
                            network_mode: this.networkConfig,
                            ports: [this.formImgNetworkProject.value['ports']],
                            load_balancers: this.formImgNetworkProject.value['loadbanlancer'] === undefined ? undefined : [
                                {
                                    listeners: [
                                        {
                                            listener_port: parseInt(this.loadBanlancerForm.value['listener_port']),
                                            container_port: this.loadBanlancerForm.value['container_port'],
                                            protocol: this.loadBanlancerForm.value['protocol'],
                                            rules: []
                                        }
                                    ],
                                    load_balancer_id: "1f9afbd2-4538-4089-63cb-8feab689d436",
                                    name: "haproxy-10-198-102-207",
                                    type: "haproxy",
                                    uniqueId: "load_balancer_id1",
                                    version: 1
                                }
                            ],
                            // todo next
                            // envfiles: [
                            //   {
                            //     name: this.envFormProject1.value['envconfig']
                            //   }
                            // ],
                            // todo next
                            // todo next
                            // 对object {} 空对象的比较：http://www.zuojj.com/archives/775.html
                            instance_envvars: __WEBPACK_IMPORTED_MODULE_6_lodash__["isEqual"](this.env1Enty, {}) ? undefined : this.env1Enty,
                            microserviceConfigs: this.configFileForm.value['path'] === undefined ? undefined : [{
                                    type: this.configFileRadio,
                                    path: this.configFileForm.value['path'],
                                    value: configKeyValue1_1
                                }]
                            // clusterName: this.radioValue === 'prodDomain' ? this.networkRadioValue : 'testDomain'
                        };
                        if (this.serviceId) {
                            // console.log('这是seriveId', this.serviceId);
                            // await this.getServiceVersion();
                            // this.formThird[2] = {
                            //   type: 'select',
                            //   label: '服务版本',
                            //   name: 'version',
                            //   options: this.serviceVersion$,
                            //   placeholder: '选择服务版本',
                            //   validation: [Validators.required],
                            //   styles: {
                            //     'width': '400px'
                            //   },
                            //   // ifTags: 'true'
                            // };
                            // this.formThirdProject.setValue('version', this.formThird[2]);
                            // todo 这里把服务配置给清除掉
                            // await this.getIpTag();
                            // await this.getServiceBasic();
                            // this.formThird1Project.setConfig(this.formThird1);
                            // await this.getServiceAdvanced();
                            // this.formThird2Project.setConfig(this.formThird2);
                            // todo 这里把服务配置给清除掉
                            // if (this.choosedServiceName === 'redis') {
                            //   await this.getOperateMode();
                            //   _.map(this.operateMode['replication'], (value1, key1) => {
                            //     if (value1['type'] === 'int') {
                            //       this.formThird3[key1] = {
                            //         type: 'input',
                            //         inputType: 'number',
                            //         label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                            //         name: value1['attribute_name'],
                            //         placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
                            //           value1['description']['zh'] : value1['attribute_name'],
                            //         validation: [Validators.required, Validators.min(1)],
                            //         styles: {
                            //           'width': '400px'
                            //         }
                            //       };
                            //     } else if (value1['type'] === 'single_ip_tag') {
                            //       // const options$ = this.formThird1Project.value['ip_tag'] || [];
                            //       const options$ = [];
                            //       // const options$ = ['11', '22'];
                            //       this.formThird3[key1] = {
                            //         type: 'select',
                            //         label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                            //         name: value1['attribute_name'],
                            //         options: options$,
                            //         placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
                            //           value1['description']['zh'] : value1['attribute_name'],
                            //         validation: [Validators.required],
                            //         styles: {
                            //           'width': '400px'
                            //         },
                            //       };
                            //     }
                            //   });
                            //   // this.formThird3Project.setConfig(this.formThird3);
                            // }
                            // this.formThird3Project.setConfig(this.formThird3);
                            // todo 这里把服务配置给清除掉
                            // if (this.choosedServiceName === 'zookeeper') {
                            //   this.formThird4Project.setConfig(this.formThird4);
                            // }
                            // todo 这里把服务配置给清除掉
                        }
                        console.log('formData', this.formData);
                        // this.formData['microserviceName'] = this.formSecondProject.value['microserviceName'];
                        // this.formData['repositoryId'] = this.repositoryId;
                        break;
                    }
                }
                this.current += 1;
                this.changeContent();
                return [2 /*return*/];
            });
        });
    };
    AppDeployComponent.prototype.done = function () {
        var _this = this;
        // 这里，需要复习一下object[变量]和object['常量']的区别
        if (this.serviceTabs.length > 0) {
            // todo 这里把服务配置给清除掉
            // if (this.choosedServiceName === 'zookeeper') {
            //   if (this.formThird2Radios) {
            //     _.map(this.formThird2Radios, (value, key) => {
            //       // console.log('打印radio', value);
            //       const valueName$ = value.name;
            //       this.formThird2RadioEntity[valueName$] = value.defaultValue;
            //       // this.formThird2RadioEntity[key] = {
            //       //   [valueName$]: value.defaultValue
            //       // }
            //     });
            //   }
            // } else {
            //   this.formThird2RadioEntity['mode'] = 'replication';
            // }
            // if (this.formThird3Project) {
            //   _.mapKeys(this.formThird3Project['value'], (value, key) => {
            //     this.formThird3Entity[key] = value;
            //   });
            // } else {
            //   this.formThird3Entity = {};
            // }
            // if (this.formThird4Project) {
            //   if (this.formThird4Project['config'].length !== 0) {
            //     _.mapKeys(this.formThird4Project['value'], (value, key) => {
            //       this.formThird4Entity[key] = value;
            //     });
            //   } else {
            //     this.formThird4Entity = {};
            //   }
            // }
            // this.formThird1RadioEntity[this.instanceThird.value['name']] = this.instanceThird.value['instance_size']
            // if (this.choosedServiceName === 'zookeeper') {
            //   this.formThird1Project.value['num_of_nodes'] = parseInt(this.formThird1Project.value['num_of_nodes']);
            // }
            // this.formData['serviceInstances'][0] = {
            //   storageSize: 0,
            //   serviceId: this.serviceId,
            //   instanceName: this.formThirdProject.value['instanceName'],
            //   instancesCount: parseInt(this.formThird1Project.value['num_of_nodes']),
            //   cpuSize: this.instanceThird.value['cpuSize'] * this.formThird1Project.value['num_of_nodes'],
            //   memSize: this.instanceThird.value['memSize'] * this.formThird1Project.value['num_of_nodes'],
            //   clusterName: this.radioValue === 'product' ? this.networkRadioValue : this.networkRadioValue2,
            //   info: {
            //     basic_config: _.assign(this.formThird1Project.value, this.formThird1RadioEntity,
            //       this.choosedServiceName === 'redis' ? this.formThird2RadioEntity : {},
            //       this.formThird3Entity),
            //     advanced_config: _.assign(this.formThird2Project.value, this.choosedServiceName === 'zookeeper' ?
            //       this.formThird2RadioEntity : {}, this.formThird4Entity)
            //   }
            // }
            // todo 这里把服务配置给清除掉
            var serviceIdData_1 = [];
            console.log('打印formThird5', this.formThird5Project);
            // if (this.formThird5Project.value['service_mysql'] !== undefined) {
            __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](this.formThird5Map, function (value, key) {
                if (value['instanceName'] === _this.formThird5Project.value['service_mysql']) {
                    serviceIdData_1[key] = value['id'];
                }
                else if (value['instanceName'] === _this.formThird5Project.value['service_redis']) {
                    serviceIdData_1[key] = value['id'];
                }
                else if (value['instanceName'] === _this.formThird5Project.value['service_zookeeper']) {
                    serviceIdData_1[key] = value['id'];
                }
            });
            console.log('这是serviceIdData', serviceIdData_1);
            // }
            // _.map(this.formThird5Project.value, ())
            // const serviceInstanceData;
            this.formData['serviceInstances'] = __WEBPACK_IMPORTED_MODULE_6_lodash__["compact"](serviceIdData_1);
            this.http.post(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiApp + '/apiApp/applications/' + this.appId + '/instances', this.formData).subscribe(function (data) {
                var thisParent = _this;
                console.log('应用部署成功', data);
                _this.confirmServ.success({
                    maskClosable: false,
                    title: '应用部署成功!',
                    content: '点确认按钮跳转到应用商城',
                    okText: '确定',
                    onOk: function () {
                        // .contentControl = true;
                        // console.log('form11', thisParent.form);
                        // const redirect = window.location.host + '/#/appStore';
                        // window.location.href = window.location.origin + '/#/appStore';
                        thisParent.router.navigate(['appStore']);
                    },
                    onCancel: function () {
                    }
                });
            });
        }
        // if (this.formThird1Radios) {
        //   _.map(this.formThird1Radios, (value, key) => {
        //     const valueName$ = value.name;
        //     this.formThird1RadioEntity[valueName$] = value.instance_size;
        //   })
        // }
        // if (this.formThird1Project.value['ip_tag'].length === 1) {
        //   const arr = [];
        //   arr[0] = this.formThird1Project.value['ip_tag'];
        //   this.formThird1Project.value['ip_tag'] = arr;
        // }
        // console.log('formThird2', this.formThird2Project);
        // console.log('instance', this.instanceThird);
        // this._message.success('done');
        // console.log('formData', this.formData);
    };
    // todo 这里两个choosed函数可以优化
    AppDeployComponent.prototype.choosedImageFunc = function (tab) {
        var _this = this;
        // console.log('image func', tab);
        this.choosedImageName = tab;
        __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](this.images, function (value, key) {
            if (value['repositoryName'] === _this.choosedImageName) {
                // todo next
                // this.repositoryId[key] = value['id'];
                _this.repositoryId = value['id'];
            }
        });
        // console.log('image-id', this.repositoryId);
    };
    AppDeployComponent.prototype.choosedServiceFunc = function (tab) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.choosedServiceName = tab;
                // 这里this.services为什么是空？
                __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](this.services, function (value, key) {
                    if (value['serviceName'] === _this.choosedServiceName) {
                        _this.serviceId = value['id'];
                    }
                });
                // await this.getServiceVersion();
                // this.formThird[2] = {
                //   type: 'select',
                //   label: '服务版本',
                //   name: 'version',
                //   options: this.serviceVersion$,
                //   placeholder: '选择服务版本',
                //   validation: [Validators.required],
                //   styles: {
                //     'width': '400px'
                //   },
                //   // ifTags: 'true'
                // };
                // this.formThirdProject.setValue('version', this.formThird[2]);
                // todo 这里把服务配置给清除掉
                // await this.getIpTag();
                // await this.getServiceBasic();
                // // this.formThird1Project.setFormValue('image_tag', undefined);
                // // 这里获取服务的advanced_config
                // await this.getServiceAdvanced();
                // console.log('这是formThird2', this.formThird2);
                // this.formThird1Project.setConfig(this.formThird1);
                // this.formThird2Project.setConfig(this.formThird2);
                // if (this.choosedServiceName === 'zookeeper') {
                //   this.formThird4Project.setConfig(this.formThird4);
                // }
                // if (this.choosedServiceName === 'redis') {
                //   await this.getOperateMode();
                //   _.map(this.operateMode['replication'], (value1, key1) => {
                //     if (value1['type'] === 'int') {
                //       this.formThird3[key1] = {
                //         type: 'input',
                //         inputType: 'number',
                //         label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                //         name: value1['attribute_name'],
                //         placeholder: '请先选择主机标签地址!',
                //         validation: [Validators.required, Validators.min(1)],
                //         styles: {
                //           'width': '400px'
                //         }
                //       };
                //     } else if (value1['type'] === 'single_ip_tag') {
                //       // const options$ = this.formThird1Project.value['ip_tag'] || [];
                //       const options$ = [];
                //       // const options$ = ['11', '22'];
                //       this.formThird3[key1] = {
                //         type: 'select',
                //         label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                //         name: value1['attribute_name'],
                //         options: options$,
                //         placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
                //           value1['description']['zh'] : value1['attribute_name'],
                //         validation: [Validators.required],
                //         styles: {
                //           'width': '400px'
                //         },
                //       };
                //     }
                //   });
                //   this.formThird3Project.setConfig(this.formThird3);
                // }
                // todo 这里把服务配置给清除掉
                this.buttonDisabled();
                console.log('service-id', this.serviceId);
                return [2 /*return*/];
            });
        });
    };
    AppDeployComponent.prototype.changeContent = function () {
        switch (this.current) {
            case 0: {
                this.current = 0;
                break;
            }
            case 1: {
                this.current = 1;
                break;
            }
            case 2: {
                this.current = 2;
                break;
            }
            case 3: {
                this.current = 3;
                break;
            }
            default: {
                this.current = 4;
            }
        }
    };
    AppDeployComponent.prototype.getServiceInit = function () {
        var _this = this;
        // 这里用到了async-await 和 rxjs里面的forkJoin，
        // async-await可参考链接：https://cnodejs.org/topic/5640b80d3a6aa72c5e0030b6
        // rxjs可参考链接：https://segmentfault.com/a/1190000010259536#articleHeader12
        return new Promise(function (resolve, reject) {
            var url$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].forkJoin(_this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].api + '/api/' + _this.servicesService.getCookie('groupID') + '/warehouse/repository'), _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiService + '/apiService/groups/' + _this.servicesService.getCookie('groupID') + '/services?isPublic=1'), _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiApp + '/apiApp/groups/' + _this.servicesService.getCookie('groupID') + '/applications/' + _this.appId));
            url$.subscribe(function (values) {
                console.log('这里是所有数据', values);
                // this.images = _.map(values[0]['images'], (value, key) => {
                //   return value;
                // });
                // this.services = _.map(values[1], (value, key) => {
                //   return value;
                // });
                _this.images = values[2]['repositories'];
                _this.services = values[2]['services'];
                _this.imageTabs = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](values[2]['repositories'], function (value, key) {
                    return value['repositoryName'];
                });
                _this.serviceTabs = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](values[2]['services'], function (value, key) {
                    return value['serviceName'];
                });
                resolve();
            });
            // this.http.get(environment.api + '/api/2/warehouse/repository').subscribe(data => {
            //   this.images = _.map(data['images'], (value, key) => {
            //     return value;
            //   });
            // });
            // this.http.get(environment.apiService + '/apiService/groups/2/services?isPublic=1').subscribe(data => {
            //   this.services = _.map(data, (value, key) => {
            //     return value;
            //   });
            // });
            // this.http.get(environment.apiApp + '/apiApp/groups/2/applications/' + this.appId).subscribe(data => {
            //   this.imageTabs = _.map(data['repositories'], (value, key) => {
            //     return value['repositoryName'];
            //   });
            //   this.serviceTabs = _.map(data['services'], (value, key) => {
            //     return value['serviceName'];
            //   });
            // });
        });
    };
    AppDeployComponent.prototype.toggleRadio = function () {
        var _this = this;
        // console.log(this.formThird2Radio.defaultValue);
        if (this.choosedImageName === 'redis') {
            __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](this.operateMode['replication'], function (value1, key1) {
                if (value1['type'] === 'int') {
                    _this.formThird3[key1] = {
                        type: 'input',
                        inputType: 'number',
                        label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                        name: value1['attribute_name'],
                        placeholder: '请先选择主机标签地址!',
                        validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].min(1)],
                        styles: {
                            'width': '400px'
                        }
                    };
                }
                else if (value1['type'] === 'single_ip_tag') {
                    // const options$ = this.formThird1Project.value['ip_tag'] || [];
                    var options$ = [];
                    _this.formThird3[key1] = {
                        type: 'select',
                        label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                        name: value1['attribute_name'],
                        options: options$,
                        placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
                            value1['description']['zh'] : value1['attribute_name'],
                        validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required],
                        styles: {
                            'width': '400px'
                        },
                    };
                }
            });
            this.formThird3Project.setConfig(this.formThird3);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](this.formThird2Radios, function (value, key) {
                if (value.defaultValue === 'true') {
                    _this.formThird4Project.setConfig(_this.formThird4);
                }
                else {
                    _this.formThird4Project.setConfig([]);
                }
            });
        }
    };
    AppDeployComponent.prototype.getOperateMode = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiService + '/apiService/services/' + _this.serviceId).subscribe(function (data) {
                // this.operateMode['standalone'] = data['standalone_config'];
                // todo next
                // this.operateMode['replication'] = data['replication_config'];
                // this.operateMode['cluster'] = data['cluster_config'];
                // todo next
                _this.operateMode['replication'] = data['replication_config'];
                resolve();
            });
        });
    };
    AppDeployComponent.prototype.getConfigFile = function () {
    };
    AppDeployComponent.prototype.getCluster = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].forkJoin(_this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiApp + '/apiApp/cluster-zones/test/clusters'), _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiApp + '/apiApp/cluster-zones/product/clusters'));
            url$.subscribe(function (values) {
                _this.testCluster = values[0];
                _this.prodCluster = values[1];
                _this.networkRadioValue = values[1][0]['name'];
                _this.networkRadioValue2 = values[0][0]['name'];
                resolve();
            });
        });
    };
    AppDeployComponent.prototype.getEnvFile = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiConfig + '/configCenter/' + _this.servicesService.getCookie('groupID') + '/env-files').subscribe(function (data) {
                // this.envFormConfig = []
                var dataValue = [];
                __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](data, function (value, key) {
                    dataValue[key] = value['name'];
                });
                _this.envFormConfig = [
                    {
                        type: 'select',
                        label: '环境变量文件',
                        placeholder: '请选择环境变量文件',
                        options: dataValue,
                        name: 'envconfig',
                        validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required],
                        styles: {
                            'width': '400px'
                        }
                    }
                ];
                resolve();
            });
        });
    };
    AppDeployComponent.prototype.getnetworkAdvanced = function () {
        var _this = this;
        this.loadBanlancerForm = this.fb.group({});
        this.env1Form = this.fb.group({});
        // for (let i = 0; i < 5; i++) {
        //     this.lbControlArray.push({ index: i, show: i < 6 });
        //     // this.loadBanlancerForm.addControl(`field${i}`, new FormControl());
        // }
        this.lbControlLabel = [
            {
                value: '监听端口'
            },
            {
                value: '容器端口'
            },
            {
                value: '协议'
            },
            {
                value: '地址'
            },
            {
                value: '证书'
            },
        ];
        this.lbControlArray = [
            {
                type: 'input',
                inputType: 'number',
                placeholder: '1~65535',
                name: 'listener_port',
                defaultValue: 88
            },
            {
                type: 'select',
                name: 'container_port',
                placeholder: '容器暴露端口',
                options: [80],
                selectedOption: undefined
                // disabled:
            },
            {
                type: 'select',
                name: 'protocol',
                placeholder: '协议',
                options: ['tcp'],
                selectedOption: undefined
                // disabled:
            },
            {
                type: 'input',
                placeholder: '回车或空格确定',
                name: 'input1',
                disabled: true
            },
            {
                type: 'select',
                name: 'select1',
                // placeholder: 'select1213',
                options: [],
                // selectedOption: undefined,
                disabled: true
                // disabled:
            },
        ];
        this.env1 = [
            {
                value: '名称'
            },
            {
                value: '值'
            },
        ];
        this.env1Array = [
            {
                type: 'input',
                // placeholder: '1~65535',
                name: 'key'
            },
            {
                type: 'input',
                // placeholder: '1~65535',
                name: 'value'
            },
        ];
        this.testOptions = [
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'disabled', label: 'Disabled', disabled: true }
        ];
        // this.testSelectedOption = undefined;
        __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](this.lbControlArray, function (value1, key1) {
            _this.loadBanlancerForm.addControl(value1['name'], new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]());
            if (value1['type'] === 'select') {
                value1['selectedOption'] = value1['options'][0];
            }
        });
        __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](this.env1Array, function (value2, key2) {
            _this.env1Form.addControl(value2['name'], new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormControl */]());
        });
        this.serviceAdvancedLabel = [
            {
                value: '文件路径'
            }
        ];
    };
    AppDeployComponent.prototype.getImgAdvanced = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiConfig + '/configCenter/' + _this.servicesService.getCookie('groupID') + '/configs').subscribe(function (data) {
                console.log('配置文件', data);
                _this.configFileArr1 = data;
                _this.configFileArr = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](data, function (value, key) {
                    return value['configName'];
                });
                var config = {
                    type: 'select',
                    label: '配置',
                    placeholder: '请选择配置文件',
                    options: _this.configFileArr,
                    name: 'name',
                    // validation: [Validators.required],
                    styles: {
                        'width': '400px'
                    },
                    notNecessary: true,
                    valueUpdate: true
                };
                _this.configFileForm.setValue('name', config);
                resolve();
                console.log(_this.configFileArr);
            });
        });
    };
    AppDeployComponent.prototype.getServiceDepend = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].forkJoin(
            // _.map(_.sortBy(this.serviceTabs), (value, key) => {
            //   return this.http.get(environment.apiService + '/apiService/groups/' + this.servicesService.getCookie('groupID') + '/services/'
            //    + value + '/instances')
            // })
            _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiService + '/apiService/groups/' + _this.servicesService.getCookie('groupID') + '/service-instances'));
            url$.subscribe(function (values) {
                console.log('一次数据的values', values[0]);
                _this.formThird5Map = values[0];
                __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](values[0], function (value, key) {
                    if (value['serviceName'] === 'mysql') {
                        _this.mysqlOption[key] = value['instanceName'];
                        // console.log(this.mysqlOption);
                    }
                    else if (value['serviceName'] === 'redis') {
                        _this.redisOption[key] = value['instanceName'];
                        // console.log(this.redisOption);
                    }
                    else {
                        _this.zookeeperOption[key] = value['instanceName'];
                        // console.log(this.zookeeperOption);
                    }
                });
                // this.mysqlOption = _.compact(this.mysqlOption);
                // this.redisOption = _.compact(this.redisOption);
                // this.zookeeperOption = _.compact(this.zookeeperOption);
                _this.formThird5[0]['options'] = __WEBPACK_IMPORTED_MODULE_6_lodash__["compact"](_this.mysqlOption);
                _this.formThird5[1]['options'] = __WEBPACK_IMPORTED_MODULE_6_lodash__["compact"](_this.redisOption);
                _this.formThird5[2]['options'] = __WEBPACK_IMPORTED_MODULE_6_lodash__["compact"](_this.zookeeperOption);
                if (_this.formThird5[0]['options'].length === 0) {
                    _this.formThird5[0]['divStyles'] = {
                        'display': 'none'
                    };
                    _this.formThird5[0]['validation'] = [];
                }
                if (_this.formThird5[1]['options'].length === 0) {
                    _this.formThird5[1]['divStyles'] = {
                        'display': 'none'
                    };
                    _this.formThird5[0]['validation'] = [];
                }
                if (_this.formThird5[2]['options'].length === 0) {
                    _this.formThird5[2]['divStyles'] = {
                        'display': 'none'
                    };
                    _this.formThird5[0]['validation'] = [];
                }
                _this.formThird5Project.setConfig(_this.formThird5);
                resolve();
                console.log('formThird5', _this.formThird5);
            });
        });
    };
    AppDeployComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.getnetworkAdvanced();
                        return [4 /*yield*/, this.getImgAdvanced()];
                    case 1:
                        _a.sent();
                        this.appId = this.routeInfo.snapshot.params['appId'];
                        // this.getServiceVersion();
                        // this.toggleButton();
                        return [4 /*yield*/, this.getServiceInit()];
                    case 2:
                        // this.getServiceVersion();
                        // this.toggleButton();
                        _a.sent();
                        return [4 /*yield*/, this.getServiceDepend()];
                    case 3:
                        _a.sent();
                        console.log('依赖的服务', this.serviceTabs);
                        // await this.getOperateMode();
                        // if (this.choosedServiceName === 'redis') {
                        //   await this.getOperateMode();
                        //   _.map(this.operateMode['replication'], (value1, key1) => {
                        //     if (value1['type'] === 'int') {
                        //       this.formThird3[key1] = {
                        //         type: 'input',
                        //         inputType: 'number',
                        //         label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                        //         name: value1['attribute_name'],
                        //         placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
                        //           value1['description']['zh'] : value1['attribute_name'],
                        //         validation: [Validators.required, Validators.min(1)],
                        //         styles: {
                        //           'width': '400px'
                        //         }
                        //       };
                        //     } else if (value1['type'] === 'single_ip_tag') {
                        //       // const options$ = this.formThird1Project.value['ip_tag'] || [];
                        //       const options$ = [];
                        //       // const options$ = ['11', '22'];
                        //       this.formThird3[key1] = {
                        //         type: 'select',
                        //         label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                        //         name: value1['attribute_name'],
                        //         options: options$,
                        //         placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
                        //           value1['description']['zh'] : value1['attribute_name'],
                        //         validation: [Validators.required],
                        //         styles: {
                        //           'width': '400px'
                        //         },
                        //       };
                        //     }
                        //   });
                        //   this.formThird3Project.setConfig(this.formThird3);
                        // }
                        // 这里要手动调用一下，渲染service的basic和advanced配置，不然到服务配置会出不来数据
                        return [4 /*yield*/, this.getCluster()];
                    case 4:
                        // await this.getOperateMode();
                        // if (this.choosedServiceName === 'redis') {
                        //   await this.getOperateMode();
                        //   _.map(this.operateMode['replication'], (value1, key1) => {
                        //     if (value1['type'] === 'int') {
                        //       this.formThird3[key1] = {
                        //         type: 'input',
                        //         inputType: 'number',
                        //         label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                        //         name: value1['attribute_name'],
                        //         placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
                        //           value1['description']['zh'] : value1['attribute_name'],
                        //         validation: [Validators.required, Validators.min(1)],
                        //         styles: {
                        //           'width': '400px'
                        //         }
                        //       };
                        //     } else if (value1['type'] === 'single_ip_tag') {
                        //       // const options$ = this.formThird1Project.value['ip_tag'] || [];
                        //       const options$ = [];
                        //       // const options$ = ['11', '22'];
                        //       this.formThird3[key1] = {
                        //         type: 'select',
                        //         label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                        //         name: value1['attribute_name'],
                        //         options: options$,
                        //         placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
                        //           value1['description']['zh'] : value1['attribute_name'],
                        //         validation: [Validators.required],
                        //         styles: {
                        //           'width': '400px'
                        //         },
                        //       };
                        //     }
                        //   });
                        //   this.formThird3Project.setConfig(this.formThird3);
                        // }
                        // 这里要手动调用一下，渲染service的basic和advanced配置，不然到服务配置会出不来数据
                        _a.sent();
                        return [4 /*yield*/, this.getIpTag()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.choosedImageFunc(this.imageTabs[0])];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.choosedServiceFunc(this.serviceTabs[0])];
                    case 7:
                        _a.sent();
                        this.selectValueSub = this.componentSer.componentValue$.subscribe(function (value) {
                            // const selectConfig = {
                            //   // selectedOption: undefined,
                            //   // ifTags: 'true',
                            //   type: 'select',
                            //   label: 'Favourite2 Food',
                            //   name: 'food2',
                            //   options: value,
                            //   placeholder: 'Select an option',
                            //   validation: [Validators.required],
                            //   styles: {
                            //     'width': '400px',
                            //   },
                            // };
                            // const formConfig3 = [];
                            if (value !== undefined && __WEBPACK_IMPORTED_MODULE_6_lodash__["indexOf"](_this.ipTag$, value) >= 0) {
                                __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](_this.formThird3, function (value3, key3) {
                                    console.log(value3);
                                    // formConfig3[key3] = value3;
                                    if (value3['type'] === 'select') {
                                        _this.formThird3[key3] = {
                                            type: 'select',
                                            label: value3['label'],
                                            name: value3['name'],
                                            options: value,
                                            placeholder: value3['placeholder'],
                                            validation: [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* Validators */].required],
                                            styles: {
                                                'width': '400px'
                                            },
                                        };
                                    }
                                });
                                console.log(_this.formThird3);
                                _this.formThird3Project.setConfig(_this.formThird3);
                            }
                        });
                        this.configFileSub = this.componentSer.componentValue$.subscribe(function (value) {
                            console.log(_this.configFileArr1);
                            if (value !== undefined && __WEBPACK_IMPORTED_MODULE_6_lodash__["indexOf"](_this.configFileArr, value) >= 0) {
                                __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](_this.configFileArr1, function (value1, key1) {
                                    if (value1['configName'] === value) {
                                        value = value1['id'];
                                    }
                                });
                                var configKeyValue_1;
                                // promise async await 不用生命函数，可以直接new Promise，然后promise.then链式调用，
                                // 解决异步调用的问题
                                var asyncHttp = new Promise(function (resolve, reject) {
                                    // 这里报错 todo next
                                    _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiConfig + '/configCenter/' + _this.servicesService.getCookie('groupID') +
                                        '/configs/' + value).subscribe(function (data1) {
                                        console.log('配置键', data1);
                                        configKeyValue_1 = data1;
                                        resolve(configKeyValue_1);
                                    });
                                    // resolve('56b98ee1-0aed-45c7-bc3c-1838ed5138b1');
                                });
                                asyncHttp.then(function (Httpvalue) {
                                    _this.configKeyValueArr = Httpvalue;
                                    console.log('httpValue', Httpvalue);
                                    configKeyValue_1 = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](Httpvalue, function (value2, key2) {
                                        return value2['key'];
                                    });
                                    var configKey = {
                                        type: 'select',
                                        label: '键',
                                        placeholder: '请选择键值',
                                        options: configKeyValue_1,
                                        name: 'key',
                                        // validation: [Validators.required],
                                        styles: {
                                            'width': '400px'
                                        },
                                        notNecessary: true
                                    };
                                    _this.configFileForm.setValue('key', configKey);
                                });
                            }
                        });
                        // 这里后面新加的需要await的数据请求，需要加到后面，不然会报错controls undefined
                        // todo next 环境变量文件
                        // await this.getEnvFile();
                        // this.envFormProject1.setConfig(this.envFormConfig);
                        console.log('测试服务Init', this.imageTabs, this.images, this.services, this.serviceTabs);
                        return [2 /*return*/];
                }
            });
        });
    };
    AppDeployComponent.prototype.ngAfterViewInit = function () {
        // 不同的表单，但是确实同一个实例，这个要怎么解决呢？todo//
        // <dynamic-form #form1></dynamic-form>
        // <dynamic-form #form2></dynamic-form>
        // @ViewChild('form1') form1: DynamicFormComponent;
        // @ViewChild('form2') form2: DynamicFormComponent;
        console.log('form111', this.formFirstProject);
        console.log('form222', this.formSecondProject);
        // console.log('form333', this.formThirdProject);
        console.log('instance2', this.instanceSecond);
        console.log('instance3', this.instanceThird);
        // console.log('form111', this.formFirstProject);
    };
    AppDeployComponent.prototype.ngDoCheck = function () {
        // if (this.formThirdProject['value'] !== undefined) {
        //   console.log(this.formThirdProject['value']);
        // }
        // var test = this.formThirdProject;
        // console.log('监测第三个表单Docheck', this.formThirdProject);
        // var ipTagCount = this.formThirdProject;
        // if (ipTagCount) {
        //   this.formThird[3].validation = [
        //     Validators.required, Validators.minLength(ipTagCount)
        //   ]
        // }
    };
    AppDeployComponent.prototype.ngOnChanges = function () {
        // console.log('监测第三个表单OnChanges', this.formThirdProject);
        console.log('OnChanges');
    };
    AppDeployComponent.prototype.ngAfterContentInit = function () {
        // console.log('AfterContentInit'); 
    };
    AppDeployComponent.prototype.ngAfterContentChecked = function () {
        // console.log('AfterContentChecked'); 
    };
    AppDeployComponent.prototype.ngAfterViewChecked = function () {
        // todo 这里需要规定主机标签的数量限制，不好解决
        // console.log('AfterViewChecked');
        // if (this.formThirdProject.value['instancesCount']) {
        //   this.instancesCount$ = this.formThirdProject.value['instancesCount'];
        //   // todo这里修改placeholder是可以的，但是修改validation却不行
        //   this.formThird[3].placeholder = this.instancesCount$ + 's';
        //   this.formThird[3].validation = [
        //     Validators.required, Validators.minLength(this.instancesCount$)
        //   ];
        //   console.log('这是instanceConut', this.formThirdProject.value['instancesCount']);
        //   console.log('这是formThird3', this.formThird[3]);
        //   this.formThirdProject.setValue('ip_tag', this.formThird[3]);
        // }
        // console.log('formThird', this.formThird);
        // console.log('监测第三个表单Docheck', this.formThirdProject.value['instancesCount']);
    };
    AppDeployComponent.prototype.ngOnDestroy = function () {
        // console.log('OnDestroy');
    };
    return AppDeployComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formFirstProject'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _a || Object)
], AppDeployComponent.prototype, "formFirstProject", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formSecondProject'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _b || Object)
], AppDeployComponent.prototype, "formSecondProject", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('instanceSecond'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_9__container_instance_container_instance_component__["a" /* ContainerInstanceComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__container_instance_container_instance_component__["a" /* ContainerInstanceComponent */]) === "function" && _c || Object)
], AppDeployComponent.prototype, "instanceSecond", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formImgNetworkProject'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _d || Object)
], AppDeployComponent.prototype, "formImgNetworkProject", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('logFormProject1'),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _e || Object)
], AppDeployComponent.prototype, "logFormProject1", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('envFormProject1'),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _f || Object)
], AppDeployComponent.prototype, "envFormProject1", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('configFileForm'),
    __metadata("design:type", typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _g || Object)
], AppDeployComponent.prototype, "configFileForm", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formThirdProject'),
    __metadata("design:type", typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _h || Object)
], AppDeployComponent.prototype, "formThirdProject", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('instanceThird'),
    __metadata("design:type", typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_9__container_instance_container_instance_component__["a" /* ContainerInstanceComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__container_instance_container_instance_component__["a" /* ContainerInstanceComponent */]) === "function" && _j || Object)
], AppDeployComponent.prototype, "instanceThird", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formThird1Project'),
    __metadata("design:type", typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _k || Object)
], AppDeployComponent.prototype, "formThird1Project", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formThird2Project'),
    __metadata("design:type", typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _l || Object)
], AppDeployComponent.prototype, "formThird2Project", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formThird3Project'),
    __metadata("design:type", typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _m || Object)
], AppDeployComponent.prototype, "formThird3Project", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formThird4Project'),
    __metadata("design:type", typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _o || Object)
], AppDeployComponent.prototype, "formThird4Project", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formThird5Project'),
    __metadata("design:type", typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _p || Object)
], AppDeployComponent.prototype, "formThird5Project", void 0);
AppDeployComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-app-deploy',
        template: __webpack_require__("../../../../../src/app/app-deploy/app-deploy.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-deploy/app-deploy.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */]) === "function" && _q || Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _r || Object, typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["c" /* NzModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["c" /* NzModalService */]) === "function" && _s || Object, typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["b" /* NzMessageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["b" /* NzMessageService */]) === "function" && _t || Object, typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClient */]) === "function" && _u || Object, typeof (_v = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _v || Object, typeof (_w = typeof __WEBPACK_IMPORTED_MODULE_10__dynamic_form_services_component_service_service__["a" /* ComponentServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__dynamic_form_services_component_service_service__["a" /* ComponentServiceService */]) === "function" && _w || Object, typeof (_x = typeof __WEBPACK_IMPORTED_MODULE_11__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__shared_services_service__["a" /* ServicesService */]) === "function" && _x || Object])
], AppDeployComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
//# sourceMappingURL=app-deploy.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-detail/app-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".app-detail-img{\n    width: 100px;\n    height: 100px;\n}\n.app-detail-title{\n    font-size: 20px;\n}\n.app-detail-status{\n    float: right;\n    margin-right: 50px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-detail/app-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<app-repository-detail></app-repository-detail>"

/***/ }),

/***/ "../../../../../src/app/app-detail/app-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppDetailComponent = (function () {
    function AppDetailComponent(routeInfo) {
        this.routeInfo = routeInfo;
        // 标签名
        this.title = '应用商城';
    }
    AppDetailComponent.prototype.ngOnInit = function () {
        this.appName = this.routeInfo.snapshot.params['appName'];
    };
    return AppDetailComponent;
}());
AppDetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-app-detail',
        template: __webpack_require__("../../../../../src/app/app-detail/app-detail.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-detail/app-detail.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object])
], AppDetailComponent);

var _a;
//# sourceMappingURL=app-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-instance-detail-detail/app-instance-detail-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".service-detail-wrapper{\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.link-back{\n  margin-top: 35px;\n  margin-bottom: 20px;\n}\n.detail-img{\n  width: 100px;\n}\n.detail-title{\n  margin-left: 25px;\n  font-size: 20px;\n}\n.detail-img-wrapper .img-block{\n  display: table-cell;\n  vertical-align: middle;\n}\n.detail-desc-wrapper{\n  margin: 20px 0;\n  border: solid 1px #e4e4e4;\n}\n.detail-btn-group{\n\n}\n.detail-noraml-btn{\n  color: #2c9cfa;\n  margin-left: 6px;\n}\n.detail-content-wrapper, .detail-package-wrapper{\n  margin: 15px 0 30px 0;\n  background-color: #F8F9F9;\n  padding: 10px;\n}\n.detail-content, .detail-package{\n  padding: 10px 0;\n}\n.detail-content-one{\n  border-right: 1px solid #DDD;\n}\n.detail-instance-wrapper{\n  margin: 15px 0 30px 0;\n}\n.detail-develop-wrapper{\n  margin: 15px 0 30px 0;\n  background-color: #F8F9F9;\n  padding: 35px 0 0 70px;\n}\n.detail-package-num{\n  color: #2C9CFA\n}\n.detail-h3{\n  padding-bottom: 10px;\n  border-bottom: solid 1px #ddd;\n}\n.detail-tab-div{\n  height: 100%;\n  width: 100%;\n  margin-top: 10px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-instance-detail-detail/app-instance-detail-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header [title]=\"title\"></app-header>\n<nz-content class=\"service-detail-wrapper\">\n  <div class=\"link-back\">\n    <a [routerLink]=\"['/appOverviewDetail' , instanceId]\">\n      <span class=\"glyphicon glyphicon-menu-left\"></span>\n      返回</a>\n  </div>\n  <div nz-row class=\"detail-img-wrapper\">\n    <div nz-col [nzSpan]=\"6\">\n      <div class=\"img-block\" *ngIf=\"instanceDetail\">\n        <p class=\"detail-title\">{{instanceDetail.microserviceName}}</p>\n      </div>\n    </div>\n  </div>\n\n  <div nz-row class=\"detail-content-wrapper\" *ngIf=\"instanceDetail\">\n    <div nz-col [nzSpan]=\"12\" class=\"detail-content-one\">\n\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          所在集群\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\" class=\"detail-package-num\">\n          {{instanceDetail.clusterName}}\n        </div>\n      </div>\n\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          状态\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n          {{instanceDetail.status }}\n        </div>\n      </div>\n\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          创建时间\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n          {{instanceDetail.createTime | date:'yyyy-MM-dd HH:mm:ss'}}\n        </div>\n      </div>\n\n    </div>\n\n\n    <div nz-col [nzSpan]=\"12\" class=\"detail-content-one\">\n\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          容器大小\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n          {{instanceDetail.cpuSize}} 核 {{instanceDetail.memSize}} MB\n        </div>\n      </div>\n\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          实例个数\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n          {{instanceDetail.podsCount}}\n        </div>\n      </div>\n\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          更新时间\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n          {{instanceDetail.updateTime ? (instanceDetail.updateTime | date:'yyyy-MM-dd HH:mm:ss') : '暂无更新'}}\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n\n  <div nz-row class=\"detail-content-wrapper\" style=\"background: none\" *ngIf=\"instanceDetail\">\n    <nz-tabset [nzTabPosition]=\"'top'\" [nzType]=\"'card'\">\n      <nz-tab *ngFor=\"let tab of tabs\">\n        <ng-template #nzTabHeading>\n          {{tab.name}}\n        </ng-template>\n        <div class=\"detail-tab-div\" *ngIf=\"tab.index === 1\">\n          <app-app-monitor  *ngIf=\"instanceDetailID\"\n                            [appId]=\"instanceDetailID\"\n                            [monitor_q]=\"monitor_q[0]\"\n                            [monitorName]=\"monitorName[0]\"\n          ></app-app-monitor>\n          <app-app-monitor  *ngIf=\"instanceDetailID\"\n                            [appId]=\"instanceDetailID\"\n                            [monitor_q]=\"monitor_q[1]\"\n                            [monitorName]=\"monitorName[1]\"\n          ></app-app-monitor>\n          <app-app-monitor  *ngIf=\"instanceDetailID\"\n                            [appId]=\"instanceDetailID\"\n                            [monitor_q]=\"monitor_q[2]\"\n                            [monitorName]=\"monitorName[2]\"\n          ></app-app-monitor>\n          <app-app-monitor  *ngIf=\"instanceDetailID\"\n                            [appId]=\"instanceDetailID\"\n                            [monitor_q]=\"monitor_q[3]\"\n                            [monitorName]=\"monitorName[3]\"\n          ></app-app-monitor>\n\n        </div>\n        <div class=\"detail-tab-div\" *ngIf=\"tab.index === 2\">\n          <div class=\"detail-instance-wrapper\" *ngIf=\"instanceDetail\">\n            <app-app-logs *ngIf=\"instanceDetailID\"\n                          [appId]=\"instanceDetailID\"\n                          [moduleName]=\"\"\n            ></app-app-logs>\n          </div>\n        </div>\n        <div class=\"detail-tab-div\" *ngIf=\"tab.index === 3\">\n          <div class=\"detail-instance-wrapper\" *ngIf=\"instanceDetail\">\n            <app-app-nztable [mirrorDetail]=\"instanceDetail\" [tableNum]=\"8\"\n                             [tableTitle]=\"table8Title\"></app-app-nztable>\n          </div>\n        </div>\n        <div class=\"detail-tab-div\" *ngIf=\"tab.index === 4\">\n          <div class=\"detail-instance-wrapper\" *ngIf=\"instanceDetail\">\n            <app-app-nztable [mirrorDetail]=\"instanceDetail\" [tableNum]=\"9\"\n                             [tableTitle]=\"table9Title\"></app-app-nztable>\n          </div>\n        </div>\n        <div class=\"detail-tab-div\" *ngIf=\"tab.index === 5\"></div>\n        <div class=\"detail-tab-div\" *ngIf=\"tab.index === 6\">\n          <div class=\"detail-instance-wrapper\" *ngIf=\"instanceDetail\">\n            <app-app-nztable [mirrorDetail]=\"instanceDetail\" [tableNum]=\"7\"\n                             [tableTitle]=\"table7Title\"></app-app-nztable>\n          </div>\n        </div>\n        <div class=\"detail-tab-div\" *ngIf=\"tab.index === 7\">\n          <div class=\"detail-instance-wrapper\" *ngIf=\"instanceDetail\">\n            <app-app-nztable [mirrorDetail]=\"instanceDetail\" [tableNum]=\"10\"\n                             [tableTitle]=\"table10Title\"></app-app-nztable>\n          </div>\n        </div>\n      </nz-tab>\n    </nz-tabset>\n  </div>\n\n</nz-content>\n"

/***/ }),

/***/ "../../../../../src/app/app-instance-detail-detail/app-instance-detail-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppInstanceDetailDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppInstanceDetailDetailComponent = (function () {
    function AppInstanceDetailDetailComponent(_notification, routeInfo, http) {
        var _this = this;
        this._notification = _notification;
        this.routeInfo = routeInfo;
        this.http = http;
        this.monitor_q = ['cpu.utilization', 'mem.utilization', 'net.bytes_sent.total', 'net.bytes_rcvd.total'];
        this.monitorName = ['CPU利用率', '内存利用率', '发送字节', '接收字节'];
        // 标签名
        this.title = '应用实例详情';
        this.tabs = [
            {
                index: 1,
                name: '监控'
            },
            {
                index: 2,
                name: '日志'
            },
            {
                index: 3,
                name: '服务地址'
            },
            {
                index: 4,
                name: '容器实例'
            },
            {
                index: 5,
                name: '环境变量'
            },
            {
                index: 6,
                name: '配置文件'
            },
            {
                index: 7,
                name: '存储卷'
            }
        ];
        // 配置中心表格
        this.table7Title = [
            {
                index: 1,
                name: '配置名称',
            },
            {
                index: 2,
                name: '键',
            },
            {
                index: 3,
                name: '值',
            }
        ];
        // 服务地址表格
        this.table8Title = [
            {
                index: 1,
                name: '服务IP',
            },
            {
                index: 2,
                name: '服务端口',
            },
            {
                index: 3,
                name: '服务domain',
            },
            {
                index: 4,
                name: '服务IP类型',
            },
            {
                index: 5,
                name: '服务协议',
            }
        ];
        // 容器实例表格
        this.table9Title = [
            {
                index: 1,
                name: '容器实例',
            },
            {
                index: 2,
                name: '主机IP',
            },
            {
                index: 3,
                name: '容器IP',
            },
            {
                index: 4,
                name: '开始时间',
            },
            {
                index: 5,
                name: '操作',
            }
        ];
        // 存储卷表格
        this.table10Title = [
            {
                index: 1,
                name: '存储卷名称',
            },
            {
                index: 2,
                name: '驱动类型',
            },
            {
                index: 3,
                name: '关联服务路径',
            }
        ];
        this.createNotification = function (type, title, content) {
            _this._notification.create(type, title, content);
        };
    }
    AppInstanceDetailDetailComponent.prototype.getServiceInstanceDetail = function (instanceDetailID) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiApp + '/apiApp' + '/application-instance-microservices/' + instanceDetailID).map(function (res) { return res.json(); });
    };
    AppInstanceDetailDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.instanceId = this.routeInfo.snapshot.params['instanceId'];
        this.instanceDetailID = this.routeInfo.snapshot.params['instanceDetailID'];
        console.log("instanceID: " + this.instanceId);
        console.log("instanceDetailID: " + this.instanceDetailID);
        // 订阅流
        this.getServiceInstanceDetail(this.instanceDetailID).subscribe(function (data) {
            _this.instanceDetail = data;
        }, function (err) {
            console.log(err._body);
            _this.createNotification('error', '获取实例详情失败', err._body);
        });
    };
    return AppInstanceDetailDetailComponent;
}());
AppInstanceDetailDetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-app-instance-detail-detail',
        template: __webpack_require__("../../../../../src/app/app-instance-detail-detail/app-instance-detail-detail.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-instance-detail-detail/app-instance-detail-detail.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _c || Object])
], AppInstanceDetailDetailComponent);

var _a, _b, _c;
//# sourceMappingURL=app-instance-detail-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-list/applist.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".custom-image img {\n    display: block;\n}\n\n.custom-card {\n    padding: 10px 16px;\n}\n\n.custom-card p {\n    color: #999;\n}\n\n.ant-card-body {\n    padding: 0;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-list/applist.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-toolbox row\">\n    <h2>` {{tabName}}`</h2>\n\n    <div class=\"col-md-4\">\n        <button nz-button [nzType]=\"'primary'\">添加</button>\n        <button nz-button [nzType]=\"'default'\" class=\"btn\">删除</button>\n    </div>\n    <div class=\"col-md-4\"></div>\n    <div class=\"col-md-4\">\n        <!--\n                <app-search></app-search>\n        -->\n        <div class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"按应用名称搜索...\" [formControl]=\"titleFilter\">\n            <span class=\"input-group-btn\">\n        <button class=\"btn btn-default\" type=\"button\">\n            <span class=\"glyphicon glyphicon-search\"></span>\n        </button>\n      </span>\n        </div><!-- /input-group -->\n    </div>\n</div>\n<div *ngFor=\"let app of applications | appFilter: 'title': keyword\">\n    <a [routerLink]=\"['/appStore', app.appId]\">\n        <nz-card class=\"col-md-4 col-sm-4 col-lg-4\">\n            <ng-template #body>\n                <div class=\"custom-image\">\n                    <img [src]=\"app.imgUrl\" alt=\"\" width=\"100%\"/>\n                </div>\n                <div class=\"custom-card\">\n                    <h4 class=\"pull-right\">{{app.isActive ? '正常':'下架'}}</h4>\n                    <h4>{{app.title}}</h4>\n                    <p>{{app.createTime | date:'yyyy-MM-dd HH:mm:ss'}}</p>\n                    <span class=\"glyphicon glyphicon-trash\"></span>\n                </div>\n            </ng-template>\n        </nz-card>\n    </a>\n</div>\n\n\n<!--\n<div *ngFor=\"let app of applications | appFilter: 'title': keyword\" class=\"col-md-4 col-sm-4 col-lg-4\">\n    <a [routerLink]=\"['/appStore', app.appId]\">\n        <div class=\"thumbnail\">\n            <img [src]=\"app.imgUrl\" alt=\"\">\n            <div class=\"caption\">\n                <h4 class=\"pull-right\">{{app.isActive ? '正常':'下架'}}</h4>\n                <h4>{{app.title}}</h4>\n                <p>{{app.createTime | date:'yyyy-MM-dd HH:mm:ss'}}</p>\n                <span class=\"glyphicon glyphicon-trash\"></span>\n            </div>\n        </div>\n    </a>\n</div>-->\n"

/***/ }),

/***/ "../../../../../src/app/app-list/applist.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplistComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_application_service__ = __webpack_require__("../../../../../src/app/shared/application.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ApplistComponent = (function () {
    function ApplistComponent(applicationService) {
        this.applicationService = applicationService;
        this.titleFilter = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]();
    }
    ApplistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.applications = this.applicationService.getApplications();
        this.titleFilter.valueChanges
            .debounceTime(500)
            .subscribe(function (value) { return _this.keyword = value; });
    };
    return ApplistComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ApplistComponent.prototype, "tabName", void 0);
ApplistComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-applist',
        template: __webpack_require__("../../../../../src/app/app-list/applist.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-list/applist.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_application_service__["a" /* ApplicationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_application_service__["a" /* ApplicationService */]) === "function" && _a || Object])
], ApplistComponent);

var _a;
//# sourceMappingURL=applist.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-logs/app-logs.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".opera-log-wrapper{\n  margin: 30px 50px;\n}\n.dashboard-resulet-wrapper{\n  max-height: 480px;\n  min-height: 450px;\n}\n.dashboard-resulet{\n  font-family: Monaco, \"DejaVu Sans Mono\", \"Liberation Mono\", monospace;\n  color: rgb(225, 230, 230);\n  font-size: 13px;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  overflow: auto;\n}\n.dashboard-li{\n  padding: 8px 8px 8px 32px;\n  background-color: #263238;\n  line-height: 20px;\n}\n.dashboard-li span{\n  margin-right: 4px;\n}\n.log-message{\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.log-path{\n  color: #efc241;\n}\n.log-instance{\n  color: #efc241;\n}\n.log-node{\n  color: #2dcbf6;\n}\n.log-cluster{\n  color: #72f08c;\n}\n.log-service{\n  color:#ff7c57;\n}\n.chart-style {\n  width: 100%;\n  height: 300px;\n}\n.echarts-wrapper{\n  border: 1px solid #E6E6E6;\n  margin-bottom: 20px;\n}\n.time-select{\n  width: 120px;\n  margin: 20px 0;\n}\n.group-name {\n  padding: 0 !important;\n  width: 33px !important;\n  border: none !important;\n  text-align: left !important;\n  margin-left: 28px;\n}\n.dashboard-header{\n  padding: 15px 32px;\n  font-size: 14px;\n  font-weight: bold;\n  color:#fff;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #E6E6E6;\n}\n.HolyGrail {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 100vh;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.dashboard-resulet-wrapper{\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  background-color: rgb(38, 50, 56);\n  overflow: auto;\n}\n.log_page_wrapper{\n  margin-top:20px;\n}\n.log_page{\n  float:right;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-logs/app-logs.component.html":
/***/ (function(module, exports) {

module.exports = "<button nz-button [nzType]=\"'primary'\" style=\"margin-bottom: 15px;\" (click)=\"getConsoleData();\">\n  <i class=\"anticon anticon-retweet\"></i><span>刷新</span>\n</button>\n<div class=\"HolyGrail\">\n  <div class=\"dashboard-resulet-wrapper\" style=\"position: relative\">\n    <div class=\"dashboard-resulet\">\n      <p class=\"dashboard-header\">日志信息</p>\n      <ul>\n        <li class=\"dashboard-li\" *ngFor=\"let consoleData of consoleDatas\">\n          <span>{{consoleData.time * 1000 | date:'yyyy-MM-dd HH:mm:ss'}}</span>\n          <span class=\"log-service\">{{consoleData.service_name}}</span>\n          <span class=\"log-cluster\">{{consoleData.cluster_name}}</span>\n          <span class=\"log-node\">{{consoleData.nodes}}</span>\n          <span class=\"log-instance\">{{consoleData.instance_id}}</span>\n          <span class=\"log-path\">{{consoleData.paths}}</span>\n          <span class=\"log-message\">{{consoleData.message}}</span>\n        </li>\n      </ul>\n\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app-logs/app-logs.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppLogsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppLogsComponent = (function () {
    function AppLogsComponent(http, datePipe) {
        this.http = http;
        this.datePipe = datePipe;
        // 时间戳相关
        this.end_time = new Date().getTime(); // 结束时间是当前时间
        // 每页显示个数
        this.limit = 500;
    }
    AppLogsComponent.prototype.getConsoleData = function () {
        var _this = this;
        this.consoleDatas = [];
        this.http.get(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].apiApp + '/apiApp' + '/application-instance-microservices/' + '83129b4b-a859-4527-9d82-655857b873c4' + '/logs', {
            'params': {
                'end_time': this.end_time / 1000,
                // 开始时间是当前时间往前推 60480000(7天)
                'start_time': (this.end_time - 604800000) / 1000,
                'limit': this.limit,
            },
        }).subscribe(function (response) {
            if (response.json() && response.json()) {
                // 处理控制台数据
                _this.consoleDatas = response.json();
                console.log(_this.consoleDatas);
            }
        });
    };
    AppLogsComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('appId: ' + this.appId);
        // 延迟加载获取顶部表格数据
        setTimeout(function (_) {
            _this.getConsoleData();
        }, 0);
        /*  setInterval(()=>{
      
            this.getConsoleData()
      
          },5000);*/
    };
    return AppLogsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AppLogsComponent.prototype, "appId", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AppLogsComponent.prototype, "moduleName", void 0);
AppLogsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-app-logs',
        template: __webpack_require__("../../../../../src/app/app-logs/app-logs.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-logs/app-logs.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["DatePipe"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common__["DatePipe"]) === "function" && _b || Object])
], AppLogsComponent);

var _a, _b;
//# sourceMappingURL=app-logs.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-monitor/app-monitor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".opera-log-wrapper{\n  width: 100%;\n  height: 100%;\n}\n.chart-style {\n  width: 100%;\n  height: 300px;\n}\n.echarts-wrapper{\n  border: 1px solid #E6E6E6;\n  height: 350px;\n  width: 1800px;\n}\n.time-select{\n  width: 120px;\n  margin: 10px 0;\n}\n.group-name {\n  padding: 0 !important;\n  width: 33px !important;\n  border: none !important;\n  text-align: left !important;\n}\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-monitor/app-monitor.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"opera-log-wrapper\">\n  <div class=\"opera-log-selects\">\n    <br/>\n    <button nz-button class=\"group-name\"><span>时间</span> </button>\n\n    <nz-select class=\"time-select\"\n               [(ngModel)]=\"selectedOption\"\n               [nzPlaceHolder]=\"'choose option'\"\n               (nzOpenChange)=\"getChartData();\"\n    >\n      <nz-option\n        *ngFor=\"let option of options\"\n        [nzLabel]=\"option.label\"\n        [nzValue]=\"option\"\n        [nzDisabled]=\"option.disabled\">\n      </nz-option>\n    </nz-select>\n\n  </div>\n<!--\n    <div *ngIf=\"appId\" echarts [options]=\"logOptions\" [loading]=\"showloading\" class=\"chart-style\" (chartInit)=\"chartInit($event);\"></div>\n-->\n    <div *ngIf=\"appId\" echarts [options]=\"logOptions\" [loading]=\"showloading\" class=\"chart-style\"></div>\n\n</div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app-monitor/app-monitor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppMonitorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppMonitorComponent = (function () {
    function AppMonitorComponent(http, datePipe) {
        this.http = http;
        this.datePipe = datePipe;
        // 下拉选择框
        this.options = [];
        // 时间戳相关
        this.end = new Date().getTime(); // 结束时间是当前时间
        // get监控接口参数
        // private monitor_q = ['cpu.utilization','mem.utilization','net.bytes_sent.total','net.bytes_rcvd.total'];
        this.monitor_by = ['', 'instance_id'];
        // 图表颜色
        this.memColor = '#77d2a2';
        this.cpuColor = '#7ab6c7';
        this.diskColor = '#648a93';
        this.noUseColor = '#e4e9ea';
        this.pieColor = '#5d6a7c';
        this.barColor = '#8c8d8a';
        // locading
        this.showloading = true;
        this.xAxisData = [];
        this.yAxisData = [];
    }
    // 获取真实的表格数据
    AppMonitorComponent.prototype.getMonitorData = function (monitorData) {
        this.xAxisData = [];
        this.yAxisData = [];
        console.log('this.monitorData: ' + monitorData);
        for (var key in monitorData) {
            // 使用DatePipe格式化时间戳，需要*1000解决时间戳都是从1970年开始的问题
            this.xAxisData.push(this.datePipe.transform(parseInt(key) * 1000, 'yyyy-MM-dd HH:mm:ss'));
            this.yAxisData.push(monitorData[key]);
        }
        console.log('this.xAxisData: ' + this.xAxisData);
        console.log('this.yAxisData: ' + this.yAxisData);
        // 处理好数据后，加载chart，取消loading模式
        if (this.xAxisData.length > 0) {
            this.getMonitorOption();
            this.showloading = false;
        }
    };
    AppMonitorComponent.prototype.getMonitorOption = function () {
        this.logOptions = {
            title: {
                text: this.monitorName
            },
            color: ['#5294CA'],
            /* legend: {
                 data: ['bar'],
                 align: 'left'
             },*/
            tooltip: {},
            xAxis: {
                data: this.xAxisData,
                silent: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {},
            series: [{
                    name: this.monitorName,
                    type: 'line',
                    data: this.yAxisData,
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        };
    };
    AppMonitorComponent.prototype.getChartData = function () {
        var _this = this;
        console.log('selectedOption: ' + this.selectedOption.value);
        this.http.get(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].apiApp + '/apiApp' + '/application-instance-microservices/' + this.appId + '/monitors', {
            'params': {
                'end': (this.end / 1000).toFixed(),
                // 开始时间是当前时间往前推 选中的间隔时间
                'start': ((this.end - this.selectedOption.value) / 1000).toFixed(),
                'q': this.monitor_q
            },
        }).subscribe(function (response) {
            console.log('这是response', response.json());
            if (response.json().length > 0) {
                console.log('这是dps', response.json()[0].dps);
                _this.chartData = response.json()[0].dps;
                // 处理日志数据，分离time和count
                _this.getMonitorData(_this.chartData);
            }
        });
    };
    AppMonitorComponent.prototype.chartInit = function (ec) {
        console.log("ec: " + ec);
        ec.setOption(this.logOptions);
    };
    AppMonitorComponent.prototype.ngOnInit = function () {
        var _this = this;
        // console.log('appId: ' + this.appId);
        // console.log('monitorName: ' + this.monitorName);
        // console.log('monitor_q: ' + this.monitor_q);
        // 加载选择器的内容
        this.options = [
            { value: 1800000, label: '最近三十分钟' },
            { value: 3600000, label: '最近一小时' },
            { value: 21600000, label: '最近6小时' },
            { value: 43200000, label: '最近12小时' },
            { value: 86400000, label: '最近1天' },
            { value: 172800000, label: '最近2天' },
            { value: 259200000, label: '最近3天' }
        ];
        // 默认值为最近三十分钟
        this.selectedOption = this.options[0];
        // 延迟加载获取顶部表格数据
        setTimeout(function (_) {
            _this.getChartData();
        }, 0);
    };
    return AppMonitorComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AppMonitorComponent.prototype, "appId", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AppMonitorComponent.prototype, "monitor_q", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], AppMonitorComponent.prototype, "monitorName", void 0);
AppMonitorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-app-monitor',
        template: __webpack_require__("../../../../../src/app/app-monitor/app-monitor.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-monitor/app-monitor.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["DatePipe"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common__["DatePipe"]) === "function" && _b || Object])
], AppMonitorComponent);

var _a, _b;
//# sourceMappingURL=app-monitor.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-nztable/app-nztable.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".dataStatus {\n  color: #fff;\n  margin-right: 25px;\n  padding: 1px 0;\n  text-align: center;\n  border-radius: 10px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-nztable/app-nztable.component.html":
/***/ (function(module, exports) {

module.exports = "<nz-table #nzTable\n          [nzAjaxData]=\"_dataSet\"\n          [nzLoading]=\"_loading\"\n          [nzIsPagination]=\"false\"\n          [nzShowSizeChanger]=\"false\"\n>\n  <thead nz-thead>\n  <tr>\n    <th nz-th *ngFor=\"let title of tableTitle\">\n      <span>{{title.name}}</span>\n    </th>\n  </tr>\n  </thead>\n  <!--镜像列表-->\n  <tbody nz-tbody *ngIf=\"tableNum === 1 && nzTable.data.repositories\">\n  <tr nz-tbody-tr *ngFor=\"let data of nzTable.data.repositories\">\n    <td nz-td>{{data.repositoryName}}</td>\n    <td nz-td>{{data.version}}</td>\n    <td nz-td>{{data.createTime | date:'yyyy-MM-dd HH:mm:ss'}}</td>\n  </tr>\n  </tbody>\n  <tbody nz-tbody *ngIf=\"tableNum === 2\">\n  <tr nz-tbody-tr *ngFor=\"let data of nzTable.data\">\n    <td nz-td>\n      <a [routerLink]=\"['/appOverviewDetail', data.id]\">\n        {{data.instanceName}}\n      </a>\n    </td>\n    <td nz-td>{{data.groupId}}</td>\n    <td nz-td>{{data.cpuSize}}核 {{data.memSize}}M</td>\n    <td nz-td>{{data.instancesCount}} 个</td>\n    <td nz-td>{{data.createTime | date:'yyyy-MM-dd HH:mm:ss'}}</td>\n  </tr>\n  <!--服务目录中已订购实例的表格-->\n  <tbody nz-tbody *ngIf=\"tableNum === 3\">\n  <tr nz-tbody-tr *ngFor=\"let data of nzTable.data\">\n    <td nz-td>\n      <!--<a [routerLink]=\"['/appOverviewDetail', data.id]\">\n        {{data.instanceName}}\n      </a>-->\n      {{data.instanceName}}\n    </td>\n    <td nz-td>{{data.clusterName}}</td>\n    <td nz-td>///</td>\n    <td nz-td>\n      <p [style.background-color]=\"data.status==='Running' ? '#67c281' : '#ff9933'\"\n         class=\"dataStatus\">\n        {{data.status}}\n      </p>\n    </td>\n    <td nz-td>{{data.instancesCount}} 个</td>\n    <td nz-td>{{data.cpuSize}} 核 {{data.memSize}} M</td>\n    <td nz-td>\n      <a [routerLink]=\"['/serviceInstanceDetail', data.id]\">查看详情</a>\n    </td>\n  </tr>\n  </tbody>\n  <tbody nz-tbody *ngIf=\"tableNum === 4\">\n  <tr nz-tbody-tr *ngFor=\"let data of nzTable.data.info.services; let i=index\">\n    <td nz-td>\n      <a [routerLink]=\"['/appOverviewDetailDetail', nzTable.data.id , data.service_name]\">\n        {{data.service_name}}\n      </a>\n    </td>\n    <td nz-td>{{data.current_status}}</td>\n    <td nz-td>{{data.custom_instance_size.cpu}} 核 {{data.custom_instance_size.mem}} MB</td>\n    <td nz-td>{{data.healthy_num_instances? data.healthy_num_instances : 0}} 个</td>\n  </tr>\n  </tbody>\n\n  <!-- 服务实例 服务子实例列表  服务实例详情  容器实例表格 -->\n  <tbody nz-tbody *ngIf=\"tableNum === 5 && nzTable.data.instances\">\n  <tr nz-tbody-tr *ngFor=\"let data of nzTable.data.instances\">\n    <!--<td nz-td>\n      <a [routerLink]=\"['/appOverviewDetailDetail', nzTable.data.id , data.service_name]\">\n        {{data.service_name}}\n      </a>\n    </td>-->\n    <td nz-td>{{data.instance_name}}</td>\n    <td nz-td>{{data.host_ip}}</td>\n    <td nz-td>{{data.container_ip}}</td>\n    <td nz-td>{{data.started_at | date:'yyyy-MM-dd HH:mm:ss'}}</td>\n    <td nz-td>\n      <button nz-button [nzType]=\"'primary'\" disabled>\n        <span>重建</span>\n      </button>\n    </td>\n  </tr>\n  </tbody>\n\n  <!-- 配置中心表格 -->\n  <tbody nz-tbody *ngIf=\"tableNum === 6\">\n  <tr nz-tbody-tr *ngFor=\"let data of nzTable.data\">\n    <td nz-td>\n      <a [routerLink]=\"['/appOverviewDetailDetail', data.id]\">\n        {{data.configName}}\n      </a>\n    </td>\n<!--\n    <td nz-td>{{data.createUserId}}</td>\n-->\n    <td nz-td>{{data.createTime | date:'yyyy-MM-dd HH:mm:ss'}}</td>\n    <td nz-td>{{data.updateTime | date:'yyyy-MM-dd HH:mm:ss'}}</td>\n    <td nz-td>\n      <button nz-button [nzType]=\"'primary'\" (click)=\"showModal(data.id, data.configName);\">\n        <span>删除</span>\n      </button>\n    </td>\n  </tr>\n  </tbody>\n\n  <!-- 应用实例详情 配置文件表格 -->\n  <tbody nz-tbody *ngIf=\"tableNum === 7 && nzTable.data.microserviceConfigs\">\n  <tr nz-tbody-tr *ngFor=\"let data of nzTable.data.microserviceConfigs\">\n    <td nz-td>{{data.configName}}</td>\n    <td nz-td>{{data.key}}</td>\n    <td nz-td>{{data.value}}</td>\n  </tr>\n  </tbody>\n\n  <!-- 应用实例详情 服务地址表格 -->\n  <tbody nz-tbody *ngIf=\"tableNum === 8 && nzTable.data && nzTable.data.endpoints  && nzTable.data.endpoints.listener_port\">\n  <tr nz-tbody-tr >\n    <td nz-td>{{nzTable.data.endpoints.ip}}</td>\n    <td nz-td>{{nzTable.data.endpoints.listener_port}}</td>\n    <td nz-td>{{nzTable.data.endpoints.domains}}</td>\n    <td nz-td>{{nzTable.data.endpoints.ip_type}}</td>\n    <td nz-td>{{nzTable.data.endpoints.protocol}}</td>\n  </tr>\n  </tbody>\n\n  <!-- 应用实例详情 容器实例表格 -->\n  <tbody nz-tbody *ngIf=\"tableNum === 9 && nzTable.data.info && nzTable.data.info.instances\">\n  <tr nz-tbody-tr *ngFor=\"let data of nzTable.data.info.instances\">\n    <td nz-td>{{data.instance_name}}</td>\n    <td nz-td>{{data.host_ip}}</td>\n    <td nz-td>{{data.container_ip}}</td>\n    <td nz-td>{{data.started_at}}</td>\n    <td nz-td>\n      <button nz-button [nzType]=\"'primary'\" disabled>\n        <span>重建</span>\n      </button>\n    </td>\n  </tr>\n  </tbody>\n\n  <!-- 应用实例详情 存储卷表格 -->\n  <tbody nz-tbody *ngIf=\"tableNum === 10 && nzTable.data.info && nzTable.data.info.volumes\">\n  <tr nz-tbody-tr *ngFor=\"let data of nzTable.data.info.volumes\">\n    <td nz-td>{{data.volume_name}}</td>\n<!--\n    如果volume_id\": \"host_path\"，驱动类型是主机路径，不然取diriver——name\n-->\n    <td nz-td *ngIf='data.driver_name === \"\"'>主机路径</td>\n    <td nz-td *ngIf='data.driver_name !== \"\"'>{{data.driver_name}}</td>\n    <td nz-td>{{data.app_volume_dir}}</td>\n  </tr>\n  </tbody>\n\n</nz-table>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app-nztable/app-nztable.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppNztableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppNztableComponent = (function () {
    function AppNztableComponent(http, servicesService) {
        this.http = http;
        this.servicesService = servicesService;
        this._loading = true;
        this._dataSet = [];
    }
    AppNztableComponent.prototype.ngOnChanges = function (changes) {
        console.log('nztable change');
        this.refreshData();
    };
    AppNztableComponent.prototype.ngOnInit = function () {
        console.log("mirrorDetail: " + this.mirrorDetail);
        console.log("tableNum: " + this.tableNum);
        console.log("tableTitle: " + this.tableTitle);
    };
    AppNztableComponent.prototype.refreshData = function (reset) {
        if (reset === void 0) { reset = false; }
        this._loading = true;
        this._dataSet = this.mirrorDetail;
        console.log(this._dataSet);
        this._loading = false;
    };
    return AppNztableComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AppNztableComponent.prototype, "mirrorDetail", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AppNztableComponent.prototype, "tableNum", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AppNztableComponent.prototype, "tableTitle", void 0);
AppNztableComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-app-nztable',
        template: __webpack_require__("../../../../../src/app/app-nztable/app-nztable.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-nztable/app-nztable.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_service__["a" /* ServicesService */]) === "function" && _b || Object])
], AppNztableComponent);

var _a, _b;
//# sourceMappingURL=app-nztable.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-overview-detail-detail/app-overview-detail-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".service-detail-wrapper{\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.link-back{\n  margin-top: 35px;\n  margin-bottom: 20px;\n}\n.detail-img{\n  width: 100px;\n}\n.detail-title{\n  margin-left: 25px;\n  font-size: 20px;\n}\n.detail-img-wrapper .img-block{\n  display: table-cell;\n  vertical-align: middle;\n}\n.detail-desc-wrapper{\n  margin: 20px 0;\n  border: solid 1px #e4e4e4;\n}\n.detail-btn-group{\n\n}\n.detail-noraml-btn{\n  color: #2c9cfa;\n  margin-left: 6px;\n}\n.detail-content-wrapper, .detail-package-wrapper{\n  margin: 15px 0 30px 0;\n  background-color: #F8F9F9;\n  padding: 10px;\n}\n.detail-content, .detail-package{\n  padding: 10px 0;\n}\n.detail-content-one{\n  border-right: 1px solid #DDD;\n}\n.detail-instance-wrapper{\n  margin: 15px 0 30px 0;\n}\n.detail-develop-wrapper{\n  margin: 15px 0 30px 0;\n  background-color: #F8F9F9;\n  padding: 35px 0 0 70px;\n}\n.detail-package-num{\n  color: #2C9CFA\n}\n.detail-h3{\n  padding-bottom: 10px;\n  border-bottom: solid 1px #ddd;\n}\n.detail-tab-div{\n  height: 160px;\n  margin-top: 10px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-overview-detail-detail/app-overview-detail-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header [title]=\"title\"></app-header>\n<nz-content class=\"service-detail-wrapper\">\n  <div class=\"link-back\">\n    <a [routerLink]=\"['/serviceInstanceDetail' , instanceId]\">\n      <span class=\"glyphicon glyphicon-menu-left\"></span>\n      返回</a>\n  </div>\n  <div nz-row class=\"detail-img-wrapper\">\n    <div nz-col [nzSpan]=\"6\">\n      <div class=\"img-block\">\n        <img class=\"detail-img\" [src]=\"serviceImgUrl\" alt=\"\"/>\n      </div>\n      <div class=\"img-block\" *ngIf=\"moduleName\">\n        <p class=\"detail-title\">{{moduleName}}</p>\n      </div>\n    </div>\n  </div>\n\n  <div nz-row class=\"detail-content-wrapper\" *ngIf=\"instanceDetail\">\n    <div nz-col [nzSpan]=\"12\" class=\"detail-content-one\">\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          所在集群\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\" class=\"detail-package-num\">\n          {{instanceDetail.region_name}}\n        </div>\n      </div>\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          创建时间\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n          {{instanceDetail.created_at | date:'yyyy-MM-dd HH:mm:ss'}}\n        </div>\n      </div>\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          镜像版本\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\" class=\"detail-package-num\">\n          {{instanceDetail.image_tag}}\n        </div>\n      </div>\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          网络模式\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\" class=\"detail-package-num\">\n          {{instanceDetail.network_mode}}\n        </div>\n      </div>\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          弹性伸缩策略\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\" class=\"detail-package-num\">\n          {{instanceDetail.scaling_mode}}\n        </div>\n      </div>\n    </div>\n    <div nz-col [nzSpan]=\"12\">\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          容器大小\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n          {{instanceDetail.custom_instance_size.cpu}} 核 {{instanceDetail.custom_instance_size.mem}} MB\n        </div>\n      </div>\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          更新时间\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n          {{instanceDetail.updated_at | date:'yyyy-MM-dd HH:mm:ss'}}\n        </div>\n      </div>\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          执行命令\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n          {{instanceDetail.run_command ? instanceDetail.run_command:'默认'}}\n        </div>\n      </div>\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          主机标签\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n          {{instanceDetail.node_tag}}\n        </div>\n      </div>\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          所属子服务\n        </div>\n        <div *ngIf=\"instanceDetail\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n          {{instanceDetail.app_name}}\n        </div>\n      </div>\n    </div>\n  </div>\n  <div nz-row class=\"detail-content-wrapper\" style=\"background: none\" *ngIf=\"instanceDetail\">\n    <nz-tabset [nzTabPosition]=\"'top'\" [nzType]=\"'card'\">\n      <nz-tab *ngFor=\"let tab of tabs\">\n        <ng-template #nzTabHeading>\n          {{tab.name}}\n        </ng-template>\n        <div class=\"detail-tab-div\" *ngIf=\"tab.index === 1\"></div>\n        <div class=\"detail-tab-div\" *ngIf=\"tab.index === 2\">\n          <app-app-logs *ngIf=\"instanceDetailID\"\n                        [appId]=\"instanceDetailID\"\n                        [moduleName]=\"\"\n          ></app-app-logs>\n        </div>\n        <div class=\"detail-tab-div\" *ngIf=\"tab.index === 3\"></div>\n        <div class=\"detail-tab-div\" *ngIf=\"tab.index === 4\">\n          <div class=\"detail-instance-wrapper\" *ngIf=\"instanceDetail\">\n            <app-app-nztable [mirrorDetail]=\"instanceDetail\" [tableNum]=\"5\"\n                             [tableTitle]=\"table5Title\"></app-app-nztable>\n          </div>\n        </div>\n        <div class=\"detail-tab-div\" *ngIf=\"tab.index === 5\"></div>\n        <div class=\"detail-tab-div\" *ngIf=\"tab.index === 6\"></div>\n        <div class=\"detail-tab-div\" *ngIf=\"tab.index === 7\"></div>\n      </nz-tab>\n    </nz-tabset>\n  </div>\n</nz-content>\n"

/***/ }),

/***/ "../../../../../src/app/app-overview-detail-detail/app-overview-detail-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppOverviewDetailDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppOverviewDetailDetailComponent = (function () {
    function AppOverviewDetailDetailComponent(routeInfo, http) {
        this.routeInfo = routeInfo;
        this.http = http;
        // 标签名
        this.title = '服务实例详情';
        this.serviceImgUrl = 'assets/service/mirror.png';
        this.tabs = [
            {
                index: 1,
                name: '监控'
            },
            {
                index: 2,
                name: '日志'
            },
            {
                index: 3,
                name: '服务地址'
            },
            {
                index: 4,
                name: '容器实例'
            },
            {
                index: 5,
                name: '环境变量'
            },
            {
                index: 6,
                name: '配置文件'
            },
            {
                index: 7,
                name: '存储卷'
            }
        ];
        // 容器实例表格
        this.table5Title = [
            {
                index: 1,
                name: '实例',
            },
            {
                index: 3,
                name: 'IP地址',
            },
            {
                index: 4,
                name: '容器IP',
            },
            {
                index: 5,
                name: '创建时间',
            },
            {
                index: 6,
                name: '操作',
            }
        ];
    }
    AppOverviewDetailDetailComponent.prototype.getServiceInstanceDetail = function (instanceId, moduleName) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiService + '/apiService' + '/service-instances/' + instanceId + '/modules/' + moduleName).map(function (res) { return res.json(); });
    };
    AppOverviewDetailDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.instanceId = this.routeInfo.snapshot.params['instanceId'];
        this.moduleName = this.routeInfo.snapshot.params['moduleName'];
        console.log("instanceID: " + this.instanceId);
        console.log("moduleName: " + this.moduleName);
        // 订阅流
        this.getServiceInstanceDetail(this.instanceId, this.moduleName).subscribe(function (data) {
            _this.instanceDetail = data;
        });
    };
    return AppOverviewDetailDetailComponent;
}());
AppOverviewDetailDetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-app-overview-detail-detail',
        template: __webpack_require__("../../../../../src/app/app-overview-detail-detail/app-overview-detail-detail.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-overview-detail-detail/app-overview-detail-detail.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _b || Object])
], AppOverviewDetailDetailComponent);

var _a, _b;
//# sourceMappingURL=app-overview-detail-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-overview-detail/app-overview-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".mirror-store-wrapper{\n    padding-left: 30px;\n    padding-right: 100px;\n}\n.link-back{\n    margin-top: 35px;\n    margin-bottom: 20px;\n}\n.detail-img{\n    width: 100px;\n}\n.detail-title{\n    margin-left: 25px;\n    font-size: 28px;\n}\n.detail-img-wrapper .img-block{\n    display: table-cell;\n    vertical-align: middle;\n}\n.detail-desc-wrapper{\n    margin: 20px 0;\n    border: solid 1px #e4e4e4;\n}\n.detail-12col{\n    padding: 0px 40px 10px 40px;\n    border-right: 1px solid #E1EFDA;\n}\n.detail-line{\n    line-height: 40px;\n    padding-left: 20px;\n    background-color: #f8f9f8;\n}\n.detail-line span{\n    margin-right: 80px;\n}\n.detail-line-value{\n    color: #2C9CFA;\n}\n.detail-versions-wrapper a{\n    padding-right: 25px;\n}\n.first-line{\n    padding-top:10px !important;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-overview-detail/app-overview-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header [title]=\"title\"></app-header>\n<nz-content class=\"mirror-store-wrapper\">\n  <div class=\"link-back\">\n    <a [routerLink]=\"['/appOverview']\">\n      <span class=\"glyphicon glyphicon-menu-left\"></span>\n      返回</a>\n  </div>\n  <div class=\"detail-img-wrapper\">\n    <div class=\"img-block\">\n      <p class=\"detail-title\" *ngIf=\"appInstanceDetail\">{{appInstanceDetail.instanceName}}</p>\n    </div>\n  </div>\n  <div nz-row class=\"detail-desc-wrapper\">\n    <div nz-col [nzSpan]=\"12\" class=\"detail-12col first-line\">\n      <div class=\"detail-line\">\n        <span>应用版本</span>\n        <span class=\"detail-line-value\" *ngIf=\"appInstanceDetail && appInstanceDetail.app\">{{appInstanceDetail.app.version}}</span></div>\n    </div>\n    <div nz-col [nzSpan]=\"12\" class=\"detail-12col first-line\">\n      <div class=\"detail-line\">\n        <span>应用状态</span>\n        <span class=\"detail-line-value\" *ngIf=\"appInstanceDetail\">{{appInstanceDetail.status}}</span>\n      </div>\n    </div>\n    <div nz-col [nzSpan]=\"12\" class=\"detail-12col\">\n      <div class=\"detail-line\">\n        <span>创建时间</span>\n        <span class=\"detail-line-value\" *ngIf=\"appInstanceDetail\">{{appInstanceDetail.createTime | date:'yyyy-MM-dd HH:mm:ss'}}</span></div>\n    </div>\n    <div nz-col [nzSpan]=\"12\" class=\"detail-12col\">\n      <div class=\"detail-line\">\n        <span>更新时间</span>\n        <span class=\"detail-line-value\" *ngIf=\"appInstanceDetail\">\n<!--\n          {{appInstanceDetail.updateTime | date:'yyyy-MM-dd HH:mm:ss'}}\n-->\n           {{!appInstanceDetail.updateTime ? '暂无': appInstanceDetail.updateTime | date:'yyyy-MM-dd HH:mm:ss'}}\n        </span></div>\n    </div>\n\n    <div nz-col [nzSpan]=\"12\" class=\"detail-12col\">\n      <div class=\"detail-line\">\n        <span>所属域名</span>\n        <span class=\"detail-line-value\">B域</span></div>\n    </div>\n  </div>\n\n  <nz-tabset [nzTabPosition]=\"'top'\" [nzType]=\"'card'\" class=\"mirrorTab\">\n    <nz-tab *ngFor=\"let tab of tabs\" (nzClick)=\"changeTabName(tab.tabName)\">\n      <ng-template #nzTabHeading>\n        {{tab.name}}\n      </ng-template>\n      <nz-table #nzTable\n                [nzAjaxData]=\"_dataSet\"\n                [nzShowSizeChanger]=\"true\"\n                [nzShowTotal]=\"true\"\n                [nzLoading]=\"_loading\"\n                [nzTotal]=\"_total\"\n                [(nzPageIndex)]=\"_current\"\n                (nzPageIndexChange)=\"refreshData()\"\n                [(nzPageSize)]=\"_pageSize\"\n                (nzPageSizeChange)=\"refreshData(true)\">\n        <thead nz-thead>\n        <tr>\n          <th nz-th>\n            <span>实例名称</span>\n            <nz-table-sort [(nzValue)]=\"sortMap.microserviceName\"\n                           (nzValueChange)=\"sort('microserviceName', $event)\"></nz-table-sort>\n          </th>\n          <th nz-th>\n            <span>所属集群</span>\n            <nz-table-sort [(nzValue)]=\"sortMap.clusterName\"\n                           (nzValueChange)=\"sort('clusterName', $event)\"></nz-table-sort>\n          </th>\n          <th nz-th>\n            <span>镜像 | 服务名称</span>\n            <nz-table-sort [(nzValue)]=\"sortMap.repository\"\n                           (nzValueChange)=\"sort('repository', $event)\"></nz-table-sort>\n          </th>\n          <th nz-th>\n            <span>状态</span>\n            <nz-table-sort [(nzValue)]=\"sortMap.status\"\n                           (nzValueChange)=\"sort('status', $event)\"></nz-table-sort>\n          </th>\n          <th nz-th>\n            <span>容器数量</span>\n            <nz-table-sort [(nzValue)]=\"sortMap.podsCount\"\n                           (nzValueChange)=\"sort('podsCount', $event)\"></nz-table-sort>\n          </th>\n          <th nz-th>\n            <span>大小</span>\n            <nz-table-sort [(nzValue)]=\"sortMap.storageSize\"\n                           (nzValueChange)=\"sort('storageSize', $event)\"></nz-table-sort>\n          </th>\n        </tr>\n        </thead>\n        <tbody nz-tbody>\n        <tr nz-tbody-tr *ngFor=\"let data of nzTable.data  | appFilter: 'instanceName' : keyword\">\n          <td nz-td>\n            <a *ngIf=\"tabName === 'microservices'\"\n               [routerLink]=\"['/appInstanceDetailDetail', instanceId, data.id]\">\n              {{data.microserviceName ||data.instanceName}}\n            </a>\n            <a  *ngIf=\"tabName === 'serviceInstances'\"\n                [routerLink]=\"['/serviceInstanceDetail', data.id]\">\n              {{data.microserviceName ||data.instanceName}}\n            </a>\n          </td>\n          <td nz-td>{{data.clusterName}}</td>\n          <td nz-td>{{data.repository||data.serviceName}}</td>\n          <td nz-td>{{data.status}}</td>\n          <td nz-td>{{data.podsCount || data.instancesCount}}</td>\n          <td nz-td>{{data.cpuSize}}核 {{data.memSize}}M</td>\n        </tr>\n        </tbody>\n      </nz-table>\n    </nz-tab>\n  </nz-tabset>\n</nz-content>\n"

/***/ }),

/***/ "../../../../../src/app/app-overview-detail/app-overview-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppOverviewDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_random_user_service__ = __webpack_require__("../../../../../src/app/shared/random-user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppOverviewDetailComponent = (function () {
    function AppOverviewDetailComponent(_notification, _randomUser, routeInfo, http) {
        var _this = this;
        this._notification = _notification;
        this._randomUser = _randomUser;
        this.routeInfo = routeInfo;
        this.http = http;
        this.title = '应用详情';
        this.mirrorImgUrl = 'assets/service/mirror.png';
        this.mirrorName = 'product'; // 初始生产域对应的标签名称 cluster_name
        this.tabName = 'microservices';
        this.tabs = [
            {
                index: 1,
                name: '自身服务',
                tabName: 'microservices'
            },
            {
                index: 2,
                name: '依赖服务',
                tabName: 'serviceInstances'
            }
        ];
        this._current = 1;
        this._pageSize = 10;
        this._total = 1;
        this._loading = true;
        this.sortMap = {
            microserviceName: null,
            clusterName: null,
            repository: null,
            status: null,
            podsCount: null,
            storageSize: null
        };
        this._sortName = null;
        this._sortValue = null;
        this._dataSet = [];
        this.copyData = this._dataSet.slice();
        this.createNotification = function (type, title, content) {
            _this._notification.create(type, title, content);
        };
    }
    AppOverviewDetailComponent.prototype.changeTabName = function (tabName) {
        this.tabName = tabName;
        this.refreshData();
        console.log(this.tabName);
    };
    AppOverviewDetailComponent.prototype.sort = function (sortName, value) {
        var _this = this;
        this._sortName = sortName;
        this._sortValue = value;
        Object.keys(this.sortMap).forEach(function (key) {
            if (key !== sortName) {
                _this.sortMap[key] = null;
            }
            else {
                _this.sortMap[key] = value;
            }
        });
        this.refreshData();
    };
    AppOverviewDetailComponent.prototype.reset = function () {
        this.refreshData(true);
    };
    AppOverviewDetailComponent.prototype.refreshData = function (reset) {
        var _this = this;
        if (reset === void 0) { reset = false; }
        if (reset) {
            this._current = 1;
        }
        this._loading = true;
        this._randomUser.getAppInstanceDetailTable(this._current, this._pageSize, this._sortName, this._sortValue, this.instanceId).subscribe(function (data) {
            console.log(_this._current);
            console.log(_this._pageSize);
            console.log(_this._sortName);
            console.log(_this._sortValue);
            console.log(data);
            console.log(_this.tabName);
            console.log(data[_this.tabName]);
            _this._loading = false;
            _this._total = data[_this.tabName].length;
            _this._dataSet = data[_this.tabName];
            _this._dataSet = _this._dataSet.sort(function (a, b) {
                if (a[_this._sortName] > b[_this._sortName]) {
                    return (_this._sortValue === 'ascend') ? 1 : -1;
                }
                else if (a[_this._sortName] < b[_this._sortName]) {
                    return (_this._sortValue === 'ascend') ? -1 : 1;
                }
                else {
                    return 0;
                }
            }).slice();
            // this._dataSet = data.microservices;
        });
    };
    AppOverviewDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.instanceId = this.routeInfo.snapshot.params['instanceId'];
        this.refreshData();
        this._randomUser.getAppInstanceDetail(this.instanceId).subscribe(function (data) {
            _this.appInstanceDetail = data;
            console.log('appInstanceDetail: ' + _this.appInstanceDetail);
        }, function (err) {
            console.log(err._body);
            _this.createNotification('error', '获取应用详情失败', err._body);
        });
        console.log('instanceId: ' + this.instanceId);
        // 订阅流
        /*  this._randomUser.getAppInstanceDetail('201e4425-edc8-4008-b8b3-f2d1b0dbc760').subscribe((data) => {
              this.instanceDetail = data;
          });*/
    };
    return AppOverviewDetailComponent;
}());
AppOverviewDetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-app-overview-detail',
        template: __webpack_require__("../../../../../src/app/app-overview-detail/app-overview-detail.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-overview-detail/app-overview-detail.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_random_user_service__["a" /* RandomUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_random_user_service__["a" /* RandomUserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _d || Object])
], AppOverviewDetailComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=app-overview-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-overview/app-overview.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".overview-content-wrapper {\n  margin: 30px;\n}\n\n.app-overview-totals {\n  height: 135px;\n  padding: 30px;\n  margin: 30px 0;\n  border: solid 1px #e6e6e6;\n}\n\n.total-row {\n  height: 80px;\n}\n\n.total-box {\n  height: 80px;\n  background-color: #f9f9f8;\n  vertical-align: middle;\n  line-height:80px;\n}\n\n.appImg {\n  height: 40px;\n  width: 40px;\n  vertical-align: middle;\n  margin: auto 30px;\n}\n\n.app-total-span {\n  margin-right: 20px;\n  font-size: 14px;\n  vertical-align: middle;\n}\n\n.app-total-num {\n  font-size: 28px;\n  font-weight: bold;\n  vertical-align: middle;\n}\n\n.num-color1 {\n  color: rgb(50, 175, 130);\n}\n\n.num-color2 {\n  color: rgb(68, 186, 225);\n}\n\n.num-color3 {\n  color: rgb(250, 199, 110);\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-overview/app-overview.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-overview\">\n  <app-header [title]=\"title\"></app-header>\n  <app-group-select (groupidHandler)=\"groupidHandler($event)\"></app-group-select>\n\n  <nz-content class=\"overview-content-wrapper\">\n    <div class=\"app-overview-totals\">\n      <div nz-row [nzGutter]=\"30\">\n        <div nz-col class=\"total-row\" [nzSpan]=\"8\">\n          <div class=\"total-box\">\n            <img [src]=\"appImgUrl1\" alt=\"\" width=\"100%\" class=\"appImg\"/>\n            <span class=\"app-total-span\">应用总数</span>\n            <span class=\"app-total-num num-color1\" *ngIf=\"totals\">{{totals.appTotalNum ? totals.appTotalNum : 0}}</span>\n          </div>\n        </div>\n        <div nz-col class=\"total-row\" [nzSpan]=\"8\">\n          <div class=\"total-box\">\n            <img [src]=\"appImgUrl1\" alt=\"\" width=\"100%\" class=\"appImg\"/>\n            <span class=\"app-total-span\">容器个数</span>\n            <span class=\"app-total-num num-color2\"\n                  *ngIf=\"totals\">{{totals.dockerTotalNum ? totals.dockerTotalNum : 0}}</span>\n          </div>\n        </div>\n        <div nz-col class=\"total-row\" [nzSpan]=\"8\">\n          <div class=\"total-box\">\n            <img [src]=\"appImgUrl2\" alt=\"\" width=\"100%\" class=\"appImg\"/>\n            <span class=\"app-total-span\">项目个数</span>\n            <span class=\"app-total-num num-color3\" *ngIf=\"totals\">{{totals.projectTotalNum ? totals.projectTotalNum : 0}}</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <nz-tabset [nzTabPosition]=\"'top'\" [nzType]=\"'card'\" class=\"mirrorTab\">\n      <nz-tab *ngFor=\"let tab of tabs\" [nzDisabled]=\"tab.disabled\" (nzClick)=\"changeMirrorName(tab.tabName)\">\n        <ng-template #nzTabHeading>\n          {{tab.name}}\n        </ng-template>\n        <nz-table #nzTable\n                  [nzAjaxData]=\"_dataSet\"\n                  [nzShowSizeChanger]=\"true\"\n                  [nzShowTotal]=\"true\"\n                  [nzLoading]=\"_loading\"\n                  [nzTotal]=\"_total\"\n                  [(nzPageIndex)]=\"_current\"\n                  (nzPageIndexChange)=\"refreshData()\"\n                  [(nzPageSize)]=\"_pageSize\"\n                  (nzPageSizeChange)=\"refreshData(true)\">\n          <thead nz-thead>\n          <tr>\n            <th nz-th>\n              <span>实例名称</span>\n              <nz-table-sort [(nzValue)]=\"sortMap.instanceName\"\n                             (nzValueChange)=\"sort('instanceName', $event)\"></nz-table-sort>\n            </th>\n\n            <th nz-th>\n              <span>应用名称</span>\n              <nz-table-sort [(nzValue)]=\"sortMap.opContainerApp\"\n                             (nzValueChange)=\"sort('opContainerApp', $event)\"></nz-table-sort>\n            </th>\n            <th nz-th>\n              <span>状态</span>\n              <nz-table-sort [(nzValue)]=\"sortMap.status\"\n                             (nzValueChange)=\"sort('status', $event)\"></nz-table-sort>\n            </th>\n            <th nz-th>\n              <span>大小</span>\n              <nz-table-sort [(nzValue)]=\"sortMap.cpuSize\"\n                             (nzValueChange)=\"sort('cpuSize', $event)\"></nz-table-sort>\n            </th>\n            <th nz-th>\n              <span>服务数量</span>\n              <nz-table-sort [(nzValue)]=\"sortMap.instancesCount\"\n                             (nzValueChange)=\"sort('instancesCount', $event)\"></nz-table-sort>\n            </th>\n            <th nz-th>\n              <span>创建时间</span>\n              <nz-table-sort [(nzValue)]=\"sortMap.createTime\"\n                             (nzValueChange)=\"sort('createTime', $event)\"></nz-table-sort>\n            </th>\n            <th nz-th>\n              <span>操作</span>\n            </th>\n          </tr>\n          </thead>\n          <tbody nz-tbody>\n          <tr nz-tbody-tr *ngFor=\"let data of nzTable.data  | appFilter: 'instanceName' : keyword\">\n            <td nz-td>\n              <a [routerLink]=\"['/appOverviewDetail', data.id]\">\n                {{data.instanceName}}\n              </a>\n            </td>\n            <td nz-td>{{data.opContainerApp}}</td>\n            <td nz-td>{{data.status}}</td>\n            <td nz-td>{{data.cpuSize}}核 {{data.memSize}}M</td>\n            <td nz-td>{{data.instancesCount}} 个</td>\n            <td nz-td>{{data.createTime | date:'yyyy-MM-dd HH:mm:ss'}}</td>\n            <td nz-td>\n              <button nz-button [nzType]=\"'primary'\" nzSize=\"small\" (click)=\"showModal(data.id, data.instanceName);\">\n                <span>删除</span>\n              </button>\n            </td>\n          </tr>\n          </tbody>\n        </nz-table>\n      </nz-tab>\n    </nz-tabset>\n  </nz-content>\n</div>\n\n<nz-modal [nzVisible]=\"isVisible\" [nzTitle]=\"'操作确认'\" [nzContent]=\"modalContent\" (nzOnCancel)=\"handleCancel($event)\"\n          (nzOnOk)=\"handleOk($event)\">\n  <ng-template #modalContent>\n    <p>已选择应用实例：{{deleteName}}，是否确定删除？</p>\n    <nz-spin [nzSize]=\"'large'\" [nzSpinning]=\"_isSpinning\" [nzTip]=\"'删除中'\" style=\"text-align: center;\">\n    </nz-spin>\n\n  </ng-template>\n</nz-modal>\n"

/***/ }),

/***/ "../../../../../src/app/app-overview/app-overview.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppOverviewComponent; });
/* unused harmony export AppTotalsClass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_random_user_service__ = __webpack_require__("../../../../../src/app/shared/random-user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppOverviewComponent = (function () {
    function AppOverviewComponent(http, _randomUser, servicesService, _notification) {
        var _this = this;
        this.http = http;
        this._randomUser = _randomUser;
        this.servicesService = servicesService;
        this._notification = _notification;
        this.appImgUrl1 = 'assets/application/u3225.png';
        this.appImgUrl2 = 'assets/application/u3227.png';
        this.title = '应用概览';
        this.mirrorName = 'product'; // 初始生产域对应的标签名称 cluster_name
        // input输入框
        this.titleFilter = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]();
        this.tabs = [
            {
                index: 1,
                name: '生产域',
                tabName: 'product',
                disabled: false
            },
            {
                index: 2,
                name: '测试域',
                tabName: 'test',
                disabled: false
            }
        ];
        this._current = 1;
        this._pageSize = 10;
        this._total = 1;
        this._loading = true;
        this.sortMap = {
            instanceName: null,
            opContainerApp: null,
            stauts: null,
            cpuSize: null,
            instancesCount: null,
            createTime: null
        };
        this._sortName = null;
        this._sortValue = null;
        this._dataSet = [];
        this.copyData = this._dataSet.slice();
        this.deleteID = '';
        this.deleteName = '';
        this.isVisible = false;
        this._isSpinning = false;
        this.showModal = function (id, name) {
            _this.isVisible = true;
            _this.deleteID = id;
            _this.deleteName = name;
        };
        this.handleOk = function (e) {
            _this.deleteAppInstance(_this.deleteID, _this.deleteName);
            _this._isSpinning = true;
            setTimeout(function () {
                _this.isVisible = false;
                console.log('删除成功，更新列表');
                _this.refreshData();
                _this._isSpinning = false;
            }, 1000);
        };
        this.createNotification = function (type, title, content) {
            _this._notification.create(type, title, content);
        };
        this.handleCancel = function (e) {
            console.log(e);
            _this.isVisible = false;
        };
    }
    // 删除应用实例接口
    AppOverviewComponent.prototype.deleteAppInstance = function (instanceID, instanceName) {
        var _this = this;
        this.http.delete(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiApp + '/apiApp/' + '/groups/' + this.servicesService.getCookie('groupID') + '/application-instances/' + instanceID).subscribe(function (data) {
            status = data.toString();
            console.log('datatoString: ' + status);
        }, function (err) {
            console.log(err._body);
            _this.createNotification('error', '删除应用实例失败', err._body);
        });
    };
    AppOverviewComponent.prototype.sort = function (sortName, value) {
        var _this = this;
        this._sortName = sortName;
        this._sortValue = value;
        Object.keys(this.sortMap).forEach(function (key) {
            if (key !== sortName) {
                _this.sortMap[key] = null;
            }
            else {
                _this.sortMap[key] = value;
            }
        });
        this.refreshData();
    };
    AppOverviewComponent.prototype.reset = function () {
        this.refreshData(true);
    };
    AppOverviewComponent.prototype.refreshData = function (reset) {
        var _this = this;
        if (reset === void 0) { reset = false; }
        if (reset) {
            this._current = 1;
        }
        this._loading = true;
        this._randomUser.getAppInstances(this._current, this._pageSize, this._sortName, this._sortValue, this.mirrorName).subscribe(function (data) {
            console.log(_this._current);
            console.log(_this._pageSize);
            console.log(_this._sortName);
            console.log(_this._sortValue);
            console.log(data);
            _this._loading = false;
            _this._total = data.length;
            _this._dataSet = data.slice((_this._current - 1) * _this._pageSize, _this._current * _this._pageSize);
            // this._dataSet = data;
            _this._dataSet = _this._dataSet.sort(function (a, b) {
                if (a[_this._sortName] > b[_this._sortName]) {
                    return (_this._sortValue === 'ascend') ? 1 : -1;
                }
                else if (a[_this._sortName] < b[_this._sortName]) {
                    return (_this._sortValue === 'ascend') ? -1 : 1;
                }
                else {
                    return 0;
                }
            }).slice();
            // this._dataSet = data;
            console.log(_this._dataSet);
        });
    };
    AppOverviewComponent.prototype.groupidHandler = function (event) {
        console.log('change event: ' + event);
        console.log('change event this.groupid: ' + this.groupid);
        this.groupid = event;
        // console.log('change！！ get groupid: ' + this.groupid);
        // console.log('change！！ cookie: ' + this.servicesService.getCookie('groupID'));
        this.getTotalNums();
        this.refreshData();
    };
    AppOverviewComponent.prototype.changeMirrorName = function (mirrorName) {
        this.mirrorName = mirrorName;
        console.log(this.mirrorName);
        this.refreshData();
    };
    AppOverviewComponent.prototype.getTotalNums = function () {
        var _this = this;
        this.totalTemp = this._randomUser.getTotals();
        this.totalTemp.subscribe(function (data) {
            console.log('data: ' + data);
            // 获取total总数中的应用总数和容器总数
            _this.appCount = data.appCount;
            _this.podsCount = data.podsCount;
            // 订阅op的group流
            _this.servicesService.getGroupList().subscribe(function (data2) {
                _this.groupList = _this.servicesService.getGroupNameList(data2);
                // this.groupList = ['aaa_1', 'testd_2', 'BDOC-TEST-11_5', 'GGGGGGG_10', 'GROUP2_9', 'test111_8', 'asd_7'];
                // 如果成功获取op的grouplist，并且可以取到length长度，否则项目个数填写0
                if (_this.groupList.length) {
                    _this.totals = new AppTotalsClass(_this.appCount, _this.podsCount, _this.groupList.length);
                }
                else {
                    _this.totals = new AppTotalsClass(_this.appCount, _this.podsCount, 0);
                }
                console.log(_this.totals);
            });
        });
    };
    AppOverviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.getTotalNums();
            _this.refreshData();
        }, 0);
    };
    return AppOverviewComponent;
}());
AppOverviewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-app-overview',
        template: __webpack_require__("../../../../../src/app/app-overview/app-overview.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-overview/app-overview.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__shared_random_user_service__["a" /* RandomUserService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_random_user_service__["a" /* RandomUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_random_user_service__["a" /* RandomUserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_services_service__["a" /* ServicesService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _d || Object])
], AppOverviewComponent);

var AppTotalsClass = (function () {
    function AppTotalsClass(appTotalNum, dockerTotalNum, projectTotalNum) {
        this.appTotalNum = appTotalNum;
        this.dockerTotalNum = dockerTotalNum;
        this.projectTotalNum = projectTotalNum;
    }
    return AppTotalsClass;
}());

var _a, _b, _c, _d;
//# sourceMappingURL=app-overview.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-release/app-release.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div [hidden]=\"contentControl === false\"> -->\n<div style=\"padding:20px\">\n  <nz-steps [(nzCurrent)]=\"current\">\n    <nz-step [nzTitle]=\"'镜像配置'\"></nz-step>\n    <nz-step [nzTitle]=\"'应用发布'\"></nz-step>\n    <nz-step [nzTitle]=\"'发布成功'\"></nz-step>\n  </nz-steps>\n  <div class=\"steps-content\">\n    <div>\n      <!-- 镜像配置 -->\n      <div [hidden]=\"current !== 0\">\n        <nz-layout>\n          <nz-content class=\"mirror-store-wrapper\">\n            <nz-tabset [nzTabPosition]=\"'top'\" [nzType]=\"'card'\" class=\"mirrorTab\">\n              <nz-tab *ngFor=\"let tab of tabs\" (nzClick)=\"changeTabName(tab.tabName)\">\n                <ng-template #nzTabHeading>\n                  {{tab.name}}\n                </ng-template>\n\n\n                <div class=\"mirror-body-wrapper\">\n\n                  <div class=\"radio-select-wrapper\">\n                    <div nz-col class=\"catalog-option\">\n                    </div>\n                    <nz-radio-group [(ngModel)]=\"mirrorRadioValue\" *ngFor=\"let mirrorTab of mirror_tabs\">\n                      <label nz-radio [nzValue]=\"mirrorTab.index\" [nzDisabled]=\"mirrorTab.disabled\">\n                        <span [ngClass]=\"currentClasses\">{{mirrorTab.name}}</span>\n                      </label>\n                    </nz-radio-group>\n                  </div>\n                  <div class=\"mirror-card-wrapper\">\n                    <!--<app-mirror-store-list [radioValue]=\"radioValue\" [moduleName]=\"'repository'\" [groupid]=\"groupid\"-->\n                    <!--[tabName]=\"mirrorName\" [titleFilter]=\"titleFilter\"-->\n                    <!--[radioValueFilter]=\"radioValueFilter\">-->\n                    <!--</app-mirror-store-list>-->\n                    <div id=\"mirror-list-wrapper\" *ngIf=\"appRepoList\">\n                      <div *ngFor=\"let service of appRepoList; let i=index\">\n                        <div nz-col [nzSpan]=\"5\" class=\"\">\n                          <nz-card>\n                            <ng-template #title>\n                              <div class=\"mirror-header\">\n                                {{service.repositoryName}}\n\n                              </div>\n                            </ng-template>\n                            <ng-template #body>\n                              <div class=\"custom-card\">\n                                <div class=\"card-content\" *ngIf=\"repoTypeArray[i] && repoTypeArray[i].opRepository\">\n                                  <div>\n                                    <p style=\"font-size: 12px;\">镜像版本：</p>\n                                    <nz-radio-group [(ngModel)]=\"repoVersionRadioValue[i]\"\n                                                    *ngFor=\"let repoVersion of repoTypeArray[i].opRepository;\">\n                                      <label nz-radio [nzValue]=\"repoVersion.id\">\n                                        <span>{{repoVersion.version}}</span>\n                                      </label>\n                                    </nz-radio-group>\n                                    <span *ngIf=\"(repoVersionRadioValue[i] !== undefined) && (repoVersionRadioValue[i] !== '')\">\n                                      <i class=\"anticon anticon-check-circle\" (click)=\"removeSelect(i)\"></i>\n                                    </span>\n                                  </div>\n                                  <!--<div *ngFor=\"let repoType of repoTypeArray.images.opRepository;\"\n                                 >\n                                    {{repoType.version}}\n                                  </div>-->\n                                </div>\n                              </div>\n                            </ng-template>\n                          </nz-card>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </nz-tab>\n            </nz-tabset>\n          </nz-content>\n        </nz-layout>\n      </div>\n    </div>\n\n  </div>\n  <div class=\"steps-content\">\n    <div>\n      <!--应用发布-->\n      <div [hidden]=\"current !== 1\">\n\n        <nz-layout>\n          <nz-content>\n            <div nz-row>\n              <div nz-col [nzSpan]=\"4\">\n          <span style=\"display: block;\n            font-size: 13px;\n            font-weight: 400;\n            letter-spacing: 0px;\n            margin-bottom: 10px;\n            text-align:right;\n            color: rgba(0, 0, 0, 0.9);\">图标上传</span>\n              </div>\n              <div style=\"margin-left: 10px; margin-top: 4px\" nz-col [nzSpan]=\"10\" ng2FileDrop\n                   [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\"\n                   (fileOver)=\"fileOverBase($event)\" [uploader]=\"uploaderIcon\" class=\"well my-drop-zone\">\n                <div nz-col [nzSpan]=\"6\">\n                  <i class=\"anticon anticon-cloud-upload-o\"></i>\n                  <span>拖拽图片到此处或者</span>\n                </div>\n                <nz-tooltip>\n                  <ng-template #nzTemplate>\n                    <p>图片名称不能是中文</p>\n                    <p>图片格式: jpg、jpeg、png</p>\n                  </ng-template>\n                  <div nz-tooltip nz-col class=\"file\">图标上传\n                    <input type=\"file\" ng2FileSelect [uploader]=\"uploaderIcon\" (change)=\"FileSelected('icon')\">\n                  </div>\n                </nz-tooltip>\n              </div>\n            </div>\n            <div *ngIf=\"_dataSetIcon.length !== 0\" style=\"margin-left: 10px; margin-top: 4px\" nz-row>\n              <!-- <div>\n                111 {{ uploader?.queue?.length }} 222 {{ uploader?.queue }} 333 {{ _dataSet }}\n              </div> -->\n              <div nz-col [nzSpan]=\"4\"></div>\n              <div nz-col [nzSpan]=\"10\">\n                <!-- 这里先把分页去掉，nzAjaxData方式，获取分页有点问题，有想法是把uploader.queue的队列，放到一个服务器上，\n                然后在这里实现分页，最后在我这里进行nzAjaxData远程异步获取，可以看nzAjaxData在官网的实例 -->\n                <nz-table #nzTable [nzScroll]=\"{ y: 240 }\" [nzShowSizeChanger]=\"true\" [nzAjaxData]=\"_dataSetIcon\"\n                          [nzIsPagination]=\"false\">\n                  <ng-template #nzFixedHeader>\n                    <thead nz-thead>\n                    <tr>\n                      <th nz-th>\n                        <span>图标上传</span>\n                      </th>\n                    </tr>\n                    </thead>\n                  </ng-template>\n                  <tbody nz-tbody>\n                  <tr nz-tbody-tr *ngFor=\"let item of nzTable.data\">\n                    <td nz-td>\n                      <i class=\"anticon anticon-paper-clip\"></i>\n                      <strong>{{ item?.file?.name }}</strong>\n\n                    </td>\n                    <td nz-td>\n                      <button nz-button [nzType]=\"'default'\" type=\"button\" (click)=\"item.upload()\"\n                              [disabled]=\"nameVerify(item) || form.value['appName'] === undefined || form.value['appName'] === '' || item.isReady || item.isUploading || item.isSuccess\">\n                        上传\n                      </button>\n                      <button nz-button [nzType]=\"'default'\" type=\"button\" (click)=\"item.cancel()\"\n                              [disabled]=\"!item.isUploading\">\n                        取消\n                      </button>\n                      <button nz-button [nzType]=\"'default'\" type=\"button\" (click)=\"item.remove()\"\n                              [disabled]=\"item.isSuccess\">\n                        删除\n                      </button>\n                      <nz-tooltip [nzPlacement]=\"'rightTop'\">\n                        <i nz-tooltip class=\"anticon anticon-question-circle-o\"></i>\n                        <ng-template #nzTemplate>\n                          <div>\n                            <p>请先填写应用名称，然后进行上传操作!</p>\n                          </div>\n                        </ng-template>\n                      </nz-tooltip>\n                    </td>\n                    <td nz-td>\n                      <span *ngIf=\"item.isSuccess\">上传成功</span>\n                      <span *ngIf=\"item.isCancel\">取消上传</span>\n                      <span *ngIf=\"item.isError\">上传失败</span>\n                    </td>\n                  </tr>\n                  </tbody>\n                </nz-table>\n              </div>\n            </div>\n            <div nz-row>\n              <div nz-row>\n                <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n            <span style=\"display: block;\n              font-size: 13px;\n              font-weight: 400;\n              letter-spacing: 0px;\n              margin-bottom: 10px;\n              color: rgba(0, 0, 0, 0.9);\">是否发布新应用</span>\n                </div>\n                <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                  <nz-radio-group (click)=\"toggleRadio()\" [(ngModel)]=\"this.radioValue\">\n                    <label nz-radio [nzValue]=\"'newApp'\">\n                      <span>是</span>\n                    </label>\n                    <label nz-radio [nzValue]=\"'notNewApp'\">\n                      <span>否</span>\n                    </label>\n                  </nz-radio-group>\n                </div>\n              </div>\n              <dynamic-form #form [config]=\"formConfig\">\n              </dynamic-form>\n            </div>\n          </nz-content>\n\n        </nz-layout>\n      </div>\n    </div>\n  </div>\n  <div class=\"steps-action\" nz-row>\n    <!-- TODO -->\n    <!-- disabled? next函数控制 -->\n    <div nz-col [nzSpan]=\"4\"></div>\n    <div nz-col [nzSpan]=\"18\">\n      <span [hidden]=\"current >= 1\">\n        <button [disabled]=\"buttonDisabled()\" nz-button [nzType]=\"'primary'\" (click)=\"next()\">\n          <span>下一步</span>\n        </button>\n      </span>\n      <span [hidden]=\"current !== 1\">\n        <button [disabled]=\"buttonDisabled()\" nz-button [nzType]=\"'primary'\" (click)=\"done()\">\n          <span>发布</span>\n        </button>\n      </span>\n      <span [hidden]=\"current <= 0\">\n        <button nz-button [nzType]=\"'default'\" (click)=\"pre()\">\n          <span>上一步</span>\n        </button>\n      </span>\n      <span [hidden]=\"current !== 0\">\n        <button nz-button [nzType]=\"'default'\" (click)=\"pre()\">\n          <span>取消</span>\n        </button>\n      </span>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app-release/app-release.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "nz-layout {\n  background: #fff;\n  padding: 20px; }\n\nnz-header, nz-content, nz-footer {\n  background: #fff; }\n\nnz-header {\n  padding: 0;\n  width: 80%;\n  margin-bottom: 20px;\n  border-bottom: 1px solid #ddd; }\n\nnz-content {\n  padding: 0; }\n  nz-content span {\n    height: 30px;\n    line-height: 30px; }\n  nz-content .file {\n    margin-left: 10px;\n    cursor: pointer;\n    width: 90px;\n    position: relative;\n    display: inline-block;\n    border: 1px solid #99D3F5;\n    border-radius: 4px;\n    padding: 4px 12px;\n    overflow: hidden;\n    color: #1E88C7;\n    text-decoration: none;\n    text-indent: 0;\n    height: 30px;\n    line-height: 20px; }\n    nz-content .file input {\n      cursor: pointer;\n      position: absolute;\n      font-size: 100px;\n      right: 0;\n      top: 0;\n      opacity: 0; }\n    nz-content .file:hover {\n      cursor: pointer;\n      background: #AADFFD;\n      border-color: #78C3F3;\n      color: #004974;\n      text-decoration: none; }\n  nz-content .ant-row {\n    margin-bottom: 10px; }\n\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05); }\n\n.my-drop-zone {\n  border: dotted 1px lightgray; }\n\n.nv-file-ove {\n  border: dotted 1px red; }\n\n.ant-table-thead > tr > th {\n  padding: 8px; }\n\ntbody tr td:first-child {\n  width: 25%; }\n\ntbody tr td:last-child {\n  width: 25%; }\n\n.steps-action {\n  border-top: 1px solid #ddd;\n  width: 80%;\n  padding-top: 20px; }\n\nnz-header, nz-content, nz-footer {\n  background: #fff; }\n\nnz-content {\n  padding: 0px; }\n\np {\n  font-size: 16px; }\n\n.service-tips p {\n  font-weight: bold; }\n\n.borderTop80 {\n  border-top: 1px solid #ddd;\n  padding-top: 20px;\n  width: 80%; }\n\n.borderBottom80 {\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 20px;\n  width: 80%; }\n\n.marginTop20 {\n  margin-bottom: 20px; }\n\n.marginBottom15 {\n  margin-bottom: 15px; }\n\n.mirror-store-wrapper {\n  margin-left: 28px;\n  margin-right: 60px; }\n\n.mirrorTab {\n  margin-top: 30px; }\n\n.mirror-btns-wrapper {\n  margin: 20px 0;\n  height: 22px; }\n\n.radio-select-wrapper {\n  float: left;\n  width: 128px;\n  height: 415px;\n  border: 1px solid #e4e4e4;\n  padding: 20px;\n  margin-bottom: 300px; }\n\n.catalog-option {\n  padding-bottom: 10px;\n  border-bottom: 1px solid #e4e4e4;\n  margin-bottom: 5px; }\n\n.radio-select-wrapper label {\n  line-height: 30px;\n  height: 30px; }\n\n#mirror-list-wrapper .ant-card {\n  margin-left: 15px;\n  margin-bottom: 15px;\n  height: 200px; }\n\n.card-bottom {\n  padding: 5px 0; }\n\n.card-content {\n  height: 100px; }\n\n.card-cate {\n  float: left;\n  color: #cccccc;\n  font-size: 13px;\n  font-weight: 400; }\n\n.card-action {\n  float: right;\n  margin-right: 12px; }\n\n.anticon {\n  width: 18px;\n  height: 18px; }\n\n:host ::ng-deep .ant-card-head {\n  padding: 0 10px; }\n\n:host ::ng-deep .ant-card-body {\n  padding: 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-release/app-release.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppReleaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__ = __webpack_require__("../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










// import { NameValidator } from '../util/reg-pattern/reg-name.directive';
var AppReleaseComponent = (function () {
    function AppReleaseComponent(router, confirmServ, http, _notification, servicesService) {
        var _this = this;
        this.router = router;
        this.confirmServ = confirmServ;
        this.http = http;
        this._notification = _notification;
        this.servicesService = servicesService;
        this.current = 0;
        this.testValue = '111';
        // 控制layout是否可见
        this.contentControl = false;
        this.url = __WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].api + '/api/' + this.servicesService.getCookie('groupID') + '/upload/app/fileName/';
        // 这里的itemAlias是设置的name ="newname"，本来是name="file"，相当于form的name值
        // public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'newname' });
        this.uploader = new __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__["FileUploader"]({
            url: this.url,
        });
        this.hasBaseDropZoneOver = false;
        this.urlIcon = __WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].api + '/api/' + this.servicesService.getCookie('groupID') + '/upload/app/fileName/';
        this.uploaderIcon = new __WEBPACK_IMPORTED_MODULE_3_ng2_file_upload__["FileUploader"]({
            url: this.urlIcon,
            allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg'],
            queueLimit: 1,
        });
        this._dataSet = this.uploader.queue;
        this._dataSetIcon = this.uploaderIcon.queue;
        // 动态表单
        this.imageIdArr = [];
        this.repositories = [];
        this.radioValue = 'newApp';
        // @ViewChild('formProject') formThird2Project: DynamicFormComponent;
        /* 选择镜像相关 开始*/
        this.mirrorRadioValue = 7;
        this.tabName = 'private';
        this.repoVersionRadioValue = [];
        this.repoTypeArray = [];
        this.tabs = [
            {
                index: 1,
                name: '我的镜像',
                tabName: 'private'
            },
            {
                index: 2,
                name: '公有镜像',
                tabName: 'public'
            }
        ];
        this.mirror_tabs = [
            {
                index: 'all',
                name: '全部',
                disabled: true
            },
            {
                index: 0,
                name: '其他',
                disabled: true
            },
            {
                index: 1,
                name: '操作系统',
                disabled: true
            },
            {
                index: 2,
                name: '运行环境',
                disabled: true
            },
            {
                index: 3,
                name: '中间件',
                disabled: true
            },
            {
                index: 4,
                name: '数据库',
                disabled: true
            },
            {
                index: 5,
                name: '微服务框架',
                disabled: true
            },
            {
                index: 6,
                name: '大数据',
                disabled: true
            },
            {
                index: 7,
                name: '应用',
                disabled: false
            }
        ];
        this.formConfig = [
            {
                type: 'input',
                label: '应用名称',
                name: 'appName',
                placeholder: '请输入应用名称',
                validation: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(20)],
                styles: {
                    'width': '400px'
                }
            },
            {
                type: 'input',
                label: '应用版本',
                name: 'version',
                placeholder: '请输入应用版本',
                validation: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z0-9]([.a-zA-Z0-9]*[a-zA-Z0-9])?$/i), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(6)],
                styles: {
                    'width': '400px'
                }
            },
            {
                type: 'input',
                label: '应用描述',
                name: 'description',
                placeholder: '请输入应用描述',
                validation: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(20)],
                notNecessary: true,
                inputType: 'textarea',
                styles: {
                    'width': '400px'
                }
            },
            {
                type: 'select',
                label: '服务选择',
                name: 'services',
                options: [],
                placeholder: '选择依赖的服务',
                // validation: [Validators.required],
                notNecessary: true,
                styles: {
                    'width': '400px'
                },
                ifTags: 'true'
            }
            // ,
            // {
            //   label: '发布',
            //   name: 'submit',
            //   type: 'button',
            //   buttonType: 'primary',
            //   styles: {
            //     'margin-left': '20%'
            //   },
            //   divStyles: {
            //     'width': '80%',
            //     'border-top': '1px solid #ddd',
            //     'padding-top': '20px'
            //   },
            //   // buttonDis: this.buttonDisabled()
            // },
        ];
        this.createNotification = function (type, title, content) {
            _this._notification.create(type, title, content);
        };
        // this.showConfirm();
        console.log('11', this.contentControl);
    }
    AppReleaseComponent.prototype.changeTabName = function (tabName) {
        console.log(tabName);
        this.tabName = tabName;
        this.getAppRepoList();
    };
    AppReleaseComponent.prototype.fileOverBase = function (e) {
        var _this = this;
        this.hasBaseDropZoneOver = e;
        this.uploaderIcon.onBeforeUploadItem = function (item) {
            item.withCredentials = false;
            item.url = _this.urlIcon + _this.form.value['appName'] + '.png';
        };
    };
    // FileSelected(uploaderType: any) {
    //   if (uploaderType === 'image') {
    //     console.log('文件上传完了', this.uploader);
    //     this.uploader.onBeforeUploadItem = (item) => {
    //       item.file.name = item.file.name.replace(/\s/g, '');
    //       item.withCredentials = false;
    //       item.url = this.url + item.file.name;
    //     }
    //   } else {
    //     console.log('Icon文件上传完了', this.uploaderIcon);
    //     console.log('这里打印form', this.form);
    //     this.uploaderIcon.onBeforeUploadItem = (item) => {
    //       item.file.name = item.file.name.replace(/\s/g, '');
    //       item.withCredentials = false;
    //       item.url = this.urlIcon + this.form.value['appName'] + '.png';
    //     }
    //   }
    // }
    // // 模态框
    // showConfirm = () => {
    //   const thisParent = this;
    //   this.confirmServ.confirm({
    //     maskClosable: false,
    //     title: '是否选择通过开发测试平台发布？',
    //     // content: '点确认 1 秒后关闭',
    //     onOk() {
    //       window.location.href = window.location.origin + '/#/appStore';
    //     },
    //     onCancel() {
    //       thisParent.contentControl = true;
    //       console.log('form11', thisParent.form);
    //     }
    //   });
    // }
    // getImageOrigin() {
    //   this.http.get(environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/registry').subscribe(data => {
    //     const dataValue = data;
    //     this.imageOriginId = dataValue['id'];
    //     // this.imageOriginId = dataValue.id;
    //   })
    // }
    AppReleaseComponent.prototype.getApplications = function () {
        var _this = this;
        this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiApp + '/apiApp/groups/' + this.servicesService.getCookie('groupID') + '/applications').subscribe(function (data) {
            _this.applications$ = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](data, function (value, key) {
                return value['appName'];
            });
        });
    };
    AppReleaseComponent.prototype.loadImage2 = function (formValue) {
        return __awaiter(this, void 0, void 0, function () {
            var fileArr, fileArrErr;
            return __generator(this, function (_a) {
                fileArr = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](this._dataSet, function (value, key) {
                    if (value['isSuccess'] === true) {
                        return value['file']['name'];
                    }
                });
                fileArrErr = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](__WEBPACK_IMPORTED_MODULE_6_lodash__["compact"](fileArr), function (value, key) {
                    return value;
                });
                console.log('formValue', formValue);
                return [2 /*return*/];
            });
        });
    };
    AppReleaseComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // setTimeout(() => {
        console.log('form11', this.form.controls);
        this.form.setDisabled('submit', true);
        // }, 0);
        var previousValid = this.form.valid;
        this.form.changes.subscribe(function () {
            if (_this.form.valid !== previousValid) {
                previousValid = _this.form.valid;
                _this.form.setDisabled('submit', !previousValid);
            }
        });
        // // this.form.setValue('name', '');
    };
    // 根据options选择的serviceName，映射找到id列表
    AppReleaseComponent.prototype.extractIdByName = function (crr, crr1) {
        var ret = [];
        if (!crr || !Array.isArray(crr.services) || !Array.isArray(crr1))
            return ret;
        crr.services.forEach(function (nameVal) { return ret.push(crr1[crr1.findIndex(function (data) { return data.serviceName === nameVal || data.id === nameVal; })].id); });
        return ret;
    };
    AppReleaseComponent.prototype.toggleRadio = function () {
        console.log(this.radioValue);
        if (this.radioValue === 'newApp') {
            this.testValue = '222';
            this.formConfig[0] = {
                type: 'input',
                label: '应用名称',
                name: 'appName',
                placeholder: '请输入应用名称',
                styles: {
                    'width': '400px'
                }
            };
            console.log('form333', this.form);
        }
        else {
            this.testValue = '333';
            this.formConfig[0] = {
                type: 'select',
                label: '应用名称',
                name: 'appName',
                options: this.applications$,
                placeholder: '请选择应用',
                styles: {
                    'width': '400px'
                }
            };
            console.log('form333', this.form);
        }
        this.form.setValue('appName', this.formConfig[0]);
        console.log(this.formConfig);
    };
    AppReleaseComponent.prototype.buttonDisabled = function () {
        switch (this.current) {
            case 0: {
                if (this.repoVersionRadioValue.length === 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
            case 1: {
                var fileArr = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](this._dataSet, function (value, key) {
                    if (value['isSuccess'] === true) {
                        return value['file']['name'];
                    }
                });
                fileArr = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](__WEBPACK_IMPORTED_MODULE_6_lodash__["compact"](fileArr), function (value, key) {
                    return value;
                });
                // return !this.form.valid || fileArr.length === 0;
                return !this.form.valid;
            }
        }
    };
    ;
    AppReleaseComponent.prototype.next = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (this.current) {
                    case 0: {
                        console.log(this.repoVersionRadioValue);
                        break;
                    }
                }
                this.current += 1;
                this.changeContent();
                return [2 /*return*/];
            });
        });
    };
    AppReleaseComponent.prototype.cleanRepoVersionRadioList = function (repoVersionRadioValue) {
        var finalRepoList;
        for (var i = 0; i < repoVersionRadioValue.length; i++) {
            if (repoVersionRadioValue[i] == "" || typeof (repoVersionRadioValue[i]) == "undefined") {
                repoVersionRadioValue.splice(i, 1);
                i = i - 1;
            }
        }
        console.log('clean: ' + repoVersionRadioValue);
        return repoVersionRadioValue;
    };
    AppReleaseComponent.prototype.pre = function () {
        this.current -= 1;
        if (this.current === -1) {
            // window.location.href = window.location.origin + '/#/appStore';
            this.router.navigate(['appStore']);
        }
        this.changeContent();
        console.log(this.repoVersionRadioValue);
    };
    AppReleaseComponent.prototype.changeContent = function () {
        switch (this.current) {
            case 0: {
                this.current = 0;
                break;
            }
            case 1: {
                this.current = 1;
                break;
            }
            case 2: {
                this.current = 2;
                break;
            }
            default: {
                this.current = 3;
            }
        }
    };
    AppReleaseComponent.prototype.done = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var servicesId;
            return __generator(this, function (_a) {
                // 处理清空镜像id数组中的empty空值 和 undefined值，只保留有用的镜像id值
                this.repoVersionRadioValue = this.cleanRepoVersionRadioList(this.repoVersionRadioValue);
                console.log(this.repoVersionRadioValue);
                // console.log('看下load', this.loadImage(value));
                // await this.loadImage(value);
                this.form.value['repositories'] = this.repoVersionRadioValue;
                console.log('repositories', this.repositories);
                console.log('this.form.value', this.form.value);
                console.log('dataSet', this._dataSet);
                console.log('之前打印value', this.form.value);
                servicesId = this.extractIdByName(this.form.value, this.servicesNameId$);
                console.log('这是id', servicesId);
                this.form.value.services = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](servicesId, function (value, key) {
                    return servicesId[key];
                });
                this.form.value.createUserId = 1;
                this.form.value.containerSrvId = 1;
                this.http.post(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiApp + '/apiApp/groups/' + this.servicesService.getCookie('groupID') + '/applications', this.form.value).subscribe(function (data) {
                    var thisParent = _this;
                    console.log('发布应用成功', data);
                    // this.createNotification('success', '发布应用成功', '正在跳转到应用商城页面', {nzDuration: 0});
                    _this.confirmServ.success({
                        maskClosable: false,
                        title: '应用发布成功!',
                        content: '点确认按钮跳转到应用商城',
                        okText: '确定',
                        onOk: function () {
                            // .contentControl = true;
                            // console.log('form11', thisParent.form);
                            // const redirect = window.location.host + '/#/appStore';
                            // window.location.href = window.location.origin + '/#/appStore';
                            thisParent.router.navigate(['appStore']);
                        },
                        onCancel: function () {
                        }
                    });
                }, function (err) {
                    if (err.error instanceof Error) {
                        // A client-side or network error occurred. Handle it accordingly.
                        console.log('An error occurred:', err.error.message);
                    }
                    else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong,
                        console.log("Backend returned code " + err.status + ", body was: " + err.error);
                    }
                });
                console.log('打印value', this.form.value);
                return [2 /*return*/];
            });
        });
    };
    // 获取镜像详情的流
    AppReleaseComponent.prototype.getServiceDetail = function (name) {
        this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/repository/' + name + '?region=' + this.tabName).subscribe(function (data) {
            console.log('data: ' + data);
            return data;
        });
    };
    // 反选，取消选择的镜像
    AppReleaseComponent.prototype.removeSelect = function (selectId) {
        console.log('selectId: ' + selectId);
        for (var i = 0; i < this.repoVersionRadioValue.length; i++) {
            if (i === selectId) {
                this.repoVersionRadioValue[i] = '';
            }
        }
    };
    AppReleaseComponent.prototype.getAppRepoList = function () {
        var _this = this;
        if (this.tabName === 'private') {
            this.servicesService.getCateServices(this.tabName, 'repository', this.mirrorRadioValue).subscribe(function (data) {
                _this.appRepoList = data;
                console.log('apprepolist: ' + _this.appRepoList);
                setTimeout(function () {
                    console.log("appRepoList length: " + _this.appRepoList.length);
                    if (_this.appRepoList.length > 0) {
                        for (var i = 0; i < _this.appRepoList.length; i++) {
                            console.log('i:' + i);
                            console.log('this.appRepoList.repositoryName:' + _this.appRepoList[i].repositoryName);
                            _this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].api + '/api/' + _this.servicesService.getCookie('groupID') + '/warehouse/repository/' + _this.appRepoList[i].repositoryName + '?region=' + _this.tabName).subscribe(function (data) {
                                console.log('data: ' + data);
                                // 判断镜像仓库的images内部是否为空null，如果不判断，for循环会空值 跳过
                                if (data['images'] === null || data['images'] === '') {
                                    data['images'] = {};
                                }
                                _this.repoTypeArray.push(data['images']);
                                console.log('repoTypeArray: ' + _this.repoTypeArray);
                            });
                        }
                        console.log('repoTypeArray: ' + _this.repoTypeArray);
                        console.log('repoVersionRadioValue: ' + _this.repoVersionRadioValue);
                    }
                });
            });
            /*// 订阅流 repositoryName
            this.getServiceDetail().subscribe((data) => {
              if(data.images == '' || data.images == null) {
      
              } else{
                this.mirrorVersions = data.images.opRepository;
                this.firstVersionId = data.images.opRepository[0].id;
                this.firstVersionVersion = data.images.opRepository[0].version;
              }
            });*/
        }
        else {
            this.appRepoList = this.servicesService.getServices(this.tabName, 'repository');
        }
    };
    AppReleaseComponent.prototype.nameVerify = function (item) {
        var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
        if (reg.test(item['file']['name'])) {
            return true;
        }
        // console.log(item);
    };
    AppReleaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        // console.log('hhh', this.form);
        // 解决文件上传的跨域问题
        // this.uploader.onBeforeUploadItem = (item) => {
        //   item.withCredentials = false;
        // }
        // this.getImageOrigin();
        this.getApplications();
        // this.refreshData();
        // 获取services列表
        var params = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["f" /* HttpParams */]().set('isPublic', '1');
        this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiService + '/apiService/groups/' + this.servicesService.getCookie('groupID') + '/services', {
            params: new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["f" /* HttpParams */]().set('isPublic', '1')
        }).subscribe(function (data) {
            _this.services$ = __WEBPACK_IMPORTED_MODULE_6_lodash__["values"](data);
            _this.servicesName$ = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](_this.services$, function (value, key) {
                return value.serviceName;
            });
            _this.formConfig[3].options = _this.servicesName$;
            _this.servicesNameId$ = __WEBPACK_IMPORTED_MODULE_6_lodash__["map"](_this.services$, function (value, key) {
                return __WEBPACK_IMPORTED_MODULE_6_lodash__["pick"](value, ['serviceName', 'id']);
            });
            console.log(_this.servicesNameId$);
        });
        // 获取应用类别的镜像列表
        this.getAppRepoList();
    };
    AppReleaseComponent.prototype.ngAfterContentChecked = function () {
        // console.log('测试changes11');
        // console.log('这是uploader', this.uploader.queue);
    };
    return AppReleaseComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _a || Object)
], AppReleaseComponent.prototype, "form", void 0);
AppReleaseComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-app-release',
        template: __webpack_require__("../../../../../src/app/app-release/app-release.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-release/app-release.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ng_zorro_antd__["c" /* NzModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng_zorro_antd__["c" /* NzModalService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClient */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_9__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__shared_services_service__["a" /* ServicesService */]) === "function" && _f || Object])
], AppReleaseComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=app-release.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_detail_app_detail_component__ = __webpack_require__("../../../../../src/app/app-detail/app-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_overview_app_overview_component__ = __webpack_require__("../../../../../src/app/app-overview/app-overview.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_overview_detail_app_overview_detail_component__ = __webpack_require__("../../../../../src/app/app-overview-detail/app-overview-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_store_app_store_component__ = __webpack_require__("../../../../../src/app/app-store/app-store.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mirror_store_mirror_store_component__ = __webpack_require__("../../../../../src/app/mirror-store/mirror-store.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__file_center_file_center_component__ = __webpack_require__("../../../../../src/app/file-center/file-center.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__code404_code404_component__ = __webpack_require__("../../../../../src/app/code404/code404.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_catalog_service_catalog_component__ = __webpack_require__("../../../../../src/app/service-catalog/service-catalog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__service_release_service_release_component__ = __webpack_require__("../../../../../src/app/service-release/service-release.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__service_instance_service_instance_component__ = __webpack_require__("../../../../../src/app/service-instance/service-instance.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__repository_detail_repository_detail_component__ = __webpack_require__("../../../../../src/app/repository-detail/repository-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__service_detail_service_detail_component__ = __webpack_require__("../../../../../src/app/service-detail/service-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__service_instance_detail_service_instance_detail_component__ = __webpack_require__("../../../../../src/app/service-instance-detail/service-instance-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_release_app_release_component__ = __webpack_require__("../../../../../src/app/app-release/app-release.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_deploy_app_deploy_component__ = __webpack_require__("../../../../../src/app/app-deploy/app-deploy.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__component_test_component_test_component__ = __webpack_require__("../../../../../src/app/component-test/component-test.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__service_subscribe_service_subscribe_component__ = __webpack_require__("../../../../../src/app/service-subscribe/service-subscribe.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__build_image_build_image_component__ = __webpack_require__("../../../../../src/app/build-image/build-image.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__build_image_category_build_image_category_component__ = __webpack_require__("../../../../../src/app/build-image-category/build-image-category.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__app_overview_detail_detail_app_overview_detail_detail_component__ = __webpack_require__("../../../../../src/app/app-overview-detail-detail/app-overview-detail-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__configs_config_control_config_control_component__ = __webpack_require__("../../../../../src/app/configs/config-control/config-control.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__configs_build_config_build_config_component__ = __webpack_require__("../../../../../src/app/configs/build-config/build-config.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__configs_config_detail_config_detail_component__ = __webpack_require__("../../../../../src/app/configs/config-detail/config-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__configs_edit_config_edit_config_component__ = __webpack_require__("../../../../../src/app/configs/edit-config/edit-config.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__configs_add_config_add_config_component__ = __webpack_require__("../../../../../src/app/configs/add-config/add-config.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__app_instance_detail_detail_app_instance_detail_detail_component__ = __webpack_require__("../../../../../src/app/app-instance-detail-detail/app-instance-detail-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__opera_overview_opera_overview_component__ = __webpack_require__("../../../../../src/app/opera-overview/opera-overview.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__opera_log_opera_log_component__ = __webpack_require__("../../../../../src/app/opera-log/opera-log.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__opera_event_opera_event_component__ = __webpack_require__("../../../../../src/app/opera-event/opera-event.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__service_approve_service_approve_component__ = __webpack_require__("../../../../../src/app/service-approve/service-approve.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
































var BuildImageCateGoryComponent;
var routes = [
    // 这里用来组件测试
    { path: 'componentTest', component: __WEBPACK_IMPORTED_MODULE_17__component_test_component_test_component__["a" /* ComponentTestComponent */] },
    // 路由重定向
    { path: '', redirectTo: 'appStore', pathMatch: 'full' },
    { path: 'appOverview', component: __WEBPACK_IMPORTED_MODULE_3__app_overview_app_overview_component__["a" /* AppOverviewComponent */] },
    { path: 'appStore', component: __WEBPACK_IMPORTED_MODULE_5__app_store_app_store_component__["a" /* AppStoreComponent */] },
    { path: 'appDetail/:module/:name/:tabName', component: __WEBPACK_IMPORTED_MODULE_2__app_detail_app_detail_component__["a" /* AppDetailComponent */] },
    { path: 'appOverviewDetail/:instanceId', component: __WEBPACK_IMPORTED_MODULE_4__app_overview_detail_app_overview_detail_component__["a" /* AppOverviewDetailComponent */] },
    { path: 'appInstanceDetailDetail/:instanceId/:instanceDetailID', component: __WEBPACK_IMPORTED_MODULE_27__app_instance_detail_detail_app_instance_detail_detail_component__["a" /* AppInstanceDetailDetailComponent */] },
    { path: 'appOverviewDetailDetail/:instanceId/:moduleName', component: __WEBPACK_IMPORTED_MODULE_21__app_overview_detail_detail_app_overview_detail_detail_component__["a" /* AppOverviewDetailDetailComponent */] },
    { path: 'appDeploy/:appId', component: __WEBPACK_IMPORTED_MODULE_16__app_deploy_app_deploy_component__["a" /* AppDeployComponent */] },
    { path: 'serviceSubscribe/:serviceName/:serviceId', component: __WEBPACK_IMPORTED_MODULE_18__service_subscribe_service_subscribe_component__["a" /* ServiceSubscribeComponent */] },
    { path: 'serviceApprove/:serviceName/:serviceId', component: __WEBPACK_IMPORTED_MODULE_31__service_approve_service_approve_component__["a" /* ServiceApproveComponent */] },
    { path: 'serviceCatalog', component: __WEBPACK_IMPORTED_MODULE_9__service_catalog_service_catalog_component__["a" /* ServiceCatalogComponent */] },
    { path: 'serviceDetail/:module/:serviceId/:tabName', component: __WEBPACK_IMPORTED_MODULE_13__service_detail_service_detail_component__["a" /* ServiceDetailComponent */] },
    { path: 'serviceRelease', component: __WEBPACK_IMPORTED_MODULE_10__service_release_service_release_component__["a" /* ServiceReleaseComponent */] },
    { path: 'appRelease', component: __WEBPACK_IMPORTED_MODULE_15__app_release_app_release_component__["a" /* AppReleaseComponent */] },
    { path: 'serviceInstance', component: __WEBPACK_IMPORTED_MODULE_11__service_instance_service_instance_component__["a" /* ServiceInstanceComponent */] },
    { path: 'serviceInstanceDetail/:instanceId', component: __WEBPACK_IMPORTED_MODULE_14__service_instance_detail_service_instance_detail_component__["a" /* ServiceInstanceDetailComponent */] },
    { path: 'repositoryStore', component: __WEBPACK_IMPORTED_MODULE_6__mirror_store_mirror_store_component__["a" /* MirrorStoreComponent */] },
    { path: 'buildImage/:name/:mirrorName', component: __WEBPACK_IMPORTED_MODULE_19__build_image_build_image_component__["a" /* BuildImageComponent */] },
    { path: 'buildImageCategory/:mirrorName', component: __WEBPACK_IMPORTED_MODULE_20__build_image_category_build_image_category_component__["a" /* BuildImageCategoryComponent */] },
    { path: 'repositoryDetail/:module/:name/:tabName', component: __WEBPACK_IMPORTED_MODULE_12__repository_detail_repository_detail_component__["a" /* RepositoryDetailComponent */] },
    { path: 'fileCenter', component: __WEBPACK_IMPORTED_MODULE_7__file_center_file_center_component__["a" /* FileCenterComponent */] },
    { path: 'configControl', component: __WEBPACK_IMPORTED_MODULE_22__configs_config_control_config_control_component__["a" /* ConfigControlComponent */] },
    { path: 'configDetail/:configID', component: __WEBPACK_IMPORTED_MODULE_24__configs_config_detail_config_detail_component__["a" /* ConfigDetailComponent */] },
    { path: 'buildConfig', component: __WEBPACK_IMPORTED_MODULE_23__configs_build_config_build_config_component__["a" /* BuildConfigComponent */] },
    { path: 'addConfig/:configID', component: __WEBPACK_IMPORTED_MODULE_26__configs_add_config_add_config_component__["a" /* AddConfigComponent */] },
    { path: 'editConfig/:configID/:configKey', component: __WEBPACK_IMPORTED_MODULE_25__configs_edit_config_edit_config_component__["a" /* EditConfigComponent */] },
    { path: 'operaOverview', component: __WEBPACK_IMPORTED_MODULE_28__opera_overview_opera_overview_component__["a" /* OperaOverviewComponent */] },
    { path: 'operaMonitor', loadChildren: './opera-monitor/opera-monitor.module#OperaMonitorModule' },
    { path: 'operaEvent', component: __WEBPACK_IMPORTED_MODULE_30__opera_event_opera_event_component__["a" /* OperaEventComponent */] },
    { path: 'operaLog', component: __WEBPACK_IMPORTED_MODULE_29__opera_log_opera_log_component__["a" /* OperaLogComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_8__code404_code404_component__["a" /* Code404Component */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes, { 'useHash': true })],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]],
        providers: []
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app-store/app-store.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".app-store-wrapper{\n    margin-left: 28px;\n    margin-right: 60px;\n}\n.appTab{\n    margin-top: 30px;\n}\n.app-btns-wrapper{\n    margin: 20px 0;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-store/app-store.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n<app-header [title]=\"title\"\n            (buyEvent)=\"buyHandler($event)\"\n            (headerTitle)=\"titleHandler($event)\"\n></app-header>\n-->\n\n<!--<p>\n    在父组件中，接收到子组件的：名字：{{appOutput.outputName}} 变化的价格：{{appOutput.outputRandom | number:'2.2-2'}}\n</p>\n<p>\n    接受到子组件header传来的title为{{childTitle}}\n</p>-->\n<app-header [title]=\"title\"></app-header>\n\n<app-group-select (groupidHandler)=\"groupidHandler($event)\"></app-group-select>\n\n\n<nz-content class=\"app-store-wrapper\">\n    <nz-tabset [nzTabPosition]=\"'top'\" [nzType]=\"'card'\" class=\"appTab\">\n        <nz-tab *ngFor=\"let tab of tabs\" [nzDisabled]=\"tab.disabled\" (nzClick)=\"changeAppName(tab.tabName)\">\n            <ng-template #nzTabHeading>\n                {{tab.name}}\n            </ng-template>\n            <div nz-row class=\"app-btns-wrapper\">\n                <div nz-col [nzSpan]=\"6\" class=\"catalog-option\">\n                    <button nz-button [nzType]=\"'primary'\" routerLink=\"/appRelease\">发布</button>\n<!--\n                    <button nz-button [nzType]=\"'default'\" class=\"btn\">删除</button>\n-->\n                </div>\n               <!-- <div nz-col [nzSpan]=\"6\" [nzOffset]=\"12\">\n                    <div class=\"input-group\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"按应用名称搜索...\" [formControl]=\"titleFilter\">\n                        <span class=\"input-group-btn\">\n                            <button class=\"btn btn-default\" type=\"button\">\n                                <span class=\"glyphicon glyphicon-search\"></span>\n                            </button>\n                        </span>\n                    </div>\n                </div>-->\n              <app-search [titleFilter]=\"titleFilter\" [offset]=\"18\"></app-search>\n\n            </div>\n            <app-service-list [moduleName]=\"'app'\" [tabName]=\"appName\" [groupid]=\"groupid\" [titleFilter]=\"titleFilter\"></app-service-list>\n        </nz-tab>\n    </nz-tabset>\n</nz-content>\n<!--\n\n<nz-footer>\n    <nz-pagination [(nzPageIndex)]=\"_current\" [nzTotal]=\"50\" nzShowTotal nzShowSizeChanger\n                   nzShowQuickJumper></nz-pagination>\n</nz-footer>-->\n"

/***/ }),

/***/ "../../../../../src/app/app-store/app-store.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppStoreComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_header_header_component__ = __webpack_require__("../../../../../src/app/shared/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppStoreComponent = (function () {
    function AppStoreComponent(servicesService, http) {
        this.servicesService = servicesService;
        this.http = http;
        this._current = 1;
        this.data = '';
        this.title = '应用商城';
        this.mirrorImgUrl = 'assets/service/mysql.png';
        this.appName = 'private';
        this.titleFilter = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]();
        this.appOutput = new __WEBPACK_IMPORTED_MODULE_1__shared_header_header_component__["a" /* AppOutput */]('', 0);
        this.tabs = [
            {
                index: 1,
                name: '我的应用',
                tabName: 'private',
                disabled: false
            },
            {
                index: 2,
                name: '公共应用',
                tabName: 'public',
                disabled: true
            }
        ];
    }
    AppStoreComponent.prototype.buyHandler = function (event) {
        this.appOutput = event;
    };
    AppStoreComponent.prototype.titleHandler = function (event) {
        this.childTitle = event;
    };
    AppStoreComponent.prototype.groupidHandler = function (event) {
        console.log('change event: ' + event);
        console.log('change event this.groupid: ' + this.groupid);
        this.groupid = event;
        // console.log('change！！ get groupid: ' + this.groupid);
        // console.log('change！！ cookie: ' + this.servicesService.getCookie('groupID'));
    };
    AppStoreComponent.prototype.changeAppName = function (appName) {
        this.appName = appName;
        console.log('changeAppName');
    };
    AppStoreComponent.prototype.ngOnInit = function () {
        /*// this.groupList = ['BDOC-TEST-11?5', 'test111?8', 'asd?7'];
        // 如果groupid是空的，去cookie里面取得默认值
        if (this.groupid = 'undefined') {
            console.log('groupid = \'undefined\': ' + this.groupid);

            this.groupid = this.servicesService.getCookie('groupID');
            console.log('groupid = \'2222222\': ' + this.groupid);

        }
        console.log('groupList: ' + this.groupList);
        console.log('groupID 默认: ' + this.groupid);
        console.log('groupID cookie: ' + this.servicesService.getCookie('groupID'));

        // 订阅op的group流
        this.servicesService.getGroupList().subscribe((data) => {
            // 过滤出需要的数据，拼接成一个array
             this.groupList  =  this.servicesService.getGroupNameList(data);
            console.log('groupList: ' + this.groupList);
        });*/
    };
    return AppStoreComponent;
}());
AppStoreComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-app-store',
        template: __webpack_require__("../../../../../src/app/app-store/app-store.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-store/app-store.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_services_service__["a" /* ServicesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */]) === "function" && _b || Object])
], AppStoreComponent);

var _a, _b;
//# sourceMappingURL=app-store.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#sider{\n    -webkit-box-flex: 0 !important;\n        -ms-flex: 0 0 180px !important;\n            flex: 0 0 180px !important;\n    width: 180px !important;\n    background-color: #404962 !important;\n    background: #404962 !important;\n    color:rgba(255, 255, 255, 0.647)!important;\n    font-size: 14px !important;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<nz-layout style=\"height:100%\">\n  <nz-sider id=\"sider\" nzCollapsible [(nzCollapsed)]=\"isCollapsed\" [nzTrigger]=\"null\">\n        <app-navbar></app-navbar>\n    </nz-sider>\n    <nz-layout style=\"height: 100%;background-color: #fff\">\n        <router-outlet></router-outlet>\n    </nz-layout>\n</nz-layout>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.isCollapsed = false;
        this.title = '贵州pass平台';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateHttpLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_http_loader__ = __webpack_require__("../../../../@ngx-translate/http-loader/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dynamic_form_dynamic_form_module__ = __webpack_require__("../../../../../src/app/dynamic-form/dynamic-form.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__navbar_navbar_component__ = __webpack_require__("../../../../../src/app/navbar/navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__search_search_component__ = __webpack_require__("../../../../../src/app/search/search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__tab_tab_component__ = __webpack_require__("../../../../../src/app/tab/tab.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_list_applist_component__ = __webpack_require__("../../../../../src/app/app-list/applist.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_application_service__ = __webpack_require__("../../../../../src/app/shared/application.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_detail_app_detail_component__ = __webpack_require__("../../../../../src/app/app-detail/app-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__app_store_app_store_component__ = __webpack_require__("../../../../../src/app/app-store/app-store.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__app_overview_app_overview_component__ = __webpack_require__("../../../../../src/app/app-overview/app-overview.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__mirror_store_mirror_store_component__ = __webpack_require__("../../../../../src/app/mirror-store/mirror-store.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__file_center_file_center_component__ = __webpack_require__("../../../../../src/app/file-center/file-center.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__code404_code404_component__ = __webpack_require__("../../../../../src/app/code404/code404.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pipe_app_filter_pipe__ = __webpack_require__("../../../../../src/app/pipe/app-filter.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__shared_random_user_service__ = __webpack_require__("../../../../../src/app/shared/random-user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__service_catalog_service_catalog_component__ = __webpack_require__("../../../../../src/app/service-catalog/service-catalog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__service_instance_service_instance_component__ = __webpack_require__("../../../../../src/app/service-instance/service-instance.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__service_list_service_list_component__ = __webpack_require__("../../../../../src/app/service-list/service-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__service_detail_service_detail_component__ = __webpack_require__("../../../../../src/app/service-detail/service-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__repository_detail_repository_detail_component__ = __webpack_require__("../../../../../src/app/repository-detail/repository-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__service_release_service_release_component__ = __webpack_require__("../../../../../src/app/service-release/service-release.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__service_instance_detail_service_instance_detail_component__ = __webpack_require__("../../../../../src/app/service-instance-detail/service-instance-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__component_test_component_test_component__ = __webpack_require__("../../../../../src/app/component-test/component-test.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__app_release_app_release_component__ = __webpack_require__("../../../../../src/app/app-release/app-release.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__app_deploy_app_deploy_component__ = __webpack_require__("../../../../../src/app/app-deploy/app-deploy.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__container_instance_container_instance_component__ = __webpack_require__("../../../../../src/app/container-instance/container-instance.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__service_subscribe_service_subscribe_component__ = __webpack_require__("../../../../../src/app/service-subscribe/service-subscribe.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__build_image_build_image_component__ = __webpack_require__("../../../../../src/app/build-image/build-image.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__group_select_group_select_component__ = __webpack_require__("../../../../../src/app/group-select/group-select.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_angular2_cookie_core__ = __webpack_require__("../../../../angular2-cookie/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_angular2_cookie_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_43_angular2_cookie_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__util_error_interceptor_error_interceptor_component__ = __webpack_require__("../../../../../src/app/util/error-interceptor/error-interceptor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__service_test_service_test_service__ = __webpack_require__("../../../../../src/app/service-test/service-test.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__app_overview_detail_app_overview_detail_component__ = __webpack_require__("../../../../../src/app/app-overview-detail/app-overview-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__util_reg_pattern_reg_name_directive__ = __webpack_require__("../../../../../src/app/util/reg-pattern/reg-name.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__app_nztable_app_nztable_component__ = __webpack_require__("../../../../../src/app/app-nztable/app-nztable.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__app_overview_detail_detail_app_overview_detail_detail_component__ = __webpack_require__("../../../../../src/app/app-overview-detail-detail/app-overview-detail-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__mirror_store_list_mirror_store_list_component__ = __webpack_require__("../../../../../src/app/mirror-store-list/mirror-store-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__build_image_category_build_image_category_component__ = __webpack_require__("../../../../../src/app/build-image-category/build-image-category.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pipe_service_pipe_pipe__ = __webpack_require__("../../../../../src/app/pipe/service-pipe.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__configs_config_control_config_control_component__ = __webpack_require__("../../../../../src/app/configs/config-control/config-control.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__configs_build_config_build_config_component__ = __webpack_require__("../../../../../src/app/configs/build-config/build-config.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__configs_config_detail_config_detail_component__ = __webpack_require__("../../../../../src/app/configs/config-detail/config-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__configs_add_config_add_config_component__ = __webpack_require__("../../../../../src/app/configs/add-config/add-config.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__configs_edit_config_edit_config_component__ = __webpack_require__("../../../../../src/app/configs/edit-config/edit-config.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__app_instance_detail_detail_app_instance_detail_detail_component__ = __webpack_require__("../../../../../src/app/app-instance-detail-detail/app-instance-detail-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__opera_overview_opera_overview_component__ = __webpack_require__("../../../../../src/app/opera-overview/opera-overview.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__opera_event_opera_event_component__ = __webpack_require__("../../../../../src/app/opera-event/opera-event.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__opera_log_opera_log_component__ = __webpack_require__("../../../../../src/app/opera-log/opera-log.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__service_approve_service_approve_component__ = __webpack_require__("../../../../../src/app/service-approve/service-approve.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__opera_monitor_opera_monitor_module__ = __webpack_require__("../../../../../src/app/opera-monitor/opera-monitor.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__app_monitor_app_monitor_component__ = __webpack_require__("../../../../../src/app/app-monitor/app-monitor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__app_logs_app_logs_component__ = __webpack_require__("../../../../../src/app/app-logs/app-logs.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';


























































function createTranslateHttpLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_7__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_11__navbar_navbar_component__["a" /* NavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_12__search_search_component__["a" /* SearchComponent */],
            __WEBPACK_IMPORTED_MODULE_13__tab_tab_component__["a" /* TabComponent */],
            __WEBPACK_IMPORTED_MODULE_14__app_list_applist_component__["a" /* ApplistComponent */],
            __WEBPACK_IMPORTED_MODULE_16__app_detail_app_detail_component__["a" /* AppDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_18__app_store_app_store_component__["a" /* AppStoreComponent */],
            __WEBPACK_IMPORTED_MODULE_19__app_overview_app_overview_component__["a" /* AppOverviewComponent */],
            __WEBPACK_IMPORTED_MODULE_20__mirror_store_mirror_store_component__["a" /* MirrorStoreComponent */],
            __WEBPACK_IMPORTED_MODULE_21__file_center_file_center_component__["a" /* FileCenterComponent */],
            __WEBPACK_IMPORTED_MODULE_22__code404_code404_component__["a" /* Code404Component */],
            __WEBPACK_IMPORTED_MODULE_23__pipe_app_filter_pipe__["a" /* AppFilterPipe */],
            __WEBPACK_IMPORTED_MODULE_27__service_catalog_service_catalog_component__["a" /* ServiceCatalogComponent */],
            __WEBPACK_IMPORTED_MODULE_28__service_instance_service_instance_component__["a" /* ServiceInstanceComponent */],
            __WEBPACK_IMPORTED_MODULE_29__service_list_service_list_component__["a" /* ServiceListComponent */],
            __WEBPACK_IMPORTED_MODULE_31__service_detail_service_detail_component__["a" /* ServiceDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_32__repository_detail_repository_detail_component__["a" /* RepositoryDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_33__service_release_service_release_component__["a" /* ServiceReleaseComponent */],
            __WEBPACK_IMPORTED_MODULE_34__service_instance_detail_service_instance_detail_component__["a" /* ServiceInstanceDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_35__component_test_component_test_component__["a" /* ComponentTestComponent */],
            __WEBPACK_IMPORTED_MODULE_36__app_release_app_release_component__["a" /* AppReleaseComponent */],
            __WEBPACK_IMPORTED_MODULE_38__app_deploy_app_deploy_component__["a" /* AppDeployComponent */],
            __WEBPACK_IMPORTED_MODULE_39__container_instance_container_instance_component__["a" /* ContainerInstanceComponent */],
            __WEBPACK_IMPORTED_MODULE_40__service_subscribe_service_subscribe_component__["a" /* ServiceSubscribeComponent */],
            __WEBPACK_IMPORTED_MODULE_41__build_image_build_image_component__["a" /* BuildImageComponent */],
            __WEBPACK_IMPORTED_MODULE_42__group_select_group_select_component__["a" /* GroupSelectComponent */],
            __WEBPACK_IMPORTED_MODULE_44__util_error_interceptor_error_interceptor_component__["a" /* ErrorInterceptorComponent */],
            __WEBPACK_IMPORTED_MODULE_46__app_overview_detail_app_overview_detail_component__["a" /* AppOverviewDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_47__util_reg_pattern_reg_name_directive__["b" /* RegNameDirective */],
            __WEBPACK_IMPORTED_MODULE_48__app_nztable_app_nztable_component__["a" /* AppNztableComponent */],
            __WEBPACK_IMPORTED_MODULE_49__app_overview_detail_detail_app_overview_detail_detail_component__["a" /* AppOverviewDetailDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_50__mirror_store_list_mirror_store_list_component__["a" /* MirrorStoreListComponent */],
            __WEBPACK_IMPORTED_MODULE_51__build_image_category_build_image_category_component__["a" /* BuildImageCategoryComponent */],
            __WEBPACK_IMPORTED_MODULE_52__pipe_service_pipe_pipe__["a" /* ServicePipePipe */],
            __WEBPACK_IMPORTED_MODULE_53__configs_config_control_config_control_component__["a" /* ConfigControlComponent */],
            __WEBPACK_IMPORTED_MODULE_54__configs_build_config_build_config_component__["a" /* BuildConfigComponent */],
            __WEBPACK_IMPORTED_MODULE_55__configs_config_detail_config_detail_component__["a" /* ConfigDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_56__configs_add_config_add_config_component__["a" /* AddConfigComponent */],
            __WEBPACK_IMPORTED_MODULE_57__configs_edit_config_edit_config_component__["a" /* EditConfigComponent */],
            __WEBPACK_IMPORTED_MODULE_58__app_instance_detail_detail_app_instance_detail_detail_component__["a" /* AppInstanceDetailDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_59__opera_overview_opera_overview_component__["a" /* OperaOverviewComponent */],
            __WEBPACK_IMPORTED_MODULE_60__opera_event_opera_event_component__["a" /* OperaEventComponent */],
            __WEBPACK_IMPORTED_MODULE_61__opera_log_opera_log_component__["a" /* OperaLogComponent */],
            __WEBPACK_IMPORTED_MODULE_62__service_approve_service_approve_component__["a" /* ServiceApproveComponent */],
            __WEBPACK_IMPORTED_MODULE_64__app_monitor_app_monitor_component__["a" /* AppMonitorComponent */],
            __WEBPACK_IMPORTED_MODULE_65__app_logs_app_logs_component__["a" /* AppLogsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_17__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_24_ng_zorro_antd__["a" /* NgZorroAntdModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_25__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_10__dynamic_form_dynamic_form_module__["a" /* DynamicFormModule */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_file_upload__["FileUploadModule"],
            __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__["a" /* SharedModule */],
            // 国际化翻译配置
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateHttpLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClient */]]
                }
            }),
            __WEBPACK_IMPORTED_MODULE_63__opera_monitor_opera_monitor_module__["OperaMonitorModule"]
            // InMemoryWebApiModule.forRoot(InMemoryDataService)
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_15__shared_application_service__["a" /* ApplicationService */],
            __WEBPACK_IMPORTED_MODULE_26__shared_random_user_service__["a" /* RandomUserService */],
            __WEBPACK_IMPORTED_MODULE_30__shared_services_service__["a" /* ServicesService */],
            __WEBPACK_IMPORTED_MODULE_43_angular2_cookie_core__["CookieService"],
            __WEBPACK_IMPORTED_MODULE_45__service_test_service_test_service__["a" /* ServiceTestService */],
            __WEBPACK_IMPORTED_MODULE_37__angular_common__["DatePipe"],
            { provide: __WEBPACK_IMPORTED_MODULE_37__angular_common__["LocationStrategy"], useClass: __WEBPACK_IMPORTED_MODULE_37__angular_common__["HashLocationStrategy"] },
            // 全局异常捕捉
            {
                provide: __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                useClass: __WEBPACK_IMPORTED_MODULE_44__util_error_interceptor_error_interceptor_component__["a" /* ErrorInterceptorComponent */],
                multi: true,
            }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/build-image-category/build-image-category.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <nz-layout>\n    <nz-header style=\"line-height:32px\">\n      <a style=\"font-size: 16px\" href=\"#/repositoryStore\">\n        <返回</a>\n      <p style=\"font-size: 16px\">上传镜像</p>\n    </nz-header>\n    <nz-content>\n      <div nz-row>\n        <dynamic-form [config]=\"formConfig\" (submit)=\"submit($event)\">\n        </dynamic-form>\n        <!-- <span>\n          <button nz-button [nzType]=\"'default'\" (click)=\"pre()\">\n            <span>取消</span>\n          </button>\n        </span> -->\n      </div>\n    </nz-content>\n    <nz-footer>\n\n    </nz-footer>\n  </nz-layout>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/build-image-category/build-image-category.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "nz-layout {\n  background: #fff;\n  padding: 20px; }\n\nnz-header, nz-content, nz-footer {\n  background: #fff; }\n\nnz-header {\n  padding: 0;\n  width: 80%;\n  margin-bottom: 20px;\n  border-bottom: 1px solid #ddd; }\n\nnz-content {\n  padding: 0; }\n  nz-content span {\n    height: 30px;\n    line-height: 30px; }\n  nz-content .file {\n    margin-left: 10px;\n    cursor: pointer;\n    width: 90px;\n    position: relative;\n    display: inline-block;\n    border: 1px solid #99D3F5;\n    border-radius: 4px;\n    padding: 4px 12px;\n    overflow: hidden;\n    color: #1E88C7;\n    text-decoration: none;\n    text-indent: 0;\n    height: 30px;\n    line-height: 20px; }\n    nz-content .file input {\n      cursor: pointer;\n      position: absolute;\n      font-size: 100px;\n      right: 0;\n      top: 0;\n      opacity: 0; }\n    nz-content .file:hover {\n      cursor: pointer;\n      background: #AADFFD;\n      border-color: #78C3F3;\n      color: #004974;\n      text-decoration: none; }\n  nz-content .ant-row {\n    margin-bottom: 10px; }\n\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05); }\n\n.my-drop-zone {\n  border: dotted 1px lightgray; }\n\n.nv-file-ove {\n  border: dotted 1px red; }\n\n.ant-table-thead > tr > th {\n  padding: 8px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/build-image-category/build-image-category.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuildImageCategoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dynamic_form_containers_dynamic_form_dynamic_form_component__ = __webpack_require__("../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var BuildImageCategoryComponent = (function () {
    function BuildImageCategoryComponent(_notification, routeInfo, router, http, confirmServ, servicesService) {
        var _this = this;
        this._notification = _notification;
        this.routeInfo = routeInfo;
        this.router = router;
        this.http = http;
        this.confirmServ = confirmServ;
        this.servicesService = servicesService;
        this.mirror_tabs = [
            {
                index: 0,
                name: '其他'
            },
            {
                index: 1,
                name: '操作系统'
            },
            {
                index: 2,
                name: '运行环境'
            },
            {
                index: 3,
                name: '中间件'
            },
            {
                index: 4,
                name: '数据库'
            },
            {
                index: 5,
                name: '微服务框架'
            },
            {
                index: 6,
                name: '大数据'
            },
            {
                index: 7,
                name: '应用'
            }
        ];
        this.mirror_tabs2 = [
            '其他', '操作系统', '运行环境', '中间件', '数据库', '微服务框架', '大数据', '应用'
        ];
        this.radioValue = 'newImage';
        this.images = [];
        this.formConfig = [
            {
                type: 'input',
                label: '镜像名称',
                name: 'imageName',
                placeholder: '请输入镜像名称',
                validation: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/i), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(20)],
                styles: {
                    'width': '400px'
                }
            },
            {
                type: 'select',
                label: '镜像分类',
                name: 'imageCatelogy',
                options: this.mirror_tabs2,
                placeholder: '请选择镜像分类',
                validation: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required],
                styles: {
                    'width': '400px'
                },
            },
            {
                type: 'input',
                label: '镜像描述',
                name: 'description',
                placeholder: '请输入镜像描述',
                validation: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(20)],
                notNecessary: true,
                inputType: 'textarea',
                styles: {
                    'width': '400px'
                }
            },
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
        this.createNotification = function (type, title, content) {
            _this._notification.create(type, title, content);
        };
    }
    BuildImageCategoryComponent.prototype.ngOnInit = function () {
        this.mirrorName = this.routeInfo.snapshot.params['mirrorName'];
        this.getImageOrigin();
    };
    BuildImageCategoryComponent.prototype.getImageOrigin = function () {
        var _this = this;
        this.http.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/registry').subscribe(function (data) {
            var dataValue = data;
            _this.imageOriginId = dataValue['id'];
            // this.imageOriginId = dataValue.id;
        });
    };
    BuildImageCategoryComponent.prototype.getImageCateGoryID = function (cateName) {
        if (cateName == '' || cateName == null) {
            return 0;
        }
        else {
            for (var i = 0; i < this.mirror_tabs.length; i++) {
                if (this.mirror_tabs[i].name == cateName) {
                    return this.mirror_tabs[i].index;
                }
            }
        }
    };
    BuildImageCategoryComponent.prototype.submit = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadImage(value)];
                    case 1:
                        _a.sent();
                        console.log('镜像上传');
                        return [2 /*return*/];
                }
            });
        });
    };
    BuildImageCategoryComponent.prototype.loadImage = function (formValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log('formValue', formValue);
                this.imageCatelogyID = this.getImageCateGoryID(formValue.imageCatelogy);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        console.log('测试promise', _this);
                        _this.http.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].api + '/api/' + _this.servicesService.getCookie('groupID') + '/warehouse/dir/' + formValue.imageName, {
                            "categoryId": _this.imageCatelogyID,
                            "description": formValue.description,
                            "isApp": false,
                            "registryId": _this.imageOriginId,
                        }).subscribe(function (response) {
                            console.log('这是response', response);
                            var thisParent = _this;
                            _this.confirmServ.success({
                                maskClosable: false,
                                title: '创建镜像仓库成功!',
                                content: '点确认按钮跳转到镜像仓库列表',
                                okText: '确定',
                                onOk: function () {
                                    // .contentControl = true;
                                    // console.log('form11', thisParent.form);
                                    // const redirect = window.location.host + '/#/appStore';
                                    // window.location.href = window.location.origin + '/#/repositoryStore';
                                    thisParent.router.navigate(['repositoryStore']);
                                },
                                onCancel: function () {
                                }
                            });
                            // this.imageIdArr[key] = response;
                            // this.repositories[key] = this.imageIdArr[key]['id'];
                            resolve();
                        });
                    })];
            });
        });
    };
    BuildImageCategoryComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // setTimeout(() => {
        console.log('form11', this.form.controls);
        this.form.setDisabled('submit', true);
        // }, 0);
        var previousValid = this.form.valid;
        this.form.changes.subscribe(function () {
            if (_this.form.valid !== previousValid) {
                previousValid = _this.form.valid;
                _this.form.setDisabled('submit', !previousValid);
            }
        });
    };
    return BuildImageCategoryComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _a || Object)
], BuildImageCategoryComponent.prototype, "form", void 0);
BuildImageCategoryComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-build-image-category',
        template: __webpack_require__("../../../../../src/app/build-image-category/build-image-category.component.html"),
        styles: [__webpack_require__("../../../../../src/app/build-image-category/build-image-category.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClient */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5_ng_zorro_antd__["c" /* NzModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ng_zorro_antd__["c" /* NzModalService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__shared_services_service__["a" /* ServicesService */]) === "function" && _g || Object])
], BuildImageCategoryComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=build-image-category.component.js.map

/***/ }),

/***/ "../../../../../src/app/build-image/build-image.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <p>\n  build-image works!\n</p> -->\n<div>\n  <nz-layout>\n    <nz-header style=\"line-height:32px\">\n      <a style=\"font-size: 16px\" href=\"#/repositoryStore\">\n        <返回</a>\n          <p style=\"font-size: 16px\">上传镜像</p>\n    </nz-header>\n    <nz-content>\n      <div nz-row>\n        <div nz-col [nzSpan]=\"4\">\n          <span style=\"display: block;\n            font-size: 13px;\n            font-weight: 400;\n            letter-spacing: 0px;\n            margin-bottom: 10px;\n            text-align:right;\n            color: rgba(0, 0, 0, 0.9);\">选择镜像</span>\n        </div>\n        <nz-tooltip>\n          <ng-template #nzTemplate>\n            <p>文件名称不能是中文</p>\n            <p>文件格式: tar</p>\n          </ng-template>\n        <div nz-tooltip nz-col [nzSpan]=\"18\" class=\"file\">选择镜像\n          <input #fileInput type=\"file\" ng2FileSelect [uploader]=\"uploader\" (change)=\"FileSelected('image')\">\n        </div>\n        </nz-tooltip>\n      </div>\n      <div *ngIf=\"_dataSet.length !== 0\" style=\"margin-left: 10px; margin-top: 4px\" nz-row>\n        <!-- <div>\n          111 {{ uploader?.queue?.length }} 222 {{ uploader?.queue }} 333 {{ _dataSet }}\n        </div> -->\n        <div nz-col [nzSpan]=\"4\"></div>\n        <div nz-col [nzSpan]=\"10\">\n          <!-- 这里先把分页去掉，nzAjaxData方式，获取分页有点问题，有想法是把uploader.queue的队列，放到一个服务器上，\n          然后在这里实现分页，最后在我这里进行nzAjaxData远程异步获取，可以看nzAjaxData在官网的实例 -->\n          <nz-table #nzTable [nzScroll]=\"{ y: 240 }\" [nzShowSizeChanger]=\"true\" [nzAjaxData]=\"_dataSet\"\n            [nzIsPagination]=\"false\">\n            <ng-template #nzFixedHeader>\n              <thead nz-thead>\n                <tr>\n                  <th nz-th>\n                    <span>镜像上传</span>\n                  </th>\n                  <!-- <th nz-th>\n                    <span>文件上传状态</span>\n                  </th>\n                  <th nz-th>\n                    <span>操作</span>\n                  </th> -->\n                </tr>\n              </thead>\n            </ng-template>\n            <tbody nz-tbody>\n              <tr nz-tbody-tr *ngFor=\"let item of nzTable.data\">\n                <td nz-td>\n                  <i class=\"anticon anticon-paper-clip\"></i>\n                  <strong>{{ item?.file?.name }}</strong>\n                  <!-- <strong>\n                    {{ item.progress }}\n                  </strong> -->\n                </td>\n                <!-- <td *ngIf=\"uploader.isHTML5\">\n                  <div class=\"progress\" style=\"margin-bottom: 0;\">\n                    <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': item.progress + '%' }\"></div>\n                  </div>\n                </td> -->\n                <td nz-td>\n                  <button nz-button [nzType]=\"'default'\" type=\"button\" (click)=\"item.upload()\" [disabled]=\"item.isReady || item.isUploading || item.isSuccess\">\n                    上传\n                  </button>\n                  <button nz-button [nzType]=\"'default'\" type=\"button\" (click)=\"item.cancel()\" [disabled]=\"!item.isUploading\">\n                    取消\n                  </button>\n                  <button nz-button [nzType]=\"'default'\" type=\"button\" (click)=\"item.remove()\" [disabled]=\"item.isSuccess\">\n                    删除\n                  </button>\n                </td>\n                <td nz-td>\n                  <span *ngIf=\"item.isSuccess\">上传成功</span>\n                  <span *ngIf=\"item.isCancel\">取消上传</span>\n                  <span *ngIf=\"item.isError\">上传失败</span>\n                </td>\n              </tr>\n            </tbody>\n          </nz-table>\n        </div>\n      </div>\n      <div nz-row>\n       <!-- <div nz-row>\n          <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n            <span style=\"display: block;\n              font-size: 13px;\n              font-weight: 400;\n              letter-spacing: 0px;\n              margin-bottom: 10px;\n              color: rgba(0, 0, 0, 0.9);\">是否上传新镜像</span>\n          </div>\n          <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n            <nz-radio-group (click)=\"toggleRadio()\" [(ngModel)]=\"this.radioValue\">\n              <label nz-radio [nzValue]=\"'newImage'\">\n                <span>是</span>\n              </label>\n              <label nz-radio [nzValue]=\"'notNewImage'\">\n                <span>否</span>\n              </label>\n            </nz-radio-group>\n          </div>\n          &lt;!&ndash; <div>\n           {{ testValue }}\n          </div> &ndash;&gt;\n        </div>-->\n        <dynamic-form [config]=\"formConfig\" (submit)=\"submit($event)\">\n        </dynamic-form>\n        <!-- <span>\n          <button nz-button [nzType]=\"'default'\" (click)=\"pre()\">\n            <span>取消</span>\n          </button>\n        </span> -->\n      </div>\n    </nz-content>\n    <nz-footer>\n\n    </nz-footer>\n  </nz-layout>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/build-image/build-image.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "nz-layout {\n  background: #fff;\n  padding: 20px; }\n\nnz-header, nz-content, nz-footer {\n  background: #fff; }\n\nnz-header {\n  padding: 0;\n  width: 80%;\n  margin-bottom: 20px;\n  border-bottom: 1px solid #ddd; }\n\nnz-content {\n  padding: 0; }\n  nz-content span {\n    height: 30px;\n    line-height: 30px; }\n  nz-content .file {\n    margin-left: 10px;\n    cursor: pointer;\n    width: 90px;\n    position: relative;\n    display: inline-block;\n    border: 1px solid #99D3F5;\n    border-radius: 4px;\n    padding: 4px 12px;\n    overflow: hidden;\n    color: #1E88C7;\n    text-decoration: none;\n    text-indent: 0;\n    height: 30px;\n    line-height: 20px; }\n    nz-content .file input {\n      cursor: pointer;\n      position: absolute;\n      font-size: 100px;\n      right: 0;\n      top: 0;\n      opacity: 0; }\n    nz-content .file:hover {\n      cursor: pointer;\n      background: #AADFFD;\n      border-color: #78C3F3;\n      color: #004974;\n      text-decoration: none; }\n  nz-content .ant-row {\n    margin-bottom: 10px; }\n\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05); }\n\n.my-drop-zone {\n  border: dotted 1px lightgray; }\n\n.nv-file-ove {\n  border: dotted 1px red; }\n\n.ant-table-thead > tr > th {\n  padding: 8px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/build-image/build-image.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuildImageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dynamic_form_containers_dynamic_form_dynamic_form_component__ = __webpack_require__("../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};











// import { NameValidator } from '../util/reg-pattern/reg-name.directive';
var BuildImageComponent = (function () {
    function BuildImageComponent(_notification, routeInfo, router, http, confirmServ, servicesService) {
        var _this = this;
        this._notification = _notification;
        this.routeInfo = routeInfo;
        this.router = router;
        this.http = http;
        this.confirmServ = confirmServ;
        this.servicesService = servicesService;
        // 这里后端api有一个Module，是存放文件的目录，比如应用，那么就是app，服务，涉及到文件上传时，就是service，镜像，就是image
        // 这里前端定义好，后面有Get请求，需要用到这个module的话，可以参照
        this.url = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].api + '/api/' + this.servicesService.getCookie('groupID') + '/upload/image/fileName/';
        // 这里的itemAlias是设置的name ="newname"，本来是name="file"，相当于form的name值
        // public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'newname' });
        this.uploader = new __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__["FileUploader"]({ url: this.url, queueLimit: 1, });
        this._dataSet = this.uploader.queue;
        this.radioValue = 'newImage';
        this.images = [];
        this.formConfig = [
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
                validation: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z0-9]([.a-zA-Z0-9]*[a-zA-Z0-9])?$/i), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(6)],
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
        this.createNotification = function (type, title, content) {
            _this._notification.create(type, title, content);
        };
    }
    BuildImageComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // setTimeout(() => {
        console.log('form11', this.form.controls);
        this.form.setDisabled('submit', true);
        // }, 0);
        var previousValid = this.form.valid;
        this.form.changes.subscribe(function () {
            if (_this.form.valid !== previousValid) {
                previousValid = _this.form.valid;
                _this.form.setDisabled('submit', !previousValid);
            }
        });
    };
    BuildImageComponent.prototype.ngOnInit = function () {
        this.mirrorName = this.routeInfo.snapshot.params['mirrorName'];
        this.repoName = this.routeInfo.snapshot.params['name'];
        console.log("mirrorName: " + this.mirrorName);
        console.log("repoName: " + this.repoName);
        this.getImageOrigin();
        this.getImages();
    };
    BuildImageComponent.prototype.FileSelected = function (uploaderType) {
        var _this = this;
        if (uploaderType === 'image') {
            console.log('文件上传完了', this.uploader);
            this.uploader.onBeforeUploadItem = function (item) {
                item.withCredentials = false;
                item.url = _this.url + item.file.name;
            };
        }
        else {
            // console.log('Icon文件上传完了', this.uploaderIcon);
            // this.uploaderIcon.onBeforeUploadItem = (item) => {
            //   item.withCredentials = false;
            //   item.url = this.urlIcon + item.file.name;
            // }
        }
    };
    BuildImageComponent.prototype.toggleRadio = function () {
        console.log(this.radioValue);
        if (this.radioValue === 'newImage') {
            this.formConfig[0] = {
                type: 'input',
                label: '镜像名称',
                name: 'imageName',
                placeholder: '请输入镜像名称',
                validation: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["h" /* Validators */].maxLength(20)],
                styles: {
                    'width': '400px'
                }
            };
            // console.log('form333', this.form);
        }
        else {
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
    };
    BuildImageComponent.prototype.submit = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadImage(value)];
                    case 1:
                        _a.sent();
                        console.log('镜像上传');
                        return [2 /*return*/];
                }
            });
        });
    };
    BuildImageComponent.prototype.loadImage = function (formValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var fileArr, fileArrErr;
            return __generator(this, function (_a) {
                fileArr = __WEBPACK_IMPORTED_MODULE_8_lodash__["map"](this._dataSet, function (value, key) {
                    if (value['isSuccess'] === true) {
                        return value['file']['name'];
                    }
                });
                fileArrErr = __WEBPACK_IMPORTED_MODULE_8_lodash__["map"](__WEBPACK_IMPORTED_MODULE_8_lodash__["compact"](fileArr), function (value, key) {
                    return value;
                });
                console.log('formValue', formValue);
                if (fileArrErr.length === 0) {
                    this.createNotification('error', '服务器错误', '请上传镜像文件!');
                }
                else {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            // 开始上传时，disable掉构建按钮
                            _this.form.setDisabled('submit', true);
                            // 这里箭头函数，解决闭包之后This指向windows的问题
                            // setTimeout(() => {
                            console.log('测试promise', _this);
                            __WEBPACK_IMPORTED_MODULE_8_lodash__["map"](__WEBPACK_IMPORTED_MODULE_8_lodash__["compact"](fileArr), function (value, key) {
                                // const repositoryName = this.radioValue === 'newImage' ? formValue.imageName + '-' +
                                // _.replace(value, '.', '') : formValue.imageName
                                _this.http.post(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].api + '/api/' + _this.servicesService.getCookie('groupID') + '/warehouse/repository?module=image', {
                                    // "description": formValue.description,
                                    "description": '',
                                    "fileName": value,
                                    "isApp": false,
                                    "registryId": _this.imageOriginId,
                                    // "description": formValue.description,
                                    // "repositoryName": formValue.imageName,
                                    "repositoryName": _this.repoName,
                                    "version": formValue.version
                                }).subscribe(function (response) {
                                    console.log('这是response', response);
                                    var thisParent = _this;
                                    _this.confirmServ.success({
                                        maskClosable: false,
                                        title: '上传镜像成功!',
                                        content: '点确认按钮跳转到镜像详情',
                                        okText: '确定',
                                        onOk: function () {
                                            // .contentControl = true;
                                            // console.log('form11', thisParent.form);
                                            // const redirect = window.location.host + '/#/appStore';
                                            // window.location.href = window.location.origin + '/#/repositoryStore';
                                            // repositoryDetail/repository/asdasdasd/private
                                            thisParent.router.navigate(['repositoryDetail', 'repository', thisParent.repoName, thisParent.mirrorName]);
                                        },
                                        onCancel: function () {
                                        }
                                    });
                                    // this.imageIdArr[key] = response;
                                    // this.repositories[key] = this.imageIdArr[key]['id'];
                                    resolve();
                                }, function (err) {
                                    console.log(err._body);
                                    _this.createNotification('error', '创建失败', err._body);
                                });
                            });
                            // resolve();
                            // }, 0);
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    BuildImageComponent.prototype.getImageOrigin = function () {
        var _this = this;
        this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/registry').subscribe(function (data) {
            var dataValue = data;
            _this.imageOriginId = dataValue['id'];
            // this.imageOriginId = dataValue.id;
        });
    };
    BuildImageComponent.prototype.getImages = function () {
        var _this = this;
        this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/repository?region=' + this.mirrorName).subscribe(function (data) {
            _this.images = __WEBPACK_IMPORTED_MODULE_8_lodash__["map"](data['images'], function (value, key) {
                return value['repositoryName'];
            });
        });
    };
    return BuildImageComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_4__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _a || Object)
], BuildImageComponent.prototype, "form", void 0);
BuildImageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-build-image',
        template: __webpack_require__("../../../../../src/app/build-image/build-image.component.html"),
        styles: [__webpack_require__("../../../../../src/app/build-image/build-image.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClient */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6_ng_zorro_antd__["c" /* NzModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ng_zorro_antd__["c" /* NzModalService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_9__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__shared_services_service__["a" /* ServicesService */]) === "function" && _g || Object])
], BuildImageComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=build-image.component.js.map

/***/ }),

/***/ "../../../../../src/app/code404/code404.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/code404/code404.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  code404 !!!!找不到页面！！！！\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/code404/code404.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Code404Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Code404Component = (function () {
    function Code404Component() {
    }
    Code404Component.prototype.ngOnInit = function () {
    };
    return Code404Component;
}());
Code404Component = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-code404',
        template: __webpack_require__("../../../../../src/app/code404/code404.component.html"),
        styles: [__webpack_require__("../../../../../src/app/code404/code404.component.css")]
    }),
    __metadata("design:paramtypes", [])
], Code404Component);

//# sourceMappingURL=code404.component.js.map

/***/ }),

/***/ "../../../../../src/app/component-test/component-test.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  component-test works!\n</p>\n<div class=\"marginTop20\">全局css样式测试</div>\n<!-- 动态表单测试 -->\n<div class=\"app\">\n  <!-- <dynamic-form [config]=\"config\" form=\"dynamicForm\" (submit)=\"submit($event)\"> -->\n  <dynamic-form #form [config]=\"config\" (submit)=\"submit($event)\">\n  </dynamic-form>\n\n  <dynamic-form #form2 [config]=\"config2\">\n  </dynamic-form>\n\n  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n    <span style=\"display: block;\n            font-size: 13px;\n            font-weight: 400;\n            letter-spacing: 0px;\n            margin-bottom: 10px;\n            color: rgba(0, 0, 0, 0.9);\">资源池</span>\n  </div>\n  <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n    <!-- <nz-radio-group [(ngModel)]=\"this.radioValue\" (click)=\"toggleButton()\"> -->\n    <nz-radio-group (click)=\"toggleRadio()\" [(ngModel)]=\"this.radioValue\">\n      <label nz-radio [nzValue]=\"'prodDomain'\" style=\"margin-right: 25px\">\n        <span>生产域</span>\n        <!-- <nz-tooltip [nzPlacement]=\"'rightTop'\">\n          <i nz-tooltip class=\"anticon anticon-question-circle-o\" style=\"position: absolute; right: -10px;\"></i>\n          <ng-template #nzTemplate>\n            <div>\n              <p>如果选了生产域</p>\n              <p>每个镜像的基本配置中添加区域选项(互联网、portal、核心)</p>\n              <p>\n                每个服务的基本配置中添加区域选项(互联网、portal、核心)\n              </p>\n            </div>\n          </ng-template>\n        </nz-tooltip> -->\n        <!-- <i class=\"anticon anticon-question-circle-o\" style=\"position: absolute; right: -10px;\"></i> -->\n      </label>\n      <label nz-radio [nzValue]=\"'testDomain'\">\n        <span>测试域</span>\n      </label>\n    </nz-radio-group>\n  </div>\n  <!-- <dynamic-form #form3 [config]=\"config3\" *ngFor=\"let config of formConfigArr\"> -->\n  <dynamic-form #form3 [config]=\"config3\">\n  </dynamic-form>\n  <!-- {{ form.valid }} {{ form.value | json }} -->\n</div>\n\n<!-- ng-zorro-antd 表格分页测试 -->\n<nz-table #nzTable [nzScroll]=\"{ y: 240 }\" [nzShowTotal]=\"true\" [nzDataSource]=\"_dataSet\" [nzPageSize]=\"10\" [nzShowSizeChanger]=\"true\">\n  <ng-template #nzFixedHeader>\n    <thead nz-thead #nzFixedHeader>\n      <tr>\n        <th nz-th>\n          <span>Name</span>\n        </th>\n        <th nz-th>\n          <span>Age</span>\n        </th>\n        <th nz-th>\n          <span>Address</span>\n        </th>\n      </tr>\n    </thead>\n  </ng-template>\n  <tbody nz-tbody>\n    <tr nz-tbody-tr *ngFor=\"let data of nzTable.data\">\n      <td nz-td>\n        <a>{{data.name}}</a>\n      </td>\n      <td nz-td>{{data.age}}</td>\n      <td nz-td>{{data.address}}</td>\n    </tr>\n  </tbody>\n</nz-table>\n\n<!-- 子组件测试 -->\n<app-container-instance [config]=\"instanceConfig\" [major]=\"major\">\n\n</app-container-instance>\n\n<!-- 国际化翻译测试 -->\n<div>\n  <span> test the i18n module: ngx-translate</span>\n  <h1>{{ 'helloyou' | translate }}</h1>\n</div>\n\n<div>{{ component.getValue }}</div>\n\n<!-- 测试viewChildren：https://angular.io/api/core/ViewChildren -->\n<!-- <pane id=\"1\"></pane>\n<pane id=\"2\"></pane>\n<pane id=\"3\" *ngIf=\"shouldShow\"></pane>\n\n<button (click)=\"show()\">Show 3</button>\n\n<div>panes: {{serializedPanes}}</div> -->\n\n<!-- <app-container-instance *ngFor=\"let voter of voters\" [name]=\"voter\" (onVoted)=\"onVoted($event)\">\n\n</app-container-instance> -->\n\n<h1>Welcome to Angular World</h1>\n<p #greet>Hello {{ name }}</p>\n\n<!-- <dynamic-form #form3 [config]=\"config3\" *ngFor=\"let data of configArr\">\n  </dynamic-form> -->"

/***/ }),

/***/ "../../../../../src/app/component-test/component-test.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/component-test/component-test.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentTestComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__ = __webpack_require__("../../../../rxjs/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dynamic_form_containers_dynamic_form_dynamic_form_component__ = __webpack_require__("../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__container_instance_container_instance_component__ = __webpack_require__("../../../../../src/app/container-instance/container-instance.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_reg_pattern_reg_name_directive__ = __webpack_require__("../../../../../src/app/util/reg-pattern/reg-name.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dynamic_form_services_component_service_service__ = __webpack_require__("../../../../../src/app/dynamic-form/services/component-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









// @Directive({ selector: 'pane' })
// export class Pane {
//   @Input() id: string;
// }
var ComponentTestComponent = (function () {
    function ComponentTestComponent(translateService, component) {
        this.translateService = translateService;
        this.component = component;
        // 测试
        this.radioValue = 'prodDomain';
        this.major = 1;
        this.agreed = 0;
        this.disagreed = 0;
        this.voters = ['Mr. IQ', 'Ms. Universe', 'Bombasto'];
        this.instanceConfig = [
            {
                instance_size: 'XXS',
                cpuSize: '0.125核',
                memSize: '256MB',
                focused: false,
                currentClass: {
                    'focused': false
                }
            },
            {
                instance_size: 'XS',
                cpuSize: '0.25核',
                memSize: '512MB',
                focused: false,
                currentClass: {
                    'focused': false
                }
            },
            {
                instance_size: 'S',
                cpuSize: '0.5核',
                memSize: '1GB',
                focused: false,
                currentClass: {
                    'focused': false
                }
            },
            {
                instance_size: 'M',
                cpuSize: '1核',
                memSize: '2GB',
                focused: false,
                currentClass: {
                    'focused': false
                }
            },
        ];
        this._dataSet = [];
        this.config = [
            {
                type: 'input',
                label: 'Full name',
                name: 'Fname',
                placeholder: 'Enter your Fname',
                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, Object(__WEBPACK_IMPORTED_MODULE_7__util_reg_pattern_reg_name_directive__["a" /* NameValidator */])('name', /^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/i)],
                // [null, Validators.compose([Validators.required, Validators.minLength(6)]), nicknameValidator.bind(this)]
                styles: {
                    'width': '400px',
                }
            },
            {
                type: 'input',
                label: 'Last name',
                name: 'Lname',
                placeholder: 'Enter your Lname',
                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].minLength(4)],
                styles: {
                    'width': '400px',
                }
            },
            {
                // selectedOption: undefined,
                ifTags: 'true',
                type: 'select',
                label: 'Favourite Food',
                name: 'food',
                options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
                placeholder: 'Select an option',
                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
                styles: {
                    'width': '400px',
                },
                valueUpdate: true
            },
            {
                label: 'Submit',
                name: 'submit',
                type: 'button',
                styles: {}
            }
        ];
        this.config2 = [
            {
                // selectedOption: undefined,
                // ifTags: 'true',
                type: 'select',
                label: 'Favourite2 Food',
                name: 'food2',
                options: [],
                placeholder: 'Select an option',
                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
                styles: {
                    'width': '400px',
                }
            },
        ];
        this.config3 = [
            {
                type: 'input',
                label: 'Last name1',
                name: 'Lname1',
                placeholder: 'Enter your Lname',
                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].minLength(4)],
                styles: {
                    'width': '400px',
                }
            },
        ];
        this.name = 'Semlinker';
        this.configArr = [];
        translateService.addLangs(["zh", "en"]);
        translateService.setDefaultLang("zh");
        var browserLang = this.translateService.getBrowserLang();
        translateService.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
    }
    //  测试viewChildren：https://angular.io/api/core/ViewChildren
    // @ViewChildren(Pane) panes: QueryList<Pane>;
    // serializedPanes: string = '';
    // shouldShow = false;
    // show() { this.shouldShow = true; }
    ComponentTestComponent.prototype.toggleRadio = function () {
        if (this.radioValue === 'prodDomain') {
            var config11 = [
                {
                    type: 'input',
                    label: 'Last name11',
                    name: 'Lname11',
                    placeholder: 'Enter your Lname11',
                    validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].minLength(4)],
                    styles: {
                        'width': '400px',
                    }
                },
            ];
            var i1_1;
            console.log('这是11', this.formArr.map(function (item, key) {
                // console.log('11arr', arr);
                i1_1 = item;
            }));
            this.formArr.toArray().push(i1_1);
            console.log('formarr1', this.formArr);
        }
        else {
            var config12 = [
                {
                    type: 'input',
                    label: 'Last name12',
                    name: 'Lname12',
                    placeholder: 'Enter your Lname12',
                    validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].minLength(4)],
                    styles: {
                        'width': '400px',
                    }
                },
            ];
        }
        this.form3.setConfig(this.config3);
    };
    ComponentTestComponent.prototype.getFormValue = function () {
        console.log(this.form);
    };
    ComponentTestComponent.prototype.onVoted = function (agreed) {
        agreed ? this.agreed++ : this.disagreed++;
    };
    // calculateSerializedPanes() {
    //   setTimeout(() => { this.serializedPanes = this.panes.map(p => p.id).join(', '); }, 0);
    // }
    ComponentTestComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var previousValid = this.form.valid;
        this.form.changes.subscribe(function () {
            if (_this.form.valid !== previousValid) {
                previousValid = _this.form.valid;
                _this.form.setDisabled('submit', !previousValid);
            }
        });
        this.form.setDisabled('submit', true);
        // this.calculateSerializedPanes();
        // this.panes.changes.subscribe((r) => {
        //   this.calculateSerializedPanes();
        // });
        console.dir(this.greetDiv);
        console.log('form', this.form);
        console.log('form2', this.form2);
        console.dir(this.formArr);
        // this.form.setValue({})
        // this.form.setValue('name', '');
    };
    ComponentTestComponent.prototype.submit = function (value) {
        console.log(value);
    };
    ComponentTestComponent.prototype.testObservable = function () {
        var timeA = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].interval(1000);
        var timeB = timeA.filter(function (num) {
            return num === 2;
        });
        // console.log('timeA', timeA.subscribe((value) => {
        //   return value;
        // }));
        timeA.subscribe(function (value) {
            console.log('timeA value', value);
        });
        timeB.subscribe(function (value) {
            console.log('timeB value', value);
        });
        var 九阴真经 = '天之道，损有余而补不足';
        var 黄蓉$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["ReplaySubject"](Number.MAX_VALUE);
        var 郭靖$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["ReplaySubject"](3);
        var 读书$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].from(九阴真经.split(''));
        读书$.subscribe(黄蓉$);
        读书$.subscribe(郭靖$);
        // Observable.interval(1000).subscribe((value) => {
        //   console.log('rxjs Observable test', value);
        // });
    };
    ComponentTestComponent.prototype.ngOnInit = function () {
        // for (let i = 0; i < 46; i++) {
        //   this._dataSet.push({
        //     key: i,
        //     name: `Edward King ${i}`,
        //     age: 32,
        //     address: `London, Park Lane no. ${i}`,
        //   });
        // }
        // --- set i18n begin ---
        // --- set i18n end ---
        // this.testObservable();
        // this.valueSub = this.component.componentValue$.subscribe(
        //   value => {
        //     const config2 = {
        //       // selectedOption: undefined,
        //       // ifTags: 'true',
        //       type: 'select',
        //       label: 'Favourite2 Food',
        //       name: 'food2',
        //       options: value,
        //       placeholder: 'Select an option',
        //       validation: [Validators.required],
        //       styles: {
        //         'width': '400px',
        //       },
        //     };
        //     this.form2.setValue('food2', config2);
        //   }
        // );
        this._dataSet = [
            {
                key: 0,
                name: '1212',
                age: '',
                address: '232323'
            }
        ];
    };
    return ComponentTestComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_5__container_instance_container_instance_component__["a" /* ContainerInstanceComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__container_instance_container_instance_component__["a" /* ContainerInstanceComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__container_instance_container_instance_component__["a" /* ContainerInstanceComponent */]) === "function" && _a || Object)
], ComponentTestComponent.prototype, "ContainerInstance", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_4__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _b || Object)
], ComponentTestComponent.prototype, "form", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_4__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _c || Object)
], ComponentTestComponent.prototype, "form2", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('form3'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _d || Object)
], ComponentTestComponent.prototype, "form3", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('greet'),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _e || Object)
], ComponentTestComponent.prototype, "greetDiv", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])(__WEBPACK_IMPORTED_MODULE_4__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"]) === "function" && _f || Object)
], ComponentTestComponent.prototype, "formArr", void 0);
ComponentTestComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-component-test',
        template: __webpack_require__("../../../../../src/app/component-test/component-test.component.html"),
        styles: [__webpack_require__("../../../../../src/app/component-test/component-test.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_8__dynamic_form_services_component_service_service__["a" /* ComponentServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__dynamic_form_services_component_service_service__["a" /* ComponentServiceService */]) === "function" && _h || Object])
], ComponentTestComponent);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=component-test.component.js.map

/***/ }),

/***/ "../../../../../src/app/configs/add-config/add-config.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <nz-layout>\n    <nz-header style=\"line-height:32px\">\n        <a style=\"font-size: 16px\" [routerLink]=\"['/configDetail', configID]\">\n        <返回</a>\n      <p style=\"font-size: 16px\">添加配置项</p>\n    </nz-header>\n    <nz-content>\n      <div nz-row>\n        <dynamic-form [config]=\"formConfig\" (submit)=\"submit($event)\">\n        </dynamic-form>\n        <!-- <span>\n          <button nz-button [nzType]=\"'default'\" (click)=\"pre()\">\n            <span>取消</span>\n          </button>\n        </span> -->\n      </div>\n    </nz-content>\n    <nz-footer>\n\n    </nz-footer>\n  </nz-layout>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/configs/add-config/add-config.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "nz-layout {\n  background: #fff;\n  padding: 20px; }\n\nnz-header, nz-content, nz-footer {\n  background: #fff; }\n\nnz-header {\n  padding: 0;\n  width: 80%;\n  margin-bottom: 20px;\n  border-bottom: 1px solid #ddd; }\n\nnz-content {\n  padding: 0; }\n  nz-content span {\n    height: 30px;\n    line-height: 30px; }\n  nz-content .file {\n    margin-left: 10px;\n    cursor: pointer;\n    width: 90px;\n    position: relative;\n    display: inline-block;\n    border: 1px solid #99D3F5;\n    border-radius: 4px;\n    padding: 4px 12px;\n    overflow: hidden;\n    color: #1E88C7;\n    text-decoration: none;\n    text-indent: 0;\n    height: 30px;\n    line-height: 20px; }\n    nz-content .file input {\n      cursor: pointer;\n      position: absolute;\n      font-size: 100px;\n      right: 0;\n      top: 0;\n      opacity: 0; }\n    nz-content .file:hover {\n      cursor: pointer;\n      background: #AADFFD;\n      border-color: #78C3F3;\n      color: #004974;\n      text-decoration: none; }\n  nz-content .ant-row {\n    margin-bottom: 10px; }\n\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05); }\n\n.my-drop-zone {\n  border: dotted 1px lightgray; }\n\n.nv-file-ove {\n  border: dotted 1px red; }\n\n.ant-table-thead > tr > th {\n  padding: 8px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/configs/add-config/add-config.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddConfigComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__ = __webpack_require__("../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var AddConfigComponent = (function () {
    function AddConfigComponent(_notification, routeInfo, router, http, confirmServ, servicesService) {
        var _this = this;
        this._notification = _notification;
        this.routeInfo = routeInfo;
        this.router = router;
        this.http = http;
        this.confirmServ = confirmServ;
        this.servicesService = servicesService;
        // 定义需要拼接的content数组
        this.content = [];
        this.formConfig = [
            {
                type: 'input',
                label: '键',
                name: 'configKey',
                placeholder: '请输入配置键',
                validation: [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].maxLength(20)],
                styles: {
                    'width': '400px'
                }
            },
            {
                type: 'input',
                label: '值',
                name: 'configValue',
                placeholder: '请输入配置值',
                notNecessary: true,
                inputType: 'textarea',
                styles: {
                    'width': '400px',
                    'height': '200px'
                }
            },
            {
                label: '确定',
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
        this.createNotification = function (type, title, content) {
            _this._notification.create(type, title, content);
        };
    }
    AddConfigComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // setTimeout(() => {
        console.log('form11', this.form.controls);
        this.form.setDisabled('submit', true);
        // }, 0);
        var previousValid = this.form.valid;
        this.form.changes.subscribe(function () {
            if (_this.form.valid !== previousValid) {
                previousValid = _this.form.valid;
                _this.form.setDisabled('submit', !previousValid);
            }
        });
        // // this.form.setValue('name', '');
    };
    AddConfigComponent.prototype.submit = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var status, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("111111111: " + value.configKey);
                        status = 'pass';
                        for (i = 0; i < this.configDetail.length; i++) {
                            if (this.configDetail[i].key === value.configKey) {
                                this._notification.create('error', '创建配置项失败', '已有相同的配置项，不能重复创建');
                                status = 'error';
                            }
                        }
                        if (!(status === 'pass')) return [3 /*break*/, 2];
                        console.log('status: ' + status);
                        return [4 /*yield*/, this.addConfig(value)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        console.log('status: ' + status);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddConfigComponent.prototype.getConfigDetail = function (configID) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs/' + configID).map(function (res) { return res; });
    };
    AddConfigComponent.prototype.addConfig = function (formValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log('formValue', formValue);
                // 根据表单中填写的key和value，拼接添加的content字符串
                this.content.push({ 'key': formValue.configKey, 'value': formValue.configValue });
                console.log('params3: ' + this.content);
                this.http.put(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs/' + this.configID, {
                    'update_user_id': '',
                    'description': '',
                    'content': this.content,
                }).subscribe(function (response) {
                    console.log('这是content', _this.content);
                    console.log('这是response', response);
                    var thisParent = _this;
                    _this.confirmServ.success({
                        maskClosable: false,
                        title: '创建成功!',
                        content: '点确认按钮跳转到配置详情',
                        okText: '确定',
                        onOk: function () {
                            // .contentControl = true;
                            // console.log('form11', thisParent.form);
                            // const redirect = window.location.host + '/#/appStore';
                            // window.location.href = window.location.origin + '/#/repositoryStore';
                            thisParent.router.navigate(['configDetail', thisParent.configID]);
                        },
                        onCancel: function () {
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    AddConfigComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.configID = this.routeInfo.snapshot.params['configID'];
        // 订阅流，获取当前配置项中已有的配置数组信息
        this.getConfigDetail(this.configID).subscribe(function (data) {
            _this.configDetail = data;
            console.log('data: ' + data);
            // 将已存在的配置信息拼接入content（params）数组
            for (var i = 0; i < _this.configDetail.length; i++) {
                console.log('this.configdetail: ' + _this.configDetail[i].key);
                console.log('this.configdetail: ' + _this.configDetail[i].value);
                _this.content.push({ 'key': _this.configDetail[i].key, 'value': _this.configDetail[i].value });
                console.log('params2: ' + _this.content);
            }
        });
    };
    return AddConfigComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _a || Object)
], AddConfigComponent.prototype, "form", void 0);
AddConfigComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-add-config',
        template: __webpack_require__("../../../../../src/app/configs/add-config/add-config.component.html"),
        styles: [__webpack_require__("../../../../../src/app/configs/add-config/add-config.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClient */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["c" /* NzModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["c" /* NzModalService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_services_service__["a" /* ServicesService */]) === "function" && _g || Object])
], AddConfigComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=add-config.component.js.map

/***/ }),

/***/ "../../../../../src/app/configs/build-config/build-config.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <nz-layout>\n    <nz-header style=\"line-height:32px\">\n      <a style=\"font-size: 16px\" href=\"#/configControl\">\n        <返回</a>\n      <p style=\"font-size: 16px\">创建配置</p>\n    </nz-header>\n    <nz-content>\n      <div nz-row>\n        <dynamic-form [config]=\"formConfig\" (submit)=\"submit($event)\">\n        </dynamic-form>\n        <!-- <span>\n          <button nz-button [nzType]=\"'default'\" (click)=\"pre()\">\n            <span>取消</span>\n          </button>\n        </span> -->\n      </div>\n    </nz-content>\n    <nz-footer>\n\n    </nz-footer>\n  </nz-layout>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/configs/build-config/build-config.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "nz-layout {\n  background: #fff;\n  padding: 20px; }\n\nnz-header, nz-content, nz-footer {\n  background: #fff; }\n\nnz-header {\n  padding: 0;\n  width: 80%;\n  margin-bottom: 20px;\n  border-bottom: 1px solid #ddd; }\n\nnz-content {\n  padding: 0; }\n  nz-content span {\n    height: 30px;\n    line-height: 30px; }\n  nz-content .file {\n    margin-left: 10px;\n    cursor: pointer;\n    width: 90px;\n    position: relative;\n    display: inline-block;\n    border: 1px solid #99D3F5;\n    border-radius: 4px;\n    padding: 4px 12px;\n    overflow: hidden;\n    color: #1E88C7;\n    text-decoration: none;\n    text-indent: 0;\n    height: 30px;\n    line-height: 20px; }\n    nz-content .file input {\n      cursor: pointer;\n      position: absolute;\n      font-size: 100px;\n      right: 0;\n      top: 0;\n      opacity: 0; }\n    nz-content .file:hover {\n      cursor: pointer;\n      background: #AADFFD;\n      border-color: #78C3F3;\n      color: #004974;\n      text-decoration: none; }\n  nz-content .ant-row {\n    margin-bottom: 10px; }\n\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05); }\n\n.my-drop-zone {\n  border: dotted 1px lightgray; }\n\n.nv-file-ove {\n  border: dotted 1px red; }\n\n.ant-table-thead > tr > th {\n  padding: 8px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/configs/build-config/build-config.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuildConfigComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__ = __webpack_require__("../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var BuildConfigComponent = (function () {
    function BuildConfigComponent(_notification, routeInfo, router, http, confirmServ, servicesService) {
        var _this = this;
        this._notification = _notification;
        this.routeInfo = routeInfo;
        this.router = router;
        this.http = http;
        this.confirmServ = confirmServ;
        this.servicesService = servicesService;
        this.formConfig = [
            {
                type: 'input',
                label: '配置名称',
                name: 'configName',
                placeholder: '请输入配置名称',
                validation: [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].maxLength(20)],
                styles: {
                    'width': '400px'
                }
            },
            {
                type: 'input',
                label: '描述',
                name: 'description',
                placeholder: '请输入描述信息',
                validation: [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].maxLength(200)],
                notNecessary: true,
                inputType: 'textarea',
                styles: {
                    'width': '400px',
                }
            },
            {
                label: '确定',
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
        this.createNotification = function (type, title, content) {
            _this._notification.create(type, title, content);
        };
    }
    BuildConfigComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // setTimeout(() => {
        console.log('form11', this.form.controls);
        this.form.setDisabled('submit', true);
        // }, 0);
        var previousValid = this.form.valid;
        this.form.changes.subscribe(function () {
            if (_this.form.valid !== previousValid) {
                previousValid = _this.form.valid;
                _this.form.setDisabled('submit', !previousValid);
            }
        });
        // // this.form.setValue('name', '');
    };
    BuildConfigComponent.prototype.submit = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.buildConfig(value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BuildConfigComponent.prototype.buildConfig = function (formValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log('formValue', formValue);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.post(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiConfig + '/configCenter/' + _this.servicesService.getCookie('groupID') + '/configs', {
                            "configName": formValue.configName,
                            "description": formValue.description,
                            "content": [],
                        }).subscribe(function (response) {
                            console.log('这是response', response);
                            var thisParent = _this;
                            _this.confirmServ.success({
                                maskClosable: false,
                                title: '创建成功!',
                                content: '点确认按钮跳转到配置列表',
                                okText: '确定',
                                onOk: function () {
                                    // .contentControl = true;
                                    // console.log('form11', thisParent.form);
                                    // const redirect = window.location.host + '/#/appStore';
                                    // window.location.href = window.location.origin + '/#/repositoryStore';
                                    thisParent.router.navigate(['configControl']);
                                },
                                onCancel: function () {
                                }
                            });
                            // this.imageIdArr[key] = response;
                            // this.repositories[key] = this.imageIdArr[key]['id'];
                            resolve();
                        });
                    })];
            });
        });
    };
    BuildConfigComponent.prototype.ngOnInit = function () {
    };
    return BuildConfigComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _a || Object)
], BuildConfigComponent.prototype, "form", void 0);
BuildConfigComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-build-config',
        template: __webpack_require__("../../../../../src/app/configs/build-config/build-config.component.html"),
        styles: [__webpack_require__("../../../../../src/app/configs/build-config/build-config.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClient */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["c" /* NzModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["c" /* NzModalService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_services_service__["a" /* ServicesService */]) === "function" && _g || Object])
], BuildConfigComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=build-config.component.js.map

/***/ }),

/***/ "../../../../../src/app/configs/config-control/config-control.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".config-control-wrapper {\n  margin: 25px 0 15px 0;\n\n}\n.ant-layout-content {\n  margin-left: 30px;\n  margin-right: 20px;\n}\n.buildConfig{\n  display: block;\n  margin: 15px 0 0 30px;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/configs/config-control/config-control.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header [title]=\"title\"></app-header>\n<div class=\"config-control-wrapper\" *ngIf=\"configs\">\n  <app-group-select (groupidHandler)=\"groupidHandler($event)\"></app-group-select>\n\n  <button nz-button class=\"buildConfig\" [nzType]=\"'primary'\" [routerLink]=\"['/buildConfig']\">构建\n  </button>\n</div>\n\n<nz-content>\n  <div class=\"config-control-wrapper\" *ngIf=\"configs\">\n    <nz-table #nzTable [nzAjaxData]=\"configs\" [nzIsPagination]=\"false\">\n      <thead nz-thead>\n      <tr>\n        <th nz-th><span>名称</span></th>\n        <th nz-th><span>创建时间</span></th>\n        <th nz-th><span>更新时间</span></th>\n        <th nz-th><span>操作</span></th>\n      </tr>\n      </thead>\n      <tbody nz-tbody>\n      <tr nz-tbody-tr *ngFor=\"let data of nzTable.data\">\n        <td nz-td>\n          <a [routerLink]=\"['/configDetail', data.id]\">\n            {{data.configName}}\n          </a>\n        </td>\n        <!--\n            <td nz-td>{{data.createUserId}}</td>\n        -->\n        <td nz-td>{{data.createTime | date:'yyyy-MM-dd HH:mm:ss'}}</td>\n        <td nz-td>{{data.updateTime | date:'yyyy-MM-dd HH:mm:ss'}}</td>\n        <td nz-td>\n          <button nz-button [nzType]=\"'primary'\" nzSize=\"small\" (click)=\"showModal(data.id, data.configName);\">\n            <span>删除</span>\n          </button>\n        </td>\n      </tr>\n      </tbody>\n    </nz-table>\n  </div>\n\n</nz-content>\n\n<nz-modal [nzVisible]=\"isVisible\" [nzTitle]=\"'操作确认'\" [nzContent]=\"modalContent\" (nzOnCancel)=\"handleCancel($event)\"\n          (nzOnOk)=\"handleOk($event)\">\n  <ng-template #modalContent>\n    <p>已选择配置：{{deleteName}}，是否确定删除？</p>\n    <nz-spin [nzSize]=\"'large'\" [nzSpinning]=\"_isSpinning\" [nzTip]=\"'删除中'\" style=\"text-align: center;\">\n    </nz-spin>\n\n  </ng-template>\n</nz-modal>\n"

/***/ }),

/***/ "../../../../../src/app/configs/config-control/config-control.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigControlComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConfigControlComponent = (function () {
    function ConfigControlComponent(http, servicesService, _notification) {
        var _this = this;
        this.http = http;
        this.servicesService = servicesService;
        this._notification = _notification;
        this.deleteID = '';
        this.title = '配置中心';
        this.deleteName = '';
        this.isVisible = false;
        this._isSpinning = false;
        //表格6thead
        this.table6Title = [
            {
                index: 1,
                name: '名称',
            } /*,
            {
              index: 2,
              name: '创建者',
            }*/,
            {
                index: 3,
                name: '创建时间',
            },
            {
                index: 4,
                name: '更新时间',
            },
            {
                index: 5,
                name: '操作',
            }
        ];
        this.showModal = function (id, name) {
            _this.isVisible = true;
            _this.deleteID = id;
            _this.deleteName = name;
        };
        this.handleOk = function (e) {
            var status = '';
            // 如果对应的是删除镜像
            status = _this.deleteConfig(_this.deleteID, _this.deleteName);
            console.log('status: ' + status);
            if (status = '204') {
                _this._isSpinning = true;
                setTimeout(function () {
                    _this.isVisible = false;
                    console.log('删除成功，更新列表');
                    _this.getConfigs();
                    _this._isSpinning = false;
                }, 3000);
            }
            else {
                _this.isVisible = false;
                _this.createNotification('error', '删除失败', '删除失败');
            }
        };
        this.createNotification = function (type, title, content) {
            _this._notification.create(type, title, content);
        };
        this.handleCancel = function (e) {
            console.log(e);
            _this.isVisible = false;
        };
    }
    ConfigControlComponent.prototype.groupidHandler = function (event) {
        console.log('change event this.groupid: ' + this.groupid);
        this.groupid = event;
        this.getConfigs();
    };
    ConfigControlComponent.prototype.getConfigsObservable = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs').map(function (res) { return res.json(); });
    };
    ConfigControlComponent.prototype.getConfigs = function () {
        var _this = this;
        // 订阅流
        this.getConfigsObservable().subscribe(function (data) {
            console.log('config-control get data: ' + data);
            _this.configs = data;
        });
    };
    // 删除配置接口
    ConfigControlComponent.prototype.deleteConfig = function (configID, configName) {
        status = '';
        console.log('删除配置：' + configName);
        // 返回是string 不是json
        this.http.delete(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs/' + configID).subscribe(function (data) {
            console.log('data2: ' + data);
            status = data.toString();
            console.log('data: ' + data);
        });
        return status;
    };
    ConfigControlComponent.prototype.ngOnInit = function () {
        this.getConfigs();
    };
    return ConfigControlComponent;
}());
ConfigControlComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-config-control',
        template: __webpack_require__("../../../../../src/app/configs/config-control/config-control.component.html"),
        styles: [__webpack_require__("../../../../../src/app/configs/config-control/config-control.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_services_service__["a" /* ServicesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _c || Object])
], ConfigControlComponent);

var _a, _b, _c;
//# sourceMappingURL=config-control.component.js.map

/***/ }),

/***/ "../../../../../src/app/configs/config-detail/config-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".service-detail-wrapper{\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.link-back{\n  margin-top: 35px;\n  margin-bottom: 20px;\n}\n.detail-img{\n  width: 100px;\n}\n.detail-title{\n  margin-left: 25px;\n  font-size: 20px;\n}\n.detail-img-wrapper .img-block{\n  display: table-cell;\n  vertical-align: middle;\n}\n.detail-desc-wrapper{\n  margin: 20px 0;\n  border: solid 1px #e4e4e4;\n}\n.detail-btn-group{\n\n}\n.detail-noraml-btn{\n  color: #2c9cfa;\n  margin-left: 6px;\n}\n.detail-content-wrapper, .detail-package-wrapper{\n  margin: 15px 0 30px 0;\n  background-color: #F8F9F9;\n  padding: 10px;\n}\n.detail-content, .detail-package{\n  padding: 10px 0;\n}\n.detail-content-one{\n  border-right: 1px solid #DDD;\n}\n.detail-instance-wrapper{\n  margin: 15px 0 30px 0;\n  padding: 10px;\n}\n.detail-develop-wrapper{\n  margin: 15px 0 30px 0;\n  background-color: #F8F9F9;\n  padding: 35px 0 0 70px;\n}\n.detail-package-num{\n  color: #2C9CFA\n}\n.detail-h3{\n  padding-bottom: 10px;\n  border-bottom: solid 1px #ddd;\n}\n.addConfigBtn{\n  margin: 10px 0px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/configs/config-detail/config-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header [title]=\"title\"></app-header>\n<nz-content class=\"service-detail-wrapper\">\n  <div class=\"link-back\">\n    <a [routerLink]=\"['/configControl']\">\n      <span class=\"glyphicon glyphicon-menu-left\"></span>\n      返回</a>\n  </div>\n  <div nz-row class=\"detail-img-wrapper\">\n    <div nz-col [nzSpan]=\"6\">\n      <div class=\"img-block\" *ngIf=\"configs\">\n        <p *ngIf=\"configs.configName\" class=\"detail-title\">{{configs.configName}}</p>\n      </div>\n    </div>\n  </div>\n  <div nz-row class=\"detail-content-wrapper\" *ngIf=\"configs\">\n    <div nz-col [nzSpan]=\"12\" class=\"detail-content-one\">\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          创建时间\n        </div>\n        <div *ngIf=\"configs.createTime\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n          {{configs.createTime | date:'yyyy-MM-dd HH:mm:ss'}}\n        </div>\n      </div>\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          更新时间\n        </div>\n        <div *ngIf=\"configs.updateTime\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n          {{configs.updateTime | date:'yyyy-MM-dd HH:mm:ss'}}\n        </div>\n      </div>\n    </div>\n    <div nz-col [nzSpan]=\"12\">\n      <div nz-row class=\"detail-content\">\n        <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n          描述信息\n        </div>\n        <div *ngIf=\"configs.description\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n          {{configs.description}}\n        </div>\n      </div>\n    </div>\n  </div>\n  <h4 class=\"detail-h3\">配置项</h4>\n  <button nz-button class=\"addConfigBtn\" [nzType]=\"'primary'\" [routerLink]=\"['/addConfig', configID]\">添加配置项\n  </button>\n  <div class=\"config-control-wrapper\" *ngIf=\"configDetail\">\n    <nz-table #nzTable [nzAjaxData]=\"configDetail\" [nzIsPagination]=\"false\">\n      <thead nz-thead>\n      <tr>\n        <th nz-th><span>键</span></th>\n        <th nz-th><span>值</span></th>\n        <th nz-th><span>操作</span></th>\n      </tr>\n      </thead>\n      <tbody nz-tbody>\n      <tr nz-tbody-tr *ngFor=\"let data of nzTable.data\">\n        <td nz-td>{{data.key}}</td>\n        <td nz-td>{{data.value}}</td>\n        <td nz-td>\n          <button nz-button [nzType]=\"'primary'\" [routerLink]=\"['/editConfig', configID, data.key]\">\n            <span>编辑</span>\n          </button>\n          <button nz-button [nzType]=\"'primary'\" (click)=\"showModal(data.key, data.value);\">\n            <span>删除</span>\n          </button>\n        </td>\n      </tr>\n      </tbody>\n    </nz-table>\n  </div>\n</nz-content>\n\n<nz-modal [nzVisible]=\"isVisible\" [nzTitle]=\"'操作确认'\" [nzContent]=\"modalContent\" (nzOnCancel)=\"handleCancel($event)\"\n          (nzOnOk)=\"handleOk($event)\">\n  <ng-template #modalContent>\n    <p>已选择配置键：{{deleteKey}}，其值为{{deleteValue}}, 是否确定删除？</p>\n    <nz-spin [nzSize]=\"'large'\" [nzSpinning]=\"_isSpinning\" [nzTip]=\"'删除中'\" style=\"text-align: center;\">\n    </nz-spin>\n\n  </ng-template>\n</nz-modal>\n"

/***/ }),

/***/ "../../../../../src/app/configs/config-detail/config-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var ConfigDetailComponent = (function () {
    function ConfigDetailComponent(routeInfo, http, servicesService, _notification) {
        var _this = this;
        this.routeInfo = routeInfo;
        this.http = http;
        this.servicesService = servicesService;
        this._notification = _notification;
        // 标签名
        this.title = '配置详情';
        this.configs = [];
        this.deleteKey = '';
        this.deleteValue = '';
        this.isVisible = false;
        this._isSpinning = false;
        this.content = [];
        this.showModal = function (key, value) {
            _this.isVisible = true;
            _this.deleteKey = key;
            _this.deleteValue = value;
        };
        this.handleOk = function (e) {
            _this.deleteConfigSelected(_this.deleteKey, _this.deleteValue);
        };
        this.handleCancel = function (e) {
            console.log(e);
            _this.isVisible = false;
        };
        this.createNotification = function (type, title, content) {
            _this._notification.create(type, title, content);
        };
    }
    ConfigDetailComponent.prototype.getConfigsObservable = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs').map(function (res) { return res.json(); });
    };
    ConfigDetailComponent.prototype.getConfigDetail = function (configID) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs/' + configID).map(function (res) { return res.json(); });
    };
    // 拼接删除时需要传入的content数组
    // 逻辑：传入需要删除的key和value。=》得到已存在的配置项目组。=》在配置项目组中for循环找到对应的key，删除key。=》
    ConfigDetailComponent.prototype.jointContent = function (deleteKey) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // 订阅流，获取当前配置项中已有的配置数组信息
                this.getConfigDetail(this.configID).subscribe(function (data) {
                    // 每次调用joint拼接content，需要清空内容
                    _this.content = [];
                    _this.configDetail = data;
                    console.log('data: ' + data);
                    // 将已存在的配置信息拼接入content（params）数组
                    for (var i = 0; i < _this.configDetail.length; i++) {
                        console.log('this.configdetail: ' + _this.configDetail[i].key);
                        console.log('this.configdetail: ' + _this.configDetail[i].value);
                        // 如果要删除的key与已存在的key相同，则不要了。否则push进content数组
                        if (_this.configDetail[i].key === deleteKey) {
                        }
                        else {
                            console.log('push key: ' + _this.configDetail[i].key);
                            _this.content.push({ 'key': _this.configDetail[i].key, 'value': _this.configDetail[i].value });
                        }
                        console.log('params2: ' + _this.content);
                    }
                    console.log('deleteConfigSelected content: ' + _this.content);
                    // 返回是string 不是json
                    _this.http.put(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiConfig + '/configCenter/' + _this.servicesService.getCookie('groupID') + '/configs/' + _this.configID, {
                        'update_user_id': '',
                        'description': '',
                        'content': _this.content,
                    }).subscribe(function (data) {
                        console.log('这是content', _this.content);
                        console.log('这是response', data);
                        if (data.status = 204) {
                            _this._isSpinning = true;
                            setTimeout(function () {
                                _this.isVisible = false;
                                console.log('删除成功，更新列表');
                                _this.getExistConfigs();
                                _this._isSpinning = false;
                            }, 1000);
                        }
                        else {
                            _this.isVisible = false;
                            _this.createNotification('error', '删除失败', data['message']);
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    // 删除指定配置项目接口
    ConfigDetailComponent.prototype.deleteConfigSelected = function (deleteKey, deleteValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = '';
                        console.log('删除配置key：' + deleteKey);
                        console.log('删除配置Value：' + deleteValue);
                        return [4 /*yield*/, this.jointContent(deleteKey)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 获取上半部分配置的详情信息
    ConfigDetailComponent.prototype.getConfigTopDetail = function () {
        var _this = this;
        // 订阅流
        this.getConfigsObservable().subscribe(function (data) {
            // 得到的是configs list列表，根据路由的configID过滤出对应的config配置。
            console.log('data: ' + data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === _this.configID) {
                    // 过滤出对应的详情页config内容
                    _this.configs = (data[i]);
                }
            }
        });
    };
    // 获取已存在的配置项
    ConfigDetailComponent.prototype.getExistConfigs = function () {
        var _this = this;
        // 订阅流
        this.getConfigDetail(this.configID).subscribe(function (data) {
            _this.configDetail = data;
        });
    };
    ConfigDetailComponent.prototype.ngOnInit = function () {
        this.configID = this.routeInfo.snapshot.params['configID'];
        this.getConfigTopDetail();
        this.getExistConfigs();
    };
    return ConfigDetailComponent;
}());
ConfigDetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-config-detail',
        template: __webpack_require__("../../../../../src/app/configs/config-detail/config-detail.component.html"),
        styles: [__webpack_require__("../../../../../src/app/configs/config-detail/config-detail.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_services_service__["a" /* ServicesService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _d || Object])
], ConfigDetailComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=config-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/configs/edit-config/edit-config.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <nz-layout>\n    <nz-header style=\"line-height:32px\">\n      <a style=\"font-size: 16px\" [routerLink]=\"['/configDetail', configID]\">\n        <返回</a>\n      <p style=\"font-size: 16px\">编辑配置项</p>\n    </nz-header>\n    <nz-content>\n      <div nz-row>\n        <div _ngcontent-c12=\"\" nz-col=\"\" style=\"text-align: right;\" class=\"ant-col-4\" ng-reflect-nz-span=\"4\">\n          <label class=\"edit-config-label\">\n            键\n            <span _ngcontent-c12=\"\" style=\"color: red\">*</span>\n          </label>\n        </div>\n        <div style=\"margin-left: 10px;margin-bottom: 10px;\" class=\"ant-col-18 ant-form-item-control-wrapper\">\n          <div class=\"ant-form-item-control\">\n            <div nz-col=\"\" class=\"ant-col-8\" style=\"color: #555\">\n               {{configKey}}\n            </div>\n          </div>\n        </div>\n        <!--<div class=\"form-group\">\n          <label>键</label>\n          <input type=\"text\" class=\"form-control\" disabled value='configID'>{{configID}}\n        </div>-->\n        <dynamic-form [config]=\"formConfig\" (submit)=\"submit($event)\">\n        </dynamic-form>\n        <!-- <span>\n          <button nz-button [nzType]=\"'default'\" (click)=\"pre()\">\n            <span>取消</span>\n          </button>\n        </span> -->\n      </div>\n    </nz-content>\n    <nz-footer>\n\n    </nz-footer>\n  </nz-layout>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/configs/edit-config/edit-config.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "nz-layout {\n  background: #fff;\n  padding: 20px; }\n\nnz-header, nz-content, nz-footer {\n  background: #fff; }\n\nnz-header {\n  padding: 0;\n  width: 80%;\n  margin-bottom: 20px;\n  border-bottom: 1px solid #ddd; }\n\nnz-content {\n  padding: 0; }\n  nz-content span {\n    height: 30px;\n    line-height: 30px; }\n  nz-content .file {\n    margin-left: 10px;\n    cursor: pointer;\n    width: 90px;\n    position: relative;\n    display: inline-block;\n    border: 1px solid #99D3F5;\n    border-radius: 4px;\n    padding: 4px 12px;\n    overflow: hidden;\n    color: #1E88C7;\n    text-decoration: none;\n    text-indent: 0;\n    height: 30px;\n    line-height: 20px; }\n    nz-content .file input {\n      cursor: pointer;\n      position: absolute;\n      font-size: 100px;\n      right: 0;\n      top: 0;\n      opacity: 0; }\n    nz-content .file:hover {\n      cursor: pointer;\n      background: #AADFFD;\n      border-color: #78C3F3;\n      color: #004974;\n      text-decoration: none; }\n  nz-content .ant-row {\n    margin-bottom: 10px; }\n\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05); }\n\n.my-drop-zone {\n  border: dotted 1px lightgray; }\n\n.nv-file-ove {\n  border: dotted 1px red; }\n\n.ant-table-thead > tr > th {\n  padding: 8px; }\n\n.edit-config-label {\n  font-size: 13px;\n  font-weight: 400;\n  letter-spacing: 0px;\n  margin-bottom: 10px;\n  color: rgba(0, 0, 0, 0.9); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/configs/edit-config/edit-config.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditConfigComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__ = __webpack_require__("../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var EditConfigComponent = (function () {
    function EditConfigComponent(_notification, routeInfo, router, http, confirmServ, servicesService) {
        var _this = this;
        this._notification = _notification;
        this.routeInfo = routeInfo;
        this.router = router;
        this.http = http;
        this.confirmServ = confirmServ;
        this.servicesService = servicesService;
        // 定义需要拼接的content数组
        this.content = [];
        this.formConfig = [
            {
                type: 'input',
                label: '值',
                name: 'configValue',
                placeholder: '请输入配置值',
                validation: [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required],
                styles: {
                    'width': '400px',
                }
            },
            {
                label: '确定',
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
        this.createNotification = function (type, title, content) {
            _this._notification.create(type, title, content);
        };
    }
    EditConfigComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // setTimeout(() => {
        console.log('form11', this.form.controls);
        this.form.setDisabled('submit', true);
        // }, 0);
        var previousValid = this.form.valid;
        this.form.changes.subscribe(function () {
            if (_this.form.valid !== previousValid) {
                previousValid = _this.form.valid;
                _this.form.setDisabled('submit', !previousValid);
            }
        });
        // // this.form.setValue('name', '');
    };
    EditConfigComponent.prototype.submit = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.editConfig(value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditConfigComponent.prototype.getConfigDetail = function (configID) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiConfig + '/configCenter/' + this.servicesService.getCookie('groupID') + '/configs/' + configID).map(function (res) { return res; });
    };
    EditConfigComponent.prototype.editConfig = function (formValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log('formValue', formValue);
                // 订阅流，获取当前配置项中已有的配置数组信息
                this.getConfigDetail(this.configID).subscribe(function (data) {
                    _this.configDetail = data;
                    console.log('data: ' + data);
                    // 将已存在的配置信息拼接入content（params）数组
                    for (var i = 0; i < _this.configDetail.length; i++) {
                        console.log('this.configdetail: ' + _this.configDetail[i].key);
                        console.log('this.configdetail: ' + _this.configDetail[i].value);
                        // 找到正在被编辑的key值，更新对应的value
                        if (_this.configDetail[i].key === _this.configKey) {
                            _this.configDetail[i].value = formValue.configValue;
                            // 根据表单中填写的key和value，拼接添加的content字符串
                            _this.content.push({ 'key': _this.configDetail[i].key, 'value': _this.configDetail[i].value });
                        }
                        else {
                            // 根据表单中填写的key和value，拼接添加的content字符串
                            _this.content.push({ 'key': _this.configDetail[i].key, 'value': _this.configDetail[i].value });
                        }
                    }
                    console.log('params3: ' + _this.content);
                    _this.http.put(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiConfig + '/configCenter/' + _this.servicesService.getCookie('groupID') + '/configs/' + _this.configID, {
                        'update_user_id': '',
                        'description': '',
                        'content': _this.content,
                    }).subscribe(function (response) {
                        console.log('这是content', _this.content);
                        console.log('这是response', response);
                        var thisParent = _this;
                        _this.confirmServ.success({
                            maskClosable: false,
                            title: '编辑成功!',
                            content: '点确认按钮跳转到配置详情',
                            okText: '确定',
                            onOk: function () {
                                // .contentControl = true;
                                // console.log('form11', thisParent.form);
                                // const redirect = window.location.host + '/#/appStore';
                                // window.location.href = window.location.origin + '/#/repositoryStore';
                                thisParent.router.navigate(['configDetail', thisParent.configID]);
                            },
                            onCancel: function () {
                            }
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    EditConfigComponent.prototype.ngOnInit = function () {
        this.configID = this.routeInfo.snapshot.params['configID'];
        this.configKey = this.routeInfo.snapshot.params['configKey'];
    };
    return EditConfigComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _a || Object)
], EditConfigComponent.prototype, "form", void 0);
EditConfigComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-edit-config',
        template: __webpack_require__("../../../../../src/app/configs/edit-config/edit-config.component.html"),
        styles: [__webpack_require__("../../../../../src/app/configs/edit-config/edit-config.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClient */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["c" /* NzModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["c" /* NzModalService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_services_service__["a" /* ServicesService */]) === "function" && _g || Object])
], EditConfigComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=edit-config.component.js.map

/***/ }),

/***/ "../../../../../src/app/container-instance/container-instance.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"container\" (click)=\"toggleChoose()\">\n  <div class=\"header\" [ngClass]=\"currentClasses\"> -->\n<div class=\"container\" (click)=\"isFocused(field)\" *ngFor=\"let field of config\">\n  <div class=\"header\" [ngClass]=\"field.currentClass\">\n    <span>{{ field.instance_size }}</span>\n    <span *ngIf=\"field.focused\">\n      <i class=\"anticon anticon-check\"></i>\n    </span>\n  </div>\n  <div class=\"content\" *ngIf=\"field.cpuSize < 0.5\">\n    <p>{{ field.cpuSize }}核</p>\n    <p>{{ field.memSize }}MB</p>\n  </div>\n  <div class=\"content\" *ngIf=\"field.cpuSize >= 0.5\">\n    <p>{{ field.cpuSize }}核</p>\n    <p>{{ field.memSize }}GB</p>\n  </div>\n</div>\n<!-- <div>\n  {{ major }}\n</div>\n<div style=\"width:100px;height:100px\" class=\"focused\">\n</div>\n<nz-card (click)=\"isFocused(field)\" *ngFor=\"let field of config\">\n\n  <ng-template #title>\n    {{ field.instance_size }}\n    <span *ngIf=\"field.focused\">\n      <i class=\"anticon anticon-check\"></i>\n    </span>\n  </ng-template>\n  <ng-template #body>\n    <p>{{ field.cpuSize }}</p>\n    <p>{{ field.memSize }}</p>\n  </ng-template>\n</nz-card> -->\n\n<!-- 测试 -->\n<!-- <h4>{{name}}</h4>\n<button (click)=\"vote(true)\"  [disabled]=\"voted\">Agree</button>\n<button (click)=\"vote(false)\" [disabled]=\"voted\">Disagree</button> -->"

/***/ }),

/***/ "../../../../../src/app/container-instance/container-instance.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  cursor: pointer;\n  width: 130px;\n  margin-left: 0;\n  margin-right: 10px;\n  padding: 0;\n  height: 100px;\n  border: 1px solid #DDDDDD;\n  display: inline-block;\n  margin-right: 10px; }\n  .container .header {\n    height: 30px;\n    text-align: center;\n    border-bottom: 1px solid #dddddd;\n    padding-top: 5px;\n    font-size: 14px; }\n  .container .content {\n    height: 70px;\n    text-align: center;\n    padding-top: 15px; }\n\n.focused {\n  background: #EBEBEB; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/container-instance/container-instance.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContainerInstanceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContainerInstanceComponent = (function () {
    // get focused() {
    //   return this._focused;
    // }
    // private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    // @ViewChild('input') _inputElement: ElementRef;
    // @HostListener('window:click', ['$event'])
    // inputControlBlurHandler(event) {
    //   var parent = event.target;
    //   while (parent && parent != this.hostRef.nativeElement && parent != document) {
    //     // 取当前节点的父节点继续寻找
    //     parent = parent.parentNode;
    //   }
    //   // 找到最顶层，则表示已经不在宿主元素内部了，触发失去焦点 fn
    //   if (parent == document) {
    //     this._focused = false;
    //   }
    // }
    // focus() {
    //   this._inputElement.nativeElement.focus();
    // }
    // isChoosed: boolean = false;
    // toggleChoose() {
    //   this.isChoosed = true
    // }
    function ContainerInstanceComponent() {
        this.onVoted = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.voted = false;
        this.config = [];
    }
    ContainerInstanceComponent.prototype.vote = function (agreed) {
        this.onVoted.emit(agreed);
        this.voted = true;
    };
    Object.defineProperty(ContainerInstanceComponent.prototype, "value", {
        get: function () {
            var choosedInstance;
            __WEBPACK_IMPORTED_MODULE_1_lodash__["map"](this.config, function (value, key) {
                if (value['focused'] === true) {
                    choosedInstance = value;
                }
            });
            return choosedInstance;
        },
        enumerable: true,
        configurable: true
    });
    // @Output() toggleChoosed = new EventEmitter<boolean>();
    // private focused: boolean = false;
    // currentClasses: object = {
    //   'focused': false
    // };
    ContainerInstanceComponent.prototype.isFocused = function (field) {
        console.log(this.config);
        console.log(field);
        field.focused = true;
        field.currentClass = {
            'focused': field.focused
        };
        __WEBPACK_IMPORTED_MODULE_1_lodash__["map"](this.config, function (value, key) {
            if (value !== field) {
                value['focused'] = false;
                value['currentClass'] = {
                    'focused': false
                };
            }
        });
    };
    ContainerInstanceComponent.prototype.ngOnInit = function () {
        // this.setCurrentClasses();
    };
    ContainerInstanceComponent.prototype.ngOnChanges = function () {
    };
    return ContainerInstanceComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], ContainerInstanceComponent.prototype, "major", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ContainerInstanceComponent.prototype, "name", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ContainerInstanceComponent.prototype, "onVoted", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], ContainerInstanceComponent.prototype, "config", void 0);
ContainerInstanceComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-container-instance',
        template: __webpack_require__("../../../../../src/app/container-instance/container-instance.component.html"),
        styles: [__webpack_require__("../../../../../src/app/container-instance/container-instance.component.scss")],
    }),
    __metadata("design:paramtypes", [])
], ContainerInstanceComponent);

//# sourceMappingURL=container-instance.component.js.map

/***/ }),

/***/ "../../../../../src/app/dynamic-form/components/dynamic-field/dynamic-field.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicFieldDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form_button_form_button_component__ = __webpack_require__("../../../../../src/app/dynamic-form/components/form-button/form-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__form_input_form_input_component__ = __webpack_require__("../../../../../src/app/dynamic-form/components/form-input/form-input.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__form_select_form_select_component__ = __webpack_require__("../../../../../src/app/dynamic-form/components/form-select/form-select.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_field_config_interface__ = __webpack_require__("../../../../../src/app/dynamic-form/models/field-config.interface.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_field_config_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__models_field_config_interface__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var components = {
    button: __WEBPACK_IMPORTED_MODULE_2__form_button_form_button_component__["a" /* FormButtonComponent */],
    input: __WEBPACK_IMPORTED_MODULE_3__form_input_form_input_component__["a" /* FormInputComponent */],
    select: __WEBPACK_IMPORTED_MODULE_4__form_select_form_select_component__["a" /* FormSelectComponent */]
};
var DynamicFieldDirective = (function () {
    function DynamicFieldDirective(resolver, container) {
        this.resolver = resolver;
        this.container = container;
    }
    DynamicFieldDirective.prototype.ngOnChanges = function () {
        if (this.component) {
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    };
    DynamicFieldDirective.prototype.ngOnInit = function () {
        if (!components[this.config.type]) {
            var supportedTypes = Object.keys(components).join(', ');
            throw new Error("Trying to use an unsupported type (" + this.config.type + ").\n        Supported types: " + supportedTypes);
        }
        var component = this.resolver.resolveComponentFactory(components[this.config.type]);
        this.component = this.container.createComponent(component);
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
    };
    return DynamicFieldDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__models_field_config_interface__["FieldConfig"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__models_field_config_interface__["FieldConfig"]) === "function" && _a || Object)
], DynamicFieldDirective.prototype, "config", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]) === "function" && _b || Object)
], DynamicFieldDirective.prototype, "group", void 0);
DynamicFieldDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[dynamicField]'
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _d || Object])
], DynamicFieldDirective);

var _a, _b, _c, _d;
//# sourceMappingURL=dynamic-field.directive.js.map

/***/ }),

/***/ "../../../../../src/app/dynamic-form/components/form-button/form-button.component.html":
/***/ (function(module, exports) {

module.exports = "<div [ngStyle]=\"config.divStyles\" class=\"dynamic-field form-button\" [formGroup]=\"group\">\n  <!-- <button [disabled]=\"config.disabled\" type=\"submit\">\n    {{ config.label }}\n  </button> -->\n  <button [ngStyle]=\"config.styles\" nz-button [nzType]=\"config.buttonType\" [disabled]=\"config.disabled || config.buttonDis\" type=\"submit\">\n    <span>{{ config.label }}</span>\n  </button>\n</div>"

/***/ }),

/***/ "../../../../../src/app/dynamic-form/components/form-button/form-button.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dynamic-form/components/form-button/form-button.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormButtonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FormButtonComponent = (function () {
    function FormButtonComponent() {
    }
    FormButtonComponent.prototype.ngOnChanges = function () {
        console.log('button-changes', this.config);
    };
    return FormButtonComponent;
}());
FormButtonComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'form-button',
        styles: [__webpack_require__("../../../../../src/app/dynamic-form/components/form-button/form-button.component.scss")],
        template: __webpack_require__("../../../../../src/app/dynamic-form/components/form-button/form-button.component.html")
    })
], FormButtonComponent);

//# sourceMappingURL=form-button.component.js.map

/***/ }),

/***/ "../../../../../src/app/dynamic-form/components/form-input/form-input.component.html":
/***/ (function(module, exports) {

module.exports = "<div nz-form-item class=\"dynamic-field form-input\" [formGroup]=\"group\" nz-row>\n    <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n        <label>\n            {{ config.label }}\n            <span style=\"color: red\" [hidden]=\"config.notNecessary\">*</span>\n        </label>\n    </div>\n    <!-- <input type=\"text\" [attr.placeholder]=\"config.placeholder\" [formControlName]=\"config.name\"> -->\n    <!-- <nz-input style=\"width: 400px\" [nzPlaceHolder]=\"config.placeholder\" [formControlName]=\"config.name\"></nz-input> -->\n    <!-- 这里先用ngClass来优化样式的问题，regdirective逻辑没问题，但是样式出不来，用原生的pattern -->\n    <!-- <div [ngClass]=\"(getFormControl().invalid && getFormControl().dirty && getFormControl().hasError('nameReg')) ? 'has-error'  : ''\"  nz-col nz-form-control [nzValidateStatus]=\"getFormControl()\" [nzSpan]=\"18\" style=\"margin-left: 10px\"> -->\n    <div [ngClass]=\"(getFormControl().invalid && getFormControl().dirty) && (getFormControl().hasError('max') || getFormControl().hasError('min') || getFormControl().hasError('maxLength')) ? 'has-error'  : ''\" nz-col nz-form-control [nzValidateStatus]=\"getFormControl()\" [nzSpan]=\"18\" style=\"margin-left: 10px\">\n        <nz-input nzHasFeedback [ngModel]=\"config.defaultValue\" [nzType]=\"config.inputType\" [id]=\"config.name\" [ngStyle]=\"config.styles\"\n            [nzPlaceHolder]=\"config.placeholder\" [formControlName]=\"config.name\"></nz-input>\n        <!-- 这里增加getFormControl().touched校验可以成功，但是style没有变化，官方建议是增加dirty和touched校验的，这里是个Bug -->\n        <div *ngIf=\"getFormControl().invalid && getFormControl().dirty\">\n            <div nz-form-explain *ngIf=\"getFormControl().hasError('required')\">{{config.label}}不能为空</div>\n            <div nz-form-explain *ngIf=\"getFormControl().hasError('pattern')\">正确格式为: {{ getFormControl()?.errors?.pattern?.requiredPattern | translate }}</div>\n            <!-- 这里的?.写法，可以解决undefined的问题 -->\n            <div nz-form-explain *ngIf=\"getFormControl().hasError('min')\">低于最小值 {{ getFormControl()?.errors?.min?.min }}</div>\n            <div nz-form-explain *ngIf=\"getFormControl().hasError('max')\">超出最大值 {{ getFormControl()?.errors?.max?.max }}</div>\n            <div nz-form-explain *ngIf=\"getFormControl().hasError('maxlength')\">长度限制为{{getFormControl()?.errors?.maxlength?.requiredLength}}个字符</div>\n            <div nz-form-explain *ngIf=\"getFormControl().hasError('minlength')\">长度不少于{{getFormControl()?.errors?.minlength?.requiredLength}}个字符</div>\n            <!-- <div nz-form-explain *ngIf=\"!getFormControl().hasError('required') && getFormControl().hasError('nameReg')\">格式错误</div> -->\n            <!-- <div nz-form-explain *ngIf=\"getFormControl().dirty&&getFormControl().hasError('duplicated')\">The username is redundant!</div> -->\n            <div nz-form-explain *ngIf=\"getFormControl().pending\">校验中...</div>\n        </div>\n        <!-- <div [ngStyle]=\"config.styles\" *ngIf=\"validation.invalid && (validation.dirty || validation.touched)\">\n            <nz-alert *ngIf=\"validation.errors.required\" [nzType]=\"'error'\" nzMessage=\"{{config.label}}不能为空\" [nzShowIcon]=\"'true'\">\n            </nz-alert>\n\n            <nz-alert *ngIf=\"validation.errors.minlength\" [nzType]=\"'error'\" nzMessage=\"字符串长度不符合条件\" [nzShowIcon]=\"'true'\">\n            </nz-alert>\n        </div> -->\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/dynamic-form/components/form-input/form-input.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dynamic-form/components/form-input/form-input.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormInputComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_component_service_service__ = __webpack_require__("../../../../../src/app/dynamic-form/services/component-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FormInputComponent = (function () {
    function FormInputComponent(translate, component) {
        this.translate = translate;
        this.component = component;
        translate.addLangs(["zh", "en"]);
        translate.setDefaultLang("zh");
        var browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
    }
    Object.defineProperty(FormInputComponent.prototype, "validation", {
        get: function () {
            return this.group.get(this.config.name);
        },
        enumerable: true,
        configurable: true
    });
    FormInputComponent.prototype.getFormControl = function () {
        // const arr = this.group.controls[this.config.name]
        // console.log(arr);
        return this.group.controls[this.config.name];
    };
    // get food() {
    //     return this.group.get('food');
    // }
    FormInputComponent.prototype.ngOnInit = function () {
        // console.log('111',this.config.validation);
        // // console.log(this.group.get('name'));
        // console.log('22',this.group.get(this.config.name))
        // console.log('33',this.validation)
    };
    return FormInputComponent;
}());
FormInputComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'form-input',
        styles: [__webpack_require__("../../../../../src/app/dynamic-form/components/form-input/form-input.component.scss")],
        template: __webpack_require__("../../../../../src/app/dynamic-form/components/form-input/form-input.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_component_service_service__["a" /* ComponentServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_component_service_service__["a" /* ComponentServiceService */]) === "function" && _b || Object])
], FormInputComponent);

var _a, _b;
//# sourceMappingURL=form-input.component.js.map

/***/ }),

/***/ "../../../../../src/app/dynamic-form/components/form-radio/form-radio.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- 这里需要Todo -->\n<div class=\"dynamic-field form-input\" [formGroup]=\"group\" nz-row>\n  <div nz-col [nzSpan]=\"2\">\n    <label>{{ config.label }}</label>\n  </div>\n  <!-- <input type=\"text\" [attr.placeholder]=\"config.placeholder\" [formControlName]=\"config.name\"> -->\n  <!-- <nz-input style=\"width: 400px\" [nzPlaceHolder]=\"config.placeholder\" [formControlName]=\"config.name\"></nz-input> -->\n  <!-- <div nz-col [nzSpan]=\"22\">\n    <nz-radio-group (click)=\"toggleRadio()\" [(ngModel)]=\"this.radioValue\">\n      <label nz-radio [nzValue]=\"'newApp'\">\n        <span>是</span>\n      </label>\n      <label nz-radio [nzValue]=\"'notNewApp'\">\n        <span>否</span>\n      </label>\n    </nz-radio-group>\n  </div>\n  <div nz-col [nzSpan]=\"22\">\n    <nz-input [nzType]=\"config.ifTextarea\" [id]=\"config.name\" [ngStyle]=\"config.styles\" [nzPlaceHolder]=\"config.placeholder\"\n      [formControlName]=\"config.name\"></nz-input>\n  </div> -->\n</div>"

/***/ }),

/***/ "../../../../../src/app/dynamic-form/components/form-radio/form-radio.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dynamic-form/components/form-radio/form-radio.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormRadioComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FormRadioComponent = (function () {
    function FormRadioComponent() {
    }
    FormRadioComponent.prototype.ngOnInit = function () {
    };
    return FormRadioComponent;
}());
FormRadioComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-form-radio',
        template: __webpack_require__("../../../../../src/app/dynamic-form/components/form-radio/form-radio.component.html"),
        styles: [__webpack_require__("../../../../../src/app/dynamic-form/components/form-radio/form-radio.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], FormRadioComponent);

//# sourceMappingURL=form-radio.component.js.map

/***/ }),

/***/ "../../../../../src/app/dynamic-form/components/form-select/form-select.component.html":
/***/ (function(module, exports) {

module.exports = "<div [ngStyle]=\"config.divStyles\" nz-form-item class=\"dynamic-field form-select\" [formGroup]=\"group\" nz-row>\n  <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n    <label>\n      {{ config.label }}\n      <!-- {{ config.styles }} -->\n      <span style=\"color: red\" [hidden]=\"config.notNecessary\">*</span>\n    </label>\n  </div>\n  <!-- <select [formControlName]=\"config.name\">\n    <option value=\"\">{{ config.placeholder }}</option>\n    <option *ngFor=\"let option of config.options\">\n      {{ option }}\n    </option>\n  </select> -->\n  <div nz-col nz-form-control [nzValidateStatus]=\"getFormControl()\" [nzSpan]=\"18\" style=\"margin-left: 10px\">\n    <!-- 这里的selectOption确保比如应用部署，redis和zookeeper切换的时候，清除表单里下拉框的值 -->\n    <nz-select [(ngModel)]=\"config.selectedOption\" (nzOpenChange)=\"valueArrEntity()\" [formControlName]=\"config.name\" [nzTags]=\"config.ifTags\"\n      [ngStyle]=\"config.styles\" [nzPlaceHolder]=\"config.placeholder\" [nzShowSearch]=\"true\" nzAllowClear>\n      <nz-option *ngFor=\"let option of config.options\" [nzValue]=\"option\" [nzLabel]=\"option\" [nzDisabled]=\"option.disabled\">\n      </nz-option>\n    </nz-select>\n    <div nz-form-explain *ngIf=\"getFormControl().dirty&&getFormControl().hasError('required')\">{{config.label}}不能为空</div>\n    <!-- 下面是测试 -->\n    <!-- <div>111</div> -->\n    <!-- <div>{{ config.selectedOption }}</div> -->\n    <!-- <div>{{ component.componentType }}</div>\n    <div>{{ component.getValue }}</div> -->\n    <!-- <div nz-form-explain *ngIf=\"getFormControl().dirty&&getFormControl().hasError('duplicated')\">The username is redundant!</div> -->\n    <!-- <div nz-form-explain *ngIf=\"getFormControl().dirty&&getFormControl().pending\">校验中...</div> -->\n\n\n    <!-- <div [ngStyle]=\"config.styles\" *ngIf=\"validation.invalid && (validation.dirty || validation.touched)\">\n      <nz-alert *ngIf=\"validation.errors.required\" [nzType]=\"'error'\" nzMessage=\"{{config.label}}不能为空\" [nzShowIcon]=\"'true'\">\n      </nz-alert>\n\n      <nz-alert *ngIf=\"validation.errors.minlength\" [nzType]=\"'error'\" nzMessage=\"{{ config.label }}数目不能小于{{ validation.errors.minlength['requiredLength'] }}\" [nzShowIcon]=\"'true'\">\n      </nz-alert>\n    </div> -->\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/dynamic-form/components/form-select/form-select.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dynamic-form/components/form-select/form-select.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormSelectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_component_service_service__ = __webpack_require__("../../../../../src/app/dynamic-form/services/component-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FormSelectComponent = (function () {
    function FormSelectComponent(component) {
        this.component = component;
    }
    Object.defineProperty(FormSelectComponent.prototype, "validation", {
        get: function () {
            return this.group.get(this.config.name);
        },
        enumerable: true,
        configurable: true
    });
    // @Output()
    // valueArr = new EventEmitter<any>();
    FormSelectComponent.prototype.valueArrEntity = function () {
        var value$ = this.group.get(this.config.name).value;
        // console.log('这是select config name', this.config.name);
        this.selectName$ = this.config.name;
        if (this.config.valueUpdate === true) {
            // this.component.updateValue(value$);
            this.component.updateValue(value$, this.config.name);
        }
        // console.log(value$);
        // this.valueArr.emit(value$);
        // return this.group.get(this.config.name).value;
    };
    FormSelectComponent.prototype.getFormControl = function () {
        return this.group.controls[this.config.name];
    };
    return FormSelectComponent;
}());
FormSelectComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'form-select',
        styles: [__webpack_require__("../../../../../src/app/dynamic-form/components/form-select/form-select.component.scss")],
        template: __webpack_require__("../../../../../src/app/dynamic-form/components/form-select/form-select.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_component_service_service__["a" /* ComponentServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_component_service_service__["a" /* ComponentServiceService */]) === "function" && _a || Object])
], FormSelectComponent);

var _a;
//# sourceMappingURL=form-select.component.js.map

/***/ }),

/***/ "../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.html":
/***/ (function(module, exports) {

module.exports = "<form nz-form class=\"dynamic-form\" [formGroup]=\"form\" (submit)=\"handleSubmit($event)\">\n    <ng-container *ngFor=\"let field of config;\" dynamicField [config]=\"field\" [group]=\"form\">\n    </ng-container>\n</form>"

/***/ }),

/***/ "../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host /deep/ .dynamic-field {\n  margin-bottom: 15px; }\n  :host /deep/ .dynamic-field label {\n    display: block;\n    font-size: 13px;\n    font-weight: 400;\n    letter-spacing: 0px;\n    margin-bottom: 10px;\n    color: rgba(0, 0, 0, 0.9); }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DynamicFormComponent = (function () {
    function DynamicFormComponent(fb) {
        this.fb = fb;
        this.config = [];
        this.submit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(DynamicFormComponent.prototype, "controls", {
        get: function () { return this.config.filter(function (_a) {
            var type = _a.type;
            return type !== 'button';
        }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormComponent.prototype, "changes", {
        get: function () { return this.form.valueChanges; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormComponent.prototype, "valid", {
        get: function () { return this.form.valid; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormComponent.prototype, "value", {
        get: function () { return this.form.value; },
        enumerable: true,
        configurable: true
    });
    DynamicFormComponent.prototype.ngOnInit = function () {
        this.form = this.createGroup();
        console.log('form子', this.form);
    };
    DynamicFormComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.form) {
            var controls_1 = Object.keys(this.form.controls);
            var configControls_1 = this.controls.map(function (item) { return item.name; });
            controls_1
                .filter(function (control) { return !configControls_1.includes(control); })
                .forEach(function (control) { return _this.form.removeControl(control); });
            configControls_1
                .filter(function (control) { return !controls_1.includes(control); })
                .forEach(function (name) {
                var config = _this.config.find(function (control) { return control.name === name; });
                _this.form.addControl(name, _this.createControl(config));
            });
        }
    };
    DynamicFormComponent.prototype.createGroup = function () {
        var _this = this;
        var group = this.fb.group({});
        this.controls.forEach(function (control) { return group.addControl(control.name, _this.createControl(control)); });
        return group;
    };
    DynamicFormComponent.prototype.createControl = function (config) {
        var disabled = config.disabled, validation = config.validation, value = config.value;
        return this.fb.control({ disabled: disabled, value: value }, validation);
    };
    DynamicFormComponent.prototype.handleSubmit = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.submit.emit(this.value);
    };
    // setTimeout黑科技去除报错:https://github.com/toddmotto/angular-dynamic-forms/pull/5
    DynamicFormComponent.prototype.setDisabled = function (name, disable) {
        var _this = this;
        setTimeout(function () {
            console.log('子组件disab', name);
            if (_this.form.controls[name]) {
                console.log('子组件disab11111', name);
                var method = disable ? 'disable' : 'enable';
                _this.form.controls[name][method]();
                return;
            }
            _this.config = _this.config.map(function (item) {
                if (item.name === name) {
                    item.disabled = disable;
                }
                return item;
            });
        }, 0);
    };
    DynamicFormComponent.prototype.setValue = function (name, value) {
        var _this = this;
        setTimeout(function () {
            console.log('子组件value', name);
            // this.form.controls[name] = value;
            console.log('子组件con', _this.form);
            console.log('子组件config', _this.config);
            _this.config = _this.config.map(function (item) {
                if (item.name === name) {
                    item = value;
                }
                return item;
            });
        }, 0);
        // this.form.controls[name].setValue(value, { emitEvent: true });
    };
    DynamicFormComponent.prototype.setConfig = function (config) {
        var _this = this;
        setTimeout(function () {
            _this.config = config;
        }, 0);
    };
    DynamicFormComponent.prototype.setFormValue = function (key, value) {
        // this.form.controls[key]['value'] = value;
        console.log(this.form.value);
    };
    // 这里涉及到select子组件，往上传值
    DynamicFormComponent.prototype.valueArr = function (event) {
        console.log('这是select value', event);
    };
    return DynamicFormComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], DynamicFormComponent.prototype, "config", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], DynamicFormComponent.prototype, "submit", void 0);
DynamicFormComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'dynamic-form',
        styles: [__webpack_require__("../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.scss")],
        template: __webpack_require__("../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]) === "function" && _b || Object])
], DynamicFormComponent);

var _a, _b;
//# sourceMappingURL=dynamic-form.component.js.map

/***/ }),

/***/ "../../../../../src/app/dynamic-form/dynamic-form.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DynamicFormModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_dynamic_field_dynamic_field_directive__ = __webpack_require__("../../../../../src/app/dynamic-form/components/dynamic-field/dynamic-field.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__containers_dynamic_form_dynamic_form_component__ = __webpack_require__("../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_form_button_form_button_component__ = __webpack_require__("../../../../../src/app/dynamic-form/components/form-button/form-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_form_input_form_input_component__ = __webpack_require__("../../../../../src/app/dynamic-form/components/form-input/form-input.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_form_select_form_select_component__ = __webpack_require__("../../../../../src/app/dynamic-form/components/form-select/form-select.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_form_radio_form_radio_component__ = __webpack_require__("../../../../../src/app/dynamic-form/components/form-radio/form-radio.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_component_service_service__ = __webpack_require__("../../../../../src/app/dynamic-form/services/component-service.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 参考链接：https://segmentfault.com/a/1190000009186703












// 子组件也要导入才可以https://github.com/ngx-translate/core/issues/430


var DynamicFormModule = (function () {
    function DynamicFormModule() {
    }
    return DynamicFormModule;
}());
DynamicFormModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_5_ng_zorro_antd__["a" /* NgZorroAntdModule */],
            __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["b" /* TranslateModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__components_dynamic_field_dynamic_field_directive__["a" /* DynamicFieldDirective */],
            __WEBPACK_IMPORTED_MODULE_7__containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_form_button_form_button_component__["a" /* FormButtonComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_form_input_form_input_component__["a" /* FormInputComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_form_select_form_select_component__["a" /* FormSelectComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_form_radio_form_radio_component__["a" /* FormRadioComponent */],
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_7__containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_8__components_form_button_form_button_component__["a" /* FormButtonComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_form_input_form_input_component__["a" /* FormInputComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_form_select_form_select_component__["a" /* FormSelectComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_13__services_component_service_service__["a" /* ComponentServiceService */]]
        // schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], DynamicFormModule);

//# sourceMappingURL=dynamic-form.module.js.map

/***/ }),

/***/ "../../../../../src/app/dynamic-form/models/field-config.interface.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=field-config.interface.js.map

/***/ }),

/***/ "../../../../../src/app/dynamic-form/services/component-service.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentServiceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ComponentServiceService = (function () {
    // componentName = new BehaviorSubject<any>(this.componentValue);
    function ComponentServiceService() {
        this.componentValue$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](this.componentValue);
        this.componentName$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](this.componentName);
    }
    Object.defineProperty(ComponentServiceService.prototype, "getValue", {
        get: function () {
            return this.componentValue;
        },
        enumerable: true,
        configurable: true
    });
    ComponentServiceService.prototype.updateValue = function (value, name) {
        // updateValue(value) {
        this.componentValue = value;
        this.componentValue$.next(value);
        this.componentName$.next(name);
        // this.updateValueSbj(value);
        // if (_.isString(name)) {
        //   name = new BehaviorSubject<any>(value);
        //   this.componentName = name;
        //   this.outputSub();
        // }
        // name.next(value);
    };
    return ComponentServiceService;
}());
ComponentServiceService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ComponentServiceService);

//# sourceMappingURL=component-service.service.js.map

/***/ }),

/***/ "../../../../../src/app/file-center/file-center.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/file-center/file-center.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header [title]=\"'文档中心'\"></app-header>\n<app-tab></app-tab>\n<h2>这里是文档中心</h2>"

/***/ }),

/***/ "../../../../../src/app/file-center/file-center.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileCenterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FileCenterComponent = (function () {
    function FileCenterComponent() {
    }
    FileCenterComponent.prototype.ngOnInit = function () {
    };
    return FileCenterComponent;
}());
FileCenterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-file-center',
        template: __webpack_require__("../../../../../src/app/file-center/file-center.component.html"),
        styles: [__webpack_require__("../../../../../src/app/file-center/file-center.component.css")]
    }),
    __metadata("design:paramtypes", [])
], FileCenterComponent);

//# sourceMappingURL=file-center.component.js.map

/***/ }),

/***/ "../../../../../src/app/group-select/group-select.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".group-select-wrapper{\n  margin: 30px 0 0 28px;\n}\n.ant-btn{\n  width: 400px;\n}\n.ant-btn span{\n  float: left;\n}\n.ant-btn i{\n  float: right;\n}\n.group-label{\n  width: 400px;\n}\n.group-name {\n  padding: 0 !important;\n  width: 33px !important;\n  border: none !important;\n  text-align: left !important;\n}\n.ant-btn ul{\n  width: 400px !important;\n}\n.ant-dropdown-menu-item{\n  width: 400px !important;\n}\n.ant-dropdown{\n  width: 400px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/group-select/group-select.component.html":
/***/ (function(module, exports) {

module.exports = "<nz-dropdown [nzTrigger]=\"'click'\" class=\"group-select-wrapper\">\n  <button nz-button class=\"group-name\"><span>项目</span> </button>\n\n  <button nz-button nz-dropdown><span #dropBtn>{{firstGroupName}}</span> <i class=\"anticon anticon-down\"></i></button>\n  <ul nz-menu class=\"group-label\">\n    <li nz-menu-item *ngFor=\"let group of groupList\" (click)=\"changeGroup(group);dropBtn.innerText = group\">\n      {{group}}\n    </li>\n  </ul>\n</nz-dropdown>\n"

/***/ }),

/***/ "../../../../../src/app/group-select/group-select.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupSelectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GroupSelectComponent = (function () {
    function GroupSelectComponent(servicesService) {
        this.servicesService = servicesService;
        this.groupidHandler = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    // groupId: string;
    // groupName: string;
    GroupSelectComponent.prototype.changeGroup = function (data) {
        console.log('data: ' + data);
        var temp;
        if (!!data.toString().split('_')) {
            temp = data.toString().split('_');
            // this.groupId = temp[1];
            // this.groupName = temp[0];
            // console.log('temp1: ' + temp[1]);
            if (this.servicesService.getCookie('groupID') === temp[1]) {
                // 如果传入的新groupid和cookie里面已经保存的一样，不需要刷新页面
            }
            else {
                this.servicesService.setCookie('groupID', temp[1]);
                console.log('SETcookie: ' + this.servicesService.getCookie('groupID'));
                // 如果更新groupid，向父组件传送一个子组件的string对象
                this.groupidHandler.emit(temp[1]);
            }
        }
        else {
            // 如果group取不到？，获取不到groupid，cookie传入空
            this.servicesService.setCookie('groupID', '');
        }
    };
    GroupSelectComponent.prototype.ngOnInit = function () {
        /*// 如果groupid是空的，去cookie里面取得默认值
        if (this.groupid = 'undefined') {
            console.log('groupid = \'undefined\': ' + this.groupid);

            this.groupid = this.servicesService.getCookie('groupID');
            console.log('groupid = \'2222222\': ' + this.groupid);

        }
        console.log('groupList: ' + this.groupList);
        console.log('groupID 默认: ' + this.groupid);
        console.log('groupID cookie: ' + this.servicesService.getCookie('groupID'));*/
        var _this = this;
        // 订阅op的group流
        this.servicesService.getGroupList().subscribe(function (data) {
            // 过滤出需要的数据，拼接成一个array
            _this.groupList = _this.servicesService.getGroupNameList(data);
            // this.groupList  = [ 'aaa_1', 'testd_2', 'BDOC-TEST-11_5', 'GGGGGGG_10', 'GROUP2_9', 'test111_8', 'asd_7'];
            console.log('groupList: ' + _this.groupList);
            console.log('groupList[0]: ' + _this.groupList[0]);
            // 加载项目选择框的时候，默认把第一个group作为默认项目组
            var temp = _this.groupList[0].split('_');
            _this.firstGroupName = _this.groupList[0];
            _this.firstGroupID = temp[1];
            console.log(_this.firstGroupName);
            console.log(_this.firstGroupID);
            // 向外传出默认的第一个groupid
            _this.groupidHandler.emit(temp[1]);
            // 往cookie中传入第一个id值
            _this.servicesService.setCookie('groupID', _this.firstGroupID);
        });
        console.log('group-select init cookie: ' + this.servicesService.getCookie('groupID'));
    };
    return GroupSelectComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], GroupSelectComponent.prototype, "groupidHandler", void 0);
GroupSelectComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-group-select',
        template: __webpack_require__("../../../../../src/app/group-select/group-select.component.html"),
        styles: [__webpack_require__("../../../../../src/app/group-select/group-select.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services_service__["a" /* ServicesService */]) === "function" && _b || Object])
], GroupSelectComponent);

var _a, _b;
/*
// 子组件向父级组件传值用
export class GroupOutput {
    constructor(public groupId: string,
                public groupName: number) {
    }
}*/
//# sourceMappingURL=group-select.component.js.map

/***/ }),

/***/ "../../../../../src/app/mirror-store-list/mirror-store-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#mirror-list-wrapper .ant-card{\n  margin-left: 15px;\n  margin-bottom: 15px;\n  height: 200px;\n}\n.card-bottom{\n  padding: 5px 0;\n}\n.card-content{\n  height: 100px;\n}\n.card-bottom{\n\n}\n.card-cate{\n  float: left;\n  color: rgb(204, 204, 204);\n  font-size: 13px;\n  font-weight: 400;\n}\n.card-action{\n  float: right;\n  margin-right: 12px;\n}\n.anticon{\n  width: 18px;\n  height: 18px;\n}\n:host ::ng-deep .ant-card-head{\n  padding: 0 10px;\n}\n\n:host ::ng-deep  .ant-card-body{\n  padding: 10px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/mirror-store-list/mirror-store-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"services\" id=\"mirror-list-wrapper\">\n  <div *ngFor=\"let service of services | async  | appFilter: moduleName : keyword\">\n    <div nz-col [nzSpan]=\"5\" class=\"\">\n      <nz-card>\n        <ng-template #title>\n          <div class=\"mirror-header\">\n            <a\n              [routerLink]=\"['/'+moduleName+'Detail', moduleName, service.repositoryName ? service.repositoryName : service.serviceName + '@' + service.id, tabName]\">\n              {{service.repositoryName}}\n            </a>\n          </div>\n        </ng-template>\n        <ng-template #body>\n          <div class=\"custom-card\">\n            <div class=\"card-content\">\n              <p *ngIf=\"services\">{{service.description}}</p>\n            </div>\n            <!--\n                          拿到镜像分类的id，转换成对应的中文名称\n            -->\n            <div nz-row class=\"card-bottom\">\n              <div *ngFor=\"let tab of mirror_tabs\">\n                <p *ngIf=\"tab.index === service.categoryId\" class=\"card-cate\">{{tab.name}}</p>\n              </div>\n              <div class=\"card-action\">\n                <i class=\"anticon anticon-delete\"\n                   (click)=\"showModal(service.id, service.repositoryName);\">\n                </i>\n              </div>\n            </div>\n          </div>\n        </ng-template>\n      </nz-card>\n    </div>\n  </div>\n</div>\n\n\n<nz-modal [nzVisible]=\"isVisible\" [nzTitle]=\"'操作确认'\" [nzContent]=\"modalContent\" (nzOnCancel)=\"handleCancel($event)\"\n          (nzOnOk)=\"handleOk($event)\">\n  <ng-template #modalContent>\n    <p>您是否确定删除{{deleteName}}</p>\n    <nz-spin [nzSize]=\"'large'\" [nzSpinning]=\"_isSpinning\" [nzTip]=\"'删除中'\" style=\"text-align: center;\">\n    </nz-spin>\n\n  </ng-template>\n</nz-modal>\n"

/***/ }),

/***/ "../../../../../src/app/mirror-store-list/mirror-store-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MirrorStoreListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MirrorStoreListComponent = (function () {
    function MirrorStoreListComponent(servicesService, http, _notification) {
        var _this = this;
        this.servicesService = servicesService;
        this.http = http;
        this._notification = _notification;
        this.titleFilter = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]();
        this.radioValueFilter = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]();
        this.mirror_tabs = [
            {
                index: 'all',
                name: '全部'
            },
            {
                index: 0,
                name: '其他'
            },
            {
                index: 1,
                name: '操作系统'
            },
            {
                index: 2,
                name: '运行环境'
            },
            {
                index: 3,
                name: '中间件'
            },
            {
                index: 4,
                name: '数据库'
            },
            {
                index: 5,
                name: '微服务框架'
            },
            {
                index: 6,
                name: '大数据'
            },
            {
                index: 7,
                name: '应用'
            }
        ];
        this.isVisible = false;
        this._isSpinning = false;
        this.deleteID = '';
        this.deleteName = '';
        this.showModal = function (id, name) {
            _this.isVisible = true;
            console.log('??' + id + name);
            _this.deleteID = id;
            _this.deleteName = name;
        };
        this.handleOk = function (e) {
            var status = '';
            console.log("this.deleteID: " + _this.deleteID);
            // 如果对应的是删除镜像
            status = _this.deleteMirror(_this.deleteName);
            console.log("this.status: " + status);
            if (status = '204') {
                _this._isSpinning = true;
                setTimeout(function () {
                    _this.isVisible = false;
                    console.log('删除成功，更新列表');
                    if (_this.radioValue === 'all') {
                        _this.services = _this.servicesService.getServices(_this.tabName, _this.moduleName);
                    }
                    else {
                        _this.services = _this.servicesService.getCateServices(_this.tabName, _this.moduleName, _this.radioValue);
                    }
                    _this._isSpinning = false;
                }, 3000);
            }
            else {
                _this.isVisible = false;
                _this.createNotification('error', '删除失败', '删除失败');
            }
        };
        this.handleCancel = function (e) {
            console.log(e);
            _this.isVisible = false;
        };
        this.createNotification = function (type, title, content) {
            _this._notification.create(type, title, content);
        };
    }
    // 删除镜像接口
    MirrorStoreListComponent.prototype.deleteMirror = function (mirrorName) {
        status = '';
        console.log('删除镜像：' + mirrorName + '  ' + this.tabName);
        // 返回是string 不是json
        this.http.delete(__WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/dir/' + mirrorName).subscribe(function (data) {
            status = data.toString();
            console.log('status: ' + status);
        });
        return status;
    };
    MirrorStoreListComponent.prototype.ngOnChanges = function (changes) {
        console.log('servicelist  ngOnChanges');
        console.log('servicelist  groupid: ' + this.groupid);
        console.log('servicelist radioValue: ' + this.radioValue);
        if (this.radioValue === 'all') {
            this.services = this.servicesService.getServices(this.tabName, this.moduleName);
        }
        else {
            this.services = this.servicesService.getCateServices(this.tabName, this.moduleName, this.radioValue);
        }
        this.keyword = '';
    };
    MirrorStoreListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleFilter.valueChanges
            .debounceTime(500)
            .subscribe(function (value) { return _this.keyword = value; });
    };
    return MirrorStoreListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], MirrorStoreListComponent.prototype, "groupid", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], MirrorStoreListComponent.prototype, "tabName", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]) === "function" && _a || Object)
], MirrorStoreListComponent.prototype, "titleFilter", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]) === "function" && _b || Object)
], MirrorStoreListComponent.prototype, "radioValueFilter", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], MirrorStoreListComponent.prototype, "moduleName", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], MirrorStoreListComponent.prototype, "radioValue", void 0);
MirrorStoreListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-mirror-store-list',
        template: __webpack_require__("../../../../../src/app/mirror-store-list/mirror-store-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/mirror-store-list/mirror-store-list.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services_service__["a" /* ServicesService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _e || Object])
], MirrorStoreListComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=mirror-store-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/mirror-store/mirror-store.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".mirror-store-wrapper {\n  margin-left: 28px;\n  margin-right: 60px;\n}\n\n.mirrorTab {\n  margin-top: 30px;\n}\n\n.mirror-btns-wrapper {\n  margin: 20px 0;\n  height: 22px;\n}\n\n.radio-select-wrapper {\n  float: left;\n  width: 128px;\n  height: 520px;\n  border: 1px solid #e4e4e4;\n  padding: 20px;\n  margin-bottom: 300px;\n}\n\n.catalog-option {\n  padding-bottom: 10px;\n  border-bottom: 1px solid #e4e4e4;\n  margin-bottom: 5px;\n}\n\n.radio-select-wrapper label {\n  line-height: 30px;\n  height: 30px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/mirror-store/mirror-store.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header [title]=\"title\"></app-header>\n<app-group-select (groupidHandler)=\"groupidHandler($event)\"></app-group-select>\n\n<nz-content class=\"mirror-store-wrapper\">\n  <nz-tabset [nzTabPosition]=\"'top'\" [nzType]=\"'card'\" class=\"mirrorTab\">\n    <nz-tab *ngFor=\"let tab of tabs\" (nzClick)=\"changeMirrorName(tab.tabName)\">\n      <ng-template #nzTabHeading>\n        {{tab.name}}\n      </ng-template>\n\n\n      <div class=\"mirror-body-wrapper\">\n\n        <div class=\"radio-select-wrapper\">\n          <div nz-col class=\"catalog-option\">\n            <button *ngIf=\"tab.tabName == 'private'\" nz-button [nzType]=\"'primary'\"\n                    [routerLink]=\"['/buildImageCategory', mirrorName]\">构建\n            </button>\n          </div>\n          <nz-radio-group [(ngModel)]=\"radioValue\" *ngFor=\"let mirrorTab of mirror_tabs\"\n                          [formControl]=\"radioValueFilter\">\n            <label nz-radio [nzValue]=\"mirrorTab.index\" (nzClick)=\"changeRadioName(mirrorTab.index)\">\n              <span [ngClass]=\"currentClasses\">{{mirrorTab.name}}</span>\n            </label>\n          </nz-radio-group>\n        </div>\n       <!-- <div nz-row class=\"mirror-btns-wrapper\">\n          <div nz-col [nzSpan]=\"6\" [nzOffset]=\"12\">\n            <nz-input class=\"serviceInstanceSearch\"\n                      [nzSize]=\"large\"\n                      [nzPlaceHolder]=\"'按表名称、描述、标签搜索...'\"\n                      [formControl]=\"titleFilter\">\n                <ng-template #addOnAfter><i class=\"anticon anticon-search\"></i></ng-template>\n            </nz-input>\n          </div>\n        </div>-->\n        <app-search [titleFilter]=\"titleFilter\" [offset]=\"14\"></app-search>\n        <div class=\"mirror-card-wrapper\">\n          <app-mirror-store-list [radioValue]=\"radioValue\" [moduleName]=\"'repository'\" [groupid]=\"groupid\"\n                                 [tabName]=\"mirrorName\" [titleFilter]=\"titleFilter\"\n                                 [radioValueFilter]=\"radioValueFilter\"></app-mirror-store-list>\n        </div>\n      </div>\n    </nz-tab>\n  </nz-tabset>\n</nz-content>\n\n<!--\n<nz-footer>\n    <nz-pagination [nzPageIndex]=\"_current\" [nzTotal]=\"50\" nzShowTotal nzShowSizeChanger\n                   nzShowQuickJumper></nz-pagination>\n</nz-footer>-->\n"

/***/ }),

/***/ "../../../../../src/app/mirror-store/mirror-store.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MirrorStoreComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MirrorStoreComponent = (function () {
    function MirrorStoreComponent(_notification) {
        this._notification = _notification;
        this._current = 1;
        // 标签名
        this.title = '镜像仓库';
        this.mirrorImgUrl = 'assets/service/mysql.png';
        this.mirrorName = 'private';
        this.titleFilter = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.radioValueFilter = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.radioValue = 'all';
        this.mirror_tabs = [
            {
                index: 'all',
                name: '全部'
            },
            {
                index: 0,
                name: '其他'
            },
            {
                index: 1,
                name: '操作系统'
            },
            {
                index: 2,
                name: '运行环境'
            },
            {
                index: 3,
                name: '中间件'
            },
            {
                index: 4,
                name: '数据库'
            },
            {
                index: 5,
                name: '微服务框架'
            },
            {
                index: 6,
                name: '大数据'
            },
            {
                index: 7,
                name: '应用'
            }
        ];
        // 分页
        this.tabs = [
            {
                index: 1,
                name: '我的镜像',
                tabName: 'private'
            },
            {
                index: 2,
                name: '公有镜像',
                tabName: 'public'
            }
        ];
    }
    MirrorStoreComponent.prototype.groupidHandler = function (event) {
        console.log('change event: ' + event);
        console.log('change event this.groupid: ' + this.groupid);
        this.groupid = event;
        // console.log('change！！ get groupid: ' + this.groupid);
        // console.log('change！！ cookie: ' + this.servicesService.getCookie('groupID'));
    };
    MirrorStoreComponent.prototype.changeRadioName = function (cateIndex) {
        console.log("cateIndex: " + cateIndex);
    };
    MirrorStoreComponent.prototype.changeMirrorName = function (mirrorName) {
        this.mirrorName = mirrorName;
    };
    MirrorStoreComponent.prototype.ngOnInit = function () {
    };
    return MirrorStoreComponent;
}());
MirrorStoreComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-mirror-store',
        template: __webpack_require__("../../../../../src/app/mirror-store/mirror-store.component.html"),
        styles: [__webpack_require__("../../../../../src/app/mirror-store/mirror-store.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _a || Object])
], MirrorStoreComponent);

var _a;
//# sourceMappingURL=mirror-store.component.js.map

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#app-sider .logo {\n    height: 45px;\n    background: #353B53;\n    background-image: url(" + __webpack_require__("../../../../../src/assets/nav/nav-img.png") + ");\n}\n\n.ant-layout-sider-collapsed .nav-text {\n    display: none;\n}\n\n.ant-layout-sider-collapsed .ant-menu-submenu-title:after {\n    display: none;\n}\n\n.ant-layout-sider-collapsed .anticon {\n    font-size: 16px;\n    margin-left: 8px;\n}\n\n#app-sider {\n    background-color: #404962 !important;\n    background: #404962 !important;\n    font-size: 14px !important;\n\n}\n#app-sider span {\n    font-size: 14px !important;\n}\n.ant-menu{\n    background: #404962 !important;\n    color:rgba(255, 255, 255, 0.647) !important;\n    font-size: 14px !important;\n}\n#app-sider .ant-menu-inline{\n    border: none !important;\n}\n#side-ul .ant-menu-submenu  .ant-menu-submenu-title{\n    padding-left: 1px !important;\n}\n\n#app-sider .anticon{\n    margin-right: 15px !important;\n}\n.ant-menu-item:hover{\n    color: #fff !important;\n}\n.ant-menu-item:hover, .ant-menu-item-active, .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, .ant-menu-submenu-active, .ant-menu-submenu-title:hover{\n    color: #fff  !important;\n}\n.ant-menu-submenu:hover {\n    color: #fff !important;\n}\n#sider .ant-menu-submenu > .ant-menu {\n    background-color: #404962 !important;\n    background: #404962 !important;\n}\n.ant-menu {\n    background: #404962 !important;\n    background-color: #404962 !important;\n}\n.ant-menu-sub{\n    background: #404962 !important;\n    background-color: #404962 !important;\n}\n#app-sider .ant-menu-inline .ant-menu-sub {\n    background: #404962 !important;\n    background-color: #404962 !important;\n}\n.ant-menu-dark .ant-menu-inline.ant-menu-sub{\n    background: #404962 !important;\n    background-color: #404962 !important;\n}\n.ant-menu-dark, .ant-menu-dark .ant-menu-sub{\n    background: #404962 !important;\n    background-color: #404962 !important;\n}\n#app-sider .inside-ul{\n    background: #404962 !important;\n    background-color: #404962 !important;\n}\n.ant-menu.ant-menu-dark .ant-menu-item-selected {\n    background-color: #2d3348 !important;\n    border-left: 3px solid rgba(44, 156, 250, 1);\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"app-sider\">\n    <div class=\"logo\">\n    </div>\n    <ul nz-menu  [nzMode]=\"isCollapsed?'vertical':'inline'\" [nzTheme]=\"'dark'\" id=\"side-ul\">\n      <!--  <li nz-menu-item><span><i class=\"anticon anticon-file\"></i><span class=\"nav-text\">概览</span></span></li>\n        <li nz-submenu>\n            <span title><i class=\"anticon anticon-user\"></i><span class=\"nav-text\">资源管理</span></span>\n            <ul class=\"inside-ul\">\n                <li nz-menu-item>资源申请</li>\n                <li nz-menu-item>资源实例</li>\n                <li nz-menu-item>资源维护</li>\n            </ul>\n        </li>-->\n        <li nz-submenu [nzOpen]=\"true\">\n            <span title><i class=\"anticon anticon-user\"></i><span class=\"nav-text\">服务管理</span></span>\n            <ul class=\"inside-ul\">\n                <li nz-menu-item [routerLink]=\"['/serviceCatalog']\">服务目录</li>\n                <li nz-menu-item [routerLink]=\"['/serviceInstance']\">服务实例</li>\n            </ul>\n        </li>\n        <li nz-submenu [nzOpen]=\"true\">\n            <span title><i class=\"anticon anticon-user\"></i><span class=\"nav-text\">应用管理</span></span>\n            <ul class=\"inside-ul\">\n                <li nz-menu-item [routerLink]=\"['/appStore']\">应用商城</li>\n                <li nz-menu-item [routerLink]=\"['/appOverview']\">应用概览</li>\n                <li nz-menu-item [routerLink]=\"['/configControl']\">配置管理</li>\n<!--\n                <li nz-menu-item [routerLink]=\"['/envDoc']\">环境变量文件</li>\n-->\n            </ul>\n        </li>\n        <li nz-submenu [nzOpen]=\"true\">\n            <span title><i class=\"anticon anticon-team\"></i><span class=\"nav-text\">资产仓库</span></span>\n            <ul class=\"inside-ul\">\n                <li nz-menu-item [routerLink]=\"['/repositoryStore']\">镜像仓库</li>\n<!--\n                <li nz-menu-item [routerLink]=\"['/fileCenter']\">文档中心</li>\n-->\n            </ul>\n        </li>\n      <li nz-submenu [nzOpen]=\"true\">\n        <span title><i class=\"anticon anticon-team\"></i><span class=\"nav-text\">运维中心</span></span>\n        <ul class=\"inside-ul\">\n          <li nz-menu-item [routerLink]=\"['/operaOverview']\">运维概览</li>\n          <li nz-menu-item [routerLink]=\"['/operaMonitor']\">运维监控</li>\n          <li nz-menu-item [routerLink]=\"['/operaEvent']\">平台事件</li>\n          <li nz-menu-item [routerLink]=\"['/operaLog']\">平台日志</li>\n          <!--\n                          <li nz-menu-item [routerLink]=\"['/fileCenter']\">文档中心</li>\n          -->\n        </ul>\n      </li>\n       <!-- <li nz-submenu>\n            <span title><i class=\"anticon anticon-user\"></i><span class=\"nav-text\">运维中心</span></span>\n            <ul class=\"inside-ul\">\n                <li nz-menu-item>运维概览</li>\n            </ul>\n        </li>-->\n    </ul>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavbarComponent = (function () {
    function NavbarComponent() {
        this.isCollapsed = false;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-navbar',
        template: __webpack_require__("../../../../../src/app/navbar/navbar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/navbar/navbar.component.css")]
    }),
    __metadata("design:paramtypes", [])
], NavbarComponent);

//# sourceMappingURL=navbar.component.js.map

/***/ }),

/***/ "../../../../../src/app/opera-event/opera-event.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".event-chart-wrapper {\n    margin: 30px 30px;\n}\n\n.event-chart {\n    border: 1px solid #e8e7e4;\n}\n\n.chart-style {\n    height: 274px;\n    width: 100%;\n}\n\n.event-selector {\n    margin: 30px 30px 0px 30px;\n    border: 1px solid #10bcff;\n}\n\n.event-selector>.selector-header {\n    height: 30px;\n    width: 100%;\n    background-color: #ceebfe;\n}\n\n.selector-header>.header-text {\n    margin-left: 20px;\n    line-height: 2.3;\n}\n\n.event-selector>.selector-content {\n    padding: 26px 26px 10px 26px;\n}\n\n.selector-content>.selector-group {\n    margin-bottom: 8px;\n}\n\n.selector-group>span {\n    width: 65px;\n    text-align: right;\n    display: inline-block;\n}\n\n.selector-group>.selector-element {\n    margin-left: 10px;\n}\n\n.selector-option {\n    display: inline;\n    margin-left: 79px;\n}\n\n.switch-action {\n    width: 38px;\n    height: 20px;\n    background-color: #ceebfe;\n    margin: 0 auto;\n    position: relative;\n    border-left: 1px solid #10bcff;\n    border-bottom: 1px solid #10bcff;\n    border-right: 1px solid #10bcff;\n}\n\n.switch-action i {\n    margin-left: 11px;\n}\n\n.event-table {\n    margin: 30px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/opera-event/opera-event.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"event-chart-wrapper\">\n    <div nz-row [nzGutter]=\"8\" class=\"event-chart\">\n        <div nz-col class=\"gutter-row\" [nzSpan]=\"24\">\n            <div class=\"gutter-box\">\n                <div echarts [options]=\"eventOptions\" [loading]=\"showloading\" class=\"chart-style\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"event-selector\">\n    <div class=\"selector-header\">\n        <div class=\"header-text\">\n            筛选条件\n        </div>\n    </div>\n    <div class=\"selector-content\" *ngIf=\"conditionToggle\">\n        <div class=\"selector-group\">\n            <span>操作类型:</span>\n            <nz-radio-group class=\"selector-element\" [(ngModel)]=\"radioGroup.type\" [nzSize]=\"'large'\">\n                <label nz-radio-button [nzValue]=\"'all'\"> \n                  <span>全部</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'login'\"> \n                  <span>登录</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'logout'\"> \n                  <span>登出</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'create'\"> \n                  <span>创建</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'update'\"> \n                  <span>更新</span> \n                </label>\n            </nz-radio-group>\n        </div>\n        <div class=\"selector-group\">\n            <span>操作对象:</span>\n            <nz-radio-group class=\"selector-element\" [(ngModel)]=\"radioGroup.object\" [nzSize]=\"'large'\">\n                <label nz-radio-button [nzValue]=\"'all'\"> \n                  <span>全部</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'project'\"> \n                  <span>项目</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'user'\"> \n                  <span>用户</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'resource'\"> \n                  <span>资源</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'image'\"> \n                  <span>镜像</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'service'\"> \n                  <span>服务</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'application'\"> \n                  <span>应用</span> \n                </label>\n            </nz-radio-group>\n        </div>\n        <div class=\"selector-group\">\n            <span>操作结果:</span>\n            <nz-radio-group class=\"selector-element\" [(ngModel)]=\"radioGroup.result\" [nzSize]=\"'large'\">\n                <label nz-radio-button [nzValue]=\"'all'\"> \n                  <span>全部</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'success'\"> \n                  <span>成功</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'failed'\"> \n                  <span>失败</span> \n                </label>\n            </nz-radio-group>\n        </div>\n        <div class=\"selector-group\">\n            <span>操作时间:</span>\n            <nz-radio-group class=\"selector-element\" [(ngModel)]=\"radioGroup.time\" [nzSize]=\"'large'\">\n                <label nz-radio-button [nzValue]=\"'all'\"> \n                  <span>全部</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'sevenDay'\"> \n                  <span>七天内</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'today'\"> \n                  <span>今天</span> \n                </label>\n                <label nz-radio-button [nzValue]=\"'range'\"> \n                  <span>选择时间范围</span> \n                </label>\n            </nz-radio-group>\n        </div>\n        <div class=\"selector-group\">\n            <span>关键词:</span>\n            <nz-input [(ngModel)]=\"radioGroup.keyword\" [nzPlaceHolder]=\"'搜索内容'\" (ngModelChange)=\"_console($event)\" style=\"width:220px;margin-left:10px;\"></nz-input>\n        </div>\n        <div class=\"selector-group\">\n            <div class=\"selector-option\">\n                <button nz-button [nzType]=\"'primary'\" (click)=\"refreshEventTable(true)\"><span>确定</span></button>\n                <button nz-button [nzType]=\"'default'\" (click)=\"resetCondition()\"><span>重置</span></button>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"event-condition-switch\">\n    <div class=\"switch-action\" (click)=\"toggleCondition()\">\n        <i class=\"anticon anticon-up\" *ngIf=\"conditionToggle\"></i>\n        <i class=\"anticon anticon-down\" *ngIf=\"!conditionToggle\"></i>\n    </div>\n</div>\n<div class=\"event-table\">\n    <nz-table #nzTable [nzAjaxData]=\"dataSet\" [nzLoading]=\"loading\" [nzTotal]=\"total\" [nzPageSize]=\"10\" [(nzPageIndex)]=\"currentPage\" (nzPageIndexChange)=\"refreshEventTable()\" [(nzPageSize)]=\"pageSize\" (nzPageSizeChange)=\"refreshEventTable(true)\">\n        <thead nz-thead>\n            <tr>\n                <th nz-th>\n                    <span>用户名</span>\n                    <nz-table-sort [(nzValue)]=\"sortMap.user\" (nzValueChange)=\"sort('user', $event)\"></nz-table-sort>\n                </th>\n                <th nz-th>\n                    <span>操作类型</span>\n                    <nz-table-sort [(nzValue)]=\"sortMap.type\" (nzValueChange)=\"sort('type', $event)\"></nz-table-sort>\n                </th>\n                <th nz-th>\n                    <span>操作对象</span>\n                    <nz-table-sort [(nzValue)]=\"sortMap.object\" (nzValueChange)=\"sort('object', $event)\"></nz-table-sort>\n                </th>\n                <th nz-th>\n                    <span>操作结果</span>\n                    <nz-table-sort [(nzValue)]=\"sortMap.result\" (nzValueChange)=\"sort('result', $event)\"></nz-table-sort>\n                </th>\n                <th nz-th>\n                    <span>操作备注</span>\n                </th>\n                <th nz-th>\n                    <span>操作时间</span>\n                    <nz-table-sort [(nzValue)]=\"sortMap.time\" (nzValueChange)=\"sort('time', $event)\"></nz-table-sort>\n                </th>\n                <th nz-th>\n                    <span>查看日志</span>\n                </th>\n            </tr>\n        </thead>\n        <tbody nz-tbody>\n            <tr nz-tbody-tr *ngFor=\"let data of nzTable.data\">\n                <td nz-td>{{data.user}}</td>\n                <td nz-td>{{data.type}}</td>\n                <td nz-td>{{data.object}}</td>\n                <td nz-td>{{data.result}}</td>\n                <td nz-td>{{data.note}}</td>\n                <td nz-td>{{data.time}}</td>\n                <td nz-td>查看</td>\n            </tr>\n        </tbody>\n    </nz-table>\n</div>"

/***/ }),

/***/ "../../../../../src/app/opera-event/opera-event.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OperaEventComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OperaEventComponent = (function () {
    function OperaEventComponent(_http) {
        this._http = _http;
        this.keyword = '';
        this.pageSize = 10;
        this.currentPage = 1;
        this.loading = true;
        this.sortName = 'time';
        this.sortValue = 'descend';
        this.sortMap = {
            user: null,
            type: null,
            object: null,
            result: null,
            time: null
        };
        this.dataSet = [];
        this.total = 0;
        this.radioGroup = {
            type: 'all',
            object: 'all',
            result: 'all',
            time: 'all',
            keyword: ''
        };
        this.conditionToggle = true;
    }
    OperaEventComponent.prototype.ngOnInit = function () {
        this.getEventData();
        this.getEventOption();
        this.refreshEventTable();
    };
    OperaEventComponent.prototype.getEventData = function () {
        this.xAxisData = [];
        this.chartData = [];
        for (var i = 0; i < 100; i++) {
            this.xAxisData.push('category' + i);
            this.chartData.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }
    };
    OperaEventComponent.prototype.getEventOption = function () {
        this.eventOptions = {
            color: ['#5294CA'],
            tooltip: {},
            xAxis: {
                data: this.xAxisData,
                silent: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {},
            series: [{
                    name: 'bar',
                    type: 'bar',
                    data: this.chartData,
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        };
    };
    OperaEventComponent.prototype.sort = function (sortName, value) {
        var _this = this;
        this.sortName = sortName;
        this.sortValue = value;
        Object.keys(this.sortMap).forEach(function (key) {
            if (key !== sortName) {
                _this.sortMap[key] = null;
            }
            else {
                _this.sortMap[key] = value;
            }
        });
        this.refreshEventTable();
    };
    OperaEventComponent.prototype.toggleCondition = function () {
        this.conditionToggle = !this.conditionToggle;
    };
    OperaEventComponent.prototype.resetCondition = function () {
        this.radioGroup = {
            type: 'all',
            object: 'all',
            result: 'all',
            time: 'all',
            keyword: ''
        };
    };
    /**
     * 刷新事件Table
     * @param reset false|true
     */
    OperaEventComponent.prototype.refreshEventTable = function (reset) {
        var _this = this;
        if (reset === void 0) { reset = false; }
        if (reset) {
            this.currentPage = 1;
        }
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpParams */]()
            .append('currentPage', this.currentPage.toString())
            .append('pageSize', this.pageSize.toString())
            .append('sortName', this.sortName)
            .append('sortValue', this.sortValue);
        var options = {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpHeaders */]().set('Content-Type', 'application/json'),
            responseType: 'json',
            params: params
        };
        this._http.get('http://10.254.2.95:7002/mock/67/getEventData', options)
            .subscribe(function (res) {
            _this.dataSet = res.data;
            _this.total = res.total;
            _this.loading = false;
        }, function (error) {
            console.log('refreshEventTable error!');
        }, function () { });
    };
    return OperaEventComponent;
}());
OperaEventComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-opera-event',
        styles: [__webpack_require__("../../../../../src/app/opera-event/opera-event.component.css")],
        template: __webpack_require__("../../../../../src/app/opera-event/opera-event.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]) === "function" && _a || Object])
], OperaEventComponent);

var _a;
//# sourceMappingURL=opera-event.component.js.map

/***/ }),

/***/ "../../../../../src/app/opera-log/opera-log.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".opera-log-wrapper{\n  margin: 30px 50px;\n}\n.dashboard-resulet-wrapper{\n  max-height: 480px;\n  min-height: 450px;\n}\n.dashboard-resulet{\n  font-family: Monaco, \"DejaVu Sans Mono\", \"Liberation Mono\", monospace;\n  color: rgb(225, 230, 230);\n  font-size: 13px;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  overflow: auto;\n}\n.dashboard-li{\n  padding: 8px 8px 8px 32px;\n  background-color: #263238;\n  line-height: 20px;\n}\n.dashboard-li span{\n  margin-right: 4px;\n}\n.log-message{\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.log-path{\n  color: #efc241;\n}\n.log-instance{\n  color: #efc241;\n}\n.log-node{\n  color: #2dcbf6;\n}\n.log-cluster{\n  color: #72f08c;\n}\n.log-service{\n  color:#ff7c57;\n}\n.chart-style {\n  width: 100%;\n  height: 300px;\n}\n.echarts-wrapper{\n  border: 1px solid #E6E6E6;\n  margin-bottom: 20px;\n}\n.time-select{\n  width: 120px;\n  margin: 20px 0;\n}\n.group-name {\n  padding: 0 !important;\n  width: 33px !important;\n  border: none !important;\n  text-align: left !important;\n  margin-left: 28px;\n}\n.dashboard-header{\n  padding: 15px 32px;\n  font-size: 14px;\n  font-weight: bold;\n  color:#fff;\n  padding-bottom: 10px;\n  border-bottom: 1px solid #E6E6E6;\n}\n.HolyGrail {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 100vh;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.dashboard-resulet-wrapper{\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  background-color: rgb(38, 50, 56);\n  overflow: auto;\n}\n.log_page_wrapper{\n  margin-top:20px;\n}\n.log_page{\n  float:right;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/opera-log/opera-log.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"opera-log-wrapper\">\n  <div class=\"opera-log-selects\">\n<!--\n    <app-group-select (groupidHandler)=\"groupidHandler($event)\"></app-group-select>\n-->\n    <br/>\n    <button nz-button class=\"group-name\"><span>时间</span> </button>\n\n    <nz-select class=\"time-select\"\n               [(ngModel)]=\"selectedOption\"\n               [nzPlaceHolder]=\"'choose option'\"\n               (nzOpenChange)=\"getChartData(nzPageIndex);getConsoleData(nzPageIndex);\"\n    >\n      <nz-option\n              *ngFor=\"let option of options\"\n              [nzLabel]=\"option.label\"\n              [nzValue]=\"option\"\n              [nzDisabled]=\"option.disabled\">\n      </nz-option>\n    </nz-select>\n\n  </div>\n  <div class=\"HolyGrail\">\n    <div class=\"echarts-wrapper\">\n      <div echarts [options]=\"logOptions\" [loading]=\"showloading\" class=\"chart-style\"></div>\n    </div>\n    <div class=\"dashboard-resulet-wrapper\" style=\"position: relative\">\n      <div class=\"dashboard-resulet\">\n        <p class=\"dashboard-header\">平台日志信息</p>\n        <ul>\n          <li class=\"dashboard-li\" *ngFor=\"let consoleData of consoleDatas\">\n            <span>{{consoleData.time * 1000 | date:'yyyy-MM-dd HH:mm:ss'}}</span>\n            <span class=\"log-service\">{{consoleData.service_name}}</span>\n            <span class=\"log-cluster\">{{consoleData.cluster_name}}</span>\n            <span class=\"log-node\">{{consoleData.nodes}}</span>\n            <span class=\"log-instance\">{{consoleData.instance_id}}</span>\n            <span class=\"log-path\">{{consoleData.paths}}</span>\n            <span class=\"log-message\">{{consoleData.message}}</span>\n          </li>\n        </ul>\n\n      </div>\n    </div>\n    <div class=\"log_page_wrapper\">\n      <nz-pagination class=\"log_page\" [(nzPageIndex)]=\"nzPageIndex\" [nzTotal]=\"consolePageNum\" (click)=\"getChartData(nzPageIndex);getConsoleData(nzPageIndex);\"></nz-pagination>\n    </div>\n  </div>\n\n</div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/opera-log/opera-log.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OperaLogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OperaLogComponent = (function () {
    function OperaLogComponent(http, datePipe) {
        this.http = http;
        this.datePipe = datePipe;
        // 下拉选择框
        this.options = [];
        // 时间戳相关
        this.end_time = new Date().getTime(); // 结束时间是当前时间
        // get日志接口参数
        this.paths = 'stdout,spring.log,oracle.log';
        this.read_log_source_name = 'default';
        this.size = '50';
        // 控制台数据当前页数
        this.nzPageIndex = 1;
        // 图表颜色
        this.memColor = '#77d2a2';
        this.cpuColor = '#7ab6c7';
        this.diskColor = '#648a93';
        this.noUseColor = '#e4e9ea';
        this.pieColor = '#5d6a7c';
        this.barColor = '#8c8d8a';
        // locading
        this.showloading = true;
        this.xAxisData = [];
        this.yAxisData = [];
    }
    // 获取真实的表格数据
    OperaLogComponent.prototype.getLogData = function (logData) {
        this.xAxisData = [];
        this.yAxisData = [];
        for (var i = 0; i < logData.length; i++) {
            // 使用DatePipe格式化时间戳，需要*1000解决时间戳都是从1970年开始的问题
            var tempDate = new Date(logData[i].time * 1000);
            this.xAxisData.push(this.datePipe.transform(tempDate, 'yyyy-MM-dd HH:mm:ss'));
            this.yAxisData.push(logData[i].count);
        }
        // console.log('this.xAxisData: ' + this.xAxisData);
        // console.log('this.yAxisData: ' + this.yAxisData);
        // 处理好数据后，加载chart，取消loading模式
        if (this.xAxisData.length > 0) {
            this.getLogOption();
            this.showloading = false;
        }
    };
    OperaLogComponent.prototype.getLogOption = function () {
        this.logOptions = {
            color: ['#5294CA'],
            /* legend: {
                 data: ['bar'],
                 align: 'left'
             },*/
            tooltip: {},
            xAxis: {
                data: this.xAxisData,
                silent: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {},
            series: [{
                    name: '日志数量',
                    type: 'bar',
                    data: this.yAxisData,
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        };
    };
    OperaLogComponent.prototype.getChartData = function (nzPageIndex) {
        var _this = this;
        console.log("getChartData nzPageIndex: " + nzPageIndex);
        console.log('selectedOption: ' + this.selectedOption.value);
        this.http.get(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].apiAlauda + '/logs/' + __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].namespace + '/aggregations', {
            'params': {
                'end_time': this.end_time / 1000,
                // 开始时间是当前时间往前推 选中的间隔时间
                'start_time': (this.end_time - this.selectedOption.value) / 1000,
                'namespace': __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].namespace,
                'pageno': nzPageIndex,
                'paths': this.paths,
                'read_log_source_name': this.read_log_source_name,
                'size': this.size,
            },
        }).subscribe(function (response) {
            if (response.json() && response.json().buckets) {
                // console.log('这是response', response.json());
                // console.log('这是buckets', response.json().buckets);
                _this.chartData = response.json().buckets;
                // 处理日志数据，分离time和count
                _this.getLogData(_this.chartData);
            }
        });
    };
    OperaLogComponent.prototype.getConsoleData = function (nzPageIndex) {
        var _this = this;
        console.log("getConsoleData nzPageIndex: " + nzPageIndex);
        this.http.get(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].apiAlauda + '/logs/' + __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].namespace + '/search', {
            'params': {
                'end_time': this.end_time / 1000,
                // 开始时间是当前时间往前推 选中的间隔时间
                'start_time': (this.end_time - this.selectedOption.value) / 1000,
                'namespace': __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].namespace,
                'pageno': nzPageIndex,
                'paths': this.paths,
                'read_log_source_name': this.read_log_source_name,
                'size': this.size,
            },
        }).subscribe(function (response) {
            if (response.json() && response.json().logs) {
                // 处理控制台数据
                _this.consoleDatas = response.json().logs;
                _this.consolePageNum = response.json().total_page;
                // console.log(this.consoleDatas);
            }
        });
    };
    OperaLogComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 加载选择器的内容
        this.options = [
            { value: 1800000, label: '最近三十分钟' },
            { value: 3600000, label: '最近一小时' },
            { value: 21600000, label: '最近6小时' },
            { value: 43200000, label: '最近12小时' },
            { value: 86400000, label: '最近1天' },
            { value: 172800000, label: '最近2天' },
            { value: 259200000, label: '最近3天' }
        ];
        // 默认值为最近三十分钟
        this.selectedOption = this.options[0];
        // 延迟加载获取顶部表格数据
        setTimeout(function (_) {
            _this.getChartData(_this.nzPageIndex);
            _this.getConsoleData(_this.nzPageIndex);
        }, 0);
    };
    return OperaLogComponent;
}());
OperaLogComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-opera-log',
        template: __webpack_require__("../../../../../src/app/opera-log/opera-log.component.html"),
        styles: [__webpack_require__("../../../../../src/app/opera-log/opera-log.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["DatePipe"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common__["DatePipe"]) === "function" && _b || Object])
], OperaLogComponent);

var _a, _b;
//# sourceMappingURL=opera-log.component.js.map

/***/ }),

/***/ "../../../../../src/app/opera-monitor/monitor-platform/monitor-platform.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".p-header {\n    height: 45px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n\n.p-content {\n    margin-bottom: 25px;\n}\n\n.content-search {\n    width: 220px;\n}\n\n.monitor-panel {\n    border: #e7e7e7 1px solid;\n    box-shadow: 0px 0px 12px 1px #e7e7e7;\n    border-radius: 1px;\n    padding: 20px;\n    height: 172px;\n    margin-top: 10px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n}\n\n.monitor-panel>.panel-thumb {\n    -ms-flex-preferred-size: 35%;\n        flex-basis: 35%;\n    width: 35%;\n    height: 100%;\n    -o-object-fit: scale-down;\n       object-fit: scale-down;\n}\n\n.monitor-panel>.panel-content {\n    -ms-flex-preferred-size: 65%;\n        flex-basis: 65%;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    height: 100%;\n    margin-left: 15px;\n}\n\n.panel-option i {\n    margin-right: 6px;\n}\n\n.panel-content>.content-box {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n\n.option-box-info {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/opera-monitor/monitor-platform/monitor-platform.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"p-header\">\n    <div class=\"header-panel\">\n        <button nz-button [nzType]=\"'primary'\" [nzSize]=\"'large'\" (click)=\"openCreatePanel()\">\n          <span>创建监控面板</span>\n      </button>\n    </div>\n    <div class=\"header-input\">\n        <nz-input [nzType]=\"'search'\" [nzPlaceHolder]=\"'按表名称、描述、标签搜索'\" [(ngModel)]=\"_value\" [nzSize]=\"'large'\" style=\"width: 260px;\"></nz-input>\n    </div>\n</div>\n<div class=\"p-content\">\n    <div nz-row [nzGutter]=\"40\">\n        <div nz-col class=\"gutter-row\" [nzLg]=\"8\" [nzSm]=\"12\" *ngFor=\"let resource of panels?.data\">\n            <div class=\"monitor-panel\">\n                <img src=\"../../assets/monitor/thumbnail.png\" class=\"panel-thumb\">\n                <div class=\"panel-content\">\n                    <div class=\"content-box\">\n                        <div>{{ resource.display_name }}</div>\n                        <div>创建者: {{ resource.created_by }}</div>\n                        <div>创建时间: {{ resource.created_at | date: \"yyyy-MM-dd mm:ss\" }}</div>\n                    </div>\n                    <div class=\"option-box\">\n                        <div class=\"option-box-info\">\n                            <div class=\"panel-option\">\n                                <span (click)=\"openMonitorPanel()\">监控图表:  </span>\n                            </div>\n                            <div class=\"panel-option\">\n                                <i class=\"anticon anticon-edit\"></i>\n                                <i class=\"anticon anticon-delete\"></i>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<nz-modal [nzVisible]=\"isCreatePanelVisible\" [nzTitle]=\"'创建监控面板'\" [nzContent]=\"createPanel\" (nzOnCancel)=\"cancelCreatePanel($event)\" (nzOnOk)=\"agreeCreatePanel($event)\">\n    <ng-template #createPanel>\n        <p>已选择服务实例</p>\n        <!-- <nz-spin [nzSize]=\"'large'\" [nzSpinning]=\"_isSpinning\" [nzTip]=\"'删除中'\" style=\"text-align: center;\"> -->\n        <!-- </nz-spin> -->\n    </ng-template>\n</nz-modal>\n<nz-modal [nzVisible]=\"isDeletePanelVisible\" [nzTitle]=\"'删除监控面板'\" [nzContent]=\"deletePanel\" (nzOnCancel)=\"cancelDeletePanel($event)\" (nzOnOk)=\"agreeDeletePanel($event)\">\n    <ng-template #deletePanel>\n        <p>已选择监控面板实例：{{deleteName}}，是否确定删除？</p>\n        <nz-spin [nzSize]=\"'large'\" [nzSpinning]=\"_isSpinning\" [nzTip]=\"'删除中...'\" style=\"text-align: center;\">\n        </nz-spin>\n    </ng-template>\n</nz-modal>"

/***/ }),

/***/ "../../../../../src/app/opera-monitor/monitor-platform/monitor-platform.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitorPlatformComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MonitorPlatformComponent = (function () {
    function MonitorPlatformComponent(_router, _http) {
        var _this = this;
        this._router = _router;
        this._http = _http;
        this.isCreatePanelVisible = false;
        this.isDeletePanelVisible = false;
        this.isVisible = false;
        this.openCreatePanel = function () {
            _this.isCreatePanelVisible = true;
        };
        this.openDeletePanel = function () {
            _this.isDeletePanelVisible = true;
        };
    }
    MonitorPlatformComponent.prototype.ngOnInit = function () {
        this.getPanelInfos();
    };
    MonitorPlatformComponent.prototype.getPanelInfos = function () {
        var _this = this;
        var options = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["e" /* HttpHeaders */]().set('Content-Type', 'application/json'),
            responseType: 'json'
        };
        return this._http.get('http://10.254.2.95:7002/mock/67/getPanelInfos', options)
            .subscribe(function (res) {
            _this.panels = res;
        }, function (error) {
            console.log(error);
        }, function () { });
    };
    MonitorPlatformComponent.prototype.cancelCreatePanel = function (event) {
        this.isCreatePanelVisible = false;
    };
    MonitorPlatformComponent.prototype.agreeCreatePanel = function (event) {
        this.isCreatePanelVisible = false;
    };
    MonitorPlatformComponent.prototype.cancelDeletePanel = function (event) {
        this.isDeletePanelVisible = false;
    };
    MonitorPlatformComponent.prototype.agreeDeletePanel = function (event) {
        this.isDeletePanelVisible = false;
    };
    /**
     * 查看监控面板的详情信息
     */
    MonitorPlatformComponent.prototype.openMonitorPanel = function () {
        this._router.navigate(['operaMonitor/platform-detail']);
    };
    return MonitorPlatformComponent;
}());
MonitorPlatformComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-monitor-platform',
        template: __webpack_require__("../../../../../src/app/opera-monitor/monitor-platform/monitor-platform.component.html"),
        styles: [__webpack_require__("../../../../../src/app/opera-monitor/monitor-platform/monitor-platform.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */]) === "function" && _b || Object])
], MonitorPlatformComponent);

var _a, _b;
//# sourceMappingURL=monitor-platform.component.js.map

/***/ }),

/***/ "../../../../../src/app/opera-monitor/monitor-service/monitor-service.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/opera-monitor/monitor-service/monitor-service.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  monitor-service works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/opera-monitor/monitor-service/monitor-service.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitorServiceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MonitorServiceComponent = (function () {
    function MonitorServiceComponent() {
    }
    MonitorServiceComponent.prototype.ngOnInit = function () {
    };
    return MonitorServiceComponent;
}());
MonitorServiceComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-monitor-service',
        template: __webpack_require__("../../../../../src/app/opera-monitor/monitor-service/monitor-service.component.html"),
        styles: [__webpack_require__("../../../../../src/app/opera-monitor/monitor-service/monitor-service.component.css")]
    }),
    __metadata("design:paramtypes", [])
], MonitorServiceComponent);

//# sourceMappingURL=monitor-service.component.js.map

/***/ }),

/***/ "../../../../../src/app/opera-monitor/opera-monitor-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OperaMonitorRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__opera_monitor_component__ = __webpack_require__("../../../../../src/app/opera-monitor/opera-monitor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monitor_platform_monitor_platform_component__ = __webpack_require__("../../../../../src/app/opera-monitor/monitor-platform/monitor-platform.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__monitor_service_monitor_service_component__ = __webpack_require__("../../../../../src/app/opera-monitor/monitor-service/monitor-service.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__platform_detail_platform_detail_component__ = __webpack_require__("../../../../../src/app/opera-monitor/platform-detail/platform-detail.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var omRoutes = [
    {
        path: 'operaMonitor',
        redirectTo: 'operaMonitor/platform',
        pathMatch: 'full'
    },
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__opera_monitor_component__["a" /* OperaMonitorComponent */],
        children: [
            {
                path: '',
                redirectTo: 'platform',
                pathMatch: 'full'
            },
            {
                path: 'platform',
                component: __WEBPACK_IMPORTED_MODULE_3__monitor_platform_monitor_platform_component__["a" /* MonitorPlatformComponent */]
            },
            {
                path: 'service',
                component: __WEBPACK_IMPORTED_MODULE_4__monitor_service_monitor_service_component__["a" /* MonitorServiceComponent */]
            },
            {
                path: 'platform-detail',
                component: __WEBPACK_IMPORTED_MODULE_5__platform_detail_platform_detail_component__["a" /* MonitorDetailComponent */]
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];
var OperaMonitorRoutingModule = (function () {
    function OperaMonitorRoutingModule() {
    }
    return OperaMonitorRoutingModule;
}());
OperaMonitorRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forChild(omRoutes)
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]
        ]
    })
], OperaMonitorRoutingModule);

//# sourceMappingURL=opera-monitor-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/opera-monitor/opera-monitor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".mirror-store-wrapper {\n    margin-left: 28px;\n    margin-right: 60px;\n}\n\n.mirrorTab {\n    margin-top: 30px;\n}\n\n.mirror-btns-wrapper {\n    margin: 20px 0;\n    height: 22px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/opera-monitor/opera-monitor.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header [title]=\"title\"></app-header>\n<nz-content class=\"mirror-store-wrapper\">\n    <nz-tabset [nzTabPosition]=\"'top'\" [nzType]=\"'card'\" class=\"mirrorTab\">\n        <nz-tab (nzClick)=\"changeToService()\">\n            <ng-template #nzTabHeading>\n                平台监控\n            </ng-template>\n        </nz-tab>\n        <nz-tab (nzClick)=\"changeToPlatform()\">\n            <ng-template #nzTabHeading>\n                服务监控\n            </ng-template>\n        </nz-tab>\n    </nz-tabset>\n    <router-outlet></router-outlet>\n</nz-content>"

/***/ }),

/***/ "../../../../../src/app/opera-monitor/opera-monitor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OperaMonitorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OperaMonitorComponent = (function () {
    function OperaMonitorComponent(_router) {
        this._router = _router;
        this.title = '运维监控';
        this.tabs = [
            {
                name: '平台监控',
                index: 'platform'
            },
            {
                name: '运维监控',
                content: 'Content of Tab Pane 2'
            }
        ];
    }
    OperaMonitorComponent.prototype.ngOnInit = function () {
    };
    /**
     * 切换标签页
     * @param tab 标签页
     */
    OperaMonitorComponent.prototype.changeToService = function () {
        this._router.navigate(['operaMonitor/platform']);
    };
    OperaMonitorComponent.prototype.changeToPlatform = function () {
        this._router.navigate(['operaMonitor/service']);
    };
    return OperaMonitorComponent;
}());
OperaMonitorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-opera-monitor',
        template: __webpack_require__("../../../../../src/app/opera-monitor/opera-monitor.component.html"),
        styles: [__webpack_require__("../../../../../src/app/opera-monitor/opera-monitor.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], OperaMonitorComponent);

var _a;
//# sourceMappingURL=opera-monitor.component.js.map

/***/ }),

/***/ "../../../../../src/app/opera-monitor/opera-monitor.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OperaMonitorModule", function() { return OperaMonitorModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__opera_monitor_routing_module__ = __webpack_require__("../../../../../src/app/opera-monitor/opera-monitor-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__opera_monitor_component__ = __webpack_require__("../../../../../src/app/opera-monitor/opera-monitor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__monitor_platform_monitor_platform_component__ = __webpack_require__("../../../../../src/app/opera-monitor/monitor-platform/monitor-platform.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__monitor_service_monitor_service_component__ = __webpack_require__("../../../../../src/app/opera-monitor/monitor-service/monitor-service.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__platform_detail_platform_detail_component__ = __webpack_require__("../../../../../src/app/opera-monitor/platform-detail/platform-detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__panel_chart_panel_chart_component__ = __webpack_require__("../../../../../src/app/opera-monitor/panel-chart/panel-chart.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var OperaMonitorModule = (function () {
    function OperaMonitorModule() {
    }
    return OperaMonitorModule;
}());
OperaMonitorModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_2_ng_zorro_antd__["a" /* NgZorroAntdModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_4__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_5__opera_monitor_routing_module__["a" /* OperaMonitorRoutingModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__opera_monitor_component__["a" /* OperaMonitorComponent */],
            __WEBPACK_IMPORTED_MODULE_7__monitor_platform_monitor_platform_component__["a" /* MonitorPlatformComponent */],
            __WEBPACK_IMPORTED_MODULE_8__monitor_service_monitor_service_component__["a" /* MonitorServiceComponent */],
            __WEBPACK_IMPORTED_MODULE_9__platform_detail_platform_detail_component__["a" /* MonitorDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_10__panel_chart_panel_chart_component__["a" /* PanelChartComponent */]
        ],
        providers: []
    })
], OperaMonitorModule);

//# sourceMappingURL=opera-monitor.module.js.map

/***/ }),

/***/ "../../../../../src/app/opera-monitor/panel-chart/panel-chart.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".panel-chart {\n    height: 274px;\n    border: 1px solid #e4e4e4;\n    margin-bottom: 16px;\n}\n\n.panel-header {\n    height: 34px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    border-bottom: 1px solid #e4e4e4;\n    padding: 4px 8px;\n}\n\n.panel-header>div {\n    font-size: 14px;\n}\n\n.chart-style {\n    width: 96%;\n    height: 230px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/opera-monitor/panel-chart/panel-chart.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"gutter-box panel-chart\">\n    <div class=\"panel-header\">\n        <div class=\"panel-title\">\n            监控图表名称\n        </div>\n        <div class=\"panel-option\">\n            刷新 删除\n        </div>\n    </div>\n    <div echarts [options]=\"chartOptions\" [loading]=\"showloading\" class=\"chart-style\"></div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/opera-monitor/panel-chart/panel-chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PanelChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PanelChartComponent = (function () {
    function PanelChartComponent() {
    }
    PanelChartComponent.prototype.ngOnInit = function () {
        this.chartOptions = {
            color: ['#21C8F4'],
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                top: '8%',
                left: '4%',
                right: '5%',
                bottom: '6%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '时间: ' + params.value;
                        }
                    }
                },
                data: ['2017-01-10', '2017-01-11', '2017-01-12', '2017-01-13']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                }
            },
            series: [
                {
                    name: 'CPU',
                    type: 'line',
                    data: [1, 2, 3, 4]
                }
            ]
        };
    };
    return PanelChartComponent;
}());
PanelChartComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-panel-chart',
        template: __webpack_require__("../../../../../src/app/opera-monitor/panel-chart/panel-chart.component.html"),
        styles: [__webpack_require__("../../../../../src/app/opera-monitor/panel-chart/panel-chart.component.css")]
    }),
    __metadata("design:paramtypes", [])
], PanelChartComponent);

//# sourceMappingURL=panel-chart.component.js.map

/***/ }),

/***/ "../../../../../src/app/opera-monitor/platform-detail/platform-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".d-header {\n    height: 45px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n}\n\n.d-header>.header-title {\n    margin-left: 40px;\n    line-height: 2.5;\n}\n\n.d-header>.header-panel {}\n\n.d-header>.header-input {\n    margin-left: 20px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/opera-monitor/platform-detail/platform-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"d-header\">\n    <div class=\"header-panel\">\n        <button nz-button [nzType]=\"'primary'\" [nzSize]=\"'large'\">\n          <span>添加监控图表</span>\n      </button>\n    </div>\n    <div class=\"header-title\">\n        <span>时间选择</span>\n    </div>\n    <div class=\"header-input\">\n        <nz-select style=\"width: 120px;\" [(ngModel)]=\"selectedOption\" [nzSize]=\"'large'\" [nzPlaceHolder]=\"'choose option'\" nzAllowClear>\n            <nz-option *ngFor=\"let option of options\" [nzLabel]=\"option.label\" [nzValue]=\"option\" [nzDisabled]=\"option.disabled\">\n            </nz-option>\n        </nz-select>\n    </div>\n</div>\n<div class=\"d-content\">\n    <div nz-row [nzGutter]=\"24\">\n        <!-- <div nz-col class=\"gutter-row\" [nzXl]=\"8\" [nzMd]=\"12\" [nzXs]=\"24\" *ngFor=\"let chart of charts\">\n            <app-panel-chart [chartStyle]=\"chart.\" [chartData]=\"chartData\"></app-panel-chart>\n        </div> -->\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/opera-monitor/platform-detail/platform-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitorDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MonitorDetailComponent = (function () {
    function MonitorDetailComponent() {
    }
    MonitorDetailComponent.prototype.ngOnInit = function () {
    };
    return MonitorDetailComponent;
}());
MonitorDetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-platform-detail',
        template: __webpack_require__("../../../../../src/app/opera-monitor/platform-detail/platform-detail.component.html"),
        styles: [__webpack_require__("../../../../../src/app/opera-monitor/platform-detail/platform-detail.component.css")]
    }),
    __metadata("design:paramtypes", [])
], MonitorDetailComponent);

//# sourceMappingURL=platform-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/opera-overview/opera-overview.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".opera-overview-wrapper{\n    margin: 30px 50px;\n}\n.total-num-wrapper{\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    height: 250px;\n}\n.total-num-divs{\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n}\n.total-resource-div{\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n}\n.total-list-img{\n    height: 34px;\n    width: 29px;\n    line-height: 16px;\n}\n.total-list{\n    width: 500px;\n    height: 60px;\n    background-color: #F8F9F8;\n    margin-bottom: 10px;\n}\n\n.total-list-title{\n    color: rgb(102, 102, 102);\n    font-size: 14px;\n    line-height: 19px;\n}\n.total-list-num{\n    font-size: 28px;\n    font-weight: 400;\n    line-height: 33px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/opera-overview/opera-overview.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"opera-overview-wrapper\">\n  <div class=\"total-num-wrapper\">\n    <div class=\"total-num-divs\">\n      <div class=\"total-list\">\n        <img class=\"total-list-img\" src=\"assets/opera/img-docker.png\" alt=\"\">\n        <span class=\"total-list-title\">容器个数</span>\n        <span class=\"total-list-num\" style=\"color: rgb(50, 175, 130);\">112</span>\n      </div>\n\n      <div class=\"total-list\">\n        <img class=\"total-list-img\" src=\"assets/opera/img-docker.png\" alt=\"\">\n        <span class=\"total-list-title\">镜像总数</span>\n        <span class=\"total-list-num\" style=\"color: rgb(68, 186, 225);\">349</span>\n      </div>\n\n      <div class=\"total-list\">\n        <img class=\"total-list-img\" src=\"assets/opera/img-docker.png\" alt=\"\">\n        <span class=\"total-list-title\">服务数</span>\n        <span class=\"total-list-num\" style=\"color: rgb(223, 180, 101);\">176</span>\n      </div>\n    </div>\n    <div class=\"total-resource-div\"></div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/opera-overview/opera-overview.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OperaOverviewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OperaOverviewComponent = (function () {
    function OperaOverviewComponent() {
    }
    OperaOverviewComponent.prototype.ngOnInit = function () {
    };
    return OperaOverviewComponent;
}());
OperaOverviewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-opera-overview',
        template: __webpack_require__("../../../../../src/app/opera-overview/opera-overview.component.html"),
        styles: [__webpack_require__("../../../../../src/app/opera-overview/opera-overview.component.css")]
    }),
    __metadata("design:paramtypes", [])
], OperaOverviewComponent);

//# sourceMappingURL=opera-overview.component.js.map

/***/ }),

/***/ "../../../../../src/app/pipe/app-filter.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppFilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppFilterPipe = (function () {
    function AppFilterPipe() {
    }
    AppFilterPipe.prototype.transform = function (appList, filterField, keyword) {
        /*console.log(filterField);
        console.log(keyword);
        console.log(appList);*/
        if (!filterField || !keyword) {
            return appList;
        }
        // 服务管理的过滤不需要添加name字段
        if (filterField === 'instanceName') {
        }
        else {
            filterField = filterField + 'Name';
        }
        // console.log(filterField);
        return appList.filter(function (app) {
            var appValue = app[filterField];
            return appValue.indexOf(keyword) >= 0;
        });
    };
    return AppFilterPipe;
}());
AppFilterPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'appFilter'
    })
], AppFilterPipe);

//# sourceMappingURL=app-filter.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/pipe/service-pipe.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicePipePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ServicePipePipe = (function () {
    function ServicePipePipe() {
    }
    ServicePipePipe.prototype.transform = function (serviceList, moduleName, keyword) {
        console.log('moduleName: ' + moduleName);
        console.log('keyword: ' + keyword);
        console.log('serviceList: ' + serviceList);
        if (!moduleName || !keyword) {
            return serviceList;
        }
        if (moduleName === 'service') {
            if (serviceList == '' || serviceList == null) {
                return serviceList.filter(function (service) {
                    console.log('servicePipe222');
                    var serviceValue = service['serviceType'];
                    return serviceValue.indexOf(keyword) >= 0;
                });
            }
        }
    };
    return ServicePipePipe;
}());
ServicePipePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'servicePipe'
    })
], ServicePipePipe);

//# sourceMappingURL=service-pipe.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/repository-detail/repository-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".mirror-store-wrapper{\n    padding-left: 30px;\n    padding-right: 100px;\n}\n.link-back{\n    margin-top: 35px;\n    margin-bottom: 20px;\n}\n.detail-img{\n    width: 100px;\n}\n.detail-title{\n    margin-left: 25px;\n    font-size: 28px;\n}\n.detail-img-wrapper .img-block{\n    display: table-cell;\n    vertical-align: middle;\n}\n.detail-desc-wrapper{\n    margin: 20px 0;\n    border: solid 1px #e4e4e4;\n}\n.detail-12col{\n    padding: 0px 40px 10px 40px;\n    border-right: 1px solid #E1EFDA;\n}\n.detail-line{\n    line-height: 40px;\n    padding-left: 20px;\n    background-color: #f8f9f8;\n}\n.detail-line span{\n    margin-right: 80px;\n}\n.detail-line-value{\n    color: #2C9CFA;\n}\n.detail-versions-wrapper a{\n    padding-right: 25px;\n}\n.first-line{\n    padding-top:10px !important;\n}\n.app-detail-title{\n  font-size: 16px;\n  font-weight: bold;\n  margin: 25px 0 10px 0;\n}\n.custom-image-wrapper{\n  background: #f7f7f7;\n  padding:25px;\n  overflow: hidden;\n}\n.custom-image{\n  /*height: 75px;\n  width: 175px;*/\n  border: 1px solid #e4e4e4;\n  float: left;\n  margin-left: 25px;\n}\n.custom-image img{\n  height: 120px;\n\n}\n.app-detail-block{\n  clear: both;\n}\n.addVersion{\n  margin-bottom: 10px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/repository-detail/repository-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header [title]=\"title\"></app-header>\n<nz-content class=\"mirror-store-wrapper\">\n  <div class=\"link-back\">\n    <a [routerLink]=\"['/'+ module +'Store']\">\n      <span class=\"glyphicon glyphicon-menu-left\"></span>\n      返回</a>\n  </div>\n  <div class=\"detail-img-wrapper\">\n    <div class=\"img-block\" *ngIf='module === \"app\"'>\n      <img class=\"detail-img\" [src]='imgUrl + name + \".png\"' alt=\"\" width=\"100%\"\n           onerror=\"this.src = 'assets/service/app.png'\"/>\n    </div>\n    <div class=\"img-block\" *ngIf='module === \"repository\"'>\n      <img class=\"detail-img\" [src]=\"mirrorImgUrl\" alt=\"\" width=\"100%\"/>\n    </div>\n    <div class=\"img-block\">\n      <p class=\"detail-title\">{{name}}</p>\n    </div>\n  </div>\n  <div nz-row class=\"detail-desc-wrapper\">\n    <div nz-col [nzSpan]=\"12\" class=\"detail-12col  first-line\">\n      <div class=\"detail-line\">\n        <span>版本编号</span>\n        <span *ngIf=\"mirrorDetail\" class=\"detail-line-value\">{{firstVersionVersion}}</span></div>\n    </div>\n    <div nz-col [nzSpan]=\"12\" class=\"detail-12col first-line\">\n      <div class=\"detail-line\">\n        <span>更新时间</span>\n        <span class=\"detail-line-value\"\n              *ngIf=\"mirrorDetail\">{{mirrorDetail.createTime | date:'yyyy-MM-dd HH:mm:ss'}}</span>\n      </div>\n    </div>\n    <div nz-col [nzSpan]=\"12\" class=\"detail-12col\">\n      <div class=\"detail-line\">\n        <span>实例描述</span>\n        <span class=\"detail-line-value\" *ngIf=\"mirrorDetail\">{{mirrorDetail.description}}</span></div>\n    </div>\n    <div nz-col [nzSpan]=\"12\" class=\"detail-12col\"  *ngIf=\"module === 'repository'\">\n      <div class=\"detail-line\">\n        <span>所属分类</span>\n        <span class=\"detail-line-value\" *ngIf=\"mirrorDetail\">{{mirrorDetailCateName}}</span></div>\n    </div>\n  </div>\n<!--\n  添加版本按钮只在镜像仓库中展示\n-->\n  <div *ngIf=\"module === 'repository'\">\n    <button class=\"addVersion\" nz-button [nzType]=\"'primary'\" [routerLink]=\"['/buildImage', name, tabName]\">\n      添加版本\n    </button>\n  </div>\n  <div class=\"detail-versions-wrapper\" *ngIf=\"mirrorVersions\">\n    <nz-table #nzTable [nzAjaxData]=\"mirrorVersions\" [nzIsPagination]=\"false\">\n      <thead nz-thead>\n      <tr>\n        <th nz-th><span>版本</span></th>\n        <th nz-th><span>大小</span></th>\n        <th nz-th><span>状态</span></th>\n        <th nz-th><span>发布时间</span></th>\n        <th nz-th><span>操作</span></th>\n      </tr>\n      </thead>\n      <tbody nz-tbody>\n      <tr nz-tbody-tr *ngFor=\"let data of nzTable.data\">\n        <td nz-td>\n          <div *ngIf=\"data.version\">\n            {{data.version}}\n          </div>\n        </td>\n        <td nz-td *ngIf=\"data.size\">{{data.size}}MB</td>\n        <td nz-td *ngIf=\"!data.size\">暂无</td>\n        <td nz-td>\n          <div>\n            {{data.isEnable ? '正常': '错误'}}\n          </div>\n        </td>\n        <td nz-td>\n          <div *ngIf=\"data.createTime\">\n            {{data.createTime | date:'yyyy-MM-dd HH:mm:ss'}}\n          </div>\n        </td>\n        <td nz-td>\n          <a href=\"\" *ngIf=\"module === 'repository'\" disabled=\"disabled\">启动</a>\n          <a href=\"\" *ngIf=\"module === 'app'\" [routerLink]=\"['/appDeploy', data.id]\">部署</a>\n          <a href=\"\" disabled=\"disabled\">同步</a>\n          <!--\n                              <a *ngIf=\"module === 'app'\" (click)=\"deleteVersion(module, data.id)\">删除</a>\n          -->\n          <a *ngIf=\"module === 'app'\" (click)=\"showModal(data.version, data.id);\">删除</a>\n          <a *ngIf=\"module === 'repository'\" disabled=\"disabled\">删除</a>\n        </td>\n      </tr>\n      </tbody>\n    </nz-table>\n\n    <div *ngIf=\"module === 'app'\">\n      <div class=\"app-detail-block\">\n        <div class=\"app-detail-title\">依赖的服务</div>\n        <div class=\"custom-image-wrapper\" *ngIf=\"mirrorDetail\">\n          <div *ngFor=\"let service of mirrorDetail.services\">\n            <div class=\"custom-image\">\n              <img *ngIf=\"service.serviceName\"\n                   [src]='serviceImgUrl + service.serviceName + \".png\"'\n                   alt=\"\"/>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"app-detail-block\">\n        <div class=\"app-detail-title\">镜像</div>\n        <div class=\"\" *ngIf=\"mirrorDetail.repositories\">\n          <app-app-nztable [mirrorDetail]=\"mirrorDetail\" [tableNum]=\"1\" [tableTitle]=\"table1Title\"></app-app-nztable>\n        </div>\n      </div>\n      <div class=\"app-detail-block\">\n        <div class=\"app-detail-title\">已订购实例</div>\n        <div class=\"\" *ngIf=\"subInstances\">\n          <app-app-nztable [mirrorDetail]=\"subInstances\" [tableNum]=\"2\" [tableTitle]=\"table2Title\"></app-app-nztable>\n        </div>\n      </div>\n    </div>\n  </div>\n</nz-content>\n<nz-modal [nzVisible]=\"isVisible\" [nzTitle]=\"'操作确认'\" [nzContent]=\"modalContent\" (nzOnCancel)=\"handleCancel($event)\"\n          (nzOnOk)=\"handleOk($event)\">\n  <ng-template #modalContent>\n    <p>您是否确定删除{{name}}的{{deleteName}}版本？</p>\n    <nz-spin [nzSize]=\"'large'\" [nzSpinning]=\"_isSpinning\" [nzTip]=\"'删除中'\" style=\"text-align: center;\">\n    </nz-spin>\n\n  </ng-template>\n</nz-modal>\n"

/***/ }),

/***/ "../../../../../src/app/repository-detail/repository-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RepositoryDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_random_user_service__ = __webpack_require__("../../../../../src/app/shared/random-user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RepositoryDetailComponent = (function () {
    function RepositoryDetailComponent(routeInfo, http, _randomUser, servicesService) {
        var _this = this;
        this.routeInfo = routeInfo;
        this.http = http;
        this._randomUser = _randomUser;
        this.servicesService = servicesService;
        // 标签名
        this.title = '详情内容';
        this.mirrorImgUrl = 'assets/service/mirror.png';
        this.imgUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].api + '/api/' + this.servicesService.getCookie('groupID') + '/files/app/fileName/';
        this.serviceImgUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].api + '/api/' + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].adminGroupId + '/files/apiService/fileName/';
        this.isVisible = false;
        this.deleteID = '';
        this.deleteName = '';
        this._isSpinning = false;
        //表格1thead
        this.table1Title = [
            {
                index: 1,
                name: '镜像名称',
            },
            {
                index: 2,
                name: '镜像版本',
            },
            {
                index: 3,
                name: '创建时间',
            }
        ];
        //表格2thead
        this.table2Title = [
            {
                index: 1,
                name: '实例名称',
            },
            {
                index: 2,
                name: '项目名称',
            },
            {
                index: 3,
                name: '大小',
            },
            {
                index: 4,
                name: '服务数量',
            },
            {
                index: 5,
                name: '创建时间',
            }
        ];
        this.mirror_tabs = [
            {
                index: 0,
                name: '其他'
            },
            {
                index: 1,
                name: '操作系统'
            },
            {
                index: 2,
                name: '运行环境'
            },
            {
                index: 3,
                name: '中间件'
            },
            {
                index: 4,
                name: '数据库'
            },
            {
                index: 5,
                name: '微服务框架'
            },
            {
                index: 6,
                name: '大数据'
            },
            {
                index: 7,
                name: '应用'
            }
        ];
        this.showModal = function (name, id) {
            _this.isVisible = true;
            console.log('要删除的为id:' + id);
            console.log('要删除的为name:' + ' ' + name);
            _this.deleteID = id;
            _this.deleteName = name;
        };
        this.handleOk = function (e) {
            _this.deleteVersion(_this.deleteName, _this.deleteID);
        };
        this.handleCancel = function (e) {
            console.log(e);
            _this.isVisible = false;
        };
    }
    // 获取流
    RepositoryDetailComponent.prototype.getServiceDetail = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/repository/' + this.name + '?region=' + this.tabName).map(function (res) { return res.json(); });
    };
    // 获取流
    RepositoryDetailComponent.prototype.getAppVersions = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/applications/' + this.name + '/versions').map(function (res) { return res.json(); });
    };
    // 获取流
    RepositoryDetailComponent.prototype.getAppDetail = function (firstVersionId) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/applications/' + firstVersionId).map(function (res) { return res.json(); });
    };
    RepositoryDetailComponent.prototype.deleteVersion = function (name, versionId) {
        var _this = this;
        status = '';
        console.log('删除版本：' + name + '  ' + versionId);
        this.http.delete(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/applications/' + versionId).subscribe(function (data1) {
            status = data1.status.toString();
            console.log('调用后status：' + status);
            if (status === '204') {
                _this._isSpinning = true;
                setTimeout(function () {
                    _this.isVisible = false;
                    console.log('删除成功，更新列表');
                    // 订阅流
                    _this.getAppVersions().subscribe(function (data) {
                        _this.mirrorVersions = data;
                        _this.firstVersionId = data[0].id;
                        _this.firstVersionVersion = data[0].version;
                        // console.log(this.mirrorVersions);
                        // console.log(this.firstVersionId);
                        // 订阅流
                        _this.mirrorDetail = _this.getAppDetail(_this.firstVersionId);
                        _this.getAppDetail(_this.firstVersionId).subscribe(function (data) {
                            _this.mirrorDetail = data;
                            // console.log(this.mirrorDetail);
                        });
                    });
                    _this._isSpinning = false;
                }, 3000);
            }
            else {
                _this.isVisible = false;
                alert('删除失败');
            }
        });
    };
    RepositoryDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.name = this.routeInfo.snapshot.params['name'];
        this.tabName = this.routeInfo.snapshot.params['tabName'];
        this.module = this.routeInfo.snapshot.params['module'];
        console.log("name: " + this.name);
        console.log("tabName: " + this.tabName);
        console.log("module: " + this.module);
        if (this.module === 'repository') {
            this.mirrorDetail = this.getServiceDetail();
            // 订阅流
            this.getServiceDetail().subscribe(function (data) {
                _this.mirrorDetail = data;
                console.log("mirrorDetail: " + data.categoryId);
                for (var i = 0; i < _this.mirror_tabs.length; i++) {
                    if (data.categoryId === _this.mirror_tabs[i].index) {
                        _this.mirrorDetailCateName = _this.mirror_tabs[i].name;
                    }
                }
            });
            // 订阅流
            this.getServiceDetail().subscribe(function (data) {
                if (data.images == '' || data.images == null) {
                }
                else {
                    _this.mirrorVersions = data.images.opRepository;
                    _this.firstVersionId = data.images.opRepository[0].id;
                    _this.firstVersionVersion = data.images.opRepository[0].version;
                }
            });
        }
        else if (this.module === 'app') {
            // this.mirrorVersions = this.getAppVersions();
            // 订阅流
            this.getAppVersions().subscribe(function (data) {
                //先获取当前应用的所有版本，后取得最新版本id作为firstVersion
                _this.mirrorVersions = data;
                _this.firstVersionId = data[0].id;
                _this.firstVersionVersion = data[0].version;
                // console.log(this.mirrorVersions);
                // console.log(this.firstVersionId);
                // 订阅流
                if (_this.firstVersionId) {
                    _this.mirrorDetail = _this.getAppDetail(_this.firstVersionId);
                    _this.getAppDetail(_this.firstVersionId).subscribe(function (data) {
                        _this.mirrorDetail = data;
                        //获取应用名称字段
                        _this.appName = data.appName;
                        console.log("this.mirrorDetail: " + _this.mirrorDetail);
                        console.log("repositories: " + _this.mirrorDetail.repositories);
                        console.log("appName: " + _this.appName);
                        // 通过appName应用名，调用GET /groups/{group_id}/applications/{app_name}/instances
                        // 查询指定名称应用在组织中的部署实例
                        _this._randomUser.getSubInstanceDetail(_this.appName).subscribe(function (data) {
                            _this.subInstances = data;
                            console.log('this.subInstances: ' + _this.subInstances);
                        });
                    });
                }
            });
        }
        else {
            alert('get module name error');
        }
    };
    return RepositoryDetailComponent;
}());
RepositoryDetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-repository-detail',
        template: __webpack_require__("../../../../../src/app/repository-detail/repository-detail.component.html"),
        styles: [__webpack_require__("../../../../../src/app/repository-detail/repository-detail.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared_random_user_service__["a" /* RandomUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_random_user_service__["a" /* RandomUserService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_services_service__["a" /* ServicesService */]) === "function" && _d || Object])
], RepositoryDetailComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=repository-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/search/search.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".mirror-btns-wrapper {\n  margin: 20px 0;\n  height: 22px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/search/search.component.html":
/***/ (function(module, exports) {

module.exports = "<div nz-row class=\"mirror-btns-wrapper\">\n  <div nz-col [nzSpan]=\"6\" [nzOffset]=offset>\n    <nz-input class=\"serviceInstanceSearch\"\n              [nzSize]=\"large\"\n              [nzPlaceHolder]=\"'按名称搜索...'\"\n              [formControl]=\"titleFilter\">\n      <ng-template #addOnAfter><i class=\"anticon anticon-search\"></i></ng-template>\n    </nz-input>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/search/search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchComponent = (function () {
    function SearchComponent() {
    }
    SearchComponent.prototype.ngOnInit = function () {
    };
    return SearchComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]) === "function" && _a || Object)
], SearchComponent.prototype, "titleFilter", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], SearchComponent.prototype, "offset", void 0);
SearchComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-search',
        template: __webpack_require__("../../../../../src/app/search/search.component.html"),
        styles: [__webpack_require__("../../../../../src/app/search/search.component.css")]
    }),
    __metadata("design:paramtypes", [])
], SearchComponent);

var _a;
//# sourceMappingURL=search.component.js.map

/***/ }),

/***/ "../../../../../src/app/service-approve/service-approve.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <nz-layout>\n        <nz-header style=\"line-height:32px\">\n            <a style=\"font-size: 16px\" href=\"#/serviceCatalog\">\n                <返回\n            </a>\n            <p style=\"font-size: 16px\">服务订阅</p>\n        </nz-header>\n        <nz-content>\n            <div nz-row>\n                <nz-datepicker [(ngModel)]=\"_date\" [nzPlaceHolder]=\"'Select date'\"\n                               [nzDisabledDate]=\"_disabledDate\"></nz-datepicker>\n                <nz-timepicker [(ngModel)]=\"_time\"></nz-timepicker>\n            </div>\n            <div nz-row>\n                <dynamic-form [config]=\"formConfig\" (submit)=\"submit($event)\">\n                </dynamic-form>\n            </div>\n        </nz-content>\n        <nz-footer>\n\n        </nz-footer>\n    </nz-layout>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/service-approve/service-approve.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "nz-layout {\n  background: #fff;\n  padding: 20px; }\n\nnz-header, nz-content, nz-footer {\n  background: #fff; }\n\nnz-header {\n  padding: 0;\n  width: 80%;\n  margin-bottom: 20px;\n  border-bottom: 1px solid #ddd; }\n\nnz-content {\n  padding: 0; }\n  nz-content span {\n    height: 30px;\n    line-height: 30px; }\n  nz-content .file {\n    margin-left: 10px;\n    cursor: pointer;\n    width: 90px;\n    position: relative;\n    display: inline-block;\n    border: 1px solid #99D3F5;\n    border-radius: 4px;\n    padding: 4px 12px;\n    overflow: hidden;\n    color: #1E88C7;\n    text-decoration: none;\n    text-indent: 0;\n    height: 30px;\n    line-height: 20px; }\n    nz-content .file input {\n      cursor: pointer;\n      position: absolute;\n      font-size: 100px;\n      right: 0;\n      top: 0;\n      opacity: 0; }\n    nz-content .file:hover {\n      cursor: pointer;\n      background: #AADFFD;\n      border-color: #78C3F3;\n      color: #004974;\n      text-decoration: none; }\n  nz-content .ant-row {\n    margin-bottom: 10px; }\n\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05); }\n\n.my-drop-zone {\n  border: dotted 1px lightgray; }\n\n.nv-file-ove {\n  border: dotted 1px red; }\n\n.ant-table-thead > tr > th {\n  padding: 8px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/service-approve/service-approve.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceApproveComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__ = __webpack_require__("../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var ServiceApproveComponent = (function () {
    function ServiceApproveComponent(_notification, routeInfo, router, http, confirmServ, servicesService) {
        this._notification = _notification;
        this.routeInfo = routeInfo;
        this.router = router;
        this.http = http;
        this.confirmServ = confirmServ;
        this.servicesService = servicesService;
        this.formConfig = [
            {
                type: 'input',
                label: '描述',
                name: 'description',
                placeholder: '请输入描述信息',
                validation: [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].maxLength(200)],
                notNecessary: true,
                inputType: 'textarea',
                styles: {
                    'width': '400px',
                }
            },
            {
                label: '确定',
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
        this._date = null;
        this._time = null;
    }
    ServiceApproveComponent.prototype._disabledDate = function (current) {
        return current && current.getTime() < (Date.now() - 86400000);
    };
    /*// 调整日期
    dateGMT(gmtDate) {
        const mydate = new Date(gmtDate);
        mydate.setDate(mydate.getDate() + 1);
        return mydate;
    }
    // 调整时区
    chGMT(gmtDate) {
        const mydate = new Date(gmtDate);
        mydate.setHours(mydate.getHours() + 8);
        return mydate;
    }

    // 时间拼接
    getSelectTime() {
        const mytime = new Date(this._time);
        return mytime;
    }*/
    // 时间拼接
    ServiceApproveComponent.prototype.getSelectTime = function () {
        var mytime = new Date(this._time);
        mytime.setHours(mytime.getHours() + 8);
        return mytime;
    };
    ServiceApproveComponent.prototype.submit = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.buildConfig(value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ServiceApproveComponent.prototype.buildConfig = function (formValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log('formValue', formValue);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.post(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiService + '/apiService' + '/service/' + _this.serviceId + '/subscriptions', {
                            'subscriberId': 1,
                            'groupId': _this.servicesService.getCookie('groupID'),
                            'expectTime': _this.getSelectTime(),
                            'description': formValue.description,
                        }).subscribe(function (response) {
                            console.log('这是response', response);
                            var thisParent = _this;
                            _this.confirmServ.success({
                                maskClosable: false,
                                title: '已提交审批!',
                                content: '点确认按钮跳转到服务目录',
                                okText: '确定',
                                onOk: function () {
                                    // .contentControl = true;
                                    // console.log('form11', thisParent.form);
                                    // const redirect = window.location.host + '/#/appStore';
                                    // window.location.href = window.location.origin + '/#/repositoryStore';
                                    thisParent.router.navigate(['serviceCatalog']);
                                },
                                onCancel: function () {
                                }
                            });
                            // this.imageIdArr[key] = response;
                            // this.repositories[key] = this.imageIdArr[key]['id'];
                            resolve();
                        });
                    })];
            });
        });
    };
    ServiceApproveComponent.prototype.ngOnInit = function () {
        this.serviceName = this.routeInfo.snapshot.params['serviceName'];
        this.serviceId = this.routeInfo.snapshot.params['serviceId'];
    };
    return ServiceApproveComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _a || Object)
], ServiceApproveComponent.prototype, "form", void 0);
ServiceApproveComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-service-approve',
        template: __webpack_require__("../../../../../src/app/service-approve/service-approve.component.html"),
        styles: [__webpack_require__("../../../../../src/app/service-approve/service-approve.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClient */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["c" /* NzModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["c" /* NzModalService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_services_service__["a" /* ServicesService */]) === "function" && _g || Object])
], ServiceApproveComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=service-approve.component.js.map

/***/ }),

/***/ "../../../../../src/app/service-catalog/service-catalog.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".service-catalog{\n    margin: 0 50px 0 30px;\n}\n.service-search-wrapper{\n    margin-top: 5px;\n    margin-bottom: 15px;\n}\n.service-search-wrapper .form-control{\n    width: 100% !important;\n}\n\n.releaseServiceBtn{\n    visibility: hidden;\n    margin: 0px 0 23px 0;\n}\n.catalog-option{\n    padding-left: 10px;\n}\n.timeOrderBtn{\n    margin: 20px 20px 20px 0;\n}\n.form-control{\n    display: inline-block;\n    width: 80%;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/service-catalog/service-catalog.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header [title]=\"title\"></app-header>\n<app-group-select (groupidHandler)=\"groupidHandler($event)\"></app-group-select>\n\n<nz-content class=\"service-catalog\">\n    <button nz-button [nzType]=\"'primary'\" class=\"releaseServiceBtn\" routerLink=\"/serviceRelease\">发布服务</button>\n    <nz-tabset [nzTabPosition]=\"'top'\" [nzType]=\"'card'\">\n        <nz-tab *ngFor=\"let tab of tabs\" [nzDisabled]=\"tab.disabled\" (nzClick)=\"changeTabName(tab.tabName)\">\n            <ng-template #nzTabHeading>\n                {{tab.name}}\n            </ng-template>\n           <!-- <div nz-row class=\"service-search-wrapper\">\n                <div nz-col [nzSpan]=\"18\"></div>\n                <div nz-col [nzSpan]=\"6\">\n                    <div class=\"input-group\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"按服务名称搜索...\" [formControl]=\"titleFilter\">\n                        <span class=\"input-group-btn\">\n                            <button class=\"btn btn-default\" type=\"button\">\n                                <span class=\"glyphicon glyphicon-search\"></span>\n                            </button>\n                        </span>\n                    </div>\n\n                </div>\n            </div>-->\n          <app-search [titleFilter]=\"titleFilter\" [offset]=\"18\"></app-search>\n\n            <app-service-list [moduleName]=\"'service'\" [tabName]=\"tabName\" [titleFilter]=\"titleFilter\"></app-service-list>\n\n        </nz-tab>\n    </nz-tabset>\n</nz-content>\n\n<!--\n<nz-footer>\n    <nz-pagination [(nzPageIndex)]=\"_current\" [nzTotal]=\"50\" nzShowTotal nzShowSizeChanger\n                   nzShowQuickJumper></nz-pagination>\n</nz-footer>-->\n"

/***/ }),

/***/ "../../../../../src/app/service-catalog/service-catalog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceCatalogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ServiceCatalogComponent = (function () {
    function ServiceCatalogComponent() {
        this._current = 1;
        // 标签名
        this.title = '服务目录';
        // 分页
        this.tabs = [
            {
                index: 1,
                name: '中间件服务',
                tabName: 'Middleware',
                disabled: false
            },
            {
                index: 2,
                name: '数据库服务',
                tabName: 'Database',
                disabled: false
            },
            {
                index: 3,
                name: '微服务框架',
                tabName: 'Microservice',
                disabled: false
            }
        ];
        // 服务分类
        this.serviceType = ['Microservice', 'Database', 'Middleware'];
        // 多选框
        this.catalogOption = [
            { label: '中间件服务', value: 'tomcat', checked: true },
            { label: '数据库服务', value: 'db' },
        ];
        this.internetOption = [
            { label: 'portal域', value: 'publicRegion', chechked: true },
            { label: '核心域', value: 'coreRegion' },
            { label: '互联网域', value: 'internetRegion' }
        ];
        this.titleFilter = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        this.tabName = 'Middleware';
    }
    ServiceCatalogComponent.prototype.changeTabName = function (tabName) {
        this.tabName = tabName;
    };
    ServiceCatalogComponent.prototype._console = function (value) {
        console.log(value);
    };
    ServiceCatalogComponent.prototype._log = function (value) {
        console.log(value);
    };
    ServiceCatalogComponent.prototype.groupidHandler = function (event) {
        console.log('change event grouupid: ' + event);
    };
    ServiceCatalogComponent.prototype.ngOnInit = function () {
    };
    return ServiceCatalogComponent;
}());
ServiceCatalogComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-service-catalog',
        template: __webpack_require__("../../../../../src/app/service-catalog/service-catalog.component.html"),
        styles: [__webpack_require__("../../../../../src/app/service-catalog/service-catalog.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ServiceCatalogComponent);

//# sourceMappingURL=service-catalog.component.js.map

/***/ }),

/***/ "../../../../../src/app/service-detail/service-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".service-detail-wrapper{\n    padding-left: 30px;\n    padding-right: 30px;\n}\n.link-back{\n    margin-top: 35px;\n    margin-bottom: 20px;\n}\n.detail-img{\n    width: 100px;\n}\n.detail-title{\n    margin-left: 25px;\n    font-size: 28px;\n}\n.detail-img-wrapper .img-block{\n    display: table-cell;\n    vertical-align: middle;\n}\n.detail-desc-wrapper{\n    margin: 20px 0;\n    border: solid 1px #e4e4e4;\n}\n.detail-btn-group{\n\n}\n.detail-noraml-btn{\n    color: #2c9cfa;\n    margin-left: 6px;\n}\n.detail-content-wrapper, .detail-package-wrapper{\n    margin: 15px 0 30px 0;\n    background-color: #F8F9F9;\n    padding: 10px;\n}\n.detail-content, .detail-package{\n    padding: 10px 0;\n}\n.detail-content-one{\n    border-right: 1px solid #DDD;\n}\n.detail-instance-wrapper{\n    margin: 15px 0 30px 0;\n    padding: 10px;\n}\n.detail-develop-wrapper{\n    margin: 15px 0 30px 0;\n    background-color: #F8F9F9;\n    padding: 35px 0 0 70px;\n}\n .detail-package-num{\n    color: #2C9CFA\n }\n .detail-h3{\n     padding-bottom: 10px;\n     border-bottom: solid 1px #ddd;\n }\n .custom-image img{\n     height: 130px !important;\n     display: block;\n     margin: 0 auto;\n }\n.ant-card-bordered {\n    margin-bottom: 4px !important;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/service-detail/service-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header [title]=\"title\"></app-header>\n<nz-content class=\"service-detail-wrapper\">\n    <div class=\"link-back\">\n        <a [routerLink]=\"['/serviceCatalog']\">\n            <span class=\"glyphicon glyphicon-menu-left\"></span>\n            返回</a>\n    </div>\n    <div nz-row class=\"detail-img-wrapper\">\n        <div nz-col [nzSpan]=\"6\">\n            <div class=\"img-block\" *ngIf=\"serviceDetail\">\n                <img class=\"detail-img\" [src]='imgUrl + serviceDetail.serviceName + \".png\"' alt=\"\"/>\n            </div>\n            <div class=\"img-block\" *ngIf=\"serviceDetail\">\n                <p class=\"detail-title\">{{serviceDetail.serviceName}}</p>\n            </div>\n        </div>\n        <div nz-col [nzSpan]=\"6\" [nzOffset]=\"12\">\n            <div *ngIf=\"serviceDetail\" class=\"detail-btn-group\">\n                <button *ngIf=\"serviceDetail && subscribeID === 0\" [routerLink]=\"['/serviceApprove', serviceDetail.serviceName, serviceId]\" nz-button [nzType]=\"'primary'\"\n                        [nzSize]=\"'large'\">\n                    <span>订阅</span>\n                </button>\n                <button *ngIf=\"serviceDetail && subscribeID === 1\" disabled nz-button [nzType]=\"'default'\"\n                        [nzSize]=\"'large'\">\n                    <span>审批中</span>\n                </button>\n                <button *ngIf=\"serviceDetail && subscribeID === 2\" [routerLink]=\"['/serviceSubscribe', serviceDetail.serviceName, serviceId]\" nz-button [nzType]=\"'primary'\"\n                        [nzSize]=\"'large'\">\n                    <span>启动</span>\n                </button>\n                <button disabled=\"disabled\" nz-button [nzType]=\"'default'\" [nzSize]=\"'large'\" class=\"detail-noraml-btn\">\n                    <span>更新</span>\n                </button>\n                <button disabled=\"disabled\"  nz-button [nzType]=\"'default'\" [nzSize]=\"'large'\" class=\"detail-noraml-btn\">\n                    <span>下架</span>\n                </button>\n            </div>\n        </div>\n    </div>\n    <div nz-row class=\"detail-content-wrapper\" *ngIf=\"serviceDetail\">\n        <div nz-col [nzSpan]=\"12\" class=\"detail-content-one\">\n            <div nz-row class=\"detail-content\">\n                <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n                    服务类别\n                </div>\n                <div *ngIf=\"serviceDetail.serviceType\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n                    {{serviceDetail.serviceType}}\n                </div>\n            </div>\n            <div nz-row class=\"detail-content\">\n                <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n                    内核版本\n                </div>\n                <div *ngIf=\"serviceDetail.kernelVersion\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n                    {{serviceDetail.kernelVersion}}\n                </div>\n            </div>\n            <div nz-row class=\"detail-content\">\n                <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n                    标签\n                </div>\n                <div nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n                    无\n                </div>\n            </div>\n            <div nz-row class=\"detail-content\">\n                <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n                    描述\n                </div>\n                <div *ngIf=\"serviceDetail.display_info\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n                    {{serviceDetail.display_info}}\n                </div>\n            </div>\n        </div>\n        <div nz-col [nzSpan]=\"12\">\n            <div nz-row class=\"detail-content\">\n                <div nz-col [nzSpan]=\"4\" [nzOffset]=\"4\">\n                    服务编码\n                </div>\n                <div nz-col [nzSpan]=\"12\" [nzOffset]=\"4\" class=\"detail-package-num\">\n                    FW798678\n                </div>\n            </div>\n            <div nz-row class=\"detail-content\">\n                <div nz-col [nzSpan]=\"4\" [nzOffset]=\"4\">\n                    服务依赖\n                </div>\n                <div nz-col [nzSpan]=\"12\" [nzOffset]=\"4\" class=\"detail-package-num\">\n                    无\n                </div>\n            </div>\n            <div nz-row class=\"detail-content\">\n                <div nz-col [nzSpan]=\"4\" [nzOffset]=\"4\">\n                    服务版本\n                </div>\n                <div *ngIf=\"serviceDetail.serviceVersion\" nz-col [nzSpan]=\"12\" [nzOffset]=\"4\"\n                     class=\"detail-package-num\">\n                    V2.0\n                </div>\n            </div>\n            <div nz-row class=\"detail-content\">\n                <div nz-col [nzSpan]=\"4\" [nzOffset]=\"4\">\n                    提供者\n                </div>\n                <div nz-col [nzSpan]=\"12\" [nzOffset]=\"4\" class=\"detail-package-num\">\n                    abc\n                </div>\n            </div>\n        </div>\n    </div>\n    <h4 class=\"detail-h3\">版本管理</h4>\n    <!--zookeeper版本管理-->\n    <div nz-row class=\"detail-develop-wrapper\" *ngIf=\"serviceName === 'zookeeper'\">\n        <nz-timeline>\n            <nz-timeline-item [nzColor]=\"'green'\">上架 V3.4.6 准备 2017-06-27</nz-timeline-item>\n            <nz-timeline-item [nzColor]=\"'green'\">上架 V3.4.9 2017-08-27</nz-timeline-item>\n            <nz-timeline-item [nzColor]=\"'red'\">更新 V3.5.0 2017-09-07</nz-timeline-item>\n        </nz-timeline>\n    </div>\n  <!--redis版本管理-->\n  <div nz-row class=\"detail-develop-wrapper\" *ngIf=\"serviceName === 'redis'\">\n    <nz-timeline>\n      <nz-timeline-item [nzColor]=\"'green'\">上架 V3.0.1 准备 2017-06-27</nz-timeline-item>\n      <nz-timeline-item [nzColor]=\"'green'\">上架 V3.0.5 前测试 2017-08-05</nz-timeline-item>\n      <nz-timeline-item [nzColor]=\"'green'\">上架 V3.2.9 2017-08-27</nz-timeline-item>\n      <nz-timeline-item [nzColor]=\"'red'\">更新 3.2.10 2017-09-07</nz-timeline-item>\n    </nz-timeline>\n  </div>\n  <!--mysql版本管理-->\n  <div nz-row class=\"detail-develop-wrapper\" *ngIf=\"serviceName === 'mysql'\">\n    <nz-timeline>\n      <nz-timeline-item [nzColor]=\"'green'\">上架 V3.0.1 准备 2017-06-27</nz-timeline-item>\n      <nz-timeline-item [nzColor]=\"'green'\">上架 V3.0.5 前测试 2017-08-05</nz-timeline-item>\n      <nz-timeline-item [nzColor]=\"'green'\">上架 V3.2.9 2017-08-27</nz-timeline-item>\n      <nz-timeline-item [nzColor]=\"'red'\">更新 3.2.10 2017-09-07</nz-timeline-item>\n    </nz-timeline>\n  </div>\n   <!-- <h4 class=\"detail-h3\">已订购实例</h4>\n    <div nz-row class=\"detail-instance-wrapper\">\n        <div *ngIf=\"serviceInstances\">\n            <div nz-row [nzGutter]=\"8\">\n\n                <div *ngFor=\"let serviceInstance of serviceInstances | async\">\n\n                    <ng-template #hidden>\n                        <p>暂未订购实例</p>\n                    </ng-template>\n\n                    <div *ngIf=\"serviceInstance; else hidden\" nz-col [nzSpan]=\"6\">\n                        <nz-card>\n                            <ng-template #body>\n                                <div class=\"custom-image\"  *ngIf=\"serviceDetail\">\n                                    <img [src]='\"http://10.132.49.108:8180/api/0/files/apiService/fileName/\" + serviceDetail.serviceName + \".png\"' alt=\"\"/>\n                                </div>\n                                <div class=\"custom-card\">\n                                    <div class=\"card-content\">\n                                    <span class=\"pull-right\"\n                                          [style.color]=\"serviceInstance.status ? '#006600' : '#999999'\">\n                                    {{serviceInstance.status ? '正常':'下架'}}</span>\n                                        <span>{{serviceInstance.instanceName}}</span>\n                                    </div>\n                                    <div class=\"card-content\">\n                                        <span style=\"color: #999999\">{{serviceInstance.createTime | date:'yyyy-MM-dd HH:mm:ss'}}</span>\n                                        <span class=\"pull-right\">\n                                            <span *ngIf=\"serviceInstance.instanceName\" class=\"glyphicon glyphicon-trash\"\n                                                  (click)=\"showModal(serviceInstance.id, serviceInstance.instanceName)\"></span>\n                                </span>\n                                    </div>\n                                </div>\n                            </ng-template>\n                        </nz-card>\n                    </div>\n                </div>\n                &lt;!&ndash;<div *ngFor=\"let service of services | async\">\n                    {{service.name}}\n                </div>&ndash;&gt;\n            </div>\n        </div>\n    </div>\n-->\n    <div class=\"app-detail-block\">\n      <div class=\"app-detail-title\">已订购实例</div>\n      <div class=\"detail-instance-wrapper\" *ngIf=\"serviceInstances\">\n        <app-app-nztable [mirrorDetail]=\"serviceInstances\" [tableNum]=\"3\" [tableTitle]=\"table3Title\"></app-app-nztable>\n      </div>\n    </div>\n\n    <h4 class=\"detail-h3\">套餐</h4>\n    <div nz-row class=\"detail-package-wrapper\">\n        <div nz-col [nzSpan]=\"24\" style=\"margin-left: 10px\">\n            <app-container-instance #instanceThird [config]=\"formThird1Radios\">\n            </app-container-instance>\n        </div>\n       <!-- <div nz-row class=\"detail-package\">\n            <div nz-col [nzSpan]=\"3\" [nzOffset]=\"1\">\n                容器XS\n            </div>\n            <div nz-col [nzSpan]=\"5\" [nzOffset]=\"1\" class=\"detail-package-num\">\n                8 核 / 16 GB / 10 TB\n            </div>\n        </div>\n        <div nz-row class=\"detail-package\">\n            <div nz-col [nzSpan]=\"3\" [nzOffset]=\"1\">\n                容器S\n            </div>\n            <div nz-col [nzSpan]=\"5\" [nzOffset]=\"1\" class=\"detail-package-num\">\n                8 核 / 16 GB / 10 TB\n            </div>\n        </div>\n        <div nz-row class=\"detail-package\">\n            <div nz-col [nzSpan]=\"3\" [nzOffset]=\"1\">\n                容器L\n            </div>\n            <div nz-col [nzSpan]=\"5\" [nzOffset]=\"1\" class=\"detail-package-num\">\n                8 核 / 16 GB / 10 TB\n            </div>\n        </div>-->\n    </div>\n    <!--  <h4 class=\"detail-h3\">附件</h4>\n      <div nz-row class=\"detail-attach-wrapper\">\n          <div nz-row class=\"detail-package\">\n              <div nz-col [nzSpan]=\"8\" [nzOffset]=\"16\">\n                  附件\n              </div>\n          </div>\n      </div>-->\n</nz-content>\n<nz-modal [nzVisible]=\"isVisible\" [nzTitle]=\"'操作确认'\" [nzContent]=\"modalContent\" (nzOnCancel)=\"handleCancel($event)\" (nzOnOk)=\"handleOk($event)\">\n    <ng-template #modalContent>\n        <p>您是否确定删除{{deleteName}}</p>\n        <nz-spin [nzSize]=\"'large'\" [nzSpinning]=\"_isSpinning\" [nzTip]=\"'删除中'\" style=\"text-align: center;\">\n        </nz-spin>\n\n    </ng-template>\n</nz-modal>\n"

/***/ }),

/***/ "../../../../../src/app/service-detail/service-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ServiceDetailComponent = (function () {
    function ServiceDetailComponent(routeInfo, servicesService, http) {
        var _this = this;
        this.routeInfo = routeInfo;
        this.servicesService = servicesService;
        this.http = http;
        // 标签名
        this.title = '服务目录';
        //表格3thead
        this.table3Title = [
            {
                index: 1,
                name: '实例名称',
            },
            {
                index: 2,
                name: '所属集群',
            },
            {
                index: 3,
                name: '服务地址',
            },
            {
                index: 3,
                name: '状态',
            },
            {
                index: 3,
                name: '容器数量',
            },
            {
                index: 3,
                name: '大小',
            },
            {
                index: 3,
                name: '操作',
            }
        ];
        this.formThird1Radios = [
            {
                cpuSize: 0.125,
                memSize: '256',
                instance_size: 'XXS'
            },
            {
                cpuSize: 0.25,
                memSize: '512',
                instance_size: 'XS'
            },
            {
                cpuSize: 0.5,
                memSize: '1',
                instance_size: 'S'
            },
            {
                cpuSize: 1,
                memSize: '2',
                instance_size: 'M'
            },
            {
                cpuSize: 2,
                memSize: '4',
                instance_size: 'L'
            },
            {
                cpuSize: 4,
                memSize: '8',
                instance_size: 'XL'
            }
        ];
        this.serviceImgUrl = 'assets/service/mysql.png';
        this.imgUrl = __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].api + '/api/' + __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].adminGroupId + '/files/apiService/fileName/';
        this.titleFilter = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]();
        this._isSpinning = false;
        this.isVisible = false;
        this.deleteID = '';
        this.deleteName = '';
        this.showModal = function (id, name) {
            _this.isVisible = true;
            console.log('??' + id + name);
            _this.deleteID = id;
            _this.deleteName = name;
        };
        this.handleOk = function (e) {
            var status = '';
            status = _this.deleteService(_this.deleteID, _this.deleteName);
            console.log('handleOk状态status：' + status);
            if (status = '204') {
                _this._isSpinning = true;
                setTimeout(function () {
                    _this.isVisible = false;
                    console.log('删除成功，更新列表');
                    // 订阅流
                    _this.getServiceDetail(_this.serviceId).subscribe(function (data) {
                        _this.serviceDetail = data;
                    });
                    // 订阅服务详情下的实例 的流
                    // this.serviceInstances = this.getServiceInstances(this.serviceName);
                    _this.getServiceInstances(_this.serviceName).subscribe(function (data) {
                        _this.serviceInstances = data;
                    });
                    _this._isSpinning = false;
                }, 3000);
            }
            else {
                _this.isVisible = false;
                alert('删除失败');
            }
        };
        this.handleCancel = function (e) {
            console.log(e);
            _this.isVisible = false;
        };
    }
    ServiceDetailComponent.prototype.getServiceDetail = function (serviceId) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].apiService + '/apiService' + '/groups/' + this.servicesService.getCookie('groupID') + '/services/' + serviceId);
    };
    ServiceDetailComponent.prototype.getServiceInstances = function (serviceName) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].apiService + '/apiService' + '/groups/' + this.servicesService.getCookie('groupID') + '/services/' +
            serviceName + '/instances');
    };
    // 删除服务接口
    ServiceDetailComponent.prototype.deleteService = function (serviceId, serviceName) {
        status = '';
        console.log('删除服务实例：' + serviceName + '  ' + serviceId);
        // 返回是string 不是json
        this.http.delete(this.servicesService.getCookie('groupID') + '/apiService' + '/groups/' +
            this.servicesService.getCookie('groupID') + '/service-instances/' + serviceId).subscribe(function (data) {
            status = data['status'].toString(); // 返回状态204删除成功
            console.log('删除接口返回状态status：' + status);
        });
        return status;
    };
    ServiceDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.serviceInfo = this.routeInfo.snapshot.params['serviceId'];
        if (this.serviceInfo.split('@')) {
            var temp = this.serviceInfo.split('@');
            this.serviceName = temp[0];
            this.serviceId = temp[1];
            console.log(this.serviceId);
            console.log(this.serviceName);
        }
        else {
            this.serviceInfo = '';
        }
        this.tabName = this.routeInfo.snapshot.params['tabName'];
        // 订阅流
        this.getServiceDetail(this.serviceId).subscribe(function (data) {
            _this.serviceDetail = data;
            _this.subscribeID = data.subscribeProgress;
            console.log('subscribeProgress: ' + _this.subscribeID);
        });
        // 订阅服务详情下的实例 的流
        // this.serviceInstances = this.getServiceInstances(this.serviceName);
        this.getServiceInstances(this.serviceName).subscribe(function (data) {
            _this.serviceInstances = data;
        });
    };
    return ServiceDetailComponent;
}());
ServiceDetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-service-detail',
        template: __webpack_require__("../../../../../src/app/service-detail/service-detail.component.html"),
        styles: [__webpack_require__("../../../../../src/app/service-detail/service-detail.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_services_service__["a" /* ServicesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */]) === "function" && _c || Object])
], ServiceDetailComponent);

var _a, _b, _c;
//# sourceMappingURL=service-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/service-instance-detail/service-instance-detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".service-detail-wrapper{\n    padding-left: 30px;\n    padding-right: 30px;\n}\n.link-back{\n    margin-top: 35px;\n    margin-bottom: 20px;\n}\n.detail-img{\n    width: 100px;\n}\n.detail-title{\n    margin-left: 25px;\n    font-size: 20px;\n}\n.detail-img-wrapper .img-block{\n    display: table-cell;\n    vertical-align: middle;\n}\n.detail-desc-wrapper{\n    margin: 20px 0;\n    border: solid 1px #e4e4e4;\n}\n.detail-btn-group{\n\n}\n.detail-noraml-btn{\n    color: #2c9cfa;\n    margin-left: 6px;\n}\n.detail-content-wrapper, .detail-package-wrapper{\n    margin: 15px 0 30px 0;\n    background-color: #F8F9F9;\n    padding: 10px;\n}\n.detail-content, .detail-package{\n    padding: 10px 0;\n}\n.detail-content-one{\n    border-right: 1px solid #DDD;\n}\n.detail-instance-wrapper{\n    margin: 15px 0 30px 0;\n    padding: 10px;\n}\n.detail-develop-wrapper{\n    margin: 15px 0 30px 0;\n    background-color: #F8F9F9;\n    padding: 35px 0 0 70px;\n}\n.detail-package-num{\n    color: #2C9CFA\n}\n.detail-h3{\n    padding-bottom: 10px;\n    border-bottom: solid 1px #ddd;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/service-instance-detail/service-instance-detail.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header [title]=\"title\"></app-header>\n<nz-content class=\"service-detail-wrapper\">\n    <div class=\"link-back\">\n        <a [routerLink]=\"['/serviceInstance']\">\n            <span class=\"glyphicon glyphicon-menu-left\"></span>\n            返回</a>\n    </div>\n    <div nz-row class=\"detail-img-wrapper\">\n        <div nz-col [nzSpan]=\"6\">\n            <div class=\"img-block\">\n                <img class=\"detail-img\" [src]=\"serviceImgUrl\" alt=\"\"/>\n            </div>\n            <div class=\"img-block\" *ngIf=\"instanceDetail\">\n                <p *ngIf=\"instanceDetail.instanceName\" class=\"detail-title\">{{instanceDetail.instanceName}}</p>\n            </div>\n        </div>\n    </div>\n    <div nz-row class=\"detail-content-wrapper\" *ngIf=\"instanceDetail\">\n        <div nz-col [nzSpan]=\"12\" class=\"detail-content-one\">\n            <div nz-row class=\"detail-content\">\n                <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n                    实例编码\n                </div>\n                <div *ngIf=\"instanceDetail.id\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\" class=\"detail-package-num\">\n                    {{instanceDetail.id}}\n                </div>\n            </div>\n            <div nz-row class=\"detail-content\">\n                <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n                    创建时间\n                </div>\n                <div *ngIf=\"instanceDetail.createTime\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n                    {{instanceDetail.createTime | date:'yyyy-MM-dd HH:mm:ss'}}\n                </div>\n            </div>\n            <div nz-row class=\"detail-content\">\n                <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n                    实例状态\n                </div>\n                <div *ngIf=\"instanceDetail.info\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\" class=\"detail-package-num\">\n                    {{instanceDetail.info.current_status}}\n                </div>\n            </div>\n        </div>\n        <div nz-col [nzSpan]=\"12\">\n            <div nz-row class=\"detail-content\">\n                <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n                    CPU大小\n                </div>\n                <div *ngIf=\"instanceDetail.cpuSize\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n                    {{instanceDetail.cpuSize}} 个\n                </div>\n            </div>\n            <div nz-row class=\"detail-content\">\n                <div nz-col [nzSpan]=\"3\" [nzOffset]=\"3\">\n                    内存大小\n                </div>\n                <div *ngIf=\"instanceDetail.memSize\" nz-col [nzSpan]=\"15\" [nzOffset]=\"3\">\n                    {{instanceDetail.memSize}} MB\n                </div>\n            </div>\n        </div>\n    </div>\n    <h4 class=\"detail-h3\">子服务列表</h4>\n      <div class=\"detail-instance-wrapper\" *ngIf=\"instanceDetail\">\n        <app-app-nztable [mirrorDetail]=\"instanceDetail\" [tableNum]=\"4\" [tableTitle]=\"table4Title\"></app-app-nztable>\n      </div>\n</nz-content>\n"

/***/ }),

/***/ "../../../../../src/app/service-instance-detail/service-instance-detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceInstanceDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ServiceInstanceDetailComponent = (function () {
    function ServiceInstanceDetailComponent(routeInfo, http) {
        this.routeInfo = routeInfo;
        this.http = http;
        // 标签名
        this.title = '服务实例';
        this.serviceImgUrl = 'assets/service/mirror.png';
        //表格4thead
        this.table4Title = [
            {
                index: 1,
                name: '名称',
            },
            {
                index: 2,
                name: '状态',
            },
            {
                index: 3,
                name: '容器大小',
            },
            {
                index: 3,
                name: '容器数目',
            }
        ];
    }
    ServiceInstanceDetailComponent.prototype.getServiceInstanceDetail = function (instanceId) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiService + '/apiService' + '/service-instances/' + instanceId).map(function (res) { return res.json(); });
    };
    ServiceInstanceDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.instanceId = this.routeInfo.snapshot.params['instanceId'];
        // 订阅流
        this.getServiceInstanceDetail(this.instanceId).subscribe(function (data) {
            _this.instanceDetail = data;
        });
    };
    return ServiceInstanceDetailComponent;
}());
ServiceInstanceDetailComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-service-instance-detail',
        template: __webpack_require__("../../../../../src/app/service-instance-detail/service-instance-detail.component.html"),
        styles: [__webpack_require__("../../../../../src/app/service-instance-detail/service-instance-detail.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _b || Object])
], ServiceInstanceDetailComponent);

var _a, _b;
//# sourceMappingURL=service-instance-detail.component.js.map

/***/ }),

/***/ "../../../../../src/app/service-instance/service-instance.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.ant-layout-content {\n    margin-left: 30px;\n    margin-right: 20px;\n}\n\n.catalog-options-wrapper {\n    margin: 25px 0 15px 0;\n}\n\n.dataStatus {\n    color: #fff;\n    margin-right: 25px;\n    padding: 1px 0;\n    text-align: center;\n    border-radius: 10px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/service-instance/service-instance.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header [title]=\"title\"></app-header>\n<app-group-select (groupidHandler)=\"groupidHandler($event)\"></app-group-select>\n\n<nz-content>\n  <!--  <div nz-row class=\"catalog-options-wrapper\">\n        <div nz-col [nzSpan]=\"6\" [nzOffset]=\"18\">\n            &lt;!&ndash; <nz-input class=\"serviceInstanceSearch\"\n                       [nzSize]=\"large\"\n                       [(ngModel)]=\"inputValue\"\n                       [nzPlaceHolder]=\"'按服务名称搜索...'\"\n                       (ngModelChange)=\"_console($event)\">\n                 <ng-template #addOnAfter><i class=\"anticon anticon-search\"></i></ng-template>\n             </nz-input>&ndash;&gt;\n            <div class=\"input-group\">\n                <input type=\"text\" class=\"form-control\" placeholder=\"按服务名称搜索...\" [formControl]=\"titleFilter\">\n                <span class=\"input-group-btn\">\n                    <button class=\"btn btn-default\" type=\"button\">\n                        <span class=\"glyphicon glyphicon-search\"></span>\n                    </button>\n                </span>\n            </div>\n        </div>\n    </div>-->\n  <app-search [titleFilter]=\"titleFilter\" [offset]=\"18\"></app-search>\n\n  <nz-table #nzTable\n            [nzAjaxData]=\"_dataSet\"\n            nzShowSizeChanger\n            [nzShowTotal]=\"true\"\n            [nzLoading]=\"_loading\"\n            [nzTotal]=\"_total\"\n            [(nzPageIndex)]=\"_current\"\n            (nzPageIndexChange)=\"refreshData()\"\n            [(nzPageSize)]=\"_pageSize\"\n            (nzPageSizeChange)=\"refreshData(true)\">\n    <thead nz-thead>\n    <tr>\n      <th nz-th>\n        <span>实例名称</span>\n        <nz-table-sort [(nzValue)]=\"sortMap.instanceName\"\n                       (nzValueChange)=\"sort('instanceName', $event)\"></nz-table-sort>\n      </th>\n      <th nz-th>\n        <span>服务名称</span>\n        <nz-table-sort [(nzValue)]=\"sortMap.serviceDisplayName\"\n                       (nzValueChange)=\"sort('serviceDisplayName', $event)\"></nz-table-sort>\n      </th>\n      <th nz-th>\n        <span>创建时间</span>\n        <nz-table-sort [(nzValue)]=\"sortMap.createTime\"\n                       (nzValueChange)=\"sort('createTime', $event)\"></nz-table-sort>\n      </th>\n      <th nz-th>\n        <span>实例状态</span>\n        <nz-table-sort [(nzValue)]=\"sortMap.status\" (nzValueChange)=\"sort('status', $event)\"></nz-table-sort>\n      </th>\n      <th nz-th>\n        <span>容器数量</span>\n        <nz-table-sort [(nzValue)]=\"sortMap.instancesCount\"\n                       (nzValueChange)=\"sort('instancesCount', $event)\"></nz-table-sort>\n      </th>\n      <th nz-th>\n        <span>大小</span>\n        <nz-table-sort [(nzValue)]=\"sortMap.cpuSize\" (nzValueChange)=\"sort('cpuSize', $event)\"></nz-table-sort>\n      </th>\n      <th nz-th>\n\n        <span>操作</span>\n      </th>\n    </tr>\n    </thead>\n    <tbody nz-tbody>\n    <tr nz-tbody-tr *ngFor=\"let data of nzTable.data  | appFilter: 'instanceName' : keyword\">\n      <td nz-td>\n        <a [routerLink]=\"['/serviceInstanceDetail', data.id]\">{{data.instanceName}}</a>\n      </td>\n      <td nz-td>{{data.serviceDisplayName}}</td>\n      <td nz-td>{{data.createTime | date:'yyyy-MM-dd HH:mm:ss'}}</td>\n      <td nz-td>\n        <p [style.background-color]=\"data.status==='Running' ? '#67c281' : '#ff9933'\"\n           class=\"dataStatus\">\n          {{data.status}}\n        </p>\n      </td>\n      <td nz-td>{{data.instancesCount}} 个</td>\n      <td nz-td>{{data.cpuSize}} 核 {{data.memSize}} MB</td>\n\n      <td nz-td>\n        <button nz-button [nzType]=\"'primary'\" nzSize=\"small\" (click)=\"showModal(data.id, data.instanceName);\">\n          <span>删除</span>\n        </button>\n      </td>\n    </tr>\n    </tbody>\n  </nz-table>\n</nz-content>\n\n<nz-modal [nzVisible]=\"isVisible\" [nzTitle]=\"'操作确认'\" [nzContent]=\"modalContent\" (nzOnCancel)=\"handleCancel($event)\"\n          (nzOnOk)=\"handleOk($event)\">\n  <ng-template #modalContent>\n    <p>已选择服务实例：{{deleteName}}，是否确定删除？</p>\n    <nz-spin [nzSize]=\"'large'\" [nzSpinning]=\"_isSpinning\" [nzTip]=\"'删除中'\" style=\"text-align: center;\">\n    </nz-spin>\n\n  </ng-template>\n</nz-modal>\n"

/***/ }),

/***/ "../../../../../src/app/service-instance/service-instance.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceInstanceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_random_user_service__ = __webpack_require__("../../../../../src/app/shared/random-user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ServiceInstanceComponent = (function () {
    function ServiceInstanceComponent(http, _randomUser, servicesService, _notification) {
        var _this = this;
        this.http = http;
        this._randomUser = _randomUser;
        this.servicesService = servicesService;
        this._notification = _notification;
        // 标签名
        this.title = '服务实例';
        // input输入框
        this.titleFilter = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]();
        this.deleteID = '';
        this.deleteName = '';
        this.isVisible = false;
        this._isSpinning = false;
        this._current = 1;
        this._pageSize = 10;
        this._total = 1;
        this._loading = true;
        this.sortMap = {
            serviceDisplayName: null,
            instanceName: null,
            createTime: null,
            status: null,
            instancesCount: null,
            cpuSize: null,
        };
        this._sortName = null;
        this._sortValue = null;
        this._dataSet = [];
        this.copyData = this._dataSet.slice();
        this.showModal = function (id, name) {
            _this.isVisible = true;
            _this.deleteID = id;
            _this.deleteName = name;
        };
        this.handleOk = function (e) {
            _this.deleteServiceInstance(_this.deleteID, _this.deleteName);
            _this._isSpinning = true;
            setTimeout(function () {
                _this.isVisible = false;
                console.log('删除成功，更新列表');
                _this.refreshData();
                _this._isSpinning = false;
            }, 1000);
        };
        this.createNotification = function (type, title, content) {
            _this._notification.create(type, title, content);
        };
        this.handleCancel = function (e) {
            console.log(e);
            _this.isVisible = false;
        };
    }
    // 删除服务实例接口
    ServiceInstanceComponent.prototype.deleteServiceInstance = function (instanceID, instanceName) {
        var _this = this;
        this.http.delete(__WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].apiService + '/apiService/' + '/groups/' + this.servicesService.getCookie('groupID') + '/service-instances/' + instanceID).subscribe(function (data) {
            console.log('data: ' + data);
            status = data.toString();
            console.log('datatoString: ' + status);
        }, function (err) {
            console.log(err._body);
            _this.createNotification('error', '删除服务实例失败', err._body);
        });
    };
    ServiceInstanceComponent.prototype.groupidHandler = function (event) {
        console.log('change event: ' + event);
        console.log('change event this.groupid: ' + this.groupid);
        this.groupid = event;
        // console.log('change！！ get groupid: ' + this.groupid);
        // console.log('change！！ cookie: ' + this.servicesService.getCookie('groupID'));
        this.refreshData();
    };
    ServiceInstanceComponent.prototype.sort = function (sortName, value) {
        var _this = this;
        this._sortName = sortName;
        this._sortValue = value;
        Object.keys(this.sortMap).forEach(function (key) {
            if (key !== sortName) {
                _this.sortMap[key] = null;
            }
            else {
                _this.sortMap[key] = value;
            }
        });
        this.refreshData();
    };
    ServiceInstanceComponent.prototype.reset = function () {
        this.refreshData(true);
    };
    ServiceInstanceComponent.prototype.refreshData = function (reset) {
        var _this = this;
        if (reset === void 0) { reset = false; }
        /*
          if (reset) {
              this._current = 1;
          }
        */
        this._loading = true;
        this._randomUser.getServiceInstances(this._current, this._pageSize, this._sortName, this._sortValue).subscribe(function (data) {
            console.log(_this._current);
            console.log(_this._pageSize);
            console.log(_this._sortName);
            console.log(_this._sortValue);
            console.log(data);
            _this._loading = false;
            _this._total = data.length;
            _this._dataSet = data.slice((_this._current - 1) * _this._pageSize, _this._current * _this._pageSize);
            _this._dataSet = _this._dataSet.sort(function (a, b) {
                if (a[_this._sortName] > b[_this._sortName]) {
                    return (_this._sortValue === 'ascend') ? 1 : -1;
                }
                else if (a[_this._sortName] < b[_this._sortName]) {
                    return (_this._sortValue === 'ascend') ? -1 : 1;
                }
                else {
                    return 0;
                }
            }).slice();
            // this._dataSet = data;
        });
    };
    ServiceInstanceComponent.prototype._console = function (value) {
        console.log(value);
    };
    ServiceInstanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 添加timeout时间，把init时间放到队列末尾，等待groupselect加载完成。
        setTimeout(function () {
            _this.refreshData(true);
        }, 0);
        this.titleFilter.valueChanges
            .debounceTime(500)
            .subscribe(function (value) { return _this.keyword = value; });
    };
    return ServiceInstanceComponent;
}());
ServiceInstanceComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-service-instance',
        template: __webpack_require__("../../../../../src/app/service-instance/service-instance.component.html"),
        styles: [__webpack_require__("../../../../../src/app/service-instance/service-instance.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_random_user_service__["a" /* RandomUserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_random_user_service__["a" /* RandomUserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__shared_services_service__["a" /* ServicesService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _d || Object])
], ServiceInstanceComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=service-instance.component.js.map

/***/ }),

/***/ "../../../../../src/app/service-list/service-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".custom-card span {\n    font-size: 13px;\n    color: #333333;\n    text-decoration: none;\n}\n\n.card-content {\n    padding: 10px 0;\n}\n\n.custom-image img {\n    height: 130px !important;\n    display: block;\n    margin: 0 auto;\n}\n\n.ant-card-bordered {\n    margin-bottom: 4px !important;\n}\n.card-table{\n\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/service-list/service-list.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n<nz-table *ngIf=\"services2\" #nzTable [nzDataSource]=\"services2\" [nzPageSize]=\"10\" [nzShowSizeChanger]=\"true\">\n    <thead nz-thead>\n    <tr>\n        <th nz-th><span>Name1</span></th>\n    </tr>\n    </thead>\n    <tbody nz-tbody class=\"card-table\">\n    <tr nz-tbody-tr>\n        <td nz-td  *ngFor=\"let service of nzTable.data\">\n            <nz-card style=\"width:300px;\">\n                <ng-template #body>\n                    <div class=\"custom-card\">\n                        <div class=\"card-content\">\n                            <div class=\"custom-image\">\n                                <img *ngIf=\"service.repositoryName\" [src]=\"serviceImgUrl\" alt=\"\"/>\n                            </div>\n                                    <span *ngIf=\"service.status\" class=\"pull-right\"\n                                          [style.color]=\"service.status ? '#006600' : '#999999'\">\n                                    {{service.isEnable ? '正常':'下架'}}</span>\n                            <span *ngIf=\"service.deleted || !service.deleted\" class=\"pull-right\"\n                                  [style.color]=\"!service.deleted ? '#006600' : '#999999'\">\n                                    {{!service.deleted ? '正常':'下架'}}</span>\n\n                            <span *ngIf=\"service.repositoryName\">{{service.repositoryName}}</span>\n                            <span *ngIf=\"service.serviceName\">{{service.serviceName}}</span>\n                            <span *ngIf=\"service.appName\">{{service.appName}}</span>\n                        </div>\n                        <div class=\"card-content\">\n                            <span style=\"color: #999999\">{{service.createTime | date:'yyyy-MM-dd HH:mm:ss'}}</span>\n                            <span class=\"pull-right\">\n                                    <span *ngIf=\"service.repositoryName\" class=\"glyphicon glyphicon-trash\"\n                                          (click)=\"showModal('repository', service.repositoryName);\"></span>\n                                &lt;!&ndash;<span *ngIf=\"service.serviceName\" class=\"glyphicon glyphicon-trash\"\n                                      (click)=\"deleteService(service.id, service.serviceName)\">b</span>&ndash;&gt;\n                                     <span *ngIf=\"service.appName\" class=\"glyphicon glyphicon-trash\"\n                                           (click)=\"showModal(service.id, service.appName);\"></span>\n\n                                </span>\n                        </div>\n                    </div>\n                </ng-template>\n            </nz-card>\n        </td>\n\n    </tr>\n    </tbody>\n</nz-table>\n-->\n\n<div *ngIf=\"services\">\n    <div nz-row [nzGutter]=\"8\">\n        <div *ngFor=\"let service of services | async  | appFilter: moduleName : keyword\">\n<!--\n          判断如果是应用则显示。如果是服务，需要服务的类型等于tab中选择的类型，如数据库服务，过滤服务数据\n-->\n            <div nz-col [nzSpan]=\"6\" *ngIf=\"(service.serviceName && service.serviceType === tabName) || service.appName\">\n                <nz-card>\n                    <ng-template #body>\n                        <!-- 如果是服务-->\n                        <a *ngIf=\"service.serviceName\"\n                           [routerLink]=\"['/'+moduleName+'Detail', moduleName, service.serviceName + '@' + service.id, tabName]\">\n                            <div class=\"custom-image\">\n                                <img *ngIf=\"service.serviceName\"\n                                     [src]='serviceImgUrl + service.serviceName + \".png\"'\n                                     alt=\"\"/>\n                            </div>\n                        </a>\n                        <!-- 如果是应用-->\n                        <a *ngIf=\"service.appName\"\n                           [routerLink]=\"['/'+moduleName+'Detail', moduleName, service.appName, tabName]\">\n                            <div class=\"custom-image\">\n                                <img *ngIf=\"service.appName\" #customImg\n                                     [src]='appimgUrl + service.appName + \".png\"'\n                                     alt=\"\" onerror=\"this.src = 'assets/service/app.png'\"/>\n                            </div>\n                        </a>\n\n                        <div class=\"custom-card\">\n                            <div class=\"card-content\">\n                                    <span *ngIf=\"service.status\" style=\"float: right\"\n                                          [style.color]=\"service.status ? '#006600' : '#999999'\">\n                                    {{service.isEnable ? '正常':'下架'}}</span>\n                                <span *ngIf=\"service.deleted || !service.deleted\"  style=\"float: right\"\n                                      [style.color]=\"!service.deleted ? '#006600' : '#999999'\">\n                                    {{!service.deleted ? '正常':'下架'}}</span>\n\n                                <span *ngIf=\"service.repositoryName\">{{service.repositoryName}}</span>\n                                <span *ngIf=\"service.serviceName\">{{service.serviceName}}</span>\n                                <span *ngIf=\"service.appName\">{{service.appName}}</span>\n                            </div>\n                            <div class=\"card-content\">\n                                <span style=\"color: #999999\">{{service.createTime | date:'yyyy-MM-dd HH:mm:ss'}}</span>\n                                <span class=\"pull-right\">\n                                    <span *ngIf=\"service.repositoryName && tabName =='private'\" class=\"glyphicon glyphicon-trash\"\n                                          (click)=\"showModal('repository', service.repositoryName);\"></span>\n                                    <!--<span *ngIf=\"service.serviceName\" class=\"glyphicon glyphicon-trash\"\n                                          (click)=\"deleteService(service.id, service.serviceName)\">b</span>-->\n                                     <span *ngIf=\"service.appName\" class=\"glyphicon glyphicon-trash\"\n                                           (click)=\"showModal(service.id, service.appName);\"></span>\n\n                                </span>\n                            </div>\n                        </div>\n                    </ng-template>\n                </nz-card>\n            </div>\n        </div>\n        <!--<div *ngFor=\"let service of services | async\">\n            {{service.name}}\n        </div>-->\n    </div>\n</div>\n\n\n<nz-modal [nzVisible]=\"isVisible\" [nzTitle]=\"'操作确认'\" [nzContent]=\"modalContent\" (nzOnCancel)=\"handleCancel($event)\" (nzOnOk)=\"handleOk($event)\">\n    <ng-template #modalContent>\n        <p>您是否确定删除{{deleteName}}</p>\n            <nz-spin [nzSize]=\"'large'\" [nzSpinning]=\"_isSpinning\" [nzTip]=\"'删除中'\" style=\"text-align: center;\">\n            </nz-spin>\n\n    </ng-template>\n</nz-modal>\n"

/***/ }),

/***/ "../../../../../src/app/service-list/service-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ServiceListComponent = (function () {
    /*showConfirm = (id, appName) => {
        this.confirmServ.confirm({
            title  : '您是否确认删除应用' + appName,
            onOk() {
                console.log('确定');
                return new Promise((resolve) => {
                    setTimeout(resolve, 1000);
                    this.deleteApp(id, appName);
                    this.services = this.servicesService.getServices(this.tabName, this.moduleName);
                });
            },
            onCancel() {
            }
        });
    }*/
    function ServiceListComponent(servicesService, http) {
        var _this = this;
        this.servicesService = servicesService;
        this.http = http;
        this.titleFilter = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]();
        this.mirrorImgUrl = 'assets/service/mirror.png';
        // appimgUrl = environment.api + '/api/' + this.servicesService.getCookie('groupID') + '/files/app/fileName/';
        this.serviceImgUrl = __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].api + '/api/' + __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].adminGroupId + '/files/apiService/fileName/';
        this._isSpinning = false;
        this.isVisible = false;
        this.deleteID = '';
        this.deleteName = '';
        this._dataSet = [];
        this.showModal = function (id, name) {
            _this.isVisible = true;
            console.log('??' + id + name);
            _this.deleteID = id;
            _this.deleteName = name;
        };
        this.handleOk = function (e) {
            var status = '';
            // 如果对应的是删除镜像
            if (_this.deleteID === 'repository') {
                status = _this.deleteMirror(_this.deleteName);
                if (status = '204') {
                    _this._isSpinning = true;
                    setTimeout(function () {
                        _this.isVisible = false;
                        console.log('删除成功，更新列表');
                        _this.services = _this.servicesService.getServices(_this.tabName, _this.moduleName);
                        _this._isSpinning = false;
                    }, 3000);
                }
                else {
                    _this.isVisible = false;
                    alert('删除失败');
                }
                // 如果对应的是删除应用
            }
            else if (_this.deleteID.length > 0) {
                status = _this.deleteApp(_this.deleteID, _this.deleteName);
                console.log('asdasd' + status);
                if (status = '204') {
                    _this._isSpinning = true;
                    setTimeout(function () {
                        _this.isVisible = false;
                        console.log('删除成功，更新列表');
                        _this.services = _this.servicesService.getServices(_this.tabName, _this.moduleName);
                        _this._isSpinning = false;
                    }, 3000);
                }
                else {
                    alert('删除失败');
                }
            }
        };
        this.handleCancel = function (e) {
            console.log(e);
            _this.isVisible = false;
        };
    }
    // products 用来测试非async方法通过订阅获取数据而不是流
    // products: any;
    // 删除镜像接口
    ServiceListComponent.prototype.deleteMirror = function (mirrorName) {
        status = '';
        console.log('删除镜像：' + mirrorName + '  ' + this.tabName);
        // 返回是string 不是json
        this.http.delete(__WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].api + '/api/' + this.servicesService.getCookie('groupID') + '/warehouse/repository/' + mirrorName + '?region=' + this.tabName).subscribe(function (data) {
            status = data.toString();
        });
        return status;
    };
    // 删除应用接口
    ServiceListComponent.prototype.deleteApp = function (appId, appName) {
        status = '';
        console.log('删除应用：' + appName + '  ' + appId);
        this.http.delete(__WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/applications/' + appId).subscribe(function (data) {
            console.log(data.status); // 删除成功是204
        });
        return status;
    };
    // 无法获取图片路径，传入默认图片
    ServiceListComponent.prototype.errorImage = function ($this) {
        $this.src = 'assets/service/mysql.png';
        console.log($this);
        // $this.src = this.serviceImgUrl;
        // $this.onerror = null;
    };
    ServiceListComponent.prototype.ngOnChanges = function (changes) {
        console.log('servicelist  ngOnChanges');
        console.log('servicelist  groupid: ' + this.groupid);
        console.log('servicelist  tabName: ' + this.tabName);
        this.services = this.servicesService.getServices(this.tabName, this.moduleName);
        this.appimgUrl = __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].api + '/api/' + this.servicesService.getCookie('groupID') + '/files/app/fileName/';
        this.keyword = '';
    };
    ServiceListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appimgUrl = __WEBPACK_IMPORTED_MODULE_5__environments_environment__["a" /* environment */].api + '/api/' + this.servicesService.getCookie('groupID') + '/files/app/fileName/';
        /* this.servicesService.getServices().subscribe((data) => {
             this.products = data;
             this.products = this.products.images;
         });*/
        // this.services = this.servicesService.getServices(this.tabName, this.moduleName);
        /*this.servicesService.getServices(this.tabName, this.moduleName).subscribe((data) => {
           this.services2 = data;
         });*/
        this.titleFilter.valueChanges
            .debounceTime(500)
            .subscribe(function (value) { return _this.keyword = value; });
    };
    return ServiceListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ServiceListComponent.prototype, "groupid", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ServiceListComponent.prototype, "tabName", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]) === "function" && _a || Object)
], ServiceListComponent.prototype, "titleFilter", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ServiceListComponent.prototype, "moduleName", void 0);
ServiceListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-service-list',
        template: __webpack_require__("../../../../../src/app/service-list/service-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/service-list/service-list.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_services_service__["a" /* ServicesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */]) === "function" && _c || Object])
], ServiceListComponent);

var _a, _b, _c;
//# sourceMappingURL=service-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/service-release/service-release.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".verticalMiddle{\n    height: 32px;\n    line-height: 32px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/service-release/service-release.component.html":
/***/ (function(module, exports) {

module.exports = "<div>基本信息</div>\n<nz-tabset [nzTabPosition]=\"'top'\" [nzType]=\"'card'\">\n  <nz-tab *ngFor=\"let tab of tabs\">\n    <ng-template #nzTabHeading>\n      Tab {{tab.index}}\n    </ng-template>\n    <div *ngIf=\"tab.index === 1\">\n      <div>\n        <div nz-row [nzGutter]=\"20\">\n          <div nz-col [nzSpan]=\"12\" class=\"verticalMiddle\">\n            <div nz-col [nzSpan]=\"2\"><span>服务名称</span></div>\n            <div nz-col [nzSpan]=\"22\">\n              <nz-input [(ngModel)]=\"inputValue\" [nzSize]=\"'large'\" [nzPlaceHolder]=\"'请输入'\" (ngModelChange)=\"_console($event)\"></nz-input>\n            </div>\n          </div>\n          <div nz-col [nzSpan]=\"12\" class=\"verticalMiddle\">\n            <div nz-col [nzSpan]=\"2\"><span>服务依赖</span></div>\n            <div nz-col [nzSpan]=\"22\">\n              <nz-input [(ngModel)]=\"inputValue\" [nzSize]=\"'large'\" [nzPlaceHolder]=\"'请输入'\" (ngModelChange)=\"_console($event)\"></nz-input>\n            </div>\n          </div>\n        </div>\n        <div nz-row [nzGutter]=\"20\">\n          <div nz-col [nzSpan]=\"12\" class=\"verticalMiddle\">\n            <div nz-col [nzSpan]=\"2\"><span>服务类别</span></div>\n            <div nz-col [nzSpan]=\"22\">\n              <nz-select style=\"width: 50%\" [(ngModel)]=\"selectedOption\" nzAllowClear>\n                <nz-option *ngFor=\"let option of options\" [nzLabel]=\"option.label\" [nzValue]=\"option\" [nzDisabled]=\"option.disabled\">\n                </nz-option>\n              </nz-select>\n            </div>\n          </div>\n          <div nz-col [nzSpan]=\"12\" class=\"verticalMiddle\">\n            <div nz-col [nzSpan]=\"2\"><span>资源池</span></div>\n            <div nz-col [nzSpan]=\"22\">\n              <nz-checkbox-group [(ngModel)]=\"checkOptionsOne\" (ngModelChange)=\"_console(checkOptionsOne)\"></nz-checkbox-group>\n            </div>\n          </div>\n        </div>\n        <div nz-row [nzGutter]=\"20\">\n          <div nz-col [nzSpan]=\"12\" class=\"verticalMiddle\">\n            <div nz-col [nzSpan]=\"2\"><span>内核类别</span></div>\n            <div nz-col [nzSpan]=\"22\">\n              <nz-select style=\"width: 50%\" [(ngModel)]=\"selectedOption\" nzAllowClear>\n                <nz-option *ngFor=\"let option of options\" [nzLabel]=\"option.label\" [nzValue]=\"option\" [nzDisabled]=\"option.disabled\">\n                </nz-option>\n              </nz-select>\n            </div>\n          </div>\n          <div nz-col [nzSpan]=\"12\" class=\"verticalMiddle\">\n            <div nz-col [nzSpan]=\"2\"><span>发布到</span></div>\n            <div nz-col [nzSpan]=\"22\">\n              <nz-radio-group [(ngModel)]=\"radioValue\">\n                <label nz-radio [nzValue]=\"'tenant'\">\n                  <span>本租户</span>\n                </label>\n                <label nz-radio [nzValue]=\"'global'\">\n                  <span>全局</span>\n                </label>\n              </nz-radio-group>\n            </div>\n          </div>\n        </div>\n        <div nz-row [nzGutter]=\"20\">\n          <div nz-col [nzSpan]=\"12\" class=\"verticalMiddle\">\n            <div nz-col [nzSpan]=\"2\"><span>标签</span></div>\n            <div nz-col [nzSpan]=\"22\">\n              <nz-select style=\"width: 50%;\" [nzTags]=\"true\" [nzPlaceHolder]=\"'请选择标签'\" [(ngModel)]=\"selectedMultipleOption\" [nzNotFoundContent]=\"'无法找到'\"\n                [nzShowSearch]=\"true\">\n                <nz-option *ngFor=\"let option of searchOptions\" [nzLabel]=\"option.label\" [nzValue]=\"option\">\n                </nz-option>\n              </nz-select>\n            </div>\n          </div>\n        </div>\n        <div nz-row [nzGutter]=\"20\">\n          <div nz-col [nzSpan]=\"12\">\n            <div nz-col [nzSpan]=\"2\"><span>描述</span></div>\n            <div nz-col [nzSpan]=\"22\">\n              <nz-input [(ngModel)]=\"describeValue\" [nzType]=\"'textarea'\" [nzRows]=\"'4'\" [nzPlaceHolder]=\"'请输入...'\"></nz-input>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div></div>\n      <div></div>\n      <div></div>\n      <div>\n        <button nz-button [nzType]=\"'primary'\">\n          <span>下一步</span>\n        </button>\n        <button nz-button [nzType]=\"'default'\">\n          <span>取消</span>\n        </button>\n      </div>\n    </div>\n    <div *ngIf=\"tab.index === 2\">2222</div>\n  </nz-tab>\n</nz-tabset>"

/***/ }),

/***/ "../../../../../src/app/service-release/service-release.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceReleaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ServiceReleaseComponent = (function () {
    function ServiceReleaseComponent() {
        this.options = [];
        this.checkOptionsOne = [
            { label: 'prod', value: '生产域', checked: true },
            { label: 'test', value: '测试域' },
        ];
        this.radioValue = "tenant";
        this.searchOptions = [
            { value: 'jack', label: '杰克' },
            { value: 'lucy', label: '露西' },
            { value: 'tom', label: '汤姆' }
        ];
        this.selectedMultipleOption = [this.searchOptions[0]];
        this.tabs = [
            {
                index: 1
            },
            {
                index: 2
            },
        ];
    }
    ServiceReleaseComponent.prototype._console = function (value) {
        console.log(value);
    };
    ServiceReleaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        /*模拟服务器异步加载*/
        setTimeout(function (_) {
            _this.options = [
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'disabled', label: 'Disabled', disabled: true }
            ];
            _this.selectedOption = _this.options[0];
        }, 100);
        setTimeout(function (_) {
            _this.selectedMultipleOption = [];
        }, 100);
    };
    return ServiceReleaseComponent;
}());
ServiceReleaseComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-service-release',
        template: __webpack_require__("../../../../../src/app/service-release/service-release.component.html"),
        styles: [__webpack_require__("../../../../../src/app/service-release/service-release.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ServiceReleaseComponent);

//# sourceMappingURL=service-release.component.js.map

/***/ }),

/***/ "../../../../../src/app/service-subscribe/service-subscribe.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <nz-layout>\n    <nz-header style=\"line-height:32px\">\n      <a href=\"#/serviceCatalog\">\n        <返回</a>\n          <p>订购 {{ serviceName }}</p>\n    </nz-header>\n    <nz-content>\n      <div style=\"width:80%;margin-top:10px\">\n        <nz-alert class=\"service-tips\" [nzType]=\"'info'\">\n          <span alert-body nz-row>\n            <div style=\"text-align: center; font-size: 20px; color:#10a5ef\" nz-col [nzSpan]=\"1\">\n              <i class=\"anticon anticon-exclamation-circle-o\"></i>\n            </div>\n            <div nz-col [nzSpan]=\"21\">\n              <div>\n                <p>基本信息</p>\n                <span>该模板用于在IT-PaaS 上部署 {{ serviceName }}</span>\n              </div>\n            </div>\n          </span>\n        </nz-alert>\n      </div>\n      <p class=\"borderBottom80 marginTop20\">基本配置</p>\n      <div nz-row style=\"margin-bottom: 15px\">\n        <div style=\"margin-bottom: 10px\" nz-row>\n          <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n            <span style=\"display: block;\n                    font-size: 13px;\n                    font-weight: 400;\n                    letter-spacing: 0px;\n                    margin-bottom: 10px;\n                    color: rgba(0, 0, 0, 0.9);\">资源池</span>\n          </div>\n          <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n            <!-- <nz-radio-group [(ngModel)]=\"this.radioValue\" (click)=\"toggleButton()\"> -->\n            <nz-radio-group (click)=\"toggleButton()\" [(ngModel)]=\"this.radioValue\">\n              <label nz-radio [nzValue]=\"'product'\" style=\"margin-right: 25px\">\n                <span>生产域</span>\n                <!-- <nz-tooltip [nzPlacement]=\"'rightTop'\">\n                  <i nz-tooltip class=\"anticon anticon-question-circle-o\" style=\"position: absolute; right: -10px;\"></i>\n                  <ng-template #nzTemplate>\n                    <div>\n                      <p>如果选了生产域</p>\n                      <p>每个镜像的基本配置中添加区域选项(互联网、portal、核心)</p>\n                      <p>\n                        每个服务的基本配置中添加区域选项(互联网、portal、核心)\n                      </p>\n                    </div>\n                  </ng-template>\n                </nz-tooltip> -->\n                <!-- <i class=\"anticon anticon-question-circle-o\" style=\"position: absolute; right: -10px;\"></i> -->\n              </label>\n              <label nz-radio [nzValue]=\"'test'\">\n                <span>测试域</span>\n              </label>\n            </nz-radio-group>\n          </div>\n        </div>\n        <div *ngIf=\"this.radioValue === 'product'\" style=\"margin-bottom: 10px\" nz-row>\n          <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n            <span style=\"display: block;\n                    font-size: 13px;\n                    font-weight: 400;\n                    letter-spacing: 0px;\n                    margin-bottom: 10px;\n                    color: rgba(0, 0, 0, 0.9);\">集群</span>\n          </div>\n          <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n            <!-- <nz-radio-group [(ngModel)]=\"this.radioValue\" (click)=\"toggleButton()\"> -->\n              <!-- 这里需要绑定click事件，触发toggleButton事件，现在的逻辑是在资源池选择上，会触发getIptags函数，因为每个资源池下只有一个集群，可以测试，但是当每个资源池下的\n              集群数量》1的时候，需要在这里绑定click事件，切换集群的时候，重新调用getIp函数，现在线上没有多集群，所以暂时不测试 -->\n            <nz-radio-group [(ngModel)]=\"this.networkRadioValue\">\n              <label *ngFor=\"let cluster of prodCluster\" nz-radio [nzValue]=\"cluster.name\">\n                <span>{{ cluster.name }}</span>\n              </label>\n            </nz-radio-group>\n          </div>\n        </div>\n        <div *ngIf=\"this.radioValue === 'test'\" style=\"margin-bottom: 10px\" nz-row>\n          <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n            <span style=\"display: block;\n                    font-size: 13px;\n                    font-weight: 400;\n                    letter-spacing: 0px;\n                    margin-bottom: 10px;\n                    color: rgba(0, 0, 0, 0.9);\">集群</span>\n          </div>\n          <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n            <!-- <nz-radio-group [(ngModel)]=\"this.radioValue\" (click)=\"toggleButton()\"> -->\n            <nz-radio-group [(ngModel)]=\"this.networkRadioValue2\">\n              <label *ngFor=\"let cluster of testCluster\" nz-radio [nzValue]=\"cluster.name\">\n                <span>{{ cluster.name }}</span>\n              </label>\n            </nz-radio-group>\n          </div>\n        </div>\n        <dynamic-form #formThirdProject [config]=\"formThird\">\n        </dynamic-form>\n        <div style=\"text-align: center\">\n          <nz-spin [nzTip]=\"'正在读取数据...'\" *ngIf=\"formThird1.length === 0 || formThird1Radios.length === 0\"></nz-spin>\n        </div>\n        <div *ngIf=\"formThird1.length > 0 && formThird1Radios.length > 0\">\n          <!-- todo next -->\n          <!-- <div *ngIf=\"formThird2Radios.length > 0\" nz-row>\n            <div class=\"marginBottom15\" *ngFor=\"let formThird2Radio of formThird2Radios\" nz-row>\n              <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                <span style=\"display: block;\n                              font-size: 13px;\n                              font-weight: 400;\n                              letter-spacing: 0px;\n                              margin-bottom: 10px;\n                              color: rgba(0, 0, 0, 0.9);\">{{ formThird2Radio.label }}</span>\n              </div>\n              <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                <nz-radio-group (click)=\"toggleRadio()\" [(ngModel)]=\"formThird2Radio.defaultValue\">\n                  <label *ngFor=\"let labelContent of formThird2Radio.labelContent\" nz-radio [nzValue]=\"labelContent\">\n                    <span>{{ labelContent }}</span>\n                  </label>\n                </nz-radio-group>\n              </div>\n            </div>\n            <dynamic-form *ngIf=\"serviceName === 'redis'\" #formThird3Project [config]=\"formThird3\">\n            </dynamic-form>\n          </div> -->\n          <!-- todo next -->\n          <!-- todo next -->\n          <div nz-row>\n            <!-- todo next -->\n            <!-- <div nz-row> -->\n            <div *ngIf=\"serviceName === 'redis'\" class=\"marginBottom15\" nz-row>\n              <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                <span style=\"display: block;\n                              font-size: 13px;\n                              font-weight: 400;\n                              letter-spacing: 0px;\n                              margin-bottom: 10px;\n                              color: rgba(0, 0, 0, 0.9);\">运行模式</span>\n              </div>\n              <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                <nz-radio-group (click)=\"toggleRadio()\" [(ngModel)]=\"this.modelValue\">\n                  <label nz-radio [nzValue]=\"'replication'\">\n                    <span>replication</span>\n                  </label>\n                </nz-radio-group>\n              </div>\n            </div>\n            <dynamic-form *ngIf=\"serviceName === 'mysql'\" #formThird4Project [config]=\"formThird4\">\n            </dynamic-form>\n            <!-- <dynamic-form *ngIf=\"serviceName === 'redis'\" #formThird4Project [config]=\"formThird4\">\n            </dynamic-form> -->\n          </div>\n          <dynamic-form #formThird1Project [config]=\"formThird1\">\n          </dynamic-form>\n          <dynamic-form *ngIf=\"serviceName === 'redis'\" #formThird3Project [config]=\"formThird3\">\n          </dynamic-form>\n          <div nz-row>\n            <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n              <span style=\"display: block;\n                          font-size: 13px;\n                          font-weight: 400;\n                          letter-spacing: 0px;\n                          margin-bottom: 10px;\n                          color: rgba(0, 0, 0, 0.9);\">容器实例大小</span>\n            </div>\n            <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px\">\n              <app-container-instance #instanceThird [config]=\"formThird1Radios\">\n              </app-container-instance>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div>\n        <p class=\"borderBottom80 marginTop20\">高级配置</p>\n        <!-- <div style=\"text-align: center\">\n          <nz-spin [nzTip]=\"'正在读取数据...'\" *ngIf=\"formThird2.length === 0 && formThird2Radios.length === 0\"></nz-spin>\n        </div>-->\n        <div *ngIf=\"formThird2.length > 0 || formThird2Radios.length > 0\" nz-row>\n          <div nz-row style=\"margin-bottom: 15px\">\n            <dynamic-form #formThird2Project [config]=\"formThird2\"></dynamic-form>\n            <div class=\"marginBottom15\" *ngFor=\"let formThird2Radio of formThird2Radios\" nz-row>\n              <div nz-col [nzSpan]=\"4\" style=\"text-align: right\">\n                <span style=\"display: block;\n                                    font-size: 13px;\n                                    font-weight: 400;\n                                    letter-spacing: 0px;\n                                    margin-bottom: 10px;\n                                    color: rgba(0, 0, 0, 0.9);\">{{ formThird2Radio.label }}</span>\n              </div>\n              <div nz-col [nzSpan]=\"18\" style=\"margin-left: 10px; margin-top: 4px\">\n                <nz-radio-group (click)=\"toggleRadio()\" [(ngModel)]=\"formThird2Radio.defaultValue\">\n                  <label *ngFor=\"let labelContent of formThird2Radio.labelContent\" nz-radio [nzValue]=\"labelContent\">\n                    <span>{{ labelContent }}</span>\n                  </label>\n                </nz-radio-group>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </nz-content>\n    <nz-footer>\n      <div class=\"steps-action\" nz-row>\n        <div nz-col [nzSpan]=\"4\"></div>\n        <div nz-col [nzSpan]=\"18\">\n          <span>\n            <button [disabled]=\"buttonDisabled()\" nz-button [nzType]=\"'primary'\" (click)=\"done()\">\n              <span>订购</span>\n            </button>\n          </span>\n          <span>\n            <button nz-button [nzType]=\"'default'\" (click)=\"pre()\">\n              <span>取消</span>\n            </button>\n          </span>\n        </div>\n      </div>\n    </nz-footer>\n  </nz-layout>\n</div>"

/***/ }),

/***/ "../../../../../src/app/service-subscribe/service-subscribe.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "nz-layout {\n  background: #fff;\n  padding: 20px; }\n\nnz-header, nz-content, nz-footer {\n  background: #fff;\n  padding: 0; }\n\na {\n  font-size: 16px; }\n\nnz-header, nz-content, nz-footer {\n  background: #fff; }\n\np {\n  font-size: 16px; }\n\n.service-tips p {\n  font-weight: bold; }\n\n.borderTop80 {\n  border-top: 1px solid #ddd;\n  padding-top: 20px;\n  width: 80%; }\n\n.borderBottom80 {\n  border-bottom: 1px solid #ddd;\n  margin-bottom: 20px;\n  width: 80%; }\n\n.marginTop20 {\n  margin-top: 20px; }\n\n.marginBottom15 {\n  margin-bottom: 15px; }\n\n.steps-action {\n  border-top: 1px solid #ddd;\n  width: 80%;\n  padding-top: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/service-subscribe/service-subscribe.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceSubscribeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dynamic_form_containers_dynamic_form_dynamic_form_component__ = __webpack_require__("../../../../../src/app/dynamic-form/containers/dynamic-form/dynamic-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__container_instance_container_instance_component__ = __webpack_require__("../../../../../src/app/container-instance/container-instance.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dynamic_form_services_component_service_service__ = __webpack_require__("../../../../../src/app/dynamic-form/services/component-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

// import { enableProdMode } from '@angular/core';
// enableProdMode();












// import { NameValidator } from '../util/reg-pattern/reg-name.directive';
var ServiceSubscribeComponent = (function () {
    function ServiceSubscribeComponent(router, confirmServ, routeInfo, http, componentSer, servicesService) {
        this.router = router;
        this.confirmServ = confirmServ;
        this.routeInfo = routeInfo;
        this.http = http;
        this.componentSer = componentSer;
        this.servicesService = servicesService;
        this.networkRadioValue = '';
        this.networkRadioValue2 = '';
        this.radioValue = "product";
        this.modelValue = 'replication';
        this.radioTest = 'prodDomain1';
        this.ipTag$ = [];
        this.formData = {
            serviceInstances: [
                {
                    storageSize: 0,
                    createUserId: 1,
                    groupId: this.servicesService.getCookie('groupID'),
                }
            ]
        };
        this.formThird1 = [];
        this.formThird1Radios = [];
        this.formThird1RadioEntity = {};
        this.formThird4 = [
            {
                type: 'input',
                label: '集群节点数',
                name: 'num_of_nodes',
                placeholder: '实例数量，至少三个节点',
                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].pattern(/^[3-9]|[1-9]\d+/)],
                styles: {
                    'width': '400px'
                }
            },
            {
                type: 'input',
                label: '集群内部通信用户名',
                name: 'sst_user',
                placeholder: '请输入集群内部通信用户名',
                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].maxLength(20)],
                styles: {
                    'width': '400px'
                }
            },
            {
                type: 'input',
                label: '集群内部通信密码',
                name: 'sst_password',
                placeholder: '请输入集群内部通信密码',
                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].pattern(/(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/)],
                styles: {
                    'width': '400px'
                }
            }
        ];
        this.formThird4Entity = {};
        this.formThird = [
            {
                type: 'input',
                label: '实例名称',
                name: 'instanceName',
                placeholder: '请输入实例名称',
                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].maxLength(20)],
                styles: {
                    'width': '400px'
                }
            },
        ];
        this.formThird2 = [];
        this.formThird2Radios = [];
        this.formThird2RadioEntity = {};
        this.formThird3 = [];
        this.operateMode = [];
        // todo: html在ts之前渲染，应该调用afterviewinit?
        // formThird3: FieldConfig[] = [
        //   {
        //     type: 'select',
        //     label: 'Master 节点地址',
        //     name: 'master_node_addr',
        //     options: [],
        //     placeholder: '请选择master节点地址',
        //     validation: [Validators.required],
        //     styles: {
        //       'width': '400px',
        //       // 'display': 'none'
        //     },
        //   }
        // ];
        this.formThird3Entity = {};
    }
    ServiceSubscribeComponent.prototype.toggleRadio = function () {
        var _this = this;
        // console.log(this.formThird2Radio.defaultValue);
        // this.formThird3[0] = {
        //   type: 'select',
        //   label: 'Master2 节点地址',
        //   name: 'master_node_addr2',
        //   options: [],
        //   placeholder: '请选择master节点地址',
        //   validation: [Validators.required],
        //   styles: {
        //     'width': '400px'
        //   },
        // };
        // this.formThird3Project.setConfig(this.formThird3);
        // todo next
        if (this.serviceName === 'zookeeper') {
            // _.map(this.formThird2Radios, (value, key) => {
            //   if (value.name === 'mode') {
            //     if (value.defaultValue === 'standalone') {
            //       // const options$ = this.formThird1Project.value['ip_tag'];
            //       // this.formThird3[0] = {
            //       //   type: 'select',
            //       //   label: 'Master 节点地址',
            //       //   name: 'master_node_addr',
            //       //   options: options$,
            //       //   placeholder: '请选择master节点地址',
            //       //   validation: [Validators.required],
            //       //   styles: {
            //       //     'width': '400px'
            //       //   },
            //       // }
            //       // todo next
            //       // this.formThird3 = this.operateMode[value.defaultValue];
            //       // todo next
            //       // 这里调试之后，发现setConfig，form的controls提前更改了，和toggleButton对比一下，看看有没有解决方案
            //       // this.formThird3[0] = {
            //       //   type: 'select',
            //       //   label: 'Master2 节点地址',
            //       //   name: 'master_node_addr2',
            //       //   options: [],
            //       //   placeholder: '请选择master节点地址',
            //       //   validation: [Validators.required],
            //       //   styles: {
            //       //     'width': '400px'
            //       //   },
            //       // };
            //     } else if (value.defaultValue === 'replication') {
            //       _.map(this.operateMode[value.defaultValue], (value1, key1) => {
            //         if (value1['type'] === 'int') {
            //           this.formThird3[key1] = {
            //             type: 'input',
            //             inputType: 'number',
            //             label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
            //             name: value1['attribute_name'],
            //             placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
            //               value1['description']['zh'] : value1['attribute_name'],
            //             validation: [Validators.required, Validators.min(1)],
            //             styles: {
            //               'width': '400px'
            //             }
            //           };
            //         } else if (value1['type'] === 'single_ip_tag') {
            //           const options$ = this.formThird1Project.value['ip_tag'];
            //           this.formThird3[key1] = {
            //             type: 'select',
            //             label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
            //             name: value1['attribute_name'],
            //             options: options$,
            //             placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
            //               value1['description']['zh'] : value1['attribute_name'],
            //             validation: [Validators.required],
            //             styles: {
            //               'width': '400px'
            //             },
            //           };
            //         }
            //       });
            //       // this.formThird3[0] = {
            //       //   type: 'select',
            //       //   label: 'Master1 节点地址',
            //       //   name: 'master_node_addr1',
            //       //   options: [],
            //       //   placeholder: '请选择master节点地址',
            //       //   validation: [Validators.required],
            //       //   styles: {
            //       //     'width': '400px'
            //       //   },
            //       // };
            //     }
            //     // } else {
            //     //   // 这里用来隐藏上面的元素，因为form不接收空对象，所以这里用display none
            //     //   // this.formThird3Project['valid'] = true;
            //     //   this.formThird3[0] = {
            //     //     label: '发布',
            //     //     name: 'submit',
            //     //     type: 'button',
            //     //     buttonType: 'primary',
            //     //     divStyles: {
            //     //       'display': 'none'
            //     //     }
            //     //   }
            //     // }
            //     // 这里需要手动点击toggleRadio才能触发数据刷新，考虑给form的select增加一个监听事件，每次下拉
            //     // 选择值的时候，就output出来给父组件，然后父组件this.set设置这个值
            //     this.formThird3Project.setConfig(this.formThird3);
            //   }
            // });
        }
        else if (this.serviceName === 'redis') {
            __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](this.operateMode['replication'], function (value1, key1) {
                if (value1['type'] === 'int') {
                    _this.formThird3[key1] = {
                        type: 'input',
                        inputType: 'number',
                        label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                        name: value1['attribute_name'],
                        placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
                            value1['description']['zh'] : value1['attribute_name'],
                        validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].min(1)],
                        styles: {
                            'width': '400px'
                        }
                    };
                }
                else if (value1['type'] === 'single_ip_tag') {
                    // const options$ = this.formThird1Project.value['ip_tag'] || [];
                    var options$ = [];
                    _this.formThird3[key1] = {
                        type: 'select',
                        label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                        name: value1['attribute_name'],
                        options: options$,
                        placeholder: '请先选择主机标签地址!',
                        validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
                        styles: {
                            'width': '400px'
                        },
                    };
                }
            });
            this.formThird3Project.setConfig(this.formThird3);
        }
    };
    ServiceSubscribeComponent.prototype.getIpTag = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.radioValue === 'product') {
                _this.http.get(__WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].apiAlauda + '/regions/' + __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].namespace + '/' + _this.networkRadioValue + '/labels').
                    subscribe(function (data) {
                    console.log('这是主机标签', data);
                    _this.ipTag$ = __WEBPACK_IMPORTED_MODULE_9_lodash__["compact"](__WEBPACK_IMPORTED_MODULE_9_lodash__["map"](data['labels'], function (value, key) {
                        // if (value['labels'].length > 0) {
                        // if (value['node_tag']) {
                        return value['value'];
                        // }
                    }));
                    resolve();
                });
            }
            else {
                _this.http.get(__WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].apiAlauda + '/regions/' + __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].namespace + '/' + _this.networkRadioValue2 + '/labels').
                    subscribe(function (data) {
                    console.log('这是主机标签', data);
                    _this.ipTag$ = __WEBPACK_IMPORTED_MODULE_9_lodash__["compact"](__WEBPACK_IMPORTED_MODULE_9_lodash__["map"](data['labels'], function (value, key) {
                        // if (value['labels'].length > 0) {
                        // if (value['node_tag']) {
                        return value['value'];
                        // }
                    }));
                    resolve();
                });
            }
        });
    };
    ServiceSubscribeComponent.prototype.toggleButton = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getIpTag()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getOperateMode()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getServiceBasic()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getServiceAdvanced()];
                    case 4:
                        _a.sent();
                        // await this.toggleRadio();
                        // this.formThird1 = [];
                        // this.formThird1 = [
                        //   {
                        //     type: 'input',
                        //     label: '实例名称1',
                        //     name: 'instanceName1',
                        //     placeholder: '请输入实例名称',
                        //     validation: [Validators.required, Validators.pattern(/^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])?$/i)],
                        //     styles: {
                        //       'width': '400px'
                        //     }
                        //   },
                        // ];
                        this.formThird1Project.setConfig(this.formThird1);
                        return [2 /*return*/];
                }
            });
        });
    };
    ServiceSubscribeComponent.prototype.buttonDisabled = function () {
        var _this = this;
        var mode$;
        if (this.formThird2Radios && this.formThird3Project) {
            __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](this.formThird2Radios, function (value, key) {
                if (value.name === 'mode') {
                    if (value.defaultValue === 'replication') {
                        mode$ = !_this.formThird3Project.valid;
                    }
                    else {
                        mode$ = false;
                    }
                }
            });
        }
        return !this.formThirdProject.valid || !this.formThird2Project.valid || !this.formThird1Project.valid || mode$;
    };
    ServiceSubscribeComponent.prototype.ngAfterViewInit = function () {
        // setTimeout(() => {
        // this.toggleRadio();
        console.log('测试afterview');
        // // this.form.setValue('name', '');
    };
    ServiceSubscribeComponent.prototype.getCluster = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url$ = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].forkJoin(_this.http.get(__WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].apiApp + '/apiApp/cluster-zones/test/clusters'), _this.http.get(__WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].apiApp + '/apiApp/cluster-zones/product/clusters'));
            url$.subscribe(function (values) {
                _this.testCluster = values[0];
                _this.prodCluster = values[1];
                _this.networkRadioValue = values[1][0]['name'];
                _this.networkRadioValue2 = values[0][0]['name'];
                resolve();
            });
        });
    };
    ServiceSubscribeComponent.prototype.getOperateMode = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].apiService + '/apiService' + '/groups/' + _this.servicesService.getCookie('groupID') + '/services/' + _this.serviceId).subscribe(function (data) {
                // this.operateMode['standalone'] = data['standalone_config'];
                // todo next
                // this.operateMode['replication'] = data['replication_config'];
                // this.operateMode['cluster'] = data['cluster_config'];
                // todo next
                _this.operateMode['replication'] = data['replication_config'];
                resolve();
            });
        });
    };
    ServiceSubscribeComponent.prototype.getServiceBasic = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].apiService + '/apiService' + '/groups/' + _this.servicesService.getCookie('groupID') + '/services/' + _this.serviceId).subscribe(function (data) {
                // 这里每次都需要清除一次数据，不然数据会重复
                _this.formThird1 = [];
                _this.formThird1Radios = [];
                // this.formThird2Radios = [];
                __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](data['basic_config'], function (value, key) {
                    switch (value['type']) {
                        case 'string': {
                            // this.formThird1
                            // const pattern = new RegExp(value.pattern);
                            _this.formThird1[key] = {
                                type: 'input',
                                defaultValue: value['default_value'],
                                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                name: value['attribute_name'],
                                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                    value['description']['zh'] : value['attribute_name'],
                                // todo eval()
                                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].pattern(eval(value.pattern))],
                                // notNecessary: true,
                                styles: {
                                    'width': '400px'
                                }
                            };
                            break;
                        }
                        case 'int': {
                            _this.formThird1[key] = {
                                type: 'input',
                                defaultValue: value['default_value'],
                                inputType: 'number',
                                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                name: value['attribute_name'],
                                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                    value['description']['zh'] : value['attribute_name'],
                                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].min(1)],
                                // notNecessary: true,
                                styles: {
                                    'width': '400px'
                                }
                            };
                            break;
                        }
                        case 'radio_group_tab': {
                            // todo next
                            // value['option'] = ["replication", "cluster"];
                            // todo next
                            // todo next
                            // if (this.serviceName === 'redis') {
                            //   value['option'] = ["replication"];
                            // }
                            // // const radioAttriName = value['attribute_name']
                            // this.formThird2Radios[key] = {
                            //   label: value['display_name']['zh'],
                            //   name: value['attribute_name'],
                            //   labelContent: value['option'],
                            //   defaultValue: value['option'][0]
                            // }
                            // todo next
                            break;
                        }
                        case 'option': {
                            var options$ = __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](value['option'], function (value1, key1) {
                                if (__WEBPACK_IMPORTED_MODULE_9_lodash__["isObject"](value1)) {
                                    var optionType_1 = [];
                                    __WEBPACK_IMPORTED_MODULE_9_lodash__["forIn"](value1, function (value2, key2) {
                                        optionType_1[key1] = key2;
                                    });
                                    return value1[optionType_1[key1]];
                                }
                                else {
                                    return value1;
                                }
                            });
                            if (value['attribute_name'] === 'cluster_size') {
                                var cluserOption_1 = [];
                                __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](options$, function (valueOp, keyOp) {
                                    switch (valueOp) {
                                        case 'XXS': {
                                            cluserOption_1[keyOp] = {
                                                name: value['attribute_name'],
                                                insSize: valueOp,
                                                cpuSize: 0.125,
                                                memSize: 256,
                                                choosed: true
                                            };
                                            break;
                                        }
                                        case 'XS': {
                                            cluserOption_1[keyOp] = {
                                                name: value['attribute_name'],
                                                insSize: valueOp,
                                                cpuSize: 0.25,
                                                memSize: 512
                                            };
                                            break;
                                        }
                                        case 'S': {
                                            cluserOption_1[keyOp] = {
                                                name: value['attribute_name'],
                                                insSize: valueOp,
                                                cpuSize: 0.5,
                                                memSize: 1
                                            };
                                            break;
                                        }
                                        case 'M': {
                                            cluserOption_1[keyOp] = {
                                                name: value['attribute_name'],
                                                insSize: valueOp,
                                                cpuSize: 1,
                                                memSize: 2
                                            };
                                            break;
                                        }
                                        case 'L': {
                                            cluserOption_1[keyOp] = {
                                                name: value['attribute_name'],
                                                insSize: valueOp,
                                                cpuSize: 2,
                                                memSize: 4
                                            };
                                            break;
                                        }
                                        case 'XL': {
                                            cluserOption_1[keyOp] = {
                                                name: value['attribute_name'],
                                                insSize: valueOp,
                                                cpuSize: 4,
                                                memSize: 8
                                            };
                                            break;
                                        }
                                        default:
                                            break;
                                    }
                                });
                                __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](cluserOption_1, function (valueIns, keyIns) {
                                    _this.formThird1Radios[keyIns] = {
                                        name: valueIns.name,
                                        instance_size: valueIns.insSize,
                                        cpuSize: valueIns.cpuSize,
                                        memSize: valueIns.memSize,
                                        focused: valueIns.choosed ? true : false,
                                        currentClass: {
                                            'focused': valueIns.choosed ? true : false
                                        }
                                    };
                                });
                            }
                            else {
                                _this.formThird1[key] = {
                                    type: 'select',
                                    label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                    name: value['attribute_name'],
                                    options: options$,
                                    placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                        value['description']['zh'] : value['attribute_name'],
                                    validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
                                    styles: {
                                        'width': '400px'
                                    },
                                };
                            }
                            break;
                        }
                        case 'multi_option': {
                            var options$ = void 0;
                            if (value['option'].length !== 0 && value['option'].length !== undefined) {
                                options$ = __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](value['option'], function (value1, key1) {
                                    if (__WEBPACK_IMPORTED_MODULE_9_lodash__["isObject"](value1)) {
                                        var optionType_2 = [];
                                        __WEBPACK_IMPORTED_MODULE_9_lodash__["forIn"](value1, function (value2, key2) {
                                            optionType_2[key1] = key2;
                                        });
                                        return value1[optionType_2[key1]];
                                    }
                                    else {
                                        return value1;
                                    }
                                });
                            }
                            else {
                                options$ = _this.ipTag$;
                            }
                            _this.formThird1[key] = {
                                ifTags: value['attribute_name'] === 'ip_tag' ? 'true' : 'false',
                                type: 'select',
                                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                name: value['attribute_name'],
                                options: options$,
                                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                    value['description']['zh'] : value['attribute_name'],
                                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
                                styles: {
                                    'width': '400px'
                                },
                                valueUpdate: true
                            };
                            break;
                        }
                        default:
                            break;
                    }
                });
                _this.formThird1 = __WEBPACK_IMPORTED_MODULE_9_lodash__["uniqWith"](__WEBPACK_IMPORTED_MODULE_9_lodash__["compact"](_this.formThird1), __WEBPACK_IMPORTED_MODULE_9_lodash__["isEqual"]);
                _this.formThird1Radios = __WEBPACK_IMPORTED_MODULE_9_lodash__["uniqWith"](__WEBPACK_IMPORTED_MODULE_9_lodash__["compact"](_this.formThird1Radios), __WEBPACK_IMPORTED_MODULE_9_lodash__["isEqual"]);
                // todo next
                // this.formThird2Radios = _.uniqWith(_.compact(this.formThird2Radios), _.isEqual);
                // todo next
                resolve();
            });
        });
    };
    ServiceSubscribeComponent.prototype.getServiceAdvanced = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].apiService + '/apiService' + '/groups/' + _this.servicesService.getCookie('groupID') + '/services/' + _this.serviceId).subscribe(function (data) {
                // 这里每次都需要清除一次数据，不然数据会重复
                _this.formThird2 = [];
                _this.formThird2Radios = [];
                console.log('这是服务详情advanced', data['advanced_config']);
                // this.formThird2 = data['advanced_config'];
                __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](data['advanced_config'], function (value, key) {
                    switch (value['type']) {
                        case 'string': {
                            // this.formThird2
                            _this.formThird2[key] = {
                                type: 'input',
                                defaultValue: value['default_value'],
                                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                name: value['attribute_name'],
                                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                    value['description']['zh'] : value['attribute_name'],
                                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
                                // notNecessary: true,
                                styles: {
                                    'width': '400px'
                                }
                            };
                            break;
                        }
                        case 'int': {
                            _this.formThird2[key] = {
                                type: 'input',
                                defaultValue: value['default_value'],
                                inputType: 'number',
                                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                name: value['attribute_name'],
                                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                    value['description']['zh'] : value['attribute_name'],
                                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].min(1)],
                                // notNecessary: true,
                                styles: {
                                    'width': '400px'
                                }
                            };
                            break;
                        }
                        case 'radio_group_tab': {
                            // const radioAttriName = value['attribute_name']
                            if (value['attribute_name'] === 'mount_volume') {
                                value['option'] = ['false'];
                            }
                            _this.formThird2Radios[key] = {
                                label: value['display_name']['zh'],
                                name: value['attribute_name'],
                                labelContent: value['option'],
                                defaultValue: value['option'][0]
                            };
                            break;
                        }
                        case 'option': {
                            var options$ = __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](value['option'], function (value1, key1) {
                                console.log('value1: ' + value1);
                                console.log('key: ' + key);
                                if (value1['type']) {
                                    return value1['type'];
                                }
                                else {
                                    return value1;
                                }
                            });
                            _this.formThird2[key] = {
                                type: 'select',
                                label: value['display_name'] ? value['display_name']['zh'] : value['attribute_name'],
                                name: value['attribute_name'],
                                options: options$,
                                placeholder: (value['description'] && value['description']['zh'] !== '') ?
                                    value['description']['zh'] : value['attribute_name'],
                                validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
                                styles: {
                                    'width': '400px'
                                },
                            };
                            break;
                        }
                        default:
                            break;
                    }
                });
                _this.formThird2 = __WEBPACK_IMPORTED_MODULE_9_lodash__["uniqWith"](__WEBPACK_IMPORTED_MODULE_9_lodash__["compact"](_this.formThird2), __WEBPACK_IMPORTED_MODULE_9_lodash__["isEqual"]);
                if (_this.serviceName === 'kafka') {
                    var config$ = {
                        ifTags: 'true',
                        type: 'select',
                        label: '已经部署的zookeeper集群',
                        name: 'ip_tag_zoo',
                        options: _this.ipTag$,
                        placeholder: '请选择',
                        validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
                        styles: {
                            'width': '400px'
                        },
                    };
                    _this.formThird2 = __WEBPACK_IMPORTED_MODULE_9_lodash__["concat"](config$, _this.formThird2);
                }
                _this.formThird2Radios = __WEBPACK_IMPORTED_MODULE_9_lodash__["uniqWith"](__WEBPACK_IMPORTED_MODULE_9_lodash__["compact"](_this.formThird2Radios), __WEBPACK_IMPORTED_MODULE_9_lodash__["isEqual"]);
                resolve();
            });
        });
    };
    ServiceSubscribeComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.serviceId = this.routeInfo.snapshot.params['serviceId'];
                        this.serviceName = this.routeInfo.snapshot.params['serviceName'];
                        console.log('serviceName:' + this.serviceName);
                        return [4 /*yield*/, this.getOperateMode()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getServiceBasic()];
                    case 2:
                        _a.sent();
                        // this.formThird3Project.setConfig(this.formThird3);
                        // 这里不能this.toggleRadio，里面setconfig会报错
                        __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](this.operateMode['replication'], function (value1, key1) {
                            if (value1['type'] === 'int') {
                                _this.formThird3[key1] = {
                                    type: 'input',
                                    inputType: 'number',
                                    label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                                    name: value1['attribute_name'],
                                    placeholder: (value1['description'] && value1['description']['zh'] !== '') ?
                                        value1['description']['zh'] : value1['attribute_name'],
                                    validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].min(1)],
                                    styles: {
                                        'width': '400px'
                                    }
                                };
                            }
                            else if (value1['type'] === 'single_ip_tag') {
                                // const options$ = this.formThird1Project.value['ip_tag'] || [];
                                var options$ = [];
                                // const options$ = ['11', '22'];
                                _this.formThird3[key1] = {
                                    type: 'select',
                                    label: value1['display_name'] ? value1['display_name']['zh'] : value1['attribute_name'],
                                    name: value1['attribute_name'],
                                    options: options$,
                                    placeholder: '请先选择主机标签地址!',
                                    validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
                                    styles: {
                                        'width': '400px'
                                    },
                                };
                            }
                        });
                        return [4 /*yield*/, this.getServiceAdvanced()];
                    case 3:
                        _a.sent();
                        // next todo
                        // componentValue$ => output
                        // this.componentSer.componentName$.subscribe(value1 => {
                        //     console.log('componentName', value1);
                        // });
                        this.selectValueSub = this.componentSer.componentValue$.subscribe(function (value) {
                            // const selectConfig = {
                            //   // selectedOption: undefined,
                            //   // ifTags: 'true',
                            //   type: 'select',
                            //   label: 'Favourite2 Food',
                            //   name: 'food2',
                            //   options: value,
                            //   placeholder: 'Select an option',
                            //   validation: [Validators.required],
                            //   styles: {
                            //     'width': '400px',
                            //   },
                            // };
                            // const formConfig3 = [];
                            if (value !== undefined && __WEBPACK_IMPORTED_MODULE_9_lodash__["indexOf"](_this.ipTag$, value[0]) >= 0) {
                                __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](_this.formThird3, function (value3, key3) {
                                    console.log(value3);
                                    // formConfig3[key3] = value3;
                                    if (value3['type'] === 'select') {
                                        _this.formThird3[key3] = {
                                            type: 'select',
                                            label: value3['label'],
                                            name: value3['name'],
                                            options: value,
                                            placeholder: value3['placeholder'],
                                            validation: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
                                            styles: {
                                                'width': '400px'
                                            },
                                        };
                                    }
                                });
                                console.log(_this.formThird3);
                                _this.formThird3Project.setConfig(_this.formThird3);
                            }
                        });
                        return [4 /*yield*/, this.getCluster()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.getIpTag()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.toggleButton()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ServiceSubscribeComponent.prototype.pre = function () {
        this.router.navigate(['serviceCatalog']);
        // window.location.href = window.location.origin + '/#/serviceCatalog';
    };
    ServiceSubscribeComponent.prototype.done = function () {
        var _this = this;
        // todo next
        if (this.serviceName === 'zookeeper') {
            if (this.formThird2Radios) {
                __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](this.formThird2Radios, function (value, key) {
                    // console.log('打印radio', value);
                    var valueName$ = value.name;
                    _this.formThird2RadioEntity[valueName$] = value.defaultValue;
                    // this.formThird2RadioEntity[key] = {
                    //   [valueName$]: value.defaultValue
                    // }
                });
            }
        }
        else if (this.serviceName === 'mysql') {
            // 动态表单内数据拼接，取出内容，拼成key valye形式。
            // 再添加两个静态的radio内容
            // "mode": "cluster","enable_dbproxy": "disable_dbproxy",
            // 添加 集群模式
            this.formThird4Entity['mode'] = 'cluster';
            // 添加 禁用dbproxy
            this.formThird4Entity['enable_dbproxy'] = 'disable_dbproxy';
            if (this.formThird4Project) {
                console.log('打印value.na', this.formThird4Project.value);
                __WEBPACK_IMPORTED_MODULE_9_lodash__["map"](this.formThird4Project.value, function (value, key) {
                    console.log('打印value', value);
                    console.log('key', key);
                    _this.formThird4Entity[key] = value;
                });
            }
        }
        else {
            this.formThird2RadioEntity['mode'] = 'replication';
        }
        // todo next
        if (this.formThird3Project) {
            __WEBPACK_IMPORTED_MODULE_9_lodash__["mapKeys"](this.formThird3Project['value'], function (value, key) {
                _this.formThird3Entity[key] = value;
            });
        }
        else {
            this.formThird3Entity = {};
        }
        // if (this.formThird1Radios) {
        //   _.map(this.formThird1Radios, (value, key) => {
        //     const valueName$ = value.name;
        //     this.formThird1RadioEntity[valueName$] = value.instance_size;
        //   })
        // }
        this.formThird1RadioEntity[this.instanceThird.value['name']] = this.instanceThird.value['instance_size'];
        // todo next
        if (this.serviceName === 'zookeeper') {
            this.formThird1Project.value['num_of_nodes'] = parseInt(this.formThird1Project.value['num_of_nodes']);
        }
        // todo next
        // if (this.formThird1Project.value['ip_tag'].length === 1) {
        //   const arr = [];
        //   arr[0] = this.formThird1Project.value['ip_tag'];
        //   this.formThird1Project.value['ip_tag'] = arr;
        // }
        this.formData['serviceInstances'][0] = {
            storageSize: 0,
            createUserId: 1,
            groupId: this.servicesService.getCookie('groupID'),
            serviceId: this.serviceId,
            instanceName: this.formThirdProject.value['instanceName'],
            instancesCount: parseInt(this.formThird1Project.value['num_of_nodes']),
            cpuSize: this.instanceThird.value['cpuSize'] * this.formThird1Project.value['num_of_nodes'],
            memSize: this.instanceThird.value['memSize'] * this.formThird1Project.value['num_of_nodes'],
            clusterName: this.radioValue === 'product' ? this.networkRadioValue : this.networkRadioValue2,
            info: {
                // todo: this.formThird2RadioEntity, this.formThird3Entity
                basic_config: __WEBPACK_IMPORTED_MODULE_9_lodash__["assign"](this.formThird1Project.value, this.formThird1RadioEntity, this.serviceName === 'redis' ? this.formThird2RadioEntity : {}, this.serviceName === 'mysql' ? this.formThird4Entity : {}, this.formThird3Entity),
                advanced_config: __WEBPACK_IMPORTED_MODULE_9_lodash__["assign"](this.formThird2Project.value, this.serviceName === 'zookeeper' ?
                    this.formThird2RadioEntity : {})
            }
        };
        this.http.post(__WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].apiService + '/apiService/services/' + this.serviceId + '/instances', this.formData['serviceInstances'][0]).subscribe(function (data) {
            var thisParent = _this;
            console.log('服务订购成功', data);
            _this.confirmServ.success({
                maskClosable: false,
                title: '服务订购成功!',
                content: '点确认按钮跳转到服务商城',
                okText: '确定',
                onOk: function () {
                    // .contentControl = true;
                    // console.log('form11', thisParent.form);
                    // const redirect = window.location.host + '/#/appStore';
                    // window.location.href = window.location.origin + '/#/serviceCatalog';
                    thisParent.router.navigate(['serviceCatalog']);
                },
                onCancel: function () {
                }
            });
        });
        console.log('这是formdata', this.formData);
    };
    return ServiceSubscribeComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formThirdProject'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _a || Object)
], ServiceSubscribeComponent.prototype, "formThirdProject", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('instanceThird'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__container_instance_container_instance_component__["a" /* ContainerInstanceComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__container_instance_container_instance_component__["a" /* ContainerInstanceComponent */]) === "function" && _b || Object)
], ServiceSubscribeComponent.prototype, "instanceThird", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formThird1Project'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _c || Object)
], ServiceSubscribeComponent.prototype, "formThird1Project", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formThird4Project'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _d || Object)
], ServiceSubscribeComponent.prototype, "formThird4Project", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formThird2Project'),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _e || Object)
], ServiceSubscribeComponent.prototype, "formThird2Project", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('formThird3Project'),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__dynamic_form_containers_dynamic_form_dynamic_form_component__["a" /* DynamicFormComponent */]) === "function" && _f || Object)
], ServiceSubscribeComponent.prototype, "formThird3Project", void 0);
ServiceSubscribeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-service-subscribe',
        template: __webpack_require__("../../../../../src/app/service-subscribe/service-subscribe.component.html"),
        styles: [__webpack_require__("../../../../../src/app/service-subscribe/service-subscribe.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4_ng_zorro_antd__["c" /* NzModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng_zorro_antd__["c" /* NzModalService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClient */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_10__dynamic_form_services_component_service_service__["a" /* ComponentServiceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__dynamic_form_services_component_service_service__["a" /* ComponentServiceService */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_11__shared_services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__shared_services_service__["a" /* ServicesService */]) === "function" && _m || Object])
], ServiceSubscribeComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
//# sourceMappingURL=service-subscribe.component.js.map

/***/ }),

/***/ "../../../../../src/app/service-test/service-test.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceTestService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ServiceTestService = (function () {
    function ServiceTestService() {
    }
    ServiceTestService.prototype.getServices = function () {
        return '1111';
    };
    return ServiceTestService;
}());
ServiceTestService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ServiceTestService);

//# sourceMappingURL=service-test.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/application.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationService; });
/* unused harmony export Application */
/* unused harmony export ApplicationMsg */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ApplicationService = (function () {
    function ApplicationService() {
        this.applications = [
            new Application(1, 'http://placehold.it/320x150', 'OA系统', true, new Date()),
            new Application(2, 'http://placehold.it/320x150', '和阅读', false, new Date()),
            new Application(3, 'http://placehold.it/320x150', 'NPS系统', true, new Date()),
            new Application(4, 'http://placehold.it/320x150', '444系统', true, new Date())
        ];
        this.applicationMsgs = [
            new ApplicationMsg(1, 'OA系统', 'v1(服务版本)', new Date(), '这是一个实例描述', '这是一个系统的描述'),
            new ApplicationMsg(2, '和阅读', 'v2(服务版本)', new Date(), '这是一个实例描述', '这是一个系统的描述'),
            new ApplicationMsg(3, 'NPS系统', 'v3(服务版本)', new Date(), '这是一个实例描述', '这是一个系统的描述'),
            new ApplicationMsg(4, '444系统', 'v3(服务版本)', new Date(), '这是一个实例描述', '这是一个系统的描述')
        ];
    }
    // 获取所有应用
    ApplicationService.prototype.getApplications = function () {
        return this.applications;
    };
    // 根据传入的应用id appId，获得指定的应用
    ApplicationService.prototype.getApplicationByID = function (appId) {
        return this.applications.find(function (application) { return application.appId === +appId; });
    };
    // 根据传入的item，获得指定的应用
    ApplicationService.prototype.getApplication = function (title) {
        return this.applications.find(function (application) { return application.title === title; });
    };
    // 根据传入的应用id appId，或者应用的详细信息
    ApplicationService.prototype.getApplicationMsgByID = function (appId) {
        return this.applicationMsgs.find(function (applicationMsg) { return applicationMsg.appId === +appId; });
    };
    return ApplicationService;
}());
ApplicationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ApplicationService);

// 定义一个应用的类
var Application = (function () {
    function Application(appId, imgUrl, title, isActive, createTime) {
        this.appId = appId;
        this.imgUrl = imgUrl;
        this.title = title;
        this.isActive = isActive;
        this.createTime = createTime;
    }
    return Application;
}());

// 定义应用详细信息的类
var ApplicationMsg = (function () {
    function ApplicationMsg(appId, title, serviceVersion, updateTime, instanceDesc, desc) {
        this.appId = appId;
        this.title = title;
        this.serviceVersion = serviceVersion;
        this.updateTime = updateTime;
        this.instanceDesc = instanceDesc;
        this.desc = desc;
    }
    return ApplicationMsg;
}());

//# sourceMappingURL=application.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/directive/echarts/echarts.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EchartsDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EchartsDirective = (function () {
    function EchartsDirective(el, renderer, _ngZone) {
        this.el = el;
        this.renderer = renderer;
        this._ngZone = _ngZone;
        this.theme = '';
        // chart events:
        this.chartInit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartDblClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartMouseDown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartMouseUp = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartMouseOver = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartMouseOut = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartGlobalOut = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartContextMenu = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.chartDataZoom = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.myChart = null;
        this.currentWindowWidth = null;
    }
    EchartsDirective.prototype.createChart = function () {
        var _this = this;
        this.theme = this.theme || '';
        this.currentWindowWidth = window.innerWidth;
        if (this.theme) {
            return this._ngZone.runOutsideAngular(function () { return echarts.init(_this.el.nativeElement, _this.theme); });
        }
        else {
            return this._ngZone.runOutsideAngular(function () { return echarts.init(_this.el.nativeElement); });
        }
    };
    EchartsDirective.prototype.updateChart = function () {
        this.myChart.setOption(this.options);
        this.myChart.resize();
    };
    EchartsDirective.prototype.onWindowResize = function (event) {
        if (event.target.innerWidth !== this.currentWindowWidth) {
            this.currentWindowWidth = event.target.innerWidth;
            if (this.myChart) {
                this.myChart.resize();
            }
        }
    };
    EchartsDirective.prototype.ngOnChanges = function (changes) {
        if (changes['dataset']) {
            this.onDatasetChange(this.dataset);
        }
        if (changes['options']) {
            this.onOptionsChange(this.options);
        }
        if (changes['loading']) {
            this.onLoadingChange(this.loading);
        }
    };
    EchartsDirective.prototype.ngOnDestroy = function () {
        if (this.myChart) {
            this.myChart.dispose();
            this.myChart = null;
        }
    };
    EchartsDirective.prototype.onOptionsChange = function (opt) {
        if (opt) {
            if (!this.myChart) {
                this.myChart = this.createChart();
                // output echart instance:
                this.chartInit.emit(this.myChart);
                // register events:
                this.registerEvents(this.myChart);
            }
            if (this.hasData()) {
                this.updateChart();
            }
            else if (this.dataset && this.dataset.length) {
                this.mergeDataset(this.dataset);
                this.updateChart();
            }
        }
    };
    EchartsDirective.prototype.onDatasetChange = function (dataset) {
        if (this.myChart && this.options) {
            if (!this.options.series) {
                this.options.series = [];
            }
            this.mergeDataset(dataset);
            this.updateChart();
        }
    };
    EchartsDirective.prototype.onLoadingChange = function (loading) {
        if (this.myChart) {
            if (loading) {
                this.myChart.showLoading();
            }
            else {
                this.myChart.hideLoading();
            }
        }
    };
    EchartsDirective.prototype.mergeDataset = function (dataset) {
        for (var i = 0, len = dataset.length; i < len; i++) {
            if (!this.options.series[i]) {
                this.options.series[i] = { data: dataset[i] };
            }
            else {
                this.options.series[i].data = dataset[i];
            }
        }
    };
    /**
     * method to check if the option has dataset.
     */
    EchartsDirective.prototype.hasData = function () {
        // fix for timeline chart:
        if (this.options.baseOption && this.options.baseOption.timeline) {
            var options = this.options.options;
            if (options.length) {
                for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                    var o = options_1[_i];
                    if (o.series) {
                        for (var _a = 0, _b = o.series; _a < _b.length; _a++) {
                            var serie = _b[_a];
                            if (serie.data && serie.data.length > 0) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }
        if (!this.options.series || !this.options.series.length) {
            return false;
        }
        for (var _c = 0, _d = this.options.series; _c < _d.length; _c++) {
            var serie = _d[_c];
            if (serie.data && serie.data.length > 0) {
                return true;
            }
        }
        return false;
    };
    EchartsDirective.prototype.registerEvents = function (myChart) {
        var _this = this;
        if (myChart) {
            // register mouse events:
            myChart.on('click', function (e) { _this.chartClick.emit(e); });
            myChart.on('dblClick', function (e) { _this.chartDblClick.emit(e); });
            myChart.on('mousedown', function (e) { _this.chartMouseDown.emit(e); });
            myChart.on('mouseup', function (e) { _this.chartMouseUp.emit(e); });
            myChart.on('mouseover', function (e) { _this.chartMouseOver.emit(e); });
            myChart.on('mouseout', function (e) { _this.chartMouseOut.emit(e); });
            myChart.on('globalout', function (e) { _this.chartGlobalOut.emit(e); });
            myChart.on('contextmenu', function (e) { _this.chartContextMenu.emit(e); });
            // other events;
            myChart.on('dataZoom', function (e) { _this.chartDataZoom.emit(e); });
        }
    };
    EchartsDirective.prototype.clear = function () {
        if (this.myChart) {
            this.myChart.clear();
        }
    };
    return EchartsDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], EchartsDirective.prototype, "options", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], EchartsDirective.prototype, "dataset", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], EchartsDirective.prototype, "theme", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], EchartsDirective.prototype, "loading", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], EchartsDirective.prototype, "chartInit", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _b || Object)
], EchartsDirective.prototype, "chartClick", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _c || Object)
], EchartsDirective.prototype, "chartDblClick", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _d || Object)
], EchartsDirective.prototype, "chartMouseDown", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _e || Object)
], EchartsDirective.prototype, "chartMouseUp", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _f || Object)
], EchartsDirective.prototype, "chartMouseOver", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _g || Object)
], EchartsDirective.prototype, "chartMouseOut", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _h || Object)
], EchartsDirective.prototype, "chartGlobalOut", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _j || Object)
], EchartsDirective.prototype, "chartContextMenu", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _k || Object)
], EchartsDirective.prototype, "chartDataZoom", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EchartsDirective.prototype, "onWindowResize", null);
EchartsDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        // tslint:disable-next-line:directive-selector
        selector: '[echarts]'
    }),
    __metadata("design:paramtypes", [typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _o || Object])
], EchartsDirective);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
//# sourceMappingURL=echarts.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/header/header.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".app-header{\n    height:50px;\n    line-height: 50px;\n    background-color: #f8f9f9;\n    font-size: 14px;\n}\n.header-left{\n    padding-left: 30px;\n    color: #2c9cfa;\n}\n.header-right{\n\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<span>header子组件名字{{outputName}}></span>\n<span>header子组件价格{{outputRandom}}</span>-->\n<div nz-row class=\"app-header\">\n    <div nz-col [nzSpan]=\"8\"  class=\"header-left\">\n        <p>{{title}}</p>\n    </div>\n   <!-- <div nz-col [nzSpan]=\"8\" [nzOffset]=\"8\" class=\"header-right\">\n        <img [src]=\"'assets/header/header-img.png'\" alt=\"\" width=\"100%\"/>\n\n    </div>-->\n</div>"

/***/ }),

/***/ "../../../../../src/app/shared/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HeaderComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppOutput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = (function () {
    function HeaderComponent() {
        var _this = this;
        this.outputName = 'i am name';
        this.childTitle = 'i am child title';
        this.buyEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.headerTitle = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        setInterval(function () {
            // 新建一个appOutput对象，构建对象的参数都来自于子组件，目的把这些子组件的内容传送给父组件
            var appOutput = new AppOutput(_this.outputName, 100 * Math.random());
            // 同步数据
            _this.outputRandom = appOutput.outputRandom;
            // output发送buyEvent事件，传入的是指定好的appOutput类对象
            _this.buyEvent.emit(appOutput);
        }, 1000);
    }
    HeaderComponent.prototype.ngOnInit = function () {
        // 向父组件传送一个子组件的string对象
        this.headerTitle.emit(this.childTitle);
    };
    return HeaderComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], HeaderComponent.prototype, "title", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], HeaderComponent.prototype, "buyEvent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _b || Object)
], HeaderComponent.prototype, "headerTitle", void 0);
HeaderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-header',
        template: __webpack_require__("../../../../../src/app/shared/header/header.component.html"),
        styles: [__webpack_require__("../../../../../src/app/shared/header/header.component.css")]
    }),
    __metadata("design:paramtypes", [])
], HeaderComponent);

// 测试子组件向父级组件传值用
var AppOutput = (function () {
    function AppOutput(outputName, outputRandom) {
        this.outputName = outputName;
        this.outputRandom = outputRandom;
    }
    return AppOutput;
}());

var _a, _b;
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/random-user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RandomUserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_service__ = __webpack_require__("../../../../../src/app/shared/services.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RandomUserService = (function () {
    // randomUserUrl = 'https://api.randomuser.me/';
    // randomUserUrl = '/api/results2';
    function RandomUserService(http, httpClicent, servicesService) {
        this.http = http;
        this.httpClicent = httpClicent;
        this.servicesService = servicesService;
    }
    RandomUserService.prototype.getTotals = function () {
        console.log('getTotals cookie: ' + this.servicesService.getCookie('groupID'));
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/application-overview').map(function (res) { return res.json(); });
    };
    RandomUserService.prototype.getUsers = function (pageIndex, pageSize, sortField, sortOrder) {
        if (pageIndex === void 0) { pageIndex = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('page', "" + pageIndex);
        params.set('results', "" + pageSize);
        params.set('sortField', sortField);
        params.set('sortOrder', sortOrder);
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].api + '/api/results', { search: params }).map(function (res) { return res.json().data; });
    };
    RandomUserService.prototype.getServiceInstances = function (pageIndex, pageSize, sortField, sortOrder) {
        if (pageIndex === void 0) { pageIndex = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        console.log('getServiceInstances cookie: ' + this.servicesService.getCookie('groupID'));
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('page', "" + pageIndex);
        params.set('results', "" + pageSize);
        params.set('sortField', sortField);
        params.set('sortOrder', sortOrder);
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiService + '/apiService' + '/groups/' + this.servicesService.getCookie('groupID') + '/service-instances', { params: params }).map(function (res) { return res.json(); });
    };
    RandomUserService.prototype.getAppInstances = function (pageIndex, pageSize, sortField, sortOrder, tabName) {
        if (pageIndex === void 0) { pageIndex = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        console.log('tabName: ' + tabName);
        console.log('getAppInstances cookie: ' + this.servicesService.getCookie('groupID'));
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('clusterZone', "" + tabName);
        params.set('page', "" + pageIndex);
        params.set('results', "" + pageSize);
        params.set('sortField', sortField);
        params.set('sortOrder', sortOrder);
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/application-instances', { params: params }).map(function (res) { return res.json(); });
    };
    RandomUserService.prototype.getAppInstanceDetailTable = function (pageIndex, pageSize, sortField, sortOrder, instanceID) {
        if (pageIndex === void 0) { pageIndex = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* URLSearchParams */]();
        params.set('page', "" + pageIndex);
        params.set('results', "" + pageSize);
        params.set('sortField', sortField);
        params.set('sortOrder', sortOrder);
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiApp + '/apiApp' + '/application-instances/' + instanceID, { search: params }).map(function (res) { return res.json(); });
    };
    RandomUserService.prototype.getAppInstanceDetail = function (instanceID) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiApp + '/apiApp' + '/application-instances/' + instanceID).map(function (res) { return res.json(); });
    };
    RandomUserService.prototype.getSubInstanceDetail = function (appName) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiApp + '/apiApp' + '/groups/' + this.servicesService.getCookie('groupID') + '/applications/' + appName + '/instances').map(function (res) { return res.json(); });
    };
    return RandomUserService;
}());
RandomUserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClient */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_service__["a" /* ServicesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_service__["a" /* ServicesService */]) === "function" && _c || Object])
], RandomUserService);

var _a, _b, _c;
//# sourceMappingURL=random-user.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/services.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicesService; });
/* unused harmony export Services */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_cookie__ = __webpack_require__("../../../../angular2-cookie/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_cookie__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ServicesService = (function () {
    function ServicesService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
    }
    ServicesService.prototype.getServices = function (tabName, moduleName) {
        // console.log('tabName: ' + tabName);
        // console.log('moduleName: ' + moduleName);
        if (moduleName === 'repository') {
            console.log('getService repository cookie: ' + this.getCookie('groupID'));
            return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].api + '/api/' + this.getCookie('groupID') + '/warehouse/dir?region=' + tabName).map(function (res) { return res.json(); });
        }
        else if (moduleName === 'service') {
            console.log('getService service cookie: ' + this.getCookie('groupID'));
            //  return this.http.get('/api' + '/app1.0/groups/1/services?isPublic=1').map(res => res.json());
            //isPubilc 传1，默认是共有的服务，现在没有私有服务
            return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiService + '/apiService' + '/groups/' + this.getCookie('groupID') + '/services?isPublic=1').map(function (res) { return res.json(); });
        }
        else if (moduleName === 'app') {
            console.log('getService app cookie: ' + this.getCookie('groupID'));
            //  return this.http.get('/api' + '/app1.0/groups/1/services?isPublic=1').map(res => res.json());
            return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiApp + '/apiApp' + '/groups/' + this.getCookie('groupID') + '/applications').map(function (res) { return res.json(); });
        }
        /* else if (moduleName === 'serviceDetail') {
            //  服务详情里面，tabName字段传入的是服务id，serviceId
            return this.http.get('/apiService' + '/groups/1/services/' + tabName + '/instances').map(res => res.json());
        }*/
    };
    ServicesService.prototype.getCateServices = function (tabName, moduleName, cateID) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].api + '/api/' + this.getCookie('groupID') + '/warehouse/dir/' + cateID + '?region=' + tabName).map(function (res) { return res.json(); });
    };
    ServicesService.prototype.getHeroes = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].api + '/api/services')
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    // 通过url获取op侧的userid
    ServicesService.prototype.getUserId = function () {
        // const url = window.location.href;
        var url = 'http://10.254.3.120:8080/pass/#/appStore?userId=1';
        // console.log('url: ' + url);
        if (!!url) {
            var search = url.split('?');
            if (!!search) {
                var searchArray = search[1].split('=');
                console.log('URL searchArray: ' + searchArray);
                return searchArray[1];
            }
        }
        else {
            return '';
        }
    };
    ServicesService.prototype.getGroupList = function () {
        this.userId = this.getUserId();
        console.log('getservice userID: ' + this.userId);
        if (this.userId === '') {
            return '';
        }
        else {
            // return '';
            return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiOP + '/renter/users/' + this.userId + '/groups?roleName=all').map(function (res) { return res.json(); });
        }
    };
    ServicesService.prototype.getGroupNameList = function (data) {
        var groupList;
        var groupArray = [];
        var temp;
        // 如果op返回的json里面有user字段
        // console.log('getGroupNameList data ' + data);
        if (!!data.user) {
            groupList = data.user.groups;
            // 如果有group字段并且是一个array
            if (groupList instanceof Array) {
                // console.log(groupList instanceof Array);
                // console.log('getGroupNameList groupList: ' + groupList);
                for (var i = 0; i < groupList.length; i++) {
                    // console.log('groupList length: ' + groupList.length);
                    temp = groupList[i];
                    // 逻辑判断，如果op数组中的temp含有下划线_,需要去掉下划线
                    // 如果没有下划线，正常添加进groupArray的数组
                    if (temp.name && temp.name.indexOf('_') > 0) {
                        // 通过split，join去掉op本来项目名称中的下划线，然后再拼接_groupid
                        groupArray[i] = temp.name.split('_').join('') + '_' + temp.id;
                    }
                    else {
                        // op项目组名没有下划线，正常拼接，加入groupArray
                        groupArray[i] = temp.name + '_' + temp.id;
                    }
                    // console.log('temp: ' + temp);
                    // console.log(' groupArray[i]: ' +  groupArray[i]);
                }
                return groupArray;
            }
        }
        else {
            return [];
        }
    };
    ServicesService.prototype.getCookie = function (key) {
        return this._cookieService.get(key);
    };
    ServicesService.prototype.setCookie = function (key, group) {
        return this._cookieService.put(key, group);
    };
    return ServicesService;
}());
ServicesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_cookie__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_cookie__["CookieService"]) === "function" && _b || Object])
], ServicesService);

var Services = (function () {
    function Services(name, createTime, updateTime, status, id) {
        this.name = name;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.status = status;
        this.id = id;
    }
    return Services;
}());

var _a, _b;
//# sourceMappingURL=services.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__header_header_component__ = __webpack_require__("../../../../../src/app/shared/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directive_echarts_echarts_directive__ = __webpack_require__("../../../../../src/app/shared/directive/echarts/echarts.directive.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ng_zorro_antd__["a" /* NgZorroAntdModule */].forRoot()
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__header_header_component__["b" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_3__directive_echarts_echarts_directive__["a" /* EchartsDirective */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__header_header_component__["b" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_3__directive_echarts_echarts_directive__["a" /* EchartsDirective */]
        ],
        providers: []
    })
], SharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "../../../../../src/app/tab/tab.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/tab/tab.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<ul id=\"myTab\" class=\"nav nav-tabs\">\n  <li class=\"active\">\n    <a href=\"#privateApp\" data-toggle=\"tab\">\n      我的应用\n    </a>\n  </li>\n  <li><a href=\"#publicApp\" data-toggle=\"tab\">公共应用</a></li>\n</ul>-->\n<nz-tabset [nzTabPosition]=\"'top'\" [nzType]=\"'card'\">\n  <nz-tab *ngFor=\"let tab of tabs\">\n    <ng-template #nzTabHeading>\n      {{tab.name}}\n    </ng-template>\n    <app-applist [tabName]=\"tab.tabName\" >\n\n    </app-applist>\n  </nz-tab>\n</nz-tabset>"

/***/ }),

/***/ "../../../../../src/app/tab/tab.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabComponent; });
/* unused harmony export TabClass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TabComponent = (function () {
    function TabComponent() {
    }
    TabComponent.prototype.ngOnInit = function () {
    };
    return TabComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TabComponent.prototype, "tabs", void 0);
TabComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-tab',
        template: __webpack_require__("../../../../../src/app/tab/tab.component.html"),
        styles: [__webpack_require__("../../../../../src/app/tab/tab.component.css")]
    }),
    __metadata("design:paramtypes", [])
], TabComponent);

var TabClass = (function () {
    function TabClass(index, name, tabName) {
        this.index = index;
        this.name = name;
        this.tabName = tabName;
    }
    return TabClass;
}());

//# sourceMappingURL=tab.component.js.map

/***/ }),

/***/ "../../../../../src/app/util/error-interceptor/error-interceptor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/util/error-interceptor/error-interceptor.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  error-interceptor works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/util/error-interceptor/error-interceptor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorInterceptorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__ = __webpack_require__("../../../../ng-zorro-antd/esm5/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_test_service_test_service__ = __webpack_require__("../../../../../src/app/service-test/service-test.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ErrorInterceptorComponent = (function () {
    // 1、当constructor(private _notification: NzNotificationService, public translateService: TranslateService)的时候
    // 这里会报错https://stackoverflow.com/questions/47091872/angular-4-cannot-instantiate-cyclic-dependency-injectiontoken-http-interceptor
    // 循环依赖，因为TranslateService，去看下app.module.ts，发现他是需要httpclient注入的，所以就形成这样的依赖：
    // app.module.ts:
    // TranslateService : 依赖于httpclient
    // 然后这里err，是集成httpErr，也就是httpclient，这里如果注入TranslateService，那么就是httpclient依赖于TranslateService了
    // 2、下面是引入inj，然后用get方法解决循环依赖，但是会出现Maximum call stack size exceeded这样一个错误
    // constructor(private inj: Injector) {
    //   this.translateService = inj.get(TranslateService);
    //   this._notification = inj.get(NzNotificationService);
    // 这个maximum错误，经过断点调试，发现先constructor，之后一直在跑createNotification = (type, messageType, messageContent) => {这个定义
    function ErrorInterceptorComponent(_notification, inj) {
        var _this = this;
        this._notification = _notification;
        this.inj = inj;
        this.createNotification = function (type, messageType, messageContent) {
            _this._notification.create(type, messageType, messageContent);
        };
        // 这里根据https://github.com/angular/angular/issues/18224里面tarasbobak的settimeout大法，可以解决问题
        // 然后把this.translateService.addLangs(["zh", "en"]);
        // this.translateService.setDefaultLang("en");
        // const browserLang = this.translateService.getBrowserLang();
        // this.translateService.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
        // 从constructor移到ngOninit里面，因为settimeout是异步的，会报错addLangs undefined
        // 但是会有问题，setTimeout之后，调试发现ngOninit不执行，所以这个黑科技还是放弃，继续先把private _notification: NzNotificationService注入进来
        // 然后按照https://github.com/angular/angular/issues/18224里面perusopersonale的说法，不要在constructor里面注入translateSerivce，在
        // intercept里面注入这个service
        // setTimeout( () => {
        //   this.translateService = inj.get(TranslateService);
        //   this._notification = inj.get(NzNotificationService);
        // }, 0);
    }
    ErrorInterceptorComponent.prototype.intercept = function (req, next) {
        var _this = this;
        // const clonedRequest = req.clone({
        //   responseType: 'text'
        // });
        // install an error handler
        // 这里是注入translateService，不能在constructor里面注入
        var translateService = this.inj.get(__WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]);
        var serviceTest = this.inj.get(__WEBPACK_IMPORTED_MODULE_6__service_test_service_test_service__["a" /* ServiceTestService */]);
        translateService.addLangs(["zh", "en"]);
        // translateService.setDefaultLang("zh");
        var browserLang = translateService.getBrowserLang();
        // translateService.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
        // 这里是注入translateService，不能在constructor里面注入
        return next.handle(req)
            .catch(function (err) {
            // console.log(err);
            // let parsedError;
            // if (err.status === 400 || err.status === 403) {
            //   parsedError = Object.assign({}, err, { err: JSON.parse(err.error) });
            // } else {
            //   parsedError = err;
            // }
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('An error occurred111:', err.error.message);
            }
            else {
                // translateService.setDefaultLang("zh");
                var errCode_1, errMsg_1, errMsg2_1;
                var chinaReg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                if (err.status === 400 || err.status === 403) {
                    if (err.error.errorMsg !== undefined) {
                        errMsg2_1 = err.error.errorMsg;
                        errCode_1 = 'others';
                    }
                    else {
                        if (chinaReg.test(err.error.message)) {
                            errMsg_1 = err.error['message'];
                            errCode_1 = 'others';
                        }
                        else {
                            errCode_1 = JSON.parse(err.error.message)['errors'][0]['code'];
                            errMsg_1 = JSON.parse(err.error.message)['errors'][0]['message'];
                        }
                    }
                    translateService.use(browserLang.match(/zh|en/) ? browserLang : 'zh').subscribe(function () {
                        translateService.get(errCode_1).subscribe(function (res) {
                            if (errCode_1 !== 'others') {
                                if (errCode_1 === res) {
                                    _this.createNotification('error', '服务器错误', errMsg_1);
                                }
                                else {
                                    _this.createNotification('error', '服务器错误', res);
                                }
                            }
                            else {
                                if (errMsg2_1 !== undefined) {
                                    _this.createNotification('error', '服务器错误', errMsg2_1);
                                }
                                else {
                                    _this.createNotification('error', '服务器错误', errMsg_1);
                                }
                            }
                            // 如果国际化翻译文件没有的话，就显示errMsg的信息
                        });
                    });
                }
                // 这里存在两个问题：
                // 1、需要确定.json file loaded之后，才进行调用translateService.get method，但是调试发现第一次httperror，并不会
                // 加载出来.json文件，第二次触发才能加载。
                // 2、translateService.get(errMsg)，文件不翻译问题，已经提issue: https://github.com/ngx-translate/core/issues/733
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.log("Backend returned code222 " + err.status + ", body was: " + err.error);
                // console.log(`err message ${errMsg}`);
            }
            // 这里必须return才可以
            // return Observable.throw(new Error('Your custom error'));
            // this.createNotification('error', '服务器错误', err.error);
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpErrorResponse */](err.error) || 'backend server error');
        });
    };
    ErrorInterceptorComponent.prototype.ngOnInit = function () {
        // console.log('这是oninit');
        // this.translateService.addLangs(["zh", "en"]);
        // this.translateService.setDefaultLang("en");
        // const browserLang = this.translateService.getBrowserLang();
        // this.translateService.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
    };
    return ErrorInterceptorComponent;
}());
ErrorInterceptorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-error-interceptor',
        template: __webpack_require__("../../../../../src/app/util/error-interceptor/error-interceptor.component.html"),
        styles: [__webpack_require__("../../../../../src/app/util/error-interceptor/error-interceptor.component.css")]
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["d" /* NzNotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng_zorro_antd__["d" /* NzNotificationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]) === "function" && _b || Object])
], ErrorInterceptorComponent);

var _a, _b;
//# sourceMappingURL=error-interceptor.component.js.map

/***/ }),

/***/ "../../../../../src/app/util/reg-pattern/reg-name.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = NameValidator;
/* unused harmony export userNameAsyncValidator */
/* unused harmony export nicknameValidator */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RegNameDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// 原生的pattern已经很好了
function NameValidator(regType, nameRe) {
    switch (regType) {
        case 'name': {
            return function (control) {
                var nameRegValue = nameRe.test(control.value);
                // const test = { 'forbiddenName': { value: control.value } };
                // return !forbidden ? { 'forbiddenName': { value: control.value } } : null;
                var nameReg;
                if (!nameRegValue) {
                    nameReg = { 'nameReg': { value: control.value } };
                }
                else {
                    nameReg = null;
                }
                return nameReg;
            };
            // break;
        }
        default:
            break;
    }
}
function userNameAsyncValidator(control) {
    return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
        if (control.value === 'JasonWood') {
            observer.next({ error: true, duplicated: true });
        }
        else {
            observer.next(null);
        }
        observer.complete();
    });
}
;
function nicknameValidator(control) {
    // return control.valueChanges;
    if (control.valueChanges !== undefined) {
        return control
            .valueChanges
            .map(function (value) {
            if (value !== 'cipchk') {
                control.setErrors({ checked: true, error: true });
                return;
            }
            control.setErrors(null);
        });
    }
}
// 下面是模板驱动表单的验证器
// https://angular.cn/guide/form-validation#添加响应式表单
var RegNameDirective = RegNameDirective_1 = (function () {
    function RegNameDirective() {
    }
    return RegNameDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], RegNameDirective.prototype, "forbiddenName", void 0);
RegNameDirective = RegNameDirective_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[appRegName]',
        providers: [{ provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* NG_VALIDATORS */], useExisting: RegNameDirective_1, multi: true }]
    }),
    __metadata("design:paramtypes", [])
], RegNameDirective);

var RegNameDirective_1;
//# sourceMappingURL=reg-name.directive.js.map

/***/ }),

/***/ "../../../../../src/assets/nav/nav-img.png":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK8AAAAtCAYAAADY6jumAAAJP0lEQVR4nO2cfUwUZx7HvwvsArusvLoWWFwBFbVSewiUO1Dr4RUqufV6Yj3KgcaSGEh8aS6USOTKFWJDyEWwyZJLtmfF47ScxusmjXhK+oeSnmI3lRfPhcrLua7ldYEFhIXdvWeGQ0BXnUW3OuX5JJOdmec3M88D3/nN9/nNgiAmfrsNFAoPcXnRHaBQ5gsVL4W3UPFSeAsVL4W3UPFSeAsVL4W3UPFSeAsVL4W3UPFSeAsVL4W3UPFSeIvbsxwsEXvitcgI/HrrJvj6euNi7Te4Wt+Au4au59U/CuWxuAYvXVPoyAECgQDuIiEUIUF4b2cK3n4rgV0P8PdBeFgIFIogmM0TGBg0wWKxwGaj3/uhOAeHMq9UKkGI/BX8bN1q+HhLsUTmDy8vCUTuIrgJ3eBBPheRmDc3xmBVRBgam1pwR/8D+voHMDEx6awxUBYonDOvP8msP499HTt++xY2xq9HWKgck5MWtHXo2faR4VG03O7EIiJmORF47Pq1WLMqnM3UwyP30d8/6MxxUBYgnDNvUtImbN3yCwQFLn6wb5HUC64uLrj09b8xOjqGxE2xWKYIhqenB9u+NCQQO1OTsZpk4fzC8uffe8qChrN4v7TK0fp1C7as6EPMymCMjY2TiVk362uVW9+Em5sbaxGabn4PPz9vBC5ZzG739hnhKfZw5hgodpEh/dgR/B7n8eH+s2h80d1xApzFO+AiRgM8ca+xB1dufI/lAWJEr10Omd8iSIlVYMQrJhl3YHAIDU2taGhswdpXl2PlCsW8/G76sRM4ECV5sN3xVSV6N2Ui2usJB3XWIja9wuFrvXiyUX0lEcscPWy4EeXJf0KVnab4Q/nIjhKiQXX5JylcBs7iFZiMGDGPY9TVBQarGC2j4zBZ2rBhXThChEK4W60wDY+g3zgEd3chEbSYFbOfrzdbfXCUqv27AFbAwPVPdyHnC7LzE81MwKEyXEvxnWnjNRV4N8H+TXe46gw291Uicb/Gbrs9InZ/hI9TlsDwVSly/t79YP+OIhXSvWuRRzKx7pn7/OLh/JLCNmoCTP2wEZtgFolxVyDBP3X9KLvQgJpvmths2/FfAytapnQmW+wHiUQMF+KJzROOi3fB8WoWqmtUKHlH9tTQeHLjnleTp5CdNka4qqxV6CPCffcT7Zy2f9RoYVqZBtUxJYKeU7dfJNxLZQFkuF13iIrJus0KwYQZ427uaLcSEesnkeMLrAlfypbQenqNJAuPsjVexhe3d9513gi4sPMj1O6LBLQaaBAH5ToZpK5k//0BNNacQMGfL8MwHRu/HSV7lYhXSCBiYiwj6Lh0CgeLahyIkWFHQS72xIfC32uqXadRI2/2dR6mWYMvWzbgwL5ClKAQeee67YYxwi1J9kX7uSZcf7jtYCk+TpWj74IKBx8SLkudGhlFwMmCTHx2FHj/A83j+8MDOGdeAZN53YRk+b/eiTBtFismzWaYJ63EInjCXSRivS9DV1cvbjToMDhkQkjwEqd03lGkUUoo3bUo35uK2KwKaPRCRL6Tg6KsmWyXnhKHgCYN8piYhFxU3ACWJe1C0W5wjokmfjM3SY7ei+X4TUIqMvKJSBRxiH9i77qJVSpERZMEm/fl4/AjwTIkFUwLtxwZZbPEKSeiP6ZGSaoMhnNqVFwDIpO2I7fgAIoK8vFZZRmqq9SovXgKV4qSEUFuKP+YNJQdipr/D/MlgHvmJZkWriSceFu4Mtq1suuCsVEIvDwgFE6dymQaQUtrB1sDDiai9ffzIdZB4Kz+O0b3Vfxxrxp17EYtiguCEXFcicgtaYhWl7OZrCo/d9YEqB3HTzZhW9QbWEaEj8+nfOfTYpJXy8l+PXTTmbbuLPLquHSQnGt/OVadzkHoavKkqJs91YrDthgv6L4ox/uquVk1KPlt7IjygcgygdDkLBT90ghDH/l9YRR3W7tgaG3HeLcO9R0jZJ8Zfc1XcX1dPs5/mItqPGov+AJ38RLvygqYWayTbOYF0aRN4Mrag2FiE26332GzL/NiwnuRFyvcxQG+uH9/zIlD4I5Jr8McDekroetWIkK2BDFkc/oxHESEmLQxDmH+PlimCEEA2SeS+sw515Ni6vUDUIbJsbnyANrLTqFKa98C2EeLvN9l2dmvQY7S/qTNoM5HgtqBSzDoj+BvW1TY5uBhLxOcxWtzI6KcGJ+yDgIXsk0+PcQQDA9ifNyMxputWL8mlJ2o+fhIWTEz2ZgR9uhLIt7H4imGP7sShVz1AexYJUJfpx7tbSR71k1AGhaFINF02e7pMRdUJ/CaLIvEMI/zDdjTqYXmuBrll+yLmKkoKBVP6J8iE9euZNptMmkdq0TMpuqDHLtlNr7AWbyu9f+CzYd4Q5JdbCIPQCydWoh4PYz38PrGGIQufYV969ZvnHoVzAj4+rdNaGhucdoAno1ISEXkY9hIHtiEfWlEcBLozuQQTzkttGxUZ8w6hEuM/jJKsy6jitiIPbuTsTkqCun5+ZAOHkRx/aO9KE5PRfFjeuhIqeypN8EsnkX0Lwvc67x9P0AwZISNeTQGh5NsRVz/QC9YN+sng4eHBzzJIhIJ2bpuvbYZbcRGMF/K6enpd94IHEAqlbElopmqAZm8BBIX2NDEZqBIfyZzjsB0byZDBuWEzSkrcYmZxqDVoJgsNUUqqDb7IiiM7LQj3ucJF1GyN4Rzu/GjwL3aYB6DYGQQLv1dcOm4CZfbDWwFwkayL7MIiCdm7EFjcysuXKrD5bpvof3uP2i+eRuGez3OHAN3ViRCdUSJaDnjWdNw9A/kUW/Wo6bqLNvc2DFApjMSRPwqE0kkJiIlGyXKUIhmnYJLzOG/qHB0byIimA35BsQHEsFbyCSq7Ucc6wLA8S+jMyImWRhGIsiRITYL25Yq0NVjRJuuFbda2vHdjVusdbBYrPPu2OzXw9H7zqA6LJXMiud9OhbTLS0MK7ZDdXrKP5q723Hh01IUT8/iPi9DxepC7IlToui0ktiJblzXXEXHe2/MvLrlEPPXGh3KsrJxMiN76rrMdcpK7VoGyvwRLIj/EvngJQX/fB71vI/nmf4MiPLysZA8L828FN5C/3qYwlsWRual/CShmZfCW6h4KbyFipfCW6h4KbyFipfCW6h4KbyFipfCW6h4KbyFipfCW6h4Kbzlf5tXiYMkEF6tAAAAAElFTkSuQmCC"

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
/*export const environment = {
    production: false,
    name: '公司测试环境',
    apiService: 'http://10.132.49.108:8032',
    apiApp: 'http://10.132.49.108:8031',
    apiConfig: 'http://10.132.49.137:32769',
    api: 'http://10.132.49.108:8180',
    apiAlauda: 'http://10.132.49.108:8039/apiJakiro/v1',
    apiOP: 'http://10.139.5.45:7080/bdoc/v2',
    groupId: '2',
    adminGroupId: '0',
    namespace: 'alauda'
};*/
/*export const environment = {
    production: false,
    name: '贵州v3.0线上环境',
    apiService: 'http://10.198.102.81:17020',
    apiApp: 'http://10.198.102.81:17010',
    apiConfig: 'http://10.198.102.81:17070',
    api: 'http://10.198.102.81:17080',
    apiAlauda: 'http://10.198.102.81:17090/apiJakiro/v1',
    apiOP: 'http://10.198.102.81:27080/bdoc/v2',
    groupId: '2',
    adminGroupId: '0',
    namespace: 'alauda'
};*/
var environment = {
    production: false,
    name: 'op联调提测环境',
    apiService: 'http://10.132.49.122:18032',
    apiApp: 'http://10.132.49.122:18031',
    apiConfig: 'http://10.132.49.122:18037',
    api: 'http://10.132.49.122:18180',
    apiAlauda: 'http://10.132.49.122:18039/apiJakiro/v1',
    apiOP: 'http://10.139.8.78:7080/bdoc/v2',
    groupId: '2',
    adminGroupId: '0',
    namespace: 'alauda'
};
/*export const environment = {
    production: false,
    name: '贵州v2线上环境',
    apiService: 'http://10.198.102.89:8032',
    apiApp: 'http://10.198.102.89:8031',
    api: 'http://10.198.102.89:8180',
    apiAlauda: 'http://10.198.102.89:8039/apiJakiro/v1',
    apiOP: 'http://10.198.102.180:7080/bdoc/v2',
    groupId: '2',
    adminGroupId: '0',
    namespace: 'admin'
};*/
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bm": "../../../../moment/locale/bm.js",
	"./bm.js": "../../../../moment/locale/bm.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es-us": "../../../../moment/locale/es-us.js",
	"./es-us.js": "../../../../moment/locale/es-us.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./gu": "../../../../moment/locale/gu.js",
	"./gu.js": "../../../../moment/locale/gu.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map