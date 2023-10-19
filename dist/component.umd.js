(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["component"] = factory();
	else
		root["component"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "096a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YMapsObjects = exports.YMapsObjects = function () {

    /**
     * @param {{Map: any, markers: Array, pathToBaloon: string}} params
     */

    /** Маркеры */
    function YMapsObjects(params) {
        _classCallCheck(this, YMapsObjects);

        this.markers = params.markers;
        this.pathToBaloon = params.pathToBaloon;
        this.Map = params.Map;
    }

    /** Получить шаблон балуна */

    /** Путь до изображения балуна */

    /** Карта */


    _createClass(YMapsObjects, [{
        key: 'fGetBalloonLayout',
        value: function fGetBalloonLayout() {
            var myBalloonLayout = ymaps.templateLayoutFactory.createClass('<div class="ymap-pvz-popover">' + '<div class="ymap-pvz-popover-close">&times;</div>' + '<div class="ymap-pvz-popover-inner">' + '$[[options.contentLayout observeSize]]' + '</div>' + '<div class="ymap-pvz-popover-arrow"></div>' + '</div>', {
                /**
                 * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                 * @function
                 * @name build
                 */
                build: function build() {
                    this.constructor.superclass.build.call(this);

                    this._$element = this.getParentElement().querySelector('.ymap-pvz-popover');

                    this.applyElementOffset();

                    var elClose = this._$element.querySelector('.ymap-pvz-popover-close');
                    elClose.addEventListener('click', this.onCloseClick.bind(this));
                },

                /**
                 * Удаляет содержимое макета из DOM.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                 * @function
                 * @name clear
                 */
                clear: function clear() {
                    var elClose = this._$element.querySelector('.ymap-pvz-popover-close');
                    elClose.removeEventListener('click', this.onCloseClick.bind(this));

                    this.constructor.superclass.clear.call(this);
                },

                /**
                 * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onSublayoutSizeChange
                 */
                onSublayoutSizeChange: function onSublayoutSizeChange() {
                    myBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if (!this._isElement(this._$element)) {
                        return;
                    }

                    this.applyElementOffset();

                    this.events.fire('shapechange');
                },

                /**
                 * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name applyElementOffset
                 */
                applyElementOffset: function applyElementOffset() {
                    var nLeft = -(this._$element.offsetWidth / 2);
                    var nArrowHeight = 6;
                    var nTop = -(this._$element.offsetHeight + nArrowHeight + 52);
                    this._$element.style.left = nLeft + 'px';
                    this._$element.style.top = nTop + 'px';
                },

                /**
                 * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onCloseClick
                 */
                onCloseClick: function onCloseClick(e) {
                    e.preventDefault();
                    this.events.fire('userclose');
                },

                /**
                 * Используется для автопозиционирования (balloonAutoPan).
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                 * @function
                 * @name getClientBounds
                 * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                 */
                getShape: function getShape() {
                    if (!this._isElement(this._$element)) {
                        return myBalloonLayout.superclass.getShape.call(this);
                    }

                    var nTop = Number(this._$element.style.top.substring(0, this._$element.style.top.length - 2));
                    var nLeft = Number(this._$element.style.left.substring(0, this._$element.style.left.length - 2));

                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([[nLeft, nTop], [nLeft + this._$element.offsetWidth, nTop + this._$element.offsetHeight + this._$element.querySelector('.ymap-pvz-popover-arrow').offsetHeight]]));
                },

                /**
                 * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                 * @function
                 * @private
                 * @name _isElement
                 * @param {HTMLDivElement} [element] Элемент.
                 * @returns {Boolean} Флаг наличия.
                 */
                _isElement: function _isElement(element) {
                    return element && element.querySelector('.ymap-pvz-popover-arrow');
                }
            });
            return myBalloonLayout;
        }

        /** Создаем объект контрола, с помощью templateLayoutFactory */

    }, {
        key: 'fCreate',
        value: function fCreate() {
            this.Map.geoObjects.removeAll();

            var objectManagerConfig = {
                // Чтобы метки начали кластеризоваться, выставляем опцию.
                clusterize: true,
                // Опции для кастомной иконки одиночной метки
                geoObjectIconLayout: 'default#image',
                // Размеры метки.
                geoObjectIconImageSize: [50, 50],
                // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
                geoObjectIconImageOffset: [-25, -50]
            };
            if (this.pathToBaloon) {
                // Своё изображение иконки метки.
                objectManagerConfig.clusterIconImageHref = this.pathToBaloon;
                // Опции для кастомной иконки кластера
                objectManagerConfig.clusterIconLayout = 'default#image';
                // Размеры метки.
                objectManagerConfig.clusterIconImageSize = [70, 70];
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                objectManagerConfig.clusterIconImageOffset = [-35, -70];
            } else {
                objectManagerConfig.clusterIconLayout = 'default#pieChart';
                objectManagerConfig.clusterIconPieChartRadius = 25;
                objectManagerConfig.clusterIconPieChartCoreRadius = 20;
                objectManagerConfig.clusterIconPieChartDoughnut = false;
            }
            var objectManager = new ymaps.ObjectManager(objectManagerConfig);

            var objectColection = [];

            for (var i = 0; i < this.markers.length; i++) {
                var vMarker = this.markers[i];
                var oneObject = {
                    type: 'Feature',
                    id: vMarker.id,
                    geometry: {
                        type: 'Point',
                        coordinates: [vMarker.latitude, vMarker.longitude]
                    }
                };
                if (vMarker.balloonContent) {
                    oneObject.options = {
                        balloonLayout: this.fGetBalloonLayout(),
                        balloonContentLayout: ymaps.templateLayoutFactory.createClass(vMarker.balloonContent.html, vMarker.balloonContent.methods),
                        hideIconOnBalloonOpen: false,
                        balloonPanelMaxMapArea: 0
                    };
                    oneObject.properties = {
                        balloonPanelMaxMapArea: 0
                    };
                }
                if (vMarker.iconImageHref) {
                    if (!oneObject.options) {
                        oneObject.options = {};
                    }
                    oneObject.options.iconImageHref = vMarker.iconImageHref;
                    oneObject.options.iconColor = vMarker.iconColor;
                }
                objectColection.push(oneObject);
            }
            objectManager.add(objectColection);
            this.Map.geoObjects.add(objectManager);
            return objectManager;
        }
    }]);

    return YMapsObjects;
}();

/***/ }),

/***/ "0a11":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YMapsZoom = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _YMapsCtrlBase = __webpack_require__("656e");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YMapsZoom = exports.YMapsZoom = function (_YMapsBase) {
    _inherits(YMapsZoom, _YMapsBase);

    function YMapsZoom() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, YMapsZoom);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YMapsZoom.__proto__ || Object.getPrototypeOf(YMapsZoom)).call.apply(_ref, [this].concat(args))), _this), _this.tpl = '<div class="ymaps-range">\n                <button id="zoom-out" class="ymaps-range-btn">\n                    <svg width="23" height="5" viewBox="0 0 23 5" fill="none" xmlns="http://www.w3.org/2000/svg">\n                        <rect x="22.3064" y="0.63501" width="3.69927" height="22.0241" rx="1.84963" transform="rotate(90 22.3064 0.63501)" fill="#36A6F2"/>\n                    </svg>    \n                </button>\n                <div class="ymaps-range-line ymaps-range-line__active"></div>\n                <div class="ymaps-range-line"></div>\n                <div class="ymaps-range-line"></div>\n                <div class="ymaps-range-line"></div>\n                <div class="ymaps-range-line"></div>\n                <div class="ymaps-range-line"></div>\n                <div class="ymaps-range-line"></div>\n                <div class="ymaps-range-line"></div>\n                <div class="ymaps-range-line"></div>\n                <div class="ymaps-range-line"></div>\n                <button id="zoom-in" class="ymaps-range-btn">\n                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">\n                        <rect x="9.45898" y="0.790527" width="3.67068" height="22.1956" rx="1.83534" fill="#36A6F2"/>\n                        <rect x="22.3064" y="10.0388" width="3.69927" height="22.0241" rx="1.84963" transform="rotate(90 22.3064 10.0388)" fill="#36A6F2"/>\n                    </svg>                 \n                </button>\n            </div>', _temp), _possibleConstructorReturn(_this, _ret);
    }
    /** Шаблон элемента */


    _createClass(YMapsZoom, [{
        key: 'fCreate',


        /** Создаем объект контрола, с помощью templateLayoutFactory */
        value: function fCreate() {
            var СustomZoomLayout = ymaps.templateLayoutFactory.createClass(this.tpl, {
                zoomBtnItem: null,
                zoomScrollTimeout: null,
                zoomOptions: { checkZoomRange: true, smooth: true, duration: 300 },
                // Монтируем карту
                build: function build() {
                    var map = this.getData().map;

                    // Вызываем родительский метод build.
                    СustomZoomLayout.superclass.build.call(this);

                    // Получаем элементы отображающие текущий зум
                    this.zoomBtnItem = document.querySelectorAll('.ymaps-range-line');

                    // Привязываем функции-обработчики к контексту и сохраняем ссылки на них, чтобы потом отписаться от событий.
                    this.zoomInCb = ymaps.util.bind(this.zoomIn, this);
                    this.zoomOutCb = ymaps.util.bind(this.zoomOut, this);
                    this.zoomByRangeLineClickCb = ymaps.util.bind(this.zoomByRangeLineClick, this);
                    this.setCustomZoomValueCb = ymaps.util.bind(this.setCustomZoomValue, this);

                    // Начинаем слушать события макета.
                    document.querySelector('#zoom-in').addEventListener('click', this.zoomInCb);
                    document.querySelector('#zoom-out').addEventListener('click', this.zoomOutCb);
                    document.querySelector('.ymaps-range').addEventListener('click', this.zoomByRangeLineClickCb);
                    map.events.add('wheel', this.setCustomZoomValueCb);

                    // Получаем и устанавливаем значение zoom
                    var curr_zoom = map.getZoom();
                    map.setZoom(curr_zoom, { checkZoomRange: true });
                },
                // Очищаем объект карты
                clear: function clear() {
                    var map = this.getData().map;

                    // Снимаем обработчики.
                    var zoomIn = document.querySelector('#zoom-in');
                    var zoomOut = document.querySelector('#zoom-out');
                    var range = document.querySelector('.ymaps-range');

                    if (zoomIn) {
                        zoomIn.removeEventListener('click', this.zoomInCb);
                    }

                    if (zoomOut) {
                        zoomOut.removeEventListener('click', this.zoomOutCb);
                    }

                    if (range) {
                        range.removeEventListener('click', this.zoomByRangeLineClickCb);
                    }

                    map.events.remove('wheel', this.setCustomZoomValueCb);

                    // Очищаем таймаут зума при скролле
                    clearTimeout(this.zoomScrollTimeout);

                    // Вызываем родительский метод clear.
                    СustomZoomLayout.superclass.clear.call(this);
                },
                // Устанавливаем значение самодельного зума при клике по одной из полосок на нем
                zoomByRangeLineClick: function zoomByRangeLineClick(e) {
                    var map = this.getData().map;
                    if (e.target.classList.contains('ymaps-range-line')) {
                        for (var i = 0; i < this.zoomBtnItem.length; i++) {
                            this.zoomBtnItem[i].classList.remove('ymaps-range-line__active');
                        }
                        e.target.classList.add('ymaps-range-line__active');
                        var indexOfActive = 0;
                        var zoomBtnItemNew = document.querySelectorAll('.ymaps-range-line');
                        for (var _i = 0; _i < zoomBtnItemNew.length; _i++) {
                            if (zoomBtnItemNew[_i].classList.contains('ymaps-range-line__active')) {
                                indexOfActive = _i;
                            }
                        }
                        map.setZoom(indexOfActive + 10, this.zoomOptions);
                    }
                },
                // Устанавливаем значение на самодельном зуме, при скролле коллесиком
                setCustomZoomValue: function setCustomZoomValue(e) {
                    var _this2 = this;

                    var map = this.getData().map;

                    var checkInterval = setInterval(function () {
                        var zoom = map.getZoom();
                        _this2.zoomBtnItem[zoom - 10].classList.add('ymaps-range-line__active');
                        for (var i = 0; i < _this2.zoomBtnItem.length; i++) {
                            _this2.zoomBtnItem[i].classList.remove('ymaps-range-line__active');
                        }
                        _this2.zoomBtnItem[zoom - 10].classList.add('ymaps-range-line__active');
                    }, 10);

                    this.zoomScrollTimeout = setTimeout(function () {
                        clearInterval(checkInterval);
                    }, 1000);
                },
                // Приблизить
                zoomIn: function zoomIn() {
                    var map = this.getData().map;
                    var zoom = map.getZoom();

                    if (zoom < 19) {
                        map.setZoom(zoom + 1, this.zoomOptions);
                        for (var i = 0; i < this.zoomBtnItem.length; i++) {
                            this.zoomBtnItem[i].classList.remove('ymaps-range-line__active');
                        }

                        var curr_zoom = map.getZoom();

                        this.zoomBtnItem[curr_zoom + 1 - 10].classList.add('ymaps-range-line__active');
                    } else {
                        this.zoomBtnItem[this.zoomBtnItem.length - 1].classList.add('ymaps-range-line__active');
                    }
                },
                // Отдалить
                zoomOut: function zoomOut() {
                    var map = this.getData().map;
                    var zoom = map.getZoom();

                    if (zoom > 10) {
                        map.setZoom(zoom - 1, this.zoomOptions);
                        for (var i = 0; i < this.zoomBtnItem.length; i++) {
                            this.zoomBtnItem[i].classList.remove('ymaps-range-line__active');
                        }
                        var curr_zoom = map.getZoom();
                        this.zoomBtnItem[curr_zoom - 1 - 10].classList.add('ymaps-range-line__active');
                    } else {
                        this.zoomBtnItem[0].classList.add('ymaps-range-line__active');
                    }
                }
            });

            return СustomZoomLayout;
        }
    }]);

    return YMapsZoom;
}(_YMapsCtrlBase.YMapsBase);

/***/ }),

/***/ "1720":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("4e84");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("7783585f", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "1cf2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__("d785");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _YandexMap = __webpack_require__("2773");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } //
//
//
//
//
//
//
//

exports.default = {
    name: 'YandexMap',
    props: {
        /**
         * список кластеров
         * @type {Array.<
         * {id:number, latitude:string, longitude: string, iconImageHref: string,  iconColor: string,
         * balloonContent: {html: string, methods: object},
         * }>} 
        */
        markers: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        /**
         * Ставить ли маркер по клику
         */
        isMarkerOnClick: {
            type: Boolean,
            default: false
        },
        coordsCenter: {
            type: Array,
            default: null
        },
        apiKey: {
            type: String,
            default: ''
        },
        oneMarkerCoords: {
            type: Array,
            default: null
        },
        putMarkerInSearch: {
            type: Boolean,
            default: false
        },
        currentCoords: [],
        pathToBaloon: ''
    },

    data: function data() {
        return {
            mapCustom: null,
            map: null,
            coords: [],
            objectManager: null,
            point: null,
            oneMarker: null,
            searchControl: null,
            searchManager: null,
            zoomManager: null,
            mapId: 'yandex-map-' + Math.round(Math.random() * 1000)
        };
    },
    mounted: function mounted() {
        var _this = this;

        if (!document.getElementById('yandex-maps')) {
            var scriptYandexMap = document.createElement('script');
            scriptYandexMap.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=' + this.apiKey + '&mode=release&coordorder=latlong');
            scriptYandexMap.setAttribute('id', 'yandex-maps');
            document.head.appendChild(scriptYandexMap);
            scriptYandexMap.addEventListener('load', function () {
                _this.initializeYandexMap();
            });
        } else {
            this.initializeYandexMap();
        }
    },

    methods: {
        // Инициализация карты
        initializeYandexMap: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var markers, _ref2, map, map_objects, search_control, zoom_control;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                markers = [];


                                if (this.markers) {
                                    markers = [].concat(_toConsumableArray(this.markers));
                                }

                                // Создаём объект карты
                                this.mapCustom = new _YandexMap.YMapsCustom({
                                    mapId: this.mapId,
                                    center: this.coordsCenter,
                                    controls: [],
                                    markers: markers,
                                    zoomOptions: {
                                        zoom: 10,
                                        minZoom: 10,
                                        maxZoom: 19
                                    },
                                    pathToBaloon: this.pathToBaloon,
                                    putMarkerInSearch: this.putMarkerInSearch
                                });

                                _context.next = 5;
                                return this.mapCustom.faInitMap();

                            case 5:
                                _ref2 = _context.sent;
                                map = _ref2.map;
                                map_objects = _ref2.map_objects;
                                search_control = _ref2.search_control;
                                zoom_control = _ref2.zoom_control;


                                this.map = map;
                                this.objectManager = map_objects;
                                this.searchManager = search_control;
                                this.zoomManager = zoom_control;

                                if (!this.markers || this.isMarkerOnClick) {
                                    this.map.events.add('click', this.onClickMap);
                                    this.searchControl = new ymaps.control.SearchControl({
                                        options: {
                                            float: 'left',
                                            floatIndex: 100,
                                            noPlacemark: false
                                        }
                                    });
                                    if (this.oneMarkerCoords) {
                                        this.oneMarker = new ymaps.Placemark(this.oneMarkerCoords);
                                        this.map.geoObjects.add(this.oneMarker);
                                    }
                                    if (this.putMarkerInSearch) {
                                        this.map.geoObjects.events.add('click', this.onClickOnceMarket);
                                    }
                                    this.map.controls.add(this.searchControl);
                                    this.searchControl.events.add('resultselect', this.Search);
                                } else {
                                    this.objectManager.objects.events.add(['click'], this.onClickEvent);
                                }

                                this.map.events.add(['boundschange', 'datachange', 'objecttypeschange'], this.getVisibleObjects.bind(this));
                                this.$emit("InitializeYandexMap", this.map);

                            case 17:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function initializeYandexMap() {
                return _ref.apply(this, arguments);
            }

            return initializeYandexMap;
        }(),


        // Получаем только видимые объекты
        getVisibleObjects: function getVisibleObjects() {
            var aVisibleCoords = [];
            var objects = ymaps.geoQuery(this.objectManager.objects).searchInside(this.map);

            for (var i = 0; i < objects["_objects"].length; i++) {
                aVisibleCoords.push(objects["_objects"][i].geometry["_coordinates"]);
            }

            this.$emit("getVisibleObjects", aVisibleCoords);
        },


        // Событие клика на маркер
        onClickEvent: function onClickEvent(e) {
            var objectId = e.get('objectId'),
                objectGeometry = this.objectManager.objects.getById(objectId).geometry.type;
            // Если событие произошло на метке, изменяем цвет ее иконки.
            if (objectGeometry === 'Point') {
                this.$emit("ClickMarker", objectId);
                this.point = objectId;
            }
        },


        // Событие клика по карте
        onClickMap: function onClickMap(e) {
            var coords = e.get('coords');
            if (this.oneMarker) {
                this.map.geoObjects.remove(this.oneMarker);
            }
            this.oneMarker = new ymaps.Placemark(coords);
            this.map.geoObjects.add(this.oneMarker);
            this.$emit("ClickMap", coords);
        },


        /** Событие клика по маркеру при выборе города */
        onClickOnceMarket: function onClickOnceMarket(e) {
            var coords = e.get('coords');
            this.$emit("ClickOneMarker", coords);
        },


        // Событие выбора результата поиска
        Search: function Search(e) {
            if (this.oneMarker) this.map.geoObjects.remove(this.oneMarker);
            var resultList = this.searchControl.getResultsArray();
            var index = this.searchControl.getSelectedIndex();
            var result = resultList[index].properties.get('metaDataProperty.GeocoderMetaData');
            var param = {
                text: result.text,
                addrresDetails: result.AddressDetails
            };
            this.$emit("Search", param);
        }
    },
    watch: {
        coordsCenter: function coordsCenter() {
            if (this.coordsCenter && this.map) {
                this.map.setCenter(this.coordsCenter);
            }
        },
        markers: {
            handler: function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    if (this.mapCustom) {
                                        this.mapCustom.markers = this.markers;
                                        this.objectManager = this.mapCustom.fInitMapObjects();
                                        this.objectManager.objects.events.add(['click'], this.onClickEvent);
                                    }

                                case 1:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));

                function handler() {
                    return _ref3.apply(this, arguments);
                }

                return handler;
            }()
        },
        currentCoords: {
            deep: true,
            handler: function handler(currVal, oldVal) {
                if (currVal && this.map) {
                    this.map.setCenter(currVal);
                    this.map.setZoom(18, { checkZoomRange: true, smooth: true, duration: 300 });
                    setTimeout(function () {
                        document.querySelector('#zoom-in').click();
                    }, 300);
                }
            }
        },
        isMarkerOnClick: function isMarkerOnClick(newValue) {
            if (newValue) {
                undefined.map.events.add('click', undefined.onClickMap);
                if (undefined.oneMarkerCoords) {
                    undefined.oneMarker = new ymaps.Placemark(undefined.oneMarkerCoords);
                    undefined.map.geoObjects.add(undefined.oneMarker);
                }
            } else {
                undefined.map.events.remove('click', undefined.onClickMap);
                undefined.map.geoObjects.remove(undefined.oneMarker);
            }
        }
    },
    beforeDestroy: function beforeDestroy() {
        if (this.map.geoObjects.length) {
            this.map.geoObjects.removeAll();
        }
    }
};

/***/ }),

/***/ "1eb2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript;
  if (true) {
    var getCurrentScript = __webpack_require__("8875");
    currentScript = getCurrentScript();

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript });
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
  if (src) {
    __webpack_require__.p = src[1]; // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
exports.default = null;

/***/ }),

/***/ "24fb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names

module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "2773":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YMapsCustom = undefined;

var _regenerator = __webpack_require__("d785");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _YmapsAddTpl = __webpack_require__("a0b6");

var _YMapsSearch = __webpack_require__("8233");

var _YMapsStyles = __webpack_require__("902a");

var _YMapsObjects = __webpack_require__("096a");

var _YMapsZoom = __webpack_require__("0a11");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Модуль инициализации карты */
var YMapsCustom = exports.YMapsCustom = function () {
    /** Контроллеры карты */

    /** Начальные опции зума */

    /** Элементы управления для отрисовки */

    /** Id карты */
    function YMapsCustom(MapConfig) {
        _classCallCheck(this, YMapsCustom);

        this.mapId = MapConfig.mapId;
        this.center = MapConfig.center;
        this.controls = MapConfig.controls;
        this.markers = MapConfig.markers;
        this.zoomOptions = MapConfig.zoomOptions;
        this.pathToBaloon = MapConfig.pathToBaloon;
        this.putMarkerInSearch = MapConfig.putMarkerInSearch;
    }
    /** Путь до изображения балуна */

    /** Объект карты */

    /** Маркеры на карте */

    /** Координаты центра */


    _createClass(YMapsCustom, [{
        key: 'fInitMapObjects',
        value: function fInitMapObjects() {
            return (0, _YmapsAddTpl.fAddBaloonToMap)(_YMapsObjects.YMapsObjects, this);
        }

        /** Инициализация карты */

    }, {
        key: 'faInitMap',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return ymaps.ready();

                            case 2:

                                // Создаем объект карты
                                this.Map = new ymaps.Map(this.mapId, {
                                    center: this.center,
                                    zoom: this.zoomOptions.zoom,
                                    controls: this.controls
                                }, {
                                    minZoom: this.zoomOptions.minZoom,
                                    maxZoom: this.zoomOptions.maxZoom
                                });

                                // Применим шаблон стилей
                                (0, _YmapsAddTpl.fAddTemplateToMap)(_YMapsStyles.YMapsStyles, this);

                                this.MapControls = {};

                                // Добавить кастомный инпут поиска
                                this.MapControls.search_control = (0, _YmapsAddTpl.fAddMarkerToMap)(_YMapsSearch.YMapsSearch, this);

                                // Добавим кастомный элемент зума карты
                                this.MapControls.zoom_control = (0, _YmapsAddTpl.fAddTemplateToMap)(_YMapsZoom.YMapsZoom, this);

                                // Добавим объекты на карту
                                this.MapControls.map_objects = this.fInitMapObjects();

                                // Вернем созданные объекты для взаимодействия с Vue
                                return _context.abrupt('return', {
                                    map: this.Map,
                                    map_objects: this.MapControls.map_objects,
                                    search_control: this.MapControls.search_control,
                                    zoom_control: this.MapControls.zoom_control
                                });

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function faInitMap() {
                return _ref.apply(this, arguments);
            }

            return faInitMap;
        }()
    }]);

    return YMapsCustom;
}();

/***/ }),

/***/ "2877":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "3ac0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _YandexMap_vue_vue_type_template_id_067e7bd8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e3d7");
/* harmony import */ var _YandexMap_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("3d5c");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _YandexMap_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _YandexMap_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _YandexMap_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("5469");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("2877");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _YandexMap_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _YandexMap_vue_vue_type_template_id_067e7bd8___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _YandexMap_vue_vue_type_template_id_067e7bd8___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "3d5c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YandexMap_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1cf2");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YandexMap_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YandexMap_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YandexMap_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YandexMap_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YandexMap_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "499e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addStylesClient; });
/* harmony import */ var _listToStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9bbc");
/* harmony import */ var _listToStyles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_listToStyles__WEBPACK_IMPORTED_MODULE_0__);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = _listToStyles__WEBPACK_IMPORTED_MODULE_0___default()(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = _listToStyles__WEBPACK_IMPORTED_MODULE_0___default()(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "4e84":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ymap-pvz-popover{background:#fff;border-radius:8px;position:relative;box-shadow:0 0 8px rgba(0,0,0,.15);width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.ymap-pvz-popover-close{width:22px;height:22px;border-radius:50%;background:#4f4f50;position:absolute;top:-11px;right:-11px;cursor:pointer;display:flex;justify-content:center;align-items:center;color:#fff}.ymap-pvz-popover-arrow{display:block;width:6px;height:6px;position:absolute;left:calc(50% - 3px);bottom:-3px;background-color:inherit;transform:rotate(45deg);box-shadow:0 0 8px rgba(0,0,0,.15)}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "5469":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YandexMap_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1720");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YandexMap_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YandexMap_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "62e4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),

/***/ "656e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YMapsBase = exports.YMapsBase = function () {
	function YMapsBase(map, putMarkerInSearch) {
		_classCallCheck(this, YMapsBase);

		this.events = new ymaps.event.Manager();
		this.options = new ymaps.option.Manager();
		this.state = new ymaps.data.Manager();
		this.Map = map;
		this.putMarkerInSearch = putMarkerInSearch;
	}

	/** Устанвливаем родительский элемент для контрола созданного с помощью templateLayoutFactory */


	_createClass(YMapsBase, [{
		key: 'setParent',
		value: function setParent(parent) {
			this.parent = parent;
			if (parent) {
				var map = parent.getMap();
				var Layout = this.fCreate();
				this.layout = new Layout({
					map: map
				});
				this.layout.setParentElement(map.panes.get('controls').getElement());
			} else {
				this.layout.setParentElement(null);
			}
		}

		/** Получаем родительский элемент для контрола созданного с помощью templateLayoutFactory */

	}, {
		key: 'getParent',
		value: function getParent() {
			return this.parent;
		}
	}]);

	return YMapsBase;
}();

/***/ }),

/***/ "8233":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.YMapsSearch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _YMapsCtrlBase = __webpack_require__("656e");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YMapsSearch = exports.YMapsSearch = function (_YMapsBase) {
	_inherits(YMapsSearch, _YMapsBase);

	function YMapsSearch() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, YMapsSearch);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YMapsSearch.__proto__ || Object.getPrototypeOf(YMapsSearch)).call.apply(_ref, [this].concat(args))), _this), _this.tpl = '<div class="ymaps-input-wrapper">\n\t\t\t\t<input placeholder="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441" id="suggest" class="yamaps-search__input" type="text">\n\t\t\t\t<button id="search_btn" class="yamaps-search__button">\u041D\u0430\u0439\u0442\u0438</button>\n\t\t\t</div>', _temp), _possibleConstructorReturn(_this, _ret);
	}
	/** Шаблон элемента */


	_createClass(YMapsSearch, [{
		key: 'fCreate',


		/** Создаем объект контрола, с помощью templateLayoutFactory */
		value: function fCreate() {
			var SearchLayout = ymaps.templateLayoutFactory.createClass(this.tpl, {
				/** Объект инпута поиска */
				SuggestView: null,
				/** Значение инпута поиска */
				suggestionValue: null,
				/** Объект карты, получаем из родительского модуля */
				Map: this.Map,
				/** Нужно ли ставить маркер при поиске в центр карты */
				putMarkerInSearch: this.putMarkerInSearch,

				build: function build() {
					SearchLayout.superclass.build.call(this);
					// Навешиваем события
					this.fCreateSuggestView();
					this.fSetEventsOnSearch();
				},

				clear: function clear() {
					this.fRemoveEventListeners();
					SearchLayout.superclass.clear.call(this);
				},

				/** Навешиваем события на инпут */
				fSetEventsOnSearch: function fSetEventsOnSearch() {
					document.querySelector('#suggest').addEventListener('input', this.fSaveValueOnInputType.bind(this));

					document.querySelector('#search_btn').addEventListener('click', this.fSearchByButton.bind(this));

					document.querySelector('#suggest').addEventListener('keydown', this.fSearchByEnter.bind(this));

					this.SuggestView.events.add('select', this.fSearchBySelect.bind(this));
				},


				/** Создaем suggestView поверх кастомного инпута, чтобы сохранить подсказки от яндекса */
				fCreateSuggestView: function fCreateSuggestView() {
					this.SuggestView = new ymaps.SuggestView('suggest', { provider: 'yandex#search', results: 3, offset: [0, -2000] });
				},


				/** Сохраняем значение инпут при вводе, для поиска по кнопке или клику на enter */
				fSaveValueOnInputType: function fSaveValueOnInputType(e) {
					this.suggestionValue = e.target.value;
					if (e.target.value.trim().length > 0) {
						this.SuggestView.options.set('offset', [0, 0]);
					} else {
						this.SuggestView.options.set('offset', [0, -2000]);
						this.suggestionValue = null;
					}
				},


				/** Поиск по карте отталкиваясь от данных из custom input  */
				fSearchBySelect: function fSearchBySelect(e) {
					var q = e.get('item').value;
					this.fSearch(q);
				},

				/** Поиск по enter */
				fSearchByEnter: function fSearchByEnter(e) {
					if (e.code.toLowerCase() === 'enter') {
						this.fSearch(e.target.value);
					}
				},

				/** Поиск по кнопке */
				fSearchByButton: function fSearchByButton(e) {
					if (this.suggestionValue) this.fSearch(this.suggestionValue);
				},

				/** Поиск и центрирование карты по результатам */
				fSearch: function fSearch(value) {
					var _this2 = this;

					ymaps.geocode(value).then(function (result) {
						var coords = result.geoObjects.get(0).geometry.getCoordinates();
						_this2.Map.setCenter([coords[0], coords[1]]);
						if (_this2.putMarkerInSearch) {
							_this2.Map.geoObjects.removeAll();
							_this2.oneMarker = new ymaps.Placemark(coords);
							_this2.Map.geoObjects.add(_this2.oneMarker);
						}
					});
				},

				/** Удаляем обработчики событий */
				fRemoveEventListeners: function fRemoveEventListeners() {
					document.querySelector('#suggest').removeEventListener('input', this.fSaveValueOnInputType.bind(this));

					document.querySelector('#search_btn').removeEventListener('click', this.fSearchByButton.bind(this));

					document.querySelector('#suggest').removeEventListener('keydown', this.fSearchByEnter.bind(this));

					this.SuggestView.events.remove('select', this.fSearchBySelect.bind(this));
				}
			});

			return SearchLayout;
		}
	}]);

	return YMapsSearch;
}(_YMapsCtrlBase.YMapsBase);

/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(typeof self !== 'undefined' ? self : undefined, function () {
  function getCurrentScript() {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript');
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript;
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript;
    }

    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    } catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
          ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
          stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
          scriptLocation = stackDetails && stackDetails[1] || false,
          line = stackDetails && stackDetails[2] || false,
          currentLocation = document.location.href.replace(document.location.hash, ''),
          pageSource,
          inlineScriptSourceRegExp,
          inlineScriptSource,
          scripts = document.getElementsByTagName('script'); // Live NodeList collection

      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }

      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }

        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }

        // If inline source matches, return the script tag
        if (scriptLocation === currentLocation && scripts[i].innerHTML && scripts[i].innerHTML.trim() === inlineScriptSource) {
          return scripts[i];
        }
      }

      // If no match, return null
      return null;
    }
  };

  return getCurrentScript;
});

/***/ }),

/***/ "902a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.YMapsStyles = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _YMapsCtrlBase = __webpack_require__("656e");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YMapsStyles = exports.YMapsStyles = function (_YMapsBase) {
	_inherits(YMapsStyles, _YMapsBase);

	function YMapsStyles() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, YMapsStyles);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YMapsStyles.__proto__ || Object.getPrototypeOf(YMapsStyles)).call.apply(_ref, [this].concat(args))), _this), _this.tpl = "<style>\n            \t.ymaps-range {\n            \t    width: 40px;\n            \t    height: 225px;\n            \t    padding: 5px;\n            \t    box-sizing: border-box;\n            \t    display: flex;\n            \t    flex-direction: column;\n            \t    justify-content: space-between;\n            \t    background: rgba(218,218,218,0.49);\n            \t    border-radius: 9px;\n            \t    cursor: pointer;\n            \t    position: absolute;\n            \t    right: 15px;\n            \t    top: 275px;\n            \t}\n            \t.ymaps-range-btn  {\n            \t    width: 30px;\n            \t    height: 30px;\n            \t    padding: 2px;\n            \t    display: flex;\n            \t    flex-direction: column;\n            \t    justify-content: center;\n            \t    align-items: center;\n            \t    box-sizing: border-box;\n            \t    border: none;\n            \t    background: #FFFFFF;\n            \t    box-shadow: 0px 0px 8.57692px rgba(0, 0, 0, 0.15);\n            \t    border-radius: 4px;\n            \t    cursor: pointer;\n            \t}\n            \t.ymaps-range-line {\n            \t    width: 30px;\n            \t    height: 3px;\n            \t    background: #F9F9F9;\n            \t    box-shadow: 0px 0px 8.57692px rgba(0, 0, 0, 0.15);\n            \t    border-radius: 3px;\n            \t}\n            \t.ymaps-range-line.ymaps-range-line__active {\n            \t    width: 29.79px;\n            \t    height: 8.58px;\n            \t    background: #FFFFFF;\n            \t    box-shadow: 0px 0px 4.28846px #979797;\n            \t    border-radius: 3px;\n            \t}\n            \t.ymaps-input-wrapper {\n\t\t\t\t\tposition: absolute;\n\t\t\t\t\ttop: 10px;\n\t\t\t\t\tleft: 10px;\n\t\t\t\t\tborder: 1px solid transparent;\n\t\t\t\t\twidth: 320px;\n\t\t\t\t\theight: 36px;\n\t\t\t\t\tbackground: #FFFFFF;\n\t\t\t\t\tborder-radius: 35px;\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\talign-items: stretch;\n\t\t\t\t\tjustify-content: space-between;\n\t\t\t\t\tbackground-color: transparent;\n\t\t\t\t\tfilter: drop-shadow(0px 1px 8px rgba(96, 98, 102, 0.3));\n\t\t\t\t}\n\t\t\t\t.yamaps-search__input {\n\t\t\t\t\twidth: 64%;\n\t\t\t\t\tborder-top-left-radius: 35px;\n\t\t\t\t\tborder-bottom-left-radius: 35px;\n\t\t\t\t\theight: 100%;\n\t\t\t\t\tpadding-left: 12px;\n\t\t\t\t\tborder: none;\n\t\t\t\t}\n\t\t\t\t.yamaps-search__input::placeholder {\n\t\t\t\t\tfont-weight: 400;\n\t\t\t\t\tfont-size: 13px;\n\t\t\t\t\tline-height: 14px;\n\t\t\t\t\tcolor: #606266;\n\t\t\t\t}\n\t\t\t\t.yamaps-search__input:focus {\n\t\t\t\t\toutline: none;\n\t\t\t\t\tborder: 1px solid #FFE485;\n\t\t\t\t}\n\t\t\t\t.yamaps-search__button {\n\t\t\t\t\twidth: 40%;\n\t\t\t\t\tbackground-color: #FFE485;\n\t\t\t\t\theight: 35px;\n\t\t\t\t\tborder: 1px solid #FFE485;\n\t\t\t\t\tborder-top-right-radius: 35px;\n\t\t\t\t\tborder-bottom-right-radius: 35px;\n\t\t\t\t\tfont-family: 'Open Sans';\n\t\t\t\t\tfont-style: normal;\n\t\t\t\t\tfont-weight: 600;\n\t\t\t\t\tfont-size: 12px;\n\t\t\t\t\tline-height: 16px;\n\t\t\t\t\talign-items: center;\n\t\t\t\t\ttext-align: center;\n\t\t\t\t\tcolor: #1D1E1F;\n\t\t\t\t}\n\t\t\t\t.ymaps-2-1-79-copyright__content,\n            \t.ymaps-2-1-79-gototech,\n            \t.ymaps-2-1-79-gotoymaps__container,\n\t\t\t\t.ymaps-2-1-79-float-button,\n\t\t\t\t.ymaps-2-1-79-_hidden-icon,\n\t\t\t\t.ymaps-2-1-79-gototaxi,\n\t\t\t\t.ymaps-2-1-79-searchbox__normal-layout {\n            \t    display: none;\n            \t}\n\t\t\t\t@media screen and ( max-width: 550px) {\n\t\t\t\t\t.range {\n\t\t\t\t\t\ttop: 150px;\n\t\t\t\t\t}\n\t\t\t\t}\n            </style>", _temp), _possibleConstructorReturn(_this, _ret);
	}
	/** Шаблон элемента */


	_createClass(YMapsStyles, [{
		key: "fCreate",


		/** Создаем объект контрола, с помощью templateLayoutFactory */
		value: function fCreate() {
			var StylesLayout = ymaps.templateLayoutFactory.createClass(this.tpl, {
				build: function build() {
					StylesLayout.superclass.build.call(this);
				},
				clear: function clear() {
					StylesLayout.superclass.clear.call(this);
				}
			});

			return StylesLayout;
		}
	}]);

	return YMapsStyles;
}(_YMapsCtrlBase.YMapsBase);

/***/ }),

/***/ "96cf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!function (global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = ( false ? undefined : _typeof(module)) === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function (arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
}(
// In sloppy mode, unbound `this` refers to the global object, fallback to
// Function constructor if we're in global strict mode. That is sadly a form
// of indirect eval which violates Content Security Policy.
function () {
  return this;
}() || Function("return this")());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("62e4")(module)))

/***/ }),

/***/ "9bbc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
}

/***/ }),

/***/ "a0b6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fAddTemplateToMap = fAddTemplateToMap;
exports.fAddBaloonToMap = fAddBaloonToMap;
exports.fAddMarkerToMap = fAddMarkerToMap;
/** Добавить контроллеры на карту (Поиск, Зум) */
function fAddTemplateToMap(Cls, ctx) {
	var cls = new Cls(ctx.Map);
	cls.fCreate();

	ctx.Map.controls.add(cls, {});
	return cls;
}

/** Добавить на карту объекты */
function fAddBaloonToMap(Cls, ctx) {
	var cls = new Cls({
		Map: ctx.Map,
		markers: ctx.markers,
		pathToBaloon: ctx.pathToBaloon
	});
	return cls.fCreate();
}

/** Добавить контроллеры на карту (Поиск, Зум) и флаг добавления маркера при поиске*/
function fAddMarkerToMap(Cls, ctx) {
	var cls = new Cls(ctx.Map, ctx.putMarkerInSearch);
	cls.fCreate();
	ctx.Map.controls.add(cls, {});
	return cls;
}

/***/ }),

/***/ "b635":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YandexMap = undefined;

var _YandexMap = __webpack_require__("3ac0");

var _YandexMap2 = _interopRequireDefault(_YandexMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.YandexMap = _YandexMap2.default;

/***/ }),

/***/ "bbdd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = function () {
  return this;
}() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__("96cf");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch (e) {
    g.regeneratorRuntime = undefined;
  }
}

/***/ }),

/***/ "d785":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__("bbdd");

/***/ }),

/***/ "e3d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"75a6de23-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/component/YandexMap.vue?vue&type=template&id=067e7bd8&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ymap-wrapper__custom",staticStyle:{"width":"100%","height":"100%","max-height":"520px","position":"relative","border":"1px solid transparent","border-radius":"17px","overflow":"hidden"}},[_c('div',{staticStyle:{"width":"100%","height":"100%"},attrs:{"id":_vm.mapId}})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/component/YandexMap.vue?vue&type=template&id=067e7bd8&


/***/ }),

/***/ "fae3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entry = __webpack_require__("b635");

Object.keys(_entry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _entry[key];
    }
  });
});

__webpack_require__("1eb2");

/***/ })

/******/ });
});
//# sourceMappingURL=component.umd.js.map