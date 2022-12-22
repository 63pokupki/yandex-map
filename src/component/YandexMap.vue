<template>
    <div class="ymap-wrapper__custom">
        <div :id="mapId" style="width: 100%; height: 100%; "></div>
    </div>
</template>
<style scoped>
.ymap-wrapper__custom {
    width: 100%; 
    height: 100%;
    max-height: 520px;
    position: relative;
    border: 1px solid transparent;
    border-radius: 17px;
    overflow: hidden;
}
</style>
<script>
import { YMapsCustom } from './YandexMap';

export default {
    name: 'YandexMap',
    props : {
        markers: {
            type: Array,
            default: null
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
        currentCoords: []
    },

    data() {
        return {
            map: null,
            coords: [],
            objectManager: null,
            point: null,
            oneMarker: null,
            searchControl: null,
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
            const Map = new YMapsCustom({ 
                mapId: this.mapId,
                center: this.coordsCenter,
                controls: [],
                markers: markers,
                zoomOptions: {
                    zoom: 10,
                    minZoom: 10,
                    maxZoom: 19
                }
            });

            const { map, map_objects, search_control, zoom_control } = await Map.faInitMap();

            this.map = map;
            this.objectManager = map_objects;

            if(!this.markers){
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
                this.map.controls.add(this.searchControl);
                this.searchControl.events.add('resultselect', this.Search);
            } 
            else  this.setMarkers();

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
        
        // Установка маркеров на карте
        setMarkers() {
            this.objectManager.objects.events.add(['click'], this.onClickEvent);
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
            this.map.geoObjects.removeAll();
            this.oneMarker = new ymaps.Placemark(coords);
            this.map.geoObjects.add( this.oneMarker);
            this.$emit("ClickMap", coords);
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
                this.setMarkers();
            }
        },
        markers: {
            async handler() {
                this.objectManager.removeAll();
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
        }
    },
    beforeDestroy() {
        if (this.map.geoObjects.length) {
            this.map.geoObjects.removeAll();
        } 
    },
}

</script>