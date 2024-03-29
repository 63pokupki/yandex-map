import { fAddTemplateToMap, fAddBaloonToMap, fAddMarkerToMap } from './service/YmapsAddTpl';
import { YMapsSearch } from './YMapsControlModule/YMapsSearch';
import { YMapsStyles } from './YMapsControlModule/YMapsStyles';
import { YMapsObjects } from './YMapsObjectModule/YMapsObjects';

/** Модуль инициализации карты */
export class YMapsCustom {
    /** Id карты */
    mapId;
    /** Координаты центра */
    center;
    /** Элементы управления для отрисовки */
    controls;
    /** Маркеры на карте */
    markers;
    /** Начальные опции зума */
    zoomOptions;
    /** Объект карты */
    Map;
    /** Контроллеры карты */
    MapControls;
    /** Путь до изображения балуна */
    pathToBaloon;

    constructor(MapConfig) {
        this.mapId = MapConfig.mapId;
        this.center = MapConfig.center;
        this.controls = MapConfig.controls;
        this.markers = MapConfig.markers;
        this.zoomOptions = MapConfig.zoomOptions;
        this.pathToBaloon = MapConfig.pathToBaloon;
        this.putMarkerInSearch = MapConfig.putMarkerInSearch;
    }

    fInitMapObjects() {
        return fAddBaloonToMap(YMapsObjects, this);
    }

    /** Инициализация карты */
    async faInitMap() {
        await ymaps.ready();

        // Создаем объект карты
        this.Map = new ymaps.Map(this.mapId, {
            center: this.center,
            zoom: this.zoomOptions.zoom,
            controls: this.controls,
        }, {
            minZoom: this.zoomOptions.minZoom,
            maxZoom: this.zoomOptions.maxZoom
        });

        // Применим шаблон стилей
        fAddTemplateToMap(YMapsStyles, this);

        this.MapControls = {};

        // Добавить кастомный инпут поиска
        this.MapControls.search_control = fAddMarkerToMap(YMapsSearch, this);

        // Добавим объекты на карту
        this.MapControls.map_objects = this.fInitMapObjects();

        // Вернем созданные объекты для взаимодействия с Vue
        return {
            map: this.Map,
            map_objects: this.MapControls.map_objects,
            search_control: this.MapControls.search_control,
        }
    }
}
