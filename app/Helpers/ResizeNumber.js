/**
 *  Функция меняющая размер элемента с числом
 */

define('app/Helpers/ResizeNumber.js', function () {

    return {

        /**
         * Изменение размера элемента с числом
         * @param number - число
         * @param minmax - минимальное и максимальное число в массиве
         * @param arrayNumberUI - массив с элементами
         * @returns {*} - возвращает новое минимальное и максимальное число
         */
        resizeNumber: function (number, minmax, arrayNumberUI) {
            function resizeAll() {
                arrayNumberUI.forEach((step) => {
                    let num = parseInt(step.firstChild.innerText);
                    resize(num, step);
                });
            }
            function resize(num, elem) {
                let step = (Math.abs(minmax.min)+num)/(minmax.max+Math.abs(minmax.min))*160+10;
                elem.style.padding = `${step}px`;
            }
            number = parseInt(number);
            if(number<minmax.min) {
                minmax.min = number;
                resizeAll();
            }
            if(number>minmax.max) {
                minmax.max = number;
                resizeAll();
            } else {
                resize(number, arrayNumberUI[arrayNumberUI.length-1]);
            }
            return minmax;
        }
    }
});