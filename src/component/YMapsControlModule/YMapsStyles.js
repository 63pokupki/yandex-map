import { YMapsBase } from "./YMapsCtrlBase";

export class YMapsStyles extends YMapsBase {
	/** Шаблон элемента */
	tpl = `<style>
            	.ymaps-input-wrapper {
					position: absolute;
					top: 10px;
					left: 10px;
					border: 1px solid transparent;
					width: 320px;
					height: 36px;
					background: #FFFFFF;
					border-radius: 35px;
					display: flex;
					align-items: stretch;
					justify-content: space-between;
					background-color: transparent;
					filter: drop-shadow(0px 1px 8px rgba(96, 98, 102, 0.3));
				}
				.yamaps-search__input {
					width: 64%;
					border-top-left-radius: 35px;
					border-bottom-left-radius: 35px;
					height: 100%;
					padding-left: 12px;
					border: none;
				}
				.yamaps-search__input::placeholder {
					font-weight: 400;
					font-size: 13px;
					line-height: 14px;
					color: #606266;
				}
				.yamaps-search__input:focus {
					outline: none;
					border: 1px solid #FFE485;
				}
				.yamaps-search__button {
					width: 40%;
					background-color: #FFE485;
					height: 35px;
					border: 1px solid #FFE485;
					border-top-right-radius: 35px;
					border-bottom-right-radius: 35px;
					font-family: 'Open Sans';
					font-style: normal;
					font-weight: 600;
					font-size: 12px;
					line-height: 16px;
					align-items: center;
					text-align: center;
					color: #1D1E1F;
				}
				.ymaps-2-1-79-copyright__content,
            	.ymaps-2-1-79-gototech,
            	.ymaps-2-1-79-gotoymaps__container,
				.ymaps-2-1-79-_hidden-icon,
				.ymaps-2-1-79-gototaxi,
				.ymaps-2-1-79-searchbox__normal-layout {
            	    display: none;
            	}
				@media screen and ( max-width: 550px) {
					.range {
						top: 150px;
					}
				}
            </style>`;

	/** Создаем объект контрола, с помощью templateLayoutFactory */
	fCreate() {
		const StylesLayout = ymaps.templateLayoutFactory.createClass(this.tpl, {
			build: function () {
				StylesLayout.superclass.build.call(this);
			},
			clear: function () {
				StylesLayout.superclass.clear.call(this);
			},
		})

		return StylesLayout;
	}
}