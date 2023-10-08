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
            '<div class="popover top">' +
            '<a class="close" href="#">&times;</a>' +
            '<div class="arrow"></div>' +
            '<div class="popover-inner">' +
            '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]' +
            '</div>' +
            '</div>', {
            /**
             * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
             * @function
             * @name build
             */
            build: function () {
                this.constructor.superclass.build.call(this);

                this._$element = $('.popover', this.getParentElement());

                this.applyElementOffset();

                this._$element.find('.close')
                    .on('click', $.proxy(this.onCloseClick, this));
            },

            /**
             * Удаляет содержимое макета из DOM.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
             * @function
             * @name clear
             */
            clear: function () {
                this._$element.find('.close')
                    .off('click');

                this.constructor.superclass.clear.call(this);
            },

            /**
             * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onSublayoutSizeChange
             */
            onSublayoutSizeChange: function () {
                MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

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
                this._$element.css({
                    left: -(this._$element[0].offsetWidth / 2),
                    top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                });
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
                    return MyBalloonLayout.superclass.getShape.call(this);
                }

                var position = this._$element.position();

                return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                    [position.left, position.top], [
                        position.left + this._$element[0].offsetWidth,
                        position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                    ]
                ]));
            },

            /**
             * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
             * @function
             * @private
             * @name _isElement
             * @param {jQuery} [element] Элемент.
             * @returns {Boolean} Флаг наличия.
             */
            _isElement: function (element) {
                return element && element[0] && element.find('.arrow')[0];
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

        const BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            "<div>" +
            "<b>123</b>" +
            "</div>"
        );

        for (let i = 0; i < this.markers.length; i++) {
            const oneObject = {
                type: 'Feature',
                id: this.markers[i].id,
                geometry: {
                    type: 'Point',
                    coordinates: [this.markers[i].latitude, this.markers[i].longitude]
                },
            }
            if (this.markers[i].iconImageHref) {
                oneObject.options = {
                    iconImageHref: this.markers[i].iconImageHref,
                    balloonContentLayout: BalloonContentLayout,
                    balloonLayout: this.fGetBalloonLayout(),
                }
                oneObject.properties = {
                    balloonPanelMaxMapArea: 0
                }
            }
            objectColection.push(oneObject)
        }
        objectManager.add(objectColection);
        this.Map.geoObjects.add(objectManager);
        return objectManager
    }
}
