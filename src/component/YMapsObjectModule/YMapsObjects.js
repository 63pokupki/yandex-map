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

    /** Создаем объект контрола, с помощью templateLayoutFactory */
    fCreate() {
        this.Map.geoObjects.removeAll();

        const test = ymaps.templateLayoutFactory.createClass('<img>', {
            build: function () {
                test.superclass.build.call(this);

                const imgElement = this.getParentElement().querySelector('img')
                console.log(imgElement)

                console.log(this.getData().features.map(e => e.options.iconImageHref))
                const aFeatures = this.getData().features
                const ixFrequent = {}
                let sIconMostFrequent = aFeatures[0].options.iconImageHref
                for (let i = 0; i<aFeatures.length; i++) {
                    const sIcon = ixFrequent[i].options.iconImageHref
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
        
        const objectManagerConfig = {
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // Опции для кастомной иконки одиночной метки
            geoObjectIconLayout: 'default#image',
            // Размеры метки.
            geoObjectIconImageSize: [50, 50], 
            // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
            geoObjectIconImageOffset: [-25, -50],
            clusterIconLayout: test
            // Опции для кастомной иконки кластера
            // clusterIconLayout: 'default#image',
            // Размеры метки.
            // clusterIconImageSize: [70, 70],
            // // Смещение левого верхнего угла иконки относительно
            // // её "ножки" (точки привязки).
            // clusterIconImageOffset: [-35, -70],
        }
        if (this.pathToBaloon) {
            // Своё изображение иконки метки.
            objectManagerConfig.geoObjectIconImageHref = this.pathToBaloon
            objectManagerConfig.clusterIconImageHref = this.pathToBaloon
        }
        const objectManager = new ymaps.ObjectManager(objectManagerConfig);

        const objectColection = [];

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
                    iconImageHref: this.markers[i].iconImageHref
                }
            }
            objectColection.push(oneObject)
        }
        objectManager.add(objectColection);
        this.Map.geoObjects.add(objectManager);
        return objectManager
    }
}
