export class YMapsObjects {
    /** Карта */
    Map;
    /** Маркеры */
    markers;
    /** Путь до изображения балуна */
    pathToBaloon;

    /**
     * @param {{Map: any, markers: Array, pathToBaloon: string}} params
     */
    constructor(params) {
        this.markers = params.markers;
        this.pathToBaloon = params.pathToBaloon
        this.Map = params.Map;
    }

    /** Получить шаблок для отображение самой часто встречаемой иконки внутри кластера */
    fGetMostFrequentItemTemplate() {
        const mostFrequentIcon = ymaps.templateLayoutFactory.createClass('<img width="70" height="70" style="position: absolute; left: -35px; top: -70px;">', {
            build: function () {
                mostFrequentIcon.superclass.build.call(this);

                const imgElement = this.getParentElement().querySelector('img')

                const aFeatures = this.getData().features
                const ixFrequent = {}
                let sIconMostFrequent = aFeatures[0].options.iconImageHref
                for (let i = 0; i<aFeatures.length; i++) {
                    const sIcon = aFeatures[i].options.iconImageHref
                    if (ixFrequent[sIcon]) {
                        ixFrequent[sIcon]++
                    } else {
                        ixFrequent[sIcon] = 0
                        if (ixFrequent[sIcon] > ixFrequent[sIconMostFrequent]) {
                            sIconMostFrequent = sIcon
                        }
                    }
                }
                
                imgElement.src = sIconMostFrequent

			},
        });
        return mostFrequentIcon
    }

    /** Получить шаблон балуна */
    fGetBalloonLayout() {
        const myBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="ymap-pvz-popover">' +
            '<div class="ymap-pvz-popover-close">&times;</div>' +
            '<div class="ymap-pvz-popover-inner">' +
            '$[[options.contentLayout observeSize]]' +
            '</div>' +
            '<div class="ymap-pvz-popover-arrow"></div>' +
            '</div>', {
            /**
             * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
             * @function
             * @name build
             */
            build: function () {
                this.constructor.superclass.build.call(this);

                this._$element = this.getParentElement().querySelector('.ymap-pvz-popover')

                this.applyElementOffset();

                const elClose = this._$element.querySelector('.ymap-pvz-popover-close')
                elClose.addEventListener('click', this.onCloseClick.bind(this))
            },

            /**
             * Удаляет содержимое макета из DOM.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
             * @function
             * @name clear
             */
            clear: function () {
                const elClose = this._$element.querySelector('.ymap-pvz-popover-close')
                elClose.removeEventListener('click', this.onCloseClick.bind(this))

                this.constructor.superclass.clear.call(this);
            },

            /**
             * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onSublayoutSizeChange
             */
            onSublayoutSizeChange: function () {
                myBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                if(!this._isElement(this._$element)) {
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
            applyElementOffset: function () {
                const nLeft = -(this._$element.offsetWidth / 2)
                const nArrowHeight = 6
                const nTop = -(this._$element.offsetHeight + nArrowHeight + 52)
                this._$element.style.left = `${nLeft}px`
                this._$element.style.top = `${nTop}px`
            },

            /**
             * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onCloseClick
             */
            onCloseClick: function (e) {
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
            getShape: function () {
                if(!this._isElement(this._$element)) {
                    return myBalloonLayout.superclass.getShape.call(this);
                }

                const nTop = Number(this._$element.style.top.substring(0, this._$element.style.top.length - 2))
                const nLeft = Number(this._$element.style.left.substring(0, this._$element.style.left.length - 2))

                return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                    [nLeft, nTop], [
                        nLeft + this._$element.offsetWidth,
                        nTop + this._$element.offsetHeight + this._$element.querySelector('.ymap-pvz-popover-arrow').offsetHeight
                    ]
                ]));
            },

            /**
             * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
             * @function
             * @private
             * @name _isElement
             * @param {HTMLDivElement} [element] Элемент.
             * @returns {Boolean} Флаг наличия.
             */
            _isElement: function (element) {
                return element && element.querySelector('.ymap-pvz-popover-arrow');
            }
        })
        return myBalloonLayout
    }

    /** Создаем объект контрола, с помощью templateLayoutFactory */
    fCreate() {
        this.Map.geoObjects.removeAll();
        
        const objectManagerConfig = {
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // Опции для кастомной иконки одиночной метки
            geoObjectIconLayout: 'default#image',
            // Размеры метки.
            geoObjectIconImageSize: [50, 50], 
            // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
            geoObjectIconImageOffset: [-25, -50],
        }
        if (this.pathToBaloon) {
            // Своё изображение иконки метки.
            objectManagerConfig.clusterIconImageHref = this.pathToBaloon
            // Опции для кастомной иконки кластера
            objectManagerConfig.clusterIconLayout = 'default#image'
            // Размеры метки.
            objectManagerConfig.clusterIconImageSize = [70, 70]
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            objectManagerConfig.clusterIconImageOffset = [-35, -70]
        } else {
            objectManagerConfig.clusterIconLayout = this.fGetMostFrequentItemTemplate()
            objectManagerConfig.clusterIconShape = {
                type: 'Circle',
                coordinates: [0, -25],
                radius: 50,
            }
        }
        const objectManager = new ymaps.ObjectManager(objectManagerConfig);

        const objectColection = [];

        for (let i = 0; i < this.markers.length; i++) {
            const vMarker = this.markers[i]
            const oneObject = {
                type: 'Feature',
                id: vMarker.id,
                geometry: {
                    type: 'Point',
                    coordinates: [vMarker.latitude, vMarker.longitude]
                },
            }
            if (vMarker.balloonContent) {
                oneObject.options = {
                    balloonLayout: this.fGetBalloonLayout(),
                    balloonContentLayout: ymaps.templateLayoutFactory.createClass(
                        vMarker.balloonContent.html, 
                        vMarker.balloonContent.methods,
                    ),
                    hideIconOnBalloonOpen: false,
                    balloonPanelMaxMapArea: 0,
                }
                oneObject.properties = {
                    balloonPanelMaxMapArea: 0,
                }
            }
            if (vMarker.iconImageHref) {
                if (!oneObject.options) {
                    oneObject.options = {}
                }
                oneObject.options.iconImageHref = vMarker.iconImageHref
            }
            objectColection.push(oneObject)
        }
        objectManager.add(objectColection);
        this.Map.geoObjects.add(objectManager);
        return objectManager
    }
}
