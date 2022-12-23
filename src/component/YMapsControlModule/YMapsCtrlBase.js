export class YMapsBase {
	constructor(map) {
		this.events = new ymaps.event.Manager();
		this.options = new ymaps.option.Manager();
		this.state = new ymaps.data.Manager();
		this.Map = map;
	}

	/** Устанвливаем родительский элемент для контрола созданного с помощью templateLayoutFactory */
	setParent(parent) {
		this.parent = parent;
		if (parent) {
			const map = parent.getMap();
			const Layout = this.fCreate()
			this.layout = new Layout({
				map: map,
			});
			this.layout.setParentElement(map.panes.get('controls').getElement());
		} else {
			this.layout.setParentElement(null);
		}
	}

	/** Получаем родительский элемент для контрола созданного с помощью templateLayoutFactory */
	getParent() {
		return this.parent;
	}
}