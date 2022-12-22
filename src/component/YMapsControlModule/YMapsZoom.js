import { YMapsBase } from "./YMapsCtrlBase";

export class YMapsZoom extends YMapsBase {
    /** Шаблон элемента */
    tpl = `<div class="range">
                <button id="zoom-out" class="range-btn">
                    <svg width="23" height="5" viewBox="0 0 23 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="22.3064" y="0.63501" width="3.69927" height="22.0241" rx="1.84963" transform="rotate(90 22.3064 0.63501)" fill="#36A6F2"/>
                    </svg>    
                </button>
                <div class="range-line range-line__active"></div>
                <div class="range-line"></div>
                <div class="range-line"></div>
                <div class="range-line"></div>
                <div class="range-line"></div>
                <div class="range-line"></div>
                <div class="range-line"></div>
                <div class="range-line"></div>
                <div class="range-line"></div>
                <div class="range-line"></div>
                <button id="zoom-in" class="range-btn">
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="9.45898" y="0.790527" width="3.67068" height="22.1956" rx="1.83534" fill="#36A6F2"/>
                        <rect x="22.3064" y="10.0388" width="3.69927" height="22.0241" rx="1.84963" transform="rotate(90 22.3064 10.0388)" fill="#36A6F2"/>
                    </svg>                 
                </button>
            </div>`;

    /** Создаем объект контрола, с помощью templateLayoutFactory */
    fCreate() {
        const СustomZoomLayout = ymaps.templateLayoutFactory.createClass(this.tpl, {
            zoomBtnItem: null,
            zoomScrollTimeout: null,
            zoomOptions: { checkZoomRange: true, smooth: true, duration: 300 },
            // Монтируем карту
            build: function () {
                const map = this.getData().map;

                // Вызываем родительский метод build.
                СustomZoomLayout.superclass.build.call(this);

                // Получаем элементы отображающие текущий зум
                this.zoomBtnItem = document.querySelectorAll('.range-line');

                // Привязываем функции-обработчики к контексту и сохраняем ссылки на них, чтобы потом отписаться от событий.
                this.zoomInCb = ymaps.util.bind(this.zoomIn, this);
                this.zoomOutCb = ymaps.util.bind(this.zoomOut, this);
                this.zoomByRangeLineClickCb = ymaps.util.bind(this.zoomByRangeLineClick, this);
                this.setCustomZoomValueCb = ymaps.util.bind(this.setCustomZoomValue, this);

                // Начинаем слушать события макета.
                document.querySelector('#zoom-in').addEventListener('click', this.zoomInCb);
                document.querySelector('#zoom-out').addEventListener('click', this.zoomOutCb);
                document.querySelector('.range').addEventListener('click', this.zoomByRangeLineClickCb);
                map.events.add('wheel', this.setCustomZoomValueCb);

                // Получаем и устанавливаем значение zoom
                const curr_zoom = map.getZoom();
                map.setZoom(curr_zoom, { checkZoomRange: true });
            },
            // Очищаем объект карты
            clear: function () {
                const map = this.getData().map;

                // Снимаем обработчики.
                document.querySelector('#zoom-in')?.removeEventListener('click', this.zoomInCb);
                document.querySelector('#zoom-out')?.removeEventListener('click', this.zoomOutCb);
                document.querySelector('.range')?.removeEventListener('click', this.zoomByRangeLineClickCb);
                map.events.remove('wheel', this.setCustomZoomValueCb);

                // Очищаем таймаут зума при скролле
                clearTimeout(this.zoomScrollTimeout);

                // Вызываем родительский метод clear.
                СustomZoomLayout.superclass.clear.call(this);
            },
            // Устанавливаем значение самодельного зума при клике по одной из полосок на нем
            zoomByRangeLineClick: function (e) {
                const map = this.getData().map;
                if (e.target.classList.contains('range-line')) {
                    for (let i = 0; i < this.zoomBtnItem.length; i++) {
                        this.zoomBtnItem[i].classList.remove('range-line__active');
                    }
                    e.target.classList.add('range-line__active');
                    let indexOfActive = 0;
                    const zoomBtnItemNew = document.querySelectorAll('.range-line');
                    for (let i = 0; i < zoomBtnItemNew.length; i++) {
                        if (zoomBtnItemNew[i].classList.contains('range-line__active')) {
                            indexOfActive = i;
                        }
                    }
                    map.setZoom(indexOfActive + 10, this.zoomOptions);
                }
            },
            // Устанавливаем значение на самодельном зуме, при скролле коллесиком
            setCustomZoomValue: function (e) {
                const map = this.getData().map;

                const checkInterval = setInterval(() => {
                    const zoom = map.getZoom();
                    this.zoomBtnItem[zoom - 10].classList.add('range-line__active');
                    for (let i = 0; i < this.zoomBtnItem.length; i++) {
                        this.zoomBtnItem[i].classList.remove('range-line__active');
                    }
                    this.zoomBtnItem[zoom - 10].classList.add('range-line__active');
                }, 10);

                this.zoomScrollTimeout = setTimeout(() => {
                    clearInterval(checkInterval)
                }, 1000);
            },
            // Приблизить
            zoomIn: function () {
                const map = this.getData().map
                const zoom = map.getZoom();

                if (zoom < 19) {
                    map.setZoom(zoom + 1, this.zoomOptions);
                    for (let i = 0; i < this.zoomBtnItem.length; i++) {
                        this.zoomBtnItem[i].classList.remove('range-line__active');
                    }

                    const curr_zoom = map.getZoom();

                    this.zoomBtnItem[(curr_zoom + 1) - 10].classList.add('range-line__active');
                } else {
                    this.zoomBtnItem[this.zoomBtnItem.length - 1].classList.add('range-line__active');
                }
            },
            // Отдалить
            zoomOut: function () {
                const map = this.getData().map
                const zoom = map.getZoom();

                if (zoom > 10) {
                    map.setZoom(zoom - 1, this.zoomOptions);
                    for (let i = 0; i < this.zoomBtnItem.length; i++) {
                        this.zoomBtnItem[i].classList.remove('range-line__active');
                    }
                    const curr_zoom = map.getZoom();
                    this.zoomBtnItem[(curr_zoom - 1) - 10].classList.add('range-line__active');
                } else {
                    this.zoomBtnItem[0].classList.add('range-line__active');
                }
            }
        })

        return СustomZoomLayout;
    }
}
