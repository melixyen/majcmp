(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
    typeof define === 'function' && define.amd ? define(['vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.majcmp = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script = {
        name: "me-puk",
        props: ['gap', 'time'],
        computed: {
            timeFormat: function(){
                return this.timeStr + ' ' + this.time.toLocaleString();
            }
        },
        data() {
            return {
                timeStr: '時間為 '
            }
        },
        methods: {
        }

    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        const options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
            options._compiled = true;
            // functional template
            if (isFunctionalTemplate) {
                options.functional = true;
            }
        }
        // scopedId
        if (scopeId) {
            options._scopeId = scopeId;
        }
        let hook;
        if (moduleIdentifier) {
            // server build
            hook = function (context) {
                // 2.3 injection
                context =
                    context || // cached call
                        (this.$vnode && this.$vnode.ssrContext) || // stateful
                        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                // 2.2 with runInNewContext: true
                if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                    context = __VUE_SSR_CONTEXT__;
                }
                // inject component styles
                if (style) {
                    style.call(this, createInjectorSSR(context));
                }
                // register component module identifier for async chunk inference
                if (context && context._registeredComponents) {
                    context._registeredComponents.add(moduleIdentifier);
                }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
        }
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
                };
        }
        if (hook) {
            if (options.functional) {
                // register for functional component in vue file
                const originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                const existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    /* script */
    const __vue_script__ = script;
    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", [
        _c("span", { staticClass: "puk_span" }, [
          _vm._v(_vm._s(_vm.gap) + ":" + _vm._s(_vm.timeFormat))
        ]),
        _vm._v(" "),
        _vm._m(0)
      ])
    };
    var __vue_staticRenderFns__ = [
      function() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c("div", { staticClass: "div1" }, [
          _c("span", [_vm._v("Test scss blue")]),
          _vm._v(" "),
          _c("div", { staticClass: "div2" }, [
            _c("span", [_vm._v(" Test scss red ")])
          ])
        ])
      }
    ];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = undefined;
      /* scoped */
      const __vue_scope_id__ = undefined;
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script$1 = {
        name: "lu-popuoOption",
        data() {
            return {
                isShowMessageBox: false,
                popup: {},
                promise: '',
                resolve: '',
                reject: ''
            }
        },
        methods: {
            showMsgBox: function (popup) {
                this.popup = popup;
                this.isShowMessageBox = true;
                this.promise = new Promise((resolve, reject) => {
                    this.resolve = resolve;
                    this.reject = reject;
                });
                // 返回promise物件
                return this.promise;
            },
            submit: function (val) {
                this.resolve(val);
                this.isShowMessageBox = false;
            }
        }

    };

    /* script */
    const __vue_script__$1 = script$1;
    /* template */
    var __vue_render__$1 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.isShowMessageBox,
              expression: "isShowMessageBox"
            }
          ],
          staticClass: "popupWarpper"
        },
        [
          _c("div", { staticClass: "popupMain" }, [
            _c("div", { staticClass: "header" }, [
              _c("i", { staticClass: "icon-arrow-left" }),
              _vm._v(" "),
              _c("h4", {
                staticClass: "modal-title",
                domProps: { textContent: _vm._s(_vm.popup.title) }
              }),
              _vm._v(" "),
              _c("i", {
                staticClass: "icon-cross",
                staticStyle: { cursor: "pointer" }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "content" }, [
              _c("div", {
                staticClass: "jsContent",
                domProps: { textContent: _vm._s(_vm.popup.content) }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "footer" }, [
              _vm.popup.boolean
                ? _c(
                    "div",
                    {
                      staticClass: "btn btn-left",
                      on: {
                        click: function($event) {
                          return _vm.submit("no")
                        }
                      }
                    },
                    [_vm._v("\n                NO\n            ")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.popup.boolean
                ? _c(
                    "div",
                    {
                      staticClass: "btn btn-right",
                      on: {
                        click: function($event) {
                          return _vm.submit("yes")
                        }
                      }
                    },
                    [_vm._v("\n                YES\n            ")]
                  )
                : _vm._e(),
              _vm._v(" "),
              !_vm.popup.boolean
                ? _c(
                    "div",
                    {
                      staticClass: "btn btn-one",
                      on: {
                        click: function($event) {
                          return _vm.submit("ok")
                        }
                      }
                    },
                    [_vm._v("\n                OK\n            ")]
                  )
                : _vm._e()
            ])
          ])
        ]
      )
    };
    var __vue_staticRenderFns__$1 = [];
    __vue_render__$1._withStripped = true;

      /* style */
      const __vue_inject_styles__$1 = undefined;
      /* scoped */
      const __vue_scope_id__$1 = undefined;
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        false,
        undefined,
        undefined,
        undefined
      );

    const ConfirmBox = Vue__default['default'].extend(__vue_component__$1);

    __vue_component__$1.install = (Vue) => {
        // Vue.prototype.$popup = ConfirmBox;
        const MessageBoxInstance = Vue.extend(ConfirmBox);
        let currentMsg;
        const initInstance = () => {
        // 例項化vue例項
        currentMsg = new MessageBoxInstance();
        let msgBoxEl = currentMsg.$mount().$el;
        document.body.appendChild(msgBoxEl);
        };
        // 在Vue的原型上新增例項方法，以全域性呼叫
        Vue.prototype.$popup = function(options){
                {
                    initInstance();
                }

                return currentMsg.showMsgBox(options);
        };

        __vue_component__$1.mainFunction = Vue.prototype.$popup;
    };

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script$2 = {
        name: "lu-alert",
        data() {
            return {
                isShow: false,
                alert: {},
                promise: '',
                resolve: '',
                reject: ''
            }
        },
        methods: {
            showAlertBox: function (popup) {
                if(typeof(popup)=='string') popup = {msg: popup};
                popup.type = popup.type || 'info';
                popup.duration = popup.duration || 5000;
                this.alert = popup;
                this.isShow = true;
                this.promise = new Promise((resolve, reject) => {
                    this.resolve = resolve;
                    this.reject = reject;
                });
                setTimeout(() => {
                    this.isShow = false;
                }, this.alert.duration);
                // 返回promise物件
                return this.promise;
            },
            submit: function (val) {
                this.resolve(val);
                this.isShowMessageBox = false;
            }
        }

    };

    /* script */
    const __vue_script__$2 = script$2;
    /* template */
    var __vue_render__$2 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("transition", { attrs: { name: "drop" } }, [
        _vm.isShow
          ? _c(
              "div",
              { staticClass: "notifyjs-corner", staticStyle: { left: "45%" } },
              [
                _c("div", { staticClass: "notifyjs-wrapper notifyjs-hidable" }, [
                  _c("div", { staticClass: "notifyjs-container" }, [
                    _c(
                      "div",
                      {
                        staticClass: "notifyjs-bootstrap-base",
                        class: "notifyjs-bootstrap-" + _vm.alert.type
                      },
                      [
                        _c("div", { staticClass: "notifyjs-arrow" }),
                        _vm._v(" "),
                        _c("span", {
                          domProps: { textContent: _vm._s(_vm.alert.msg) }
                        })
                      ]
                    )
                  ])
                ])
              ]
            )
          : _vm._e()
      ])
    };
    var __vue_staticRenderFns__$2 = [];
    __vue_render__$2._withStripped = true;

      /* style */
      const __vue_inject_styles__$2 = undefined;
      /* scoped */
      const __vue_scope_id__$2 = undefined;
      /* module identifier */
      const __vue_module_identifier__$2 = undefined;
      /* functional template */
      const __vue_is_functional_template__$2 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
        __vue_inject_styles__$2,
        __vue_script__$2,
        __vue_scope_id__$2,
        __vue_is_functional_template__$2,
        __vue_module_identifier__$2,
        false,
        undefined,
        undefined,
        undefined
      );

    const AlertBox = Vue__default['default'].extend(__vue_component__$2);

    __vue_component__$2.install = (Vue) => {
        // Vue.prototype.$popup = ConfirmBox;
        const MessageBoxInstance = Vue.extend(AlertBox);
        let currentMsg;
        const initInstance = () => {
            // 例項化vue例項
            currentMsg = new MessageBoxInstance();
            let msgBoxEl = currentMsg.$mount().$el;
            // document.getElementById('app').appendChild(msgBoxEl);
            document.body.appendChild(msgBoxEl);
        };
        // 在Vue的原型上新增例項方法，以全域性呼叫
        Vue.prototype.$alert = function (options) {
            {
                initInstance();
            }

            return currentMsg.showAlertBox(options);
        };

        __vue_component__$2.mainFunction = Vue.prototype.$alert;
    };

    //
    //
    //
    //
    //
    //

        var script$3 = {
            name: "trigon-score-image",
    	    props: ['linelength', 'dotwidth', 'borderwidth', 'bordercolor', 'areacolor', 'rates', 'delaytime', 'animationtime', 'bordercover', 'vismode'],
            computed: {
                trigonLineLength: function(){return parseInt(this.linelength) + 1;},
                trigonBorderWidth: function(){return parseInt(this.borderwidth);},
                trigonBorderColor: function(){return this.bordercolor ;},
                trigonDotWidth: function(){return parseInt(this.dotwidth); },
                trigonAreaColor: function(){return this.areacolor;},
                trigonSelfRate: function(){return parseFloat(this.rates[0]);},
                trigonWinnerRate: function(){return parseFloat(this.rates[1]);},
                trigonShotRate: function(){return parseFloat(this.rates[2]);},
                trigonDelayTime: function(){return parseInt(this.delaytime);},
                trigonAnimationTime: function(){return parseInt(this.animationtime);},
                flagBorderCover: function(){return !!(this.bordercover===true || this.bordercover==='true');},
                trigonHeight: function(){ return Math.round((this.trigonLineLength / 2) * this.constRadical3 ); },
                visualizationMode: function(){ return this.vismode; }
            },
            data() {return {
                aniStartTime: -1,
                aniEndTime: -1,
                constRadical3: 1.732 //三角形邊長公式 1:2:√3
            }},
            methods: {
                calcRealtimePosition: function(base, target, progress = 1){
                    if(progress >= 1) return target;
                    let x = (target[0] - base[0]) * progress + base[0];
                    let y = (target[1] - base[1]) * progress + base[1];
                    return [x,y];
                },
                draw: function(){
                    var canvas = this.$el.querySelector('canvas');
                    var bw = this.trigonBorderWidth;
                    var canHeight = this.trigonHeight;
                    var cc = canvas.getContext('2d');
                    var nowTime = Date.now();
                    var aniStartTime = this.aniStartTime;
                    var aniEndTime = this.aniEndTime;
                    var isOverStart = nowTime >= aniStartTime;
                    var isOVerEnd = nowTime >= aniEndTime;

                    canvas.width = this.trigonLineLength + (bw * 2);
                    canvas.style.width = this.trigonLineLength + 'px';
                    canvas.height = canHeight + bw * 2;
                    canvas.style.height = canvas.height + 'px';
                    canvas.style.backgroundColor = 'transparent';

                    //計算三角極點座標
                    let leftBottom = [0 + bw, canHeight + bw];
                    let rightBottom = [this.trigonLineLength + bw, canHeight + bw];
                    let centerTop = [Math.round(this.trigonLineLength / 2) + bw, 0 + bw];
                    let centerCore = [centerTop[0], canHeight + bw - Math.round(centerTop[0] / this.constRadical3)];

                    //計算間隔寬度、高度
                    let gapWidth = (this.trigonLineLength / 2) / 5;
                    let gapUpHeight = ((centerCore[1] - bw)) / 5;
                    let gapDownHeight = ((canHeight + bw) - centerCore[1]) / 5;

                    let percentWidth = gapWidth / 20;
                    let percentUpHeight = gapUpHeight / 20;
                    let percentDownHeight = gapDownHeight / 20;

                    //計算自摸、胡牌、放槍座標
                    let trigonSelfRate = this.trigonSelfRate || 0.01;
                    let trigonWinnerRate = this.trigonWinnerRate || 0.01;
                    let trigonShotRate = this.trigonShotRate || 0.01;

                    //資料視覺化加權處理
                    if(this.visualizationMode=='1') {
                        var maxRate = Math.max(trigonSelfRate, trigonWinnerRate, trigonShotRate);
                        var lvOffset = 1;
                        if(maxRate < 50) lvOffset = 0.95;
                        if(maxRate < 40) lvOffset = 0.9;
                        if(maxRate < 30) lvOffset = 0.7;
                        if(maxRate < 20) lvOffset = 0.5;
                        if(maxRate < 10) lvOffset = 0.4;
                        trigonSelfRate = trigonSelfRate / maxRate * 100 * lvOffset;
                        trigonWinnerRate = trigonWinnerRate / maxRate * 100 * lvOffset;
                        trigonShotRate = trigonShotRate / maxRate * 100 * lvOffset;
                    }else if(this.visualizationMode=='2') {
                        var maxRate = Math.max(trigonSelfRate, trigonWinnerRate, trigonShotRate);
                        var lvOffset = 1;
                        if(maxRate < 50) lvOffset = 0.9;
                        if(maxRate < 40) lvOffset = 0.8;
                        if(maxRate < 30) lvOffset = 0.6;
                        if(maxRate < 20) lvOffset = 0.4;
                        if(maxRate < 10) lvOffset = 0.3;
                        trigonSelfRate = trigonSelfRate / maxRate * 100 * lvOffset;
                        trigonWinnerRate = trigonWinnerRate / maxRate * 100 * lvOffset;
                        trigonShotRate = trigonShotRate / maxRate * 100 * lvOffset;
                    }
                    let posSelf = [centerTop[0] , centerCore[1] - Math.round(percentUpHeight * trigonSelfRate)];
                    let posWinner = [centerCore[0] - Math.round(percentWidth * trigonWinnerRate), centerCore[1] + Math.round(percentDownHeight * trigonWinnerRate)];
                    let posShot = [centerCore[0] + Math.round(percentWidth * trigonShotRate), centerCore[1] + Math.round(percentDownHeight * trigonShotRate)];

                    if(isOverStart && !this.flagBorderCover) this.drawAreaAndDot(cc, centerCore, posSelf, posWinner, posShot); // 不覆蓋，先畫區塊

                    //畫最外層三角形
                    this.drawTrigon(cc, this.trigonBorderWidth, this.trigonBorderColor, leftBottom, rightBottom, centerTop);
                    for(var i=1; i<5; i++){
                        var lvLeftBottom = [Math.round(leftBottom[0] + (gapWidth*i)), Math.round(leftBottom[1] - (gapDownHeight*i))];
                        var lvRightBottom = [Math.round(rightBottom[0] - (gapWidth*i)), Math.round(rightBottom[1] - (gapDownHeight*i))];
                        var lvCenterTop = [centerTop[0], Math.round(centerTop[1] + (gapUpHeight*i))];
                        this.drawTrigon(cc, this.trigonBorderWidth, this.trigonBorderColor, lvLeftBottom, lvRightBottom, lvCenterTop);
                    }

                    //畫三角形連接線
                    this.drawConnectLine(cc, leftBottom, rightBottom, centerTop, centerCore);
                    
                    if(isOverStart && this.flagBorderCover) this.drawAreaAndDot(cc, centerCore, posSelf, posWinner, posShot); // 覆蓋，後畫區塊

                    if(!isOVerEnd){
                        this.requestAni();
                    }else {
                        this.$emit('callbackend', true);
                    }

                },
                drawAreaAndDot: function(cc, centerCore, origPosSelf, origPosWinner, origPosShot){
                    let nowTime = Date.now();
                    let aniStartTime = this.aniStartTime;
                    let aniEndTime = this.aniEndTime;
                    let progress = (nowTime - aniStartTime) / (aniEndTime - aniStartTime);
                    if(progress > 1) progress = 1;

                    let posSelf = this.calcRealtimePosition(centerCore, origPosSelf, progress);
                    let posWinner = this.calcRealtimePosition(centerCore, origPosWinner, progress);
                    let posShot = this.calcRealtimePosition(centerCore, origPosShot, progress);
                    //畫區域範圍三角
                    this.drawArea(cc, posSelf, posWinner, posShot);

                    //畫座標點
                    this.drawDot(cc, this.trigonDotWidth, this.trigonBorderColor, posSelf);
                    this.drawDot(cc, this.trigonDotWidth, this.trigonBorderColor, posWinner);
                    this.drawDot(cc, this.trigonDotWidth, this.trigonBorderColor, posShot);
                },
                drawArea: function(cc, posSelf, posWinner, posShot){

                    cc.beginPath();
                    cc.lineWidth = 1;
                    cc.strokeStyle = this.trigonAreaColor;
                    cc.moveTo(posSelf[0], posSelf[1]);
                    cc.lineTo(posWinner[0], posWinner[1]);
                    cc.lineTo(posShot[0], posShot[1]);
                    cc.lineTo(posSelf[0], posSelf[1]);
                    cc.fillStyle = this.trigonAreaColor;
                    cc.fill();
                },
                drawConnectLine: function(cc, leftBottom, rightBottom, centerTop, centerCore){
                    cc.beginPath();
                    cc.lineWidth = this.trigonBorderWidth;
                    cc.strokeStyle = this.trigonBorderColor;
                    cc.moveTo(leftBottom[0], leftBottom[1]);
                    cc.lineTo(centerCore[0], centerCore[1]);
                    cc.moveTo(rightBottom[0], rightBottom[1]);
                    cc.lineTo(centerCore[0], centerCore[1]);
                    cc.moveTo(centerTop[0], centerTop[1]);
                    cc.lineTo(centerCore[0], centerCore[1]);
                    cc.stroke();
                },
                drawDot: function(cc, dotWidth, borderColor, position){
                    cc.moveTo(position[0], position[1]);
                    cc.beginPath();
                    cc.arc(position[0],position[1],dotWidth,0,2*Math.PI, true);
                    cc.fillStyle = borderColor;
                    cc.fill();
                    cc.stroke();
                },
                drawTrigon: function(cc, borderWidth, borderColor, leftBottom, rightBottom, centerTop){
                    cc.beginPath();
                    cc.moveTo(leftBottom[0], leftBottom[1]);
                    cc.lineWidth = borderWidth;
                    cc.strokeStyle = borderColor;
                    cc.lineTo(rightBottom[0], rightBottom[1]);
                    cc.lineTo(centerTop[0], centerTop[1]);
                    cc.lineTo(leftBottom[0], leftBottom[1]);
                    cc.stroke();
                },
                enableDraw: function(){
                    let nowTime = Date.now();
                    let delay = this.trigonDelayTime || 0;
                    let aniStart = delay + nowTime;
                    let aniEnd = delay + this.trigonAnimationTime + nowTime;
                    
                    this.aniStartTime = aniStart;
                    this.aniEndTime = aniEnd;
                    this.requestAni();
                },
                requestAni: function(){
                    requestAnimationFrame(this.draw);
                }
            },
            watch :{
                $props: {
                    handler: function(){
                        this.enableDraw();
                    },
                    deep: true
                }
            }
        };

    /* script */
    const __vue_script__$3 = script$3;

    /* template */
    var __vue_render__$3 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _vm._m(0)
    };
    var __vue_staticRenderFns__$3 = [
      function() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c("div", [_c("canvas")])
      }
    ];
    __vue_render__$3._withStripped = true;

      /* style */
      const __vue_inject_styles__$3 = undefined;
      /* scoped */
      const __vue_scope_id__$3 = undefined;
      /* module identifier */
      const __vue_module_identifier__$3 = undefined;
      /* functional template */
      const __vue_is_functional_template__$3 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
        __vue_inject_styles__$3,
        __vue_script__$3,
        __vue_scope_id__$3,
        __vue_is_functional_template__$3,
        __vue_module_identifier__$3,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script$4 = {
        name: "lu-run-chart",
        props: [
            'xtags', 'datas',
            'width', 'height', 'bgcolor',
            'axisColor', 'gridColor',
            'fontSize', 'fontColor',
            'lineWidth', 'lineColor', 'dotSize'
        ],
        computed: {
            _axisColor: function(){ return this.axisColor || '#444444'; },
            _gridColor: function(){ return this.gridColor || '#999999'; },
            _fontSize: function(){ return this.fontSize || 14; },
            _fontColor: function(){ return this.fontColor || '#111111'; },
            _lineWidth: function(){ return this.lineWidth || 3; },
            _lineColor: function(){
                var lineColor = this.lineColor;
                if(typeof(lineColor)=='string') lineColor = [lineColor];
                return lineColor || ['#77bba0']; 
            },
            _dotSize: function(){ return this.dotSize || 7; },
            chartWidth: function() {
                let w = this.getProps('width');
                return w - this.pdLeft - this.pdRight;
            },
            chartHeight: function() {
                let h = this.getProps('height');
                return h - this.pdTop - this.pdBottom;
            },
            axis: function() {
                let w = this.getProps('width');
                let h = this.getProps('height');
                let X = {
                    x1:this.pdLeft,
                    y1:h - this.pdBottom,
                    x2:w - this.pdRight,
                    y2:h - this.pdBottom
                };
                let Y = {
                    x1:this.pdLeft,
                    y1:this.pdTop,
                    x2:this.pdLeft,
                    y2:h - this.pdBottom
                };
                return {x:X, y:Y}
            },
            yData: function(){
                var reduceData = this.datas.reduce((arr, crr)=>{ return arr.concat(crr); });
                let minValue = Math.min.apply(this, reduceData);
                let maxValue = Math.max.apply(this, reduceData);
                let step = 5;
                if(maxValue > 100) step = 10;
                let stepMinMax = this.getMinMaxStep(step, minValue, maxValue);
                let yData = [];
                for(var i = stepMinMax.min; i<=stepMinMax.max; i+=step){ yData.push(i); }
                yData.reverse();
                return yData;
            },
            gridPosition: function(){
                let w =0, h = 0;
                let xlen = this.xtags.length;
                w = Math.round(this.chartWidth / (xlen-1));

                let xpos = [];
                let xtagPos = [];
                for(var i=0; i<xlen; i++) {
                    let xposx = Math.round((i/(xlen-1)) * this.chartWidth ) + this.pdLeft;
                    xpos[i] = xposx;
                    xtagPos[i] = {x:xposx, y:this.chartHeight + this.pdTop + 30};
                }

                //計算 Y 高度
                let yData = this.yData;
                let ylen = this.yData.length;
                h = Math.round(this.chartHeight / (ylen-1));

                let ypos = [];
                let ytagPos = [];
                for(var i=0; i<ylen; i++){
                    let yposy = Math.round((i/(ylen-1)) * this.chartHeight ) + this.pdTop;
                    // let yposy = h * i + this.pdTop;
                    ypos[i] = yposy;
                    ytagPos[i] = {x:this.pdLeft - 10, y:yposy};
                }

                //計算資料座標
                let linePos = [];
                var paths = [];
                for(var p=0; p<this.datas.length; p++){
                    linePos[p] = [];
                    var pathAry = [];
                    for(var i=0; i<xlen; i++){
                        var lx = xpos[i];
                        var ly = ((this.yData[0] - this.datas[p][i]) / (this.yData[0] - this.yData[this.yData.length-1])) * this.chartHeight + this.pdTop;
                        linePos[p][i] = {x:lx, y:ly};
                        if(i==0) {
                            pathAry.push('M' + lx + ' ' + ly);
                        }else {
                            pathAry.push('L' + lx + ' ' + ly);
                        }
                    }
                    paths[p] = pathAry.join(' ');
                }
                
                
                return {
                    xpos: xpos,
                    xtagPos: xtagPos,
                    ypos: ypos,
                    ytagPos: ytagPos,
                    linePos: linePos,
                    path: paths[0],
                    paths: paths,
                    height: h,
                    width: w
                }
            }
        },
        data() {return {
            pdLeft: 80,
            pdTop: 50,
            pdRight: 80,
            pdBottom: 80,
            strokeWidthAxis: 2,
            strokeWidthGrid: 1
        }},
        methods: {
            getProps: function(st){
                switch(st){
                    case 'width':
                        return parseInt(this.width) || 800;
                    case 'height':
                        return parseInt(this.height) || 600;
                }
            },
            getMinMaxStep: function(step, min, max) {
                var smin = min - (min % step), smax = max - (max % step) + step;
                return {min:smin, max:smax}
            },
            getSvgStyle: function() {
                let bgcolor = this.bgcolor || '#ffffff';
                return 'background-color:' + bgcolor + ';';
            },
            enableDraw: function(){}
        },
        watch :{
            $props: {
                handler: function(){
                    this.enableDraw();
                },
                deep: true
            }
        }
    };

    /* script */
    const __vue_script__$4 = script$4;

    /* template */
    var __vue_render__$4 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", [
        _c(
          "svg",
          {
            style: _vm.getSvgStyle(),
            attrs: { width: _vm.width, height: _vm.height }
          },
          [
            _vm._l(_vm.xtags, function(t, i) {
              return _c("line", {
                attrs: {
                  stroke: _vm._gridColor,
                  "stroke-width": _vm.strokeWidthGrid,
                  x1: _vm.gridPosition.xpos[i],
                  y1: _vm.axis.y.y1,
                  x2: _vm.gridPosition.xpos[i],
                  y2: _vm.axis.y.y2
                }
              })
            }),
            _vm._v(" "),
            _vm._l(_vm.xtags, function(t, i) {
              return _c(
                "text",
                {
                  attrs: {
                    x: _vm.gridPosition.xtagPos[i].x,
                    y: _vm.gridPosition.xtagPos[i].y,
                    "font-size": _vm._fontSize,
                    stroke: _vm._fontColor,
                    "text-anchor": "middle",
                    "alignment-baseline": "middle"
                  }
                },
                [_vm._v(_vm._s(t))]
              )
            }),
            _vm._v(" "),
            _vm._l(_vm.yData, function(t, i) {
              return _c("line", {
                attrs: {
                  stroke: _vm._gridColor,
                  "stroke-width": _vm.strokeWidthGrid,
                  y1: _vm.gridPosition.ypos[i],
                  x1: _vm.axis.x.x1,
                  y2: _vm.gridPosition.ypos[i],
                  x2: _vm.axis.x.x2
                }
              })
            }),
            _vm._v(" "),
            _vm._l(_vm.yData, function(t, i) {
              return _c(
                "text",
                {
                  attrs: {
                    x: _vm.gridPosition.ytagPos[i].x,
                    y: _vm.gridPosition.ytagPos[i].y,
                    "font-size": _vm._fontSize,
                    stroke: _vm._fontColor,
                    "text-anchor": "end",
                    "alignment-baseline": "end"
                  }
                },
                [_vm._v(_vm._s(t))]
              )
            }),
            _vm._v(" "),
            _c("line", {
              attrs: {
                stroke: _vm._axisColor,
                "stroke-width": _vm.strokeWidthAxis,
                x1: _vm.axis.x.x1,
                y1: _vm.axis.x.y1,
                x2: _vm.axis.x.x2,
                y2: _vm.axis.x.y2
              }
            }),
            _vm._v(" "),
            _c("line", {
              attrs: {
                stroke: _vm._axisColor,
                "stroke-width": _vm.strokeWidthAxis,
                x1: _vm.axis.y.x1,
                y1: _vm.axis.y.y1,
                x2: _vm.axis.y.x2,
                y2: _vm.axis.y.y2
              }
            }),
            _vm._v(" "),
            _vm._l(_vm.gridPosition.paths, function(pathText, p) {
              return _c(
                "g",
                [
                  _c("path", {
                    attrs: {
                      d: _vm.gridPosition.paths[p],
                      stroke: _vm._lineColor[p],
                      "stroke-width": _vm._lineWidth,
                      fill: "none"
                    }
                  }),
                  _vm._v(" "),
                  _vm._l(_vm.xtags, function(t, i) {
                    return _c("circle", {
                      attrs: {
                        cx: _vm.gridPosition.linePos[p][i].x,
                        cy: _vm.gridPosition.linePos[p][i].y,
                        r: _vm._dotSize,
                        fill: _vm._lineColor[p]
                      }
                    })
                  })
                ],
                2
              )
            })
          ],
          2
        )
      ])
    };
    var __vue_staticRenderFns__$4 = [];
    __vue_render__$4._withStripped = true;

      /* style */
      const __vue_inject_styles__$4 = undefined;
      /* scoped */
      const __vue_scope_id__$4 = undefined;
      /* module identifier */
      const __vue_module_identifier__$4 = undefined;
      /* functional template */
      const __vue_is_functional_template__$4 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
        __vue_inject_styles__$4,
        __vue_script__$4,
        __vue_scope_id__$4,
        __vue_is_functional_template__$4,
        __vue_module_identifier__$4,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script$5 = {
        name: "lu-pie-chart",
        props: [
            'diameter', 'bgcolor', 'pretext', 'datas', 'minTextDegree', 'displayMinText', 'fontSize', 'animate'
        ],
        computed: {
            aniTimeMS: function(){
                return 1000;
            },
            exampleData: function(){
                return {
                    title: "Hello",
                    pretext: "票數",
                    datas: [{
                        name: "A",
                        count: 36,
                        color: "#ff0000",
                        fontColor: "#ffffff"
                    }]
                }
            },
            pieAniStyle: function(){
                var len = this._diameter * 3.14159;
                var singleDegreeLen = len / 360;
                var color = this.bgcolor;
                var moveLen = this.dynamicCircleDegree * singleDegreeLen;
                if(!color || color=='transparent') color = '#ffffff';
                var rt = 'transform-box: fill-box; transform-origin:center; transform:rotate(-90deg); fill:transparent; stroke:' + color + '; stroke-width:' + this._diameter + '; stroke-dasharray:0 ' + moveLen + ' ' + len + ' 100;';
                return rt;
            },
            _datas: function(){
                const CIRCLE_DEGREE = 360;
                let cnt = this.datas.length;
                let diameter = this._diameter;
                let pdTop = this.pdTop;
                let pdLeft = this.pdLeft;
                var cx = this._centerX;
                var cy = this._centerY;
                var r = this._halfDiameter;

                var totalCount = this.datas.reduce((val, item)=>{  return val + item.count; }, 0);
                let maxValue = 0;
                let lastDegree = -90;
                let ary = this.datas.map((c, idx, arr)=>{
                    c.percent = Math.round(c.count / totalCount * 10000) / 100;
                    c.degreeStart = lastDegree;
                    c.degree = Math.round(CIRCLE_DEGREE * c.percent * 100) / 10000;
                    c.drawDegree = lastDegree + c.degree;
                    c.degreeMid = (c.drawDegree - c.degreeStart) / 2 + c.degreeStart;
                    // if(c.drawDegree == 360) c.drawDegree = 359.99;

                    c.x0 = this.calc4(cx+r*Math.cos(lastDegree*Math.PI/180));
                    c.y0 = this.calc4(cx+r*Math.sin(lastDegree*Math.PI/180));
                    c.x1 = this.calc4(cx+r*Math.cos(c.drawDegree*Math.PI/180));
                    c.y1 = this.calc4(cx+r*Math.sin(c.drawDegree*Math.PI/180));

                    c.xMid = this.calc4(cx+r*Math.cos(c.degreeMid*Math.PI/180));
                    c.yMid = this.calc4(cx+r*Math.sin(c.degreeMid*Math.PI/180));

                    c.textPosition = this.showTextPosition(c.xMid, c.yMid, c.degree);
                    c.text = this.pretext + ': ' + c.count;

                    maxValue = Math.max(c.count, maxValue);

                    lastDegree = c.drawDegree;
                    return c;
                });
                return ary;
            },
            _diameter: function () { return +this.diameter || 600 ;},
            _halfDiameter: function(){ return this._diameter / 2 ;},
            _bgcolor: function () { return this.bgcolor || '#ffffff' ;},
            _fontSize: function() { return this.fontSize || 16 ;},
            _width: function() { return this._diameter + 100 ;},
            _height: function() { return this._diameter + 100 ;},
            _minTextDegree: function(){ return (this.minTextDegree) ? parseFloat(this.minTextDegree) : 30 ;},
            _centerX: function() { return this.pdLeft + this._halfDiameter},
            _centerY: function() { return this.pdTop + this._halfDiameter},
        },
        data() {return {
            flagShowCircle: false,
            pdLeft: 50,
            pdTop: 50,
            pdRight: 50,
            pdBottom: 50,
            startAni: 0,
            dynamicCircleDegree: 0
        }},
        methods: {
            calc4: function(num){
                return Math.round(num * 10000) / 10000;
            },
            getPath: function(p){
                var cx = this._centerX;
                var cy = this._centerY;
                var r = this._halfDiameter;
                var arcLargeParam = (p.degree < 180) ? "0" : "1";
                return "M" + cx + " " + cy + " L" + p.x0 + " " + p.y0 + " A" + r + " " + r + " 0 " + arcLargeParam + " 1 " + p.x1 + " " + p.y1 + " Z";
            },
            getPathStyle: function(p, idx){
                var rt = '';
                return rt;
            },
            getSvgStyle: function() {
                let bgcolor = this.bgcolor || '#ffffff';
                return 'background-color:' + bgcolor + ';';
            },
            getCoordinatesForPercent: function(percent) {
                const x = Math.cos(2 * Math.PI * percent);
                const y = Math.sin(2 * Math.PI * percent);
                
                return [x, y];
            },
            showTextPosition: function(x, y, degree){
                if(degree <= this.minTextDegree){
                    return {x:x, y:y, display:!!this.displayMinText}
                }else {
                    return {
                        x: ((x - this._centerX) / 2) + this._centerX,
                        y: ((y - this._centerY) / 2) + this._centerY,
                        display: true
                    }
                }
            },
            aniDrawCircle: function(){
                var now = Date.now();
                var moveOverTime = now - this.startAni;
                var moveLessTime = this.aniTimeMS - moveOverTime;
                
                if( moveLessTime > 0 ){
                    this.flagShowCircle = true;
                    var moveRate = moveOverTime / this.aniTimeMS;
                    this.dynamicCircleDegree = moveRate * 360;
                    requestAnimationFrame(this.aniDrawCircle);
                }else {
                    this.flagShowCircle = false;
                    
                }
            },
            enableDraw: function(){
                if(this.animate) {
                    this.startAni = Date.now();
                    requestAnimationFrame(this.aniDrawCircle);
                }
            },
            enableDraw2: function(){
                if(this.animate) {
                    let svg = this.$refs.svg;
                    let pies = svg.querySelectorAll('path.pie');
                    let texts = svg.querySelectorAll('text.word');
                    texts.forEach((t)=>{
                        t.style.display = 'none';
                    });
                    pies.forEach((p, idx)=>{
                        p.style.opacity = 0;
                    });
                    
                    pies.forEach((p, idx)=>{
                        p.style.transition = 'opacity .6s ease-in-out';
                        setTimeout(()=>{
                            p.style.opacity = '0.999';
                        }, 600 * (idx) + 10);
                        setTimeout(()=>{
                            p.style.opacity = '1';
                        }, 600 * (idx) + 100);
                    });
                    texts.forEach((t, idx)=>{
                        setTimeout(()=>{
                            t.style.display = '';
                            pies[idx].style.transition = '';
                        }, (idx+1) * 600 + 50);
                    });
                }
            }
        },
        mounted: function(){
            this.enableDraw();
        },
        watch :{
            $props: {
                handler: function(){
                    this.enableDraw();
                },
                deep: true
            }
        }
    };

    /* script */
    const __vue_script__$5 = script$5;

    /* template */
    var __vue_render__$5 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", [
        _c(
          "svg",
          {
            ref: "svg",
            style: _vm.getSvgStyle(),
            attrs: { width: _vm._width, height: _vm._height }
          },
          [
            _vm._l(_vm._datas, function(p, idx) {
              return p.count > 0
                ? _c("path", {
                    staticClass: "pie",
                    style: _vm.getPathStyle(p, idx),
                    attrs: { d: _vm.getPath(p), fill: p.color }
                  })
                : _vm._e()
            }),
            _vm._v(" "),
            _vm._l(_vm._datas, function(p, idx) {
              return p.count > 0
                ? _c(
                    "text",
                    {
                      staticClass: "word",
                      attrs: {
                        x: p.textPosition.x,
                        y: p.textPosition.y,
                        "font-size": _vm._fontSize,
                        stroke: p.fontColor,
                        "text-anchor": "middle",
                        "alignment-baseline": "middle"
                      }
                    },
                    [
                      _c(
                        "tspan",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: p.textPosition.display,
                              expression: "p.textPosition.display"
                            }
                          ],
                          attrs: {
                            x: p.textPosition.x,
                            y: p.textPosition.y - _vm._fontSize / 2
                          }
                        },
                        [_vm._v(_vm._s(p.name))]
                      ),
                      _vm._v(" "),
                      _c(
                        "tspan",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: p.textPosition.display,
                              expression: "p.textPosition.display"
                            }
                          ],
                          attrs: {
                            x: p.textPosition.x,
                            y: p.textPosition.y + _vm._fontSize / 1.8
                          }
                        },
                        [_vm._v(_vm._s(p.text))]
                      )
                    ]
                  )
                : _vm._e()
            }),
            _vm._v(" "),
            _c("circle", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.flagShowCircle,
                  expression: "flagShowCircle"
                }
              ],
              style: _vm.pieAniStyle,
              attrs: { r: _vm._halfDiameter, cx: _vm._centerX, cy: _vm._centerX }
            })
          ],
          2
        )
      ])
    };
    var __vue_staticRenderFns__$5 = [];
    __vue_render__$5._withStripped = true;

      /* style */
      const __vue_inject_styles__$5 = undefined;
      /* scoped */
      const __vue_scope_id__$5 = undefined;
      /* module identifier */
      const __vue_module_identifier__$5 = undefined;
      /* functional template */
      const __vue_is_functional_template__$5 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
        __vue_inject_styles__$5,
        __vue_script__$5,
        __vue_scope_id__$5,
        __vue_is_functional_template__$5,
        __vue_module_identifier__$5,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script$6 = {
        name: "lu-bar-chart",
        props: [
            'datas',
            'width', 'height', 'bgcolor',
            'flexBar', 'flexGap',
            'axisColor',
            'fontSize', 'fontColor'
        ],
        computed: {
            _axisColor: function(){ return this.axisColor || '#444444'; },
            _fontSize: function(){ return this.fontSize || 14; },
            _fontColor: function(){ return this.fontColor || '#111111'; },
            paddingTop: function(){ return this._fontSize * 2 ;},
            paddingBottom: function(){ return Math.round(this._fontSize * 2.5) ;},
            chartWidth: function() {
                let w = this.getProps('width');
                return w;
            },
            chartHeight: function() {
                let h = this.getProps('height');
                return h;
            },
            axisBottom: function() {
                let w = this.getProps('width');
                let h = this.getProps('height');
                return {
                    x1:0,
                    y1:h - this.paddingBottom,
                    x2:w,
                    y2:h - this.paddingBottom
                }
            },
            barPosition: function(){
                var flexBar = parseInt(this.flexBar) || 3;
                var flexGap = parseInt(this.flexGap) || 2;
                var countsData = this.datas.map((c)=>{ return c.count; });
                let minValue = Math.min.apply(this, countsData);
                let maxValue = Math.max.apply(this, countsData);

                let w = this.getProps('width');
                let h = this.getProps('height');

                let barHeight = h - this.paddingTop - this.paddingBottom;
                let barBottom = h - this.paddingBottom;
                let len = this.datas.length;
                let totalSep = (flexBar * len) + (flexGap * len) + flexGap;
                let sepWidth = w / totalSep;

                let lastX = 0;
                let aryPosition = [];
                for(var i=0; i<len; i++){
                    var barX = lastX + (flexGap * sepWidth);
                    var gapX = barX + (flexBar * sepWidth);
                    var barH = barHeight * (countsData[i] / maxValue) * this.drawFullRate;
                    var barY = barBottom - barH;
                    lastX = gapX;

                    var textPos = {x: barX + (flexBar * sepWidth / 2), y: barBottom + (this.paddingBottom / 2)};
                    var countPos = {x: barX + (flexBar * sepWidth / 2), y: barY - (this.paddingTop / 2)};

                    aryPosition.push({
                        x1: barX,
                        x2: gapX,
                        textPos: textPos,
                        countPos: countPos,
                        y: barY,
                        width: flexBar * sepWidth,
                        height: barH,
                        name: this.datas[i].name,
                        count: this.datas[i].count,
                        color: this.datas[i].color
                    });
                }

                return aryPosition;
            }
        },
        data() {return {
            pdLeft: 80,
            pdRight: 80,
            drawFullRate: 1,
            rectStyle: 'transition:all 0.8s ease;',
            strokeWidthAxis: 2,
            strokeWidthGrid: 1
        }},
        methods: {
            getProps: function(st){
                switch(st){
                    case 'width':
                        return parseInt(this.width) || 800;
                    case 'height':
                        return parseInt(this.height) || 600;
                }
            },
            getMinMaxStep: function(step, min, max) {
                var smin = min - (min % step), smax = max - (max % step) + step;
                return {min:smin, max:smax}
            },
            getSvgStyle: function() {
                let bgcolor = this.bgcolor || '#ffffff';
                return 'background-color:' + bgcolor + ';';
            },
            enableDraw: function(){}
        },
        watch :{
            $props: {
                handler: function(){
                    this.enableDraw();
                },
                deep: true
            }
        }
    };

    /* script */
    const __vue_script__$6 = script$6;

    /* template */
    var __vue_render__$6 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", [
        _c(
          "svg",
          {
            style: _vm.getSvgStyle(),
            attrs: { width: _vm.width, height: _vm.height }
          },
          [
            _c("line", {
              attrs: {
                stroke: _vm._axisColor,
                "stroke-width": _vm.strokeWidthAxis,
                x1: _vm.axisBottom.x1,
                y1: _vm.axisBottom.y1,
                x2: _vm.axisBottom.x2,
                y2: _vm.axisBottom.y2
              }
            }),
            _vm._v(" "),
            _vm._l(_vm.barPosition, function(p, i) {
              return _c("g", [
                _c("rect", {
                  style: _vm.rectStyle,
                  attrs: {
                    x: p.x1,
                    y: p.y,
                    width: p.width,
                    height: p.height,
                    fill: p.color
                  }
                }),
                _vm._v(" "),
                _c(
                  "text",
                  {
                    attrs: {
                      x: p.textPos.x,
                      y: p.textPos.y,
                      "font-size": _vm._fontSize,
                      stroke: _vm._fontColor,
                      "text-anchor": "middle",
                      "alignment-baseline": "middle"
                    }
                  },
                  [_vm._v(_vm._s(p.name))]
                ),
                _vm._v(" "),
                _c(
                  "text",
                  {
                    attrs: {
                      x: p.countPos.x,
                      y: p.countPos.y,
                      "font-size": _vm._fontSize,
                      stroke: _vm._fontColor,
                      "text-anchor": "middle",
                      "alignment-baseline": "middle"
                    }
                  },
                  [_vm._v(_vm._s(p.count))]
                )
              ])
            })
          ],
          2
        )
      ])
    };
    var __vue_staticRenderFns__$6 = [];
    __vue_render__$6._withStripped = true;

      /* style */
      const __vue_inject_styles__$6 = undefined;
      /* scoped */
      const __vue_scope_id__$6 = undefined;
      /* module identifier */
      const __vue_module_identifier__$6 = undefined;
      /* functional template */
      const __vue_is_functional_template__$6 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
        __vue_inject_styles__$6,
        __vue_script__$6,
        __vue_scope_id__$6,
        __vue_is_functional_template__$6,
        __vue_module_identifier__$6,
        false,
        undefined,
        undefined,
        undefined
      );

    const components = [__vue_component__, __vue_component__$1, __vue_component__$2, __vue_component__$3, __vue_component__$4, __vue_component__$5, __vue_component__$6];

    let lui = {};
    const PRE_NAME = '';

    lui.listComponent = [];

    const install = function(Vue){
    	components.forEach((c)=>{
    		var cmpName = PRE_NAME + c.name;
    		Vue.component(cmpName, c);
    		if(typeof(c.install)=='function') c.install(Vue);
    		if(typeof(c.mainFunction)=='function') lui[c.name] = c.mainFunction;
    		lui.listComponent.push(cmpName);
    	});
    };

    if(typeof(window) !== 'undefined' && window.Vue){
    	install(window.Vue);
    }

    lui.install = install;

    return lui;

})));
