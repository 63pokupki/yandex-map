/** Добавить контроллеры на карту (Поиск, Зум) */
export function fAddTemplateToMap(Cls, ctx) {
	const cls = new Cls(ctx.Map);
    	cls.fCreate();

	ctx.Map.controls.add(cls, {});
	return cls;
}

/** Добавить на карту объекты */
export function fAddBaloonToMap(Cls, pathToBaloon, ctx) {
	const cls = new Cls(ctx.Map, ctx.markers);
	return cls.fCreate(pathToBaloon);
}

/** Добавить контроллеры на карту (Поиск, Зум) и флаг добавления маркера при поиске*/
export function fAddMarkerToMap(Cls, ctx) {
	const cls = new Cls(ctx.Map, ctx.putMarkerInSearch);
	cls.fCreate();
	ctx.Map.controls.add(cls, {});
	return cls;
}