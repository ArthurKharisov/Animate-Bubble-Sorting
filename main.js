'use strict';
requirejs(['app/Controllers/MainPage.js'], function (Page) {
    let page = new Page();
    document.body.innerHTML = page;
    page.afterRender();
});