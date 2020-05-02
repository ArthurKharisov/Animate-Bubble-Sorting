/**
 * Главный обработчик
 */

define('app/Controllers/MainHandler.js', [
    'app/Helpers/ResizeNumber.js',
    'app/Helpers/UsefulFunction.js'
], function (res, func) {

    class MainHandler {
        constructor() {

            // элементы в dom
            this.elem = {};

            // массив для элементов
            this.numbersUI = [];

            // минимальное и максимальное число в массиве
            this.minmax = {
                min: 10000,
                max: -10000
            };
        }

        /**
         * Авто прокрутка к элементу
         * @param elem
         */
        scroll(elem) {
            let currentPos = window.scrollX;
            let elementPos = Math.ceil(elem.getBoundingClientRect().left);
            let quarterScreenWidth = window.screen.width / 4;
            window.scrollTo({
                left: currentPos + elementPos - quarterScreenWidth,
                behavior: "smooth"
            });

        }

        /**
         * Добавление числа в массив
         * @param number
         */
        addNumber(number) {
            if ((number !== "")) {
                this.numbersUI.push(func.insertElement(
                    'div',
                    this.elem.numbers,
                    'number',
                    `<span class="number__text">${number}</span>`
                ));
                this.minmax = res.resizeNumber(number, this.minmax, this.numbersUI);
                this.scroll(this.numbersUI[this.numbersUI.length - 1]);
            }
        }

        /**
         * Удаление всех чисел из массива
         */
        deleteNumbers() {
            this.numbersUI.forEach((item) => {
                this.destroy(item);
            });
            this.numbersUI = [];
            this.minmax = {
                min: 10000,
                max: -10000
            };
        }

        /**
         * Генерация рандомных чисел
         * @param count - кол-во чисел
         * @param max - максимально генерируемое число
         */
        randomNumbers(count, max) {
            this.elem.numbers.innerHTML = "";
            this.numbersUI = [];
            this.minmax = {
                min: 10000,
                max: -10000
            };
            for (let i = 0; i < count; i++) {
                let number = 2 + func.random(max);
                this.numbersUI[i] = func.insertElement(
                    'div',
                    this.elem.numbers,
                    'number',
                    `<span class="number__text">${number}</span>`
                );
                this.minmax = res.resizeNumber(number, this.minmax, this.numbersUI);
                this.scroll(this.numbersUI[i]);
            }
        }

        /**
         * Информация о ходе сортировки
         * @param message
         */
        infrom(message) {
            this.infromator.firstChild.innerText = message;
        }

        /**
         * Удаление элемента с анимацией
         * @param elem - элемент
         * @returns {Promise<void>}
         */
        async destroy(elem) {
            if (elem !== null) {
                elem.classList.add('destroy');
                await func.sleep(300);
                elem.remove();
            }
        }

        /**
         * Задание необходимых элементов
         */
        init() {
            this.elem.numbers = document.querySelector(".numbers");
            this.elem.controls = document.querySelector('.controls');
        }

        /**
         * Начало сортировки
         * @param delay - скорость сортировки
         * @returns {Promise<void>}
         */
        async startBubble(delay) {
            if (this.numbersUI.length > 1) { // проверка на кол-во чисел, начинаем сортировку, если чисел больше 1

                // прячем элементы управления
                this.elem.controls.classList.add('destroy');

                // удаляем popup
                this.destroy(document.querySelector('.popup'));

                // записываем исходный массив в сторку
                let unsortedArray = "";
                this.numbersUI.forEach((item, i) => {
                    unsortedArray += `${item.firstChild.innerText} `;
                });

                // Создаем popup с информацией о ходе сортировки
                this.infromator = func.insertElement(
                    'div',
                    document.body,
                    'popup informator',
                    `<p class="popup__title"></p>`
                );
                this.infrom("Начнинаем!");

                await func.sleep(delay);

                let k = this.numbersUI.length;

                // сортировка
                while (k !== 1) {
                    k--;
                    for (let i = 1; i <= k; i++) {
                        let firstNum = parseInt(this.numbersUI[i - 1].firstChild.innerText);
                        let secondNum = parseInt(this.numbersUI[i].firstChild.innerText);

                        this.infrom(`Проверяем числа ${firstNum} и ${secondNum}`);

                        // двигаем полосу прокрутки к текущему элементу
                        this.scroll(this.numbersUI[i - 1]);

                        // меняем цвет рассматриваемых чисел
                        this.numbersUI[i - 1].classList.add('inspect');
                        this.numbersUI[i].classList.add('inspect');

                        // отступы
                        let padding = {
                            curr: parseFloat(this.numbersUI[i].style.padding),
                            prev: parseFloat(this.numbersUI[i - 1].style.padding)
                        };

                        if (secondNum > firstNum) { // если число справа больше, то возвращаем цвет и переходим к следующим числам
                            this.infrom(`Число ${firstNum} меньше чем ${secondNum}.\nПереходим к следующим числам.`);
                            await func.sleep(delay + delay);
                            this.numbersUI[i - 1].classList.remove('inspect');
                            this.numbersUI[i].classList.remove('inspect');
                            continue;
                        }

                        this.infrom(`Число ${firstNum} больше чем ${secondNum}.\nПроизводим замену и переходим к следующим числам`);

                        await func.sleep(delay);

                        // меняем цвет у левого числа
                        this.numbersUI[i - 1].setAttribute('style', `padding:${padding.prev}px;background-color: #5CFF29;`);

                        await func.sleep(delay + (delay / 2));

                        // анимация перестановки чисел
                        this.numbersUI[i].setAttribute('style', `padding:${padding.curr}px; transform: translate(-${40 + padding.prev * 2}px, 0px); background-color: #d7dd3b; transition: transform ${delay}ms`);
                        this.numbersUI[i - 1].setAttribute('style', `padding:${padding.prev}px; transform: translate(${40 + padding.curr * 2}px, 0px);background-color: #5CFF29; transition: transform ${delay}ms`);

                        await func.sleep(delay + (delay / 2));

                        // переставляем местами элементы в dom
                        this.numbersUI[i].after(this.numbersUI[i - 1]);

                        // переставляем местами элементы в массиве
                        [this.numbersUI[i - 1], this.numbersUI[i]] = [this.numbersUI[i], this.numbersUI[i - 1]];

                        // возвращаем цвет и отступы рассматриваемых чисел
                        this.numbersUI[i - 1].classList.remove('inspect');
                        this.numbersUI[i].classList.remove('inspect');
                        this.numbersUI[i].setAttribute("style", `padding:${padding.prev}px;`);
                        this.numbersUI[i - 1].setAttribute("style", `padding:${padding.curr}px;`);
                    }
                    this.infrom(`Переходим к началу`);
                    await func.sleep(delay);
                }
                this.infrom(`Сортировка окончена!\nНачальный массив: ${unsortedArray}`);

                // возвращаем кнопки
                this.elem.controls.classList.remove('destroy');
            }
        }

    }

    const init = new MainHandler();
    return init;

});
