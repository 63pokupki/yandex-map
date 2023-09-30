export class YMapsObjects {
    /** Карта */
    Map;
    /** Маркеры */
    markers;
    /** Путь до изображения балуна */
    pathToBaloon;
    /** Кластеры, если нужны разные виды маркеров */
    clusters;

    /**
     * @param {{Map: any, markers: Array, pathToBaloon: string, clusters: Array}} params
     */
    constructor(params) {
        this.markers = params.markers;
        this.clusters = params.clusters;
        this.pathToBaloon = params.pathToBaloon
        this.Map = params.Map;
    }

    /** Создать маркеры для одного кластера */
    fCreateMarkers(markers, pathToBaloon) {
        const objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // Опции для кастомной иконки одиночной метки
            geoObjectIconLayout: 'default#image',
            // Своё изображение иконки метки.
            geoObjectIconImageHref: pathToBaloon,
            // Размеры метки.
            geoObjectIconImageSize: [50, 50],
            // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки).
            geoObjectIconImageOffset: [-25, -50],
            // Опции для кастомной иконки кластера
            clusterIconLayout: 'default#image',
            // Своё изображение иконки метки.
            clusterIconImageHref: pathToBaloon,
            // Размеры метки.
            clusterIconImageSize: [70, 70],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            clusterIconImageOffset: [-35, -70],
        });

        const objectColection = [];

        for (let i = 0; i < markers.length; i++) {
            objectColection.push({
                type: 'Feature',
                id: markers[i].id,
                geometry: {
                    type: 'Point',
                    coordinates: [markers[i].latitude, markers[i].longitude]
                },
            })
        }
        objectManager.add(objectColection);
        this.Map.geoObjects.add(objectManager);
    }

    /** Создать множество кластеров */
    fCreateMultipleClusters(clusters) {
        for (let i = 0; i<clusters.length; i++) {
            this.fCreateMarkers(clusters.markers, clusters.pathToBaloon)
        }
    }

    /** Создаем объект контрола, с помощью templateLayoutFactory */
    fCreate() {
        this.Map.geoObjects.removeAll();

        let objectManager;
        if (this.clusters && this.clusters.length) {
            objectManager = this.fCreateMultipleClusters(this.clusters)
        } else {
            objectManager = this.fCreateMarkers(this.markers, this.pathToBaloon)
        }

        return this.objectManager;
    }
}
