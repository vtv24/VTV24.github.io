System.register("chunks:///_virtual/configuration.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, sys, log;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sys = module.sys;
      log = module.log;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "05c37maoztIcqYQxP8Afj1j", "configuration", undefined);

      const {
        ccclass
      } = _decorator;
      let configuration = exports('configuration', (_dec = ccclass("configuration"), _dec(_class = (_temp = _class2 = class configuration {
        constructor() {
          _defineProperty(this, "jsonData", null);

          _defineProperty(this, "path", null);

          _defineProperty(this, "KEY_CONFIG", 'CarConfig');

          _defineProperty(this, "markSave", false);

          _defineProperty(this, "saveTimer", -1);
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new configuration();

          this._instance.start();

          return this._instance;
        }

        start() {
          this.jsonData = {
            "userId": ""
          };
          this.path = this.getConfigPath();
          let content;

          if (sys.isNative) {
            const valueObject = jsb.fileUtils.getValueMapFromFile(this.path);
            content = valueObject[this.KEY_CONFIG];
          } else {
            content = sys.localStorage.getItem(this.KEY_CONFIG);
          }

          if (content && content.length) {
            if (content.startsWith('@')) {
              content = content.substring(1);
            }

            try {
              //初始化操作
              const jsonData = JSON.parse(content);
              this.jsonData = jsonData;
            } catch (excepaiton) {}
          } //启动无限定时器，每1秒保存一次数据，而不是无限保存数据


          this.saveTimer = setInterval(() => {
            this.scheduleSave();
          }, 500);
        }

        setConfigDataWithoutSave(key, value) {
          const account = this.jsonData.userId;

          if (this.jsonData[account]) {
            this.jsonData[account][key] = value;
          } else {
            console.error("no account can not save");
          }
        }

        setConfigData(key, value) {
          this.setConfigDataWithoutSave(key, value); // this.save();

          this.markSave = true; //标记为需要存储，避免一直在写入，而是每隔一段时间进行写入
        }

        getConfigData(key) {
          const account = this.jsonData.userId;

          if (this.jsonData[account]) {
            const value = this.jsonData[account][key];
            return value ? value : "";
          } else {
            log("no account can not load");
            return "";
          }
        }

        setGlobalData(key, value) {
          this.jsonData[key] = value;
          this.save();
        }

        getGlobalData(key) {
          return this.jsonData[key];
        }

        setUserId(userId) {
          this.jsonData.userId = userId;

          if (!this.jsonData[userId]) {
            this.jsonData[userId] = {};
          }

          this.save();
        }

        getUserId() {
          return this.jsonData.userId;
        }

        scheduleSave() {
          if (!this.markSave) {
            return;
          }

          this.save();
        }
        /**
         * 标记为已修改
         */


        markModified() {
          this.markSave = true;
        }

        save() {
          // 写入文件
          const str = JSON.stringify(this.jsonData);
          let zipStr = str;
          this.markSave = false;

          if (!sys.isNative) {
            const ls = sys.localStorage;
            ls.setItem(this.KEY_CONFIG, zipStr);
            return;
          }

          const valueObj = {};
          valueObj[this.KEY_CONFIG] = zipStr;
          jsb.fileUtils.writeToFile(valueObj, this.path);
        }

        getConfigPath() {
          const platform = sys.platform;
          let path = "";

          if (platform === sys.OS_WINDOWS) {
            path = "src/conf";
          } else if (platform === sys.OS_LINUX) {
            path = "./conf";
          } else {
            if (sys.isNative) {
              path = jsb.fileUtils.getWritablePath();
              path = path + "conf";
            } else {
              path = "src/conf";
            }
          }

          return path;
        }

        parseUrl(paramStr) {
          if (!paramStr || typeof paramStr === 'string' && paramStr.length <= 0) {
            // 没有带参数，直接忽略
            return;
          }

          let dictParam = {};

          if (typeof paramStr === 'string') {
            paramStr = paramStr.split('?')[1]; // 去除掉 ？号

            const arrParam = paramStr.split("&");
            arrParam.forEach(function (paramValue) {
              const idxEqual = paramValue.indexOf("=");

              if (idxEqual !== -1) {
                const key = paramValue.substring(0, idxEqual);
                dictParam[key] = paramValue.substring(idxEqual + 1);
              }
            });
          } else {
            dictParam = paramStr;
          }

          if (dictParam.action) {
            this.setGlobalData('urlParams', dictParam);
          } // todo：记录来源，以后用到


          if (dictParam.source) {
            this.setGlobalData('source', dictParam.source);
          }

          if (dictParam.adchannelid) {
            this.setGlobalData('adchannelid', dictParam.adchannelid);
          }
        }
        /**
         * 生成随机账户
         * @returns
         */


        static generateGuestAccount() {
          return `${Date.now()}${0 | 10}`;
        }

      }, _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/carManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './fightConstants.ts', './clientEvent.ts', './resourceUtil.ts', './constant.ts', './poolManager.ts', './car.ts', './follow.ts', './roadPoint.ts', './localConfig.ts', './playerData.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator, Component, Vec3, macro, fightConstants, clientEvent, resourceUtil, constant, poolManager, car, follow, roadPoint, localConfig, playerData;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      macro = module.macro;
    }, function (module) {
      fightConstants = module.fightConstants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      poolManager = module.poolManager;
    }, function (module) {
      car = module.car;
    }, function (module) {
      follow = module.follow;
    }, function (module) {
      roadPoint = module.roadPoint;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "0ab97H51jJALJr6aO9gzNGg", "carManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let carManager = exports('carManager', (_dec = ccclass("carManager"), _dec2 = property({
        type: follow
      }), _dec(_class = (_class2 = (_temp = class carManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "followCamera", _descriptor, this);
        }

        start() {// Your initialization goes here.
        }

        onEnable() {
          clientEvent.on('showInvincible', this.showInvincible, this);
        }

        onDisable() {
          clientEvent.off('showInvincible', this.showInvincible, this);
        }

        showInvincible() {
          if (this.mainCar) {
            this.mainCar.isInvincible = true;
          }
        }

        init(fightMap, customerManager) {
          this._fightMap = fightMap;
          this._customerManager = customerManager;
          this.creatMainCar();
        }

        creatMainCar() {
          let car = playerData.instance.showCar ? playerData.instance.showCar : constant.INITIAL_CAR;
          let carInfo = localConfig.instance.queryByID('car', car.toString());
          let skin = carInfo ? carInfo.model : constant.MIN_CAR_ID;
          resourceUtil.getCar(skin, (err, pfCar) => {
            if (err) {
              console.error(err);
              return;
            }

            if (this.mainCar) {
              poolManager.instance.putNode(this.mainCar.node);
            }

            let nodeCar = poolManager.instance.getNode(pfCar, this.node);
            this.mainCar = nodeCar.getComponent('car');
            this.mainCar.markMainCar(true);
            this.mainCar.setEntry(this._fightMap.path[0]);
            this.mainCar.manager = this._customerManager;
            this.mainCar.maxProgress = this._fightMap.levelProgressCnt;
            this.mainCar.setMoveOverListener(() => {});
            this.followCamera.followTarget = nodeCar;
            this.followCamera.showStart();
          }); // this.nodeTailLine = instantiate(this.pfTailLine);
          // this.nodeTailLine.parent = this.node;
          // this.nodeTailLine.active = false;
        } //预加载所有ai车辆


        preloadAICar(callback) {
          let arrPreload = [];

          for (let idx = 1; idx < this._fightMap.path.length; idx++) {
            let nodeRoadPoint = this._fightMap.path[idx];
            let point = nodeRoadPoint.getComponent(roadPoint);

            if (point.type !== fightConstants.ROAD_POINT_TYPE.AI_START) {
              return;
            }

            let arrCars = point.cars.split(',');

            for (let idx = 0; idx < arrCars.length; idx++) {
              if (arrPreload.indexOf(arrCars[idx]) === -1) {
                arrPreload.push(arrCars[idx]);
              }
            }
          }

          let cur = 0;
          resourceUtil.getCarsBatch(arrPreload, arg => {
            //批量加载，每一辆，先加载2%
            cur++;

            if (cur <= 15) {
              clientEvent.dispatchEvent('updateLoading', 2);
            }
          }, () => {
            if (cur <= 15) {
              clientEvent.dispatchEvent('updateLoading', 30 - cur * 2);
            }

            callback && callback();
          });
        }

        startGenerateEnemy() {
          this.genAICar = this.genAICar.bind(this);

          for (let idx = 1; idx < this._fightMap.path.length; idx++) {
            let nodeRoadPoint = this._fightMap.path[idx];
            let point = nodeRoadPoint.getComponent(roadPoint);
            point.startGenerateCar(this.genAICar);
          }
        }

        stopGenerateEnemy() {
          for (let idx = 1; idx < this._fightMap.path.length; idx++) {
            let nodeRoadPoint = this._fightMap.path[idx];
            let point = nodeRoadPoint.getComponent(roadPoint);
            point.stopGenerateCar();
          }
        }

        genAICar(road, randCar) {
          //应该动态生成
          resourceUtil.getCar(randCar, (err, pfCar) => {
            if (err) {
              console.error(err);
              return;
            }

            let otherCar = poolManager.instance.getNode(pfCar, this.node);
            let car = otherCar.getComponent('car');
            car.setEntry(road.node);
            car.minSpeed = road.carSpeed;
            car.maxSpeed = road.carSpeed;
            car.startRunning();
            car.markMainCar(false);
            car.setMoveOverListener(car => {
              poolManager.instance.putNode(car.node);
            });
          });
        }

        reset() {
          this.mainCar.setEntry(this._fightMap.path[0]);
          this.mainCar.maxProgress = this._fightMap.levelProgressCnt;
          this.followCamera.followTarget = this.mainCar.node;
          this.stopGenerateEnemy();
          this.recycleAllAICar();
        }
        /**
         *回收所有地方车辆
         *
         * @memberof carManager
         */


        recycleAllAICar() {
          let arrCars = [];
          let children = this.node.children;
          children.forEach(nodeCar => {
            arrCars.push(nodeCar);
          }, this);
          arrCars.forEach(nodeCar => {
            let car = nodeCar.getComponent('car');

            if (car && !car.isMain) {
              //车辆回收
              poolManager.instance.putNode(nodeCar);
            }
          });
        }
        /**
         *回收指定范围大小车辆
         *
         * @memberof carManager
         */


        recycleLimitAICar() {
          let arrCars = [];
          let children = this.node.children;
          children.forEach(nodeCar => {
            arrCars.push(nodeCar);
          }, this);
          arrCars.forEach(nodeCar => {
            let car = nodeCar.getComponent('car');
            let distance = Vec3.distance(nodeCar.worldPosition, this.mainCar.node.worldPosition);

            if (car && !car.isMain && Math.abs(distance) <= 5) {
              //车辆回收
              poolManager.instance.putNode(nodeCar);
            } else {
              car.isOver = false;
              car.startRunning();
            }
          });
        }
        /**
         * 由UI层调用，控制车辆行驶
         * @param isRunning
         */


        controlMainCar(isRunning) {
          if (isRunning) {
            clientEvent.dispatchEvent('showGuide', false);
            this.mainCar.startRunning();
          } else {
            this.mainCar.stopRunning();
          }
        }

        startGame() {
          clientEvent.dispatchEvent('showGuide', true);
          this.mainCar.startWithMinSpeed();
          this.startGenerateEnemy(); //开启定时检测车辆跟AI车辆是否相近

          this.schedule(this.checkCarIsCloser, 0.2, macro.REPEAT_FOREVER); //每0.2s检测一次
        }

        gameOver() {
          this.followCamera.followTarget = null; //将镜头跟随移除，免得一直晃

          this.stopGenerateEnemy(); //取消车辆的定时检测

          this.unschedule(this.checkCarIsCloser); //将其余车给停下来

          this.node.children.forEach(nodeCar => {
            let carScript = nodeCar.getComponent(car);
            carScript.stopImmediately();
          });
        }

        changeCameraFollowRotation() {
          //镜头方式修改
          this.followCamera.isFollowRotation = !this.followCamera.isFollowRotation;
        }
        /**
         * 获取当前关卡进度
         *
         * @memberof carManager
         */


        getCurrentProgress() {
          return {
            cur: this.mainCar.curProgress,
            isOver: !this.mainCar.hasCustomer
          };
        }

        revive() {
          this.recycleLimitAICar();
          this.mainCar.revive();
          this.followCamera.followTarget = this.mainCar.node;
          this.startGenerateEnemy();
        }

        checkCarIsCloser() {
          if (!this.mainCar.isCarMoving) {
            return; //车辆没有在移动，不需要检测
          }

          let nodeMainCar = this.mainCar.node;
          let posMainCar = nodeMainCar.getWorldPosition();
          this.node.children.forEach(nodeCar => {
            if (nodeCar !== nodeMainCar) {
              let posCar = nodeCar.getWorldPosition();
              let forward = nodeCar.forward;
              posCar.x -= forward.x;
              posCar.z -= forward.z;

              if (Math.abs(posCar.x - posMainCar.x) < 2 && Math.abs(posCar.z - posMainCar.z) < 2) {
                nodeCar.getComponent(car).tooting();
              }
            }
          });
        }

      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "followCamera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/eventListener.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, error, log;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      error = module.error;
      log = module.log;
    }],
    execute: function () {
      var _dec, _class, _temp, _dec2, _class3;

      cclegacy._RF.push({}, "10a09om3sZD8q2H50TLwLIc", "eventListener", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let oneToOneListener = (_dec = ccclass("oneToOneListener"), _dec(_class = (_temp = class oneToOneListener {
        constructor() {
          _defineProperty(this, "supportEvent", {});

          _defineProperty(this, "handle", {});

          this.supportEvent = null;
        }

        on(eventName, handler, target) {
          this.handle[eventName] = {
            handler: handler,
            target: target
          };
        }

        off(eventName, handler) {
          const oldObj = this.handle[eventName];

          if (oldObj && oldObj.handler && oldObj.handler === handler) {
            delete this.handle[eventName];
          }
        }

        dispatchEvent(eventName) {
          if (this.supportEvent !== null && !this.supportEvent.hasOwnProperty(eventName)) {
            error("please add the event into clientEvent.js");
            return;
          }

          const objHandler = this.handle[eventName];
          const args = [];

          for (let i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
          }

          if (objHandler.handler) {
            objHandler.handler.apply(objHandler.target, args);
          } else {
            log("not register " + eventName + "    callback func");
          }
        }

        setSupportEventList(arrSupportEvent) {
          if (!(arrSupportEvent instanceof Array)) {
            error("supportEvent was not array");
            return false;
          }

          this.supportEvent = {};

          for (let i in arrSupportEvent) {
            const eventName = arrSupportEvent[i];
            this.supportEvent[eventName] = i;
          }

          return true;
        }

      }, _temp)) || _class);
      let eventListener = exports('eventListener', (_dec2 = ccclass("eventListener"), _dec2(_class3 = class eventListener {
        static getBaseClass(type) {
          return oneToOneListener;
        }

      }) || _class3));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/oneToMultiListener.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, error;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      error = module.error;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "10a25g6TDNP2IICdF4Htopx", "oneToMultiListener", undefined);

      const {
        ccclass
      } = _decorator;
      let oneToMultiListener = exports('oneToMultiListener', (_dec = ccclass("oneToMultiListener"), _dec(_class = (_temp = _class2 = class oneToMultiListener {
        static on(eventName, handler, target) {
          const objHandler = {
            handler: handler,
            target: target
          };
          let handlerList = this.handlers[eventName];

          if (!handlerList) {
            handlerList = [];
            this.handlers[eventName] = handlerList;
          }

          for (var i = 0; i < handlerList.length; i++) {
            if (!handlerList[i]) {
              handlerList[i] = objHandler;
              return i;
            }
          }

          handlerList.push(objHandler);
          return handlerList.length;
        }

        static off(eventName, handler, target) {
          const handlerList = this.handlers[eventName];

          if (!handlerList) {
            return;
          }

          for (let i = 0; i < handlerList.length; i++) {
            const oldObj = handlerList[i];

            if (oldObj.handler === handler && (!target || target === oldObj.target)) {
              handlerList.splice(i, 1);
              break;
            }
          }
        }

        static dispatchEvent(eventName, ...args) {
          // if (this.supportEvent !== null && !this.supportEvent.hasOwnProperty(eventName)) {
          //     cc.error("please add the event into clientEvent.js");
          //     return;
          // }
          const handlerList = this.handlers[eventName];
          let i;

          for (i = 1; i < arguments.length; i++) {}

          if (!handlerList) {
            return;
          }

          for (i = 0; i < handlerList.length; i++) {
            const objHandler = handlerList[i];

            if (objHandler.handler) {
              objHandler.handler.apply(objHandler.target, args);
            }
          }
        }

        static setSupportEventList(arrSupportEvent) {
          if (!(arrSupportEvent instanceof Array)) {
            error("supportEvent was not array");
            return false;
          }

          this.supportEvent = {};

          for (let i in arrSupportEvent) {
            const eventName = arrSupportEvent[i];
            this.supportEvent[eventName] = i;
          }

          return true;
        }

      }, _defineProperty(_class2, "handlers", void 0), _defineProperty(_class2, "supportEvent", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/shop.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './resourceUtil.ts', './constant.ts', './poolManager.ts', './util.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './shopPage.ts', './gameLogic.ts', './LanguageData.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Label, Node, Prefab, Sprite, _decorator, Component, instantiate, Vec3, Button, Color, clientEvent, resourceUtil, constant, poolManager, util, localConfig, playerData, uiManager, shopPage, gameLogic, i18n;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      Node = module.Node;
      Prefab = module.Prefab;
      Sprite = module.Sprite;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      Button = module.Button;
      Color = module.Color;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      poolManager = module.poolManager;
    }, function (module) {
      util = module.util;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      shopPage = module.shopPage;
    }, function (module) {
      gameLogic = module.gameLogic;
    }, function (module) {
      i18n = module.i18n;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _temp;

      cclegacy._RF.push({}, "15effXNtKpGeLctODlTRqhl", "shop", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const MAX_PAGE_SIZE = 9; //一页最多9个

      let shop = exports('shop', (_dec = ccclass("shop"), _dec2 = property(Label), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(Label), _dec10 = property(Node), _dec11 = property(Node), _dec12 = property(Prefab), _dec13 = property(Sprite), _dec14 = property(Label), _dec(_class = (_class2 = (_temp = class shop extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "lbGold", _descriptor, this);

          _initializerDefineProperty(this, "nodeGet", _descriptor2, this);

          _initializerDefineProperty(this, "nodeGold", _descriptor3, this);

          _initializerDefineProperty(this, "nodeBuy", _descriptor4, this);

          _initializerDefineProperty(this, "nodeGo", _descriptor5, this);

          _initializerDefineProperty(this, "lbDesc", _descriptor6, this);

          _initializerDefineProperty(this, "lbPrice", _descriptor7, this);

          _initializerDefineProperty(this, "lbGo", _descriptor8, this);

          _initializerDefineProperty(this, "nodeCarParent", _descriptor9, this);

          _initializerDefineProperty(this, "nodePages", _descriptor10, this);

          _initializerDefineProperty(this, "pfPage", _descriptor11, this);

          _initializerDefineProperty(this, "spCarBlack", _descriptor12, this);

          _initializerDefineProperty(this, "lbPage", _descriptor13, this);

          _defineProperty(this, "currentPage", null);

          _defineProperty(this, "currentCar", null);

          _defineProperty(this, "carDegree", 0);

          _defineProperty(this, "rotateSpeed", 30);

          _defineProperty(this, "currentCarInfo", void 0);

          _defineProperty(this, "pageIndex", 0);

          _defineProperty(this, "maxPage", 0);

          _defineProperty(this, "currentCarID", 0);
        }

        start() {// Your initialization goes here.
        }

        onEnable() {
          clientEvent.on('updateGold', this.updateGold, this);
          clientEvent.on('onShopItemSelect', this.onShopItemSelect, this);
          clientEvent.on('updateBuyTask', this.updateButtons, this);
        }

        onDisable() {
          clientEvent.off('updateGold', this.updateGold, this);
          clientEvent.off('onShopItemSelect', this.onShopItemSelect, this);
          clientEvent.off('updateBuyTask', this.updateButtons, this);
        }

        show() {
          let cars = localConfig.instance.getCars();
          this.maxPage = Math.floor(cars.length / MAX_PAGE_SIZE);
          this.updateGold();
          this.showPage();
        }

        showPage() {
          if (!this.currentPage) {
            this.currentPage = instantiate(this.pfPage);
            this.currentPage.parent = this.nodePages;
            this.pageIndex = 0;
            this.refreshPageLabel();
            this.currentPage.getComponent(shopPage).setPage(this.pageIndex);
          }

          this.currentPage.getComponent(shopPage).show();
        }

        updateGold() {
          let gold = playerData.instance.playerInfo.gold || 0;
          this.lbGold.string = util.formatMoney(gold);
        }

        onBtnCloseClick() {
          uiManager.instance.hideDialog('shop/shop');
        }

        getCar() {
          // playerData.instance.buyCar(this.currentCarInfo.ID);
          gameLogic.buyCar(this.currentCarInfo.ID);
          let rewardInfo = {
            rewardType: constant.REWARD_TYPE.CAR,
            amount: 1,
            ID: this.currentCarInfo.ID
          };
          uiManager.instance.showDialog('common/showReward', [rewardInfo, false,
          /*i18n.t("showReward.buySuccessful")*/
          '购买成功', () => {
            //启用
            gameLogic.useCar(this.currentCarInfo.ID);
            this.currentPage.getComponent(shopPage).refreshUse(this.currentCarInfo.ID);
          }, null,
          /*i18n.t("showReward.confirm")*/
          '确认']);
        }

        onBtnGetClick() {
          let carID = this.currentCarInfo.ID;

          if (playerData.instance.hasCar(carID)) {
            // 点击换车按钮后才算换车成功
            playerData.instance.useCar(carID);
            clientEvent.dispatchEvent('updateCar'); // return;
          } else if (this.currentCarInfo.type === constant.BUY_CAR_TYPE.GOLD) {
            if (this.currentCarInfo.num > playerData.instance.playerInfo.gold) {
              //金币不足
              // return;
              uiManager.instance.showTips(
              /*i18n.t("shop.getGold")*/
              '获取金币', () => {});
              return;
            } //扣款


            gameLogic.addGold(-this.currentCarInfo.num); //获得车

            this.getCar();
          } else {
            let currentProgress = playerData.instance.getBuyTypeProgress(this.currentCarInfo.type);

            if (currentProgress >= this.currentCarInfo.num) {
              //可以获得了
              this.getCar();
            } else {
              //对应任务，对应界面
              switch (this.currentCarInfo.type) {
                case constant.BUY_CAR_TYPE.GAME:
                case constant.BUY_CAR_TYPE.LOGIN:
                case constant.BUY_CAR_TYPE.CONTINUOUS_LOGIN:
                case constant.BUY_CAR_TYPE.PASS_LEVEL:
                  this.onBtnCloseClick();
                  break;

                case constant.BUY_CAR_TYPE.SIGNIN:
                  this.onBtnCloseClick(); //显示签到界面

                  uiManager.instance.showDialog('signIn/signIn');
                  break;

                case constant.BUY_CAR_TYPE.SHARE:
                  gameLogic.openReward(constant.SHARE_FUNCTION.SHOP_SHARE, (err, type) => {});
                  break;

                case constant.BUY_CAR_TYPE.VIDEO:
                  gameLogic.openReward(constant.SHARE_FUNCTION.SHOP_VIDEO, (err, isOver) => {});
                  break;
              }
            }
          }
        }

        checkBtn() {}

        onBtnGoldClick() {
          gameLogic.openReward(constant.SHARE_FUNCTION.SHOP_VIDEO, err => {
            if (!err) {
              gameLogic.showFlyReward(constant.REWARD_TYPE.GOLD, () => {
                gameLogic.addGold(300);
                this.updateButtons();
              });
            }
          });
        }

        onShopItemSelect(carID, useCar) {
          let curPage = this.currentPage.getComponent(shopPage);
          curPage.unSelectAll();

          if (useCar) {
            curPage.unUseAll();
          }

          if (this.currentCar) {
            poolManager.instance.putNode(this.currentCar);
            this.currentCar = null;
          } //刷新界面展示


          this.currentCarInfo = localConfig.instance.queryByID('car', carID.toString());

          if (this.currentCarInfo.type === constant.BUY_CAR_TYPE.SHARE) {
            //分享审核的时候特殊处理
            this.currentCarInfo.type = constant.BUY_CAR_TYPE.GOLD;
            this.currentCarInfo.num = 2000;
          }

          if (playerData.instance.hasCar(carID)) {
            this.spCarBlack.node.active = false;
            resourceUtil.getUICar(this.currentCarInfo.model, (err, prefab) => {
              if (err) {
                console.error(err, this.currentCarInfo.model);
                return;
              }

              this.carDegree = 0;
              this.currentCar = poolManager.instance.getNode(prefab, this.nodeCarParent);
            });
          } else {
            this.spCarBlack.node.active = true;
            resourceUtil.setCarIcon(this.currentCarInfo.model, this.spCarBlack, true, () => {});
          }

          this.updateButtons();
        }

        update(deltaTime) {
          // Your update function goes here.
          //旋转展示车辆
          if (this.currentCar) {
            this.carDegree -= deltaTime * this.rotateSpeed;

            if (this.carDegree <= -360) {
              this.carDegree += 360;
            }

            this.currentCar.eulerAngles = new Vec3(0, this.carDegree, 0);
          }
        }

        updateButtons() {
          if (playerData.instance.hasCar(this.currentCarInfo.ID)) {
            //已拥有该车辆
            this.lbDesc.string = '';
            this.nodeGo.active = true;
            this.nodeBuy.active = false;
            this.lbGo.string =
            /*i18n.t('shop.acquired')*/
            '换车'; //TODO 引擎点击事件传递有问题，先开起来

            this.nodeGet.getComponent(Button).interactable = true; //即刻玩那边特殊处理，如果是分享则变成用金币获取
          } else if (this.currentCarInfo.type === constant.BUY_CAR_TYPE.GOLD) {
            this.lbDesc.string = '';
            this.lbPrice.string = this.currentCarInfo.num;

            if (playerData.instance.playerInfo.gold >= this.currentCarInfo.num) {
              this.lbPrice.color = Color.WHITE;
              this.nodeGet.getComponent(Button).interactable = true; // this.nodeGold.active = false;
            } else {
              this.lbPrice.color = Color.RED;
              this.nodeGet.getComponent(Button).interactable = true; // this.nodeGold.active = true;
            }

            this.nodeGo.active = false;
            this.nodeBuy.active = true;
          } else {
            this.nodeGet.getComponent(Button).interactable = true;
            this.nodeGo.active = true;
            this.nodeBuy.active = false;
            let num = playerData.instance.getBuyTypeProgress(this.currentCarInfo.type);

            if (num < this.currentCarInfo.num) {
              this.lbGo.string =
              /*i18n.t('shop.go')*/
              '前往商店';
            } else {
              this.lbGo.string =
              /*i18n.t('shop.receive')*/
              '获取';
            }

            let strDesc = i18n.t(`carTask.${this.currentCarInfo.show}`);

            if (this.currentCarInfo.type !== constant.BUY_CAR_TYPE.SIGNIN) {
              strDesc += `(${i18n.t("shop.current")}：${num}/${this.currentCarInfo.num})`;
            }

            this.lbDesc.string = strDesc;
          }
        }

        refreshPageLabel() {
          this.lbPage.string = `${this.pageIndex + 1}/${this.maxPage + 1}`;
        }

        onBtnLeftClick() {
          const shopPageScript = this.currentPage.getComponent(shopPage);

          if (this.pageIndex > 0) {
            this.pageIndex--;
          } else {
            this.pageIndex = this.maxPage;
          }

          this.refreshPageLabel();
          shopPageScript.setPage(this.pageIndex);
          shopPageScript.show();
        }

        onBtnRightClick() {
          const shopPageScript = this.currentPage.getComponent(shopPage);

          if (this.pageIndex >= this.maxPage) {
            this.pageIndex = 0;
          } else {
            this.pageIndex++;
          }

          this.refreshPageLabel();
          shopPageScript.setPage(this.pageIndex);
          shopPageScript.show();
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbGold", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodeGet", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeGold", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nodeBuy", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "nodeGo", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "lbDesc", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "lbPrice", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "lbGo", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "nodeCarParent", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "nodePages", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "pfPage", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "spCarBlack", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "lbPage", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/constant.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1ad87mpTDFDV7de0xMwTCq4", "constant", undefined);

      class constant {}

      exports('constant', constant);

      _defineProperty(constant, "GAME_NAME", 'car');

      _defineProperty(constant, "LOCAL_CACHE", {
        PLAYER: 'player',
        //玩家基础数据缓存，如金币砖石等信息，暂时由客户端存储，后续改由服务端管理
        SETTINGS: 'settings',
        //设置相关，所有杂项都丢里面进去
        DATA_VERSION: 'dataVersion',
        //数据版本
        ACCOUNT: 'account',
        //玩家账号
        // TMP_DATA: 'tmpData',             //临时数据，不会存储到云盘
        HISTORY: "history",
        //关卡通关数据
        BAG: "bag" //玩家背包，即道具列表，字典类型

      });

      _defineProperty(constant, "MAX_LEVEL", 20);

      _defineProperty(constant, "MIN_CAR_ID", 101);

      _defineProperty(constant, "MAX_CAR_ID", 109);

      _defineProperty(constant, "AUDIO_SOUND", {
        BACKGROUND: 'background',
        //背景音乐
        CRASH: "crash",
        //撞车
        GET_MONEY: "getMoney",
        //赚钱
        IN_CAR: "inCar",
        //上车
        NEW_ORDER: "newOrder",
        //新订单
        CAR_START: "carStart",
        //车辆启动
        WIN: "win",
        //胜利
        STOP: "stop",
        //刹车
        TOOTING1: "tooting1",
        //鸣笛声1
        TOOTING2: "tooting2" //鸣笛声2

      });

      _defineProperty(constant, "SIGNIN_REWARD_STATUS", {
        RECEIVED: 0,
        //已经领取的
        RECEIVABLE: 1,
        //可以领取的
        UNRECEIVABLE: 2,
        //已经领取的
        FILL_SIGNIN: 3,
        //补签的
        AFTER_FILL_SIGNIN: 4 //已经补签的

      });

      _defineProperty(constant, "MAX_SIGNIN_DAY", 7);

      _defineProperty(constant, "NORMAL_SHOW_TIME", 3);

      _defineProperty(constant, "NEWBEE_LEVEL", 2);

      _defineProperty(constant, "REWARD_TYPE", {
        DIAMOND: 1,
        //钻石
        GOLD: 2,
        //金币
        CAR: 3 //车辆

      });

      _defineProperty(constant, "ONLINE", {
        MAX_TIME: 60,
        //30分钟
        // MAX_TIME: 60,            //4个小时
        PROFIT_PER_SECOND: 0.3,
        //每秒收益
        TIME_PER_CIRCLE: 10 //转一圈所需时间

      });

      _defineProperty(constant, "SHARE_FUNCTION", {
        BALANCE: 'balance',
        //结算分享 
        RELIVE: 'relive',
        //复活
        OFFLINE: 'offline',
        //离线奖励
        RANK: 'rank',
        //排行榜
        LOTTERY: 'lottery',
        //抽奖
        LOTTERY_REWARD: 'lotteryReward',
        //抽奖奖励，用于双倍分享
        TRIAL: 'trial',
        //试用
        CLICK_BOX: 'clickBox',
        //点开宝箱
        ONLINE: 'online',
        //在线奖励
        SIGNIN: 'signIn',
        //签到
        FILL_SIGNIN: 'fillSignIn',
        //补签
        INVINCIBLE: 'invincible',
        //无敌
        SHOP_SHARE: 'shopShare',
        //商店里头的分享触发的
        SHOP_VIDEO: 'shopVideo' //商店里头的视频触发的

      });

      _defineProperty(constant, "INITIAL_CAR", 1);

      _defineProperty(constant, "BUY_CAR_TYPE", {
        GOLD: 1,
        //金币 
        LOGIN: 2,
        //2登录
        CONTINUOUS_LOGIN: 3,
        //3连续登录 
        SHARE: 4,
        //4分享
        VIDEO: 5,
        //5看视频
        GAME: 6,
        //6进行游戏
        INVITE: 7,
        //7邀请好友
        SIGNIN: 8,
        //8签到
        PASS_LEVEL: 9 //9通关获得

      });

      _defineProperty(constant, "OPEN_REWARD_TYPE", {
        AD: 0,
        SHARE: 1,
        NULL: 2
      });

      _defineProperty(constant, "GOLD_REWARD", {
        SECOND: 500,
        //第二天
        SEVENT: 500 //第七天

      });

      _defineProperty(constant, "LOTTERY", {
        MONEY: 2000,
        //1000块钱抽1次
        EXCHANGE: 500 //抽到已有的车自动转换成钱数

      });

      _defineProperty(constant, "CUSTOMER_MAX_CNT", 2);

      _defineProperty(constant, "MENU_INIT_BOTTOM", 40);

      _defineProperty(constant, "MENU_BOTTOM", 250);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/polyglot.min.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('polyglot', polyglot);

      cclegacy._RF.push({}, "26839JcVWpGabE9xA7/uWJw", "polyglot.min", undefined);

      var forEach = function (arr, fn, target) {
        // var arr = Array.isArray(arguments[0]) ? arguments[0] : new Array;
        arr = arguments[0];
        fn = typeof arguments[1] === 'function' ? arguments[1] : new Function();

        if (Array.isArray(arr)) {
          arr.forEach((item, idx, array) => {
            fn(item, idx);
          });
        } else {
          for (const key in arr) {
            if (arr.hasOwnProperty(key)) {
              const element = arr[key];
              fn(element, key);
            }
          }
        }
      };

      var warning = function (message) {
        console.warn(message);
      };

      var has = function (obj, key) {
        return obj.hasOwnProperty(key);
      };

      function trim(x) {
        return x.replace(/^\s+|\s+$/gm, '');
      }

      var warn = function warn(message) {
        warning(message);
      };

      var replace = String.prototype.replace;
      var split = String.prototype.split; // #### Pluralization methods
      // The string that separates the different phrase possibilities.

      var delimiter = '||||';

      var russianPluralGroups = function (n) {
        var lastTwo = n % 100;
        var end = lastTwo % 10;

        if (lastTwo !== 11 && end === 1) {
          return 0;
        }

        if (2 <= end && end <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) {
          return 1;
        }

        return 2;
      };

      var defaultPluralRules = {
        // Mapping from pluralization group plural logic.
        pluralTypes: {
          arabic: function (n) {
            // http://www.arabeyes.org/Plural_Forms
            if (n < 3) {
              return n;
            }

            var lastTwo = n % 100;
            if (lastTwo >= 3 && lastTwo <= 10) return 3;
            return lastTwo >= 11 ? 4 : 5;
          },
          bosnian_serbian: russianPluralGroups,
          chinese: function () {
            return 0;
          },
          croatian: russianPluralGroups,
          french: function (n) {
            return n > 1 ? 1 : 0;
          },
          german: function (n) {
            return n !== 1 ? 1 : 0;
          },
          russian: russianPluralGroups,
          lithuanian: function (n) {
            if (n % 10 === 1 && n % 100 !== 11) {
              return 0;
            }

            return n % 10 >= 2 && n % 10 <= 9 && (n % 100 < 11 || n % 100 > 19) ? 1 : 2;
          },
          czech: function (n) {
            if (n === 1) {
              return 0;
            }

            return n >= 2 && n <= 4 ? 1 : 2;
          },
          polish: function (n) {
            if (n === 1) {
              return 0;
            }

            var end = n % 10;
            return 2 <= end && end <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
          },
          icelandic: function (n) {
            return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
          },
          slovenian: function (n) {
            var lastTwo = n % 100;

            if (lastTwo === 1) {
              return 0;
            }

            if (lastTwo === 2) {
              return 1;
            }

            if (lastTwo === 3 || lastTwo === 4) {
              return 2;
            }

            return 3;
          }
        },
        // Mapping from pluralization group to individual language codes/locales.
        // Will look up based on exact match, if not found and it's a locale will parse the locale
        // for language code, and if that does not exist will default to 'en'
        pluralTypeToLanguages: {
          arabic: ['ar'],
          bosnian_serbian: ['bs-Latn-BA', 'bs-Cyrl-BA', 'srl-RS', 'sr-RS'],
          chinese: ['id', 'id-ID', 'ja', 'ko', 'ko-KR', 'lo', 'ms', 'th', 'th-TH', 'zh'],
          croatian: ['hr', 'hr-HR'],
          german: ['fa', 'da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hi-IN', 'hu', 'hu-HU', 'it', 'nl', 'no', 'pt', 'sv', 'tr'],
          french: ['fr', 'tl', 'pt-br'],
          russian: ['ru', 'ru-RU'],
          lithuanian: ['lt'],
          czech: ['cs', 'cs-CZ', 'sk'],
          polish: ['pl'],
          icelandic: ['is'],
          slovenian: ['sl-SL']
        }
      };

      function langToTypeMap(mapping) {
        var ret = {};
        forEach(mapping, function (langs, type) {
          forEach(langs, function (lang) {
            ret[lang] = type;
          }, this);
        }, this);
        return ret;
      }

      function pluralTypeName(pluralRules, locale) {
        var langToPluralType = langToTypeMap(pluralRules.pluralTypeToLanguages); //@ts-ignore

        return langToPluralType[locale] || langToPluralType[split.call(locale, /-/, 1)[0]] || langToPluralType.en;
      }

      function pluralTypeIndex(pluralRules, locale, count) {
        return pluralRules.pluralTypes[pluralTypeName(pluralRules, locale)](count);
      }

      function escape(token) {
        return token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      function constructTokenRegex(opts) {
        var prefix = opts && opts.prefix || '%{';
        var suffix = opts && opts.suffix || '}';

        if (prefix === delimiter || suffix === delimiter) {
          throw new RangeError('"' + delimiter + '" token is reserved for pluralization');
        }

        return new RegExp(escape(prefix) + '(.*?)' + escape(suffix), 'g');
      }

      var defaultTokenRegex = /%\{(.*?)\}/g; // ### transformPhrase(phrase, substitutions, locale)
      //
      // Takes a phrase string and transforms it by choosing the correct
      // plural form and interpolating it.
      //
      //     transformPhrase('Hello, %{name}!', {name: 'Spike'});
      //     // "Hello, Spike!"
      //
      // The correct plural form is selected if substitutions.smart_count
      // is set. You can pass in a number instead of an Object as `substitutions`
      // as a shortcut for `smart_count`.
      //
      //     transformPhrase('%{smart_count} new messages |||| 1 new message', {smart_count: 1}, 'en');
      //     // "1 new message"
      //
      //     transformPhrase('%{smart_count} new messages |||| 1 new message', {smart_count: 2}, 'en');
      //     // "2 new messages"
      //
      //     transformPhrase('%{smart_count} new messages |||| 1 new message', 5, 'en');
      //     // "5 new messages"
      //
      // You should pass in a third argument, the locale, to specify the correct plural type.
      // It defaults to `'en'` with 2 plural forms.

      function transformPhrase(phrase, substitutions, locale, tokenRegex, pluralRules) {
        if (typeof phrase !== 'string') {
          throw new TypeError('Polyglot.transformPhrase expects argument #1 to be string');
        }

        if (substitutions == null) {
          return phrase;
        }

        var result = phrase;
        var interpolationRegex = tokenRegex || defaultTokenRegex;
        var pluralRulesOrDefault = pluralRules || defaultPluralRules; // allow number as a pluralization shortcut

        var options = typeof substitutions === 'number' ? {
          smart_count: substitutions
        } : substitutions; // Select plural form: based on a phrase text that contains `n`
        // plural forms separated by `delimiter`, a `locale`, and a `substitutions.smart_count`,
        // choose the correct plural form. This is only done if `count` is set.

        if (options.smart_count != null && result) {
          var texts = split.call(result, delimiter);
          result = trim(texts[pluralTypeIndex(pluralRulesOrDefault, locale || 'en', options.smart_count)] || texts[0]);
        } // Interpolate: Creates a `RegExp` object for each interpolation placeholder.


        result = replace.call(result, interpolationRegex, function (expression, argument) {
          if (!has(options, argument) || options[argument] == null) {
            return expression;
          }

          return options[argument];
        });
        return result;
      } // ### Polyglot class constructor


      class Polyglot {
        static transformPhrase(phrase, substitutions, locale) {
          //@ts-ignore
          return transformPhrase(phrase, substitutions, locale);
        }

        constructor(options) {
          _defineProperty(this, "phrases", {});

          _defineProperty(this, "pluralRules", {});

          _defineProperty(this, "currentLocale", '');

          _defineProperty(this, "onMissingKey", null);

          _defineProperty(this, "warn", null);

          _defineProperty(this, "tokenRegex", void 0);

          var opts = options || {};
          this.extend(opts.phrases || {});
          this.currentLocale = opts.locale || 'en';
          var allowMissing = opts.allowMissing ? transformPhrase : null;
          this.onMissingKey = typeof opts.onMissingKey === 'function' ? opts.onMissingKey : allowMissing;
          this.warn = opts.warn || warn;
          this.tokenRegex = constructTokenRegex(opts.interpolation);
          this.pluralRules = opts.pluralRules || defaultPluralRules;
        } // ### polyglot.has(key)
        //
        // Check if polyglot has a translation for given key


        has(key) {
          return has(this.phrases, key);
        } // ### polyglot.t(key, options)
        //
        // The most-used method. Provide a key, and `t` will return the
        // phrase.
        //
        //     polyglot.t("hello");
        //     => "Hello"
        //
        // The phrase value is provided first by a call to `polyglot.extend()` or
        // `polyglot.replace()`.
        //
        // Pass in an object as the second argument to perform interpolation.
        //
        //     polyglot.t("hello_name", {name: "Spike"});
        //     => "Hello, Spike"
        //
        // If you like, you can provide a default value in case the phrase is missing.
        // Use the special option key "_" to specify a default.
        //
        //     polyglot.t("i_like_to_write_in_language", {
        //       _: "I like to write in %{language}.",
        //       language: "JavaScript"
        //     });
        //     => "I like to write in JavaScript."
        //


        t(key, options) {
          var phrase, result;
          var opts = options == null ? {} : options;

          if (typeof this.phrases[key] === 'string') {
            phrase = this.phrases[key];
          } else if (typeof opts._ === 'string') {
            phrase = opts._;
          } else if (this.onMissingKey) {
            var onMissingKey = this.onMissingKey;
            result = onMissingKey(key, opts, this.currentLocale, this.tokenRegex, this.pluralRules);
          } else {
            this.warn('Missing translation for key: "' + key + '"');
            result = key;
          }

          if (typeof phrase === 'string') {
            result = transformPhrase(phrase, opts, this.currentLocale, this.tokenRegex, this.pluralRules);
          }

          return result;
        } // ### polyglot.replace(phrases)
        //
        // Completely replace the existing phrases with a new set of phrases.
        // Normally, just use `extend` to add more phrases, but under certain
        // circumstances, you may want to make sure no old phrases are lying around.


        replace(newPhrases) {
          this.clear();
          this.extend(newPhrases);
        } // ### polyglot.clear()
        //
        // Clears all phrases. Useful for special cases, such as freeing
        // up memory if you have lots of phrases but no longer need to
        // perform any translation. Also used internally by `replace`.


        clear() {
          this.phrases = {};
        } // ### polyglot.locale([locale])
        //
        // Get or set locale. Internally, Polyglot only uses locale for pluralization.


        locale(newLocale) {
          if (newLocale) this.currentLocale = newLocale;
          return this.currentLocale;
        } // ### polyglot.extend(phrases)
        //
        // Use `extend` to tell Polyglot how to translate a given key.
        //
        //     polyglot.extend({
        //       "hello": "Hello",
        //       "hello_name": "Hello, %{name}"
        //     });
        //
        // The key can be any string.  Feel free to call `extend` multiple times;
        // it will override any phrases with the same key, but leave existing phrases
        // untouched.
        //
        // It is also possible to pass nested phrase objects, which get flattened
        // into an object with the nested keys concatenated using dot notation.
        //
        //     polyglot.extend({
        //       "nav": {
        //         "hello": "Hello",
        //         "hello_name": "Hello, %{name}",
        //         "sidebar": {
        //           "welcome": "Welcome"
        //         }
        //       }
        //     });
        //
        //     console.log(polyglot.phrases);
        //     // {
        //     //   'nav.hello': 'Hello',
        //     //   'nav.hello_name': 'Hello, %{name}',
        //     //   'nav.sidebar.welcome': 'Welcome'
        //     // }
        //
        // `extend` accepts an optional second argument, `prefix`, which can be used
        // to prefix every key in the phrases object with some string, using dot
        // notation.
        //
        //     polyglot.extend({
        //       "hello": "Hello",
        //       "hello_name": "Hello, %{name}"
        //     }, "nav");
        //
        //     console.log(polyglot.phrases);
        //     // {
        //     //   'nav.hello': 'Hello',
        //     //   'nav.hello_name': 'Hello, %{name}'
        //     // }
        //
        // This feature is used internally to support nested phrase objects.


        extend(morePhrases, prefix) {
          var _this = this;

          forEach(morePhrases, function (phrase, key) {
            var prefixedKey = prefix ? prefix + '.' + key : key;

            if (typeof phrase === 'object') {
              _this.extend(phrase, prefixedKey);
            } else {
              _this.phrases[prefixedKey] = phrase;
            }
          }, this);
        } // ### polyglot.unset(phrases)
        // Use `unset` to selectively remove keys from a polyglot instance.
        //
        //     polyglot.unset("some_key");
        //     polyglot.unset({
        //       "hello": "Hello",
        //       "hello_name": "Hello, %{name}"
        //     });
        //
        // The unset method can take either a string (for the key), or an object hash with
        // the keys that you would like to unset.


        unset(morePhrases, prefix) {
          if (typeof morePhrases === 'string') {
            delete this.phrases[morePhrases];
          } else {
            forEach(morePhrases, function (phrase, key) {
              var prefixedKey = prefix ? prefix + '.' + key : key;

              if (typeof phrase === 'object') {
                this.unset(phrase, prefixedKey);
              } else {
                delete this.phrases[prefixedKey];
              }
            }, this);
          }
        }

      }

      exports('Polyglot', Polyglot);

      function polyglot(options) {
        return new Polyglot(options);
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightMap.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './fightConstants.ts', './clientEvent.ts', './resourceUtil.ts', './poolManager.ts', './roadPoint.ts', './LanguageData.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, _decorator, Component, Vec3, fightConstants, clientEvent, resourceUtil, poolManager, roadPoint, i18n;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
    }, function (module) {
      fightConstants = module.fightConstants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      poolManager = module.poolManager;
    }, function (module) {
      roadPoint = module.roadPoint;
    }, function (module) {
      i18n = module.i18n;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "273adkVLRhECoDje+nCdBuE", "fightMap", undefined);

      const {
        ccclass,
        property
      } = _decorator; // import {writeFile} from 'fs';

      let fightMap = exports('fightMap', (_dec = ccclass("fightMap"), _dec2 = property({
        type: Node,
        displayName: "各路线起点"
      }), _dec(_class = (_class2 = (_temp = class fightMap extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "path", _descriptor, this);

          _defineProperty(this, "_progressListener", undefined);

          _defineProperty(this, "_completeListener", undefined);

          _defineProperty(this, "curProgress", 0);

          _defineProperty(this, "maxProgress", 0);

          _defineProperty(this, "levelProgressCnt", 0);
        } //关卡总进度
        //构建地图


        buildMap(jsonInfo, progressCb, completeCb) {
          this._progressListener = progressCb;
          this._completeListener = completeCb;
          this.objMap = jsonInfo; //构建地面

          this.curProgress = 0;
          this.maxProgress = 6;
          this.buildModel('plane');
          this.buildModel('road');
          this.buildModel('tree');
          this.buildModel('house');
          this.buildModel('sign');
          this.buildPath();
        }

        buildModel(type) {
          if (!this.objMap.hasOwnProperty(type)) {
            //继续
            this.triggerFinished(type);
            return;
          } //搜索所需资源


          let arrName = [];
          let objPlane = this.objMap[type];

          for (let idx = 0; idx < objPlane.children.length; idx++) {
            let name = objPlane.children[idx].name;

            if (arrName.indexOf(name) === -1) {
              arrName.push(name);
            }
          }

          let dictPrefab = {};
          resourceUtil.getMapObjs(type, arrName, () => {}, (err, arrPrefabs) => {
            if (err) {
              console.error(err);
              return;
            }

            for (let idx = 0; idx < arrPrefabs.length; idx++) {
              let prefab = arrPrefabs[idx];
              dictPrefab[prefab.data.name] = prefab;
            } //开始创建
            //先创建父节点


            let nodeParent = new Node(type);
            nodeParent.parent = this.node;
            nodeParent.setPosition(new Vec3(objPlane.pX, objPlane.pY, objPlane.pZ)); //开始创建子节点

            for (let idx = 0; idx < objPlane.children.length; idx++) {
              let child = objPlane.children[idx];
              let prefab = dictPrefab[child.name];
              let node = poolManager.instance.getNode(prefab, nodeParent);
              node.setPosition(child.pX, child.pY, child.pZ);
              node.eulerAngles = new Vec3(child.rX, child.rY, child.rZ);
              node.setScale(child.sX, child.sY, child.sZ);
            }

            this.triggerFinished(type);
          });
        }

        buildPath() {
          if (!this.objMap.hasOwnProperty('path')) {
            //继续
            return;
          }

          this.path = [];
          this.levelProgressCnt = 0;
          let objPathRoot = this.objMap.path;
          let nodePathRoot = new Node('path');
          nodePathRoot.parent = this.node;
          nodePathRoot.setPosition(objPathRoot.pX, objPathRoot.pY, objPathRoot.pZ); //开始创建各条路径

          for (let idx = 0; idx < objPathRoot.children.length; idx++) {
            let objPath = objPathRoot.children[idx];
            let nodePath = new Node(objPath.name);
            nodePath.parent = nodePathRoot;
            nodePath.setPosition(objPath.pX, objPath.pY, objPath.pZ); //开始递归创建路径

            let start = this.createRoadPoint(objPath.path, nodePath);

            if (start) {
              this.path.push(start);
            }
          }

          this.triggerFinished('path');
        }

        createRoadPoint(objPoint, parent) {
          if (!objPoint) {
            return null;
          }

          let nodeRoadPoint = new Node(objPoint.name);
          nodeRoadPoint.parent = parent;
          nodeRoadPoint.setPosition(objPoint.pX, objPoint.pY, objPoint.pZ);
          nodeRoadPoint.setScale(objPoint.sX, objPoint.sY, objPoint.sZ);
          nodeRoadPoint.eulerAngles = new Vec3(objPoint.rX, objPoint.rY, objPoint.rZ);
          let point = nodeRoadPoint.addComponent(roadPoint);
          point.type = objPoint.type;
          point.moveType = objPoint.moveType;
          point.clockwise = objPoint.clockwise;
          point.direction = objPoint.direction;
          point.delayTime = objPoint.delayTime;
          point.genInterval = objPoint.genInterval;
          point.carSpeed = objPoint.carSpeed;
          point.cars = objPoint.cars;

          if (point.type === fightConstants.ROAD_POINT_TYPE.PLATFORM) {
            this.levelProgressCnt++;
          }

          if (objPoint.next) {
            point.next = this.createRoadPoint(objPoint.next, parent);
          }

          return nodeRoadPoint;
        }

        triggerFinished(type) {
          console.log(`build ${type} finished!`);
          let tips = '';

          switch (type) {
            case 'plane':
              tips = i18n.t('fightMap.trimTheGround');
              break;

            case 'road':
              tips = i18n.t('fightMap.pavingTheRoad');
              break;

            case 'tree':
              tips = i18n.t('fightMap.plantingTree');
              break;

            case 'house':
              tips = i18n.t('fightMap.decorateHouse');
              break;

            case 'sign':
              tips = i18n.t('fightMap.paintLandmarks');
              break;
          }

          if (tips) {
            clientEvent.dispatchEvent('updateLoading', 10, tips);
          }

          this.curProgress++;

          if (this._progressListener) {
            this._progressListener(this.curProgress, this.maxProgress);
          }

          if (this.curProgress >= this.maxProgress && this._completeListener) {
            this._completeListener();
          }
        }

        recycle() {
          console.log('recycle map elements...');
          this.recycleModel('plane');
          this.recycleModel('road');
          this.recycleModel('tree');
          this.recycleModel('house');
          this.recycleModel('sign'); //路径属于空节点挂脚本，直接做清除操作

          this.node.removeAllChildren();
        }

        recycleModel(type) {
          let nodeParent = this.node.getChildByName(type);

          if (!nodeParent) {
            return;
          }

          for (let idx = 0; idx < nodeParent.children.length; idx++) {
            let child = nodeParent.children[idx];
            poolManager.instance.putNode(child);
          }
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "path", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LocalizedSprite.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './SpriteFrameSet.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator, Component, Sprite, error, SpriteFrameSet;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Sprite = module.Sprite;
      error = module.error;
    }, function (module) {
      SpriteFrameSet = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _class3, _temp;

      cclegacy._RF.push({}, "28bd9xEMv1GKLbTuAi4B4dI", "LocalizedSprite", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let LocalizedSprite = exports('default', (_dec = ccclass("LocalizedSprite"), _dec2 = property({
        type: [SpriteFrameSet],
        displayOrder: 1
      }), _dec(_class = (_class2 = (_temp = _class3 = class LocalizedSprite extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "sprite", null);

          _initializerDefineProperty(this, "spriteFrameSet", _descriptor, this);
        }

        onLoad() {
          this.fetchRender();
        }

        fetchRender() {
          let sprite = this.getComponent(Sprite);

          if (sprite) {
            this.sprite = sprite;
            this.updateSprite(window.i18nConfig.curLang);
            return;
          }
        }

        getSpriteFrameByLang(lang) {
          for (let i = 0; i < this.spriteFrameSet.length; ++i) {
            if (this.spriteFrameSet[i].language === lang) {
              return this.spriteFrameSet[i].spriteFrame;
            }
          }
        }

        updateSprite(language) {
          if (!this.sprite) {
            error('Failed to update localized sprite, sprite component is invalid!');
            return;
          }

          let spriteFrame = this.getSpriteFrameByLang(language);

          if (!spriteFrame && this.spriteFrameSet[0]) {
            spriteFrame = this.spriteFrameSet[0].spriteFrame;
          }

          if (spriteFrame) {
            this.sprite.spriteFrame = spriteFrame;
          }
        }

      }, _defineProperty(_class3, "editor", {
        executeInEditMode: true,
        inspector: 'packages://i18n/inspector/localized-sprite.js',
        menu: 'i18n/LocalizedSprite'
      }), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "spriteFrameSet", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/shopItem.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './resourceUtil.ts', './poolManager.ts', './playerData.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, Sprite, _decorator, Component, clientEvent, resourceUtil, poolManager, playerData;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Sprite = module.Sprite;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      poolManager = module.poolManager;
    }, function (module) {
      playerData = module.playerData;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "2b1f3615PZNnqYSDTVo5tI8", "shopItem", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let shopItem = exports('shopItem', (_dec = ccclass("shopItem"), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Sprite), _dec(_class = (_class2 = (_temp = class shopItem extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "nodeSelect", _descriptor, this);

          _initializerDefineProperty(this, "nodeUsed", _descriptor2, this);

          _initializerDefineProperty(this, "nodeRedDot", _descriptor3, this);

          _initializerDefineProperty(this, "spCarIcon", _descriptor4, this);

          _defineProperty(this, "currentCar", null);

          _defineProperty(this, "carInfo", {
            ID: 0,
            type: 0,
            num: 0,
            model: ''
          });
        }

        start() {// Your initialization goes here.
        }

        onEnable() {
          clientEvent.on('buyCar', this.refreshCarIcon, this);
          clientEvent.on('updateBuyTask', this.updateBuyTask, this);
        }

        onDisable() {
          clientEvent.off('buyCar', this.refreshCarIcon, this);
          clientEvent.off('updateBuyTask', this.updateBuyTask, this);
        }

        refreshCarIcon() {
          if (!this.carInfo) {
            return;
          }

          resourceUtil.setCarIcon(this.carInfo.model, this.spCarIcon, !playerData.instance.hasCar(this.carInfo.ID), () => {});
          this.updateBuyTask();
        }

        updateBuyTask() {
          if (!playerData.instance.hasCar(this.carInfo.ID)) {
            let curProgress = playerData.instance.getBuyTypeProgress(this.carInfo.type);
            this.nodeRedDot.active = curProgress >= this.carInfo.num;
          } else {
            this.nodeRedDot.active = false;
          }
        }

        show(carInfo) {
          this.carInfo = carInfo;
          this.select = false;
          this.nodeUsed.active = false;

          if (this.currentCar) {
            poolManager.instance.putNode(this.currentCar);
            this.currentCar = null;
          }

          if (!carInfo) {
            //空目录
            this.spCarIcon.node.active = false;
            return;
          }

          this.spCarIcon.node.active = true;
          this.refreshCarIcon();

          if (this.carInfo.ID === playerData.instance.getCurrentCar()) {
            this.scheduleOnce(() => {
              //选中一下
              this.onItemClick(false);
            }, 0);
          }
        }

        set select(value) {
          this.nodeSelect.active = value;
        }

        get select() {
          return this.nodeSelect.active;
        }

        set used(value) {
          this.nodeUsed.active = value;
        }

        get used() {
          return this.nodeUsed.active;
        }

        onItemClick(isShowIntertitial = true) {
          if (!this.carInfo) {
            return;
          }

          let hasCar = playerData.instance.hasCar(this.carInfo.ID);
          clientEvent.dispatchEvent('onShopItemSelect', this.carInfo.ID, hasCar);
          this.select = true;

          if (hasCar) {
            this.used = true; // 改成点击换车按钮才换车
            // playerData.instance.useCar(this.carInfo.ID);
            // clientEvent.dispatchEvent('updateCar');
          }
        }

        updateUseState() {
          this.used = this.carInfo.ID === playerData.instance.getCurrentCar();
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nodeSelect", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodeUsed", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeRedDot", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "spCarIcon", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/online.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './constant.ts', './util.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Sprite, Label, _decorator, Component, clientEvent, constant, util, playerData, uiManager, gameLogic;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Sprite = module.Sprite;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      util = module.util;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      gameLogic = module.gameLogic;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "349acC5lWBNyZL7loxYm/uD", "online", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let online = exports('online', (_dec = ccclass("online"), _dec2 = property(Sprite), _dec3 = property(Sprite), _dec4 = property(Label), _dec(_class = (_class2 = (_temp = class online extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "spTimeProgress", _descriptor, this);

          _initializerDefineProperty(this, "perTimeProgress", _descriptor2, this);

          _initializerDefineProperty(this, "lbGold", _descriptor3, this);

          _defineProperty(this, "currentTime", 0);

          _defineProperty(this, "isOverflow", false);

          _defineProperty(this, "currentGold", 0);
        }

        start() {// Your initialization goes here.
        }

        onEnable() {
          //触发界面刷新
          this.refresh();
        }

        refresh() {
          //每圈计时
          this.currentTime = 0;
          this.perTimeProgress.fillRange = 0;
          let lastTime = playerData.instance.getLastOnlineRewardTime();
          let offsetTime = Math.floor((playerData.instance.getCurrentTime() - lastTime) / 1000);
          offsetTime = offsetTime > 0 ? offsetTime : 0;
          offsetTime = offsetTime < constant.ONLINE.MAX_TIME ? offsetTime : constant.ONLINE.MAX_TIME;
          this.isOverflow = offsetTime === constant.ONLINE.MAX_TIME; //设置当前收益

          this.currentGold = Math.floor(offsetTime * constant.ONLINE.PROFIT_PER_SECOND);
          this.lbGold.string = util.formatMoney(this.currentGold); //进度条

          let percent = offsetTime / constant.ONLINE.MAX_TIME;
          percent = percent > 1 ? 1 : percent;
          this.spTimeProgress.fillRange = percent;
        }

        clear() {
          this.currentGold = 0;
          this.lbGold.string = '0';
          this.spTimeProgress.fillRange = 0;
          playerData.instance.updateLastOnlineRewardTime(this.currentTime);
          this.isOverflow = false;
        }

        onBtnOnlineClick() {
          if (this.currentGold <= 0) {
            return;
          }

          let pro = this.spTimeProgress.fillRange; //如果超过了50%要问是否要双倍，否则直接领取

          if (pro >= 0.5) {
            //显示弹窗
            uiManager.instance.showDialog('main/onlineDouble', [this.currentGold, () => {
              this.clear();
            }]);
          } else {
            // gameLogic.addGold(this.currentGold);
            playerData.instance.updatePlayerInfo('gold', this.currentGold); //播放特效
            //....

            gameLogic.showFlyReward(constant.REWARD_TYPE.GOLD, () => {
              clientEvent.dispatchEvent('updateGold');
            });
            this.clear();
          }
        }

        update(deltaTime) {
          // Your update function goes here.
          if (!this.isOverflow) {
            this.currentTime += deltaTime;

            if (this.currentTime > constant.ONLINE.TIME_PER_CIRCLE) {
              this.refresh();
            } else {
              let progress = this.currentTime / constant.ONLINE.TIME_PER_CIRCLE;
              this.perTimeProgress.fillRange = progress;
            }
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spTimeProgress", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "perTimeProgress", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbGold", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/shopPage.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './localConfig.ts', './shopItem.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Prefab, _decorator, Component, instantiate, localConfig, shopItem;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      shopItem = module.shopItem;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "35980PVGZdO6o5scEE8kciy", "shopPage", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const MAX_PAGE_SIZE = 9; //一页最多9个

      let shopPage = exports('shopPage', (_dec = ccclass("shopPage"), _dec2 = property(Prefab), _dec(_class = (_class2 = (_temp = class shopPage extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "pfShopItem", _descriptor, this);

          _defineProperty(this, "page", 0);
        } // objShopItems: any = {};


        start() {// Your initialization goes here.
        }

        setPage(iPage) {
          this.page = iPage;
        }

        show() {
          let arrCars = localConfig.instance.getCars();
          let start = this.page * MAX_PAGE_SIZE;
          let end = (this.page + 1) * MAX_PAGE_SIZE;
          let idxCnt = 0;

          for (let idx = start; idx < end; idx++, idxCnt++) {
            let item = null;

            if (idxCnt < this.node.children.length) {
              item = this.node.children[idxCnt];
            } else {
              item = instantiate(this.pfShopItem);
              item.parent = this.node;
            }

            item.getComponent(shopItem).show(arrCars[idx]);
          }
        }

        unSelectAll() {
          this.node.children.forEach(nodeItem => {
            nodeItem.getComponent(shopItem).select = false;
          });
        }

        unUseAll() {
          this.node.children.forEach(nodeItem => {
            nodeItem.getComponent(shopItem).used = false;
          });
        }

        refreshUse(carId) {
          this.node.children.forEach(nodeItem => {
            let item = nodeItem.getComponent(shopItem);

            if (item.carInfo.ID === carId) {
              item.onItemClick();
            }
          });
        }

      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "pfShopItem", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/zh.ts", ['cc'], function () {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3c2acsRBE9KO4h4sGTiBlRL", "zh", undefined);

      if (!window.i18nConfig) window.i18nConfig = {};
      if (!window.i18nConfig.languages) window.i18nConfig.languages = {};
      window.i18nConfig.languages.zh = {
        // write your key value pairs here
        //注意是改那些需要展示给用户看的
        // "start": {
        //     "startGame": "开始游戏"
        // },
        // "main": {
        //     "%{value}/s": "%{value}/每秒",
        //     "free": "免费"
        // },
        // "signReward": {
        //     "你已经连续签到%{value}天，继续保持": "你已经连续签到 %{value} 天，继续保持",
        //     "diamondsNum": "钻石数量x2",
        // },
        // "button": {
        //     "normalReceive": "<u><color=#ffffff>普通领取</color></u>",
        //     "receive": "领取",
        //     "directCollection": "<u><color=#ffffff>直接领取</color></u>",
        //     "doubleReceive": "双倍领取",
        //     "noUpdate": "<u><color=#ffffff>不升级</color></u>",
        //     "giveUpReward": "<u><color=#ffffff>放弃奖励</color></u>"
        // },
        "main": {
          "dataLoading": "数据加载中...",
          "dataLoadOver": "数据加载完成...",
          "loginSuccess": "登录成功...",
          "gameResourceLoading": "游戏资源加载中...",
          "audioResourceLoading": "音效资源加载中...",
          "mappingResourceLoading": "贴图资源加载中...",
          "modelResourceLoading": "模型资源加载中...",
          "entering": "正在进入..."
        },
        "mainUI": {
          "start": "点击屏幕开始",
          "changeCar": "换车"
        },
        "shop": {
          "btnClose": "关闭",
          "go": "前往",
          "acquired": "已获得",
          "current": "当前",
          "receive": "领取",
          "getGold": "看广告可获取金币"
        },
        "balance": {
          "你完成了%{value}个订单": "你完成了%{value}个订单",
          "youEarnedIt": "你赚到了",
          "clickReceive": "点击领取",
          "receiveImmediately": "立即领取"
        },
        "carTask": {
          "初始车辆": "初始车辆",
          "分享获得": "分享获得",
          "签到获得": "签到获得",
          "通过关卡获得": "通过关卡获得"
        },
        "signin": {
          "title": "七日登录",
          "notYet": "暂不领取",
          "normalReceive": "普通领取",
          "receive": "领取",
          "doubleReceive": "双倍领取",
          "fillSignin": "补签"
        },
        "fightManager": {
          "loadingMap": "正在加载地图...",
          "buildingCity": "开始建造城市...",
          "cityLoadOver": "城市加载完毕..."
        },
        "fightMap": {
          "trimTheGround": "正在修整地面...",
          "pavingTheRoad": "正在铺路中...",
          "plantingTree": "正在栽树中...",
          "decorateHouse": "正在装修房屋中...",
          "paintLandmarks": "正在粉刷地标中..."
        },
        "online": {
          "close": "关闭",
          "clickReceive": "点击领取",
          "dailyIncome": "日常收益可领取"
        },
        "lottery": {
          "title": "幸运大转盘",
          "free": "免费"
        },
        "talk": {
          "你好,请到街对面接我.": "你好,请到街对面接我.",
          "停车!停车!": "停车!停车!",
          "去消费最高的地方.": "去消费最高的地方.",
          "去附近的希尔顿酒店.": "去附近的希尔顿酒店.",
          "司机快来!我老婆要生了!": "司机快来!我老婆要生了!",
          "大哥快点,我赶时间.": "大哥快点,我赶时间.",
          "师傅,5分钟内能到吗?": "师傅,5分钟内能到吗?",
          "师傅,你是老司机嘛?": "师傅,你是老司机嘛?",
          "师傅,你跑一天能赚多少?": "师傅,你跑一天能赚多少?",
          "师傅快点,我要赶飞机.": "师傅快点,我要赶飞机.",
          "师傅跟上那辆法拉利.": "师傅跟上那辆法拉利.",
          "带我去最近的银行.": "带我去最近的银行.",
          "帮我跟上前面那辆车!": "帮我跟上前面那辆车!",
          "快去火车站,我赶车!": "快去火车站,我赶车!",
          "我在酒店大堂门口等你.": "我在酒店大堂门口等你.",
          "要下雨了,你快来!": "要下雨了,你快来!"
        },
        "showReward": {
          "title": "奖励",
          "normalReceive": "普通领取",
          "ReceiveImmediately": " 立即领取",
          "doubleReceive": "双倍领取",
          "alreadyHadCar": "您已拥有该车辆，自动转成对应金币",
          "buySuccessful": "购买成功",
          "confrim": "确认",
          "signinReward": "签到奖励"
        },
        "revive": {
          "reviveImmediately": "立即复活",
          "skip": "跳过",
          "tips": "真可惜，只差一点就到终点了!",
          "continue": "复活继续"
        },
        "clickBox": {
          "title": "神秘大礼",
          "progress": "点击越快奖励越多",
          "clickMe": "快点我",
          "normalReceive": "普通领取",
          "doubleReceive": "双倍领取"
        },
        "trial": {
          "title": "免费试用",
          "tryItNow": "立即试用",
          "giveUp": "放弃试用, 开始游戏"
        },
        "invinceible": {
          "title": "无敌开局",
          "confirm": "确认",
          "close": "关闭"
        },
        "setting": {
          "title": "设置",
          "version": "版本号:",
          "close": "关闭"
        }
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/updateValueLabel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, Label, _decorator, Component;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _temp;

      cclegacy._RF.push({}, "4b7cfRS5bdP8qo8rorNgln5", "updateValueLabel", undefined);

      const {
        ccclass,
        property,
        requireComponent
      } = _decorator;
      let updateValueLabel = exports('updateValueLabel', (_dec = ccclass("updateValueLabel"), _dec2 = requireComponent(Label), _dec(_class = _dec2(_class = (_temp = class updateValueLabel extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "isPlaying", false);

          _defineProperty(this, "startVal", 0);

          _defineProperty(this, "endVal", 0);

          _defineProperty(this, "diffVal", 0);

          _defineProperty(this, "currTime", 0);

          _defineProperty(this, "changingTime", 0);

          _defineProperty(this, "label", null);
        }

        start() {// Your initialization goes here.
        }

        playUpdateValue(startVal, endVal, changingTime) {
          this.startVal = startVal;
          this.endVal = endVal;
          this.diffVal = this.endVal - this.startVal;
          this.currTime = 0;
          this.changingTime = changingTime;
          this.label = this.node.getComponent(Label);
          this.label.string = startVal.toString();
          this.isPlaying = true;
        }

        update(dt) {
          if (!this.isPlaying) {
            return;
          }

          if (this.currTime < this.changingTime) {
            this.currTime += dt;
            var currVal = this.startVal + parseInt((this.currTime / this.changingTime * this.diffVal).toString());

            if (currVal < this.startVal) {
              currVal = this.startVal;
            } else if (currVal > this.endVal) {
              currVal = this.endVal;
            }

            this.label.string = `${currVal}`;
            return;
          }

          this.label.string = `${this.endVal}`;
          this.isPlaying = false;
        } // update (deltaTime) {
        //     // Your update function goes here.
        // }


      }, _temp)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/setting.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './configuration.ts', './audioManager.ts', './localConfig.ts', './uiManager.ts', './gameLogic.ts', './LanguageData.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Sprite, SpriteFrame, Label, _decorator, Component, configuration, audioManager, localConfig, uiManager, gameLogic, i18n;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      configuration = module.configuration;
    }, function (module) {
      audioManager = module.audioManager;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      gameLogic = module.gameLogic;
    }, function (module) {
      i18n = module.i18n;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "501ddLP5JZNPaa02x+rFKAH", "setting", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let setting = exports('setting', (_dec = ccclass("setting"), _dec2 = property(Sprite), _dec3 = property(Sprite), _dec4 = property(SpriteFrame), _dec5 = property(SpriteFrame), _dec6 = property(Label), _dec(_class = (_class2 = (_temp = class setting extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "spVibrateSwitch", _descriptor, this);

          _initializerDefineProperty(this, "spSoundSwitch", _descriptor2, this);

          _initializerDefineProperty(this, "imgSwitchOpen", _descriptor3, this);

          _initializerDefineProperty(this, "imgSwitchClose", _descriptor4, this);

          _initializerDefineProperty(this, "lbVersion", _descriptor5, this);

          _defineProperty(this, "isSoundOpen", void 0);

          _defineProperty(this, "isVibrateOpen", void 0);

          _defineProperty(this, "clickTimes", 0);
        } //展示次数


        static checkState() {
          const data = audioManager.instance.getConfiguration(true);

          if (!data) {
            audioManager.instance.closeMusic();
            audioManager.instance.closeSound();
          } else {
            audioManager.instance.openMusic();
            audioManager.instance.openSound();
          }
        }

        start() {// Your initialization goes here.
        }

        show() {
          this.clickTimes += 1;
          this.lbVersion.string = `${i18n.t("setting.version")} ${localConfig.instance.getVersion()}`;
          this.isSoundOpen = audioManager.instance.getConfiguration(true);
          this.isVibrateOpen = gameLogic.isVibrateOpen();
          this.refreshSwitchUI();
        }

        refreshSwitchUI() {
          if (this.isVibrateOpen) {
            this.spVibrateSwitch.spriteFrame = this.imgSwitchOpen;
          } else {
            this.spVibrateSwitch.spriteFrame = this.imgSwitchClose;
          }

          if (this.isSoundOpen) {
            this.spSoundSwitch.spriteFrame = this.imgSwitchOpen;
          } else {
            this.spSoundSwitch.spriteFrame = this.imgSwitchClose;
          }
        }

        onBtnVibrateClick() {// this.isVibrateOpen = !this.isVibrateOpen;
          // configuration.instance.setGlobalData('vibrate', this.isVibrateOpen);
          // this.refreshSwitchUI();
        }

        onBtnSoundClick() {
          this.isSoundOpen = !this.isSoundOpen;

          if (!this.isSoundOpen) {
            audioManager.instance.closeMusic();
            audioManager.instance.closeSound();
          } else {
            audioManager.instance.openMusic();
            audioManager.instance.openSound();
          }

          configuration.instance.setGlobalData('music', `${this.isSoundOpen}`);
          this.refreshSwitchUI();
        }

        onBtnCloseClick() {
          uiManager.instance.hideDialog('main/setting');
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spVibrateSwitch", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spSoundSwitch", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "imgSwitchOpen", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "imgSwitchClose", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lbVersion", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/customerManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './fightConstants.ts', './clientEvent.ts', './resourceUtil.ts', './audioManager.ts', './constant.ts', './poolManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, _decorator, Component, Vec3, Animation, isValid, fightConstants, clientEvent, resourceUtil, audioManager, constant, poolManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      Animation = module.Animation;
      isValid = module.isValid;
    }, function (module) {
      fightConstants = module.fightConstants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      audioManager = module.audioManager;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      poolManager = module.poolManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "586a8tdaBhPQprl2rcvzztA", "customerManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let customerManager = exports('customerManager', (_dec = ccclass("customerManager"), _dec(_class = (_class2 = (_temp = class customerManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "moveSpeed", _descriptor, this);

          _defineProperty(this, "nodeCustomer", null);

          _defineProperty(this, "_targetPos", null);

          _defineProperty(this, "_callback", undefined);

          _defineProperty(this, "_offset", null);

          _defineProperty(this, "customerId", -1);

          _defineProperty(this, "retryTimes", 0);
        }

        start() {// Your initialization goes here.
        }
        /**
         * 触发新订单
         *
         * @memberof customerManager
         */


        newOrder() {
          //随机个乘客给他
          this.customerId = Math.floor(Math.random() * constant.CUSTOMER_MAX_CNT) + 1;
          clientEvent.dispatchEvent('showTalk', this.customerId, fightConstants.CUSTOMER_TALK_TIME.NEW_ORDER);
        }
        /**
         * 接客
         * @param {Vec3} carWorldPos 车辆当前位置
         * @param direction 乘客的方向
         * @param callback 乘客上车后的回调函数
         */


        greeting(carWorldPos, direction, callback) {
          if (this.customerId === -1) {
            //还没有产生过乘客
            //随机个乘客给他
            this.customerId = Math.floor(Math.random() * constant.CUSTOMER_MAX_CNT) + 1;
          } //使用订单时产生的乘客


          if (this.nodeCustomer) {
            poolManager.instance.putNode(this.nodeCustomer);
            this.nodeCustomer = null;
          }

          resourceUtil.getCustomer(this.customerId.toString(), (err, prefab) => {
            if (err) {
              console.error(err); //尝试重新加载一次

              if (this.retryTimes < 3) {
                this.greeting(carWorldPos, direction, callback);
              }

              return;
            }

            this.retryTimes = 0;
            this.nodeCustomer = poolManager.instance.getNode(prefab, this.node);
            this.nodeCustomer.active = true; // direction = new Vec3(direction.x, direction.y, direction.z);

            let tmpVec3 = new Vec3();
            Vec3.multiplyScalar(tmpVec3, direction, 1.3);
            Vec3.add(tmpVec3, carWorldPos, tmpVec3);
            let customerPos = tmpVec3.clone();
            Vec3.multiplyScalar(tmpVec3, direction, 0.25);
            Vec3.add(tmpVec3, carWorldPos, tmpVec3);
            let targetPos = tmpVec3.clone();
            this.nodeCustomer.setWorldPosition(customerPos);

            if (direction.x !== 0) {
              if (direction.x > 0) {
                this.nodeCustomer.eulerAngles = new Vec3(0, 270, 0);
              } else {
                this.nodeCustomer.eulerAngles = new Vec3(0, 90, 0);
              }
            } else {
              if (direction.z > 0) {
                this.nodeCustomer.eulerAngles = new Vec3(0, 180, 0);
              } else {
                this.nodeCustomer.eulerAngles = new Vec3(0, 0, 0);
              }
            }

            audioManager.instance.playSound(constant.AUDIO_SOUND.NEW_ORDER);
            this.customerMove(targetPos, () => {
              audioManager.instance.playSound(constant.AUDIO_SOUND.IN_CAR); //接完客后

              callback && callback(); //触发乘客问候

              this.scheduleOnce(() => {
                clientEvent.dispatchEvent('showTalk', this.customerId, fightConstants.CUSTOMER_TALK_TIME.INTO_THE_CAR);
              }, 1);
            });
          });
        }
        /**
         * 送客
         * @param carWorldPos 车辆当前位置
         * @param direction 乘客前往的方向
         * @param isLastCustomer 是否最后一位乘客
         * @param callback 乘客上车后的回调函数
         */


        takeCustomer(carWorldPos, direction, isLastCustomer, callback) {
          if (!this.nodeCustomer) {
            //没有顾客可能有异常直接过
            if (callback) {
              callback();
            }

            return;
          }

          direction = new Vec3(direction.x, direction.y, direction.z);
          let tmpVec3 = new Vec3();
          Vec3.multiplyScalar(tmpVec3, direction, 0.25);
          Vec3.add(tmpVec3, carWorldPos, tmpVec3);
          let posCur = tmpVec3.clone();
          this.nodeCustomer.active = true;
          this.nodeCustomer.setWorldPosition(posCur);

          if (direction.x !== 0) {
            if (direction.x > 0) {
              this.nodeCustomer.eulerAngles = new Vec3(0, 90, 0);
            } else {
              this.nodeCustomer.eulerAngles = new Vec3(0, 270, 0);
            }
          } else {
            if (direction.z > 0) {
              this.nodeCustomer.eulerAngles = new Vec3(0, 0, 0);
            } else {
              this.nodeCustomer.eulerAngles = new Vec3(0, 180, 0);
            }
          }

          Vec3.multiplyScalar(tmpVec3, direction, 1.3);
          Vec3.add(tmpVec3, carWorldPos, tmpVec3);
          let targetPos = tmpVec3.clone();
          audioManager.instance.playSound(constant.AUDIO_SOUND.GET_MONEY);
          this.customerMove(targetPos, () => {
            //送完客后
            if (callback) {
              callback();
            } //2秒后触发新订单
            //需要检测是否已经结束


            if (!isLastCustomer) {
              //触发新订单
              this.scheduleOnce(() => {
                this.newOrder();
              }, 2);
            }
          });
        }

        customerMove(targetPos, callback) {
          this._targetPos = targetPos;
          this._callback = callback;
          let ani = this.nodeCustomer.getComponent(Animation);
          ani.play('walk');
          this._offset = Vec3.subtract(new Vec3(), this._targetPos, this.nodeCustomer.worldPosition);

          this._offset.multiplyScalar(this.moveSpeed);
        }

        update(deltaTime) {
          // Your update function goes here.
          if (this._targetPos && this.nodeCustomer) {
            let posWorld = this.nodeCustomer.getWorldPosition();
            let offset = new Vec3();
            Vec3.multiplyScalar(offset, this._offset, deltaTime);
            posWorld.add(offset);

            if (Vec3.subtract(offset, posWorld, this._targetPos).lengthSqr() < 0.01) {
              //到达目标
              this.onMoveOver();
            } else {
              this.nodeCustomer.setWorldPosition(posWorld);
            }
          }
        }

        onMoveOver() {
          this.nodeCustomer.setWorldPosition(this._targetPos);
          this.nodeCustomer.active = false;
          this._targetPos = null;
          this._callback && this._callback();
        }

        reset() {
          if (this.nodeCustomer && isValid(this.nodeCustomer)) {
            let ani = this.nodeCustomer.getComponent(Animation); // ani.stop();

            ani.getState('walk').stop();
            this.nodeCustomer.destroy();
            this.nodeCustomer = null;
          }

          this.customerId = -1;
        }

      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/clientEvent.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './oneToMultiListener.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, oneToMultiListener;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      oneToMultiListener = module.oneToMultiListener;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "5a305zVBk5GUIdzJLbOwV+H", "clientEvent", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let clientEvent = exports('clientEvent', (_dec = ccclass("clientEvent"), _dec(_class = (_temp = _class2 = class clientEvent extends oneToMultiListener {}, _defineProperty(_class2, "handlers", {}), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/onlineDouble.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './constant.ts', './util.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _defineProperty, _initializerDefineProperty, cclegacy, Label, Sprite, _decorator, Component, clientEvent, constant, util, playerData, uiManager, gameLogic;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _defineProperty = module.defineProperty;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      Sprite = module.Sprite;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      util = module.util;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      gameLogic = module.gameLogic;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "5b356wyJ3BCYZpADXUOyafo", "onlineDouble", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let onlineDouble = exports('onlineDouble', (_dec = ccclass("onlineDouble"), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Sprite), _dec(_class = (_class2 = (_temp = class onlineDouble extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "rewardMoney", 0);

          _defineProperty(this, "overCallback", null);

          _initializerDefineProperty(this, "lbGoldNormal", _descriptor, this);

          _initializerDefineProperty(this, "lbGoldMulti", _descriptor2, this);

          _initializerDefineProperty(this, "spIcon", _descriptor3, this);
        }

        start() {// Your initialization goes here.
        }

        show(money, cb) {
          this.rewardMoney = money;
          this.overCallback = cb;
          this.lbGoldNormal.string = util.formatMoney(money);
          this.lbGoldMulti.string = util.formatMoney(money * 3);
          gameLogic.updateRewardIcon(constant.SHARE_FUNCTION.ONLINE, this.spIcon);
        }

        onBtnGetNormalClick() {
          //普通领取
          this.rewardOver(this.rewardMoney);
        }

        onBtnGetMultiClick() {
          //3倍领取
          gameLogic.openReward(constant.SHARE_FUNCTION.ONLINE, err => {
            if (!err) {
              this.rewardOver(this.rewardMoney * 3);
            }
          });
        }

        rewardOver(money) {
          // gameLogic.addGold(money);
          //TODO 触发特效
          playerData.instance.updatePlayerInfo('gold', money);
          uiManager.instance.hideDialog('main/onlineDouble');
          gameLogic.showFlyReward(constant.REWARD_TYPE.GOLD, () => {
            clientEvent.dispatchEvent('updateGold');
          });

          if (this.overCallback) {
            this.overCallback();
          }
        }

        onBtnCloseClick() {
          uiManager.instance.hideDialog('main/onlineDouble');
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbGoldNormal", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbGoldMulti", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/trial.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './resourceUtil.ts', './constant.ts', './poolManager.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, Widget, Sprite, _decorator, Component, Vec3, clientEvent, resourceUtil, constant, poolManager, localConfig, playerData, uiManager, gameLogic;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Widget = module.Widget;
      Sprite = module.Sprite;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      poolManager = module.poolManager;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      gameLogic = module.gameLogic;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "5bf756By5JOmoKbG0aoUzq6", "trial", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let trial = exports('trial', (_dec = ccclass("trial"), _dec2 = property(Node), _dec3 = property(Widget), _dec4 = property(Sprite), _dec(_class = (_class2 = (_temp = class trial extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "nodeCarParent", _descriptor, this);

          _initializerDefineProperty(this, "wgMenu", _descriptor2, this);

          _defineProperty(this, "currentCar", null);

          _defineProperty(this, "carDegree", 0);

          _defineProperty(this, "rotateSpeed", 30);

          _defineProperty(this, "carId", 0);

          _initializerDefineProperty(this, "spIcon", _descriptor3, this);

          _defineProperty(this, "_callback", undefined);
        }

        start() {// Your initialization goes here.
        }

        show(callback) {
          this._callback = callback;
          gameLogic.updateRewardIcon(constant.SHARE_FUNCTION.TRIAL, this.spIcon);

          if (this.currentCar) {
            poolManager.instance.putNode(this.currentCar);
            this.currentCar = null;
          } //随机辆未拥有的车


          let arrCars = localConfig.instance.getCars(); //获得所有车

          let arrLottery = [];
          arrCars.forEach(element => {
            if (!playerData.instance.hasCar(element.ID)) {
              //未拥有的车辆，加入抽奖列表
              arrLottery.push(element.ID);
            }
          });

          if (arrLottery.length <= 0) {
            //已经拥有全部车辆
            this.onBtnCloseClick();
            return;
          }

          let rand = Math.floor(Math.random() * arrLottery.length);
          this.carId = arrLottery[rand];
          let carInfo = localConfig.instance.queryByID('car', this.carId.toString());
          resourceUtil.getUICar(carInfo.model, (err, prefab) => {
            if (err) {
              console.error(err, carInfo.model);
              return;
            }

            this.carDegree = 0;
            this.currentCar = poolManager.instance.getNode(prefab, this.nodeCarParent);
          });
        }

        onBtnCloseClick() {
          uiManager.instance.hideDialog('main/trial');
          this._callback && this._callback();
        }

        onBtnTrialClick() {
          gameLogic.openReward(constant.SHARE_FUNCTION.TRIAL, (err, type) => {
            if (err) {
              return;
            }

            playerData.instance.showCar = this.carId;
            clientEvent.dispatchEvent('updateCar');
            this.onBtnCloseClick();
          });
        }

        update(deltaTime) {
          //旋转展示车辆
          if (this.currentCar) {
            this.carDegree -= deltaTime * this.rotateSpeed;

            if (this.carDegree <= -360) {
              this.carDegree += 360;
            }

            this.currentCar.eulerAngles = new Vec3(0, this.carDegree, 0);
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nodeCarParent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "wgMenu", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/tips.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Label, _decorator, Component, Vec3, UITransform, isValid, tween, poolManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      UITransform = module.UITransform;
      isValid = module.isValid;
      tween = module.tween;
    }, function (module) {
      poolManager = module.poolManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "60f49uw4/dA4rGh/C738U1T", "tips", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let tips = exports('tips', (_dec = ccclass('tips'), _dec2 = property(Label), _dec(_class = (_class2 = (_temp = class tips extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "lbTips", _descriptor, this);

          _defineProperty(this, "targetPos", void 0);
        }

        start() {// Your initialization goes here.
        }

        show(content, callback) {
          this.targetPos = new Vec3(0, 200, 0);
          this.node.setPosition(this.targetPos); // this.node.getComponent(Sprite).color = new Color(255, 255, 255, 255);
          // this.lbTips.maxWidth = 0;
          // this.lbTips.string = '<color=#001D34>'+ content +'</color>';
          // //修改底图大小
          // let width = this.lbTips._linesWidth;
          // if (width.length && width[0] < 500) {
          //     this.lbTips.maxWidth = width[0];
          // } else {
          //     this.lbTips.maxWidth = 500;
          //     this.lbTips.node.setContentSize(500, this.lbTips.node.getContentSize().height);
          // }

          this.lbTips.string = content;
          const lbTipTrans = this.lbTips.node.getComponent(UITransform);
          let size = lbTipTrans.contentSize;

          if (!isValid(size)) {
            //size不存在，自我销毁
            // tipsNode.destroy();
            poolManager.instance.putNode(this.node);
            return;
          }

          const uiTrans = this.node.getComponent(UITransform);
          uiTrans.setContentSize(size.width + 100 < 240 ? 240 : size.width + 100, size.height + 30);
          this.scheduleOnce(() => {
            tween(this.targetPos).by(0.8, new Vec3(0, 150, 0)).call(() => {
              callback && callback();
              poolManager.instance.putNode(this.node);
            }).start();
          }, 0.8);
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbTips", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/flyRewardItem.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Vec3, Sprite, tween;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      Sprite = module.Sprite;
      tween = module.tween;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "62dd66o/TBEyqhX8gZkE8/G", "flyRewardItem", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let flyRewardItem = exports('flyRewardItem', (_dec = ccclass("flyRewardItem"), _dec(_class = (_temp = class flyRewardItem extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "targetPos", new Vec3());

          _defineProperty(this, "targetRotation", new Vec3(0, 0, 0));

          _defineProperty(this, "targetScale", new Vec3(1, 1, 1));

          _defineProperty(this, "posLast", new Vec3());

          _defineProperty(this, "_callback", null);
        }

        start() {// Your initialization goes here.
        }

        show(imgItem, posLast, callback) {
          this.posLast.set(posLast);
          this._callback = callback;
          let sprite = this.node.addComponent(Sprite);
          sprite.trim = false;
          sprite.sizeMode = Sprite.SizeMode.RAW;
          sprite.spriteFrame = imgItem;
          this.node.eulerAngles = new Vec3(0, 0, Math.floor(Math.random() * 360));
          this.targetRotation = new Vec3(this.node.eulerAngles); //每个去配个动作
          // let randDegree = Math.floor(Math.random()*360);

          let randTargetPos = new Vec3(Math.floor(Math.random() * 300) - 150, Math.floor(Math.random() * 300) - 150, 0);
          let costTime = Vec3.distance(randTargetPos, new Vec3(0, 0, 0)) / 400;
          tween(this.targetPos) //    .to(costTime, randTargetPos, {easing: 'Circular-InOut'})
          .to(costTime, randTargetPos, {
            easing: 'cubicInOut'
          }).start();
          let randRotation = 120 + Math.floor(Math.random() * 60);
          randRotation = this.targetRotation.z + Math.floor(Math.random() * 2) === 1 ? randRotation : -randRotation;
          tween(this.targetRotation).to(costTime, new Vec3(0, 0, randRotation)).start();
          tween(this.targetScale).to(costTime * 2 / 3, new Vec3(1.4, 1.4, 1.4)).to(costTime / 3, new Vec3(1, 1, 1)).call(() => {
            this.move2Target();
          }).start();
        }

        move2Target() {
          let move2TargetTime = Vec3.distance(this.node.position, this.posLast) / 1500;
          let delayTime = Math.floor(Math.random() * 10) / 10; //0~1s

          tween(this.targetScale).to(0.3, new Vec3(1.4, 1.4, 1.4)).to(0.7, new Vec3(1, 1, 1)).union().repeat(50).start();
          this.scheduleOnce(() => {
            tween(this.targetPos).to(move2TargetTime, this.posLast).call(() => {
              //飞行结束
              this._callback && this._callback(this.node);
            }).start();
          }, delayTime);
        }

        update(deltaTime) {
          // Your update function goes here.
          this.node.position = this.targetPos;
          this.node.eulerAngles = this.targetRotation;
          this.node.setScale(this.targetScale);
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/csvManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "64d5aR01mZIArZ14oqSxdz0", "csvManager", undefined);

      const {
        ccclass
      } = _decorator;
      const CELL_DELIMITERS = [",", ";", "\t", "|", "^"];
      const LINE_DELIMITERS = ["\r\n", "\r", "\n"];

      const getterCast = function (value, index, cast, d) {
        if (cast instanceof Array) {
          if (cast[index] === "number") {
            return Number(d[index]);
          } else if (cast[index] === "boolean") {
            return d[index] === "true" || d[index] === "t" || d[index] === "1";
          } else {
            return d[index];
          }
        } else {
          if (!isNaN(Number(value))) {
            return Number(d[index]);
          } else if (value == "false" || value == "true" || value == "t" || value == "f") {
            return d[index] === "true" || d[index] === "t" || d[index] === "1";
          } else {
            return d[index];
          }
        }
      };

      const CSV = {
        //

        /* =========================================
            * Constants ===============================
            * ========================================= */
        STANDARD_DECODE_OPTS: {
          skip: 0,
          limit: false,
          header: false,
          cast: false,
          comment: ""
        },
        STANDARD_ENCODE_OPTS: {
          delimiter: CELL_DELIMITERS[0],
          newline: LINE_DELIMITERS[0],
          skip: 0,
          limit: false,
          header: false
        },
        quoteMark: '"',
        doubleQuoteMark: '""',
        quoteRegex: /"/g,
        opts: {},

        /* =========================================
            * Utility Functions =======================
            * ========================================= */
        assign: function (...args) {
          const params = Array.prototype.slice.call(arguments);
          const base = args[0];
          const rest = args.slice(1);

          for (let i = 0, len = rest.length; i < len; i++) {
            for (const attr in rest[i]) {
              base[attr] = rest[i][attr];
            }
          }

          return base;
        },
        map: function (collection, fn) {
          const results = [];

          for (let i = 0, len = collection.length; i < len; i++) {
            results[i] = fn(collection[i], i);
          }

          return results;
        },
        getType: function (obj) {
          return Object.prototype.toString.call(obj).slice(8, -1);
        },
        getLimit: function (limit, len) {
          return limit === false ? len : 1;
        },
        buildObjectConstructor: function (fields, sample, cast) {
          return function (d) {
            const object = {};

            const setter = function (attr, value) {
              return object[attr] = value;
            };

            if (cast) {
              fields.forEach((attr, idx) => {
                setter(attr, getterCast(sample[idx], idx, cast, d));
              });
            } else {
              fields.forEach((attr, idx) => {
                setter(attr, getterCast(sample[idx], idx, null, d));
              });
            } // body.push("return object;");
            // body.join(";\n");


            return object;
          };
        },
        buildArrayConstructor: function (fields, sample, cast) {
          return function (d) {
            const row = new Array(sample.length);

            const setter = function (idx, value) {
              return row[idx] = value;
            };

            if (cast) {
              fields.forEach(function (attr, idx) {
                setter(attr, getterCast(sample[idx], idx, cast, d));
              });
            } else {
              fields.forEach(function (attr, idx) {
                setter(attr, getterCast(sample[idx], idx, null, d));
              });
            }

            return row;
          };
        },
        frequency: function (coll, needle, limit) {
          if (limit === void 0) limit = false;
          let count = 0;
          let lastIndex = 0;
          const maxIndex = this.getLimit(limit, coll.length);

          while (lastIndex < maxIndex) {
            lastIndex = coll.indexOf(needle, lastIndex);
            if (lastIndex === -1) break;
            lastIndex += 1;
            count++;
          }

          return count;
        },
        mostFrequent: function (coll, needles, limit) {
          const max = 0;
          let detected = '';

          for (let cur = needles.length - 1; cur >= 0; cur--) {
            if (this.frequency(coll, needles[cur], limit) > max) {
              detected = needles[cur];
            }
          }

          return detected || needles[0];
        },
        unsafeParse: function (text, opts, fn) {
          const lines = text.split(opts.newline);

          if (opts.skip > 0) {
            lines.splice(opts.skip);
          }

          let fields;
          let constructor;

          function cells(lines) {
            let line = lines.shift();

            if (line.indexOf('"') >= 0) {
              // 含引号
              // 找到这行完整的数据, 找到对称的双引号
              let lastIndex = 0;
              let findIndex = 0;
              let count = 0;

              while (lines.length > 0) {
                lastIndex = line.indexOf('"', findIndex);
                if (lastIndex === -1 && count % 2 === 0) break;

                if (lastIndex !== -1) {
                  findIndex = lastIndex + 1;
                  count++;
                } else {
                  line = line + opts.newline + lines.shift();
                }
              }

              const list = [];
              let item;
              let quoteCount = 0;
              let start = 0;
              let end = 0;
              const length = line.length;

              for (let key in line) {
                if (!line.hasOwnProperty(key)) {
                  continue;
                }

                let numKey = parseInt(key);
                const value = line[key];

                if (numKey === 0 && value === '"') {
                  quoteCount++;
                  start = 1;
                }

                if (value === '"') {
                  quoteCount++;

                  if (line[numKey - 1] === opts.delimiter && start === numKey) {
                    start++;
                  }
                }

                if (value === '"' && quoteCount % 2 === 0) {
                  if (line[numKey + 1] === opts.delimiter || numKey + 1 === length) {
                    end = numKey;
                    item = line.substring(start, end);
                    list.push(item);
                    start = end + 2;
                    end = start;
                  }
                }

                if (value === opts.delimiter && quoteCount % 2 === 0) {
                  end = numKey;

                  if (end > start) {
                    item = line.substring(start, end);
                    list.push(item);
                    start = end + 1;
                    end = start;
                  } else if (end === start) {
                    list.push("");
                    start = end + 1;
                    end = start;
                  }
                }
              }

              end = length;

              if (end >= start) {
                item = line.substring(start, end);
                list.push(item);
              }

              return list;
            } else {
              return line.split(opts.delimiter);
            }
          }

          if (opts.header) {
            if (opts.header === true) {
              opts.comment = cells(lines); // 第一行是注释

              opts.cast = cells(lines); // 第二行是数据类型

              fields = cells(lines);
            } else if (this.getType(opts.header) === "Array") {
              fields = opts.header;
            }

            constructor = this.buildObjectConstructor(fields, lines[0].split(opts.delimiter), opts.cast);
          } else {
            constructor = this.buildArrayConstructor(fields, lines[0].split(opts.delimiter), opts.cast);
          }

          while (lines.length > 0) {
            const row = cells(lines);

            if (row.length > 1) {
              fn(constructor(row), fields[0]);
            }
          }

          return true;
        },
        safeParse: function (text, opts) {
          const newline = opts.newline;
          const lines = text.split(newline);

          if (opts.skip > 0) {
            lines.splice(opts.skip);
          }

          return true;
        },
        encodeCells: function (line, delimiter, newline) {
          const row = line.slice(0);

          for (let i = 0, len = row.length; i < len; i++) {
            if (row[i].indexOf(this.quoteMark) !== -1) {
              row[i] = row[i].replace(this.quoteRegex, this.doubleQuoteMark);
            }

            if (row[i].indexOf(delimiter) !== -1 || row[i].indexOf(newline) !== -1) {
              row[i] = this.quoteMark + row[i] + this.quoteMark;
            }
          }

          return row.join(delimiter);
        },
        encodeArrays: function (coll, opts, fn) {
          const delimiter = opts.delimiter;
          const newline = opts.newline;

          if (opts.header && this.getType(opts.header) === "Array") {
            fn(this.encodeCells(opts.header, delimiter, newline));
          }

          for (let cur = 0, lim = this.getLimit(opts.limit, coll.length); cur < lim; cur++) {
            fn(this.encodeCells(coll[cur], delimiter, newline));
          }

          return true;
        },
        encodeObjects: function (coll, opts, fn) {
          const delimiter = opts.delimiter;
          const newline = opts.newline;
          let header = [];
          let row = [];

          for (const key in coll[0]) {
            header.push(key);
            row.push(coll[0][key]);
          }

          if (opts.header === true) {
            fn(this.encodeCells(header, delimiter, newline));
          } else if (this.getType(opts.header) === "Array") {
            fn(this.encodeCells(opts.header, delimiter, newline));
          }

          fn(this.encodeCells(row, delimiter, '\n'));

          for (let cur = 1, lim = this.getLimit(opts.limit, coll.length); cur < lim; cur++) {
            row = [];

            for (let i = 0, len = header.length; i < len; i++) {
              row.push(coll[cur][header[i]]);
            }

            fn(this.encodeCells(row, delimiter, newline));
          }

          return true;
        },
        parse: function (text, opts, fn) {
          let rows = [];

          if (this.getType(opts) === "Function") {
            fn = opts;
            opts = {};
          } else if (this.getType(fn) !== "Function") {
            fn = rows.push.bind(rows);
          }

          opts = this.assign({}, this.STANDARD_DECODE_OPTS, opts);
          this.opts = opts;

          if (!opts.delimiter || !opts.newline) {
            const limit = Math.min(48, Math.floor(text.length / 20), text.length);
            opts.delimiter = opts.delimiter || this.mostFrequent(text, CELL_DELIMITERS, limit !== 0);
            opts.newline = opts.newline || this.mostFrequent(text, LINE_DELIMITERS, limit !== 0);
          } // modify by jl 由表自行控制不要含有双引号.提高解析效率


          return this.unsafeParse(text, opts, fn) && (rows.length > 0 ? rows : true);
        },
        encode: function (coll, opts, fn) {
          let lines = [];

          if (this.getType(opts) === "Function") {
            fn = opts; // opts = {};
          } else if (this.getType(fn) !== "Function") {
            lines = [];
            fn = lines.push.bind(lines);
          }

          opts = this.assign({}, this.STANDARD_ENCODE_OPTS, opts);

          if (opts.skip > 0) {
            coll = coll.slice(opts.skip);
          }

          return (this.getType(coll[0]) === "Array" ? this.encodeArrays : this.encodeObjects)(coll, opts, fn) && (lines.length > 0 ? lines.join(opts.newline) : true);
        }
      };
      let csvManager = exports('csvManager', (_dec = ccclass("csvManager"), _dec(_class = (_temp = class csvManager {
        constructor() {
          _defineProperty(this, "csvTables", {});

          _defineProperty(this, "csvTableForArr", {});

          _defineProperty(this, "tableCast", {});

          _defineProperty(this, "tableComment", {});
        }

        addTable(tableName, tableContent, force) {
          if (this.csvTables[tableName] && !force) {
            return;
          }

          const tableData = {};
          const tableArr = [];
          const opts = {
            header: true
          };
          CSV.parse(tableContent, opts, (row, keyName) => {
            tableData[row[keyName]] = row;
            tableArr.push(row);
          });
          this.tableCast[tableName] = CSV.opts.cast;
          this.tableComment[tableName] = CSV.opts.comment;
          this.csvTables[tableName] = tableData;
          this.csvTableForArr[tableName] = tableArr; //this.csvTables[tableName].initFromText(tableContent);
        }

        getTableArr(tableName) {
          return this.csvTableForArr[tableName];
        }

        getTable(tableName) {
          return this.csvTables[tableName];
        }

        queryOne(tableName, key, value) {
          const table = this.getTable(tableName);

          if (!table) {
            return null;
          }

          if (key) {
            for (const tbItem in table) {
              if (!table.hasOwnProperty(tbItem)) {
                continue;
              }

              if (table[tbItem][key] === value) {
                return table[tbItem];
              }
            }
          } else {
            return table[value];
          }
        }

        queryByID(tableName, ID) {
          return this.queryOne(tableName, null, ID);
        }

        queryAll(tableName, key, value) {
          const table = this.getTable(tableName);

          if (!table || !key) {
            return null;
          }

          const ret = {};

          for (const tbItem in table) {
            if (!table.hasOwnProperty(tbItem)) {
              continue;
            }

            if (table[tbItem][key] === value) {
              ret[tbItem] = table[tbItem];
            }
          }

          return ret;
        }

        queryIn(tableName, key, values) {
          const table = this.getTable(tableName);

          if (!table || !key) {
            return null;
          }

          const ret = {};
          const keys = Object.keys(table);
          const length = keys.length;

          for (let i = 0; i < length; i++) {
            const item = table[keys[i]];

            if (values.indexOf(item[key]) > -1) {
              ret[keys[i]] = item;
            }
          }

          return ret;
        }

        queryByCondition(tableName, condition) {
          if (condition.constructor !== Object) {
            return null;
          }

          const table = this.getTable(tableName);

          if (!table) {
            return null;
          }

          const ret = {};
          const tableKeys = Object.keys(table);
          const tableKeysLength = tableKeys.length;
          const keys = Object.keys(condition);
          const keysLength = keys.length;

          for (let i = 0; i < tableKeysLength; i++) {
            const item = table[tableKeys[i]];
            let fit = true;

            for (let j = 0; j < keysLength; j++) {
              const key = keys[j];
              fit = fit && condition[key].indexOf(item[key]) > -1 && !ret[tableKeys[i]];
            }

            if (fit) {
              ret[tableKeys[i]] = item;
            }
          }

          return ret;
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/mainUI.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './constant.ts', './util.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Sprite, Label, Node, _decorator, Component, Vec3, tween, sys, clientEvent, constant, util, playerData, uiManager, gameLogic;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Sprite = module.Sprite;
      Label = module.Label;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      tween = module.tween;
      sys = module.sys;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      util = module.util;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      gameLogic = module.gameLogic;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

      cclegacy._RF.push({}, "6e662xQs9xPfZ4Gn7vNo4u5", "mainUI", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let mainUI = exports('mainUI', (_dec = ccclass("mainUI"), _dec2 = property(Sprite), _dec3 = property(Label), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec(_class = (_class2 = (_temp = class mainUI extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "spIcon", _descriptor, this);

          _initializerDefineProperty(this, "lbGold", _descriptor2, this);

          _initializerDefineProperty(this, "nodeBtnService", _descriptor3, this);

          _initializerDefineProperty(this, "nodeSignInRedDot", _descriptor4, this);

          _initializerDefineProperty(this, "nodeGoldIcon", _descriptor5, this);

          _initializerDefineProperty(this, "nodeShopRedDot", _descriptor6, this);

          _defineProperty(this, "targetScale", new Vec3(1, 1, 1));

          _defineProperty(this, "isGoldPlaying", false);

          _defineProperty(this, "arrCars", []);

          _defineProperty(this, "isShowAniFinished", false);

          _defineProperty(this, "debugIdx", 0);

          _defineProperty(this, "debugTimer", 0);
        }

        start() {
          // Your initialization goes here.
          //界面启动后表示登录完了
          gameLogic.afterLogin();
          this.updateSignIn();
        }

        onEnable() {
          clientEvent.on('updateGold', this.updateGold, this);
          clientEvent.on('updateSignIn', this.updateSignIn, this);
          clientEvent.on('receiveGold', this.receiveGold, this);
          clientEvent.on('updateCar', this.updateCar, this);
          clientEvent.on('buyCar', this.updateCarReceived, this);
          this.nodeGoldIcon.on(Node.EventType.TOUCH_START, this.resetPlayData, this);
        }

        onDisable() {
          clientEvent.off('updateGold', this.updateGold, this);
          clientEvent.off('updateSignIn', this.updateSignIn, this);
          clientEvent.off('receiveGold', this.receiveGold, this);
          clientEvent.off('updateCar', this.updateCar, this);
          clientEvent.off('buyCar', this.updateCarReceived, this);
          this.nodeGoldIcon.off(Node.EventType.TOUCH_START, this.resetPlayData, this);
        }

        updateGold() {
          let gold = playerData.instance.playerInfo.gold || 0;
          this.lbGold.string = util.formatMoney(gold);
        }

        receiveGold() {
          this.isGoldPlaying = true;
          this.nodeGoldIcon.setScale(new Vec3(1, 1, 1));
          tween(this.targetScale).to(0.2, new Vec3(1.2, 1.2, 1.2)).to(0.2, new Vec3(1, 1, 1)).call(() => {
            this.isGoldPlaying = false;
          }).start();
        }
        /**
         * 更新签到的红点显隐
         */


        updateSignIn() {
          playerData.instance.updateSignInCurrentDay();
          let signInStatus = playerData.instance.getSignInReceivedInfo();
          this.nodeSignInRedDot.active = !signInStatus.isAllReceived;
        }

        onBtnBgClick() {
          //先咨询，要不要试用车辆
          if (playerData.instance.playerInfo.level > constant.NEWBEE_LEVEL) {
            uiManager.instance.showDialog('main/trial', [() => {
              this.askInvincible();
            }]);
          } else {
            //前2关不试用
            this.showStart();
          }
        }

        askInvincible() {
          if (playerData.instance.playerInfo.level > constant.NEWBEE_LEVEL) {
            uiManager.instance.showDialog('main/invincible', [() => {
              this.showStart();
            }]);
          } else {
            this.showStart();
          }
        }

        showStart() {
          clientEvent.dispatchEvent('startGame');
        }

        onBtnDailyClick() {
          //7日签到
          uiManager.instance.showDialog('signIn/signIn');
        }

        onBtnLotteryClick() {
          //大转盘
          uiManager.instance.showDialog('lottery/lottery');
        }

        onBtnRankClick() {
          //排行榜
          uiManager.instance.showDialog('rank/rank');
        }

        onBtnChangeCarClick() {
          //换车
          uiManager.instance.showDialog('shop/shop');
        }

        onBtnSettingClick() {
          //设置按钮
          uiManager.instance.showDialog('main/setting');
        }

        updateCar() {}

        updateCarReceived() {
          this.nodeShopRedDot.active = playerData.instance.hasCarCanReceived();
        }

        onBtnLeftClick() {
          let car = playerData.instance.showCar;
          let idx = this.arrCars.indexOf(car);
          idx--;

          if (idx < 0) {
            idx = this.arrCars.length - 1;
          }

          playerData.instance.showCar = this.arrCars[idx];
          clientEvent.dispatchEvent('updateCar');
        }

        onBtnRightClick() {
          let car = playerData.instance.showCar;
          let idx = this.arrCars.indexOf(car);
          idx++;

          if (idx >= this.arrCars.length) {
            idx = 0;
          }

          playerData.instance.showCar = this.arrCars[idx];
          clientEvent.dispatchEvent('updateCar');
        }

        show() {
          this.updateGold();
          this.nodeShopRedDot.active = playerData.instance.hasCarCanReceived();
          this.arrCars.length = 0; // let arr = localConfig.instance.getCars();

          let arr = playerData.instance.playerInfo.cars;
          arr.forEach(element => {
            // this.arrCars.push(element.ID);
            const index = parseInt(element);

            if (index >= 0) {
              this.arrCars.push(index);
            }
          });
          this.isShowAniFinished = true;
          gameLogic.updateRewardIcon(constant.SHARE_FUNCTION.TRIAL, this.spIcon, () => {
            if (playerData.instance.hasCar(playerData.instance.showCar)) {
              this.spIcon.node.active = false;
            }
          });

          if (playerData.instance.isComeFromBalance) {
            this.onBtnBgClick();
          }
        }

        update(deltaTime) {
          // Your update function goes here.
          if (this.isGoldPlaying || this.targetScale.x !== 1) {
            this.nodeGoldIcon.setScale(this.targetScale);
          }
        }

        onBtnDebugClick() {
          return;
        }

        resetPlayData() {
          sys.localStorage.removeItem('CarConfig');
          uiManager.instance.showTips('数据重置成功！');
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbGold", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeBtnService", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nodeSignInRedDot", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "nodeGoldIcon", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "nodeShopRedDot", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/showReward.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './resourceUtil.ts', './constant.ts', './poolManager.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts', './LanguageData.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, SpriteFrame, Sprite, Label, Node, Animation, _decorator, Component, Vec3, clientEvent, resourceUtil, constant, poolManager, localConfig, playerData, uiManager, gameLogic, i18n;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Label = module.Label;
      Node = module.Node;
      Animation = module.Animation;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      poolManager = module.poolManager;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      gameLogic = module.gameLogic;
    }, function (module) {
      i18n = module.i18n;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _temp;

      cclegacy._RF.push({}, "880e1kClIdKPqdXdgTIpdv2", "showReward", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let showReward = exports('showReward', (_dec = ccclass("showReward"), _dec2 = property(SpriteFrame), _dec3 = property(Sprite), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(Node), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(Node), _dec12 = property(Animation), _dec(_class = (_class2 = (_temp = class showReward extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "sfGold", _descriptor, this);

          _initializerDefineProperty(this, "spIcon", _descriptor2, this);

          _initializerDefineProperty(this, "lbRewardValue", _descriptor3, this);

          _initializerDefineProperty(this, "lbTips", _descriptor4, this);

          _initializerDefineProperty(this, "lbTitle", _descriptor5, this);

          _initializerDefineProperty(this, "lbImmediateBtn", _descriptor6, this);

          _initializerDefineProperty(this, "ndCarParent", _descriptor7, this);

          _initializerDefineProperty(this, "ndBtnDouble", _descriptor8, this);

          _initializerDefineProperty(this, "ndBtnNormal", _descriptor9, this);

          _initializerDefineProperty(this, "ndBtnImmediately", _descriptor10, this);

          _initializerDefineProperty(this, "aniReward", _descriptor11, this);

          _defineProperty(this, "isDouble", false);

          _defineProperty(this, "callback", null);

          _defineProperty(this, "isLast", false);

          _defineProperty(this, "rewardType", 0);

          _defineProperty(this, "amount", 0);

          _defineProperty(this, "itemInfo", void 0);

          _defineProperty(this, "_isHadCar", false);

          _defineProperty(this, "currentCar", null);

          _defineProperty(this, "carDegree", 0);

          _defineProperty(this, "rotateSpeed", 30);
        }

        start() {// Your initialization goes here.
        }
        /**
         *
         *
         * @param {*} itemInfo
         * @param {boolean} isDouble 是“双倍领取、普通领取”组合或者单独一个“立即领取”
         * @param {string} title
         * @param {Function} callback
         * @param {string} [tips]
         * @memberof showReward
         */


        show(itemInfo, isDouble, title, callback, tips, txtImmediateBtn) {
          this.itemInfo = itemInfo;
          this.rewardType = itemInfo.rewardType;
          this.amount = itemInfo.amount;
          this.ndBtnDouble.active = isDouble;
          this.ndBtnNormal.active = isDouble;
          this.ndBtnImmediately.active = !isDouble;
          this.lbTitle.string = title;
          this.lbRewardValue.string = itemInfo.rewardType === constant.REWARD_TYPE.CAR ? '' : String(this.amount);
          this.callback = callback;

          if (tips) {
            this.lbTips.node.active = true;
            this.lbTips.string = tips;
          } else {
            this.lbTips.node.active = false;
          }

          this.showRewardPage();
          this.aniReward.play('rewardShow');
          this.aniReward.once(Animation.EventType.FINISHED, () => {
            this.aniReward.play('rewardIdle');
          }, this);

          if (txtImmediateBtn) {
            this.lbImmediateBtn.string = txtImmediateBtn;
          } else {
            this.lbImmediateBtn.string = i18n.t('balance.receiveImmediately');
          }
        }
        /**
         * 设置奖励界面图标
         */


        showRewardPage() {
          if (this.currentCar) {
            poolManager.instance.putNode(this.currentCar);
            this.currentCar = null;
          }

          switch (this.rewardType) {
            case constant.REWARD_TYPE.DIAMOND:
              break;

            case constant.REWARD_TYPE.GOLD:
              this.spIcon.spriteFrame = this.sfGold;
              this.spIcon.node.active = true;
              break;

            case constant.REWARD_TYPE.CAR:
              this.spIcon.node.active = false;
              let targetCar = localConfig.instance.queryByID('car', this.itemInfo.ID);
              let carModel = targetCar.model;
              resourceUtil.getUICar(carModel, (err, prefab) => {
                if (err) {
                  console.error(err);
                  return;
                }

                this.currentCar = poolManager.instance.getNode(prefab, this.ndCarParent);
                this.carDegree = 0;
              }); // resourceUtil.setCarIcon(carModel, this.spIcon, false, ()=>{});

              break;
          }
        }

        onBtnNormalClick() {
          this.addReward();
        }

        onBtnDoubleClick() {
          gameLogic.openReward(constant.SHARE_FUNCTION.SIGNIN, err => {
            if (!err) {
              this.amount *= 2;
              this.addReward();
            }
          });
        }

        onBtnImmediatelyClick() {
          this.addReward();
        }

        addReward() {
          switch (this.rewardType) {
            case constant.REWARD_TYPE.DIAMOND:
              break;

            case constant.REWARD_TYPE.GOLD:
              // gameLogic.addGold(this.amount);
              playerData.instance.updatePlayerInfo('gold', this.amount);
              gameLogic.showFlyReward(constant.REWARD_TYPE.GOLD, () => {
                clientEvent.dispatchEvent('updateGold');
              });
              break;

            case constant.REWARD_TYPE.CAR:
              gameLogic.buyCar(this.itemInfo.ID);
              break;
          }

          uiManager.instance.hideDialog('common/showReward');
          this.callback && this.callback();
        }

        update(deltaTime) {
          //旋转展示车辆
          if (this.currentCar) {
            this.carDegree -= deltaTime * this.rotateSpeed;

            if (this.carDegree <= -360) {
              this.carDegree += 360;
            }

            this.currentCar.eulerAngles = new Vec3(0, this.carDegree, 0);
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sfGold", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbRewardValue", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbTips", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lbTitle", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "lbImmediateBtn", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "ndCarParent", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnDouble", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnNormal", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnImmediately", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "aniReward", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/clickBox.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './fightConstants.ts', './constant.ts', './uiManager.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, ProgressBarComponent, Node, Label, Sprite, _decorator, Component, fightConstants, constant, uiManager, gameLogic;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      ProgressBarComponent = module.ProgressBarComponent;
      Node = module.Node;
      Label = module.Label;
      Sprite = module.Sprite;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      fightConstants = module.fightConstants;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      gameLogic = module.gameLogic;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

      cclegacy._RF.push({}, "884dcSQc2hHsJby3+7ljIyd", "clickBox", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let clickBox = exports('clickBox', (_dec = ccclass("clickBox"), _dec2 = property(ProgressBarComponent), _dec3 = property(Node), _dec4 = property(Label), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Sprite), _dec(_class = (_class2 = (_temp = class clickBox extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "progress", _descriptor, this);

          _initializerDefineProperty(this, "nodeReward", _descriptor2, this);

          _initializerDefineProperty(this, "lbReward", _descriptor3, this);

          _initializerDefineProperty(this, "nodeBox", _descriptor4, this);

          _initializerDefineProperty(this, "nodeMenu", _descriptor5, this);

          _initializerDefineProperty(this, "nodeClickBtn", _descriptor6, this);

          _initializerDefineProperty(this, "spIcon", _descriptor7, this);

          _defineProperty(this, "scheduleTime", 0);

          _defineProperty(this, "curProgress", 50);

          _defineProperty(this, "clickTimes", 15);

          _defineProperty(this, "curClick", 0);

          _defineProperty(this, "isOpenBox", false);

          _defineProperty(this, "rewardValue", 0);
        }

        start() {// Your initialization goes here.
        }

        show() {
          this.scheduleTime = 0;
          this.curProgress = 50;
          this.clickTimes = 10 + Math.floor(Math.random() * 5); //10-15次随机次数

          this.curClick = 0;
          this.isOpenBox = false;
          this.nodeClickBtn.active = true;
          this.progress.node.active = true;
          this.nodeBox.active = true;
          this.nodeReward.active = false;
          this.nodeMenu.active = false;
          gameLogic.updateRewardIcon(constant.SHARE_FUNCTION.CLICK_BOX, this.spIcon);
        }

        onBtnBoxClick() {
          if (this.isOpenBox) {
            return;
          }

          this.curClick++;

          if (this.curClick > this.clickTimes) {
            //TODO 打开宝箱
            this.isOpenBox = true; //切换展示

            this.showReward();
          } else {
            this.curProgress += 20;
            this.curProgress = this.curProgress > 100 ? 100 : this.curProgress;
          }
        }

        showReward() {
          this.nodeClickBtn.active = false;
          this.progress.node.active = false;
          this.nodeBox.active = false;
          this.nodeReward.active = true;
          this.nodeMenu.active = true;
          this.lbReward.string = `+${fightConstants.CLICK_BOX_REWARD}`;
          this.rewardValue = fightConstants.CLICK_BOX_REWARD; //TODO 展示一倍或者三倍奖励
          // playerData.instance.updatePlayerInfo('gold', fightConstants.CLICK_BOX_REWARD);
        }

        update(deltaTime) {
          this.scheduleTime += deltaTime;

          if (this.scheduleTime >= 0.1) {
            //100ms减3%
            this.curProgress -= 3;
            this.curProgress = this.curProgress < 0 ? 0 : this.curProgress;
            this.scheduleTime = 0;
          }

          this.progress.progress = this.curProgress / 100;
        }

        onBtnNormalClick() {
          gameLogic.addGold(fightConstants.CLICK_BOX_REWARD);
          this.close();
        }

        onBtnDoubleClick() {
          gameLogic.openReward(constant.SHARE_FUNCTION.CLICK_BOX, err => {
            if (!err) {
              gameLogic.addGold(fightConstants.CLICK_BOX_REWARD * 2);
              this.close();
            }
          });
        }

        close() {
          uiManager.instance.hideDialog('fight/clickBox');
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "progress", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodeReward", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbReward", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nodeBox", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "nodeMenu", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "nodeClickBtn", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/signInItem.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './resourceUtil.ts', './constant.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, SpriteFrame, Sprite, Node, Label, _decorator, Component, Animation, clientEvent, resourceUtil, constant, localConfig, playerData, uiManager, gameLogic;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Node = module.Node;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
      Animation = module.Animation;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      gameLogic = module.gameLogic;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _temp;

      cclegacy._RF.push({}, "8a6efh8jF9Js7ZZXyAL57KG", "signInItem", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let signInItem = exports('signInItem', (_dec = ccclass("signInItem"), _dec2 = property(SpriteFrame), _dec3 = property(SpriteFrame), _dec4 = property(Sprite), _dec5 = property(SpriteFrame), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property(Label), _dec10 = property(Node), _dec11 = property(Label), _dec(_class = (_class2 = (_temp = class signInItem extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "sfBgBlue", _descriptor, this);

          _initializerDefineProperty(this, "sfYellow", _descriptor2, this);

          _initializerDefineProperty(this, "spReward", _descriptor3, this);

          _initializerDefineProperty(this, "sfGold", _descriptor4, this);

          _initializerDefineProperty(this, "nodeTick", _descriptor5, this);

          _initializerDefineProperty(this, "nodeBtnFillSign", _descriptor6, this);

          _initializerDefineProperty(this, "nodeBtnAfterFillSign", _descriptor7, this);

          _initializerDefineProperty(this, "lbDayIndex", _descriptor8, this);

          _initializerDefineProperty(this, "nodeLight", _descriptor9, this);

          _initializerDefineProperty(this, "lbValue", _descriptor10, this);

          _defineProperty(this, "_parent", null);

          _defineProperty(this, "itemInfo", null);

          _defineProperty(this, "isHadCar", null);
        }

        start() {// Your initialization goes here.
        }

        init(itemInfo, parent) {
          this._parent = parent;
          this.itemInfo = itemInfo;
          this.lbValue.string = itemInfo.rewardType === constant.REWARD_TYPE.CAR ? '' : String(itemInfo.amount);
          this.lbDayIndex.string = String(itemInfo.ID);
          this.setIcon(itemInfo.rewardType);
          this.setStatus(itemInfo.status);
          this.node.getComponent(Sprite).spriteFrame = Number(itemInfo.ID) >= 7 ? this.sfBgBlue : this.sfYellow;
        }

        setIcon(type) {
          switch (type) {
            case constant.REWARD_TYPE.DIAMOND:
              break;

            case constant.REWARD_TYPE.GOLD:
              this.spReward.spriteFrame = this.sfGold;
              break;

            case constant.REWARD_TYPE.CAR:
              let targetCar = localConfig.instance.queryByID('car', this.itemInfo.amount);
              let carModel = targetCar.model;

              if (playerData.instance.isHadCarAndDuringPeriod(this.itemInfo.amount)) {
                this.spReward.spriteFrame = this.sfGold;

                if (this.itemInfo.ID == 2) {
                  this.lbValue.string = String(constant.GOLD_REWARD.SECOND);
                } else if (this.itemInfo.ID == 7) {
                  this.lbValue.string = String(constant.GOLD_REWARD.SEVENT);
                }
              } else {
                resourceUtil.setCarIcon(carModel, this.spReward, false, () => {});
              }

              break;
          }
        }

        setStatus(status) {
          switch (status) {
            case constant.SIGNIN_REWARD_STATUS.RECEIVED:
              this.showItemUI(false, true, false, false);
              break;

            case constant.SIGNIN_REWARD_STATUS.RECEIVABLE:
              this.showItemUI(true, false, false, false);
              break;

            case constant.SIGNIN_REWARD_STATUS.UNRECEIVABLE:
              this.showItemUI(false, false, false, false);
              break;

            case constant.SIGNIN_REWARD_STATUS.FILL_SIGNIN:
              this.showItemUI(false, false, true, false);
              break;

            case constant.SIGNIN_REWARD_STATUS.AFTER_FILL_SIGNIN:
              this.showItemUI(true, false, false, true);
              break;
          }
        }

        showItemUI(isShowLight, isShowTick, isShowBtnFillSignIn, isShowBtnReceive) {
          this.nodeLight.active = isShowLight;
          let lightAni = this.nodeLight.getComponent(Animation);
          isShowLight ? lightAni.play() : lightAni.stop();
          this.nodeTick.active = isShowTick;
          this.nodeBtnFillSign.active = isShowBtnFillSignIn;
          this.nodeBtnAfterFillSign.active = isShowBtnReceive;
        }
        /**
         * 点击补签后的领取按钮触发，或者点击当前可领取触发
         */


        onBtnAfterFillSignClick() {
          if (this.itemInfo.status === constant.SIGNIN_REWARD_STATUS.AFTER_FILL_SIGNIN || this.itemInfo.status === constant.SIGNIN_REWARD_STATUS.RECEIVABLE) {
            this._parent.receiveReward(this.itemInfo, false, this.markReceived.bind(this));
          }
        }
        /**
         * 标记为已领取
         */


        markReceived() {
          this.itemInfo.status = constant.SIGNIN_REWARD_STATUS.RECEIVED;
          this.setStatus(this.itemInfo.status); //记录车领取的时间

          if ((this.itemInfo.ID === 2 || this.itemInfo.ID === 7) && !this.isHadCar) {
            playerData.instance.updateDictGetCarTime(this.itemInfo.amount);
          } //添加已领取奖励的天数


          if (this.itemInfo.ID) {
            playerData.instance.updateSignInReceivedDays(this.itemInfo.ID);
            clientEvent.dispatchEvent('updateSignIn');
          }

          this.close();
        }

        close() {
          uiManager.instance.shiftFromPopupSeq('common/showReward');
          let receiveStatus = playerData.instance.getSignInReceivedInfo();
          let isAllReceived = receiveStatus.isAllReceived;

          if (!isAllReceived) {
            uiManager.instance.pushToPopupSeq('signIn/signIn', 'signIn', {});
          } else {
            uiManager.instance.shiftFromPopupSeq("common/showReward");
          }
        }
        /**
         * 标记为补签后可以领取
         */


        markAfterFillSignIn() {
          this.itemInfo.status = constant.SIGNIN_REWARD_STATUS.AFTER_FILL_SIGNIN;
          this.setStatus(this.itemInfo.status);
          playerData.instance.updateSignInFillSignInDays(this.itemInfo.ID, false);
        }
        /**
         * 补签按钮
         */


        onBtnFillSignInClick() {
          gameLogic.openReward(constant.SHARE_FUNCTION.FILL_SIGNIN, err => {
            if (!err) {
              this.markAfterFillSignIn();
            }
          });
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sfBgBlue", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sfYellow", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spReward", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sfGold", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "nodeTick", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "nodeBtnFillSign", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "nodeBtnAfterFillSign", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "lbDayIndex", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "nodeLight", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "lbValue", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/lodash.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "8cbacDdVTBOgZQMyvQzOeAz", "lodash", undefined);

      const {
        ccclass
      } = _decorator;
      let lodash = exports('lodash', (_dec = ccclass("lodash"), _dec(_class = (_temp = _class2 = class lodash {
        /* class member could be defined like this */
        // dummy = '';
        static find(collection, predicate) {
          var result;

          if (!Array.isArray(collection)) {
            collection = this.toArray(collection);
          }

          result = collection.filter(predicate);

          if (result.length) {
            return result[0];
          }

          return undefined;
        }

        static forEach(collection, iteratee) {
          if (!Array.isArray(collection)) {
            const array = this.toArrayKey(collection);
            array.forEach(function (value, index, arr) {
              const key1 = value['key'];
              const value1 = value['value'];
              iteratee(value1, key1, collection);
            });
          } else {
            collection.forEach(iteratee);
          }
        }

        static cloneDeep(sObj) {
          if (sObj === null || typeof sObj !== "object") {
            return sObj;
          }

          let s = {};

          if (sObj.constructor === Array) {
            s = [];
          }

          for (let i in sObj) {
            if (sObj.hasOwnProperty(i)) {
              s[i] = this.cloneDeep(sObj[i]);
            }
          }

          return s;
        }

        static map(collection, iteratee) {
          if (!Array.isArray(collection)) {
            collection = this.toArray(collection);
          }

          const arr = [];
          collection.forEach(function (value, index, array) {
            arr.push(iteratee(value, index, array));
          });
          return arr;
        }

        static random(min, max) {
          var r = Math.random();
          var rr = r * (max - min + 1) + min;
          return Math.floor(rr);
        }

        static toArrayKey(srcObj) {
          const resultArr = []; // to array

          for (let key in srcObj) {
            if (!srcObj.hasOwnProperty(key)) {
              continue;
            }

            resultArr.push({
              key: key,
              value: srcObj[key]
            });
          }

          return resultArr;
        }

        static toArray(srcObj) {
          const resultArr = []; // to array

          for (let key in srcObj) {
            if (!srcObj.hasOwnProperty(key)) {
              continue;
            }

            resultArr.push(srcObj[key]);
          }

          return resultArr;
        }

        static filter(collection, iteratees) {
          if (!Array.isArray(collection)) {
            collection = this.toArray(collection);
          }

          return collection.filter(iteratees);
        }

        static isEqual(x, y) {
          const in1 = x instanceof Object;
          const in2 = y instanceof Object;

          if (!in1 || !in2) {
            return x === y;
          }

          if (Object.keys(x).length !== Object.keys(y).length) {
            return false;
          }

          for (let p in x) {
            const a = x[p] instanceof Object;
            const b = y[p] instanceof Object;

            if (a && b) {
              return this.isEqual(x[p], y[p]);
            } else if (x[p] !== y[p]) {
              return false;
            }
          }

          return true;
        }

        static pullAllWith(array, value, comparator) {
          value.forEach(function (item) {
            const res = array.filter(function (n) {
              return comparator(n, item);
            });
            res.forEach(function (item) {
              var index = array.indexOf(item);

              if (array.indexOf(item) !== -1) {
                array.splice(index, 1);
              }
            });
          });
          return array;
        }

        static now() {
          return Date.now();
        }

        static pullAll(array, value) {
          value.forEach(function (item) {
            const index = array.indexOf(item);

            if (array.indexOf(item) !== -1) {
              array.splice(index, 1);
            }
          });
          return array;
        }

        static forEachRight(collection, iteratee) {
          if (!Array.isArray(collection)) {
            collection = this.toArray(collection);
          }

          for (let i = collection.length - 1; i >= 0; i--) {
            const ret = iteratee(collection[i]);
            if (!ret) break;
          }
        }

        static startsWith(str, target, position) {
          str = str.substr(position);
          return str.startsWith(target);
        }

        static endsWith(str, target, position) {
          str = str.substr(position);
          return str.endsWith(target);
        }

        static remove(array, predicate) {
          const result = [];
          const indexes = [];
          array.forEach(function (item, index) {
            if (predicate(item)) {
              result.push(item);
              indexes.push(index);
            }
          });
          this.basePullAt(array, indexes);
          return result;
        }

        static basePullAt(array, indexes) {
          var length = array ? indexes.length : 0;
          var lastIndex = length - 1;
          var previous;

          while (length--) {
            var index = indexes[length];

            if (length === lastIndex || index !== previous) {
              previous = index;
              Array.prototype.splice.call(array, index, 1);
            }
          }

          return array;
        }

        static findIndex(array, predicate, fromIndex) {
          array = array.slice(fromIndex);
          var i;

          if (typeof predicate === "function") {
            for (i = 0; i < array.length; i++) {
              if (predicate(array[i])) {
                return i;
              }
            }
          } else if (Array.isArray(predicate)) {
            for (i = 0; i < array.length; i++) {
              var key = predicate[0];
              var vaule = true;

              if (predicate.length > 1) {
                vaule = predicate[1];
              }

              if (array[i][key] === vaule) {
                return i;
              }
            }
          } else {
            for (i = 0; i < array.length; i++) {
              if (array[i] === predicate) {
                return i;
              }
            }
          }

          return -1;
        }

        static concat() {
          var length = arguments.length;

          if (!length) {
            return [];
          }

          var array = arguments[0];
          var index = 1;

          while (index < length) {
            array = array.concat(arguments[index]);
            index++;
          }

          return array;
        }

        static isNumber(value) {
          return typeof value === 'number';
        }

        static indexOf(array, value, fromIndex) {
          array = array.slice(fromIndex);
          return array.indexOf(value);
        }

        static join(array, separator) {
          if (array === null) return '';
          var result = '';
          array.forEach(function (item) {
            result += item + separator;
          });
          return result.substr(0, result.length - 1);
        }

        static split(str, separator, limit) {
          return str.split(separator, limit);
        }

        static max(array) {
          if (array && array.length) {
            var result;

            for (var i = 0; i < array.length; i++) {
              if (i === 0) {
                result = array[0];
              } else if (result < array[i]) {
                result = array[i];
              }
            }

            return result;
          }

          return undefined;
        }

        static drop(array, n) {
          var length = array === null ? 0 : array.length;

          if (!length) {
            return [];
          }

          return array.slice(n);
        }

        static flattenDeep(arr) {
          return arr.reduce((prev, cur) => {
            return prev.concat(
            /*Array.isArray(cur) ? this.flattenDeep(cur) :*/
            cur);
          });
        }

        static uniq(array) {
          const result = [];
          array.forEach(function (item) {
            if (result.indexOf(item) === -1) {
              result.push(item);
            }
          });
          return result;
        }

        static isNaN(value) {
          // An `NaN` primitive is the only value that is not equal to itself.
          // Perform the `toStringTag` check first to avoid errors with some
          // ActiveX objects in IE.
          return this.isNumber(value) && value !== +value;
        }

        static chunk(array, size) {
          const length = array === null ? 0 : array.length;

          if (!length || size < 1) {
            return [];
          }

          const result = [];

          while (array.length > size) {
            result.push(array.slice(0, size));
            array = array.slice(size);
          }

          result.push(array);
          return result;
        }

        static toFinite(value) {
          const INFINITY = 1 / 0;
          const MAX_INTEGER = 1.7976931348623157e+308;

          if (!value) {
            return value === 0 ? value : 0;
          }

          value = Number(value);

          if (value === INFINITY || value === -INFINITY) {
            const sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }

          return value === value ? value : 0;
        }

        static baseRange(start, end, step, fromRight) {
          const nativeMax = Math.max;
          const nativeCeil = Math.ceil;
          let index = -1,
              length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
              result = Array(length);

          while (length--) {
            result[fromRight ? length : ++index] = start;
            start += step;
          }

          return result;
        }

        static isObject(value) {
          const type = typeof value;
          return value !== null && (type === 'object' || type === 'function');
        }

        static isLength(value) {
          return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= lodash.MAX_SAFE_INTEGER;
        }

        static isArrayLike(value) {
          return value !== null && this.isLength(value.length)
          /*&& !isFunction(value)*/
          ;
        }

        static eq(value, other) {
          return value === other || value !== value && other !== other;
        }

        static isIndex(value, length) {
          const type = typeof value;
          length = length === null ? lodash.MAX_SAFE_INTEGER : length;
          const reIsUint = /^(?:0|[1-9]\d*)$/;
          return !!length && (type === 'number' || type !== 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 === 0 && value < length;
        }

        static isIterateeCall(value, index, object) {
          if (!this.isObject(object)) {
            return false;
          }

          var type = typeof index;

          if (type === 'number' ? this.isArrayLike(object) && this.isIndex(index, object.length) : type === 'string' && index in object) {
            return this.eq(object[index], value);
          }

          return false;
        }

        static createRange(fromRight) {
          return ((start, end, step) => {
            if (step && typeof step !== 'number' && this.isIterateeCall(start, end, step)) {
              end = step = undefined;
            } // Ensure the sign of `-0` is preserved.


            start = this.toFinite(start);

            if (end === undefined) {
              end = start;
              start = 0;
            } else {
              end = this.toFinite(end);
            }

            step = step === undefined ? start < end ? 1 : -1 : this.toFinite(step);
            return this.baseRange(start, end, step, fromRight);
          }).bind(this);
        }

        static maxBy(array, predicate) {
          if (array && array.length) {
            let result = -1;
            let objResult = -1;

            for (let i = 0; i < array.length; i++) {
              if (i === 0) {
                result = predicate(array[0]);
                objResult = array[0];
              } else if (result < array[i]) {
                result = array[i];
                objResult = array[i];
              }
            }

            return objResult;
          }

          return undefined;
        }

        static minBy(array, predicate) {
          if (array && array.length) {
            let result = -1;
            let objResult = -1;

            for (var i = 0; i < array.length; i++) {
              if (i === 0) {
                result = predicate(array[0]);
                objResult = array[0];
              } else if (result > array[i]) {
                result = predicate(array[i]);
                objResult = array[i];
              }
            }

            return objResult;
          }

          return undefined;
        }

        static sumBy(collection, predicate) {
          let sum = 0;

          for (let key in collection) {
            sum += predicate(collection[key]);
          }

          return sum;
        }

        static countBy(collection) {
          const objRet = {};

          for (let key in collection) {
            const value = collection[key];

            if (objRet.hasOwnProperty(value)) {
              objRet[value] += 1;
            } else {
              objRet[value] = 1;
            }
          }

          return objRet;
        }

      }, _defineProperty(_class2, "MAX_SAFE_INTEGER", 9007199254740991), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/poolManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, instantiate, NodePool;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
      NodePool = module.NodePool;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "907776q4iZNubarZf3Ut3A8", "poolManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let poolManager = exports('poolManager', (_dec = ccclass("poolManager"), _dec(_class = (_temp = _class2 = class poolManager {
        constructor() {
          _defineProperty(this, "dictPool", {});

          _defineProperty(this, "dictPrefab", {});
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new poolManager();
          return this._instance;
        }
        /**
         * 根据预设从对象池中获取对应节点
         */


        getNode(prefab, parent) {
          let name = prefab.data.name;
          this.dictPrefab[name] = prefab;
          let node;

          if (this.dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            let pool = this.dictPool[name];

            if (pool.size() > 0) {
              node = pool.get();
            } else {
              node = instantiate(prefab);
            }
          } else {
            //没有对应对象池，创建他！
            let pool = new NodePool();
            this.dictPool[name] = pool;
            node = instantiate(prefab);
          }

          node.parent = parent;
          return node;
        }
        /**
         * 将对应节点放回对象池中
         */


        putNode(node) {
          let name = node.name;
          let pool = null;

          if (this.dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            pool = this.dictPool[name];
          } else {
            //没有对应对象池，创建他！
            pool = new NodePool();
            this.dictPool[name] = pool;
          }

          pool.put(node);
        }
        /**
         * 根据名称，清除对应对象池
         */


        clearPool(name) {
          if (this.dictPool.hasOwnProperty(name)) {
            let pool = this.dictPool[name];
            pool.clear();
          }
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpriteFrameSet.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _defineProperty, _initializerDefineProperty, cclegacy, SpriteFrame, _decorator;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _defineProperty = module.defineProperty;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteFrame = module.SpriteFrame;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "93cd23dxExEBLbD/xbMp1PN", "SpriteFrameSet", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let SpriteFrameSet = exports('default', (_dec = ccclass("SpriteFrameSet"), _dec2 = property({
        type: SpriteFrame
      }), _dec(_class = (_class2 = (_temp = class SpriteFrameSet {
        constructor() {
          _defineProperty(this, "name", 'SpriteFrameSet');

          _initializerDefineProperty(this, "language", _descriptor, this);

          _initializerDefineProperty(this, "spriteFrame", _descriptor2, this);
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "language", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/lotteryItem.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './resourceUtil.ts', './constant.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './LanguageData.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, SpriteFrame, Sprite, Label, _decorator, Component, resourceUtil, constant, localConfig, playerData, uiManager, i18n;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      i18n = module.i18n;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "93fc8seXTpPJqvHF6Jlpios", "lotteryItem", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let lotteryItem = exports('lotteryItem', (_dec = ccclass("lotteryItem"), _dec2 = property(SpriteFrame), _dec3 = property(Sprite), _dec4 = property(Label), _dec(_class = (_class2 = (_temp = class lotteryItem extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "imgGold", _descriptor, this);

          _initializerDefineProperty(this, "spItem", _descriptor2, this);

          _initializerDefineProperty(this, "lbValue", _descriptor3, this);

          _defineProperty(this, "carInfo", void 0);
        }

        start() {// Your initialization goes here.
        }

        show(car) {
          this.carInfo = localConfig.instance.queryByID('car', car);
          resourceUtil.setCarIcon(this.carInfo.model, this.spItem, false, () => {});
        }

        showReward(lottery) {
          console.log(this.carInfo.ID);

          if (!playerData.instance.hasCar(this.carInfo.ID)) {
            //该车还没有，可以直接追加
            //调用奖励界面加车
            let rewardInfo = {
              rewardType: constant.REWARD_TYPE.CAR,
              amount: 1,
              ID: this.carInfo.ID
            };
            uiManager.instance.showDialog('common/showReward', [rewardInfo, false, i18n.t('showReward.title'), () => {
              lottery.receiveCarTimes += 1;
            }]);
          } else {
            //没有加车,转换成金币
            let titleInfo = {
              rewardType: constant.REWARD_TYPE.GOLD,
              amount: constant.LOTTERY.EXCHANGE,
              ID: this.carInfo.ID
            };
            uiManager.instance.showDialog('common/showReward', [titleInfo, false, i18n.t('showReward.title'), () => {}, i18n.t("showReward.alreadyHadCar")]);
          }
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "imgGold", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spItem", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbValue", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/roadPoint.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './fightConstants.ts', './resourceUtil.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Enum, Node, _decorator, Vec3, Component, macro, fightConstants, resourceUtil;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Enum = module.Enum;
      Node = module.Node;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Component = module.Component;
      macro = module.macro;
    }, function (module) {
      fightConstants = module.fightConstants;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }],
    execute: function () {
      exports({
        ROAD_MOVE_TYPE: void 0,
        ROAD_POINT_TYPE: void 0
      });

      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

      cclegacy._RF.push({}, "953fazcJb1LuJlDQlkFCkFG", "roadPoint", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let ROAD_POINT_TYPE;

      (function (ROAD_POINT_TYPE) {
        ROAD_POINT_TYPE[ROAD_POINT_TYPE["\u666E\u901A\u8282\u70B9"] = fightConstants.ROAD_POINT_TYPE.NORMAL] = "\u666E\u901A\u8282\u70B9";
        ROAD_POINT_TYPE[ROAD_POINT_TYPE["\u5F00\u59CB\u8282\u70B9"] = fightConstants.ROAD_POINT_TYPE.START] = "\u5F00\u59CB\u8282\u70B9";
        ROAD_POINT_TYPE[ROAD_POINT_TYPE["\u63A5\u5BA2\u8282\u70B9"] = fightConstants.ROAD_POINT_TYPE.GREETING] = "\u63A5\u5BA2\u8282\u70B9";
        ROAD_POINT_TYPE[ROAD_POINT_TYPE["\u9001\u5BA2\u8282\u70B9"] = fightConstants.ROAD_POINT_TYPE.PLATFORM] = "\u9001\u5BA2\u8282\u70B9";
        ROAD_POINT_TYPE[ROAD_POINT_TYPE["\u7ED3\u675F\u8282\u70B9"] = fightConstants.ROAD_POINT_TYPE.END] = "\u7ED3\u675F\u8282\u70B9";
        ROAD_POINT_TYPE[ROAD_POINT_TYPE["AI\u5F00\u59CB\u8282\u70B9"] = fightConstants.ROAD_POINT_TYPE.AI_START] = "AI\u5F00\u59CB\u8282\u70B9";
      })(ROAD_POINT_TYPE || (ROAD_POINT_TYPE = exports('ROAD_POINT_TYPE', {})));

      Enum(ROAD_POINT_TYPE);
      let ROAD_MOVE_TYPE;

      (function (ROAD_MOVE_TYPE) {
        ROAD_MOVE_TYPE[ROAD_MOVE_TYPE["\u76F4\u7EBF\u884C\u8D70"] = fightConstants.ROAD_MOVE_TYPE.LINE] = "\u76F4\u7EBF\u884C\u8D70";
        ROAD_MOVE_TYPE[ROAD_MOVE_TYPE["\u66F2\u7EBF\u884C\u8D70"] = fightConstants.ROAD_MOVE_TYPE.BEND] = "\u66F2\u7EBF\u884C\u8D70";
      })(ROAD_MOVE_TYPE || (ROAD_MOVE_TYPE = exports('ROAD_MOVE_TYPE', {})));

      Enum(ROAD_MOVE_TYPE);
      let roadPoint = exports('roadPoint', (_dec = ccclass("roadPoint"), _dec2 = property({
        displayName: '类型',
        type: ROAD_POINT_TYPE,
        displayOrder: 1
      }), _dec3 = property({
        displayName: '下一站',
        type: Node,
        displayOrder: 2
      }), _dec4 = property({
        displayName: '行走方式',
        type: ROAD_MOVE_TYPE,
        displayOrder: 3
      }), _dec5 = property({
        displayName: '顺时针',
        displayOrder: 4,
        visible: function () {
          return this.moveType === fightConstants.ROAD_MOVE_TYPE.BEND;
        }
      }), _dec6 = property({
        displayName: '顾客方向',
        displayOrder: 4,
        visible: function () {
          return this.type === fightConstants.ROAD_POINT_TYPE.GREETING || this.type === fightConstants.ROAD_POINT_TYPE.PLATFORM;
        }
      }), _dec7 = property({
        displayName: '延迟生成/秒',
        displayOrder: 5,
        visible: function () {
          return this.type === fightConstants.ROAD_POINT_TYPE.AI_START;
        }
      }), _dec8 = property({
        displayName: '生成频率/秒',
        displayOrder: 5,
        visible: function () {
          return this.type === fightConstants.ROAD_POINT_TYPE.AI_START;
        }
      }), _dec9 = property({
        displayName: '车辆行驶速度',
        displayOrder: 5,
        visible: function () {
          return this.type === fightConstants.ROAD_POINT_TYPE.AI_START;
        }
      }), _dec10 = property({
        displayName: '产生车辆(,分隔)',
        displayOrder: 5,
        visible: function () {
          return this.type === fightConstants.ROAD_POINT_TYPE.AI_START;
        }
      }), _dec(_class = (_class2 = (_temp = class roadPoint extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "type", _descriptor, this);

          _initializerDefineProperty(this, "next", _descriptor2, this);

          _initializerDefineProperty(this, "moveType", _descriptor3, this);

          _initializerDefineProperty(this, "clockwise", _descriptor4, this);

          _initializerDefineProperty(this, "direction", _descriptor5, this);

          _initializerDefineProperty(this, "delayTime", _descriptor6, this);

          _initializerDefineProperty(this, "genInterval", _descriptor7, this);

          _initializerDefineProperty(this, "carSpeed", _descriptor8, this);

          _initializerDefineProperty(this, "cars", _descriptor9, this);

          _defineProperty(this, "arrCars", []);

          _defineProperty(this, "_generateCb", null);
        }

        start() {
          // Your initialization goes here.
          this.arrCars = this.cars.split(',');
        }

        startGenerateCar(generateCb) {
          if (this.type !== fightConstants.ROAD_POINT_TYPE.AI_START) {
            return;
          }

          this._generateCb = generateCb;
          this.stopGenerateCar();
          this.scheduleOnce(this.delayStartGen, this.delayTime); //触发资源预加载

          resourceUtil.getCarsBatch(this.arrCars, () => {}, () => {});
        }

        delayStartGen() {
          this.scheduleGen(); //时间到了先生成，然后再过一段时间再生成

          this.schedule(this.scheduleGen, this.genInterval, macro.REPEAT_FOREVER);
        }

        scheduleGen() {
          //随机生成车辆
          let rand = Math.floor(Math.random() * this.arrCars.length);

          if (this._generateCb) {
            this._generateCb(this, this.arrCars[rand]);
          }
        }

        stopGenerateCar() {
          this.unschedule(this.delayStartGen);
          this.unschedule(this.scheduleGen);
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return ROAD_POINT_TYPE.普通节点;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "next", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "moveType", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return ROAD_MOVE_TYPE.直线行走;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "clockwise", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Vec3();
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "delayTime", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "genInterval", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 3;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "carSpeed", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.05;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "cars", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return '201';
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/revive.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './constant.ts', './uiManager.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Sprite, Widget, _decorator, Component, clientEvent, constant, uiManager, gameLogic;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Sprite = module.Sprite;
      Widget = module.Widget;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      gameLogic = module.gameLogic;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "95f63L653dBgLBdIgYWzpHv", "revive", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let revive = exports('revive', (_dec = ccclass("revive"), _dec2 = property(Sprite), _dec3 = property(Sprite), _dec4 = property(Widget), _dec(_class = (_class2 = (_temp = class revive extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "spCountDown", _descriptor, this);

          _initializerDefineProperty(this, "spIcon", _descriptor2, this);

          _initializerDefineProperty(this, "wgMenu", _descriptor3, this);

          _defineProperty(this, "closeCb", null);

          _defineProperty(this, "countDownTime", 0);

          _defineProperty(this, "currentTime", 0);

          _defineProperty(this, "isCountDowning", false);
        }

        start() {// Your initialization goes here.
        }

        show(closeCallback) {
          this.closeCb = closeCallback; //默认展示满额，倒计时下来最后为0

          this.countDownTime = 5;
          this.currentTime = 0;
          this.spCountDown.fillRange = 1;
          this.isCountDowning = true;
          gameLogic.updateRewardIcon(constant.SHARE_FUNCTION.RELIVE, this.spIcon);
        }

        onBtnReviveClick() {
          this.isCountDowning = false;
          gameLogic.openReward(constant.SHARE_FUNCTION.RELIVE, err => {
            if (!err) {
              clientEvent.dispatchEvent('revive');
              uiManager.instance.hideDialog('fight/revive');
            } else {
              //失败继续倒计时
              this.isCountDowning = true;
            }
          });
        }

        onBtnSkipClick() {
          this.isCountDowning = false;
          uiManager.instance.hideDialog('fight/revive');
          this.closeCb && this.closeCb();
        } // update (dt: number) {
        //     if (!this.isCountDowning) {
        //         return;
        //     }
        //     this.currentTime += dt;
        //     let spare = this.countDownTime - this.currentTime;
        //     if (spare <= 0) {
        //         spare = 0;
        //         //触发倒计时结束
        //         this.isCountDowning = false;
        //         this.onBtnSkipClick();
        //     }
        //     let percent = spare / this.countDownTime; // 展示百分比
        //     this.spCountDown.fillRange = percent;
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spCountDown", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wgMenu", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/blockInputEvent.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Component, Node, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      Node = module.Node;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "968ba6c9F9AupY/AbKjAj++", "blockInputEvent", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let blockInputEvent = exports('blockInputEvent', (_dec = ccclass("blockInputEvent"), _dec(_class = class blockInputEvent extends Component {
        /* class member could be defined like this */
        // dummy = '';

        /* use `property` decorator if your want the member to be serializable */
        // @property
        // serializableDummy = 0;
        start() {// Your initialization goes here.
        }

        onEnable() {
          this.node.on(Node.EventType.TOUCH_START, this.stopPropagation, this);
          this.node.on(Node.EventType.TOUCH_END, this.stopPropagation, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this.stopPropagation, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.stopPropagation, this);
          this.node.on(Node.EventType.MOUSE_DOWN, this.stopPropagation, this);
          this.node.on(Node.EventType.MOUSE_ENTER, this.stopPropagation, this);
          this.node.on(Node.EventType.MOUSE_MOVE, this.stopPropagation, this);
          this.node.on(Node.EventType.MOUSE_LEAVE, this.stopPropagation, this);
          this.node.on(Node.EventType.MOUSE_UP, this.stopPropagation, this);
          this.node.on(Node.EventType.MOUSE_WHEEL, this.stopPropagation, this);
        }

        onDisable() {
          this.node.off(Node.EventType.TOUCH_START, this.stopPropagation, this);
          this.node.off(Node.EventType.TOUCH_END, this.stopPropagation, this);
          this.node.off(Node.EventType.TOUCH_MOVE, this.stopPropagation, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this.stopPropagation, this);
          this.node.off(Node.EventType.MOUSE_DOWN, this.stopPropagation, this);
          this.node.off(Node.EventType.MOUSE_ENTER, this.stopPropagation, this);
          this.node.off(Node.EventType.MOUSE_MOVE, this.stopPropagation, this);
          this.node.off(Node.EventType.MOUSE_LEAVE, this.stopPropagation, this);
          this.node.off(Node.EventType.MOUSE_UP, this.stopPropagation, this);
          this.node.off(Node.EventType.MOUSE_WHEEL, this.stopPropagation, this);
        }

        stopPropagation(event) {
          event.propagationImmediateStopped = true;
          event.propagationStopped = true;
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/playerData.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './configuration.ts', './constant.ts', './util.ts', './localConfig.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, configuration, constant, util, localConfig;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      configuration = module.configuration;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      util = module.util;
    }, function (module) {
      localConfig = module.localConfig;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "985d59n5DNIrIcY9mIscZXN", "playerData", undefined);

      const {
        ccclass,
        property
      } = _decorator; // {
      //     level: number,
      //     gold: number,
      //     diamond: number,
      //     realLevel: number,
      //     passCheckPoint: boolean,
      //     createDate: any,
      //     currentCar: number,
      //     cars: number[],
      //     onlineRewardTime: number,
      //     dictBuyTask: { [name: string]: any },
      //     signInInfo: { [name: string]: any },
      //     dictGetCarTime: { [name: string]: any }
      // };

      let playerData = exports('playerData', (_dec = ccclass("playerData"), _dec(_class = (_temp = _class2 = class playerData extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "serverTime", 0);

          _defineProperty(this, "localTime", 0);

          _defineProperty(this, "showCar", 0);

          _defineProperty(this, "isComeFromBalance", false);

          _defineProperty(this, "userId", '');

          _defineProperty(this, "playerInfo", {});

          _defineProperty(this, "history", null);

          _defineProperty(this, "settings", null);

          _defineProperty(this, "isNewBee", false);

          _defineProperty(this, "dataVersion", '');

          _defineProperty(this, "signInInfo", null);
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new playerData();
          return this._instance;
        }

        loadGlobalCache() {
          let userId = configuration.instance.getUserId();

          if (userId) {
            this.userId = userId;
          }
        }

        loadFromCache() {
          //读取玩家基础数据
          this.playerInfo = this.loadDataByKey(constant.LOCAL_CACHE.PLAYER);

          if (this.playerInfo.currentCar) {
            this.showCar = this.playerInfo.currentCar;
          } else {
            this.showCar = constant.INITIAL_CAR;
          }

          this.history = this.loadDataByKey(constant.LOCAL_CACHE.HISTORY); // this.bag = this.loadDataByKey(constants.LOCAL_CACHE.BAG);

          this.settings = this.loadDataByKey(constant.LOCAL_CACHE.SETTINGS);
        }

        loadDataByKey(keyName) {
          let ret = {};
          let str = configuration.instance.getConfigData(keyName);

          if (str) {
            try {
              ret = JSON.parse(str);
            } catch (e) {
              ret = {};
            }
          }

          return ret;
        }

        createPlayerInfo(loginData) {
          this.playerInfo.level = 1; //默认初始关卡

          this.playerInfo.gold = 0;
          this.playerInfo.realLevel = 1; //真正关卡

          this.playerInfo.passCheckPoint = false; //是否已经通过20关

          this.playerInfo.createDate = new Date(); //记录创建时间

          this.playerInfo.currentCar = constant.INITIAL_CAR; //初始车辆

          this.playerInfo.cars = [];
          this.playerInfo.cars.push(constant.INITIAL_CAR); //拥有的车辆

          this.playerInfo.dictBuyTask = {};
          this.showCar = this.playerInfo.currentCar;
          this.isNewBee = true; //区分新老玩家

          this.playerInfo.signInInfo = {}; //七日签到

          this.playerInfo.dictGetCarTime = {}; //获得车辆的时间

          if (loginData) {
            for (let key in loginData) {
              this.playerInfo[key] = loginData[key];
            }
          } // if (!this.playerInfo.avatarUrl) {
          //     //随机个头像给他
          // }
          // this.playerInfo.dictTask = this.createRandTask();
          // this.playerInfo.taskDate = new Date(); //任务创建时间


          this.savePlayerInfoToLocalCache();
        }

        saveAccount(userId) {
          this.userId = userId;
          configuration.instance.setUserId(userId);
        }
        /**
         * 保存玩家数据
         */


        savePlayerInfoToLocalCache() {
          configuration.instance.setConfigData(constant.LOCAL_CACHE.PLAYER, JSON.stringify(this.playerInfo));
        }
        /**
         * 当数据同步完毕，即被覆盖的情况下，需要将数据写入到本地缓存，以免数据丢失
         */


        saveAll() {
          configuration.instance.setConfigDataWithoutSave(constant.LOCAL_CACHE.PLAYER, JSON.stringify(this.playerInfo));
          configuration.instance.setConfigDataWithoutSave(constant.LOCAL_CACHE.HISTORY, JSON.stringify(this.history));
          configuration.instance.setConfigDataWithoutSave(constant.LOCAL_CACHE.SETTINGS, JSON.stringify(this.settings)); // configuration.instance.setConfigDataWithoutSave(constant.LOCAL_CACHE.BAG, JSON.stringify(this.bag));

          configuration.instance.setConfigData(constant.LOCAL_CACHE.DATA_VERSION, this.dataVersion);
        }
        /**
         * 更新用户信息
         * 例如钻石，金币，道具
         * @param {String} key
         * @param {Number} value
         */


        updatePlayerInfo(key, value) {
          let isChanged = false;

          if (this.playerInfo.hasOwnProperty(key)) {
            if (typeof value === 'number') {
              isChanged = true;
              this.playerInfo[key] += value;

              if (this.playerInfo[key] < 0) {
                this.playerInfo[key] = 0;
              } //return;

            } else if (typeof value === 'boolean' || typeof value === 'string') {
              isChanged = true;
              this.playerInfo[key] = value;
            }
          }

          if (isChanged) {
            //有修改就保存到localcache
            configuration.instance.setConfigData(constant.LOCAL_CACHE.PLAYER, JSON.stringify(this.playerInfo));
          }
        }
        /*********************** 七日签到 ***********************/

        /**
         * 更新签到领取日期，补签状态，如果超过7天则轮回
         */


        updateSignInCurrentDay() {
          if (Object.keys(this.playerInfo.signInInfo).length === 0 || this.isNeedRecycleSignInInfo()) {
            this.createNewSignInInfo();
          } else {
            let offectDays = util.getDeltaDays(this.playerInfo.signInInfo.signInDate, Date.now()); //比较两个时间，为0则今天更新过

            if (offectDays === 0) {
              return;
            } //将昨天“补签后”但是没领取奖励重置为“补签”状态


            this.updateSignInFillSignInDays(0, true); //更新领取今日签到信息

            this.playerInfo.signInInfo.currentDay += offectDays; //当测试时间差异的时候将当前的时间设置为第一天

            if (this.playerInfo.signInInfo.currentDay <= 0) {
              this.createNewSignInInfo();
            }

            this.playerInfo.signInInfo.currentDay > constant.MAX_SIGNIN_DAY ? constant.MAX_SIGNIN_DAY : this.playerInfo.signInInfo.currentDay;
            this.playerInfo.signInInfo.signInDate = Date.now();
          }

          this.savePlayerInfoToLocalCache();
        }
        /**
         * 创建新的签到信息
         */


        createNewSignInInfo() {
          if (!this.playerInfo.hasOwnProperty('signInInfo')) {
            this.playerInfo.signInInfo = {};
            this.playerInfo.dictGetCarTime = {};
          }

          let signInInfo = this.playerInfo.signInInfo; //创建时间

          signInInfo.createDate = Date.now(); //签到时间

          signInInfo.signInDate = Date.now(); //当前天数

          signInInfo.currentDay = 1; //已经领取天数

          signInInfo.receivedDays = []; //补签后可以领取的天数

          signInInfo.afterFillSignInDays = [];
          this.savePlayerInfoToLocalCache();
        }
        /**
        * 是否需要重新开始一个新的签到周期
        */


        isNeedRecycleSignInInfo() {
          if (!this.playerInfo.signInInfo) {
            this.createNewSignInInfo();
          }

          let isNeedRecycled = false;
          let diffTime = util.getDeltaDays(this.playerInfo.signInInfo.createDate, Date.now()); //当前日期与创建日期超过七天，1号7号相差6天，第8天进行更新

          if (diffTime >= constant.MAX_SIGNIN_DAY) {
            isNeedRecycled = true;
          }

          return isNeedRecycled;
        }
        /**
         * 更新领取奖励后已领取日期数组
         * @param {Number} day
        */


        updateSignInReceivedDays(day) {
          let receivedDays = this.playerInfo.signInInfo.receivedDays;

          if (Array.isArray(receivedDays) && receivedDays.includes(day)) {
            return;
          }

          receivedDays.push(Number(day));
          this.savePlayerInfoToLocalCache();
        }
        /**
         * 更新补签后变为可领取的日期数组
         * @param {number} day
         * @param {boolean} isClear 是否清空昨天补签完后还未领取的数组
         */


        updateSignInFillSignInDays(day, isClear) {
          let afterFillSignInDays = this.playerInfo.signInInfo.afterFillSignInDays;

          if (!isClear) {
            if (Array.isArray(afterFillSignInDays) && afterFillSignInDays.includes(day)) {
              return;
            }

            afterFillSignInDays.push(Number(day));
          } else {
            afterFillSignInDays.length = 0;
          }

          this.savePlayerInfoToLocalCache();
        }
        /**
         * 返回“当天”还有“全部”的签到奖励领取情况
         * 用来判断“显示领取按钮”，“登陆自动显示签到界面”和“红点提示”
         * @returns {boolean, boolean} isAllReceived是否全部领取， isTodayReceived是否当天已领取
         */


        getSignInReceivedInfo() {
          if (!this.playerInfo.signInInfo) {
            this.createNewSignInInfo();
          }

          let signInInfo = this.playerInfo.signInInfo;
          let isAllReceived = false;
          let isTodayReceived = false;

          if (signInInfo.receivedDays.length < signInInfo.currentDay) {
            isAllReceived = false;
          } else {
            isAllReceived = true;
          }

          if (signInInfo.receivedDays.includes(signInInfo.currentDay)) {
            isTodayReceived = true;
          } else {
            isTodayReceived = false;
          }

          return {
            isAllReceived,
            isTodayReceived
          };
        }
        /**
         * 判断如果已有该车,且还在第一次得到车的周期内则显示“车，领取, 暂不领取”，否则为“金币，双倍领取，普通领取”
         *
         * @param {number} ID 车的ID
         * @returns
         * @memberof playerData
         */


        isHadCarAndDuringPeriod(ID) {
          let createDate = this.playerInfo.signInInfo.createDate;

          if (!this.playerInfo.dictGetCarTime) {
            this.playerInfo.dictGetCarTime = {};
          }

          let getCarDate = this.playerInfo.dictGetCarTime[ID];
          let isHadCar = this.playerInfo.cars.indexOf(ID) !== -1;
          return isHadCar && getCarDate && getCarDate < createDate;
        }
        /**
         * 更新汽车的领取信息
         * @param ID 车的ID
         */


        updateDictGetCarTime(ID) {
          if (!this.playerInfo.dictGetCarTime) {
            this.playerInfo.dictGetCarTime = {};
          }

          this.playerInfo.dictGetCarTime[ID] = this.playerInfo.signInInfo.createDate;
          configuration.instance.setConfigData(constant.LOCAL_CACHE.PLAYER, JSON.stringify(this.playerInfo));
        }
        /**********************************************/


        getLastOnlineRewardTime() {
          if (this.playerInfo.onlineRewardTime) {
            return this.playerInfo.onlineRewardTime;
          }

          this.playerInfo.onlineRewardTime = this.getCurrentTime();
          this.savePlayerInfoToLocalCache();
          return this.playerInfo.onlineRewardTime;
        }
        /**
         * 更新最后一次领取时间
         *
         * @param {number} elapsedTime 已经度过的时间,单位秒
         * @memberof playerData
         */


        updateLastOnlineRewardTime(elapsedTime) {
          let time = this.getCurrentTime() - elapsedTime * 1000;
          this.playerInfo.onlineRewardTime = time;
          this.savePlayerInfoToLocalCache();
        }
        /**
         * 同步服务器时间
         */


        syncServerTime(serverTime) {
          this.serverTime = serverTime;
          this.localTime = Date.now();
        }
        /**
         * 获取当前时间
         */


        getCurrentTime() {
          let diffTime = Date.now() - this.localTime;
          return this.serverTime + diffTime;
        }
        /**
         * 检查玩家是否拥有对应车辆
         *
         * @param {number} carID
         * @memberof playerData
         */


        hasCar(carID) {
          if (carID === constant.INITIAL_CAR) {
            return true;
          }

          if (!this.playerInfo.cars) {
            this.playerInfo.cars = [constant.INITIAL_CAR];
          }

          return this.playerInfo.cars.indexOf(carID) !== -1;
        }

        hasCarCanReceived() {
          let arrCars = localConfig.instance.getCars();

          for (let idx = 0; idx < arrCars.length; idx++) {
            let carInfo = arrCars[idx];

            if (carInfo.type === constant.BUY_CAR_TYPE.GOLD || carInfo.type === constant.BUY_CAR_TYPE.SIGNIN) {
              continue;
            }

            if (this.hasCar(carInfo.ID)) {
              continue;
            }

            if (!this.playerInfo.dictBuyTask || !this.playerInfo.dictBuyTask.hasOwnProperty(carInfo.type)) {
              continue;
            }

            if (this.playerInfo.dictBuyTask[carInfo.type] >= carInfo.num) {
              return true;
            }
          }

          return false;
        }

        finishBuyTask(type, value, isAdd) {
          if (!this.playerInfo.dictBuyTask) {
            this.playerInfo.dictBuyTask = {};
          }

          if (!this.playerInfo.dictBuyTask.hasOwnProperty(type) || !isAdd) {
            this.playerInfo.dictBuyTask[type] = value;
          } else {
            this.playerInfo.dictBuyTask[type] += value;
          }

          this.savePlayerInfoToLocalCache();
        }
        /**
         * 获取任务的进度
         *
         * @param {*} type
         * @memberof playerData
         */


        getBuyTypeProgress(type) {
          if (this.playerInfo.dictBuyTask && this.playerInfo.dictBuyTask.hasOwnProperty(type)) {
            return this.playerInfo.dictBuyTask[type];
          }

          return 0;
        }
        /**
         * 获取当前车辆
         *
         * @returns
         * @memberof playerData
         */


        getCurrentCar() {
          if (!this.playerInfo.currentCar) {
            this.playerInfo.currentCar = constant.INITIAL_CAR;
          }

          return this.playerInfo.currentCar;
        }
        /**
         *
         * 使用某辆车
         * @param {*} carId
         * @returns
         * @memberof playerData
         */


        useCar(carId) {
          if (!this.hasCar(carId)) {
            return false;
          }

          this.playerInfo.currentCar = carId;
          this.savePlayerInfoToLocalCache();
          this.showCar = this.playerInfo.currentCar;
          return true;
        }

        buyCar(carId) {
          if (this.playerInfo.cars.indexOf(carId) !== -1) {
            return true;
          }

          this.playerInfo.cars.push(carId);
          this.savePlayerInfoToLocalCache();
          return true;
        }

        clear() {
          this.playerInfo = {};
          this.settings = {};
          this.saveAll();
        }
        /*********************** 战斗相关 ***********************/
        //关卡完成


        passLevel(rewardMoney) {
          this.playerInfo.level++;
          this.playerInfo.gold += rewardMoney;
          console.log("###1 this.playerInfo.level", this.playerInfo.level, 'this.playerInfo.realLevel', this.playerInfo.realLevel); //标记已经通过20关了

          if (!this.playerInfo.passCheckPoint) {
            if (this.playerInfo.level >= constant.MAX_LEVEL) {
              this.playerInfo.realLevel = constant.MAX_LEVEL;
              this.playerInfo.level = constant.MAX_LEVEL;
              this.playerInfo.passCheckPoint = true;
              console.log("###2 this.playerInfo.level", this.playerInfo.level, 'this.playerInfo.realLevel', this.playerInfo.realLevel);
            } else {
              this.playerInfo.realLevel = this.playerInfo.level;
            }
          } else {
            this.playerInfo.realLevel = this.getRandLevel();
            console.log("###3 this.playerInfo.level", this.playerInfo.level, 'this.playerInfo.realLevel', this.playerInfo.realLevel);
          }

          this.savePlayerInfoToLocalCache();
        }

        getRandLevel() {
          //随机16-20关中的一个,但不跟现在的一样
          let level = -1;

          while (level === -1) {
            let randLevel = 16 + Math.floor(Math.random() * 5);

            if (randLevel !== this.playerInfo.realLevel) {
              level = randLevel;
            }
          }

          return level;
        }

      }, _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameRoot.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './audioManager.ts', './setting.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, AudioSource, _decorator, Component, assert, game, audioManager, setting;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      AudioSource = module.AudioSource;
      _decorator = module._decorator;
      Component = module.Component;
      assert = module.assert;
      game = module.game;
    }, function (module) {
      audioManager = module.audioManager;
    }, function (module) {
      setting = module.setting;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "98dcdQl8GhEYLJRG8ap+Eh+", "GameRoot", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let GameRoot = exports('GameRoot', (_dec = ccclass('GameRoot'), _dec2 = property(AudioSource), _dec(_class = (_class2 = (_temp = class GameRoot extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "_audioSource", _descriptor, this);
        }

        onLoad() {
          const audioSource = this.getComponent(AudioSource);
          assert(audioSource);
          this._audioSource = audioSource;
          game.addPersistRootNode(this.node); // init AudioManager

          audioManager.instance.init(this._audioSource);
        }

        onEnable() {
          // NOTE: 常驻节点在切场景时会暂停音乐，需要在 onEnable 继续播放
          // 之后需要在引擎侧解决这个问题
          audioManager.instance.playMusic(true);
          setting.checkState();
        }

        start() {
          if (typeof cocosAnalytics !== 'undefined') {
            cocosAnalytics.enableDebug(true);
          }
        }

      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_audioSource", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/loading.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './updateValueLabel.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Label, _decorator, Component, Vec3, updateValueLabel;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
    }, function (module) {
      updateValueLabel = module.updateValueLabel;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "99c5fx0klFHq52oGPdZL7Z5", "loading", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let loading = exports('loading', (_dec = ccclass("loading"), _dec2 = property(updateValueLabel), _dec3 = property(Label), _dec(_class = (_class2 = (_temp = class loading extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "lbProgress", _descriptor, this);

          _initializerDefineProperty(this, "lbTips", _descriptor2, this);

          _defineProperty(this, "targetProgress", 0);

          _defineProperty(this, "oriPos", new Vec3());
        }

        start() {
          this.show(0);
        }

        show(start) {
          if (start) {
            this.targetProgress = start;
          } else {
            this.targetProgress = 0;
          }

          this.lbProgress.playUpdateValue(this.targetProgress, this.targetProgress, 0);
          this.lbProgress.isPlaying = false;
          this.lbTips.string = '';
          this.oriPos.set(this.lbProgress.node.position);
        }

        updateProgress(progress, tips) {
          this.targetProgress = progress;
          let curProgress = Number(this.lbProgress.label.string); //当前进度

          this.lbProgress.playUpdateValue(curProgress, this.targetProgress, (this.targetProgress - curProgress) / 20);

          if (tips) {
            this.lbTips.string = tips;
          }

          if (this.oriPos) {
            this.lbProgress.node.setPosition(new Vec3(this.oriPos.x - 10, this.oriPos.y, this.oriPos.z));
          }
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbProgress", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbTips", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/signIn.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './constant.ts', './util.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts', './LanguageData.ts', './signInItem.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, Sprite, SpriteFrame, Prefab, _decorator, Component, Button, instantiate, clientEvent, constant, util, localConfig, playerData, uiManager, gameLogic, i18n, signInItem;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
      Button = module.Button;
      instantiate = module.instantiate;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      util = module.util;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      gameLogic = module.gameLogic;
    }, function (module) {
      i18n = module.i18n;
    }, function (module) {
      signInItem = module.signInItem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _temp;

      cclegacy._RF.push({}, "9d016bBiB5J1prtR6VcBPd4", "signIn", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let signIn = exports('signIn', (_dec = ccclass("signIn"), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Sprite), _dec7 = property(SpriteFrame), _dec8 = property(SpriteFrame), _dec9 = property(SpriteFrame), _dec10 = property(SpriteFrame), _dec11 = property(Node), _dec12 = property(Prefab), _dec(_class = (_class2 = (_temp = class signIn extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "ndBtnNormal", _descriptor, this);

          _initializerDefineProperty(this, "ndBtnDouble", _descriptor2, this);

          _initializerDefineProperty(this, "ndBtnReceive", _descriptor3, this);

          _initializerDefineProperty(this, "ndBtnClose", _descriptor4, this);

          _initializerDefineProperty(this, "spDoubleBtnIcon", _descriptor5, this);

          _initializerDefineProperty(this, "sfBlue", _descriptor6, this);

          _initializerDefineProperty(this, "sfGray", _descriptor7, this);

          _initializerDefineProperty(this, "sfVideo", _descriptor8, this);

          _initializerDefineProperty(this, "sfShare", _descriptor9, this);

          _initializerDefineProperty(this, "arrNodeDay", _descriptor10, this);

          _initializerDefineProperty(this, "pbSignInItem", _descriptor11, this);

          _defineProperty(this, "currentDay", 0);

          _defineProperty(this, "arrReceived", []);

          _defineProperty(this, "arrAfterFillSignIn", []);

          _defineProperty(this, "isTodayReceived", false);

          _defineProperty(this, "isAllReceived", false);

          _defineProperty(this, "arrSignInItemScript", []);

          _defineProperty(this, "currentReward", void 0);

          _defineProperty(this, "currentRewardType", void 0);

          _defineProperty(this, "isHadCar", void 0);

          _defineProperty(this, "createDate", void 0);

          _defineProperty(this, "getCarDate", void 0);
        }

        start() {// Your initialization goes here.
        }

        show() {
          playerData.instance.updateSignInCurrentDay();
          let signInInfo = playerData.instance.playerInfo.signInInfo;
          this.currentDay = signInInfo.currentDay;
          this.arrReceived = signInInfo.receivedDays;
          this.arrAfterFillSignIn = signInInfo.afterFillSignInDays;
          gameLogic.updateRewardIcon(constant.SHARE_FUNCTION.SIGNIN, this.spDoubleBtnIcon); // gameLogic.updateRewardIcon(constant.SHARE_FUNCTION.SIGNIN, this.spReceiveBtnIcon);

          this.showSignInInfo();
          this.setButtonStyle(); // this.ndReceiveIcon.active = true;
        }
        /**
         * 分为“双倍领取-普通领取-关闭”， “领取-暂不领取-关闭”两种形式,当天奖励为金币显示第一种，为车辆显示第二种
         */


        setButtonStyle() {
          //如果今天领取完了就将双倍领取按钮或领取按钮置灰
          let receiveStatus = playerData.instance.getSignInReceivedInfo();
          this.isTodayReceived = receiveStatus.isTodayReceived;
          this.isAllReceived = receiveStatus.isAllReceived;
          this.ndBtnDouble.getComponent(Sprite).spriteFrame = this.isTodayReceived ? this.sfGray : this.sfBlue;
          this.ndBtnDouble.getComponent(Button).interactable = !this.isTodayReceived;
          this.ndBtnReceive.getComponent(Sprite).spriteFrame = this.isTodayReceived ? this.sfGray : this.sfBlue;
          this.ndBtnReceive.getComponent(Button).interactable = !this.isTodayReceived;
          let arrSignIn = localConfig.instance.getTableArr("signIn");
          this.currentReward = arrSignIn[this.currentDay - 1];
          this.currentRewardType = this.currentReward.rewardType;

          if (this.currentRewardType === constant.REWARD_TYPE.CAR) {
            if (playerData.instance.isHadCarAndDuringPeriod(this.currentReward.amount)) {
              this.ndBtnDouble.active = true;
              this.ndBtnReceive.active = false;
              this.ndBtnNormal.active = !this.isTodayReceived; // this.ndBtnNotYet.active = false;
            } else {
              this.ndBtnDouble.active = false;
              this.ndBtnReceive.active = true;
              this.ndBtnNormal.active = false; // this.ndBtnNotYet.active = !this.isTodayReceived;
            }
          } else {
            this.ndBtnDouble.active = true;
            this.ndBtnReceive.active = false;
            this.ndBtnNormal.active = !this.isTodayReceived; // this.ndBtnNotYet.active = false;
          }
        }

        showSignInInfo() {
          this.arrSignInItemScript = [];
          let arrSignIn = localConfig.instance.getTableArr("signIn");

          for (let idx = 0; idx < arrSignIn.length; idx++) {
            let day = arrSignIn[idx].ID;
            let isReceived = this.arrReceived.includes(day) ? true : false; //从签到数组中判断是否已经领取

            if (day <= this.currentDay) {
              //状态设置为已领取或者可领取
              arrSignIn[idx].status = isReceived ? constant.SIGNIN_REWARD_STATUS.RECEIVED : constant.SIGNIN_REWARD_STATUS.RECEIVABLE;

              if (arrSignIn[idx].status === constant.SIGNIN_REWARD_STATUS.RECEIVABLE && day < this.currentDay) {
                arrSignIn[idx].status = constant.SIGNIN_REWARD_STATUS.FILL_SIGNIN;

                if (this.arrAfterFillSignIn.includes(day)) {
                  arrSignIn[idx].status = constant.SIGNIN_REWARD_STATUS.AFTER_FILL_SIGNIN;
                }
              }
            } else {
              //不可领取
              arrSignIn[idx].status = constant.SIGNIN_REWARD_STATUS.UNRECEIVABLE;
            } // 确定布局后，设置位置


            let node = this.arrNodeDay[idx];
            let signInItemNode = null;

            if (!node.getChildByName('signInItem')) {
              signInItemNode = instantiate(this.pbSignInItem);
              node.addChild(signInItemNode);
            } else {
              signInItemNode = node.getChildByName('signInItem');
            }

            let signInItemScript = signInItemNode.getComponent(signInItem);
            signInItemScript.init(arrSignIn[idx], this);

            if (!this.arrSignInItemScript.includes(signInItemScript)) {
              this.arrSignInItemScript.push(signInItemScript);
            }
          }
        }
        /**
         * 领取奖励
         *
         * @param {object} itemInfo 单个奖励信息
         * @param {boolean} itemInfo 是否是双倍奖励
         * @param {function} callback 更新签到界面的UI
         */


        receiveReward(itemInfo, isDouble, callback) {
          let day = itemInfo.ID; //大于可领奖天数点击图标不能领取

          if (this.currentDay < day) {
            return;
          }

          let title = i18n.t("showReward.signinReward");
          let targetItemInfo = util.clone(itemInfo);

          if (itemInfo.ID == 2 || itemInfo.ID == 7) {
            let targetCar = localConfig.instance.queryByID('car', itemInfo.amount);
            targetItemInfo.ID = targetCar.ID;
            let isHadCar = playerData.instance.playerInfo.cars.indexOf(targetCar.ID) !== -1;

            if (isHadCar) {
              targetItemInfo.rewardType = constant.REWARD_TYPE.GOLD;
              targetItemInfo.amount = itemInfo.ID == 2 ? constant.GOLD_REWARD.SECOND : constant.GOLD_REWARD.SEVENT;
            }
          }

          targetItemInfo.amount = isDouble ? targetItemInfo.amount *= 2 : targetItemInfo.amount;
          uiManager.instance.shiftFromPopupSeq('signIn/signIn'); // this.unschedule(this.showBtnSecondaryCallback);

          if (targetItemInfo.rewardType === constant.REWARD_TYPE.GOLD) {
            playerData.instance.updatePlayerInfo('gold', targetItemInfo.amount);
            gameLogic.showFlyReward(constant.REWARD_TYPE.GOLD, () => {
              clientEvent.dispatchEvent('updateGold');
            });
            callback && callback();
            return;
          }

          uiManager.instance.pushToPopupSeq('common/showReward', 'showReward', [targetItemInfo, false, title, callback]);
        }
        /**
         * 点击领取
         *
         * @param {boolean} isDouble
         * @memberof signIn
         */


        receiveClick(isDouble) {
          for (let j = 0; j < this.arrSignInItemScript.length; j++) {
            let element = this.arrSignInItemScript[j]; //只有今天的状态才存在RECEIVABLE

            if (element.itemInfo.status === constant.SIGNIN_REWARD_STATUS.RECEIVABLE) {
              element._parent.receiveReward(element.itemInfo, isDouble, () => {
                element.markReceived();
              });

              break;
            }
          }
        }
        /**
         * 双倍领取
         */


        onBtnDoubleClick() {
          // 用户 TODO：此处可实现看视频领双倍福利功能
          // gameLogic.openReward(constant.SHARE_FUNCTION.SIGNIN, (err)=>{
          //    if (!err) {
          this.receiveClick(true); //    }
          // })
        }
        /**
         * 普通领取
         */


        onBtnNormalClick() {
          this.receiveClick(false);
        }
        /**
         * 领取
         */


        onBtnReceiveClick() {
          // 用户 TODO：此处可实现看视频领福利功能
          // gameLogic.openReward(constant.SHARE_FUNCTION.SIGNIN, (err)=>{
          //     if (!err) {
          this.receiveClick(false); // }
          //  })
        }
        /**
         * 暂不领取,关闭
         */


        onBtnCloseClick() {
          uiManager.instance.shiftFromPopupSeq('signIn/signIn');
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ndBtnNormal", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnDouble", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnReceive", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnClose", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "spDoubleBtnIcon", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sfBlue", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "sfGray", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "sfVideo", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "sfShare", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "arrNodeDay", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "pbSignInItem", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/localConfig.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './resourceUtil.ts', './csvManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, resourceUtil, csvManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      csvManager = module.csvManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "acd0cVlaIhLurmAIUS/N+2B", "localConfig", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let localConfig = exports('localConfig', (_dec = ccclass("localConfig"), _dec(_class = (_temp = _class2 = class localConfig {
        constructor() {
          _defineProperty(this, "csvManager", null);

          _defineProperty(this, "arrCars", []);

          _defineProperty(this, "_callback", null);

          _defineProperty(this, "_skills", {});

          _defineProperty(this, "currentLoad", 0);

          _defineProperty(this, "cntLoad", 0);

          _defineProperty(this, "servers", []);
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new localConfig();
          return this._instance;
        }

        loadConfig(cb) {
          this._callback = cb;
          this.csvManager = new csvManager();
          this.loadCSV();
        }

        loadCSV() {
          //新增数据表 请往该数组中添加....
          var arrTables = ['talk', 'car', 'signIn'];
          this.cntLoad = arrTables.length + 1; //+1主要是后续还有技能配置的加载，特殊处理
          //客户端加载

          arrTables.forEach((tableName, index, array) => {
            resourceUtil.getData(tableName, (err, content) => {
              this.csvManager.addTable(tableName, content);
              this.tryToCallbackOnFinished();
            });
          }); //载入技能配置信息
          // resourceUtil.getData("skills", function (err, content) {
          //     _this._skills = JSON.parse(content);
          //     _this.tryToCallbackOnFinished();
          // });

          resourceUtil.getJsonData("servers", (err, content) => {
            this.servers = content;
            this.tryToCallbackOnFinished();
          });
        }

        queryOne(tableName, key, value) {
          return this.csvManager.queryOne(tableName, key, value);
        }

        queryByID(tableName, ID) {
          return this.csvManager.queryByID(tableName, ID);
        }

        getTable(tableName) {
          return this.csvManager.getTable(tableName);
        }

        getTableArr(tableName) {
          return this.csvManager.getTableArr(tableName);
        }

        getCars() {
          if (this.arrCars.length > 0) {
            return this.arrCars;
          }

          let arr = localConfig.instance.getTableArr('car');
          this.arrCars = arr.sort((elementA, elementB) => {
            return elementA.sort - elementB.sort;
          });
          return this.arrCars;
        } // 选出指定表里面所有有 key=>value 键值对的数据


        queryAll(tableName, key, value) {
          return this.csvManager.queryAll(tableName, key, value);
        } // 选出指定表里所有 key 的值在 values 数组中的数据，返回 Object，key 为 ID


        queryIn(tableName, key, values) {
          return this.csvManager.queryIn(tableName, key, values);
        } // 选出符合条件的数据。condition key 为表格的key，value 为值的数组。返回的object，key 为数据在表格的ID，value为具体数据


        queryByCondition(tableName, condition) {
          return this.csvManager.queryByCondition(tableName, condition);
        }

        tryToCallbackOnFinished() {
          if (this._callback) {
            this.currentLoad++;

            if (this.currentLoad >= this.cntLoad) {
              this._callback();
            }
          }
        }

        getCurrentServer() {
          return this.servers[0];
        }

        getVersion() {
          let server = this.getCurrentServer();
          let version = server ? server.version : 'unknown';
          return version;
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/uiManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './resourceUtil.ts', './poolManager.ts', './tips.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, isValid, find, resourceUtil, poolManager, tips;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      isValid = module.isValid;
      find = module.find;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      poolManager = module.poolManager;
    }, function (module) {
      tips = module.tips;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "ae98dhzQlZL2p1SbDgvNdoJ", "uiManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const SHOW_STR_INTERVAL_TIME = 800;
      let uiManager = exports('uiManager', (_dec = ccclass("uiManager"), _dec(_class = (_temp = _class2 = class uiManager {
        constructor() {
          _defineProperty(this, "dictSharedPanel", {});

          _defineProperty(this, "dictLoading", {});

          _defineProperty(this, "arrPopupDialog", []);

          _defineProperty(this, "showTipsTime", 0);
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new uiManager();
          return this._instance;
        }
        /**
         * 显示单例界面
         * @param {String} panelPath
         * @param {Array} args
         * @param {Function} cb 回调函数，创建完毕后回调
         */


        showDialog(panelPath, args, cb) {
          if (this.dictLoading[panelPath]) {
            return;
          }

          let idxSplit = panelPath.lastIndexOf('/');
          let scriptName = panelPath.slice(idxSplit + 1);

          if (!args) {
            args = [];
          }

          if (this.dictSharedPanel.hasOwnProperty(panelPath)) {
            let panel = this.dictSharedPanel[panelPath];

            if (isValid(panel)) {
              panel.parent = find("Canvas");
              panel.active = true;
              let script = panel.getComponent(scriptName);

              if (script.show) {
                script.show.apply(script, args);
              }

              cb && cb(script);
              return;
            }
          }

          this.dictLoading[panelPath] = true;
          resourceUtil.createUI(panelPath, (err, node) => {
            //判断是否有可能在显示前已经被关掉了？
            let isCloseBeforeShow = false;

            if (!this.dictLoading[panelPath]) {
              //已经被关掉
              isCloseBeforeShow = true;
            }

            this.dictLoading[panelPath] = false;

            if (err) {
              console.error(err);
              return;
            } // node.zIndex = 100;


            this.dictSharedPanel[panelPath] = node;
            let script = node.getComponent(scriptName);

            if (script.show) {
              script.show.apply(script, args);
            }

            cb && cb(script);

            if (isCloseBeforeShow) {
              //如果在显示前又被关闭，则直接触发关闭掉
              this.hideDialog(panelPath);
            }
          });
        }
        /**
         * 隐藏单例界面
         * @param {String} panelPath
         * @param {fn} callback
         */


        hideDialog(panelPath, callback) {
          if (this.dictSharedPanel.hasOwnProperty(panelPath)) {
            let panel = this.dictSharedPanel[panelPath];

            if (panel && isValid(panel)) {
              // let ani = panel.getComponent('animationUI');
              // if (ani) {
              //     ani.close(() => {
              //         panel.parent = null;
              //         if (callback && typeof callback === 'function') {
              //             callback();
              //         }
              //     });
              // } else {
              panel.parent = null;

              if (callback && typeof callback === 'function') {
                callback();
              } // }

            } else if (callback && typeof callback === 'function') {
              callback();
            }
          }

          this.dictLoading[panelPath] = false;
        }
        /**
         * 将弹窗加入弹出窗队列
         * @param {string} panelPath
         * @param {string} scriptName
         * @param {*} param
         */


        pushToPopupSeq(panelPath, scriptName, param) {
          let popupDialog = {
            panelPath: panelPath,
            scriptName: scriptName,
            param: param,
            isShow: false
          };
          this.arrPopupDialog.push(popupDialog);
          this.checkPopupSeq();
        }
        /**
         * 将弹窗加入弹出窗队列
         * @param {number} index
         * @param {string} panelPath
         * @param {string} scriptName
         * @param {*} param
         */


        insertToPopupSeq(index, panelPath, param) {
          let popupDialog = {
            panelPath: panelPath,
            param: param,
            isShow: false
          };
          this.arrPopupDialog.splice(index, 0, popupDialog); //this.checkPopupSeq();
        }
        /**
         * 将弹窗从弹出窗队列中移除
         * @param {string} panelPath
         */


        shiftFromPopupSeq(panelPath) {
          this.hideDialog(panelPath, () => {
            if (this.arrPopupDialog[0] && this.arrPopupDialog[0].panelPath === panelPath) {
              this.arrPopupDialog.shift();
              this.checkPopupSeq();
            }
          });
        }
        /**
         * 检查当前是否需要弹窗
         */


        checkPopupSeq() {
          if (this.arrPopupDialog.length > 0) {
            let first = this.arrPopupDialog[0];

            if (!first.isShow) {
              this.showDialog(first.panelPath, first.param);
              this.arrPopupDialog[0].isShow = true;
            }
          }
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }

        /**
         * 显示提示
         * @param {String} content
         * @param {Function} cb
         */


        showTips(content, cb) {
          var now = Date.now();

          if (now - this.showTipsTime < SHOW_STR_INTERVAL_TIME) {
            var spareTime = SHOW_STR_INTERVAL_TIME - (now - this.showTipsTime);
            const self = this;
            setTimeout(function (tipsLabel, callback) {
              self._showTipsAni(tipsLabel, callback);
            }.bind(this, content, cb), spareTime);
            this.showTipsTime = now + spareTime;
          } else {
            this._showTipsAni(content, cb);

            this.showTipsTime = now;
          }
        }
        /**
         * 内部函数
         * @param {String} content
         * @param {Function} cb
         */


        _showTipsAni(content, cb) {
          //todo 临时添加方案，后期需要将这些代码移到具体界面
          resourceUtil.getUIPrefabRes('common/tips', (err, prefab) => {
            if (err) {
              return;
            }

            let tipsNode = poolManager.instance.getNode(prefab, find("Canvas"));
            let tipScript = tipsNode.getComponent(tips);
            tipScript.show(content, cb);
          });
        }

      }, _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/resourceUtil.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, resources, error, Prefab, instantiate, find, SpriteFrame, isValid, assetManager, Texture2D, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      resources = module.resources;
      error = module.error;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      find = module.find;
      SpriteFrame = module.SpriteFrame;
      isValid = module.isValid;
      assetManager = module.assetManager;
      Texture2D = module.Texture2D;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "aebeeEGJRZGbK315QTzsoll", "resourceUtil", undefined);

      const {
        ccclass
      } = _decorator;
      let resourceUtil = exports('resourceUtil', (_dec = ccclass("resourceUtil"), _dec(_class = class resourceUtil {
        static loadRes(url, type, cb) {
          if (type) {
            resources.load(url, type, (err, res) => {
              if (err) {
                error(err.message || err);

                if (cb) {
                  cb(err, res);
                }

                return;
              }

              if (cb) {
                cb(err, res);
              }
            });
          } else {
            resources.load(url, (err, res) => {
              if (err) {
                error(err.message || err);

                if (cb) {
                  cb(err, res);
                }

                return;
              }

              if (cb) {
                cb(err, res);
              }
            });
          }
        }

        static getMap(level, cb) {
          let levelStr = 'map'; //前面补0

          if (level >= 100) {
            levelStr += level;
          } else if (level >= 10) {
            levelStr += '0' + level;
          } else {
            levelStr += '00' + level;
          }

          this.loadRes(`gamePackage/map/config/${levelStr}`, null, (err, txtAsset) => {
            if (err) {
              cb(err, txtAsset);
              return;
            }

            const txt = txtAsset;
            let content = '';

            if (txt._file) {
              if (window['LZString']) {
                content = window['LZString'].decompressFromEncodedURIComponent(txt._file);
              }

              const objJson = JSON.parse(content);
              cb(null, objJson);
            } else if (txt.text) {
              if (window['LZString']) {
                content = window['LZString'].decompressFromEncodedURIComponent(txt.text);
              }

              const objJson = JSON.parse(content);
              cb(null, objJson);
            } else if (txt.json) {
              cb(null, txt.json);
            } else {
              const errObj = new Error('failed');
              cb(errObj, null);
            }
          });
        }

        static getMapObjs(type, arrName, progressCb, completeCb) {
          let arrUrls = [];

          for (let idx = 0; idx < arrName.length; idx++) {
            arrUrls.push(`gamePackage/map/${type}/${arrName[idx]}`);
          }

          resources.load(arrUrls, Prefab, progressCb, completeCb);
        }

        static getUIPrefabRes(prefabPath, cb) {
          this.loadRes("prefab/ui/" + prefabPath, Prefab, cb);
        }

        static createUI(path, cb, parent) {
          this.getUIPrefabRes(path, (err, prefab) => {
            if (err) return;
            const node = instantiate(prefab);
            node.setPosition(0, 0, 0);

            if (!parent) {
              parent = find("Canvas");
            }

            parent.addChild(node);

            if (cb) {
              cb(null, node);
            }
          });
        }

        static getCarsBatch(arrName, progressCb, completeCb) {
          let arrUrls = [];

          for (let idx = 0; idx < arrName.length; idx++) {
            arrUrls.push(`prefab/car/car${arrName[idx]}`);
          }

          for (let i = 0; i < arrUrls.length; i++) {
            const url = arrUrls[i];

            if (!progressCb) {
              resources.load(url, Prefab, completeCb);
            } else {
              resources.load(url, Prefab, progressCb, completeCb);
            }
          }
        }

        static getUICar(name, cb) {
          this.loadRes(`prefab/ui/car/uiCar${name}`, Prefab, cb);
        }

        static getCar(name, cb) {
          this.loadRes(`prefab/car/car${name}`, Prefab, cb);
        }

        static setCarIcon(name, sprite, isBlack, cb) {
          let path = `gamePackage/texture/car/car${name}`;

          if (isBlack) {
            path += 'Black';
          }

          this.setSpriteFrame(path, sprite, cb);
        }

        static getJsonData(fileName, cb) {
          resources.load("datas/" + fileName, (err, content) => {
            if (err) {
              error(err.message || err);
              return;
            }

            const txt = content;

            if (txt.json) {
              cb(err, txt.json);
            } else {
              const errObj = new Error('failed!!!');
              cb(errObj, null);
            }
          });
        }

        static getData(fileName, cb) {
          resources.load("datas/" + fileName, function (err, content) {
            if (err) {
              error(err.message || err);
              return;
            }

            const txt = content;
            let text = txt.text;

            if (!text) {
              resources.load(content.nativeUrl, (err, content) => {
                text = content;
                cb(err, text);
              });
              return;
            }

            cb(err, text);
          });
        }

        static setSpriteFrame(path, sprite, cb) {
          this.loadRes(path + '/spriteFrame', SpriteFrame, (err, spriteFrame) => {
            if (err) {
              console.error('set sprite frame failed! err:', path, err);
              cb(err, spriteFrame);
              return;
            }

            if (sprite && isValid(sprite)) {
              sprite.spriteFrame = spriteFrame;
              cb(null, spriteFrame);
            }
          });
        }
        /**
         * 根据英雄的文件名获取头像
         */


        static setRemoteImage(url, sprite, cb) {
          if (!url || !url.startsWith('http')) {
            return;
          }

          let suffix = "png";
          assetManager.loadAny([{
            url: url,
            type: suffix
          }], null, (err, image) => {
            if (err) {
              console.error('set avatar failed! err:', url, err);
              cb(err, image);
              return;
            }

            let texture = new Texture2D();
            texture.image = image;
            let spriteFrame = new SpriteFrame();
            spriteFrame.texture = texture;
            cb && cb(null, spriteFrame);
          });
        }
        /**
         * 设置更多游戏的游戏图标
         */


        static setGameIcon(game, sprite, cb) {
          if (game.startsWith('http')) {
            this.setRemoteImage(game, sprite, cb);
          } else {
            this.setSpriteFrame('gamePackage/textures/icons/games/' + game, sprite, cb);
          }
        }
        /**
         * 获取顾客预制体
         *
         * @static
         * @param {string} name
         * @param {Function} cb
         * @memberof resourceUtil
         */


        static getCustomer(name, cb) {
          this.loadRes(`gamePackage/map/customer/customer${name}`, Prefab, cb);
        }

        static setCustomerIcon(name, sprite, cb) {
          let path = `gamePackage/texture/head/head${name}`;
          this.setSpriteFrame(path, sprite, cb);
        }

        static getEffect(name, cb) {
          this.loadRes(`prefab/effect/${name}`, Prefab, cb);
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/balance.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './audioManager.ts', './constant.ts', './util.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts', './LanguageData.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Sprite, Label, Widget, Node, SpriteFrame, _decorator, Component, clientEvent, audioManager, constant, util, playerData, uiManager, gameLogic, i18n;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Sprite = module.Sprite;
      Label = module.Label;
      Widget = module.Widget;
      Node = module.Node;
      SpriteFrame = module.SpriteFrame;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      audioManager = module.audioManager;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      util = module.util;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      gameLogic = module.gameLogic;
    }, function (module) {
      i18n = module.i18n;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _temp;

      cclegacy._RF.push({}, "b6b06mpFMlIZqLpxXisU3Cu", "balance", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let balance = exports('balance', (_dec = ccclass("balance"), _dec2 = property(Sprite), _dec3 = property(Sprite), _dec4 = property({
        type: Label
      }), _dec5 = property({
        type: Label
      }), _dec6 = property(Widget), _dec7 = property({
        type: Node,
        displayName: "进度项"
      }), _dec8 = property(SpriteFrame), _dec9 = property(SpriteFrame), _dec10 = property(SpriteFrame), _dec11 = property(SpriteFrame), _dec12 = property(SpriteFrame), _dec13 = property(Label), _dec14 = property(Label), _dec15 = property(Label), _dec16 = property(Sprite), _dec17 = property(Node), _dec(_class = (_class2 = (_temp = class balance extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "spStart", _descriptor, this);

          _initializerDefineProperty(this, "spEnd", _descriptor2, this);

          _initializerDefineProperty(this, "lbCurLevel", _descriptor3, this);

          _initializerDefineProperty(this, "lbTargetLevel", _descriptor4, this);

          _initializerDefineProperty(this, "wgMenu", _descriptor5, this);

          _initializerDefineProperty(this, "progress", _descriptor6, this);

          _initializerDefineProperty(this, "imgLevelFinished", _descriptor7, this);

          _initializerDefineProperty(this, "imgLevelUnfinished", _descriptor8, this);

          _initializerDefineProperty(this, "imgProgressNoActive", _descriptor9, this);

          _initializerDefineProperty(this, "imgProgressActive", _descriptor10, this);

          _initializerDefineProperty(this, "imgProgressFinished", _descriptor11, this);

          _initializerDefineProperty(this, "lbTakeCount", _descriptor12, this);

          _initializerDefineProperty(this, "lbGetNormal", _descriptor13, this);

          _initializerDefineProperty(this, "lbGetMulti", _descriptor14, this);

          _initializerDefineProperty(this, "spIcon", _descriptor15, this);

          _initializerDefineProperty(this, "nodeDouble", _descriptor16, this);

          _defineProperty(this, "rewardMoney", 0);

          _defineProperty(this, "isFinishLevel", false);

          _defineProperty(this, "showBalanceTimes", 0);
        }

        start() {// Your initialization goes here.
        }

        show(level, curProgress, isTakeOver, maxProgress, money, isFinishLevel) {
          this.showBalanceTimes++; //设置顶部关卡进度

          let start = curProgress;
          let end = isTakeOver ? start : start - 1;
          const len = this.progress.length;

          for (let idx = 0; idx < maxProgress; idx++) {
            if (maxProgress > len) {
              break;
            }

            this.progress[idx].active = true;

            if (idx < end) {
              this.progress[idx].getComponent(Sprite).spriteFrame = this.imgProgressFinished;
            } else {
              this.progress[idx].getComponent(Sprite).spriteFrame = this.imgProgressNoActive;
            }
          }

          if (!isTakeOver) {
            this.progress[end].getComponent(Sprite).spriteFrame = this.imgProgressActive;
          }

          for (let idx = maxProgress; idx < this.progress.length; idx++) {
            this.progress[idx].active = false;
          }

          this.lbCurLevel.string = level.toString();
          this.lbTargetLevel.string = `${level + 1}`;
          this.isFinishLevel = isFinishLevel;
          this.spStart.spriteFrame = this.imgLevelFinished;

          if (isFinishLevel) {
            this.spEnd.spriteFrame = this.imgLevelFinished;
          } else {
            this.spEnd.spriteFrame = this.imgLevelUnfinished;
          } //设置完成了几个订单


          let take = end >= 0 ? end : 0;
          this.lbTakeCount.string = i18n.t("balance.你完成了%{value}个订单", {
            value: take
          }); //设置奖励多少

          this.rewardMoney = money;
          this.lbGetNormal.string = util.formatMoney(money);
          this.lbGetMulti.string = util.formatMoney(money * 3);

          if (isFinishLevel) {
            audioManager.instance.playSound(constant.AUDIO_SOUND.WIN);
          }

          gameLogic.updateRewardIcon(constant.SHARE_FUNCTION.BALANCE, this.spIcon); //有30%的概率不显示该按钮

          let percent = Math.floor(Math.random() * 100); //触发显示

          this.nodeDouble.active = percent < 30;
        }

        onBtnGetNormalClick() {
          //普通领取
          this.rewardOver(this.rewardMoney);
        }

        onBtnGetMultiClick() {
          //3倍领取
          gameLogic.openReward(constant.SHARE_FUNCTION.BALANCE, err => {
            if (!err) {
              this.rewardOver(this.rewardMoney * 3);
            }
          });
        }

        rewardOver(rewardMoney) {
          //如果关卡是完成的，进入下一关
          //如果关卡是未完成的，还是保留同一关
          if (this.isFinishLevel) {
            //关卡完成了，进入下一关
            gameLogic.finishBuyTask(constant.BUY_CAR_TYPE.PASS_LEVEL, playerData.instance.playerInfo.level, false);
            playerData.instance.passLevel(rewardMoney);
          } else {
            playerData.instance.updatePlayerInfo('gold', rewardMoney);
          }

          if (rewardMoney > 0) {
            gameLogic.showFlyReward(constant.REWARD_TYPE.GOLD, () => {
              clientEvent.dispatchEvent('updateGold');
            });
          }

          uiManager.instance.hideDialog('fight/balance');

          if (playerData.instance.playerInfo.level > 0) {
            playerData.instance.isComeFromBalance = false;
            clientEvent.dispatchEvent('newLevel', this.isFinishLevel);
          } else {
            playerData.instance.isComeFromBalance = false;
            clientEvent.dispatchEvent('newLevel', this.isFinishLevel);
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spStart", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spEnd", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbCurLevel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbTargetLevel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "wgMenu", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "progress", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "imgLevelFinished", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "imgLevelUnfinished", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "imgProgressNoActive", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "imgProgressActive", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "imgProgressFinished", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "lbTakeCount", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "lbGetNormal", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "lbGetMulti", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "nodeDouble", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/gameLogic.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './configuration.ts', './clientEvent.ts', './resourceUtil.ts', './constant.ts', './playerData.ts', './uiManager.ts', './flyReward.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, configuration, clientEvent, resourceUtil, constant, playerData, uiManager, flyReward;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      configuration = module.configuration;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      flyReward = module.flyReward;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "b6eeddtwEdPDYszSPn2rVjb", "gameLogic", undefined);

      const {
        ccclass
      } = _decorator;
      let gameLogic = exports('gameLogic', (_dec = ccclass("gameLogic"), _dec(_class = (_temp = _class2 = class gameLogic {
        /* class member could be defined like this */
        // dummy = '';
        static addGold(gold) {
          playerData.instance.updatePlayerInfo('gold', gold);
          clientEvent.dispatchEvent('updateGold');
        }

        static useCar(carId) {
          playerData.instance.useCar(carId);
          clientEvent.dispatchEvent('updateCar');
        }

        static buyCar(carId) {
          playerData.instance.buyCar(carId);
          clientEvent.dispatchEvent('buyCar');
        }

        static isVibrateOpen() {
          let isVibrateOpen = configuration.instance.getGlobalData('vibrate');

          if (isVibrateOpen === undefined || isVibrateOpen === null) {
            isVibrateOpen = true; //默认是打开的状态
          }

          return isVibrateOpen;
        }

        static getOpenRewardType(funStr, callback, index) {
          callback(null, constant.OPEN_REWARD_TYPE.NULL);
        }

        static checkIsByVideoAds() {
          return false;
        }
        /**
         * 根据功能设置图标对应展示
         *
         * @static
         * @param {string} funStr
         * @param {Sprite} spIcon
         * @param {Function} [callback]
         * @param {SpriteFrame} [imgAd]
         * @param {SpriteFrame} [imgShare]
         * @memberof gameLogic
         */


        static updateRewardIcon(funStr, spIcon, callback, imgAd, imgShare) {
          this.getOpenRewardType(funStr, (err, type) => {
            switch (type) {
              case constant.OPEN_REWARD_TYPE.AD:
                spIcon.node.active = true;

                if (imgAd) {
                  spIcon.spriteFrame = imgAd;
                } else {
                  spIcon.spriteFrame = this.imgAd;
                }

                break;

              case constant.OPEN_REWARD_TYPE.SHARE:
                spIcon.node.active = true;

                if (imgShare) {
                  spIcon.spriteFrame = imgShare;
                } else {
                  spIcon.spriteFrame = this.imgShare;
                }

                break;

              case constant.OPEN_REWARD_TYPE.NULL:
                spIcon.node.active = false;
                break;
            }

            if (callback) {
              callback(err, type);
            }
          });
        }

        static finishBuyTask(type, value, isAdd) {
          playerData.instance.finishBuyTask(type, value, isAdd);
          clientEvent.dispatchEvent('updateBuyTask');
        }

        static openReward(funStr, callback) {
          callback && callback(null);
        }
        /**
         * 登陆成功后会回调该方法,类似于一个声明周期或者状态
         */


        static afterLogin() {
          if (!playerData.instance.isNewBee) {
            this.checkSignIn();
          }
        }
        /**
         * 如果今天还未签到则弹出
         */


        static checkSignIn() {
          if (playerData.instance.playerInfo.level === 1) {
            //第一关未通关则不跳签到界面
            return;
          }

          playerData.instance.updateSignInCurrentDay();

          if (!playerData.instance.getSignInReceivedInfo().isTodayReceived) {
            uiManager.instance.pushToPopupSeq('signIn/signIn', 'signIn', {});
          }
        }

        static showFlyReward(rewardType, callback) {
          resourceUtil.createUI('common/flyReward', (err, node) => {
            if (err) {
              if (callback) {
                callback();
              }

              return;
            }

            let reward = node.getComponent(flyReward); // reward.setInfo(rewardType === constant.REWARD_TYPE.GOLD);

            reward.setEndListener(callback);
          });
        }

      }, _defineProperty(_class2, "imgAd", null), _defineProperty(_class2, "imgShare", null), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/en.ts", ['cc'], function () {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c2ee7NzXEdG1Z3CXlfjoO8M", "en", undefined); //@ts-ignore


      if (!window.i18nConfig) window.i18nConfig = {};
      if (!window.i18nConfig.languages) window.i18nConfig.languages = {};
      window.i18nConfig.languages.en = {
        // "start": {
        //     "startGame": "Start"
        // },
        // "main": {
        //     "%{value}/s": "%{value}/s",
        //     "free": "free"
        // },
        // "signReward": {
        //     "你已经连续签到%{value}天，继续保持": "Sign in for %{value} days，keep on",
        //     "diamondsNum": "diamonds x2",
        // },
        // "button": {
        //     "normalReceive": "<u><color=#ffffff>Normal receive</color></u>",
        //     "receive": "Receive",
        //     "directCollection": "<u><color=#ffffff>Receive</color></u>",
        //     "doubleReceive": "Double",
        //     "noUpdate": "<u><color=#ffffff>No update</color></u>",
        //     "giveUpReward": "<u><color=#ffffff>Give up reward</color></u>"
        // }
        "main": {
          "dataLoading": "Data loading...",
          "dataLoadOver": "Data loading completed...",
          "loginSuccess": "Login success...",
          "gameResourceLoading": "Game Resource Loading...",
          "audioResourceLoading": "Audio Resource Loading...",
          "mappingResourceLoading": "Mapping resource loading...",
          "modelResourceLoading": "Model resource loading...",
          "entering": "Entering..."
        },
        "mainUI": {
          "start": "Click screen to start",
          "changeCar": "Change cars"
        },
        "shop": {
          "btnClose": "Close",
          "go": "Go",
          "acquired": "Acquired",
          "current": "Current",
          "receive": "Receive",
          "getGold": "Gold coins for watching AD"
        },
        "balance": {
          "你完成了%{value}个订单": "Complete %{value} order",
          "youEarnedIt": "You earned it",
          "clickReceive": "Click revive",
          "receiveImmediately": "Receive Now"
        },
        "carTask": {
          "初始车辆": "Initial vehicle",
          "分享获得": "Share gain",
          "签到获得": "Signin gain",
          "通过关卡获得": "Get through a checkpoint"
        },
        "signin": {
          "title": "Sign in on the 7th",
          "notYet": "Not yet",
          "normalReceive": "Normal receive",
          "receive": "Receive",
          "doubleReceive": "Double receive",
          "fillSignin": "Fill signin"
        },
        "fightManager": {
          "loadingMap": "Loading map...",
          "buildingCity": "Start building cities...",
          "cityLoadOver": "City loaded..."
        },
        "fightMap": {
          "trimTheGround": "The ground is being trimmed...",
          "pavingTheRoad": "Paving the way...",
          "plantingTree": "The trees are being planted...",
          "decorateHouse": "The house is being renovated...",
          "paintLandmarks": "The landmark is being painted..."
        },
        "online": {
          "close": "Close",
          "clickReceive": "Click receive",
          "dailyIncome": "Daily income is available"
        },
        "lottery": {
          "title": "Wheel of fortune",
          "free": "Free"
        },
        "talk": {
          "你好,请到街对面接我.": "Hello, please meet me across the street.",
          "停车!停车!": "Stop the car, please! Stop the car, please!",
          "去消费最高的地方.": "Go to the place where you spend the most.",
          "去附近的希尔顿酒店.": "Go to the nearby hilton hotel.",
          "司机快来!我老婆要生了!": "Driver, come on!  My wife is having a baby!",
          "大哥快点,我赶时间.": "Eldest brother hurry up, I'm in a hurry.",
          "师傅,5分钟内能到吗?": "Master, can you be there in 5 minutes?",
          "师傅,你是老司机嘛?": "Master, are you an old driver?",
          "师傅,你跑一天能赚多少?": "Master, how much do you earn per day?",
          "师傅快点,我要赶飞机.": "Master, hurry up, I have to catch the plane.",
          "师傅跟上那辆法拉利.": "Master, keep up with that Ferrari.",
          "带我去最近的银行.": "Take me to the nearest bank.",
          "帮我跟上前面那辆车!": "Help me keep up with the car in front!",
          "快去火车站,我赶车!": "Go to the railway station, I'll catch the bus!",
          "我在酒店大堂门口等你.": "I'll wait for you at the gate of the hotel lobby.",
          "要下雨了,你快来!": "It's going to rain, you come quickly!"
        },
        "showReward": {
          "title": "Reward",
          "normalReceive": "Normal receive",
          "ReceiveImmediately": " Receive Now",
          "doubleReceive": "Double receive",
          "alreadyHadCar": "You already own the vehicle and automatically convert it into the corresponding gold coin.",
          "buySuccessful": "Buy successful",
          "confrim": "Confrim",
          "signinReward": "Signin reward"
        },
        "revive": {
          "reviveImmediately": "Resurrection Now",
          "skip": "Skip",
          "tips": "It's a pity that we came close to the finish line.!",
          "continue": "Resurrection continues."
        },
        "clickBox": {
          "title": "Mysterious gift",
          "progress": "The faster you click, the more rewards you will receive.",
          "clickMe": "click me fast",
          "normalReceive": "Normal receive",
          "doubleReceive": "Double receive"
        },
        "trial": {
          "title": "Free trial",
          "tryItNow": "Try It Now",
          "giveUp": "Give up the trial and start the game."
        },
        "invinceible": {
          "title": "Invincible start",
          "confirm": "Confrim",
          "close": "Close"
        },
        "setting": {
          "title": "Setting",
          "version": "Version:",
          "close": "Close"
        }
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LocalizedLabel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './LanguageData.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator, Component, log, Label, error, i18n;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      log = module.log;
      Label = module.Label;
      error = module.error;
    }, function (module) {
      i18n = module.i18n;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _class3, _temp;

      cclegacy._RF.push({}, "c4c1axXN+NL4oYQEr2M4qn2", "LocalizedLabel", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let LocalizedLabel = exports('default', (_dec = ccclass("LocalizedLabel"), _dec(_class = (_class2 = (_temp = _class3 = class LocalizedLabel extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_debouncedUpdateLabel", null);

          _defineProperty(this, "label", null);

          _initializerDefineProperty(this, "_dataID", _descriptor, this);
        }

        set dataID(val) {
          if (this._dataID !== val) {
            this._dataID = val;
            {
              this.updateLabel();
            }
          }
        }

        get dataID() {
          return this._dataID;
        }

        onLoad() {
          if (!i18n.inst) {
            i18n.init();
          }

          log('dataID: ' + this.dataID + ' value: ' + i18n.t(this.dataID));
          this.fetchRender();
        }

        fetchRender() {
          let label = this.getComponent(Label);

          if (label) {
            this.label = label;
            this.updateLabel();
            return;
          }
        }

        updateLabel() {
          if (!this.label) {
            error('Failed to update localized label, label component is invalid!');
            return;
          }

          let localizedString = i18n.t(this.dataID, {});

          if (localizedString) {
            this.label.string = i18n.t(this.dataID, {});
          }
        }

        debounce(func, wait, immediate) {
          let timeout = -1;
          return (() => {
            const args = arguments;

            const later = (() => {
              timeout = -1;
              if (!immediate) func.apply(this, args);
            }).bind(this);

            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
          }).bind(this);
        }

      }, _defineProperty(_class3, "editor", {
        executeInEditMode: true,
        menu: 'i18n/LocalizedLabel'
      }), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_dataID", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return "";
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "dataID", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "dataID"), _class2.prototype)), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './configuration.ts', './localConfig.ts', './playerData.ts', './LanguageData.ts', './loading.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Label, _decorator, Component, assetManager, director, configuration, localConfig, playerData, i18n, loading;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
      assetManager = module.assetManager;
      director = module.director;
    }, function (module) {
      configuration = module.configuration;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      i18n = module.i18n;
    }, function (module) {
      loading = module.loading;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "c5aa7IsWr5A4blPeFPanXM/", "main", undefined);

      const {
        ccclass,
        property
      } = _decorator; // cc.gameSpace = {};
      // cc.gameSpace.TIME_SCALE = 1;
      // cc.gameSpace.isStop = false;
      // cc.gameSpace.isConfigLoadFinished = false;

      i18n.init('zh');
      let main = exports('main', (_dec = ccclass("main"), _dec2 = property(Label), _dec3 = property(loading), _dec(_class = (_class2 = (_temp = class main extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "lbVersion", _descriptor, this);

          _initializerDefineProperty(this, "loadingUI", _descriptor2, this);

          _defineProperty(this, "retryTimes", 0);

          _defineProperty(this, "uid", '');

          _defineProperty(this, "curProgress", 0);

          _defineProperty(this, "isLoginFinished", false);

          _defineProperty(this, "isSubPackageFinished", false);

          _defineProperty(this, "isConfigLoaded", false);
        }

        start() {
          // profiler.hideStats();
          this.loadingUI.show(); //TODO 后续将由服务器提供时间

          playerData.instance.syncServerTime(Date.now()); // Your initialization goes here.

          this.curProgress = 5; //起始10%

          this.loadingUI.updateProgress(this.curProgress, i18n.t("main.dataLoading"));
          localConfig.instance.loadConfig(() => {
            // cc.gameSpace.isConfigLoadFinished = true;
            this.lbVersion.string = `Version. ${localConfig.instance.getVersion()}`;
            this.isConfigLoaded = true;
            this.loadMainScene();
          });
          this.curProgress += 5;

          if (this.loadingUI) {
            this.loadingUI.updateProgress(this.curProgress, i18n.t("main.dataLoadOver"));
          }

          this.curProgress += 5; // this.loadingUI.updateProgress(this.curProgress, '登录中...');
          //其他环境下，直接开始加载资源

          this.curProgress += 15;
          this.loadingUI.updateProgress(this.curProgress, i18n.t("main.gameResourceLoading")); //普通用户登录

          playerData.instance.loadGlobalCache();

          if (!playerData.instance.userId) {
            //需要创建个账号
            this.uid = configuration.generateGuestAccount();
          } else {
            this.uid = playerData.instance.userId;
          }

          this.startLogin();
          this.downloadGameRes(() => {
            console.log('subpackage download finished!');
            this.isSubPackageFinished = true;
            this.loadMainScene();
          });
        }

        startLogin() {
          configuration.instance.setUserId(this.uid);
          playerData.instance.syncServerTime(Date.now());
          this.userLogin();
        }

        userLogin() {
          playerData.instance.loadFromCache();

          if (playerData.instance.playerInfo.createDate === undefined) {
            //表示没有创建过
            playerData.instance.createPlayerInfo();
          }

          console.log('login finished!');
          this.isLoginFinished = true;
          this.loadMainScene();
        }

        downloadGameRes(cb) {
          //不用加载子包，直接+30
          this.curProgress += 15;
          this.loadingUI.updateProgress(this.curProgress);
          cb && cb();
        }

        showSubPackageError() {}

        loadGameSubPackage(cb) {
          this.loadingUI.updateProgress(this.curProgress, i18n.t("main.audioResourceLoading"));
          assetManager.loadBundle('resources', err => {
            this.curProgress += 5;
            this.loadingUI.updateProgress(this.curProgress, i18n.t("main.audioResourceLoading"));

            if (err) {
              this.showSubPackageError();
              return console.error(err);
            }

            assetManager.loadBundle('textures', err => {
              this.curProgress += 5;
              this.loadingUI.updateProgress(this.curProgress, i18n.t("main.mappingResourceLoading"));

              if (err) {
                this.showSubPackageError();
                return console.error(err);
              }

              assetManager.loadBundle('model', err => {
                this.curProgress += 5;
                this.loadingUI.updateProgress(this.curProgress, i18n.t("main.modelResourceLoading"));

                if (err) {
                  this.showSubPackageError();
                  return console.error(err);
                }

                cb && cb();
              });
            });
          });
        }

        loadMainScene() {
          if (!this.isConfigLoaded || !this.isLoginFinished || !this.isSubPackageFinished) {
            //配置，子包，登录，三项没有加载成功的话要等下一项
            return;
          }

          director.preloadScene('main', err => {
            this.curProgress += 5;
            this.loadingUI.updateProgress(this.curProgress, i18n.t("main.entering"));

            if (!err) {
              director.loadScene('main', function () {});
            }
          });
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbVersion", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "loadingUI", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/effectManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './audioManager.ts', './constant.ts', './poolManager.ts', './carManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Prefab, _decorator, Component, clientEvent, audioManager, constant, poolManager, carManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      audioManager = module.audioManager;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      poolManager = module.poolManager;
    }, function (module) {
      carManager = module.carManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "cf371ivOc1Ae64t3ScAzqjv", "effectManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let effectManager = exports('effectManager', (_dec = ccclass("effectManager"), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: carManager
      }), _dec(_class = (_class2 = (_temp = class effectManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "pfTailLine", _descriptor, this);

          _initializerDefineProperty(this, "carManager", _descriptor2, this);

          _defineProperty(this, "currentNode", null);
        }

        start() {// Your initialization goes here.
        }

        onEnable() {
          clientEvent.on('startBraking', this.onBrakingStart, this);
          clientEvent.on('endBraking', this.onBrakingEnd, this);
        }

        onDisable() {
          clientEvent.off('startBraking', this.onBrakingStart, this);
          clientEvent.off('endBraking', this.onBrakingEnd, this);
        }

        onBrakingStart() {
          this.currentNode = poolManager.instance.getNode(this.pfTailLine, this.node);
          this.currentNode.setWorldPosition(this.carManager.mainCar.node.worldPosition);
          this.currentNode.eulerAngles = this.carManager.mainCar.node.eulerAngles;
          audioManager.instance.playSound(constant.AUDIO_SOUND.STOP);
        }

        onBrakingEnd() {
          let node = this.currentNode;
          this.currentNode = null;
          this.scheduleOnce(() => {
            if (node && node.isValid) {
              poolManager.instance.putNode(node);
            }
          }, 2);
        }

        update(deltaTime) {
          // Your update function goes here.
          if (this.currentNode && this.carManager.mainCar) {
            this.currentNode.setWorldPosition(this.carManager.mainCar.node.worldPosition);
            this.currentNode.eulerAngles = this.carManager.mainCar.node.eulerAngles;
          }
        }

        reset() {
          if (this.currentNode) {
            poolManager.instance.putNode(this.currentNode);
            poolManager.instance.clearPool(this.currentNode.name);
            this.currentNode = null; //原有的都释放掉

            let arr = this.node.children.slice(0);

            for (let idx = 0; idx < arr.length; idx++) {
              let node = arr[idx];

              if (node && node.isValid) {
                node.destroy();
              }
            }
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pfTailLine", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "carManager", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/flyReward.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './flyRewardItem.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, SpriteFrame, Node, Animation, _decorator, Component, find, Vec3, clientEvent, flyRewardItem;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteFrame = module.SpriteFrame;
      Node = module.Node;
      Animation = module.Animation;
      _decorator = module._decorator;
      Component = module.Component;
      find = module.find;
      Vec3 = module.Vec3;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      flyRewardItem = module.flyRewardItem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "d14d4EewSBFtIn6B/rRUvjM", "flyReward", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const MAX_REWARD_COUNT = 10;
      let flyReward = exports('flyReward', (_dec = ccclass("flyReward"), _dec2 = property(SpriteFrame), _dec3 = property(Node), _dec4 = property(Animation), _dec(_class = (_class2 = (_temp = class flyReward extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "imgGold", _descriptor, this);

          _initializerDefineProperty(this, "ndRewardParent", _descriptor2, this);

          _initializerDefineProperty(this, "aniBoom", _descriptor3, this);

          _defineProperty(this, "finishIdx", 0);

          _defineProperty(this, "_callback", undefined);

          _defineProperty(this, "isGoldOrDiamond", true);
        }

        start() {
          // Your initialization goes here.
          this.aniBoom.play();
          this.createReward();
        }

        getTargetPos() {
          let nodeGold = find('Canvas/goldPos');

          if (!nodeGold) {
            this.node.destroy();

            if (this._callback) {
              this._callback();
            }

            return Vec3.ZERO;
          }

          return nodeGold.position;
        }

        createReward() {
          let imgReward = this.imgGold; // if (!this.isGoldOrDiamond) {
          //     imgReward = this.imgDiamond;
          // }

          let targetPos = this.getTargetPos();

          for (var idx = 0; idx < MAX_REWARD_COUNT; idx++) {
            let rewardNode = new Node('flyRewardItem');
            let flyItem = rewardNode.addComponent(flyRewardItem);
            rewardNode.parent = this.ndRewardParent;
            flyItem.show(imgReward, targetPos, node => {
              this.onFlyOver(node);
            });
          }
        }

        setInfo(isGoldOrDiamond) {
          this.isGoldOrDiamond = isGoldOrDiamond;
        }

        onFlyOver(node) {
          if (this.isGoldOrDiamond) {
            clientEvent.dispatchEvent('receiveGold');
          } else {
            clientEvent.dispatchEvent('receiveDiamond');
          } // cc.gameSpace.audioManager.playSound('sell', false);


          node.active = false;
          this.finishIdx++;

          if (this.finishIdx === MAX_REWARD_COUNT) {
            if (this._callback) {
              this._callback();
            }

            this.node.destroy();
          }
        }
        /**
         * 设置播放回调
         * @param {Function} callback
         * @param {Object} target
         */


        setEndListener(callback) {
          this._callback = callback;
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "imgGold", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ndRewardParent", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "aniBoom", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LanguageData.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './polyglot.min.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, director, Polyglot;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
    }, function (module) {
      Polyglot = module.Polyglot;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d6597NeRz5OuZ6kceJkHWc3", "LanguageData", undefined);

      let polyInst;

      if (!window.i18nConfig) {
        window.i18nConfig = {
          languages: {},
          curLang: ''
        };
      } // if (CC_EDITOR) {
      //     Editor.Profile.load('profile://project/i18n.json', (err, profile) => {
      //         window.i18nConfig.curLang = profile.data['default_language'];
      //         if (polyInst) {
      //             let data = loadLanguageData(window.i18nConfig.curLang) || {};
      //             initPolyglot(data);
      //         }
      //     });
      // }


      function loadLanguageData(language) {
        //@ts-ignore
        return window.i18nConfig.languages[language];
      }

      function initPolyglot(data) {
        if (data) {
          if (polyInst) {
            polyInst.replace(data);
          } else {
            polyInst = new Polyglot({
              phrases: data,
              allowMissing: true
            });
          }
        }
      } // module.exports = {


      class i18n {
        /**
         * This method allow you to switch language during runtime, language argument should be the same as your data file name
         * such as when language is 'zh', it will load your 'zh.js' data source.
         * @method init
         * @param language - the language specific data file name, such as 'zh' to load 'zh.js'
         */
        static init(language) {
          if (!language || language === window.i18nConfig.curLang) {
            return;
          }

          let data = loadLanguageData(language) || {};
          window.i18nConfig.curLang = language;
          initPolyglot(data);
          this.inst = polyInst;
        }
        /**
         * this method takes a text key as input, and return the localized string
         * Please read https://github.com/airbnb/polyglot.js for details
         * @method t
         * @return {String} localized string
         * @example
         *
         * var myText = i18n.t('MY_TEXT_KEY');
         *
         * // if your data source is defined as
         * // {"hello_name": "Hello, %{name}"}
         * // you can use the following to interpolate the text
         * var greetingText = i18n.t('hello_name', {name: 'nantas'}); // Hello, nantas
         */


        static t(key, opt) {
          if (Object.keys(polyInst.phrases).length === 0) {
            let data = loadLanguageData(window.i18nConfig.curLang) || {};
            initPolyglot(data);
            console.warn('###防止出现parses数据丢失，重新替换数据');
          }

          if (polyInst) {
            return polyInst.t(key, opt);
          }
        } // inst: polyInst


        updateSceneRenderers() {
          // very costly iterations
          let rootNodes = director.getScene().children; // walk all nodes with localize label and update

          let allLocalizedLabels = [];

          for (let i = 0; i < rootNodes.length; ++i) {
            let labels = rootNodes[i].getComponentsInChildren('LocalizedLabel');
            Array.prototype.push.apply(allLocalizedLabels, labels);
          }

          for (let i = 0; i < allLocalizedLabels.length; ++i) {
            let label = allLocalizedLabels[i];
            if (!label.node.active) continue;
            label.updateLabel();
          } // walk all nodes with localize sprite and update


          let allLocalizedSprites = [];

          for (let i = 0; i < rootNodes.length; ++i) {
            let sprites = rootNodes[i].getComponentsInChildren('LocalizedSprite');
            Array.prototype.push.apply(allLocalizedSprites, sprites);
          }

          for (let i = 0; i < allLocalizedSprites.length; ++i) {
            let sprite = allLocalizedSprites[i];
            if (!sprite.node.active) continue;
            sprite.updateSprite(window.i18nConfig.curLang);
          }
        }

      }

      exports('i18n', i18n);

      _defineProperty(i18n, "inst", null);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/lottery.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './configuration.ts', './clientEvent.ts', './constant.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts', './lodash.ts', './lotteryItem.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, Prefab, Button, Label, SpriteFrame, Sprite, _decorator, Component, instantiate, Color, Vec3, tween, configuration, clientEvent, constant, localConfig, playerData, uiManager, gameLogic, lodash, lotteryItem;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Prefab = module.Prefab;
      Button = module.Button;
      Label = module.Label;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
      Color = module.Color;
      Vec3 = module.Vec3;
      tween = module.tween;
    }, function (module) {
      configuration = module.configuration;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      gameLogic = module.gameLogic;
    }, function (module) {
      lodash = module.lodash;
    }, function (module) {
      lotteryItem = module.lotteryItem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _temp;

      cclegacy._RF.push({}, "d7ed7RMvvZIvbdJyWwfIGDy", "lottery", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const LOTTERY_PART = 6;
      let lottery = exports('lottery', (_dec = ccclass("lottery"), _dec2 = property(Node), _dec3 = property(Prefab), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Button), _dec7 = property(Button), _dec8 = property(Label), _dec9 = property(SpriteFrame), _dec10 = property(SpriteFrame), _dec11 = property(SpriteFrame), _dec12 = property(Sprite), _dec13 = property(Sprite), _dec14 = property(Sprite), _dec(_class = (_class2 = (_temp = class lottery extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "arrRewardNode", _descriptor, this);

          _initializerDefineProperty(this, "pfRewardItem", _descriptor2, this);

          _initializerDefineProperty(this, "nodeTurnable", _descriptor3, this);

          _initializerDefineProperty(this, "ndBtnClose", _descriptor4, this);

          _initializerDefineProperty(this, "btnLottery", _descriptor5, this);

          _initializerDefineProperty(this, "btnAd", _descriptor6, this);

          _initializerDefineProperty(this, "lbMoney", _descriptor7, this);

          _initializerDefineProperty(this, "imgLotteryBtnDisable", _descriptor8, this);

          _initializerDefineProperty(this, "imgLotteryBtnEnable", _descriptor9, this);

          _initializerDefineProperty(this, "imgAdBtnEnable", _descriptor10, this);

          _initializerDefineProperty(this, "spLotteryBtn", _descriptor11, this);

          _initializerDefineProperty(this, "spAdIcon", _descriptor12, this);

          _initializerDefineProperty(this, "spAdBtn", _descriptor13, this);

          _defineProperty(this, "arrRewardData", []);

          _defineProperty(this, "arrLotteryItem", []);

          _defineProperty(this, "arrProbability", []);

          _defineProperty(this, "randValue", 0);

          _defineProperty(this, "curRotation", null);

          _defineProperty(this, "_receiveCarTimes", 0);
        } //获取车的次数


        set receiveCarTimes(num) {
          console.log("#####receiveCarTimes", num);
          this._receiveCarTimes = num;
        }

        get receiveCarTimes() {
          return this._receiveCarTimes;
        }

        start() {// Your initialization goes here.
        }

        onEnable() {
          clientEvent.on('buyCar', this.onBuyCar, this);
        }

        onDisable() {
          clientEvent.off('buyCar', this.onBuyCar, this);
        }

        onBuyCar() {
          this.initReward(); //更新下奖励界面
        }

        show() {
          this.initReward();
          this.initInfo();
          this.btnAd.node.active = true;
        }

        initReward() {
          let arrCars = localConfig.instance.getCars(); //获得所有车

          let arrLottery = [];
          arrCars.forEach(element => {
            if (!playerData.instance.hasCar(element.ID) && element.type === constant.BUY_CAR_TYPE.GOLD) {
              //未拥有的车辆，加入抽奖列表
              arrLottery.push(element.ID);
            }
          });

          if (arrLottery.length < 6) {
            //不足6辆，从已有的车辆中获得
            let arrHas = lodash.cloneDeep(playerData.instance.playerInfo.cars);

            while (arrLottery.length < 6) {
              //凑足6辆
              let rand = Math.floor(Math.random() * arrHas.length);
              let carId = arrHas[rand];
              let car = localConfig.instance.queryByID('car', carId);

              if (car.type === constant.BUY_CAR_TYPE.GOLD) {
                arrLottery.push(arrHas.splice(rand, 1)[0]);
              }
            }
          }

          this.arrRewardData = arrLottery;
          this.arrProbability = [];
          let start = 0;

          for (let idx = 0; idx < this.arrRewardNode.length; idx++) {
            let parentNode = this.arrRewardNode[idx];
            let rewardItem = this.arrLotteryItem[idx];

            if (!rewardItem) {
              rewardItem = instantiate(this.pfRewardItem);
              rewardItem.parent = parentNode;
              this.arrLotteryItem[idx] = rewardItem;
            }

            if (this.arrRewardData.length > idx) {
              let car = this.arrRewardData[idx];
              let script = rewardItem.getComponent(lotteryItem);
              script.show(car);
              let min = start;
              let max = start + 100 / LOTTERY_PART; //平均概率

              this.arrProbability.push({
                min: min,
                max: max,
                idx: idx
              });
              start = max;
            }
          }
        }

        initInfo() {
          this.lbMoney.string = '' + constant.LOTTERY.MONEY;
          this.checkButton();
        }

        checkButton() {
          const isFree = this.checkIsFree();
          this.btnAd.node.active = isFree;
          this.btnLottery.node.active = !isFree;

          if (isFree) {
            return;
          }

          if (playerData.instance.playerInfo.gold > constant.LOTTERY.MONEY) {
            this.lbMoney.color = new Color(163, 64, 27);
            this.lotteryBtnEnable = true;
            this.adBtnEnable = false;
          } else {
            this.lbMoney.color = Color.RED;
            this.lotteryBtnEnable = false;
            this.adBtnEnable = true;
          }

          gameLogic.updateRewardIcon(constant.SHARE_FUNCTION.LOTTERY, this.spAdIcon, () => {});
        }

        checkIsFree() {
          let signInInfo = playerData.instance.playerInfo.signInInfo;
          const currentDay = signInInfo.currentDay;
          const data = configuration.instance.getGlobalData('rewardDays');
          const isFree = data === undefined || parseInt(data) < currentDay ? true : false;
          return isFree;
        }

        set lotteryBtnEnable(value) {
          if (value) {
            this.btnLottery.interactable = true;
            this.spLotteryBtn.spriteFrame = this.imgLotteryBtnEnable;
          } else {
            this.btnLottery.interactable = false;
            this.spLotteryBtn.spriteFrame = this.imgLotteryBtnDisable;
          }
        }

        set adBtnEnable(value) {
          if (value) {
            this.btnAd.interactable = true;
            this.spAdBtn.spriteFrame = this.imgAdBtnEnable;
          } else {
            this.btnAd.interactable = false;
            this.spAdBtn.spriteFrame = this.imgLotteryBtnDisable;
          }
        }

        getRandValue() {
          let idxRand = -1;

          while (idxRand === -1) {
            let rand = Math.floor(Math.random() * 100);

            for (let idx = 0; idx < this.arrProbability.length; idx++) {
              let probability = this.arrProbability[idx];

              if (rand >= probability.min && rand < probability.max) {
                idxRand = probability.idx;
                break;
              }
            }
          }

          return idxRand;
        }

        onBtnStartClick() {
          //扣除对应金币
          gameLogic.addGold(-constant.LOTTERY.MONEY); //每抽一次扣一次

          this.startRun();
        }

        onBtnAdClick() {
          const data = configuration.instance.getGlobalData('rewardDays');
          configuration.instance.setGlobalData('rewardDays', `${!data ? 0 : parseInt(data) + 1}`);
          gameLogic.openReward(constant.SHARE_FUNCTION.LOTTERY, err => {
            if (!err) {
              this.startRun();
            }
          });
        }

        startRun() {
          this.lotteryBtnEnable = false;
          this.adBtnEnable = false;
          this.ndBtnClose.getComponent(Button).interactable = false; //随机抽奖结果

          this.randValue = this.getRandValue(); //开始旋转
          //先开始第一轮，根据当前度数，将其旋转至360度

          let targetRotation = -360;
          let curRotation = this.nodeTurnable.eulerAngles.z % 360;
          this.nodeTurnable.eulerAngles = new Vec3(0, 0, curRotation);
          let offset = 360 - curRotation;
          let randTimes = 3 + Math.floor(Math.random() * 4);
          let rotate = targetRotation - randTimes * 360 + this.randValue * 60 + 30 - 360;
          this.curRotation = this.nodeTurnable.eulerAngles.clone();
          tween(this.curRotation) // .to(offset/360 + randTimes * 0.5, new Vec3(0, 0, rotate), { easing: 'Circular-Out'})
          .to(offset / 360 + randTimes * 0.5, new Vec3(0, 0, rotate), {
            easing: 'cubicOut'
          }).call(() => {
            this.curRotation = null;
            this.showReward();
          }).start(); // this.nodeTurnable.eulerAngles = new Vec3(0, 0, rotate);
        }

        showReward() {
          this.ndBtnClose.getComponent(Button).interactable = true;
          let itemNode = this.arrLotteryItem[this.randValue];
          let lottery = itemNode.getComponent(lotteryItem);
          lottery.showReward(this);
          this.checkButton();
        }

        onBtnCloseClick() {
          // cc.gameSpace.audioManager.playSound('click', false);
          uiManager.instance.hideDialog('lottery/lottery');
        }

        update(deltaTime) {
          // Your update function goes here.
          if (this.curRotation) {
            this.nodeTurnable.eulerAngles = this.curRotation;
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "arrRewardNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pfRewardItem", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeTurnable", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnClose", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "btnLottery", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "btnAd", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "lbMoney", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "imgLotteryBtnDisable", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "imgLotteryBtnEnable", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "imgAdBtnEnable", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "spLotteryBtn", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "spAdIcon", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "spAdBtn", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightCanvas.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './carManager.ts', './gameLogic.ts', './loading.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, SpriteFrame, Node, _decorator, Component, clientEvent, carManager, gameLogic, loading;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteFrame = module.SpriteFrame;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      carManager = module.carManager;
    }, function (module) {
      gameLogic = module.gameLogic;
    }, function (module) {
      loading = module.loading;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "daea1EBoy1Ms6PBdAupQWnn", "fightCanvas", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let fightCanvas = exports('fightCanvas', (_dec = ccclass("fightCanvas"), _dec2 = property(carManager), _dec3 = property(SpriteFrame), _dec4 = property(SpriteFrame), _dec5 = property(loading), _dec6 = property(Node), _dec(_class = (_class2 = (_temp = class fightCanvas extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "carManager", _descriptor, this);

          _initializerDefineProperty(this, "imgShare", _descriptor2, this);

          _initializerDefineProperty(this, "imgVideo", _descriptor3, this);

          _initializerDefineProperty(this, "loadingUI", _descriptor4, this);

          _initializerDefineProperty(this, "tip", _descriptor5, this);

          _defineProperty(this, "curProgress", 50);

          _defineProperty(this, "isFirstLoad", true);

          _defineProperty(this, "isTouching", false);
        } //是否正在点击中


        start() {
          gameLogic.imgAd = this.imgVideo;
          gameLogic.imgShare = this.imgShare; //首次进来，起始50%（前面为登录加载）

          this.loadingUI.show(this.curProgress); // Your initialization goes here.

          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }

        onEnable() {
          clientEvent.on('updateLoading', this.updateLoadingProgress, this);
          clientEvent.on('showGuide', this.showGuide, this);
        }

        onDisable() {
          clientEvent.off('updateLoading', this.updateLoadingProgress, this);
          clientEvent.off('showGuide', this.showGuide, this);
        }

        onTouchStart() {
          this.isTouching = true;
          this.tip.active = false;
          this.carManager.controlMainCar(true);
        }

        onTouchEnd() {
          this.isTouching = false;
          this.carManager.controlMainCar(false);
        }

        showGuide(isShow) {
          if (isShow && this.isTouching) {
            //异步执行，使引导正常，因为
            this.scheduleOnce(() => {
              this.onTouchStart();
            }, 0);
          }
        }

        updateLoadingProgress(progress, tips) {
          if (!this.isFirstLoad) {
            this.curProgress += progress;
          } else {
            this.curProgress += Math.floor(progress / 2); //首次加载是跟登录一块的，这样起始是50%
          }

          this.loadingUI.updateProgress(this.curProgress, tips);
        }

        loadNewLevel() {
          this.loadingUI.node.active = true;
          this.curProgress = 0;
          this.isFirstLoad = false;
        }

        finishLoading() {
          this.loadingUI.node.active = false;
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "carManager", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "imgShare", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "imgVideo", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "loadingUI", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "tip", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightConstants.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dbe36y+LwBGGIL8I87F3O+/", "fightConstants", undefined); // Learn cc.Class:
      //  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
      //  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
      // Learn Attribute:
      //  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
      //  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
      // Learn life-cycle callbacks:
      //  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
      //  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


      class fightConstants {}

      exports('fightConstants', fightConstants);

      _defineProperty(fightConstants, "ROAD_POINT_TYPE", {
        NORMAL: 1,
        //普通节点
        START: 2,
        //开始节点
        GREETING: 3,
        //接客节点
        PLATFORM: 4,
        //送客节点（用于接客及送客）
        END: 5,
        //结束节点
        AI_START: 6 //机器人开始节点

      });

      _defineProperty(fightConstants, "ROAD_MOVE_TYPE", {
        LINE: 1,
        //直线行走
        BEND: 2 //曲线行走

      });

      _defineProperty(fightConstants, "CAR_GROUP", {
        NORMAL: 1,
        MAIN_CAR: 2,
        OTHER_CAR: 4
      });

      _defineProperty(fightConstants, "CUSTOMER_TALK_TIME", {
        INTO_THE_CAR: 1,
        //上车后
        NEW_ORDER: 2 //有新订单的时候

      });

      _defineProperty(fightConstants, "CLICK_BOX_REWARD", 300);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/audioManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './configuration.ts', './resourceUtil.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, assert, AudioClip, warn, clamp01, configuration, resourceUtil;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      assert = module.assert;
      AudioClip = module.AudioClip;
      warn = module.warn;
      clamp01 = module.clamp01;
    }, function (module) {
      configuration = module.configuration;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e478cuMHJdIHa5fP3m5UZ7S", "audioManager", undefined);

      class audioManager {
        constructor() {
          _defineProperty(this, "soundVolume", 1);
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new audioManager();
          return this._instance;
        } // init AudioManager in GameRoot.


        init(audioSource) {
          this.soundVolume = this.getConfiguration(false) ? 1 : 0;
          audioManager._audioSource = audioSource;
        }

        getConfiguration(isMusic) {
          let state;

          if (isMusic) {
            state = configuration.instance.getGlobalData('music');
          } else {
            state = configuration.instance.getGlobalData('sound');
          } // console.log('Config for [' + (isMusic ? 'Music' : 'Sound') + '] is ' + state);


          return state === undefined || state === 'true' ? true : false;
        }
        /**
         * 播放音乐
         * @param {String} name 音乐名称可通过constants.AUDIO_MUSIC 获取
         * @param {Boolean} loop 是否循环播放
         */


        playMusic(loop) {
          const audioSource = audioManager._audioSource;
          assert(audioSource, 'AudioManager not inited!');
          audioSource.loop = loop;

          if (!audioSource.playing) {
            audioSource.play();
          }
        }
        /**
         * 播放音效
         * @param {String} name 音效名称可通过constants.AUDIO_SOUND 获取
         */


        playSound(name) {
          const audioSource = audioManager._audioSource;
          assert(audioSource, 'AudioManager not inited!'); //音效一般是多个的，不会只有一个

          let path = 'gamePackage/audio/sound/'; // if (name !== 'click') {
          //     path = 'gamePackage/' + path; //微信特殊处理，除一开场的音乐，其余的放在子包里头
          // }

          resourceUtil.loadRes(path + name, AudioClip, (err, clip) => {
            if (err) {
              warn('load audioClip failed: ', err);
              return;
            } // NOTE: the second parameter is volume scale.


            audioSource.playOneShot(clip, audioSource.volume ? this.soundVolume / audioSource.volume : 0);
          });
        }

        setMusicVolume(flag) {
          const audioSource = audioManager._audioSource;
          assert(audioSource, 'AudioManager not inited!');
          flag = clamp01(flag);
          audioSource.volume = flag;
        }

        setSoundVolume(flag) {
          this.soundVolume = flag;
        }

        openMusic() {
          this.setMusicVolume(0.8);
          configuration.instance.setGlobalData('music', 'true');
        }

        closeMusic() {
          this.setMusicVolume(0);
          configuration.instance.setGlobalData('music', 'false');
        }

        openSound() {
          this.setSoundVolume(1);
          configuration.instance.setGlobalData('sound', 'true');
        }

        closeSound() {
          this.setSoundVolume(0);
          configuration.instance.setGlobalData('sound', 'false');
        }

      }

      exports('audioManager', audioManager);

      _defineProperty(audioManager, "_instance", void 0);

      _defineProperty(audioManager, "_audioSource", void 0);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/car.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './fightConstants.ts', './clientEvent.ts', './resourceUtil.ts', './audioManager.ts', './constant.ts', './poolManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _defineProperty, _initializerDefineProperty, cclegacy, Node, _decorator, Component, instantiate, Vec3, ParticleSystem, RigidBody, Collider, ERigidBodyType, fightConstants, clientEvent, resourceUtil, audioManager, constant, poolManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _defineProperty = module.defineProperty;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      ParticleSystem = module.ParticleSystem;
      RigidBody = module.RigidBody;
      Collider = module.Collider;
      ERigidBodyType = module.ERigidBodyType;
    }, function (module) {
      fightConstants = module.fightConstants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      audioManager = module.audioManager;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      poolManager = module.poolManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "e6d4fVD3pxJ7Y1Khf8fRUoa", "car", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const TOOTING_COOL_TIME = 5; //5s后才会再次鸣笛

      let car = exports('car', (_dec = ccclass("car"), _dec2 = property({
        displayName: '最大移动速度'
      }), _dec3 = property({
        displayName: '最小移动速度'
      }), _dec4 = property(Node), _dec(_class = (_class2 = (_temp = class car extends Component {
        set isMoving(value) {
          this._isMoving = value;
          this.updateBackLight();
        }

        get isMoving() {
          return this._isMoving;
        } //无敌特效
        //是否正在接客


        set isHosting(value) {
          this._isHosting = value;
          this.updateBackLight();
        }

        get isHosting() {
          return this._isHosting;
        }

        set isInvincible(isShow) {
          this._isInvincible = isShow;

          if (isShow) {
            if (this.nodeInvincible) {
              //已经存在该特效
              this.nodeInvincible.active = true;
              return;
            } else {
              resourceUtil.getEffect('shield', (err, prefab) => {
                if (err) {
                  console.error(err);
                  return;
                }

                this.nodeInvincible = instantiate(prefab);
                this.nodeInvincible.parent = this.node;
              });
            }
          } else {
            if (this.nodeInvincible) {
              this.nodeInvincible.destroy();
              this.nodeInvincible = null;
            }
          }
        }

        get isInvincible() {
          return this._isInvincible;
        }

        constructor() {
          super();

          _defineProperty(this, "_isMoving", false);

          _initializerDefineProperty(this, "maxSpeed", _descriptor, this);

          _initializerDefineProperty(this, "minSpeed", _descriptor2, this);

          _initializerDefineProperty(this, "nodeGas", _descriptor3, this);

          _defineProperty(this, "_minSpeed", -1);

          _defineProperty(this, "_maxSpeed", -1);

          _defineProperty(this, "manager", null);

          _defineProperty(this, "isMain", false);

          _defineProperty(this, "currentSpeed", 0);

          _defineProperty(this, "accelerate", 2);

          _defineProperty(this, "originRotation", 0);

          _defineProperty(this, "targetRotation", 0);

          _defineProperty(this, "curRoadPoint", null);

          _defineProperty(this, "circleCenterPoint", new Vec3());

          _defineProperty(this, "quarter", 0);

          _defineProperty(this, "_nodeGasInst", null);

          _defineProperty(this, "entry", null);

          _defineProperty(this, "forward", new Vec3(0, 0, -1));

          _defineProperty(this, "posTarget", new Vec3());

          _defineProperty(this, "posSrc", new Vec3());

          _defineProperty(this, "_callback", null);

          _defineProperty(this, "isOver", false);

          _defineProperty(this, "curProgress", 0);

          _defineProperty(this, "maxProgress", 0);

          _defineProperty(this, "hasCustomer", false);

          _defineProperty(this, "lastPos", new Vec3());

          _defineProperty(this, "lastRotation", new Vec3());

          _defineProperty(this, "isBraking", false);

          _defineProperty(this, "arrTyres", []);

          _defineProperty(this, "curTyreRotation", 0);

          _defineProperty(this, "nodeCarBackLight", null);

          _defineProperty(this, "tootingCoolTime", 0);

          _defineProperty(this, "isCarMoving", false);

          _defineProperty(this, "nodeInvincible", null);

          _defineProperty(this, "_isHosting", false);

          _defineProperty(this, "_isInvincible", false);

          _defineProperty(this, "invincibleRotation", 0);
        }

        start() {
          // Your initialization goes here.
          this._minSpeed = this.minSpeed;
          this._maxSpeed = this.maxSpeed;
          let tyre1 = this.node.getChildByPath('RootNode/tyre1');

          if (tyre1) {
            this.arrTyres = [tyre1, this.node.getChildByPath('RootNode/tyre2'), this.node.getChildByPath('RootNode/tyre3'), this.node.getChildByPath('RootNode/tyre4')];
            this.nodeCarBackLight = this.node.getChildByPath('RootNode/light1');
          } //异步加载尾气,不需要每个都去创建一个


          resourceUtil.getEffect('gas', (err, prefab) => {
            if (err) {
              return;
            }

            const gas = poolManager.instance.getNode(prefab, this.nodeGas);
            this._nodeGasInst = gas.getComponent(ParticleSystem);
            gas.setPosition(new Vec3(0, 0, 0));
          });
        }
        /**
         * 标记为主车
         */


        markMainCar(isMain) {
          this.isMain = isMain;
          let rigidBody = this.node.getComponent(RigidBody);
          let collider = this.node.getComponent(Collider);
          collider.off("onCollisionEnter", this.onCollisionEnter, this);

          if (isMain) {
            rigidBody.setGroup(fightConstants.CAR_GROUP.MAIN_CAR);
            rigidBody.setMask(fightConstants.CAR_GROUP.OTHER_CAR);
            rigidBody.type = ERigidBodyType.KINEMATIC;
            collider.on("onCollisionEnter", this.onCollisionEnter, this);
          } else {
            rigidBody.setGroup(fightConstants.CAR_GROUP.OTHER_CAR);
            rigidBody.setMask(-1);
            rigidBody.type = ERigidBodyType.DYNAMIC;
          }
        }

        setEntry(entry) {
          this.entry = entry;
          this.reset();
        }

        onCollisionEnter(event) {
          if (!this.isMain) {
            return;
          }

          if (event.otherCollider.node.name === 'ground') {
            return;
          }

          let nodeEnemy = event.otherCollider.node;

          if (event.otherCollider.node === this.node) {
            nodeEnemy = event.selfCollider.node;
          }

          let car = nodeEnemy.getComponent('car');

          if (!car.isOver) {
            car.isOver = true; //标准这辆车出车祸了

            let enemyRigidBody = nodeEnemy.getComponent(RigidBody);
            enemyRigidBody.useGravity = true;

            if (!this.isInvincible) {
              enemyRigidBody.applyForce(new Vec3(0, 1500, -3000), new Vec3(0, 0.5, 0));
            } else {
              enemyRigidBody.applyForce(new Vec3(0, 10000, -3000), new Vec3(0, 0.5, 0));
            }
          }

          if (this.isOver) {
            return;
          }

          audioManager.instance.playSound(constant.AUDIO_SOUND.CRASH);
          let rigidBody = this.node.getComponent(RigidBody);

          if (this.isInvincible) {
            this.lastPos = this.node.worldPosition;
            this.lastRotation = this.node.eulerAngles;
            rigidBody.enabled = false; //将物理引擎中的速度置为0

            this.scheduleOnce(() => {
              this.isInvincible = false;
              rigidBody.enabled = true; //修复无敌状态时撞到AI小车导致bug

              this.revive();
              this.currentSpeed = this._minSpeed;
            }, 0.1);
            this.scheduleOnce(() => {
              poolManager.instance.putNode(nodeEnemy);
            }, 0.3);
            return;
          } //发生碰撞，游戏结束，记录下最后的车辆信息


          this.lastPos = this.node.worldPosition;
          this.lastRotation = this.node.eulerAngles;
          this.isOver = true; // rigidBody.useGravity = true;

          rigidBody.setGroup(fightConstants.CAR_GROUP.MAIN_CAR);
          rigidBody.setMask(fightConstants.CAR_GROUP.OTHER_CAR | fightConstants.CAR_GROUP.NORMAL);
          clientEvent.dispatchEvent('gameOver', false);
        }

        updateBackLight() {
          if (this.nodeCarBackLight) {
            this.nodeCarBackLight.active = !this.isMoving || this.isHosting;
          }
        }

        startRunning() {
          if (this.isOver) {
            return;
          }

          this.isMoving = true;
          this.accelerate = 0.4;

          if (this._nodeGasInst) {
            this._nodeGasInst.play();
          }

          if (this.isBraking) {
            clientEvent.dispatchEvent('endBraking');
            this.isBraking = false;
          }
        }

        startWithMinSpeed() {
          this.currentSpeed = this.minSpeed;
          this.stopRunning(true);

          if (this._nodeGasInst) {
            this._nodeGasInst.play();
          } // if (this.isMain) {
          //     this.isInvincible = true;
          // }

        }

        stopRunning(isInit) {
          if (this.isOver) {
            return;
          }

          this.isMoving = false;
          this.accelerate = -0.15;

          if (!this.isBraking && !isInit) {
            clientEvent.dispatchEvent('startBraking');
            this.isBraking = true;
          }
        }

        stopImmediately() {
          this.isMoving = false;
          this.currentSpeed = 0;
        }

        setMoveOverListener(callback) {
          this._callback = callback;
        }

        resetPhysical() {
          this.isOver = false;

          if (this.isMain) {
            this.markMainCar(true);
          } //初始化物理引擎相关信息


          let rigidBody = this.node.getComponent(RigidBody);
          rigidBody.useGravity = false; //将物理引擎中的速度置为0

          rigidBody.sleep();
          rigidBody.wakeUp();
        }

        revive() {
          //复活
          this.resetPhysical();
          console.log("revive pos ", this.lastPos);
          let lastPos = new Vec3(this.lastPos.x, 0, this.lastPos.z);
          this.node.setWorldPosition(lastPos);
          this.node.eulerAngles = this.lastRotation;
          this.isMoving = false;
          this.currentSpeed = 0;
        }

        reset() {
          //获得对应路径，但目前我们只做了主路的，所以先用主路线,主路线默认索引为0
          this.resetPhysical();

          if (this.isMain) {
            this.curProgress = 0;
            this.hasCustomer = false;

            if (this._nodeGasInst) {
              this._nodeGasInst.stop();
            }

            this.isInvincible = false;
          }

          this.tootingCoolTime = 0;
          this.curRoadPoint = this.entry.getComponent('roadPoint');
          this.posSrc.set(this.entry.worldPosition);
          this.posTarget.set(this.curRoadPoint.next.worldPosition); //初始化位置

          this.node.setWorldPosition(this.entry.worldPosition); //初始化旋转角度

          if (this.posTarget.z !== this.posSrc.z) {
            if (this.posTarget.z < this.posSrc.z) {
              //向上
              this.node.eulerAngles = new Vec3(0, 360, 0);
            } else {
              //向下
              this.node.eulerAngles = new Vec3(0, 180, 0);
            }
          } else {
            if (this.posTarget.x > this.posSrc.x) {
              //向上
              this.node.eulerAngles = new Vec3(0, 270, 0);
            } else {
              //向下
              this.node.eulerAngles = new Vec3(0, 90, 0);
            }
          }

          this.originRotation = this.node.eulerAngles.y;
          this.targetRotation = this.originRotation;
          this.isMoving = false;
          this.isHosting = false;
          this.currentSpeed = 0;

          if (this._minSpeed > 0) {
            this.minSpeed = this._minSpeed;
            this.maxSpeed = this._maxSpeed;
          }
        }
        /**
         * 接客
         */


        greeting() {
          this.isHosting = true;
          this.curProgress++;
          this.hasCustomer = true;
          clientEvent.dispatchEvent('greetingCustomer'); //随机个乘客给它

          this.manager.greeting(this.node.worldPosition, this.curRoadPoint.direction, () => {
            this.isMoving = false;
            this.currentSpeed = 0;
            this.isHosting = false;
            clientEvent.dispatchEvent('showGuide', true);
          });
        }
        /**
         * 送客
         */


        takeCustomer() {
          this.isHosting = true;
          this.hasCustomer = false;
          clientEvent.dispatchEvent('takeCustomer'); //送客

          this.manager.takeCustomer(this.node.worldPosition, this.curRoadPoint.direction, this.curProgress === this.maxProgress, () => {
            this.isMoving = false;
            this.currentSpeed = 0;
            this.isHosting = false;
            clientEvent.dispatchEvent('showGuide', true);
          });
        }

        arrivalPoint() {
          this.node.setWorldPosition(this.posTarget);

          if (this.curRoadPoint.moveType === fightConstants.ROAD_MOVE_TYPE.BEND) {
            //如果是曲线，则需要将其旋转角度转正
            this.node.eulerAngles = new Vec3(0, this.targetRotation, 0);
          } //切换至下一个目标点


          this.posSrc.set(this.posTarget);
          this.posTarget.set(Vec3.ZERO);

          if (this.curRoadPoint.next) {
            this.curRoadPoint = this.curRoadPoint.next.getComponent('roadPoint'); //todo 切换新的点，看是否是接客或者下客

            if (this.isMain) {
              if (this.curRoadPoint.type === fightConstants.ROAD_POINT_TYPE.GREETING) {
                this.greeting();
              } else if (this.curRoadPoint.type === fightConstants.ROAD_POINT_TYPE.PLATFORM) {
                this.takeCustomer();
              } else if (this.curRoadPoint.type === fightConstants.ROAD_POINT_TYPE.END) {
                //结束点，触发下
                clientEvent.dispatchEvent('gameOver', true);
                this.moveAfterFinished();
              }
            }

            if (this.curRoadPoint.next) {
              this.posTarget.set(this.curRoadPoint.next.worldPosition);
            } else {
              //表示没有接下来的点，执行结束了
              this._callback && this._callback(this); //行走完后回调
            }

            this.originRotation = this.node.eulerAngles.y;
            this.targetRotation = this.originRotation;

            if (this.curRoadPoint.moveType === fightConstants.ROAD_MOVE_TYPE.BEND) {
              //属于转弯的
              //确定下半圆的中间点
              if (this.curRoadPoint.clockwise) {
                //顺时针 -90
                this.originRotation = this.originRotation <= 0 ? 360 + this.originRotation : this.originRotation;
                this.targetRotation = this.originRotation - 90; //顺时针旋转

                if (this.posTarget.x > this.posSrc.x && this.posTarget.z < this.posSrc.z || this.posTarget.x < this.posSrc.x && this.posTarget.z > this.posSrc.z) {
                  //第一区域与第三区域
                  this.circleCenterPoint = new Vec3(this.posTarget.x, 0, this.posSrc.z);
                } else {
                  this.circleCenterPoint = new Vec3(this.posSrc.x, 0, this.posTarget.z);
                }

                let r = Vec3.subtract(new Vec3(), this.circleCenterPoint, this.posSrc).length(); // this.circleCenterPoint.sub(this.posSrc).mag();

                this.quarter = 90 / (Math.PI * r / 2); //相当于1米需要旋转多少度
              } else {
                this.originRotation = this.originRotation >= 360 ? this.originRotation - 360 : this.originRotation;
                this.targetRotation = this.originRotation + 90; //逆时针旋转

                if (this.posTarget.x > this.posSrc.x && this.posTarget.z < this.posSrc.z || this.posTarget.x < this.posSrc.x && this.posTarget.z > this.posSrc.z) {
                  //第一区域与第三区域
                  this.circleCenterPoint = new Vec3(this.posSrc.x, 0, this.posTarget.z);
                } else {
                  this.circleCenterPoint = new Vec3(this.posTarget.x, 0, this.posSrc.z);
                }

                let r = Vec3.subtract(new Vec3(), this.circleCenterPoint, this.posSrc).length();
                this.quarter = 90 / (Math.PI * r / 2); //相当于1米需要旋转多少度
              } //将旋转角度重置为正常角度


              this.node.eulerAngles = new Vec3(0, this.originRotation, 0); // this.circleCenterPoint = Vec3(this.posTarget.x,
            }
          } else {
            this.curRoadPoint = null;
            this._callback && this._callback(this); //行走完后回调
          }
        }

        update(deltaTime) {
          //无敌特效相关
          if (this.nodeInvincible) {
            this.invincibleRotation += deltaTime * 200; //每帧转动多少

            if (this.invincibleRotation > 360) {
              this.invincibleRotation -= 360;
            }

            this.nodeInvincible.eulerAngles = new Vec3(this.invincibleRotation, 0, 0);
          } //喇叭


          if (this.tootingCoolTime > 0) {
            this.tootingCoolTime = this.tootingCoolTime > deltaTime ? this.tootingCoolTime - deltaTime : 0;
          } //车辆移动相关


          if (!this.isMoving && this.currentSpeed < 0.01 || this.posTarget.equals(Vec3.ZERO) || this.isHosting || this.isOver) {
            this.isCarMoving = false;
            return;
          }

          this.isCarMoving = true;
          this.currentSpeed += this.accelerate * deltaTime;
          this.currentSpeed = this.currentSpeed > this.maxSpeed ? this.maxSpeed : this.currentSpeed;

          if (this.currentSpeed < this.minSpeed) {
            this.currentSpeed = this.minSpeed;

            if (this.isBraking) {
              clientEvent.dispatchEvent('endBraking');
              this.isBraking = false;
            }
          }

          if (this.arrTyres.length > 0) {
            this.curTyreRotation -= this.currentSpeed * 200;

            if (this.curTyreRotation < -360) {
              this.curTyreRotation += 360;
            }

            let rotation = new Vec3(this.curTyreRotation, 0);

            for (let idx = 0; idx < this.arrTyres.length; idx++) {
              let tyre = this.arrTyres[idx];
              tyre.eulerAngles = rotation;
            }
          }

          switch (this.curRoadPoint.moveType) {
            case fightConstants.ROAD_MOVE_TYPE.LINE:
              let offset = new Vec3();
              Vec3.subtract(offset, this.posTarget, this.node.worldPosition);
              offset.normalize();
              Vec3.multiplyScalar(offset, offset, this.currentSpeed);
              let pos = this.node.worldPosition;
              offset.add(pos);

              if (this.posTarget.z !== this.posSrc.z) {
                if (this.posTarget.z < this.posSrc.z) {
                  //向上
                  this.node.eulerAngles = new Vec3(0, 360, 0);

                  if (offset.z < this.posTarget.z) {
                    offset.z = this.posTarget.z;
                  }
                } else {
                  //向下
                  this.node.eulerAngles = new Vec3(0, 180, 0);

                  if (offset.z > this.posTarget.z) {
                    offset.z = this.posTarget.z;
                  }
                }
              } else {
                if (this.posTarget.x > this.posSrc.x) {
                  //向上
                  this.node.eulerAngles = new Vec3(0, 270, 0);

                  if (offset.x > this.posTarget.x) {
                    offset.x = this.posTarget.x;
                  }
                } else {
                  //向下
                  this.node.eulerAngles = new Vec3(0, 90, 0);

                  if (offset.x < this.posTarget.x) {
                    offset.x = this.posTarget.x;
                  }
                }
              } // this.node.eulerAngles = offset;


              this.node.setWorldPosition(offset);
              break;

            case fightConstants.ROAD_MOVE_TYPE.BEND:
              //进行圆角计算
              let offsetRotation = this.targetRotation - this.originRotation;
              let curRotation = this.node.eulerAngles.y < 0 ? 360 + this.node.eulerAngles.y : this.node.eulerAngles.y;

              if (this.node.eulerAngles.y > 360) {
                curRotation = this.node.eulerAngles.y - 360;
              }

              let percent = Math.abs((curRotation - this.originRotation) / offsetRotation);
              let nextRotation = offsetRotation * percent + this.currentSpeed * this.quarter * (this.targetRotation > this.originRotation ? 1 : -1);

              if (Math.abs(offsetRotation) < Math.abs(nextRotation)) {
                nextRotation = offsetRotation;
              }

              let target = this.originRotation + nextRotation;
              let posCur = Vec3.rotateY(new Vec3(), this.posSrc, this.circleCenterPoint, nextRotation * Math.PI / 180);
              this.node.setWorldPosition(posCur);
              this.node.eulerAngles = new Vec3(0, target, 0);
              break;
          }

          if (Vec3.subtract(new Vec3(), this.posTarget, this.node.worldPosition).lengthSqr() < 0.001) {
            //到达目标点
            this.arrivalPoint();
          }
        }

        moveAfterFinished() {
          this.isMoving = true;
          this.minSpeed = 0.2;
          this.maxSpeed = 0.2;
          this.startRunning();
        }

        tooting() {
          if (this.tootingCoolTime > 0) {
            return;
          }

          this.tootingCoolTime = TOOTING_COOL_TIME; //设置为最大时间
          //随机个音效播放

          let audio = Math.floor(Math.random() * 2) === 1 ? constant.AUDIO_SOUND.TOOTING1 : constant.AUDIO_SOUND.TOOTING2;
          audioManager.instance.playSound(audio);
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "maxSpeed", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "minSpeed", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.2;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeGas", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/invincible.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './resourceUtil.ts', './constant.ts', './poolManager.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, Widget, Sprite, _decorator, Component, clientEvent, resourceUtil, constant, poolManager, localConfig, playerData, uiManager, gameLogic;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Widget = module.Widget;
      Sprite = module.Sprite;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      poolManager = module.poolManager;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      gameLogic = module.gameLogic;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "ec04bogempOHrQhVVHVqSZV", "invincible", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let invincible = exports('invincible', (_dec = ccclass("invincible"), _dec2 = property(Node), _dec3 = property(Widget), _dec4 = property(Sprite), _dec(_class = (_class2 = (_temp = class invincible extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "nodeCarParent", _descriptor, this);

          _initializerDefineProperty(this, "wgMenu", _descriptor2, this);

          _initializerDefineProperty(this, "spIcon", _descriptor3, this);

          _defineProperty(this, "_callback", undefined);

          _defineProperty(this, "currentCar", null);
        }

        start() {// Your initialization goes here.
        }

        show(callback) {
          this._callback = callback;
          gameLogic.updateRewardIcon(constant.SHARE_FUNCTION.INVINCIBLE, this.spIcon, (err, type) => {});

          if (this.currentCar) {
            poolManager.instance.putNode(this.currentCar);
            this.currentCar = null;
          } //随机辆未拥有的车


          let carInfo = localConfig.instance.queryByID('car', playerData.instance.showCar.toString());
          resourceUtil.getUICar(carInfo.model, (err, prefab) => {
            if (err) {
              console.error(err, carInfo.model);
              return;
            }

            this.currentCar = poolManager.instance.getNode(prefab, this.nodeCarParent);
          });
        }

        onBtnCloseClick() {
          uiManager.instance.hideDialog('main/invincible');
          this._callback && this._callback();
        }

        onBtnOKClick() {
          gameLogic.openReward(constant.SHARE_FUNCTION.INVINCIBLE, (err, type) => {
            if (err) return;
            clientEvent.dispatchEvent('showInvincible');
            this.onBtnCloseClick();
          });
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nodeCarParent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "wgMenu", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/btnAdapter.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './audioManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Button, _decorator, Component, audioManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Button = module.Button;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      audioManager = module.audioManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "f130br9GwZGkJEkRGonhXxR", "btnAdapter", undefined);

      const {
        ccclass,
        property,
        menu,
        requireComponent,
        disallowMultiple
      } = _decorator;
      let btnAdapter = exports('btnAdapter', (_dec = ccclass("btnAdapter"), _dec2 = menu('自定义组件/btnAdapter'), _dec3 = requireComponent(Button), _dec4 = property({
        tooltip: '点击后是否播放点击音效'
      }), _dec5 = property({
        tooltip: '点击音效名'
      }), _dec6 = property({
        tooltip: '是否禁止快速二次点击'
      }), _dec7 = property({
        tooltip: '点击后多久才能再次点击,仅isPreventSecondClick为true生效'
      }), _dec(_class = _dec2(_class = _dec3(_class = disallowMultiple(_class = (_class2 = (_temp = class btnAdapter extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "isPlaySound", _descriptor, this);

          _initializerDefineProperty(this, "clickSoundName", _descriptor2, this);

          _initializerDefineProperty(this, "isPreventSecondClick", _descriptor3, this);

          _initializerDefineProperty(this, "preventTime", _descriptor4, this);
        }

        start() {
          const button = this.node.getComponent(Button);
          this.node.on('click', () => {
            if (this.isPreventSecondClick) {
              button.interactable = false;
              this.scheduleOnce(() => {
                if (button.node) button.interactable = true;
              }, this.preventTime);
            } //


            if (this.isPlaySound) audioManager.instance.playSound(this.clickSoundName, false);
          });
        } // update (dt) {},


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isPlaySound", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "clickSoundName", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 'click';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isPreventSecondClick", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "preventTime", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2;
        }
      })), _class2)) || _class) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/util.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "f1bcdp9t1BPdo0rL87xRyba", "util", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let util = exports('util', (_dec = ccclass("util"), _dec(_class = class util {
        /**
         * !#zh 拷贝object。
         */
        static clone(sObj) {
          if (sObj === null || typeof sObj !== "object") {
            return sObj;
          }

          let s = {};

          if (sObj.constructor === Array) {
            s = [];
          }

          for (const i in sObj) {
            if (sObj.hasOwnProperty(i)) {
              s[i] = this.clone(sObj[i]);
            }
          }

          return s;
        }
        /**
         * 将object转化为数组。
         */


        static objectToArray(srcObj) {
          const resultArr = []; // to array

          for (let key in srcObj) {
            if (!srcObj.hasOwnProperty(key)) {
              continue;
            }

            resultArr.push(srcObj[key]);
          }

          return resultArr;
        }
        /**
         * !#zh 将数组转化为object。
         */


        static arrayToObject(srcObj, objectKey) {
          const resultObj = {}; // to object

          for (let key in srcObj) {
            if (!srcObj.hasOwnProperty(key) || !srcObj[key][objectKey]) {
              continue;
            }

            resultObj[srcObj[key][objectKey]] = srcObj[key];
          }

          return resultObj;
        } // 根据权重,计算随机内容


        static getWeightRandIndex(weightArr, totalWeight) {
          const randWeight = Math.floor(Math.random() * totalWeight);
          let sum = 0;
          let weightIndex = 0;

          for (weightIndex; weightIndex < weightArr.length; weightIndex++) {
            sum += weightArr[weightIndex];

            if (randWeight < sum) {
              break;
            }
          }

          return weightIndex;
        }
        /**
         * 从n个数中获取m个随机数
         * @param {Number} n   总数
         * @param {Number} m    获取数
         * @returns {Array} array   获取数列
         */


        static getRandomNFromM(n, m) {
          const array = [];
          let intRd = 0;
          let count = 0;

          while (count < m) {
            if (count >= n + 1) {
              break;
            }

            intRd = this.getRandomInt(0, n);
            let flag = 0;

            for (let i = 0; i < count; i++) {
              if (array[i] === intRd) {
                flag = 1;
                break;
              }
            }

            if (flag === 0) {
              array[count] = intRd;
              count++;
            }
          }

          return array;
        }

        static getRandomInt(min, max) {
          const r = Math.random();
          const rr = r * (max - min + 1) + min;
          return Math.floor(rr);
        }

        static getStringLength(render) {
          const strArr = render;
          let len = 0;

          for (let i = 0, n = strArr.length; i < n; i++) {
            const val = strArr.charCodeAt(i);

            if (val <= 255) {
              len = len + 1;
            } else {
              len = len + 2;
            }
          }

          return Math.ceil(len / 2);
        }
        /**
         * 判断传入的参数是否为空的Object。数组或undefined会返回false
         * @param obj
         */


        static isEmptyObject(obj) {
          let result = true;

          if (obj && obj.constructor === Object) {
            for (const key in obj) {
              if (obj.hasOwnProperty(key)) {
                result = false;
                break;
              }
            }
          } else {
            result = false;
          }

          return result;
        }

        static formatNum(num) {
          // 0 和负数均返回 NaN。特殊处理。
          if (num <= 0) {
            return '0';
          }

          const k = 1000;
          const sizes = ['', '', 'K', 'M', 'B'];
          const i = Math.round(Math.log(num) / Math.log(k));
          return parseInt((num / Math.pow(k, i - 1 < 0 ? 0 : i - 1)).toString(), 10) + sizes[i];
        }
        /**
         * 判断是否是新的一天
         * @param {Object|Number} dateValue 时间对象 todo MessageCenter 与 pve 相关的时间存储建议改为 Date 类型
         * @returns {boolean}
         */


        static isNewDay(dateValue) {
          // todo：是否需要判断时区？
          const oldDate = new Date(dateValue);
          const curDate = new Date();
          const oldYear = oldDate.getFullYear();
          const oldMonth = oldDate.getMonth();
          const oldDay = oldDate.getDate();
          const curYear = curDate.getFullYear();
          const curMonth = curDate.getMonth();
          const curDay = curDate.getDate();

          if (curYear > oldYear) {
            return true;
          } else {
            if (curMonth > oldMonth) {
              return true;
            } else {
              if (curDay > oldDay) {
                return true;
              }
            }
          }

          return false;
        }

        static getPropertyCount(o) {
          let n,
              count = 0;

          for (n in o) {
            if (o.hasOwnProperty(n)) {
              count++;
            }
          }

          return count;
        }
        /**
         * 返回一个差异化数组（将array中diff里的值去掉）
         * @param array
         * @param diff
         */


        static difference(array, diff) {
          const result = [];

          if (array.constructor !== Array || diff.constructor !== Array) {
            return result;
          }

          const length = array.length;

          for (let i = 0; i < length; i++) {
            if (diff.indexOf(array[i]) === -1) {
              result.push(array[i]);
            }
          }

          return result;
        } // 模拟传msg的uuid


        static simulationUUID() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          }

          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }

        static trim(str) {
          return str.replace(/(^\s*)|(\s*$)/g, "");
        }
        /**
         * 判断当前时间是否在有效时间内
         * @param {String|Number} start 起始时间。带有时区信息
         * @param {String|Number} end 结束时间。带有时区信息
         */


        static isNowValid(start, end) {
          const startTime = new Date(start);
          const endTime = new Date(end);
          let result = false;

          if (startTime.getDate() + '' !== 'NaN' && endTime.getDate() + '' !== 'NaN') {
            const curDate = new Date();
            result = curDate < endTime && curDate > startTime;
          }

          return result;
        }

        static getDeltaDays(start, end) {
          const startData = new Date(start);
          const endData = new Date(end);
          const startYear = startData.getFullYear();
          const startMonth = startData.getMonth() + 1;
          const startDate = startData.getDate();
          const endYear = endData.getFullYear();
          const endMonth = endData.getMonth() + 1;
          const endDate = endData.getDate();
          start = new Date(startYear + '/' + startMonth + '/' + startDate + ' GMT+0800').getTime();
          end = new Date(endYear + '/' + endMonth + '/' + endDate + ' GMT+0800').getTime();
          const deltaTime = end - start;
          return Math.floor(deltaTime / (24 * 60 * 60 * 1000));
        }

        static getMin(array) {
          let result = 0;

          if (array.constructor === Array) {
            const length = array.length;

            for (let i = 0; i < length; i++) {
              if (i === 0) {
                result = Number(array[0]);
              } else {
                result = result > Number(array[i]) ? Number(array[i]) : result;
              }
            }
          }

          return result;
        }

        static formatTwoDigits(time) {
          return (Array(2).join('0') + time).slice(-2);
        }

        static formatDate(date, fmt) {
          const o = {
            "M+": date.getMonth() + 1,
            //月份
            "d+": date.getDate(),
            //日
            "h+": date.getHours(),
            //小时
            "m+": date.getMinutes(),
            //分
            "s+": date.getSeconds(),
            //秒
            "q+": Math.floor((date.getMonth() + 3) / 3),
            //季度
            "S": date.getMilliseconds() //毫秒

          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

          for (const k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? `${o[k]}` : `00${o[k]}`.substr(("" + o[k]).length));

          return fmt;
        }
        /**
         * 获取格式化后的日期（不含小时分秒）
         */


        static getDay() {
          const date = new Date();
          return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
        /**
         * 格式化钱数，超过10000 转换位 10K   10000K 转换为 10M
         */


        static formatMoney(money) {
          const arrUnit = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B', 'N', 'D'];
          let strValue = '';

          for (let idx = 0; idx < arrUnit.length; idx++) {
            if (money >= 10000) {
              money /= 1000;
            } else {
              strValue = Math.floor(money) + arrUnit[idx];
              break;
            }
          }

          if (strValue === '') {
            strValue = Math.floor(money) + 'U'; //超过最大值就加个U
          }

          return strValue;
        }
        /**
         * 根据剩余秒数格式化剩余时间 返回 HH:MM:SS
         * @param {Number} leftSec
         */


        static formatTimeForSecond(leftSec) {
          let timeStr = '';
          const sec = leftSec % 60;
          let leftMin = Math.floor(leftSec / 60);
          leftMin = leftMin < 0 ? 0 : leftMin;
          const hour = Math.floor(leftMin / 60);
          const min = leftMin % 60;

          if (hour > 0) {
            timeStr += hour > 9 ? hour.toString() : '0' + hour;
            timeStr += ':';
          }

          timeStr += min > 9 ? min.toString() : '0' + min;
          timeStr += ':';
          timeStr += sec > 9 ? sec.toString() : '0' + sec;
          return timeStr;
        }
        /**
         *  根据剩余毫秒数格式化剩余时间 返回 HH:MM:SS
         *
         * @param {Number} ms
         */


        static formatTimeForMillisecond(ms) {
          let second = Math.floor(ms / 1000 % 60);
          let minute = Math.floor(ms / 1000 / 60 % 60);
          let hour = Math.floor(ms / 1000 / 60 / 60);
          let strSecond = second < 10 ? '0' + second : second;
          let strMinute = minute < 10 ? '0' + minute : minute;
          let strHour = hour < 10 ? '0' + hour : hour;
          return `${strSecond}:${strMinute}:${strHour}`;
        }
        /**
         * TODO 需要将pako进行引入，目前已经去除了压缩算法的需要，如需要使用需引入库文件
         * 将字符串进行压缩
         * @param {String} str
         */


        static zip(str) {
          const binaryString = pako.gzip(encodeURIComponent(str), {
            to: 'string'
          }); // @ts-ignore

          return this.base64encode(binaryString);
        }

        static rand(arr) {
          let arrClone = this.clone(arr); // 首先从最大的数开始遍历，之后递减

          for (let i = arrClone.length - 1; i >= 0; i--) {
            // 随机索引值randomIndex是从0-arrClone.length中随机抽取的
            const randomIndex = Math.floor(Math.random() * (i + 1)); // 下面三句相当于把从数组中随机抽取到的值与当前遍历的值互换位置

            const itemIndex = arrClone[randomIndex];
            arrClone[randomIndex] = arrClone[i];
            arrClone[i] = itemIndex;
          } // 每一次的遍历都相当于把从数组中随机抽取（不重复）的一个元素放到数组的最后面（索引顺序为：len-1,len-2,len-3......0）


          return arrClone;
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './fightConstants.ts', './clientEvent.ts', './resourceUtil.ts', './playerData.ts', './carManager.ts', './uiManager.ts', './LanguageData.ts', './fightMap.ts', './customerManager.ts', './effectManager.ts', './fightCanvas.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, _decorator, Component, Collider, instantiate, fightConstants, clientEvent, resourceUtil, playerData, carManager, uiManager, i18n, fightMap, customerManager, effectManager, fightCanvas;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Collider = module.Collider;
      instantiate = module.instantiate;
    }, function (module) {
      fightConstants = module.fightConstants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      carManager = module.carManager;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      i18n = module.i18n;
    }, function (module) {
      fightMap = module.fightMap;
    }, function (module) {
      customerManager = module.customerManager;
    }, function (module) {
      effectManager = module.effectManager;
    }, function (module) {
      fightCanvas = module.fightCanvas;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

      cclegacy._RF.push({}, "f3d36qkNslPB4TIGcZlp8vd", "fightManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let fightManager = exports('fightManager', (_dec = ccclass("fightManager"), _dec2 = property(fightCanvas), _dec3 = property({
        type: fightMap
      }), _dec4 = property({
        type: customerManager
      }), _dec5 = property({
        type: carManager
      }), _dec6 = property({
        type: effectManager
      }), _dec7 = property({
        type: Node,
        displayName: '地面'
      }), _dec(_class = (_class2 = (_temp = class fightManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "fightLoading", _descriptor, this);

          _initializerDefineProperty(this, "mapManager", _descriptor2, this);

          _initializerDefineProperty(this, "customerManager", _descriptor3, this);

          _initializerDefineProperty(this, "carManager", _descriptor4, this);

          _initializerDefineProperty(this, "effectManager", _descriptor5, this);

          _initializerDefineProperty(this, "nodeGround", _descriptor6, this);

          _defineProperty(this, "isStart", false);

          _defineProperty(this, "isOver", false);

          _defineProperty(this, "isFinishedLevel", false);

          _defineProperty(this, "money", 0);

          _defineProperty(this, "curLevel", 0);

          _defineProperty(this, "hasRevive", false);
        }

        start() {
          // Your initialization goes here.
          this.initGround();
          this.loadMap(() => {
            this.initCar();
            this.loadCar();
          }); // this.initCar();
        }

        onEnable() {
          clientEvent.on('startGame', this.startGame, this);
          clientEvent.on('takeCustomer', this.onTakeCustomer, this);
          clientEvent.on('gameOver', this.gameOver, this);
          clientEvent.on('newLevel', this.newLevel, this);
          clientEvent.on('updateCar', this.updateMainCar, this);
          clientEvent.on('revive', this.revive, this);
        }

        onDisable() {
          clientEvent.off('startGame', this.startGame, this);
          clientEvent.off('takeCustomer', this.onTakeCustomer, this);
          clientEvent.off('gameOver', this.gameOver, this);
          clientEvent.off('newLevel', this.newLevel, this);
          clientEvent.off('updateCar', this.updateMainCar, this);
          clientEvent.off('revive', this.revive, this);
        }

        initGround() {
          let collider = this.nodeGround.getComponent(Collider);
          collider.setGroup(fightConstants.CAR_GROUP.NORMAL);
          collider.setMask(-1);
        }

        loadMap(cb) {
          //地图载入
          let level = 1;

          if (playerData.instance.playerInfo) {
            console.log("###playerData.instance.playerInfo.realLevel;", playerData.instance.playerInfo.realLevel);

            if (playerData.instance.playerInfo.passCheckPoint) {
              level = playerData.instance.playerInfo.realLevel || level;
            } else {
              level = playerData.instance.playerInfo.level || level;
            }

            console.log("###level", level);
          }

          this.curLevel = level; // let level = 3;
          // level = 3;

          console.log(`load level ${this.curLevel}`);
          let mapId = this.curLevel > 100 ? this.curLevel : this.curLevel + 100;
          clientEvent.dispatchEvent('updateLoading', 4, i18n.t('fightManager.loadingMap'));
          resourceUtil.getMap(mapId, (err, res) => {
            if (err) {
              console.error(err);
              return;
            }

            clientEvent.dispatchEvent('updateLoading', 10, i18n.t('fightManager.buildingCity'));
            this.mapManager.buildMap(res, () => {}, () => {
              clientEvent.dispatchEvent('updateLoading', 6, i18n.t('fightManager.cityLoadOver'));
              cb && cb();
            });
          });
        }

        initCar() {
          this.carManager.init(this.mapManager, this.customerManager);
        }

        reset() {
          this.carManager.reset();
          this.customerManager.reset();
          this.effectManager.reset();
          this.isStart = false;
          this.isOver = false;
          this.isFinishedLevel = false;
          this.money = 0;
          this.hasRevive = false;
          this.loadCar();
        }

        loadCar() {
          //预加载使用的汽车,加载完毕后，关闭界面
          this.carManager.preloadAICar(() => {
            this.fightLoading.finishLoading(); //等进度条加载完后展示主界面

            this.showMainUI();
          });
        }

        startGame() {
          if (this.isStart) {
            return;
          }

          this.isStart = true;
          this.carManager.startGame();
          this.showFightUI();
        }

        gameOver(isFinished) {
          if (this.isOver) {
            return;
          }

          this.isFinishedLevel = isFinished;
          this.isOver = true;
          this.carManager.gameOver();
          this.showBalanceUI();
        }

        onTakeCustomer() {
          //完成乘客接送，这时候要计算加到多少钱
          //公式 （30+关卡数/2）+ 10  取整
          let rand = Math.floor(30 + this.curLevel / 2 + Math.floor(Math.random() * 10));
          this.money += rand;
          clientEvent.dispatchEvent('makeMoney', rand); //显示获得金币的特效

          resourceUtil.getEffect('coin', (err, prefab) => {
            if (err) {
              console.error(err);
            }

            let node = instantiate(prefab);
            node.parent = this.node;

            if (this.carManager.mainCar) {
              node.setWorldPosition(this.carManager.mainCar.node.getWorldPosition());
            }

            this.scheduleOnce(() => {
              node.destroy();
            }, 2);
          });
        }

        showMainUI() {
          //一开始加载主界面
          uiManager.instance.showDialog('main/mainUI');
        }

        showFightUI() {
          uiManager.instance.hideDialog('main/mainUI');
          uiManager.instance.showDialog('fight/fightUI', [this]); //将自身当作参数传入
        }

        showBalanceUI() {
          //level: number, curProgress: number, isTakeOver: boolean,  maxProgress: number, money: number, isFinishLevel:boolean
          let objProgress = this.carManager.getCurrentProgress();
          uiManager.instance.showDialog('fight/balance', [playerData.instance.playerInfo.level, objProgress.cur, objProgress.isOver, this.mapManager.levelProgressCnt, this.money, this.isFinishedLevel]);
        }
        /**
         * 重置关卡
         *
         * @param {boolean} isNewLevel 是否为新关卡
         * @memberof fightManager
         */


        newLevel(isNewLevel) {
          //重置关卡
          this.fightLoading.loadNewLevel();
          uiManager.instance.hideDialog('fight/fightUI');
          this.hasRevive = false;

          if (isNewLevel) {
            //要将原有地图移除，并引入新地图
            this.mapManager.recycle();
            this.loadMap(() => {
              //地图处理完毕，后续处理
              this.reset();
            });
          } else {
            this.reset();
          }
        }

        updateMainCar() {
          this.carManager.creatMainCar();
        }

        revive() {
          this.carManager.revive();
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fightLoading", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mapManager", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "customerManager", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "carManager", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "effectManager", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "nodeGround", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightUI.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './clientEvent.ts', './resourceUtil.ts', './localConfig.ts', './playerData.ts', './LanguageData.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Sprite, Label, Node, SpriteFrame, Animation, _decorator, Component, clientEvent, resourceUtil, localConfig, playerData, i18n;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Sprite = module.Sprite;
      Label = module.Label;
      Node = module.Node;
      SpriteFrame = module.SpriteFrame;
      Animation = module.Animation;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      i18n = module.i18n;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _temp;

      cclegacy._RF.push({}, "fb9b7V8bZND35IgNyATVMNv", "fightUI", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let fightUI = exports('fightUI', (_dec = ccclass("fightUI"), _dec2 = property(Sprite), _dec3 = property(Sprite), _dec4 = property({
        type: Label
      }), _dec5 = property({
        type: Label
      }), _dec6 = property({
        type: Node,
        displayName: "进度项"
      }), _dec7 = property(Node), _dec8 = property(Label), _dec9 = property(Label), _dec10 = property(Sprite), _dec11 = property(SpriteFrame), _dec12 = property(SpriteFrame), _dec13 = property(SpriteFrame), _dec14 = property(SpriteFrame), _dec15 = property(SpriteFrame), _dec16 = property(Animation), _dec17 = property(Node), _dec18 = property(Sprite), _dec19 = property(SpriteFrame), _dec20 = property(SpriteFrame), _dec21 = property(SpriteFrame), _dec22 = property(SpriteFrame), _dec(_class = (_class2 = (_temp = class fightUI extends Component {
        // Property.
        // yourProperty = "some what";
        //是否展示showGuide动画
        constructor() {
          super();

          _initializerDefineProperty(this, "spStart", _descriptor, this);

          _initializerDefineProperty(this, "spEnd", _descriptor2, this);

          _initializerDefineProperty(this, "curLevel", _descriptor3, this);

          _initializerDefineProperty(this, "targetLevel", _descriptor4, this);

          _initializerDefineProperty(this, "progress", _descriptor5, this);

          _initializerDefineProperty(this, "nodeTalk", _descriptor6, this);

          _initializerDefineProperty(this, "lbTalk", _descriptor7, this);

          _initializerDefineProperty(this, "lbMake", _descriptor8, this);

          _initializerDefineProperty(this, "spHead", _descriptor9, this);

          _initializerDefineProperty(this, "imgLevelFinished", _descriptor10, this);

          _initializerDefineProperty(this, "imgLevelUnfinished", _descriptor11, this);

          _initializerDefineProperty(this, "imgProgressNoActive", _descriptor12, this);

          _initializerDefineProperty(this, "imgProgressActive", _descriptor13, this);

          _initializerDefineProperty(this, "imgProgressFinished", _descriptor14, this);

          _initializerDefineProperty(this, "aniMakeMoney", _descriptor15, this);

          _initializerDefineProperty(this, "nodeGuide", _descriptor16, this);

          _defineProperty(this, "fightManager", null);

          _defineProperty(this, "carManager", null);

          _initializerDefineProperty(this, "spShowGuideTip", _descriptor17, this);

          _initializerDefineProperty(this, "img01", _descriptor18, this);

          _initializerDefineProperty(this, "img02", _descriptor19, this);

          _initializerDefineProperty(this, "img01En", _descriptor20, this);

          _initializerDefineProperty(this, "img02En", _descriptor21, this);

          _defineProperty(this, "isShowGuide", false);

          _defineProperty(this, "showGuideTime", 0);
        }

        start() {}

        onEnable() {
          clientEvent.on('greetingCustomer', this.updateCarProgress, this);
          clientEvent.on('takeCustomer', this.updateCarProgress, this);
          clientEvent.on('gameOver', this.updateCarProgress, this);
          clientEvent.on('showTalk', this.showCustomerTalk, this);
          clientEvent.on('makeMoney', this.onMakeMoney, this);
          clientEvent.on('showGuide', this.showGuide, this);
        }

        onDisable() {
          clientEvent.off('greetingCustomer', this.updateCarProgress, this);
          clientEvent.off('takeCustomer', this.updateCarProgress, this);
          clientEvent.off('gameOver', this.updateCarProgress, this);
          clientEvent.off('showTalk', this.showCustomerTalk, this);
          clientEvent.off('makeMoney', this.onMakeMoney, this);
          clientEvent.off('showGuide', this.showGuide, this);
        }

        onTouchStart() {
          this.nodeGuide.getComponent(Animation).stop();
          this.nodeGuide.active = false;
        }

        show(manager) {
          this.fightManager = manager;
          this.carManager = this.fightManager.carManager;
          this.refreshUI();

          if (!this.carManager.mainCar.isMoving) {
            this.showGuide(true);
          }
        }

        showGuide(isShow) {
          this.nodeGuide.active = isShow;
          let ani = this.nodeGuide.getComponent(Animation);
          isShow ? ani.play() : ani.stop();

          if (isShow) {
            this.isShowGuide = true;
            this.showGuideTime = 0;
            ani.getState('showGuide').setTime(0);
          } else {
            this.isShowGuide = false;
            this.showGuideTime = 0;
          }
        }

        onBtnAgainClick() {
          // this.fightManager.reset();
          clientEvent.dispatchEvent('newLevel', false);
        }

        onBtnChangeCameraRotation() {
          this.carManager.changeCameraFollowRotation();
        }

        refreshUI() {
          let maxProgress = this.fightManager.mapManager.levelProgressCnt; //总共有多少个乘客
          //设置总共有多少个节点

          for (let idx = 0; idx < maxProgress; idx++) {
            this.progress[idx].active = true;
            this.progress[idx].getComponent(Sprite).spriteFrame = this.imgProgressNoActive;
          }

          for (let idx = maxProgress; idx < this.progress.length; idx++) {
            this.progress[idx].active = false;
          }

          let level = playerData.instance.playerInfo ? playerData.instance.playerInfo.level : 1;
          this.curLevel.string = `${level}`;
          this.targetLevel.string = `${level + 1}`;
          this.spStart.spriteFrame = this.imgLevelFinished;
          this.spEnd.spriteFrame = this.imgLevelUnfinished;
        }

        updateCarProgress() {
          //刷新进度
          let objProgress = this.carManager.getCurrentProgress();
          let start = objProgress.cur;
          let end = objProgress.isOver ? start : start - 1;

          for (let idx = 0; idx < end; idx++) {
            this.progress[idx].getComponent(Sprite).spriteFrame = this.imgProgressFinished;
          }

          if (!objProgress.isOver) {
            this.progress[end].getComponent(Sprite).spriteFrame = this.imgProgressActive;
          }

          if (this.fightManager.isFinishedLevel) {
            this.spEnd.spriteFrame = this.imgLevelFinished;
          }
        }
        /**
         * 顾客上车后或者接到新订单时会有提示
         *
         * @param {string} customerId
         * @param {number} type
         * @memberof fightUI
         */


        showCustomerTalk(customerId, type) {
          let arrTalk = localConfig.instance.getTableArr('talk'); // Note:

          let arrFilter = [];
          arrTalk.forEach(element => {
            if (element.type === type) {
              arrFilter.push(element);
            }
          });
          let rand = Math.floor(Math.random() * arrFilter.length);
          let objRand = arrFilter[rand];
          this.lbTalk.string = i18n.t(`talk.${objRand.content}`);
          resourceUtil.setCustomerIcon(customerId, this.spHead, () => {}); //显示3秒

          this.nodeTalk.active = true;
          this.nodeTalk.getComponent(Animation).play();
          this.scheduleOnce(() => {
            this.nodeTalk.active = false;
          }, 4);
        }

        onMakeMoney(value) {
          this.aniMakeMoney.node.active = true;
          this.lbMake.string = `+${value}`;
          this.aniMakeMoney.play();
          this.aniMakeMoney.once(Animation.EventType.FINISHED, () => {
            this.aniMakeMoney.node.active = false;
          }, this);
        }

        update(deltaTime) {
          // Your update function goes here.
          if (this.isShowGuide) {
            if (Math.floor(this.showGuideTime) === 0) {
              if (window.i18nConfig.curLang === 'zh') {
                this.spShowGuideTip.spriteFrame = this.img01;
              } else if (window.i18nConfig.curLang === 'en') {
                this.spShowGuideTip.spriteFrame = this.img01En;
              }
            }

            this.showGuideTime += deltaTime;

            if (Math.floor(this.showGuideTime) === 1) {
              if (window.i18nConfig.curLang === 'zh') {
                this.spShowGuideTip.spriteFrame = this.img02;
              } else if (window.i18nConfig.curLang === 'en') {
                this.spShowGuideTip.spriteFrame = this.img02En;
              }
            } else if (Math.floor(this.showGuideTime) === 2) {
              if (window.i18nConfig.curLang === 'zh') {
                this.spShowGuideTip.spriteFrame = this.img01;
              } else if (window.i18nConfig.curLang === 'en') {
                this.spShowGuideTip.spriteFrame = this.img01En;
              }

              this.showGuideTime = 0;
            }
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spStart", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spEnd", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "curLevel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "targetLevel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "progress", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "nodeTalk", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "lbTalk", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "lbMake", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "spHead", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "imgLevelFinished", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "imgLevelUnfinished", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "imgProgressNoActive", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "imgProgressActive", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "imgProgressFinished", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "aniMakeMoney", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "nodeGuide", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "spShowGuideTip", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "img01", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "img02", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "img01En", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "img02En", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/follow.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, _decorator, Vec3, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "ff8ee6OQldPNLrgLpXROotm", "follow", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let follow = exports('follow', (_dec = ccclass("follow"), _dec2 = property({
        type: Node
      }), _dec(_class = (_class2 = (_temp = class follow extends Component {
        // Property.
        // yourProperty = "some what";
        // Add `property` decorator if your want the property to be serializable.
        // @property
        // yourSerializableProperty = "some what";
        constructor() {
          super();

          _initializerDefineProperty(this, "followTarget", _descriptor, this);

          _initializerDefineProperty(this, "isFollowRotation", _descriptor2, this);

          _initializerDefineProperty(this, "offset", _descriptor3, this);

          _defineProperty(this, "moveSpeed", 3);

          _defineProperty(this, "isPlayingStart", false);
        }

        start() {// Your initialization goes here.
          // this.showStart();
        }

        showStart() {//TODO 原先有个展示动画，现直接修改为玩家下
          // this.isPlayingStart = true;
          // this.scheduleOnce(()=>{
          //     this.isPlayingStart = false;
          // }, 1.5);
        }

        lateUpdate(deltaTime) {
          if (!this.followTarget) {
            return;
          }

          let posOrigin = this.node.worldPosition;

          if (!this.isPlayingStart) {
            let offset = this.offset;

            if (this.isFollowRotation) {
              offset = Vec3.transformQuat(new Vec3(), this.offset, this.followTarget.rotation);
            }

            let posTarget = new Vec3(this.followTarget.worldPosition.x + offset.x, this.followTarget.worldPosition.y + offset.y, this.followTarget.worldPosition.z + offset.z); // let dis = Vec3.subtract(new Vec3(), posOrigin, posTarget).length();

            this.node.setWorldPosition(posTarget);
            this.node.lookAt(this.followTarget.worldPosition, new Vec3(0, 1, 0));

            if (this.isFollowRotation) {
              let angle = new Vec3(this.node.eulerAngles);
              angle.y = this.followTarget.eulerAngles.y;
              this.node.eulerAngles = angle;
            }
          } else {
            let posTarget = new Vec3(this.followTarget.worldPosition.x + this.offset.x, this.followTarget.worldPosition.y + this.offset.y, this.followTarget.worldPosition.z + this.offset.z);
            let dis = Vec3.subtract(new Vec3(), posOrigin, posTarget).length();

            if (dis > 0.001) {
              Vec3.lerp(posTarget, posOrigin, posTarget, this.moveSpeed * deltaTime);
            }

            this.node.setWorldPosition(posTarget);
            this.node.lookAt(this.followTarget.worldPosition, new Vec3(0, 1, 0));
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "followTarget", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isFollowRotation", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "offset", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Vec3();
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./configuration.ts', './fightConstants.ts', './oneToMultiListener.ts', './clientEvent.ts', './resourceUtil.ts', './audioManager.ts', './constant.ts', './poolManager.ts', './car.ts', './follow.ts', './roadPoint.ts', './util.ts', './csvManager.ts', './localConfig.ts', './playerData.ts', './carManager.ts', './eventListener.ts', './tips.ts', './uiManager.ts', './shopItem.ts', './shopPage.ts', './flyRewardItem.ts', './flyReward.ts', './gameLogic.ts', './polyglot.min.ts', './LanguageData.ts', './shop.ts', './fightMap.ts', './SpriteFrameSet.ts', './LocalizedSprite.ts', './online.ts', './zh.ts', './updateValueLabel.ts', './setting.ts', './customerManager.ts', './onlineDouble.ts', './trial.ts', './mainUI.ts', './showReward.ts', './clickBox.ts', './signInItem.ts', './lodash.ts', './lotteryItem.ts', './revive.ts', './blockInputEvent.ts', './GameRoot.ts', './loading.ts', './signIn.ts', './balance.ts', './en.ts', './LocalizedLabel.ts', './main.ts', './effectManager.ts', './lottery.ts', './fightCanvas.ts', './invincible.ts', './btnAdapter.ts', './fightManager.ts', './fightUI.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});