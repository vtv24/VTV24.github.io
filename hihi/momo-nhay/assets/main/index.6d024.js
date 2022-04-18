System.register("chunks:///_virtual/BoxMgr.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Utils.ts', './GameDefine.ts', './BoxCtrl.ts', './Gameconfig.ts', './ItemMgr.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Prefab, Vec3, math, instantiate, Component, Utils, Direction, BoxCtrl, Gameconfig, ItemMgr;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Vec3 = module.Vec3;
      math = module.math;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      Direction = module.Direction;
    }, function (module) {
      BoxCtrl = module.BoxCtrl;
    }, function (module) {
      Gameconfig = module.Gameconfig;
    }, function (module) {
      ItemMgr = module.ItemMgr;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _class3, _temp;

      cclegacy._RF.push({}, "069d2bYyQ9KT6vcjaRR6O+b", "BoxMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BoxMgr = exports('BoxMgr', (_dec = ccclass('BoxMgr'), _dec2 = property(Prefab), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BoxMgr, _Component);

        function BoxMgr() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "boxPrefabs", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "count", 0);

          _defineProperty(_assertThisInitialized(_this), "direction", Direction.Forward);

          _defineProperty(_assertThisInitialized(_this), "position", Vec3.ZERO.clone());

          _defineProperty(_assertThisInitialized(_this), "IsShouldChangeDirection", false);

          _defineProperty(_assertThisInitialized(_this), "nextBox", null);

          _defineProperty(_assertThisInitialized(_this), "nextBoxCtrl", null);

          _defineProperty(_assertThisInitialized(_this), "currentBoxCtrl", null);

          return _this;
        }

        var _proto = BoxMgr.prototype;

        _proto.onLoad = function onLoad() {
          BoxMgr.instance = this;
        };

        _proto.start = function start() {};

        _proto.Spwan = function Spwan() {
          this.currentBoxCtrl = this.nextBoxCtrl;
          var size = Gameconfig.Instance.GetSize(this.count);
          var distance = Gameconfig.Instance.GetDistance(this.count);
          var scale = math.randomRange(size.min, size.max);
          var treePos;

          if (this.count == 0) {
            this.direction = Direction.Forward;
          } else if (this.count <= 2) {
            this.direction = Direction.Forward;
            this.position.add(new Vec3(0, 0, 2.5));
          } else {
            this.IsShouldChangeDirection = math.randomRangeInt(0, 10) >= 5;

            if (this.IsShouldChangeDirection) {
              this.direction = this.direction == Direction.Forward ? Direction.Left : Direction.Forward;
            }

            var dir;

            switch (this.direction) {
              case Direction.Forward:
                dir = new Vec3(0, 0, 1);
                treePos = new Vec3(-2.5, 0, 0);
                break;

              case Direction.Left:
                dir = new Vec3(1, 0, 0);
                treePos = new Vec3(0, 0, -2.5);
            }

            this.position.add(dir.multiplyScalar(math.randomRange(distance.min, distance.max)));
          }

          var bonus = Gameconfig.Instance.CheckBonus(this.count);
          var hasGift = Gameconfig.Instance.HasGift(this.count);
          var prefabIndex = math.randomRangeInt(0, this.boxPrefabs.length);
          this.nextBox = instantiate(this.boxPrefabs[prefabIndex]);
          this.nextBox.parent = this.node;
          this.nextBox.name = this.count.toString();
          this.nextBoxCtrl = this.nextBox.getComponent(BoxCtrl);
          var gift = null;
          console.log(hasGift);

          if (hasGift) {
            gift = ItemMgr.Instance.CreateItem(bonus, this.count);
          } else if (bonus > 0) {
            gift = ItemMgr.Instance.CreateBonus(this.nextBoxCtrl.ItemPos, bonus, this.count);
          }

          this.nextBoxCtrl.Spwan(this.position, scale, gift, this.count > 0); //generate trees
          // if (math.randomRange(0, 100) >= 70 && this.count > 4) {
          //     ObstacleMgr.Instance.Spawn(this.node, treePos.add(this.position));
          // }
          // this.nextBox.forward = this.direction;

          this.count++;
          this.CleanPlatform();
        };

        _proto.CleanPlatform = function CleanPlatform() {
          var _this2 = this;

          this.node.children.forEach(function (child) {
            if (parseInt(child.name) < _this2.count - 6) {
              child.destroy();
            }
          });
        };

        _proto.Reset = function Reset() {
          this.count = 0;
          this.position = Vec3.ZERO.clone();
          this.IsShouldChangeDirection = false;
          Utils.destroyAllChild(this.node);
          this.Spwan();
        };

        _proto.OnLanding = function OnLanding() {
          Gameconfig.Instance.CheckGiftForStep(this.count);
          this.nextBoxCtrl.OnLanding();
        };

        _proto.HasGift = function HasGift(step) {
          return Gameconfig.Instance.HasGift(step);
        };

        _createClass(BoxMgr, null, [{
          key: "Instance",
          get: function get() {
            return BoxMgr.instance;
          }
        }]);

        return BoxMgr;
      }(Component), _defineProperty(_class3, "instance", null), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "boxPrefabs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EndGame.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Profile.ts', './Screen.ts', './MaxApiUtils.ts', './GameMgr.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Button, Label, UITransform, Vec3, Profile, Screen, MaxApiUtils, GameMgr;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Label = module.Label;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
    }, function (module) {
      Profile = module.Profile;
    }, function (module) {
      Screen = module.Screen;
    }, function (module) {
      MaxApiUtils = module.default;
    }, function (module) {
      GameMgr = module.GameMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

      cclegacy._RF.push({}, "07926rHs9NJwZ6k9Rb2Qppc", "EndGame", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var EndGame = exports('EndGame', (_dec = ccclass('EndGame'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(UITransform), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Screen) {
        _inheritsLoose(EndGame, _Screen);

        function EndGame() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Screen.call.apply(_Screen, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "btnRetry", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "btnClose", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "score", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "highScore", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "playerName", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "container", _descriptor6, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "deeplink", '');

          _defineProperty(_assertThisInitialized(_this), "originalPosition", Vec3.ZERO.clone());

          return _this;
        }

        var _proto = EndGame.prototype;

        _proto.start = function start() {
          var _this2 = this;

          this.originalPosition = this.node.position;
          this.btnRetry.node.on('click', function () {
            _this2.OnRetryClick();

            MaxApiUtils.trackEvent({
              action: 'result_tap_playagain'
            });
          }); //this.btnShare.node.on('click', this.OnShareClick.bind(this));
          // this.btnDetail.node.on('click', this.OnLeaderBoardClick.bind(this));

          this.btnClose.node.on('click', this.OnCloseClick.bind(this)); // this.btnShowMoreGift.node.on('click', this.OnShowMoreGiftClick.bind(this));
        };

        _proto.Show = function Show() {
          GameMgr.Instance.isOpenFromInGame = false;
          var self = this;

          _Screen.prototype.Show.call(this);

          self.UpdateUI(); // Profile.Instance.SubmitScore(Profile.Instance.Score, true, (result) => {
          // })
          // Profile.Instance.GetGameGift((resp) => {
          //     if (Profile.Instance.HasGift) {
          //         self.OnGiftFetched(resp);
          //     }
          // })
          // self.HideAllGift();
          // self.GiftloadingIcon.active = false;
          // if (Profile.Instance.HasGift) {
          //     self.GiftloadingIcon.active = true;
          // }
          // else {
          //     self.NoGift.active = false;
          //     self.KYC.active = true;
          // }
          // self.LeaderBoardloadingIcon.active = true;
        };

        _proto.Hide = function Hide() {
          // this.rankView.Reset();
          _Screen.prototype.Hide.call(this);
        };

        _proto.OnCloseClick = function OnCloseClick() {
          this.Hide();
          GameMgr.Instance.Retry();
        };

        _proto.OnRetryClick = function OnRetryClick() {
          this.Hide();
          GameMgr.Instance.Retry();
        } // OnShareClick() {
        //     const self = this;
        //     GameMgr.Instance.captureScreen(image64 => {
        //         MaxApiUtils.UploadImage(image64).then((uploadedLink: any) => {
        //             if (!uploadedLink || typeof uploadedLink.status !== 'undefined') { //error
        //                 //self.genDeepLink(self.deeplink)
        //             } else {
        //                 self.genDeepLink(uploadedLink)
        //             }
        //         })
        //     })
        // }
        // private genDeepLink(url: string) {
        //     const self = this;
        //     let data: DeepLinkData = {
        //         link: url,
        //         title: 'Chia sẻ',
        //         description: 'Nào mình cùng MoMo nhé!',
        //         imageLink: url,
        //         domain: "page.momoapp.vn",
        //         fallbackLink: "https://momo.vn/tin-tuc/tin-tuc-su-kien/nhap-ma-nhan-luot-tham-gia-sieu-hoi-hoan-tien-50-2099"
        //         // originalLink: url,
        //     }
        //     GameApi.genDeepLink(data, (res) => {
        //         if (res && res.item && res.item.shortLink) {
        //             self.deeplink = res.item.shortLink;
        //             self.shareFB()
        //         }
        //     })
        // }
        // shareFB() {
        //     MaxApiUtils.shareFacebook({ link: this.deeplink }, () => {
        //         console.log("Share success!")
        //     });
        // }
        // OnLeaderBoardClick() {
        //     this.Hide();
        //     MaxApiUtils.trackEvent({ action: "leaderboard_tap_detail" });
        //     ScreenMgr.Instance.Show(ScreenName.Leaderboard);
        // }
        // OnShowMoreGiftClick() {
        //     this.Hide();
        //     ScreenMgr.Instance.Show(ScreenName.History);
        //     MaxApiUtils.trackEvent({ action: "game_award_detail" });
        // }
        ;

        _proto.UpdateUI = function UpdateUI() {
          this.score.string = Profile.Instance.Score.toString();
          this.playerName.string = Profile.Instance.data.displayName.toString(); // if (Net.Ranking.Instance.Data != null) {
          //     heighScore.text = Net.Ranking.Instance.Data.heighScore.ToString();
          // }
          // else {
          //     heighScore.text = Profile.Instance.Score.ToString();
          // }
        } // OnLeaderBoardFetched(data: typeof ApiMock.getRankPoints) {
        //     if (data != null) {
        //         this.highScore.string = data.meta.point.toString();
        //         // this.rankView.loadModel(data);
        //     }
        //     // this.LeaderBoardloadingIcon.active = false;
        // }
        // OnGiftFetched(items: typeof ApiMock.gameGift.items) {
        //     this.GiftloadingIcon.active = false;
        //     if (items != null && items.length > 0) {
        //         this.HasGift.active = true;
        //         this.myGift.loadView(items);
        //     }
        //     else {
        //         this.NoGift.active = true;
        //         this.KYC.active = false;
        //     }
        // }
        // HideAllGift() {
        //     this.NoGift.active = false;
        //     this.HasGift.active = false;
        //     this.KYC.active = false;
        // }
        ;

        return EndGame;
      }(Screen), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnRetry", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnClose", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "score", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "highScore", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "playerName", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "container", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GiftBox.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "0afe9k8qdBP3bBB6OFZLMLv", "GiftBox", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var GiftBox = exports('GiftBox', (_dec = ccclass('GiftBox'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GiftBox, _Component);

        function GiftBox() {
          return _Component.apply(this, arguments) || this;
        }

        return GiftBox;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Popup.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Button, Node, Vec3, tween, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Node = module.Node;
      Vec3 = module.Vec3;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "113e5qtNpZJR4qFFlM73Kmf", "Popup", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Popup = exports('Popup', (_dec = ccclass('Popup'), _dec2 = property(Button), _dec3 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Popup, _Component);

        function Popup() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "btnClose", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "container", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "onClose", null);

          return _this;
        }

        var _proto = Popup.prototype;

        _proto.start = function start() {
          this.btnClose.node.on("click", this.OnCloseClick.bind(this));
        };

        _proto.OnCloseClick = function OnCloseClick() {
          if (this.onClose) {
            this.onClose();
          }

          this.Hide();
        };

        _proto.Show = function Show(autoHide) {
          var _this2 = this;

          if (autoHide === void 0) {
            autoHide = false;
          }

          this.node.active = true;
          this.container.setScale(Vec3.ZERO);
          tween(this.container).to(0.5, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: "bounceInOut"
          }).start();

          if (autoHide) {
            setTimeout(function () {
              _this2.Hide();
            }, 3000);
          }
        };

        _proto.Hide = function Hide(shouldRemove) {
          if (shouldRemove === void 0) {
            shouldRemove = true;
          }

          this.node.active = false;

          if (shouldRemove) {
            this.node.removeFromParent();
            this.node.destroy();
          }
        };

        return Popup;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnClose", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "container", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioMgr.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts'], function (exports) {
  'use strict';

  var _defineProperty, _inheritsLoose, _assertThisInitialized, _createClass, cclegacy, _decorator, AudioSource, resources, Component, SoundName;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioSource = module.AudioSource;
      resources = module.resources;
      Component = module.Component;
    }, function (module) {
      SoundName = module.SoundName;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "1268aruiMJMSbuwaNTXSCd4", "AudioMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AudioMgr = exports('AudioMgr', (_dec = ccclass('AudioMgr'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AudioMgr, _Component);

        function AudioMgr() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "audioClips", []);

          _defineProperty(_assertThisInitialized(_this), "bgVolume", 0.4);

          _defineProperty(_assertThisInitialized(_this), "sfxVolume", 0.7);

          _defineProperty(_assertThisInitialized(_this), "audioSourceSFX", null);

          _defineProperty(_assertThisInitialized(_this), "audioSourceMusic", null);

          _defineProperty(_assertThisInitialized(_this), "IsEnable", true);

          return _this;
        }

        var _proto = AudioMgr.prototype;

        _proto.onLoad = function onLoad() {
          AudioMgr.instance = this;
          this.audioSourceSFX = this.addComponent(AudioSource);
          this.audioSourceSFX.loop = false;
          this.audioSourceSFX.volume = this.sfxVolume;
          this.audioSourceMusic = this.addComponent(AudioSource);
          this.audioSourceMusic.play(); // this.Load();
        };

        _proto.PlayOneShot = function PlayOneShot(clip, isOneShot) {
          if (isOneShot === void 0) {
            isOneShot = false;
          }

          if (this.audioSourceSFX.playing) {
            this.audioSourceSFX.stop();
          }

          if (clip && this.IsEnable) {
            if (!isOneShot) {
              this.audioSourceSFX.clip = clip;
              this.audioSourceSFX.play();
            } else {
              this.audioSourceSFX.playOneShot(clip);
            }
          }
        };

        _proto.PlayMusic = function PlayMusic(clip, loop) {
          if (clip && this.IsEnable) {
            if (this.audioSourceMusic.clip != clip || !this.audioSourceMusic.playing) {
              this.Stop();
              this.audioSourceMusic.clip = clip;
              this.audioSourceMusic.loop = loop;
              this.On();
              this.audioSourceMusic.volume = this.bgVolume;
              this.audioSourceMusic.play();
            }
          }
        };

        _proto.Stop = function Stop() {
          this.audioSourceMusic.stop();
        };

        _proto.Start = function Start() {
          this.audioSourceMusic.play();
        };

        _proto.Load = function Load() {
          var _this2 = this; //load sound


          var array = Object.keys(SoundName);
          array.forEach(function (element) {
            var name = SoundName[element];
            resources.load("sounds/" + name, function (err, audioClip) {
              if (audioClip) {
                audioClip.name = name;

                _this2.audioClips.push(audioClip);

                console.log("Sound load: " + name);

                if (name == SoundName.BackgroundMusic) {
                  _this2.PlayMusicWithName(name, true);
                }
              } else {
                console.error("Sound notfound: " + name);
              }
            });
          });
        };

        _proto.PlaySfx = function PlaySfx(name, isOneShot) {
          if (isOneShot === void 0) {
            isOneShot = false;
          }

          var clip = this.audioClips.find(function (clip) {
            return clip.name == name;
          });

          if (clip) {
            this.PlayOneShot(clip, isOneShot);
          }
        };

        _proto.StopSfx = function StopSfx(name) {
          var _this3 = this;

          this.audioClips.forEach(function (clip) {
            if (clip.name == name && _this3.audioSourceSFX.clip == clip) {
              if (_this3.audioSourceSFX.playing) {
                _this3.audioSourceSFX.stop();
              }
            }

            return;
          });
        };

        _proto.PlayMusicWithName = function PlayMusicWithName(name, loop) {
          var _this4 = this;

          this.audioClips.forEach(function (clip) {
            if (clip.name == name) {
              _this4.PlayMusic(clip, loop);
            }

            return;
          });
        };

        _proto.On = function On() {
          this.IsEnable = true;
          this.Start();
        };

        _proto.Off = function Off() {
          this.IsEnable = false;
          this.Stop();
        };

        _proto.Restart = function Restart() {
          this.On();
          AudioMgr.Instance.PlayMusicWithName(SoundName.BackgroundMusic, true);
        };

        _proto.NextStatus = function NextStatus() {
          this.IsEnable = !this.IsEnable;

          if (this.IsEnable) {
            this.On();
          } else {
            this.Off();
          }
        };

        _createClass(AudioMgr, null, [{
          key: "Instance",
          get: function get() {
            return this.instance;
          }
        }]);

        return AudioMgr;
      }(Component), _defineProperty(_class2, "instance", null), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FlyScore.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './FlyScoreMgr.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Node, Label, UIOpacity, Vec3, tween, Component, FlyScoreMgr;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      UIOpacity = module.UIOpacity;
      Vec3 = module.Vec3;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      FlyScoreMgr = module.FlyScoreMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "12ee4JI4OdHEbwO6flryMO+", "FlyScore", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var FlyScore = exports('FlyScore', (_dec = ccclass('FlyScore'), _dec2 = property(Node), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(UIOpacity), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FlyScore, _Component);

        function FlyScore() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "container", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "text", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "scoreText", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "uiOpacity", _descriptor4, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "target", null);

          return _this;
        }

        var _proto = FlyScore.prototype; // Update is called once per frame

        _proto.update = function update(dt) {
          if (this.target) {
            this.node.position = this.GetPos(this.target);
          }
        };

        _proto.Show = function Show(target, score, detail) {
          var _this2 = this;

          if (detail === void 0) {
            detail = "";
          }

          this.target = target;
          this.node.position = this.GetPos(target);

          if (this.text) {
            this.text.string = detail;
          }

          this.scoreText.string = score;
          var newpos = Vec3.ZERO.clone();
          newpos.y += 100;
          this.container.scale = Vec3.ZERO;
          tween(this.container).parallel(tween().to(2, {
            position: newpos
          }, {
            easing: "cubicIn"
          }), tween().to(0.5, {
            scale: Vec3.ONE
          }, {
            easing: "elasticOut"
          })).call(function () {
            _this2.Hide();
          }).start();
        };

        _proto.Hide = function Hide() {
          this.node.destroy();
        };

        _proto.GetPos = function GetPos(target) {
          return FlyScoreMgr.Instance.worldToScreenPoint(target.worldPosition).add3f(0, 130, 0);
        };

        return FlyScore;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "container", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "text", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "scoreText", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "uiOpacity", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OutOfTurn.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Popup.ts', './GameMgr.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, Popup, GameMgr;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
    }, function (module) {
      Popup = module.Popup;
    }, function (module) {
      GameMgr = module.GameMgr;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "1c159SKP8xAx5aMs8e/6Ldd", "OutOfTurn", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var OutOfTurn = exports('OutOfTurn', (_dec = ccclass('OutOfTurn'), _dec2 = property(Button), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Popup) {
        _inheritsLoose(OutOfTurn, _Popup);

        function OutOfTurn() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Popup.call.apply(_Popup, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "btnOk", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = OutOfTurn.prototype;

        _proto.start = function start() {
          _Popup.prototype.start.call(this);

          this.btnOk.node.on("click", this.OnOkClick, this);
        };

        _proto.OnOkClick = function OnOkClick() {
          this.Hide();
        };

        _proto.OnCloseClick = function OnCloseClick() {
          _Popup.prototype.OnCloseClick.call(this);

          GameMgr.Instance.Resume();
        };

        return OutOfTurn;
      }(Popup), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnOk", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EventListener.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, _inheritsLoose, _createClass, cclegacy, _decorator, EventTarget;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EventTarget = module.EventTarget;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "1ca1cfU43pFM64dVb9njsy1", "EventListener", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var EventListener = exports('EventListener', (_dec = ccclass("EventListener"), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(EventListener, _EventTarget);

        function EventListener() {
          return _EventTarget.apply(this, arguments) || this;
        }

        _createClass(EventListener, null, [{
          key: "Instance",
          get: function get() {
            if (this.instance == null) {
              this.instance = new EventListener();
            }

            return this.instance;
          }
        }]);

        return EventListener;
      }(EventTarget), _defineProperty(_class2, "instance", null), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameUtilites.ts", ['cc', './Api.ts', './Profile.ts'], function (exports) {
  'use strict';

  var cclegacy, assetManager, SpriteFrame, Texture2D, Node, Vec3, Api, Profile;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      assetManager = module.assetManager;
      SpriteFrame = module.SpriteFrame;
      Texture2D = module.Texture2D;
      Node = module.Node;
      Vec3 = module.Vec3;
    }, function (module) {
      Api = module.Api;
    }, function (module) {
      Profile = module.Profile;
    }],
    execute: function () {
      cclegacy._RF.push({}, "21405bmZOxEbJk4ZTieePNf", "GameUtilites", undefined);

      var GameUtilites = exports('default', /*#__PURE__*/function () {
        function GameUtilites() {}

        GameUtilites.getRequest = function getRequest(url, options) {
          if (options === void 0) {
            options = {
              token: '',
              responseType: ''
            };
          }

          return new Promise(function (resolve, reject) {
            var XMLHttp = new XMLHttpRequest();
            XMLHttp.open("GET", url, true);
            XMLHttp.responseType = options.responseType;

            if (options.token && options.token.length > 0) {
              XMLHttp.setRequestHeader('Authorization', "Bearer " + options.token);
            } else {
              reject("Token is empty: " + options.token);
            }

            XMLHttp.setRequestHeader("Content-Type", "application/json");

            XMLHttp.onreadystatechange = function () {
              console.log("state = " + XMLHttp.readyState + " status =" + XMLHttp.status);

              if (XMLHttp.readyState == 4) {
                if (XMLHttp.status == 200) {
                  switch (XMLHttp.responseType) {
                    case 'text':
                      // console.log(XMLHttp.responseText);
                      resolve(XMLHttp.responseText);
                      break;

                    default:
                      // console.log(XMLHttp.response);
                      resolve(XMLHttp.response);
                      break;
                  }
                } else if (XMLHttp.status >= 400 || XMLHttp.status === 0) {
                  reject("reponse status code=" + XMLHttp.status);
                }
              }
            };

            XMLHttp.send();
          });
        };

        GameUtilites.postRequest = function postRequest(url, params, options) {
          if (options === void 0) {
            options = {
              token: '',
              responseType: ''
            };
          }

          return new Promise(function (resolve, reject) {
            var XMLHttp = new XMLHttpRequest();
            XMLHttp.open("POST", url, true);
            XMLHttp.responseType = options.responseType;

            if (options.token && options.token.length > 0) {
              XMLHttp.setRequestHeader('Authorization', "Bearer " + options.token);
            } else {
              reject("Token is empty: " + options.token);
            }

            XMLHttp.setRequestHeader("Content-Type", "application/json");
            GameUtilites.log("POST" + " " + url);

            XMLHttp.onreadystatechange = function () {
              GameUtilites.log("state = " + XMLHttp.readyState + " status =" + XMLHttp.status);

              if (XMLHttp.readyState == 4) {
                if (XMLHttp.status == 200) {
                  switch (XMLHttp.responseType) {
                    case 'text':
                      // console.log(XMLHttp.responseText);
                      resolve(XMLHttp.responseText);
                      break;

                    default:
                      // console.log(XMLHttp.response);
                      resolve(XMLHttp.response);
                      break;
                  }
                } else if (XMLHttp.status >= 400 || XMLHttp.status === 0) {
                  reject("reponse status code=" + XMLHttp.status);
                }
              }
            };

            XMLHttp.send(JSON.stringify(params));
          });
        };

        GameUtilites.geSpriteFrameAsync = function geSpriteFrameAsync(imgUrl) {
          imgUrl = imgUrl.replace("img.mservice.io", "atc-edge03.mservice.com.vn");
          return new Promise(function (resolve, reject) {
            assetManager.loadRemote(imgUrl, {
              cacheEnabled: true,
              maxRetryCount: 0
            }, function (err, imageAsset) {
              if (err) {
                resolve(null);
                console.warn(err);
              } else {
                if (imageAsset) {
                  var spriteFrame = new SpriteFrame();
                  var texture = new Texture2D();
                  texture.image = imageAsset;
                  spriteFrame.texture = texture;
                  resolve(spriteFrame);
                } else {
                  resolve(null);
                }
              }
            });
          });
        };

        GameUtilites.getTextureAsync = function getTextureAsync(imgUrl) {
          imgUrl = imgUrl.replace("img.mservice.io", "atc-edge03.mservice.com.vn");
          return new Promise(function (resolve, reject) {
            assetManager.loadRemote(imgUrl, {
              cacheEnabled: true,
              maxRetryCount: 0
            }, function (err, imageAsset) {
              if (err) {
                reject(err);
              } else {
                var texture = new Texture2D();
                texture.image = imageAsset;
                resolve(texture);
              }
            });
          });
        };

        GameUtilites.loadAvatar = function loadAvatar(id) {
          var url = Api.Avatar.replace("{0}", id);
          return GameUtilites.geSpriteFrameAsync(url);
        };

        GameUtilites.createEmptyNode = function createEmptyNode(parent, nameNode) {
          if (nameNode === void 0) {
            nameNode = 'defaut';
          }

          var node = new Node(nameNode);
          parent.addChild(node);
          return node;
        };

        GameUtilites.log = function log() {// console.log(...arg)
        };

        GameUtilites.logR = function logR() {// if (arguments.length > 0 && typeof arguments[0].message !== 'undefined') {
          //     console.trace(arguments[0].message);
          // } else {
          //     console.log(...arg);
          // }
        };

        GameUtilites.getScale = function getScale(targetSprite, size) {
          var rect = targetSprite.rect;
          var rateX = size.width / rect.width;
          var rateY = size.height / rect.height;
          var target = rateY;
          if (rateX > rateY) target = rateX;
          return target;
        };

        GameUtilites.CorrectSpriteFrameSize = function CorrectSpriteFrameSize(sprite, size) {
          var scale = GameUtilites.getScale(sprite.spriteFrame, size);
          sprite.node.setScale(new Vec3(scale, scale, scale));
        };

        GameUtilites.stringRemoveAccent = function stringRemoveAccent(str) {
          var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ";
          var to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";

          for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(RegExp(from[i], "gi"), to[i]);
          }

          return str;
        };

        GameUtilites.getCurrentMiliSecond = function getCurrentMiliSecond() {
          var current = new Date();
          return current.getTime();
        };

        GameUtilites.cloneObject = function cloneObject(data) {
          var keys = Object.keys(data);
          var t = Object.create(null);

          for (var i = 0, size = keys.length; i < size; i++) {
            t[keys[i]] = data[keys[i]];
          }

          return t;
        };

        GameUtilites.toLocalString = function toLocalString(num) {
          num = Math.round(num);
          return num.toLocaleString().replace(/","/g, ".");
        };

        GameUtilites.getUrlVer = function getUrlVer(url) {
          // return url + "?v=" + Api.VERSION;
          return url;
        };

        GameUtilites.getTime = function getTime(d) {
          var pad = function pad(s) {
            return s < 10 ? '0' + s : s;
          };

          return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
        };

        GameUtilites.getDate = function getDate(miliseconds) {
          var d = new Date(miliseconds);

          var pad = function pad(s) {
            return s < 10 ? '0' + s : s;
          };

          return pad(d.getDate()) + "/" + pad(d.getMonth()) + "/" + pad(d.getFullYear());
        };

        GameUtilites.sameDay = function sameDay(d1, d2) {
          return d1.getFullYear() === d2.getFullYear() && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth();
        };

        GameUtilites.getDateTime = function getDateTime(d) {
          var pad = function pad(s) {
            return s < 10 ? '0' + s : s;
          };

          return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/') + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
        };

        GameUtilites.milisecondToTime = function milisecondToTime(ms) {
          return {
            seconds: Math.floor(ms / 1000),
            minutes: Math.floor(ms / (1000 * 60)),
            hours: Math.floor(ms / (1000 * 60 * 60))
          };
        };

        GameUtilites.getTimeUnit = function getTimeUnit(ms) {
          var timeOb = GameUtilites.milisecondToTime(ms);

          if (timeOb.hours > 0) {
            return timeOb.hours.toString() + ' Tiếng';
          } else if (timeOb.minutes > 0) {
            return timeOb.minutes.toString() + ' Phút';
          } else {
            return timeOb.seconds.toString() + ' Giây';
          }
        };

        GameUtilites.hourToMiliseconds = function hourToMiliseconds(hour) {
          return hour * 3600000;
        };

        GameUtilites.unloadAllChild = function unloadAllChild(parent) {
          parent.children.forEach(function (child) {
            child.destroy();
          });
          parent.removeAllChildren();
        };

        GameUtilites.isUrl = function isUrl(cta) {
          if (cta.startsWith('http') || cta.indexOf('www') === 0) {
            return true;
          }

          return false;
        };

        GameUtilites.SaveValue = function SaveValue(key, value) {
          var mainKey = Api.GAME_ID + Profile.Instance.UserID;
          var str = localStorage.getItem(mainKey);
          var data = JSON.parse(str);

          if (!data) {
            data = {};
          }

          data[key] = value;
          console.log("SaveValue");
          console.log(data);
          localStorage.setItem(mainKey, JSON.stringify(data));
        };

        GameUtilites.GetValue = function GetValue(key) {
          var mainKey = Api.GAME_ID + Profile.Instance.UserID;
          var str = localStorage.getItem(mainKey);
          var data = JSON.parse(str);
          console.log("GetValue");
          console.log(data);

          if (data) {
            return data[key];
          }

          return null;
        };

        return GameUtilites;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ItemMgr.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Utils.ts', './GiftScore.ts', './Item.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Prefab, Camera, instantiate, math, Component, Utils, GiftScore, Item;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Camera = module.Camera;
      instantiate = module.instantiate;
      math = module.math;
      Component = module.Component;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      GiftScore = module.GiftScore;
    }, function (module) {
      Item = module.Item;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

      cclegacy._RF.push({}, "26d1f1pUHxNjqPd1Llm4POh", "ItemMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ItemMgr = exports('ItemMgr', (_dec = ccclass('ItemMgr'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(Prefab), _dec5 = property(Camera), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ItemMgr, _Component);

        function ItemMgr() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "itemPrefabs", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "scoreBoxPrefabs", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "scorePrefabs", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "camera", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ItemMgr.prototype;

        _proto.onLoad = function onLoad() {
          ItemMgr.instance = this;
        };

        _proto.Reset = function Reset() {
          Utils.destroyAllChild(this.node);
        };

        _proto.CreateBonus = function CreateBonus(target, bonus, stepCreate) {
          var item = instantiate(this.scoreBoxPrefabs); // prefab.Spawn();

          var giftScore = instantiate(this.scorePrefabs);
          giftScore.parent = this.node;
          var giftScoreSrc = giftScore.getComponent(GiftScore);
          giftScoreSrc.Init(target, bonus);
          var itemSrc = item.getComponent(Item);
          itemSrc.Init(giftScoreSrc, stepCreate);
          return itemSrc;
        };

        _proto.CreateItem = function CreateItem(score, stepCreate) {
          var item = instantiate(this.itemPrefabs[math.randomRangeInt(0, this.itemPrefabs.length)]);
          var itemSrc = item.getComponent(Item);
          itemSrc.Init(null, stepCreate);
          return itemSrc;
        };

        _proto.worldToScreenPoint = function worldToScreenPoint(wpos) {
          return this.camera.convertToUINode(wpos, this.node);
        };

        _createClass(ItemMgr, null, [{
          key: "Instance",
          get: function get() {
            return ItemMgr.instance;
          }
        }]);

        return ItemMgr;
      }(Component), _defineProperty(_class3, "instance", null), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "itemPrefabs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scoreBoxPrefabs", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "scorePrefabs", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MaxApiUtils.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "28774sywudKJaUfJ3kzaJm/", "MaxApiUtils", undefined);

      var MaxApiUtils = exports('default', /*#__PURE__*/function () {
        function MaxApiUtils() {}

        MaxApiUtils.registerScreenShot = function registerScreenShot(callback) {
          if (window.MaxApi) {
            window.MaxApi.listen("onScreenShot", function () {
              callback();
            });
          } else {
            callback(null);
          }
        };

        MaxApiUtils.RegisterNoti = function RegisterNoti(callback) {
          if (window.MaxApi) {
            window.MaxApi.observer('DIS_RECEIVE_NOTI', function (res) {
              console.log("[DIS_RECEIVE_NOTI] " + res);
              callback(res);
            });
          } else {
            callback(null);
          }
        };

        MaxApiUtils.GetProfile = function GetProfile() {
          return new Promise(function (resolve, reject) {
            if (window.MaxApi) {
              window.MaxApi.getProfile(function (res) {
                resolve(res);
              });
            } else {
              resolve();
            }
          });
        };

        MaxApiUtils.UploadImage = function UploadImage(base64) {
          return new Promise(function (resolve, reject) {
            var props = {
              path: 'base64-upload',
              files: base64,
              options: {
                loading: true
              }
            };

            if (window.MaxApi) {
              window.MaxApi.uploadImage(props, function (_ref) {
                var status = _ref.status,
                    response = _ref.response;
                var url = response.url;

                if (url && url.length > 0 && url.indexOf('http') >= 0) {
                  resolve(url);
                } else {
                  resolve(response);
                }
              });
            } else {
              resolve(null);
            }
          });
        };

        MaxApiUtils.GetDeviceInfo = function GetDeviceInfo() {
          return new Promise(function (resolve, reject) {
            if (window.MaxApi) {
              window.MaxApi.getDeviceInfo(function (res) {
                resolve(res);
              });
            } else {
              resolve(null);
            }
          });
        };

        MaxApiUtils.CheckHighPerformanceDevice = function CheckHighPerformanceDevice() {
          return new Promise(function (resolve, reject) {
            if (window.MaxApi) {
              window.MaxApi.isHighPerformanceDevice(function (res) {
                resolve(res);
              });
            } else {
              resolve(true);
            }
          });
        };

        MaxApiUtils.closeGame = function closeGame() {
          if (window.MaxApi) {
            window.MaxApi.dismiss();
          }
        };

        MaxApiUtils.copyToClipboard = function copyToClipboard(copyText, toastMsg) {
          if (window.MaxApi) {
            window.MaxApi.copyToClipboard(copyText, toastMsg);
          }
        };

        MaxApiUtils.openWeb = function openWeb(url) {
          window.MaxApi.openWeb({
            url: url
          });
        } //start screen by feature code.
        ;

        MaxApiUtils.startFeatureCode = function startFeatureCode(featureCode, params, callback) {
          if (!window.MaxApi) {
            callback(true);
          } else {
            window.MaxApi.startFeatureCode(featureCode, params, callback);
          }
        };

        MaxApiUtils.checkPermission = function checkPermission(permissionName) {
          return new Promise(function (resolve) {
            if (!window.MaxApi) {
              resolve('granted');
            } else {
              window.MaxApi.checkPermission(permissionName, function (result) {
                resolve(result);
              });
            }
          });
        };

        MaxApiUtils.requestPermission = function requestPermission(permissionName) {
          return new Promise(function (resolve) {
            if (!window.MaxApi) {
              resolve('granted');
            } else {
              window.MaxApi.requestPermission(permissionName, function (result) {
                resolve(result);
              });
            }
          });
        };

        MaxApiUtils.getContacts = function getContacts() {
          return new Promise(function (resolve) {
            if (!window.MaxApi) {
              resolve([]);
            } else {
              var paramsContact = {
                allowNonMomo: false,
                autoFocus: true,
                isAllowMerchant: false,
                showPopupNonMomo: false,
                allowAgency: false,
                allowMultipleSelection: true
              };
              window.MaxApi.getContacts({
                paramsContact: paramsContact,
                title: "MegaLuckyWheel"
              }, function (contacts) {
                resolve(contacts);
              });
            }
          });
        };

        MaxApiUtils.getAvatarEndPoint = function getAvatarEndPoint() {
          var _this = this;

          return new Promise(function (resolve) {
            if (!window.MaxApi) {
              resolve("");
            } else {
              if (_this.avatarEndpoint.length > 0) {
                resolve(_this.avatarEndpoint);
              }

              window.MaxApi.getAvatarEndPoint(function (response) {
                _this.avatarEndpoint = response;
                resolve(response);
              });
            }
          });
        };

        MaxApiUtils.getContact = function getContact() {
          return new Promise(function (resolve) {
            if (!window.MaxApi) {
              resolve([]);
            } else {
              window.MaxApi.getContact({}, function (contacts) {
                resolve(contacts);
              });
            }
          });
        };

        MaxApiUtils.goBack = function goBack() {
          return new Promise(function (resolve) {
            if (!window.MaxApi) {
              resolve('denied');
            } else {
              window.MaxApi.goBack(function (result) {
                resolve(result);
              });
            }
          });
        };

        MaxApiUtils.getScreenShot = function getScreenShot(callback) {
          if (!window.MaxApi) {
            callback("");
          } else {
            window.MaxApi.getScreenShot(callback);
          }
        };

        MaxApiUtils.saveImage = function saveImage(data) {
          return new Promise(function (resolve) {
            if (window.MaxApi) {
              window.MaxApi.requestPermission('storage', function (status) {
                if (status === 'granted') {
                  window.MaxApi.saveImage(data, function (result) {
                    if (result) {
                      window.MaxApi.showToast({
                        duration: 5000,
                        title: 'Lưu hình ảnh thành công'
                      });
                      resolve(true);
                    } else {
                      window.MaxApi.showToast({
                        duration: 5000,
                        title: 'Lưu hình ảnh không thành công'
                      });
                      resolve(false);
                    }
                  });
                } else {
                  window.MaxApi.showToast({
                    duration: 5000,
                    title: 'Lưu hình ảnh không thành công'
                  });
                  resolve(false);
                }
              });
            } else {
              resolve(false);
            }
          });
        };

        MaxApiUtils.shareFacebook = function shareFacebook(params, callback) {
          if (!window.MaxApi) {
            callback("");
          } else {
            window.MaxApi.shareFacebook(params, callback);
          }
        };

        MaxApiUtils.facebookMsg = function facebookMsg(link) {
          var _url = "fb-messenger://share/?link=" + link;

          if (window.MaxApi) {
            window.MaxApi.openURL(_url);
          }
        };

        MaxApiUtils.moreMenu = function moreMenu(title, subject, message, url) {
          return new Promise(function (resolve) {
            if (!window.MaxApi) {
              resolve(false);
            } else {
              var shareOptions = {
                title: title,
                message: message,
                url: url,
                subject: subject
              };
              window.MaxApi.share(shareOptions, function (result) {
                resolve(result);
              });
            }
          });
        };

        MaxApiUtils.copyLink = function copyLink(link) {
          if (window.MaxApi) {
            window.MaxApi.copyToClipboard(link, 'Đã sao chép');
          }
        };

        MaxApiUtils.trackEvent = function trackEvent(params) {
          if (window.MaxApi) {
            window.MaxApi.trackEvent('momo_jump', params);
          }
        };

        MaxApiUtils.showToast = function showToast(title, time) {
          if (time === void 0) {
            time = 3000;
          }

          if (window.MaxApi) {
            window.MaxApi.showToast({
              duration: time,
              title: title
            });
          }
        };

        return MaxApiUtils;
      }());

      _defineProperty(MaxApiUtils, "avatarEndpoint", "");

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Obstacle.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, tween, Vec3, Component, GameDefine;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      GameDefine = module.GameDefine;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "2de9czZyQRF+7g64upqLhay", "Obstacle", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Obstacle = exports('Obstacle', (_dec = ccclass('Obstacle'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Obstacle, _Component);

        function Obstacle() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = Obstacle.prototype;

        _proto.playOnLoad = function playOnLoad() {
          tween(this.node).stop();
          this.node.scale = Vec3.ZERO.clone();
          tween(this.node).to(GameDefine.TREE_GROW_UP_DELAY, {
            scale: Vec3.ONE.clone()
          }, {
            easing: 'smooth'
          }).start();
        };

        return Obstacle;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Gameconfig.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts', './Profile.ts'], function (exports) {
  'use strict';

  var _defineProperty, _inheritsLoose, _assertThisInitialized, _createClass, cclegacy, _decorator, math, Component, Default, Profile;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      math = module.math;
      Component = module.Component;
    }, function (module) {
      Default = module.Default;
    }, function (module) {
      Profile = module.Profile;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "3067cdUA1dOZIgAYWcOzEaU", "Gameconfig", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      var GameConfigDistance = function GameConfigDistance() {
        _defineProperty(this, "step", void 0);

        _defineProperty(this, "min", void 0);

        _defineProperty(this, "max", void 0);
      };

      var GameConfigStepSize = function GameConfigStepSize() {
        _defineProperty(this, "step", void 0);

        _defineProperty(this, "min", void 0);

        _defineProperty(this, "max", void 0);
      };

      var Gameconfig = exports('Gameconfig', (_dec = ccclass('Gameconfig'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Gameconfig, _Component);

        function Gameconfig() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "data", null);

          _defineProperty(_assertThisInitialized(_this), "giftStatus", []);

          _defineProperty(_assertThisInitialized(_this), "giftSegmentStatus", []);

          _defineProperty(_assertThisInitialized(_this), "bonus", []);

          return _this;
        }

        var _proto = Gameconfig.prototype;

        _proto.Init = function Init() {};

        _proto.GetSize = function GetSize(step) {
          // if (this.data != null) {
          //     let sizes = this.data.item.size;
          //     let nStep = step % 50;
          //     if (step >= 50) {
          //         return sizes[sizes.length - 1];
          //     }
          //     else {
          //         for (let i = sizes.length - 1; i >= 0; i--) {
          //             if (nStep >= sizes[i].step) {
          //                 return sizes[i];
          //             }
          //         }
          //     }
          // }
          var size = new GameConfigStepSize();
          size.step = step;
          size.min = 0.7;
          size.max = 1.2;
          return size;
        };

        _proto.GetDistance = function GetDistance(step) {
          // if (this.data != null) {
          //     let distances = this.data.item.distances;
          //     let nStep = step % 50;
          //     if (step >= 50) {
          //         return distances[distances.length - 1];
          //     }
          //     else {
          //         for (let i = distances.length - 1; i >= 0; i--) {
          //             if (nStep >= distances[i].step) {
          //                 return distances[i];
          //             }
          //         }
          //     }
          // }
          var distance = new GameConfigDistance();
          distance.step = step;
          distance.min = 1.6;
          distance.max = 3.5;
          return distance;
        }; // public get EventLink(): string {
        //     return this.data == null ? "" : this.data.item.eventLink;
        // }
        // public get EventRewardLink(): string {
        //     return 'https://momo.vn/tin-tuc/tin-tuc-su-kien/noel-vang-2226-12-nhay-bat-giat-qua-iphone-13-2262?utm_source=in_app&utm_campaign=momojump';
        // }
        // public get TurnTimerLimit(): number {
        //     return this.data.item.turnTimerLimit;
        // }
        // public get GoldHour(): { start: number, end: number } {
        //     return this.data.item.goldHour;
        // }
        // public get GoldDay(): { start: number, end: number, stepBonus: number } {
        //     return this.data.item.goldDay;
        // }
        // public get NotificationMsg(): string {
        //     if (!this.data.item.info || this.data.item.info.length < 1) {
        //         return '';
        //     }
        //     return this.data.item.info;
        // }
        // public GetBannerInfo(screen: ScreenName): BannerInfo {
        //     const banner = this.bannerInfoMap.get(screen);
        //     if (banner) {
        //         return banner
        //     }
        //     return { imgUrl: '', refIdUrl: '' };
        // }


        _proto.Reset = function Reset() {
          this.giftStatus = [];
          this.giftSegmentStatus = [];
          this.bonus = null;
        };

        _proto.HasGift = function HasGift(step) {
          var hasGift = false;

          if (this.data != null && Profile.Instance.HasGift) {
            hasGift = this.giftStatus[step];
          }

          return hasGift;
        };

        _proto.SetBonus = function SetBonus(value) {
          this.bonus = value;
        };

        _proto.CheckBonus = function CheckBonus(step) {
          if (this.bonus && this.bonus[step]) {
            return this.bonus[step];
          } else {
            return 0;
          }
        };

        _proto.CheckComboBonus = function CheckComboBonus(perfectStreakCount) {
          if (perfectStreakCount < 1) return 0;
          return this.ComboBonusScores[Math.min(this.ComboBonusScores.length - 1, perfectStreakCount - 1)];
        };

        _proto.CheckGiftForStep = function CheckGiftForStep(step) {
          var _this2 = this;

          if (this.data != null && Profile.Instance.HasGift && Profile.Instance.GameID != null) {
            this.data.item.reward.forEach(function (reward, index) {
              if (step >= reward.from && step <= reward.to) {
                if (_this2.giftSegmentStatus.indexOf(index) != -1) {
                  _this2.giftStatus[step] = false;
                } else {
                  var hasGift = math.randomRangeInt(step, reward.to + 1) * 2 <= step + reward.to;

                  if (hasGift) {
                    _this2.giftSegmentStatus.push(index);
                  }

                  _this2.giftStatus[step] = hasGift;
                }

                return;
              }
            });
          }
        } // public Fetch(callback: Function) {
        //     NetworkMgr.getRequest(Api.HOST + Api.GameConfig, (result) => {
        //         if (result && result.item) {
        //             let shouldEmitGoldHourEvent = false;
        //             this.data = result;
        //             this.data.item.turnTimer = result.item.turnTimer ? parseInt(result.item.turnTimer) : 0;
        //             if (result.item.goldHour) {
        //                 this.data.item.goldHour.start = parseInt(result.item.goldHour.start);
        //                 this.data.item.goldHour.end = parseInt(result.item.goldHour.end);
        //                 shouldEmitGoldHourEvent = true;
        //                 EventListener.Instance.emit(EventName.OnGameConfigUpdate, this.data);
        //             }
        //             if (result.item.goldDay) {
        //                 this.data.item.goldDay.start = parseInt(result.item.goldHour.start);
        //                 this.data.item.goldDay.end = parseInt(result.item.goldHour.end);
        //                 shouldEmitGoldHourEvent = true;
        //             }
        //             callback(true);
        //         }
        //         else {
        //             callback(false);
        //         }
        //     });
        // }
        ;

        _proto.getTurnTime = function getTurnTime() {
          return this.data.item.turnTimer;
        };

        _createClass(Gameconfig, [{
          key: "IsLoaded",
          get: function get() {
            return this.data != null;
          }
        }, {
          key: "RewardScoreList",
          get: function get() {
            if (this.data == null) {
              return Default.RewardScoreList;
            } else {
              return this.data.item.checkpoint;
            }
          }
        }, {
          key: "MaxScore",
          get: function get() {
            var scores = this.RewardScoreList;
            return scores[scores.length - 1] + scores[0];
          }
        }, {
          key: "ComboBonusScores",
          get: function get() {
            return Default.ComboBonus;
          }
        }, {
          key: "ScoreRange",
          get: function get() {
            if (this.data) {
              return this.data.item.point;
            } else {
              return Default.ScoreRange;
            }
          }
        }, {
          key: "Power",
          get: function get() {
            if (this.data) {
              return this.data.item.power;
            } else {
              return Default.Power;
            }
          }
        }], [{
          key: "Instance",
          get: // private bannerInfoMap: Map<string, BannerInfo> = new Map<string, BannerInfo>();
          function get() {
            if (!Gameconfig.instance) {
              Gameconfig.instance = new Gameconfig();
              Gameconfig.instance.Init();
            }

            return Gameconfig.instance;
          }
        }]);

        return Gameconfig;
      }(Component), _defineProperty(_class2, "instance", null), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameDefine.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, Color, Size;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      Size = module.Size;
    }],
    execute: function () {
      exports({
        DevicePerformance: void 0,
        Direction: void 0,
        EventName: void 0,
        FeatureCode: void 0,
        GiftType: void 0,
        HistoryCellType: void 0,
        LeaderboardType: void 0,
        Mission: void 0,
        PopupName: void 0,
        ProfileStorageKey: void 0,
        ProgressGiftStatus: void 0,
        QuestType: void 0,
        RankingType: void 0,
        ScreenName: void 0,
        SoundName: void 0,
        TouchState: void 0
      });

      cclegacy._RF.push({}, "49ae6bXO6tNtK58MjJ4XsZJ", "GameDefine", undefined);

      var ScreenName;

      (function (ScreenName) {
        ScreenName["InGame"] = "InGame";
        ScreenName["EndGame"] = "EndGame";
        ScreenName["Loading"] = "Loading";
      })(ScreenName || (ScreenName = exports('ScreenName', {})));

      var PopupName;

      (function (PopupName) {
        PopupName["NetworkError"] = "NetworkError";
        PopupName["MessageBox"] = "MessageBox";
        PopupName["OutOfTurn"] = "OutOfTurn";
        PopupName["UserInfo"] = "UserInfo";
      })(PopupName || (PopupName = exports('PopupName', {})));

      var SoundName;

      (function (SoundName) {
        SoundName["BackgroundMusic"] = "bg";
        SoundName["Jump"] = "landing";
        SoundName["PreJump"] = "prejump";
        SoundName["Dead"] = "die";
        SoundName["Landing"] = "landing";
        SoundName["Spawn"] = "spawn";
        SoundName["Gameover"] = "gameover";
        SoundName["GetGift"] = "gift";
        SoundName["ComboPerfect_1"] = "perfect_x_1";
        SoundName["ComboPerfect_2"] = "perfect_x_2";
        SoundName["ComboPerfect_3"] = "perfect_x_3";
        SoundName["ComboPerfect_4"] = "perfect_x_4";
        SoundName["ComboPerfect_5"] = "perfect_x_5";
      })(SoundName || (SoundName = exports('SoundName', {})));

      var EventName;

      (function (EventName) {
        EventName["OnUpdateUserInfo"] = "on-update-userinfo";
        EventName["OnUpdateTurn"] = "on-update-turn";
        EventName["OnMissionComplete"] = "on-mission-complete";
        EventName["MissionUpdate"] = "mission-update";
        EventName["OnUpdateProgress"] = "on-update-progress";
        EventName["TrackLoadDataLeaderboard"] = "load-leaderboard-success";
        EventName["OnUpdateLabelScoreProgress"] = "on-update-label-score-progress";
        EventName["OnGameConfigUpdate"] = "on-gameconfig-update";
      })(EventName || (EventName = exports('EventName', {})));

      var Mission;

      (function (Mission) {
        Mission["ShareFacebook"] = "share_fb";
        Mission["FirstLogin"] = "first_login";
      })(Mission || (Mission = exports('Mission', {})));

      var GiftType;

      (function (GiftType) {
        GiftType["Gift"] = "gift";
        GiftType["Point"] = "point";
      })(GiftType || (GiftType = exports('GiftType', {})));

      var DevicePerformance;

      (function (DevicePerformance) {
        DevicePerformance["LowEnd"] = "low-end";
        DevicePerformance["MideEnd"] = "mid-end";
        DevicePerformance["HighEnd"] = "high-end";
      })(DevicePerformance || (DevicePerformance = exports('DevicePerformance', {})));

      var TouchState;

      (function (TouchState) {
        TouchState[TouchState["None"] = 0] = "None";
        TouchState[TouchState["Down"] = 1] = "Down";
        TouchState[TouchState["Press"] = 2] = "Press";
        TouchState[TouchState["Up"] = 3] = "Up";
      })(TouchState || (TouchState = exports('TouchState', {})));

      var Direction;

      (function (Direction) {
        Direction[Direction["Left"] = 0] = "Left";
        Direction[Direction["Right"] = 1] = "Right";
        Direction[Direction["Forward"] = 2] = "Forward";
        Direction[Direction["Backward"] = 3] = "Backward";
      })(Direction || (Direction = exports('Direction', {})));

      var RankingType;

      (function (RankingType) {
        RankingType[RankingType["FriendWeekly"] = 0] = "FriendWeekly";
        RankingType[RankingType["GlobleWeekly"] = 1] = "GlobleWeekly";
        RankingType[RankingType["FriendAll"] = 2] = "FriendAll";
        RankingType[RankingType["GlobleAll"] = 3] = "GlobleAll";
      })(RankingType || (RankingType = exports('RankingType', {})));

      var FeatureCode;

      (function (FeatureCode) {
        FeatureCode["PROFILE_INFO"] = "profile_info";
        FeatureCode["MY_VOUCHERS"] = "my_vouchers";
      })(FeatureCode || (FeatureCode = exports('FeatureCode', {})));

      var HistoryCellType;

      (function (HistoryCellType) {
        HistoryCellType[HistoryCellType["CATEGORY"] = 0] = "CATEGORY";
        HistoryCellType[HistoryCellType["ITEM"] = 1] = "ITEM";
      })(HistoryCellType || (HistoryCellType = exports('HistoryCellType', {})));

      var ProgressGiftStatus;

      (function (ProgressGiftStatus) {
        ProgressGiftStatus["AVAILABLE"] = "AVAILABLE";
        ProgressGiftStatus["OUT_OF_STOCK"] = "OUT_OF_STOCK";
        ProgressGiftStatus["UNAVAILABLE"] = "UNAVAILABLE";
        ProgressGiftStatus["CLAIMED"] = "CLAIMED";
      })(ProgressGiftStatus || (ProgressGiftStatus = exports('ProgressGiftStatus', {})));

      var QuestType;

      (function (QuestType) {
        QuestType["ShareCodeQuest"] = "share_code";
        QuestType["GetCodeQuest"] = "enter_code";
        QuestType["TransferMoney"] = "transfer_p2p";
        QuestType["WatchVideo"] = "watch_video";
        QuestType["ShareFB"] = "share_fb";
        QuestType["Quiz"] = "quiz_test";
        QuestType["EnterActiveCode"] = "enter_code";
        QuestType["QuizFailure"] = "quiz_test_failure";
        QuestType["CashtinTTT"] = "cashin_ttt";
        QuestType["FaceMatching"] = "facematching";
        QuestType["FirstLogin"] = "first_login";
      })(QuestType || (QuestType = exports('QuestType', {})));

      var LeaderboardType;

      (function (LeaderboardType) {
        LeaderboardType[LeaderboardType["NORMAL"] = 0] = "NORMAL";
        LeaderboardType[LeaderboardType["GOLDHOUR"] = 1] = "GOLDHOUR";
      })(LeaderboardType || (LeaderboardType = exports('LeaderboardType', {})));

      var GameDefine = exports('GameDefine', function GameDefine() {});

      _defineProperty(GameDefine, "STEP_FORCE", 3);

      _defineProperty(GameDefine, "MAX_FORCE", 11);

      _defineProperty(GameDefine, "MIN_FORCE", 6);

      _defineProperty(GameDefine, "STEP_MAX_SCORE", 10);

      _defineProperty(GameDefine, "MAX_JUMP_SUCCESS", 3);

      _defineProperty(GameDefine, "MAX_COMBO_PERFECT_SOUND", 5);

      _defineProperty(GameDefine, "OB_MAX_FORCE", 10.0);

      _defineProperty(GameDefine, "OB_MIN_FORCE", 7.0);

      _defineProperty(GameDefine, "RANKING_LIMIT", 100);

      _defineProperty(GameDefine, "HISTORY_LIMIT", 100);

      _defineProperty(GameDefine, "LB_VIOLET_COLOR", new Color('d3adf7'));

      _defineProperty(GameDefine, "LB_HIGHLIGHT_SELF_AVATAR_COLOR", new Color('ffe8ba'));

      _defineProperty(GameDefine, "LB_HIGHLIGHT_PIN_CELL_AVA_COLOR", new Color('ffc770'));

      _defineProperty(GameDefine, "VIOLET_COLOR", new Color('b37feb'));

      _defineProperty(GameDefine, "LB_PINK_COLOR", new Color('ffd6e7'));

      _defineProperty(GameDefine, "LB_MNE_CELL_COLOR", new Color('fffbb6'));

      _defineProperty(GameDefine, "RANK_ITEM_TOP_COLOR", new Color('#FFD6E7'));

      _defineProperty(GameDefine, "RANK_ITEM_ICON_COLOR", new Color('#E22D90'));

      _defineProperty(GameDefine, "RANK_ITEM_NONE_COLOR", new Color('#FFD6E7'));

      _defineProperty(GameDefine, "HISTORY_GIFT_SIZE", new Size(54, 54));

      _defineProperty(GameDefine, "PROGRESS_GIFT_SIZE", new Size(54, 54));

      _defineProperty(GameDefine, "RANK_AVATAR_SIZE", new Size(60, 60));

      _defineProperty(GameDefine, "TOP_RANK_AVATAR_SIZE", new Size(93, 93));

      _defineProperty(GameDefine, "INGAME_AVATAR_SIZE", new Size(80, 80));

      _defineProperty(GameDefine, "PROGRESS_BANNER_SIZE", new Size(680, 225));

      _defineProperty(GameDefine, "LB_BANNER_SIZE", new Size(680, 250));

      _defineProperty(GameDefine, "DROP_BOX_DELAY", 0.5);

      _defineProperty(GameDefine, "TREE_GROW_UP_DELAY", 0.5);

      _defineProperty(GameDefine, "MULTIPLY_CHAR", '×');

      var Default = exports('Default', function Default() {});

      _defineProperty(Default, "ScoreRange", [20, 6, 4, 2, 1]);

      _defineProperty(Default, "RewardScoreList", [100, 200, 300]);

      _defineProperty(Default, "Power", [3.0, 3.0]);

      _defineProperty(Default, "distance", [1.9, 3]);

      _defineProperty(Default, "ComboBonus", [2, 4, 6, 8, 10]);

      var Layer = exports('Layer', function Layer() {});

      _defineProperty(Layer, "Ground", 1 << 0);

      _defineProperty(Layer, "Player", 1 << 1);

      _defineProperty(Layer, "Box", 1 << 2);

      _defineProperty(Layer, "Item", 1 << 3);

      var ProfileStorageKey;

      (function (ProfileStorageKey) {
        ProfileStorageKey["DisplayedToolTip"] = "DisplayedToolTip";
        ProfileStorageKey["IsOnboardingCompete"] = "IsOnboardingCompete";
      })(ProfileStorageKey || (ProfileStorageKey = exports('ProfileStorageKey', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UserHUD.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts', './EventListener.ts', './Api.ts', './Profile.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, _createClass, cclegacy, _decorator, Button, Label, Node, Component, EventName, GameDefine, EventListener, Api, Profile;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Label = module.Label;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      EventName = module.EventName;
      GameDefine = module.GameDefine;
    }, function (module) {
      EventListener = module.EventListener;
    }, function (module) {
      Api = module.Api;
    }, function (module) {
      Profile = module.Profile;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "4ca40A429RMw50kPxvgqoO6", "UserHUD", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var UserHUD = exports('UserHUD', (_dec = ccclass('UserHUD'), _dec2 = property(Button), _dec3 = property(Label), _dec4 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UserHUD, _Component);

        function UserHUD() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "avatarFrameBtn", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "turn", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "avatar", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "avatarSprite", null);

          return _this;
        }

        var _proto = UserHUD.prototype;

        _proto.onLoad = function onLoad() {
          var self = this;
          EventListener.Instance.on(EventName.OnUpdateTurn, function (resp) {
            self.turn.string = Profile.Instance.Turn.toString() + ' lượt';
          });
          EventListener.Instance.on(EventName.OnUpdateUserInfo, function (data) {
            self.MyAvatarSprite.Fetch(Api.Avatar.replace('{0}', data.userId));
          });
        };

        _proto.start = function start() {// this.avatarFrameBtn.node.on("click", this.OnAvatarClick, this);
        } // OnAvatarClick() {
        // PopupMgr.Instance.Show(PopupName.AddTurn);
        // MaxApiUtils.trackEvent({ action: 'home_tap_turn' });
        // }
        ;

        _createClass(UserHUD, [{
          key: "MyAvatarSprite",
          get: function get() {
            if (!this.avatarSprite) {
              this.avatarSprite = this.avatar.getComponent('MySprite');
              this.avatarSprite.correctSpriteFrameSize(GameDefine.INGAME_AVATAR_SIZE);
            }

            return this.avatarSprite;
          }
        }]);

        return UserHUD;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "avatarFrameBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "turn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "avatar", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RankView.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts', './Profile.ts', './RankItem.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, ScrollView, UITransform, instantiate, Layout, Component, GameDefine, Profile, RankItem;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ScrollView = module.ScrollView;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Layout = module.Layout;
      Component = module.Component;
    }, function (module) {
      GameDefine = module.GameDefine;
    }, function (module) {
      Profile = module.Profile;
    }, function (module) {
      RankItem = module.RankItem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "4efb8PBJRNMzYNq65gDK2pd", "RankView", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ScrollViewEvent;

      (function (ScrollViewEvent) {
        ScrollViewEvent[ScrollViewEvent["scrolling"] = 4] = "scrolling";
        ScrollViewEvent[ScrollViewEvent["ScrollEnded"] = 9] = "ScrollEnded";
      })(ScrollViewEvent || (ScrollViewEvent = {}));

      var RankView = exports('RankView', (_dec = ccclass('RankView'), _dec2 = property(ScrollView), _dec3 = property(UITransform), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RankView, _Component);

        function RankView() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "scroll", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "content", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "cellList", []);

          _defineProperty(_assertThisInitialized(_this), "items", []);

          _defineProperty(_assertThisInitialized(_this), "model", null);

          _defineProperty(_assertThisInitialized(_this), "offsetWidth", 190);

          return _this;
        }

        var _proto = RankView.prototype;

        _proto.onLoad = function onLoad() {
          for (var i = 0; i < GameDefine.RANKING_LIMIT; i++) {
            var nodeItem = instantiate(this.scroll.content.children[0]);
            nodeItem.active = true;
            this.items.push(nodeItem);
          }
        };

        _proto.loadModel = function loadModel(data) {
          if (this.model != data) {
            this.model = data;
            this.cellList = [];
            this.content.node.removeAllChildren();

            for (var i = 0, size = data.items.length; i < GameDefine.RANKING_LIMIT && i < size; i++) {
              var nodeItem = this.items[i];
              nodeItem.active = true;
              this.content.node.addChild(nodeItem);
              var item = nodeItem.getComponent(RankItem);
              this.cellList.push(item);
              item.loadView(data.items[i], Profile.Instance.isMine(data.items[i].userId));
            }

            this.scroll.content.getComponent(Layout).updateLayout();
            this.scroll.scrollToLeft(0);
            this.content.getComponent(Layout).enabled = false;

            if (this.cellList.length > 0) {
              this.offsetWidth = this.cellList[0].rect.width;
              this.onScroll(this.scroll, ScrollViewEvent.scrolling);
              this.onScroll(this.scroll, ScrollViewEvent.ScrollEnded);
            }
          }
        };

        _proto.onScroll = function onScroll(scrollView, event) {
          if (scrollView === void 0) {
            scrollView = null;
          }

          if (event === void 0) {
            event = null;
          }

          if (scrollView) {
            switch (event) {
              case ScrollViewEvent.ScrollEnded:
                this.onScrollEnded(scrollView);
                break;

              case ScrollViewEvent.scrolling:
                this.onScrolling(scrollView);
                break;
            }
          }
        };

        _proto.onScrolling = function onScrolling(scrollView) {
          var scrollViewWidth = scrollView.view.width;
          var itemWidth = this.offsetWidth + this.content.getComponent(Layout).spacingX;
          var maxX = Math.abs(scrollView.getScrollOffset().x);
          var topIndex = Math.max(0, Math.floor(maxX / itemWidth));
          var numberItemShow = Math.ceil(scrollViewWidth / itemWidth);
          this.content.node.children.forEach(function (element, index) {
            if (index < topIndex || index > topIndex + numberItemShow) {
              element.active = false;
            } else {
              element.active = true;
            }
          });
        };

        _proto.onScrollEnded = function onScrollEnded(scrollView) {
          var _this2 = this;

          this.content.node.children.forEach(function (element, index) {
            var cell = _this2.cellList[index];

            if (cell.node.active && cell.canLoadAvatar()) {
              _this2.cellList[index].LoadAvatar();
            } else {
              _this2.cellList[index].loadAvatarDefault();
            }
          });
        };

        _proto.Reset = function Reset() {//Utils.destroyAllChild(this.content.node)
        };

        return RankView;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scroll", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Utils.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _createClass, cclegacy, _decorator, ParticleSystem, Vec3, resources, Prefab, AudioClip;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ParticleSystem = module.ParticleSystem;
      Vec3 = module.Vec3;
      resources = module.resources;
      Prefab = module.Prefab;
      AudioClip = module.AudioClip;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "524f1gsDoNErLJFctS0Tj+M", "Utils", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Utils = exports('Utils', (_dec = ccclass('Utils'), _dec(_class = /*#__PURE__*/function () {
        function Utils() {}

        Utils.PlayParticle = function PlayParticle(paricle) {
          paricle.play();
          var a = paricle.getComponentsInChildren(ParticleSystem);
          a.forEach(function (element) {
            element.play();
          });
        };

        Utils.StopParticle = function StopParticle(paricle) {
          paricle.stop();
          var a = paricle.getComponentsInChildren(ParticleSystem);
          a.forEach(function (element) {
            element.stop();
          });
        };

        Utils.toLocalString = function toLocalString(num) {
          num = Math.round(num);
          return num.toLocaleString().replace(/","/g, ".");
        };

        Utils.formatScore = function formatScore(score) {
          return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        };

        Utils.cloneObject = function cloneObject(data) {
          var keys = Object.keys(data);
          var t = Object.create(null);

          for (var i = 0, size = keys.length; i < size; i++) {
            t[keys[i]] = data[keys[i]];
          }

          return t;
        };

        Utils.getScale = function getScale(targetSprite, size) {
          var rect = targetSprite.rect;
          var rateX = size.width / rect.width;
          var rateY = size.height / rect.height;
          var target = rateY;
          if (rateX > rateY) target = rateX;
          return target;
        };

        Utils.CorrectSpriteFrameSize = function CorrectSpriteFrameSize(sprite, size) {
          var scale = Utils.getScale(sprite.spriteFrame, size);
          sprite.node.setScale(new Vec3(scale, scale, scale));
        };

        Utils.getUrlVer = function getUrlVer(url) {
          // return url + "?v=" + Api.VERSION;
          return url;
        };

        Utils.getTime = function getTime(d) {
          var pad = function pad(s) {
            return s < 10 ? '0' + s : s;
          };

          return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
        };

        Utils.getDateTimeVN = function getDateTimeVN(d) {
          var pad = function pad(s) {
            return s < 10 ? '0' + s : s;
          };

          return "" + [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
        };

        Utils.destroyAllChild = function destroyAllChild(parent) {
          parent.children.forEach(function (child) {
            child.destroy();
          });
          parent.removeAllChildren();
        };

        Utils.getPrefabRes = function getPrefabRes(path, callback) {
          resources.load(path, Prefab, function (err, res) {
            if (err) {
              if (callback) {
                callback(null);
              }

              return;
            }

            if (callback) {
              callback(res);
            }
          });
        };

        Utils.getAudioRes = function getAudioRes(path, callback) {
          resources.load(path, AudioClip, function (err, res) {
            if (err) {
              if (callback) {
                callback(null);
              }

              return;
            }

            if (callback) {
              callback(res);
            }
          });
        };

        Utils.getPrefabBoundle = function getPrefabBoundle(boundle, path, callback) {
          boundle.load(path, Prefab, function (err, res) {
            if (err) {
              if (callback) {
                callback(null);
              }

              return;
            }

            if (callback) {
              callback(res);
            }
          });
        };

        Utils.getAudioBoundle = function getAudioBoundle(boundle, path, callback) {
          boundle.load(path, AudioClip, function (err, res) {
            if (err) {
              if (callback) {
                callback(null);
              }

              return;
            }

            if (callback) {
              callback(res);
            }
          });
        } //cheat to bypass circular dependencies
        ;

        Utils.setInfoMySprite = function setInfoMySprite(mySpriteNode, link) {
          var mySprite = mySpriteNode.getComponent('MySprite');

          if (mySprite) {
            mySprite.Fetch(link);
          }
        };

        Utils.truncate = function truncate(text, limitWord) {
          var words = text.split(" ");
          if (words.length > limitWord) return words.splice(0, limitWord).join(" ") + "...";
          return text;
        };

        _createClass(Utils, null, [{
          key: "uuid",
          get: function get() {
            var dt = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
              var r = (dt + Math.random() * 16) % 16 | 0;
              dt = Math.floor(dt / 16);
              return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
            });
            return uuid;
          }
        }]);

        return Utils;
      }()) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MyButton.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Vec3, Node, tween, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Node = module.Node;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "55121N6ZJ1F0rv/GR7dwuPA", "MyButton", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode;
      var MyButton = exports('MyButton', (_dec = ccclass('MyButton'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MyButton, _Component);

        function MyButton() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "isPlaySound", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "onClick", null);

          _defineProperty(_assertThisInitialized(_this), "isDone", true);

          _defineProperty(_assertThisInitialized(_this), "scale", Vec3.ZERO.clone());

          return _this;
        }

        var _proto = MyButton.prototype;

        _proto.start = function start() {
          this.scale = this.node.scale.clone();
          this.node.on(Node.EventType.TOUCH_START, this._onClick.bind(this));
        };

        _proto._onClick = function _onClick(event) {
          var _this2 = this;

          if (this.isDone) {
            this.isDone = false;
            var scale = this.scale;
            var taget = new Vec3();
            Vec3.multiplyScalar(taget, scale, 0.5);
            this.node.setScale(taget);
            tween(this.node).to(0.3, {
              scale: scale
            }, {
              easing: "elasticOut"
            }).call(function () {
              _this2.isDone = true;

              if (_this2.onClick) {
                _this2.onClick();
              }
            }).start();
            if (this.isPlaySound) ;
          } // event.propagationImmediateStopped = true;

        };

        return MyButton;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "isPlaySound", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FlyScoreMgr.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Utils.ts', './FlyScore.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Prefab, Camera, instantiate, Vec3, Component, Utils, FlyScore;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Camera = module.Camera;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      FlyScore = module.FlyScore;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

      cclegacy._RF.push({}, "554e4l3D6VFmqcpDfVMGOmE", "FlyScoreMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var FlyScoreMgr = exports('FlyScoreMgr', (_dec = ccclass('FlyScoreMgr'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(Camera), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FlyScoreMgr, _Component);

        function FlyScoreMgr() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "prefab", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "popupPrefab", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "camera", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = FlyScoreMgr.prototype;

        _proto.onLoad = function onLoad() {
          FlyScoreMgr.instance = this;
        };

        _proto.Reset = function Reset() {
          Utils.destroyAllChild(this.node);
        };

        _proto.Create = function Create(target, score) {
          var flyScore = instantiate(this.prefab);
          flyScore.setParent(this.node);
          flyScore.position = Vec3.ZERO;
          flyScore.getComponent(FlyScore).Show(target, score);
        };

        _proto.CreatePopup = function CreatePopup(target, score, text) {
          var flyScore = instantiate(this.popupPrefab);
          flyScore.setParent(this.node);
          flyScore.position = Vec3.ZERO;
          flyScore.getComponent(FlyScore).Show(target, score, text);
        };

        _proto.worldToScreenPoint = function worldToScreenPoint(wpos) {
          return this.camera.convertToUINode(wpos, this.node);
        };

        _createClass(FlyScoreMgr, null, [{
          key: "Instance",
          get: function get() {
            return FlyScoreMgr.instance;
          }
        }]);

        return FlyScoreMgr;
      }(Component), _defineProperty(_class3, "instance", null), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "popupPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ErrorPopup.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Popup.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, tween, Vec3, UIOpacity, Popup;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      tween = module.tween;
      Vec3 = module.Vec3;
      UIOpacity = module.UIOpacity;
    }, function (module) {
      Popup = module.Popup;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "5748dGji7tEi6wIUYgewIpZ", "ErrorPopup", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ErrorPopup = exports('ErrorPopup', (_dec = ccclass('ErrorPopup'), _dec2 = property(Label), _dec3 = property(Label), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Popup) {
        _inheritsLoose(ErrorPopup, _Popup);

        function ErrorPopup() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Popup.call.apply(_Popup, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "title", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "content", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ErrorPopup.prototype;

        _proto.start = function start() {};

        _proto.SetInfo = function SetInfo(title, content, onCloseCallback) {
          if (this.title !== null && title.length > 0) {
            this.title.string = title;
          }

          if (this.content !== null && content.length > 0) {
            this.content.string = content;
          }

          this.onClose = onCloseCallback;
        };

        _proto.Show = function Show(autoHide) {
          this.node.active = true;
          tween(this.container).to(0.2, {
            scale: new Vec3(1.1, 1.1, 1)
          }).to(0.2, {
            scale: new Vec3(1, 1, 1)
          }).start();
        };

        _proto.Hide = function Hide() {
          var _this2 = this;

          var scaleUp = tween(this.node).to(0.2, {
            scale: new Vec3(1.2, 1.2, 1)
          });
          var fadeOut = tween(this.node.getComponent(UIOpacity)).to(0.2, {
            opacity: 0
          });
          tween(this.node).call(function () {
            scaleUp.start();
            fadeOut.start();
          }).delay(0.2).call(function () {
            if (_this2.onClose !== null) {
              _this2.onClose();
            }

            _this2.node.removeFromParent();
          }).start();
        };

        return ErrorPopup;
      }(Popup), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScreenMgr.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Utils.ts', './GameDefine.ts', './Screen.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, resources, instantiate, Component, Utils, ScreenName, Screen;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      resources = module.resources;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      ScreenName = module.ScreenName;
    }, function (module) {
      Screen = module.Screen;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3, _temp;

      cclegacy._RF.push({}, "613e4KXbZpIVYqI2TneTBBG", "ScreenMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ScreenMgr = exports('ScreenMgr', (_dec = ccclass('ScreenMgr'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ScreenMgr, _Component);

        function ScreenMgr() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "Container", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "scenes", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ScreenMgr.prototype;

        _proto.onLoad = function onLoad() {
          ScreenMgr.instance = this;
        };

        _proto.start = function start() {
          this.HideAll();
          this.Show(ScreenName.InGame);
        };

        _proto.IsShow = function IsShow(name) {
          var scene = this.scenes.find(function (scene) {
            return scene.name == name;
          });
          return scene && scene.active;
        };

        _proto.IsLoaded = function IsLoaded(name) {
          var scene = this.scenes.find(function (scene) {
            return scene.name == name;
          });
          return scene;
        };

        _proto.Show = function Show(name) {
          var scene = this.scenes.find(function (scene) {
            return scene.name == name;
          });

          if (scene && !scene.active) {
            scene.getComponent(Screen).Show();
          }

          return scene;
        };

        _proto.Hide = function Hide(name) {
          var scene = this.scenes.find(function (scene) {
            return scene.name == name;
          });

          if (scene) {
            scene.getComponent(Screen).Hide();
          }
        };

        _proto.HideAll = function HideAll() {
          this.scenes.forEach(function (scene) {
            if (scene.active) {
              scene.getComponent(Screen).Hide();
            }
          });
        };

        _proto.GetAndShow = function GetAndShow(name) {
          var scene = this.scenes.find(function (scene) {
            return scene.name == name;
          });

          if (scene && !scene.active) {
            scene.getComponent(Screen).Show();
          }

          return scene;
        } // public SetRefID(refId: string) {
        //     console.log("ScreenMgr CallRefID :" + refId);
        //     switch (refId) {
        //         case "milestone":
        //             ScreenMgr.Instance.Show(ScreenName.Progress);
        //             break;
        //         case "screen_luckywheel":
        //             // ScreenMgr.Instance.HideAll();
        //             // ScreenMgr.Instance.Show(ScreenName.InGame);
        //             //HomeMenu.Instance.OnPlayClick();
        //             break;
        //     }
        // }
        ;

        _proto.MoveTo = function MoveTo(from, to) {// ScreenMgr.Instance.Hide(from);
          // ScreenMgr.Instance.Show(to);
          // HomeMenu.Instance.ForceShow(to);
        };

        _proto.getScreenValidate = function getScreenValidate(name) {
          var screen = this.scenes.find(function (scene) {
            return scene.name.toLocaleLowerCase() == name.toLocaleLowerCase();
          });

          if (screen) {
            return screen.name;
          }

          return '';
        };

        _proto.IsContain = function IsContain(name) {
          var result = false;
          this.scenes.forEach(function (scene) {
            if (scene.name == name) {
              result = true;
              return;
            }
          });
          return result;
        };

        _proto.Load = function Load() {
          var _this2 = this;

          var array = Object.keys(ScreenName);
          array.forEach(function (element) {
            if (!_this2.IsContain(element)) {
              resources.load("prefabs/screens/" + element, function (err, prefab) {
                if (prefab) {
                  var screen = instantiate(prefab);
                  screen.active = false;
                  screen.name = element;
                  screen.setParent(_this2.Container);

                  _this2.scenes.push(screen);

                  console.log("Screen loaded: " + element);
                } else {
                  console.error("Screen prefab notfound: " + element);
                }
              }); // Utils.getPrefabBoundle(boundle, "prefabs/screens/" + element, prefab => {
              //     if (prefab) {
              //         let screen = instantiate(prefab);
              //         screen.active = false;
              //         screen.name = element;
              //         screen.setParent(this.Container);
              //         this.scenes.push(screen);
              //         console.log("Screen loaded: " + element);
              //     }
              //     else {
              //         console.error("Screen prefab notfound: " + element);
              //     }
              // });
            }
          });
        };

        _proto.hideAndDestroy = function hideAndDestroy(name) {
          for (var i = this.scenes.length - 1; i >= 0; i--) {
            var scene = this.scenes[i];

            if (scene.name === name) {
              scene.getComponent(Screen).Hide();
              Utils.destroyAllChild(scene);
              this.scenes.splice(i, 1);
              break;
            }
          }
        };

        _createClass(ScreenMgr, null, [{
          key: "Instance",
          get: function get() {
            return this.instance;
          }
        }]);

        return ScreenMgr;
      }(Component), _defineProperty(_class3, "instance", null), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Container", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scenes", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BannerBox.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts', './Popup.ts', './PopupMgr.ts', './MaxApiUtils.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Label, Button, PopupName, Popup, PopupMgr, MaxApiUtils;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Button = module.Button;
    }, function (module) {
      PopupName = module.PopupName;
    }, function (module) {
      Popup = module.Popup;
    }, function (module) {
      PopupMgr = module.PopupMgr;
    }, function (module) {
      MaxApiUtils = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "6377650dNJEsrwX1MW1hxkO", "BannerBox", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MsgBoxType;

      (function (MsgBoxType) {
        MsgBoxType[MsgBoxType["OK"] = 0] = "OK";
        MsgBoxType[MsgBoxType["YesNo"] = 1] = "YesNo";
      })(MsgBoxType || (MsgBoxType = {}));

      var BannerBox = exports('BannerBox', (_dec = ccclass('BannerBox'), _dec2 = property(Label), _dec3 = property(Button), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Popup) {
        _inheritsLoose(BannerBox, _Popup);

        function BannerBox() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Popup.call.apply(_Popup, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "lbBtnOk", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "btOk", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "okCallback", null);

          return _this;
        }

        var _proto = BannerBox.prototype;

        _proto.start = function start() {
          _Popup.prototype.start.call(this);

          this.btOk.node.on("click", this.OnOkClick.bind(this));
        };

        _proto.OnOkClick = function OnOkClick() {
          if (this.okCallback) {
            this.okCallback();
          }

          this.Hide();
          MaxApiUtils.trackEvent({
            action: 'game_banner_detail'
          });
        };

        _proto.SetTypeOk = function SetTypeOk(callback) {
          this.okCallback = callback;
          this.SetType(MsgBoxType.OK);
        };

        _proto.SetType = function SetType(type) {
          this.lbBtnOk.node.parent.active = false;

          switch (type) {
            case MsgBoxType.OK:
            default:
              this.lbBtnOk.node.parent.active = true;
              break;
          }
        };

        BannerBox.Show = function Show() {
          if (PopupMgr.Instance) {
            var msgBox = PopupMgr.Instance.Show(PopupName.MessageBox);
            msgBox.SetTypeOk(function () {});
            return msgBox;
          }
        };

        return BannerBox;
      }(Popup), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbBtnOk", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btOk", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Api.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6478a4A+/ZPo5+fjQN0Ek1S", "Api", undefined);

      var Api = exports('Api', /*#__PURE__*/function () {
        function Api() {} //onboarding


        Api.LBWeekly = function LBWeekly(limit) {
          return Api.GLOBAL_RANKING + "&frequency=NORMAL&limit=" + limit;
        };

        Api.LBAll = function LBAll(limit) {
          return Api.GLOBAL_RANKING + "&frequency=NORMAL&limit=" + limit; //return `${Api.GLOBAL_RANKING}&frequency=MONTH&limit=${limit}`;
        };

        Api.LBFriendWeekly = function LBFriendWeekly(limit) {
          return Api.FRIEND_RANKING + "&frequency=NORMAL&limit=" + limit;
        };

        Api.LBFriendAll = function LBFriendAll(limit) {
          return Api.FRIEND_RANKING + "&frequency=MONTH&limit=" + limit;
        };

        Api.GoldHourRank = function GoldHourRank(limit) {
          return Api.GLOBAL_GOLDHOUR_RANKING + "&frequency=WEEKLY&limit=" + limit;
        };

        return Api;
      }());

      _defineProperty(Api, "DEBUG_TOKEN", "0938314514");

      _defineProperty(Api, "IS_DEV", !false);

      _defineProperty(Api, "VERSION", "0.3.5");

      _defineProperty(Api, "DEV_HOST", "https://m.dev.mservice.io/");

      _defineProperty(Api, "PROD_HOST", "https://m.mservice.io/");

      _defineProperty(Api, "HOST", Api.IS_DEV ? Api.DEV_HOST : Api.PROD_HOST);

      _defineProperty(Api, "GAME", "pigjump");

      _defineProperty(Api, "GAME_ID", "vn_momo_web_momojump_game");

      _defineProperty(Api, "SERVICE_NAME", "pigjump");

      _defineProperty(Api, "APPVARZ_V2", "varz/v2/observe");

      _defineProperty(Api, "GameConfig", "pigjump-config/v1/get_config");

      _defineProperty(Api, "GameTurn", "pigjump-game-logic/v1/turn");

      _defineProperty(Api, "AddTurn", "pigjump-game-logic/v1/add_turn");

      _defineProperty(Api, "SubmitScore", "gamecore-ranking/v1/update-result");

      _defineProperty(Api, "StartGame", "pigjump-game-logic/v1/start");

      _defineProperty(Api, "GameGift", "pigjump-score/v1/get_gift?gameId=");

      _defineProperty(Api, "Mission", "gnosis-mission-service/v1/status?game_id=pigjump");

      _defineProperty(Api, "Progress", "pigjump-reward-progress/v1/get");

      _defineProperty(Api, "Progress_Claim", "pigjump-reward-progress/v1/claim");

      _defineProperty(Api, "MissionCompleted", "gnosis-mission-service/v1/send-succeeded-event");

      _defineProperty(Api, "GiftHistory", "pigjump-score/v1/get_gift_history");

      _defineProperty(Api, "Avatar", "https://s3-ap-southeast-1.amazonaws.com/avatars.mservice.io/{0}.png");

      _defineProperty(Api, "DEEP_LINK", "deeplink-universal/v1/content-dynamic");

      _defineProperty(Api, "OnboardingStatus", 'pigjump-game-logic/v1/onboarding/status');

      _defineProperty(Api, "OnboardingSubmit", 'pigjump-game-logic/v1/onboarding/submit');

      _defineProperty(Api, "OnboardingReset", 'https://s.dev.mservice.io/internal/pigjump-game-logic/v1/onboarding/reset');

      _defineProperty(Api, "FRIEND_RANKING", Api.HOST + "medalwall/v1/ranking/friends?medal_types=momojump_point");

      _defineProperty(Api, "GLOBAL_RANKING", Api.HOST + "medalwall/v1/ranking/global?medal_types=momojump_point");

      _defineProperty(Api, "GLOBAL_GOLDHOUR_RANKING", Api.HOST + "medalwall/v1/ranking/global?medal_types=momojumpgoldenhour_point");

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UserInfo.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Api.ts', './NetworkMgr.ts', './Profile.ts', './Popup.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Button, EditBox, Sprite, Api, NetworkMgr, Profile, Popup;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      EditBox = module.EditBox;
      Sprite = module.Sprite;
    }, function (module) {
      Api = module.Api;
    }, function (module) {
      NetworkMgr = module.NetworkMgr;
    }, function (module) {
      Profile = module.Profile;
    }, function (module) {
      Popup = module.Popup;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

      cclegacy._RF.push({}, "66a0aWHop5Ocry3YBf1MDYh", "UserInfo", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var UserInfo = exports('UserInfo', (_dec = ccclass('UserInfo'), _dec2 = property(Button), _dec3 = property(EditBox), _dec4 = property(EditBox), _dec5 = property(EditBox), _dec6 = property(EditBox), _dec7 = property(EditBox), _dec8 = property(EditBox), _dec9 = property(EditBox), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Popup) {
        _inheritsLoose(UserInfo, _Popup);

        function UserInfo() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Popup.call.apply(_Popup, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "btnOk", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "displayName", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "phoneNumber", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "email", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "school", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "major", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "schoolYear", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "graduationYear", _descriptor8, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "data", []);

          return _this;
        }

        var _proto = UserInfo.prototype;

        _proto.start = function start() {
          _Popup.prototype.start.call(this);

          this.btnOk.node.on("click", this.OnOkClick, this);
        };

        _proto.Show = function Show() {
          _Popup.prototype.Show.call(this);

          this.activeButton(false);
          Profile.Instance.data["displayName"] = "";
          Profile.Instance.data["phoneNumber"] = "";
        };

        _proto.OnOkClick = function OnOkClick() {
          this.submitInfo(function () {});
          this.OnCloseClick();
        };

        _proto.OnCloseClick = function OnCloseClick() {
          _Popup.prototype.OnCloseClick.call(this);
        };

        _proto.activeButton = function activeButton(value) {
          this.btnOk.interactable = value;
          this.btnOk.getComponent(Sprite).grayscale = !value;
        };

        _proto.onTextChange = function onTextChange(text, editbox, customEventData) {
          if (customEventData && customEventData != "") {
            Profile.Instance.data[customEventData] = text;
            this.activeButton(this.checkDataInputOk());
          }
        };

        _proto.checkDataInputOk = function checkDataInputOk() {
          return Profile.Instance.data["displayName"].length >= 5 && Profile.Instance.data["phoneNumber"].length >= 10; // Profile.Instance.data["school"].length >= 3 &&
          // Profile.Instance.data["major"].length >= 2 &&
          // Profile.Instance.data["schoolYear"].length >= 4 &&
          // Profile.Instance.data["graduationYear"].length >= 4 &&
          // this.validateEmail(Profile.Instance.data["email"]);
        };

        _proto.validateEmail = function validateEmail(input) {
          var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          return validRegex.test(input);
        };

        _proto.submitInfo = function submitInfo(callback) {
          Profile.Instance.UserID = Profile.Instance.UserToken = Profile.Instance.data["phoneNumber"];
          var data = {
            phoneNumber: Profile.Instance.data["phoneNumber"],
            displayName: Profile.Instance.data["displayName"] // email: Profile.Instance.data["email"],
            // school: Profile.Instance.data["school"],
            // major: Profile.Instance.data["major"],
            // schoolYear: parseInt(Profile.Instance.data["schoolYear"]),
            // graduationYear: parseInt(Profile.Instance.data["graduationYear"])

          };
          NetworkMgr.postRequest(Api.HOST + "gamecore-ranking/v1/submit-info", data, function (res) {
            callback(res);
          });
        };

        return UserInfo;
      }(Popup), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnOk", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "displayName", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "phoneNumber", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "email", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "school", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "major", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "schoolYear", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "graduationYear", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AssetMgr.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './AudioMgr.ts', './PopupMgr.ts', './ScreenMgr.ts'], function (exports) {
  'use strict';

  var _defineProperty, _inheritsLoose, _createClass, cclegacy, _decorator, resources, instantiate, Component, AudioMgr, PopupMgr, ScreenMgr;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      resources = module.resources;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      PopupMgr = module.PopupMgr;
    }, function (module) {
      ScreenMgr = module.ScreenMgr;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "67aa1RXrxpDSpvvCVnAeht+", "AssetMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AssetMgr = exports('AssetMgr', (_dec = ccclass('AssetMgr'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AssetMgr, _Component);

        function AssetMgr() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = AssetMgr.prototype;

        _proto.onLoad = function onLoad() {
          AssetMgr.instance = this;
        };

        _proto.start = function start() {};

        _proto.LoadUI = function LoadUI() {
          // assetManager.loadBundle('ui', (err, bundle) => {
          PopupMgr.Instance.Load();
          ScreenMgr.Instance.Load();
          this.LoadSound(); // });
        };

        _proto.LoadGame = function LoadGame() {
          var _this = this;

          resources.load('prefabs/Game', function (err, prefab) {
            if (prefab) {
              var game = instantiate(prefab);
              game.setParent(_this.node);
            } else {
              console.error("Popup loade game fail");
            }
          });
        };

        _proto.LoadSound = function LoadSound() {
          // assetManager.loadBundle('sound', (err, boundle) => {
          AudioMgr.Instance.Load(); // });
        };

        _createClass(AssetMgr, null, [{
          key: "Instance",
          get: function get() {
            return AssetMgr.instance;
          }
        }]);

        return AssetMgr;
      }(Component), _defineProperty(_class2, "instance", null), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MiniProgress.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Node, Component, ProgressGiftStatus;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      ProgressGiftStatus = module.ProgressGiftStatus;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "6af89ByZwtGB6myBpb1Jd4a", "MiniProgress", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MiniProgress = exports('MiniProgress', (_dec = ccclass('MiniProgress'), _dec2 = property(Label), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MiniProgress, _Component);

        function MiniProgress() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "labelScore", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "info", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "giftClaim", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MiniProgress.prototype;

        _proto.setInfo = function setInfo(data) {
          var _this2 = this;

          var currentPoint = data.currentPoint;
          var listMilestone = data.milestones;
          this.labelScore.string = '0';
          var isSetScore = false;
          this.info.active = true;
          this.giftClaim.active = false;
          listMilestone.forEach(function (element) {
            if (currentPoint < element.targetPoint && isSetScore == false) {
              _this2.labelScore.string = (element.targetPoint - currentPoint).toString();
              isSetScore = true;
            }

            if (element.status == ProgressGiftStatus.AVAILABLE) {
              _this2.info.active = false;
              _this2.giftClaim.active = true;
            }
          });
        };

        return MiniProgress;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelScore", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "info", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "giftClaim", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GiftScore.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './FlyScoreMgr.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Node, Label, isValid, tween, Vec3, Component, FlyScoreMgr;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      isValid = module.isValid;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      FlyScoreMgr = module.FlyScoreMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "6bf0c0uBrFGC7sB1o83uNEJ", "GiftScore", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var State;

      (function (State) {
        State[State["None"] = 0] = "None";
        State[State["Idle"] = 1] = "Idle";
        State[State["Show"] = 2] = "Show";
        State[State["Fly"] = 3] = "Fly";
        State[State["Destroy"] = 4] = "Destroy";
      })(State || (State = {}));

      var GiftScore = exports('GiftScore', (_dec = ccclass('GiftScore'), _dec2 = property(Node), _dec3 = property(Label), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GiftScore, _Component);

        function GiftScore() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "container", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "scoreText", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "target", null);

          _defineProperty(_assertThisInitialized(_this), "state", State.None);

          return _this;
        }

        var _proto = GiftScore.prototype;

        _proto.start = function start() {
          this.SetState(State.None);
        } // Update is called once per frame
        ;

        _proto.update = function update(dt) {
          if (isValid(this.target)) {
            this.node.position = this.GetPos(this.target);
          }
        };

        _proto.SetState = function SetState(state) {
          var _this2 = this;

          console.log("" + State[state]);
          this.state = state;

          switch (state) {
            case State.None:
              this.node.active = false;
              break;

            case State.Idle:
              break;

            case State.Show:
              this.node.active = true;
              this.container.scale = Vec3.ZERO;
              tween(this.container).to(0.5, {
                scale: Vec3.ONE
              }, {
                easing: "elasticOut"
              }).call(function () {
                _this2.SetState(State.Idle);
              }).start();
              break;

            case State.Fly:
              var position = this.container.position.clone().add3f(0, 100, 0);
              tween(this.container).to(1, {
                position: position
              }, {
                easing: "elasticOut"
              }).call(function () {
                _this2.SetState(State.Destroy);
              }).start();
              break;

            case State.Destroy:
              this.node.destroy();
              break;
          }
        };

        _proto.Init = function Init(target, score) {
          this.target = target;
          this.node.position = this.GetPos(target);
          this.scoreText.string = "+" + score;
        };

        _proto.Show = function Show() {
          this.SetState(State.Show);
        };

        _proto.Active = function Active() {
          this.SetState(State.Destroy);
        };

        _proto.Hide = function Hide() {
          this.node.destroy();
        };

        _proto.GetPos = function GetPos(target) {
          return FlyScoreMgr.Instance.worldToScreenPoint(target.worldPosition);
        };

        return GiftScore;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "container", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scoreText", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameMgr.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts', './Profile.ts', './Gameconfig.ts', './FlyScoreMgr.ts', './AudioMgr.ts', './ItemMgr.ts', './BoxMgr.ts', './PopupMgr.ts', './ScreenMgr.ts', './AssetMgr.ts', './MaxApiUtils.ts', './CameraCtrl.ts', './Input.ts', './Player.ts', './ScoreEffect.ts', './InGame.ts'], function (exports) {
  'use strict';

  var _defineProperty, _inheritsLoose, _assertThisInitialized, _createClass, cclegacy, _decorator, PhysicsSystem, Vec3, math, Component, ScreenName, PopupName, SoundName, Direction, Profile, Gameconfig, FlyScoreMgr, AudioMgr, ItemMgr, BoxMgr, PopupMgr, ScreenMgr, AssetMgr, MaxApiUtils, CameraCtrl, Input, Player, ScoreEffect, InGame;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      PhysicsSystem = module.PhysicsSystem;
      Vec3 = module.Vec3;
      math = module.math;
      Component = module.Component;
    }, function (module) {
      ScreenName = module.ScreenName;
      PopupName = module.PopupName;
      SoundName = module.SoundName;
      Direction = module.Direction;
    }, function (module) {
      Profile = module.Profile;
    }, function (module) {
      Gameconfig = module.Gameconfig;
    }, function (module) {
      FlyScoreMgr = module.FlyScoreMgr;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      ItemMgr = module.ItemMgr;
    }, function (module) {
      BoxMgr = module.BoxMgr;
    }, function (module) {
      PopupMgr = module.PopupMgr;
    }, function (module) {
      ScreenMgr = module.ScreenMgr;
    }, function (module) {
      AssetMgr = module.AssetMgr;
    }, function (module) {
      MaxApiUtils = module.default;
    }, function (module) {
      CameraCtrl = module.CameraCtrl;
    }, function (module) {
      Input = module.Input;
    }, function (module) {
      Player = module.Player;
    }, function (module) {
      ScoreEffect = module.ScoreEffect;
    }, function (module) {
      InGame = module.InGame;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "6d146Tt/kZC6KzQpSN9ul80", "GameMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var State;

      (function (State) {
        State[State["None"] = 0] = "None";
        State[State["Load"] = 1] = "Load";
        State[State["Init"] = 2] = "Init";
        State[State["CheckToken"] = 3] = "CheckToken";
        State[State["OutOffTurn"] = 4] = "OutOffTurn";
        State[State["UserInfo"] = 5] = "UserInfo";
        State[State["Spawn"] = 6] = "Spawn";
        State[State["Tutorial"] = 7] = "Tutorial";
        State[State["Playing"] = 8] = "Playing";
        State[State["StartGame"] = 9] = "StartGame";
        State[State["EndGame"] = 10] = "EndGame";
        State[State["NetworkError"] = 11] = "NetworkError";
      })(State || (State = {}));

      var GameMgr = exports('GameMgr', (_dec = ccclass('GameMgr'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameMgr, _Component);

        function GameMgr() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "state", State.None);

          _defineProperty(_assertThisInitialized(_this), "prevState", void 0);

          _defineProperty(_assertThisInitialized(_this), "comboPCounter", 0);

          _defineProperty(_assertThisInitialized(_this), "comboGCounter", 0);

          _defineProperty(_assertThisInitialized(_this), "firstStart", true);

          _defineProperty(_assertThisInitialized(_this), "isPause", false);

          _defineProperty(_assertThisInitialized(_this), "isCapture", false);

          _defineProperty(_assertThisInitialized(_this), "captureCallBack", null);

          _defineProperty(_assertThisInitialized(_this), "time", 0);

          _defineProperty(_assertThisInitialized(_this), "isCheckForceScreen", false);

          _defineProperty(_assertThisInitialized(_this), "startTime", Date.now());

          _defineProperty(_assertThisInitialized(_this), "isOpenFromInGame", false);

          return _this;
        }

        var _proto = GameMgr.prototype;

        _proto.onLoad = function onLoad() {// AssetMgr.Instance.LoadGame();
        };

        _proto.start = function start() {
          // view.enableRetina(false);
          // PhysicsSystem.instance.autoSimulation = false;
          if (window.OnHideLoading) {
            window.OnHideLoading(); // MaxApiUtils.trackEvent({ stage: 'game_loading', load_time: Date.now() - window.realtimeSinceStartup });
            // MaxApiUtils.trackEvent({ stage: 'home_show' })

            this.startTime = Date.now();
          } // director.on(Director.EVENT_AFTER_DRAW, this.canvasAfterDraw.bind(this));


          GameMgr.instance = this; // MaxApiUtils.registerScreenShot(() => {
          //     console.log('callback screenshot listener')
          // });

          this.SetState(State.Load);
        } // Update is called once per frame
        ;

        _proto.update = function update(dt) {
          // PhysicsSystem.instance.update(dt);
          PhysicsSystem.instance.fixedTimeStep = dt;

          switch (this.state) {
            case State.Load:
              if (BoxMgr.Instance && Player.Instance) {
                ScreenMgr.Instance.Hide(ScreenName.Loading);
                this.Retry();
              }

              break;

            case State.Init:
              break;

            case State.CheckToken:
              this.time += dt;

              if (Profile.Instance.iSOk) {
                this.SetState(State.UserInfo);
              } else Profile.Instance.OnUpdateUserInfo(null);

              break;

            case State.OutOffTurn:
              if (!this.IsPause && Input.IsTouchDown) {
                this.SetState(State.OutOffTurn);
              }

              break;

            case State.Spawn:
              if (!Player.Instance.IsReadyToPlay) break;
              this.SetState(State.StartGame); // if (OnboardingMgr.Instance.isComplete() == false) {
              //     this.SetState(State.Tutorial);
              // } else {
              //     this.SetState(State.StartGame);
              // }

              break;

            case State.Tutorial:
            case State.StartGame:
              if (!this.IsPause && Input.IsTouchDown) {
                this.SetState(State.Playing);
                this.CallStartGame();
                MaxApiUtils.trackEvent({
                  action: "home_start",
                  remain_turn: Profile.Instance.Turn
                });
              }

              break;

            case State.Playing:
              // this.time -= dt;
              // if (this.time <= 0) {
              //     this.time = 0;
              //     this.GameOver();
              // }
              // InGame.Instance.updateTime(this.time);
              break;

            case State.EndGame:
              break;
          }
        };

        _proto.AddScore = function AddScore(score, level) {
          var step = BoxMgr.Instance.count - 1;
          var bonus = Gameconfig.Instance.CheckBonus(step);
          var comboBonus = Gameconfig.Instance.CheckComboBonus(level > 0 ? 0 : this.comboPCounter);
          Profile.Instance.Score += bonus + comboBonus;
          Profile.Instance.AddScore(step, score, BoxMgr.Instance.HasGift(step));
          InGame.Instance.updateScore(score + bonus + comboBonus);
          FlyScoreMgr.Instance.Create(BoxMgr.Instance.nextBoxCtrl.ItemPos, "+" + (score + comboBonus));

          if (bonus > 0) {
            setTimeout(function () {
              FlyScoreMgr.Instance.Create(BoxMgr.Instance.currentBoxCtrl.ItemPos, "+" + bonus); // InGame.Instance.updateScore(bonus);
            }, 500);
          }

          if (level == 0) {
            this.comboPCounter++;
            this.comboGCounter = 0;
            this.Perfect();
          } else if (level == 1) {
            this.comboGCounter++;
            this.comboPCounter = 0;
            this.Good();
          } else {
            this.Cool();
            this.comboGCounter = 0;
            this.comboPCounter = 0;
          }
        };

        _proto.ShowBonus = function ShowBonus(str) {
          if (this.state == State.Playing) {
            InGame.Instance.updateScore(0);
            FlyScoreMgr.Instance.Create(BoxMgr.Instance.currentBoxCtrl.ItemPos, str);
          }
        };

        _proto.ShowGift = function ShowGift(gift) {
          if (this.state == State.Playing) {
            FlyScoreMgr.Instance.CreatePopup(BoxMgr.Instance.currentBoxCtrl.ItemPos, "", gift);
          }
        };

        _proto.SetState = function SetState(state) {
          var _this2 = this;

          this.prevState = this.state;
          this.state = state;
          console.log("[GameMgr] stage " + State[this.prevState] + "  " + State[this.state]);

          switch (state) {
            case State.Load:
              ScreenMgr.Instance.Show(ScreenName.Loading);
              AssetMgr.Instance.LoadGame();
              AssetMgr.Instance.LoadUI();
              break;

            case State.Init:
              ScreenMgr.Instance.Show(ScreenName.InGame);
              this.Resume();
              Profile.Instance.Reset();
              InGame.Instance.Reset();
              BoxMgr.Instance.Reset();
              ItemMgr.Instance.Reset(); // ObstacleMgr.Instance.Reset();

              Player.Instance.Retry();
              CameraCtrl.Instance.Reset();
              FlyScoreMgr.Instance.Reset(); // InGame.Instance.ShowButton();

              this.SetState(State.CheckToken);
              AudioMgr.Instance.PlayMusicWithName(SoundName.BackgroundMusic, true);
              break;

            case State.CheckToken:
              this.time = 0;
              break;

            case State.UserInfo:
              // PopupMgr.Instance.Show(PopupName.UserInfo, () => {
              //     this.SetState(State.Spawn);
              // });
              this.SetState(State.Spawn);
              break;

            case State.OutOffTurn:
              this.isPause = true;
              PopupMgr.Instance.Show(PopupName.OutOfTurn);
              break;

            case State.Spawn:
              Profile.Instance.FetchGameTurn(function () {});
              break;

            case State.StartGame:
              this.time = 60;
              InGame.Instance.updateTime(this.time);
              Player.Instance.Playing();
              break;

            case State.Tutorial:
              Player.Instance.Playing(); // TutorialMgr.Instance.Show();

              break;

            case State.Playing:
              InGame.Instance.setVisible(false);
              InGame.Instance.turnOffHandTutorial();
              break;

            case State.EndGame:
              ScreenMgr.Instance.HideAll();
              ScreenMgr.Instance.Show(ScreenName.EndGame);
              this.Pause();
              ItemMgr.Instance.Reset();
              InGame.Instance.setVisible(true);
              AudioMgr.Instance.Stop();
              AudioMgr.Instance.PlaySfx(SoundName.Gameover); // MaxApiUtils.trackEvent({ stage: "game_end", end_score: Profile.Instance.Score, end_stand_amount: BoxMgr.Instance.count });
              // MaxApiUtils.trackEvent({ stage: "game_result" });

              break;

            case State.NetworkError:
              PopupMgr.Instance.Show(PopupName.NetworkError, function () {
                _this2.RetryNetwork();
              });
              break;
          }
        };

        _proto.CallStartGame = function CallStartGame() {
          var _this3 = this;

          Profile.Instance.FetchGameID(function (result) {
            if (!result) {
              _this3.SetState(State.NetworkError);
            }
          });
        };

        _proto.OnLanding = function OnLanding() {
          BoxMgr.Instance.OnLanding();
          this.SpwanNextPlatform();
        };

        _proto.SpwanNextPlatform = function SpwanNextPlatform() {
          BoxMgr.Instance.Spwan();

          if (BoxMgr.Instance.direction == Direction.Left) {
            var pos = Player.Instance.Position.clone();
            pos.y = 0;
            var distance = Vec3.distance(pos, BoxMgr.Instance.position) / 2;
            CameraCtrl.Instance.MoveTo(new Vec3(distance, 0, 0).add(Player.Instance.Position));
          } else {
            CameraCtrl.Instance.MoveTo(Player.Instance.Position);
          }
        };

        _proto.GameOver = function GameOver() {
          //this.node.active = true;
          this.SetState(State.EndGame);
        };

        _proto.Retry = function Retry() {
          this.node.active = true;
          this.SetState(State.Init);
        };

        _proto.Pause = function Pause() {
          this.isPause = true;
          this.node.active = false;
        };

        _proto.Resume = function Resume() {
          this.isPause = false;
          this.node.active = true;
        };

        _proto.RetryNetwork = function RetryNetwork() {
          this.SetState(this.prevState);
        };

        _proto.Cool = function Cool() {
          ScoreEffect.Instance.Cool();
        };

        _proto.Good = function Good() {
          ScoreEffect.Instance.Good();
        };

        _proto.Perfect = function Perfect() {
          ScoreEffect.Instance.Perfect();
        };

        _proto.PickupItem = function PickupItem(item) {
          Profile.Instance.PickItemOnStep(item.StepSpawn);
        };

        _proto.OnNetworkError = function OnNetworkError() {
          this.SetState(State.NetworkError);
        };

        _proto.CheckAndShowOutOffTurn = function CheckAndShowOutOffTurn() {
          if (Profile.Instance.Turn <= 0) {
            this.isPause = true;
            PopupMgr.Instance.Show(PopupName.OutOfTurn);
          } else {
            this.Resume();
          }
        } // private canvasAfterDraw() {
        //     if (this.isCapture) {
        //         this.isCapture = false;
        //         let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
        //         var resizedCanvas = document.createElement("canvas");
        //         var resizedContext = resizedCanvas.getContext("2d");
        //         let w = view.getVisibleSize().width;
        //         let h = view.getVisibleSize().height;
        //         resizedCanvas.width = w;
        //         resizedCanvas.height = h;
        //         resizedContext.drawImage(canvas, 0, 0, w, h, 0, 0, w, h);
        //         let c = TrimBase64.trimCanvas(resizedCanvas);
        //         let image = c.toDataURL('image/png');
        //         this.captureCallBack(image);
        //     }
        // }
        // public captureScreen(callback: Function) {
        //     this.captureCallBack = callback;
        //     this.isCapture = true;
        // }
        //lcheat
        ;

        _proto.cheatEndGame = function cheatEndGame() {
          this.SetState(State.EndGame);
        };

        _proto.closeGame = function closeGame() {
          MaxApiUtils.closeGame();
          MaxApiUtils.trackEvent({
            action: "home_tap_back",
            session_time: Date.now() - this.startTime
          });
        };

        _createClass(GameMgr, [{
          key: "ComboGCounter",
          get: function get() {
            return this.comboGCounter;
          }
        }, {
          key: "CombPCounter",
          get: function get() {
            return this.comboPCounter;
          }
        }, {
          key: "IsTutorial",
          get: function get() {
            return this.state == State.Tutorial;
          }
        }, {
          key: "IsPause",
          get: function get() {
            return this.isPause;
          }
        }, {
          key: "IsPlaying",
          get: function get() {
            return this.state == State.Playing;
          }
        }, {
          key: "PowerSpeed",
          get: function get() {
            var power = Gameconfig.Instance.Power;
            var value = power[0] + BoxMgr.Instance.count * 0.05;
            value = math.clamp(value, power[0], power[1]);
            return value;
          }
        }], [{
          key: "Instance",
          get: function get() {
            return GameMgr.instance;
          }
        }]);

        return GameMgr;
      }(Component), _defineProperty(_class2, "instance", null), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/bundle.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        var require = loader.createRequireWithReqMap({}, _require);

        (function () {
          /*! For license information please see bundle.js.LICENSE.txt */
          (function () {
            var t = {
              156: function _(t, n, e) {
                var r;

                function i(t) {
                  return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t;
                  } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                  })(t);
                }

                function u(t, n) {
                  if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
                }

                function o(t, n) {
                  for (var e = 0; e < n.length; e++) {
                    var r = n[e];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
                  }
                }

                function a(t, n) {
                  return (a = Object.setPrototypeOf || function (t, n) {
                    return t.__proto__ = n, t;
                  })(t, n);
                }

                function c(t, n) {
                  return !n || "object" !== i(n) && "function" != typeof n ? function (t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t;
                  }(t) : n;
                }

                function f(t) {
                  return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
                }

                Object.defineProperty(n, "__esModule", {
                  value: !0
                }), n["default"] = void 0;

                var s = function (t) {
                  !function (t, n) {
                    if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(n && n.prototype, {
                      constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                      }
                    }), n && a(t, n);
                  }(i, t);

                  var n,
                      e,
                      r = function (t) {
                    function n() {
                      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                      if (Reflect.construct.sham) return !1;
                      if ("function" == typeof Proxy) return !0;

                      try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                      } catch (t) {
                        return !1;
                      }
                    }

                    return function () {
                      var e,
                          r = f(t);

                      if (n()) {
                        var i = f(this).constructor;
                        e = Reflect.construct(r, arguments, i);
                      } else e = r.apply(this, arguments);

                      return c(this, e);
                    };
                  }(i);

                  function i() {
                    return u(this, i), r.apply(this, arguments);
                  }

                  return n = i, e = [{
                    key: "openWeb",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["openWeb"].concat(n));
                    }
                  }, {
                    key: "dismiss",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["dismiss"].concat(n));
                    }
                  }, {
                    key: "dismissAll",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["dismissAll"].concat(n));
                    }
                  }, {
                    key: "goBack",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["goBack"].concat(n));
                    }
                  }, {
                    key: "goHome",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["goHome"].concat(n));
                    }
                  }, {
                    key: "copyToClipboard",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["copyToClipboard"].concat(n));
                    }
                  }, {
                    key: "openDialer",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["openDialer"].concat(n));
                    }
                  }, {
                    key: "getBase64FromUrl",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getBase64FromUrl"].concat(n));
                    }
                  }, {
                    key: "setBrightnessLevel",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["setBrightnessLevel"].concat(n));
                    }
                  }, {
                    key: "getBrightnessLevel",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getBrightnessLevel"].concat(n));
                    }
                  }, {
                    key: "getSystemBrightnessLevel",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getSystemBrightnessLevel"].concat(n));
                    }
                  }, {
                    key: "sendSMS",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["sendSMS"].concat(n));
                    }
                  }, {
                    key: "getScreenShot",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getScreenShot"].concat(n));
                    }
                  }, {
                    key: "enableScreenshots",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["enableScreenshots"].concat(n));
                    }
                  }, {
                    key: "getImage",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getImage"].concat(n));
                    }
                  }, {
                    key: "saveImage",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["saveImage"].concat(n));
                    }
                  }, {
                    key: "getImageSize",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getImageSize"].concat(n));
                    }
                  }, {
                    key: "getImageRotateFromUri",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getImageRotateFromUri"].concat(n));
                    }
                  }, {
                    key: "openURL",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["openURL"].concat(n));
                    }
                  }, {
                    key: "playYouTube",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["playYouTube"].concat(n));
                    }
                  }, {
                    key: "shareFacebook",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["shareFacebook"].concat(n));
                    }
                  }, {
                    key: "throwJSException",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["throwJSException"].concat(n));
                    }
                  }, {
                    key: "share",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["share"].concat(n));
                    }
                  }, {
                    key: "isHighPerformanceDevice",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["isHighPerformanceDevice"].concat(n));
                    }
                  }, {
                    key: "registerShakeSensitivity",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["registerShakeSensitivity"].concat(n));
                    }
                  }, {
                    key: "unregisterShakeSensitivity",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["unregisterShakeSensitivity"].concat(n));
                    }
                  }, {
                    key: "saveCalendarEvent",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["saveCalendarEvent"].concat(n));
                    }
                  }, {
                    key: "activeKeepAwake",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["activeKeepAwake"].concat(n));
                    }
                  }, {
                    key: "getItem",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getItem"].concat(n));
                    }
                  }, {
                    key: "setItem",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["setItem"].concat(n));
                    }
                  }, {
                    key: "removeItem",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["removeItem"].concat(n));
                    }
                  }, {
                    key: "showToast",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["showToast"].concat(n));
                    }
                  }, {
                    key: "hideToast",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["hideToast"].concat(n));
                    }
                  }, {
                    key: "showLoading",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["showLoading"].concat(n));
                    }
                  }, {
                    key: "hideLoading",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["hideLoading"].concat(n));
                    }
                  }, {
                    key: "showAlert",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["showAlert"].concat(n));
                    }
                  }, {
                    key: "showAction",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["showAction"].concat(n));
                    }
                  }, {
                    key: "showPicker",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["showPicker"].concat(n));
                    }
                  }, {
                    key: "getContacts",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getContacts"].concat(n));
                    }
                  }, {
                    key: "saveContact",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["saveContact"].concat(n));
                    }
                  }, {
                    key: "requestUserInfo",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["requestUserInfo"].concat(n));
                    }
                  }, {
                    key: "getUserUUID",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getUserUUID"].concat(n));
                    }
                  }, {
                    key: "listen",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["listen"].concat(n));
                    }
                  }, {
                    key: "scanQRCode",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["scanQRCode"].concat(n));
                    }
                  }, {
                    key: "startFeature",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["startFeature"].concat(n));
                    }
                  }, {
                    key: "requestLocation",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["requestLocation"].concat(n));
                    }
                  }, {
                    key: "getLocation",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getLocation"].concat(n));
                    }
                  }], e && o(n, e), i;
                }(((r = e(352)) && r.__esModule ? r : {
                  "default": r
                })["default"]);

                n["default"] = s, function (t, n, e) {
                  n in t ? Object.defineProperty(t, n, {
                    value: 2,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                  }) : t[n] = 2;
                }(s, "apiVersion");
              },
              801: function _(t, n, e) {
                Object.defineProperty(n, "__esModule", {
                  value: !0
                }), n["default"] = void 0;
                var r = u(e(51)),
                    i = u(e(245));

                function u(t) {
                  return t && t.__esModule ? t : {
                    "default": t
                  };
                }

                function o(t, n) {
                  var e = Object.keys(t);

                  if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    n && (r = r.filter(function (n) {
                      return Object.getOwnPropertyDescriptor(t, n).enumerable;
                    })), e.push.apply(e, r);
                  }

                  return e;
                }

                function a(t) {
                  for (var n = 1; n < arguments.length; n++) {
                    var e = null != arguments[n] ? arguments[n] : {};
                    n % 2 ? o(Object(e), !0).forEach(function (n) {
                      s(t, n, e[n]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : o(Object(e)).forEach(function (n) {
                      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
                    });
                  }

                  return t;
                }

                function c(t) {
                  return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t;
                  } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                  })(t);
                }

                function f(t, n) {
                  for (var e = 0; e < n.length; e++) {
                    var r = n[e];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
                  }
                }

                function s(t, n, e) {
                  return n in t ? Object.defineProperty(t, n, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                  }) : t[n] = e, t;
                }

                var l = function () {
                  function t(n) {
                    !function (t, n) {
                      if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
                    }(this, t), this.callbacks = {}, this.updateProps(n);
                  }

                  var n, e, u;
                  return n = t, u = [{
                    key: "dispatchFunction",
                    value: function value() {
                      var n = t.instance;
                      if (n) return n.dispatch.apply(n, arguments);
                      console.error("ApiBase haven't initialized yet!");
                    }
                  }, {
                    key: "throwJSException",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["throwJSException"].concat(n));
                    }
                  }], (e = [{
                    key: "updateProps",
                    value: function value(t) {
                      var n = t || {},
                          e = n.serviceId,
                          r = void 0 === e ? "" : e,
                          i = n.accessToken,
                          u = void 0 === i ? "" : i,
                          o = n.hostId,
                          a = void 0 === o ? "" : o;

                      if (a && (a.split("#") > 1 || !this.miniApp)) {
                        var c = (null == t ? void 0 : t.appId) || a.split("#")[0];
                        this.miniApp = {
                          serviceId: r,
                          accessToken: u,
                          hostId: a,
                          appId: c
                        };
                      }

                      this.props = t;
                    }
                  }, {
                    key: "verifyResponse",
                    value: function value(t) {
                      return !!t.miniApp;
                    }
                  }, {
                    key: "response",
                    value: function value(t) {
                      try {
                        var n = JSON.parse(t);

                        if (n && this.verifyResponse(n)) {
                          var e = n.uuid,
                              r = n.result,
                              i = n.func,
                              u = this.callbacks[e];

                          if (u) {
                            var o = u.props.callback;

                            try {
                              if ("object" === c(r)) o(r);else o(JSON.parse(r || "") || r);
                            } catch (t) {
                              o(r);
                            }

                            0 != i.indexOf("observer") && 0 != i.indexOf("listen") && 0 != i.indexOf("subscribe") && u.remove(e);
                          }
                        }
                      } catch (t) {}
                    }
                  }, {
                    key: "removeCallback",
                    value: function value(n) {
                      t.dispatchFunction("removeCallback", n), this.callbacks && delete this.callbacks[n];
                    }
                  }, {
                    key: "dispatch",
                    value: function value() {
                      var t = null,
                          n = Array.from(arguments),
                          e = n[0];

                      if (n.shift(), n.length > 0) {
                        var u = n[n.length - 1];
                        "function" == typeof u && (t = u, n.pop());
                      }

                      var o = this.getUniqueId(),
                          c = null;

                      if (t) {
                        var f = this.removeCallback.bind(this);
                        c = new i["default"]({
                          callback: t,
                          uuid: o,
                          remove: f
                        }), this.callbacks[o] = c;
                      }

                      var s = r["default"].apiVersion,
                          l = {
                        func: e,
                        args: n,
                        uuid: o,
                        platform: this.platform,
                        apiVersion: s,
                        miniApp: a({}, this.miniApp)
                      };
                      return this.request(l, c), c;
                    }
                  }, {
                    key: "request",
                    value: function value(t, n) {}
                  }, {
                    key: "getUniqueId",
                    value: function value() {
                      return Math.random().toString(36).substring(2) + Date.now().toString(36);
                    }
                  }, {
                    key: "throwJSException",
                    value: function value() {
                      for (var n = arguments.length, e = new Array(n), r = 0; r < n; r++) {
                        e[r] = arguments[r];
                      }

                      return t.dispatchFunction.apply(t, ["throwJSException"].concat(e));
                    }
                  }]) && f(n.prototype, e), u && f(n, u), t;
                }();

                n["default"] = l, s(l, "callbacks", {}), s(l, "initialized", !1), s(l, "accessToken", ""), s(l, "serviceId", ""), s(l, "hostId", ""), s(l, "platform", "web"), s(l, "instance", null), s(l, "props", {});
              },
              245: function _(t, n) {
                function e(t, n) {
                  for (var e = 0; e < n.length; e++) {
                    var r = n[e];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
                  }
                }

                Object.defineProperty(n, "__esModule", {
                  value: !0
                }), n["default"] = void 0;

                var r = function () {
                  function t(n) {
                    !function (t, n) {
                      if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
                    }(this, t), this.props = n;
                  }

                  var n, r;
                  return n = t, (r = [{
                    key: "remove",
                    value: function value() {
                      this.props.remove && this.props.remove(this.props.uuid);
                    }
                  }]) && e(n.prototype, r), t;
                }();

                n["default"] = r;
              },
              352: function _(t, n, e) {
                var r;
                Object.defineProperty(n, "__esModule", {
                  value: !0
                }), n["default"] = void 0;
                var i = ((r = e(608)) && r.__esModule ? r : {
                  "default": r
                })["default"];
                n["default"] = i;
              },
              608: function _(t, n, e) {
                Object.defineProperty(n, "__esModule", {
                  value: !0
                }), n["default"] = void 0;
                var r,
                    i = (r = e(801)) && r.__esModule ? r : {
                  "default": r
                };

                function u(t) {
                  return (u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t;
                  } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                  })(t);
                }

                function o(t, n) {
                  for (var e = 0; e < n.length; e++) {
                    var r = n[e];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
                  }
                }

                function a(t, n) {
                  return (a = Object.setPrototypeOf || function (t, n) {
                    return t.__proto__ = n, t;
                  })(t, n);
                }

                function c(t, n) {
                  return !n || "object" !== u(n) && "function" != typeof n ? function (t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t;
                  }(t) : n;
                }

                function f(t) {
                  return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
                }

                var s = function (t) {
                  !function (t, n) {
                    if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(n && n.prototype, {
                      constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                      }
                    }), n && a(t, n);
                  }(s, t);

                  var n,
                      e,
                      r,
                      u = function (t) {
                    function n() {
                      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                      if (Reflect.construct.sham) return !1;
                      if ("function" == typeof Proxy) return !0;

                      try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                      } catch (t) {
                        return !1;
                      }
                    }

                    return function () {
                      var e,
                          r = f(t);

                      if (n()) {
                        var i = f(this).constructor;
                        e = Reflect.construct(r, arguments, i);
                      } else e = r.apply(this, arguments);

                      return c(this, e);
                    };
                  }(s);

                  function s(t) {
                    var n;
                    return function (t, n) {
                      if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
                    }(this, s), (n = u.call(this, t)).platform = "web", window.addEventListener("message", function (t) {
                      n.response(t.data);
                    }), n;
                  }

                  return n = s, r = [{
                    key: "init",
                    value: function value(t) {
                      var n = t.client ? t.client.web : t || {};
                      return i["default"].instance ? i["default"].instance.updateProps(n) : i["default"].instance = new s(n), i["default"].instance;
                    }
                  }], (e = [{
                    key: "request",
                    value: function value(t, n) {
                      var e = JSON.stringify(t),
                          r = window.ReactNativeWebView;
                      r && r.postMessage(e);
                    }
                  }]) && o(n.prototype, e), r && o(n, r), s;
                }(i["default"]);

                n["default"] = s;
              },
              197: function _(t, n, e) {
                var r;

                function i(t) {
                  return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t;
                  } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                  })(t);
                }

                function u(t, n) {
                  if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
                }

                function o(t, n) {
                  for (var e = 0; e < n.length; e++) {
                    var r = n[e];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
                  }
                }

                function a(t, n) {
                  return (a = Object.setPrototypeOf || function (t, n) {
                    return t.__proto__ = n, t;
                  })(t, n);
                }

                function c(t, n) {
                  return !n || "object" !== i(n) && "function" != typeof n ? function (t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t;
                  }(t) : n;
                }

                function f(t) {
                  return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
                }

                n.Z = void 0;

                var s = function (t) {
                  !function (t, n) {
                    if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(n && n.prototype, {
                      constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                      }
                    }), n && a(t, n);
                  }(i, t);

                  var n,
                      e,
                      r = function (t) {
                    function n() {
                      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                      if (Reflect.construct.sham) return !1;
                      if ("function" == typeof Proxy) return !0;

                      try {
                        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                      } catch (t) {
                        return !1;
                      }
                    }

                    return function () {
                      var e,
                          r = f(t);

                      if (n()) {
                        var i = f(this).constructor;
                        e = Reflect.construct(r, arguments, i);
                      } else e = r.apply(this, arguments);

                      return c(this, e);
                    };
                  }(i);

                  function i() {
                    return u(this, i), r.apply(this, arguments);
                  }

                  return n = i, e = [{
                    key: "navigate",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["navigate"].concat(n));
                    }
                  }, {
                    key: "startApp",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["startApp"].concat(n));
                    }
                  }, {
                    key: "startMiniApp",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["startMiniApp"].concat(n));
                    }
                  }, {
                    key: "startService",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["startService"].concat(n));
                    }
                  }, {
                    key: "startServiceId",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["startServiceId"].concat(n));
                    }
                  }, {
                    key: "startFeature",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["startFeature"].concat(n));
                    }
                  }, {
                    key: "startFeatureCode",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["startFeatureCode"].concat(n));
                    }
                  }, {
                    key: "navigateTab",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["navigateTab"].concat(n));
                    }
                  }, {
                    key: "getIpAddress",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getIpAddress"].concat(n));
                    }
                  }, {
                    key: "openURLWithPackageId",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["openURLWithPackageId"].concat(n));
                    }
                  }, {
                    key: "requestATTPermision",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["requestATTPermision"].concat(n));
                    }
                  }, {
                    key: "trackEvent",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["trackEvent"].concat(n));
                    }
                  }, {
                    key: "trackPurchase",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["trackPurchase"].concat(n));
                    }
                  }, {
                    key: "uploadImage",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["uploadImage"].concat(n));
                    }
                  }, {
                    key: "setBadgeFeature",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["setBadgeFeature"].concat(n));
                    }
                  }, {
                    key: "getDeviceInfo",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getDeviceInfo"].concat(n));
                    }
                  }, {
                    key: "openDeviceSetting",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["openDeviceSetting"].concat(n));
                    }
                  }, {
                    key: "sendExtraMessage",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["sendExtraMessage"].concat(n));
                    }
                  }, {
                    key: "requestLogout",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["requestLogout"].concat(n));
                    }
                  }, {
                    key: "setBackgroundTimeout",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["setBackgroundTimeout"].concat(n));
                    }
                  }, {
                    key: "sendMessage",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["sendMessage"].concat(n));
                    }
                  }, {
                    key: "getMessage",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getMessage"].concat(n));
                    }
                  }, {
                    key: "sendConfirmMessage",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["sendConfirmMessage"].concat(n));
                    }
                  }, {
                    key: "sendProxyMessage",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["sendProxyMessage"].concat(n));
                    }
                  }, {
                    key: "sendCloudMessage",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["sendCloudMessage"].concat(n));
                    }
                  }, {
                    key: "getCloudMessage",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getCloudMessage"].concat(n));
                    }
                  }, {
                    key: "requestPayment",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["requestPayment"].concat(n));
                    }
                  }, {
                    key: "requestPaymentSdk",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["requestPaymentSdk"].concat(n));
                    }
                  }, {
                    key: "addItemToCart",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["addItemToCart"].concat(n));
                    }
                  }, {
                    key: "gotoCart",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["gotoCart"].concat(n));
                    }
                  }, {
                    key: "clearCart",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["clearCart"].concat(n));
                    }
                  }, {
                    key: "getSources",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getSources"].concat(n));
                    }
                  }, {
                    key: "getContactInfo",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getContactInfo"].concat(n));
                    }
                  }, {
                    key: "getContact",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getContact"].concat(n));
                    }
                  }, {
                    key: "queryContact",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["queryContact"].concat(n));
                    }
                  }, {
                    key: "mapContacts",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["mapContacts"].concat(n));
                    }
                  }, {
                    key: "syncContacts",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["syncContacts"].concat(n));
                    }
                  }, {
                    key: "syncContactAfter1Day",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["syncContactAfter1Day"].concat(n));
                    }
                  }, {
                    key: "syncContactAfter1Minute",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["syncContactAfter1Minute"].concat(n));
                    }
                  }, {
                    key: "getContactAvatar",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getContactAvatar"].concat(n));
                    }
                  }, {
                    key: "getProfile",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getProfile"].concat(n));
                    }
                  }, {
                    key: "setProfile",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["setProfile"].concat(n));
                    }
                  }, {
                    key: "observerProfile",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["observerProfile"].concat(n));
                    }
                  }, {
                    key: "setUserProfileExtraOnServer",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["setUserProfileExtraOnServer"].concat(n));
                    }
                  }, {
                    key: "getPassengerInfo",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getPassengerInfo"].concat(n));
                    }
                  }, {
                    key: "setPassengerInfo",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["setPassengerInfo"].concat(n));
                    }
                  }, {
                    key: "realmQuery",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["realmQuery"].concat(n));
                    }
                  }, {
                    key: "realmSave",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["realmSave"].concat(n));
                    }
                  }, {
                    key: "realmDelete",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["realmDelete"].concat(n));
                    }
                  }, {
                    key: "requestPermission",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["requestPermission"].concat(n));
                    }
                  }, {
                    key: "checkPermission",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["checkPermission"].concat(n));
                    }
                  }, {
                    key: "requestLocationWithOptions",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["requestLocationWithOptions"].concat(n));
                    }
                  }, {
                    key: "getConfig",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getConfig"].concat(n));
                    }
                  }, {
                    key: "requestSync",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["requestSync"].concat(n));
                    }
                  }, {
                    key: "getTransactionWithServiceIds",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getTransactionWithServiceIds"].concat(n));
                    }
                  }, {
                    key: "getTransactionInfo",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getTransactionInfo"].concat(n));
                    }
                  }, {
                    key: "getTransactionStatusCode",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getTransactionStatusCode"].concat(n));
                    }
                  }, {
                    key: "getStatusInfo",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getStatusInfo"].concat(n));
                    }
                  }, {
                    key: "getAllTransactionStatusInfo",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getAllTransactionStatusInfo"].concat(n));
                    }
                  }, {
                    key: "getAllTransactionStatusCode",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getAllTransactionStatusCode"].concat(n));
                    }
                  }, {
                    key: "getMoneySourceName",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getMoneySourceName"].concat(n));
                    }
                  }, {
                    key: "getFeatureById",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getFeatureById"].concat(n));
                    }
                  }, {
                    key: "startTranHisDetail",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["startTranHisDetail"].concat(n));
                    }
                  }, {
                    key: "updateItemServer",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["updateItemServer"].concat(n));
                    }
                  }, {
                    key: "updateItemLocal",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["updateItemLocal"].concat(n));
                    }
                  }, {
                    key: "getItemsServer",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getItemsServer"].concat(n));
                    }
                  }, {
                    key: "getItemsLocal",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getItemsLocal"].concat(n));
                    }
                  }, {
                    key: "getItemLocal",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getItemLocal"].concat(n));
                    }
                  }, {
                    key: "sendThanksMessage",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["sendThanksMessage"].concat(n));
                    }
                  }, {
                    key: "clickNotification",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["clickNotification"].concat(n));
                    }
                  }, {
                    key: "showPopupNotification",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["showPopupNotification"].concat(n));
                    }
                  }, {
                    key: "getVouchersCount",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getVouchersCount"].concat(n));
                    }
                  }, {
                    key: "getVouchers",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getVouchers"].concat(n));
                    }
                  }, {
                    key: "get",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["get"].concat(n));
                    }
                  }, {
                    key: "getVoucherBackend",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getVoucherBackend"].concat(n));
                    }
                  }, {
                    key: "getSteps",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getSteps"].concat(n));
                    }
                  }, {
                    key: "getAvatarEndPoint",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getAvatarEndPoint"].concat(n));
                    }
                  }, {
                    key: "getResourceEndpoint",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getResourceEndpoint"].concat(n));
                    }
                  }, {
                    key: "observer",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["observer"].concat(n));
                    }
                  }, {
                    key: "getDataObserver",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getDataObserver"].concat(n));
                    }
                  }, {
                    key: "setDataObserver",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["setDataObserver"].concat(n));
                    }
                  }, {
                    key: "requestLoan",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["requestLoan"].concat(n));
                    }
                  }, {
                    key: "countTrace",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["countTrace"].concat(n));
                    }
                  }, {
                    key: "startTrace",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["startTrace"].concat(n));
                    }
                  }, {
                    key: "stopTrace",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["stopTrace"].concat(n));
                    }
                  }, {
                    key: "errorTrace",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["errorTrace"].concat(n));
                    }
                  }, {
                    key: "requestGameAction",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["requestGameAction"].concat(n));
                    }
                  }, {
                    key: "chatGRPCConnect",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["chatGRPCConnect"].concat(n));
                    }
                  }, {
                    key: "chatSendMessageGRPC",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["chatSendMessageGRPC"].concat(n));
                    }
                  }, {
                    key: "getBadgeTicket",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getBadgeTicket"].concat(n));
                    }
                  }, {
                    key: "chatCrmGRPCConnect",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["chatCrmGRPCConnect"].concat(n));
                    }
                  }, {
                    key: "chatCrmSendMessageGRPC",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["chatCrmSendMessageGRPC"].concat(n));
                    }
                  }, {
                    key: "chatCrmGetConnectionStatus",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["chatCrmGetConnectionStatus"].concat(n));
                    }
                  }, {
                    key: "chatCrmGRPCDisconnect",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["chatCrmGRPCDisconnect"].concat(n));
                    }
                  }, {
                    key: "getBillCount",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getBillCount"].concat(n));
                    }
                  }, {
                    key: "getFolderVoucherCount",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getFolderVoucherCount"].concat(n));
                    }
                  }, {
                    key: "getChatCount",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getChatCount"].concat(n));
                    }
                  }, {
                    key: "getMobileVoucherCount",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getMobileVoucherCount"].concat(n));
                    }
                  }, {
                    key: "getListFriendMoMo",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getListFriendMoMo"].concat(n));
                    }
                  }, {
                    key: "getRelationShipStatus",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getRelationShipStatus"].concat(n));
                    }
                  }, {
                    key: "acceptFriendRequest",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["acceptFriendRequest"].concat(n));
                    }
                  }, {
                    key: "sendFriendRequest",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["sendFriendRequest"].concat(n));
                    }
                  }, {
                    key: "blockUser",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["blockUser"].concat(n));
                    }
                  }, {
                    key: "unBlockUser",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["unBlockUser"].concat(n));
                    }
                  }, {
                    key: "getFacebookFriendList",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getFacebookFriendList"].concat(n));
                    }
                  }, {
                    key: "pickSingleDocument",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["pickSingleDocument"].concat(n));
                    }
                  }, {
                    key: "uploadDocuments",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["uploadDocuments"].concat(n));
                    }
                  }, {
                    key: "observerUploadDocuments",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["observerUploadDocuments"].concat(n));
                    }
                  }, {
                    key: "cancelUpload",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["cancelUpload"].concat(n));
                    }
                  }, {
                    key: "downloadMediaFile",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["downloadMediaFile"].concat(n));
                    }
                  }, {
                    key: "playSound",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["playSound"].concat(n));
                    }
                  }, {
                    key: "pauseSound",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["pauseSound"].concat(n));
                    }
                  }, {
                    key: "resumeSound",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["resumeSound"].concat(n));
                    }
                  }, {
                    key: "stopSound",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["stopSound"].concat(n));
                    }
                  }, {
                    key: "startCaptureSideDocument",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["startCaptureSideDocument"].concat(n));
                    }
                  }, {
                    key: "startCaptureFace",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["startCaptureFace"].concat(n));
                    }
                  }, {
                    key: "faceMatching",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["faceMatching"].concat(n));
                    }
                  }, {
                    key: "addFace",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["addFace"].concat(n));
                    }
                  }, {
                    key: "fetchNetworkInfo",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["fetchNetworkInfo"].concat(n));
                    }
                  }, {
                    key: "useNetInfo",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["useNetInfo"].concat(n));
                    }
                  }, {
                    key: "connectMqttBroker",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["connectMqttBroker"].concat(n));
                    }
                  }, {
                    key: "disconnectMqttBroker",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["disconnectMqttBroker"].concat(n));
                    }
                  }, {
                    key: "subscribeMqttTopic",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["subscribeMqttTopic"].concat(n));
                    }
                  }, {
                    key: "unsubscribeMqttTopic",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["unsubscribeMqttTopic"].concat(n));
                    }
                  }, {
                    key: "getFullListFriendMoMo",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["getFullListFriendMoMo"].concat(n));
                    }
                  }, {
                    key: "friendQuery",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["friendQuery"].concat(n));
                    }
                  }, {
                    key: "setFastLogin",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["setFastLogin"].concat(n));
                    }
                  }, {
                    key: "showToolkit",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["showToolkit"].concat(n));
                    }
                  }, {
                    key: "sendUploadMessage",
                    value: function value() {
                      for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++) {
                        n[e] = arguments[e];
                      }

                      return this.dispatchFunction.apply(this, ["sendUploadMessage"].concat(n));
                    }
                  }], e && o(n, e), i;
                }(((r = e(156)) && r.__esModule ? r : {
                  "default": r
                })["default"]);

                n.Z = s;
              },
              426: function _(t, n, e) {
                (n = e(645)(!1)).push([t.id, "body\r\n{\r\n    margin: 0;\r\n    /* background: url('./assets/images/bodyBackground.png'); */\r\n    background-size: 100% 100%;\r\n    background-repeat: no-repeat;\r\n}", ""]), t.exports = n;
              },
              645: function _(t) {
                t.exports = function (t) {
                  var n = [];
                  return n.toString = function () {
                    return this.map(function (n) {
                      var e = function (t, n) {
                        var e,
                            r,
                            i,
                            u = t[1] || "",
                            o = t[3];
                        if (!o) return u;

                        if (n && "function" == typeof btoa) {
                          var a = (e = o, r = btoa(unescape(encodeURIComponent(JSON.stringify(e)))), i = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r), "/*# ".concat(i, " */")),
                              c = o.sources.map(function (t) {
                            return "/*# sourceURL=".concat(o.sourceRoot || "").concat(t, " */");
                          });
                          return [u].concat(c).concat([a]).join("\n");
                        }

                        return [u].join("\n");
                      }(n, t);

                      return n[2] ? "@media ".concat(n[2], " {").concat(e, "}") : e;
                    }).join("");
                  }, n.i = function (t, e, r) {
                    "string" == typeof t && (t = [[null, t, ""]]);
                    var i = {};
                    if (r) for (var u = 0; u < this.length; u++) {
                      var o = this[u][0];
                      null != o && (i[o] = !0);
                    }

                    for (var a = 0; a < t.length; a++) {
                      var c = [].concat(t[a]);
                      r && i[c[0]] || (e && (c[2] ? c[2] = "".concat(e, " and ").concat(c[2]) : c[2] = e), n.push(c));
                    }
                  }, n;
                };
              },
              486: function _(t, n, e) {
                var r;
                t = e.nmd(t), function () {
                  var i,
                      u = "Expected a function",
                      o = "__lodash_hash_undefined__",
                      a = "__lodash_placeholder__",
                      c = 32,
                      f = 128,
                      s = 1 / 0,
                      l = 9007199254740991,
                      h = NaN,
                      p = 4294967295,
                      v = [["ary", f], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", 16], ["flip", 512], ["partial", c], ["partialRight", 64], ["rearg", 256]],
                      y = "[object Arguments]",
                      g = "[object Array]",
                      d = "[object Boolean]",
                      _ = "[object Date]",
                      w = "[object Error]",
                      b = "[object Function]",
                      m = "[object GeneratorFunction]",
                      k = "[object Map]",
                      A = "[object Number]",
                      F = "[object Object]",
                      S = "[object Promise]",
                      C = "[object RegExp]",
                      x = "[object Set]",
                      j = "[object String]",
                      O = "[object Symbol]",
                      I = "[object WeakMap]",
                      P = "[object ArrayBuffer]",
                      R = "[object DataView]",
                      E = "[object Float32Array]",
                      M = "[object Float64Array]",
                      T = "[object Int8Array]",
                      L = "[object Int16Array]",
                      D = "[object Int32Array]",
                      U = "[object Uint8Array]",
                      B = "[object Uint8ClampedArray]",
                      q = "[object Uint16Array]",
                      z = "[object Uint32Array]",
                      W = /\b__p \+= '';/g,
                      N = /\b(__p \+=) '' \+/g,
                      $ = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
                      G = /&(?:amp|lt|gt|quot|#39);/g,
                      V = /[&<>"']/g,
                      Z = RegExp(G.source),
                      J = RegExp(V.source),
                      K = /<%-([\s\S]+?)%>/g,
                      H = /<%([\s\S]+?)%>/g,
                      Q = /<%=([\s\S]+?)%>/g,
                      Y = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
                      X = /^\w*$/,
                      tt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
                      nt = /[\\^$.*+?()[\]{}|]/g,
                      et = RegExp(nt.source),
                      rt = /^\s+/,
                      it = /\s/,
                      ut = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
                      ot = /\{\n\/\* \[wrapped with (.+)\] \*/,
                      at = /,? & /,
                      ct = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
                      ft = /[()=,{}\[\]\/\s]/,
                      st = /\\(\\)?/g,
                      lt = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
                      ht = /\w*$/,
                      pt = /^[-+]0x[0-9a-f]+$/i,
                      vt = /^0b[01]+$/i,
                      yt = /^\[object .+?Constructor\]$/,
                      gt = /^0o[0-7]+$/i,
                      dt = /^(?:0|[1-9]\d*)$/,
                      _t = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
                      wt = /($^)/,
                      bt = /['\n\r\u2028\u2029\\]/g,
                      mt = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff",
                      kt = "a-z\\xdf-\\xf6\\xf8-\\xff",
                      At = "A-Z\\xc0-\\xd6\\xd8-\\xde",
                      Ft = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
                      St = "[" + Ft + "]",
                      Ct = "[" + mt + "]",
                      xt = "\\d+",
                      jt = "[" + kt + "]",
                      Ot = "[^\\ud800-\\udfff" + Ft + xt + "\\u2700-\\u27bf" + kt + At + "]",
                      It = "\\ud83c[\\udffb-\\udfff]",
                      Pt = "[^\\ud800-\\udfff]",
                      Rt = "(?:\\ud83c[\\udde6-\\uddff]){2}",
                      Et = "[\\ud800-\\udbff][\\udc00-\\udfff]",
                      Mt = "[" + At + "]",
                      Tt = "(?:" + jt + "|" + Ot + ")",
                      Lt = "(?:" + Mt + "|" + Ot + ")",
                      Dt = "(?:['’](?:d|ll|m|re|s|t|ve))?",
                      Ut = "(?:['’](?:D|LL|M|RE|S|T|VE))?",
                      Bt = "(?:" + Ct + "|" + It + ")?",
                      qt = "[\\ufe0e\\ufe0f]?",
                      zt = qt + Bt + "(?:\\u200d(?:" + [Pt, Rt, Et].join("|") + ")" + qt + Bt + ")*",
                      Wt = "(?:" + ["[\\u2700-\\u27bf]", Rt, Et].join("|") + ")" + zt,
                      Nt = "(?:" + [Pt + Ct + "?", Ct, Rt, Et, "[\\ud800-\\udfff]"].join("|") + ")",
                      $t = RegExp("['’]", "g"),
                      Gt = RegExp(Ct, "g"),
                      Vt = RegExp(It + "(?=" + It + ")|" + Nt + zt, "g"),
                      Zt = RegExp([Mt + "?" + jt + "+" + Dt + "(?=" + [St, Mt, "$"].join("|") + ")", Lt + "+" + Ut + "(?=" + [St, Mt + Tt, "$"].join("|") + ")", Mt + "?" + Tt + "+" + Dt, Mt + "+" + Ut, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", xt, Wt].join("|"), "g"),
                      Jt = RegExp("[\\u200d\\ud800-\\udfff" + mt + "\\ufe0e\\ufe0f]"),
                      Kt = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
                      Ht = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"],
                      Qt = -1,
                      Yt = {};
                  Yt[E] = Yt[M] = Yt[T] = Yt[L] = Yt[D] = Yt[U] = Yt[B] = Yt[q] = Yt[z] = !0, Yt[y] = Yt[g] = Yt[P] = Yt[d] = Yt[R] = Yt[_] = Yt[w] = Yt[b] = Yt[k] = Yt[A] = Yt[F] = Yt[C] = Yt[x] = Yt[j] = Yt[I] = !1;
                  var Xt = {};
                  Xt[y] = Xt[g] = Xt[P] = Xt[R] = Xt[d] = Xt[_] = Xt[E] = Xt[M] = Xt[T] = Xt[L] = Xt[D] = Xt[k] = Xt[A] = Xt[F] = Xt[C] = Xt[x] = Xt[j] = Xt[O] = Xt[U] = Xt[B] = Xt[q] = Xt[z] = !0, Xt[w] = Xt[b] = Xt[I] = !1;

                  var tn = {
                    "\\": "\\",
                    "'": "'",
                    "\n": "n",
                    "\r": "r",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                  },
                      nn = parseFloat,
                      en = parseInt,
                      rn = "object" == typeof e.g && e.g && e.g.Object === Object && e.g,
                      un = "object" == typeof self && self && self.Object === Object && self,
                      on = rn || un || Function("return this")(),
                      an = n && !n.nodeType && n,
                      cn = an && t && !t.nodeType && t,
                      fn = cn && cn.exports === an,
                      sn = fn && rn.process,
                      ln = function () {
                    try {
                      return cn && cn.require && cn.require("util").types || sn && sn.binding && sn.binding("util");
                    } catch (t) {}
                  }(),
                      hn = ln && ln.isArrayBuffer,
                      pn = ln && ln.isDate,
                      vn = ln && ln.isMap,
                      yn = ln && ln.isRegExp,
                      gn = ln && ln.isSet,
                      dn = ln && ln.isTypedArray;

                  function _n(t, n, e) {
                    switch (e.length) {
                      case 0:
                        return t.call(n);

                      case 1:
                        return t.call(n, e[0]);

                      case 2:
                        return t.call(n, e[0], e[1]);

                      case 3:
                        return t.call(n, e[0], e[1], e[2]);
                    }

                    return t.apply(n, e);
                  }

                  function wn(t, n, e, r) {
                    for (var i = -1, u = null == t ? 0 : t.length; ++i < u;) {
                      var o = t[i];
                      n(r, o, e(o), t);
                    }

                    return r;
                  }

                  function bn(t, n) {
                    for (var e = -1, r = null == t ? 0 : t.length; ++e < r && !1 !== n(t[e], e, t);) {}

                    return t;
                  }

                  function mn(t, n) {
                    for (var e = null == t ? 0 : t.length; e-- && !1 !== n(t[e], e, t);) {}

                    return t;
                  }

                  function kn(t, n) {
                    for (var e = -1, r = null == t ? 0 : t.length; ++e < r;) {
                      if (!n(t[e], e, t)) return !1;
                    }

                    return !0;
                  }

                  function An(t, n) {
                    for (var e = -1, r = null == t ? 0 : t.length, i = 0, u = []; ++e < r;) {
                      var o = t[e];
                      n(o, e, t) && (u[i++] = o);
                    }

                    return u;
                  }

                  function Fn(t, n) {
                    return !(null == t || !t.length) && Mn(t, n, 0) > -1;
                  }

                  function Sn(t, n, e) {
                    for (var r = -1, i = null == t ? 0 : t.length; ++r < i;) {
                      if (e(n, t[r])) return !0;
                    }

                    return !1;
                  }

                  function Cn(t, n) {
                    for (var e = -1, r = null == t ? 0 : t.length, i = Array(r); ++e < r;) {
                      i[e] = n(t[e], e, t);
                    }

                    return i;
                  }

                  function xn(t, n) {
                    for (var e = -1, r = n.length, i = t.length; ++e < r;) {
                      t[i + e] = n[e];
                    }

                    return t;
                  }

                  function jn(t, n, e, r) {
                    var i = -1,
                        u = null == t ? 0 : t.length;

                    for (r && u && (e = t[++i]); ++i < u;) {
                      e = n(e, t[i], i, t);
                    }

                    return e;
                  }

                  function On(t, n, e, r) {
                    var i = null == t ? 0 : t.length;

                    for (r && i && (e = t[--i]); i--;) {
                      e = n(e, t[i], i, t);
                    }

                    return e;
                  }

                  function In(t, n) {
                    for (var e = -1, r = null == t ? 0 : t.length; ++e < r;) {
                      if (n(t[e], e, t)) return !0;
                    }

                    return !1;
                  }

                  var Pn = Un("length");

                  function Rn(t, n, e) {
                    var r;
                    return e(t, function (t, e, i) {
                      if (n(t, e, i)) return r = e, !1;
                    }), r;
                  }

                  function En(t, n, e, r) {
                    for (var i = t.length, u = e + (r ? 1 : -1); r ? u-- : ++u < i;) {
                      if (n(t[u], u, t)) return u;
                    }

                    return -1;
                  }

                  function Mn(t, n, e) {
                    return n == n ? function (t, n, e) {
                      for (var r = e - 1, i = t.length; ++r < i;) {
                        if (t[r] === n) return r;
                      }

                      return -1;
                    }(t, n, e) : En(t, Ln, e);
                  }

                  function Tn(t, n, e, r) {
                    for (var i = e - 1, u = t.length; ++i < u;) {
                      if (r(t[i], n)) return i;
                    }

                    return -1;
                  }

                  function Ln(t) {
                    return t != t;
                  }

                  function Dn(t, n) {
                    var e = null == t ? 0 : t.length;
                    return e ? zn(t, n) / e : h;
                  }

                  function Un(t) {
                    return function (n) {
                      return null == n ? i : n[t];
                    };
                  }

                  function Bn(t) {
                    return function (n) {
                      return null == t ? i : t[n];
                    };
                  }

                  function qn(t, n, e, r, i) {
                    return i(t, function (t, i, u) {
                      e = r ? (r = !1, t) : n(e, t, i, u);
                    }), e;
                  }

                  function zn(t, n) {
                    for (var e, r = -1, u = t.length; ++r < u;) {
                      var o = n(t[r]);
                      o !== i && (e = e === i ? o : e + o);
                    }

                    return e;
                  }

                  function Wn(t, n) {
                    for (var e = -1, r = Array(t); ++e < t;) {
                      r[e] = n(e);
                    }

                    return r;
                  }

                  function Nn(t) {
                    return t ? t.slice(0, ae(t) + 1).replace(rt, "") : t;
                  }

                  function $n(t) {
                    return function (n) {
                      return t(n);
                    };
                  }

                  function Gn(t, n) {
                    return Cn(n, function (n) {
                      return t[n];
                    });
                  }

                  function Vn(t, n) {
                    return t.has(n);
                  }

                  function Zn(t, n) {
                    for (var e = -1, r = t.length; ++e < r && Mn(n, t[e], 0) > -1;) {}

                    return e;
                  }

                  function Jn(t, n) {
                    for (var e = t.length; e-- && Mn(n, t[e], 0) > -1;) {}

                    return e;
                  }

                  function Kn(t, n) {
                    for (var e = t.length, r = 0; e--;) {
                      t[e] === n && ++r;
                    }

                    return r;
                  }

                  var Hn = Bn({
                    À: "A",
                    Á: "A",
                    Â: "A",
                    Ã: "A",
                    Ä: "A",
                    Å: "A",
                    à: "a",
                    á: "a",
                    â: "a",
                    ã: "a",
                    ä: "a",
                    å: "a",
                    Ç: "C",
                    ç: "c",
                    Ð: "D",
                    ð: "d",
                    È: "E",
                    É: "E",
                    Ê: "E",
                    Ë: "E",
                    è: "e",
                    é: "e",
                    ê: "e",
                    ë: "e",
                    Ì: "I",
                    Í: "I",
                    Î: "I",
                    Ï: "I",
                    ì: "i",
                    í: "i",
                    î: "i",
                    ï: "i",
                    Ñ: "N",
                    ñ: "n",
                    Ò: "O",
                    Ó: "O",
                    Ô: "O",
                    Õ: "O",
                    Ö: "O",
                    Ø: "O",
                    ò: "o",
                    ó: "o",
                    ô: "o",
                    õ: "o",
                    ö: "o",
                    ø: "o",
                    Ù: "U",
                    Ú: "U",
                    Û: "U",
                    Ü: "U",
                    ù: "u",
                    ú: "u",
                    û: "u",
                    ü: "u",
                    Ý: "Y",
                    ý: "y",
                    ÿ: "y",
                    Æ: "Ae",
                    æ: "ae",
                    Þ: "Th",
                    þ: "th",
                    ß: "ss",
                    Ā: "A",
                    Ă: "A",
                    Ą: "A",
                    ā: "a",
                    ă: "a",
                    ą: "a",
                    Ć: "C",
                    Ĉ: "C",
                    Ċ: "C",
                    Č: "C",
                    ć: "c",
                    ĉ: "c",
                    ċ: "c",
                    č: "c",
                    Ď: "D",
                    Đ: "D",
                    ď: "d",
                    đ: "d",
                    Ē: "E",
                    Ĕ: "E",
                    Ė: "E",
                    Ę: "E",
                    Ě: "E",
                    ē: "e",
                    ĕ: "e",
                    ė: "e",
                    ę: "e",
                    ě: "e",
                    Ĝ: "G",
                    Ğ: "G",
                    Ġ: "G",
                    Ģ: "G",
                    ĝ: "g",
                    ğ: "g",
                    ġ: "g",
                    ģ: "g",
                    Ĥ: "H",
                    Ħ: "H",
                    ĥ: "h",
                    ħ: "h",
                    Ĩ: "I",
                    Ī: "I",
                    Ĭ: "I",
                    Į: "I",
                    İ: "I",
                    ĩ: "i",
                    ī: "i",
                    ĭ: "i",
                    į: "i",
                    ı: "i",
                    Ĵ: "J",
                    ĵ: "j",
                    Ķ: "K",
                    ķ: "k",
                    ĸ: "k",
                    Ĺ: "L",
                    Ļ: "L",
                    Ľ: "L",
                    Ŀ: "L",
                    Ł: "L",
                    ĺ: "l",
                    ļ: "l",
                    ľ: "l",
                    ŀ: "l",
                    ł: "l",
                    Ń: "N",
                    Ņ: "N",
                    Ň: "N",
                    Ŋ: "N",
                    ń: "n",
                    ņ: "n",
                    ň: "n",
                    ŋ: "n",
                    Ō: "O",
                    Ŏ: "O",
                    Ő: "O",
                    ō: "o",
                    ŏ: "o",
                    ő: "o",
                    Ŕ: "R",
                    Ŗ: "R",
                    Ř: "R",
                    ŕ: "r",
                    ŗ: "r",
                    ř: "r",
                    Ś: "S",
                    Ŝ: "S",
                    Ş: "S",
                    Š: "S",
                    ś: "s",
                    ŝ: "s",
                    ş: "s",
                    š: "s",
                    Ţ: "T",
                    Ť: "T",
                    Ŧ: "T",
                    ţ: "t",
                    ť: "t",
                    ŧ: "t",
                    Ũ: "U",
                    Ū: "U",
                    Ŭ: "U",
                    Ů: "U",
                    Ű: "U",
                    Ų: "U",
                    ũ: "u",
                    ū: "u",
                    ŭ: "u",
                    ů: "u",
                    ű: "u",
                    ų: "u",
                    Ŵ: "W",
                    ŵ: "w",
                    Ŷ: "Y",
                    ŷ: "y",
                    Ÿ: "Y",
                    Ź: "Z",
                    Ż: "Z",
                    Ž: "Z",
                    ź: "z",
                    ż: "z",
                    ž: "z",
                    Ĳ: "IJ",
                    ĳ: "ij",
                    Œ: "Oe",
                    œ: "oe",
                    ŉ: "'n",
                    ſ: "s"
                  }),
                      Qn = Bn({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                  });

                  function Yn(t) {
                    return "\\" + tn[t];
                  }

                  function Xn(t) {
                    return Jt.test(t);
                  }

                  function te(t) {
                    var n = -1,
                        e = Array(t.size);
                    return t.forEach(function (t, r) {
                      e[++n] = [r, t];
                    }), e;
                  }

                  function ne(t, n) {
                    return function (e) {
                      return t(n(e));
                    };
                  }

                  function ee(t, n) {
                    for (var e = -1, r = t.length, i = 0, u = []; ++e < r;) {
                      var o = t[e];
                      o !== n && o !== a || (t[e] = a, u[i++] = e);
                    }

                    return u;
                  }

                  function re(t) {
                    var n = -1,
                        e = Array(t.size);
                    return t.forEach(function (t) {
                      e[++n] = t;
                    }), e;
                  }

                  function ie(t) {
                    var n = -1,
                        e = Array(t.size);
                    return t.forEach(function (t) {
                      e[++n] = [t, t];
                    }), e;
                  }

                  function ue(t) {
                    return Xn(t) ? function (t) {
                      for (var n = Vt.lastIndex = 0; Vt.test(t);) {
                        ++n;
                      }

                      return n;
                    }(t) : Pn(t);
                  }

                  function oe(t) {
                    return Xn(t) ? function (t) {
                      return t.match(Vt) || [];
                    }(t) : function (t) {
                      return t.split("");
                    }(t);
                  }

                  function ae(t) {
                    for (var n = t.length; n-- && it.test(t.charAt(n));) {}

                    return n;
                  }

                  var ce = Bn({
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": '"',
                    "&#39;": "'"
                  }),
                      fe = function t(n) {
                    var e,
                        r = (n = null == n ? on : fe.defaults(on.Object(), n, fe.pick(on, Ht))).Array,
                        it = n.Date,
                        mt = n.Error,
                        kt = n.Function,
                        At = n.Math,
                        Ft = n.Object,
                        St = n.RegExp,
                        Ct = n.String,
                        xt = n.TypeError,
                        jt = r.prototype,
                        Ot = kt.prototype,
                        It = Ft.prototype,
                        Pt = n["__core-js_shared__"],
                        Rt = Ot.toString,
                        Et = It.hasOwnProperty,
                        Mt = 0,
                        Tt = (e = /[^.]+$/.exec(Pt && Pt.keys && Pt.keys.IE_PROTO || "")) ? "Symbol(src)_1." + e : "",
                        Lt = It.toString,
                        Dt = Rt.call(Ft),
                        Ut = on._,
                        Bt = St("^" + Rt.call(Et).replace(nt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                        qt = fn ? n.Buffer : i,
                        zt = n.Symbol,
                        Wt = n.Uint8Array,
                        Nt = qt ? qt.allocUnsafe : i,
                        Vt = ne(Ft.getPrototypeOf, Ft),
                        Jt = Ft.create,
                        tn = It.propertyIsEnumerable,
                        rn = jt.splice,
                        un = zt ? zt.isConcatSpreadable : i,
                        an = zt ? zt.iterator : i,
                        cn = zt ? zt.toStringTag : i,
                        sn = function () {
                      try {
                        var t = fu(Ft, "defineProperty");
                        return t({}, "", {}), t;
                      } catch (t) {}
                    }(),
                        ln = n.clearTimeout !== on.clearTimeout && n.clearTimeout,
                        Pn = it && it.now !== on.Date.now && it.now,
                        Bn = n.setTimeout !== on.setTimeout && n.setTimeout,
                        se = At.ceil,
                        le = At.floor,
                        he = Ft.getOwnPropertySymbols,
                        pe = qt ? qt.isBuffer : i,
                        ve = n.isFinite,
                        ye = jt.join,
                        ge = ne(Ft.keys, Ft),
                        de = At.max,
                        _e = At.min,
                        we = it.now,
                        be = n.parseInt,
                        me = At.random,
                        ke = jt.reverse,
                        Ae = fu(n, "DataView"),
                        Fe = fu(n, "Map"),
                        Se = fu(n, "Promise"),
                        Ce = fu(n, "Set"),
                        xe = fu(n, "WeakMap"),
                        je = fu(Ft, "create"),
                        Oe = xe && new xe(),
                        Ie = {},
                        Pe = Uu(Ae),
                        Re = Uu(Fe),
                        Ee = Uu(Se),
                        Me = Uu(Ce),
                        Te = Uu(xe),
                        Le = zt ? zt.prototype : i,
                        De = Le ? Le.valueOf : i,
                        Ue = Le ? Le.toString : i;

                    function Be(t) {
                      if (ea(t) && !Go(t) && !(t instanceof Ne)) {
                        if (t instanceof We) return t;
                        if (Et.call(t, "__wrapped__")) return Bu(t);
                      }

                      return new We(t);
                    }

                    var qe = function () {
                      function t() {}

                      return function (n) {
                        if (!na(n)) return {};
                        if (Jt) return Jt(n);
                        t.prototype = n;
                        var e = new t();
                        return t.prototype = i, e;
                      };
                    }();

                    function ze() {}

                    function We(t, n) {
                      this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!n, this.__index__ = 0, this.__values__ = i;
                    }

                    function Ne(t) {
                      this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = p, this.__views__ = [];
                    }

                    function $e(t) {
                      var n = -1,
                          e = null == t ? 0 : t.length;

                      for (this.clear(); ++n < e;) {
                        var r = t[n];
                        this.set(r[0], r[1]);
                      }
                    }

                    function Ge(t) {
                      var n = -1,
                          e = null == t ? 0 : t.length;

                      for (this.clear(); ++n < e;) {
                        var r = t[n];
                        this.set(r[0], r[1]);
                      }
                    }

                    function Ve(t) {
                      var n = -1,
                          e = null == t ? 0 : t.length;

                      for (this.clear(); ++n < e;) {
                        var r = t[n];
                        this.set(r[0], r[1]);
                      }
                    }

                    function Ze(t) {
                      var n = -1,
                          e = null == t ? 0 : t.length;

                      for (this.__data__ = new Ve(); ++n < e;) {
                        this.add(t[n]);
                      }
                    }

                    function Je(t) {
                      var n = this.__data__ = new Ge(t);
                      this.size = n.size;
                    }

                    function Ke(t, n) {
                      var e = Go(t),
                          r = !e && $o(t),
                          i = !e && !r && Ko(t),
                          u = !e && !r && !i && sa(t),
                          o = e || r || i || u,
                          a = o ? Wn(t.length, Ct) : [],
                          c = a.length;

                      for (var f in t) {
                        !n && !Et.call(t, f) || o && ("length" == f || i && ("offset" == f || "parent" == f) || u && ("buffer" == f || "byteLength" == f || "byteOffset" == f) || gu(f, c)) || a.push(f);
                      }

                      return a;
                    }

                    function He(t) {
                      var n = t.length;
                      return n ? t[Vr(0, n - 1)] : i;
                    }

                    function Qe(t, n) {
                      return Eu(xi(t), or(n, 0, t.length));
                    }

                    function Ye(t) {
                      return Eu(xi(t));
                    }

                    function Xe(t, n, e) {
                      (e !== i && !zo(t[n], e) || e === i && !(n in t)) && ir(t, n, e);
                    }

                    function tr(t, n, e) {
                      var r = t[n];
                      Et.call(t, n) && zo(r, e) && (e !== i || n in t) || ir(t, n, e);
                    }

                    function nr(t, n) {
                      for (var e = t.length; e--;) {
                        if (zo(t[e][0], n)) return e;
                      }

                      return -1;
                    }

                    function er(t, n, e, r) {
                      return lr(t, function (t, i, u) {
                        n(r, t, e(t), u);
                      }), r;
                    }

                    function rr(t, n) {
                      return t && ji(n, Ra(n), t);
                    }

                    function ir(t, n, e) {
                      "__proto__" == n && sn ? sn(t, n, {
                        configurable: !0,
                        enumerable: !0,
                        value: e,
                        writable: !0
                      }) : t[n] = e;
                    }

                    function ur(t, n) {
                      for (var e = -1, u = n.length, o = r(u), a = null == t; ++e < u;) {
                        o[e] = a ? i : xa(t, n[e]);
                      }

                      return o;
                    }

                    function or(t, n, e) {
                      return t == t && (e !== i && (t = t <= e ? t : e), n !== i && (t = t >= n ? t : n)), t;
                    }

                    function ar(t, n, e, r, u, o) {
                      var a,
                          c = 1 & n,
                          f = 2 & n,
                          s = 4 & n;
                      if (e && (a = u ? e(t, r, u, o) : e(t)), a !== i) return a;
                      if (!na(t)) return t;
                      var l = Go(t);

                      if (l) {
                        if (a = function (t) {
                          var n = t.length,
                              e = new t.constructor(n);
                          return n && "string" == typeof t[0] && Et.call(t, "index") && (e.index = t.index, e.input = t.input), e;
                        }(t), !c) return xi(t, a);
                      } else {
                        var h = hu(t),
                            p = h == b || h == m;
                        if (Ko(t)) return mi(t, c);

                        if (h == F || h == y || p && !u) {
                          if (a = f || p ? {} : vu(t), !c) return f ? function (t, n) {
                            return ji(t, lu(t), n);
                          }(t, function (t, n) {
                            return t && ji(n, Ea(n), t);
                          }(a, t)) : function (t, n) {
                            return ji(t, su(t), n);
                          }(t, rr(a, t));
                        } else {
                          if (!Xt[h]) return u ? t : {};

                          a = function (t, n, e) {
                            var r,
                                i = t.constructor;

                            switch (n) {
                              case P:
                                return ki(t);

                              case d:
                              case _:
                                return new i(+t);

                              case R:
                                return function (t, n) {
                                  var e = n ? ki(t.buffer) : t.buffer;
                                  return new t.constructor(e, t.byteOffset, t.byteLength);
                                }(t, e);

                              case E:
                              case M:
                              case T:
                              case L:
                              case D:
                              case U:
                              case B:
                              case q:
                              case z:
                                return Ai(t, e);

                              case k:
                                return new i();

                              case A:
                              case j:
                                return new i(t);

                              case C:
                                return function (t) {
                                  var n = new t.constructor(t.source, ht.exec(t));
                                  return n.lastIndex = t.lastIndex, n;
                                }(t);

                              case x:
                                return new i();

                              case O:
                                return r = t, De ? Ft(De.call(r)) : {};
                            }
                          }(t, h, c);
                        }
                      }

                      o || (o = new Je());
                      var v = o.get(t);
                      if (v) return v;
                      o.set(t, a), aa(t) ? t.forEach(function (r) {
                        a.add(ar(r, n, e, r, t, o));
                      }) : ra(t) && t.forEach(function (r, i) {
                        a.set(i, ar(r, n, e, i, t, o));
                      });
                      var g = l ? i : (s ? f ? eu : nu : f ? Ea : Ra)(t);
                      return bn(g || t, function (r, i) {
                        g && (r = t[i = r]), tr(a, i, ar(r, n, e, i, t, o));
                      }), a;
                    }

                    function cr(t, n, e) {
                      var r = e.length;
                      if (null == t) return !r;

                      for (t = Ft(t); r--;) {
                        var u = e[r],
                            o = n[u],
                            a = t[u];
                        if (a === i && !(u in t) || !o(a)) return !1;
                      }

                      return !0;
                    }

                    function fr(t, n, e) {
                      if ("function" != typeof t) throw new xt(u);
                      return Ou(function () {
                        t.apply(i, e);
                      }, n);
                    }

                    function sr(t, n, e, r) {
                      var i = -1,
                          u = Fn,
                          o = !0,
                          a = t.length,
                          c = [],
                          f = n.length;
                      if (!a) return c;
                      e && (n = Cn(n, $n(e))), r ? (u = Sn, o = !1) : n.length >= 200 && (u = Vn, o = !1, n = new Ze(n));

                      t: for (; ++i < a;) {
                        var s = t[i],
                            l = null == e ? s : e(s);

                        if (s = r || 0 !== s ? s : 0, o && l == l) {
                          for (var h = f; h--;) {
                            if (n[h] === l) continue t;
                          }

                          c.push(s);
                        } else u(n, l, r) || c.push(s);
                      }

                      return c;
                    }

                    Be.templateSettings = {
                      escape: K,
                      evaluate: H,
                      interpolate: Q,
                      variable: "",
                      imports: {
                        _: Be
                      }
                    }, Be.prototype = ze.prototype, Be.prototype.constructor = Be, We.prototype = qe(ze.prototype), We.prototype.constructor = We, Ne.prototype = qe(ze.prototype), Ne.prototype.constructor = Ne, $e.prototype.clear = function () {
                      this.__data__ = je ? je(null) : {}, this.size = 0;
                    }, $e.prototype["delete"] = function (t) {
                      var n = this.has(t) && delete this.__data__[t];
                      return this.size -= n ? 1 : 0, n;
                    }, $e.prototype.get = function (t) {
                      var n = this.__data__;

                      if (je) {
                        var e = n[t];
                        return e === o ? i : e;
                      }

                      return Et.call(n, t) ? n[t] : i;
                    }, $e.prototype.has = function (t) {
                      var n = this.__data__;
                      return je ? n[t] !== i : Et.call(n, t);
                    }, $e.prototype.set = function (t, n) {
                      var e = this.__data__;
                      return this.size += this.has(t) ? 0 : 1, e[t] = je && n === i ? o : n, this;
                    }, Ge.prototype.clear = function () {
                      this.__data__ = [], this.size = 0;
                    }, Ge.prototype["delete"] = function (t) {
                      var n = this.__data__,
                          e = nr(n, t);
                      return !(e < 0 || (e == n.length - 1 ? n.pop() : rn.call(n, e, 1), --this.size, 0));
                    }, Ge.prototype.get = function (t) {
                      var n = this.__data__,
                          e = nr(n, t);
                      return e < 0 ? i : n[e][1];
                    }, Ge.prototype.has = function (t) {
                      return nr(this.__data__, t) > -1;
                    }, Ge.prototype.set = function (t, n) {
                      var e = this.__data__,
                          r = nr(e, t);
                      return r < 0 ? (++this.size, e.push([t, n])) : e[r][1] = n, this;
                    }, Ve.prototype.clear = function () {
                      this.size = 0, this.__data__ = {
                        hash: new $e(),
                        map: new (Fe || Ge)(),
                        string: new $e()
                      };
                    }, Ve.prototype["delete"] = function (t) {
                      var n = au(this, t)["delete"](t);
                      return this.size -= n ? 1 : 0, n;
                    }, Ve.prototype.get = function (t) {
                      return au(this, t).get(t);
                    }, Ve.prototype.has = function (t) {
                      return au(this, t).has(t);
                    }, Ve.prototype.set = function (t, n) {
                      var e = au(this, t),
                          r = e.size;
                      return e.set(t, n), this.size += e.size == r ? 0 : 1, this;
                    }, Ze.prototype.add = Ze.prototype.push = function (t) {
                      return this.__data__.set(t, o), this;
                    }, Ze.prototype.has = function (t) {
                      return this.__data__.has(t);
                    }, Je.prototype.clear = function () {
                      this.__data__ = new Ge(), this.size = 0;
                    }, Je.prototype["delete"] = function (t) {
                      var n = this.__data__,
                          e = n["delete"](t);
                      return this.size = n.size, e;
                    }, Je.prototype.get = function (t) {
                      return this.__data__.get(t);
                    }, Je.prototype.has = function (t) {
                      return this.__data__.has(t);
                    }, Je.prototype.set = function (t, n) {
                      var e = this.__data__;

                      if (e instanceof Ge) {
                        var r = e.__data__;
                        if (!Fe || r.length < 199) return r.push([t, n]), this.size = ++e.size, this;
                        e = this.__data__ = new Ve(r);
                      }

                      return e.set(t, n), this.size = e.size, this;
                    };
                    var lr = Pi(wr),
                        hr = Pi(br, !0);

                    function pr(t, n) {
                      var e = !0;
                      return lr(t, function (t, r, i) {
                        return e = !!n(t, r, i);
                      }), e;
                    }

                    function vr(t, n, e) {
                      for (var r = -1, u = t.length; ++r < u;) {
                        var o = t[r],
                            a = n(o);
                        if (null != a && (c === i ? a == a && !fa(a) : e(a, c))) var c = a,
                            f = o;
                      }

                      return f;
                    }

                    function yr(t, n) {
                      var e = [];
                      return lr(t, function (t, r, i) {
                        n(t, r, i) && e.push(t);
                      }), e;
                    }

                    function gr(t, n, e, r, i) {
                      var u = -1,
                          o = t.length;

                      for (e || (e = yu), i || (i = []); ++u < o;) {
                        var a = t[u];
                        n > 0 && e(a) ? n > 1 ? gr(a, n - 1, e, r, i) : xn(i, a) : r || (i[i.length] = a);
                      }

                      return i;
                    }

                    var dr = Ri(),
                        _r = Ri(!0);

                    function wr(t, n) {
                      return t && dr(t, n, Ra);
                    }

                    function br(t, n) {
                      return t && _r(t, n, Ra);
                    }

                    function mr(t, n) {
                      return An(n, function (n) {
                        return Yo(t[n]);
                      });
                    }

                    function kr(t, n) {
                      for (var e = 0, r = (n = di(n, t)).length; null != t && e < r;) {
                        t = t[Du(n[e++])];
                      }

                      return e && e == r ? t : i;
                    }

                    function Ar(t, n, e) {
                      var r = n(t);
                      return Go(t) ? r : xn(r, e(t));
                    }

                    function Fr(t) {
                      return null == t ? t === i ? "[object Undefined]" : "[object Null]" : cn && cn in Ft(t) ? function (t) {
                        var n = Et.call(t, cn),
                            e = t[cn];

                        try {
                          t[cn] = i;
                          var r = !0;
                        } catch (t) {}

                        var u = Lt.call(t);
                        return r && (n ? t[cn] = e : delete t[cn]), u;
                      }(t) : function (t) {
                        return Lt.call(t);
                      }(t);
                    }

                    function Sr(t, n) {
                      return t > n;
                    }

                    function Cr(t, n) {
                      return null != t && Et.call(t, n);
                    }

                    function xr(t, n) {
                      return null != t && n in Ft(t);
                    }

                    function jr(t, n, e) {
                      for (var u = e ? Sn : Fn, o = t[0].length, a = t.length, c = a, f = r(a), s = 1 / 0, l = []; c--;) {
                        var h = t[c];
                        c && n && (h = Cn(h, $n(n))), s = _e(h.length, s), f[c] = !e && (n || o >= 120 && h.length >= 120) ? new Ze(c && h) : i;
                      }

                      h = t[0];
                      var p = -1,
                          v = f[0];

                      t: for (; ++p < o && l.length < s;) {
                        var y = h[p],
                            g = n ? n(y) : y;

                        if (y = e || 0 !== y ? y : 0, !(v ? Vn(v, g) : u(l, g, e))) {
                          for (c = a; --c;) {
                            var d = f[c];
                            if (!(d ? Vn(d, g) : u(t[c], g, e))) continue t;
                          }

                          v && v.push(g), l.push(y);
                        }
                      }

                      return l;
                    }

                    function Or(t, n, e) {
                      var r = null == (t = Su(t, n = di(n, t))) ? t : t[Du(Hu(n))];
                      return null == r ? i : _n(r, t, e);
                    }

                    function Ir(t) {
                      return ea(t) && Fr(t) == y;
                    }

                    function Pr(t, n, e, r, u) {
                      return t === n || (null == t || null == n || !ea(t) && !ea(n) ? t != t && n != n : function (t, n, e, r, u, o) {
                        var a = Go(t),
                            c = Go(n),
                            f = a ? g : hu(t),
                            s = c ? g : hu(n),
                            l = (f = f == y ? F : f) == F,
                            h = (s = s == y ? F : s) == F,
                            p = f == s;

                        if (p && Ko(t)) {
                          if (!Ko(n)) return !1;
                          a = !0, l = !1;
                        }

                        if (p && !l) return o || (o = new Je()), a || sa(t) ? Xi(t, n, e, r, u, o) : function (t, n, e, r, i, u, o) {
                          switch (e) {
                            case R:
                              if (t.byteLength != n.byteLength || t.byteOffset != n.byteOffset) return !1;
                              t = t.buffer, n = n.buffer;

                            case P:
                              return !(t.byteLength != n.byteLength || !u(new Wt(t), new Wt(n)));

                            case d:
                            case _:
                            case A:
                              return zo(+t, +n);

                            case w:
                              return t.name == n.name && t.message == n.message;

                            case C:
                            case j:
                              return t == n + "";

                            case k:
                              var a = te;

                            case x:
                              var c = 1 & r;
                              if (a || (a = re), t.size != n.size && !c) return !1;
                              var f = o.get(t);
                              if (f) return f == n;
                              r |= 2, o.set(t, n);
                              var s = Xi(a(t), a(n), r, i, u, o);
                              return o["delete"](t), s;

                            case O:
                              if (De) return De.call(t) == De.call(n);
                          }

                          return !1;
                        }(t, n, f, e, r, u, o);

                        if (!(1 & e)) {
                          var v = l && Et.call(t, "__wrapped__"),
                              b = h && Et.call(n, "__wrapped__");

                          if (v || b) {
                            var m = v ? t.value() : t,
                                S = b ? n.value() : n;
                            return o || (o = new Je()), u(m, S, e, r, o);
                          }
                        }

                        return !!p && (o || (o = new Je()), function (t, n, e, r, u, o) {
                          var a = 1 & e,
                              c = nu(t),
                              f = c.length;
                          if (f != nu(n).length && !a) return !1;

                          for (var s = f; s--;) {
                            var l = c[s];
                            if (!(a ? l in n : Et.call(n, l))) return !1;
                          }

                          var h = o.get(t),
                              p = o.get(n);
                          if (h && p) return h == n && p == t;
                          var v = !0;
                          o.set(t, n), o.set(n, t);

                          for (var y = a; ++s < f;) {
                            var g = t[l = c[s]],
                                d = n[l];
                            if (r) var _ = a ? r(d, g, l, n, t, o) : r(g, d, l, t, n, o);

                            if (!(_ === i ? g === d || u(g, d, e, r, o) : _)) {
                              v = !1;
                              break;
                            }

                            y || (y = "constructor" == l);
                          }

                          if (v && !y) {
                            var w = t.constructor,
                                b = n.constructor;
                            w == b || !("constructor" in t) || !("constructor" in n) || "function" == typeof w && w instanceof w && "function" == typeof b && b instanceof b || (v = !1);
                          }

                          return o["delete"](t), o["delete"](n), v;
                        }(t, n, e, r, u, o));
                      }(t, n, e, r, Pr, u));
                    }

                    function Rr(t, n, e, r) {
                      var u = e.length,
                          o = u,
                          a = !r;
                      if (null == t) return !o;

                      for (t = Ft(t); u--;) {
                        var c = e[u];
                        if (a && c[2] ? c[1] !== t[c[0]] : !(c[0] in t)) return !1;
                      }

                      for (; ++u < o;) {
                        var f = (c = e[u])[0],
                            s = t[f],
                            l = c[1];

                        if (a && c[2]) {
                          if (s === i && !(f in t)) return !1;
                        } else {
                          var h = new Je();
                          if (r) var p = r(s, l, f, t, n, h);
                          if (!(p === i ? Pr(l, s, 3, r, h) : p)) return !1;
                        }
                      }

                      return !0;
                    }

                    function Er(t) {
                      return !(!na(t) || (n = t, Tt && Tt in n)) && (Yo(t) ? Bt : yt).test(Uu(t));
                      var n;
                    }

                    function Mr(t) {
                      return "function" == typeof t ? t : null == t ? ic : "object" == typeof t ? Go(t) ? Br(t[0], t[1]) : Ur(t) : pc(t);
                    }

                    function Tr(t) {
                      if (!mu(t)) return ge(t);
                      var n = [];

                      for (var e in Ft(t)) {
                        Et.call(t, e) && "constructor" != e && n.push(e);
                      }

                      return n;
                    }

                    function Lr(t, n) {
                      return t < n;
                    }

                    function Dr(t, n) {
                      var e = -1,
                          i = Zo(t) ? r(t.length) : [];
                      return lr(t, function (t, r, u) {
                        i[++e] = n(t, r, u);
                      }), i;
                    }

                    function Ur(t) {
                      var n = cu(t);
                      return 1 == n.length && n[0][2] ? Au(n[0][0], n[0][1]) : function (e) {
                        return e === t || Rr(e, t, n);
                      };
                    }

                    function Br(t, n) {
                      return _u(t) && ku(n) ? Au(Du(t), n) : function (e) {
                        var r = xa(e, t);
                        return r === i && r === n ? ja(e, t) : Pr(n, r, 3);
                      };
                    }

                    function qr(t, n, e, r, u) {
                      t !== n && dr(n, function (o, a) {
                        if (u || (u = new Je()), na(o)) !function (t, n, e, r, u, o, a) {
                          var c = xu(t, e),
                              f = xu(n, e),
                              s = a.get(f);
                          if (s) Xe(t, e, s);else {
                            var l = o ? o(c, f, e + "", t, n, a) : i,
                                h = l === i;

                            if (h) {
                              var p = Go(f),
                                  v = !p && Ko(f),
                                  y = !p && !v && sa(f);
                              l = f, p || v || y ? Go(c) ? l = c : Jo(c) ? l = xi(c) : v ? (h = !1, l = mi(f, !0)) : y ? (h = !1, l = Ai(f, !0)) : l = [] : ua(f) || $o(f) ? (l = c, $o(c) ? l = _a(c) : na(c) && !Yo(c) || (l = vu(f))) : h = !1;
                            }

                            h && (a.set(f, l), u(l, f, r, o, a), a["delete"](f)), Xe(t, e, l);
                          }
                        }(t, n, a, e, qr, r, u);else {
                          var c = r ? r(xu(t, a), o, a + "", t, n, u) : i;
                          c === i && (c = o), Xe(t, a, c);
                        }
                      }, Ea);
                    }

                    function zr(t, n) {
                      var e = t.length;
                      if (e) return gu(n += n < 0 ? e : 0, e) ? t[n] : i;
                    }

                    function Wr(t, n, e) {
                      n = n.length ? Cn(n, function (t) {
                        return Go(t) ? function (n) {
                          return kr(n, 1 === t.length ? t[0] : t);
                        } : t;
                      }) : [ic];
                      var r = -1;
                      return n = Cn(n, $n(ou())), function (t, n) {
                        var r = t.length;

                        for (t.sort(function (t, n) {
                          return function (t, n, e) {
                            for (var r = -1, i = t.criteria, u = n.criteria, o = i.length, a = e.length; ++r < o;) {
                              var c = Fi(i[r], u[r]);
                              if (c) return r >= a ? c : c * ("desc" == e[r] ? -1 : 1);
                            }

                            return t.index - n.index;
                          }(t, n, e);
                        }); r--;) {
                          t[r] = t[r].value;
                        }

                        return t;
                      }(Dr(t, function (t, e, i) {
                        return {
                          criteria: Cn(n, function (n) {
                            return n(t);
                          }),
                          index: ++r,
                          value: t
                        };
                      }));
                    }

                    function Nr(t, n, e) {
                      for (var r = -1, i = n.length, u = {}; ++r < i;) {
                        var o = n[r],
                            a = kr(t, o);
                        e(a, o) && Qr(u, di(o, t), a);
                      }

                      return u;
                    }

                    function $r(t, n, e, r) {
                      var i = r ? Tn : Mn,
                          u = -1,
                          o = n.length,
                          a = t;

                      for (t === n && (n = xi(n)), e && (a = Cn(t, $n(e))); ++u < o;) {
                        for (var c = 0, f = n[u], s = e ? e(f) : f; (c = i(a, s, c, r)) > -1;) {
                          a !== t && rn.call(a, c, 1), rn.call(t, c, 1);
                        }
                      }

                      return t;
                    }

                    function Gr(t, n) {
                      for (var e = t ? n.length : 0, r = e - 1; e--;) {
                        var i = n[e];

                        if (e == r || i !== u) {
                          var u = i;
                          gu(i) ? rn.call(t, i, 1) : fi(t, i);
                        }
                      }

                      return t;
                    }

                    function Vr(t, n) {
                      return t + le(me() * (n - t + 1));
                    }

                    function Zr(t, n) {
                      var e = "";
                      if (!t || n < 1 || n > l) return e;

                      do {
                        n % 2 && (e += t), (n = le(n / 2)) && (t += t);
                      } while (n);

                      return e;
                    }

                    function Jr(t, n) {
                      return Iu(Fu(t, n, ic), t + "");
                    }

                    function Kr(t) {
                      return He(za(t));
                    }

                    function Hr(t, n) {
                      var e = za(t);
                      return Eu(e, or(n, 0, e.length));
                    }

                    function Qr(t, n, e, r) {
                      if (!na(t)) return t;

                      for (var u = -1, o = (n = di(n, t)).length, a = o - 1, c = t; null != c && ++u < o;) {
                        var f = Du(n[u]),
                            s = e;
                        if ("__proto__" === f || "constructor" === f || "prototype" === f) return t;

                        if (u != a) {
                          var l = c[f];
                          (s = r ? r(l, f, c) : i) === i && (s = na(l) ? l : gu(n[u + 1]) ? [] : {});
                        }

                        tr(c, f, s), c = c[f];
                      }

                      return t;
                    }

                    var Yr = Oe ? function (t, n) {
                      return Oe.set(t, n), t;
                    } : ic,
                        Xr = sn ? function (t, n) {
                      return sn(t, "toString", {
                        configurable: !0,
                        enumerable: !1,
                        value: nc(n),
                        writable: !0
                      });
                    } : ic;

                    function ti(t) {
                      return Eu(za(t));
                    }

                    function ni(t, n, e) {
                      var i = -1,
                          u = t.length;
                      n < 0 && (n = -n > u ? 0 : u + n), (e = e > u ? u : e) < 0 && (e += u), u = n > e ? 0 : e - n >>> 0, n >>>= 0;

                      for (var o = r(u); ++i < u;) {
                        o[i] = t[i + n];
                      }

                      return o;
                    }

                    function ei(t, n) {
                      var e;
                      return lr(t, function (t, r, i) {
                        return !(e = n(t, r, i));
                      }), !!e;
                    }

                    function ri(t, n, e) {
                      var r = 0,
                          i = null == t ? r : t.length;

                      if ("number" == typeof n && n == n && i <= 2147483647) {
                        for (; r < i;) {
                          var u = r + i >>> 1,
                              o = t[u];
                          null !== o && !fa(o) && (e ? o <= n : o < n) ? r = u + 1 : i = u;
                        }

                        return i;
                      }

                      return ii(t, n, ic, e);
                    }

                    function ii(t, n, e, r) {
                      var u = 0,
                          o = null == t ? 0 : t.length;
                      if (0 === o) return 0;

                      for (var a = (n = e(n)) != n, c = null === n, f = fa(n), s = n === i; u < o;) {
                        var l = le((u + o) / 2),
                            h = e(t[l]),
                            p = h !== i,
                            v = null === h,
                            y = h == h,
                            g = fa(h);
                        if (a) var d = r || y;else d = s ? y && (r || p) : c ? y && p && (r || !v) : f ? y && p && !v && (r || !g) : !v && !g && (r ? h <= n : h < n);
                        d ? u = l + 1 : o = l;
                      }

                      return _e(o, 4294967294);
                    }

                    function ui(t, n) {
                      for (var e = -1, r = t.length, i = 0, u = []; ++e < r;) {
                        var o = t[e],
                            a = n ? n(o) : o;

                        if (!e || !zo(a, c)) {
                          var c = a;
                          u[i++] = 0 === o ? 0 : o;
                        }
                      }

                      return u;
                    }

                    function oi(t) {
                      return "number" == typeof t ? t : fa(t) ? h : +t;
                    }

                    function ai(t) {
                      if ("string" == typeof t) return t;
                      if (Go(t)) return Cn(t, ai) + "";
                      if (fa(t)) return Ue ? Ue.call(t) : "";
                      var n = t + "";
                      return "0" == n && 1 / t == -1 / 0 ? "-0" : n;
                    }

                    function ci(t, n, e) {
                      var r = -1,
                          i = Fn,
                          u = t.length,
                          o = !0,
                          a = [],
                          c = a;
                      if (e) o = !1, i = Sn;else if (u >= 200) {
                        var f = n ? null : Zi(t);
                        if (f) return re(f);
                        o = !1, i = Vn, c = new Ze();
                      } else c = n ? [] : a;

                      t: for (; ++r < u;) {
                        var s = t[r],
                            l = n ? n(s) : s;

                        if (s = e || 0 !== s ? s : 0, o && l == l) {
                          for (var h = c.length; h--;) {
                            if (c[h] === l) continue t;
                          }

                          n && c.push(l), a.push(s);
                        } else i(c, l, e) || (c !== a && c.push(l), a.push(s));
                      }

                      return a;
                    }

                    function fi(t, n) {
                      return null == (t = Su(t, n = di(n, t))) || delete t[Du(Hu(n))];
                    }

                    function si(t, n, e, r) {
                      return Qr(t, n, e(kr(t, n)), r);
                    }

                    function li(t, n, e, r) {
                      for (var i = t.length, u = r ? i : -1; (r ? u-- : ++u < i) && n(t[u], u, t);) {}

                      return e ? ni(t, r ? 0 : u, r ? u + 1 : i) : ni(t, r ? u + 1 : 0, r ? i : u);
                    }

                    function hi(t, n) {
                      var e = t;
                      return e instanceof Ne && (e = e.value()), jn(n, function (t, n) {
                        return n.func.apply(n.thisArg, xn([t], n.args));
                      }, e);
                    }

                    function pi(t, n, e) {
                      var i = t.length;
                      if (i < 2) return i ? ci(t[0]) : [];

                      for (var u = -1, o = r(i); ++u < i;) {
                        for (var a = t[u], c = -1; ++c < i;) {
                          c != u && (o[u] = sr(o[u] || a, t[c], n, e));
                        }
                      }

                      return ci(gr(o, 1), n, e);
                    }

                    function vi(t, n, e) {
                      for (var r = -1, u = t.length, o = n.length, a = {}; ++r < u;) {
                        var c = r < o ? n[r] : i;
                        e(a, t[r], c);
                      }

                      return a;
                    }

                    function yi(t) {
                      return Jo(t) ? t : [];
                    }

                    function gi(t) {
                      return "function" == typeof t ? t : ic;
                    }

                    function di(t, n) {
                      return Go(t) ? t : _u(t, n) ? [t] : Lu(wa(t));
                    }

                    var _i = Jr;

                    function wi(t, n, e) {
                      var r = t.length;
                      return e = e === i ? r : e, !n && e >= r ? t : ni(t, n, e);
                    }

                    var bi = ln || function (t) {
                      return on.clearTimeout(t);
                    };

                    function mi(t, n) {
                      if (n) return t.slice();
                      var e = t.length,
                          r = Nt ? Nt(e) : new t.constructor(e);
                      return t.copy(r), r;
                    }

                    function ki(t) {
                      var n = new t.constructor(t.byteLength);
                      return new Wt(n).set(new Wt(t)), n;
                    }

                    function Ai(t, n) {
                      var e = n ? ki(t.buffer) : t.buffer;
                      return new t.constructor(e, t.byteOffset, t.length);
                    }

                    function Fi(t, n) {
                      if (t !== n) {
                        var e = t !== i,
                            r = null === t,
                            u = t == t,
                            o = fa(t),
                            a = n !== i,
                            c = null === n,
                            f = n == n,
                            s = fa(n);
                        if (!c && !s && !o && t > n || o && a && f && !c && !s || r && a && f || !e && f || !u) return 1;
                        if (!r && !o && !s && t < n || s && e && u && !r && !o || c && e && u || !a && u || !f) return -1;
                      }

                      return 0;
                    }

                    function Si(t, n, e, i) {
                      for (var u = -1, o = t.length, a = e.length, c = -1, f = n.length, s = de(o - a, 0), l = r(f + s), h = !i; ++c < f;) {
                        l[c] = n[c];
                      }

                      for (; ++u < a;) {
                        (h || u < o) && (l[e[u]] = t[u]);
                      }

                      for (; s--;) {
                        l[c++] = t[u++];
                      }

                      return l;
                    }

                    function Ci(t, n, e, i) {
                      for (var u = -1, o = t.length, a = -1, c = e.length, f = -1, s = n.length, l = de(o - c, 0), h = r(l + s), p = !i; ++u < l;) {
                        h[u] = t[u];
                      }

                      for (var v = u; ++f < s;) {
                        h[v + f] = n[f];
                      }

                      for (; ++a < c;) {
                        (p || u < o) && (h[v + e[a]] = t[u++]);
                      }

                      return h;
                    }

                    function xi(t, n) {
                      var e = -1,
                          i = t.length;

                      for (n || (n = r(i)); ++e < i;) {
                        n[e] = t[e];
                      }

                      return n;
                    }

                    function ji(t, n, e, r) {
                      var u = !e;
                      e || (e = {});

                      for (var o = -1, a = n.length; ++o < a;) {
                        var c = n[o],
                            f = r ? r(e[c], t[c], c, e, t) : i;
                        f === i && (f = t[c]), u ? ir(e, c, f) : tr(e, c, f);
                      }

                      return e;
                    }

                    function Oi(t, n) {
                      return function (e, r) {
                        var i = Go(e) ? wn : er,
                            u = n ? n() : {};
                        return i(e, t, ou(r, 2), u);
                      };
                    }

                    function Ii(t) {
                      return Jr(function (n, e) {
                        var r = -1,
                            u = e.length,
                            o = u > 1 ? e[u - 1] : i,
                            a = u > 2 ? e[2] : i;

                        for (o = t.length > 3 && "function" == typeof o ? (u--, o) : i, a && du(e[0], e[1], a) && (o = u < 3 ? i : o, u = 1), n = Ft(n); ++r < u;) {
                          var c = e[r];
                          c && t(n, c, r, o);
                        }

                        return n;
                      });
                    }

                    function Pi(t, n) {
                      return function (e, r) {
                        if (null == e) return e;
                        if (!Zo(e)) return t(e, r);

                        for (var i = e.length, u = n ? i : -1, o = Ft(e); (n ? u-- : ++u < i) && !1 !== r(o[u], u, o);) {}

                        return e;
                      };
                    }

                    function Ri(t) {
                      return function (n, e, r) {
                        for (var i = -1, u = Ft(n), o = r(n), a = o.length; a--;) {
                          var c = o[t ? a : ++i];
                          if (!1 === e(u[c], c, u)) break;
                        }

                        return n;
                      };
                    }

                    function Ei(t) {
                      return function (n) {
                        var e = Xn(n = wa(n)) ? oe(n) : i,
                            r = e ? e[0] : n.charAt(0),
                            u = e ? wi(e, 1).join("") : n.slice(1);
                        return r[t]() + u;
                      };
                    }

                    function Mi(t) {
                      return function (n) {
                        return jn(Ya($a(n).replace($t, "")), t, "");
                      };
                    }

                    function Ti(t) {
                      return function () {
                        var n = arguments;

                        switch (n.length) {
                          case 0:
                            return new t();

                          case 1:
                            return new t(n[0]);

                          case 2:
                            return new t(n[0], n[1]);

                          case 3:
                            return new t(n[0], n[1], n[2]);

                          case 4:
                            return new t(n[0], n[1], n[2], n[3]);

                          case 5:
                            return new t(n[0], n[1], n[2], n[3], n[4]);

                          case 6:
                            return new t(n[0], n[1], n[2], n[3], n[4], n[5]);

                          case 7:
                            return new t(n[0], n[1], n[2], n[3], n[4], n[5], n[6]);
                        }

                        var e = qe(t.prototype),
                            r = t.apply(e, n);
                        return na(r) ? r : e;
                      };
                    }

                    function Li(t) {
                      return function (n, e, r) {
                        var u = Ft(n);

                        if (!Zo(n)) {
                          var o = ou(e, 3);
                          n = Ra(n), e = function e(t) {
                            return o(u[t], t, u);
                          };
                        }

                        var a = t(n, e, r);
                        return a > -1 ? u[o ? n[a] : a] : i;
                      };
                    }

                    function Di(t) {
                      return tu(function (n) {
                        var e = n.length,
                            r = e,
                            o = We.prototype.thru;

                        for (t && n.reverse(); r--;) {
                          var a = n[r];
                          if ("function" != typeof a) throw new xt(u);
                          if (o && !c && "wrapper" == iu(a)) var c = new We([], !0);
                        }

                        for (r = c ? r : e; ++r < e;) {
                          var f = iu(a = n[r]),
                              s = "wrapper" == f ? ru(a) : i;
                          c = s && wu(s[0]) && 424 == s[1] && !s[4].length && 1 == s[9] ? c[iu(s[0])].apply(c, s[3]) : 1 == a.length && wu(a) ? c[f]() : c.thru(a);
                        }

                        return function () {
                          var t = arguments,
                              r = t[0];
                          if (c && 1 == t.length && Go(r)) return c.plant(r).value();

                          for (var i = 0, u = e ? n[i].apply(this, t) : r; ++i < e;) {
                            u = n[i].call(this, u);
                          }

                          return u;
                        };
                      });
                    }

                    function Ui(t, n, e, u, o, a, c, s, l, h) {
                      var p = n & f,
                          v = 1 & n,
                          y = 2 & n,
                          g = 24 & n,
                          d = 512 & n,
                          _ = y ? i : Ti(t);

                      return function i() {
                        for (var f = arguments.length, w = r(f), b = f; b--;) {
                          w[b] = arguments[b];
                        }

                        if (g) var m = uu(i),
                            k = Kn(w, m);

                        if (u && (w = Si(w, u, o, g)), a && (w = Ci(w, a, c, g)), f -= k, g && f < h) {
                          var A = ee(w, m);
                          return Gi(t, n, Ui, i.placeholder, e, w, A, s, l, h - f);
                        }

                        var F = v ? e : this,
                            S = y ? F[t] : t;
                        return f = w.length, s ? w = Cu(w, s) : d && f > 1 && w.reverse(), p && l < f && (w.length = l), this && this !== on && this instanceof i && (S = _ || Ti(S)), S.apply(F, w);
                      };
                    }

                    function Bi(t, n) {
                      return function (e, r) {
                        return function (t, n, e, r) {
                          return wr(t, function (t, i, u) {
                            n(r, e(t), i, u);
                          }), r;
                        }(e, t, n(r), {});
                      };
                    }

                    function qi(t, n) {
                      return function (e, r) {
                        var u;
                        if (e === i && r === i) return n;

                        if (e !== i && (u = e), r !== i) {
                          if (u === i) return r;
                          "string" == typeof e || "string" == typeof r ? (e = ai(e), r = ai(r)) : (e = oi(e), r = oi(r)), u = t(e, r);
                        }

                        return u;
                      };
                    }

                    function zi(t) {
                      return tu(function (n) {
                        return n = Cn(n, $n(ou())), Jr(function (e) {
                          var r = this;
                          return t(n, function (t) {
                            return _n(t, r, e);
                          });
                        });
                      });
                    }

                    function Wi(t, n) {
                      var e = (n = n === i ? " " : ai(n)).length;
                      if (e < 2) return e ? Zr(n, t) : n;
                      var r = Zr(n, se(t / ue(n)));
                      return Xn(n) ? wi(oe(r), 0, t).join("") : r.slice(0, t);
                    }

                    function Ni(t) {
                      return function (n, e, u) {
                        return u && "number" != typeof u && du(n, e, u) && (e = u = i), n = va(n), e === i ? (e = n, n = 0) : e = va(e), function (t, n, e, i) {
                          for (var u = -1, o = de(se((n - t) / (e || 1)), 0), a = r(o); o--;) {
                            a[i ? o : ++u] = t, t += e;
                          }

                          return a;
                        }(n, e, u = u === i ? n < e ? 1 : -1 : va(u), t);
                      };
                    }

                    function $i(t) {
                      return function (n, e) {
                        return "string" == typeof n && "string" == typeof e || (n = da(n), e = da(e)), t(n, e);
                      };
                    }

                    function Gi(t, n, e, r, u, o, a, f, s, l) {
                      var h = 8 & n;
                      n |= h ? c : 64, 4 & (n &= ~(h ? 64 : c)) || (n &= -4);
                      var p = [t, n, u, h ? o : i, h ? a : i, h ? i : o, h ? i : a, f, s, l],
                          v = e.apply(i, p);
                      return wu(t) && ju(v, p), v.placeholder = r, Pu(v, t, n);
                    }

                    function Vi(t) {
                      var n = At[t];
                      return function (t, e) {
                        if (t = da(t), (e = null == e ? 0 : _e(ya(e), 292)) && ve(t)) {
                          var r = (wa(t) + "e").split("e");
                          return +((r = (wa(n(r[0] + "e" + (+r[1] + e))) + "e").split("e"))[0] + "e" + (+r[1] - e));
                        }

                        return n(t);
                      };
                    }

                    var Zi = Ce && 1 / re(new Ce([, -0]))[1] == s ? function (t) {
                      return new Ce(t);
                    } : fc;

                    function Ji(t) {
                      return function (n) {
                        var e = hu(n);
                        return e == k ? te(n) : e == x ? ie(n) : function (t, n) {
                          return Cn(n, function (n) {
                            return [n, t[n]];
                          });
                        }(n, t(n));
                      };
                    }

                    function Ki(t, n, e, o, s, l, h, p) {
                      var v = 2 & n;
                      if (!v && "function" != typeof t) throw new xt(u);
                      var y = o ? o.length : 0;

                      if (y || (n &= -97, o = s = i), h = h === i ? h : de(ya(h), 0), p = p === i ? p : ya(p), y -= s ? s.length : 0, 64 & n) {
                        var g = o,
                            d = s;
                        o = s = i;
                      }

                      var _ = v ? i : ru(t),
                          w = [t, n, e, o, s, g, d, l, h, p];

                      if (_ && function (t, n) {
                        var e = t[1],
                            r = n[1],
                            i = e | r,
                            u = i < 131,
                            o = r == f && 8 == e || r == f && 256 == e && t[7].length <= n[8] || 384 == r && n[7].length <= n[8] && 8 == e;
                        if (!u && !o) return t;
                        1 & r && (t[2] = n[2], i |= 1 & e ? 0 : 4);
                        var c = n[3];

                        if (c) {
                          var s = t[3];
                          t[3] = s ? Si(s, c, n[4]) : c, t[4] = s ? ee(t[3], a) : n[4];
                        }

                        (c = n[5]) && (s = t[5], t[5] = s ? Ci(s, c, n[6]) : c, t[6] = s ? ee(t[5], a) : n[6]), (c = n[7]) && (t[7] = c), r & f && (t[8] = null == t[8] ? n[8] : _e(t[8], n[8])), null == t[9] && (t[9] = n[9]), t[0] = n[0], t[1] = i;
                      }(w, _), t = w[0], n = w[1], e = w[2], o = w[3], s = w[4], !(p = w[9] = w[9] === i ? v ? 0 : t.length : de(w[9] - y, 0)) && 24 & n && (n &= -25), n && 1 != n) b = 8 == n || 16 == n ? function (t, n, e) {
                        var u = Ti(t);
                        return function o() {
                          for (var a = arguments.length, c = r(a), f = a, s = uu(o); f--;) {
                            c[f] = arguments[f];
                          }

                          var l = a < 3 && c[0] !== s && c[a - 1] !== s ? [] : ee(c, s);
                          return (a -= l.length) < e ? Gi(t, n, Ui, o.placeholder, i, c, l, i, i, e - a) : _n(this && this !== on && this instanceof o ? u : t, this, c);
                        };
                      }(t, n, p) : n != c && 33 != n || s.length ? Ui.apply(i, w) : function (t, n, e, i) {
                        var u = 1 & n,
                            o = Ti(t);
                        return function n() {
                          for (var a = -1, c = arguments.length, f = -1, s = i.length, l = r(s + c), h = this && this !== on && this instanceof n ? o : t; ++f < s;) {
                            l[f] = i[f];
                          }

                          for (; c--;) {
                            l[f++] = arguments[++a];
                          }

                          return _n(h, u ? e : this, l);
                        };
                      }(t, n, e, o);else var b = function (t, n, e) {
                        var r = 1 & n,
                            i = Ti(t);
                        return function n() {
                          return (this && this !== on && this instanceof n ? i : t).apply(r ? e : this, arguments);
                        };
                      }(t, n, e);
                      return Pu((_ ? Yr : ju)(b, w), t, n);
                    }

                    function Hi(t, n, e, r) {
                      return t === i || zo(t, It[e]) && !Et.call(r, e) ? n : t;
                    }

                    function Qi(t, n, e, r, u, o) {
                      return na(t) && na(n) && (o.set(n, t), qr(t, n, i, Qi, o), o["delete"](n)), t;
                    }

                    function Yi(t) {
                      return ua(t) ? i : t;
                    }

                    function Xi(t, n, e, r, u, o) {
                      var a = 1 & e,
                          c = t.length,
                          f = n.length;
                      if (c != f && !(a && f > c)) return !1;
                      var s = o.get(t),
                          l = o.get(n);
                      if (s && l) return s == n && l == t;
                      var h = -1,
                          p = !0,
                          v = 2 & e ? new Ze() : i;

                      for (o.set(t, n), o.set(n, t); ++h < c;) {
                        var y = t[h],
                            g = n[h];
                        if (r) var d = a ? r(g, y, h, n, t, o) : r(y, g, h, t, n, o);

                        if (d !== i) {
                          if (d) continue;
                          p = !1;
                          break;
                        }

                        if (v) {
                          if (!In(n, function (t, n) {
                            if (!Vn(v, n) && (y === t || u(y, t, e, r, o))) return v.push(n);
                          })) {
                            p = !1;
                            break;
                          }
                        } else if (y !== g && !u(y, g, e, r, o)) {
                          p = !1;
                          break;
                        }
                      }

                      return o["delete"](t), o["delete"](n), p;
                    }

                    function tu(t) {
                      return Iu(Fu(t, i, Gu), t + "");
                    }

                    function nu(t) {
                      return Ar(t, Ra, su);
                    }

                    function eu(t) {
                      return Ar(t, Ea, lu);
                    }

                    var ru = Oe ? function (t) {
                      return Oe.get(t);
                    } : fc;

                    function iu(t) {
                      for (var n = t.name + "", e = Ie[n], r = Et.call(Ie, n) ? e.length : 0; r--;) {
                        var i = e[r],
                            u = i.func;
                        if (null == u || u == t) return i.name;
                      }

                      return n;
                    }

                    function uu(t) {
                      return (Et.call(Be, "placeholder") ? Be : t).placeholder;
                    }

                    function ou() {
                      var t = Be.iteratee || uc;
                      return t = t === uc ? Mr : t, arguments.length ? t(arguments[0], arguments[1]) : t;
                    }

                    function au(t, n) {
                      var e,
                          r,
                          i = t.__data__;
                      return ("string" == (r = typeof (e = n)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== e : null === e) ? i["string" == typeof n ? "string" : "hash"] : i.map;
                    }

                    function cu(t) {
                      for (var n = Ra(t), e = n.length; e--;) {
                        var r = n[e],
                            i = t[r];
                        n[e] = [r, i, ku(i)];
                      }

                      return n;
                    }

                    function fu(t, n) {
                      var e = function (t, n) {
                        return null == t ? i : t[n];
                      }(t, n);

                      return Er(e) ? e : i;
                    }

                    var su = he ? function (t) {
                      return null == t ? [] : (t = Ft(t), An(he(t), function (n) {
                        return tn.call(t, n);
                      }));
                    } : gc,
                        lu = he ? function (t) {
                      for (var n = []; t;) {
                        xn(n, su(t)), t = Vt(t);
                      }

                      return n;
                    } : gc,
                        hu = Fr;

                    function pu(t, n, e) {
                      for (var r = -1, i = (n = di(n, t)).length, u = !1; ++r < i;) {
                        var o = Du(n[r]);
                        if (!(u = null != t && e(t, o))) break;
                        t = t[o];
                      }

                      return u || ++r != i ? u : !!(i = null == t ? 0 : t.length) && ta(i) && gu(o, i) && (Go(t) || $o(t));
                    }

                    function vu(t) {
                      return "function" != typeof t.constructor || mu(t) ? {} : qe(Vt(t));
                    }

                    function yu(t) {
                      return Go(t) || $o(t) || !!(un && t && t[un]);
                    }

                    function gu(t, n) {
                      var e = typeof t;
                      return !!(n = null == n ? l : n) && ("number" == e || "symbol" != e && dt.test(t)) && t > -1 && t % 1 == 0 && t < n;
                    }

                    function du(t, n, e) {
                      if (!na(e)) return !1;
                      var r = typeof n;
                      return !!("number" == r ? Zo(e) && gu(n, e.length) : "string" == r && n in e) && zo(e[n], t);
                    }

                    function _u(t, n) {
                      if (Go(t)) return !1;
                      var e = typeof t;
                      return !("number" != e && "symbol" != e && "boolean" != e && null != t && !fa(t)) || X.test(t) || !Y.test(t) || null != n && t in Ft(n);
                    }

                    function wu(t) {
                      var n = iu(t),
                          e = Be[n];
                      if ("function" != typeof e || !(n in Ne.prototype)) return !1;
                      if (t === e) return !0;
                      var r = ru(e);
                      return !!r && t === r[0];
                    }

                    (Ae && hu(new Ae(new ArrayBuffer(1))) != R || Fe && hu(new Fe()) != k || Se && hu(Se.resolve()) != S || Ce && hu(new Ce()) != x || xe && hu(new xe()) != I) && (hu = function hu(t) {
                      var n = Fr(t),
                          e = n == F ? t.constructor : i,
                          r = e ? Uu(e) : "";
                      if (r) switch (r) {
                        case Pe:
                          return R;

                        case Re:
                          return k;

                        case Ee:
                          return S;

                        case Me:
                          return x;

                        case Te:
                          return I;
                      }
                      return n;
                    });
                    var bu = Pt ? Yo : dc;

                    function mu(t) {
                      var n = t && t.constructor;
                      return t === ("function" == typeof n && n.prototype || It);
                    }

                    function ku(t) {
                      return t == t && !na(t);
                    }

                    function Au(t, n) {
                      return function (e) {
                        return null != e && e[t] === n && (n !== i || t in Ft(e));
                      };
                    }

                    function Fu(t, n, e) {
                      return n = de(n === i ? t.length - 1 : n, 0), function () {
                        for (var i = arguments, u = -1, o = de(i.length - n, 0), a = r(o); ++u < o;) {
                          a[u] = i[n + u];
                        }

                        u = -1;

                        for (var c = r(n + 1); ++u < n;) {
                          c[u] = i[u];
                        }

                        return c[n] = e(a), _n(t, this, c);
                      };
                    }

                    function Su(t, n) {
                      return n.length < 2 ? t : kr(t, ni(n, 0, -1));
                    }

                    function Cu(t, n) {
                      for (var e = t.length, r = _e(n.length, e), u = xi(t); r--;) {
                        var o = n[r];
                        t[r] = gu(o, e) ? u[o] : i;
                      }

                      return t;
                    }

                    function xu(t, n) {
                      if (("constructor" !== n || "function" != typeof t[n]) && "__proto__" != n) return t[n];
                    }

                    var ju = Ru(Yr),
                        Ou = Bn || function (t, n) {
                      return on.setTimeout(t, n);
                    },
                        Iu = Ru(Xr);

                    function Pu(t, n, e) {
                      var r = n + "";
                      return Iu(t, function (t, n) {
                        var e = n.length;
                        if (!e) return t;
                        var r = e - 1;
                        return n[r] = (e > 1 ? "& " : "") + n[r], n = n.join(e > 2 ? ", " : " "), t.replace(ut, "{\n/* [wrapped with " + n + "] */\n");
                      }(r, function (t, n) {
                        return bn(v, function (e) {
                          var r = "_." + e[0];
                          n & e[1] && !Fn(t, r) && t.push(r);
                        }), t.sort();
                      }(function (t) {
                        var n = t.match(ot);
                        return n ? n[1].split(at) : [];
                      }(r), e)));
                    }

                    function Ru(t) {
                      var n = 0,
                          e = 0;
                      return function () {
                        var r = we(),
                            u = 16 - (r - e);

                        if (e = r, u > 0) {
                          if (++n >= 800) return arguments[0];
                        } else n = 0;

                        return t.apply(i, arguments);
                      };
                    }

                    function Eu(t, n) {
                      var e = -1,
                          r = t.length,
                          u = r - 1;

                      for (n = n === i ? r : n; ++e < n;) {
                        var o = Vr(e, u),
                            a = t[o];
                        t[o] = t[e], t[e] = a;
                      }

                      return t.length = n, t;
                    }

                    var Mu,
                        Tu,
                        Lu = (Mu = To(function (t) {
                      var n = [];
                      return 46 === t.charCodeAt(0) && n.push(""), t.replace(tt, function (t, e, r, i) {
                        n.push(r ? i.replace(st, "$1") : e || t);
                      }), n;
                    }, function (t) {
                      return 500 === Tu.size && Tu.clear(), t;
                    }), Tu = Mu.cache, Mu);

                    function Du(t) {
                      if ("string" == typeof t || fa(t)) return t;
                      var n = t + "";
                      return "0" == n && 1 / t == -1 / 0 ? "-0" : n;
                    }

                    function Uu(t) {
                      if (null != t) {
                        try {
                          return Rt.call(t);
                        } catch (t) {}

                        try {
                          return t + "";
                        } catch (t) {}
                      }

                      return "";
                    }

                    function Bu(t) {
                      if (t instanceof Ne) return t.clone();
                      var n = new We(t.__wrapped__, t.__chain__);
                      return n.__actions__ = xi(t.__actions__), n.__index__ = t.__index__, n.__values__ = t.__values__, n;
                    }

                    var qu = Jr(function (t, n) {
                      return Jo(t) ? sr(t, gr(n, 1, Jo, !0)) : [];
                    }),
                        zu = Jr(function (t, n) {
                      var e = Hu(n);
                      return Jo(e) && (e = i), Jo(t) ? sr(t, gr(n, 1, Jo, !0), ou(e, 2)) : [];
                    }),
                        Wu = Jr(function (t, n) {
                      var e = Hu(n);
                      return Jo(e) && (e = i), Jo(t) ? sr(t, gr(n, 1, Jo, !0), i, e) : [];
                    });

                    function Nu(t, n, e) {
                      var r = null == t ? 0 : t.length;
                      if (!r) return -1;
                      var i = null == e ? 0 : ya(e);
                      return i < 0 && (i = de(r + i, 0)), En(t, ou(n, 3), i);
                    }

                    function $u(t, n, e) {
                      var r = null == t ? 0 : t.length;
                      if (!r) return -1;
                      var u = r - 1;
                      return e !== i && (u = ya(e), u = e < 0 ? de(r + u, 0) : _e(u, r - 1)), En(t, ou(n, 3), u, !0);
                    }

                    function Gu(t) {
                      return null != t && t.length ? gr(t, 1) : [];
                    }

                    function Vu(t) {
                      return t && t.length ? t[0] : i;
                    }

                    var Zu = Jr(function (t) {
                      var n = Cn(t, yi);
                      return n.length && n[0] === t[0] ? jr(n) : [];
                    }),
                        Ju = Jr(function (t) {
                      var n = Hu(t),
                          e = Cn(t, yi);
                      return n === Hu(e) ? n = i : e.pop(), e.length && e[0] === t[0] ? jr(e, ou(n, 2)) : [];
                    }),
                        Ku = Jr(function (t) {
                      var n = Hu(t),
                          e = Cn(t, yi);
                      return (n = "function" == typeof n ? n : i) && e.pop(), e.length && e[0] === t[0] ? jr(e, i, n) : [];
                    });

                    function Hu(t) {
                      var n = null == t ? 0 : t.length;
                      return n ? t[n - 1] : i;
                    }

                    var Qu = Jr(Yu);

                    function Yu(t, n) {
                      return t && t.length && n && n.length ? $r(t, n) : t;
                    }

                    var Xu = tu(function (t, n) {
                      var e = null == t ? 0 : t.length,
                          r = ur(t, n);
                      return Gr(t, Cn(n, function (t) {
                        return gu(t, e) ? +t : t;
                      }).sort(Fi)), r;
                    });

                    function to(t) {
                      return null == t ? t : ke.call(t);
                    }

                    var no = Jr(function (t) {
                      return ci(gr(t, 1, Jo, !0));
                    }),
                        eo = Jr(function (t) {
                      var n = Hu(t);
                      return Jo(n) && (n = i), ci(gr(t, 1, Jo, !0), ou(n, 2));
                    }),
                        ro = Jr(function (t) {
                      var n = Hu(t);
                      return n = "function" == typeof n ? n : i, ci(gr(t, 1, Jo, !0), i, n);
                    });

                    function io(t) {
                      if (!t || !t.length) return [];
                      var n = 0;
                      return t = An(t, function (t) {
                        if (Jo(t)) return n = de(t.length, n), !0;
                      }), Wn(n, function (n) {
                        return Cn(t, Un(n));
                      });
                    }

                    function uo(t, n) {
                      if (!t || !t.length) return [];
                      var e = io(t);
                      return null == n ? e : Cn(e, function (t) {
                        return _n(n, i, t);
                      });
                    }

                    var oo = Jr(function (t, n) {
                      return Jo(t) ? sr(t, n) : [];
                    }),
                        ao = Jr(function (t) {
                      return pi(An(t, Jo));
                    }),
                        co = Jr(function (t) {
                      var n = Hu(t);
                      return Jo(n) && (n = i), pi(An(t, Jo), ou(n, 2));
                    }),
                        fo = Jr(function (t) {
                      var n = Hu(t);
                      return n = "function" == typeof n ? n : i, pi(An(t, Jo), i, n);
                    }),
                        so = Jr(io),
                        lo = Jr(function (t) {
                      var n = t.length,
                          e = n > 1 ? t[n - 1] : i;
                      return e = "function" == typeof e ? (t.pop(), e) : i, uo(t, e);
                    });

                    function ho(t) {
                      var n = Be(t);
                      return n.__chain__ = !0, n;
                    }

                    function po(t, n) {
                      return n(t);
                    }

                    var vo = tu(function (t) {
                      var n = t.length,
                          e = n ? t[0] : 0,
                          r = this.__wrapped__,
                          u = function u(n) {
                        return ur(n, t);
                      };

                      return !(n > 1 || this.__actions__.length) && r instanceof Ne && gu(e) ? ((r = r.slice(e, +e + (n ? 1 : 0))).__actions__.push({
                        func: po,
                        args: [u],
                        thisArg: i
                      }), new We(r, this.__chain__).thru(function (t) {
                        return n && !t.length && t.push(i), t;
                      })) : this.thru(u);
                    }),
                        yo = Oi(function (t, n, e) {
                      Et.call(t, e) ? ++t[e] : ir(t, e, 1);
                    }),
                        go = Li(Nu),
                        _o = Li($u);

                    function wo(t, n) {
                      return (Go(t) ? bn : lr)(t, ou(n, 3));
                    }

                    function bo(t, n) {
                      return (Go(t) ? mn : hr)(t, ou(n, 3));
                    }

                    var mo = Oi(function (t, n, e) {
                      Et.call(t, e) ? t[e].push(n) : ir(t, e, [n]);
                    }),
                        ko = Jr(function (t, n, e) {
                      var i = -1,
                          u = "function" == typeof n,
                          o = Zo(t) ? r(t.length) : [];
                      return lr(t, function (t) {
                        o[++i] = u ? _n(n, t, e) : Or(t, n, e);
                      }), o;
                    }),
                        Ao = Oi(function (t, n, e) {
                      ir(t, e, n);
                    });

                    function Fo(t, n) {
                      return (Go(t) ? Cn : Dr)(t, ou(n, 3));
                    }

                    var So = Oi(function (t, n, e) {
                      t[e ? 0 : 1].push(n);
                    }, function () {
                      return [[], []];
                    }),
                        Co = Jr(function (t, n) {
                      if (null == t) return [];
                      var e = n.length;
                      return e > 1 && du(t, n[0], n[1]) ? n = [] : e > 2 && du(n[0], n[1], n[2]) && (n = [n[0]]), Wr(t, gr(n, 1), []);
                    }),
                        xo = Pn || function () {
                      return on.Date.now();
                    };

                    function jo(t, n, e) {
                      return n = e ? i : n, n = t && null == n ? t.length : n, Ki(t, f, i, i, i, i, n);
                    }

                    function Oo(t, n) {
                      var e;
                      if ("function" != typeof n) throw new xt(u);
                      return t = ya(t), function () {
                        return --t > 0 && (e = n.apply(this, arguments)), t <= 1 && (n = i), e;
                      };
                    }

                    var Io = Jr(function (t, n, e) {
                      var r = 1;

                      if (e.length) {
                        var i = ee(e, uu(Io));
                        r |= c;
                      }

                      return Ki(t, r, n, e, i);
                    }),
                        Po = Jr(function (t, n, e) {
                      var r = 3;

                      if (e.length) {
                        var i = ee(e, uu(Po));
                        r |= c;
                      }

                      return Ki(n, r, t, e, i);
                    });

                    function Ro(t, n, e) {
                      var r,
                          o,
                          a,
                          c,
                          f,
                          s,
                          l = 0,
                          h = !1,
                          p = !1,
                          v = !0;
                      if ("function" != typeof t) throw new xt(u);

                      function y(n) {
                        var e = r,
                            u = o;
                        return r = o = i, l = n, c = t.apply(u, e);
                      }

                      function g(t) {
                        return l = t, f = Ou(_, n), h ? y(t) : c;
                      }

                      function d(t) {
                        var e = t - s;
                        return s === i || e >= n || e < 0 || p && t - l >= a;
                      }

                      function _() {
                        var t = xo();
                        if (d(t)) return w(t);
                        f = Ou(_, function (t) {
                          var e = n - (t - s);
                          return p ? _e(e, a - (t - l)) : e;
                        }(t));
                      }

                      function w(t) {
                        return f = i, v && r ? y(t) : (r = o = i, c);
                      }

                      function b() {
                        var t = xo(),
                            e = d(t);

                        if (r = arguments, o = this, s = t, e) {
                          if (f === i) return g(s);
                          if (p) return bi(f), f = Ou(_, n), y(s);
                        }

                        return f === i && (f = Ou(_, n)), c;
                      }

                      return n = da(n) || 0, na(e) && (h = !!e.leading, a = (p = "maxWait" in e) ? de(da(e.maxWait) || 0, n) : a, v = "trailing" in e ? !!e.trailing : v), b.cancel = function () {
                        f !== i && bi(f), l = 0, r = s = o = f = i;
                      }, b.flush = function () {
                        return f === i ? c : w(xo());
                      }, b;
                    }

                    var Eo = Jr(function (t, n) {
                      return fr(t, 1, n);
                    }),
                        Mo = Jr(function (t, n, e) {
                      return fr(t, da(n) || 0, e);
                    });

                    function To(t, n) {
                      if ("function" != typeof t || null != n && "function" != typeof n) throw new xt(u);

                      var e = function e() {
                        var r = arguments,
                            i = n ? n.apply(this, r) : r[0],
                            u = e.cache;
                        if (u.has(i)) return u.get(i);
                        var o = t.apply(this, r);
                        return e.cache = u.set(i, o) || u, o;
                      };

                      return e.cache = new (To.Cache || Ve)(), e;
                    }

                    function Lo(t) {
                      if ("function" != typeof t) throw new xt(u);
                      return function () {
                        var n = arguments;

                        switch (n.length) {
                          case 0:
                            return !t.call(this);

                          case 1:
                            return !t.call(this, n[0]);

                          case 2:
                            return !t.call(this, n[0], n[1]);

                          case 3:
                            return !t.call(this, n[0], n[1], n[2]);
                        }

                        return !t.apply(this, n);
                      };
                    }

                    To.Cache = Ve;

                    var Do = _i(function (t, n) {
                      var e = (n = 1 == n.length && Go(n[0]) ? Cn(n[0], $n(ou())) : Cn(gr(n, 1), $n(ou()))).length;
                      return Jr(function (r) {
                        for (var i = -1, u = _e(r.length, e); ++i < u;) {
                          r[i] = n[i].call(this, r[i]);
                        }

                        return _n(t, this, r);
                      });
                    }),
                        Uo = Jr(function (t, n) {
                      var e = ee(n, uu(Uo));
                      return Ki(t, c, i, n, e);
                    }),
                        Bo = Jr(function (t, n) {
                      var e = ee(n, uu(Bo));
                      return Ki(t, 64, i, n, e);
                    }),
                        qo = tu(function (t, n) {
                      return Ki(t, 256, i, i, i, n);
                    });

                    function zo(t, n) {
                      return t === n || t != t && n != n;
                    }

                    var Wo = $i(Sr),
                        No = $i(function (t, n) {
                      return t >= n;
                    }),
                        $o = Ir(function () {
                      return arguments;
                    }()) ? Ir : function (t) {
                      return ea(t) && Et.call(t, "callee") && !tn.call(t, "callee");
                    },
                        Go = r.isArray,
                        Vo = hn ? $n(hn) : function (t) {
                      return ea(t) && Fr(t) == P;
                    };

                    function Zo(t) {
                      return null != t && ta(t.length) && !Yo(t);
                    }

                    function Jo(t) {
                      return ea(t) && Zo(t);
                    }

                    var Ko = pe || dc,
                        Ho = pn ? $n(pn) : function (t) {
                      return ea(t) && Fr(t) == _;
                    };

                    function Qo(t) {
                      if (!ea(t)) return !1;
                      var n = Fr(t);
                      return n == w || "[object DOMException]" == n || "string" == typeof t.message && "string" == typeof t.name && !ua(t);
                    }

                    function Yo(t) {
                      if (!na(t)) return !1;
                      var n = Fr(t);
                      return n == b || n == m || "[object AsyncFunction]" == n || "[object Proxy]" == n;
                    }

                    function Xo(t) {
                      return "number" == typeof t && t == ya(t);
                    }

                    function ta(t) {
                      return "number" == typeof t && t > -1 && t % 1 == 0 && t <= l;
                    }

                    function na(t) {
                      var n = typeof t;
                      return null != t && ("object" == n || "function" == n);
                    }

                    function ea(t) {
                      return null != t && "object" == typeof t;
                    }

                    var ra = vn ? $n(vn) : function (t) {
                      return ea(t) && hu(t) == k;
                    };

                    function ia(t) {
                      return "number" == typeof t || ea(t) && Fr(t) == A;
                    }

                    function ua(t) {
                      if (!ea(t) || Fr(t) != F) return !1;
                      var n = Vt(t);
                      if (null === n) return !0;
                      var e = Et.call(n, "constructor") && n.constructor;
                      return "function" == typeof e && e instanceof e && Rt.call(e) == Dt;
                    }

                    var oa = yn ? $n(yn) : function (t) {
                      return ea(t) && Fr(t) == C;
                    },
                        aa = gn ? $n(gn) : function (t) {
                      return ea(t) && hu(t) == x;
                    };

                    function ca(t) {
                      return "string" == typeof t || !Go(t) && ea(t) && Fr(t) == j;
                    }

                    function fa(t) {
                      return "symbol" == typeof t || ea(t) && Fr(t) == O;
                    }

                    var sa = dn ? $n(dn) : function (t) {
                      return ea(t) && ta(t.length) && !!Yt[Fr(t)];
                    },
                        la = $i(Lr),
                        ha = $i(function (t, n) {
                      return t <= n;
                    });

                    function pa(t) {
                      if (!t) return [];
                      if (Zo(t)) return ca(t) ? oe(t) : xi(t);
                      if (an && t[an]) return function (t) {
                        for (var n, e = []; !(n = t.next()).done;) {
                          e.push(n.value);
                        }

                        return e;
                      }(t[an]());
                      var n = hu(t);
                      return (n == k ? te : n == x ? re : za)(t);
                    }

                    function va(t) {
                      return t ? (t = da(t)) === s || t === -1 / 0 ? 17976931348623157e292 * (t < 0 ? -1 : 1) : t == t ? t : 0 : 0 === t ? t : 0;
                    }

                    function ya(t) {
                      var n = va(t),
                          e = n % 1;
                      return n == n ? e ? n - e : n : 0;
                    }

                    function ga(t) {
                      return t ? or(ya(t), 0, p) : 0;
                    }

                    function da(t) {
                      if ("number" == typeof t) return t;
                      if (fa(t)) return h;

                      if (na(t)) {
                        var n = "function" == typeof t.valueOf ? t.valueOf() : t;
                        t = na(n) ? n + "" : n;
                      }

                      if ("string" != typeof t) return 0 === t ? t : +t;
                      t = Nn(t);
                      var e = vt.test(t);
                      return e || gt.test(t) ? en(t.slice(2), e ? 2 : 8) : pt.test(t) ? h : +t;
                    }

                    function _a(t) {
                      return ji(t, Ea(t));
                    }

                    function wa(t) {
                      return null == t ? "" : ai(t);
                    }

                    var ba = Ii(function (t, n) {
                      if (mu(n) || Zo(n)) ji(n, Ra(n), t);else for (var e in n) {
                        Et.call(n, e) && tr(t, e, n[e]);
                      }
                    }),
                        ma = Ii(function (t, n) {
                      ji(n, Ea(n), t);
                    }),
                        ka = Ii(function (t, n, e, r) {
                      ji(n, Ea(n), t, r);
                    }),
                        Aa = Ii(function (t, n, e, r) {
                      ji(n, Ra(n), t, r);
                    }),
                        Fa = tu(ur),
                        Sa = Jr(function (t, n) {
                      t = Ft(t);
                      var e = -1,
                          r = n.length,
                          u = r > 2 ? n[2] : i;

                      for (u && du(n[0], n[1], u) && (r = 1); ++e < r;) {
                        for (var o = n[e], a = Ea(o), c = -1, f = a.length; ++c < f;) {
                          var s = a[c],
                              l = t[s];
                          (l === i || zo(l, It[s]) && !Et.call(t, s)) && (t[s] = o[s]);
                        }
                      }

                      return t;
                    }),
                        Ca = Jr(function (t) {
                      return t.push(i, Qi), _n(Ta, i, t);
                    });

                    function xa(t, n, e) {
                      var r = null == t ? i : kr(t, n);
                      return r === i ? e : r;
                    }

                    function ja(t, n) {
                      return null != t && pu(t, n, xr);
                    }

                    var Oa = Bi(function (t, n, e) {
                      null != n && "function" != typeof n.toString && (n = Lt.call(n)), t[n] = e;
                    }, nc(ic)),
                        Ia = Bi(function (t, n, e) {
                      null != n && "function" != typeof n.toString && (n = Lt.call(n)), Et.call(t, n) ? t[n].push(e) : t[n] = [e];
                    }, ou),
                        Pa = Jr(Or);

                    function Ra(t) {
                      return Zo(t) ? Ke(t) : Tr(t);
                    }

                    function Ea(t) {
                      return Zo(t) ? Ke(t, !0) : function (t) {
                        if (!na(t)) return function (t) {
                          var n = [];
                          if (null != t) for (var e in Ft(t)) {
                            n.push(e);
                          }
                          return n;
                        }(t);
                        var n = mu(t),
                            e = [];

                        for (var r in t) {
                          ("constructor" != r || !n && Et.call(t, r)) && e.push(r);
                        }

                        return e;
                      }(t);
                    }

                    var Ma = Ii(function (t, n, e) {
                      qr(t, n, e);
                    }),
                        Ta = Ii(function (t, n, e, r) {
                      qr(t, n, e, r);
                    }),
                        La = tu(function (t, n) {
                      var e = {};
                      if (null == t) return e;
                      var r = !1;
                      n = Cn(n, function (n) {
                        return n = di(n, t), r || (r = n.length > 1), n;
                      }), ji(t, eu(t), e), r && (e = ar(e, 7, Yi));

                      for (var i = n.length; i--;) {
                        fi(e, n[i]);
                      }

                      return e;
                    }),
                        Da = tu(function (t, n) {
                      return null == t ? {} : function (t, n) {
                        return Nr(t, n, function (n, e) {
                          return ja(t, e);
                        });
                      }(t, n);
                    });

                    function Ua(t, n) {
                      if (null == t) return {};
                      var e = Cn(eu(t), function (t) {
                        return [t];
                      });
                      return n = ou(n), Nr(t, e, function (t, e) {
                        return n(t, e[0]);
                      });
                    }

                    var Ba = Ji(Ra),
                        qa = Ji(Ea);

                    function za(t) {
                      return null == t ? [] : Gn(t, Ra(t));
                    }

                    var Wa = Mi(function (t, n, e) {
                      return n = n.toLowerCase(), t + (e ? Na(n) : n);
                    });

                    function Na(t) {
                      return Qa(wa(t).toLowerCase());
                    }

                    function $a(t) {
                      return (t = wa(t)) && t.replace(_t, Hn).replace(Gt, "");
                    }

                    var Ga = Mi(function (t, n, e) {
                      return t + (e ? "-" : "") + n.toLowerCase();
                    }),
                        Va = Mi(function (t, n, e) {
                      return t + (e ? " " : "") + n.toLowerCase();
                    }),
                        Za = Ei("toLowerCase"),
                        Ja = Mi(function (t, n, e) {
                      return t + (e ? "_" : "") + n.toLowerCase();
                    }),
                        Ka = Mi(function (t, n, e) {
                      return t + (e ? " " : "") + Qa(n);
                    }),
                        Ha = Mi(function (t, n, e) {
                      return t + (e ? " " : "") + n.toUpperCase();
                    }),
                        Qa = Ei("toUpperCase");

                    function Ya(t, n, e) {
                      return t = wa(t), (n = e ? i : n) === i ? function (t) {
                        return Kt.test(t);
                      }(t) ? function (t) {
                        return t.match(Zt) || [];
                      }(t) : function (t) {
                        return t.match(ct) || [];
                      }(t) : t.match(n) || [];
                    }

                    var Xa = Jr(function (t, n) {
                      try {
                        return _n(t, i, n);
                      } catch (t) {
                        return Qo(t) ? t : new mt(t);
                      }
                    }),
                        tc = tu(function (t, n) {
                      return bn(n, function (n) {
                        n = Du(n), ir(t, n, Io(t[n], t));
                      }), t;
                    });

                    function nc(t) {
                      return function () {
                        return t;
                      };
                    }

                    var ec = Di(),
                        rc = Di(!0);

                    function ic(t) {
                      return t;
                    }

                    function uc(t) {
                      return Mr("function" == typeof t ? t : ar(t, 1));
                    }

                    var oc = Jr(function (t, n) {
                      return function (e) {
                        return Or(e, t, n);
                      };
                    }),
                        ac = Jr(function (t, n) {
                      return function (e) {
                        return Or(t, e, n);
                      };
                    });

                    function cc(t, n, e) {
                      var r = Ra(n),
                          i = mr(n, r);
                      null != e || na(n) && (i.length || !r.length) || (e = n, n = t, t = this, i = mr(n, Ra(n)));
                      var u = !(na(e) && "chain" in e && !e.chain),
                          o = Yo(t);
                      return bn(i, function (e) {
                        var r = n[e];
                        t[e] = r, o && (t.prototype[e] = function () {
                          var n = this.__chain__;

                          if (u || n) {
                            var e = t(this.__wrapped__),
                                i = e.__actions__ = xi(this.__actions__);
                            return i.push({
                              func: r,
                              args: arguments,
                              thisArg: t
                            }), e.__chain__ = n, e;
                          }

                          return r.apply(t, xn([this.value()], arguments));
                        });
                      }), t;
                    }

                    function fc() {}

                    var sc = zi(Cn),
                        lc = zi(kn),
                        hc = zi(In);

                    function pc(t) {
                      return _u(t) ? Un(Du(t)) : function (t) {
                        return function (n) {
                          return kr(n, t);
                        };
                      }(t);
                    }

                    var vc = Ni(),
                        yc = Ni(!0);

                    function gc() {
                      return [];
                    }

                    function dc() {
                      return !1;
                    }

                    var _c,
                        wc = qi(function (t, n) {
                      return t + n;
                    }, 0),
                        bc = Vi("ceil"),
                        mc = qi(function (t, n) {
                      return t / n;
                    }, 1),
                        kc = Vi("floor"),
                        Ac = qi(function (t, n) {
                      return t * n;
                    }, 1),
                        Fc = Vi("round"),
                        Sc = qi(function (t, n) {
                      return t - n;
                    }, 0);

                    return Be.after = function (t, n) {
                      if ("function" != typeof n) throw new xt(u);
                      return t = ya(t), function () {
                        if (--t < 1) return n.apply(this, arguments);
                      };
                    }, Be.ary = jo, Be.assign = ba, Be.assignIn = ma, Be.assignInWith = ka, Be.assignWith = Aa, Be.at = Fa, Be.before = Oo, Be.bind = Io, Be.bindAll = tc, Be.bindKey = Po, Be.castArray = function () {
                      if (!arguments.length) return [];
                      var t = arguments[0];
                      return Go(t) ? t : [t];
                    }, Be.chain = ho, Be.chunk = function (t, n, e) {
                      n = (e ? du(t, n, e) : n === i) ? 1 : de(ya(n), 0);
                      var u = null == t ? 0 : t.length;
                      if (!u || n < 1) return [];

                      for (var o = 0, a = 0, c = r(se(u / n)); o < u;) {
                        c[a++] = ni(t, o, o += n);
                      }

                      return c;
                    }, Be.compact = function (t) {
                      for (var n = -1, e = null == t ? 0 : t.length, r = 0, i = []; ++n < e;) {
                        var u = t[n];
                        u && (i[r++] = u);
                      }

                      return i;
                    }, Be.concat = function () {
                      var t = arguments.length;
                      if (!t) return [];

                      for (var n = r(t - 1), e = arguments[0], i = t; i--;) {
                        n[i - 1] = arguments[i];
                      }

                      return xn(Go(e) ? xi(e) : [e], gr(n, 1));
                    }, Be.cond = function (t) {
                      var n = null == t ? 0 : t.length,
                          e = ou();
                      return t = n ? Cn(t, function (t) {
                        if ("function" != typeof t[1]) throw new xt(u);
                        return [e(t[0]), t[1]];
                      }) : [], Jr(function (e) {
                        for (var r = -1; ++r < n;) {
                          var i = t[r];
                          if (_n(i[0], this, e)) return _n(i[1], this, e);
                        }
                      });
                    }, Be.conforms = function (t) {
                      return function (t) {
                        var n = Ra(t);
                        return function (e) {
                          return cr(e, t, n);
                        };
                      }(ar(t, 1));
                    }, Be.constant = nc, Be.countBy = yo, Be.create = function (t, n) {
                      var e = qe(t);
                      return null == n ? e : rr(e, n);
                    }, Be.curry = function t(n, e, r) {
                      var u = Ki(n, 8, i, i, i, i, i, e = r ? i : e);
                      return u.placeholder = t.placeholder, u;
                    }, Be.curryRight = function t(n, e, r) {
                      var u = Ki(n, 16, i, i, i, i, i, e = r ? i : e);
                      return u.placeholder = t.placeholder, u;
                    }, Be.debounce = Ro, Be.defaults = Sa, Be.defaultsDeep = Ca, Be.defer = Eo, Be.delay = Mo, Be.difference = qu, Be.differenceBy = zu, Be.differenceWith = Wu, Be.drop = function (t, n, e) {
                      var r = null == t ? 0 : t.length;
                      return r ? ni(t, (n = e || n === i ? 1 : ya(n)) < 0 ? 0 : n, r) : [];
                    }, Be.dropRight = function (t, n, e) {
                      var r = null == t ? 0 : t.length;
                      return r ? ni(t, 0, (n = r - (n = e || n === i ? 1 : ya(n))) < 0 ? 0 : n) : [];
                    }, Be.dropRightWhile = function (t, n) {
                      return t && t.length ? li(t, ou(n, 3), !0, !0) : [];
                    }, Be.dropWhile = function (t, n) {
                      return t && t.length ? li(t, ou(n, 3), !0) : [];
                    }, Be.fill = function (t, n, e, r) {
                      var u = null == t ? 0 : t.length;
                      return u ? (e && "number" != typeof e && du(t, n, e) && (e = 0, r = u), function (t, n, e, r) {
                        var u = t.length;

                        for ((e = ya(e)) < 0 && (e = -e > u ? 0 : u + e), (r = r === i || r > u ? u : ya(r)) < 0 && (r += u), r = e > r ? 0 : ga(r); e < r;) {
                          t[e++] = n;
                        }

                        return t;
                      }(t, n, e, r)) : [];
                    }, Be.filter = function (t, n) {
                      return (Go(t) ? An : yr)(t, ou(n, 3));
                    }, Be.flatMap = function (t, n) {
                      return gr(Fo(t, n), 1);
                    }, Be.flatMapDeep = function (t, n) {
                      return gr(Fo(t, n), s);
                    }, Be.flatMapDepth = function (t, n, e) {
                      return e = e === i ? 1 : ya(e), gr(Fo(t, n), e);
                    }, Be.flatten = Gu, Be.flattenDeep = function (t) {
                      return null != t && t.length ? gr(t, s) : [];
                    }, Be.flattenDepth = function (t, n) {
                      return null != t && t.length ? gr(t, n = n === i ? 1 : ya(n)) : [];
                    }, Be.flip = function (t) {
                      return Ki(t, 512);
                    }, Be.flow = ec, Be.flowRight = rc, Be.fromPairs = function (t) {
                      for (var n = -1, e = null == t ? 0 : t.length, r = {}; ++n < e;) {
                        var i = t[n];
                        r[i[0]] = i[1];
                      }

                      return r;
                    }, Be.functions = function (t) {
                      return null == t ? [] : mr(t, Ra(t));
                    }, Be.functionsIn = function (t) {
                      return null == t ? [] : mr(t, Ea(t));
                    }, Be.groupBy = mo, Be.initial = function (t) {
                      return null != t && t.length ? ni(t, 0, -1) : [];
                    }, Be.intersection = Zu, Be.intersectionBy = Ju, Be.intersectionWith = Ku, Be.invert = Oa, Be.invertBy = Ia, Be.invokeMap = ko, Be.iteratee = uc, Be.keyBy = Ao, Be.keys = Ra, Be.keysIn = Ea, Be.map = Fo, Be.mapKeys = function (t, n) {
                      var e = {};
                      return n = ou(n, 3), wr(t, function (t, r, i) {
                        ir(e, n(t, r, i), t);
                      }), e;
                    }, Be.mapValues = function (t, n) {
                      var e = {};
                      return n = ou(n, 3), wr(t, function (t, r, i) {
                        ir(e, r, n(t, r, i));
                      }), e;
                    }, Be.matches = function (t) {
                      return Ur(ar(t, 1));
                    }, Be.matchesProperty = function (t, n) {
                      return Br(t, ar(n, 1));
                    }, Be.memoize = To, Be.merge = Ma, Be.mergeWith = Ta, Be.method = oc, Be.methodOf = ac, Be.mixin = cc, Be.negate = Lo, Be.nthArg = function (t) {
                      return t = ya(t), Jr(function (n) {
                        return zr(n, t);
                      });
                    }, Be.omit = La, Be.omitBy = function (t, n) {
                      return Ua(t, Lo(ou(n)));
                    }, Be.once = function (t) {
                      return Oo(2, t);
                    }, Be.orderBy = function (t, n, e, r) {
                      return null == t ? [] : (Go(n) || (n = null == n ? [] : [n]), Go(e = r ? i : e) || (e = null == e ? [] : [e]), Wr(t, n, e));
                    }, Be.over = sc, Be.overArgs = Do, Be.overEvery = lc, Be.overSome = hc, Be.partial = Uo, Be.partialRight = Bo, Be.partition = So, Be.pick = Da, Be.pickBy = Ua, Be.property = pc, Be.propertyOf = function (t) {
                      return function (n) {
                        return null == t ? i : kr(t, n);
                      };
                    }, Be.pull = Qu, Be.pullAll = Yu, Be.pullAllBy = function (t, n, e) {
                      return t && t.length && n && n.length ? $r(t, n, ou(e, 2)) : t;
                    }, Be.pullAllWith = function (t, n, e) {
                      return t && t.length && n && n.length ? $r(t, n, i, e) : t;
                    }, Be.pullAt = Xu, Be.range = vc, Be.rangeRight = yc, Be.rearg = qo, Be.reject = function (t, n) {
                      return (Go(t) ? An : yr)(t, Lo(ou(n, 3)));
                    }, Be.remove = function (t, n) {
                      var e = [];
                      if (!t || !t.length) return e;
                      var r = -1,
                          i = [],
                          u = t.length;

                      for (n = ou(n, 3); ++r < u;) {
                        var o = t[r];
                        n(o, r, t) && (e.push(o), i.push(r));
                      }

                      return Gr(t, i), e;
                    }, Be.rest = function (t, n) {
                      if ("function" != typeof t) throw new xt(u);
                      return Jr(t, n = n === i ? n : ya(n));
                    }, Be.reverse = to, Be.sampleSize = function (t, n, e) {
                      return n = (e ? du(t, n, e) : n === i) ? 1 : ya(n), (Go(t) ? Qe : Hr)(t, n);
                    }, Be.set = function (t, n, e) {
                      return null == t ? t : Qr(t, n, e);
                    }, Be.setWith = function (t, n, e, r) {
                      return r = "function" == typeof r ? r : i, null == t ? t : Qr(t, n, e, r);
                    }, Be.shuffle = function (t) {
                      return (Go(t) ? Ye : ti)(t);
                    }, Be.slice = function (t, n, e) {
                      var r = null == t ? 0 : t.length;
                      return r ? (e && "number" != typeof e && du(t, n, e) ? (n = 0, e = r) : (n = null == n ? 0 : ya(n), e = e === i ? r : ya(e)), ni(t, n, e)) : [];
                    }, Be.sortBy = Co, Be.sortedUniq = function (t) {
                      return t && t.length ? ui(t) : [];
                    }, Be.sortedUniqBy = function (t, n) {
                      return t && t.length ? ui(t, ou(n, 2)) : [];
                    }, Be.split = function (t, n, e) {
                      return e && "number" != typeof e && du(t, n, e) && (n = e = i), (e = e === i ? p : e >>> 0) ? (t = wa(t)) && ("string" == typeof n || null != n && !oa(n)) && !(n = ai(n)) && Xn(t) ? wi(oe(t), 0, e) : t.split(n, e) : [];
                    }, Be.spread = function (t, n) {
                      if ("function" != typeof t) throw new xt(u);
                      return n = null == n ? 0 : de(ya(n), 0), Jr(function (e) {
                        var r = e[n],
                            i = wi(e, 0, n);
                        return r && xn(i, r), _n(t, this, i);
                      });
                    }, Be.tail = function (t) {
                      var n = null == t ? 0 : t.length;
                      return n ? ni(t, 1, n) : [];
                    }, Be.take = function (t, n, e) {
                      return t && t.length ? ni(t, 0, (n = e || n === i ? 1 : ya(n)) < 0 ? 0 : n) : [];
                    }, Be.takeRight = function (t, n, e) {
                      var r = null == t ? 0 : t.length;
                      return r ? ni(t, (n = r - (n = e || n === i ? 1 : ya(n))) < 0 ? 0 : n, r) : [];
                    }, Be.takeRightWhile = function (t, n) {
                      return t && t.length ? li(t, ou(n, 3), !1, !0) : [];
                    }, Be.takeWhile = function (t, n) {
                      return t && t.length ? li(t, ou(n, 3)) : [];
                    }, Be.tap = function (t, n) {
                      return n(t), t;
                    }, Be.throttle = function (t, n, e) {
                      var r = !0,
                          i = !0;
                      if ("function" != typeof t) throw new xt(u);
                      return na(e) && (r = "leading" in e ? !!e.leading : r, i = "trailing" in e ? !!e.trailing : i), Ro(t, n, {
                        leading: r,
                        maxWait: n,
                        trailing: i
                      });
                    }, Be.thru = po, Be.toArray = pa, Be.toPairs = Ba, Be.toPairsIn = qa, Be.toPath = function (t) {
                      return Go(t) ? Cn(t, Du) : fa(t) ? [t] : xi(Lu(wa(t)));
                    }, Be.toPlainObject = _a, Be.transform = function (t, n, e) {
                      var r = Go(t),
                          i = r || Ko(t) || sa(t);

                      if (n = ou(n, 4), null == e) {
                        var u = t && t.constructor;
                        e = i ? r ? new u() : [] : na(t) && Yo(u) ? qe(Vt(t)) : {};
                      }

                      return (i ? bn : wr)(t, function (t, r, i) {
                        return n(e, t, r, i);
                      }), e;
                    }, Be.unary = function (t) {
                      return jo(t, 1);
                    }, Be.union = no, Be.unionBy = eo, Be.unionWith = ro, Be.uniq = function (t) {
                      return t && t.length ? ci(t) : [];
                    }, Be.uniqBy = function (t, n) {
                      return t && t.length ? ci(t, ou(n, 2)) : [];
                    }, Be.uniqWith = function (t, n) {
                      return n = "function" == typeof n ? n : i, t && t.length ? ci(t, i, n) : [];
                    }, Be.unset = function (t, n) {
                      return null == t || fi(t, n);
                    }, Be.unzip = io, Be.unzipWith = uo, Be.update = function (t, n, e) {
                      return null == t ? t : si(t, n, gi(e));
                    }, Be.updateWith = function (t, n, e, r) {
                      return r = "function" == typeof r ? r : i, null == t ? t : si(t, n, gi(e), r);
                    }, Be.values = za, Be.valuesIn = function (t) {
                      return null == t ? [] : Gn(t, Ea(t));
                    }, Be.without = oo, Be.words = Ya, Be.wrap = function (t, n) {
                      return Uo(gi(n), t);
                    }, Be.xor = ao, Be.xorBy = co, Be.xorWith = fo, Be.zip = so, Be.zipObject = function (t, n) {
                      return vi(t || [], n || [], tr);
                    }, Be.zipObjectDeep = function (t, n) {
                      return vi(t || [], n || [], Qr);
                    }, Be.zipWith = lo, Be.entries = Ba, Be.entriesIn = qa, Be.extend = ma, Be.extendWith = ka, cc(Be, Be), Be.add = wc, Be.attempt = Xa, Be.camelCase = Wa, Be.capitalize = Na, Be.ceil = bc, Be.clamp = function (t, n, e) {
                      return e === i && (e = n, n = i), e !== i && (e = (e = da(e)) == e ? e : 0), n !== i && (n = (n = da(n)) == n ? n : 0), or(da(t), n, e);
                    }, Be.clone = function (t) {
                      return ar(t, 4);
                    }, Be.cloneDeep = function (t) {
                      return ar(t, 5);
                    }, Be.cloneDeepWith = function (t, n) {
                      return ar(t, 5, n = "function" == typeof n ? n : i);
                    }, Be.cloneWith = function (t, n) {
                      return ar(t, 4, n = "function" == typeof n ? n : i);
                    }, Be.conformsTo = function (t, n) {
                      return null == n || cr(t, n, Ra(n));
                    }, Be.deburr = $a, Be.defaultTo = function (t, n) {
                      return null == t || t != t ? n : t;
                    }, Be.divide = mc, Be.endsWith = function (t, n, e) {
                      t = wa(t), n = ai(n);
                      var r = t.length,
                          u = e = e === i ? r : or(ya(e), 0, r);
                      return (e -= n.length) >= 0 && t.slice(e, u) == n;
                    }, Be.eq = zo, Be.escape = function (t) {
                      return (t = wa(t)) && J.test(t) ? t.replace(V, Qn) : t;
                    }, Be.escapeRegExp = function (t) {
                      return (t = wa(t)) && et.test(t) ? t.replace(nt, "\\$&") : t;
                    }, Be.every = function (t, n, e) {
                      var r = Go(t) ? kn : pr;
                      return e && du(t, n, e) && (n = i), r(t, ou(n, 3));
                    }, Be.find = go, Be.findIndex = Nu, Be.findKey = function (t, n) {
                      return Rn(t, ou(n, 3), wr);
                    }, Be.findLast = _o, Be.findLastIndex = $u, Be.findLastKey = function (t, n) {
                      return Rn(t, ou(n, 3), br);
                    }, Be.floor = kc, Be.forEach = wo, Be.forEachRight = bo, Be.forIn = function (t, n) {
                      return null == t ? t : dr(t, ou(n, 3), Ea);
                    }, Be.forInRight = function (t, n) {
                      return null == t ? t : _r(t, ou(n, 3), Ea);
                    }, Be.forOwn = function (t, n) {
                      return t && wr(t, ou(n, 3));
                    }, Be.forOwnRight = function (t, n) {
                      return t && br(t, ou(n, 3));
                    }, Be.get = xa, Be.gt = Wo, Be.gte = No, Be.has = function (t, n) {
                      return null != t && pu(t, n, Cr);
                    }, Be.hasIn = ja, Be.head = Vu, Be.identity = ic, Be.includes = function (t, n, e, r) {
                      t = Zo(t) ? t : za(t), e = e && !r ? ya(e) : 0;
                      var i = t.length;
                      return e < 0 && (e = de(i + e, 0)), ca(t) ? e <= i && t.indexOf(n, e) > -1 : !!i && Mn(t, n, e) > -1;
                    }, Be.indexOf = function (t, n, e) {
                      var r = null == t ? 0 : t.length;
                      if (!r) return -1;
                      var i = null == e ? 0 : ya(e);
                      return i < 0 && (i = de(r + i, 0)), Mn(t, n, i);
                    }, Be.inRange = function (t, n, e) {
                      return n = va(n), e === i ? (e = n, n = 0) : e = va(e), function (t, n, e) {
                        return t >= _e(n, e) && t < de(n, e);
                      }(t = da(t), n, e);
                    }, Be.invoke = Pa, Be.isArguments = $o, Be.isArray = Go, Be.isArrayBuffer = Vo, Be.isArrayLike = Zo, Be.isArrayLikeObject = Jo, Be.isBoolean = function (t) {
                      return !0 === t || !1 === t || ea(t) && Fr(t) == d;
                    }, Be.isBuffer = Ko, Be.isDate = Ho, Be.isElement = function (t) {
                      return ea(t) && 1 === t.nodeType && !ua(t);
                    }, Be.isEmpty = function (t) {
                      if (null == t) return !0;
                      if (Zo(t) && (Go(t) || "string" == typeof t || "function" == typeof t.splice || Ko(t) || sa(t) || $o(t))) return !t.length;
                      var n = hu(t);
                      if (n == k || n == x) return !t.size;
                      if (mu(t)) return !Tr(t).length;

                      for (var e in t) {
                        if (Et.call(t, e)) return !1;
                      }

                      return !0;
                    }, Be.isEqual = function (t, n) {
                      return Pr(t, n);
                    }, Be.isEqualWith = function (t, n, e) {
                      var r = (e = "function" == typeof e ? e : i) ? e(t, n) : i;
                      return r === i ? Pr(t, n, i, e) : !!r;
                    }, Be.isError = Qo, Be.isFinite = function (t) {
                      return "number" == typeof t && ve(t);
                    }, Be.isFunction = Yo, Be.isInteger = Xo, Be.isLength = ta, Be.isMap = ra, Be.isMatch = function (t, n) {
                      return t === n || Rr(t, n, cu(n));
                    }, Be.isMatchWith = function (t, n, e) {
                      return e = "function" == typeof e ? e : i, Rr(t, n, cu(n), e);
                    }, Be.isNaN = function (t) {
                      return ia(t) && t != +t;
                    }, Be.isNative = function (t) {
                      if (bu(t)) throw new mt("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
                      return Er(t);
                    }, Be.isNil = function (t) {
                      return null == t;
                    }, Be.isNull = function (t) {
                      return null === t;
                    }, Be.isNumber = ia, Be.isObject = na, Be.isObjectLike = ea, Be.isPlainObject = ua, Be.isRegExp = oa, Be.isSafeInteger = function (t) {
                      return Xo(t) && t >= -9007199254740991 && t <= l;
                    }, Be.isSet = aa, Be.isString = ca, Be.isSymbol = fa, Be.isTypedArray = sa, Be.isUndefined = function (t) {
                      return t === i;
                    }, Be.isWeakMap = function (t) {
                      return ea(t) && hu(t) == I;
                    }, Be.isWeakSet = function (t) {
                      return ea(t) && "[object WeakSet]" == Fr(t);
                    }, Be.join = function (t, n) {
                      return null == t ? "" : ye.call(t, n);
                    }, Be.kebabCase = Ga, Be.last = Hu, Be.lastIndexOf = function (t, n, e) {
                      var r = null == t ? 0 : t.length;
                      if (!r) return -1;
                      var u = r;
                      return e !== i && (u = (u = ya(e)) < 0 ? de(r + u, 0) : _e(u, r - 1)), n == n ? function (t, n, e) {
                        for (var r = e + 1; r--;) {
                          if (t[r] === n) return r;
                        }

                        return r;
                      }(t, n, u) : En(t, Ln, u, !0);
                    }, Be.lowerCase = Va, Be.lowerFirst = Za, Be.lt = la, Be.lte = ha, Be.max = function (t) {
                      return t && t.length ? vr(t, ic, Sr) : i;
                    }, Be.maxBy = function (t, n) {
                      return t && t.length ? vr(t, ou(n, 2), Sr) : i;
                    }, Be.mean = function (t) {
                      return Dn(t, ic);
                    }, Be.meanBy = function (t, n) {
                      return Dn(t, ou(n, 2));
                    }, Be.min = function (t) {
                      return t && t.length ? vr(t, ic, Lr) : i;
                    }, Be.minBy = function (t, n) {
                      return t && t.length ? vr(t, ou(n, 2), Lr) : i;
                    }, Be.stubArray = gc, Be.stubFalse = dc, Be.stubObject = function () {
                      return {};
                    }, Be.stubString = function () {
                      return "";
                    }, Be.stubTrue = function () {
                      return !0;
                    }, Be.multiply = Ac, Be.nth = function (t, n) {
                      return t && t.length ? zr(t, ya(n)) : i;
                    }, Be.noConflict = function () {
                      return on._ === this && (on._ = Ut), this;
                    }, Be.noop = fc, Be.now = xo, Be.pad = function (t, n, e) {
                      t = wa(t);
                      var r = (n = ya(n)) ? ue(t) : 0;
                      if (!n || r >= n) return t;
                      var i = (n - r) / 2;
                      return Wi(le(i), e) + t + Wi(se(i), e);
                    }, Be.padEnd = function (t, n, e) {
                      t = wa(t);
                      var r = (n = ya(n)) ? ue(t) : 0;
                      return n && r < n ? t + Wi(n - r, e) : t;
                    }, Be.padStart = function (t, n, e) {
                      t = wa(t);
                      var r = (n = ya(n)) ? ue(t) : 0;
                      return n && r < n ? Wi(n - r, e) + t : t;
                    }, Be.parseInt = function (t, n, e) {
                      return e || null == n ? n = 0 : n && (n = +n), be(wa(t).replace(rt, ""), n || 0);
                    }, Be.random = function (t, n, e) {
                      if (e && "boolean" != typeof e && du(t, n, e) && (n = e = i), e === i && ("boolean" == typeof n ? (e = n, n = i) : "boolean" == typeof t && (e = t, t = i)), t === i && n === i ? (t = 0, n = 1) : (t = va(t), n === i ? (n = t, t = 0) : n = va(n)), t > n) {
                        var r = t;
                        t = n, n = r;
                      }

                      if (e || t % 1 || n % 1) {
                        var u = me();
                        return _e(t + u * (n - t + nn("1e-" + ((u + "").length - 1))), n);
                      }

                      return Vr(t, n);
                    }, Be.reduce = function (t, n, e) {
                      var r = Go(t) ? jn : qn,
                          i = arguments.length < 3;
                      return r(t, ou(n, 4), e, i, lr);
                    }, Be.reduceRight = function (t, n, e) {
                      var r = Go(t) ? On : qn,
                          i = arguments.length < 3;
                      return r(t, ou(n, 4), e, i, hr);
                    }, Be.repeat = function (t, n, e) {
                      return n = (e ? du(t, n, e) : n === i) ? 1 : ya(n), Zr(wa(t), n);
                    }, Be.replace = function () {
                      var t = arguments,
                          n = wa(t[0]);
                      return t.length < 3 ? n : n.replace(t[1], t[2]);
                    }, Be.result = function (t, n, e) {
                      var r = -1,
                          u = (n = di(n, t)).length;

                      for (u || (u = 1, t = i); ++r < u;) {
                        var o = null == t ? i : t[Du(n[r])];
                        o === i && (r = u, o = e), t = Yo(o) ? o.call(t) : o;
                      }

                      return t;
                    }, Be.round = Fc, Be.runInContext = t, Be.sample = function (t) {
                      return (Go(t) ? He : Kr)(t);
                    }, Be.size = function (t) {
                      if (null == t) return 0;
                      if (Zo(t)) return ca(t) ? ue(t) : t.length;
                      var n = hu(t);
                      return n == k || n == x ? t.size : Tr(t).length;
                    }, Be.snakeCase = Ja, Be.some = function (t, n, e) {
                      var r = Go(t) ? In : ei;
                      return e && du(t, n, e) && (n = i), r(t, ou(n, 3));
                    }, Be.sortedIndex = function (t, n) {
                      return ri(t, n);
                    }, Be.sortedIndexBy = function (t, n, e) {
                      return ii(t, n, ou(e, 2));
                    }, Be.sortedIndexOf = function (t, n) {
                      var e = null == t ? 0 : t.length;

                      if (e) {
                        var r = ri(t, n);
                        if (r < e && zo(t[r], n)) return r;
                      }

                      return -1;
                    }, Be.sortedLastIndex = function (t, n) {
                      return ri(t, n, !0);
                    }, Be.sortedLastIndexBy = function (t, n, e) {
                      return ii(t, n, ou(e, 2), !0);
                    }, Be.sortedLastIndexOf = function (t, n) {
                      if (null != t && t.length) {
                        var e = ri(t, n, !0) - 1;
                        if (zo(t[e], n)) return e;
                      }

                      return -1;
                    }, Be.startCase = Ka, Be.startsWith = function (t, n, e) {
                      return t = wa(t), e = null == e ? 0 : or(ya(e), 0, t.length), n = ai(n), t.slice(e, e + n.length) == n;
                    }, Be.subtract = Sc, Be.sum = function (t) {
                      return t && t.length ? zn(t, ic) : 0;
                    }, Be.sumBy = function (t, n) {
                      return t && t.length ? zn(t, ou(n, 2)) : 0;
                    }, Be.template = function (t, n, e) {
                      var r = Be.templateSettings;
                      e && du(t, n, e) && (n = i), t = wa(t), n = ka({}, n, r, Hi);
                      var u,
                          o,
                          a = ka({}, n.imports, r.imports, Hi),
                          c = Ra(a),
                          f = Gn(a, c),
                          s = 0,
                          l = n.interpolate || wt,
                          h = "__p += '",
                          p = St((n.escape || wt).source + "|" + l.source + "|" + (l === Q ? lt : wt).source + "|" + (n.evaluate || wt).source + "|$", "g"),
                          v = "//# sourceURL=" + (Et.call(n, "sourceURL") ? (n.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Qt + "]") + "\n";
                      t.replace(p, function (n, e, r, i, a, c) {
                        return r || (r = i), h += t.slice(s, c).replace(bt, Yn), e && (u = !0, h += "' +\n__e(" + e + ") +\n'"), a && (o = !0, h += "';\n" + a + ";\n__p += '"), r && (h += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"), s = c + n.length, n;
                      }), h += "';\n";
                      var y = Et.call(n, "variable") && n.variable;

                      if (y) {
                        if (ft.test(y)) throw new mt("Invalid `variable` option passed into `_.template`");
                      } else h = "with (obj) {\n" + h + "\n}\n";

                      h = (o ? h.replace(W, "") : h).replace(N, "$1").replace($, "$1;"), h = "function(" + (y || "obj") + ") {\n" + (y ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (u ? ", __e = _.escape" : "") + (o ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + h + "return __p\n}";
                      var g = Xa(function () {
                        return kt(c, v + "return " + h).apply(i, f);
                      });
                      if (g.source = h, Qo(g)) throw g;
                      return g;
                    }, Be.times = function (t, n) {
                      if ((t = ya(t)) < 1 || t > l) return [];

                      var e = p,
                          r = _e(t, p);

                      n = ou(n), t -= p;

                      for (var i = Wn(r, n); ++e < t;) {
                        n(e);
                      }

                      return i;
                    }, Be.toFinite = va, Be.toInteger = ya, Be.toLength = ga, Be.toLower = function (t) {
                      return wa(t).toLowerCase();
                    }, Be.toNumber = da, Be.toSafeInteger = function (t) {
                      return t ? or(ya(t), -9007199254740991, l) : 0 === t ? t : 0;
                    }, Be.toString = wa, Be.toUpper = function (t) {
                      return wa(t).toUpperCase();
                    }, Be.trim = function (t, n, e) {
                      if ((t = wa(t)) && (e || n === i)) return Nn(t);
                      if (!t || !(n = ai(n))) return t;
                      var r = oe(t),
                          u = oe(n);
                      return wi(r, Zn(r, u), Jn(r, u) + 1).join("");
                    }, Be.trimEnd = function (t, n, e) {
                      if ((t = wa(t)) && (e || n === i)) return t.slice(0, ae(t) + 1);
                      if (!t || !(n = ai(n))) return t;
                      var r = oe(t);
                      return wi(r, 0, Jn(r, oe(n)) + 1).join("");
                    }, Be.trimStart = function (t, n, e) {
                      if ((t = wa(t)) && (e || n === i)) return t.replace(rt, "");
                      if (!t || !(n = ai(n))) return t;
                      var r = oe(t);
                      return wi(r, Zn(r, oe(n))).join("");
                    }, Be.truncate = function (t, n) {
                      var e = 30,
                          r = "...";

                      if (na(n)) {
                        var u = "separator" in n ? n.separator : u;
                        e = "length" in n ? ya(n.length) : e, r = "omission" in n ? ai(n.omission) : r;
                      }

                      var o = (t = wa(t)).length;

                      if (Xn(t)) {
                        var a = oe(t);
                        o = a.length;
                      }

                      if (e >= o) return t;
                      var c = e - ue(r);
                      if (c < 1) return r;
                      var f = a ? wi(a, 0, c).join("") : t.slice(0, c);
                      if (u === i) return f + r;

                      if (a && (c += f.length - c), oa(u)) {
                        if (t.slice(c).search(u)) {
                          var s,
                              l = f;

                          for (u.global || (u = St(u.source, wa(ht.exec(u)) + "g")), u.lastIndex = 0; s = u.exec(l);) {
                            var h = s.index;
                          }

                          f = f.slice(0, h === i ? c : h);
                        }
                      } else if (t.indexOf(ai(u), c) != c) {
                        var p = f.lastIndexOf(u);
                        p > -1 && (f = f.slice(0, p));
                      }

                      return f + r;
                    }, Be.unescape = function (t) {
                      return (t = wa(t)) && Z.test(t) ? t.replace(G, ce) : t;
                    }, Be.uniqueId = function (t) {
                      var n = ++Mt;
                      return wa(t) + n;
                    }, Be.upperCase = Ha, Be.upperFirst = Qa, Be.each = wo, Be.eachRight = bo, Be.first = Vu, cc(Be, (_c = {}, wr(Be, function (t, n) {
                      Et.call(Be.prototype, n) || (_c[n] = t);
                    }), _c), {
                      chain: !1
                    }), Be.VERSION = "4.17.21", bn(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function (t) {
                      Be[t].placeholder = Be;
                    }), bn(["drop", "take"], function (t, n) {
                      Ne.prototype[t] = function (e) {
                        e = e === i ? 1 : de(ya(e), 0);
                        var r = this.__filtered__ && !n ? new Ne(this) : this.clone();
                        return r.__filtered__ ? r.__takeCount__ = _e(e, r.__takeCount__) : r.__views__.push({
                          size: _e(e, p),
                          type: t + (r.__dir__ < 0 ? "Right" : "")
                        }), r;
                      }, Ne.prototype[t + "Right"] = function (n) {
                        return this.reverse()[t](n).reverse();
                      };
                    }), bn(["filter", "map", "takeWhile"], function (t, n) {
                      var e = n + 1,
                          r = 1 == e || 3 == e;

                      Ne.prototype[t] = function (t) {
                        var n = this.clone();
                        return n.__iteratees__.push({
                          iteratee: ou(t, 3),
                          type: e
                        }), n.__filtered__ = n.__filtered__ || r, n;
                      };
                    }), bn(["head", "last"], function (t, n) {
                      var e = "take" + (n ? "Right" : "");

                      Ne.prototype[t] = function () {
                        return this[e](1).value()[0];
                      };
                    }), bn(["initial", "tail"], function (t, n) {
                      var e = "drop" + (n ? "" : "Right");

                      Ne.prototype[t] = function () {
                        return this.__filtered__ ? new Ne(this) : this[e](1);
                      };
                    }), Ne.prototype.compact = function () {
                      return this.filter(ic);
                    }, Ne.prototype.find = function (t) {
                      return this.filter(t).head();
                    }, Ne.prototype.findLast = function (t) {
                      return this.reverse().find(t);
                    }, Ne.prototype.invokeMap = Jr(function (t, n) {
                      return "function" == typeof t ? new Ne(this) : this.map(function (e) {
                        return Or(e, t, n);
                      });
                    }), Ne.prototype.reject = function (t) {
                      return this.filter(Lo(ou(t)));
                    }, Ne.prototype.slice = function (t, n) {
                      t = ya(t);
                      var e = this;
                      return e.__filtered__ && (t > 0 || n < 0) ? new Ne(e) : (t < 0 ? e = e.takeRight(-t) : t && (e = e.drop(t)), n !== i && (e = (n = ya(n)) < 0 ? e.dropRight(-n) : e.take(n - t)), e);
                    }, Ne.prototype.takeRightWhile = function (t) {
                      return this.reverse().takeWhile(t).reverse();
                    }, Ne.prototype.toArray = function () {
                      return this.take(p);
                    }, wr(Ne.prototype, function (t, n) {
                      var e = /^(?:filter|find|map|reject)|While$/.test(n),
                          r = /^(?:head|last)$/.test(n),
                          u = Be[r ? "take" + ("last" == n ? "Right" : "") : n],
                          o = r || /^find/.test(n);
                      u && (Be.prototype[n] = function () {
                        var n = this.__wrapped__,
                            a = r ? [1] : arguments,
                            c = n instanceof Ne,
                            f = a[0],
                            s = c || Go(n),
                            l = function l(t) {
                          var n = u.apply(Be, xn([t], a));
                          return r && h ? n[0] : n;
                        };

                        s && e && "function" == typeof f && 1 != f.length && (c = s = !1);
                        var h = this.__chain__,
                            p = !!this.__actions__.length,
                            v = o && !h,
                            y = c && !p;

                        if (!o && s) {
                          n = y ? n : new Ne(this);
                          var g = t.apply(n, a);
                          return g.__actions__.push({
                            func: po,
                            args: [l],
                            thisArg: i
                          }), new We(g, h);
                        }

                        return v && y ? t.apply(this, a) : (g = this.thru(l), v ? r ? g.value()[0] : g.value() : g);
                      });
                    }), bn(["pop", "push", "shift", "sort", "splice", "unshift"], function (t) {
                      var n = jt[t],
                          e = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
                          r = /^(?:pop|shift)$/.test(t);

                      Be.prototype[t] = function () {
                        var t = arguments;

                        if (r && !this.__chain__) {
                          var i = this.value();
                          return n.apply(Go(i) ? i : [], t);
                        }

                        return this[e](function (e) {
                          return n.apply(Go(e) ? e : [], t);
                        });
                      };
                    }), wr(Ne.prototype, function (t, n) {
                      var e = Be[n];

                      if (e) {
                        var r = e.name + "";
                        Et.call(Ie, r) || (Ie[r] = []), Ie[r].push({
                          name: n,
                          func: e
                        });
                      }
                    }), Ie[Ui(i, 2).name] = [{
                      name: "wrapper",
                      func: i
                    }], Ne.prototype.clone = function () {
                      var t = new Ne(this.__wrapped__);
                      return t.__actions__ = xi(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = xi(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = xi(this.__views__), t;
                    }, Ne.prototype.reverse = function () {
                      if (this.__filtered__) {
                        var t = new Ne(this);
                        t.__dir__ = -1, t.__filtered__ = !0;
                      } else (t = this.clone()).__dir__ *= -1;

                      return t;
                    }, Ne.prototype.value = function () {
                      var t = this.__wrapped__.value(),
                          n = this.__dir__,
                          e = Go(t),
                          r = n < 0,
                          i = e ? t.length : 0,
                          u = function (t, n, e) {
                        for (var r = -1, i = e.length; ++r < i;) {
                          var u = e[r],
                              o = u.size;

                          switch (u.type) {
                            case "drop":
                              t += o;
                              break;

                            case "dropRight":
                              n -= o;
                              break;

                            case "take":
                              n = _e(n, t + o);
                              break;

                            case "takeRight":
                              t = de(t, n - o);
                          }
                        }

                        return {
                          start: t,
                          end: n
                        };
                      }(0, i, this.__views__),
                          o = u.start,
                          a = u.end,
                          c = a - o,
                          f = r ? a : o - 1,
                          s = this.__iteratees__,
                          l = s.length,
                          h = 0,
                          p = _e(c, this.__takeCount__);

                      if (!e || !r && i == c && p == c) return hi(t, this.__actions__);
                      var v = [];

                      t: for (; c-- && h < p;) {
                        for (var y = -1, g = t[f += n]; ++y < l;) {
                          var d = s[y],
                              _ = d.iteratee,
                              w = d.type,
                              b = _(g);

                          if (2 == w) g = b;else if (!b) {
                            if (1 == w) continue t;
                            break t;
                          }
                        }

                        v[h++] = g;
                      }

                      return v;
                    }, Be.prototype.at = vo, Be.prototype.chain = function () {
                      return ho(this);
                    }, Be.prototype.commit = function () {
                      return new We(this.value(), this.__chain__);
                    }, Be.prototype.next = function () {
                      this.__values__ === i && (this.__values__ = pa(this.value()));
                      var t = this.__index__ >= this.__values__.length;
                      return {
                        done: t,
                        value: t ? i : this.__values__[this.__index__++]
                      };
                    }, Be.prototype.plant = function (t) {
                      for (var n, e = this; e instanceof ze;) {
                        var r = Bu(e);
                        r.__index__ = 0, r.__values__ = i, n ? u.__wrapped__ = r : n = r;
                        var u = r;
                        e = e.__wrapped__;
                      }

                      return u.__wrapped__ = t, n;
                    }, Be.prototype.reverse = function () {
                      var t = this.__wrapped__;

                      if (t instanceof Ne) {
                        var n = t;
                        return this.__actions__.length && (n = new Ne(this)), (n = n.reverse()).__actions__.push({
                          func: po,
                          args: [to],
                          thisArg: i
                        }), new We(n, this.__chain__);
                      }

                      return this.thru(to);
                    }, Be.prototype.toJSON = Be.prototype.valueOf = Be.prototype.value = function () {
                      return hi(this.__wrapped__, this.__actions__);
                    }, Be.prototype.first = Be.prototype.head, an && (Be.prototype[an] = function () {
                      return this;
                    }), Be;
                  }();

                  on._ = fe, (r = function () {
                    return fe;
                  }.call(n, e, n, t)) === i || (t.exports = r);
                }.call(this);
              },
              654: function _(t, n, e) {
                var r = e(379),
                    i = e(426);
                "string" == typeof (i = i.__esModule ? i["default"] : i) && (i = [[t.id, i, ""]]);
                r(i, {
                  insert: "head",
                  singleton: !1
                }), t.exports = i.locals || {};
              },
              379: function _(t, n, e) {
                var r,
                    i = function () {
                  var t = {};
                  return function (n) {
                    if (void 0 === t[n]) {
                      var e = document.querySelector(n);
                      if (window.HTMLIFrameElement && e instanceof window.HTMLIFrameElement) try {
                        e = e.contentDocument.head;
                      } catch (t) {
                        e = null;
                      }
                      t[n] = e;
                    }

                    return t[n];
                  };
                }(),
                    u = [];

                function o(t) {
                  for (var n = -1, e = 0; e < u.length; e++) {
                    if (u[e].identifier === t) {
                      n = e;
                      break;
                    }
                  }

                  return n;
                }

                function a(t, n) {
                  for (var e = {}, r = [], i = 0; i < t.length; i++) {
                    var a = t[i],
                        c = n.base ? a[0] + n.base : a[0],
                        f = e[c] || 0,
                        s = "".concat(c, " ").concat(f);
                    e[c] = f + 1;
                    var l = o(s),
                        h = {
                      css: a[1],
                      media: a[2],
                      sourceMap: a[3]
                    };
                    -1 !== l ? (u[l].references++, u[l].updater(h)) : u.push({
                      identifier: s,
                      updater: y(h, n),
                      references: 1
                    }), r.push(s);
                  }

                  return r;
                }

                function c(t) {
                  var n = document.createElement("style"),
                      r = t.attributes || {};

                  if (void 0 === r.nonce) {
                    var u = e.nc;
                    u && (r.nonce = u);
                  }

                  if (Object.keys(r).forEach(function (t) {
                    n.setAttribute(t, r[t]);
                  }), "function" == typeof t.insert) t.insert(n);else {
                    var o = i(t.insert || "head");
                    if (!o) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                    o.appendChild(n);
                  }
                  return n;
                }

                var f,
                    s = (f = [], function (t, n) {
                  return f[t] = n, f.filter(Boolean).join("\n");
                });

                function l(t, n, e, r) {
                  var i = e ? "" : r.media ? "@media ".concat(r.media, " {").concat(r.css, "}") : r.css;
                  if (t.styleSheet) t.styleSheet.cssText = s(n, i);else {
                    var u = document.createTextNode(i),
                        o = t.childNodes;
                    o[n] && t.removeChild(o[n]), o.length ? t.insertBefore(u, o[n]) : t.appendChild(u);
                  }
                }

                function h(t, n, e) {
                  var r = e.css,
                      i = e.media,
                      u = e.sourceMap;
                  if (i ? t.setAttribute("media", i) : t.removeAttribute("media"), u && "undefined" != typeof btoa && (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(u)))), " */")), t.styleSheet) t.styleSheet.cssText = r;else {
                    for (; t.firstChild;) {
                      t.removeChild(t.firstChild);
                    }

                    t.appendChild(document.createTextNode(r));
                  }
                }

                var p = null,
                    v = 0;

                function y(t, n) {
                  var e, r, i;

                  if (n.singleton) {
                    var u = v++;
                    e = p || (p = c(n)), r = l.bind(null, e, u, !1), i = l.bind(null, e, u, !0);
                  } else e = c(n), r = h.bind(null, e, n), i = function i() {
                    !function (t) {
                      if (null === t.parentNode) return !1;
                      t.parentNode.removeChild(t);
                    }(e);
                  };

                  return r(t), function (n) {
                    if (n) {
                      if (n.css === t.css && n.media === t.media && n.sourceMap === t.sourceMap) return;
                      r(t = n);
                    } else i();
                  };
                }

                t.exports = function (t, n) {
                  (n = n || {}).singleton || "boolean" == typeof n.singleton || (n.singleton = (void 0 === r && (r = Boolean(window && document && document.all && !window.atob)), r));
                  var e = a(t = t || [], n);
                  return function (t) {
                    if (t = t || [], "[object Array]" === Object.prototype.toString.call(t)) {
                      for (var r = 0; r < e.length; r++) {
                        var i = o(e[r]);
                        u[i].references--;
                      }

                      for (var c = a(t, n), f = 0; f < e.length; f++) {
                        var s = o(e[f]);
                        0 === u[s].references && (u[s].updater(), u.splice(s, 1));
                      }

                      e = c;
                    }
                  };
                };
              },
              138: function _(t, n, e) {
                e.d(n, {
                  Z: function Z() {
                    return u;
                  }
                }), e(486), e(654);
                var r = e(197);
                console.warn("Production mode, console cleared");

                var i = /*#__PURE__*/function () {
                  function i() {}

                  var _proto = i.prototype;

                  _proto.MainGameClosure = function MainGameClosure() {
                    r.Z.init({
                      appId: "vn.momo.web.momojump",
                      name: "vn.momo.web.momojump",
                      displayName: "Momo Jump",
                      client: {
                        web: {
                          hostId: "vn.momo.web.momojump",
                          accessToken: "U2FsdGVkX1/zU8zvdnuylO4ChQgLK9FDQ0uYTxLswidYy5PsrfjZDMFfWmqJfoMGwwLVZ2ffRHDpkpI1MOCkq4Dro61iyAzVZK/AFKdmItA="
                        }
                      },
                      configuration_version: 1
                    }), window.addEventListener("getUserProfile", function () {
                      r.Z.getProfile(function (t) {
                        var n = new CustomEvent("userProfileRes", {
                          detail: t
                        });
                        window.dispatchEvent(n);
                      });
                    }), window.addEventListener("getAvatarEndPoint", function (t) {
                      var n = t.detail;
                      r.Z.getContactAvatar(n, function (t) {
                        var n = new CustomEvent("AvatarEndPointRes", {
                          detail: t
                        });
                        window.dispatchEvent(n);
                      });
                    }), window.addEventListener("ExitGame", function () {
                      console.log("exit game"), r.Z.dismiss();
                    }), window.addEventListener("message", function (t) {
                      if (console.log(">>>" + t), t && t.data && "backPress" == t.data) {
                        var _t2 = new CustomEvent("BackKeyPressed", {});

                        window.dispatchEvent(_t2);
                      }
                    });
                  };

                  _proto.OnReady = function OnReady() {
                    this.MainGameClosure();
                  };

                  return i;
                }();

                window.Index = i, window.MaxApi = r.Z;
                var u = i;
              },
              51: function _(t) {
                t.exports = JSON.parse('{"name":"@momo-platform/api","apiVersion":78}');
              }
            },
                n = {};

            function e(r) {
              var i = n[r];
              if (void 0 !== i) return i.exports;
              var u = n[r] = {
                id: r,
                loaded: !1,
                exports: {}
              };
              return t[r].call(u.exports, u, u.exports, e), u.loaded = !0, u.exports;
            }

            e.n = function (t) {
              var n = t && t.__esModule ? function () {
                return t["default"];
              } : function () {
                return t;
              };
              return e.d(n, {
                a: n
              }), n;
            }, e.d = function (t, n) {
              for (var r in n) {
                e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, {
                  enumerable: !0,
                  get: n[r]
                });
              }
            }, e.g = function () {
              if ("object" == typeof globalThis) return globalThis;

              try {
                return this || new Function("return this")();
              } catch (t) {
                if ("object" == typeof window) return window;
              }
            }(), e.o = function (t, n) {
              return Object.prototype.hasOwnProperty.call(t, n);
            }, e.nmd = function (t) {
              return t.paths = [], t.children || (t.children = []), t;
            }, new (e(138).Z)().OnReady(), window.addEventListener("resize", function (t) {
              document.getElementById("canvasContainer");
            }, !1);
          })();
        })();

        _cjsExports = exports('default', module.exports);
      });

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/Player.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Utils.ts', './GameDefine.ts', './Profile.ts', './Gameconfig.ts', './AudioMgr.ts', './Item.ts', './BoxMgr.ts', './Input.ts', './GameMgr.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, RigidBody, Collider, Animation, ParticleSystem, math, tween, Vec3, Quat, Component, Utils, GameDefine, SoundName, Direction, Layer, Profile, Gameconfig, AudioMgr, Item, BoxMgr, Input, GameMgr;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      RigidBody = module.RigidBody;
      Collider = module.Collider;
      Animation = module.Animation;
      ParticleSystem = module.ParticleSystem;
      math = module.math;
      tween = module.tween;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      Component = module.Component;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      GameDefine = module.GameDefine;
      SoundName = module.SoundName;
      Direction = module.Direction;
      Layer = module.Layer;
    }, function (module) {
      Profile = module.Profile;
    }, function (module) {
      Gameconfig = module.Gameconfig;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      Item = module.Item;
    }, function (module) {
      BoxMgr = module.BoxMgr;
    }, function (module) {
      Input = module.Input;
    }, function (module) {
      GameMgr = module.GameMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3, _temp;

      cclegacy._RF.push({}, "9c53djC1E5KE4urHUt9kq7J", "Player", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var State;

      (function (State) {
        State[State["NONE"] = 0] = "NONE";
        State[State["INIT"] = 1] = "INIT";
        State[State["SPAWN"] = 2] = "SPAWN";
        State[State["IDLE"] = 3] = "IDLE";
        State[State["JUMP"] = 4] = "JUMP";
        State[State["LANDING"] = 5] = "LANDING";
        State[State["DEAD"] = 6] = "DEAD";
      })(State || (State = {}));

      var Player = exports('Player', (_dec = ccclass('Player'), _dec2 = property(RigidBody), _dec3 = property(Collider), _dec4 = property(Animation), _dec5 = property(ParticleSystem), _dec6 = property(ParticleSystem), _dec7 = property(ParticleSystem), _dec8 = property(ParticleSystem), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Player, _Component);

        function Player() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "rb", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "collider", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "animation", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "landingEffect", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "idleParticle", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spawnEffect", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "powerEffect", _descriptor7, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "scorePos", void 0);

          _defineProperty(_assertThisInitialized(_this), "state", void 0);

          _defineProperty(_assertThisInitialized(_this), "isTouchDown", void 0);

          _defineProperty(_assertThisInitialized(_this), "isCirclePower", false);

          _defineProperty(_assertThisInitialized(_this), "isReadyToPlay", void 0);

          _defineProperty(_assertThisInitialized(_this), "shouldPlayAfterSpawn", void 0);

          _defineProperty(_assertThisInitialized(_this), "force", void 0);

          _defineProperty(_assertThisInitialized(_this), "jumpTime", void 0);

          _defineProperty(_assertThisInitialized(_this), "powerDir", 1);

          _defineProperty(_assertThisInitialized(_this), "forceDir", void 0);

          _defineProperty(_assertThisInitialized(_this), "direction", void 0);

          _defineProperty(_assertThisInitialized(_this), "currentBox", void 0);

          _defineProperty(_assertThisInitialized(_this), "timeCounter", 0);

          return _this;
        }

        var _proto = Player.prototype;

        _proto.start = function start() {
          Player.instance = this;
          this.collider.on("onCollisionEnter", this.onCollisionEnter, this);
          this.collider.on('onTriggerEnter', this.OnTriggerEnter, this);
          this.Retry();
        } // Update is called once per frame
        ;

        _proto.update = function update(dt) {
          switch (this.state) {
            case State.IDLE:
              this.timeCounter += dt;

              if (this.timeCounter > 3 * 60) {
                if (Profile.Instance.GameID == null) {
                  this.timeCounter = 0;
                } else {
                  this.Dead();
                }

                break;
              }

              if (!GameMgr.Instance.IsPause && Input.IsTouchDown && !this.isTouchDown) {
                this.timeCounter = 0;
                this.isTouchDown = true;
                this.force = GameDefine.MIN_FORCE;
                this.animation.play("PreJump");
                this.ShowPowerEffect(true);
                this.idleParticle.stop();
                AudioMgr.Instance.PlaySfx(SoundName.PreJump);
              }

              if (this.isTouchDown) {
                this.force += dt * GameMgr.Instance.PowerSpeed * this.powerDir;

                if (this.isCirclePower) {
                  if (this.force > GameDefine.MAX_FORCE || this.force < GameDefine.MIN_FORCE) {
                    this.powerDir *= -1;
                  }
                }

                this.force = math.clamp(this.force, GameDefine.MIN_FORCE, GameDefine.MAX_FORCE);
                this.forceDir = this.direction.clone().multiplyScalar(this.force * 180);
                var scale = this.node.scale.clone();
                scale.y = Math.max(1 - (this.force - GameDefine.MIN_FORCE) / GameDefine.MAX_FORCE, 0.5); // this.node.scale = scale;

                BoxMgr.Instance.currentBoxCtrl.SetScale(scale.y);

                if (Input.IsTouchUp) {
                  this.isTouchDown = false; // this.node.scale = Vec3.ONE;

                  BoxMgr.Instance.currentBoxCtrl.Reset();
                  AudioMgr.Instance.StopSfx(SoundName.PreJump); //     if (this.force >= GameDefine.OB_MIN_FORCE && this.force < GameDefine.OB_MAX_FORCE) {
                  //         this.force = math.randomRange(8.6, 8.7)
                  //         this.forceDir = this.direction.clone().multiplyScalar(this.force * 180);
                  //         this.SetState(State.JUMP);
                  //         GameMgr.Instance.OBJumpResult(true, this.force);
                  //         onboardingStatus = 'pass';
                  //     }
                  //     else {
                  //         this.SetState(State.IDLE, true);
                  //         GameMgr.Instance.OBJumpResult(false, this.force);
                  //         onboardingStatus = 'fail'
                  //     }
                  // }
                  // else {

                  this.SetState(State.JUMP); // }
                  // MaxApiUtils.trackEvent({
                  //     action: 'home_tap',
                  //     onboarding: onboardingStatus,
                  //     stand_number: BoxMgr.Instance.count - 1,
                  //     score: Profile.Instance.Score,
                  //     //gift_detail: BoxMgr.Instance.HasGift(BoxMgr.Instance.count - 1) // Hung-senpai will implement
                  // })
                }
              }

              break;

            case State.JUMP:
              this.jumpTime += dt;

              if (this.jumpTime > 3) {
                this.jumpTime = 0;
                this.Dead();
              }

              break;

            case State.LANDING:
              break;
          }
        };

        _proto.SetState = function SetState(state, force) {
          var _this2 = this;

          if (force === void 0) {
            force = false;
          }

          if (this.state != state || force) {
            // console.log("[Player] state " + State[this.state] + "  " + State[state]);
            this.state = state;

            switch (state) {
              case State.INIT:
                this.isTouchDown = false;
                this.isReadyToPlay = false;
                this.timeCounter = 0;
                this.currentBox = null;
                this.rb.clearVelocity();
                this.rb.isKinematic = true;
                this.node.position = new Vec3(0, 3, 0);
                this.node.rotation = Quat.IDENTITY.clone();
                this.node.forward = Vec3.FORWARD.clone();
                this.SetState(State.SPAWN);
                break;

              case State.SPAWN:
                this.ShowPowerEffect(false);
                this.animation.play("Falling");
                Utils.PlayParticle(this.spawnEffect);
                var pos = this.node.position.clone();
                pos.y = 1.1;
                tween(this.node).to(2, {
                  position: pos
                }).call(function () {
                  _this2.rb.isKinematic = false;
                  _this2.isReadyToPlay = true;
                }).start();
                AudioMgr.Instance.PlaySfx(SoundName.Spawn);
                break;

              case State.IDLE:
                this.ShowPowerEffect(false);
                Utils.StopParticle(this.spawnEffect); // animator.Play("Idle1");

                this.PlayAnimIdle();
                this.idleParticle.play();
                break;

              case State.LANDING:
                this.rb.clearVelocity();
                this.PlayAnimLanding();

                if (BoxMgr.Instance.count > 1) {
                  this.CaculateScore();
                }

                GameMgr.Instance.OnLanding(); // //update direction

                this.direction = BoxMgr.Instance.position.clone().subtract(this.node.position);
                this.direction.normalize();
                this.direction.y = Math.tan(math.toRadian(70) * this.direction.length());
                this.landingEffect.play();
                setTimeout(this.LookatNextPlatform.bind(this), 500);
                AudioMgr.Instance.PlaySfx(SoundName.Landing);
                break;

              case State.JUMP:
                BoxMgr.Instance.currentBoxCtrl.DisableColidder();
                this.ShowPowerEffect(false);
                this.jumpTime = 0;
                this.rb.clearVelocity();
                this.rb.applyImpulse(this.forceDir);
                this.animation.play("Falling");
                AudioMgr.Instance.PlaySfx(SoundName.Jump);
                break;

              case State.DEAD:
                this.idleParticle.stop();
                this.animation.play("Die");
                setTimeout(function () {
                  GameMgr.Instance.GameOver();
                }, 1000);
                AudioMgr.Instance.PlaySfx(SoundName.Dead);
                break;
            }
          }
        };

        _proto.PlayAnimIdle = function PlayAnimIdle() {
          this.animation.play("Idle" + math.randomRangeInt(0, 5));
        };

        _proto.PlayAnimLanding = function PlayAnimLanding() {
          this.animation.play("Landing"); // this.animation.SetInteger("RandomIdle", Random.Range(0, 5));
        };

        _proto.ShowPowerEffect = function ShowPowerEffect(value) {
          if (value) {
            Utils.PlayParticle(this.powerEffect);
          } else {
            Utils.StopParticle(this.powerEffect);
          }
        };

        _proto.CaculateScore = function CaculateScore() {
          var playerPos = this.node.position.clone();
          playerPos.y = 0;
          var distance = Vec3.distance(BoxMgr.Instance.position, playerPos);
          distance = math.clamp(distance, 0, (Gameconfig.Instance.ScoreRange.length - 1) / 10);
          var index = Math.floor(distance * 10);
          var score = Gameconfig.Instance.ScoreRange[index];
          GameMgr.Instance.AddScore(score, index);
        };

        _proto.LookatNextPlatform = function LookatNextPlatform() {
          var _this3 = this;

          if (BoxMgr.Instance.IsShouldChangeDirection) {
            this.rb.isKinematic = true;
            var quat = new Quat();
            Quat.fromEuler(quat, 0, BoxMgr.Instance.direction == Direction.Left ? 90 : 0, 0);
            tween(this.node).to(0.5, {
              rotation: quat
            }, {
              easing: "backInOut"
            }).call(function () {
              _this3.rb.isKinematic = false;
            }).start();
            this.SetState(State.IDLE);
          } else {
            this.SetState(State.IDLE);
          }
        };

        _proto.Landing = function Landing(box) {
          if (this.state == State.JUMP || this.state == State.INIT) {
            if (box.name != this.currentBox) {
              this.currentBox = box.name;
              this.SetState(State.LANDING);
            }
          }
        };

        _proto.Dead = function Dead() {
          if (this.state != State.DEAD) {
            this.SetState(State.DEAD);
          }
        };

        _proto.Retry = function Retry() {
          this.SetState(State.INIT);
        };

        _proto.Playing = function Playing() {
          if (this.state == State.SPAWN) {
            this.SetState(State.LANDING);
          }
        };

        _proto.PickupItem = function PickupItem(item) {
          if (item) {
            GameMgr.Instance.PickupItem(item);
            item.Destroy();
          }
        };

        _proto.onCollisionEnter = function onCollisionEnter(event) {
          //if(state == State.JUMP)
          {
            if (event.otherCollider.node.layer == Layer.Box) {
              this.Landing(event.otherCollider.node);
            } else if (event.otherCollider.node.layer == Layer.Ground) {
              this.Dead();
            }
          }
        };

        _proto.OnTriggerEnter = function OnTriggerEnter(event) {
          if (event.otherCollider.node.layer == Layer.Item) {
            this.PickupItem(event.otherCollider.node.getComponent(Item));
          }
        };

        _createClass(Player, [{
          key: "Direction",
          get: function get() {
            return this.direction;
          }
        }, {
          key: "Position",
          get: function get() {
            return this.node.position;
          }
        }, {
          key: "ScorePosition",
          get: function get() {
            return this.scorePos.position;
          }
        }, {
          key: "Scoretarget",
          get: function get() {
            return this.scorePos;
          }
        }, {
          key: "IsReadyToPlay",
          get: function get() {
            return this.isReadyToPlay;
          }
        }], [{
          key: "Instance",
          get: function get() {
            return Player.instance;
          }
        }]);

        return Player;
      }(Component), _defineProperty(_class3, "instance", null), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rb", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "collider", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "animation", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "landingEffect", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "idleParticle", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "spawnEffect", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "powerEffect", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Loading.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Screen.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Screen;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      Screen = module.Screen;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "a0ca4ril05Do6f8vPERy1A4", "Loading", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Loading = exports('Loading', (_dec = ccclass('Loading'), _dec(_class = /*#__PURE__*/function (_Screen) {
        _inheritsLoose(Loading, _Screen);

        function Loading() {
          return _Screen.apply(this, arguments) || this;
        }

        return Loading;
      }(Screen)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SoundBtn.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './AudioMgr.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, SpriteFrame, Sprite, Component, AudioMgr;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "a7736Zo30pFHa4ObS0l9YZf", "SoundBtn", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SoundBtn = exports('SoundBtn', (_dec = ccclass('SoundBtn'), _dec2 = property(SpriteFrame), _dec3 = property(SpriteFrame), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SoundBtn, _Component);

        function SoundBtn() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "spriteOn", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spriteOff", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = SoundBtn.prototype;

        _proto.start = function start() {
          this.node.on("click", this.OnClick, this);
        };

        _proto.OnClick = function OnClick() {
          this.getComponent(Sprite).spriteFrame = AudioMgr.Instance.IsEnable ? this.spriteOn : this.spriteOff;
        };

        return SoundBtn;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spriteOn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spriteOff", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InGame.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Profile.ts', './Screen.ts', './UserHUD.ts', './GameMgr.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Label, Node, tween, Profile, Screen, UserHUD, GameMgr;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      tween = module.tween;
    }, function (module) {
      Profile = module.Profile;
    }, function (module) {
      Screen = module.Screen;
    }, function (module) {
      UserHUD = module.UserHUD;
    }, function (module) {
      GameMgr = module.GameMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

      cclegacy._RF.push({}, "a7db0n8ZptOpIqyJnP1Lj7Y", "InGame", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var InGame = exports('InGame', (_dec = ccclass('InGame'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(UserHUD), _dec5 = property(Node), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Screen) {
        _inheritsLoose(InGame, _Screen);

        function InGame() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Screen.call.apply(_Screen, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "score", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "time", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "userHUD", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "handTutorial", _descriptor4, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "tweenScore", null);

          return _this;
        }

        var _proto = InGame.prototype;

        _proto.onLoad = function onLoad() {
          InGame.instance = this;
        };

        _proto.start = function start() {// this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          // this.btnHistory.node.on("click", this.OnHistoryClick, this, true);
          // this.btnleaderBoard.node.on("click", this.OnLeaderboardClick, this);
          // this.btnEvent.node.on("click", this.OnEventClick, this);
          // this.btnSound.node.on("click", this.OnSoundClick, this);
          // this.btnMission.node.on("click", this.OnMissionClick, this);
          // this.btnTutorial.node.on("click", this.OnTutorialClick, this);
          // this.btnCloseGame.node.on("click", this.onClickCloseGame, this);
          // this.miniProgress.node.on("click", this.onMiniProgressClick, this);
          // this.btnGoldHour.node.on("click", this.OnGoldHourRankingClick, this);
          // this.btnReward.node.on("click", this.OnRewardClick, this);
          // this.score.node.active = false;
        } // onClickCloseGame() {
        //     if (this.tutorial.active) {
        //         this.OnHideTutorial();
        //     } else {
        //         let msgBox = MessageBox.Show(Text.ExitGameTitle, Text.ExitGameContent);
        //         msgBox.SetTypeYesNo(Text.Continues, Text.Exit,
        //             () => {
        //             },
        //             () => {
        //                 GameMgr.Instance.closeGame();
        //             });
        //     }
        // }
        // onTouchStart(ev) {
        //     this.onboarding.node.active = false;
        // }
        ;

        _proto.updateScore = function updateScore(score) {
          var _this2 = this;

          if (score <= 0) {
            this.score.string = Profile.Instance.Score.toString();
            return;
          }

          if (this.tweenScore) {
            this.tweenScore.stop();
          }

          var speed = 15; //score per seconds

          var time = Math.min(1, score / speed);
          this.tweenScore = tween({
            value: parseInt(this.score.string) || 0
          }).to(time, {
            value: Profile.Instance.Score
          }, {
            onUpdate: function onUpdate(target, ratio) {
              _this2.score.string = Math.floor(target.value).toString();
            }
          }).call(function () {
            _this2.score.string = Profile.Instance.Score.toString();
          });
          this.tweenScore.start();
        } // showTipOnboarding(isJumpSuccess: boolean, textIndex: number, force: number) {
        //     if (isJumpSuccess) {
        //         this.onboarding.successJump(textIndex);
        //     } else {
        //         this.onboarding.failJump(force);
        //     }
        //     this.onboarding.node.active = true;
        // }
        ;

        _proto.setVisible = function setVisible(isVisible) {// this.btnLayout.active = isVisible;
          // this.userHUD.node.active = isVisible;
          // this.miniProgress.node.active = isVisible;
          // this.score.node.active = !isVisible
        };

        _proto.turnOffHandTutorial = function turnOffHandTutorial() {
          if (this.handTutorial.active) {
            this.handTutorial.active = false;
          }
        } // setInfoMiniProgress(data: typeof ApiMock.getProgress.data) {
        //     this.miniProgress.setInfo(data);
        // }
        ;

        _proto.Reset = function Reset() {
          this.updateScore(0);
        };

        _proto.updateTime = function updateTime(value) {
          value = Math.round(value);
          var min = Math.floor(value / 60);
          var sec = value - min * 60;
          this.time.string = min + ":" + sec;
        };

        _createClass(InGame, [{
          key: "IsOk",
          get: function get() {
            return Profile.Instance.iSOk;
          }
        }, {
          key: "IsPlaying",
          get: function get() {
            return GameMgr.Instance.IsPlaying;
          } // public OnTutorialClick() {
          //     const isVisible = !this.tutorial.active
          //     this.tutorial.active = isVisible;
          //     this.hideTutorial.active = isVisible;
          //     this.score.node.active = !isVisible;
          //     this.handTutorial.active = !isVisible;
          //     this.notification.active = !isVisible;
          // }
          // public OnHideTutorial() {
          //     if (this.tutorial.active) {
          //         this.tutorial.active = false;
          //         this.hideTutorial.active = false;
          //     }
          //     this.score.node.active = true;
          // }

        }], [{
          key: "Instance",
          get: function get() {
            return InGame.instance;
          }
        }]);

        return InGame;
      }(Screen), _defineProperty(_class3, "instance", null), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "score", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "time", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "userHUD", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "handTutorial", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MessageBox.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts', './NetworkMgr.ts', './Popup.ts', './PopupMgr.ts', './TextDefine.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Label, Sprite, Button, PopupName, NetworkMgr, Popup, PopupMgr, Text;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Sprite = module.Sprite;
      Button = module.Button;
    }, function (module) {
      PopupName = module.PopupName;
    }, function (module) {
      NetworkMgr = module.NetworkMgr;
    }, function (module) {
      Popup = module.Popup;
    }, function (module) {
      PopupMgr = module.PopupMgr;
    }, function (module) {
      Text = module.Text;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

      cclegacy._RF.push({}, "aa4dbR79mdBM4DbTw+iqAVC", "MessageBox", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MsgBoxType;

      (function (MsgBoxType) {
        MsgBoxType[MsgBoxType["OK"] = 0] = "OK";
        MsgBoxType[MsgBoxType["YesNo"] = 1] = "YesNo";
      })(MsgBoxType || (MsgBoxType = {}));

      var MessageBox = exports('MessageBox', (_dec = ccclass('MessageBox'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Sprite), _dec8 = property(Button), _dec9 = property(Button), _dec10 = property(Button), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Popup) {
        _inheritsLoose(MessageBox, _Popup);

        function MessageBox() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Popup.call.apply(_Popup, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "lbTitle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbDescription", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbBtnOk", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbBtnYes", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbBtnNo", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "icon", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "btOk", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "btYes", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "btno", _descriptor9, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "okCallback", null);

          _defineProperty(_assertThisInitialized(_this), "yesCallback", null);

          _defineProperty(_assertThisInitialized(_this), "noCallback", null);

          _defineProperty(_assertThisInitialized(_this), "type", MsgBoxType.OK);

          return _this;
        }

        var _proto = MessageBox.prototype;

        _proto.start = function start() {
          _Popup.prototype.start.call(this);

          this.btOk.node.on("click", this.OnOkClick.bind(this));
          this.btYes.node.on("click", this.OnYesClick.bind(this));
          this.btno.node.on("click", this.OnNoClick.bind(this));
        };

        _proto.OnOkClick = function OnOkClick() {
          if (this.okCallback) {
            this.okCallback();
          }

          this.Hide();
        };

        _proto.OnYesClick = function OnYesClick() {
          if (this.yesCallback) {
            this.yesCallback();
          }

          this.Hide();
        };

        _proto.OnNoClick = function OnNoClick() {
          if (this.noCallback) {
            this.noCallback();
          }

          this.Hide();
        };

        _proto.SetInfo = function SetInfo(title, description, image) {
          var _this2 = this;

          this.lbTitle.string = title;
          this.lbDescription.string = description;

          if (this.icon && image && image != "") {
            NetworkMgr.geSpriteFrameAsync(image).then(function (result) {
              if (result) {
                _this2.icon.spriteFrame = result;
              }
            })["catch"](function (e) {
              console.warn(e);
            });
          }
        };

        _proto.SetTypeOk = function SetTypeOk(textOk, callback) {
          this.lbBtnOk.string = textOk;
          this.okCallback = callback;
          this.SetType(MsgBoxType.OK);
        };

        _proto.SetTypeYesNo = function SetTypeYesNo(textYes, textNo, yesCallback, noCallback) {
          this.lbBtnNo.string = textNo;
          this.lbBtnYes.string = textYes;
          this.yesCallback = yesCallback;
          this.noCallback = noCallback;
          this.SetType(MsgBoxType.YesNo);
        };

        _proto.SetType = function SetType(type) {
          this.lbBtnNo.node.parent.active = false;
          this.lbBtnYes.node.parent.active = false;
          this.lbBtnOk.node.parent.active = false;

          switch (type) {
            case MsgBoxType.OK:
              this.lbBtnOk.node.parent.active = true;
              break;

            case MsgBoxType.YesNo:
              this.lbBtnNo.node.parent.active = true;
              this.lbBtnYes.node.parent.active = true;
              break;
          }
        };

        MessageBox.Show = function Show(title, description, image) {
          if (image === void 0) {
            image = "";
          }

          if (PopupMgr.Instance) {
            var msgBox = PopupMgr.Instance.Show(PopupName.MessageBox);
            msgBox.SetInfo(title, description, image);
            msgBox.SetTypeOk(Text.Close, function () {});
            return msgBox;
          }
        };

        return MessageBox;
      }(Popup), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbTitle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbDescription", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbBtnOk", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbBtnYes", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lbBtnNo", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "btOk", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "btYes", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "btno", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Intro.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './MySprite.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, ToggleContainer, PageView, Label, ProgressBar, Button, Toggle, math, instantiate, Component, MySprite;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ToggleContainer = module.ToggleContainer;
      PageView = module.PageView;
      Label = module.Label;
      ProgressBar = module.ProgressBar;
      Button = module.Button;
      Toggle = module.Toggle;
      math = module.math;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      MySprite = module.MySprite;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

      cclegacy._RF.push({}, "aaa30nGU1BMDa1VgHjvrZjJ", "Intro", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Intro = exports('Intro', (_dec = ccclass('Intro'), _dec2 = property(ToggleContainer), _dec3 = property(PageView), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(ProgressBar), _dec7 = property(Button), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Intro, _Component);

        function Intro() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "toggles", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "pageView", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "title", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "body", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "progress", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "btnChoiNgay", _descriptor6, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "sceneName", "main");

          _defineProperty(_assertThisInitialized(_this), "firstTime", true);

          _defineProperty(_assertThisInitialized(_this), "finishCallback", null);

          _defineProperty(_assertThisInitialized(_this), "BannerInfoList", [{
            title: 'Tích điểm đổi quà',
            body: 'Tranh tài bật nhảy, tổng điểm càng cao, quà càng xịn',
            link: ''
          }, {
            title: 'Giờ vàng nhân đôi',
            body: 'Giờ Vàng mỗi ngày, đổi điểm thưởng nhân đôi quà tặng',
            link: ''
          }, {
            title: 'Vinh danh trùm cuối',
            body: 'TOP 100 cao thủ chắc chắn có thưởng đến 10 triệu đồng',
            link: ''
          }]);

          return _this;
        }

        var _proto = Intro.prototype;

        _proto.start = function start() {
          var self = this;
          self.btnChoiNgay.node.on('click', self.onClickChoiNgay, self);
          self.toggles.node.children.forEach(function (child, index) {
            child.on(Toggle.EventType.CLICK, self.onToggleClick.bind(self));
          });
          self.pageView.node.on(PageView.EventType.SCROLL_ENDED, self.onScrollEnd, self); //add toggle relative pages

          for (var i = 0, size = this.pageView.getPages().length; i < size; i++) {
            var page = this.pageView.getPages()[i].getComponent(MySprite);

            if (page) {
              page.correctSpriteFrameSize(math.size(750, 825));
            }

            var toggle = this.toggles.node.children[i];

            if (this.toggles.node.children.length < i + 1) {
              toggle = instantiate(this.toggles.node.children[0]);
              this.toggles.node.addChild(toggle);
            }

            toggle.name = i.toString(); //marked page idx
          }
        };

        _proto.show = function show(finish) {
          this.finishCallback = finish;
          this.btnChoiNgay.node.active = false; //fake playing
          // this.progress.node.active = false;
          // this.progress.progress = 0;
          // tween(this.progress)
          //     .to(1, { progress: 1 }, { easing: "backInOut" })
          //     .call(() => this.OnSceneLoaded(null, null))
          //     .start();

          this.OnSceneLoaded(null, null); //director.preloadScene(this.sceneName, this.OnLoadSceneProgress.bind(this), this.OnSceneLoaded.bind(this));
        };

        _proto.OnSceneLoaded = function OnSceneLoaded(error, sceneAsset) {
          // if (error) {
          //     location.reload();
          // } else if (this.firstTime == false) {
          //     this.onClickChoiNgay();
          // } else {
          //     this.btnChoiNgay.node.active = true;
          //     this.progress.node.active = false;
          // }
          this.btnChoiNgay.node.active = true;
          this.progress.node.active = false;
        };

        _proto.OnLoadSceneProgress = function OnLoadSceneProgress(completedCount, totalCount, item) {
          this.progress.progress = Math.min(1, completedCount / totalCount);
        };

        _proto.onClickChoiNgay = function onClickChoiNgay() {
          this.btnChoiNgay.interactable = false;
          this.node.active = false;
          this.node.children.forEach(function (child) {
            child.destroy();
          });
          this.node.removeAllChildren();
          this.node.destroy();

          if (this.finishCallback) {
            this.finishCallback();
          } //director.loadScene(this.sceneName);

        };

        _proto.onToggleClick = function onToggleClick(event) {// let pageIdx = parseInt(event.target.name) || 0;
          // this.loadPageIdx(pageIdx);
        };

        _proto.onScrollEnd = function onScrollEnd(event) {
          var pageIdx = this.pageView.getCurrentPageIndex();
          this.loadPageIdx(pageIdx);
          this.toggles.toggleItems.forEach(function (toggle) {
            if (parseInt(toggle.node.name) === pageIdx) {
              toggle.isChecked = true;
            } else {
              toggle.isChecked = false;
            }
          });
        };

        _proto.loadPageIdx = function loadPageIdx(pageIdx) {
          //this.pageView.setCurrentPageIndex(pageIdx);
          this.title.string = this.BannerInfoList[pageIdx].title;
          this.body.string = this.BannerInfoList[pageIdx].body;
        };

        return Intro;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "toggles", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pageView", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "body", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "progress", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "btnChoiNgay", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Onboarding.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Label, Node, Component, GameDefine;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      GameDefine = module.GameDefine;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "ae2baDNU/dP9Lc1VadRZ26Y", "Onboarding", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Onboarding = exports('Onboarding', (_dec = ccclass('Onboarding'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Onboarding, _Component);

        function Onboarding() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "title", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "desc", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "holderTip", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "SUCCESS_JUMPS", [['Tuyệt vời, bạn ra dáng dân chuyên', 'Giậm nhảy thành công. Càng gần tâm điểm sẽ càng cao.'], ['Xuất sắc, cao thủ nhảy bật là đây', 'Cú nhảy Tuyệt Vời. Tiếp tục phát huy nhé'], ['Quá đỉnh, trùm cuối là bạn chứ ai', 'Bạn thật xuất sắc! Tiếp tục nhảy bật nhận quà nhé.']]);

          _defineProperty(_assertThisInitialized(_this), "BadJumpTitle", 'Lực nhảy quá nhẹ');

          _defineProperty(_assertThisInitialized(_this), "BadJump", 'Chạm và giữ tay lâu hơn để tạo đủ lực nhảy. Nhảy trúng hộp điểm thưởng về tay!');

          _defineProperty(_assertThisInitialized(_this), "StrongJumpTitle", 'Bạn nhảy mạnh quá rồi');

          _defineProperty(_assertThisInitialized(_this), "StrongJump", 'Hãy giữ tay nhẹ hơn để tạo lực vừa đủ. Nhảy trúng hộp chắc chắn có điểm!');

          return _this;
        }

        var _proto = Onboarding.prototype;

        _proto.onLoad = function onLoad() {
          var _this2 = this;

          this.node.on(Node.EventType.TOUCH_START, function () {
            _this2.node.active = false;
          });
        };

        _proto.loadView = function loadView(title, desc) {
          this.holderTip.active = true;
          this.node.active = true;
          this.title.string = title;
          this.desc.string = desc;
        };

        _proto.successJump = function successJump(textIndex) {
          this.loadView(this.SUCCESS_JUMPS[Math.min(2, textIndex - 1)][0], this.SUCCESS_JUMPS[Math.min(2, textIndex - 1)][1]);
        };

        _proto.failJump = function failJump(force) {
          if (force < GameDefine.OB_MIN_FORCE) {
            this.loadView(this.BadJumpTitle, this.BadJump);
          } else {
            this.loadView(this.StrongJumpTitle, this.StrongJump);
          }
        };

        return Onboarding;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "desc", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "holderTip", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TrimBase64.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "ae9803V6JNEHZ77G55LB9hY", "TrimBase64", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var TrimBase64 = exports('TrimBase64', (_dec = ccclass('TrimBase64'), _dec(_class = /*#__PURE__*/function () {
        function TrimBase64() {}

        TrimBase64.trimCanvas = function trimCanvas(c) {
          var ctx = c.getContext('2d'),
              copy = document.createElement('canvas').getContext('2d'),
              pixels = ctx.getImageData(0, 0, c.width, c.height),
              l = pixels.data.length,
              i,
              bound = {
            top: null,
            left: null,
            right: null,
            bottom: null
          },
              x,
              y;

          for (i = 0; i < l; i += 4) {
            if (pixels.data[i + 3] !== 0) {
              x = i / 4 % c.width;
              y = ~~(i / 4 / c.width);

              if (bound.top === null) {
                bound.top = y;
              }

              if (bound.left === null) {
                bound.left = x;
              } else if (x < bound.left) {
                bound.left = x;
              }

              if (bound.right === null) {
                bound.right = x;
              } else if (bound.right < x) {
                bound.right = x;
              }

              if (bound.bottom === null) {
                bound.bottom = y;
              } else if (bound.bottom < y) {
                bound.bottom = y;
              }
            }
          }

          var trimHeight = bound.bottom - bound.top + 1,
              trimWidth = bound.right - bound.left + 1,
              trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
          copy.canvas.width = trimWidth;
          copy.canvas.height = trimHeight;
          copy.putImageData(trimmed, 0, 0); // open new window with trimmed image:

          return copy.canvas;
        };

        return TrimBase64;
      }()) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetworkMgr.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Profile.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, assetManager, SpriteFrame, Texture2D, Component, Profile;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      assetManager = module.assetManager;
      SpriteFrame = module.SpriteFrame;
      Texture2D = module.Texture2D;
      Component = module.Component;
    }, function (module) {
      Profile = module.Profile;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "b72b0V4dQJJTLMgBo4CZ95K", "NetworkMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var NetworkMgr = exports('NetworkMgr', (_dec = ccclass('NetworkMgr'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(NetworkMgr, _Component);

        function NetworkMgr() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = NetworkMgr.prototype;

        _proto.start = function start() {};

        NetworkMgr.getRequest = function getRequest(url, callback) {
          var XMLHttp = new XMLHttpRequest();
          XMLHttp.open("GET", url, true);
          XMLHttp.timeout = 3000; // time in milliseconds

          XMLHttp.responseType = "json";
          XMLHttp.setRequestHeader('Authorization', "Bearer " + Profile.Instance.UserToken);
          XMLHttp.setRequestHeader("Content-Type", "application/json");
          console.log("[NetworkMgr] GET: " + " " + url);

          XMLHttp.onreadystatechange = function () {
            console.log("state = " + XMLHttp.readyState + " status =" + XMLHttp.status);

            if (XMLHttp.readyState == 4) {
              if (XMLHttp.status == 200) {
                switch (XMLHttp.responseType) {
                  case 'text':
                    // console.log(XMLHttp.responseText);
                    callback(XMLHttp.responseText);
                    break;

                  default:
                    // console.log(XMLHttp.response);
                    callback(XMLHttp.response);
                    break;
                }
              } else if (XMLHttp.status >= 400 || XMLHttp.status === 0) {
                callback(null);
              }
            }
          };

          XMLHttp.send();
        };

        NetworkMgr.postRequest = function postRequest(url, params, callback) {
          return new Promise(function (resolve, reject) {
            var XMLHttp = new XMLHttpRequest();
            XMLHttp.open("POST", url, true);
            XMLHttp.timeout = 3000; // time in milliseconds

            XMLHttp.responseType = "json";
            XMLHttp.setRequestHeader('Authorization', "Bearer " + Profile.Instance.UserToken);
            XMLHttp.setRequestHeader("Content-Type", "application/json");
            console.log("[NetworkMgr] POST: " + " " + url);

            XMLHttp.onreadystatechange = function () {
              console.log("state = " + XMLHttp.readyState + " status =" + XMLHttp.status);

              if (XMLHttp.readyState == 4) {
                if (XMLHttp.status == 200) {
                  switch (XMLHttp.responseType) {
                    case 'text':
                      // console.log(XMLHttp.responseText);
                      callback(XMLHttp.responseText);
                      break;

                    default:
                      // console.log(XMLHttp.response);
                      callback(XMLHttp.response);
                      break;
                  }
                } else if (XMLHttp.status >= 400 || XMLHttp.status === 0) {
                  callback(null);
                }
              }
            };

            XMLHttp.send(JSON.stringify(params));
          });
        };

        NetworkMgr.geSpriteFrameAsync = function geSpriteFrameAsync(imgUrl) {
          imgUrl = imgUrl.replace("img.mservice.io", "atc-edge03.mservice.com.vn");
          return new Promise(function (resolve, reject) {
            assetManager.loadRemote(imgUrl, {
              cacheEnabled: true,
              maxRetryCount: 0
            }, function (err, imageAsset) {
              if (err) {
                resolve(null);
                console.warn(err);
              } else {
                if (imageAsset) {
                  var spriteFrame = new SpriteFrame();
                  var texture = new Texture2D();
                  texture.image = imageAsset;
                  spriteFrame.texture = texture;
                  resolve(spriteFrame);
                } else {
                  resolve(null);
                }
              }
            });
          });
        };

        return NetworkMgr;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ObstacleMgr.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Obstacle.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Prefab, NodePool, math, instantiate, Component, Obstacle;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      NodePool = module.NodePool;
      math = module.math;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      Obstacle = module.Obstacle;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _class3, _temp;

      cclegacy._RF.push({}, "b86e3ObYfpFooPIDp4EclWo", "ObstacleMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ObstacleMgr = exports('ObstacleMgr', (_dec = ccclass('ObstacleMgr'), _dec2 = property([Prefab]), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ObstacleMgr, _Component);

        function ObstacleMgr() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "dummies", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "parentObs", null);

          _defineProperty(_assertThisInitialized(_this), "pools", []);

          return _this;
        }

        var _proto = ObstacleMgr.prototype;

        _proto.onLoad = function onLoad() {
          ObstacleMgr.instance = this;

          for (var i = 0; i < this.dummies.length; i++) {
            this.pools.push(new NodePool());
          }
        };

        _proto.Spawn = function Spawn(parent, spawnPosition) {
          var tree = this.GetOrCreate(parent);
          tree.setPosition(spawnPosition);
          tree.getComponent(Obstacle).playOnLoad();
        };

        _proto.GetOrCreate = function GetOrCreate(parent) {
          var obs;
          var idx = math.randomRangeInt(0, 100) >= 70 ? 0 : 1;

          if (this.pools[idx].size() > 0) {
            obs = this.pools[idx].get();
          } else if (this.dummies.length > 1) {
            obs = instantiate(this.dummies[idx]);
          }

          parent.addChild(obs);
          return obs;
        } // ReturnPool(node: Node) {
        //     this.pools.put(node);
        // }
        ;

        _proto.Reset = function Reset() {// while (this.list.length > 0) {
          //     console.log(`current size tree ${this.list.length}`)
          //     this.ReturnPool(this.list.pop())
          //     console.log(`after size tree ${this.list.length}`)
          // }
        };

        _createClass(ObstacleMgr, null, [{
          key: "Instance",
          get: function get() {
            return this.instance;
          }
        }]);

        return ObstacleMgr;
      }(Component), _defineProperty(_class3, "instance", null), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "dummies", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameApi.ts", ['cc', './Api.ts', './NetworkMgr.ts'], function (exports) {
  'use strict';

  var cclegacy, Api, NetworkMgr;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Api = module.Api;
    }, function (module) {
      NetworkMgr = module.NetworkMgr;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ba4b7JbNotHybnbVqsYJgFq", "GameApi", undefined);

      var GameApi = exports('GameApi', /*#__PURE__*/function () {
        function GameApi() {} //GIFT HISTORY


        GameApi.getGiftHistory = function getGiftHistory(size, page, callback) {
          return NetworkMgr.getRequest(Api.HOST + Api.GiftHistory + ("/" + page + "/" + size), callback);
        } //GAME START
        ;

        GameApi.postStartGame = function (_postStartGame) {
          function postStartGame(_x) {
            return _postStartGame.apply(this, arguments);
          }

          postStartGame.toString = function () {
            return _postStartGame.toString();
          };

          return postStartGame;
        }(function (responseCallback) {
          return NetworkMgr.postRequest(Api.HOST + Api.StartGame, {
            "requestId": "test test test" //lcheat

          }, responseCallback);
        });

        GameApi.onboardingReset = function onboardingReset(responseCallback) {
          return NetworkMgr.postRequest(Api.OnboardingReset, {
            "userId": "0937432551" //lcheat

          }, responseCallback);
        };

        GameApi.LBWeekly = function LBWeekly(limit) {
          return Api.GLOBAL_RANKING + "&frequency=NORMAL&limit=" + limit;
        };

        GameApi.LBAll = function LBAll(limit) {
          return Api.GLOBAL_RANKING + "&frequency=MONTH&limit=" + limit;
        };

        GameApi.LBFriendWeekly = function LBFriendWeekly(limit) {
          return Api.FRIEND_RANKING + "&frequency=NORMAL&limit=" + limit;
        };

        GameApi.LBFriendAll = function LBFriendAll(limit) {
          return Api.FRIEND_RANKING + "&frequency=MONTH&limit=" + limit;
        } //
        ;

        GameApi.getRankGlobalAll = function getRankGlobalAll(callback) {
          NetworkMgr.getRequest(Api.LBAll(100), callback);
        };

        GameApi.getRankFriendAll = function getRankFriendAll(callback) {
          NetworkMgr.getRequest(Api.LBFriendAll(100), callback);
        };

        GameApi.getRankFriendWeekly = function getRankFriendWeekly(callback) {
          NetworkMgr.getRequest(Api.LBFriendWeekly(100), callback);
        };

        GameApi.getRankGlobleWeekly = function getRankGlobleWeekly(callback) {
          NetworkMgr.getRequest(Api.LBWeekly(100), callback);
        };

        GameApi.AppVazV2 = function AppVazV2() {
          if (window.realtimeSinceStartup) {
            var loadtime = (Date.now() - window.realtimeSinceStartup) / 1000;
            var body = [{
              eventType: "DUR",
              appVersion: Api.VERSION,
              osPlatform: "web",
              env: Api.IS_DEV ? "dev" : "prod",
              flow: "home",
              step: "load_game_resources",
              api: Api.GAME_ID,
              //vn_momo_web_megaluckywheel_game
              serviceName: Api.SERVICE_NAME,
              //megaday
              value: loadtime
            }];
            console.log(body);
            return NetworkMgr.postRequest(Api.HOST + Api.APPVARZ_V2, body, function (result) {});
          }
        };

        GameApi.getMission = function getMission(callback) {
          NetworkMgr.getRequest(Api.HOST + Api.Mission, callback);
        };

        GameApi.getProgress = function getProgress(callback) {
          NetworkMgr.getRequest(Api.HOST + Api.Progress, callback);
        };

        GameApi.postClaimProgressReward = function postClaimProgressReward(data, callback) {
          NetworkMgr.postRequest(Api.HOST + Api.Progress_Claim, {
            milestoneId: data.milestoneId,
            rewardId: data.rewardId
          }, callback);
        };

        GameApi.postSuccessShareFB = function postSuccessShareFB(callback) {
          return NetworkMgr.postRequest(Api.HOST + Api.MissionCompleted, {
            "game_id": Api.GAME,
            "mission_id": "share_fb",
            "partner_ids": []
          }, callback);
        };

        GameApi.genDeepLink = function genDeepLink(data, callback) {
          return NetworkMgr.postRequest(Api.HOST + Api.DEEP_LINK, {
            link: data.link,
            title: data.title,
            description: data.description,
            imageLink: data.imageLink,
            domain: data.domain,
            fallbackLink: data.fallbackLink // originalLink: data.originalLink,                

          }, callback);
        };

        GameApi.getTurn = function (_getTurn) {
          function getTurn(_x2) {
            return _getTurn.apply(this, arguments);
          }

          getTurn.toString = function () {
            return _getTurn.toString();
          };

          return getTurn;
        }(function (callback) {
          NetworkMgr.getRequest(Api.HOST + Api.GameTurn, function (result) {
            callback(result);
          });
        });

        GameApi.getGoldHourRank = function getGoldHourRank(callback) {
          NetworkMgr.getRequest(Api.GoldHourRank(100), callback);
        };

        return GameApi;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RankItem.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts', './MySprite.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Label, Sprite, SpriteFrame, UITransform, Color, Component, GameDefine, MySprite;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      UITransform = module.UITransform;
      Color = module.Color;
      Component = module.Component;
    }, function (module) {
      GameDefine = module.GameDefine;
    }, function (module) {
      MySprite = module.MySprite;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _temp;

      cclegacy._RF.push({}, "bfa60Kgzx1KsoT8Swmu2FoI", "RankItem", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var RankItem = exports('RankItem', (_dec = ccclass('RankItem'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Sprite), _dec6 = property(Sprite), _dec7 = property([SpriteFrame]), _dec8 = property(SpriteFrame), _dec9 = property(SpriteFrame), _dec10 = property(SpriteFrame), _dec11 = property(MySprite), _dec12 = property(SpriteFrame), _dec13 = property(UITransform), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RankItem, _Component);

        function RankItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "scoreLabel", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nameLabel", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "rankingLabel", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "bg", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "icon", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "rankIcons", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "noneIcon", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "normalBg", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "myBg", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "avatar", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "defaultAvatar", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "rect", _descriptor12, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "item", void 0);

          return _this;
        }

        var _proto = RankItem.prototype;

        _proto.loadView = function loadView(item, isMe) {
          if (this.item != item) {
            this.item = item;
            this.scoreLabel.string = item.point.toString();
            this.nameLabel.string = '';

            if (item.name.length == 0) {
              this.nameLabel.string = item.userId;
            } else {
              var names = item.name.toUpperCase().split(' ').slice(-2);

              for (var i = 0; i < names.length; i++) {
                this.nameLabel.string += names[i] + ' ';
              }
            }

            this.bg.spriteFrame = isMe ? this.myBg : this.normalBg;
            this.bg.color = isMe ? Color.WHITE : item.rank <= 3 ? GameDefine.RANK_ITEM_TOP_COLOR.clone() : GameDefine.RANK_ITEM_NONE_COLOR.clone();
            this.SetRank(item.rank);
          }
        };

        _proto.SetRank = function SetRank(rank) {
          var isShowIcon = rank > 0 && rank <= this.rankIcons.length;

          if (isShowIcon) {
            this.icon.spriteFrame = this.rankIcons[rank - 1];
            this.icon.color = Color.WHITE.clone();
            this.icon.node.active = true;
            this.rankingLabel.node.active = false;
          } else {
            this.icon.spriteFrame = this.noneIcon.clone();
            this.icon.color = GameDefine.RANK_ITEM_NONE_COLOR.clone();
            this.rankingLabel.string = rank.toString();
            this.rankingLabel.node.active = true;
          }

          this.LoadAvatar();
        };

        _proto.canLoadAvatar = function canLoadAvatar() {
          return this.item.avatarUrl && this.item.avatarUrl.length > 0;
        };

        _proto.LoadAvatar = function LoadAvatar() {
          this.avatar.correctSpriteFrameSize(GameDefine.RANK_AVATAR_SIZE);
          this.avatar.Fetch(this.item.avatarUrl);
        };

        _proto.loadAvatarDefault = function loadAvatarDefault() {
          this.avatar.setSprite(this.defaultAvatar);
        };

        return RankItem;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nameLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rankingLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "rankIcons", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "noneIcon", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "normalBg", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "myBg", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "avatar", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "defaultAvatar", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "rect", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PopupMgr.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts', './Popup.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Prefab, instantiate, resources, Component, PopupName, Popup;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      resources = module.resources;
      Component = module.Component;
    }, function (module) {
      PopupName = module.PopupName;
    }, function (module) {
      Popup = module.Popup;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _class3, _temp;

      cclegacy._RF.push({}, "c11c1DECexCEJoTf4nhLRP9", "PopupMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PopupMgr = exports('PopupMgr', (_dec = ccclass('PopupMgr'), _dec2 = property(Prefab), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PopupMgr, _Component);

        function PopupMgr() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "prefabs", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = PopupMgr.prototype;

        _proto.onLoad = function onLoad() {
          PopupMgr.instance = this;
        };

        _proto.Show = function Show(name, onClose) {
          if (onClose === void 0) {
            onClose = null;
          }

          if (!this.node.getChildByName(name)) {
            var prefab = this.prefabs.find(function (prefab) {
              return prefab.data.name == name;
            });

            if (prefab) {
              var popup = instantiate(prefab).getComponent(Popup);

              if (onClose) {
                popup.onClose = onClose;
              }

              popup.node.setParent(this.node);
              popup.node.name = name;
              popup.Show();
              return popup;
            }
          }
        };

        _proto.Hide = function Hide(name) {
          this.node.children.forEach(function (child) {
            if (child.name == name) {
              child.getComponent(Popup).Hide();
            }
          });
        };

        _proto.IsContain = function IsContain(name) {
          var result = false;
          this.prefabs.forEach(function (child) {
            if (child.data.name == name) {
              result = true;
              return;
            }
          });
          return result;
        };

        _proto.Load = function Load() {
          var _this2 = this;

          var array = Object.keys(PopupName);
          array.forEach(function (element) {
            if (!_this2.IsContain(element)) {
              resources.load("prefabs/popups/" + element, function (err, prefab) {
                if (prefab) {
                  _this2.prefabs.push(prefab);

                  console.log("Popup loaded: " + element);
                } else {
                  console.error("Popup loade fail: " + element);
                }
              }); // Utils.getPrefabBoundle(boundle, "prefabs/popups/" + element, prefab => {
              //     if (prefab) {
              //         this.prefabs.push(prefab);
              //         console.log("Popup loaded: " + element);
              //     }
              //     else {
              //         console.error("Popup loade fail: " + element);
              //     }
              // });
            }
          });
        };

        _createClass(PopupMgr, null, [{
          key: "Instance",
          get: function get() {
            return PopupMgr.instance;
          }
        }]);

        return PopupMgr;
      }(Component), _defineProperty(_class3, "instance", null), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefabs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Screen.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "c58fb0UaBdPmZ0HsdHZQMxC", "Screen", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Screen = exports('Screen', (_dec = ccclass('Screen'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Screen, _Component);

        function Screen() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = Screen.prototype;

        _proto.Show = function Show() {
          this.node.active = true;
        };

        _proto.Hide = function Hide() {
          this.node.active = false;
        };

        return Screen;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClaimButton.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Node, Vec3, tween, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec3 = module.Vec3;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "c5f3fZmAd1HYoZ/ZX6y7Yex", "ClaimButton", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ClaimButton = exports('ClaimButton', (_dec = ccclass('ClaimButton'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ClaimButton, _Component);

        function ClaimButton() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "effect1", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "effect2", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "scaleSmall", new Vec3(0.3, 0.3, 1));

          _defineProperty(_assertThisInitialized(_this), "scaleLarge", new Vec3(0.6, 0.6, 1));

          return _this;
        }

        var _proto = ClaimButton.prototype;

        _proto.start = function start() {
          this.startEffectAction(this.effect1);
          this.startEffectAction(this.effect2);
        };

        _proto.startEffectAction = function startEffectAction(effect) {
          var scaleOut = tween(effect).to(0.5, {
            scale: this.scaleSmall
          });
          var scaleIn = tween(effect).to(0.5, {
            scale: this.scaleLarge
          });
          var scale = tween(effect).sequence(scaleOut, scaleIn);
          tween(effect).repeatForever(scale).start();
        };

        return ClaimButton;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "effect1", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "effect2", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MyGift.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './MaxApiUtils.ts', './MyGiftCell.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ScrollView, Layout, Component, MaxApiUtils, MyGiftCell;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ScrollView = module.ScrollView;
      Layout = module.Layout;
      Component = module.Component;
    }, function (module) {
      MaxApiUtils = module.default;
    }, function (module) {
      MyGiftCell = module.MyGiftCell;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "c621bz3gpVGyYjSV0rOnQIa", "MyGift", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MyGift = exports('MyGift', (_dec = ccclass('MyGift'), _dec2 = property(ScrollView), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MyGift, _Component);

        function MyGift() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "scrollView", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MyGift.prototype;

        _proto.loadView = function loadView(itemList) {
          //fix dummy ui 4 item
          for (var i = 0; i < 4; i++) {
            var giftItem = this.scrollView.content.children[i].getComponent(MyGiftCell);

            if (i < itemList.length) {
              giftItem.setInfo(itemList[i]);
              giftItem.node.active = true;
            } else {
              giftItem.node.active = false;
            }
          }

          this.scrollView.content.getComponent(Layout).updateLayout(true);
          var trackingList = [];

          for (var key in itemList) {
            if (itemList[key].giftId) trackingList.push(itemList[key].giftId);
          }

          MaxApiUtils.trackEvent({
            stage: 'game_award',
            'gift_list': trackingList
          });
        };

        return MyGift;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Item.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts', './AudioMgr.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, tween, Vec3, Component, SoundName, AudioMgr;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      SoundName = module.SoundName;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "d29ecftG0hEILH173Y9QJzY", "Item", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Item = exports('Item', (_dec = ccclass('Item'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Item, _Component);

        function Item() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "giftScore", null);

          _defineProperty(_assertThisInitialized(_this), "stepSpawn", -1);

          return _this;
        }

        var _proto = Item.prototype;

        _proto.Init = function Init(giftScore, stepCreate) {
          if (stepCreate === void 0) {
            stepCreate = -1;
          }

          this.giftScore = giftScore;
          this.stepSpawn = stepCreate;
        };

        _proto.Show = function Show() {
          this.node.active = true;
          this.node.scale = this.node.scale.clone().multiplyScalar(0.8);
          tween(this.node).to(0.3, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: "elasticOut"
          }).call(function () {}).start();

          if (this.giftScore) {
            this.giftScore.Show();
          }
        };

        _proto.Destroy = function Destroy() {
          AudioMgr.Instance.PlaySfx(SoundName.GetGift, true); //FlyScoreMgr.Instance.Create(this.node.parent, "+" + this.score);

          if (this.giftScore) {
            this.giftScore.Active();
          } // else
          // {
          //     FlyScoreMgr.Instance.Create(this.node.parent, "+" + this.score);
          // }


          this.node.destroy();
          this.stepSpawn = -1;
        };

        _createClass(Item, [{
          key: "StepSpawn",
          get: function get() {
            return this.stepSpawn;
          }
        }]);

        return Item;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MySprite.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Utils.ts', './NetworkMgr.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, _createClass, cclegacy, _decorator, Sprite, UITransform, Size, assetManager, SpriteFrame, Texture2D, Vec3, Component, Utils, NetworkMgr;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      UITransform = module.UITransform;
      Size = module.Size;
      assetManager = module.assetManager;
      SpriteFrame = module.SpriteFrame;
      Texture2D = module.Texture2D;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      NetworkMgr = module.NetworkMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "d56eeYe8MFLU4l4wOAycQQz", "MySprite", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          requireComponent = _decorator.requireComponent;
      var MySprite = exports('MySprite', (_dec = ccclass('MySprite'), _dec2 = requireComponent(Sprite), _dec3 = property(Sprite), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MySprite, _Component);

        function MySprite() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "sprite", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "url", "");

          _defineProperty(_assertThisInitialized(_this), "size", void 0);

          return _this;
        }

        var _proto = MySprite.prototype;

        _proto.onLoad = function onLoad() {
          if (!this.sprite) this.sprite = this.getComponent(Sprite);
          var uit = this.sprite.getComponent(UITransform);
          this.size = new Size(uit.width, uit.height);
          this.sprite.sizeMode = Sprite.SizeMode.RAW;
        };

        _proto.setFixedSize = function setFixedSize(fixedSize) {
          this.size = fixedSize.clone();
          this.sprite.sizeMode = Sprite.SizeMode.RAW;
        };

        _proto.correctSpriteFrameSize = function correctSpriteFrameSize(fixedSize) {
          this.setFixedSize(fixedSize);
          Utils.CorrectSpriteFrameSize(this.sprite, this.size);
        };

        _proto.Fetch = function Fetch(url) {
          var _this2 = this;

          if (url && this.url != url) {
            if (assetManager.assets.has(url)) {
              var spriteFrame = new SpriteFrame();
              var texture = new Texture2D();
              texture.image = assetManager.assets.get(url);
              spriteFrame.texture = texture;
              this.sprite.spriteFrame = spriteFrame;
              Utils.CorrectSpriteFrameSize(this.sprite, this.size);
            } else {
              NetworkMgr.geSpriteFrameAsync(url).then(function (frame) {
                if (frame) {
                  _this2.sprite.spriteFrame = frame;
                  Utils.CorrectSpriteFrameSize(_this2.sprite, _this2.size);
                }
              });
            }
          }
        };

        _proto.setSprite = function setSprite(spriteFrame, isResetScal) {
          if (isResetScal === void 0) {
            isResetScal = false;
          }

          this.sprite.spriteFrame = spriteFrame;

          if (isResetScal) {
            this.node.scale = Vec3.ONE;
          } else {
            Utils.CorrectSpriteFrameSize(this.sprite, this.size);
          }
        };

        _createClass(MySprite, [{
          key: "Sprite",
          get: function get() {
            return this.sprite;
          }
        }]);

        return MySprite;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "sprite", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HideTutorial.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './InGame.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Node, Component, InGame;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      InGame = module.InGame;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "de1f7FsyT5Gq5sZnV4wEQ4Y", "HideTutorial", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var HideTutorial = exports('HideTutorial', (_dec = ccclass('HideTutorial'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(HideTutorial, _Component);

        function HideTutorial() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = HideTutorial.prototype;

        _proto.start = function start() {
          this.node.on(Node.EventType.TOUCH_START, this.OnClick.bind(this));
        };

        _proto.OnClick = function OnClick(event) {
          InGame.Instance.OnHideTutorial();
          event.propagationStopped = true;
        };

        return HideTutorial;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OnboardingMgr.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts', './Api.ts', './NetworkMgr.ts', './Profile.ts'], function (exports) {
  'use strict';

  var _defineProperty, _inheritsLoose, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, director, Component, ProfileStorageKey, Api, NetworkMgr, Profile;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      ProfileStorageKey = module.ProfileStorageKey;
    }, function (module) {
      Api = module.Api;
    }, function (module) {
      NetworkMgr = module.NetworkMgr;
    }, function (module) {
      Profile = module.Profile;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "dea70eGCnFGdqdWWWL3EPTk", "OnboardingMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var OnboardingMgr = exports('OnboardingMgr', (_dec = ccclass('OnboardingMgr'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(OnboardingMgr, _Component);

        function OnboardingMgr() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_isComplete", false);

          _defineProperty(_assertThisInitialized(_this), "isShowBannerEvent", false);

          return _this;
        }

        var _proto = OnboardingMgr.prototype;

        _proto.getOnbardingStatus = function getOnbardingStatus(callback) {
          NetworkMgr.getRequest(Api.HOST + Api.OnboardingStatus, function (resp) {
            if (resp && resp.items) {
              OnboardingMgr.instance.setComplete(resp.items.isOnboarding); //true is complete onboarding

              OnboardingMgr.instance.IsShowBannerEvent = !resp.items.isOnboarding;
              callback(true);
            } else {
              callback(false);
            }
          });
        };

        _proto.postOnBoardingSubmit = function postOnBoardingSubmit(callback) {
          this.setComplete(true);
          NetworkMgr.postRequest(Api.HOST + Api.OnboardingSubmit, {}, callback);
        };

        _proto.init = function init() {
          this._isComplete = Profile.Instance.getItem(ProfileStorageKey.IsOnboardingCompete) || false;
        };

        _proto.isComplete = function isComplete() {
          return this._isComplete;
        };

        _proto.setComplete = function setComplete(isComplete) {
          this._isComplete = isComplete;
          Profile.Instance.setItem(ProfileStorageKey.IsOnboardingCompete, isComplete);
        };

        _createClass(OnboardingMgr, [{
          key: "IsShowBannerEvent",
          get: function get() {
            return OnboardingMgr.Instance.isShowBannerEvent;
          },
          set: function set(value) {
            OnboardingMgr.Instance.isShowBannerEvent = value;
          }
        }], [{
          key: "Instance",
          get: function get() {
            if (!OnboardingMgr.instance) {
              var node = new Node('OnboardingMgr');
              director.getScene().addChild(node);
              OnboardingMgr.instance = node.addComponent(OnboardingMgr);
              OnboardingMgr.instance.init();
            }

            return OnboardingMgr.instance;
          }
        }]);

        return OnboardingMgr;
      }(Component), _defineProperty(_class2, "instance", null), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TextDefine.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e19c0a/LP9JFLwLwIt5pY0V", "TextDefine", undefined);

      var Text = exports('Text', {
        Close: "\u0110\xF3ng",
        Exit: "Tho\xE1t",
        Continues: "Ch\u01A1i ti\u1EBFp",
        Retry: "Th\u1EED l\u1EA1i",
        Error: "L\u1ED7i",
        Back: "Quay l\u1EA1i",
        BackAfter: "Quay l\u1EA1i sau",
        Confirm: "X\xE1c nh\u1EADn",
        RewardError: "Kh\xF4ng th\u1EC3 nh\u1EADn qu\xE0 l\xFAc n\xE0y",
        ErrorGeneral: "Th\xF4ng b\xE1o l\u1ED7i t\u1EEB BE",
        NetworkError: "Vui l\xF2ng ki\u1EC5m tra l\u1EA1i k\u1EBFt n\u1ED1i",
        OutOfTurn: "H\u1EBET L\u01AF\u1EE2T",
        MoreDetail: "T\xECm hi\u1EC3u th\xEAm",
        Copied: "\u0110\xE3 sao ch\xE9p",
        ToastBusy: "Ch\u1EDD ch\xFAt nh\xE9!",
        OutOfFreeTurn: "B\u1EA1n \u0111\xE3 h\u1EBFt l\u01B0\u1EE3t mi\u1EC5n ph\xED",
        ExitGameTitle: "B\u1EA1n c\xF3 mu\u1ED1n tho\xE1t tr\xF2 ch\u01A1i?",
        ExitGameContent: "Tr\xF2 ch\u01A1i s\u1EBD k\u1EBFt th\xFAc v\xE0 ng\u01B0ng t\xEDnh \u0111i\u1EC3m n\u1EBFu b\u1EA1n tho\xE1t b\xE2y gi\u1EDD",
        AddTurnTip: "Sau m\u1ED7i {0} b\u1EA1n s\u1EBD nh\u1EADn \u0111\u01B0\u1EE3c 1 l\u01B0\u1EE3t mi\u1EC5n ph\xED khi s\u1ED1 l\u01B0\u1EE3t \u0111ang c\xF3 nh\u1ECF h\u01A1n {1}",
        ClaimGift: "x\xE1c nh\u1EADn ph\u1EA7n th\u01B0\u1EDFng",
        ClaimGiftContent: "B\u1EA1n \u0111\xE3 ch\u1ECDn ph\u1EA7n th\u01B0\u1EDFng d\u01B0\u1EDBi \u0111\xE2y, h\xE3y x\xE1c nh\u1EADn \u0111\u1EC3 nh\u1EADn ngay nh\xE9.",
        ClaimGiftLate: "B\u1EA1n ch\u1EADm tay r\u1ED3i",
        OutOfGift: "Qu\xE0 \u0111\xE3 h\u1EBFt, h\xE3y quay l\u1EA1i sau nh\xE9."
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Input.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts'], function (exports) {
  'use strict';

  var _defineProperty, _inheritsLoose, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, Component, TouchState;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      TouchState = module.TouchState;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "e1c6c5BxUBFlrIibwgDLx5h", "Input", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Input = exports('Input', (_dec = ccclass('Input'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Input, _Component);

        function Input() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "state", TouchState.None);

          _defineProperty(_assertThisInitialized(_this), "isTouchDown", false);

          return _this;
        }

        var _proto = Input.prototype;

        _proto.onLoad = function onLoad() {
          Input.instance = this;
          this.node.on(Node.EventType.TOUCH_START, this.onTouchBegan, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnded, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancelled, this);
        };

        _proto.lateUpdate = function lateUpdate() {
          if (this.state == TouchState.Down) {
            this.state = TouchState.Press;
          } else if (this.state == TouchState.Up) {
            this.state = TouchState.None;
          }
        };

        _proto.onTouchBegan = function onTouchBegan(event) {
          var touches = event.getTouches();
          this.isTouchDown = true;
          this.state = TouchState.Down;
          this.StopPropagation(event);
        };

        _proto.onTouchEnded = function onTouchEnded(event) {
          var touches = event.getTouches();
          this.isTouchDown = false;
          this.state = TouchState.Up;
          this.StopPropagation(event);
        };

        _proto.onTouchCancelled = function onTouchCancelled(event) {
          this.isTouchDown = false;
          this.state = TouchState.Up;
          this.StopPropagation(event);
        };

        _proto.onTouchMove = function onTouchMove(event) {
          var touches = event.getTouches();
          this.isTouchDown = true;
          this.state = TouchState.Press;
          this.StopPropagation(event);
        };

        _proto.StopPropagation = function StopPropagation(event) {//event.propagationImmediateStopped = true;
        };

        _createClass(Input, null, [{
          key: "Instance",
          get: function get() {
            return Input.instance;
          }
        }, {
          key: "State",
          get: function get() {
            return Input.instance.state;
          }
        }, {
          key: "IsTouchDown",
          get: function get() {
            return Input.instance.state == TouchState.Down;
          }
        }, {
          key: "IsTouchUp",
          get: function get() {
            return Input.instance.state == TouchState.Up;
          }
        }]);

        return Input;
      }(Component), _defineProperty(_class2, "instance", null), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScoreEffect.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts', './AudioMgr.ts', './GameMgr.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, Label, Vec3, tween, Component, GameDefine, SoundName, AudioMgr, GameMgr;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Vec3 = module.Vec3;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      GameDefine = module.GameDefine;
      SoundName = module.SoundName;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      GameMgr = module.GameMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

      cclegacy._RF.push({}, "e36b7n5B5ZLdpKAc4glyYxU", "ScoreEffect", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ScoreEffect = exports('ScoreEffect', (_dec = ccclass('ScoreEffect'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Label), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ScoreEffect, _Component);

        function ScoreEffect() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "good", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "perfect", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "cool", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "xComboLabel", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ScoreEffect.prototype;

        _proto.onLoad = function onLoad() {
          ScoreEffect.instance = this;
        };

        _proto.start = function start() {
          this.node.children.forEach(function (element) {
            element.active = false;
          });
        };

        _proto.Good = function Good() {
          var _this2 = this;

          this.good.active = true;
          this.good.scale = Vec3.ZERO;
          tween(this.good).to(0.5, {
            scale: Vec3.ONE
          }, {
            easing: "elasticOut"
          }).call(function () {}).start();
          setTimeout(function () {
            _this2.good.active = false;
          }, 1000);
        };

        _proto.Perfect = function Perfect() {
          var _this3 = this;

          this.perfect.active = true;
          this.perfect.scale = Vec3.ZERO;
          tween(this.perfect).to(0.5, {
            scale: Vec3.ONE
          }, {
            easing: "elasticOut"
          }).call(function () {}).start();
          setTimeout(function () {
            _this3.perfect.active = false;
          }, 1000);

          if (GameMgr.Instance.CombPCounter > 1) {
            this.xComboLabel.node.active = true;
            this.xComboLabel.string = GameDefine.MULTIPLY_CHAR + GameMgr.Instance.CombPCounter.toString();
          } else {
            this.xComboLabel.node.active = false;
          }

          var sound = "ComboPerfect_" + Math.max(1, Math.min(5, GameMgr.Instance.CombPCounter));
          AudioMgr.Instance.PlaySfx(SoundName[sound], true);
        };

        _proto.Cool = function Cool() {
          var _this4 = this;

          this.cool.active = true;
          this.cool.scale = Vec3.ZERO;
          tween(this.cool).to(0.5, {
            scale: Vec3.ONE
          }, {
            easing: "elasticOut"
          }).call(function () {}).start();
          setTimeout(function () {
            _this4.cool.active = false;
          }, 1000);
        };

        _createClass(ScoreEffect, null, [{
          key: "Instance",
          get: function get() {
            return ScoreEffect.instance;
          }
        }]);

        return ScoreEffect;
      }(Component), _defineProperty(_class3, "instance", null), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "good", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "perfect", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cool", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "xComboLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CameraCtrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, _inheritsLoose, _assertThisInitialized, _createClass, cclegacy, _decorator, Camera, tween, Component;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Camera = module.Camera;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "e8036dAZtBBzJ7RzVM2ogIj", "CameraCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var CameraCtrl = exports('CameraCtrl', (_dec = ccclass('CameraCtrl'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CameraCtrl, _Component);

        function CameraCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "originalPosition", void 0);

          _defineProperty(_assertThisInitialized(_this), "offset", void 0);

          _defineProperty(_assertThisInitialized(_this), "camera", null);

          return _this;
        }

        var _proto = CameraCtrl.prototype;

        _proto.onLoad = function onLoad() {
          CameraCtrl.instance = this;
          this.camera = this.getComponent(Camera);
          this.originalPosition = this.node.position.clone();
          this.offset = this.node.position.clone();
        } // Update is called once per frame
        ;

        _proto.update = function update(dt) {};

        _proto.MoveTo = function MoveTo(pos) {
          var nextPost = pos.clone().add(this.offset);
          nextPost.y = this.originalPosition.y;
          tween(this.node).to(0.5, {
            position: nextPost
          }).start();
        };

        _proto.Reset = function Reset() {
          this.node.position = this.originalPosition.clone();
        };

        _createClass(CameraCtrl, null, [{
          key: "Instance",
          get: function get() {
            return CameraCtrl.instance;
          }
        }, {
          key: "MainCamera",
          get: function get() {
            return CameraCtrl.instance.camera;
          }
        }]);

        return CameraCtrl;
      }(Component), _defineProperty(_class2, "instance", null), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MyGiftCell.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Utils.ts', './MySprite.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component, Utils, MySprite;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      MySprite = module.MySprite;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "e90d13wy5pB3oSpiXNONaxl", "MyGiftCell", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MyGiftCell = exports('MyGiftCell', (_dec = ccclass('MyGiftCell'), _dec2 = property(MySprite), _dec3 = property(Label), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MyGiftCell, _Component);

        function MyGiftCell() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "giftIcon", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "giftNameLabel", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MyGiftCell.prototype;

        _proto.setInfo = function setInfo(item) {
          //this.giftIcon.Fetch(item.iconUrl);
          this.giftNameLabel.string = Utils.truncate(item.giftName, 10);
        };

        return MyGiftCell;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "giftIcon", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "giftNameLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Rotation.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, CCFloat, Vec3, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCFloat = module.CCFloat;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "eddd4lxbtdOHrEJO75AcVdI", "Rotation", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * Author = vhung.it
       *
       */

      var Rotation = exports('Rotation', (_dec = ccclass('Rotation'), _dec2 = property(CCFloat), _dec3 = property(Vec3), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Rotation, _Component);

        function Rotation() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "speed", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "direction", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "eulerAngle", new Vec3());

          return _this;
        }

        var _proto = Rotation.prototype;

        _proto.start = function start() {};

        _proto.update = function update(dt) {
          this.eulerAngle.add(this.direction.normalize().multiplyScalar(this.speed * dt));
          this.node.eulerAngles = this.eulerAngle;
        };

        return Rotation;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, 0, 1);
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoxCtrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Utils.ts', './GameDefine.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, _createClass, cclegacy, _decorator, ParticleSystem, BoxCollider, tween, Vec3, Component, Utils, GameDefine;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ParticleSystem = module.ParticleSystem;
      BoxCollider = module.BoxCollider;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      GameDefine = module.GameDefine;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "ef48bIHqvFOHZl8yLmMTrY4", "BoxCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var State;

      (function (State) {
        State[State["SPAWN"] = 0] = "SPAWN";
        State[State["IDLE"] = 1] = "IDLE";
      })(State || (State = {}));

      var BoxCtrl = exports('BoxCtrl', (_dec = ccclass('BoxCtrl'), _dec2 = property(ParticleSystem), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BoxCtrl, _Component);

        function BoxCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "landingParticle", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "collider", null);

          _defineProperty(_assertThisInitialized(_this), "state", void 0);

          _defineProperty(_assertThisInitialized(_this), "pos", void 0);

          _defineProperty(_assertThisInitialized(_this), "isDropDown", true);

          _defineProperty(_assertThisInitialized(_this), "item", null);

          _defineProperty(_assertThisInitialized(_this), "scale", void 0);

          return _this;
        }

        var _proto = BoxCtrl.prototype;

        _proto.start = function start() {
          this.collider = this.getComponent(BoxCollider);
        };

        _proto.SetState = function SetState(state) {
          var _this2 = this;

          this.state = state;

          switch (state) {
            case State.SPAWN:
              if (this.isDropDown) {
                tween(this.node).to(GameDefine.DROP_BOX_DELAY, {
                  position: this.pos
                }, {
                  easing: "cubicIn"
                }).call(function () {
                  _this2.SetState(State.IDLE);
                }).start();
              } else {
                this.node.position = this.pos;
                this.SetState(State.IDLE);
              }

              break;

            case State.IDLE:
              if (this.isDropDown) {
                this.LandingEffect();
                this.landingParticle.play();
              }

              setTimeout(function () {
                if (_this2.item) {
                  _this2.item.Show();
                }
              }, 500);
              break;
          }
        };

        _proto.Spwan = function Spwan(pos, scale, item, isDropDown) {
          if (isDropDown === void 0) {
            isDropDown = true;
          }

          this.pos = pos.clone();
          this.scale = scale;
          this.isDropDown = isDropDown;
          this.node.position = pos.clone().add3f(0, 3, 0);
          this.node.scale = new Vec3(scale, 1, scale);
          this.SetItem(item);
          this.SetState(State.SPAWN);
        };

        _proto.OnLanding = function OnLanding() {
          // this.LandingEffect();
          this.landingParticle.play();
        };

        _proto.SetItem = function SetItem(item) {
          Utils.destroyAllChild(this.ItemPos);

          if (item) {
            item.node.setParent(this.ItemPos);
            item.node.active = false;
          }

          this.item = item;
        };

        _proto.SetScale = function SetScale(value) {
          this.node.scale = new Vec3(this.scale, value, this.scale);
        };

        _proto.Reset = function Reset() {
          var scale = new Vec3(this.scale, 1, this.scale);
          tween(this.node).to(0.3, {
            scale: scale
          }, {
            easing: "bounceInOut"
          }).start();
          this.landingParticle.play();
        };

        _proto.DisableColidder = function DisableColidder() {
          this.collider.enabled = false;
        };

        _proto.LandingEffect = function LandingEffect() {
          this.node.scale = this.node.scale.clone().multiplyScalar(0.9);
          tween(this.node).to(0.3, {
            scale: new Vec3(this.scale, 1, this.scale)
          }, {
            easing: "elasticOut"
          }).start();
        };

        _createClass(BoxCtrl, [{
          key: "ItemPos",
          get: function get() {
            return this.node.getChildByName("Item");
          }
        }]);

        return BoxCtrl;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "landingParticle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ApiMock.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f6032IoNbNDmaE5dpKfBrwy", "ApiMock", undefined);

      var ApiMock = exports('ApiMock', function ApiMock() {});

      _defineProperty(ApiMock, "getConfig", {
        "response_info": {
          "error_message": "success",
          "error_code": 0,
          "event_tracking": "v1_get_config"
        },
        "item": {
          "size": [{
            "step": "1",
            "min": 1.0,
            "max": 1.0
          }, {
            "step": "2",
            "min": 1.0,
            "max": 1.0
          }, {
            "step": "11",
            "min": 0.8,
            "max": 1.0
          }, {
            "step": "12",
            "min": 1.0,
            "max": 1.0
          }, {
            "step": "16",
            "min": 0.7,
            "max": 1.0
          }, {
            "step": "17",
            "min": 1.0,
            "max": 1.0
          }, {
            "step": "19",
            "min": 0.7,
            "max": 1.0
          }, {
            "step": "22",
            "min": 1.0,
            "max": 1.0
          }, {
            "step": "24",
            "min": 0.7,
            "max": 1.0
          }, {
            "step": "27",
            "min": 1.0,
            "max": 1.0
          }, {
            "step": "31",
            "min": 0.6,
            "max": 1.0
          }, {
            "step": "34",
            "min": 1.0,
            "max": 1.0
          }, {
            "step": "40",
            "min": 0.6,
            "max": 1.0
          }, {
            "step": "43",
            "min": 1.0,
            "max": 1.0
          }],
          "reward": [{
            "from": 2,
            "to": 10,
            "type": "gift"
          }, {
            "from": 11,
            "to": 11,
            "type": "rule"
          }, {
            "from": 12,
            "to": 15,
            "type": "gift"
          }, {
            "from": 16,
            "to": 16,
            "type": "rule"
          }, {
            "from": 20,
            "to": 24,
            "type": "gift"
          }, {
            "from": 20,
            "to": 20,
            "type": "rule"
          }, {
            "from": 25,
            "to": 25,
            "type": "rule"
          }, {
            "from": 26,
            "to": 40,
            "type": "gift"
          }, {
            "from": 41,
            "to": 41,
            "type": "rule"
          }, {
            "from": 42,
            "to": 100,
            "type": "gift"
          }],
          "point": [20, 6, 4, 2, 1],
          "checkpoint": [100, 200, 300],
          "power": [3.0, 3.0],
          "distances": [{
            "step": "2",
            "min": 1.9,
            "max": 2.4
          }, {
            "step": "19",
            "min": 2.4,
            "max": 3.4
          }, {
            "step": "22",
            "min": 1.9,
            "max": 2.4
          }, {
            "step": "24",
            "min": 2.4,
            "max": 3.4
          }, {
            "step": "27",
            "min": 1.9,
            "max": 2.4
          }, {
            "step": "31",
            "min": 2.4,
            "max": 3.4
          }, {
            "step": "34",
            "min": 1.9,
            "max": 2.4
          }, {
            "step": "40",
            "min": 2.9,
            "max": 3.4
          }, {
            "step": "43",
            "min": 1.9,
            "max": 2.4
          }],
          "eventLink": "https://momo.vn/tin-tuc/tin-tuc-su-kien/choi-momo-jump-sieu-hoi-nhay-bat-san-tien-mat-va-qua-khung-2046",
          "turnTimer": "300000",
          "turnTimerLimit": 5,
          "goldHour": {
            "start": "1638785700000",
            "end": "1638792000000"
          }
        }
      });

      _defineProperty(ApiMock, "postSuccessMission", {
        "response_info": {
          "error_message": "success",
          "error_code": 0,
          "event_tracking": "send_succeeded_event"
        },
        "result": true
      });

      _defineProperty(ApiMock, "getGiftHistory", {
        "response_info": {
          "error_message": "success",
          "error_code": 0,
          "event_tracking": "v1_get_gift_history"
        },
        "meta": {
          "hasNext": false
        },
        "items": [{
          "giftName": "Nhận 132đ vào ví MoMo",
          "gameId": "ac21a5b1-3042-44c9-9902-e466cf21d6b7",
          "step": "-1",
          "userId": "01663285001",
          "type": "money",
          "timestamp": "1636889835110"
        }]
      });

      _defineProperty(ApiMock, "getProgress", {
        "response_info": {
          "error_message": "success",
          "error_code": 0,
          "event_tracking": "get_reward_progress"
        },
        "data": {
          "userId": "0915968549",
          "progressId": "pigjump_normal_20211203",
          "currentPoint": 20000,
          "milestones": [{
            "milestoneId": "milestone_level_1",
            "targetPoint": 50,
            "rewards": [{
              "rewardId": "reward_1_2021120",
              "icon": "https://atc-edge03.mservice.com.vn/momo_app_v2/img/RUcvQ_1.jpg",
              "title": "Tiền thưởng 55đ",
              "description": "Tiền thưởng 55đ",
              "status": "UNAVAILABLE"
            }],
            "status": "AVAILABLE",
            "amount": 1000000000
          }, {
            "milestoneId": "milestone_level_2",
            "targetPoint": 200,
            "rewards": [{
              "rewardId": "reward_2_20211203",
              "icon": "https://atc-edge03.mservice.com.vn/momo_app_v2/img/RUcvQ_1.jpg",
              "title": "Tiền thưởng 299đ",
              "description": "Tiền thưởng 299đ",
              "status": "UNAVAILABLE"
            }],
            "status": "AVAILABLE",
            "amount": 1000000000
          }, {
            "milestoneId": "milestone_level_3",
            "targetPoint": 1000,
            "rewards": [{
              "rewardId": "reward_3_20211203",
              "icon": "https://atc-edge03.mservice.com.vn/momo_app_v2/img/RUcvQ_1.jpg",
              "title": "Tiền thưởng 1.999đ",
              "description": "Tiền thưởng 1.999đ",
              "status": "UNAVAILABLE"
            }],
            "status": "CLAIMED",
            "amount": 1000000000
          }, {
            "milestoneId": "milestone_level_4",
            "targetPoint": 10000,
            "rewards": [{
              "rewardId": "reward_4_20211203",
              "icon": "https://atc-edge03.mservice.com.vn/momo_app_v2/img/ZUycq_2.jpg",
              "title": "Tiền thưởng 9.999đ",
              "description": "Tiền thưởng 9.999đ",
              "status": "UNAVAILABLE"
            }],
            "status": "OUT_OF_STOCK",
            "amount": 1000000000
          }, {
            "milestoneId": "milestone_level_5",
            "targetPoint": 25000,
            "rewards": [{
              "rewardId": "reward_5_20211203",
              "icon": "https://atc-edge03.mservice.com.vn/momo_app_v2/img/pxTZG_3.jpg",
              "title": "Tiền thưởng 19.999đ",
              "description": "Tiền thưởng 19.999đ",
              "status": "UNAVAILABLE"
            }],
            "status": "UNAVAILABLE",
            "amount": 15000
          }, {
            "milestoneId": "milestone_level_6",
            "targetPoint": 60000,
            "rewards": [{
              "rewardId": "reward_6_20211203",
              "icon": "https://atc-edge03.mservice.com.vn/momo_app_v2/img/HQOar_4.jpg",
              "title": "Tiền thưởng 99.999đ",
              "description": "Tiền thưởng 99.999đ",
              "status": "UNAVAILABLE"
            }],
            "status": "UNAVAILABLE",
            "amount": 1500
          }, {
            "milestoneId": "milestone_level_7",
            "targetPoint": 200000,
            "rewards": [{
              "rewardId": "reward_6_20211203",
              "icon": "https://atc-edge03.mservice.com.vn/momo_app_v2/img/xIcdw_5.jpg",
              "title": "Tiền thưởng 1.000.000đ",
              "description": "Tiền thưởng 1.000.000đ",
              "status": "UNAVAILABLE"
            }],
            "status": "CLAIMED",
            "amount": 100
          }]
        }
      });

      _defineProperty(ApiMock, "getGift", {
        "response_info": {
          "error_message": "success",
          "error_code": 0,
          "event_tracking": "v1_get_gift"
        },
        "items": [{
          "giftName": "Nhận 379đ vào ví MoMo"
        }, {
          "value": "2",
          "timestamp": "1633405939030",
          "hasGift": true,
          "giftName": "1119_cashback_momo_200k",
          "name": "200k tiền về ví!!!"
        }]
      });

      _defineProperty(ApiMock, "getMission", {
        "response_info": {
          "error_message": "success",
          "error_code": 0,
          "event_tracking": "mission_status"
        },
        "missions": [{
          "missionId": "open_vts",
          "missionInfo": {
            "title": "Mở ví trả sau",
            "description": "Mở ví trả sau đê nhận lượt quay",
            "icon": "https://img.mservice.com.vn/momo_app_v2/new_version/img/Marketing/icon-transfer-menu-update-v-mo-mo-2@2x.png",
            "ctaText": "Mở ngay",
            "refId": "",
            "videoUrl": "",
            "progressData": "0/1",
            "code": "0FXUPJ9",
            "shareUrl": "",
            "shareTitle": "Siêu Hội Hoàn Tiền 50% 1-11.11",
            "shareDes": "Cùng nhau nhận quà và hoàn tiền đến 50%"
          },
          "startMission": 1633345200000,
          "endMission": 5631466000000,
          "group": "",
          "sort": 10,
          "succeededCounter": [{
            "counterId": "counter_open_vts_20211006",
            "limitType": "END_TIME",
            "limitUnit": 1,
            "startTime": 1629824400000,
            "endTime": 1636638400000,
            "upperBound": 1,
            "numSucceeded": 0,
            "isMainCounter": true,
            "rewardConditions": [{
              "rewardId": "",
              "conditionType": "AT_POINT",
              "conditionValue": 1,
              "description": "",
              "numAvailableReward": 0,
              "numReceivedReward": 0,
              "canGetReward": false,
              "isAutoClaimReward": true,
              "rewards": [{
                "actionInfo": {
                  "name": "+1 lượt",
                  "icon": "",
                  "amount": 1
                },
                "extra": ""
              }]
            }]
          }],
          "isCompleted": false,
          "canGetReward": false,
          "isComingSoon": false,
          "isExpired": false
        }]
      });

      _defineProperty(ApiMock, "getRankPoints", {
        "response_info": {
          "error_message": "success",
          "error_code": 0,
          "event_tracking": "v1_ranking_global"
        },
        "meta": {
          "userId": "0123456789",
          "rank": -1,
          "name": "",
          "title": "",
          "isHearted": false,
          "point": 0,
          "avatarUrl": ""
        },
        "items": [{
          "userId": "0363285001",
          "rank": 1,
          "name": "ĐOÀN TẤN VIỆT KHÔI",
          "title": "",
          "isHearted": false,
          "point": 4571,
          "avatarUrl": ""
        }, {
          "userId": "0963852741",
          "rank": 2,
          "name": "PHUC HUY",
          "title": "",
          "avatarUrl": "",
          "isHearted": false,
          "point": 2200
        }]
      });

      _defineProperty(ApiMock, "postStartGame", {
        "response_info": {
          "error_message": "success",
          "error_code": 0,
          "event_tracking": "v1_start_game"
        },
        "item": {
          "gameId": "3adfab00-50c6-40f4-8e93-4631cfdb8f77",
          "hasGift": true
        }
      });

      _defineProperty(ApiMock, "getScore", {
        "response_info": {
          "error_message": "success",
          "error_code": 0,
          "event_tracking": "v1_get_score"
        },
        "item": {
          "userId": "01663285001",
          "agentId": "363285001",
          "gameId": "f6d395bb-1f1e-4175-9fa4-9043edde4ab9",
          "scores": [{
            "value": "20",
            "timestamp": "1633158555758"
          }, {
            "value": "10",
            "timestamp": "1633158558218"
          }, {
            "value": "20",
            "timestamp": "1633158560920"
          }, {
            "value": "6",
            "timestamp": "1633158562639"
          }, {
            "value": "20",
            "timestamp": "1633158564939"
          }, {
            "value": "20",
            "timestamp": "1633158566919"
          }, {
            "value": "6",
            "timestamp": "1633158569579"
          }, {
            "value": "6",
            "timestamp": "1633158572082"
          }, {
            "value": "6",
            "timestamp": "1633158574560"
          }, {
            "value": "6",
            "timestamp": "1633158574560"
          }, {
            "value": "6",
            "timestamp": "1633158574560"
          }, {
            "value": "6",
            "timestamp": "1633158574560"
          }],
          "isEnd": true,
          "eventTime": "1633970443612",
          "requestId": "eff38d13-befb-4e9c-9707-1e4dd3a1f31e"
        }
      });

      _defineProperty(ApiMock, "gameGift", {
        "response_info": {
          "error_message": "success",
          "error_code": 0,
          "event_tracking": "v1_get_gift"
        },
        "items": [{
          "giftName": "450đ vào Ví Momo"
        }, {
          "value": "10",
          "giftName": "Quà Giảm 5K Khi Mua Data 3G/4G Từ 15K",
          "timestamp": "1636889834057",
          "giftId": "210512_data_10k_20k",
          "hasGift": "true"
        }]
      });

      _defineProperty(ApiMock, "getTurn", {
        "response_info": {
          "error_message": "success",
          "error_code": 0,
          "event_tracking": "v1_check_turn"
        },
        "item": {
          "balance": 811,
          "timestamp": 10000,
          "isTiming": true
        }
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Profile.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameDefine.ts', './EventListener.ts', './Api.ts', './NetworkMgr.ts', './Gameconfig.ts'], function (exports) {
  'use strict';

  var _defineProperty, _inheritsLoose, _assertThisInitialized, _createClass, cclegacy, _decorator, sys, Component, EventName, EventListener, Api, NetworkMgr, Gameconfig;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sys = module.sys;
      Component = module.Component;
    }, function (module) {
      EventName = module.EventName;
    }, function (module) {
      EventListener = module.EventListener;
    }, function (module) {
      Api = module.Api;
    }, function (module) {
      NetworkMgr = module.NetworkMgr;
    }, function (module) {
      Gameconfig = module.Gameconfig;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "fb70chVwDpNe5DpzETj+HsT", "Profile", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      var ProfileData = function ProfileData() {
        _defineProperty(this, "progress", []);

        _defineProperty(this, "score", 0);

        _defineProperty(this, "turn", 0);

        _defineProperty(this, "id", "01234567890");

        _defineProperty(this, "token", "");

        _defineProperty(this, "phoneNumber", "");

        _defineProperty(this, "displayName", "");

        _defineProperty(this, "email", "");

        _defineProperty(this, "school", "");

        _defineProperty(this, "major", "");

        _defineProperty(this, "schoolYear", "");

        _defineProperty(this, "graduationYear", "");
      };

      var Profile = exports('Profile', (_dec = ccclass('Profile'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Profile, _Component);

        function Profile() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "data", new ProfileData());

          _defineProperty(_assertThisInitialized(_this), "storage", Object.create({}));

          _defineProperty(_assertThisInitialized(_this), "itemPickedMap", Object.create({}));

          _defineProperty(_assertThisInitialized(_this), "DevicePerformance", void 0);

          _defineProperty(_assertThisInitialized(_this), "IsHighPerformanceDevice", void 0);

          _defineProperty(_assertThisInitialized(_this), "iSOk", false);

          _defineProperty(_assertThisInitialized(_this), "hasGift", false);

          _defineProperty(_assertThisInitialized(_this), "gameID", "");

          return _this;
        }

        var _proto = Profile.prototype;

        _proto.isMine = function isMine(userId) {
          return this.data.id === userId;
        };

        _proto.ItemHasPicked = function ItemHasPicked(step) {
          return this.itemPickedMap.hasOwnProperty(step);
        };

        _proto.PickItemOnStep = function PickItemOnStep(step) {
          this.itemPickedMap[step] = true;
        };

        _proto.onLoad = function onLoad() {
          Profile.instance = this; // MaxApiUtils.GetProfile().then(res => {
          //     this.OnUpdateUserInfo(res);
          //     let storage = sys.localStorage.getItem(`${Api.GAME_ID}${this.UserID}`);
          //     if (storage) {
          //         this.storage = JSON.parse(storage);
          //     }
          //     MaxApiUtils.GetDeviceInfo().then((res: any) => {
          //         if (res) {
          //             Profile.Instance.DevicePerformance = res.devicePerformance;
          //         }
          //     }).catch(e => {
          //     });
          //     MaxApiUtils.CheckHighPerformanceDevice().then((res: any) => {
          //         Profile.Instance.IsHighPerformanceDevice = res;
          //     }).catch(e => {
          //     });
          // });
        };

        _proto.OnUpdateUserInfo = function OnUpdateUserInfo(data) {
          if (!data) {
            data = {
              userId: Api.DEBUG_TOKEN,
              token: Api.DEBUG_TOKEN
            };
          }

          this.UserID = data.userId;
          this.UserToken = data.token;
          this.iSOk = true;
          EventListener.Instance.emit(EventName.OnUpdateUserInfo, data, this);
        };

        _proto.Reset = function Reset() {
          this.data.score = 0;
          this.data.progress = [];
          this.gameID = "";
          Gameconfig.Instance.Reset();
          this.itemPickedMap = Object.create({});
          console.log("Reset Profile");
        };

        _proto.AddScore = function AddScore(step, value, hasGift) {
          this.data.score += value; // let progress = new PlayerProgress();
          // progress.timestamp = Date.now();
          // progress.value = value;
          // progress.hasGift = hasGift && this.ItemHasPicked(step);
          // this.data.progress.push(progress);
          // if (progress.hasGift) {
          //     this.SubmitScore(Profile.Instance.Score, false, (result, reward) => {
          //         if (result && result.gifts) {
          //             result.gifts.forEach(item => {
          //                 if (item.step == step) {
          //                     let score = value;
          //                     if (item.type == GiftType.Point) {
          //                         GameMgr.Instance.ShowBonus("+" + item.giftName);
          //                         this.data.score += parseInt(item.giftName);
          //                         score += parseInt(item.giftName);
          //                     }
          //                     else {
          //                         GameMgr.Instance.ShowGift(item.giftName);
          //                     }
          //                     MaxApiUtils.trackEvent({ stage: "game_scoring", score, gift_detail: item.giftName });
          //                 }
          //             });
          //         }
          //         else {
          //             MaxApiUtils.trackEvent({ stage: "game_scoring", score: value });
          //         }
          //         console.log("Submit score done");
          //     });
          // }
          // else {
          //     if (step % 5 == 0) {
          //         this.SubmitScore(Profile.Instance.Score, false, (result, reward) => { });
          //     }
          //     MaxApiUtils.trackEvent({ stage: "game_scoring", score: value });
          // }
        };

        _proto.FetchGameTurn = function FetchGameTurn(callback) {
          this.Turn = 1;
          callback(this.Turn);
          EventListener.Instance.emit(EventName.OnUpdateTurn); // NetworkMgr.getRequest(Api.HOST + Api.GameTurn, (result) => {
          //     if (result && result.item) {
          //         this.Turn = result.item.balance;
          //     }
          //     else {
          //         this.Turn = -1;
          //     }
          //     callback(this.Turn);
          //     EventListener.Instance.emit(EventName.OnUpdateTurn, result);
          // });
        };

        _proto.FetchGameID = function FetchGameID(callback) {
          this.gameID = "";
          this.hasGift = false;
          callback(true); // NetworkMgr.postRequest(Api.HOST + Api.StartGame, { requestId: Utils.uuid, size: Gameconfig.Instance.Size, distance: Gameconfig.Instance.Distance, scores: Gameconfig.Instance.ScoreRange}, (result) => {
          //     console.log(result);
          //     if (result && result.item) {
          //         Gameconfig.Instance.SetBonus(result.item.bonus);
          //         this.gameID = result.item.gameId;
          //         this.hasGift = result.item.hasGift;
          //         callback(true);
          //         console.log("GameID: " + this.gameID);
          //         console.log("Has Gift: " + this.hasGift);
          //     }
          //     else {
          //         callback(false);
          //     }
          // })
        };

        _proto.SubmitScore = function SubmitScore(score, isEnd, callback) {
          //     if (Profile.Instance.GameID != null) {
          //         let agentId = CryptoJS.MD5(Base64.stringify(Utf8.parse(CryptoJS.MD5(`${Profile.Instance.GameID}#${score}`).toString()))).toString();
          //         let data =
          //         {
          //             scores: this.Progress,
          //             gameId: this.gameID,
          //             isEnd,
          //             agentId
          //         }
          //         NetworkMgr.postRequest(Api.HOST + Api.SubmitScore, data, (result) => {
          //             if (result && result.item) {
          //                 callback(result.item, result.Reward);
          //             }
          //             else {
          //                 callback(null, 0);
          //             }
          //         });
          //     }
          //     else {
          //         callback(null, 0);
          //     }
          var data = {
            gameId: "momojump",
            playerId: Profile.Instance.UserID,
            playerName: Profile.Instance.data.displayName,
            point: score
          };
          NetworkMgr.postRequest(Api.HOST + Api.SubmitScore, data, function (result) {
            callback(result);
          });
        } // public GetGameGift(callback: Function) {
        //     if (Profile.Instance.GameID != null) {
        //         NetworkMgr.getRequest(
        //             Api.HOST + Api.GameGift + Profile.Instance.GameID,
        //             (result) => {
        //                 if (result && result.items) {
        //                     callback(result.items);
        //                 }
        //                 else {
        //                     callback(null);
        //                 }
        //             });
        //     }
        //     else {
        //         callback(null);
        //     }
        // }
        ;

        _proto.SetMaxFps = function SetMaxFps() {// if (this.DevicePerformance == DevicePerformance.LowEnd) {
          //     game.frameRate = 30;
          // }
          // else if (this.DevicePerformance == DevicePerformance.MideEnd) {
          //     game.frameRate = 45;
          // }
          // else {
          //     game.frameRate = 60;
          // }
        };

        _proto.SetNormalFps = function SetNormalFps() {// if (this.DevicePerformance == DevicePerformance.LowEnd) {
          //     game.frameRate = 30;
          // }
          // else if (this.DevicePerformance == DevicePerformance.MideEnd) {
          //     game.frameRate = 30;
          // }
          // else {
          //     game.frameRate = 45;
          // }
        };

        _proto.setItem = function setItem(key, value) {
          this.storage[key] = value;
          sys.localStorage.setItem("" + Api.GAME_ID + this.UserID, JSON.stringify(this.storage));
        };

        _proto.getItem = function getItem(key) {
          if (this.storage.hasOwnProperty(key)) {
            return this.storage[key];
          }

          return null;
        };

        _createClass(Profile, [{
          key: "Score",
          get: function get() {
            return this.data.score;
          },
          set: function set(value) {
            this.data.score = value;
          }
        }, {
          key: "GameID",
          get: function get() {
            return this.gameID;
          },
          set: function set(value) {
            this.gameID = value;
          }
        }, {
          key: "Turn",
          get: function get() {
            return this.data.turn;
          },
          set: function set(value) {
            this.data.turn = value;
          }
        }, {
          key: "UserID",
          get: function get() {
            return this.data.id;
          },
          set: function set(value) {
            this.data.id = value;
          }
        }, {
          key: "UserToken",
          get: function get() {
            return this.data.token;
          },
          set: function set(value) {
            this.data.token = value;
          }
        }, {
          key: "Progress",
          get: function get() {
            return this.data.progress;
          }
        }, {
          key: "HasGift",
          get: function get() {
            return this.hasGift;
          },
          set: function set(value) {
            this.hasGift = value;
          }
        }], [{
          key: "Instance",
          get: function get() {
            return Profile.instance;
          }
        }]);

        return Profile;
      }(Component), _defineProperty(_class2, "instance", null), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./Utils.ts', './GameDefine.ts', './BoxCtrl.ts', './EventListener.ts', './Api.ts', './NetworkMgr.ts', './Profile.ts', './Gameconfig.ts', './FlyScore.ts', './FlyScoreMgr.ts', './GiftScore.ts', './AudioMgr.ts', './Item.ts', './ItemMgr.ts', './BoxMgr.ts', './Popup.ts', './PopupMgr.ts', './Screen.ts', './ScreenMgr.ts', './AssetMgr.ts', './MaxApiUtils.ts', './CameraCtrl.ts', './Input.ts', './Player.ts', './ScoreEffect.ts', './UserHUD.ts', './InGame.ts', './GameMgr.ts', './EndGame.ts', './GiftBox.ts', './OutOfTurn.ts', './GameUtilites.ts', './Obstacle.ts', './MySprite.ts', './RankItem.ts', './RankView.ts', './MyButton.ts', './ErrorPopup.ts', './BannerBox.ts', './UserInfo.ts', './MiniProgress.ts', './Loading.ts', './SoundBtn.ts', './TextDefine.ts', './MessageBox.ts', './Intro.ts', './Onboarding.ts', './TrimBase64.ts', './ObstacleMgr.ts', './GameApi.ts', './ClaimButton.ts', './MyGiftCell.ts', './MyGift.ts', './HideTutorial.ts', './OnboardingMgr.ts', './Rotation.ts', './ApiMock.ts', './bundle.mjs_cjs=&original=.js'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
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