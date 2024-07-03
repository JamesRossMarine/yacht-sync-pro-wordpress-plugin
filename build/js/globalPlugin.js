"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
* simplePagination.js v1.6
* A simple jQuery pagination plugin.
* http://flaviusmatis.github.com/simplePagination.js/
*
* Copyright 2012, Flavius Matis
* Released under the MIT license.
* http://flaviusmatis.github.com/license.html
*/

(function ($) {
  var methods = {
    init: function init(options) {
      var o = $.extend({
        items: 1,
        itemsOnPage: 1,
        pages: 0,
        displayedPages: 5,
        edges: 2,
        currentPage: 0,
        useAnchors: true,
        hrefTextPrefix: '#page-',
        hrefTextSuffix: '',
        prevText: 'Prev',
        nextText: 'Next',
        ellipseText: '&hellip;',
        ellipsePageSet: true,
        cssStyle: 'light-theme',
        listStyle: '',
        labelMap: [],
        selectOnClick: true,
        nextAtFront: false,
        invertPageOrder: false,
        useStartEdge: true,
        useEndEdge: true,
        onPageClick: function onPageClick(pageNumber, event) {
          // Callback triggered when a page is clicked
          // Page number is given as an optional parameter
        },
        onInit: function onInit() {
          // Callback triggered immediately after initialization
        }
      }, options || {});
      var self = this;
      o.pages = o.pages ? o.pages : Math.ceil(o.items / o.itemsOnPage) ? Math.ceil(o.items / o.itemsOnPage) : 1;
      if (o.currentPage) o.currentPage = o.currentPage - 1;else o.currentPage = !o.invertPageOrder ? 0 : o.pages - 1;
      o.halfDisplayed = o.displayedPages / 2;
      this.each(function () {
        self.addClass(o.cssStyle + ' simple-pagination').data('pagination', o);
        methods._draw.call(self);
      });
      o.onInit();
      return this;
    },
    selectPage: function selectPage(page) {
      methods._selectPage.call(this, page - 1);
      return this;
    },
    prevPage: function prevPage() {
      var o = this.data('pagination');
      if (!o.invertPageOrder) {
        if (o.currentPage > 0) {
          methods._selectPage.call(this, o.currentPage - 1);
        }
      } else {
        if (o.currentPage < o.pages - 1) {
          methods._selectPage.call(this, o.currentPage + 1);
        }
      }
      return this;
    },
    nextPage: function nextPage() {
      var o = this.data('pagination');
      if (!o.invertPageOrder) {
        if (o.currentPage < o.pages - 1) {
          methods._selectPage.call(this, o.currentPage + 1);
        }
      } else {
        if (o.currentPage > 0) {
          methods._selectPage.call(this, o.currentPage - 1);
        }
      }
      return this;
    },
    getPagesCount: function getPagesCount() {
      return this.data('pagination').pages;
    },
    setPagesCount: function setPagesCount(count) {
      this.data('pagination').pages = count;
    },
    getCurrentPage: function getCurrentPage() {
      return this.data('pagination').currentPage + 1;
    },
    destroy: function destroy() {
      this.empty();
      return this;
    },
    drawPage: function drawPage(page) {
      var o = this.data('pagination');
      o.currentPage = page - 1;
      this.data('pagination', o);
      methods._draw.call(this);
      return this;
    },
    redraw: function redraw() {
      methods._draw.call(this);
      return this;
    },
    disable: function disable() {
      var o = this.data('pagination');
      o.disabled = true;
      this.data('pagination', o);
      methods._draw.call(this);
      return this;
    },
    enable: function enable() {
      var o = this.data('pagination');
      o.disabled = false;
      this.data('pagination', o);
      methods._draw.call(this);
      return this;
    },
    updateItems: function updateItems(newItems) {
      var o = this.data('pagination');
      o.items = newItems;
      o.pages = methods._getPages(o);
      this.data('pagination', o);
      methods._draw.call(this);
    },
    updateItemsOnPage: function updateItemsOnPage(itemsOnPage) {
      var o = this.data('pagination');
      o.itemsOnPage = itemsOnPage;
      o.pages = methods._getPages(o);
      this.data('pagination', o);
      methods._selectPage.call(this, 0);
      return this;
    },
    getItemsOnPage: function getItemsOnPage() {
      return this.data('pagination').itemsOnPage;
    },
    _draw: function _draw() {
      var o = this.data('pagination'),
        interval = methods._getInterval(o),
        i,
        tagName;
      methods.destroy.call(this);
      tagName = typeof this.prop === 'function' ? this.prop('tagName') : this.attr('tagName');
      var $panel = tagName === 'UL' ? this : $('<ul' + (o.listStyle ? ' class="' + o.listStyle + '"' : '') + '></ul>').appendTo(this);

      // Generate Prev link
      if (o.prevText) {
        methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage - 1 : o.currentPage + 1, {
          text: o.prevText,
          classes: 'prev'
        });
      }

      // Generate Next link (if option set for at front)
      if (o.nextText && o.nextAtFront) {
        methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage + 1 : o.currentPage - 1, {
          text: o.nextText,
          classes: 'next'
        });
      }

      // Generate start edges
      if (!o.invertPageOrder) {
        if (interval.start > 0 && o.edges > 0) {
          if (o.useStartEdge) {
            var end = Math.min(o.edges, interval.start);
            for (i = 0; i < end; i++) {
              methods._appendItem.call(this, i);
            }
          }
          if (o.edges < interval.start && interval.start - o.edges != 1) {
            $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
          } else if (interval.start - o.edges == 1) {
            methods._appendItem.call(this, o.edges);
          }
        }
      } else {
        if (interval.end < o.pages && o.edges > 0) {
          if (o.useStartEdge) {
            var begin = Math.max(o.pages - o.edges, interval.end);
            for (i = o.pages - 1; i >= begin; i--) {
              methods._appendItem.call(this, i);
            }
          }
          if (o.pages - o.edges > interval.end && o.pages - o.edges - interval.end != 1) {
            $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
          } else if (o.pages - o.edges - interval.end == 1) {
            methods._appendItem.call(this, interval.end);
          }
        }
      }

      // Generate interval links
      if (!o.invertPageOrder) {
        for (i = interval.start; i < interval.end; i++) {
          methods._appendItem.call(this, i);
        }
      } else {
        for (i = interval.end - 1; i >= interval.start; i--) {
          methods._appendItem.call(this, i);
        }
      }

      // Generate end edges
      if (!o.invertPageOrder) {
        if (interval.end < o.pages && o.edges > 0) {
          if (o.pages - o.edges > interval.end && o.pages - o.edges - interval.end != 1) {
            $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
          } else if (o.pages - o.edges - interval.end == 1) {
            methods._appendItem.call(this, interval.end);
          }
          if (o.useEndEdge) {
            var begin = Math.max(o.pages - o.edges, interval.end);
            for (i = begin; i < o.pages; i++) {
              methods._appendItem.call(this, i);
            }
          }
        }
      } else {
        if (interval.start > 0 && o.edges > 0) {
          if (o.edges < interval.start && interval.start - o.edges != 1) {
            $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
          } else if (interval.start - o.edges == 1) {
            methods._appendItem.call(this, o.edges);
          }
          if (o.useEndEdge) {
            var end = Math.min(o.edges, interval.start);
            for (i = end - 1; i >= 0; i--) {
              methods._appendItem.call(this, i);
            }
          }
        }
      }

      // Generate Next link (unless option is set for at front)
      if (o.nextText && !o.nextAtFront) {
        methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage + 1 : o.currentPage - 1, {
          text: o.nextText,
          classes: 'next'
        });
      }
      if (o.ellipsePageSet && !o.disabled) {
        methods._ellipseClick.call(this, $panel);
      }
    },
    _getPages: function _getPages(o) {
      var pages = Math.ceil(o.items / o.itemsOnPage);
      return pages || 1;
    },
    _getInterval: function _getInterval(o) {
      return {
        start: Math.ceil(o.currentPage > o.halfDisplayed ? Math.max(Math.min(o.currentPage - o.halfDisplayed, o.pages - o.displayedPages), 0) : 0),
        end: Math.ceil(o.currentPage > o.halfDisplayed ? Math.min(o.currentPage + o.halfDisplayed, o.pages) : Math.min(o.displayedPages, o.pages))
      };
    },
    _appendItem: function _appendItem(pageIndex, opts) {
      var self = this,
        options,
        $link,
        o = self.data('pagination'),
        $linkWrapper = $('<li></li>'),
        $ul = self.find('ul');
      pageIndex = pageIndex < 0 ? 0 : pageIndex < o.pages ? pageIndex : o.pages - 1;
      options = {
        text: pageIndex + 1,
        classes: ''
      };
      if (o.labelMap.length && o.labelMap[pageIndex]) {
        options.text = o.labelMap[pageIndex];
      }
      options = $.extend(options, opts || {});
      if (pageIndex == o.currentPage || o.disabled) {
        if (o.disabled || options.classes === 'prev' || options.classes === 'next') {
          $linkWrapper.addClass('disabled');
        } else {
          $linkWrapper.addClass('active');
        }
        $link = $('<span class="current">' + options.text + '</span>');
      } else {
        if (o.useAnchors) {
          $link = $('<a href="' + o.hrefTextPrefix + (pageIndex + 1) + o.hrefTextSuffix + '" class="page-link">' + options.text + '</a>');
        } else {
          $link = $('<span >' + options.text + '</span>');
        }
        $link.click(function (event) {
          return methods._selectPage.call(self, pageIndex, event);
        });
      }
      if (options.classes) {
        $link.addClass(options.classes);
      }
      $linkWrapper.append($link);
      if ($ul.length) {
        $ul.append($linkWrapper);
      } else {
        self.append($linkWrapper);
      }
    },
    _selectPage: function _selectPage(pageIndex, event) {
      var o = this.data('pagination');
      o.currentPage = pageIndex;
      if (o.selectOnClick) {
        methods._draw.call(this);
      }
      return o.onPageClick(pageIndex + 1, event);
    },
    _ellipseClick: function _ellipseClick($panel) {
      var self = this,
        o = this.data('pagination'),
        $ellip = $panel.find('.ellipse');
      $ellip.addClass('clickable').parent().removeClass('disabled');
      $ellip.click(function (event) {
        if (!o.disable) {
          var $this = $(this),
            val = (parseInt($this.parent().prev().text(), 10) || 0) + 1;
          $this.html('<input type="number" min="1" max="' + o.pages + '" step="1" value="' + val + '">').find('input').focus().click(function (event) {
            // prevent input number arrows from bubbling a click event on $ellip
            event.stopPropagation();
          }).keyup(function (event) {
            var val = $(this).val();
            if (event.which === 13 && val !== '') {
              // enter to accept
              if (val > 0 && val <= o.pages) methods._selectPage.call(self, val - 1);
            } else if (event.which === 27) {
              // escape to cancel
              $ellip.empty().html(o.ellipseText);
            }
          }).bind('blur', function (event) {
            var val = $(this).val();
            if (val !== '') {
              methods._selectPage.call(self, val - 1);
            }
            $ellip.empty().html(o.ellipseText);
            return false;
          });
        }
        return false;
      });
    }
  };
  $.fn.pagination = function (method) {
    // Method calling logic
    if (methods[method] && method.charAt(0) != '_') {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (_typeof(method) === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.pagination');
    }
  };
})(jQuery);
/*
    A simple jQuery modal (http://github.com/kylefox/jquery-modal)
    Version 0.9.2
*/

(function (factory) {
  // Making your jQuery plugin work better with npm tools
  // http://blog.npmjs.org/post/112712169830/making-your-jquery-plugin-work-better-with-npm
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    factory(require("jquery"), window, document);
  } else {
    factory(jQuery, window, document);
  }
})(function ($, window, document, undefined) {
  var modals = [],
    getCurrent = function getCurrent() {
      return modals.length ? modals[modals.length - 1] : null;
    },
    selectCurrent = function selectCurrent() {
      var i,
        selected = false;
      for (i = modals.length - 1; i >= 0; i--) {
        if (modals[i].$blocker) {
          modals[i].$blocker.toggleClass('current', !selected).toggleClass('behind', selected);
          selected = true;
        }
      }
    };
  $.ysp_modal = function (el, options) {
    var remove, target;
    this.$body = $('body');
    this.options = $.extend({}, $.ysp_modal.defaults, options);
    this.options.doFade = !isNaN(parseInt(this.options.fadeDuration, 10));
    this.$blocker = null;
    if (this.options.closeExisting) while ($.ysp_modal.isActive()) $.ysp_modal.close(); // Close any open modals.
    modals.push(this);
    if (el.is('a')) {
      target = el.attr('href');
      this.anchor = el;
      //Select element by id from href
      if (/^#/.test(target)) {
        this.$elm = $(target);
        if (this.$elm.length !== 1) return null;
        this.$body.append(this.$elm);
        this.open();
        //AJAX
      } else {
        this.$elm = $('<div>');
        this.$body.append(this.$elm);
        remove = function remove(event, modal) {
          modal.elm.remove();
        };
        this.showSpinner();
        el.trigger($.ysp_modal.AJAX_SEND);
        $.get(target).done(function (html) {
          if (!$.ysp_modal.isActive()) return;
          el.trigger($.ysp_modal.AJAX_SUCCESS);
          var current = getCurrent();
          current.$elm.empty().append(html).on($.ysp_modal.CLOSE, remove);
          current.hideSpinner();
          current.open();
          el.trigger($.ysp_modal.AJAX_COMPLETE);
        }).fail(function () {
          el.trigger($.ysp_modal.AJAX_FAIL);
          var current = getCurrent();
          current.hideSpinner();
          modals.pop(); // remove expected modal from the list
          el.trigger($.ysp_modal.AJAX_COMPLETE);
        });
      }
    } else {
      this.$elm = el;
      this.anchor = el;
      this.$body.append(this.$elm);
      this.open();
    }
  };
  $.ysp_modal.prototype = {
    constructor: $.ysp_modal,
    open: function open() {
      var m = this;
      this.block();
      this.anchor.blur();
      if (this.options.doFade) {
        setTimeout(function () {
          m.show();
        }, this.options.fadeDuration * this.options.fadeDelay);
      } else {
        this.show();
      }
      $(document).off('keydown.modal').on('keydown.modal', function (event) {
        var current = getCurrent();
        if (event.which === 27 && current.options.escapeClose) current.close();
      });
      if (this.options.clickClose) this.$blocker.click(function (e) {
        if (e.target === this) $.ysp_modal.close();
      });
    },
    close: function close() {
      modals.pop();
      this.unblock();
      this.hide();
      if (!$.ysp_modal.isActive()) $(document).off('keydown.modal');
    },
    block: function block() {
      this.$elm.trigger($.ysp_modal.BEFORE_BLOCK, [this._ctx()]);
      this.$body.css('overflow', 'hidden');
      this.$blocker = $('<div class="' + this.options.blockerClass + ' blocker current"></div>').appendTo(this.$body);
      selectCurrent();
      if (this.options.doFade) {
        this.$blocker.css('opacity', 0).animate({
          opacity: 1
        }, this.options.fadeDuration);
      }
      this.$elm.trigger($.ysp_modal.BLOCK, [this._ctx()]);
    },
    unblock: function unblock(now) {
      if (!now && this.options.doFade) this.$blocker.fadeOut(this.options.fadeDuration, this.unblock.bind(this, true));else {
        this.$blocker.children().appendTo(this.$body);
        this.$blocker.remove();
        this.$blocker = null;
        selectCurrent();
        if (!$.ysp_modal.isActive()) this.$body.css('overflow', '');
      }
    },
    show: function show() {
      this.$elm.trigger($.ysp_modal.BEFORE_OPEN, [this._ctx()]);
      if (this.options.showClose) {
        this.closeButton = $('<a href="#close-modal" rel="modal:close" class="close-modal ' + this.options.closeClass + '">' + this.options.closeText + '</a>');
        this.$elm.append(this.closeButton);
      }
      this.$elm.addClass(this.options.modalClass).appendTo(this.$blocker);
      if (this.options.doFade) {
        this.$elm.css({
          opacity: 0,
          display: 'inline-block'
        }).animate({
          opacity: 1
        }, this.options.fadeDuration);
      } else {
        this.$elm.css('display', 'inline-block');
      }
      this.$elm.trigger($.ysp_modal.OPEN, [this._ctx()]);
    },
    hide: function hide() {
      this.$elm.trigger($.ysp_modal.BEFORE_CLOSE, [this._ctx()]);
      if (this.closeButton) this.closeButton.remove();
      var _this = this;
      if (this.options.doFade) {
        this.$elm.fadeOut(this.options.fadeDuration, function () {
          _this.$elm.trigger($.ysp_modal.AFTER_CLOSE, [_this._ctx()]);
        });
      } else {
        this.$elm.hide(0, function () {
          _this.$elm.trigger($.ysp_modal.AFTER_CLOSE, [_this._ctx()]);
        });
      }
      this.$elm.trigger($.ysp_modal.CLOSE, [this._ctx()]);
    },
    showSpinner: function showSpinner() {
      if (!this.options.showSpinner) return;
      this.spinner = this.spinner || $('<div class="' + this.options.modalClass + '-spinner"></div>').append(this.options.spinnerHtml);
      this.$body.append(this.spinner);
      this.spinner.show();
    },
    hideSpinner: function hideSpinner() {
      if (this.spinner) this.spinner.remove();
    },
    //Return context for custom events
    _ctx: function _ctx() {
      return {
        elm: this.$elm,
        $elm: this.$elm,
        $blocker: this.$blocker,
        options: this.options,
        $anchor: this.anchor
      };
    }
  };
  $.ysp_modal.close = function (event) {
    if (!$.ysp_modal.isActive()) return;
    if (event) event.preventDefault();
    var current = getCurrent();
    current.close();
    return current.$elm;
  };

  // Returns if there currently is an active modal
  $.ysp_modal.isActive = function () {
    return modals.length > 0;
  };
  $.ysp_modal.getCurrent = getCurrent;
  $.ysp_modal.defaults = {
    closeExisting: true,
    escapeClose: true,
    clickClose: true,
    closeText: 'Close',
    closeClass: '',
    modalClass: "ysp-modal",
    blockerClass: "jquery-modal",
    spinnerHtml: '<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div>',
    showSpinner: true,
    showClose: true,
    fadeDuration: null,
    // Number of milliseconds the fade animation takes.
    fadeDelay: 1.0 // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
  };

  // Event constants
  $.ysp_modal.BEFORE_BLOCK = 'modal:before-block';
  $.ysp_modal.BLOCK = 'modal:block';
  $.ysp_modal.BEFORE_OPEN = 'modal:before-open';
  $.ysp_modal.OPEN = 'modal:open';
  $.ysp_modal.BEFORE_CLOSE = 'modal:before-close';
  $.ysp_modal.CLOSE = 'modal:close';
  $.ysp_modal.AFTER_CLOSE = 'modal:after-close';
  $.ysp_modal.AJAX_SEND = 'modal:ajax:send';
  $.ysp_modal.AJAX_SUCCESS = 'modal:ajax:success';
  $.ysp_modal.AJAX_FAIL = 'modal:ajax:fail';
  $.ysp_modal.AJAX_COMPLETE = 'modal:ajax:complete';
  $.fn.ysp_modal = function (options) {
    if (this.length === 1) {
      new $.ysp_modal(this, options);
    }
    return this;
  };

  // Automatically bind links with rel="modal:close" to, well, close the modal.
  $(document).on('click.modal', 'a[rel~="modal:close"]', $.ysp_modal.close);
  $(document).on('click.modal', 'a[rel~="modal:open"]', function (event) {
    event.preventDefault();
    $(this).modal();
  });
});
!function (e, t) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module))) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    var n = t();
    for (var o in n) ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports : e)[o] = n[o];
  }
}(window, function () {
  return function (e) {
    var t = {};
    function n(o) {
      if (t[o]) return t[o].exports;
      var i = t[o] = {
        i: o,
        l: !1,
        exports: {}
      };
      return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
    }
    return n.m = e, n.c = t, n.d = function (e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: o
      });
    }, n.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }, n.t = function (e, t) {
      if (1 & t && (e = n(e)), 8 & t) return e;
      if (4 & t && "object" == _typeof(e) && e && e.__esModule) return e;
      var o = Object.create(null);
      if (n.r(o), Object.defineProperty(o, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e) for (var i in e) n.d(o, i, function (t) {
        return e[t];
      }.bind(null, i));
      return o;
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e["default"];
      } : function () {
        return e;
      };
      return n.d(t, "a", t), t;
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 0);
  }([function (e, t, n) {
    "use strict";

    n.r(t);
    var o,
      i = "fslightbox-",
      r = "".concat(i, "styles"),
      s = "".concat(i, "cursor-grabbing"),
      a = "".concat(i, "full-dimension"),
      c = "".concat(i, "flex-centered"),
      l = "".concat(i, "open"),
      u = "".concat(i, "transform-transition"),
      d = "".concat(i, "absoluted"),
      f = "".concat(i, "slide-btn"),
      p = "".concat(f, "-container"),
      h = "".concat(i, "fade-in"),
      m = "".concat(i, "fade-out"),
      g = h + "-strong",
      v = m + "-strong",
      b = "".concat(i, "opacity-"),
      x = "".concat(b, "1"),
      y = "".concat(i, "source");
    function w(e) {
      return (w = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
      })(e);
    }
    function S(e) {
      var t = e.stageIndexes,
        n = e.core.stageManager,
        o = e.props.sources.length - 1;
      n.getPreviousSlideIndex = function () {
        return 0 === t.current ? o : t.current - 1;
      }, n.getNextSlideIndex = function () {
        return t.current === o ? 0 : t.current + 1;
      }, n.updateStageIndexes = 0 === o ? function () {} : 1 === o ? function () {
        0 === t.current ? (t.next = 1, delete t.previous) : (t.previous = 0, delete t.next);
      } : function () {
        t.previous = n.getPreviousSlideIndex(), t.next = n.getNextSlideIndex();
      }, n.i = o <= 2 ? function () {
        return !0;
      } : function (e) {
        var n = t.current;
        if (0 === n && e === o || n === o && 0 === e) return !0;
        var i = n - e;
        return -1 === i || 0 === i || 1 === i;
      };
    }
    "object" === ("undefined" == typeof document ? "undefined" : w(document)) && ((o = document.createElement("style")).className = r, o.appendChild(document.createTextNode(".fslightbox-absoluted{position:absolute;top:0;left:0}.fslightbox-fade-in{animation:fslightbox-fade-in .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out{animation:fslightbox-fade-out .3s ease}.fslightbox-fade-in-strong{animation:fslightbox-fade-in-strong .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out-strong{animation:fslightbox-fade-out-strong .3s ease}@keyframes fslightbox-fade-in{from{opacity:.65}to{opacity:1}}@keyframes fslightbox-fade-out{from{opacity:.35}to{opacity:0}}@keyframes fslightbox-fade-in-strong{from{opacity:.3}to{opacity:1}}@keyframes fslightbox-fade-out-strong{from{opacity:1}to{opacity:0}}.fslightbox-cursor-grabbing{cursor:grabbing}.fslightbox-full-dimension{width:100%;height:100%}.fslightbox-open{overflow:hidden;height:100%}.fslightbox-flex-centered{display:flex;justify-content:center;align-items:center}.fslightbox-opacity-0{opacity:0!important}.fslightbox-opacity-1{opacity:1!important}.fslightbox-scrollbarfix{padding-right:17px}.fslightbox-transform-transition{transition:transform .3s}.fslightbox-container{font-family:Arial,sans-serif;position:fixed;top:0;left:0;background:linear-gradient(rgba(30,30,30,.9),#000 1810%);touch-action:pinch-zoom;z-index:1000000000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.fslightbox-container *{box-sizing:border-box}.fslightbox-svg-path{transition:fill .15s ease;fill:#ddd}.fslightbox-nav{height:45px;width:100%;position:absolute;top:0;left:0}.fslightbox-slide-number-container{display:flex;justify-content:center;align-items:center;position:relative;height:100%;font-size:15px;color:#d7d7d7;z-index:0;max-width:55px;text-align:left}.fslightbox-slide-number-container .fslightbox-flex-centered{height:100%}.fslightbox-slash{display:block;margin:0 5px;width:1px;height:12px;transform:rotate(15deg);background:#fff}.fslightbox-toolbar{position:absolute;z-index:3;right:0;top:0;height:100%;display:flex;background:rgba(35,35,35,.65)}.fslightbox-toolbar-button{height:100%;width:45px;cursor:pointer}.fslightbox-toolbar-button:hover .fslightbox-svg-path{fill:#fff}.fslightbox-slide-btn-container{display:flex;align-items:center;padding:12px 12px 12px 6px;position:absolute;top:50%;cursor:pointer;z-index:3;transform:translateY(-50%)}@media (min-width:476px){.fslightbox-slide-btn-container{padding:22px 22px 22px 6px}}@media (min-width:768px){.fslightbox-slide-btn-container{padding:30px 30px 30px 6px}}.fslightbox-slide-btn-container:hover .fslightbox-svg-path{fill:#f1f1f1}.fslightbox-slide-btn{padding:9px;font-size:26px;background:rgba(35,35,35,.65)}@media (min-width:768px){.fslightbox-slide-btn{padding:10px}}@media (min-width:1600px){.fslightbox-slide-btn{padding:11px}}.fslightbox-slide-btn-container-previous{left:0}@media (max-width:475.99px){.fslightbox-slide-btn-container-previous{padding-left:3px}}.fslightbox-slide-btn-container-next{right:0;padding-left:12px;padding-right:3px}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-left:22px}}@media (min-width:768px){.fslightbox-slide-btn-container-next{padding-left:30px}}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-right:6px}}.fslightbox-down-event-detector{position:absolute;z-index:1}.fslightbox-slide-swiping-hoverer{z-index:4}.fslightbox-invalid-file-wrapper{font-size:22px;color:#eaebeb;margin:auto}.fslightbox-video{object-fit:cover}.fslightbox-youtube-iframe{border:0}.fslightboxl{display:block;margin:auto;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:67px;height:67px}.fslightboxl div{box-sizing:border-box;display:block;position:absolute;width:54px;height:54px;margin:6px;border:5px solid;border-color:#999 transparent transparent transparent;border-radius:50%;animation:fslightboxl 1.2s cubic-bezier(.5,0,.5,1) infinite}.fslightboxl div:nth-child(1){animation-delay:-.45s}.fslightboxl div:nth-child(2){animation-delay:-.3s}.fslightboxl div:nth-child(3){animation-delay:-.15s}@keyframes fslightboxl{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.fslightbox-source{position:relative;z-index:2;opacity:0}")), document.head.appendChild(o));
    function L(e) {
      var t,
        n = e.props,
        o = 0,
        i = {};
      this.getSourceTypeFromLocalStorageByUrl = function (e) {
        return t[e] ? t[e] : r(e);
      }, this.handleReceivedSourceTypeForUrl = function (e, n) {
        if (!1 === i[n] && (o--, "invalid" !== e ? i[n] = e : delete i[n], 0 === o)) {
          !function (e, t) {
            for (var n in t) e[n] = t[n];
          }(t, i);
          try {
            localStorage.setItem("fslightbox-types", JSON.stringify(t));
          } catch (e) {}
        }
      };
      var r = function r(e) {
        o++, i[e] = !1;
      };
      if (n.disableLocalStorage) this.getSourceTypeFromLocalStorageByUrl = function () {}, this.handleReceivedSourceTypeForUrl = function () {};else {
        try {
          t = JSON.parse(localStorage.getItem("fslightbox-types"));
        } catch (e) {}
        t || (t = {}, this.getSourceTypeFromLocalStorageByUrl = r);
      }
    }
    function A(e, t, n, o) {
      var i = e.data,
        r = e.elements.sources,
        s = n / o,
        a = 0;
      this.adjustSize = function () {
        if ((a = i.maxSourceWidth / s) < i.maxSourceHeight) return n < i.maxSourceWidth && (a = o), c();
        a = o > i.maxSourceHeight ? i.maxSourceHeight : o, c();
      };
      var c = function c() {
        r[t].style.width = a * s + "px", r[t].style.height = a + "px";
      };
    }
    function C(e, t) {
      var n = this,
        o = e.collections.sourceSizers,
        i = e.elements,
        r = i.sourceAnimationWrappers,
        s = i.sources,
        a = e.isl,
        c = e.resolve;
      function l(e, n) {
        o[t] = c(A, [t, e, n]), o[t].adjustSize();
      }
      this.runActions = function (e, o) {
        a[t] = !0, s[t].classList.add(x), r[t].classList.add(g), r[t].removeChild(r[t].firstChild), l(e, o), n.runActions = l;
      };
    }
    function E(e, t) {
      var n,
        o = this,
        i = e.elements.sources,
        r = e.props,
        s = (0, e.resolve)(C, [t]);
      this.handleImageLoad = function (e) {
        var t = e.target,
          n = t.naturalWidth,
          o = t.naturalHeight;
        s.runActions(n, o);
      }, this.handleVideoLoad = function (e) {
        var t = e.target,
          o = t.videoWidth,
          i = t.videoHeight;
        n = !0, s.runActions(o, i);
      }, this.handleNotMetaDatedVideoLoad = function () {
        n || o.handleYoutubeLoad();
      }, this.handleYoutubeLoad = function () {
        var e = 1920,
          t = 1080;
        r.maxYoutubeDimensions && (e = r.maxYoutubeDimensions.width, t = r.maxYoutubeDimensions.height), s.runActions(e, t);
      }, this.handleCustomLoad = function () {
        var e = i[t],
          n = e.offsetWidth,
          r = e.offsetHeight;
        n && r ? s.runActions(n, r) : setTimeout(o.handleCustomLoad);
      };
    }
    function F(e, t, n) {
      var o = e.elements.sources,
        i = e.props.customClasses,
        r = i[t] ? i[t] : "";
      o[t].className = n + " " + r;
    }
    function I(e, t) {
      var n = e.elements.sources,
        o = e.props.customAttributes;
      for (var i in o[t]) n[t].setAttribute(i, o[t][i]);
    }
    function T(e, t) {
      var n = e.collections.sourceLoadHandlers,
        o = e.elements,
        i = o.sources,
        r = o.sourceAnimationWrappers,
        s = e.props.sources;
      i[t] = document.createElement("img"), F(e, t, y), i[t].src = s[t], i[t].onload = n[t].handleImageLoad, I(e, t), r[t].appendChild(i[t]);
    }
    function N(e, t) {
      var n = e.collections.sourceLoadHandlers,
        o = e.elements,
        i = o.sources,
        r = o.sourceAnimationWrappers,
        s = e.props,
        a = s.sources,
        c = s.videosPosters;
      i[t] = document.createElement("video"), F(e, t, y), i[t].src = a[t], i[t].onloadedmetadata = function (e) {
        n[t].handleVideoLoad(e);
      }, i[t].controls = !0, I(e, t), c[t] && (i[t].poster = c[t]);
      var l = document.createElement("source");
      l.src = a[t], i[t].appendChild(l), setTimeout(n[t].handleNotMetaDatedVideoLoad, 3e3), r[t].appendChild(i[t]);
    }
    function z(e, t) {
      var n = e.collections.sourceLoadHandlers,
        o = e.elements,
        r = o.sources,
        s = o.sourceAnimationWrappers,
        a = e.props.sources;
      r[t] = document.createElement("iframe"), F(e, t, "".concat(y, " ").concat(i, "youtube-iframe"));
      var c = a[t],
        l = c.split("?")[1];
      r[t].src = "https://www.youtube.com/embed/".concat(c.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2], "?").concat(l || ""), r[t].allowFullscreen = !0, I(e, t), s[t].appendChild(r[t]), n[t].handleYoutubeLoad();
    }
    function P(e, t) {
      var n = e.collections.sourceLoadHandlers,
        o = e.elements,
        i = o.sources,
        r = o.sourceAnimationWrappers,
        s = e.props.sources;
      i[t] = s[t], F(e, t, "".concat(i[t].className, " ").concat(y)), r[t].appendChild(i[t]), n[t].handleCustomLoad();
    }
    function k(e, t) {
      var n = e.elements,
        o = n.sources,
        r = n.sourceAnimationWrappers;
      e.props.sources;
      o[t] = document.createElement("div"), o[t].className = "".concat(i, "invalid-file-wrapper ").concat(c), o[t].innerHTML = "Invalid source", r[t].classList.add(g), r[t].removeChild(r[t].firstChild), r[t].appendChild(o[t]);
    }
    function H(e) {
      var t = e.collections,
        n = t.sourceLoadHandlers,
        o = t.sourcesRenderFunctions,
        i = e.core.sourceDisplayFacade,
        r = e.resolve;
      this.runActionsForSourceTypeAndIndex = function (t, s) {
        var a;
        switch ("invalid" !== t && (n[s] = r(E, [s])), t) {
          case "image":
            a = T;
            break;
          case "video":
            a = N;
            break;
          case "youtube":
            a = z;
            break;
          case "custom":
            a = P;
            break;
          default:
            a = k;
        }
        o[s] = function () {
          return a(e, s);
        }, i.displaySourcesWhichShouldBeDisplayed();
      };
    }
    function W() {
      var e,
        t,
        n,
        o = {
          isUrlYoutubeOne: function isUrlYoutubeOne(e) {
            var t = document.createElement("a");
            return t.href = e, "www.youtube.com" === t.hostname || "youtu.be" === t.hostname;
          },
          getTypeFromResponseContentType: function getTypeFromResponseContentType(e) {
            return e.slice(0, e.indexOf("/"));
          }
        };
      function i() {
        if (4 !== n.readyState) {
          if (2 === n.readyState) {
            var e;
            switch (o.getTypeFromResponseContentType(n.getResponseHeader("content-type"))) {
              case "image":
                e = "image";
                break;
              case "video":
                e = "video";
                break;
              default:
                e = "invalid";
            }
            n.onreadystatechange = null, n.abort(), t(e);
          }
        } else t("invalid");
      }
      this.setUrlToCheck = function (t) {
        e = t;
      }, this.getSourceType = function (r) {
        if (o.isUrlYoutubeOne(e)) return r("youtube");
        t = r, (n = new XMLHttpRequest()).onreadystatechange = i, n.open("GET", e, !0), n.send();
      };
    }
    function R(e, t, n) {
      var o = e.props,
        i = o.types,
        r = o.type,
        s = o.sources,
        a = e.resolve;
      this.getTypeSetByClientForIndex = function (e) {
        var t;
        return i && i[e] ? t = i[e] : r && (t = r), t;
      }, this.retrieveTypeWithXhrForIndex = function (e) {
        var o = a(W);
        o.setUrlToCheck(s[e]), o.getSourceType(function (o) {
          t.handleReceivedSourceTypeForUrl(o, s[e]), n.runActionsForSourceTypeAndIndex(o, e);
        });
      };
    }
    function D(e, t) {
      var n = e.core.stageManager,
        o = e.elements,
        i = o.smw,
        r = o.sourceWrappersContainer,
        s = e.props,
        l = 0,
        f = document.createElement("div");
      function p(e) {
        f.style.transform = "translateX(".concat(e + l, "px)"), l = 0;
      }
      function h() {
        return (1 + s.slideDistance) * innerWidth;
      }
      f.className = "".concat(d, " ").concat(a, " ").concat(c), f.s = function () {
        f.style.display = "flex";
      }, f.h = function () {
        f.style.display = "none";
      }, f.a = function () {
        f.classList.add(u);
      }, f.d = function () {
        f.classList.remove(u);
      }, f.n = function () {
        f.style.removeProperty("transform");
      }, f.v = function (e) {
        return l = e, f;
      }, f.ne = function () {
        p(-h());
      }, f.z = function () {
        p(0);
      }, f.p = function () {
        p(h());
      }, n.i(t) || f.h(), i[t] = f, r.appendChild(f), function (e, t) {
        var n = e.elements,
          o = n.smw,
          i = n.sourceAnimationWrappers,
          r = document.createElement("div"),
          s = document.createElement("div");
        s.className = "fslightboxl";
        for (var a = 0; a < 3; a++) {
          var c = document.createElement("div");
          s.appendChild(c);
        }
        r.appendChild(s), o[t].appendChild(r), i[t] = r;
      }(e, t);
    }
    function O(e, t, n, o) {
      var r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      r.setAttributeNS(null, "width", t), r.setAttributeNS(null, "height", t), r.setAttributeNS(null, "viewBox", n);
      var s = document.createElementNS("http://www.w3.org/2000/svg", "path");
      return s.setAttributeNS(null, "class", "".concat(i, "svg-path")), s.setAttributeNS(null, "d", o), r.appendChild(s), e.appendChild(r), r;
    }
    function M(e, t) {
      var n = document.createElement("div");
      return n.className = "".concat(i, "toolbar-button ").concat(c), n.title = t, e.appendChild(n), n;
    }
    function j(e, t) {
      var n = document.createElement("div");
      n.className = "".concat(i, "toolbar"), t.appendChild(n), function (e, t) {
        var n = e.componentsServices,
          o = e.data,
          i = e.fs,
          r = "M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z",
          s = M(t);
        s.title = "Enter fullscreen";
        var a = O(s, "20px", "0 0 18 18", r);
        n.ofs = function () {
          o.ifs = !0, s.title = "Exit fullscreen", a.setAttributeNS(null, "width", "24px"), a.setAttributeNS(null, "height", "24px"), a.setAttributeNS(null, "viewBox", "0 0 950 1024"), a.firstChild.setAttributeNS(null, "d", "M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z");
        }, n.xfs = function () {
          o.ifs = !1, s.title = "Enter fullscreen", a.setAttributeNS(null, "width", "20px"), a.setAttributeNS(null, "height", "20px"), a.setAttributeNS(null, "viewBox", "0 0 18 18"), a.firstChild.setAttributeNS(null, "d", r);
        }, s.onclick = i.t;
      }(e, n), function (e, t) {
        var n = M(t, "Close");
        n.onclick = e.core.lightboxCloser.closeLightbox, O(n, "20px", "0 0 24 24", "M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z");
      }(e, n);
    }
    function X(e) {
      var t = e.props.sources,
        n = e.elements.container,
        o = document.createElement("div");
      o.className = "".concat(i, "nav"), n.appendChild(o), j(e, o), t.length > 1 && function (e, t) {
        var n = e.componentsServices,
          o = e.props.sources,
          r = (e.stageIndexes, document.createElement("div"));
        r.className = "".concat(i, "slide-number-container");
        var s = document.createElement("div");
        s.className = c;
        var a = document.createElement("span");
        n.setSlideNumber = function (e) {
          return a.innerHTML = e;
        };
        var l = document.createElement("span");
        l.className = "".concat(i, "slash");
        var u = document.createElement("div");
        u.innerHTML = o.length, r.appendChild(s), s.appendChild(a), s.appendChild(l), s.appendChild(u), t.appendChild(r), setTimeout(function () {
          s.offsetWidth > 55 && (r.style.justifyContent = "flex-start");
        });
      }(e, o);
    }
    function B(e, t, n, o) {
      var i = e.elements.container,
        r = n.charAt(0).toUpperCase() + n.slice(1),
        s = document.createElement("div");
      s.className = "".concat(p, " ").concat(p, "-").concat(n), s.title = "".concat(r, " slide"), s.onclick = t, function (e, t) {
        var n = document.createElement("div");
        n.className = "".concat(f, " ").concat(c), O(n, "20px", "0 0 20 20", t), e.appendChild(n);
      }(s, o), i.appendChild(s);
    }
    function U(e) {
      var t = e.core,
        n = t.lightboxCloser,
        o = t.slideChangeFacade,
        i = e.fs;
      this.listener = function (e) {
        switch (e.key) {
          case "Escape":
            n.closeLightbox();
            break;
          case "ArrowLeft":
            o.changeToPrevious();
            break;
          case "ArrowRight":
            o.changeToNext();
            break;
          case "F11":
            e.preventDefault(), i.t();
        }
      };
    }
    function q(e) {
      var t = e.elements,
        n = e.sourcePointerProps,
        o = e.stageIndexes;
      function i(e, o) {
        t.smw[e].v(n.swipedX)[o]();
      }
      this.runActionsForEvent = function (e) {
        var r, a, c;
        t.container.contains(t.slideSwipingHoverer) || t.container.appendChild(t.slideSwipingHoverer), r = t.container, a = s, (c = r.classList).contains(a) || c.add(a), n.swipedX = e.screenX - n.downScreenX;
        var l = o.previous,
          u = o.next;
        i(o.current, "z"), void 0 !== l && n.swipedX > 0 ? i(l, "ne") : void 0 !== u && n.swipedX < 0 && i(u, "p");
      };
    }
    function V(e) {
      var t = e.props.sources,
        n = e.resolve,
        o = e.sourcePointerProps,
        i = n(q);
      1 === t.length ? this.listener = function () {
        o.swipedX = 1;
      } : this.listener = function (e) {
        o.isPointering && i.runActionsForEvent(e);
      };
    }
    function _(e) {
      var t = e.core.slideIndexChanger,
        n = e.elements.smw,
        o = e.stageIndexes,
        i = e.sws;
      function r(e) {
        var t = n[o.current];
        t.a(), t[e]();
      }
      function s(e, t) {
        void 0 !== e && (n[e].s(), n[e][t]());
      }
      this.runPositiveSwipedXActions = function () {
        var e = o.previous;
        if (void 0 === e) r("z");else {
          r("p");
          var n = o.next;
          t.changeTo(e);
          var a = o.previous;
          i.d(a), i.b(n), r("z"), s(a, "ne");
        }
      }, this.runNegativeSwipedXActions = function () {
        var e = o.next;
        if (void 0 === e) r("z");else {
          r("ne");
          var n = o.previous;
          t.changeTo(e);
          var a = o.next;
          i.d(a), i.b(n), r("z"), s(a, "p");
        }
      };
    }
    function Y(e, t) {
      e.contains(t) && e.removeChild(t);
    }
    function J(e) {
      var t = e.core.lightboxCloser,
        n = e.elements,
        o = e.resolve,
        i = e.sourcePointerProps,
        r = o(_);
      this.runNoSwipeActions = function () {
        Y(n.container, n.slideSwipingHoverer), i.isSourceDownEventTarget || t.closeLightbox(), i.isPointering = !1;
      }, this.runActions = function () {
        i.swipedX > 0 ? r.runPositiveSwipedXActions() : r.runNegativeSwipedXActions(), Y(n.container, n.slideSwipingHoverer), n.container.classList.remove(s), i.isPointering = !1;
      };
    }
    function G(e) {
      var t = e.resolve,
        n = e.sourcePointerProps,
        o = t(J);
      this.listener = function () {
        n.isPointering && (n.swipedX ? o.runActions() : o.runNoSwipeActions());
      };
    }
    function $(e) {
      var t = this,
        n = e.core,
        o = n.eventsDispatcher,
        i = n.globalEventsController,
        r = n.scrollbarRecompensor,
        s = e.data,
        a = e.elements,
        c = e.fs,
        u = e.props,
        d = e.sourcePointerProps;
      this.isLightboxFadingOut = !1, this.runActions = function () {
        t.isLightboxFadingOut = !0, a.container.classList.add(v), i.removeListeners(), u.exitFullscreenOnClose && s.ifs && c.x(), setTimeout(function () {
          t.isLightboxFadingOut = !1, d.isPointering = !1, a.container.classList.remove(v), document.documentElement.classList.remove(l), r.removeRecompense(), document.body.removeChild(a.container), o.dispatch("onClose");
        }, 270);
      };
    }
    function K(e, t) {
      var n = e.classList;
      n.contains(t) && n.remove(t);
    }
    function Q(e) {
      var t, n, o;
      n = (t = e).core.eventsDispatcher, o = t.props, n.dispatch = function (e) {
        o[e] && o[e]();
      }, function (e) {
        var t = e.componentsServices,
          n = e.data,
          o = e.fs,
          i = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"];
        function r(e) {
          for (var t = 0; t < i.length; t++) document[e](i[t], s);
        }
        function s() {
          document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement ? t.ofs() : t.xfs();
        }
        o.o = function () {
          t.ofs();
          var e = document.documentElement;
          e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen();
        }, o.x = function () {
          t.xfs(), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen();
        }, o.t = function () {
          n.ifs ? o.x() : o.o();
        }, o.l = function () {
          r("addEventListener");
        }, o.q = function () {
          r("removeEventListener");
        };
      }(e), function (e) {
        var t = e.core,
          n = t.globalEventsController,
          o = t.windowResizeActioner,
          i = e.fs,
          r = e.resolve,
          s = r(U),
          a = r(V),
          c = r(G);
        n.attachListeners = function () {
          document.addEventListener("pointermove", a.listener), document.addEventListener("pointerup", c.listener), addEventListener("resize", o.runActions), document.addEventListener("keydown", s.listener), i.l();
        }, n.removeListeners = function () {
          document.removeEventListener("pointermove", a.listener), document.removeEventListener("pointerup", c.listener), removeEventListener("resize", o.runActions), document.removeEventListener("keydown", s.listener), i.q();
        };
      }(e), function (e) {
        var t = e.core.lightboxCloser,
          n = (0, e.resolve)($);
        t.closeLightbox = function () {
          n.isLightboxFadingOut || n.runActions();
        };
      }(e), function (e) {
        var t = e.data,
          n = e.core.scrollbarRecompensor;
        function o() {
          document.body.offsetHeight > innerHeight && (document.body.style.marginRight = t.scrollbarWidth + "px");
        }
        n.addRecompense = function () {
          "complete" === document.readyState ? o() : addEventListener("load", function () {
            o(), n.addRecompense = o;
          });
        }, n.removeRecompense = function () {
          document.body.style.removeProperty("margin-right");
        };
      }(e), function (e) {
        var t = e.core,
          n = t.slideChangeFacade,
          o = t.slideIndexChanger,
          i = t.stageManager;
        e.props.sources.length > 1 ? (n.changeToPrevious = function () {
          o.jumpTo(i.getPreviousSlideIndex());
        }, n.changeToNext = function () {
          o.jumpTo(i.getNextSlideIndex());
        }) : (n.changeToPrevious = function () {}, n.changeToNext = function () {});
      }(e), function (e) {
        var t = e.componentsServices,
          n = e.core,
          o = n.slideIndexChanger,
          i = n.sourceDisplayFacade,
          r = n.stageManager,
          s = e.elements,
          a = s.smw,
          c = s.sourceAnimationWrappers,
          l = e.isl,
          u = e.stageIndexes,
          d = e.sws;
        o.changeTo = function (e) {
          u.current = e, r.updateStageIndexes(), t.setSlideNumber(e + 1), i.displaySourcesWhichShouldBeDisplayed();
        }, o.jumpTo = function (e) {
          var t = u.previous,
            n = u.current,
            i = u.next,
            s = l[n],
            f = l[e];
          o.changeTo(e);
          for (var p = 0; p < a.length; p++) a[p].d();
          d.d(n), d.c(), requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              var e = u.previous,
                o = u.next;
              function p() {
                r.i(n) ? n === u.previous ? a[n].ne() : n === u.next && a[n].p() : (a[n].h(), a[n].n());
              }
              s && c[n].classList.add(m), f && c[u.current].classList.add(h), d.a(), void 0 !== e && e !== n && a[e].ne(), a[u.current].n(), void 0 !== o && o !== n && a[o].p(), d.b(t), d.b(i), l[n] ? setTimeout(p, 260) : p();
            });
          });
        };
      }(e), function (e) {
        var t = e.core.sourcesPointerDown,
          n = e.elements,
          o = n.smw,
          i = n.sources,
          r = e.sourcePointerProps,
          s = e.stageIndexes;
        t.listener = function (e) {
          "VIDEO" !== e.target.tagName && e.preventDefault(), r.isPointering = !0, r.downScreenX = e.screenX, r.swipedX = 0;
          var t = i[s.current];
          t && t.contains(e.target) ? r.isSourceDownEventTarget = !0 : r.isSourceDownEventTarget = !1;
          for (var n = 0; n < o.length; n++) o[n].d();
        };
      }(e), function (e) {
        var t = e.collections.sourcesRenderFunctions,
          n = e.core.sourceDisplayFacade,
          o = e.props,
          i = e.stageIndexes;
        function r(e) {
          t[e] && (t[e](), delete t[e]);
        }
        n.displaySourcesWhichShouldBeDisplayed = function () {
          if (o.loadOnlyCurrentSource) r(i.current);else for (var e in i) r(i[e]);
        };
      }(e), function (e) {
        var t = e.core.stageManager,
          n = e.elements,
          o = n.smw,
          i = n.sourceAnimationWrappers,
          r = e.isl,
          s = e.stageIndexes,
          a = e.sws;
        a.a = function () {
          for (var e in s) o[s[e]].s();
        }, a.b = function (e) {
          void 0 === e || t.i(e) || (o[e].h(), o[e].n());
        }, a.c = function () {
          for (var e in s) a.d(s[e]);
        }, a.d = function (e) {
          if (r[e]) {
            var t = i[e];
            K(t, g), K(t, h), K(t, m);
          }
        };
      }(e), function (e) {
        var t = e.collections.sourceSizers,
          n = e.core.windowResizeActioner,
          o = e.data,
          i = e.elements.smw,
          r = e.stageIndexes;
        n.runActions = function () {
          innerWidth < 992 ? o.maxSourceWidth = innerWidth : o.maxSourceWidth = .9 * innerWidth, o.maxSourceHeight = .9 * innerHeight;
          for (var e = 0; e < i.length; e++) i[e].d(), t[e] && t[e].adjustSize();
          var n = r.previous,
            s = r.next;
          void 0 !== n && i[n].ne(), void 0 !== s && i[s].p();
        };
      }(e);
    }
    function Z(e) {
      var t = e.componentsServices,
        n = e.core,
        o = n.eventsDispatcher,
        r = n.globalEventsController,
        s = n.scrollbarRecompensor,
        c = n.sourceDisplayFacade,
        u = n.stageManager,
        f = n.windowResizeActioner,
        p = e.data,
        h = e.elements,
        m = (e.props, e.stageIndexes),
        v = e.sws;
      function b() {
        var t, n;
        p.i = !0, p.scrollbarWidth = function () {
          var e = document.createElement("div"),
            t = e.style,
            n = document.createElement("div");
          t.visibility = "hidden", t.width = "100px", t.msOverflowStyle = "scrollbar", t.overflow = "scroll", n.style.width = "100%", document.body.appendChild(e);
          var o = e.offsetWidth;
          e.appendChild(n);
          var i = n.offsetWidth;
          return document.body.removeChild(e), o - i;
        }(), Q(e), h.container = document.createElement("div"), h.container.className = "".concat(i, "container ").concat(a, " ").concat(g), function (e) {
          var t = e.elements;
          t.slideSwipingHoverer = document.createElement("div"), t.slideSwipingHoverer.className = "".concat(i, "slide-swiping-hoverer ").concat(a, " ").concat(d);
        }(e), X(e), function (e) {
          var t = e.core.sourcesPointerDown,
            n = e.elements,
            o = e.props.sources,
            i = document.createElement("div");
          i.className = "".concat(d, " ").concat(a), n.container.appendChild(i), i.addEventListener("pointerdown", t.listener), n.sourceWrappersContainer = i;
          for (var r = 0; r < o.length; r++) D(e, r);
        }(e), e.props.sources.length > 1 && (n = (t = e).core.slideChangeFacade, B(t, n.changeToPrevious, "previous", "M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z"), B(t, n.changeToNext, "next", "M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z")), function (e) {
          for (var t = e.props.sources, n = e.resolve, o = n(L), i = n(H), r = n(R, [o, i]), s = 0; s < t.length; s++) if ("string" == typeof t[s]) {
            var a = r.getTypeSetByClientForIndex(s);
            if (a) i.runActionsForSourceTypeAndIndex(a, s);else {
              var c = o.getSourceTypeFromLocalStorageByUrl(t[s]);
              c ? i.runActionsForSourceTypeAndIndex(c, s) : r.retrieveTypeWithXhrForIndex(s);
            }
          } else i.runActionsForSourceTypeAndIndex("custom", s);
        }(e), o.dispatch("onInit");
      }
      e.open = function () {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          i = m.previous,
          a = m.current,
          d = m.next;
        m.current = n, p.i || S(e), u.updateStageIndexes(), p.i ? (v.c(), v.a(), v.b(i), v.b(a), v.b(d), o.dispatch("onShow")) : b(), c.displaySourcesWhichShouldBeDisplayed(), t.setSlideNumber(n + 1), document.body.appendChild(h.container), document.documentElement.classList.add(l), s.addRecompense(), r.attachListeners(), f.runActions(), h.smw[m.current].n(), o.dispatch("onOpen");
      };
    }
    function ee(e, t, n) {
      return (ee = te() ? Reflect.construct.bind() : function (e, t, n) {
        var o = [null];
        o.push.apply(o, t);
        var i = new (Function.bind.apply(e, o))();
        return n && ne(i, n.prototype), i;
      }).apply(null, arguments);
    }
    function te() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
      } catch (e) {
        return !1;
      }
    }
    function ne(e, t) {
      return (ne = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }
    function oe(e) {
      return function (e) {
        if (Array.isArray(e)) return ie(e);
      }(e) || function (e) {
        if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
      }(e) || function (e, t) {
        if (!e) return;
        if ("string" == typeof e) return ie(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        "Object" === n && e.constructor && (n = e.constructor.name);
        if ("Map" === n || "Set" === n) return Array.from(e);
        if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ie(e, t);
      }(e) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }
    function ie(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
      return o;
    }
    function re() {
      for (var e = document.getElementsByTagName("a"), t = function t(_t) {
          if (!e[_t].hasAttribute("data-fslightbox")) return "continue";
          var n = e[_t].hasAttribute("data-href") ? e[_t].getAttribute("data-href") : e[_t].getAttribute("href");
          if (!n) return console.warn('The "data-fslightbox" attribute was set without the "href" attribute.'), "continue";
          var o = e[_t].getAttribute("data-fslightbox");
          fsLightboxInstances[o] || (fsLightboxInstances[o] = new FsLightbox());
          var i = null;
          "#" === n.charAt(0) ? (i = document.getElementById(n.substring(1)).cloneNode(!0)).removeAttribute("id") : i = n, fsLightboxInstances[o].props.sources.push(i), fsLightboxInstances[o].elements.a.push(e[_t]);
          var r = fsLightboxInstances[o].props.sources.length - 1;
          e[_t].onclick = function (e) {
            e.preventDefault(), fsLightboxInstances[o].open(r);
          }, d("types", "data-type"), d("videosPosters", "data-video-poster"), d("customClasses", "data-class"), d("customClasses", "data-custom-class");
          for (var s = ["href", "data-fslightbox", "data-href", "data-type", "data-video-poster", "data-class", "data-custom-class"], a = e[_t].attributes, c = fsLightboxInstances[o].props.customAttributes, l = 0; l < a.length; l++) if (-1 === s.indexOf(a[l].name) && "data-" === a[l].name.substr(0, 5)) {
            c[r] || (c[r] = {});
            var u = a[l].name.substr(5);
            c[r][u] = a[l].value;
          }
          function d(n, i) {
            e[_t].hasAttribute(i) && (fsLightboxInstances[o].props[n][r] = e[_t].getAttribute(i));
          }
        }, n = 0; n < e.length; n++) t(n);
      var o = Object.keys(fsLightboxInstances);
      window.fsLightbox = fsLightboxInstances[o[o.length - 1]];
    }
    window.FsLightbox = function () {
      var e = this;
      this.props = {
        sources: [],
        customAttributes: [],
        customClasses: [],
        types: [],
        videosPosters: [],
        slideDistance: .3
      }, this.data = {
        isFullscreenOpen: !1,
        maxSourceWidth: 0,
        maxSourceHeight: 0,
        scrollbarWidth: 0
      }, this.isl = [], this.sourcePointerProps = {
        downScreenX: null,
        isPointering: !1,
        isSourceDownEventTarget: !1,
        swipedX: 0
      }, this.stageIndexes = {}, this.elements = {
        a: [],
        container: null,
        slideSwipingHoverer: null,
        smw: [],
        sourceWrappersContainer: null,
        sources: [],
        sourceAnimationWrappers: []
      }, this.componentsServices = {
        setSlideNumber: function setSlideNumber() {}
      }, this.resolve = function (t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        return n.unshift(e), ee(t, oe(n));
      }, this.collections = {
        sourceLoadHandlers: [],
        sourcesRenderFunctions: [],
        sourceSizers: []
      }, this.core = {
        eventsDispatcher: {},
        globalEventsController: {},
        lightboxCloser: {},
        lightboxUpdater: {},
        scrollbarRecompensor: {},
        slideChangeFacade: {},
        slideIndexChanger: {},
        sourcesPointerDown: {},
        sourceDisplayFacade: {},
        stageManager: {},
        windowResizeActioner: {}
      }, this.fs = {}, this.sws = {}, Z(this), this.close = function () {
        return e.core.lightboxCloser.closeLightbox();
      };
    }, window.fsLightboxInstances = {}, re(), window.refreshFsLightbox = function () {
      for (var e in fsLightboxInstances) {
        var t = fsLightboxInstances[e].props;
        fsLightboxInstances[e] = new FsLightbox(), fsLightboxInstances[e].props = t, fsLightboxInstances[e].props.sources = [], fsLightboxInstances[e].elements.a = [];
      }
      re();
    };
  }]);
});
jQuery(document).ready(function () {
  jQuery('[data-modal]').click(function (e) {
    e.preventDefault();
    console.log('fuck me ');
    var data_modal = jQuery(this).data('modal');
    jQuery(data_modal).ysp_modal({
      closeText: 'X',
      modalClass: 'ysp-modal-open',
      closeClass: 'ysp-model-close'
    });
  });
});
function copyLink() {
  var copyText = document.getElementById("copyLinkInput");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Copied the link: " + copyText.value);
}
Object.defineProperty(String.prototype, 'eachWordCapitalize', {
  value: function value() {
    return this.toLowerCase().split(' ').map(function (s) {
      return s.charAt(0).toUpperCase() + s.substring(1);
    }).join(' ');
  },
  enumerable: false
});
function raiys_get_form_data(form_ele) {
  var formData = new FormData(form_ele);
  var fd = Object.fromEntries(formData.entries());
  for (var _i = 0, _Object$entries = Object.entries(fd); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      fIndex = _Object$entries$_i[0],
      field = _Object$entries$_i[1];
    var ValArray = formData.getAll(fIndex);
    if (typeof ValArray[1] != 'undefined') {
      fd[fIndex] = ValArray;
    }
    if (fd[fIndex] == '') {
      delete fd[fIndex];
    }
  }
  return fd;
}
function raiys_set_form_to_data(inputData) {
  var formA = document.querySelector('.ysp-yacht-search-form');
  var formB = document.querySelector('#ysp-mobile-yacht-search-form');
  formA.reset();
  formB.reset();
  var formInputs = document.querySelectorAll('.ysp-yacht-search-form *[name], *[name][form="ysp-yacht-search-form"], #ysp-mobile-yacht-search-form *[name], *[name][form="ysp-mobile-yacht-search-form"]');
  formInputs.forEach(function (ele) {
    var input = ele;
    var name = ele.getAttribute('name');
    var hasPretty = inputData[name];

    // console.log(hasPretty);

    if (typeof hasPretty != 'null' && typeof hasPretty != 'undefined') {
      if (Array.isArray(hasPretty)) {
        //console.log(hasPretty);

        hasPretty.forEach(function (hP) {
          if (typeof input.type != 'undefined' && (input.type == 'checkbox' || input.type == 'radio') && input.getAttribute('value') == hP) {
            input.checked = true;
          }
        });
      } else {
        if (typeof input.type != 'undefined' && (input.type == 'checkbox' || input.type == 'radio') && input.getAttribute('value') == hasPretty) {
          input.checked = true;
        } else if (input.type != 'checkbox' && input.type != 'radio') {
          input.value = hasPretty;
        }
      }
    }
  });
}
function raiys_push_history() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var searchParams = new URLSearchParams();
  var strpath = '';
  for (var property in data) {
    var it = data[property];
    if (it != '' && typeof it != 'undefined' && typeof it == 'string' && property != 'OnFirstLoad' && _typeof(it) != 'object') {
      searchParams.set(property, it);
      strpath = strpath + "" + property + '-' + it.toString().split(' ').join('-') + '/';
      strpath = strpath.toLowerCase();
    } else if (Array.isArray(it)) {
      searchParams.set(property, it);
      it = it.map(function (prop) {
        return prop.toString().split(' ').join('-');
      });
      strpath = strpath + "" + property + '-' + it.join("+") + '/';
      strpath = strpath.toLowerCase();
    }
  }

  //history.pushState(data, '', rai_yacht_sync.yacht_search_url+'?'+searchParams.toString());
  history.pushState(data, '', rai_yacht_sync.yacht_search_url + strpath);
  return rai_yacht_sync.yacht_search_url + strpath;
}
var rai_ysp_api = {};
rai_ysp_api.call_api = function (method, path, passing_data) {
  var xhttp = new XMLHttpRequest();
  return new Promise(function (resolve, reject) {
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var responseData = JSON.parse(this.responseText);
        resolve(responseData);
      }
    };
    switch (method) {
      case 'GET':
        var searchParams = new URLSearchParams();
        if (passing_data.length != 0) {
          for (var property in passing_data) {
            searchParams.set(property, passing_data[property]);
          }
        }
        var _questionMark = searchParams.toString();
        xhttp.open("GET", rai_yacht_sync.wp_rest_url + "raiys/" + path + (_questionMark != '' ? '?' + searchParams.toString() : ''), true);
        xhttp.send();
        break;
      case 'POST':
        xhttp.open("POST", rai_yacht_sync.wp_rest_url + "raiys/" + path, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(passing_data));
        break;
    }
  });
};
var ysp_templates = {};
ysp_templates.yacht = {};
ysp_templates.yacht.grid = function (vessel, params) {
  var meters = parseInt(vessel.NominalLength) * 0.3048;
  var price = '';
  var length = '';
  if (rai_yacht_sync.europe_option_picked == "yes") {
    length = vessel.NominalLength ? meters.toFixed(2) + ' m' : 'N/A';
    price = typeof vessel.YSP_EuroVal != 'undefined' && vessel.YSP_EuroVal > 0 ? "\u20AC".concat(new Intl.NumberFormat('en-us', {
      minimumFractionDigits: 2
    }).format(vessel.YSP_EuroVal)) : 'Contact Us For Price';
  } else {
    length = vessel.NominalLength ? vessel.NominalLength + " / " + meters.toFixed(2) + ' m' : 'N/A';
    if (params.currency == 'Eur') {
      price = typeof vessel.YSP_USDVal != 'undefined' && vessel.YSP_USDVal > 0 ? "\u20AC".concat(new Intl.NumberFormat('en-us', {
        minimumFractionDigits: 2
      }).format(vessel.YSP_EuroVal)) : 'Contact Us For Price';
    } else {
      price = typeof vessel.YSP_USDVal != 'undefined' && vessel.YSP_USDVal > 0 ? "$".concat(new Intl.NumberFormat('en-us', {
        minimumFractionDigits: 2
      }).format(vessel.YSP_USDVal)) : 'Contact Us For Price';
    }
  }
  return "\n\t\t\t<div class=\"yacht-result-grid-item\" data-post-id=\"".concat(vessel._postID, "\" data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t<div class=\"yacht-main-image-container\">\n\t\t\t\t\t<a class=\"yacht-details\" href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t<img class=\"yacht-main-image\" src=\"").concat(vessel.Images ? vessel.Images[0].Uri : rai_yacht_sync.assets_url + 'images/default-yacht-image.jpeg', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t\t\t").concat(vessel.CompanyName === rai_yacht_sync.company_name ? "<div class=\"company-banner\"><img src=\"".concat(rai_yacht_sync.company_logo, "\"></div>") : '', "\n\t\t\t\t\t</a>\t\n\t\t\t\t</div>\n\t\t\t\t<div class=\"yacht-general-info-container\">\n\t\t\t\t\t<div class=\"yacht-title-container\">\n\t\t\t\t\t\t<a class=\"yacht-details\" href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t\t<h6 class=\"yacht-title\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', " ").concat(vessel.BoatName ? vessel.BoatName : '', "</h6>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-info-container\">\n\t\t\t\t\t\t<div class=\"yacht-info\">\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Year</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.ModelYear ? vessel.ModelYear : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Cabins</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.CabinsCountNumeric ? vessel.CabinsCountNumeric : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Builder</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.MakeString ? vessel.MakeString : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Length</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(length, "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Compare</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\"><input type=\"checkbox\" class=\"compare_toggle\" name=\"compare\" value=\"").concat(vessel._postID, "\" /></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-price-details-container\">\n\t\t\t\t\t\t<div class=\"yacht-price-container\">\n\t\t\t\t\t\t\t<p class=\"yacht-price\">").concat(price, "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<button class=\"yacht-download-button\" type=\"button\" data-modal=\"#single-share\">Contact</button>\n\t\t\t\t\t\t<button class=\"love\" type=\"button\" data-yacht-id=\"").concat(vessel.DocumentID, "\">Liked</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
};
ysp_templates.yacht.list = function (vessel) {
  var meters = parseInt(vessel.NominalLength) * 0.3048;
  var price = '';
  if (typeof vessel.Price == 'string') {
    var _price = vessel.Price.slice(0, -3);
  }
  var length = '';
  if (rai_yacht_sync.europe_option_picked == "yes") {
    length = vessel.NominalLength ? meters.toFixed(2) + ' m' : 'N/A';
    price = vessel.Price ? "\u20AC ".concat(new Intl.NumberFormat('en-us', {
      minimumFractionDigits: 2
    }).format(parseInt(vessel.Price.slice(0, -3)) * rai_yacht_sync.euro_c_c)) : 'Contact Us For Price';
  } else {
    length = vessel.NominalLength ? vessel.NominalLength + " / " + meters.toFixed(2) + ' m' : 'N/A';
    price = vessel.Price ? "$ ".concat(new Intl.NumberFormat('en-us', {
      minimumFractionDigits: 2
    }).format(parseInt(vessel.Price.slice(0, -3)))) : 'Contact Us For Price';
  }
  return "\n\t\t\t<div class=\"yacht-result-grid-item list-view\" data-post-id=\"".concat(vessel._postID, "\">\n\t\t\t\t<div class=\"yacht-main-image-container\">\n\t\t\t\t\t<a class=\"yacht-details\" href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t<img class=\"yacht-main-image\" src=\"").concat(vessel.Images ? vessel.Images[0].Uri : vessel.Images ? vessel.Images[0].Uri : rai_yacht_sync.assets_url + 'images/default-yacht-image.jpeg', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"yacht-general-info-container\">\n\t\t\t\t\t<div class=\"yacht-title-container\">\n\t\t\t\t\t\t<a class=\"yacht-details\" href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t\t<h6 class=\"yacht-title\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', " ").concat(vessel.BoatName ? vessel.BoatName : '', "</h6>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-info-container\">\n\t\t\t\t\t\t<div class=\"yacht-info\">\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Year</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.ModelYear ? vessel.ModelYear : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Cabins</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.CabinsCountNumeric ? vessel.CabinsCountNumeric : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Builder</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.MakeString ? vessel.MakeString : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Length</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(length, "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-price-details-container\">\n\t\t\t\t\t\t<div class=\"yacht-price-container\">\n\t\t\t\t\t\t\t<p class=\"yacht-price\">").concat(price, "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button class=\"yacht-download-button\" type=\"button\" data-modal=\"#single-share\">Contact</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t");
};
ysp_templates.yacht.compare_preview = function (vessel, params) {
  return "\n\n\t\t\t<div class=\"ysp-yacht-compare-preview\" data-post-id=\"".concat(vessel._postID, "\" data-yacht-id=\"").concat(vessel.DocumentID, "\">\t\t\t\n\t\t\t\t<span class=\"remove-from-compare\">\n\t\t\t\t\t<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t<rect x=\"0.5\" y=\"0.5\" width=\"23\" height=\"23\" rx=\"11.5\" stroke=\"#6B7073\"/>\n\t\t\t\t\t<path d=\"M8.26876 14.9346C8.04909 15.1543 8.04909 15.5104 8.26876 15.7301C8.48843 15.9498 8.84458 15.9498 9.06425 15.7301L8.26876 14.9346ZM12.3976 12.3968C12.6173 12.1771 12.6173 11.8209 12.3976 11.6013C12.1779 11.3816 11.8218 11.3816 11.6021 11.6013L12.3976 12.3968ZM11.6018 11.6016C11.3821 11.8213 11.3821 12.1774 11.6018 12.3971C11.8214 12.6168 12.1776 12.6168 12.3973 12.3971L11.6018 11.6016ZM15.7306 9.06376C15.9503 8.84409 15.9503 8.48794 15.7306 8.26827C15.5109 8.0486 15.1548 8.0486 14.9351 8.26827L15.7306 9.06376ZM12.3973 11.6013C12.1776 11.3816 11.8214 11.3816 11.6018 11.6013C11.3821 11.8209 11.3821 12.1771 11.6018 12.3968L12.3973 11.6013ZM14.9351 15.7301C15.1548 15.9498 15.5109 15.9498 15.7306 15.7301C15.9503 15.5104 15.9503 15.1543 15.7306 14.9346L14.9351 15.7301ZM11.6021 12.3971C11.8218 12.6168 12.1779 12.6168 12.3976 12.3971C12.6173 12.1774 12.6173 11.8213 12.3976 11.6016L11.6021 12.3971ZM9.06425 8.26827C8.84458 8.0486 8.48843 8.0486 8.26876 8.26827C8.04909 8.48794 8.04909 8.84409 8.26876 9.06376L9.06425 8.26827ZM9.06425 15.7301L12.3976 12.3968L11.6021 11.6013L8.26876 14.9346L9.06425 15.7301ZM12.3973 12.3971L15.7306 9.06376L14.9351 8.26827L11.6018 11.6016L12.3973 12.3971ZM11.6018 12.3968L14.9351 15.7301L15.7306 14.9346L12.3973 11.6013L11.6018 12.3968ZM12.3976 11.6016L9.06425 8.26827L8.26876 9.06376L11.6021 12.3971L12.3976 11.6016Z\" fill=\"#6B7073\"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</span>\n\n\n\t\t\t\t<img class=\"yacht-main-image\" src=\"").concat(vessel.Images ? vessel.Images[0].Uri : rai_yacht_sync.assets_url + 'images/default-yacht-image.jpeg', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\n\t\t\t\t<h6 class=\"yacht-title\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', " ").concat(vessel.BoatName ? vessel.BoatName : '', "</h6>\n\n\t\t\t</div>\n\n\t\t");
};
ysp_templates.noResults = function () {
  return "\n            <div>\n                <b>No Results</b>\n            </div>\n        ";
};
ysp_templates.yacht_tag = function (label, value) {
  return "\n    \t\t<span>\n\t    \t\t".concat(value, "\n\n\t    \t\t<img src=\"").concat(rai_yacht_sync.assets_url, "/images/remove-tag.png\">\n\t\t\t</span>\n    \t");
};
ysp_templates.pagination = {};
ysp_templates.pagination.next_text = ">";
ysp_templates.pagination.prev_text = "<";
document.addEventListener("DOMContentLoaded", function () {
  var ele_quick_search = document.querySelector('.ysp-quick-search-form');
  if (ele_quick_search) {
    // Fill options
    var FillOptions = [];
    var selectorElements = document.querySelectorAll(".ysp-quick-search-form select[data-fill-options]");
    selectorElements.forEach(function (ele) {
      FillOptions.push(ele.getAttribute('data-fill-options'));
    });
    rai_ysp_api.call_api('POST', 'dropdown-options', {
      labels: FillOptions
    }).then(function (rOptions) {
      var _loop = function _loop() {
        var SelectorEle = document.querySelectorAll(".ysp-quick-search-form select[data-fill-options='" + label + "']");
        var name = SelectorEle[0].getAttribute('name');
        rOptions[label].forEach(function (b) {
          SelectorEle.forEach(function (ele) {
            var option = document.createElement("OPTION");
            option.text = b;
            option.value = b;
            ele.add(option);
          });
        });
        var URLREF = new URL(location.href);
        var UrlVal = URLREF.searchParams.get(name);
        var strpaths = window.location.href;
        strpaths = strpaths.replace(rai_yacht_sync.yacht_search_page_id, '');
        var paths = strpaths.split("/");
        var pretty_url_path_params = {};
        paths.forEach(function (path) {
          if (path != '') {
            var phase_path = path.split('-');
            var only_vals = phase_path.slice(1);
            pretty_url_path_params[phase_path[0]] = only_vals.join(' ');
            if (typeof pretty_url_path_params[phase_path[0]] == 'string') {
              pretty_url_path_params[phase_path[0]] = pretty_url_path_params[phase_path[0]].eachWordCapitalize();
            }
          }
        });
        if (UrlVal != '' && UrlVal != null) {
          console.log(UrlVal);
          if (typeof UrlVal == 'string') {
            UrlVal = UrlVal.eachWordCapitalize();
          }
          SelectorEle.forEach(function (ele) {
            ele.value = UrlVal;
          });
        }
        var hasPretty = pretty_url_path_params[name];
        console.log(pretty_url_path_params[name]);
        if (hasPretty != '' && hasPretty != null) {
          SelectorEle.forEach(function (ele) {
            ele.value = hasPretty;
          });
        }
      };
      for (var label in rOptions) {
        _loop();
      }
    });
  }
});
function ysp_makeSearchTags(data) {
  var tagsEle = document.querySelectorAll('.ysp-search-tags');
  if (tagsEle) {
    tagsEle.forEach(function (te) {
      te.innerHTML = "";
    });
    var ysp_tags_not_print = ['page_index', ''];
    var _loop2 = function _loop2(paramKey) {
      var label = '';
      if (document.querySelector('label[for=' + paramKey + ']')) {
        label = document.querySelector('label[for=' + paramKey + ']').innerText;
      } else if (document.querySelector('*[name=' + paramKey + ']') && document.querySelector('*[name=' + paramKey + ']').hasAttribute('label')) {
        label = document.querySelector('*[name=' + paramKey + ']').getAttribute('label');
      }
      tagsEle.forEach(function (te) {
        if (ysp_tags_not_print.indexOf(paramKey) == -1) {
          var eleInput = document.querySelector('.ysp-yacht-search-form *[name=' + paramKey + ']');
          if (eleInput) {
            var newTagEle = document.createElement('span');
            var tagVal = data[paramKey];
            if (eleInput.tagName == 'SELECT') {
              tagVal = eleInput.options[eleInput.selectedIndex].innerText;
            }
            if (paramKey.match('price')) {
              tagVal = '$' + tagVal;
            }
            if (paramKey.match('length') && paramKey != 'lengthunit') {
              var eleUnit = document.querySelector('.ysp-yacht-search-form [name=lengthunit]:checked');
              if (!eleUnit) {
                eleUnit = document.querySelector('.ysp-yacht-search-form [name=lengthunit]');
              }
              tagVal = tagVal + ' ';
              if (eleUnit) {
                tagVal += eleUnit.value;
              }
            }
            newTagEle.className = 'btn btn-primary btn-sm ysp-tag';
            if (label != null && label != 'null' && label != '') {
              newTagEle.innerHTML = ysp_templates.yacht_tag(label, tagVal);
            } else {
              newTagEle.innerHTML = ysp_templates.yacht_tag('', tagVal);
            }
            newTagEle.setAttribute('key', paramKey);
            te.appendChild(newTagEle);
            console.log(document.querySelector('.ysp-tag[key="' + paramKey + '"]'));
            console.log('.ysp-tag[key="' + paramKey + '"]');
            document.querySelectorAll('span.ysp-tag[key="' + paramKey + '"]').forEach(function (yspTagEle) {
              yspTagEle.addEventListener('click', function (event) {
                console.log(event);
                var key = event.currentTarget.getAttribute('key');
                console.log(key);
                var inputEles = document.querySelectorAll('.ysp-yacht-search-form select[name=' + key + '], .ysp-yacht-search-form input[name=' + key + ']');
                console.log(inputEles);
                inputEles.forEach(function (eleI) {
                  if (typeof eleI.type != 'undefined' && (eleI.type == 'checkbox' || eleI.type == 'radio')) {
                    eleI.checked = false;
                  } else {
                    eleI.value = '';
                  }
                });
                event.currentTarget.remove();
                inputEles[0].form.requestSubmit();
              });
            });
          }
        }
      });
    };
    for (var paramKey in data) {
      _loop2(paramKey);
    }
  }
}
function ysp_markLovedVessel(ele_card) {
  jQuery('.love', ele_card).click(function (e) {
    e.preventDefault();
    jQuery(this).toggleClass('loved');
    var yachtId = jQuery(this).data('yacht-id');
    if (jQuery(this).hasClass('loved')) {
      ysp_addLovedVessel(yachtId);
    } else {
      ysp_removeLovedVessel(yachtId);
      var params = raiys_get_form_data(document.querySelector('.ysp-yacht-search-form'));
      if (typeof params.ys_yachts_loved != 'undefined') {
        ele_card.remove();
      }
    }
  });
  if (localStorage.getItem('ysp_loved_vessels') != "") {
    var lovedVessels = JSON.parse(localStorage.getItem('ysp_loved_vessels'));
    if (lovedVessels == null) {
      lovedVessels = [];
    }
    var yachtId = ele_card.data('yacht-id');
    if (lovedVessels.indexOf(yachtId) != -1) {
      ele_card.addClass('loved');
      jQuery('.love', ele_card).addClass('loved');
    }
  }
}
function ysp_addLovedVessel(yachtId) {
  var lovedVessels = JSON.parse(localStorage.getItem('ysp_loved_vessels'));
  if (lovedVessels == null) {
    lovedVessels = [];
  }
  if (lovedVessels.indexOf(yachtId) == -1) {
    lovedVessels.push(yachtId);
  } else {
    // already added
  }
  console.log(lovedVessels);
  localStorage.setItem("ysp_loved_vessels", JSON.stringify(lovedVessels));
}
function ysp_removeLovedVessel(yachtId) {
  var lovedVessels = JSON.parse(localStorage.getItem('ysp_loved_vessels'));
  if (lovedVessels == null) {
    lovedVessels = [];
  }
  var indexed = lovedVessels.indexOf(yachtId);
  console.log(indexed);
  if (indexed != -1) {
    delete lovedVessels[indexed];
    lovedVessels.splice(indexed, 1);
  } else {
    // already added
  }
  console.log(lovedVessels);
  localStorage.setItem("ysp_loved_vessels", JSON.stringify(lovedVessels));
}
var YSP_VesselCompareList = [];
function ysp_restoreCompares() {
  var URLREF = new URL(location.href); // maybe for a re-do
  var compare_post_ids = URLREF.searchParams.get('restore_to_compare');
  console.log(_typeof(compare_post_ids));
  console.log(compare_post_ids);
  if (typeof compare_post_ids == 'string') {
    YSP_VesselCompareList = compare_post_ids.split(',');
    ysp_makeCompareLinkout();
  }
}
function ysp_makeCompareVessel(ele_card) {
  jQuery('.compare_toggle', ele_card).change(function (e) {
    console.log('howdy');
    e.preventDefault();
    jQuery(this).toggleClass('armed');
    var yachtId = ele_card.data('post-id');
    if (jQuery(this).hasClass('armed')) {
      ysp_addVesselToCompareList(yachtId);
    } else {
      ysp_removeVesselToCompareList(yachtId);
    }
  });
  var yachtId = ele_card.data('post-id');
  if (YSP_VesselCompareList.indexOf(yachtId) != -1 || YSP_VesselCompareList.indexOf(yachtId.toString()) != -1) {
    console.log('hello world restored');
    ele_card.addClass('armed');
    jQuery('.compare_toggle', ele_card).addClass('armed').prop('checked', true);
  }
}
function ysp_addVesselToCompareList(yachtId) {
  if (YSP_VesselCompareList.indexOf(yachtId) == -1) {
    YSP_VesselCompareList.push(yachtId);
  }
  ysp_makeCompareLinkout();
}
function ysp_removeVesselToCompareList(yachtId) {
  var indexed = YSP_VesselCompareList.indexOf(yachtId);
  if (indexed != -1) {
    delete YSP_VesselCompareList[indexed];
    YSP_VesselCompareList.splice(indexed, 1);
  }
  ysp_makeCompareLinkout();
}
function ysp_makeCompareLinkout() {
  if (YSP_VesselCompareList.length >= 2) {
    document.getElementById('ysp_compare_linkout').href = rai_yacht_sync.wp_rest_url + "raiys/compare/?postID=" + YSP_VesselCompareList.join(',');
    document.getElementById('ysp_compare_linkout').innerHTML = "<button type=\"button\">Compare ( ".concat(YSP_VesselCompareList.length, " )</button>");
    var params = {
      'post__in': YSP_VesselCompareList
    };
    return rai_ysp_api.call_api("POST", "yachts", params).then(function (data_result) {
      data_result.results.forEach(function (item) {
        jQuery('#ysp-compare-previews').append(ysp_templates.yacht.compare_preview(item, params));
        var ele_preview = jQuery('#ysp-compare-previews [data-post-id=' + item._postID + ']');
        jQuery('.remove-from-compare', ele_preview).click(function () {
          console.log('hello');
          var ele_card = jQuery('#search-result-row [data-post-id=' + item._postID + ']');
          jQuery('.compare_toggle', ele_card).prop('checked', false).removeClass('armed');
          ysp_removeVesselToCompareList(item._postID);
          ysp_makeCompareLinkout();
        });
      });
    });
  } else {
    jQuery('#ysp-compare-previews').html('');
    jQuery('#ysp_compare_linkout').html('');
  }
}
var yspBeforeYachtSearch = new Event("ysp-before-submitting-yacht-search");
var yspAfterYachtSearch = new Event("ysp-after-submitting-yacht-search");
var yspAfterRenderingYacht = new Event("ysp-after-rendering-yacht-search");
function ysp_yacht_search_and_reader(data) {
  console.log(data);
  jQuery('#search-result-row').html('');
  document.querySelector('#search-result-section').classList.remove('loaded');
  document.querySelector('#search-result-section').classList.add('loading');
  raiys_set_form_to_data(data);
  ysp_makeSearchTags(data);

  // GET AND WRITE
  return rai_ysp_api.call_api("POST", "yachts", data).then(function (data_result) {
    document.querySelector('#search-result-section').classList.remove('loading');
    document.querySelector('#search-result-section').classList.add('loaded');
    document.title = data_result.SEO.title;
    jQuery('#ysp-search-heading').text(data_result.SEO.heading);
    jQuery('#ysp-search-paragraph').text(data_result.SEO.gpt_p);
    jQuery('#total-results').text(new Intl.NumberFormat('en-IN', {
      maximumSignificantDigits: 3
    }).format(data_result.total));
    var currentURL = null;
    if (typeof data.dont_push == 'undefined') {
      currentURL = raiys_push_history(data);
    } else {
      currentURL = location.href;
    }
    jQuery('#yachts-pagination').html('');
    if (data_result.total > 0) {
      data_result.results.forEach(function (item) {
        if (typeof data.view != 'undefined' && data.view.toLowerCase() == 'list') {
          jQuery('#search-result-row').append(ysp_templates.yacht.list(item, data));
        } else {
          jQuery('#search-result-row').append(ysp_templates.yacht.grid(item, data));
        }
        var ele_card = jQuery('#search-result-row [data-post-id=' + item._postID + ']');
        jQuery('[data-modal]', ele_card).click(function (e) {
          e.preventDefault();
          var vesselInfo = item.ModelYear + ' ' + item.MakeString + ' ' + item.BoatName;
          jQuery('#yatchHidden').val(vesselInfo);
          var data_modal = jQuery(this).data('modal');
          jQuery(data_modal).ysp_modal({
            closeText: 'X',
            modalClass: 'ysp-modal-open',
            closeClass: 'ysp-model-close'
          });
        });
        ysp_markLovedVessel(ele_card);
        ysp_makeCompareVessel(ele_card);
      });
      jQuery('#yachts-pagination').pagination({
        items: data_result.total,
        itemsOnPage: 12,
        currentPage: data.page_index,
        prevText: ysp_templates.pagination.prev_text,
        nextText: ysp_templates.pagination.next_text,
        edges: 4,
        displayedPages: 4,
        hrefTextPrefix: currentURL.replace(new RegExp("page_index-(\\d*)(/)", "g"), "") + 'page_index-',
        hrefTextSuffix: '/',
        onPageClick: function onPageClick(pageNumber, event) {
          event.preventDefault();
          document.querySelector('.ysp-yacht-search-form input[name=page_index]').value = pageNumber;
          var formDataObject = raiys_get_form_data(document.querySelector('.ysp-yacht-search-form'));
          ysp_yacht_search_and_reader(formDataObject);
        }
      });
    } else {
      jQuery('#search-result-row').append(ysp_templates.noResults());
    }
    jQuery([document.documentElement, document.body]).animate({
      scrollTop: jQuery(".scroll-to-here-on-yacht-search").offset().top
    }, 250);
    document.querySelector('.ysp-yacht-search-form:not(#ysp-mobile-yacht-search-form)').dispatchEvent(yspAfterRenderingYacht);
    return data_result;
  })["catch"](function (error) {
    console.log(error);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  // Fill List Options
  var FillLists = [];
  var listElements = document.querySelectorAll("datalist[data-fill-list]");
  var listNeededElements = document.querySelectorAll("input[list]");
  listElements.forEach(function (ele) {
    FillLists.push(ele.getAttribute('data-fill-list'));
  });
  listNeededElements.forEach(function (input_ele) {
    input_ele.addEventListener('input', function (event) {
      var list_id = event.target.getAttribute('list');
      var ele_list = document.querySelector("datalist#" + list_id);
      if (event.target.value.length <= 3) {
        rai_ysp_api.call_api('POST', 'list-options-with-value', {
          labels: [ele_list.getAttribute('data-fill-list')],
          value: event.target.value
        }).then(function (rOptions) {
          var _loop3 = function _loop3() {
            var SelectorEle = document.querySelectorAll("datalist[data-fill-list='" + label + "']");
            SelectorEle.forEach(function (ele) {
              ele.innerHTML = '';
            });
            rOptions[label].forEach(function (b) {
              var option = document.createElement("OPTION");
              option.text = b;
              option.value = b;
              SelectorEle.forEach(function (ele) {
                ele.append(option);
              });
            });
          };
          for (var label in rOptions) {
            _loop3();
          }
        });
      }
    });
  });

  /*    rai_ysp_api.call_api('POST', 'list-options', {labels: FillLists}).then(function(rOptions) {
          for (let label in rOptions) {
  
              let SelectorEle = document.querySelectorAll("datalist[data-fill-list='"+ label +"']");
  
              rOptions[label].forEach(function(b) {
  
                  let option = document.createElement("OPTION");
  
                      option.text = b;
                      option.value = b;
  
                  SelectorEle.forEach((ele) => {
                      ele.append(option);
                  });
              });
          }
      });
  */
  var yachtSearchAndResults = document.querySelector('.ysp-yacht-search-form:not(#ysp-mobile-yacht-search-form)');
  if (yachtSearchAndResults) {
    document.querySelectorAll('.open-mobile-search').forEach(function (omse) {
      omse.addEventListener('click', function (e) {
        document.querySelector('#ysp-super-mobile-search').style.display = 'block';
        document.querySelector('body').style.overflowY = 'hidden';
        document.querySelector('body').classList.add('ysp-mobile-yacht-search-open');
      });
    });
    if (document.querySelector('#close-mobile-search')) {
      document.querySelector('#close-mobile-search').addEventListener('click', function (e) {
        document.querySelector('#ysp-super-mobile-search').style.display = 'none';
        document.querySelector('body').style.overflowY = 'unset';
        document.querySelector('body').classList.remove('ysp-mobile-yacht-search-open');
      });
    }
    yachtSearchAndResults.addEventListener('submit', function (e) {
      e.preventDefault();
      e.target.dispatchEvent(yspBeforeYachtSearch);
      e.target.querySelector('input[name=page_index]').value = 1;
      var params = raiys_get_form_data(e.target);
      ysp_yacht_search_and_reader(params).then(function (api_data) {
        e.target.dispatchEvent(yspAfterYachtSearch);
      });
    });
    yachtSearchAndResults.querySelectorAll('input.submit-on-change').forEach(function (eleInput) {
      eleInput.addEventListener('change', function (e) {
        e.target.form.requestSubmit();
      });
    });
    yachtSearchAndResults.querySelectorAll('input[type=reset]').forEach(function (eleReset) {
      eleReset.addEventListener('click', function (e) {
        e.target.form.requestSubmit();
      });
    });
    if (document.querySelector('input[name="ys_company_only"]')) {
      document.querySelectorAll('input[name="ys_company_only"]').forEach(function (eleCheck) {
        eleCheck.addEventListener('change', function (e) {
          e.target.form.requestSubmit();
        });
      });
    }
    document.querySelectorAll('input[name=view][form=ysp-yacht-search-form], select[name=sortby][form=ysp-yacht-search-form]').forEach(function (eleViewOption) {
      eleViewOption.addEventListener('change', function (e) {
        e.target.form.requestSubmit();
      });
    });
    document.querySelectorAll('.pick-all').forEach(function (ele) {
      ele.addEventListener('click', function (e) {
        var input_name = e.target.getAttribute('name');
        document.querySelectorAll('input[name="' + input_name + '"]').forEach(function (eleInput) {
          eleInput.checked = false;
        });
      });
    });

    // PRETTY URL
    var strpaths = window.location.href;
    strpaths = strpaths.replace(rai_yacht_sync.yacht_search_page_id, '');
    var paths = strpaths.split("/");
    var pretty_url_path_params = {};
    paths.forEach(function (path) {
      if (path != '') {
        var phase_path = path.split('-');
        var only_vals = phase_path.slice(1);
        only_vals = only_vals.join(' ').eachWordCapitalize();
        var only_vals_array = only_vals.split('+');
        if (typeof only_vals_array[1] != 'undefined') {
          only_vals = only_vals_array.map(function (ov) {
            return ov.eachWordCapitalize();
          });

          //console.log(only_vals);
        }

        pretty_url_path_params[phase_path[0]] = only_vals;
      }
    });

    //console.log(pretty_url_path_params);

    // Restore Fields

    var URLREF = new URL(location.href); // maybe for a re-do

    var formInputs = document.querySelectorAll('.ysp-yacht-search-form *[name], *[name][form="ysp-yacht-search-form"], #ysp-mobile-yacht-search-form *[name], *[name][form="ysp-mobile-yacht-search-form"]');
    formInputs.forEach(function (ele) {
      var input = ele;
      var name = ele.getAttribute('name');
      var urlVal = URLREF.searchParams.get(name);
      // urlVal = ;

      var hasPretty = pretty_url_path_params[name];

      // console.log(hasPretty);

      if (typeof hasPretty != 'null' && typeof hasPretty != 'undefined') {
        if (Array.isArray(hasPretty)) {
          //console.log(hasPretty);

          hasPretty.forEach(function (hP) {
            if (typeof input.type != 'undefined' && (input.type == 'checkbox' || input.type == 'radio') && input.getAttribute('value') == hP) {
              input.checked = true;
            }
          });
        } else {
          if (typeof input.type != 'undefined' && (input.type == 'checkbox' || input.type == 'radio') && input.getAttribute('value') == hasPretty) {
            input.checked = true;
          } else if (input.type != 'checkbox' && input.type != 'radio') {
            input.value = hasPretty;
          }
        }
      }
      if (urlVal != '' && urlVal != null) {
        if (typeof urlVal == 'string') {
          urlVal = urlVal.eachWordCapitalize();
        }
        if (typeof input.type != 'undefined' && (input.type == 'checkbox' || input.type == 'radio') && input.getAttribute('value') == urlVal) {
          input.checked = true;
        } else if (input.type != 'checkbox' && input.type != 'radio') {
          input.value = urlVal;
        }
      }
    });

    // Restore Compare
    ysp_restoreCompares();

    // Fill options
    var FillOptions = [];
    var selectorElements = document.querySelectorAll("select[data-fill-options]");
    selectorElements.forEach(function (ele) {
      FillOptions.push(ele.getAttribute('data-fill-options'));
    });
    rai_ysp_api.call_api('POST', 'dropdown-options', {
      labels: FillOptions
    }).then(function (rOptions) {
      var _loop4 = function _loop4() {
        var SelectorEle = document.querySelectorAll("select[data-fill-options='" + label + "']");
        console.log(SelectorEle);
        var name = SelectorEle[0].getAttribute('name');
        rOptions[label].forEach(function (b) {
          SelectorEle.forEach(function (ele) {
            var option = document.createElement("OPTION");
            option.text = b;
            option.value = b;
            ele.add(option);
          });
        });
        var URLREF = new URL(location.href);
        var UrlVal = URLREF.searchParams.get(name);
        var strpaths = window.location.href;
        strpaths = strpaths.replace(rai_yacht_sync.yacht_search_page_id, '');
        var paths = strpaths.split("/");
        var pretty_url_path_params = {};
        paths.forEach(function (path) {
          if (path != '') {
            var phase_path = path.split('-');
            var only_vals = phase_path.slice(1);
            pretty_url_path_params[phase_path[0]] = only_vals.join(' ');
            if (typeof pretty_url_path_params[phase_path[0]] == 'string') {
              pretty_url_path_params[phase_path[0]] = pretty_url_path_params[phase_path[0]].eachWordCapitalize();
            }
          }
        });
        if (UrlVal != '' && UrlVal != null) {
          //console.log(UrlVal);

          if (typeof UrlVal == 'string') {
            UrlVal = UrlVal.eachWordCapitalize();
          }
          SelectorEle.forEach(function (ele) {
            ele.value = UrlVal;
            if (ele.value == '') {
              ele.value = UrlVal.toUpperCase();
            }
          });
        }
        var hasPretty = pretty_url_path_params[name];

        //console.log( pretty_url_path_params[ name ]);

        if (hasPretty != '' && hasPretty != null) {
          SelectorEle.forEach(function (ele) {
            ele.value = hasPretty;
            if (ele.value == '') {
              ele.value = hasPretty.toUpperCase();
            }
          });
        }
      };
      for (var label in rOptions) {
        _loop4();
      }
    }).then(function () {
      // Render Yachts For Page Load
      var params = raiys_get_form_data(document.querySelector('.ysp-yacht-search-form'));
      console.log(params);

      // Liked / Loved 
      if (typeof params.ys_yachts_loved != 'undefined') {
        var loved_yachts = JSON.parse(localStorage.getItem('ysp_loved_vessels'));
        if (loved_yachts.length > 0) {
          params.ys_only_these = loved_yachts.join(',');
        } else {
          params.ys_only_these = "0,0,0";
        }
      }
      ysp_yacht_search_and_reader(params);
    });
    var mobileForm = document.querySelector('#ysp-mobile-yacht-search-form');
    if (mobileForm) {
      mobileForm.addEventListener('submit', function (e) {
        e.preventDefault();
        e.target.querySelector('input[name=page_index]').value = 1;
        document.querySelector('#ysp-super-mobile-search').style.display = 'none';
        document.querySelector('body').style.overflowY = 'unset';
        var params = raiys_get_form_data(e.target);
        ysp_yacht_search_and_reader(params);
      });
    }
  }
});
document.addEventListener('DOMContentLoaded', function () {
  function handleSubmit(e, apiEndpoint) {
    e.preventDefault();
    var formData = raiys_get_form_data(e.target);
    var successMessage = e.target.parentElement.querySelector('.success-message');
    console.log(formData);
    rai_ysp_api.call_api("POST", apiEndpoint, formData).then(function (data_result) {
      successMessage.style.display = 'block';
      e.target.style.display = 'none';
    })["catch"](function (error) {
      console.log(error);
    });
  }
  var yachtForms = document.querySelectorAll('.single-yacht-detils-lead');
  yachtForms.forEach(function (fEle) {
    fEle.addEventListener('submit', function (e) {
      handleSubmit(e, "yacht-leads");
    });
  });
  var brokerForms = document.querySelectorAll('.single-broker-detils-lead');
  brokerForms.forEach(function (fEle) {
    fEle.addEventListener('submit', function (e) {
      handleSubmit(e, "broker-leads");
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS1wYWdpbmF0aW9uLmpzIiwianF1ZXJ5LW1vZGFsLmpzIiwiZnNsaWdodGJveC1iYXNpYy5qcyIsIndoYXRldmVyLmpzIiwiY29tbW9uLmpzIiwiYXBpLWNsaWVudC5qcyIsInRlbXBsYXRlcy5qcyIsImZpbGwtZmllbGRzLmpzIiwieWFjaHRTZWFyY2hUYWdzLmpzIiwieWFjaHRTZWFyY2hMb3ZlZC5qcyIsInlhY2h0U2VhcmNoQ29tcGFyZS5qcyIsInlhY2h0U2VhcmNoLmpzIiwibGVhZHMuanMiXSwibmFtZXMiOlsiJCIsIm1ldGhvZHMiLCJpbml0Iiwib3B0aW9ucyIsIm8iLCJleHRlbmQiLCJpdGVtcyIsIml0ZW1zT25QYWdlIiwicGFnZXMiLCJkaXNwbGF5ZWRQYWdlcyIsImVkZ2VzIiwiY3VycmVudFBhZ2UiLCJ1c2VBbmNob3JzIiwiaHJlZlRleHRQcmVmaXgiLCJocmVmVGV4dFN1ZmZpeCIsInByZXZUZXh0IiwibmV4dFRleHQiLCJlbGxpcHNlVGV4dCIsImVsbGlwc2VQYWdlU2V0IiwiY3NzU3R5bGUiLCJsaXN0U3R5bGUiLCJsYWJlbE1hcCIsInNlbGVjdE9uQ2xpY2siLCJuZXh0QXRGcm9udCIsImludmVydFBhZ2VPcmRlciIsInVzZVN0YXJ0RWRnZSIsInVzZUVuZEVkZ2UiLCJvblBhZ2VDbGljayIsInBhZ2VOdW1iZXIiLCJldmVudCIsIm9uSW5pdCIsInNlbGYiLCJNYXRoIiwiY2VpbCIsImhhbGZEaXNwbGF5ZWQiLCJlYWNoIiwiYWRkQ2xhc3MiLCJkYXRhIiwiX2RyYXciLCJjYWxsIiwic2VsZWN0UGFnZSIsInBhZ2UiLCJfc2VsZWN0UGFnZSIsInByZXZQYWdlIiwibmV4dFBhZ2UiLCJnZXRQYWdlc0NvdW50Iiwic2V0UGFnZXNDb3VudCIsImNvdW50IiwiZ2V0Q3VycmVudFBhZ2UiLCJkZXN0cm95IiwiZW1wdHkiLCJkcmF3UGFnZSIsInJlZHJhdyIsImRpc2FibGUiLCJkaXNhYmxlZCIsImVuYWJsZSIsInVwZGF0ZUl0ZW1zIiwibmV3SXRlbXMiLCJfZ2V0UGFnZXMiLCJ1cGRhdGVJdGVtc09uUGFnZSIsImdldEl0ZW1zT25QYWdlIiwiaW50ZXJ2YWwiLCJfZ2V0SW50ZXJ2YWwiLCJpIiwidGFnTmFtZSIsInByb3AiLCJhdHRyIiwiJHBhbmVsIiwiYXBwZW5kVG8iLCJfYXBwZW5kSXRlbSIsInRleHQiLCJjbGFzc2VzIiwic3RhcnQiLCJlbmQiLCJtaW4iLCJhcHBlbmQiLCJiZWdpbiIsIm1heCIsIl9lbGxpcHNlQ2xpY2siLCJwYWdlSW5kZXgiLCJvcHRzIiwiJGxpbmsiLCIkbGlua1dyYXBwZXIiLCIkdWwiLCJmaW5kIiwibGVuZ3RoIiwiY2xpY2siLCIkZWxsaXAiLCJwYXJlbnQiLCJyZW1vdmVDbGFzcyIsIiR0aGlzIiwidmFsIiwicGFyc2VJbnQiLCJwcmV2IiwiaHRtbCIsImZvY3VzIiwic3RvcFByb3BhZ2F0aW9uIiwia2V5dXAiLCJ3aGljaCIsImJpbmQiLCJmbiIsInBhZ2luYXRpb24iLCJtZXRob2QiLCJjaGFyQXQiLCJhcHBseSIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJhcmd1bWVudHMiLCJfdHlwZW9mIiwiZXJyb3IiLCJqUXVlcnkiLCJmYWN0b3J5IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJ3aW5kb3ciLCJkb2N1bWVudCIsInVuZGVmaW5lZCIsIm1vZGFscyIsImdldEN1cnJlbnQiLCJzZWxlY3RDdXJyZW50Iiwic2VsZWN0ZWQiLCIkYmxvY2tlciIsInRvZ2dsZUNsYXNzIiwieXNwX21vZGFsIiwiZWwiLCJyZW1vdmUiLCJ0YXJnZXQiLCIkYm9keSIsImRlZmF1bHRzIiwiZG9GYWRlIiwiaXNOYU4iLCJmYWRlRHVyYXRpb24iLCJjbG9zZUV4aXN0aW5nIiwiaXNBY3RpdmUiLCJjbG9zZSIsInB1c2giLCJpcyIsImFuY2hvciIsInRlc3QiLCIkZWxtIiwib3BlbiIsIm1vZGFsIiwiZWxtIiwic2hvd1NwaW5uZXIiLCJ0cmlnZ2VyIiwiQUpBWF9TRU5EIiwiZ2V0IiwiZG9uZSIsIkFKQVhfU1VDQ0VTUyIsImN1cnJlbnQiLCJvbiIsIkNMT1NFIiwiaGlkZVNwaW5uZXIiLCJBSkFYX0NPTVBMRVRFIiwiZmFpbCIsIkFKQVhfRkFJTCIsInBvcCIsImNvbnN0cnVjdG9yIiwibSIsImJsb2NrIiwiYmx1ciIsInNldFRpbWVvdXQiLCJzaG93IiwiZmFkZURlbGF5Iiwib2ZmIiwiZXNjYXBlQ2xvc2UiLCJjbGlja0Nsb3NlIiwiZSIsInVuYmxvY2siLCJoaWRlIiwiQkVGT1JFX0JMT0NLIiwiX2N0eCIsImNzcyIsImJsb2NrZXJDbGFzcyIsImFuaW1hdGUiLCJvcGFjaXR5IiwiQkxPQ0siLCJub3ciLCJmYWRlT3V0IiwiY2hpbGRyZW4iLCJCRUZPUkVfT1BFTiIsInNob3dDbG9zZSIsImNsb3NlQnV0dG9uIiwiY2xvc2VDbGFzcyIsImNsb3NlVGV4dCIsIm1vZGFsQ2xhc3MiLCJkaXNwbGF5IiwiT1BFTiIsIkJFRk9SRV9DTE9TRSIsIl90aGlzIiwiQUZURVJfQ0xPU0UiLCJzcGlubmVyIiwic3Bpbm5lckh0bWwiLCIkYW5jaG9yIiwicHJldmVudERlZmF1bHQiLCJ0IiwiZGVmaW5lIiwiYW1kIiwibiIsImwiLCJjIiwiZCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwiX19lc01vZHVsZSIsImNyZWF0ZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJjb25jYXQiLCJhIiwidSIsImYiLCJoIiwiZyIsInYiLCJiIiwieCIsInkiLCJ3IiwiaXRlcmF0b3IiLCJTIiwic3RhZ2VJbmRleGVzIiwiY29yZSIsInN0YWdlTWFuYWdlciIsInByb3BzIiwic291cmNlcyIsImdldFByZXZpb3VzU2xpZGVJbmRleCIsImdldE5leHRTbGlkZUluZGV4IiwidXBkYXRlU3RhZ2VJbmRleGVzIiwibmV4dCIsInByZXZpb3VzIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImFwcGVuZENoaWxkIiwiY3JlYXRlVGV4dE5vZGUiLCJoZWFkIiwiTCIsImdldFNvdXJjZVR5cGVGcm9tTG9jYWxTdG9yYWdlQnlVcmwiLCJoYW5kbGVSZWNlaXZlZFNvdXJjZVR5cGVGb3JVcmwiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImRpc2FibGVMb2NhbFN0b3JhZ2UiLCJwYXJzZSIsImdldEl0ZW0iLCJBIiwiZWxlbWVudHMiLCJhZGp1c3RTaXplIiwibWF4U291cmNlV2lkdGgiLCJtYXhTb3VyY2VIZWlnaHQiLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwiQyIsImNvbGxlY3Rpb25zIiwic291cmNlU2l6ZXJzIiwic291cmNlQW5pbWF0aW9uV3JhcHBlcnMiLCJpc2wiLCJyZXNvbHZlIiwicnVuQWN0aW9ucyIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZUNoaWxkIiwiZmlyc3RDaGlsZCIsIkUiLCJoYW5kbGVJbWFnZUxvYWQiLCJuYXR1cmFsV2lkdGgiLCJuYXR1cmFsSGVpZ2h0IiwiaGFuZGxlVmlkZW9Mb2FkIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwiaGFuZGxlTm90TWV0YURhdGVkVmlkZW9Mb2FkIiwiaGFuZGxlWW91dHViZUxvYWQiLCJtYXhZb3V0dWJlRGltZW5zaW9ucyIsImhhbmRsZUN1c3RvbUxvYWQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsIkYiLCJjdXN0b21DbGFzc2VzIiwiSSIsImN1c3RvbUF0dHJpYnV0ZXMiLCJzZXRBdHRyaWJ1dGUiLCJUIiwic291cmNlTG9hZEhhbmRsZXJzIiwic3JjIiwib25sb2FkIiwiTiIsInZpZGVvc1Bvc3RlcnMiLCJvbmxvYWRlZG1ldGFkYXRhIiwiY29udHJvbHMiLCJwb3N0ZXIiLCJ6Iiwic3BsaXQiLCJtYXRjaCIsImFsbG93RnVsbHNjcmVlbiIsIlAiLCJrIiwiaW5uZXJIVE1MIiwiSCIsInNvdXJjZXNSZW5kZXJGdW5jdGlvbnMiLCJzb3VyY2VEaXNwbGF5RmFjYWRlIiwicnVuQWN0aW9uc0ZvclNvdXJjZVR5cGVBbmRJbmRleCIsImRpc3BsYXlTb3VyY2VzV2hpY2hTaG91bGRCZURpc3BsYXllZCIsIlciLCJpc1VybFlvdXR1YmVPbmUiLCJocmVmIiwiaG9zdG5hbWUiLCJnZXRUeXBlRnJvbVJlc3BvbnNlQ29udGVudFR5cGUiLCJpbmRleE9mIiwicmVhZHlTdGF0ZSIsImdldFJlc3BvbnNlSGVhZGVyIiwib25yZWFkeXN0YXRlY2hhbmdlIiwiYWJvcnQiLCJzZXRVcmxUb0NoZWNrIiwiZ2V0U291cmNlVHlwZSIsIlhNTEh0dHBSZXF1ZXN0Iiwic2VuZCIsIlIiLCJ0eXBlcyIsInR5cGUiLCJnZXRUeXBlU2V0QnlDbGllbnRGb3JJbmRleCIsInJldHJpZXZlVHlwZVdpdGhYaHJGb3JJbmRleCIsIkQiLCJzbXciLCJzb3VyY2VXcmFwcGVyc0NvbnRhaW5lciIsInRyYW5zZm9ybSIsInNsaWRlRGlzdGFuY2UiLCJpbm5lcldpZHRoIiwicmVtb3ZlUHJvcGVydHkiLCJuZSIsIk8iLCJjcmVhdGVFbGVtZW50TlMiLCJzZXRBdHRyaWJ1dGVOUyIsIk0iLCJ0aXRsZSIsImoiLCJjb21wb25lbnRzU2VydmljZXMiLCJmcyIsIm9mcyIsImlmcyIsInhmcyIsIm9uY2xpY2siLCJsaWdodGJveENsb3NlciIsImNsb3NlTGlnaHRib3giLCJYIiwiY29udGFpbmVyIiwic2V0U2xpZGVOdW1iZXIiLCJqdXN0aWZ5Q29udGVudCIsIkIiLCJ0b1VwcGVyQ2FzZSIsIlUiLCJzbGlkZUNoYW5nZUZhY2FkZSIsImxpc3RlbmVyIiwia2V5IiwiY2hhbmdlVG9QcmV2aW91cyIsImNoYW5nZVRvTmV4dCIsInEiLCJzb3VyY2VQb2ludGVyUHJvcHMiLCJzd2lwZWRYIiwicnVuQWN0aW9uc0ZvckV2ZW50IiwiY29udGFpbnMiLCJzbGlkZVN3aXBpbmdIb3ZlcmVyIiwic2NyZWVuWCIsImRvd25TY3JlZW5YIiwiViIsImlzUG9pbnRlcmluZyIsIl8iLCJzbGlkZUluZGV4Q2hhbmdlciIsInN3cyIsInJ1blBvc2l0aXZlU3dpcGVkWEFjdGlvbnMiLCJjaGFuZ2VUbyIsInJ1bk5lZ2F0aXZlU3dpcGVkWEFjdGlvbnMiLCJZIiwiSiIsInJ1bk5vU3dpcGVBY3Rpb25zIiwiaXNTb3VyY2VEb3duRXZlbnRUYXJnZXQiLCJHIiwiZXZlbnRzRGlzcGF0Y2hlciIsImdsb2JhbEV2ZW50c0NvbnRyb2xsZXIiLCJzY3JvbGxiYXJSZWNvbXBlbnNvciIsImlzTGlnaHRib3hGYWRpbmdPdXQiLCJyZW1vdmVMaXN0ZW5lcnMiLCJleGl0RnVsbHNjcmVlbk9uQ2xvc2UiLCJkb2N1bWVudEVsZW1lbnQiLCJyZW1vdmVSZWNvbXBlbnNlIiwiYm9keSIsImRpc3BhdGNoIiwiSyIsIlEiLCJmdWxsc2NyZWVuRWxlbWVudCIsIndlYmtpdElzRnVsbFNjcmVlbiIsIm1vekZ1bGxTY3JlZW4iLCJtc0Z1bGxzY3JlZW5FbGVtZW50IiwicmVxdWVzdEZ1bGxzY3JlZW4iLCJtb3pSZXF1ZXN0RnVsbFNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwibXNSZXF1ZXN0RnVsbHNjcmVlbiIsImV4aXRGdWxsc2NyZWVuIiwibW96Q2FuY2VsRnVsbFNjcmVlbiIsIndlYmtpdEV4aXRGdWxsc2NyZWVuIiwibXNFeGl0RnVsbHNjcmVlbiIsIndpbmRvd1Jlc2l6ZUFjdGlvbmVyIiwiYXR0YWNoTGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJpbm5lckhlaWdodCIsIm1hcmdpblJpZ2h0Iiwic2Nyb2xsYmFyV2lkdGgiLCJhZGRSZWNvbXBlbnNlIiwianVtcFRvIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic291cmNlc1BvaW50ZXJEb3duIiwibG9hZE9ubHlDdXJyZW50U291cmNlIiwiWiIsInZpc2liaWxpdHkiLCJtc092ZXJmbG93U3R5bGUiLCJvdmVyZmxvdyIsImVlIiwidGUiLCJSZWZsZWN0IiwiY29uc3RydWN0IiwiRnVuY3Rpb24iLCJzaGFtIiwiUHJveHkiLCJCb29sZWFuIiwidmFsdWVPZiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwib2UiLCJpc0FycmF5IiwiaWUiLCJmcm9tIiwidG9TdHJpbmciLCJuYW1lIiwiVHlwZUVycm9yIiwicmUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImhhc0F0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZSIsImNvbnNvbGUiLCJ3YXJuIiwiZnNMaWdodGJveEluc3RhbmNlcyIsIkZzTGlnaHRib3giLCJnZXRFbGVtZW50QnlJZCIsInN1YnN0cmluZyIsImNsb25lTm9kZSIsInJlbW92ZUF0dHJpYnV0ZSIsImF0dHJpYnV0ZXMiLCJzdWJzdHIiLCJrZXlzIiwiZnNMaWdodGJveCIsImlzRnVsbHNjcmVlbk9wZW4iLCJ1bnNoaWZ0IiwibGlnaHRib3hVcGRhdGVyIiwicmVmcmVzaEZzTGlnaHRib3giLCJyZWFkeSIsImxvZyIsImRhdGFfbW9kYWwiLCJjb3B5TGluayIsImNvcHlUZXh0Iiwic2VsZWN0Iiwic2V0U2VsZWN0aW9uUmFuZ2UiLCJleGVjQ29tbWFuZCIsImFsZXJ0IiwiU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJtYXAiLCJqb2luIiwicmFpeXNfZ2V0X2Zvcm1fZGF0YSIsImZvcm1fZWxlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImZkIiwiZnJvbUVudHJpZXMiLCJlbnRyaWVzIiwiX2kiLCJfT2JqZWN0JGVudHJpZXMiLCJfT2JqZWN0JGVudHJpZXMkX2kiLCJfc2xpY2VkVG9BcnJheSIsImZJbmRleCIsImZpZWxkIiwiVmFsQXJyYXkiLCJnZXRBbGwiLCJyYWl5c19zZXRfZm9ybV90b19kYXRhIiwiaW5wdXREYXRhIiwiZm9ybUEiLCJxdWVyeVNlbGVjdG9yIiwiZm9ybUIiLCJyZXNldCIsImZvcm1JbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZSIsImlucHV0IiwiaGFzUHJldHR5IiwiaFAiLCJjaGVja2VkIiwicmFpeXNfcHVzaF9oaXN0b3J5Iiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwic3RycGF0aCIsInByb3BlcnR5IiwiaXQiLCJzZXQiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmFpX3lhY2h0X3N5bmMiLCJ5YWNodF9zZWFyY2hfdXJsIiwicmFpX3lzcF9hcGkiLCJjYWxsX2FwaSIsInBhdGgiLCJwYXNzaW5nX2RhdGEiLCJ4aHR0cCIsIlByb21pc2UiLCJyZWplY3QiLCJzdGF0dXMiLCJyZXNwb25zZURhdGEiLCJyZXNwb25zZVRleHQiLCJfcXVlc3Rpb25NYXJrIiwid3BfcmVzdF91cmwiLCJzZXRSZXF1ZXN0SGVhZGVyIiwieXNwX3RlbXBsYXRlcyIsInlhY2h0IiwiZ3JpZCIsInZlc3NlbCIsInBhcmFtcyIsIm1ldGVycyIsIk5vbWluYWxMZW5ndGgiLCJwcmljZSIsImV1cm9wZV9vcHRpb25fcGlja2VkIiwidG9GaXhlZCIsIllTUF9FdXJvVmFsIiwiSW50bCIsIk51bWJlckZvcm1hdCIsIm1pbmltdW1GcmFjdGlvbkRpZ2l0cyIsImZvcm1hdCIsImN1cnJlbmN5IiwiWVNQX1VTRFZhbCIsIl9wb3N0SUQiLCJEb2N1bWVudElEIiwiX2xpbmsiLCJJbWFnZXMiLCJVcmkiLCJhc3NldHNfdXJsIiwiQ29tcGFueU5hbWUiLCJjb21wYW55X25hbWUiLCJjb21wYW55X2xvZ28iLCJNb2RlbFllYXIiLCJNYWtlU3RyaW5nIiwiTW9kZWwiLCJCb2F0TmFtZSIsIkNhYmluc0NvdW50TnVtZXJpYyIsImxpc3QiLCJQcmljZSIsImV1cm9fY19jIiwiY29tcGFyZV9wcmV2aWV3Iiwibm9SZXN1bHRzIiwieWFjaHRfdGFnIiwibGFiZWwiLCJuZXh0X3RleHQiLCJwcmV2X3RleHQiLCJlbGVfcXVpY2tfc2VhcmNoIiwiRmlsbE9wdGlvbnMiLCJzZWxlY3RvckVsZW1lbnRzIiwibGFiZWxzIiwidGhlbiIsInJPcHRpb25zIiwiX2xvb3AiLCJTZWxlY3RvckVsZSIsIm9wdGlvbiIsIlVSTFJFRiIsIlVSTCIsImxvY2F0aW9uIiwiVXJsVmFsIiwic3RycGF0aHMiLCJyZXBsYWNlIiwieWFjaHRfc2VhcmNoX3BhZ2VfaWQiLCJwYXRocyIsInByZXR0eV91cmxfcGF0aF9wYXJhbXMiLCJwaGFzZV9wYXRoIiwib25seV92YWxzIiwiZWFjaFdvcmRDYXBpdGFsaXplIiwieXNwX21ha2VTZWFyY2hUYWdzIiwidGFnc0VsZSIsInlzcF90YWdzX25vdF9wcmludCIsIl9sb29wMiIsInBhcmFtS2V5IiwiaW5uZXJUZXh0IiwiZWxlSW5wdXQiLCJuZXdUYWdFbGUiLCJ0YWdWYWwiLCJzZWxlY3RlZEluZGV4IiwiZWxlVW5pdCIsInlzcFRhZ0VsZSIsImN1cnJlbnRUYXJnZXQiLCJpbnB1dEVsZXMiLCJlbGVJIiwiZm9ybSIsInJlcXVlc3RTdWJtaXQiLCJ5c3BfbWFya0xvdmVkVmVzc2VsIiwiZWxlX2NhcmQiLCJ5YWNodElkIiwiaGFzQ2xhc3MiLCJ5c3BfYWRkTG92ZWRWZXNzZWwiLCJ5c3BfcmVtb3ZlTG92ZWRWZXNzZWwiLCJ5c195YWNodHNfbG92ZWQiLCJsb3ZlZFZlc3NlbHMiLCJpbmRleGVkIiwic3BsaWNlIiwiWVNQX1Zlc3NlbENvbXBhcmVMaXN0IiwieXNwX3Jlc3RvcmVDb21wYXJlcyIsImNvbXBhcmVfcG9zdF9pZHMiLCJ5c3BfbWFrZUNvbXBhcmVMaW5rb3V0IiwieXNwX21ha2VDb21wYXJlVmVzc2VsIiwiY2hhbmdlIiwieXNwX2FkZFZlc3NlbFRvQ29tcGFyZUxpc3QiLCJ5c3BfcmVtb3ZlVmVzc2VsVG9Db21wYXJlTGlzdCIsImRhdGFfcmVzdWx0IiwicmVzdWx0cyIsIml0ZW0iLCJlbGVfcHJldmlldyIsInlzcEJlZm9yZVlhY2h0U2VhcmNoIiwiRXZlbnQiLCJ5c3BBZnRlcllhY2h0U2VhcmNoIiwieXNwQWZ0ZXJSZW5kZXJpbmdZYWNodCIsInlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlciIsIlNFTyIsImhlYWRpbmciLCJncHRfcCIsIm1heGltdW1TaWduaWZpY2FudERpZ2l0cyIsInRvdGFsIiwiY3VycmVudFVSTCIsImRvbnRfcHVzaCIsInZpZXciLCJ2ZXNzZWxJbmZvIiwicGFnZV9pbmRleCIsIlJlZ0V4cCIsImZvcm1EYXRhT2JqZWN0Iiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwiZGlzcGF0Y2hFdmVudCIsIkZpbGxMaXN0cyIsImxpc3RFbGVtZW50cyIsImxpc3ROZWVkZWRFbGVtZW50cyIsImlucHV0X2VsZSIsImxpc3RfaWQiLCJlbGVfbGlzdCIsIl9sb29wMyIsInlhY2h0U2VhcmNoQW5kUmVzdWx0cyIsIm9tc2UiLCJvdmVyZmxvd1kiLCJhcGlfZGF0YSIsImVsZVJlc2V0IiwiZWxlQ2hlY2siLCJlbGVWaWV3T3B0aW9uIiwiaW5wdXRfbmFtZSIsIm9ubHlfdmFsc19hcnJheSIsIm92IiwidXJsVmFsIiwiX2xvb3A0IiwibG92ZWRfeWFjaHRzIiwieXNfb25seV90aGVzZSIsIm1vYmlsZUZvcm0iLCJoYW5kbGVTdWJtaXQiLCJhcGlFbmRwb2ludCIsInN1Y2Nlc3NNZXNzYWdlIiwicGFyZW50RWxlbWVudCIsInlhY2h0Rm9ybXMiLCJmRWxlIiwiYnJva2VyRm9ybXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFBLFVBQUFBLENBQUEsRUFBQTtFQUVBLElBQUFDLE9BQUEsR0FBQTtJQUNBQyxJQUFBLEVBQUEsU0FBQUEsS0FBQUMsT0FBQSxFQUFBO01BQ0EsSUFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLE1BQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxXQUFBLEVBQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxjQUFBLEVBQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxXQUFBLEVBQUEsQ0FBQTtRQUNBQyxVQUFBLEVBQUEsSUFBQTtRQUNBQyxjQUFBLEVBQUEsUUFBQTtRQUNBQyxjQUFBLEVBQUEsRUFBQTtRQUNBQyxRQUFBLEVBQUEsTUFBQTtRQUNBQyxRQUFBLEVBQUEsTUFBQTtRQUNBQyxXQUFBLEVBQUEsVUFBQTtR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VUFBQW9ELFdBQUEsRUFBQTtNQUNBaUQsY0FBQSxDQUFBaGEsS0FBQSxDQUFBdkUsT0FBQSxHQUFBLE9BQUE7TUFDQW5CLENBQUEsQ0FBQXpDLE1BQUEsQ0FBQW1JLEtBQUEsQ0FBQXZFLE9BQUEsR0FBQSxNQUFBO0lBQ0EsQ0FBQSxDQUFBLFNBQ0EsQ0FBQSxVQUFBOUUsS0FBQSxFQUFBO01BQ0FrVixPQUFBLENBQUFpQixHQUFBLENBQUFuVyxLQUFBLENBQUE7SUFDQSxDQUFBLENBQUE7RUFDQTtFQUVBLElBQUF1akIsVUFBQSxHQUFBaGpCLFFBQUEsQ0FBQThYLGdCQUFBLENBQUEsMkJBQUEsQ0FBQTtFQUNBa0wsVUFBQSxDQUFBakwsT0FBQSxDQUFBLFVBQUFrTCxJQUFBLEVBQUE7SUFDQUEsSUFBQSxDQUFBMVEsZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQW5QLENBQUEsRUFBQTtNQUNBd2YsWUFBQSxDQUFBeGYsQ0FBQSxFQUFBLGFBQUEsQ0FBQTtJQUNBLENBQUEsQ0FBQTtFQUNBLENBQUEsQ0FBQTtFQUVBLElBQUE4ZixXQUFBLEdBQUFsakIsUUFBQSxDQUFBOFgsZ0JBQUEsQ0FBQSw0QkFBQSxDQUFBO0VBQ0FvTCxXQUFBLENBQUFuTCxPQUFBLENBQUEsVUFBQWtMLElBQUEsRUFBQTtJQUNBQSxJQUFBLENBQUExUSxnQkFBQSxDQUFBLFFBQUEsRUFBQSxVQUFBblAsQ0FBQSxFQUFBO01BQ0F3ZixZQUFBLENBQUF4ZixDQUFBLEVBQUEsY0FBQSxDQUFBO0lBQ0EsQ0FBQSxDQUFBO0VBQ0EsQ0FBQSxDQUFBO0FBQ0EsQ0FBQSxDQUFBIiwiZmlsZSI6Imdsb2JhbFBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiAvKipcbiogc2ltcGxlUGFnaW5hdGlvbi5qcyB2MS42XG4qIEEgc2ltcGxlIGpRdWVyeSBwYWdpbmF0aW9uIHBsdWdpbi5cbiogaHR0cDovL2ZsYXZpdXNtYXRpcy5naXRodWIuY29tL3NpbXBsZVBhZ2luYXRpb24uanMvXG4qXG4qIENvcHlyaWdodCAyMDEyLCBGbGF2aXVzIE1hdGlzXG4qIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiogaHR0cDovL2ZsYXZpdXNtYXRpcy5naXRodWIuY29tL2xpY2Vuc2UuaHRtbFxuKi9cblxuKGZ1bmN0aW9uKCQpe1xuXG5cdHZhciBtZXRob2RzID0ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0XHRcdHZhciBvID0gJC5leHRlbmQoe1xuXHRcdFx0XHRpdGVtczogMSxcblx0XHRcdFx0aXRlbXNPblBhZ2U6IDEsXG5cdFx0XHRcdHBhZ2VzOiAwLFxuXHRcdFx0XHRkaXNwbGF5ZWRQYWdlczogNSxcblx0XHRcdFx0ZWRnZXM6IDIsXG5cdFx0XHRcdGN1cnJlbnRQYWdlOiAwLFxuXHRcdFx0XHR1c2VBbmNob3JzOiB0cnVlLFxuXHRcdFx0XHRocmVmVGV4dFByZWZpeDogJyNwYWdlLScsXG5cdFx0XHRcdGhyZWZUZXh0U3VmZml4OiAnJyxcblx0XHRcdFx0cHJldlRleHQ6ICdQcmV2Jyxcblx0XHRcdFx0bmV4dFRleHQ6ICdOZXh0Jyxcblx0XHRcdFx0ZWxsaXBzZVRleHQ6ICcmaGVsbGlwOycsXG5cdFx0XHRcdGVsbGlwc2VQYWdlU2V0OiB0cnVlLFxuXHRcdFx0XHRjc3NTdHlsZTogJ2xpZ2h0LXRoZW1lJyxcblx0XHRcdFx0bGlzdFN0eWxlOiAnJyxcblx0XHRcdFx0bGFiZWxNYXA6IFtdLFxuXHRcdFx0XHRzZWxlY3RPbkNsaWNrOiB0cnVlLFxuXHRcdFx0XHRuZXh0QXRGcm9udDogZmFsc2UsXG5cdFx0XHRcdGludmVydFBhZ2VPcmRlcjogZmFsc2UsXG5cdFx0XHRcdHVzZVN0YXJ0RWRnZSA6IHRydWUsXG5cdFx0XHRcdHVzZUVuZEVkZ2UgOiB0cnVlLFxuXHRcdFx0XHRvblBhZ2VDbGljazogZnVuY3Rpb24ocGFnZU51bWJlciwgZXZlbnQpIHtcblx0XHRcdFx0XHQvLyBDYWxsYmFjayB0cmlnZ2VyZWQgd2hlbiBhIHBhZ2UgaXMgY2xpY2tlZFxuXHRcdFx0XHRcdC8vIFBhZ2UgbnVtYmVyIGlzIGdpdmVuIGFzIGFuIG9wdGlvbmFsIHBhcmFtZXRlclxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbkluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdC8vIENhbGxiYWNrIHRyaWdnZXJlZCBpbW1lZGlhdGVseSBhZnRlciBpbml0aWFsaXphdGlvblxuXHRcdFx0XHR9XG5cdFx0XHR9LCBvcHRpb25zIHx8IHt9KTtcblxuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0XHRvLnBhZ2VzID0gby5wYWdlcyA/IG8ucGFnZXMgOiBNYXRoLmNlaWwoby5pdGVtcyAvIG8uaXRlbXNPblBhZ2UpID8gTWF0aC5jZWlsKG8uaXRlbXMgLyBvLml0ZW1zT25QYWdlKSA6IDE7XG5cdFx0XHRpZiAoby5jdXJyZW50UGFnZSlcblx0XHRcdFx0by5jdXJyZW50UGFnZSA9IG8uY3VycmVudFBhZ2UgLSAxO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRvLmN1cnJlbnRQYWdlID0gIW8uaW52ZXJ0UGFnZU9yZGVyID8gMCA6IG8ucGFnZXMgLSAxO1xuXHRcdFx0by5oYWxmRGlzcGxheWVkID0gby5kaXNwbGF5ZWRQYWdlcyAvIDI7XG5cblx0XHRcdHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5hZGRDbGFzcyhvLmNzc1N0eWxlICsgJyBzaW1wbGUtcGFnaW5hdGlvbicpLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHNlbGYpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG8ub25Jbml0KCk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRzZWxlY3RQYWdlOiBmdW5jdGlvbihwYWdlKSB7XG5cdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgcGFnZSAtIDEpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHByZXZQYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlID4gMCkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlIC0gMSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlIDwgby5wYWdlcyAtIDEpIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0bmV4dFBhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPCBvLnBhZ2VzIC0gMSkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlICsgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlID4gMCkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlIC0gMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRnZXRQYWdlc0NvdW50OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5wYWdlcztcblx0XHR9LFxuXG5cdFx0c2V0UGFnZXNDb3VudDogZnVuY3Rpb24oY291bnQpIHtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLnBhZ2VzID0gY291bnQ7XG5cdFx0fSxcblxuXHRcdGdldEN1cnJlbnRQYWdlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJykuY3VycmVudFBhZ2UgKyAxO1xuXHRcdH0sXG5cblx0XHRkZXN0cm95OiBmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5lbXB0eSgpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGRyYXdQYWdlOiBmdW5jdGlvbiAocGFnZSkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uY3VycmVudFBhZ2UgPSBwYWdlIC0gMTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHJlZHJhdzogZnVuY3Rpb24oKXtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRkaXNhYmxlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0ZW5hYmxlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZUl0ZW1zOiBmdW5jdGlvbiAobmV3SXRlbXMpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLml0ZW1zID0gbmV3SXRlbXM7XG5cdFx0XHRvLnBhZ2VzID0gbWV0aG9kcy5fZ2V0UGFnZXMobyk7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHR9LFxuXG5cdFx0dXBkYXRlSXRlbXNPblBhZ2U6IGZ1bmN0aW9uIChpdGVtc09uUGFnZSkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uaXRlbXNPblBhZ2UgPSBpdGVtc09uUGFnZTtcblx0XHRcdG8ucGFnZXMgPSBtZXRob2RzLl9nZXRQYWdlcyhvKTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIDApO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGdldEl0ZW1zT25QYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5pdGVtc09uUGFnZTtcblx0XHR9LFxuXG5cdFx0X2RyYXc6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyXHRvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyksXG5cdFx0XHRcdGludGVydmFsID0gbWV0aG9kcy5fZ2V0SW50ZXJ2YWwobyksXG5cdFx0XHRcdGksXG5cdFx0XHRcdHRhZ05hbWU7XG5cblx0XHRcdG1ldGhvZHMuZGVzdHJveS5jYWxsKHRoaXMpO1xuXG5cdFx0XHR0YWdOYW1lID0gKHR5cGVvZiB0aGlzLnByb3AgPT09ICdmdW5jdGlvbicpID8gdGhpcy5wcm9wKCd0YWdOYW1lJykgOiB0aGlzLmF0dHIoJ3RhZ05hbWUnKTtcblxuXHRcdFx0dmFyICRwYW5lbCA9IHRhZ05hbWUgPT09ICdVTCcgPyB0aGlzIDogJCgnPHVsJyArIChvLmxpc3RTdHlsZSA/ICcgY2xhc3M9XCInICsgby5saXN0U3R5bGUgKyAnXCInIDogJycpICsgJz48L3VsPicpLmFwcGVuZFRvKHRoaXMpO1xuXG5cdFx0XHQvLyBHZW5lcmF0ZSBQcmV2IGxpbmtcblx0XHRcdGlmIChvLnByZXZUZXh0KSB7XG5cdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCAhby5pbnZlcnRQYWdlT3JkZXIgPyBvLmN1cnJlbnRQYWdlIC0gMSA6IG8uY3VycmVudFBhZ2UgKyAxLCB7dGV4dDogby5wcmV2VGV4dCwgY2xhc3NlczogJ3ByZXYnfSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIE5leHQgbGluayAoaWYgb3B0aW9uIHNldCBmb3IgYXQgZnJvbnQpXG5cdFx0XHRpZiAoby5uZXh0VGV4dCAmJiBvLm5leHRBdEZyb250KSB7XG5cdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCAhby5pbnZlcnRQYWdlT3JkZXIgPyBvLmN1cnJlbnRQYWdlICsgMSA6IG8uY3VycmVudFBhZ2UgLSAxLCB7dGV4dDogby5uZXh0VGV4dCwgY2xhc3NlczogJ25leHQnfSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIHN0YXJ0IGVkZ2VzXG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5zdGFydCA+IDAgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZihvLnVzZVN0YXJ0RWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGVuZCA9IE1hdGgubWluKG8uZWRnZXMsIGludGVydmFsLnN0YXJ0KTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBlbmQ7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChvLmVkZ2VzIDwgaW50ZXJ2YWwuc3RhcnQgJiYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgby5lZGdlcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuZW5kIDwgby5wYWdlcyAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmKG8udXNlU3RhcnRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgYmVnaW4gPSBNYXRoLm1heChvLnBhZ2VzIC0gby5lZGdlcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IG8ucGFnZXMgLSAxOyBpID49IGJlZ2luOyBpLS0pIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChvLnBhZ2VzIC0gby5lZGdlcyA+IGludGVydmFsLmVuZCAmJiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgaW50ZXJ2YWwgbGlua3Ncblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0Zm9yIChpID0gaW50ZXJ2YWwuc3RhcnQ7IGkgPCBpbnRlcnZhbC5lbmQ7IGkrKykge1xuXHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yIChpID0gaW50ZXJ2YWwuZW5kIC0gMTsgaSA+PSBpbnRlcnZhbC5zdGFydDsgaS0tKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIGVuZCBlZGdlc1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuZW5kIDwgby5wYWdlcyAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmIChvLnBhZ2VzIC0gby5lZGdlcyA+IGludGVydmFsLmVuZCAmJiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoby51c2VFbmRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgYmVnaW4gPSBNYXRoLm1heChvLnBhZ2VzIC0gby5lZGdlcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IGJlZ2luOyBpIDwgby5wYWdlczsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5zdGFydCA+IDAgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZiAoby5lZGdlcyA8IGludGVydmFsLnN0YXJ0ICYmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIG8uZWRnZXMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKG8udXNlRW5kRWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGVuZCA9IE1hdGgubWluKG8uZWRnZXMsIGludGVydmFsLnN0YXJ0KTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IGVuZCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgTmV4dCBsaW5rICh1bmxlc3Mgb3B0aW9uIGlzIHNldCBmb3IgYXQgZnJvbnQpXG5cdFx0XHRpZiAoby5uZXh0VGV4dCAmJiAhby5uZXh0QXRGcm9udCkge1xuXHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgIW8uaW52ZXJ0UGFnZU9yZGVyID8gby5jdXJyZW50UGFnZSArIDEgOiBvLmN1cnJlbnRQYWdlIC0gMSwge3RleHQ6IG8ubmV4dFRleHQsIGNsYXNzZXM6ICduZXh0J30pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoby5lbGxpcHNlUGFnZVNldCAmJiAhby5kaXNhYmxlZCkge1xuXHRcdFx0XHRtZXRob2RzLl9lbGxpcHNlQ2xpY2suY2FsbCh0aGlzLCAkcGFuZWwpO1xuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdF9nZXRQYWdlczogZnVuY3Rpb24obykge1xuXHRcdFx0dmFyIHBhZ2VzID0gTWF0aC5jZWlsKG8uaXRlbXMgLyBvLml0ZW1zT25QYWdlKTtcblx0XHRcdHJldHVybiBwYWdlcyB8fCAxO1xuXHRcdH0sXG5cblx0XHRfZ2V0SW50ZXJ2YWw6IGZ1bmN0aW9uKG8pIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHN0YXJ0OiBNYXRoLmNlaWwoby5jdXJyZW50UGFnZSA+IG8uaGFsZkRpc3BsYXllZCA/IE1hdGgubWF4KE1hdGgubWluKG8uY3VycmVudFBhZ2UgLSBvLmhhbGZEaXNwbGF5ZWQsIChvLnBhZ2VzIC0gby5kaXNwbGF5ZWRQYWdlcykpLCAwKSA6IDApLFxuXHRcdFx0XHRlbmQ6IE1hdGguY2VpbChvLmN1cnJlbnRQYWdlID4gby5oYWxmRGlzcGxheWVkID8gTWF0aC5taW4oby5jdXJyZW50UGFnZSArIG8uaGFsZkRpc3BsYXllZCwgby5wYWdlcykgOiBNYXRoLm1pbihvLmRpc3BsYXllZFBhZ2VzLCBvLnBhZ2VzKSlcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdF9hcHBlbmRJdGVtOiBmdW5jdGlvbihwYWdlSW5kZXgsIG9wdHMpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcywgb3B0aW9ucywgJGxpbmssIG8gPSBzZWxmLmRhdGEoJ3BhZ2luYXRpb24nKSwgJGxpbmtXcmFwcGVyID0gJCgnPGxpPjwvbGk+JyksICR1bCA9IHNlbGYuZmluZCgndWwnKTtcblxuXHRcdFx0cGFnZUluZGV4ID0gcGFnZUluZGV4IDwgMCA/IDAgOiAocGFnZUluZGV4IDwgby5wYWdlcyA/IHBhZ2VJbmRleCA6IG8ucGFnZXMgLSAxKTtcblxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0dGV4dDogcGFnZUluZGV4ICsgMSxcblx0XHRcdFx0Y2xhc3NlczogJydcblx0XHRcdH07XG5cblx0XHRcdGlmIChvLmxhYmVsTWFwLmxlbmd0aCAmJiBvLmxhYmVsTWFwW3BhZ2VJbmRleF0pIHtcblx0XHRcdFx0b3B0aW9ucy50ZXh0ID0gby5sYWJlbE1hcFtwYWdlSW5kZXhdO1xuXHRcdFx0fVxuXG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQob3B0aW9ucywgb3B0cyB8fCB7fSk7XG5cblx0XHRcdGlmIChwYWdlSW5kZXggPT0gby5jdXJyZW50UGFnZSB8fCBvLmRpc2FibGVkKSB7XG5cdFx0XHRcdGlmIChvLmRpc2FibGVkIHx8IG9wdGlvbnMuY2xhc3NlcyA9PT0gJ3ByZXYnIHx8IG9wdGlvbnMuY2xhc3NlcyA9PT0gJ25leHQnKSB7XG5cdFx0XHRcdFx0JGxpbmtXcmFwcGVyLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRsaW5rV3JhcHBlci5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JGxpbmsgPSAkKCc8c3BhbiBjbGFzcz1cImN1cnJlbnRcIj4nICsgKG9wdGlvbnMudGV4dCkgKyAnPC9zcGFuPicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG8udXNlQW5jaG9ycykge1xuXHRcdFx0XHRcdCRsaW5rID0gJCgnPGEgaHJlZj1cIicgKyBvLmhyZWZUZXh0UHJlZml4ICsgKHBhZ2VJbmRleCArIDEpICsgby5ocmVmVGV4dFN1ZmZpeCArICdcIiBjbGFzcz1cInBhZ2UtbGlua1wiPicgKyAob3B0aW9ucy50ZXh0KSArICc8L2E+Jyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JGxpbmsgPSAkKCc8c3BhbiA+JyArIChvcHRpb25zLnRleHQpICsgJzwvc3Bhbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkbGluay5jbGljayhmdW5jdGlvbihldmVudCl7XG5cdFx0XHRcdFx0cmV0dXJuIG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbChzZWxmLCBwYWdlSW5kZXgsIGV2ZW50KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcHRpb25zLmNsYXNzZXMpIHtcblx0XHRcdFx0JGxpbmsuYWRkQ2xhc3Mob3B0aW9ucy5jbGFzc2VzKTtcblx0XHRcdH1cblxuXHRcdFx0JGxpbmtXcmFwcGVyLmFwcGVuZCgkbGluayk7XG5cblx0XHRcdGlmICgkdWwubGVuZ3RoKSB7XG5cdFx0XHRcdCR1bC5hcHBlbmQoJGxpbmtXcmFwcGVyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGYuYXBwZW5kKCRsaW5rV3JhcHBlcik7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9zZWxlY3RQYWdlOiBmdW5jdGlvbihwYWdlSW5kZXgsIGV2ZW50KSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5jdXJyZW50UGFnZSA9IHBhZ2VJbmRleDtcblx0XHRcdGlmIChvLnNlbGVjdE9uQ2xpY2spIHtcblx0XHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG8ub25QYWdlQ2xpY2socGFnZUluZGV4ICsgMSwgZXZlbnQpO1xuXHRcdH0sXG5cblxuXHRcdF9lbGxpcHNlQ2xpY2s6IGZ1bmN0aW9uKCRwYW5lbCkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdFx0XHRvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyksXG5cdFx0XHRcdCRlbGxpcCA9ICRwYW5lbC5maW5kKCcuZWxsaXBzZScpO1xuXHRcdFx0JGVsbGlwLmFkZENsYXNzKCdjbGlja2FibGUnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcblx0XHRcdCRlbGxpcC5jbGljayhmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRpZiAoIW8uZGlzYWJsZSkge1xuXHRcdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHRcdFx0XHR2YWwgPSAocGFyc2VJbnQoJHRoaXMucGFyZW50KCkucHJldigpLnRleHQoKSwgMTApIHx8IDApICsgMTtcblx0XHRcdFx0XHQkdGhpc1xuXHRcdFx0XHRcdFx0Lmh0bWwoJzxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIG1heD1cIicgKyBvLnBhZ2VzICsgJ1wiIHN0ZXA9XCIxXCIgdmFsdWU9XCInICsgdmFsICsgJ1wiPicpXG5cdFx0XHRcdFx0XHQuZmluZCgnaW5wdXQnKVxuXHRcdFx0XHRcdFx0LmZvY3VzKClcblx0XHRcdFx0XHRcdC5jbGljayhmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHQvLyBwcmV2ZW50IGlucHV0IG51bWJlciBhcnJvd3MgZnJvbSBidWJibGluZyBhIGNsaWNrIGV2ZW50IG9uICRlbGxpcFxuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQua2V5dXAoZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cdFx0XHRcdFx0XHRcdGlmIChldmVudC53aGljaCA9PT0gMTMgJiYgdmFsICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGVudGVyIHRvIGFjY2VwdFxuXHRcdFx0XHRcdFx0XHRcdGlmICgodmFsPjApJiYodmFsPD1vLnBhZ2VzKSlcblx0XHRcdFx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwoc2VsZiwgdmFsIC0gMSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT09IDI3KSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gZXNjYXBlIHRvIGNhbmNlbFxuXHRcdFx0XHRcdFx0XHRcdCRlbGxpcC5lbXB0eSgpLmh0bWwoby5lbGxpcHNlVGV4dCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQuYmluZCgnYmx1cicsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAodmFsICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbChzZWxmLCB2YWwgLSAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQkZWxsaXAuZW1wdHkoKS5odG1sKG8uZWxsaXBzZVRleHQpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fTtcblxuXHQkLmZuLnBhZ2luYXRpb24gPSBmdW5jdGlvbihtZXRob2QpIHtcblxuXHRcdC8vIE1ldGhvZCBjYWxsaW5nIGxvZ2ljXG5cdFx0aWYgKG1ldGhvZHNbbWV0aG9kXSAmJiBtZXRob2QuY2hhckF0KDApICE9ICdfJykge1xuXHRcdFx0cmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QpIHtcblx0XHRcdHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JC5lcnJvcignTWV0aG9kICcgKyAgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkucGFnaW5hdGlvbicpO1xuXHRcdH1cblxuXHR9O1xuXG59KShqUXVlcnkpOyIsIi8qXG4gICAgQSBzaW1wbGUgalF1ZXJ5IG1vZGFsIChodHRwOi8vZ2l0aHViLmNvbS9reWxlZm94L2pxdWVyeS1tb2RhbClcbiAgICBWZXJzaW9uIDAuOS4yXG4qL1xuXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgLy8gTWFraW5nIHlvdXIgalF1ZXJ5IHBsdWdpbiB3b3JrIGJldHRlciB3aXRoIG5wbSB0b29sc1xuICAvLyBodHRwOi8vYmxvZy5ucG1qcy5vcmcvcG9zdC8xMTI3MTIxNjk4MzAvbWFraW5nLXlvdXItanF1ZXJ5LXBsdWdpbi13b3JrLWJldHRlci13aXRoLW5wbVxuICBpZih0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgIGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgd2luZG93LCBkb2N1bWVudCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgZmFjdG9yeShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQpO1xuICB9XG59KGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuXG4gIHZhciBtb2RhbHMgPSBbXSxcbiAgICAgIGdldEN1cnJlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG1vZGFscy5sZW5ndGggPyBtb2RhbHNbbW9kYWxzLmxlbmd0aCAtIDFdIDogbnVsbDtcbiAgICAgIH0sXG4gICAgICBzZWxlY3RDdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChpPW1vZGFscy5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG4gICAgICAgICAgaWYgKG1vZGFsc1tpXS4kYmxvY2tlcikge1xuICAgICAgICAgICAgbW9kYWxzW2ldLiRibG9ja2VyLnRvZ2dsZUNsYXNzKCdjdXJyZW50Jywhc2VsZWN0ZWQpLnRvZ2dsZUNsYXNzKCdiZWhpbmQnLHNlbGVjdGVkKTtcbiAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgJC55c3BfbW9kYWwgPSBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuICAgIHZhciByZW1vdmUsIHRhcmdldDtcbiAgICB0aGlzLiRib2R5ID0gJCgnYm9keScpO1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkLnlzcF9tb2RhbC5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zLmRvRmFkZSA9ICFpc05hTihwYXJzZUludCh0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uLCAxMCkpO1xuICAgIHRoaXMuJGJsb2NrZXIgPSBudWxsO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VFeGlzdGluZylcbiAgICAgIHdoaWxlICgkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKVxuICAgICAgICAkLnlzcF9tb2RhbC5jbG9zZSgpOyAvLyBDbG9zZSBhbnkgb3BlbiBtb2RhbHMuXG4gICAgbW9kYWxzLnB1c2godGhpcyk7XG4gICAgaWYgKGVsLmlzKCdhJykpIHtcbiAgICAgIHRhcmdldCA9IGVsLmF0dHIoJ2hyZWYnKTtcbiAgICAgIHRoaXMuYW5jaG9yID0gZWw7XG4gICAgICAvL1NlbGVjdCBlbGVtZW50IGJ5IGlkIGZyb20gaHJlZlxuICAgICAgaWYgKC9eIy8udGVzdCh0YXJnZXQpKSB7XG4gICAgICAgIHRoaXMuJGVsbSA9ICQodGFyZ2V0KTtcbiAgICAgICAgaWYgKHRoaXMuJGVsbS5sZW5ndGggIT09IDEpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLiRlbG0pO1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIC8vQUpBWFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZWxtID0gJCgnPGRpdj4nKTtcbiAgICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kZWxtKTtcbiAgICAgICAgcmVtb3ZlID0gZnVuY3Rpb24oZXZlbnQsIG1vZGFsKSB7IG1vZGFsLmVsbS5yZW1vdmUoKTsgfTtcbiAgICAgICAgdGhpcy5zaG93U3Bpbm5lcigpO1xuICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfU0VORCk7XG4gICAgICAgICQuZ2V0KHRhcmdldCkuZG9uZShmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgaWYgKCEkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKSByZXR1cm47XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX1NVQ0NFU1MpO1xuICAgICAgICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuICAgICAgICAgIGN1cnJlbnQuJGVsbS5lbXB0eSgpLmFwcGVuZChodG1sKS5vbigkLnlzcF9tb2RhbC5DTE9TRSwgcmVtb3ZlKTtcbiAgICAgICAgICBjdXJyZW50LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgY3VycmVudC5vcGVuKCk7XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX0NPTVBMRVRFKTtcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfRkFJTCk7XG4gICAgICAgICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgICAgICAgY3VycmVudC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgIG1vZGFscy5wb3AoKTsgLy8gcmVtb3ZlIGV4cGVjdGVkIG1vZGFsIGZyb20gdGhlIGxpc3RcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfQ09NUExFVEUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWxtID0gZWw7XG4gICAgICB0aGlzLmFuY2hvciA9IGVsO1xuICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kZWxtKTtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfTtcblxuICAkLnlzcF9tb2RhbC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6ICQueXNwX21vZGFsLFxuXG4gICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbSA9IHRoaXM7XG4gICAgICB0aGlzLmJsb2NrKCk7XG4gICAgICB0aGlzLmFuY2hvci5ibHVyKCk7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuZG9GYWRlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbS5zaG93KCk7XG4gICAgICAgIH0sIHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24gKiB0aGlzLm9wdGlvbnMuZmFkZURlbGF5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgfVxuICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXlkb3duLm1vZGFsJykub24oJ2tleWRvd24ubW9kYWwnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAyNyAmJiBjdXJyZW50Lm9wdGlvbnMuZXNjYXBlQ2xvc2UpIGN1cnJlbnQuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jbGlja0Nsb3NlKVxuICAgICAgICB0aGlzLiRibG9ja2VyLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHRoaXMpXG4gICAgICAgICAgICAkLnlzcF9tb2RhbC5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgbW9kYWxzLnBvcCgpO1xuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSlcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXlkb3duLm1vZGFsJyk7XG4gICAgfSxcblxuICAgIGJsb2NrOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkJFRk9SRV9CTE9DSywgW3RoaXMuX2N0eCgpXSk7XG4gICAgICB0aGlzLiRib2R5LmNzcygnb3ZlcmZsb3cnLCdoaWRkZW4nKTtcbiAgICAgIHRoaXMuJGJsb2NrZXIgPSAkKCc8ZGl2IGNsYXNzPVwiJyArIHRoaXMub3B0aW9ucy5ibG9ja2VyQ2xhc3MgKyAnIGJsb2NrZXIgY3VycmVudFwiPjwvZGl2PicpLmFwcGVuZFRvKHRoaXMuJGJvZHkpO1xuICAgICAgc2VsZWN0Q3VycmVudCgpO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmRvRmFkZSkge1xuICAgICAgICB0aGlzLiRibG9ja2VyLmNzcygnb3BhY2l0eScsMCkuYW5pbWF0ZSh7b3BhY2l0eTogMX0sIHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkxPQ0ssIFt0aGlzLl9jdHgoKV0pO1xuICAgIH0sXG5cbiAgICB1bmJsb2NrOiBmdW5jdGlvbihub3cpIHtcbiAgICAgIGlmICghbm93ICYmIHRoaXMub3B0aW9ucy5kb0ZhZGUpXG4gICAgICAgIHRoaXMuJGJsb2NrZXIuZmFkZU91dCh0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uLCB0aGlzLnVuYmxvY2suYmluZCh0aGlzLHRydWUpKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLiRibG9ja2VyLmNoaWxkcmVuKCkuYXBwZW5kVG8odGhpcy4kYm9keSk7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIgPSBudWxsO1xuICAgICAgICBzZWxlY3RDdXJyZW50KCk7XG4gICAgICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSlcbiAgICAgICAgICB0aGlzLiRib2R5LmNzcygnb3ZlcmZsb3cnLCcnKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5CRUZPUkVfT1BFTiwgW3RoaXMuX2N0eCgpXSk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnNob3dDbG9zZSkge1xuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gJCgnPGEgaHJlZj1cIiNjbG9zZS1tb2RhbFwiIHJlbD1cIm1vZGFsOmNsb3NlXCIgY2xhc3M9XCJjbG9zZS1tb2RhbCAnICsgdGhpcy5vcHRpb25zLmNsb3NlQ2xhc3MgKyAnXCI+JyArIHRoaXMub3B0aW9ucy5jbG9zZVRleHQgKyAnPC9hPicpO1xuICAgICAgICB0aGlzLiRlbG0uYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24pO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLmFkZENsYXNzKHRoaXMub3B0aW9ucy5tb2RhbENsYXNzKS5hcHBlbmRUbyh0aGlzLiRibG9ja2VyKTtcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgdGhpcy4kZWxtLmNzcyh7b3BhY2l0eTogMCwgZGlzcGxheTogJ2lubGluZS1ibG9jayd9KS5hbmltYXRlKHtvcGFjaXR5OiAxfSwgdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRlbG0uY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuT1BFTiwgW3RoaXMuX2N0eCgpXSk7XG4gICAgfSxcblxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkVGT1JFX0NMT1NFLCBbdGhpcy5fY3R4KCldKTtcbiAgICAgIGlmICh0aGlzLmNsb3NlQnV0dG9uKSB0aGlzLmNsb3NlQnV0dG9uLnJlbW92ZSgpO1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgdGhpcy4kZWxtLmZhZGVPdXQodGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5BRlRFUl9DTE9TRSwgW190aGlzLl9jdHgoKV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsbS5oaWRlKDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQUZURVJfQ0xPU0UsIFtfdGhpcy5fY3R4KCldKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5DTE9TRSwgW3RoaXMuX2N0eCgpXSk7XG4gICAgfSxcblxuICAgIHNob3dTcGlubmVyOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLnNob3dTcGlubmVyKSByZXR1cm47XG4gICAgICB0aGlzLnNwaW5uZXIgPSB0aGlzLnNwaW5uZXIgfHwgJCgnPGRpdiBjbGFzcz1cIicgKyB0aGlzLm9wdGlvbnMubW9kYWxDbGFzcyArICctc3Bpbm5lclwiPjwvZGl2PicpXG4gICAgICAgIC5hcHBlbmQodGhpcy5vcHRpb25zLnNwaW5uZXJIdG1sKTtcbiAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuc3Bpbm5lcik7XG4gICAgICB0aGlzLnNwaW5uZXIuc2hvdygpO1xuICAgIH0sXG5cbiAgICBoaWRlU3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zcGlubmVyKSB0aGlzLnNwaW5uZXIucmVtb3ZlKCk7XG4gICAgfSxcblxuICAgIC8vUmV0dXJuIGNvbnRleHQgZm9yIGN1c3RvbSBldmVudHNcbiAgICBfY3R4OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7IGVsbTogdGhpcy4kZWxtLCAkZWxtOiB0aGlzLiRlbG0sICRibG9ja2VyOiB0aGlzLiRibG9ja2VyLCBvcHRpb25zOiB0aGlzLm9wdGlvbnMsICRhbmNob3I6IHRoaXMuYW5jaG9yIH07XG4gICAgfVxuICB9O1xuXG4gICQueXNwX21vZGFsLmNsb3NlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoISQueXNwX21vZGFsLmlzQWN0aXZlKCkpIHJldHVybjtcbiAgICBpZiAoZXZlbnQpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgY3VycmVudC5jbG9zZSgpO1xuICAgIHJldHVybiBjdXJyZW50LiRlbG07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBpZiB0aGVyZSBjdXJyZW50bHkgaXMgYW4gYWN0aXZlIG1vZGFsXG4gICQueXNwX21vZGFsLmlzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBtb2RhbHMubGVuZ3RoID4gMDtcbiAgfTtcblxuICAkLnlzcF9tb2RhbC5nZXRDdXJyZW50ID0gZ2V0Q3VycmVudDtcblxuICAkLnlzcF9tb2RhbC5kZWZhdWx0cyA9IHtcbiAgICBjbG9zZUV4aXN0aW5nOiB0cnVlLFxuICAgIGVzY2FwZUNsb3NlOiB0cnVlLFxuICAgIGNsaWNrQ2xvc2U6IHRydWUsXG4gICAgY2xvc2VUZXh0OiAnQ2xvc2UnLFxuICAgIGNsb3NlQ2xhc3M6ICcnLFxuICAgIG1vZGFsQ2xhc3M6IFwieXNwLW1vZGFsXCIsXG4gICAgYmxvY2tlckNsYXNzOiBcImpxdWVyeS1tb2RhbFwiLFxuICAgIHNwaW5uZXJIdG1sOiAnPGRpdiBjbGFzcz1cInJlY3QxXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3QyXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3QzXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3Q0XCI+PC9kaXY+JyxcbiAgICBzaG93U3Bpbm5lcjogdHJ1ZSxcbiAgICBzaG93Q2xvc2U6IHRydWUsXG4gICAgZmFkZUR1cmF0aW9uOiBudWxsLCAgIC8vIE51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhlIGZhZGUgYW5pbWF0aW9uIHRha2VzLlxuICAgIGZhZGVEZWxheTogMS4wICAgICAgICAvLyBQb2ludCBkdXJpbmcgdGhlIG92ZXJsYXkncyBmYWRlLWluIHRoYXQgdGhlIG1vZGFsIGJlZ2lucyB0byBmYWRlIGluICguNSA9IDUwJSwgMS41ID0gMTUwJSwgZXRjLilcbiAgfTtcblxuICAvLyBFdmVudCBjb25zdGFudHNcbiAgJC55c3BfbW9kYWwuQkVGT1JFX0JMT0NLID0gJ21vZGFsOmJlZm9yZS1ibG9jayc7XG4gICQueXNwX21vZGFsLkJMT0NLID0gJ21vZGFsOmJsb2NrJztcbiAgJC55c3BfbW9kYWwuQkVGT1JFX09QRU4gPSAnbW9kYWw6YmVmb3JlLW9wZW4nO1xuICAkLnlzcF9tb2RhbC5PUEVOID0gJ21vZGFsOm9wZW4nO1xuICAkLnlzcF9tb2RhbC5CRUZPUkVfQ0xPU0UgPSAnbW9kYWw6YmVmb3JlLWNsb3NlJztcbiAgJC55c3BfbW9kYWwuQ0xPU0UgPSAnbW9kYWw6Y2xvc2UnO1xuICAkLnlzcF9tb2RhbC5BRlRFUl9DTE9TRSA9ICdtb2RhbDphZnRlci1jbG9zZSc7XG4gICQueXNwX21vZGFsLkFKQVhfU0VORCA9ICdtb2RhbDphamF4OnNlbmQnO1xuICAkLnlzcF9tb2RhbC5BSkFYX1NVQ0NFU1MgPSAnbW9kYWw6YWpheDpzdWNjZXNzJztcbiAgJC55c3BfbW9kYWwuQUpBWF9GQUlMID0gJ21vZGFsOmFqYXg6ZmFpbCc7XG4gICQueXNwX21vZGFsLkFKQVhfQ09NUExFVEUgPSAnbW9kYWw6YWpheDpjb21wbGV0ZSc7XG5cbiAgJC5mbi55c3BfbW9kYWwgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIG5ldyAkLnlzcF9tb2RhbCh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gQXV0b21hdGljYWxseSBiaW5kIGxpbmtzIHdpdGggcmVsPVwibW9kYWw6Y2xvc2VcIiB0bywgd2VsbCwgY2xvc2UgdGhlIG1vZGFsLlxuICAkKGRvY3VtZW50KS5vbignY2xpY2subW9kYWwnLCAnYVtyZWx+PVwibW9kYWw6Y2xvc2VcIl0nLCAkLnlzcF9tb2RhbC5jbG9zZSk7XG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5tb2RhbCcsICdhW3JlbH49XCJtb2RhbDpvcGVuXCJdJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQodGhpcykubW9kYWwoKTtcbiAgfSk7XG59KSk7IiwiIWZ1bmN0aW9uKGUsdCl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9dCgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSx0KTtlbHNle3ZhciBuPXQoKTtmb3IodmFyIG8gaW4gbikoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0czplKVtvXT1uW29dfX0od2luZG93LChmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXt2YXIgdD17fTtmdW5jdGlvbiBuKG8pe2lmKHRbb10pcmV0dXJuIHRbb10uZXhwb3J0czt2YXIgaT10W29dPXtpOm8sbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtvXS5jYWxsKGkuZXhwb3J0cyxpLGkuZXhwb3J0cyxuKSxpLmw9ITAsaS5leHBvcnRzfXJldHVybiBuLm09ZSxuLmM9dCxuLmQ9ZnVuY3Rpb24oZSx0LG8pe24ubyhlLHQpfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpvfSl9LG4ucj1mdW5jdGlvbihlKXtcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wudG9TdHJpbmdUYWcmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6XCJNb2R1bGVcIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfSxuLnQ9ZnVuY3Rpb24oZSx0KXtpZigxJnQmJihlPW4oZSkpLDgmdClyZXR1cm4gZTtpZig0JnQmJlwib2JqZWN0XCI9PXR5cGVvZiBlJiZlJiZlLl9fZXNNb2R1bGUpcmV0dXJuIGU7dmFyIG89T2JqZWN0LmNyZWF0ZShudWxsKTtpZihuLnIobyksT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sXCJkZWZhdWx0XCIse2VudW1lcmFibGU6ITAsdmFsdWU6ZX0pLDImdCYmXCJzdHJpbmdcIiE9dHlwZW9mIGUpZm9yKHZhciBpIGluIGUpbi5kKG8saSxmdW5jdGlvbih0KXtyZXR1cm4gZVt0XX0uYmluZChudWxsLGkpKTtyZXR1cm4gb30sbi5uPWZ1bmN0aW9uKGUpe3ZhciB0PWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiBuLmQodCxcImFcIix0KSx0fSxuLm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LG4ucD1cIlwiLG4obi5zPTApfShbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO24ucih0KTt2YXIgbyxpPVwiZnNsaWdodGJveC1cIixyPVwiXCIuY29uY2F0KGksXCJzdHlsZXNcIikscz1cIlwiLmNvbmNhdChpLFwiY3Vyc29yLWdyYWJiaW5nXCIpLGE9XCJcIi5jb25jYXQoaSxcImZ1bGwtZGltZW5zaW9uXCIpLGM9XCJcIi5jb25jYXQoaSxcImZsZXgtY2VudGVyZWRcIiksbD1cIlwiLmNvbmNhdChpLFwib3BlblwiKSx1PVwiXCIuY29uY2F0KGksXCJ0cmFuc2Zvcm0tdHJhbnNpdGlvblwiKSxkPVwiXCIuY29uY2F0KGksXCJhYnNvbHV0ZWRcIiksZj1cIlwiLmNvbmNhdChpLFwic2xpZGUtYnRuXCIpLHA9XCJcIi5jb25jYXQoZixcIi1jb250YWluZXJcIiksaD1cIlwiLmNvbmNhdChpLFwiZmFkZS1pblwiKSxtPVwiXCIuY29uY2F0KGksXCJmYWRlLW91dFwiKSxnPWgrXCItc3Ryb25nXCIsdj1tK1wiLXN0cm9uZ1wiLGI9XCJcIi5jb25jYXQoaSxcIm9wYWNpdHktXCIpLHg9XCJcIi5jb25jYXQoYixcIjFcIikseT1cIlwiLmNvbmNhdChpLFwic291cmNlXCIpO2Z1bmN0aW9uIHcoZSl7cmV0dXJuKHc9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX0pKGUpfWZ1bmN0aW9uIFMoZSl7dmFyIHQ9ZS5zdGFnZUluZGV4ZXMsbj1lLmNvcmUuc3RhZ2VNYW5hZ2VyLG89ZS5wcm9wcy5zb3VyY2VzLmxlbmd0aC0xO24uZ2V0UHJldmlvdXNTbGlkZUluZGV4PWZ1bmN0aW9uKCl7cmV0dXJuIDA9PT10LmN1cnJlbnQ/bzp0LmN1cnJlbnQtMX0sbi5nZXROZXh0U2xpZGVJbmRleD1mdW5jdGlvbigpe3JldHVybiB0LmN1cnJlbnQ9PT1vPzA6dC5jdXJyZW50KzF9LG4udXBkYXRlU3RhZ2VJbmRleGVzPTA9PT1vP2Z1bmN0aW9uKCl7fToxPT09bz9mdW5jdGlvbigpezA9PT10LmN1cnJlbnQ/KHQubmV4dD0xLGRlbGV0ZSB0LnByZXZpb3VzKToodC5wcmV2aW91cz0wLGRlbGV0ZSB0Lm5leHQpfTpmdW5jdGlvbigpe3QucHJldmlvdXM9bi5nZXRQcmV2aW91c1NsaWRlSW5kZXgoKSx0Lm5leHQ9bi5nZXROZXh0U2xpZGVJbmRleCgpfSxuLmk9bzw9Mj9mdW5jdGlvbigpe3JldHVybiEwfTpmdW5jdGlvbihlKXt2YXIgbj10LmN1cnJlbnQ7aWYoMD09PW4mJmU9PT1vfHxuPT09byYmMD09PWUpcmV0dXJuITA7dmFyIGk9bi1lO3JldHVybi0xPT09aXx8MD09PWl8fDE9PT1pfX1cIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBkb2N1bWVudD9cInVuZGVmaW5lZFwiOncoZG9jdW1lbnQpKSYmKChvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKSkuY2xhc3NOYW1lPXIsby5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIi5mc2xpZ2h0Ym94LWFic29sdXRlZHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjB9LmZzbGlnaHRib3gtZmFkZS1pbnthbmltYXRpb246ZnNsaWdodGJveC1mYWRlLWluIC4zcyBjdWJpYy1iZXppZXIoMCwwLC43LDEpfS5mc2xpZ2h0Ym94LWZhZGUtb3V0e2FuaW1hdGlvbjpmc2xpZ2h0Ym94LWZhZGUtb3V0IC4zcyBlYXNlfS5mc2xpZ2h0Ym94LWZhZGUtaW4tc3Ryb25ne2FuaW1hdGlvbjpmc2xpZ2h0Ym94LWZhZGUtaW4tc3Ryb25nIC4zcyBjdWJpYy1iZXppZXIoMCwwLC43LDEpfS5mc2xpZ2h0Ym94LWZhZGUtb3V0LXN0cm9uZ3thbmltYXRpb246ZnNsaWdodGJveC1mYWRlLW91dC1zdHJvbmcgLjNzIGVhc2V9QGtleWZyYW1lcyBmc2xpZ2h0Ym94LWZhZGUtaW57ZnJvbXtvcGFjaXR5Oi42NX10b3tvcGFjaXR5OjF9fUBrZXlmcmFtZXMgZnNsaWdodGJveC1mYWRlLW91dHtmcm9te29wYWNpdHk6LjM1fXRve29wYWNpdHk6MH19QGtleWZyYW1lcyBmc2xpZ2h0Ym94LWZhZGUtaW4tc3Ryb25ne2Zyb217b3BhY2l0eTouM310b3tvcGFjaXR5OjF9fUBrZXlmcmFtZXMgZnNsaWdodGJveC1mYWRlLW91dC1zdHJvbmd7ZnJvbXtvcGFjaXR5OjF9dG97b3BhY2l0eTowfX0uZnNsaWdodGJveC1jdXJzb3ItZ3JhYmJpbmd7Y3Vyc29yOmdyYWJiaW5nfS5mc2xpZ2h0Ym94LWZ1bGwtZGltZW5zaW9ue3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9LmZzbGlnaHRib3gtb3BlbntvdmVyZmxvdzpoaWRkZW47aGVpZ2h0OjEwMCV9LmZzbGlnaHRib3gtZmxleC1jZW50ZXJlZHtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LmZzbGlnaHRib3gtb3BhY2l0eS0we29wYWNpdHk6MCFpbXBvcnRhbnR9LmZzbGlnaHRib3gtb3BhY2l0eS0xe29wYWNpdHk6MSFpbXBvcnRhbnR9LmZzbGlnaHRib3gtc2Nyb2xsYmFyZml4e3BhZGRpbmctcmlnaHQ6MTdweH0uZnNsaWdodGJveC10cmFuc2Zvcm0tdHJhbnNpdGlvbnt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3N9LmZzbGlnaHRib3gtY29udGFpbmVye2ZvbnQtZmFtaWx5OkFyaWFsLHNhbnMtc2VyaWY7cG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHJnYmEoMzAsMzAsMzAsLjkpLCMwMDAgMTgxMCUpO3RvdWNoLWFjdGlvbjpwaW5jaC16b29tO3otaW5kZXg6MTAwMDAwMDAwMDstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnRyYW5zcGFyZW50fS5mc2xpZ2h0Ym94LWNvbnRhaW5lciAqe2JveC1zaXppbmc6Ym9yZGVyLWJveH0uZnNsaWdodGJveC1zdmctcGF0aHt0cmFuc2l0aW9uOmZpbGwgLjE1cyBlYXNlO2ZpbGw6I2RkZH0uZnNsaWdodGJveC1uYXZ7aGVpZ2h0OjQ1cHg7d2lkdGg6MTAwJTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjB9LmZzbGlnaHRib3gtc2xpZGUtbnVtYmVyLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjE1cHg7Y29sb3I6I2Q3ZDdkNzt6LWluZGV4OjA7bWF4LXdpZHRoOjU1cHg7dGV4dC1hbGlnbjpsZWZ0fS5mc2xpZ2h0Ym94LXNsaWRlLW51bWJlci1jb250YWluZXIgLmZzbGlnaHRib3gtZmxleC1jZW50ZXJlZHtoZWlnaHQ6MTAwJX0uZnNsaWdodGJveC1zbGFzaHtkaXNwbGF5OmJsb2NrO21hcmdpbjowIDVweDt3aWR0aDoxcHg7aGVpZ2h0OjEycHg7dHJhbnNmb3JtOnJvdGF0ZSgxNWRlZyk7YmFja2dyb3VuZDojZmZmfS5mc2xpZ2h0Ym94LXRvb2xiYXJ7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDozO3JpZ2h0OjA7dG9wOjA7aGVpZ2h0OjEwMCU7ZGlzcGxheTpmbGV4O2JhY2tncm91bmQ6cmdiYSgzNSwzNSwzNSwuNjUpfS5mc2xpZ2h0Ym94LXRvb2xiYXItYnV0dG9ue2hlaWdodDoxMDAlO3dpZHRoOjQ1cHg7Y3Vyc29yOnBvaW50ZXJ9LmZzbGlnaHRib3gtdG9vbGJhci1idXR0b246aG92ZXIgLmZzbGlnaHRib3gtc3ZnLXBhdGh7ZmlsbDojZmZmfS5mc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtwYWRkaW5nOjEycHggMTJweCAxMnB4IDZweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2N1cnNvcjpwb2ludGVyO3otaW5kZXg6Mzt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX1AbWVkaWEgKG1pbi13aWR0aDo0NzZweCl7LmZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lcntwYWRkaW5nOjIycHggMjJweCAyMnB4IDZweH19QG1lZGlhIChtaW4td2lkdGg6NzY4cHgpey5mc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXJ7cGFkZGluZzozMHB4IDMwcHggMzBweCA2cHh9fS5mc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXI6aG92ZXIgLmZzbGlnaHRib3gtc3ZnLXBhdGh7ZmlsbDojZjFmMWYxfS5mc2xpZ2h0Ym94LXNsaWRlLWJ0bntwYWRkaW5nOjlweDtmb250LXNpemU6MjZweDtiYWNrZ3JvdW5kOnJnYmEoMzUsMzUsMzUsLjY1KX1AbWVkaWEgKG1pbi13aWR0aDo3NjhweCl7LmZzbGlnaHRib3gtc2xpZGUtYnRue3BhZGRpbmc6MTBweH19QG1lZGlhIChtaW4td2lkdGg6MTYwMHB4KXsuZnNsaWdodGJveC1zbGlkZS1idG57cGFkZGluZzoxMXB4fX0uZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyLXByZXZpb3Vze2xlZnQ6MH1AbWVkaWEgKG1heC13aWR0aDo0NzUuOTlweCl7LmZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lci1wcmV2aW91c3twYWRkaW5nLWxlZnQ6M3B4fX0uZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyLW5leHR7cmlnaHQ6MDtwYWRkaW5nLWxlZnQ6MTJweDtwYWRkaW5nLXJpZ2h0OjNweH1AbWVkaWEgKG1pbi13aWR0aDo0NzZweCl7LmZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lci1uZXh0e3BhZGRpbmctbGVmdDoyMnB4fX1AbWVkaWEgKG1pbi13aWR0aDo3NjhweCl7LmZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lci1uZXh0e3BhZGRpbmctbGVmdDozMHB4fX1AbWVkaWEgKG1pbi13aWR0aDo0NzZweCl7LmZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lci1uZXh0e3BhZGRpbmctcmlnaHQ6NnB4fX0uZnNsaWdodGJveC1kb3duLWV2ZW50LWRldGVjdG9ye3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MX0uZnNsaWdodGJveC1zbGlkZS1zd2lwaW5nLWhvdmVyZXJ7ei1pbmRleDo0fS5mc2xpZ2h0Ym94LWludmFsaWQtZmlsZS13cmFwcGVye2ZvbnQtc2l6ZToyMnB4O2NvbG9yOiNlYWViZWI7bWFyZ2luOmF1dG99LmZzbGlnaHRib3gtdmlkZW97b2JqZWN0LWZpdDpjb3Zlcn0uZnNsaWdodGJveC15b3V0dWJlLWlmcmFtZXtib3JkZXI6MH0uZnNsaWdodGJveGx7ZGlzcGxheTpibG9jazttYXJnaW46YXV0bztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt3aWR0aDo2N3B4O2hlaWdodDo2N3B4fS5mc2xpZ2h0Ym94bCBkaXZ7Ym94LXNpemluZzpib3JkZXItYm94O2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6NTRweDtoZWlnaHQ6NTRweDttYXJnaW46NnB4O2JvcmRlcjo1cHggc29saWQ7Ym9yZGVyLWNvbG9yOiM5OTkgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJhZGl1czo1MCU7YW5pbWF0aW9uOmZzbGlnaHRib3hsIDEuMnMgY3ViaWMtYmV6aWVyKC41LDAsLjUsMSkgaW5maW5pdGV9LmZzbGlnaHRib3hsIGRpdjpudGgtY2hpbGQoMSl7YW5pbWF0aW9uLWRlbGF5Oi0uNDVzfS5mc2xpZ2h0Ym94bCBkaXY6bnRoLWNoaWxkKDIpe2FuaW1hdGlvbi1kZWxheTotLjNzfS5mc2xpZ2h0Ym94bCBkaXY6bnRoLWNoaWxkKDMpe2FuaW1hdGlvbi1kZWxheTotLjE1c31Aa2V5ZnJhbWVzIGZzbGlnaHRib3hsezAle3RyYW5zZm9ybTpyb3RhdGUoMCl9MTAwJXt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fS5mc2xpZ2h0Ym94LXNvdXJjZXtwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjI7b3BhY2l0eTowfVwiKSksZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChvKSk7ZnVuY3Rpb24gTChlKXt2YXIgdCxuPWUucHJvcHMsbz0wLGk9e307dGhpcy5nZXRTb3VyY2VUeXBlRnJvbUxvY2FsU3RvcmFnZUJ5VXJsPWZ1bmN0aW9uKGUpe3JldHVybiB0W2VdP3RbZV06cihlKX0sdGhpcy5oYW5kbGVSZWNlaXZlZFNvdXJjZVR5cGVGb3JVcmw9ZnVuY3Rpb24oZSxuKXtpZighMT09PWlbbl0mJihvLS0sXCJpbnZhbGlkXCIhPT1lP2lbbl09ZTpkZWxldGUgaVtuXSwwPT09bykpeyFmdW5jdGlvbihlLHQpe2Zvcih2YXIgbiBpbiB0KWVbbl09dFtuXX0odCxpKTt0cnl7bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJmc2xpZ2h0Ym94LXR5cGVzXCIsSlNPTi5zdHJpbmdpZnkodCkpfWNhdGNoKGUpe319fTt2YXIgcj1mdW5jdGlvbihlKXtvKyssaVtlXT0hMX07aWYobi5kaXNhYmxlTG9jYWxTdG9yYWdlKXRoaXMuZ2V0U291cmNlVHlwZUZyb21Mb2NhbFN0b3JhZ2VCeVVybD1mdW5jdGlvbigpe30sdGhpcy5oYW5kbGVSZWNlaXZlZFNvdXJjZVR5cGVGb3JVcmw9ZnVuY3Rpb24oKXt9O2Vsc2V7dHJ5e3Q9SlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImZzbGlnaHRib3gtdHlwZXNcIikpfWNhdGNoKGUpe310fHwodD17fSx0aGlzLmdldFNvdXJjZVR5cGVGcm9tTG9jYWxTdG9yYWdlQnlVcmw9cil9fWZ1bmN0aW9uIEEoZSx0LG4sbyl7dmFyIGk9ZS5kYXRhLHI9ZS5lbGVtZW50cy5zb3VyY2VzLHM9bi9vLGE9MDt0aGlzLmFkanVzdFNpemU9ZnVuY3Rpb24oKXtpZigoYT1pLm1heFNvdXJjZVdpZHRoL3MpPGkubWF4U291cmNlSGVpZ2h0KXJldHVybiBuPGkubWF4U291cmNlV2lkdGgmJihhPW8pLGMoKTthPW8+aS5tYXhTb3VyY2VIZWlnaHQ/aS5tYXhTb3VyY2VIZWlnaHQ6byxjKCl9O3ZhciBjPWZ1bmN0aW9uKCl7clt0XS5zdHlsZS53aWR0aD1hKnMrXCJweFwiLHJbdF0uc3R5bGUuaGVpZ2h0PWErXCJweFwifX1mdW5jdGlvbiBDKGUsdCl7dmFyIG49dGhpcyxvPWUuY29sbGVjdGlvbnMuc291cmNlU2l6ZXJzLGk9ZS5lbGVtZW50cyxyPWkuc291cmNlQW5pbWF0aW9uV3JhcHBlcnMscz1pLnNvdXJjZXMsYT1lLmlzbCxjPWUucmVzb2x2ZTtmdW5jdGlvbiBsKGUsbil7b1t0XT1jKEEsW3QsZSxuXSksb1t0XS5hZGp1c3RTaXplKCl9dGhpcy5ydW5BY3Rpb25zPWZ1bmN0aW9uKGUsbyl7YVt0XT0hMCxzW3RdLmNsYXNzTGlzdC5hZGQoeCksclt0XS5jbGFzc0xpc3QuYWRkKGcpLHJbdF0ucmVtb3ZlQ2hpbGQoclt0XS5maXJzdENoaWxkKSxsKGUsbyksbi5ydW5BY3Rpb25zPWx9fWZ1bmN0aW9uIEUoZSx0KXt2YXIgbixvPXRoaXMsaT1lLmVsZW1lbnRzLnNvdXJjZXMscj1lLnByb3BzLHM9KDAsZS5yZXNvbHZlKShDLFt0XSk7dGhpcy5oYW5kbGVJbWFnZUxvYWQ9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS50YXJnZXQsbj10Lm5hdHVyYWxXaWR0aCxvPXQubmF0dXJhbEhlaWdodDtzLnJ1bkFjdGlvbnMobixvKX0sdGhpcy5oYW5kbGVWaWRlb0xvYWQ9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS50YXJnZXQsbz10LnZpZGVvV2lkdGgsaT10LnZpZGVvSGVpZ2h0O249ITAscy5ydW5BY3Rpb25zKG8saSl9LHRoaXMuaGFuZGxlTm90TWV0YURhdGVkVmlkZW9Mb2FkPWZ1bmN0aW9uKCl7bnx8by5oYW5kbGVZb3V0dWJlTG9hZCgpfSx0aGlzLmhhbmRsZVlvdXR1YmVMb2FkPWZ1bmN0aW9uKCl7dmFyIGU9MTkyMCx0PTEwODA7ci5tYXhZb3V0dWJlRGltZW5zaW9ucyYmKGU9ci5tYXhZb3V0dWJlRGltZW5zaW9ucy53aWR0aCx0PXIubWF4WW91dHViZURpbWVuc2lvbnMuaGVpZ2h0KSxzLnJ1bkFjdGlvbnMoZSx0KX0sdGhpcy5oYW5kbGVDdXN0b21Mb2FkPWZ1bmN0aW9uKCl7dmFyIGU9aVt0XSxuPWUub2Zmc2V0V2lkdGgscj1lLm9mZnNldEhlaWdodDtuJiZyP3MucnVuQWN0aW9ucyhuLHIpOnNldFRpbWVvdXQoby5oYW5kbGVDdXN0b21Mb2FkKX19ZnVuY3Rpb24gRihlLHQsbil7dmFyIG89ZS5lbGVtZW50cy5zb3VyY2VzLGk9ZS5wcm9wcy5jdXN0b21DbGFzc2VzLHI9aVt0XT9pW3RdOlwiXCI7b1t0XS5jbGFzc05hbWU9bitcIiBcIityfWZ1bmN0aW9uIEkoZSx0KXt2YXIgbj1lLmVsZW1lbnRzLnNvdXJjZXMsbz1lLnByb3BzLmN1c3RvbUF0dHJpYnV0ZXM7Zm9yKHZhciBpIGluIG9bdF0pblt0XS5zZXRBdHRyaWJ1dGUoaSxvW3RdW2ldKX1mdW5jdGlvbiBUKGUsdCl7dmFyIG49ZS5jb2xsZWN0aW9ucy5zb3VyY2VMb2FkSGFuZGxlcnMsbz1lLmVsZW1lbnRzLGk9by5zb3VyY2VzLHI9by5zb3VyY2VBbmltYXRpb25XcmFwcGVycyxzPWUucHJvcHMuc291cmNlcztpW3RdPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiksRihlLHQseSksaVt0XS5zcmM9c1t0XSxpW3RdLm9ubG9hZD1uW3RdLmhhbmRsZUltYWdlTG9hZCxJKGUsdCksclt0XS5hcHBlbmRDaGlsZChpW3RdKX1mdW5jdGlvbiBOKGUsdCl7dmFyIG49ZS5jb2xsZWN0aW9ucy5zb3VyY2VMb2FkSGFuZGxlcnMsbz1lLmVsZW1lbnRzLGk9by5zb3VyY2VzLHI9by5zb3VyY2VBbmltYXRpb25XcmFwcGVycyxzPWUucHJvcHMsYT1zLnNvdXJjZXMsYz1zLnZpZGVvc1Bvc3RlcnM7aVt0XT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIiksRihlLHQseSksaVt0XS5zcmM9YVt0XSxpW3RdLm9ubG9hZGVkbWV0YWRhdGE9ZnVuY3Rpb24oZSl7blt0XS5oYW5kbGVWaWRlb0xvYWQoZSl9LGlbdF0uY29udHJvbHM9ITAsSShlLHQpLGNbdF0mJihpW3RdLnBvc3Rlcj1jW3RdKTt2YXIgbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic291cmNlXCIpO2wuc3JjPWFbdF0saVt0XS5hcHBlbmRDaGlsZChsKSxzZXRUaW1lb3V0KG5bdF0uaGFuZGxlTm90TWV0YURhdGVkVmlkZW9Mb2FkLDNlMyksclt0XS5hcHBlbmRDaGlsZChpW3RdKX1mdW5jdGlvbiB6KGUsdCl7dmFyIG49ZS5jb2xsZWN0aW9ucy5zb3VyY2VMb2FkSGFuZGxlcnMsbz1lLmVsZW1lbnRzLHI9by5zb3VyY2VzLHM9by5zb3VyY2VBbmltYXRpb25XcmFwcGVycyxhPWUucHJvcHMuc291cmNlcztyW3RdPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIiksRihlLHQsXCJcIi5jb25jYXQoeSxcIiBcIikuY29uY2F0KGksXCJ5b3V0dWJlLWlmcmFtZVwiKSk7dmFyIGM9YVt0XSxsPWMuc3BsaXQoXCI/XCIpWzFdO3JbdF0uc3JjPVwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvXCIuY29uY2F0KGMubWF0Y2goL14uKih5b3V0dS5iZVxcL3x2XFwvfHVcXC9cXHdcXC98ZW1iZWRcXC98d2F0Y2hcXD92PXxcXCZ2PSkoW14jXFwmXFw/XSopLiovKVsyXSxcIj9cIikuY29uY2F0KGx8fFwiXCIpLHJbdF0uYWxsb3dGdWxsc2NyZWVuPSEwLEkoZSx0KSxzW3RdLmFwcGVuZENoaWxkKHJbdF0pLG5bdF0uaGFuZGxlWW91dHViZUxvYWQoKX1mdW5jdGlvbiBQKGUsdCl7dmFyIG49ZS5jb2xsZWN0aW9ucy5zb3VyY2VMb2FkSGFuZGxlcnMsbz1lLmVsZW1lbnRzLGk9by5zb3VyY2VzLHI9by5zb3VyY2VBbmltYXRpb25XcmFwcGVycyxzPWUucHJvcHMuc291cmNlcztpW3RdPXNbdF0sRihlLHQsXCJcIi5jb25jYXQoaVt0XS5jbGFzc05hbWUsXCIgXCIpLmNvbmNhdCh5KSksclt0XS5hcHBlbmRDaGlsZChpW3RdKSxuW3RdLmhhbmRsZUN1c3RvbUxvYWQoKX1mdW5jdGlvbiBrKGUsdCl7dmFyIG49ZS5lbGVtZW50cyxvPW4uc291cmNlcyxyPW4uc291cmNlQW5pbWF0aW9uV3JhcHBlcnM7ZS5wcm9wcy5zb3VyY2VzO29bdF09ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxvW3RdLmNsYXNzTmFtZT1cIlwiLmNvbmNhdChpLFwiaW52YWxpZC1maWxlLXdyYXBwZXIgXCIpLmNvbmNhdChjKSxvW3RdLmlubmVySFRNTD1cIkludmFsaWQgc291cmNlXCIsclt0XS5jbGFzc0xpc3QuYWRkKGcpLHJbdF0ucmVtb3ZlQ2hpbGQoclt0XS5maXJzdENoaWxkKSxyW3RdLmFwcGVuZENoaWxkKG9bdF0pfWZ1bmN0aW9uIEgoZSl7dmFyIHQ9ZS5jb2xsZWN0aW9ucyxuPXQuc291cmNlTG9hZEhhbmRsZXJzLG89dC5zb3VyY2VzUmVuZGVyRnVuY3Rpb25zLGk9ZS5jb3JlLnNvdXJjZURpc3BsYXlGYWNhZGUscj1lLnJlc29sdmU7dGhpcy5ydW5BY3Rpb25zRm9yU291cmNlVHlwZUFuZEluZGV4PWZ1bmN0aW9uKHQscyl7dmFyIGE7c3dpdGNoKFwiaW52YWxpZFwiIT09dCYmKG5bc109cihFLFtzXSkpLHQpe2Nhc2VcImltYWdlXCI6YT1UO2JyZWFrO2Nhc2VcInZpZGVvXCI6YT1OO2JyZWFrO2Nhc2VcInlvdXR1YmVcIjphPXo7YnJlYWs7Y2FzZVwiY3VzdG9tXCI6YT1QO2JyZWFrO2RlZmF1bHQ6YT1rfW9bc109ZnVuY3Rpb24oKXtyZXR1cm4gYShlLHMpfSxpLmRpc3BsYXlTb3VyY2VzV2hpY2hTaG91bGRCZURpc3BsYXllZCgpfX1mdW5jdGlvbiBXKCl7dmFyIGUsdCxuLG89e2lzVXJsWW91dHViZU9uZTpmdW5jdGlvbihlKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtyZXR1cm4gdC5ocmVmPWUsXCJ3d3cueW91dHViZS5jb21cIj09PXQuaG9zdG5hbWV8fFwieW91dHUuYmVcIj09PXQuaG9zdG5hbWV9LGdldFR5cGVGcm9tUmVzcG9uc2VDb250ZW50VHlwZTpmdW5jdGlvbihlKXtyZXR1cm4gZS5zbGljZSgwLGUuaW5kZXhPZihcIi9cIikpfX07ZnVuY3Rpb24gaSgpe2lmKDQhPT1uLnJlYWR5U3RhdGUpe2lmKDI9PT1uLnJlYWR5U3RhdGUpe3ZhciBlO3N3aXRjaChvLmdldFR5cGVGcm9tUmVzcG9uc2VDb250ZW50VHlwZShuLmdldFJlc3BvbnNlSGVhZGVyKFwiY29udGVudC10eXBlXCIpKSl7Y2FzZVwiaW1hZ2VcIjplPVwiaW1hZ2VcIjticmVhaztjYXNlXCJ2aWRlb1wiOmU9XCJ2aWRlb1wiO2JyZWFrO2RlZmF1bHQ6ZT1cImludmFsaWRcIn1uLm9ucmVhZHlzdGF0ZWNoYW5nZT1udWxsLG4uYWJvcnQoKSx0KGUpfX1lbHNlIHQoXCJpbnZhbGlkXCIpfXRoaXMuc2V0VXJsVG9DaGVjaz1mdW5jdGlvbih0KXtlPXR9LHRoaXMuZ2V0U291cmNlVHlwZT1mdW5jdGlvbihyKXtpZihvLmlzVXJsWW91dHViZU9uZShlKSlyZXR1cm4gcihcInlvdXR1YmVcIik7dD1yLChuPW5ldyBYTUxIdHRwUmVxdWVzdCkub25yZWFkeXN0YXRlY2hhbmdlPWksbi5vcGVuKFwiR0VUXCIsZSwhMCksbi5zZW5kKCl9fWZ1bmN0aW9uIFIoZSx0LG4pe3ZhciBvPWUucHJvcHMsaT1vLnR5cGVzLHI9by50eXBlLHM9by5zb3VyY2VzLGE9ZS5yZXNvbHZlO3RoaXMuZ2V0VHlwZVNldEJ5Q2xpZW50Rm9ySW5kZXg9ZnVuY3Rpb24oZSl7dmFyIHQ7cmV0dXJuIGkmJmlbZV0/dD1pW2VdOnImJih0PXIpLHR9LHRoaXMucmV0cmlldmVUeXBlV2l0aFhockZvckluZGV4PWZ1bmN0aW9uKGUpe3ZhciBvPWEoVyk7by5zZXRVcmxUb0NoZWNrKHNbZV0pLG8uZ2V0U291cmNlVHlwZSgoZnVuY3Rpb24obyl7dC5oYW5kbGVSZWNlaXZlZFNvdXJjZVR5cGVGb3JVcmwobyxzW2VdKSxuLnJ1bkFjdGlvbnNGb3JTb3VyY2VUeXBlQW5kSW5kZXgobyxlKX0pKX19ZnVuY3Rpb24gRChlLHQpe3ZhciBuPWUuY29yZS5zdGFnZU1hbmFnZXIsbz1lLmVsZW1lbnRzLGk9by5zbXcscj1vLnNvdXJjZVdyYXBwZXJzQ29udGFpbmVyLHM9ZS5wcm9wcyxsPTAsZj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2Z1bmN0aW9uIHAoZSl7Zi5zdHlsZS50cmFuc2Zvcm09XCJ0cmFuc2xhdGVYKFwiLmNvbmNhdChlK2wsXCJweClcIiksbD0wfWZ1bmN0aW9uIGgoKXtyZXR1cm4oMStzLnNsaWRlRGlzdGFuY2UpKmlubmVyV2lkdGh9Zi5jbGFzc05hbWU9XCJcIi5jb25jYXQoZCxcIiBcIikuY29uY2F0KGEsXCIgXCIpLmNvbmNhdChjKSxmLnM9ZnVuY3Rpb24oKXtmLnN0eWxlLmRpc3BsYXk9XCJmbGV4XCJ9LGYuaD1mdW5jdGlvbigpe2Yuc3R5bGUuZGlzcGxheT1cIm5vbmVcIn0sZi5hPWZ1bmN0aW9uKCl7Zi5jbGFzc0xpc3QuYWRkKHUpfSxmLmQ9ZnVuY3Rpb24oKXtmLmNsYXNzTGlzdC5yZW1vdmUodSl9LGYubj1mdW5jdGlvbigpe2Yuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0cmFuc2Zvcm1cIil9LGYudj1mdW5jdGlvbihlKXtyZXR1cm4gbD1lLGZ9LGYubmU9ZnVuY3Rpb24oKXtwKC1oKCkpfSxmLno9ZnVuY3Rpb24oKXtwKDApfSxmLnA9ZnVuY3Rpb24oKXtwKGgoKSl9LG4uaSh0KXx8Zi5oKCksaVt0XT1mLHIuYXBwZW5kQ2hpbGQoZiksZnVuY3Rpb24oZSx0KXt2YXIgbj1lLmVsZW1lbnRzLG89bi5zbXcsaT1uLnNvdXJjZUFuaW1hdGlvbldyYXBwZXJzLHI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cy5jbGFzc05hbWU9XCJmc2xpZ2h0Ym94bFwiO2Zvcih2YXIgYT0wO2E8MzthKyspe3ZhciBjPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cy5hcHBlbmRDaGlsZChjKX1yLmFwcGVuZENoaWxkKHMpLG9bdF0uYXBwZW5kQ2hpbGQociksaVt0XT1yfShlLHQpfWZ1bmN0aW9uIE8oZSx0LG4sbyl7dmFyIHI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcInN2Z1wiKTtyLnNldEF0dHJpYnV0ZU5TKG51bGwsXCJ3aWR0aFwiLHQpLHIuc2V0QXR0cmlidXRlTlMobnVsbCxcImhlaWdodFwiLHQpLHIuc2V0QXR0cmlidXRlTlMobnVsbCxcInZpZXdCb3hcIixuKTt2YXIgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwicGF0aFwiKTtyZXR1cm4gcy5zZXRBdHRyaWJ1dGVOUyhudWxsLFwiY2xhc3NcIixcIlwiLmNvbmNhdChpLFwic3ZnLXBhdGhcIikpLHMuc2V0QXR0cmlidXRlTlMobnVsbCxcImRcIixvKSxyLmFwcGVuZENoaWxkKHMpLGUuYXBwZW5kQ2hpbGQocikscn1mdW5jdGlvbiBNKGUsdCl7dmFyIG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gbi5jbGFzc05hbWU9XCJcIi5jb25jYXQoaSxcInRvb2xiYXItYnV0dG9uIFwiKS5jb25jYXQoYyksbi50aXRsZT10LGUuYXBwZW5kQ2hpbGQobiksbn1mdW5jdGlvbiBqKGUsdCl7dmFyIG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtuLmNsYXNzTmFtZT1cIlwiLmNvbmNhdChpLFwidG9vbGJhclwiKSx0LmFwcGVuZENoaWxkKG4pLGZ1bmN0aW9uKGUsdCl7dmFyIG49ZS5jb21wb25lbnRzU2VydmljZXMsbz1lLmRhdGEsaT1lLmZzLHI9XCJNNC41IDExSDN2NGg0di0xLjVINC41VjExek0zIDdoMS41VjQuNUg3VjNIM3Y0em0xMC41IDYuNUgxMVYxNWg0di00aC0xLjV2Mi41ek0xMSAzdjEuNWgyLjVWN0gxNVYzaC00elwiLHM9TSh0KTtzLnRpdGxlPVwiRW50ZXIgZnVsbHNjcmVlblwiO3ZhciBhPU8ocyxcIjIwcHhcIixcIjAgMCAxOCAxOFwiLHIpO24ub2ZzPWZ1bmN0aW9uKCl7by5pZnM9ITAscy50aXRsZT1cIkV4aXQgZnVsbHNjcmVlblwiLGEuc2V0QXR0cmlidXRlTlMobnVsbCxcIndpZHRoXCIsXCIyNHB4XCIpLGEuc2V0QXR0cmlidXRlTlMobnVsbCxcImhlaWdodFwiLFwiMjRweFwiKSxhLnNldEF0dHJpYnV0ZU5TKG51bGwsXCJ2aWV3Qm94XCIsXCIwIDAgOTUwIDEwMjRcIiksYS5maXJzdENoaWxkLnNldEF0dHJpYnV0ZU5TKG51bGwsXCJkXCIsXCJNNjgyIDM0MmgxMjh2ODRoLTIxMnYtMjEyaDg0djEyOHpNNTk4IDgxMHYtMjEyaDIxMnY4NGgtMTI4djEyOGgtODR6TTM0MiAzNDJ2LTEyOGg4NHYyMTJoLTIxMnYtODRoMTI4ek0yMTQgNjgydi04NGgyMTJ2MjEyaC04NHYtMTI4aC0xMjh6XCIpfSxuLnhmcz1mdW5jdGlvbigpe28uaWZzPSExLHMudGl0bGU9XCJFbnRlciBmdWxsc2NyZWVuXCIsYS5zZXRBdHRyaWJ1dGVOUyhudWxsLFwid2lkdGhcIixcIjIwcHhcIiksYS5zZXRBdHRyaWJ1dGVOUyhudWxsLFwiaGVpZ2h0XCIsXCIyMHB4XCIpLGEuc2V0QXR0cmlidXRlTlMobnVsbCxcInZpZXdCb3hcIixcIjAgMCAxOCAxOFwiKSxhLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlTlMobnVsbCxcImRcIixyKX0scy5vbmNsaWNrPWkudH0oZSxuKSxmdW5jdGlvbihlLHQpe3ZhciBuPU0odCxcIkNsb3NlXCIpO24ub25jbGljaz1lLmNvcmUubGlnaHRib3hDbG9zZXIuY2xvc2VMaWdodGJveCxPKG4sXCIyMHB4XCIsXCIwIDAgMjQgMjRcIixcIk0gNC43MDcwMzEyIDMuMjkyOTY4OCBMIDMuMjkyOTY4OCA0LjcwNzAzMTIgTCAxMC41ODU5MzggMTIgTCAzLjI5Mjk2ODggMTkuMjkyOTY5IEwgNC43MDcwMzEyIDIwLjcwNzAzMSBMIDEyIDEzLjQxNDA2MiBMIDE5LjI5Mjk2OSAyMC43MDcwMzEgTCAyMC43MDcwMzEgMTkuMjkyOTY5IEwgMTMuNDE0MDYyIDEyIEwgMjAuNzA3MDMxIDQuNzA3MDMxMiBMIDE5LjI5Mjk2OSAzLjI5Mjk2ODggTCAxMiAxMC41ODU5MzggTCA0LjcwNzAzMTIgMy4yOTI5Njg4IHpcIil9KGUsbil9ZnVuY3Rpb24gWChlKXt2YXIgdD1lLnByb3BzLnNvdXJjZXMsbj1lLmVsZW1lbnRzLmNvbnRhaW5lcixvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7by5jbGFzc05hbWU9XCJcIi5jb25jYXQoaSxcIm5hdlwiKSxuLmFwcGVuZENoaWxkKG8pLGooZSxvKSx0Lmxlbmd0aD4xJiZmdW5jdGlvbihlLHQpe3ZhciBuPWUuY29tcG9uZW50c1NlcnZpY2VzLG89ZS5wcm9wcy5zb3VyY2VzLHI9KGUuc3RhZ2VJbmRleGVzLGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO3IuY2xhc3NOYW1lPVwiXCIuY29uY2F0KGksXCJzbGlkZS1udW1iZXItY29udGFpbmVyXCIpO3ZhciBzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cy5jbGFzc05hbWU9Yzt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtuLnNldFNsaWRlTnVtYmVyPWZ1bmN0aW9uKGUpe3JldHVybiBhLmlubmVySFRNTD1lfTt2YXIgbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtsLmNsYXNzTmFtZT1cIlwiLmNvbmNhdChpLFwic2xhc2hcIik7dmFyIHU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTt1LmlubmVySFRNTD1vLmxlbmd0aCxyLmFwcGVuZENoaWxkKHMpLHMuYXBwZW5kQ2hpbGQoYSkscy5hcHBlbmRDaGlsZChsKSxzLmFwcGVuZENoaWxkKHUpLHQuYXBwZW5kQ2hpbGQociksc2V0VGltZW91dCgoZnVuY3Rpb24oKXtzLm9mZnNldFdpZHRoPjU1JiYoci5zdHlsZS5qdXN0aWZ5Q29udGVudD1cImZsZXgtc3RhcnRcIil9KSl9KGUsbyl9ZnVuY3Rpb24gQihlLHQsbixvKXt2YXIgaT1lLmVsZW1lbnRzLmNvbnRhaW5lcixyPW4uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrbi5zbGljZSgxKSxzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cy5jbGFzc05hbWU9XCJcIi5jb25jYXQocCxcIiBcIikuY29uY2F0KHAsXCItXCIpLmNvbmNhdChuKSxzLnRpdGxlPVwiXCIuY29uY2F0KHIsXCIgc2xpZGVcIikscy5vbmNsaWNrPXQsZnVuY3Rpb24oZSx0KXt2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO24uY2xhc3NOYW1lPVwiXCIuY29uY2F0KGYsXCIgXCIpLmNvbmNhdChjKSxPKG4sXCIyMHB4XCIsXCIwIDAgMjAgMjBcIix0KSxlLmFwcGVuZENoaWxkKG4pfShzLG8pLGkuYXBwZW5kQ2hpbGQocyl9ZnVuY3Rpb24gVShlKXt2YXIgdD1lLmNvcmUsbj10LmxpZ2h0Ym94Q2xvc2VyLG89dC5zbGlkZUNoYW5nZUZhY2FkZSxpPWUuZnM7dGhpcy5saXN0ZW5lcj1mdW5jdGlvbihlKXtzd2l0Y2goZS5rZXkpe2Nhc2VcIkVzY2FwZVwiOm4uY2xvc2VMaWdodGJveCgpO2JyZWFrO2Nhc2VcIkFycm93TGVmdFwiOm8uY2hhbmdlVG9QcmV2aW91cygpO2JyZWFrO2Nhc2VcIkFycm93UmlnaHRcIjpvLmNoYW5nZVRvTmV4dCgpO2JyZWFrO2Nhc2VcIkYxMVwiOmUucHJldmVudERlZmF1bHQoKSxpLnQoKX19fWZ1bmN0aW9uIHEoZSl7dmFyIHQ9ZS5lbGVtZW50cyxuPWUuc291cmNlUG9pbnRlclByb3BzLG89ZS5zdGFnZUluZGV4ZXM7ZnVuY3Rpb24gaShlLG8pe3Quc213W2VdLnYobi5zd2lwZWRYKVtvXSgpfXRoaXMucnVuQWN0aW9uc0ZvckV2ZW50PWZ1bmN0aW9uKGUpe3ZhciByLGEsYzt0LmNvbnRhaW5lci5jb250YWlucyh0LnNsaWRlU3dpcGluZ0hvdmVyZXIpfHx0LmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0LnNsaWRlU3dpcGluZ0hvdmVyZXIpLHI9dC5jb250YWluZXIsYT1zLChjPXIuY2xhc3NMaXN0KS5jb250YWlucyhhKXx8Yy5hZGQoYSksbi5zd2lwZWRYPWUuc2NyZWVuWC1uLmRvd25TY3JlZW5YO3ZhciBsPW8ucHJldmlvdXMsdT1vLm5leHQ7aShvLmN1cnJlbnQsXCJ6XCIpLHZvaWQgMCE9PWwmJm4uc3dpcGVkWD4wP2kobCxcIm5lXCIpOnZvaWQgMCE9PXUmJm4uc3dpcGVkWDwwJiZpKHUsXCJwXCIpfX1mdW5jdGlvbiBWKGUpe3ZhciB0PWUucHJvcHMuc291cmNlcyxuPWUucmVzb2x2ZSxvPWUuc291cmNlUG9pbnRlclByb3BzLGk9bihxKTsxPT09dC5sZW5ndGg/dGhpcy5saXN0ZW5lcj1mdW5jdGlvbigpe28uc3dpcGVkWD0xfTp0aGlzLmxpc3RlbmVyPWZ1bmN0aW9uKGUpe28uaXNQb2ludGVyaW5nJiZpLnJ1bkFjdGlvbnNGb3JFdmVudChlKX19ZnVuY3Rpb24gXyhlKXt2YXIgdD1lLmNvcmUuc2xpZGVJbmRleENoYW5nZXIsbj1lLmVsZW1lbnRzLnNtdyxvPWUuc3RhZ2VJbmRleGVzLGk9ZS5zd3M7ZnVuY3Rpb24gcihlKXt2YXIgdD1uW28uY3VycmVudF07dC5hKCksdFtlXSgpfWZ1bmN0aW9uIHMoZSx0KXt2b2lkIDAhPT1lJiYobltlXS5zKCksbltlXVt0XSgpKX10aGlzLnJ1blBvc2l0aXZlU3dpcGVkWEFjdGlvbnM9ZnVuY3Rpb24oKXt2YXIgZT1vLnByZXZpb3VzO2lmKHZvaWQgMD09PWUpcihcInpcIik7ZWxzZXtyKFwicFwiKTt2YXIgbj1vLm5leHQ7dC5jaGFuZ2VUbyhlKTt2YXIgYT1vLnByZXZpb3VzO2kuZChhKSxpLmIobikscihcInpcIikscyhhLFwibmVcIil9fSx0aGlzLnJ1bk5lZ2F0aXZlU3dpcGVkWEFjdGlvbnM9ZnVuY3Rpb24oKXt2YXIgZT1vLm5leHQ7aWYodm9pZCAwPT09ZSlyKFwielwiKTtlbHNle3IoXCJuZVwiKTt2YXIgbj1vLnByZXZpb3VzO3QuY2hhbmdlVG8oZSk7dmFyIGE9by5uZXh0O2kuZChhKSxpLmIobikscihcInpcIikscyhhLFwicFwiKX19fWZ1bmN0aW9uIFkoZSx0KXtlLmNvbnRhaW5zKHQpJiZlLnJlbW92ZUNoaWxkKHQpfWZ1bmN0aW9uIEooZSl7dmFyIHQ9ZS5jb3JlLmxpZ2h0Ym94Q2xvc2VyLG49ZS5lbGVtZW50cyxvPWUucmVzb2x2ZSxpPWUuc291cmNlUG9pbnRlclByb3BzLHI9byhfKTt0aGlzLnJ1bk5vU3dpcGVBY3Rpb25zPWZ1bmN0aW9uKCl7WShuLmNvbnRhaW5lcixuLnNsaWRlU3dpcGluZ0hvdmVyZXIpLGkuaXNTb3VyY2VEb3duRXZlbnRUYXJnZXR8fHQuY2xvc2VMaWdodGJveCgpLGkuaXNQb2ludGVyaW5nPSExfSx0aGlzLnJ1bkFjdGlvbnM9ZnVuY3Rpb24oKXtpLnN3aXBlZFg+MD9yLnJ1blBvc2l0aXZlU3dpcGVkWEFjdGlvbnMoKTpyLnJ1bk5lZ2F0aXZlU3dpcGVkWEFjdGlvbnMoKSxZKG4uY29udGFpbmVyLG4uc2xpZGVTd2lwaW5nSG92ZXJlciksbi5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShzKSxpLmlzUG9pbnRlcmluZz0hMX19ZnVuY3Rpb24gRyhlKXt2YXIgdD1lLnJlc29sdmUsbj1lLnNvdXJjZVBvaW50ZXJQcm9wcyxvPXQoSik7dGhpcy5saXN0ZW5lcj1mdW5jdGlvbigpe24uaXNQb2ludGVyaW5nJiYobi5zd2lwZWRYP28ucnVuQWN0aW9ucygpOm8ucnVuTm9Td2lwZUFjdGlvbnMoKSl9fWZ1bmN0aW9uICQoZSl7dmFyIHQ9dGhpcyxuPWUuY29yZSxvPW4uZXZlbnRzRGlzcGF0Y2hlcixpPW4uZ2xvYmFsRXZlbnRzQ29udHJvbGxlcixyPW4uc2Nyb2xsYmFyUmVjb21wZW5zb3Iscz1lLmRhdGEsYT1lLmVsZW1lbnRzLGM9ZS5mcyx1PWUucHJvcHMsZD1lLnNvdXJjZVBvaW50ZXJQcm9wczt0aGlzLmlzTGlnaHRib3hGYWRpbmdPdXQ9ITEsdGhpcy5ydW5BY3Rpb25zPWZ1bmN0aW9uKCl7dC5pc0xpZ2h0Ym94RmFkaW5nT3V0PSEwLGEuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQodiksaS5yZW1vdmVMaXN0ZW5lcnMoKSx1LmV4aXRGdWxsc2NyZWVuT25DbG9zZSYmcy5pZnMmJmMueCgpLHNldFRpbWVvdXQoKGZ1bmN0aW9uKCl7dC5pc0xpZ2h0Ym94RmFkaW5nT3V0PSExLGQuaXNQb2ludGVyaW5nPSExLGEuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUodiksZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobCksci5yZW1vdmVSZWNvbXBlbnNlKCksZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhLmNvbnRhaW5lciksby5kaXNwYXRjaChcIm9uQ2xvc2VcIil9KSwyNzApfX1mdW5jdGlvbiBLKGUsdCl7dmFyIG49ZS5jbGFzc0xpc3Q7bi5jb250YWlucyh0KSYmbi5yZW1vdmUodCl9ZnVuY3Rpb24gUShlKXt2YXIgdCxuLG87bj0odD1lKS5jb3JlLmV2ZW50c0Rpc3BhdGNoZXIsbz10LnByb3BzLG4uZGlzcGF0Y2g9ZnVuY3Rpb24oZSl7b1tlXSYmb1tlXSgpfSxmdW5jdGlvbihlKXt2YXIgdD1lLmNvbXBvbmVudHNTZXJ2aWNlcyxuPWUuZGF0YSxvPWUuZnMsaT1bXCJmdWxsc2NyZWVuY2hhbmdlXCIsXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIsXCJNU0Z1bGxzY3JlZW5DaGFuZ2VcIl07ZnVuY3Rpb24gcihlKXtmb3IodmFyIHQ9MDt0PGkubGVuZ3RoO3QrKylkb2N1bWVudFtlXShpW3RdLHMpfWZ1bmN0aW9uIHMoKXtkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudHx8ZG9jdW1lbnQud2Via2l0SXNGdWxsU2NyZWVufHxkb2N1bWVudC5tb3pGdWxsU2NyZWVufHxkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50P3Qub2ZzKCk6dC54ZnMoKX1vLm89ZnVuY3Rpb24oKXt0Lm9mcygpO3ZhciBlPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtlLnJlcXVlc3RGdWxsc2NyZWVuP2UucmVxdWVzdEZ1bGxzY3JlZW4oKTplLm1velJlcXVlc3RGdWxsU2NyZWVuP2UubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTplLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuP2Uud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTplLm1zUmVxdWVzdEZ1bGxzY3JlZW4mJmUubXNSZXF1ZXN0RnVsbHNjcmVlbigpfSxvLng9ZnVuY3Rpb24oKXt0LnhmcygpLGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuP2RvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk6ZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbj9kb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk6ZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4/ZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTpkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuJiZkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCl9LG8udD1mdW5jdGlvbigpe24uaWZzP28ueCgpOm8ubygpfSxvLmw9ZnVuY3Rpb24oKXtyKFwiYWRkRXZlbnRMaXN0ZW5lclwiKX0sby5xPWZ1bmN0aW9uKCl7cihcInJlbW92ZUV2ZW50TGlzdGVuZXJcIil9fShlKSxmdW5jdGlvbihlKXt2YXIgdD1lLmNvcmUsbj10Lmdsb2JhbEV2ZW50c0NvbnRyb2xsZXIsbz10LndpbmRvd1Jlc2l6ZUFjdGlvbmVyLGk9ZS5mcyxyPWUucmVzb2x2ZSxzPXIoVSksYT1yKFYpLGM9cihHKTtuLmF0dGFjaExpc3RlbmVycz1mdW5jdGlvbigpe2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLGEubGlzdGVuZXIpLGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIixjLmxpc3RlbmVyKSxhZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsby5ydW5BY3Rpb25zKSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLHMubGlzdGVuZXIpLGkubCgpfSxuLnJlbW92ZUxpc3RlbmVycz1mdW5jdGlvbigpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLGEubGlzdGVuZXIpLGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIixjLmxpc3RlbmVyKSxyZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsby5ydW5BY3Rpb25zKSxkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLHMubGlzdGVuZXIpLGkucSgpfX0oZSksZnVuY3Rpb24oZSl7dmFyIHQ9ZS5jb3JlLmxpZ2h0Ym94Q2xvc2VyLG49KDAsZS5yZXNvbHZlKSgkKTt0LmNsb3NlTGlnaHRib3g9ZnVuY3Rpb24oKXtuLmlzTGlnaHRib3hGYWRpbmdPdXR8fG4ucnVuQWN0aW9ucygpfX0oZSksZnVuY3Rpb24oZSl7dmFyIHQ9ZS5kYXRhLG49ZS5jb3JlLnNjcm9sbGJhclJlY29tcGVuc29yO2Z1bmN0aW9uIG8oKXtkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodD5pbm5lckhlaWdodCYmKGRvY3VtZW50LmJvZHkuc3R5bGUubWFyZ2luUmlnaHQ9dC5zY3JvbGxiYXJXaWR0aCtcInB4XCIpfW4uYWRkUmVjb21wZW5zZT1mdW5jdGlvbigpe1wiY29tcGxldGVcIj09PWRvY3VtZW50LnJlYWR5U3RhdGU/bygpOmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsKGZ1bmN0aW9uKCl7bygpLG4uYWRkUmVjb21wZW5zZT1vfSkpfSxuLnJlbW92ZVJlY29tcGVuc2U9ZnVuY3Rpb24oKXtkb2N1bWVudC5ib2R5LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwibWFyZ2luLXJpZ2h0XCIpfX0oZSksZnVuY3Rpb24oZSl7dmFyIHQ9ZS5jb3JlLG49dC5zbGlkZUNoYW5nZUZhY2FkZSxvPXQuc2xpZGVJbmRleENoYW5nZXIsaT10LnN0YWdlTWFuYWdlcjtlLnByb3BzLnNvdXJjZXMubGVuZ3RoPjE/KG4uY2hhbmdlVG9QcmV2aW91cz1mdW5jdGlvbigpe28uanVtcFRvKGkuZ2V0UHJldmlvdXNTbGlkZUluZGV4KCkpfSxuLmNoYW5nZVRvTmV4dD1mdW5jdGlvbigpe28uanVtcFRvKGkuZ2V0TmV4dFNsaWRlSW5kZXgoKSl9KToobi5jaGFuZ2VUb1ByZXZpb3VzPWZ1bmN0aW9uKCl7fSxuLmNoYW5nZVRvTmV4dD1mdW5jdGlvbigpe30pfShlKSxmdW5jdGlvbihlKXt2YXIgdD1lLmNvbXBvbmVudHNTZXJ2aWNlcyxuPWUuY29yZSxvPW4uc2xpZGVJbmRleENoYW5nZXIsaT1uLnNvdXJjZURpc3BsYXlGYWNhZGUscj1uLnN0YWdlTWFuYWdlcixzPWUuZWxlbWVudHMsYT1zLnNtdyxjPXMuc291cmNlQW5pbWF0aW9uV3JhcHBlcnMsbD1lLmlzbCx1PWUuc3RhZ2VJbmRleGVzLGQ9ZS5zd3M7by5jaGFuZ2VUbz1mdW5jdGlvbihlKXt1LmN1cnJlbnQ9ZSxyLnVwZGF0ZVN0YWdlSW5kZXhlcygpLHQuc2V0U2xpZGVOdW1iZXIoZSsxKSxpLmRpc3BsYXlTb3VyY2VzV2hpY2hTaG91bGRCZURpc3BsYXllZCgpfSxvLmp1bXBUbz1mdW5jdGlvbihlKXt2YXIgdD11LnByZXZpb3VzLG49dS5jdXJyZW50LGk9dS5uZXh0LHM9bFtuXSxmPWxbZV07by5jaGFuZ2VUbyhlKTtmb3IodmFyIHA9MDtwPGEubGVuZ3RoO3ArKylhW3BdLmQoKTtkLmQobiksZC5jKCkscmVxdWVzdEFuaW1hdGlvbkZyYW1lKChmdW5jdGlvbigpe3JlcXVlc3RBbmltYXRpb25GcmFtZSgoZnVuY3Rpb24oKXt2YXIgZT11LnByZXZpb3VzLG89dS5uZXh0O2Z1bmN0aW9uIHAoKXtyLmkobik/bj09PXUucHJldmlvdXM/YVtuXS5uZSgpOm49PT11Lm5leHQmJmFbbl0ucCgpOihhW25dLmgoKSxhW25dLm4oKSl9cyYmY1tuXS5jbGFzc0xpc3QuYWRkKG0pLGYmJmNbdS5jdXJyZW50XS5jbGFzc0xpc3QuYWRkKGgpLGQuYSgpLHZvaWQgMCE9PWUmJmUhPT1uJiZhW2VdLm5lKCksYVt1LmN1cnJlbnRdLm4oKSx2b2lkIDAhPT1vJiZvIT09biYmYVtvXS5wKCksZC5iKHQpLGQuYihpKSxsW25dP3NldFRpbWVvdXQocCwyNjApOnAoKX0pKX0pKX19KGUpLGZ1bmN0aW9uKGUpe3ZhciB0PWUuY29yZS5zb3VyY2VzUG9pbnRlckRvd24sbj1lLmVsZW1lbnRzLG89bi5zbXcsaT1uLnNvdXJjZXMscj1lLnNvdXJjZVBvaW50ZXJQcm9wcyxzPWUuc3RhZ2VJbmRleGVzO3QubGlzdGVuZXI9ZnVuY3Rpb24oZSl7XCJWSURFT1wiIT09ZS50YXJnZXQudGFnTmFtZSYmZS5wcmV2ZW50RGVmYXVsdCgpLHIuaXNQb2ludGVyaW5nPSEwLHIuZG93blNjcmVlblg9ZS5zY3JlZW5YLHIuc3dpcGVkWD0wO3ZhciB0PWlbcy5jdXJyZW50XTt0JiZ0LmNvbnRhaW5zKGUudGFyZ2V0KT9yLmlzU291cmNlRG93bkV2ZW50VGFyZ2V0PSEwOnIuaXNTb3VyY2VEb3duRXZlbnRUYXJnZXQ9ITE7Zm9yKHZhciBuPTA7bjxvLmxlbmd0aDtuKyspb1tuXS5kKCl9fShlKSxmdW5jdGlvbihlKXt2YXIgdD1lLmNvbGxlY3Rpb25zLnNvdXJjZXNSZW5kZXJGdW5jdGlvbnMsbj1lLmNvcmUuc291cmNlRGlzcGxheUZhY2FkZSxvPWUucHJvcHMsaT1lLnN0YWdlSW5kZXhlcztmdW5jdGlvbiByKGUpe3RbZV0mJih0W2VdKCksZGVsZXRlIHRbZV0pfW4uZGlzcGxheVNvdXJjZXNXaGljaFNob3VsZEJlRGlzcGxheWVkPWZ1bmN0aW9uKCl7aWYoby5sb2FkT25seUN1cnJlbnRTb3VyY2UpcihpLmN1cnJlbnQpO2Vsc2UgZm9yKHZhciBlIGluIGkpcihpW2VdKX19KGUpLGZ1bmN0aW9uKGUpe3ZhciB0PWUuY29yZS5zdGFnZU1hbmFnZXIsbj1lLmVsZW1lbnRzLG89bi5zbXcsaT1uLnNvdXJjZUFuaW1hdGlvbldyYXBwZXJzLHI9ZS5pc2wscz1lLnN0YWdlSW5kZXhlcyxhPWUuc3dzO2EuYT1mdW5jdGlvbigpe2Zvcih2YXIgZSBpbiBzKW9bc1tlXV0ucygpfSxhLmI9ZnVuY3Rpb24oZSl7dm9pZCAwPT09ZXx8dC5pKGUpfHwob1tlXS5oKCksb1tlXS5uKCkpfSxhLmM9ZnVuY3Rpb24oKXtmb3IodmFyIGUgaW4gcylhLmQoc1tlXSl9LGEuZD1mdW5jdGlvbihlKXtpZihyW2VdKXt2YXIgdD1pW2VdO0sodCxnKSxLKHQsaCksSyh0LG0pfX19KGUpLGZ1bmN0aW9uKGUpe3ZhciB0PWUuY29sbGVjdGlvbnMuc291cmNlU2l6ZXJzLG49ZS5jb3JlLndpbmRvd1Jlc2l6ZUFjdGlvbmVyLG89ZS5kYXRhLGk9ZS5lbGVtZW50cy5zbXcscj1lLnN0YWdlSW5kZXhlcztuLnJ1bkFjdGlvbnM9ZnVuY3Rpb24oKXtpbm5lcldpZHRoPDk5Mj9vLm1heFNvdXJjZVdpZHRoPWlubmVyV2lkdGg6by5tYXhTb3VyY2VXaWR0aD0uOSppbm5lcldpZHRoLG8ubWF4U291cmNlSGVpZ2h0PS45KmlubmVySGVpZ2h0O2Zvcih2YXIgZT0wO2U8aS5sZW5ndGg7ZSsrKWlbZV0uZCgpLHRbZV0mJnRbZV0uYWRqdXN0U2l6ZSgpO3ZhciBuPXIucHJldmlvdXMscz1yLm5leHQ7dm9pZCAwIT09biYmaVtuXS5uZSgpLHZvaWQgMCE9PXMmJmlbc10ucCgpfX0oZSl9ZnVuY3Rpb24gWihlKXt2YXIgdD1lLmNvbXBvbmVudHNTZXJ2aWNlcyxuPWUuY29yZSxvPW4uZXZlbnRzRGlzcGF0Y2hlcixyPW4uZ2xvYmFsRXZlbnRzQ29udHJvbGxlcixzPW4uc2Nyb2xsYmFyUmVjb21wZW5zb3IsYz1uLnNvdXJjZURpc3BsYXlGYWNhZGUsdT1uLnN0YWdlTWFuYWdlcixmPW4ud2luZG93UmVzaXplQWN0aW9uZXIscD1lLmRhdGEsaD1lLmVsZW1lbnRzLG09KGUucHJvcHMsZS5zdGFnZUluZGV4ZXMpLHY9ZS5zd3M7ZnVuY3Rpb24gYigpe3ZhciB0LG47cC5pPSEwLHAuc2Nyb2xsYmFyV2lkdGg9ZnVuY3Rpb24oKXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLHQ9ZS5zdHlsZSxuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dC52aXNpYmlsaXR5PVwiaGlkZGVuXCIsdC53aWR0aD1cIjEwMHB4XCIsdC5tc092ZXJmbG93U3R5bGU9XCJzY3JvbGxiYXJcIix0Lm92ZXJmbG93PVwic2Nyb2xsXCIsbi5zdHlsZS53aWR0aD1cIjEwMCVcIixkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGUpO3ZhciBvPWUub2Zmc2V0V2lkdGg7ZS5hcHBlbmRDaGlsZChuKTt2YXIgaT1uLm9mZnNldFdpZHRoO3JldHVybiBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGUpLG8taX0oKSxRKGUpLGguY29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksaC5jb250YWluZXIuY2xhc3NOYW1lPVwiXCIuY29uY2F0KGksXCJjb250YWluZXIgXCIpLmNvbmNhdChhLFwiIFwiKS5jb25jYXQoZyksZnVuY3Rpb24oZSl7dmFyIHQ9ZS5lbGVtZW50czt0LnNsaWRlU3dpcGluZ0hvdmVyZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSx0LnNsaWRlU3dpcGluZ0hvdmVyZXIuY2xhc3NOYW1lPVwiXCIuY29uY2F0KGksXCJzbGlkZS1zd2lwaW5nLWhvdmVyZXIgXCIpLmNvbmNhdChhLFwiIFwiKS5jb25jYXQoZCl9KGUpLFgoZSksZnVuY3Rpb24oZSl7dmFyIHQ9ZS5jb3JlLnNvdXJjZXNQb2ludGVyRG93bixuPWUuZWxlbWVudHMsbz1lLnByb3BzLnNvdXJjZXMsaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2kuY2xhc3NOYW1lPVwiXCIuY29uY2F0KGQsXCIgXCIpLmNvbmNhdChhKSxuLmNvbnRhaW5lci5hcHBlbmRDaGlsZChpKSxpLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLHQubGlzdGVuZXIpLG4uc291cmNlV3JhcHBlcnNDb250YWluZXI9aTtmb3IodmFyIHI9MDtyPG8ubGVuZ3RoO3IrKylEKGUscil9KGUpLGUucHJvcHMuc291cmNlcy5sZW5ndGg+MSYmKG49KHQ9ZSkuY29yZS5zbGlkZUNoYW5nZUZhY2FkZSxCKHQsbi5jaGFuZ2VUb1ByZXZpb3VzLFwicHJldmlvdXNcIixcIk0xOC4yNzEsOS4yMTJIMy42MTVsNC4xODQtNC4xODRjMC4zMDYtMC4zMDYsMC4zMDYtMC44MDEsMC0xLjEwN2MtMC4zMDYtMC4zMDYtMC44MDEtMC4zMDYtMS4xMDcsMEwxLjIxLDkuNDAzQzEuMTk0LDkuNDE3LDEuMTc0LDkuNDIxLDEuMTU4LDkuNDM3Yy0wLjE4MSwwLjE4MS0wLjI0MiwwLjQyNS0wLjIwOSwwLjY2YzAuMDA1LDAuMDM4LDAuMDEyLDAuMDcxLDAuMDIyLDAuMTA5YzAuMDI4LDAuMDk4LDAuMDc1LDAuMTg4LDAuMTQyLDAuMjcxYzAuMDIxLDAuMDI2LDAuMDIxLDAuMDYxLDAuMDQ1LDAuMDg1YzAuMDE1LDAuMDE2LDAuMDM0LDAuMDIsMC4wNSwwLjAzM2w1LjQ4NCw1LjQ4M2MwLjMwNiwwLjMwNywwLjgwMSwwLjMwNywxLjEwNywwYzAuMzA2LTAuMzA1LDAuMzA2LTAuODAxLDAtMS4xMDVsLTQuMTg0LTQuMTg1aDE0LjY1NmMwLjQzNiwwLDAuNzg4LTAuMzUzLDAuNzg4LTAuNzg4UzE4LjcwNyw5LjIxMiwxOC4yNzEsOS4yMTJ6XCIpLEIodCxuLmNoYW5nZVRvTmV4dCxcIm5leHRcIixcIk0xLjcyOSw5LjIxMmgxNC42NTZsLTQuMTg0LTQuMTg0Yy0wLjMwNy0wLjMwNi0wLjMwNy0wLjgwMSwwLTEuMTA3YzAuMzA1LTAuMzA2LDAuODAxLTAuMzA2LDEuMTA2LDBsNS40ODEsNS40ODJjMC4wMTgsMC4wMTQsMC4wMzcsMC4wMTksMC4wNTMsMC4wMzRjMC4xODEsMC4xODEsMC4yNDIsMC40MjUsMC4yMDksMC42NmMtMC4wMDQsMC4wMzgtMC4wMTIsMC4wNzEtMC4wMjEsMC4xMDljLTAuMDI4LDAuMDk4LTAuMDc1LDAuMTg4LTAuMTQzLDAuMjcxYy0wLjAyMSwwLjAyNi0wLjAyMSwwLjA2MS0wLjA0NSwwLjA4NWMtMC4wMTUsMC4wMTYtMC4wMzQsMC4wMi0wLjA1MSwwLjAzM2wtNS40ODMsNS40ODNjLTAuMzA2LDAuMzA3LTAuODAyLDAuMzA3LTEuMTA2LDBjLTAuMzA3LTAuMzA1LTAuMzA3LTAuODAxLDAtMS4xMDVsNC4xODQtNC4xODVIMS43MjljLTAuNDM2LDAtMC43ODgtMC4zNTMtMC43ODgtMC43ODhTMS4yOTMsOS4yMTIsMS43MjksOS4yMTJ6XCIpKSxmdW5jdGlvbihlKXtmb3IodmFyIHQ9ZS5wcm9wcy5zb3VyY2VzLG49ZS5yZXNvbHZlLG89bihMKSxpPW4oSCkscj1uKFIsW28saV0pLHM9MDtzPHQubGVuZ3RoO3MrKylpZihcInN0cmluZ1wiPT10eXBlb2YgdFtzXSl7dmFyIGE9ci5nZXRUeXBlU2V0QnlDbGllbnRGb3JJbmRleChzKTtpZihhKWkucnVuQWN0aW9uc0ZvclNvdXJjZVR5cGVBbmRJbmRleChhLHMpO2Vsc2V7dmFyIGM9by5nZXRTb3VyY2VUeXBlRnJvbUxvY2FsU3RvcmFnZUJ5VXJsKHRbc10pO2M/aS5ydW5BY3Rpb25zRm9yU291cmNlVHlwZUFuZEluZGV4KGMscyk6ci5yZXRyaWV2ZVR5cGVXaXRoWGhyRm9ySW5kZXgocyl9fWVsc2UgaS5ydW5BY3Rpb25zRm9yU291cmNlVHlwZUFuZEluZGV4KFwiY3VzdG9tXCIscyl9KGUpLG8uZGlzcGF0Y2goXCJvbkluaXRcIil9ZS5vcGVuPWZ1bmN0aW9uKCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOjAsaT1tLnByZXZpb3VzLGE9bS5jdXJyZW50LGQ9bS5uZXh0O20uY3VycmVudD1uLHAuaXx8UyhlKSx1LnVwZGF0ZVN0YWdlSW5kZXhlcygpLHAuaT8odi5jKCksdi5hKCksdi5iKGkpLHYuYihhKSx2LmIoZCksby5kaXNwYXRjaChcIm9uU2hvd1wiKSk6YigpLGMuZGlzcGxheVNvdXJjZXNXaGljaFNob3VsZEJlRGlzcGxheWVkKCksdC5zZXRTbGlkZU51bWJlcihuKzEpLGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaC5jb250YWluZXIpLGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKGwpLHMuYWRkUmVjb21wZW5zZSgpLHIuYXR0YWNoTGlzdGVuZXJzKCksZi5ydW5BY3Rpb25zKCksaC5zbXdbbS5jdXJyZW50XS5uKCksby5kaXNwYXRjaChcIm9uT3BlblwiKX19ZnVuY3Rpb24gZWUoZSx0LG4pe3JldHVybihlZT10ZSgpP1JlZmxlY3QuY29uc3RydWN0LmJpbmQoKTpmdW5jdGlvbihlLHQsbil7dmFyIG89W251bGxdO28ucHVzaC5hcHBseShvLHQpO3ZhciBpPW5ldyhGdW5jdGlvbi5iaW5kLmFwcGx5KGUsbykpO3JldHVybiBuJiZuZShpLG4ucHJvdG90eXBlKSxpfSkuYXBwbHkobnVsbCxhcmd1bWVudHMpfWZ1bmN0aW9uIHRlKCl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFJlZmxlY3R8fCFSZWZsZWN0LmNvbnN0cnVjdClyZXR1cm4hMTtpZihSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKXJldHVybiExO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIFByb3h5KXJldHVybiEwO3RyeXtyZXR1cm4gQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sW10sKGZ1bmN0aW9uKCl7fSkpKSwhMH1jYXRjaChlKXtyZXR1cm4hMX19ZnVuY3Rpb24gbmUoZSx0KXtyZXR1cm4obmU9T2JqZWN0LnNldFByb3RvdHlwZU9mP09iamVjdC5zZXRQcm90b3R5cGVPZi5iaW5kKCk6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5fX3Byb3RvX189dCxlfSkoZSx0KX1mdW5jdGlvbiBvZShlKXtyZXR1cm4gZnVuY3Rpb24oZSl7aWYoQXJyYXkuaXNBcnJheShlKSlyZXR1cm4gaWUoZSl9KGUpfHxmdW5jdGlvbihlKXtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZudWxsIT1lW1N5bWJvbC5pdGVyYXRvcl18fG51bGwhPWVbXCJAQGl0ZXJhdG9yXCJdKXJldHVybiBBcnJheS5mcm9tKGUpfShlKXx8ZnVuY3Rpb24oZSx0KXtpZighZSlyZXR1cm47aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpcmV0dXJuIGllKGUsdCk7dmFyIG49T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpLnNsaWNlKDgsLTEpO1wiT2JqZWN0XCI9PT1uJiZlLmNvbnN0cnVjdG9yJiYobj1lLmNvbnN0cnVjdG9yLm5hbWUpO2lmKFwiTWFwXCI9PT1ufHxcIlNldFwiPT09bilyZXR1cm4gQXJyYXkuZnJvbShlKTtpZihcIkFyZ3VtZW50c1wiPT09bnx8L14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpcmV0dXJuIGllKGUsdCl9KGUpfHxmdW5jdGlvbigpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpfSgpfWZ1bmN0aW9uIGllKGUsdCl7KG51bGw9PXR8fHQ+ZS5sZW5ndGgpJiYodD1lLmxlbmd0aCk7Zm9yKHZhciBuPTAsbz1uZXcgQXJyYXkodCk7bjx0O24rKylvW25dPWVbbl07cmV0dXJuIG99ZnVuY3Rpb24gcmUoKXtmb3IodmFyIGU9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJhXCIpLHQ9ZnVuY3Rpb24odCl7aWYoIWVbdF0uaGFzQXR0cmlidXRlKFwiZGF0YS1mc2xpZ2h0Ym94XCIpKXJldHVyblwiY29udGludWVcIjt2YXIgbj1lW3RdLmhhc0F0dHJpYnV0ZShcImRhdGEtaHJlZlwiKT9lW3RdLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKTplW3RdLmdldEF0dHJpYnV0ZShcImhyZWZcIik7aWYoIW4pcmV0dXJuIGNvbnNvbGUud2FybignVGhlIFwiZGF0YS1mc2xpZ2h0Ym94XCIgYXR0cmlidXRlIHdhcyBzZXQgd2l0aG91dCB0aGUgXCJocmVmXCIgYXR0cmlidXRlLicpLFwiY29udGludWVcIjt2YXIgbz1lW3RdLmdldEF0dHJpYnV0ZShcImRhdGEtZnNsaWdodGJveFwiKTtmc0xpZ2h0Ym94SW5zdGFuY2VzW29dfHwoZnNMaWdodGJveEluc3RhbmNlc1tvXT1uZXcgRnNMaWdodGJveCk7dmFyIGk9bnVsbDtcIiNcIj09PW4uY2hhckF0KDApPyhpPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG4uc3Vic3RyaW5nKDEpKS5jbG9uZU5vZGUoITApKS5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTppPW4sZnNMaWdodGJveEluc3RhbmNlc1tvXS5wcm9wcy5zb3VyY2VzLnB1c2goaSksZnNMaWdodGJveEluc3RhbmNlc1tvXS5lbGVtZW50cy5hLnB1c2goZVt0XSk7dmFyIHI9ZnNMaWdodGJveEluc3RhbmNlc1tvXS5wcm9wcy5zb3VyY2VzLmxlbmd0aC0xO2VbdF0ub25jbGljaz1mdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCksZnNMaWdodGJveEluc3RhbmNlc1tvXS5vcGVuKHIpfSxkKFwidHlwZXNcIixcImRhdGEtdHlwZVwiKSxkKFwidmlkZW9zUG9zdGVyc1wiLFwiZGF0YS12aWRlby1wb3N0ZXJcIiksZChcImN1c3RvbUNsYXNzZXNcIixcImRhdGEtY2xhc3NcIiksZChcImN1c3RvbUNsYXNzZXNcIixcImRhdGEtY3VzdG9tLWNsYXNzXCIpO2Zvcih2YXIgcz1bXCJocmVmXCIsXCJkYXRhLWZzbGlnaHRib3hcIixcImRhdGEtaHJlZlwiLFwiZGF0YS10eXBlXCIsXCJkYXRhLXZpZGVvLXBvc3RlclwiLFwiZGF0YS1jbGFzc1wiLFwiZGF0YS1jdXN0b20tY2xhc3NcIl0sYT1lW3RdLmF0dHJpYnV0ZXMsYz1mc0xpZ2h0Ym94SW5zdGFuY2VzW29dLnByb3BzLmN1c3RvbUF0dHJpYnV0ZXMsbD0wO2w8YS5sZW5ndGg7bCsrKWlmKC0xPT09cy5pbmRleE9mKGFbbF0ubmFtZSkmJlwiZGF0YS1cIj09PWFbbF0ubmFtZS5zdWJzdHIoMCw1KSl7Y1tyXXx8KGNbcl09e30pO3ZhciB1PWFbbF0ubmFtZS5zdWJzdHIoNSk7Y1tyXVt1XT1hW2xdLnZhbHVlfWZ1bmN0aW9uIGQobixpKXtlW3RdLmhhc0F0dHJpYnV0ZShpKSYmKGZzTGlnaHRib3hJbnN0YW5jZXNbb10ucHJvcHNbbl1bcl09ZVt0XS5nZXRBdHRyaWJ1dGUoaSkpfX0sbj0wO248ZS5sZW5ndGg7bisrKXQobik7dmFyIG89T2JqZWN0LmtleXMoZnNMaWdodGJveEluc3RhbmNlcyk7d2luZG93LmZzTGlnaHRib3g9ZnNMaWdodGJveEluc3RhbmNlc1tvW28ubGVuZ3RoLTFdXX13aW5kb3cuRnNMaWdodGJveD1mdW5jdGlvbigpe3ZhciBlPXRoaXM7dGhpcy5wcm9wcz17c291cmNlczpbXSxjdXN0b21BdHRyaWJ1dGVzOltdLGN1c3RvbUNsYXNzZXM6W10sdHlwZXM6W10sdmlkZW9zUG9zdGVyczpbXSxzbGlkZURpc3RhbmNlOi4zfSx0aGlzLmRhdGE9e2lzRnVsbHNjcmVlbk9wZW46ITEsbWF4U291cmNlV2lkdGg6MCxtYXhTb3VyY2VIZWlnaHQ6MCxzY3JvbGxiYXJXaWR0aDowfSx0aGlzLmlzbD1bXSx0aGlzLnNvdXJjZVBvaW50ZXJQcm9wcz17ZG93blNjcmVlblg6bnVsbCxpc1BvaW50ZXJpbmc6ITEsaXNTb3VyY2VEb3duRXZlbnRUYXJnZXQ6ITEsc3dpcGVkWDowfSx0aGlzLnN0YWdlSW5kZXhlcz17fSx0aGlzLmVsZW1lbnRzPXthOltdLGNvbnRhaW5lcjpudWxsLHNsaWRlU3dpcGluZ0hvdmVyZXI6bnVsbCxzbXc6W10sc291cmNlV3JhcHBlcnNDb250YWluZXI6bnVsbCxzb3VyY2VzOltdLHNvdXJjZUFuaW1hdGlvbldyYXBwZXJzOltdfSx0aGlzLmNvbXBvbmVudHNTZXJ2aWNlcz17c2V0U2xpZGVOdW1iZXI6ZnVuY3Rpb24oKXt9fSx0aGlzLnJlc29sdmU9ZnVuY3Rpb24odCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOltdO3JldHVybiBuLnVuc2hpZnQoZSksZWUodCxvZShuKSl9LHRoaXMuY29sbGVjdGlvbnM9e3NvdXJjZUxvYWRIYW5kbGVyczpbXSxzb3VyY2VzUmVuZGVyRnVuY3Rpb25zOltdLHNvdXJjZVNpemVyczpbXX0sdGhpcy5jb3JlPXtldmVudHNEaXNwYXRjaGVyOnt9LGdsb2JhbEV2ZW50c0NvbnRyb2xsZXI6e30sbGlnaHRib3hDbG9zZXI6e30sbGlnaHRib3hVcGRhdGVyOnt9LHNjcm9sbGJhclJlY29tcGVuc29yOnt9LHNsaWRlQ2hhbmdlRmFjYWRlOnt9LHNsaWRlSW5kZXhDaGFuZ2VyOnt9LHNvdXJjZXNQb2ludGVyRG93bjp7fSxzb3VyY2VEaXNwbGF5RmFjYWRlOnt9LHN0YWdlTWFuYWdlcjp7fSx3aW5kb3dSZXNpemVBY3Rpb25lcjp7fX0sdGhpcy5mcz17fSx0aGlzLnN3cz17fSxaKHRoaXMpLHRoaXMuY2xvc2U9ZnVuY3Rpb24oKXtyZXR1cm4gZS5jb3JlLmxpZ2h0Ym94Q2xvc2VyLmNsb3NlTGlnaHRib3goKX19LHdpbmRvdy5mc0xpZ2h0Ym94SW5zdGFuY2VzPXt9LHJlKCksd2luZG93LnJlZnJlc2hGc0xpZ2h0Ym94PWZ1bmN0aW9uKCl7Zm9yKHZhciBlIGluIGZzTGlnaHRib3hJbnN0YW5jZXMpe3ZhciB0PWZzTGlnaHRib3hJbnN0YW5jZXNbZV0ucHJvcHM7ZnNMaWdodGJveEluc3RhbmNlc1tlXT1uZXcgRnNMaWdodGJveCxmc0xpZ2h0Ym94SW5zdGFuY2VzW2VdLnByb3BzPXQsZnNMaWdodGJveEluc3RhbmNlc1tlXS5wcm9wcy5zb3VyY2VzPVtdLGZzTGlnaHRib3hJbnN0YW5jZXNbZV0uZWxlbWVudHMuYT1bXX1yZSgpfX1dKX0pKTsiLCJqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICBcbiAgalF1ZXJ5KCdbZGF0YS1tb2RhbF0nKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCdmdWNrIG1lICcpO1xuXG4gICAgdmFyIGRhdGFfbW9kYWwgPSBqUXVlcnkodGhpcykuZGF0YSgnbW9kYWwnKTtcblxuICAgIGpRdWVyeSggZGF0YV9tb2RhbCApLnlzcF9tb2RhbCh7XG4gICAgXHRjbG9zZVRleHQ6ICdYJyxcbiAgICAgIG1vZGFsQ2xhc3M6ICd5c3AtbW9kYWwtb3BlbicsXG4gICAgICBjbG9zZUNsYXNzOiAneXNwLW1vZGVsLWNsb3NlJ1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBjb3B5TGluaygpIHtcblxuICB2YXIgY29weVRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvcHlMaW5rSW5wdXRcIik7XG5cbiAgY29weVRleHQuc2VsZWN0KCk7XG4gIGNvcHlUZXh0LnNldFNlbGVjdGlvblJhbmdlKDAsIDk5OTk5KTtcblxuICBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XG5cbiAgYWxlcnQoXCJDb3BpZWQgdGhlIGxpbms6IFwiICsgY29weVRleHQudmFsdWUpO1xufSIsIk9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdHJpbmcucHJvdG90eXBlLCAnZWFjaFdvcmRDYXBpdGFsaXplJywge1xuICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9Mb3dlckNhc2UoKVxuICAgIC5zcGxpdCgnICcpXG4gICAgLm1hcCgocykgPT4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc3Vic3RyaW5nKDEpKVxuICAgIC5qb2luKCcgJyk7XG4gIH0sXG4gIGVudW1lcmFibGU6IGZhbHNlXG59KTtcblxuZnVuY3Rpb24gcmFpeXNfZ2V0X2Zvcm1fZGF0YShmb3JtX2VsZSkge1xuICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSggZm9ybV9lbGUgKTtcblxuICAgIGxldCBmZD1PYmplY3QuZnJvbUVudHJpZXMoZm9ybURhdGEuZW50cmllcygpKTtcblxuICAgIGZvciAoY29uc3QgW2ZJbmRleCwgZmllbGRdIG9mIE9iamVjdC5lbnRyaWVzKGZkKSkge1xuXG4gICAgICAgIGxldCBWYWxBcnJheSA9IGZvcm1EYXRhLmdldEFsbChmSW5kZXgpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgVmFsQXJyYXlbMV0gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGZkWyBmSW5kZXggXSA9IFZhbEFycmF5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZkWyBmSW5kZXggXSA9PSAnJykge1xuICAgICAgICAgICAgZGVsZXRlIGZkW2ZJbmRleF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmQ7XG59XG5cbmZ1bmN0aW9uIHJhaXlzX3NldF9mb3JtX3RvX2RhdGEoaW5wdXREYXRhKSB7XG5cbiAgICBsZXQgZm9ybUE9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpO1xuICAgIGxldCBmb3JtQj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybScpO1xuXG4gICAgZm9ybUEucmVzZXQoKTtcbiAgICBmb3JtQi5yZXNldCgpO1xuXG4gICAgbGV0IGZvcm1JbnB1dHM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AteWFjaHQtc2VhcmNoLWZvcm1cIl0sICN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm1cIl0nKTtcblxuICAgIGZvcm1JbnB1dHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgIGxldCBpbnB1dCA9IGVsZTtcblxuICAgICAgICBsZXQgbmFtZSA9IGVsZS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICBsZXQgaGFzUHJldHR5ID0gaW5wdXREYXRhWyBuYW1lIF07XG5cbiAgICAgICAvLyBjb25zb2xlLmxvZyhoYXNQcmV0dHkpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgaGFzUHJldHR5ICE9ICdudWxsJyAmJiB0eXBlb2YgaGFzUHJldHR5ICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGhhc1ByZXR0eSkpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgICAgICAgICBoYXNQcmV0dHkuZm9yRWFjaCgoaFApID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoUCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaGFzUHJldHR5ICkge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUgIT0gJ2NoZWNrYm94JyAmJiBpbnB1dC50eXBlICE9ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBoYXNQcmV0dHk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByYWl5c19wdXNoX2hpc3RvcnkoIGRhdGEgPSB7fSApIHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgIGxldCBzdHJwYXRoPScnO1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGxldCBpdCA9IGRhdGFbIHByb3BlcnR5IF07XG5cblxuICAgICAgICBpZiAoaXQgIT0gJycgJiYgdHlwZW9mIGl0ICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBpdCA9PSAnc3RyaW5nJyAmJiBwcm9wZXJ0eSAhPSAnT25GaXJzdExvYWQnICYmIHR5cGVvZiBpdCAhPSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChwcm9wZXJ0eSwgaXQpO1xuXG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgrXCJcIitwcm9wZXJ0eSsnLScrKGl0LnRvU3RyaW5nKCkuc3BsaXQoJyAnKS5qb2luKCctJykpKycvJztcbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXQpKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KHByb3BlcnR5LCBpdCk7XG5cbiAgICAgICAgICAgIGl0ID0gaXQubWFwKChwcm9wKSA9PiB7IHJldHVybiBwcm9wLnRvU3RyaW5nKCkuc3BsaXQoJyAnKS5qb2luKCctJyk7IH0pO1xuXG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgrXCJcIitwcm9wZXJ0eSsnLScrKCBpdC5qb2luKFwiK1wiKSApKycvJztcbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aC50b0xvd2VyQ2FzZSgpOyAgXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy9oaXN0b3J5LnB1c2hTdGF0ZShkYXRhLCAnJywgcmFpX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3VybCsnPycrc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCkpO1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKGRhdGEsICcnLCByYWlfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfdXJsK3N0cnBhdGgpO1xuXG4gICAgcmV0dXJuIHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF91cmwrc3RycGF0aDsgICAgXG59XG5cbiIsInZhciByYWlfeXNwX2FwaT17fTtcblxuICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpPWZ1bmN0aW9uKG1ldGhvZCwgcGF0aCwgcGFzc2luZ19kYXRhKSB7XG4gICAgICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZURhdGEgPSBKU09OLnBhcnNlKCB0aGlzLnJlc3BvbnNlVGV4dCApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VEYXRhKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnR0VUJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFzc2luZ19kYXRhLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHBhc3NpbmdfZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQocHJvcGVydHksIHBhc3NpbmdfZGF0YVsgcHJvcGVydHkgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBfcXVlc3Rpb25NYXJrPXNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgcmFpX3lhY2h0X3N5bmMud3BfcmVzdF91cmwrXCJyYWl5cy9cIisgcGF0aCArICgoX3F1ZXN0aW9uTWFyayAhPSAnJyk/Jz8nK3NlYXJjaFBhcmFtcy50b1N0cmluZygpOicnKSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2VuZCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnUE9TVCc6XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAub3BlbihcIlBPU1RcIiwgcmFpX3lhY2h0X3N5bmMud3BfcmVzdF91cmwrXCJyYWl5cy9cIisgcGF0aCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KHBhc3NpbmdfZGF0YSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfTsiLCJ2YXIgeXNwX3RlbXBsYXRlcz17fTtcblx0eXNwX3RlbXBsYXRlcy55YWNodD17fTtcblx0XG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQuZ3JpZD1mdW5jdGlvbih2ZXNzZWwsIHBhcmFtcykge1xuXHRcdGxldCBtZXRlcnMgPSBwYXJzZUludCh2ZXNzZWwuTm9taW5hbExlbmd0aCkgKiAwLjMwNDg7XG5cblx0XHRsZXQgcHJpY2UgPSAnJztcblx0XHRsZXQgbGVuZ3RoID0gJyc7XG5cblx0XHRpZiAocmFpX3lhY2h0X3N5bmMuZXVyb3BlX29wdGlvbl9waWNrZWQgPT0gXCJ5ZXNcIikge1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblx0XHRcdHByaWNlID0gKHR5cGVvZiB2ZXNzZWwuWVNQX0V1cm9WYWwgIT0gJ3VuZGVmaW5lZCcgJiYgdmVzc2VsLllTUF9FdXJvVmFsID4gMCkgPyBg4oKsJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQodmVzc2VsLllTUF9FdXJvVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0fSBcblx0XHRlbHNlIHtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gdmVzc2VsLk5vbWluYWxMZW5ndGggKyBcIiAvIFwiICsgbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cblx0XHRcdGlmIChwYXJhbXMuY3VycmVuY3kgPT0gJ0V1cicpIHtcblx0XHRcdFx0cHJpY2UgPSAodHlwZW9mIHZlc3NlbC5ZU1BfVVNEVmFsICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5ZU1BfVVNEVmFsID4gMCkgPyBg4oKsJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQodmVzc2VsLllTUF9FdXJvVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cHJpY2UgPSAodHlwZW9mIHZlc3NlbC5ZU1BfVVNEVmFsICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5ZU1BfVVNEVmFsID4gMCkgPyBgJCR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHZlc3NlbC5ZU1BfVVNEVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gYFxuXHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXJlc3VsdC1ncmlkLWl0ZW1cIiBkYXRhLXBvc3QtaWQ9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCIgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2UtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGEgY2xhc3M9XCJ5YWNodC1kZXRhaWxzXCIgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZVwiIHNyYz1cIiR7dmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogcmFpX3lhY2h0X3N5bmMuYXNzZXRzX3VybCArICdpbWFnZXMvZGVmYXVsdC15YWNodC1pbWFnZS5qcGVnJ31cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblx0XHRcdFx0XHRcdCR7dmVzc2VsLkNvbXBhbnlOYW1lID09PSByYWlfeWFjaHRfc3luYy5jb21wYW55X25hbWUgPyBgPGRpdiBjbGFzcz1cImNvbXBhbnktYmFubmVyXCI+PGltZyBzcmM9XCIke3JhaV95YWNodF9zeW5jLmNvbXBhbnlfbG9nb31cIj48L2Rpdj5gIDogJyd9XG5cdFx0XHRcdFx0PC9hPlx0XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtZ2VuZXJhbC1pbmZvLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC10aXRsZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxhIGNsYXNzPVwieWFjaHQtZGV0YWlsc1wiIGhyZWY9XCIkeyB2ZXNzZWwuX2xpbmsgfVwiPlxuXHRcdFx0XHRcdFx0XHQ8aDYgY2xhc3M9XCJ5YWNodC10aXRsZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnJ30gJHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJyd9ICR7dmVzc2VsLk1vZGVsID8gdmVzc2VsLk1vZGVsIDogJyd9ICR7dmVzc2VsLkJvYXROYW1lID8gdmVzc2VsLkJvYXROYW1lIDogJyd9PC9oNj5cblx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5mby1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmZvXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPlllYXI8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkNhYmluczwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5DYWJpbnNDb3VudE51bWVyaWMgPyB2ZXNzZWwuQ2FiaW5zQ291bnROdW1lcmljIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+QnVpbGRlcjwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5MZW5ndGg8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHtsZW5ndGh9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+Q29tcGFyZTwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJjb21wYXJlX3RvZ2dsZVwiIG5hbWU9XCJjb21wYXJlXCIgdmFsdWU9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCIgLz48L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXByaWNlLWRldGFpbHMtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcHJpY2UtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtcHJpY2VcIj4ke3ByaWNlfTwvcD5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwieWFjaHQtZG93bmxvYWQtYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtbW9kYWw9XCIjc2luZ2xlLXNoYXJlXCI+Q29udGFjdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cImxvdmVcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5MaWtlZDwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cdH07XG5cblx0eXNwX3RlbXBsYXRlcy55YWNodC5saXN0PWZ1bmN0aW9uKHZlc3NlbCkge1xuXHRcdGxldCBtZXRlcnMgPSBwYXJzZUludCh2ZXNzZWwuTm9taW5hbExlbmd0aCkgKiAwLjMwNDg7XG5cdFx0bGV0IHByaWNlID0gJyc7XG5cblx0XHRpZiAodHlwZW9mIHZlc3NlbC5QcmljZSA9PSAnc3RyaW5nJykge1xuXHRcdFx0bGV0IHByaWNlID0gdmVzc2VsLlByaWNlLnNsaWNlKDAsIC0zKTtcblx0XHR9XG5cdFx0XG5cdFx0bGV0IGxlbmd0aCA9ICcnO1xuXHRcdFxuXHRcdGlmKHJhaV95YWNodF9zeW5jLmV1cm9wZV9vcHRpb25fcGlja2VkID09IFwieWVzXCIpe1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblx0XHRcdHByaWNlID0gdmVzc2VsLlByaWNlID8gYOKCrCAke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdCgocGFyc2VJbnQodmVzc2VsLlByaWNlLnNsaWNlKDAsIC0zKSkgKiByYWlfeWFjaHRfc3luYy5ldXJvX2NfYykpfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZW5ndGggPSB2ZXNzZWwuTm9taW5hbExlbmd0aCA/IHZlc3NlbC5Ob21pbmFsTGVuZ3RoICsgXCIgLyBcIiArIG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnO1xuXHRcdFx0cHJpY2UgPSB2ZXNzZWwuUHJpY2UgPyBgJCAke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdChwYXJzZUludCh2ZXNzZWwuUHJpY2Uuc2xpY2UoMCwgLTMpKSl9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSdcblx0XHR9XG5cblx0XHRyZXR1cm4gYFxuXHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXJlc3VsdC1ncmlkLWl0ZW0gbGlzdC12aWV3XCIgZGF0YS1wb3N0LWlkPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8YSBjbGFzcz1cInlhY2h0LWRldGFpbHNcIiBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdDxpbWcgY2xhc3M9XCJ5YWNodC1tYWluLWltYWdlXCIgc3JjPVwiJHt2ZXNzZWwuSW1hZ2VzID8gdmVzc2VsLkltYWdlc1swXS5VcmkgOiB2ZXNzZWwuSW1hZ2VzID8gdmVzc2VsLkltYWdlc1swXS5VcmkgOiByYWlfeWFjaHRfc3luYy5hc3NldHNfdXJsICsgJ2ltYWdlcy9kZWZhdWx0LXlhY2h0LWltYWdlLmpwZWcnfVwiIGFsdD1cInlhY2h0LWltYWdlXCIgbG9hZGluZz1cImxhenlcIiAvPlxuXHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1nZW5lcmFsLWluZm8tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXRpdGxlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGEgY2xhc3M9XCJ5YWNodC1kZXRhaWxzXCIgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHRcdDxoNiBjbGFzcz1cInlhY2h0LXRpdGxlXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICcnfSAke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnJ30gJHt2ZXNzZWwuTW9kZWwgPyB2ZXNzZWwuTW9kZWwgOiAnJ30gJHt2ZXNzZWwuQm9hdE5hbWUgPyB2ZXNzZWwuQm9hdE5hbWUgOiAnJ308L2g2PlxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmZvLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZm9cIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+WWVhcjwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+Q2FiaW5zPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLkNhYmluc0NvdW50TnVtZXJpYyA/IHZlc3NlbC5DYWJpbnNDb3VudE51bWVyaWMgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5CdWlsZGVyPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkxlbmd0aDwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke2xlbmd0aH08L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXByaWNlLWRldGFpbHMtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcHJpY2UtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtcHJpY2VcIj4ke3ByaWNlfTwvcD5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cInlhY2h0LWRvd25sb2FkLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBkYXRhLW1vZGFsPVwiI3NpbmdsZS1zaGFyZVwiPkNvbnRhY3Q8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdFxuXHRcdGA7XG5cdH07XG5cblx0eXNwX3RlbXBsYXRlcy55YWNodC5jb21wYXJlX3ByZXZpZXcgPSBmdW5jdGlvbih2ZXNzZWwsIHBhcmFtcykge1xuXG5cdFx0cmV0dXJuIGBcblxuXHRcdFx0PGRpdiBjbGFzcz1cInlzcC15YWNodC1jb21wYXJlLXByZXZpZXdcIiBkYXRhLXBvc3QtaWQ9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCIgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5cdFx0XHRcblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyZW1vdmUtZnJvbS1jb21wYXJlXCI+XG5cdFx0XHRcdFx0PHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0XHRcdFx0PHJlY3QgeD1cIjAuNVwiIHk9XCIwLjVcIiB3aWR0aD1cIjIzXCIgaGVpZ2h0PVwiMjNcIiByeD1cIjExLjVcIiBzdHJva2U9XCIjNkI3MDczXCIvPlxuXHRcdFx0XHRcdDxwYXRoIGQ9XCJNOC4yNjg3NiAxNC45MzQ2QzguMDQ5MDkgMTUuMTU0MyA4LjA0OTA5IDE1LjUxMDQgOC4yNjg3NiAxNS43MzAxQzguNDg4NDMgMTUuOTQ5OCA4Ljg0NDU4IDE1Ljk0OTggOS4wNjQyNSAxNS43MzAxTDguMjY4NzYgMTQuOTM0NlpNMTIuMzk3NiAxMi4zOTY4QzEyLjYxNzMgMTIuMTc3MSAxMi42MTczIDExLjgyMDkgMTIuMzk3NiAxMS42MDEzQzEyLjE3NzkgMTEuMzgxNiAxMS44MjE4IDExLjM4MTYgMTEuNjAyMSAxMS42MDEzTDEyLjM5NzYgMTIuMzk2OFpNMTEuNjAxOCAxMS42MDE2QzExLjM4MjEgMTEuODIxMyAxMS4zODIxIDEyLjE3NzQgMTEuNjAxOCAxMi4zOTcxQzExLjgyMTQgMTIuNjE2OCAxMi4xNzc2IDEyLjYxNjggMTIuMzk3MyAxMi4zOTcxTDExLjYwMTggMTEuNjAxNlpNMTUuNzMwNiA5LjA2Mzc2QzE1Ljk1MDMgOC44NDQwOSAxNS45NTAzIDguNDg3OTQgMTUuNzMwNiA4LjI2ODI3QzE1LjUxMDkgOC4wNDg2IDE1LjE1NDggOC4wNDg2IDE0LjkzNTEgOC4yNjgyN0wxNS43MzA2IDkuMDYzNzZaTTEyLjM5NzMgMTEuNjAxM0MxMi4xNzc2IDExLjM4MTYgMTEuODIxNCAxMS4zODE2IDExLjYwMTggMTEuNjAxM0MxMS4zODIxIDExLjgyMDkgMTEuMzgyMSAxMi4xNzcxIDExLjYwMTggMTIuMzk2OEwxMi4zOTczIDExLjYwMTNaTTE0LjkzNTEgMTUuNzMwMUMxNS4xNTQ4IDE1Ljk0OTggMTUuNTEwOSAxNS45NDk4IDE1LjczMDYgMTUuNzMwMUMxNS45NTAzIDE1LjUxMDQgMTUuOTUwMyAxNS4xNTQzIDE1LjczMDYgMTQuOTM0NkwxNC45MzUxIDE1LjczMDFaTTExLjYwMjEgMTIuMzk3MUMxMS44MjE4IDEyLjYxNjggMTIuMTc3OSAxMi42MTY4IDEyLjM5NzYgMTIuMzk3MUMxMi42MTczIDEyLjE3NzQgMTIuNjE3MyAxMS44MjEzIDEyLjM5NzYgMTEuNjAxNkwxMS42MDIxIDEyLjM5NzFaTTkuMDY0MjUgOC4yNjgyN0M4Ljg0NDU4IDguMDQ4NiA4LjQ4ODQzIDguMDQ4NiA4LjI2ODc2IDguMjY4MjdDOC4wNDkwOSA4LjQ4Nzk0IDguMDQ5MDkgOC44NDQwOSA4LjI2ODc2IDkuMDYzNzZMOS4wNjQyNSA4LjI2ODI3Wk05LjA2NDI1IDE1LjczMDFMMTIuMzk3NiAxMi4zOTY4TDExLjYwMjEgMTEuNjAxM0w4LjI2ODc2IDE0LjkzNDZMOS4wNjQyNSAxNS43MzAxWk0xMi4zOTczIDEyLjM5NzFMMTUuNzMwNiA5LjA2Mzc2TDE0LjkzNTEgOC4yNjgyN0wxMS42MDE4IDExLjYwMTZMMTIuMzk3MyAxMi4zOTcxWk0xMS42MDE4IDEyLjM5NjhMMTQuOTM1MSAxNS43MzAxTDE1LjczMDYgMTQuOTM0NkwxMi4zOTczIDExLjYwMTNMMTEuNjAxOCAxMi4zOTY4Wk0xMi4zOTc2IDExLjYwMTZMOS4wNjQyNSA4LjI2ODI3TDguMjY4NzYgOS4wNjM3NkwxMS42MDIxIDEyLjM5NzFMMTIuMzk3NiAxMS42MDE2WlwiIGZpbGw9XCIjNkI3MDczXCIvPlxuXHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHQ8L3NwYW4+XG5cblxuXHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZVwiIHNyYz1cIiR7dmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogcmFpX3lhY2h0X3N5bmMuYXNzZXRzX3VybCArICdpbWFnZXMvZGVmYXVsdC15YWNodC1pbWFnZS5qcGVnJ31cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblxuXHRcdFx0XHQ8aDYgY2xhc3M9XCJ5YWNodC10aXRsZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnJ30gJHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJyd9ICR7dmVzc2VsLk1vZGVsID8gdmVzc2VsLk1vZGVsIDogJyd9ICR7dmVzc2VsLkJvYXROYW1lID8gdmVzc2VsLkJvYXROYW1lIDogJyd9PC9oNj5cblxuXHRcdFx0PC9kaXY+XG5cblx0XHRgO1xuXG5cdH07XG5cblx0eXNwX3RlbXBsYXRlcy5ub1Jlc3VsdHM9ZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGI+Tm8gUmVzdWx0czwvYj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgfTtcblxuXG4gICAgeXNwX3RlbXBsYXRlcy55YWNodF90YWcgPSBmdW5jdGlvbihsYWJlbCwgdmFsdWUpIHtcblxuICAgIFx0cmV0dXJuIGBcbiAgICBcdFx0PHNwYW4+XG5cdCAgICBcdFx0JHt2YWx1ZX1cblxuXHQgICAgXHRcdDxpbWcgc3JjPVwiJHtyYWlfeWFjaHRfc3luYy5hc3NldHNfdXJsfS9pbWFnZXMvcmVtb3ZlLXRhZy5wbmdcIj5cblx0XHRcdDwvc3Bhbj5cbiAgICBcdGA7XG4gICAgfTtcblxuICAgIHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbiA9IHt9O1xuICAgIFxuICAgIFx0eXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uLm5leHRfdGV4dCA9IGA+YDtcblxuICAgIFx0eXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uLnByZXZfdGV4dCA9IGA8YDtcblxuIiwiXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuXHRsZXQgZWxlX3F1aWNrX3NlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AtcXVpY2stc2VhcmNoLWZvcm0nKTtcblxuXHRpZiAoZWxlX3F1aWNrX3NlYXJjaCkge1xuXHRcdC8vIEZpbGwgb3B0aW9uc1xuXHQgICAgbGV0IEZpbGxPcHRpb25zPVtdO1xuXHQgICAgbGV0IHNlbGVjdG9yRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnlzcC1xdWljay1zZWFyY2gtZm9ybSBzZWxlY3RbZGF0YS1maWxsLW9wdGlvbnNdXCIpO1xuXG5cdCAgICBzZWxlY3RvckVsZW1lbnRzLmZvckVhY2goKGVsZSkgPT4ge1xuXHQgICAgICAgIEZpbGxPcHRpb25zLnB1c2goZWxlLmdldEF0dHJpYnV0ZSgnZGF0YS1maWxsLW9wdGlvbnMnKSk7XG5cdCAgICB9KTtcblx0ICAgIFxuXHQgICAgcmFpX3lzcF9hcGkuY2FsbF9hcGkoJ1BPU1QnLCAnZHJvcGRvd24tb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxPcHRpb25zfSkudGhlbihmdW5jdGlvbihyT3B0aW9ucykge1xuXHQgICAgICAgIGZvciAobGV0IGxhYmVsIGluIHJPcHRpb25zKSB7XG5cblx0ICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi55c3AtcXVpY2stc2VhcmNoLWZvcm0gc2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zPSdcIisgbGFiZWwgK1wiJ11cIik7XG5cdCAgICAgICAgICAgIGxldCBuYW1lID0gU2VsZWN0b3JFbGVbMF0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cblx0ICAgICAgICAgICAgck9wdGlvbnNbbGFiZWxdLmZvckVhY2goZnVuY3Rpb24oYikge1xuXHQgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgICAgICAgICBcdGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG5cdFx0ICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG5cdFx0ICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgZWxlLmFkZChvcHRpb24pO1xuXHQgICAgICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIGxldCBVUkxSRUYgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuXHQgICAgICAgICAgICBsZXQgVXJsVmFsID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoIG5hbWUgKTtcblxuXHQgICAgICAgICAgICBsZXQgc3RycGF0aHM9d2luZG93LmxvY2F0aW9uLmhyZWY7XG5cblx0ICAgICAgICAgICAgc3RycGF0aHM9c3RycGF0aHMucmVwbGFjZShyYWlfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfcGFnZV9pZCwgJycpO1xuXG5cdCAgICAgICAgICAgIGxldCBwYXRocyA9IHN0cnBhdGhzLnNwbGl0KFwiL1wiKTtcblxuXHQgICAgICAgICAgICBsZXQgcHJldHR5X3VybF9wYXRoX3BhcmFtcz17fTtcblxuXHQgICAgICAgICAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uKHBhdGgpIHtcblxuXHQgICAgICAgICAgICAgICAgaWYgKHBhdGggIT0gJycpIHtcblx0ICAgICAgICAgICAgICAgICAgICBsZXQgcGhhc2VfcGF0aCA9IHBhdGguc3BsaXQoJy0nKTtcblx0ICAgICAgICAgICAgICAgICAgICBsZXQgb25seV92YWxzPXBoYXNlX3BhdGguc2xpY2UoMSk7XG5cblx0ICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dPW9ubHlfdmFscy5qb2luKCcgJyk7XG5cblx0ICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXS5lYWNoV29yZENhcGl0YWxpemUoKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICBpZiAoVXJsVmFsICE9ICcnICYmIFVybFZhbCAhPSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhVcmxWYWwpO1xuXG5cdCAgICAgICAgICAgICAgICBpZiAodHlwZW9mIFVybFZhbCA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgIFVybFZhbCA9IFVybFZhbC5lYWNoV29yZENhcGl0YWxpemUoKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gVXJsVmFsOyBcblx0ICAgICAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIH1cblxuXG5cdCAgICAgICAgICAgIGxldCBoYXNQcmV0dHkgPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF07XG5cblx0ICAgICAgICAgICAgY29uc29sZS5sb2coIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXSk7XG5cblx0ICAgICAgICAgICAgaWYgKGhhc1ByZXR0eSAhPSAnJyAmJiBoYXNQcmV0dHkgIT0gbnVsbCkge1xuXHQgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gaGFzUHJldHR5OyBcblx0ICAgICAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9KVxuXHR9XG59KTsiLCJmdW5jdGlvbiB5c3BfbWFrZVNlYXJjaFRhZ3MoIGRhdGEgKSB7XG5cblx0bGV0IHRhZ3NFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXNlYXJjaC10YWdzJyk7XG4gICAgICAgIFxuICAgIGlmICh0YWdzRWxlKSB7XG4gICAgICAgIHRhZ3NFbGUuZm9yRWFjaChmdW5jdGlvbih0ZSkge1xuICAgICAgICAgICAgdGUuaW5uZXJIVE1MPVwiXCI7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdmFyIHlzcF90YWdzX25vdF9wcmludCA9IFsncGFnZV9pbmRleCcsICcnXTtcblxuICAgICAgICBmb3IgKGxldCBwYXJhbUtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBsZXQgbGFiZWw9Jyc7XG5cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsYWJlbFtmb3I9JysgcGFyYW1LZXkgKyddJykpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxhYmVsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj0nKyBwYXJhbUtleSArJ10nKS5pbm5lclRleHQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbbmFtZT0nKyBwYXJhbUtleSArJ10nKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqW25hbWU9JysgcGFyYW1LZXkgKyddJykuaGFzQXR0cmlidXRlKCdsYWJlbCcpKSB7XG5cbiAgICAgICAgICAgICAgICBsYWJlbD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqW25hbWU9JysgcGFyYW1LZXkgKyddJykuZ2V0QXR0cmlidXRlKCdsYWJlbCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdGFnc0VsZS5mb3JFYWNoKGZ1bmN0aW9uKHRlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoeXNwX3RhZ3Nfbm90X3ByaW50LmluZGV4T2YoIHBhcmFtS2V5ICkgPT0gLTEpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZT0nKyBwYXJhbUtleSArJ10nKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlSW5wdXQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1RhZ0VsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFnVmFsID0gZGF0YVtwYXJhbUtleV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlSW5wdXQudGFnTmFtZSA9PSAnU0VMRUNUJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWwgPSBlbGVJbnB1dC5vcHRpb25zWyBlbGVJbnB1dC5zZWxlY3RlZEluZGV4IF0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbUtleS5tYXRjaCgncHJpY2UnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWwgPSAnJCcrdGFnVmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbUtleS5tYXRjaCgnbGVuZ3RoJykgJiYgcGFyYW1LZXkgIT0gJ2xlbmd0aHVuaXQnKSAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbGVVbml0ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gW25hbWU9bGVuZ3RodW5pdF06Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEgZWxlVW5pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZVVuaXQgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybSBbbmFtZT1sZW5ndGh1bml0XScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCA9IHRhZ1ZhbCArJyAnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVVbml0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWwgKz0gZWxlVW5pdC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhZ0VsZS5jbGFzc05hbWUgPSAnYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbSB5c3AtdGFnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbGFiZWwgIT0gbnVsbCAmJiBsYWJlbCAhPSAnbnVsbCcgJiYgbGFiZWwgIT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLmlubmVySFRNTCA9IHlzcF90ZW1wbGF0ZXMueWFjaHRfdGFnKGxhYmVsLCB0YWdWYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLmlubmVySFRNTCA9IHlzcF90ZW1wbGF0ZXMueWFjaHRfdGFnKCcnLCB0YWdWYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhZ0VsZS5zZXRBdHRyaWJ1dGUoJ2tleScsIHBhcmFtS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZS5hcHBlbmRDaGlsZCggbmV3VGFnRWxlICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC10YWdba2V5PVwiJysgcGFyYW1LZXkgKydcIl0nKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coKCcueXNwLXRhZ1trZXk9XCInKyBwYXJhbUtleSArJ1wiXScpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4ueXNwLXRhZ1trZXk9XCInKyBwYXJhbUtleSArJ1wiXScpLmZvckVhY2goZnVuY3Rpb24oeXNwVGFnRWxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeXNwVGFnRWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2tleScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXRFbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC15YWNodC1zZWFyY2gtZm9ybSBzZWxlY3RbbmFtZT0nKyBrZXkgKyddLCAueXNwLXlhY2h0LXNlYXJjaC1mb3JtIGlucHV0W25hbWU9Jysga2V5ICsnXScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dEVsZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZXMuZm9yRWFjaChmdW5jdGlvbihlbGVJKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbGVJLnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGVsZUkudHlwZSA9PSAnY2hlY2tib3gnIHx8IGVsZUkudHlwZSA9PSAncmFkaW8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVJLmNoZWNrZWQ9ZmFsc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZUkudmFsdWU9Jyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRFbGVzWzBdLmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxufSIsImZ1bmN0aW9uIHlzcF9tYXJrTG92ZWRWZXNzZWwoIGVsZV9jYXJkICkge1xuXG4gICAgalF1ZXJ5KCcubG92ZScsIGVsZV9jYXJkKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnRvZ2dsZUNsYXNzKCdsb3ZlZCcpO1xuXG4gICAgICAgIGxldCB5YWNodElkID0galF1ZXJ5KHRoaXMpLmRhdGEoJ3lhY2h0LWlkJyk7XG4gICAgXG4gICAgICAgIGlmICggalF1ZXJ5KHRoaXMpLmhhc0NsYXNzKCdsb3ZlZCcpICkge1xuICAgICAgICAgICAgeXNwX2FkZExvdmVkVmVzc2VsKHlhY2h0SWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeXNwX3JlbW92ZUxvdmVkVmVzc2VsKHlhY2h0SWQpO1xuXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJykpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtcy55c195YWNodHNfbG92ZWQgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBlbGVfY2FyZC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykgIT0gXCJcIikge1xuXG4gICAgICAgIGxldCBsb3ZlZFZlc3NlbHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpKTtcblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzID09IG51bGwpIHtcbiAgICAgICAgICAgIGxvdmVkVmVzc2VscyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHlhY2h0SWQgPSBlbGVfY2FyZC5kYXRhKCd5YWNodC1pZCcpO1xuXG4gICAgICAgIGlmIChsb3ZlZFZlc3NlbHMuaW5kZXhPZiggeWFjaHRJZCApICE9IC0xKSB7XG5cbiAgICAgICAgICAgIGVsZV9jYXJkLmFkZENsYXNzKCdsb3ZlZCcpO1xuXG4gICAgICAgICAgICBqUXVlcnkoJy5sb3ZlJywgZWxlX2NhcmQpLmFkZENsYXNzKCdsb3ZlZCcpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHlzcF9hZGRMb3ZlZFZlc3NlbCggeWFjaHRJZCApIHtcblxuICAgIGxldCBsb3ZlZFZlc3NlbHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpKTtcblxuXG4gICAgICAgIGlmIChsb3ZlZFZlc3NlbHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgbG92ZWRWZXNzZWxzID0gW107XG4gICAgICAgIH1cblxuICAgIGlmIChsb3ZlZFZlc3NlbHMuaW5kZXhPZiggeWFjaHRJZCApID09IC0xKSB7XG5cbiAgICAgICAgbG92ZWRWZXNzZWxzLnB1c2goeWFjaHRJZCk7XG5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGFscmVhZHkgYWRkZWRcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhsb3ZlZFZlc3NlbHMgKTtcbiAgICBcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInlzcF9sb3ZlZF92ZXNzZWxzXCIsIEpTT04uc3RyaW5naWZ5KGxvdmVkVmVzc2VscykpO1xuXG59IFxuXG5mdW5jdGlvbiB5c3BfcmVtb3ZlTG92ZWRWZXNzZWwoIHlhY2h0SWQgKSB7XG5cbiAgICBsZXQgbG92ZWRWZXNzZWxzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSk7XG5cblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzID09IG51bGwpIHtcbiAgICAgICAgICAgIGxvdmVkVmVzc2VscyA9IFtdO1xuICAgICAgICB9XG5cbiAgICBsZXQgaW5kZXhlZCA9IGxvdmVkVmVzc2Vscy5pbmRleE9mKCB5YWNodElkICk7XG5cbiAgICBjb25zb2xlLmxvZyhpbmRleGVkKTtcblxuICAgIGlmIChpbmRleGVkICE9IC0xKSB7XG5cbiAgICAgICAgZGVsZXRlIGxvdmVkVmVzc2Vsc1tpbmRleGVkXTsgICAgICAgIFxuICAgICAgICBsb3ZlZFZlc3NlbHMuc3BsaWNlKGluZGV4ZWQsIDEpO1xuXG5cblxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gYWxyZWFkeSBhZGRlZFxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGxvdmVkVmVzc2VscyApO1xuICAgIFxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwieXNwX2xvdmVkX3Zlc3NlbHNcIiwgSlNPTi5zdHJpbmdpZnkobG92ZWRWZXNzZWxzKSk7XG5cbn0iLCJ2YXIgWVNQX1Zlc3NlbENvbXBhcmVMaXN0PVtdO1xuXG5cbmZ1bmN0aW9uIHlzcF9yZXN0b3JlQ29tcGFyZXMoKSB7XG4gICAgbGV0IFVSTFJFRj1uZXcgVVJMKGxvY2F0aW9uLmhyZWYpOyAvLyBtYXliZSBmb3IgYSByZS1kb1xuICAgIGxldCBjb21wYXJlX3Bvc3RfaWRzID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoICdyZXN0b3JlX3RvX2NvbXBhcmUnICk7IFxuXG4gICAgY29uc29sZS5sb2codHlwZW9mIGNvbXBhcmVfcG9zdF9pZHMpO1xuICAgIGNvbnNvbGUubG9nKGNvbXBhcmVfcG9zdF9pZHMpO1xuXG4gICAgaWYgKHR5cGVvZiBjb21wYXJlX3Bvc3RfaWRzID09ICdzdHJpbmcnKSB7XG4gICAgICAgIFlTUF9WZXNzZWxDb21wYXJlTGlzdCA9IGNvbXBhcmVfcG9zdF9pZHMuc3BsaXQoJywnKTtcbiAgICBcblxuICAgICAgICB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCk7XG4gICAgfVxuXG5cblxufVxuXG5cbmZ1bmN0aW9uIHlzcF9tYWtlQ29tcGFyZVZlc3NlbChlbGVfY2FyZCkge1xuXHQgXG5cdCBqUXVlcnkoJy5jb21wYXJlX3RvZ2dsZScsIGVsZV9jYXJkKS5jaGFuZ2UoZnVuY3Rpb24oZSkge1xuXHQgXHRjb25zb2xlLmxvZygnaG93ZHknKTtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgICAgIGpRdWVyeSh0aGlzKS50b2dnbGVDbGFzcygnYXJtZWQnKTtcblxuICAgICAgICBsZXQgeWFjaHRJZCA9IGVsZV9jYXJkLmRhdGEoJ3Bvc3QtaWQnKTtcbiAgICBcbiAgICAgICAgaWYgKCBqUXVlcnkodGhpcykuaGFzQ2xhc3MoJ2FybWVkJykgKSB7XG4gICAgICAgICAgICB5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0KHlhY2h0SWQpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGxldCB5YWNodElkID0gZWxlX2NhcmQuZGF0YSgncG9zdC1pZCcpO1xuXG4gICAgaWYgKFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkICkgIT0gLTEgIHx8IFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkLnRvU3RyaW5nKCkgKSAhPSAtMSApIHtcblxuICAgICAgICBjb25zb2xlLmxvZygnaGVsbG8gd29ybGQgcmVzdG9yZWQnKTtcblxuICAgICAgICBlbGVfY2FyZC5hZGRDbGFzcygnYXJtZWQnKTtcblxuICAgICAgICBqUXVlcnkoJy5jb21wYXJlX3RvZ2dsZScsIGVsZV9jYXJkKS5hZGRDbGFzcygnYXJtZWQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24geXNwX2FkZFZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCkge1xuXG4gICAgaWYgKFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkICkgPT0gLTEpIHtcblxuICAgIFx0WVNQX1Zlc3NlbENvbXBhcmVMaXN0LnB1c2goeWFjaHRJZCk7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCk7XG59XG4gICAgXG5mdW5jdGlvbiB5c3BfcmVtb3ZlVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKSB7XG5cdGxldCBpbmRleGVkID0gWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmluZGV4T2YoIHlhY2h0SWQgKVxuXG5cdGlmICggaW5kZXhlZCAhPSAtMSkge1xuXG4gICAgXHRkZWxldGUgWVNQX1Zlc3NlbENvbXBhcmVMaXN0W2luZGV4ZWRdOyAgICAgICAgXG4gICAgICAgIFlTUF9WZXNzZWxDb21wYXJlTGlzdC5zcGxpY2UoaW5kZXhlZCwgMSk7XG4gIFx0XHRcbiAgICB9XG5cbiAgICB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCk7XG59XG5cbmZ1bmN0aW9uIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKSB7XG5cbiAgICBpZiAoWVNQX1Zlc3NlbENvbXBhcmVMaXN0Lmxlbmd0aCA+PSAyKSB7XG4gICAgXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneXNwX2NvbXBhcmVfbGlua291dCcpLmhyZWY9cmFpX3lhY2h0X3N5bmMud3BfcmVzdF91cmwrXCJyYWl5cy9jb21wYXJlLz9wb3N0SUQ9XCIrWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmpvaW4oJywnKTtcblxuICAgIFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lzcF9jb21wYXJlX2xpbmtvdXQnKS5pbm5lckhUTUw9YDxidXR0b24gdHlwZT1cImJ1dHRvblwiPkNvbXBhcmUgKCAke1lTUF9WZXNzZWxDb21wYXJlTGlzdC5sZW5ndGh9ICk8L2J1dHRvbj5gO1xuICAgICAgICBcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICdwb3N0X19pbic6IFlTUF9WZXNzZWxDb21wYXJlTGlzdCxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcmFpX3lzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIFwieWFjaHRzXCIsIHBhcmFtcykudGhlbihmdW5jdGlvbihkYXRhX3Jlc3VsdCkge1xuXG4gICAgICAgICAgICBkYXRhX3Jlc3VsdC5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC1jb21wYXJlLXByZXZpZXdzJykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0LmNvbXBhcmVfcHJldmlldyhpdGVtLCBwYXJhbXMpICk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZWxlX3ByZXZpZXcgPSBqUXVlcnkoJyN5c3AtY29tcGFyZS1wcmV2aWV3cyBbZGF0YS1wb3N0LWlkPScrIGl0ZW0uX3Bvc3RJRCArJ10nKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5yZW1vdmUtZnJvbS1jb21wYXJlJywgZWxlX3ByZXZpZXcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGVsbG8nKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVfY2FyZCA9IGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93IFtkYXRhLXBvc3QtaWQ9JysgaXRlbS5fcG9zdElEICsnXScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnLmNvbXBhcmVfdG9nZ2xlJywgZWxlX2NhcmQpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSkucmVtb3ZlQ2xhc3MoJ2FybWVkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgeXNwX3JlbW92ZVZlc3NlbFRvQ29tcGFyZUxpc3QoaXRlbS5fcG9zdElEKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xuXG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBqUXVlcnkoJyN5c3AtY29tcGFyZS1wcmV2aWV3cycpLmh0bWwoJycpO1xuICAgICAgICBqUXVlcnkoJyN5c3BfY29tcGFyZV9saW5rb3V0JykuaHRtbCgnJyk7XG4gICAgfVxuXG5cblxuXG59XG4iLCJjb25zdCB5c3BCZWZvcmVZYWNodFNlYXJjaCA9IG5ldyBFdmVudChcInlzcC1iZWZvcmUtc3VibWl0dGluZy15YWNodC1zZWFyY2hcIik7XG5jb25zdCB5c3BBZnRlcllhY2h0U2VhcmNoID0gbmV3IEV2ZW50KFwieXNwLWFmdGVyLXN1Ym1pdHRpbmcteWFjaHQtc2VhcmNoXCIpO1xuY29uc3QgeXNwQWZ0ZXJSZW5kZXJpbmdZYWNodCA9IG5ldyBFdmVudChcInlzcC1hZnRlci1yZW5kZXJpbmcteWFjaHQtc2VhcmNoXCIpO1xuXG5mdW5jdGlvbiB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoZGF0YSkge1xuXG4gICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdycpLmh0bWwoJycpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1yZXN1bHQtc2VjdGlvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRlZCcpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtcmVzdWx0LXNlY3Rpb24nKS5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nJyk7XG5cbiAgICByYWl5c19zZXRfZm9ybV90b19kYXRhKCBkYXRhICk7XG5cbiAgICB5c3BfbWFrZVNlYXJjaFRhZ3MoIGRhdGEgKTtcblxuICAgIC8vIEdFVCBBTkQgV1JJVEVcbiAgICByZXR1cm4gcmFpX3lzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIFwieWFjaHRzXCIsIGRhdGEpLnRoZW4oZnVuY3Rpb24oZGF0YV9yZXN1bHQpIHtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXJlc3VsdC1zZWN0aW9uJykuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZycpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXJlc3VsdC1zZWN0aW9uJykuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XG5cbiAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBkYXRhX3Jlc3VsdC5TRU8udGl0bGU7XG4gICAgICAgIGpRdWVyeSgnI3lzcC1zZWFyY2gtaGVhZGluZycpLnRleHQoZGF0YV9yZXN1bHQuU0VPLmhlYWRpbmcpO1xuICAgICAgICBqUXVlcnkoJyN5c3Atc2VhcmNoLXBhcmFncmFwaCcpLnRleHQoZGF0YV9yZXN1bHQuU0VPLmdwdF9wKTtcblxuICAgICAgICBqUXVlcnkoJyN0b3RhbC1yZXN1bHRzJykudGV4dChuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLUlOJywgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDMgfSkuZm9ybWF0KGRhdGFfcmVzdWx0LnRvdGFsKSk7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRVUkw9bnVsbDtcblxuICAgICAgICBpZiAodHlwZW9mIGRhdGEuZG9udF9wdXNoID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjdXJyZW50VVJMPXJhaXlzX3B1c2hfaGlzdG9yeSggZGF0YSApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudFVSTCA9IGxvY2F0aW9uLmhyZWY7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGpRdWVyeSgnI3lhY2h0cy1wYWdpbmF0aW9uJykuaHRtbCgnJyk7XG5cbiAgICAgICAgaWYgKGRhdGFfcmVzdWx0LnRvdGFsID4gMCkge1xuXG4gICAgICAgICAgICBkYXRhX3Jlc3VsdC5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS52aWV3ICE9ICd1bmRlZmluZWQnICYmIGRhdGEudmlldy50b0xvd2VyQ2FzZSgpID09ICdsaXN0Jykge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdycpLmFwcGVuZCggeXNwX3RlbXBsYXRlcy55YWNodC5saXN0KGl0ZW0sIGRhdGEpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdycpLmFwcGVuZCggeXNwX3RlbXBsYXRlcy55YWNodC5ncmlkKGl0ZW0sIGRhdGEpICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGVsZV9jYXJkID0galF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cgW2RhdGEtcG9zdC1pZD0nKyBpdGVtLl9wb3N0SUQgKyddJyk7XG5cbiAgICAgICAgICAgICAgICBqUXVlcnkoJ1tkYXRhLW1vZGFsXScsIGVsZV9jYXJkKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZlc3NlbEluZm8gPSBpdGVtLk1vZGVsWWVhciArICcgJyArIGl0ZW0uTWFrZVN0cmluZyArICcgJyArIGl0ZW0uQm9hdE5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeWF0Y2hIaWRkZW4nKS52YWwodmVzc2VsSW5mbyk7XG5cbiAgICAgICAgICAgICAgICAgIHZhciBkYXRhX21vZGFsID0galF1ZXJ5KHRoaXMpLmRhdGEoJ21vZGFsJyk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgalF1ZXJ5KCBkYXRhX21vZGFsICkueXNwX21vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VUZXh0OiAnWCcsXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsQ2xhc3M6ICd5c3AtbW9kYWwtb3BlbicsXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xhc3M6ICd5c3AtbW9kZWwtY2xvc2UnXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHlzcF9tYXJrTG92ZWRWZXNzZWwoIGVsZV9jYXJkICk7ICAgICBcbiAgICAgICAgICAgICAgICB5c3BfbWFrZUNvbXBhcmVWZXNzZWwoIGVsZV9jYXJkICk7ICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBqUXVlcnkoJyN5YWNodHMtcGFnaW5hdGlvbicpLnBhZ2luYXRpb24oe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBkYXRhX3Jlc3VsdC50b3RhbCxcbiAgICAgICAgICAgICAgICBpdGVtc09uUGFnZTogMTIsXG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IGRhdGEucGFnZV9pbmRleCxcbiAgICAgICAgICAgICAgICBwcmV2VGV4dDogeXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uLnByZXZfdGV4dCxcbiAgICAgICAgICAgICAgICBuZXh0VGV4dDogeXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uLm5leHRfdGV4dCxcbiAgICAgICAgICAgICAgICBlZGdlczogNCxcbiAgICAgICAgICAgICAgICBkaXNwbGF5ZWRQYWdlczogNCxcbiAgICAgICAgICAgICAgICBocmVmVGV4dFByZWZpeDogY3VycmVudFVSTC5yZXBsYWNlKG5ldyBSZWdFeHAoXCJwYWdlX2luZGV4LShcXFxcZCopKC8pXCIsIFwiZ1wiKSwgXCJcIikrJ3BhZ2VfaW5kZXgtJyxcbiAgICAgICAgICAgICAgICBocmVmVGV4dFN1ZmZpeDogJy8nLFxuICAgICAgICAgICAgICAgIG9uUGFnZUNsaWNrOiBmdW5jdGlvbihwYWdlTnVtYmVyLCBldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPXBhZ2VOdW1iZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1EYXRhT2JqZWN0ID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YSggZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpICk7XG5cbiAgICAgICAgICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKGZvcm1EYXRhT2JqZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdycpLmFwcGVuZCh5c3BfdGVtcGxhdGVzLm5vUmVzdWx0cygpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgalF1ZXJ5KFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogKGpRdWVyeShcIi5zY3JvbGwtdG8taGVyZS1vbi15YWNodC1zZWFyY2hcIikub2Zmc2V0KCkudG9wKVxuICAgICAgICB9LCAyNTApO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm06bm90KCN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtKScpLmRpc3BhdGNoRXZlbnQoeXNwQWZ0ZXJSZW5kZXJpbmdZYWNodCk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGFfcmVzdWx0O1xuXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG5cbiAgICB9KTtcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBGaWxsIExpc3QgT3B0aW9uc1xuICAgIGxldCBGaWxsTGlzdHM9W107XG4gICAgbGV0IGxpc3RFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkYXRhbGlzdFtkYXRhLWZpbGwtbGlzdF1cIik7XG4gICAgbGV0IGxpc3ROZWVkZWRFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFtsaXN0XVwiKTtcblxuICAgIGxpc3RFbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgRmlsbExpc3RzLnB1c2goZWxlLmdldEF0dHJpYnV0ZSgnZGF0YS1maWxsLWxpc3QnKSk7XG4gICAgfSk7XG5cbiAgICBsaXN0TmVlZGVkRWxlbWVudHMuZm9yRWFjaCgoaW5wdXRfZWxlKSA9PiB7XG5cbiAgICAgICAgaW5wdXRfZWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAgICAgbGV0IGxpc3RfaWQgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdsaXN0Jyk7XG5cbiAgICAgICAgICAgIGxldCBlbGVfbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkYXRhbGlzdCNcIitsaXN0X2lkKTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPD0gMykge1xuXG4gICAgICAgICAgICAgICAgcmFpX3lzcF9hcGkuY2FsbF9hcGkoXG4gICAgICAgICAgICAgICAgICAgICdQT1NUJywgXG4gICAgICAgICAgICAgICAgICAgICdsaXN0LW9wdGlvbnMtd2l0aC12YWx1ZScsIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IFsgZWxlX2xpc3QuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtbGlzdCcpIF0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRhdGFsaXN0W2RhdGEtZmlsbC1saXN0PSdcIisgbGFiZWwgK1wiJ11cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByT3B0aW9uc1tsYWJlbF0uZm9yRWFjaChmdW5jdGlvbihiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmFwcGVuZChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9KTtcblxuICAgIH0pXG4gICAgXG4vKiAgICByYWlfeXNwX2FwaS5jYWxsX2FwaSgnUE9TVCcsICdsaXN0LW9wdGlvbnMnLCB7bGFiZWxzOiBGaWxsTGlzdHN9KS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG4gICAgICAgIGZvciAobGV0IGxhYmVsIGluIHJPcHRpb25zKSB7XG5cbiAgICAgICAgICAgIGxldCBTZWxlY3RvckVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkYXRhbGlzdFtkYXRhLWZpbGwtbGlzdD0nXCIrIGxhYmVsICtcIiddXCIpO1xuXG4gICAgICAgICAgICByT3B0aW9uc1tsYWJlbF0uZm9yRWFjaChmdW5jdGlvbihiKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG5cbiAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmFwcGVuZChvcHRpb24pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiovXG4gICAgbGV0IHlhY2h0U2VhcmNoQW5kUmVzdWx0cz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtOm5vdCgjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybSknKTtcblxuICAgIGlmICh5YWNodFNlYXJjaEFuZFJlc3VsdHMpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tbW9iaWxlLXNlYXJjaCcpLmZvckVhY2goKG9tc2UpID0+IHtcbiAgICAgICAgICAgIG9tc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXN1cGVyLW1vYmlsZS1zZWFyY2gnKS5zdHlsZS5kaXNwbGF5PSdibG9jayc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93WT0naGlkZGVuJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmFkZCgneXNwLW1vYmlsZS15YWNodC1zZWFyY2gtb3BlbicpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlLW1vYmlsZS1zZWFyY2gnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlLW1vYmlsZS1zZWFyY2gnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3Atc3VwZXItbW9iaWxlLXNlYXJjaCcpLnN0eWxlLmRpc3BsYXk9J25vbmUnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5zdHlsZS5vdmVyZmxvd1k9J3Vuc2V0JztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LnJlbW92ZSgneXNwLW1vYmlsZS15YWNodC1zZWFyY2gtb3BlbicpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgeWFjaHRTZWFyY2hBbmRSZXN1bHRzLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgZS50YXJnZXQuZGlzcGF0Y2hFdmVudCh5c3BCZWZvcmVZYWNodFNlYXJjaCk7XG5cbiAgICAgICAgICAgIGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9cGFnZV9pbmRleF0nKS52YWx1ZT0xO1xuXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7XG5cbiAgICAgICAgICAgIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlciggcGFyYW1zICkudGhlbihmdW5jdGlvbihhcGlfZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZGlzcGF0Y2hFdmVudCh5c3BBZnRlcllhY2h0U2VhcmNoKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7IFxuXG4gICAgICAgIHlhY2h0U2VhcmNoQW5kUmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dC5zdWJtaXQtb24tY2hhbmdlJykuZm9yRWFjaCgoZWxlSW5wdXQpID0+IHtcbiAgICAgICAgICAgIGVsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB5YWNodFNlYXJjaEFuZFJlc3VsdHMucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1yZXNldF0nKS5mb3JFYWNoKChlbGVSZXNldCkgPT4ge1xuICAgICAgICAgICAgZWxlUmVzZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJ5c19jb21wYW55X29ubHlcIl0nKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInlzX2NvbXBhbnlfb25seVwiXScpLmZvckVhY2goZnVuY3Rpb24oZWxlQ2hlY2spIHtcbiAgICAgICAgICAgICAgICBlbGVDaGVjay5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9dmlld11bZm9ybT15c3AteWFjaHQtc2VhcmNoLWZvcm1dLCBzZWxlY3RbbmFtZT1zb3J0YnldW2Zvcm09eXNwLXlhY2h0LXNlYXJjaC1mb3JtXScpLmZvckVhY2goKGVsZVZpZXdPcHRpb24pID0+IHtcbiAgICAgICAgICAgIGVsZVZpZXdPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5waWNrLWFsbCcpLmZvckVhY2goZnVuY3Rpb24oZWxlKSB7XG4gICAgICAgICAgICBlbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRfbmFtZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cIicrIGlucHV0X25hbWUgKydcIl0nKS5mb3JFYWNoKChlbGVJbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVJbnB1dC5jaGVja2VkPWZhbHNlO1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBQUkVUVFkgVVJMXG4gICAgICAgIGxldCBzdHJwYXRocz13aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICAgICAgICBzdHJwYXRocz1zdHJwYXRocy5yZXBsYWNlKHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF9wYWdlX2lkLCAnJyk7XG5cbiAgICAgICAgbGV0IHBhdGhzID0gc3RycGF0aHMuc3BsaXQoXCIvXCIpO1xuXG4gICAgICAgIGxldCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zPXt9O1xuXG4gICAgICAgIHBhdGhzLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuXG4gICAgICAgICAgICBpZiAocGF0aCAhPSAnJykge1xuICAgICAgICAgICAgICAgIGxldCBwaGFzZV9wYXRoID0gcGF0aC5zcGxpdCgnLScpO1xuICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHM9cGhhc2VfcGF0aC5zbGljZSgxKTtcblxuICAgICAgICAgICAgICAgIG9ubHlfdmFscz1vbmx5X3ZhbHMuam9pbignICcpLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHNfYXJyYXk9KG9ubHlfdmFscy5zcGxpdCgnKycpKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb25seV92YWxzX2FycmF5WzFdICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ubHlfdmFscyA9IG9ubHlfdmFsc19hcnJheS5tYXAoKG92KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3YuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cob25seV92YWxzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dPW9ubHlfdmFscztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHByZXR0eV91cmxfcGF0aF9wYXJhbXMpO1xuXG4gICAgICAgIC8vIFJlc3RvcmUgRmllbGRzXG5cbiAgICAgICAgbGV0IFVSTFJFRj1uZXcgVVJMKGxvY2F0aW9uLmhyZWYpOyAvLyBtYXliZSBmb3IgYSByZS1kb1xuXG4gICAgICAgIGxldCBmb3JtSW5wdXRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLXlhY2h0LXNlYXJjaC1mb3JtXCJdLCAjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtXCJdJyk7XG5cbiAgICAgICAgZm9ybUlucHV0cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IGVsZTtcblxuICAgICAgICAgICAgbGV0IG5hbWUgPSBlbGUuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgICAgIGxldCB1cmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbmFtZSApO1xuICAgICAgICAgICAgICAgIC8vIHVybFZhbCA9IDtcbiAgIFxuXG4gICAgICAgICAgICBsZXQgaGFzUHJldHR5ID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdO1xuXG4gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGFzUHJldHR5ICE9ICdudWxsJyAmJiB0eXBlb2YgaGFzUHJldHR5ICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShoYXNQcmV0dHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICAgICAgICAgICAgICBoYXNQcmV0dHkuZm9yRWFjaCgoaFApID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaFAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGhhc1ByZXR0eSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dC50eXBlICE9ICdjaGVja2JveCcgJiYgaW5wdXQudHlwZSAhPSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGhhc1ByZXR0eTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1cmxWYWwgIT0gJycgJiYgdXJsVmFsICE9IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdXJsVmFsID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybFZhbCA9IHVybFZhbC5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gdXJsVmFsICkge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUgIT0gJ2NoZWNrYm94JyAmJiBpbnB1dC50eXBlICE9ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB1cmxWYWw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlc3RvcmUgQ29tcGFyZVxuICAgICAgICAgeXNwX3Jlc3RvcmVDb21wYXJlcygpO1xuXG4gICAgICAgIC8vIEZpbGwgb3B0aW9uc1xuICAgICAgICBsZXQgRmlsbE9wdGlvbnM9W107XG4gICAgICAgIGxldCBzZWxlY3RvckVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFtkYXRhLWZpbGwtb3B0aW9uc11cIik7XG5cbiAgICAgICAgc2VsZWN0b3JFbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgIEZpbGxPcHRpb25zLnB1c2goZWxlLmdldEF0dHJpYnV0ZSgnZGF0YS1maWxsLW9wdGlvbnMnKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmFpX3lzcF9hcGkuY2FsbF9hcGkoJ1BPU1QnLCAnZHJvcGRvd24tb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxPcHRpb25zfSkudGhlbihmdW5jdGlvbihyT3B0aW9ucykge1xuICAgICAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIGxldCBTZWxlY3RvckVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWxlY3RbZGF0YS1maWxsLW9wdGlvbnM9J1wiKyBsYWJlbCArXCInXVwiKTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFNlbGVjdG9yRWxlKTtcblxuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gU2VsZWN0b3JFbGVbMF0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgICAgICAgICByT3B0aW9uc1tsYWJlbF0uZm9yRWFjaChmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJPUFRJT05cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmFkZChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBVUkxSRUYgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuICAgICAgICAgICAgICAgIGxldCBVcmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbmFtZSApO1xuXG4gICAgICAgICAgICAgICAgbGV0IHN0cnBhdGhzPXdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgICAgICAgICAgICAgc3RycGF0aHM9c3RycGF0aHMucmVwbGFjZShyYWlfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfcGFnZV9pZCwgJycpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gc3RycGF0aHMuc3BsaXQoXCIvXCIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eV91cmxfcGF0aF9wYXJhbXM9e307XG5cbiAgICAgICAgICAgICAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uKHBhdGgpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGF0aCAhPSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBoYXNlX3BhdGggPSBwYXRoLnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb25seV92YWxzPXBoYXNlX3BhdGguc2xpY2UoMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV09b25seV92YWxzLmpvaW4oJyAnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXS5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKFVybFZhbCAhPSAnJyAmJiBVcmxWYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFVybFZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBVcmxWYWwgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVybFZhbCA9IFVybFZhbC5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gVXJsVmFsOyBcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS52YWx1ZSA9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IFVybFZhbC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBoYXNQcmV0dHkgPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF07XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhc1ByZXR0eSAhPSAnJyAmJiBoYXNQcmV0dHkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IGhhc1ByZXR0eTsgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGUudmFsdWUgPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBoYXNQcmV0dHkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBSZW5kZXIgWWFjaHRzIEZvciBQYWdlIExvYWRcbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSByYWl5c19nZXRfZm9ybV9kYXRhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0nKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcblxuICAgICAgICAgICAgLy8gTGlrZWQgLyBMb3ZlZCBcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1zLnlzX3lhY2h0c19sb3ZlZCAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgbGV0IGxvdmVkX3lhY2h0cyA9IEpTT04ucGFyc2UoIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpICk7XG5cbiAgICAgICAgICAgICAgICBpZiAobG92ZWRfeWFjaHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnlzX29ubHlfdGhlc2UgPSBsb3ZlZF95YWNodHMuam9pbignLCcpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMueXNfb25seV90aGVzZT1cIjAsMCwwXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlciggcGFyYW1zICk7ICAgICAgIFxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgbW9iaWxlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtJyk7XG5cbiAgICAgICAgaWYgKG1vYmlsZUZvcm0pIHtcbiAgICAgICAgICAgIG1vYmlsZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9cGFnZV9pbmRleF0nKS52YWx1ZT0xO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1zdXBlci1tb2JpbGUtc2VhcmNoJykuc3R5bGUuZGlzcGxheT0nbm9uZSc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93WT0ndW5zZXQnO1xuXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHJhaXlzX2dldF9mb3JtX2RhdGEoZS50YXJnZXQpOyAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKTtcblxuICAgICAgICAgICAgfSk7IFxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICB9XG5cbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBoYW5kbGVTdWJtaXQoZSwgYXBpRW5kcG9pbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBmb3JtRGF0YSA9IHJhaXlzX2dldF9mb3JtX2RhdGEoZS50YXJnZXQpO1xuICAgICAgICBsZXQgc3VjY2Vzc01lc3NhZ2UgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWNjZXNzLW1lc3NhZ2UnKTtcbiAgICAgICAgY29uc29sZS5sb2coZm9ybURhdGEpXG4gICAgICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpKFwiUE9TVFwiLCBhcGlFbmRwb2ludCwgZm9ybURhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhX3Jlc3VsdCkge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NNZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGV0IHlhY2h0Rm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2luZ2xlLXlhY2h0LWRldGlscy1sZWFkJyk7XG4gICAgeWFjaHRGb3Jtcy5mb3JFYWNoKChmRWxlKSA9PiB7XG4gICAgICAgIGZFbGUuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaGFuZGxlU3VibWl0KGUsIFwieWFjaHQtbGVhZHNcIik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgbGV0IGJyb2tlckZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpbmdsZS1icm9rZXItZGV0aWxzLWxlYWQnKTtcbiAgICBicm9rZXJGb3Jtcy5mb3JFYWNoKChmRWxlKSA9PiB7XG4gICAgICAgIGZFbGUuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaGFuZGxlU3VibWl0KGUsIFwiYnJva2VyLWxlYWRzXCIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19
