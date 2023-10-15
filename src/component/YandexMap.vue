<template>
    <div 
        class="ymap-wrapper__custom" 
        style="width: 100%; height: 100%;max-height: 520px; position: relative; border: 1px solid transparent;border-radius: 17px;overflow: hidden;">
        <div :id="mapId" style="width: 100%; height: 100%; "></div>
    </div>
</template>

<script>
import { YMapsCustom } from './YandexMap';

export default {
    name: 'YandexMap',
    props : {
        /**
         * список кластеров
         * @type {Array.<
         * {id:number, latitude:string, longitude: string, iconImageHref: string, 
         * balloonContent: {html: string, methods: object},
         * }>} 
        */
        markers: {
            type: Array,
            default: () => []
        },
        /**
         * Ставить ли маркер по клику
         */
        isMarkerOnClick: {
            type: Boolean,
            default: false,
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
        pathToBaloon: '',
        /**
         * Функция генерирующая иконку кластера
         * @type {({elImg: HTMLImageElement, aFeatures: any}) => void} 
        */
        generateClusterIcon: {
            type: Function,
        }
    },

    data() {
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
            mapId: `yandex-map-${Math.round(Math.random() * 1000)}`
        };
    },

    mounted() {
        if (!document.getElementById('yandex-maps')) {
           let scriptYandexMap = document.createElement('script');
           scriptYandexMap.setAttribute('src', `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${this.apiKey}&mode=release&coordorder=latlong`);
           scriptYandexMap.setAttribute('id', 'yandex-maps');
           document.head.appendChild(scriptYandexMap);
           scriptYandexMap.addEventListener('load', () => {
               this.initializeYandexMap();
           });
        } else {
            this.initializeYandexMap();
        }
    },
    methods: {
        // Инициализация карты
        async initializeYandexMap() {
            let markers = [];

            if (this.markers) {
                markers = [...this.markers];
            }

            // Создаём объект карты
            this.mapCustom = new YMapsCustom({ 
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
                putMarkerInSearch: this.putMarkerInSearch,
                generateClusterIcon: this.generateClusterIcon,
            });

            const { map, map_objects, search_control, zoom_control } = await this.mapCustom.faInitMap();

            this.map = map;
            this.objectManager = map_objects;
            this.searchManager = search_control
            this.zoomManager = zoom_control

            if(!this.markers || this.isMarkerOnClick){
                this.map.events.add('click', this.onClickMap);
                this.searchControl = new ymaps.control.SearchControl({
                    options: {
                        float: 'left',
                        floatIndex: 100,
                        noPlacemark: false
                    }
                });
                if(this.oneMarkerCoords) {
                    this.oneMarker = new ymaps.Placemark(this.oneMarkerCoords);
                    this.map.geoObjects.add(this.oneMarker);
                }
                if (this.putMarkerInSearch) {
                    this.map.geoObjects.events.add('click', this.onClickOnceMarket);                    
                }
                this.map.controls.add(this.searchControl);
                this.searchControl.events.add('resultselect', this.Search);
            } 
            else {
                this.objectManager.objects.events.add(['click'], this.onClickEvent);
            }

            this.map.events.add(['boundschange','datachange','objecttypeschange'], this.getVisibleObjects.bind(this));
            this.$emit("InitializeYandexMap", this.map);           
        },

        // Получаем только видимые объекты
        getVisibleObjects() {
            const aVisibleCoords = [];
            let objects = ymaps.geoQuery(this.objectManager.objects).searchInside(this.map);
    
            for (let i = 0; i < objects["_objects"].length; i++) {
                aVisibleCoords.push(objects["_objects"][i].geometry["_coordinates"]);
            }

            this.$emit("getVisibleObjects", aVisibleCoords);   
        },

        // Событие клика на маркер
        onClickEvent (e) {
            const objectId = e.get('objectId'),
                objectGeometry = this.objectManager.objects.getById(objectId).geometry.type;
            // Если событие произошло на метке, изменяем цвет ее иконки.
            if (objectGeometry === 'Point') {
                this.$emit("ClickMarker", objectId);
                this.point = objectId;
            }
        },

        // Событие клика по карте
        onClickMap(e) {
            let coords = e.get('coords');
            if (this.oneMarker) {
                this.map.geoObjects.remove(this.oneMarker);
            }
            this.oneMarker = new ymaps.Placemark(coords);
            this.map.geoObjects.add( this.oneMarker);
            this.$emit("ClickMap", coords);

        },

        /** Событие клика по маркеру при выборе города */
        onClickOnceMarket(e) {
            let coords = e.get('coords');
            this.$emit("ClickOneMarker", coords);
        },

        // Событие выбора результата поиска
        Search(e) {
            if (this.oneMarker) this.map.geoObjects.remove(this.oneMarker);
            const resultList = this.searchControl.getResultsArray();
            const index = this.searchControl.getSelectedIndex();
            const result = resultList[index].properties.get('metaDataProperty.GeocoderMetaData');
            const param = {
                text: result.text,
                addrresDetails: result.AddressDetails
            }
            this.$emit("Search", param);
        },
    },
    watch: {
        coordsCenter: function() {
            if (this.coordsCenter && this.map) {
                this.map.setCenter(this.coordsCenter);
            }
        },
        markers: {
            async handler() {
                if (this.mapCustom) {
                    this.mapCustom.markers = this.markers
                    this.objectManager = this.mapCustom.fInitMapObjects()
                    this.objectManager.objects.events.add(['click'], this.onClickEvent);
                }
            }
        },
        currentCoords: {
            deep: true,
            handler(currVal, oldVal) {
                if (currVal && this.map) {
                    this.map.setCenter(currVal);
                    this.map.setZoom(18, { checkZoomRange: true, smooth: true, duration: 300 },)
                    setTimeout(() => {
                        document.querySelector('#zoom-in').click();
                    }, 300)
                }
            }
        },
        isMarkerOnClick: (newValue) => {
            if (newValue) {
                this.map.events.add('click', this.onClickMap);
                if(this.oneMarkerCoords) {
                    this.oneMarker = new ymaps.Placemark(this.oneMarkerCoords);
                    this.map.geoObjects.add(this.oneMarker);
                }
            } else {
                this.map.events.remove('click', this.onClickMap);
                this.map.geoObjects.remove(this.oneMarker);
            }
        }
    },
    beforeDestroy() {
        if (this.map.geoObjects.length) {
            this.map.geoObjects.removeAll();
        } 
    },
}

</script>


<style>
.ymap-pvz-popover {
    background: white;
    border-radius: 8px;
    position: relative;
    box-shadow: 0 0 8px rgba(0,0,0,.15);
    width: fit-content;
}
.ymap-pvz-popover-close {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #4F4F50;
    position: absolute;
    top: -11px;
    right: -11px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
.ymap-pvz-popover-arrow {
    display: block;
    width: 6px;
    height: 6px;
    position: absolute;
    left: calc(50% - 3px);
    bottom: -3px;
    background-color: inherit;
    transform: rotate(45deg);
    box-shadow: 0 0 8px rgba(0,0,0,.15);
}
.ymap-pvz-popover-inner {
    
}
</style>