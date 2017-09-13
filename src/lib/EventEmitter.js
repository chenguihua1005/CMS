;(function () {
  'use strict';

  var EventEmitter = function () {
    this.__z_e_listeners = {};
  };
  EventEmitter.prototype.on = function (evt, handler, context) {
    var handlers = this.__z_e_listeners[evt];
    if (handlers === undefined) {
      handlers = [];
      this.__z_e_listeners[evt] = handlers;
    }
    var item = {
      handler: handler,
      context: context
    };
    handlers.push(item);
    return item;
  };
  EventEmitter.prototype.off = function (evt, handler, context) {
    var handlers = this.__z_e_listeners[evt];
    if (handlers !== undefined) {
      var size = handlers.length;
      for (var i = 0; i < size; i++) {
        var item = handlers[i];
        if (item.handler === handler && item.context === context) {
          handlers.splice(i, 1);
          return;
        }
      }
    }
  };
  EventEmitter.prototype.emit = function (type, event) {
    var hanlders = this.__z_e_listeners[type];
    if (hanlders !== undefined) {
      var size = hanlders.length;
      for (var i = 0; i < size; i++) {
        var ef = hanlders[i];
        var handler = ef.handler;
        var context = ef.context;
        handler.apply(context, [event]);
      }
    }
  };


  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

    // AMD. Register as an anonymous module.
    define(function() {
      return EventEmitter;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports.EventEmitter = EventEmitter;
  } else {
    window.EventEmitter = EventEmitter;
  }
}());
