import { fAddTemplateToMap, fAddBaloonToMap } from './service/YmapsAddTpl';
import { YMapsSearch } from './YMapsControlModule/YMapsSearch';
import { YMapsStyles } from './YMapsControlModule/YMapsStyles';
import { YMapsObjects } from './YMapsObjectModule/YMapsObjects';
import { YMapsZoom } from './YMapsControlModule/YMapsZoom';

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
    MapControls = {};

    constructor(MapConfig) {
        this.mapId = MapConfig.mapId;
        this.center = MapConfig.center;
        this.controls = MapConfig.controls;
        this.markers = MapConfig.markers;
        this.zoomOptions = MapConfig.zoomOptions;
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

        // Добавить кастомный инпут поиска
        this.MapControls.search_control = fAddTemplateToMap(YMapsSearch, this);

        // Добавим кастомный элемент зума карты
        this.MapControls.zoom_control  = fAddTemplateToMap(YMapsZoom, this);

        // Добавим объекты на карту
        this.MapControls.map_objects = fAddBaloonToMap(YMapsObjects, this);

        // Вернем созданные объекты для взаимодействия с Vue
        return {
            map: this.Map,
            map_objects: this.MapControls.map_objects,
            search_control: this.MapControls.search_control,
            zoom_control: this.MapControls.zoom_control,
        }
    }
}
