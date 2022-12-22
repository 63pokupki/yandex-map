export class YMapsObjects {
    /** Карта */
    Map;

    /** Маркеры */
    markers;

    constructor(map, markers) {
        this.markers = markers;
        this.Map = map;
    }

    /** Создаем объект контрола, с помощью templateLayoutFactory */
    fCreate() {
        this.Map.geoObjects.removeAll();
        this.objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // Опции для кастомной иконки одиночной метки
            geoObjectIconLayout: 'default#image',
            // Своё изображение иконки метки.
            geoObjectIconImageHref: require('@/assets/images/map-point.svg'),
            // Размеры метки.
            geoObjectIconImageSize: [50, 50],
            // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
            geoObjectIconImageOffset: [-25, -50],
            // Опции для кастомной иконки кластера
            clusterIconLayout: 'default#image',
            // Своё изображение иконки метки.
            clusterIconImageHref: require('@/assets/images/map-point.svg'),
            // Размеры метки.
            clusterIconImageSize: [70, 70],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            clusterIconImageOffset: [-35, -70],
        });

        const objectColection = [];

        for (let i = 0; i < this.markers.length; i++) {
            objectColection.push({
                type: 'Feature',
                id: this.markers[i].id,
                geometry: {
                    type: 'Point',
                    coordinates: [this.markers[i].latitude, this.markers[i].longitude]
                },
            })
        }

        this.objectManager.add(objectColection);
        this.Map.geoObjects.add(this.objectManager);

        return this.objectManager;
    }
}
