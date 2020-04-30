/**
 * Главная страница
 */
define('app/Controllers/MainPage.js', [
    "app/Components/Component.js",
    "app/Components/Popup.js",
    "app/Components/Controls.js"
], function (Component, Popup, Controls) {

    return class MainPage extends Component {

        constructor() {
            super();
        }

        /**
         * Рендер страницы
         * @returns {string}
         */
        render() {
            return `Hello world`;
        }

        /**
         * Добавление событий
         */
        afterRender() {

        }

    }

});

