!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(n=n||self).debounceAsync=e()}(this,(function(){"use strict";function n(){}function e(n){return new Promise((function(e){e(n())}))}return function(t,o,u){var i,r,f,c,s=Promise.resolve(),m=function(e){s=s.then(e).catch(n)},d=function(){var n=e((function(){return t.apply(i,r)}));return c(n),n},l=n,a=function(){return new Promise((function(n){var e=setTimeout(n,o);l=function(){clearTimeout(e),e=setTimeout(n,o)}}))};return function(){for(var n=this,t=[],o=arguments.length;o--;)t[o]=arguments[o];return e((function(){return i=n,r=t,l(),f||(f=new Promise((function(n){c=n})),u?(m(d),m(a)):(m(a),m(d)),m((function(){f=null}))),f}))}}}));