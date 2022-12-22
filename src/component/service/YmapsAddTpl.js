/** Добавить контроллеры на карту (Поиск, Зум) */
export function fAddTemplateToMap(Cls, ctx) {
	const cls = new Cls(ctx.Map);
    	cls.fCreate();

	ctx.Map.controls.add(cls, {});
	return cls;
}

/** Добавить на карту объекты */
export function fAddBaloonToMap(Cls, ctx) {
	const cls = new Cls(ctx.Map, ctx.markers);
	return cls.fCreate();
}