"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
/*!
 * lightgallery | 2.4.0-beta.0 | December 12th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lightGallery = factory());
})(void 0, function () {
  'use strict';

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
    Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  var _assign = function __assign() {
    _assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return _assign.apply(this, arguments);
  };
  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
    return r;
  }

  /**
   * List of lightGallery events
   * All events should be documented here
   * Below interfaces are used to build the website documentations
   * */
  var lGEvents = {
    afterAppendSlide: 'lgAfterAppendSlide',
    init: 'lgInit',
    hasVideo: 'lgHasVideo',
    containerResize: 'lgContainerResize',
    updateSlides: 'lgUpdateSlides',
    afterAppendSubHtml: 'lgAfterAppendSubHtml',
    beforeOpen: 'lgBeforeOpen',
    afterOpen: 'lgAfterOpen',
    slideItemLoad: 'lgSlideItemLoad',
    beforeSlide: 'lgBeforeSlide',
    afterSlide: 'lgAfterSlide',
    posterClick: 'lgPosterClick',
    dragStart: 'lgDragStart',
    dragMove: 'lgDragMove',
    dragEnd: 'lgDragEnd',
    beforeNextSlide: 'lgBeforeNextSlide',
    beforePrevSlide: 'lgBeforePrevSlide',
    beforeClose: 'lgBeforeClose',
    afterClose: 'lgAfterClose',
    rotateLeft: 'lgRotateLeft',
    rotateRight: 'lgRotateRight',
    flipHorizontal: 'lgFlipHorizontal',
    flipVertical: 'lgFlipVertical',
    autoplay: 'lgAutoplay',
    autoplayStart: 'lgAutoplayStart',
    autoplayStop: 'lgAutoplayStop'
  };
  var lightGalleryCoreSettings = {
    mode: 'lg-slide',
    easing: 'ease',
    speed: 400,
    licenseKey: '0000-0000-000-0000',
    height: '100%',
    width: '100%',
    addClass: '',
    startClass: 'lg-start-zoom',
    backdropDuration: 300,
    container: '',
    startAnimationDuration: 400,
    zoomFromOrigin: true,
    hideBarsDelay: 0,
    showBarsAfter: 10000,
    slideDelay: 0,
    supportLegacyBrowser: true,
    allowMediaOverlap: false,
    videoMaxSize: '1280-720',
    loadYouTubePoster: true,
    defaultCaptionHeight: 0,
    ariaLabelledby: '',
    ariaDescribedby: '',
    closable: true,
    swipeToClose: true,
    closeOnTap: true,
    showCloseIcon: true,
    showMaximizeIcon: false,
    loop: true,
    escKey: true,
    keyPress: true,
    controls: true,
    slideEndAnimation: true,
    hideControlOnEnd: false,
    mousewheel: false,
    getCaptionFromTitleOrAlt: true,
    appendSubHtmlTo: '.lg-sub-html',
    subHtmlSelectorRelative: false,
    preload: 2,
    numberOfSlideItemsInDom: 10,
    selector: '',
    selectWithin: '',
    nextHtml: '',
    prevHtml: '',
    index: 0,
    iframeWidth: '100%',
    iframeHeight: '100%',
    iframeMaxWidth: '100%',
    iframeMaxHeight: '100%',
    download: true,
    counter: true,
    appendCounterTo: '.lg-toolbar',
    swipeThreshold: 50,
    enableSwipe: true,
    enableDrag: true,
    dynamic: false,
    dynamicEl: [],
    extraProps: [],
    exThumbImage: '',
    isMobile: undefined,
    mobileSettings: {
      controls: false,
      showCloseIcon: false,
      download: false
    },
    plugins: [],
    strings: {
      closeGallery: 'Close gallery',
      toggleMaximize: 'Toggle maximize',
      previousSlide: 'Previous slide',
      nextSlide: 'Next slide',
      download: 'Download',
      playVideo: 'Play video'
    }
  };
  function initLgPolyfills() {
    (function () {
      if (typeof window.CustomEvent === 'function') return false;
      function CustomEvent(event, params) {
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: null
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      window.CustomEvent = CustomEvent;
    })();
    (function () {
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
    })();
  }
  var lgQuery = /** @class */function () {
    function lgQuery(selector) {
      this.cssVenderPrefixes = ['TransitionDuration', 'TransitionTimingFunction', 'Transform', 'Transition'];
      this.selector = this._getSelector(selector);
      this.firstElement = this._getFirstEl();
      return this;
    }
    lgQuery.generateUUID = function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    };
    lgQuery.prototype._getSelector = function (selector, context) {
      if (context === void 0) {
        context = document;
      }
      if (typeof selector !== 'string') {
        return selector;
      }
      context = context || document;
      var fl = selector.substring(0, 1);
      if (fl === '#') {
        return context.querySelector(selector);
      } else {
        return context.querySelectorAll(selector);
      }
    };
    lgQuery.prototype._each = function (func) {
      if (!this.selector) {
        return this;
      }
      if (this.selector.length !== undefined) {
        [].forEach.call(this.selector, func);
      } else {
        func(this.selector, 0);
      }
      return this;
    };
    lgQuery.prototype._setCssVendorPrefix = function (el, cssProperty, value) {
      // prettier-ignore
      var property = cssProperty.replace(/-([a-z])/gi, function (s, group1) {
        return group1.toUpperCase();
      });
      if (this.cssVenderPrefixes.indexOf(property) !== -1) {
        el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
        el.style['webkit' + property] = value;
        el.style['moz' + property] = value;
        el.style['ms' + property] = value;
        el.style['o' + property] = value;
      } else {
        el.style[property] = value;
      }
    };
    lgQuery.prototype._getFirstEl = function () {
      if (this.selector && this.selector.length !== undefined) {
        return this.selector[0];
      } else {
        return this.selector;
      }
    };
    lgQuery.prototype.isEventMatched = function (event, eventName) {
      var eventNamespace = eventName.split('.');
      return event.split('.').filter(function (e) {
        return e;
      }).every(function (e) {
        return eventNamespace.indexOf(e) !== -1;
      });
    };
    lgQuery.prototype.attr = function (attr, value) {
      if (value === undefined) {
        if (!this.firstElement) {
          return '';
        }
        return this.firstElement.getAttribute(attr);
      }
      this._each(function (el) {
        el.setAttribute(attr, value);
      });
      return this;
    };
    lgQuery.prototype.find = function (selector) {
      return $LG(this._getSelector(selector, this.selector));
    };
    lgQuery.prototype.first = function () {
      if (this.selector && this.selector.length !== undefined) {
        return $LG(this.selector[0]);
      } else {
        return $LG(this.selector);
      }
    };
    lgQuery.prototype.eq = function (index) {
      return $LG(this.selector[index]);
    };
    lgQuery.prototype.parent = function () {
      return $LG(this.selector.parentElement);
    };
    lgQuery.prototype.get = function () {
      return this._getFirstEl();
    };
    lgQuery.prototype.removeAttr = function (attributes) {
      var attrs = attributes.split(' ');
      this._each(function (el) {
        attrs.forEach(function (attr) {
          return el.removeAttribute(attr);
        });
      });
      return this;
    };
    lgQuery.prototype.wrap = function (className) {
      if (!this.firstElement) {
        return this;
      }
      var wrapper = document.createElement('div');
      wrapper.className = className;
      this.firstElement.parentNode.insertBefore(wrapper, this.firstElement);
      this.firstElement.parentNode.removeChild(this.firstElement);
      wrapper.appendChild(this.firstElement);
      return this;
    };
    lgQuery.prototype.addClass = function (classNames) {
      if (classNames === void 0) {
        classNames = '';
      }
      this._each(function (el) {
        // IE doesn't support multiple arguments
        classNames.split(' ').forEach(function (className) {
          if (className) {
            el.classList.add(className);
          }
        });
      });
      return this;
    };
    lgQuery.prototype.removeClass = function (classNames) {
      this._each(function (el) {
        // IE doesn't support multiple arguments
        classNames.split(' ').forEach(function (className) {
          if (className) {
            el.classList.remove(className);
          }
        });
      });
      return this;
    };
    lgQuery.prototype.hasClass = function (className) {
      if (!this.firstElement) {
        return false;
      }
      return this.firstElement.classList.contains(className);
    };
    lgQuery.prototype.hasAttribute = function (attribute) {
      if (!this.firstElement) {
        return false;
      }
      return this.firstElement.hasAttribute(attribute);
    };
    lgQuery.prototype.toggleClass = function (className) {
      if (!this.firstElement) {
        return this;
      }
      if (this.hasClass(className)) {
        this.removeClass(className);
      } else {
        this.addClass(className);
      }
      return this;
    };
    lgQuery.prototype.css = function (property, value) {
      var _this = this;
      this._each(function (el) {
        _this._setCssVendorPrefix(el, property, value);
      });
      return this;
    };
    // Need to pass separate namespaces for separate elements
    lgQuery.prototype.on = function (events, listener) {
      var _this = this;
      if (!this.selector) {
        return this;
      }
      events.split(' ').forEach(function (event) {
        if (!Array.isArray(lgQuery.eventListeners[event])) {
          lgQuery.eventListeners[event] = [];
        }
        lgQuery.eventListeners[event].push(listener);
        _this.selector.addEventListener(event.split('.')[0], listener);
      });
      return this;
    };
    // @todo - test this
    lgQuery.prototype.once = function (event, listener) {
      var _this = this;
      this.on(event, function () {
        _this.off(event);
        listener(event);
      });
      return this;
    };
    lgQuery.prototype.off = function (event) {
      var _this = this;
      if (!this.selector) {
        return this;
      }
      Object.keys(lgQuery.eventListeners).forEach(function (eventName) {
        if (_this.isEventMatched(event, eventName)) {
          lgQuery.eventListeners[eventName].forEach(function (listener) {
            _this.selector.removeEventListener(eventName.split('.')[0], listener);
          });
          lgQuery.eventListeners[eventName] = [];
        }
      });
      return this;
    };
    lgQuery.prototype.trigger = function (event, detail) {
      if (!this.firstElement) {
        return this;
      }
      var customEvent = new CustomEvent(event.split('.')[0], {
        detail: detail || null
      });
      this.firstElement.dispatchEvent(customEvent);
      return this;
    };
    // Does not support IE
    lgQuery.prototype.load = function (url) {
      var _this = this;
      fetch(url).then(function (res) {
        _this.selector.innerHTML = res;
      });
      return this;
    };
    lgQuery.prototype.html = function (html) {
      if (html === undefined) {
        if (!this.firstElement) {
          return '';
        }
        return this.firstElement.innerHTML;
      }
      this._each(function (el) {
        el.innerHTML = html;
      });
      return this;
    };
    lgQuery.prototype.append = function (html) {
      this._each(function (el) {
        if (typeof html === 'string') {
          el.insertAdjacentHTML('beforeend', html);
        } else {
          el.appendChild(html);
        }
      });
      return this;
    };
    lgQuery.prototype.prepend = function (html) {
      this._each(function (el) {
        el.insertAdjacentHTML('afterbegin', html);
      });
      return this;
    };
    lgQuery.prototype.remove = function () {
      this._each(function (el) {
        el.parentNode.removeChild(el);
      });
      return this;
    };
    lgQuery.prototype.empty = function () {
      this._each(function (el) {
        el.innerHTML = '';
      });
      return this;
    };
    lgQuery.prototype.scrollTop = function (scrollTop) {
      if (scrollTop !== undefined) {
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
        return this;
      } else {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      }
    };
    lgQuery.prototype.scrollLeft = function (scrollLeft) {
      if (scrollLeft !== undefined) {
        document.body.scrollLeft = scrollLeft;
        document.documentElement.scrollLeft = scrollLeft;
        return this;
      } else {
        return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
      }
    };
    lgQuery.prototype.offset = function () {
      if (!this.firstElement) {
        return {
          left: 0,
          top: 0
        };
      }
      var rect = this.firstElement.getBoundingClientRect();
      var bodyMarginLeft = $LG('body').style().marginLeft;
      // Minus body margin - https://stackoverflow.com/questions/30711548/is-getboundingclientrect-left-returning-a-wrong-value
      return {
        left: rect.left - parseFloat(bodyMarginLeft) + this.scrollLeft(),
        top: rect.top + this.scrollTop()
      };
    };
    lgQuery.prototype.style = function () {
      if (!this.firstElement) {
        return {};
      }
      return this.firstElement.currentStyle || window.getComputedStyle(this.firstElement);
    };
    // Width without padding and border even if box-sizing is used.
    lgQuery.prototype.width = function () {
      var style = this.style();
      return this.firstElement.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    };
    // Height without padding and border even if box-sizing is used.
    lgQuery.prototype.height = function () {
      var style = this.style();
      return this.firstElement.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    };
    lgQuery.eventListeners = {};
    return lgQuery;
  }();
  function $LG(selector) {
    initLgPolyfills();
    return new lgQuery(selector);
  }
  var defaultDynamicOptions = ['src', 'sources', 'subHtml', 'subHtmlUrl', 'html', 'video', 'poster', 'slideName', 'responsive', 'srcset', 'sizes', 'iframe', 'downloadUrl', 'download', 'width', 'facebookShareUrl', 'tweetText', 'iframeTitle', 'twitterShareUrl', 'pinterestShareUrl', 'pinterestText', 'fbHtml', 'disqusIdentifier', 'disqusUrl'];
  // Convert html data-attribute to camalcase
  function convertToData(attr) {
    // FInd a way for lgsize
    if (attr === 'href') {
      return 'src';
    }
    attr = attr.replace('data-', '');
    attr = attr.charAt(0).toLowerCase() + attr.slice(1);
    attr = attr.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
    return attr;
  }
  var utils = {
    /**
     * get possible width and height from the lgSize attribute. Used for ZoomFromOrigin option
     */
    getSize: function getSize(el, container, spacing, defaultLgSize) {
      if (spacing === void 0) {
        spacing = 0;
      }
      var LGel = $LG(el);
      var lgSize = LGel.attr('data-lg-size') || defaultLgSize;
      if (!lgSize) {
        return;
      }
      var isResponsiveSizes = lgSize.split(',');
      // if at-least two viewport sizes are available
      if (isResponsiveSizes[1]) {
        var wWidth = window.innerWidth;
        for (var i = 0; i < isResponsiveSizes.length; i++) {
          var size_1 = isResponsiveSizes[i];
          var responsiveWidth = parseInt(size_1.split('-')[2], 10);
          if (responsiveWidth > wWidth) {
            lgSize = size_1;
            break;
          }
          // take last item as last option
          if (i === isResponsiveSizes.length - 1) {
            lgSize = size_1;
          }
        }
      }
      var size = lgSize.split('-');
      var width = parseInt(size[0], 10);
      var height = parseInt(size[1], 10);
      var cWidth = container.width();
      var cHeight = container.height() - spacing;
      var maxWidth = Math.min(cWidth, width);
      var maxHeight = Math.min(cHeight, height);
      var ratio = Math.min(maxWidth / width, maxHeight / height);
      return {
        width: width * ratio,
        height: height * ratio
      };
    },
    /**
     * @desc Get transform value based on the imageSize. Used for ZoomFromOrigin option
     * @param {jQuery Element}
     * @returns {String} Transform CSS string
     */
    getTransform: function getTransform(el, container, top, bottom, imageSize) {
      if (!imageSize) {
        return;
      }
      var LGel = $LG(el).find('img').first();
      if (!LGel.get()) {
        return;
      }
      var containerRect = container.get().getBoundingClientRect();
      var wWidth = containerRect.width;
      // using innerWidth to include mobile safari bottom bar
      var wHeight = container.height() - (top + bottom);
      var elWidth = LGel.width();
      var elHeight = LGel.height();
      var elStyle = LGel.style();
      var x = (wWidth - elWidth) / 2 - LGel.offset().left + (parseFloat(elStyle.paddingLeft) || 0) + (parseFloat(elStyle.borderLeft) || 0) + $LG(window).scrollLeft() + containerRect.left;
      var y = (wHeight - elHeight) / 2 - LGel.offset().top + (parseFloat(elStyle.paddingTop) || 0) + (parseFloat(elStyle.borderTop) || 0) + $LG(window).scrollTop() + top;
      var scX = elWidth / imageSize.width;
      var scY = elHeight / imageSize.height;
      var transform = 'translate3d(' + (x *= -1) + 'px, ' + (y *= -1) + 'px, 0) scale3d(' + scX + ', ' + scY + ', 1)';
      return transform;
    },
    getIframeMarkup: function getIframeMarkup(iframeWidth, iframeHeight, iframeMaxWidth, iframeMaxHeight, src, iframeTitle) {
      var title = iframeTitle ? 'title="' + iframeTitle + '"' : '';
      return "<div class=\"lg-video-cont lg-has-iframe\" style=\"width:" + iframeWidth + "; max-width:" + iframeMaxWidth + "; height: " + iframeHeight + "; max-height:" + iframeMaxHeight + "\">\n                    <iframe class=\"lg-object\" frameborder=\"0\" " + title + " src=\"" + src + "\"  allowfullscreen=\"true\"></iframe>\n                </div>";
    },
    getImgMarkup: function getImgMarkup(index, src, altAttr, srcset, sizes, sources) {
      var srcsetAttr = srcset ? "srcset=\"" + srcset + "\"" : '';
      var sizesAttr = sizes ? "sizes=\"" + sizes + "\"" : '';
      var imgMarkup = "<img " + altAttr + " " + srcsetAttr + "  " + sizesAttr + " class=\"lg-object lg-image\" data-index=\"" + index + "\" src=\"" + src + "\" />";
      var sourceTag = '';
      if (sources) {
        var sourceObj = typeof sources === 'string' ? JSON.parse(sources) : sources;
        sourceTag = sourceObj.map(function (source) {
          var attrs = '';
          Object.keys(source).forEach(function (key) {
            // Do not remove the first space as it is required to separate the attributes
            attrs += " " + key + "=\"" + source[key] + "\"";
          });
          return "<source " + attrs + "></source>";
        });
      }
      return "" + sourceTag + imgMarkup;
    },
    // Get src from responsive src
    getResponsiveSrc: function getResponsiveSrc(srcItms) {
      var rsWidth = [];
      var rsSrc = [];
      var src = '';
      for (var i = 0; i < srcItms.length; i++) {
        var _src = srcItms[i].split(' ');
        // Manage empty space
        if (_src[0] === '') {
          _src.splice(0, 1);
        }
        rsSrc.push(_src[0]);
        rsWidth.push(_src[1]);
      }
      var wWidth = window.innerWidth;
      for (var j = 0; j < rsWidth.length; j++) {
        if (parseInt(rsWidth[j], 10) > wWidth) {
          src = rsSrc[j];
          break;
        }
      }
      return src;
    },
    isImageLoaded: function isImageLoaded(img) {
      if (!img) return false;
      // During the onload event, IE correctly identifies any images that
      // weren’t downloaded as not complete. Others should too. Gecko-based
      // browsers act like NS4 in that they report this incorrectly.
      if (!img.complete) {
        return false;
      }
      // However, they do have two very useful properties: naturalWidth and
      // naturalHeight. These give the true size of the image. If it failed
      // to load, either of these should be zero.
      if (img.naturalWidth === 0) {
        return false;
      }
      // No other way of checking: assume it’s ok.
      return true;
    },
    getVideoPosterMarkup: function getVideoPosterMarkup(_poster, dummyImg, videoContStyle, playVideoString, _isVideo) {
      var videoClass = '';
      if (_isVideo && _isVideo.youtube) {
        videoClass = 'lg-has-youtube';
      } else if (_isVideo && _isVideo.vimeo) {
        videoClass = 'lg-has-vimeo';
      } else {
        videoClass = 'lg-has-html5';
      }
      return "<div class=\"lg-video-cont " + videoClass + "\" style=\"" + videoContStyle + "\">\n                <div class=\"lg-video-play-button\">\n                <svg\n                    viewBox=\"0 0 20 20\"\n                    preserveAspectRatio=\"xMidYMid\"\n                    focusable=\"false\"\n                    aria-labelledby=\"" + playVideoString + "\"\n                    role=\"img\"\n                    class=\"lg-video-play-icon\"\n                >\n                    <title>" + playVideoString + "</title>\n                    <polygon class=\"lg-video-play-icon-inner\" points=\"1,0 20,10 1,20\"></polygon>\n                </svg>\n                <svg class=\"lg-video-play-icon-bg\" viewBox=\"0 0 50 50\" focusable=\"false\">\n                    <circle cx=\"50%\" cy=\"50%\" r=\"20\"></circle></svg>\n                <svg class=\"lg-video-play-icon-circle\" viewBox=\"0 0 50 50\" focusable=\"false\">\n                    <circle cx=\"50%\" cy=\"50%\" r=\"20\"></circle>\n                </svg>\n            </div>\n            " + (dummyImg || '') + "\n            <img class=\"lg-object lg-video-poster\" src=\"" + _poster + "\" />\n        </div>";
    },
    /**
     * @desc Create dynamic elements array from gallery items when dynamic option is false
     * It helps to avoid frequent DOM interaction
     * and avoid multiple checks for dynamic elments
     *
     * @returns {Array} dynamicEl
     */
    getDynamicOptions: function getDynamicOptions(items, extraProps, getCaptionFromTitleOrAlt, exThumbImage) {
      var dynamicElements = [];
      var availableDynamicOptions = __spreadArrays(defaultDynamicOptions, extraProps);
      [].forEach.call(items, function (item) {
        var dynamicEl = {};
        for (var i = 0; i < item.attributes.length; i++) {
          var attr = item.attributes[i];
          if (attr.specified) {
            var dynamicAttr = convertToData(attr.name);
            var label = '';
            if (availableDynamicOptions.indexOf(dynamicAttr) > -1) {
              label = dynamicAttr;
            }
            if (label) {
              dynamicEl[label] = attr.value;
            }
          }
        }
        var currentItem = $LG(item);
        var alt = currentItem.find('img').first().attr('alt');
        var title = currentItem.attr('title');
        var thumb = exThumbImage ? currentItem.attr(exThumbImage) : currentItem.find('img').first().attr('src');
        dynamicEl.thumb = thumb;
        if (getCaptionFromTitleOrAlt && !dynamicEl.subHtml) {
          dynamicEl.subHtml = title || alt || '';
        }
        dynamicEl.alt = alt || title || '';
        dynamicElements.push(dynamicEl);
      });
      return dynamicElements;
    },
    isMobile: function isMobile() {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
    /**
     * @desc Check the given src is video
     * @param {String} src
     * @return {Object} video type
     * Ex:{ youtube  :  ["//www.youtube.com/watch?v=c0asJgSyxcY", "c0asJgSyxcY"] }
     *
     * @todo - this information can be moved to dynamicEl to avoid frequent calls
     */
    isVideo: function isVideo(src, isHTML5VIdeo, index) {
      if (!src) {
        if (isHTML5VIdeo) {
          return {
            html5: true
          };
        } else {
          console.error('lightGallery :- data-src is not provided on slide item ' + (index + 1) + '. Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/');
          return;
        }
      }
      var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i);
      var vimeo = src.match(/\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i);
      var wistia = src.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/);
      if (youtube) {
        return {
          youtube: youtube
        };
      } else if (vimeo) {
        return {
          vimeo: vimeo
        };
      } else if (wistia) {
        return {
          wistia: wistia
        };
      }
    }
  };

  // @ref - https://stackoverflow.com/questions/3971841/how-to-resize-images-proportionally-keeping-the-aspect-ratio
  // @ref - https://2ality.com/2017/04/setting-up-multi-platform-packages.html
  // Unique id for each gallery
  var lgId = 0;
  var LightGallery = /** @class */function () {
    function LightGallery(element, options) {
      this.lgOpened = false;
      this.index = 0;
      // lightGallery modules
      this.plugins = [];
      // false when lightGallery load first slide content;
      this.lGalleryOn = false;
      // True when a slide animation is in progress
      this.lgBusy = false;
      this.currentItemsInDom = [];
      // Scroll top value before lightGallery is opened
      this.prevScrollTop = 0;
      this.isDummyImageRemoved = false;
      this.dragOrSwipeEnabled = false;
      this.mediaContainerPosition = {
        top: 0,
        bottom: 0
      };
      if (!element) {
        return this;
      }
      lgId++;
      this.lgId = lgId;
      this.el = element;
      this.LGel = $LG(element);
      this.generateSettings(options);
      this.buildModules();
      // When using dynamic mode, ensure dynamicEl is an array
      if (this.settings.dynamic && this.settings.dynamicEl !== undefined && !Array.isArray(this.settings.dynamicEl)) {
        throw 'When using dynamic mode, you must also define dynamicEl as an Array.';
      }
      this.galleryItems = this.getItems();
      this.normalizeSettings();
      // Gallery items
      this.init();
      this.validateLicense();
      return this;
    }
    LightGallery.prototype.generateSettings = function (options) {
      // lightGallery settings
      this.settings = _assign(_assign({}, lightGalleryCoreSettings), options);
      if (this.settings.isMobile && typeof this.settings.isMobile === 'function' ? this.settings.isMobile() : utils.isMobile()) {
        var mobileSettings = _assign(_assign({}, this.settings.mobileSettings), this.settings.mobileSettings);
        this.settings = _assign(_assign({}, this.settings), mobileSettings);
      }
    };
    LightGallery.prototype.normalizeSettings = function () {
      if (this.settings.slideEndAnimation) {
        this.settings.hideControlOnEnd = false;
      }
      if (!this.settings.closable) {
        this.settings.swipeToClose = false;
      }
      // And reset it on close to get the correct value next time
      this.zoomFromOrigin = this.settings.zoomFromOrigin;
      // At the moment, Zoom from image doesn't support dynamic options
      // @todo add zoomFromOrigin support for dynamic images
      if (this.settings.dynamic) {
        this.zoomFromOrigin = false;
      }
      if (!this.settings.container) {
        this.settings.container = document.body;
      }
      // settings.preload should not be grater than $item.length
      this.settings.preload = Math.min(this.settings.preload, this.galleryItems.length);
    };
    LightGallery.prototype.init = function () {
      var _this = this;
      this.addSlideVideoInfo(this.galleryItems);
      this.buildStructure();
      this.LGel.trigger(lGEvents.init, {
        instance: this
      });
      if (this.settings.keyPress) {
        this.keyPress();
      }
      setTimeout(function () {
        _this.enableDrag();
        _this.enableSwipe();
        _this.triggerPosterClick();
      }, 50);
      this.arrow();
      if (this.settings.mousewheel) {
        this.mousewheel();
      }
      if (!this.settings.dynamic) {
        this.openGalleryOnItemClick();
      }
    };
    LightGallery.prototype.openGalleryOnItemClick = function () {
      var _this = this;
      var _loop_1 = function _loop_1(index) {
        var element = this_1.items[index];
        var $element = $LG(element);
        // Using different namespace for click because click event should not unbind if selector is same object('this')
        // @todo manage all event listners - should have namespace that represent element
        var uuid = lgQuery.generateUUID();
        $element.attr('data-lg-id', uuid).on("click.lgcustom-item-" + uuid, function (e) {
          e.preventDefault();
          var currentItemIndex = _this.settings.index || index;
          _this.openGallery(currentItemIndex, element);
        });
      };
      var this_1 = this;
      // Using for loop instead of using bubbling as the items can be any html element.
      for (var index = 0; index < this.items.length; index++) {
        _loop_1(index);
      }
    };
    /**
     * Module constructor
     * Modules are build incrementally.
     * Gallery should be opened only once all the modules are initialized.
     * use moduleBuildTimeout to make sure this
     */
    LightGallery.prototype.buildModules = function () {
      var _this = this;
      this.settings.plugins.forEach(function (plugin) {
        _this.plugins.push(new plugin(_this, $LG));
      });
    };
    LightGallery.prototype.validateLicense = function () {
      if (!this.settings.licenseKey) {
        console.error('Please provide a valid license key');
      } else if (this.settings.licenseKey === '0000-0000-000-0000') {
        console.warn("lightGallery: " + this.settings.licenseKey + " license key is not valid for production use");
      }
    };
    LightGallery.prototype.getSlideItem = function (index) {
      return $LG(this.getSlideItemId(index));
    };
    LightGallery.prototype.getSlideItemId = function (index) {
      return "#lg-item-" + this.lgId + "-" + index;
    };
    LightGallery.prototype.getIdName = function (id) {
      return id + "-" + this.lgId;
    };
    LightGallery.prototype.getElementById = function (id) {
      return $LG("#" + this.getIdName(id));
    };
    LightGallery.prototype.manageSingleSlideClassName = function () {
      if (this.galleryItems.length < 2) {
        this.outer.addClass('lg-single-item');
      } else {
        this.outer.removeClass('lg-single-item');
      }
    };
    LightGallery.prototype.buildStructure = function () {
      var _this = this;
      var container = this.$container && this.$container.get();
      if (container) {
        return;
      }
      var controls = '';
      var subHtmlCont = '';
      // Create controls
      if (this.settings.controls) {
        controls = "<button type=\"button\" id=\"" + this.getIdName('lg-prev') + "\" aria-label=\"" + this.settings.strings['previousSlide'] + "\" class=\"lg-prev lg-icon\"> " + this.settings.prevHtml + " </button>\n                <button type=\"button\" id=\"" + this.getIdName('lg-next') + "\" aria-label=\"" + this.settings.strings['nextSlide'] + "\" class=\"lg-next lg-icon\"> " + this.settings.nextHtml + " </button>";
      }
      if (this.settings.appendSubHtmlTo !== '.lg-item') {
        subHtmlCont = '<div class="lg-sub-html" role="status" aria-live="polite"></div>';
      }
      var addClasses = '';
      if (this.settings.allowMediaOverlap) {
        // Do not remove space before last single quote
        addClasses += 'lg-media-overlap ';
      }
      var ariaLabelledby = this.settings.ariaLabelledby ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"' : '';
      var ariaDescribedby = this.settings.ariaDescribedby ? 'aria-describedby="' + this.settings.ariaDescribedby + '"' : '';
      var containerClassName = "lg-container " + this.settings.addClass + " " + (document.body !== this.settings.container ? 'lg-inline' : '');
      var closeIcon = this.settings.closable && this.settings.showCloseIcon ? "<button type=\"button\" aria-label=\"" + this.settings.strings['closeGallery'] + "\" id=\"" + this.getIdName('lg-close') + "\" class=\"lg-close lg-icon\"></button>" : '';
      var maximizeIcon = this.settings.showMaximizeIcon ? "<button type=\"button\" aria-label=\"" + this.settings.strings['toggleMaximize'] + "\" id=\"" + this.getIdName('lg-maximize') + "\" class=\"lg-maximize lg-icon\"></button>" : '';
      var template = "\n        <div class=\"" + containerClassName + "\" id=\"" + this.getIdName('lg-container') + "\" tabindex=\"-1\" aria-modal=\"true\" " + ariaLabelledby + " " + ariaDescribedby + " role=\"dialog\"\n        >\n            <div id=\"" + this.getIdName('lg-backdrop') + "\" class=\"lg-backdrop\"></div>\n\n            <div id=\"" + this.getIdName('lg-outer') + "\" class=\"lg-outer lg-use-css3 lg-css3 lg-hide-items " + addClasses + " \">\n\n              <div id=\"" + this.getIdName('lg-content') + "\" class=\"lg-content\">\n                <div id=\"" + this.getIdName('lg-inner') + "\" class=\"lg-inner\">\n                </div>\n                " + controls + "\n              </div>\n                <div id=\"" + this.getIdName('lg-toolbar') + "\" class=\"lg-toolbar lg-group\">\n                    " + maximizeIcon + "\n                    " + closeIcon + "\n                    </div>\n                    " + (this.settings.appendSubHtmlTo === '.lg-outer' ? subHtmlCont : '') + "\n                <div id=\"" + this.getIdName('lg-components') + "\" class=\"lg-components\">\n                    " + (this.settings.appendSubHtmlTo === '.lg-sub-html' ? subHtmlCont : '') + "\n                </div>\n            </div>\n        </div>\n        ";
      $LG(this.settings.container).append(template);
      if (document.body !== this.settings.container) {
        $LG(this.settings.container).css('position', 'relative');
      }
      this.outer = this.getElementById('lg-outer');
      this.$lgComponents = this.getElementById('lg-components');
      this.$backdrop = this.getElementById('lg-backdrop');
      this.$container = this.getElementById('lg-container');
      this.$inner = this.getElementById('lg-inner');
      this.$content = this.getElementById('lg-content');
      this.$toolbar = this.getElementById('lg-toolbar');
      this.$backdrop.css('transition-duration', this.settings.backdropDuration + 'ms');
      var outerClassNames = this.settings.mode + " ";
      this.manageSingleSlideClassName();
      if (this.settings.enableDrag) {
        outerClassNames += 'lg-grab ';
      }
      this.outer.addClass(outerClassNames);
      this.$inner.css('transition-timing-function', this.settings.easing);
      this.$inner.css('transition-duration', this.settings.speed + 'ms');
      if (this.settings.download) {
        this.$toolbar.append("<a id=\"" + this.getIdName('lg-download') + "\" target=\"_blank\" rel=\"noopener\" aria-label=\"" + this.settings.strings['download'] + "\" download class=\"lg-download lg-icon\"></a>");
      }
      this.counter();
      $LG(window).on("resize.lg.global" + this.lgId + " orientationchange.lg.global" + this.lgId, function () {
        _this.refreshOnResize();
      });
      this.hideBars();
      this.manageCloseGallery();
      this.toggleMaximize();
      this.initModules();
    };
    LightGallery.prototype.refreshOnResize = function () {
      if (this.lgOpened) {
        var currentGalleryItem = this.galleryItems[this.index];
        var __slideVideoInfo = currentGalleryItem.__slideVideoInfo;
        this.mediaContainerPosition = this.getMediaContainerPosition();
        var _a = this.mediaContainerPosition,
          top_1 = _a.top,
          bottom = _a.bottom;
        this.currentImageSize = utils.getSize(this.items[this.index], this.outer, top_1 + bottom, __slideVideoInfo && this.settings.videoMaxSize);
        if (__slideVideoInfo) {
          this.resizeVideoSlide(this.index, this.currentImageSize);
        }
        if (this.zoomFromOrigin && !this.isDummyImageRemoved) {
          var imgStyle = this.getDummyImgStyles(this.currentImageSize);
          this.outer.find('.lg-current .lg-dummy-img').first().attr('style', imgStyle);
        }
        this.LGel.trigger(lGEvents.containerResize);
      }
    };
    LightGallery.prototype.resizeVideoSlide = function (index, imageSize) {
      var lgVideoStyle = this.getVideoContStyle(imageSize);
      var currentSlide = this.getSlideItem(index);
      currentSlide.find('.lg-video-cont').attr('style', lgVideoStyle);
    };
    /**
     * Update slides dynamically.
     * Add, edit or delete slides dynamically when lightGallery is opened.
     * Modify the current gallery items and pass it via updateSlides method
     * @note
     * - Do not mutate existing lightGallery items directly.
     * - Always pass new list of gallery items
     * - You need to take care of thumbnails outside the gallery if any
     * - user this method only if you want to update slides when the gallery is opened. Otherwise, use `refresh()` method.
     * @param items Gallery items
     * @param index After the update operation, which slide gallery should navigate to
     * @category lGPublicMethods
     * @example
     * const plugin = lightGallery();
     *
     * // Adding slides dynamically
     * let galleryItems = [
     * // Access existing lightGallery items
     * // galleryItems are automatically generated internally from the gallery HTML markup
     * // or directly from galleryItems when dynamic gallery is used
     *   ...plugin.galleryItems,
     *     ...[
     *       {
     *         src: 'img/img-1.png',
     *           thumb: 'img/thumb1.png',
     *         },
     *     ],
     *   ];
     *   plugin.updateSlides(
     *     galleryItems,
     *     plugin.index,
     *   );
     *
     *
     * // Remove slides dynamically
     * galleryItems = JSON.parse(
     *   JSON.stringify(updateSlideInstance.galleryItems),
     * );
     * galleryItems.shift();
     * updateSlideInstance.updateSlides(galleryItems, 1);
     * @see <a href="/demos/update-slides/">Demo</a>
     */
    LightGallery.prototype.updateSlides = function (items, index) {
      if (this.index > items.length - 1) {
        this.index = items.length - 1;
      }
      if (items.length === 1) {
        this.index = 0;
      }
      if (!items.length) {
        this.closeGallery();
        return;
      }
      var currentSrc = this.galleryItems[index].src;
      this.galleryItems = items;
      this.updateControls();
      this.$inner.empty();
      this.currentItemsInDom = [];
      var _index = 0;
      // Find the current index based on source value of the slide
      this.galleryItems.some(function (galleryItem, itemIndex) {
        if (galleryItem.src === currentSrc) {
          _index = itemIndex;
          return true;
        }
        return false;
      });
      this.currentItemsInDom = this.organizeSlideItems(_index, -1);
      this.loadContent(_index, true);
      this.getSlideItem(_index).addClass('lg-current');
      this.index = _index;
      this.updateCurrentCounter(_index);
      this.LGel.trigger(lGEvents.updateSlides);
    };
    // Get gallery items based on multiple conditions
    LightGallery.prototype.getItems = function () {
      // Gallery items
      this.items = [];
      if (!this.settings.dynamic) {
        if (this.settings.selector === 'this') {
          this.items.push(this.el);
        } else if (this.settings.selector) {
          if (typeof this.settings.selector === 'string') {
            if (this.settings.selectWithin) {
              var selectWithin = $LG(this.settings.selectWithin);
              this.items = selectWithin.find(this.settings.selector).get();
            } else {
              this.items = this.el.querySelectorAll(this.settings.selector);
            }
          } else {
            this.items = this.settings.selector;
          }
        } else {
          this.items = this.el.children;
        }
        return utils.getDynamicOptions(this.items, this.settings.extraProps, this.settings.getCaptionFromTitleOrAlt, this.settings.exThumbImage);
      } else {
        return this.settings.dynamicEl || [];
      }
    };
    /**
     * Open lightGallery.
     * Open gallery with specific slide by passing index of the slide as parameter.
     * @category lGPublicMethods
     * @param {Number} index  - index of the slide
     * @param {HTMLElement} element - Which image lightGallery should zoom from
     *
     * @example
     * const $dynamicGallery = document.getElementById('dynamic-gallery-demo');
     * const dynamicGallery = lightGallery($dynamicGallery, {
     *     dynamic: true,
     *     dynamicEl: [
     *         {
     *              src: 'img/1.jpg',
     *              thumb: 'img/thumb-1.jpg',
     *              subHtml: '<h4>Image 1 title</h4><p>Image 1 descriptions.</p>',
     *         },
     *         ...
     *     ],
     * });
     * $dynamicGallery.addEventListener('click', function () {
     *     // Starts with third item.(Optional).
     *     // This is useful if you want use dynamic mode with
     *     // custom thumbnails (thumbnails outside gallery),
     *     dynamicGallery.openGallery(2);
     * });
     *
     */
    LightGallery.prototype.openGallery = function (index, element) {
      var _this = this;
      if (index === void 0) {
        index = this.settings.index;
      }
      // prevent accidental double execution
      if (this.lgOpened) return;
      this.lgOpened = true;
      this.outer.get().focus();
      this.outer.removeClass('lg-hide-items');
      // Add display block, but still has opacity 0
      this.$container.addClass('lg-show');
      var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, index);
      this.currentItemsInDom = itemsToBeInsertedToDom;
      var items = '';
      itemsToBeInsertedToDom.forEach(function (item) {
        items = items + ("<div id=\"" + item + "\" class=\"lg-item\"></div>");
      });
      this.$inner.append(items);
      this.addHtml(index);
      var transform = '';
      this.mediaContainerPosition = this.getMediaContainerPosition();
      var _a = this.mediaContainerPosition,
        top = _a.top,
        bottom = _a.bottom;
      if (!this.settings.allowMediaOverlap) {
        this.setMediaContainerPosition(top, bottom);
      }
      var __slideVideoInfo = this.galleryItems[index].__slideVideoInfo;
      if (this.zoomFromOrigin && element) {
        this.currentImageSize = utils.getSize(element, this.outer, top + bottom, __slideVideoInfo && this.settings.videoMaxSize);
        transform = utils.getTransform(element, this.outer, top, bottom, this.currentImageSize);
      }
      if (!this.zoomFromOrigin || !transform) {
        this.outer.addClass(this.settings.startClass);
        this.getSlideItem(index).removeClass('lg-complete');
      }
      var timeout = this.settings.zoomFromOrigin ? 100 : this.settings.backdropDuration;
      setTimeout(function () {
        _this.outer.addClass('lg-components-open');
      }, timeout);
      this.index = index;
      this.LGel.trigger(lGEvents.beforeOpen);
      // add class lg-current to remove initial transition
      this.getSlideItem(index).addClass('lg-current');
      this.lGalleryOn = false;
      // Store the current scroll top value to scroll back after closing the gallery..
      this.prevScrollTop = $LG(window).scrollTop();
      setTimeout(function () {
        // Need to check both zoomFromOrigin and transform values as we need to set set the
        // default opening animation if user missed to add the lg-size attribute
        if (_this.zoomFromOrigin && transform) {
          var currentSlide_1 = _this.getSlideItem(index);
          currentSlide_1.css('transform', transform);
          setTimeout(function () {
            currentSlide_1.addClass('lg-start-progress lg-start-end-progress').css('transition-duration', _this.settings.startAnimationDuration + 'ms');
            _this.outer.addClass('lg-zoom-from-image');
          });
          setTimeout(function () {
            currentSlide_1.css('transform', 'translate3d(0, 0, 0)');
          }, 100);
        }
        setTimeout(function () {
          _this.$backdrop.addClass('in');
          _this.$container.addClass('lg-show-in');
        }, 10);
        // lg-visible class resets gallery opacity to 1
        if (!_this.zoomFromOrigin || !transform) {
          setTimeout(function () {
            _this.outer.addClass('lg-visible');
          }, _this.settings.backdropDuration);
        }
        // initiate slide function
        _this.slide(index, false, false, false);
        _this.LGel.trigger(lGEvents.afterOpen);
      });
      if (document.body === this.settings.container) {
        $LG('html').addClass('lg-on');
      }
    };
    /**
     * Note - Changing the position of the media on every slide transition creates a flickering effect.
     * Therefore, The height of the caption is calculated dynamically, only once based on the first slide caption.
     * if you have dynamic captions for each media,
     * you can provide an appropriate height for the captions via allowMediaOverlap option
     */
    LightGallery.prototype.getMediaContainerPosition = function () {
      if (this.settings.allowMediaOverlap) {
        return {
          top: 0,
          bottom: 0
        };
      }
      var top = this.$toolbar.get().clientHeight || 0;
      var subHtml = this.outer.find('.lg-components .lg-sub-html').get();
      var captionHeight = this.settings.defaultCaptionHeight || subHtml && subHtml.clientHeight || 0;
      var thumbContainer = this.outer.find('.lg-thumb-outer').get();
      var thumbHeight = thumbContainer ? thumbContainer.clientHeight : 0;
      var bottom = thumbHeight + captionHeight;
      return {
        top: top,
        bottom: bottom
      };
    };
    LightGallery.prototype.setMediaContainerPosition = function (top, bottom) {
      if (top === void 0) {
        top = 0;
      }
      if (bottom === void 0) {
        bottom = 0;
      }
      this.$content.css('top', top + 'px').css('bottom', bottom + 'px');
    };
    LightGallery.prototype.hideBars = function () {
      var _this = this;
      // Hide controllers if mouse doesn't move for some period
      setTimeout(function () {
        _this.outer.removeClass('lg-hide-items');
        if (_this.settings.hideBarsDelay > 0) {
          _this.outer.on('mousemove.lg click.lg touchstart.lg', function () {
            _this.outer.removeClass('lg-hide-items');
            clearTimeout(_this.hideBarTimeout);
            // Timeout will be cleared on each slide movement also
            _this.hideBarTimeout = setTimeout(function () {
              _this.outer.addClass('lg-hide-items');
            }, _this.settings.hideBarsDelay);
          });
          _this.outer.trigger('mousemove.lg');
        }
      }, this.settings.showBarsAfter);
    };
    LightGallery.prototype.initPictureFill = function ($img) {
      if (this.settings.supportLegacyBrowser) {
        try {
          picturefill({
            elements: [$img.get()]
          });
        } catch (e) {
          console.warn('lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.');
        }
      }
    };
    /**
     *  @desc Create image counter
     *  Ex: 1/10
     */
    LightGallery.prototype.counter = function () {
      if (this.settings.counter) {
        var counterHtml = "<div class=\"lg-counter\" role=\"status\" aria-live=\"polite\">\n                <span id=\"" + this.getIdName('lg-counter-current') + "\" class=\"lg-counter-current\">" + (this.index + 1) + " </span> /\n                <span id=\"" + this.getIdName('lg-counter-all') + "\" class=\"lg-counter-all\">" + this.galleryItems.length + " </span></div>";
        this.outer.find(this.settings.appendCounterTo).append(counterHtml);
      }
    };
    /**
     *  @desc add sub-html into the slide
     *  @param {Number} index - index of the slide
     */
    LightGallery.prototype.addHtml = function (index) {
      var subHtml;
      var subHtmlUrl;
      if (this.galleryItems[index].subHtmlUrl) {
        subHtmlUrl = this.galleryItems[index].subHtmlUrl;
      } else {
        subHtml = this.galleryItems[index].subHtml;
      }
      if (!subHtmlUrl) {
        if (subHtml) {
          // get first letter of sub-html
          // if first letter starts with . or # get the html form the jQuery object
          var fL = subHtml.substring(0, 1);
          if (fL === '.' || fL === '#') {
            if (this.settings.subHtmlSelectorRelative && !this.settings.dynamic) {
              subHtml = $LG(this.items).eq(index).find(subHtml).first().html();
            } else {
              subHtml = $LG(subHtml).first().html();
            }
          }
        } else {
          subHtml = '';
        }
      }
      if (this.settings.appendSubHtmlTo !== '.lg-item') {
        if (subHtmlUrl) {
          this.outer.find('.lg-sub-html').load(subHtmlUrl);
        } else {
          this.outer.find('.lg-sub-html').html(subHtml);
        }
      } else {
        var currentSlide = $LG(this.getSlideItemId(index));
        if (subHtmlUrl) {
          currentSlide.load(subHtmlUrl);
        } else {
          currentSlide.append("<div class=\"lg-sub-html\">" + subHtml + "</div>");
        }
      }
      // Add lg-empty-html class if title doesn't exist
      if (typeof subHtml !== 'undefined' && subHtml !== null) {
        if (subHtml === '') {
          this.outer.find(this.settings.appendSubHtmlTo).addClass('lg-empty-html');
        } else {
          this.outer.find(this.settings.appendSubHtmlTo).removeClass('lg-empty-html');
        }
      }
      this.LGel.trigger(lGEvents.afterAppendSubHtml, {
        index: index
      });
    };
    /**
     *  @desc Preload slides
     *  @param {Number} index - index of the slide
     * @todo preload not working for the first slide, Also, should work for the first and last slide as well
     */
    LightGallery.prototype.preload = function (index) {
      for (var i = 1; i <= this.settings.preload; i++) {
        if (i >= this.galleryItems.length - index) {
          break;
        }
        this.loadContent(index + i, false);
      }
      for (var j = 1; j <= this.settings.preload; j++) {
        if (index - j < 0) {
          break;
        }
        this.loadContent(index - j, false);
      }
    };
    LightGallery.prototype.getDummyImgStyles = function (imageSize) {
      if (!imageSize) return '';
      return "width:" + imageSize.width + "px;\n                margin-left: -" + imageSize.width / 2 + "px;\n                margin-top: -" + imageSize.height / 2 + "px;\n                height:" + imageSize.height + "px";
    };
    LightGallery.prototype.getVideoContStyle = function (imageSize) {
      if (!imageSize) return '';
      return "width:" + imageSize.width + "px;\n                height:" + imageSize.height + "px";
    };
    LightGallery.prototype.getDummyImageContent = function ($currentSlide, index, alt) {
      var $currentItem;
      if (!this.settings.dynamic) {
        $currentItem = $LG(this.items).eq(index);
      }
      if ($currentItem) {
        var _dummyImgSrc = void 0;
        if (!this.settings.exThumbImage) {
          _dummyImgSrc = $currentItem.find('img').first().attr('src');
        } else {
          _dummyImgSrc = $currentItem.attr(this.settings.exThumbImage);
        }
        if (!_dummyImgSrc) return '';
        var imgStyle = this.getDummyImgStyles(this.currentImageSize);
        var dummyImgContent = "<img " + alt + " style=\"" + imgStyle + "\" class=\"lg-dummy-img\" src=\"" + _dummyImgSrc + "\" />";
        $currentSlide.addClass('lg-first-slide');
        this.outer.addClass('lg-first-slide-loading');
        return dummyImgContent;
      }
      return '';
    };
    LightGallery.prototype.setImgMarkup = function (src, $currentSlide, index) {
      var currentGalleryItem = this.galleryItems[index];
      var alt = currentGalleryItem.alt,
        srcset = currentGalleryItem.srcset,
        sizes = currentGalleryItem.sizes,
        sources = currentGalleryItem.sources;
      // Use the thumbnail as dummy image which will be resized to actual image size and
      // displayed on top of actual image
      var imgContent = '';
      var altAttr = alt ? 'alt="' + alt + '"' : '';
      if (this.isFirstSlideWithZoomAnimation()) {
        imgContent = this.getDummyImageContent($currentSlide, index, altAttr);
      } else {
        imgContent = utils.getImgMarkup(index, src, altAttr, srcset, sizes, sources);
      }
      var imgMarkup = "<picture class=\"lg-img-wrap\"> " + imgContent + "</picture>";
      $currentSlide.prepend(imgMarkup);
    };
    LightGallery.prototype.onSlideObjectLoad = function ($slide, isHTML5VideoWithoutPoster, onLoad, onError) {
      var mediaObject = $slide.find('.lg-object').first();
      if (utils.isImageLoaded(mediaObject.get()) || isHTML5VideoWithoutPoster) {
        onLoad();
      } else {
        mediaObject.on('load.lg error.lg', function () {
          onLoad && onLoad();
        });
        mediaObject.on('error.lg', function () {
          onError && onError();
        });
      }
    };
    /**
     *
     * @param $el Current slide item
     * @param index
     * @param delay Delay is 0 except first time
     * @param speed Speed is same as delay, except it is 0 if gallery is opened via hash plugin
     * @param isFirstSlide
     */
    LightGallery.prototype.onLgObjectLoad = function (currentSlide, index, delay, speed, isFirstSlide, isHTML5VideoWithoutPoster) {
      var _this = this;
      this.onSlideObjectLoad(currentSlide, isHTML5VideoWithoutPoster, function () {
        _this.triggerSlideItemLoad(currentSlide, index, delay, speed, isFirstSlide);
      }, function () {
        currentSlide.addClass('lg-complete lg-complete_');
        currentSlide.html('<span class="lg-error-msg">Oops... Failed to load content...</span>');
      });
    };
    LightGallery.prototype.triggerSlideItemLoad = function ($currentSlide, index, delay, speed, isFirstSlide) {
      var _this = this;
      var currentGalleryItem = this.galleryItems[index];
      // Adding delay for video slides without poster for better performance and user experience
      // Videos should start playing once once the gallery is completely loaded
      var _speed = isFirstSlide && this.getSlideType(currentGalleryItem) === 'video' && !currentGalleryItem.poster ? speed : 0;
      setTimeout(function () {
        $currentSlide.addClass('lg-complete lg-complete_');
        _this.LGel.trigger(lGEvents.slideItemLoad, {
          index: index,
          delay: delay || 0,
          isFirstSlide: isFirstSlide
        });
      }, _speed);
    };
    LightGallery.prototype.isFirstSlideWithZoomAnimation = function () {
      return !!(!this.lGalleryOn && this.zoomFromOrigin && this.currentImageSize);
    };
    // Add video slideInfo
    LightGallery.prototype.addSlideVideoInfo = function (items) {
      var _this = this;
      items.forEach(function (element, index) {
        element.__slideVideoInfo = utils.isVideo(element.src, !!element.video, index);
        if (element.__slideVideoInfo && _this.settings.loadYouTubePoster && !element.poster && element.__slideVideoInfo.youtube) {
          element.poster = "//img.youtube.com/vi/" + element.__slideVideoInfo.youtube[1] + "/maxresdefault.jpg";
        }
      });
    };
    /**
     *  Load slide content into slide.
     *  This is used to load content into slides that is not visible too
     *  @param {Number} index - index of the slide.
     *  @param {Boolean} rec - if true call loadcontent() function again.
     */
    LightGallery.prototype.loadContent = function (index, rec) {
      var _this = this;
      var currentGalleryItem = this.galleryItems[index];
      var $currentSlide = $LG(this.getSlideItemId(index));
      var poster = currentGalleryItem.poster,
        srcset = currentGalleryItem.srcset,
        sizes = currentGalleryItem.sizes,
        sources = currentGalleryItem.sources;
      var src = currentGalleryItem.src;
      var video = currentGalleryItem.video;
      var _html5Video = video && typeof video === 'string' ? JSON.parse(video) : video;
      if (currentGalleryItem.responsive) {
        var srcDyItms = currentGalleryItem.responsive.split(',');
        src = utils.getResponsiveSrc(srcDyItms) || src;
      }
      var videoInfo = currentGalleryItem.__slideVideoInfo;
      var lgVideoStyle = '';
      var iframe = !!currentGalleryItem.iframe;
      var isFirstSlide = !this.lGalleryOn;
      // delay for adding complete class. it is 0 except first time.
      var delay = 0;
      if (isFirstSlide) {
        if (this.zoomFromOrigin && this.currentImageSize) {
          delay = this.settings.startAnimationDuration + 10;
        } else {
          delay = this.settings.backdropDuration + 10;
        }
      }
      if (!$currentSlide.hasClass('lg-loaded')) {
        if (videoInfo) {
          var _a = this.mediaContainerPosition,
            top_2 = _a.top,
            bottom = _a.bottom;
          var videoSize = utils.getSize(this.items[index], this.outer, top_2 + bottom, videoInfo && this.settings.videoMaxSize);
          lgVideoStyle = this.getVideoContStyle(videoSize);
        }
        if (iframe) {
          var markup = utils.getIframeMarkup(this.settings.iframeWidth, this.settings.iframeHeight, this.settings.iframeMaxWidth, this.settings.iframeMaxHeight, src, currentGalleryItem.iframeTitle);
          $currentSlide.prepend(markup);
        } else if (poster) {
          var dummyImg = '';
          var hasStartAnimation = isFirstSlide && this.zoomFromOrigin && this.currentImageSize;
          if (hasStartAnimation) {
            dummyImg = this.getDummyImageContent($currentSlide, index, '');
          }
          var markup = utils.getVideoPosterMarkup(poster, dummyImg || '', lgVideoStyle, this.settings.strings['playVideo'], videoInfo);
          $currentSlide.prepend(markup);
        } else if (videoInfo) {
          var markup = "<div class=\"lg-video-cont \" style=\"" + lgVideoStyle + "\"></div>";
          $currentSlide.prepend(markup);
        } else {
          this.setImgMarkup(src, $currentSlide, index);
          if (srcset || sources) {
            var $img = $currentSlide.find('.lg-object');
            this.initPictureFill($img);
          }
        }
        if (poster || videoInfo) {
          this.LGel.trigger(lGEvents.hasVideo, {
            index: index,
            src: src,
            html5Video: _html5Video,
            hasPoster: !!poster
          });
        }
        this.LGel.trigger(lGEvents.afterAppendSlide, {
          index: index
        });
        if (this.lGalleryOn && this.settings.appendSubHtmlTo === '.lg-item') {
          this.addHtml(index);
        }
      }
      // For first time add some delay for displaying the start animation.
      var _speed = 0;
      // Do not change the delay value because it is required for zoom plugin.
      // If gallery opened from direct url (hash) speed value should be 0
      if (delay && !$LG(document.body).hasClass('lg-from-hash')) {
        _speed = delay;
      }
      // Only for first slide and zoomFromOrigin is enabled
      if (this.isFirstSlideWithZoomAnimation()) {
        setTimeout(function () {
          $currentSlide.removeClass('lg-start-end-progress lg-start-progress').removeAttr('style');
        }, this.settings.startAnimationDuration + 100);
        if (!$currentSlide.hasClass('lg-loaded')) {
          setTimeout(function () {
            if (_this.getSlideType(currentGalleryItem) === 'image') {
              $currentSlide.find('.lg-img-wrap').append(utils.getImgMarkup(index, src, '', srcset, sizes, currentGalleryItem.sources));
              if (srcset || sources) {
                var $img = $currentSlide.find('.lg-object');
                _this.initPictureFill($img);
              }
            }
            if (_this.getSlideType(currentGalleryItem) === 'image' || _this.getSlideType(currentGalleryItem) === 'video' && poster) {
              _this.onLgObjectLoad($currentSlide, index, delay, _speed, true, false);
              // load remaining slides once the slide is completely loaded
              _this.onSlideObjectLoad($currentSlide, !!(videoInfo && videoInfo.html5 && !poster), function () {
                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
              }, function () {
                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
              });
            }
          }, this.settings.startAnimationDuration + 100);
        }
      }
      // SLide content has been added to dom
      $currentSlide.addClass('lg-loaded');
      if (!this.isFirstSlideWithZoomAnimation() || this.getSlideType(currentGalleryItem) === 'video' && !poster) {
        this.onLgObjectLoad($currentSlide, index, delay, _speed, isFirstSlide, !!(videoInfo && videoInfo.html5 && !poster));
      }
      // When gallery is opened once content is loaded (second time) need to add lg-complete class for css styling
      if ((!this.zoomFromOrigin || !this.currentImageSize) && $currentSlide.hasClass('lg-complete_') && !this.lGalleryOn) {
        setTimeout(function () {
          $currentSlide.addClass('lg-complete');
        }, this.settings.backdropDuration);
      }
      // Content loaded
      // Need to set lGalleryOn before calling preload function
      this.lGalleryOn = true;
      if (rec === true) {
        if (!$currentSlide.hasClass('lg-complete_')) {
          $currentSlide.find('.lg-object').first().on('load.lg error.lg', function () {
            _this.preload(index);
          });
        } else {
          this.preload(index);
        }
      }
    };
    /**
     * @desc Remove dummy image content and load next slides
     * Called only for the first time if zoomFromOrigin animation is enabled
     * @param index
     * @param $currentSlide
     * @param speed
     */
    LightGallery.prototype.loadContentOnFirstSlideLoad = function (index, $currentSlide, speed) {
      var _this = this;
      setTimeout(function () {
        $currentSlide.find('.lg-dummy-img').remove();
        $currentSlide.removeClass('lg-first-slide');
        _this.outer.removeClass('lg-first-slide-loading');
        _this.isDummyImageRemoved = true;
        _this.preload(index);
      }, speed + 300);
    };
    LightGallery.prototype.getItemsToBeInsertedToDom = function (index, prevIndex, numberOfItems) {
      var _this = this;
      if (numberOfItems === void 0) {
        numberOfItems = 0;
      }
      var itemsToBeInsertedToDom = [];
      // Minimum 2 items should be there
      var possibleNumberOfItems = Math.max(numberOfItems, 3);
      possibleNumberOfItems = Math.min(possibleNumberOfItems, this.galleryItems.length);
      var prevIndexItem = "lg-item-" + this.lgId + "-" + prevIndex;
      if (this.galleryItems.length <= 3) {
        this.galleryItems.forEach(function (_element, index) {
          itemsToBeInsertedToDom.push("lg-item-" + _this.lgId + "-" + index);
        });
        return itemsToBeInsertedToDom;
      }
      if (index < (this.galleryItems.length - 1) / 2) {
        for (var idx = index; idx > index - possibleNumberOfItems / 2 && idx >= 0; idx--) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
        }
        var numberOfExistingItems = itemsToBeInsertedToDom.length;
        for (var idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index + idx + 1));
        }
      } else {
        for (var idx = index; idx <= this.galleryItems.length - 1 && idx < index + possibleNumberOfItems / 2; idx++) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
        }
        var numberOfExistingItems = itemsToBeInsertedToDom.length;
        for (var idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index - idx - 1));
        }
      }
      if (this.settings.loop) {
        if (index === this.galleryItems.length - 1) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + 0);
        } else if (index === 0) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (this.galleryItems.length - 1));
        }
      }
      if (itemsToBeInsertedToDom.indexOf(prevIndexItem) === -1) {
        itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + prevIndex);
      }
      return itemsToBeInsertedToDom;
    };
    LightGallery.prototype.organizeSlideItems = function (index, prevIndex) {
      var _this = this;
      var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, prevIndex, this.settings.numberOfSlideItemsInDom);
      itemsToBeInsertedToDom.forEach(function (item) {
        if (_this.currentItemsInDom.indexOf(item) === -1) {
          _this.$inner.append("<div id=\"" + item + "\" class=\"lg-item\"></div>");
        }
      });
      this.currentItemsInDom.forEach(function (item) {
        if (itemsToBeInsertedToDom.indexOf(item) === -1) {
          $LG("#" + item).remove();
        }
      });
      return itemsToBeInsertedToDom;
    };
    /**
     * Get previous index of the slide
     */
    LightGallery.prototype.getPreviousSlideIndex = function () {
      var prevIndex = 0;
      try {
        var currentItemId = this.outer.find('.lg-current').first().attr('id');
        prevIndex = parseInt(currentItemId.split('-')[3]) || 0;
      } catch (error) {
        prevIndex = 0;
      }
      return prevIndex;
    };
    LightGallery.prototype.setDownloadValue = function (index) {
      if (this.settings.download) {
        var currentGalleryItem = this.galleryItems[index];
        var hideDownloadBtn = currentGalleryItem.downloadUrl === false || currentGalleryItem.downloadUrl === 'false';
        if (hideDownloadBtn) {
          this.outer.addClass('lg-hide-download');
        } else {
          var $download = this.getElementById('lg-download');
          this.outer.removeClass('lg-hide-download');
          $download.attr('href', currentGalleryItem.downloadUrl || currentGalleryItem.src);
          if (currentGalleryItem.download) {
            $download.attr('download', currentGalleryItem.download);
          }
        }
      }
    };
    LightGallery.prototype.makeSlideAnimation = function (direction, currentSlideItem, previousSlideItem) {
      var _this = this;
      if (this.lGalleryOn) {
        previousSlideItem.addClass('lg-slide-progress');
      }
      setTimeout(function () {
        // remove all transitions
        _this.outer.addClass('lg-no-trans');
        _this.outer.find('.lg-item').removeClass('lg-prev-slide lg-next-slide');
        if (direction === 'prev') {
          //prevslide
          currentSlideItem.addClass('lg-prev-slide');
          previousSlideItem.addClass('lg-next-slide');
        } else {
          // next slide
          currentSlideItem.addClass('lg-next-slide');
          previousSlideItem.addClass('lg-prev-slide');
        }
        // give 50 ms for browser to add/remove class
        setTimeout(function () {
          _this.outer.find('.lg-item').removeClass('lg-current');
          currentSlideItem.addClass('lg-current');
          // reset all transitions
          _this.outer.removeClass('lg-no-trans');
        }, 50);
      }, this.lGalleryOn ? this.settings.slideDelay : 0);
    };
    /**
     * Goto a specific slide.
     * @param {Number} index - index of the slide
     * @param {Boolean} fromTouch - true if slide function called via touch event or mouse drag
     * @param {Boolean} fromThumb - true if slide function called via thumbnail click
     * @param {String} direction - Direction of the slide(next/prev)
     * @category lGPublicMethods
     * @example
     *  const plugin = lightGallery();
     *  // to go to 3rd slide
     *  plugin.slide(2);
     *
     */
    LightGallery.prototype.slide = function (index, fromTouch, fromThumb, direction) {
      var _this = this;
      var prevIndex = this.getPreviousSlideIndex();
      this.currentItemsInDom = this.organizeSlideItems(index, prevIndex);
      // Prevent multiple call, Required for hsh plugin
      if (this.lGalleryOn && prevIndex === index) {
        return;
      }
      var numberOfGalleryItems = this.galleryItems.length;
      if (!this.lgBusy) {
        if (this.settings.counter) {
          this.updateCurrentCounter(index);
        }
        var currentSlideItem = this.getSlideItem(index);
        var previousSlideItem_1 = this.getSlideItem(prevIndex);
        var currentGalleryItem = this.galleryItems[index];
        var videoInfo = currentGalleryItem.__slideVideoInfo;
        this.outer.attr('data-lg-slide-type', this.getSlideType(currentGalleryItem));
        this.setDownloadValue(index);
        if (videoInfo) {
          var _a = this.mediaContainerPosition,
            top_3 = _a.top,
            bottom = _a.bottom;
          var videoSize = utils.getSize(this.items[index], this.outer, top_3 + bottom, videoInfo && this.settings.videoMaxSize);
          this.resizeVideoSlide(index, videoSize);
        }
        this.LGel.trigger(lGEvents.beforeSlide, {
          prevIndex: prevIndex,
          index: index,
          fromTouch: !!fromTouch,
          fromThumb: !!fromThumb
        });
        this.lgBusy = true;
        clearTimeout(this.hideBarTimeout);
        this.arrowDisable(index);
        if (!direction) {
          if (index < prevIndex) {
            direction = 'prev';
          } else if (index > prevIndex) {
            direction = 'next';
          }
        }
        if (!fromTouch) {
          this.makeSlideAnimation(direction, currentSlideItem, previousSlideItem_1);
        } else {
          this.outer.find('.lg-item').removeClass('lg-prev-slide lg-current lg-next-slide');
          var touchPrev = void 0;
          var touchNext = void 0;
          if (numberOfGalleryItems > 2) {
            touchPrev = index - 1;
            touchNext = index + 1;
            if (index === 0 && prevIndex === numberOfGalleryItems - 1) {
              // next slide
              touchNext = 0;
              touchPrev = numberOfGalleryItems - 1;
            } else if (index === numberOfGalleryItems - 1 && prevIndex === 0) {
              // prev slide
              touchNext = 0;
              touchPrev = numberOfGalleryItems - 1;
            }
          } else {
            touchPrev = 0;
            touchNext = 1;
          }
          if (direction === 'prev') {
            this.getSlideItem(touchNext).addClass('lg-next-slide');
          } else {
            this.getSlideItem(touchPrev).addClass('lg-prev-slide');
          }
          currentSlideItem.addClass('lg-current');
        }
        // Do not put load content in set timeout as it needs to load immediately when the gallery is opened
        if (!this.lGalleryOn) {
          this.loadContent(index, true);
        } else {
          setTimeout(function () {
            _this.loadContent(index, true);
            // Add title if this.settings.appendSubHtmlTo === lg-sub-html
            if (_this.settings.appendSubHtmlTo !== '.lg-item') {
              _this.addHtml(index);
            }
          }, this.settings.speed + 50 + (fromTouch ? 0 : this.settings.slideDelay));
        }
        setTimeout(function () {
          _this.lgBusy = false;
          previousSlideItem_1.removeClass('lg-slide-progress');
          _this.LGel.trigger(lGEvents.afterSlide, {
            prevIndex: prevIndex,
            index: index,
            fromTouch: fromTouch,
            fromThumb: fromThumb
          });
        }, (this.lGalleryOn ? this.settings.speed + 100 : 100) + (fromTouch ? 0 : this.settings.slideDelay));
      }
      this.index = index;
    };
    LightGallery.prototype.updateCurrentCounter = function (index) {
      this.getElementById('lg-counter-current').html(index + 1 + '');
    };
    LightGallery.prototype.updateCounterTotal = function () {
      this.getElementById('lg-counter-all').html(this.galleryItems.length + '');
    };
    LightGallery.prototype.getSlideType = function (item) {
      if (item.__slideVideoInfo) {
        return 'video';
      } else if (item.iframe) {
        return 'iframe';
      } else {
        return 'image';
      }
    };
    LightGallery.prototype.touchMove = function (startCoords, endCoords, e) {
      var distanceX = endCoords.pageX - startCoords.pageX;
      var distanceY = endCoords.pageY - startCoords.pageY;
      var allowSwipe = false;
      if (this.swipeDirection) {
        allowSwipe = true;
      } else {
        if (Math.abs(distanceX) > 15) {
          this.swipeDirection = 'horizontal';
          allowSwipe = true;
        } else if (Math.abs(distanceY) > 15) {
          this.swipeDirection = 'vertical';
          allowSwipe = true;
        }
      }
      if (!allowSwipe) {
        return;
      }
      var $currentSlide = this.getSlideItem(this.index);
      if (this.swipeDirection === 'horizontal') {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        // reset opacity and transition duration
        this.outer.addClass('lg-dragging');
        // move current slide
        this.setTranslate($currentSlide, distanceX, 0);
        // move next and prev slide with current slide
        var width = $currentSlide.get().offsetWidth;
        var slideWidthAmount = width * 15 / 100;
        var gutter = slideWidthAmount - Math.abs(distanceX * 10 / 100);
        this.setTranslate(this.outer.find('.lg-prev-slide').first(), -width + distanceX - gutter, 0);
        this.setTranslate(this.outer.find('.lg-next-slide').first(), width + distanceX + gutter, 0);
      } else if (this.swipeDirection === 'vertical') {
        if (this.settings.swipeToClose) {
          e === null || e === void 0 ? void 0 : e.preventDefault();
          this.$container.addClass('lg-dragging-vertical');
          var opacity = 1 - Math.abs(distanceY) / window.innerHeight;
          this.$backdrop.css('opacity', opacity);
          var scale = 1 - Math.abs(distanceY) / (window.innerWidth * 2);
          this.setTranslate($currentSlide, 0, distanceY, scale, scale);
          if (Math.abs(distanceY) > 100) {
            this.outer.addClass('lg-hide-items').removeClass('lg-components-open');
          }
        }
      }
    };
    LightGallery.prototype.touchEnd = function (endCoords, startCoords, event) {
      var _this = this;
      var distance;
      // keep slide animation for any mode while dragg/swipe
      if (this.settings.mode !== 'lg-slide') {
        this.outer.addClass('lg-slide');
      }
      // set transition duration
      setTimeout(function () {
        _this.$container.removeClass('lg-dragging-vertical');
        _this.outer.removeClass('lg-dragging lg-hide-items').addClass('lg-components-open');
        var triggerClick = true;
        if (_this.swipeDirection === 'horizontal') {
          distance = endCoords.pageX - startCoords.pageX;
          var distanceAbs = Math.abs(endCoords.pageX - startCoords.pageX);
          if (distance < 0 && distanceAbs > _this.settings.swipeThreshold) {
            _this.goToNextSlide(true);
            triggerClick = false;
          } else if (distance > 0 && distanceAbs > _this.settings.swipeThreshold) {
            _this.goToPrevSlide(true);
            triggerClick = false;
          }
        } else if (_this.swipeDirection === 'vertical') {
          distance = Math.abs(endCoords.pageY - startCoords.pageY);
          if (_this.settings.closable && _this.settings.swipeToClose && distance > 100) {
            _this.closeGallery();
            return;
          } else {
            _this.$backdrop.css('opacity', 1);
          }
        }
        _this.outer.find('.lg-item').removeAttr('style');
        if (triggerClick && Math.abs(endCoords.pageX - startCoords.pageX) < 5) {
          // Trigger click if distance is less than 5 pix
          var target = $LG(event.target);
          if (_this.isPosterElement(target)) {
            _this.LGel.trigger(lGEvents.posterClick);
          }
        }
        _this.swipeDirection = undefined;
      });
      // remove slide class once drag/swipe is completed if mode is not slide
      setTimeout(function () {
        if (!_this.outer.hasClass('lg-dragging') && _this.settings.mode !== 'lg-slide') {
          _this.outer.removeClass('lg-slide');
        }
      }, this.settings.speed + 100);
    };
    LightGallery.prototype.enableSwipe = function () {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      var isMoved = false;
      var isSwiping = false;
      if (this.settings.enableSwipe) {
        this.$inner.on('touchstart.lg', function (e) {
          _this.dragOrSwipeEnabled = true;
          var $item = _this.getSlideItem(_this.index);
          if (($LG(e.target).hasClass('lg-item') || $item.get().contains(e.target)) && !_this.outer.hasClass('lg-zoomed') && !_this.lgBusy && e.targetTouches.length === 1) {
            isSwiping = true;
            _this.touchAction = 'swipe';
            _this.manageSwipeClass();
            startCoords = {
              pageX: e.targetTouches[0].pageX,
              pageY: e.targetTouches[0].pageY
            };
          }
        });
        this.$inner.on('touchmove.lg', function (e) {
          if (isSwiping && _this.touchAction === 'swipe' && e.targetTouches.length === 1) {
            endCoords = {
              pageX: e.targetTouches[0].pageX,
              pageY: e.targetTouches[0].pageY
            };
            _this.touchMove(startCoords, endCoords, e);
            isMoved = true;
          }
        });
        this.$inner.on('touchend.lg', function (event) {
          if (_this.touchAction === 'swipe') {
            if (isMoved) {
              isMoved = false;
              _this.touchEnd(endCoords, startCoords, event);
            } else if (isSwiping) {
              var target = $LG(event.target);
              if (_this.isPosterElement(target)) {
                _this.LGel.trigger(lGEvents.posterClick);
              }
            }
            _this.touchAction = undefined;
            isSwiping = false;
          }
        });
      }
    };
    LightGallery.prototype.enableDrag = function () {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      var isDraging = false;
      var isMoved = false;
      if (this.settings.enableDrag) {
        this.outer.on('mousedown.lg', function (e) {
          _this.dragOrSwipeEnabled = true;
          var $item = _this.getSlideItem(_this.index);
          if ($LG(e.target).hasClass('lg-item') || $item.get().contains(e.target)) {
            if (!_this.outer.hasClass('lg-zoomed') && !_this.lgBusy) {
              e.preventDefault();
              if (!_this.lgBusy) {
                _this.manageSwipeClass();
                startCoords = {
                  pageX: e.pageX,
                  pageY: e.pageY
                };
                isDraging = true;
                // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                _this.outer.get().scrollLeft += 1;
                _this.outer.get().scrollLeft -= 1;
                // *
                _this.outer.removeClass('lg-grab').addClass('lg-grabbing');
                _this.LGel.trigger(lGEvents.dragStart);
              }
            }
          }
        });
        $LG(window).on("mousemove.lg.global" + this.lgId, function (e) {
          if (isDraging && _this.lgOpened) {
            isMoved = true;
            endCoords = {
              pageX: e.pageX,
              pageY: e.pageY
            };
            _this.touchMove(startCoords, endCoords);
            _this.LGel.trigger(lGEvents.dragMove);
          }
        });
        $LG(window).on("mouseup.lg.global" + this.lgId, function (event) {
          if (!_this.lgOpened) {
            return;
          }
          var target = $LG(event.target);
          if (isMoved) {
            isMoved = false;
            _this.touchEnd(endCoords, startCoords, event);
            _this.LGel.trigger(lGEvents.dragEnd);
          } else if (_this.isPosterElement(target)) {
            _this.LGel.trigger(lGEvents.posterClick);
          }
          // Prevent execution on click
          if (isDraging) {
            isDraging = false;
            _this.outer.removeClass('lg-grabbing').addClass('lg-grab');
          }
        });
      }
    };
    LightGallery.prototype.triggerPosterClick = function () {
      var _this = this;
      this.$inner.on('click.lg', function (event) {
        if (!_this.dragOrSwipeEnabled && _this.isPosterElement($LG(event.target))) {
          _this.LGel.trigger(lGEvents.posterClick);
        }
      });
    };
    LightGallery.prototype.manageSwipeClass = function () {
      var _touchNext = this.index + 1;
      var _touchPrev = this.index - 1;
      if (this.settings.loop && this.galleryItems.length > 2) {
        if (this.index === 0) {
          _touchPrev = this.galleryItems.length - 1;
        } else if (this.index === this.galleryItems.length - 1) {
          _touchNext = 0;
        }
      }
      this.outer.find('.lg-item').removeClass('lg-next-slide lg-prev-slide');
      if (_touchPrev > -1) {
        this.getSlideItem(_touchPrev).addClass('lg-prev-slide');
      }
      this.getSlideItem(_touchNext).addClass('lg-next-slide');
    };
    /**
     * Go to next slide
     * @param {Boolean} fromTouch - true if slide function called via touch event
     * @category lGPublicMethods
     * @example
     *  const plugin = lightGallery();
     *  plugin.goToNextSlide();
     * @see <a href="/demos/methods/">Demo</a>
     */
    LightGallery.prototype.goToNextSlide = function (fromTouch) {
      var _this = this;
      var _loop = this.settings.loop;
      if (fromTouch && this.galleryItems.length < 3) {
        _loop = false;
      }
      if (!this.lgBusy) {
        if (this.index + 1 < this.galleryItems.length) {
          this.index++;
          this.LGel.trigger(lGEvents.beforeNextSlide, {
            index: this.index
          });
          this.slide(this.index, !!fromTouch, false, 'next');
        } else {
          if (_loop) {
            this.index = 0;
            this.LGel.trigger(lGEvents.beforeNextSlide, {
              index: this.index
            });
            this.slide(this.index, !!fromTouch, false, 'next');
          } else if (this.settings.slideEndAnimation && !fromTouch) {
            this.outer.addClass('lg-right-end');
            setTimeout(function () {
              _this.outer.removeClass('lg-right-end');
            }, 400);
          }
        }
      }
    };
    /**
     * Go to previous slides
     * @param {Boolean} fromTouch - true if slide function called via touch event
     * @category lGPublicMethods
     * @example
     *  const plugin = lightGallery({});
     *  plugin.goToPrevSlide();
     * @see <a href="/demos/methods/">Demo</a>
     *
     */
    LightGallery.prototype.goToPrevSlide = function (fromTouch) {
      var _this = this;
      var _loop = this.settings.loop;
      if (fromTouch && this.galleryItems.length < 3) {
        _loop = false;
      }
      if (!this.lgBusy) {
        if (this.index > 0) {
          this.index--;
          this.LGel.trigger(lGEvents.beforePrevSlide, {
            index: this.index,
            fromTouch: fromTouch
          });
          this.slide(this.index, !!fromTouch, false, 'prev');
        } else {
          if (_loop) {
            this.index = this.galleryItems.length - 1;
            this.LGel.trigger(lGEvents.beforePrevSlide, {
              index: this.index,
              fromTouch: fromTouch
            });
            this.slide(this.index, !!fromTouch, false, 'prev');
          } else if (this.settings.slideEndAnimation && !fromTouch) {
            this.outer.addClass('lg-left-end');
            setTimeout(function () {
              _this.outer.removeClass('lg-left-end');
            }, 400);
          }
        }
      }
    };
    LightGallery.prototype.keyPress = function () {
      var _this = this;
      $LG(window).on("keydown.lg.global" + this.lgId, function (e) {
        if (_this.lgOpened && _this.settings.escKey === true && e.keyCode === 27) {
          e.preventDefault();
          if (_this.settings.allowMediaOverlap && _this.outer.hasClass('lg-can-toggle') && _this.outer.hasClass('lg-components-open')) {
            _this.outer.removeClass('lg-components-open');
          } else {
            _this.closeGallery();
          }
        }
        if (_this.lgOpened && _this.galleryItems.length > 1) {
          if (e.keyCode === 37) {
            e.preventDefault();
            _this.goToPrevSlide();
          }
          if (e.keyCode === 39) {
            e.preventDefault();
            _this.goToNextSlide();
          }
        }
      });
    };
    LightGallery.prototype.arrow = function () {
      var _this = this;
      this.getElementById('lg-prev').on('click.lg', function () {
        _this.goToPrevSlide();
      });
      this.getElementById('lg-next').on('click.lg', function () {
        _this.goToNextSlide();
      });
    };
    LightGallery.prototype.arrowDisable = function (index) {
      // Disable arrows if settings.hideControlOnEnd is true
      if (!this.settings.loop && this.settings.hideControlOnEnd) {
        var $prev = this.getElementById('lg-prev');
        var $next = this.getElementById('lg-next');
        if (index + 1 === this.galleryItems.length) {
          $next.attr('disabled', 'disabled').addClass('disabled');
        } else {
          $next.removeAttr('disabled').removeClass('disabled');
        }
        if (index === 0) {
          $prev.attr('disabled', 'disabled').addClass('disabled');
        } else {
          $prev.removeAttr('disabled').removeClass('disabled');
        }
      }
    };
    LightGallery.prototype.setTranslate = function ($el, xValue, yValue, scaleX, scaleY) {
      if (scaleX === void 0) {
        scaleX = 1;
      }
      if (scaleY === void 0) {
        scaleY = 1;
      }
      $el.css('transform', 'translate3d(' + xValue + 'px, ' + yValue + 'px, 0px) scale3d(' + scaleX + ', ' + scaleY + ', 1)');
    };
    LightGallery.prototype.mousewheel = function () {
      var _this = this;
      var lastCall = 0;
      this.outer.on('wheel.lg', function (e) {
        if (!e.deltaY || _this.galleryItems.length < 2) {
          return;
        }
        e.preventDefault();
        var now = new Date().getTime();
        if (now - lastCall < 1000) {
          return;
        }
        lastCall = now;
        if (e.deltaY > 0) {
          _this.goToNextSlide();
        } else if (e.deltaY < 0) {
          _this.goToPrevSlide();
        }
      });
    };
    LightGallery.prototype.isSlideElement = function (target) {
      return target.hasClass('lg-outer') || target.hasClass('lg-item') || target.hasClass('lg-img-wrap');
    };
    LightGallery.prototype.isPosterElement = function (target) {
      var playButton = this.getSlideItem(this.index).find('.lg-video-play-button').get();
      return target.hasClass('lg-video-poster') || target.hasClass('lg-video-play-button') || playButton && playButton.contains(target.get());
    };
    /**
     * Maximize minimize inline gallery.
     * @category lGPublicMethods
     */
    LightGallery.prototype.toggleMaximize = function () {
      var _this = this;
      this.getElementById('lg-maximize').on('click.lg', function () {
        _this.$container.toggleClass('lg-inline');
        _this.refreshOnResize();
      });
    };
    LightGallery.prototype.invalidateItems = function () {
      for (var index = 0; index < this.items.length; index++) {
        var element = this.items[index];
        var $element = $LG(element);
        $element.off("click.lgcustom-item-" + $element.attr('data-lg-id'));
      }
    };
    LightGallery.prototype.manageCloseGallery = function () {
      var _this = this;
      if (!this.settings.closable) return;
      var mousedown = false;
      this.getElementById('lg-close').on('click.lg', function () {
        _this.closeGallery();
      });
      if (this.settings.closeOnTap) {
        // If you drag the slide and release outside gallery gets close on chrome
        // for preventing this check mousedown and mouseup happened on .lg-item or lg-outer
        this.outer.on('mousedown.lg', function (e) {
          var target = $LG(e.target);
          if (_this.isSlideElement(target)) {
            mousedown = true;
          } else {
            mousedown = false;
          }
        });
        this.outer.on('mousemove.lg', function () {
          mousedown = false;
        });
        this.outer.on('mouseup.lg', function (e) {
          var target = $LG(e.target);
          if (_this.isSlideElement(target) && mousedown) {
            if (!_this.outer.hasClass('lg-dragging')) {
              _this.closeGallery();
            }
          }
        });
      }
    };
    /**
     * Close lightGallery if it is opened.
     *
     * @description If closable is false in the settings, you need to pass true via closeGallery method to force close gallery
     * @return returns the estimated time to close gallery completely including the close animation duration
     * @category lGPublicMethods
     * @example
     *  const plugin = lightGallery();
     *  plugin.closeGallery();
     *
     */
    LightGallery.prototype.closeGallery = function (force) {
      var _this = this;
      if (!this.lgOpened || !this.settings.closable && !force) {
        return 0;
      }
      this.LGel.trigger(lGEvents.beforeClose);
      $LG(window).scrollTop(this.prevScrollTop);
      var currentItem = this.items[this.index];
      var transform;
      if (this.zoomFromOrigin && currentItem) {
        var _a = this.mediaContainerPosition,
          top_4 = _a.top,
          bottom = _a.bottom;
        var _b = this.galleryItems[this.index],
          __slideVideoInfo = _b.__slideVideoInfo,
          poster = _b.poster;
        var imageSize = utils.getSize(currentItem, this.outer, top_4 + bottom, __slideVideoInfo && poster && this.settings.videoMaxSize);
        transform = utils.getTransform(currentItem, this.outer, top_4, bottom, imageSize);
      }
      if (this.zoomFromOrigin && transform) {
        this.outer.addClass('lg-closing lg-zoom-from-image');
        this.getSlideItem(this.index).addClass('lg-start-end-progress').css('transition-duration', this.settings.startAnimationDuration + 'ms').css('transform', transform);
      } else {
        this.outer.addClass('lg-hide-items');
        // lg-zoom-from-image is used for setting the opacity to 1 if zoomFromOrigin is true
        // If the closing item doesn't have the lg-size attribute, remove this class to avoid the closing css conflicts
        this.outer.removeClass('lg-zoom-from-image');
      }
      // Unbind all events added by lightGallery
      // @todo
      //this.$el.off('.lg.tm');
      this.destroyModules();
      this.lGalleryOn = false;
      this.isDummyImageRemoved = false;
      this.zoomFromOrigin = this.settings.zoomFromOrigin;
      clearTimeout(this.hideBarTimeout);
      this.hideBarTimeout = false;
      $LG('html').removeClass('lg-on');
      this.outer.removeClass('lg-visible lg-components-open');
      // Resetting opacity to 0 isd required as  vertical swipe to close function adds inline opacity.
      this.$backdrop.removeClass('in').css('opacity', 0);
      var removeTimeout = this.zoomFromOrigin && transform ? Math.max(this.settings.startAnimationDuration, this.settings.backdropDuration) : this.settings.backdropDuration;
      this.$container.removeClass('lg-show-in');
      // Once the closign animation is completed and gallery is invisible
      setTimeout(function () {
        if (_this.zoomFromOrigin && transform) {
          _this.outer.removeClass('lg-zoom-from-image');
        }
        _this.$container.removeClass('lg-show');
        // Need to remove inline opacity as it is used in the stylesheet as well
        _this.$backdrop.removeAttr('style').css('transition-duration', _this.settings.backdropDuration + 'ms');
        _this.outer.removeClass("lg-closing " + _this.settings.startClass);
        _this.getSlideItem(_this.index).removeClass('lg-start-end-progress');
        _this.$inner.empty();
        if (_this.lgOpened) {
          _this.LGel.trigger(lGEvents.afterClose, {
            instance: _this
          });
        }
        if (_this.outer.get()) {
          _this.outer.get().blur();
        }
        _this.lgOpened = false;
      }, removeTimeout + 100);
      return removeTimeout + 100;
    };
    LightGallery.prototype.initModules = function () {
      this.plugins.forEach(function (module) {
        try {
          module.init();
        } catch (err) {
          console.warn("lightGallery:- make sure lightGallery module is properly initiated");
        }
      });
    };
    LightGallery.prototype.destroyModules = function (destroy) {
      this.plugins.forEach(function (module) {
        try {
          if (destroy) {
            module.destroy();
          } else {
            module.closeGallery && module.closeGallery();
          }
        } catch (err) {
          console.warn("lightGallery:- make sure lightGallery module is properly destroyed");
        }
      });
    };
    /**
     * Refresh lightGallery with new set of children.
     *
     * @description This is useful to update the gallery when the child elements are changed without calling destroy method.
     *
     * If you are using dynamic mode, you can pass the modified array of dynamicEl as the first parameter to refresh the dynamic gallery
     * @see <a href="/demos/dynamic-mode/">Demo</a>
     * @category lGPublicMethods
     * @example
     *  const plugin = lightGallery();
     *  // Delete or add children, then call
     *  plugin.refresh();
     *
     */
    LightGallery.prototype.refresh = function (galleryItems) {
      if (!this.settings.dynamic) {
        this.invalidateItems();
      }
      if (galleryItems) {
        this.galleryItems = galleryItems;
      } else {
        this.galleryItems = this.getItems();
      }
      this.updateControls();
      this.openGalleryOnItemClick();
      this.LGel.trigger(lGEvents.updateSlides);
    };
    LightGallery.prototype.updateControls = function () {
      this.addSlideVideoInfo(this.galleryItems);
      this.updateCounterTotal();
      this.manageSingleSlideClassName();
    };
    /**
     * Destroy lightGallery.
     * Destroy lightGallery and its plugin instances completely
     *
     * @description This method also calls CloseGallery function internally. Returns the time takes to completely close and destroy the instance.
     * In case if you want to re-initialize lightGallery right after destroying it, initialize it only once the destroy process is completed.
     * You can use refresh method most of the times.
     * @category lGPublicMethods
     * @example
     *  const plugin = lightGallery();
     *  plugin.destroy();
     *
     */
    LightGallery.prototype.destroy = function () {
      var _this = this;
      var closeTimeout = this.closeGallery(true);
      setTimeout(function () {
        _this.destroyModules(true);
        if (!_this.settings.dynamic) {
          _this.invalidateItems();
        }
        $LG(window).off(".lg.global" + _this.lgId);
        _this.LGel.off('.lg');
        _this.$container.remove();
      }, closeTimeout);
      return closeTimeout;
    };
    return LightGallery;
  }();
  function lightGallery(el, options) {
    return new LightGallery(el, options);
  }
  return lightGallery;
});

/*!
 * lightgallery | 2.4.0-beta.0 | December 12th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lgThumbnail = factory());
})(void 0, function () {
  'use strict';

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
    Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  var _assign2 = function __assign() {
    _assign2 = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return _assign2.apply(this, arguments);
  };
  var thumbnailsSettings = {
    thumbnail: true,
    animateThumb: true,
    currentPagerPosition: 'middle',
    alignThumbnails: 'middle',
    thumbWidth: 100,
    thumbHeight: '80px',
    thumbMargin: 5,
    appendThumbnailsTo: '.lg-components',
    toggleThumb: false,
    enableThumbDrag: true,
    enableThumbSwipe: true,
    thumbnailSwipeThreshold: 10,
    loadYouTubeThumbnail: true,
    youTubeThumbSize: 1,
    thumbnailPluginStrings: {
      toggleThumbnails: 'Toggle thumbnails'
    }
  };

  /**
   * List of lightGallery events
   * All events should be documented here
   * Below interfaces are used to build the website documentations
   * */
  var lGEvents = {
    afterAppendSlide: 'lgAfterAppendSlide',
    init: 'lgInit',
    hasVideo: 'lgHasVideo',
    containerResize: 'lgContainerResize',
    updateSlides: 'lgUpdateSlides',
    afterAppendSubHtml: 'lgAfterAppendSubHtml',
    beforeOpen: 'lgBeforeOpen',
    afterOpen: 'lgAfterOpen',
    slideItemLoad: 'lgSlideItemLoad',
    beforeSlide: 'lgBeforeSlide',
    afterSlide: 'lgAfterSlide',
    posterClick: 'lgPosterClick',
    dragStart: 'lgDragStart',
    dragMove: 'lgDragMove',
    dragEnd: 'lgDragEnd',
    beforeNextSlide: 'lgBeforeNextSlide',
    beforePrevSlide: 'lgBeforePrevSlide',
    beforeClose: 'lgBeforeClose',
    afterClose: 'lgAfterClose',
    rotateLeft: 'lgRotateLeft',
    rotateRight: 'lgRotateRight',
    flipHorizontal: 'lgFlipHorizontal',
    flipVertical: 'lgFlipVertical',
    autoplay: 'lgAutoplay',
    autoplayStart: 'lgAutoplayStart',
    autoplayStop: 'lgAutoplayStop'
  };
  var Thumbnail = /** @class */function () {
    function Thumbnail(instance, $LG) {
      this.thumbOuterWidth = 0;
      this.thumbTotalWidth = 0;
      this.translateX = 0;
      this.thumbClickable = false;
      // get lightGallery core plugin instance
      this.core = instance;
      this.$LG = $LG;
      return this;
    }
    Thumbnail.prototype.init = function () {
      // extend module default settings with lightGallery core settings
      this.settings = _assign2(_assign2({}, thumbnailsSettings), this.core.settings);
      this.thumbOuterWidth = 0;
      this.thumbTotalWidth = this.core.galleryItems.length * (this.settings.thumbWidth + this.settings.thumbMargin);
      // Thumbnail animation value
      this.translateX = 0;
      this.setAnimateThumbStyles();
      if (!this.core.settings.allowMediaOverlap) {
        this.settings.toggleThumb = false;
      }
      if (this.settings.thumbnail) {
        this.build();
        if (this.settings.animateThumb) {
          if (this.settings.enableThumbDrag) {
            this.enableThumbDrag();
          }
          if (this.settings.enableThumbSwipe) {
            this.enableThumbSwipe();
          }
          this.thumbClickable = false;
        } else {
          this.thumbClickable = true;
        }
        this.toggleThumbBar();
        this.thumbKeyPress();
      }
    };
    Thumbnail.prototype.build = function () {
      var _this = this;
      this.setThumbMarkup();
      this.manageActiveClassOnSlideChange();
      this.$lgThumb.first().on('click.lg touchend.lg', function (e) {
        var $target = _this.$LG(e.target);
        if (!$target.hasAttribute('data-lg-item-id')) {
          return;
        }
        setTimeout(function () {
          // In IE9 and bellow touch does not support
          // Go to slide if browser does not support css transitions
          if (_this.thumbClickable && !_this.core.lgBusy) {
            var index = parseInt($target.attr('data-lg-item-id'));
            _this.core.slide(index, false, true, false);
          }
        }, 50);
      });
      this.core.LGel.on(lGEvents.beforeSlide + ".thumb", function (event) {
        var index = event.detail.index;
        _this.animateThumb(index);
      });
      this.core.LGel.on(lGEvents.beforeOpen + ".thumb", function () {
        _this.thumbOuterWidth = _this.core.outer.get().offsetWidth;
      });
      this.core.LGel.on(lGEvents.updateSlides + ".thumb", function () {
        _this.rebuildThumbnails();
      });
      this.core.LGel.on(lGEvents.containerResize + ".thumb", function () {
        if (!_this.core.lgOpened) return;
        setTimeout(function () {
          _this.thumbOuterWidth = _this.core.outer.get().offsetWidth;
          _this.animateThumb(_this.core.index);
          _this.thumbOuterWidth = _this.core.outer.get().offsetWidth;
        }, 50);
      });
    };
    Thumbnail.prototype.setThumbMarkup = function () {
      var thumbOuterClassNames = 'lg-thumb-outer ';
      if (this.settings.alignThumbnails) {
        thumbOuterClassNames += "lg-thumb-align-" + this.settings.alignThumbnails;
      }
      var html = "<div class=\"" + thumbOuterClassNames + "\">\n        <div class=\"lg-thumb lg-group\">\n        </div>\n        </div>";
      this.core.outer.addClass('lg-has-thumb');
      if (this.settings.appendThumbnailsTo === '.lg-components') {
        this.core.$lgComponents.append(html);
      } else {
        this.core.outer.append(html);
      }
      this.$thumbOuter = this.core.outer.find('.lg-thumb-outer').first();
      this.$lgThumb = this.core.outer.find('.lg-thumb').first();
      if (this.settings.animateThumb) {
        this.core.outer.find('.lg-thumb').css('transition-duration', this.core.settings.speed + 'ms').css('width', this.thumbTotalWidth + 'px').css('position', 'relative');
      }
      this.setThumbItemHtml(this.core.galleryItems);
    };
    Thumbnail.prototype.enableThumbDrag = function () {
      var _this = this;
      var thumbDragUtils = {
        cords: {
          startX: 0,
          endX: 0
        },
        isMoved: false,
        newTranslateX: 0,
        startTime: new Date(),
        endTime: new Date(),
        touchMoveTime: 0
      };
      var isDragging = false;
      this.$thumbOuter.addClass('lg-grab');
      this.core.outer.find('.lg-thumb').first().on('mousedown.lg.thumb', function (e) {
        if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
          // execute only on .lg-object
          e.preventDefault();
          thumbDragUtils.cords.startX = e.pageX;
          thumbDragUtils.startTime = new Date();
          _this.thumbClickable = false;
          isDragging = true;
          // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
          _this.core.outer.get().scrollLeft += 1;
          _this.core.outer.get().scrollLeft -= 1;
          // *
          _this.$thumbOuter.removeClass('lg-grab').addClass('lg-grabbing');
        }
      });
      this.$LG(window).on("mousemove.lg.thumb.global" + this.core.lgId, function (e) {
        if (!_this.core.lgOpened) return;
        if (isDragging) {
          thumbDragUtils.cords.endX = e.pageX;
          thumbDragUtils = _this.onThumbTouchMove(thumbDragUtils);
        }
      });
      this.$LG(window).on("mouseup.lg.thumb.global" + this.core.lgId, function () {
        if (!_this.core.lgOpened) return;
        if (thumbDragUtils.isMoved) {
          thumbDragUtils = _this.onThumbTouchEnd(thumbDragUtils);
        } else {
          _this.thumbClickable = true;
        }
        if (isDragging) {
          isDragging = false;
          _this.$thumbOuter.removeClass('lg-grabbing').addClass('lg-grab');
        }
      });
    };
    Thumbnail.prototype.enableThumbSwipe = function () {
      var _this = this;
      var thumbDragUtils = {
        cords: {
          startX: 0,
          endX: 0
        },
        isMoved: false,
        newTranslateX: 0,
        startTime: new Date(),
        endTime: new Date(),
        touchMoveTime: 0
      };
      this.$lgThumb.on('touchstart.lg', function (e) {
        if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
          e.preventDefault();
          thumbDragUtils.cords.startX = e.targetTouches[0].pageX;
          _this.thumbClickable = false;
          thumbDragUtils.startTime = new Date();
        }
      });
      this.$lgThumb.on('touchmove.lg', function (e) {
        if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
          e.preventDefault();
          thumbDragUtils.cords.endX = e.targetTouches[0].pageX;
          thumbDragUtils = _this.onThumbTouchMove(thumbDragUtils);
        }
      });
      this.$lgThumb.on('touchend.lg', function () {
        if (thumbDragUtils.isMoved) {
          thumbDragUtils = _this.onThumbTouchEnd(thumbDragUtils);
        } else {
          _this.thumbClickable = true;
        }
      });
    };
    // Rebuild thumbnails
    Thumbnail.prototype.rebuildThumbnails = function () {
      var _this = this;
      // Remove transitions
      this.$thumbOuter.addClass('lg-rebuilding-thumbnails');
      setTimeout(function () {
        _this.thumbTotalWidth = _this.core.galleryItems.length * (_this.settings.thumbWidth + _this.settings.thumbMargin);
        _this.$lgThumb.css('width', _this.thumbTotalWidth + 'px');
        _this.$lgThumb.empty();
        _this.setThumbItemHtml(_this.core.galleryItems);
        _this.animateThumb(_this.core.index);
      }, 50);
      setTimeout(function () {
        _this.$thumbOuter.removeClass('lg-rebuilding-thumbnails');
      }, 200);
    };
    // @ts-check
    Thumbnail.prototype.setTranslate = function (value) {
      this.$lgThumb.css('transform', 'translate3d(-' + value + 'px, 0px, 0px)');
    };
    Thumbnail.prototype.getPossibleTransformX = function (left) {
      if (left > this.thumbTotalWidth - this.thumbOuterWidth) {
        left = this.thumbTotalWidth - this.thumbOuterWidth;
      }
      if (left < 0) {
        left = 0;
      }
      return left;
    };
    Thumbnail.prototype.animateThumb = function (index) {
      this.$lgThumb.css('transition-duration', this.core.settings.speed + 'ms');
      if (this.settings.animateThumb) {
        var position = 0;
        switch (this.settings.currentPagerPosition) {
          case 'left':
            position = 0;
            break;
          case 'middle':
            position = this.thumbOuterWidth / 2 - this.settings.thumbWidth / 2;
            break;
          case 'right':
            position = this.thumbOuterWidth - this.settings.thumbWidth;
        }
        this.translateX = (this.settings.thumbWidth + this.settings.thumbMargin) * index - 1 - position;
        if (this.translateX > this.thumbTotalWidth - this.thumbOuterWidth) {
          this.translateX = this.thumbTotalWidth - this.thumbOuterWidth;
        }
        if (this.translateX < 0) {
          this.translateX = 0;
        }
        this.setTranslate(this.translateX);
      }
    };
    Thumbnail.prototype.onThumbTouchMove = function (thumbDragUtils) {
      thumbDragUtils.newTranslateX = this.translateX;
      thumbDragUtils.isMoved = true;
      thumbDragUtils.touchMoveTime = new Date().valueOf();
      thumbDragUtils.newTranslateX -= thumbDragUtils.cords.endX - thumbDragUtils.cords.startX;
      thumbDragUtils.newTranslateX = this.getPossibleTransformX(thumbDragUtils.newTranslateX);
      // move current slide
      this.setTranslate(thumbDragUtils.newTranslateX);
      this.$thumbOuter.addClass('lg-dragging');
      return thumbDragUtils;
    };
    Thumbnail.prototype.onThumbTouchEnd = function (thumbDragUtils) {
      thumbDragUtils.isMoved = false;
      thumbDragUtils.endTime = new Date();
      this.$thumbOuter.removeClass('lg-dragging');
      var touchDuration = thumbDragUtils.endTime.valueOf() - thumbDragUtils.startTime.valueOf();
      var distanceXnew = thumbDragUtils.cords.endX - thumbDragUtils.cords.startX;
      var speedX = Math.abs(distanceXnew) / touchDuration;
      // Some magical numbers
      // Can be improved
      if (speedX > 0.15 && thumbDragUtils.endTime.valueOf() - thumbDragUtils.touchMoveTime < 30) {
        speedX += 1;
        if (speedX > 2) {
          speedX += 1;
        }
        speedX = speedX + speedX * (Math.abs(distanceXnew) / this.thumbOuterWidth);
        this.$lgThumb.css('transition-duration', Math.min(speedX - 1, 2) + 'settings');
        distanceXnew = distanceXnew * speedX;
        this.translateX = this.getPossibleTransformX(this.translateX - distanceXnew);
        this.setTranslate(this.translateX);
      } else {
        this.translateX = thumbDragUtils.newTranslateX;
      }
      if (Math.abs(thumbDragUtils.cords.endX - thumbDragUtils.cords.startX) < this.settings.thumbnailSwipeThreshold) {
        this.thumbClickable = true;
      }
      return thumbDragUtils;
    };
    Thumbnail.prototype.getThumbHtml = function (thumb, index) {
      var slideVideoInfo = this.core.galleryItems[index].__slideVideoInfo || {};
      var thumbImg;
      if (slideVideoInfo.youtube) {
        if (this.settings.loadYouTubeThumbnail) {
          thumbImg = '//img.youtube.com/vi/' + slideVideoInfo.youtube[1] + '/' + this.settings.youTubeThumbSize + '.jpg';
        } else {
          thumbImg = thumb;
        }
      } else {
        thumbImg = thumb;
      }
      return "<div data-lg-item-id=\"" + index + "\" class=\"lg-thumb-item " + (index === this.core.index ? ' active' : '') + "\" \n        style=\"width:" + this.settings.thumbWidth + "px; height: " + this.settings.thumbHeight + ";\n            margin-right: " + this.settings.thumbMargin + "px;\">\n            <img data-lg-item-id=\"" + index + "\" src=\"" + thumbImg + "\" />\n        </div>";
    };
    Thumbnail.prototype.getThumbItemHtml = function (items) {
      var thumbList = '';
      for (var i = 0; i < items.length; i++) {
        thumbList += this.getThumbHtml(items[i].thumb, i);
      }
      return thumbList;
    };
    Thumbnail.prototype.setThumbItemHtml = function (items) {
      var thumbList = this.getThumbItemHtml(items);
      this.$lgThumb.html(thumbList);
    };
    Thumbnail.prototype.setAnimateThumbStyles = function () {
      if (this.settings.animateThumb) {
        this.core.outer.addClass('lg-animate-thumb');
      }
    };
    // Manage thumbnail active calss
    Thumbnail.prototype.manageActiveClassOnSlideChange = function () {
      var _this = this;
      // manage active class for thumbnail
      this.core.LGel.on(lGEvents.beforeSlide + ".thumb", function (event) {
        var $thumb = _this.core.outer.find('.lg-thumb-item');
        var index = event.detail.index;
        $thumb.removeClass('active');
        $thumb.eq(index).addClass('active');
      });
    };
    // Toggle thumbnail bar
    Thumbnail.prototype.toggleThumbBar = function () {
      var _this = this;
      if (this.settings.toggleThumb) {
        this.core.outer.addClass('lg-can-toggle');
        this.core.$toolbar.append('<button type="button" aria-label="' + this.settings.thumbnailPluginStrings['toggleThumbnails'] + '" class="lg-toggle-thumb lg-icon"></button>');
        this.core.outer.find('.lg-toggle-thumb').first().on('click.lg', function () {
          _this.core.outer.toggleClass('lg-components-open');
        });
      }
    };
    Thumbnail.prototype.thumbKeyPress = function () {
      var _this = this;
      this.$LG(window).on("keydown.lg.thumb.global" + this.core.lgId, function (e) {
        if (!_this.core.lgOpened || !_this.settings.toggleThumb) return;
        if (e.keyCode === 38) {
          e.preventDefault();
          _this.core.outer.addClass('lg-components-open');
        } else if (e.keyCode === 40) {
          e.preventDefault();
          _this.core.outer.removeClass('lg-components-open');
        }
      });
    };
    Thumbnail.prototype.destroy = function () {
      if (this.settings.thumbnail) {
        this.$LG(window).off(".lg.thumb.global" + this.core.lgId);
        this.core.LGel.off('.lg.thumb');
        this.core.LGel.off('.thumb');
        this.$thumbOuter.remove();
        this.core.outer.removeClass('lg-has-thumb');
      }
    };
    return Thumbnail;
  }();
  return Thumbnail;
});

/*!
 * lightgallery | 2.4.0-beta.0 | December 12th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lgZoom = factory());
})(void 0, function () {
  'use strict';

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
    Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  var _assign3 = function __assign() {
    _assign3 = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return _assign3.apply(this, arguments);
  };
  var zoomSettings = {
    scale: 1,
    zoom: true,
    actualSize: true,
    showZoomInOutIcons: false,
    actualSizeIcons: {
      zoomIn: 'lg-zoom-in',
      zoomOut: 'lg-zoom-out'
    },
    enableZoomAfter: 300,
    zoomPluginStrings: {
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      viewActualSize: 'View actual size'
    }
  };

  /**
   * List of lightGallery events
   * All events should be documented here
   * Below interfaces are used to build the website documentations
   * */
  var lGEvents = {
    afterAppendSlide: 'lgAfterAppendSlide',
    init: 'lgInit',
    hasVideo: 'lgHasVideo',
    containerResize: 'lgContainerResize',
    updateSlides: 'lgUpdateSlides',
    afterAppendSubHtml: 'lgAfterAppendSubHtml',
    beforeOpen: 'lgBeforeOpen',
    afterOpen: 'lgAfterOpen',
    slideItemLoad: 'lgSlideItemLoad',
    beforeSlide: 'lgBeforeSlide',
    afterSlide: 'lgAfterSlide',
    posterClick: 'lgPosterClick',
    dragStart: 'lgDragStart',
    dragMove: 'lgDragMove',
    dragEnd: 'lgDragEnd',
    beforeNextSlide: 'lgBeforeNextSlide',
    beforePrevSlide: 'lgBeforePrevSlide',
    beforeClose: 'lgBeforeClose',
    afterClose: 'lgAfterClose',
    rotateLeft: 'lgRotateLeft',
    rotateRight: 'lgRotateRight',
    flipHorizontal: 'lgFlipHorizontal',
    flipVertical: 'lgFlipVertical',
    autoplay: 'lgAutoplay',
    autoplayStart: 'lgAutoplayStart',
    autoplayStop: 'lgAutoplayStop'
  };
  var Zoom = /** @class */function () {
    function Zoom(instance, $LG) {
      // get lightGallery core plugin instance
      this.core = instance;
      this.$LG = $LG;
      this.settings = _assign3(_assign3({}, zoomSettings), this.core.settings);
      return this;
    }
    // Append Zoom controls. Actual size, Zoom-in, Zoom-out
    Zoom.prototype.buildTemplates = function () {
      var zoomIcons = this.settings.showZoomInOutIcons ? "<button id=\"" + this.core.getIdName('lg-zoom-in') + "\" type=\"button\" aria-label=\"" + this.settings.zoomPluginStrings['zoomIn'] + "\" class=\"lg-zoom-in lg-icon\"></button><button id=\"" + this.core.getIdName('lg-zoom-out') + "\" type=\"button\" aria-label=\"" + this.settings.zoomPluginStrings['zoomIn'] + "\" class=\"lg-zoom-out lg-icon\"></button>" : '';
      if (this.settings.actualSize) {
        zoomIcons += "<button id=\"" + this.core.getIdName('lg-actual-size') + "\" type=\"button\" aria-label=\"" + this.settings.zoomPluginStrings['viewActualSize'] + "\" class=\"" + this.settings.actualSizeIcons.zoomIn + " lg-icon\"></button>";
      }
      this.core.outer.addClass('lg-use-transition-for-zoom');
      this.core.$toolbar.first().append(zoomIcons);
    };
    /**
     * @desc Enable zoom option only once the image is completely loaded
     * If zoomFromOrigin is true, Zoom is enabled once the dummy image has been inserted
     *
     * Zoom styles are defined under lg-zoomable CSS class.
     */
    Zoom.prototype.enableZoom = function (event) {
      var _this = this;
      // delay will be 0 except first time
      var _speed = this.settings.enableZoomAfter + event.detail.delay;
      // set _speed value 0 if gallery opened from direct url and if it is first slide
      if (this.$LG('body').first().hasClass('lg-from-hash') && event.detail.delay) {
        // will execute only once
        _speed = 0;
      } else {
        // Remove lg-from-hash to enable starting animation.
        this.$LG('body').first().removeClass('lg-from-hash');
      }
      this.zoomableTimeout = setTimeout(function () {
        if (!_this.isImageSlide()) {
          return;
        }
        _this.core.getSlideItem(event.detail.index).addClass('lg-zoomable');
        if (event.detail.index === _this.core.index) {
          _this.setZoomEssentials();
        }
      }, _speed + 30);
    };
    Zoom.prototype.enableZoomOnSlideItemLoad = function () {
      // Add zoomable class
      this.core.LGel.on(lGEvents.slideItemLoad + ".zoom", this.enableZoom.bind(this));
    };
    Zoom.prototype.getModifier = function (rotateValue, axis, el) {
      var originalRotate = rotateValue;
      rotateValue = Math.abs(rotateValue);
      var transformValues = this.getCurrentTransform(el);
      if (!transformValues) {
        return 1;
      }
      var modifier = 1;
      if (axis === 'X') {
        var flipHorizontalValue = Math.sign(parseFloat(transformValues[0]));
        if (rotateValue === 0 || rotateValue === 180) {
          modifier = 1;
        } else if (rotateValue === 90) {
          if (originalRotate === -90 && flipHorizontalValue === 1 || originalRotate === 90 && flipHorizontalValue === -1) {
            modifier = -1;
          } else {
            modifier = 1;
          }
        }
        modifier = modifier * flipHorizontalValue;
      } else {
        var flipVerticalValue = Math.sign(parseFloat(transformValues[3]));
        if (rotateValue === 0 || rotateValue === 180) {
          modifier = 1;
        } else if (rotateValue === 90) {
          var sinX = parseFloat(transformValues[1]);
          var sinMinusX = parseFloat(transformValues[2]);
          modifier = Math.sign(sinX * sinMinusX * originalRotate * flipVerticalValue);
        }
        modifier = modifier * flipVerticalValue;
      }
      return modifier;
    };
    Zoom.prototype.getImageSize = function ($image, rotateValue, axis) {
      var imageSizes = {
        y: 'offsetHeight',
        x: 'offsetWidth'
      };
      if (Math.abs(rotateValue) === 90) {
        // Swap axis
        if (axis === 'x') {
          axis = 'y';
        } else {
          axis = 'x';
        }
      }
      return $image[imageSizes[axis]];
    };
    Zoom.prototype.getDragCords = function (e, rotateValue) {
      if (rotateValue === 90) {
        return {
          x: e.pageY,
          y: e.pageX
        };
      } else {
        return {
          x: e.pageX,
          y: e.pageY
        };
      }
    };
    Zoom.prototype.getSwipeCords = function (e, rotateValue) {
      var x = e.targetTouches[0].pageX;
      var y = e.targetTouches[0].pageY;
      if (rotateValue === 90) {
        return {
          x: y,
          y: x
        };
      } else {
        return {
          x: x,
          y: y
        };
      }
    };
    Zoom.prototype.getDragAllowedAxises = function (rotateValue, scale) {
      scale = scale || this.scale || 1;
      var allowY = this.imageYSize * scale > this.containerRect.height;
      var allowX = this.imageXSize * scale > this.containerRect.width;
      if (rotateValue === 90) {
        return {
          allowX: allowY,
          allowY: allowX
        };
      } else {
        return {
          allowX: allowX,
          allowY: allowY
        };
      }
    };
    /**
     *
     * @param {Element} el
     * @return matrix(cos(X), sin(X), -sin(X), cos(X), 0, 0);
     * Get the current transform value
     */
    Zoom.prototype.getCurrentTransform = function (el) {
      if (!el) {
        return;
      }
      var st = window.getComputedStyle(el, null);
      var tm = st.getPropertyValue('-webkit-transform') || st.getPropertyValue('-moz-transform') || st.getPropertyValue('-ms-transform') || st.getPropertyValue('-o-transform') || st.getPropertyValue('transform') || 'none';
      if (tm !== 'none') {
        return tm.split('(')[1].split(')')[0].split(',');
      }
      return;
    };
    Zoom.prototype.getCurrentRotation = function (el) {
      if (!el) {
        return 0;
      }
      var values = this.getCurrentTransform(el);
      if (values) {
        return Math.round(Math.atan2(parseFloat(values[1]), parseFloat(values[0])) * (180 / Math.PI));
        // If you want rotate in 360
        //return (angle < 0 ? angle + 360 : angle);
      }

      return 0;
    };
    Zoom.prototype.setZoomEssentials = function () {
      var $image = this.core.getSlideItem(this.core.index).find('.lg-image').first();
      var rotateEl = this.core.getSlideItem(this.core.index).find('.lg-img-rotate').first().get();
      this.rotateValue = this.getCurrentRotation(rotateEl);
      this.imageYSize = this.getImageSize($image.get(), this.rotateValue, 'y');
      this.imageXSize = this.getImageSize($image.get(), this.rotateValue, 'x');
      this.containerRect = this.core.outer.get().getBoundingClientRect();
      this.modifierX = this.getModifier(this.rotateValue, 'X', rotateEl);
      this.modifierY = this.getModifier(this.rotateValue, 'Y', rotateEl);
    };
    /**
     * @desc Image zoom
     * Translate the wrap and scale the image to get better user experience
     *
     * @param {String} scale - Zoom decrement/increment value
     */
    Zoom.prototype.zoomImage = function (scale) {
      // Find offset manually to avoid issue after zoom
      var offsetX = (this.containerRect.width - this.imageXSize) / 2 + this.containerRect.left;
      var _a = this.core.mediaContainerPosition,
        top = _a.top,
        bottom = _a.bottom;
      var topBottomSpacing = Math.abs(top - bottom) / 2;
      var offsetY = (this.containerRect.height - this.imageYSize - topBottomSpacing * this.modifierX) / 2 + this.scrollTop + this.containerRect.top;
      var originalX;
      var originalY;
      if (scale === 1) {
        this.positionChanged = false;
      }
      var dragAllowedAxises = this.getDragAllowedAxises(Math.abs(this.rotateValue), scale);
      var allowY = dragAllowedAxises.allowY,
        allowX = dragAllowedAxises.allowX;
      if (this.positionChanged) {
        originalX = this.left / (this.scale - 1);
        originalY = this.top / (this.scale - 1);
        this.pageX = Math.abs(originalX) + offsetX;
        this.pageY = Math.abs(originalY) + offsetY;
        this.positionChanged = false;
      }
      var possibleSwipeCords = this.getPossibleSwipeDragCords(this.rotateValue, scale);
      var _x = offsetX - this.pageX;
      var _y = offsetY - this.pageY;
      var x = (scale - 1) * _x;
      var y = (scale - 1) * _y;
      if (allowX) {
        if (this.isBeyondPossibleLeft(x, possibleSwipeCords.minX)) {
          x = possibleSwipeCords.minX;
        } else if (this.isBeyondPossibleRight(x, possibleSwipeCords.maxX)) {
          x = possibleSwipeCords.maxX;
        }
      } else {
        if (scale > 1) {
          if (x < possibleSwipeCords.minX) {
            x = possibleSwipeCords.minX;
          } else if (x > possibleSwipeCords.maxX) {
            x = possibleSwipeCords.maxX;
          }
        }
      }
      if (allowY) {
        if (this.isBeyondPossibleTop(y, possibleSwipeCords.minY)) {
          y = possibleSwipeCords.minY;
        } else if (this.isBeyondPossibleBottom(y, possibleSwipeCords.maxY)) {
          y = possibleSwipeCords.maxY;
        }
      } else {
        // If the translate value based on index of beyond the viewport, utilize the available space to prevent image being cut out
        if (scale > 1) {
          //If image goes beyond viewport top, use the minim possible translate value
          if (y < possibleSwipeCords.minY) {
            y = possibleSwipeCords.minY;
          } else if (y > possibleSwipeCords.maxY) {
            y = possibleSwipeCords.maxY;
          }
        }
      }
      this.setZoomStyles({
        x: x,
        y: y,
        scale: scale
      });
    };
    /**
     * @desc apply scale3d to image and translate to image wrap
     * @param {style} X,Y and scale
     */
    Zoom.prototype.setZoomStyles = function (style) {
      var $image = this.core.getSlideItem(this.core.index).find('.lg-image').first();
      var $dummyImage = this.core.outer.find('.lg-current .lg-dummy-img').first();
      var $imageWrap = $image.parent();
      this.scale = style.scale;
      $image.css('transform', 'scale3d(' + style.scale + ', ' + style.scale + ', 1)');
      $dummyImage.css('transform', 'scale3d(' + style.scale + ', ' + style.scale + ', 1)');
      var transform = 'translate3d(' + style.x + 'px, ' + style.y + 'px, 0)';
      $imageWrap.css('transform', transform);
      this.left = style.x;
      this.top = style.y;
    };
    /**
     * @param index - Index of the current slide
     * @param event - event will be available only if the function is called on clicking/taping the imags
     */
    Zoom.prototype.setActualSize = function (index, event) {
      var _this = this;
      // Allow zoom only on image
      if (!this.isImageSlide() || this.core.outer.hasClass('lg-first-slide-loading')) {
        return;
      }
      var scale = this.getCurrentImageActualSizeScale();
      if (this.core.outer.hasClass('lg-zoomed')) {
        this.scale = 1;
      } else {
        this.scale = this.getScale(scale);
      }
      this.setPageCords(event);
      this.beginZoom(this.scale);
      this.zoomImage(this.scale);
      setTimeout(function () {
        _this.core.outer.removeClass('lg-grabbing').addClass('lg-grab');
      }, 10);
    };
    Zoom.prototype.getNaturalWidth = function (index) {
      var $image = this.core.getSlideItem(index).find('.lg-image').first();
      var naturalWidth = this.core.galleryItems[index].width;
      return naturalWidth ? parseFloat(naturalWidth) : $image.get().naturalWidth;
    };
    Zoom.prototype.getActualSizeScale = function (naturalWidth, width) {
      var _scale;
      var scale;
      if (naturalWidth > width) {
        _scale = naturalWidth / width;
        scale = _scale || 2;
      } else {
        scale = 1;
      }
      return scale;
    };
    Zoom.prototype.getCurrentImageActualSizeScale = function () {
      var $image = this.core.getSlideItem(this.core.index).find('.lg-image').first();
      var width = $image.get().offsetWidth;
      var naturalWidth = this.getNaturalWidth(this.core.index) || width;
      return this.getActualSizeScale(naturalWidth, width);
    };
    Zoom.prototype.getPageCords = function (event) {
      var cords = {};
      if (event) {
        cords.x = event.pageX || event.targetTouches[0].pageX;
        cords.y = event.pageY || event.targetTouches[0].pageY;
      } else {
        var containerRect = this.core.outer.get().getBoundingClientRect();
        cords.x = containerRect.width / 2 + containerRect.left;
        cords.y = containerRect.height / 2 + this.scrollTop + containerRect.top;
      }
      return cords;
    };
    Zoom.prototype.setPageCords = function (event) {
      var pageCords = this.getPageCords(event);
      this.pageX = pageCords.x;
      this.pageY = pageCords.y;
    };
    // If true, zoomed - in else zoomed out
    Zoom.prototype.beginZoom = function (scale) {
      this.core.outer.removeClass('lg-zoom-drag-transition lg-zoom-dragging');
      if (scale > 1) {
        this.core.outer.addClass('lg-zoomed');
        var $actualSize = this.core.getElementById('lg-actual-size');
        $actualSize.removeClass(this.settings.actualSizeIcons.zoomIn).addClass(this.settings.actualSizeIcons.zoomOut);
      } else {
        this.resetZoom();
      }
      return scale > 1;
    };
    Zoom.prototype.getScale = function (scale) {
      var actualSizeScale = this.getCurrentImageActualSizeScale();
      if (scale < 1) {
        scale = 1;
      } else if (scale > actualSizeScale) {
        scale = actualSizeScale;
      }
      return scale;
    };
    Zoom.prototype.init = function () {
      var _this = this;
      if (!this.settings.zoom) {
        return;
      }
      this.buildTemplates();
      this.enableZoomOnSlideItemLoad();
      var tapped = null;
      this.core.outer.on('dblclick.lg', function (event) {
        if (!_this.$LG(event.target).hasClass('lg-image')) {
          return;
        }
        _this.setActualSize(_this.core.index, event);
      });
      this.core.outer.on('touchstart.lg', function (event) {
        var $target = _this.$LG(event.target);
        if (event.targetTouches.length === 1 && $target.hasClass('lg-image')) {
          if (!tapped) {
            tapped = setTimeout(function () {
              tapped = null;
            }, 300);
          } else {
            clearTimeout(tapped);
            tapped = null;
            event.preventDefault();
            _this.setActualSize(_this.core.index, event);
          }
        }
      });
      // Update zoom on resize and orientationchange
      this.core.LGel.on(lGEvents.containerResize + ".zoom " + lGEvents.rotateRight + ".zoom " + lGEvents.rotateLeft + ".zoom " + lGEvents.flipHorizontal + ".zoom " + lGEvents.flipVertical + ".zoom", function () {
        if (!_this.core.lgOpened || !_this.isImageSlide()) return;
        _this.setPageCords();
        _this.setZoomEssentials();
        _this.zoomImage(_this.scale);
      });
      // Update zoom on resize and orientationchange
      this.$LG(window).on("scroll.lg.zoom.global" + this.core.lgId, function () {
        if (!_this.core.lgOpened) return;
        _this.scrollTop = _this.$LG(window).scrollTop();
      });
      this.core.getElementById('lg-zoom-out').on('click.lg', function () {
        if (_this.core.outer.find('.lg-current .lg-image').get()) {
          _this.scale -= _this.settings.scale;
          _this.scale = _this.getScale(_this.scale);
          _this.beginZoom(_this.scale);
          _this.zoomImage(_this.scale);
        }
      });
      this.core.getElementById('lg-zoom-in').on('click.lg', function () {
        _this.zoomIn();
      });
      this.core.getElementById('lg-actual-size').on('click.lg', function () {
        _this.setActualSize(_this.core.index);
      });
      this.core.LGel.on(lGEvents.beforeOpen + ".zoom", function () {
        _this.core.outer.find('.lg-item').removeClass('lg-zoomable');
      });
      this.core.LGel.on(lGEvents.afterOpen + ".zoom", function () {
        _this.scrollTop = _this.$LG(window).scrollTop();
        // Set the initial value center
        _this.pageX = _this.core.outer.width() / 2;
        _this.pageY = _this.core.outer.height() / 2 + _this.scrollTop;
        _this.scale = 1;
      });
      // Reset zoom on slide change
      this.core.LGel.on(lGEvents.afterSlide + ".zoom", function (event) {
        var prevIndex = event.detail.prevIndex;
        _this.scale = 1;
        _this.positionChanged = false;
        _this.resetZoom(prevIndex);
        if (_this.isImageSlide()) {
          _this.setZoomEssentials();
        }
      });
      // Drag option after zoom
      this.zoomDrag();
      this.pinchZoom();
      this.zoomSwipe();
      // Store the zoomable timeout value just to clear it while closing
      this.zoomableTimeout = false;
      this.positionChanged = false;
    };
    Zoom.prototype.zoomIn = function (scale) {
      // Allow zoom only on image
      if (!this.isImageSlide()) {
        return;
      }
      if (scale) {
        this.scale = scale;
      } else {
        this.scale += this.settings.scale;
      }
      this.scale = this.getScale(this.scale);
      this.beginZoom(this.scale);
      this.zoomImage(this.scale);
    };
    // Reset zoom effect
    Zoom.prototype.resetZoom = function (index) {
      this.core.outer.removeClass('lg-zoomed lg-zoom-drag-transition');
      var $actualSize = this.core.getElementById('lg-actual-size');
      var $item = this.core.getSlideItem(index !== undefined ? index : this.core.index);
      $actualSize.removeClass(this.settings.actualSizeIcons.zoomOut).addClass(this.settings.actualSizeIcons.zoomIn);
      $item.find('.lg-img-wrap').first().removeAttr('style');
      $item.find('.lg-image').first().removeAttr('style');
      this.scale = 1;
      this.left = 0;
      this.top = 0;
      // Reset pagx pagy values to center
      this.setPageCords();
    };
    Zoom.prototype.getTouchDistance = function (e) {
      return Math.sqrt((e.targetTouches[0].pageX - e.targetTouches[1].pageX) * (e.targetTouches[0].pageX - e.targetTouches[1].pageX) + (e.targetTouches[0].pageY - e.targetTouches[1].pageY) * (e.targetTouches[0].pageY - e.targetTouches[1].pageY));
    };
    Zoom.prototype.pinchZoom = function () {
      var _this = this;
      var startDist = 0;
      var pinchStarted = false;
      var initScale = 1;
      var $item = this.core.getSlideItem(this.core.index);
      this.core.$inner.on('touchstart.lg', function (e) {
        $item = _this.core.getSlideItem(_this.core.index);
        if (!_this.isImageSlide()) {
          return;
        }
        if (e.targetTouches.length === 2 && !_this.core.outer.hasClass('lg-first-slide-loading') && (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target))) {
          initScale = _this.scale || 1;
          _this.core.outer.removeClass('lg-zoom-drag-transition lg-zoom-dragging');
          _this.core.touchAction = 'pinch';
          startDist = _this.getTouchDistance(e);
        }
      });
      this.core.$inner.on('touchmove.lg', function (e) {
        if (e.targetTouches.length === 2 && _this.core.touchAction === 'pinch' && (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target))) {
          e.preventDefault();
          var endDist = _this.getTouchDistance(e);
          var distance = startDist - endDist;
          if (!pinchStarted && Math.abs(distance) > 5) {
            pinchStarted = true;
          }
          if (pinchStarted) {
            _this.scale = Math.max(1, initScale + -distance * 0.008);
            _this.zoomImage(_this.scale);
          }
        }
      });
      this.core.$inner.on('touchend.lg', function (e) {
        if (_this.core.touchAction === 'pinch' && (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target))) {
          pinchStarted = false;
          startDist = 0;
          if (_this.scale <= 1) {
            _this.resetZoom();
          } else {
            _this.scale = _this.getScale(_this.scale);
            _this.zoomImage(_this.scale);
            _this.core.outer.addClass('lg-zoomed');
          }
          _this.core.touchAction = undefined;
        }
      });
    };
    Zoom.prototype.touchendZoom = function (startCoords, endCoords, allowX, allowY, touchDuration, rotateValue) {
      var distanceXnew = endCoords.x - startCoords.x;
      var distanceYnew = endCoords.y - startCoords.y;
      var speedX = Math.abs(distanceXnew) / touchDuration + 1;
      var speedY = Math.abs(distanceYnew) / touchDuration + 1;
      if (speedX > 2) {
        speedX += 1;
      }
      if (speedY > 2) {
        speedY += 1;
      }
      distanceXnew = distanceXnew * speedX;
      distanceYnew = distanceYnew * speedY;
      var _LGel = this.core.getSlideItem(this.core.index).find('.lg-img-wrap').first();
      var distance = {};
      distance.x = this.left + distanceXnew * this.modifierX;
      distance.y = this.top + distanceYnew * this.modifierY;
      var possibleSwipeCords = this.getPossibleSwipeDragCords(rotateValue);
      if (Math.abs(distanceXnew) > 15 || Math.abs(distanceYnew) > 15) {
        if (allowY) {
          if (this.isBeyondPossibleTop(distance.y, possibleSwipeCords.minY)) {
            distance.y = possibleSwipeCords.minY;
          } else if (this.isBeyondPossibleBottom(distance.y, possibleSwipeCords.maxY)) {
            distance.y = possibleSwipeCords.maxY;
          }
        }
        if (allowX) {
          if (this.isBeyondPossibleLeft(distance.x, possibleSwipeCords.minX)) {
            distance.x = possibleSwipeCords.minX;
          } else if (this.isBeyondPossibleRight(distance.x, possibleSwipeCords.maxX)) {
            distance.x = possibleSwipeCords.maxX;
          }
        }
        if (allowY) {
          this.top = distance.y;
        } else {
          distance.y = this.top;
        }
        if (allowX) {
          this.left = distance.x;
        } else {
          distance.x = this.left;
        }
        this.setZoomSwipeStyles(_LGel, distance);
        this.positionChanged = true;
      }
    };
    Zoom.prototype.getZoomSwipeCords = function (startCoords, endCoords, allowX, allowY, possibleSwipeCords) {
      var distance = {};
      if (allowY) {
        distance.y = this.top + (endCoords.y - startCoords.y) * this.modifierY;
        if (this.isBeyondPossibleTop(distance.y, possibleSwipeCords.minY)) {
          var diffMinY = possibleSwipeCords.minY - distance.y;
          distance.y = possibleSwipeCords.minY - diffMinY / 6;
        } else if (this.isBeyondPossibleBottom(distance.y, possibleSwipeCords.maxY)) {
          var diffMaxY = distance.y - possibleSwipeCords.maxY;
          distance.y = possibleSwipeCords.maxY + diffMaxY / 6;
        }
      } else {
        distance.y = this.top;
      }
      if (allowX) {
        distance.x = this.left + (endCoords.x - startCoords.x) * this.modifierX;
        if (this.isBeyondPossibleLeft(distance.x, possibleSwipeCords.minX)) {
          var diffMinX = possibleSwipeCords.minX - distance.x;
          distance.x = possibleSwipeCords.minX - diffMinX / 6;
        } else if (this.isBeyondPossibleRight(distance.x, possibleSwipeCords.maxX)) {
          var difMaxX = distance.x - possibleSwipeCords.maxX;
          distance.x = possibleSwipeCords.maxX + difMaxX / 6;
        }
      } else {
        distance.x = this.left;
      }
      return distance;
    };
    Zoom.prototype.isBeyondPossibleLeft = function (x, minX) {
      return x >= minX;
    };
    Zoom.prototype.isBeyondPossibleRight = function (x, maxX) {
      return x <= maxX;
    };
    Zoom.prototype.isBeyondPossibleTop = function (y, minY) {
      return y >= minY;
    };
    Zoom.prototype.isBeyondPossibleBottom = function (y, maxY) {
      return y <= maxY;
    };
    Zoom.prototype.isImageSlide = function () {
      var currentItem = this.core.galleryItems[this.core.index];
      return this.core.getSlideType(currentItem) === 'image';
    };
    Zoom.prototype.getPossibleSwipeDragCords = function (rotateValue, scale) {
      var dataScale = scale || this.scale || 1;
      var elDataScale = Math.abs(dataScale);
      var _a = this.core.mediaContainerPosition,
        top = _a.top,
        bottom = _a.bottom;
      var topBottomSpacing = Math.abs(top - bottom) / 2;
      var minY = (this.imageYSize - this.containerRect.height) / 2 + topBottomSpacing * this.modifierX;
      var maxY = this.containerRect.height - this.imageYSize * elDataScale + minY;
      var minX = (this.imageXSize - this.containerRect.width) / 2;
      var maxX = this.containerRect.width - this.imageXSize * elDataScale + minX;
      var possibleSwipeCords = {
        minY: minY,
        maxY: maxY,
        minX: minX,
        maxX: maxX
      };
      if (Math.abs(rotateValue) === 90) {
        possibleSwipeCords = {
          minY: minX,
          maxY: maxX,
          minX: minY,
          maxX: maxY
        };
      }
      return possibleSwipeCords;
    };
    Zoom.prototype.setZoomSwipeStyles = function (LGel, distance) {
      LGel.css('transform', 'translate3d(' + distance.x + 'px, ' + distance.y + 'px, 0)');
    };
    Zoom.prototype.zoomSwipe = function () {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      var isMoved = false;
      // Allow x direction drag
      var allowX = false;
      // Allow Y direction drag
      var allowY = false;
      var startTime = new Date();
      var endTime = new Date();
      var possibleSwipeCords;
      var _LGel;
      var $item = this.core.getSlideItem(this.core.index);
      this.core.$inner.on('touchstart.lg', function (e) {
        // Allow zoom only on image
        if (!_this.isImageSlide()) {
          return;
        }
        $item = _this.core.getSlideItem(_this.core.index);
        if ((_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target)) && e.targetTouches.length === 1 && _this.core.outer.hasClass('lg-zoomed')) {
          e.preventDefault();
          startTime = new Date();
          _this.core.touchAction = 'zoomSwipe';
          _LGel = _this.core.getSlideItem(_this.core.index).find('.lg-img-wrap').first();
          var dragAllowedAxises = _this.getDragAllowedAxises(Math.abs(_this.rotateValue));
          allowY = dragAllowedAxises.allowY;
          allowX = dragAllowedAxises.allowX;
          if (allowX || allowY) {
            startCoords = _this.getSwipeCords(e, Math.abs(_this.rotateValue));
          }
          possibleSwipeCords = _this.getPossibleSwipeDragCords(_this.rotateValue);
          // reset opacity and transition duration
          _this.core.outer.addClass('lg-zoom-dragging lg-zoom-drag-transition');
        }
      });
      this.core.$inner.on('touchmove.lg', function (e) {
        if (e.targetTouches.length === 1 && _this.core.touchAction === 'zoomSwipe' && (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target))) {
          e.preventDefault();
          _this.core.touchAction = 'zoomSwipe';
          endCoords = _this.getSwipeCords(e, Math.abs(_this.rotateValue));
          var distance = _this.getZoomSwipeCords(startCoords, endCoords, allowX, allowY, possibleSwipeCords);
          if (Math.abs(endCoords.x - startCoords.x) > 15 || Math.abs(endCoords.y - startCoords.y) > 15) {
            isMoved = true;
            _this.setZoomSwipeStyles(_LGel, distance);
          }
        }
      });
      this.core.$inner.on('touchend.lg', function (e) {
        if (_this.core.touchAction === 'zoomSwipe' && (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target))) {
          _this.core.touchAction = undefined;
          _this.core.outer.removeClass('lg-zoom-dragging');
          if (!isMoved) {
            return;
          }
          isMoved = false;
          endTime = new Date();
          var touchDuration = endTime.valueOf() - startTime.valueOf();
          _this.touchendZoom(startCoords, endCoords, allowX, allowY, touchDuration, _this.rotateValue);
        }
      });
    };
    Zoom.prototype.zoomDrag = function () {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      var isDragging = false;
      var isMoved = false;
      // Allow x direction drag
      var allowX = false;
      // Allow Y direction drag
      var allowY = false;
      var startTime;
      var endTime;
      var possibleSwipeCords;
      var _LGel;
      this.core.outer.on('mousedown.lg.zoom', function (e) {
        // Allow zoom only on image
        if (!_this.isImageSlide()) {
          return;
        }
        var $item = _this.core.getSlideItem(_this.core.index);
        if (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target)) {
          startTime = new Date();
          _LGel = _this.core.getSlideItem(_this.core.index).find('.lg-img-wrap').first();
          var dragAllowedAxises = _this.getDragAllowedAxises(Math.abs(_this.rotateValue));
          allowY = dragAllowedAxises.allowY;
          allowX = dragAllowedAxises.allowX;
          if (_this.core.outer.hasClass('lg-zoomed')) {
            if (_this.$LG(e.target).hasClass('lg-object') && (allowX || allowY)) {
              e.preventDefault();
              startCoords = _this.getDragCords(e, Math.abs(_this.rotateValue));
              possibleSwipeCords = _this.getPossibleSwipeDragCords(_this.rotateValue);
              isDragging = true;
              // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
              _this.core.outer.get().scrollLeft += 1;
              _this.core.outer.get().scrollLeft -= 1;
              _this.core.outer.removeClass('lg-grab').addClass('lg-grabbing lg-zoom-drag-transition lg-zoom-dragging');
              // reset opacity and transition duration
            }
          }
        }
      });

      this.$LG(window).on("mousemove.lg.zoom.global" + this.core.lgId, function (e) {
        if (isDragging) {
          isMoved = true;
          endCoords = _this.getDragCords(e, Math.abs(_this.rotateValue));
          var distance = _this.getZoomSwipeCords(startCoords, endCoords, allowX, allowY, possibleSwipeCords);
          _this.setZoomSwipeStyles(_LGel, distance);
        }
      });
      this.$LG(window).on("mouseup.lg.zoom.global" + this.core.lgId, function (e) {
        if (isDragging) {
          endTime = new Date();
          isDragging = false;
          _this.core.outer.removeClass('lg-zoom-dragging');
          // Fix for chrome mouse move on click
          if (isMoved && (startCoords.x !== endCoords.x || startCoords.y !== endCoords.y)) {
            endCoords = _this.getDragCords(e, Math.abs(_this.rotateValue));
            var touchDuration = endTime.valueOf() - startTime.valueOf();
            _this.touchendZoom(startCoords, endCoords, allowX, allowY, touchDuration, _this.rotateValue);
          }
          isMoved = false;
        }
        _this.core.outer.removeClass('lg-grabbing').addClass('lg-grab');
      });
    };
    Zoom.prototype.closeGallery = function () {
      this.resetZoom();
    };
    Zoom.prototype.destroy = function () {
      // Unbind all events added by lightGallery zoom plugin
      this.$LG(window).off(".lg.zoom.global" + this.core.lgId);
      this.core.LGel.off('.lg.zoom');
      this.core.LGel.off('.zoom');
      clearTimeout(this.zoomableTimeout);
      this.zoomableTimeout = false;
    };
    return Zoom;
  }();
  return Zoom;
});

/*!
 * lightgallery | 2.4.0-beta.0 | December 12th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lgVideo = factory());
})(void 0, function () {
  'use strict';

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
    Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  var _assign4 = function __assign() {
    _assign4 = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return _assign4.apply(this, arguments);
  };
  var videoSettings = {
    autoplayFirstVideo: true,
    youTubePlayerParams: false,
    vimeoPlayerParams: false,
    wistiaPlayerParams: false,
    gotoNextSlideOnVideoEnd: true,
    autoplayVideoOnSlide: false,
    videojs: false,
    videojsOptions: {}
  };

  /**
   * List of lightGallery events
   * All events should be documented here
   * Below interfaces are used to build the website documentations
   * */
  var lGEvents = {
    afterAppendSlide: 'lgAfterAppendSlide',
    init: 'lgInit',
    hasVideo: 'lgHasVideo',
    containerResize: 'lgContainerResize',
    updateSlides: 'lgUpdateSlides',
    afterAppendSubHtml: 'lgAfterAppendSubHtml',
    beforeOpen: 'lgBeforeOpen',
    afterOpen: 'lgAfterOpen',
    slideItemLoad: 'lgSlideItemLoad',
    beforeSlide: 'lgBeforeSlide',
    afterSlide: 'lgAfterSlide',
    posterClick: 'lgPosterClick',
    dragStart: 'lgDragStart',
    dragMove: 'lgDragMove',
    dragEnd: 'lgDragEnd',
    beforeNextSlide: 'lgBeforeNextSlide',
    beforePrevSlide: 'lgBeforePrevSlide',
    beforeClose: 'lgBeforeClose',
    afterClose: 'lgAfterClose',
    rotateLeft: 'lgRotateLeft',
    rotateRight: 'lgRotateRight',
    flipHorizontal: 'lgFlipHorizontal',
    flipVertical: 'lgFlipVertical',
    autoplay: 'lgAutoplay',
    autoplayStart: 'lgAutoplayStart',
    autoplayStop: 'lgAutoplayStop'
  };
  var param = function param(obj) {
    return Object.keys(obj).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
    }).join('&');
  };
  var getVimeoURLParams = function getVimeoURLParams(defaultParams, videoInfo) {
    if (!videoInfo || !videoInfo.vimeo) return '';
    var urlParams = videoInfo.vimeo[2] || '';
    urlParams = urlParams[0] == '?' ? '&' + urlParams.slice(1) : urlParams || '';
    var defaultPlayerParams = defaultParams ? '&' + param(defaultParams) : '';
    // For vimeo last parms gets priority if duplicates found
    var vimeoPlayerParams = "?autoplay=0&muted=1" + defaultPlayerParams + urlParams;
    return vimeoPlayerParams;
  };

  /**
   * Video module for lightGallery
   * Supports HTML5, YouTube, Vimeo, wistia videos
   *
   *
   * @ref Wistia
   * https://wistia.com/support/integrations/wordpress(How to get url)
   * https://wistia.com/support/developers/embed-options#using-embed-options
   * https://wistia.com/support/developers/player-api
   * https://wistia.com/support/developers/construct-an-embed-code
   * http://jsfiddle.net/xvnm7xLm/
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
   * https://wistia.com/support/embed-and-share/sharing-videos
   * https://private-sharing.wistia.com/medias/mwhrulrucj
   *
   * @ref Youtube
   * https://developers.google.com/youtube/player_parameters#enablejsapi
   * https://developers.google.com/youtube/iframe_api_reference
   * https://developer.chrome.com/blog/autoplay/#iframe-delegation
   *
   * @ref Vimeo
   * https://stackoverflow.com/questions/10488943/easy-way-to-get-vimeo-id-from-a-vimeo-url
   * https://vimeo.zendesk.com/hc/en-us/articles/360000121668-Starting-playback-at-a-specific-timecode
   * https://vimeo.zendesk.com/hc/en-us/articles/360001494447-Using-Player-Parameters
   */
  var Video = /** @class */function () {
    function Video(instance) {
      // get lightGallery core plugin instance
      this.core = instance;
      this.settings = _assign4(_assign4({}, videoSettings), this.core.settings);
      return this;
    }
    Video.prototype.init = function () {
      var _this = this;
      /**
       * Event triggered when video url found without poster
       * Append video HTML
       * Play if autoplayFirstVideo is true
       */
      this.core.LGel.on(lGEvents.hasVideo + ".video", this.onHasVideo.bind(this));
      this.core.LGel.on(lGEvents.posterClick + ".video", function () {
        var $el = _this.core.getSlideItem(_this.core.index);
        _this.loadVideoOnPosterClick($el);
      });
      this.core.LGel.on(lGEvents.slideItemLoad + ".video", this.onSlideItemLoad.bind(this));
      // @desc fired immediately before each slide transition.
      this.core.LGel.on(lGEvents.beforeSlide + ".video", this.onBeforeSlide.bind(this));
      // @desc fired immediately after each slide transition.
      this.core.LGel.on(lGEvents.afterSlide + ".video", this.onAfterSlide.bind(this));
    };
    /**
     * @desc Event triggered when a slide is completely loaded
     *
     * @param {Event} event - lightGalley custom event
     */
    Video.prototype.onSlideItemLoad = function (event) {
      var _this = this;
      var _a = event.detail,
        isFirstSlide = _a.isFirstSlide,
        index = _a.index;
      // Should check the active slide as well as user may have moved to different slide before the first slide is loaded
      if (this.settings.autoplayFirstVideo && isFirstSlide && index === this.core.index) {
        // Delay is just for the transition effect on video load
        setTimeout(function () {
          _this.loadAndPlayVideo(index);
        }, 200);
      }
      // Should not call on first slide. should check only if the slide is active
      if (!isFirstSlide && this.settings.autoplayVideoOnSlide && index === this.core.index) {
        this.loadAndPlayVideo(index);
      }
    };
    /**
     * @desc Event triggered when video url or poster found
     * Append video HTML is poster is not given
     * Play if autoplayFirstVideo is true
     *
     * @param {Event} event - Javascript Event object.
     */
    Video.prototype.onHasVideo = function (event) {
      var _a = event.detail,
        index = _a.index,
        src = _a.src,
        html5Video = _a.html5Video,
        hasPoster = _a.hasPoster;
      if (!hasPoster) {
        // All functions are called separately if poster exist in loadVideoOnPosterClick function
        this.appendVideos(this.core.getSlideItem(index), {
          src: src,
          addClass: 'lg-object',
          index: index,
          html5Video: html5Video
        });
        // Automatically navigate to next slide once video reaches the end.
        this.gotoNextSlideOnVideoEnd(src, index);
      }
    };
    /**
     * @desc fired immediately before each slide transition.
     * Pause the previous video
     * Hide the download button if the slide contains YouTube, Vimeo, or Wistia videos.
     *
     * @param {Event} event - Javascript Event object.
     * @param {number} prevIndex - Previous index of the slide.
     * @param {number} index - Current index of the slide
     */
    Video.prototype.onBeforeSlide = function (event) {
      if (this.core.lGalleryOn) {
        var prevIndex = event.detail.prevIndex;
        this.pauseVideo(prevIndex);
      }
    };
    /**
     * @desc fired immediately after each slide transition.
     * Play video if autoplayVideoOnSlide option is enabled.
     *
     * @param {Event} event - Javascript Event object.
     * @param {number} prevIndex - Previous index of the slide.
     * @param {number} index - Current index of the slide
     * @todo should check on onSlideLoad as well if video is not loaded on after slide
     */
    Video.prototype.onAfterSlide = function (event) {
      var _this = this;
      var _a = event.detail,
        index = _a.index,
        prevIndex = _a.prevIndex;
      // Do not call on first slide
      var $slide = this.core.getSlideItem(index);
      if (this.settings.autoplayVideoOnSlide && index !== prevIndex) {
        if ($slide.hasClass('lg-complete')) {
          setTimeout(function () {
            _this.loadAndPlayVideo(index);
          }, 100);
        }
      }
    };
    Video.prototype.loadAndPlayVideo = function (index) {
      var $slide = this.core.getSlideItem(index);
      var currentGalleryItem = this.core.galleryItems[index];
      if (currentGalleryItem.poster) {
        this.loadVideoOnPosterClick($slide, true);
      } else {
        this.playVideo(index);
      }
    };
    /**
     * Play HTML5, Youtube, Vimeo or Wistia videos in a particular slide.
     * @param {number} index - Index of the slide
     */
    Video.prototype.playVideo = function (index) {
      this.controlVideo(index, 'play');
    };
    /**
     * Pause HTML5, Youtube, Vimeo or Wistia videos in a particular slide.
     * @param {number} index - Index of the slide
     */
    Video.prototype.pauseVideo = function (index) {
      this.controlVideo(index, 'pause');
    };
    Video.prototype.getVideoHtml = function (src, addClass, index, html5Video) {
      var video = '';
      var videoInfo = this.core.galleryItems[index].__slideVideoInfo || {};
      var currentGalleryItem = this.core.galleryItems[index];
      var videoTitle = currentGalleryItem.title || currentGalleryItem.alt;
      videoTitle = videoTitle ? 'title="' + videoTitle + '"' : '';
      var commonIframeProps = "allowtransparency=\"true\"\n            frameborder=\"0\"\n            scrolling=\"no\"\n            allowfullscreen\n            mozallowfullscreen\n            webkitallowfullscreen\n            oallowfullscreen\n            msallowfullscreen";
      if (videoInfo.youtube) {
        var videoId = 'lg-youtube' + index;
        var slideUrlParams = videoInfo.youtube[2] ? videoInfo.youtube[2] + '&' : '';
        // For youtube first parms gets priority if duplicates found
        var youTubePlayerParams = "?" + slideUrlParams + "wmode=opaque&autoplay=0&mute=1&enablejsapi=1";
        var playerParams = youTubePlayerParams + (this.settings.youTubePlayerParams ? '&' + param(this.settings.youTubePlayerParams) : '');
        video = "<iframe allow=\"autoplay\" id=" + videoId + " class=\"lg-video-object lg-youtube " + addClass + "\" " + videoTitle + " src=\"//www.youtube.com/embed/" + (videoInfo.youtube[1] + playerParams) + "\" " + commonIframeProps + "></iframe>";
      } else if (videoInfo.vimeo) {
        var videoId = 'lg-vimeo' + index;
        var playerParams = getVimeoURLParams(this.settings.vimeoPlayerParams, videoInfo);
        video = "<iframe allow=\"autoplay\" id=" + videoId + " class=\"lg-video-object lg-vimeo " + addClass + "\" " + videoTitle + " src=\"//player.vimeo.com/video/" + (videoInfo.vimeo[1] + playerParams) + "\" " + commonIframeProps + "></iframe>";
      } else if (videoInfo.wistia) {
        var wistiaId = 'lg-wistia' + index;
        var playerParams = param(this.settings.wistiaPlayerParams);
        playerParams = playerParams ? '?' + playerParams : '';
        video = "<iframe allow=\"autoplay\" id=\"" + wistiaId + "\" src=\"//fast.wistia.net/embed/iframe/" + (videoInfo.wistia[4] + playerParams) + "\" " + videoTitle + " class=\"wistia_embed lg-video-object lg-wistia " + addClass + "\" name=\"wistia_embed\" " + commonIframeProps + "></iframe>";
      } else if (videoInfo.html5) {
        var html5VideoMarkup = '';
        for (var i = 0; i < html5Video.source.length; i++) {
          html5VideoMarkup += "<source src=\"" + html5Video.source[i].src + "\" type=\"" + html5Video.source[i].type + "\">";
        }
        if (html5Video.tracks) {
          var _loop_1 = function _loop_1(i) {
            var trackAttributes = '';
            var track = html5Video.tracks[i];
            Object.keys(track || {}).forEach(function (key) {
              trackAttributes += key + "=\"" + track[key] + "\" ";
            });
            html5VideoMarkup += "<track " + trackAttributes + ">";
          };
          for (var i = 0; i < html5Video.tracks.length; i++) {
            _loop_1(i);
          }
        }
        var html5VideoAttrs_1 = '';
        var videoAttributes_1 = html5Video.attributes || {};
        Object.keys(videoAttributes_1 || {}).forEach(function (key) {
          html5VideoAttrs_1 += key + "=\"" + videoAttributes_1[key] + "\" ";
        });
        video = "<video class=\"lg-video-object lg-html5 " + (this.settings.videojs ? 'video-js' : '') + "\" " + html5VideoAttrs_1 + ">\n                " + html5VideoMarkup + "\n                Your browser does not support HTML5 video.\n            </video>";
      }
      return video;
    };
    /**
     * @desc - Append videos to the slide
     *
     * @param {HTMLElement} el - slide element
     * @param {Object} videoParams - Video parameters, Contains src, class, index, htmlVideo
     */
    Video.prototype.appendVideos = function (el, videoParams) {
      var _a;
      var videoHtml = this.getVideoHtml(videoParams.src, videoParams.addClass, videoParams.index, videoParams.html5Video);
      el.find('.lg-video-cont').append(videoHtml);
      var $videoElement = el.find('.lg-video-object').first();
      if (videoParams.html5Video) {
        $videoElement.on('mousedown.lg.video', function (e) {
          e.stopPropagation();
        });
      }
      if (this.settings.videojs && ((_a = this.core.galleryItems[videoParams.index].__slideVideoInfo) === null || _a === void 0 ? void 0 : _a.html5)) {
        try {
          return videojs($videoElement.get(), this.settings.videojsOptions);
        } catch (e) {
          console.error('lightGallery:- Make sure you have included videojs');
        }
      }
    };
    Video.prototype.gotoNextSlideOnVideoEnd = function (src, index) {
      var _this = this;
      var $videoElement = this.core.getSlideItem(index).find('.lg-video-object').first();
      var videoInfo = this.core.galleryItems[index].__slideVideoInfo || {};
      if (this.settings.gotoNextSlideOnVideoEnd) {
        if (videoInfo.html5) {
          $videoElement.on('ended', function () {
            _this.core.goToNextSlide();
          });
        } else if (videoInfo.vimeo) {
          try {
            // https://github.com/vimeo/player.js/#ended
            new Vimeo.Player($videoElement.get()).on('ended', function () {
              _this.core.goToNextSlide();
            });
          } catch (e) {
            console.error('lightGallery:- Make sure you have included //github.com/vimeo/player.js');
          }
        } else if (videoInfo.wistia) {
          try {
            window._wq = window._wq || [];
            // @todo Event is gettign triggered multiple times
            window._wq.push({
              id: $videoElement.attr('id'),
              onReady: function onReady(video) {
                video.bind('end', function () {
                  _this.core.goToNextSlide();
                });
              }
            });
          } catch (e) {
            console.error('lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js');
          }
        }
      }
    };
    Video.prototype.controlVideo = function (index, action) {
      var $videoElement = this.core.getSlideItem(index).find('.lg-video-object').first();
      var videoInfo = this.core.galleryItems[index].__slideVideoInfo || {};
      if (!$videoElement.get()) return;
      if (videoInfo.youtube) {
        try {
          $videoElement.get().contentWindow.postMessage("{\"event\":\"command\",\"func\":\"" + action + "Video\",\"args\":\"\"}", '*');
        } catch (e) {
          console.error("lightGallery:- " + e);
        }
      } else if (videoInfo.vimeo) {
        try {
          new Vimeo.Player($videoElement.get())[action]();
        } catch (e) {
          console.error('lightGallery:- Make sure you have included //github.com/vimeo/player.js');
        }
      } else if (videoInfo.html5) {
        if (this.settings.videojs) {
          try {
            videojs($videoElement.get())[action]();
          } catch (e) {
            console.error('lightGallery:- Make sure you have included videojs');
          }
        } else {
          $videoElement.get()[action]();
        }
      } else if (videoInfo.wistia) {
        try {
          window._wq = window._wq || [];
          // @todo Find a way to destroy wistia player instance
          window._wq.push({
            id: $videoElement.attr('id'),
            onReady: function onReady(video) {
              video[action]();
            }
          });
        } catch (e) {
          console.error('lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js');
        }
      }
    };
    Video.prototype.loadVideoOnPosterClick = function ($el, forcePlay) {
      var _this = this;
      // check slide has poster
      if (!$el.hasClass('lg-video-loaded')) {
        // check already video element present
        if (!$el.hasClass('lg-has-video')) {
          $el.addClass('lg-has-video');
          var _html = void 0;
          var _src = this.core.galleryItems[this.core.index].src;
          var video = this.core.galleryItems[this.core.index].video;
          if (video) {
            _html = typeof video === 'string' ? JSON.parse(video) : video;
          }
          var videoJsPlayer_1 = this.appendVideos($el, {
            src: _src,
            addClass: '',
            index: this.core.index,
            html5Video: _html
          });
          this.gotoNextSlideOnVideoEnd(_src, this.core.index);
          var $tempImg = $el.find('.lg-object').first().get();
          // @todo make sure it is working
          $el.find('.lg-video-cont').first().append($tempImg);
          $el.addClass('lg-video-loading');
          videoJsPlayer_1 && videoJsPlayer_1.ready(function () {
            videoJsPlayer_1.on('loadedmetadata', function () {
              _this.onVideoLoadAfterPosterClick($el, _this.core.index);
            });
          });
          $el.find('.lg-video-object').first().on('load.lg error.lg loadedmetadata.lg', function () {
            setTimeout(function () {
              _this.onVideoLoadAfterPosterClick($el, _this.core.index);
            }, 50);
          });
        } else {
          this.playVideo(this.core.index);
        }
      } else if (forcePlay) {
        this.playVideo(this.core.index);
      }
    };
    Video.prototype.onVideoLoadAfterPosterClick = function ($el, index) {
      $el.addClass('lg-video-loaded');
      this.playVideo(index);
    };
    Video.prototype.destroy = function () {
      this.core.LGel.off('.lg.video');
      this.core.LGel.off('.video');
    };
    return Video;
  }();
  return Video;
});

/*!
 * lightgallery | 2.4.0-beta.0 | December 12th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lgRotate = factory());
})(void 0, function () {
  'use strict';

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
    Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  var _assign5 = function __assign() {
    _assign5 = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return _assign5.apply(this, arguments);
  };

  /**
   * List of lightGallery events
   * All events should be documented here
   * Below interfaces are used to build the website documentations
   * */
  var lGEvents = {
    afterAppendSlide: 'lgAfterAppendSlide',
    init: 'lgInit',
    hasVideo: 'lgHasVideo',
    containerResize: 'lgContainerResize',
    updateSlides: 'lgUpdateSlides',
    afterAppendSubHtml: 'lgAfterAppendSubHtml',
    beforeOpen: 'lgBeforeOpen',
    afterOpen: 'lgAfterOpen',
    slideItemLoad: 'lgSlideItemLoad',
    beforeSlide: 'lgBeforeSlide',
    afterSlide: 'lgAfterSlide',
    posterClick: 'lgPosterClick',
    dragStart: 'lgDragStart',
    dragMove: 'lgDragMove',
    dragEnd: 'lgDragEnd',
    beforeNextSlide: 'lgBeforeNextSlide',
    beforePrevSlide: 'lgBeforePrevSlide',
    beforeClose: 'lgBeforeClose',
    afterClose: 'lgAfterClose',
    rotateLeft: 'lgRotateLeft',
    rotateRight: 'lgRotateRight',
    flipHorizontal: 'lgFlipHorizontal',
    flipVertical: 'lgFlipVertical',
    autoplay: 'lgAutoplay',
    autoplayStart: 'lgAutoplayStart',
    autoplayStop: 'lgAutoplayStop'
  };
  var rotateSettings = {
    rotate: true,
    rotateSpeed: 400,
    rotateLeft: true,
    rotateRight: true,
    flipHorizontal: true,
    flipVertical: true,
    rotatePluginStrings: {
      flipVertical: 'Flip vertical',
      flipHorizontal: 'Flip horizontal',
      rotateLeft: 'Rotate left',
      rotateRight: 'Rotate right'
    }
  };
  var Rotate = /** @class */function () {
    function Rotate(instance, $LG) {
      // get lightGallery core plugin instance
      this.core = instance;
      this.$LG = $LG;
      // extend module default settings with lightGallery core settings
      this.settings = _assign5(_assign5({}, rotateSettings), this.core.settings);
      return this;
    }
    Rotate.prototype.buildTemplates = function () {
      var rotateIcons = '';
      if (this.settings.flipVertical) {
        rotateIcons += "<button type=\"button\" id=\"lg-flip-ver\" aria-label=\"" + this.settings.rotatePluginStrings['flipVertical'] + "\" class=\"lg-flip-ver lg-icon\"></button>";
      }
      if (this.settings.flipHorizontal) {
        rotateIcons += "<button type=\"button\" id=\"lg-flip-hor\" aria-label=\"" + this.settings.rotatePluginStrings['flipHorizontal'] + "\" class=\"lg-flip-hor lg-icon\"></button>";
      }
      if (this.settings.rotateLeft) {
        rotateIcons += "<button type=\"button\" id=\"lg-rotate-left\" aria-label=\"" + this.settings.rotatePluginStrings['rotateLeft'] + "\" class=\"lg-rotate-left lg-icon\"></button>";
      }
      if (this.settings.rotateRight) {
        rotateIcons += "<button type=\"button\" id=\"lg-rotate-right\" aria-label=\"" + this.settings.rotatePluginStrings['rotateRight'] + "\" class=\"lg-rotate-right lg-icon\"></button>";
      }
      this.core.$toolbar.append(rotateIcons);
    };
    Rotate.prototype.init = function () {
      var _this = this;
      if (!this.settings.rotate) {
        return;
      }
      this.buildTemplates();
      // Save rotate config for each item to persist its rotate, flip values
      // even after navigating to diferent slides
      this.rotateValuesList = {};
      // event triggered after appending slide content
      this.core.LGel.on(lGEvents.afterAppendSlide + ".rotate", function (event) {
        var index = event.detail.index;
        var imageWrap = _this.core.getSlideItem(index).find('.lg-img-wrap').first();
        imageWrap.wrap('lg-img-rotate');
        _this.core.getSlideItem(_this.core.index).find('.lg-img-rotate').css('transition-duration', _this.settings.rotateSpeed + 'ms');
      });
      this.core.outer.find('#lg-rotate-left').first().on('click.lg', this.rotateLeft.bind(this));
      this.core.outer.find('#lg-rotate-right').first().on('click.lg', this.rotateRight.bind(this));
      this.core.outer.find('#lg-flip-hor').first().on('click.lg', this.flipHorizontal.bind(this));
      this.core.outer.find('#lg-flip-ver').first().on('click.lg', this.flipVertical.bind(this));
      // Reset rotate on slide change
      this.core.LGel.on(lGEvents.beforeSlide + ".rotate", function (event) {
        if (!_this.rotateValuesList[event.detail.index]) {
          _this.rotateValuesList[event.detail.index] = {
            rotate: 0,
            flipHorizontal: 1,
            flipVertical: 1
          };
        }
      });
    };
    Rotate.prototype.applyStyles = function () {
      var $image = this.core.getSlideItem(this.core.index).find('.lg-img-rotate').first();
      $image.css('transform', 'rotate(' + this.rotateValuesList[this.core.index].rotate + 'deg)' + ' scale3d(' + this.rotateValuesList[this.core.index].flipHorizontal + ', ' + this.rotateValuesList[this.core.index].flipVertical + ', 1)');
    };
    Rotate.prototype.rotateLeft = function () {
      this.rotateValuesList[this.core.index].rotate -= 90;
      this.applyStyles();
      this.triggerEvents(lGEvents.rotateLeft, {
        rotate: this.rotateValuesList[this.core.index].rotate
      });
    };
    Rotate.prototype.rotateRight = function () {
      this.rotateValuesList[this.core.index].rotate += 90;
      this.applyStyles();
      this.triggerEvents(lGEvents.rotateRight, {
        rotate: this.rotateValuesList[this.core.index].rotate
      });
    };
    Rotate.prototype.getCurrentRotation = function (el) {
      if (!el) {
        return 0;
      }
      var st = this.$LG(el).style();
      var tm = st.getPropertyValue('-webkit-transform') || st.getPropertyValue('-moz-transform') || st.getPropertyValue('-ms-transform') || st.getPropertyValue('-o-transform') || st.getPropertyValue('transform') || 'none';
      if (tm !== 'none') {
        var values = tm.split('(')[1].split(')')[0].split(',');
        if (values) {
          var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
          return angle < 0 ? angle + 360 : angle;
        }
      }
      return 0;
    };
    Rotate.prototype.flipHorizontal = function () {
      var rotateEl = this.core.getSlideItem(this.core.index).find('.lg-img-rotate').first().get();
      var currentRotation = this.getCurrentRotation(rotateEl);
      var rotateAxis = 'flipHorizontal';
      if (currentRotation === 90 || currentRotation === 270) {
        rotateAxis = 'flipVertical';
      }
      this.rotateValuesList[this.core.index][rotateAxis] *= -1;
      this.applyStyles();
      this.triggerEvents(lGEvents.flipHorizontal, {
        flipHorizontal: this.rotateValuesList[this.core.index][rotateAxis]
      });
    };
    Rotate.prototype.flipVertical = function () {
      var rotateEl = this.core.getSlideItem(this.core.index).find('.lg-img-rotate').first().get();
      var currentRotation = this.getCurrentRotation(rotateEl);
      var rotateAxis = 'flipVertical';
      if (currentRotation === 90 || currentRotation === 270) {
        rotateAxis = 'flipHorizontal';
      }
      this.rotateValuesList[this.core.index][rotateAxis] *= -1;
      this.applyStyles();
      this.triggerEvents(lGEvents.flipVertical, {
        flipVertical: this.rotateValuesList[this.core.index][rotateAxis]
      });
    };
    Rotate.prototype.triggerEvents = function (event, detail) {
      var _this = this;
      setTimeout(function () {
        _this.core.LGel.trigger(event, detail);
      }, this.settings.rotateSpeed + 10);
    };
    Rotate.prototype.isImageOrientationChanged = function () {
      var rotateValue = this.rotateValuesList[this.core.index];
      var isRotated = Math.abs(rotateValue.rotate) % 360 !== 0;
      var ifFlippedHor = rotateValue.flipHorizontal < 0;
      var ifFlippedVer = rotateValue.flipVertical < 0;
      return isRotated || ifFlippedHor || ifFlippedVer;
    };
    Rotate.prototype.closeGallery = function () {
      if (this.isImageOrientationChanged()) {
        this.core.getSlideItem(this.core.index).css('opacity', 0);
      }
      this.rotateValuesList = {};
    };
    Rotate.prototype.destroy = function () {
      // Unbind all events added by lightGallery rotate plugin
      this.core.LGel.off('.lg.rotate');
      this.core.LGel.off('.rotate');
    };
    return Rotate;
  }();
  return Rotate;
});
function raiys_get_form_data(form_ele) {
  var formData = new FormData(form_ele);
  var fd = Array.from(formData.entries()).reduce(function (memo, pair) {
    return _objectSpread(_objectSpread({}, memo), {}, _defineProperty({}, pair[0], pair[1]));
  }, {});
  return fd;
}
function raiys_push_history() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var searchParams = new URLSearchParams();
  var strpath = '';
  for (var property in data) {
    var it = data[property];
    if (it != '' && typeof it != 'undefined' && property != 'OnFirstLoad' && _typeof(it) != 'object') {
      searchParams.set(property, it);
    }
  }
  history.pushState(data, '', '/all-yacht-search?' + searchParams.toString());
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
ysp_templates.yacht.grid = function (vessel) {
  var meters = parseInt(vessel.LengthOverall) * 0.3048;
  var price = vessel.Price.slice(0, -3);
  var length = '';
  if (rai_yacht_sync.europe_option_picked == "yes") {
    length = vessel.LengthOverall ? meters.toFixed(2) + ' m' : 'N/A';
    price = vessel.Price ? "\u20AC ".concat(new Intl.NumberFormat('en-us', {
      minimumFractionDigits: 2
    }).format(parseInt(vessel.Price.slice(0, -3)) * rai_yacht_sync.euro_c_c)) : 'Contact Us For Price';
  } else {
    length = vessel.LengthOverall ? vessel.LengthOverall + " / " + meters.toFixed(2) + ' m' : 'N/A';
    price = vessel.Price ? "$ ".concat(new Intl.NumberFormat('en-us', {
      minimumFractionDigits: 2
    }).format(parseInt(vessel.Price.slice(0, -3)))) : 'Contact Us For Price';
  }
  return "\n\t\t\t<div class=\"yacht-result-grid-item\">\n\t\t\t\t<div class=\"yacht-main-image-container\">\n\t\t\t\t\t<img class=\"yacht-main-image\" src=\"".concat(vessel.Images[0] ? vessel.Images[0].Uri : '', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"yacht-general-info-container\">\n\t\t\t\t\t<div class=\"yacht-title-container\">\n\t\t\t\t\t\t<h6 class=\"yacht-title\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', " ").concat(vessel.BoatName ? vessel.BoatName : '', "</h6>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-info-container\">\n\t\t\t\t\t\t<div class=\"yacht-info\">\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Year</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.ModelYear ? vessel.ModelYear : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Cabins</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.CabinsCountNumeric ? vessel.CabinsCountNumeric : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Builder</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.MakeString ? vessel.MakeString : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Length</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(length, "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-price-details-container\">\n\t\t\t\t\t\t<div class=\"yacht-price-container\">\n\t\t\t\t\t\t\t<p class=\"yacht-price\">").concat(price, "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<a class=\"yacht-details\" href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t\tDetails\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
};
ysp_templates.yacht.list = function (vessel) {
  var meters = parseInt(vessel.LengthOverall) * 0.3048;
  var price = vessel.Price.slice(0, -3);
  var length = '';
  if (rai_yacht_sync.europe_option_picked == "yes") {
    length = vessel.LengthOverall ? meters.toFixed(2) + ' m' : 'N/A';
    price = vessel.Price ? "\u20AC ".concat(new Intl.NumberFormat('en-us', {
      minimumFractionDigits: 2
    }).format(parseInt(vessel.Price.slice(0, -3)) * rai_yacht_sync.euro_c_c)) : 'Contact Us For Price';
  } else {
    length = vessel.LengthOverall ? vessel.LengthOverall + " / " + meters.toFixed(2) + ' m' : 'N/A';
    price = vessel.Price ? "$ ".concat(new Intl.NumberFormat('en-us', {
      minimumFractionDigits: 2
    }).format(parseInt(vessel.Price.slice(0, -3)))) : 'Contact Us For Price';
  }
  return "\n\t\t\t<div class=\"yacht-result-grid-item list-view\">\n\t\t\t\t<div class=\"yacht-main-image-container\">\n\t\t\t\t\t<img class=\"yacht-main-image\" src=\"".concat(vessel.Images[0] ? vessel.Images[0].Uri : '', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"yacht-general-info-container\">\n\t\t\t\t\t<div class=\"yacht-title-container\">\n\t\t\t\t\t\t<h6 class=\"yacht-title\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', " ").concat(vessel.BoatName ? vessel.BoatName : '', "</h6>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-info-container\">\n\t\t\t\t\t\t<div class=\"yacht-info\">\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Year</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.ModelYear ? vessel.ModelYear : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Cabins</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.CabinsCountNumeric ? vessel.CabinsCountNumeric : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Builder</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.MakeString ? vessel.MakeString : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Length</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(length, "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-price-details-container\">\n\t\t\t\t\t\t<div class=\"yacht-price-container\">\n\t\t\t\t\t\t\t<p class=\"yacht-price\">").concat(price, "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<a class=\"yacht-details\" href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t\tDetails\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
};
ysp_templates.noResults = function () {
  return "\n            <div>\n                <b>No Results</b>\n            </div>\n        ";
};
function ysp_yacht_search_and_reader(data) {
  jQuery('#search-result-row').html('');

  // GET AND WRITE
  return rai_ysp_api.call_api("POST", "yachts", data).then(function (data_result) {
    jQuery('#total-results').text(new Intl.NumberFormat('en-IN', {
      maximumSignificantDigits: 3
    }).format(data_result.total));
    if (data_result.total > 0) {
      data_result.results.forEach(function (item) {
        if (typeof data.view != 'undefined' && data.view == 'list') {
          jQuery('#search-result-row').append(ysp_templates.yacht.list(item, data));
        } else {
          jQuery('#search-result-row').append(ysp_templates.yacht.grid(item, data));
        }
      });

      // raiys_push_history(data);

      jQuery('#yachts-pagination').pagination({
        items: data_result.total,
        itemsOnPage: 12,
        currentPage: data.page_index,
        prevText: '<',
        nextText: '>',
        hrefTextPrefix: '?page_index=',
        onPageClick: function onPageClick(pageNumber, event) {
          event.preventDefault();
          document.querySelector('.ysp-yacht-search-form input[name=page_index]').value = pageNumber;

          /*jQuery([document.documentElement, document.body]).animate({
              scrollTop: (jQuery(".search-for-page").offset().top)
          }, 250);*/

          var formDataObject = raiys_get_form_data(document.querySelector('.ysp-yacht-search-form'));
          ysp_yacht_search_and_reader(formDataObject);
        }
      });
    } else {
      jQuery('#yachts-pagination').html('');
      jQuery('#search-result-row').append(ysp_templates.noResults());
    }
    return data_result;
  })["catch"](function (error) {
    console.log(error);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  var yachtSearchAndResults = document.querySelector('.ysp-yacht-search-form');
  if (yachtSearchAndResults) {
    yachtSearchAndResults.addEventListener('submit', function (e) {
      e.preventDefault();
      var params = raiys_get_form_data(event.target);
      ysp_yacht_search_and_reader(params);
    });
    document.querySelectorAll('input[name=view][form=ysp-yacht-search-form], select[name=sortBy][form=ysp-yacht-search-form]').forEach(function (eeee) {
      eeee.addEventListener('change', function (e) {
        var params = raiys_get_form_data(e.target.form);
        ysp_yacht_search_and_reader(params);
      });
    });

    // Restore Fields
    var URLREF = new URL(location.href); // maybe for a re-do

    var formInputs = document.querySelectorAll('.ysp-yacht-search-form *[name], *[name][form="ysp-yacht-search-form"]');
    formInputs.forEach(function (ele) {
      var input = ele;
      var name = ele.getAttribute('name');
      var urlVal = URLREF.searchParams.get(name);
      if (urlVal != '' && urlVal != null) {
        if (typeof input.type != 'undefined' && input.type == 'checkbox' && input.value == urlVal) {
          input.checked = true;
        } else {
          input.value = urlVal;
        }
      }
    });

    // Fill List Options
    var FillLists = [];
    var listElements = document.querySelectorAll("datalist[data-fill-list]");
    listElements.forEach(function (ele) {
      FillLists.push(ele.getAttribute('data-fill-list'));
    });
    rai_ysp_api.call_api('POST', 'list-options', {
      labels: FillLists
    }).then(function (rOptions) {
      var _loop2 = function _loop2() {
        var SelectorEle = document.querySelectorAll("datalist[data-fill-list='" + label + "']");
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
        _loop2();
      }
    });

    // Fill options
    var FillOptions = [];
    var selectorElements = document.querySelectorAll("select[data-fill-options]");
    selectorElements.forEach(function (ele) {
      FillOptions.push(ele.getAttribute('data-fill-options'));
    });
    rai_ysp_api.call_api('POST', 'dropdown-options', {
      labels: FillOptions
    }).then(function (rOptions) {
      var _loop3 = function _loop3() {
        var SelectorEle = document.querySelectorAll("select[data-fill-options='" + label + "']");
        rOptions[label].forEach(function (b) {
          var option = document.createElement("OPTION");
          option.text = b;
          option.value = b;
          SelectorEle.forEach(function (ele) {
            ele.add(option);
          });
        });
        var URLREF = new URL(location.href);
        var UrlVal = URLREF.searchParams.get(label);
        if (UrlVal != '' && UrlVal != null) {
          SelectorEle.forEach(function (ele) {
            ele.value = UrlVal;
          });
        }
      };
      for (var label in rOptions) {
        _loop3();
      }
    }).then(function () {
      // Render Yachts For Page Load
      var params = raiys_get_form_data(document.querySelector('.ysp-yacht-search-form'));
      ysp_yacht_search_and_reader(params);
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var forms = document.querySelectorAll('.single-yacht-detils-lead');
  forms.forEach(function (fEle) {
    fEle.addEventListener('submit', function (e) {
      e.preventDefault();
      var FormData = raiys_get_form_data(e.target);
      var successMessage = fEle.parentElement.querySelector('.success-message');
      rai_ysp_api.call_api("POST", "yacht-leads", FormData).then(function (data_result) {
        console.log('success');
        successMessage.style.display = 'block';
        console.log('Form should be hidden.');
        e.target.style.display = 'none';
      })["catch"](function (error) {
        console.log(error);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS1wYWdpbmF0aW9uLmpzIiwibGlnaHRnYWxsZXJ5LnVtZC5qcyIsImxnLXRodW1ibmFpbC51bWQuanMiLCJsZy16b29tLnVtZC5qcyIsImxnLXZpZGVvLnVtZC5qcyIsImxnLXJvdGF0ZS51bWQuanMiLCJjb21tb24uanMiLCJhcGktY2xpZW50LmpzIiwidGVtcGxhdGVzLmpzIiwieWFjaHRTZWFyY2guanMiLCJsZWFkcy5qcyJdLCJuYW1lcyI6WyIkIiwibWV0aG9kcyIsImluaXQiLCJvcHRpb25zIiwibyIsImV4dGVuZCIsIml0ZW1zIiwiaXRlbXNPblBhZ2UiLCJwYWdlcyIsImRpc3BsYXllZFBhZ2VzIiwiZWRnZXMiLCJjdXJyZW50UGFnZSIsInVzZUFuY2hvcnMiLCJocmVmVGV4dFByZWZpeCIsImhyZWZUZXh0U3VmZml4IiwicHJldlRleHQiLCJuZXh0VGV4dCIsImVsbGlwc2VUZXh0IiwiZWxsaXBzZVBhZ2VTZXQiLCJjc3NTdHlsZSIsImxpc3RTdHlsZSIsImxhYmVsTWFwIiwic2VsZWN0T25DbGljayIsIm5leHRBdEZyb250IiwiaW52ZXJ0UGFnZU9yZGVyIiwidXNlU3RhcnRFZGdlIiwidXNlRW5kRWRnZSIsIm9uUGFnZUNsaWNrIiwicGFnZU51bWJlciIsImV2ZW50Iiwib25Jbml0Iiwic2VsZiIsIk1hdGgiLCJjZWlsIiwiaGFsZkRpc3BsYXllZCIsImVhY2giLCJhZGRDbGFzcyIsImRhdGEiLCJfZHJhdyIsImNhbGwiLCJzZWxlY3RQYWdlIiwicGFnZSIsIl9zZWxlY3RQYWdlIiwicHJldlBhZ2UiLCJuZXh0UGFnZSIsImdldFBhZ2VzQ291bnQiLCJzZXRQYWdlc0NvdW50IiwiY291bnQiLCJnZXRDdXJyZW50UGFnZSIsImRlc3Ryb3kiLCJlbXB0eSIsImRyYXdQYWdlIiwicmVkcmF3IiwiZGlzYWJsZSIsImRpc2FibGVkIiwiZW5hYmxlIiwidXBkYXRlSXRlbXMiLCJuZXdJdGVtcyIsIl9nZXRQYWdlcyIsInVwZGF0ZUl0ZW1zT25QYWdlIiwiZ2V0SXRlbXNPblBhZ2UiLCJpbnRlcnZhbCIsIl9nZXRJbnRlcnZhbCIsImkiLCJ0YWdOYW1lIiwicHJvcCIsImF0dHIiLCIkcGFuZWwiLCJhcHBlbmRUbyIsIl9hcHBlbmRJdGVtIiwidGV4dCIsImNsYXNzZXMiLCJzdGFydCIsImVuZCIsIm1pbiIsImFwcGVuZCIsImJlZ2luIiwibWF4IiwiX2VsbGlwc2VDbGljayIsInBhZ2VJbmRleCIsIm9wdHMiLCIkbGluayIsIiRsaW5rV3JhcHBlciIsIiR1bCIsImZpbmQiLCJsZW5ndGgiLCJjbGljayIsIiRlbGxpcCIsInBhcmVudCIsInJlbW92ZUNsYXNzIiwiJHRoaXMiLCJ2YWwiLCJwYXJzZUludCIsInByZXYiLCJodG1sIiwiZm9jdXMiLCJzdG9wUHJvcGFnYXRpb24iLCJrZXl1cCIsIndoaWNoIiwiYmluZCIsImZuIiwicGFnaW5hdGlvbiIsIm1ldGhvZCIsImNoYXJBdCIsImFwcGx5IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFyZ3VtZW50cyIsIl90eXBlb2YiLCJlcnJvciIsImpRdWVyeSIsImdsb2JhbCIsImZhY3RvcnkiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiZ2xvYmFsVGhpcyIsImxpZ2h0R2FsbGVyeSIsIl9fYXNzaWduIiwiT2JqZWN0IiwiYXNzaWduIiwidCIsInMiLCJuIiwicCIsImhhc093blByb3BlcnR5IiwiX19zcHJlYWRBcnJheXMiLCJpbCIsInIiLCJrIiwiYSIsImoiLCJqbCIsImxHRXZlbnRzIiwiYWZ0ZXJBcHBlbmRTbGlkZSIsImhhc1ZpZGVvIiwiY29udGFpbmVyUmVzaXplIiwidXBkYXRlU2xpZGVzIiwiYWZ0ZXJBcHBlbmRTdWJIdG1sIiwiYmVmb3JlT3BlbiIsImFmdGVyT3BlbiIsInNsaWRlSXRlbUxvYWQiLCJiZWZvcmVTbGlkZSIsImFmdGVyU2xpZGUiLCJwb3N0ZXJDbGljayIsImRyYWdTdGFydCIsImRyYWdNb3ZlIiwiZHJhZ0VuZCIsImJlZm9yZU5leHRTbGlkZSIsImJlZm9yZVByZXZTbGlkZSIsImJlZm9yZUNsb3NlIiwiYWZ0ZXJDbG9zZSIsInJvdGF0ZUxlZnQiLCJyb3RhdGVSaWdodCIsImZsaXBIb3Jpem9udGFsIiwiZmxpcFZlcnRpY2FsIiwiYXV0b3BsYXkiLCJhdXRvcGxheVN0YXJ0IiwiYXV0b3BsYXlTdG9wIiwibGlnaHRHYWxsZXJ5Q29yZVNldHRpbmdzIiwibW9kZSIsImVhc2luZyIsInNwZWVkIiwibGljZW5zZUtleSIsImhlaWdodCIsIndpZHRoIiwic3RhcnRDbGFzcyIsImJhY2tkcm9wRHVyYXRpb24iLCJjb250YWluZXIiLCJzdGFydEFuaW1hdGlvbkR1cmF0aW9uIiwiem9vbUZyb21PcmlnaW4iLCJoaWRlQmFyc0RlbGF5Iiwic2hvd0JhcnNBZnRlciIsInNsaWRlRGVsYXkiLCJzdXBwb3J0TGVnYWN5QnJvd3NlciIsImFsbG93TWVkaWFPdmVybGFwIiwidmlkZW9NYXhTaXplIiwibG9hZFlvdVR1YmVQb3N0ZXIiLCJkZWZhdWx0Q2FwdGlvbkhlaWdodCIsImFyaWFMYWJlbGxlZGJ5IiwiYXJpYURlc2NyaWJlZGJ5IiwiY2xvc2FibGUiLCJzd2lwZVRvQ2xvc2UiLCJjbG9zZU9uVGFwIiwic2hvd0Nsb3NlSWNvbiIsInNob3dNYXhpbWl6ZUljb24iLCJsb29wIiwiZXNjS2V5Iiwia2V5UHJlc3MiLCJjb250cm9scyIsInNsaWRlRW5kQW5pbWF0aW9uIiwiaGlkZUNvbnRyb2xPbkVuZCIsIm1vdXNld2hlZWwiLCJnZXRDYXB0aW9uRnJvbVRpdGxlT3JBbHQiLCJhcHBlbmRTdWJIdG1sVG8iLCJzdWJIdG1sU2VsZWN0b3JSZWxhdGl2ZSIsInByZWxvYWQiLCJudW1iZXJPZlNsaWRlSXRlbXNJbkRvbSIsInNlbGVjdG9yIiwic2VsZWN0V2l0aGluIiwibmV4dEh0bWwiLCJwcmV2SHRtbCIsImluZGV4IiwiaWZyYW1lV2lkdGgiLCJpZnJhbWVIZWlnaHQiLCJpZnJhbWVNYXhXaWR0aCIsImlmcmFtZU1heEhlaWdodCIsImRvd25sb2FkIiwiY291bnRlciIsImFwcGVuZENvdW50ZXJUbyIsInN3aXBlVGhyZXNob2xkIiwiZW5hYmxlU3dpcGUiLCJlbmFibGVEcmFnIiwiZHluYW1pYyIsImR5bmFtaWNFbCIsImV4dHJhUHJvcHMiLCJleFRodW1iSW1hZ2UiLCJpc01vYmlsZSIsInVuZGVmaW5lZCIsIm1vYmlsZVNldHRpbmdzIiwicGx1Z2lucyIsInN0cmluZ3MiLCJjbG9zZUdhbGxlcnkiLCJ0b2dnbGVNYXhpbWl6ZSIsInByZXZpb3VzU2xpZGUiLCJuZXh0U2xpZGUiLCJwbGF5VmlkZW8iLCJpbml0TGdQb2x5ZmlsbHMiLCJ3aW5kb3ciLCJDdXN0b21FdmVudCIsInBhcmFtcyIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiZGV0YWlsIiwiZXZ0IiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsImluaXRDdXN0b21FdmVudCIsIkVsZW1lbnQiLCJtYXRjaGVzIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJsZ1F1ZXJ5IiwiY3NzVmVuZGVyUHJlZml4ZXMiLCJfZ2V0U2VsZWN0b3IiLCJmaXJzdEVsZW1lbnQiLCJfZ2V0Rmlyc3RFbCIsImdlbmVyYXRlVVVJRCIsInJlcGxhY2UiLCJjIiwicmFuZG9tIiwidiIsInRvU3RyaW5nIiwiY29udGV4dCIsImZsIiwic3Vic3RyaW5nIiwicXVlcnlTZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJfZWFjaCIsImZ1bmMiLCJmb3JFYWNoIiwiX3NldENzc1ZlbmRvclByZWZpeCIsImVsIiwiY3NzUHJvcGVydHkiLCJ2YWx1ZSIsInByb3BlcnR5IiwiZ3JvdXAxIiwidG9VcHBlckNhc2UiLCJpbmRleE9mIiwic3R5bGUiLCJ0b0xvd2VyQ2FzZSIsImlzRXZlbnRNYXRjaGVkIiwiZXZlbnROYW1lIiwiZXZlbnROYW1lc3BhY2UiLCJzcGxpdCIsImZpbHRlciIsImUiLCJldmVyeSIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsIiRMRyIsImZpcnN0IiwiZXEiLCJwYXJlbnRFbGVtZW50IiwiZ2V0IiwicmVtb3ZlQXR0ciIsImF0dHJpYnV0ZXMiLCJhdHRycyIsInJlbW92ZUF0dHJpYnV0ZSIsIndyYXAiLCJjbGFzc05hbWUiLCJ3cmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJyZW1vdmVDaGlsZCIsImFwcGVuZENoaWxkIiwiY2xhc3NOYW1lcyIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJoYXNBdHRyaWJ1dGUiLCJhdHRyaWJ1dGUiLCJ0b2dnbGVDbGFzcyIsImNzcyIsIl90aGlzIiwib24iLCJldmVudHMiLCJsaXN0ZW5lciIsImlzQXJyYXkiLCJldmVudExpc3RlbmVycyIsInB1c2giLCJhZGRFdmVudExpc3RlbmVyIiwib25jZSIsIm9mZiIsImtleXMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidHJpZ2dlciIsImN1c3RvbUV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImxvYWQiLCJ1cmwiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJpbm5lckhUTUwiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJwcmVwZW5kIiwic2Nyb2xsVG9wIiwiYm9keSIsImRvY3VtZW50RWxlbWVudCIsInBhZ2VZT2Zmc2V0Iiwic2Nyb2xsTGVmdCIsInBhZ2VYT2Zmc2V0Iiwib2Zmc2V0IiwibGVmdCIsInRvcCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib2R5TWFyZ2luTGVmdCIsIm1hcmdpbkxlZnQiLCJwYXJzZUZsb2F0IiwiY3VycmVudFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImNsaWVudFdpZHRoIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJjbGllbnRIZWlnaHQiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsImRlZmF1bHREeW5hbWljT3B0aW9ucyIsImNvbnZlcnRUb0RhdGEiLCJnIiwidXRpbHMiLCJnZXRTaXplIiwic3BhY2luZyIsImRlZmF1bHRMZ1NpemUiLCJMR2VsIiwibGdTaXplIiwiaXNSZXNwb25zaXZlU2l6ZXMiLCJ3V2lkdGgiLCJpbm5lcldpZHRoIiwic2l6ZV8xIiwicmVzcG9uc2l2ZVdpZHRoIiwic2l6ZSIsImNXaWR0aCIsImNIZWlnaHQiLCJtYXhXaWR0aCIsIm1heEhlaWdodCIsInJhdGlvIiwiZ2V0VHJhbnNmb3JtIiwiYm90dG9tIiwiaW1hZ2VTaXplIiwiY29udGFpbmVyUmVjdCIsIndIZWlnaHQiLCJlbFdpZHRoIiwiZWxIZWlnaHQiLCJlbFN0eWxlIiwieCIsImJvcmRlckxlZnQiLCJ5IiwiYm9yZGVyVG9wIiwic2NYIiwic2NZIiwidHJhbnNmb3JtIiwiZ2V0SWZyYW1lTWFya3VwIiwic3JjIiwiaWZyYW1lVGl0bGUiLCJ0aXRsZSIsImdldEltZ01hcmt1cCIsImFsdEF0dHIiLCJzcmNzZXQiLCJzaXplcyIsInNvdXJjZXMiLCJzcmNzZXRBdHRyIiwic2l6ZXNBdHRyIiwiaW1nTWFya3VwIiwic291cmNlVGFnIiwic291cmNlT2JqIiwiSlNPTiIsInBhcnNlIiwibWFwIiwic291cmNlIiwia2V5IiwiZ2V0UmVzcG9uc2l2ZVNyYyIsInNyY0l0bXMiLCJyc1dpZHRoIiwicnNTcmMiLCJfc3JjIiwic3BsaWNlIiwiaXNJbWFnZUxvYWRlZCIsImltZyIsImNvbXBsZXRlIiwibmF0dXJhbFdpZHRoIiwiZ2V0VmlkZW9Qb3N0ZXJNYXJrdXAiLCJfcG9zdGVyIiwiZHVtbXlJbWciLCJ2aWRlb0NvbnRTdHlsZSIsInBsYXlWaWRlb1N0cmluZyIsIl9pc1ZpZGVvIiwidmlkZW9DbGFzcyIsInlvdXR1YmUiLCJ2aW1lbyIsImdldER5bmFtaWNPcHRpb25zIiwiZHluYW1pY0VsZW1lbnRzIiwiYXZhaWxhYmxlRHluYW1pY09wdGlvbnMiLCJpdGVtIiwic3BlY2lmaWVkIiwiZHluYW1pY0F0dHIiLCJuYW1lIiwibGFiZWwiLCJjdXJyZW50SXRlbSIsImFsdCIsInRodW1iIiwic3ViSHRtbCIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJpc1ZpZGVvIiwiaXNIVE1MNVZJZGVvIiwiaHRtbDUiLCJjb25zb2xlIiwibWF0Y2giLCJ3aXN0aWEiLCJsZ0lkIiwiTGlnaHRHYWxsZXJ5IiwiZWxlbWVudCIsImxnT3BlbmVkIiwibEdhbGxlcnlPbiIsImxnQnVzeSIsImN1cnJlbnRJdGVtc0luRG9tIiwicHJldlNjcm9sbFRvcCIsImlzRHVtbXlJbWFnZVJlbW92ZWQiLCJkcmFnT3JTd2lwZUVuYWJsZWQiLCJtZWRpYUNvbnRhaW5lclBvc2l0aW9uIiwiZ2VuZXJhdGVTZXR0aW5ncyIsImJ1aWxkTW9kdWxlcyIsInNldHRpbmdzIiwiZ2FsbGVyeUl0ZW1zIiwiZ2V0SXRlbXMiLCJub3JtYWxpemVTZXR0aW5ncyIsInZhbGlkYXRlTGljZW5zZSIsImFkZFNsaWRlVmlkZW9JbmZvIiwiYnVpbGRTdHJ1Y3R1cmUiLCJpbnN0YW5jZSIsInNldFRpbWVvdXQiLCJ0cmlnZ2VyUG9zdGVyQ2xpY2siLCJhcnJvdyIsIm9wZW5HYWxsZXJ5T25JdGVtQ2xpY2siLCJfbG9vcF8xIiwidGhpc18xIiwiJGVsZW1lbnQiLCJ1dWlkIiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50SXRlbUluZGV4Iiwib3BlbkdhbGxlcnkiLCJwbHVnaW4iLCJ3YXJuIiwiZ2V0U2xpZGVJdGVtIiwiZ2V0U2xpZGVJdGVtSWQiLCJnZXRJZE5hbWUiLCJpZCIsImdldEVsZW1lbnRCeUlkIiwibWFuYWdlU2luZ2xlU2xpZGVDbGFzc05hbWUiLCJvdXRlciIsIiRjb250YWluZXIiLCJzdWJIdG1sQ29udCIsImFkZENsYXNzZXMiLCJjb250YWluZXJDbGFzc05hbWUiLCJjbG9zZUljb24iLCJtYXhpbWl6ZUljb24iLCJ0ZW1wbGF0ZSIsIiRsZ0NvbXBvbmVudHMiLCIkYmFja2Ryb3AiLCIkaW5uZXIiLCIkY29udGVudCIsIiR0b29sYmFyIiwib3V0ZXJDbGFzc05hbWVzIiwicmVmcmVzaE9uUmVzaXplIiwiaGlkZUJhcnMiLCJtYW5hZ2VDbG9zZUdhbGxlcnkiLCJpbml0TW9kdWxlcyIsImN1cnJlbnRHYWxsZXJ5SXRlbSIsIl9fc2xpZGVWaWRlb0luZm8iLCJnZXRNZWRpYUNvbnRhaW5lclBvc2l0aW9uIiwiX2EiLCJ0b3BfMSIsImN1cnJlbnRJbWFnZVNpemUiLCJyZXNpemVWaWRlb1NsaWRlIiwiaW1nU3R5bGUiLCJnZXREdW1teUltZ1N0eWxlcyIsImxnVmlkZW9TdHlsZSIsImdldFZpZGVvQ29udFN0eWxlIiwiY3VycmVudFNsaWRlIiwiY3VycmVudFNyYyIsInVwZGF0ZUNvbnRyb2xzIiwiX2luZGV4Iiwic29tZSIsImdhbGxlcnlJdGVtIiwiaXRlbUluZGV4Iiwib3JnYW5pemVTbGlkZUl0ZW1zIiwibG9hZENvbnRlbnQiLCJ1cGRhdGVDdXJyZW50Q291bnRlciIsImNoaWxkcmVuIiwiaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbSIsImdldEl0ZW1zVG9CZUluc2VydGVkVG9Eb20iLCJhZGRIdG1sIiwic2V0TWVkaWFDb250YWluZXJQb3NpdGlvbiIsInRpbWVvdXQiLCJjdXJyZW50U2xpZGVfMSIsInNsaWRlIiwiY2FwdGlvbkhlaWdodCIsInRodW1iQ29udGFpbmVyIiwidGh1bWJIZWlnaHQiLCJjbGVhclRpbWVvdXQiLCJoaWRlQmFyVGltZW91dCIsImluaXRQaWN0dXJlRmlsbCIsIiRpbWciLCJwaWN0dXJlZmlsbCIsImVsZW1lbnRzIiwiY291bnRlckh0bWwiLCJzdWJIdG1sVXJsIiwiZkwiLCJnZXREdW1teUltYWdlQ29udGVudCIsIiRjdXJyZW50U2xpZGUiLCIkY3VycmVudEl0ZW0iLCJfZHVtbXlJbWdTcmMiLCJkdW1teUltZ0NvbnRlbnQiLCJzZXRJbWdNYXJrdXAiLCJpbWdDb250ZW50IiwiaXNGaXJzdFNsaWRlV2l0aFpvb21BbmltYXRpb24iLCJvblNsaWRlT2JqZWN0TG9hZCIsIiRzbGlkZSIsImlzSFRNTDVWaWRlb1dpdGhvdXRQb3N0ZXIiLCJvbkxvYWQiLCJvbkVycm9yIiwibWVkaWFPYmplY3QiLCJvbkxnT2JqZWN0TG9hZCIsImRlbGF5IiwiaXNGaXJzdFNsaWRlIiwidHJpZ2dlclNsaWRlSXRlbUxvYWQiLCJfc3BlZWQiLCJnZXRTbGlkZVR5cGUiLCJwb3N0ZXIiLCJ2aWRlbyIsInJlYyIsIl9odG1sNVZpZGVvIiwicmVzcG9uc2l2ZSIsInNyY0R5SXRtcyIsInZpZGVvSW5mbyIsImlmcmFtZSIsInRvcF8yIiwidmlkZW9TaXplIiwibWFya3VwIiwiaGFzU3RhcnRBbmltYXRpb24iLCJodG1sNVZpZGVvIiwiaGFzUG9zdGVyIiwibG9hZENvbnRlbnRPbkZpcnN0U2xpZGVMb2FkIiwicHJldkluZGV4IiwibnVtYmVyT2ZJdGVtcyIsInBvc3NpYmxlTnVtYmVyT2ZJdGVtcyIsInByZXZJbmRleEl0ZW0iLCJfZWxlbWVudCIsImlkeCIsIm51bWJlck9mRXhpc3RpbmdJdGVtcyIsImdldFByZXZpb3VzU2xpZGVJbmRleCIsImN1cnJlbnRJdGVtSWQiLCJzZXREb3dubG9hZFZhbHVlIiwiaGlkZURvd25sb2FkQnRuIiwiZG93bmxvYWRVcmwiLCIkZG93bmxvYWQiLCJtYWtlU2xpZGVBbmltYXRpb24iLCJkaXJlY3Rpb24iLCJjdXJyZW50U2xpZGVJdGVtIiwicHJldmlvdXNTbGlkZUl0ZW0iLCJmcm9tVG91Y2giLCJmcm9tVGh1bWIiLCJudW1iZXJPZkdhbGxlcnlJdGVtcyIsInByZXZpb3VzU2xpZGVJdGVtXzEiLCJ0b3BfMyIsImFycm93RGlzYWJsZSIsInRvdWNoUHJldiIsInRvdWNoTmV4dCIsInVwZGF0ZUNvdW50ZXJUb3RhbCIsInRvdWNoTW92ZSIsInN0YXJ0Q29vcmRzIiwiZW5kQ29vcmRzIiwiZGlzdGFuY2VYIiwicGFnZVgiLCJkaXN0YW5jZVkiLCJwYWdlWSIsImFsbG93U3dpcGUiLCJzd2lwZURpcmVjdGlvbiIsImFicyIsInNldFRyYW5zbGF0ZSIsIm9mZnNldFdpZHRoIiwic2xpZGVXaWR0aEFtb3VudCIsImd1dHRlciIsIm9wYWNpdHkiLCJpbm5lckhlaWdodCIsInNjYWxlIiwidG91Y2hFbmQiLCJkaXN0YW5jZSIsInRyaWdnZXJDbGljayIsImRpc3RhbmNlQWJzIiwiZ29Ub05leHRTbGlkZSIsImdvVG9QcmV2U2xpZGUiLCJ0YXJnZXQiLCJpc1Bvc3RlckVsZW1lbnQiLCJpc01vdmVkIiwiaXNTd2lwaW5nIiwiJGl0ZW0iLCJ0YXJnZXRUb3VjaGVzIiwidG91Y2hBY3Rpb24iLCJtYW5hZ2VTd2lwZUNsYXNzIiwiaXNEcmFnaW5nIiwiX3RvdWNoTmV4dCIsIl90b3VjaFByZXYiLCJfbG9vcCIsImtleUNvZGUiLCIkcHJldiIsIiRuZXh0IiwiJGVsIiwieFZhbHVlIiwieVZhbHVlIiwic2NhbGVYIiwic2NhbGVZIiwibGFzdENhbGwiLCJkZWx0YVkiLCJub3ciLCJEYXRlIiwiZ2V0VGltZSIsImlzU2xpZGVFbGVtZW50IiwicGxheUJ1dHRvbiIsImludmFsaWRhdGVJdGVtcyIsIm1vdXNlZG93biIsImZvcmNlIiwidG9wXzQiLCJfYiIsImRlc3Ryb3lNb2R1bGVzIiwicmVtb3ZlVGltZW91dCIsImJsdXIiLCJlcnIiLCJyZWZyZXNoIiwiY2xvc2VUaW1lb3V0IiwibGdUaHVtYm5haWwiLCJ0aHVtYm5haWxzU2V0dGluZ3MiLCJ0aHVtYm5haWwiLCJhbmltYXRlVGh1bWIiLCJjdXJyZW50UGFnZXJQb3NpdGlvbiIsImFsaWduVGh1bWJuYWlscyIsInRodW1iV2lkdGgiLCJ0aHVtYk1hcmdpbiIsImFwcGVuZFRodW1ibmFpbHNUbyIsInRvZ2dsZVRodW1iIiwiZW5hYmxlVGh1bWJEcmFnIiwiZW5hYmxlVGh1bWJTd2lwZSIsInRodW1ibmFpbFN3aXBlVGhyZXNob2xkIiwibG9hZFlvdVR1YmVUaHVtYm5haWwiLCJ5b3VUdWJlVGh1bWJTaXplIiwidGh1bWJuYWlsUGx1Z2luU3RyaW5ncyIsInRvZ2dsZVRodW1ibmFpbHMiLCJUaHVtYm5haWwiLCJ0aHVtYk91dGVyV2lkdGgiLCJ0aHVtYlRvdGFsV2lkdGgiLCJ0cmFuc2xhdGVYIiwidGh1bWJDbGlja2FibGUiLCJjb3JlIiwic2V0QW5pbWF0ZVRodW1iU3R5bGVzIiwiYnVpbGQiLCJ0b2dnbGVUaHVtYkJhciIsInRodW1iS2V5UHJlc3MiLCJzZXRUaHVtYk1hcmt1cCIsIm1hbmFnZUFjdGl2ZUNsYXNzT25TbGlkZUNoYW5nZSIsIiRsZ1RodW1iIiwiJHRhcmdldCIsInJlYnVpbGRUaHVtYm5haWxzIiwidGh1bWJPdXRlckNsYXNzTmFtZXMiLCIkdGh1bWJPdXRlciIsInNldFRodW1iSXRlbUh0bWwiLCJ0aHVtYkRyYWdVdGlscyIsImNvcmRzIiwic3RhcnRYIiwiZW5kWCIsIm5ld1RyYW5zbGF0ZVgiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwidG91Y2hNb3ZlVGltZSIsImlzRHJhZ2dpbmciLCJvblRodW1iVG91Y2hNb3ZlIiwib25UaHVtYlRvdWNoRW5kIiwiZ2V0UG9zc2libGVUcmFuc2Zvcm1YIiwicG9zaXRpb24iLCJ2YWx1ZU9mIiwidG91Y2hEdXJhdGlvbiIsImRpc3RhbmNlWG5ldyIsInNwZWVkWCIsImdldFRodW1iSHRtbCIsInNsaWRlVmlkZW9JbmZvIiwidGh1bWJJbWciLCJnZXRUaHVtYkl0ZW1IdG1sIiwidGh1bWJMaXN0IiwiJHRodW1iIiwibGdab29tIiwiem9vbVNldHRpbmdzIiwiem9vbSIsImFjdHVhbFNpemUiLCJzaG93Wm9vbUluT3V0SWNvbnMiLCJhY3R1YWxTaXplSWNvbnMiLCJ6b29tSW4iLCJ6b29tT3V0IiwiZW5hYmxlWm9vbUFmdGVyIiwiem9vbVBsdWdpblN0cmluZ3MiLCJ2aWV3QWN0dWFsU2l6ZSIsIlpvb20iLCJidWlsZFRlbXBsYXRlcyIsInpvb21JY29ucyIsImVuYWJsZVpvb20iLCJ6b29tYWJsZVRpbWVvdXQiLCJpc0ltYWdlU2xpZGUiLCJzZXRab29tRXNzZW50aWFscyIsImVuYWJsZVpvb21PblNsaWRlSXRlbUxvYWQiLCJnZXRNb2RpZmllciIsInJvdGF0ZVZhbHVlIiwiYXhpcyIsIm9yaWdpbmFsUm90YXRlIiwidHJhbnNmb3JtVmFsdWVzIiwiZ2V0Q3VycmVudFRyYW5zZm9ybSIsIm1vZGlmaWVyIiwiZmxpcEhvcml6b250YWxWYWx1ZSIsInNpZ24iLCJmbGlwVmVydGljYWxWYWx1ZSIsInNpblgiLCJzaW5NaW51c1giLCJnZXRJbWFnZVNpemUiLCIkaW1hZ2UiLCJpbWFnZVNpemVzIiwiZ2V0RHJhZ0NvcmRzIiwiZ2V0U3dpcGVDb3JkcyIsImdldERyYWdBbGxvd2VkQXhpc2VzIiwiYWxsb3dZIiwiaW1hZ2VZU2l6ZSIsImFsbG93WCIsImltYWdlWFNpemUiLCJzdCIsInRtIiwiZ2V0UHJvcGVydHlWYWx1ZSIsImdldEN1cnJlbnRSb3RhdGlvbiIsInZhbHVlcyIsInJvdW5kIiwiYXRhbjIiLCJQSSIsInJvdGF0ZUVsIiwibW9kaWZpZXJYIiwibW9kaWZpZXJZIiwiem9vbUltYWdlIiwib2Zmc2V0WCIsInRvcEJvdHRvbVNwYWNpbmciLCJvZmZzZXRZIiwib3JpZ2luYWxYIiwib3JpZ2luYWxZIiwicG9zaXRpb25DaGFuZ2VkIiwiZHJhZ0FsbG93ZWRBeGlzZXMiLCJwb3NzaWJsZVN3aXBlQ29yZHMiLCJnZXRQb3NzaWJsZVN3aXBlRHJhZ0NvcmRzIiwiX3giLCJfeSIsImlzQmV5b25kUG9zc2libGVMZWZ0IiwibWluWCIsImlzQmV5b25kUG9zc2libGVSaWdodCIsIm1heFgiLCJpc0JleW9uZFBvc3NpYmxlVG9wIiwibWluWSIsImlzQmV5b25kUG9zc2libGVCb3R0b20iLCJtYXhZIiwic2V0Wm9vbVN0eWxlcyIsIiRkdW1teUltYWdlIiwiJGltYWdlV3JhcCIsInNldEFjdHVhbFNpemUiLCJnZXRDdXJyZW50SW1hZ2VBY3R1YWxTaXplU2NhbGUiLCJnZXRTY2FsZSIsInNldFBhZ2VDb3JkcyIsImJlZ2luWm9vbSIsImdldE5hdHVyYWxXaWR0aCIsImdldEFjdHVhbFNpemVTY2FsZSIsIl9zY2FsZSIsImdldFBhZ2VDb3JkcyIsInBhZ2VDb3JkcyIsIiRhY3R1YWxTaXplIiwicmVzZXRab29tIiwiYWN0dWFsU2l6ZVNjYWxlIiwidGFwcGVkIiwiem9vbURyYWciLCJwaW5jaFpvb20iLCJ6b29tU3dpcGUiLCJnZXRUb3VjaERpc3RhbmNlIiwic3FydCIsInN0YXJ0RGlzdCIsInBpbmNoU3RhcnRlZCIsImluaXRTY2FsZSIsImVuZERpc3QiLCJ0b3VjaGVuZFpvb20iLCJkaXN0YW5jZVluZXciLCJzcGVlZFkiLCJfTEdlbCIsInNldFpvb21Td2lwZVN0eWxlcyIsImdldFpvb21Td2lwZUNvcmRzIiwiZGlmZk1pblkiLCJkaWZmTWF4WSIsImRpZmZNaW5YIiwiZGlmTWF4WCIsImRhdGFTY2FsZSIsImVsRGF0YVNjYWxlIiwibGdWaWRlbyIsInZpZGVvU2V0dGluZ3MiLCJhdXRvcGxheUZpcnN0VmlkZW8iLCJ5b3VUdWJlUGxheWVyUGFyYW1zIiwidmltZW9QbGF5ZXJQYXJhbXMiLCJ3aXN0aWFQbGF5ZXJQYXJhbXMiLCJnb3RvTmV4dFNsaWRlT25WaWRlb0VuZCIsImF1dG9wbGF5VmlkZW9PblNsaWRlIiwidmlkZW9qcyIsInZpZGVvanNPcHRpb25zIiwicGFyYW0iLCJvYmoiLCJlbmNvZGVVUklDb21wb25lbnQiLCJqb2luIiwiZ2V0VmltZW9VUkxQYXJhbXMiLCJkZWZhdWx0UGFyYW1zIiwidXJsUGFyYW1zIiwiZGVmYXVsdFBsYXllclBhcmFtcyIsIlZpZGVvIiwib25IYXNWaWRlbyIsImxvYWRWaWRlb09uUG9zdGVyQ2xpY2siLCJvblNsaWRlSXRlbUxvYWQiLCJvbkJlZm9yZVNsaWRlIiwib25BZnRlclNsaWRlIiwibG9hZEFuZFBsYXlWaWRlbyIsImFwcGVuZFZpZGVvcyIsInBhdXNlVmlkZW8iLCJjb250cm9sVmlkZW8iLCJnZXRWaWRlb0h0bWwiLCJ2aWRlb1RpdGxlIiwiY29tbW9uSWZyYW1lUHJvcHMiLCJ2aWRlb0lkIiwic2xpZGVVcmxQYXJhbXMiLCJwbGF5ZXJQYXJhbXMiLCJ3aXN0aWFJZCIsImh0bWw1VmlkZW9NYXJrdXAiLCJ0eXBlIiwidHJhY2tzIiwidHJhY2tBdHRyaWJ1dGVzIiwidHJhY2siLCJodG1sNVZpZGVvQXR0cnNfMSIsInZpZGVvQXR0cmlidXRlc18xIiwidmlkZW9QYXJhbXMiLCJ2aWRlb0h0bWwiLCIkdmlkZW9FbGVtZW50IiwiVmltZW8iLCJQbGF5ZXIiLCJfd3EiLCJvblJlYWR5IiwiYWN0aW9uIiwiY29udGVudFdpbmRvdyIsInBvc3RNZXNzYWdlIiwiZm9yY2VQbGF5IiwiX2h0bWwiLCJ2aWRlb0pzUGxheWVyXzEiLCIkdGVtcEltZyIsInJlYWR5Iiwib25WaWRlb0xvYWRBZnRlclBvc3RlckNsaWNrIiwibGdSb3RhdGUiLCJyb3RhdGVTZXR0aW5ncyIsInJvdGF0ZSIsInJvdGF0ZVNwZWVkIiwicm90YXRlUGx1Z2luU3RyaW5ncyIsIlJvdGF0ZSIsInJvdGF0ZUljb25zIiwicm90YXRlVmFsdWVzTGlzdCIsImltYWdlV3JhcCIsImFwcGx5U3R5bGVzIiwidHJpZ2dlckV2ZW50cyIsImFuZ2xlIiwiY3VycmVudFJvdGF0aW9uIiwicm90YXRlQXhpcyIsImlzSW1hZ2VPcmllbnRhdGlvbkNoYW5nZWQiLCJpc1JvdGF0ZWQiLCJpZkZsaXBwZWRIb3IiLCJpZkZsaXBwZWRWZXIiLCJyYWl5c19nZXRfZm9ybV9kYXRhIiwiZm9ybV9lbGUiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiZmQiLCJmcm9tIiwiZW50cmllcyIsInJlZHVjZSIsIm1lbW8iLCJwYWlyIiwiX29iamVjdFNwcmVhZCIsIl9kZWZpbmVQcm9wZXJ0eSIsInJhaXlzX3B1c2hfaGlzdG9yeSIsInNlYXJjaFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsInN0cnBhdGgiLCJpdCIsInNldCIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJyYWlfeXNwX2FwaSIsImNhbGxfYXBpIiwicGF0aCIsInBhc3NpbmdfZGF0YSIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZURhdGEiLCJyZXNwb25zZVRleHQiLCJfcXVlc3Rpb25NYXJrIiwib3BlbiIsInJhaV95YWNodF9zeW5jIiwid3BfcmVzdF91cmwiLCJzZW5kIiwic2V0UmVxdWVzdEhlYWRlciIsInN0cmluZ2lmeSIsInlzcF90ZW1wbGF0ZXMiLCJ5YWNodCIsImdyaWQiLCJ2ZXNzZWwiLCJtZXRlcnMiLCJMZW5ndGhPdmVyYWxsIiwicHJpY2UiLCJQcmljZSIsImV1cm9wZV9vcHRpb25fcGlja2VkIiwidG9GaXhlZCIsImNvbmNhdCIsIkludGwiLCJOdW1iZXJGb3JtYXQiLCJtaW5pbXVtRnJhY3Rpb25EaWdpdHMiLCJmb3JtYXQiLCJldXJvX2NfYyIsIkltYWdlcyIsIlVyaSIsIk1vZGVsWWVhciIsIk1ha2VTdHJpbmciLCJNb2RlbCIsIkJvYXROYW1lIiwiQ2FiaW5zQ291bnROdW1lcmljIiwiX2xpbmsiLCJsaXN0Iiwibm9SZXN1bHRzIiwieXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyIiwiZGF0YV9yZXN1bHQiLCJtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMiLCJ0b3RhbCIsInJlc3VsdHMiLCJ2aWV3IiwicGFnZV9pbmRleCIsImZvcm1EYXRhT2JqZWN0IiwibG9nIiwieWFjaHRTZWFyY2hBbmRSZXN1bHRzIiwiZWVlZSIsImZvcm0iLCJVUkxSRUYiLCJVUkwiLCJsb2NhdGlvbiIsImhyZWYiLCJmb3JtSW5wdXRzIiwiZWxlIiwiaW5wdXQiLCJ1cmxWYWwiLCJjaGVja2VkIiwiRmlsbExpc3RzIiwibGlzdEVsZW1lbnRzIiwibGFiZWxzIiwick9wdGlvbnMiLCJfbG9vcDIiLCJTZWxlY3RvckVsZSIsImIiLCJvcHRpb24iLCJGaWxsT3B0aW9ucyIsInNlbGVjdG9yRWxlbWVudHMiLCJfbG9vcDMiLCJVcmxWYWwiLCJmb3JtcyIsImZFbGUiLCJzdWNjZXNzTWVzc2FnZSIsImRpc3BsYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUEsVUFBQUEsQ0FBQSxFQUFBO0VBRUEsSUFBQUMsT0FBQSxHQUFBO0lBQ0FDLElBQUEsRUFBQSxT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LGNBQUEsQ0FBQXh1QixLQUFBLENBQUF5dUIsT0FBQSxHQUFBLE9BQUE7UUFFQTNqQixPQUFBLENBQUEraEIsR0FBQSxDQUFBLHdCQUFBLENBQUE7UUFDQXRzQixDQUFBLENBQUFpVyxNQUFBLENBQUF4VyxLQUFBLENBQUF5dUIsT0FBQSxHQUFBLE1BQUE7TUFDQSxDQUFBLENBQUEsU0FDQSxDQUFBLFVBQUExNEIsS0FBQSxFQUFBO1FBQ0ErVSxPQUFBLENBQUEraEIsR0FBQSxDQUFBOTJCLEtBQUEsQ0FBQTtNQUNBLENBQUEsQ0FBQTtJQUNBLENBQUEsQ0FBQTtFQUNBLENBQUEsQ0FBQTtBQUNBLENBQUEsQ0FBQSIsImZpbGUiOiJnbG9iYWxQbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgLyoqXG4qIHNpbXBsZVBhZ2luYXRpb24uanMgdjEuNlxuKiBBIHNpbXBsZSBqUXVlcnkgcGFnaW5hdGlvbiBwbHVnaW4uXG4qIGh0dHA6Ly9mbGF2aXVzbWF0aXMuZ2l0aHViLmNvbS9zaW1wbGVQYWdpbmF0aW9uLmpzL1xuKlxuKiBDb3B5cmlnaHQgMjAxMiwgRmxhdml1cyBNYXRpc1xuKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4qIGh0dHA6Ly9mbGF2aXVzbWF0aXMuZ2l0aHViLmNvbS9saWNlbnNlLmh0bWxcbiovXG5cbihmdW5jdGlvbigkKXtcblxuXHR2YXIgbWV0aG9kcyA9IHtcblx0XHRpbml0OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cdFx0XHR2YXIgbyA9ICQuZXh0ZW5kKHtcblx0XHRcdFx0aXRlbXM6IDEsXG5cdFx0XHRcdGl0ZW1zT25QYWdlOiAxLFxuXHRcdFx0XHRwYWdlczogMCxcblx0XHRcdFx0ZGlzcGxheWVkUGFnZXM6IDUsXG5cdFx0XHRcdGVkZ2VzOiAyLFxuXHRcdFx0XHRjdXJyZW50UGFnZTogMCxcblx0XHRcdFx0dXNlQW5jaG9yczogdHJ1ZSxcblx0XHRcdFx0aHJlZlRleHRQcmVmaXg6ICcjcGFnZS0nLFxuXHRcdFx0XHRocmVmVGV4dFN1ZmZpeDogJycsXG5cdFx0XHRcdHByZXZUZXh0OiAnUHJldicsXG5cdFx0XHRcdG5leHRUZXh0OiAnTmV4dCcsXG5cdFx0XHRcdGVsbGlwc2VUZXh0OiAnJmhlbGxpcDsnLFxuXHRcdFx0XHRlbGxpcHNlUGFnZVNldDogdHJ1ZSxcblx0XHRcdFx0Y3NzU3R5bGU6ICdsaWdodC10aGVtZScsXG5cdFx0XHRcdGxpc3RTdHlsZTogJycsXG5cdFx0XHRcdGxhYmVsTWFwOiBbXSxcblx0XHRcdFx0c2VsZWN0T25DbGljazogdHJ1ZSxcblx0XHRcdFx0bmV4dEF0RnJvbnQ6IGZhbHNlLFxuXHRcdFx0XHRpbnZlcnRQYWdlT3JkZXI6IGZhbHNlLFxuXHRcdFx0XHR1c2VTdGFydEVkZ2UgOiB0cnVlLFxuXHRcdFx0XHR1c2VFbmRFZGdlIDogdHJ1ZSxcblx0XHRcdFx0b25QYWdlQ2xpY2s6IGZ1bmN0aW9uKHBhZ2VOdW1iZXIsIGV2ZW50KSB7XG5cdFx0XHRcdFx0Ly8gQ2FsbGJhY2sgdHJpZ2dlcmVkIHdoZW4gYSBwYWdlIGlzIGNsaWNrZWRcblx0XHRcdFx0XHQvLyBQYWdlIG51bWJlciBpcyBnaXZlbiBhcyBhbiBvcHRpb25hbCBwYXJhbWV0ZXJcblx0XHRcdFx0fSxcblx0XHRcdFx0b25Jbml0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQvLyBDYWxsYmFjayB0cmlnZ2VyZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgaW5pdGlhbGl6YXRpb25cblx0XHRcdFx0fVxuXHRcdFx0fSwgb3B0aW9ucyB8fCB7fSk7XG5cblx0XHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdFx0by5wYWdlcyA9IG8ucGFnZXMgPyBvLnBhZ2VzIDogTWF0aC5jZWlsKG8uaXRlbXMgLyBvLml0ZW1zT25QYWdlKSA/IE1hdGguY2VpbChvLml0ZW1zIC8gby5pdGVtc09uUGFnZSkgOiAxO1xuXHRcdFx0aWYgKG8uY3VycmVudFBhZ2UpXG5cdFx0XHRcdG8uY3VycmVudFBhZ2UgPSBvLmN1cnJlbnRQYWdlIC0gMTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0by5jdXJyZW50UGFnZSA9ICFvLmludmVydFBhZ2VPcmRlciA/IDAgOiBvLnBhZ2VzIC0gMTtcblx0XHRcdG8uaGFsZkRpc3BsYXllZCA9IG8uZGlzcGxheWVkUGFnZXMgLyAyO1xuXG5cdFx0XHR0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuYWRkQ2xhc3Moby5jc3NTdHlsZSArICcgc2ltcGxlLXBhZ2luYXRpb24nKS5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbChzZWxmKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRvLm9uSW5pdCgpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0c2VsZWN0UGFnZTogZnVuY3Rpb24ocGFnZSkge1xuXHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIHBhZ2UgLSAxKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRwcmV2UGFnZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA+IDApIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSAtIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA8IG8ucGFnZXMgLSAxKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgKyAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdG5leHRQYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlIDwgby5wYWdlcyAtIDEpIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA+IDApIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSAtIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Z2V0UGFnZXNDb3VudDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJykucGFnZXM7XG5cdFx0fSxcblxuXHRcdHNldFBhZ2VzQ291bnQ6IGZ1bmN0aW9uKGNvdW50KSB7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5wYWdlcyA9IGNvdW50O1xuXHRcdH0sXG5cblx0XHRnZXRDdXJyZW50UGFnZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLmN1cnJlbnRQYWdlICsgMTtcblx0XHR9LFxuXG5cdFx0ZGVzdHJveTogZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuZW1wdHkoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRkcmF3UGFnZTogZnVuY3Rpb24gKHBhZ2UpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmN1cnJlbnRQYWdlID0gcGFnZSAtIDE7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRyZWRyYXc6IGZ1bmN0aW9uKCl7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0ZGlzYWJsZTogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGVuYWJsZTogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHR1cGRhdGVJdGVtczogZnVuY3Rpb24gKG5ld0l0ZW1zKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5pdGVtcyA9IG5ld0l0ZW1zO1xuXHRcdFx0by5wYWdlcyA9IG1ldGhvZHMuX2dldFBhZ2VzKG8pO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZUl0ZW1zT25QYWdlOiBmdW5jdGlvbiAoaXRlbXNPblBhZ2UpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLml0ZW1zT25QYWdlID0gaXRlbXNPblBhZ2U7XG5cdFx0XHRvLnBhZ2VzID0gbWV0aG9kcy5fZ2V0UGFnZXMobyk7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCAwKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRnZXRJdGVtc09uUGFnZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJykuaXRlbXNPblBhZ2U7XG5cdFx0fSxcblxuXHRcdF9kcmF3OiBmdW5jdGlvbigpIHtcblx0XHRcdHZhclx0byA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLFxuXHRcdFx0XHRpbnRlcnZhbCA9IG1ldGhvZHMuX2dldEludGVydmFsKG8pLFxuXHRcdFx0XHRpLFxuXHRcdFx0XHR0YWdOYW1lO1xuXG5cdFx0XHRtZXRob2RzLmRlc3Ryb3kuY2FsbCh0aGlzKTtcblxuXHRcdFx0dGFnTmFtZSA9ICh0eXBlb2YgdGhpcy5wcm9wID09PSAnZnVuY3Rpb24nKSA/IHRoaXMucHJvcCgndGFnTmFtZScpIDogdGhpcy5hdHRyKCd0YWdOYW1lJyk7XG5cblx0XHRcdHZhciAkcGFuZWwgPSB0YWdOYW1lID09PSAnVUwnID8gdGhpcyA6ICQoJzx1bCcgKyAoby5saXN0U3R5bGUgPyAnIGNsYXNzPVwiJyArIG8ubGlzdFN0eWxlICsgJ1wiJyA6ICcnKSArICc+PC91bD4nKS5hcHBlbmRUbyh0aGlzKTtcblxuXHRcdFx0Ly8gR2VuZXJhdGUgUHJldiBsaW5rXG5cdFx0XHRpZiAoby5wcmV2VGV4dCkge1xuXHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgIW8uaW52ZXJ0UGFnZU9yZGVyID8gby5jdXJyZW50UGFnZSAtIDEgOiBvLmN1cnJlbnRQYWdlICsgMSwge3RleHQ6IG8ucHJldlRleHQsIGNsYXNzZXM6ICdwcmV2J30pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBOZXh0IGxpbmsgKGlmIG9wdGlvbiBzZXQgZm9yIGF0IGZyb250KVxuXHRcdFx0aWYgKG8ubmV4dFRleHQgJiYgby5uZXh0QXRGcm9udCkge1xuXHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgIW8uaW52ZXJ0UGFnZU9yZGVyID8gby5jdXJyZW50UGFnZSArIDEgOiBvLmN1cnJlbnRQYWdlIC0gMSwge3RleHQ6IG8ubmV4dFRleHQsIGNsYXNzZXM6ICduZXh0J30pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBzdGFydCBlZGdlc1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuc3RhcnQgPiAwICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYoby51c2VTdGFydEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBlbmQgPSBNYXRoLm1pbihvLmVkZ2VzLCBpbnRlcnZhbC5zdGFydCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgZW5kOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoby5lZGdlcyA8IGludGVydmFsLnN0YXJ0ICYmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIG8uZWRnZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGludGVydmFsLmVuZCA8IG8ucGFnZXMgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZihvLnVzZVN0YXJ0RWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGJlZ2luID0gTWF0aC5tYXgoby5wYWdlcyAtIG8uZWRnZXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSBvLnBhZ2VzIC0gMTsgaSA+PSBiZWdpbjsgaS0tKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoby5wYWdlcyAtIG8uZWRnZXMgPiBpbnRlcnZhbC5lbmQgJiYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIGludGVydmFsIGxpbmtzXG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGZvciAoaSA9IGludGVydmFsLnN0YXJ0OyBpIDwgaW50ZXJ2YWwuZW5kOyBpKyspIHtcblx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAoaSA9IGludGVydmFsLmVuZCAtIDE7IGkgPj0gaW50ZXJ2YWwuc3RhcnQ7IGktLSkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBlbmQgZWRnZXNcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKGludGVydmFsLmVuZCA8IG8ucGFnZXMgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZiAoby5wYWdlcyAtIG8uZWRnZXMgPiBpbnRlcnZhbC5lbmQgJiYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKG8udXNlRW5kRWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGJlZ2luID0gTWF0aC5tYXgoby5wYWdlcyAtIG8uZWRnZXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSBiZWdpbjsgaSA8IG8ucGFnZXM7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuc3RhcnQgPiAwICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYgKG8uZWRnZXMgPCBpbnRlcnZhbC5zdGFydCAmJiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBvLmVkZ2VzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihvLnVzZUVuZEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBlbmQgPSBNYXRoLm1pbihvLmVkZ2VzLCBpbnRlcnZhbC5zdGFydCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSBlbmQgLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIE5leHQgbGluayAodW5sZXNzIG9wdGlvbiBpcyBzZXQgZm9yIGF0IGZyb250KVxuXHRcdFx0aWYgKG8ubmV4dFRleHQgJiYgIW8ubmV4dEF0RnJvbnQpIHtcblx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsICFvLmludmVydFBhZ2VPcmRlciA/IG8uY3VycmVudFBhZ2UgKyAxIDogby5jdXJyZW50UGFnZSAtIDEsIHt0ZXh0OiBvLm5leHRUZXh0LCBjbGFzc2VzOiAnbmV4dCd9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG8uZWxsaXBzZVBhZ2VTZXQgJiYgIW8uZGlzYWJsZWQpIHtcblx0XHRcdFx0bWV0aG9kcy5fZWxsaXBzZUNsaWNrLmNhbGwodGhpcywgJHBhbmVsKTtcblx0XHRcdH1cblxuXHRcdH0sXG5cblx0XHRfZ2V0UGFnZXM6IGZ1bmN0aW9uKG8pIHtcblx0XHRcdHZhciBwYWdlcyA9IE1hdGguY2VpbChvLml0ZW1zIC8gby5pdGVtc09uUGFnZSk7XG5cdFx0XHRyZXR1cm4gcGFnZXMgfHwgMTtcblx0XHR9LFxuXG5cdFx0X2dldEludGVydmFsOiBmdW5jdGlvbihvKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRzdGFydDogTWF0aC5jZWlsKG8uY3VycmVudFBhZ2UgPiBvLmhhbGZEaXNwbGF5ZWQgPyBNYXRoLm1heChNYXRoLm1pbihvLmN1cnJlbnRQYWdlIC0gby5oYWxmRGlzcGxheWVkLCAoby5wYWdlcyAtIG8uZGlzcGxheWVkUGFnZXMpKSwgMCkgOiAwKSxcblx0XHRcdFx0ZW5kOiBNYXRoLmNlaWwoby5jdXJyZW50UGFnZSA+IG8uaGFsZkRpc3BsYXllZCA/IE1hdGgubWluKG8uY3VycmVudFBhZ2UgKyBvLmhhbGZEaXNwbGF5ZWQsIG8ucGFnZXMpIDogTWF0aC5taW4oby5kaXNwbGF5ZWRQYWdlcywgby5wYWdlcykpXG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRfYXBwZW5kSXRlbTogZnVuY3Rpb24ocGFnZUluZGV4LCBvcHRzKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsIG9wdGlvbnMsICRsaW5rLCBvID0gc2VsZi5kYXRhKCdwYWdpbmF0aW9uJyksICRsaW5rV3JhcHBlciA9ICQoJzxsaT48L2xpPicpLCAkdWwgPSBzZWxmLmZpbmQoJ3VsJyk7XG5cblx0XHRcdHBhZ2VJbmRleCA9IHBhZ2VJbmRleCA8IDAgPyAwIDogKHBhZ2VJbmRleCA8IG8ucGFnZXMgPyBwYWdlSW5kZXggOiBvLnBhZ2VzIC0gMSk7XG5cblx0XHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRcdHRleHQ6IHBhZ2VJbmRleCArIDEsXG5cdFx0XHRcdGNsYXNzZXM6ICcnXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoby5sYWJlbE1hcC5sZW5ndGggJiYgby5sYWJlbE1hcFtwYWdlSW5kZXhdKSB7XG5cdFx0XHRcdG9wdGlvbnMudGV4dCA9IG8ubGFiZWxNYXBbcGFnZUluZGV4XTtcblx0XHRcdH1cblxuXHRcdFx0b3B0aW9ucyA9ICQuZXh0ZW5kKG9wdGlvbnMsIG9wdHMgfHwge30pO1xuXG5cdFx0XHRpZiAocGFnZUluZGV4ID09IG8uY3VycmVudFBhZ2UgfHwgby5kaXNhYmxlZCkge1xuXHRcdFx0XHRpZiAoby5kaXNhYmxlZCB8fCBvcHRpb25zLmNsYXNzZXMgPT09ICdwcmV2JyB8fCBvcHRpb25zLmNsYXNzZXMgPT09ICduZXh0Jykge1xuXHRcdFx0XHRcdCRsaW5rV3JhcHBlci5hZGRDbGFzcygnZGlzYWJsZWQnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkbGlua1dyYXBwZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCRsaW5rID0gJCgnPHNwYW4gY2xhc3M9XCJjdXJyZW50XCI+JyArIChvcHRpb25zLnRleHQpICsgJzwvc3Bhbj4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvLnVzZUFuY2hvcnMpIHtcblx0XHRcdFx0XHQkbGluayA9ICQoJzxhIGhyZWY9XCInICsgby5ocmVmVGV4dFByZWZpeCArIChwYWdlSW5kZXggKyAxKSArIG8uaHJlZlRleHRTdWZmaXggKyAnXCIgY2xhc3M9XCJwYWdlLWxpbmtcIj4nICsgKG9wdGlvbnMudGV4dCkgKyAnPC9hPicpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRsaW5rID0gJCgnPHNwYW4gPicgKyAob3B0aW9ucy50ZXh0KSArICc8L3NwYW4+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JGxpbmsuY2xpY2soZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0XHRcdHJldHVybiBtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwoc2VsZiwgcGFnZUluZGV4LCBldmVudCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3B0aW9ucy5jbGFzc2VzKSB7XG5cdFx0XHRcdCRsaW5rLmFkZENsYXNzKG9wdGlvbnMuY2xhc3Nlcyk7XG5cdFx0XHR9XG5cblx0XHRcdCRsaW5rV3JhcHBlci5hcHBlbmQoJGxpbmspO1xuXG5cdFx0XHRpZiAoJHVsLmxlbmd0aCkge1xuXHRcdFx0XHQkdWwuYXBwZW5kKCRsaW5rV3JhcHBlcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZWxmLmFwcGVuZCgkbGlua1dyYXBwZXIpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfc2VsZWN0UGFnZTogZnVuY3Rpb24ocGFnZUluZGV4LCBldmVudCkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uY3VycmVudFBhZ2UgPSBwYWdlSW5kZXg7XG5cdFx0XHRpZiAoby5zZWxlY3RPbkNsaWNrKSB7XG5cdFx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvLm9uUGFnZUNsaWNrKHBhZ2VJbmRleCArIDEsIGV2ZW50KTtcblx0XHR9LFxuXG5cblx0XHRfZWxsaXBzZUNsaWNrOiBmdW5jdGlvbigkcGFuZWwpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdFx0byA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLFxuXHRcdFx0XHQkZWxsaXAgPSAkcGFuZWwuZmluZCgnLmVsbGlwc2UnKTtcblx0XHRcdCRlbGxpcC5hZGRDbGFzcygnY2xpY2thYmxlJykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0XHQkZWxsaXAuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0aWYgKCFvLmRpc2FibGUpIHtcblx0XHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxuXHRcdFx0XHRcdFx0dmFsID0gKHBhcnNlSW50KCR0aGlzLnBhcmVudCgpLnByZXYoKS50ZXh0KCksIDEwKSB8fCAwKSArIDE7XG5cdFx0XHRcdFx0JHRoaXNcblx0XHRcdFx0XHRcdC5odG1sKCc8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjFcIiBtYXg9XCInICsgby5wYWdlcyArICdcIiBzdGVwPVwiMVwiIHZhbHVlPVwiJyArIHZhbCArICdcIj4nKVxuXHRcdFx0XHRcdFx0LmZpbmQoJ2lucHV0Jylcblx0XHRcdFx0XHRcdC5mb2N1cygpXG5cdFx0XHRcdFx0XHQuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0Ly8gcHJldmVudCBpbnB1dCBudW1iZXIgYXJyb3dzIGZyb20gYnViYmxpbmcgYSBjbGljayBldmVudCBvbiAkZWxsaXBcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmtleXVwKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAoZXZlbnQud2hpY2ggPT09IDEzICYmIHZhbCAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBlbnRlciB0byBhY2NlcHRcblx0XHRcdFx0XHRcdFx0XHRpZiAoKHZhbD4wKSYmKHZhbDw9by5wYWdlcykpXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHNlbGYsIHZhbCAtIDEpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09PSAyNykge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGVzY2FwZSB0byBjYW5jZWxcblx0XHRcdFx0XHRcdFx0XHQkZWxsaXAuZW1wdHkoKS5odG1sKG8uZWxsaXBzZVRleHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmJpbmQoJ2JsdXInLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblx0XHRcdFx0XHRcdFx0aWYgKHZhbCAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwoc2VsZiwgdmFsIC0gMSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0JGVsbGlwLmVtcHR5KCkuaHRtbChvLmVsbGlwc2VUZXh0KTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH07XG5cblx0JC5mbi5wYWdpbmF0aW9uID0gZnVuY3Rpb24obWV0aG9kKSB7XG5cblx0XHQvLyBNZXRob2QgY2FsbGluZyBsb2dpY1xuXHRcdGlmIChtZXRob2RzW21ldGhvZF0gJiYgbWV0aG9kLmNoYXJBdCgwKSAhPSAnXycpIHtcblx0XHRcdHJldHVybiBtZXRob2RzW21ldGhvZF0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQuZXJyb3IoJ01ldGhvZCAnICsgIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LnBhZ2luYXRpb24nKTtcblx0XHR9XG5cblx0fTtcblxufSkoalF1ZXJ5KTsiLCIvKiFcbiAqIGxpZ2h0Z2FsbGVyeSB8IDIuNC4wLWJldGEuMCB8IERlY2VtYmVyIDEydGggMjAyMVxuICogaHR0cDovL3d3dy5saWdodGdhbGxlcnlqcy5jb20vXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgU2FjaGluIE5lcmF2YXRoO1xuICogQGxpY2Vuc2UgR1BMdjNcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5saWdodEdhbGxlcnkgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICAvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuICAgIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG4gICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuICAgIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuICAgIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG4gICAgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG4gICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbiAgICBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG4gICAgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG4gICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgICAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIExpc3Qgb2YgbGlnaHRHYWxsZXJ5IGV2ZW50c1xyXG4gICAgICogQWxsIGV2ZW50cyBzaG91bGQgYmUgZG9jdW1lbnRlZCBoZXJlXHJcbiAgICAgKiBCZWxvdyBpbnRlcmZhY2VzIGFyZSB1c2VkIHRvIGJ1aWxkIHRoZSB3ZWJzaXRlIGRvY3VtZW50YXRpb25zXHJcbiAgICAgKiAqL1xyXG4gICAgdmFyIGxHRXZlbnRzID0ge1xyXG4gICAgICAgIGFmdGVyQXBwZW5kU2xpZGU6ICdsZ0FmdGVyQXBwZW5kU2xpZGUnLFxyXG4gICAgICAgIGluaXQ6ICdsZ0luaXQnLFxyXG4gICAgICAgIGhhc1ZpZGVvOiAnbGdIYXNWaWRlbycsXHJcbiAgICAgICAgY29udGFpbmVyUmVzaXplOiAnbGdDb250YWluZXJSZXNpemUnLFxyXG4gICAgICAgIHVwZGF0ZVNsaWRlczogJ2xnVXBkYXRlU2xpZGVzJyxcclxuICAgICAgICBhZnRlckFwcGVuZFN1Ykh0bWw6ICdsZ0FmdGVyQXBwZW5kU3ViSHRtbCcsXHJcbiAgICAgICAgYmVmb3JlT3BlbjogJ2xnQmVmb3JlT3BlbicsXHJcbiAgICAgICAgYWZ0ZXJPcGVuOiAnbGdBZnRlck9wZW4nLFxyXG4gICAgICAgIHNsaWRlSXRlbUxvYWQ6ICdsZ1NsaWRlSXRlbUxvYWQnLFxyXG4gICAgICAgIGJlZm9yZVNsaWRlOiAnbGdCZWZvcmVTbGlkZScsXHJcbiAgICAgICAgYWZ0ZXJTbGlkZTogJ2xnQWZ0ZXJTbGlkZScsXHJcbiAgICAgICAgcG9zdGVyQ2xpY2s6ICdsZ1Bvc3RlckNsaWNrJyxcclxuICAgICAgICBkcmFnU3RhcnQ6ICdsZ0RyYWdTdGFydCcsXHJcbiAgICAgICAgZHJhZ01vdmU6ICdsZ0RyYWdNb3ZlJyxcclxuICAgICAgICBkcmFnRW5kOiAnbGdEcmFnRW5kJyxcclxuICAgICAgICBiZWZvcmVOZXh0U2xpZGU6ICdsZ0JlZm9yZU5leHRTbGlkZScsXHJcbiAgICAgICAgYmVmb3JlUHJldlNsaWRlOiAnbGdCZWZvcmVQcmV2U2xpZGUnLFxyXG4gICAgICAgIGJlZm9yZUNsb3NlOiAnbGdCZWZvcmVDbG9zZScsXHJcbiAgICAgICAgYWZ0ZXJDbG9zZTogJ2xnQWZ0ZXJDbG9zZScsXHJcbiAgICAgICAgcm90YXRlTGVmdDogJ2xnUm90YXRlTGVmdCcsXHJcbiAgICAgICAgcm90YXRlUmlnaHQ6ICdsZ1JvdGF0ZVJpZ2h0JyxcclxuICAgICAgICBmbGlwSG9yaXpvbnRhbDogJ2xnRmxpcEhvcml6b250YWwnLFxyXG4gICAgICAgIGZsaXBWZXJ0aWNhbDogJ2xnRmxpcFZlcnRpY2FsJyxcclxuICAgICAgICBhdXRvcGxheTogJ2xnQXV0b3BsYXknLFxyXG4gICAgICAgIGF1dG9wbGF5U3RhcnQ6ICdsZ0F1dG9wbGF5U3RhcnQnLFxyXG4gICAgICAgIGF1dG9wbGF5U3RvcDogJ2xnQXV0b3BsYXlTdG9wJyxcclxuICAgIH07XG5cbiAgICB2YXIgbGlnaHRHYWxsZXJ5Q29yZVNldHRpbmdzID0ge1xyXG4gICAgICAgIG1vZGU6ICdsZy1zbGlkZScsXHJcbiAgICAgICAgZWFzaW5nOiAnZWFzZScsXHJcbiAgICAgICAgc3BlZWQ6IDQwMCxcclxuICAgICAgICBsaWNlbnNlS2V5OiAnMDAwMC0wMDAwLTAwMC0wMDAwJyxcclxuICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgIGFkZENsYXNzOiAnJyxcclxuICAgICAgICBzdGFydENsYXNzOiAnbGctc3RhcnQtem9vbScsXHJcbiAgICAgICAgYmFja2Ryb3BEdXJhdGlvbjogMzAwLFxyXG4gICAgICAgIGNvbnRhaW5lcjogJycsXHJcbiAgICAgICAgc3RhcnRBbmltYXRpb25EdXJhdGlvbjogNDAwLFxyXG4gICAgICAgIHpvb21Gcm9tT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIGhpZGVCYXJzRGVsYXk6IDAsXHJcbiAgICAgICAgc2hvd0JhcnNBZnRlcjogMTAwMDAsXHJcbiAgICAgICAgc2xpZGVEZWxheTogMCxcclxuICAgICAgICBzdXBwb3J0TGVnYWN5QnJvd3NlcjogdHJ1ZSxcclxuICAgICAgICBhbGxvd01lZGlhT3ZlcmxhcDogZmFsc2UsXHJcbiAgICAgICAgdmlkZW9NYXhTaXplOiAnMTI4MC03MjAnLFxyXG4gICAgICAgIGxvYWRZb3VUdWJlUG9zdGVyOiB0cnVlLFxyXG4gICAgICAgIGRlZmF1bHRDYXB0aW9uSGVpZ2h0OiAwLFxyXG4gICAgICAgIGFyaWFMYWJlbGxlZGJ5OiAnJyxcclxuICAgICAgICBhcmlhRGVzY3JpYmVkYnk6ICcnLFxyXG4gICAgICAgIGNsb3NhYmxlOiB0cnVlLFxyXG4gICAgICAgIHN3aXBlVG9DbG9zZTogdHJ1ZSxcclxuICAgICAgICBjbG9zZU9uVGFwOiB0cnVlLFxyXG4gICAgICAgIHNob3dDbG9zZUljb246IHRydWUsXHJcbiAgICAgICAgc2hvd01heGltaXplSWNvbjogZmFsc2UsXHJcbiAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICBlc2NLZXk6IHRydWUsXHJcbiAgICAgICAga2V5UHJlc3M6IHRydWUsXHJcbiAgICAgICAgY29udHJvbHM6IHRydWUsXHJcbiAgICAgICAgc2xpZGVFbmRBbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgaGlkZUNvbnRyb2xPbkVuZDogZmFsc2UsXHJcbiAgICAgICAgbW91c2V3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgZ2V0Q2FwdGlvbkZyb21UaXRsZU9yQWx0OiB0cnVlLFxyXG4gICAgICAgIGFwcGVuZFN1Ykh0bWxUbzogJy5sZy1zdWItaHRtbCcsXHJcbiAgICAgICAgc3ViSHRtbFNlbGVjdG9yUmVsYXRpdmU6IGZhbHNlLFxyXG4gICAgICAgIHByZWxvYWQ6IDIsXHJcbiAgICAgICAgbnVtYmVyT2ZTbGlkZUl0ZW1zSW5Eb206IDEwLFxyXG4gICAgICAgIHNlbGVjdG9yOiAnJyxcclxuICAgICAgICBzZWxlY3RXaXRoaW46ICcnLFxyXG4gICAgICAgIG5leHRIdG1sOiAnJyxcclxuICAgICAgICBwcmV2SHRtbDogJycsXHJcbiAgICAgICAgaW5kZXg6IDAsXHJcbiAgICAgICAgaWZyYW1lV2lkdGg6ICcxMDAlJyxcclxuICAgICAgICBpZnJhbWVIZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICBpZnJhbWVNYXhXaWR0aDogJzEwMCUnLFxyXG4gICAgICAgIGlmcmFtZU1heEhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgIGRvd25sb2FkOiB0cnVlLFxyXG4gICAgICAgIGNvdW50ZXI6IHRydWUsXHJcbiAgICAgICAgYXBwZW5kQ291bnRlclRvOiAnLmxnLXRvb2xiYXInLFxyXG4gICAgICAgIHN3aXBlVGhyZXNob2xkOiA1MCxcclxuICAgICAgICBlbmFibGVTd2lwZTogdHJ1ZSxcclxuICAgICAgICBlbmFibGVEcmFnOiB0cnVlLFxyXG4gICAgICAgIGR5bmFtaWM6IGZhbHNlLFxyXG4gICAgICAgIGR5bmFtaWNFbDogW10sXHJcbiAgICAgICAgZXh0cmFQcm9wczogW10sXHJcbiAgICAgICAgZXhUaHVtYkltYWdlOiAnJyxcclxuICAgICAgICBpc01vYmlsZTogdW5kZWZpbmVkLFxyXG4gICAgICAgIG1vYmlsZVNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd0Nsb3NlSWNvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIGRvd25sb2FkOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsdWdpbnM6IFtdLFxyXG4gICAgICAgIHN0cmluZ3M6IHtcclxuICAgICAgICAgICAgY2xvc2VHYWxsZXJ5OiAnQ2xvc2UgZ2FsbGVyeScsXHJcbiAgICAgICAgICAgIHRvZ2dsZU1heGltaXplOiAnVG9nZ2xlIG1heGltaXplJyxcclxuICAgICAgICAgICAgcHJldmlvdXNTbGlkZTogJ1ByZXZpb3VzIHNsaWRlJyxcclxuICAgICAgICAgICAgbmV4dFNsaWRlOiAnTmV4dCBzbGlkZScsXHJcbiAgICAgICAgICAgIGRvd25sb2FkOiAnRG93bmxvYWQnLFxyXG4gICAgICAgICAgICBwbGF5VmlkZW86ICdQbGF5IHZpZGVvJyxcclxuICAgICAgICB9LFxyXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRMZ1BvbHlmaWxscygpIHtcclxuICAgICAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHtcclxuICAgICAgICAgICAgICAgICAgICBidWJibGVzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xyXG4gICAgICAgICAgICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBldnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPVxyXG4gICAgICAgICAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICB2YXIgbGdRdWVyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBsZ1F1ZXJ5KHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzVmVuZGVyUHJlZml4ZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAnVHJhbnNpdGlvbkR1cmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICdUcmFuc2l0aW9uVGltaW5nRnVuY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgJ1RyYW5zZm9ybScsXHJcbiAgICAgICAgICAgICAgICAnVHJhbnNpdGlvbicsXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IgPSB0aGlzLl9nZXRTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RFbGVtZW50ID0gdGhpcy5fZ2V0Rmlyc3RFbCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGdRdWVyeS5nZW5lcmF0ZVVVSUQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgciA9IChNYXRoLnJhbmRvbSgpICogMTYpIHwgMCwgdiA9IGMgPT0gJ3gnID8gciA6IChyICYgMHgzKSB8IDB4ODtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5fZ2V0U2VsZWN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQgPT09IHZvaWQgMCkgeyBjb250ZXh0ID0gZG9jdW1lbnQ7IH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcclxuICAgICAgICAgICAgdmFyIGZsID0gc2VsZWN0b3Iuc3Vic3RyaW5nKDAsIDEpO1xyXG4gICAgICAgICAgICBpZiAoZmwgPT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuX2VhY2ggPSBmdW5jdGlvbiAoZnVuYykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdG9yLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy5zZWxlY3RvciwgZnVuYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmdW5jKHRoaXMuc2VsZWN0b3IsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuX3NldENzc1ZlbmRvclByZWZpeCA9IGZ1bmN0aW9uIChlbCwgY3NzUHJvcGVydHksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgICAgICAgICB2YXIgcHJvcGVydHkgPSBjc3NQcm9wZXJ0eS5yZXBsYWNlKC8tKFthLXpdKS9naSwgZnVuY3Rpb24gKHMsIGdyb3VwMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwMS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3NzVmVuZGVyUHJlZml4ZXMuaW5kZXhPZihwcm9wZXJ0eSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZVtwcm9wZXJ0eS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHByb3BlcnR5LnNsaWNlKDEpXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGVbJ3dlYmtpdCcgKyBwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVsLnN0eWxlWydtb3onICsgcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZVsnbXMnICsgcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZVsnbycgKyBwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVsLnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5fZ2V0Rmlyc3RFbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3IgJiYgdGhpcy5zZWxlY3Rvci5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuaXNFdmVudE1hdGNoZWQgPSBmdW5jdGlvbiAoZXZlbnQsIGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnROYW1lc3BhY2UgPSBldmVudE5hbWUuc3BsaXQoJy4nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoJy4nKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gZTsgfSlcclxuICAgICAgICAgICAgICAgIC5ldmVyeShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50TmFtZXNwYWNlLmluZGV4T2YoZSkgIT09IC0xO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmF0dHIgPSBmdW5jdGlvbiAoYXR0ciwgdmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdEVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2VhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkTEcodGhpcy5fZ2V0U2VsZWN0b3Ioc2VsZWN0b3IsIHRoaXMuc2VsZWN0b3IpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RvciAmJiB0aGlzLnNlbGVjdG9yLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJExHKHRoaXMuc2VsZWN0b3JbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRMRyh0aGlzLnNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuZXEgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRMRyh0aGlzLnNlbGVjdG9yW2luZGV4XSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkTEcodGhpcy5zZWxlY3Rvci5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldEZpcnN0RWwoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLnJlbW92ZUF0dHIgPSBmdW5jdGlvbiAoYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICB2YXIgYXR0cnMgPSBhdHRyaWJ1dGVzLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyKSB7IHJldHVybiBlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7IH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS53cmFwID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgICAgICAgICAgdGhpcy5maXJzdEVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod3JhcHBlciwgdGhpcy5maXJzdEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0RWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZmlyc3RFbGVtZW50KTtcclxuICAgICAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLmZpcnN0RWxlbWVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lcykge1xyXG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lcyA9PT0gdm9pZCAwKSB7IGNsYXNzTmFtZXMgPSAnJzsgfVxyXG4gICAgICAgICAgICB0aGlzLl9lYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSUUgZG9lc24ndCBzdXBwb3J0IG11bHRpcGxlIGFyZ3VtZW50c1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lcy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJRSBkb2Vzbid0IHN1cHBvcnQgbXVsdGlwbGUgYXJndW1lbnRzXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWVzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmhhc0NsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuaGFzQXR0cmlidXRlID0gZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3RFbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0NsYXNzKGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmNzcyA9IGZ1bmN0aW9uIChwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5fZWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLl9zZXRDc3NWZW5kb3JQcmVmaXgoZWwsIHByb3BlcnR5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIE5lZWQgdG8gcGFzcyBzZXBhcmF0ZSBuYW1lc3BhY2VzIGZvciBzZXBhcmF0ZSBlbGVtZW50c1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50cywgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGxnUXVlcnkuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxnUXVlcnkuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZ1F1ZXJ5LmV2ZW50TGlzdGVuZXJzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQuc3BsaXQoJy4nKVswXSwgbGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBAdG9kbyAtIHRlc3QgdGhpc1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLm9mZihldmVudCk7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxnUXVlcnkuZXZlbnRMaXN0ZW5lcnMpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzRXZlbnRNYXRjaGVkKGV2ZW50LCBldmVudE5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGdRdWVyeS5ldmVudExpc3RlbmVyc1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLnNwbGl0KCcuJylbMF0sIGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBsZ1F1ZXJ5LmV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudCwgZGV0YWlsKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjdXN0b21FdmVudCA9IG5ldyBDdXN0b21FdmVudChldmVudC5zcGxpdCgnLicpWzBdLCB7XHJcbiAgICAgICAgICAgICAgICBkZXRhaWw6IGRldGFpbCB8fCBudWxsLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5maXJzdEVsZW1lbnQuZGlzcGF0Y2hFdmVudChjdXN0b21FdmVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gRG9lcyBub3Qgc3VwcG9ydCBJRVxyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGZldGNoKHVybCkudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3Rvci5pbm5lckhUTUwgPSByZXM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbiAoaHRtbCkge1xyXG4gICAgICAgICAgICBpZiAoaHRtbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3RFbGVtZW50LmlubmVySFRNTDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9lYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKGh0bWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaHRtbCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoaHRtbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbiAoaHRtbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgaHRtbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIGVsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5zY3JvbGxUb3AgPSBmdW5jdGlvbiAoc2Nyb2xsVG9wKSB7XHJcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHdpbmRvdy5wYWdlWU9mZnNldCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHxcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5zY3JvbGxMZWZ0ID0gZnVuY3Rpb24gKHNjcm9sbExlZnQpIHtcclxuICAgICAgICAgICAgaWYgKHNjcm9sbExlZnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh3aW5kb3cucGFnZVhPZmZzZXQgfHxcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5vZmZzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciByZWN0ID0gdGhpcy5maXJzdEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIHZhciBib2R5TWFyZ2luTGVmdCA9ICRMRygnYm9keScpLnN0eWxlKCkubWFyZ2luTGVmdDtcclxuICAgICAgICAgICAgLy8gTWludXMgYm9keSBtYXJnaW4gLSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDcxMTU0OC9pcy1nZXRib3VuZGluZ2NsaWVudHJlY3QtbGVmdC1yZXR1cm5pbmctYS13cm9uZy12YWx1ZVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0IC0gcGFyc2VGbG9hdChib2R5TWFyZ2luTGVmdCkgKyB0aGlzLnNjcm9sbExlZnQoKSxcclxuICAgICAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyB0aGlzLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuc3R5bGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZmlyc3RFbGVtZW50LmN1cnJlbnRTdHlsZSB8fFxyXG4gICAgICAgICAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5maXJzdEVsZW1lbnQpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFdpZHRoIHdpdGhvdXQgcGFkZGluZyBhbmQgYm9yZGVyIGV2ZW4gaWYgYm94LXNpemluZyBpcyB1c2VkLlxyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLndpZHRoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5maXJzdEVsZW1lbnQuY2xpZW50V2lkdGggLVxyXG4gICAgICAgICAgICAgICAgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nTGVmdCkgLVxyXG4gICAgICAgICAgICAgICAgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nUmlnaHQpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEhlaWdodCB3aXRob3V0IHBhZGRpbmcgYW5kIGJvcmRlciBldmVuIGlmIGJveC1zaXppbmcgaXMgdXNlZC5cclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5oZWlnaHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IHRoaXMuc3R5bGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmZpcnN0RWxlbWVudC5jbGllbnRIZWlnaHQgLVxyXG4gICAgICAgICAgICAgICAgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nVG9wKSAtXHJcbiAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdCb3R0b20pKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkuZXZlbnRMaXN0ZW5lcnMgPSB7fTtcclxuICAgICAgICByZXR1cm4gbGdRdWVyeTtcclxuICAgIH0oKSk7XHJcbiAgICBmdW5jdGlvbiAkTEcoc2VsZWN0b3IpIHtcclxuICAgICAgICBpbml0TGdQb2x5ZmlsbHMoKTtcclxuICAgICAgICByZXR1cm4gbmV3IGxnUXVlcnkoc2VsZWN0b3IpO1xyXG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHREeW5hbWljT3B0aW9ucyA9IFtcclxuICAgICAgICAnc3JjJyxcclxuICAgICAgICAnc291cmNlcycsXHJcbiAgICAgICAgJ3N1Ykh0bWwnLFxyXG4gICAgICAgICdzdWJIdG1sVXJsJyxcclxuICAgICAgICAnaHRtbCcsXHJcbiAgICAgICAgJ3ZpZGVvJyxcclxuICAgICAgICAncG9zdGVyJyxcclxuICAgICAgICAnc2xpZGVOYW1lJyxcclxuICAgICAgICAncmVzcG9uc2l2ZScsXHJcbiAgICAgICAgJ3NyY3NldCcsXHJcbiAgICAgICAgJ3NpemVzJyxcclxuICAgICAgICAnaWZyYW1lJyxcclxuICAgICAgICAnZG93bmxvYWRVcmwnLFxyXG4gICAgICAgICdkb3dubG9hZCcsXHJcbiAgICAgICAgJ3dpZHRoJyxcclxuICAgICAgICAnZmFjZWJvb2tTaGFyZVVybCcsXHJcbiAgICAgICAgJ3R3ZWV0VGV4dCcsXHJcbiAgICAgICAgJ2lmcmFtZVRpdGxlJyxcclxuICAgICAgICAndHdpdHRlclNoYXJlVXJsJyxcclxuICAgICAgICAncGludGVyZXN0U2hhcmVVcmwnLFxyXG4gICAgICAgICdwaW50ZXJlc3RUZXh0JyxcclxuICAgICAgICAnZmJIdG1sJyxcclxuICAgICAgICAnZGlzcXVzSWRlbnRpZmllcicsXHJcbiAgICAgICAgJ2Rpc3F1c1VybCcsXHJcbiAgICBdO1xyXG4gICAgLy8gQ29udmVydCBodG1sIGRhdGEtYXR0cmlidXRlIHRvIGNhbWFsY2FzZVxyXG4gICAgZnVuY3Rpb24gY29udmVydFRvRGF0YShhdHRyKSB7XHJcbiAgICAgICAgLy8gRkluZCBhIHdheSBmb3IgbGdzaXplXHJcbiAgICAgICAgaWYgKGF0dHIgPT09ICdocmVmJykge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3NyYyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF0dHIgPSBhdHRyLnJlcGxhY2UoJ2RhdGEtJywgJycpO1xyXG4gICAgICAgIGF0dHIgPSBhdHRyLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgYXR0ci5zbGljZSgxKTtcclxuICAgICAgICBhdHRyID0gYXR0ci5yZXBsYWNlKC8tKFthLXpdKS9nLCBmdW5jdGlvbiAoZykgeyByZXR1cm4gZ1sxXS50b1VwcGVyQ2FzZSgpOyB9KTtcclxuICAgICAgICByZXR1cm4gYXR0cjtcclxuICAgIH1cclxuICAgIHZhciB1dGlscyA9IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBnZXQgcG9zc2libGUgd2lkdGggYW5kIGhlaWdodCBmcm9tIHRoZSBsZ1NpemUgYXR0cmlidXRlLiBVc2VkIGZvciBab29tRnJvbU9yaWdpbiBvcHRpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRTaXplOiBmdW5jdGlvbiAoZWwsIGNvbnRhaW5lciwgc3BhY2luZywgZGVmYXVsdExnU2l6ZSkge1xyXG4gICAgICAgICAgICBpZiAoc3BhY2luZyA9PT0gdm9pZCAwKSB7IHNwYWNpbmcgPSAwOyB9XHJcbiAgICAgICAgICAgIHZhciBMR2VsID0gJExHKGVsKTtcclxuICAgICAgICAgICAgdmFyIGxnU2l6ZSA9IExHZWwuYXR0cignZGF0YS1sZy1zaXplJykgfHwgZGVmYXVsdExnU2l6ZTtcclxuICAgICAgICAgICAgaWYgKCFsZ1NpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaXNSZXNwb25zaXZlU2l6ZXMgPSBsZ1NpemUuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgLy8gaWYgYXQtbGVhc3QgdHdvIHZpZXdwb3J0IHNpemVzIGFyZSBhdmFpbGFibGVcclxuICAgICAgICAgICAgaWYgKGlzUmVzcG9uc2l2ZVNpemVzWzFdKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlzUmVzcG9uc2l2ZVNpemVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpemVfMSA9IGlzUmVzcG9uc2l2ZVNpemVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zaXZlV2lkdGggPSBwYXJzZUludChzaXplXzEuc3BsaXQoJy0nKVsyXSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zaXZlV2lkdGggPiB3V2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGdTaXplID0gc2l6ZV8xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGFrZSBsYXN0IGl0ZW0gYXMgbGFzdCBvcHRpb25cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gaXNSZXNwb25zaXZlU2l6ZXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZ1NpemUgPSBzaXplXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzaXplID0gbGdTaXplLnNwbGl0KCctJyk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHBhcnNlSW50KHNpemVbMF0sIDEwKTtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHBhcnNlSW50KHNpemVbMV0sIDEwKTtcclxuICAgICAgICAgICAgdmFyIGNXaWR0aCA9IGNvbnRhaW5lci53aWR0aCgpO1xyXG4gICAgICAgICAgICB2YXIgY0hlaWdodCA9IGNvbnRhaW5lci5oZWlnaHQoKSAtIHNwYWNpbmc7XHJcbiAgICAgICAgICAgIHZhciBtYXhXaWR0aCA9IE1hdGgubWluKGNXaWR0aCwgd2lkdGgpO1xyXG4gICAgICAgICAgICB2YXIgbWF4SGVpZ2h0ID0gTWF0aC5taW4oY0hlaWdodCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgdmFyIHJhdGlvID0gTWF0aC5taW4obWF4V2lkdGggLyB3aWR0aCwgbWF4SGVpZ2h0IC8gaGVpZ2h0KTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgd2lkdGg6IHdpZHRoICogcmF0aW8sIGhlaWdodDogaGVpZ2h0ICogcmF0aW8gfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIEdldCB0cmFuc2Zvcm0gdmFsdWUgYmFzZWQgb24gdGhlIGltYWdlU2l6ZS4gVXNlZCBmb3IgWm9vbUZyb21PcmlnaW4gb3B0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIHtqUXVlcnkgRWxlbWVudH1cclxuICAgICAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUcmFuc2Zvcm0gQ1NTIHN0cmluZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldFRyYW5zZm9ybTogZnVuY3Rpb24gKGVsLCBjb250YWluZXIsIHRvcCwgYm90dG9tLCBpbWFnZVNpemUpIHtcclxuICAgICAgICAgICAgaWYgKCFpbWFnZVNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgTEdlbCA9ICRMRyhlbCkuZmluZCgnaW1nJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgaWYgKCFMR2VsLmdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lclJlY3QgPSBjb250YWluZXIuZ2V0KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIHZhciB3V2lkdGggPSBjb250YWluZXJSZWN0LndpZHRoO1xyXG4gICAgICAgICAgICAvLyB1c2luZyBpbm5lcldpZHRoIHRvIGluY2x1ZGUgbW9iaWxlIHNhZmFyaSBib3R0b20gYmFyXHJcbiAgICAgICAgICAgIHZhciB3SGVpZ2h0ID0gY29udGFpbmVyLmhlaWdodCgpIC0gKHRvcCArIGJvdHRvbSk7XHJcbiAgICAgICAgICAgIHZhciBlbFdpZHRoID0gTEdlbC53aWR0aCgpO1xyXG4gICAgICAgICAgICB2YXIgZWxIZWlnaHQgPSBMR2VsLmhlaWdodCgpO1xyXG4gICAgICAgICAgICB2YXIgZWxTdHlsZSA9IExHZWwuc3R5bGUoKTtcclxuICAgICAgICAgICAgdmFyIHggPSAod1dpZHRoIC0gZWxXaWR0aCkgLyAyIC1cclxuICAgICAgICAgICAgICAgIExHZWwub2Zmc2V0KCkubGVmdCArXHJcbiAgICAgICAgICAgICAgICAocGFyc2VGbG9hdChlbFN0eWxlLnBhZGRpbmdMZWZ0KSB8fCAwKSArXHJcbiAgICAgICAgICAgICAgICAocGFyc2VGbG9hdChlbFN0eWxlLmJvcmRlckxlZnQpIHx8IDApICtcclxuICAgICAgICAgICAgICAgICRMRyh3aW5kb3cpLnNjcm9sbExlZnQoKSArXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJSZWN0LmxlZnQ7XHJcbiAgICAgICAgICAgIHZhciB5ID0gKHdIZWlnaHQgLSBlbEhlaWdodCkgLyAyIC1cclxuICAgICAgICAgICAgICAgIExHZWwub2Zmc2V0KCkudG9wICtcclxuICAgICAgICAgICAgICAgIChwYXJzZUZsb2F0KGVsU3R5bGUucGFkZGluZ1RvcCkgfHwgMCkgK1xyXG4gICAgICAgICAgICAgICAgKHBhcnNlRmxvYXQoZWxTdHlsZS5ib3JkZXJUb3ApIHx8IDApICtcclxuICAgICAgICAgICAgICAgICRMRyh3aW5kb3cpLnNjcm9sbFRvcCgpICtcclxuICAgICAgICAgICAgICAgIHRvcDtcclxuICAgICAgICAgICAgdmFyIHNjWCA9IGVsV2lkdGggLyBpbWFnZVNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBzY1kgPSBlbEhlaWdodCAvIGltYWdlU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArXHJcbiAgICAgICAgICAgICAgICAoeCAqPSAtMSkgK1xyXG4gICAgICAgICAgICAgICAgJ3B4LCAnICtcclxuICAgICAgICAgICAgICAgICh5ICo9IC0xKSArXHJcbiAgICAgICAgICAgICAgICAncHgsIDApIHNjYWxlM2QoJyArXHJcbiAgICAgICAgICAgICAgICBzY1ggK1xyXG4gICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICBzY1kgK1xyXG4gICAgICAgICAgICAgICAgJywgMSknO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNmb3JtO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0SWZyYW1lTWFya3VwOiBmdW5jdGlvbiAoaWZyYW1lV2lkdGgsIGlmcmFtZUhlaWdodCwgaWZyYW1lTWF4V2lkdGgsIGlmcmFtZU1heEhlaWdodCwgc3JjLCBpZnJhbWVUaXRsZSkge1xyXG4gICAgICAgICAgICB2YXIgdGl0bGUgPSBpZnJhbWVUaXRsZSA/ICd0aXRsZT1cIicgKyBpZnJhbWVUaXRsZSArICdcIicgOiAnJztcclxuICAgICAgICAgICAgcmV0dXJuIFwiPGRpdiBjbGFzcz1cXFwibGctdmlkZW8tY29udCBsZy1oYXMtaWZyYW1lXFxcIiBzdHlsZT1cXFwid2lkdGg6XCIgKyBpZnJhbWVXaWR0aCArIFwiOyBtYXgtd2lkdGg6XCIgKyBpZnJhbWVNYXhXaWR0aCArIFwiOyBoZWlnaHQ6IFwiICsgaWZyYW1lSGVpZ2h0ICsgXCI7IG1heC1oZWlnaHQ6XCIgKyBpZnJhbWVNYXhIZWlnaHQgKyBcIlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aWZyYW1lIGNsYXNzPVxcXCJsZy1vYmplY3RcXFwiIGZyYW1lYm9yZGVyPVxcXCIwXFxcIiBcIiArIHRpdGxlICsgXCIgc3JjPVxcXCJcIiArIHNyYyArIFwiXFxcIiAgYWxsb3dmdWxsc2NyZWVuPVxcXCJ0cnVlXFxcIj48L2lmcmFtZT5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XCI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRJbWdNYXJrdXA6IGZ1bmN0aW9uIChpbmRleCwgc3JjLCBhbHRBdHRyLCBzcmNzZXQsIHNpemVzLCBzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgIHZhciBzcmNzZXRBdHRyID0gc3Jjc2V0ID8gXCJzcmNzZXQ9XFxcIlwiICsgc3Jjc2V0ICsgXCJcXFwiXCIgOiAnJztcclxuICAgICAgICAgICAgdmFyIHNpemVzQXR0ciA9IHNpemVzID8gXCJzaXplcz1cXFwiXCIgKyBzaXplcyArIFwiXFxcIlwiIDogJyc7XHJcbiAgICAgICAgICAgIHZhciBpbWdNYXJrdXAgPSBcIjxpbWcgXCIgKyBhbHRBdHRyICsgXCIgXCIgKyBzcmNzZXRBdHRyICsgXCIgIFwiICsgc2l6ZXNBdHRyICsgXCIgY2xhc3M9XFxcImxnLW9iamVjdCBsZy1pbWFnZVxcXCIgZGF0YS1pbmRleD1cXFwiXCIgKyBpbmRleCArIFwiXFxcIiBzcmM9XFxcIlwiICsgc3JjICsgXCJcXFwiIC8+XCI7XHJcbiAgICAgICAgICAgIHZhciBzb3VyY2VUYWcgPSAnJztcclxuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzb3VyY2VPYmogPSB0eXBlb2Ygc291cmNlcyA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKHNvdXJjZXMpIDogc291cmNlcztcclxuICAgICAgICAgICAgICAgIHNvdXJjZVRhZyA9IHNvdXJjZU9iai5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdHRycyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvIG5vdCByZW1vdmUgdGhlIGZpcnN0IHNwYWNlIGFzIGl0IGlzIHJlcXVpcmVkIHRvIHNlcGFyYXRlIHRoZSBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzICs9IFwiIFwiICsga2V5ICsgXCI9XFxcIlwiICsgc291cmNlW2tleV0gKyBcIlxcXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCI8c291cmNlIFwiICsgYXR0cnMgKyBcIj48L3NvdXJjZT5cIjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiICsgc291cmNlVGFnICsgaW1nTWFya3VwO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gR2V0IHNyYyBmcm9tIHJlc3BvbnNpdmUgc3JjXHJcbiAgICAgICAgZ2V0UmVzcG9uc2l2ZVNyYzogZnVuY3Rpb24gKHNyY0l0bXMpIHtcclxuICAgICAgICAgICAgdmFyIHJzV2lkdGggPSBbXTtcclxuICAgICAgICAgICAgdmFyIHJzU3JjID0gW107XHJcbiAgICAgICAgICAgIHZhciBzcmMgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcmNJdG1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3NyYyA9IHNyY0l0bXNbaV0uc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgICAgIC8vIE1hbmFnZSBlbXB0eSBzcGFjZVxyXG4gICAgICAgICAgICAgICAgaWYgKF9zcmNbMF0gPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NyYy5zcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByc1NyYy5wdXNoKF9zcmNbMF0pO1xyXG4gICAgICAgICAgICAgICAgcnNXaWR0aC5wdXNoKF9zcmNbMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB3V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByc1dpZHRoLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQocnNXaWR0aFtqXSwgMTApID4gd1dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjID0gcnNTcmNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNyYztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzSW1hZ2VMb2FkZWQ6IGZ1bmN0aW9uIChpbWcpIHtcclxuICAgICAgICAgICAgaWYgKCFpbWcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIER1cmluZyB0aGUgb25sb2FkIGV2ZW50LCBJRSBjb3JyZWN0bHkgaWRlbnRpZmllcyBhbnkgaW1hZ2VzIHRoYXRcclxuICAgICAgICAgICAgLy8gd2VyZW7igJl0IGRvd25sb2FkZWQgYXMgbm90IGNvbXBsZXRlLiBPdGhlcnMgc2hvdWxkIHRvby4gR2Vja28tYmFzZWRcclxuICAgICAgICAgICAgLy8gYnJvd3NlcnMgYWN0IGxpa2UgTlM0IGluIHRoYXQgdGhleSByZXBvcnQgdGhpcyBpbmNvcnJlY3RseS5cclxuICAgICAgICAgICAgaWYgKCFpbWcuY29tcGxldGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBIb3dldmVyLCB0aGV5IGRvIGhhdmUgdHdvIHZlcnkgdXNlZnVsIHByb3BlcnRpZXM6IG5hdHVyYWxXaWR0aCBhbmRcclxuICAgICAgICAgICAgLy8gbmF0dXJhbEhlaWdodC4gVGhlc2UgZ2l2ZSB0aGUgdHJ1ZSBzaXplIG9mIHRoZSBpbWFnZS4gSWYgaXQgZmFpbGVkXHJcbiAgICAgICAgICAgIC8vIHRvIGxvYWQsIGVpdGhlciBvZiB0aGVzZSBzaG91bGQgYmUgemVyby5cclxuICAgICAgICAgICAgaWYgKGltZy5uYXR1cmFsV2lkdGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBObyBvdGhlciB3YXkgb2YgY2hlY2tpbmc6IGFzc3VtZSBpdOKAmXMgb2suXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0VmlkZW9Qb3N0ZXJNYXJrdXA6IGZ1bmN0aW9uIChfcG9zdGVyLCBkdW1teUltZywgdmlkZW9Db250U3R5bGUsIHBsYXlWaWRlb1N0cmluZywgX2lzVmlkZW8pIHtcclxuICAgICAgICAgICAgdmFyIHZpZGVvQ2xhc3MgPSAnJztcclxuICAgICAgICAgICAgaWYgKF9pc1ZpZGVvICYmIF9pc1ZpZGVvLnlvdXR1YmUpIHtcclxuICAgICAgICAgICAgICAgIHZpZGVvQ2xhc3MgPSAnbGctaGFzLXlvdXR1YmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF9pc1ZpZGVvICYmIF9pc1ZpZGVvLnZpbWVvKSB7XHJcbiAgICAgICAgICAgICAgICB2aWRlb0NsYXNzID0gJ2xnLWhhcy12aW1lbyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2aWRlb0NsYXNzID0gJ2xnLWhhcy1odG1sNSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiPGRpdiBjbGFzcz1cXFwibGctdmlkZW8tY29udCBcIiArIHZpZGVvQ2xhc3MgKyBcIlxcXCIgc3R5bGU9XFxcIlwiICsgdmlkZW9Db250U3R5bGUgKyBcIlxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxnLXZpZGVvLXBsYXktYnV0dG9uXFxcIj5cXG4gICAgICAgICAgICAgICAgPHN2Z1xcbiAgICAgICAgICAgICAgICAgICAgdmlld0JveD1cXFwiMCAwIDIwIDIwXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgcHJlc2VydmVBc3BlY3RSYXRpbz1cXFwieE1pZFlNaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGU9XFxcImZhbHNlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PVxcXCJcIiArIHBsYXlWaWRlb1N0cmluZyArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cXFwiaW1nXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcImxnLXZpZGVvLXBsYXktaWNvblxcXCJcXG4gICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgPHRpdGxlPlwiICsgcGxheVZpZGVvU3RyaW5nICsgXCI8L3RpdGxlPlxcbiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9XFxcImxnLXZpZGVvLXBsYXktaWNvbi1pbm5lclxcXCIgcG9pbnRzPVxcXCIxLDAgMjAsMTAgMSwyMFxcXCI+PC9wb2x5Z29uPlxcbiAgICAgICAgICAgICAgICA8L3N2Zz5cXG4gICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cXFwibGctdmlkZW8tcGxheS1pY29uLWJnXFxcIiB2aWV3Qm94PVxcXCIwIDAgNTAgNTBcXFwiIGZvY3VzYWJsZT1cXFwiZmFsc2VcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD1cXFwiNTAlXFxcIiBjeT1cXFwiNTAlXFxcIiByPVxcXCIyMFxcXCI+PC9jaXJjbGU+PC9zdmc+XFxuICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XFxcImxnLXZpZGVvLXBsYXktaWNvbi1jaXJjbGVcXFwiIHZpZXdCb3g9XFxcIjAgMCA1MCA1MFxcXCIgZm9jdXNhYmxlPVxcXCJmYWxzZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PVxcXCI1MCVcXFwiIGN5PVxcXCI1MCVcXFwiIHI9XFxcIjIwXFxcIj48L2NpcmNsZT5cXG4gICAgICAgICAgICAgICAgPC9zdmc+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgXCIgKyAoZHVtbXlJbWcgfHwgJycpICsgXCJcXG4gICAgICAgICAgICA8aW1nIGNsYXNzPVxcXCJsZy1vYmplY3QgbGctdmlkZW8tcG9zdGVyXFxcIiBzcmM9XFxcIlwiICsgX3Bvc3RlciArIFwiXFxcIiAvPlxcbiAgICAgICAgPC9kaXY+XCI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBDcmVhdGUgZHluYW1pYyBlbGVtZW50cyBhcnJheSBmcm9tIGdhbGxlcnkgaXRlbXMgd2hlbiBkeW5hbWljIG9wdGlvbiBpcyBmYWxzZVxyXG4gICAgICAgICAqIEl0IGhlbHBzIHRvIGF2b2lkIGZyZXF1ZW50IERPTSBpbnRlcmFjdGlvblxyXG4gICAgICAgICAqIGFuZCBhdm9pZCBtdWx0aXBsZSBjaGVja3MgZm9yIGR5bmFtaWMgZWxtZW50c1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fSBkeW5hbWljRWxcclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXREeW5hbWljT3B0aW9uczogZnVuY3Rpb24gKGl0ZW1zLCBleHRyYVByb3BzLCBnZXRDYXB0aW9uRnJvbVRpdGxlT3JBbHQsIGV4VGh1bWJJbWFnZSkge1xyXG4gICAgICAgICAgICB2YXIgZHluYW1pY0VsZW1lbnRzID0gW107XHJcbiAgICAgICAgICAgIHZhciBhdmFpbGFibGVEeW5hbWljT3B0aW9ucyA9IF9fc3ByZWFkQXJyYXlzKGRlZmF1bHREeW5hbWljT3B0aW9ucywgZXh0cmFQcm9wcyk7XHJcbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChpdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBkeW5hbWljRWwgPSB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbS5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSBpdGVtLmF0dHJpYnV0ZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHIuc3BlY2lmaWVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkeW5hbWljQXR0ciA9IGNvbnZlcnRUb0RhdGEoYXR0ci5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdmFpbGFibGVEeW5hbWljT3B0aW9ucy5pbmRleE9mKGR5bmFtaWNBdHRyKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IGR5bmFtaWNBdHRyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHluYW1pY0VsW2xhYmVsXSA9IGF0dHIudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudEl0ZW0gPSAkTEcoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWx0ID0gY3VycmVudEl0ZW0uZmluZCgnaW1nJykuZmlyc3QoKS5hdHRyKCdhbHQnKTtcclxuICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9IGN1cnJlbnRJdGVtLmF0dHIoJ3RpdGxlJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGh1bWIgPSBleFRodW1iSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICA/IGN1cnJlbnRJdGVtLmF0dHIoZXhUaHVtYkltYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgIDogY3VycmVudEl0ZW0uZmluZCgnaW1nJykuZmlyc3QoKS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAgICAgICAgIGR5bmFtaWNFbC50aHVtYiA9IHRodW1iO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdldENhcHRpb25Gcm9tVGl0bGVPckFsdCAmJiAhZHluYW1pY0VsLnN1Ykh0bWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBkeW5hbWljRWwuc3ViSHRtbCA9IHRpdGxlIHx8IGFsdCB8fCAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGR5bmFtaWNFbC5hbHQgPSBhbHQgfHwgdGl0bGUgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICBkeW5hbWljRWxlbWVudHMucHVzaChkeW5hbWljRWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGR5bmFtaWNFbGVtZW50cztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzTW9iaWxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAvaVBob25lfGlQYWR8aVBvZHxBbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIENoZWNrIHRoZSBnaXZlbiBzcmMgaXMgdmlkZW9cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3JjXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSB2aWRlbyB0eXBlXHJcbiAgICAgICAgICogRXg6eyB5b3V0dWJlICA6ICBbXCIvL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PWMwYXNKZ1N5eGNZXCIsIFwiYzBhc0pnU3l4Y1lcIl0gfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHRvZG8gLSB0aGlzIGluZm9ybWF0aW9uIGNhbiBiZSBtb3ZlZCB0byBkeW5hbWljRWwgdG8gYXZvaWQgZnJlcXVlbnQgY2FsbHNcclxuICAgICAgICAgKi9cclxuICAgICAgICBpc1ZpZGVvOiBmdW5jdGlvbiAoc3JjLCBpc0hUTUw1VklkZW8sIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICghc3JjKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNIVE1MNVZJZGVvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2xpZ2h0R2FsbGVyeSA6LSBkYXRhLXNyYyBpcyBub3QgcHJvdmlkZWQgb24gc2xpZGUgaXRlbSAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGluZGV4ICsgMSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLiBQbGVhc2UgbWFrZSBzdXJlIHRoZSBzZWxlY3RvciBwcm9wZXJ0eSBpcyBwcm9wZXJseSBjb25maWd1cmVkLiBNb3JlIGluZm8gLSBodHRwczovL3d3dy5saWdodGdhbGxlcnlqcy5jb20vZGVtb3MvaHRtbC1tYXJrdXAvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB5b3V0dWJlID0gc3JjLm1hdGNoKC9cXC9cXC8oPzp3d3dcXC4pP3lvdXR1KD86XFwuYmV8YmVcXC5jb218YmUtbm9jb29raWVcXC5jb20pXFwvKD86d2F0Y2hcXD92PXxlbWJlZFxcLyk/KFthLXowLTlcXC1cXF9cXCVdKykoW1xcJnw/XVtcXFNdKikqL2kpO1xyXG4gICAgICAgICAgICB2YXIgdmltZW8gPSBzcmMubWF0Y2goL1xcL1xcLyg/Ond3d1xcLik/KD86cGxheWVyXFwuKT92aW1lby5jb21cXC8oPzp2aWRlb1xcLyk/KFswLTlhLXpcXC1fXSspKC4qKT8vaSk7XHJcbiAgICAgICAgICAgIHZhciB3aXN0aWEgPSBzcmMubWF0Y2goL2h0dHBzPzpcXC9cXC8oLispPyh3aXN0aWFcXC5jb218d2lcXC5zdClcXC8obWVkaWFzfGVtYmVkKVxcLyhbMC05YS16XFwtX10rKSguKikvKTtcclxuICAgICAgICAgICAgaWYgKHlvdXR1YmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeW91dHViZTogeW91dHViZSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmltZW8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmltZW86IHZpbWVvLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh3aXN0aWEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lzdGlhOiB3aXN0aWEsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH07XG5cbiAgICAvLyBAcmVmIC0gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzk3MTg0MS9ob3ctdG8tcmVzaXplLWltYWdlcy1wcm9wb3J0aW9uYWxseS1rZWVwaW5nLXRoZS1hc3BlY3QtcmF0aW9cclxuICAgIC8vIEByZWYgLSBodHRwczovLzJhbGl0eS5jb20vMjAxNy8wNC9zZXR0aW5nLXVwLW11bHRpLXBsYXRmb3JtLXBhY2thZ2VzLmh0bWxcclxuICAgIC8vIFVuaXF1ZSBpZCBmb3IgZWFjaCBnYWxsZXJ5XHJcbiAgICB2YXIgbGdJZCA9IDA7XHJcbiAgICB2YXIgTGlnaHRHYWxsZXJ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIExpZ2h0R2FsbGVyeShlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGdPcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgICAgICAgIC8vIGxpZ2h0R2FsbGVyeSBtb2R1bGVzXHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2lucyA9IFtdO1xyXG4gICAgICAgICAgICAvLyBmYWxzZSB3aGVuIGxpZ2h0R2FsbGVyeSBsb2FkIGZpcnN0IHNsaWRlIGNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubEdhbGxlcnlPbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBUcnVlIHdoZW4gYSBzbGlkZSBhbmltYXRpb24gaXMgaW4gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgdGhpcy5sZ0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbXNJbkRvbSA9IFtdO1xyXG4gICAgICAgICAgICAvLyBTY3JvbGwgdG9wIHZhbHVlIGJlZm9yZSBsaWdodEdhbGxlcnkgaXMgb3BlbmVkXHJcbiAgICAgICAgICAgIHRoaXMucHJldlNjcm9sbFRvcCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuaXNEdW1teUltYWdlUmVtb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdPclN3aXBlRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhQ29udGFpbmVyUG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICBib3R0b206IDAsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGdJZCsrO1xyXG4gICAgICAgICAgICB0aGlzLmxnSWQgPSBsZ0lkO1xyXG4gICAgICAgICAgICB0aGlzLmVsID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5MR2VsID0gJExHKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlU2V0dGluZ3Mob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRNb2R1bGVzKCk7XHJcbiAgICAgICAgICAgIC8vIFdoZW4gdXNpbmcgZHluYW1pYyBtb2RlLCBlbnN1cmUgZHluYW1pY0VsIGlzIGFuIGFycmF5XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmR5bmFtaWMgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuZHluYW1pY0VsICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgICAgICAgICFBcnJheS5pc0FycmF5KHRoaXMuc2V0dGluZ3MuZHluYW1pY0VsKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgJ1doZW4gdXNpbmcgZHluYW1pYyBtb2RlLCB5b3UgbXVzdCBhbHNvIGRlZmluZSBkeW5hbWljRWwgYXMgYW4gQXJyYXkuJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdhbGxlcnlJdGVtcyA9IHRoaXMuZ2V0SXRlbXMoKTtcclxuICAgICAgICAgICAgdGhpcy5ub3JtYWxpemVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAvLyBHYWxsZXJ5IGl0ZW1zXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlTGljZW5zZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZW5lcmF0ZVNldHRpbmdzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgLy8gbGlnaHRHYWxsZXJ5IHNldHRpbmdzXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgbGlnaHRHYWxsZXJ5Q29yZVNldHRpbmdzKSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmlzTW9iaWxlICYmXHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgdGhpcy5zZXR0aW5ncy5pc01vYmlsZSA9PT0gJ2Z1bmN0aW9uJ1xyXG4gICAgICAgICAgICAgICAgPyB0aGlzLnNldHRpbmdzLmlzTW9iaWxlKClcclxuICAgICAgICAgICAgICAgIDogdXRpbHMuaXNNb2JpbGUoKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vYmlsZVNldHRpbmdzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMuc2V0dGluZ3MubW9iaWxlU2V0dGluZ3MpLCB0aGlzLnNldHRpbmdzLm1vYmlsZVNldHRpbmdzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy5zZXR0aW5ncyksIG1vYmlsZVNldHRpbmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5ub3JtYWxpemVTZXR0aW5ncyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2xpZGVFbmRBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaGlkZUNvbnRyb2xPbkVuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5jbG9zYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5zd2lwZVRvQ2xvc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBBbmQgcmVzZXQgaXQgb24gY2xvc2UgdG8gZ2V0IHRoZSBjb3JyZWN0IHZhbHVlIG5leHQgdGltZVxyXG4gICAgICAgICAgICB0aGlzLnpvb21Gcm9tT3JpZ2luID0gdGhpcy5zZXR0aW5ncy56b29tRnJvbU9yaWdpbjtcclxuICAgICAgICAgICAgLy8gQXQgdGhlIG1vbWVudCwgWm9vbSBmcm9tIGltYWdlIGRvZXNuJ3Qgc3VwcG9ydCBkeW5hbWljIG9wdGlvbnNcclxuICAgICAgICAgICAgLy8gQHRvZG8gYWRkIHpvb21Gcm9tT3JpZ2luIHN1cHBvcnQgZm9yIGR5bmFtaWMgaW1hZ2VzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmR5bmFtaWMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuem9vbUZyb21PcmlnaW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLmNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gc2V0dGluZ3MucHJlbG9hZCBzaG91bGQgbm90IGJlIGdyYXRlciB0aGFuICRpdGVtLmxlbmd0aFxyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLnByZWxvYWQgPSBNYXRoLm1pbih0aGlzLnNldHRpbmdzLnByZWxvYWQsIHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU2xpZGVWaWRlb0luZm8odGhpcy5nYWxsZXJ5SXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkU3RydWN0dXJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmluaXQsIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlOiB0aGlzLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mua2V5UHJlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5UHJlc3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmVuYWJsZURyYWcoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmVuYWJsZVN3aXBlKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy50cmlnZ2VyUG9zdGVyQ2xpY2soKTtcclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgICB0aGlzLmFycm93KCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1vdXNld2hlZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2V3aGVlbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5keW5hbWljKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5HYWxsZXJ5T25JdGVtQ2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5vcGVuR2FsbGVyeU9uSXRlbUNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzXzEuaXRlbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJExHKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgLy8gVXNpbmcgZGlmZmVyZW50IG5hbWVzcGFjZSBmb3IgY2xpY2sgYmVjYXVzZSBjbGljayBldmVudCBzaG91bGQgbm90IHVuYmluZCBpZiBzZWxlY3RvciBpcyBzYW1lIG9iamVjdCgndGhpcycpXHJcbiAgICAgICAgICAgICAgICAvLyBAdG9kbyBtYW5hZ2UgYWxsIGV2ZW50IGxpc3RuZXJzIC0gc2hvdWxkIGhhdmUgbmFtZXNwYWNlIHRoYXQgcmVwcmVzZW50IGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIHZhciB1dWlkID0gbGdRdWVyeS5nZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtbGctaWQnLCB1dWlkKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsaWNrLmxnY3VzdG9tLWl0ZW0tXCIgKyB1dWlkLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudEl0ZW1JbmRleCA9IF90aGlzLnNldHRpbmdzLmluZGV4IHx8IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9wZW5HYWxsZXJ5KGN1cnJlbnRJdGVtSW5kZXgsIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciB0aGlzXzEgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBVc2luZyBmb3IgbG9vcCBpbnN0ZWFkIG9mIHVzaW5nIGJ1YmJsaW5nIGFzIHRoZSBpdGVtcyBjYW4gYmUgYW55IGh0bWwgZWxlbWVudC5cclxuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBfbG9vcF8xKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW9kdWxlIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogTW9kdWxlcyBhcmUgYnVpbGQgaW5jcmVtZW50YWxseS5cclxuICAgICAgICAgKiBHYWxsZXJ5IHNob3VsZCBiZSBvcGVuZWQgb25seSBvbmNlIGFsbCB0aGUgbW9kdWxlcyBhcmUgaW5pdGlhbGl6ZWQuXHJcbiAgICAgICAgICogdXNlIG1vZHVsZUJ1aWxkVGltZW91dCB0byBtYWtlIHN1cmUgdGhpc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuYnVpbGRNb2R1bGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLnBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wbHVnaW5zLnB1c2gobmV3IHBsdWdpbihfdGhpcywgJExHKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS52YWxpZGF0ZUxpY2Vuc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5saWNlbnNlS2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIGxpY2Vuc2Uga2V5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5saWNlbnNlS2V5ID09PSAnMDAwMC0wMDAwLTAwMC0wMDAwJykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwibGlnaHRHYWxsZXJ5OiBcIiArIHRoaXMuc2V0dGluZ3MubGljZW5zZUtleSArIFwiIGxpY2Vuc2Uga2V5IGlzIG5vdCB2YWxpZCBmb3IgcHJvZHVjdGlvbiB1c2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0U2xpZGVJdGVtID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkTEcodGhpcy5nZXRTbGlkZUl0ZW1JZChpbmRleCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXRTbGlkZUl0ZW1JZCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCIjbGctaXRlbS1cIiArIHRoaXMubGdJZCArIFwiLVwiICsgaW5kZXg7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldElkTmFtZSA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaWQgKyBcIi1cIiArIHRoaXMubGdJZDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0RWxlbWVudEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRMRyhcIiNcIiArIHRoaXMuZ2V0SWROYW1lKGlkKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLm1hbmFnZVNpbmdsZVNsaWRlQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5hZGRDbGFzcygnbGctc2luZ2xlLWl0ZW0nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXNpbmdsZS1pdGVtJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuYnVpbGRTdHJ1Y3R1cmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLiRjb250YWluZXIgJiYgdGhpcy4kY29udGFpbmVyLmdldCgpO1xyXG4gICAgICAgICAgICBpZiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGNvbnRyb2xzID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBzdWJIdG1sQ29udCA9ICcnO1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgY29udHJvbHNcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY29udHJvbHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xzID0gXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLXByZXYnKSArIFwiXFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Muc3RyaW5nc1sncHJldmlvdXNTbGlkZSddICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1wcmV2IGxnLWljb25cXFwiPiBcIiArIHRoaXMuc2V0dGluZ3MucHJldkh0bWwgKyBcIiA8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1uZXh0JykgKyBcIlxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnN0cmluZ3NbJ25leHRTbGlkZSddICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1uZXh0IGxnLWljb25cXFwiPiBcIiArIHRoaXMuc2V0dGluZ3MubmV4dEh0bWwgKyBcIiA8L2J1dHRvbj5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hcHBlbmRTdWJIdG1sVG8gIT09ICcubGctaXRlbScpIHtcclxuICAgICAgICAgICAgICAgIHN1Ykh0bWxDb250ID1cclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImxnLXN1Yi1odG1sXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPjwvZGl2Pic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGFkZENsYXNzZXMgPSAnJztcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYWxsb3dNZWRpYU92ZXJsYXApIHtcclxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCByZW1vdmUgc3BhY2UgYmVmb3JlIGxhc3Qgc2luZ2xlIHF1b3RlXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzc2VzICs9ICdsZy1tZWRpYS1vdmVybGFwICc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGFyaWFMYWJlbGxlZGJ5ID0gdGhpcy5zZXR0aW5ncy5hcmlhTGFiZWxsZWRieVxyXG4gICAgICAgICAgICAgICAgPyAnYXJpYS1sYWJlbGxlZGJ5PVwiJyArIHRoaXMuc2V0dGluZ3MuYXJpYUxhYmVsbGVkYnkgKyAnXCInXHJcbiAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICB2YXIgYXJpYURlc2NyaWJlZGJ5ID0gdGhpcy5zZXR0aW5ncy5hcmlhRGVzY3JpYmVkYnlcclxuICAgICAgICAgICAgICAgID8gJ2FyaWEtZGVzY3JpYmVkYnk9XCInICsgdGhpcy5zZXR0aW5ncy5hcmlhRGVzY3JpYmVkYnkgKyAnXCInXHJcbiAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyQ2xhc3NOYW1lID0gXCJsZy1jb250YWluZXIgXCIgKyB0aGlzLnNldHRpbmdzLmFkZENsYXNzICsgXCIgXCIgKyAoZG9jdW1lbnQuYm9keSAhPT0gdGhpcy5zZXR0aW5ncy5jb250YWluZXIgPyAnbGctaW5saW5lJyA6ICcnKTtcclxuICAgICAgICAgICAgdmFyIGNsb3NlSWNvbiA9IHRoaXMuc2V0dGluZ3MuY2xvc2FibGUgJiYgdGhpcy5zZXR0aW5ncy5zaG93Q2xvc2VJY29uXHJcbiAgICAgICAgICAgICAgICA/IFwiPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy5zdHJpbmdzWydjbG9zZUdhbGxlcnknXSArIFwiXFxcIiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctY2xvc2UnKSArIFwiXFxcIiBjbGFzcz1cXFwibGctY2xvc2UgbGctaWNvblxcXCI+PC9idXR0b24+XCJcclxuICAgICAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgICAgIHZhciBtYXhpbWl6ZUljb24gPSB0aGlzLnNldHRpbmdzLnNob3dNYXhpbWl6ZUljb25cclxuICAgICAgICAgICAgICAgID8gXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnN0cmluZ3NbJ3RvZ2dsZU1heGltaXplJ10gKyBcIlxcXCIgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLW1heGltaXplJykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLW1heGltaXplIGxnLWljb25cXFwiPjwvYnV0dG9uPlwiXHJcbiAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiXCIgKyBjb250YWluZXJDbGFzc05hbWUgKyBcIlxcXCIgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLWNvbnRhaW5lcicpICsgXCJcXFwiIHRhYmluZGV4PVxcXCItMVxcXCIgYXJpYS1tb2RhbD1cXFwidHJ1ZVxcXCIgXCIgKyBhcmlhTGFiZWxsZWRieSArIFwiIFwiICsgYXJpYURlc2NyaWJlZGJ5ICsgXCIgcm9sZT1cXFwiZGlhbG9nXFxcIlxcbiAgICAgICAgPlxcbiAgICAgICAgICAgIDxkaXYgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLWJhY2tkcm9wJykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLWJhY2tkcm9wXFxcIj48L2Rpdj5cXG5cXG4gICAgICAgICAgICA8ZGl2IGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1vdXRlcicpICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1vdXRlciBsZy11c2UtY3NzMyBsZy1jc3MzIGxnLWhpZGUtaXRlbXMgXCIgKyBhZGRDbGFzc2VzICsgXCIgXFxcIj5cXG5cXG4gICAgICAgICAgICAgIDxkaXYgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLWNvbnRlbnQnKSArIFwiXFxcIiBjbGFzcz1cXFwibGctY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLWlubmVyJykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLWlubmVyXFxcIj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIFwiICsgY29udHJvbHMgKyBcIlxcbiAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLXRvb2xiYXInKSArIFwiXFxcIiBjbGFzcz1cXFwibGctdG9vbGJhciBsZy1ncm91cFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICBcIiArIG1heGltaXplSWNvbiArIFwiXFxuICAgICAgICAgICAgICAgICAgICBcIiArIGNsb3NlSWNvbiArIFwiXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIFwiICsgKHRoaXMuc2V0dGluZ3MuYXBwZW5kU3ViSHRtbFRvID09PSAnLmxnLW91dGVyJ1xyXG4gICAgICAgICAgICAgICAgPyBzdWJIdG1sQ29udFxyXG4gICAgICAgICAgICAgICAgOiAnJykgKyBcIlxcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1jb21wb25lbnRzJykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLWNvbXBvbmVudHNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgXCIgKyAodGhpcy5zZXR0aW5ncy5hcHBlbmRTdWJIdG1sVG8gPT09ICcubGctc3ViLWh0bWwnXHJcbiAgICAgICAgICAgICAgICA/IHN1Ykh0bWxDb250XHJcbiAgICAgICAgICAgICAgICA6ICcnKSArIFwiXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICBcIjtcclxuICAgICAgICAgICAgJExHKHRoaXMuc2V0dGluZ3MuY29udGFpbmVyKS5hcHBlbmQodGVtcGxhdGUpO1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYm9keSAhPT0gdGhpcy5zZXR0aW5ncy5jb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgICRMRyh0aGlzLnNldHRpbmdzLmNvbnRhaW5lcikuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub3V0ZXIgPSB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1vdXRlcicpO1xyXG4gICAgICAgICAgICB0aGlzLiRsZ0NvbXBvbmVudHMgPSB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1jb21wb25lbnRzJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGJhY2tkcm9wID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctYmFja2Ryb3AnKTtcclxuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGlubmVyID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctaW5uZXInKTtcclxuICAgICAgICAgICAgdGhpcy4kY29udGVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLWNvbnRlbnQnKTtcclxuICAgICAgICAgICAgdGhpcy4kdG9vbGJhciA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLXRvb2xiYXInKTtcclxuICAgICAgICAgICAgdGhpcy4kYmFja2Ryb3AuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgdGhpcy5zZXR0aW5ncy5iYWNrZHJvcER1cmF0aW9uICsgJ21zJyk7XHJcbiAgICAgICAgICAgIHZhciBvdXRlckNsYXNzTmFtZXMgPSB0aGlzLnNldHRpbmdzLm1vZGUgKyBcIiBcIjtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VTaW5nbGVTbGlkZUNsYXNzTmFtZSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5lbmFibGVEcmFnKSB7XHJcbiAgICAgICAgICAgICAgICBvdXRlckNsYXNzTmFtZXMgKz0gJ2xnLWdyYWIgJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKG91dGVyQ2xhc3NOYW1lcyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGlubmVyLmNzcygndHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24nLCB0aGlzLnNldHRpbmdzLmVhc2luZyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGlubmVyLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMuc2V0dGluZ3Muc3BlZWQgKyAnbXMnKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZG93bmxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRvb2xiYXIuYXBwZW5kKFwiPGEgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLWRvd25sb2FkJykgKyBcIlxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIHJlbD1cXFwibm9vcGVuZXJcXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy5zdHJpbmdzWydkb3dubG9hZCddICsgXCJcXFwiIGRvd25sb2FkIGNsYXNzPVxcXCJsZy1kb3dubG9hZCBsZy1pY29uXFxcIj48L2E+XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY291bnRlcigpO1xyXG4gICAgICAgICAgICAkTEcod2luZG93KS5vbihcInJlc2l6ZS5sZy5nbG9iYWxcIiArIHRoaXMubGdJZCArIFwiIG9yaWVudGF0aW9uY2hhbmdlLmxnLmdsb2JhbFwiICsgdGhpcy5sZ0lkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5yZWZyZXNoT25SZXNpemUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUJhcnMoKTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VDbG9zZUdhbGxlcnkoKTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVNYXhpbWl6ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRNb2R1bGVzKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnJlZnJlc2hPblJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGdPcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50R2FsbGVyeUl0ZW0gPSB0aGlzLmdhbGxlcnlJdGVtc1t0aGlzLmluZGV4XTtcclxuICAgICAgICAgICAgICAgIHZhciBfX3NsaWRlVmlkZW9JbmZvID0gY3VycmVudEdhbGxlcnlJdGVtLl9fc2xpZGVWaWRlb0luZm87XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lZGlhQ29udGFpbmVyUG9zaXRpb24gPSB0aGlzLmdldE1lZGlhQ29udGFpbmVyUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHZhciBfYSA9IHRoaXMubWVkaWFDb250YWluZXJQb3NpdGlvbiwgdG9wXzEgPSBfYS50b3AsIGJvdHRvbSA9IF9hLmJvdHRvbTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEltYWdlU2l6ZSA9IHV0aWxzLmdldFNpemUodGhpcy5pdGVtc1t0aGlzLmluZGV4XSwgdGhpcy5vdXRlciwgdG9wXzEgKyBib3R0b20sIF9fc2xpZGVWaWRlb0luZm8gJiYgdGhpcy5zZXR0aW5ncy52aWRlb01heFNpemUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9fc2xpZGVWaWRlb0luZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZVZpZGVvU2xpZGUodGhpcy5pbmRleCwgdGhpcy5jdXJyZW50SW1hZ2VTaXplKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnpvb21Gcm9tT3JpZ2luICYmICF0aGlzLmlzRHVtbXlJbWFnZVJlbW92ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW1nU3R5bGUgPSB0aGlzLmdldER1bW15SW1nU3R5bGVzKHRoaXMuY3VycmVudEltYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWN1cnJlbnQgLmxnLWR1bW15LWltZycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHlsZScsIGltZ1N0eWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmNvbnRhaW5lclJlc2l6ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUucmVzaXplVmlkZW9TbGlkZSA9IGZ1bmN0aW9uIChpbmRleCwgaW1hZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIHZhciBsZ1ZpZGVvU3R5bGUgPSB0aGlzLmdldFZpZGVvQ29udFN0eWxlKGltYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50U2xpZGUgPSB0aGlzLmdldFNsaWRlSXRlbShpbmRleCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5maW5kKCcubGctdmlkZW8tY29udCcpLmF0dHIoJ3N0eWxlJywgbGdWaWRlb1N0eWxlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVwZGF0ZSBzbGlkZXMgZHluYW1pY2FsbHkuXHJcbiAgICAgICAgICogQWRkLCBlZGl0IG9yIGRlbGV0ZSBzbGlkZXMgZHluYW1pY2FsbHkgd2hlbiBsaWdodEdhbGxlcnkgaXMgb3BlbmVkLlxyXG4gICAgICAgICAqIE1vZGlmeSB0aGUgY3VycmVudCBnYWxsZXJ5IGl0ZW1zIGFuZCBwYXNzIGl0IHZpYSB1cGRhdGVTbGlkZXMgbWV0aG9kXHJcbiAgICAgICAgICogQG5vdGVcclxuICAgICAgICAgKiAtIERvIG5vdCBtdXRhdGUgZXhpc3RpbmcgbGlnaHRHYWxsZXJ5IGl0ZW1zIGRpcmVjdGx5LlxyXG4gICAgICAgICAqIC0gQWx3YXlzIHBhc3MgbmV3IGxpc3Qgb2YgZ2FsbGVyeSBpdGVtc1xyXG4gICAgICAgICAqIC0gWW91IG5lZWQgdG8gdGFrZSBjYXJlIG9mIHRodW1ibmFpbHMgb3V0c2lkZSB0aGUgZ2FsbGVyeSBpZiBhbnlcclxuICAgICAgICAgKiAtIHVzZXIgdGhpcyBtZXRob2Qgb25seSBpZiB5b3Ugd2FudCB0byB1cGRhdGUgc2xpZGVzIHdoZW4gdGhlIGdhbGxlcnkgaXMgb3BlbmVkLiBPdGhlcndpc2UsIHVzZSBgcmVmcmVzaCgpYCBtZXRob2QuXHJcbiAgICAgICAgICogQHBhcmFtIGl0ZW1zIEdhbGxlcnkgaXRlbXNcclxuICAgICAgICAgKiBAcGFyYW0gaW5kZXggQWZ0ZXIgdGhlIHVwZGF0ZSBvcGVyYXRpb24sIHdoaWNoIHNsaWRlIGdhbGxlcnkgc2hvdWxkIG5hdmlnYXRlIHRvXHJcbiAgICAgICAgICogQGNhdGVnb3J5IGxHUHVibGljTWV0aG9kc1xyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogY29uc3QgcGx1Z2luID0gbGlnaHRHYWxsZXJ5KCk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAvLyBBZGRpbmcgc2xpZGVzIGR5bmFtaWNhbGx5XHJcbiAgICAgICAgICogbGV0IGdhbGxlcnlJdGVtcyA9IFtcclxuICAgICAgICAgKiAvLyBBY2Nlc3MgZXhpc3RpbmcgbGlnaHRHYWxsZXJ5IGl0ZW1zXHJcbiAgICAgICAgICogLy8gZ2FsbGVyeUl0ZW1zIGFyZSBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBpbnRlcm5hbGx5IGZyb20gdGhlIGdhbGxlcnkgSFRNTCBtYXJrdXBcclxuICAgICAgICAgKiAvLyBvciBkaXJlY3RseSBmcm9tIGdhbGxlcnlJdGVtcyB3aGVuIGR5bmFtaWMgZ2FsbGVyeSBpcyB1c2VkXHJcbiAgICAgICAgICogICAuLi5wbHVnaW4uZ2FsbGVyeUl0ZW1zLFxyXG4gICAgICAgICAqICAgICAuLi5bXHJcbiAgICAgICAgICogICAgICAge1xyXG4gICAgICAgICAqICAgICAgICAgc3JjOiAnaW1nL2ltZy0xLnBuZycsXHJcbiAgICAgICAgICogICAgICAgICAgIHRodW1iOiAnaW1nL3RodW1iMS5wbmcnLFxyXG4gICAgICAgICAqICAgICAgICAgfSxcclxuICAgICAgICAgKiAgICAgXSxcclxuICAgICAgICAgKiAgIF07XHJcbiAgICAgICAgICogICBwbHVnaW4udXBkYXRlU2xpZGVzKFxyXG4gICAgICAgICAqICAgICBnYWxsZXJ5SXRlbXMsXHJcbiAgICAgICAgICogICAgIHBsdWdpbi5pbmRleCxcclxuICAgICAgICAgKiAgICk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIC8vIFJlbW92ZSBzbGlkZXMgZHluYW1pY2FsbHlcclxuICAgICAgICAgKiBnYWxsZXJ5SXRlbXMgPSBKU09OLnBhcnNlKFxyXG4gICAgICAgICAqICAgSlNPTi5zdHJpbmdpZnkodXBkYXRlU2xpZGVJbnN0YW5jZS5nYWxsZXJ5SXRlbXMpLFxyXG4gICAgICAgICAqICk7XHJcbiAgICAgICAgICogZ2FsbGVyeUl0ZW1zLnNoaWZ0KCk7XHJcbiAgICAgICAgICogdXBkYXRlU2xpZGVJbnN0YW5jZS51cGRhdGVTbGlkZXMoZ2FsbGVyeUl0ZW1zLCAxKTtcclxuICAgICAgICAgKiBAc2VlIDxhIGhyZWY9XCIvZGVtb3MvdXBkYXRlLXNsaWRlcy9cIj5EZW1vPC9hPlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUudXBkYXRlU2xpZGVzID0gZnVuY3Rpb24gKGl0ZW1zLCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCA+IGl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlR2FsbGVyeSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50U3JjID0gdGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdLnNyYztcclxuICAgICAgICAgICAgdGhpcy5nYWxsZXJ5SXRlbXMgPSBpdGVtcztcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDb250cm9scygpO1xyXG4gICAgICAgICAgICB0aGlzLiRpbm5lci5lbXB0eSgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJdGVtc0luRG9tID0gW107XHJcbiAgICAgICAgICAgIHZhciBfaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBjdXJyZW50IGluZGV4IGJhc2VkIG9uIHNvdXJjZSB2YWx1ZSBvZiB0aGUgc2xpZGVcclxuICAgICAgICAgICAgdGhpcy5nYWxsZXJ5SXRlbXMuc29tZShmdW5jdGlvbiAoZ2FsbGVyeUl0ZW0sIGl0ZW1JbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbGxlcnlJdGVtLnNyYyA9PT0gY3VycmVudFNyYykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9pbmRleCA9IGl0ZW1JbmRleDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEl0ZW1zSW5Eb20gPSB0aGlzLm9yZ2FuaXplU2xpZGVJdGVtcyhfaW5kZXgsIC0xKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQ29udGVudChfaW5kZXgsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmdldFNsaWRlSXRlbShfaW5kZXgpLmFkZENsYXNzKCdsZy1jdXJyZW50Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBfaW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3VycmVudENvdW50ZXIoX2luZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMudXBkYXRlU2xpZGVzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEdldCBnYWxsZXJ5IGl0ZW1zIGJhc2VkIG9uIG11bHRpcGxlIGNvbmRpdGlvbnNcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldEl0ZW1zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBHYWxsZXJ5IGl0ZW1zXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmR5bmFtaWMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNlbGVjdG9yID09PSAndGhpcycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2godGhpcy5lbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLnNlbGVjdG9yID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zZWxlY3RXaXRoaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RXaXRoaW4gPSAkTEcodGhpcy5zZXR0aW5ncy5zZWxlY3RXaXRoaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHNlbGVjdFdpdGhpblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNldHRpbmdzLnNlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuc2V0dGluZ3Muc2VsZWN0b3I7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuZWwuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXRpbHMuZ2V0RHluYW1pY09wdGlvbnModGhpcy5pdGVtcywgdGhpcy5zZXR0aW5ncy5leHRyYVByb3BzLCB0aGlzLnNldHRpbmdzLmdldENhcHRpb25Gcm9tVGl0bGVPckFsdCwgdGhpcy5zZXR0aW5ncy5leFRodW1iSW1hZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuZHluYW1pY0VsIHx8IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPcGVuIGxpZ2h0R2FsbGVyeS5cclxuICAgICAgICAgKiBPcGVuIGdhbGxlcnkgd2l0aCBzcGVjaWZpYyBzbGlkZSBieSBwYXNzaW5nIGluZGV4IG9mIHRoZSBzbGlkZSBhcyBwYXJhbWV0ZXIuXHJcbiAgICAgICAgICogQGNhdGVnb3J5IGxHUHVibGljTWV0aG9kc1xyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCAgLSBpbmRleCBvZiB0aGUgc2xpZGVcclxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gV2hpY2ggaW1hZ2UgbGlnaHRHYWxsZXJ5IHNob3VsZCB6b29tIGZyb21cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogY29uc3QgJGR5bmFtaWNHYWxsZXJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R5bmFtaWMtZ2FsbGVyeS1kZW1vJyk7XHJcbiAgICAgICAgICogY29uc3QgZHluYW1pY0dhbGxlcnkgPSBsaWdodEdhbGxlcnkoJGR5bmFtaWNHYWxsZXJ5LCB7XHJcbiAgICAgICAgICogICAgIGR5bmFtaWM6IHRydWUsXHJcbiAgICAgICAgICogICAgIGR5bmFtaWNFbDogW1xyXG4gICAgICAgICAqICAgICAgICAge1xyXG4gICAgICAgICAqICAgICAgICAgICAgICBzcmM6ICdpbWcvMS5qcGcnLFxyXG4gICAgICAgICAqICAgICAgICAgICAgICB0aHVtYjogJ2ltZy90aHVtYi0xLmpwZycsXHJcbiAgICAgICAgICogICAgICAgICAgICAgIHN1Ykh0bWw6ICc8aDQ+SW1hZ2UgMSB0aXRsZTwvaDQ+PHA+SW1hZ2UgMSBkZXNjcmlwdGlvbnMuPC9wPicsXHJcbiAgICAgICAgICogICAgICAgICB9LFxyXG4gICAgICAgICAqICAgICAgICAgLi4uXHJcbiAgICAgICAgICogICAgIF0sXHJcbiAgICAgICAgICogfSk7XHJcbiAgICAgICAgICogJGR5bmFtaWNHYWxsZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAqICAgICAvLyBTdGFydHMgd2l0aCB0aGlyZCBpdGVtLihPcHRpb25hbCkuXHJcbiAgICAgICAgICogICAgIC8vIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSB3YW50IHVzZSBkeW5hbWljIG1vZGUgd2l0aFxyXG4gICAgICAgICAqICAgICAvLyBjdXN0b20gdGh1bWJuYWlscyAodGh1bWJuYWlscyBvdXRzaWRlIGdhbGxlcnkpLFxyXG4gICAgICAgICAqICAgICBkeW5hbWljR2FsbGVyeS5vcGVuR2FsbGVyeSgyKTtcclxuICAgICAgICAgKiB9KTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUub3BlbkdhbGxlcnkgPSBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSB2b2lkIDApIHsgaW5kZXggPSB0aGlzLnNldHRpbmdzLmluZGV4OyB9XHJcbiAgICAgICAgICAgIC8vIHByZXZlbnQgYWNjaWRlbnRhbCBkb3VibGUgZXhlY3V0aW9uXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxnT3BlbmVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmxnT3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vdXRlci5nZXQoKS5mb2N1cygpO1xyXG4gICAgICAgICAgICB0aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1oaWRlLWl0ZW1zJyk7XHJcbiAgICAgICAgICAgIC8vIEFkZCBkaXNwbGF5IGJsb2NrLCBidXQgc3RpbGwgaGFzIG9wYWNpdHkgMFxyXG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIuYWRkQ2xhc3MoJ2xnLXNob3cnKTtcclxuICAgICAgICAgICAgdmFyIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20gPSB0aGlzLmdldEl0ZW1zVG9CZUluc2VydGVkVG9Eb20oaW5kZXgsIGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbXNJbkRvbSA9IGl0ZW1zVG9CZUluc2VydGVkVG9Eb207XHJcbiAgICAgICAgICAgIHZhciBpdGVtcyA9ICcnO1xyXG4gICAgICAgICAgICBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zID0gaXRlbXMgKyAoXCI8ZGl2IGlkPVxcXCJcIiArIGl0ZW0gKyBcIlxcXCIgY2xhc3M9XFxcImxnLWl0ZW1cXFwiPjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGlubmVyLmFwcGVuZChpdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkSHRtbChpbmRleCk7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSAnJztcclxuICAgICAgICAgICAgdGhpcy5tZWRpYUNvbnRhaW5lclBvc2l0aW9uID0gdGhpcy5nZXRNZWRpYUNvbnRhaW5lclBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIHZhciBfYSA9IHRoaXMubWVkaWFDb250YWluZXJQb3NpdGlvbiwgdG9wID0gX2EudG9wLCBib3R0b20gPSBfYS5ib3R0b207XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5hbGxvd01lZGlhT3ZlcmxhcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNZWRpYUNvbnRhaW5lclBvc2l0aW9uKHRvcCwgYm90dG9tKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgX19zbGlkZVZpZGVvSW5mbyA9IHRoaXMuZ2FsbGVyeUl0ZW1zW2luZGV4XS5fX3NsaWRlVmlkZW9JbmZvO1xyXG4gICAgICAgICAgICBpZiAodGhpcy56b29tRnJvbU9yaWdpbiAmJiBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbWFnZVNpemUgPSB1dGlscy5nZXRTaXplKGVsZW1lbnQsIHRoaXMub3V0ZXIsIHRvcCArIGJvdHRvbSwgX19zbGlkZVZpZGVvSW5mbyAmJiB0aGlzLnNldHRpbmdzLnZpZGVvTWF4U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSB1dGlscy5nZXRUcmFuc2Zvcm0oZWxlbWVudCwgdGhpcy5vdXRlciwgdG9wLCBib3R0b20sIHRoaXMuY3VycmVudEltYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnpvb21Gcm9tT3JpZ2luIHx8ICF0cmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5zdGFydENsYXNzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2xpZGVJdGVtKGluZGV4KS5yZW1vdmVDbGFzcygnbGctY29tcGxldGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGltZW91dCA9IHRoaXMuc2V0dGluZ3Muem9vbUZyb21PcmlnaW5cclxuICAgICAgICAgICAgICAgID8gMTAwXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuc2V0dGluZ3MuYmFja2Ryb3BEdXJhdGlvbjtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5hZGRDbGFzcygnbGctY29tcG9uZW50cy1vcGVuJyk7XHJcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmJlZm9yZU9wZW4pO1xyXG4gICAgICAgICAgICAvLyBhZGQgY2xhc3MgbGctY3VycmVudCB0byByZW1vdmUgaW5pdGlhbCB0cmFuc2l0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0U2xpZGVJdGVtKGluZGV4KS5hZGRDbGFzcygnbGctY3VycmVudCcpO1xyXG4gICAgICAgICAgICB0aGlzLmxHYWxsZXJ5T24gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gU3RvcmUgdGhlIGN1cnJlbnQgc2Nyb2xsIHRvcCB2YWx1ZSB0byBzY3JvbGwgYmFjayBhZnRlciBjbG9zaW5nIHRoZSBnYWxsZXJ5Li5cclxuICAgICAgICAgICAgdGhpcy5wcmV2U2Nyb2xsVG9wID0gJExHKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gTmVlZCB0byBjaGVjayBib3RoIHpvb21Gcm9tT3JpZ2luIGFuZCB0cmFuc2Zvcm0gdmFsdWVzIGFzIHdlIG5lZWQgdG8gc2V0IHNldCB0aGVcclxuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgb3BlbmluZyBhbmltYXRpb24gaWYgdXNlciBtaXNzZWQgdG8gYWRkIHRoZSBsZy1zaXplIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnpvb21Gcm9tT3JpZ2luICYmIHRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50U2xpZGVfMSA9IF90aGlzLmdldFNsaWRlSXRlbShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlXzEuY3NzKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGVfMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdsZy1zdGFydC1wcm9ncmVzcyBsZy1zdGFydC1lbmQtcHJvZ3Jlc3MnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIF90aGlzLnNldHRpbmdzLnN0YXJ0QW5pbWF0aW9uRHVyYXRpb24gKyAnbXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLXpvb20tZnJvbS1pbWFnZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGVfMS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgwLCAwLCAwKScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kYmFja2Ryb3AuYWRkQ2xhc3MoJ2luJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGNvbnRhaW5lci5hZGRDbGFzcygnbGctc2hvdy1pbicpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgICAgICAgICAgLy8gbGctdmlzaWJsZSBjbGFzcyByZXNldHMgZ2FsbGVyeSBvcGFjaXR5IHRvIDFcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuem9vbUZyb21PcmlnaW4gfHwgIXRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5hZGRDbGFzcygnbGctdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIF90aGlzLnNldHRpbmdzLmJhY2tkcm9wRHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaW5pdGlhdGUgc2xpZGUgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlKGluZGV4LCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5hZnRlck9wZW4pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkgPT09IHRoaXMuc2V0dGluZ3MuY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAkTEcoJ2h0bWwnKS5hZGRDbGFzcygnbGctb24nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTm90ZSAtIENoYW5naW5nIHRoZSBwb3NpdGlvbiBvZiB0aGUgbWVkaWEgb24gZXZlcnkgc2xpZGUgdHJhbnNpdGlvbiBjcmVhdGVzIGEgZmxpY2tlcmluZyBlZmZlY3QuXHJcbiAgICAgICAgICogVGhlcmVmb3JlLMKgVGhlIGhlaWdodCBvZiB0aGUgY2FwdGlvbiBpcyBjYWxjdWxhdGVkIGR5bmFtaWNhbGx5LCBvbmx5IG9uY2UgYmFzZWQgb24gdGhlIGZpcnN0IHNsaWRlIGNhcHRpb24uXHJcbiAgICAgICAgICogaWYgeW91IGhhdmUgZHluYW1pYyBjYXB0aW9ucyBmb3IgZWFjaCBtZWRpYSxcclxuICAgICAgICAgKiB5b3UgY2FuIHByb3ZpZGUgYW4gYXBwcm9wcmlhdGUgaGVpZ2h0IGZvciB0aGUgY2FwdGlvbnMgdmlhIGFsbG93TWVkaWFPdmVybGFwIG9wdGlvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0TWVkaWFDb250YWluZXJQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYWxsb3dNZWRpYU92ZXJsYXApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHRvcCA9IHRoaXMuJHRvb2xiYXIuZ2V0KCkuY2xpZW50SGVpZ2h0IHx8IDA7XHJcbiAgICAgICAgICAgIHZhciBzdWJIdG1sID0gdGhpcy5vdXRlci5maW5kKCcubGctY29tcG9uZW50cyAubGctc3ViLWh0bWwnKS5nZXQoKTtcclxuICAgICAgICAgICAgdmFyIGNhcHRpb25IZWlnaHQgPSB0aGlzLnNldHRpbmdzLmRlZmF1bHRDYXB0aW9uSGVpZ2h0IHx8XHJcbiAgICAgICAgICAgICAgICAoc3ViSHRtbCAmJiBzdWJIdG1sLmNsaWVudEhlaWdodCkgfHxcclxuICAgICAgICAgICAgICAgIDA7XHJcbiAgICAgICAgICAgIHZhciB0aHVtYkNvbnRhaW5lciA9IHRoaXMub3V0ZXIuZmluZCgnLmxnLXRodW1iLW91dGVyJykuZ2V0KCk7XHJcbiAgICAgICAgICAgIHZhciB0aHVtYkhlaWdodCA9IHRodW1iQ29udGFpbmVyID8gdGh1bWJDb250YWluZXIuY2xpZW50SGVpZ2h0IDogMDtcclxuICAgICAgICAgICAgdmFyIGJvdHRvbSA9IHRodW1iSGVpZ2h0ICsgY2FwdGlvbkhlaWdodDtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRvcDogdG9wLFxyXG4gICAgICAgICAgICAgICAgYm90dG9tOiBib3R0b20sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnNldE1lZGlhQ29udGFpbmVyUG9zaXRpb24gPSBmdW5jdGlvbiAodG9wLCBib3R0b20pIHtcclxuICAgICAgICAgICAgaWYgKHRvcCA9PT0gdm9pZCAwKSB7IHRvcCA9IDA7IH1cclxuICAgICAgICAgICAgaWYgKGJvdHRvbSA9PT0gdm9pZCAwKSB7IGJvdHRvbSA9IDA7IH1cclxuICAgICAgICAgICAgdGhpcy4kY29udGVudC5jc3MoJ3RvcCcsIHRvcCArICdweCcpLmNzcygnYm90dG9tJywgYm90dG9tICsgJ3B4Jyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmhpZGVCYXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBIaWRlIGNvbnRyb2xsZXJzIGlmIG1vdXNlIGRvZXNuJ3QgbW92ZSBmb3Igc29tZSBwZXJpb2RcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctaGlkZS1pdGVtcycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnNldHRpbmdzLmhpZGVCYXJzRGVsYXkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIub24oJ21vdXNlbW92ZS5sZyBjbGljay5sZyB0b3VjaHN0YXJ0LmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctaGlkZS1pdGVtcycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMuaGlkZUJhclRpbWVvdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaW1lb3V0IHdpbGwgYmUgY2xlYXJlZCBvbiBlYWNoIHNsaWRlIG1vdmVtZW50IGFsc29cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZUJhclRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmFkZENsYXNzKCdsZy1oaWRlLWl0ZW1zJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIF90aGlzLnNldHRpbmdzLmhpZGVCYXJzRGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnRyaWdnZXIoJ21vdXNlbW92ZS5sZycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzLnNldHRpbmdzLnNob3dCYXJzQWZ0ZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5pbml0UGljdHVyZUZpbGwgPSBmdW5jdGlvbiAoJGltZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zdXBwb3J0TGVnYWN5QnJvd3Nlcikge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBwaWN0dXJlZmlsbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBbJGltZy5nZXQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignbGlnaHRHYWxsZXJ5IDotIElmIHlvdSB3YW50IHNyY3NldCBvciBwaWN0dXJlIHRhZyB0byBiZSBzdXBwb3J0ZWQgZm9yIG9sZGVyIGJyb3dzZXIgcGxlYXNlIGluY2x1ZGUgcGljdHVyZWZpbCBqYXZhc2NyaXB0IGxpYnJhcnkgaW4geW91ciBkb2N1bWVudC4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIEBkZXNjIENyZWF0ZSBpbWFnZSBjb3VudGVyXHJcbiAgICAgICAgICogIEV4OiAxLzEwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5jb3VudGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jb3VudGVyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlckh0bWwgPSBcIjxkaXYgY2xhc3M9XFxcImxnLWNvdW50ZXJcXFwiIHJvbGU9XFxcInN0YXR1c1xcXCIgYXJpYS1saXZlPVxcXCJwb2xpdGVcXFwiPlxcbiAgICAgICAgICAgICAgICA8c3BhbiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctY291bnRlci1jdXJyZW50JykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLWNvdW50ZXItY3VycmVudFxcXCI+XCIgKyAodGhpcy5pbmRleCArIDEpICsgXCIgPC9zcGFuPiAvXFxuICAgICAgICAgICAgICAgIDxzcGFuIGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1jb3VudGVyLWFsbCcpICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1jb3VudGVyLWFsbFxcXCI+XCIgKyB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggKyBcIiA8L3NwYW4+PC9kaXY+XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmZpbmQodGhpcy5zZXR0aW5ncy5hcHBlbmRDb3VudGVyVG8pLmFwcGVuZChjb3VudGVySHRtbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBAZGVzYyBhZGQgc3ViLWh0bWwgaW50byB0aGUgc2xpZGVcclxuICAgICAgICAgKiAgQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gaW5kZXggb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5hZGRIdG1sID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciBzdWJIdG1sO1xyXG4gICAgICAgICAgICB2YXIgc3ViSHRtbFVybDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FsbGVyeUl0ZW1zW2luZGV4XS5zdWJIdG1sVXJsKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJIdG1sVXJsID0gdGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdLnN1Ykh0bWxVcmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdWJIdG1sID0gdGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdLnN1Ykh0bWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzdWJIdG1sVXJsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ViSHRtbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCBmaXJzdCBsZXR0ZXIgb2Ygc3ViLWh0bWxcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBmaXJzdCBsZXR0ZXIgc3RhcnRzIHdpdGggLiBvciAjIGdldCB0aGUgaHRtbCBmb3JtIHRoZSBqUXVlcnkgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZMID0gc3ViSHRtbC5zdWJzdHJpbmcoMCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZMID09PSAnLicgfHwgZkwgPT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zdWJIdG1sU2VsZWN0b3JSZWxhdGl2ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIXRoaXMuc2V0dGluZ3MuZHluYW1pYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViSHRtbCA9ICRMRyh0aGlzLml0ZW1zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lcShpbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZChzdWJIdG1sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ykh0bWwgPSAkTEcoc3ViSHRtbCkuZmlyc3QoKS5odG1sKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJIdG1sID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYXBwZW5kU3ViSHRtbFRvICE9PSAnLmxnLWl0ZW0nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ViSHRtbFVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuZmluZCgnLmxnLXN1Yi1odG1sJykubG9hZChzdWJIdG1sVXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuZmluZCgnLmxnLXN1Yi1odG1sJykuaHRtbChzdWJIdG1sKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50U2xpZGUgPSAkTEcodGhpcy5nZXRTbGlkZUl0ZW1JZChpbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1Ykh0bWxVcmwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUubG9hZChzdWJIdG1sVXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5hcHBlbmQoXCI8ZGl2IGNsYXNzPVxcXCJsZy1zdWItaHRtbFxcXCI+XCIgKyBzdWJIdG1sICsgXCI8L2Rpdj5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQWRkIGxnLWVtcHR5LWh0bWwgY2xhc3MgaWYgdGl0bGUgZG9lc24ndCBleGlzdFxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN1Ykh0bWwgIT09ICd1bmRlZmluZWQnICYmIHN1Ykh0bWwgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdWJIdG1sID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQodGhpcy5zZXR0aW5ncy5hcHBlbmRTdWJIdG1sVG8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbGctZW1wdHktaHRtbCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCh0aGlzLnNldHRpbmdzLmFwcGVuZFN1Ykh0bWxUbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsZy1lbXB0eS1odG1sJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuYWZ0ZXJBcHBlbmRTdWJIdG1sLCB7XHJcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIEBkZXNjIFByZWxvYWQgc2xpZGVzXHJcbiAgICAgICAgICogIEBwYXJhbSB7TnVtYmVyfSBpbmRleCAtIGluZGV4IG9mIHRoZSBzbGlkZVxyXG4gICAgICAgICAqIEB0b2RvIHByZWxvYWQgbm90IHdvcmtpbmcgZm9yIHRoZSBmaXJzdCBzbGlkZSwgQWxzbywgc2hvdWxkIHdvcmsgZm9yIHRoZSBmaXJzdCBhbmQgbGFzdCBzbGlkZSBhcyB3ZWxsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHRoaXMuc2V0dGluZ3MucHJlbG9hZDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+PSB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggLSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQ29udGVudChpbmRleCArIGksIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8PSB0aGlzLnNldHRpbmdzLnByZWxvYWQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IC0gaiA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZENvbnRlbnQoaW5kZXggLSBqLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0RHVtbXlJbWdTdHlsZXMgPSBmdW5jdGlvbiAoaW1hZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIGlmICghaW1hZ2VTaXplKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ3aWR0aDpcIiArIGltYWdlU2l6ZS53aWR0aCArIFwicHg7XFxuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAtXCIgKyBpbWFnZVNpemUud2lkdGggLyAyICsgXCJweDtcXG4gICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogLVwiICsgaW1hZ2VTaXplLmhlaWdodCAvIDIgKyBcInB4O1xcbiAgICAgICAgICAgICAgICBoZWlnaHQ6XCIgKyBpbWFnZVNpemUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXRWaWRlb0NvbnRTdHlsZSA9IGZ1bmN0aW9uIChpbWFnZVNpemUpIHtcclxuICAgICAgICAgICAgaWYgKCFpbWFnZVNpemUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgIHJldHVybiBcIndpZHRoOlwiICsgaW1hZ2VTaXplLndpZHRoICsgXCJweDtcXG4gICAgICAgICAgICAgICAgaGVpZ2h0OlwiICsgaW1hZ2VTaXplLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0RHVtbXlJbWFnZUNvbnRlbnQgPSBmdW5jdGlvbiAoJGN1cnJlbnRTbGlkZSwgaW5kZXgsIGFsdCkge1xyXG4gICAgICAgICAgICB2YXIgJGN1cnJlbnRJdGVtO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZHluYW1pYykge1xyXG4gICAgICAgICAgICAgICAgJGN1cnJlbnRJdGVtID0gJExHKHRoaXMuaXRlbXMpLmVxKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJGN1cnJlbnRJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2R1bW15SW1nU3JjID0gdm9pZCAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmV4VGh1bWJJbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9kdW1teUltZ1NyYyA9ICRjdXJyZW50SXRlbS5maW5kKCdpbWcnKS5maXJzdCgpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2R1bW15SW1nU3JjID0gJGN1cnJlbnRJdGVtLmF0dHIodGhpcy5zZXR0aW5ncy5leFRodW1iSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFfZHVtbXlJbWdTcmMpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgdmFyIGltZ1N0eWxlID0gdGhpcy5nZXREdW1teUltZ1N0eWxlcyh0aGlzLmN1cnJlbnRJbWFnZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGR1bW15SW1nQ29udGVudCA9IFwiPGltZyBcIiArIGFsdCArIFwiIHN0eWxlPVxcXCJcIiArIGltZ1N0eWxlICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1kdW1teS1pbWdcXFwiIHNyYz1cXFwiXCIgKyBfZHVtbXlJbWdTcmMgKyBcIlxcXCIgLz5cIjtcclxuICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUuYWRkQ2xhc3MoJ2xnLWZpcnN0LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKCdsZy1maXJzdC1zbGlkZS1sb2FkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZHVtbXlJbWdDb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuc2V0SW1nTWFya3VwID0gZnVuY3Rpb24gKHNyYywgJGN1cnJlbnRTbGlkZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRHYWxsZXJ5SXRlbSA9IHRoaXMuZ2FsbGVyeUl0ZW1zW2luZGV4XTtcclxuICAgICAgICAgICAgdmFyIGFsdCA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5hbHQsIHNyY3NldCA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5zcmNzZXQsIHNpemVzID0gY3VycmVudEdhbGxlcnlJdGVtLnNpemVzLCBzb3VyY2VzID0gY3VycmVudEdhbGxlcnlJdGVtLnNvdXJjZXM7XHJcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgdGh1bWJuYWlsIGFzIGR1bW15IGltYWdlIHdoaWNoIHdpbGwgYmUgcmVzaXplZCB0byBhY3R1YWwgaW1hZ2Ugc2l6ZSBhbmRcclxuICAgICAgICAgICAgLy8gZGlzcGxheWVkIG9uIHRvcCBvZiBhY3R1YWwgaW1hZ2VcclxuICAgICAgICAgICAgdmFyIGltZ0NvbnRlbnQgPSAnJztcclxuICAgICAgICAgICAgdmFyIGFsdEF0dHIgPSBhbHQgPyAnYWx0PVwiJyArIGFsdCArICdcIicgOiAnJztcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNGaXJzdFNsaWRlV2l0aFpvb21BbmltYXRpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgaW1nQ29udGVudCA9IHRoaXMuZ2V0RHVtbXlJbWFnZUNvbnRlbnQoJGN1cnJlbnRTbGlkZSwgaW5kZXgsIGFsdEF0dHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW1nQ29udGVudCA9IHV0aWxzLmdldEltZ01hcmt1cChpbmRleCwgc3JjLCBhbHRBdHRyLCBzcmNzZXQsIHNpemVzLCBzb3VyY2VzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaW1nTWFya3VwID0gXCI8cGljdHVyZSBjbGFzcz1cXFwibGctaW1nLXdyYXBcXFwiPiBcIiArIGltZ0NvbnRlbnQgKyBcIjwvcGljdHVyZT5cIjtcclxuICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5wcmVwZW5kKGltZ01hcmt1cCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLm9uU2xpZGVPYmplY3RMb2FkID0gZnVuY3Rpb24gKCRzbGlkZSwgaXNIVE1MNVZpZGVvV2l0aG91dFBvc3Rlciwgb25Mb2FkLCBvbkVycm9yKSB7XHJcbiAgICAgICAgICAgIHZhciBtZWRpYU9iamVjdCA9ICRzbGlkZS5maW5kKCcubGctb2JqZWN0JykuZmlyc3QoKTtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzSW1hZ2VMb2FkZWQobWVkaWFPYmplY3QuZ2V0KCkpIHx8XHJcbiAgICAgICAgICAgICAgICBpc0hUTUw1VmlkZW9XaXRob3V0UG9zdGVyKSB7XHJcbiAgICAgICAgICAgICAgICBvbkxvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lZGlhT2JqZWN0Lm9uKCdsb2FkLmxnIGVycm9yLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uTG9hZCAmJiBvbkxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbWVkaWFPYmplY3Qub24oJ2Vycm9yLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IgJiYgb25FcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtICRlbCBDdXJyZW50IHNsaWRlIGl0ZW1cclxuICAgICAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAgICAgKiBAcGFyYW0gZGVsYXkgRGVsYXkgaXMgMCBleGNlcHQgZmlyc3QgdGltZVxyXG4gICAgICAgICAqIEBwYXJhbSBzcGVlZCBTcGVlZCBpcyBzYW1lIGFzIGRlbGF5LCBleGNlcHQgaXQgaXMgMCBpZiBnYWxsZXJ5IGlzIG9wZW5lZCB2aWEgaGFzaCBwbHVnaW5cclxuICAgICAgICAgKiBAcGFyYW0gaXNGaXJzdFNsaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5vbkxnT2JqZWN0TG9hZCA9IGZ1bmN0aW9uIChjdXJyZW50U2xpZGUsIGluZGV4LCBkZWxheSwgc3BlZWQsIGlzRmlyc3RTbGlkZSwgaXNIVE1MNVZpZGVvV2l0aG91dFBvc3Rlcikge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLm9uU2xpZGVPYmplY3RMb2FkKGN1cnJlbnRTbGlkZSwgaXNIVE1MNVZpZGVvV2l0aG91dFBvc3RlciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMudHJpZ2dlclNsaWRlSXRlbUxvYWQoY3VycmVudFNsaWRlLCBpbmRleCwgZGVsYXksIHNwZWVkLCBpc0ZpcnN0U2xpZGUpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUuYWRkQ2xhc3MoJ2xnLWNvbXBsZXRlIGxnLWNvbXBsZXRlXycpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLmh0bWwoJzxzcGFuIGNsYXNzPVwibGctZXJyb3ItbXNnXCI+T29wcy4uLiBGYWlsZWQgdG8gbG9hZCBjb250ZW50Li4uPC9zcGFuPicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUudHJpZ2dlclNsaWRlSXRlbUxvYWQgPSBmdW5jdGlvbiAoJGN1cnJlbnRTbGlkZSwgaW5kZXgsIGRlbGF5LCBzcGVlZCwgaXNGaXJzdFNsaWRlKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50R2FsbGVyeUl0ZW0gPSB0aGlzLmdhbGxlcnlJdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgIC8vIEFkZGluZyBkZWxheSBmb3IgdmlkZW8gc2xpZGVzIHdpdGhvdXQgcG9zdGVyIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2UgYW5kIHVzZXIgZXhwZXJpZW5jZVxyXG4gICAgICAgICAgICAvLyBWaWRlb3Mgc2hvdWxkIHN0YXJ0IHBsYXlpbmcgb25jZSBvbmNlIHRoZSBnYWxsZXJ5IGlzIGNvbXBsZXRlbHkgbG9hZGVkXHJcbiAgICAgICAgICAgIHZhciBfc3BlZWQgPSBpc0ZpcnN0U2xpZGUgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2xpZGVUeXBlKGN1cnJlbnRHYWxsZXJ5SXRlbSkgPT09ICd2aWRlbycgJiZcclxuICAgICAgICAgICAgICAgICFjdXJyZW50R2FsbGVyeUl0ZW0ucG9zdGVyXHJcbiAgICAgICAgICAgICAgICA/IHNwZWVkXHJcbiAgICAgICAgICAgICAgICA6IDA7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5hZGRDbGFzcygnbGctY29tcGxldGUgbGctY29tcGxldGVfJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuc2xpZGVJdGVtTG9hZCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBkZWxheTogZGVsYXkgfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0U2xpZGU6IGlzRmlyc3RTbGlkZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCBfc3BlZWQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5pc0ZpcnN0U2xpZGVXaXRoWm9vbUFuaW1hdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhKCF0aGlzLmxHYWxsZXJ5T24gJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuem9vbUZyb21PcmlnaW4gJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEltYWdlU2l6ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBBZGQgdmlkZW8gc2xpZGVJbmZvXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5hZGRTbGlkZVZpZGVvSW5mbyA9IGZ1bmN0aW9uIChpdGVtcykge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5fX3NsaWRlVmlkZW9JbmZvID0gdXRpbHMuaXNWaWRlbyhlbGVtZW50LnNyYywgISFlbGVtZW50LnZpZGVvLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5fX3NsaWRlVmlkZW9JbmZvICYmXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0dGluZ3MubG9hZFlvdVR1YmVQb3N0ZXIgJiZcclxuICAgICAgICAgICAgICAgICAgICAhZWxlbWVudC5wb3N0ZXIgJiZcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Ll9fc2xpZGVWaWRlb0luZm8ueW91dHViZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucG9zdGVyID0gXCIvL2ltZy55b3V0dWJlLmNvbS92aS9cIiArIGVsZW1lbnQuX19zbGlkZVZpZGVvSW5mby55b3V0dWJlWzFdICsgXCIvbWF4cmVzZGVmYXVsdC5qcGdcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgTG9hZCBzbGlkZSBjb250ZW50IGludG8gc2xpZGUuXHJcbiAgICAgICAgICogIFRoaXMgaXMgdXNlZCB0byBsb2FkIGNvbnRlbnQgaW50byBzbGlkZXMgdGhhdCBpcyBub3QgdmlzaWJsZSB0b29cclxuICAgICAgICAgKiAgQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gaW5kZXggb2YgdGhlIHNsaWRlLlxyXG4gICAgICAgICAqICBAcGFyYW0ge0Jvb2xlYW59IHJlYyAtIGlmIHRydWUgY2FsbCBsb2FkY29udGVudCgpIGZ1bmN0aW9uIGFnYWluLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUubG9hZENvbnRlbnQgPSBmdW5jdGlvbiAoaW5kZXgsIHJlYykge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEdhbGxlcnlJdGVtID0gdGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICB2YXIgJGN1cnJlbnRTbGlkZSA9ICRMRyh0aGlzLmdldFNsaWRlSXRlbUlkKGluZGV4KSk7XHJcbiAgICAgICAgICAgIHZhciBwb3N0ZXIgPSBjdXJyZW50R2FsbGVyeUl0ZW0ucG9zdGVyLCBzcmNzZXQgPSBjdXJyZW50R2FsbGVyeUl0ZW0uc3Jjc2V0LCBzaXplcyA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5zaXplcywgc291cmNlcyA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5zb3VyY2VzO1xyXG4gICAgICAgICAgICB2YXIgc3JjID0gY3VycmVudEdhbGxlcnlJdGVtLnNyYztcclxuICAgICAgICAgICAgdmFyIHZpZGVvID0gY3VycmVudEdhbGxlcnlJdGVtLnZpZGVvO1xyXG4gICAgICAgICAgICB2YXIgX2h0bWw1VmlkZW8gPSB2aWRlbyAmJiB0eXBlb2YgdmlkZW8gPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZSh2aWRlbykgOiB2aWRlbztcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRHYWxsZXJ5SXRlbS5yZXNwb25zaXZlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3JjRHlJdG1zID0gY3VycmVudEdhbGxlcnlJdGVtLnJlc3BvbnNpdmUuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgICAgIHNyYyA9IHV0aWxzLmdldFJlc3BvbnNpdmVTcmMoc3JjRHlJdG1zKSB8fCBzcmM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHZpZGVvSW5mbyA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5fX3NsaWRlVmlkZW9JbmZvO1xyXG4gICAgICAgICAgICB2YXIgbGdWaWRlb1N0eWxlID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBpZnJhbWUgPSAhIWN1cnJlbnRHYWxsZXJ5SXRlbS5pZnJhbWU7XHJcbiAgICAgICAgICAgIHZhciBpc0ZpcnN0U2xpZGUgPSAhdGhpcy5sR2FsbGVyeU9uO1xyXG4gICAgICAgICAgICAvLyBkZWxheSBmb3IgYWRkaW5nIGNvbXBsZXRlIGNsYXNzLiBpdCBpcyAwIGV4Y2VwdCBmaXJzdCB0aW1lLlxyXG4gICAgICAgICAgICB2YXIgZGVsYXkgPSAwO1xyXG4gICAgICAgICAgICBpZiAoaXNGaXJzdFNsaWRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy56b29tRnJvbU9yaWdpbiAmJiB0aGlzLmN1cnJlbnRJbWFnZVNpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxheSA9IHRoaXMuc2V0dGluZ3Muc3RhcnRBbmltYXRpb25EdXJhdGlvbiArIDEwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsYXkgPSB0aGlzLnNldHRpbmdzLmJhY2tkcm9wRHVyYXRpb24gKyAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISRjdXJyZW50U2xpZGUuaGFzQ2xhc3MoJ2xnLWxvYWRlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmlkZW9JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hID0gdGhpcy5tZWRpYUNvbnRhaW5lclBvc2l0aW9uLCB0b3BfMiA9IF9hLnRvcCwgYm90dG9tID0gX2EuYm90dG9tO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2aWRlb1NpemUgPSB1dGlscy5nZXRTaXplKHRoaXMuaXRlbXNbaW5kZXhdLCB0aGlzLm91dGVyLCB0b3BfMiArIGJvdHRvbSwgdmlkZW9JbmZvICYmIHRoaXMuc2V0dGluZ3MudmlkZW9NYXhTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICBsZ1ZpZGVvU3R5bGUgPSB0aGlzLmdldFZpZGVvQ29udFN0eWxlKHZpZGVvU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaWZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hcmt1cCA9IHV0aWxzLmdldElmcmFtZU1hcmt1cCh0aGlzLnNldHRpbmdzLmlmcmFtZVdpZHRoLCB0aGlzLnNldHRpbmdzLmlmcmFtZUhlaWdodCwgdGhpcy5zZXR0aW5ncy5pZnJhbWVNYXhXaWR0aCwgdGhpcy5zZXR0aW5ncy5pZnJhbWVNYXhIZWlnaHQsIHNyYywgY3VycmVudEdhbGxlcnlJdGVtLmlmcmFtZVRpdGxlKTtcclxuICAgICAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlLnByZXBlbmQobWFya3VwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBvc3Rlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkdW1teUltZyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBoYXNTdGFydEFuaW1hdGlvbiA9IGlzRmlyc3RTbGlkZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnpvb21Gcm9tT3JpZ2luICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEltYWdlU2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFzU3RhcnRBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHVtbXlJbWcgPSB0aGlzLmdldER1bW15SW1hZ2VDb250ZW50KCRjdXJyZW50U2xpZGUsIGluZGV4LCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXJrdXAgPSB1dGlscy5nZXRWaWRlb1Bvc3Rlck1hcmt1cChwb3N0ZXIsIGR1bW15SW1nIHx8ICcnLCBsZ1ZpZGVvU3R5bGUsIHRoaXMuc2V0dGluZ3Muc3RyaW5nc1sncGxheVZpZGVvJ10sIHZpZGVvSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5wcmVwZW5kKG1hcmt1cCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2aWRlb0luZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWFya3VwID0gXCI8ZGl2IGNsYXNzPVxcXCJsZy12aWRlby1jb250IFxcXCIgc3R5bGU9XFxcIlwiICsgbGdWaWRlb1N0eWxlICsgXCJcXFwiPjwvZGl2PlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUucHJlcGVuZChtYXJrdXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRJbWdNYXJrdXAoc3JjLCAkY3VycmVudFNsaWRlLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNyY3NldCB8fCBzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW1nID0gJGN1cnJlbnRTbGlkZS5maW5kKCcubGctb2JqZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBpY3R1cmVGaWxsKCRpbWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwb3N0ZXIgfHwgdmlkZW9JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuaGFzVmlkZW8sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IHNyYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDVWaWRlbzogX2h0bWw1VmlkZW8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Bvc3RlcjogISFwb3N0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5hZnRlckFwcGVuZFNsaWRlLCB7IGluZGV4OiBpbmRleCB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxHYWxsZXJ5T24gJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLmFwcGVuZFN1Ykh0bWxUbyA9PT0gJy5sZy1pdGVtJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSHRtbChpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRm9yIGZpcnN0IHRpbWUgYWRkIHNvbWUgZGVsYXkgZm9yIGRpc3BsYXlpbmcgdGhlIHN0YXJ0IGFuaW1hdGlvbi5cclxuICAgICAgICAgICAgdmFyIF9zcGVlZCA9IDA7XHJcbiAgICAgICAgICAgIC8vIERvIG5vdCBjaGFuZ2UgdGhlIGRlbGF5IHZhbHVlIGJlY2F1c2UgaXQgaXMgcmVxdWlyZWQgZm9yIHpvb20gcGx1Z2luLlxyXG4gICAgICAgICAgICAvLyBJZiBnYWxsZXJ5IG9wZW5lZCBmcm9tIGRpcmVjdCB1cmwgKGhhc2gpIHNwZWVkIHZhbHVlIHNob3VsZCBiZSAwXHJcbiAgICAgICAgICAgIGlmIChkZWxheSAmJiAhJExHKGRvY3VtZW50LmJvZHkpLmhhc0NsYXNzKCdsZy1mcm9tLWhhc2gnKSkge1xyXG4gICAgICAgICAgICAgICAgX3NwZWVkID0gZGVsYXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gT25seSBmb3IgZmlyc3Qgc2xpZGUgYW5kIHpvb21Gcm9tT3JpZ2luIGlzIGVuYWJsZWRcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNGaXJzdFNsaWRlV2l0aFpvb21BbmltYXRpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xnLXN0YXJ0LWVuZC1wcm9ncmVzcyBsZy1zdGFydC1wcm9ncmVzcycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5zZXR0aW5ncy5zdGFydEFuaW1hdGlvbkR1cmF0aW9uICsgMTAwKTtcclxuICAgICAgICAgICAgICAgIGlmICghJGN1cnJlbnRTbGlkZS5oYXNDbGFzcygnbGctbG9hZGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmdldFNsaWRlVHlwZShjdXJyZW50R2FsbGVyeUl0ZW0pID09PSAnaW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWctd3JhcCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCh1dGlscy5nZXRJbWdNYXJrdXAoaW5kZXgsIHNyYywgJycsIHNyY3NldCwgc2l6ZXMsIGN1cnJlbnRHYWxsZXJ5SXRlbS5zb3VyY2VzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Jjc2V0IHx8IHNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGltZyA9ICRjdXJyZW50U2xpZGUuZmluZCgnLmxnLW9iamVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmluaXRQaWN0dXJlRmlsbCgkaW1nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuZ2V0U2xpZGVUeXBlKGN1cnJlbnRHYWxsZXJ5SXRlbSkgPT09ICdpbWFnZScgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChfdGhpcy5nZXRTbGlkZVR5cGUoY3VycmVudEdhbGxlcnlJdGVtKSA9PT0gJ3ZpZGVvJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RlcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uTGdPYmplY3RMb2FkKCRjdXJyZW50U2xpZGUsIGluZGV4LCBkZWxheSwgX3NwZWVkLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsb2FkIHJlbWFpbmluZyBzbGlkZXMgb25jZSB0aGUgc2xpZGUgaXMgY29tcGxldGVseSBsb2FkZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uU2xpZGVPYmplY3RMb2FkKCRjdXJyZW50U2xpZGUsICEhKHZpZGVvSW5mbyAmJiB2aWRlb0luZm8uaHRtbDUgJiYgIXBvc3RlciksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5sb2FkQ29udGVudE9uRmlyc3RTbGlkZUxvYWQoaW5kZXgsICRjdXJyZW50U2xpZGUsIF9zcGVlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9hZENvbnRlbnRPbkZpcnN0U2xpZGVMb2FkKGluZGV4LCAkY3VycmVudFNsaWRlLCBfc3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnNldHRpbmdzLnN0YXJ0QW5pbWF0aW9uRHVyYXRpb24gKyAxMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNMaWRlIGNvbnRlbnQgaGFzIGJlZW4gYWRkZWQgdG8gZG9tXHJcbiAgICAgICAgICAgICRjdXJyZW50U2xpZGUuYWRkQ2xhc3MoJ2xnLWxvYWRlZCcpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNGaXJzdFNsaWRlV2l0aFpvb21BbmltYXRpb24oKSB8fFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuZ2V0U2xpZGVUeXBlKGN1cnJlbnRHYWxsZXJ5SXRlbSkgPT09ICd2aWRlbycgJiYgIXBvc3RlcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25MZ09iamVjdExvYWQoJGN1cnJlbnRTbGlkZSwgaW5kZXgsIGRlbGF5LCBfc3BlZWQsIGlzRmlyc3RTbGlkZSwgISEodmlkZW9JbmZvICYmIHZpZGVvSW5mby5odG1sNSAmJiAhcG9zdGVyKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gV2hlbiBnYWxsZXJ5IGlzIG9wZW5lZCBvbmNlIGNvbnRlbnQgaXMgbG9hZGVkIChzZWNvbmQgdGltZSkgbmVlZCB0byBhZGQgbGctY29tcGxldGUgY2xhc3MgZm9yIGNzcyBzdHlsaW5nXHJcbiAgICAgICAgICAgIGlmICgoIXRoaXMuem9vbUZyb21PcmlnaW4gfHwgIXRoaXMuY3VycmVudEltYWdlU2l6ZSkgJiZcclxuICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUuaGFzQ2xhc3MoJ2xnLWNvbXBsZXRlXycpICYmXHJcbiAgICAgICAgICAgICAgICAhdGhpcy5sR2FsbGVyeU9uKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlLmFkZENsYXNzKCdsZy1jb21wbGV0ZScpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5zZXR0aW5ncy5iYWNrZHJvcER1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBDb250ZW50IGxvYWRlZFxyXG4gICAgICAgICAgICAvLyBOZWVkIHRvIHNldCBsR2FsbGVyeU9uIGJlZm9yZSBjYWxsaW5nIHByZWxvYWQgZnVuY3Rpb25cclxuICAgICAgICAgICAgdGhpcy5sR2FsbGVyeU9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHJlYyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkY3VycmVudFNsaWRlLmhhc0NsYXNzKCdsZy1jb21wbGV0ZV8nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1vYmplY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2xvYWQubGcgZXJyb3IubGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnByZWxvYWQoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVsb2FkKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgUmVtb3ZlIGR1bW15IGltYWdlIGNvbnRlbnQgYW5kIGxvYWQgbmV4dCBzbGlkZXNcclxuICAgICAgICAgKiBDYWxsZWQgb25seSBmb3IgdGhlIGZpcnN0IHRpbWUgaWYgem9vbUZyb21PcmlnaW4gYW5pbWF0aW9uIGlzIGVuYWJsZWRcclxuICAgICAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAgICAgKiBAcGFyYW0gJGN1cnJlbnRTbGlkZVxyXG4gICAgICAgICAqIEBwYXJhbSBzcGVlZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUubG9hZENvbnRlbnRPbkZpcnN0U2xpZGVMb2FkID0gZnVuY3Rpb24gKGluZGV4LCAkY3VycmVudFNsaWRlLCBzcGVlZCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUuZmluZCgnLmxnLWR1bW15LWltZycpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcygnbGctZmlyc3Qtc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1maXJzdC1zbGlkZS1sb2FkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5pc0R1bW15SW1hZ2VSZW1vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnByZWxvYWQoaW5kZXgpO1xyXG4gICAgICAgICAgICB9LCBzcGVlZCArIDMwMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldEl0ZW1zVG9CZUluc2VydGVkVG9Eb20gPSBmdW5jdGlvbiAoaW5kZXgsIHByZXZJbmRleCwgbnVtYmVyT2ZJdGVtcykge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAobnVtYmVyT2ZJdGVtcyA9PT0gdm9pZCAwKSB7IG51bWJlck9mSXRlbXMgPSAwOyB9XHJcbiAgICAgICAgICAgIHZhciBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tID0gW107XHJcbiAgICAgICAgICAgIC8vIE1pbmltdW0gMiBpdGVtcyBzaG91bGQgYmUgdGhlcmVcclxuICAgICAgICAgICAgdmFyIHBvc3NpYmxlTnVtYmVyT2ZJdGVtcyA9IE1hdGgubWF4KG51bWJlck9mSXRlbXMsIDMpO1xyXG4gICAgICAgICAgICBwb3NzaWJsZU51bWJlck9mSXRlbXMgPSBNYXRoLm1pbihwb3NzaWJsZU51bWJlck9mSXRlbXMsIHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHZhciBwcmV2SW5kZXhJdGVtID0gXCJsZy1pdGVtLVwiICsgdGhpcy5sZ0lkICsgXCItXCIgKyBwcmV2SW5kZXg7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggPD0gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYWxsZXJ5SXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoX2VsZW1lbnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5wdXNoKFwibGctaXRlbS1cIiArIF90aGlzLmxnSWQgKyBcIi1cIiArIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zVG9CZUluc2VydGVkVG9Eb207XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZGV4IDwgKHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAtIDEpIC8gMikge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaWR4ID0gaW5kZXg7IGlkeCA+IGluZGV4IC0gcG9zc2libGVOdW1iZXJPZkl0ZW1zIC8gMiAmJiBpZHggPj0gMDsgaWR4LS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLnB1c2goXCJsZy1pdGVtLVwiICsgdGhpcy5sZ0lkICsgXCItXCIgKyBpZHgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIG51bWJlck9mRXhpc3RpbmdJdGVtcyA9IGl0ZW1zVG9CZUluc2VydGVkVG9Eb20ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgcG9zc2libGVOdW1iZXJPZkl0ZW1zIC0gbnVtYmVyT2ZFeGlzdGluZ0l0ZW1zOyBpZHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20ucHVzaChcImxnLWl0ZW0tXCIgKyB0aGlzLmxnSWQgKyBcIi1cIiArIChpbmRleCArIGlkeCArIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGlkeCA9IGluZGV4OyBpZHggPD0gdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIC0gMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGlkeCA8IGluZGV4ICsgcG9zc2libGVOdW1iZXJPZkl0ZW1zIC8gMjsgaWR4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLnB1c2goXCJsZy1pdGVtLVwiICsgdGhpcy5sZ0lkICsgXCItXCIgKyBpZHgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIG51bWJlck9mRXhpc3RpbmdJdGVtcyA9IGl0ZW1zVG9CZUluc2VydGVkVG9Eb20ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgcG9zc2libGVOdW1iZXJPZkl0ZW1zIC0gbnVtYmVyT2ZFeGlzdGluZ0l0ZW1zOyBpZHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20ucHVzaChcImxnLWl0ZW0tXCIgKyB0aGlzLmxnSWQgKyBcIi1cIiArIChpbmRleCAtIGlkeCAtIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLnB1c2goXCJsZy1pdGVtLVwiICsgdGhpcy5sZ0lkICsgXCItXCIgKyAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5wdXNoKFwibGctaXRlbS1cIiArIHRoaXMubGdJZCArIFwiLVwiICsgKHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAtIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5pbmRleE9mKHByZXZJbmRleEl0ZW0pID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5wdXNoKFwibGctaXRlbS1cIiArIHRoaXMubGdJZCArIFwiLVwiICsgcHJldkluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUub3JnYW5pemVTbGlkZUl0ZW1zID0gZnVuY3Rpb24gKGluZGV4LCBwcmV2SW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20gPSB0aGlzLmdldEl0ZW1zVG9CZUluc2VydGVkVG9Eb20oaW5kZXgsIHByZXZJbmRleCwgdGhpcy5zZXR0aW5ncy5udW1iZXJPZlNsaWRlSXRlbXNJbkRvbSk7XHJcbiAgICAgICAgICAgIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmN1cnJlbnRJdGVtc0luRG9tLmluZGV4T2YoaXRlbSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGlubmVyLmFwcGVuZChcIjxkaXYgaWQ9XFxcIlwiICsgaXRlbSArIFwiXFxcIiBjbGFzcz1cXFwibGctaXRlbVxcXCI+PC9kaXY+XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbXNJbkRvbS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5pbmRleE9mKGl0ZW0pID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRMRyhcIiNcIiArIGl0ZW0pLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zVG9CZUluc2VydGVkVG9Eb207XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgcHJldmlvdXMgaW5kZXggb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXRQcmV2aW91c1NsaWRlSW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmV2SW5kZXggPSAwO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRJdGVtSWQgPSB0aGlzLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1jdXJyZW50JylcclxuICAgICAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICAgICAgcHJldkluZGV4ID0gcGFyc2VJbnQoY3VycmVudEl0ZW1JZC5zcGxpdCgnLScpWzNdKSB8fCAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgcHJldkluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJldkluZGV4O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5zZXREb3dubG9hZFZhbHVlID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmRvd25sb2FkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudEdhbGxlcnlJdGVtID0gdGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhpZGVEb3dubG9hZEJ0biA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5kb3dubG9hZFVybCA9PT0gZmFsc2UgfHxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50R2FsbGVyeUl0ZW0uZG93bmxvYWRVcmwgPT09ICdmYWxzZSc7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGlkZURvd25sb2FkQnRuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlci5hZGRDbGFzcygnbGctaGlkZS1kb3dubG9hZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRkb3dubG9hZCA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLWRvd25sb2FkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctaGlkZS1kb3dubG9hZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICRkb3dubG9hZC5hdHRyKCdocmVmJywgY3VycmVudEdhbGxlcnlJdGVtLmRvd25sb2FkVXJsIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRHYWxsZXJ5SXRlbS5zcmMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50R2FsbGVyeUl0ZW0uZG93bmxvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGRvd25sb2FkLmF0dHIoJ2Rvd25sb2FkJywgY3VycmVudEdhbGxlcnlJdGVtLmRvd25sb2FkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUubWFrZVNsaWRlQW5pbWF0aW9uID0gZnVuY3Rpb24gKGRpcmVjdGlvbiwgY3VycmVudFNsaWRlSXRlbSwgcHJldmlvdXNTbGlkZUl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoaXMubEdhbGxlcnlPbikge1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTbGlkZUl0ZW0uYWRkQ2xhc3MoJ2xnLXNsaWRlLXByb2dyZXNzJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgYWxsIHRyYW5zaXRpb25zXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5hZGRDbGFzcygnbGctbm8tdHJhbnMnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xnLXByZXYtc2xpZGUgbGctbmV4dC1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9wcmV2c2xpZGVcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGVJdGVtLmFkZENsYXNzKCdsZy1wcmV2LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNTbGlkZUl0ZW0uYWRkQ2xhc3MoJ2xnLW5leHQtc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2xpZGVcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGVJdGVtLmFkZENsYXNzKCdsZy1uZXh0LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNTbGlkZUl0ZW0uYWRkQ2xhc3MoJ2xnLXByZXYtc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGdpdmUgNTAgbXMgZm9yIGJyb3dzZXIgdG8gYWRkL3JlbW92ZSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuZmluZCgnLmxnLWl0ZW0nKS5yZW1vdmVDbGFzcygnbGctY3VycmVudCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZUl0ZW0uYWRkQ2xhc3MoJ2xnLWN1cnJlbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZXNldCBhbGwgdHJhbnNpdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctbm8tdHJhbnMnKTtcclxuICAgICAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgICAgfSwgdGhpcy5sR2FsbGVyeU9uID8gdGhpcy5zZXR0aW5ncy5zbGlkZURlbGF5IDogMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHb3RvIGEgc3BlY2lmaWMgc2xpZGUuXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gaW5kZXggb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBmcm9tVG91Y2ggLSB0cnVlIGlmIHNsaWRlIGZ1bmN0aW9uIGNhbGxlZCB2aWEgdG91Y2ggZXZlbnQgb3IgbW91c2UgZHJhZ1xyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZnJvbVRodW1iIC0gdHJ1ZSBpZiBzbGlkZSBmdW5jdGlvbiBjYWxsZWQgdmlhIHRodW1ibmFpbCBjbGlja1xyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJlY3Rpb24gLSBEaXJlY3Rpb24gb2YgdGhlIHNsaWRlKG5leHQvcHJldilcclxuICAgICAgICAgKiBAY2F0ZWdvcnkgbEdQdWJsaWNNZXRob2RzXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiAgY29uc3QgcGx1Z2luID0gbGlnaHRHYWxsZXJ5KCk7XHJcbiAgICAgICAgICogIC8vIHRvIGdvIHRvIDNyZCBzbGlkZVxyXG4gICAgICAgICAqICBwbHVnaW4uc2xpZGUoMik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnNsaWRlID0gZnVuY3Rpb24gKGluZGV4LCBmcm9tVG91Y2gsIGZyb21UaHVtYiwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBwcmV2SW5kZXggPSB0aGlzLmdldFByZXZpb3VzU2xpZGVJbmRleCgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJdGVtc0luRG9tID0gdGhpcy5vcmdhbml6ZVNsaWRlSXRlbXMoaW5kZXgsIHByZXZJbmRleCk7XHJcbiAgICAgICAgICAgIC8vIFByZXZlbnQgbXVsdGlwbGUgY2FsbCwgUmVxdWlyZWQgZm9yIGhzaCBwbHVnaW5cclxuICAgICAgICAgICAgaWYgKHRoaXMubEdhbGxlcnlPbiAmJiBwcmV2SW5kZXggPT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG51bWJlck9mR2FsbGVyeUl0ZW1zID0gdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGdCdXN5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jb3VudGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50Q291bnRlcihpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFNsaWRlSXRlbSA9IHRoaXMuZ2V0U2xpZGVJdGVtKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHZhciBwcmV2aW91c1NsaWRlSXRlbV8xID0gdGhpcy5nZXRTbGlkZUl0ZW0ocHJldkluZGV4KTtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50R2FsbGVyeUl0ZW0gPSB0aGlzLmdhbGxlcnlJdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlkZW9JbmZvID0gY3VycmVudEdhbGxlcnlJdGVtLl9fc2xpZGVWaWRlb0luZm87XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmF0dHIoJ2RhdGEtbGctc2xpZGUtdHlwZScsIHRoaXMuZ2V0U2xpZGVUeXBlKGN1cnJlbnRHYWxsZXJ5SXRlbSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREb3dubG9hZFZhbHVlKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmICh2aWRlb0luZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSB0aGlzLm1lZGlhQ29udGFpbmVyUG9zaXRpb24sIHRvcF8zID0gX2EudG9wLCBib3R0b20gPSBfYS5ib3R0b207XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZGVvU2l6ZSA9IHV0aWxzLmdldFNpemUodGhpcy5pdGVtc1tpbmRleF0sIHRoaXMub3V0ZXIsIHRvcF8zICsgYm90dG9tLCB2aWRlb0luZm8gJiYgdGhpcy5zZXR0aW5ncy52aWRlb01heFNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzaXplVmlkZW9TbGlkZShpbmRleCwgdmlkZW9TaXplKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmJlZm9yZVNsaWRlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkluZGV4OiBwcmV2SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIGZyb21Ub3VjaDogISFmcm9tVG91Y2gsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbVRodW1iOiAhIWZyb21UaHVtYixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZ0J1c3kgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZUJhclRpbWVvdXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJvd0Rpc2FibGUoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBwcmV2SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3ByZXYnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbmRleCA+IHByZXZJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAnbmV4dCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFmcm9tVG91Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VTbGlkZUFuaW1hdGlvbihkaXJlY3Rpb24sIGN1cnJlbnRTbGlkZUl0ZW0sIHByZXZpb3VzU2xpZGVJdGVtXzEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWl0ZW0nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xnLXByZXYtc2xpZGUgbGctY3VycmVudCBsZy1uZXh0LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoUHJldiA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2hOZXh0ID0gdm9pZCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChudW1iZXJPZkdhbGxlcnlJdGVtcyA+IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hQcmV2ID0gaW5kZXggLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5leHQgPSBpbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiBwcmV2SW5kZXggPT09IG51bWJlck9mR2FsbGVyeUl0ZW1zIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOZXh0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoUHJldiA9IG51bWJlck9mR2FsbGVyeUl0ZW1zIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gbnVtYmVyT2ZHYWxsZXJ5SXRlbXMgLSAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2SW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByZXYgc2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTmV4dCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaFByZXYgPSBudW1iZXJPZkdhbGxlcnlJdGVtcyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoUHJldiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTmV4dCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdwcmV2Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNsaWRlSXRlbSh0b3VjaE5leHQpLmFkZENsYXNzKCdsZy1uZXh0LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNsaWRlSXRlbSh0b3VjaFByZXYpLmFkZENsYXNzKCdsZy1wcmV2LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZUl0ZW0uYWRkQ2xhc3MoJ2xnLWN1cnJlbnQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBwdXQgbG9hZCBjb250ZW50IGluIHNldCB0aW1lb3V0IGFzIGl0IG5lZWRzIHRvIGxvYWQgaW1tZWRpYXRlbHkgd2hlbiB0aGUgZ2FsbGVyeSBpcyBvcGVuZWRcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5sR2FsbGVyeU9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQ29udGVudChpbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9hZENvbnRlbnQoaW5kZXgsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGl0bGUgaWYgdGhpcy5zZXR0aW5ncy5hcHBlbmRTdWJIdG1sVG8gPT09IGxnLXN1Yi1odG1sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zZXR0aW5ncy5hcHBlbmRTdWJIdG1sVG8gIT09ICcubGctaXRlbScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmFkZEh0bWwoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5zZXR0aW5ncy5zcGVlZCArIDUwICsgKGZyb21Ub3VjaCA/IDAgOiB0aGlzLnNldHRpbmdzLnNsaWRlRGVsYXkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmxnQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzU2xpZGVJdGVtXzEucmVtb3ZlQ2xhc3MoJ2xnLXNsaWRlLXByb2dyZXNzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmFmdGVyU2xpZGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldkluZGV4OiBwcmV2SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbVRvdWNoOiBmcm9tVG91Y2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21UaHVtYjogZnJvbVRodW1iLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgKHRoaXMubEdhbGxlcnlPbiA/IHRoaXMuc2V0dGluZ3Muc3BlZWQgKyAxMDAgOiAxMDApICsgKGZyb21Ub3VjaCA/IDAgOiB0aGlzLnNldHRpbmdzLnNsaWRlRGVsYXkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnVwZGF0ZUN1cnJlbnRDb3VudGVyID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLWNvdW50ZXItY3VycmVudCcpLmh0bWwoaW5kZXggKyAxICsgJycpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS51cGRhdGVDb3VudGVyVG90YWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLWNvdW50ZXItYWxsJykuaHRtbCh0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggKyAnJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldFNsaWRlVHlwZSA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLl9fc2xpZGVWaWRlb0luZm8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAndmlkZW8nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0uaWZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2lmcmFtZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2ltYWdlJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS50b3VjaE1vdmUgPSBmdW5jdGlvbiAoc3RhcnRDb29yZHMsIGVuZENvb3JkcywgZSkge1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2VYID0gZW5kQ29vcmRzLnBhZ2VYIC0gc3RhcnRDb29yZHMucGFnZVg7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZVkgPSBlbmRDb29yZHMucGFnZVkgLSBzdGFydENvb3Jkcy5wYWdlWTtcclxuICAgICAgICAgICAgdmFyIGFsbG93U3dpcGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3dpcGVEaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGFsbG93U3dpcGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpc3RhbmNlWCkgPiAxNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dpcGVEaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dTd2lwZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChNYXRoLmFicyhkaXN0YW5jZVkpID4gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3aXBlRGlyZWN0aW9uID0gJ3ZlcnRpY2FsJztcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1N3aXBlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWFsbG93U3dpcGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgJGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0U2xpZGVJdGVtKHRoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zd2lwZURpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgICAgICAgICAgICBlID09PSBudWxsIHx8IGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIC8vIHJlc2V0IG9wYWNpdHkgYW5kIHRyYW5zaXRpb24gZHVyYXRpb25cclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLWRyYWdnaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBtb3ZlIGN1cnJlbnQgc2xpZGVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNsYXRlKCRjdXJyZW50U2xpZGUsIGRpc3RhbmNlWCwgMCk7XHJcbiAgICAgICAgICAgICAgICAvLyBtb3ZlIG5leHQgYW5kIHByZXYgc2xpZGUgd2l0aCBjdXJyZW50IHNsaWRlXHJcbiAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSAkY3VycmVudFNsaWRlLmdldCgpLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlV2lkdGhBbW91bnQgPSAod2lkdGggKiAxNSkgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3V0dGVyID0gc2xpZGVXaWR0aEFtb3VudCAtIE1hdGguYWJzKChkaXN0YW5jZVggKiAxMCkgLyAxMDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2xhdGUodGhpcy5vdXRlci5maW5kKCcubGctcHJldi1zbGlkZScpLmZpcnN0KCksIC13aWR0aCArIGRpc3RhbmNlWCAtIGd1dHRlciwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZSh0aGlzLm91dGVyLmZpbmQoJy5sZy1uZXh0LXNsaWRlJykuZmlyc3QoKSwgd2lkdGggKyBkaXN0YW5jZVggKyBndXR0ZXIsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc3dpcGVEaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnN3aXBlVG9DbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUgPT09IG51bGwgfHwgZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5hZGRDbGFzcygnbGctZHJhZ2dpbmctdmVydGljYWwnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3BhY2l0eSA9IDEgLSBNYXRoLmFicyhkaXN0YW5jZVkpIC8gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGJhY2tkcm9wLmNzcygnb3BhY2l0eScsIG9wYWNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY2FsZSA9IDEgLSBNYXRoLmFicyhkaXN0YW5jZVkpIC8gKHdpbmRvdy5pbm5lcldpZHRoICogMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2xhdGUoJGN1cnJlbnRTbGlkZSwgMCwgZGlzdGFuY2VZLCBzY2FsZSwgc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZVkpID4gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbGctaGlkZS1pdGVtcycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xnLWNvbXBvbmVudHMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS50b3VjaEVuZCA9IGZ1bmN0aW9uIChlbmRDb29yZHMsIHN0YXJ0Q29vcmRzLCBldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2U7XHJcbiAgICAgICAgICAgIC8vIGtlZXAgc2xpZGUgYW5pbWF0aW9uIGZvciBhbnkgbW9kZSB3aGlsZSBkcmFnZy9zd2lwZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tb2RlICE9PSAnbGctc2xpZGUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKCdsZy1zbGlkZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHNldCB0cmFuc2l0aW9uIGR1cmF0aW9uXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuJGNvbnRhaW5lci5yZW1vdmVDbGFzcygnbGctZHJhZ2dpbmctdmVydGljYWwnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsZy1kcmFnZ2luZyBsZy1oaWRlLWl0ZW1zJylcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xnLWNvbXBvbmVudHMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyaWdnZXJDbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuc3dpcGVEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gZW5kQ29vcmRzLnBhZ2VYIC0gc3RhcnRDb29yZHMucGFnZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlQWJzID0gTWF0aC5hYnMoZW5kQ29vcmRzLnBhZ2VYIC0gc3RhcnRDb29yZHMucGFnZVgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VBYnMgPiBfdGhpcy5zZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5nb1RvTmV4dFNsaWRlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGlzdGFuY2UgPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlQWJzID4gX3RoaXMuc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ29Ub1ByZXZTbGlkZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoX3RoaXMuc3dpcGVEaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguYWJzKGVuZENvb3Jkcy5wYWdlWSAtIHN0YXJ0Q29vcmRzLnBhZ2VZKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuc2V0dGluZ3MuY2xvc2FibGUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0dGluZ3Muc3dpcGVUb0Nsb3NlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlID4gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlR2FsbGVyeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kYmFja2Ryb3AuY3NzKCdvcGFjaXR5JywgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuZmluZCgnLmxnLWl0ZW0nKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyaWdnZXJDbGljayAmJlxyXG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKGVuZENvb3Jkcy5wYWdlWCAtIHN0YXJ0Q29vcmRzLnBhZ2VYKSA8IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIGNsaWNrIGlmIGRpc3RhbmNlIGlzIGxlc3MgdGhhbiA1IHBpeFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkTEcoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNQb3N0ZXJFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLnBvc3RlckNsaWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zd2lwZURpcmVjdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBzbGlkZSBjbGFzcyBvbmNlIGRyYWcvc3dpcGUgaXMgY29tcGxldGVkIGlmIG1vZGUgaXMgbm90IHNsaWRlXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5vdXRlci5oYXNDbGFzcygnbGctZHJhZ2dpbmcnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldHRpbmdzLm1vZGUgIT09ICdsZy1zbGlkZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdGhpcy5zZXR0aW5ncy5zcGVlZCArIDEwMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmVuYWJsZVN3aXBlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRDb29yZHMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGVuZENvb3JkcyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgaXNTd2lwaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmVuYWJsZVN3aXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpbm5lci5vbigndG91Y2hzdGFydC5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZHJhZ09yU3dpcGVFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJGl0ZW0gPSBfdGhpcy5nZXRTbGlkZUl0ZW0oX3RoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoJExHKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctaXRlbScpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtLmdldCgpLmNvbnRhaW5zKGUudGFyZ2V0KSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90aGlzLm91dGVyLmhhc0NsYXNzKCdsZy16b29tZWQnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3RoaXMubGdCdXN5ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTd2lwaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG91Y2hBY3Rpb24gPSAnc3dpcGUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYW5hZ2VTd2lwZUNsYXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVg6IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VZOiBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpbm5lci5vbigndG91Y2htb3ZlLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNTd2lwaW5nICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvdWNoQWN0aW9uID09PSAnc3dpcGUnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kQ29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVg6IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VZOiBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvdWNoTW92ZShzdGFydENvb3JkcywgZW5kQ29vcmRzLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpbm5lci5vbigndG91Y2hlbmQubGcnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMudG91Y2hBY3Rpb24gPT09ICdzd2lwZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTW92ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvdWNoRW5kKGVuZENvb3Jkcywgc3RhcnRDb29yZHMsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpc1N3aXBpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkTEcoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc1Bvc3RlckVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5wb3N0ZXJDbGljayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG91Y2hBY3Rpb24gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU3dpcGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmVuYWJsZURyYWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzdGFydENvb3JkcyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgZW5kQ29vcmRzID0ge307XHJcbiAgICAgICAgICAgIHZhciBpc0RyYWdpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGlzTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZW5hYmxlRHJhZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5vbignbW91c2Vkb3duLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5kcmFnT3JTd2lwZUVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkaXRlbSA9IF90aGlzLmdldFNsaWRlSXRlbShfdGhpcy5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLWl0ZW0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbS5nZXQoKS5jb250YWlucyhlLnRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5vdXRlci5oYXNDbGFzcygnbGctem9vbWVkJykgJiYgIV90aGlzLmxnQnVzeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5sZ0J1c3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYW5hZ2VTd2lwZUNsYXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRDb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VYOiBlLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWTogZS5wYWdlWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRHJhZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKiogRml4IGZvciB3ZWJraXQgY3Vyc29yIGlzc3VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yNjcyM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmdldCgpLnNjcm9sbExlZnQgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5nZXQoKS5zY3JvbGxMZWZ0IC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbGctZ3JhYicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbGctZ3JhYmJpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuZHJhZ1N0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJExHKHdpbmRvdykub24oXCJtb3VzZW1vdmUubGcuZ2xvYmFsXCIgKyB0aGlzLmxnSWQsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRHJhZ2luZyAmJiBfdGhpcy5sZ09wZW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kQ29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVg6IGUucGFnZVgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWTogZS5wYWdlWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG91Y2hNb3ZlKHN0YXJ0Q29vcmRzLCBlbmRDb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuZHJhZ01vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJExHKHdpbmRvdykub24oXCJtb3VzZXVwLmxnLmdsb2JhbFwiICsgdGhpcy5sZ0lkLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmxnT3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICRMRyhldmVudC50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc01vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG91Y2hFbmQoZW5kQ29vcmRzLCBzdGFydENvb3JkcywgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuZHJhZ0VuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKF90aGlzLmlzUG9zdGVyRWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5wb3N0ZXJDbGljayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgZXhlY3V0aW9uIG9uIGNsaWNrXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRHJhZ2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0RyYWdpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWdyYWJiaW5nJykuYWRkQ2xhc3MoJ2xnLWdyYWInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS50cmlnZ2VyUG9zdGVyQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuJGlubmVyLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5kcmFnT3JTd2lwZUVuYWJsZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pc1Bvc3RlckVsZW1lbnQoJExHKGV2ZW50LnRhcmdldCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLnBvc3RlckNsaWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLm1hbmFnZVN3aXBlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdG91Y2hOZXh0ID0gdGhpcy5pbmRleCArIDE7XHJcbiAgICAgICAgICAgIHZhciBfdG91Y2hQcmV2ID0gdGhpcy5pbmRleCAtIDE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxvb3AgJiYgdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoID4gMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBfdG91Y2hQcmV2ID0gdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdG91Y2hOZXh0ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm91dGVyLmZpbmQoJy5sZy1pdGVtJykucmVtb3ZlQ2xhc3MoJ2xnLW5leHQtc2xpZGUgbGctcHJldi1zbGlkZScpO1xyXG4gICAgICAgICAgICBpZiAoX3RvdWNoUHJldiA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFNsaWRlSXRlbShfdG91Y2hQcmV2KS5hZGRDbGFzcygnbGctcHJldi1zbGlkZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0U2xpZGVJdGVtKF90b3VjaE5leHQpLmFkZENsYXNzKCdsZy1uZXh0LXNsaWRlJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHbyB0byBuZXh0IHNsaWRlXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBmcm9tVG91Y2ggLSB0cnVlIGlmIHNsaWRlIGZ1bmN0aW9uIGNhbGxlZCB2aWEgdG91Y2ggZXZlbnRcclxuICAgICAgICAgKiBAY2F0ZWdvcnkgbEdQdWJsaWNNZXRob2RzXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiAgY29uc3QgcGx1Z2luID0gbGlnaHRHYWxsZXJ5KCk7XHJcbiAgICAgICAgICogIHBsdWdpbi5nb1RvTmV4dFNsaWRlKCk7XHJcbiAgICAgICAgICogQHNlZSA8YSBocmVmPVwiL2RlbW9zL21ldGhvZHMvXCI+RGVtbzwvYT5cclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdvVG9OZXh0U2xpZGUgPSBmdW5jdGlvbiAoZnJvbVRvdWNoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBfbG9vcCA9IHRoaXMuc2V0dGluZ3MubG9vcDtcclxuICAgICAgICAgICAgaWYgKGZyb21Ub3VjaCAmJiB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggPCAzKSB7XHJcbiAgICAgICAgICAgICAgICBfbG9vcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5sZ0J1c3kpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ICsgMSA8IHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5iZWZvcmVOZXh0U2xpZGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZSh0aGlzLmluZGV4LCAhIWZyb21Ub3VjaCwgZmFsc2UsICduZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX2xvb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmJlZm9yZU5leHRTbGlkZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlKHRoaXMuaW5kZXgsICEhZnJvbVRvdWNoLCBmYWxzZSwgJ25leHQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5zbGlkZUVuZEFuaW1hdGlvbiAmJiAhZnJvbVRvdWNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLXJpZ2h0LWVuZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1yaWdodC1lbmQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdvIHRvIHByZXZpb3VzIHNsaWRlc1xyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZnJvbVRvdWNoIC0gdHJ1ZSBpZiBzbGlkZSBmdW5jdGlvbiBjYWxsZWQgdmlhIHRvdWNoIGV2ZW50XHJcbiAgICAgICAgICogQGNhdGVnb3J5IGxHUHVibGljTWV0aG9kc1xyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogIGNvbnN0IHBsdWdpbiA9IGxpZ2h0R2FsbGVyeSh7fSk7XHJcbiAgICAgICAgICogIHBsdWdpbi5nb1RvUHJldlNsaWRlKCk7XHJcbiAgICAgICAgICogQHNlZSA8YSBocmVmPVwiL2RlbW9zL21ldGhvZHMvXCI+RGVtbzwvYT5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ29Ub1ByZXZTbGlkZSA9IGZ1bmN0aW9uIChmcm9tVG91Y2gpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIF9sb29wID0gdGhpcy5zZXR0aW5ncy5sb29wO1xyXG4gICAgICAgICAgICBpZiAoZnJvbVRvdWNoICYmIHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCA8IDMpIHtcclxuICAgICAgICAgICAgICAgIF9sb29wID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxnQnVzeSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmJlZm9yZVByZXZTbGlkZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbVRvdWNoOiBmcm9tVG91Y2gsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZSh0aGlzLmluZGV4LCAhIWZyb21Ub3VjaCwgZmFsc2UsICdwcmV2Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX2xvb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmJlZm9yZVByZXZTbGlkZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tVG91Y2g6IGZyb21Ub3VjaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGUodGhpcy5pbmRleCwgISFmcm9tVG91Y2gsIGZhbHNlLCAncHJldicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnNsaWRlRW5kQW5pbWF0aW9uICYmICFmcm9tVG91Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlci5hZGRDbGFzcygnbGctbGVmdC1lbmQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctbGVmdC1lbmQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUua2V5UHJlc3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICRMRyh3aW5kb3cpLm9uKFwia2V5ZG93bi5sZy5nbG9iYWxcIiArIHRoaXMubGdJZCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5sZ09wZW5lZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldHRpbmdzLmVzY0tleSA9PT0gdHJ1ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGUua2V5Q29kZSA9PT0gMjcpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLnNldHRpbmdzLmFsbG93TWVkaWFPdmVybGFwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmhhc0NsYXNzKCdsZy1jYW4tdG9nZ2xlJykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuaGFzQ2xhc3MoJ2xnLWNvbXBvbmVudHMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1jb21wb25lbnRzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlR2FsbGVyeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5sZ09wZW5lZCAmJiBfdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDM3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ29Ub1ByZXZTbGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAzOSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmdvVG9OZXh0U2xpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5hcnJvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctcHJldicpLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdvVG9QcmV2U2xpZGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLW5leHQnKS5vbignY2xpY2subGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5nb1RvTmV4dFNsaWRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5hcnJvd0Rpc2FibGUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgLy8gRGlzYWJsZSBhcnJvd3MgaWYgc2V0dGluZ3MuaGlkZUNvbnRyb2xPbkVuZCBpcyB0cnVlXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5sb29wICYmIHRoaXMuc2V0dGluZ3MuaGlkZUNvbnRyb2xPbkVuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRwcmV2ID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctcHJldicpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRuZXh0ID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctbmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA9PT0gdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJG5leHQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRuZXh0LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkcHJldi5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHByZXYucmVtb3ZlQXR0cignZGlzYWJsZWQnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5zZXRUcmFuc2xhdGUgPSBmdW5jdGlvbiAoJGVsLCB4VmFsdWUsIHlWYWx1ZSwgc2NhbGVYLCBzY2FsZVkpIHtcclxuICAgICAgICAgICAgaWYgKHNjYWxlWCA9PT0gdm9pZCAwKSB7IHNjYWxlWCA9IDE7IH1cclxuICAgICAgICAgICAgaWYgKHNjYWxlWSA9PT0gdm9pZCAwKSB7IHNjYWxlWSA9IDE7IH1cclxuICAgICAgICAgICAgJGVsLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKCcgK1xyXG4gICAgICAgICAgICAgICAgeFZhbHVlICtcclxuICAgICAgICAgICAgICAgICdweCwgJyArXHJcbiAgICAgICAgICAgICAgICB5VmFsdWUgK1xyXG4gICAgICAgICAgICAgICAgJ3B4LCAwcHgpIHNjYWxlM2QoJyArXHJcbiAgICAgICAgICAgICAgICBzY2FsZVggK1xyXG4gICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICBzY2FsZVkgK1xyXG4gICAgICAgICAgICAgICAgJywgMSknKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUubW91c2V3aGVlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGxhc3RDYWxsID0gMDtcclxuICAgICAgICAgICAgdGhpcy5vdXRlci5vbignd2hlZWwubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlLmRlbHRhWSB8fCBfdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3cgLSBsYXN0Q2FsbCA8IDEwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYXN0Q2FsbCA9IG5vdztcclxuICAgICAgICAgICAgICAgIGlmIChlLmRlbHRhWSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5nb1RvTmV4dFNsaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlLmRlbHRhWSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5nb1RvUHJldlNsaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5pc1NsaWRlRWxlbWVudCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICh0YXJnZXQuaGFzQ2xhc3MoJ2xnLW91dGVyJykgfHxcclxuICAgICAgICAgICAgICAgIHRhcmdldC5oYXNDbGFzcygnbGctaXRlbScpIHx8XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuaGFzQ2xhc3MoJ2xnLWltZy13cmFwJykpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5pc1Bvc3RlckVsZW1lbnQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5QnV0dG9uID0gdGhpcy5nZXRTbGlkZUl0ZW0odGhpcy5pbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctdmlkZW8tcGxheS1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gKHRhcmdldC5oYXNDbGFzcygnbGctdmlkZW8tcG9zdGVyJykgfHxcclxuICAgICAgICAgICAgICAgIHRhcmdldC5oYXNDbGFzcygnbGctdmlkZW8tcGxheS1idXR0b24nKSB8fFxyXG4gICAgICAgICAgICAgICAgKHBsYXlCdXR0b24gJiYgcGxheUJ1dHRvbi5jb250YWlucyh0YXJnZXQuZ2V0KCkpKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNYXhpbWl6ZSBtaW5pbWl6ZSBpbmxpbmUgZ2FsbGVyeS5cclxuICAgICAgICAgKiBAY2F0ZWdvcnkgbEdQdWJsaWNNZXRob2RzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS50b2dnbGVNYXhpbWl6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctbWF4aW1pemUnKS5vbignY2xpY2subGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy4kY29udGFpbmVyLnRvZ2dsZUNsYXNzKCdsZy1pbmxpbmUnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlZnJlc2hPblJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuaW52YWxpZGF0ZUl0ZW1zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdGVtcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5pdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkTEcoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoXCJjbGljay5sZ2N1c3RvbS1pdGVtLVwiICsgJGVsZW1lbnQuYXR0cignZGF0YS1sZy1pZCcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5tYW5hZ2VDbG9zZUdhbGxlcnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5jbG9zYWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIG1vdXNlZG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1jbG9zZScpLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlR2FsbGVyeSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY2xvc2VPblRhcCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgeW91IGRyYWcgdGhlIHNsaWRlIGFuZCByZWxlYXNlIG91dHNpZGUgZ2FsbGVyeSBnZXRzIGNsb3NlIG9uIGNocm9tZVxyXG4gICAgICAgICAgICAgICAgLy8gZm9yIHByZXZlbnRpbmcgdGhpcyBjaGVjayBtb3VzZWRvd24gYW5kIG1vdXNldXAgaGFwcGVuZWQgb24gLmxnLWl0ZW0gb3IgbGctb3V0ZXJcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIub24oJ21vdXNlZG93bi5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICRMRyhlLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzU2xpZGVFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2Vkb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlZG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5vbignbW91c2Vtb3ZlLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdXNlZG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLm9uKCdtb3VzZXVwLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJExHKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNTbGlkZUVsZW1lbnQodGFyZ2V0KSAmJiBtb3VzZWRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5vdXRlci5oYXNDbGFzcygnbGctZHJhZ2dpbmcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xvc2VHYWxsZXJ5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2xvc2UgbGlnaHRHYWxsZXJ5IGlmIGl0IGlzIG9wZW5lZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBJZiBjbG9zYWJsZSBpcyBmYWxzZSBpbiB0aGUgc2V0dGluZ3MsIHlvdSBuZWVkIHRvIHBhc3MgdHJ1ZSB2aWEgY2xvc2VHYWxsZXJ5IG1ldGhvZCB0byBmb3JjZSBjbG9zZSBnYWxsZXJ5XHJcbiAgICAgICAgICogQHJldHVybiByZXR1cm5zIHRoZSBlc3RpbWF0ZWQgdGltZSB0byBjbG9zZSBnYWxsZXJ5IGNvbXBsZXRlbHkgaW5jbHVkaW5nIHRoZSBjbG9zZSBhbmltYXRpb24gZHVyYXRpb25cclxuICAgICAgICAgKiBAY2F0ZWdvcnkgbEdQdWJsaWNNZXRob2RzXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiAgY29uc3QgcGx1Z2luID0gbGlnaHRHYWxsZXJ5KCk7XHJcbiAgICAgICAgICogIHBsdWdpbi5jbG9zZUdhbGxlcnkoKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuY2xvc2VHYWxsZXJ5ID0gZnVuY3Rpb24gKGZvcmNlKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5sZ09wZW5lZCB8fCAoIXRoaXMuc2V0dGluZ3MuY2xvc2FibGUgJiYgIWZvcmNlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuYmVmb3JlQ2xvc2UpO1xyXG4gICAgICAgICAgICAkTEcod2luZG93KS5zY3JvbGxUb3AodGhpcy5wcmV2U2Nyb2xsVG9wKTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRJdGVtID0gdGhpcy5pdGVtc1t0aGlzLmluZGV4XTtcclxuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuem9vbUZyb21PcmlnaW4gJiYgY3VycmVudEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYSA9IHRoaXMubWVkaWFDb250YWluZXJQb3NpdGlvbiwgdG9wXzQgPSBfYS50b3AsIGJvdHRvbSA9IF9hLmJvdHRvbTtcclxuICAgICAgICAgICAgICAgIHZhciBfYiA9IHRoaXMuZ2FsbGVyeUl0ZW1zW3RoaXMuaW5kZXhdLCBfX3NsaWRlVmlkZW9JbmZvID0gX2IuX19zbGlkZVZpZGVvSW5mbywgcG9zdGVyID0gX2IucG9zdGVyO1xyXG4gICAgICAgICAgICAgICAgdmFyIGltYWdlU2l6ZSA9IHV0aWxzLmdldFNpemUoY3VycmVudEl0ZW0sIHRoaXMub3V0ZXIsIHRvcF80ICsgYm90dG9tLCBfX3NsaWRlVmlkZW9JbmZvICYmIHBvc3RlciAmJiB0aGlzLnNldHRpbmdzLnZpZGVvTWF4U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSB1dGlscy5nZXRUcmFuc2Zvcm0oY3VycmVudEl0ZW0sIHRoaXMub3V0ZXIsIHRvcF80LCBib3R0b20sIGltYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuem9vbUZyb21PcmlnaW4gJiYgdHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKCdsZy1jbG9zaW5nIGxnLXpvb20tZnJvbS1pbWFnZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTbGlkZUl0ZW0odGhpcy5pbmRleClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xnLXN0YXJ0LWVuZC1wcm9ncmVzcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMuc2V0dGluZ3Muc3RhcnRBbmltYXRpb25EdXJhdGlvbiArICdtcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygndHJhbnNmb3JtJywgdHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLWhpZGUtaXRlbXMnKTtcclxuICAgICAgICAgICAgICAgIC8vIGxnLXpvb20tZnJvbS1pbWFnZSBpcyB1c2VkIGZvciBzZXR0aW5nIHRoZSBvcGFjaXR5IHRvIDEgaWYgem9vbUZyb21PcmlnaW4gaXMgdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGNsb3NpbmcgaXRlbSBkb2Vzbid0IGhhdmUgdGhlIGxnLXNpemUgYXR0cmlidXRlLCByZW1vdmUgdGhpcyBjbGFzcyB0byBhdm9pZCB0aGUgY2xvc2luZyBjc3MgY29uZmxpY3RzXHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy16b29tLWZyb20taW1hZ2UnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBVbmJpbmQgYWxsIGV2ZW50cyBhZGRlZCBieSBsaWdodEdhbGxlcnlcclxuICAgICAgICAgICAgLy8gQHRvZG9cclxuICAgICAgICAgICAgLy90aGlzLiRlbC5vZmYoJy5sZy50bScpO1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lNb2R1bGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubEdhbGxlcnlPbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzRHVtbXlJbWFnZVJlbW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy56b29tRnJvbU9yaWdpbiA9IHRoaXMuc2V0dGluZ3Muem9vbUZyb21PcmlnaW47XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVCYXJUaW1lb3V0KTtcclxuICAgICAgICAgICAgdGhpcy5oaWRlQmFyVGltZW91dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkTEcoJ2h0bWwnKS5yZW1vdmVDbGFzcygnbGctb24nKTtcclxuICAgICAgICAgICAgdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctdmlzaWJsZSBsZy1jb21wb25lbnRzLW9wZW4nKTtcclxuICAgICAgICAgICAgLy8gUmVzZXR0aW5nIG9wYWNpdHkgdG8gMCBpc2QgcmVxdWlyZWQgYXMgIHZlcnRpY2FsIHN3aXBlIHRvIGNsb3NlIGZ1bmN0aW9uIGFkZHMgaW5saW5lIG9wYWNpdHkuXHJcbiAgICAgICAgICAgIHRoaXMuJGJhY2tkcm9wLnJlbW92ZUNsYXNzKCdpbicpLmNzcygnb3BhY2l0eScsIDApO1xyXG4gICAgICAgICAgICB2YXIgcmVtb3ZlVGltZW91dCA9IHRoaXMuem9vbUZyb21PcmlnaW4gJiYgdHJhbnNmb3JtXHJcbiAgICAgICAgICAgICAgICA/IE1hdGgubWF4KHRoaXMuc2V0dGluZ3Muc3RhcnRBbmltYXRpb25EdXJhdGlvbiwgdGhpcy5zZXR0aW5ncy5iYWNrZHJvcER1cmF0aW9uKVxyXG4gICAgICAgICAgICAgICAgOiB0aGlzLnNldHRpbmdzLmJhY2tkcm9wRHVyYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5yZW1vdmVDbGFzcygnbGctc2hvdy1pbicpO1xyXG4gICAgICAgICAgICAvLyBPbmNlIHRoZSBjbG9zaWduIGFuaW1hdGlvbiBpcyBjb21wbGV0ZWQgYW5kIGdhbGxlcnkgaXMgaW52aXNpYmxlXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnpvb21Gcm9tT3JpZ2luICYmIHRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy16b29tLWZyb20taW1hZ2UnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2xnLXNob3cnKTtcclxuICAgICAgICAgICAgICAgIC8vIE5lZWQgdG8gcmVtb3ZlIGlubGluZSBvcGFjaXR5IGFzIGl0IGlzIHVzZWQgaW4gdGhlIHN0eWxlc2hlZXQgYXMgd2VsbFxyXG4gICAgICAgICAgICAgICAgX3RoaXMuJGJhY2tkcm9wXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgX3RoaXMuc2V0dGluZ3MuYmFja2Ryb3BEdXJhdGlvbiArICdtcycpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoXCJsZy1jbG9zaW5nIFwiICsgX3RoaXMuc2V0dGluZ3Muc3RhcnRDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXRTbGlkZUl0ZW0oX3RoaXMuaW5kZXgpLnJlbW92ZUNsYXNzKCdsZy1zdGFydC1lbmQtcHJvZ3Jlc3MnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLiRpbm5lci5lbXB0eSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmxnT3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmFmdGVyQ2xvc2UsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6IF90aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLm91dGVyLmdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuZ2V0KCkuYmx1cigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3RoaXMubGdPcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgcmVtb3ZlVGltZW91dCArIDEwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZW1vdmVUaW1lb3V0ICsgMTAwO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5pbml0TW9kdWxlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBtb2R1bGUuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImxpZ2h0R2FsbGVyeTotIG1ha2Ugc3VyZSBsaWdodEdhbGxlcnkgbW9kdWxlIGlzIHByb3Blcmx5IGluaXRpYXRlZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmRlc3Ryb3lNb2R1bGVzID0gZnVuY3Rpb24gKGRlc3Ryb3kpIHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzdHJveSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlLmNsb3NlR2FsbGVyeSAmJiBtb2R1bGUuY2xvc2VHYWxsZXJ5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImxpZ2h0R2FsbGVyeTotIG1ha2Ugc3VyZSBsaWdodEdhbGxlcnkgbW9kdWxlIGlzIHByb3Blcmx5IGRlc3Ryb3llZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWZyZXNoIGxpZ2h0R2FsbGVyeSB3aXRoIG5ldyBzZXQgb2YgY2hpbGRyZW4uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gVGhpcyBpcyB1c2VmdWwgdG8gdXBkYXRlIHRoZSBnYWxsZXJ5IHdoZW4gdGhlIGNoaWxkIGVsZW1lbnRzIGFyZSBjaGFuZ2VkIHdpdGhvdXQgY2FsbGluZyBkZXN0cm95IG1ldGhvZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIElmIHlvdSBhcmUgdXNpbmcgZHluYW1pYyBtb2RlLCB5b3UgY2FuIHBhc3MgdGhlIG1vZGlmaWVkIGFycmF5IG9mIGR5bmFtaWNFbCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIHJlZnJlc2ggdGhlIGR5bmFtaWMgZ2FsbGVyeVxyXG4gICAgICAgICAqIEBzZWUgPGEgaHJlZj1cIi9kZW1vcy9keW5hbWljLW1vZGUvXCI+RGVtbzwvYT5cclxuICAgICAgICAgKiBAY2F0ZWdvcnkgbEdQdWJsaWNNZXRob2RzXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiAgY29uc3QgcGx1Z2luID0gbGlnaHRHYWxsZXJ5KCk7XHJcbiAgICAgICAgICogIC8vIERlbGV0ZSBvciBhZGQgY2hpbGRyZW4sIHRoZW4gY2FsbFxyXG4gICAgICAgICAqICBwbHVnaW4ucmVmcmVzaCgpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKGdhbGxlcnlJdGVtcykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZHluYW1pYykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnZhbGlkYXRlSXRlbXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZ2FsbGVyeUl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbGxlcnlJdGVtcyA9IGdhbGxlcnlJdGVtcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FsbGVyeUl0ZW1zID0gdGhpcy5nZXRJdGVtcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29udHJvbHMoKTtcclxuICAgICAgICAgICAgdGhpcy5vcGVuR2FsbGVyeU9uSXRlbUNsaWNrKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLnVwZGF0ZVNsaWRlcyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnVwZGF0ZUNvbnRyb2xzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFNsaWRlVmlkZW9JbmZvKHRoaXMuZ2FsbGVyeUl0ZW1zKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDb3VudGVyVG90YWwoKTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VTaW5nbGVTbGlkZUNsYXNzTmFtZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVzdHJveSBsaWdodEdhbGxlcnkuXHJcbiAgICAgICAgICogRGVzdHJveSBsaWdodEdhbGxlcnkgYW5kIGl0cyBwbHVnaW4gaW5zdGFuY2VzIGNvbXBsZXRlbHlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBhbHNvIGNhbGxzIENsb3NlR2FsbGVyeSBmdW5jdGlvbiBpbnRlcm5hbGx5LiBSZXR1cm5zIHRoZSB0aW1lIHRha2VzIHRvIGNvbXBsZXRlbHkgY2xvc2UgYW5kIGRlc3Ryb3kgdGhlIGluc3RhbmNlLlxyXG4gICAgICAgICAqIEluIGNhc2UgaWYgeW91IHdhbnQgdG8gcmUtaW5pdGlhbGl6ZSBsaWdodEdhbGxlcnkgcmlnaHQgYWZ0ZXIgZGVzdHJveWluZyBpdCwgaW5pdGlhbGl6ZSBpdCBvbmx5IG9uY2UgdGhlIGRlc3Ryb3kgcHJvY2VzcyBpcyBjb21wbGV0ZWQuXHJcbiAgICAgICAgICogWW91IGNhbiB1c2UgcmVmcmVzaCBtZXRob2QgbW9zdCBvZiB0aGUgdGltZXMuXHJcbiAgICAgICAgICogQGNhdGVnb3J5IGxHUHVibGljTWV0aG9kc1xyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogIGNvbnN0IHBsdWdpbiA9IGxpZ2h0R2FsbGVyeSgpO1xyXG4gICAgICAgICAqICBwbHVnaW4uZGVzdHJveSgpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VUaW1lb3V0ID0gdGhpcy5jbG9zZUdhbGxlcnkodHJ1ZSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZGVzdHJveU1vZHVsZXModHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLnNldHRpbmdzLmR5bmFtaWMpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbnZhbGlkYXRlSXRlbXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICRMRyh3aW5kb3cpLm9mZihcIi5sZy5nbG9iYWxcIiArIF90aGlzLmxnSWQpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuTEdlbC5vZmYoJy5sZycpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuJGNvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSwgY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsb3NlVGltZW91dDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBMaWdodEdhbGxlcnk7XHJcbiAgICB9KCkpO1xuXG4gICAgZnVuY3Rpb24gbGlnaHRHYWxsZXJ5KGVsLCBvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMaWdodEdhbGxlcnkoZWwsIG9wdGlvbnMpO1xyXG4gICAgfVxuXG4gICAgcmV0dXJuIGxpZ2h0R2FsbGVyeTtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpZ2h0Z2FsbGVyeS51bWQuanMubWFwXG4iLCIvKiFcbiAqIGxpZ2h0Z2FsbGVyeSB8IDIuNC4wLWJldGEuMCB8IERlY2VtYmVyIDEydGggMjAyMVxuICogaHR0cDovL3d3dy5saWdodGdhbGxlcnlqcy5jb20vXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgU2FjaGluIE5lcmF2YXRoO1xuICogQGxpY2Vuc2UgR1BMdjNcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5sZ1RodW1ibmFpbCA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIC8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG4gICAgUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbiAgICBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG4gICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG4gICAgUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbiAgICBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbiAgICBJTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuICAgIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbiAgICBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcbiAgICBQRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgICB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xuXG4gICAgdmFyIHRodW1ibmFpbHNTZXR0aW5ncyA9IHtcclxuICAgICAgICB0aHVtYm5haWw6IHRydWUsXHJcbiAgICAgICAgYW5pbWF0ZVRodW1iOiB0cnVlLFxyXG4gICAgICAgIGN1cnJlbnRQYWdlclBvc2l0aW9uOiAnbWlkZGxlJyxcclxuICAgICAgICBhbGlnblRodW1ibmFpbHM6ICdtaWRkbGUnLFxyXG4gICAgICAgIHRodW1iV2lkdGg6IDEwMCxcclxuICAgICAgICB0aHVtYkhlaWdodDogJzgwcHgnLFxyXG4gICAgICAgIHRodW1iTWFyZ2luOiA1LFxyXG4gICAgICAgIGFwcGVuZFRodW1ibmFpbHNUbzogJy5sZy1jb21wb25lbnRzJyxcclxuICAgICAgICB0b2dnbGVUaHVtYjogZmFsc2UsXHJcbiAgICAgICAgZW5hYmxlVGh1bWJEcmFnOiB0cnVlLFxyXG4gICAgICAgIGVuYWJsZVRodW1iU3dpcGU6IHRydWUsXHJcbiAgICAgICAgdGh1bWJuYWlsU3dpcGVUaHJlc2hvbGQ6IDEwLFxyXG4gICAgICAgIGxvYWRZb3VUdWJlVGh1bWJuYWlsOiB0cnVlLFxyXG4gICAgICAgIHlvdVR1YmVUaHVtYlNpemU6IDEsXHJcbiAgICAgICAgdGh1bWJuYWlsUGx1Z2luU3RyaW5nczogeyB0b2dnbGVUaHVtYm5haWxzOiAnVG9nZ2xlIHRodW1ibmFpbHMnIH0sXHJcbiAgICB9O1xuXG4gICAgLyoqXHJcbiAgICAgKiBMaXN0IG9mIGxpZ2h0R2FsbGVyeSBldmVudHNcclxuICAgICAqIEFsbCBldmVudHMgc2hvdWxkIGJlIGRvY3VtZW50ZWQgaGVyZVxyXG4gICAgICogQmVsb3cgaW50ZXJmYWNlcyBhcmUgdXNlZCB0byBidWlsZCB0aGUgd2Vic2l0ZSBkb2N1bWVudGF0aW9uc1xyXG4gICAgICogKi9cclxuICAgIHZhciBsR0V2ZW50cyA9IHtcclxuICAgICAgICBhZnRlckFwcGVuZFNsaWRlOiAnbGdBZnRlckFwcGVuZFNsaWRlJyxcclxuICAgICAgICBpbml0OiAnbGdJbml0JyxcclxuICAgICAgICBoYXNWaWRlbzogJ2xnSGFzVmlkZW8nLFxyXG4gICAgICAgIGNvbnRhaW5lclJlc2l6ZTogJ2xnQ29udGFpbmVyUmVzaXplJyxcclxuICAgICAgICB1cGRhdGVTbGlkZXM6ICdsZ1VwZGF0ZVNsaWRlcycsXHJcbiAgICAgICAgYWZ0ZXJBcHBlbmRTdWJIdG1sOiAnbGdBZnRlckFwcGVuZFN1Ykh0bWwnLFxyXG4gICAgICAgIGJlZm9yZU9wZW46ICdsZ0JlZm9yZU9wZW4nLFxyXG4gICAgICAgIGFmdGVyT3BlbjogJ2xnQWZ0ZXJPcGVuJyxcclxuICAgICAgICBzbGlkZUl0ZW1Mb2FkOiAnbGdTbGlkZUl0ZW1Mb2FkJyxcclxuICAgICAgICBiZWZvcmVTbGlkZTogJ2xnQmVmb3JlU2xpZGUnLFxyXG4gICAgICAgIGFmdGVyU2xpZGU6ICdsZ0FmdGVyU2xpZGUnLFxyXG4gICAgICAgIHBvc3RlckNsaWNrOiAnbGdQb3N0ZXJDbGljaycsXHJcbiAgICAgICAgZHJhZ1N0YXJ0OiAnbGdEcmFnU3RhcnQnLFxyXG4gICAgICAgIGRyYWdNb3ZlOiAnbGdEcmFnTW92ZScsXHJcbiAgICAgICAgZHJhZ0VuZDogJ2xnRHJhZ0VuZCcsXHJcbiAgICAgICAgYmVmb3JlTmV4dFNsaWRlOiAnbGdCZWZvcmVOZXh0U2xpZGUnLFxyXG4gICAgICAgIGJlZm9yZVByZXZTbGlkZTogJ2xnQmVmb3JlUHJldlNsaWRlJyxcclxuICAgICAgICBiZWZvcmVDbG9zZTogJ2xnQmVmb3JlQ2xvc2UnLFxyXG4gICAgICAgIGFmdGVyQ2xvc2U6ICdsZ0FmdGVyQ2xvc2UnLFxyXG4gICAgICAgIHJvdGF0ZUxlZnQ6ICdsZ1JvdGF0ZUxlZnQnLFxyXG4gICAgICAgIHJvdGF0ZVJpZ2h0OiAnbGdSb3RhdGVSaWdodCcsXHJcbiAgICAgICAgZmxpcEhvcml6b250YWw6ICdsZ0ZsaXBIb3Jpem9udGFsJyxcclxuICAgICAgICBmbGlwVmVydGljYWw6ICdsZ0ZsaXBWZXJ0aWNhbCcsXHJcbiAgICAgICAgYXV0b3BsYXk6ICdsZ0F1dG9wbGF5JyxcclxuICAgICAgICBhdXRvcGxheVN0YXJ0OiAnbGdBdXRvcGxheVN0YXJ0JyxcclxuICAgICAgICBhdXRvcGxheVN0b3A6ICdsZ0F1dG9wbGF5U3RvcCcsXHJcbiAgICB9O1xuXG4gICAgdmFyIFRodW1ibmFpbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBUaHVtYm5haWwoaW5zdGFuY2UsICRMRykge1xyXG4gICAgICAgICAgICB0aGlzLnRodW1iT3V0ZXJXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMudGh1bWJUb3RhbFdpZHRoID0gMDtcclxuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVYID0gMDtcclxuICAgICAgICAgICAgdGhpcy50aHVtYkNsaWNrYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBnZXQgbGlnaHRHYWxsZXJ5IGNvcmUgcGx1Z2luIGluc3RhbmNlXHJcbiAgICAgICAgICAgIHRoaXMuY29yZSA9IGluc3RhbmNlO1xyXG4gICAgICAgICAgICB0aGlzLiRMRyA9ICRMRztcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gZXh0ZW5kIG1vZHVsZSBkZWZhdWx0IHNldHRpbmdzIHdpdGggbGlnaHRHYWxsZXJ5IGNvcmUgc2V0dGluZ3NcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aHVtYm5haWxzU2V0dGluZ3MpLCB0aGlzLmNvcmUuc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB0aGlzLnRodW1iT3V0ZXJXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMudGh1bWJUb3RhbFdpZHRoID1cclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5nYWxsZXJ5SXRlbXMubGVuZ3RoICpcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5zZXR0aW5ncy50aHVtYldpZHRoICsgdGhpcy5zZXR0aW5ncy50aHVtYk1hcmdpbik7XHJcbiAgICAgICAgICAgIC8vIFRodW1ibmFpbCBhbmltYXRpb24gdmFsdWVcclxuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVYID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRlVGh1bWJTdHlsZXMoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvcmUuc2V0dGluZ3MuYWxsb3dNZWRpYU92ZXJsYXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudG9nZ2xlVGh1bWIgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy50aHVtYm5haWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGQoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVUaHVtYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmVuYWJsZVRodW1iRHJhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZVRodW1iRHJhZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5lbmFibGVUaHVtYlN3aXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlVGh1bWJTd2lwZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRodW1iQ2xpY2thYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRodW1iQ2xpY2thYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlVGh1bWJCYXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGh1bWJLZXlQcmVzcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLmJ1aWxkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iTWFya3VwKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlQWN0aXZlQ2xhc3NPblNsaWRlQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGxnVGh1bWIuZmlyc3QoKS5vbignY2xpY2subGcgdG91Y2hlbmQubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICR0YXJnZXQgPSBfdGhpcy4kTEcoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkdGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1sZy1pdGVtLWlkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJbiBJRTkgYW5kIGJlbGxvdyB0b3VjaCBkb2VzIG5vdCBzdXBwb3J0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR28gdG8gc2xpZGUgaWYgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGNzcyB0cmFuc2l0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy50aHVtYkNsaWNrYWJsZSAmJiAhX3RoaXMuY29yZS5sZ0J1c3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoJHRhcmdldC5hdHRyKCdkYXRhLWxnLWl0ZW0taWQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUuc2xpZGUoaW5kZXgsIGZhbHNlLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuYmVmb3JlU2xpZGUgKyBcIi50aHVtYlwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGV2ZW50LmRldGFpbC5pbmRleDtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFuaW1hdGVUaHVtYihpbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5iZWZvcmVPcGVuICsgXCIudGh1bWJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMudGh1bWJPdXRlcldpZHRoID0gX3RoaXMuY29yZS5vdXRlci5nZXQoKS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLnVwZGF0ZVNsaWRlcyArIFwiLnRodW1iXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlYnVpbGRUaHVtYm5haWxzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5jb250YWluZXJSZXNpemUgKyBcIi50aHVtYlwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmNvcmUubGdPcGVuZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudGh1bWJPdXRlcldpZHRoID0gX3RoaXMuY29yZS5vdXRlci5nZXQoKS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hbmltYXRlVGh1bWIoX3RoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudGh1bWJPdXRlcldpZHRoID0gX3RoaXMuY29yZS5vdXRlci5nZXQoKS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLnNldFRodW1iTWFya3VwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdGh1bWJPdXRlckNsYXNzTmFtZXMgPSAnbGctdGh1bWItb3V0ZXIgJztcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYWxpZ25UaHVtYm5haWxzKSB7XHJcbiAgICAgICAgICAgICAgICB0aHVtYk91dGVyQ2xhc3NOYW1lcyArPSBcImxnLXRodW1iLWFsaWduLVwiICsgdGhpcy5zZXR0aW5ncy5hbGlnblRodW1ibmFpbHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGh0bWwgPSBcIjxkaXYgY2xhc3M9XFxcIlwiICsgdGh1bWJPdXRlckNsYXNzTmFtZXMgKyBcIlxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZy10aHVtYiBsZy1ncm91cFxcXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlwiO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIuYWRkQ2xhc3MoJ2xnLWhhcy10aHVtYicpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hcHBlbmRUaHVtYm5haWxzVG8gPT09ICcubGctY29tcG9uZW50cycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS4kbGdDb21wb25lbnRzLmFwcGVuZChodG1sKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5hcHBlbmQoaHRtbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kdGh1bWJPdXRlciA9IHRoaXMuY29yZS5vdXRlci5maW5kKCcubGctdGh1bWItb3V0ZXInKS5maXJzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLiRsZ1RodW1iID0gdGhpcy5jb3JlLm91dGVyLmZpbmQoJy5sZy10aHVtYicpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVUaHVtYikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy10aHVtYicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMuY29yZS5zZXR0aW5ncy5zcGVlZCArICdtcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnd2lkdGgnLCB0aGlzLnRodW1iVG90YWxXaWR0aCArICdweCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iSXRlbUh0bWwodGhpcy5jb3JlLmdhbGxlcnlJdGVtcyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLmVuYWJsZVRodW1iRHJhZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHRodW1iRHJhZ1V0aWxzID0ge1xyXG4gICAgICAgICAgICAgICAgY29yZHM6IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFg6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kWDogMCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpc01vdmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG5ld1RyYW5zbGF0ZVg6IDAsXHJcbiAgICAgICAgICAgICAgICBzdGFydFRpbWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICBlbmRUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgdG91Y2hNb3ZlVGltZTogMCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy4kdGh1bWJPdXRlci5hZGRDbGFzcygnbGctZ3JhYicpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctdGh1bWInKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2Vkb3duLmxnLnRodW1iJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy50aHVtYlRvdGFsV2lkdGggPiBfdGhpcy50aHVtYk91dGVyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBleGVjdXRlIG9ubHkgb24gLmxnLW9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5jb3Jkcy5zdGFydFggPSBlLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudGh1bWJDbGlja2FibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpc0RyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAqKiBGaXggZm9yIHdlYmtpdCBjdXJzb3IgaXNzdWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTI2NzIzXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5nZXQoKS5zY3JvbGxMZWZ0ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5nZXQoKS5zY3JvbGxMZWZ0IC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKlxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiR0aHVtYk91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbGctZ3JhYicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbGctZ3JhYmJpbmcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuJExHKHdpbmRvdykub24oXCJtb3VzZW1vdmUubGcudGh1bWIuZ2xvYmFsXCIgKyB0aGlzLmNvcmUubGdJZCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuY29yZS5sZ09wZW5lZClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLmNvcmRzLmVuZFggPSBlLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzID0gX3RoaXMub25UaHVtYlRvdWNoTW92ZSh0aHVtYkRyYWdVdGlscyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRMRyh3aW5kb3cpLm9uKFwibW91c2V1cC5sZy50aHVtYi5nbG9iYWxcIiArIHRoaXMuY29yZS5sZ0lkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmNvcmUubGdPcGVuZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRodW1iRHJhZ1V0aWxzLmlzTW92ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscyA9IF90aGlzLm9uVGh1bWJUb3VjaEVuZCh0aHVtYkRyYWdVdGlscyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50aHVtYkNsaWNrYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kdGh1bWJPdXRlci5yZW1vdmVDbGFzcygnbGctZ3JhYmJpbmcnKS5hZGRDbGFzcygnbGctZ3JhYicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuZW5hYmxlVGh1bWJTd2lwZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHRodW1iRHJhZ1V0aWxzID0ge1xyXG4gICAgICAgICAgICAgICAgY29yZHM6IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFg6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kWDogMCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpc01vdmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG5ld1RyYW5zbGF0ZVg6IDAsXHJcbiAgICAgICAgICAgICAgICBzdGFydFRpbWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICBlbmRUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgdG91Y2hNb3ZlVGltZTogMCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy4kbGdUaHVtYi5vbigndG91Y2hzdGFydC5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMudGh1bWJUb3RhbFdpZHRoID4gX3RoaXMudGh1bWJPdXRlcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLmNvcmRzLnN0YXJ0WCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50aHVtYkNsaWNrYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRsZ1RodW1iLm9uKCd0b3VjaG1vdmUubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnRodW1iVG90YWxXaWR0aCA+IF90aGlzLnRodW1iT3V0ZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5jb3Jkcy5lbmRYID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzID0gX3RoaXMub25UaHVtYlRvdWNoTW92ZSh0aHVtYkRyYWdVdGlscyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRsZ1RodW1iLm9uKCd0b3VjaGVuZC5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aHVtYkRyYWdVdGlscy5pc01vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMgPSBfdGhpcy5vblRodW1iVG91Y2hFbmQodGh1bWJEcmFnVXRpbHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudGh1bWJDbGlja2FibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFJlYnVpbGQgdGh1bWJuYWlsc1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUucmVidWlsZFRodW1ibmFpbHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0cmFuc2l0aW9uc1xyXG4gICAgICAgICAgICB0aGlzLiR0aHVtYk91dGVyLmFkZENsYXNzKCdsZy1yZWJ1aWxkaW5nLXRodW1ibmFpbHMnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy50aHVtYlRvdGFsV2lkdGggPVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChfdGhpcy5zZXR0aW5ncy50aHVtYldpZHRoICsgX3RoaXMuc2V0dGluZ3MudGh1bWJNYXJnaW4pO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuJGxnVGh1bWIuY3NzKCd3aWR0aCcsIF90aGlzLnRodW1iVG90YWxXaWR0aCArICdweCcpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuJGxnVGh1bWIuZW1wdHkoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldFRodW1iSXRlbUh0bWwoX3RoaXMuY29yZS5nYWxsZXJ5SXRlbXMpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYW5pbWF0ZVRodW1iKF90aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuJHRodW1iT3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXJlYnVpbGRpbmctdGh1bWJuYWlscycpO1xyXG4gICAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQHRzLWNoZWNrXHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5zZXRUcmFuc2xhdGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy4kbGdUaHVtYi5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgtJyArIHZhbHVlICsgJ3B4LCAwcHgsIDBweCknKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuZ2V0UG9zc2libGVUcmFuc2Zvcm1YID0gZnVuY3Rpb24gKGxlZnQpIHtcclxuICAgICAgICAgICAgaWYgKGxlZnQgPiB0aGlzLnRodW1iVG90YWxXaWR0aCAtIHRoaXMudGh1bWJPdXRlcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0ID0gdGhpcy50aHVtYlRvdGFsV2lkdGggLSB0aGlzLnRodW1iT3V0ZXJXaWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGVmdCA8IDApIHtcclxuICAgICAgICAgICAgICAgIGxlZnQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsZWZ0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5hbmltYXRlVGh1bWIgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy4kbGdUaHVtYi5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCB0aGlzLmNvcmUuc2V0dGluZ3Muc3BlZWQgKyAnbXMnKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZVRodW1iKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnNldHRpbmdzLmN1cnJlbnRQYWdlclBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWlkZGxlJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aHVtYk91dGVyV2lkdGggLyAyIC0gdGhpcy5zZXR0aW5ncy50aHVtYldpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMudGh1bWJPdXRlcldpZHRoIC0gdGhpcy5zZXR0aW5ncy50aHVtYldpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVYID1cclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5zZXR0aW5ncy50aHVtYldpZHRoICsgdGhpcy5zZXR0aW5ncy50aHVtYk1hcmdpbikgKiBpbmRleCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zbGF0ZVggPiB0aGlzLnRodW1iVG90YWxXaWR0aCAtIHRoaXMudGh1bWJPdXRlcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVYID0gdGhpcy50aHVtYlRvdGFsV2lkdGggLSB0aGlzLnRodW1iT3V0ZXJXaWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zbGF0ZVggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVYID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNsYXRlKHRoaXMudHJhbnNsYXRlWCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUub25UaHVtYlRvdWNoTW92ZSA9IGZ1bmN0aW9uICh0aHVtYkRyYWdVdGlscykge1xyXG4gICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5uZXdUcmFuc2xhdGVYID0gdGhpcy50cmFuc2xhdGVYO1xyXG4gICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5pc01vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMudG91Y2hNb3ZlVGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xyXG4gICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5uZXdUcmFuc2xhdGVYIC09XHJcbiAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5jb3Jkcy5lbmRYIC0gdGh1bWJEcmFnVXRpbHMuY29yZHMuc3RhcnRYO1xyXG4gICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5uZXdUcmFuc2xhdGVYID0gdGhpcy5nZXRQb3NzaWJsZVRyYW5zZm9ybVgodGh1bWJEcmFnVXRpbHMubmV3VHJhbnNsYXRlWCk7XHJcbiAgICAgICAgICAgIC8vIG1vdmUgY3VycmVudCBzbGlkZVxyXG4gICAgICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZSh0aHVtYkRyYWdVdGlscy5uZXdUcmFuc2xhdGVYKTtcclxuICAgICAgICAgICAgdGhpcy4kdGh1bWJPdXRlci5hZGRDbGFzcygnbGctZHJhZ2dpbmcnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRodW1iRHJhZ1V0aWxzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5vblRodW1iVG91Y2hFbmQgPSBmdW5jdGlvbiAodGh1bWJEcmFnVXRpbHMpIHtcclxuICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMuaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5lbmRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy4kdGh1bWJPdXRlci5yZW1vdmVDbGFzcygnbGctZHJhZ2dpbmcnKTtcclxuICAgICAgICAgICAgdmFyIHRvdWNoRHVyYXRpb24gPSB0aHVtYkRyYWdVdGlscy5lbmRUaW1lLnZhbHVlT2YoKSAtXHJcbiAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5zdGFydFRpbWUudmFsdWVPZigpO1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2VYbmV3ID0gdGh1bWJEcmFnVXRpbHMuY29yZHMuZW5kWCAtIHRodW1iRHJhZ1V0aWxzLmNvcmRzLnN0YXJ0WDtcclxuICAgICAgICAgICAgdmFyIHNwZWVkWCA9IE1hdGguYWJzKGRpc3RhbmNlWG5ldykgLyB0b3VjaER1cmF0aW9uO1xyXG4gICAgICAgICAgICAvLyBTb21lIG1hZ2ljYWwgbnVtYmVyc1xyXG4gICAgICAgICAgICAvLyBDYW4gYmUgaW1wcm92ZWRcclxuICAgICAgICAgICAgaWYgKHNwZWVkWCA+IDAuMTUgJiZcclxuICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLmVuZFRpbWUudmFsdWVPZigpIC0gdGh1bWJEcmFnVXRpbHMudG91Y2hNb3ZlVGltZSA8IDMwKSB7XHJcbiAgICAgICAgICAgICAgICBzcGVlZFggKz0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChzcGVlZFggPiAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWRYICs9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzcGVlZFggPVxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkWCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkWCAqIChNYXRoLmFicyhkaXN0YW5jZVhuZXcpIC8gdGhpcy50aHVtYk91dGVyV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kbGdUaHVtYi5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCBNYXRoLm1pbihzcGVlZFggLSAxLCAyKSArICdzZXR0aW5ncycpO1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2VYbmV3ID0gZGlzdGFuY2VYbmV3ICogc3BlZWRYO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVYID0gdGhpcy5nZXRQb3NzaWJsZVRyYW5zZm9ybVgodGhpcy50cmFuc2xhdGVYIC0gZGlzdGFuY2VYbmV3KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNsYXRlKHRoaXMudHJhbnNsYXRlWCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVggPSB0aHVtYkRyYWdVdGlscy5uZXdUcmFuc2xhdGVYO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aHVtYkRyYWdVdGlscy5jb3Jkcy5lbmRYIC0gdGh1bWJEcmFnVXRpbHMuY29yZHMuc3RhcnRYKSA8XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnRodW1ibmFpbFN3aXBlVGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRodW1iQ2xpY2thYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGh1bWJEcmFnVXRpbHM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLmdldFRodW1iSHRtbCA9IGZ1bmN0aW9uICh0aHVtYiwgaW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyIHNsaWRlVmlkZW9JbmZvID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1tpbmRleF0uX19zbGlkZVZpZGVvSW5mbyB8fCB7fTtcclxuICAgICAgICAgICAgdmFyIHRodW1iSW1nO1xyXG4gICAgICAgICAgICBpZiAoc2xpZGVWaWRlb0luZm8ueW91dHViZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubG9hZFlvdVR1YmVUaHVtYm5haWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkltZyA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcvL2ltZy55b3V0dWJlLmNvbS92aS8nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlVmlkZW9JbmZvLnlvdXR1YmVbMV0gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MueW91VHViZVRodW1iU2l6ZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLmpwZyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkltZyA9IHRodW1iO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGh1bWJJbWcgPSB0aHVtYjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gXCI8ZGl2IGRhdGEtbGctaXRlbS1pZD1cXFwiXCIgKyBpbmRleCArIFwiXFxcIiBjbGFzcz1cXFwibGctdGh1bWItaXRlbSBcIiArIChpbmRleCA9PT0gdGhpcy5jb3JlLmluZGV4ID8gJyBhY3RpdmUnIDogJycpICsgXCJcXFwiIFxcbiAgICAgICAgc3R5bGU9XFxcIndpZHRoOlwiICsgdGhpcy5zZXR0aW5ncy50aHVtYldpZHRoICsgXCJweDsgaGVpZ2h0OiBcIiArIHRoaXMuc2V0dGluZ3MudGh1bWJIZWlnaHQgKyBcIjtcXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IFwiICsgdGhpcy5zZXR0aW5ncy50aHVtYk1hcmdpbiArIFwicHg7XFxcIj5cXG4gICAgICAgICAgICA8aW1nIGRhdGEtbGctaXRlbS1pZD1cXFwiXCIgKyBpbmRleCArIFwiXFxcIiBzcmM9XFxcIlwiICsgdGh1bWJJbWcgKyBcIlxcXCIgLz5cXG4gICAgICAgIDwvZGl2PlwiO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5nZXRUaHVtYkl0ZW1IdG1sID0gZnVuY3Rpb24gKGl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHZhciB0aHVtYkxpc3QgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGh1bWJMaXN0ICs9IHRoaXMuZ2V0VGh1bWJIdG1sKGl0ZW1zW2ldLnRodW1iLCBpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGh1bWJMaXN0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5zZXRUaHVtYkl0ZW1IdG1sID0gZnVuY3Rpb24gKGl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHZhciB0aHVtYkxpc3QgPSB0aGlzLmdldFRodW1iSXRlbUh0bWwoaXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLiRsZ1RodW1iLmh0bWwodGh1bWJMaXN0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuc2V0QW5pbWF0ZVRodW1iU3R5bGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbmltYXRlVGh1bWIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5hZGRDbGFzcygnbGctYW5pbWF0ZS10aHVtYicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBNYW5hZ2UgdGh1bWJuYWlsIGFjdGl2ZSBjYWxzc1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUubWFuYWdlQWN0aXZlQ2xhc3NPblNsaWRlQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBtYW5hZ2UgYWN0aXZlIGNsYXNzIGZvciB0aHVtYm5haWxcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuYmVmb3JlU2xpZGUgKyBcIi50aHVtYlwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkdGh1bWIgPSBfdGhpcy5jb3JlLm91dGVyLmZpbmQoJy5sZy10aHVtYi1pdGVtJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBldmVudC5kZXRhaWwuaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAkdGh1bWIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJHRodW1iLmVxKGluZGV4KS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gVG9nZ2xlIHRodW1ibmFpbCBiYXJcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLnRvZ2dsZVRodW1iQmFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy50b2dnbGVUaHVtYikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLmFkZENsYXNzKCdsZy1jYW4tdG9nZ2xlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUuJHRvb2xiYXIuYXBwZW5kKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPVwiJyArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy50aHVtYm5haWxQbHVnaW5TdHJpbmdzWyd0b2dnbGVUaHVtYm5haWxzJ10gK1xyXG4gICAgICAgICAgICAgICAgICAgICdcIiBjbGFzcz1cImxnLXRvZ2dsZS10aHVtYiBsZy1pY29uXCI+PC9idXR0b24+Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLXRvZ2dsZS10aHVtYicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIudG9nZ2xlQ2xhc3MoJ2xnLWNvbXBvbmVudHMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUudGh1bWJLZXlQcmVzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy4kTEcod2luZG93KS5vbihcImtleWRvd24ubGcudGh1bWIuZ2xvYmFsXCIgKyB0aGlzLmNvcmUubGdJZCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuY29yZS5sZ09wZW5lZCB8fCAhX3RoaXMuc2V0dGluZ3MudG9nZ2xlVGh1bWIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5hZGRDbGFzcygnbGctY29tcG9uZW50cy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlLmtleUNvZGUgPT09IDQwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWNvbXBvbmVudHMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudGh1bWJuYWlsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRMRyh3aW5kb3cpLm9mZihcIi5sZy50aHVtYi5nbG9iYWxcIiArIHRoaXMuY29yZS5sZ0lkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9mZignLmxnLnRodW1iJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vZmYoJy50aHVtYicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGh1bWJPdXRlci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5yZW1vdmVDbGFzcygnbGctaGFzLXRodW1iJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBUaHVtYm5haWw7XHJcbiAgICB9KCkpO1xuXG4gICAgcmV0dXJuIFRodW1ibmFpbDtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxnLXRodW1ibmFpbC51bWQuanMubWFwXG4iLCIvKiFcbiAqIGxpZ2h0Z2FsbGVyeSB8IDIuNC4wLWJldGEuMCB8IERlY2VtYmVyIDEydGggMjAyMVxuICogaHR0cDovL3d3dy5saWdodGdhbGxlcnlqcy5jb20vXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgU2FjaGluIE5lcmF2YXRoO1xuICogQGxpY2Vuc2UgR1BMdjNcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5sZ1pvb20gPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICAvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuICAgIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG4gICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuICAgIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuICAgIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG4gICAgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG4gICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbiAgICBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG4gICAgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG4gICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcblxuICAgIHZhciB6b29tU2V0dGluZ3MgPSB7XHJcbiAgICAgICAgc2NhbGU6IDEsXHJcbiAgICAgICAgem9vbTogdHJ1ZSxcclxuICAgICAgICBhY3R1YWxTaXplOiB0cnVlLFxyXG4gICAgICAgIHNob3dab29tSW5PdXRJY29uczogZmFsc2UsXHJcbiAgICAgICAgYWN0dWFsU2l6ZUljb25zOiB7XHJcbiAgICAgICAgICAgIHpvb21JbjogJ2xnLXpvb20taW4nLFxyXG4gICAgICAgICAgICB6b29tT3V0OiAnbGctem9vbS1vdXQnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW5hYmxlWm9vbUFmdGVyOiAzMDAsXHJcbiAgICAgICAgem9vbVBsdWdpblN0cmluZ3M6IHtcclxuICAgICAgICAgICAgem9vbUluOiAnWm9vbSBpbicsXHJcbiAgICAgICAgICAgIHpvb21PdXQ6ICdab29tIG91dCcsXHJcbiAgICAgICAgICAgIHZpZXdBY3R1YWxTaXplOiAnVmlldyBhY3R1YWwgc2l6ZScsXHJcbiAgICAgICAgfSxcclxuICAgIH07XG5cbiAgICAvKipcclxuICAgICAqIExpc3Qgb2YgbGlnaHRHYWxsZXJ5IGV2ZW50c1xyXG4gICAgICogQWxsIGV2ZW50cyBzaG91bGQgYmUgZG9jdW1lbnRlZCBoZXJlXHJcbiAgICAgKiBCZWxvdyBpbnRlcmZhY2VzIGFyZSB1c2VkIHRvIGJ1aWxkIHRoZSB3ZWJzaXRlIGRvY3VtZW50YXRpb25zXHJcbiAgICAgKiAqL1xyXG4gICAgdmFyIGxHRXZlbnRzID0ge1xyXG4gICAgICAgIGFmdGVyQXBwZW5kU2xpZGU6ICdsZ0FmdGVyQXBwZW5kU2xpZGUnLFxyXG4gICAgICAgIGluaXQ6ICdsZ0luaXQnLFxyXG4gICAgICAgIGhhc1ZpZGVvOiAnbGdIYXNWaWRlbycsXHJcbiAgICAgICAgY29udGFpbmVyUmVzaXplOiAnbGdDb250YWluZXJSZXNpemUnLFxyXG4gICAgICAgIHVwZGF0ZVNsaWRlczogJ2xnVXBkYXRlU2xpZGVzJyxcclxuICAgICAgICBhZnRlckFwcGVuZFN1Ykh0bWw6ICdsZ0FmdGVyQXBwZW5kU3ViSHRtbCcsXHJcbiAgICAgICAgYmVmb3JlT3BlbjogJ2xnQmVmb3JlT3BlbicsXHJcbiAgICAgICAgYWZ0ZXJPcGVuOiAnbGdBZnRlck9wZW4nLFxyXG4gICAgICAgIHNsaWRlSXRlbUxvYWQ6ICdsZ1NsaWRlSXRlbUxvYWQnLFxyXG4gICAgICAgIGJlZm9yZVNsaWRlOiAnbGdCZWZvcmVTbGlkZScsXHJcbiAgICAgICAgYWZ0ZXJTbGlkZTogJ2xnQWZ0ZXJTbGlkZScsXHJcbiAgICAgICAgcG9zdGVyQ2xpY2s6ICdsZ1Bvc3RlckNsaWNrJyxcclxuICAgICAgICBkcmFnU3RhcnQ6ICdsZ0RyYWdTdGFydCcsXHJcbiAgICAgICAgZHJhZ01vdmU6ICdsZ0RyYWdNb3ZlJyxcclxuICAgICAgICBkcmFnRW5kOiAnbGdEcmFnRW5kJyxcclxuICAgICAgICBiZWZvcmVOZXh0U2xpZGU6ICdsZ0JlZm9yZU5leHRTbGlkZScsXHJcbiAgICAgICAgYmVmb3JlUHJldlNsaWRlOiAnbGdCZWZvcmVQcmV2U2xpZGUnLFxyXG4gICAgICAgIGJlZm9yZUNsb3NlOiAnbGdCZWZvcmVDbG9zZScsXHJcbiAgICAgICAgYWZ0ZXJDbG9zZTogJ2xnQWZ0ZXJDbG9zZScsXHJcbiAgICAgICAgcm90YXRlTGVmdDogJ2xnUm90YXRlTGVmdCcsXHJcbiAgICAgICAgcm90YXRlUmlnaHQ6ICdsZ1JvdGF0ZVJpZ2h0JyxcclxuICAgICAgICBmbGlwSG9yaXpvbnRhbDogJ2xnRmxpcEhvcml6b250YWwnLFxyXG4gICAgICAgIGZsaXBWZXJ0aWNhbDogJ2xnRmxpcFZlcnRpY2FsJyxcclxuICAgICAgICBhdXRvcGxheTogJ2xnQXV0b3BsYXknLFxyXG4gICAgICAgIGF1dG9wbGF5U3RhcnQ6ICdsZ0F1dG9wbGF5U3RhcnQnLFxyXG4gICAgICAgIGF1dG9wbGF5U3RvcDogJ2xnQXV0b3BsYXlTdG9wJyxcclxuICAgIH07XG5cbiAgICB2YXIgWm9vbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBab29tKGluc3RhbmNlLCAkTEcpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IGxpZ2h0R2FsbGVyeSBjb3JlIHBsdWdpbiBpbnN0YW5jZVxyXG4gICAgICAgICAgICB0aGlzLmNvcmUgPSBpbnN0YW5jZTtcclxuICAgICAgICAgICAgdGhpcy4kTEcgPSAkTEc7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgem9vbVNldHRpbmdzKSwgdGhpcy5jb3JlLnNldHRpbmdzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFwcGVuZCBab29tIGNvbnRyb2xzLiBBY3R1YWwgc2l6ZSwgWm9vbS1pbiwgWm9vbS1vdXRcclxuICAgICAgICBab29tLnByb3RvdHlwZS5idWlsZFRlbXBsYXRlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHpvb21JY29ucyA9IHRoaXMuc2V0dGluZ3Muc2hvd1pvb21Jbk91dEljb25zXHJcbiAgICAgICAgICAgICAgICA/IFwiPGJ1dHRvbiBpZD1cXFwiXCIgKyB0aGlzLmNvcmUuZ2V0SWROYW1lKCdsZy16b29tLWluJykgKyBcIlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Muem9vbVBsdWdpblN0cmluZ3NbJ3pvb21JbiddICsgXCJcXFwiIGNsYXNzPVxcXCJsZy16b29tLWluIGxnLWljb25cXFwiPjwvYnV0dG9uPjxidXR0b24gaWQ9XFxcIlwiICsgdGhpcy5jb3JlLmdldElkTmFtZSgnbGctem9vbS1vdXQnKSArIFwiXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy56b29tUGx1Z2luU3RyaW5nc1snem9vbUluJ10gKyBcIlxcXCIgY2xhc3M9XFxcImxnLXpvb20tb3V0IGxnLWljb25cXFwiPjwvYnV0dG9uPlwiXHJcbiAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hY3R1YWxTaXplKSB7XHJcbiAgICAgICAgICAgICAgICB6b29tSWNvbnMgKz0gXCI8YnV0dG9uIGlkPVxcXCJcIiArIHRoaXMuY29yZS5nZXRJZE5hbWUoJ2xnLWFjdHVhbC1zaXplJykgKyBcIlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Muem9vbVBsdWdpblN0cmluZ3NbJ3ZpZXdBY3R1YWxTaXplJ10gKyBcIlxcXCIgY2xhc3M9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy5hY3R1YWxTaXplSWNvbnMuem9vbUluICsgXCIgbGctaWNvblxcXCI+PC9idXR0b24+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLmFkZENsYXNzKCdsZy11c2UtdHJhbnNpdGlvbi1mb3Item9vbScpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuJHRvb2xiYXIuZmlyc3QoKS5hcHBlbmQoem9vbUljb25zKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIEVuYWJsZSB6b29tIG9wdGlvbiBvbmx5IG9uY2UgdGhlIGltYWdlIGlzIGNvbXBsZXRlbHkgbG9hZGVkXHJcbiAgICAgICAgICogSWYgem9vbUZyb21PcmlnaW4gaXMgdHJ1ZSwgWm9vbSBpcyBlbmFibGVkIG9uY2UgdGhlIGR1bW15IGltYWdlIGhhcyBiZWVuIGluc2VydGVkXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBab29tIHN0eWxlcyBhcmUgZGVmaW5lZCB1bmRlciBsZy16b29tYWJsZSBDU1MgY2xhc3MuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZW5hYmxlWm9vbSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBkZWxheSB3aWxsIGJlIDAgZXhjZXB0IGZpcnN0IHRpbWVcclxuICAgICAgICAgICAgdmFyIF9zcGVlZCA9IHRoaXMuc2V0dGluZ3MuZW5hYmxlWm9vbUFmdGVyICsgZXZlbnQuZGV0YWlsLmRlbGF5O1xyXG4gICAgICAgICAgICAvLyBzZXQgX3NwZWVkIHZhbHVlIDAgaWYgZ2FsbGVyeSBvcGVuZWQgZnJvbSBkaXJlY3QgdXJsIGFuZCBpZiBpdCBpcyBmaXJzdCBzbGlkZVxyXG4gICAgICAgICAgICBpZiAodGhpcy4kTEcoJ2JvZHknKS5maXJzdCgpLmhhc0NsYXNzKCdsZy1mcm9tLWhhc2gnKSAmJlxyXG4gICAgICAgICAgICAgICAgZXZlbnQuZGV0YWlsLmRlbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyB3aWxsIGV4ZWN1dGUgb25seSBvbmNlXHJcbiAgICAgICAgICAgICAgICBfc3BlZWQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGxnLWZyb20taGFzaCB0byBlbmFibGUgc3RhcnRpbmcgYW5pbWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgdGhpcy4kTEcoJ2JvZHknKS5maXJzdCgpLnJlbW92ZUNsYXNzKCdsZy1mcm9tLWhhc2gnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnpvb21hYmxlVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5pc0ltYWdlU2xpZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKGV2ZW50LmRldGFpbC5pbmRleCkuYWRkQ2xhc3MoJ2xnLXpvb21hYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZGV0YWlsLmluZGV4ID09PSBfdGhpcy5jb3JlLmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0Wm9vbUVzc2VudGlhbHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgX3NwZWVkICsgMzApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZW5hYmxlWm9vbU9uU2xpZGVJdGVtTG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gQWRkIHpvb21hYmxlIGNsYXNzXHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLnNsaWRlSXRlbUxvYWQgKyBcIi56b29tXCIsIHRoaXMuZW5hYmxlWm9vbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldE1vZGlmaWVyID0gZnVuY3Rpb24gKHJvdGF0ZVZhbHVlLCBheGlzLCBlbCkge1xyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxSb3RhdGUgPSByb3RhdGVWYWx1ZTtcclxuICAgICAgICAgICAgcm90YXRlVmFsdWUgPSBNYXRoLmFicyhyb3RhdGVWYWx1ZSk7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1WYWx1ZXMgPSB0aGlzLmdldEN1cnJlbnRUcmFuc2Zvcm0oZWwpO1xyXG4gICAgICAgICAgICBpZiAoIXRyYW5zZm9ybVZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG1vZGlmaWVyID0gMTtcclxuICAgICAgICAgICAgaWYgKGF4aXMgPT09ICdYJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZsaXBIb3Jpem9udGFsVmFsdWUgPSBNYXRoLnNpZ24ocGFyc2VGbG9hdCh0cmFuc2Zvcm1WYWx1ZXNbMF0pKTtcclxuICAgICAgICAgICAgICAgIGlmIChyb3RhdGVWYWx1ZSA9PT0gMCB8fCByb3RhdGVWYWx1ZSA9PT0gMTgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocm90YXRlVmFsdWUgPT09IDkwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChvcmlnaW5hbFJvdGF0ZSA9PT0gLTkwICYmIGZsaXBIb3Jpem9udGFsVmFsdWUgPT09IDEpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChvcmlnaW5hbFJvdGF0ZSA9PT0gOTAgJiYgZmxpcEhvcml6b250YWxWYWx1ZSA9PT0gLTEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllciA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbW9kaWZpZXIgPSBtb2RpZmllciAqIGZsaXBIb3Jpem9udGFsVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmxpcFZlcnRpY2FsVmFsdWUgPSBNYXRoLnNpZ24ocGFyc2VGbG9hdCh0cmFuc2Zvcm1WYWx1ZXNbM10pKTtcclxuICAgICAgICAgICAgICAgIGlmIChyb3RhdGVWYWx1ZSA9PT0gMCB8fCByb3RhdGVWYWx1ZSA9PT0gMTgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocm90YXRlVmFsdWUgPT09IDkwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpblggPSBwYXJzZUZsb2F0KHRyYW5zZm9ybVZhbHVlc1sxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpbk1pbnVzWCA9IHBhcnNlRmxvYXQodHJhbnNmb3JtVmFsdWVzWzJdKTtcclxuICAgICAgICAgICAgICAgICAgICBtb2RpZmllciA9IE1hdGguc2lnbihzaW5YICogc2luTWludXNYICogb3JpZ2luYWxSb3RhdGUgKiBmbGlwVmVydGljYWxWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtb2RpZmllciA9IG1vZGlmaWVyICogZmxpcFZlcnRpY2FsVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1vZGlmaWVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0SW1hZ2VTaXplID0gZnVuY3Rpb24gKCRpbWFnZSwgcm90YXRlVmFsdWUsIGF4aXMpIHtcclxuICAgICAgICAgICAgdmFyIGltYWdlU2l6ZXMgPSB7XHJcbiAgICAgICAgICAgICAgICB5OiAnb2Zmc2V0SGVpZ2h0JyxcclxuICAgICAgICAgICAgICAgIHg6ICdvZmZzZXRXaWR0aCcsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhyb3RhdGVWYWx1ZSkgPT09IDkwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTd2FwIGF4aXNcclxuICAgICAgICAgICAgICAgIGlmIChheGlzID09PSAneCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBheGlzID0gJ3knO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXhpcyA9ICd4JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJGltYWdlW2ltYWdlU2l6ZXNbYXhpc11dO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0RHJhZ0NvcmRzID0gZnVuY3Rpb24gKGUsIHJvdGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChyb3RhdGVWYWx1ZSA9PT0gOTApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZS5wYWdlWSxcclxuICAgICAgICAgICAgICAgICAgICB5OiBlLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZS5wYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBlLnBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0U3dpcGVDb3JkcyA9IGZ1bmN0aW9uIChlLCByb3RhdGVWYWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgeCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcclxuICAgICAgICAgICAgdmFyIHkgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVk7XHJcbiAgICAgICAgICAgIGlmIChyb3RhdGVWYWx1ZSA9PT0gOTApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogeSxcclxuICAgICAgICAgICAgICAgICAgICB5OiB4LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0RHJhZ0FsbG93ZWRBeGlzZXMgPSBmdW5jdGlvbiAocm90YXRlVmFsdWUsIHNjYWxlKSB7XHJcbiAgICAgICAgICAgIHNjYWxlID0gc2NhbGUgfHwgdGhpcy5zY2FsZSB8fCAxO1xyXG4gICAgICAgICAgICB2YXIgYWxsb3dZID0gdGhpcy5pbWFnZVlTaXplICogc2NhbGUgPiB0aGlzLmNvbnRhaW5lclJlY3QuaGVpZ2h0O1xyXG4gICAgICAgICAgICB2YXIgYWxsb3dYID0gdGhpcy5pbWFnZVhTaXplICogc2NhbGUgPiB0aGlzLmNvbnRhaW5lclJlY3Qud2lkdGg7XHJcbiAgICAgICAgICAgIGlmIChyb3RhdGVWYWx1ZSA9PT0gOTApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dYOiBhbGxvd1ksXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dZOiBhbGxvd1gsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1g6IGFsbG93WCxcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1k6IGFsbG93WSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxyXG4gICAgICAgICAqIEByZXR1cm4gbWF0cml4KGNvcyhYKSwgc2luKFgpLCAtc2luKFgpLCBjb3MoWCksIDAsIDApO1xyXG4gICAgICAgICAqIEdldCB0aGUgY3VycmVudCB0cmFuc2Zvcm0gdmFsdWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRDdXJyZW50VHJhbnNmb3JtID0gZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgIGlmICghZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc3QgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIHZhciB0bSA9IHN0LmdldFByb3BlcnR5VmFsdWUoJy13ZWJraXQtdHJhbnNmb3JtJykgfHxcclxuICAgICAgICAgICAgICAgIHN0LmdldFByb3BlcnR5VmFsdWUoJy1tb3otdHJhbnNmb3JtJykgfHxcclxuICAgICAgICAgICAgICAgIHN0LmdldFByb3BlcnR5VmFsdWUoJy1tcy10cmFuc2Zvcm0nKSB8fFxyXG4gICAgICAgICAgICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgnLW8tdHJhbnNmb3JtJykgfHxcclxuICAgICAgICAgICAgICAgIHN0LmdldFByb3BlcnR5VmFsdWUoJ3RyYW5zZm9ybScpIHx8XHJcbiAgICAgICAgICAgICAgICAnbm9uZSc7XHJcbiAgICAgICAgICAgIGlmICh0bSAhPT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG0uc3BsaXQoJygnKVsxXS5zcGxpdCgnKScpWzBdLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0Q3VycmVudFJvdGF0aW9uID0gZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgIGlmICghZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSB0aGlzLmdldEN1cnJlbnRUcmFuc2Zvcm0oZWwpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLmF0YW4yKHBhcnNlRmxvYXQodmFsdWVzWzFdKSwgcGFyc2VGbG9hdCh2YWx1ZXNbMF0pKSAqXHJcbiAgICAgICAgICAgICAgICAgICAgKDE4MCAvIE1hdGguUEkpKTtcclxuICAgICAgICAgICAgICAgIC8vIElmIHlvdSB3YW50IHJvdGF0ZSBpbiAzNjBcclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIChhbmdsZSA8IDAgPyBhbmdsZSArIDM2MCA6IGFuZ2xlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnNldFpvb21Fc3NlbnRpYWxzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJGltYWdlID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1hZ2UnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciByb3RhdGVFbCA9IHRoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltZy1yb3RhdGUnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZSA9IHRoaXMuZ2V0Q3VycmVudFJvdGF0aW9uKHJvdGF0ZUVsKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZVlTaXplID0gdGhpcy5nZXRJbWFnZVNpemUoJGltYWdlLmdldCgpLCB0aGlzLnJvdGF0ZVZhbHVlLCAneScpO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlWFNpemUgPSB0aGlzLmdldEltYWdlU2l6ZSgkaW1hZ2UuZ2V0KCksIHRoaXMucm90YXRlVmFsdWUsICd4Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyUmVjdCA9IHRoaXMuY29yZS5vdXRlci5nZXQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5tb2RpZmllclggPSB0aGlzLmdldE1vZGlmaWVyKHRoaXMucm90YXRlVmFsdWUsICdYJywgcm90YXRlRWwpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVyWSA9IHRoaXMuZ2V0TW9kaWZpZXIodGhpcy5yb3RhdGVWYWx1ZSwgJ1knLCByb3RhdGVFbCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBJbWFnZSB6b29tXHJcbiAgICAgICAgICogVHJhbnNsYXRlIHRoZSB3cmFwIGFuZCBzY2FsZSB0aGUgaW1hZ2UgdG8gZ2V0IGJldHRlciB1c2VyIGV4cGVyaWVuY2VcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzY2FsZSAtIFpvb20gZGVjcmVtZW50L2luY3JlbWVudCB2YWx1ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnpvb21JbWFnZSA9IGZ1bmN0aW9uIChzY2FsZSkge1xyXG4gICAgICAgICAgICAvLyBGaW5kIG9mZnNldCBtYW51YWxseSB0byBhdm9pZCBpc3N1ZSBhZnRlciB6b29tXHJcbiAgICAgICAgICAgIHZhciBvZmZzZXRYID0gKHRoaXMuY29udGFpbmVyUmVjdC53aWR0aCAtIHRoaXMuaW1hZ2VYU2l6ZSkgLyAyICtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyUmVjdC5sZWZ0O1xyXG4gICAgICAgICAgICB2YXIgX2EgPSB0aGlzLmNvcmUubWVkaWFDb250YWluZXJQb3NpdGlvbiwgdG9wID0gX2EudG9wLCBib3R0b20gPSBfYS5ib3R0b207XHJcbiAgICAgICAgICAgIHZhciB0b3BCb3R0b21TcGFjaW5nID0gTWF0aC5hYnModG9wIC0gYm90dG9tKSAvIDI7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXRZID0gKHRoaXMuY29udGFpbmVyUmVjdC5oZWlnaHQgLVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZVlTaXplIC1cclxuICAgICAgICAgICAgICAgIHRvcEJvdHRvbVNwYWNpbmcgKiB0aGlzLm1vZGlmaWVyWCkgL1xyXG4gICAgICAgICAgICAgICAgMiArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvcCArXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lclJlY3QudG9wO1xyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxYO1xyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxZO1xyXG4gICAgICAgICAgICBpZiAoc2NhbGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGRyYWdBbGxvd2VkQXhpc2VzID0gdGhpcy5nZXREcmFnQWxsb3dlZEF4aXNlcyhNYXRoLmFicyh0aGlzLnJvdGF0ZVZhbHVlKSwgc2NhbGUpO1xyXG4gICAgICAgICAgICB2YXIgYWxsb3dZID0gZHJhZ0FsbG93ZWRBeGlzZXMuYWxsb3dZLCBhbGxvd1ggPSBkcmFnQWxsb3dlZEF4aXNlcy5hbGxvd1g7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxYID0gdGhpcy5sZWZ0IC8gKHRoaXMuc2NhbGUgLSAxKTtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsWSA9IHRoaXMudG9wIC8gKHRoaXMuc2NhbGUgLSAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVggPSBNYXRoLmFicyhvcmlnaW5hbFgpICsgb2Zmc2V0WDtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVkgPSBNYXRoLmFicyhvcmlnaW5hbFkpICsgb2Zmc2V0WTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHBvc3NpYmxlU3dpcGVDb3JkcyA9IHRoaXMuZ2V0UG9zc2libGVTd2lwZURyYWdDb3Jkcyh0aGlzLnJvdGF0ZVZhbHVlLCBzY2FsZSk7XHJcbiAgICAgICAgICAgIHZhciBfeCA9IG9mZnNldFggLSB0aGlzLnBhZ2VYO1xyXG4gICAgICAgICAgICB2YXIgX3kgPSBvZmZzZXRZIC0gdGhpcy5wYWdlWTtcclxuICAgICAgICAgICAgdmFyIHggPSAoc2NhbGUgLSAxKSAqIF94O1xyXG4gICAgICAgICAgICB2YXIgeSA9IChzY2FsZSAtIDEpICogX3k7XHJcbiAgICAgICAgICAgIGlmIChhbGxvd1gpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVMZWZ0KHgsIHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5YKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWluWDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZVJpZ2h0KHgsIHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhYKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChzY2FsZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA8IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5YKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWluWDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoeCA+IHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhYKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFsbG93WSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZVRvcCh5LCBwb3NzaWJsZVN3aXBlQ29yZHMubWluWSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB5ID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVCb3R0b20oeSwgcG9zc2libGVTd2lwZUNvcmRzLm1heFkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhZO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHRyYW5zbGF0ZSB2YWx1ZSBiYXNlZCBvbiBpbmRleCBvZiBiZXlvbmQgdGhlIHZpZXdwb3J0LCB1dGlsaXplIHRoZSBhdmFpbGFibGUgc3BhY2UgdG8gcHJldmVudCBpbWFnZSBiZWluZyBjdXQgb3V0XHJcbiAgICAgICAgICAgICAgICBpZiAoc2NhbGUgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9JZiBpbWFnZSBnb2VzIGJleW9uZCB2aWV3cG9ydCB0b3AsIHVzZSB0aGUgbWluaW0gcG9zc2libGUgdHJhbnNsYXRlIHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHkgPCBwb3NzaWJsZVN3aXBlQ29yZHMubWluWSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHkgPiBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gcG9zc2libGVTd2lwZUNvcmRzLm1heFk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Wm9vbVN0eWxlcyh7XHJcbiAgICAgICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgICAgIHNjYWxlOiBzY2FsZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBhcHBseSBzY2FsZTNkIHRvIGltYWdlIGFuZCB0cmFuc2xhdGUgdG8gaW1hZ2Ugd3JhcFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3R5bGV9IFgsWSBhbmQgc2NhbGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBab29tLnByb3RvdHlwZS5zZXRab29tU3R5bGVzID0gZnVuY3Rpb24gKHN0eWxlKSB7XHJcbiAgICAgICAgICAgIHZhciAkaW1hZ2UgPSB0aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0odGhpcy5jb3JlLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWFnZScpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyICRkdW1teUltYWdlID0gdGhpcy5jb3JlLm91dGVyXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWN1cnJlbnQgLmxnLWR1bW15LWltZycpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyICRpbWFnZVdyYXAgPSAkaW1hZ2UucGFyZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUgPSBzdHlsZS5zY2FsZTtcclxuICAgICAgICAgICAgJGltYWdlLmNzcygndHJhbnNmb3JtJywgJ3NjYWxlM2QoJyArIHN0eWxlLnNjYWxlICsgJywgJyArIHN0eWxlLnNjYWxlICsgJywgMSknKTtcclxuICAgICAgICAgICAgJGR1bW15SW1hZ2UuY3NzKCd0cmFuc2Zvcm0nLCAnc2NhbGUzZCgnICsgc3R5bGUuc2NhbGUgKyAnLCAnICsgc3R5bGUuc2NhbGUgKyAnLCAxKScpO1xyXG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBzdHlsZS54ICsgJ3B4LCAnICsgc3R5bGUueSArICdweCwgMCknO1xyXG4gICAgICAgICAgICAkaW1hZ2VXcmFwLmNzcygndHJhbnNmb3JtJywgdHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gc3R5bGUueDtcclxuICAgICAgICAgICAgdGhpcy50b3AgPSBzdHlsZS55O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIGluZGV4IC0gSW5kZXggb2YgdGhlIGN1cnJlbnQgc2xpZGVcclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnQgLSBldmVudCB3aWxsIGJlIGF2YWlsYWJsZSBvbmx5IGlmIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgb24gY2xpY2tpbmcvdGFwaW5nIHRoZSBpbWFnc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnNldEFjdHVhbFNpemUgPSBmdW5jdGlvbiAoaW5kZXgsIGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIEFsbG93IHpvb20gb25seSBvbiBpbWFnZVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNJbWFnZVNsaWRlKCkgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5oYXNDbGFzcygnbGctZmlyc3Qtc2xpZGUtbG9hZGluZycpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNjYWxlID0gdGhpcy5nZXRDdXJyZW50SW1hZ2VBY3R1YWxTaXplU2NhbGUoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29yZS5vdXRlci5oYXNDbGFzcygnbGctem9vbWVkJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IHRoaXMuZ2V0U2NhbGUoc2NhbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGFnZUNvcmRzKGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5iZWdpblpvb20odGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuem9vbUltYWdlKHRoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWdyYWJiaW5nJykuYWRkQ2xhc3MoJ2xnLWdyYWInKTtcclxuICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0TmF0dXJhbFdpZHRoID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciAkaW1hZ2UgPSB0aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKGluZGV4KS5maW5kKCcubGctaW1hZ2UnKS5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgbmF0dXJhbFdpZHRoID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1tpbmRleF0ud2lkdGg7XHJcbiAgICAgICAgICAgIHJldHVybiBuYXR1cmFsV2lkdGhcclxuICAgICAgICAgICAgICAgID8gcGFyc2VGbG9hdChuYXR1cmFsV2lkdGgpXHJcbiAgICAgICAgICAgICAgICA6ICRpbWFnZS5nZXQoKS5uYXR1cmFsV2lkdGg7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRBY3R1YWxTaXplU2NhbGUgPSBmdW5jdGlvbiAobmF0dXJhbFdpZHRoLCB3aWR0aCkge1xyXG4gICAgICAgICAgICB2YXIgX3NjYWxlO1xyXG4gICAgICAgICAgICB2YXIgc2NhbGU7XHJcbiAgICAgICAgICAgIGlmIChuYXR1cmFsV2lkdGggPiB3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgX3NjYWxlID0gbmF0dXJhbFdpZHRoIC8gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICBzY2FsZSA9IF9zY2FsZSB8fCAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldEN1cnJlbnRJbWFnZUFjdHVhbFNpemVTY2FsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICRpbWFnZSA9IHRoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltYWdlJylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSAkaW1hZ2UuZ2V0KCkub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBuYXR1cmFsV2lkdGggPSB0aGlzLmdldE5hdHVyYWxXaWR0aCh0aGlzLmNvcmUuaW5kZXgpIHx8IHdpZHRoO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBY3R1YWxTaXplU2NhbGUobmF0dXJhbFdpZHRoLCB3aWR0aCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRQYWdlQ29yZHMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGNvcmRzID0ge307XHJcbiAgICAgICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29yZHMueCA9IGV2ZW50LnBhZ2VYIHx8IGV2ZW50LnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICAgICAgICAgICAgICBjb3Jkcy55ID0gZXZlbnQucGFnZVkgfHwgZXZlbnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXJSZWN0ID0gdGhpcy5jb3JlLm91dGVyLmdldCgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgY29yZHMueCA9IGNvbnRhaW5lclJlY3Qud2lkdGggLyAyICsgY29udGFpbmVyUmVjdC5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgY29yZHMueSA9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyUmVjdC5oZWlnaHQgLyAyICsgdGhpcy5zY3JvbGxUb3AgKyBjb250YWluZXJSZWN0LnRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY29yZHM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5zZXRQYWdlQ29yZHMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIHBhZ2VDb3JkcyA9IHRoaXMuZ2V0UGFnZUNvcmRzKGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlWCA9IHBhZ2VDb3Jkcy54O1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VZID0gcGFnZUNvcmRzLnk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBJZiB0cnVlLCB6b29tZWQgLSBpbiBlbHNlIHpvb21lZCBvdXRcclxuICAgICAgICBab29tLnByb3RvdHlwZS5iZWdpblpvb20gPSBmdW5jdGlvbiAoc2NhbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLnJlbW92ZUNsYXNzKCdsZy16b29tLWRyYWctdHJhbnNpdGlvbiBsZy16b29tLWRyYWdnaW5nJyk7XHJcbiAgICAgICAgICAgIGlmIChzY2FsZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5hZGRDbGFzcygnbGctem9vbWVkJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGFjdHVhbFNpemUgPSB0aGlzLmNvcmUuZ2V0RWxlbWVudEJ5SWQoJ2xnLWFjdHVhbC1zaXplJyk7XHJcbiAgICAgICAgICAgICAgICAkYWN0dWFsU2l6ZVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyh0aGlzLnNldHRpbmdzLmFjdHVhbFNpemVJY29ucy56b29tSW4pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MuYWN0dWFsU2l6ZUljb25zLnpvb21PdXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldFpvb20oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGUgPiAxO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0U2NhbGUgPSBmdW5jdGlvbiAoc2NhbGUpIHtcclxuICAgICAgICAgICAgdmFyIGFjdHVhbFNpemVTY2FsZSA9IHRoaXMuZ2V0Q3VycmVudEltYWdlQWN0dWFsU2l6ZVNjYWxlKCk7XHJcbiAgICAgICAgICAgIGlmIChzY2FsZSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzY2FsZSA+IGFjdHVhbFNpemVTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUgPSBhY3R1YWxTaXplU2NhbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLnpvb20pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkVGVtcGxhdGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlWm9vbU9uU2xpZGVJdGVtTG9hZCgpO1xyXG4gICAgICAgICAgICB2YXIgdGFwcGVkID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLm9uKCdkYmxjbGljay5sZycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy4kTEcoZXZlbnQudGFyZ2V0KS5oYXNDbGFzcygnbGctaW1hZ2UnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLnNldEFjdHVhbFNpemUoX3RoaXMuY29yZS5pbmRleCwgZXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLm9uKCd0b3VjaHN0YXJ0LmxnJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHRhcmdldCA9IF90aGlzLiRMRyhldmVudC50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgJHRhcmdldC5oYXNDbGFzcygnbGctaW1hZ2UnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGFwcGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcHBlZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwcGVkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0YXBwZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXBwZWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRBY3R1YWxTaXplKF90aGlzLmNvcmUuaW5kZXgsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgem9vbSBvbiByZXNpemUgYW5kIG9yaWVudGF0aW9uY2hhbmdlXHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmNvbnRhaW5lclJlc2l6ZSArIFwiLnpvb20gXCIgKyBsR0V2ZW50cy5yb3RhdGVSaWdodCArIFwiLnpvb20gXCIgKyBsR0V2ZW50cy5yb3RhdGVMZWZ0ICsgXCIuem9vbSBcIiArIGxHRXZlbnRzLmZsaXBIb3Jpem9udGFsICsgXCIuem9vbSBcIiArIGxHRXZlbnRzLmZsaXBWZXJ0aWNhbCArIFwiLnpvb21cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5jb3JlLmxnT3BlbmVkIHx8ICFfdGhpcy5pc0ltYWdlU2xpZGUoKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRQYWdlQ29yZHMoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldFpvb21Fc3NlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy56b29tSW1hZ2UoX3RoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIHpvb20gb24gcmVzaXplIGFuZCBvcmllbnRhdGlvbmNoYW5nZVxyXG4gICAgICAgICAgICB0aGlzLiRMRyh3aW5kb3cpLm9uKFwic2Nyb2xsLmxnLnpvb20uZ2xvYmFsXCIgKyB0aGlzLmNvcmUubGdJZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5jb3JlLmxnT3BlbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNjcm9sbFRvcCA9IF90aGlzLiRMRyh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLmdldEVsZW1lbnRCeUlkKCdsZy16b29tLW91dCcpLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jb3JlLm91dGVyLmZpbmQoJy5sZy1jdXJyZW50IC5sZy1pbWFnZScpLmdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2NhbGUgLT0gX3RoaXMuc2V0dGluZ3Muc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2NhbGUgPSBfdGhpcy5nZXRTY2FsZShfdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYmVnaW5ab29tKF90aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy56b29tSW1hZ2UoX3RoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLmdldEVsZW1lbnRCeUlkKCdsZy16b29tLWluJykub24oJ2NsaWNrLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuem9vbUluKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuZ2V0RWxlbWVudEJ5SWQoJ2xnLWFjdHVhbC1zaXplJykub24oJ2NsaWNrLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0QWN0dWFsU2l6ZShfdGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmJlZm9yZU9wZW4gKyBcIi56b29tXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIuZmluZCgnLmxnLWl0ZW0nKS5yZW1vdmVDbGFzcygnbGctem9vbWFibGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmFmdGVyT3BlbiArIFwiLnpvb21cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2Nyb2xsVG9wID0gX3RoaXMuJExHKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIGluaXRpYWwgdmFsdWUgY2VudGVyXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wYWdlWCA9IF90aGlzLmNvcmUub3V0ZXIud2lkdGgoKSAvIDI7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wYWdlWSA9IF90aGlzLmNvcmUub3V0ZXIuaGVpZ2h0KCkgLyAyICsgX3RoaXMuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gUmVzZXQgem9vbSBvbiBzbGlkZSBjaGFuZ2VcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuYWZ0ZXJTbGlkZSArIFwiLnpvb21cIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldkluZGV4ID0gZXZlbnQuZGV0YWlsLnByZXZJbmRleDtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnBvc2l0aW9uQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVzZXRab29tKHByZXZJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNJbWFnZVNsaWRlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRab29tRXNzZW50aWFscygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gRHJhZyBvcHRpb24gYWZ0ZXIgem9vbVxyXG4gICAgICAgICAgICB0aGlzLnpvb21EcmFnKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGluY2hab29tKCk7XHJcbiAgICAgICAgICAgIHRoaXMuem9vbVN3aXBlKCk7XHJcbiAgICAgICAgICAgIC8vIFN0b3JlIHRoZSB6b29tYWJsZSB0aW1lb3V0IHZhbHVlIGp1c3QgdG8gY2xlYXIgaXQgd2hpbGUgY2xvc2luZ1xyXG4gICAgICAgICAgICB0aGlzLnpvb21hYmxlVGltZW91dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuem9vbUluID0gZnVuY3Rpb24gKHNjYWxlKSB7XHJcbiAgICAgICAgICAgIC8vIEFsbG93IHpvb20gb25seSBvbiBpbWFnZVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNJbWFnZVNsaWRlKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgKz0gdGhpcy5zZXR0aW5ncy5zY2FsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNjYWxlID0gdGhpcy5nZXRTY2FsZSh0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgdGhpcy5iZWdpblpvb20odGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuem9vbUltYWdlKHRoaXMuc2NhbGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gUmVzZXQgem9vbSBlZmZlY3RcclxuICAgICAgICBab29tLnByb3RvdHlwZS5yZXNldFpvb20gPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLnJlbW92ZUNsYXNzKCdsZy16b29tZWQgbGctem9vbS1kcmFnLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgdmFyICRhY3R1YWxTaXplID0gdGhpcy5jb3JlLmdldEVsZW1lbnRCeUlkKCdsZy1hY3R1YWwtc2l6ZScpO1xyXG4gICAgICAgICAgICB2YXIgJGl0ZW0gPSB0aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKGluZGV4ICE9PSB1bmRlZmluZWQgPyBpbmRleCA6IHRoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgICRhY3R1YWxTaXplXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3ModGhpcy5zZXR0aW5ncy5hY3R1YWxTaXplSWNvbnMuem9vbU91dClcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLmFjdHVhbFNpemVJY29ucy56b29tSW4pO1xyXG4gICAgICAgICAgICAkaXRlbS5maW5kKCcubGctaW1nLXdyYXAnKS5maXJzdCgpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICRpdGVtLmZpbmQoJy5sZy1pbWFnZScpLmZpcnN0KCkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMudG9wID0gMDtcclxuICAgICAgICAgICAgLy8gUmVzZXQgcGFneCBwYWd5IHZhbHVlcyB0byBjZW50ZXJcclxuICAgICAgICAgICAgdGhpcy5zZXRQYWdlQ29yZHMoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldFRvdWNoRGlzdGFuY2UgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KChlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBlLnRhcmdldFRvdWNoZXNbMV0ucGFnZVgpICpcclxuICAgICAgICAgICAgICAgIChlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBlLnRhcmdldFRvdWNoZXNbMV0ucGFnZVgpICtcclxuICAgICAgICAgICAgICAgIChlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSBlLnRhcmdldFRvdWNoZXNbMV0ucGFnZVkpICpcclxuICAgICAgICAgICAgICAgICAgICAoZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gZS50YXJnZXRUb3VjaGVzWzFdLnBhZ2VZKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5waW5jaFpvb20gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzdGFydERpc3QgPSAwO1xyXG4gICAgICAgICAgICB2YXIgcGluY2hTdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBpbml0U2NhbGUgPSAxO1xyXG4gICAgICAgICAgICB2YXIgJGl0ZW0gPSB0aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS4kaW5uZXIub24oJ3RvdWNoc3RhcnQubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgJGl0ZW0gPSBfdGhpcy5jb3JlLmdldFNsaWRlSXRlbShfdGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuaXNJbWFnZVNsaWRlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFfdGhpcy5jb3JlLm91dGVyLmhhc0NsYXNzKCdsZy1maXJzdC1zbGlkZS1sb2FkaW5nJykgJiZcclxuICAgICAgICAgICAgICAgICAgICAoX3RoaXMuJExHKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctaXRlbScpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtLmdldCgpLmNvbnRhaW5zKGUudGFyZ2V0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0U2NhbGUgPSBfdGhpcy5zY2FsZSB8fCAxO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXpvb20tZHJhZy10cmFuc2l0aW9uIGxnLXpvb20tZHJhZ2dpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLnRvdWNoQWN0aW9uID0gJ3BpbmNoJztcclxuICAgICAgICAgICAgICAgICAgICBzdGFydERpc3QgPSBfdGhpcy5nZXRUb3VjaERpc3RhbmNlKGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLiRpbm5lci5vbigndG91Y2htb3ZlLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS50b3VjaEFjdGlvbiA9PT0gJ3BpbmNoJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChfdGhpcy4kTEcoZS50YXJnZXQpLmhhc0NsYXNzKCdsZy1pdGVtJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW0uZ2V0KCkuY29udGFpbnMoZS50YXJnZXQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5kRGlzdCA9IF90aGlzLmdldFRvdWNoRGlzdGFuY2UoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gc3RhcnREaXN0IC0gZW5kRGlzdDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBpbmNoU3RhcnRlZCAmJiBNYXRoLmFicyhkaXN0YW5jZSkgPiA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpbmNoU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaW5jaFN0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2NhbGUgPSBNYXRoLm1heCgxLCBpbml0U2NhbGUgKyAtZGlzdGFuY2UgKiAwLjAwOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnpvb21JbWFnZShfdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLiRpbm5lci5vbigndG91Y2hlbmQubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmNvcmUudG91Y2hBY3Rpb24gPT09ICdwaW5jaCcgJiZcclxuICAgICAgICAgICAgICAgICAgICAoX3RoaXMuJExHKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctaXRlbScpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtLmdldCgpLmNvbnRhaW5zKGUudGFyZ2V0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwaW5jaFN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydERpc3QgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zY2FsZSA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlc2V0Wm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2NhbGUgPSBfdGhpcy5nZXRTY2FsZShfdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnpvb21JbWFnZShfdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIuYWRkQ2xhc3MoJ2xnLXpvb21lZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLnRvdWNoQWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnRvdWNoZW5kWm9vbSA9IGZ1bmN0aW9uIChzdGFydENvb3JkcywgZW5kQ29vcmRzLCBhbGxvd1gsIGFsbG93WSwgdG91Y2hEdXJhdGlvbiwgcm90YXRlVmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlWG5ldyA9IGVuZENvb3Jkcy54IC0gc3RhcnRDb29yZHMueDtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlWW5ldyA9IGVuZENvb3Jkcy55IC0gc3RhcnRDb29yZHMueTtcclxuICAgICAgICAgICAgdmFyIHNwZWVkWCA9IE1hdGguYWJzKGRpc3RhbmNlWG5ldykgLyB0b3VjaER1cmF0aW9uICsgMTtcclxuICAgICAgICAgICAgdmFyIHNwZWVkWSA9IE1hdGguYWJzKGRpc3RhbmNlWW5ldykgLyB0b3VjaER1cmF0aW9uICsgMTtcclxuICAgICAgICAgICAgaWYgKHNwZWVkWCA+IDIpIHtcclxuICAgICAgICAgICAgICAgIHNwZWVkWCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzcGVlZFkgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICBzcGVlZFkgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkaXN0YW5jZVhuZXcgPSBkaXN0YW5jZVhuZXcgKiBzcGVlZFg7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlWW5ldyA9IGRpc3RhbmNlWW5ldyAqIHNwZWVkWTtcclxuICAgICAgICAgICAgdmFyIF9MR2VsID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1nLXdyYXAnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHt9O1xyXG4gICAgICAgICAgICBkaXN0YW5jZS54ID0gdGhpcy5sZWZ0ICsgZGlzdGFuY2VYbmV3ICogdGhpcy5tb2RpZmllclg7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlLnkgPSB0aGlzLnRvcCArIGRpc3RhbmNlWW5ldyAqIHRoaXMubW9kaWZpZXJZO1xyXG4gICAgICAgICAgICB2YXIgcG9zc2libGVTd2lwZUNvcmRzID0gdGhpcy5nZXRQb3NzaWJsZVN3aXBlRHJhZ0NvcmRzKHJvdGF0ZVZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpc3RhbmNlWG5ldykgPiAxNSB8fCBNYXRoLmFicyhkaXN0YW5jZVluZXcpID4gMTUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbGxvd1kpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlVG9wKGRpc3RhbmNlLnksIHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5ZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZS55ID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZUJvdHRvbShkaXN0YW5jZS55LCBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UueSA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhZO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhbGxvd1gpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlTGVmdChkaXN0YW5jZS54LCBwb3NzaWJsZVN3aXBlQ29yZHMubWluWCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UueCA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5YO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVSaWdodChkaXN0YW5jZS54LCBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UueCA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhYO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhbGxvd1kpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcCA9IGRpc3RhbmNlLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZS55ID0gdGhpcy50b3A7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsb3dYKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0ID0gZGlzdGFuY2UueDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlLnggPSB0aGlzLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFpvb21Td2lwZVN0eWxlcyhfTEdlbCwgZGlzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbkNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRab29tU3dpcGVDb3JkcyA9IGZ1bmN0aW9uIChzdGFydENvb3JkcywgZW5kQ29vcmRzLCBhbGxvd1gsIGFsbG93WSwgcG9zc2libGVTd2lwZUNvcmRzKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoYWxsb3dZKSB7XHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZS55ID1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcCArIChlbmRDb29yZHMueSAtIHN0YXJ0Q29vcmRzLnkpICogdGhpcy5tb2RpZmllclk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlVG9wKGRpc3RhbmNlLnksIHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5ZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWZmTWluWSA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5ZIC0gZGlzdGFuY2UueTtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZS55ID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblkgLSBkaWZmTWluWSAvIDY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVCb3R0b20oZGlzdGFuY2UueSwgcG9zc2libGVTd2lwZUNvcmRzLm1heFkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZmZNYXhZID0gZGlzdGFuY2UueSAtIHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhZO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlLnkgPSBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WSArIGRpZmZNYXhZIC8gNjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRpc3RhbmNlLnkgPSB0aGlzLnRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYWxsb3dYKSB7XHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZS54ID1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnQgKyAoZW5kQ29vcmRzLnggLSBzdGFydENvb3Jkcy54KSAqIHRoaXMubW9kaWZpZXJYO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZUxlZnQoZGlzdGFuY2UueCwgcG9zc2libGVTd2lwZUNvcmRzLm1pblgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZmZNaW5YID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblggLSBkaXN0YW5jZS54O1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlLnggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWluWCAtIGRpZmZNaW5YIC8gNjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZVJpZ2h0KGRpc3RhbmNlLngsIHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhYKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWZNYXhYID0gZGlzdGFuY2UueCAtIHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhYO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlLnggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WCArIGRpZk1heFggLyA2O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UueCA9IHRoaXMubGVmdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGlzdGFuY2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5pc0JleW9uZFBvc3NpYmxlTGVmdCA9IGZ1bmN0aW9uICh4LCBtaW5YKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4ID49IG1pblg7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5pc0JleW9uZFBvc3NpYmxlUmlnaHQgPSBmdW5jdGlvbiAoeCwgbWF4WCkge1xyXG4gICAgICAgICAgICByZXR1cm4geCA8PSBtYXhYO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuaXNCZXlvbmRQb3NzaWJsZVRvcCA9IGZ1bmN0aW9uICh5LCBtaW5ZKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB5ID49IG1pblk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5pc0JleW9uZFBvc3NpYmxlQm90dG9tID0gZnVuY3Rpb24gKHksIG1heFkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHkgPD0gbWF4WTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmlzSW1hZ2VTbGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRJdGVtID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1t0aGlzLmNvcmUuaW5kZXhdO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb3JlLmdldFNsaWRlVHlwZShjdXJyZW50SXRlbSkgPT09ICdpbWFnZSc7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRQb3NzaWJsZVN3aXBlRHJhZ0NvcmRzID0gZnVuY3Rpb24gKHJvdGF0ZVZhbHVlLCBzY2FsZSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YVNjYWxlID0gc2NhbGUgfHwgdGhpcy5zY2FsZSB8fCAxO1xyXG4gICAgICAgICAgICB2YXIgZWxEYXRhU2NhbGUgPSBNYXRoLmFicyhkYXRhU2NhbGUpO1xyXG4gICAgICAgICAgICB2YXIgX2EgPSB0aGlzLmNvcmUubWVkaWFDb250YWluZXJQb3NpdGlvbiwgdG9wID0gX2EudG9wLCBib3R0b20gPSBfYS5ib3R0b207XHJcbiAgICAgICAgICAgIHZhciB0b3BCb3R0b21TcGFjaW5nID0gTWF0aC5hYnModG9wIC0gYm90dG9tKSAvIDI7XHJcbiAgICAgICAgICAgIHZhciBtaW5ZID0gKHRoaXMuaW1hZ2VZU2l6ZSAtIHRoaXMuY29udGFpbmVyUmVjdC5oZWlnaHQpIC8gMiArXHJcbiAgICAgICAgICAgICAgICB0b3BCb3R0b21TcGFjaW5nICogdGhpcy5tb2RpZmllclg7XHJcbiAgICAgICAgICAgIHZhciBtYXhZID0gdGhpcy5jb250YWluZXJSZWN0LmhlaWdodCAtIHRoaXMuaW1hZ2VZU2l6ZSAqIGVsRGF0YVNjYWxlICsgbWluWTtcclxuICAgICAgICAgICAgdmFyIG1pblggPSAodGhpcy5pbWFnZVhTaXplIC0gdGhpcy5jb250YWluZXJSZWN0LndpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgIHZhciBtYXhYID0gdGhpcy5jb250YWluZXJSZWN0LndpZHRoIC0gdGhpcy5pbWFnZVhTaXplICogZWxEYXRhU2NhbGUgKyBtaW5YO1xyXG4gICAgICAgICAgICB2YXIgcG9zc2libGVTd2lwZUNvcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgbWluWTogbWluWSxcclxuICAgICAgICAgICAgICAgIG1heFk6IG1heFksXHJcbiAgICAgICAgICAgICAgICBtaW5YOiBtaW5YLFxyXG4gICAgICAgICAgICAgICAgbWF4WDogbWF4WCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHJvdGF0ZVZhbHVlKSA9PT0gOTApIHtcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlU3dpcGVDb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBtaW5ZOiBtaW5YLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFk6IG1heFgsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluWDogbWluWSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhYOiBtYXhZLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcG9zc2libGVTd2lwZUNvcmRzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuc2V0Wm9vbVN3aXBlU3R5bGVzID0gZnVuY3Rpb24gKExHZWwsIGRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIExHZWwuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoJyArIGRpc3RhbmNlLnggKyAncHgsICcgKyBkaXN0YW5jZS55ICsgJ3B4LCAwKScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuem9vbVN3aXBlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRDb29yZHMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGVuZENvb3JkcyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBBbGxvdyB4IGRpcmVjdGlvbiBkcmFnXHJcbiAgICAgICAgICAgIHZhciBhbGxvd1ggPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gQWxsb3cgWSBkaXJlY3Rpb24gZHJhZ1xyXG4gICAgICAgICAgICB2YXIgYWxsb3dZID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgZW5kVGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBwb3NzaWJsZVN3aXBlQ29yZHM7XHJcbiAgICAgICAgICAgIHZhciBfTEdlbDtcclxuICAgICAgICAgICAgdmFyICRpdGVtID0gdGhpcy5jb3JlLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuJGlubmVyLm9uKCd0b3VjaHN0YXJ0LmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIEFsbG93IHpvb20gb25seSBvbiBpbWFnZVxyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5pc0ltYWdlU2xpZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICRpdGVtID0gX3RoaXMuY29yZS5nZXRTbGlkZUl0ZW0oX3RoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoKF90aGlzLiRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLWl0ZW0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtLmdldCgpLmNvbnRhaW5zKGUudGFyZ2V0KSkgJiZcclxuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5oYXNDbGFzcygnbGctem9vbWVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLnRvdWNoQWN0aW9uID0gJ3pvb21Td2lwZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgX0xHZWwgPSBfdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0oX3RoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWctd3JhcCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maXJzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkcmFnQWxsb3dlZEF4aXNlcyA9IF90aGlzLmdldERyYWdBbGxvd2VkQXhpc2VzKE1hdGguYWJzKF90aGlzLnJvdGF0ZVZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dZID0gZHJhZ0FsbG93ZWRBeGlzZXMuYWxsb3dZO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93WCA9IGRyYWdBbGxvd2VkQXhpc2VzLmFsbG93WDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsb3dYIHx8IGFsbG93WSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydENvb3JkcyA9IF90aGlzLmdldFN3aXBlQ29yZHMoZSwgTWF0aC5hYnMoX3RoaXMucm90YXRlVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zc2libGVTd2lwZUNvcmRzID0gX3RoaXMuZ2V0UG9zc2libGVTd2lwZURyYWdDb3JkcyhfdGhpcy5yb3RhdGVWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXQgb3BhY2l0eSBhbmQgdHJhbnNpdGlvbiBkdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIuYWRkQ2xhc3MoJ2xnLXpvb20tZHJhZ2dpbmcgbGctem9vbS1kcmFnLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS4kaW5uZXIub24oJ3RvdWNobW92ZS5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUudG91Y2hBY3Rpb24gPT09ICd6b29tU3dpcGUnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKF90aGlzLiRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLWl0ZW0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbS5nZXQoKS5jb250YWlucyhlLnRhcmdldCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUudG91Y2hBY3Rpb24gPSAnem9vbVN3aXBlJztcclxuICAgICAgICAgICAgICAgICAgICBlbmRDb29yZHMgPSBfdGhpcy5nZXRTd2lwZUNvcmRzKGUsIE1hdGguYWJzKF90aGlzLnJvdGF0ZVZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gX3RoaXMuZ2V0Wm9vbVN3aXBlQ29yZHMoc3RhcnRDb29yZHMsIGVuZENvb3JkcywgYWxsb3dYLCBhbGxvd1ksIHBvc3NpYmxlU3dpcGVDb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGVuZENvb3Jkcy54IC0gc3RhcnRDb29yZHMueCkgPiAxNSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhlbmRDb29yZHMueSAtIHN0YXJ0Q29vcmRzLnkpID4gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFpvb21Td2lwZVN0eWxlcyhfTEdlbCwgZGlzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS4kaW5uZXIub24oJ3RvdWNoZW5kLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jb3JlLnRvdWNoQWN0aW9uID09PSAnem9vbVN3aXBlJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChfdGhpcy4kTEcoZS50YXJnZXQpLmhhc0NsYXNzKCdsZy1pdGVtJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW0uZ2V0KCkuY29udGFpbnMoZS50YXJnZXQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUudG91Y2hBY3Rpb24gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5yZW1vdmVDbGFzcygnbGctem9vbS1kcmFnZ2luZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNNb3ZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBlbmRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2hEdXJhdGlvbiA9IGVuZFRpbWUudmFsdWVPZigpIC0gc3RhcnRUaW1lLnZhbHVlT2YoKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b3VjaGVuZFpvb20oc3RhcnRDb29yZHMsIGVuZENvb3JkcywgYWxsb3dYLCBhbGxvd1ksIHRvdWNoRHVyYXRpb24sIF90aGlzLnJvdGF0ZVZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS56b29tRHJhZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHN0YXJ0Q29vcmRzID0ge307XHJcbiAgICAgICAgICAgIHZhciBlbmRDb29yZHMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGlzTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gQWxsb3cgeCBkaXJlY3Rpb24gZHJhZ1xyXG4gICAgICAgICAgICB2YXIgYWxsb3dYID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIEFsbG93IFkgZGlyZWN0aW9uIGRyYWdcclxuICAgICAgICAgICAgdmFyIGFsbG93WSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICB2YXIgZW5kVGltZTtcclxuICAgICAgICAgICAgdmFyIHBvc3NpYmxlU3dpcGVDb3JkcztcclxuICAgICAgICAgICAgdmFyIF9MR2VsO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIub24oJ21vdXNlZG93bi5sZy56b29tJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIEFsbG93IHpvb20gb25seSBvbiBpbWFnZVxyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5pc0ltYWdlU2xpZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciAkaXRlbSA9IF90aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKF90aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLiRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLWl0ZW0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtLmdldCgpLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX0xHZWwgPSBfdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0oX3RoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWctd3JhcCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maXJzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkcmFnQWxsb3dlZEF4aXNlcyA9IF90aGlzLmdldERyYWdBbGxvd2VkQXhpc2VzKE1hdGguYWJzKF90aGlzLnJvdGF0ZVZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dZID0gZHJhZ0FsbG93ZWRBeGlzZXMuYWxsb3dZO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93WCA9IGRyYWdBbGxvd2VkQXhpc2VzLmFsbG93WDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuY29yZS5vdXRlci5oYXNDbGFzcygnbGctem9vbWVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLiRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLW9iamVjdCcpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYWxsb3dYIHx8IGFsbG93WSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmRzID0gX3RoaXMuZ2V0RHJhZ0NvcmRzKGUsIE1hdGguYWJzKF90aGlzLnJvdGF0ZVZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJsZVN3aXBlQ29yZHMgPSBfdGhpcy5nZXRQb3NzaWJsZVN3aXBlRHJhZ0NvcmRzKF90aGlzLnJvdGF0ZVZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKiogRml4IGZvciB3ZWJraXQgY3Vyc29yIGlzc3VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yNjcyM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5nZXQoKS5zY3JvbGxMZWZ0ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLmdldCgpLnNjcm9sbExlZnQgLT0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xnLWdyYWInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbGctZ3JhYmJpbmcgbGctem9vbS1kcmFnLXRyYW5zaXRpb24gbGctem9vbS1kcmFnZ2luZycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXQgb3BhY2l0eSBhbmQgdHJhbnNpdGlvbiBkdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kTEcod2luZG93KS5vbihcIm1vdXNlbW92ZS5sZy56b29tLmdsb2JhbFwiICsgdGhpcy5jb3JlLmxnSWQsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZENvb3JkcyA9IF90aGlzLmdldERyYWdDb3JkcyhlLCBNYXRoLmFicyhfdGhpcy5yb3RhdGVWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IF90aGlzLmdldFpvb21Td2lwZUNvcmRzKHN0YXJ0Q29vcmRzLCBlbmRDb29yZHMsIGFsbG93WCwgYWxsb3dZLCBwb3NzaWJsZVN3aXBlQ29yZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFpvb21Td2lwZVN0eWxlcyhfTEdlbCwgZGlzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kTEcod2luZG93KS5vbihcIm1vdXNldXAubGcuem9vbS5nbG9iYWxcIiArIHRoaXMuY29yZS5sZ0lkLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5yZW1vdmVDbGFzcygnbGctem9vbS1kcmFnZ2luZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpeCBmb3IgY2hyb21lIG1vdXNlIG1vdmUgb24gY2xpY2tcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNNb3ZlZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoc3RhcnRDb29yZHMueCAhPT0gZW5kQ29vcmRzLnggfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmRzLnkgIT09IGVuZENvb3Jkcy55KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRDb29yZHMgPSBfdGhpcy5nZXREcmFnQ29yZHMoZSwgTWF0aC5hYnMoX3RoaXMucm90YXRlVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoRHVyYXRpb24gPSBlbmRUaW1lLnZhbHVlT2YoKSAtIHN0YXJ0VGltZS52YWx1ZU9mKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvdWNoZW5kWm9vbShzdGFydENvb3JkcywgZW5kQ29vcmRzLCBhbGxvd1gsIGFsbG93WSwgdG91Y2hEdXJhdGlvbiwgX3RoaXMucm90YXRlVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1ncmFiYmluZycpLmFkZENsYXNzKCdsZy1ncmFiJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuY2xvc2VHYWxsZXJ5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0Wm9vbSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gVW5iaW5kIGFsbCBldmVudHMgYWRkZWQgYnkgbGlnaHRHYWxsZXJ5IHpvb20gcGx1Z2luXHJcbiAgICAgICAgICAgIHRoaXMuJExHKHdpbmRvdykub2ZmKFwiLmxnLnpvb20uZ2xvYmFsXCIgKyB0aGlzLmNvcmUubGdJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9mZignLmxnLnpvb20nKTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub2ZmKCcuem9vbScpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy56b29tYWJsZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICB0aGlzLnpvb21hYmxlVGltZW91dCA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFpvb207XHJcbiAgICB9KCkpO1xuXG4gICAgcmV0dXJuIFpvb207XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sZy16b29tLnVtZC5qcy5tYXBcbiIsIi8qIVxuICogbGlnaHRnYWxsZXJ5IHwgMi40LjAtYmV0YS4wIHwgRGVjZW1iZXIgMTJ0aCAyMDIxXG4gKiBodHRwOi8vd3d3LmxpZ2h0Z2FsbGVyeWpzLmNvbS9cbiAqIENvcHlyaWdodCAoYykgMjAyMCBTYWNoaW4gTmVyYXZhdGg7XG4gKiBAbGljZW5zZSBHUEx2M1xuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLmxnVmlkZW8gPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICAvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuICAgIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG4gICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuICAgIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuICAgIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG4gICAgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG4gICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbiAgICBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG4gICAgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG4gICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcblxuICAgIHZhciB2aWRlb1NldHRpbmdzID0ge1xyXG4gICAgICAgIGF1dG9wbGF5Rmlyc3RWaWRlbzogdHJ1ZSxcclxuICAgICAgICB5b3VUdWJlUGxheWVyUGFyYW1zOiBmYWxzZSxcclxuICAgICAgICB2aW1lb1BsYXllclBhcmFtczogZmFsc2UsXHJcbiAgICAgICAgd2lzdGlhUGxheWVyUGFyYW1zOiBmYWxzZSxcclxuICAgICAgICBnb3RvTmV4dFNsaWRlT25WaWRlb0VuZDogdHJ1ZSxcclxuICAgICAgICBhdXRvcGxheVZpZGVvT25TbGlkZTogZmFsc2UsXHJcbiAgICAgICAgdmlkZW9qczogZmFsc2UsXHJcbiAgICAgICAgdmlkZW9qc09wdGlvbnM6IHt9LFxyXG4gICAgfTtcblxuICAgIC8qKlxyXG4gICAgICogTGlzdCBvZiBsaWdodEdhbGxlcnkgZXZlbnRzXHJcbiAgICAgKiBBbGwgZXZlbnRzIHNob3VsZCBiZSBkb2N1bWVudGVkIGhlcmVcclxuICAgICAqIEJlbG93IGludGVyZmFjZXMgYXJlIHVzZWQgdG8gYnVpbGQgdGhlIHdlYnNpdGUgZG9jdW1lbnRhdGlvbnNcclxuICAgICAqICovXHJcbiAgICB2YXIgbEdFdmVudHMgPSB7XHJcbiAgICAgICAgYWZ0ZXJBcHBlbmRTbGlkZTogJ2xnQWZ0ZXJBcHBlbmRTbGlkZScsXHJcbiAgICAgICAgaW5pdDogJ2xnSW5pdCcsXHJcbiAgICAgICAgaGFzVmlkZW86ICdsZ0hhc1ZpZGVvJyxcclxuICAgICAgICBjb250YWluZXJSZXNpemU6ICdsZ0NvbnRhaW5lclJlc2l6ZScsXHJcbiAgICAgICAgdXBkYXRlU2xpZGVzOiAnbGdVcGRhdGVTbGlkZXMnLFxyXG4gICAgICAgIGFmdGVyQXBwZW5kU3ViSHRtbDogJ2xnQWZ0ZXJBcHBlbmRTdWJIdG1sJyxcclxuICAgICAgICBiZWZvcmVPcGVuOiAnbGdCZWZvcmVPcGVuJyxcclxuICAgICAgICBhZnRlck9wZW46ICdsZ0FmdGVyT3BlbicsXHJcbiAgICAgICAgc2xpZGVJdGVtTG9hZDogJ2xnU2xpZGVJdGVtTG9hZCcsXHJcbiAgICAgICAgYmVmb3JlU2xpZGU6ICdsZ0JlZm9yZVNsaWRlJyxcclxuICAgICAgICBhZnRlclNsaWRlOiAnbGdBZnRlclNsaWRlJyxcclxuICAgICAgICBwb3N0ZXJDbGljazogJ2xnUG9zdGVyQ2xpY2snLFxyXG4gICAgICAgIGRyYWdTdGFydDogJ2xnRHJhZ1N0YXJ0JyxcclxuICAgICAgICBkcmFnTW92ZTogJ2xnRHJhZ01vdmUnLFxyXG4gICAgICAgIGRyYWdFbmQ6ICdsZ0RyYWdFbmQnLFxyXG4gICAgICAgIGJlZm9yZU5leHRTbGlkZTogJ2xnQmVmb3JlTmV4dFNsaWRlJyxcclxuICAgICAgICBiZWZvcmVQcmV2U2xpZGU6ICdsZ0JlZm9yZVByZXZTbGlkZScsXHJcbiAgICAgICAgYmVmb3JlQ2xvc2U6ICdsZ0JlZm9yZUNsb3NlJyxcclxuICAgICAgICBhZnRlckNsb3NlOiAnbGdBZnRlckNsb3NlJyxcclxuICAgICAgICByb3RhdGVMZWZ0OiAnbGdSb3RhdGVMZWZ0JyxcclxuICAgICAgICByb3RhdGVSaWdodDogJ2xnUm90YXRlUmlnaHQnLFxyXG4gICAgICAgIGZsaXBIb3Jpem9udGFsOiAnbGdGbGlwSG9yaXpvbnRhbCcsXHJcbiAgICAgICAgZmxpcFZlcnRpY2FsOiAnbGdGbGlwVmVydGljYWwnLFxyXG4gICAgICAgIGF1dG9wbGF5OiAnbGdBdXRvcGxheScsXHJcbiAgICAgICAgYXV0b3BsYXlTdGFydDogJ2xnQXV0b3BsYXlTdGFydCcsXHJcbiAgICAgICAgYXV0b3BsYXlTdG9wOiAnbGdBdXRvcGxheVN0b3AnLFxyXG4gICAgfTtcblxuICAgIHZhciBwYXJhbSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKVxyXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoaykgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2tdKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuam9pbignJicpO1xyXG4gICAgfTtcclxuICAgIHZhciBnZXRWaW1lb1VSTFBhcmFtcyA9IGZ1bmN0aW9uIChkZWZhdWx0UGFyYW1zLCB2aWRlb0luZm8pIHtcclxuICAgICAgICBpZiAoIXZpZGVvSW5mbyB8fCAhdmlkZW9JbmZvLnZpbWVvKVxyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgdmFyIHVybFBhcmFtcyA9IHZpZGVvSW5mby52aW1lb1syXSB8fCAnJztcclxuICAgICAgICB1cmxQYXJhbXMgPVxyXG4gICAgICAgICAgICB1cmxQYXJhbXNbMF0gPT0gJz8nID8gJyYnICsgdXJsUGFyYW1zLnNsaWNlKDEpIDogdXJsUGFyYW1zIHx8ICcnO1xyXG4gICAgICAgIHZhciBkZWZhdWx0UGxheWVyUGFyYW1zID0gZGVmYXVsdFBhcmFtc1xyXG4gICAgICAgICAgICA/ICcmJyArIHBhcmFtKGRlZmF1bHRQYXJhbXMpXHJcbiAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgLy8gRm9yIHZpbWVvIGxhc3QgcGFybXMgZ2V0cyBwcmlvcml0eSBpZiBkdXBsaWNhdGVzIGZvdW5kXHJcbiAgICAgICAgdmFyIHZpbWVvUGxheWVyUGFyYW1zID0gXCI/YXV0b3BsYXk9MCZtdXRlZD0xXCIgKyBkZWZhdWx0UGxheWVyUGFyYW1zICsgdXJsUGFyYW1zO1xyXG4gICAgICAgIHJldHVybiB2aW1lb1BsYXllclBhcmFtcztcclxuICAgIH07XG5cbiAgICAvKipcclxuICAgICAqIFZpZGVvIG1vZHVsZSBmb3IgbGlnaHRHYWxsZXJ5XHJcbiAgICAgKiBTdXBwb3J0cyBIVE1MNSwgWW91VHViZSwgVmltZW8sIHdpc3RpYSB2aWRlb3NcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHJlZiBXaXN0aWFcclxuICAgICAqIGh0dHBzOi8vd2lzdGlhLmNvbS9zdXBwb3J0L2ludGVncmF0aW9ucy93b3JkcHJlc3MoSG93IHRvIGdldCB1cmwpXHJcbiAgICAgKiBodHRwczovL3dpc3RpYS5jb20vc3VwcG9ydC9kZXZlbG9wZXJzL2VtYmVkLW9wdGlvbnMjdXNpbmctZW1iZWQtb3B0aW9uc1xyXG4gICAgICogaHR0cHM6Ly93aXN0aWEuY29tL3N1cHBvcnQvZGV2ZWxvcGVycy9wbGF5ZXItYXBpXHJcbiAgICAgKiBodHRwczovL3dpc3RpYS5jb20vc3VwcG9ydC9kZXZlbG9wZXJzL2NvbnN0cnVjdC1hbi1lbWJlZC1jb2RlXHJcbiAgICAgKiBodHRwOi8vanNmaWRkbGUubmV0L3h2bm03eExtL1xyXG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50L3ZpZGVvXHJcbiAgICAgKiBodHRwczovL3dpc3RpYS5jb20vc3VwcG9ydC9lbWJlZC1hbmQtc2hhcmUvc2hhcmluZy12aWRlb3NcclxuICAgICAqIGh0dHBzOi8vcHJpdmF0ZS1zaGFyaW5nLndpc3RpYS5jb20vbWVkaWFzL213aHJ1bHJ1Y2pcclxuICAgICAqXHJcbiAgICAgKiBAcmVmIFlvdXR1YmVcclxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3lvdXR1YmUvcGxheWVyX3BhcmFtZXRlcnMjZW5hYmxlanNhcGlcclxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3lvdXR1YmUvaWZyYW1lX2FwaV9yZWZlcmVuY2VcclxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vYmxvZy9hdXRvcGxheS8jaWZyYW1lLWRlbGVnYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmVmIFZpbWVvXHJcbiAgICAgKiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDQ4ODk0My9lYXN5LXdheS10by1nZXQtdmltZW8taWQtZnJvbS1hLXZpbWVvLXVybFxyXG4gICAgICogaHR0cHM6Ly92aW1lby56ZW5kZXNrLmNvbS9oYy9lbi11cy9hcnRpY2xlcy8zNjAwMDAxMjE2NjgtU3RhcnRpbmctcGxheWJhY2stYXQtYS1zcGVjaWZpYy10aW1lY29kZVxyXG4gICAgICogaHR0cHM6Ly92aW1lby56ZW5kZXNrLmNvbS9oYy9lbi11cy9hcnRpY2xlcy8zNjAwMDE0OTQ0NDctVXNpbmctUGxheWVyLVBhcmFtZXRlcnNcclxuICAgICAqL1xyXG4gICAgdmFyIFZpZGVvID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIFZpZGVvKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIC8vIGdldCBsaWdodEdhbGxlcnkgY29yZSBwbHVnaW4gaW5zdGFuY2VcclxuICAgICAgICAgICAgdGhpcy5jb3JlID0gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdmlkZW9TZXR0aW5ncyksIHRoaXMuY29yZS5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBWaWRlby5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEV2ZW50IHRyaWdnZXJlZCB3aGVuIHZpZGVvIHVybCBmb3VuZCB3aXRob3V0IHBvc3RlclxyXG4gICAgICAgICAgICAgKiBBcHBlbmQgdmlkZW8gSFRNTFxyXG4gICAgICAgICAgICAgKiBQbGF5IGlmIGF1dG9wbGF5Rmlyc3RWaWRlbyBpcyB0cnVlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5oYXNWaWRlbyArIFwiLnZpZGVvXCIsIHRoaXMub25IYXNWaWRlby5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMucG9zdGVyQ2xpY2sgKyBcIi52aWRlb1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGVsID0gX3RoaXMuY29yZS5nZXRTbGlkZUl0ZW0oX3RoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5sb2FkVmlkZW9PblBvc3RlckNsaWNrKCRlbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5zbGlkZUl0ZW1Mb2FkICsgXCIudmlkZW9cIiwgdGhpcy5vblNsaWRlSXRlbUxvYWQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIC8vIEBkZXNjIGZpcmVkIGltbWVkaWF0ZWx5IGJlZm9yZSBlYWNoIHNsaWRlIHRyYW5zaXRpb24uXHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmJlZm9yZVNsaWRlICsgXCIudmlkZW9cIiwgdGhpcy5vbkJlZm9yZVNsaWRlLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAvLyBAZGVzYyBmaXJlZCBpbW1lZGlhdGVseSBhZnRlciBlYWNoIHNsaWRlIHRyYW5zaXRpb24uXHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmFmdGVyU2xpZGUgKyBcIi52aWRlb1wiLCB0aGlzLm9uQWZ0ZXJTbGlkZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIEV2ZW50IHRyaWdnZXJlZCB3aGVuIGEgc2xpZGUgaXMgY29tcGxldGVseSBsb2FkZWRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gbGlnaHRHYWxsZXkgY3VzdG9tIGV2ZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLm9uU2xpZGVJdGVtTG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgX2EgPSBldmVudC5kZXRhaWwsIGlzRmlyc3RTbGlkZSA9IF9hLmlzRmlyc3RTbGlkZSwgaW5kZXggPSBfYS5pbmRleDtcclxuICAgICAgICAgICAgLy8gU2hvdWxkIGNoZWNrIHRoZSBhY3RpdmUgc2xpZGUgYXMgd2VsbCBhcyB1c2VyIG1heSBoYXZlIG1vdmVkIHRvIGRpZmZlcmVudCBzbGlkZSBiZWZvcmUgdGhlIGZpcnN0IHNsaWRlIGlzIGxvYWRlZFxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hdXRvcGxheUZpcnN0VmlkZW8gJiZcclxuICAgICAgICAgICAgICAgIGlzRmlyc3RTbGlkZSAmJlxyXG4gICAgICAgICAgICAgICAgaW5kZXggPT09IHRoaXMuY29yZS5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRGVsYXkgaXMganVzdCBmb3IgdGhlIHRyYW5zaXRpb24gZWZmZWN0IG9uIHZpZGVvIGxvYWRcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmxvYWRBbmRQbGF5VmlkZW8oaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTaG91bGQgbm90IGNhbGwgb24gZmlyc3Qgc2xpZGUuIHNob3VsZCBjaGVjayBvbmx5IGlmIHRoZSBzbGlkZSBpcyBhY3RpdmVcclxuICAgICAgICAgICAgaWYgKCFpc0ZpcnN0U2xpZGUgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuYXV0b3BsYXlWaWRlb09uU2xpZGUgJiZcclxuICAgICAgICAgICAgICAgIGluZGV4ID09PSB0aGlzLmNvcmUuaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEFuZFBsYXlWaWRlbyhpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIEV2ZW50IHRyaWdnZXJlZCB3aGVuIHZpZGVvIHVybCBvciBwb3N0ZXIgZm91bmRcclxuICAgICAgICAgKiBBcHBlbmQgdmlkZW8gSFRNTCBpcyBwb3N0ZXIgaXMgbm90IGdpdmVuXHJcbiAgICAgICAgICogUGxheSBpZiBhdXRvcGxheUZpcnN0VmlkZW8gaXMgdHJ1ZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBKYXZhc2NyaXB0IEV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBWaWRlby5wcm90b3R5cGUub25IYXNWaWRlbyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX2EgPSBldmVudC5kZXRhaWwsIGluZGV4ID0gX2EuaW5kZXgsIHNyYyA9IF9hLnNyYywgaHRtbDVWaWRlbyA9IF9hLmh0bWw1VmlkZW8sIGhhc1Bvc3RlciA9IF9hLmhhc1Bvc3RlcjtcclxuICAgICAgICAgICAgaWYgKCFoYXNQb3N0ZXIpIHtcclxuICAgICAgICAgICAgICAgIC8vIEFsbCBmdW5jdGlvbnMgYXJlIGNhbGxlZCBzZXBhcmF0ZWx5IGlmIHBvc3RlciBleGlzdCBpbiBsb2FkVmlkZW9PblBvc3RlckNsaWNrIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFZpZGVvcyh0aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKGluZGV4KSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzOiAnbGctb2JqZWN0JyxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbDVWaWRlbzogaHRtbDVWaWRlbyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gQXV0b21hdGljYWxseSBuYXZpZ2F0ZSB0byBuZXh0IHNsaWRlIG9uY2UgdmlkZW8gcmVhY2hlcyB0aGUgZW5kLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5nb3RvTmV4dFNsaWRlT25WaWRlb0VuZChzcmMsIGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgZmlyZWQgaW1tZWRpYXRlbHkgYmVmb3JlIGVhY2ggc2xpZGUgdHJhbnNpdGlvbi5cclxuICAgICAgICAgKiBQYXVzZSB0aGUgcHJldmlvdXMgdmlkZW9cclxuICAgICAgICAgKiBIaWRlIHRoZSBkb3dubG9hZCBidXR0b24gaWYgdGhlIHNsaWRlIGNvbnRhaW5zIFlvdVR1YmUsIFZpbWVvLCBvciBXaXN0aWEgdmlkZW9zLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBKYXZhc2NyaXB0IEV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcHJldkluZGV4IC0gUHJldmlvdXMgaW5kZXggb2YgdGhlIHNsaWRlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEN1cnJlbnQgaW5kZXggb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLm9uQmVmb3JlU2xpZGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29yZS5sR2FsbGVyeU9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldkluZGV4ID0gZXZlbnQuZGV0YWlsLnByZXZJbmRleDtcclxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2VWaWRlbyhwcmV2SW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBmaXJlZCBpbW1lZGlhdGVseSBhZnRlciBlYWNoIHNsaWRlIHRyYW5zaXRpb24uXHJcbiAgICAgICAgICogUGxheSB2aWRlbyBpZiBhdXRvcGxheVZpZGVvT25TbGlkZSBvcHRpb24gaXMgZW5hYmxlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gSmF2YXNjcmlwdCBFdmVudCBvYmplY3QuXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHByZXZJbmRleCAtIFByZXZpb3VzIGluZGV4IG9mIHRoZSBzbGlkZS5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBDdXJyZW50IGluZGV4IG9mIHRoZSBzbGlkZVxyXG4gICAgICAgICAqIEB0b2RvIHNob3VsZCBjaGVjayBvbiBvblNsaWRlTG9hZCBhcyB3ZWxsIGlmIHZpZGVvIGlzIG5vdCBsb2FkZWQgb24gYWZ0ZXIgc2xpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBWaWRlby5wcm90b3R5cGUub25BZnRlclNsaWRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBfYSA9IGV2ZW50LmRldGFpbCwgaW5kZXggPSBfYS5pbmRleCwgcHJldkluZGV4ID0gX2EucHJldkluZGV4O1xyXG4gICAgICAgICAgICAvLyBEbyBub3QgY2FsbCBvbiBmaXJzdCBzbGlkZVxyXG4gICAgICAgICAgICB2YXIgJHNsaWRlID0gdGhpcy5jb3JlLmdldFNsaWRlSXRlbShpbmRleCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmF1dG9wbGF5VmlkZW9PblNsaWRlICYmIGluZGV4ICE9PSBwcmV2SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUuaGFzQ2xhc3MoJ2xnLWNvbXBsZXRlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9hZEFuZFBsYXlWaWRlbyhpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLmxvYWRBbmRQbGF5VmlkZW8gPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyICRzbGlkZSA9IHRoaXMuY29yZS5nZXRTbGlkZUl0ZW0oaW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEdhbGxlcnlJdGVtID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50R2FsbGVyeUl0ZW0ucG9zdGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRWaWRlb09uUG9zdGVyQ2xpY2soJHNsaWRlLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVZpZGVvKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGxheSBIVE1MNSwgWW91dHViZSwgVmltZW8gb3IgV2lzdGlhIHZpZGVvcyBpbiBhIHBhcnRpY3VsYXIgc2xpZGUuXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gSW5kZXggb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLnBsYXlWaWRlbyA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xWaWRlbyhpbmRleCwgJ3BsYXknKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBhdXNlIEhUTUw1LCBZb3V0dWJlLCBWaW1lbyBvciBXaXN0aWEgdmlkZW9zIGluIGEgcGFydGljdWxhciBzbGlkZS5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBJbmRleCBvZiB0aGUgc2xpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBWaWRlby5wcm90b3R5cGUucGF1c2VWaWRlbyA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xWaWRlbyhpbmRleCwgJ3BhdXNlJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBWaWRlby5wcm90b3R5cGUuZ2V0VmlkZW9IdG1sID0gZnVuY3Rpb24gKHNyYywgYWRkQ2xhc3MsIGluZGV4LCBodG1sNVZpZGVvKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlbyA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgdmlkZW9JbmZvID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1tpbmRleF1cclxuICAgICAgICAgICAgICAgIC5fX3NsaWRlVmlkZW9JbmZvIHx8IHt9O1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEdhbGxlcnlJdGVtID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgIHZhciB2aWRlb1RpdGxlID0gY3VycmVudEdhbGxlcnlJdGVtLnRpdGxlIHx8IGN1cnJlbnRHYWxsZXJ5SXRlbS5hbHQ7XHJcbiAgICAgICAgICAgIHZpZGVvVGl0bGUgPSB2aWRlb1RpdGxlID8gJ3RpdGxlPVwiJyArIHZpZGVvVGl0bGUgKyAnXCInIDogJyc7XHJcbiAgICAgICAgICAgIHZhciBjb21tb25JZnJhbWVQcm9wcyA9IFwiYWxsb3d0cmFuc3BhcmVuY3k9XFxcInRydWVcXFwiXFxuICAgICAgICAgICAgZnJhbWVib3JkZXI9XFxcIjBcXFwiXFxuICAgICAgICAgICAgc2Nyb2xsaW5nPVxcXCJub1xcXCJcXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW5cXG4gICAgICAgICAgICBtb3phbGxvd2Z1bGxzY3JlZW5cXG4gICAgICAgICAgICB3ZWJraXRhbGxvd2Z1bGxzY3JlZW5cXG4gICAgICAgICAgICBvYWxsb3dmdWxsc2NyZWVuXFxuICAgICAgICAgICAgbXNhbGxvd2Z1bGxzY3JlZW5cIjtcclxuICAgICAgICAgICAgaWYgKHZpZGVvSW5mby55b3V0dWJlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlkZW9JZCA9ICdsZy15b3V0dWJlJyArIGluZGV4O1xyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlVXJsUGFyYW1zID0gdmlkZW9JbmZvLnlvdXR1YmVbMl1cclxuICAgICAgICAgICAgICAgICAgICA/IHZpZGVvSW5mby55b3V0dWJlWzJdICsgJyYnXHJcbiAgICAgICAgICAgICAgICAgICAgOiAnJztcclxuICAgICAgICAgICAgICAgIC8vIEZvciB5b3V0dWJlIGZpcnN0IHBhcm1zIGdldHMgcHJpb3JpdHkgaWYgZHVwbGljYXRlcyBmb3VuZFxyXG4gICAgICAgICAgICAgICAgdmFyIHlvdVR1YmVQbGF5ZXJQYXJhbXMgPSBcIj9cIiArIHNsaWRlVXJsUGFyYW1zICsgXCJ3bW9kZT1vcGFxdWUmYXV0b3BsYXk9MCZtdXRlPTEmZW5hYmxlanNhcGk9MVwiO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllclBhcmFtcyA9IHlvdVR1YmVQbGF5ZXJQYXJhbXMgK1xyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnNldHRpbmdzLnlvdVR1YmVQbGF5ZXJQYXJhbXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnJicgKyBwYXJhbSh0aGlzLnNldHRpbmdzLnlvdVR1YmVQbGF5ZXJQYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJycpO1xyXG4gICAgICAgICAgICAgICAgdmlkZW8gPSBcIjxpZnJhbWUgYWxsb3c9XFxcImF1dG9wbGF5XFxcIiBpZD1cIiArIHZpZGVvSWQgKyBcIiBjbGFzcz1cXFwibGctdmlkZW8tb2JqZWN0IGxnLXlvdXR1YmUgXCIgKyBhZGRDbGFzcyArIFwiXFxcIiBcIiArIHZpZGVvVGl0bGUgKyBcIiBzcmM9XFxcIi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL1wiICsgKHZpZGVvSW5mby55b3V0dWJlWzFdICsgcGxheWVyUGFyYW1zKSArIFwiXFxcIiBcIiArIGNvbW1vbklmcmFtZVByb3BzICsgXCI+PC9pZnJhbWU+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmlkZW9JbmZvLnZpbWVvKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlkZW9JZCA9ICdsZy12aW1lbycgKyBpbmRleDtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXJQYXJhbXMgPSBnZXRWaW1lb1VSTFBhcmFtcyh0aGlzLnNldHRpbmdzLnZpbWVvUGxheWVyUGFyYW1zLCB2aWRlb0luZm8pO1xyXG4gICAgICAgICAgICAgICAgdmlkZW8gPSBcIjxpZnJhbWUgYWxsb3c9XFxcImF1dG9wbGF5XFxcIiBpZD1cIiArIHZpZGVvSWQgKyBcIiBjbGFzcz1cXFwibGctdmlkZW8tb2JqZWN0IGxnLXZpbWVvIFwiICsgYWRkQ2xhc3MgKyBcIlxcXCIgXCIgKyB2aWRlb1RpdGxlICsgXCIgc3JjPVxcXCIvL3BsYXllci52aW1lby5jb20vdmlkZW8vXCIgKyAodmlkZW9JbmZvLnZpbWVvWzFdICsgcGxheWVyUGFyYW1zKSArIFwiXFxcIiBcIiArIGNvbW1vbklmcmFtZVByb3BzICsgXCI+PC9pZnJhbWU+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmlkZW9JbmZvLndpc3RpYSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdpc3RpYUlkID0gJ2xnLXdpc3RpYScgKyBpbmRleDtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXJQYXJhbXMgPSBwYXJhbSh0aGlzLnNldHRpbmdzLndpc3RpYVBsYXllclBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJQYXJhbXMgPSBwbGF5ZXJQYXJhbXMgPyAnPycgKyBwbGF5ZXJQYXJhbXMgOiAnJztcclxuICAgICAgICAgICAgICAgIHZpZGVvID0gXCI8aWZyYW1lIGFsbG93PVxcXCJhdXRvcGxheVxcXCIgaWQ9XFxcIlwiICsgd2lzdGlhSWQgKyBcIlxcXCIgc3JjPVxcXCIvL2Zhc3Qud2lzdGlhLm5ldC9lbWJlZC9pZnJhbWUvXCIgKyAodmlkZW9JbmZvLndpc3RpYVs0XSArIHBsYXllclBhcmFtcykgKyBcIlxcXCIgXCIgKyB2aWRlb1RpdGxlICsgXCIgY2xhc3M9XFxcIndpc3RpYV9lbWJlZCBsZy12aWRlby1vYmplY3QgbGctd2lzdGlhIFwiICsgYWRkQ2xhc3MgKyBcIlxcXCIgbmFtZT1cXFwid2lzdGlhX2VtYmVkXFxcIiBcIiArIGNvbW1vbklmcmFtZVByb3BzICsgXCI+PC9pZnJhbWU+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmlkZW9JbmZvLmh0bWw1KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaHRtbDVWaWRlb01hcmt1cCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBodG1sNVZpZGVvLnNvdXJjZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWw1VmlkZW9NYXJrdXAgKz0gXCI8c291cmNlIHNyYz1cXFwiXCIgKyBodG1sNVZpZGVvLnNvdXJjZVtpXS5zcmMgKyBcIlxcXCIgdHlwZT1cXFwiXCIgKyBodG1sNVZpZGVvLnNvdXJjZVtpXS50eXBlICsgXCJcXFwiPlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGh0bWw1VmlkZW8udHJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhY2tBdHRyaWJ1dGVzID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFjayA9IGh0bWw1VmlkZW8udHJhY2tzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0cmFjayB8fCB7fSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFja0F0dHJpYnV0ZXMgKz0ga2V5ICsgXCI9XFxcIlwiICsgdHJhY2tba2V5XSArIFwiXFxcIiBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw1VmlkZW9NYXJrdXAgKz0gXCI8dHJhY2sgXCIgKyB0cmFja0F0dHJpYnV0ZXMgKyBcIj5cIjtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaHRtbDVWaWRlby50cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2xvb3BfMShpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaHRtbDVWaWRlb0F0dHJzXzEgPSAnJztcclxuICAgICAgICAgICAgICAgIHZhciB2aWRlb0F0dHJpYnV0ZXNfMSA9IGh0bWw1VmlkZW8uYXR0cmlidXRlcyB8fCB7fTtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHZpZGVvQXR0cmlidXRlc18xIHx8IHt9KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBodG1sNVZpZGVvQXR0cnNfMSArPSBrZXkgKyBcIj1cXFwiXCIgKyB2aWRlb0F0dHJpYnV0ZXNfMVtrZXldICsgXCJcXFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB2aWRlbyA9IFwiPHZpZGVvIGNsYXNzPVxcXCJsZy12aWRlby1vYmplY3QgbGctaHRtbDUgXCIgKyAodGhpcy5zZXR0aW5ncy52aWRlb2pzID8gJ3ZpZGVvLWpzJyA6ICcnKSArIFwiXFxcIiBcIiArIGh0bWw1VmlkZW9BdHRyc18xICsgXCI+XFxuICAgICAgICAgICAgICAgIFwiICsgaHRtbDVWaWRlb01hcmt1cCArIFwiXFxuICAgICAgICAgICAgICAgIFlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IEhUTUw1IHZpZGVvLlxcbiAgICAgICAgICAgIDwvdmlkZW8+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZpZGVvO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgLSBBcHBlbmQgdmlkZW9zIHRvIHRoZSBzbGlkZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBzbGlkZSBlbGVtZW50XHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZGVvUGFyYW1zIC0gVmlkZW8gcGFyYW1ldGVycywgQ29udGFpbnMgc3JjLCBjbGFzcywgaW5kZXgsIGh0bWxWaWRlb1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5hcHBlbmRWaWRlb3MgPSBmdW5jdGlvbiAoZWwsIHZpZGVvUGFyYW1zKSB7XHJcbiAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgdmFyIHZpZGVvSHRtbCA9IHRoaXMuZ2V0VmlkZW9IdG1sKHZpZGVvUGFyYW1zLnNyYywgdmlkZW9QYXJhbXMuYWRkQ2xhc3MsIHZpZGVvUGFyYW1zLmluZGV4LCB2aWRlb1BhcmFtcy5odG1sNVZpZGVvKTtcclxuICAgICAgICAgICAgZWwuZmluZCgnLmxnLXZpZGVvLWNvbnQnKS5hcHBlbmQodmlkZW9IdG1sKTtcclxuICAgICAgICAgICAgdmFyICR2aWRlb0VsZW1lbnQgPSBlbC5maW5kKCcubGctdmlkZW8tb2JqZWN0JykuZmlyc3QoKTtcclxuICAgICAgICAgICAgaWYgKHZpZGVvUGFyYW1zLmh0bWw1VmlkZW8pIHtcclxuICAgICAgICAgICAgICAgICR2aWRlb0VsZW1lbnQub24oJ21vdXNlZG93bi5sZy52aWRlbycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnZpZGVvanMgJiYgKChfYSA9IHRoaXMuY29yZS5nYWxsZXJ5SXRlbXNbdmlkZW9QYXJhbXMuaW5kZXhdLl9fc2xpZGVWaWRlb0luZm8pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5odG1sNSkpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZpZGVvanMoJHZpZGVvRWxlbWVudC5nZXQoKSwgdGhpcy5zZXR0aW5ncy52aWRlb2pzT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2xpZ2h0R2FsbGVyeTotIE1ha2Ugc3VyZSB5b3UgaGF2ZSBpbmNsdWRlZCB2aWRlb2pzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5nb3RvTmV4dFNsaWRlT25WaWRlb0VuZCA9IGZ1bmN0aW9uIChzcmMsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciAkdmlkZW9FbGVtZW50ID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy12aWRlby1vYmplY3QnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb0luZm8gPSB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zW2luZGV4XS5fX3NsaWRlVmlkZW9JbmZvIHx8IHt9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5nb3RvTmV4dFNsaWRlT25WaWRlb0VuZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZGVvSW5mby5odG1sNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICR2aWRlb0VsZW1lbnQub24oJ2VuZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLmdvVG9OZXh0U2xpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvSW5mby52aW1lbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aW1lby9wbGF5ZXIuanMvI2VuZGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBWaW1lby5QbGF5ZXIoJHZpZGVvRWxlbWVudC5nZXQoKSkub24oJ2VuZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5nb1RvTmV4dFNsaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdsaWdodEdhbGxlcnk6LSBNYWtlIHN1cmUgeW91IGhhdmUgaW5jbHVkZWQgLy9naXRodWIuY29tL3ZpbWVvL3BsYXllci5qcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvSW5mby53aXN0aWEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX3dxID0gd2luZG93Ll93cSB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRvZG8gRXZlbnQgaXMgZ2V0dGlnbiB0cmlnZ2VyZWQgbXVsdGlwbGUgdGltZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll93cS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAkdmlkZW9FbGVtZW50LmF0dHIoJ2lkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblJlYWR5OiBmdW5jdGlvbiAodmlkZW8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlby5iaW5kKCdlbmQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUuZ29Ub05leHRTbGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2xpZ2h0R2FsbGVyeTotIE1ha2Ugc3VyZSB5b3UgaGF2ZSBpbmNsdWRlZCAvL2Zhc3Qud2lzdGlhLmNvbS9hc3NldHMvZXh0ZXJuYWwvRS12MS5qcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLmNvbnRyb2xWaWRlbyA9IGZ1bmN0aW9uIChpbmRleCwgYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciAkdmlkZW9FbGVtZW50ID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy12aWRlby1vYmplY3QnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb0luZm8gPSB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zW2luZGV4XS5fX3NsaWRlVmlkZW9JbmZvIHx8IHt9O1xyXG4gICAgICAgICAgICBpZiAoISR2aWRlb0VsZW1lbnQuZ2V0KCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh2aWRlb0luZm8ueW91dHViZSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAkdmlkZW9FbGVtZW50LmdldCgpLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoXCJ7XFxcImV2ZW50XFxcIjpcXFwiY29tbWFuZFxcXCIsXFxcImZ1bmNcXFwiOlxcXCJcIiArIGFjdGlvbiArIFwiVmlkZW9cXFwiLFxcXCJhcmdzXFxcIjpcXFwiXFxcIn1cIiwgJyonKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImxpZ2h0R2FsbGVyeTotIFwiICsgZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmlkZW9JbmZvLnZpbWVvKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWaW1lby5QbGF5ZXIoJHZpZGVvRWxlbWVudC5nZXQoKSlbYWN0aW9uXSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdsaWdodEdhbGxlcnk6LSBNYWtlIHN1cmUgeW91IGhhdmUgaW5jbHVkZWQgLy9naXRodWIuY29tL3ZpbWVvL3BsYXllci5qcycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvSW5mby5odG1sNSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudmlkZW9qcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvanMoJHZpZGVvRWxlbWVudC5nZXQoKSlbYWN0aW9uXSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdsaWdodEdhbGxlcnk6LSBNYWtlIHN1cmUgeW91IGhhdmUgaW5jbHVkZWQgdmlkZW9qcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICR2aWRlb0VsZW1lbnQuZ2V0KClbYWN0aW9uXSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvSW5mby53aXN0aWEpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Ll93cSA9IHdpbmRvdy5fd3EgfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRvZG8gRmluZCBhIHdheSB0byBkZXN0cm95IHdpc3RpYSBwbGF5ZXIgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX3dxLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJHZpZGVvRWxlbWVudC5hdHRyKCdpZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblJlYWR5OiBmdW5jdGlvbiAodmlkZW8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvW2FjdGlvbl0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignbGlnaHRHYWxsZXJ5Oi0gTWFrZSBzdXJlIHlvdSBoYXZlIGluY2x1ZGVkIC8vZmFzdC53aXN0aWEuY29tL2Fzc2V0cy9leHRlcm5hbC9FLXYxLmpzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5sb2FkVmlkZW9PblBvc3RlckNsaWNrID0gZnVuY3Rpb24gKCRlbCwgZm9yY2VQbGF5KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIHNsaWRlIGhhcyBwb3N0ZXJcclxuICAgICAgICAgICAgaWYgKCEkZWwuaGFzQ2xhc3MoJ2xnLXZpZGVvLWxvYWRlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhbHJlYWR5IHZpZGVvIGVsZW1lbnQgcHJlc2VudFxyXG4gICAgICAgICAgICAgICAgaWYgKCEkZWwuaGFzQ2xhc3MoJ2xnLWhhcy12aWRlbycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdsZy1oYXMtdmlkZW8nKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2h0bWwgPSB2b2lkIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9zcmMgPSB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zW3RoaXMuY29yZS5pbmRleF0uc3JjO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2aWRlbyA9IHRoaXMuY29yZS5nYWxsZXJ5SXRlbXNbdGhpcy5jb3JlLmluZGV4XS52aWRlbztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmlkZW8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2h0bWwgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHZpZGVvID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UodmlkZW8pIDogdmlkZW87XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2aWRlb0pzUGxheWVyXzEgPSB0aGlzLmFwcGVuZFZpZGVvcygkZWwsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBfc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDbGFzczogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmNvcmUuaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw1VmlkZW86IF9odG1sLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ290b05leHRTbGlkZU9uVmlkZW9FbmQoX3NyYywgdGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJHRlbXBJbWcgPSAkZWwuZmluZCgnLmxnLW9iamVjdCcpLmZpcnN0KCkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRvZG8gbWFrZSBzdXJlIGl0IGlzIHdvcmtpbmdcclxuICAgICAgICAgICAgICAgICAgICAkZWwuZmluZCgnLmxnLXZpZGVvLWNvbnQnKS5maXJzdCgpLmFwcGVuZCgkdGVtcEltZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdsZy12aWRlby1sb2FkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9Kc1BsYXllcl8xICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSnNQbGF5ZXJfMS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0pzUGxheWVyXzEub24oJ2xvYWRlZG1ldGFkYXRhJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uVmlkZW9Mb2FkQWZ0ZXJQb3N0ZXJDbGljaygkZWwsIF90aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRlbC5maW5kKCcubGctdmlkZW8tb2JqZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdsb2FkLmxnIGVycm9yLmxnIGxvYWRlZG1ldGFkYXRhLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uVmlkZW9Mb2FkQWZ0ZXJQb3N0ZXJDbGljaygkZWwsIF90aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlWaWRlbyh0aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZvcmNlUGxheSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5VmlkZW8odGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLm9uVmlkZW9Mb2FkQWZ0ZXJQb3N0ZXJDbGljayA9IGZ1bmN0aW9uICgkZWwsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRlbC5hZGRDbGFzcygnbGctdmlkZW8tbG9hZGVkJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheVZpZGVvKGluZGV4KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vZmYoJy5sZy52aWRlbycpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vZmYoJy52aWRlbycpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFZpZGVvO1xyXG4gICAgfSgpKTtcblxuICAgIHJldHVybiBWaWRlbztcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxnLXZpZGVvLnVtZC5qcy5tYXBcbiIsIi8qIVxuICogbGlnaHRnYWxsZXJ5IHwgMi40LjAtYmV0YS4wIHwgRGVjZW1iZXIgMTJ0aCAyMDIxXG4gKiBodHRwOi8vd3d3LmxpZ2h0Z2FsbGVyeWpzLmNvbS9cbiAqIENvcHlyaWdodCAoYykgMjAyMCBTYWNoaW4gTmVyYXZhdGg7XG4gKiBAbGljZW5zZSBHUEx2M1xuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLmxnUm90YXRlID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcbiAgICBQZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxuICAgIHB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcbiAgICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcbiAgICBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuICAgIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuICAgIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG4gICAgTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuICAgIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuICAgIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICAgIHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XG5cbiAgICAvKipcclxuICAgICAqIExpc3Qgb2YgbGlnaHRHYWxsZXJ5IGV2ZW50c1xyXG4gICAgICogQWxsIGV2ZW50cyBzaG91bGQgYmUgZG9jdW1lbnRlZCBoZXJlXHJcbiAgICAgKiBCZWxvdyBpbnRlcmZhY2VzIGFyZSB1c2VkIHRvIGJ1aWxkIHRoZSB3ZWJzaXRlIGRvY3VtZW50YXRpb25zXHJcbiAgICAgKiAqL1xyXG4gICAgdmFyIGxHRXZlbnRzID0ge1xyXG4gICAgICAgIGFmdGVyQXBwZW5kU2xpZGU6ICdsZ0FmdGVyQXBwZW5kU2xpZGUnLFxyXG4gICAgICAgIGluaXQ6ICdsZ0luaXQnLFxyXG4gICAgICAgIGhhc1ZpZGVvOiAnbGdIYXNWaWRlbycsXHJcbiAgICAgICAgY29udGFpbmVyUmVzaXplOiAnbGdDb250YWluZXJSZXNpemUnLFxyXG4gICAgICAgIHVwZGF0ZVNsaWRlczogJ2xnVXBkYXRlU2xpZGVzJyxcclxuICAgICAgICBhZnRlckFwcGVuZFN1Ykh0bWw6ICdsZ0FmdGVyQXBwZW5kU3ViSHRtbCcsXHJcbiAgICAgICAgYmVmb3JlT3BlbjogJ2xnQmVmb3JlT3BlbicsXHJcbiAgICAgICAgYWZ0ZXJPcGVuOiAnbGdBZnRlck9wZW4nLFxyXG4gICAgICAgIHNsaWRlSXRlbUxvYWQ6ICdsZ1NsaWRlSXRlbUxvYWQnLFxyXG4gICAgICAgIGJlZm9yZVNsaWRlOiAnbGdCZWZvcmVTbGlkZScsXHJcbiAgICAgICAgYWZ0ZXJTbGlkZTogJ2xnQWZ0ZXJTbGlkZScsXHJcbiAgICAgICAgcG9zdGVyQ2xpY2s6ICdsZ1Bvc3RlckNsaWNrJyxcclxuICAgICAgICBkcmFnU3RhcnQ6ICdsZ0RyYWdTdGFydCcsXHJcbiAgICAgICAgZHJhZ01vdmU6ICdsZ0RyYWdNb3ZlJyxcclxuICAgICAgICBkcmFnRW5kOiAnbGdEcmFnRW5kJyxcclxuICAgICAgICBiZWZvcmVOZXh0U2xpZGU6ICdsZ0JlZm9yZU5leHRTbGlkZScsXHJcbiAgICAgICAgYmVmb3JlUHJldlNsaWRlOiAnbGdCZWZvcmVQcmV2U2xpZGUnLFxyXG4gICAgICAgIGJlZm9yZUNsb3NlOiAnbGdCZWZvcmVDbG9zZScsXHJcbiAgICAgICAgYWZ0ZXJDbG9zZTogJ2xnQWZ0ZXJDbG9zZScsXHJcbiAgICAgICAgcm90YXRlTGVmdDogJ2xnUm90YXRlTGVmdCcsXHJcbiAgICAgICAgcm90YXRlUmlnaHQ6ICdsZ1JvdGF0ZVJpZ2h0JyxcclxuICAgICAgICBmbGlwSG9yaXpvbnRhbDogJ2xnRmxpcEhvcml6b250YWwnLFxyXG4gICAgICAgIGZsaXBWZXJ0aWNhbDogJ2xnRmxpcFZlcnRpY2FsJyxcclxuICAgICAgICBhdXRvcGxheTogJ2xnQXV0b3BsYXknLFxyXG4gICAgICAgIGF1dG9wbGF5U3RhcnQ6ICdsZ0F1dG9wbGF5U3RhcnQnLFxyXG4gICAgICAgIGF1dG9wbGF5U3RvcDogJ2xnQXV0b3BsYXlTdG9wJyxcclxuICAgIH07XG5cbiAgICB2YXIgcm90YXRlU2V0dGluZ3MgPSB7XHJcbiAgICAgICAgcm90YXRlOiB0cnVlLFxyXG4gICAgICAgIHJvdGF0ZVNwZWVkOiA0MDAsXHJcbiAgICAgICAgcm90YXRlTGVmdDogdHJ1ZSxcclxuICAgICAgICByb3RhdGVSaWdodDogdHJ1ZSxcclxuICAgICAgICBmbGlwSG9yaXpvbnRhbDogdHJ1ZSxcclxuICAgICAgICBmbGlwVmVydGljYWw6IHRydWUsXHJcbiAgICAgICAgcm90YXRlUGx1Z2luU3RyaW5nczoge1xyXG4gICAgICAgICAgICBmbGlwVmVydGljYWw6ICdGbGlwIHZlcnRpY2FsJyxcclxuICAgICAgICAgICAgZmxpcEhvcml6b250YWw6ICdGbGlwIGhvcml6b250YWwnLFxyXG4gICAgICAgICAgICByb3RhdGVMZWZ0OiAnUm90YXRlIGxlZnQnLFxyXG4gICAgICAgICAgICByb3RhdGVSaWdodDogJ1JvdGF0ZSByaWdodCcsXHJcbiAgICAgICAgfSxcclxuICAgIH07XG5cbiAgICB2YXIgUm90YXRlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIFJvdGF0ZShpbnN0YW5jZSwgJExHKSB7XHJcbiAgICAgICAgICAgIC8vIGdldCBsaWdodEdhbGxlcnkgY29yZSBwbHVnaW4gaW5zdGFuY2VcclxuICAgICAgICAgICAgdGhpcy5jb3JlID0gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMuJExHID0gJExHO1xyXG4gICAgICAgICAgICAvLyBleHRlbmQgbW9kdWxlIGRlZmF1bHQgc2V0dGluZ3Mgd2l0aCBsaWdodEdhbGxlcnkgY29yZSBzZXR0aW5nc1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHJvdGF0ZVNldHRpbmdzKSwgdGhpcy5jb3JlLnNldHRpbmdzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuYnVpbGRUZW1wbGF0ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByb3RhdGVJY29ucyA9ICcnO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5mbGlwVmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgIHJvdGF0ZUljb25zICs9IFwiPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGlkPVxcXCJsZy1mbGlwLXZlclxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnJvdGF0ZVBsdWdpblN0cmluZ3NbJ2ZsaXBWZXJ0aWNhbCddICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1mbGlwLXZlciBsZy1pY29uXFxcIj48L2J1dHRvbj5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5mbGlwSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICAgICAgcm90YXRlSWNvbnMgKz0gXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgaWQ9XFxcImxnLWZsaXAtaG9yXFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Mucm90YXRlUGx1Z2luU3RyaW5nc1snZmxpcEhvcml6b250YWwnXSArIFwiXFxcIiBjbGFzcz1cXFwibGctZmxpcC1ob3IgbGctaWNvblxcXCI+PC9idXR0b24+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mucm90YXRlTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgcm90YXRlSWNvbnMgKz0gXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgaWQ9XFxcImxnLXJvdGF0ZS1sZWZ0XFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Mucm90YXRlUGx1Z2luU3RyaW5nc1sncm90YXRlTGVmdCddICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1yb3RhdGUtbGVmdCBsZy1pY29uXFxcIj48L2J1dHRvbj5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5yb3RhdGVSaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcm90YXRlSWNvbnMgKz0gXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgaWQ9XFxcImxnLXJvdGF0ZS1yaWdodFxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnJvdGF0ZVBsdWdpblN0cmluZ3NbJ3JvdGF0ZVJpZ2h0J10gKyBcIlxcXCIgY2xhc3M9XFxcImxnLXJvdGF0ZS1yaWdodCBsZy1pY29uXFxcIj48L2J1dHRvbj5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvcmUuJHRvb2xiYXIuYXBwZW5kKHJvdGF0ZUljb25zKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLnJvdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRUZW1wbGF0ZXMoKTtcclxuICAgICAgICAgICAgLy8gU2F2ZSByb3RhdGUgY29uZmlnIGZvciBlYWNoIGl0ZW0gdG8gcGVyc2lzdCBpdHMgcm90YXRlLCBmbGlwIHZhbHVlc1xyXG4gICAgICAgICAgICAvLyBldmVuIGFmdGVyIG5hdmlnYXRpbmcgdG8gZGlmZXJlbnQgc2xpZGVzXHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlVmFsdWVzTGlzdCA9IHt9O1xyXG4gICAgICAgICAgICAvLyBldmVudCB0cmlnZ2VyZWQgYWZ0ZXIgYXBwZW5kaW5nIHNsaWRlIGNvbnRlbnRcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuYWZ0ZXJBcHBlbmRTbGlkZSArIFwiLnJvdGF0ZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGV2ZW50LmRldGFpbC5pbmRleDtcclxuICAgICAgICAgICAgICAgIHZhciBpbWFnZVdyYXAgPSBfdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbShpbmRleClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltZy13cmFwJylcclxuICAgICAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgICAgIGltYWdlV3JhcC53cmFwKCdsZy1pbWctcm90YXRlJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbShfdGhpcy5jb3JlLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1nLXJvdGF0ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIF90aGlzLnNldHRpbmdzLnJvdGF0ZVNwZWVkICsgJ21zJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgIC5maW5kKCcjbGctcm90YXRlLWxlZnQnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2subGcnLCB0aGlzLnJvdGF0ZUxlZnQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlclxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJyNsZy1yb3RhdGUtcmlnaHQnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2subGcnLCB0aGlzLnJvdGF0ZVJpZ2h0LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgIC5maW5kKCcjbGctZmxpcC1ob3InKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2subGcnLCB0aGlzLmZsaXBIb3Jpem9udGFsLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgIC5maW5kKCcjbGctZmxpcC12ZXInKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2subGcnLCB0aGlzLmZsaXBWZXJ0aWNhbC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgLy8gUmVzZXQgcm90YXRlIG9uIHNsaWRlIGNoYW5nZVxyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5iZWZvcmVTbGlkZSArIFwiLnJvdGF0ZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMucm90YXRlVmFsdWVzTGlzdFtldmVudC5kZXRhaWwuaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucm90YXRlVmFsdWVzTGlzdFtldmVudC5kZXRhaWwuaW5kZXhdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3RhdGU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsaXBIb3Jpem9udGFsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGlwVmVydGljYWw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLmFwcGx5U3R5bGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJGltYWdlID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1nLXJvdGF0ZScpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgJGltYWdlLmNzcygndHJhbnNmb3JtJywgJ3JvdGF0ZSgnICtcclxuICAgICAgICAgICAgICAgIHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdLnJvdGF0ZSArXHJcbiAgICAgICAgICAgICAgICAnZGVnKScgK1xyXG4gICAgICAgICAgICAgICAgJyBzY2FsZTNkKCcgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W3RoaXMuY29yZS5pbmRleF0uZmxpcEhvcml6b250YWwgK1xyXG4gICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XS5mbGlwVmVydGljYWwgK1xyXG4gICAgICAgICAgICAgICAgJywgMSknKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUucm90YXRlTGVmdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W3RoaXMuY29yZS5pbmRleF0ucm90YXRlIC09IDkwO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50cyhsR0V2ZW50cy5yb3RhdGVMZWZ0LCB7XHJcbiAgICAgICAgICAgICAgICByb3RhdGU6IHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdLnJvdGF0ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLnJvdGF0ZVJpZ2h0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XS5yb3RhdGUgKz0gOTA7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlTdHlsZXMoKTtcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnRzKGxHRXZlbnRzLnJvdGF0ZVJpZ2h0LCB7XHJcbiAgICAgICAgICAgICAgICByb3RhdGU6IHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdLnJvdGF0ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLmdldEN1cnJlbnRSb3RhdGlvbiA9IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICBpZiAoIWVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc3QgPSB0aGlzLiRMRyhlbCkuc3R5bGUoKTtcclxuICAgICAgICAgICAgdmFyIHRtID0gc3QuZ2V0UHJvcGVydHlWYWx1ZSgnLXdlYmtpdC10cmFuc2Zvcm0nKSB8fFxyXG4gICAgICAgICAgICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgnLW1vei10cmFuc2Zvcm0nKSB8fFxyXG4gICAgICAgICAgICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgnLW1zLXRyYW5zZm9ybScpIHx8XHJcbiAgICAgICAgICAgICAgICBzdC5nZXRQcm9wZXJ0eVZhbHVlKCctby10cmFuc2Zvcm0nKSB8fFxyXG4gICAgICAgICAgICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgndHJhbnNmb3JtJykgfHxcclxuICAgICAgICAgICAgICAgICdub25lJztcclxuICAgICAgICAgICAgaWYgKHRtICE9PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSB0bS5zcGxpdCgnKCcpWzFdLnNwbGl0KCcpJylbMF0uc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYW5nbGUgPSBNYXRoLnJvdW5kKE1hdGguYXRhbjIodmFsdWVzWzFdLCB2YWx1ZXNbMF0pICogKDE4MCAvIE1hdGguUEkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5nbGUgPCAwID8gYW5nbGUgKyAzNjAgOiBhbmdsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuZmxpcEhvcml6b250YWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByb3RhdGVFbCA9IHRoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltZy1yb3RhdGUnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRSb3RhdGlvbiA9IHRoaXMuZ2V0Q3VycmVudFJvdGF0aW9uKHJvdGF0ZUVsKTtcclxuICAgICAgICAgICAgdmFyIHJvdGF0ZUF4aXMgPSAnZmxpcEhvcml6b250YWwnO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFJvdGF0aW9uID09PSA5MCB8fCBjdXJyZW50Um90YXRpb24gPT09IDI3MCkge1xyXG4gICAgICAgICAgICAgICAgcm90YXRlQXhpcyA9ICdmbGlwVmVydGljYWwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdW3JvdGF0ZUF4aXNdICo9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50cyhsR0V2ZW50cy5mbGlwSG9yaXpvbnRhbCwge1xyXG4gICAgICAgICAgICAgICAgZmxpcEhvcml6b250YWw6IHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdW3JvdGF0ZUF4aXNdLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuZmxpcFZlcnRpY2FsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcm90YXRlRWwgPSB0aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0odGhpcy5jb3JlLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWctcm90YXRlJylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50Um90YXRpb24gPSB0aGlzLmdldEN1cnJlbnRSb3RhdGlvbihyb3RhdGVFbCk7XHJcbiAgICAgICAgICAgIHZhciByb3RhdGVBeGlzID0gJ2ZsaXBWZXJ0aWNhbCc7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Um90YXRpb24gPT09IDkwIHx8IGN1cnJlbnRSb3RhdGlvbiA9PT0gMjcwKSB7XHJcbiAgICAgICAgICAgICAgICByb3RhdGVBeGlzID0gJ2ZsaXBIb3Jpem9udGFsJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XVtyb3RhdGVBeGlzXSAqPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVN0eWxlcygpO1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudHMobEdFdmVudHMuZmxpcFZlcnRpY2FsLCB7XHJcbiAgICAgICAgICAgICAgICBmbGlwVmVydGljYWw6IHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdW3JvdGF0ZUF4aXNdLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUudHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uIChldmVudCwgZGV0YWlsKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuY29yZS5MR2VsLnRyaWdnZXIoZXZlbnQsIGRldGFpbCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMuc2V0dGluZ3Mucm90YXRlU3BlZWQgKyAxMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLmlzSW1hZ2VPcmllbnRhdGlvbkNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByb3RhdGVWYWx1ZSA9IHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdO1xyXG4gICAgICAgICAgICB2YXIgaXNSb3RhdGVkID0gTWF0aC5hYnMocm90YXRlVmFsdWUucm90YXRlKSAlIDM2MCAhPT0gMDtcclxuICAgICAgICAgICAgdmFyIGlmRmxpcHBlZEhvciA9IHJvdGF0ZVZhbHVlLmZsaXBIb3Jpem9udGFsIDwgMDtcclxuICAgICAgICAgICAgdmFyIGlmRmxpcHBlZFZlciA9IHJvdGF0ZVZhbHVlLmZsaXBWZXJ0aWNhbCA8IDA7XHJcbiAgICAgICAgICAgIHJldHVybiBpc1JvdGF0ZWQgfHwgaWZGbGlwcGVkSG9yIHx8IGlmRmxpcHBlZFZlcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuY2xvc2VHYWxsZXJ5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0ltYWdlT3JpZW50YXRpb25DaGFuZ2VkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5nZXRTbGlkZUl0ZW0odGhpcy5jb3JlLmluZGV4KS5jc3MoJ29wYWNpdHknLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlc0xpc3QgPSB7fTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gVW5iaW5kIGFsbCBldmVudHMgYWRkZWQgYnkgbGlnaHRHYWxsZXJ5IHJvdGF0ZSBwbHVnaW5cclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub2ZmKCcubGcucm90YXRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9mZignLnJvdGF0ZScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFJvdGF0ZTtcclxuICAgIH0oKSk7XG5cbiAgICByZXR1cm4gUm90YXRlO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGctcm90YXRlLnVtZC5qcy5tYXBcbiIsImZ1bmN0aW9uIHJhaXlzX2dldF9mb3JtX2RhdGEoZm9ybV9lbGUpIHtcbiAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoIGZvcm1fZWxlICk7XG4gICAgICAgICAgXG4gICAgdmFyIGZkID0gQXJyYXkuZnJvbShmb3JtRGF0YS5lbnRyaWVzKCkpLnJlZHVjZSgobWVtbywgcGFpcikgPT4gKHtcbiAgICAgICAgLi4ubWVtbyxcbiAgICAgICAgW3BhaXJbMF1dOiBwYWlyWzFdLFxuICAgIH0pLCB7fSk7XG5cbiAgICByZXR1cm4gZmQ7XG59XG5cbmZ1bmN0aW9uIHJhaXlzX3B1c2hfaGlzdG9yeSggZGF0YSA9IHt9KSB7XG4gICAgdmFyIHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICB2YXIgc3RycGF0aD0nJztcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICB2YXIgaXQgPSBkYXRhWyBwcm9wZXJ0eSBdO1xuXG4gICAgICAgIGlmIChpdCAhPSAnJyAmJiB0eXBlb2YgaXQgIT0gJ3VuZGVmaW5lZCcgJiYgcHJvcGVydHkgIT0gJ09uRmlyc3RMb2FkJyAmJiB0eXBlb2YgaXQgIT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQocHJvcGVydHksIGl0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZShkYXRhLCAnJywgJy9hbGwteWFjaHQtc2VhcmNoPycrc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCkpO1xufSIsInZhciByYWlfeXNwX2FwaT17fTtcblxuICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpPWZ1bmN0aW9uKG1ldGhvZCwgcGF0aCwgcGFzc2luZ19kYXRhKSB7XG4gICAgICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZURhdGEgPSBKU09OLnBhcnNlKCB0aGlzLnJlc3BvbnNlVGV4dCApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VEYXRhKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnR0VUJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFzc2luZ19kYXRhLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHBhc3NpbmdfZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQocHJvcGVydHksIHBhc3NpbmdfZGF0YVsgcHJvcGVydHkgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBfcXVlc3Rpb25NYXJrPXNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgcmFpX3lhY2h0X3N5bmMud3BfcmVzdF91cmwrXCJyYWl5cy9cIisgcGF0aCArICgoX3F1ZXN0aW9uTWFyayAhPSAnJyk/Jz8nK3NlYXJjaFBhcmFtcy50b1N0cmluZygpOicnKSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2VuZCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnUE9TVCc6XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAub3BlbihcIlBPU1RcIiwgcmFpX3lhY2h0X3N5bmMud3BfcmVzdF91cmwrXCJyYWl5cy9cIisgcGF0aCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KHBhc3NpbmdfZGF0YSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfTsiLCJ2YXIgeXNwX3RlbXBsYXRlcz17fTtcblx0eXNwX3RlbXBsYXRlcy55YWNodD17fTtcblx0XG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQuZ3JpZD1mdW5jdGlvbih2ZXNzZWwpIHtcblx0XHRsZXQgbWV0ZXJzID0gcGFyc2VJbnQodmVzc2VsLkxlbmd0aE92ZXJhbGwpICogMC4zMDQ4O1xuXHRcdGxldCBwcmljZSA9IHZlc3NlbC5QcmljZS5zbGljZSgwLCAtMyk7XG5cdFx0bGV0IGxlbmd0aCA9ICcnO1xuXHRcdGlmKHJhaV95YWNodF9zeW5jLmV1cm9wZV9vcHRpb25fcGlja2VkID09IFwieWVzXCIpe1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLkxlbmd0aE92ZXJhbGwgPyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblx0XHRcdHByaWNlID0gdmVzc2VsLlByaWNlID8gYOKCrCAke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdCgocGFyc2VJbnQodmVzc2VsLlByaWNlLnNsaWNlKDAsIC0zKSkgKiByYWlfeWFjaHRfc3luYy5ldXJvX2NfYykpfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZW5ndGggPSB2ZXNzZWwuTGVuZ3RoT3ZlcmFsbCA/IHZlc3NlbC5MZW5ndGhPdmVyYWxsICsgXCIgLyBcIiArIG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnO1xuXHRcdFx0cHJpY2UgPSB2ZXNzZWwuUHJpY2UgPyBgJCAke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdChwYXJzZUludCh2ZXNzZWwuUHJpY2Uuc2xpY2UoMCwgLTMpKSl9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSdcblx0XHR9XG5cblx0XHRyZXR1cm4gYFxuXHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXJlc3VsdC1ncmlkLWl0ZW1cIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2UtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGltZyBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2VcIiBzcmM9XCIke3Zlc3NlbC5JbWFnZXNbMF0gPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6ICcnfVwiIGFsdD1cInlhY2h0LWltYWdlXCIgbG9hZGluZz1cImxhenlcIiAvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWdlbmVyYWwtaW5mby1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtdGl0bGUtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8aDYgY2xhc3M9XCJ5YWNodC10aXRsZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnJ30gJHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJyd9ICR7dmVzc2VsLk1vZGVsID8gdmVzc2VsLk1vZGVsIDogJyd9ICR7dmVzc2VsLkJvYXROYW1lID8gdmVzc2VsLkJvYXROYW1lIDogJyd9PC9oNj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5mby1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmZvXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPlllYXI8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkNhYmluczwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5DYWJpbnNDb3VudE51bWVyaWMgPyB2ZXNzZWwuQ2FiaW5zQ291bnROdW1lcmljIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+QnVpbGRlcjwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5MZW5ndGg8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHtsZW5ndGh9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1wcmljZS1kZXRhaWxzLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXByaWNlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LXByaWNlXCI+JHtwcmljZX08L3A+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxhIGNsYXNzPVwieWFjaHQtZGV0YWlsc1wiIGhyZWY9XCIkeyB2ZXNzZWwuX2xpbmsgfVwiPlxuXHRcdFx0XHRcdFx0XHREZXRhaWxzXG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YDtcblx0fTtcblxuXHR5c3BfdGVtcGxhdGVzLnlhY2h0Lmxpc3Q9ZnVuY3Rpb24odmVzc2VsKSB7XG5cdFx0bGV0IG1ldGVycyA9IHBhcnNlSW50KHZlc3NlbC5MZW5ndGhPdmVyYWxsKSAqIDAuMzA0ODtcblx0XHRsZXQgcHJpY2UgPSB2ZXNzZWwuUHJpY2Uuc2xpY2UoMCwgLTMpO1xuXHRcdGxldCBsZW5ndGggPSAnJztcblx0XHRpZihyYWlfeWFjaHRfc3luYy5ldXJvcGVfb3B0aW9uX3BpY2tlZCA9PSBcInllc1wiKXtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5MZW5ndGhPdmVyYWxsID8gbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cdFx0XHRwcmljZSA9IHZlc3NlbC5QcmljZSA/IGDigqwgJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQoKHBhcnNlSW50KHZlc3NlbC5QcmljZS5zbGljZSgwLCAtMykpICogcmFpX3lhY2h0X3N5bmMuZXVyb19jX2MpKX1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLkxlbmd0aE92ZXJhbGwgPyB2ZXNzZWwuTGVuZ3RoT3ZlcmFsbCArIFwiIC8gXCIgKyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblx0XHRcdHByaWNlID0gdmVzc2VsLlByaWNlID8gYCQgJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQocGFyc2VJbnQodmVzc2VsLlByaWNlLnNsaWNlKDAsIC0zKSkpfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGBcblx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1yZXN1bHQtZ3JpZC1pdGVtIGxpc3Qtdmlld1wiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZVwiIHNyYz1cIiR7IHZlc3NlbC5JbWFnZXNbMF0gPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6ICcnIH1cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1nZW5lcmFsLWluZm8tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXRpdGxlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGg2IGNsYXNzPVwieWFjaHQtdGl0bGVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJyd9ICR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICcnfSAke3Zlc3NlbC5Nb2RlbCA/IHZlc3NlbC5Nb2RlbCA6ICcnfSAke3Zlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICcnfTwvaDY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZm8tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5ZZWFyPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5DYWJpbnM8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuQ2FiaW5zQ291bnROdW1lcmljID8gdmVzc2VsLkNhYmluc0NvdW50TnVtZXJpYyA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkJ1aWxkZXI8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+TGVuZ3RoPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7bGVuZ3RofTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcHJpY2UtZGV0YWlscy1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1wcmljZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1wcmljZVwiPiR7cHJpY2V9PC9wPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzcz1cInlhY2h0LWRldGFpbHNcIiBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdFx0RGV0YWlsc1xuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cdH07XG5cblx0eXNwX3RlbXBsYXRlcy5ub1Jlc3VsdHM9ZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGI+Tm8gUmVzdWx0czwvYj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgfTtcblxuIiwiXG5mdW5jdGlvbiB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoZGF0YSkge1xuXG4gICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5odG1sKCcnKTtcblxuICAgIC8vIEdFVCBBTkQgV1JJVEVcbiAgICByZXR1cm4gcmFpX3lzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIFwieWFjaHRzXCIsIGRhdGEpLnRoZW4oZnVuY3Rpb24oZGF0YV9yZXN1bHQpIHtcblxuICAgICAgICBqUXVlcnkoJyN0b3RhbC1yZXN1bHRzJykudGV4dChuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLUlOJywgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDMgfSkuZm9ybWF0KGRhdGFfcmVzdWx0LnRvdGFsKSk7XG5cbiAgICAgICAgaWYgKGRhdGFfcmVzdWx0LnRvdGFsID4gMCkge1xuXG4gICAgICAgICAgICBkYXRhX3Jlc3VsdC5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS52aWV3ICE9ICd1bmRlZmluZWQnICYmIGRhdGEudmlldyA9PSAnbGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQubGlzdChpdGVtLCBkYXRhKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQuZ3JpZChpdGVtLCBkYXRhKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyByYWl5c19wdXNoX2hpc3RvcnkoZGF0YSk7XG5cbiAgICAgICAgICAgIGpRdWVyeSgnI3lhY2h0cy1wYWdpbmF0aW9uJykucGFnaW5hdGlvbih7XG4gICAgICAgICAgICAgICAgaXRlbXM6IGRhdGFfcmVzdWx0LnRvdGFsLFxuICAgICAgICAgICAgICAgIGl0ZW1zT25QYWdlOiAxMixcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogZGF0YS5wYWdlX2luZGV4LFxuICAgICAgICAgICAgICAgIHByZXZUZXh0OiAnPCcsXG4gICAgICAgICAgICAgICAgbmV4dFRleHQ6ICc+JyxcbiAgICAgICAgICAgICAgICBocmVmVGV4dFByZWZpeDogJz9wYWdlX2luZGV4PScsXG4gICAgICAgICAgICAgICAgb25QYWdlQ2xpY2s6IGZ1bmN0aW9uKHBhZ2VOdW1iZXIsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybSBpbnB1dFtuYW1lPXBhZ2VfaW5kZXhdJykudmFsdWU9cGFnZU51bWJlcjtcblxuICAgICAgICAgICAgICAgICAgICAvKmpRdWVyeShbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IChqUXVlcnkoXCIuc2VhcmNoLWZvci1wYWdlXCIpLm9mZnNldCgpLnRvcClcbiAgICAgICAgICAgICAgICAgICAgfSwgMjUwKTsqL1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3JtRGF0YU9iamVjdCA9IHJhaXlzX2dldF9mb3JtX2RhdGEoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0nKSApO1xuXG4gICAgICAgICAgICAgICAgICAgIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlcihmb3JtRGF0YU9iamVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGpRdWVyeSgnI3lhY2h0cy1wYWdpbmF0aW9uJykuaHRtbCgnJyk7XG5cbiAgICAgICAgICAgIGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93JykuYXBwZW5kKHlzcF90ZW1wbGF0ZXMubm9SZXN1bHRzKCkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YV9yZXN1bHQ7XG5cbiAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcblxuICAgIH0pO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgeWFjaHRTZWFyY2hBbmRSZXN1bHRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0nKTtcblxuXG4gICAgaWYgKHlhY2h0U2VhcmNoQW5kUmVzdWx0cykge1xuICAgICAgICB5YWNodFNlYXJjaEFuZFJlc3VsdHMuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YShldmVudC50YXJnZXQpO1xuXG4gICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoIHBhcmFtcyApO1xuICAgICAgICB9KTsgXG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPXZpZXddW2Zvcm09eXNwLXlhY2h0LXNlYXJjaC1mb3JtXSwgc2VsZWN0W25hbWU9c29ydEJ5XVtmb3JtPXlzcC15YWNodC1zZWFyY2gtZm9ybV0nKS5mb3JFYWNoKChlZWVlKSA9PiB7XG4gICAgICAgICAgICBlZWVlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YSggZS50YXJnZXQuZm9ybSApO1xuXG4gICAgICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSBGaWVsZHNcbiAgICAgICAgbGV0IFVSTFJFRj1uZXcgVVJMKGxvY2F0aW9uLmhyZWYpOyAvLyBtYXliZSBmb3IgYSByZS1kb1xuXG4gICAgICAgIGxldCBmb3JtSW5wdXRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLXlhY2h0LXNlYXJjaC1mb3JtXCJdJyk7XG5cbiAgICAgICAgZm9ybUlucHV0cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IGVsZTtcblxuICAgICAgICAgICAgbGV0IG5hbWUgPSBlbGUuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgICAgIGxldCB1cmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbmFtZSApO1xuXG4gICAgICAgICAgICBpZiAodXJsVmFsICE9ICcnICYmIHVybFZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyAmJiBpbnB1dC52YWx1ZSA9PSB1cmxWYWwgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdXJsVmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRmlsbCBMaXN0IE9wdGlvbnNcbiAgICAgICAgbGV0IEZpbGxMaXN0cz1bXTtcbiAgICAgICAgbGV0IGxpc3RFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkYXRhbGlzdFtkYXRhLWZpbGwtbGlzdF1cIik7XG5cbiAgICAgICAgbGlzdEVsZW1lbnRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgRmlsbExpc3RzLnB1c2goZWxlLmdldEF0dHJpYnV0ZSgnZGF0YS1maWxsLWxpc3QnKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmFpX3lzcF9hcGkuY2FsbF9hcGkoJ1BPU1QnLCAnbGlzdC1vcHRpb25zJywge2xhYmVsczogRmlsbExpc3RzfSkudGhlbihmdW5jdGlvbihyT3B0aW9ucykge1xuICAgICAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIGxldCBTZWxlY3RvckVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkYXRhbGlzdFtkYXRhLWZpbGwtbGlzdD0nXCIrIGxhYmVsICtcIiddXCIpO1xuXG4gICAgICAgICAgICAgICAgck9wdGlvbnNbbGFiZWxdLmZvckVhY2goZnVuY3Rpb24oYikge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiO1xuXG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmFwcGVuZChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvLyBGaWxsIG9wdGlvbnNcbiAgICAgICAgbGV0IEZpbGxPcHRpb25zPVtdO1xuICAgICAgICBsZXQgc2VsZWN0b3JFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWxlY3RbZGF0YS1maWxsLW9wdGlvbnNdXCIpO1xuXG4gICAgICAgIHNlbGVjdG9yRWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICBGaWxsT3B0aW9ucy5wdXNoKGVsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1vcHRpb25zJykpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpKCdQT1NUJywgJ2Ryb3Bkb3duLW9wdGlvbnMnLCB7bGFiZWxzOiBGaWxsT3B0aW9uc30pLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGxhYmVsIGluIHJPcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zPSdcIisgbGFiZWwgK1wiJ11cIik7XG5cbiAgICAgICAgICAgICAgICByT3B0aW9uc1tsYWJlbF0uZm9yRWFjaChmdW5jdGlvbihiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJPUFRJT05cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG5cbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUuYWRkKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IFVSTFJFRiA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgICAgICAgbGV0IFVybFZhbCA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCBsYWJlbCApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChVcmxWYWwgIT0gJycgJiYgVXJsVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBVcmxWYWw7IFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gUmVuZGVyIFlhY2h0cyBGb3IgUGFnZSBMb2FkXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJykpO1xuXG4gICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoIHBhcmFtcyApOyAgICAgICBcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2luZ2xlLXlhY2h0LWRldGlscy1sZWFkJyk7XG5cblxuICAgIGZvcm1zLmZvckVhY2goKGZFbGUpID0+IHtcbiAgICAgICAgZkVsZS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGxldCBGb3JtRGF0YSA9IHJhaXlzX2dldF9mb3JtX2RhdGEoZS50YXJnZXQpO1xuXG4gICAgICAgICAgICBsZXQgc3VjY2Vzc01lc3NhZ2UgPSBmRWxlLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnN1Y2Nlc3MtbWVzc2FnZScpO1xuXG4gICAgICAgICAgICByYWlfeXNwX2FwaS5jYWxsX2FwaShcIlBPU1RcIiwgXCJ5YWNodC1sZWFkc1wiLCBGb3JtRGF0YSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhX3Jlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJylcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc01lc3NhZ2Uuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Zvcm0gc2hvdWxkIGJlIGhpZGRlbi4nKTtcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=
