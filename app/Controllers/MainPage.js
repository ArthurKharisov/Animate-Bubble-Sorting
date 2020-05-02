/**
 * Главная страница
 */
define('app/Controllers/MainPage.js', [
    "app/Components/Component.js",
    "app/Components/Popup.js",
    "app/Components/Controls.js",
    "app/Controllers/MainHandler.js"
], function (Component, Popup, Controls, Handler) {

    return class MainPage extends Component {

        constructor() {
            super();
            this.modules = {
                controls: new Controls(),
                popup: new Popup("info")
            }
        }

        /**
         * Рендер страницы
         * @returns {string}
         */
        render() {
            return `
                ${this.modules.popup}
                ${this.modules.controls}
                <div class="numbers"></div>
            `;
        }

        /**
         * Добавление событий
         */
        afterRender() {
            Handler.init();
            this.modules.controls.afterRender();
        }


    }

});

