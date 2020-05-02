/**
 * Компонент, который возвращает элементы управления (кнопки)
 */

define('app/Components/Controls.js', [
    'app/Components/Component.js',
    'app/Controllers/MainHandler.js',
    'app/Components/Popup.js',
    'app/Helpers/UsefulFunction.js'
], function (Component, Handler, Popup, Func) {
    return class Controls extends Component {

        constructor() {
            super();
            this.current = 0;
        }

        /**
         * Рендер компонента
         * @returns {string}
         */
        render() {
            return `
                <div class="controls">
                    <div class="controls__button">
                        <span class="controls__title controls__title_start">Начать сортировку</span>
                    </div>
                    <div class="controls__button">
                        <span class="controls__title controls__title_add">Добавить число</span>
                    </div>
                    <div class="controls__button">
                        <span class="controls__title controls__title_delete">Удалить все числа</span>
                    </div>
                    <div class="controls__button">
                        <span class="controls__title controls__title_random">Рандомные числа</span>
                    </div>
                    
                </div>
            `;
        }

        /**
         * Удаление старого popup(если оно есть) и вставка нового
         * @param type - тип popup
         * @param obj - объект popup
         * @param className - класс popup
         * @returns {Promise<void>}
         */
        async destroyAndInsert(type, obj, className) {
            let elem = document.querySelector(".popup");
            if (elem !== null) {
                elem.classList.add('destroy');
                await Func.sleep(300);
                elem.remove();
            }
            Func.insertElement(
                'div',
                document.body,
                className,
                obj
            );
            obj.afterRender(type);
            this.current = 0;
        }

        /**
         * Обработчик кнопки старта сортировки
         */
        startSorting() {
            if (this.current == 0) {
                let type = "start";
                let className = "popup small";
                let obj = new Popup(type);
                this.current = 1;
                this.destroyAndInsert(type, obj, className);
            }
        }

        /**
         * Обработчик кнопки добавить число
         */
        addNumber() {
            if (this.current == 0) {
                let type = "add";
                let className = "popup small";
                let obj = new Popup(type);
                this.current = 1;
                this.destroyAndInsert(type, obj, className);
            }
        }

        /**
         * Обработчик кнопки добавить рандомные числа
         */
        randomNumber() {
            if (this.current == 0) {
                let type = "random";
                let className = "popup small2";
                let obj = new Popup(type);
                this.current = 1;
                this.destroyAndInsert(type, obj, className);
            }
        }

        /**
         * Обработчик кнопки удалить все числа
         */
        deleteNumbers() {
            Handler.deleteNumbers();
        }

        /**
         * Добавление событий
         */
        afterRender() {
            document.querySelector(".controls__title_start").addEventListener("click", () => this.startSorting());
            document.querySelector(".controls__title_add").addEventListener("click", () => this.addNumber());
            document.querySelector(".controls__title_random").addEventListener("click", () => this.randomNumber());
            document.querySelector(".controls__title_delete").addEventListener("click", () => this.deleteNumbers());
        }

    }
});