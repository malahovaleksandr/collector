'use strict';

// Избегаем конфликтов jquery и angular
$.noConflict();

// Тестовое приложение на angular
var about = require('about');


jQuery(function () {
  // Поддрежка svg спрайтов в отсталых браузерах :)
  svg4everybody();

  about();


});