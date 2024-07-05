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
!function (t, e) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module))) module.exports = e();else if ("function" == typeof define && define.amd) define([], e);else {
    var n = e();
    for (var o in n) ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports : t)[o] = n[o];
  }
}(self, function () {
  return function () {
    "use strict";

    var t = {};
    (function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    })(t);
    var e,
      n = "fslightbox-",
      i = "".concat(n, "styles"),
      s = "".concat(n, "full-dimension"),
      r = "".concat(n, "flex-centered"),
      a = "".concat(n, "open"),
      c = "".concat(n, "absoluted"),
      u = "".concat(n, "opacity-1"),
      l = "".concat(n, "slide-btn"),
      d = "".concat(l, "-container"),
      h = "".concat(n, "fade-in"),
      f = "".concat(n, "fade-out"),
      p = h + "-strong",
      m = f + "-strong",
      b = ("".concat(n, "caption"), "".concat(n, "thumb")),
      g = b + "s",
      v = "".concat(g, "-loader"),
      x = "".concat(g, "-cursorer"),
      w = "".concat(g, "-inner"),
      y = b + "-wrapper",
      C = b + "-invalid";
    function L(t) {
      return L = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
        return _typeof(t);
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
      }, L(t);
    }
    function T(t) {
      var e = t.c,
        n = t.componentsServices,
        o = t.core.thumbsRenderDispatcher,
        i = t.data,
        s = t.ea,
        r = t.la,
        a = (t.stageIndexes, t.ui),
        c = t.z;
      function u() {
        for (var t = 0; t < e; t++) r.t(t);
      }
      this.o = function () {
        c.r(), i.isThumbing = !0, s.uc(), a.sthc(), u(), o.renderThumbsIfNotYetAndAllTypesDetected(), i.unloadedThumbsCount && n.appendThumbsLoaderIfNotYet();
      }, this.x = function () {
        c.r(), i.isThumbing = !1, s.dc(), a.htsc(), u();
      };
    }
    function z(t, e) {
      var n = t.classList;
      n.contains(e) && n.remove(e);
    }
    function S(t, e) {
      var n = t.classList;
      n.contains(e) || n.add(e);
    }
    function A(t) {
      var e = t.data,
        n = t.elements,
        o = t.stageIndexes;
      this.runActions = function () {
        z(n.thumbsContainer, r);
        var t = innerWidth / 2,
          s = n.thumbsWrappers[o.current],
          a = s.offsetLeft + s.offsetWidth / 2,
          c = e.thumbsInnerWidth - a;
        a > t && c > t ? i(t - a) : a > t ? i(innerWidth - e.thumbsInnerWidth - 9) : c > t && i(0);
      }, this.runToThinThumbsActions = function () {
        S(n.thumbsContainer, r), i(0);
      };
      var i = function i(t) {
        e.thumbsTransform = t, n.thumbsInner.style.transform = "translateX(".concat(t, "px)");
      };
    }
    function I(t) {
      var e = this,
        n = t.core,
        o = n.eventsDispatcher,
        i = n.globalEventsController,
        s = n.scrollbarRecompensor,
        r = t.data,
        c = t.elements,
        u = t.fs,
        l = t.p,
        d = t.props,
        h = t.qs,
        f = t.ss,
        p = t.t,
        b = t.thumbsSwipingProps,
        g = t.z;
      this.isLightboxFadingOut = !1, this.runActions = function () {
        e.isLightboxFadingOut = !0, c.container.classList.add(m), i.removeListeners(), f.r(), d.exitFullscreenOnClose && r.ifs && u.x(), g.r(), p(function () {
          e.isLightboxFadingOut = !1;
          for (var n = 0; n < t.ts.length; n++) clearTimeout(t.ts[n]);
          for (t.ts = [], n = 0; n < h.length; n++) h[n] = 0;
          l.i = !1, b && (b.i = !1), c.container.classList.remove(m), document.documentElement.classList.remove(a), s.removeRecompense(), document.body.removeChild(c.container), o.dispatch("onClose");
        }, 270);
      };
    }
    function E(t, e, n, o) {
      var i = t.isl,
        s = t.props.slideChangeAnimation,
        r = t.saw,
        a = t.smw,
        c = t.st,
        u = t.stageIndexes,
        l = t.sws,
        d = e.previous,
        h = e.current,
        p = e.next;
      function m() {
        c.i(h) ? h === u.previous ? a[h].ne() : h === u.next && a[h].p() : (a[h].h(), a[h].n());
      }
      function b(t, e, n) {
        t && r[e].classList.add(n);
      }
      this.runJumpReflowedActions = function () {
        b(n, h, f), b(o, u.current, s), l.a(), void 0 !== u.previous && u.previous !== h && a[u.previous].ne(), a[u.current].n(), void 0 !== u.next && u.next !== h && a[u.next].p(), l.b(d), l.b(p), i[h] ? setTimeout(m, 260) : m();
      };
    }
    function F(t) {
      var e,
        n = t.core.slideChangeFacade,
        o = t.props,
        i = t.ss,
        s = t.stageIndexes,
        r = !1;
      function a() {
        r = !1, clearTimeout(e), t.ssb.classList.remove(u), t.ssx();
      }
      function c() {
        var i = t.ssb;
        i.style.transition = "opacity .2s", i.style.width = "0px", i.offsetWidth, i.style.transition = "opacity .2s, width linear ".concat(o.slideshowTime, "ms"), i.style.width = innerWidth + "px", e = setTimeout(function () {
          n.changeToNext(), o.disableSlideshowLoop && s.current + 1 === o.sources.length ? a() : c();
        }, o.slideshowTime);
      }
      i.t = function () {
        r ? a() : (r = !0, t.sss(), t.ssb.classList.add(u), c());
      }, i.r = function () {
        r && a();
      };
    }
    function N(t) {
      var e = t.p,
        n = Object.keys(e),
        o = e[n[0]],
        i = e[n[1]];
      return Math.hypot(o.screenX - i.screenX, o.screenY - i.screenY);
    }
    function k(t) {
      t.componentsServices;
      var e = t.core.pointeringBucket,
        n = t.elements,
        o = t.p,
        i = t.smw,
        s = t.stageIndexes,
        r = t.z,
        a = t.zv;
      function c(t, e) {
        i[t].v(o.swipedX)[e]();
      }
      this.a = function (i) {
        e.runSwipingMoveActionsForPropsAndEvent(o, i), n.container.contains(t.h) || n.container.appendChild(t.h);
      }, this.p = function () {
        var t = N(o);
        if (o.pinchedHypot) {
          var e = t - o.pinchedHypot,
            n = a + e / Math.hypot(innerWidth, innerHeight) * 10;
          n < .9 && (n = .9), r.z(n), o.pinchedHypot = t;
        } else o.pinchedHypot = t;
      }, this.s = function () {
        c(s.current, "z"), void 0 !== s.previous && o.swipedX > 0 ? c(s.previous, "ne") : void 0 !== s.next && o.swipedX < 0 && c(s.next, "p");
      }, this.zs = function (t) {
        o.swipedX = (t.screenX - o.downScreenX) / a, o.swipedY = (t.screenY - o.downScreenY) / a, i[s.current].v(o.ux + o.swipedX, o.uy + o.swipedY).z();
      };
    }
    function B(t, e) {
      var n = t.c,
        o = t.dss,
        i = t.p,
        s = t.r,
        r = t.zv,
        a = s(k);
      if (i.isPinching) return a.a(e), void a.p();
      2 !== i.pc && (1 === r ? 1 === n || o ? i.swipedX = 1 : (a.a(e), a.s()) : (a.a(e), a.zs(e)));
    }
    function W(t) {
      var e = t.core,
        n = e.clickZoomer,
        o = e.slideIndexChanger,
        i = t.p,
        s = t.smw,
        r = t.stageIndexes,
        a = t.sws,
        c = t.zv;
      function u(t) {
        var e = s[r.current];
        e.a(), e[t]();
      }
      function l(t, e) {
        void 0 !== t && (s[t].s(), s[t][e]());
      }
      this.p = function () {
        var t = r.previous;
        if (void 0 === t) u("z");else {
          u("p");
          var e = r.next;
          o.changeTo(t);
          var n = r.previous;
          a.d(n), a.b(e), u("z"), l(n, "ne");
        }
      }, this.n = function () {
        var t = r.next;
        if (void 0 === t) u("z");else {
          u("ne");
          var e = r.previous;
          o.changeTo(t);
          var n = r.next;
          a.d(n), a.b(e), u("z"), l(n, "p");
        }
      }, this.s = function () {
        var t = s[r.current];
        i.ux = t.gx(), i.uy = t.gy();
      }, this.d = function () {
        c <= 1 ? n.zoomIn() : n.zoomOut();
      };
    }
    function M(t, e) {
      t.contains(e) && t.removeChild(e);
    }
    function H(t) {
      t.componentsServices;
      var e = t.core,
        n = e.lightboxCloser,
        o = e.pointeringBucket,
        i = t.dss,
        s = t.elements,
        r = t.p,
        a = t.props.disableBackgroundClose,
        c = t.r,
        u = t.swc,
        l = (t.ui, t.zv),
        d = c(W);
      this.a = function () {
        M(s.container, t.h), r.isPinching = !1, r.pinchedHypot = 0, o.runSwipingTopActionsForPropsAndEvent(r), u.classList.remove("fslightboxswcp");
      }, this.s = function () {
        1 === l ? i || (r.swipedX > 0 ? d.p() : d.n()) : d.s();
      }, this.n = function (t) {
        "VIDEO" !== t.target.tagName && (r.sd ? d.d() : a || n.close());
      };
    }
    function D(t, e) {
      var n = t.p;
      n.p[e.pointerId] = {
        screenX: e.screenX,
        screenY: e.screenY
      };
      var o = Object.keys(n.p).length;
      return n.pc = o, o <= 2;
    }
    function O(t) {
      var e = t.core.pointeringBucket,
        n = t.data,
        o = t.elements,
        i = t.thumbsSwipingProps;
      this.runActions = function (t) {
        e.runSwipingMoveActionsForPropsAndEvent(i, t), o.thumbsInner.style.transform = "translateX(".concat(n.thumbsTransform + i.swipedX, "px)"), o.thumbsContainer.contains(o.thumbsCursorer) || o.thumbsContainer.appendChild(o.thumbsCursorer);
      };
    }
    function P(t) {
      var e = t.data,
        n = t.resolve,
        o = t.thumbsSwipingProps,
        i = n(O),
        s = window.innerWidth;
      this.listener = function (t) {
        e.thumbsInnerWidth > s && o.i && i.runActions(t);
      };
    }
    function R(t) {
      var e = t.data,
        n = t.core,
        o = n.slideIndexChanger,
        i = n.thumbsTransformTransitioner,
        s = n.pointeringBucket,
        r = t.elements,
        a = t.thumbsSwipingProps,
        c = r.thumbsWrappers;
      this.runNoSwipeActionsForEvent = function (t) {
        M(r.thumbsContainer, r.thumbsCursorer), a.i = !1;
        for (var e = 0; e < c.length; e++) if (c[e] && c[e].contains(t.target)) return void o.jumpTo(e);
      }, this.runActions = function () {
        if (M(r.thumbsContainer, r.thumbsCursorer), e.thumbsTransform += a.swipedX, s.runSwipingTopActionsForPropsAndEvent(a), e.thumbsTransform > 0) return u(0);
        e.thumbsTransform < innerWidth - e.thumbsInnerWidth - 9 && u(innerWidth - e.thumbsInnerWidth - 9);
      };
      var u = function u(t) {
        e.thumbsTransform = t, i.callActionWithTransition(function () {
          r.thumbsInner.style.transform = "translateX(".concat(t, "px)");
        });
      };
    }
    function q(t) {
      var e = t.resolve,
        n = t.thumbsSwipingProps,
        o = e(R);
      this.listener = function (t) {
        n.i && (n.swipedX ? o.runActions() : o.runNoSwipeActionsForEvent(t));
      };
    }
    function X(t) {
      var e = t.m,
        n = t.props,
        o = t.r,
        i = t.ui,
        s = o(q),
        r = o(P),
        a = function () {
          var t = !1;
          return function () {
            return !t && (t = !0, requestAnimationFrame(function () {
              t = !1;
            }), !0);
          };
        }();
      this.m = function (o) {
        i.qps(), t.p.i && e(B, D)(o), n.disableThumbs || r.listener(o);
      }, this.u = function (e) {
        !function (t, e) {
          var n = t.p,
            o = t.r,
            i = t.z,
            s = t.zv,
            r = o(H);
          n.p = {}, n.i && (n.isPinching || (n.swipedX ? r.s() : r.n(e)), r.a(), s < 1 && (i.z(1), i.e()));
        }(t, e), n.disableThumbs || s.listener(e), i.qps();
      }, this.w = function (e) {
        t.p.i || (i.qps(), a() && function (t, e) {
          var n = t.z,
            o = t.zv;
          if (1 === o) {
            if (e.deltaY > 0) return;
            n.b();
          }
          var i = .1 * o,
            s = o;
          e.deltaY < 0 ? s += i : (s -= i) < 1 && (s = 1), n.z(s), 1 === s && n.e();
        }(t, e));
      };
    }
    function Y(t, e) {
      var n = t.core,
        i = n.clickZoomer,
        s = n.lightboxCloser,
        r = n.slideChangeFacade,
        a = n.thumbsToggler,
        c = t.fs,
        u = (t.middleware, t.props),
        l = t.ss;
      if (t.ui.qps(), "Space" !== e.code) switch (e.key) {
        case "Escape":
          s.close();
          break;
        case "ArrowLeft":
          r.changeToPrevious();
          break;
        case "ArrowRight":
          r.changeToNext();
          break;
        case "t":
          u.disableThumbs || a.toggleThumbs();
          break;
        case "+":
          o.p.i || i.zoomIn();
          break;
        case "-":
          o.p.i || i.zoomOut();
          break;
        case "F11":
          e.preventDefault(), c.t();
      } else l.t();
    }
    function j(t, e, o, i, s) {
      var r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      r.setAttributeNS(null, "width", e), r.setAttributeNS(null, "height", e), r.setAttributeNS(null, "viewBox", i);
      var a = document.createElementNS("http://www.w3.org/2000/svg", "path");
      return a.setAttributeNS(null, "class", "".concat(n, "svg-path")), a.setAttributeNS(null, "d", s), r.appendChild(a), t.appendChild(r), r;
    }
    function V(t, e) {
      var o = document.createElement("div");
      return o.className = "".concat(n, "toolbar-button ").concat(r), o.title = e, t.appendChild(o), o;
    }
    function U(t, e, n) {
      var o = V(t, e.title);
      o.onclick = n, j(o, e.width, e.height, e.viewBox, e.d);
    }
    function Z(t) {
      var e = t.props.sources,
        o = t.elements,
        i = document.createElement("div");
      o.nav = i, i.className = "".concat(n, "nav"), o.container.appendChild(i), function (t, e) {
        var o = t.core,
          i = o.clickZoomer,
          s = i.zoomIn,
          r = i.zoomOut,
          a = o.lightboxCloser.close,
          c = o.thumbsToggler,
          u = t.props,
          l = u.customToolbarButtons,
          d = u.disableThumbs,
          h = u.toolbarButtons,
          f = document.createElement("div");
        f.className = "".concat(n, "toolbar"), e.appendChild(f);
        for (var p = function p(e) {
            U(f, l[e], function () {
              return l[e].onClick(t);
            });
          }, m = 0; m < l.length; m++) p(m);
        d || U(f, h.thumbs, c.toggleThumbs), U(f, h.zoomIn, s), U(f, h.zoomOut, r), function (t, e) {
          var n = t.props.toolbarButtons.slideshow,
            o = n.start,
            i = n.pause,
            s = t.ss,
            r = V(e, o.title);
          r.onclick = s.t;
          var a = j(r, o.width, o.height, o.viewBox, o.d);
          function c(t) {
            r.title = t.title, a.setAttributeNS(null, "width", t.width), a.setAttributeNS(null, "height", t.height), a.setAttributeNS(null, "viewBox", t.viewBox), a.firstChild.setAttributeNS(null, "d", t.d);
          }
          t.sss = function () {
            c(i);
          }, t.ssx = function () {
            c(o);
          };
        }(t, f), function (t, e) {
          var n = t.componentsServices,
            o = t.data,
            i = t.fs,
            s = t.props.toolbarButtons.fullscreen,
            r = s.enter,
            a = s.exit,
            c = V(e, r.title),
            u = j(c, r.width, r.height, r.viewBox, r.d);
          function l(t) {
            c.title = t.title, u.setAttributeNS(null, "width", t.width), u.setAttributeNS(null, "height", t.height), u.setAttributeNS(null, "viewBox", t.viewBox), u.firstChild.setAttributeNS(null, "d", t.d);
          }
          n.ofs = function () {
            o.ifs = !0, l(a);
          }, n.xfs = function () {
            o.ifs = !1, l(r);
          }, c.onclick = i.t;
        }(t, f), U(f, h.close, a);
      }(t, i), e.length > 1 && function (t, e) {
        var o = t.componentsServices,
          i = t.props.sources,
          s = document.createElement("div");
        s.className = "".concat(n, "slide-number-container");
        var a = document.createElement("div");
        a.className = r;
        var c = document.createElement("span");
        o.setSlideNumber = function (t) {
          return c.innerHTML = t;
        };
        var u = document.createElement("span");
        u.className = "".concat(n, "slash");
        var l = document.createElement("div");
        l.innerHTML = i.length, s.appendChild(a), a.appendChild(c), a.appendChild(u), a.appendChild(l), e.appendChild(s), setTimeout(function () {
          a.offsetWidth > 55 && (s.style.justifyContent = "flex-start");
        });
      }(t, i);
    }
    function _(t, e) {
      var n = t.c,
        o = t.core.pointeringBucket,
        i = t.elements.sources,
        s = t.p,
        r = t.smw,
        a = t.stageIndexes,
        c = t.swc,
        u = t.z,
        l = t.zv;
      if ("touch" !== e.pointerType && "IMG" === e.target.tagName && e.preventDefault(), o.runSwipingDownActionsForPropsAndEvent(s, e), s.downScreenY = e.screenY, 2 === s.pc) s.isPinching = !0, s.pinchedHypot = N(s), c.classList.add("fslightboxswcp"), 1 === l && u.b();else for (var d = 0; d < n; d++) r[d].d();
      var h = i[a.current];
      s.sd = h && h.contains(e.target);
    }
    function J(t) {
      var e = "fslightbox-loader",
        n = document.createElement("div");
      n.className = e;
      for (var o = 0; o < 3; o++) {
        var i = document.createElement("div");
        i.className = "".concat(e, "-child"), n.appendChild(i);
      }
      return t.appendChild(n), n;
    }
    function G(t, e) {
      var n = t.smw,
        o = t.st,
        i = t.swc,
        a = document.createElement("div"),
        u = "".concat(c, " ").concat(s, " ").concat(r),
        l = 0,
        d = 0,
        h = 0;
      function f(t) {
        l = t + d, a.style.transform = "translate(".concat(l, "px,").concat(h, "px)"), d = 0;
      }
      function p() {
        return (1 + t.props.slideDistance) * innerWidth;
      }
      a.className = u, a.s = function () {
        a.style.display = "flex";
      }, a.h = function () {
        a.style.display = "none";
      }, a.a = function () {
        a.classList.add("fslightboxtt");
      }, a.d = function () {
        a.classList.remove("fslightboxtt");
      }, a.n = function () {
        a.style.removeProperty("transform");
      }, a.v = function (t, e) {
        return d = t, void 0 !== e && (h = e), a;
      }, a.gx = function () {
        return l;
      }, a.gy = function () {
        return h;
      }, a.ne = function () {
        f(-p());
      }, a.z = function () {
        f(0);
      }, a.p = function () {
        f(p());
      }, i.appendChild(a), o.i(e) || a.h(), n[e] = a, function (t, e) {
        var n = t.smw,
          o = t.sew,
          i = document.createElement("div");
        n[e].appendChild(i), o[e] = i, function (t, e) {
          var n = t.saw,
            o = t.sew,
            i = document.createElement("div");
          J(i), o[e].appendChild(i), n[e] = i;
        }(t, e);
      }(t, e);
    }
    function $(t) {
      var e = t.c,
        n = t.elements,
        o = t.m,
        i = document.createElement("div");
      i.className = "fslightboxswc ".concat(c, " ").concat(s), n.container.appendChild(i), i.addEventListener("pointerdown", o(_, D)), t.swc = i;
      for (var r = 0; r < e; r++) G(t, r);
    }
    function K(t, e) {
      var n = t.data.isThumbing,
        o = t.elements,
        i = o.captions,
        s = o.container,
        a = t.props.captions,
        c = t.stageIndexes.current,
        u = t.tc,
        l = document.createElement("div"),
        d = document.createElement("div"),
        h = "fslightboxc ".concat(r);
      (c !== e || n && !u) && (h += " fslightboxx"), l.className = h, d.className = "fslightboxci", d.innerHTML = a[e], l.appendChild(d), i[e] = l, s.appendChild(l);
    }
    function Q(t, e) {
      var n = t.core.slideChangeFacade,
        o = t.elements,
        i = t.props.slideButtons,
        s = e.charAt(0).toUpperCase() + e.slice(1),
        a = "slideButton".concat(s),
        c = i[e];
      o[a] = document.createElement("div"), o[a].className = "".concat(d, " ").concat(d, "-").concat(e), o[a].title = c.title, o[a].onclick = n["changeTo".concat(s)], function (t, e) {
        var n = document.createElement("div");
        n.className = "".concat(l, " ").concat(r), j(n, e.width, e.height, e.viewBox, e.d), t.appendChild(n);
      }(o[a], c), o.container.appendChild(o[a]);
    }
    "object" === ("undefined" == typeof document ? "undefined" : L(document)) && ((e = document.createElement("style")).className = i, e.appendChild(document.createTextNode(".fslightbox-fade-in{animation:fslightbox-fade-in .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out{animation:fslightbox-fade-out .3s ease}.fslightbox-fade-in-strong{animation:fslightbox-fade-in-strong forwards .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out-strong{animation:fslightbox-fade-out-strong .3s ease}@keyframes fslightbox-fade-in{from{opacity:.65}to{opacity:1}}@keyframes fslightbox-fade-out{from{opacity:.35}to{opacity:0}}@keyframes fslightbox-fade-in-strong{from{opacity:.3}to{opacity:1}}@keyframes fslightbox-fade-out-strong{from{opacity:1}to{opacity:0}}.fslightbox-absoluted{position:absolute;top:0;left:0}.fslightboxcg{cursor:grabbing!important}.fslightbox-full-dimension{width:100%;height:100%}.fslightbox-open{overflow:hidden;height:100%}.fslightbox-flex-centered{display:flex;justify-content:center;align-items:center}.fslightbox-opacity-0{opacity:0!important}.fslightbox-opacity-1{opacity:1!important}.fslightboxx{opacity:0!important;z-index:-1!important}.fslightbox-scrollbarfix{padding-right:17px}.fslightboxtt{transition:transform .3s!important}.fslightbox-container{font-family:Arial,sans-serif;position:fixed;top:0;left:0;background:linear-gradient(rgba(30,30,30,.9),#000 1810%);touch-action:none;z-index:1000000000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.fslightbox-container *{box-sizing:border-box}.fslightbox-svg-path{transition:fill .15s ease;fill:#d1d2d2}.fslightbox-loader{display:block;margin:auto;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:67px;height:67px}.fslightbox-loader-child{box-sizing:border-box;display:block;position:absolute;width:54px;height:54px;margin:6px;border:5px solid;border-color:#999 transparent transparent transparent;border-radius:50%;animation:fslightbox-loader 1.2s cubic-bezier(.5,0,.5,1) infinite}.fslightbox-loader-child:nth-child(1){animation-delay:-.45s}.fslightbox-loader-child:nth-child(2){animation-delay:-.3s}.fslightbox-loader-child:nth-child(3){animation-delay:-.15s}@keyframes fslightbox-loader{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.fslightbox-thumbs-loader{width:54px!important;height:54px!important}.fslightbox-thumbs-loader div{border-width:4px!important;width:44px!important;height:44px!important}.fslightbox-nav{height:45px;width:100%;transition:opacity .3s}.fslightbox-slide-number-container{display:flex;justify-content:center;align-items:center;position:relative;height:100%;font-size:15px;color:#d7d7d7;z-index:0;max-width:55px;text-align:left}.fslightbox-slide-number-container .fslightbox-flex-centered{height:100%}.fslightbox-slash{display:block;margin:0 5px;width:1px;height:12px;transform:rotate(15deg);background:#fff}.fslightbox-toolbar{position:absolute;z-index:2;right:0;top:0;height:45px;display:flex;background:rgba(35,35,35,.65)}.fslightbox-toolbar-button{height:100%;width:45px;cursor:pointer}.fslightbox-toolbar-button:hover .fslightbox-svg-path{fill:#fff}.fslightbox-slide-btn-container{display:flex;align-items:center;padding:12px 12px 12px 6px;position:absolute;top:50%;cursor:pointer;z-index:2;transform:translateY(-50%);transition:opacity .3s}@media (min-width:476px){.fslightbox-slide-btn-container{padding:22px 22px 22px 6px}}@media (min-width:768px){.fslightbox-slide-btn-container{padding:30px 30px 30px 6px}}.fslightbox-slide-btn-container:hover .fslightbox-svg-path{fill:#f1f1f1}.fslightbox-slide-btn{padding:9px;font-size:26px;background:rgba(35,35,35,.65)}@media (min-width:768px){.fslightbox-slide-btn{padding:10px}}@media (min-width:1600px){.fslightbox-slide-btn{padding:11px}}.fslightbox-slide-btn-container-previous{left:0}@media (max-width:475.99px){.fslightbox-slide-btn-container-previous{padding-left:3px}}.fslightbox-slide-btn-container-next{right:0;padding-left:12px;padding-right:3px}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-left:22px}}@media (min-width:768px){.fslightbox-slide-btn-container-next{padding-left:30px}}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-right:6px}}.fslightboxh{z-index:3}.fslightboxss{width:0;height:2px;z-index:3;opacity:0;background:#fff}.fslightboxin{font-size:24px;color:#eaebeb;margin:auto}.fslightbox-video{object-fit:cover}.fslightboxyt{border:0}.fslightboxs{position:relative;z-index:3;display:block;opacity:0;margin:auto;cursor:zoom-in}.fslightboxswc{z-index:1;transition:transform .2s linear}.fslightboxswcp{transition:none!important}.fslightbox-thumbs{position:absolute;bottom:0;left:0;width:100%;z-index:2;background:linear-gradient(180deg,rgba(0,0,0,0),#1e1e1e 100%);transition:opacity .2s;padding:0 5px 12px 5px;height:114px}@media (min-width:992px){.fslightbox-thumbs{padding-bottom:13px;height:120px}}@media (min-width:1600px){.fslightbox-thumbs{padding-bottom:14px;height:126px}}.fslightbox-thumbs-inner{display:inline-flex;justify-content:flex-start;align-items:center;height:100%}.fslightbox-thumb-wrapper{position:relative;height:100%;margin:0 4px;opacity:0;transition:opacity .3s}.fslightbox-thumb-wrapper svg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);cursor:pointer;z-index:1}.fslightbox-thumb-wrapper path{fill:#fff}.fslightboxtd{position:absolute;top:2px;left:2px;width:calc(100% - 4px);height:calc(100% - 4px);background:rgba(0,0,0,.4);cursor:pointer}.fslightbox-thumb{cursor:pointer;border-radius:1px;height:100%;width:auto!important;border:2px solid transparent;max-width:unset;max-height:unset}.fslightboxta{border:2px solid #fff!important}.fslightbox-thumb-invalid{background:linear-gradient(to bottom,#0f0f0f,rgba(15,15,15,.5));display:inline-block;min-width:155px}.fslightbox-thumbs-cursorer{z-index:3;cursor:grabbing}.fslightboxc{position:absolute;bottom:0;left:50%;width:100%;transform:translateX(-50%);transition:opacity .2s,transform .3s;z-index:2;user-select:text}.fslightboxc:after{content:'';position:absolute;z-index:-1;top:0;left:0;opacity:1;transition:opacity 1s;width:100%;height:100%;background:linear-gradient(180deg,rgba(0,0,0,0),#1e1e1e 100%)}.fslightboxci{padding:20px 25px 30px 25px;max-width:1200px;color:#eee;text-align:center;font-size:14px}.fslightboxct{transform:translate(-50%,-101px)}.fslightboxct:after{opacity:0;transition:none}@media(min-width:992px){.fslightboxct{transform:translate(-50%,-106px)}}")), document.head.appendChild(e));
    var tt = "fslightbox-types";
    function et(t) {
      var e,
        n = t.props,
        o = 0,
        i = {};
      this.getSourceTypeFromLocalStorageByUrl = function (t) {
        return e[t] ? e[t] : s(t);
      }, this.handleReceivedSourceTypeForUrl = function (t, n) {
        if (!1 === i[n] && (o--, "invalid" !== t ? i[n] = t : delete i[n], 0 === o)) {
          !function (t, e) {
            for (var n in e) t[n] = e[n];
          }(e, i);
          try {
            localStorage.setItem(tt, JSON.stringify(e));
          } catch (t) {}
        }
      };
      var s = function s(t) {
        o++, i[t] = !1;
      };
      if (n.disableLocalStorage) this.getSourceTypeFromLocalStorageByUrl = function () {}, this.handleReceivedSourceTypeForUrl = function () {};else {
        try {
          e = JSON.parse(localStorage.getItem(tt));
        } catch (t) {}
        e || (e = {}, this.getSourceTypeFromLocalStorageByUrl = s);
      }
    }
    var nt = "image",
      ot = "video",
      it = "youtube",
      st = "custom",
      rt = "invalid";
    function at(t, e, n, o) {
      var i = this,
        s = (t.data, t.elements.sources),
        r = n / o,
        a = 0,
        c = null;
      this.s = function () {
        var t = s[e].style;
        c = i.g(), t.width = "".concat(c[0], "px"), t.height = "".concat(c[1], "px");
      }, this.g = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : t.mh,
          i = t.mw;
        return (a = i / r) < e ? (n < i && (a = o), [a * r, a]) : [(a = o > e ? e : o) * r, a];
      }, this.d = function () {
        return c;
      };
    }
    function ct(t, e) {
      var n = this,
        o = t.elements.sources,
        i = t.isl,
        s = t.la,
        r = t.props.initialAnimation,
        a = t.resolve,
        c = t.saw,
        l = t.sew,
        d = t.sz;
      function h(t, n) {
        d[e] = a(at, [e, t, n]), d[e].s();
      }
      this.a = function (t, a) {
        i[e] = !0, o[e].classList.add(u), c[e].classList.add(r), c[e].removeChild(c[e].firstChild), requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            l[e].classList.add("fslightboxtt");
          });
        }), h(t, a), s.s(e), s.t(e), n.a = h;
      };
    }
    function ut(t, e) {
      var n,
        o = this,
        i = t.elements.sources,
        s = t.props,
        r = (0, t.resolve)(ct, [e]);
      this.handleImageLoad = function (t) {
        var e = t.target,
          n = e.naturalWidth,
          o = e.naturalHeight;
        r.a(n, o);
      }, this.handleVideoLoad = function (t) {
        var e = t.target,
          o = e.videoWidth,
          i = e.videoHeight;
        n = !0, r.a(o, i);
      }, this.handleNotMetaDatedVideoLoad = function () {
        n || o.handleYoutubeLoad();
      }, this.handleYoutubeLoad = function () {
        var t = 1920,
          e = 1080;
        s.maxYoutubeDimensions && (t = s.maxYoutubeDimensions.width, e = s.maxYoutubeDimensions.height), r.a(t, e);
      }, this.handleCustomLoad = function () {
        var t = i[e];
        t.offsetWidth && t.offsetHeight ? r.a(t.offsetWidth, t.offsetHeight) : setTimeout(o.handleCustomLoad);
      };
    }
    function lt(t, e) {
      var n = t.elements.sources,
        o = t.props.customAttributes,
        i = n[e];
      for (var s in o[e]) {
        var r = o[e][s];
        "class" !== s ? i.setAttribute(s, r) : i.classList.add("a");
      }
    }
    function dt(t, e) {
      var n = t.collections.sourceLoadHandlers,
        o = t.elements.sources,
        i = t.props.sources,
        s = t.saw,
        r = document.createElement("img");
      o[e] = r, r.className = "fslightboxs", r.src = i[e], r.onload = n[e].handleImageLoad, lt(t, e), s[e].appendChild(r);
    }
    function ht(t, e) {
      var n = t.collections.sourceLoadHandlers,
        o = t.elements.sources,
        i = t.props.sources,
        s = t.saw,
        r = document.createElement("video"),
        a = document.createElement("source");
      o[e] = r, r.className = "fslightboxs", r.src = i[e], r.onloadedmetadata = function (t) {
        n[e].handleVideoLoad(t);
      }, r.controls = !0, lt(t, e), r.appendChild(a), setTimeout(n[e].handleNotMetaDatedVideoLoad, 3e3), s[e].appendChild(r);
    }
    function ft(t, e) {
      var n = t.collections.sourceLoadHandlers,
        o = t.elements,
        i = o.sources,
        s = o.saw,
        r = t.props.sources,
        a = (s = t.saw, document.createElement("iframe")),
        c = r[e],
        u = c.split("?")[1];
      i[e] = a, a.className = "fslightboxs fslightboxyt", a.src = "https://www.youtube.com/embed/".concat(c.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2], "?").concat(u || ""), a.allowFullscreen = !0, lt(t, e), s[e].appendChild(a), n[e].handleYoutubeLoad();
    }
    function pt(t, e) {
      var n = t.collections.sourceLoadHandlers,
        o = t.elements.sources,
        i = t.props.sources,
        s = t.saw,
        r = i[e];
      o[e] = r, r.classList.add("fslightboxs"), lt(t, e), s[e].appendChild(r), n[e].handleCustomLoad();
    }
    function mt(t, e) {
      t.data.isSourceLoaded;
      var n,
        o,
        i = t.elements.sources,
        s = t.props,
        a = s.initialAnimation;
      return s.sources, n = t.saw, o = document.createElement("div"), n = n[e], o.className = "fslightboxin ".concat(r), o.innerHTML = "Invalid source", n.removeChild(n.firstChild), i[e] = o, n.classList.add(a), void n.appendChild(o);
    }
    function bt(t, e, n) {
      var o = t.props.thumbsIcons;
      if (o[n]) {
        e.appendChild(o[n].cloneNode(!0));
        var i = document.createElement("div");
        i.className = "fslightboxtd", e.appendChild(i);
      }
    }
    function gt(t, e, n) {
      var o = t.elements,
        i = o.thumbsWrappers,
        s = o.thumbsInner;
      i[e] = document.createElement("div"), i[e].className = y, bt(t, i[e], e), function (t, e, n, o) {
        var i = t.core.thumbLoadHandler.handleLoad,
          s = t.elements.thumbs,
          r = t.stageIndexes.current;
        s[n] = document.createElement("img"), s[n].src = o;
        var a = b;
        r === n && (a += " fslightboxta"), s[n].className = a, s[n].onload = i, e.appendChild(s[n]);
      }(t, i[e], e, n), s.appendChild(i[e]);
    }
    function vt(t) {
      var e = t.core.thumbsRenderDispatcher,
        n = t.data,
        o = t.props,
        i = o.showThumbsOnMount,
        s = o.sources,
        a = o.thumbs;
      this.buildThumbForTypeAndIndex = function (o, c) {
        var u;
        u = a[c] ? function () {
          return gt(t, c, a[c]);
        } : o === nt ? function () {
          return gt(t, c, s[c]);
        } : function () {
          return function (t, e) {
            var n = t.elements,
              o = n.thumbsWrappers,
              i = n.thumbsInner;
            o[e] = document.createElement("div"), o[e].className = "".concat(C, " ").concat(y), bt(t, o[e], e), function (t, e, n) {
              var o = t.core.thumbLoadHandler.handleLoad,
                i = t.elements.thumbs,
                s = t.stageIndexes.current;
              i[n] = document.createElement("div");
              var a = "".concat(b, " ").concat(r);
              s === n && (a += " fslightboxta"), i[n].className = a, j(i[n], "22px", 0, "0 0 30 30", "M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16.212,8l-0.2,9h-2.024l-0.2-9 H16.212z M15.003,22.189c-0.828,0-1.323-0.441-1.323-1.182c0-0.755,0.494-1.196,1.323-1.196c0.822,0,1.316,0.441,1.316,1.196 C16.319,21.748,15.825,22.189,15.003,22.189z"), e.appendChild(i[n]), setTimeout(o);
            }(t, o[e], e), i.appendChild(o[e]);
          }(t, c);
        }, e.addFunctionToToBeRenderedAtIndex(u, c), (i || n.isThumbing) && e.renderThumbsIfNotYetAndAllTypesDetected();
      };
    }
    function xt(t) {
      var e,
        n = t.collections,
        o = n.sourceLoadHandlers,
        i = n.sourcesRenderFunctions,
        s = t.core.sourceDisplayFacade,
        r = t.props.disableThumbs,
        a = t.resolve;
      r || (e = a(vt)), this.runActionsForSourceTypeAndIndex = function (n, c) {
        var u;
        switch (n !== rt && (o[c] = a(ut, [c])), n) {
          case nt:
            u = dt;
            break;
          case ot:
            u = ht;
            break;
          case it:
            u = ft;
            break;
          case st:
            u = pt;
            break;
          default:
            u = mt;
        }
        i[c] = function () {
          return u(t, c);
        }, s.displaySourcesWhichShouldBeDisplayed(), r || e.buildThumbForTypeAndIndex(n, c);
      };
    }
    function wt(t, e, n) {
      var o = t.props,
        i = o.types,
        s = o.type,
        r = o.sources;
      this.getTypeSetByClientForIndex = function (t) {
        var e;
        return i && i[t] ? e = i[t] : s && (e = s), e;
      }, this.retrieveTypeWithXhrForIndex = function (t) {
        !function (t, e) {
          var n = document.createElement("a");
          n.href = t;
          var o = n.hostname;
          if ("www.youtube.com" === o || "youtu.be" === o) return e(it);
          var i = new XMLHttpRequest();
          i.onreadystatechange = function () {
            if (4 !== i.readyState) {
              if (2 === i.readyState) {
                var t,
                  n = i.getResponseHeader("content-type");
                switch (n.slice(0, n.indexOf("/"))) {
                  case "image":
                    t = nt;
                    break;
                  case "video":
                    t = ot;
                    break;
                  default:
                    t = rt;
                }
                i.onreadystatechange = null, i.abort(), e(t);
              }
            } else e(rt);
          }, i.open("GET", t), i.send();
        }(r[t], function (o) {
          e.handleReceivedSourceTypeForUrl(o, r[t]), n.runActionsForSourceTypeAndIndex(o, t);
        });
      };
    }
    function yt(t) {
      var e = t.props.sources,
        n = t.st,
        o = t.stageIndexes,
        i = e.length - 1;
      n.getPreviousSlideIndex = function () {
        return 0 === o.current ? i : o.current - 1;
      }, n.getNextSlideIndex = function () {
        return o.current === i ? 0 : o.current + 1;
      }, n.u = 0 === i ? function () {} : 1 === i ? function () {
        0 === o.current ? (o.next = 1, delete o.previous) : (o.previous = 0, delete o.next);
      } : function () {
        o.previous = n.getPreviousSlideIndex(), o.next = n.getNextSlideIndex();
      }, n.i = i <= 2 ? function () {
        return !0;
      } : function (t) {
        var e = o.current;
        if (0 === e && t === i || e === i && 0 === t) return !0;
        var n = e - t;
        return -1 === n || 0 === n || 1 === n;
      };
    }
    function Ct(t) {
      var e = t.componentsServices,
        o = t.core,
        i = o.eventsDispatcher,
        r = (o.lightboxOpener, o.globalEventsController),
        l = o.scrollbarRecompensor,
        d = o.sourceDisplayFacade,
        h = t.data,
        m = t.ea,
        b = t.elements,
        y = t.la,
        C = t.smw,
        L = t.st,
        N = t.stageIndexes,
        k = t.sws,
        B = t.ui,
        W = !1;
      function M() {
        var e,
          o = t.props,
          r = o.disableThumbs,
          a = o.showThumbsOnMount,
          l = o.sources;
        W = !0, function (t) {
          var e = t.props;
          t.dss = e.disableSlideSwiping, t.dt = e.disableThumbs, t.c = e.sources.length, t.tc = e.showThumbsWithCaptions;
        }(t), h.scrollbarWidth = function () {
          var t = document.createElement("div"),
            e = t.style,
            n = document.createElement("div");
          e.visibility = "hidden", e.width = "100px", e.msOverflowStyle = "scrollbar", e.overflow = "scroll", n.style.width = "100%", document.body.appendChild(t);
          var o = t.offsetWidth;
          t.appendChild(n);
          var i = n.offsetWidth;
          return document.body.removeChild(t), o - i;
        }(), h.unloadedThumbsCount = l.length, r || (h.isThumbing = a, function (t) {
          var e = t.core,
            n = t.data,
            o = t.elements,
            i = t.props;
          n.isThumbing = i.showThumbsOnMount, n.thumbsInnerWidth = null, n.thumbsTransform = 0, n.thumbedSourceEnhancementWrapperScale = null, n.thumbedSourceEnhancementWrapperTranslateY = null, n.unloadedThumbsCount = i.sources.length, t.thumbsSwipingProps = {
            i: !1,
            downScreenX: null,
            swipedX: null
          }, e.thumbLoadHandler = {}, e.thumbsRenderDispatcher = {}, e.thumbsSwipingDown = {}, e.thumbsToggler = {}, e.thumbsTransformer = {}, e.thumbsTransformTransitioner = {}, o.thumbsContainer = null, o.thumbs = [], o.thumbsWrappers = [], o.thumbsComponents = [], o.thumbsInner = null, function (t) {
            var e = t.core.thumbLoadHandler,
              n = t.componentsServices,
              o = t.data,
              i = t.elements.thumbsWrappers,
              s = t.la;
            e.handleLoad = function () {
              if (o.unloadedThumbsCount--, 0 === o.unloadedThumbsCount) {
                for (var t = 0; t < i.length; t++) i[t].classList.add(u);
                s.rt(), n.hideThumbsLoader();
              }
            };
          }(t), function (t) {
            var e = t.core.thumbsRenderDispatcher,
              n = t.props.sources,
              o = [],
              i = !1,
              s = 0;
            e.addFunctionToToBeRenderedAtIndex = function (t, e) {
              o[e] = t, s++;
            }, e.renderThumbsIfNotYetAndAllTypesDetected = function () {
              if (!i && s === n.length) {
                i = !0;
                for (var t = 0; t < n.length; t++) o[t]();
              }
            };
          }(t), function (t) {
            var e = t.core,
              n = e.thumbsSwipingDown,
              o = e.pointeringBucket,
              i = t.thumbsSwipingProps;
            n.listener = function (t) {
              t.preventDefault(), o.runSwipingDownActionsForPropsAndEvent(i, t);
            };
          }(t), function (t) {
            var e = t.core.thumbsToggler,
              n = t.data,
              o = (0, t.resolve)(T);
            e.toggleThumbs = function () {
              n.isThumbing ? o.x() : o.o();
            };
          }(t), function (t) {
            var e = t.core,
              n = e.thumbsTransformer,
              o = e.thumbsTransformTransitioner,
              i = t.data,
              s = (0, t.resolve)(A);
            n.transformToCurrent = function () {
              i.thumbsInnerWidth > innerWidth ? s.runActions() : s.runToThinThumbsActions();
            }, n.transformToCurrentWithTransition = function () {
              i.thumbsInnerWidth > innerWidth && o.callActionWithTransition(s.runActions);
            };
          }(t), function (t) {
            var e = t.core.thumbsTransformTransitioner,
              n = t.elements,
              o = (0, t.q)(function () {
                n.thumbsInner.classList.remove("fslightboxtt");
              }, 300);
            e.callActionWithTransition = function (t) {
              n.thumbsInner.classList.add("fslightboxtt"), t(), o();
            };
          }(t);
        }(t)), function (t) {
          !function (t) {
            var e = t.core,
              n = e.classFacade,
              o = e.st,
              i = t.elements;
            n.removeFromEachElementClassIfContains = function (t, e) {
              for (var n = 0; n < i[t].length; n++) z(i[t][n], e);
            }, n.stagedRemovalAndOutstagedAddingOfClassIfContains = function (t, e) {
              for (var n = 0; n < i[t].length; n++) o.i(n) ? z(i[t][n], e) : S(i[t][n], e);
            };
          }(t), function (t) {
            var e = t.core.clickZoomer,
              n = (t.elements, t.props.zoomIncrement),
              o = t.q,
              i = t.z,
              s = o(function () {
                z(t.swc, "fslightboxtt");
              }, 300);
            e.zoomIn = function () {
              r(), a(t.zv + n);
            }, e.zoomOut = function () {
              t.zv - n <= 1 ? 1 !== t.zv && (a(1), i.e()) : (r(), a(t.zv - n), 1 === t.zv && i.e());
            };
            var r = function r() {
                1 === t.zv && i.b();
              },
              a = function a(e) {
                S(t.swc, "fslightboxtt"), i.z(e), s();
              };
          }(t), function (t) {
            var e = t.ea,
              n = t.data,
              o = t.elements,
              i = o.captions,
              s = o.thumbs,
              r = (t.stageIndexes, t.tc),
              a = t.ui;
            function c(t) {
              if (r) for (var e = 0; e < i.length; e++) {
                var n = i[e];
                n && n.classList[t]("fslightboxct");
              }
            }
            e.c = function (e, o) {
              (r || !n.isThumbing || t.xu) && (a.hc(e), a.sc(o));
            }, e.dc = function () {
              c("remove");
            }, e.uc = function () {
              c("add");
            }, e.t = function (t, e) {
              s && s[e] && (s[t].classList.remove("fslightboxta"), s[e].classList.add("fslightboxta"));
            };
          }(t), function (t) {
            var e = t.core.eventsDispatcher,
              n = t.props;
            e.dispatch = function (e) {
              n[e] && n[e](t);
            };
          }(t), function (t) {
            var e = t.componentsServices,
              n = t.data,
              o = t.fs,
              i = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"];
            function s(t) {
              for (var e = 0; e < i.length; e++) document[t](i[e], r);
            }
            function r() {
              document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement ? e.ofs() : e.xfs();
            }
            o.o = function () {
              e.ofs();
              var t = document.documentElement;
              t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.msRequestFullscreen && t.msRequestFullscreen();
            }, o.x = function () {
              e.xfs(), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen();
            }, o.t = function () {
              n.ifs ? o.x() : o.o();
            }, o.l = function () {
              s("addEventListener");
            }, o.q = function () {
              s("removeEventListener");
            };
          }(t), function (t) {
            var e,
              n = t.core.globalEventsController,
              o = t.fs,
              i = t.la,
              s = t.r,
              r = (t.ui, s(X));
            n.addListeners = function () {
              document.addEventListener("pointermove", r.m), document.addEventListener("pointerup", r.u), addEventListener("resize", i.r), e = function e(_e) {
                Y(t, _e);
              }, document.addEventListener("keydown", e), document.addEventListener("wheel", r.w), o.l();
            }, n.removeListeners = function () {
              document.removeEventListener("pointermove", r.m), document.removeEventListener("pointerup", r.u), removeEventListener("resize", i.r), document.removeEventListener("keydown", e), document.removeEventListener("wheel", r.w), o.q();
            };
          }(t), function (t) {
            t.c;
            var e = t.data,
              n = t.ea,
              o = t.elements,
              i = t.f,
              s = t.la,
              r = t.props.UIFadeOutTime,
              a = t.q,
              c = t.stageIndexes,
              u = t.tc,
              l = t.ui,
              d = o.captions,
              h = a(function () {
                t.xu = !0, f(y), 1 === t.zv && e.isThumbing && (s.ut(), u ? n.dc() : l.sc(c.current));
              }, r);
            function f(t) {
              p(t), m(t), e.isThumbing && w(t);
            }
            function p(t) {
              t(o.nav);
            }
            function m(t) {
              o.slideButtonPrevious && (t(o.slideButtonPrevious), t(o.slideButtonNext));
            }
            function b(t, e) {
              x(t, e);
            }
            function g(t) {
              m(t), e.isThumbing ? (w(t), u && v(t)) : v(t);
            }
            function v(t) {
              x(t, c.current);
            }
            function x(t, e) {
              var n = d[e];
              n && t(n);
            }
            function w(t) {
              t(o.thumbsContainer);
            }
            function y(t) {
              t.classList.add("fslightboxx");
            }
            function C(t) {
              t.classList.remove("fslightboxx");
            }
            r ? (l.qps = function () {
              h(), t.xu && (t.xu = !1, 1 === t.zv ? f(C) : p(C)), 1 === t.zv && e.isThumbing && (i(function (t) {
                s.t(t);
              }), u ? n.uc() : l.hc(c.current));
            }, l.q = function () {
              h();
            }) : (l.qps = function () {}, l.q = function () {}), l.sc = function (t) {
              b(C, t);
            }, l.hc = function (t) {
              b(y, t);
            }, l.zh = function () {
              g(y);
            }, l.zs = function () {
              g(C);
            }, l.sthc = function () {
              w(C), u || v(y);
            }, l.htsc = function () {
              w(y), u || v(C);
            };
          }(t), function (t) {
            var e = t.core.lightboxCloser,
              n = (0, t.resolve)(I);
            e.close = function () {
              n.isLightboxFadingOut || n.runActions();
            };
          }(t), function (t) {
            var e = t.core.pointeringBucket;
            t.elements, e.runSwipingDownActionsForPropsAndEvent = function (t, e) {
              t.i = !0, t.downScreenX = e.screenX, t.swipedX = 0;
            }, e.runSwipingMoveActionsForPropsAndEvent = function (e, n) {
              S(t.h, "fslightboxcg"), e.swipedX = n.screenX - e.downScreenX;
            }, e.runSwipingTopActionsForPropsAndEvent = function (e) {
              z(t.h, "fslightboxcg"), e.i = !1;
            };
          }(t), function (t) {
            var e = t.data,
              n = t.core.scrollbarRecompensor;
            n.addRecompense = function () {
              "complete" === document.readyState ? o() : window.addEventListener("load", function () {
                o(), n.addRecompense = o;
              });
            };
            var o = function o() {
              document.body.offsetHeight > window.innerHeight && (document.body.style.marginRight = e.scrollbarWidth + "px");
            };
            n.removeRecompense = function () {
              document.body.style.removeProperty("margin-right");
            };
          }(t), function (t) {
            var e = t.c,
              n = t.core.thumbsTransformer,
              o = t.data,
              i = t.dt,
              s = t.elements,
              r = t.f,
              a = t.isl,
              c = t.la,
              u = t.sew,
              l = t.smw,
              d = t.sz,
              h = t.stageIndexes,
              f = t.tc,
              p = s.captions,
              m = s.thumbs,
              b = [],
              g = [],
              v = [],
              x = [],
              w = [],
              y = 0;
            function C() {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
              u[arguments.length > 2 ? arguments[2] : void 0].style.transform = "translateY(".concat(t, "px) scale(").concat(e, ")");
            }
            c.r = function () {
              innerWidth < 992 ? t.mw = innerWidth : t.mw = .9 * innerWidth, t.mh = .9 * innerHeight, 0 === o.unloadedThumbsCount && c.rt(), void 0 !== h.previous && l[h.previous].ne(), void 0 !== h.next && l[h.next].p(), r(function (t) {
                var e = d[t],
                  n = p[t];
                e && e.s(), n && (b[t] = n.offsetHeight), i || (y = s.thumbsContainer.offsetHeight), c.s(t), l[t].d(), c.t(t);
              });
            }, c.s = function (t) {
              var e = d[t];
              if (e) {
                var n = e.d(),
                  o = n[0] + n[1];
                if (b[t]) {
                  var s = e.g(.94 * innerHeight - b[t]);
                  g[t] = (s[0] + s[1]) / o, w[t] = -(b[t] - innerHeight / 2 + s[1] / 2), w[t] > 0 && (w[t] = 0);
                }
                if (!i) {
                  if (f && b[t]) {
                    var r = y + b[t];
                    a = e.g(.9 * innerHeight - r + 46), v[t] = (a[0] + a[1]) / o, x[t] = -(r - 21 - innerHeight / 2 + a[1] / 2);
                  } else {
                    var a = e.g(.9 * innerHeight - y);
                    v[t] = (a[0] + a[1]) / o, x[t] = -(y - innerHeight / 2 + a[1] / 2 + 16);
                  }
                  x[t] > 0 && (x[t] = 0);
                }
              }
            }, c.t = function (e) {
              a[e] && (1 !== t.zv ? C(0, 1, e) : o.isThumbing ? C(x[e], v[e], e) : C(w[e], g[e], e));
            }, c.ut = function () {
              r(function (t) {
                a[t] && C(w[t], g[t], t);
              });
            }, c.rt = function () {
              o.thumbsInnerWidth = 0;
              for (var t = 0; t < e; t++) o.thumbsInnerWidth += m[t].offsetWidth + 8;
              n.transformToCurrent();
            };
          }(t), F(t), function (t) {
            var e = t.core,
              n = e.slideChangeFacade,
              o = e.slideIndexChanger,
              i = t.props.sources,
              s = t.st;
            i.length > 1 ? (n.changeToPrevious = function () {
              o.jumpTo(s.getPreviousSlideIndex());
            }, n.changeToNext = function () {
              o.jumpTo(s.getNextSlideIndex());
            }) : (n.changeToPrevious = function () {}, n.changeToNext = function () {});
          }(t), function (t) {
            var e = t.componentsServices,
              n = t.core,
              o = n.eventsDispatcher,
              i = n.slideIndexChanger,
              s = n.sourceDisplayFacade,
              r = n.thumbsTransformer,
              a = t.ea,
              c = t.isl,
              u = t.props.disableThumbs,
              l = t.resolve,
              d = t.smw,
              h = t.st,
              f = t.stageIndexes,
              p = t.sws,
              m = t.z;
            i.changeTo = function (t) {
              var n = f.current;
              m.r(), a.c(n, t), f.current = t, h.u(), e.setSlideNumber(t + 1), u || (a.t(n, t), r.transformToCurrentWithTransition()), s.displaySourcesWhichShouldBeDisplayed(), o.dispatch("onSlideChange");
            }, i.jumpTo = function (t) {
              var e = f.current;
              if (e !== t) {
                var n = l(E, [{
                  previous: f.previous,
                  current: e,
                  next: f.next
                }, c[e], c[t]]);
                i.changeTo(t);
                for (var o = 0; o < d.length; o++) d[o].d();
                p.d(e), p.c(), requestAnimationFrame(function () {
                  requestAnimationFrame(n.runJumpReflowedActions);
                });
              }
            };
          }(t), function (t) {
            var e = t.collections.sourcesRenderFunctions,
              n = t.core.sourceDisplayFacade,
              o = t.props.loadOnlyCurrentSource,
              i = t.stageIndexes;
            function s(t) {
              e[t] && (e[t](), delete e[t]);
            }
            n.displaySourcesWhichShouldBeDisplayed = function () {
              if (o) s(i.current);else for (var t in i) s(i[t]);
            };
          }(t), function (t) {
            var e = t.isl,
              n = t.props,
              o = n.initialAnimation,
              i = n.slideChangeAnimation,
              s = t.stageIndexes,
              r = t.saw,
              a = t.smw,
              c = t.st,
              u = t.sws;
            u.a = function () {
              for (var t in s) a[s[t]].s();
            }, u.b = function (t) {
              void 0 === t || c.i(t) || (a[t].h(), a[t].n());
            }, u.c = function () {
              for (var t in s) u.d(s[t]);
            }, u.d = function (t) {
              if (e[t]) {
                var n = r[t];
                z(n, o), z(n, i), z(n, f);
              }
            };
          }(t), function (t) {
            var e = t.elements,
              n = e.sources,
              o = e.smw,
              i = t.la,
              s = t.p,
              r = (o = t.smw, t.stageIndexes),
              a = t.ui,
              c = t.z;
            function u(t) {
              var e = n[r.current];
              e && (e.style.cursor = t);
            }
            c.z = function (e) {
              t.zv = parseFloat(e.toPrecision(12)), t.swc.style.transform = "scale(".concat(t.zv, ")");
            }, c.r = function () {
              1 !== t.zv && (c.z(1), c.e());
            }, c.b = function () {
              u("grab"), a.zh(), i.t();
            }, c.e = function () {
              u("zoom-in"), a.zs(), o[r.current].a(), o[r.current].v(0, 0).z(), s.ux = 0, s.uy = 0;
            };
          }(t);
        }(t), function (t) {
          var e = t.elements,
            o = document.createElement("div");
          o.className = "".concat(n, "container ").concat(s, " ").concat(p), e.container = o;
        }(t), function (t) {
          t.h = document.createElement("div"), t.h.className = "fslightboxth ".concat(s).concat(c);
        }(t), Z(t), function (t) {
          t.ssb = document.createElement("div"), t.ssb.className = "fslightboxss ".concat(c), t.elements.container.appendChild(t.ssb);
        }(t), $(t), function (t) {
          for (var e = t.props.captions, n = 0; n < e.length; n++) e[n] && K(t, n);
        }(t), l.length > 1 && (Q(e = t, "previous"), Q(e, "next")), r || function (t) {
          var e = t.componentsServices,
            n = t.elements,
            o = t.data;
          n.thumbsContainer = document.createElement("div");
          var i,
            r,
            a = g;
          function u() {
            r = !0, (i = J(n.thumbsContainer)).classList.add(v);
          }
          o.isThumbing ? u() : a += " fslightboxx", e.appendThumbsLoaderIfNotYet = function () {
            r || u();
          }, e.hideThumbsLoader = function () {
            n.thumbsContainer.removeChild(i);
          }, n.thumbsContainer.className = a, n.container.appendChild(n.thumbsContainer), function (t) {
            var e = t.elements;
            e.thumbsCursorer = document.createElement("div"), e.thumbsCursorer.className = "".concat(x, " ").concat(s, " ").concat(c);
          }(t), function (t) {
            var e = t.core.thumbsSwipingDown.listener,
              n = t.elements;
            n.thumbsInner = document.createElement("div"), n.thumbsInner.className = w, n.thumbsInner.addEventListener("pointerdown", e), n.thumbsContainer.appendChild(n.thumbsInner);
          }(t);
        }(t), function (t) {
          for (var e = t.props.sources, n = t.resolve, o = n(et), i = n(xt), s = n(wt, [o, i]), r = 0; r < e.length; r++) if ("string" == typeof e[r]) {
            var a = s.getTypeSetByClientForIndex(r);
            if (a) i.runActionsForSourceTypeAndIndex(a, r);else {
              var c = o.getSourceTypeFromLocalStorageByUrl(e[r]);
              c ? i.runActionsForSourceTypeAndIndex(c, r) : s.retrieveTypeWithXhrForIndex(r);
            }
          } else i.runActionsForSourceTypeAndIndex(st, r);
        }(t), i.dispatch("onInit");
      }
      t.open = function () {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          o = N.previous,
          s = N.current,
          c = N.next;
        N.current = n, W || yt(t), L.u(), W ? (k.c(), k.a(), k.b(o), k.b(s), k.b(c), m.c(s, N.current), m.t(s, N.current), i.dispatch("onShow")) : M(), d.displaySourcesWhichShouldBeDisplayed(), e.setSlideNumber(n + 1), document.body.appendChild(b.container), document.documentElement.classList.add(a), l.addRecompense(), r.addListeners(), y.r(), C[N.current].n(), B.q(), i.dispatch("onOpen");
      };
    }
    function Lt(t, e, n) {
      return Lt = Tt() ? Reflect.construct.bind() : function (t, e, n) {
        var o = [null];
        o.push.apply(o, e);
        var i = new (Function.bind.apply(t, o))();
        return n && zt(i, n.prototype), i;
      }, Lt.apply(null, arguments);
    }
    function Tt() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
      } catch (t) {
        return !1;
      }
    }
    function zt(t, e) {
      return zt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
        return t.__proto__ = e, t;
      }, zt(t, e);
    }
    function St(t) {
      return function (t) {
        if (Array.isArray(t)) return At(t);
      }(t) || function (t) {
        if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t);
      }(t) || function (t, e) {
        if (t) {
          if ("string" == typeof t) return At(t, e);
          var n = Object.prototype.toString.call(t).slice(8, -1);
          return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? At(t, e) : void 0;
        }
      }(t) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }
    function At(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n];
      return o;
    }
    function It() {
      for (var t = document.getElementsByTagName("a"), e = function e(_e2) {
          if (!t[_e2].hasAttribute("data-fslightbox")) return "continue";
          var n = t[_e2].getAttribute("href");
          if (!n) return console.warn('The "data-fslightbox" attribute was set without the "href" attribute.'), "continue";
          var o = t[_e2].getAttribute("data-fslightbox");
          fsLightboxInstances[o] || (fsLightboxInstances[o] = new FsLightbox());
          var i = null;
          "#" === n.charAt(0) ? (i = document.getElementById(n.substring(1)).cloneNode(!0)).removeAttribute("id") : i = n, fsLightboxInstances[o].props.sources.push(i), fsLightboxInstances[o].elements.a.push(t[_e2]);
          var s = fsLightboxInstances[o].props.sources.length - 1;
          t[_e2].onclick = function (t) {
            t.preventDefault(), fsLightboxInstances[o].open(s);
          }, d("captions", "data-caption"), d("types", "data-type"), d("thumbs", "data-thumb");
          for (var r = ["href", "data-fslightbox", "data-caption", "data-type", "data-thumb"], a = t[_e2].attributes, c = fsLightboxInstances[o].props.customAttributes, u = 0; u < a.length; u++) if (-1 === r.indexOf(a[u].name) && "data-" === a[u].name.substr(0, 5)) {
            c[s] || (c[s] = {});
            var l = a[u].name.substr(5);
            c[s][l] = a[u].value;
          }
          function d(n, i) {
            t[_e2].hasAttribute(i) && (fsLightboxInstances[o].props[n][s] = t[_e2].getAttribute(i));
          }
        }, n = 0; n < t.length; n++) e(n);
      var o = Object.keys(fsLightboxInstances);
      window.fsLightbox = fsLightboxInstances[o[o.length - 1]];
    }
    return window.FsLightbox = function () {
      var t = this;
      this.props = {
        sources: [],
        maxYoutubeDimensions: null,
        customAttributes: [],
        customClasses: [],
        types: [],
        type: null,
        thumbs: [],
        thumbsIcons: [],
        captions: [],
        videosPosters: [],
        customToolbarButtons: [],
        initialAnimation: p,
        slideChangeAnimation: h,
        slideDistance: .3,
        slideshowTime: 8e3,
        UIFadeOutTime: 8e3,
        zoomIncrement: .25,
        toolbarButtons: {
          thumbs: {
            width: "17px",
            height: "17px",
            viewBox: "0 0 22 22",
            d: "M 3 2 C 2.448 2 2 2.448 2 3 L 2 6 C 2 6.552 2.448 7 3 7 L 6 7 C 6.552 7 7 6.552 7 6 L 7 3 C 7 2.448 6.552 2 6 2 L 3 2 z M 10 2 C 9.448 2 9 2.448 9 3 L 9 6 C 9 6.552 9.448 7 10 7 L 13 7 C 13.552 7 14 6.552 14 6 L 14 3 C 14 2.448 13.552 2 13 2 L 10 2 z M 17 2 C 16.448 2 16 2.448 16 3 L 16 6 C 16 6.552 16.448 7 17 7 L 20 7 C 20.552 7 21 6.552 21 6 L 21 3 C 21 2.448 20.552 2 20 2 L 17 2 z M 3 9 C 2.448 9 2 9.448 2 10 L 2 13 C 2 13.552 2.448 14 3 14 L 6 14 C 6.552 14 7 13.552 7 13 L 7 10 C 7 9.448 6.552 9 6 9 L 3 9 z M 10 9 C 9.448 9 9 9.448 9 10 L 9 13 C 9 13.552 9.448 14 10 14 L 13 14 C 13.552 14 14 13.552 14 13 L 14 10 C 14 9.448 13.552 9 13 9 L 10 9 z M 17 9 C 16.448 9 16 9.448 16 10 L 16 13 C 16 13.552 16.448 14 17 14 L 20 14 C 20.552 14 21 13.552 21 13 L 21 10 C 21 9.448 20.552 9 20 9 L 17 9 z M 3 16 C 2.448 16 2 16.448 2 17 L 2 20 C 2 20.552 2.448 21 3 21 L 6 21 C 6.552 21 7 20.552 7 20 L 7 17 C 7 16.448 6.552 16 6 16 L 3 16 z M 10 16 C 9.448 16 9 16.448 9 17 L 9 20 C 9 20.552 9.448 21 10 21 L 13 21 C 13.552 21 14 20.552 14 20 L 14 17 C 14 16.448 13.552 16 13 16 L 10 16 z M 17 16 C 16.448 16 16 16.448 16 17 L 16 20 C 16 20.552 16.448 21 17 21 L 20 21 C 20.552 21 21 20.552 21 20 L 21 17 C 21 16.448 20.552 16 20 16 L 17 16 z",
            title: "Thumbnails"
          },
          zoomIn: {
            width: "20px",
            height: "20px",
            viewBox: "0 0 30 30",
            d: "M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z M 12.984375 7.9863281 A 1.0001 1.0001 0 0 0 12 9 L 12 12 L 9 12 A 1.0001 1.0001 0 1 0 9 14 L 12 14 L 12 17 A 1.0001 1.0001 0 1 0 14 17 L 14 14 L 17 14 A 1.0001 1.0001 0 1 0 17 12 L 14 12 L 14 9 A 1.0001 1.0001 0 0 0 12.984375 7.9863281 z",
            title: "Zoom In"
          },
          zoomOut: {
            width: "20px",
            height: "20px",
            viewBox: "0 0 30 30",
            d: "M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z M 9 12 A 1.0001 1.0001 0 1 0 9 14 L 17 14 A 1.0001 1.0001 0 1 0 17 12 L 9 12 z",
            title: "Zoom Out"
          },
          slideshow: {
            start: {
              width: "16px",
              height: "16px",
              viewBox: "0 0 30 30",
              d: "M 6 3 A 1 1 0 0 0 5 4 A 1 1 0 0 0 5 4.0039062 L 5 15 L 5 25.996094 A 1 1 0 0 0 5 26 A 1 1 0 0 0 6 27 A 1 1 0 0 0 6.5800781 26.8125 L 6.5820312 26.814453 L 26.416016 15.908203 A 1 1 0 0 0 27 15 A 1 1 0 0 0 26.388672 14.078125 L 6.5820312 3.1855469 L 6.5800781 3.1855469 A 1 1 0 0 0 6 3 z",
              title: "Turn on slideshow"
            },
            pause: {
              width: "14px",
              height: "14px",
              viewBox: "0 0 356.19 356.19",
              d: "M121,0c18,0,33,15,33,33v372c0,18-15,33-33,33s-32-15-32-33V33C89,15,103,0,121,0zM317,0c18,0,32,15,32,33v372c0,18-14,33-32,33s-33-15-33-33V33C284,15,299,0,317,0z",
              title: "Turn off slideshow"
            }
          },
          fullscreen: {
            enter: {
              width: "20px",
              height: "20px",
              viewBox: "0 0 18 18",
              d: "M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z",
              title: "Enter fullscreen"
            },
            exit: {
              width: "24px",
              height: "24px",
              viewBox: "0 0 950 1024",
              d: "M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z",
              title: "Exit fullscreen"
            }
          },
          close: {
            width: "20px",
            height: "20px",
            viewBox: "0 0 24 24",
            d: "M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z",
            title: "Close"
          }
        },
        slideButtons: {
          previous: {
            width: "20px",
            height: "20px",
            viewBox: "0 0 20 20",
            d: "M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z",
            title: "Previous"
          },
          next: {
            width: "20px",
            height: "20px",
            viewBox: "0 0 20 20",
            d: "M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z",
            title: "Next"
          }
        }
      }, this.data = {
        isThumbing: !1,
        scrollbarWidth: 0
      }, this.ifs = !1, this.isl = [], this.qs = [], this.ts = [], this.zv = 1, this.p = {
        p: {},
        ux: 0,
        uy: 0
      }, this.stageIndexes = {}, this.elements = {
        a: [],
        captions: [],
        container: null,
        nav: null,
        slideButtonPrevious: null,
        slideButtonNext: null,
        sources: []
      }, this.saw = [], this.sew = [], this.smw = [], this.componentsServices = {
        setSlideNumber: function setSlideNumber() {}
      }, this.f = function (e) {
        for (var n = 0; n < t.c; n++) e(n);
      }, this.m = function (e, n) {
        return function () {
          for (var o = arguments.length, i = new Array(o), s = 0; s < o; s++) i[s] = arguments[s];
          i.unshift(t), n.apply(void 0, i) && e.apply(void 0, i);
        };
      }, this.resolve = function (e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        return n.unshift(t), Lt(e, St(n));
      }, this.r = this.resolve, this.collections = {
        sourceLoadHandlers: [],
        sourcesRenderFunctions: []
      }, this.sz = [], this.core = {
        classFacade: {},
        clickZoomer: {},
        eventsDispatcher: {},
        globalEventsController: {},
        lightboxCloser: {},
        lightboxUpdater: {},
        pointeringBucket: {},
        scrollbarRecompensor: {},
        slideChangeFacade: {},
        slideIndexChanger: {},
        sourceDisplayFacade: {},
        swipingActioner: {}
      }, this.ea = {}, this.fs = {}, this.la = {}, this.ss = {}, this.st = {}, this.sws = {}, this.ui = {}, this.z = {}, this.t = function (e, n) {
        var o = t.ts.push(setTimeout(function () {
          delete t.ts[o - 1], e();
        }, n));
      }, this.q = function (e, n) {
        var o = t.qs.push(0) - 1;
        return function () {
          t.qs[o]++, t.t(function () {
            t.qs[o]--, t.qs[o] || e();
          }, n);
        };
      }, Ct(this), this.close = function () {
        return t.core.lightboxCloser.close();
      };
    }, window.fsLightboxInstances = {}, It(), window.refreshFsLightbox = function () {
      for (var t in fsLightboxInstances) {
        var e = fsLightboxInstances[t].props;
        fsLightboxInstances[t] = new FsLightbox(), fsLightboxInstances[t].props = e, fsLightboxInstances[t].props.sources = [], fsLightboxInstances[t].elements.a = [];
      }
      It();
    }, t;
  }();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS1wYWdpbmF0aW9uLmpzIiwianF1ZXJ5LW1vZGFsLmpzIiwiZnNsaWdodGJveC5qcyIsIndoYXRldmVyLmpzIiwiY29tbW9uLmpzIiwiYXBpLWNsaWVudC5qcyIsInRlbXBsYXRlcy5qcyIsImZpbGwtZmllbGRzLmpzIiwieWFjaHRTZWFyY2hUYWdzLmpzIiwieWFjaHRTZWFyY2hMb3ZlZC5qcyIsInlhY2h0U2VhcmNoQ29tcGFyZS5qcyIsInlhY2h0U2VhcmNoLmpzIiwibGVhZHMuanMiXSwibmFtZXMiOlsiJCIsIm1ldGhvZHMiLCJpbml0Iiwib3B0aW9ucyIsIm8iLCJleHRlbmQiLCJpdGVtcyIsIml0ZW1zT25QYWdlIiwicGFnZXMiLCJkaXNwbGF5ZWRQYWdlcyIsImVkZ2VzIiwiY3VycmVudFBhZ2UiLCJ1c2VBbmNob3JzIiwiaHJlZlRleHRQcmVmaXgiLCJocmVmVGV4dFN1ZmZpeCIsInByZXZUZXh0IiwibmV4dFRleHQiLCJlbGxpcHNlVGV4dCIsImVsbGlwc2VQYWdlU2V0IiwiY3NzU3R5bGUiLCJsaXN0U3R5bGUiLCJsYWJlbE1hcCIsInNlbGVjdE9uQ2xpY2siLCJuZXh0QXRGcm9udCIsImludmVydFBhZ2VPcmRlciIsInVzZVN0YXJ0RWRnZSIsInVzZUVuZEVkZ2UiLCJvblBhZ2VDbGljayIsInBhZ2VOdW1iZXIiLCJldmVudCIsIm9uSW5pdCIsInNlbGYiLCJNYXRoIiwiY2VpbCIsImhhbGZEaXNwbGF5ZWQiLCJlYWNoIiwiYWRkQ2xhc3MiLCJkYXRhIiwiX2RyYXciLCJjYWxsIiwic2VsZWN0UGFnZSIsInBhZ2UiLCJfc2VsZWN0UGFnZSIsInByZXZQYWdlIiwibmV4dFBhZ2UiLCJnZXRQYWdlc0NvdW50Iiwic2V0UGFnZXNDb3VudCIsImNvdW50IiwiZ2V0Q3VycmVudFBhZ2UiLCJkZXN0cm95IiwiZW1wdHkiLCJkcmF3UGFnZSIsInJlZHJhdyIsImRpc2FibGUiLCJkaXNhYmxlZCIsImVuYWJsZSIsInVwZGF0ZUl0ZW1zIiwibmV3SXRlbXMiLCJfZ2V0UGFnZXMiLCJ1cGRhdGVJdGVtc09uUGFnZSIsImdldEl0ZW1zT25QYWdlIiwiaW50ZXJ2YWwiLCJfZ2V0SW50ZXJ2YWwiLCJpIiwidGFnTmFtZSIsInByb3AiLCJhdHRyIiwiJHBhbmVsIiwiYXBwZW5kVG8iLCJfYXBwZW5kSXRlbSIsInRleHQiLCJjbGFzc2VzIiwic3RhcnQiLCJlbmQiLCJtaW4iLCJhcHBlbmQiLCJiZWdpbiIsIm1heCIsIl9lbGxpcHNlQ2xpY2siLCJwYWdlSW5kZXgiLCJvcHRzIiwiJGxpbmsiLCIkbGlua1dyYXBwZXIiLCIkdWwiLCJmaW5kIiwibGVuZ3RoIiwiY2xpY2siLCIkZWxsaXAiLCJwYXJlbnQiLCJyZW1vdmVDbGFzcyIsIiR0aGlzIiwidmFsIiwicGFyc2VJbnQiLCJwcmV2IiwiaHRtbCIsImZvY3VzIiwic3RvcFByb3BhZ2F0aW9uIiwia2V5dXAiLCJ3aGljaCIsImJpbmQiLCJmbiIsInBhZ2luYXRpb24iLCJtZXRob2QiLCJjaGFyQXQiLCJhcHBseSIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJhcmd1bWVudHMiLCJfdHlwZW9mIiwiZXJyb3IiLCJqUXVlcnkiLCJmYWN0b3J5IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJ3aW5kb3ciLCJkb2N1bWVudCIsInVuZGVmaW5lZCIsIm1vZGFscyIsImdldEN1cnJlbnQiLCJzZWxlY3RDdXJyZW50Iiwic2VsZWN0ZWQiLCIkYmxvY2tlciIsInRvZ2dsZUNsYXNzIiwieXNwX21vZGFsIiwiZWwiLCJyZW1vdmUiLCJ0YXJnZXQiLCIkYm9keSIsImRlZmF1bHRzIiwiZG9GYWRlIiwiaXNOYU4iLCJmYWRlRHVyYXRpb24iLCJjbG9zZUV4aXN0aW5nIiwiaXNBY3RpdmUiLCJjbG9zZSIsInB1c2giLCJpcyIsImFuY2hvciIsInRlc3QiLCIkZWxtIiwib3BlbiIsIm1vZGFsIiwiZWxtIiwic2hvd1NwaW5uZXIiLCJ0cmlnZ2VyIiwiQUpBWF9TRU5EIiwiZ2V0IiwiZG9uZSIsIkFKQVhfU1VDQ0VTUyIsImN1cnJlbnQiLCJvbiIsIkNMT1NFIiwiaGlkZVNwaW5uZXIiLCJBSkFYX0NPTVBMRVRFIiwiZmFpbCIsIkFKQVhfRkFJTCIsInBvcCIsImNvbnN0cnVjdG9yIiwibSIsImJsb2NrIiwiYmx1ciIsInNldFRpbWVvdXQiLCJzaG93IiwiZmFkZURlbGF5Iiwib2ZmIiwiZXNjYXBlQ2xvc2UiLCJjbGlja0Nsb3NlIiwiZSIsInVuYmxvY2siLCJoaWRlIiwiQkVGT1JFX0JMT0NLIiwiX2N0eCIsImNzcyIsImJsb2NrZXJDbGFzcyIsImFuaW1hdGUiLCJvcGFjaXR5IiwiQkxPQ0siLCJub3ciLCJmYWRlT3V0IiwiY2hpbGRyZW4iLCJCRUZPUkVfT1BFTiIsInNob3dDbG9zZSIsImNsb3NlQnV0dG9uIiwiY2xvc2VDbGFzcyIsImNsb3NlVGV4dCIsIm1vZGFsQ2xhc3MiLCJkaXNwbGF5IiwiT1BFTiIsIkJFRk9SRV9DTE9TRSIsIl90aGlzIiwiQUZURVJfQ0xPU0UiLCJzcGlubmVyIiwic3Bpbm5lckh0bWwiLCIkYW5jaG9yIiwicHJldmVudERlZmF1bHQiLCJ0IiwiZGVmaW5lIiwiYW1kIiwibiIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsImNvbmNhdCIsInMiLCJyIiwiYSIsImMiLCJ1IiwibCIsImQiLCJoIiwiZiIsInAiLCJiIiwiZyIsInYiLCJ4IiwidyIsInkiLCJDIiwiTCIsIml0ZXJhdG9yIiwiVCIsImNvbXBvbmVudHNTZXJ2aWNlcyIsImNvcmUiLCJ0aHVtYnNSZW5kZXJEaXNwYXRjaGVyIiwiZWEiLCJsYSIsInN0YWdlSW5kZXhlcyIsInVpIiwieiIsImlzVGh1bWJpbmciLCJ1YyIsInN0aGMiLCJyZW5kZXJUaHVtYnNJZk5vdFlldEFuZEFsbFR5cGVzRGV0ZWN0ZWQiLCJ1bmxvYWRlZFRodW1ic0NvdW50IiwiYXBwZW5kVGh1bWJzTG9hZGVySWZOb3RZZXQiLCJkYyIsImh0c2MiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIlMiLCJhZGQiLCJBIiwiZWxlbWVudHMiLCJydW5BY3Rpb25zIiwidGh1bWJzQ29udGFpbmVyIiwiaW5uZXJXaWR0aCIsInRodW1ic1dyYXBwZXJzIiwib2Zmc2V0TGVmdCIsIm9mZnNldFdpZHRoIiwidGh1bWJzSW5uZXJXaWR0aCIsInJ1blRvVGhpblRodW1ic0FjdGlvbnMiLCJ0aHVtYnNUcmFuc2Zvcm0iLCJ0aHVtYnNJbm5lciIsInN0eWxlIiwidHJhbnNmb3JtIiwiSSIsImV2ZW50c0Rpc3BhdGNoZXIiLCJnbG9iYWxFdmVudHNDb250cm9sbGVyIiwic2Nyb2xsYmFyUmVjb21wZW5zb3IiLCJmcyIsInByb3BzIiwicXMiLCJzcyIsInRodW1ic1N3aXBpbmdQcm9wcyIsImlzTGlnaHRib3hGYWRpbmdPdXQiLCJjb250YWluZXIiLCJyZW1vdmVMaXN0ZW5lcnMiLCJleGl0RnVsbHNjcmVlbk9uQ2xvc2UiLCJpZnMiLCJ0cyIsImNsZWFyVGltZW91dCIsImRvY3VtZW50RWxlbWVudCIsInJlbW92ZVJlY29tcGVuc2UiLCJib2R5IiwicmVtb3ZlQ2hpbGQiLCJkaXNwYXRjaCIsIkUiLCJpc2wiLCJzbGlkZUNoYW5nZUFuaW1hdGlvbiIsInNhdyIsInNtdyIsInN0Iiwic3dzIiwicHJldmlvdXMiLCJuZXh0IiwibmUiLCJydW5KdW1wUmVmbG93ZWRBY3Rpb25zIiwiRiIsInNsaWRlQ2hhbmdlRmFjYWRlIiwic3NiIiwic3N4IiwidHJhbnNpdGlvbiIsIndpZHRoIiwic2xpZGVzaG93VGltZSIsImNoYW5nZVRvTmV4dCIsImRpc2FibGVTbGlkZXNob3dMb29wIiwic291cmNlcyIsInNzcyIsIk4iLCJrZXlzIiwiaHlwb3QiLCJzY3JlZW5YIiwic2NyZWVuWSIsImsiLCJwb2ludGVyaW5nQnVja2V0IiwienYiLCJzd2lwZWRYIiwicnVuU3dpcGluZ01vdmVBY3Rpb25zRm9yUHJvcHNBbmRFdmVudCIsImFwcGVuZENoaWxkIiwicGluY2hlZEh5cG90IiwiaW5uZXJIZWlnaHQiLCJ6cyIsImRvd25TY3JlZW5YIiwic3dpcGVkWSIsImRvd25TY3JlZW5ZIiwidXgiLCJ1eSIsIkIiLCJkc3MiLCJpc1BpbmNoaW5nIiwicGMiLCJXIiwiY2xpY2tab29tZXIiLCJzbGlkZUluZGV4Q2hhbmdlciIsImNoYW5nZVRvIiwiZ3giLCJneSIsInpvb21JbiIsInpvb21PdXQiLCJNIiwiSCIsImxpZ2h0Ym94Q2xvc2VyIiwiZGlzYWJsZUJhY2tncm91bmRDbG9zZSIsInN3YyIsInJ1blN3aXBpbmdUb3BBY3Rpb25zRm9yUHJvcHNBbmRFdmVudCIsInNkIiwiRCIsInBvaW50ZXJJZCIsIk8iLCJ0aHVtYnNDdXJzb3JlciIsIlAiLCJyZXNvbHZlIiwibGlzdGVuZXIiLCJSIiwidGh1bWJzVHJhbnNmb3JtVHJhbnNpdGlvbmVyIiwicnVuTm9Td2lwZUFjdGlvbnNGb3JFdmVudCIsImp1bXBUbyIsImNhbGxBY3Rpb25XaXRoVHJhbnNpdGlvbiIsInEiLCJYIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicXBzIiwiZGlzYWJsZVRodW1icyIsImRlbHRhWSIsIlkiLCJ0aHVtYnNUb2dnbGVyIiwibWlkZGxld2FyZSIsImNvZGUiLCJrZXkiLCJjaGFuZ2VUb1ByZXZpb3VzIiwidG9nZ2xlVGh1bWJzIiwiaiIsImNyZWF0ZUVsZW1lbnROUyIsInNldEF0dHJpYnV0ZU5TIiwiViIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJ0aXRsZSIsIlUiLCJvbmNsaWNrIiwiaGVpZ2h0Iiwidmlld0JveCIsIloiLCJuYXYiLCJjdXN0b21Ub29sYmFyQnV0dG9ucyIsInRvb2xiYXJCdXR0b25zIiwib25DbGljayIsInRodW1icyIsInNsaWRlc2hvdyIsInBhdXNlIiwiZmlyc3RDaGlsZCIsImZ1bGxzY3JlZW4iLCJlbnRlciIsImV4aXQiLCJvZnMiLCJ4ZnMiLCJzZXRTbGlkZU51bWJlciIsImlubmVySFRNTCIsImp1c3RpZnlDb250ZW50IiwiXyIsInBvaW50ZXJUeXBlIiwicnVuU3dpcGluZ0Rvd25BY3Rpb25zRm9yUHJvcHNBbmRFdmVudCIsIkoiLCJHIiwic2xpZGVEaXN0YW5jZSIsInJlbW92ZVByb3BlcnR5Iiwic2V3IiwiYWRkRXZlbnRMaXN0ZW5lciIsIksiLCJjYXB0aW9ucyIsInRjIiwiUSIsInNsaWRlQnV0dG9ucyIsInRvVXBwZXJDYXNlIiwiY3JlYXRlVGV4dE5vZGUiLCJoZWFkIiwidHQiLCJldCIsImdldFNvdXJjZVR5cGVGcm9tTG9jYWxTdG9yYWdlQnlVcmwiLCJoYW5kbGVSZWNlaXZlZFNvdXJjZVR5cGVGb3JVcmwiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImRpc2FibGVMb2NhbFN0b3JhZ2UiLCJwYXJzZSIsImdldEl0ZW0iLCJudCIsIm90IiwiaXQiLCJydCIsImF0IiwibWgiLCJtdyIsImN0IiwiaW5pdGlhbEFuaW1hdGlvbiIsInN6IiwidXQiLCJoYW5kbGVJbWFnZUxvYWQiLCJuYXR1cmFsV2lkdGgiLCJuYXR1cmFsSGVpZ2h0IiwiaGFuZGxlVmlkZW9Mb2FkIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwiaGFuZGxlTm90TWV0YURhdGVkVmlkZW9Mb2FkIiwiaGFuZGxlWW91dHViZUxvYWQiLCJtYXhZb3V0dWJlRGltZW5zaW9ucyIsImhhbmRsZUN1c3RvbUxvYWQiLCJvZmZzZXRIZWlnaHQiLCJsdCIsImN1c3RvbUF0dHJpYnV0ZXMiLCJzZXRBdHRyaWJ1dGUiLCJkdCIsImNvbGxlY3Rpb25zIiwic291cmNlTG9hZEhhbmRsZXJzIiwic3JjIiwib25sb2FkIiwiaHQiLCJvbmxvYWRlZG1ldGFkYXRhIiwiY29udHJvbHMiLCJmdCIsInNwbGl0IiwibWF0Y2giLCJhbGxvd0Z1bGxzY3JlZW4iLCJwdCIsIm10IiwiaXNTb3VyY2VMb2FkZWQiLCJidCIsInRodW1ic0ljb25zIiwiY2xvbmVOb2RlIiwiZ3QiLCJ0aHVtYkxvYWRIYW5kbGVyIiwiaGFuZGxlTG9hZCIsInZ0Iiwic2hvd1RodW1ic09uTW91bnQiLCJidWlsZFRodW1iRm9yVHlwZUFuZEluZGV4IiwiYWRkRnVuY3Rpb25Ub1RvQmVSZW5kZXJlZEF0SW5kZXgiLCJ4dCIsInNvdXJjZXNSZW5kZXJGdW5jdGlvbnMiLCJzb3VyY2VEaXNwbGF5RmFjYWRlIiwicnVuQWN0aW9uc0ZvclNvdXJjZVR5cGVBbmRJbmRleCIsImRpc3BsYXlTb3VyY2VzV2hpY2hTaG91bGRCZURpc3BsYXllZCIsInd0IiwidHlwZXMiLCJ0eXBlIiwiZ2V0VHlwZVNldEJ5Q2xpZW50Rm9ySW5kZXgiLCJyZXRyaWV2ZVR5cGVXaXRoWGhyRm9ySW5kZXgiLCJocmVmIiwiaG9zdG5hbWUiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJnZXRSZXNwb25zZUhlYWRlciIsImluZGV4T2YiLCJhYm9ydCIsInNlbmQiLCJ5dCIsImdldFByZXZpb3VzU2xpZGVJbmRleCIsImdldE5leHRTbGlkZUluZGV4IiwiQ3QiLCJsaWdodGJveE9wZW5lciIsImRpc2FibGVTbGlkZVN3aXBpbmciLCJzaG93VGh1bWJzV2l0aENhcHRpb25zIiwic2Nyb2xsYmFyV2lkdGgiLCJ2aXNpYmlsaXR5IiwibXNPdmVyZmxvd1N0eWxlIiwib3ZlcmZsb3ciLCJ0aHVtYmVkU291cmNlRW5oYW5jZW1lbnRXcmFwcGVyU2NhbGUiLCJ0aHVtYmVkU291cmNlRW5oYW5jZW1lbnRXcmFwcGVyVHJhbnNsYXRlWSIsInRodW1ic1N3aXBpbmdEb3duIiwidGh1bWJzVHJhbnNmb3JtZXIiLCJ0aHVtYnNDb21wb25lbnRzIiwiaGlkZVRodW1ic0xvYWRlciIsInRyYW5zZm9ybVRvQ3VycmVudCIsInRyYW5zZm9ybVRvQ3VycmVudFdpdGhUcmFuc2l0aW9uIiwiY2xhc3NGYWNhZGUiLCJyZW1vdmVGcm9tRWFjaEVsZW1lbnRDbGFzc0lmQ29udGFpbnMiLCJzdGFnZWRSZW1vdmFsQW5kT3V0c3RhZ2VkQWRkaW5nT2ZDbGFzc0lmQ29udGFpbnMiLCJ6b29tSW5jcmVtZW50IiwieHUiLCJoYyIsInNjIiwiZnVsbHNjcmVlbkVsZW1lbnQiLCJ3ZWJraXRJc0Z1bGxTY3JlZW4iLCJtb3pGdWxsU2NyZWVuIiwibXNGdWxsc2NyZWVuRWxlbWVudCIsInJlcXVlc3RGdWxsc2NyZWVuIiwibW96UmVxdWVzdEZ1bGxTY3JlZW4iLCJ3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiIsIm1zUmVxdWVzdEZ1bGxzY3JlZW4iLCJleGl0RnVsbHNjcmVlbiIsIm1vekNhbmNlbEZ1bGxTY3JlZW4iLCJ3ZWJraXRFeGl0RnVsbHNjcmVlbiIsIm1zRXhpdEZ1bGxzY3JlZW4iLCJhZGRMaXN0ZW5lcnMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiVUlGYWRlT3V0VGltZSIsInNsaWRlQnV0dG9uUHJldmlvdXMiLCJzbGlkZUJ1dHRvbk5leHQiLCJ6aCIsImFkZFJlY29tcGVuc2UiLCJtYXJnaW5SaWdodCIsImxvYWRPbmx5Q3VycmVudFNvdXJjZSIsImN1cnNvciIsInBhcnNlRmxvYXQiLCJ0b1ByZWNpc2lvbiIsIkx0IiwiVHQiLCJSZWZsZWN0IiwiY29uc3RydWN0IiwiRnVuY3Rpb24iLCJ6dCIsInNoYW0iLCJQcm94eSIsIkJvb2xlYW4iLCJ2YWx1ZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJTdCIsImlzQXJyYXkiLCJBdCIsImZyb20iLCJ0b1N0cmluZyIsIm5hbWUiLCJUeXBlRXJyb3IiLCJJdCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaGFzQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwiY29uc29sZSIsIndhcm4iLCJmc0xpZ2h0Ym94SW5zdGFuY2VzIiwiRnNMaWdodGJveCIsImdldEVsZW1lbnRCeUlkIiwic3Vic3RyaW5nIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0cmlidXRlcyIsInN1YnN0ciIsImZzTGlnaHRib3giLCJjdXN0b21DbGFzc2VzIiwidmlkZW9zUG9zdGVycyIsInVuc2hpZnQiLCJsaWdodGJveFVwZGF0ZXIiLCJzd2lwaW5nQWN0aW9uZXIiLCJyZWZyZXNoRnNMaWdodGJveCIsInJlYWR5IiwibG9nIiwiZGF0YV9tb2RhbCIsImNvcHlMaW5rIiwiY29weVRleHQiLCJzZWxlY3QiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImV4ZWNDb21tYW5kIiwiYWxlcnQiLCJTdHJpbmciLCJ0b0xvd2VyQ2FzZSIsIm1hcCIsImpvaW4iLCJlbnVtZXJhYmxlIiwicmFpeXNfZ2V0X2Zvcm1fZGF0YSIsImZvcm1fZWxlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImZkIiwiZnJvbUVudHJpZXMiLCJlbnRyaWVzIiwiX2kiLCJfT2JqZWN0JGVudHJpZXMiLCJfT2JqZWN0JGVudHJpZXMkX2kiLCJfc2xpY2VkVG9BcnJheSIsImZJbmRleCIsImZpZWxkIiwiVmFsQXJyYXkiLCJnZXRBbGwiLCJyYWl5c19zZXRfZm9ybV90b19kYXRhIiwiaW5wdXREYXRhIiwiZm9ybUEiLCJxdWVyeVNlbGVjdG9yIiwiZm9ybUIiLCJyZXNldCIsImZvcm1JbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZSIsImlucHV0IiwiaGFzUHJldHR5IiwiaFAiLCJjaGVja2VkIiwicmFpeXNfcHVzaF9oaXN0b3J5Iiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwic3RycGF0aCIsInByb3BlcnR5Iiwic2V0IiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJhaV95YWNodF9zeW5jIiwieWFjaHRfc2VhcmNoX3VybCIsInJhaV95c3BfYXBpIiwiY2FsbF9hcGkiLCJwYXRoIiwicGFzc2luZ19kYXRhIiwieGh0dHAiLCJQcm9taXNlIiwicmVqZWN0Iiwic3RhdHVzIiwicmVzcG9uc2VEYXRhIiwicmVzcG9uc2VUZXh0IiwiX3F1ZXN0aW9uTWFyayIsIndwX3Jlc3RfdXJsIiwic2V0UmVxdWVzdEhlYWRlciIsInlzcF90ZW1wbGF0ZXMiLCJ5YWNodCIsImdyaWQiLCJ2ZXNzZWwiLCJwYXJhbXMiLCJtZXRlcnMiLCJOb21pbmFsTGVuZ3RoIiwicHJpY2UiLCJldXJvcGVfb3B0aW9uX3BpY2tlZCIsInRvRml4ZWQiLCJZU1BfRXVyb1ZhbCIsIkludGwiLCJOdW1iZXJGb3JtYXQiLCJtaW5pbXVtRnJhY3Rpb25EaWdpdHMiLCJmb3JtYXQiLCJjdXJyZW5jeSIsIllTUF9VU0RWYWwiLCJfcG9zdElEIiwiRG9jdW1lbnRJRCIsIl9saW5rIiwiSW1hZ2VzIiwiVXJpIiwiYXNzZXRzX3VybCIsIkNvbXBhbnlOYW1lIiwiY29tcGFueV9uYW1lIiwiY29tcGFueV9sb2dvIiwiTW9kZWxZZWFyIiwiTWFrZVN0cmluZyIsIk1vZGVsIiwiQm9hdE5hbWUiLCJDYWJpbnNDb3VudE51bWVyaWMiLCJsaXN0IiwiUHJpY2UiLCJldXJvX2NfYyIsImNvbXBhcmVfcHJldmlldyIsIm5vUmVzdWx0cyIsInlhY2h0X3RhZyIsImxhYmVsIiwibmV4dF90ZXh0IiwicHJldl90ZXh0IiwiZWxlX3F1aWNrX3NlYXJjaCIsIkZpbGxPcHRpb25zIiwic2VsZWN0b3JFbGVtZW50cyIsImxhYmVscyIsInRoZW4iLCJyT3B0aW9ucyIsIl9sb29wIiwiU2VsZWN0b3JFbGUiLCJvcHRpb24iLCJVUkxSRUYiLCJVUkwiLCJsb2NhdGlvbiIsIlVybFZhbCIsInN0cnBhdGhzIiwicmVwbGFjZSIsInlhY2h0X3NlYXJjaF9wYWdlX2lkIiwicGF0aHMiLCJwcmV0dHlfdXJsX3BhdGhfcGFyYW1zIiwicGhhc2VfcGF0aCIsIm9ubHlfdmFscyIsImVhY2hXb3JkQ2FwaXRhbGl6ZSIsInlzcF9tYWtlU2VhcmNoVGFncyIsInRhZ3NFbGUiLCJ0ZSIsInlzcF90YWdzX25vdF9wcmludCIsIl9sb29wMiIsInBhcmFtS2V5IiwiaW5uZXJUZXh0IiwiZWxlSW5wdXQiLCJuZXdUYWdFbGUiLCJ0YWdWYWwiLCJzZWxlY3RlZEluZGV4IiwiZWxlVW5pdCIsInlzcFRhZ0VsZSIsImN1cnJlbnRUYXJnZXQiLCJpbnB1dEVsZXMiLCJlbGVJIiwiZm9ybSIsInJlcXVlc3RTdWJtaXQiLCJ5c3BfbWFya0xvdmVkVmVzc2VsIiwiZWxlX2NhcmQiLCJ5YWNodElkIiwiaGFzQ2xhc3MiLCJ5c3BfYWRkTG92ZWRWZXNzZWwiLCJ5c3BfcmVtb3ZlTG92ZWRWZXNzZWwiLCJ5c195YWNodHNfbG92ZWQiLCJsb3ZlZFZlc3NlbHMiLCJpbmRleGVkIiwic3BsaWNlIiwiWVNQX1Zlc3NlbENvbXBhcmVMaXN0IiwieXNwX3Jlc3RvcmVDb21wYXJlcyIsImNvbXBhcmVfcG9zdF9pZHMiLCJ5c3BfbWFrZUNvbXBhcmVMaW5rb3V0IiwieXNwX21ha2VDb21wYXJlVmVzc2VsIiwiY2hhbmdlIiwieXNwX2FkZFZlc3NlbFRvQ29tcGFyZUxpc3QiLCJ5c3BfcmVtb3ZlVmVzc2VsVG9Db21wYXJlTGlzdCIsImRhdGFfcmVzdWx0IiwicmVzdWx0cyIsIml0ZW0iLCJlbGVfcHJldmlldyIsInlzcEJlZm9yZVlhY2h0U2VhcmNoIiwiRXZlbnQiLCJ5c3BBZnRlcllhY2h0U2VhcmNoIiwieXNwQWZ0ZXJSZW5kZXJpbmdZYWNodCIsInlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlciIsIlNFTyIsImhlYWRpbmciLCJncHRfcCIsIm1heGltdW1TaWduaWZpY2FudERpZ2l0cyIsInRvdGFsIiwiY3VycmVudFVSTCIsImRvbnRfcHVzaCIsInZpZXciLCJ2ZXNzZWxJbmZvIiwicGFnZV9pbmRleCIsIlJlZ0V4cCIsImZvcm1EYXRhT2JqZWN0Iiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwiZGlzcGF0Y2hFdmVudCIsIkZpbGxMaXN0cyIsImxpc3RFbGVtZW50cyIsImxpc3ROZWVkZWRFbGVtZW50cyIsImlucHV0X2VsZSIsImxpc3RfaWQiLCJlbGVfbGlzdCIsIl9sb29wMyIsInlhY2h0U2VhcmNoQW5kUmVzdWx0cyIsIm9tc2UiLCJvdmVyZmxvd1kiLCJhcGlfZGF0YSIsImVsZVJlc2V0IiwiZWxlQ2hlY2siLCJlbGVWaWV3T3B0aW9uIiwiaW5wdXRfbmFtZSIsIm9ubHlfdmFsc19hcnJheSIsIm92IiwidXJsVmFsIiwiX2xvb3A0IiwibG92ZWRfeWFjaHRzIiwieXNfb25seV90aGVzZSIsIm1vYmlsZUZvcm0iLCJoYW5kbGVTdWJtaXQiLCJhcGlFbmRwb2ludCIsInN1Y2Nlc3NNZXNzYWdlIiwicGFyZW50RWxlbWVudCIsInlhY2h0Rm9ybXMiLCJmRWxlIiwiYnJva2VyRm9ybXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFBLFVBQUFBLENBQUEsRUFBQTtFQUVBLElBQUFDLE9BQUEsR0FBQTtJQUNBQyxJQUFBLEVBQUEsU0FBQUEsS0FBQUMsT0FBQSxFQUFBO01BQ0EsSUFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLE1BQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxXQUFBLEVBQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxjQUFBLEVBQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxXQUFBLEVBQUEsQ0FBQTtRQUNBQyxVQUFBLEVBQUEsSUFBQTtRQUNBQyxjQUFBLEVBQUEsUUFBQTtRQUNBQyxjQUFBLEVBQUEsRUFBQTtRQUNBQyxRQUFBLEVBQUEsTUFBQTtRQUNBQyxRQUFBLEVBQUEsTUFBQTtRQUNBQyxXQUFBLEVBQUEsVUFBQTtRQUNBQyxjQUFBLEVBQUEsSUFBQTtRQUNBQyxRQUFBLEVBQUEsYUFBQTtRQUNBQyxTQUFBLEVBQUEsRUFBQTtRQUNBQyxRQUFBLEVBQUEsRUFBQTtRQUNBQyxhQUFBLEVBQUEsSUFBQTtRQUNBQyxXQUFBLEVBQUEsS0FBQTtRQUNBQyxlQUFBLEVBQUEsS0FBQTtRQUNBQyxZQUFBLEVBQUEsSUFBQTtRQUNBQyxVQUFBLEVBQUEsSUFBQTtRQUNBQyxXQUFBLEVBQUEsU0FBQUEsWUFBQUMsVUFBQSxFQUFBQyxLQUFBLEVBQUE7VUFDQTtVQUNBO1FBQUEsQ0FDQTtRQUNBQyxNQUFBLEVBQUEsU0FBQUEsT0FBQSxFQUFBO1VBQ0E7UUFBQTtNQUVBLENBQUEsRUFBQTNCLE9BQUEsSUFBQSxDQUFBLENBQUEsQ0FBQTtNQUVBLElBQUE0QixJQUFBLEdBQUEsSUFBQTtNQUVBM0IsQ0FBQSxDQUFBSSxLQUFBLEdBQUFKLENBQUEsQ0FBQUksS0FBQSxHQUFBSixDQUFBLENBQUFJLEtBQUEsR0FBQXdCLElBQUEsQ0FBQUMsSUFBQSxDQUFBN0IsQ0FBQSxDQUFBRSxLQUFBLEdBQUFGLENBQUEsQ0FBQUcsV0FBQSxDQUFBLEdBQUF5QixJQUFBLENBQUFDLElBQUEsQ0FBQTdCLENBQUEsQ0FBQUUsS0FBQSxHQUFBRixDQUFBLENBQUFHLFdBQUEsQ0FBQSxHQUFBLENBQUE7TUFDQSxJQUFBSCxDQUFBLENBQUFPLFdBQUEsRUFDQVAsQ0FBQSxDQUFBTyxXQUFBLEdBQUFQLENBQUEsQ0FBQU8sV0FBQSxHQUFBLENBQUEsQ0FBQSxLQUVBUCxDQUFBLENBQUFPLFdBQUEsR0FBQSxDQUFBUCxDQUFBLENBQUFvQixlQUFBLEdBQUEsQ0FBQSxHQUFBcEIsQ0FBQSxDQUFBSSxLQUFBLEdBQUEsQ0FBQTtNQUNBSixDQUFBLENBQUE4QixhQUFBLEdBQUE5QixDQUFBLENBQUFLLGNBQUEsR0FBQSxDQUFBO01BRUEsSUFBQSxDQUFBMEIsSUFBQSxDQUFBLFlBQUE7UUFDQUosSUFBQSxDQUFBSyxRQUFBLENBQUFoQyxDQUFBLENBQUFlLFFBQUEsR0FBQSxvQkFBQSxDQUFBLENBQUFrQixJQUFBLENBQUEsWUFBQSxFQUFBakMsQ0FBQSxDQUFBO1FBQ0FILE9BQUEsQ0FBQXFDLEtBQUEsQ0FBQUMsSUFBQSxDQUFBUixJQUFBLENBQUE7TUFDQSxDQUFBLENBQUE7TUFFQTNCLENBQUEsQ0FBQTBCLE1BQUEsQ0FBQSxDQUFBO01BRUEsT0FBQSxJQUFBO0lBQ0EsQ0FBQTtJQUVBVSxVQUFBLEVBQUEsU0FBQUEsV0FBQUMsSUFBQSxFQUFBO01BQ0F4QyxPQUFBLENBQUF5QyxXQUFBLENBQUFILElBQUEsQ0FBQSxJQUFBLEVBQUFFLElBQUEsR0FBQSxDQUFBLENBQUE7TUFDQSxPQUFBLElBQUE7SUFDQSxDQUFBO0lBRUFFLFFBQUEsRUFBQSxTQUFBQSxTQUFBLEVBQUE7TUFDQSxJQUFBdkMsQ0FBQSxHQUFBLElBQUEsQ0FBQWlDLElBQUEsQ0FBQSxZQUFBLENBQUE7TUFDQSxJQUFBLENBQUFqQyxDQUFBLENBQUFvQixlQUFBLEVBQUE7UUFDQSxJQUFBcEIsQ0FBQSxDQUFBTyxXQUFBLEdBQUEsQ0FBQSxFQUFBO1VBQ0FWLE9BQUEsQ0FBQXlDLFdBQUEsQ0FBQUgsSUFBQSxDQUFBLElBQUEsRUFBQW5DLENBQUEsQ0FBQU8sV0FBQSxHQUFBLENBQUEsQ0FBQTtRQUNBO01BQ0EsQ0FBQSxNQUFBO1FBQ0EsSUFBQVAsQ0FBQSxDQUFBTyxXQUFBLEdBQUFQLENBQUEsQ0FBQUksS0FBQSxHQUFBLENBQUEsRUFBQTtVQUNBUCxPQUFBLENBQUF5QyxXQUFBLENBQUFILElBQUEsQ0FBQSxJQUFBLEVBQUFuQyxDQUFBLENBQUFPLFdBQUEsR0FBQSxDQUFBLENBQUE7UUFDQTtNQUNBO01BQ0EsT0FBQSxJQUFBO0lBQ0EsQ0FBQTtJQUVBaUMsUUFBQSxFQUFBLFNBQUFBLFNBQUEsRUFBQTtNQUNBLElBQUF4QyxDQUFBLEdBQUEsSUFBQSxDQUFBaUMsSUFBQSxDQUFBLFlBQUEsQ0FBQTtNQUNBLElBQUEsQ0FBQWpDLENBQUEsQ0FBQW9CLGVBQUEsRUFBQTtRQUNBLElBQUFwQixDQUFBLENBQUFPLFdBQUEsR0FBQVAsQ0FBQSxDQUFBSSxLQUFBLEdBQUEsQ0FBQSxFQUFBO1VBQ0FQLE9BQUEsQ0FBQXlDLFdBQUEsQ0FBQUgsSUFBQSxDQUFBLElBQUEsRUFBQW5DLENBQUEsQ0FBQU8sV0FBQSxHQUFBLENBQUEsQ0FBQTtRQUNBO01BQ0EsQ0FBQSxNQUFBO1FBQ0EsSUFBQVAsQ0FBQSxDQUFBTyxXQUFBLEdBQUEsQ0FBQSxFQUFBO1VBQ0FWLE9BQUEsQ0FBQXlDLFdBQUEsQ0FBQUgsSUFBQSxDQUFBLElBQUEsRUFBQW5DLENBQUEsQ0FBQU8sV0FBQSxHQUFBLENBQUEsQ0FBQTtRQUNBO01BQ0E7TUFDQSxPQUFBLElBQUE7SUFDQSxDQUFBO0lBRUFrQyxhQUFBLEVBQUEsU0FBQUEsY0FBQSxFQUFBO01BQ0EsT0FBQSxJQUFBLENBQUFSLElBQUEsQ0FBQSxZQUFBLENBQUEsQ0FBQTdCLEtBQUE7SUFDQSxDQUFBO0lBRUFzQyxhQUFBLEVBQUEsU0FBQUEsY0FBQUMsS0FBQSxFQUFBO01BQ0EsSUFBQSxDQUFBVixJQUFBLENBQUEsWUFBQSxDQUFBLENBQUE3QixLQUFBLEdBQUF1QyxLQUFBO0lBQ0EsQ0FBQTtJQUVBQyxjQUFBLEVBQUEsU0FBQUEsZUFBQSxFQUFBO01BQ0EsT0FBQSxJQUFBLENBQUFYLElBQUEsQ0FBQSxZQUFBLENBQUEsQ0FBQTFCLFdBQUEsR0FBQSxDQUFBO0lBQ0EsQ0FBQTtJQUVBc0MsT0FBQSxFQUFBLFNBQUFBLFFBQUEsRUFBQTtNQUNBLElBQUEsQ0FBQUMsS0FBQSxDQUFBLENBQUE7TUFDQSxPQUFBLElBQUE7SUFDQSxDQUFBO0lBRUFDLFFBQUEsRUFBQSxTQUFBQSxTQUFBVixJQUFBLEVBQUE7TUFDQSxJQUFBckMsQ0FBQSxHQUFBLElBQUEsQ0FBQWlDLElBQUEsQ0FBQSxZQUFBLENBQUE7TUFDQWpDLENBQUEsQ0FBQU8sV0FBQSxHQUFBOEIsSUFBQSxHQUFBLENBQUE7TUFDQSxJQUFBLENBQUFKLElBQUEsQ0FBQSxZQUFBLEVBQUFqQyxDQUFBLENBQUE7TUFDQUgsT0FBQSxDQUFBcUMsS0FBQSxDQUFBQyxJQUFBLENBQUEsSUFBQSxDQUFBO01BQ0EsT0FBQSxJQUFBO0lBQ0EsQ0FBQTtJQUVBYSxNQUFBLEVBQUEsU0FBQUEsT0FBQSxFQUFBO01BQ0FuRCxPQUFBLENBQUFxQyxLQUFBLENBQUFDLElBQUEsQ0FBQSxJQUFBLENBQUE7TUFDQSxPQUFBLElBQUE7SUFDQSxDQUFBO0lBRUFjLE9BQUEsRUFBQSxTQUFBQSxRQUFBLEVBQUE7TUFDQSxJQUFBakQsQ0FBQSxHQUFBLElBQUEsQ0FBQWlDLElBQUEsQ0FBQSxZQUFBLENBQUE7TUFDQWpDLENBQUEsQ0FBQWtELFFBQUEsR0FBQSxJQUFBO01BQ0EsSUFBQSxDQUFBakIsSUFBQSxDQUFBLFlBQUEsRUFBQWpDLENBQUEsQ0FBQTtNQUNBSCxPQUFBLENBQUFxQyxLQUFBLENBQUFDLElBQUEsQ0FBQSxJQUFBLENBQUE7TUFDQSxPQUFBLElBQUE7SUFDQSxDQUFBO0lBRUFnQixNQUFBLEVBQUEsU0FBQUEsT0FBQSxFQUFBO01BQ0EsSUFBQW5ELENBQUEsR0FBQSxJQUFBLENBQUFpQyxJQUFBLENBQUEsWUFBQSxDQUFBO01BQ0FqQyxDQUFBLENBQUFrRCxRQUFBLEdBQUEsS0FBQTtNQUNBLElBQUEsQ0FBQWpCLElBQUEsQ0FBQSxZQUFBLEVBQUFqQyxDQUFBLENBQUE7TUFDQUgsT0FBQSxDQUFBcUMsS0FBQSxDQUFBQyxJQUFBLENBQUEsSUFBQSxDQUFBO01BQ0EsT0FBQSxJQUFBO0lBQ0EsQ0FBQTtJQUVBaUIsV0FBQSxFQUFBLFNBQUFBLFlBQUFDLFFBQUEsRUFBQTtNQUNBLElBQUFyRCxDQUFBLEdBQUEsSUFBQSxDQUFBaUMsSUFBQSxDQUFBLFlBQUEsQ0FBQTtNQUNBakMsQ0FBQSxDQUFBRSxLQUFBLEdBQUFtRCxRQUFBO01BQ0FyRCxDQUFBLENBQUFJLEtBQUEsR0FBQVAsT0FBQSxDQUFBeUQsU0FBQSxDQUFBdEQsQ0FBQSxDQUFBO01BQ0EsSUFBQSxDQUFBaUMsSUFBQSxDQUFBLFlBQUEsRUFBQWpDLENBQUEsQ0FBQTtNQUNBSCxPQUFBLENBQUFxQyxLQUFBLENBQUFDLElBQUEsQ0FBQSxJQUFBLENBQUE7SUFDQSxDQUFBO0lBRUFvQixpQkFBQSxFQUFBLFNBQUFBLGtCQUFBcEQsV0FBQSxFQUFBO01BQ0EsSUFBQUgsQ0FBQSxHQUFBLElBQUEsQ0FBQWlDLElBQUEsQ0FBQSxZQUFBLENBQUE7TUFDQWpDLENBQUEsQ0FBQUcsV0FBQSxHQUFBQSxXQUFBO01BQ0FILENBQUEsQ0FBQUksS0FBQSxHQUFBUCxPQUFBLENBQUF5RCxTQUFBLENBQUF0RCxDQUFBLENBQUE7TUFDQSxJQUFBLENBQUFpQyxJQUFBLENBQUEsWUFBQSxFQUFBakMsQ0FBQSxDQUFBO01BQ0FILE9BQUEsQ0FBQXlDLFdBQUEsQ0FBQUgsSUFBQSxDQUFBLElBQUEsRUFBQSxDQUFBLENBQUE7TUFDQSxPQUFBLElBQUE7SUFDQSxDQUFBO0lBRUFxQixjQUFBLEVBQUEsU0FBQUEsZUFBQSxFQUFBO01BQ0EsT0FBQSxJQUFBLENBQUF2QixJQUFBLENBQUEsWUFBQSxDQUFBLENBQUE5QixXQUFBO0lBQ0EsQ0FBQTtJQUVBK0IsS0FBQSxFQUFBLFNBQUFBLE1BQUEsRUFBQTtNQUNBLElBQUFsQyxDQUFBLEdBQUEsSUFBQSxDQUFBaUMsSUFBQSxDQUFBLFlBQUEsQ0FBQTtRQUNBd0IsUUFBQSxHQUFBNUQsT0FBQSxDQUFBNkQsWUFBQSxDQUFBMUQsQ0FBQSxDQUFBO1FBQ0EyRCxDQUFBO1FBQ0FDLE9BQUE7TUFFQS9ELE9BQUEsQ0FBQWdELE9BQUEsQ0FBQVYsSUFBQSxDQUFBLElBQUEsQ0FBQTtNQUVBeUIsT0FBQSxHQUFBLE9BQUEsSUFBQSxDQUFBQyxJQUFBLEtBQUEsVUFBQSxHQUFBLElBQUEsQ0FBQUEsSUFBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQUMsSUFBQSxDQUFBLFNBQUEsQ0FBQTtNQUVBLElBQUFDLE1BQUEsR0FBQUgsT0FBQSxLQUFBLElBQUEsR0FBQSxJQUFBLEdBQUFoRSxDQUFBLENBQUEsS0FBQSxJQUFBSSxDQUFBLENBQUFnQixTQUFBLEdBQUEsVUFBQSxHQUFBaEIsQ0FBQSxDQUFBZ0IsU0FBQSxHQUFBLEdBQUEsR0FBQSxFQUFBLENBQUEsR0FBQSxRQUFBLENBQUEsQ0FBQWdELFFBQUEsQ0FBQSxJQUFBLENBQUE7O01BRUE7TUFDQSxJQUFBaEUsQ0FBQSxDQUFBVyxRQUFBLEVBQUE7UUFDQWQsT0FBQSxDQUFBb0UsV0FBQSxDQUFBOUIsSUFBQSxDQUFBLElBQUEsRUFBQSxDQUFBbkMsQ0FBQSxDQUFBb0IsZUFBQSxHQUFBcEIsQ0FBQSxDQUFBTyxXQUFBLEdBQUEsQ0FBQSxHQUFBUCxDQUFBLENBQUFPLFdBQUEsR0FBQSxDQUFBLEVBQUE7VUFBQTJELElBQUEsRUFBQWxFLENBQUEsQ0FBQVcsUUFBQTtVQUFBd0QsT0FBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBO01BQ0E7O01BRUE7TUFDQSxJQUFBbkUsQ0FBQSxDQUFBWSxRQUFBLElBQUFaLENBQUEsQ0FBQW1CLFdBQUEsRUFBQTtRQUNBdEIsT0FBQSxDQUFBb0UsV0FBQSxDQUFBOUIsSUFBQSxDQUFBLElBQUEsRUFBQSxDQUFBbkMsQ0FBQSxDQUFBb0IsZUFBQSxHQUFBcEIsQ0FBQSxDQUFBTyxXQUFBLEdBQUEsQ0FBQSxHQUFBUCxDQUFBLENBQUFPLFdBQUEsR0FBQSxDQUFBLEVBQUE7VUFBQTJELElBQUEsRUFBQWxFLENBQUEsQ0FBQVksUUFBQTtVQUFBdUQsT0FBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBO01BQ0E7O01BRUE7TUFDQSxJQUFBLENBQUFuRSxDQUFBLENBQUFvQixlQUFBLEVBQUE7UUFDQSxJQUFBcUMsUUFBQSxDQUFBVyxLQUFBLEdBQUEsQ0FBQSxJQUFBcEUsQ0FBQSxDQUFBTSxLQUFBLEdBQUEsQ0FBQSxFQUFBO1VBQ0EsSUFBQU4sQ0FBQSxDQUFBcUIsWUFBQSxFQUFBO1lBQ0EsSUFBQWdELEdBQUEsR0FBQXpDLElBQUEsQ0FBQTBDLEdBQUEsQ0FBQXRFLENBQUEsQ0FBQU0sS0FBQSxFQUFBbUQsUUFBQSxDQUFBVyxLQUFBLENBQUE7WUFDQSxLQUFBVCxDQUFBLEdBQUEsQ0FBQSxFQUFBQSxDQUFBLEdBQUFVLEdBQUEsRUFBQVYsQ0FBQSxFQUFBLEVBQUE7Y0FDQTlELE9BQUEsQ0FBQW9FLFdBQUEsQ0FBQTlCLElBQUEsQ0FBQSxJQUFBLEVBQUF3QixDQUFBLENBQUE7WUFDQTtVQUNBO1VBQ0EsSUFBQTNELENBQUEsQ0FBQU0sS0FBQSxHQUFBbUQsUUFBQSxDQUFBVyxLQUFBLElBQUFYLFFBQUEsQ0FBQVcsS0FBQSxHQUFBcEUsQ0FBQSxDQUFBTSxLQUFBLElBQUEsQ0FBQSxFQUFBO1lBQ0F5RCxNQUFBLENBQUFRLE1BQUEsQ0FBQSw2Q0FBQSxHQUFBdkUsQ0FBQSxDQUFBYSxXQUFBLEdBQUEsY0FBQSxDQUFBO1VBQ0EsQ0FBQSxNQUFBLElBQUE0QyxRQUFBLENBQUFXLEtBQUEsR0FBQXBFLENBQUEsQ0FBQU0sS0FBQSxJQUFBLENBQUEsRUFBQTtZQUNBVCxPQUFBLENBQUFvRSxXQUFBLENBQUE5QixJQUFBLENBQUEsSUFBQSxFQUFBbkMsQ0FBQSxDQUFBTSxLQUFBLENBQUE7VUFDQTtRQUNBO01BQ0EsQ0FBQSxNQUFBO1FBQ0EsSUFBQW1ELFFBQUEsQ0FBQVksR0FBQSxHQUFBckUsQ0FBQSxDQUFBSSxLQUFBLElBQUFKLENBQUEsQ0FBQU0sS0FBQSxHQUFBLENBQUEsRUFBQTtVQUNBLElBQUFOLENBQUEsQ0FBQXFCLFlBQUEsRUFBQTtZQUNBLElBQUFtRCxLQUFBLEdBQUE1QyxJQUFBLENBQUE2QyxHQUFBLENBQUF6RSxDQUFBLENBQUFJLEtBQUEsR0FBQUosQ0FBQSxDQUFBTSxLQUFBLEVBQUFtRCxRQUFBLENBQUFZLEdBQUEsQ0FBQTtZQUNBLEtBQUFWLENBQUEsR0FBQTNELENBQUEsQ0FBQUksS0FBQSxHQUFBLENBQUEsRUFBQXVELENBQUEsSUFBQWEsS0FBQSxFQUFBYixDQUFBLEVBQUEsRUFBQTtjQUNBOUQsT0FBQSxDQUFBb0UsV0FBQSxDQUFBOUIsSUFBQSxDQUFBLElBQUEsRUFBQXdCLENBQUEsQ0FBQTtZQUNBO1VBQ0E7VUFFQSxJQUFBM0QsQ0FBQSxDQUFBSSxLQUFBLEdBQUFKLENBQUEsQ0FBQU0sS0FBQSxHQUFBbUQsUUFBQSxDQUFBWSxHQUFBLElBQUFyRSxDQUFBLENBQUFJLEtBQUEsR0FBQUosQ0FBQSxDQUFBTSxLQUFBLEdBQUFtRCxRQUFBLENBQUFZLEdBQUEsSUFBQSxDQUFBLEVBQUE7WUFDQU4sTUFBQSxDQUFBUSxNQUFBLENBQUEsNkNBQUEsR0FBQXZFLENBQUEsQ0FBQWEsV0FBQSxHQUFBLGNBQUEsQ0FBQTtVQUNBLENBQUEsTUFBQSxJQUFBYixDQUFBLENBQUFJLEtBQUEsR0FBQUosQ0FBQSxDQUFBTSxLQUFBLEdBQUFtRCxRQUFBLENBQUFZLEdBQUEsSUFBQSxDQUFBLEVBQUE7WUFDQXhFLE9BQUEsQ0FBQW9FLFdBQUEsQ0FBQTlCLElBQUEsQ0FBQSxJQUFBLEVBQUFzQixRQUFBLENBQUFZLEdBQUEsQ0FBQTtVQUNBO1FBQ0E7TUFDQTs7TUFFQTtNQUNBLElBQUEsQ0FBQXJFLENBQUEsQ0FBQW9CLGVBQUEsRUFBQTtRQUNBLEtBQUF1QyxDQUFBLEdBQUFGLFFBQUEsQ0FBQVcsS0FBQSxFQUFBVCxDQUFBLEdBQUFGLFFBQUEsQ0FBQVksR0FBQSxFQUFBVixDQUFBLEVBQUEsRUFBQTtVQUNBOUQsT0FBQSxDQUFBb0UsV0FBQSxDQUFBOUIsSUFBQSxDQUFBLElBQUEsRUFBQXdCLENBQUEsQ0FBQTtRQUNBO01BQ0EsQ0FBQSxNQUFBO1FBQ0EsS0FBQUEsQ0FBQSxHQUFBRixRQUFBLENBQUFZLEdBQUEsR0FBQSxDQUFBLEVBQUFWLENBQUEsSUFBQUYsUUFBQSxDQUFBVyxLQUFBLEVBQUFULENBQUEsRUFBQSxFQUFBO1VBQ0E5RCxPQUFBLENBQUFvRSxXQUFBLENBQUE5QixJQUFBLENBQUEsSUFBQSxFQUFBd0IsQ0FBQSxDQUFBO1FBQ0E7TUFDQTs7TUFFQTtNQUNBLElBQUEsQ0FBQTNELENBQUEsQ0FBQW9CLGVBQUEsRUFBQTtRQUNBLElBQUFxQyxRQUFBLENBQUFZLEdBQUEsR0FBQXJFLENBQUEsQ0FBQUksS0FBQSxJQUFBSixDQUFBLENBQUFNLEtBQUEsR0FBQSxDQUFBLEVBQUE7VUFDQSxJQUFBTixDQUFBLENBQUFJLEtBQUEsR0FBQUosQ0FBQSxDQUFBTSxLQUFBLEdBQUFtRCxRQUFBLENBQUFZLEdBQUEsSUFBQXJFLENBQUEsQ0FBQUksS0FBQSxHQUFBSixDQUFBLENBQUFNLEtBQUEsR0FBQW1ELFFBQUEsQ0FBQVksR0FBQSxJQUFBLENBQUEsRUFBQTtZQUNBTixNQUFBLENBQUFRLE1BQUEsQ0FBQSw2Q0FBQSxHQUFBdkUsQ0FBQSxDQUFBYSxXQUFBLEdBQUEsY0FBQSxDQUFBO1VBQ0EsQ0FBQSxNQUFBLElBQUFiLENBQUEsQ0FBQUksS0FBQSxHQUFBSixDQUFBLENBQUFNLEtBQUEsR0FBQW1ELFFBQUEsQ0FBQVksR0FBQSxJQUFBLENBQUEsRUFBQTtZQUNBeEUsT0FBQSxDQUFBb0UsV0FBQSxDQUFBOUIsSUFBQSxDQUFBLElBQUEsRUFBQXNCLFFBQUEsQ0FBQVksR0FBQSxDQUFBO1VBQ0E7VUFDQSxJQUFBckUsQ0FBQSxDQUFBc0IsVUFBQSxFQUFBO1lBQ0EsSUFBQWtELEtBQUEsR0FBQTVDLElBQUEsQ0FBQTZDLEdBQUEsQ0FBQXpFLENBQUEsQ0FBQUksS0FBQSxHQUFBSixDQUFBLENBQUFNLEtBQUEsRUFBQW1ELFFBQUEsQ0FBQVksR0FBQSxDQUFBO1lBQ0EsS0FBQVYsQ0FBQSxHQUFBYSxLQUFBLEVBQUFiLENBQUEsR0FBQTNELENBQUEsQ0FBQUksS0FBQSxFQUFBdUQsQ0FBQSxFQUFBLEVBQUE7Y0FDQTlELE9BQUEsQ0FBQW9FLFdBQUEsQ0FBQTlCLElBQUEsQ0FBQSxJQUFBLEVBQUF3QixDQUFBLENBQUE7WUFDQTtVQUNBO1FBQ0E7TUFDQSxDQUFBLE1BQUE7UUFDQSxJQUFBRixRQUFBLENBQUFXLEtBQUEsR0FBQSxDQUFBLElBQUFwRSxDQUFBLENBQUFNLEtBQUEsR0FBQSxDQUFBLEVBQUE7VUFDQSxJQUFBTixDQUFBLENBQUFNLEtBQUEsR0FBQW1ELFFBQUEsQ0FBQVcsS0FBQSxJQUFBWCxRQUFBLENBQUFXLEtBQUEsR0FBQXBFLENBQUEsQ0FBQU0sS0FBQSxJQUFBLENBQUEsRUFBQTtZQUNBeUQsTUFBQSxDQUFBUSxNQUFBLENBQUEsNkNBQUEsR0FBQXZFLENBQUEsQ0FBQWEsV0FBQSxHQUFBLGNBQUEsQ0FBQTtVQUNBLENBQUEsTUFBQSxJQUFBNEMsUUFBQSxDQUFBVyxLQUFBLEdBQUFwRSxDQUFBLENBQUFNLEtBQUEsSUFBQSxDQUFBLEVBQUE7WUFDQVQsT0FBQSxDQUFBb0UsV0FBQSxDQUFBOUIsSUFBQSxDQUFBLElBQUEsRUFBQW5DLENBQUEsQ0FBQU0sS0FBQSxDQUFBO1VBQ0E7VUFFQSxJQUFBTixDQUFBLENBQUFzQixVQUFBLEVBQUE7WUFDQSxJQUFBK0MsR0FBQSxHQUFBekMsSUFBQSxDQUFBMEMsR0FBQSxDQUFBdEUsQ0FBQSxDQUFBTSxLQUFBLEVBQUFtRCxRQUFBLENBQUFXLEtBQUEsQ0FBQTtZQUNBLEtBQUFULENBQUEsR0FBQVUsR0FBQSxHQUFBLENBQUEsRUFBQVYsQ0FBQSxJQUFBLENBQUEsRUFBQUEsQ0FBQSxFQUFBLEVBQUE7Y0FDQTlELE9BQUEsQ0FBQW9FLFdBQUEsQ0FBQTlCLElBQUEsQ0FBQSxJQUFBLEVBQUF3QixDQUFBLENBQUE7WUFDQTtVQUNBO1FBQ0E7TUFDQTs7TUFFQTtNQUNBLElBQUEzRCxDQUFBLENBQUFZLFFBQUEsSUFBQSxDQUFBWixDQUFBLENBQUFtQixXQUFBLEVBQUE7UUFDQXRCLE9BQUEsQ0FBQW9FLFdBQUEsQ0FBQTlCLElBQUEsQ0FBQSxJQUFBLEVBQUEsQ0FBQW5DLENBQUEsQ0FBQW9CLGVBQUEsR0FBQXBCLENBQUEsQ0FBQU8sV0FBQSxHQUFBLENBQUEsR0FBQVAsQ0FBQSxDQUFBTyxXQUFBLEdBQUEsQ0FBQSxFQUFBO1VBQUEyRCxJQUFBLEVBQUFsRSxDQUFBLENBQUFZLFFBQUE7VUFBQXVELE9BQUEsRUFBQTtRQUFBLENBQUEsQ0FBQTtNQUNBO01BRUEsSUFBQW5FLENBQUEsQ0FBQWMsY0FBQSxJQUFBLENBQUFkLENBQUEsQ0FBQWtELFFBQUEsRUFBQTtRQUNBckQsT0FBQSxDQUFBNkUsYUFBQSxDQUFBdkMsSUFBQSxDQUFBLElBQUEsRUFBQTRCLE1BQUEsQ0FBQTtNQUNBO0lBRUEsQ0FBQTtJQUVBVCxTQUFBLEVBQUEsU0FBQUEsVUFBQXRELENBQUEsRUFBQTtNQUNBLElBQUFJLEtBQUEsR0FBQXdCLElBQUEsQ0FBQUMsSUFBQSxDQUFBN0IsQ0FBQSxDQUFBRSxLQUFBLEdBQUFGLENBQUEsQ0FBQUcsV0FBQSxDQUFBO01BQ0EsT0FBQUMsS0FBQSxJQUFBLENBQUE7SUFDQSxDQUFBO0lBRUFzRCxZQUFBLEVBQUEsU0FBQUEsYUFBQTFELENBQUEsRUFBQTtNQUNBLE9BQUE7UUFDQW9FLEtBQUEsRUFBQXhDLElBQUEsQ0FBQUMsSUFBQSxDQUFBN0IsQ0FBQSxDQUFBTyxXQUFBLEdBQUFQLENBQUEsQ0FBQThCLGFBQUEsR0FBQUYsSUFBQSxDQUFBNkMsR0FBQSxDQUFBN0MsSUFBQSxDQUFBMEMsR0FBQSxDQUFBdEUsQ0FBQSxDQUFBTyxXQUFBLEdBQUFQLENBQUEsQ0FBQThCLGFBQUEsRUFBQTlCLENBQUEsQ0FBQUksS0FBQSxHQUFBSixDQUFBLENBQUFLLGNBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQTtRQUNBZ0UsR0FBQSxFQUFBekMsSUFBQSxDQUFBQyxJQUFBLENBQUE3QixDQUFBLENBQUFPLFdBQUEsR0FBQVAsQ0FBQSxDQUFBOEIsYUFBQSxHQUFBRixJQUFBLENBQUEwQyxHQUFBLENBQUF0RSxDQUFBLENBQUFPLFdBQUEsR0FBQVAsQ0FBQSxDQUFBOEIsYUFBQSxFQUFBOUIsQ0FBQSxDQUFBSSxLQUFBLENBQUEsR0FBQXdCLElBQUEsQ0FBQTBDLEdBQUEsQ0FBQXRFLENBQUEsQ0FBQUssY0FBQSxFQUFBTCxDQUFBLENBQUFJLEtBQUEsQ0FBQTtNQUNBLENBQUE7SUFDQSxDQUFBO0lBRUE2RCxXQUFBLEVBQUEsU0FBQUEsWUFBQVUsU0FBQSxFQUFBQyxJQUFBLEVBQUE7TUFDQSxJQUFBakQsSUFBQSxHQUFBLElBQUE7UUFBQTVCLE9BQUE7UUFBQThFLEtBQUE7UUFBQTdFLENBQUEsR0FBQTJCLElBQUEsQ0FBQU0sSUFBQSxDQUFBLFlBQUEsQ0FBQTtRQUFBNkMsWUFBQSxHQUFBbEYsQ0FBQSxDQUFBLFdBQUEsQ0FBQTtRQUFBbUYsR0FBQSxHQUFBcEQsSUFBQSxDQUFBcUQsSUFBQSxDQUFBLElBQUEsQ0FBQTtNQUVBTCxTQUFBLEdBQUFBLFNBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBQSxTQUFBLEdBQUEzRSxDQUFBLENBQUFJLEtBQUEsR0FBQXVFLFNBQUEsR0FBQTNFLENBQUEsQ0FBQUksS0FBQSxHQUFBLENBQUE7TUFFQUwsT0FBQSxHQUFBO1FBQ0FtRSxJQUFBLEVBQUFTLFNBQUEsR0FBQSxDQUFBO1FBQ0FSLE9BQUEsRUFBQTtNQUNBLENBQUE7TUFFQSxJQUFBbkUsQ0FBQSxDQUFBaUIsUUFBQSxDQUFBZ0UsTUFBQSxJQUFBakYsQ0FBQSxDQUFBaUIsUUFBQSxDQUFBMEQsU0FBQSxDQUFBLEVBQUE7UUFDQTVFLE9BQUEsQ0FBQW1FLElBQUEsR0FBQWxFLENBQUEsQ0FBQWlCLFFBQUEsQ0FBQTBELFNBQUEsQ0FBQTtNQUNBO01BRUE1RSxPQUFBLEdBQUFILENBQUEsQ0FBQUssTUFBQSxDQUFBRixPQUFBLEVBQUE2RSxJQUFBLElBQUEsQ0FBQSxDQUFBLENBQUE7TUFFQSxJQUFBRCxTQUFBLElBQUEzRSxDQUFBLENBQUFPLFdBQUEsSUFBQVAsQ0FBQSxDQUFBa0QsUUFBQSxFQUFBO1FBQ0EsSUFBQWxELENBQUEsQ0FBQWtELFFBQUEsSUFBQW5ELE9BQUEsQ0FBQW9FLE9BQUEsS0FBQSxNQUFBLElBQUFwRSxPQUFBLENBQUFvRSxPQUFBLEtBQUEsTUFBQSxFQUFBO1VBQ0FXLFlBQUEsQ0FBQTlDLFFBQUEsQ0FBQSxVQUFBLENBQUE7UUFDQSxDQUFBLE1BQUE7VUFDQThDLFlBQUEsQ0FBQTlDLFFBQUEsQ0FBQSxRQUFBLENBQUE7UUFDQTtRQUNBNkMsS0FBQSxHQUFBakYsQ0FBQSxDQUFBLHdCQUFBLEdBQUFHLE9BQUEsQ0FBQW1FLElBQUEsR0FBQSxTQUFBLENBQUE7TUFDQSxDQUFBLE1BQUE7UUFDQSxJQUFBbEUsQ0FBQSxDQUFBUSxVQUFBLEVBQUE7VUFDQXFFLEtBQUEsR0FBQWpGLENBQUEsQ0FBQSxXQUFBLEdBQUFJLENBQUEsQ0FBQVMsY0FBQSxJQUFBa0UsU0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBM0UsQ0FBQSxDQUFBVSxjQUFBLEdBQUEsc0JBQUEsR0FBQVgsT0FBQSxDQUFBbUUsSUFBQSxHQUFBLE1BQUEsQ0FBQTtRQUNBLENBQUEsTUFBQTtVQUNBVyxLQUFBLEdBQUFqRixDQUFBLENBQUEsU0FBQSxHQUFBRyxPQUFBLENBQUFtRSxJQUFBLEdBQUEsU0FBQSxDQUFBO1FBQ0E7UUFDQVcsS0FBQSxDQUFBSyxLQUFBLENBQUEsVUFBQXpELEtBQUEsRUFBQTtVQUNBLE9BQUE1QixPQUFBLENBQUF5QyxXQUFBLENBQUFILElBQUEsQ0FBQVIsSUFBQSxFQUFBZ0QsU0FBQSxFQUFBbEQsS0FBQSxDQUFBO1FBQ0EsQ0FBQSxDQUFBO01BQ0E7TUFFQSxJQUFBMUIsT0FBQSxDQUFBb0UsT0FBQSxFQUFBO1FBQ0FVLEtBQUEsQ0FBQTdDLFFBQUEsQ0FBQWpDLE9BQUEsQ0FBQW9FLE9BQUEsQ0FBQTtNQUNBO01BRUFXLFlBQUEsQ0FBQVAsTUFBQSxDQUFBTSxLQUFBLENBQUE7TUFFQSxJQUFBRSxHQUFBLENBQUFFLE1BQUEsRUFBQTtRQUNBRixHQUFBLENBQUFSLE1BQUEsQ0FBQU8sWUFBQSxDQUFBO01BQ0EsQ0FBQSxNQUFBO1FBQ0FuRCxJQUFBLENBQUE0QyxNQUFBLENBQUFPLFlBQUEsQ0FBQTtNQUNBO0lBQ0EsQ0FBQTtJQUVBeEMsV0FBQSxFQUFBLFNBQUFBLFlBQUFxQyxTQUFBLEVBQUFsRCxLQUFBLEVBQUE7TUFDQSxJQUFBekIsQ0FBQSxHQUFBLElBQUEsQ0FBQWlDLElBQUEsQ0FBQSxZQUFBLENBQUE7TUFDQWpDLENBQUEsQ0FBQU8sV0FBQSxHQUFBb0UsU0FBQTtNQUNBLElBQUEzRSxDQUFBLENBQUFrQixhQUFBLEVBQUE7UUFDQXJCLE9BQUEsQ0FBQXFDLEtBQUEsQ0FBQUMsSUFBQSxDQUFBLElBQUEsQ0FBQTtNQUNBO01BQ0EsT0FBQW5DLENBQUEsQ0FBQXVCLFdBQUEsQ0FBQW9ELFNBQUEsR0FBQSxDQUFBLEVBQUFsRCxLQUFBLENBQUE7SUFDQSxDQUFBO0lBR0FpRCxhQUFBLEVBQUEsU0FBQUEsY0FBQVgsTUFBQSxFQUFBO01BQ0EsSUFBQXBDLElBQUEsR0FBQSxJQUFBO1FBQ0EzQixDQUFBLEdBQUEsSUFBQSxDQUFBaUMsSUFBQSxDQUFBLFlBQUEsQ0FBQTtRQUNBa0QsTUFBQSxHQUFBcEIsTUFBQSxDQUFBaUIsSUFBQSxDQUFBLFVBQUEsQ0FBQTtNQUNBRyxNQUFBLENBQUFuRCxRQUFBLENBQUEsV0FBQSxDQUFBLENBQUFvRCxNQUFBLENBQUEsQ0FBQSxDQUFBQyxXQUFBLENBQUEsVUFBQSxDQUFBO01BQ0FGLE1BQUEsQ0FBQUQsS0FBQSxDQUFBLFVBQUF6RCxLQUFBLEVBQUE7UUFDQSxJQUFBLENBQUF6QixDQUFBLENBQUFpRCxPQUFBLEVBQUE7VUFDQSxJQUFBcUMsS0FBQSxHQUFBMUYsQ0FBQSxDQUFBLElBQUEsQ0FBQTtZQUNBMkYsR0FBQSxHQUFBLENBQUFDLFFBQUEsQ0FBQUYsS0FBQSxDQUFBRixNQUFBLENBQUEsQ0FBQSxDQUFBSyxJQUFBLENBQUEsQ0FBQSxDQUFBdkIsSUFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQTtVQUNBb0IsS0FBQSxDQUNBSSxJQUFBLENBQUEsb0NBQUEsR0FBQTFGLENBQUEsQ0FBQUksS0FBQSxHQUFBLG9CQUFBLEdBQUFtRixHQUFBLEdBQUEsSUFBQSxDQUFBLENBQ0FQLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FDQVcsS0FBQSxDQUFBLENBQUEsQ0FDQVQsS0FBQSxDQUFBLFVBQUF6RCxLQUFBLEVBQUE7WUFDQTtZQUNBQSxLQUFBLENBQUFtRSxlQUFBLENBQUEsQ0FBQTtVQUNBLENBQUEsQ0FBQSxDQUNBQyxLQUFBLENBQUEsVUFBQXBFLEtBQUEsRUFBQTtZQUNBLElBQUE4RCxHQUFBLEdBQUEzRixDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEyRixHQUFBLENBQUEsQ0FBQTtZQUNBLElBQUE5RCxLQUFBLENBQUFxRSxLQUFBLEtBQUEsRUFBQSxJQUFBUCxHQUFBLEtBQUEsRUFBQSxFQUFBO2NBQ0E7Y0FDQSxJQUFBQSxHQUFBLEdBQUEsQ0FBQSxJQUFBQSxHQUFBLElBQUF2RixDQUFBLENBQUFJLEtBQUEsRUFDQVAsT0FBQSxDQUFBeUMsV0FBQSxDQUFBSCxJQUFBLENBQUFSLElBQUEsRUFBQTRELEdBQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxDQUFBLE1BQUEsSUFBQTlELEtBQUEsQ0FBQXFFLEtBQUEsS0FBQSxFQUFBLEVBQUE7Y0FDQTtjQUNBWCxNQUFBLENBQUFyQyxLQUFBLENBQUEsQ0FBQSxDQUFBNEMsSUFBQSxDQUFBMUYsQ0FBQSxDQUFBYSxXQUFBLENBQUE7WUFDQTtVQUNBLENBQUEsQ0FBQSxDQUNBa0YsSUFBQSxDQUFBLE1BQUEsRUFBQSxVQUFBdEUsS0FBQSxFQUFBO1lBQ0EsSUFBQThELEdBQUEsR0FBQTNGLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTJGLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsSUFBQUEsR0FBQSxLQUFBLEVBQUEsRUFBQTtjQUNBMUYsT0FBQSxDQUFBeUMsV0FBQSxDQUFBSCxJQUFBLENBQUFSLElBQUEsRUFBQTRELEdBQUEsR0FBQSxDQUFBLENBQUE7WUFDQTtZQUNBSixNQUFBLENBQUFyQyxLQUFBLENBQUEsQ0FBQSxDQUFBNEMsSUFBQSxDQUFBMUYsQ0FBQSxDQUFBYSxXQUFBLENBQUE7WUFDQSxPQUFBLEtBQUE7VUFDQSxDQUFBLENBQUE7UUFDQTtRQUNBLE9BQUEsS0FBQTtNQUNBLENBQUEsQ0FBQTtJQUNBO0VBRUEsQ0FBQTtFQUVBakIsQ0FBQSxDQUFBb0csRUFBQSxDQUFBQyxVQUFBLEdBQUEsVUFBQUMsTUFBQSxFQUFBO0lBRUE7SUFDQSxJQUFBckcsT0FBQSxDQUFBcUcsTUFBQSxDQUFBLElBQUFBLE1BQUEsQ0FBQUMsTUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsRUFBQTtNQUNBLE9BQUF0RyxPQUFBLENBQUFxRyxNQUFBLENBQUEsQ0FBQUUsS0FBQSxDQUFBLElBQUEsRUFBQUMsS0FBQSxDQUFBQyxTQUFBLENBQUFDLEtBQUEsQ0FBQXBFLElBQUEsQ0FBQXFFLFNBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQTtJQUNBLENBQUEsTUFBQSxJQUFBQyxPQUFBLENBQUFQLE1BQUEsTUFBQSxRQUFBLElBQUEsQ0FBQUEsTUFBQSxFQUFBO01BQ0EsT0FBQXJHLE9BQUEsQ0FBQUMsSUFBQSxDQUFBc0csS0FBQSxDQUFBLElBQUEsRUFBQUksU0FBQSxDQUFBO0lBQ0EsQ0FBQSxNQUFBO01BQ0E1RyxDQUFBLENBQUE4RyxLQUFBLENBQUEsU0FBQSxHQUFBUixNQUFBLEdBQUEsc0NBQUEsQ0FBQTtJQUNBO0VBRUEsQ0FBQTtBQUVBLENBQUEsRUFBQVMsTUFBQSxDQUFBO0FDN1lBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQUFDLE9BQUEsRUFBQTtFQUNBO0VBQ0E7RUFDQSxJQUFBLFFBQUFDLE1BQUEsaUNBQUFKLE9BQUEsQ0FBQUksTUFBQSxPQUFBLFFBQUEsSUFBQUosT0FBQSxDQUFBSSxNQUFBLENBQUFDLE9BQUEsTUFBQSxRQUFBLEVBQUE7SUFDQUYsT0FBQSxDQUFBRyxPQUFBLENBQUEsUUFBQSxDQUFBLEVBQUFDLE1BQUEsRUFBQUMsUUFBQSxDQUFBO0VBQ0EsQ0FBQSxNQUNBO0lBQ0FMLE9BQUEsQ0FBQUQsTUFBQSxFQUFBSyxNQUFBLEVBQUFDLFFBQUEsQ0FBQTtFQUNBO0FBQ0EsQ0FBQSxFQUFBLFVBQUFySCxDQUFBLEVBQUFvSCxNQUFBLEVBQUFDLFFBQUEsRUFBQUMsU0FBQSxFQUFBO0VBRUEsSUFBQUMsTUFBQSxHQUFBLEVBQUE7SUFDQUMsVUFBQSxHQUFBLFNBQUFBLFVBQUFBLENBQUEsRUFBQTtNQUNBLE9BQUFELE1BQUEsQ0FBQWxDLE1BQUEsR0FBQWtDLE1BQUEsQ0FBQUEsTUFBQSxDQUFBbEMsTUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLElBQUE7SUFDQSxDQUFBO0lBQ0FvQyxhQUFBLEdBQUEsU0FBQUEsYUFBQUEsQ0FBQSxFQUFBO01BQ0EsSUFBQTFELENBQUE7UUFDQTJELFFBQUEsR0FBQSxLQUFBO01BQ0EsS0FBQTNELENBQUEsR0FBQXdELE1BQUEsQ0FBQWxDLE1BQUEsR0FBQSxDQUFBLEVBQUF0QixDQUFBLElBQUEsQ0FBQSxFQUFBQSxDQUFBLEVBQUEsRUFBQTtRQUNBLElBQUF3RCxNQUFBLENBQUF4RCxDQUFBLENBQUEsQ0FBQTRELFFBQUEsRUFBQTtVQUNBSixNQUFBLENBQUF4RCxDQUFBLENBQUEsQ0FBQTRELFFBQUEsQ0FBQUMsV0FBQSxDQUFBLFNBQUEsRUFBQSxDQUFBRixRQUFBLENBQUEsQ0FBQUUsV0FBQSxDQUFBLFFBQUEsRUFBQUYsUUFBQSxDQUFBO1VBQ0FBLFFBQUEsR0FBQSxJQUFBO1FBQ0E7TUFDQTtJQUNBLENBQUE7RUFFQTFILENBQUEsQ0FBQTZILFNBQUEsR0FBQSxVQUFBQyxFQUFBLEVBQUEzSCxPQUFBLEVBQUE7SUFDQSxJQUFBNEgsTUFBQSxFQUFBQyxNQUFBO0lBQ0EsSUFBQSxDQUFBQyxLQUFBLEdBQUFqSSxDQUFBLENBQUEsTUFBQSxDQUFBO0lBQ0EsSUFBQSxDQUFBRyxPQUFBLEdBQUFILENBQUEsQ0FBQUssTUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBTCxDQUFBLENBQUE2SCxTQUFBLENBQUFLLFFBQUEsRUFBQS9ILE9BQUEsQ0FBQTtJQUNBLElBQUEsQ0FBQUEsT0FBQSxDQUFBZ0ksTUFBQSxHQUFBLENBQUFDLEtBQUEsQ0FBQXhDLFFBQUEsQ0FBQSxJQUFBLENBQUF6RixPQUFBLENBQUFrSSxZQUFBLEVBQUEsRUFBQSxDQUFBLENBQUE7SUFDQSxJQUFBLENBQUFWLFFBQUEsR0FBQSxJQUFBO0lBQ0EsSUFBQSxJQUFBLENBQUF4SCxPQUFBLENBQUFtSSxhQUFBLEVBQ0EsT0FBQXRJLENBQUEsQ0FBQTZILFNBQUEsQ0FBQVUsUUFBQSxDQUFBLENBQUEsRUFDQXZJLENBQUEsQ0FBQTZILFNBQUEsQ0FBQVcsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0lBQ0FqQixNQUFBLENBQUFrQixJQUFBLENBQUEsSUFBQSxDQUFBO0lBQ0EsSUFBQVgsRUFBQSxDQUFBWSxFQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7TUFDQVYsTUFBQSxHQUFBRixFQUFBLENBQUE1RCxJQUFBLENBQUEsTUFBQSxDQUFBO01BQ0EsSUFBQSxDQUFBeUUsTUFBQSxHQUFBYixFQUFBO01BQ0E7TUFDQSxJQUFBLElBQUEsQ0FBQWMsSUFBQSxDQUFBWixNQUFBLENBQUEsRUFBQTtRQUNBLElBQUEsQ0FBQWEsSUFBQSxHQUFBN0ksQ0FBQSxDQUFBZ0ksTUFBQSxDQUFBO1FBQ0EsSUFBQSxJQUFBLENBQUFhLElBQUEsQ0FBQXhELE1BQUEsS0FBQSxDQUFBLEVBQUEsT0FBQSxJQUFBO1FBQ0EsSUFBQSxDQUFBNEMsS0FBQSxDQUFBdEQsTUFBQSxDQUFBLElBQUEsQ0FBQWtFLElBQUEsQ0FBQTtRQUNBLElBQUEsQ0FBQUMsSUFBQSxDQUFBLENBQUE7UUFDQTtNQUNBLENBQUEsTUFBQTtRQUNBLElBQUEsQ0FBQUQsSUFBQSxHQUFBN0ksQ0FBQSxDQUFBLE9BQUEsQ0FBQTtRQUNBLElBQUEsQ0FBQWlJLEtBQUEsQ0FBQXRELE1BQUEsQ0FBQSxJQUFBLENBQUFrRSxJQUFBLENBQUE7UUFDQWQsTUFBQSxHQUFBLFNBQUFBLE9BQUFsRyxLQUFBLEVBQUFrSCxLQUFBLEVBQUE7VUFBQUEsS0FBQSxDQUFBQyxHQUFBLENBQUFqQixNQUFBLENBQUEsQ0FBQTtRQUFBLENBQUE7UUFDQSxJQUFBLENBQUFrQixXQUFBLENBQUEsQ0FBQTtRQUNBbkIsRUFBQSxDQUFBb0IsT0FBQSxDQUFBbEosQ0FBQSxDQUFBNkgsU0FBQSxDQUFBc0IsU0FBQSxDQUFBO1FBQ0FuSixDQUFBLENBQUFvSixHQUFBLENBQUFwQixNQUFBLENBQUEsQ0FBQXFCLElBQUEsQ0FBQSxVQUFBdkQsSUFBQSxFQUFBO1VBQ0EsSUFBQSxDQUFBOUYsQ0FBQSxDQUFBNkgsU0FBQSxDQUFBVSxRQUFBLENBQUEsQ0FBQSxFQUFBO1VBQ0FULEVBQUEsQ0FBQW9CLE9BQUEsQ0FBQWxKLENBQUEsQ0FBQTZILFNBQUEsQ0FBQXlCLFlBQUEsQ0FBQTtVQUNBLElBQUFDLE9BQUEsR0FBQS9CLFVBQUEsQ0FBQSxDQUFBO1VBQ0ErQixPQUFBLENBQUFWLElBQUEsQ0FBQTNGLEtBQUEsQ0FBQSxDQUFBLENBQUF5QixNQUFBLENBQUFtQixJQUFBLENBQUEsQ0FBQTBELEVBQUEsQ0FBQXhKLENBQUEsQ0FBQTZILFNBQUEsQ0FBQTRCLEtBQUEsRUFBQTFCLE1BQUEsQ0FBQTtVQUNBd0IsT0FBQSxDQUFBRyxXQUFBLENBQUEsQ0FBQTtVQUNBSCxPQUFBLENBQUFULElBQUEsQ0FBQSxDQUFBO1VBQ0FoQixFQUFBLENBQUFvQixPQUFBLENBQUFsSixDQUFBLENBQUE2SCxTQUFBLENBQUE4QixhQUFBLENBQUE7UUFDQSxDQUFBLENBQUEsQ0FBQUMsSUFBQSxDQUFBLFlBQUE7VUFDQTlCLEVBQUEsQ0FBQW9CLE9BQUEsQ0FBQWxKLENBQUEsQ0FBQTZILFNBQUEsQ0FBQWdDLFNBQUEsQ0FBQTtVQUNBLElBQUFOLE9BQUEsR0FBQS9CLFVBQUEsQ0FBQSxDQUFBO1VBQ0ErQixPQUFBLENBQUFHLFdBQUEsQ0FBQSxDQUFBO1VBQ0FuQyxNQUFBLENBQUF1QyxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7VUFDQWhDLEVBQUEsQ0FBQW9CLE9BQUEsQ0FBQWxKLENBQUEsQ0FBQTZILFNBQUEsQ0FBQThCLGFBQUEsQ0FBQTtRQUNBLENBQUEsQ0FBQTtNQUNBO0lBQ0EsQ0FBQSxNQUFBO01BQ0EsSUFBQSxDQUFBZCxJQUFBLEdBQUFmLEVBQUE7TUFDQSxJQUFBLENBQUFhLE1BQUEsR0FBQWIsRUFBQTtNQUNBLElBQUEsQ0FBQUcsS0FBQSxDQUFBdEQsTUFBQSxDQUFBLElBQUEsQ0FBQWtFLElBQUEsQ0FBQTtNQUNBLElBQUEsQ0FBQUMsSUFBQSxDQUFBLENBQUE7SUFDQTtFQUNBLENBQUE7RUFFQTlJLENBQUEsQ0FBQTZILFNBQUEsQ0FBQW5CLFNBQUEsR0FBQTtJQUNBcUQsV0FBQSxFQUFBL0osQ0FBQSxDQUFBNkgsU0FBQTtJQUVBaUIsSUFBQSxFQUFBLFNBQUFBLEtBQUEsRUFBQTtNQUNBLElBQUFrQixDQUFBLEdBQUEsSUFBQTtNQUNBLElBQUEsQ0FBQUMsS0FBQSxDQUFBLENBQUE7TUFDQSxJQUFBLENBQUF0QixNQUFBLENBQUF1QixJQUFBLENBQUEsQ0FBQTtNQUNBLElBQUEsSUFBQSxDQUFBL0osT0FBQSxDQUFBZ0ksTUFBQSxFQUFBO1FBQ0FnQyxVQUFBLENBQUEsWUFBQTtVQUNBSCxDQUFBLENBQUFJLElBQUEsQ0FBQSxDQUFBO1FBQ0EsQ0FBQSxFQUFBLElBQUEsQ0FBQWpLLE9BQUEsQ0FBQWtJLFlBQUEsR0FBQSxJQUFBLENBQUFsSSxPQUFBLENBQUFrSyxTQUFBLENBQUE7TUFDQSxDQUFBLE1BQUE7UUFDQSxJQUFBLENBQUFELElBQUEsQ0FBQSxDQUFBO01BQ0E7TUFDQXBLLENBQUEsQ0FBQXFILFFBQUEsQ0FBQSxDQUFBaUQsR0FBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBZCxFQUFBLENBQUEsZUFBQSxFQUFBLFVBQUEzSCxLQUFBLEVBQUE7UUFDQSxJQUFBMEgsT0FBQSxHQUFBL0IsVUFBQSxDQUFBLENBQUE7UUFDQSxJQUFBM0YsS0FBQSxDQUFBcUUsS0FBQSxLQUFBLEVBQUEsSUFBQXFELE9BQUEsQ0FBQXBKLE9BQUEsQ0FBQW9LLFdBQUEsRUFBQWhCLE9BQUEsQ0FBQWYsS0FBQSxDQUFBLENBQUE7TUFDQSxDQUFBLENBQUE7TUFDQSxJQUFBLElBQUEsQ0FBQXJJLE9BQUEsQ0FBQXFLLFVBQUEsRUFDQSxJQUFBLENBQUE3QyxRQUFBLENBQUFyQyxLQUFBLENBQUEsVUFBQW1GLENBQUEsRUFBQTtRQUNBLElBQUFBLENBQUEsQ0FBQXpDLE1BQUEsS0FBQSxJQUFBLEVBQ0FoSSxDQUFBLENBQUE2SCxTQUFBLENBQUFXLEtBQUEsQ0FBQSxDQUFBO01BQ0EsQ0FBQSxDQUFBO0lBQ0EsQ0FBQTtJQUVBQSxLQUFBLEVBQUEsU0FBQUEsTUFBQSxFQUFBO01BQ0FqQixNQUFBLENBQUF1QyxHQUFBLENBQUEsQ0FBQTtNQUNBLElBQUEsQ0FBQVksT0FBQSxDQUFBLENBQUE7TUFDQSxJQUFBLENBQUFDLElBQUEsQ0FBQSxDQUFBO01BQ0EsSUFBQSxDQUFBM0ssQ0FBQSxDQUFBNkgsU0FBQSxDQUFBVSxRQUFBLENBQUEsQ0FBQSxFQUNBdkksQ0FBQSxDQUFBcUgsUUFBQSxDQUFBLENBQUFpRCxHQUFBLENBQUEsZUFBQSxDQUFBO0lBQ0EsQ0FBQTtJQUVBTCxLQUFBLEVBQUEsU0FBQUEsTUFBQSxFQUFBO01BQ0EsSUFBQSxDQUFBcEIsSUFBQSxDQUFBSyxPQUFBLENBQUFsSixDQUFBLENBQUE2SCxTQUFBLENBQUErQyxZQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUFDLElBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtNQUNBLElBQUEsQ0FBQTVDLEtBQUEsQ0FBQTZDLEdBQUEsQ0FBQSxVQUFBLEVBQUEsUUFBQSxDQUFBO01BQ0EsSUFBQSxDQUFBbkQsUUFBQSxHQUFBM0gsQ0FBQSxDQUFBLGNBQUEsR0FBQSxJQUFBLENBQUFHLE9BQUEsQ0FBQTRLLFlBQUEsR0FBQSwwQkFBQSxDQUFBLENBQUEzRyxRQUFBLENBQUEsSUFBQSxDQUFBNkQsS0FBQSxDQUFBO01BQ0FSLGFBQUEsQ0FBQSxDQUFBO01BQ0EsSUFBQSxJQUFBLENBQUF0SCxPQUFBLENBQUFnSSxNQUFBLEVBQUE7UUFDQSxJQUFBLENBQUFSLFFBQUEsQ0FBQW1ELEdBQUEsQ0FBQSxTQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUFFLE9BQUEsQ0FBQTtVQUFBQyxPQUFBLEVBQUE7UUFBQSxDQUFBLEVBQUEsSUFBQSxDQUFBOUssT0FBQSxDQUFBa0ksWUFBQSxDQUFBO01BQ0E7TUFDQSxJQUFBLENBQUFRLElBQUEsQ0FBQUssT0FBQSxDQUFBbEosQ0FBQSxDQUFBNkgsU0FBQSxDQUFBcUQsS0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBTCxJQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7SUFDQSxDQUFBO0lBRUFILE9BQUEsRUFBQSxTQUFBQSxRQUFBUyxHQUFBLEVBQUE7TUFDQSxJQUFBLENBQUFBLEdBQUEsSUFBQSxJQUFBLENBQUFoTCxPQUFBLENBQUFnSSxNQUFBLEVBQ0EsSUFBQSxDQUFBUixRQUFBLENBQUF5RCxPQUFBLENBQUEsSUFBQSxDQUFBakwsT0FBQSxDQUFBa0ksWUFBQSxFQUFBLElBQUEsQ0FBQXFDLE9BQUEsQ0FBQXZFLElBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxLQUNBO1FBQ0EsSUFBQSxDQUFBd0IsUUFBQSxDQUFBMEQsUUFBQSxDQUFBLENBQUEsQ0FBQWpILFFBQUEsQ0FBQSxJQUFBLENBQUE2RCxLQUFBLENBQUE7UUFDQSxJQUFBLENBQUFOLFFBQUEsQ0FBQUksTUFBQSxDQUFBLENBQUE7UUFDQSxJQUFBLENBQUFKLFFBQUEsR0FBQSxJQUFBO1FBQ0FGLGFBQUEsQ0FBQSxDQUFBO1FBQ0EsSUFBQSxDQUFBekgsQ0FBQSxDQUFBNkgsU0FBQSxDQUFBVSxRQUFBLENBQUEsQ0FBQSxFQUNBLElBQUEsQ0FBQU4sS0FBQSxDQUFBNkMsR0FBQSxDQUFBLFVBQUEsRUFBQSxFQUFBLENBQUE7TUFDQTtJQUNBLENBQUE7SUFFQVYsSUFBQSxFQUFBLFNBQUFBLEtBQUEsRUFBQTtNQUNBLElBQUEsQ0FBQXZCLElBQUEsQ0FBQUssT0FBQSxDQUFBbEosQ0FBQSxDQUFBNkgsU0FBQSxDQUFBeUQsV0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBVCxJQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7TUFDQSxJQUFBLElBQUEsQ0FBQTFLLE9BQUEsQ0FBQW9MLFNBQUEsRUFBQTtRQUNBLElBQUEsQ0FBQUMsV0FBQSxHQUFBeEwsQ0FBQSxDQUFBLDhEQUFBLEdBQUEsSUFBQSxDQUFBRyxPQUFBLENBQUFzTCxVQUFBLEdBQUEsSUFBQSxHQUFBLElBQUEsQ0FBQXRMLE9BQUEsQ0FBQXVMLFNBQUEsR0FBQSxNQUFBLENBQUE7UUFDQSxJQUFBLENBQUE3QyxJQUFBLENBQUFsRSxNQUFBLENBQUEsSUFBQSxDQUFBNkcsV0FBQSxDQUFBO01BQ0E7TUFDQSxJQUFBLENBQUEzQyxJQUFBLENBQUF6RyxRQUFBLENBQUEsSUFBQSxDQUFBakMsT0FBQSxDQUFBd0wsVUFBQSxDQUFBLENBQUF2SCxRQUFBLENBQUEsSUFBQSxDQUFBdUQsUUFBQSxDQUFBO01BQ0EsSUFBQSxJQUFBLENBQUF4SCxPQUFBLENBQUFnSSxNQUFBLEVBQUE7UUFDQSxJQUFBLENBQUFVLElBQUEsQ0FBQWlDLEdBQUEsQ0FBQTtVQUFBRyxPQUFBLEVBQUEsQ0FBQTtVQUFBVyxPQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQVosT0FBQSxDQUFBO1VBQUFDLE9BQUEsRUFBQTtRQUFBLENBQUEsRUFBQSxJQUFBLENBQUE5SyxPQUFBLENBQUFrSSxZQUFBLENBQUE7TUFDQSxDQUFBLE1BQUE7UUFDQSxJQUFBLENBQUFRLElBQUEsQ0FBQWlDLEdBQUEsQ0FBQSxTQUFBLEVBQUEsY0FBQSxDQUFBO01BQ0E7TUFDQSxJQUFBLENBQUFqQyxJQUFBLENBQUFLLE9BQUEsQ0FBQWxKLENBQUEsQ0FBQTZILFNBQUEsQ0FBQWdFLElBQUEsRUFBQSxDQUFBLElBQUEsQ0FBQWhCLElBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtJQUNBLENBQUE7SUFFQUYsSUFBQSxFQUFBLFNBQUFBLEtBQUEsRUFBQTtNQUNBLElBQUEsQ0FBQTlCLElBQUEsQ0FBQUssT0FBQSxDQUFBbEosQ0FBQSxDQUFBNkgsU0FBQSxDQUFBaUUsWUFBQSxFQUFBLENBQUEsSUFBQSxDQUFBakIsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO01BQ0EsSUFBQSxJQUFBLENBQUFXLFdBQUEsRUFBQSxJQUFBLENBQUFBLFdBQUEsQ0FBQXpELE1BQUEsQ0FBQSxDQUFBO01BQ0EsSUFBQWdFLEtBQUEsR0FBQSxJQUFBO01BQ0EsSUFBQSxJQUFBLENBQUE1TCxPQUFBLENBQUFnSSxNQUFBLEVBQUE7UUFDQSxJQUFBLENBQUFVLElBQUEsQ0FBQXVDLE9BQUEsQ0FBQSxJQUFBLENBQUFqTCxPQUFBLENBQUFrSSxZQUFBLEVBQUEsWUFBQTtVQUNBMEQsS0FBQSxDQUFBbEQsSUFBQSxDQUFBSyxPQUFBLENBQUFsSixDQUFBLENBQUE2SCxTQUFBLENBQUFtRSxXQUFBLEVBQUEsQ0FBQUQsS0FBQSxDQUFBbEIsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO1FBQ0EsQ0FBQSxDQUFBO01BQ0EsQ0FBQSxNQUFBO1FBQ0EsSUFBQSxDQUFBaEMsSUFBQSxDQUFBOEIsSUFBQSxDQUFBLENBQUEsRUFBQSxZQUFBO1VBQ0FvQixLQUFBLENBQUFsRCxJQUFBLENBQUFLLE9BQUEsQ0FBQWxKLENBQUEsQ0FBQTZILFNBQUEsQ0FBQW1FLFdBQUEsRUFBQSxDQUFBRCxLQUFBLENBQUFsQixJQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7UUFDQSxDQUFBLENBQUE7TUFDQTtNQUNBLElBQUEsQ0FBQWhDLElBQUEsQ0FBQUssT0FBQSxDQUFBbEosQ0FBQSxDQUFBNkgsU0FBQSxDQUFBNEIsS0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBb0IsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0lBQ0EsQ0FBQTtJQUVBNUIsV0FBQSxFQUFBLFNBQUFBLFlBQUEsRUFBQTtNQUNBLElBQUEsQ0FBQSxJQUFBLENBQUE5SSxPQUFBLENBQUE4SSxXQUFBLEVBQUE7TUFDQSxJQUFBLENBQUFnRCxPQUFBLEdBQUEsSUFBQSxDQUFBQSxPQUFBLElBQUFqTSxDQUFBLENBQUEsY0FBQSxHQUFBLElBQUEsQ0FBQUcsT0FBQSxDQUFBd0wsVUFBQSxHQUFBLGtCQUFBLENBQUEsQ0FDQWhILE1BQUEsQ0FBQSxJQUFBLENBQUF4RSxPQUFBLENBQUErTCxXQUFBLENBQUE7TUFDQSxJQUFBLENBQUFqRSxLQUFBLENBQUF0RCxNQUFBLENBQUEsSUFBQSxDQUFBc0gsT0FBQSxDQUFBO01BQ0EsSUFBQSxDQUFBQSxPQUFBLENBQUE3QixJQUFBLENBQUEsQ0FBQTtJQUNBLENBQUE7SUFFQVYsV0FBQSxFQUFBLFNBQUFBLFlBQUEsRUFBQTtNQUNBLElBQUEsSUFBQSxDQUFBdUMsT0FBQSxFQUFBLElBQUEsQ0FBQUEsT0FBQSxDQUFBbEUsTUFBQSxDQUFBLENBQUE7SUFDQSxDQUFBO0lBRUE7SUFDQThDLElBQUEsRUFBQSxTQUFBQSxLQUFBLEVBQUE7TUFDQSxPQUFBO1FBQUE3QixHQUFBLEVBQUEsSUFBQSxDQUFBSCxJQUFBO1FBQUFBLElBQUEsRUFBQSxJQUFBLENBQUFBLElBQUE7UUFBQWxCLFFBQUEsRUFBQSxJQUFBLENBQUFBLFFBQUE7UUFBQXhILE9BQUEsRUFBQSxJQUFBLENBQUFBLE9BQUE7UUFBQWdNLE9BQUEsRUFBQSxJQUFBLENBQUF4RDtNQUFBLENBQUE7SUFDQTtFQUNBLENBQUE7RUFFQTNJLENBQUEsQ0FBQTZILFNBQUEsQ0FBQVcsS0FBQSxHQUFBLFVBQUEzRyxLQUFBLEVBQUE7SUFDQSxJQUFBLENBQUE3QixDQUFBLENBQUE2SCxTQUFBLENBQUFVLFFBQUEsQ0FBQSxDQUFBLEVBQUE7SUFDQSxJQUFBMUcsS0FBQSxFQUFBQSxLQUFBLENBQUF1SyxjQUFBLENBQUEsQ0FBQTtJQUNBLElBQUE3QyxPQUFBLEdBQUEvQixVQUFBLENBQUEsQ0FBQTtJQUNBK0IsT0FBQSxDQUFBZixLQUFBLENBQUEsQ0FBQTtJQUNBLE9BQUFlLE9BQUEsQ0FBQVYsSUFBQTtFQUNBLENBQUE7O0VBRUE7RUFDQTdJLENBQUEsQ0FBQTZILFNBQUEsQ0FBQVUsUUFBQSxHQUFBLFlBQUE7SUFDQSxPQUFBaEIsTUFBQSxDQUFBbEMsTUFBQSxHQUFBLENBQUE7RUFDQSxDQUFBO0VBRUFyRixDQUFBLENBQUE2SCxTQUFBLENBQUFMLFVBQUEsR0FBQUEsVUFBQTtFQUVBeEgsQ0FBQSxDQUFBNkgsU0FBQSxDQUFBSyxRQUFBLEdBQUE7SUFDQUksYUFBQSxFQUFBLElBQUE7SUFDQWlDLFdBQUEsRUFBQSxJQUFBO0lBQ0FDLFVBQUEsRUFBQSxJQUFBO0lBQ0FrQixTQUFBLEVBQUEsT0FBQTtJQUNBRCxVQUFBLEVBQUEsRUFBQTtJQUNBRSxVQUFBLEVBQUEsV0FBQTtJQUNBWixZQUFBLEVBQUEsY0FBQTtJQUNBbUIsV0FBQSxFQUFBLHNHQUFBO0lBQ0FqRCxXQUFBLEVBQUEsSUFBQTtJQUNBc0MsU0FBQSxFQUFBLElBQUE7SUFDQWxELFlBQUEsRUFBQSxJQUFBO0lBQUE7SUFDQWdDLFNBQUEsRUFBQSxHQUFBLENBQUE7RUFDQSxDQUFBOztFQUVBO0VBQ0FySyxDQUFBLENBQUE2SCxTQUFBLENBQUErQyxZQUFBLEdBQUEsb0JBQUE7RUFDQTVLLENBQUEsQ0FBQTZILFNBQUEsQ0FBQXFELEtBQUEsR0FBQSxhQUFBO0VBQ0FsTCxDQUFBLENBQUE2SCxTQUFBLENBQUF5RCxXQUFBLEdBQUEsbUJBQUE7RUFDQXRMLENBQUEsQ0FBQTZILFNBQUEsQ0FBQWdFLElBQUEsR0FBQSxZQUFBO0VBQ0E3TCxDQUFBLENBQUE2SCxTQUFBLENBQUFpRSxZQUFBLEdBQUEsb0JBQUE7RUFDQTlMLENBQUEsQ0FBQTZILFNBQUEsQ0FBQTRCLEtBQUEsR0FBQSxhQUFBO0VBQ0F6SixDQUFBLENBQUE2SCxTQUFBLENBQUFtRSxXQUFBLEdBQUEsbUJBQUE7RUFDQWhNLENBQUEsQ0FBQTZILFNBQUEsQ0FBQXNCLFNBQUEsR0FBQSxpQkFBQTtFQUNBbkosQ0FBQSxDQUFBNkgsU0FBQSxDQUFBeUIsWUFBQSxHQUFBLG9CQUFBO0VBQ0F0SixDQUFBLENBQUE2SCxTQUFBLENBQUFnQyxTQUFBLEdBQUEsaUJBQUE7RUFDQTdKLENBQUEsQ0FBQTZILFNBQUEsQ0FBQThCLGFBQUEsR0FBQSxxQkFBQTtFQUVBM0osQ0FBQSxDQUFBb0csRUFBQSxDQUFBeUIsU0FBQSxHQUFBLFVBQUExSCxPQUFBLEVBQUE7SUFDQSxJQUFBLElBQUEsQ0FBQWtGLE1BQUEsS0FBQSxDQUFBLEVBQUE7TUFDQSxJQUFBckYsQ0FBQSxDQUFBNkgsU0FBQSxDQUFBLElBQUEsRUFBQTFILE9BQUEsQ0FBQTtJQUNBO0lBQ0EsT0FBQSxJQUFBO0VBQ0EsQ0FBQTs7RUFFQTtFQUNBSCxDQUFBLENBQUFxSCxRQUFBLENBQUEsQ0FBQW1DLEVBQUEsQ0FBQSxhQUFBLEVBQUEsdUJBQUEsRUFBQXhKLENBQUEsQ0FBQTZILFNBQUEsQ0FBQVcsS0FBQSxDQUFBO0VBQ0F4SSxDQUFBLENBQUFxSCxRQUFBLENBQUEsQ0FBQW1DLEVBQUEsQ0FBQSxhQUFBLEVBQUEsc0JBQUEsRUFBQSxVQUFBM0gsS0FBQSxFQUFBO0lBQ0FBLEtBQUEsQ0FBQXVLLGNBQUEsQ0FBQSxDQUFBO0lBQ0FwTSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUErSSxLQUFBLENBQUEsQ0FBQTtFQUNBLENBQUEsQ0FBQTtBQUNBLENBQUEsQ0FBQTtBQ25QQSxDQUFBLFVBQUFzRCxDQUFBLEVBQUE1QixDQUFBLEVBQUE7RUFBQSxJQUFBLFFBQUEsWUFBQXZELE9BQUEsaUNBQUFMLE9BQUEsQ0FBQUssT0FBQSxNQUFBLFFBQUEsWUFBQUQsTUFBQSxpQ0FBQUosT0FBQSxDQUFBSSxNQUFBLElBQUFBLE1BQUEsQ0FBQUMsT0FBQSxHQUFBdUQsQ0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLElBQUEsVUFBQSxJQUFBLE9BQUE2QixNQUFBLElBQUFBLE1BQUEsQ0FBQUMsR0FBQSxFQUFBRCxNQUFBLENBQUEsRUFBQSxFQUFBN0IsQ0FBQSxDQUFBLENBQUEsS0FBQTtJQUFBLElBQUErQixDQUFBLEdBQUEvQixDQUFBLENBQUEsQ0FBQTtJQUFBLEtBQUEsSUFBQXJLLENBQUEsSUFBQW9NLENBQUEsRUFBQSxDQUFBLFFBQUEsWUFBQXRGLE9BQUEsaUNBQUFMLE9BQUEsQ0FBQUssT0FBQSxLQUFBQSxPQUFBLEdBQUFtRixDQUFBLEVBQUFqTSxDQUFBLENBQUEsR0FBQW9NLENBQUEsQ0FBQXBNLENBQUEsQ0FBQTtFQUFBO0FBQUEsQ0FBQSxDQUFBMkIsSUFBQSxFQUFBO0VBQUEsT0FBQSxZQUFBO0lBQUEsWUFBQTs7SUFBQSxJQUFBc0ssQ0FBQSxHQUFBLENBQUEsQ0FBQTtJQUFBLENBQUEsVUFBQUEsQ0FBQSxFQUFBO01BQUEsV0FBQSxJQUFBLE9BQUFJLE1BQUEsSUFBQUEsTUFBQSxDQUFBQyxXQUFBLElBQUFDLE1BQUEsQ0FBQUMsY0FBQSxDQUFBUCxDQUFBLEVBQUFJLE1BQUEsQ0FBQUMsV0FBQSxFQUFBO1FBQUFHLEtBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxFQUFBRixNQUFBLENBQUFDLGNBQUEsQ0FBQVAsQ0FBQSxFQUFBLFlBQUEsRUFBQTtRQUFBUSxLQUFBLEVBQUEsQ0FBQTtNQUFBLENBQUEsQ0FBQTtJQUFBLENBQUEsRUFBQVIsQ0FBQSxDQUFBO0lBQUEsSUFBQTVCLENBQUE7TUFBQStCLENBQUEsR0FBQSxhQUFBO01BQUF6SSxDQUFBLEdBQUEsRUFBQSxDQUFBK0ksTUFBQSxDQUFBTixDQUFBLEVBQUEsUUFBQSxDQUFBO01BQUFPLENBQUEsR0FBQSxFQUFBLENBQUFELE1BQUEsQ0FBQU4sQ0FBQSxFQUFBLGdCQUFBLENBQUE7TUFBQVEsQ0FBQSxHQUFBLEVBQUEsQ0FBQUYsTUFBQSxDQUFBTixDQUFBLEVBQUEsZUFBQSxDQUFBO01BQUFTLENBQUEsR0FBQSxFQUFBLENBQUFILE1BQUEsQ0FBQU4sQ0FBQSxFQUFBLE1BQUEsQ0FBQTtNQUFBVSxDQUFBLEdBQUEsRUFBQSxDQUFBSixNQUFBLENBQUFOLENBQUEsRUFBQSxXQUFBLENBQUE7TUFBQVcsQ0FBQSxHQUFBLEVBQUEsQ0FBQUwsTUFBQSxDQUFBTixDQUFBLEVBQUEsV0FBQSxDQUFBO01BQUFZLENBQUEsR0FBQSxFQUFBLENBQUFOLE1BQUEsQ0FBQU4sQ0FBQSxFQUFBLFdBQUEsQ0FBQTtNQUFBYSxDQUFBLEdBQUEsRUFBQSxDQUFBUCxNQUFBLENBQUFNLENBQUEsRUFBQSxZQUFBLENBQUE7TUFBQUUsQ0FBQSxHQUFBLEVBQUEsQ0FBQVIsTUFBQSxDQUFBTixDQUFBLEVBQUEsU0FBQSxDQUFBO01BQUFlLENBQUEsR0FBQSxFQUFBLENBQUFULE1BQUEsQ0FBQU4sQ0FBQSxFQUFBLFVBQUEsQ0FBQTtNQUFBZ0IsQ0FBQSxHQUFBRixDQUFBLEdBQUEsU0FBQTtNQUFBdEQsQ0FBQSxHQUFBdUQsQ0FBQSxHQUFBLFNBQUE7TUFBQUUsQ0FBQSxJQUFBLEVBQUEsQ0FBQVgsTUFBQSxDQUFBTixDQUFBLEVBQUEsU0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBTSxNQUFBLENBQUFOLENBQUEsRUFBQSxPQUFBLENBQUEsQ0FBQTtNQUFBa0IsQ0FBQSxHQUFBRCxDQUFBLEdBQUEsR0FBQTtNQUFBRSxDQUFBLEdBQUEsRUFBQSxDQUFBYixNQUFBLENBQUFZLENBQUEsRUFBQSxTQUFBLENBQUE7TUFBQUUsQ0FBQSxHQUFBLEVBQUEsQ0FBQWQsTUFBQSxDQUFBWSxDQUFBLEVBQUEsV0FBQSxDQUFBO01BQUFHLENBQUEsR0FBQSxFQUFBLENBQUFmLE1BQUEsQ0FBQVksQ0FBQSxFQUFBLFFBQUEsQ0FBQTtNQUFB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QUFBIiwiZmlsZSI6Imdsb2JhbFBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiAvKipcbiogc2ltcGxlUGFnaW5hdGlvbi5qcyB2MS42XG4qIEEgc2ltcGxlIGpRdWVyeSBwYWdpbmF0aW9uIHBsdWdpbi5cbiogaHR0cDovL2ZsYXZpdXNtYXRpcy5naXRodWIuY29tL3NpbXBsZVBhZ2luYXRpb24uanMvXG4qXG4qIENvcHlyaWdodCAyMDEyLCBGbGF2aXVzIE1hdGlzXG4qIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiogaHR0cDovL2ZsYXZpdXNtYXRpcy5naXRodWIuY29tL2xpY2Vuc2UuaHRtbFxuKi9cblxuKGZ1bmN0aW9uKCQpe1xuXG5cdHZhciBtZXRob2RzID0ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0XHRcdHZhciBvID0gJC5leHRlbmQoe1xuXHRcdFx0XHRpdGVtczogMSxcblx0XHRcdFx0aXRlbXNPblBhZ2U6IDEsXG5cdFx0XHRcdHBhZ2VzOiAwLFxuXHRcdFx0XHRkaXNwbGF5ZWRQYWdlczogNSxcblx0XHRcdFx0ZWRnZXM6IDIsXG5cdFx0XHRcdGN1cnJlbnRQYWdlOiAwLFxuXHRcdFx0XHR1c2VBbmNob3JzOiB0cnVlLFxuXHRcdFx0XHRocmVmVGV4dFByZWZpeDogJyNwYWdlLScsXG5cdFx0XHRcdGhyZWZUZXh0U3VmZml4OiAnJyxcblx0XHRcdFx0cHJldlRleHQ6ICdQcmV2Jyxcblx0XHRcdFx0bmV4dFRleHQ6ICdOZXh0Jyxcblx0XHRcdFx0ZWxsaXBzZVRleHQ6ICcmaGVsbGlwOycsXG5cdFx0XHRcdGVsbGlwc2VQYWdlU2V0OiB0cnVlLFxuXHRcdFx0XHRjc3NTdHlsZTogJ2xpZ2h0LXRoZW1lJyxcblx0XHRcdFx0bGlzdFN0eWxlOiAnJyxcblx0XHRcdFx0bGFiZWxNYXA6IFtdLFxuXHRcdFx0XHRzZWxlY3RPbkNsaWNrOiB0cnVlLFxuXHRcdFx0XHRuZXh0QXRGcm9udDogZmFsc2UsXG5cdFx0XHRcdGludmVydFBhZ2VPcmRlcjogZmFsc2UsXG5cdFx0XHRcdHVzZVN0YXJ0RWRnZSA6IHRydWUsXG5cdFx0XHRcdHVzZUVuZEVkZ2UgOiB0cnVlLFxuXHRcdFx0XHRvblBhZ2VDbGljazogZnVuY3Rpb24ocGFnZU51bWJlciwgZXZlbnQpIHtcblx0XHRcdFx0XHQvLyBDYWxsYmFjayB0cmlnZ2VyZWQgd2hlbiBhIHBhZ2UgaXMgY2xpY2tlZFxuXHRcdFx0XHRcdC8vIFBhZ2UgbnVtYmVyIGlzIGdpdmVuIGFzIGFuIG9wdGlvbmFsIHBhcmFtZXRlclxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbkluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdC8vIENhbGxiYWNrIHRyaWdnZXJlZCBpbW1lZGlhdGVseSBhZnRlciBpbml0aWFsaXphdGlvblxuXHRcdFx0XHR9XG5cdFx0XHR9LCBvcHRpb25zIHx8IHt9KTtcblxuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0XHRvLnBhZ2VzID0gby5wYWdlcyA/IG8ucGFnZXMgOiBNYXRoLmNlaWwoby5pdGVtcyAvIG8uaXRlbXNPblBhZ2UpID8gTWF0aC5jZWlsKG8uaXRlbXMgLyBvLml0ZW1zT25QYWdlKSA6IDE7XG5cdFx0XHRpZiAoby5jdXJyZW50UGFnZSlcblx0XHRcdFx0by5jdXJyZW50UGFnZSA9IG8uY3VycmVudFBhZ2UgLSAxO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRvLmN1cnJlbnRQYWdlID0gIW8uaW52ZXJ0UGFnZU9yZGVyID8gMCA6IG8ucGFnZXMgLSAxO1xuXHRcdFx0by5oYWxmRGlzcGxheWVkID0gby5kaXNwbGF5ZWRQYWdlcyAvIDI7XG5cblx0XHRcdHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5hZGRDbGFzcyhvLmNzc1N0eWxlICsgJyBzaW1wbGUtcGFnaW5hdGlvbicpLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHNlbGYpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG8ub25Jbml0KCk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRzZWxlY3RQYWdlOiBmdW5jdGlvbihwYWdlKSB7XG5cdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgcGFnZSAtIDEpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHByZXZQYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlID4gMCkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlIC0gMSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlIDwgby5wYWdlcyAtIDEpIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0bmV4dFBhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPCBvLnBhZ2VzIC0gMSkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlICsgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlID4gMCkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlIC0gMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRnZXRQYWdlc0NvdW50OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5wYWdlcztcblx0XHR9LFxuXG5cdFx0c2V0UGFnZXNDb3VudDogZnVuY3Rpb24oY291bnQpIHtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLnBhZ2VzID0gY291bnQ7XG5cdFx0fSxcblxuXHRcdGdldEN1cnJlbnRQYWdlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJykuY3VycmVudFBhZ2UgKyAxO1xuXHRcdH0sXG5cblx0XHRkZXN0cm95OiBmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5lbXB0eSgpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGRyYXdQYWdlOiBmdW5jdGlvbiAocGFnZSkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uY3VycmVudFBhZ2UgPSBwYWdlIC0gMTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHJlZHJhdzogZnVuY3Rpb24oKXtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRkaXNhYmxlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0ZW5hYmxlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZUl0ZW1zOiBmdW5jdGlvbiAobmV3SXRlbXMpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLml0ZW1zID0gbmV3SXRlbXM7XG5cdFx0XHRvLnBhZ2VzID0gbWV0aG9kcy5fZ2V0UGFnZXMobyk7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHR9LFxuXG5cdFx0dXBkYXRlSXRlbXNPblBhZ2U6IGZ1bmN0aW9uIChpdGVtc09uUGFnZSkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uaXRlbXNPblBhZ2UgPSBpdGVtc09uUGFnZTtcblx0XHRcdG8ucGFnZXMgPSBtZXRob2RzLl9nZXRQYWdlcyhvKTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIDApO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGdldEl0ZW1zT25QYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5pdGVtc09uUGFnZTtcblx0XHR9LFxuXG5cdFx0X2RyYXc6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyXHRvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyksXG5cdFx0XHRcdGludGVydmFsID0gbWV0aG9kcy5fZ2V0SW50ZXJ2YWwobyksXG5cdFx0XHRcdGksXG5cdFx0XHRcdHRhZ05hbWU7XG5cblx0XHRcdG1ldGhvZHMuZGVzdHJveS5jYWxsKHRoaXMpO1xuXG5cdFx0XHR0YWdOYW1lID0gKHR5cGVvZiB0aGlzLnByb3AgPT09ICdmdW5jdGlvbicpID8gdGhpcy5wcm9wKCd0YWdOYW1lJykgOiB0aGlzLmF0dHIoJ3RhZ05hbWUnKTtcblxuXHRcdFx0dmFyICRwYW5lbCA9IHRhZ05hbWUgPT09ICdVTCcgPyB0aGlzIDogJCgnPHVsJyArIChvLmxpc3RTdHlsZSA/ICcgY2xhc3M9XCInICsgby5saXN0U3R5bGUgKyAnXCInIDogJycpICsgJz48L3VsPicpLmFwcGVuZFRvKHRoaXMpO1xuXG5cdFx0XHQvLyBHZW5lcmF0ZSBQcmV2IGxpbmtcblx0XHRcdGlmIChvLnByZXZUZXh0KSB7XG5cdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCAhby5pbnZlcnRQYWdlT3JkZXIgPyBvLmN1cnJlbnRQYWdlIC0gMSA6IG8uY3VycmVudFBhZ2UgKyAxLCB7dGV4dDogby5wcmV2VGV4dCwgY2xhc3NlczogJ3ByZXYnfSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIE5leHQgbGluayAoaWYgb3B0aW9uIHNldCBmb3IgYXQgZnJvbnQpXG5cdFx0XHRpZiAoby5uZXh0VGV4dCAmJiBvLm5leHRBdEZyb250KSB7XG5cdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCAhby5pbnZlcnRQYWdlT3JkZXIgPyBvLmN1cnJlbnRQYWdlICsgMSA6IG8uY3VycmVudFBhZ2UgLSAxLCB7dGV4dDogby5uZXh0VGV4dCwgY2xhc3NlczogJ25leHQnfSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIHN0YXJ0IGVkZ2VzXG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5zdGFydCA+IDAgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZihvLnVzZVN0YXJ0RWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGVuZCA9IE1hdGgubWluKG8uZWRnZXMsIGludGVydmFsLnN0YXJ0KTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBlbmQ7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChvLmVkZ2VzIDwgaW50ZXJ2YWwuc3RhcnQgJiYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgby5lZGdlcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuZW5kIDwgby5wYWdlcyAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmKG8udXNlU3RhcnRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgYmVnaW4gPSBNYXRoLm1heChvLnBhZ2VzIC0gby5lZGdlcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IG8ucGFnZXMgLSAxOyBpID49IGJlZ2luOyBpLS0pIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChvLnBhZ2VzIC0gby5lZGdlcyA+IGludGVydmFsLmVuZCAmJiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgaW50ZXJ2YWwgbGlua3Ncblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0Zm9yIChpID0gaW50ZXJ2YWwuc3RhcnQ7IGkgPCBpbnRlcnZhbC5lbmQ7IGkrKykge1xuXHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yIChpID0gaW50ZXJ2YWwuZW5kIC0gMTsgaSA+PSBpbnRlcnZhbC5zdGFydDsgaS0tKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIGVuZCBlZGdlc1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuZW5kIDwgby5wYWdlcyAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmIChvLnBhZ2VzIC0gby5lZGdlcyA+IGludGVydmFsLmVuZCAmJiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoby51c2VFbmRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgYmVnaW4gPSBNYXRoLm1heChvLnBhZ2VzIC0gby5lZGdlcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IGJlZ2luOyBpIDwgby5wYWdlczsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5zdGFydCA+IDAgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZiAoby5lZGdlcyA8IGludGVydmFsLnN0YXJ0ICYmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIG8uZWRnZXMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKG8udXNlRW5kRWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGVuZCA9IE1hdGgubWluKG8uZWRnZXMsIGludGVydmFsLnN0YXJ0KTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IGVuZCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgTmV4dCBsaW5rICh1bmxlc3Mgb3B0aW9uIGlzIHNldCBmb3IgYXQgZnJvbnQpXG5cdFx0XHRpZiAoby5uZXh0VGV4dCAmJiAhby5uZXh0QXRGcm9udCkge1xuXHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgIW8uaW52ZXJ0UGFnZU9yZGVyID8gby5jdXJyZW50UGFnZSArIDEgOiBvLmN1cnJlbnRQYWdlIC0gMSwge3RleHQ6IG8ubmV4dFRleHQsIGNsYXNzZXM6ICduZXh0J30pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoby5lbGxpcHNlUGFnZVNldCAmJiAhby5kaXNhYmxlZCkge1xuXHRcdFx0XHRtZXRob2RzLl9lbGxpcHNlQ2xpY2suY2FsbCh0aGlzLCAkcGFuZWwpO1xuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdF9nZXRQYWdlczogZnVuY3Rpb24obykge1xuXHRcdFx0dmFyIHBhZ2VzID0gTWF0aC5jZWlsKG8uaXRlbXMgLyBvLml0ZW1zT25QYWdlKTtcblx0XHRcdHJldHVybiBwYWdlcyB8fCAxO1xuXHRcdH0sXG5cblx0XHRfZ2V0SW50ZXJ2YWw6IGZ1bmN0aW9uKG8pIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHN0YXJ0OiBNYXRoLmNlaWwoby5jdXJyZW50UGFnZSA+IG8uaGFsZkRpc3BsYXllZCA/IE1hdGgubWF4KE1hdGgubWluKG8uY3VycmVudFBhZ2UgLSBvLmhhbGZEaXNwbGF5ZWQsIChvLnBhZ2VzIC0gby5kaXNwbGF5ZWRQYWdlcykpLCAwKSA6IDApLFxuXHRcdFx0XHRlbmQ6IE1hdGguY2VpbChvLmN1cnJlbnRQYWdlID4gby5oYWxmRGlzcGxheWVkID8gTWF0aC5taW4oby5jdXJyZW50UGFnZSArIG8uaGFsZkRpc3BsYXllZCwgby5wYWdlcykgOiBNYXRoLm1pbihvLmRpc3BsYXllZFBhZ2VzLCBvLnBhZ2VzKSlcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdF9hcHBlbmRJdGVtOiBmdW5jdGlvbihwYWdlSW5kZXgsIG9wdHMpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcywgb3B0aW9ucywgJGxpbmssIG8gPSBzZWxmLmRhdGEoJ3BhZ2luYXRpb24nKSwgJGxpbmtXcmFwcGVyID0gJCgnPGxpPjwvbGk+JyksICR1bCA9IHNlbGYuZmluZCgndWwnKTtcblxuXHRcdFx0cGFnZUluZGV4ID0gcGFnZUluZGV4IDwgMCA/IDAgOiAocGFnZUluZGV4IDwgby5wYWdlcyA/IHBhZ2VJbmRleCA6IG8ucGFnZXMgLSAxKTtcblxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0dGV4dDogcGFnZUluZGV4ICsgMSxcblx0XHRcdFx0Y2xhc3NlczogJydcblx0XHRcdH07XG5cblx0XHRcdGlmIChvLmxhYmVsTWFwLmxlbmd0aCAmJiBvLmxhYmVsTWFwW3BhZ2VJbmRleF0pIHtcblx0XHRcdFx0b3B0aW9ucy50ZXh0ID0gby5sYWJlbE1hcFtwYWdlSW5kZXhdO1xuXHRcdFx0fVxuXG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQob3B0aW9ucywgb3B0cyB8fCB7fSk7XG5cblx0XHRcdGlmIChwYWdlSW5kZXggPT0gby5jdXJyZW50UGFnZSB8fCBvLmRpc2FibGVkKSB7XG5cdFx0XHRcdGlmIChvLmRpc2FibGVkIHx8IG9wdGlvbnMuY2xhc3NlcyA9PT0gJ3ByZXYnIHx8IG9wdGlvbnMuY2xhc3NlcyA9PT0gJ25leHQnKSB7XG5cdFx0XHRcdFx0JGxpbmtXcmFwcGVyLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRsaW5rV3JhcHBlci5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JGxpbmsgPSAkKCc8c3BhbiBjbGFzcz1cImN1cnJlbnRcIj4nICsgKG9wdGlvbnMudGV4dCkgKyAnPC9zcGFuPicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG8udXNlQW5jaG9ycykge1xuXHRcdFx0XHRcdCRsaW5rID0gJCgnPGEgaHJlZj1cIicgKyBvLmhyZWZUZXh0UHJlZml4ICsgKHBhZ2VJbmRleCArIDEpICsgby5ocmVmVGV4dFN1ZmZpeCArICdcIiBjbGFzcz1cInBhZ2UtbGlua1wiPicgKyAob3B0aW9ucy50ZXh0KSArICc8L2E+Jyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JGxpbmsgPSAkKCc8c3BhbiA+JyArIChvcHRpb25zLnRleHQpICsgJzwvc3Bhbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkbGluay5jbGljayhmdW5jdGlvbihldmVudCl7XG5cdFx0XHRcdFx0cmV0dXJuIG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbChzZWxmLCBwYWdlSW5kZXgsIGV2ZW50KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcHRpb25zLmNsYXNzZXMpIHtcblx0XHRcdFx0JGxpbmsuYWRkQ2xhc3Mob3B0aW9ucy5jbGFzc2VzKTtcblx0XHRcdH1cblxuXHRcdFx0JGxpbmtXcmFwcGVyLmFwcGVuZCgkbGluayk7XG5cblx0XHRcdGlmICgkdWwubGVuZ3RoKSB7XG5cdFx0XHRcdCR1bC5hcHBlbmQoJGxpbmtXcmFwcGVyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGYuYXBwZW5kKCRsaW5rV3JhcHBlcik7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9zZWxlY3RQYWdlOiBmdW5jdGlvbihwYWdlSW5kZXgsIGV2ZW50KSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5jdXJyZW50UGFnZSA9IHBhZ2VJbmRleDtcblx0XHRcdGlmIChvLnNlbGVjdE9uQ2xpY2spIHtcblx0XHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG8ub25QYWdlQ2xpY2socGFnZUluZGV4ICsgMSwgZXZlbnQpO1xuXHRcdH0sXG5cblxuXHRcdF9lbGxpcHNlQ2xpY2s6IGZ1bmN0aW9uKCRwYW5lbCkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdFx0XHRvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyksXG5cdFx0XHRcdCRlbGxpcCA9ICRwYW5lbC5maW5kKCcuZWxsaXBzZScpO1xuXHRcdFx0JGVsbGlwLmFkZENsYXNzKCdjbGlja2FibGUnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcblx0XHRcdCRlbGxpcC5jbGljayhmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRpZiAoIW8uZGlzYWJsZSkge1xuXHRcdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHRcdFx0XHR2YWwgPSAocGFyc2VJbnQoJHRoaXMucGFyZW50KCkucHJldigpLnRleHQoKSwgMTApIHx8IDApICsgMTtcblx0XHRcdFx0XHQkdGhpc1xuXHRcdFx0XHRcdFx0Lmh0bWwoJzxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIG1heD1cIicgKyBvLnBhZ2VzICsgJ1wiIHN0ZXA9XCIxXCIgdmFsdWU9XCInICsgdmFsICsgJ1wiPicpXG5cdFx0XHRcdFx0XHQuZmluZCgnaW5wdXQnKVxuXHRcdFx0XHRcdFx0LmZvY3VzKClcblx0XHRcdFx0XHRcdC5jbGljayhmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHQvLyBwcmV2ZW50IGlucHV0IG51bWJlciBhcnJvd3MgZnJvbSBidWJibGluZyBhIGNsaWNrIGV2ZW50IG9uICRlbGxpcFxuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQua2V5dXAoZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cdFx0XHRcdFx0XHRcdGlmIChldmVudC53aGljaCA9PT0gMTMgJiYgdmFsICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGVudGVyIHRvIGFjY2VwdFxuXHRcdFx0XHRcdFx0XHRcdGlmICgodmFsPjApJiYodmFsPD1vLnBhZ2VzKSlcblx0XHRcdFx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwoc2VsZiwgdmFsIC0gMSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT09IDI3KSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gZXNjYXBlIHRvIGNhbmNlbFxuXHRcdFx0XHRcdFx0XHRcdCRlbGxpcC5lbXB0eSgpLmh0bWwoby5lbGxpcHNlVGV4dCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQuYmluZCgnYmx1cicsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAodmFsICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbChzZWxmLCB2YWwgLSAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQkZWxsaXAuZW1wdHkoKS5odG1sKG8uZWxsaXBzZVRleHQpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fTtcblxuXHQkLmZuLnBhZ2luYXRpb24gPSBmdW5jdGlvbihtZXRob2QpIHtcblxuXHRcdC8vIE1ldGhvZCBjYWxsaW5nIGxvZ2ljXG5cdFx0aWYgKG1ldGhvZHNbbWV0aG9kXSAmJiBtZXRob2QuY2hhckF0KDApICE9ICdfJykge1xuXHRcdFx0cmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QpIHtcblx0XHRcdHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JC5lcnJvcignTWV0aG9kICcgKyAgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkucGFnaW5hdGlvbicpO1xuXHRcdH1cblxuXHR9O1xuXG59KShqUXVlcnkpOyIsIi8qXG4gICAgQSBzaW1wbGUgalF1ZXJ5IG1vZGFsIChodHRwOi8vZ2l0aHViLmNvbS9reWxlZm94L2pxdWVyeS1tb2RhbClcbiAgICBWZXJzaW9uIDAuOS4yXG4qL1xuXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgLy8gTWFraW5nIHlvdXIgalF1ZXJ5IHBsdWdpbiB3b3JrIGJldHRlciB3aXRoIG5wbSB0b29sc1xuICAvLyBodHRwOi8vYmxvZy5ucG1qcy5vcmcvcG9zdC8xMTI3MTIxNjk4MzAvbWFraW5nLXlvdXItanF1ZXJ5LXBsdWdpbi13b3JrLWJldHRlci13aXRoLW5wbVxuICBpZih0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgIGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgd2luZG93LCBkb2N1bWVudCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgZmFjdG9yeShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQpO1xuICB9XG59KGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuXG4gIHZhciBtb2RhbHMgPSBbXSxcbiAgICAgIGdldEN1cnJlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG1vZGFscy5sZW5ndGggPyBtb2RhbHNbbW9kYWxzLmxlbmd0aCAtIDFdIDogbnVsbDtcbiAgICAgIH0sXG4gICAgICBzZWxlY3RDdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChpPW1vZGFscy5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG4gICAgICAgICAgaWYgKG1vZGFsc1tpXS4kYmxvY2tlcikge1xuICAgICAgICAgICAgbW9kYWxzW2ldLiRibG9ja2VyLnRvZ2dsZUNsYXNzKCdjdXJyZW50Jywhc2VsZWN0ZWQpLnRvZ2dsZUNsYXNzKCdiZWhpbmQnLHNlbGVjdGVkKTtcbiAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgJC55c3BfbW9kYWwgPSBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuICAgIHZhciByZW1vdmUsIHRhcmdldDtcbiAgICB0aGlzLiRib2R5ID0gJCgnYm9keScpO1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkLnlzcF9tb2RhbC5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zLmRvRmFkZSA9ICFpc05hTihwYXJzZUludCh0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uLCAxMCkpO1xuICAgIHRoaXMuJGJsb2NrZXIgPSBudWxsO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VFeGlzdGluZylcbiAgICAgIHdoaWxlICgkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKVxuICAgICAgICAkLnlzcF9tb2RhbC5jbG9zZSgpOyAvLyBDbG9zZSBhbnkgb3BlbiBtb2RhbHMuXG4gICAgbW9kYWxzLnB1c2godGhpcyk7XG4gICAgaWYgKGVsLmlzKCdhJykpIHtcbiAgICAgIHRhcmdldCA9IGVsLmF0dHIoJ2hyZWYnKTtcbiAgICAgIHRoaXMuYW5jaG9yID0gZWw7XG4gICAgICAvL1NlbGVjdCBlbGVtZW50IGJ5IGlkIGZyb20gaHJlZlxuICAgICAgaWYgKC9eIy8udGVzdCh0YXJnZXQpKSB7XG4gICAgICAgIHRoaXMuJGVsbSA9ICQodGFyZ2V0KTtcbiAgICAgICAgaWYgKHRoaXMuJGVsbS5sZW5ndGggIT09IDEpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLiRlbG0pO1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIC8vQUpBWFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZWxtID0gJCgnPGRpdj4nKTtcbiAgICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kZWxtKTtcbiAgICAgICAgcmVtb3ZlID0gZnVuY3Rpb24oZXZlbnQsIG1vZGFsKSB7IG1vZGFsLmVsbS5yZW1vdmUoKTsgfTtcbiAgICAgICAgdGhpcy5zaG93U3Bpbm5lcigpO1xuICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfU0VORCk7XG4gICAgICAgICQuZ2V0KHRhcmdldCkuZG9uZShmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgaWYgKCEkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKSByZXR1cm47XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX1NVQ0NFU1MpO1xuICAgICAgICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuICAgICAgICAgIGN1cnJlbnQuJGVsbS5lbXB0eSgpLmFwcGVuZChodG1sKS5vbigkLnlzcF9tb2RhbC5DTE9TRSwgcmVtb3ZlKTtcbiAgICAgICAgICBjdXJyZW50LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgY3VycmVudC5vcGVuKCk7XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX0NPTVBMRVRFKTtcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfRkFJTCk7XG4gICAgICAgICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgICAgICAgY3VycmVudC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgIG1vZGFscy5wb3AoKTsgLy8gcmVtb3ZlIGV4cGVjdGVkIG1vZGFsIGZyb20gdGhlIGxpc3RcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfQ09NUExFVEUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWxtID0gZWw7XG4gICAgICB0aGlzLmFuY2hvciA9IGVsO1xuICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kZWxtKTtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfTtcblxuICAkLnlzcF9tb2RhbC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6ICQueXNwX21vZGFsLFxuXG4gICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbSA9IHRoaXM7XG4gICAgICB0aGlzLmJsb2NrKCk7XG4gICAgICB0aGlzLmFuY2hvci5ibHVyKCk7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuZG9GYWRlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbS5zaG93KCk7XG4gICAgICAgIH0sIHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24gKiB0aGlzLm9wdGlvbnMuZmFkZURlbGF5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgfVxuICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXlkb3duLm1vZGFsJykub24oJ2tleWRvd24ubW9kYWwnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAyNyAmJiBjdXJyZW50Lm9wdGlvbnMuZXNjYXBlQ2xvc2UpIGN1cnJlbnQuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jbGlja0Nsb3NlKVxuICAgICAgICB0aGlzLiRibG9ja2VyLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHRoaXMpXG4gICAgICAgICAgICAkLnlzcF9tb2RhbC5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgbW9kYWxzLnBvcCgpO1xuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSlcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXlkb3duLm1vZGFsJyk7XG4gICAgfSxcblxuICAgIGJsb2NrOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkJFRk9SRV9CTE9DSywgW3RoaXMuX2N0eCgpXSk7XG4gICAgICB0aGlzLiRib2R5LmNzcygnb3ZlcmZsb3cnLCdoaWRkZW4nKTtcbiAgICAgIHRoaXMuJGJsb2NrZXIgPSAkKCc8ZGl2IGNsYXNzPVwiJyArIHRoaXMub3B0aW9ucy5ibG9ja2VyQ2xhc3MgKyAnIGJsb2NrZXIgY3VycmVudFwiPjwvZGl2PicpLmFwcGVuZFRvKHRoaXMuJGJvZHkpO1xuICAgICAgc2VsZWN0Q3VycmVudCgpO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmRvRmFkZSkge1xuICAgICAgICB0aGlzLiRibG9ja2VyLmNzcygnb3BhY2l0eScsMCkuYW5pbWF0ZSh7b3BhY2l0eTogMX0sIHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkxPQ0ssIFt0aGlzLl9jdHgoKV0pO1xuICAgIH0sXG5cbiAgICB1bmJsb2NrOiBmdW5jdGlvbihub3cpIHtcbiAgICAgIGlmICghbm93ICYmIHRoaXMub3B0aW9ucy5kb0ZhZGUpXG4gICAgICAgIHRoaXMuJGJsb2NrZXIuZmFkZU91dCh0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uLCB0aGlzLnVuYmxvY2suYmluZCh0aGlzLHRydWUpKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLiRibG9ja2VyLmNoaWxkcmVuKCkuYXBwZW5kVG8odGhpcy4kYm9keSk7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIgPSBudWxsO1xuICAgICAgICBzZWxlY3RDdXJyZW50KCk7XG4gICAgICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSlcbiAgICAgICAgICB0aGlzLiRib2R5LmNzcygnb3ZlcmZsb3cnLCcnKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5CRUZPUkVfT1BFTiwgW3RoaXMuX2N0eCgpXSk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnNob3dDbG9zZSkge1xuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gJCgnPGEgaHJlZj1cIiNjbG9zZS1tb2RhbFwiIHJlbD1cIm1vZGFsOmNsb3NlXCIgY2xhc3M9XCJjbG9zZS1tb2RhbCAnICsgdGhpcy5vcHRpb25zLmNsb3NlQ2xhc3MgKyAnXCI+JyArIHRoaXMub3B0aW9ucy5jbG9zZVRleHQgKyAnPC9hPicpO1xuICAgICAgICB0aGlzLiRlbG0uYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24pO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLmFkZENsYXNzKHRoaXMub3B0aW9ucy5tb2RhbENsYXNzKS5hcHBlbmRUbyh0aGlzLiRibG9ja2VyKTtcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgdGhpcy4kZWxtLmNzcyh7b3BhY2l0eTogMCwgZGlzcGxheTogJ2lubGluZS1ibG9jayd9KS5hbmltYXRlKHtvcGFjaXR5OiAxfSwgdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRlbG0uY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuT1BFTiwgW3RoaXMuX2N0eCgpXSk7XG4gICAgfSxcblxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkVGT1JFX0NMT1NFLCBbdGhpcy5fY3R4KCldKTtcbiAgICAgIGlmICh0aGlzLmNsb3NlQnV0dG9uKSB0aGlzLmNsb3NlQnV0dG9uLnJlbW92ZSgpO1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgdGhpcy4kZWxtLmZhZGVPdXQodGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5BRlRFUl9DTE9TRSwgW190aGlzLl9jdHgoKV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsbS5oaWRlKDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQUZURVJfQ0xPU0UsIFtfdGhpcy5fY3R4KCldKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5DTE9TRSwgW3RoaXMuX2N0eCgpXSk7XG4gICAgfSxcblxuICAgIHNob3dTcGlubmVyOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLnNob3dTcGlubmVyKSByZXR1cm47XG4gICAgICB0aGlzLnNwaW5uZXIgPSB0aGlzLnNwaW5uZXIgfHwgJCgnPGRpdiBjbGFzcz1cIicgKyB0aGlzLm9wdGlvbnMubW9kYWxDbGFzcyArICctc3Bpbm5lclwiPjwvZGl2PicpXG4gICAgICAgIC5hcHBlbmQodGhpcy5vcHRpb25zLnNwaW5uZXJIdG1sKTtcbiAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuc3Bpbm5lcik7XG4gICAgICB0aGlzLnNwaW5uZXIuc2hvdygpO1xuICAgIH0sXG5cbiAgICBoaWRlU3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zcGlubmVyKSB0aGlzLnNwaW5uZXIucmVtb3ZlKCk7XG4gICAgfSxcblxuICAgIC8vUmV0dXJuIGNvbnRleHQgZm9yIGN1c3RvbSBldmVudHNcbiAgICBfY3R4OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7IGVsbTogdGhpcy4kZWxtLCAkZWxtOiB0aGlzLiRlbG0sICRibG9ja2VyOiB0aGlzLiRibG9ja2VyLCBvcHRpb25zOiB0aGlzLm9wdGlvbnMsICRhbmNob3I6IHRoaXMuYW5jaG9yIH07XG4gICAgfVxuICB9O1xuXG4gICQueXNwX21vZGFsLmNsb3NlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoISQueXNwX21vZGFsLmlzQWN0aXZlKCkpIHJldHVybjtcbiAgICBpZiAoZXZlbnQpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgY3VycmVudC5jbG9zZSgpO1xuICAgIHJldHVybiBjdXJyZW50LiRlbG07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBpZiB0aGVyZSBjdXJyZW50bHkgaXMgYW4gYWN0aXZlIG1vZGFsXG4gICQueXNwX21vZGFsLmlzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBtb2RhbHMubGVuZ3RoID4gMDtcbiAgfTtcblxuICAkLnlzcF9tb2RhbC5nZXRDdXJyZW50ID0gZ2V0Q3VycmVudDtcblxuICAkLnlzcF9tb2RhbC5kZWZhdWx0cyA9IHtcbiAgICBjbG9zZUV4aXN0aW5nOiB0cnVlLFxuICAgIGVzY2FwZUNsb3NlOiB0cnVlLFxuICAgIGNsaWNrQ2xvc2U6IHRydWUsXG4gICAgY2xvc2VUZXh0OiAnQ2xvc2UnLFxuICAgIGNsb3NlQ2xhc3M6ICcnLFxuICAgIG1vZGFsQ2xhc3M6IFwieXNwLW1vZGFsXCIsXG4gICAgYmxvY2tlckNsYXNzOiBcImpxdWVyeS1tb2RhbFwiLFxuICAgIHNwaW5uZXJIdG1sOiAnPGRpdiBjbGFzcz1cInJlY3QxXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3QyXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3QzXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3Q0XCI+PC9kaXY+JyxcbiAgICBzaG93U3Bpbm5lcjogdHJ1ZSxcbiAgICBzaG93Q2xvc2U6IHRydWUsXG4gICAgZmFkZUR1cmF0aW9uOiBudWxsLCAgIC8vIE51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhlIGZhZGUgYW5pbWF0aW9uIHRha2VzLlxuICAgIGZhZGVEZWxheTogMS4wICAgICAgICAvLyBQb2ludCBkdXJpbmcgdGhlIG92ZXJsYXkncyBmYWRlLWluIHRoYXQgdGhlIG1vZGFsIGJlZ2lucyB0byBmYWRlIGluICguNSA9IDUwJSwgMS41ID0gMTUwJSwgZXRjLilcbiAgfTtcblxuICAvLyBFdmVudCBjb25zdGFudHNcbiAgJC55c3BfbW9kYWwuQkVGT1JFX0JMT0NLID0gJ21vZGFsOmJlZm9yZS1ibG9jayc7XG4gICQueXNwX21vZGFsLkJMT0NLID0gJ21vZGFsOmJsb2NrJztcbiAgJC55c3BfbW9kYWwuQkVGT1JFX09QRU4gPSAnbW9kYWw6YmVmb3JlLW9wZW4nO1xuICAkLnlzcF9tb2RhbC5PUEVOID0gJ21vZGFsOm9wZW4nO1xuICAkLnlzcF9tb2RhbC5CRUZPUkVfQ0xPU0UgPSAnbW9kYWw6YmVmb3JlLWNsb3NlJztcbiAgJC55c3BfbW9kYWwuQ0xPU0UgPSAnbW9kYWw6Y2xvc2UnO1xuICAkLnlzcF9tb2RhbC5BRlRFUl9DTE9TRSA9ICdtb2RhbDphZnRlci1jbG9zZSc7XG4gICQueXNwX21vZGFsLkFKQVhfU0VORCA9ICdtb2RhbDphamF4OnNlbmQnO1xuICAkLnlzcF9tb2RhbC5BSkFYX1NVQ0NFU1MgPSAnbW9kYWw6YWpheDpzdWNjZXNzJztcbiAgJC55c3BfbW9kYWwuQUpBWF9GQUlMID0gJ21vZGFsOmFqYXg6ZmFpbCc7XG4gICQueXNwX21vZGFsLkFKQVhfQ09NUExFVEUgPSAnbW9kYWw6YWpheDpjb21wbGV0ZSc7XG5cbiAgJC5mbi55c3BfbW9kYWwgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIG5ldyAkLnlzcF9tb2RhbCh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gQXV0b21hdGljYWxseSBiaW5kIGxpbmtzIHdpdGggcmVsPVwibW9kYWw6Y2xvc2VcIiB0bywgd2VsbCwgY2xvc2UgdGhlIG1vZGFsLlxuICAkKGRvY3VtZW50KS5vbignY2xpY2subW9kYWwnLCAnYVtyZWx+PVwibW9kYWw6Y2xvc2VcIl0nLCAkLnlzcF9tb2RhbC5jbG9zZSk7XG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5tb2RhbCcsICdhW3JlbH49XCJtb2RhbDpvcGVuXCJdJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQodGhpcykubW9kYWwoKTtcbiAgfSk7XG59KSk7IiwiIWZ1bmN0aW9uKHQsZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxlKTtlbHNle3ZhciBuPWUoKTtmb3IodmFyIG8gaW4gbikoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0czp0KVtvXT1uW29dfX0oc2VsZiwoKCk9PigoKT0+e1widXNlIHN0cmljdFwiO3ZhciB0PXt9Oyh0PT57XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkodCxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX0pKHQpO3ZhciBlLG49XCJmc2xpZ2h0Ym94LVwiLGk9XCJcIi5jb25jYXQobixcInN0eWxlc1wiKSxzPVwiXCIuY29uY2F0KG4sXCJmdWxsLWRpbWVuc2lvblwiKSxyPVwiXCIuY29uY2F0KG4sXCJmbGV4LWNlbnRlcmVkXCIpLGE9XCJcIi5jb25jYXQobixcIm9wZW5cIiksYz1cIlwiLmNvbmNhdChuLFwiYWJzb2x1dGVkXCIpLHU9XCJcIi5jb25jYXQobixcIm9wYWNpdHktMVwiKSxsPVwiXCIuY29uY2F0KG4sXCJzbGlkZS1idG5cIiksZD1cIlwiLmNvbmNhdChsLFwiLWNvbnRhaW5lclwiKSxoPVwiXCIuY29uY2F0KG4sXCJmYWRlLWluXCIpLGY9XCJcIi5jb25jYXQobixcImZhZGUtb3V0XCIpLHA9aCtcIi1zdHJvbmdcIixtPWYrXCItc3Ryb25nXCIsYj0oXCJcIi5jb25jYXQobixcImNhcHRpb25cIiksXCJcIi5jb25jYXQobixcInRodW1iXCIpKSxnPWIrXCJzXCIsdj1cIlwiLmNvbmNhdChnLFwiLWxvYWRlclwiKSx4PVwiXCIuY29uY2F0KGcsXCItY3Vyc29yZXJcIiksdz1cIlwiLmNvbmNhdChnLFwiLWlubmVyXCIpLHk9YitcIi13cmFwcGVyXCIsQz1iK1wiLWludmFsaWRcIjtmdW5jdGlvbiBMKHQpe3JldHVybiBMPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9LEwodCl9ZnVuY3Rpb24gVCh0KXt2YXIgZT10LmMsbj10LmNvbXBvbmVudHNTZXJ2aWNlcyxvPXQuY29yZS50aHVtYnNSZW5kZXJEaXNwYXRjaGVyLGk9dC5kYXRhLHM9dC5lYSxyPXQubGEsYT0odC5zdGFnZUluZGV4ZXMsdC51aSksYz10Lno7ZnVuY3Rpb24gdSgpe2Zvcih2YXIgdD0wO3Q8ZTt0Kyspci50KHQpfXRoaXMubz1mdW5jdGlvbigpe2MucigpLGkuaXNUaHVtYmluZz0hMCxzLnVjKCksYS5zdGhjKCksdSgpLG8ucmVuZGVyVGh1bWJzSWZOb3RZZXRBbmRBbGxUeXBlc0RldGVjdGVkKCksaS51bmxvYWRlZFRodW1ic0NvdW50JiZuLmFwcGVuZFRodW1ic0xvYWRlcklmTm90WWV0KCl9LHRoaXMueD1mdW5jdGlvbigpe2MucigpLGkuaXNUaHVtYmluZz0hMSxzLmRjKCksYS5odHNjKCksdSgpfX1mdW5jdGlvbiB6KHQsZSl7dmFyIG49dC5jbGFzc0xpc3Q7bi5jb250YWlucyhlKSYmbi5yZW1vdmUoZSl9ZnVuY3Rpb24gUyh0LGUpe3ZhciBuPXQuY2xhc3NMaXN0O24uY29udGFpbnMoZSl8fG4uYWRkKGUpfWZ1bmN0aW9uIEEodCl7dmFyIGU9dC5kYXRhLG49dC5lbGVtZW50cyxvPXQuc3RhZ2VJbmRleGVzO3RoaXMucnVuQWN0aW9ucz1mdW5jdGlvbigpe3oobi50aHVtYnNDb250YWluZXIscik7dmFyIHQ9aW5uZXJXaWR0aC8yLHM9bi50aHVtYnNXcmFwcGVyc1tvLmN1cnJlbnRdLGE9cy5vZmZzZXRMZWZ0K3Mub2Zmc2V0V2lkdGgvMixjPWUudGh1bWJzSW5uZXJXaWR0aC1hO2E+dCYmYz50P2kodC1hKTphPnQ/aShpbm5lcldpZHRoLWUudGh1bWJzSW5uZXJXaWR0aC05KTpjPnQmJmkoMCl9LHRoaXMucnVuVG9UaGluVGh1bWJzQWN0aW9ucz1mdW5jdGlvbigpe1Mobi50aHVtYnNDb250YWluZXIsciksaSgwKX07dmFyIGk9ZnVuY3Rpb24odCl7ZS50aHVtYnNUcmFuc2Zvcm09dCxuLnRodW1ic0lubmVyLnN0eWxlLnRyYW5zZm9ybT1cInRyYW5zbGF0ZVgoXCIuY29uY2F0KHQsXCJweClcIil9fWZ1bmN0aW9uIEkodCl7dmFyIGU9dGhpcyxuPXQuY29yZSxvPW4uZXZlbnRzRGlzcGF0Y2hlcixpPW4uZ2xvYmFsRXZlbnRzQ29udHJvbGxlcixzPW4uc2Nyb2xsYmFyUmVjb21wZW5zb3Iscj10LmRhdGEsYz10LmVsZW1lbnRzLHU9dC5mcyxsPXQucCxkPXQucHJvcHMsaD10LnFzLGY9dC5zcyxwPXQudCxiPXQudGh1bWJzU3dpcGluZ1Byb3BzLGc9dC56O3RoaXMuaXNMaWdodGJveEZhZGluZ091dD0hMSx0aGlzLnJ1bkFjdGlvbnM9ZnVuY3Rpb24oKXtlLmlzTGlnaHRib3hGYWRpbmdPdXQ9ITAsYy5jb250YWluZXIuY2xhc3NMaXN0LmFkZChtKSxpLnJlbW92ZUxpc3RlbmVycygpLGYucigpLGQuZXhpdEZ1bGxzY3JlZW5PbkNsb3NlJiZyLmlmcyYmdS54KCksZy5yKCkscCgoZnVuY3Rpb24oKXtlLmlzTGlnaHRib3hGYWRpbmdPdXQ9ITE7Zm9yKHZhciBuPTA7bjx0LnRzLmxlbmd0aDtuKyspY2xlYXJUaW1lb3V0KHQudHNbbl0pO2Zvcih0LnRzPVtdLG49MDtuPGgubGVuZ3RoO24rKyloW25dPTA7bC5pPSExLGImJihiLmk9ITEpLGMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUobSksZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYSkscy5yZW1vdmVSZWNvbXBlbnNlKCksZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjLmNvbnRhaW5lciksby5kaXNwYXRjaChcIm9uQ2xvc2VcIil9KSwyNzApfX1mdW5jdGlvbiBFKHQsZSxuLG8pe3ZhciBpPXQuaXNsLHM9dC5wcm9wcy5zbGlkZUNoYW5nZUFuaW1hdGlvbixyPXQuc2F3LGE9dC5zbXcsYz10LnN0LHU9dC5zdGFnZUluZGV4ZXMsbD10LnN3cyxkPWUucHJldmlvdXMsaD1lLmN1cnJlbnQscD1lLm5leHQ7ZnVuY3Rpb24gbSgpe2MuaShoKT9oPT09dS5wcmV2aW91cz9hW2hdLm5lKCk6aD09PXUubmV4dCYmYVtoXS5wKCk6KGFbaF0uaCgpLGFbaF0ubigpKX1mdW5jdGlvbiBiKHQsZSxuKXt0JiZyW2VdLmNsYXNzTGlzdC5hZGQobil9dGhpcy5ydW5KdW1wUmVmbG93ZWRBY3Rpb25zPWZ1bmN0aW9uKCl7YihuLGgsZiksYihvLHUuY3VycmVudCxzKSxsLmEoKSx2b2lkIDAhPT11LnByZXZpb3VzJiZ1LnByZXZpb3VzIT09aCYmYVt1LnByZXZpb3VzXS5uZSgpLGFbdS5jdXJyZW50XS5uKCksdm9pZCAwIT09dS5uZXh0JiZ1Lm5leHQhPT1oJiZhW3UubmV4dF0ucCgpLGwuYihkKSxsLmIocCksaVtoXT9zZXRUaW1lb3V0KG0sMjYwKTptKCl9fWZ1bmN0aW9uIEYodCl7dmFyIGUsbj10LmNvcmUuc2xpZGVDaGFuZ2VGYWNhZGUsbz10LnByb3BzLGk9dC5zcyxzPXQuc3RhZ2VJbmRleGVzLHI9ITE7ZnVuY3Rpb24gYSgpe3I9ITEsY2xlYXJUaW1lb3V0KGUpLHQuc3NiLmNsYXNzTGlzdC5yZW1vdmUodSksdC5zc3goKX1mdW5jdGlvbiBjKCl7dmFyIGk9dC5zc2I7aS5zdHlsZS50cmFuc2l0aW9uPVwib3BhY2l0eSAuMnNcIixpLnN0eWxlLndpZHRoPVwiMHB4XCIsaS5vZmZzZXRXaWR0aCxpLnN0eWxlLnRyYW5zaXRpb249XCJvcGFjaXR5IC4ycywgd2lkdGggbGluZWFyIFwiLmNvbmNhdChvLnNsaWRlc2hvd1RpbWUsXCJtc1wiKSxpLnN0eWxlLndpZHRoPWlubmVyV2lkdGgrXCJweFwiLGU9c2V0VGltZW91dCgoZnVuY3Rpb24oKXtuLmNoYW5nZVRvTmV4dCgpLG8uZGlzYWJsZVNsaWRlc2hvd0xvb3AmJnMuY3VycmVudCsxPT09by5zb3VyY2VzLmxlbmd0aD9hKCk6YygpfSksby5zbGlkZXNob3dUaW1lKX1pLnQ9ZnVuY3Rpb24oKXtyP2EoKToocj0hMCx0LnNzcygpLHQuc3NiLmNsYXNzTGlzdC5hZGQodSksYygpKX0saS5yPWZ1bmN0aW9uKCl7ciYmYSgpfX1mdW5jdGlvbiBOKHQpe3ZhciBlPXQucCxuPU9iamVjdC5rZXlzKGUpLG89ZVtuWzBdXSxpPWVbblsxXV07cmV0dXJuIE1hdGguaHlwb3Qoby5zY3JlZW5YLWkuc2NyZWVuWCxvLnNjcmVlblktaS5zY3JlZW5ZKX1mdW5jdGlvbiBrKHQpe3QuY29tcG9uZW50c1NlcnZpY2VzO3ZhciBlPXQuY29yZS5wb2ludGVyaW5nQnVja2V0LG49dC5lbGVtZW50cyxvPXQucCxpPXQuc213LHM9dC5zdGFnZUluZGV4ZXMscj10LnosYT10Lnp2O2Z1bmN0aW9uIGModCxlKXtpW3RdLnYoby5zd2lwZWRYKVtlXSgpfXRoaXMuYT1mdW5jdGlvbihpKXtlLnJ1blN3aXBpbmdNb3ZlQWN0aW9uc0ZvclByb3BzQW5kRXZlbnQobyxpKSxuLmNvbnRhaW5lci5jb250YWlucyh0LmgpfHxuLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0LmgpfSx0aGlzLnA9ZnVuY3Rpb24oKXt2YXIgdD1OKG8pO2lmKG8ucGluY2hlZEh5cG90KXt2YXIgZT10LW8ucGluY2hlZEh5cG90LG49YStlL01hdGguaHlwb3QoaW5uZXJXaWR0aCxpbm5lckhlaWdodCkqMTA7bjwuOSYmKG49LjkpLHIueihuKSxvLnBpbmNoZWRIeXBvdD10fWVsc2Ugby5waW5jaGVkSHlwb3Q9dH0sdGhpcy5zPWZ1bmN0aW9uKCl7YyhzLmN1cnJlbnQsXCJ6XCIpLHZvaWQgMCE9PXMucHJldmlvdXMmJm8uc3dpcGVkWD4wP2Mocy5wcmV2aW91cyxcIm5lXCIpOnZvaWQgMCE9PXMubmV4dCYmby5zd2lwZWRYPDAmJmMocy5uZXh0LFwicFwiKX0sdGhpcy56cz1mdW5jdGlvbih0KXtvLnN3aXBlZFg9KHQuc2NyZWVuWC1vLmRvd25TY3JlZW5YKS9hLG8uc3dpcGVkWT0odC5zY3JlZW5ZLW8uZG93blNjcmVlblkpL2EsaVtzLmN1cnJlbnRdLnYoby51eCtvLnN3aXBlZFgsby51eStvLnN3aXBlZFkpLnooKX19ZnVuY3Rpb24gQih0LGUpe3ZhciBuPXQuYyxvPXQuZHNzLGk9dC5wLHM9dC5yLHI9dC56dixhPXMoayk7aWYoaS5pc1BpbmNoaW5nKXJldHVybiBhLmEoZSksdm9pZCBhLnAoKTsyIT09aS5wYyYmKDE9PT1yPzE9PT1ufHxvP2kuc3dpcGVkWD0xOihhLmEoZSksYS5zKCkpOihhLmEoZSksYS56cyhlKSkpfWZ1bmN0aW9uIFcodCl7dmFyIGU9dC5jb3JlLG49ZS5jbGlja1pvb21lcixvPWUuc2xpZGVJbmRleENoYW5nZXIsaT10LnAscz10LnNtdyxyPXQuc3RhZ2VJbmRleGVzLGE9dC5zd3MsYz10Lnp2O2Z1bmN0aW9uIHUodCl7dmFyIGU9c1tyLmN1cnJlbnRdO2UuYSgpLGVbdF0oKX1mdW5jdGlvbiBsKHQsZSl7dm9pZCAwIT09dCYmKHNbdF0ucygpLHNbdF1bZV0oKSl9dGhpcy5wPWZ1bmN0aW9uKCl7dmFyIHQ9ci5wcmV2aW91cztpZih2b2lkIDA9PT10KXUoXCJ6XCIpO2Vsc2V7dShcInBcIik7dmFyIGU9ci5uZXh0O28uY2hhbmdlVG8odCk7dmFyIG49ci5wcmV2aW91czthLmQobiksYS5iKGUpLHUoXCJ6XCIpLGwobixcIm5lXCIpfX0sdGhpcy5uPWZ1bmN0aW9uKCl7dmFyIHQ9ci5uZXh0O2lmKHZvaWQgMD09PXQpdShcInpcIik7ZWxzZXt1KFwibmVcIik7dmFyIGU9ci5wcmV2aW91cztvLmNoYW5nZVRvKHQpO3ZhciBuPXIubmV4dDthLmQobiksYS5iKGUpLHUoXCJ6XCIpLGwobixcInBcIil9fSx0aGlzLnM9ZnVuY3Rpb24oKXt2YXIgdD1zW3IuY3VycmVudF07aS51eD10Lmd4KCksaS51eT10Lmd5KCl9LHRoaXMuZD1mdW5jdGlvbigpe2M8PTE/bi56b29tSW4oKTpuLnpvb21PdXQoKX19ZnVuY3Rpb24gTSh0LGUpe3QuY29udGFpbnMoZSkmJnQucmVtb3ZlQ2hpbGQoZSl9ZnVuY3Rpb24gSCh0KXt0LmNvbXBvbmVudHNTZXJ2aWNlczt2YXIgZT10LmNvcmUsbj1lLmxpZ2h0Ym94Q2xvc2VyLG89ZS5wb2ludGVyaW5nQnVja2V0LGk9dC5kc3Mscz10LmVsZW1lbnRzLHI9dC5wLGE9dC5wcm9wcy5kaXNhYmxlQmFja2dyb3VuZENsb3NlLGM9dC5yLHU9dC5zd2MsbD0odC51aSx0Lnp2KSxkPWMoVyk7dGhpcy5hPWZ1bmN0aW9uKCl7TShzLmNvbnRhaW5lcix0LmgpLHIuaXNQaW5jaGluZz0hMSxyLnBpbmNoZWRIeXBvdD0wLG8ucnVuU3dpcGluZ1RvcEFjdGlvbnNGb3JQcm9wc0FuZEV2ZW50KHIpLHUuY2xhc3NMaXN0LnJlbW92ZShcImZzbGlnaHRib3hzd2NwXCIpfSx0aGlzLnM9ZnVuY3Rpb24oKXsxPT09bD9pfHwoci5zd2lwZWRYPjA/ZC5wKCk6ZC5uKCkpOmQucygpfSx0aGlzLm49ZnVuY3Rpb24odCl7XCJWSURFT1wiIT09dC50YXJnZXQudGFnTmFtZSYmKHIuc2Q/ZC5kKCk6YXx8bi5jbG9zZSgpKX19ZnVuY3Rpb24gRCh0LGUpe3ZhciBuPXQucDtuLnBbZS5wb2ludGVySWRdPXtzY3JlZW5YOmUuc2NyZWVuWCxzY3JlZW5ZOmUuc2NyZWVuWX07dmFyIG89T2JqZWN0LmtleXMobi5wKS5sZW5ndGg7cmV0dXJuIG4ucGM9byxvPD0yfWZ1bmN0aW9uIE8odCl7dmFyIGU9dC5jb3JlLnBvaW50ZXJpbmdCdWNrZXQsbj10LmRhdGEsbz10LmVsZW1lbnRzLGk9dC50aHVtYnNTd2lwaW5nUHJvcHM7dGhpcy5ydW5BY3Rpb25zPWZ1bmN0aW9uKHQpe2UucnVuU3dpcGluZ01vdmVBY3Rpb25zRm9yUHJvcHNBbmRFdmVudChpLHQpLG8udGh1bWJzSW5uZXIuc3R5bGUudHJhbnNmb3JtPVwidHJhbnNsYXRlWChcIi5jb25jYXQobi50aHVtYnNUcmFuc2Zvcm0raS5zd2lwZWRYLFwicHgpXCIpLG8udGh1bWJzQ29udGFpbmVyLmNvbnRhaW5zKG8udGh1bWJzQ3Vyc29yZXIpfHxvLnRodW1ic0NvbnRhaW5lci5hcHBlbmRDaGlsZChvLnRodW1ic0N1cnNvcmVyKX19ZnVuY3Rpb24gUCh0KXt2YXIgZT10LmRhdGEsbj10LnJlc29sdmUsbz10LnRodW1ic1N3aXBpbmdQcm9wcyxpPW4oTykscz13aW5kb3cuaW5uZXJXaWR0aDt0aGlzLmxpc3RlbmVyPWZ1bmN0aW9uKHQpe2UudGh1bWJzSW5uZXJXaWR0aD5zJiZvLmkmJmkucnVuQWN0aW9ucyh0KX19ZnVuY3Rpb24gUih0KXt2YXIgZT10LmRhdGEsbj10LmNvcmUsbz1uLnNsaWRlSW5kZXhDaGFuZ2VyLGk9bi50aHVtYnNUcmFuc2Zvcm1UcmFuc2l0aW9uZXIscz1uLnBvaW50ZXJpbmdCdWNrZXQscj10LmVsZW1lbnRzLGE9dC50aHVtYnNTd2lwaW5nUHJvcHMsYz1yLnRodW1ic1dyYXBwZXJzO3RoaXMucnVuTm9Td2lwZUFjdGlvbnNGb3JFdmVudD1mdW5jdGlvbih0KXtNKHIudGh1bWJzQ29udGFpbmVyLHIudGh1bWJzQ3Vyc29yZXIpLGEuaT0hMTtmb3IodmFyIGU9MDtlPGMubGVuZ3RoO2UrKylpZihjW2VdJiZjW2VdLmNvbnRhaW5zKHQudGFyZ2V0KSlyZXR1cm4gdm9pZCBvLmp1bXBUbyhlKX0sdGhpcy5ydW5BY3Rpb25zPWZ1bmN0aW9uKCl7aWYoTShyLnRodW1ic0NvbnRhaW5lcixyLnRodW1ic0N1cnNvcmVyKSxlLnRodW1ic1RyYW5zZm9ybSs9YS5zd2lwZWRYLHMucnVuU3dpcGluZ1RvcEFjdGlvbnNGb3JQcm9wc0FuZEV2ZW50KGEpLGUudGh1bWJzVHJhbnNmb3JtPjApcmV0dXJuIHUoMCk7ZS50aHVtYnNUcmFuc2Zvcm08aW5uZXJXaWR0aC1lLnRodW1ic0lubmVyV2lkdGgtOSYmdShpbm5lcldpZHRoLWUudGh1bWJzSW5uZXJXaWR0aC05KX07dmFyIHU9ZnVuY3Rpb24odCl7ZS50aHVtYnNUcmFuc2Zvcm09dCxpLmNhbGxBY3Rpb25XaXRoVHJhbnNpdGlvbigoZnVuY3Rpb24oKXtyLnRodW1ic0lubmVyLnN0eWxlLnRyYW5zZm9ybT1cInRyYW5zbGF0ZVgoXCIuY29uY2F0KHQsXCJweClcIil9KSl9fWZ1bmN0aW9uIHEodCl7dmFyIGU9dC5yZXNvbHZlLG49dC50aHVtYnNTd2lwaW5nUHJvcHMsbz1lKFIpO3RoaXMubGlzdGVuZXI9ZnVuY3Rpb24odCl7bi5pJiYobi5zd2lwZWRYP28ucnVuQWN0aW9ucygpOm8ucnVuTm9Td2lwZUFjdGlvbnNGb3JFdmVudCh0KSl9fWZ1bmN0aW9uIFgodCl7dmFyIGU9dC5tLG49dC5wcm9wcyxvPXQucixpPXQudWkscz1vKHEpLHI9byhQKSxhPWZ1bmN0aW9uKCl7dmFyIHQ9ITE7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIXQmJih0PSEwLHJlcXVlc3RBbmltYXRpb25GcmFtZSgoZnVuY3Rpb24oKXt0PSExfSkpLCEwKX19KCk7dGhpcy5tPWZ1bmN0aW9uKG8pe2kucXBzKCksdC5wLmkmJmUoQixEKShvKSxuLmRpc2FibGVUaHVtYnN8fHIubGlzdGVuZXIobyl9LHRoaXMudT1mdW5jdGlvbihlKXshZnVuY3Rpb24odCxlKXt2YXIgbj10LnAsbz10LnIsaT10Lnoscz10Lnp2LHI9byhIKTtuLnA9e30sbi5pJiYobi5pc1BpbmNoaW5nfHwobi5zd2lwZWRYP3IucygpOnIubihlKSksci5hKCksczwxJiYoaS56KDEpLGkuZSgpKSl9KHQsZSksbi5kaXNhYmxlVGh1bWJzfHxzLmxpc3RlbmVyKGUpLGkucXBzKCl9LHRoaXMudz1mdW5jdGlvbihlKXt0LnAuaXx8KGkucXBzKCksYSgpJiZmdW5jdGlvbih0LGUpe3ZhciBuPXQueixvPXQuenY7aWYoMT09PW8pe2lmKGUuZGVsdGFZPjApcmV0dXJuO24uYigpfXZhciBpPS4xKm8scz1vO2UuZGVsdGFZPDA/cys9aToocy09aSk8MSYmKHM9MSksbi56KHMpLDE9PT1zJiZuLmUoKX0odCxlKSl9fWZ1bmN0aW9uIFkodCxlKXt2YXIgbj10LmNvcmUsaT1uLmNsaWNrWm9vbWVyLHM9bi5saWdodGJveENsb3NlcixyPW4uc2xpZGVDaGFuZ2VGYWNhZGUsYT1uLnRodW1ic1RvZ2dsZXIsYz10LmZzLHU9KHQubWlkZGxld2FyZSx0LnByb3BzKSxsPXQuc3M7aWYodC51aS5xcHMoKSxcIlNwYWNlXCIhPT1lLmNvZGUpc3dpdGNoKGUua2V5KXtjYXNlXCJFc2NhcGVcIjpzLmNsb3NlKCk7YnJlYWs7Y2FzZVwiQXJyb3dMZWZ0XCI6ci5jaGFuZ2VUb1ByZXZpb3VzKCk7YnJlYWs7Y2FzZVwiQXJyb3dSaWdodFwiOnIuY2hhbmdlVG9OZXh0KCk7YnJlYWs7Y2FzZVwidFwiOnUuZGlzYWJsZVRodW1ic3x8YS50b2dnbGVUaHVtYnMoKTticmVhaztjYXNlXCIrXCI6by5wLml8fGkuem9vbUluKCk7YnJlYWs7Y2FzZVwiLVwiOm8ucC5pfHxpLnpvb21PdXQoKTticmVhaztjYXNlXCJGMTFcIjplLnByZXZlbnREZWZhdWx0KCksYy50KCl9ZWxzZSBsLnQoKX1mdW5jdGlvbiBqKHQsZSxvLGkscyl7dmFyIHI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcInN2Z1wiKTtyLnNldEF0dHJpYnV0ZU5TKG51bGwsXCJ3aWR0aFwiLGUpLHIuc2V0QXR0cmlidXRlTlMobnVsbCxcImhlaWdodFwiLGUpLHIuc2V0QXR0cmlidXRlTlMobnVsbCxcInZpZXdCb3hcIixpKTt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwicGF0aFwiKTtyZXR1cm4gYS5zZXRBdHRyaWJ1dGVOUyhudWxsLFwiY2xhc3NcIixcIlwiLmNvbmNhdChuLFwic3ZnLXBhdGhcIikpLGEuc2V0QXR0cmlidXRlTlMobnVsbCxcImRcIixzKSxyLmFwcGVuZENoaWxkKGEpLHQuYXBwZW5kQ2hpbGQocikscn1mdW5jdGlvbiBWKHQsZSl7dmFyIG89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gby5jbGFzc05hbWU9XCJcIi5jb25jYXQobixcInRvb2xiYXItYnV0dG9uIFwiKS5jb25jYXQociksby50aXRsZT1lLHQuYXBwZW5kQ2hpbGQobyksb31mdW5jdGlvbiBVKHQsZSxuKXt2YXIgbz1WKHQsZS50aXRsZSk7by5vbmNsaWNrPW4saihvLGUud2lkdGgsZS5oZWlnaHQsZS52aWV3Qm94LGUuZCl9ZnVuY3Rpb24gWih0KXt2YXIgZT10LnByb3BzLnNvdXJjZXMsbz10LmVsZW1lbnRzLGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtvLm5hdj1pLGkuY2xhc3NOYW1lPVwiXCIuY29uY2F0KG4sXCJuYXZcIiksby5jb250YWluZXIuYXBwZW5kQ2hpbGQoaSksZnVuY3Rpb24odCxlKXt2YXIgbz10LmNvcmUsaT1vLmNsaWNrWm9vbWVyLHM9aS56b29tSW4scj1pLnpvb21PdXQsYT1vLmxpZ2h0Ym94Q2xvc2VyLmNsb3NlLGM9by50aHVtYnNUb2dnbGVyLHU9dC5wcm9wcyxsPXUuY3VzdG9tVG9vbGJhckJ1dHRvbnMsZD11LmRpc2FibGVUaHVtYnMsaD11LnRvb2xiYXJCdXR0b25zLGY9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtmLmNsYXNzTmFtZT1cIlwiLmNvbmNhdChuLFwidG9vbGJhclwiKSxlLmFwcGVuZENoaWxkKGYpO2Zvcih2YXIgcD1mdW5jdGlvbihlKXtVKGYsbFtlXSwoZnVuY3Rpb24oKXtyZXR1cm4gbFtlXS5vbkNsaWNrKHQpfSkpfSxtPTA7bTxsLmxlbmd0aDttKyspcChtKTtkfHxVKGYsaC50aHVtYnMsYy50b2dnbGVUaHVtYnMpLFUoZixoLnpvb21JbixzKSxVKGYsaC56b29tT3V0LHIpLGZ1bmN0aW9uKHQsZSl7dmFyIG49dC5wcm9wcy50b29sYmFyQnV0dG9ucy5zbGlkZXNob3csbz1uLnN0YXJ0LGk9bi5wYXVzZSxzPXQuc3Mscj1WKGUsby50aXRsZSk7ci5vbmNsaWNrPXMudDt2YXIgYT1qKHIsby53aWR0aCxvLmhlaWdodCxvLnZpZXdCb3gsby5kKTtmdW5jdGlvbiBjKHQpe3IudGl0bGU9dC50aXRsZSxhLnNldEF0dHJpYnV0ZU5TKG51bGwsXCJ3aWR0aFwiLHQud2lkdGgpLGEuc2V0QXR0cmlidXRlTlMobnVsbCxcImhlaWdodFwiLHQuaGVpZ2h0KSxhLnNldEF0dHJpYnV0ZU5TKG51bGwsXCJ2aWV3Qm94XCIsdC52aWV3Qm94KSxhLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlTlMobnVsbCxcImRcIix0LmQpfXQuc3NzPWZ1bmN0aW9uKCl7YyhpKX0sdC5zc3g9ZnVuY3Rpb24oKXtjKG8pfX0odCxmKSxmdW5jdGlvbih0LGUpe3ZhciBuPXQuY29tcG9uZW50c1NlcnZpY2VzLG89dC5kYXRhLGk9dC5mcyxzPXQucHJvcHMudG9vbGJhckJ1dHRvbnMuZnVsbHNjcmVlbixyPXMuZW50ZXIsYT1zLmV4aXQsYz1WKGUsci50aXRsZSksdT1qKGMsci53aWR0aCxyLmhlaWdodCxyLnZpZXdCb3gsci5kKTtmdW5jdGlvbiBsKHQpe2MudGl0bGU9dC50aXRsZSx1LnNldEF0dHJpYnV0ZU5TKG51bGwsXCJ3aWR0aFwiLHQud2lkdGgpLHUuc2V0QXR0cmlidXRlTlMobnVsbCxcImhlaWdodFwiLHQuaGVpZ2h0KSx1LnNldEF0dHJpYnV0ZU5TKG51bGwsXCJ2aWV3Qm94XCIsdC52aWV3Qm94KSx1LmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlTlMobnVsbCxcImRcIix0LmQpfW4ub2ZzPWZ1bmN0aW9uKCl7by5pZnM9ITAsbChhKX0sbi54ZnM9ZnVuY3Rpb24oKXtvLmlmcz0hMSxsKHIpfSxjLm9uY2xpY2s9aS50fSh0LGYpLFUoZixoLmNsb3NlLGEpfSh0LGkpLGUubGVuZ3RoPjEmJmZ1bmN0aW9uKHQsZSl7dmFyIG89dC5jb21wb25lbnRzU2VydmljZXMsaT10LnByb3BzLnNvdXJjZXMscz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3MuY2xhc3NOYW1lPVwiXCIuY29uY2F0KG4sXCJzbGlkZS1udW1iZXItY29udGFpbmVyXCIpO3ZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7YS5jbGFzc05hbWU9cjt2YXIgYz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtvLnNldFNsaWRlTnVtYmVyPWZ1bmN0aW9uKHQpe3JldHVybiBjLmlubmVySFRNTD10fTt2YXIgdT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTt1LmNsYXNzTmFtZT1cIlwiLmNvbmNhdChuLFwic2xhc2hcIik7dmFyIGw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtsLmlubmVySFRNTD1pLmxlbmd0aCxzLmFwcGVuZENoaWxkKGEpLGEuYXBwZW5kQ2hpbGQoYyksYS5hcHBlbmRDaGlsZCh1KSxhLmFwcGVuZENoaWxkKGwpLGUuYXBwZW5kQ2hpbGQocyksc2V0VGltZW91dCgoZnVuY3Rpb24oKXthLm9mZnNldFdpZHRoPjU1JiYocy5zdHlsZS5qdXN0aWZ5Q29udGVudD1cImZsZXgtc3RhcnRcIil9KSl9KHQsaSl9ZnVuY3Rpb24gXyh0LGUpe3ZhciBuPXQuYyxvPXQuY29yZS5wb2ludGVyaW5nQnVja2V0LGk9dC5lbGVtZW50cy5zb3VyY2VzLHM9dC5wLHI9dC5zbXcsYT10LnN0YWdlSW5kZXhlcyxjPXQuc3djLHU9dC56LGw9dC56djtpZihcInRvdWNoXCIhPT1lLnBvaW50ZXJUeXBlJiZcIklNR1wiPT09ZS50YXJnZXQudGFnTmFtZSYmZS5wcmV2ZW50RGVmYXVsdCgpLG8ucnVuU3dpcGluZ0Rvd25BY3Rpb25zRm9yUHJvcHNBbmRFdmVudChzLGUpLHMuZG93blNjcmVlblk9ZS5zY3JlZW5ZLDI9PT1zLnBjKXMuaXNQaW5jaGluZz0hMCxzLnBpbmNoZWRIeXBvdD1OKHMpLGMuY2xhc3NMaXN0LmFkZChcImZzbGlnaHRib3hzd2NwXCIpLDE9PT1sJiZ1LmIoKTtlbHNlIGZvcih2YXIgZD0wO2Q8bjtkKyspcltkXS5kKCk7dmFyIGg9aVthLmN1cnJlbnRdO3Muc2Q9aCYmaC5jb250YWlucyhlLnRhcmdldCl9ZnVuY3Rpb24gSih0KXt2YXIgZT1cImZzbGlnaHRib3gtbG9hZGVyXCIsbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO24uY2xhc3NOYW1lPWU7Zm9yKHZhciBvPTA7bzwzO28rKyl7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpLmNsYXNzTmFtZT1cIlwiLmNvbmNhdChlLFwiLWNoaWxkXCIpLG4uYXBwZW5kQ2hpbGQoaSl9cmV0dXJuIHQuYXBwZW5kQ2hpbGQobiksbn1mdW5jdGlvbiBHKHQsZSl7dmFyIG49dC5zbXcsbz10LnN0LGk9dC5zd2MsYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLHU9XCJcIi5jb25jYXQoYyxcIiBcIikuY29uY2F0KHMsXCIgXCIpLmNvbmNhdChyKSxsPTAsZD0wLGg9MDtmdW5jdGlvbiBmKHQpe2w9dCtkLGEuc3R5bGUudHJhbnNmb3JtPVwidHJhbnNsYXRlKFwiLmNvbmNhdChsLFwicHgsXCIpLmNvbmNhdChoLFwicHgpXCIpLGQ9MH1mdW5jdGlvbiBwKCl7cmV0dXJuKDErdC5wcm9wcy5zbGlkZURpc3RhbmNlKSppbm5lcldpZHRofWEuY2xhc3NOYW1lPXUsYS5zPWZ1bmN0aW9uKCl7YS5zdHlsZS5kaXNwbGF5PVwiZmxleFwifSxhLmg9ZnVuY3Rpb24oKXthLnN0eWxlLmRpc3BsYXk9XCJub25lXCJ9LGEuYT1mdW5jdGlvbigpe2EuY2xhc3NMaXN0LmFkZChcImZzbGlnaHRib3h0dFwiKX0sYS5kPWZ1bmN0aW9uKCl7YS5jbGFzc0xpc3QucmVtb3ZlKFwiZnNsaWdodGJveHR0XCIpfSxhLm49ZnVuY3Rpb24oKXthLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidHJhbnNmb3JtXCIpfSxhLnY9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZD10LHZvaWQgMCE9PWUmJihoPWUpLGF9LGEuZ3g9ZnVuY3Rpb24oKXtyZXR1cm4gbH0sYS5neT1mdW5jdGlvbigpe3JldHVybiBofSxhLm5lPWZ1bmN0aW9uKCl7ZigtcCgpKX0sYS56PWZ1bmN0aW9uKCl7ZigwKX0sYS5wPWZ1bmN0aW9uKCl7ZihwKCkpfSxpLmFwcGVuZENoaWxkKGEpLG8uaShlKXx8YS5oKCksbltlXT1hLGZ1bmN0aW9uKHQsZSl7dmFyIG49dC5zbXcsbz10LnNldyxpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7bltlXS5hcHBlbmRDaGlsZChpKSxvW2VdPWksZnVuY3Rpb24odCxlKXt2YXIgbj10LnNhdyxvPXQuc2V3LGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtKKGkpLG9bZV0uYXBwZW5kQ2hpbGQoaSksbltlXT1pfSh0LGUpfSh0LGUpfWZ1bmN0aW9uICQodCl7dmFyIGU9dC5jLG49dC5lbGVtZW50cyxvPXQubSxpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aS5jbGFzc05hbWU9XCJmc2xpZ2h0Ym94c3djIFwiLmNvbmNhdChjLFwiIFwiKS5jb25jYXQocyksbi5jb250YWluZXIuYXBwZW5kQ2hpbGQoaSksaS5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIixvKF8sRCkpLHQuc3djPWk7Zm9yKHZhciByPTA7cjxlO3IrKylHKHQscil9ZnVuY3Rpb24gSyh0LGUpe3ZhciBuPXQuZGF0YS5pc1RodW1iaW5nLG89dC5lbGVtZW50cyxpPW8uY2FwdGlvbnMscz1vLmNvbnRhaW5lcixhPXQucHJvcHMuY2FwdGlvbnMsYz10LnN0YWdlSW5kZXhlcy5jdXJyZW50LHU9dC50YyxsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksZD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLGg9XCJmc2xpZ2h0Ym94YyBcIi5jb25jYXQocik7KGMhPT1lfHxuJiYhdSkmJihoKz1cIiBmc2xpZ2h0Ym94eFwiKSxsLmNsYXNzTmFtZT1oLGQuY2xhc3NOYW1lPVwiZnNsaWdodGJveGNpXCIsZC5pbm5lckhUTUw9YVtlXSxsLmFwcGVuZENoaWxkKGQpLGlbZV09bCxzLmFwcGVuZENoaWxkKGwpfWZ1bmN0aW9uIFEodCxlKXt2YXIgbj10LmNvcmUuc2xpZGVDaGFuZ2VGYWNhZGUsbz10LmVsZW1lbnRzLGk9dC5wcm9wcy5zbGlkZUJ1dHRvbnMscz1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Uuc2xpY2UoMSksYT1cInNsaWRlQnV0dG9uXCIuY29uY2F0KHMpLGM9aVtlXTtvW2FdPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksb1thXS5jbGFzc05hbWU9XCJcIi5jb25jYXQoZCxcIiBcIikuY29uY2F0KGQsXCItXCIpLmNvbmNhdChlKSxvW2FdLnRpdGxlPWMudGl0bGUsb1thXS5vbmNsaWNrPW5bXCJjaGFuZ2VUb1wiLmNvbmNhdChzKV0sZnVuY3Rpb24odCxlKXt2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO24uY2xhc3NOYW1lPVwiXCIuY29uY2F0KGwsXCIgXCIpLmNvbmNhdChyKSxqKG4sZS53aWR0aCxlLmhlaWdodCxlLnZpZXdCb3gsZS5kKSx0LmFwcGVuZENoaWxkKG4pfShvW2FdLGMpLG8uY29udGFpbmVyLmFwcGVuZENoaWxkKG9bYV0pfVwib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIGRvY3VtZW50P1widW5kZWZpbmVkXCI6TChkb2N1bWVudCkpJiYoKGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpKS5jbGFzc05hbWU9aSxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiLmZzbGlnaHRib3gtZmFkZS1pbnthbmltYXRpb246ZnNsaWdodGJveC1mYWRlLWluIC4zcyBjdWJpYy1iZXppZXIoMCwwLC43LDEpfS5mc2xpZ2h0Ym94LWZhZGUtb3V0e2FuaW1hdGlvbjpmc2xpZ2h0Ym94LWZhZGUtb3V0IC4zcyBlYXNlfS5mc2xpZ2h0Ym94LWZhZGUtaW4tc3Ryb25ne2FuaW1hdGlvbjpmc2xpZ2h0Ym94LWZhZGUtaW4tc3Ryb25nIGZvcndhcmRzIC4zcyBjdWJpYy1iZXppZXIoMCwwLC43LDEpfS5mc2xpZ2h0Ym94LWZhZGUtb3V0LXN0cm9uZ3thbmltYXRpb246ZnNsaWdodGJveC1mYWRlLW91dC1zdHJvbmcgLjNzIGVhc2V9QGtleWZyYW1lcyBmc2xpZ2h0Ym94LWZhZGUtaW57ZnJvbXtvcGFjaXR5Oi42NX10b3tvcGFjaXR5OjF9fUBrZXlmcmFtZXMgZnNsaWdodGJveC1mYWRlLW91dHtmcm9te29wYWNpdHk6LjM1fXRve29wYWNpdHk6MH19QGtleWZyYW1lcyBmc2xpZ2h0Ym94LWZhZGUtaW4tc3Ryb25ne2Zyb217b3BhY2l0eTouM310b3tvcGFjaXR5OjF9fUBrZXlmcmFtZXMgZnNsaWdodGJveC1mYWRlLW91dC1zdHJvbmd7ZnJvbXtvcGFjaXR5OjF9dG97b3BhY2l0eTowfX0uZnNsaWdodGJveC1hYnNvbHV0ZWR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowfS5mc2xpZ2h0Ym94Y2d7Y3Vyc29yOmdyYWJiaW5nIWltcG9ydGFudH0uZnNsaWdodGJveC1mdWxsLWRpbWVuc2lvbnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5mc2xpZ2h0Ym94LW9wZW57b3ZlcmZsb3c6aGlkZGVuO2hlaWdodDoxMDAlfS5mc2xpZ2h0Ym94LWZsZXgtY2VudGVyZWR7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS5mc2xpZ2h0Ym94LW9wYWNpdHktMHtvcGFjaXR5OjAhaW1wb3J0YW50fS5mc2xpZ2h0Ym94LW9wYWNpdHktMXtvcGFjaXR5OjEhaW1wb3J0YW50fS5mc2xpZ2h0Ym94eHtvcGFjaXR5OjAhaW1wb3J0YW50O3otaW5kZXg6LTEhaW1wb3J0YW50fS5mc2xpZ2h0Ym94LXNjcm9sbGJhcmZpeHtwYWRkaW5nLXJpZ2h0OjE3cHh9LmZzbGlnaHRib3h0dHt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3MhaW1wb3J0YW50fS5mc2xpZ2h0Ym94LWNvbnRhaW5lcntmb250LWZhbWlseTpBcmlhbCxzYW5zLXNlcmlmO3Bvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudChyZ2JhKDMwLDMwLDMwLC45KSwjMDAwIDE4MTAlKTt0b3VjaC1hY3Rpb246bm9uZTt6LWluZGV4OjEwMDAwMDAwMDA7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjp0cmFuc3BhcmVudH0uZnNsaWdodGJveC1jb250YWluZXIgKntib3gtc2l6aW5nOmJvcmRlci1ib3h9LmZzbGlnaHRib3gtc3ZnLXBhdGh7dHJhbnNpdGlvbjpmaWxsIC4xNXMgZWFzZTtmaWxsOiNkMWQyZDJ9LmZzbGlnaHRib3gtbG9hZGVye2Rpc3BsYXk6YmxvY2s7bWFyZ2luOmF1dG87cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjUwJTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7d2lkdGg6NjdweDtoZWlnaHQ6NjdweH0uZnNsaWdodGJveC1sb2FkZXItY2hpbGR7Ym94LXNpemluZzpib3JkZXItYm94O2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6NTRweDtoZWlnaHQ6NTRweDttYXJnaW46NnB4O2JvcmRlcjo1cHggc29saWQ7Ym9yZGVyLWNvbG9yOiM5OTkgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJhZGl1czo1MCU7YW5pbWF0aW9uOmZzbGlnaHRib3gtbG9hZGVyIDEuMnMgY3ViaWMtYmV6aWVyKC41LDAsLjUsMSkgaW5maW5pdGV9LmZzbGlnaHRib3gtbG9hZGVyLWNoaWxkOm50aC1jaGlsZCgxKXthbmltYXRpb24tZGVsYXk6LS40NXN9LmZzbGlnaHRib3gtbG9hZGVyLWNoaWxkOm50aC1jaGlsZCgyKXthbmltYXRpb24tZGVsYXk6LS4zc30uZnNsaWdodGJveC1sb2FkZXItY2hpbGQ6bnRoLWNoaWxkKDMpe2FuaW1hdGlvbi1kZWxheTotLjE1c31Aa2V5ZnJhbWVzIGZzbGlnaHRib3gtbG9hZGVyezAle3RyYW5zZm9ybTpyb3RhdGUoMCl9MTAwJXt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fS5mc2xpZ2h0Ym94LXRodW1icy1sb2FkZXJ7d2lkdGg6NTRweCFpbXBvcnRhbnQ7aGVpZ2h0OjU0cHghaW1wb3J0YW50fS5mc2xpZ2h0Ym94LXRodW1icy1sb2FkZXIgZGl2e2JvcmRlci13aWR0aDo0cHghaW1wb3J0YW50O3dpZHRoOjQ0cHghaW1wb3J0YW50O2hlaWdodDo0NHB4IWltcG9ydGFudH0uZnNsaWdodGJveC1uYXZ7aGVpZ2h0OjQ1cHg7d2lkdGg6MTAwJTt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzfS5mc2xpZ2h0Ym94LXNsaWRlLW51bWJlci1jb250YWluZXJ7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDoxMDAlO2ZvbnQtc2l6ZToxNXB4O2NvbG9yOiNkN2Q3ZDc7ei1pbmRleDowO21heC13aWR0aDo1NXB4O3RleHQtYWxpZ246bGVmdH0uZnNsaWdodGJveC1zbGlkZS1udW1iZXItY29udGFpbmVyIC5mc2xpZ2h0Ym94LWZsZXgtY2VudGVyZWR7aGVpZ2h0OjEwMCV9LmZzbGlnaHRib3gtc2xhc2h7ZGlzcGxheTpibG9jazttYXJnaW46MCA1cHg7d2lkdGg6MXB4O2hlaWdodDoxMnB4O3RyYW5zZm9ybTpyb3RhdGUoMTVkZWcpO2JhY2tncm91bmQ6I2ZmZn0uZnNsaWdodGJveC10b29sYmFye3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MjtyaWdodDowO3RvcDowO2hlaWdodDo0NXB4O2Rpc3BsYXk6ZmxleDtiYWNrZ3JvdW5kOnJnYmEoMzUsMzUsMzUsLjY1KX0uZnNsaWdodGJveC10b29sYmFyLWJ1dHRvbntoZWlnaHQ6MTAwJTt3aWR0aDo0NXB4O2N1cnNvcjpwb2ludGVyfS5mc2xpZ2h0Ym94LXRvb2xiYXItYnV0dG9uOmhvdmVyIC5mc2xpZ2h0Ym94LXN2Zy1wYXRoe2ZpbGw6I2ZmZn0uZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7cGFkZGluZzoxMnB4IDEycHggMTJweCA2cHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtjdXJzb3I6cG9pbnRlcjt6LWluZGV4OjI7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNpdGlvbjpvcGFjaXR5IC4zc31AbWVkaWEgKG1pbi13aWR0aDo0NzZweCl7LmZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lcntwYWRkaW5nOjIycHggMjJweCAyMnB4IDZweH19QG1lZGlhIChtaW4td2lkdGg6NzY4cHgpey5mc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXJ7cGFkZGluZzozMHB4IDMwcHggMzBweCA2cHh9fS5mc2xpZ2h0Ym94LXNsaWRlLWJ0bi1jb250YWluZXI6aG92ZXIgLmZzbGlnaHRib3gtc3ZnLXBhdGh7ZmlsbDojZjFmMWYxfS5mc2xpZ2h0Ym94LXNsaWRlLWJ0bntwYWRkaW5nOjlweDtmb250LXNpemU6MjZweDtiYWNrZ3JvdW5kOnJnYmEoMzUsMzUsMzUsLjY1KX1AbWVkaWEgKG1pbi13aWR0aDo3NjhweCl7LmZzbGlnaHRib3gtc2xpZGUtYnRue3BhZGRpbmc6MTBweH19QG1lZGlhIChtaW4td2lkdGg6MTYwMHB4KXsuZnNsaWdodGJveC1zbGlkZS1idG57cGFkZGluZzoxMXB4fX0uZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyLXByZXZpb3Vze2xlZnQ6MH1AbWVkaWEgKG1heC13aWR0aDo0NzUuOTlweCl7LmZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lci1wcmV2aW91c3twYWRkaW5nLWxlZnQ6M3B4fX0uZnNsaWdodGJveC1zbGlkZS1idG4tY29udGFpbmVyLW5leHR7cmlnaHQ6MDtwYWRkaW5nLWxlZnQ6MTJweDtwYWRkaW5nLXJpZ2h0OjNweH1AbWVkaWEgKG1pbi13aWR0aDo0NzZweCl7LmZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lci1uZXh0e3BhZGRpbmctbGVmdDoyMnB4fX1AbWVkaWEgKG1pbi13aWR0aDo3NjhweCl7LmZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lci1uZXh0e3BhZGRpbmctbGVmdDozMHB4fX1AbWVkaWEgKG1pbi13aWR0aDo0NzZweCl7LmZzbGlnaHRib3gtc2xpZGUtYnRuLWNvbnRhaW5lci1uZXh0e3BhZGRpbmctcmlnaHQ6NnB4fX0uZnNsaWdodGJveGh7ei1pbmRleDozfS5mc2xpZ2h0Ym94c3N7d2lkdGg6MDtoZWlnaHQ6MnB4O3otaW5kZXg6MztvcGFjaXR5OjA7YmFja2dyb3VuZDojZmZmfS5mc2xpZ2h0Ym94aW57Zm9udC1zaXplOjI0cHg7Y29sb3I6I2VhZWJlYjttYXJnaW46YXV0b30uZnNsaWdodGJveC12aWRlb3tvYmplY3QtZml0OmNvdmVyfS5mc2xpZ2h0Ym94eXR7Ym9yZGVyOjB9LmZzbGlnaHRib3hze3Bvc2l0aW9uOnJlbGF0aXZlO3otaW5kZXg6MztkaXNwbGF5OmJsb2NrO29wYWNpdHk6MDttYXJnaW46YXV0bztjdXJzb3I6em9vbS1pbn0uZnNsaWdodGJveHN3Y3t6LWluZGV4OjE7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzIGxpbmVhcn0uZnNsaWdodGJveHN3Y3B7dHJhbnNpdGlvbjpub25lIWltcG9ydGFudH0uZnNsaWdodGJveC10aHVtYnN7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjA7bGVmdDowO3dpZHRoOjEwMCU7ei1pbmRleDoyO2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDE4MGRlZyxyZ2JhKDAsMCwwLDApLCMxZTFlMWUgMTAwJSk7dHJhbnNpdGlvbjpvcGFjaXR5IC4ycztwYWRkaW5nOjAgNXB4IDEycHggNXB4O2hlaWdodDoxMTRweH1AbWVkaWEgKG1pbi13aWR0aDo5OTJweCl7LmZzbGlnaHRib3gtdGh1bWJze3BhZGRpbmctYm90dG9tOjEzcHg7aGVpZ2h0OjEyMHB4fX1AbWVkaWEgKG1pbi13aWR0aDoxNjAwcHgpey5mc2xpZ2h0Ym94LXRodW1ic3twYWRkaW5nLWJvdHRvbToxNHB4O2hlaWdodDoxMjZweH19LmZzbGlnaHRib3gtdGh1bWJzLWlubmVye2Rpc3BsYXk6aW5saW5lLWZsZXg7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnQ7YWxpZ24taXRlbXM6Y2VudGVyO2hlaWdodDoxMDAlfS5mc2xpZ2h0Ym94LXRodW1iLXdyYXBwZXJ7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjEwMCU7bWFyZ2luOjAgNHB4O29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzfS5mc2xpZ2h0Ym94LXRodW1iLXdyYXBwZXIgc3Zne3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO2N1cnNvcjpwb2ludGVyO3otaW5kZXg6MX0uZnNsaWdodGJveC10aHVtYi13cmFwcGVyIHBhdGh7ZmlsbDojZmZmfS5mc2xpZ2h0Ym94dGR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjJweDtsZWZ0OjJweDt3aWR0aDpjYWxjKDEwMCUgLSA0cHgpO2hlaWdodDpjYWxjKDEwMCUgLSA0cHgpO2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuNCk7Y3Vyc29yOnBvaW50ZXJ9LmZzbGlnaHRib3gtdGh1bWJ7Y3Vyc29yOnBvaW50ZXI7Ym9yZGVyLXJhZGl1czoxcHg7aGVpZ2h0OjEwMCU7d2lkdGg6YXV0byFpbXBvcnRhbnQ7Ym9yZGVyOjJweCBzb2xpZCB0cmFuc3BhcmVudDttYXgtd2lkdGg6dW5zZXQ7bWF4LWhlaWdodDp1bnNldH0uZnNsaWdodGJveHRhe2JvcmRlcjoycHggc29saWQgI2ZmZiFpbXBvcnRhbnR9LmZzbGlnaHRib3gtdGh1bWItaW52YWxpZHtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIzBmMGYwZixyZ2JhKDE1LDE1LDE1LC41KSk7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWluLXdpZHRoOjE1NXB4fS5mc2xpZ2h0Ym94LXRodW1icy1jdXJzb3Jlcnt6LWluZGV4OjM7Y3Vyc29yOmdyYWJiaW5nfS5mc2xpZ2h0Ym94Y3twb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MDtsZWZ0OjUwJTt3aWR0aDoxMDAlO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpO3RyYW5zaXRpb246b3BhY2l0eSAuMnMsdHJhbnNmb3JtIC4zczt6LWluZGV4OjI7dXNlci1zZWxlY3Q6dGV4dH0uZnNsaWdodGJveGM6YWZ0ZXJ7Y29udGVudDonJztwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4Oi0xO3RvcDowO2xlZnQ6MDtvcGFjaXR5OjE7dHJhbnNpdGlvbjpvcGFjaXR5IDFzO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLHJnYmEoMCwwLDAsMCksIzFlMWUxZSAxMDAlKX0uZnNsaWdodGJveGNpe3BhZGRpbmc6MjBweCAyNXB4IDMwcHggMjVweDttYXgtd2lkdGg6MTIwMHB4O2NvbG9yOiNlZWU7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjE0cHh9LmZzbGlnaHRib3hjdHt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTEwMXB4KX0uZnNsaWdodGJveGN0OmFmdGVye29wYWNpdHk6MDt0cmFuc2l0aW9uOm5vbmV9QG1lZGlhKG1pbi13aWR0aDo5OTJweCl7LmZzbGlnaHRib3hjdHt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTEwNnB4KX19XCIpKSxkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGUpKTt2YXIgdHQ9XCJmc2xpZ2h0Ym94LXR5cGVzXCI7ZnVuY3Rpb24gZXQodCl7dmFyIGUsbj10LnByb3BzLG89MCxpPXt9O3RoaXMuZ2V0U291cmNlVHlwZUZyb21Mb2NhbFN0b3JhZ2VCeVVybD1mdW5jdGlvbih0KXtyZXR1cm4gZVt0XT9lW3RdOnModCl9LHRoaXMuaGFuZGxlUmVjZWl2ZWRTb3VyY2VUeXBlRm9yVXJsPWZ1bmN0aW9uKHQsbil7aWYoITE9PT1pW25dJiYoby0tLFwiaW52YWxpZFwiIT09dD9pW25dPXQ6ZGVsZXRlIGlbbl0sMD09PW8pKXshZnVuY3Rpb24odCxlKXtmb3IodmFyIG4gaW4gZSl0W25dPWVbbl19KGUsaSk7dHJ5e2xvY2FsU3RvcmFnZS5zZXRJdGVtKHR0LEpTT04uc3RyaW5naWZ5KGUpKX1jYXRjaCh0KXt9fX07dmFyIHM9ZnVuY3Rpb24odCl7bysrLGlbdF09ITF9O2lmKG4uZGlzYWJsZUxvY2FsU3RvcmFnZSl0aGlzLmdldFNvdXJjZVR5cGVGcm9tTG9jYWxTdG9yYWdlQnlVcmw9ZnVuY3Rpb24oKXt9LHRoaXMuaGFuZGxlUmVjZWl2ZWRTb3VyY2VUeXBlRm9yVXJsPWZ1bmN0aW9uKCl7fTtlbHNle3RyeXtlPUpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odHQpKX1jYXRjaCh0KXt9ZXx8KGU9e30sdGhpcy5nZXRTb3VyY2VUeXBlRnJvbUxvY2FsU3RvcmFnZUJ5VXJsPXMpfX12YXIgbnQ9XCJpbWFnZVwiLG90PVwidmlkZW9cIixpdD1cInlvdXR1YmVcIixzdD1cImN1c3RvbVwiLHJ0PVwiaW52YWxpZFwiO2Z1bmN0aW9uIGF0KHQsZSxuLG8pe3ZhciBpPXRoaXMscz0odC5kYXRhLHQuZWxlbWVudHMuc291cmNlcykscj1uL28sYT0wLGM9bnVsbDt0aGlzLnM9ZnVuY3Rpb24oKXt2YXIgdD1zW2VdLnN0eWxlO2M9aS5nKCksdC53aWR0aD1cIlwiLmNvbmNhdChjWzBdLFwicHhcIiksdC5oZWlnaHQ9XCJcIi5jb25jYXQoY1sxXSxcInB4XCIpfSx0aGlzLmc9ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06dC5taCxpPXQubXc7cmV0dXJuKGE9aS9yKTxlPyhuPGkmJihhPW8pLFthKnIsYV0pOlsoYT1vPmU/ZTpvKSpyLGFdfSx0aGlzLmQ9ZnVuY3Rpb24oKXtyZXR1cm4gY319ZnVuY3Rpb24gY3QodCxlKXt2YXIgbj10aGlzLG89dC5lbGVtZW50cy5zb3VyY2VzLGk9dC5pc2wscz10LmxhLHI9dC5wcm9wcy5pbml0aWFsQW5pbWF0aW9uLGE9dC5yZXNvbHZlLGM9dC5zYXcsbD10LnNldyxkPXQuc3o7ZnVuY3Rpb24gaCh0LG4pe2RbZV09YShhdCxbZSx0LG5dKSxkW2VdLnMoKX10aGlzLmE9ZnVuY3Rpb24odCxhKXtpW2VdPSEwLG9bZV0uY2xhc3NMaXN0LmFkZCh1KSxjW2VdLmNsYXNzTGlzdC5hZGQociksY1tlXS5yZW1vdmVDaGlsZChjW2VdLmZpcnN0Q2hpbGQpLHJlcXVlc3RBbmltYXRpb25GcmFtZSgoZnVuY3Rpb24oKXtyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKGZ1bmN0aW9uKCl7bFtlXS5jbGFzc0xpc3QuYWRkKFwiZnNsaWdodGJveHR0XCIpfSkpfSkpLGgodCxhKSxzLnMoZSkscy50KGUpLG4uYT1ofX1mdW5jdGlvbiB1dCh0LGUpe3ZhciBuLG89dGhpcyxpPXQuZWxlbWVudHMuc291cmNlcyxzPXQucHJvcHMscj0oMCx0LnJlc29sdmUpKGN0LFtlXSk7dGhpcy5oYW5kbGVJbWFnZUxvYWQ9ZnVuY3Rpb24odCl7dmFyIGU9dC50YXJnZXQsbj1lLm5hdHVyYWxXaWR0aCxvPWUubmF0dXJhbEhlaWdodDtyLmEobixvKX0sdGhpcy5oYW5kbGVWaWRlb0xvYWQ9ZnVuY3Rpb24odCl7dmFyIGU9dC50YXJnZXQsbz1lLnZpZGVvV2lkdGgsaT1lLnZpZGVvSGVpZ2h0O249ITAsci5hKG8saSl9LHRoaXMuaGFuZGxlTm90TWV0YURhdGVkVmlkZW9Mb2FkPWZ1bmN0aW9uKCl7bnx8by5oYW5kbGVZb3V0dWJlTG9hZCgpfSx0aGlzLmhhbmRsZVlvdXR1YmVMb2FkPWZ1bmN0aW9uKCl7dmFyIHQ9MTkyMCxlPTEwODA7cy5tYXhZb3V0dWJlRGltZW5zaW9ucyYmKHQ9cy5tYXhZb3V0dWJlRGltZW5zaW9ucy53aWR0aCxlPXMubWF4WW91dHViZURpbWVuc2lvbnMuaGVpZ2h0KSxyLmEodCxlKX0sdGhpcy5oYW5kbGVDdXN0b21Mb2FkPWZ1bmN0aW9uKCl7dmFyIHQ9aVtlXTt0Lm9mZnNldFdpZHRoJiZ0Lm9mZnNldEhlaWdodD9yLmEodC5vZmZzZXRXaWR0aCx0Lm9mZnNldEhlaWdodCk6c2V0VGltZW91dChvLmhhbmRsZUN1c3RvbUxvYWQpfX1mdW5jdGlvbiBsdCh0LGUpe3ZhciBuPXQuZWxlbWVudHMuc291cmNlcyxvPXQucHJvcHMuY3VzdG9tQXR0cmlidXRlcyxpPW5bZV07Zm9yKHZhciBzIGluIG9bZV0pe3ZhciByPW9bZV1bc107XCJjbGFzc1wiIT09cz9pLnNldEF0dHJpYnV0ZShzLHIpOmkuY2xhc3NMaXN0LmFkZChcImFcIil9fWZ1bmN0aW9uIGR0KHQsZSl7dmFyIG49dC5jb2xsZWN0aW9ucy5zb3VyY2VMb2FkSGFuZGxlcnMsbz10LmVsZW1lbnRzLnNvdXJjZXMsaT10LnByb3BzLnNvdXJjZXMscz10LnNhdyxyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7b1tlXT1yLHIuY2xhc3NOYW1lPVwiZnNsaWdodGJveHNcIixyLnNyYz1pW2VdLHIub25sb2FkPW5bZV0uaGFuZGxlSW1hZ2VMb2FkLGx0KHQsZSksc1tlXS5hcHBlbmRDaGlsZChyKX1mdW5jdGlvbiBodCh0LGUpe3ZhciBuPXQuY29sbGVjdGlvbnMuc291cmNlTG9hZEhhbmRsZXJzLG89dC5lbGVtZW50cy5zb3VyY2VzLGk9dC5wcm9wcy5zb3VyY2VzLHM9dC5zYXcscj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIiksYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic291cmNlXCIpO29bZV09cixyLmNsYXNzTmFtZT1cImZzbGlnaHRib3hzXCIsci5zcmM9aVtlXSxyLm9ubG9hZGVkbWV0YWRhdGE9ZnVuY3Rpb24odCl7bltlXS5oYW5kbGVWaWRlb0xvYWQodCl9LHIuY29udHJvbHM9ITAsbHQodCxlKSxyLmFwcGVuZENoaWxkKGEpLHNldFRpbWVvdXQobltlXS5oYW5kbGVOb3RNZXRhRGF0ZWRWaWRlb0xvYWQsM2UzKSxzW2VdLmFwcGVuZENoaWxkKHIpfWZ1bmN0aW9uIGZ0KHQsZSl7dmFyIG49dC5jb2xsZWN0aW9ucy5zb3VyY2VMb2FkSGFuZGxlcnMsbz10LmVsZW1lbnRzLGk9by5zb3VyY2VzLHM9by5zYXcscj10LnByb3BzLnNvdXJjZXMsYT0ocz10LnNhdyxkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpKSxjPXJbZV0sdT1jLnNwbGl0KFwiP1wiKVsxXTtpW2VdPWEsYS5jbGFzc05hbWU9XCJmc2xpZ2h0Ym94cyBmc2xpZ2h0Ym94eXRcIixhLnNyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL1wiLmNvbmNhdChjLm1hdGNoKC9eLiooeW91dHUuYmVcXC98dlxcL3x1XFwvXFx3XFwvfGVtYmVkXFwvfHdhdGNoXFw/dj18XFwmdj0pKFteI1xcJlxcP10qKS4qLylbMl0sXCI/XCIpLmNvbmNhdCh1fHxcIlwiKSxhLmFsbG93RnVsbHNjcmVlbj0hMCxsdCh0LGUpLHNbZV0uYXBwZW5kQ2hpbGQoYSksbltlXS5oYW5kbGVZb3V0dWJlTG9hZCgpfWZ1bmN0aW9uIHB0KHQsZSl7dmFyIG49dC5jb2xsZWN0aW9ucy5zb3VyY2VMb2FkSGFuZGxlcnMsbz10LmVsZW1lbnRzLnNvdXJjZXMsaT10LnByb3BzLnNvdXJjZXMscz10LnNhdyxyPWlbZV07b1tlXT1yLHIuY2xhc3NMaXN0LmFkZChcImZzbGlnaHRib3hzXCIpLGx0KHQsZSksc1tlXS5hcHBlbmRDaGlsZChyKSxuW2VdLmhhbmRsZUN1c3RvbUxvYWQoKX1mdW5jdGlvbiBtdCh0LGUpe3QuZGF0YS5pc1NvdXJjZUxvYWRlZDt2YXIgbixvLGk9dC5lbGVtZW50cy5zb3VyY2VzLHM9dC5wcm9wcyxhPXMuaW5pdGlhbEFuaW1hdGlvbjtyZXR1cm4gcy5zb3VyY2VzLG49dC5zYXcsbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLG49bltlXSxvLmNsYXNzTmFtZT1cImZzbGlnaHRib3hpbiBcIi5jb25jYXQociksby5pbm5lckhUTUw9XCJJbnZhbGlkIHNvdXJjZVwiLG4ucmVtb3ZlQ2hpbGQobi5maXJzdENoaWxkKSxpW2VdPW8sbi5jbGFzc0xpc3QuYWRkKGEpLHZvaWQgbi5hcHBlbmRDaGlsZChvKX1mdW5jdGlvbiBidCh0LGUsbil7dmFyIG89dC5wcm9wcy50aHVtYnNJY29ucztpZihvW25dKXtlLmFwcGVuZENoaWxkKG9bbl0uY2xvbmVOb2RlKCEwKSk7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpLmNsYXNzTmFtZT1cImZzbGlnaHRib3h0ZFwiLGUuYXBwZW5kQ2hpbGQoaSl9fWZ1bmN0aW9uIGd0KHQsZSxuKXt2YXIgbz10LmVsZW1lbnRzLGk9by50aHVtYnNXcmFwcGVycyxzPW8udGh1bWJzSW5uZXI7aVtlXT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLGlbZV0uY2xhc3NOYW1lPXksYnQodCxpW2VdLGUpLGZ1bmN0aW9uKHQsZSxuLG8pe3ZhciBpPXQuY29yZS50aHVtYkxvYWRIYW5kbGVyLmhhbmRsZUxvYWQscz10LmVsZW1lbnRzLnRodW1icyxyPXQuc3RhZ2VJbmRleGVzLmN1cnJlbnQ7c1tuXT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpLHNbbl0uc3JjPW87dmFyIGE9YjtyPT09biYmKGErPVwiIGZzbGlnaHRib3h0YVwiKSxzW25dLmNsYXNzTmFtZT1hLHNbbl0ub25sb2FkPWksZS5hcHBlbmRDaGlsZChzW25dKX0odCxpW2VdLGUsbikscy5hcHBlbmRDaGlsZChpW2VdKX1mdW5jdGlvbiB2dCh0KXt2YXIgZT10LmNvcmUudGh1bWJzUmVuZGVyRGlzcGF0Y2hlcixuPXQuZGF0YSxvPXQucHJvcHMsaT1vLnNob3dUaHVtYnNPbk1vdW50LHM9by5zb3VyY2VzLGE9by50aHVtYnM7dGhpcy5idWlsZFRodW1iRm9yVHlwZUFuZEluZGV4PWZ1bmN0aW9uKG8sYyl7dmFyIHU7dT1hW2NdP2Z1bmN0aW9uKCl7cmV0dXJuIGd0KHQsYyxhW2NdKX06bz09PW50P2Z1bmN0aW9uKCl7cmV0dXJuIGd0KHQsYyxzW2NdKX06ZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24odCxlKXt2YXIgbj10LmVsZW1lbnRzLG89bi50aHVtYnNXcmFwcGVycyxpPW4udGh1bWJzSW5uZXI7b1tlXT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLG9bZV0uY2xhc3NOYW1lPVwiXCIuY29uY2F0KEMsXCIgXCIpLmNvbmNhdCh5KSxidCh0LG9bZV0sZSksZnVuY3Rpb24odCxlLG4pe3ZhciBvPXQuY29yZS50aHVtYkxvYWRIYW5kbGVyLmhhbmRsZUxvYWQsaT10LmVsZW1lbnRzLnRodW1icyxzPXQuc3RhZ2VJbmRleGVzLmN1cnJlbnQ7aVtuXT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3ZhciBhPVwiXCIuY29uY2F0KGIsXCIgXCIpLmNvbmNhdChyKTtzPT09biYmKGErPVwiIGZzbGlnaHRib3h0YVwiKSxpW25dLmNsYXNzTmFtZT1hLGooaVtuXSxcIjIycHhcIiwwLFwiMCAwIDMwIDMwXCIsXCJNMTUsM0M4LjM3MywzLDMsOC4zNzMsMywxNWMwLDYuNjI3LDUuMzczLDEyLDEyLDEyczEyLTUuMzczLDEyLTEyQzI3LDguMzczLDIxLjYyNywzLDE1LDN6IE0xNi4yMTIsOGwtMC4yLDloLTIuMDI0bC0wLjItOSBIMTYuMjEyeiBNMTUuMDAzLDIyLjE4OWMtMC44MjgsMC0xLjMyMy0wLjQ0MS0xLjMyMy0xLjE4MmMwLTAuNzU1LDAuNDk0LTEuMTk2LDEuMzIzLTEuMTk2YzAuODIyLDAsMS4zMTYsMC40NDEsMS4zMTYsMS4xOTYgQzE2LjMxOSwyMS43NDgsMTUuODI1LDIyLjE4OSwxNS4wMDMsMjIuMTg5elwiKSxlLmFwcGVuZENoaWxkKGlbbl0pLHNldFRpbWVvdXQobyl9KHQsb1tlXSxlKSxpLmFwcGVuZENoaWxkKG9bZV0pfSh0LGMpfSxlLmFkZEZ1bmN0aW9uVG9Ub0JlUmVuZGVyZWRBdEluZGV4KHUsYyksKGl8fG4uaXNUaHVtYmluZykmJmUucmVuZGVyVGh1bWJzSWZOb3RZZXRBbmRBbGxUeXBlc0RldGVjdGVkKCl9fWZ1bmN0aW9uIHh0KHQpe3ZhciBlLG49dC5jb2xsZWN0aW9ucyxvPW4uc291cmNlTG9hZEhhbmRsZXJzLGk9bi5zb3VyY2VzUmVuZGVyRnVuY3Rpb25zLHM9dC5jb3JlLnNvdXJjZURpc3BsYXlGYWNhZGUscj10LnByb3BzLmRpc2FibGVUaHVtYnMsYT10LnJlc29sdmU7cnx8KGU9YSh2dCkpLHRoaXMucnVuQWN0aW9uc0ZvclNvdXJjZVR5cGVBbmRJbmRleD1mdW5jdGlvbihuLGMpe3ZhciB1O3N3aXRjaChuIT09cnQmJihvW2NdPWEodXQsW2NdKSksbil7Y2FzZSBudDp1PWR0O2JyZWFrO2Nhc2Ugb3Q6dT1odDticmVhaztjYXNlIGl0OnU9ZnQ7YnJlYWs7Y2FzZSBzdDp1PXB0O2JyZWFrO2RlZmF1bHQ6dT1tdH1pW2NdPWZ1bmN0aW9uKCl7cmV0dXJuIHUodCxjKX0scy5kaXNwbGF5U291cmNlc1doaWNoU2hvdWxkQmVEaXNwbGF5ZWQoKSxyfHxlLmJ1aWxkVGh1bWJGb3JUeXBlQW5kSW5kZXgobixjKX19ZnVuY3Rpb24gd3QodCxlLG4pe3ZhciBvPXQucHJvcHMsaT1vLnR5cGVzLHM9by50eXBlLHI9by5zb3VyY2VzO3RoaXMuZ2V0VHlwZVNldEJ5Q2xpZW50Rm9ySW5kZXg9ZnVuY3Rpb24odCl7dmFyIGU7cmV0dXJuIGkmJmlbdF0/ZT1pW3RdOnMmJihlPXMpLGV9LHRoaXMucmV0cmlldmVUeXBlV2l0aFhockZvckluZGV4PWZ1bmN0aW9uKHQpeyFmdW5jdGlvbih0LGUpe3ZhciBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO24uaHJlZj10O3ZhciBvPW4uaG9zdG5hbWU7aWYoXCJ3d3cueW91dHViZS5jb21cIj09PW98fFwieW91dHUuYmVcIj09PW8pcmV0dXJuIGUoaXQpO3ZhciBpPW5ldyBYTUxIdHRwUmVxdWVzdDtpLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe2lmKDQhPT1pLnJlYWR5U3RhdGUpe2lmKDI9PT1pLnJlYWR5U3RhdGUpe3ZhciB0LG49aS5nZXRSZXNwb25zZUhlYWRlcihcImNvbnRlbnQtdHlwZVwiKTtzd2l0Y2gobi5zbGljZSgwLG4uaW5kZXhPZihcIi9cIikpKXtjYXNlXCJpbWFnZVwiOnQ9bnQ7YnJlYWs7Y2FzZVwidmlkZW9cIjp0PW90O2JyZWFrO2RlZmF1bHQ6dD1ydH1pLm9ucmVhZHlzdGF0ZWNoYW5nZT1udWxsLGkuYWJvcnQoKSxlKHQpfX1lbHNlIGUocnQpfSxpLm9wZW4oXCJHRVRcIix0KSxpLnNlbmQoKX0oclt0XSwoZnVuY3Rpb24obyl7ZS5oYW5kbGVSZWNlaXZlZFNvdXJjZVR5cGVGb3JVcmwobyxyW3RdKSxuLnJ1bkFjdGlvbnNGb3JTb3VyY2VUeXBlQW5kSW5kZXgobyx0KX0pKX19ZnVuY3Rpb24geXQodCl7dmFyIGU9dC5wcm9wcy5zb3VyY2VzLG49dC5zdCxvPXQuc3RhZ2VJbmRleGVzLGk9ZS5sZW5ndGgtMTtuLmdldFByZXZpb3VzU2xpZGVJbmRleD1mdW5jdGlvbigpe3JldHVybiAwPT09by5jdXJyZW50P2k6by5jdXJyZW50LTF9LG4uZ2V0TmV4dFNsaWRlSW5kZXg9ZnVuY3Rpb24oKXtyZXR1cm4gby5jdXJyZW50PT09aT8wOm8uY3VycmVudCsxfSxuLnU9MD09PWk/ZnVuY3Rpb24oKXt9OjE9PT1pP2Z1bmN0aW9uKCl7MD09PW8uY3VycmVudD8oby5uZXh0PTEsZGVsZXRlIG8ucHJldmlvdXMpOihvLnByZXZpb3VzPTAsZGVsZXRlIG8ubmV4dCl9OmZ1bmN0aW9uKCl7by5wcmV2aW91cz1uLmdldFByZXZpb3VzU2xpZGVJbmRleCgpLG8ubmV4dD1uLmdldE5leHRTbGlkZUluZGV4KCl9LG4uaT1pPD0yP2Z1bmN0aW9uKCl7cmV0dXJuITB9OmZ1bmN0aW9uKHQpe3ZhciBlPW8uY3VycmVudDtpZigwPT09ZSYmdD09PWl8fGU9PT1pJiYwPT09dClyZXR1cm4hMDt2YXIgbj1lLXQ7cmV0dXJuLTE9PT1ufHwwPT09bnx8MT09PW59fWZ1bmN0aW9uIEN0KHQpe3ZhciBlPXQuY29tcG9uZW50c1NlcnZpY2VzLG89dC5jb3JlLGk9by5ldmVudHNEaXNwYXRjaGVyLHI9KG8ubGlnaHRib3hPcGVuZXIsby5nbG9iYWxFdmVudHNDb250cm9sbGVyKSxsPW8uc2Nyb2xsYmFyUmVjb21wZW5zb3IsZD1vLnNvdXJjZURpc3BsYXlGYWNhZGUsaD10LmRhdGEsbT10LmVhLGI9dC5lbGVtZW50cyx5PXQubGEsQz10LnNtdyxMPXQuc3QsTj10LnN0YWdlSW5kZXhlcyxrPXQuc3dzLEI9dC51aSxXPSExO2Z1bmN0aW9uIE0oKXt2YXIgZSxvPXQucHJvcHMscj1vLmRpc2FibGVUaHVtYnMsYT1vLnNob3dUaHVtYnNPbk1vdW50LGw9by5zb3VyY2VzO1c9ITAsZnVuY3Rpb24odCl7dmFyIGU9dC5wcm9wczt0LmRzcz1lLmRpc2FibGVTbGlkZVN3aXBpbmcsdC5kdD1lLmRpc2FibGVUaHVtYnMsdC5jPWUuc291cmNlcy5sZW5ndGgsdC50Yz1lLnNob3dUaHVtYnNXaXRoQ2FwdGlvbnN9KHQpLGguc2Nyb2xsYmFyV2lkdGg9ZnVuY3Rpb24oKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLGU9dC5zdHlsZSxuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS52aXNpYmlsaXR5PVwiaGlkZGVuXCIsZS53aWR0aD1cIjEwMHB4XCIsZS5tc092ZXJmbG93U3R5bGU9XCJzY3JvbGxiYXJcIixlLm92ZXJmbG93PVwic2Nyb2xsXCIsbi5zdHlsZS53aWR0aD1cIjEwMCVcIixkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHQpO3ZhciBvPXQub2Zmc2V0V2lkdGg7dC5hcHBlbmRDaGlsZChuKTt2YXIgaT1uLm9mZnNldFdpZHRoO3JldHVybiBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHQpLG8taX0oKSxoLnVubG9hZGVkVGh1bWJzQ291bnQ9bC5sZW5ndGgscnx8KGguaXNUaHVtYmluZz1hLGZ1bmN0aW9uKHQpe3ZhciBlPXQuY29yZSxuPXQuZGF0YSxvPXQuZWxlbWVudHMsaT10LnByb3BzO24uaXNUaHVtYmluZz1pLnNob3dUaHVtYnNPbk1vdW50LG4udGh1bWJzSW5uZXJXaWR0aD1udWxsLG4udGh1bWJzVHJhbnNmb3JtPTAsbi50aHVtYmVkU291cmNlRW5oYW5jZW1lbnRXcmFwcGVyU2NhbGU9bnVsbCxuLnRodW1iZWRTb3VyY2VFbmhhbmNlbWVudFdyYXBwZXJUcmFuc2xhdGVZPW51bGwsbi51bmxvYWRlZFRodW1ic0NvdW50PWkuc291cmNlcy5sZW5ndGgsdC50aHVtYnNTd2lwaW5nUHJvcHM9e2k6ITEsZG93blNjcmVlblg6bnVsbCxzd2lwZWRYOm51bGx9LGUudGh1bWJMb2FkSGFuZGxlcj17fSxlLnRodW1ic1JlbmRlckRpc3BhdGNoZXI9e30sZS50aHVtYnNTd2lwaW5nRG93bj17fSxlLnRodW1ic1RvZ2dsZXI9e30sZS50aHVtYnNUcmFuc2Zvcm1lcj17fSxlLnRodW1ic1RyYW5zZm9ybVRyYW5zaXRpb25lcj17fSxvLnRodW1ic0NvbnRhaW5lcj1udWxsLG8udGh1bWJzPVtdLG8udGh1bWJzV3JhcHBlcnM9W10sby50aHVtYnNDb21wb25lbnRzPVtdLG8udGh1bWJzSW5uZXI9bnVsbCxmdW5jdGlvbih0KXt2YXIgZT10LmNvcmUudGh1bWJMb2FkSGFuZGxlcixuPXQuY29tcG9uZW50c1NlcnZpY2VzLG89dC5kYXRhLGk9dC5lbGVtZW50cy50aHVtYnNXcmFwcGVycyxzPXQubGE7ZS5oYW5kbGVMb2FkPWZ1bmN0aW9uKCl7aWYoby51bmxvYWRlZFRodW1ic0NvdW50LS0sMD09PW8udW5sb2FkZWRUaHVtYnNDb3VudCl7Zm9yKHZhciB0PTA7dDxpLmxlbmd0aDt0KyspaVt0XS5jbGFzc0xpc3QuYWRkKHUpO3MucnQoKSxuLmhpZGVUaHVtYnNMb2FkZXIoKX19fSh0KSxmdW5jdGlvbih0KXt2YXIgZT10LmNvcmUudGh1bWJzUmVuZGVyRGlzcGF0Y2hlcixuPXQucHJvcHMuc291cmNlcyxvPVtdLGk9ITEscz0wO2UuYWRkRnVuY3Rpb25Ub1RvQmVSZW5kZXJlZEF0SW5kZXg9ZnVuY3Rpb24odCxlKXtvW2VdPXQscysrfSxlLnJlbmRlclRodW1ic0lmTm90WWV0QW5kQWxsVHlwZXNEZXRlY3RlZD1mdW5jdGlvbigpe2lmKCFpJiZzPT09bi5sZW5ndGgpe2k9ITA7Zm9yKHZhciB0PTA7dDxuLmxlbmd0aDt0Kyspb1t0XSgpfX19KHQpLGZ1bmN0aW9uKHQpe3ZhciBlPXQuY29yZSxuPWUudGh1bWJzU3dpcGluZ0Rvd24sbz1lLnBvaW50ZXJpbmdCdWNrZXQsaT10LnRodW1ic1N3aXBpbmdQcm9wcztuLmxpc3RlbmVyPWZ1bmN0aW9uKHQpe3QucHJldmVudERlZmF1bHQoKSxvLnJ1blN3aXBpbmdEb3duQWN0aW9uc0ZvclByb3BzQW5kRXZlbnQoaSx0KX19KHQpLGZ1bmN0aW9uKHQpe3ZhciBlPXQuY29yZS50aHVtYnNUb2dnbGVyLG49dC5kYXRhLG89KDAsdC5yZXNvbHZlKShUKTtlLnRvZ2dsZVRodW1icz1mdW5jdGlvbigpe24uaXNUaHVtYmluZz9vLngoKTpvLm8oKX19KHQpLGZ1bmN0aW9uKHQpe3ZhciBlPXQuY29yZSxuPWUudGh1bWJzVHJhbnNmb3JtZXIsbz1lLnRodW1ic1RyYW5zZm9ybVRyYW5zaXRpb25lcixpPXQuZGF0YSxzPSgwLHQucmVzb2x2ZSkoQSk7bi50cmFuc2Zvcm1Ub0N1cnJlbnQ9ZnVuY3Rpb24oKXtpLnRodW1ic0lubmVyV2lkdGg+aW5uZXJXaWR0aD9zLnJ1bkFjdGlvbnMoKTpzLnJ1blRvVGhpblRodW1ic0FjdGlvbnMoKX0sbi50cmFuc2Zvcm1Ub0N1cnJlbnRXaXRoVHJhbnNpdGlvbj1mdW5jdGlvbigpe2kudGh1bWJzSW5uZXJXaWR0aD5pbm5lcldpZHRoJiZvLmNhbGxBY3Rpb25XaXRoVHJhbnNpdGlvbihzLnJ1bkFjdGlvbnMpfX0odCksZnVuY3Rpb24odCl7dmFyIGU9dC5jb3JlLnRodW1ic1RyYW5zZm9ybVRyYW5zaXRpb25lcixuPXQuZWxlbWVudHMsbz0oMCx0LnEpKChmdW5jdGlvbigpe24udGh1bWJzSW5uZXIuY2xhc3NMaXN0LnJlbW92ZShcImZzbGlnaHRib3h0dFwiKX0pLDMwMCk7ZS5jYWxsQWN0aW9uV2l0aFRyYW5zaXRpb249ZnVuY3Rpb24odCl7bi50aHVtYnNJbm5lci5jbGFzc0xpc3QuYWRkKFwiZnNsaWdodGJveHR0XCIpLHQoKSxvKCl9fSh0KX0odCkpLGZ1bmN0aW9uKHQpeyFmdW5jdGlvbih0KXt2YXIgZT10LmNvcmUsbj1lLmNsYXNzRmFjYWRlLG89ZS5zdCxpPXQuZWxlbWVudHM7bi5yZW1vdmVGcm9tRWFjaEVsZW1lbnRDbGFzc0lmQ29udGFpbnM9ZnVuY3Rpb24odCxlKXtmb3IodmFyIG49MDtuPGlbdF0ubGVuZ3RoO24rKyl6KGlbdF1bbl0sZSl9LG4uc3RhZ2VkUmVtb3ZhbEFuZE91dHN0YWdlZEFkZGluZ09mQ2xhc3NJZkNvbnRhaW5zPWZ1bmN0aW9uKHQsZSl7Zm9yKHZhciBuPTA7bjxpW3RdLmxlbmd0aDtuKyspby5pKG4pP3ooaVt0XVtuXSxlKTpTKGlbdF1bbl0sZSl9fSh0KSxmdW5jdGlvbih0KXt2YXIgZT10LmNvcmUuY2xpY2tab29tZXIsbj0odC5lbGVtZW50cyx0LnByb3BzLnpvb21JbmNyZW1lbnQpLG89dC5xLGk9dC56LHM9bygoZnVuY3Rpb24oKXt6KHQuc3djLFwiZnNsaWdodGJveHR0XCIpfSksMzAwKTtlLnpvb21Jbj1mdW5jdGlvbigpe3IoKSxhKHQuenYrbil9LGUuem9vbU91dD1mdW5jdGlvbigpe3QuenYtbjw9MT8xIT09dC56diYmKGEoMSksaS5lKCkpOihyKCksYSh0Lnp2LW4pLDE9PT10Lnp2JiZpLmUoKSl9O3ZhciByPWZ1bmN0aW9uKCl7MT09PXQuenYmJmkuYigpfSxhPWZ1bmN0aW9uKGUpe1ModC5zd2MsXCJmc2xpZ2h0Ym94dHRcIiksaS56KGUpLHMoKX19KHQpLGZ1bmN0aW9uKHQpe3ZhciBlPXQuZWEsbj10LmRhdGEsbz10LmVsZW1lbnRzLGk9by5jYXB0aW9ucyxzPW8udGh1bWJzLHI9KHQuc3RhZ2VJbmRleGVzLHQudGMpLGE9dC51aTtmdW5jdGlvbiBjKHQpe2lmKHIpZm9yKHZhciBlPTA7ZTxpLmxlbmd0aDtlKyspe3ZhciBuPWlbZV07biYmbi5jbGFzc0xpc3RbdF0oXCJmc2xpZ2h0Ym94Y3RcIil9fWUuYz1mdW5jdGlvbihlLG8peyhyfHwhbi5pc1RodW1iaW5nfHx0Lnh1KSYmKGEuaGMoZSksYS5zYyhvKSl9LGUuZGM9ZnVuY3Rpb24oKXtjKFwicmVtb3ZlXCIpfSxlLnVjPWZ1bmN0aW9uKCl7YyhcImFkZFwiKX0sZS50PWZ1bmN0aW9uKHQsZSl7cyYmc1tlXSYmKHNbdF0uY2xhc3NMaXN0LnJlbW92ZShcImZzbGlnaHRib3h0YVwiKSxzW2VdLmNsYXNzTGlzdC5hZGQoXCJmc2xpZ2h0Ym94dGFcIikpfX0odCksZnVuY3Rpb24odCl7dmFyIGU9dC5jb3JlLmV2ZW50c0Rpc3BhdGNoZXIsbj10LnByb3BzO2UuZGlzcGF0Y2g9ZnVuY3Rpb24oZSl7bltlXSYmbltlXSh0KX19KHQpLGZ1bmN0aW9uKHQpe3ZhciBlPXQuY29tcG9uZW50c1NlcnZpY2VzLG49dC5kYXRhLG89dC5mcyxpPVtcImZ1bGxzY3JlZW5jaGFuZ2VcIixcIndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2VcIixcIm1vemZ1bGxzY3JlZW5jaGFuZ2VcIixcIk1TRnVsbHNjcmVlbkNoYW5nZVwiXTtmdW5jdGlvbiBzKHQpe2Zvcih2YXIgZT0wO2U8aS5sZW5ndGg7ZSsrKWRvY3VtZW50W3RdKGlbZV0scil9ZnVuY3Rpb24gcigpe2RvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50fHxkb2N1bWVudC53ZWJraXRJc0Z1bGxTY3JlZW58fGRvY3VtZW50Lm1vekZ1bGxTY3JlZW58fGRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnQ/ZS5vZnMoKTplLnhmcygpfW8ubz1mdW5jdGlvbigpe2Uub2ZzKCk7dmFyIHQ9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O3QucmVxdWVzdEZ1bGxzY3JlZW4/dC5yZXF1ZXN0RnVsbHNjcmVlbigpOnQubW96UmVxdWVzdEZ1bGxTY3JlZW4/dC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpOnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4/dC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpOnQubXNSZXF1ZXN0RnVsbHNjcmVlbiYmdC5tc1JlcXVlc3RGdWxsc2NyZWVuKCl9LG8ueD1mdW5jdGlvbigpe2UueGZzKCksZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4/ZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTpkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuP2RvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTpkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbj9kb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpOmRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4mJmRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKX0sby50PWZ1bmN0aW9uKCl7bi5pZnM/by54KCk6by5vKCl9LG8ubD1mdW5jdGlvbigpe3MoXCJhZGRFdmVudExpc3RlbmVyXCIpfSxvLnE9ZnVuY3Rpb24oKXtzKFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiKX19KHQpLGZ1bmN0aW9uKHQpe3ZhciBlLG49dC5jb3JlLmdsb2JhbEV2ZW50c0NvbnRyb2xsZXIsbz10LmZzLGk9dC5sYSxzPXQucixyPSh0LnVpLHMoWCkpO24uYWRkTGlzdGVuZXJzPWZ1bmN0aW9uKCl7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsci5tKSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcnVwXCIsci51KSxhZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsaS5yKSxlPWZ1bmN0aW9uKGUpe1kodCxlKX0sZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIixlKSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIixyLncpLG8ubCgpfSxuLnJlbW92ZUxpc3RlbmVycz1mdW5jdGlvbigpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLHIubSksZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLHIudSkscmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLGkuciksZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIixlKSxkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwid2hlZWxcIixyLncpLG8ucSgpfX0odCksZnVuY3Rpb24odCl7dC5jO3ZhciBlPXQuZGF0YSxuPXQuZWEsbz10LmVsZW1lbnRzLGk9dC5mLHM9dC5sYSxyPXQucHJvcHMuVUlGYWRlT3V0VGltZSxhPXQucSxjPXQuc3RhZ2VJbmRleGVzLHU9dC50YyxsPXQudWksZD1vLmNhcHRpb25zLGg9YSgoZnVuY3Rpb24oKXt0Lnh1PSEwLGYoeSksMT09PXQuenYmJmUuaXNUaHVtYmluZyYmKHMudXQoKSx1P24uZGMoKTpsLnNjKGMuY3VycmVudCkpfSkscik7ZnVuY3Rpb24gZih0KXtwKHQpLG0odCksZS5pc1RodW1iaW5nJiZ3KHQpfWZ1bmN0aW9uIHAodCl7dChvLm5hdil9ZnVuY3Rpb24gbSh0KXtvLnNsaWRlQnV0dG9uUHJldmlvdXMmJih0KG8uc2xpZGVCdXR0b25QcmV2aW91cyksdChvLnNsaWRlQnV0dG9uTmV4dCkpfWZ1bmN0aW9uIGIodCxlKXt4KHQsZSl9ZnVuY3Rpb24gZyh0KXttKHQpLGUuaXNUaHVtYmluZz8odyh0KSx1JiZ2KHQpKTp2KHQpfWZ1bmN0aW9uIHYodCl7eCh0LGMuY3VycmVudCl9ZnVuY3Rpb24geCh0LGUpe3ZhciBuPWRbZV07biYmdChuKX1mdW5jdGlvbiB3KHQpe3Qoby50aHVtYnNDb250YWluZXIpfWZ1bmN0aW9uIHkodCl7dC5jbGFzc0xpc3QuYWRkKFwiZnNsaWdodGJveHhcIil9ZnVuY3Rpb24gQyh0KXt0LmNsYXNzTGlzdC5yZW1vdmUoXCJmc2xpZ2h0Ym94eFwiKX1yPyhsLnFwcz1mdW5jdGlvbigpe2goKSx0Lnh1JiYodC54dT0hMSwxPT09dC56dj9mKEMpOnAoQykpLDE9PT10Lnp2JiZlLmlzVGh1bWJpbmcmJihpKChmdW5jdGlvbih0KXtzLnQodCl9KSksdT9uLnVjKCk6bC5oYyhjLmN1cnJlbnQpKX0sbC5xPWZ1bmN0aW9uKCl7aCgpfSk6KGwucXBzPWZ1bmN0aW9uKCl7fSxsLnE9ZnVuY3Rpb24oKXt9KSxsLnNjPWZ1bmN0aW9uKHQpe2IoQyx0KX0sbC5oYz1mdW5jdGlvbih0KXtiKHksdCl9LGwuemg9ZnVuY3Rpb24oKXtnKHkpfSxsLnpzPWZ1bmN0aW9uKCl7ZyhDKX0sbC5zdGhjPWZ1bmN0aW9uKCl7dyhDKSx1fHx2KHkpfSxsLmh0c2M9ZnVuY3Rpb24oKXt3KHkpLHV8fHYoQyl9fSh0KSxmdW5jdGlvbih0KXt2YXIgZT10LmNvcmUubGlnaHRib3hDbG9zZXIsbj0oMCx0LnJlc29sdmUpKEkpO2UuY2xvc2U9ZnVuY3Rpb24oKXtuLmlzTGlnaHRib3hGYWRpbmdPdXR8fG4ucnVuQWN0aW9ucygpfX0odCksZnVuY3Rpb24odCl7dmFyIGU9dC5jb3JlLnBvaW50ZXJpbmdCdWNrZXQ7dC5lbGVtZW50cyxlLnJ1blN3aXBpbmdEb3duQWN0aW9uc0ZvclByb3BzQW5kRXZlbnQ9ZnVuY3Rpb24odCxlKXt0Lmk9ITAsdC5kb3duU2NyZWVuWD1lLnNjcmVlblgsdC5zd2lwZWRYPTB9LGUucnVuU3dpcGluZ01vdmVBY3Rpb25zRm9yUHJvcHNBbmRFdmVudD1mdW5jdGlvbihlLG4pe1ModC5oLFwiZnNsaWdodGJveGNnXCIpLGUuc3dpcGVkWD1uLnNjcmVlblgtZS5kb3duU2NyZWVuWH0sZS5ydW5Td2lwaW5nVG9wQWN0aW9uc0ZvclByb3BzQW5kRXZlbnQ9ZnVuY3Rpb24oZSl7eih0LmgsXCJmc2xpZ2h0Ym94Y2dcIiksZS5pPSExfX0odCksZnVuY3Rpb24odCl7dmFyIGU9dC5kYXRhLG49dC5jb3JlLnNjcm9sbGJhclJlY29tcGVuc29yO24uYWRkUmVjb21wZW5zZT1mdW5jdGlvbigpe1wiY29tcGxldGVcIj09PWRvY3VtZW50LnJlYWR5U3RhdGU/bygpOndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLChmdW5jdGlvbigpe28oKSxuLmFkZFJlY29tcGVuc2U9b30pKX07dmFyIG89ZnVuY3Rpb24oKXtkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodD53aW5kb3cuaW5uZXJIZWlnaHQmJihkb2N1bWVudC5ib2R5LnN0eWxlLm1hcmdpblJpZ2h0PWUuc2Nyb2xsYmFyV2lkdGgrXCJweFwiKX07bi5yZW1vdmVSZWNvbXBlbnNlPWZ1bmN0aW9uKCl7ZG9jdW1lbnQuYm9keS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm1hcmdpbi1yaWdodFwiKX19KHQpLGZ1bmN0aW9uKHQpe3ZhciBlPXQuYyxuPXQuY29yZS50aHVtYnNUcmFuc2Zvcm1lcixvPXQuZGF0YSxpPXQuZHQscz10LmVsZW1lbnRzLHI9dC5mLGE9dC5pc2wsYz10LmxhLHU9dC5zZXcsbD10LnNtdyxkPXQuc3osaD10LnN0YWdlSW5kZXhlcyxmPXQudGMscD1zLmNhcHRpb25zLG09cy50aHVtYnMsYj1bXSxnPVtdLHY9W10seD1bXSx3PVtdLHk9MDtmdW5jdGlvbiBDKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOjAsZT1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06MTt1W2FyZ3VtZW50cy5sZW5ndGg+Mj9hcmd1bWVudHNbMl06dm9pZCAwXS5zdHlsZS50cmFuc2Zvcm09XCJ0cmFuc2xhdGVZKFwiLmNvbmNhdCh0LFwicHgpIHNjYWxlKFwiKS5jb25jYXQoZSxcIilcIil9Yy5yPWZ1bmN0aW9uKCl7aW5uZXJXaWR0aDw5OTI/dC5tdz1pbm5lcldpZHRoOnQubXc9LjkqaW5uZXJXaWR0aCx0Lm1oPS45KmlubmVySGVpZ2h0LDA9PT1vLnVubG9hZGVkVGh1bWJzQ291bnQmJmMucnQoKSx2b2lkIDAhPT1oLnByZXZpb3VzJiZsW2gucHJldmlvdXNdLm5lKCksdm9pZCAwIT09aC5uZXh0JiZsW2gubmV4dF0ucCgpLHIoKGZ1bmN0aW9uKHQpe3ZhciBlPWRbdF0sbj1wW3RdO2UmJmUucygpLG4mJihiW3RdPW4ub2Zmc2V0SGVpZ2h0KSxpfHwoeT1zLnRodW1ic0NvbnRhaW5lci5vZmZzZXRIZWlnaHQpLGMucyh0KSxsW3RdLmQoKSxjLnQodCl9KSl9LGMucz1mdW5jdGlvbih0KXt2YXIgZT1kW3RdO2lmKGUpe3ZhciBuPWUuZCgpLG89blswXStuWzFdO2lmKGJbdF0pe3ZhciBzPWUuZyguOTQqaW5uZXJIZWlnaHQtYlt0XSk7Z1t0XT0oc1swXStzWzFdKS9vLHdbdF09LShiW3RdLWlubmVySGVpZ2h0LzIrc1sxXS8yKSx3W3RdPjAmJih3W3RdPTApfWlmKCFpKXtpZihmJiZiW3RdKXt2YXIgcj15K2JbdF07YT1lLmcoLjkqaW5uZXJIZWlnaHQtcis0Niksdlt0XT0oYVswXSthWzFdKS9vLHhbdF09LShyLTIxLWlubmVySGVpZ2h0LzIrYVsxXS8yKX1lbHNle3ZhciBhPWUuZyguOSppbm5lckhlaWdodC15KTt2W3RdPShhWzBdK2FbMV0pL28seFt0XT0tKHktaW5uZXJIZWlnaHQvMithWzFdLzIrMTYpfXhbdF0+MCYmKHhbdF09MCl9fX0sYy50PWZ1bmN0aW9uKGUpe2FbZV0mJigxIT09dC56dj9DKDAsMSxlKTpvLmlzVGh1bWJpbmc/Qyh4W2VdLHZbZV0sZSk6Qyh3W2VdLGdbZV0sZSkpfSxjLnV0PWZ1bmN0aW9uKCl7cigoZnVuY3Rpb24odCl7YVt0XSYmQyh3W3RdLGdbdF0sdCl9KSl9LGMucnQ9ZnVuY3Rpb24oKXtvLnRodW1ic0lubmVyV2lkdGg9MDtmb3IodmFyIHQ9MDt0PGU7dCsrKW8udGh1bWJzSW5uZXJXaWR0aCs9bVt0XS5vZmZzZXRXaWR0aCs4O24udHJhbnNmb3JtVG9DdXJyZW50KCl9fSh0KSxGKHQpLGZ1bmN0aW9uKHQpe3ZhciBlPXQuY29yZSxuPWUuc2xpZGVDaGFuZ2VGYWNhZGUsbz1lLnNsaWRlSW5kZXhDaGFuZ2VyLGk9dC5wcm9wcy5zb3VyY2VzLHM9dC5zdDtpLmxlbmd0aD4xPyhuLmNoYW5nZVRvUHJldmlvdXM9ZnVuY3Rpb24oKXtvLmp1bXBUbyhzLmdldFByZXZpb3VzU2xpZGVJbmRleCgpKX0sbi5jaGFuZ2VUb05leHQ9ZnVuY3Rpb24oKXtvLmp1bXBUbyhzLmdldE5leHRTbGlkZUluZGV4KCkpfSk6KG4uY2hhbmdlVG9QcmV2aW91cz1mdW5jdGlvbigpe30sbi5jaGFuZ2VUb05leHQ9ZnVuY3Rpb24oKXt9KX0odCksZnVuY3Rpb24odCl7dmFyIGU9dC5jb21wb25lbnRzU2VydmljZXMsbj10LmNvcmUsbz1uLmV2ZW50c0Rpc3BhdGNoZXIsaT1uLnNsaWRlSW5kZXhDaGFuZ2VyLHM9bi5zb3VyY2VEaXNwbGF5RmFjYWRlLHI9bi50aHVtYnNUcmFuc2Zvcm1lcixhPXQuZWEsYz10LmlzbCx1PXQucHJvcHMuZGlzYWJsZVRodW1icyxsPXQucmVzb2x2ZSxkPXQuc213LGg9dC5zdCxmPXQuc3RhZ2VJbmRleGVzLHA9dC5zd3MsbT10Lno7aS5jaGFuZ2VUbz1mdW5jdGlvbih0KXt2YXIgbj1mLmN1cnJlbnQ7bS5yKCksYS5jKG4sdCksZi5jdXJyZW50PXQsaC51KCksZS5zZXRTbGlkZU51bWJlcih0KzEpLHV8fChhLnQobix0KSxyLnRyYW5zZm9ybVRvQ3VycmVudFdpdGhUcmFuc2l0aW9uKCkpLHMuZGlzcGxheVNvdXJjZXNXaGljaFNob3VsZEJlRGlzcGxheWVkKCksby5kaXNwYXRjaChcIm9uU2xpZGVDaGFuZ2VcIil9LGkuanVtcFRvPWZ1bmN0aW9uKHQpe3ZhciBlPWYuY3VycmVudDtpZihlIT09dCl7dmFyIG49bChFLFt7cHJldmlvdXM6Zi5wcmV2aW91cyxjdXJyZW50OmUsbmV4dDpmLm5leHR9LGNbZV0sY1t0XV0pO2kuY2hhbmdlVG8odCk7Zm9yKHZhciBvPTA7bzxkLmxlbmd0aDtvKyspZFtvXS5kKCk7cC5kKGUpLHAuYygpLHJlcXVlc3RBbmltYXRpb25GcmFtZSgoZnVuY3Rpb24oKXtyZXF1ZXN0QW5pbWF0aW9uRnJhbWUobi5ydW5KdW1wUmVmbG93ZWRBY3Rpb25zKX0pKX19fSh0KSxmdW5jdGlvbih0KXt2YXIgZT10LmNvbGxlY3Rpb25zLnNvdXJjZXNSZW5kZXJGdW5jdGlvbnMsbj10LmNvcmUuc291cmNlRGlzcGxheUZhY2FkZSxvPXQucHJvcHMubG9hZE9ubHlDdXJyZW50U291cmNlLGk9dC5zdGFnZUluZGV4ZXM7ZnVuY3Rpb24gcyh0KXtlW3RdJiYoZVt0XSgpLGRlbGV0ZSBlW3RdKX1uLmRpc3BsYXlTb3VyY2VzV2hpY2hTaG91bGRCZURpc3BsYXllZD1mdW5jdGlvbigpe2lmKG8pcyhpLmN1cnJlbnQpO2Vsc2UgZm9yKHZhciB0IGluIGkpcyhpW3RdKX19KHQpLGZ1bmN0aW9uKHQpe3ZhciBlPXQuaXNsLG49dC5wcm9wcyxvPW4uaW5pdGlhbEFuaW1hdGlvbixpPW4uc2xpZGVDaGFuZ2VBbmltYXRpb24scz10LnN0YWdlSW5kZXhlcyxyPXQuc2F3LGE9dC5zbXcsYz10LnN0LHU9dC5zd3M7dS5hPWZ1bmN0aW9uKCl7Zm9yKHZhciB0IGluIHMpYVtzW3RdXS5zKCl9LHUuYj1mdW5jdGlvbih0KXt2b2lkIDA9PT10fHxjLmkodCl8fChhW3RdLmgoKSxhW3RdLm4oKSl9LHUuYz1mdW5jdGlvbigpe2Zvcih2YXIgdCBpbiBzKXUuZChzW3RdKX0sdS5kPWZ1bmN0aW9uKHQpe2lmKGVbdF0pe3ZhciBuPXJbdF07eihuLG8pLHoobixpKSx6KG4sZil9fX0odCksZnVuY3Rpb24odCl7dmFyIGU9dC5lbGVtZW50cyxuPWUuc291cmNlcyxvPWUuc213LGk9dC5sYSxzPXQucCxyPShvPXQuc213LHQuc3RhZ2VJbmRleGVzKSxhPXQudWksYz10Lno7ZnVuY3Rpb24gdSh0KXt2YXIgZT1uW3IuY3VycmVudF07ZSYmKGUuc3R5bGUuY3Vyc29yPXQpfWMuej1mdW5jdGlvbihlKXt0Lnp2PXBhcnNlRmxvYXQoZS50b1ByZWNpc2lvbigxMikpLHQuc3djLnN0eWxlLnRyYW5zZm9ybT1cInNjYWxlKFwiLmNvbmNhdCh0Lnp2LFwiKVwiKX0sYy5yPWZ1bmN0aW9uKCl7MSE9PXQuenYmJihjLnooMSksYy5lKCkpfSxjLmI9ZnVuY3Rpb24oKXt1KFwiZ3JhYlwiKSxhLnpoKCksaS50KCl9LGMuZT1mdW5jdGlvbigpe3UoXCJ6b29tLWluXCIpLGEuenMoKSxvW3IuY3VycmVudF0uYSgpLG9bci5jdXJyZW50XS52KDAsMCkueigpLHMudXg9MCxzLnV5PTB9fSh0KX0odCksZnVuY3Rpb24odCl7dmFyIGU9dC5lbGVtZW50cyxvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7by5jbGFzc05hbWU9XCJcIi5jb25jYXQobixcImNvbnRhaW5lciBcIikuY29uY2F0KHMsXCIgXCIpLmNvbmNhdChwKSxlLmNvbnRhaW5lcj1vfSh0KSxmdW5jdGlvbih0KXt0Lmg9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSx0LmguY2xhc3NOYW1lPVwiZnNsaWdodGJveHRoIFwiLmNvbmNhdChzKS5jb25jYXQoYyl9KHQpLFoodCksZnVuY3Rpb24odCl7dC5zc2I9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSx0LnNzYi5jbGFzc05hbWU9XCJmc2xpZ2h0Ym94c3MgXCIuY29uY2F0KGMpLHQuZWxlbWVudHMuY29udGFpbmVyLmFwcGVuZENoaWxkKHQuc3NiKX0odCksJCh0KSxmdW5jdGlvbih0KXtmb3IodmFyIGU9dC5wcm9wcy5jYXB0aW9ucyxuPTA7bjxlLmxlbmd0aDtuKyspZVtuXSYmSyh0LG4pfSh0KSxsLmxlbmd0aD4xJiYoUShlPXQsXCJwcmV2aW91c1wiKSxRKGUsXCJuZXh0XCIpKSxyfHxmdW5jdGlvbih0KXt2YXIgZT10LmNvbXBvbmVudHNTZXJ2aWNlcyxuPXQuZWxlbWVudHMsbz10LmRhdGE7bi50aHVtYnNDb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTt2YXIgaSxyLGE9ZztmdW5jdGlvbiB1KCl7cj0hMCwoaT1KKG4udGh1bWJzQ29udGFpbmVyKSkuY2xhc3NMaXN0LmFkZCh2KX1vLmlzVGh1bWJpbmc/dSgpOmErPVwiIGZzbGlnaHRib3h4XCIsZS5hcHBlbmRUaHVtYnNMb2FkZXJJZk5vdFlldD1mdW5jdGlvbigpe3J8fHUoKX0sZS5oaWRlVGh1bWJzTG9hZGVyPWZ1bmN0aW9uKCl7bi50aHVtYnNDb250YWluZXIucmVtb3ZlQ2hpbGQoaSl9LG4udGh1bWJzQ29udGFpbmVyLmNsYXNzTmFtZT1hLG4uY29udGFpbmVyLmFwcGVuZENoaWxkKG4udGh1bWJzQ29udGFpbmVyKSxmdW5jdGlvbih0KXt2YXIgZT10LmVsZW1lbnRzO2UudGh1bWJzQ3Vyc29yZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxlLnRodW1ic0N1cnNvcmVyLmNsYXNzTmFtZT1cIlwiLmNvbmNhdCh4LFwiIFwiKS5jb25jYXQocyxcIiBcIikuY29uY2F0KGMpfSh0KSxmdW5jdGlvbih0KXt2YXIgZT10LmNvcmUudGh1bWJzU3dpcGluZ0Rvd24ubGlzdGVuZXIsbj10LmVsZW1lbnRzO24udGh1bWJzSW5uZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxuLnRodW1ic0lubmVyLmNsYXNzTmFtZT13LG4udGh1bWJzSW5uZXIuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsZSksbi50aHVtYnNDb250YWluZXIuYXBwZW5kQ2hpbGQobi50aHVtYnNJbm5lcil9KHQpfSh0KSxmdW5jdGlvbih0KXtmb3IodmFyIGU9dC5wcm9wcy5zb3VyY2VzLG49dC5yZXNvbHZlLG89bihldCksaT1uKHh0KSxzPW4od3QsW28saV0pLHI9MDtyPGUubGVuZ3RoO3IrKylpZihcInN0cmluZ1wiPT10eXBlb2YgZVtyXSl7dmFyIGE9cy5nZXRUeXBlU2V0QnlDbGllbnRGb3JJbmRleChyKTtpZihhKWkucnVuQWN0aW9uc0ZvclNvdXJjZVR5cGVBbmRJbmRleChhLHIpO2Vsc2V7dmFyIGM9by5nZXRTb3VyY2VUeXBlRnJvbUxvY2FsU3RvcmFnZUJ5VXJsKGVbcl0pO2M/aS5ydW5BY3Rpb25zRm9yU291cmNlVHlwZUFuZEluZGV4KGMscik6cy5yZXRyaWV2ZVR5cGVXaXRoWGhyRm9ySW5kZXgocil9fWVsc2UgaS5ydW5BY3Rpb25zRm9yU291cmNlVHlwZUFuZEluZGV4KHN0LHIpfSh0KSxpLmRpc3BhdGNoKFwib25Jbml0XCIpfXQub3Blbj1mdW5jdGlvbigpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTowLG89Ti5wcmV2aW91cyxzPU4uY3VycmVudCxjPU4ubmV4dDtOLmN1cnJlbnQ9bixXfHx5dCh0KSxMLnUoKSxXPyhrLmMoKSxrLmEoKSxrLmIobyksay5iKHMpLGsuYihjKSxtLmMocyxOLmN1cnJlbnQpLG0udChzLE4uY3VycmVudCksaS5kaXNwYXRjaChcIm9uU2hvd1wiKSk6TSgpLGQuZGlzcGxheVNvdXJjZXNXaGljaFNob3VsZEJlRGlzcGxheWVkKCksZS5zZXRTbGlkZU51bWJlcihuKzEpLGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYi5jb250YWluZXIpLGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKGEpLGwuYWRkUmVjb21wZW5zZSgpLHIuYWRkTGlzdGVuZXJzKCkseS5yKCksQ1tOLmN1cnJlbnRdLm4oKSxCLnEoKSxpLmRpc3BhdGNoKFwib25PcGVuXCIpfX1mdW5jdGlvbiBMdCh0LGUsbil7cmV0dXJuIEx0PVR0KCk/UmVmbGVjdC5jb25zdHJ1Y3QuYmluZCgpOmZ1bmN0aW9uKHQsZSxuKXt2YXIgbz1bbnVsbF07by5wdXNoLmFwcGx5KG8sZSk7dmFyIGk9bmV3KEZ1bmN0aW9uLmJpbmQuYXBwbHkodCxvKSk7cmV0dXJuIG4mJnp0KGksbi5wcm90b3R5cGUpLGl9LEx0LmFwcGx5KG51bGwsYXJndW1lbnRzKX1mdW5jdGlvbiBUdCgpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBSZWZsZWN0fHwhUmVmbGVjdC5jb25zdHJ1Y3QpcmV0dXJuITE7aWYoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSlyZXR1cm4hMTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBQcm94eSlyZXR1cm4hMDt0cnl7cmV0dXJuIEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChCb29sZWFuLFtdLChmdW5jdGlvbigpe30pKSksITB9Y2F0Y2godCl7cmV0dXJuITF9fWZ1bmN0aW9uIHp0KHQsZSl7cmV0dXJuIHp0PU9iamVjdC5zZXRQcm90b3R5cGVPZj9PYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQuX19wcm90b19fPWUsdH0senQodCxlKX1mdW5jdGlvbiBTdCh0KXtyZXR1cm4gZnVuY3Rpb24odCl7aWYoQXJyYXkuaXNBcnJheSh0KSlyZXR1cm4gQXQodCl9KHQpfHxmdW5jdGlvbih0KXtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZudWxsIT10W1N5bWJvbC5pdGVyYXRvcl18fG51bGwhPXRbXCJAQGl0ZXJhdG9yXCJdKXJldHVybiBBcnJheS5mcm9tKHQpfSh0KXx8ZnVuY3Rpb24odCxlKXtpZih0KXtpZihcInN0cmluZ1wiPT10eXBlb2YgdClyZXR1cm4gQXQodCxlKTt2YXIgbj1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodCkuc2xpY2UoOCwtMSk7cmV0dXJuXCJPYmplY3RcIj09PW4mJnQuY29uc3RydWN0b3ImJihuPXQuY29uc3RydWN0b3IubmFtZSksXCJNYXBcIj09PW58fFwiU2V0XCI9PT1uP0FycmF5LmZyb20odCk6XCJBcmd1bWVudHNcIj09PW58fC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pP0F0KHQsZSk6dm9pZCAwfX0odCl8fGZ1bmN0aW9uKCl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIil9KCl9ZnVuY3Rpb24gQXQodCxlKXsobnVsbD09ZXx8ZT50Lmxlbmd0aCkmJihlPXQubGVuZ3RoKTtmb3IodmFyIG49MCxvPW5ldyBBcnJheShlKTtuPGU7bisrKW9bbl09dFtuXTtyZXR1cm4gb31mdW5jdGlvbiBJdCgpe2Zvcih2YXIgdD1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImFcIiksZT1mdW5jdGlvbihlKXtpZighdFtlXS5oYXNBdHRyaWJ1dGUoXCJkYXRhLWZzbGlnaHRib3hcIikpcmV0dXJuXCJjb250aW51ZVwiO3ZhciBuPXRbZV0uZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtpZighbilyZXR1cm4gY29uc29sZS53YXJuKCdUaGUgXCJkYXRhLWZzbGlnaHRib3hcIiBhdHRyaWJ1dGUgd2FzIHNldCB3aXRob3V0IHRoZSBcImhyZWZcIiBhdHRyaWJ1dGUuJyksXCJjb250aW51ZVwiO3ZhciBvPXRbZV0uZ2V0QXR0cmlidXRlKFwiZGF0YS1mc2xpZ2h0Ym94XCIpO2ZzTGlnaHRib3hJbnN0YW5jZXNbb118fChmc0xpZ2h0Ym94SW5zdGFuY2VzW29dPW5ldyBGc0xpZ2h0Ym94KTt2YXIgaT1udWxsO1wiI1wiPT09bi5jaGFyQXQoMCk/KGk9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobi5zdWJzdHJpbmcoMSkpLmNsb25lTm9kZSghMCkpLnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpOmk9bixmc0xpZ2h0Ym94SW5zdGFuY2VzW29dLnByb3BzLnNvdXJjZXMucHVzaChpKSxmc0xpZ2h0Ym94SW5zdGFuY2VzW29dLmVsZW1lbnRzLmEucHVzaCh0W2VdKTt2YXIgcz1mc0xpZ2h0Ym94SW5zdGFuY2VzW29dLnByb3BzLnNvdXJjZXMubGVuZ3RoLTE7dFtlXS5vbmNsaWNrPWZ1bmN0aW9uKHQpe3QucHJldmVudERlZmF1bHQoKSxmc0xpZ2h0Ym94SW5zdGFuY2VzW29dLm9wZW4ocyl9LGQoXCJjYXB0aW9uc1wiLFwiZGF0YS1jYXB0aW9uXCIpLGQoXCJ0eXBlc1wiLFwiZGF0YS10eXBlXCIpLGQoXCJ0aHVtYnNcIixcImRhdGEtdGh1bWJcIik7Zm9yKHZhciByPVtcImhyZWZcIixcImRhdGEtZnNsaWdodGJveFwiLFwiZGF0YS1jYXB0aW9uXCIsXCJkYXRhLXR5cGVcIixcImRhdGEtdGh1bWJcIl0sYT10W2VdLmF0dHJpYnV0ZXMsYz1mc0xpZ2h0Ym94SW5zdGFuY2VzW29dLnByb3BzLmN1c3RvbUF0dHJpYnV0ZXMsdT0wO3U8YS5sZW5ndGg7dSsrKWlmKC0xPT09ci5pbmRleE9mKGFbdV0ubmFtZSkmJlwiZGF0YS1cIj09PWFbdV0ubmFtZS5zdWJzdHIoMCw1KSl7Y1tzXXx8KGNbc109e30pO3ZhciBsPWFbdV0ubmFtZS5zdWJzdHIoNSk7Y1tzXVtsXT1hW3VdLnZhbHVlfWZ1bmN0aW9uIGQobixpKXt0W2VdLmhhc0F0dHJpYnV0ZShpKSYmKGZzTGlnaHRib3hJbnN0YW5jZXNbb10ucHJvcHNbbl1bc109dFtlXS5nZXRBdHRyaWJ1dGUoaSkpfX0sbj0wO248dC5sZW5ndGg7bisrKWUobik7dmFyIG89T2JqZWN0LmtleXMoZnNMaWdodGJveEluc3RhbmNlcyk7d2luZG93LmZzTGlnaHRib3g9ZnNMaWdodGJveEluc3RhbmNlc1tvW28ubGVuZ3RoLTFdXX1yZXR1cm4gd2luZG93LkZzTGlnaHRib3g9ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3RoaXMucHJvcHM9e3NvdXJjZXM6W10sbWF4WW91dHViZURpbWVuc2lvbnM6bnVsbCxjdXN0b21BdHRyaWJ1dGVzOltdLGN1c3RvbUNsYXNzZXM6W10sdHlwZXM6W10sdHlwZTpudWxsLHRodW1iczpbXSx0aHVtYnNJY29uczpbXSxjYXB0aW9uczpbXSx2aWRlb3NQb3N0ZXJzOltdLGN1c3RvbVRvb2xiYXJCdXR0b25zOltdLGluaXRpYWxBbmltYXRpb246cCxzbGlkZUNoYW5nZUFuaW1hdGlvbjpoLHNsaWRlRGlzdGFuY2U6LjMsc2xpZGVzaG93VGltZTo4ZTMsVUlGYWRlT3V0VGltZTo4ZTMsem9vbUluY3JlbWVudDouMjUsdG9vbGJhckJ1dHRvbnM6e3RodW1iczp7d2lkdGg6XCIxN3B4XCIsaGVpZ2h0OlwiMTdweFwiLHZpZXdCb3g6XCIwIDAgMjIgMjJcIixkOlwiTSAzIDIgQyAyLjQ0OCAyIDIgMi40NDggMiAzIEwgMiA2IEMgMiA2LjU1MiAyLjQ0OCA3IDMgNyBMIDYgNyBDIDYuNTUyIDcgNyA2LjU1MiA3IDYgTCA3IDMgQyA3IDIuNDQ4IDYuNTUyIDIgNiAyIEwgMyAyIHogTSAxMCAyIEMgOS40NDggMiA5IDIuNDQ4IDkgMyBMIDkgNiBDIDkgNi41NTIgOS40NDggNyAxMCA3IEwgMTMgNyBDIDEzLjU1MiA3IDE0IDYuNTUyIDE0IDYgTCAxNCAzIEMgMTQgMi40NDggMTMuNTUyIDIgMTMgMiBMIDEwIDIgeiBNIDE3IDIgQyAxNi40NDggMiAxNiAyLjQ0OCAxNiAzIEwgMTYgNiBDIDE2IDYuNTUyIDE2LjQ0OCA3IDE3IDcgTCAyMCA3IEMgMjAuNTUyIDcgMjEgNi41NTIgMjEgNiBMIDIxIDMgQyAyMSAyLjQ0OCAyMC41NTIgMiAyMCAyIEwgMTcgMiB6IE0gMyA5IEMgMi40NDggOSAyIDkuNDQ4IDIgMTAgTCAyIDEzIEMgMiAxMy41NTIgMi40NDggMTQgMyAxNCBMIDYgMTQgQyA2LjU1MiAxNCA3IDEzLjU1MiA3IDEzIEwgNyAxMCBDIDcgOS40NDggNi41NTIgOSA2IDkgTCAzIDkgeiBNIDEwIDkgQyA5LjQ0OCA5IDkgOS40NDggOSAxMCBMIDkgMTMgQyA5IDEzLjU1MiA5LjQ0OCAxNCAxMCAxNCBMIDEzIDE0IEMgMTMuNTUyIDE0IDE0IDEzLjU1MiAxNCAxMyBMIDE0IDEwIEMgMTQgOS40NDggMTMuNTUyIDkgMTMgOSBMIDEwIDkgeiBNIDE3IDkgQyAxNi40NDggOSAxNiA5LjQ0OCAxNiAxMCBMIDE2IDEzIEMgMTYgMTMuNTUyIDE2LjQ0OCAxNCAxNyAxNCBMIDIwIDE0IEMgMjAuNTUyIDE0IDIxIDEzLjU1MiAyMSAxMyBMIDIxIDEwIEMgMjEgOS40NDggMjAuNTUyIDkgMjAgOSBMIDE3IDkgeiBNIDMgMTYgQyAyLjQ0OCAxNiAyIDE2LjQ0OCAyIDE3IEwgMiAyMCBDIDIgMjAuNTUyIDIuNDQ4IDIxIDMgMjEgTCA2IDIxIEMgNi41NTIgMjEgNyAyMC41NTIgNyAyMCBMIDcgMTcgQyA3IDE2LjQ0OCA2LjU1MiAxNiA2IDE2IEwgMyAxNiB6IE0gMTAgMTYgQyA5LjQ0OCAxNiA5IDE2LjQ0OCA5IDE3IEwgOSAyMCBDIDkgMjAuNTUyIDkuNDQ4IDIxIDEwIDIxIEwgMTMgMjEgQyAxMy41NTIgMjEgMTQgMjAuNTUyIDE0IDIwIEwgMTQgMTcgQyAxNCAxNi40NDggMTMuNTUyIDE2IDEzIDE2IEwgMTAgMTYgeiBNIDE3IDE2IEMgMTYuNDQ4IDE2IDE2IDE2LjQ0OCAxNiAxNyBMIDE2IDIwIEMgMTYgMjAuNTUyIDE2LjQ0OCAyMSAxNyAyMSBMIDIwIDIxIEMgMjAuNTUyIDIxIDIxIDIwLjU1MiAyMSAyMCBMIDIxIDE3IEMgMjEgMTYuNDQ4IDIwLjU1MiAxNiAyMCAxNiBMIDE3IDE2IHpcIix0aXRsZTpcIlRodW1ibmFpbHNcIn0sem9vbUluOnt3aWR0aDpcIjIwcHhcIixoZWlnaHQ6XCIyMHB4XCIsdmlld0JveDpcIjAgMCAzMCAzMFwiLGQ6XCJNIDEzIDMgQyA3LjQ4ODk5NzEgMyAzIDcuNDg4OTk3MSAzIDEzIEMgMyAxOC41MTEwMDMgNy40ODg5OTcxIDIzIDEzIDIzIEMgMTUuMzk2NTA4IDIzIDE3LjU5NzM4NSAyMi4xNDg5ODYgMTkuMzIyMjY2IDIwLjczNjMyOCBMIDI1LjI5Mjk2OSAyNi43MDcwMzEgQSAxLjAwMDEgMS4wMDAxIDAgMSAwIDI2LjcwNzAzMSAyNS4yOTI5NjkgTCAyMC43MzYzMjggMTkuMzIyMjY2IEMgMjIuMTQ4OTg2IDE3LjU5NzM4NSAyMyAxNS4zOTY1MDggMjMgMTMgQyAyMyA3LjQ4ODk5NzEgMTguNTExMDAzIDMgMTMgMyB6IE0gMTMgNSBDIDE3LjQzMDEyMyA1IDIxIDguNTY5ODc3NCAyMSAxMyBDIDIxIDE3LjQzMDEyMyAxNy40MzAxMjMgMjEgMTMgMjEgQyA4LjU2OTg3NzQgMjEgNSAxNy40MzAxMjMgNSAxMyBDIDUgOC41Njk4Nzc0IDguNTY5ODc3NCA1IDEzIDUgeiBNIDEyLjk4NDM3NSA3Ljk4NjMyODEgQSAxLjAwMDEgMS4wMDAxIDAgMCAwIDEyIDkgTCAxMiAxMiBMIDkgMTIgQSAxLjAwMDEgMS4wMDAxIDAgMSAwIDkgMTQgTCAxMiAxNCBMIDEyIDE3IEEgMS4wMDAxIDEuMDAwMSAwIDEgMCAxNCAxNyBMIDE0IDE0IEwgMTcgMTQgQSAxLjAwMDEgMS4wMDAxIDAgMSAwIDE3IDEyIEwgMTQgMTIgTCAxNCA5IEEgMS4wMDAxIDEuMDAwMSAwIDAgMCAxMi45ODQzNzUgNy45ODYzMjgxIHpcIix0aXRsZTpcIlpvb20gSW5cIn0sem9vbU91dDp7d2lkdGg6XCIyMHB4XCIsaGVpZ2h0OlwiMjBweFwiLHZpZXdCb3g6XCIwIDAgMzAgMzBcIixkOlwiTSAxMyAzIEMgNy40ODg5OTcxIDMgMyA3LjQ4ODk5NzEgMyAxMyBDIDMgMTguNTExMDAzIDcuNDg4OTk3MSAyMyAxMyAyMyBDIDE1LjM5NjUwOCAyMyAxNy41OTczODUgMjIuMTQ4OTg2IDE5LjMyMjI2NiAyMC43MzYzMjggTCAyNS4yOTI5NjkgMjYuNzA3MDMxIEEgMS4wMDAxIDEuMDAwMSAwIDEgMCAyNi43MDcwMzEgMjUuMjkyOTY5IEwgMjAuNzM2MzI4IDE5LjMyMjI2NiBDIDIyLjE0ODk4NiAxNy41OTczODUgMjMgMTUuMzk2NTA4IDIzIDEzIEMgMjMgNy40ODg5OTcxIDE4LjUxMTAwMyAzIDEzIDMgeiBNIDEzIDUgQyAxNy40MzAxMjMgNSAyMSA4LjU2OTg3NzQgMjEgMTMgQyAyMSAxNy40MzAxMjMgMTcuNDMwMTIzIDIxIDEzIDIxIEMgOC41Njk4Nzc0IDIxIDUgMTcuNDMwMTIzIDUgMTMgQyA1IDguNTY5ODc3NCA4LjU2OTg3NzQgNSAxMyA1IHogTSA5IDEyIEEgMS4wMDAxIDEuMDAwMSAwIDEgMCA5IDE0IEwgMTcgMTQgQSAxLjAwMDEgMS4wMDAxIDAgMSAwIDE3IDEyIEwgOSAxMiB6XCIsdGl0bGU6XCJab29tIE91dFwifSxzbGlkZXNob3c6e3N0YXJ0Ont3aWR0aDpcIjE2cHhcIixoZWlnaHQ6XCIxNnB4XCIsdmlld0JveDpcIjAgMCAzMCAzMFwiLGQ6XCJNIDYgMyBBIDEgMSAwIDAgMCA1IDQgQSAxIDEgMCAwIDAgNSA0LjAwMzkwNjIgTCA1IDE1IEwgNSAyNS45OTYwOTQgQSAxIDEgMCAwIDAgNSAyNiBBIDEgMSAwIDAgMCA2IDI3IEEgMSAxIDAgMCAwIDYuNTgwMDc4MSAyNi44MTI1IEwgNi41ODIwMzEyIDI2LjgxNDQ1MyBMIDI2LjQxNjAxNiAxNS45MDgyMDMgQSAxIDEgMCAwIDAgMjcgMTUgQSAxIDEgMCAwIDAgMjYuMzg4NjcyIDE0LjA3ODEyNSBMIDYuNTgyMDMxMiAzLjE4NTU0NjkgTCA2LjU4MDA3ODEgMy4xODU1NDY5IEEgMSAxIDAgMCAwIDYgMyB6XCIsdGl0bGU6XCJUdXJuIG9uIHNsaWRlc2hvd1wifSxwYXVzZTp7d2lkdGg6XCIxNHB4XCIsaGVpZ2h0OlwiMTRweFwiLHZpZXdCb3g6XCIwIDAgMzU2LjE5IDM1Ni4xOVwiLGQ6XCJNMTIxLDBjMTgsMCwzMywxNSwzMywzM3YzNzJjMCwxOC0xNSwzMy0zMywzM3MtMzItMTUtMzItMzNWMzNDODksMTUsMTAzLDAsMTIxLDB6TTMxNywwYzE4LDAsMzIsMTUsMzIsMzN2MzcyYzAsMTgtMTQsMzMtMzIsMzNzLTMzLTE1LTMzLTMzVjMzQzI4NCwxNSwyOTksMCwzMTcsMHpcIix0aXRsZTpcIlR1cm4gb2ZmIHNsaWRlc2hvd1wifX0sZnVsbHNjcmVlbjp7ZW50ZXI6e3dpZHRoOlwiMjBweFwiLGhlaWdodDpcIjIwcHhcIix2aWV3Qm94OlwiMCAwIDE4IDE4XCIsZDpcIk00LjUgMTFIM3Y0aDR2LTEuNUg0LjVWMTF6TTMgN2gxLjVWNC41SDdWM0gzdjR6bTEwLjUgNi41SDExVjE1aDR2LTRoLTEuNXYyLjV6TTExIDN2MS41aDIuNVY3SDE1VjNoLTR6XCIsdGl0bGU6XCJFbnRlciBmdWxsc2NyZWVuXCJ9LGV4aXQ6e3dpZHRoOlwiMjRweFwiLGhlaWdodDpcIjI0cHhcIix2aWV3Qm94OlwiMCAwIDk1MCAxMDI0XCIsZDpcIk02ODIgMzQyaDEyOHY4NGgtMjEydi0yMTJoODR2MTI4ek01OTggODEwdi0yMTJoMjEydjg0aC0xMjh2MTI4aC04NHpNMzQyIDM0MnYtMTI4aDg0djIxMmgtMjEydi04NGgxMjh6TTIxNCA2ODJ2LTg0aDIxMnYyMTJoLTg0di0xMjhoLTEyOHpcIix0aXRsZTpcIkV4aXQgZnVsbHNjcmVlblwifX0sY2xvc2U6e3dpZHRoOlwiMjBweFwiLGhlaWdodDpcIjIwcHhcIix2aWV3Qm94OlwiMCAwIDI0IDI0XCIsZDpcIk0gNC43MDcwMzEyIDMuMjkyOTY4OCBMIDMuMjkyOTY4OCA0LjcwNzAzMTIgTCAxMC41ODU5MzggMTIgTCAzLjI5Mjk2ODggMTkuMjkyOTY5IEwgNC43MDcwMzEyIDIwLjcwNzAzMSBMIDEyIDEzLjQxNDA2MiBMIDE5LjI5Mjk2OSAyMC43MDcwMzEgTCAyMC43MDcwMzEgMTkuMjkyOTY5IEwgMTMuNDE0MDYyIDEyIEwgMjAuNzA3MDMxIDQuNzA3MDMxMiBMIDE5LjI5Mjk2OSAzLjI5Mjk2ODggTCAxMiAxMC41ODU5MzggTCA0LjcwNzAzMTIgMy4yOTI5Njg4IHpcIix0aXRsZTpcIkNsb3NlXCJ9fSxzbGlkZUJ1dHRvbnM6e3ByZXZpb3VzOnt3aWR0aDpcIjIwcHhcIixoZWlnaHQ6XCIyMHB4XCIsdmlld0JveDpcIjAgMCAyMCAyMFwiLGQ6XCJNMTguMjcxLDkuMjEySDMuNjE1bDQuMTg0LTQuMTg0YzAuMzA2LTAuMzA2LDAuMzA2LTAuODAxLDAtMS4xMDdjLTAuMzA2LTAuMzA2LTAuODAxLTAuMzA2LTEuMTA3LDBMMS4yMSw5LjQwM0MxLjE5NCw5LjQxNywxLjE3NCw5LjQyMSwxLjE1OCw5LjQzN2MtMC4xODEsMC4xODEtMC4yNDIsMC40MjUtMC4yMDksMC42NmMwLjAwNSwwLjAzOCwwLjAxMiwwLjA3MSwwLjAyMiwwLjEwOWMwLjAyOCwwLjA5OCwwLjA3NSwwLjE4OCwwLjE0MiwwLjI3MWMwLjAyMSwwLjAyNiwwLjAyMSwwLjA2MSwwLjA0NSwwLjA4NWMwLjAxNSwwLjAxNiwwLjAzNCwwLjAyLDAuMDUsMC4wMzNsNS40ODQsNS40ODNjMC4zMDYsMC4zMDcsMC44MDEsMC4zMDcsMS4xMDcsMGMwLjMwNi0wLjMwNSwwLjMwNi0wLjgwMSwwLTEuMTA1bC00LjE4NC00LjE4NWgxNC42NTZjMC40MzYsMCwwLjc4OC0wLjM1MywwLjc4OC0wLjc4OFMxOC43MDcsOS4yMTIsMTguMjcxLDkuMjEyelwiLHRpdGxlOlwiUHJldmlvdXNcIn0sbmV4dDp7d2lkdGg6XCIyMHB4XCIsaGVpZ2h0OlwiMjBweFwiLHZpZXdCb3g6XCIwIDAgMjAgMjBcIixkOlwiTTEuNzI5LDkuMjEyaDE0LjY1NmwtNC4xODQtNC4xODRjLTAuMzA3LTAuMzA2LTAuMzA3LTAuODAxLDAtMS4xMDdjMC4zMDUtMC4zMDYsMC44MDEtMC4zMDYsMS4xMDYsMGw1LjQ4MSw1LjQ4MmMwLjAxOCwwLjAxNCwwLjAzNywwLjAxOSwwLjA1MywwLjAzNGMwLjE4MSwwLjE4MSwwLjI0MiwwLjQyNSwwLjIwOSwwLjY2Yy0wLjAwNCwwLjAzOC0wLjAxMiwwLjA3MS0wLjAyMSwwLjEwOWMtMC4wMjgsMC4wOTgtMC4wNzUsMC4xODgtMC4xNDMsMC4yNzFjLTAuMDIxLDAuMDI2LTAuMDIxLDAuMDYxLTAuMDQ1LDAuMDg1Yy0wLjAxNSwwLjAxNi0wLjAzNCwwLjAyLTAuMDUxLDAuMDMzbC01LjQ4Myw1LjQ4M2MtMC4zMDYsMC4zMDctMC44MDIsMC4zMDctMS4xMDYsMGMtMC4zMDctMC4zMDUtMC4zMDctMC44MDEsMC0xLjEwNWw0LjE4NC00LjE4NUgxLjcyOWMtMC40MzYsMC0wLjc4OC0wLjM1My0wLjc4OC0wLjc4OFMxLjI5Myw5LjIxMiwxLjcyOSw5LjIxMnpcIix0aXRsZTpcIk5leHRcIn19fSx0aGlzLmRhdGE9e2lzVGh1bWJpbmc6ITEsc2Nyb2xsYmFyV2lkdGg6MH0sdGhpcy5pZnM9ITEsdGhpcy5pc2w9W10sdGhpcy5xcz1bXSx0aGlzLnRzPVtdLHRoaXMuenY9MSx0aGlzLnA9e3A6e30sdXg6MCx1eTowfSx0aGlzLnN0YWdlSW5kZXhlcz17fSx0aGlzLmVsZW1lbnRzPXthOltdLGNhcHRpb25zOltdLGNvbnRhaW5lcjpudWxsLG5hdjpudWxsLHNsaWRlQnV0dG9uUHJldmlvdXM6bnVsbCxzbGlkZUJ1dHRvbk5leHQ6bnVsbCxzb3VyY2VzOltdfSx0aGlzLnNhdz1bXSx0aGlzLnNldz1bXSx0aGlzLnNtdz1bXSx0aGlzLmNvbXBvbmVudHNTZXJ2aWNlcz17c2V0U2xpZGVOdW1iZXI6ZnVuY3Rpb24oKXt9fSx0aGlzLmY9ZnVuY3Rpb24oZSl7Zm9yKHZhciBuPTA7bjx0LmM7bisrKWUobil9LHRoaXMubT1mdW5jdGlvbihlLG4pe3JldHVybiBmdW5jdGlvbigpe2Zvcih2YXIgbz1hcmd1bWVudHMubGVuZ3RoLGk9bmV3IEFycmF5KG8pLHM9MDtzPG87cysrKWlbc109YXJndW1lbnRzW3NdO2kudW5zaGlmdCh0KSxuLmFwcGx5KHZvaWQgMCxpKSYmZS5hcHBseSh2b2lkIDAsaSl9fSx0aGlzLnJlc29sdmU9ZnVuY3Rpb24oZSl7dmFyIG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOltdO3JldHVybiBuLnVuc2hpZnQodCksTHQoZSxTdChuKSl9LHRoaXMucj10aGlzLnJlc29sdmUsdGhpcy5jb2xsZWN0aW9ucz17c291cmNlTG9hZEhhbmRsZXJzOltdLHNvdXJjZXNSZW5kZXJGdW5jdGlvbnM6W119LHRoaXMuc3o9W10sdGhpcy5jb3JlPXtjbGFzc0ZhY2FkZTp7fSxjbGlja1pvb21lcjp7fSxldmVudHNEaXNwYXRjaGVyOnt9LGdsb2JhbEV2ZW50c0NvbnRyb2xsZXI6e30sbGlnaHRib3hDbG9zZXI6e30sbGlnaHRib3hVcGRhdGVyOnt9LHBvaW50ZXJpbmdCdWNrZXQ6e30sc2Nyb2xsYmFyUmVjb21wZW5zb3I6e30sc2xpZGVDaGFuZ2VGYWNhZGU6e30sc2xpZGVJbmRleENoYW5nZXI6e30sc291cmNlRGlzcGxheUZhY2FkZTp7fSxzd2lwaW5nQWN0aW9uZXI6e319LHRoaXMuZWE9e30sdGhpcy5mcz17fSx0aGlzLmxhPXt9LHRoaXMuc3M9e30sdGhpcy5zdD17fSx0aGlzLnN3cz17fSx0aGlzLnVpPXt9LHRoaXMuej17fSx0aGlzLnQ9ZnVuY3Rpb24oZSxuKXt2YXIgbz10LnRzLnB1c2goc2V0VGltZW91dCgoZnVuY3Rpb24oKXtkZWxldGUgdC50c1tvLTFdLGUoKX0pLG4pKX0sdGhpcy5xPWZ1bmN0aW9uKGUsbil7dmFyIG89dC5xcy5wdXNoKDApLTE7cmV0dXJuIGZ1bmN0aW9uKCl7dC5xc1tvXSsrLHQudCgoZnVuY3Rpb24oKXt0LnFzW29dLS0sdC5xc1tvXXx8ZSgpfSksbil9fSxDdCh0aGlzKSx0aGlzLmNsb3NlPWZ1bmN0aW9uKCl7cmV0dXJuIHQuY29yZS5saWdodGJveENsb3Nlci5jbG9zZSgpfX0sd2luZG93LmZzTGlnaHRib3hJbnN0YW5jZXM9e30sSXQoKSx3aW5kb3cucmVmcmVzaEZzTGlnaHRib3g9ZnVuY3Rpb24oKXtmb3IodmFyIHQgaW4gZnNMaWdodGJveEluc3RhbmNlcyl7dmFyIGU9ZnNMaWdodGJveEluc3RhbmNlc1t0XS5wcm9wcztmc0xpZ2h0Ym94SW5zdGFuY2VzW3RdPW5ldyBGc0xpZ2h0Ym94LGZzTGlnaHRib3hJbnN0YW5jZXNbdF0ucHJvcHM9ZSxmc0xpZ2h0Ym94SW5zdGFuY2VzW3RdLnByb3BzLnNvdXJjZXM9W10sZnNMaWdodGJveEluc3RhbmNlc1t0XS5lbGVtZW50cy5hPVtdfUl0KCl9LHR9KSgpKSk7IiwialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgXG4gIGpRdWVyeSgnW2RhdGEtbW9kYWxdJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygnZnVjayBtZSAnKTtcblxuICAgIHZhciBkYXRhX21vZGFsID0galF1ZXJ5KHRoaXMpLmRhdGEoJ21vZGFsJyk7XG5cbiAgICBqUXVlcnkoIGRhdGFfbW9kYWwgKS55c3BfbW9kYWwoe1xuICAgIFx0Y2xvc2VUZXh0OiAnWCcsXG4gICAgICBtb2RhbENsYXNzOiAneXNwLW1vZGFsLW9wZW4nLFxuICAgICAgY2xvc2VDbGFzczogJ3lzcC1tb2RlbC1jbG9zZSdcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuZnVuY3Rpb24gY29weUxpbmsoKSB7XG5cbiAgdmFyIGNvcHlUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3B5TGlua0lucHV0XCIpO1xuXG4gIGNvcHlUZXh0LnNlbGVjdCgpO1xuICBjb3B5VGV4dC5zZXRTZWxlY3Rpb25SYW5nZSgwLCA5OTk5OSk7XG5cbiAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xuXG4gIGFsZXJ0KFwiQ29waWVkIHRoZSBsaW5rOiBcIiArIGNvcHlUZXh0LnZhbHVlKTtcbn0iLCJPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RyaW5nLnByb3RvdHlwZSwgJ2VhY2hXb3JkQ2FwaXRhbGl6ZScsIHtcbiAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRvTG93ZXJDYXNlKClcbiAgICAuc3BsaXQoJyAnKVxuICAgIC5tYXAoKHMpID0+IHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnN1YnN0cmluZygxKSlcbiAgICAuam9pbignICcpO1xuICB9LFxuICBlbnVtZXJhYmxlOiBmYWxzZVxufSk7XG5cbmZ1bmN0aW9uIHJhaXlzX2dldF9mb3JtX2RhdGEoZm9ybV9lbGUpIHtcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoIGZvcm1fZWxlICk7XG5cbiAgICBsZXQgZmQ9T2JqZWN0LmZyb21FbnRyaWVzKGZvcm1EYXRhLmVudHJpZXMoKSk7XG5cbiAgICBmb3IgKGNvbnN0IFtmSW5kZXgsIGZpZWxkXSBvZiBPYmplY3QuZW50cmllcyhmZCkpIHtcblxuICAgICAgICBsZXQgVmFsQXJyYXkgPSBmb3JtRGF0YS5nZXRBbGwoZkluZGV4KTtcblxuICAgICAgICBpZiAodHlwZW9mIFZhbEFycmF5WzFdICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBmZFsgZkluZGV4IF0gPSBWYWxBcnJheTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmZFsgZkluZGV4IF0gPT0gJycpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBmZFtmSW5kZXhdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZkO1xufVxuXG5mdW5jdGlvbiByYWl5c19zZXRfZm9ybV90b19kYXRhKGlucHV0RGF0YSkge1xuXG4gICAgbGV0IGZvcm1BPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0nKTtcbiAgICBsZXQgZm9ybUI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0nKTtcblxuICAgIGZvcm1BLnJlc2V0KCk7XG4gICAgZm9ybUIucmVzZXQoKTtcblxuICAgIGxldCBmb3JtSW5wdXRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLXlhY2h0LXNlYXJjaC1mb3JtXCJdLCAjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtXCJdJyk7XG5cbiAgICBmb3JtSW5wdXRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICBsZXQgaW5wdXQgPSBlbGU7XG5cbiAgICAgICAgbGV0IG5hbWUgPSBlbGUuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgbGV0IGhhc1ByZXR0eSA9IGlucHV0RGF0YVsgbmFtZSBdO1xuXG4gICAgICAgLy8gY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICBpZiAodHlwZW9mIGhhc1ByZXR0eSAhPSAnbnVsbCcgJiYgdHlwZW9mIGhhc1ByZXR0eSAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShoYXNQcmV0dHkpKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhoYXNQcmV0dHkpO1xuXG4gICAgICAgICAgICAgICAgaGFzUHJldHR5LmZvckVhY2goKGhQKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaFAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGhhc1ByZXR0eSApIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dC50eXBlICE9ICdjaGVja2JveCcgJiYgaW5wdXQudHlwZSAhPSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gaGFzUHJldHR5O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmFpeXNfcHVzaF9oaXN0b3J5KCBkYXRhID0ge30gKSB7XG4gICAgbGV0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBsZXQgc3RycGF0aD0nJztcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBsZXQgaXQgPSBkYXRhWyBwcm9wZXJ0eSBdO1xuXG5cbiAgICAgICAgaWYgKGl0ICE9ICcnICYmIHR5cGVvZiBpdCAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgaXQgPT0gJ3N0cmluZycgJiYgcHJvcGVydHkgIT0gJ09uRmlyc3RMb2FkJyAmJiB0eXBlb2YgaXQgIT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQocHJvcGVydHksIGl0KTtcblxuICAgICAgICAgICAgc3RycGF0aD1zdHJwYXRoK1wiXCIrcHJvcGVydHkrJy0nKyhpdC50b1N0cmluZygpLnNwbGl0KCcgJykuam9pbignLScpKSsnLyc7XG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0KSkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChwcm9wZXJ0eSwgaXQpO1xuXG4gICAgICAgICAgICBpdCA9IGl0Lm1hcCgocHJvcCkgPT4geyByZXR1cm4gcHJvcC50b1N0cmluZygpLnNwbGl0KCcgJykuam9pbignLScpOyB9KTtcblxuICAgICAgICAgICAgc3RycGF0aD1zdHJwYXRoK1wiXCIrcHJvcGVydHkrJy0nKyggaXQuam9pbihcIitcIikgKSsnLyc7XG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgudG9Mb3dlckNhc2UoKTsgIFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vaGlzdG9yeS5wdXNoU3RhdGUoZGF0YSwgJycsIHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF91cmwrJz8nK3NlYXJjaFBhcmFtcy50b1N0cmluZygpKTtcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZShkYXRhLCAnJywgcmFpX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3VybCtzdHJwYXRoKTtcblxuICAgIHJldHVybiByYWlfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfdXJsK3N0cnBhdGg7ICAgIFxufVxuXG4iLCJ2YXIgcmFpX3lzcF9hcGk9e307XG5cbiAgICByYWlfeXNwX2FwaS5jYWxsX2FwaT1mdW5jdGlvbihtZXRob2QsIHBhdGgsIHBhc3NpbmdfZGF0YSkge1xuICAgICAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiB0aGlzLnN0YXR1cyA9PSAyMDApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2VEYXRhID0gSlNPTi5wYXJzZSggdGhpcy5yZXNwb25zZVRleHQgKTtcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlRGF0YSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0dFVCc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhc3NpbmdfZGF0YS5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBwYXNzaW5nX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KHByb3BlcnR5LCBwYXNzaW5nX2RhdGFbIHByb3BlcnR5IF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgX3F1ZXN0aW9uTWFyaz1zZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIHJhaV95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wicmFpeXMvXCIrIHBhdGggKyAoKF9xdWVzdGlvbk1hcmsgIT0gJycpPyc/JytzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTonJyksIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLnNlbmQoKTtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1BPU1QnOlxuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLm9wZW4oXCJQT1NUXCIsIHJhaV95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wicmFpeXMvXCIrIHBhdGgsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeShwYXNzaW5nX2RhdGEpKTtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcblxuICAgIH07IiwidmFyIHlzcF90ZW1wbGF0ZXM9e307XG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQ9e307XG5cdFxuXHR5c3BfdGVtcGxhdGVzLnlhY2h0LmdyaWQ9ZnVuY3Rpb24odmVzc2VsLCBwYXJhbXMpIHtcblx0XHRsZXQgbWV0ZXJzID0gcGFyc2VJbnQodmVzc2VsLk5vbWluYWxMZW5ndGgpICogMC4zMDQ4O1xuXG5cdFx0bGV0IHByaWNlID0gJyc7XG5cdFx0bGV0IGxlbmd0aCA9ICcnO1xuXG5cdFx0aWYgKHJhaV95YWNodF9zeW5jLmV1cm9wZV9vcHRpb25fcGlja2VkID09IFwieWVzXCIpIHtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cdFx0XHRwcmljZSA9ICh0eXBlb2YgdmVzc2VsLllTUF9FdXJvVmFsICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5ZU1BfRXVyb1ZhbCA+IDApID8gYOKCrCR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHZlc3NlbC5ZU1BfRXVyb1ZhbCkgfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnO1xuXHRcdH0gXG5cdFx0ZWxzZSB7XG5cdFx0XHRsZW5ndGggPSB2ZXNzZWwuTm9taW5hbExlbmd0aCA/IHZlc3NlbC5Ob21pbmFsTGVuZ3RoICsgXCIgLyBcIiArIG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnO1xuXG5cdFx0XHRpZiAocGFyYW1zLmN1cnJlbmN5ID09ICdFdXInKSB7XG5cdFx0XHRcdHByaWNlID0gKHR5cGVvZiB2ZXNzZWwuWVNQX1VTRFZhbCAhPSAndW5kZWZpbmVkJyAmJiB2ZXNzZWwuWVNQX1VTRFZhbCA+IDApID8gYOKCrCR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHZlc3NlbC5ZU1BfRXVyb1ZhbCkgfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHByaWNlID0gKHR5cGVvZiB2ZXNzZWwuWVNQX1VTRFZhbCAhPSAndW5kZWZpbmVkJyAmJiB2ZXNzZWwuWVNQX1VTRFZhbCA+IDApID8gYCQke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdCh2ZXNzZWwuWVNQX1VTRFZhbCkgfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnO1xuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGBcblx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1yZXN1bHQtZ3JpZC1pdGVtXCIgZGF0YS1wb3N0LWlkPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiIGRhdGEteWFjaHQtaWQ9XCIkeyB2ZXNzZWwuRG9jdW1lbnRJRCB9XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1tYWluLWltYWdlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdDxhIGNsYXNzPVwieWFjaHQtZGV0YWlsc1wiIGhyZWY9XCIkeyB2ZXNzZWwuX2xpbmsgfVwiPlxuXHRcdFx0XHRcdFx0PGltZyBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2VcIiBzcmM9XCIke3Zlc3NlbC5JbWFnZXMgPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6IHJhaV95YWNodF9zeW5jLmFzc2V0c191cmwgKyAnaW1hZ2VzL2RlZmF1bHQteWFjaHQtaW1hZ2UuanBlZyd9XCIgYWx0PVwieWFjaHQtaW1hZ2VcIiBsb2FkaW5nPVwibGF6eVwiIC8+XG5cdFx0XHRcdFx0XHQke3Zlc3NlbC5Db21wYW55TmFtZSA9PT0gcmFpX3lhY2h0X3N5bmMuY29tcGFueV9uYW1lID8gYDxkaXYgY2xhc3M9XCJjb21wYW55LWJhbm5lclwiPjxpbWcgc3JjPVwiJHtyYWlfeWFjaHRfc3luYy5jb21wYW55X2xvZ299XCI+PC9kaXY+YCA6ICcnfVxuXHRcdFx0XHRcdDwvYT5cdFxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWdlbmVyYWwtaW5mby1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtdGl0bGUtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzcz1cInlhY2h0LWRldGFpbHNcIiBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdFx0PGg2IGNsYXNzPVwieWFjaHQtdGl0bGVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJyd9ICR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICcnfSAke3Zlc3NlbC5Nb2RlbCA/IHZlc3NlbC5Nb2RlbCA6ICcnfSAke3Zlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICcnfTwvaDY+XG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZm8tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5ZZWFyPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5DYWJpbnM8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuQ2FiaW5zQ291bnROdW1lcmljID8gdmVzc2VsLkNhYmluc0NvdW50TnVtZXJpYyA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkJ1aWxkZXI8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+TGVuZ3RoPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7bGVuZ3RofTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkNvbXBhcmU8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY29tcGFyZV90b2dnbGVcIiBuYW1lPVwiY29tcGFyZVwiIHZhbHVlPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiIC8+PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1wcmljZS1kZXRhaWxzLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXByaWNlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LXByaWNlXCI+JHtwcmljZX08L3A+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cInlhY2h0LWRvd25sb2FkLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBkYXRhLW1vZGFsPVwiI3NpbmdsZS1zaGFyZVwiPkNvbnRhY3Q8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCJsb3ZlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEteWFjaHQtaWQ9XCIkeyB2ZXNzZWwuRG9jdW1lbnRJRCB9XCI+TGlrZWQ8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXHR9O1xuXG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQubGlzdD1mdW5jdGlvbih2ZXNzZWwpIHtcblx0XHRsZXQgbWV0ZXJzID0gcGFyc2VJbnQodmVzc2VsLk5vbWluYWxMZW5ndGgpICogMC4zMDQ4O1xuXHRcdGxldCBwcmljZSA9ICcnO1xuXG5cdFx0aWYgKHR5cGVvZiB2ZXNzZWwuUHJpY2UgPT0gJ3N0cmluZycpIHtcblx0XHRcdGxldCBwcmljZSA9IHZlc3NlbC5QcmljZS5zbGljZSgwLCAtMyk7XG5cdFx0fVxuXHRcdFxuXHRcdGxldCBsZW5ndGggPSAnJztcblx0XHRcblx0XHRpZihyYWlfeWFjaHRfc3luYy5ldXJvcGVfb3B0aW9uX3BpY2tlZCA9PSBcInllc1wiKXtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cdFx0XHRwcmljZSA9IHZlc3NlbC5QcmljZSA/IGDigqwgJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQoKHBhcnNlSW50KHZlc3NlbC5QcmljZS5zbGljZSgwLCAtMykpICogcmFpX3lhY2h0X3N5bmMuZXVyb19jX2MpKX1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyB2ZXNzZWwuTm9taW5hbExlbmd0aCArIFwiIC8gXCIgKyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblx0XHRcdHByaWNlID0gdmVzc2VsLlByaWNlID8gYCQgJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQocGFyc2VJbnQodmVzc2VsLlByaWNlLnNsaWNlKDAsIC0zKSkpfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGBcblx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1yZXN1bHQtZ3JpZC1pdGVtIGxpc3Qtdmlld1wiIGRhdGEtcG9zdC1pZD1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2UtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGEgY2xhc3M9XCJ5YWNodC1kZXRhaWxzXCIgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZVwiIHNyYz1cIiR7dmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogdmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogcmFpX3lhY2h0X3N5bmMuYXNzZXRzX3VybCArICdpbWFnZXMvZGVmYXVsdC15YWNodC1pbWFnZS5qcGVnJ31cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtZ2VuZXJhbC1pbmZvLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC10aXRsZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxhIGNsYXNzPVwieWFjaHQtZGV0YWlsc1wiIGhyZWY9XCIkeyB2ZXNzZWwuX2xpbmsgfVwiPlxuXHRcdFx0XHRcdFx0XHQ8aDYgY2xhc3M9XCJ5YWNodC10aXRsZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnJ30gJHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJyd9ICR7dmVzc2VsLk1vZGVsID8gdmVzc2VsLk1vZGVsIDogJyd9ICR7dmVzc2VsLkJvYXROYW1lID8gdmVzc2VsLkJvYXROYW1lIDogJyd9PC9oNj5cblx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5mby1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmZvXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPlllYXI8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkNhYmluczwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5DYWJpbnNDb3VudE51bWVyaWMgPyB2ZXNzZWwuQ2FiaW5zQ291bnROdW1lcmljIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+QnVpbGRlcjwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5MZW5ndGg8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHtsZW5ndGh9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1wcmljZS1kZXRhaWxzLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXByaWNlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LXByaWNlXCI+JHtwcmljZX08L3A+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCJ5YWNodC1kb3dubG9hZC1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1tb2RhbD1cIiNzaW5nbGUtc2hhcmVcIj5Db250YWN0PC9idXR0b24+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHRcblx0XHRgO1xuXHR9O1xuXG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQuY29tcGFyZV9wcmV2aWV3ID0gZnVuY3Rpb24odmVzc2VsLCBwYXJhbXMpIHtcblxuXHRcdHJldHVybiBgXG5cblx0XHRcdDxkaXYgY2xhc3M9XCJ5c3AteWFjaHQtY29tcGFyZS1wcmV2aWV3XCIgZGF0YS1wb3N0LWlkPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiIGRhdGEteWFjaHQtaWQ9XCIkeyB2ZXNzZWwuRG9jdW1lbnRJRCB9XCI+XHRcdFx0XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwicmVtb3ZlLWZyb20tY29tcGFyZVwiPlxuXHRcdFx0XHRcdDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdFx0XHRcdDxyZWN0IHg9XCIwLjVcIiB5PVwiMC41XCIgd2lkdGg9XCIyM1wiIGhlaWdodD1cIjIzXCIgcng9XCIxMS41XCIgc3Ryb2tlPVwiIzZCNzA3M1wiLz5cblx0XHRcdFx0XHQ8cGF0aCBkPVwiTTguMjY4NzYgMTQuOTM0NkM4LjA0OTA5IDE1LjE1NDMgOC4wNDkwOSAxNS41MTA0IDguMjY4NzYgMTUuNzMwMUM4LjQ4ODQzIDE1Ljk0OTggOC44NDQ1OCAxNS45NDk4IDkuMDY0MjUgMTUuNzMwMUw4LjI2ODc2IDE0LjkzNDZaTTEyLjM5NzYgMTIuMzk2OEMxMi42MTczIDEyLjE3NzEgMTIuNjE3MyAxMS44MjA5IDEyLjM5NzYgMTEuNjAxM0MxMi4xNzc5IDExLjM4MTYgMTEuODIxOCAxMS4zODE2IDExLjYwMjEgMTEuNjAxM0wxMi4zOTc2IDEyLjM5NjhaTTExLjYwMTggMTEuNjAxNkMxMS4zODIxIDExLjgyMTMgMTEuMzgyMSAxMi4xNzc0IDExLjYwMTggMTIuMzk3MUMxMS44MjE0IDEyLjYxNjggMTIuMTc3NiAxMi42MTY4IDEyLjM5NzMgMTIuMzk3MUwxMS42MDE4IDExLjYwMTZaTTE1LjczMDYgOS4wNjM3NkMxNS45NTAzIDguODQ0MDkgMTUuOTUwMyA4LjQ4Nzk0IDE1LjczMDYgOC4yNjgyN0MxNS41MTA5IDguMDQ4NiAxNS4xNTQ4IDguMDQ4NiAxNC45MzUxIDguMjY4MjdMMTUuNzMwNiA5LjA2Mzc2Wk0xMi4zOTczIDExLjYwMTNDMTIuMTc3NiAxMS4zODE2IDExLjgyMTQgMTEuMzgxNiAxMS42MDE4IDExLjYwMTNDMTEuMzgyMSAxMS44MjA5IDExLjM4MjEgMTIuMTc3MSAxMS42MDE4IDEyLjM5NjhMMTIuMzk3MyAxMS42MDEzWk0xNC45MzUxIDE1LjczMDFDMTUuMTU0OCAxNS45NDk4IDE1LjUxMDkgMTUuOTQ5OCAxNS43MzA2IDE1LjczMDFDMTUuOTUwMyAxNS41MTA0IDE1Ljk1MDMgMTUuMTU0MyAxNS43MzA2IDE0LjkzNDZMMTQuOTM1MSAxNS43MzAxWk0xMS42MDIxIDEyLjM5NzFDMTEuODIxOCAxMi42MTY4IDEyLjE3NzkgMTIuNjE2OCAxMi4zOTc2IDEyLjM5NzFDMTIuNjE3MyAxMi4xNzc0IDEyLjYxNzMgMTEuODIxMyAxMi4zOTc2IDExLjYwMTZMMTEuNjAyMSAxMi4zOTcxWk05LjA2NDI1IDguMjY4MjdDOC44NDQ1OCA4LjA0ODYgOC40ODg0MyA4LjA0ODYgOC4yNjg3NiA4LjI2ODI3QzguMDQ5MDkgOC40ODc5NCA4LjA0OTA5IDguODQ0MDkgOC4yNjg3NiA5LjA2Mzc2TDkuMDY0MjUgOC4yNjgyN1pNOS4wNjQyNSAxNS43MzAxTDEyLjM5NzYgMTIuMzk2OEwxMS42MDIxIDExLjYwMTNMOC4yNjg3NiAxNC45MzQ2TDkuMDY0MjUgMTUuNzMwMVpNMTIuMzk3MyAxMi4zOTcxTDE1LjczMDYgOS4wNjM3NkwxNC45MzUxIDguMjY4MjdMMTEuNjAxOCAxMS42MDE2TDEyLjM5NzMgMTIuMzk3MVpNMTEuNjAxOCAxMi4zOTY4TDE0LjkzNTEgMTUuNzMwMUwxNS43MzA2IDE0LjkzNDZMMTIuMzk3MyAxMS42MDEzTDExLjYwMTggMTIuMzk2OFpNMTIuMzk3NiAxMS42MDE2TDkuMDY0MjUgOC4yNjgyN0w4LjI2ODc2IDkuMDYzNzZMMTEuNjAyMSAxMi4zOTcxTDEyLjM5NzYgMTEuNjAxNlpcIiBmaWxsPVwiIzZCNzA3M1wiLz5cblx0XHRcdFx0XHQ8L3N2Zz5cblx0XHRcdFx0PC9zcGFuPlxuXG5cblx0XHRcdFx0PGltZyBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2VcIiBzcmM9XCIke3Zlc3NlbC5JbWFnZXMgPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6IHJhaV95YWNodF9zeW5jLmFzc2V0c191cmwgKyAnaW1hZ2VzL2RlZmF1bHQteWFjaHQtaW1hZ2UuanBlZyd9XCIgYWx0PVwieWFjaHQtaW1hZ2VcIiBsb2FkaW5nPVwibGF6eVwiIC8+XG5cblx0XHRcdFx0PGg2IGNsYXNzPVwieWFjaHQtdGl0bGVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJyd9ICR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICcnfSAke3Zlc3NlbC5Nb2RlbCA/IHZlc3NlbC5Nb2RlbCA6ICcnfSAke3Zlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICcnfTwvaDY+XG5cblx0XHRcdDwvZGl2PlxuXG5cdFx0YDtcblxuXHR9O1xuXG5cdHlzcF90ZW1wbGF0ZXMubm9SZXN1bHRzPWZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxiPk5vIFJlc3VsdHM8L2I+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgIH07XG5cblxuICAgIHlzcF90ZW1wbGF0ZXMueWFjaHRfdGFnID0gZnVuY3Rpb24obGFiZWwsIHZhbHVlKSB7XG5cbiAgICBcdHJldHVybiBgXG4gICAgXHRcdDxzcGFuPlxuXHQgICAgXHRcdCR7dmFsdWV9XG5cblx0ICAgIFx0XHQ8aW1nIHNyYz1cIiR7cmFpX3lhY2h0X3N5bmMuYXNzZXRzX3VybH0vaW1hZ2VzL3JlbW92ZS10YWcucG5nXCI+XG5cdFx0XHQ8L3NwYW4+XG4gICAgXHRgO1xuICAgIH07XG5cbiAgICB5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24gPSB7fTtcbiAgICBcbiAgICBcdHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5uZXh0X3RleHQgPSBgPmA7XG5cbiAgICBcdHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5wcmV2X3RleHQgPSBgPGA7XG5cbiIsIlxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cblx0bGV0IGVsZV9xdWlja19zZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXF1aWNrLXNlYXJjaC1mb3JtJyk7XG5cblx0aWYgKGVsZV9xdWlja19zZWFyY2gpIHtcblx0XHQvLyBGaWxsIG9wdGlvbnNcblx0ICAgIGxldCBGaWxsT3B0aW9ucz1bXTtcblx0ICAgIGxldCBzZWxlY3RvckVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi55c3AtcXVpY2stc2VhcmNoLWZvcm0gc2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zXVwiKTtcblxuXHQgICAgc2VsZWN0b3JFbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICBGaWxsT3B0aW9ucy5wdXNoKGVsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1vcHRpb25zJykpO1xuXHQgICAgfSk7XG5cdCAgICBcblx0ICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpKCdQT1NUJywgJ2Ryb3Bkb3duLW9wdGlvbnMnLCB7bGFiZWxzOiBGaWxsT3B0aW9uc30pLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcblx0ICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG5cdCAgICAgICAgICAgIGxldCBTZWxlY3RvckVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIueXNwLXF1aWNrLXNlYXJjaC1mb3JtIHNlbGVjdFtkYXRhLWZpbGwtb3B0aW9ucz0nXCIrIGxhYmVsICtcIiddXCIpO1xuXHQgICAgICAgICAgICBsZXQgbmFtZSA9IFNlbGVjdG9yRWxlWzBdLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG5cdCAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblx0ICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuXHQgICAgICAgICAgICAgICAgXHRsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuXHRcdCAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBiO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuXHQgICAgICAgICAgICAgICAgICAgIGVsZS5hZGQob3B0aW9uKTtcblx0ICAgICAgICAgICAgICAgIH0pO1xuXHQgICAgICAgICAgICB9KTtcblxuXHQgICAgICAgICAgICBsZXQgVVJMUkVGID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcblx0ICAgICAgICAgICAgbGV0IFVybFZhbCA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCBuYW1lICk7XG5cblx0ICAgICAgICAgICAgbGV0IHN0cnBhdGhzPXdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG5cdCAgICAgICAgICAgIHN0cnBhdGhzPXN0cnBhdGhzLnJlcGxhY2UocmFpX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3BhZ2VfaWQsICcnKTtcblxuXHQgICAgICAgICAgICBsZXQgcGF0aHMgPSBzdHJwYXRocy5zcGxpdChcIi9cIik7XG5cblx0ICAgICAgICAgICAgbGV0IHByZXR0eV91cmxfcGF0aF9wYXJhbXM9e307XG5cblx0ICAgICAgICAgICAgcGF0aHMuZm9yRWFjaChmdW5jdGlvbihwYXRoKSB7XG5cblx0ICAgICAgICAgICAgICAgIGlmIChwYXRoICE9ICcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbGV0IHBoYXNlX3BhdGggPSBwYXRoLnNwbGl0KCctJyk7XG5cdCAgICAgICAgICAgICAgICAgICAgbGV0IG9ubHlfdmFscz1waGFzZV9wYXRoLnNsaWNlKDEpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXT1vbmx5X3ZhbHMuam9pbignICcpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0uZWFjaFdvcmRDYXBpdGFsaXplKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIH0pO1xuXHQgICAgICAgICAgICBcblx0ICAgICAgICAgICAgaWYgKFVybFZhbCAhPSAnJyAmJiBVcmxWYWwgIT0gbnVsbCkge1xuXHQgICAgICAgICAgICAgICAgY29uc29sZS5sb2coVXJsVmFsKTtcblxuXHQgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBVcmxWYWwgPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgICAgICBVcmxWYWwgPSBVcmxWYWwuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuXHQgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IFVybFZhbDsgXG5cdCAgICAgICAgICAgICAgICB9KTtcblxuXHQgICAgICAgICAgICB9XG5cblxuXHQgICAgICAgICAgICBsZXQgaGFzUHJldHR5ID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdO1xuXG5cdCAgICAgICAgICAgIGNvbnNvbGUubG9nKCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF0pO1xuXG5cdCAgICAgICAgICAgIGlmIChoYXNQcmV0dHkgIT0gJycgJiYgaGFzUHJldHR5ICE9IG51bGwpIHtcblx0ICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuXHQgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IGhhc1ByZXR0eTsgXG5cdCAgICAgICAgICAgICAgICB9KTtcblxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSlcblx0fVxufSk7IiwiZnVuY3Rpb24geXNwX21ha2VTZWFyY2hUYWdzKCBkYXRhICkge1xuXG5cdGxldCB0YWdzRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC1zZWFyY2gtdGFncycpO1xuICAgICAgICBcbiAgICBpZiAodGFnc0VsZSkge1xuICAgICAgICB0YWdzRWxlLmZvckVhY2goZnVuY3Rpb24odGUpIHtcbiAgICAgICAgICAgIHRlLmlubmVySFRNTD1cIlwiO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHZhciB5c3BfdGFnc19ub3RfcHJpbnQgPSBbJ3BhZ2VfaW5kZXgnLCAnJ107XG5cbiAgICAgICAgZm9yIChsZXQgcGFyYW1LZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgbGV0IGxhYmVsPScnO1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGFiZWxbZm9yPScrIHBhcmFtS2V5ICsnXScpKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsYWJlbD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsYWJlbFtmb3I9JysgcGFyYW1LZXkgKyddJykuaW5uZXJUZXh0O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqW25hbWU9JysgcGFyYW1LZXkgKyddJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKltuYW1lPScrIHBhcmFtS2V5ICsnXScpLmhhc0F0dHJpYnV0ZSgnbGFiZWwnKSkge1xuXG4gICAgICAgICAgICAgICAgbGFiZWw9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKltuYW1lPScrIHBhcmFtS2V5ICsnXScpLmdldEF0dHJpYnV0ZSgnbGFiZWwnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHRhZ3NFbGUuZm9yRWFjaChmdW5jdGlvbih0ZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHlzcF90YWdzX25vdF9wcmludC5pbmRleE9mKCBwYXJhbUtleSApID09IC0xKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybSAqW25hbWU9JysgcGFyYW1LZXkgKyddJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZUlucHV0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdUYWdFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhZ1ZhbCA9IGRhdGFbcGFyYW1LZXldO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZUlucHV0LnRhZ05hbWUgPT0gJ1NFTEVDVCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnVmFsID0gZWxlSW5wdXQub3B0aW9uc1sgZWxlSW5wdXQuc2VsZWN0ZWRJbmRleCBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1LZXkubWF0Y2goJ3ByaWNlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnVmFsID0gJyQnK3RhZ1ZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1LZXkubWF0Y2goJ2xlbmd0aCcpICYmIHBhcmFtS2V5ICE9ICdsZW5ndGh1bml0JykgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWxlVW5pdCA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIFtuYW1lPWxlbmd0aHVuaXRdOmNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIGVsZVVuaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVVbml0ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gW25hbWU9bGVuZ3RodW5pdF0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWwgPSB0YWdWYWwgKycgJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlVW5pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnVmFsICs9IGVsZVVuaXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYWdFbGUuY2xhc3NOYW1lID0gJ2J0biBidG4tcHJpbWFyeSBidG4tc20geXNwLXRhZyc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGxhYmVsICE9IG51bGwgJiYgbGFiZWwgIT0gJ251bGwnICYmIGxhYmVsICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhZ0VsZS5pbm5lckhUTUwgPSB5c3BfdGVtcGxhdGVzLnlhY2h0X3RhZyhsYWJlbCwgdGFnVmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhZ0VsZS5pbm5lckhUTUwgPSB5c3BfdGVtcGxhdGVzLnlhY2h0X3RhZygnJywgdGFnVmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYWdFbGUuc2V0QXR0cmlidXRlKCdrZXknLCBwYXJhbUtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUuYXBwZW5kQ2hpbGQoIG5ld1RhZ0VsZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AtdGFnW2tleT1cIicrIHBhcmFtS2V5ICsnXCJdJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCgnLnlzcC10YWdba2V5PVwiJysgcGFyYW1LZXkgKydcIl0nKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzcGFuLnlzcC10YWdba2V5PVwiJysgcGFyYW1LZXkgKydcIl0nKS5mb3JFYWNoKGZ1bmN0aW9uKHlzcFRhZ0VsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlzcFRhZ0VsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdrZXknKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coa2V5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0RWxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gc2VsZWN0W25hbWU9Jysga2V5ICsnXSwgLnlzcC15YWNodC1zZWFyY2gtZm9ybSBpbnB1dFtuYW1lPScrIGtleSArJ10nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5wdXRFbGVzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRFbGVzLmZvckVhY2goZnVuY3Rpb24oZWxlSSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZWxlSS50eXBlICE9ICd1bmRlZmluZWQnICYmIChlbGVJLnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBlbGVJLnR5cGUgPT0gJ3JhZGlvJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlSS5jaGVja2VkPWZhbHNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVJLnZhbHVlPScnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RWxlc1swXS5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJmdW5jdGlvbiB5c3BfbWFya0xvdmVkVmVzc2VsKCBlbGVfY2FyZCApIHtcblxuICAgIGpRdWVyeSgnLmxvdmUnLCBlbGVfY2FyZCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgICAgIGpRdWVyeSh0aGlzKS50b2dnbGVDbGFzcygnbG92ZWQnKTtcblxuICAgICAgICBsZXQgeWFjaHRJZCA9IGpRdWVyeSh0aGlzKS5kYXRhKCd5YWNodC1pZCcpO1xuICAgIFxuICAgICAgICBpZiAoIGpRdWVyeSh0aGlzKS5oYXNDbGFzcygnbG92ZWQnKSApIHtcbiAgICAgICAgICAgIHlzcF9hZGRMb3ZlZFZlc3NlbCh5YWNodElkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHlzcF9yZW1vdmVMb3ZlZFZlc3NlbCh5YWNodElkKTtcblxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHJhaXlzX2dldF9mb3JtX2RhdGEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMueXNfeWFjaHRzX2xvdmVkICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgZWxlX2NhcmQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpICE9IFwiXCIpIHtcblxuICAgICAgICBsZXQgbG92ZWRWZXNzZWxzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSk7XG5cbiAgICAgICAgaWYgKGxvdmVkVmVzc2VscyA9PSBudWxsKSB7XG4gICAgICAgICAgICBsb3ZlZFZlc3NlbHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB5YWNodElkID0gZWxlX2NhcmQuZGF0YSgneWFjaHQtaWQnKTtcblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzLmluZGV4T2YoIHlhY2h0SWQgKSAhPSAtMSkge1xuXG4gICAgICAgICAgICBlbGVfY2FyZC5hZGRDbGFzcygnbG92ZWQnKTtcblxuICAgICAgICAgICAgalF1ZXJ5KCcubG92ZScsIGVsZV9jYXJkKS5hZGRDbGFzcygnbG92ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5mdW5jdGlvbiB5c3BfYWRkTG92ZWRWZXNzZWwoIHlhY2h0SWQgKSB7XG5cbiAgICBsZXQgbG92ZWRWZXNzZWxzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSk7XG5cblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzID09IG51bGwpIHtcbiAgICAgICAgICAgIGxvdmVkVmVzc2VscyA9IFtdO1xuICAgICAgICB9XG5cbiAgICBpZiAobG92ZWRWZXNzZWxzLmluZGV4T2YoIHlhY2h0SWQgKSA9PSAtMSkge1xuXG4gICAgICAgIGxvdmVkVmVzc2Vscy5wdXNoKHlhY2h0SWQpO1xuXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBhbHJlYWR5IGFkZGVkXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2cobG92ZWRWZXNzZWxzICk7XG4gICAgXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ5c3BfbG92ZWRfdmVzc2Vsc1wiLCBKU09OLnN0cmluZ2lmeShsb3ZlZFZlc3NlbHMpKTtcblxufSBcblxuZnVuY3Rpb24geXNwX3JlbW92ZUxvdmVkVmVzc2VsKCB5YWNodElkICkge1xuXG4gICAgbGV0IGxvdmVkVmVzc2VscyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykpO1xuXG5cbiAgICAgICAgaWYgKGxvdmVkVmVzc2VscyA9PSBudWxsKSB7XG4gICAgICAgICAgICBsb3ZlZFZlc3NlbHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgbGV0IGluZGV4ZWQgPSBsb3ZlZFZlc3NlbHMuaW5kZXhPZiggeWFjaHRJZCApO1xuXG4gICAgY29uc29sZS5sb2coaW5kZXhlZCk7XG5cbiAgICBpZiAoaW5kZXhlZCAhPSAtMSkge1xuXG4gICAgICAgIGRlbGV0ZSBsb3ZlZFZlc3NlbHNbaW5kZXhlZF07ICAgICAgICBcbiAgICAgICAgbG92ZWRWZXNzZWxzLnNwbGljZShpbmRleGVkLCAxKTtcblxuXG5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGFscmVhZHkgYWRkZWRcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhsb3ZlZFZlc3NlbHMgKTtcbiAgICBcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInlzcF9sb3ZlZF92ZXNzZWxzXCIsIEpTT04uc3RyaW5naWZ5KGxvdmVkVmVzc2VscykpO1xuXG59IiwidmFyIFlTUF9WZXNzZWxDb21wYXJlTGlzdD1bXTtcblxuXG5mdW5jdGlvbiB5c3BfcmVzdG9yZUNvbXBhcmVzKCkge1xuICAgIGxldCBVUkxSRUY9bmV3IFVSTChsb2NhdGlvbi5ocmVmKTsgLy8gbWF5YmUgZm9yIGEgcmUtZG9cbiAgICBsZXQgY29tcGFyZV9wb3N0X2lkcyA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCAncmVzdG9yZV90b19jb21wYXJlJyApOyBcblxuICAgIGNvbnNvbGUubG9nKHR5cGVvZiBjb21wYXJlX3Bvc3RfaWRzKTtcbiAgICBjb25zb2xlLmxvZyhjb21wYXJlX3Bvc3RfaWRzKTtcblxuICAgIGlmICh0eXBlb2YgY29tcGFyZV9wb3N0X2lkcyA9PSAnc3RyaW5nJykge1xuICAgICAgICBZU1BfVmVzc2VsQ29tcGFyZUxpc3QgPSBjb21wYXJlX3Bvc3RfaWRzLnNwbGl0KCcsJyk7XG4gICAgXG5cbiAgICAgICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xuICAgIH1cblxuXG5cbn1cblxuXG5mdW5jdGlvbiB5c3BfbWFrZUNvbXBhcmVWZXNzZWwoZWxlX2NhcmQpIHtcblx0IFxuXHQgalF1ZXJ5KCcuY29tcGFyZV90b2dnbGUnLCBlbGVfY2FyZCkuY2hhbmdlKGZ1bmN0aW9uKGUpIHtcblx0IFx0Y29uc29sZS5sb2coJ2hvd2R5Jyk7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgICAgICBqUXVlcnkodGhpcykudG9nZ2xlQ2xhc3MoJ2FybWVkJyk7XG5cbiAgICAgICAgbGV0IHlhY2h0SWQgPSBlbGVfY2FyZC5kYXRhKCdwb3N0LWlkJyk7XG4gICAgXG4gICAgICAgIGlmICggalF1ZXJ5KHRoaXMpLmhhc0NsYXNzKCdhcm1lZCcpICkge1xuICAgICAgICAgICAgeXNwX2FkZFZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB5c3BfcmVtb3ZlVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBsZXQgeWFjaHRJZCA9IGVsZV9jYXJkLmRhdGEoJ3Bvc3QtaWQnKTtcblxuICAgIGlmIChZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZCApICE9IC0xICB8fCBZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZC50b1N0cmluZygpICkgIT0gLTEgKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2hlbGxvIHdvcmxkIHJlc3RvcmVkJyk7XG5cbiAgICAgICAgZWxlX2NhcmQuYWRkQ2xhc3MoJ2FybWVkJyk7XG5cbiAgICAgICAgalF1ZXJ5KCcuY29tcGFyZV90b2dnbGUnLCBlbGVfY2FyZCkuYWRkQ2xhc3MoJ2FybWVkJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHlzcF9hZGRWZXNzZWxUb0NvbXBhcmVMaXN0KHlhY2h0SWQpIHtcblxuICAgIGlmIChZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZCApID09IC0xKSB7XG5cbiAgICBcdFlTUF9WZXNzZWxDb21wYXJlTGlzdC5wdXNoKHlhY2h0SWQpO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xufVxuICAgIFxuZnVuY3Rpb24geXNwX3JlbW92ZVZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCkge1xuXHRsZXQgaW5kZXhlZCA9IFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkIClcblxuXHRpZiAoIGluZGV4ZWQgIT0gLTEpIHtcblxuICAgIFx0ZGVsZXRlIFlTUF9WZXNzZWxDb21wYXJlTGlzdFtpbmRleGVkXTsgICAgICAgIFxuICAgICAgICBZU1BfVmVzc2VsQ29tcGFyZUxpc3Quc3BsaWNlKGluZGV4ZWQsIDEpO1xuICBcdFx0XG4gICAgfVxuXG4gICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xufVxuXG5mdW5jdGlvbiB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCkge1xuXG4gICAgaWYgKFlTUF9WZXNzZWxDb21wYXJlTGlzdC5sZW5ndGggPj0gMikge1xuICAgIFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lzcF9jb21wYXJlX2xpbmtvdXQnKS5ocmVmPXJhaV95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wicmFpeXMvY29tcGFyZS8/cG9zdElEPVwiK1lTUF9WZXNzZWxDb21wYXJlTGlzdC5qb2luKCcsJyk7XG5cbiAgICBcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0JykuaW5uZXJIVE1MPWA8YnV0dG9uIHR5cGU9XCJidXR0b25cIj5Db21wYXJlICggJHtZU1BfVmVzc2VsQ29tcGFyZUxpc3QubGVuZ3RofSApPC9idXR0b24+YDtcbiAgICAgICAgXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAncG9zdF9faW4nOiBZU1BfVmVzc2VsQ29tcGFyZUxpc3QsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHJhaV95c3BfYXBpLmNhbGxfYXBpKFwiUE9TVFwiLCBcInlhY2h0c1wiLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24oZGF0YV9yZXN1bHQpIHtcblxuICAgICAgICAgICAgZGF0YV9yZXN1bHQucmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBqUXVlcnkoJyN5c3AtY29tcGFyZS1wcmV2aWV3cycpLmFwcGVuZCggeXNwX3RlbXBsYXRlcy55YWNodC5jb21wYXJlX3ByZXZpZXcoaXRlbSwgcGFyYW1zKSApO1xuXG4gICAgICAgICAgICAgICAgbGV0IGVsZV9wcmV2aWV3ID0galF1ZXJ5KCcjeXNwLWNvbXBhcmUtcHJldmlld3MgW2RhdGEtcG9zdC1pZD0nKyBpdGVtLl9wb3N0SUQgKyddJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcucmVtb3ZlLWZyb20tY29tcGFyZScsIGVsZV9wcmV2aWV3KS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hlbGxvJyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlX2NhcmQgPSBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdyBbZGF0YS1wb3N0LWlkPScrIGl0ZW0uX3Bvc3RJRCArJ10nKTtcblxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJy5jb21wYXJlX3RvZ2dsZScsIGVsZV9jYXJkKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnJlbW92ZUNsYXNzKCdhcm1lZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0KGl0ZW0uX3Bvc3RJRCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKTtcblxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgalF1ZXJ5KCcjeXNwLWNvbXBhcmUtcHJldmlld3MnKS5odG1sKCcnKTtcbiAgICAgICAgalF1ZXJ5KCcjeXNwX2NvbXBhcmVfbGlua291dCcpLmh0bWwoJycpO1xuICAgIH1cblxuXG5cblxufVxuIiwiY29uc3QgeXNwQmVmb3JlWWFjaHRTZWFyY2ggPSBuZXcgRXZlbnQoXCJ5c3AtYmVmb3JlLXN1Ym1pdHRpbmcteWFjaHQtc2VhcmNoXCIpO1xuY29uc3QgeXNwQWZ0ZXJZYWNodFNlYXJjaCA9IG5ldyBFdmVudChcInlzcC1hZnRlci1zdWJtaXR0aW5nLXlhY2h0LXNlYXJjaFwiKTtcbmNvbnN0IHlzcEFmdGVyUmVuZGVyaW5nWWFjaHQgPSBuZXcgRXZlbnQoXCJ5c3AtYWZ0ZXItcmVuZGVyaW5nLXlhY2h0LXNlYXJjaFwiKTtcblxuZnVuY3Rpb24geXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKGRhdGEpIHtcblxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5odG1sKCcnKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtcmVzdWx0LXNlY3Rpb24nKS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkZWQnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXJlc3VsdC1zZWN0aW9uJykuY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpO1xuXG4gICAgcmFpeXNfc2V0X2Zvcm1fdG9fZGF0YSggZGF0YSApO1xuXG4gICAgeXNwX21ha2VTZWFyY2hUYWdzKCBkYXRhICk7XG5cbiAgICAvLyBHRVQgQU5EIFdSSVRFXG4gICAgcmV0dXJuIHJhaV95c3BfYXBpLmNhbGxfYXBpKFwiUE9TVFwiLCBcInlhY2h0c1wiLCBkYXRhKS50aGVuKGZ1bmN0aW9uKGRhdGFfcmVzdWx0KSB7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1yZXN1bHQtc2VjdGlvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1yZXN1bHQtc2VjdGlvbicpLmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xuXG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gZGF0YV9yZXN1bHQuU0VPLnRpdGxlO1xuICAgICAgICBqUXVlcnkoJyN5c3Atc2VhcmNoLWhlYWRpbmcnKS50ZXh0KGRhdGFfcmVzdWx0LlNFTy5oZWFkaW5nKTtcbiAgICAgICAgalF1ZXJ5KCcjeXNwLXNlYXJjaC1wYXJhZ3JhcGgnKS50ZXh0KGRhdGFfcmVzdWx0LlNFTy5ncHRfcCk7XG5cbiAgICAgICAgalF1ZXJ5KCcjdG90YWwtcmVzdWx0cycpLnRleHQobmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1JTicsIHsgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzOiAzIH0pLmZvcm1hdChkYXRhX3Jlc3VsdC50b3RhbCkpO1xuXG4gICAgICAgIGxldCBjdXJyZW50VVJMPW51bGw7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLmRvbnRfcHVzaCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY3VycmVudFVSTD1yYWl5c19wdXNoX2hpc3RvcnkoIGRhdGEgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRVUkwgPSBsb2NhdGlvbi5ocmVmO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBqUXVlcnkoJyN5YWNodHMtcGFnaW5hdGlvbicpLmh0bWwoJycpO1xuXG4gICAgICAgIGlmIChkYXRhX3Jlc3VsdC50b3RhbCA+IDApIHtcblxuICAgICAgICAgICAgZGF0YV9yZXN1bHQucmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEudmlldyAhPSAndW5kZWZpbmVkJyAmJiBkYXRhLnZpZXcudG9Mb3dlckNhc2UoKSA9PSAnbGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQubGlzdChpdGVtLCBkYXRhKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQuZ3JpZChpdGVtLCBkYXRhKSApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBlbGVfY2FyZCA9IGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93IFtkYXRhLXBvc3QtaWQ9JysgaXRlbS5fcG9zdElEICsnXScpO1xuXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCdbZGF0YS1tb2RhbF0nLCBlbGVfY2FyZCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCB2ZXNzZWxJbmZvID0gaXRlbS5Nb2RlbFllYXIgKyAnICcgKyBpdGVtLk1ha2VTdHJpbmcgKyAnICcgKyBpdGVtLkJvYXROYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lhdGNoSGlkZGVuJykudmFsKHZlc3NlbEluZm8pO1xuXG4gICAgICAgICAgICAgICAgICB2YXIgZGF0YV9tb2RhbCA9IGpRdWVyeSh0aGlzKS5kYXRhKCdtb2RhbCcpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIGpRdWVyeSggZGF0YV9tb2RhbCApLnlzcF9tb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlVGV4dDogJ1gnLFxuICAgICAgICAgICAgICAgICAgICBtb2RhbENsYXNzOiAneXNwLW1vZGFsLW9wZW4nLFxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsYXNzOiAneXNwLW1vZGVsLWNsb3NlJ1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB5c3BfbWFya0xvdmVkVmVzc2VsKCBlbGVfY2FyZCApOyAgICAgXG4gICAgICAgICAgICAgICAgeXNwX21ha2VDb21wYXJlVmVzc2VsKCBlbGVfY2FyZCApOyAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgalF1ZXJ5KCcjeWFjaHRzLXBhZ2luYXRpb24nKS5wYWdpbmF0aW9uKHtcbiAgICAgICAgICAgICAgICBpdGVtczogZGF0YV9yZXN1bHQudG90YWwsXG4gICAgICAgICAgICAgICAgaXRlbXNPblBhZ2U6IDEyLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBkYXRhLnBhZ2VfaW5kZXgsXG4gICAgICAgICAgICAgICAgcHJldlRleHQ6IHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5wcmV2X3RleHQsXG4gICAgICAgICAgICAgICAgbmV4dFRleHQ6IHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5uZXh0X3RleHQsXG4gICAgICAgICAgICAgICAgZWRnZXM6IDQsXG4gICAgICAgICAgICAgICAgZGlzcGxheWVkUGFnZXM6IDQsXG4gICAgICAgICAgICAgICAgaHJlZlRleHRQcmVmaXg6IGN1cnJlbnRVUkwucmVwbGFjZShuZXcgUmVnRXhwKFwicGFnZV9pbmRleC0oXFxcXGQqKSgvKVwiLCBcImdcIiksIFwiXCIpKydwYWdlX2luZGV4LScsXG4gICAgICAgICAgICAgICAgaHJlZlRleHRTdWZmaXg6ICcvJyxcbiAgICAgICAgICAgICAgICBvblBhZ2VDbGljazogZnVuY3Rpb24ocGFnZU51bWJlciwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIGlucHV0W25hbWU9cGFnZV9pbmRleF0nKS52YWx1ZT1wYWdlTnVtYmVyO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3JtRGF0YU9iamVjdCA9IHJhaXlzX2dldF9mb3JtX2RhdGEoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0nKSApO1xuXG4gICAgICAgICAgICAgICAgICAgIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlcihmb3JtRGF0YU9iamVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5hcHBlbmQoeXNwX3RlbXBsYXRlcy5ub1Jlc3VsdHMoKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGpRdWVyeShbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSkuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IChqUXVlcnkoXCIuc2Nyb2xsLXRvLWhlcmUtb24teWFjaHQtc2VhcmNoXCIpLm9mZnNldCgpLnRvcClcbiAgICAgICAgfSwgMjUwKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtOm5vdCgjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybSknKS5kaXNwYXRjaEV2ZW50KHlzcEFmdGVyUmVuZGVyaW5nWWFjaHQpO1xuXG4gICAgICAgIHJldHVybiBkYXRhX3Jlc3VsdDtcblxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuXG4gICAgfSk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gRmlsbCBMaXN0IE9wdGlvbnNcbiAgICBsZXQgRmlsbExpc3RzPVtdO1xuICAgIGxldCBsaXN0RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGF0YWxpc3RbZGF0YS1maWxsLWxpc3RdXCIpO1xuICAgIGxldCBsaXN0TmVlZGVkRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbbGlzdF1cIik7XG5cbiAgICBsaXN0RWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgIEZpbGxMaXN0cy5wdXNoKGVsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1saXN0JykpO1xuICAgIH0pO1xuXG4gICAgbGlzdE5lZWRlZEVsZW1lbnRzLmZvckVhY2goKGlucHV0X2VsZSkgPT4ge1xuXG4gICAgICAgIGlucHV0X2VsZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgICAgIGxldCBsaXN0X2lkID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnbGlzdCcpO1xuXG4gICAgICAgICAgICBsZXQgZWxlX2xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZGF0YWxpc3QjXCIrbGlzdF9pZCk7XG5cbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQudmFsdWUubGVuZ3RoIDw9IDMpIHtcblxuICAgICAgICAgICAgICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpKFxuICAgICAgICAgICAgICAgICAgICAnUE9TVCcsIFxuICAgICAgICAgICAgICAgICAgICAnbGlzdC1vcHRpb25zLXdpdGgtdmFsdWUnLCBcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiBbIGVsZV9saXN0LmdldEF0dHJpYnV0ZSgnZGF0YS1maWxsLWxpc3QnKSBdLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICkudGhlbihmdW5jdGlvbihyT3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGxhYmVsIGluIHJPcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBTZWxlY3RvckVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkYXRhbGlzdFtkYXRhLWZpbGwtbGlzdD0nXCIrIGxhYmVsICtcIiddXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgck9wdGlvbnNbbGFiZWxdLmZvckVhY2goZnVuY3Rpb24oYikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJPUFRJT05cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5hcHBlbmQob3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSk7XG5cbiAgICB9KVxuICAgIFxuLyogICAgcmFpX3lzcF9hcGkuY2FsbF9hcGkoJ1BPU1QnLCAnbGlzdC1vcHRpb25zJywge2xhYmVsczogRmlsbExpc3RzfSkudGhlbihmdW5jdGlvbihyT3B0aW9ucykge1xuICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGF0YWxpc3RbZGF0YS1maWxsLWxpc3Q9J1wiKyBsYWJlbCArXCInXVwiKTtcblxuICAgICAgICAgICAgck9wdGlvbnNbbGFiZWxdLmZvckVhY2goZnVuY3Rpb24oYikge1xuXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJPUFRJT05cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBiO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiO1xuXG4gICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZS5hcHBlbmQob3B0aW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4qL1xuICAgIGxldCB5YWNodFNlYXJjaEFuZFJlc3VsdHM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybTpub3QoI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0pJyk7XG5cbiAgICBpZiAoeWFjaHRTZWFyY2hBbmRSZXN1bHRzKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuLW1vYmlsZS1zZWFyY2gnKS5mb3JFYWNoKChvbXNlKSA9PiB7XG4gICAgICAgICAgICBvbXNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1zdXBlci1tb2JpbGUtc2VhcmNoJykuc3R5bGUuZGlzcGxheT0nYmxvY2snO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5zdHlsZS5vdmVyZmxvd1k9J2hpZGRlbic7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5hZGQoJ3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLW9wZW4nKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZS1tb2JpbGUtc2VhcmNoJykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZS1tb2JpbGUtc2VhcmNoJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXN1cGVyLW1vYmlsZS1zZWFyY2gnKS5zdHlsZS5kaXNwbGF5PSdub25lJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3dZPSd1bnNldCc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5yZW1vdmUoJ3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLW9wZW4nKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIHlhY2h0U2VhcmNoQW5kUmVzdWx0cy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGUudGFyZ2V0LmRpc3BhdGNoRXZlbnQoeXNwQmVmb3JlWWFjaHRTZWFyY2gpO1xuXG4gICAgICAgICAgICBlLnRhcmdldC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPXBhZ2VfaW5kZXhdJykudmFsdWU9MTtcblxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHJhaXlzX2dldF9mb3JtX2RhdGEoZS50YXJnZXQpO1xuXG4gICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoIHBhcmFtcyApLnRoZW4oZnVuY3Rpb24oYXBpX2RhdGEpIHtcblxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmRpc3BhdGNoRXZlbnQoeXNwQWZ0ZXJZYWNodFNlYXJjaCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pOyBcblxuICAgICAgICB5YWNodFNlYXJjaEFuZFJlc3VsdHMucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQuc3VibWl0LW9uLWNoYW5nZScpLmZvckVhY2goKGVsZUlucHV0KSA9PiB7XG4gICAgICAgICAgICBlbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgeWFjaHRTZWFyY2hBbmRSZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9cmVzZXRdJykuZm9yRWFjaCgoZWxlUmVzZXQpID0+IHtcbiAgICAgICAgICAgIGVsZVJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwieXNfY29tcGFueV9vbmx5XCJdJykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJ5c19jb21wYW55X29ubHlcIl0nKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZUNoZWNrKSB7XG4gICAgICAgICAgICAgICAgZWxlQ2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPXZpZXddW2Zvcm09eXNwLXlhY2h0LXNlYXJjaC1mb3JtXSwgc2VsZWN0W25hbWU9c29ydGJ5XVtmb3JtPXlzcC15YWNodC1zZWFyY2gtZm9ybV0nKS5mb3JFYWNoKChlbGVWaWV3T3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBlbGVWaWV3T3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGljay1hbGwnKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZSkge1xuICAgICAgICAgICAgZWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGlucHV0X25hbWUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCInKyBpbnB1dF9uYW1lICsnXCJdJykuZm9yRWFjaCgoZWxlSW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlSW5wdXQuY2hlY2tlZD1mYWxzZTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUFJFVFRZIFVSTFxuICAgICAgICBsZXQgc3RycGF0aHM9d2luZG93LmxvY2F0aW9uLmhyZWY7XG5cbiAgICAgICAgc3RycGF0aHM9c3RycGF0aHMucmVwbGFjZShyYWlfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfcGFnZV9pZCwgJycpO1xuXG4gICAgICAgIGxldCBwYXRocyA9IHN0cnBhdGhzLnNwbGl0KFwiL1wiKTtcblxuICAgICAgICBsZXQgcHJldHR5X3VybF9wYXRoX3BhcmFtcz17fTtcblxuICAgICAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uKHBhdGgpIHtcblxuICAgICAgICAgICAgaWYgKHBhdGggIT0gJycpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGhhc2VfcGF0aCA9IHBhdGguc3BsaXQoJy0nKTtcbiAgICAgICAgICAgICAgICBsZXQgb25seV92YWxzPXBoYXNlX3BhdGguc2xpY2UoMSk7XG5cbiAgICAgICAgICAgICAgICBvbmx5X3ZhbHM9b25seV92YWxzLmpvaW4oJyAnKS5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgb25seV92YWxzX2FycmF5PShvbmx5X3ZhbHMuc3BsaXQoJysnKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ubHlfdmFsc19hcnJheVsxXSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBvbmx5X3ZhbHMgPSBvbmx5X3ZhbHNfYXJyYXkubWFwKChvdikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG92LmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKG9ubHlfdmFscyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXT1vbmx5X3ZhbHM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhwcmV0dHlfdXJsX3BhdGhfcGFyYW1zKTtcblxuICAgICAgICAvLyBSZXN0b3JlIEZpZWxkc1xuXG4gICAgICAgIGxldCBVUkxSRUY9bmV3IFVSTChsb2NhdGlvbi5ocmVmKTsgLy8gbWF5YmUgZm9yIGEgcmUtZG9cblxuICAgICAgICBsZXQgZm9ybUlucHV0cz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC15YWNodC1zZWFyY2gtZm9ybVwiXSwgI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybVwiXScpO1xuXG4gICAgICAgIGZvcm1JbnB1dHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5wdXQgPSBlbGU7XG5cbiAgICAgICAgICAgIGxldCBuYW1lID0gZWxlLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG4gICAgICAgICAgICBsZXQgdXJsVmFsID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoIG5hbWUgKTtcbiAgICAgICAgICAgICAgICAvLyB1cmxWYWwgPSA7XG4gICBcblxuICAgICAgICAgICAgbGV0IGhhc1ByZXR0eSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXTtcblxuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhoYXNQcmV0dHkpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGhhc1ByZXR0eSAhPSAnbnVsbCcgJiYgdHlwZW9mIGhhc1ByZXR0eSAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaGFzUHJldHR5KSkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaGFzUHJldHR5LmZvckVhY2goKGhQKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGhQICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoYXNQcmV0dHkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZSAhPSAnY2hlY2tib3gnICYmIGlucHV0LnR5cGUgIT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBoYXNQcmV0dHk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodXJsVmFsICE9ICcnICYmIHVybFZhbCAhPSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHVybFZhbCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB1cmxWYWwgPSB1cmxWYWwuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmICAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IHVybFZhbCApIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dC50eXBlICE9ICdjaGVja2JveCcgJiYgaW5wdXQudHlwZSAhPSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdXJsVmFsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZXN0b3JlIENvbXBhcmVcbiAgICAgICAgIHlzcF9yZXN0b3JlQ29tcGFyZXMoKTtcblxuICAgICAgICAvLyBGaWxsIG9wdGlvbnNcbiAgICAgICAgbGV0IEZpbGxPcHRpb25zPVtdO1xuICAgICAgICBsZXQgc2VsZWN0b3JFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWxlY3RbZGF0YS1maWxsLW9wdGlvbnNdXCIpO1xuXG4gICAgICAgIHNlbGVjdG9yRWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICBGaWxsT3B0aW9ucy5wdXNoKGVsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1vcHRpb25zJykpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpKCdQT1NUJywgJ2Ryb3Bkb3duLW9wdGlvbnMnLCB7bGFiZWxzOiBGaWxsT3B0aW9uc30pLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGxhYmVsIGluIHJPcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zPSdcIisgbGFiZWwgK1wiJ11cIik7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhTZWxlY3RvckVsZSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IFNlbGVjdG9yRWxlWzBdLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG4gICAgICAgICAgICAgICAgck9wdGlvbnNbbGFiZWxdLmZvckVhY2goZnVuY3Rpb24oYikge1xuICAgICAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5hZGQob3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgVVJMUkVGID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgICAgICAgICBsZXQgVXJsVmFsID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoIG5hbWUgKTtcblxuICAgICAgICAgICAgICAgIGxldCBzdHJwYXRocz13aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICAgICAgICAgICAgICAgIHN0cnBhdGhzPXN0cnBhdGhzLnJlcGxhY2UocmFpX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3BhZ2VfaWQsICcnKTtcblxuICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IHN0cnBhdGhzLnNwbGl0KFwiL1wiKTtcblxuICAgICAgICAgICAgICAgIGxldCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zPXt9O1xuXG4gICAgICAgICAgICAgICAgcGF0aHMuZm9yRWFjaChmdW5jdGlvbihwYXRoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdGggIT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwaGFzZV9wYXRoID0gcGF0aC5zcGxpdCgnLScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9ubHlfdmFscz1waGFzZV9wYXRoLnNsaWNlKDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dPW9ubHlfdmFscy5qb2luKCcgJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0uZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChVcmxWYWwgIT0gJycgJiYgVXJsVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhVcmxWYWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgVXJsVmFsID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVcmxWYWwgPSBVcmxWYWwuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IFVybFZhbDsgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGUudmFsdWUgPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBVcmxWYWwudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgaGFzUHJldHR5ID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdO1xuXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyggcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdKTtcblxuICAgICAgICAgICAgICAgIGlmIChoYXNQcmV0dHkgIT0gJycgJiYgaGFzUHJldHR5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBoYXNQcmV0dHk7IFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlLnZhbHVlID09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gaGFzUHJldHR5LnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gUmVuZGVyIFlhY2h0cyBGb3IgUGFnZSBMb2FkXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJykpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XG5cbiAgICAgICAgICAgIC8vIExpa2VkIC8gTG92ZWQgXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtcy55c195YWNodHNfbG92ZWQgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIGxldCBsb3ZlZF95YWNodHMgPSBKU09OLnBhcnNlKCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSApO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxvdmVkX3lhY2h0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy55c19vbmx5X3RoZXNlID0gbG92ZWRfeWFjaHRzLmpvaW4oJywnKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnlzX29ubHlfdGhlc2U9XCIwLDAsMFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoIHBhcmFtcyApOyAgICAgICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG1vYmlsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybScpO1xuXG4gICAgICAgIGlmIChtb2JpbGVGb3JtKSB7XG4gICAgICAgICAgICBtb2JpbGVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBlLnRhcmdldC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPXBhZ2VfaW5kZXhdJykudmFsdWU9MTtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3Atc3VwZXItbW9iaWxlLXNlYXJjaCcpLnN0eWxlLmRpc3BsYXk9J25vbmUnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5zdHlsZS5vdmVyZmxvd1k9J3Vuc2V0JztcblxuICAgICAgICAgICAgICAgIGxldCBwYXJhbXMgPSByYWl5c19nZXRfZm9ybV9kYXRhKGUudGFyZ2V0KTsgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlciggcGFyYW1zICk7XG5cbiAgICAgICAgICAgIH0pOyBcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgfVxuXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gaGFuZGxlU3VibWl0KGUsIGFwaUVuZHBvaW50KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgZm9ybURhdGEgPSByYWl5c19nZXRfZm9ybV9kYXRhKGUudGFyZ2V0KTtcbiAgICAgICAgbGV0IHN1Y2Nlc3NNZXNzYWdlID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc3VjY2Vzcy1tZXNzYWdlJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGZvcm1EYXRhKVxuICAgICAgICByYWlfeXNwX2FwaS5jYWxsX2FwaShcIlBPU1RcIiwgYXBpRW5kcG9pbnQsIGZvcm1EYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YV9yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzTWVzc2FnZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxldCB5YWNodEZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpbmdsZS15YWNodC1kZXRpbHMtbGVhZCcpO1xuICAgIHlhY2h0Rm9ybXMuZm9yRWFjaCgoZkVsZSkgPT4ge1xuICAgICAgICBmRWxlLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGhhbmRsZVN1Ym1pdChlLCBcInlhY2h0LWxlYWRzXCIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGxldCBicm9rZXJGb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaW5nbGUtYnJva2VyLWRldGlscy1sZWFkJyk7XG4gICAgYnJva2VyRm9ybXMuZm9yRWFjaCgoZkVsZSkgPT4ge1xuICAgICAgICBmRWxlLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGhhbmRsZVN1Ym1pdChlLCBcImJyb2tlci1sZWFkc1wiKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdfQ==
