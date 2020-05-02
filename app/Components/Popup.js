/**
 * Компонент всплывающее окно
 */

define('app/Components/Popup.js', [
    'app/Components/Component.js',
    'app/Controllers/MainHandler.js'], function (Component, Handler) {
    return class Popup extends Component {

        constructor(type) {
            super();
            this.type = type;
        }

        /**
         * Рендер компонента
         * @returns {string}
         */
        render() {
            let str;
            switch (this.type) {
                case "add":
                    str = this.renderAddNumber();
                    break;
                case "start":
                    str = this.renderStart();
                    break;
                case "random":
                    str = this.renderRandom();
                    break;
                case "info":
                    str = this.renderInfo();
                    break;
            }
            return str;
        }

        /**
         * Рендер окна с инструкциями
         * @returns {string}
         */
        renderInfo() {
            return ` <div class="popup informator">
                        <h2 class="popup__title">Инструкция:</h2>
                        <div class="popup__text">
                            <p>На данной странице представлена реализация анимации пузырькового метода сортировки массива.</p>
                            <p>Элементы массива представляют собой шары, которые меняют свой размер в зависимости от заданного числа.</p>
                            <h4>Управление:</h4>
                            <p>Внизу экрана находятся 4 кнопки управления. Каждая кнопка соответствует своему описанию.</p>
                            <h4>Примечание:</h4>
                            <p>При сортировке, полоса прокрутки перемещается автоматически.</p>
                            <p>Всплывающее окно исчезнет после нажатия на любую из кнопок управления.</p>
                            <p>Размер шара высчитывается исходя из максимального и минимального числа в массиве.</p>
                        </div>
                     </div>
                    `;
        }

        /**
         * Рендер окна добавления нового числа
         * @returns {string}
         */
        renderAddNumber() {
            return ` <p class="popup__title">Введите число:</p>
                     <input class="popup__input" type="number" >
                     <button class="popup__button">Добавить</button>
                    `;
        }

        /**
         * Рендер окна генерации случайных чисел
         * @returns {string}
         */
        renderRandom() {
            return ` <p class="popup__title">Кол-во чисел:</p>
                     <input class="popup__input popup__input_count" type="number" value="10">
                     <p class="popup__title">Максимальное число:</p>
                     <input class="popup__input popup__input_max" type="number" value="100">
                     <button class="popup__button">Сгенерировать</button>
                    `;
        }

        /**
         * Рендер окна с выбором скорости сортировки
         * @returns {string}
         */
        renderStart() {
            return ` <p class="popup__title">Выберите скорость сортировки:</p>
                     <div class="popup__frame"><input name="popup" class="popup__radio" type="radio" data-speed="100">Очень быстро</div>
                     <div class="popup__frame"><input name="popup" class="popup__radio" type="radio" data-speed="500">Быстро</div>
                     <div class="popup__frame"><input name="popup" class="popup__radio" type="radio" data-speed="700" checked="checked">Нормально</div>
                     <div class="popup__frame"><input name="popup" class="popup__radio" type="radio" data-speed="1200">Медленно</div>
                     <button class="popup__button">Начать</button>
                    `;
        }

        /**
         * Обработчик кнопки добавить число
         */
        addNumber() {
            let input = document.querySelector('.popup__input');
            Handler.addNumber(input.value);
        }

        /**
         * Обработчик кнопки начала сортировки
         */
        start() {
            let radio = document.querySelectorAll(".popup__radio");
            let speed;
            radio.forEach((elem) => {
                if (elem.checked) speed = parseInt(elem.dataset.speed);
            });
            Handler.startBubble(speed);
        }

        /**
         * Обработчик кнопки добавить случайные числа
         */
        random() {
            let inputCount = parseInt(document.querySelector('.popup__input_count').value);
            let inputMax = parseInt(document.querySelector('.popup__input_max').value);
            if ((inputCount > 1) && !isNaN(inputMax)) Handler.randomNumbers(inputCount, inputMax);
        }

        /**
         * Добавление событий
         */
        afterRender() {
            let popup = document.querySelector('.popup');
            let button;
            button = popup.querySelector('.popup__button');
            switch (this.type) {
                case "add":
                    button.addEventListener("click", this.addNumber);
                    break;
                case "start":
                    button.addEventListener("click", this.start);
                    break;
                case "random":
                    button.addEventListener("click", this.random);
                    break;
            }
        }
    }
});