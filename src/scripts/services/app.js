  /*
   * Copyright (c) 2015-2025 Phoinex Scholars Co. http://dpq.co.ir
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  'use strict';
  angular.module('mblowfish-core') //

          /**
           * @ngdoc Services
           * @name $app
           * @description Application manager
           * 
           * $app manage the app. It gets all required information from server and store those in rootScope.
           * So, in the scope of application everyone who wants something about this type of information it 
           * should get them from rootScope. Also, $app watch the rootScope and do all required tasks(such as
           * updating config into the server and etc.) automatically.
           * That way, the $app service is separated from directly responding to others.
           * Important: In this version, 'start', 'login' and 'logout' are exceptions and could access directly from 
           * outside.
           * The pseudo-code of all works that the service performs is as follows:
           * 1) Getting required information from the server and store in rootScope.
           * 2) Watching the rootScope and do all required works.
           *    (such as updating config into the server and etc.) automatically.
           * 3) Managing an internally Finite State Machine(FSM) to control the state of the app.
           * 4) Performing login and logout.
           * 
           * ## user, is the account_setting is stored in server.
           * 
           * ## settings
           * * Settings are stored in the local storage and each user can edit it directly.
           * 
           * ## options are the settings of application which is stored in server.
           * Example: recaptcha engine.
           * 
           * ## config
           * Configuration is stored in server (cms) and owners are allowed to update. Do not store
           * secure properties on configuration.
           * 
           * @property {object}  app  - Application repository.
           * @property {string}  app.dir  - Application direction which is updated automatically baed on configuaration and setting.
           * @property {object}  app.setting  - Application setting.
           * @property {object}  app.config  - Application setting.
           * 
           */
          .service('$app', function ($rootScope, $usr, $q, $cms, $translate, $mdDateLocale, $localStorage) {

              var APP_PREFIX = 'angular-material-blowfish-';
              var APP_CNF_MIMETYPE = 'application/amd-cnf';
              //All the things that are set up by $app service
              var app = {
                  state: {
                      // all states: waiting, loading, offline, app_not_configured, ready, fail
                      status: 'loading',
                      stage: 'starting',
                      message: null
                  },
                  logs: [],
                  user: {
                      current: {},
                      anonymous: true,
                      administrator: false,
                      owner: false,
                      member: false,
                      authorized: false
                  },
                  config: {},
                  setting: {},
                  options: {}
              };
              /*
               * متغیرهای مدیریت تنظیم‌ها
               * 
               * زمانی که عملی روی تنظیم‌ها در جریان است قفل فعال می‌شود تا از انجام
               * کارهای تکراری جلوگیری کنیم.
               * 
               * در صورتی که یک پردازش متغیری را تغییر دهد پرچم داده‌های کثیف فعال می‌شود
               * تا پردازشی که در حال ذخیره سازی است ذخیره کردن داده‌های جدید را هم انجام
               * دهد.
               */
              var appConfigLock = false;
              var appConfigDirty = false;
              // Some controlling variables required in the state machine
              var ctrl = {
                  user_loaded: false,
                  options_loaded: false,
                  configs_loaded: false
              };

              //All required functions
              //---------------------------------------------------------------------------------------
              function start(key) {//this function is called when the app get started.
                  app.key = key;
                  _loadingLog('start_event', 'loading application');
                  stateMachine.start_event();
              }

              /**
               * تنظیم‌های نرم افزار را لود می‌کند.
               * 
               * @returns promiss
               */
              function loadApplicationConfig() {
                  _loadingLog('loading configuration', 'fetch configuration document');
                  $cms.getContent(APP_PREFIX + app.key) //
                          .then(function (content) {

                              app._acc = content;
                              _loadingLog('loading configuration', 'fetch configuration content');
                              return app._acc.value();
                          }, function (error) {
                              if (error.status === 404) {
                                  stateMachine.configs_not_found();
                                  return {};
                              } else if (error.status === 500) {
                                  // TODO: maso, 2018: throw an excetpion and go the the fail state
                                  stateMachine.server_error();
                              } else if (error.status === -1) {
                                  _loadingLog('loading configuration', 'network error');
                                  stateMachine.network_error();
                              }
                          }) //
                          .then(function (appConfig) {
                              app.config = appConfig;
                              ctrl.configs_loaded = true;
                              _loadingLog('loading configuration', 'application configuration loaded successfully');
                              stateMachine.loaded();
                              return;
                          });
              }

              /*
               * اطلاعات کاربر جاری را لود می‌کند
               * 
               * اطلاعات کاربر جاری از سرور دریافت شده و بر اساس اطلاعات مورد نیاز در سطح
               * نرم افزار پر می‌شود.
               * 
               * If there is a role x.y (where x is application code and y is code name) in role list then
               * the following var is added in user:
               * 
               *     app.user.x_y
               * 
               */
              function loadUserProperty() {
                  _loadingLog('loading user info', 'fetch user information');
                  $usr.getAccount('current') //
                          .then(function (user) {
                              ctrl.user_loaded = true;
                              stateMachine.loaded();
                              // app user data
                              app.user = {};
                              app.user.current = user;
                              app.user.anonymous = user.isAnonymous();
                              _loadingLog('loading user info', 'user information loaded successfully');
                              _loadingLog('loading user info', 'check user permissions');
                              if (angular.isArray(user.roles)) {
                                  for (var i = 0; i < user.roles.length; i++) {
                                      var role = user.roles[i];
                                      app.user[role.application + '_' + role.code_name] = role;
                                  }
                                  delete user.roles;
                              }
                          }, function (error) {
                              if (error.status === 500) {
                                  // TODO: maso, 2018: throw an excetpion and go the the fail state
                                  _loadingLog('loading user', 'server error');
                                  stateMachine.server_error();
                              } else if (error.status === -1) {
                                  _loadingLog('loading user', 'network error');
                                  stateMachine.network_error();
                              }
                          });
              }

              /*
               * Loads options
               */
              function loadOptions() {
                  //TODO: Masood, 2018: options should be get from server. Now, its api doesn't exist.
                  _loadingLog('loading options', 'fetch options document');
                  //get the options from server and save in app.options.
                  app.options = {};
                  // $cms.getOptions()
                  // .then(function (res) {
                  //    ctrl.options_loaded = true;
                  //    stateMachine.loaded();
                  //    app.options = res.item;
                  //    var deferred = $q.defer();
                  //    deferred = $q.resolve('ok');
                  //    return deferred.promise;
                  // }, function (error) {
                  //            if (error.status === 500) {
                  //                // TODO: maso, 2018: throw an excetpion and go the the fail state
                  //                _loadingLog('loading options', 'server error');
                  //                stateMachine.server_error();
                  //            } else if (error.status === -1) {
                  //                _loadingLog('loading options', 'network error');
                  //                stateMachine.network_error();
                  //            }
                  //        });
                  ctrl.options_loaded = true;
                  stateMachine.loaded();
                  var deferred = $q.defer();
                  deferred.resolve('ok');
                  return deferred.promise;
              }
              /*
               * Loads local storage
               */
              function loadSetting() {
                  _loadingLog('loading setting from local storage', 'fetch settings');
                  //TODO: 'key' of app should be used
//                  $localStorage.setPrefix(app.key);
                  app.setting = $localStorage.$default({
                      dashboardModel: {}
                  });
                  _loadingLog('setting loaded', 'fetch settings');
                  //
                  //The lines below is an alternative for lines above but not recommended.
//                  localStorage.setPrefix(key);
//                  app.setting = $localStorage.app.setting || {dashboardModel: {}};
//                  $rootScope.$watch('app.setting', function () {
//                      $localStorage.app.setting = $rootScope.app.setting;
//                  });$
              }


              /**
               * تنظیم‌های نرم افزار را ذخیره می‌کند.
               * 
               * @returns promiss
               */
              function storeApplicationConfig() {
                  if (!app.user.owner || appConfigLock) {
                      var message = 'fail';
                      var deferred = $q.defer();
                      deferred.reject({
                          data: {
                              message: message
                          }
                      });
                      return deferred.promise;
                  }
                  appConfigLock = true;
                  var promise;
                  if (app._acc) { // content loaded
                      appConfigDirty = false;
                      promise = app._acc.setValue(app.config);
                  } else { // create content
                      promise = $cms.putContent({
                          name: APP_PREFIX + app.key,
                          mimetype: APP_CNF_MIMETYPE
                      }).then(function (content) {
                          appConfigDirty = false;
                          app._acc = content;
                          stateMachine.config_created();
                          return app._acc.setValue(app.config);
                      }, function (error) {
                          if (error.status === 404) {
                              stateMachine.configs_not_found();
                              return {};
                          } else if (error.status === 500) {
                              // TODO: maso, 2018: throw an excetpion and go the the fail state
                              _loadingLog('storeApplicationConfig', 'server error');
                              stateMachine.server_error();
                          } else if (error.status === -1) {
                              _loadingLog('storeApplicationConfig', 'network error');
                              stateMachine.network_error();
                          }
                      });
                  } //
                  return promise //
                          .finally(function () {
                              appConfigLock = false;
                              if (appConfigDirty) {
                                  storeApplicationConfig();
                              }
                          });
              }

              /*
               * Attaches loading logs
               */
              function _loadingLog(stage, message) {
                  app.state.stage = stage;
                  app.state.message = message;
                  if (message) {
                      app.logs.push(message);
                  }
              }

              /**
               * بی هویت بودن کاربر جاری را تعیین می‌کند
               * 
               * @returns promiss
               */
              function isAnonymous() {
                  var deferred = $q.defer();
                  deferred.resolve(app.user.anonymous);
                  return deferred.promise;
              }

              /**
               * مالک بودن کاربر جاری را تعیین می‌کند
               * 
               * @returns promiss
               */
              function isOwner() {
                  var deferred = $q.defer();
                  deferred.resolve(app.user.owner);
                  return deferred.promise;
              }

              /**
               * عضو بودن کاربر جاری را تعیین می‌کند
               * 
               * @returns promiss
               */
              function isMember() {
                  var deferred = $q.defer();
                  deferred.resolve(app.user.member);
                  return deferred.promise;
              }

              /**
               * مجاز بودن کاربر جاری را تعیین می‌کند
               * 
               * @returns promiss
               */
              function isAuthorized() {
                  var deferred = $q.defer();
                  deferred.resolve(authorized);
                  return deferred.promise;
              }

              /**
               * ورود به سیستم
               * 
               * <pre><code>
               * $app.login({
               *     login : 'user name',
               *     password : 'password'
               * }).then(function(user) {
               *     //Success
               *     }, function(ex) {
               * 	//Fail
               *     });
               * </code></pre>
               * 
               * @memberof $app
               * @param {object}
               *                credential پارارمترهای مورد انتظار در احراز اصالت
               * @return {promise(PUser)} اطلاعات کاربر جاری
               */
              function login(credential) {
                  return $usr.login(credential) //
                          .then(loadUserProperty); //
              }

              /**
               * عمل خروج کاربر
               * 
               * کاربر را از سیستم خارج کرده و اصلاعات آن را در سیستم به روز می‌کند.
               * 
               * @memberof $app
               * @returns {Promise<PUser>} کاربر جاری
               */
              function logout() {
                  return $usr.logout() //
                          .then(loadUserProperty)//
                          , function (error) {
                              //TODO: Masood, 2018: Handle if the logout was failed.
                          };
              }
              //---------------------------------------------------------------------------------------
              //settings related to direction, language and calendar of the app

              /*
               * watch direction and update app.dir
               */
              $rootScope.$watch(function () {
                  if (!app.config.local) {
                      app.config.local = {};
                  }
                  return app.setting.dir || app.config.local.dir;
              }, function (value) {
                  app.dir = value; //(app.setting.dir || app.config.local.dir)//old version of app.js;
              });
              /*
               * watch local
               */
              $rootScope.$watch(function () {
                  // TODO: maso, 2018: remove this part in the next release
                  if (!angular.isObject(app.config.local)) {
                      app.config.local = {};
                  }
                  // Check language
                  return app.setting.local || app.config.local.language || 'en';
              }, function (key) {
                  // 0- set app local
                  app.local = key;
                  // 1- change language
                  $translate.use(key);
                  // 2- chnage date format
                  // Change moment's locale so the 'L'-format is adjusted.
                  // For example the 'L'-format is DD-MM-YYYY for Dutch
                  moment.loadPersian();
                  moment.locale(key);
                  // Set month and week names for the general $mdDateLocale service
                  var localeDate = moment.localeData();
                  $mdDateLocale.months = localeDate._months;
                  $mdDateLocale.shortMonths = localeDate._monthsShort;
                  $mdDateLocale.days = localeDate._weekdays;
                  $mdDateLocale.shortDays = localeDate._weekdaysMin;
                  // Optionaly let the week start on the day as defined by moment's locale data
                  $mdDateLocale.firstDayOfWeek = localeDate._week.dow;
              });
              /*
               * watch calendar
               */
              $rootScope.$watch(function () {
                  return app.setting.calendar || app.config.calendar || 'Gregorian';
              }, function (key) {
                  // 0- set app local
                  app.calendar = key;
              });

              //-----------------------------------------------------
              var stateMachine = new machina.Fsm({
                  initialize: function (options) {
                      app.state.status = 'waiting';
                  },
                  namespace: 'stateMachine',
                  initialState: 'waiting',
                  states: {
                      waiting: {//Before the 'start' event occurs via $app.start().
                          _onEnter: function () {
                              _loadingLog('FSM, state: waiting', 'wait for start_event');
                              app.state.status = 'waiting';
                          },
                          start_event: function () {//Occures when the start() function is called.
                              _loadingLog('FSM, state: waiting', 'start_event occurred');
                              this.transition('loading');
                          },
                          network_error: function () {
                              _loadingLog('FSM, state: waiting', 'network error');
                              this.transition('offline');
                          }
                      },
                      loading: {//start_event has occurred.
                          _onEnter: function () {
                              _loadingLog('FSM, state: loading', 'load setting, load config');
                              app.state.status = 'loading';
                              loadSetting(); //1. get from local storage 2. save in app.setting
                              loadApplicationConfig(); //1. get from server 2. save in app.setting
                          },
                          loaded: function () {
                              _loadingLog('FSM, state: loading', 'config || options || user is loaded');
                              if (ctrl.user_loaded && ctrl.options_loaded && ctrl.configs_loaded) {
                                  this.transition('ready');
                              } else if (ctrl.user_loaded && ctrl.options_loaded) {
                                  this.transition('ready_config_loading');
                              }
                          },
                          configs_not_found: function () {//equal to 404 error: configs not founded.
                              _loadingLog('FSM, state: loading', 'error 404 occurred while getting config');
                              this.transition('app_not_configured');
                          },
                          server_error: function () {//
                              _loadingLog('FSM, state: loading', 'error 500 occurred.');
                              this.transition('fail');
                          },
                          network_error: function () {
                              _loadingLog('FSM, state: loading', 'network error');
                              this.transition('offline');
                          }
                      },
                      ready: {
                          _onEnter: function () {
                              _loadingLog('FSM, state: ready', 'every thing is ok');
                              app.state.status = 'ready';
                          },
                          network_error: function () {
                              _loadingLog('FSM, state: ready', 'network error');
                              this.transition('offline');
                          }
                      },
                      ready_config_loading: {
                          _onEnter: function () {
                              _loadingLog('FSM, state: ready_config_loading', 'app is ready, config is loading');
                              app.state.status = 'ready_config_loading';
                          },
                          loaded: function () {
                              _loadingLog('FSM, state: ready_config_loading', 'config loaded');
                              this.transition('ready');
                          },
                          configs_not_found: function () {
                              _loadingLog('FSM, state: ready_config_loading', 'config not found');
                              this.transition('ready_app_not_configured');
                          },
                          network_error: function () {
                              _loadingLog('FSM, state: ready_config_loading', 'network error');
                              this.transition('offline');
                          }
                      },
                      app_not_configured: {//error 404, but the app is ready and should be loaded
                          _onEnter: function () {
                              _loadingLog('FSM, state: ready_app_not_configured', 'error 404 is occurred');
                              app.state.status = 'app_not_configured';
                          },
                          loaded: function () {
                              _loadingLog('FSM, state: app_not_configured', 'config || options || user loaded(ready to go ready state)');
                              if (ctrl.user_loaded && ctrl.options_loaded) {
                                  this.transition('ready_app_not_configured');
                              }
                          },
                          network_error: function () {
                              _loadingLog('FSM, state: app_not_configured', 'network error');
                              this.transition('offline');
                          }
                      },
                      ready_app_not_configured: {
                          _onEnter: function () {
                              _loadingLog('FSM, state: ready_app_not_configured', 'app is ready, app not configured');
                              app.state.status = 'ready_app_not_configured';
                          },
                          config_created: function () {
                              _loadingLog('FSM, state: ready_app_not_configured', 'config_created event occurred');
                              this.transition('ready');
                          },
                          network_error: function () {
                              _loadingLog('FSM, state: ready_app_not_configured', 'network error');
                              this.transition('offline');
                          }
                      },
                      fail: {//server error
                          _onEnter: function () {
                              _loadingLog('FSM, state: fail', 'error in server');
                              alert('Error in server...');
                          },
                          network_error: function () {
                              _loadingLog('FSM, state: fail', 'network error');
                              this.transition('offline');
                          }
                      },
                      offline: {//error -1, network error
                          _onEnter: function () {
                              _loadingLog('FSM, state: offline', 'error in network');
                              alert('Error in network...');
                          }
                      }
                  },
                  // define events
                  loaded: function () {//config || user || options || is loaded
                      this.handle("loaded");
                  },
                  start_event: function () {//start_event has occurred
                      this.handle("start_event");
                  },
                  configs_not_found: function () {//error 404, configs not found
                      this.handle("configs_not_found");
                  },
                  config_created: function () {//config is created on server.
                      this.handle("config_created");
                  },
                  server_error: function () {//error 500 is occurred while gtting config || user || options.
                      this.handle("server_error");
                  },
                  network_error: function () {//error -1 is occurred while gtting config || user || options.
                      this.handle("network_error");
                  }
                  
              });
              //---------------------------------------------------------------------------------------
              //Initial calls: each function does its work internally.
              //These two functions are called before the start_event is fired since they 
              //don't need to the 'key' of application.
              loadUserProperty(); //1. get from server 2. save in app.user
              loadOptions(); //1. get from server 2. save in app.options
              //------------------------------------------------------------------------
              $rootScope.app = app;
              var apps = {};
              // Init
              apps.start = start;
              apps.login = login;
              apps.logout = logout;
              return apps;
          });