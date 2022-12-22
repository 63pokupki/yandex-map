import { YMapsBase } from "./YMapsCtrlBase";

export class YMapsSearch extends YMapsBase {
	/** Шаблон элемента */
	tpl = `<div class="input-wrapper">
				<input placeholder="Введите адрес" id="suggest" class="yamaps-search__input" type="text">
				<button id="search_btn" class="yamaps-search__button">Найти</button>
			</div>`;

	/** Создаем объект контрола, с помощью templateLayoutFactory */
	fCreate() {
		const SearchLayout = ymaps.templateLayoutFactory.createClass(this.tpl, {
			/** Объект инпута поиска */
			SuggestView: null,
			/** Значение инпута поиска */
			suggestionValue: null,
			/** Объект карты, получаем из родительского модуля */
			Map: this.Map,

			build: function () {
				SearchLayout.superclass.build.call(this);
				// Навешиваем события
				this.fCreateSuggestView();
				this.fSetEventsOnSearch();
			},

			clear: function () {
				this.fRemoveEventListeners();
				SearchLayout.superclass.clear.call(this);
			},

			/** Навешиваем события на инпут */
			fSetEventsOnSearch() {
				document.querySelector('#suggest').addEventListener('input', this.fSaveValueOnInputType.bind(this));

				document.querySelector('#search_btn').addEventListener('click', this.fSearchByButton.bind(this));

				document.querySelector('#suggest').addEventListener('keydown', this.fSearchByEnter.bind(this));

				this.SuggestView.events.add('select', this.fSearchBySelect.bind(this));
			},

			/** Создaем suggestView поверх кастомного инпута, чтобы сохранить подсказки от яндекса */
			fCreateSuggestView() {
				this.SuggestView = new ymaps.SuggestView('suggest', { provider: 'yandex#search', results: 3, offset: [0, -2000] });
			},

			/** Сохраняем значение инпут при вводе, для поиска по кнопке или клику на enter */
			fSaveValueOnInputType(e) {
				this.suggestionValue = e.target.value;
				if (e.target.value.trim().length > 0) {
					this.SuggestView.options.set('offset', [0, 0])
				} else {
					this.SuggestView.options.set('offset', [0, -2000])
					this.suggestionValue = null;
				}
			},

			/** Поиск по карте отталкиваясь от данных из custom input  */
			fSearchBySelect: function (e) {
				const q = e.get('item').value;
				this.fSearch(q);
			},

			/** Поиск по enter */
			fSearchByEnter: function (e) {
				if (e.code.toLowerCase() === 'enter') {
					this.fSearch(e.target.value);
				}
			},

			/** Поиск по кнопке */
			fSearchByButton: function (e) {
				if (this.suggestionValue) this.fSearch(this.suggestionValue);
			},

			/** Поиск и центрирование карты по результатам */
			fSearch: function (value) {
				ymaps.geocode(value).then((result) => {
					const coords = result.geoObjects.get(0).geometry.getCoordinates();
					this.Map.setCenter([coords[0], coords[1]]);
				}
				);
			},

			/** Удаляем обработчики событий */
			fRemoveEventListeners: function () {
				document.querySelector('#suggest').removeEventListener('input', this.fSaveValueOnInputType.bind(this));

				document.querySelector('#search_btn').removeEventListener('click', this.fSearchByButton.bind(this));

				document.querySelector('#suggest').removeEventListener('keydown', this.fSearchByEnter.bind(this));

				this.SuggestView.events.remove('select', this.fSearchBySelect.bind(this));
			}
		});

		return SearchLayout;
	}
}
