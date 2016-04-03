'use strict';

var appUrl = window.location.origin;
var ajaxFunctions = {
   ready: function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   },
   ajaxRequest: function ajaxRequest (method, url, data, callback) {
      var xmlhttp = new XMLHttpRequest();
      
      var args = [].slice.call(arguments);
      args = args.filter(function (val) {
        return val !== undefined;
      });
      
      method = args.shift();
      url = args.shift();
      callback = args.pop();

      data = args.length > 0 ? args.shift() : null; 

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback && callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      data && xmlhttp.setRequestHeader('Content-Type', 'application/json');
      xmlhttp.send(JSON.stringify(data));
   }
};