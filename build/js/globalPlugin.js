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
  return "\n\t\t\t<div class=\"yacht-result-grid-item\">\n\t\t\t\t<div class=\"yacht-main-image-container\">\n\t\t\t\t\t<img class=\"yacht-main-image\" src=\"".concat(vessel.Images[0] ? vessel.Images[0].Uri : '', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"yacht-general-info-container\">\n\t\t\t\t\t<div class=\"yacht-title-container\">\n\t\t\t\t\t\t<h6 class=\"yacht-title\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', " ").concat(vessel.BoatName ? vessel.BoatName : '', "</h6>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-info-container\">\n\t\t\t\t\t\t<div class=\"yacht-info\">\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Year</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.ModelYear ? vessel.ModelYear : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Cabins</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.CabinsCountNumeric ? vessel.CabinsCountNumeric : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Builder</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.MakeString ? vessel.MakeString : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Length</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.LengthOverall ? vessel.LengthOverall + " / " + meters.toFixed(2) + ' m' : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-price-details-container\">\n\t\t\t\t\t\t<div class=\"yacht-price-container\">\n\t\t\t\t\t\t\t<p class=\"yacht-price\">").concat(vessel.Price ? '$' + vessel.Price.slice(0, -3) : 'Contact Us For Price', "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<a class=\"yacht-details\" href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t\tDetails\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
};
ysp_templates.yacht.list = function (vessel) {
  var meters = parseInt(vessel.LengthOverall) * 0.3048;
  return "\n\t\t\t<div class=\"yacht-result-grid-item list-view\">\n\t\t\t\t<div class=\"yacht-main-image-container\">\n\t\t\t\t\t<img class=\"yacht-main-image\" src=\"".concat(vessel.Images[0] ? vessel.Images[0].Uri : '', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"yacht-general-info-container\">\n\t\t\t\t\t<div class=\"yacht-title-container\">\n\t\t\t\t\t\t<h6 class=\"yacht-title\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', " ").concat(vessel.BoatName ? vessel.BoatName : '', "</h6>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-info-container\">\n\t\t\t\t\t\t<div class=\"yacht-info\">\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Year</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.ModelYear ? vessel.ModelYear : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Cabins</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.CabinsCountNumeric ? vessel.CabinsCountNumeric : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Builder</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.MakeString ? vessel.MakeString : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Length</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.LengthOverall ? vessel.LengthOverall + " / " + meters.toFixed(2) + ' m' : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-price-details-container\">\n\t\t\t\t\t\t<div class=\"yacht-price-container\">\n\t\t\t\t\t\t\t<p class=\"yacht-price\">").concat(vessel.Price ? '$' + vessel.Price.slice(0, -3) : 'Contact Us For Price', "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<a class=\"yacht-details\" href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t\tDetails\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS1wYWdpbmF0aW9uLmpzIiwibGlnaHRnYWxsZXJ5LnVtZC5qcyIsImxnLXRodW1ibmFpbC51bWQuanMiLCJsZy16b29tLnVtZC5qcyIsImxnLXZpZGVvLnVtZC5qcyIsImxnLXJvdGF0ZS51bWQuanMiLCJjb21tb24uanMiLCJhcGktY2xpZW50LmpzIiwidGVtcGxhdGVzLmpzIiwieWFjaHRTZWFyY2guanMiXSwibmFtZXMiOlsiJCIsIm1ldGhvZHMiLCJpbml0Iiwib3B0aW9ucyIsIm8iLCJleHRlbmQiLCJpdGVtcyIsIml0ZW1zT25QYWdlIiwicGFnZXMiLCJkaXNwbGF5ZWRQYWdlcyIsImVkZ2VzIiwiY3VycmVudFBhZ2UiLCJ1c2VBbmNob3JzIiwiaHJlZlRleHRQcmVmaXgiLCJocmVmVGV4dFN1ZmZpeCIsInByZXZUZXh0IiwibmV4dFRleHQiLCJlbGxpcHNlVGV4dCIsImVsbGlwc2VQYWdlU2V0IiwiY3NzU3R5bGUiLCJsaXN0U3R5bGUiLCJsYWJlbE1hcCIsInNlbGVjdE9uQ2xpY2siLCJuZXh0QXRGcm9udCIsImludmVydFBhZ2VPcmRlciIsInVzZVN0YXJ0RWRnZSIsInVzZUVuZEVkZ2UiLCJvblBhZ2VDbGljayIsInBhZ2VOdW1iZXIiLCJldmVudCIsIm9uSW5pdCIsInNlbGYiLCJNYXRoIiwiY2VpbCIsImhhbGZEaXNwbGF5ZWQiLCJlYWNoIiwiYWRkQ2xhc3MiLCJkYXRhIiwiX2RyYXciLCJjYWxsIiwic2VsZWN0UGFnZSIsInBhZ2UiLCJfc2VsZWN0UGFnZSIsInByZXZQYWdlIiwibmV4dFBhZ2UiLCJnZXRQYWdlc0NvdW50Iiwic2V0UGFnZXNDb3VudCIsImNvdW50IiwiZ2V0Q3VycmVudFBhZ2UiLCJkZXN0cm95IiwiZW1wdHkiLCJkcmF3UGFnZSIsInJlZHJhdyIsImRpc2FibGUiLCJkaXNhYmxlZCIsImVuYWJsZSIsInVwZGF0ZUl0ZW1zIiwibmV3SXRlbXMiLCJfZ2V0UGFnZXMiLCJ1cGRhdGVJdGVtc09uUGFnZSIsImdldEl0ZW1zT25QYWdlIiwiaW50ZXJ2YWwiLCJfZ2V0SW50ZXJ2YWwiLCJpIiwidGFnTmFtZSIsInByb3AiLCJhdHRyIiwiJHBhbmVsIiwiYXBwZW5kVG8iLCJfYXBwZW5kSXRlbSIsInRleHQiLCJjbGFzc2VzIiwic3RhcnQiLCJlbmQiLCJtaW4iLCJhcHBlbmQiLCJiZWdpbiIsIm1heCIsIl9lbGxpcHNlQ2xpY2siLCJwYWdlSW5kZXgiLCJvcHRzIiwiJGxpbmsiLCIkbGlua1dyYXBwZXIiLCIkdWwiLCJmaW5kIiwibGVuZ3RoIiwiY2xpY2siLCIkZWxsaXAiLCJwYXJlbnQiLCJyZW1vdmVDbGFzcyIsIiR0aGlzIiwidmFsIiwicGFyc2VJbnQiLCJwcmV2IiwiaHRtbCIsImZvY3VzIiwic3RvcFByb3BhZ2F0aW9uIiwia2V5dXAiLCJ3aGljaCIsImJpbmQiLCJmbiIsInBhZ2luYXRpb24iLCJtZXRob2QiLCJjaGFyQXQiLCJhcHBseSIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJhcmd1bWVudHMiLCJfdHlwZW9mIiwiZXJyb3IiLCJqUXVlcnkiLCJnbG9iYWwiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsImdsb2JhbFRoaXMiLCJsaWdodEdhbGxlcnkiLCJfX2Fzc2lnbiIsIk9iamVjdCIsImFzc2lnbiIsInQiLCJzIiwibiIsInAiLCJoYXNPd25Qcm9wZXJ0eSIsIl9fc3ByZWFkQXJyYXlzIiwiaWwiLCJyIiwiayIsImEiLCJqIiwiamwiLCJsR0V2ZW50cyIsImFmdGVyQXBwZW5kU2xpZGUiLCJoYXNWaWRlbyIsImNvbnRhaW5lclJlc2l6ZSIsInVwZGF0ZVNsaWRlcyIsImFmdGVyQXBwZW5kU3ViSHRtbCIsImJlZm9yZU9wZW4iLCJhZnRlck9wZW4iLCJzbGlkZUl0ZW1Mb2FkIiwiYmVmb3JlU2xpZGUiLCJhZnRlclNsaWRlIiwicG9zdGVyQ2xpY2siLCJkcmFnU3RhcnQiLCJkcmFnTW92ZSIsImRyYWdFbmQiLCJiZWZvcmVOZXh0U2xpZGUiLCJiZWZvcmVQcmV2U2xpZGUiLCJiZWZvcmVDbG9zZSIsImFmdGVyQ2xvc2UiLCJyb3RhdGVMZWZ0Iiwicm90YXRlUmlnaHQiLCJmbGlwSG9yaXpvbnRhbCIsImZsaXBWZXJ0aWNhbCIsImF1dG9wbGF5IiwiYXV0b3BsYXlTdGFydCIsImF1dG9wbGF5U3RvcCIsImxpZ2h0R2FsbGVyeUNvcmVTZXR0aW5ncyIsIm1vZGUiLCJlYXNpbmciLCJzcGVlZCIsImxpY2Vuc2VLZXkiLCJoZWlnaHQiLCJ3aWR0aCIsInN0YXJ0Q2xhc3MiLCJiYWNrZHJvcER1cmF0aW9uIiwiY29udGFpbmVyIiwic3RhcnRBbmltYXRpb25EdXJhdGlvbiIsInpvb21Gcm9tT3JpZ2luIiwiaGlkZUJhcnNEZWxheSIsInNob3dCYXJzQWZ0ZXIiLCJzbGlkZURlbGF5Iiwic3VwcG9ydExlZ2FjeUJyb3dzZXIiLCJhbGxvd01lZGlhT3ZlcmxhcCIsInZpZGVvTWF4U2l6ZSIsImxvYWRZb3VUdWJlUG9zdGVyIiwiZGVmYXVsdENhcHRpb25IZWlnaHQiLCJhcmlhTGFiZWxsZWRieSIsImFyaWFEZXNjcmliZWRieSIsImNsb3NhYmxlIiwic3dpcGVUb0Nsb3NlIiwiY2xvc2VPblRhcCIsInNob3dDbG9zZUljb24iLCJzaG93TWF4aW1pemVJY29uIiwibG9vcCIsImVzY0tleSIsImtleVByZXNzIiwiY29udHJvbHMiLCJzbGlkZUVuZEFuaW1hdGlvbiIsImhpZGVDb250cm9sT25FbmQiLCJtb3VzZXdoZWVsIiwiZ2V0Q2FwdGlvbkZyb21UaXRsZU9yQWx0IiwiYXBwZW5kU3ViSHRtbFRvIiwic3ViSHRtbFNlbGVjdG9yUmVsYXRpdmUiLCJwcmVsb2FkIiwibnVtYmVyT2ZTbGlkZUl0ZW1zSW5Eb20iLCJzZWxlY3RvciIsInNlbGVjdFdpdGhpbiIsIm5leHRIdG1sIiwicHJldkh0bWwiLCJpbmRleCIsImlmcmFtZVdpZHRoIiwiaWZyYW1lSGVpZ2h0IiwiaWZyYW1lTWF4V2lkdGgiLCJpZnJhbWVNYXhIZWlnaHQiLCJkb3dubG9hZCIsImNvdW50ZXIiLCJhcHBlbmRDb3VudGVyVG8iLCJzd2lwZVRocmVzaG9sZCIsImVuYWJsZVN3aXBlIiwiZW5hYmxlRHJhZyIsImR5bmFtaWMiLCJkeW5hbWljRWwiLCJleHRyYVByb3BzIiwiZXhUaHVtYkltYWdlIiwiaXNNb2JpbGUiLCJ1bmRlZmluZWQiLCJtb2JpbGVTZXR0aW5ncyIsInBsdWdpbnMiLCJzdHJpbmdzIiwiY2xvc2VHYWxsZXJ5IiwidG9nZ2xlTWF4aW1pemUiLCJwcmV2aW91c1NsaWRlIiwibmV4dFNsaWRlIiwicGxheVZpZGVvIiwiaW5pdExnUG9seWZpbGxzIiwid2luZG93IiwiQ3VzdG9tRXZlbnQiLCJwYXJhbXMiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsImRldGFpbCIsImV2dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJFbGVtZW50IiwibWF0Y2hlcyIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwibGdRdWVyeSIsImNzc1ZlbmRlclByZWZpeGVzIiwiX2dldFNlbGVjdG9yIiwiZmlyc3RFbGVtZW50IiwiX2dldEZpcnN0RWwiLCJnZW5lcmF0ZVVVSUQiLCJyZXBsYWNlIiwiYyIsInJhbmRvbSIsInYiLCJ0b1N0cmluZyIsImNvbnRleHQiLCJmbCIsInN1YnN0cmluZyIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiX2VhY2giLCJmdW5jIiwiZm9yRWFjaCIsIl9zZXRDc3NWZW5kb3JQcmVmaXgiLCJlbCIsImNzc1Byb3BlcnR5IiwidmFsdWUiLCJwcm9wZXJ0eSIsImdyb3VwMSIsInRvVXBwZXJDYXNlIiwiaW5kZXhPZiIsInN0eWxlIiwidG9Mb3dlckNhc2UiLCJpc0V2ZW50TWF0Y2hlZCIsImV2ZW50TmFtZSIsImV2ZW50TmFtZXNwYWNlIiwic3BsaXQiLCJmaWx0ZXIiLCJlIiwiZXZlcnkiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCIkTEciLCJmaXJzdCIsImVxIiwicGFyZW50RWxlbWVudCIsImdldCIsInJlbW92ZUF0dHIiLCJhdHRyaWJ1dGVzIiwiYXR0cnMiLCJyZW1vdmVBdHRyaWJ1dGUiLCJ3cmFwIiwiY2xhc3NOYW1lIiwid3JhcHBlciIsImNyZWF0ZUVsZW1lbnQiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwicmVtb3ZlQ2hpbGQiLCJhcHBlbmRDaGlsZCIsImNsYXNzTmFtZXMiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiaGFzQXR0cmlidXRlIiwiYXR0cmlidXRlIiwidG9nZ2xlQ2xhc3MiLCJjc3MiLCJfdGhpcyIsIm9uIiwiZXZlbnRzIiwibGlzdGVuZXIiLCJpc0FycmF5IiwiZXZlbnRMaXN0ZW5lcnMiLCJwdXNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uY2UiLCJvZmYiLCJrZXlzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInRyaWdnZXIiLCJjdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJsb2FkIiwidXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwiaW5uZXJIVE1MIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwicHJlcGVuZCIsInNjcm9sbFRvcCIsImJvZHkiLCJkb2N1bWVudEVsZW1lbnQiLCJwYWdlWU9mZnNldCIsInNjcm9sbExlZnQiLCJwYWdlWE9mZnNldCIsIm9mZnNldCIsImxlZnQiLCJ0b3AiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm9keU1hcmdpbkxlZnQiLCJtYXJnaW5MZWZ0IiwicGFyc2VGbG9hdCIsImN1cnJlbnRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJjbGllbnRXaWR0aCIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwiY2xpZW50SGVpZ2h0IiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJkZWZhdWx0RHluYW1pY09wdGlvbnMiLCJjb252ZXJ0VG9EYXRhIiwiZyIsInV0aWxzIiwiZ2V0U2l6ZSIsInNwYWNpbmciLCJkZWZhdWx0TGdTaXplIiwiTEdlbCIsImxnU2l6ZSIsImlzUmVzcG9uc2l2ZVNpemVzIiwid1dpZHRoIiwiaW5uZXJXaWR0aCIsInNpemVfMSIsInJlc3BvbnNpdmVXaWR0aCIsInNpemUiLCJjV2lkdGgiLCJjSGVpZ2h0IiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJyYXRpbyIsImdldFRyYW5zZm9ybSIsImJvdHRvbSIsImltYWdlU2l6ZSIsImNvbnRhaW5lclJlY3QiLCJ3SGVpZ2h0IiwiZWxXaWR0aCIsImVsSGVpZ2h0IiwiZWxTdHlsZSIsIngiLCJib3JkZXJMZWZ0IiwieSIsImJvcmRlclRvcCIsInNjWCIsInNjWSIsInRyYW5zZm9ybSIsImdldElmcmFtZU1hcmt1cCIsInNyYyIsImlmcmFtZVRpdGxlIiwidGl0bGUiLCJnZXRJbWdNYXJrdXAiLCJhbHRBdHRyIiwic3Jjc2V0Iiwic2l6ZXMiLCJzb3VyY2VzIiwic3Jjc2V0QXR0ciIsInNpemVzQXR0ciIsImltZ01hcmt1cCIsInNvdXJjZVRhZyIsInNvdXJjZU9iaiIsIkpTT04iLCJwYXJzZSIsIm1hcCIsInNvdXJjZSIsImtleSIsImdldFJlc3BvbnNpdmVTcmMiLCJzcmNJdG1zIiwicnNXaWR0aCIsInJzU3JjIiwiX3NyYyIsInNwbGljZSIsImlzSW1hZ2VMb2FkZWQiLCJpbWciLCJjb21wbGV0ZSIsIm5hdHVyYWxXaWR0aCIsImdldFZpZGVvUG9zdGVyTWFya3VwIiwiX3Bvc3RlciIsImR1bW15SW1nIiwidmlkZW9Db250U3R5bGUiLCJwbGF5VmlkZW9TdHJpbmciLCJfaXNWaWRlbyIsInZpZGVvQ2xhc3MiLCJ5b3V0dWJlIiwidmltZW8iLCJnZXREeW5hbWljT3B0aW9ucyIsImR5bmFtaWNFbGVtZW50cyIsImF2YWlsYWJsZUR5bmFtaWNPcHRpb25zIiwiaXRlbSIsInNwZWNpZmllZCIsImR5bmFtaWNBdHRyIiwibmFtZSIsImxhYmVsIiwiY3VycmVudEl0ZW0iLCJhbHQiLCJ0aHVtYiIsInN1Ykh0bWwiLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaXNWaWRlbyIsImlzSFRNTDVWSWRlbyIsImh0bWw1IiwiY29uc29sZSIsIm1hdGNoIiwid2lzdGlhIiwibGdJZCIsIkxpZ2h0R2FsbGVyeSIsImVsZW1lbnQiLCJsZ09wZW5lZCIsImxHYWxsZXJ5T24iLCJsZ0J1c3kiLCJjdXJyZW50SXRlbXNJbkRvbSIsInByZXZTY3JvbGxUb3AiLCJpc0R1bW15SW1hZ2VSZW1vdmVkIiwiZHJhZ09yU3dpcGVFbmFibGVkIiwibWVkaWFDb250YWluZXJQb3NpdGlvbiIsImdlbmVyYXRlU2V0dGluZ3MiLCJidWlsZE1vZHVsZXMiLCJzZXR0aW5ncyIsImdhbGxlcnlJdGVtcyIsImdldEl0ZW1zIiwibm9ybWFsaXplU2V0dGluZ3MiLCJ2YWxpZGF0ZUxpY2Vuc2UiLCJhZGRTbGlkZVZpZGVvSW5mbyIsImJ1aWxkU3RydWN0dXJlIiwiaW5zdGFuY2UiLCJzZXRUaW1lb3V0IiwidHJpZ2dlclBvc3RlckNsaWNrIiwiYXJyb3ciLCJvcGVuR2FsbGVyeU9uSXRlbUNsaWNrIiwiX2xvb3BfMSIsInRoaXNfMSIsIiRlbGVtZW50IiwidXVpZCIsInByZXZlbnREZWZhdWx0IiwiY3VycmVudEl0ZW1JbmRleCIsIm9wZW5HYWxsZXJ5IiwicGx1Z2luIiwid2FybiIsImdldFNsaWRlSXRlbSIsImdldFNsaWRlSXRlbUlkIiwiZ2V0SWROYW1lIiwiaWQiLCJnZXRFbGVtZW50QnlJZCIsIm1hbmFnZVNpbmdsZVNsaWRlQ2xhc3NOYW1lIiwib3V0ZXIiLCIkY29udGFpbmVyIiwic3ViSHRtbENvbnQiLCJhZGRDbGFzc2VzIiwiY29udGFpbmVyQ2xhc3NOYW1lIiwiY2xvc2VJY29uIiwibWF4aW1pemVJY29uIiwidGVtcGxhdGUiLCIkbGdDb21wb25lbnRzIiwiJGJhY2tkcm9wIiwiJGlubmVyIiwiJGNvbnRlbnQiLCIkdG9vbGJhciIsIm91dGVyQ2xhc3NOYW1lcyIsInJlZnJlc2hPblJlc2l6ZSIsImhpZGVCYXJzIiwibWFuYWdlQ2xvc2VHYWxsZXJ5IiwiaW5pdE1vZHVsZXMiLCJjdXJyZW50R2FsbGVyeUl0ZW0iLCJfX3NsaWRlVmlkZW9JbmZvIiwiZ2V0TWVkaWFDb250YWluZXJQb3NpdGlvbiIsIl9hIiwidG9wXzEiLCJjdXJyZW50SW1hZ2VTaXplIiwicmVzaXplVmlkZW9TbGlkZSIsImltZ1N0eWxlIiwiZ2V0RHVtbXlJbWdTdHlsZXMiLCJsZ1ZpZGVvU3R5bGUiLCJnZXRWaWRlb0NvbnRTdHlsZSIsImN1cnJlbnRTbGlkZSIsImN1cnJlbnRTcmMiLCJ1cGRhdGVDb250cm9scyIsIl9pbmRleCIsInNvbWUiLCJnYWxsZXJ5SXRlbSIsIml0ZW1JbmRleCIsIm9yZ2FuaXplU2xpZGVJdGVtcyIsImxvYWRDb250ZW50IiwidXBkYXRlQ3VycmVudENvdW50ZXIiLCJjaGlsZHJlbiIsIml0ZW1zVG9CZUluc2VydGVkVG9Eb20iLCJnZXRJdGVtc1RvQmVJbnNlcnRlZFRvRG9tIiwiYWRkSHRtbCIsInNldE1lZGlhQ29udGFpbmVyUG9zaXRpb24iLCJ0aW1lb3V0IiwiY3VycmVudFNsaWRlXzEiLCJzbGlkZSIsImNhcHRpb25IZWlnaHQiLCJ0aHVtYkNvbnRhaW5lciIsInRodW1iSGVpZ2h0IiwiY2xlYXJUaW1lb3V0IiwiaGlkZUJhclRpbWVvdXQiLCJpbml0UGljdHVyZUZpbGwiLCIkaW1nIiwicGljdHVyZWZpbGwiLCJlbGVtZW50cyIsImNvdW50ZXJIdG1sIiwic3ViSHRtbFVybCIsImZMIiwiZ2V0RHVtbXlJbWFnZUNvbnRlbnQiLCIkY3VycmVudFNsaWRlIiwiJGN1cnJlbnRJdGVtIiwiX2R1bW15SW1nU3JjIiwiZHVtbXlJbWdDb250ZW50Iiwic2V0SW1nTWFya3VwIiwiaW1nQ29udGVudCIsImlzRmlyc3RTbGlkZVdpdGhab29tQW5pbWF0aW9uIiwib25TbGlkZU9iamVjdExvYWQiLCIkc2xpZGUiLCJpc0hUTUw1VmlkZW9XaXRob3V0UG9zdGVyIiwib25Mb2FkIiwib25FcnJvciIsIm1lZGlhT2JqZWN0Iiwib25MZ09iamVjdExvYWQiLCJkZWxheSIsImlzRmlyc3RTbGlkZSIsInRyaWdnZXJTbGlkZUl0ZW1Mb2FkIiwiX3NwZWVkIiwiZ2V0U2xpZGVUeXBlIiwicG9zdGVyIiwidmlkZW8iLCJyZWMiLCJfaHRtbDVWaWRlbyIsInJlc3BvbnNpdmUiLCJzcmNEeUl0bXMiLCJ2aWRlb0luZm8iLCJpZnJhbWUiLCJ0b3BfMiIsInZpZGVvU2l6ZSIsIm1hcmt1cCIsImhhc1N0YXJ0QW5pbWF0aW9uIiwiaHRtbDVWaWRlbyIsImhhc1Bvc3RlciIsImxvYWRDb250ZW50T25GaXJzdFNsaWRlTG9hZCIsInByZXZJbmRleCIsIm51bWJlck9mSXRlbXMiLCJwb3NzaWJsZU51bWJlck9mSXRlbXMiLCJwcmV2SW5kZXhJdGVtIiwiX2VsZW1lbnQiLCJpZHgiLCJudW1iZXJPZkV4aXN0aW5nSXRlbXMiLCJnZXRQcmV2aW91c1NsaWRlSW5kZXgiLCJjdXJyZW50SXRlbUlkIiwic2V0RG93bmxvYWRWYWx1ZSIsImhpZGVEb3dubG9hZEJ0biIsImRvd25sb2FkVXJsIiwiJGRvd25sb2FkIiwibWFrZVNsaWRlQW5pbWF0aW9uIiwiZGlyZWN0aW9uIiwiY3VycmVudFNsaWRlSXRlbSIsInByZXZpb3VzU2xpZGVJdGVtIiwiZnJvbVRvdWNoIiwiZnJvbVRodW1iIiwibnVtYmVyT2ZHYWxsZXJ5SXRlbXMiLCJwcmV2aW91c1NsaWRlSXRlbV8xIiwidG9wXzMiLCJhcnJvd0Rpc2FibGUiLCJ0b3VjaFByZXYiLCJ0b3VjaE5leHQiLCJ1cGRhdGVDb3VudGVyVG90YWwiLCJ0b3VjaE1vdmUiLCJzdGFydENvb3JkcyIsImVuZENvb3JkcyIsImRpc3RhbmNlWCIsInBhZ2VYIiwiZGlzdGFuY2VZIiwicGFnZVkiLCJhbGxvd1N3aXBlIiwic3dpcGVEaXJlY3Rpb24iLCJhYnMiLCJzZXRUcmFuc2xhdGUiLCJvZmZzZXRXaWR0aCIsInNsaWRlV2lkdGhBbW91bnQiLCJndXR0ZXIiLCJvcGFjaXR5IiwiaW5uZXJIZWlnaHQiLCJzY2FsZSIsInRvdWNoRW5kIiwiZGlzdGFuY2UiLCJ0cmlnZ2VyQ2xpY2siLCJkaXN0YW5jZUFicyIsImdvVG9OZXh0U2xpZGUiLCJnb1RvUHJldlNsaWRlIiwidGFyZ2V0IiwiaXNQb3N0ZXJFbGVtZW50IiwiaXNNb3ZlZCIsImlzU3dpcGluZyIsIiRpdGVtIiwidGFyZ2V0VG91Y2hlcyIsInRvdWNoQWN0aW9uIiwibWFuYWdlU3dpcGVDbGFzcyIsImlzRHJhZ2luZyIsIl90b3VjaE5leHQiLCJfdG91Y2hQcmV2IiwiX2xvb3AiLCJrZXlDb2RlIiwiJHByZXYiLCIkbmV4dCIsIiRlbCIsInhWYWx1ZSIsInlWYWx1ZSIsInNjYWxlWCIsInNjYWxlWSIsImxhc3RDYWxsIiwiZGVsdGFZIiwibm93IiwiRGF0ZSIsImdldFRpbWUiLCJpc1NsaWRlRWxlbWVudCIsInBsYXlCdXR0b24iLCJpbnZhbGlkYXRlSXRlbXMiLCJtb3VzZWRvd24iLCJmb3JjZSIsInRvcF80IiwiX2IiLCJkZXN0cm95TW9kdWxlcyIsInJlbW92ZVRpbWVvdXQiLCJibHVyIiwiZXJyIiwicmVmcmVzaCIsImNsb3NlVGltZW91dCIsImxnVGh1bWJuYWlsIiwidGh1bWJuYWlsc1NldHRpbmdzIiwidGh1bWJuYWlsIiwiYW5pbWF0ZVRodW1iIiwiY3VycmVudFBhZ2VyUG9zaXRpb24iLCJhbGlnblRodW1ibmFpbHMiLCJ0aHVtYldpZHRoIiwidGh1bWJNYXJnaW4iLCJhcHBlbmRUaHVtYm5haWxzVG8iLCJ0b2dnbGVUaHVtYiIsImVuYWJsZVRodW1iRHJhZyIsImVuYWJsZVRodW1iU3dpcGUiLCJ0aHVtYm5haWxTd2lwZVRocmVzaG9sZCIsImxvYWRZb3VUdWJlVGh1bWJuYWlsIiwieW91VHViZVRodW1iU2l6ZSIsInRodW1ibmFpbFBsdWdpblN0cmluZ3MiLCJ0b2dnbGVUaHVtYm5haWxzIiwiVGh1bWJuYWlsIiwidGh1bWJPdXRlcldpZHRoIiwidGh1bWJUb3RhbFdpZHRoIiwidHJhbnNsYXRlWCIsInRodW1iQ2xpY2thYmxlIiwiY29yZSIsInNldEFuaW1hdGVUaHVtYlN0eWxlcyIsImJ1aWxkIiwidG9nZ2xlVGh1bWJCYXIiLCJ0aHVtYktleVByZXNzIiwic2V0VGh1bWJNYXJrdXAiLCJtYW5hZ2VBY3RpdmVDbGFzc09uU2xpZGVDaGFuZ2UiLCIkbGdUaHVtYiIsIiR0YXJnZXQiLCJyZWJ1aWxkVGh1bWJuYWlscyIsInRodW1iT3V0ZXJDbGFzc05hbWVzIiwiJHRodW1iT3V0ZXIiLCJzZXRUaHVtYkl0ZW1IdG1sIiwidGh1bWJEcmFnVXRpbHMiLCJjb3JkcyIsInN0YXJ0WCIsImVuZFgiLCJuZXdUcmFuc2xhdGVYIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsInRvdWNoTW92ZVRpbWUiLCJpc0RyYWdnaW5nIiwib25UaHVtYlRvdWNoTW92ZSIsIm9uVGh1bWJUb3VjaEVuZCIsImdldFBvc3NpYmxlVHJhbnNmb3JtWCIsInBvc2l0aW9uIiwidmFsdWVPZiIsInRvdWNoRHVyYXRpb24iLCJkaXN0YW5jZVhuZXciLCJzcGVlZFgiLCJnZXRUaHVtYkh0bWwiLCJzbGlkZVZpZGVvSW5mbyIsInRodW1iSW1nIiwiZ2V0VGh1bWJJdGVtSHRtbCIsInRodW1iTGlzdCIsIiR0aHVtYiIsImxnWm9vbSIsInpvb21TZXR0aW5ncyIsInpvb20iLCJhY3R1YWxTaXplIiwic2hvd1pvb21Jbk91dEljb25zIiwiYWN0dWFsU2l6ZUljb25zIiwiem9vbUluIiwiem9vbU91dCIsImVuYWJsZVpvb21BZnRlciIsInpvb21QbHVnaW5TdHJpbmdzIiwidmlld0FjdHVhbFNpemUiLCJab29tIiwiYnVpbGRUZW1wbGF0ZXMiLCJ6b29tSWNvbnMiLCJlbmFibGVab29tIiwiem9vbWFibGVUaW1lb3V0IiwiaXNJbWFnZVNsaWRlIiwic2V0Wm9vbUVzc2VudGlhbHMiLCJlbmFibGVab29tT25TbGlkZUl0ZW1Mb2FkIiwiZ2V0TW9kaWZpZXIiLCJyb3RhdGVWYWx1ZSIsImF4aXMiLCJvcmlnaW5hbFJvdGF0ZSIsInRyYW5zZm9ybVZhbHVlcyIsImdldEN1cnJlbnRUcmFuc2Zvcm0iLCJtb2RpZmllciIsImZsaXBIb3Jpem9udGFsVmFsdWUiLCJzaWduIiwiZmxpcFZlcnRpY2FsVmFsdWUiLCJzaW5YIiwic2luTWludXNYIiwiZ2V0SW1hZ2VTaXplIiwiJGltYWdlIiwiaW1hZ2VTaXplcyIsImdldERyYWdDb3JkcyIsImdldFN3aXBlQ29yZHMiLCJnZXREcmFnQWxsb3dlZEF4aXNlcyIsImFsbG93WSIsImltYWdlWVNpemUiLCJhbGxvd1giLCJpbWFnZVhTaXplIiwic3QiLCJ0bSIsImdldFByb3BlcnR5VmFsdWUiLCJnZXRDdXJyZW50Um90YXRpb24iLCJ2YWx1ZXMiLCJyb3VuZCIsImF0YW4yIiwiUEkiLCJyb3RhdGVFbCIsIm1vZGlmaWVyWCIsIm1vZGlmaWVyWSIsInpvb21JbWFnZSIsIm9mZnNldFgiLCJ0b3BCb3R0b21TcGFjaW5nIiwib2Zmc2V0WSIsIm9yaWdpbmFsWCIsIm9yaWdpbmFsWSIsInBvc2l0aW9uQ2hhbmdlZCIsImRyYWdBbGxvd2VkQXhpc2VzIiwicG9zc2libGVTd2lwZUNvcmRzIiwiZ2V0UG9zc2libGVTd2lwZURyYWdDb3JkcyIsIl94IiwiX3kiLCJpc0JleW9uZFBvc3NpYmxlTGVmdCIsIm1pblgiLCJpc0JleW9uZFBvc3NpYmxlUmlnaHQiLCJtYXhYIiwiaXNCZXlvbmRQb3NzaWJsZVRvcCIsIm1pblkiLCJpc0JleW9uZFBvc3NpYmxlQm90dG9tIiwibWF4WSIsInNldFpvb21TdHlsZXMiLCIkZHVtbXlJbWFnZSIsIiRpbWFnZVdyYXAiLCJzZXRBY3R1YWxTaXplIiwiZ2V0Q3VycmVudEltYWdlQWN0dWFsU2l6ZVNjYWxlIiwiZ2V0U2NhbGUiLCJzZXRQYWdlQ29yZHMiLCJiZWdpblpvb20iLCJnZXROYXR1cmFsV2lkdGgiLCJnZXRBY3R1YWxTaXplU2NhbGUiLCJfc2NhbGUiLCJnZXRQYWdlQ29yZHMiLCJwYWdlQ29yZHMiLCIkYWN0dWFsU2l6ZSIsInJlc2V0Wm9vbSIsImFjdHVhbFNpemVTY2FsZSIsInRhcHBlZCIsInpvb21EcmFnIiwicGluY2hab29tIiwiem9vbVN3aXBlIiwiZ2V0VG91Y2hEaXN0YW5jZSIsInNxcnQiLCJzdGFydERpc3QiLCJwaW5jaFN0YXJ0ZWQiLCJpbml0U2NhbGUiLCJlbmREaXN0IiwidG91Y2hlbmRab29tIiwiZGlzdGFuY2VZbmV3Iiwic3BlZWRZIiwiX0xHZWwiLCJzZXRab29tU3dpcGVTdHlsZXMiLCJnZXRab29tU3dpcGVDb3JkcyIsImRpZmZNaW5ZIiwiZGlmZk1heFkiLCJkaWZmTWluWCIsImRpZk1heFgiLCJkYXRhU2NhbGUiLCJlbERhdGFTY2FsZSIsImxnVmlkZW8iLCJ2aWRlb1NldHRpbmdzIiwiYXV0b3BsYXlGaXJzdFZpZGVvIiwieW91VHViZVBsYXllclBhcmFtcyIsInZpbWVvUGxheWVyUGFyYW1zIiwid2lzdGlhUGxheWVyUGFyYW1zIiwiZ290b05leHRTbGlkZU9uVmlkZW9FbmQiLCJhdXRvcGxheVZpZGVvT25TbGlkZSIsInZpZGVvanMiLCJ2aWRlb2pzT3B0aW9ucyIsInBhcmFtIiwib2JqIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsImdldFZpbWVvVVJMUGFyYW1zIiwiZGVmYXVsdFBhcmFtcyIsInVybFBhcmFtcyIsImRlZmF1bHRQbGF5ZXJQYXJhbXMiLCJWaWRlbyIsIm9uSGFzVmlkZW8iLCJsb2FkVmlkZW9PblBvc3RlckNsaWNrIiwib25TbGlkZUl0ZW1Mb2FkIiwib25CZWZvcmVTbGlkZSIsIm9uQWZ0ZXJTbGlkZSIsImxvYWRBbmRQbGF5VmlkZW8iLCJhcHBlbmRWaWRlb3MiLCJwYXVzZVZpZGVvIiwiY29udHJvbFZpZGVvIiwiZ2V0VmlkZW9IdG1sIiwidmlkZW9UaXRsZSIsImNvbW1vbklmcmFtZVByb3BzIiwidmlkZW9JZCIsInNsaWRlVXJsUGFyYW1zIiwicGxheWVyUGFyYW1zIiwid2lzdGlhSWQiLCJodG1sNVZpZGVvTWFya3VwIiwidHlwZSIsInRyYWNrcyIsInRyYWNrQXR0cmlidXRlcyIsInRyYWNrIiwiaHRtbDVWaWRlb0F0dHJzXzEiLCJ2aWRlb0F0dHJpYnV0ZXNfMSIsInZpZGVvUGFyYW1zIiwidmlkZW9IdG1sIiwiJHZpZGVvRWxlbWVudCIsIlZpbWVvIiwiUGxheWVyIiwiX3dxIiwib25SZWFkeSIsImFjdGlvbiIsImNvbnRlbnRXaW5kb3ciLCJwb3N0TWVzc2FnZSIsImZvcmNlUGxheSIsIl9odG1sIiwidmlkZW9Kc1BsYXllcl8xIiwiJHRlbXBJbWciLCJyZWFkeSIsIm9uVmlkZW9Mb2FkQWZ0ZXJQb3N0ZXJDbGljayIsImxnUm90YXRlIiwicm90YXRlU2V0dGluZ3MiLCJyb3RhdGUiLCJyb3RhdGVTcGVlZCIsInJvdGF0ZVBsdWdpblN0cmluZ3MiLCJSb3RhdGUiLCJyb3RhdGVJY29ucyIsInJvdGF0ZVZhbHVlc0xpc3QiLCJpbWFnZVdyYXAiLCJhcHBseVN0eWxlcyIsInRyaWdnZXJFdmVudHMiLCJhbmdsZSIsImN1cnJlbnRSb3RhdGlvbiIsInJvdGF0ZUF4aXMiLCJpc0ltYWdlT3JpZW50YXRpb25DaGFuZ2VkIiwiaXNSb3RhdGVkIiwiaWZGbGlwcGVkSG9yIiwiaWZGbGlwcGVkVmVyIiwicmFpeXNfZ2V0X2Zvcm1fZGF0YSIsImZvcm1fZWxlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImZkIiwiZnJvbSIsImVudHJpZXMiLCJyZWR1Y2UiLCJtZW1vIiwicGFpciIsIl9vYmplY3RTcHJlYWQiLCJfZGVmaW5lUHJvcGVydHkiLCJyYWl5c19wdXNoX2hpc3RvcnkiLCJzZWFyY2hQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJzdHJwYXRoIiwiaXQiLCJzZXQiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmFpX3lzcF9hcGkiLCJjYWxsX2FwaSIsInBhdGgiLCJwYXNzaW5nX2RhdGEiLCJ4aHR0cCIsIlhNTEh0dHBSZXF1ZXN0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VEYXRhIiwicmVzcG9uc2VUZXh0IiwiX3F1ZXN0aW9uTWFyayIsIm9wZW4iLCJyYWlfeWFjaHRfc3luYyIsIndwX3Jlc3RfdXJsIiwic2VuZCIsInNldFJlcXVlc3RIZWFkZXIiLCJzdHJpbmdpZnkiLCJ5c3BfdGVtcGxhdGVzIiwieWFjaHQiLCJncmlkIiwidmVzc2VsIiwibWV0ZXJzIiwiTGVuZ3RoT3ZlcmFsbCIsImNvbmNhdCIsIkltYWdlcyIsIlVyaSIsIk1vZGVsWWVhciIsIk1ha2VTdHJpbmciLCJNb2RlbCIsIkJvYXROYW1lIiwiQ2FiaW5zQ291bnROdW1lcmljIiwidG9GaXhlZCIsIlByaWNlIiwiX2xpbmsiLCJsaXN0Iiwibm9SZXN1bHRzIiwieXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyIiwiZGF0YV9yZXN1bHQiLCJJbnRsIiwiTnVtYmVyRm9ybWF0IiwibWF4aW11bVNpZ25pZmljYW50RGlnaXRzIiwiZm9ybWF0IiwidG90YWwiLCJyZXN1bHRzIiwidmlldyIsInBhZ2VfaW5kZXgiLCJmb3JtRGF0YU9iamVjdCIsImxvZyIsInlhY2h0U2VhcmNoQW5kUmVzdWx0cyIsImVlZWUiLCJmb3JtIiwiVVJMUkVGIiwiVVJMIiwibG9jYXRpb24iLCJocmVmIiwiZm9ybUlucHV0cyIsImVsZSIsImlucHV0IiwidXJsVmFsIiwiY2hlY2tlZCIsIkZpbGxMaXN0cyIsImxpc3RFbGVtZW50cyIsImxhYmVscyIsInJPcHRpb25zIiwiX2xvb3AyIiwiU2VsZWN0b3JFbGUiLCJiIiwib3B0aW9uIiwiRmlsbE9wdGlvbnMiLCJzZWxlY3RvckVsZW1lbnRzIiwiX2xvb3AzIiwiVXJsVmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFBLFVBQUFBLENBQUEsRUFBQTtFQUVBLElBQUFDLE9BQUEsR0FBQTtJQUNBQyxJQUFBLEVBQUEsU0FBQUEsS0FBQUMsT0FBQSxFQUFBO01BQ0EsSUFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLE1BQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxXQUFBLEVBQUEsQ0FBQTtRQUNBQyxLQUFBLEVB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QUFBNEMsSUFBQSxDQUFBMUYsQ0FBQSxDQUFBYSxXQUFBLENBQUE7WUFDQSxPQUFBLEtBQUE7VUFDQSxDQUFBLENBQUE7UUFDQTtRQUNBLE9BQUEsS0FBQTtNQUNBLENBQUEsQ0FBQTtJQUNBO0VBRUEsQ0FBQTtFQUVBakIsQ0FBQSxDQUFBb0csRUFBQSxDQUFBQyxVQUFBLEdBQUEsVUFBQUMsTUFBQSxFQUFBO0lBRUE7SUFDQSxJQUFBckcsT0FBQSxDQUFBcUcsTUFBQSxDQUFBLElBQUFBLE1BQUEsQ0FBQUMsTUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsRUFBQTtNQUNBLE9BQUF0RyxPQUFBLENBQUFxRyxNQUFBLENBQUEsQ0FBQUUsS0FBQSxDQUFBLElBQUEsRUFBQUMsS0FBQSxDQUFBQyxTQUFBLENBQUFDLEtBQUEsQ0FBQXBFLElBQUEsQ0FBQXFFLFNBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQTtJQUNBLENBQUEsTUFBQSxJQUFBQyxPQUFBLENBQUFQLE1BQUEsTUFBQSxRQUFBLElBQUEsQ0FBQUEsTUFBQSxFQUFBO01BQ0EsT0FBQXJHLE9BQUEsQ0FBQUMsSUFBQSxDQUFBc0csS0FBQSxDQUFBLElBQUEsRUFBQUksU0FBQSxDQUFBO0lBQ0EsQ0FBQSxNQUFBO01BQ0E1RyxDQUFBLENBQUE4RyxLQUFBLENBQUEsU0FBQSxHQUFBUixNQUFBLEdBQUEsc0NBQUEsQ0FBQTtJQUNBO0VBRUEsQ0FBQTtBQUVBLENBQUEsRUFBQVMsTUFBQSxDQUFBO0FDN1lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFBQyxNQUFBLEVBQUFDLE9BQUEsRUFBQTtFQUNBLFFBQUFDLE9BQUEsaUNBQUFMLE9BQUEsQ0FBQUssT0FBQSxPQUFBLFFBQUEsSUFBQSxPQUFBQyxNQUFBLEtBQUEsV0FBQSxHQUFBQSxNQUFBLENBQUFELE9BQUEsR0FBQUQsT0FBQSxDQUFBLENBQUEsR0FDQSxPQUFBRyxNQUFBLEtBQUEsVUFBQSxJQUFBQSxNQUFBLENBQUFDLEdBQUEsR0FBQUQsTUFBQSxDQUFBSCxPQUFB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QSxjQUFBO0lBQ0FDLFdBQUEsRUFBQSxlQUFBO0lBQ0FDLGNBQUEsRUFBQSxrQkFBQTtJQUNBQyxZQUFBLEVBQUEsZ0JBQUE7SUFDQUMsUUFBQSxFQUFBLFlBQUE7SUFDQUMsYUFBQSxFQUFBLGlCQUFBO0lBQ0FDLFlBQUEsRUFBQTtFQUNBLENBQUE7RUFFQSxJQUFBQyx3QkFBQSxHQUFBO0lBQ0FDLElBQUEsRUFBQSxVQUFBO0lBQ0FDLE1BQUEsRUFBQSxNQUFBO0lBQ0FDLEtBQUEsRUFBQSxHQUFBO0lBQ0FDLFVBQUEsRUFBQSxvQkFBQTtJQUNBQyxNQUFBLEVBQUEsTUFBQTtJQUNBQyxLQUFBLEVBQUEsTUFBQTtJQUNBbkksUUFBQSxFQUFBLEVBQUE7SUFDQW9JLFVBQUEsRUFBQSxlQUFBO0lBQ0FDLGdCQUFBLEVBQUEsR0FBQTtJQUNBQyxTQUFBLEVBQUEsRUFBQTtJQUNBQyxzQkFBQSxFQUFBLEdBQUE7SUFDQUMsY0FBQSxFQUFBLElBQUE7SUFDQUMsYUFBQSxFQUFBLENBQUE7SUFDQUMsYUFBQSxFQUFBLEtBQUE7SUFDQUMsVUFBQSxFQUFBLENBQUE7SUFDQUMsb0JBQUEsRUFBQSxJQUFBO0lBQ0FDLGlCQUFBLEVBQUEsS0FBQTtJQUNBQyxZQUFBLEVBQUEsVUFBQTtJQUNBQyxpQkFBQSxFQUFBLElBQUE7SUFDQUMsb0JBQUEsRUFBQSxDQUFBO0lBQ0FDLGNBQUEsRUFBQSxFQUFBO0lBQ0FDLGVBQUEsRUFBQSxFQUFBO0lBQ0FDLFFBQUEsRUFBQSxJQUFBO0lBQ0FDLFlBQUEsRUFBQSxJQUFBO0lBQ0FDLFVBQUEsRUFBQSxJQUFBO0lBQ0FDLGFBQUEsRUFBQSxJQUFBO0lBQ0FDLGdCQUFBLEVBQUEsS0FBQTtJQUNBQyxJQUFBLEVBQUEsSUFBQTtJQUNBQyxNQUFBLEVBQUEsSUFBQTtJQUNBQyxRQUFBLEVBQUEsSUFBQTtJQUNBQyxRQUFBLEVBQUEsSUFBQTtJQUNBQyxpQkFBQSxFQUFBLElBQUE7SUFDQUMsZ0JBQUEsRUFBQSxLQUFBO0lBQ0FDLFVBQUEsRUFBQSxLQUFBO0lBQ0FDLHdCQUFBLEVBQUEsSUFBQTtJQUNBQyxlQUFBLEVBQUEsY0FBQTtJQUNBQyx1QkFBQSxFQUFBLEtBQUE7SUFDQUMsT0FBQSxFQUFBLENBQUE7SUFDQUMsdUJBQUEsRUFBQSxFQUFBO0lBQ0FDLFFBQUEsRUFBQSxFQUFBO0lBQ0FDLFlBQUEsRUFBQSxFQUFBO0lBQ0FDLFFBQUEsRUFBQSxFQUFBO0lBQ0FDLFFBQUEsRUFBQSxFQUFBO0lBQ0FDLEtBQUEsRUFBQSxDQUFBO0lBQ0FDLFdBQUEsRUFBQSxNQUFBO0lBQ0FDLFlBQUEsRUFBQSxNQUFBO0lBQ0FDLGNBQUEsRUFBQSxNQUFBO0lBQ0FDLGVBQUEsRUFBQSxNQUFBO0lBQ0FDLFFBQUEsRUFBQSxJQUFBO0lBQ0FDLE9BQUEsRUFBQSxJQUFBO0lBQ0FDLGVBQUEsRUFBQSxhQUFBO0lBQ0FDLGNBQUEsRUFBQSxFQUFBO0lBQ0FDLFdBQUEsRUFBQSxJQUFBO0lBQ0FDLFVBQUEsRUFBQSxJQUFBO0lBQ0FDLE9BQUEsRUFBQSxLQUFBO0lBQ0FDLFNBQUEsRUFBQSxFQUFBO0lBQ0FDLFVBQUEsRUFBQSxFQUFBO0lBQ0FDLFlBQUEsRUFBQSxFQUFBO0lBQ0FDLFFBQUEsRUFBQUMsU0FBQTtJQUNBQyxjQUFBLEVBQUE7TUFDQTlCLFFBQUEsRUFBQSxLQUFBO01BQ0FMLGFBQUEsRUFBQSxLQUFBO01BQ0F1QixRQUFBLEVBQUE7SUFDQSxDQUFBO0lBQ0FhLE9BQUEsRUFBQSxFQUFBO0lBQ0FDLE9BQUEsRUFBQTtNQUNBQyxZQUFBLEVBQUEsZUFBQTtNQUNBQyxjQUFBLEVBQUEsaUJBQUE7TUFDQUMsYUFBQSxFQUFBLGdCQUFBO01BQ0FDLFNBQUEsRUFBQSxZQUFBO01BQ0FsQixRQUFBLEVBQUEsVUFBQTtNQUNBbUIsU0FBQSxFQUFBO0lBQ0E7RUFDQSxDQUFBO0VBRUEsU0FBQUMsZUFBQUEsQ0FBQSxFQUFBO0lBQ0EsQ0FBQSxZQUFBO01BQ0EsSUFBQSxPQUFBQyxNQUFBLENBQUFDLFdBQUEsS0FBQSxVQUFBLEVBQ0EsT0FBQSxLQUFBO01BQ0EsU0FBQUEsV0FBQUEsQ0FB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O1VBRUFELFdBQUEsQ0FBQXB1QixPQUFBLENBQUEsVUFBQTJ0QixHQUFBLEVBQUE7WUFDQUEsR0FBQSxDQUFBcHJCLEdBQUEsQ0FBQStyQixNQUFBLENBQUE7VUFDQSxDQUFBLENBQUE7UUFDQSxDQUFBLENBQUE7UUFFQSxJQUFBaEIsTUFBQSxHQUFBLElBQUFDLEdBQUEsQ0FBQUMsUUFBQSxDQUFBQyxJQUFBLENBQUE7UUFDQSxJQUFBaUIsTUFBQSxHQUFBcEIsTUFBQSxDQUFBOUQsWUFBQSxDQUFBaG9CLEdBQUEsQ0FBQW9KLEtBQUEsQ0FBQTtRQUVBLElBQUE4akIsTUFBQSxJQUFBLEVBQUEsSUFBQUEsTUFBQSxJQUFBLElBQUEsRUFBQTtVQUNBTixXQUFBLENBQUFwdUIsT0FBQSxDQUFBLFVBQUEydEIsR0FBQSxFQUFBO1lBQ0FBLEdBQUEsQ0FBQXZ0QixLQUFBLEdBQUFzdUIsTUFBQTtVQUNBLENBQUEsQ0FBQTtRQUNBO01BQ0EsQ0FBQTtNQXhCQSxLQUFBLElBQUE5akIsS0FBQSxJQUFBc2pCLFFBQUE7UUFBQU8sTUFBQTtNQUFBO0lBeUJBLENBQUEsQ0FBQSxDQUFBeHFCLElBQUEsQ0FBQSxZQUFBO01BQ0E7TUFDQSxJQUFBL0YsTUFBQSxHQUFBeXFCLG1CQUFBLENBQUFwcUIsUUFBQSxDQUFBcUIsYUFBQSxDQUFBLHdCQUFBLENBQUEsQ0FBQTtNQUVBMnNCLDJCQUFBLENBQUFydUIsTUFBQSxDQUFBO0lBQ0EsQ0FBQSxDQUFBO0VBRUE7QUFFQSxDQUFBLENBQUEiLCJmaWxlIjoiZ2xvYmFsUGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIC8qKlxuKiBzaW1wbGVQYWdpbmF0aW9uLmpzIHYxLjZcbiogQSBzaW1wbGUgalF1ZXJ5IHBhZ2luYXRpb24gcGx1Z2luLlxuKiBodHRwOi8vZmxhdml1c21hdGlzLmdpdGh1Yi5jb20vc2ltcGxlUGFnaW5hdGlvbi5qcy9cbipcbiogQ29weXJpZ2h0IDIwMTIsIEZsYXZpdXMgTWF0aXNcbiogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuKiBodHRwOi8vZmxhdml1c21hdGlzLmdpdGh1Yi5jb20vbGljZW5zZS5odG1sXG4qL1xuXG4oZnVuY3Rpb24oJCl7XG5cblx0dmFyIG1ldGhvZHMgPSB7XG5cdFx0aW5pdDogZnVuY3Rpb24ob3B0aW9ucykge1xuXHRcdFx0dmFyIG8gPSAkLmV4dGVuZCh7XG5cdFx0XHRcdGl0ZW1zOiAxLFxuXHRcdFx0XHRpdGVtc09uUGFnZTogMSxcblx0XHRcdFx0cGFnZXM6IDAsXG5cdFx0XHRcdGRpc3BsYXllZFBhZ2VzOiA1LFxuXHRcdFx0XHRlZGdlczogMixcblx0XHRcdFx0Y3VycmVudFBhZ2U6IDAsXG5cdFx0XHRcdHVzZUFuY2hvcnM6IHRydWUsXG5cdFx0XHRcdGhyZWZUZXh0UHJlZml4OiAnI3BhZ2UtJyxcblx0XHRcdFx0aHJlZlRleHRTdWZmaXg6ICcnLFxuXHRcdFx0XHRwcmV2VGV4dDogJ1ByZXYnLFxuXHRcdFx0XHRuZXh0VGV4dDogJ05leHQnLFxuXHRcdFx0XHRlbGxpcHNlVGV4dDogJyZoZWxsaXA7Jyxcblx0XHRcdFx0ZWxsaXBzZVBhZ2VTZXQ6IHRydWUsXG5cdFx0XHRcdGNzc1N0eWxlOiAnbGlnaHQtdGhlbWUnLFxuXHRcdFx0XHRsaXN0U3R5bGU6ICcnLFxuXHRcdFx0XHRsYWJlbE1hcDogW10sXG5cdFx0XHRcdHNlbGVjdE9uQ2xpY2s6IHRydWUsXG5cdFx0XHRcdG5leHRBdEZyb250OiBmYWxzZSxcblx0XHRcdFx0aW52ZXJ0UGFnZU9yZGVyOiBmYWxzZSxcblx0XHRcdFx0dXNlU3RhcnRFZGdlIDogdHJ1ZSxcblx0XHRcdFx0dXNlRW5kRWRnZSA6IHRydWUsXG5cdFx0XHRcdG9uUGFnZUNsaWNrOiBmdW5jdGlvbihwYWdlTnVtYmVyLCBldmVudCkge1xuXHRcdFx0XHRcdC8vIENhbGxiYWNrIHRyaWdnZXJlZCB3aGVuIGEgcGFnZSBpcyBjbGlja2VkXG5cdFx0XHRcdFx0Ly8gUGFnZSBudW1iZXIgaXMgZ2l2ZW4gYXMgYW4gb3B0aW9uYWwgcGFyYW1ldGVyXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9uSW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Ly8gQ2FsbGJhY2sgdHJpZ2dlcmVkIGltbWVkaWF0ZWx5IGFmdGVyIGluaXRpYWxpemF0aW9uXG5cdFx0XHRcdH1cblx0XHRcdH0sIG9wdGlvbnMgfHwge30pO1xuXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRcdG8ucGFnZXMgPSBvLnBhZ2VzID8gby5wYWdlcyA6IE1hdGguY2VpbChvLml0ZW1zIC8gby5pdGVtc09uUGFnZSkgPyBNYXRoLmNlaWwoby5pdGVtcyAvIG8uaXRlbXNPblBhZ2UpIDogMTtcblx0XHRcdGlmIChvLmN1cnJlbnRQYWdlKVxuXHRcdFx0XHRvLmN1cnJlbnRQYWdlID0gby5jdXJyZW50UGFnZSAtIDE7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdG8uY3VycmVudFBhZ2UgPSAhby5pbnZlcnRQYWdlT3JkZXIgPyAwIDogby5wYWdlcyAtIDE7XG5cdFx0XHRvLmhhbGZEaXNwbGF5ZWQgPSBvLmRpc3BsYXllZFBhZ2VzIC8gMjtcblxuXHRcdFx0dGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLmFkZENsYXNzKG8uY3NzU3R5bGUgKyAnIHNpbXBsZS1wYWdpbmF0aW9uJykuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwoc2VsZik7XG5cdFx0XHR9KTtcblxuXHRcdFx0by5vbkluaXQoKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHNlbGVjdFBhZ2U6IGZ1bmN0aW9uKHBhZ2UpIHtcblx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBwYWdlIC0gMSk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0cHJldlBhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPiAwKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgLSAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPCBvLnBhZ2VzIC0gMSkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlICsgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRuZXh0UGFnZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA8IG8ucGFnZXMgLSAxKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgKyAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPiAwKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgLSAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGdldFBhZ2VzQ291bnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLnBhZ2VzO1xuXHRcdH0sXG5cblx0XHRzZXRQYWdlc0NvdW50OiBmdW5jdGlvbihjb3VudCkge1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJykucGFnZXMgPSBjb3VudDtcblx0XHR9LFxuXG5cdFx0Z2V0Q3VycmVudFBhZ2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5jdXJyZW50UGFnZSArIDE7XG5cdFx0fSxcblxuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLmVtcHR5KCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0ZHJhd1BhZ2U6IGZ1bmN0aW9uIChwYWdlKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5jdXJyZW50UGFnZSA9IHBhZ2UgLSAxO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0cmVkcmF3OiBmdW5jdGlvbigpe1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGRpc2FibGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRlbmFibGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0dXBkYXRlSXRlbXM6IGZ1bmN0aW9uIChuZXdJdGVtcykge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uaXRlbXMgPSBuZXdJdGVtcztcblx0XHRcdG8ucGFnZXMgPSBtZXRob2RzLl9nZXRQYWdlcyhvKTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdH0sXG5cblx0XHR1cGRhdGVJdGVtc09uUGFnZTogZnVuY3Rpb24gKGl0ZW1zT25QYWdlKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5pdGVtc09uUGFnZSA9IGl0ZW1zT25QYWdlO1xuXHRcdFx0by5wYWdlcyA9IG1ldGhvZHMuX2dldFBhZ2VzKG8pO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgMCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Z2V0SXRlbXNPblBhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLml0ZW1zT25QYWdlO1xuXHRcdH0sXG5cblx0XHRfZHJhdzogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXJcdG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKSxcblx0XHRcdFx0aW50ZXJ2YWwgPSBtZXRob2RzLl9nZXRJbnRlcnZhbChvKSxcblx0XHRcdFx0aSxcblx0XHRcdFx0dGFnTmFtZTtcblxuXHRcdFx0bWV0aG9kcy5kZXN0cm95LmNhbGwodGhpcyk7XG5cblx0XHRcdHRhZ05hbWUgPSAodHlwZW9mIHRoaXMucHJvcCA9PT0gJ2Z1bmN0aW9uJykgPyB0aGlzLnByb3AoJ3RhZ05hbWUnKSA6IHRoaXMuYXR0cigndGFnTmFtZScpO1xuXG5cdFx0XHR2YXIgJHBhbmVsID0gdGFnTmFtZSA9PT0gJ1VMJyA/IHRoaXMgOiAkKCc8dWwnICsgKG8ubGlzdFN0eWxlID8gJyBjbGFzcz1cIicgKyBvLmxpc3RTdHlsZSArICdcIicgOiAnJykgKyAnPjwvdWw+JykuYXBwZW5kVG8odGhpcyk7XG5cblx0XHRcdC8vIEdlbmVyYXRlIFByZXYgbGlua1xuXHRcdFx0aWYgKG8ucHJldlRleHQpIHtcblx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsICFvLmludmVydFBhZ2VPcmRlciA/IG8uY3VycmVudFBhZ2UgLSAxIDogby5jdXJyZW50UGFnZSArIDEsIHt0ZXh0OiBvLnByZXZUZXh0LCBjbGFzc2VzOiAncHJldid9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgTmV4dCBsaW5rIChpZiBvcHRpb24gc2V0IGZvciBhdCBmcm9udClcblx0XHRcdGlmIChvLm5leHRUZXh0ICYmIG8ubmV4dEF0RnJvbnQpIHtcblx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsICFvLmludmVydFBhZ2VPcmRlciA/IG8uY3VycmVudFBhZ2UgKyAxIDogby5jdXJyZW50UGFnZSAtIDEsIHt0ZXh0OiBvLm5leHRUZXh0LCBjbGFzc2VzOiAnbmV4dCd9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgc3RhcnQgZWRnZXNcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKGludGVydmFsLnN0YXJ0ID4gMCAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmKG8udXNlU3RhcnRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgZW5kID0gTWF0aC5taW4oby5lZGdlcywgaW50ZXJ2YWwuc3RhcnQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGVuZDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG8uZWRnZXMgPCBpbnRlcnZhbC5zdGFydCAmJiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBvLmVkZ2VzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5lbmQgPCBvLnBhZ2VzICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYoby51c2VTdGFydEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBiZWdpbiA9IE1hdGgubWF4KG8ucGFnZXMgLSBvLmVkZ2VzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gby5wYWdlcyAtIDE7IGkgPj0gYmVnaW47IGktLSkge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKG8ucGFnZXMgLSBvLmVkZ2VzID4gaW50ZXJ2YWwuZW5kICYmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBpbnRlcnZhbCBsaW5rc1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRmb3IgKGkgPSBpbnRlcnZhbC5zdGFydDsgaSA8IGludGVydmFsLmVuZDsgaSsrKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKGkgPSBpbnRlcnZhbC5lbmQgLSAxOyBpID49IGludGVydmFsLnN0YXJ0OyBpLS0pIHtcblx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgZW5kIGVkZ2VzXG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5lbmQgPCBvLnBhZ2VzICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYgKG8ucGFnZXMgLSBvLmVkZ2VzID4gaW50ZXJ2YWwuZW5kICYmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihvLnVzZUVuZEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBiZWdpbiA9IE1hdGgubWF4KG8ucGFnZXMgLSBvLmVkZ2VzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gYmVnaW47IGkgPCBvLnBhZ2VzOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGludGVydmFsLnN0YXJ0ID4gMCAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmIChvLmVkZ2VzIDwgaW50ZXJ2YWwuc3RhcnQgJiYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgby5lZGdlcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoby51c2VFbmRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgZW5kID0gTWF0aC5taW4oby5lZGdlcywgaW50ZXJ2YWwuc3RhcnQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gZW5kIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBOZXh0IGxpbmsgKHVubGVzcyBvcHRpb24gaXMgc2V0IGZvciBhdCBmcm9udClcblx0XHRcdGlmIChvLm5leHRUZXh0ICYmICFvLm5leHRBdEZyb250KSB7XG5cdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCAhby5pbnZlcnRQYWdlT3JkZXIgPyBvLmN1cnJlbnRQYWdlICsgMSA6IG8uY3VycmVudFBhZ2UgLSAxLCB7dGV4dDogby5uZXh0VGV4dCwgY2xhc3NlczogJ25leHQnfSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvLmVsbGlwc2VQYWdlU2V0ICYmICFvLmRpc2FibGVkKSB7XG5cdFx0XHRcdG1ldGhvZHMuX2VsbGlwc2VDbGljay5jYWxsKHRoaXMsICRwYW5lbCk7XG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0X2dldFBhZ2VzOiBmdW5jdGlvbihvKSB7XG5cdFx0XHR2YXIgcGFnZXMgPSBNYXRoLmNlaWwoby5pdGVtcyAvIG8uaXRlbXNPblBhZ2UpO1xuXHRcdFx0cmV0dXJuIHBhZ2VzIHx8IDE7XG5cdFx0fSxcblxuXHRcdF9nZXRJbnRlcnZhbDogZnVuY3Rpb24obykge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c3RhcnQ6IE1hdGguY2VpbChvLmN1cnJlbnRQYWdlID4gby5oYWxmRGlzcGxheWVkID8gTWF0aC5tYXgoTWF0aC5taW4oby5jdXJyZW50UGFnZSAtIG8uaGFsZkRpc3BsYXllZCwgKG8ucGFnZXMgLSBvLmRpc3BsYXllZFBhZ2VzKSksIDApIDogMCksXG5cdFx0XHRcdGVuZDogTWF0aC5jZWlsKG8uY3VycmVudFBhZ2UgPiBvLmhhbGZEaXNwbGF5ZWQgPyBNYXRoLm1pbihvLmN1cnJlbnRQYWdlICsgby5oYWxmRGlzcGxheWVkLCBvLnBhZ2VzKSA6IE1hdGgubWluKG8uZGlzcGxheWVkUGFnZXMsIG8ucGFnZXMpKVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0X2FwcGVuZEl0ZW06IGZ1bmN0aW9uKHBhZ2VJbmRleCwgb3B0cykge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLCBvcHRpb25zLCAkbGluaywgbyA9IHNlbGYuZGF0YSgncGFnaW5hdGlvbicpLCAkbGlua1dyYXBwZXIgPSAkKCc8bGk+PC9saT4nKSwgJHVsID0gc2VsZi5maW5kKCd1bCcpO1xuXG5cdFx0XHRwYWdlSW5kZXggPSBwYWdlSW5kZXggPCAwID8gMCA6IChwYWdlSW5kZXggPCBvLnBhZ2VzID8gcGFnZUluZGV4IDogby5wYWdlcyAtIDEpO1xuXG5cdFx0XHRvcHRpb25zID0ge1xuXHRcdFx0XHR0ZXh0OiBwYWdlSW5kZXggKyAxLFxuXHRcdFx0XHRjbGFzc2VzOiAnJ1xuXHRcdFx0fTtcblxuXHRcdFx0aWYgKG8ubGFiZWxNYXAubGVuZ3RoICYmIG8ubGFiZWxNYXBbcGFnZUluZGV4XSkge1xuXHRcdFx0XHRvcHRpb25zLnRleHQgPSBvLmxhYmVsTWFwW3BhZ2VJbmRleF07XG5cdFx0XHR9XG5cblx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZChvcHRpb25zLCBvcHRzIHx8IHt9KTtcblxuXHRcdFx0aWYgKHBhZ2VJbmRleCA9PSBvLmN1cnJlbnRQYWdlIHx8IG8uZGlzYWJsZWQpIHtcblx0XHRcdFx0aWYgKG8uZGlzYWJsZWQgfHwgb3B0aW9ucy5jbGFzc2VzID09PSAncHJldicgfHwgb3B0aW9ucy5jbGFzc2VzID09PSAnbmV4dCcpIHtcblx0XHRcdFx0XHQkbGlua1dyYXBwZXIuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JGxpbmtXcmFwcGVyLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkbGluayA9ICQoJzxzcGFuIGNsYXNzPVwiY3VycmVudFwiPicgKyAob3B0aW9ucy50ZXh0KSArICc8L3NwYW4+Jyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoby51c2VBbmNob3JzKSB7XG5cdFx0XHRcdFx0JGxpbmsgPSAkKCc8YSBocmVmPVwiJyArIG8uaHJlZlRleHRQcmVmaXggKyAocGFnZUluZGV4ICsgMSkgKyBvLmhyZWZUZXh0U3VmZml4ICsgJ1wiIGNsYXNzPVwicGFnZS1saW5rXCI+JyArIChvcHRpb25zLnRleHQpICsgJzwvYT4nKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkbGluayA9ICQoJzxzcGFuID4nICsgKG9wdGlvbnMudGV4dCkgKyAnPC9zcGFuPicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCRsaW5rLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRcdFx0XHRyZXR1cm4gbWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHNlbGYsIHBhZ2VJbmRleCwgZXZlbnQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdGlvbnMuY2xhc3Nlcykge1xuXHRcdFx0XHQkbGluay5hZGRDbGFzcyhvcHRpb25zLmNsYXNzZXMpO1xuXHRcdFx0fVxuXG5cdFx0XHQkbGlua1dyYXBwZXIuYXBwZW5kKCRsaW5rKTtcblxuXHRcdFx0aWYgKCR1bC5sZW5ndGgpIHtcblx0XHRcdFx0JHVsLmFwcGVuZCgkbGlua1dyYXBwZXIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2VsZi5hcHBlbmQoJGxpbmtXcmFwcGVyKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3NlbGVjdFBhZ2U6IGZ1bmN0aW9uKHBhZ2VJbmRleCwgZXZlbnQpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmN1cnJlbnRQYWdlID0gcGFnZUluZGV4O1xuXHRcdFx0aWYgKG8uc2VsZWN0T25DbGljaykge1xuXHRcdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gby5vblBhZ2VDbGljayhwYWdlSW5kZXggKyAxLCBldmVudCk7XG5cdFx0fSxcblxuXG5cdFx0X2VsbGlwc2VDbGljazogZnVuY3Rpb24oJHBhbmVsKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKSxcblx0XHRcdFx0JGVsbGlwID0gJHBhbmVsLmZpbmQoJy5lbGxpcHNlJyk7XG5cdFx0XHQkZWxsaXAuYWRkQ2xhc3MoJ2NsaWNrYWJsZScpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0JGVsbGlwLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGlmICghby5kaXNhYmxlKSB7XG5cdFx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcblx0XHRcdFx0XHRcdHZhbCA9IChwYXJzZUludCgkdGhpcy5wYXJlbnQoKS5wcmV2KCkudGV4dCgpLCAxMCkgfHwgMCkgKyAxO1xuXHRcdFx0XHRcdCR0aGlzXG5cdFx0XHRcdFx0XHQuaHRtbCgnPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIxXCIgbWF4PVwiJyArIG8ucGFnZXMgKyAnXCIgc3RlcD1cIjFcIiB2YWx1ZT1cIicgKyB2YWwgKyAnXCI+Jylcblx0XHRcdFx0XHRcdC5maW5kKCdpbnB1dCcpXG5cdFx0XHRcdFx0XHQuZm9jdXMoKVxuXHRcdFx0XHRcdFx0LmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdC8vIHByZXZlbnQgaW5wdXQgbnVtYmVyIGFycm93cyBmcm9tIGJ1YmJsaW5nIGEgY2xpY2sgZXZlbnQgb24gJGVsbGlwXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5rZXl1cChmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50LndoaWNoID09PSAxMyAmJiB2YWwgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gZW50ZXIgdG8gYWNjZXB0XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCh2YWw+MCkmJih2YWw8PW8ucGFnZXMpKVxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbChzZWxmLCB2YWwgLSAxKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChldmVudC53aGljaCA9PT0gMjcpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBlc2NhcGUgdG8gY2FuY2VsXG5cdFx0XHRcdFx0XHRcdFx0JGVsbGlwLmVtcHR5KCkuaHRtbChvLmVsbGlwc2VUZXh0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5iaW5kKCdibHVyJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cdFx0XHRcdFx0XHRcdGlmICh2YWwgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHNlbGYsIHZhbCAtIDEpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCRlbGxpcC5lbXB0eSgpLmh0bWwoby5lbGxpcHNlVGV4dCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9O1xuXG5cdCQuZm4ucGFnaW5hdGlvbiA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuXG5cdFx0Ly8gTWV0aG9kIGNhbGxpbmcgbG9naWNcblx0XHRpZiAobWV0aG9kc1ttZXRob2RdICYmIG1ldGhvZC5jaGFyQXQoMCkgIT0gJ18nKSB7XG5cdFx0XHRyZXR1cm4gbWV0aG9kc1ttZXRob2RdLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ29iamVjdCcgfHwgIW1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIG1ldGhvZHMuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkLmVycm9yKCdNZXRob2QgJyArICBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5wYWdpbmF0aW9uJyk7XG5cdFx0fVxuXG5cdH07XG5cbn0pKGpRdWVyeSk7IiwiLyohXG4gKiBsaWdodGdhbGxlcnkgfCAyLjQuMC1iZXRhLjAgfCBEZWNlbWJlciAxMnRoIDIwMjFcbiAqIGh0dHA6Ly93d3cubGlnaHRnYWxsZXJ5anMuY29tL1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFNhY2hpbiBOZXJhdmF0aDtcbiAqIEBsaWNlbnNlIEdQTHYzXG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwubGlnaHRHYWxsZXJ5ID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcbiAgICBQZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxuICAgIHB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcbiAgICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcbiAgICBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuICAgIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuICAgIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG4gICAgTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuICAgIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuICAgIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICAgIHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICAgICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgICAgIHJldHVybiByO1xyXG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBMaXN0IG9mIGxpZ2h0R2FsbGVyeSBldmVudHNcclxuICAgICAqIEFsbCBldmVudHMgc2hvdWxkIGJlIGRvY3VtZW50ZWQgaGVyZVxyXG4gICAgICogQmVsb3cgaW50ZXJmYWNlcyBhcmUgdXNlZCB0byBidWlsZCB0aGUgd2Vic2l0ZSBkb2N1bWVudGF0aW9uc1xyXG4gICAgICogKi9cclxuICAgIHZhciBsR0V2ZW50cyA9IHtcclxuICAgICAgICBhZnRlckFwcGVuZFNsaWRlOiAnbGdBZnRlckFwcGVuZFNsaWRlJyxcclxuICAgICAgICBpbml0OiAnbGdJbml0JyxcclxuICAgICAgICBoYXNWaWRlbzogJ2xnSGFzVmlkZW8nLFxyXG4gICAgICAgIGNvbnRhaW5lclJlc2l6ZTogJ2xnQ29udGFpbmVyUmVzaXplJyxcclxuICAgICAgICB1cGRhdGVTbGlkZXM6ICdsZ1VwZGF0ZVNsaWRlcycsXHJcbiAgICAgICAgYWZ0ZXJBcHBlbmRTdWJIdG1sOiAnbGdBZnRlckFwcGVuZFN1Ykh0bWwnLFxyXG4gICAgICAgIGJlZm9yZU9wZW46ICdsZ0JlZm9yZU9wZW4nLFxyXG4gICAgICAgIGFmdGVyT3BlbjogJ2xnQWZ0ZXJPcGVuJyxcclxuICAgICAgICBzbGlkZUl0ZW1Mb2FkOiAnbGdTbGlkZUl0ZW1Mb2FkJyxcclxuICAgICAgICBiZWZvcmVTbGlkZTogJ2xnQmVmb3JlU2xpZGUnLFxyXG4gICAgICAgIGFmdGVyU2xpZGU6ICdsZ0FmdGVyU2xpZGUnLFxyXG4gICAgICAgIHBvc3RlckNsaWNrOiAnbGdQb3N0ZXJDbGljaycsXHJcbiAgICAgICAgZHJhZ1N0YXJ0OiAnbGdEcmFnU3RhcnQnLFxyXG4gICAgICAgIGRyYWdNb3ZlOiAnbGdEcmFnTW92ZScsXHJcbiAgICAgICAgZHJhZ0VuZDogJ2xnRHJhZ0VuZCcsXHJcbiAgICAgICAgYmVmb3JlTmV4dFNsaWRlOiAnbGdCZWZvcmVOZXh0U2xpZGUnLFxyXG4gICAgICAgIGJlZm9yZVByZXZTbGlkZTogJ2xnQmVmb3JlUHJldlNsaWRlJyxcclxuICAgICAgICBiZWZvcmVDbG9zZTogJ2xnQmVmb3JlQ2xvc2UnLFxyXG4gICAgICAgIGFmdGVyQ2xvc2U6ICdsZ0FmdGVyQ2xvc2UnLFxyXG4gICAgICAgIHJvdGF0ZUxlZnQ6ICdsZ1JvdGF0ZUxlZnQnLFxyXG4gICAgICAgIHJvdGF0ZVJpZ2h0OiAnbGdSb3RhdGVSaWdodCcsXHJcbiAgICAgICAgZmxpcEhvcml6b250YWw6ICdsZ0ZsaXBIb3Jpem9udGFsJyxcclxuICAgICAgICBmbGlwVmVydGljYWw6ICdsZ0ZsaXBWZXJ0aWNhbCcsXHJcbiAgICAgICAgYXV0b3BsYXk6ICdsZ0F1dG9wbGF5JyxcclxuICAgICAgICBhdXRvcGxheVN0YXJ0OiAnbGdBdXRvcGxheVN0YXJ0JyxcclxuICAgICAgICBhdXRvcGxheVN0b3A6ICdsZ0F1dG9wbGF5U3RvcCcsXHJcbiAgICB9O1xuXG4gICAgdmFyIGxpZ2h0R2FsbGVyeUNvcmVTZXR0aW5ncyA9IHtcclxuICAgICAgICBtb2RlOiAnbGctc2xpZGUnLFxyXG4gICAgICAgIGVhc2luZzogJ2Vhc2UnLFxyXG4gICAgICAgIHNwZWVkOiA0MDAsXHJcbiAgICAgICAgbGljZW5zZUtleTogJzAwMDAtMDAwMC0wMDAtMDAwMCcsXHJcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICBhZGRDbGFzczogJycsXHJcbiAgICAgICAgc3RhcnRDbGFzczogJ2xnLXN0YXJ0LXpvb20nLFxyXG4gICAgICAgIGJhY2tkcm9wRHVyYXRpb246IDMwMCxcclxuICAgICAgICBjb250YWluZXI6ICcnLFxyXG4gICAgICAgIHN0YXJ0QW5pbWF0aW9uRHVyYXRpb246IDQwMCxcclxuICAgICAgICB6b29tRnJvbU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICBoaWRlQmFyc0RlbGF5OiAwLFxyXG4gICAgICAgIHNob3dCYXJzQWZ0ZXI6IDEwMDAwLFxyXG4gICAgICAgIHNsaWRlRGVsYXk6IDAsXHJcbiAgICAgICAgc3VwcG9ydExlZ2FjeUJyb3dzZXI6IHRydWUsXHJcbiAgICAgICAgYWxsb3dNZWRpYU92ZXJsYXA6IGZhbHNlLFxyXG4gICAgICAgIHZpZGVvTWF4U2l6ZTogJzEyODAtNzIwJyxcclxuICAgICAgICBsb2FkWW91VHViZVBvc3RlcjogdHJ1ZSxcclxuICAgICAgICBkZWZhdWx0Q2FwdGlvbkhlaWdodDogMCxcclxuICAgICAgICBhcmlhTGFiZWxsZWRieTogJycsXHJcbiAgICAgICAgYXJpYURlc2NyaWJlZGJ5OiAnJyxcclxuICAgICAgICBjbG9zYWJsZTogdHJ1ZSxcclxuICAgICAgICBzd2lwZVRvQ2xvc2U6IHRydWUsXHJcbiAgICAgICAgY2xvc2VPblRhcDogdHJ1ZSxcclxuICAgICAgICBzaG93Q2xvc2VJY29uOiB0cnVlLFxyXG4gICAgICAgIHNob3dNYXhpbWl6ZUljb246IGZhbHNlLFxyXG4gICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgZXNjS2V5OiB0cnVlLFxyXG4gICAgICAgIGtleVByZXNzOiB0cnVlLFxyXG4gICAgICAgIGNvbnRyb2xzOiB0cnVlLFxyXG4gICAgICAgIHNsaWRlRW5kQW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgIGhpZGVDb250cm9sT25FbmQ6IGZhbHNlLFxyXG4gICAgICAgIG1vdXNld2hlZWw6IGZhbHNlLFxyXG4gICAgICAgIGdldENhcHRpb25Gcm9tVGl0bGVPckFsdDogdHJ1ZSxcclxuICAgICAgICBhcHBlbmRTdWJIdG1sVG86ICcubGctc3ViLWh0bWwnLFxyXG4gICAgICAgIHN1Ykh0bWxTZWxlY3RvclJlbGF0aXZlOiBmYWxzZSxcclxuICAgICAgICBwcmVsb2FkOiAyLFxyXG4gICAgICAgIG51bWJlck9mU2xpZGVJdGVtc0luRG9tOiAxMCxcclxuICAgICAgICBzZWxlY3RvcjogJycsXHJcbiAgICAgICAgc2VsZWN0V2l0aGluOiAnJyxcclxuICAgICAgICBuZXh0SHRtbDogJycsXHJcbiAgICAgICAgcHJldkh0bWw6ICcnLFxyXG4gICAgICAgIGluZGV4OiAwLFxyXG4gICAgICAgIGlmcmFtZVdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgaWZyYW1lSGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgaWZyYW1lTWF4V2lkdGg6ICcxMDAlJyxcclxuICAgICAgICBpZnJhbWVNYXhIZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICBkb3dubG9hZDogdHJ1ZSxcclxuICAgICAgICBjb3VudGVyOiB0cnVlLFxyXG4gICAgICAgIGFwcGVuZENvdW50ZXJUbzogJy5sZy10b29sYmFyJyxcclxuICAgICAgICBzd2lwZVRocmVzaG9sZDogNTAsXHJcbiAgICAgICAgZW5hYmxlU3dpcGU6IHRydWUsXHJcbiAgICAgICAgZW5hYmxlRHJhZzogdHJ1ZSxcclxuICAgICAgICBkeW5hbWljOiBmYWxzZSxcclxuICAgICAgICBkeW5hbWljRWw6IFtdLFxyXG4gICAgICAgIGV4dHJhUHJvcHM6IFtdLFxyXG4gICAgICAgIGV4VGh1bWJJbWFnZTogJycsXHJcbiAgICAgICAgaXNNb2JpbGU6IHVuZGVmaW5lZCxcclxuICAgICAgICBtb2JpbGVTZXR0aW5nczoge1xyXG4gICAgICAgICAgICBjb250cm9sczogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dDbG9zZUljb246IGZhbHNlLFxyXG4gICAgICAgICAgICBkb3dubG9hZDogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbHVnaW5zOiBbXSxcclxuICAgICAgICBzdHJpbmdzOiB7XHJcbiAgICAgICAgICAgIGNsb3NlR2FsbGVyeTogJ0Nsb3NlIGdhbGxlcnknLFxyXG4gICAgICAgICAgICB0b2dnbGVNYXhpbWl6ZTogJ1RvZ2dsZSBtYXhpbWl6ZScsXHJcbiAgICAgICAgICAgIHByZXZpb3VzU2xpZGU6ICdQcmV2aW91cyBzbGlkZScsXHJcbiAgICAgICAgICAgIG5leHRTbGlkZTogJ05leHQgc2xpZGUnLFxyXG4gICAgICAgICAgICBkb3dubG9hZDogJ0Rvd25sb2FkJyxcclxuICAgICAgICAgICAgcGxheVZpZGVvOiAnUGxheSB2aWRlbycsXHJcbiAgICAgICAgfSxcclxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0TGdQb2x5ZmlsbHMoKSB7XHJcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnViYmxlczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcclxuICAgICAgICAgICAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID1cclxuICAgICAgICAgICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSgpO1xyXG4gICAgfVxyXG4gICAgdmFyIGxnUXVlcnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gbGdRdWVyeShzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICB0aGlzLmNzc1ZlbmRlclByZWZpeGVzID0gW1xyXG4gICAgICAgICAgICAgICAgJ1RyYW5zaXRpb25EdXJhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnVHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uJyxcclxuICAgICAgICAgICAgICAgICdUcmFuc2Zvcm0nLFxyXG4gICAgICAgICAgICAgICAgJ1RyYW5zaXRpb24nLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yID0gdGhpcy5fZ2V0U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0RWxlbWVudCA9IHRoaXMuX2dldEZpcnN0RWwoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxnUXVlcnkuZ2VuZXJhdGVVVUlEID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHIgPSAoTWF0aC5yYW5kb20oKSAqIDE2KSB8IDAsIHYgPSBjID09ICd4JyA/IHIgOiAociAmIDB4MykgfCAweDg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuX2dldFNlbGVjdG9yID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0ID09PSB2b2lkIDApIHsgY29udGV4dCA9IGRvY3VtZW50OyB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgIHZhciBmbCA9IHNlbGVjdG9yLnN1YnN0cmluZygwLCAxKTtcclxuICAgICAgICAgICAgaWYgKGZsID09PSAnIycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLl9lYWNoID0gZnVuY3Rpb24gKGZ1bmMpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rvci5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMuc2VsZWN0b3IsIGZ1bmMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZnVuYyh0aGlzLnNlbGVjdG9yLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLl9zZXRDc3NWZW5kb3JQcmVmaXggPSBmdW5jdGlvbiAoZWwsIGNzc1Byb3BlcnR5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgICAgICAgICAgdmFyIHByb3BlcnR5ID0gY3NzUHJvcGVydHkucmVwbGFjZSgvLShbYS16XSkvZ2ksIGZ1bmN0aW9uIChzLCBncm91cDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBncm91cDEudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNzc1ZlbmRlclByZWZpeGVzLmluZGV4T2YocHJvcGVydHkpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGVbcHJvcGVydHkuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBwcm9wZXJ0eS5zbGljZSgxKV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVsLnN0eWxlWyd3ZWJraXQnICsgcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZVsnbW96JyArIHByb3BlcnR5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGVbJ21zJyArIHByb3BlcnR5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGVbJ28nICsgcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuX2dldEZpcnN0RWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdG9yICYmIHRoaXMuc2VsZWN0b3IubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdG9yWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmlzRXZlbnRNYXRjaGVkID0gZnVuY3Rpb24gKGV2ZW50LCBldmVudE5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZXNwYWNlID0gZXZlbnROYW1lLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBldmVudFxyXG4gICAgICAgICAgICAgICAgLnNwbGl0KCcuJylcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGU7IH0pXHJcbiAgICAgICAgICAgICAgICAuZXZlcnkoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudE5hbWVzcGFjZS5pbmRleE9mKGUpICE9PSAtMTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5hdHRyID0gZnVuY3Rpb24gKGF0dHIsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3RFbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9lYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gJExHKHRoaXMuX2dldFNlbGVjdG9yKHNlbGVjdG9yLCB0aGlzLnNlbGVjdG9yKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3IgJiYgdGhpcy5zZWxlY3Rvci5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRMRyh0aGlzLnNlbGVjdG9yWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkTEcodGhpcy5zZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmVxID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkTEcodGhpcy5zZWxlY3RvcltpbmRleF0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUucGFyZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJExHKHRoaXMuc2VsZWN0b3IucGFyZW50RWxlbWVudCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRGaXJzdEVsKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5yZW1vdmVBdHRyID0gZnVuY3Rpb24gKGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgdmFyIGF0dHJzID0gYXR0cmlidXRlcy5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICB0aGlzLl9lYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuZm9yRWFjaChmdW5jdGlvbiAoYXR0cikgeyByZXR1cm4gZWwucmVtb3ZlQXR0cmlidXRlKGF0dHIpOyB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUud3JhcCA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpcnN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgd3JhcHBlci5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIHRoaXMuZmlyc3RFbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5maXJzdEVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmZpcnN0RWxlbWVudCk7XHJcbiAgICAgICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy5maXJzdEVsZW1lbnQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmFkZENsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZXMpIHtcclxuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZXMgPT09IHZvaWQgMCkgeyBjbGFzc05hbWVzID0gJyc7IH1cclxuICAgICAgICAgICAgdGhpcy5fZWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIElFIGRvZXNuJ3Qgc3VwcG9ydCBtdWx0aXBsZSBhcmd1bWVudHNcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZXMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lcykge1xyXG4gICAgICAgICAgICB0aGlzLl9lYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSUUgZG9lc24ndCBzdXBwb3J0IG11bHRpcGxlIGFyZ3VtZW50c1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lcy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5oYXNDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpcnN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmhhc0F0dHJpYnV0ZSA9IGZ1bmN0aW9uIChhdHRyaWJ1dGUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpcnN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0RWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNDbGFzcyhjbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5jc3MgPSBmdW5jdGlvbiAocHJvcGVydHksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuX2VhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5fc2V0Q3NzVmVuZG9yUHJlZml4KGVsLCBwcm9wZXJ0eSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBOZWVkIHRvIHBhc3Mgc2VwYXJhdGUgbmFtZXNwYWNlcyBmb3Igc2VwYXJhdGUgZWxlbWVudHNcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudHMsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShsZ1F1ZXJ5LmV2ZW50TGlzdGVuZXJzW2V2ZW50XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZ1F1ZXJ5LmV2ZW50TGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGdRdWVyeS5ldmVudExpc3RlbmVyc1tldmVudF0ucHVzaChsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKGV2ZW50LnNwbGl0KCcuJylbMF0sIGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQHRvZG8gLSB0ZXN0IHRoaXNcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gKGV2ZW50LCBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLm9uKGV2ZW50LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vZmYoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIoZXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhsZ1F1ZXJ5LmV2ZW50TGlzdGVuZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc0V2ZW50TWF0Y2hlZChldmVudCwgZXZlbnROYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxnUXVlcnkuZXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXS5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3Rvci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZS5zcGxpdCgnLicpWzBdLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGdRdWVyeS5ldmVudExpc3RlbmVyc1tldmVudE5hbWVdID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnQsIGRldGFpbCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY3VzdG9tRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnQuc3BsaXQoJy4nKVswXSwge1xyXG4gICAgICAgICAgICAgICAgZGV0YWlsOiBkZXRhaWwgfHwgbnVsbCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RFbGVtZW50LmRpc3BhdGNoRXZlbnQoY3VzdG9tRXZlbnQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIERvZXMgbm90IHN1cHBvcnQgSUVcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBmZXRjaCh1cmwpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0b3IuaW5uZXJIVE1MID0gcmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24gKGh0bWwpIHtcclxuICAgICAgICAgICAgaWYgKGh0bWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZpcnN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0RWxlbWVudC5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIChodG1sKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGh0bWwgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBodG1sKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGh0bWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24gKGh0bWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIGVsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGh0bWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuc2Nyb2xsVG9wID0gZnVuY3Rpb24gKHNjcm9sbFRvcCkge1xyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsVG9wICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh3aW5kb3cucGFnZVlPZmZzZXQgfHxcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHxcclxuICAgICAgICAgICAgICAgICAgICAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuc2Nyb2xsTGVmdCA9IGZ1bmN0aW9uIChzY3JvbGxMZWZ0KSB7XHJcbiAgICAgICAgICAgIGlmIChzY3JvbGxMZWZ0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQ7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAod2luZG93LnBhZ2VYT2Zmc2V0IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgfHxcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHxcclxuICAgICAgICAgICAgICAgICAgICAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUub2Zmc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcmVjdCA9IHRoaXMuZmlyc3RFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICB2YXIgYm9keU1hcmdpbkxlZnQgPSAkTEcoJ2JvZHknKS5zdHlsZSgpLm1hcmdpbkxlZnQ7XHJcbiAgICAgICAgICAgIC8vIE1pbnVzIGJvZHkgbWFyZ2luIC0gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzA3MTE1NDgvaXMtZ2V0Ym91bmRpbmdjbGllbnRyZWN0LWxlZnQtcmV0dXJuaW5nLWEtd3JvbmctdmFsdWVcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCAtIHBhcnNlRmxvYXQoYm9keU1hcmdpbkxlZnQpICsgdGhpcy5zY3JvbGxMZWZ0KCksXHJcbiAgICAgICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgdGhpcy5zY3JvbGxUb3AoKSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLnN0eWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmZpcnN0RWxlbWVudC5jdXJyZW50U3R5bGUgfHxcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZmlyc3RFbGVtZW50KSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBXaWR0aCB3aXRob3V0IHBhZGRpbmcgYW5kIGJvcmRlciBldmVuIGlmIGJveC1zaXppbmcgaXMgdXNlZC5cclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS53aWR0aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gdGhpcy5zdHlsZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZmlyc3RFbGVtZW50LmNsaWVudFdpZHRoIC1cclxuICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0xlZnQpIC1cclxuICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1JpZ2h0KSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBIZWlnaHQgd2l0aG91dCBwYWRkaW5nIGFuZCBib3JkZXIgZXZlbiBpZiBib3gtc2l6aW5nIGlzIHVzZWQuXHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuaGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5maXJzdEVsZW1lbnQuY2xpZW50SGVpZ2h0IC1cclxuICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1RvcCkgLVxyXG4gICAgICAgICAgICAgICAgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nQm90dG9tKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LmV2ZW50TGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgcmV0dXJuIGxnUXVlcnk7XHJcbiAgICB9KCkpO1xyXG4gICAgZnVuY3Rpb24gJExHKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgaW5pdExnUG9seWZpbGxzKCk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBsZ1F1ZXJ5KHNlbGVjdG9yKTtcclxuICAgIH1cblxuICAgIHZhciBkZWZhdWx0RHluYW1pY09wdGlvbnMgPSBbXHJcbiAgICAgICAgJ3NyYycsXHJcbiAgICAgICAgJ3NvdXJjZXMnLFxyXG4gICAgICAgICdzdWJIdG1sJyxcclxuICAgICAgICAnc3ViSHRtbFVybCcsXHJcbiAgICAgICAgJ2h0bWwnLFxyXG4gICAgICAgICd2aWRlbycsXHJcbiAgICAgICAgJ3Bvc3RlcicsXHJcbiAgICAgICAgJ3NsaWRlTmFtZScsXHJcbiAgICAgICAgJ3Jlc3BvbnNpdmUnLFxyXG4gICAgICAgICdzcmNzZXQnLFxyXG4gICAgICAgICdzaXplcycsXHJcbiAgICAgICAgJ2lmcmFtZScsXHJcbiAgICAgICAgJ2Rvd25sb2FkVXJsJyxcclxuICAgICAgICAnZG93bmxvYWQnLFxyXG4gICAgICAgICd3aWR0aCcsXHJcbiAgICAgICAgJ2ZhY2Vib29rU2hhcmVVcmwnLFxyXG4gICAgICAgICd0d2VldFRleHQnLFxyXG4gICAgICAgICdpZnJhbWVUaXRsZScsXHJcbiAgICAgICAgJ3R3aXR0ZXJTaGFyZVVybCcsXHJcbiAgICAgICAgJ3BpbnRlcmVzdFNoYXJlVXJsJyxcclxuICAgICAgICAncGludGVyZXN0VGV4dCcsXHJcbiAgICAgICAgJ2ZiSHRtbCcsXHJcbiAgICAgICAgJ2Rpc3F1c0lkZW50aWZpZXInLFxyXG4gICAgICAgICdkaXNxdXNVcmwnLFxyXG4gICAgXTtcclxuICAgIC8vIENvbnZlcnQgaHRtbCBkYXRhLWF0dHJpYnV0ZSB0byBjYW1hbGNhc2VcclxuICAgIGZ1bmN0aW9uIGNvbnZlcnRUb0RhdGEoYXR0cikge1xyXG4gICAgICAgIC8vIEZJbmQgYSB3YXkgZm9yIGxnc2l6ZVxyXG4gICAgICAgIGlmIChhdHRyID09PSAnaHJlZicpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdzcmMnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhdHRyID0gYXR0ci5yZXBsYWNlKCdkYXRhLScsICcnKTtcclxuICAgICAgICBhdHRyID0gYXR0ci5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIGF0dHIuc2xpY2UoMSk7XHJcbiAgICAgICAgYXR0ciA9IGF0dHIucmVwbGFjZSgvLShbYS16XSkvZywgZnVuY3Rpb24gKGcpIHsgcmV0dXJuIGdbMV0udG9VcHBlckNhc2UoKTsgfSk7XHJcbiAgICAgICAgcmV0dXJuIGF0dHI7XHJcbiAgICB9XHJcbiAgICB2YXIgdXRpbHMgPSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZ2V0IHBvc3NpYmxlIHdpZHRoIGFuZCBoZWlnaHQgZnJvbSB0aGUgbGdTaXplIGF0dHJpYnV0ZS4gVXNlZCBmb3IgWm9vbUZyb21PcmlnaW4gb3B0aW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0U2l6ZTogZnVuY3Rpb24gKGVsLCBjb250YWluZXIsIHNwYWNpbmcsIGRlZmF1bHRMZ1NpemUpIHtcclxuICAgICAgICAgICAgaWYgKHNwYWNpbmcgPT09IHZvaWQgMCkgeyBzcGFjaW5nID0gMDsgfVxyXG4gICAgICAgICAgICB2YXIgTEdlbCA9ICRMRyhlbCk7XHJcbiAgICAgICAgICAgIHZhciBsZ1NpemUgPSBMR2VsLmF0dHIoJ2RhdGEtbGctc2l6ZScpIHx8IGRlZmF1bHRMZ1NpemU7XHJcbiAgICAgICAgICAgIGlmICghbGdTaXplKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGlzUmVzcG9uc2l2ZVNpemVzID0gbGdTaXplLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgIC8vIGlmIGF0LWxlYXN0IHR3byB2aWV3cG9ydCBzaXplcyBhcmUgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgIGlmIChpc1Jlc3BvbnNpdmVTaXplc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpc1Jlc3BvbnNpdmVTaXplcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzaXplXzEgPSBpc1Jlc3BvbnNpdmVTaXplc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2l2ZVdpZHRoID0gcGFyc2VJbnQoc2l6ZV8xLnNwbGl0KCctJylbMl0sIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2l2ZVdpZHRoID4gd1dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxnU2l6ZSA9IHNpemVfMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRha2UgbGFzdCBpdGVtIGFzIGxhc3Qgb3B0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IGlzUmVzcG9uc2l2ZVNpemVzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGdTaXplID0gc2l6ZV8xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IGxnU2l6ZS5zcGxpdCgnLScpO1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSBwYXJzZUludChzaXplWzBdLCAxMCk7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBwYXJzZUludChzaXplWzFdLCAxMCk7XHJcbiAgICAgICAgICAgIHZhciBjV2lkdGggPSBjb250YWluZXIud2lkdGgoKTtcclxuICAgICAgICAgICAgdmFyIGNIZWlnaHQgPSBjb250YWluZXIuaGVpZ2h0KCkgLSBzcGFjaW5nO1xyXG4gICAgICAgICAgICB2YXIgbWF4V2lkdGggPSBNYXRoLm1pbihjV2lkdGgsIHdpZHRoKTtcclxuICAgICAgICAgICAgdmFyIG1heEhlaWdodCA9IE1hdGgubWluKGNIZWlnaHQsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIHZhciByYXRpbyA9IE1hdGgubWluKG1heFdpZHRoIC8gd2lkdGgsIG1heEhlaWdodCAvIGhlaWdodCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHdpZHRoOiB3aWR0aCAqIHJhdGlvLCBoZWlnaHQ6IGhlaWdodCAqIHJhdGlvIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBHZXQgdHJhbnNmb3JtIHZhbHVlIGJhc2VkIG9uIHRoZSBpbWFnZVNpemUuIFVzZWQgZm9yIFpvb21Gcm9tT3JpZ2luIG9wdGlvblxyXG4gICAgICAgICAqIEBwYXJhbSB7alF1ZXJ5IEVsZW1lbnR9XHJcbiAgICAgICAgICogQHJldHVybnMge1N0cmluZ30gVHJhbnNmb3JtIENTUyBzdHJpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRUcmFuc2Zvcm06IGZ1bmN0aW9uIChlbCwgY29udGFpbmVyLCB0b3AsIGJvdHRvbSwgaW1hZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIGlmICghaW1hZ2VTaXplKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIExHZWwgPSAkTEcoZWwpLmZpbmQoJ2ltZycpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIGlmICghTEdlbC5nZXQoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldCgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICB2YXIgd1dpZHRoID0gY29udGFpbmVyUmVjdC53aWR0aDtcclxuICAgICAgICAgICAgLy8gdXNpbmcgaW5uZXJXaWR0aCB0byBpbmNsdWRlIG1vYmlsZSBzYWZhcmkgYm90dG9tIGJhclxyXG4gICAgICAgICAgICB2YXIgd0hlaWdodCA9IGNvbnRhaW5lci5oZWlnaHQoKSAtICh0b3AgKyBib3R0b20pO1xyXG4gICAgICAgICAgICB2YXIgZWxXaWR0aCA9IExHZWwud2lkdGgoKTtcclxuICAgICAgICAgICAgdmFyIGVsSGVpZ2h0ID0gTEdlbC5oZWlnaHQoKTtcclxuICAgICAgICAgICAgdmFyIGVsU3R5bGUgPSBMR2VsLnN0eWxlKCk7XHJcbiAgICAgICAgICAgIHZhciB4ID0gKHdXaWR0aCAtIGVsV2lkdGgpIC8gMiAtXHJcbiAgICAgICAgICAgICAgICBMR2VsLm9mZnNldCgpLmxlZnQgK1xyXG4gICAgICAgICAgICAgICAgKHBhcnNlRmxvYXQoZWxTdHlsZS5wYWRkaW5nTGVmdCkgfHwgMCkgK1xyXG4gICAgICAgICAgICAgICAgKHBhcnNlRmxvYXQoZWxTdHlsZS5ib3JkZXJMZWZ0KSB8fCAwKSArXHJcbiAgICAgICAgICAgICAgICAkTEcod2luZG93KS5zY3JvbGxMZWZ0KCkgK1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyUmVjdC5sZWZ0O1xyXG4gICAgICAgICAgICB2YXIgeSA9ICh3SGVpZ2h0IC0gZWxIZWlnaHQpIC8gMiAtXHJcbiAgICAgICAgICAgICAgICBMR2VsLm9mZnNldCgpLnRvcCArXHJcbiAgICAgICAgICAgICAgICAocGFyc2VGbG9hdChlbFN0eWxlLnBhZGRpbmdUb3ApIHx8IDApICtcclxuICAgICAgICAgICAgICAgIChwYXJzZUZsb2F0KGVsU3R5bGUuYm9yZGVyVG9wKSB8fCAwKSArXHJcbiAgICAgICAgICAgICAgICAkTEcod2luZG93KS5zY3JvbGxUb3AoKSArXHJcbiAgICAgICAgICAgICAgICB0b3A7XHJcbiAgICAgICAgICAgIHZhciBzY1ggPSBlbFdpZHRoIC8gaW1hZ2VTaXplLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgc2NZID0gZWxIZWlnaHQgLyBpbWFnZVNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgK1xyXG4gICAgICAgICAgICAgICAgKHggKj0gLTEpICtcclxuICAgICAgICAgICAgICAgICdweCwgJyArXHJcbiAgICAgICAgICAgICAgICAoeSAqPSAtMSkgK1xyXG4gICAgICAgICAgICAgICAgJ3B4LCAwKSBzY2FsZTNkKCcgK1xyXG4gICAgICAgICAgICAgICAgc2NYICtcclxuICAgICAgICAgICAgICAgICcsICcgK1xyXG4gICAgICAgICAgICAgICAgc2NZICtcclxuICAgICAgICAgICAgICAgICcsIDEpJztcclxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zZm9ybTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldElmcmFtZU1hcmt1cDogZnVuY3Rpb24gKGlmcmFtZVdpZHRoLCBpZnJhbWVIZWlnaHQsIGlmcmFtZU1heFdpZHRoLCBpZnJhbWVNYXhIZWlnaHQsIHNyYywgaWZyYW1lVGl0bGUpIHtcclxuICAgICAgICAgICAgdmFyIHRpdGxlID0gaWZyYW1lVGl0bGUgPyAndGl0bGU9XCInICsgaWZyYW1lVGl0bGUgKyAnXCInIDogJyc7XHJcbiAgICAgICAgICAgIHJldHVybiBcIjxkaXYgY2xhc3M9XFxcImxnLXZpZGVvLWNvbnQgbGctaGFzLWlmcmFtZVxcXCIgc3R5bGU9XFxcIndpZHRoOlwiICsgaWZyYW1lV2lkdGggKyBcIjsgbWF4LXdpZHRoOlwiICsgaWZyYW1lTWF4V2lkdGggKyBcIjsgaGVpZ2h0OiBcIiArIGlmcmFtZUhlaWdodCArIFwiOyBtYXgtaGVpZ2h0OlwiICsgaWZyYW1lTWF4SGVpZ2h0ICsgXCJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGlmcmFtZSBjbGFzcz1cXFwibGctb2JqZWN0XFxcIiBmcmFtZWJvcmRlcj1cXFwiMFxcXCIgXCIgKyB0aXRsZSArIFwiIHNyYz1cXFwiXCIgKyBzcmMgKyBcIlxcXCIgIGFsbG93ZnVsbHNjcmVlbj1cXFwidHJ1ZVxcXCI+PC9pZnJhbWU+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlwiO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0SW1nTWFya3VwOiBmdW5jdGlvbiAoaW5kZXgsIHNyYywgYWx0QXR0ciwgc3Jjc2V0LCBzaXplcywgc291cmNlcykge1xyXG4gICAgICAgICAgICB2YXIgc3Jjc2V0QXR0ciA9IHNyY3NldCA/IFwic3Jjc2V0PVxcXCJcIiArIHNyY3NldCArIFwiXFxcIlwiIDogJyc7XHJcbiAgICAgICAgICAgIHZhciBzaXplc0F0dHIgPSBzaXplcyA/IFwic2l6ZXM9XFxcIlwiICsgc2l6ZXMgKyBcIlxcXCJcIiA6ICcnO1xyXG4gICAgICAgICAgICB2YXIgaW1nTWFya3VwID0gXCI8aW1nIFwiICsgYWx0QXR0ciArIFwiIFwiICsgc3Jjc2V0QXR0ciArIFwiICBcIiArIHNpemVzQXR0ciArIFwiIGNsYXNzPVxcXCJsZy1vYmplY3QgbGctaW1hZ2VcXFwiIGRhdGEtaW5kZXg9XFxcIlwiICsgaW5kZXggKyBcIlxcXCIgc3JjPVxcXCJcIiArIHNyYyArIFwiXFxcIiAvPlwiO1xyXG4gICAgICAgICAgICB2YXIgc291cmNlVGFnID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc291cmNlT2JqID0gdHlwZW9mIHNvdXJjZXMgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShzb3VyY2VzKSA6IHNvdXJjZXM7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VUYWcgPSBzb3VyY2VPYmoubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0cnMgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyBub3QgcmVtb3ZlIHRoZSBmaXJzdCBzcGFjZSBhcyBpdCBpcyByZXF1aXJlZCB0byBzZXBhcmF0ZSB0aGUgYXR0cmlidXRlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRycyArPSBcIiBcIiArIGtleSArIFwiPVxcXCJcIiArIHNvdXJjZVtrZXldICsgXCJcXFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiPHNvdXJjZSBcIiArIGF0dHJzICsgXCI+PC9zb3VyY2U+XCI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIiArIHNvdXJjZVRhZyArIGltZ01hcmt1cDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIEdldCBzcmMgZnJvbSByZXNwb25zaXZlIHNyY1xyXG4gICAgICAgIGdldFJlc3BvbnNpdmVTcmM6IGZ1bmN0aW9uIChzcmNJdG1zKSB7XHJcbiAgICAgICAgICAgIHZhciByc1dpZHRoID0gW107XHJcbiAgICAgICAgICAgIHZhciByc1NyYyA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgc3JjID0gJyc7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3JjSXRtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9zcmMgPSBzcmNJdG1zW2ldLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBNYW5hZ2UgZW1wdHkgc3BhY2VcclxuICAgICAgICAgICAgICAgIGlmIChfc3JjWzBdID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zcmMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcnNTcmMucHVzaChfc3JjWzBdKTtcclxuICAgICAgICAgICAgICAgIHJzV2lkdGgucHVzaChfc3JjWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcnNXaWR0aC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHJzV2lkdGhbal0sIDEwKSA+IHdXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IHJzU3JjW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzcmM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc0ltYWdlTG9hZGVkOiBmdW5jdGlvbiAoaW1nKSB7XHJcbiAgICAgICAgICAgIGlmICghaW1nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBEdXJpbmcgdGhlIG9ubG9hZCBldmVudCwgSUUgY29ycmVjdGx5IGlkZW50aWZpZXMgYW55IGltYWdlcyB0aGF0XHJcbiAgICAgICAgICAgIC8vIHdlcmVu4oCZdCBkb3dubG9hZGVkIGFzIG5vdCBjb21wbGV0ZS4gT3RoZXJzIHNob3VsZCB0b28uIEdlY2tvLWJhc2VkXHJcbiAgICAgICAgICAgIC8vIGJyb3dzZXJzIGFjdCBsaWtlIE5TNCBpbiB0aGF0IHRoZXkgcmVwb3J0IHRoaXMgaW5jb3JyZWN0bHkuXHJcbiAgICAgICAgICAgIGlmICghaW1nLmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSG93ZXZlciwgdGhleSBkbyBoYXZlIHR3byB2ZXJ5IHVzZWZ1bCBwcm9wZXJ0aWVzOiBuYXR1cmFsV2lkdGggYW5kXHJcbiAgICAgICAgICAgIC8vIG5hdHVyYWxIZWlnaHQuIFRoZXNlIGdpdmUgdGhlIHRydWUgc2l6ZSBvZiB0aGUgaW1hZ2UuIElmIGl0IGZhaWxlZFxyXG4gICAgICAgICAgICAvLyB0byBsb2FkLCBlaXRoZXIgb2YgdGhlc2Ugc2hvdWxkIGJlIHplcm8uXHJcbiAgICAgICAgICAgIGlmIChpbWcubmF0dXJhbFdpZHRoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gTm8gb3RoZXIgd2F5IG9mIGNoZWNraW5nOiBhc3N1bWUgaXTigJlzIG9rLlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFZpZGVvUG9zdGVyTWFya3VwOiBmdW5jdGlvbiAoX3Bvc3RlciwgZHVtbXlJbWcsIHZpZGVvQ29udFN0eWxlLCBwbGF5VmlkZW9TdHJpbmcsIF9pc1ZpZGVvKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb0NsYXNzID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChfaXNWaWRlbyAmJiBfaXNWaWRlby55b3V0dWJlKSB7XHJcbiAgICAgICAgICAgICAgICB2aWRlb0NsYXNzID0gJ2xnLWhhcy15b3V0dWJlJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfaXNWaWRlbyAmJiBfaXNWaWRlby52aW1lbykge1xyXG4gICAgICAgICAgICAgICAgdmlkZW9DbGFzcyA9ICdsZy1oYXMtdmltZW8nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmlkZW9DbGFzcyA9ICdsZy1oYXMtaHRtbDUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBcIjxkaXYgY2xhc3M9XFxcImxnLXZpZGVvLWNvbnQgXCIgKyB2aWRlb0NsYXNzICsgXCJcXFwiIHN0eWxlPVxcXCJcIiArIHZpZGVvQ29udFN0eWxlICsgXCJcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZy12aWRlby1wbGF5LWJ1dHRvblxcXCI+XFxuICAgICAgICAgICAgICAgIDxzdmdcXG4gICAgICAgICAgICAgICAgICAgIHZpZXdCb3g9XFxcIjAgMCAyMCAyMFxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW89XFxcInhNaWRZTWlkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlPVxcXCJmYWxzZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT1cXFwiXCIgKyBwbGF5VmlkZW9TdHJpbmcgKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XFxcImltZ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJsZy12aWRlby1wbGF5LWljb25cXFwiXFxuICAgICAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgICAgIDx0aXRsZT5cIiArIHBsYXlWaWRlb1N0cmluZyArIFwiPC90aXRsZT5cXG4gICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPVxcXCJsZy12aWRlby1wbGF5LWljb24taW5uZXJcXFwiIHBvaW50cz1cXFwiMSwwIDIwLDEwIDEsMjBcXFwiPjwvcG9seWdvbj5cXG4gICAgICAgICAgICAgICAgPC9zdmc+XFxuICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XFxcImxnLXZpZGVvLXBsYXktaWNvbi1iZ1xcXCIgdmlld0JveD1cXFwiMCAwIDUwIDUwXFxcIiBmb2N1c2FibGU9XFxcImZhbHNlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9XFxcIjUwJVxcXCIgY3k9XFxcIjUwJVxcXCIgcj1cXFwiMjBcXFwiPjwvY2lyY2xlPjwvc3ZnPlxcbiAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVxcXCJsZy12aWRlby1wbGF5LWljb24tY2lyY2xlXFxcIiB2aWV3Qm94PVxcXCIwIDAgNTAgNTBcXFwiIGZvY3VzYWJsZT1cXFwiZmFsc2VcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD1cXFwiNTAlXFxcIiBjeT1cXFwiNTAlXFxcIiByPVxcXCIyMFxcXCI+PC9jaXJjbGU+XFxuICAgICAgICAgICAgICAgIDwvc3ZnPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIFwiICsgKGR1bW15SW1nIHx8ICcnKSArIFwiXFxuICAgICAgICAgICAgPGltZyBjbGFzcz1cXFwibGctb2JqZWN0IGxnLXZpZGVvLXBvc3RlclxcXCIgc3JjPVxcXCJcIiArIF9wb3N0ZXIgKyBcIlxcXCIgLz5cXG4gICAgICAgIDwvZGl2PlwiO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgQ3JlYXRlIGR5bmFtaWMgZWxlbWVudHMgYXJyYXkgZnJvbSBnYWxsZXJ5IGl0ZW1zIHdoZW4gZHluYW1pYyBvcHRpb24gaXMgZmFsc2VcclxuICAgICAgICAgKiBJdCBoZWxwcyB0byBhdm9pZCBmcmVxdWVudCBET00gaW50ZXJhY3Rpb25cclxuICAgICAgICAgKiBhbmQgYXZvaWQgbXVsdGlwbGUgY2hlY2tzIGZvciBkeW5hbWljIGVsbWVudHNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX0gZHluYW1pY0VsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0RHluYW1pY09wdGlvbnM6IGZ1bmN0aW9uIChpdGVtcywgZXh0cmFQcm9wcywgZ2V0Q2FwdGlvbkZyb21UaXRsZU9yQWx0LCBleFRodW1iSW1hZ2UpIHtcclxuICAgICAgICAgICAgdmFyIGR5bmFtaWNFbGVtZW50cyA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgYXZhaWxhYmxlRHluYW1pY09wdGlvbnMgPSBfX3NwcmVhZEFycmF5cyhkZWZhdWx0RHluYW1pY09wdGlvbnMsIGV4dHJhUHJvcHMpO1xyXG4gICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwoaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZHluYW1pY0VsID0ge307XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW0uYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdHRyID0gaXRlbS5hdHRyaWJ1dGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyLnNwZWNpZmllZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHluYW1pY0F0dHIgPSBjb252ZXJ0VG9EYXRhKGF0dHIubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlRHluYW1pY09wdGlvbnMuaW5kZXhPZihkeW5hbWljQXR0cikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBkeW5hbWljQXR0cjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR5bmFtaWNFbFtsYWJlbF0gPSBhdHRyLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRJdGVtID0gJExHKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFsdCA9IGN1cnJlbnRJdGVtLmZpbmQoJ2ltZycpLmZpcnN0KCkuYXR0cignYWx0Jyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGl0bGUgPSBjdXJyZW50SXRlbS5hdHRyKCd0aXRsZScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRodW1iID0gZXhUaHVtYkltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgPyBjdXJyZW50SXRlbS5hdHRyKGV4VGh1bWJJbWFnZSlcclxuICAgICAgICAgICAgICAgICAgICA6IGN1cnJlbnRJdGVtLmZpbmQoJ2ltZycpLmZpcnN0KCkuYXR0cignc3JjJyk7XHJcbiAgICAgICAgICAgICAgICBkeW5hbWljRWwudGh1bWIgPSB0aHVtYjtcclxuICAgICAgICAgICAgICAgIGlmIChnZXRDYXB0aW9uRnJvbVRpdGxlT3JBbHQgJiYgIWR5bmFtaWNFbC5zdWJIdG1sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHluYW1pY0VsLnN1Ykh0bWwgPSB0aXRsZSB8fCBhbHQgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkeW5hbWljRWwuYWx0ID0gYWx0IHx8IHRpdGxlIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgZHluYW1pY0VsZW1lbnRzLnB1c2goZHluYW1pY0VsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkeW5hbWljRWxlbWVudHM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc01vYmlsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gL2lQaG9uZXxpUGFkfGlQb2R8QW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBDaGVjayB0aGUgZ2l2ZW4gc3JjIGlzIHZpZGVvXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHNyY1xyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gdmlkZW8gdHlwZVxyXG4gICAgICAgICAqIEV4OnsgeW91dHViZSAgOiAgW1wiLy93d3cueW91dHViZS5jb20vd2F0Y2g/dj1jMGFzSmdTeXhjWVwiLCBcImMwYXNKZ1N5eGNZXCJdIH1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB0b2RvIC0gdGhpcyBpbmZvcm1hdGlvbiBjYW4gYmUgbW92ZWQgdG8gZHluYW1pY0VsIHRvIGF2b2lkIGZyZXF1ZW50IGNhbGxzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNWaWRlbzogZnVuY3Rpb24gKHNyYywgaXNIVE1MNVZJZGVvLCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoIXNyYykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzSFRNTDVWSWRlbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw1OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdsaWdodEdhbGxlcnkgOi0gZGF0YS1zcmMgaXMgbm90IHByb3ZpZGVkIG9uIHNsaWRlIGl0ZW0gJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChpbmRleCArIDEpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy4gUGxlYXNlIG1ha2Ugc3VyZSB0aGUgc2VsZWN0b3IgcHJvcGVydHkgaXMgcHJvcGVybHkgY29uZmlndXJlZC4gTW9yZSBpbmZvIC0gaHR0cHM6Ly93d3cubGlnaHRnYWxsZXJ5anMuY29tL2RlbW9zL2h0bWwtbWFya3VwLycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgeW91dHViZSA9IHNyYy5tYXRjaCgvXFwvXFwvKD86d3d3XFwuKT95b3V0dSg/OlxcLmJlfGJlXFwuY29tfGJlLW5vY29va2llXFwuY29tKVxcLyg/OndhdGNoXFw/dj18ZW1iZWRcXC8pPyhbYS16MC05XFwtXFxfXFwlXSspKFtcXCZ8P11bXFxTXSopKi9pKTtcclxuICAgICAgICAgICAgdmFyIHZpbWVvID0gc3JjLm1hdGNoKC9cXC9cXC8oPzp3d3dcXC4pPyg/OnBsYXllclxcLik/dmltZW8uY29tXFwvKD86dmlkZW9cXC8pPyhbMC05YS16XFwtX10rKSguKik/L2kpO1xyXG4gICAgICAgICAgICB2YXIgd2lzdGlhID0gc3JjLm1hdGNoKC9odHRwcz86XFwvXFwvKC4rKT8od2lzdGlhXFwuY29tfHdpXFwuc3QpXFwvKG1lZGlhc3xlbWJlZClcXC8oWzAtOWEtelxcLV9dKykoLiopLyk7XHJcbiAgICAgICAgICAgIGlmICh5b3V0dWJlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHlvdXR1YmU6IHlvdXR1YmUsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZpbWVvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpbWVvOiB2aW1lbyxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAod2lzdGlhKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpc3RpYTogd2lzdGlhLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xuXG4gICAgLy8gQHJlZiAtIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM5NzE4NDEvaG93LXRvLXJlc2l6ZS1pbWFnZXMtcHJvcG9ydGlvbmFsbHkta2VlcGluZy10aGUtYXNwZWN0LXJhdGlvXHJcbiAgICAvLyBAcmVmIC0gaHR0cHM6Ly8yYWxpdHkuY29tLzIwMTcvMDQvc2V0dGluZy11cC1tdWx0aS1wbGF0Zm9ybS1wYWNrYWdlcy5odG1sXHJcbiAgICAvLyBVbmlxdWUgaWQgZm9yIGVhY2ggZ2FsbGVyeVxyXG4gICAgdmFyIGxnSWQgPSAwO1xyXG4gICAgdmFyIExpZ2h0R2FsbGVyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBMaWdodEdhbGxlcnkoZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLmxnT3BlbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAvLyBsaWdodEdhbGxlcnkgbW9kdWxlc1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbnMgPSBbXTtcclxuICAgICAgICAgICAgLy8gZmFsc2Ugd2hlbiBsaWdodEdhbGxlcnkgbG9hZCBmaXJzdCBzbGlkZSBjb250ZW50O1xyXG4gICAgICAgICAgICB0aGlzLmxHYWxsZXJ5T24gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gVHJ1ZSB3aGVuIGEgc2xpZGUgYW5pbWF0aW9uIGlzIGluIHByb2dyZXNzXHJcbiAgICAgICAgICAgIHRoaXMubGdCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEl0ZW1zSW5Eb20gPSBbXTtcclxuICAgICAgICAgICAgLy8gU2Nyb2xsIHRvcCB2YWx1ZSBiZWZvcmUgbGlnaHRHYWxsZXJ5IGlzIG9wZW5lZFxyXG4gICAgICAgICAgICB0aGlzLnByZXZTY3JvbGxUb3AgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmlzRHVtbXlJbWFnZVJlbW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5kcmFnT3JTd2lwZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tZWRpYUNvbnRhaW5lclBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgYm90dG9tOiAwLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxnSWQrKztcclxuICAgICAgICAgICAgdGhpcy5sZ0lkID0gbGdJZDtcclxuICAgICAgICAgICAgdGhpcy5lbCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuTEdlbCA9ICRMRyhlbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVNldHRpbmdzKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkTW9kdWxlcygpO1xyXG4gICAgICAgICAgICAvLyBXaGVuIHVzaW5nIGR5bmFtaWMgbW9kZSwgZW5zdXJlIGR5bmFtaWNFbCBpcyBhbiBhcnJheVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5keW5hbWljICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLmR5bmFtaWNFbCAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgICAgICAhQXJyYXkuaXNBcnJheSh0aGlzLnNldHRpbmdzLmR5bmFtaWNFbCkpIHtcclxuICAgICAgICAgICAgICAgIHRocm93ICdXaGVuIHVzaW5nIGR5bmFtaWMgbW9kZSwgeW91IG11c3QgYWxzbyBkZWZpbmUgZHluYW1pY0VsIGFzIGFuIEFycmF5Lic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5nYWxsZXJ5SXRlbXMgPSB0aGlzLmdldEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9ybWFsaXplU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgLy8gR2FsbGVyeSBpdGVtc1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUxpY2Vuc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2VuZXJhdGVTZXR0aW5ncyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIC8vIGxpZ2h0R2FsbGVyeSBzZXR0aW5nc1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGxpZ2h0R2FsbGVyeUNvcmVTZXR0aW5ncyksIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5pc01vYmlsZSAmJlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIHRoaXMuc2V0dGluZ3MuaXNNb2JpbGUgPT09ICdmdW5jdGlvbidcclxuICAgICAgICAgICAgICAgID8gdGhpcy5zZXR0aW5ncy5pc01vYmlsZSgpXHJcbiAgICAgICAgICAgICAgICA6IHV0aWxzLmlzTW9iaWxlKCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb2JpbGVTZXR0aW5ncyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aGlzLnNldHRpbmdzLm1vYmlsZVNldHRpbmdzKSwgdGhpcy5zZXR0aW5ncy5tb2JpbGVTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMuc2V0dGluZ3MpLCBtb2JpbGVTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUubm9ybWFsaXplU2V0dGluZ3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNsaWRlRW5kQW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLmhpZGVDb250cm9sT25FbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuY2xvc2FibGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3Muc3dpcGVUb0Nsb3NlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQW5kIHJlc2V0IGl0IG9uIGNsb3NlIHRvIGdldCB0aGUgY29ycmVjdCB2YWx1ZSBuZXh0IHRpbWVcclxuICAgICAgICAgICAgdGhpcy56b29tRnJvbU9yaWdpbiA9IHRoaXMuc2V0dGluZ3Muem9vbUZyb21PcmlnaW47XHJcbiAgICAgICAgICAgIC8vIEF0IHRoZSBtb21lbnQsIFpvb20gZnJvbSBpbWFnZSBkb2Vzbid0IHN1cHBvcnQgZHluYW1pYyBvcHRpb25zXHJcbiAgICAgICAgICAgIC8vIEB0b2RvIGFkZCB6b29tRnJvbU9yaWdpbiBzdXBwb3J0IGZvciBkeW5hbWljIGltYWdlc1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5keW5hbWljKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnpvb21Gcm9tT3JpZ2luID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5jb250YWluZXIgPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHNldHRpbmdzLnByZWxvYWQgc2hvdWxkIG5vdCBiZSBncmF0ZXIgdGhhbiAkaXRlbS5sZW5ndGhcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5wcmVsb2FkID0gTWF0aC5taW4odGhpcy5zZXR0aW5ncy5wcmVsb2FkLCB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFNsaWRlVmlkZW9JbmZvKHRoaXMuZ2FsbGVyeUl0ZW1zKTtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFN0cnVjdHVyZSgpO1xyXG4gICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5pbml0LCB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZTogdGhpcyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmtleVByZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleVByZXNzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5lbmFibGVEcmFnKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5lbmFibGVTd2lwZSgpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMudHJpZ2dlclBvc3RlckNsaWNrKCk7XHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgICAgdGhpcy5hcnJvdygpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tb3VzZXdoZWVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNld2hlZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZHluYW1pYykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuR2FsbGVyeU9uSXRlbUNsaWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUub3BlbkdhbGxlcnlPbkl0ZW1DbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhpc18xLml0ZW1zW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudCA9ICRMRyhlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIC8vIFVzaW5nIGRpZmZlcmVudCBuYW1lc3BhY2UgZm9yIGNsaWNrIGJlY2F1c2UgY2xpY2sgZXZlbnQgc2hvdWxkIG5vdCB1bmJpbmQgaWYgc2VsZWN0b3IgaXMgc2FtZSBvYmplY3QoJ3RoaXMnKVxyXG4gICAgICAgICAgICAgICAgLy8gQHRvZG8gbWFuYWdlIGFsbCBldmVudCBsaXN0bmVycyAtIHNob3VsZCBoYXZlIG5hbWVzcGFjZSB0aGF0IHJlcHJlc2VudCBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IGxnUXVlcnkuZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLWxnLWlkJywgdXVpZClcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbGljay5sZ2N1c3RvbS1pdGVtLVwiICsgdXVpZCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRJdGVtSW5kZXggPSBfdGhpcy5zZXR0aW5ncy5pbmRleCB8fCBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcGVuR2FsbGVyeShjdXJyZW50SXRlbUluZGV4LCBlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgdGhpc18xID0gdGhpcztcclxuICAgICAgICAgICAgLy8gVXNpbmcgZm9yIGxvb3AgaW5zdGVhZCBvZiB1c2luZyBidWJibGluZyBhcyB0aGUgaXRlbXMgY2FuIGJlIGFueSBodG1sIGVsZW1lbnQuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLml0ZW1zLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgX2xvb3BfMShpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vZHVsZSBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqIE1vZHVsZXMgYXJlIGJ1aWxkIGluY3JlbWVudGFsbHkuXHJcbiAgICAgICAgICogR2FsbGVyeSBzaG91bGQgYmUgb3BlbmVkIG9ubHkgb25jZSBhbGwgdGhlIG1vZHVsZXMgYXJlIGluaXRpYWxpemVkLlxyXG4gICAgICAgICAqIHVzZSBtb2R1bGVCdWlsZFRpbWVvdXQgdG8gbWFrZSBzdXJlIHRoaXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmJ1aWxkTW9kdWxlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5wbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbikge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucGx1Z2lucy5wdXNoKG5ldyBwbHVnaW4oX3RoaXMsICRMRykpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUudmFsaWRhdGVMaWNlbnNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MubGljZW5zZUtleSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBsaWNlbnNlIGtleScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2V0dGluZ3MubGljZW5zZUtleSA9PT0gJzAwMDAtMDAwMC0wMDAtMDAwMCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImxpZ2h0R2FsbGVyeTogXCIgKyB0aGlzLnNldHRpbmdzLmxpY2Vuc2VLZXkgKyBcIiBsaWNlbnNlIGtleSBpcyBub3QgdmFsaWQgZm9yIHByb2R1Y3Rpb24gdXNlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldFNsaWRlSXRlbSA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJExHKHRoaXMuZ2V0U2xpZGVJdGVtSWQoaW5kZXgpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0U2xpZGVJdGVtSWQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiI2xnLWl0ZW0tXCIgKyB0aGlzLmxnSWQgKyBcIi1cIiArIGluZGV4O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXRJZE5hbWUgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlkICsgXCItXCIgKyB0aGlzLmxnSWQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldEVsZW1lbnRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkTEcoXCIjXCIgKyB0aGlzLmdldElkTmFtZShpZCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5tYW5hZ2VTaW5nbGVTbGlkZUNsYXNzTmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLXNpbmdsZS1pdGVtJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1zaW5nbGUtaXRlbScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmJ1aWxkU3RydWN0dXJlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyICYmIHRoaXMuJGNvbnRhaW5lci5nZXQoKTtcclxuICAgICAgICAgICAgaWYgKGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjb250cm9scyA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgc3ViSHRtbENvbnQgPSAnJztcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGNvbnRyb2xzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbnRyb2xzKSB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9scyA9IFwiPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1wcmV2JykgKyBcIlxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnN0cmluZ3NbJ3ByZXZpb3VzU2xpZGUnXSArIFwiXFxcIiBjbGFzcz1cXFwibGctcHJldiBsZy1pY29uXFxcIj4gXCIgKyB0aGlzLnNldHRpbmdzLnByZXZIdG1sICsgXCIgPC9idXR0b24+XFxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctbmV4dCcpICsgXCJcXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy5zdHJpbmdzWyduZXh0U2xpZGUnXSArIFwiXFxcIiBjbGFzcz1cXFwibGctbmV4dCBsZy1pY29uXFxcIj4gXCIgKyB0aGlzLnNldHRpbmdzLm5leHRIdG1sICsgXCIgPC9idXR0b24+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYXBwZW5kU3ViSHRtbFRvICE9PSAnLmxnLWl0ZW0nKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJIdG1sQ29udCA9XHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJsZy1zdWItaHRtbFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj48L2Rpdj4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBhZGRDbGFzc2VzID0gJyc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFsbG93TWVkaWFPdmVybGFwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgcmVtb3ZlIHNwYWNlIGJlZm9yZSBsYXN0IHNpbmdsZSBxdW90ZVxyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3NlcyArPSAnbGctbWVkaWEtb3ZlcmxhcCAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBhcmlhTGFiZWxsZWRieSA9IHRoaXMuc2V0dGluZ3MuYXJpYUxhYmVsbGVkYnlcclxuICAgICAgICAgICAgICAgID8gJ2FyaWEtbGFiZWxsZWRieT1cIicgKyB0aGlzLnNldHRpbmdzLmFyaWFMYWJlbGxlZGJ5ICsgJ1wiJ1xyXG4gICAgICAgICAgICAgICAgOiAnJztcclxuICAgICAgICAgICAgdmFyIGFyaWFEZXNjcmliZWRieSA9IHRoaXMuc2V0dGluZ3MuYXJpYURlc2NyaWJlZGJ5XHJcbiAgICAgICAgICAgICAgICA/ICdhcmlhLWRlc2NyaWJlZGJ5PVwiJyArIHRoaXMuc2V0dGluZ3MuYXJpYURlc2NyaWJlZGJ5ICsgJ1wiJ1xyXG4gICAgICAgICAgICAgICAgOiAnJztcclxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lckNsYXNzTmFtZSA9IFwibGctY29udGFpbmVyIFwiICsgdGhpcy5zZXR0aW5ncy5hZGRDbGFzcyArIFwiIFwiICsgKGRvY3VtZW50LmJvZHkgIT09IHRoaXMuc2V0dGluZ3MuY29udGFpbmVyID8gJ2xnLWlubGluZScgOiAnJyk7XHJcbiAgICAgICAgICAgIHZhciBjbG9zZUljb24gPSB0aGlzLnNldHRpbmdzLmNsb3NhYmxlICYmIHRoaXMuc2V0dGluZ3Muc2hvd0Nsb3NlSWNvblxyXG4gICAgICAgICAgICAgICAgPyBcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Muc3RyaW5nc1snY2xvc2VHYWxsZXJ5J10gKyBcIlxcXCIgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLWNsb3NlJykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLWNsb3NlIGxnLWljb25cXFwiPjwvYnV0dG9uPlwiXHJcbiAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICB2YXIgbWF4aW1pemVJY29uID0gdGhpcy5zZXR0aW5ncy5zaG93TWF4aW1pemVJY29uXHJcbiAgICAgICAgICAgICAgICA/IFwiPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy5zdHJpbmdzWyd0b2dnbGVNYXhpbWl6ZSddICsgXCJcXFwiIGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1tYXhpbWl6ZScpICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1tYXhpbWl6ZSBsZy1pY29uXFxcIj48L2J1dHRvbj5cIlxyXG4gICAgICAgICAgICAgICAgOiAnJztcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIlwiICsgY29udGFpbmVyQ2xhc3NOYW1lICsgXCJcXFwiIGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1jb250YWluZXInKSArIFwiXFxcIiB0YWJpbmRleD1cXFwiLTFcXFwiIGFyaWEtbW9kYWw9XFxcInRydWVcXFwiIFwiICsgYXJpYUxhYmVsbGVkYnkgKyBcIiBcIiArIGFyaWFEZXNjcmliZWRieSArIFwiIHJvbGU9XFxcImRpYWxvZ1xcXCJcXG4gICAgICAgID5cXG4gICAgICAgICAgICA8ZGl2IGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1iYWNrZHJvcCcpICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1iYWNrZHJvcFxcXCI+PC9kaXY+XFxuXFxuICAgICAgICAgICAgPGRpdiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctb3V0ZXInKSArIFwiXFxcIiBjbGFzcz1cXFwibGctb3V0ZXIgbGctdXNlLWNzczMgbGctY3NzMyBsZy1oaWRlLWl0ZW1zIFwiICsgYWRkQ2xhc3NlcyArIFwiIFxcXCI+XFxuXFxuICAgICAgICAgICAgICA8ZGl2IGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1jb250ZW50JykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1pbm5lcicpICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1pbm5lclxcXCI+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICBcIiArIGNvbnRyb2xzICsgXCJcXG4gICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy10b29sYmFyJykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLXRvb2xiYXIgbGctZ3JvdXBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgXCIgKyBtYXhpbWl6ZUljb24gKyBcIlxcbiAgICAgICAgICAgICAgICAgICAgXCIgKyBjbG9zZUljb24gKyBcIlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICBcIiArICh0aGlzLnNldHRpbmdzLmFwcGVuZFN1Ykh0bWxUbyA9PT0gJy5sZy1vdXRlcidcclxuICAgICAgICAgICAgICAgID8gc3ViSHRtbENvbnRcclxuICAgICAgICAgICAgICAgIDogJycpICsgXCJcXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctY29tcG9uZW50cycpICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1jb21wb25lbnRzXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIFwiICsgKHRoaXMuc2V0dGluZ3MuYXBwZW5kU3ViSHRtbFRvID09PSAnLmxnLXN1Yi1odG1sJ1xyXG4gICAgICAgICAgICAgICAgPyBzdWJIdG1sQ29udFxyXG4gICAgICAgICAgICAgICAgOiAnJykgKyBcIlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCI7XHJcbiAgICAgICAgICAgICRMRyh0aGlzLnNldHRpbmdzLmNvbnRhaW5lcikuYXBwZW5kKHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkgIT09IHRoaXMuc2V0dGluZ3MuY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAkTEcodGhpcy5zZXR0aW5ncy5jb250YWluZXIpLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm91dGVyID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctb3V0ZXInKTtcclxuICAgICAgICAgICAgdGhpcy4kbGdDb21wb25lbnRzID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctY29tcG9uZW50cycpO1xyXG4gICAgICAgICAgICB0aGlzLiRiYWNrZHJvcCA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLWJhY2tkcm9wJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lciA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICB0aGlzLiRpbm5lciA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLWlubmVyJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbnRlbnQgPSB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1jb250ZW50Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuJHRvb2xiYXIgPSB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy10b29sYmFyJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGJhY2tkcm9wLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMuc2V0dGluZ3MuYmFja2Ryb3BEdXJhdGlvbiArICdtcycpO1xyXG4gICAgICAgICAgICB2YXIgb3V0ZXJDbGFzc05hbWVzID0gdGhpcy5zZXR0aW5ncy5tb2RlICsgXCIgXCI7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU2luZ2xlU2xpZGVDbGFzc05hbWUoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZW5hYmxlRHJhZykge1xyXG4gICAgICAgICAgICAgICAgb3V0ZXJDbGFzc05hbWVzICs9ICdsZy1ncmFiICc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vdXRlci5hZGRDbGFzcyhvdXRlckNsYXNzTmFtZXMpO1xyXG4gICAgICAgICAgICB0aGlzLiRpbm5lci5jc3MoJ3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uJywgdGhpcy5zZXR0aW5ncy5lYXNpbmcpO1xyXG4gICAgICAgICAgICB0aGlzLiRpbm5lci5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCB0aGlzLnNldHRpbmdzLnNwZWVkICsgJ21zJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmRvd25sb2FkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0b29sYmFyLmFwcGVuZChcIjxhIGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1kb3dubG9hZCcpICsgXCJcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIiByZWw9XFxcIm5vb3BlbmVyXFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Muc3RyaW5nc1snZG93bmxvYWQnXSArIFwiXFxcIiBkb3dubG9hZCBjbGFzcz1cXFwibGctZG93bmxvYWQgbGctaWNvblxcXCI+PC9hPlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvdW50ZXIoKTtcclxuICAgICAgICAgICAgJExHKHdpbmRvdykub24oXCJyZXNpemUubGcuZ2xvYmFsXCIgKyB0aGlzLmxnSWQgKyBcIiBvcmllbnRhdGlvbmNoYW5nZS5sZy5nbG9iYWxcIiArIHRoaXMubGdJZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVmcmVzaE9uUmVzaXplKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVCYXJzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlQ2xvc2VHYWxsZXJ5KCk7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlTWF4aW1pemUoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0TW9kdWxlcygpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5yZWZyZXNoT25SZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxnT3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudEdhbGxlcnlJdGVtID0gdGhpcy5nYWxsZXJ5SXRlbXNbdGhpcy5pbmRleF07XHJcbiAgICAgICAgICAgICAgICB2YXIgX19zbGlkZVZpZGVvSW5mbyA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5fX3NsaWRlVmlkZW9JbmZvO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZWRpYUNvbnRhaW5lclBvc2l0aW9uID0gdGhpcy5nZXRNZWRpYUNvbnRhaW5lclBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2EgPSB0aGlzLm1lZGlhQ29udGFpbmVyUG9zaXRpb24sIHRvcF8xID0gX2EudG9wLCBib3R0b20gPSBfYS5ib3R0b207XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbWFnZVNpemUgPSB1dGlscy5nZXRTaXplKHRoaXMuaXRlbXNbdGhpcy5pbmRleF0sIHRoaXMub3V0ZXIsIHRvcF8xICsgYm90dG9tLCBfX3NsaWRlVmlkZW9JbmZvICYmIHRoaXMuc2V0dGluZ3MudmlkZW9NYXhTaXplKTtcclxuICAgICAgICAgICAgICAgIGlmIChfX3NsaWRlVmlkZW9JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVWaWRlb1NsaWRlKHRoaXMuaW5kZXgsIHRoaXMuY3VycmVudEltYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy56b29tRnJvbU9yaWdpbiAmJiAhdGhpcy5pc0R1bW15SW1hZ2VSZW1vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGltZ1N0eWxlID0gdGhpcy5nZXREdW1teUltZ1N0eWxlcyh0aGlzLmN1cnJlbnRJbWFnZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1jdXJyZW50IC5sZy1kdW1teS1pbWcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3R5bGUnLCBpbWdTdHlsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5jb250YWluZXJSZXNpemUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnJlc2l6ZVZpZGVvU2xpZGUgPSBmdW5jdGlvbiAoaW5kZXgsIGltYWdlU2l6ZSkge1xyXG4gICAgICAgICAgICB2YXIgbGdWaWRlb1N0eWxlID0gdGhpcy5nZXRWaWRlb0NvbnRTdHlsZShpbWFnZVNpemUpO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFNsaWRlID0gdGhpcy5nZXRTbGlkZUl0ZW0oaW5kZXgpO1xyXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUuZmluZCgnLmxnLXZpZGVvLWNvbnQnKS5hdHRyKCdzdHlsZScsIGxnVmlkZW9TdHlsZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVcGRhdGUgc2xpZGVzIGR5bmFtaWNhbGx5LlxyXG4gICAgICAgICAqIEFkZCwgZWRpdCBvciBkZWxldGUgc2xpZGVzIGR5bmFtaWNhbGx5IHdoZW4gbGlnaHRHYWxsZXJ5IGlzIG9wZW5lZC5cclxuICAgICAgICAgKiBNb2RpZnkgdGhlIGN1cnJlbnQgZ2FsbGVyeSBpdGVtcyBhbmQgcGFzcyBpdCB2aWEgdXBkYXRlU2xpZGVzIG1ldGhvZFxyXG4gICAgICAgICAqIEBub3RlXHJcbiAgICAgICAgICogLSBEbyBub3QgbXV0YXRlIGV4aXN0aW5nIGxpZ2h0R2FsbGVyeSBpdGVtcyBkaXJlY3RseS5cclxuICAgICAgICAgKiAtIEFsd2F5cyBwYXNzIG5ldyBsaXN0IG9mIGdhbGxlcnkgaXRlbXNcclxuICAgICAgICAgKiAtIFlvdSBuZWVkIHRvIHRha2UgY2FyZSBvZiB0aHVtYm5haWxzIG91dHNpZGUgdGhlIGdhbGxlcnkgaWYgYW55XHJcbiAgICAgICAgICogLSB1c2VyIHRoaXMgbWV0aG9kIG9ubHkgaWYgeW91IHdhbnQgdG8gdXBkYXRlIHNsaWRlcyB3aGVuIHRoZSBnYWxsZXJ5IGlzIG9wZW5lZC4gT3RoZXJ3aXNlLCB1c2UgYHJlZnJlc2goKWAgbWV0aG9kLlxyXG4gICAgICAgICAqIEBwYXJhbSBpdGVtcyBHYWxsZXJ5IGl0ZW1zXHJcbiAgICAgICAgICogQHBhcmFtIGluZGV4IEFmdGVyIHRoZSB1cGRhdGUgb3BlcmF0aW9uLCB3aGljaCBzbGlkZSBnYWxsZXJ5IHNob3VsZCBuYXZpZ2F0ZSB0b1xyXG4gICAgICAgICAqIEBjYXRlZ29yeSBsR1B1YmxpY01ldGhvZHNcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIGNvbnN0IHBsdWdpbiA9IGxpZ2h0R2FsbGVyeSgpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogLy8gQWRkaW5nIHNsaWRlcyBkeW5hbWljYWxseVxyXG4gICAgICAgICAqIGxldCBnYWxsZXJ5SXRlbXMgPSBbXHJcbiAgICAgICAgICogLy8gQWNjZXNzIGV4aXN0aW5nIGxpZ2h0R2FsbGVyeSBpdGVtc1xyXG4gICAgICAgICAqIC8vIGdhbGxlcnlJdGVtcyBhcmUgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgaW50ZXJuYWxseSBmcm9tIHRoZSBnYWxsZXJ5IEhUTUwgbWFya3VwXHJcbiAgICAgICAgICogLy8gb3IgZGlyZWN0bHkgZnJvbSBnYWxsZXJ5SXRlbXMgd2hlbiBkeW5hbWljIGdhbGxlcnkgaXMgdXNlZFxyXG4gICAgICAgICAqICAgLi4ucGx1Z2luLmdhbGxlcnlJdGVtcyxcclxuICAgICAgICAgKiAgICAgLi4uW1xyXG4gICAgICAgICAqICAgICAgIHtcclxuICAgICAgICAgKiAgICAgICAgIHNyYzogJ2ltZy9pbWctMS5wbmcnLFxyXG4gICAgICAgICAqICAgICAgICAgICB0aHVtYjogJ2ltZy90aHVtYjEucG5nJyxcclxuICAgICAgICAgKiAgICAgICAgIH0sXHJcbiAgICAgICAgICogICAgIF0sXHJcbiAgICAgICAgICogICBdO1xyXG4gICAgICAgICAqICAgcGx1Z2luLnVwZGF0ZVNsaWRlcyhcclxuICAgICAgICAgKiAgICAgZ2FsbGVyeUl0ZW1zLFxyXG4gICAgICAgICAqICAgICBwbHVnaW4uaW5kZXgsXHJcbiAgICAgICAgICogICApO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAvLyBSZW1vdmUgc2xpZGVzIGR5bmFtaWNhbGx5XHJcbiAgICAgICAgICogZ2FsbGVyeUl0ZW1zID0gSlNPTi5wYXJzZShcclxuICAgICAgICAgKiAgIEpTT04uc3RyaW5naWZ5KHVwZGF0ZVNsaWRlSW5zdGFuY2UuZ2FsbGVyeUl0ZW1zKSxcclxuICAgICAgICAgKiApO1xyXG4gICAgICAgICAqIGdhbGxlcnlJdGVtcy5zaGlmdCgpO1xyXG4gICAgICAgICAqIHVwZGF0ZVNsaWRlSW5zdGFuY2UudXBkYXRlU2xpZGVzKGdhbGxlcnlJdGVtcywgMSk7XHJcbiAgICAgICAgICogQHNlZSA8YSBocmVmPVwiL2RlbW9zL3VwZGF0ZS1zbGlkZXMvXCI+RGVtbzwvYT5cclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnVwZGF0ZVNsaWRlcyA9IGZ1bmN0aW9uIChpdGVtcywgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPiBpdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUdhbGxlcnkoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY3VycmVudFNyYyA9IHRoaXMuZ2FsbGVyeUl0ZW1zW2luZGV4XS5zcmM7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FsbGVyeUl0ZW1zID0gaXRlbXM7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29udHJvbHMoKTtcclxuICAgICAgICAgICAgdGhpcy4kaW5uZXIuZW1wdHkoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbXNJbkRvbSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgX2luZGV4ID0gMDtcclxuICAgICAgICAgICAgLy8gRmluZCB0aGUgY3VycmVudCBpbmRleCBiYXNlZCBvbiBzb3VyY2UgdmFsdWUgb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICAgIHRoaXMuZ2FsbGVyeUl0ZW1zLnNvbWUoZnVuY3Rpb24gKGdhbGxlcnlJdGVtLCBpdGVtSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChnYWxsZXJ5SXRlbS5zcmMgPT09IGN1cnJlbnRTcmMpIHtcclxuICAgICAgICAgICAgICAgICAgICBfaW5kZXggPSBpdGVtSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJdGVtc0luRG9tID0gdGhpcy5vcmdhbml6ZVNsaWRlSXRlbXMoX2luZGV4LCAtMSk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZENvbnRlbnQoX2luZGV4LCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRTbGlkZUl0ZW0oX2luZGV4KS5hZGRDbGFzcygnbGctY3VycmVudCcpO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gX2luZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRDb3VudGVyKF9pbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLnVwZGF0ZVNsaWRlcyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBHZXQgZ2FsbGVyeSBpdGVtcyBiYXNlZCBvbiBtdWx0aXBsZSBjb25kaXRpb25zXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gR2FsbGVyeSBpdGVtc1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5keW5hbWljKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zZWxlY3RvciA9PT0gJ3RoaXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHRoaXMuZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5zZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZXR0aW5ncy5zZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2VsZWN0V2l0aGluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0V2l0aGluID0gJExHKHRoaXMuc2V0dGluZ3Muc2VsZWN0V2l0aGluKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBzZWxlY3RXaXRoaW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCh0aGlzLnNldHRpbmdzLnNlbGVjdG9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZXR0aW5ncy5zZWxlY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLnNldHRpbmdzLnNlbGVjdG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmVsLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHV0aWxzLmdldER5bmFtaWNPcHRpb25zKHRoaXMuaXRlbXMsIHRoaXMuc2V0dGluZ3MuZXh0cmFQcm9wcywgdGhpcy5zZXR0aW5ncy5nZXRDYXB0aW9uRnJvbVRpdGxlT3JBbHQsIHRoaXMuc2V0dGluZ3MuZXhUaHVtYkltYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmR5bmFtaWNFbCB8fCBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3BlbiBsaWdodEdhbGxlcnkuXHJcbiAgICAgICAgICogT3BlbiBnYWxsZXJ5IHdpdGggc3BlY2lmaWMgc2xpZGUgYnkgcGFzc2luZyBpbmRleCBvZiB0aGUgc2xpZGUgYXMgcGFyYW1ldGVyLlxyXG4gICAgICAgICAqIEBjYXRlZ29yeSBsR1B1YmxpY01ldGhvZHNcclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggIC0gaW5kZXggb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIFdoaWNoIGltYWdlIGxpZ2h0R2FsbGVyeSBzaG91bGQgem9vbSBmcm9tXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIGNvbnN0ICRkeW5hbWljR2FsbGVyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkeW5hbWljLWdhbGxlcnktZGVtbycpO1xyXG4gICAgICAgICAqIGNvbnN0IGR5bmFtaWNHYWxsZXJ5ID0gbGlnaHRHYWxsZXJ5KCRkeW5hbWljR2FsbGVyeSwge1xyXG4gICAgICAgICAqICAgICBkeW5hbWljOiB0cnVlLFxyXG4gICAgICAgICAqICAgICBkeW5hbWljRWw6IFtcclxuICAgICAgICAgKiAgICAgICAgIHtcclxuICAgICAgICAgKiAgICAgICAgICAgICAgc3JjOiAnaW1nLzEuanBnJyxcclxuICAgICAgICAgKiAgICAgICAgICAgICAgdGh1bWI6ICdpbWcvdGh1bWItMS5qcGcnLFxyXG4gICAgICAgICAqICAgICAgICAgICAgICBzdWJIdG1sOiAnPGg0PkltYWdlIDEgdGl0bGU8L2g0PjxwPkltYWdlIDEgZGVzY3JpcHRpb25zLjwvcD4nLFxyXG4gICAgICAgICAqICAgICAgICAgfSxcclxuICAgICAgICAgKiAgICAgICAgIC4uLlxyXG4gICAgICAgICAqICAgICBdLFxyXG4gICAgICAgICAqIH0pO1xyXG4gICAgICAgICAqICRkeW5hbWljR2FsbGVyeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgKiAgICAgLy8gU3RhcnRzIHdpdGggdGhpcmQgaXRlbS4oT3B0aW9uYWwpLlxyXG4gICAgICAgICAqICAgICAvLyBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd2FudCB1c2UgZHluYW1pYyBtb2RlIHdpdGhcclxuICAgICAgICAgKiAgICAgLy8gY3VzdG9tIHRodW1ibmFpbHMgKHRodW1ibmFpbHMgb3V0c2lkZSBnYWxsZXJ5KSxcclxuICAgICAgICAgKiAgICAgZHluYW1pY0dhbGxlcnkub3BlbkdhbGxlcnkoMik7XHJcbiAgICAgICAgICogfSk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLm9wZW5HYWxsZXJ5ID0gZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdm9pZCAwKSB7IGluZGV4ID0gdGhpcy5zZXR0aW5ncy5pbmRleDsgfVxyXG4gICAgICAgICAgICAvLyBwcmV2ZW50IGFjY2lkZW50YWwgZG91YmxlIGV4ZWN1dGlvblxyXG4gICAgICAgICAgICBpZiAodGhpcy5sZ09wZW5lZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5sZ09wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMub3V0ZXIuZ2V0KCkuZm9jdXMoKTtcclxuICAgICAgICAgICAgdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctaGlkZS1pdGVtcycpO1xyXG4gICAgICAgICAgICAvLyBBZGQgZGlzcGxheSBibG9jaywgYnV0IHN0aWxsIGhhcyBvcGFjaXR5IDBcclxuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLmFkZENsYXNzKCdsZy1zaG93Jyk7XHJcbiAgICAgICAgICAgIHZhciBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tID0gdGhpcy5nZXRJdGVtc1RvQmVJbnNlcnRlZFRvRG9tKGluZGV4LCBpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEl0ZW1zSW5Eb20gPSBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tO1xyXG4gICAgICAgICAgICB2YXIgaXRlbXMgPSAnJztcclxuICAgICAgICAgICAgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtcyA9IGl0ZW1zICsgKFwiPGRpdiBpZD1cXFwiXCIgKyBpdGVtICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1pdGVtXFxcIj48L2Rpdj5cIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRpbm5lci5hcHBlbmQoaXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEh0bWwoaW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMubWVkaWFDb250YWluZXJQb3NpdGlvbiA9IHRoaXMuZ2V0TWVkaWFDb250YWluZXJQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB2YXIgX2EgPSB0aGlzLm1lZGlhQ29udGFpbmVyUG9zaXRpb24sIHRvcCA9IF9hLnRvcCwgYm90dG9tID0gX2EuYm90dG9tO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuYWxsb3dNZWRpYU92ZXJsYXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWVkaWFDb250YWluZXJQb3NpdGlvbih0b3AsIGJvdHRvbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIF9fc2xpZGVWaWRlb0luZm8gPSB0aGlzLmdhbGxlcnlJdGVtc1tpbmRleF0uX19zbGlkZVZpZGVvSW5mbztcclxuICAgICAgICAgICAgaWYgKHRoaXMuem9vbUZyb21PcmlnaW4gJiYgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2VTaXplID0gdXRpbHMuZ2V0U2l6ZShlbGVtZW50LCB0aGlzLm91dGVyLCB0b3AgKyBib3R0b20sIF9fc2xpZGVWaWRlb0luZm8gJiYgdGhpcy5zZXR0aW5ncy52aWRlb01heFNpemUpO1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtID0gdXRpbHMuZ2V0VHJhbnNmb3JtKGVsZW1lbnQsIHRoaXMub3V0ZXIsIHRvcCwgYm90dG9tLCB0aGlzLmN1cnJlbnRJbWFnZVNpemUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy56b29tRnJvbU9yaWdpbiB8fCAhdHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKHRoaXMuc2V0dGluZ3Muc3RhcnRDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFNsaWRlSXRlbShpbmRleCkucmVtb3ZlQ2xhc3MoJ2xnLWNvbXBsZXRlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHRpbWVvdXQgPSB0aGlzLnNldHRpbmdzLnpvb21Gcm9tT3JpZ2luXHJcbiAgICAgICAgICAgICAgICA/IDEwMFxyXG4gICAgICAgICAgICAgICAgOiB0aGlzLnNldHRpbmdzLmJhY2tkcm9wRHVyYXRpb247XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLWNvbXBvbmVudHMtb3BlbicpO1xyXG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcclxuICAgICAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5iZWZvcmVPcGVuKTtcclxuICAgICAgICAgICAgLy8gYWRkIGNsYXNzIGxnLWN1cnJlbnQgdG8gcmVtb3ZlIGluaXRpYWwgdHJhbnNpdGlvblxyXG4gICAgICAgICAgICB0aGlzLmdldFNsaWRlSXRlbShpbmRleCkuYWRkQ2xhc3MoJ2xnLWN1cnJlbnQnKTtcclxuICAgICAgICAgICAgdGhpcy5sR2FsbGVyeU9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFN0b3JlIHRoZSBjdXJyZW50IHNjcm9sbCB0b3AgdmFsdWUgdG8gc2Nyb2xsIGJhY2sgYWZ0ZXIgY2xvc2luZyB0aGUgZ2FsbGVyeS4uXHJcbiAgICAgICAgICAgIHRoaXMucHJldlNjcm9sbFRvcCA9ICRMRyh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIE5lZWQgdG8gY2hlY2sgYm90aCB6b29tRnJvbU9yaWdpbiBhbmQgdHJhbnNmb3JtIHZhbHVlcyBhcyB3ZSBuZWVkIHRvIHNldCBzZXQgdGhlXHJcbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IG9wZW5pbmcgYW5pbWF0aW9uIGlmIHVzZXIgbWlzc2VkIHRvIGFkZCB0aGUgbGctc2l6ZSBhdHRyaWJ1dGVcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy56b29tRnJvbU9yaWdpbiAmJiB0cmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudFNsaWRlXzEgPSBfdGhpcy5nZXRTbGlkZUl0ZW0oaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZV8xLmNzcygndHJhbnNmb3JtJywgdHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlXzFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbGctc3RhcnQtcHJvZ3Jlc3MgbGctc3RhcnQtZW5kLXByb2dyZXNzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCBfdGhpcy5zZXR0aW5ncy5zdGFydEFuaW1hdGlvbkR1cmF0aW9uICsgJ21zJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmFkZENsYXNzKCdsZy16b29tLWZyb20taW1hZ2UnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlXzEuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoMCwgMCwgMCknKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGJhY2tkcm9wLmFkZENsYXNzKCdpbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiRjb250YWluZXIuYWRkQ2xhc3MoJ2xnLXNob3ctaW4nKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgICAgICAgIC8vIGxnLXZpc2libGUgY2xhc3MgcmVzZXRzIGdhbGxlcnkgb3BhY2l0eSB0byAxXHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLnpvb21Gcm9tT3JpZ2luIHx8ICF0cmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBfdGhpcy5zZXR0aW5ncy5iYWNrZHJvcER1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGluaXRpYXRlIHNsaWRlIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zbGlkZShpbmRleCwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuYWZ0ZXJPcGVuKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5ib2R5ID09PSB0aGlzLnNldHRpbmdzLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgJExHKCdodG1sJykuYWRkQ2xhc3MoJ2xnLW9uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5vdGUgLSBDaGFuZ2luZyB0aGUgcG9zaXRpb24gb2YgdGhlIG1lZGlhIG9uIGV2ZXJ5IHNsaWRlIHRyYW5zaXRpb24gY3JlYXRlcyBhIGZsaWNrZXJpbmcgZWZmZWN0LlxyXG4gICAgICAgICAqIFRoZXJlZm9yZSzCoFRoZSBoZWlnaHQgb2YgdGhlIGNhcHRpb24gaXMgY2FsY3VsYXRlZCBkeW5hbWljYWxseSwgb25seSBvbmNlIGJhc2VkIG9uIHRoZSBmaXJzdCBzbGlkZSBjYXB0aW9uLlxyXG4gICAgICAgICAqIGlmIHlvdSBoYXZlIGR5bmFtaWMgY2FwdGlvbnMgZm9yIGVhY2ggbWVkaWEsXHJcbiAgICAgICAgICogeW91IGNhbiBwcm92aWRlIGFuIGFwcHJvcHJpYXRlIGhlaWdodCBmb3IgdGhlIGNhcHRpb25zIHZpYSBhbGxvd01lZGlhT3ZlcmxhcCBvcHRpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldE1lZGlhQ29udGFpbmVyUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFsbG93TWVkaWFPdmVybGFwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgICAgICBib3R0b206IDAsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB0b3AgPSB0aGlzLiR0b29sYmFyLmdldCgpLmNsaWVudEhlaWdodCB8fCAwO1xyXG4gICAgICAgICAgICB2YXIgc3ViSHRtbCA9IHRoaXMub3V0ZXIuZmluZCgnLmxnLWNvbXBvbmVudHMgLmxnLXN1Yi1odG1sJykuZ2V0KCk7XHJcbiAgICAgICAgICAgIHZhciBjYXB0aW9uSGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5kZWZhdWx0Q2FwdGlvbkhlaWdodCB8fFxyXG4gICAgICAgICAgICAgICAgKHN1Ykh0bWwgJiYgc3ViSHRtbC5jbGllbnRIZWlnaHQpIHx8XHJcbiAgICAgICAgICAgICAgICAwO1xyXG4gICAgICAgICAgICB2YXIgdGh1bWJDb250YWluZXIgPSB0aGlzLm91dGVyLmZpbmQoJy5sZy10aHVtYi1vdXRlcicpLmdldCgpO1xyXG4gICAgICAgICAgICB2YXIgdGh1bWJIZWlnaHQgPSB0aHVtYkNvbnRhaW5lciA/IHRodW1iQ29udGFpbmVyLmNsaWVudEhlaWdodCA6IDA7XHJcbiAgICAgICAgICAgIHZhciBib3R0b20gPSB0aHVtYkhlaWdodCArIGNhcHRpb25IZWlnaHQ7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0b3A6IHRvcCxcclxuICAgICAgICAgICAgICAgIGJvdHRvbTogYm90dG9tLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5zZXRNZWRpYUNvbnRhaW5lclBvc2l0aW9uID0gZnVuY3Rpb24gKHRvcCwgYm90dG9tKSB7XHJcbiAgICAgICAgICAgIGlmICh0b3AgPT09IHZvaWQgMCkgeyB0b3AgPSAwOyB9XHJcbiAgICAgICAgICAgIGlmIChib3R0b20gPT09IHZvaWQgMCkgeyBib3R0b20gPSAwOyB9XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbnRlbnQuY3NzKCd0b3AnLCB0b3AgKyAncHgnKS5jc3MoJ2JvdHRvbScsIGJvdHRvbSArICdweCcpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5oaWRlQmFycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgLy8gSGlkZSBjb250cm9sbGVycyBpZiBtb3VzZSBkb2Vzbid0IG1vdmUgZm9yIHNvbWUgcGVyaW9kXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWhpZGUtaXRlbXMnKTtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zZXR0aW5ncy5oaWRlQmFyc0RlbGF5ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLm9uKCdtb3VzZW1vdmUubGcgY2xpY2subGcgdG91Y2hzdGFydC5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWhpZGUtaXRlbXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLmhpZGVCYXJUaW1lb3V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGltZW91dCB3aWxsIGJlIGNsZWFyZWQgb24gZWFjaCBzbGlkZSBtb3ZlbWVudCBhbHNvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhpZGVCYXJUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5hZGRDbGFzcygnbGctaGlkZS1pdGVtcycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBfdGhpcy5zZXR0aW5ncy5oaWRlQmFyc0RlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci50cmlnZ2VyKCdtb3VzZW1vdmUubGcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdGhpcy5zZXR0aW5ncy5zaG93QmFyc0FmdGVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuaW5pdFBpY3R1cmVGaWxsID0gZnVuY3Rpb24gKCRpbWcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc3VwcG9ydExlZ2FjeUJyb3dzZXIpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGljdHVyZWZpbGwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogWyRpbWcuZ2V0KCldLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ2xpZ2h0R2FsbGVyeSA6LSBJZiB5b3Ugd2FudCBzcmNzZXQgb3IgcGljdHVyZSB0YWcgdG8gYmUgc3VwcG9ydGVkIGZvciBvbGRlciBicm93c2VyIHBsZWFzZSBpbmNsdWRlIHBpY3R1cmVmaWwgamF2YXNjcmlwdCBsaWJyYXJ5IGluIHlvdXIgZG9jdW1lbnQuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBAZGVzYyBDcmVhdGUgaW1hZ2UgY291bnRlclxyXG4gICAgICAgICAqICBFeDogMS8xMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuY291bnRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY291bnRlcikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXJIdG1sID0gXCI8ZGl2IGNsYXNzPVxcXCJsZy1jb3VudGVyXFxcIiByb2xlPVxcXCJzdGF0dXNcXFwiIGFyaWEtbGl2ZT1cXFwicG9saXRlXFxcIj5cXG4gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLWNvdW50ZXItY3VycmVudCcpICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1jb3VudGVyLWN1cnJlbnRcXFwiPlwiICsgKHRoaXMuaW5kZXggKyAxKSArIFwiIDwvc3Bhbj4gL1xcbiAgICAgICAgICAgICAgICA8c3BhbiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctY291bnRlci1hbGwnKSArIFwiXFxcIiBjbGFzcz1cXFwibGctY291bnRlci1hbGxcXFwiPlwiICsgdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoICsgXCIgPC9zcGFuPjwvZGl2PlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5maW5kKHRoaXMuc2V0dGluZ3MuYXBwZW5kQ291bnRlclRvKS5hcHBlbmQoY291bnRlckh0bWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgQGRlc2MgYWRkIHN1Yi1odG1sIGludG8gdGhlIHNsaWRlXHJcbiAgICAgICAgICogIEBwYXJhbSB7TnVtYmVyfSBpbmRleCAtIGluZGV4IG9mIHRoZSBzbGlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuYWRkSHRtbCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICB2YXIgc3ViSHRtbDtcclxuICAgICAgICAgICAgdmFyIHN1Ykh0bWxVcmw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbGxlcnlJdGVtc1tpbmRleF0uc3ViSHRtbFVybCkge1xyXG4gICAgICAgICAgICAgICAgc3ViSHRtbFVybCA9IHRoaXMuZ2FsbGVyeUl0ZW1zW2luZGV4XS5zdWJIdG1sVXJsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3ViSHRtbCA9IHRoaXMuZ2FsbGVyeUl0ZW1zW2luZGV4XS5zdWJIdG1sO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc3ViSHRtbFVybCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1Ykh0bWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgZmlyc3QgbGV0dGVyIG9mIHN1Yi1odG1sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgZmlyc3QgbGV0dGVyIHN0YXJ0cyB3aXRoIC4gb3IgIyBnZXQgdGhlIGh0bWwgZm9ybSB0aGUgalF1ZXJ5IG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmTCA9IHN1Ykh0bWwuc3Vic3RyaW5nKDAsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmTCA9PT0gJy4nIHx8IGZMID09PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc3ViSHRtbFNlbGVjdG9yUmVsYXRpdmUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICF0aGlzLnNldHRpbmdzLmR5bmFtaWMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ykh0bWwgPSAkTEcodGhpcy5pdGVtcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZXEoaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoc3ViSHRtbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5odG1sKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJIdG1sID0gJExHKHN1Ykh0bWwpLmZpcnN0KCkuaHRtbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViSHRtbCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFwcGVuZFN1Ykh0bWxUbyAhPT0gJy5sZy1pdGVtJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1Ykh0bWxVcmwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmZpbmQoJy5sZy1zdWItaHRtbCcpLmxvYWQoc3ViSHRtbFVybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmZpbmQoJy5sZy1zdWItaHRtbCcpLmh0bWwoc3ViSHRtbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFNsaWRlID0gJExHKHRoaXMuZ2V0U2xpZGVJdGVtSWQoaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgIGlmIChzdWJIdG1sVXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLmxvYWQoc3ViSHRtbFVybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUuYXBwZW5kKFwiPGRpdiBjbGFzcz1cXFwibGctc3ViLWh0bWxcXFwiPlwiICsgc3ViSHRtbCArIFwiPC9kaXY+XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEFkZCBsZy1lbXB0eS1odG1sIGNsYXNzIGlmIHRpdGxlIGRvZXNuJ3QgZXhpc3RcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdWJIdG1sICE9PSAndW5kZWZpbmVkJyAmJiBzdWJIdG1sICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ViSHRtbCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKHRoaXMuc2V0dGluZ3MuYXBwZW5kU3ViSHRtbFRvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xnLWVtcHR5LWh0bWwnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQodGhpcy5zZXR0aW5ncy5hcHBlbmRTdWJIdG1sVG8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbGctZW1wdHktaHRtbCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmFmdGVyQXBwZW5kU3ViSHRtbCwge1xyXG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBAZGVzYyBQcmVsb2FkIHNsaWRlc1xyXG4gICAgICAgICAqICBAcGFyYW0ge051bWJlcn0gaW5kZXggLSBpbmRleCBvZiB0aGUgc2xpZGVcclxuICAgICAgICAgKiBAdG9kbyBwcmVsb2FkIG5vdCB3b3JraW5nIGZvciB0aGUgZmlyc3Qgc2xpZGUsIEFsc28sIHNob3VsZCB3b3JrIGZvciB0aGUgZmlyc3QgYW5kIGxhc3Qgc2xpZGUgYXMgd2VsbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSB0aGlzLnNldHRpbmdzLnByZWxvYWQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPj0gdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIC0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZENvbnRlbnQoaW5kZXggKyBpLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPD0gdGhpcy5zZXR0aW5ncy5wcmVsb2FkOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCAtIGogPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRDb250ZW50KGluZGV4IC0gaiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldER1bW15SW1nU3R5bGVzID0gZnVuY3Rpb24gKGltYWdlU2l6ZSkge1xyXG4gICAgICAgICAgICBpZiAoIWltYWdlU2l6ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgcmV0dXJuIFwid2lkdGg6XCIgKyBpbWFnZVNpemUud2lkdGggKyBcInB4O1xcbiAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogLVwiICsgaW1hZ2VTaXplLndpZHRoIC8gMiArIFwicHg7XFxuICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IC1cIiArIGltYWdlU2l6ZS5oZWlnaHQgLyAyICsgXCJweDtcXG4gICAgICAgICAgICAgICAgaGVpZ2h0OlwiICsgaW1hZ2VTaXplLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0VmlkZW9Db250U3R5bGUgPSBmdW5jdGlvbiAoaW1hZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIGlmICghaW1hZ2VTaXplKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ3aWR0aDpcIiArIGltYWdlU2l6ZS53aWR0aCArIFwicHg7XFxuICAgICAgICAgICAgICAgIGhlaWdodDpcIiArIGltYWdlU2l6ZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldER1bW15SW1hZ2VDb250ZW50ID0gZnVuY3Rpb24gKCRjdXJyZW50U2xpZGUsIGluZGV4LCBhbHQpIHtcclxuICAgICAgICAgICAgdmFyICRjdXJyZW50SXRlbTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmR5bmFtaWMpIHtcclxuICAgICAgICAgICAgICAgICRjdXJyZW50SXRlbSA9ICRMRyh0aGlzLml0ZW1zKS5lcShpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCRjdXJyZW50SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9kdW1teUltZ1NyYyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5leFRodW1iSW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBfZHVtbXlJbWdTcmMgPSAkY3VycmVudEl0ZW0uZmluZCgnaW1nJykuZmlyc3QoKS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF9kdW1teUltZ1NyYyA9ICRjdXJyZW50SXRlbS5hdHRyKHRoaXMuc2V0dGluZ3MuZXhUaHVtYkltYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghX2R1bW15SW1nU3JjKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgIHZhciBpbWdTdHlsZSA9IHRoaXMuZ2V0RHVtbXlJbWdTdHlsZXModGhpcy5jdXJyZW50SW1hZ2VTaXplKTtcclxuICAgICAgICAgICAgICAgIHZhciBkdW1teUltZ0NvbnRlbnQgPSBcIjxpbWcgXCIgKyBhbHQgKyBcIiBzdHlsZT1cXFwiXCIgKyBpbWdTdHlsZSArIFwiXFxcIiBjbGFzcz1cXFwibGctZHVtbXktaW1nXFxcIiBzcmM9XFxcIlwiICsgX2R1bW15SW1nU3JjICsgXCJcXFwiIC8+XCI7XHJcbiAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlLmFkZENsYXNzKCdsZy1maXJzdC1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5hZGRDbGFzcygnbGctZmlyc3Qtc2xpZGUtbG9hZGluZycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGR1bW15SW1nQ29udGVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnNldEltZ01hcmt1cCA9IGZ1bmN0aW9uIChzcmMsICRjdXJyZW50U2xpZGUsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50R2FsbGVyeUl0ZW0gPSB0aGlzLmdhbGxlcnlJdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgIHZhciBhbHQgPSBjdXJyZW50R2FsbGVyeUl0ZW0uYWx0LCBzcmNzZXQgPSBjdXJyZW50R2FsbGVyeUl0ZW0uc3Jjc2V0LCBzaXplcyA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5zaXplcywgc291cmNlcyA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5zb3VyY2VzO1xyXG4gICAgICAgICAgICAvLyBVc2UgdGhlIHRodW1ibmFpbCBhcyBkdW1teSBpbWFnZSB3aGljaCB3aWxsIGJlIHJlc2l6ZWQgdG8gYWN0dWFsIGltYWdlIHNpemUgYW5kXHJcbiAgICAgICAgICAgIC8vIGRpc3BsYXllZCBvbiB0b3Agb2YgYWN0dWFsIGltYWdlXHJcbiAgICAgICAgICAgIHZhciBpbWdDb250ZW50ID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBhbHRBdHRyID0gYWx0ID8gJ2FsdD1cIicgKyBhbHQgKyAnXCInIDogJyc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRmlyc3RTbGlkZVdpdGhab29tQW5pbWF0aW9uKCkpIHtcclxuICAgICAgICAgICAgICAgIGltZ0NvbnRlbnQgPSB0aGlzLmdldER1bW15SW1hZ2VDb250ZW50KCRjdXJyZW50U2xpZGUsIGluZGV4LCBhbHRBdHRyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGltZ0NvbnRlbnQgPSB1dGlscy5nZXRJbWdNYXJrdXAoaW5kZXgsIHNyYywgYWx0QXR0ciwgc3Jjc2V0LCBzaXplcywgc291cmNlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGltZ01hcmt1cCA9IFwiPHBpY3R1cmUgY2xhc3M9XFxcImxnLWltZy13cmFwXFxcIj4gXCIgKyBpbWdDb250ZW50ICsgXCI8L3BpY3R1cmU+XCI7XHJcbiAgICAgICAgICAgICRjdXJyZW50U2xpZGUucHJlcGVuZChpbWdNYXJrdXApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5vblNsaWRlT2JqZWN0TG9hZCA9IGZ1bmN0aW9uICgkc2xpZGUsIGlzSFRNTDVWaWRlb1dpdGhvdXRQb3N0ZXIsIG9uTG9hZCwgb25FcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVkaWFPYmplY3QgPSAkc2xpZGUuZmluZCgnLmxnLW9iamVjdCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5pc0ltYWdlTG9hZGVkKG1lZGlhT2JqZWN0LmdldCgpKSB8fFxyXG4gICAgICAgICAgICAgICAgaXNIVE1MNVZpZGVvV2l0aG91dFBvc3Rlcikge1xyXG4gICAgICAgICAgICAgICAgb25Mb2FkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZWRpYU9iamVjdC5vbignbG9hZC5sZyBlcnJvci5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkxvYWQgJiYgb25Mb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG1lZGlhT2JqZWN0Lm9uKCdlcnJvci5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkVycm9yICYmIG9uRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSAkZWwgQ3VycmVudCBzbGlkZSBpdGVtXHJcbiAgICAgICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgICAgICogQHBhcmFtIGRlbGF5IERlbGF5IGlzIDAgZXhjZXB0IGZpcnN0IHRpbWVcclxuICAgICAgICAgKiBAcGFyYW0gc3BlZWQgU3BlZWQgaXMgc2FtZSBhcyBkZWxheSwgZXhjZXB0IGl0IGlzIDAgaWYgZ2FsbGVyeSBpcyBvcGVuZWQgdmlhIGhhc2ggcGx1Z2luXHJcbiAgICAgICAgICogQHBhcmFtIGlzRmlyc3RTbGlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUub25MZ09iamVjdExvYWQgPSBmdW5jdGlvbiAoY3VycmVudFNsaWRlLCBpbmRleCwgZGVsYXksIHNwZWVkLCBpc0ZpcnN0U2xpZGUsIGlzSFRNTDVWaWRlb1dpdGhvdXRQb3N0ZXIpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5vblNsaWRlT2JqZWN0TG9hZChjdXJyZW50U2xpZGUsIGlzSFRNTDVWaWRlb1dpdGhvdXRQb3N0ZXIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnRyaWdnZXJTbGlkZUl0ZW1Mb2FkKGN1cnJlbnRTbGlkZSwgaW5kZXgsIGRlbGF5LCBzcGVlZCwgaXNGaXJzdFNsaWRlKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLmFkZENsYXNzKCdsZy1jb21wbGV0ZSBsZy1jb21wbGV0ZV8nKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5odG1sKCc8c3BhbiBjbGFzcz1cImxnLWVycm9yLW1zZ1wiPk9vcHMuLi4gRmFpbGVkIHRvIGxvYWQgY29udGVudC4uLjwvc3Bhbj4nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnRyaWdnZXJTbGlkZUl0ZW1Mb2FkID0gZnVuY3Rpb24gKCRjdXJyZW50U2xpZGUsIGluZGV4LCBkZWxheSwgc3BlZWQsIGlzRmlyc3RTbGlkZSkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEdhbGxlcnlJdGVtID0gdGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAvLyBBZGRpbmcgZGVsYXkgZm9yIHZpZGVvIHNsaWRlcyB3aXRob3V0IHBvc3RlciBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlIGFuZCB1c2VyIGV4cGVyaWVuY2VcclxuICAgICAgICAgICAgLy8gVmlkZW9zIHNob3VsZCBzdGFydCBwbGF5aW5nIG9uY2Ugb25jZSB0aGUgZ2FsbGVyeSBpcyBjb21wbGV0ZWx5IGxvYWRlZFxyXG4gICAgICAgICAgICB2YXIgX3NwZWVkID0gaXNGaXJzdFNsaWRlICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFNsaWRlVHlwZShjdXJyZW50R2FsbGVyeUl0ZW0pID09PSAndmlkZW8nICYmXHJcbiAgICAgICAgICAgICAgICAhY3VycmVudEdhbGxlcnlJdGVtLnBvc3RlclxyXG4gICAgICAgICAgICAgICAgPyBzcGVlZFxyXG4gICAgICAgICAgICAgICAgOiAwO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUuYWRkQ2xhc3MoJ2xnLWNvbXBsZXRlIGxnLWNvbXBsZXRlXycpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLnNsaWRlSXRlbUxvYWQsIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsYXk6IGRlbGF5IHx8IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNGaXJzdFNsaWRlOiBpc0ZpcnN0U2xpZGUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgX3NwZWVkKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuaXNGaXJzdFNsaWRlV2l0aFpvb21BbmltYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhISghdGhpcy5sR2FsbGVyeU9uICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnpvb21Gcm9tT3JpZ2luICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbWFnZVNpemUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQWRkIHZpZGVvIHNsaWRlSW5mb1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuYWRkU2xpZGVWaWRlb0luZm8gPSBmdW5jdGlvbiAoaXRlbXMpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuX19zbGlkZVZpZGVvSW5mbyA9IHV0aWxzLmlzVmlkZW8oZWxlbWVudC5zcmMsICEhZWxlbWVudC52aWRlbywgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuX19zbGlkZVZpZGVvSW5mbyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldHRpbmdzLmxvYWRZb3VUdWJlUG9zdGVyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIWVsZW1lbnQucG9zdGVyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5fX3NsaWRlVmlkZW9JbmZvLnlvdXR1YmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBvc3RlciA9IFwiLy9pbWcueW91dHViZS5jb20vdmkvXCIgKyBlbGVtZW50Ll9fc2xpZGVWaWRlb0luZm8ueW91dHViZVsxXSArIFwiL21heHJlc2RlZmF1bHQuanBnXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIExvYWQgc2xpZGUgY29udGVudCBpbnRvIHNsaWRlLlxyXG4gICAgICAgICAqICBUaGlzIGlzIHVzZWQgdG8gbG9hZCBjb250ZW50IGludG8gc2xpZGVzIHRoYXQgaXMgbm90IHZpc2libGUgdG9vXHJcbiAgICAgICAgICogIEBwYXJhbSB7TnVtYmVyfSBpbmRleCAtIGluZGV4IG9mIHRoZSBzbGlkZS5cclxuICAgICAgICAgKiAgQHBhcmFtIHtCb29sZWFufSByZWMgLSBpZiB0cnVlIGNhbGwgbG9hZGNvbnRlbnQoKSBmdW5jdGlvbiBhZ2Fpbi5cclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmxvYWRDb250ZW50ID0gZnVuY3Rpb24gKGluZGV4LCByZWMpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRHYWxsZXJ5SXRlbSA9IHRoaXMuZ2FsbGVyeUl0ZW1zW2luZGV4XTtcclxuICAgICAgICAgICAgdmFyICRjdXJyZW50U2xpZGUgPSAkTEcodGhpcy5nZXRTbGlkZUl0ZW1JZChpbmRleCkpO1xyXG4gICAgICAgICAgICB2YXIgcG9zdGVyID0gY3VycmVudEdhbGxlcnlJdGVtLnBvc3Rlciwgc3Jjc2V0ID0gY3VycmVudEdhbGxlcnlJdGVtLnNyY3NldCwgc2l6ZXMgPSBjdXJyZW50R2FsbGVyeUl0ZW0uc2l6ZXMsIHNvdXJjZXMgPSBjdXJyZW50R2FsbGVyeUl0ZW0uc291cmNlcztcclxuICAgICAgICAgICAgdmFyIHNyYyA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5zcmM7XHJcbiAgICAgICAgICAgIHZhciB2aWRlbyA9IGN1cnJlbnRHYWxsZXJ5SXRlbS52aWRlbztcclxuICAgICAgICAgICAgdmFyIF9odG1sNVZpZGVvID0gdmlkZW8gJiYgdHlwZW9mIHZpZGVvID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UodmlkZW8pIDogdmlkZW87XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50R2FsbGVyeUl0ZW0ucmVzcG9uc2l2ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNyY0R5SXRtcyA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5yZXNwb25zaXZlLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgICAgICBzcmMgPSB1dGlscy5nZXRSZXNwb25zaXZlU3JjKHNyY0R5SXRtcykgfHwgc3JjO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB2aWRlb0luZm8gPSBjdXJyZW50R2FsbGVyeUl0ZW0uX19zbGlkZVZpZGVvSW5mbztcclxuICAgICAgICAgICAgdmFyIGxnVmlkZW9TdHlsZSA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgaWZyYW1lID0gISFjdXJyZW50R2FsbGVyeUl0ZW0uaWZyYW1lO1xyXG4gICAgICAgICAgICB2YXIgaXNGaXJzdFNsaWRlID0gIXRoaXMubEdhbGxlcnlPbjtcclxuICAgICAgICAgICAgLy8gZGVsYXkgZm9yIGFkZGluZyBjb21wbGV0ZSBjbGFzcy4gaXQgaXMgMCBleGNlcHQgZmlyc3QgdGltZS5cclxuICAgICAgICAgICAgdmFyIGRlbGF5ID0gMDtcclxuICAgICAgICAgICAgaWYgKGlzRmlyc3RTbGlkZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuem9vbUZyb21PcmlnaW4gJiYgdGhpcy5jdXJyZW50SW1hZ2VTaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsYXkgPSB0aGlzLnNldHRpbmdzLnN0YXJ0QW5pbWF0aW9uRHVyYXRpb24gKyAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5ID0gdGhpcy5zZXR0aW5ncy5iYWNrZHJvcER1cmF0aW9uICsgMTA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEkY3VycmVudFNsaWRlLmhhc0NsYXNzKCdsZy1sb2FkZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZGVvSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IHRoaXMubWVkaWFDb250YWluZXJQb3NpdGlvbiwgdG9wXzIgPSBfYS50b3AsIGJvdHRvbSA9IF9hLmJvdHRvbTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmlkZW9TaXplID0gdXRpbHMuZ2V0U2l6ZSh0aGlzLml0ZW1zW2luZGV4XSwgdGhpcy5vdXRlciwgdG9wXzIgKyBib3R0b20sIHZpZGVvSW5mbyAmJiB0aGlzLnNldHRpbmdzLnZpZGVvTWF4U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGdWaWRlb1N0eWxlID0gdGhpcy5nZXRWaWRlb0NvbnRTdHlsZSh2aWRlb1NpemUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlmcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXJrdXAgPSB1dGlscy5nZXRJZnJhbWVNYXJrdXAodGhpcy5zZXR0aW5ncy5pZnJhbWVXaWR0aCwgdGhpcy5zZXR0aW5ncy5pZnJhbWVIZWlnaHQsIHRoaXMuc2V0dGluZ3MuaWZyYW1lTWF4V2lkdGgsIHRoaXMuc2V0dGluZ3MuaWZyYW1lTWF4SGVpZ2h0LCBzcmMsIGN1cnJlbnRHYWxsZXJ5SXRlbS5pZnJhbWVUaXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5wcmVwZW5kKG1hcmt1cCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwb3N0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZHVtbXlJbWcgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaGFzU3RhcnRBbmltYXRpb24gPSBpc0ZpcnN0U2xpZGUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56b29tRnJvbU9yaWdpbiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbWFnZVNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1N0YXJ0QW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1bW15SW1nID0gdGhpcy5nZXREdW1teUltYWdlQ29udGVudCgkY3VycmVudFNsaWRlLCBpbmRleCwgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWFya3VwID0gdXRpbHMuZ2V0VmlkZW9Qb3N0ZXJNYXJrdXAocG9zdGVyLCBkdW1teUltZyB8fCAnJywgbGdWaWRlb1N0eWxlLCB0aGlzLnNldHRpbmdzLnN0cmluZ3NbJ3BsYXlWaWRlbyddLCB2aWRlb0luZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUucHJlcGVuZChtYXJrdXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmlkZW9JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hcmt1cCA9IFwiPGRpdiBjbGFzcz1cXFwibGctdmlkZW8tY29udCBcXFwiIHN0eWxlPVxcXCJcIiArIGxnVmlkZW9TdHlsZSArIFwiXFxcIj48L2Rpdj5cIjtcclxuICAgICAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlLnByZXBlbmQobWFya3VwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0SW1nTWFya3VwKHNyYywgJGN1cnJlbnRTbGlkZSwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcmNzZXQgfHwgc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGltZyA9ICRjdXJyZW50U2xpZGUuZmluZCgnLmxnLW9iamVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQaWN0dXJlRmlsbCgkaW1nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocG9zdGVyIHx8IHZpZGVvSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmhhc1ZpZGVvLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBzcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw1VmlkZW86IF9odG1sNVZpZGVvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNQb3N0ZXI6ICEhcG9zdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuYWZ0ZXJBcHBlbmRTbGlkZSwgeyBpbmRleDogaW5kZXggfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sR2FsbGVyeU9uICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5hcHBlbmRTdWJIdG1sVG8gPT09ICcubGctaXRlbScpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEh0bWwoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEZvciBmaXJzdCB0aW1lIGFkZCBzb21lIGRlbGF5IGZvciBkaXNwbGF5aW5nIHRoZSBzdGFydCBhbmltYXRpb24uXHJcbiAgICAgICAgICAgIHZhciBfc3BlZWQgPSAwO1xyXG4gICAgICAgICAgICAvLyBEbyBub3QgY2hhbmdlIHRoZSBkZWxheSB2YWx1ZSBiZWNhdXNlIGl0IGlzIHJlcXVpcmVkIGZvciB6b29tIHBsdWdpbi5cclxuICAgICAgICAgICAgLy8gSWYgZ2FsbGVyeSBvcGVuZWQgZnJvbSBkaXJlY3QgdXJsIChoYXNoKSBzcGVlZCB2YWx1ZSBzaG91bGQgYmUgMFxyXG4gICAgICAgICAgICBpZiAoZGVsYXkgJiYgISRMRyhkb2N1bWVudC5ib2R5KS5oYXNDbGFzcygnbGctZnJvbS1oYXNoJykpIHtcclxuICAgICAgICAgICAgICAgIF9zcGVlZCA9IGRlbGF5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIE9ubHkgZm9yIGZpcnN0IHNsaWRlIGFuZCB6b29tRnJvbU9yaWdpbiBpcyBlbmFibGVkXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRmlyc3RTbGlkZVdpdGhab29tQW5pbWF0aW9uKCkpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsZy1zdGFydC1lbmQtcHJvZ3Jlc3MgbGctc3RhcnQtcHJvZ3Jlc3MnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgIH0sIHRoaXMuc2V0dGluZ3Muc3RhcnRBbmltYXRpb25EdXJhdGlvbiArIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoISRjdXJyZW50U2xpZGUuaGFzQ2xhc3MoJ2xnLWxvYWRlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5nZXRTbGlkZVR5cGUoY3VycmVudEdhbGxlcnlJdGVtKSA9PT0gJ2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1nLXdyYXAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQodXRpbHMuZ2V0SW1nTWFya3VwKGluZGV4LCBzcmMsICcnLCBzcmNzZXQsIHNpemVzLCBjdXJyZW50R2FsbGVyeUl0ZW0uc291cmNlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNyY3NldCB8fCBzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbWcgPSAkY3VycmVudFNsaWRlLmZpbmQoJy5sZy1vYmplY3QnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbml0UGljdHVyZUZpbGwoJGltZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmdldFNsaWRlVHlwZShjdXJyZW50R2FsbGVyeUl0ZW0pID09PSAnaW1hZ2UnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoX3RoaXMuZ2V0U2xpZGVUeXBlKGN1cnJlbnRHYWxsZXJ5SXRlbSkgPT09ICd2aWRlbycgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbkxnT2JqZWN0TG9hZCgkY3VycmVudFNsaWRlLCBpbmRleCwgZGVsYXksIF9zcGVlZCwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbG9hZCByZW1haW5pbmcgc2xpZGVzIG9uY2UgdGhlIHNsaWRlIGlzIGNvbXBsZXRlbHkgbG9hZGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vblNsaWRlT2JqZWN0TG9hZCgkY3VycmVudFNsaWRlLCAhISh2aWRlb0luZm8gJiYgdmlkZW9JbmZvLmh0bWw1ICYmICFwb3N0ZXIpLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9hZENvbnRlbnRPbkZpcnN0U2xpZGVMb2FkKGluZGV4LCAkY3VycmVudFNsaWRlLCBfc3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmxvYWRDb250ZW50T25GaXJzdFNsaWRlTG9hZChpbmRleCwgJGN1cnJlbnRTbGlkZSwgX3NwZWVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5zZXR0aW5ncy5zdGFydEFuaW1hdGlvbkR1cmF0aW9uICsgMTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTTGlkZSBjb250ZW50IGhhcyBiZWVuIGFkZGVkIHRvIGRvbVxyXG4gICAgICAgICAgICAkY3VycmVudFNsaWRlLmFkZENsYXNzKCdsZy1sb2FkZWQnKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRmlyc3RTbGlkZVdpdGhab29tQW5pbWF0aW9uKCkgfHxcclxuICAgICAgICAgICAgICAgICh0aGlzLmdldFNsaWRlVHlwZShjdXJyZW50R2FsbGVyeUl0ZW0pID09PSAndmlkZW8nICYmICFwb3N0ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTGdPYmplY3RMb2FkKCRjdXJyZW50U2xpZGUsIGluZGV4LCBkZWxheSwgX3NwZWVkLCBpc0ZpcnN0U2xpZGUsICEhKHZpZGVvSW5mbyAmJiB2aWRlb0luZm8uaHRtbDUgJiYgIXBvc3RlcikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFdoZW4gZ2FsbGVyeSBpcyBvcGVuZWQgb25jZSBjb250ZW50IGlzIGxvYWRlZCAoc2Vjb25kIHRpbWUpIG5lZWQgdG8gYWRkIGxnLWNvbXBsZXRlIGNsYXNzIGZvciBjc3Mgc3R5bGluZ1xyXG4gICAgICAgICAgICBpZiAoKCF0aGlzLnpvb21Gcm9tT3JpZ2luIHx8ICF0aGlzLmN1cnJlbnRJbWFnZVNpemUpICYmXHJcbiAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlLmhhc0NsYXNzKCdsZy1jb21wbGV0ZV8nKSAmJlxyXG4gICAgICAgICAgICAgICAgIXRoaXMubEdhbGxlcnlPbikge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5hZGRDbGFzcygnbGctY29tcGxldGUnKTtcclxuICAgICAgICAgICAgICAgIH0sIHRoaXMuc2V0dGluZ3MuYmFja2Ryb3BEdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQ29udGVudCBsb2FkZWRcclxuICAgICAgICAgICAgLy8gTmVlZCB0byBzZXQgbEdhbGxlcnlPbiBiZWZvcmUgY2FsbGluZyBwcmVsb2FkIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIHRoaXMubEdhbGxlcnlPbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChyZWMgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghJGN1cnJlbnRTbGlkZS5oYXNDbGFzcygnbGctY29tcGxldGVfJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcubGctb2JqZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdsb2FkLmxnIGVycm9yLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5wcmVsb2FkKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlbG9hZChpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIFJlbW92ZSBkdW1teSBpbWFnZSBjb250ZW50IGFuZCBsb2FkIG5leHQgc2xpZGVzXHJcbiAgICAgICAgICogQ2FsbGVkIG9ubHkgZm9yIHRoZSBmaXJzdCB0aW1lIGlmIHpvb21Gcm9tT3JpZ2luIGFuaW1hdGlvbiBpcyBlbmFibGVkXHJcbiAgICAgICAgICogQHBhcmFtIGluZGV4XHJcbiAgICAgICAgICogQHBhcmFtICRjdXJyZW50U2xpZGVcclxuICAgICAgICAgKiBAcGFyYW0gc3BlZWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmxvYWRDb250ZW50T25GaXJzdFNsaWRlTG9hZCA9IGZ1bmN0aW9uIChpbmRleCwgJGN1cnJlbnRTbGlkZSwgc3BlZWQpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlLmZpbmQoJy5sZy1kdW1teS1pbWcnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoJ2xnLWZpcnN0LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctZmlyc3Qtc2xpZGUtbG9hZGluZycpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaXNEdW1teUltYWdlUmVtb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wcmVsb2FkKGluZGV4KTtcclxuICAgICAgICAgICAgfSwgc3BlZWQgKyAzMDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXRJdGVtc1RvQmVJbnNlcnRlZFRvRG9tID0gZnVuY3Rpb24gKGluZGV4LCBwcmV2SW5kZXgsIG51bWJlck9mSXRlbXMpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKG51bWJlck9mSXRlbXMgPT09IHZvaWQgMCkgeyBudW1iZXJPZkl0ZW1zID0gMDsgfVxyXG4gICAgICAgICAgICB2YXIgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbSA9IFtdO1xyXG4gICAgICAgICAgICAvLyBNaW5pbXVtIDIgaXRlbXMgc2hvdWxkIGJlIHRoZXJlXHJcbiAgICAgICAgICAgIHZhciBwb3NzaWJsZU51bWJlck9mSXRlbXMgPSBNYXRoLm1heChudW1iZXJPZkl0ZW1zLCAzKTtcclxuICAgICAgICAgICAgcG9zc2libGVOdW1iZXJPZkl0ZW1zID0gTWF0aC5taW4ocG9zc2libGVOdW1iZXJPZkl0ZW1zLCB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICB2YXIgcHJldkluZGV4SXRlbSA9IFwibGctaXRlbS1cIiArIHRoaXMubGdJZCArIFwiLVwiICsgcHJldkluZGV4O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIDw9IDMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FsbGVyeUl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKF9lbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20ucHVzaChcImxnLWl0ZW0tXCIgKyBfdGhpcy5sZ0lkICsgXCItXCIgKyBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8ICh0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggLSAxKSAvIDIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGlkeCA9IGluZGV4OyBpZHggPiBpbmRleCAtIHBvc3NpYmxlTnVtYmVyT2ZJdGVtcyAvIDIgJiYgaWR4ID49IDA7IGlkeC0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5wdXNoKFwibGctaXRlbS1cIiArIHRoaXMubGdJZCArIFwiLVwiICsgaWR4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBudW1iZXJPZkV4aXN0aW5nSXRlbXMgPSBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHBvc3NpYmxlTnVtYmVyT2ZJdGVtcyAtIG51bWJlck9mRXhpc3RpbmdJdGVtczsgaWR4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLnB1c2goXCJsZy1pdGVtLVwiICsgdGhpcy5sZ0lkICsgXCItXCIgKyAoaW5kZXggKyBpZHggKyAxKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpZHggPSBpbmRleDsgaWR4IDw9IHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAtIDEgJiZcclxuICAgICAgICAgICAgICAgICAgICBpZHggPCBpbmRleCArIHBvc3NpYmxlTnVtYmVyT2ZJdGVtcyAvIDI7IGlkeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5wdXNoKFwibGctaXRlbS1cIiArIHRoaXMubGdJZCArIFwiLVwiICsgaWR4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBudW1iZXJPZkV4aXN0aW5nSXRlbXMgPSBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHBvc3NpYmxlTnVtYmVyT2ZJdGVtcyAtIG51bWJlck9mRXhpc3RpbmdJdGVtczsgaWR4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLnB1c2goXCJsZy1pdGVtLVwiICsgdGhpcy5sZ0lkICsgXCItXCIgKyAoaW5kZXggLSBpZHggLSAxKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubG9vcCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5wdXNoKFwibGctaXRlbS1cIiArIHRoaXMubGdJZCArIFwiLVwiICsgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20ucHVzaChcImxnLWl0ZW0tXCIgKyB0aGlzLmxnSWQgKyBcIi1cIiArICh0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggLSAxKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGl0ZW1zVG9CZUluc2VydGVkVG9Eb20uaW5kZXhPZihwcmV2SW5kZXhJdGVtKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20ucHVzaChcImxnLWl0ZW0tXCIgKyB0aGlzLmxnSWQgKyBcIi1cIiArIHByZXZJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zVG9CZUluc2VydGVkVG9Eb207XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLm9yZ2FuaXplU2xpZGVJdGVtcyA9IGZ1bmN0aW9uIChpbmRleCwgcHJldkluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tID0gdGhpcy5nZXRJdGVtc1RvQmVJbnNlcnRlZFRvRG9tKGluZGV4LCBwcmV2SW5kZXgsIHRoaXMuc2V0dGluZ3MubnVtYmVyT2ZTbGlkZUl0ZW1zSW5Eb20pO1xyXG4gICAgICAgICAgICBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jdXJyZW50SXRlbXNJbkRvbS5pbmRleE9mKGl0ZW0pID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiRpbm5lci5hcHBlbmQoXCI8ZGl2IGlkPVxcXCJcIiArIGl0ZW0gKyBcIlxcXCIgY2xhc3M9XFxcImxnLWl0ZW1cXFwiPjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEl0ZW1zSW5Eb20uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9CZUluc2VydGVkVG9Eb20uaW5kZXhPZihpdGVtKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkTEcoXCIjXCIgKyBpdGVtKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0IHByZXZpb3VzIGluZGV4IG9mIHRoZSBzbGlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0UHJldmlvdXNTbGlkZUluZGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcHJldkluZGV4ID0gMDtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50SXRlbUlkID0gdGhpcy5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcubGctY3VycmVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgICAgIHByZXZJbmRleCA9IHBhcnNlSW50KGN1cnJlbnRJdGVtSWQuc3BsaXQoJy0nKVszXSkgfHwgMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHByZXZJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHByZXZJbmRleDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuc2V0RG93bmxvYWRWYWx1ZSA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5kb3dubG9hZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRHYWxsZXJ5SXRlbSA9IHRoaXMuZ2FsbGVyeUl0ZW1zW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIHZhciBoaWRlRG93bmxvYWRCdG4gPSBjdXJyZW50R2FsbGVyeUl0ZW0uZG93bmxvYWRVcmwgPT09IGZhbHNlIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEdhbGxlcnlJdGVtLmRvd25sb2FkVXJsID09PSAnZmFsc2UnO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhpZGVEb3dubG9hZEJ0bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLWhpZGUtZG93bmxvYWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkZG93bmxvYWQgPSB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1kb3dubG9hZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWhpZGUtZG93bmxvYWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAkZG93bmxvYWQuYXR0cignaHJlZicsIGN1cnJlbnRHYWxsZXJ5SXRlbS5kb3dubG9hZFVybCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50R2FsbGVyeUl0ZW0uc3JjKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEdhbGxlcnlJdGVtLmRvd25sb2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRkb3dubG9hZC5hdHRyKCdkb3dubG9hZCcsIGN1cnJlbnRHYWxsZXJ5SXRlbS5kb3dubG9hZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLm1ha2VTbGlkZUFuaW1hdGlvbiA9IGZ1bmN0aW9uIChkaXJlY3Rpb24sIGN1cnJlbnRTbGlkZUl0ZW0sIHByZXZpb3VzU2xpZGVJdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxHYWxsZXJ5T24pIHtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzU2xpZGVJdGVtLmFkZENsYXNzKCdsZy1zbGlkZS1wcm9ncmVzcycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCB0cmFuc2l0aW9uc1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLW5vLXRyYW5zJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcubGctaXRlbScpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsZy1wcmV2LXNsaWRlIGxnLW5leHQtc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdwcmV2Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcHJldnNsaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlSXRlbS5hZGRDbGFzcygnbGctcHJldi1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzU2xpZGVJdGVtLmFkZENsYXNzKCdsZy1uZXh0LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNsaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlSXRlbS5hZGRDbGFzcygnbGctbmV4dC1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzU2xpZGVJdGVtLmFkZENsYXNzKCdsZy1wcmV2LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBnaXZlIDUwIG1zIGZvciBicm93c2VyIHRvIGFkZC9yZW1vdmUgY2xhc3NcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmZpbmQoJy5sZy1pdGVtJykucmVtb3ZlQ2xhc3MoJ2xnLWN1cnJlbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGVJdGVtLmFkZENsYXNzKCdsZy1jdXJyZW50Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXQgYWxsIHRyYW5zaXRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLW5vLXRyYW5zJyk7XHJcbiAgICAgICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMubEdhbGxlcnlPbiA/IHRoaXMuc2V0dGluZ3Muc2xpZGVEZWxheSA6IDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR290byBhIHNwZWNpZmljIHNsaWRlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCAtIGluZGV4IG9mIHRoZSBzbGlkZVxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZnJvbVRvdWNoIC0gdHJ1ZSBpZiBzbGlkZSBmdW5jdGlvbiBjYWxsZWQgdmlhIHRvdWNoIGV2ZW50IG9yIG1vdXNlIGRyYWdcclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZyb21UaHVtYiAtIHRydWUgaWYgc2xpZGUgZnVuY3Rpb24gY2FsbGVkIHZpYSB0aHVtYm5haWwgY2xpY2tcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0aW9uIC0gRGlyZWN0aW9uIG9mIHRoZSBzbGlkZShuZXh0L3ByZXYpXHJcbiAgICAgICAgICogQGNhdGVnb3J5IGxHUHVibGljTWV0aG9kc1xyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogIGNvbnN0IHBsdWdpbiA9IGxpZ2h0R2FsbGVyeSgpO1xyXG4gICAgICAgICAqICAvLyB0byBnbyB0byAzcmQgc2xpZGVcclxuICAgICAgICAgKiAgcGx1Z2luLnNsaWRlKDIpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5zbGlkZSA9IGZ1bmN0aW9uIChpbmRleCwgZnJvbVRvdWNoLCBmcm9tVGh1bWIsIGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcHJldkluZGV4ID0gdGhpcy5nZXRQcmV2aW91c1NsaWRlSW5kZXgoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbXNJbkRvbSA9IHRoaXMub3JnYW5pemVTbGlkZUl0ZW1zKGluZGV4LCBwcmV2SW5kZXgpO1xyXG4gICAgICAgICAgICAvLyBQcmV2ZW50IG11bHRpcGxlIGNhbGwsIFJlcXVpcmVkIGZvciBoc2ggcGx1Z2luXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxHYWxsZXJ5T24gJiYgcHJldkluZGV4ID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBudW1iZXJPZkdhbGxlcnlJdGVtcyA9IHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxnQnVzeSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY291bnRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ3VycmVudENvdW50ZXIoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRTbGlkZUl0ZW0gPSB0aGlzLmdldFNsaWRlSXRlbShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNTbGlkZUl0ZW1fMSA9IHRoaXMuZ2V0U2xpZGVJdGVtKHByZXZJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudEdhbGxlcnlJdGVtID0gdGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpZGVvSW5mbyA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5fX3NsaWRlVmlkZW9JbmZvO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5hdHRyKCdkYXRhLWxnLXNsaWRlLXR5cGUnLCB0aGlzLmdldFNsaWRlVHlwZShjdXJyZW50R2FsbGVyeUl0ZW0pKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RG93bmxvYWRWYWx1ZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmlkZW9JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hID0gdGhpcy5tZWRpYUNvbnRhaW5lclBvc2l0aW9uLCB0b3BfMyA9IF9hLnRvcCwgYm90dG9tID0gX2EuYm90dG9tO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2aWRlb1NpemUgPSB1dGlscy5nZXRTaXplKHRoaXMuaXRlbXNbaW5kZXhdLCB0aGlzLm91dGVyLCB0b3BfMyArIGJvdHRvbSwgdmlkZW9JbmZvICYmIHRoaXMuc2V0dGluZ3MudmlkZW9NYXhTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZVZpZGVvU2xpZGUoaW5kZXgsIHZpZGVvU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5iZWZvcmVTbGlkZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZJbmRleDogcHJldkluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBmcm9tVG91Y2g6ICEhZnJvbVRvdWNoLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyb21UaHVtYjogISFmcm9tVGh1bWIsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGdCdXN5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVCYXJUaW1lb3V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyb3dEaXNhYmxlKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmICghZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgcHJldkluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdwcmV2JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggPiBwcmV2SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gJ25leHQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghZnJvbVRvdWNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWtlU2xpZGVBbmltYXRpb24oZGlyZWN0aW9uLCBjdXJyZW50U2xpZGVJdGVtLCBwcmV2aW91c1NsaWRlSXRlbV8xKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsZy1wcmV2LXNsaWRlIGxnLWN1cnJlbnQgbGctbmV4dC1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaFByZXYgPSB2b2lkIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoTmV4dCA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobnVtYmVyT2ZHYWxsZXJ5SXRlbXMgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoUHJldiA9IGluZGV4IC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOZXh0ID0gaW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDAgJiYgcHJldkluZGV4ID09PSBudW1iZXJPZkdhbGxlcnlJdGVtcyAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTmV4dCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaFByZXYgPSBudW1iZXJPZkdhbGxlcnlJdGVtcyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IG51bWJlck9mR2FsbGVyeUl0ZW1zIC0gMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldkluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmV2IHNsaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5leHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hQcmV2ID0gbnVtYmVyT2ZHYWxsZXJ5SXRlbXMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaFByZXYgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5leHQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAncHJldicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTbGlkZUl0ZW0odG91Y2hOZXh0KS5hZGRDbGFzcygnbGctbmV4dC1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTbGlkZUl0ZW0odG91Y2hQcmV2KS5hZGRDbGFzcygnbGctcHJldi1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGVJdGVtLmFkZENsYXNzKCdsZy1jdXJyZW50Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgcHV0IGxvYWQgY29udGVudCBpbiBzZXQgdGltZW91dCBhcyBpdCBuZWVkcyB0byBsb2FkIGltbWVkaWF0ZWx5IHdoZW4gdGhlIGdhbGxlcnkgaXMgb3BlbmVkXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubEdhbGxlcnlPbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZENvbnRlbnQoaW5kZXgsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmxvYWRDb250ZW50KGluZGV4LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRpdGxlIGlmIHRoaXMuc2V0dGluZ3MuYXBwZW5kU3ViSHRtbFRvID09PSBsZy1zdWItaHRtbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuc2V0dGluZ3MuYXBwZW5kU3ViSHRtbFRvICE9PSAnLmxnLWl0ZW0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5hZGRIdG1sKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMuc2V0dGluZ3Muc3BlZWQgKyA1MCArIChmcm9tVG91Y2ggPyAwIDogdGhpcy5zZXR0aW5ncy5zbGlkZURlbGF5KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5sZ0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1NsaWRlSXRlbV8xLnJlbW92ZUNsYXNzKCdsZy1zbGlkZS1wcm9ncmVzcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5hZnRlclNsaWRlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZJbmRleDogcHJldkluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21Ub3VjaDogZnJvbVRvdWNoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tVGh1bWI6IGZyb21UaHVtYixcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sICh0aGlzLmxHYWxsZXJ5T24gPyB0aGlzLnNldHRpbmdzLnNwZWVkICsgMTAwIDogMTAwKSArIChmcm9tVG91Y2ggPyAwIDogdGhpcy5zZXR0aW5ncy5zbGlkZURlbGF5KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS51cGRhdGVDdXJyZW50Q291bnRlciA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1jb3VudGVyLWN1cnJlbnQnKS5odG1sKGluZGV4ICsgMSArICcnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUudXBkYXRlQ291bnRlclRvdGFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1jb3VudGVyLWFsbCcpLmh0bWwodGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoICsgJycpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXRTbGlkZVR5cGUgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5fX3NsaWRlVmlkZW9JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3ZpZGVvJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpdGVtLmlmcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdpZnJhbWUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdpbWFnZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUudG91Y2hNb3ZlID0gZnVuY3Rpb24gKHN0YXJ0Q29vcmRzLCBlbmRDb29yZHMsIGUpIHtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlWCA9IGVuZENvb3Jkcy5wYWdlWCAtIHN0YXJ0Q29vcmRzLnBhZ2VYO1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2VZID0gZW5kQ29vcmRzLnBhZ2VZIC0gc3RhcnRDb29yZHMucGFnZVk7XHJcbiAgICAgICAgICAgIHZhciBhbGxvd1N3aXBlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN3aXBlRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxvd1N3aXBlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZVgpID4gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3aXBlRGlyZWN0aW9uID0gJ2hvcml6b250YWwnO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93U3dpcGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoTWF0aC5hYnMoZGlzdGFuY2VZKSA+IDE1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2lwZURpcmVjdGlvbiA9ICd2ZXJ0aWNhbCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dTd2lwZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFhbGxvd1N3aXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyICRjdXJyZW50U2xpZGUgPSB0aGlzLmdldFNsaWRlSXRlbSh0aGlzLmluZGV4KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3dpcGVEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgICAgICAgICAgZSA9PT0gbnVsbCB8fCBlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyByZXNldCBvcGFjaXR5IGFuZCB0cmFuc2l0aW9uIGR1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKCdsZy1kcmFnZ2luZycpO1xyXG4gICAgICAgICAgICAgICAgLy8gbW92ZSBjdXJyZW50IHNsaWRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZSgkY3VycmVudFNsaWRlLCBkaXN0YW5jZVgsIDApO1xyXG4gICAgICAgICAgICAgICAgLy8gbW92ZSBuZXh0IGFuZCBwcmV2IHNsaWRlIHdpdGggY3VycmVudCBzbGlkZVxyXG4gICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gJGN1cnJlbnRTbGlkZS5nZXQoKS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIHZhciBzbGlkZVdpZHRoQW1vdW50ID0gKHdpZHRoICogMTUpIC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGd1dHRlciA9IHNsaWRlV2lkdGhBbW91bnQgLSBNYXRoLmFicygoZGlzdGFuY2VYICogMTApIC8gMTAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNsYXRlKHRoaXMub3V0ZXIuZmluZCgnLmxnLXByZXYtc2xpZGUnKS5maXJzdCgpLCAtd2lkdGggKyBkaXN0YW5jZVggLSBndXR0ZXIsIDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2xhdGUodGhpcy5vdXRlci5maW5kKCcubGctbmV4dC1zbGlkZScpLmZpcnN0KCksIHdpZHRoICsgZGlzdGFuY2VYICsgZ3V0dGVyLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnN3aXBlRGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zd2lwZVRvQ2xvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBlID09PSBudWxsIHx8IGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRjb250YWluZXIuYWRkQ2xhc3MoJ2xnLWRyYWdnaW5nLXZlcnRpY2FsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wYWNpdHkgPSAxIC0gTWF0aC5hYnMoZGlzdGFuY2VZKSAvIHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRiYWNrZHJvcC5jc3MoJ29wYWNpdHknLCBvcGFjaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2NhbGUgPSAxIC0gTWF0aC5hYnMoZGlzdGFuY2VZKSAvICh3aW5kb3cuaW5uZXJXaWR0aCAqIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNsYXRlKCRjdXJyZW50U2xpZGUsIDAsIGRpc3RhbmNlWSwgc2NhbGUsIHNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2VZKSA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xnLWhpZGUtaXRlbXMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsZy1jb21wb25lbnRzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUudG91Y2hFbmQgPSBmdW5jdGlvbiAoZW5kQ29vcmRzLCBzdGFydENvb3JkcywgZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlO1xyXG4gICAgICAgICAgICAvLyBrZWVwIHNsaWRlIGFuaW1hdGlvbiBmb3IgYW55IG1vZGUgd2hpbGUgZHJhZ2cvc3dpcGVcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubW9kZSAhPT0gJ2xnLXNsaWRlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5hZGRDbGFzcygnbGctc2xpZGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBzZXQgdHJhbnNpdGlvbiBkdXJhdGlvblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2xnLWRyYWdnaW5nLXZlcnRpY2FsJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbGctZHJhZ2dpbmcgbGctaGlkZS1pdGVtcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdsZy1jb21wb25lbnRzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgIHZhciB0cmlnZ2VyQ2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnN3aXBlRGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGVuZENvb3Jkcy5wYWdlWCAtIHN0YXJ0Q29vcmRzLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZUFicyA9IE1hdGguYWJzKGVuZENvb3Jkcy5wYWdlWCAtIHN0YXJ0Q29vcmRzLnBhZ2VYKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlQWJzID4gX3RoaXMuc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ29Ub05leHRTbGlkZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRpc3RhbmNlID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZUFicyA+IF90aGlzLnNldHRpbmdzLnN3aXBlVGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmdvVG9QcmV2U2xpZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKF90aGlzLnN3aXBlRGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLmFicyhlbmRDb29yZHMucGFnZVkgLSBzdGFydENvb3Jkcy5wYWdlWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLnNldHRpbmdzLmNsb3NhYmxlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNldHRpbmdzLnN3aXBlVG9DbG9zZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jbG9zZUdhbGxlcnkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGJhY2tkcm9wLmNzcygnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmZpbmQoJy5sZy1pdGVtJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgIGlmICh0cmlnZ2VyQ2xpY2sgJiZcclxuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhlbmRDb29yZHMucGFnZVggLSBzdGFydENvb3Jkcy5wYWdlWCkgPCA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBjbGljayBpZiBkaXN0YW5jZSBpcyBsZXNzIHRoYW4gNSBwaXhcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJExHKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzUG9zdGVyRWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5wb3N0ZXJDbGljayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3RoaXMuc3dpcGVEaXJlY3Rpb24gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgc2xpZGUgY2xhc3Mgb25jZSBkcmFnL3N3aXBlIGlzIGNvbXBsZXRlZCBpZiBtb2RlIGlzIG5vdCBzbGlkZVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMub3V0ZXIuaGFzQ2xhc3MoJ2xnLWRyYWdnaW5nJykgJiZcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXR0aW5ncy5tb2RlICE9PSAnbGctc2xpZGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHRoaXMuc2V0dGluZ3Muc3BlZWQgKyAxMDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5lbmFibGVTd2lwZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHN0YXJ0Q29vcmRzID0ge307XHJcbiAgICAgICAgICAgIHZhciBlbmRDb29yZHMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGlzTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGlzU3dpcGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5lbmFibGVTd2lwZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kaW5uZXIub24oJ3RvdWNoc3RhcnQubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmRyYWdPclN3aXBlRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRpdGVtID0gX3RoaXMuZ2V0U2xpZGVJdGVtKF90aGlzLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKCRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLWl0ZW0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbS5nZXQoKS5jb250YWlucyhlLnRhcmdldCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFfdGhpcy5vdXRlci5oYXNDbGFzcygnbGctem9vbWVkJykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90aGlzLmxnQnVzeSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU3dpcGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvdWNoQWN0aW9uID0gJ3N3aXBlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubWFuYWdlU3dpcGVDbGFzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydENvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VYOiBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWTogZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kaW5uZXIub24oJ3RvdWNobW92ZS5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzU3dpcGluZyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy50b3VjaEFjdGlvbiA9PT0gJ3N3aXBlJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZENvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VYOiBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWTogZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy50b3VjaE1vdmUoc3RhcnRDb29yZHMsIGVuZENvb3JkcywgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kaW5uZXIub24oJ3RvdWNoZW5kLmxnJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLnRvdWNoQWN0aW9uID09PSAnc3dpcGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc01vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy50b3VjaEVuZChlbmRDb29yZHMsIHN0YXJ0Q29vcmRzLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNTd2lwaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJExHKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNQb3N0ZXJFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMucG9zdGVyQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvdWNoQWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1N3aXBpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5lbmFibGVEcmFnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRDb29yZHMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGVuZENvb3JkcyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgaXNEcmFnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBpc01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmVuYWJsZURyYWcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIub24oJ21vdXNlZG93bi5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZHJhZ09yU3dpcGVFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJGl0ZW0gPSBfdGhpcy5nZXRTbGlkZUl0ZW0oX3RoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkTEcoZS50YXJnZXQpLmhhc0NsYXNzKCdsZy1pdGVtJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW0uZ2V0KCkuY29udGFpbnMoZS50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMub3V0ZXIuaGFzQ2xhc3MoJ2xnLXpvb21lZCcpICYmICFfdGhpcy5sZ0J1c3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMubGdCdXN5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubWFuYWdlU3dpcGVDbGFzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWDogZS5wYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVk6IGUucGFnZVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0RyYWdpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICoqIEZpeCBmb3Igd2Via2l0IGN1cnNvciBpc3N1ZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MjY3MjNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5nZXQoKS5zY3JvbGxMZWZ0ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuZ2V0KCkuc2Nyb2xsTGVmdCAtPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xnLWdyYWInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xnLWdyYWJiaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmRyYWdTdGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICRMRyh3aW5kb3cpLm9uKFwibW91c2Vtb3ZlLmxnLmdsb2JhbFwiICsgdGhpcy5sZ0lkLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RyYWdpbmcgJiYgX3RoaXMubGdPcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZENvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VYOiBlLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVk6IGUucGFnZVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvdWNoTW92ZShzdGFydENvb3JkcywgZW5kQ29vcmRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmRyYWdNb3ZlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICRMRyh3aW5kb3cpLm9uKFwibW91c2V1cC5sZy5nbG9iYWxcIiArIHRoaXMubGdJZCwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5sZ09wZW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkTEcoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNNb3ZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvdWNoRW5kKGVuZENvb3Jkcywgc3RhcnRDb29yZHMsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmRyYWdFbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChfdGhpcy5pc1Bvc3RlckVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMucG9zdGVyQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IGV4ZWN1dGlvbiBvbiBjbGlja1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RyYWdpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNEcmFnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1ncmFiYmluZycpLmFkZENsYXNzKCdsZy1ncmFiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUudHJpZ2dlclBvc3RlckNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLiRpbm5lci5vbignY2xpY2subGcnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuZHJhZ09yU3dpcGVFbmFibGVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaXNQb3N0ZXJFbGVtZW50KCRMRyhldmVudC50YXJnZXQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5wb3N0ZXJDbGljayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5tYW5hZ2VTd2lwZUNsYXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RvdWNoTmV4dCA9IHRoaXMuaW5kZXggKyAxO1xyXG4gICAgICAgICAgICB2YXIgX3RvdWNoUHJldiA9IHRoaXMuaW5kZXggLSAxO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5sb29wICYmIHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RvdWNoUHJldiA9IHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RvdWNoTmV4dCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vdXRlci5maW5kKCcubGctaXRlbScpLnJlbW92ZUNsYXNzKCdsZy1uZXh0LXNsaWRlIGxnLXByZXYtc2xpZGUnKTtcclxuICAgICAgICAgICAgaWYgKF90b3VjaFByZXYgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTbGlkZUl0ZW0oX3RvdWNoUHJldikuYWRkQ2xhc3MoJ2xnLXByZXYtc2xpZGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdldFNsaWRlSXRlbShfdG91Y2hOZXh0KS5hZGRDbGFzcygnbGctbmV4dC1zbGlkZScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR28gdG8gbmV4dCBzbGlkZVxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZnJvbVRvdWNoIC0gdHJ1ZSBpZiBzbGlkZSBmdW5jdGlvbiBjYWxsZWQgdmlhIHRvdWNoIGV2ZW50XHJcbiAgICAgICAgICogQGNhdGVnb3J5IGxHUHVibGljTWV0aG9kc1xyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogIGNvbnN0IHBsdWdpbiA9IGxpZ2h0R2FsbGVyeSgpO1xyXG4gICAgICAgICAqICBwbHVnaW4uZ29Ub05leHRTbGlkZSgpO1xyXG4gICAgICAgICAqIEBzZWUgPGEgaHJlZj1cIi9kZW1vcy9tZXRob2RzL1wiPkRlbW88L2E+XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nb1RvTmV4dFNsaWRlID0gZnVuY3Rpb24gKGZyb21Ub3VjaCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgX2xvb3AgPSB0aGlzLnNldHRpbmdzLmxvb3A7XHJcbiAgICAgICAgICAgIGlmIChmcm9tVG91Y2ggJiYgdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIDwgMykge1xyXG4gICAgICAgICAgICAgICAgX2xvb3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGdCdXN5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbmRleCArIDEgPCB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuYmVmb3JlTmV4dFNsaWRlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGUodGhpcy5pbmRleCwgISFmcm9tVG91Y2gsIGZhbHNlLCAnbmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9sb29wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5iZWZvcmVOZXh0U2xpZGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZSh0aGlzLmluZGV4LCAhIWZyb21Ub3VjaCwgZmFsc2UsICduZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2V0dGluZ3Muc2xpZGVFbmRBbmltYXRpb24gJiYgIWZyb21Ub3VjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKCdsZy1yaWdodC1lbmQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctcmlnaHQtZW5kJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHbyB0byBwcmV2aW91cyBzbGlkZXNcclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZyb21Ub3VjaCAtIHRydWUgaWYgc2xpZGUgZnVuY3Rpb24gY2FsbGVkIHZpYSB0b3VjaCBldmVudFxyXG4gICAgICAgICAqIEBjYXRlZ29yeSBsR1B1YmxpY01ldGhvZHNcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqICBjb25zdCBwbHVnaW4gPSBsaWdodEdhbGxlcnkoe30pO1xyXG4gICAgICAgICAqICBwbHVnaW4uZ29Ub1ByZXZTbGlkZSgpO1xyXG4gICAgICAgICAqIEBzZWUgPGEgaHJlZj1cIi9kZW1vcy9tZXRob2RzL1wiPkRlbW88L2E+XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdvVG9QcmV2U2xpZGUgPSBmdW5jdGlvbiAoZnJvbVRvdWNoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBfbG9vcCA9IHRoaXMuc2V0dGluZ3MubG9vcDtcclxuICAgICAgICAgICAgaWYgKGZyb21Ub3VjaCAmJiB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggPCAzKSB7XHJcbiAgICAgICAgICAgICAgICBfbG9vcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5sZ0J1c3kpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXgtLTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5iZWZvcmVQcmV2U2xpZGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21Ub3VjaDogZnJvbVRvdWNoLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGUodGhpcy5pbmRleCwgISFmcm9tVG91Y2gsIGZhbHNlLCAncHJldicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9sb29wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5iZWZvcmVQcmV2U2xpZGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbVRvdWNoOiBmcm9tVG91Y2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlKHRoaXMuaW5kZXgsICEhZnJvbVRvdWNoLCBmYWxzZSwgJ3ByZXYnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5zbGlkZUVuZEFuaW1hdGlvbiAmJiAhZnJvbVRvdWNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLWxlZnQtZW5kJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWxlZnQtZW5kJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmtleVByZXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAkTEcod2luZG93KS5vbihcImtleWRvd24ubGcuZ2xvYmFsXCIgKyB0aGlzLmxnSWQsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMubGdPcGVuZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXR0aW5ncy5lc2NLZXkgPT09IHRydWUgJiZcclxuICAgICAgICAgICAgICAgICAgICBlLmtleUNvZGUgPT09IDI3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zZXR0aW5ncy5hbGxvd01lZGlhT3ZlcmxhcCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5oYXNDbGFzcygnbGctY2FuLXRvZ2dsZScpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmhhc0NsYXNzKCdsZy1jb21wb25lbnRzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctY29tcG9uZW50cy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jbG9zZUdhbGxlcnkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMubGdPcGVuZWQgJiYgX3RoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAzNykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmdvVG9QcmV2U2xpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5nb1RvTmV4dFNsaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuYXJyb3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLXByZXYnKS5vbignY2xpY2subGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5nb1RvUHJldlNsaWRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1uZXh0Jykub24oJ2NsaWNrLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ29Ub05leHRTbGlkZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuYXJyb3dEaXNhYmxlID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIC8vIERpc2FibGUgYXJyb3dzIGlmIHNldHRpbmdzLmhpZGVDb250cm9sT25FbmQgaXMgdHJ1ZVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MubG9vcCAmJiB0aGlzLnNldHRpbmdzLmhpZGVDb250cm9sT25FbmQpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkcHJldiA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLXByZXYnKTtcclxuICAgICAgICAgICAgICAgIHZhciAkbmV4dCA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLW5leHQnKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCArIDEgPT09IHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRuZXh0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkbmV4dC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHByZXYuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRwcmV2LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuc2V0VHJhbnNsYXRlID0gZnVuY3Rpb24gKCRlbCwgeFZhbHVlLCB5VmFsdWUsIHNjYWxlWCwgc2NhbGVZKSB7XHJcbiAgICAgICAgICAgIGlmIChzY2FsZVggPT09IHZvaWQgMCkgeyBzY2FsZVggPSAxOyB9XHJcbiAgICAgICAgICAgIGlmIChzY2FsZVkgPT09IHZvaWQgMCkgeyBzY2FsZVkgPSAxOyB9XHJcbiAgICAgICAgICAgICRlbC5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgnICtcclxuICAgICAgICAgICAgICAgIHhWYWx1ZSArXHJcbiAgICAgICAgICAgICAgICAncHgsICcgK1xyXG4gICAgICAgICAgICAgICAgeVZhbHVlICtcclxuICAgICAgICAgICAgICAgICdweCwgMHB4KSBzY2FsZTNkKCcgK1xyXG4gICAgICAgICAgICAgICAgc2NhbGVYICtcclxuICAgICAgICAgICAgICAgICcsICcgK1xyXG4gICAgICAgICAgICAgICAgc2NhbGVZICtcclxuICAgICAgICAgICAgICAgICcsIDEpJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLm1vdXNld2hlZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBsYXN0Q2FsbCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMub3V0ZXIub24oJ3doZWVsLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZS5kZWx0YVkgfHwgX3RoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobm93IC0gbGFzdENhbGwgPCAxMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFzdENhbGwgPSBub3c7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5kZWx0YVkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ29Ub05leHRTbGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZS5kZWx0YVkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ29Ub1ByZXZTbGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuaXNTbGlkZUVsZW1lbnQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAodGFyZ2V0Lmhhc0NsYXNzKCdsZy1vdXRlcicpIHx8XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuaGFzQ2xhc3MoJ2xnLWl0ZW0nKSB8fFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0Lmhhc0NsYXNzKCdsZy1pbWctd3JhcCcpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuaXNQb3N0ZXJFbGVtZW50ID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgICAgICB2YXIgcGxheUJ1dHRvbiA9IHRoaXMuZ2V0U2xpZGVJdGVtKHRoaXMuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLXZpZGVvLXBsYXktYnV0dG9uJylcclxuICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgcmV0dXJuICh0YXJnZXQuaGFzQ2xhc3MoJ2xnLXZpZGVvLXBvc3RlcicpIHx8XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuaGFzQ2xhc3MoJ2xnLXZpZGVvLXBsYXktYnV0dG9uJykgfHxcclxuICAgICAgICAgICAgICAgIChwbGF5QnV0dG9uICYmIHBsYXlCdXR0b24uY29udGFpbnModGFyZ2V0LmdldCgpKSkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWF4aW1pemUgbWluaW1pemUgaW5saW5lIGdhbGxlcnkuXHJcbiAgICAgICAgICogQGNhdGVnb3J5IGxHUHVibGljTWV0aG9kc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUudG9nZ2xlTWF4aW1pemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLW1heGltaXplJykub24oJ2NsaWNrLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuJGNvbnRhaW5lci50b2dnbGVDbGFzcygnbGctaW5saW5lJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5yZWZyZXNoT25SZXNpemUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmludmFsaWRhdGVJdGVtcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuaXRlbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJExHKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKFwiY2xpY2subGdjdXN0b20taXRlbS1cIiArICRlbGVtZW50LmF0dHIoJ2RhdGEtbGctaWQnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUubWFuYWdlQ2xvc2VHYWxsZXJ5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuY2xvc2FibGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBtb3VzZWRvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctY2xvc2UnKS5vbignY2xpY2subGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5jbG9zZUdhbGxlcnkoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNsb3NlT25UYXApIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHlvdSBkcmFnIHRoZSBzbGlkZSBhbmQgcmVsZWFzZSBvdXRzaWRlIGdhbGxlcnkgZ2V0cyBjbG9zZSBvbiBjaHJvbWVcclxuICAgICAgICAgICAgICAgIC8vIGZvciBwcmV2ZW50aW5nIHRoaXMgY2hlY2sgbW91c2Vkb3duIGFuZCBtb3VzZXVwIGhhcHBlbmVkIG9uIC5sZy1pdGVtIG9yIGxnLW91dGVyXHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLm9uKCdtb3VzZWRvd24ubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkTEcoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc1NsaWRlRWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlZG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZWRvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIub24oJ21vdXNlbW92ZS5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZWRvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5vbignbW91c2V1cC5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICRMRyhlLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzU2xpZGVFbGVtZW50KHRhcmdldCkgJiYgbW91c2Vkb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMub3V0ZXIuaGFzQ2xhc3MoJ2xnLWRyYWdnaW5nJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlR2FsbGVyeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENsb3NlIGxpZ2h0R2FsbGVyeSBpZiBpdCBpcyBvcGVuZWQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gSWYgY2xvc2FibGUgaXMgZmFsc2UgaW4gdGhlIHNldHRpbmdzLCB5b3UgbmVlZCB0byBwYXNzIHRydWUgdmlhIGNsb3NlR2FsbGVyeSBtZXRob2QgdG8gZm9yY2UgY2xvc2UgZ2FsbGVyeVxyXG4gICAgICAgICAqIEByZXR1cm4gcmV0dXJucyB0aGUgZXN0aW1hdGVkIHRpbWUgdG8gY2xvc2UgZ2FsbGVyeSBjb21wbGV0ZWx5IGluY2x1ZGluZyB0aGUgY2xvc2UgYW5pbWF0aW9uIGR1cmF0aW9uXHJcbiAgICAgICAgICogQGNhdGVnb3J5IGxHUHVibGljTWV0aG9kc1xyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogIGNvbnN0IHBsdWdpbiA9IGxpZ2h0R2FsbGVyeSgpO1xyXG4gICAgICAgICAqICBwbHVnaW4uY2xvc2VHYWxsZXJ5KCk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmNsb3NlR2FsbGVyeSA9IGZ1bmN0aW9uIChmb3JjZSkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGdPcGVuZWQgfHwgKCF0aGlzLnNldHRpbmdzLmNsb3NhYmxlICYmICFmb3JjZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmJlZm9yZUNsb3NlKTtcclxuICAgICAgICAgICAgJExHKHdpbmRvdykuc2Nyb2xsVG9wKHRoaXMucHJldlNjcm9sbFRvcCk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50SXRlbSA9IHRoaXMuaXRlbXNbdGhpcy5pbmRleF07XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnpvb21Gcm9tT3JpZ2luICYmIGN1cnJlbnRJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2EgPSB0aGlzLm1lZGlhQ29udGFpbmVyUG9zaXRpb24sIHRvcF80ID0gX2EudG9wLCBib3R0b20gPSBfYS5ib3R0b207XHJcbiAgICAgICAgICAgICAgICB2YXIgX2IgPSB0aGlzLmdhbGxlcnlJdGVtc1t0aGlzLmluZGV4XSwgX19zbGlkZVZpZGVvSW5mbyA9IF9iLl9fc2xpZGVWaWRlb0luZm8sIHBvc3RlciA9IF9iLnBvc3RlcjtcclxuICAgICAgICAgICAgICAgIHZhciBpbWFnZVNpemUgPSB1dGlscy5nZXRTaXplKGN1cnJlbnRJdGVtLCB0aGlzLm91dGVyLCB0b3BfNCArIGJvdHRvbSwgX19zbGlkZVZpZGVvSW5mbyAmJiBwb3N0ZXIgJiYgdGhpcy5zZXR0aW5ncy52aWRlb01heFNpemUpO1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtID0gdXRpbHMuZ2V0VHJhbnNmb3JtKGN1cnJlbnRJdGVtLCB0aGlzLm91dGVyLCB0b3BfNCwgYm90dG9tLCBpbWFnZVNpemUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnpvb21Gcm9tT3JpZ2luICYmIHRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5hZGRDbGFzcygnbGctY2xvc2luZyBsZy16b29tLWZyb20taW1hZ2UnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2xpZGVJdGVtKHRoaXMuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdsZy1zdGFydC1lbmQtcHJvZ3Jlc3MnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCB0aGlzLnNldHRpbmdzLnN0YXJ0QW5pbWF0aW9uRHVyYXRpb24gKyAnbXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ3RyYW5zZm9ybScsIHRyYW5zZm9ybSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKCdsZy1oaWRlLWl0ZW1zJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBsZy16b29tLWZyb20taW1hZ2UgaXMgdXNlZCBmb3Igc2V0dGluZyB0aGUgb3BhY2l0eSB0byAxIGlmIHpvb21Gcm9tT3JpZ2luIGlzIHRydWVcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBjbG9zaW5nIGl0ZW0gZG9lc24ndCBoYXZlIHRoZSBsZy1zaXplIGF0dHJpYnV0ZSwgcmVtb3ZlIHRoaXMgY2xhc3MgdG8gYXZvaWQgdGhlIGNsb3NpbmcgY3NzIGNvbmZsaWN0c1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctem9vbS1mcm9tLWltYWdlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVW5iaW5kIGFsbCBldmVudHMgYWRkZWQgYnkgbGlnaHRHYWxsZXJ5XHJcbiAgICAgICAgICAgIC8vIEB0b2RvXHJcbiAgICAgICAgICAgIC8vdGhpcy4kZWwub2ZmKCcubGcudG0nKTtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95TW9kdWxlcygpO1xyXG4gICAgICAgICAgICB0aGlzLmxHYWxsZXJ5T24gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pc0R1bW15SW1hZ2VSZW1vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuem9vbUZyb21PcmlnaW4gPSB0aGlzLnNldHRpbmdzLnpvb21Gcm9tT3JpZ2luO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlQmFyVGltZW91dCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUJhclRpbWVvdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgJExHKCdodG1sJykucmVtb3ZlQ2xhc3MoJ2xnLW9uJyk7XHJcbiAgICAgICAgICAgIHRoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXZpc2libGUgbGctY29tcG9uZW50cy1vcGVuJyk7XHJcbiAgICAgICAgICAgIC8vIFJlc2V0dGluZyBvcGFjaXR5IHRvIDAgaXNkIHJlcXVpcmVkIGFzICB2ZXJ0aWNhbCBzd2lwZSB0byBjbG9zZSBmdW5jdGlvbiBhZGRzIGlubGluZSBvcGFjaXR5LlxyXG4gICAgICAgICAgICB0aGlzLiRiYWNrZHJvcC5yZW1vdmVDbGFzcygnaW4nKS5jc3MoJ29wYWNpdHknLCAwKTtcclxuICAgICAgICAgICAgdmFyIHJlbW92ZVRpbWVvdXQgPSB0aGlzLnpvb21Gcm9tT3JpZ2luICYmIHRyYW5zZm9ybVxyXG4gICAgICAgICAgICAgICAgPyBNYXRoLm1heCh0aGlzLnNldHRpbmdzLnN0YXJ0QW5pbWF0aW9uRHVyYXRpb24sIHRoaXMuc2V0dGluZ3MuYmFja2Ryb3BEdXJhdGlvbilcclxuICAgICAgICAgICAgICAgIDogdGhpcy5zZXR0aW5ncy5iYWNrZHJvcER1cmF0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2xnLXNob3ctaW4nKTtcclxuICAgICAgICAgICAgLy8gT25jZSB0aGUgY2xvc2lnbiBhbmltYXRpb24gaXMgY29tcGxldGVkIGFuZCBnYWxsZXJ5IGlzIGludmlzaWJsZVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy56b29tRnJvbU9yaWdpbiAmJiB0cmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctem9vbS1mcm9tLWltYWdlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdGhpcy4kY29udGFpbmVyLnJlbW92ZUNsYXNzKCdsZy1zaG93Jyk7XHJcbiAgICAgICAgICAgICAgICAvLyBOZWVkIHRvIHJlbW92ZSBpbmxpbmUgb3BhY2l0eSBhcyBpdCBpcyB1c2VkIGluIHRoZSBzdHlsZXNoZWV0IGFzIHdlbGxcclxuICAgICAgICAgICAgICAgIF90aGlzLiRiYWNrZHJvcFxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIF90aGlzLnNldHRpbmdzLmJhY2tkcm9wRHVyYXRpb24gKyAnbXMnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKFwibGctY2xvc2luZyBcIiArIF90aGlzLnNldHRpbmdzLnN0YXJ0Q2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0U2xpZGVJdGVtKF90aGlzLmluZGV4KS5yZW1vdmVDbGFzcygnbGctc3RhcnQtZW5kLXByb2dyZXNzJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy4kaW5uZXIuZW1wdHkoKTtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5sZ09wZW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5hZnRlckNsb3NlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlOiBfdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5vdXRlci5nZXQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmdldCgpLmJsdXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLmxnT3BlbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIHJlbW92ZVRpbWVvdXQgKyAxMDApO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVtb3ZlVGltZW91dCArIDEwMDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuaW5pdE1vZHVsZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJsaWdodEdhbGxlcnk6LSBtYWtlIHN1cmUgbGlnaHRHYWxsZXJ5IG1vZHVsZSBpcyBwcm9wZXJseSBpbml0aWF0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5kZXN0cm95TW9kdWxlcyA9IGZ1bmN0aW9uIChkZXN0cm95KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlc3Ryb3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZS5jbG9zZUdhbGxlcnkgJiYgbW9kdWxlLmNsb3NlR2FsbGVyeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJsaWdodEdhbGxlcnk6LSBtYWtlIHN1cmUgbGlnaHRHYWxsZXJ5IG1vZHVsZSBpcyBwcm9wZXJseSBkZXN0cm95ZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVmcmVzaCBsaWdodEdhbGxlcnkgd2l0aCBuZXcgc2V0IG9mIGNoaWxkcmVuLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFRoaXMgaXMgdXNlZnVsIHRvIHVwZGF0ZSB0aGUgZ2FsbGVyeSB3aGVuIHRoZSBjaGlsZCBlbGVtZW50cyBhcmUgY2hhbmdlZCB3aXRob3V0IGNhbGxpbmcgZGVzdHJveSBtZXRob2QuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBJZiB5b3UgYXJlIHVzaW5nIGR5bmFtaWMgbW9kZSwgeW91IGNhbiBwYXNzIHRoZSBtb2RpZmllZCBhcnJheSBvZiBkeW5hbWljRWwgYXMgdGhlIGZpcnN0IHBhcmFtZXRlciB0byByZWZyZXNoIHRoZSBkeW5hbWljIGdhbGxlcnlcclxuICAgICAgICAgKiBAc2VlIDxhIGhyZWY9XCIvZGVtb3MvZHluYW1pYy1tb2RlL1wiPkRlbW88L2E+XHJcbiAgICAgICAgICogQGNhdGVnb3J5IGxHUHVibGljTWV0aG9kc1xyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogIGNvbnN0IHBsdWdpbiA9IGxpZ2h0R2FsbGVyeSgpO1xyXG4gICAgICAgICAqICAvLyBEZWxldGUgb3IgYWRkIGNoaWxkcmVuLCB0aGVuIGNhbGxcclxuICAgICAgICAgKiAgcGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uIChnYWxsZXJ5SXRlbXMpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmR5bmFtaWMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52YWxpZGF0ZUl0ZW1zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGdhbGxlcnlJdGVtcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYWxsZXJ5SXRlbXMgPSBnYWxsZXJ5SXRlbXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbGxlcnlJdGVtcyA9IHRoaXMuZ2V0SXRlbXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xzKCk7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkdhbGxlcnlPbkl0ZW1DbGljaygpO1xyXG4gICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy51cGRhdGVTbGlkZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS51cGRhdGVDb250cm9scyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTbGlkZVZpZGVvSW5mbyh0aGlzLmdhbGxlcnlJdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ291bnRlclRvdGFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU2luZ2xlU2xpZGVDbGFzc05hbWUoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlc3Ryb3kgbGlnaHRHYWxsZXJ5LlxyXG4gICAgICAgICAqIERlc3Ryb3kgbGlnaHRHYWxsZXJ5IGFuZCBpdHMgcGx1Z2luIGluc3RhbmNlcyBjb21wbGV0ZWx5XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gVGhpcyBtZXRob2QgYWxzbyBjYWxscyBDbG9zZUdhbGxlcnkgZnVuY3Rpb24gaW50ZXJuYWxseS4gUmV0dXJucyB0aGUgdGltZSB0YWtlcyB0byBjb21wbGV0ZWx5IGNsb3NlIGFuZCBkZXN0cm95IHRoZSBpbnN0YW5jZS5cclxuICAgICAgICAgKiBJbiBjYXNlIGlmIHlvdSB3YW50IHRvIHJlLWluaXRpYWxpemUgbGlnaHRHYWxsZXJ5IHJpZ2h0IGFmdGVyIGRlc3Ryb3lpbmcgaXQsIGluaXRpYWxpemUgaXQgb25seSBvbmNlIHRoZSBkZXN0cm95IHByb2Nlc3MgaXMgY29tcGxldGVkLlxyXG4gICAgICAgICAqIFlvdSBjYW4gdXNlIHJlZnJlc2ggbWV0aG9kIG1vc3Qgb2YgdGhlIHRpbWVzLlxyXG4gICAgICAgICAqIEBjYXRlZ29yeSBsR1B1YmxpY01ldGhvZHNcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqICBjb25zdCBwbHVnaW4gPSBsaWdodEdhbGxlcnkoKTtcclxuICAgICAgICAgKiAgcGx1Z2luLmRlc3Ryb3koKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGNsb3NlVGltZW91dCA9IHRoaXMuY2xvc2VHYWxsZXJ5KHRydWUpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmRlc3Ryb3lNb2R1bGVzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5zZXR0aW5ncy5keW5hbWljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW52YWxpZGF0ZUl0ZW1zKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkTEcod2luZG93KS5vZmYoXCIubGcuZ2xvYmFsXCIgKyBfdGhpcy5sZ0lkKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLkxHZWwub2ZmKCcubGcnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLiRjb250YWluZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0sIGNsb3NlVGltZW91dCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjbG9zZVRpbWVvdXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gTGlnaHRHYWxsZXJ5O1xyXG4gICAgfSgpKTtcblxuICAgIGZ1bmN0aW9uIGxpZ2h0R2FsbGVyeShlbCwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBuZXcgTGlnaHRHYWxsZXJ5KGVsLCBvcHRpb25zKTtcclxuICAgIH1cblxuICAgIHJldHVybiBsaWdodEdhbGxlcnk7XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saWdodGdhbGxlcnkudW1kLmpzLm1hcFxuIiwiLyohXG4gKiBsaWdodGdhbGxlcnkgfCAyLjQuMC1iZXRhLjAgfCBEZWNlbWJlciAxMnRoIDIwMjFcbiAqIGh0dHA6Ly93d3cubGlnaHRnYWxsZXJ5anMuY29tL1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFNhY2hpbiBOZXJhdmF0aDtcbiAqIEBsaWNlbnNlIEdQTHYzXG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwubGdUaHVtYm5haWwgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICAvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuICAgIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG4gICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuICAgIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuICAgIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG4gICAgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG4gICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbiAgICBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG4gICAgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG4gICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcblxuICAgIHZhciB0aHVtYm5haWxzU2V0dGluZ3MgPSB7XHJcbiAgICAgICAgdGh1bWJuYWlsOiB0cnVlLFxyXG4gICAgICAgIGFuaW1hdGVUaHVtYjogdHJ1ZSxcclxuICAgICAgICBjdXJyZW50UGFnZXJQb3NpdGlvbjogJ21pZGRsZScsXHJcbiAgICAgICAgYWxpZ25UaHVtYm5haWxzOiAnbWlkZGxlJyxcclxuICAgICAgICB0aHVtYldpZHRoOiAxMDAsXHJcbiAgICAgICAgdGh1bWJIZWlnaHQ6ICc4MHB4JyxcclxuICAgICAgICB0aHVtYk1hcmdpbjogNSxcclxuICAgICAgICBhcHBlbmRUaHVtYm5haWxzVG86ICcubGctY29tcG9uZW50cycsXHJcbiAgICAgICAgdG9nZ2xlVGh1bWI6IGZhbHNlLFxyXG4gICAgICAgIGVuYWJsZVRodW1iRHJhZzogdHJ1ZSxcclxuICAgICAgICBlbmFibGVUaHVtYlN3aXBlOiB0cnVlLFxyXG4gICAgICAgIHRodW1ibmFpbFN3aXBlVGhyZXNob2xkOiAxMCxcclxuICAgICAgICBsb2FkWW91VHViZVRodW1ibmFpbDogdHJ1ZSxcclxuICAgICAgICB5b3VUdWJlVGh1bWJTaXplOiAxLFxyXG4gICAgICAgIHRodW1ibmFpbFBsdWdpblN0cmluZ3M6IHsgdG9nZ2xlVGh1bWJuYWlsczogJ1RvZ2dsZSB0aHVtYm5haWxzJyB9LFxyXG4gICAgfTtcblxuICAgIC8qKlxyXG4gICAgICogTGlzdCBvZiBsaWdodEdhbGxlcnkgZXZlbnRzXHJcbiAgICAgKiBBbGwgZXZlbnRzIHNob3VsZCBiZSBkb2N1bWVudGVkIGhlcmVcclxuICAgICAqIEJlbG93IGludGVyZmFjZXMgYXJlIHVzZWQgdG8gYnVpbGQgdGhlIHdlYnNpdGUgZG9jdW1lbnRhdGlvbnNcclxuICAgICAqICovXHJcbiAgICB2YXIgbEdFdmVudHMgPSB7XHJcbiAgICAgICAgYWZ0ZXJBcHBlbmRTbGlkZTogJ2xnQWZ0ZXJBcHBlbmRTbGlkZScsXHJcbiAgICAgICAgaW5pdDogJ2xnSW5pdCcsXHJcbiAgICAgICAgaGFzVmlkZW86ICdsZ0hhc1ZpZGVvJyxcclxuICAgICAgICBjb250YWluZXJSZXNpemU6ICdsZ0NvbnRhaW5lclJlc2l6ZScsXHJcbiAgICAgICAgdXBkYXRlU2xpZGVzOiAnbGdVcGRhdGVTbGlkZXMnLFxyXG4gICAgICAgIGFmdGVyQXBwZW5kU3ViSHRtbDogJ2xnQWZ0ZXJBcHBlbmRTdWJIdG1sJyxcclxuICAgICAgICBiZWZvcmVPcGVuOiAnbGdCZWZvcmVPcGVuJyxcclxuICAgICAgICBhZnRlck9wZW46ICdsZ0FmdGVyT3BlbicsXHJcbiAgICAgICAgc2xpZGVJdGVtTG9hZDogJ2xnU2xpZGVJdGVtTG9hZCcsXHJcbiAgICAgICAgYmVmb3JlU2xpZGU6ICdsZ0JlZm9yZVNsaWRlJyxcclxuICAgICAgICBhZnRlclNsaWRlOiAnbGdBZnRlclNsaWRlJyxcclxuICAgICAgICBwb3N0ZXJDbGljazogJ2xnUG9zdGVyQ2xpY2snLFxyXG4gICAgICAgIGRyYWdTdGFydDogJ2xnRHJhZ1N0YXJ0JyxcclxuICAgICAgICBkcmFnTW92ZTogJ2xnRHJhZ01vdmUnLFxyXG4gICAgICAgIGRyYWdFbmQ6ICdsZ0RyYWdFbmQnLFxyXG4gICAgICAgIGJlZm9yZU5leHRTbGlkZTogJ2xnQmVmb3JlTmV4dFNsaWRlJyxcclxuICAgICAgICBiZWZvcmVQcmV2U2xpZGU6ICdsZ0JlZm9yZVByZXZTbGlkZScsXHJcbiAgICAgICAgYmVmb3JlQ2xvc2U6ICdsZ0JlZm9yZUNsb3NlJyxcclxuICAgICAgICBhZnRlckNsb3NlOiAnbGdBZnRlckNsb3NlJyxcclxuICAgICAgICByb3RhdGVMZWZ0OiAnbGdSb3RhdGVMZWZ0JyxcclxuICAgICAgICByb3RhdGVSaWdodDogJ2xnUm90YXRlUmlnaHQnLFxyXG4gICAgICAgIGZsaXBIb3Jpem9udGFsOiAnbGdGbGlwSG9yaXpvbnRhbCcsXHJcbiAgICAgICAgZmxpcFZlcnRpY2FsOiAnbGdGbGlwVmVydGljYWwnLFxyXG4gICAgICAgIGF1dG9wbGF5OiAnbGdBdXRvcGxheScsXHJcbiAgICAgICAgYXV0b3BsYXlTdGFydDogJ2xnQXV0b3BsYXlTdGFydCcsXHJcbiAgICAgICAgYXV0b3BsYXlTdG9wOiAnbGdBdXRvcGxheVN0b3AnLFxyXG4gICAgfTtcblxuICAgIHZhciBUaHVtYm5haWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gVGh1bWJuYWlsKGluc3RhbmNlLCAkTEcpIHtcclxuICAgICAgICAgICAgdGhpcy50aHVtYk91dGVyV2lkdGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnRodW1iVG90YWxXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlWCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMudGh1bWJDbGlja2FibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gZ2V0IGxpZ2h0R2FsbGVyeSBjb3JlIHBsdWdpbiBpbnN0YW5jZVxyXG4gICAgICAgICAgICB0aGlzLmNvcmUgPSBpbnN0YW5jZTtcclxuICAgICAgICAgICAgdGhpcy4kTEcgPSAkTEc7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIGV4dGVuZCBtb2R1bGUgZGVmYXVsdCBzZXR0aW5ncyB3aXRoIGxpZ2h0R2FsbGVyeSBjb3JlIHNldHRpbmdzXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGh1bWJuYWlsc1NldHRpbmdzKSwgdGhpcy5jb3JlLnNldHRpbmdzKTtcclxuICAgICAgICAgICAgdGhpcy50aHVtYk91dGVyV2lkdGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnRodW1iVG90YWxXaWR0aCA9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAqXHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuc2V0dGluZ3MudGh1bWJXaWR0aCArIHRoaXMuc2V0dGluZ3MudGh1bWJNYXJnaW4pO1xyXG4gICAgICAgICAgICAvLyBUaHVtYm5haWwgYW5pbWF0aW9uIHZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlWCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QW5pbWF0ZVRodW1iU3R5bGVzKCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jb3JlLnNldHRpbmdzLmFsbG93TWVkaWFPdmVybGFwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnRvZ2dsZVRodW1iID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudGh1bWJuYWlsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbmltYXRlVGh1bWIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5lbmFibGVUaHVtYkRyYWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGVUaHVtYkRyYWcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZW5hYmxlVGh1bWJTd2lwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZVRodW1iU3dpcGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aHVtYkNsaWNrYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aHVtYkNsaWNrYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVRodW1iQmFyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRodW1iS2V5UHJlc3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5idWlsZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYk1hcmt1cCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZUFjdGl2ZUNsYXNzT25TbGlkZUNoYW5nZSgpO1xyXG4gICAgICAgICAgICB0aGlzLiRsZ1RodW1iLmZpcnN0KCkub24oJ2NsaWNrLmxnIHRvdWNoZW5kLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gX3RoaXMuJExHKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGlmICghJHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGctaXRlbS1pZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSW4gSUU5IGFuZCBiZWxsb3cgdG91Y2ggZG9lcyBub3Qgc3VwcG9ydFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEdvIHRvIHNsaWRlIGlmIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBjc3MgdHJhbnNpdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMudGh1bWJDbGlja2FibGUgJiYgIV90aGlzLmNvcmUubGdCdXN5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KCR0YXJnZXQuYXR0cignZGF0YS1sZy1pdGVtLWlkJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLnNsaWRlKGluZGV4LCBmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmJlZm9yZVNsaWRlICsgXCIudGh1bWJcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBldmVudC5kZXRhaWwuaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hbmltYXRlVGh1bWIoaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuYmVmb3JlT3BlbiArIFwiLnRodW1iXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnRodW1iT3V0ZXJXaWR0aCA9IF90aGlzLmNvcmUub3V0ZXIuZ2V0KCkub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy51cGRhdGVTbGlkZXMgKyBcIi50aHVtYlwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5yZWJ1aWxkVGh1bWJuYWlscygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuY29udGFpbmVyUmVzaXplICsgXCIudGh1bWJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5jb3JlLmxnT3BlbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRodW1iT3V0ZXJXaWR0aCA9IF90aGlzLmNvcmUub3V0ZXIuZ2V0KCkub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYW5pbWF0ZVRodW1iKF90aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRodW1iT3V0ZXJXaWR0aCA9IF90aGlzLmNvcmUub3V0ZXIuZ2V0KCkub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5zZXRUaHVtYk1hcmt1cCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRodW1iT3V0ZXJDbGFzc05hbWVzID0gJ2xnLXRodW1iLW91dGVyICc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFsaWduVGh1bWJuYWlscykge1xyXG4gICAgICAgICAgICAgICAgdGh1bWJPdXRlckNsYXNzTmFtZXMgKz0gXCJsZy10aHVtYi1hbGlnbi1cIiArIHRoaXMuc2V0dGluZ3MuYWxpZ25UaHVtYm5haWxzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBodG1sID0gXCI8ZGl2IGNsYXNzPVxcXCJcIiArIHRodW1iT3V0ZXJDbGFzc05hbWVzICsgXCJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibGctdGh1bWIgbGctZ3JvdXBcXFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cIjtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLmFkZENsYXNzKCdsZy1oYXMtdGh1bWInKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYXBwZW5kVGh1bWJuYWlsc1RvID09PSAnLmxnLWNvbXBvbmVudHMnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUuJGxnQ29tcG9uZW50cy5hcHBlbmQoaHRtbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIuYXBwZW5kKGh0bWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJHRodW1iT3V0ZXIgPSB0aGlzLmNvcmUub3V0ZXIuZmluZCgnLmxnLXRodW1iLW91dGVyJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgdGhpcy4kbGdUaHVtYiA9IHRoaXMuY29yZS5vdXRlci5maW5kKCcubGctdGh1bWInKS5maXJzdCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbmltYXRlVGh1bWIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcubGctdGh1bWInKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCB0aGlzLmNvcmUuc2V0dGluZ3Muc3BlZWQgKyAnbXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ3dpZHRoJywgdGhpcy50aHVtYlRvdGFsV2lkdGggKyAncHgnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRUaHVtYkl0ZW1IdG1sKHRoaXMuY29yZS5nYWxsZXJ5SXRlbXMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5lbmFibGVUaHVtYkRyYWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciB0aHVtYkRyYWdVdGlscyA9IHtcclxuICAgICAgICAgICAgICAgIGNvcmRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRYOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZFg6IDAsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaXNNb3ZlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBuZXdUcmFuc2xhdGVYOiAwLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgZW5kVGltZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgIHRvdWNoTW92ZVRpbWU6IDAsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBpc0RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuJHRodW1iT3V0ZXIuYWRkQ2xhc3MoJ2xnLWdyYWInKTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLXRodW1iJylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlZG93bi5sZy50aHVtYicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMudGh1bWJUb3RhbFdpZHRoID4gX3RoaXMudGh1bWJPdXRlcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZSBvbmx5IG9uIC5sZy1vYmplY3RcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMuY29yZHMuc3RhcnRYID0gZS5wYWdlWDtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRodW1iQ2xpY2thYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNEcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKiogRml4IGZvciB3ZWJraXQgY3Vyc29yIGlzc3VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yNjcyM1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIuZ2V0KCkuc2Nyb2xsTGVmdCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIuZ2V0KCkuc2Nyb2xsTGVmdCAtPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICpcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kdGh1bWJPdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xnLWdyYWInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xnLWdyYWJiaW5nJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRMRyh3aW5kb3cpLm9uKFwibW91c2Vtb3ZlLmxnLnRodW1iLmdsb2JhbFwiICsgdGhpcy5jb3JlLmxnSWQsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmNvcmUubGdPcGVuZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5jb3Jkcy5lbmRYID0gZS5wYWdlWDtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscyA9IF90aGlzLm9uVGh1bWJUb3VjaE1vdmUodGh1bWJEcmFnVXRpbHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kTEcod2luZG93KS5vbihcIm1vdXNldXAubGcudGh1bWIuZ2xvYmFsXCIgKyB0aGlzLmNvcmUubGdJZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5jb3JlLmxnT3BlbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmICh0aHVtYkRyYWdVdGlscy5pc01vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMgPSBfdGhpcy5vblRodW1iVG91Y2hFbmQodGh1bWJEcmFnVXRpbHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudGh1bWJDbGlja2FibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzRHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJHRodW1iT3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWdyYWJiaW5nJykuYWRkQ2xhc3MoJ2xnLWdyYWInKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLmVuYWJsZVRodW1iU3dpcGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciB0aHVtYkRyYWdVdGlscyA9IHtcclxuICAgICAgICAgICAgICAgIGNvcmRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRYOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZFg6IDAsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaXNNb3ZlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBuZXdUcmFuc2xhdGVYOiAwLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgZW5kVGltZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgIHRvdWNoTW92ZVRpbWU6IDAsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuJGxnVGh1bWIub24oJ3RvdWNoc3RhcnQubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnRodW1iVG90YWxXaWR0aCA+IF90aGlzLnRodW1iT3V0ZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5jb3Jkcy5zdGFydFggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudGh1bWJDbGlja2FibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kbGdUaHVtYi5vbigndG91Y2htb3ZlLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy50aHVtYlRvdGFsV2lkdGggPiBfdGhpcy50aHVtYk91dGVyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMuY29yZHMuZW5kWCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscyA9IF90aGlzLm9uVGh1bWJUb3VjaE1vdmUodGh1bWJEcmFnVXRpbHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kbGdUaHVtYi5vbigndG91Y2hlbmQubGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGh1bWJEcmFnVXRpbHMuaXNNb3ZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzID0gX3RoaXMub25UaHVtYlRvdWNoRW5kKHRodW1iRHJhZ1V0aWxzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRodW1iQ2xpY2thYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBSZWJ1aWxkIHRodW1ibmFpbHNcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLnJlYnVpbGRUaHVtYm5haWxzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdHJhbnNpdGlvbnNcclxuICAgICAgICAgICAgdGhpcy4kdGh1bWJPdXRlci5hZGRDbGFzcygnbGctcmVidWlsZGluZy10aHVtYm5haWxzJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMudGh1bWJUb3RhbFdpZHRoID1cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLmdhbGxlcnlJdGVtcy5sZW5ndGggKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoX3RoaXMuc2V0dGluZ3MudGh1bWJXaWR0aCArIF90aGlzLnNldHRpbmdzLnRodW1iTWFyZ2luKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLiRsZ1RodW1iLmNzcygnd2lkdGgnLCBfdGhpcy50aHVtYlRvdGFsV2lkdGggKyAncHgnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLiRsZ1RodW1iLmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRUaHVtYkl0ZW1IdG1sKF90aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFuaW1hdGVUaHVtYihfdGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLiR0aHVtYk91dGVyLnJlbW92ZUNsYXNzKCdsZy1yZWJ1aWxkaW5nLXRodW1ibmFpbHMnKTtcclxuICAgICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEB0cy1jaGVja1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuc2V0VHJhbnNsYXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxnVGh1bWIuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoLScgKyB2YWx1ZSArICdweCwgMHB4LCAwcHgpJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLmdldFBvc3NpYmxlVHJhbnNmb3JtWCA9IGZ1bmN0aW9uIChsZWZ0KSB7XHJcbiAgICAgICAgICAgIGlmIChsZWZ0ID4gdGhpcy50aHVtYlRvdGFsV2lkdGggLSB0aGlzLnRodW1iT3V0ZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgbGVmdCA9IHRoaXMudGh1bWJUb3RhbFdpZHRoIC0gdGhpcy50aHVtYk91dGVyV2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxlZnQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGVmdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuYW5pbWF0ZVRodW1iID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxnVGh1bWIuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgdGhpcy5jb3JlLnNldHRpbmdzLnNwZWVkICsgJ21zJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVUaHVtYikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gMDtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5zZXR0aW5ncy5jdXJyZW50UGFnZXJQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21pZGRsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGh1bWJPdXRlcldpZHRoIC8gMiAtIHRoaXMuc2V0dGluZ3MudGh1bWJXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLnRodW1iT3V0ZXJXaWR0aCAtIHRoaXMuc2V0dGluZ3MudGh1bWJXaWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlWCA9XHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuc2V0dGluZ3MudGh1bWJXaWR0aCArIHRoaXMuc2V0dGluZ3MudGh1bWJNYXJnaW4pICogaW5kZXggLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAxIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc2xhdGVYID4gdGhpcy50aHVtYlRvdGFsV2lkdGggLSB0aGlzLnRodW1iT3V0ZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlWCA9IHRoaXMudGh1bWJUb3RhbFdpZHRoIC0gdGhpcy50aHVtYk91dGVyV2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc2xhdGVYIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlWCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZSh0aGlzLnRyYW5zbGF0ZVgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLm9uVGh1bWJUb3VjaE1vdmUgPSBmdW5jdGlvbiAodGh1bWJEcmFnVXRpbHMpIHtcclxuICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMubmV3VHJhbnNsYXRlWCA9IHRoaXMudHJhbnNsYXRlWDtcclxuICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMuaXNNb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLnRvdWNoTW92ZVRpbWUgPSBuZXcgRGF0ZSgpLnZhbHVlT2YoKTtcclxuICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMubmV3VHJhbnNsYXRlWCAtPVxyXG4gICAgICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMuY29yZHMuZW5kWCAtIHRodW1iRHJhZ1V0aWxzLmNvcmRzLnN0YXJ0WDtcclxuICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMubmV3VHJhbnNsYXRlWCA9IHRoaXMuZ2V0UG9zc2libGVUcmFuc2Zvcm1YKHRodW1iRHJhZ1V0aWxzLm5ld1RyYW5zbGF0ZVgpO1xyXG4gICAgICAgICAgICAvLyBtb3ZlIGN1cnJlbnQgc2xpZGVcclxuICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2xhdGUodGh1bWJEcmFnVXRpbHMubmV3VHJhbnNsYXRlWCk7XHJcbiAgICAgICAgICAgIHRoaXMuJHRodW1iT3V0ZXIuYWRkQ2xhc3MoJ2xnLWRyYWdnaW5nJyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aHVtYkRyYWdVdGlscztcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUub25UaHVtYlRvdWNoRW5kID0gZnVuY3Rpb24gKHRodW1iRHJhZ1V0aWxzKSB7XHJcbiAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLmlzTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMuZW5kVGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJHRodW1iT3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWRyYWdnaW5nJyk7XHJcbiAgICAgICAgICAgIHZhciB0b3VjaER1cmF0aW9uID0gdGh1bWJEcmFnVXRpbHMuZW5kVGltZS52YWx1ZU9mKCkgLVxyXG4gICAgICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMuc3RhcnRUaW1lLnZhbHVlT2YoKTtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlWG5ldyA9IHRodW1iRHJhZ1V0aWxzLmNvcmRzLmVuZFggLSB0aHVtYkRyYWdVdGlscy5jb3Jkcy5zdGFydFg7XHJcbiAgICAgICAgICAgIHZhciBzcGVlZFggPSBNYXRoLmFicyhkaXN0YW5jZVhuZXcpIC8gdG91Y2hEdXJhdGlvbjtcclxuICAgICAgICAgICAgLy8gU29tZSBtYWdpY2FsIG51bWJlcnNcclxuICAgICAgICAgICAgLy8gQ2FuIGJlIGltcHJvdmVkXHJcbiAgICAgICAgICAgIGlmIChzcGVlZFggPiAwLjE1ICYmXHJcbiAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5lbmRUaW1lLnZhbHVlT2YoKSAtIHRodW1iRHJhZ1V0aWxzLnRvdWNoTW92ZVRpbWUgPCAzMCkge1xyXG4gICAgICAgICAgICAgICAgc3BlZWRYICs9IDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3BlZWRYID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkWCArPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3BlZWRYID1cclxuICAgICAgICAgICAgICAgICAgICBzcGVlZFggK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZFggKiAoTWF0aC5hYnMoZGlzdGFuY2VYbmV3KSAvIHRoaXMudGh1bWJPdXRlcldpZHRoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGxnVGh1bWIuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgTWF0aC5taW4oc3BlZWRYIC0gMSwgMikgKyAnc2V0dGluZ3MnKTtcclxuICAgICAgICAgICAgICAgIGRpc3RhbmNlWG5ldyA9IGRpc3RhbmNlWG5ldyAqIHNwZWVkWDtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlWCA9IHRoaXMuZ2V0UG9zc2libGVUcmFuc2Zvcm1YKHRoaXMudHJhbnNsYXRlWCAtIGRpc3RhbmNlWG5ldyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZSh0aGlzLnRyYW5zbGF0ZVgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVYID0gdGh1bWJEcmFnVXRpbHMubmV3VHJhbnNsYXRlWDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGh1bWJEcmFnVXRpbHMuY29yZHMuZW5kWCAtIHRodW1iRHJhZ1V0aWxzLmNvcmRzLnN0YXJ0WCkgPFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy50aHVtYm5haWxTd2lwZVRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aHVtYkNsaWNrYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRodW1iRHJhZ1V0aWxzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5nZXRUaHVtYkh0bWwgPSBmdW5jdGlvbiAodGh1bWIsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZVZpZGVvSW5mbyA9IHRoaXMuY29yZS5nYWxsZXJ5SXRlbXNbaW5kZXhdLl9fc2xpZGVWaWRlb0luZm8gfHwge307XHJcbiAgICAgICAgICAgIHZhciB0aHVtYkltZztcclxuICAgICAgICAgICAgaWYgKHNsaWRlVmlkZW9JbmZvLnlvdXR1YmUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxvYWRZb3VUdWJlVGh1bWJuYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJJbWcgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLy9pbWcueW91dHViZS5jb20vdmkvJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVZpZGVvSW5mby55b3V0dWJlWzFdICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnlvdVR1YmVUaHVtYlNpemUgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5qcGcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJJbWcgPSB0aHVtYjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRodW1iSW1nID0gdGh1bWI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiPGRpdiBkYXRhLWxnLWl0ZW0taWQ9XFxcIlwiICsgaW5kZXggKyBcIlxcXCIgY2xhc3M9XFxcImxnLXRodW1iLWl0ZW0gXCIgKyAoaW5kZXggPT09IHRoaXMuY29yZS5pbmRleCA/ICcgYWN0aXZlJyA6ICcnKSArIFwiXFxcIiBcXG4gICAgICAgIHN0eWxlPVxcXCJ3aWR0aDpcIiArIHRoaXMuc2V0dGluZ3MudGh1bWJXaWR0aCArIFwicHg7IGhlaWdodDogXCIgKyB0aGlzLnNldHRpbmdzLnRodW1iSGVpZ2h0ICsgXCI7XFxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiBcIiArIHRoaXMuc2V0dGluZ3MudGh1bWJNYXJnaW4gKyBcInB4O1xcXCI+XFxuICAgICAgICAgICAgPGltZyBkYXRhLWxnLWl0ZW0taWQ9XFxcIlwiICsgaW5kZXggKyBcIlxcXCIgc3JjPVxcXCJcIiArIHRodW1iSW1nICsgXCJcXFwiIC8+XFxuICAgICAgICA8L2Rpdj5cIjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuZ2V0VGh1bWJJdGVtSHRtbCA9IGZ1bmN0aW9uIChpdGVtcykge1xyXG4gICAgICAgICAgICB2YXIgdGh1bWJMaXN0ID0gJyc7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRodW1iTGlzdCArPSB0aGlzLmdldFRodW1iSHRtbChpdGVtc1tpXS50aHVtYiwgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRodW1iTGlzdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuc2V0VGh1bWJJdGVtSHRtbCA9IGZ1bmN0aW9uIChpdGVtcykge1xyXG4gICAgICAgICAgICB2YXIgdGh1bWJMaXN0ID0gdGhpcy5nZXRUaHVtYkl0ZW1IdG1sKGl0ZW1zKTtcclxuICAgICAgICAgICAgdGhpcy4kbGdUaHVtYi5odG1sKHRodW1iTGlzdCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLnNldEFuaW1hdGVUaHVtYlN0eWxlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZVRodW1iKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIuYWRkQ2xhc3MoJ2xnLWFuaW1hdGUtdGh1bWInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gTWFuYWdlIHRodW1ibmFpbCBhY3RpdmUgY2Fsc3NcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLm1hbmFnZUFjdGl2ZUNsYXNzT25TbGlkZUNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgLy8gbWFuYWdlIGFjdGl2ZSBjbGFzcyBmb3IgdGh1bWJuYWlsXHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmJlZm9yZVNsaWRlICsgXCIudGh1bWJcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHRodW1iID0gX3RoaXMuY29yZS5vdXRlci5maW5kKCcubGctdGh1bWItaXRlbScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZXZlbnQuZGV0YWlsLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgJHRodW1iLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICR0aHVtYi5lcShpbmRleCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFRvZ2dsZSB0aHVtYm5haWwgYmFyXHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS50b2dnbGVUaHVtYkJhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudG9nZ2xlVGh1bWIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5hZGRDbGFzcygnbGctY2FuLXRvZ2dsZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLiR0b29sYmFyLmFwcGVuZCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cIicgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudGh1bWJuYWlsUGx1Z2luU3RyaW5nc1sndG9nZ2xlVGh1bWJuYWlscyddICtcclxuICAgICAgICAgICAgICAgICAgICAnXCIgY2xhc3M9XCJsZy10b2dnbGUtdGh1bWIgbGctaWNvblwiPjwvYnV0dG9uPicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy10b2dnbGUtdGh1bWInKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLnRvZ2dsZUNsYXNzKCdsZy1jb21wb25lbnRzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLnRodW1iS2V5UHJlc3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuJExHKHdpbmRvdykub24oXCJrZXlkb3duLmxnLnRodW1iLmdsb2JhbFwiICsgdGhpcy5jb3JlLmxnSWQsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmNvcmUubGdPcGVuZWQgfHwgIV90aGlzLnNldHRpbmdzLnRvZ2dsZVRodW1iKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDM4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIuYWRkQ2xhc3MoJ2xnLWNvbXBvbmVudHMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXlDb2RlID09PSA0MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1jb21wb25lbnRzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnRodW1ibmFpbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kTEcod2luZG93KS5vZmYoXCIubGcudGh1bWIuZ2xvYmFsXCIgKyB0aGlzLmNvcmUubGdJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vZmYoJy5sZy50aHVtYicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub2ZmKCcudGh1bWInKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRodW1iT3V0ZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWhhcy10aHVtYicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gVGh1bWJuYWlsO1xyXG4gICAgfSgpKTtcblxuICAgIHJldHVybiBUaHVtYm5haWw7XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sZy10aHVtYm5haWwudW1kLmpzLm1hcFxuIiwiLyohXG4gKiBsaWdodGdhbGxlcnkgfCAyLjQuMC1iZXRhLjAgfCBEZWNlbWJlciAxMnRoIDIwMjFcbiAqIGh0dHA6Ly93d3cubGlnaHRnYWxsZXJ5anMuY29tL1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFNhY2hpbiBOZXJhdmF0aDtcbiAqIEBsaWNlbnNlIEdQTHYzXG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwubGdab29tID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcbiAgICBQZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxuICAgIHB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcbiAgICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcbiAgICBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuICAgIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuICAgIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG4gICAgTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuICAgIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuICAgIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICAgIHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XG5cbiAgICB2YXIgem9vbVNldHRpbmdzID0ge1xyXG4gICAgICAgIHNjYWxlOiAxLFxyXG4gICAgICAgIHpvb206IHRydWUsXHJcbiAgICAgICAgYWN0dWFsU2l6ZTogdHJ1ZSxcclxuICAgICAgICBzaG93Wm9vbUluT3V0SWNvbnM6IGZhbHNlLFxyXG4gICAgICAgIGFjdHVhbFNpemVJY29uczoge1xyXG4gICAgICAgICAgICB6b29tSW46ICdsZy16b29tLWluJyxcclxuICAgICAgICAgICAgem9vbU91dDogJ2xnLXpvb20tb3V0JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuYWJsZVpvb21BZnRlcjogMzAwLFxyXG4gICAgICAgIHpvb21QbHVnaW5TdHJpbmdzOiB7XHJcbiAgICAgICAgICAgIHpvb21JbjogJ1pvb20gaW4nLFxyXG4gICAgICAgICAgICB6b29tT3V0OiAnWm9vbSBvdXQnLFxyXG4gICAgICAgICAgICB2aWV3QWN0dWFsU2l6ZTogJ1ZpZXcgYWN0dWFsIHNpemUnLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xuXG4gICAgLyoqXHJcbiAgICAgKiBMaXN0IG9mIGxpZ2h0R2FsbGVyeSBldmVudHNcclxuICAgICAqIEFsbCBldmVudHMgc2hvdWxkIGJlIGRvY3VtZW50ZWQgaGVyZVxyXG4gICAgICogQmVsb3cgaW50ZXJmYWNlcyBhcmUgdXNlZCB0byBidWlsZCB0aGUgd2Vic2l0ZSBkb2N1bWVudGF0aW9uc1xyXG4gICAgICogKi9cclxuICAgIHZhciBsR0V2ZW50cyA9IHtcclxuICAgICAgICBhZnRlckFwcGVuZFNsaWRlOiAnbGdBZnRlckFwcGVuZFNsaWRlJyxcclxuICAgICAgICBpbml0OiAnbGdJbml0JyxcclxuICAgICAgICBoYXNWaWRlbzogJ2xnSGFzVmlkZW8nLFxyXG4gICAgICAgIGNvbnRhaW5lclJlc2l6ZTogJ2xnQ29udGFpbmVyUmVzaXplJyxcclxuICAgICAgICB1cGRhdGVTbGlkZXM6ICdsZ1VwZGF0ZVNsaWRlcycsXHJcbiAgICAgICAgYWZ0ZXJBcHBlbmRTdWJIdG1sOiAnbGdBZnRlckFwcGVuZFN1Ykh0bWwnLFxyXG4gICAgICAgIGJlZm9yZU9wZW46ICdsZ0JlZm9yZU9wZW4nLFxyXG4gICAgICAgIGFmdGVyT3BlbjogJ2xnQWZ0ZXJPcGVuJyxcclxuICAgICAgICBzbGlkZUl0ZW1Mb2FkOiAnbGdTbGlkZUl0ZW1Mb2FkJyxcclxuICAgICAgICBiZWZvcmVTbGlkZTogJ2xnQmVmb3JlU2xpZGUnLFxyXG4gICAgICAgIGFmdGVyU2xpZGU6ICdsZ0FmdGVyU2xpZGUnLFxyXG4gICAgICAgIHBvc3RlckNsaWNrOiAnbGdQb3N0ZXJDbGljaycsXHJcbiAgICAgICAgZHJhZ1N0YXJ0OiAnbGdEcmFnU3RhcnQnLFxyXG4gICAgICAgIGRyYWdNb3ZlOiAnbGdEcmFnTW92ZScsXHJcbiAgICAgICAgZHJhZ0VuZDogJ2xnRHJhZ0VuZCcsXHJcbiAgICAgICAgYmVmb3JlTmV4dFNsaWRlOiAnbGdCZWZvcmVOZXh0U2xpZGUnLFxyXG4gICAgICAgIGJlZm9yZVByZXZTbGlkZTogJ2xnQmVmb3JlUHJldlNsaWRlJyxcclxuICAgICAgICBiZWZvcmVDbG9zZTogJ2xnQmVmb3JlQ2xvc2UnLFxyXG4gICAgICAgIGFmdGVyQ2xvc2U6ICdsZ0FmdGVyQ2xvc2UnLFxyXG4gICAgICAgIHJvdGF0ZUxlZnQ6ICdsZ1JvdGF0ZUxlZnQnLFxyXG4gICAgICAgIHJvdGF0ZVJpZ2h0OiAnbGdSb3RhdGVSaWdodCcsXHJcbiAgICAgICAgZmxpcEhvcml6b250YWw6ICdsZ0ZsaXBIb3Jpem9udGFsJyxcclxuICAgICAgICBmbGlwVmVydGljYWw6ICdsZ0ZsaXBWZXJ0aWNhbCcsXHJcbiAgICAgICAgYXV0b3BsYXk6ICdsZ0F1dG9wbGF5JyxcclxuICAgICAgICBhdXRvcGxheVN0YXJ0OiAnbGdBdXRvcGxheVN0YXJ0JyxcclxuICAgICAgICBhdXRvcGxheVN0b3A6ICdsZ0F1dG9wbGF5U3RvcCcsXHJcbiAgICB9O1xuXG4gICAgdmFyIFpvb20gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gWm9vbShpbnN0YW5jZSwgJExHKSB7XHJcbiAgICAgICAgICAgIC8vIGdldCBsaWdodEdhbGxlcnkgY29yZSBwbHVnaW4gaW5zdGFuY2VcclxuICAgICAgICAgICAgdGhpcy5jb3JlID0gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMuJExHID0gJExHO1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHpvb21TZXR0aW5ncyksIHRoaXMuY29yZS5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBcHBlbmQgWm9vbSBjb250cm9scy4gQWN0dWFsIHNpemUsIFpvb20taW4sIFpvb20tb3V0XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuYnVpbGRUZW1wbGF0ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB6b29tSWNvbnMgPSB0aGlzLnNldHRpbmdzLnNob3dab29tSW5PdXRJY29uc1xyXG4gICAgICAgICAgICAgICAgPyBcIjxidXR0b24gaWQ9XFxcIlwiICsgdGhpcy5jb3JlLmdldElkTmFtZSgnbGctem9vbS1pbicpICsgXCJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnpvb21QbHVnaW5TdHJpbmdzWyd6b29tSW4nXSArIFwiXFxcIiBjbGFzcz1cXFwibGctem9vbS1pbiBsZy1pY29uXFxcIj48L2J1dHRvbj48YnV0dG9uIGlkPVxcXCJcIiArIHRoaXMuY29yZS5nZXRJZE5hbWUoJ2xnLXpvb20tb3V0JykgKyBcIlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Muem9vbVBsdWdpblN0cmluZ3NbJ3pvb21JbiddICsgXCJcXFwiIGNsYXNzPVxcXCJsZy16b29tLW91dCBsZy1pY29uXFxcIj48L2J1dHRvbj5cIlxyXG4gICAgICAgICAgICAgICAgOiAnJztcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYWN0dWFsU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgem9vbUljb25zICs9IFwiPGJ1dHRvbiBpZD1cXFwiXCIgKyB0aGlzLmNvcmUuZ2V0SWROYW1lKCdsZy1hY3R1YWwtc2l6ZScpICsgXCJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnpvb21QbHVnaW5TdHJpbmdzWyd2aWV3QWN0dWFsU2l6ZSddICsgXCJcXFwiIGNsYXNzPVxcXCJcIiArIHRoaXMuc2V0dGluZ3MuYWN0dWFsU2l6ZUljb25zLnpvb21JbiArIFwiIGxnLWljb25cXFwiPjwvYnV0dG9uPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5hZGRDbGFzcygnbGctdXNlLXRyYW5zaXRpb24tZm9yLXpvb20nKTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLiR0b29sYmFyLmZpcnN0KCkuYXBwZW5kKHpvb21JY29ucyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBFbmFibGUgem9vbSBvcHRpb24gb25seSBvbmNlIHRoZSBpbWFnZSBpcyBjb21wbGV0ZWx5IGxvYWRlZFxyXG4gICAgICAgICAqIElmIHpvb21Gcm9tT3JpZ2luIGlzIHRydWUsIFpvb20gaXMgZW5hYmxlZCBvbmNlIHRoZSBkdW1teSBpbWFnZSBoYXMgYmVlbiBpbnNlcnRlZFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogWm9vbSBzdHlsZXMgYXJlIGRlZmluZWQgdW5kZXIgbGctem9vbWFibGUgQ1NTIGNsYXNzLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmVuYWJsZVpvb20gPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgLy8gZGVsYXkgd2lsbCBiZSAwIGV4Y2VwdCBmaXJzdCB0aW1lXHJcbiAgICAgICAgICAgIHZhciBfc3BlZWQgPSB0aGlzLnNldHRpbmdzLmVuYWJsZVpvb21BZnRlciArIGV2ZW50LmRldGFpbC5kZWxheTtcclxuICAgICAgICAgICAgLy8gc2V0IF9zcGVlZCB2YWx1ZSAwIGlmIGdhbGxlcnkgb3BlbmVkIGZyb20gZGlyZWN0IHVybCBhbmQgaWYgaXQgaXMgZmlyc3Qgc2xpZGVcclxuICAgICAgICAgICAgaWYgKHRoaXMuJExHKCdib2R5JykuZmlyc3QoKS5oYXNDbGFzcygnbGctZnJvbS1oYXNoJykgJiZcclxuICAgICAgICAgICAgICAgIGV2ZW50LmRldGFpbC5kZWxheSkge1xyXG4gICAgICAgICAgICAgICAgLy8gd2lsbCBleGVjdXRlIG9ubHkgb25jZVxyXG4gICAgICAgICAgICAgICAgX3NwZWVkID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBsZy1mcm9tLWhhc2ggdG8gZW5hYmxlIHN0YXJ0aW5nIGFuaW1hdGlvbi5cclxuICAgICAgICAgICAgICAgIHRoaXMuJExHKCdib2R5JykuZmlyc3QoKS5yZW1vdmVDbGFzcygnbGctZnJvbS1oYXNoJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy56b29tYWJsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuaXNJbWFnZVNsaWRlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLmdldFNsaWRlSXRlbShldmVudC5kZXRhaWwuaW5kZXgpLmFkZENsYXNzKCdsZy16b29tYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmRldGFpbC5pbmRleCA9PT0gX3RoaXMuY29yZS5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFpvb21Fc3NlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIF9zcGVlZCArIDMwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmVuYWJsZVpvb21PblNsaWRlSXRlbUxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIEFkZCB6b29tYWJsZSBjbGFzc1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5zbGlkZUl0ZW1Mb2FkICsgXCIuem9vbVwiLCB0aGlzLmVuYWJsZVpvb20uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRNb2RpZmllciA9IGZ1bmN0aW9uIChyb3RhdGVWYWx1ZSwgYXhpcywgZWwpIHtcclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsUm90YXRlID0gcm90YXRlVmFsdWU7XHJcbiAgICAgICAgICAgIHJvdGF0ZVZhbHVlID0gTWF0aC5hYnMocm90YXRlVmFsdWUpO1xyXG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtVmFsdWVzID0gdGhpcy5nZXRDdXJyZW50VHJhbnNmb3JtKGVsKTtcclxuICAgICAgICAgICAgaWYgKCF0cmFuc2Zvcm1WYWx1ZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBtb2RpZmllciA9IDE7XHJcbiAgICAgICAgICAgIGlmIChheGlzID09PSAnWCcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmbGlwSG9yaXpvbnRhbFZhbHVlID0gTWF0aC5zaWduKHBhcnNlRmxvYXQodHJhbnNmb3JtVmFsdWVzWzBdKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocm90YXRlVmFsdWUgPT09IDAgfHwgcm90YXRlVmFsdWUgPT09IDE4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJvdGF0ZVZhbHVlID09PSA5MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgob3JpZ2luYWxSb3RhdGUgPT09IC05MCAmJiBmbGlwSG9yaXpvbnRhbFZhbHVlID09PSAxKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAob3JpZ2luYWxSb3RhdGUgPT09IDkwICYmIGZsaXBIb3Jpem9udGFsVmFsdWUgPT09IC0xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllciA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gbW9kaWZpZXIgKiBmbGlwSG9yaXpvbnRhbFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZsaXBWZXJ0aWNhbFZhbHVlID0gTWF0aC5zaWduKHBhcnNlRmxvYXQodHJhbnNmb3JtVmFsdWVzWzNdKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocm90YXRlVmFsdWUgPT09IDAgfHwgcm90YXRlVmFsdWUgPT09IDE4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJvdGF0ZVZhbHVlID09PSA5MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzaW5YID0gcGFyc2VGbG9hdCh0cmFuc2Zvcm1WYWx1ZXNbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzaW5NaW51c1ggPSBwYXJzZUZsb2F0KHRyYW5zZm9ybVZhbHVlc1syXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXIgPSBNYXRoLnNpZ24oc2luWCAqIHNpbk1pbnVzWCAqIG9yaWdpbmFsUm90YXRlICogZmxpcFZlcnRpY2FsVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbW9kaWZpZXIgPSBtb2RpZmllciAqIGZsaXBWZXJ0aWNhbFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RpZmllcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldEltYWdlU2l6ZSA9IGZ1bmN0aW9uICgkaW1hZ2UsIHJvdGF0ZVZhbHVlLCBheGlzKSB7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZVNpemVzID0ge1xyXG4gICAgICAgICAgICAgICAgeTogJ29mZnNldEhlaWdodCcsXHJcbiAgICAgICAgICAgICAgICB4OiAnb2Zmc2V0V2lkdGgnLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMocm90YXRlVmFsdWUpID09PSA5MCkge1xyXG4gICAgICAgICAgICAgICAgLy8gU3dhcCBheGlzXHJcbiAgICAgICAgICAgICAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXhpcyA9ICd5JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGF4aXMgPSAneCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICRpbWFnZVtpbWFnZVNpemVzW2F4aXNdXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldERyYWdDb3JkcyA9IGZ1bmN0aW9uIChlLCByb3RhdGVWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAocm90YXRlVmFsdWUgPT09IDkwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGUucGFnZVksXHJcbiAgICAgICAgICAgICAgICAgICAgeTogZS5wYWdlWCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGUucGFnZVgsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogZS5wYWdlWSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldFN3aXBlQ29yZHMgPSBmdW5jdGlvbiAoZSwgcm90YXRlVmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICAgICAgICAgIHZhciB5ID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xyXG4gICAgICAgICAgICBpZiAocm90YXRlVmFsdWUgPT09IDkwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IHksXHJcbiAgICAgICAgICAgICAgICAgICAgeTogeCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldERyYWdBbGxvd2VkQXhpc2VzID0gZnVuY3Rpb24gKHJvdGF0ZVZhbHVlLCBzY2FsZSkge1xyXG4gICAgICAgICAgICBzY2FsZSA9IHNjYWxlIHx8IHRoaXMuc2NhbGUgfHwgMTtcclxuICAgICAgICAgICAgdmFyIGFsbG93WSA9IHRoaXMuaW1hZ2VZU2l6ZSAqIHNjYWxlID4gdGhpcy5jb250YWluZXJSZWN0LmhlaWdodDtcclxuICAgICAgICAgICAgdmFyIGFsbG93WCA9IHRoaXMuaW1hZ2VYU2l6ZSAqIHNjYWxlID4gdGhpcy5jb250YWluZXJSZWN0LndpZHRoO1xyXG4gICAgICAgICAgICBpZiAocm90YXRlVmFsdWUgPT09IDkwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93WDogYWxsb3dZLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93WTogYWxsb3dYLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dYOiBhbGxvd1gsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dZOiBhbGxvd1ksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcclxuICAgICAgICAgKiBAcmV0dXJuIG1hdHJpeChjb3MoWCksIHNpbihYKSwgLXNpbihYKSwgY29zKFgpLCAwLCAwKTtcclxuICAgICAgICAgKiBHZXQgdGhlIGN1cnJlbnQgdHJhbnNmb3JtIHZhbHVlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0Q3VycmVudFRyYW5zZm9ybSA9IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICBpZiAoIWVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHN0ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpO1xyXG4gICAgICAgICAgICB2YXIgdG0gPSBzdC5nZXRQcm9wZXJ0eVZhbHVlKCctd2Via2l0LXRyYW5zZm9ybScpIHx8XHJcbiAgICAgICAgICAgICAgICBzdC5nZXRQcm9wZXJ0eVZhbHVlKCctbW96LXRyYW5zZm9ybScpIHx8XHJcbiAgICAgICAgICAgICAgICBzdC5nZXRQcm9wZXJ0eVZhbHVlKCctbXMtdHJhbnNmb3JtJykgfHxcclxuICAgICAgICAgICAgICAgIHN0LmdldFByb3BlcnR5VmFsdWUoJy1vLXRyYW5zZm9ybScpIHx8XHJcbiAgICAgICAgICAgICAgICBzdC5nZXRQcm9wZXJ0eVZhbHVlKCd0cmFuc2Zvcm0nKSB8fFxyXG4gICAgICAgICAgICAgICAgJ25vbmUnO1xyXG4gICAgICAgICAgICBpZiAodG0gIT09ICdub25lJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRtLnNwbGl0KCcoJylbMV0uc3BsaXQoJyknKVswXS5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldEN1cnJlbnRSb3RhdGlvbiA9IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICBpZiAoIWVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gdGhpcy5nZXRDdXJyZW50VHJhbnNmb3JtKGVsKTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5hdGFuMihwYXJzZUZsb2F0KHZhbHVlc1sxXSksIHBhcnNlRmxvYXQodmFsdWVzWzBdKSkgKlxyXG4gICAgICAgICAgICAgICAgICAgICgxODAgLyBNYXRoLlBJKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB5b3Ugd2FudCByb3RhdGUgaW4gMzYwXHJcbiAgICAgICAgICAgICAgICAvL3JldHVybiAoYW5nbGUgPCAwID8gYW5nbGUgKyAzNjAgOiBhbmdsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5zZXRab29tRXNzZW50aWFscyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICRpbWFnZSA9IHRoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltYWdlJylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgcm90YXRlRWwgPSB0aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0odGhpcy5jb3JlLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWctcm90YXRlJylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlVmFsdWUgPSB0aGlzLmdldEN1cnJlbnRSb3RhdGlvbihyb3RhdGVFbCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VZU2l6ZSA9IHRoaXMuZ2V0SW1hZ2VTaXplKCRpbWFnZS5nZXQoKSwgdGhpcy5yb3RhdGVWYWx1ZSwgJ3knKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZVhTaXplID0gdGhpcy5nZXRJbWFnZVNpemUoJGltYWdlLmdldCgpLCB0aGlzLnJvdGF0ZVZhbHVlLCAneCcpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lclJlY3QgPSB0aGlzLmNvcmUub3V0ZXIuZ2V0KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMubW9kaWZpZXJYID0gdGhpcy5nZXRNb2RpZmllcih0aGlzLnJvdGF0ZVZhbHVlLCAnWCcsIHJvdGF0ZUVsKTtcclxuICAgICAgICAgICAgdGhpcy5tb2RpZmllclkgPSB0aGlzLmdldE1vZGlmaWVyKHRoaXMucm90YXRlVmFsdWUsICdZJywgcm90YXRlRWwpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgSW1hZ2Ugem9vbVxyXG4gICAgICAgICAqIFRyYW5zbGF0ZSB0aGUgd3JhcCBhbmQgc2NhbGUgdGhlIGltYWdlIHRvIGdldCBiZXR0ZXIgdXNlciBleHBlcmllbmNlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2NhbGUgLSBab29tIGRlY3JlbWVudC9pbmNyZW1lbnQgdmFsdWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBab29tLnByb3RvdHlwZS56b29tSW1hZ2UgPSBmdW5jdGlvbiAoc2NhbGUpIHtcclxuICAgICAgICAgICAgLy8gRmluZCBvZmZzZXQgbWFudWFsbHkgdG8gYXZvaWQgaXNzdWUgYWZ0ZXIgem9vbVxyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0WCA9ICh0aGlzLmNvbnRhaW5lclJlY3Qud2lkdGggLSB0aGlzLmltYWdlWFNpemUpIC8gMiArXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lclJlY3QubGVmdDtcclxuICAgICAgICAgICAgdmFyIF9hID0gdGhpcy5jb3JlLm1lZGlhQ29udGFpbmVyUG9zaXRpb24sIHRvcCA9IF9hLnRvcCwgYm90dG9tID0gX2EuYm90dG9tO1xyXG4gICAgICAgICAgICB2YXIgdG9wQm90dG9tU3BhY2luZyA9IE1hdGguYWJzKHRvcCAtIGJvdHRvbSkgLyAyO1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0WSA9ICh0aGlzLmNvbnRhaW5lclJlY3QuaGVpZ2h0IC1cclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VZU2l6ZSAtXHJcbiAgICAgICAgICAgICAgICB0b3BCb3R0b21TcGFjaW5nICogdGhpcy5tb2RpZmllclgpIC9cclxuICAgICAgICAgICAgICAgIDIgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb3AgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXJSZWN0LnRvcDtcclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsWDtcclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsWTtcclxuICAgICAgICAgICAgaWYgKHNjYWxlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBkcmFnQWxsb3dlZEF4aXNlcyA9IHRoaXMuZ2V0RHJhZ0FsbG93ZWRBeGlzZXMoTWF0aC5hYnModGhpcy5yb3RhdGVWYWx1ZSksIHNjYWxlKTtcclxuICAgICAgICAgICAgdmFyIGFsbG93WSA9IGRyYWdBbGxvd2VkQXhpc2VzLmFsbG93WSwgYWxsb3dYID0gZHJhZ0FsbG93ZWRBeGlzZXMuYWxsb3dYO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbkNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsWCA9IHRoaXMubGVmdCAvICh0aGlzLnNjYWxlIC0gMSk7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFkgPSB0aGlzLnRvcCAvICh0aGlzLnNjYWxlIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VYID0gTWF0aC5hYnMob3JpZ2luYWxYKSArIG9mZnNldFg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VZID0gTWF0aC5hYnMob3JpZ2luYWxZKSArIG9mZnNldFk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwb3NzaWJsZVN3aXBlQ29yZHMgPSB0aGlzLmdldFBvc3NpYmxlU3dpcGVEcmFnQ29yZHModGhpcy5yb3RhdGVWYWx1ZSwgc2NhbGUpO1xyXG4gICAgICAgICAgICB2YXIgX3ggPSBvZmZzZXRYIC0gdGhpcy5wYWdlWDtcclxuICAgICAgICAgICAgdmFyIF95ID0gb2Zmc2V0WSAtIHRoaXMucGFnZVk7XHJcbiAgICAgICAgICAgIHZhciB4ID0gKHNjYWxlIC0gMSkgKiBfeDtcclxuICAgICAgICAgICAgdmFyIHkgPSAoc2NhbGUgLSAxKSAqIF95O1xyXG4gICAgICAgICAgICBpZiAoYWxsb3dYKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlTGVmdCh4LCBwb3NzaWJsZVN3aXBlQ29yZHMubWluWCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB4ID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVSaWdodCh4LCBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB4ID0gcG9zc2libGVTd2lwZUNvcmRzLm1heFg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2NhbGUgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHggPCBwb3NzaWJsZVN3aXBlQ29yZHMubWluWCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHggPiBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gcG9zc2libGVTd2lwZUNvcmRzLm1heFg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbGxvd1kpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVUb3AoeSwgcG9zc2libGVTd2lwZUNvcmRzLm1pblkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5ZO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlQm90dG9tKHksIHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgPSBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSB0cmFuc2xhdGUgdmFsdWUgYmFzZWQgb24gaW5kZXggb2YgYmV5b25kIHRoZSB2aWV3cG9ydCwgdXRpbGl6ZSB0aGUgYXZhaWxhYmxlIHNwYWNlIHRvIHByZXZlbnQgaW1hZ2UgYmVpbmcgY3V0IG91dFxyXG4gICAgICAgICAgICAgICAgaWYgKHNjYWxlID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vSWYgaW1hZ2UgZ29lcyBiZXlvbmQgdmlld3BvcnQgdG9wLCB1c2UgdGhlIG1pbmltIHBvc3NpYmxlIHRyYW5zbGF0ZSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh5IDwgcG9zc2libGVTd2lwZUNvcmRzLm1pblkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5ZO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh5ID4gcG9zc2libGVTd2lwZUNvcmRzLm1heFkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhZO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFpvb21TdHlsZXMoe1xyXG4gICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgICAgICBzY2FsZTogc2NhbGUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgYXBwbHkgc2NhbGUzZCB0byBpbWFnZSBhbmQgdHJhbnNsYXRlIHRvIGltYWdlIHdyYXBcclxuICAgICAgICAgKiBAcGFyYW0ge3N0eWxlfSBYLFkgYW5kIHNjYWxlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuc2V0Wm9vbVN0eWxlcyA9IGZ1bmN0aW9uIChzdHlsZSkge1xyXG4gICAgICAgICAgICB2YXIgJGltYWdlID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1hZ2UnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciAkZHVtbXlJbWFnZSA9IHRoaXMuY29yZS5vdXRlclxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1jdXJyZW50IC5sZy1kdW1teS1pbWcnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciAkaW1hZ2VXcmFwID0gJGltYWdlLnBhcmVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlID0gc3R5bGUuc2NhbGU7XHJcbiAgICAgICAgICAgICRpbWFnZS5jc3MoJ3RyYW5zZm9ybScsICdzY2FsZTNkKCcgKyBzdHlsZS5zY2FsZSArICcsICcgKyBzdHlsZS5zY2FsZSArICcsIDEpJyk7XHJcbiAgICAgICAgICAgICRkdW1teUltYWdlLmNzcygndHJhbnNmb3JtJywgJ3NjYWxlM2QoJyArIHN0eWxlLnNjYWxlICsgJywgJyArIHN0eWxlLnNjYWxlICsgJywgMSknKTtcclxuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgc3R5bGUueCArICdweCwgJyArIHN0eWxlLnkgKyAncHgsIDApJztcclxuICAgICAgICAgICAgJGltYWdlV3JhcC5jc3MoJ3RyYW5zZm9ybScsIHRyYW5zZm9ybSk7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IHN0eWxlLng7XHJcbiAgICAgICAgICAgIHRoaXMudG9wID0gc3R5bGUueTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSBpbmRleCAtIEluZGV4IG9mIHRoZSBjdXJyZW50IHNsaWRlXHJcbiAgICAgICAgICogQHBhcmFtIGV2ZW50IC0gZXZlbnQgd2lsbCBiZSBhdmFpbGFibGUgb25seSBpZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGNsaWNraW5nL3RhcGluZyB0aGUgaW1hZ3NcclxuICAgICAgICAgKi9cclxuICAgICAgICBab29tLnByb3RvdHlwZS5zZXRBY3R1YWxTaXplID0gZnVuY3Rpb24gKGluZGV4LCBldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBBbGxvdyB6b29tIG9ubHkgb24gaW1hZ2VcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzSW1hZ2VTbGlkZSgpIHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIuaGFzQ2xhc3MoJ2xnLWZpcnN0LXNsaWRlLWxvYWRpbmcnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzY2FsZSA9IHRoaXMuZ2V0Q3VycmVudEltYWdlQWN0dWFsU2l6ZVNjYWxlKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvcmUub3V0ZXIuaGFzQ2xhc3MoJ2xnLXpvb21lZCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgPSB0aGlzLmdldFNjYWxlKHNjYWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFBhZ2VDb3JkcyhldmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5ab29tKHRoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnpvb21JbWFnZSh0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1ncmFiYmluZycpLmFkZENsYXNzKCdsZy1ncmFiJyk7XHJcbiAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldE5hdHVyYWxXaWR0aCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICB2YXIgJGltYWdlID0gdGhpcy5jb3JlLmdldFNsaWRlSXRlbShpbmRleCkuZmluZCgnLmxnLWltYWdlJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyIG5hdHVyYWxXaWR0aCA9IHRoaXMuY29yZS5nYWxsZXJ5SXRlbXNbaW5kZXhdLndpZHRoO1xyXG4gICAgICAgICAgICByZXR1cm4gbmF0dXJhbFdpZHRoXHJcbiAgICAgICAgICAgICAgICA/IHBhcnNlRmxvYXQobmF0dXJhbFdpZHRoKVxyXG4gICAgICAgICAgICAgICAgOiAkaW1hZ2UuZ2V0KCkubmF0dXJhbFdpZHRoO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0QWN0dWFsU2l6ZVNjYWxlID0gZnVuY3Rpb24gKG5hdHVyYWxXaWR0aCwgd2lkdGgpIHtcclxuICAgICAgICAgICAgdmFyIF9zY2FsZTtcclxuICAgICAgICAgICAgdmFyIHNjYWxlO1xyXG4gICAgICAgICAgICBpZiAobmF0dXJhbFdpZHRoID4gd2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIF9zY2FsZSA9IG5hdHVyYWxXaWR0aCAvIHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgc2NhbGUgPSBfc2NhbGUgfHwgMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRDdXJyZW50SW1hZ2VBY3R1YWxTaXplU2NhbGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkaW1hZ2UgPSB0aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0odGhpcy5jb3JlLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWFnZScpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gJGltYWdlLmdldCgpLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICB2YXIgbmF0dXJhbFdpZHRoID0gdGhpcy5nZXROYXR1cmFsV2lkdGgodGhpcy5jb3JlLmluZGV4KSB8fCB3aWR0aDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWN0dWFsU2l6ZVNjYWxlKG5hdHVyYWxXaWR0aCwgd2lkdGgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0UGFnZUNvcmRzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBjb3JkcyA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvcmRzLnggPSBldmVudC5wYWdlWCB8fCBldmVudC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgY29yZHMueSA9IGV2ZW50LnBhZ2VZIHx8IGV2ZW50LnRhcmdldFRvdWNoZXNbMF0ucGFnZVk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyUmVjdCA9IHRoaXMuY29yZS5vdXRlci5nZXQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgIGNvcmRzLnggPSBjb250YWluZXJSZWN0LndpZHRoIC8gMiArIGNvbnRhaW5lclJlY3QubGVmdDtcclxuICAgICAgICAgICAgICAgIGNvcmRzLnkgPVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lclJlY3QuaGVpZ2h0IC8gMiArIHRoaXMuc2Nyb2xsVG9wICsgY29udGFpbmVyUmVjdC50b3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNvcmRzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuc2V0UGFnZUNvcmRzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBwYWdlQ29yZHMgPSB0aGlzLmdldFBhZ2VDb3JkcyhldmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVggPSBwYWdlQ29yZHMueDtcclxuICAgICAgICAgICAgdGhpcy5wYWdlWSA9IHBhZ2VDb3Jkcy55O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gSWYgdHJ1ZSwgem9vbWVkIC0gaW4gZWxzZSB6b29tZWQgb3V0XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuYmVnaW5ab29tID0gZnVuY3Rpb24gKHNjYWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5yZW1vdmVDbGFzcygnbGctem9vbS1kcmFnLXRyYW5zaXRpb24gbGctem9vbS1kcmFnZ2luZycpO1xyXG4gICAgICAgICAgICBpZiAoc2NhbGUgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIuYWRkQ2xhc3MoJ2xnLXpvb21lZCcpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRhY3R1YWxTaXplID0gdGhpcy5jb3JlLmdldEVsZW1lbnRCeUlkKCdsZy1hY3R1YWwtc2l6ZScpO1xyXG4gICAgICAgICAgICAgICAgJGFjdHVhbFNpemVcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3ModGhpcy5zZXR0aW5ncy5hY3R1YWxTaXplSWNvbnMuem9vbUluKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLmFjdHVhbFNpemVJY29ucy56b29tT3V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRab29tKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlID4gMTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldFNjYWxlID0gZnVuY3Rpb24gKHNjYWxlKSB7XHJcbiAgICAgICAgICAgIHZhciBhY3R1YWxTaXplU2NhbGUgPSB0aGlzLmdldEN1cnJlbnRJbWFnZUFjdHVhbFNpemVTY2FsZSgpO1xyXG4gICAgICAgICAgICBpZiAoc2NhbGUgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2NhbGUgPiBhY3R1YWxTaXplU2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gYWN0dWFsU2l6ZVNjYWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy56b29tKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5idWlsZFRlbXBsYXRlcygpO1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZVpvb21PblNsaWRlSXRlbUxvYWQoKTtcclxuICAgICAgICAgICAgdmFyIHRhcHBlZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5vbignZGJsY2xpY2subGcnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuJExHKGV2ZW50LnRhcmdldCkuaGFzQ2xhc3MoJ2xnLWltYWdlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRBY3R1YWxTaXplKF90aGlzLmNvcmUuaW5kZXgsIGV2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5vbigndG91Y2hzdGFydC5sZycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICR0YXJnZXQgPSBfdGhpcy4kTEcoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICR0YXJnZXQuaGFzQ2xhc3MoJ2xnLWltYWdlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRhcHBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXBwZWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcHBlZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGFwcGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFwcGVkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0QWN0dWFsU2l6ZShfdGhpcy5jb3JlLmluZGV4LCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIHpvb20gb24gcmVzaXplIGFuZCBvcmllbnRhdGlvbmNoYW5nZVxyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5jb250YWluZXJSZXNpemUgKyBcIi56b29tIFwiICsgbEdFdmVudHMucm90YXRlUmlnaHQgKyBcIi56b29tIFwiICsgbEdFdmVudHMucm90YXRlTGVmdCArIFwiLnpvb20gXCIgKyBsR0V2ZW50cy5mbGlwSG9yaXpvbnRhbCArIFwiLnpvb20gXCIgKyBsR0V2ZW50cy5mbGlwVmVydGljYWwgKyBcIi56b29tXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuY29yZS5sZ09wZW5lZCB8fCAhX3RoaXMuaXNJbWFnZVNsaWRlKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0UGFnZUNvcmRzKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRab29tRXNzZW50aWFscygpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuem9vbUltYWdlKF90aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB6b29tIG9uIHJlc2l6ZSBhbmQgb3JpZW50YXRpb25jaGFuZ2VcclxuICAgICAgICAgICAgdGhpcy4kTEcod2luZG93KS5vbihcInNjcm9sbC5sZy56b29tLmdsb2JhbFwiICsgdGhpcy5jb3JlLmxnSWQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuY29yZS5sZ09wZW5lZClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zY3JvbGxUb3AgPSBfdGhpcy4kTEcod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5nZXRFbGVtZW50QnlJZCgnbGctem9vbS1vdXQnKS5vbignY2xpY2subGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuY29yZS5vdXRlci5maW5kKCcubGctY3VycmVudCAubGctaW1hZ2UnKS5nZXQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNjYWxlIC09IF90aGlzLnNldHRpbmdzLnNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNjYWxlID0gX3RoaXMuZ2V0U2NhbGUoX3RoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmJlZ2luWm9vbShfdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuem9vbUltYWdlKF90aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5nZXRFbGVtZW50QnlJZCgnbGctem9vbS1pbicpLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnpvb21JbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLmdldEVsZW1lbnRCeUlkKCdsZy1hY3R1YWwtc2l6ZScpLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldEFjdHVhbFNpemUoX3RoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5iZWZvcmVPcGVuICsgXCIuem9vbVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLmZpbmQoJy5sZy1pdGVtJykucmVtb3ZlQ2xhc3MoJ2xnLXpvb21hYmxlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5hZnRlck9wZW4gKyBcIi56b29tXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNjcm9sbFRvcCA9IF90aGlzLiRMRyh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBpbml0aWFsIHZhbHVlIGNlbnRlclxyXG4gICAgICAgICAgICAgICAgX3RoaXMucGFnZVggPSBfdGhpcy5jb3JlLm91dGVyLndpZHRoKCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucGFnZVkgPSBfdGhpcy5jb3JlLm91dGVyLmhlaWdodCgpIC8gMiArIF90aGlzLnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIFJlc2V0IHpvb20gb24gc2xpZGUgY2hhbmdlXHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmFmdGVyU2xpZGUgKyBcIi56b29tXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZXZJbmRleCA9IGV2ZW50LmRldGFpbC5wcmV2SW5kZXg7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wb3NpdGlvbkNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlc2V0Wm9vbShwcmV2SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzSW1hZ2VTbGlkZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0Wm9vbUVzc2VudGlhbHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIERyYWcgb3B0aW9uIGFmdGVyIHpvb21cclxuICAgICAgICAgICAgdGhpcy56b29tRHJhZygpO1xyXG4gICAgICAgICAgICB0aGlzLnBpbmNoWm9vbSgpO1xyXG4gICAgICAgICAgICB0aGlzLnpvb21Td2lwZSgpO1xyXG4gICAgICAgICAgICAvLyBTdG9yZSB0aGUgem9vbWFibGUgdGltZW91dCB2YWx1ZSBqdXN0IHRvIGNsZWFyIGl0IHdoaWxlIGNsb3NpbmdcclxuICAgICAgICAgICAgdGhpcy56b29tYWJsZVRpbWVvdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbkNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnpvb21JbiA9IGZ1bmN0aW9uIChzY2FsZSkge1xyXG4gICAgICAgICAgICAvLyBBbGxvdyB6b29tIG9ubHkgb24gaW1hZ2VcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzSW1hZ2VTbGlkZSgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlICs9IHRoaXMuc2V0dGluZ3Muc2NhbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2FsZSA9IHRoaXMuZ2V0U2NhbGUodGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5ab29tKHRoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnpvb21JbWFnZSh0aGlzLnNjYWxlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFJlc2V0IHpvb20gZWZmZWN0XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUucmVzZXRab29tID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5yZW1vdmVDbGFzcygnbGctem9vbWVkIGxnLXpvb20tZHJhZy10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIHZhciAkYWN0dWFsU2l6ZSA9IHRoaXMuY29yZS5nZXRFbGVtZW50QnlJZCgnbGctYWN0dWFsLXNpemUnKTtcclxuICAgICAgICAgICAgdmFyICRpdGVtID0gdGhpcy5jb3JlLmdldFNsaWRlSXRlbShpbmRleCAhPT0gdW5kZWZpbmVkID8gaW5kZXggOiB0aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICAkYWN0dWFsU2l6ZVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKHRoaXMuc2V0dGluZ3MuYWN0dWFsU2l6ZUljb25zLnpvb21PdXQpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5hY3R1YWxTaXplSWNvbnMuem9vbUluKTtcclxuICAgICAgICAgICAgJGl0ZW0uZmluZCgnLmxnLWltZy13cmFwJykuZmlyc3QoKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAkaXRlbS5maW5kKCcubGctaW1hZ2UnKS5maXJzdCgpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmxlZnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnRvcCA9IDA7XHJcbiAgICAgICAgICAgIC8vIFJlc2V0IHBhZ3ggcGFneSB2YWx1ZXMgdG8gY2VudGVyXHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGFnZUNvcmRzKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRUb3VjaERpc3RhbmNlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydCgoZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gZS50YXJnZXRUb3VjaGVzWzFdLnBhZ2VYKSAqXHJcbiAgICAgICAgICAgICAgICAoZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gZS50YXJnZXRUb3VjaGVzWzFdLnBhZ2VYKSArXHJcbiAgICAgICAgICAgICAgICAoZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gZS50YXJnZXRUb3VjaGVzWzFdLnBhZ2VZKSAqXHJcbiAgICAgICAgICAgICAgICAgICAgKGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIGUudGFyZ2V0VG91Y2hlc1sxXS5wYWdlWSkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUucGluY2hab29tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnREaXN0ID0gMDtcclxuICAgICAgICAgICAgdmFyIHBpbmNoU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgaW5pdFNjYWxlID0gMTtcclxuICAgICAgICAgICAgdmFyICRpdGVtID0gdGhpcy5jb3JlLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuJGlubmVyLm9uKCd0b3VjaHN0YXJ0LmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICRpdGVtID0gX3RoaXMuY29yZS5nZXRTbGlkZUl0ZW0oX3RoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmlzSW1hZ2VTbGlkZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDIgJiZcclxuICAgICAgICAgICAgICAgICAgICAhX3RoaXMuY29yZS5vdXRlci5oYXNDbGFzcygnbGctZmlyc3Qtc2xpZGUtbG9hZGluZycpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKF90aGlzLiRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLWl0ZW0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbS5nZXQoKS5jb250YWlucyhlLnRhcmdldCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdFNjYWxlID0gX3RoaXMuc2NhbGUgfHwgMTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLnJlbW92ZUNsYXNzKCdsZy16b29tLWRyYWctdHJhbnNpdGlvbiBsZy16b29tLWRyYWdnaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS50b3VjaEFjdGlvbiA9ICdwaW5jaCc7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnREaXN0ID0gX3RoaXMuZ2V0VG91Y2hEaXN0YW5jZShlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS4kaW5uZXIub24oJ3RvdWNobW92ZS5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUudG91Y2hBY3Rpb24gPT09ICdwaW5jaCcgJiZcclxuICAgICAgICAgICAgICAgICAgICAoX3RoaXMuJExHKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctaXRlbScpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtLmdldCgpLmNvbnRhaW5zKGUudGFyZ2V0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZERpc3QgPSBfdGhpcy5nZXRUb3VjaERpc3RhbmNlKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHN0YXJ0RGlzdCAtIGVuZERpc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwaW5jaFN0YXJ0ZWQgJiYgTWF0aC5hYnMoZGlzdGFuY2UpID4gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaW5jaFN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGluY2hTdGFydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNjYWxlID0gTWF0aC5tYXgoMSwgaW5pdFNjYWxlICsgLWRpc3RhbmNlICogMC4wMDgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy56b29tSW1hZ2UoX3RoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS4kaW5uZXIub24oJ3RvdWNoZW5kLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jb3JlLnRvdWNoQWN0aW9uID09PSAncGluY2gnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKF90aGlzLiRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLWl0ZW0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbS5nZXQoKS5jb250YWlucyhlLnRhcmdldCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGluY2hTdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnREaXN0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuc2NhbGUgPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZXNldFpvb20oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNjYWxlID0gX3RoaXMuZ2V0U2NhbGUoX3RoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy56b29tSW1hZ2UoX3RoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLmFkZENsYXNzKCdsZy16b29tZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS50b3VjaEFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS50b3VjaGVuZFpvb20gPSBmdW5jdGlvbiAoc3RhcnRDb29yZHMsIGVuZENvb3JkcywgYWxsb3dYLCBhbGxvd1ksIHRvdWNoRHVyYXRpb24sIHJvdGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZVhuZXcgPSBlbmRDb29yZHMueCAtIHN0YXJ0Q29vcmRzLng7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZVluZXcgPSBlbmRDb29yZHMueSAtIHN0YXJ0Q29vcmRzLnk7XHJcbiAgICAgICAgICAgIHZhciBzcGVlZFggPSBNYXRoLmFicyhkaXN0YW5jZVhuZXcpIC8gdG91Y2hEdXJhdGlvbiArIDE7XHJcbiAgICAgICAgICAgIHZhciBzcGVlZFkgPSBNYXRoLmFicyhkaXN0YW5jZVluZXcpIC8gdG91Y2hEdXJhdGlvbiArIDE7XHJcbiAgICAgICAgICAgIGlmIChzcGVlZFggPiAyKSB7XHJcbiAgICAgICAgICAgICAgICBzcGVlZFggKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3BlZWRZID4gMikge1xyXG4gICAgICAgICAgICAgICAgc3BlZWRZICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGlzdGFuY2VYbmV3ID0gZGlzdGFuY2VYbmV3ICogc3BlZWRYO1xyXG4gICAgICAgICAgICBkaXN0YW5jZVluZXcgPSBkaXN0YW5jZVluZXcgKiBzcGVlZFk7XHJcbiAgICAgICAgICAgIHZhciBfTEdlbCA9IHRoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltZy13cmFwJylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSB7fTtcclxuICAgICAgICAgICAgZGlzdGFuY2UueCA9IHRoaXMubGVmdCArIGRpc3RhbmNlWG5ldyAqIHRoaXMubW9kaWZpZXJYO1xyXG4gICAgICAgICAgICBkaXN0YW5jZS55ID0gdGhpcy50b3AgKyBkaXN0YW5jZVluZXcgKiB0aGlzLm1vZGlmaWVyWTtcclxuICAgICAgICAgICAgdmFyIHBvc3NpYmxlU3dpcGVDb3JkcyA9IHRoaXMuZ2V0UG9zc2libGVTd2lwZURyYWdDb3Jkcyhyb3RhdGVWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZVhuZXcpID4gMTUgfHwgTWF0aC5hYnMoZGlzdGFuY2VZbmV3KSA+IDE1KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsb3dZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZVRvcChkaXN0YW5jZS55LCBwb3NzaWJsZVN3aXBlQ29yZHMubWluWSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UueSA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5ZO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVCb3R0b20oZGlzdGFuY2UueSwgcG9zc2libGVTd2lwZUNvcmRzLm1heFkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlLnkgPSBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsb3dYKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZUxlZnQoZGlzdGFuY2UueCwgcG9zc2libGVTd2lwZUNvcmRzLm1pblgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlLnggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWluWDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlUmlnaHQoZGlzdGFuY2UueCwgcG9zc2libGVTd2lwZUNvcmRzLm1heFgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlLnggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsb3dZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3AgPSBkaXN0YW5jZS55O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UueSA9IHRoaXMudG9wO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFsbG93WCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdCA9IGRpc3RhbmNlLng7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZS54ID0gdGhpcy5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRab29tU3dpcGVTdHlsZXMoX0xHZWwsIGRpc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0Wm9vbVN3aXBlQ29yZHMgPSBmdW5jdGlvbiAoc3RhcnRDb29yZHMsIGVuZENvb3JkcywgYWxsb3dYLCBhbGxvd1ksIHBvc3NpYmxlU3dpcGVDb3Jkcykge1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSB7fTtcclxuICAgICAgICAgICAgaWYgKGFsbG93WSkge1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UueSA9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3AgKyAoZW5kQ29vcmRzLnkgLSBzdGFydENvb3Jkcy55KSAqIHRoaXMubW9kaWZpZXJZO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZVRvcChkaXN0YW5jZS55LCBwb3NzaWJsZVN3aXBlQ29yZHMubWluWSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlmZk1pblkgPSBwb3NzaWJsZVN3aXBlQ29yZHMubWluWSAtIGRpc3RhbmNlLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UueSA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5ZIC0gZGlmZk1pblkgLyA2O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlQm90dG9tKGRpc3RhbmNlLnksIHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWZmTWF4WSA9IGRpc3RhbmNlLnkgLSBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WTtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZS55ID0gcG9zc2libGVTd2lwZUNvcmRzLm1heFkgKyBkaWZmTWF4WSAvIDY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZS55ID0gdGhpcy50b3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFsbG93WCkge1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UueCA9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0ICsgKGVuZENvb3Jkcy54IC0gc3RhcnRDb29yZHMueCkgKiB0aGlzLm1vZGlmaWVyWDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVMZWZ0KGRpc3RhbmNlLngsIHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5YKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWZmTWluWCA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5YIC0gZGlzdGFuY2UueDtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZS54ID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblggLSBkaWZmTWluWCAvIDY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVSaWdodChkaXN0YW5jZS54LCBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlmTWF4WCA9IGRpc3RhbmNlLnggLSBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WDtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZS54ID0gcG9zc2libGVTd2lwZUNvcmRzLm1heFggKyBkaWZNYXhYIC8gNjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRpc3RhbmNlLnggPSB0aGlzLmxlZnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuaXNCZXlvbmRQb3NzaWJsZUxlZnQgPSBmdW5jdGlvbiAoeCwgbWluWCkge1xyXG4gICAgICAgICAgICByZXR1cm4geCA+PSBtaW5YO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuaXNCZXlvbmRQb3NzaWJsZVJpZ2h0ID0gZnVuY3Rpb24gKHgsIG1heFgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHggPD0gbWF4WDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmlzQmV5b25kUG9zc2libGVUb3AgPSBmdW5jdGlvbiAoeSwgbWluWSkge1xyXG4gICAgICAgICAgICByZXR1cm4geSA+PSBtaW5ZO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuaXNCZXlvbmRQb3NzaWJsZUJvdHRvbSA9IGZ1bmN0aW9uICh5LCBtYXhZKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB5IDw9IG1heFk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5pc0ltYWdlU2xpZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50SXRlbSA9IHRoaXMuY29yZS5nYWxsZXJ5SXRlbXNbdGhpcy5jb3JlLmluZGV4XTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29yZS5nZXRTbGlkZVR5cGUoY3VycmVudEl0ZW0pID09PSAnaW1hZ2UnO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0UG9zc2libGVTd2lwZURyYWdDb3JkcyA9IGZ1bmN0aW9uIChyb3RhdGVWYWx1ZSwgc2NhbGUpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGFTY2FsZSA9IHNjYWxlIHx8IHRoaXMuc2NhbGUgfHwgMTtcclxuICAgICAgICAgICAgdmFyIGVsRGF0YVNjYWxlID0gTWF0aC5hYnMoZGF0YVNjYWxlKTtcclxuICAgICAgICAgICAgdmFyIF9hID0gdGhpcy5jb3JlLm1lZGlhQ29udGFpbmVyUG9zaXRpb24sIHRvcCA9IF9hLnRvcCwgYm90dG9tID0gX2EuYm90dG9tO1xyXG4gICAgICAgICAgICB2YXIgdG9wQm90dG9tU3BhY2luZyA9IE1hdGguYWJzKHRvcCAtIGJvdHRvbSkgLyAyO1xyXG4gICAgICAgICAgICB2YXIgbWluWSA9ICh0aGlzLmltYWdlWVNpemUgLSB0aGlzLmNvbnRhaW5lclJlY3QuaGVpZ2h0KSAvIDIgK1xyXG4gICAgICAgICAgICAgICAgdG9wQm90dG9tU3BhY2luZyAqIHRoaXMubW9kaWZpZXJYO1xyXG4gICAgICAgICAgICB2YXIgbWF4WSA9IHRoaXMuY29udGFpbmVyUmVjdC5oZWlnaHQgLSB0aGlzLmltYWdlWVNpemUgKiBlbERhdGFTY2FsZSArIG1pblk7XHJcbiAgICAgICAgICAgIHZhciBtaW5YID0gKHRoaXMuaW1hZ2VYU2l6ZSAtIHRoaXMuY29udGFpbmVyUmVjdC53aWR0aCkgLyAyO1xyXG4gICAgICAgICAgICB2YXIgbWF4WCA9IHRoaXMuY29udGFpbmVyUmVjdC53aWR0aCAtIHRoaXMuaW1hZ2VYU2l6ZSAqIGVsRGF0YVNjYWxlICsgbWluWDtcclxuICAgICAgICAgICAgdmFyIHBvc3NpYmxlU3dpcGVDb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgIG1pblk6IG1pblksXHJcbiAgICAgICAgICAgICAgICBtYXhZOiBtYXhZLFxyXG4gICAgICAgICAgICAgICAgbWluWDogbWluWCxcclxuICAgICAgICAgICAgICAgIG1heFg6IG1heFgsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhyb3RhdGVWYWx1ZSkgPT09IDkwKSB7XHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZVN3aXBlQ29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluWTogbWluWCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhZOiBtYXhYLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pblg6IG1pblksXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WDogbWF4WSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHBvc3NpYmxlU3dpcGVDb3JkcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnNldFpvb21Td2lwZVN0eWxlcyA9IGZ1bmN0aW9uIChMR2VsLCBkaXN0YW5jZSkge1xyXG4gICAgICAgICAgICBMR2VsLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKCcgKyBkaXN0YW5jZS54ICsgJ3B4LCAnICsgZGlzdGFuY2UueSArICdweCwgMCknKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnpvb21Td2lwZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHN0YXJ0Q29vcmRzID0ge307XHJcbiAgICAgICAgICAgIHZhciBlbmRDb29yZHMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGlzTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gQWxsb3cgeCBkaXJlY3Rpb24gZHJhZ1xyXG4gICAgICAgICAgICB2YXIgYWxsb3dYID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIEFsbG93IFkgZGlyZWN0aW9uIGRyYWdcclxuICAgICAgICAgICAgdmFyIGFsbG93WSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgcG9zc2libGVTd2lwZUNvcmRzO1xyXG4gICAgICAgICAgICB2YXIgX0xHZWw7XHJcbiAgICAgICAgICAgIHZhciAkaXRlbSA9IHRoaXMuY29yZS5nZXRTbGlkZUl0ZW0odGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLiRpbm5lci5vbigndG91Y2hzdGFydC5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBbGxvdyB6b29tIG9ubHkgb24gaW1hZ2VcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuaXNJbWFnZVNsaWRlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkaXRlbSA9IF90aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKF90aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKChfdGhpcy4kTEcoZS50YXJnZXQpLmhhc0NsYXNzKCdsZy1pdGVtJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbS5nZXQoKS5jb250YWlucyhlLnRhcmdldCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIuaGFzQ2xhc3MoJ2xnLXpvb21lZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS50b3VjaEFjdGlvbiA9ICd6b29tU3dpcGUnO1xyXG4gICAgICAgICAgICAgICAgICAgIF9MR2VsID0gX3RoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKF90aGlzLmNvcmUuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1nLXdyYXAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZHJhZ0FsbG93ZWRBeGlzZXMgPSBfdGhpcy5nZXREcmFnQWxsb3dlZEF4aXNlcyhNYXRoLmFicyhfdGhpcy5yb3RhdGVWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93WSA9IGRyYWdBbGxvd2VkQXhpc2VzLmFsbG93WTtcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1ggPSBkcmFnQWxsb3dlZEF4aXNlcy5hbGxvd1g7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbG93WCB8fCBhbGxvd1kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRDb29yZHMgPSBfdGhpcy5nZXRTd2lwZUNvcmRzKGUsIE1hdGguYWJzKF90aGlzLnJvdGF0ZVZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHBvc3NpYmxlU3dpcGVDb3JkcyA9IF90aGlzLmdldFBvc3NpYmxlU3dpcGVEcmFnQ29yZHMoX3RoaXMucm90YXRlVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc2V0IG9wYWNpdHkgYW5kIHRyYW5zaXRpb24gZHVyYXRpb25cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLmFkZENsYXNzKCdsZy16b29tLWRyYWdnaW5nIGxnLXpvb20tZHJhZy10cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuJGlubmVyLm9uKCd0b3VjaG1vdmUubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEgJiZcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLnRvdWNoQWN0aW9uID09PSAnem9vbVN3aXBlJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChfdGhpcy4kTEcoZS50YXJnZXQpLmhhc0NsYXNzKCdsZy1pdGVtJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW0uZ2V0KCkuY29udGFpbnMoZS50YXJnZXQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLnRvdWNoQWN0aW9uID0gJ3pvb21Td2lwZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kQ29vcmRzID0gX3RoaXMuZ2V0U3dpcGVDb3JkcyhlLCBNYXRoLmFicyhfdGhpcy5yb3RhdGVWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IF90aGlzLmdldFpvb21Td2lwZUNvcmRzKHN0YXJ0Q29vcmRzLCBlbmRDb29yZHMsIGFsbG93WCwgYWxsb3dZLCBwb3NzaWJsZVN3aXBlQ29yZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhlbmRDb29yZHMueCAtIHN0YXJ0Q29vcmRzLngpID4gMTUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoZW5kQ29vcmRzLnkgLSBzdGFydENvb3Jkcy55KSA+IDE1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRab29tU3dpcGVTdHlsZXMoX0xHZWwsIGRpc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuJGlubmVyLm9uKCd0b3VjaGVuZC5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuY29yZS50b3VjaEFjdGlvbiA9PT0gJ3pvb21Td2lwZScgJiZcclxuICAgICAgICAgICAgICAgICAgICAoX3RoaXMuJExHKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctaXRlbScpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtLmdldCgpLmNvbnRhaW5zKGUudGFyZ2V0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLnRvdWNoQWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXpvb20tZHJhZ2dpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTW92ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kVGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoRHVyYXRpb24gPSBlbmRUaW1lLnZhbHVlT2YoKSAtIHN0YXJ0VGltZS52YWx1ZU9mKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudG91Y2hlbmRab29tKHN0YXJ0Q29vcmRzLCBlbmRDb29yZHMsIGFsbG93WCwgYWxsb3dZLCB0b3VjaER1cmF0aW9uLCBfdGhpcy5yb3RhdGVWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuem9vbURyYWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzdGFydENvb3JkcyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgZW5kQ29vcmRzID0ge307XHJcbiAgICAgICAgICAgIHZhciBpc0RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBpc01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIEFsbG93IHggZGlyZWN0aW9uIGRyYWdcclxuICAgICAgICAgICAgdmFyIGFsbG93WCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBBbGxvdyBZIGRpcmVjdGlvbiBkcmFnXHJcbiAgICAgICAgICAgIHZhciBhbGxvd1kgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0VGltZTtcclxuICAgICAgICAgICAgdmFyIGVuZFRpbWU7XHJcbiAgICAgICAgICAgIHZhciBwb3NzaWJsZVN3aXBlQ29yZHM7XHJcbiAgICAgICAgICAgIHZhciBfTEdlbDtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLm9uKCdtb3VzZWRvd24ubGcuem9vbScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBbGxvdyB6b29tIG9ubHkgb24gaW1hZ2VcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuaXNJbWFnZVNsaWRlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgJGl0ZW0gPSBfdGhpcy5jb3JlLmdldFNsaWRlSXRlbShfdGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy4kTEcoZS50YXJnZXQpLmhhc0NsYXNzKCdsZy1pdGVtJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbS5nZXQoKS5jb250YWlucyhlLnRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9MR2VsID0gX3RoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKF90aGlzLmNvcmUuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1nLXdyYXAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZHJhZ0FsbG93ZWRBeGlzZXMgPSBfdGhpcy5nZXREcmFnQWxsb3dlZEF4aXNlcyhNYXRoLmFicyhfdGhpcy5yb3RhdGVWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93WSA9IGRyYWdBbGxvd2VkQXhpc2VzLmFsbG93WTtcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1ggPSBkcmFnQWxsb3dlZEF4aXNlcy5hbGxvd1g7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmNvcmUub3V0ZXIuaGFzQ2xhc3MoJ2xnLXpvb21lZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy4kTEcoZS50YXJnZXQpLmhhc0NsYXNzKCdsZy1vYmplY3QnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFsbG93WCB8fCBhbGxvd1kpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydENvb3JkcyA9IF90aGlzLmdldERyYWdDb3JkcyhlLCBNYXRoLmFicyhfdGhpcy5yb3RhdGVWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGVTd2lwZUNvcmRzID0gX3RoaXMuZ2V0UG9zc2libGVTd2lwZURyYWdDb3JkcyhfdGhpcy5yb3RhdGVWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0RyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICoqIEZpeCBmb3Igd2Via2l0IGN1cnNvciBpc3N1ZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MjY3MjNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIuZ2V0KCkuc2Nyb2xsTGVmdCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5nZXQoKS5zY3JvbGxMZWZ0IC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsZy1ncmFiJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xnLWdyYWJiaW5nIGxnLXpvb20tZHJhZy10cmFuc2l0aW9uIGxnLXpvb20tZHJhZ2dpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlc2V0IG9wYWNpdHkgYW5kIHRyYW5zaXRpb24gZHVyYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuJExHKHdpbmRvdykub24oXCJtb3VzZW1vdmUubGcuem9vbS5nbG9iYWxcIiArIHRoaXMuY29yZS5sZ0lkLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBlbmRDb29yZHMgPSBfdGhpcy5nZXREcmFnQ29yZHMoZSwgTWF0aC5hYnMoX3RoaXMucm90YXRlVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBfdGhpcy5nZXRab29tU3dpcGVDb3JkcyhzdGFydENvb3JkcywgZW5kQ29vcmRzLCBhbGxvd1gsIGFsbG93WSwgcG9zc2libGVTd2lwZUNvcmRzKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRab29tU3dpcGVTdHlsZXMoX0xHZWwsIGRpc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuJExHKHdpbmRvdykub24oXCJtb3VzZXVwLmxnLnpvb20uZ2xvYmFsXCIgKyB0aGlzLmNvcmUubGdJZCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0RyYWdnaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kVGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXpvb20tZHJhZ2dpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBGaXggZm9yIGNocm9tZSBtb3VzZSBtb3ZlIG9uIGNsaWNrXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTW92ZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHN0YXJ0Q29vcmRzLnggIT09IGVuZENvb3Jkcy54IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydENvb3Jkcy55ICE9PSBlbmRDb29yZHMueSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kQ29vcmRzID0gX3RoaXMuZ2V0RHJhZ0NvcmRzKGUsIE1hdGguYWJzKF90aGlzLnJvdGF0ZVZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaER1cmF0aW9uID0gZW5kVGltZS52YWx1ZU9mKCkgLSBzdGFydFRpbWUudmFsdWVPZigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy50b3VjaGVuZFpvb20oc3RhcnRDb29yZHMsIGVuZENvb3JkcywgYWxsb3dYLCBhbGxvd1ksIHRvdWNoRHVyYXRpb24sIF90aGlzLnJvdGF0ZVZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5yZW1vdmVDbGFzcygnbGctZ3JhYmJpbmcnKS5hZGRDbGFzcygnbGctZ3JhYicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmNsb3NlR2FsbGVyeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldFpvb20oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFVuYmluZCBhbGwgZXZlbnRzIGFkZGVkIGJ5IGxpZ2h0R2FsbGVyeSB6b29tIHBsdWdpblxyXG4gICAgICAgICAgICB0aGlzLiRMRyh3aW5kb3cpLm9mZihcIi5sZy56b29tLmdsb2JhbFwiICsgdGhpcy5jb3JlLmxnSWQpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vZmYoJy5sZy56b29tJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9mZignLnpvb20nKTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuem9vbWFibGVUaW1lb3V0KTtcclxuICAgICAgICAgICAgdGhpcy56b29tYWJsZVRpbWVvdXQgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBab29tO1xyXG4gICAgfSgpKTtcblxuICAgIHJldHVybiBab29tO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGctem9vbS51bWQuanMubWFwXG4iLCIvKiFcbiAqIGxpZ2h0Z2FsbGVyeSB8IDIuNC4wLWJldGEuMCB8IERlY2VtYmVyIDEydGggMjAyMVxuICogaHR0cDovL3d3dy5saWdodGdhbGxlcnlqcy5jb20vXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgU2FjaGluIE5lcmF2YXRoO1xuICogQGxpY2Vuc2UgR1BMdjNcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5sZ1ZpZGVvID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcbiAgICBQZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxuICAgIHB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcbiAgICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcbiAgICBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuICAgIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuICAgIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG4gICAgTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuICAgIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuICAgIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICAgIHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XG5cbiAgICB2YXIgdmlkZW9TZXR0aW5ncyA9IHtcclxuICAgICAgICBhdXRvcGxheUZpcnN0VmlkZW86IHRydWUsXHJcbiAgICAgICAgeW91VHViZVBsYXllclBhcmFtczogZmFsc2UsXHJcbiAgICAgICAgdmltZW9QbGF5ZXJQYXJhbXM6IGZhbHNlLFxyXG4gICAgICAgIHdpc3RpYVBsYXllclBhcmFtczogZmFsc2UsXHJcbiAgICAgICAgZ290b05leHRTbGlkZU9uVmlkZW9FbmQ6IHRydWUsXHJcbiAgICAgICAgYXV0b3BsYXlWaWRlb09uU2xpZGU6IGZhbHNlLFxyXG4gICAgICAgIHZpZGVvanM6IGZhbHNlLFxyXG4gICAgICAgIHZpZGVvanNPcHRpb25zOiB7fSxcclxuICAgIH07XG5cbiAgICAvKipcclxuICAgICAqIExpc3Qgb2YgbGlnaHRHYWxsZXJ5IGV2ZW50c1xyXG4gICAgICogQWxsIGV2ZW50cyBzaG91bGQgYmUgZG9jdW1lbnRlZCBoZXJlXHJcbiAgICAgKiBCZWxvdyBpbnRlcmZhY2VzIGFyZSB1c2VkIHRvIGJ1aWxkIHRoZSB3ZWJzaXRlIGRvY3VtZW50YXRpb25zXHJcbiAgICAgKiAqL1xyXG4gICAgdmFyIGxHRXZlbnRzID0ge1xyXG4gICAgICAgIGFmdGVyQXBwZW5kU2xpZGU6ICdsZ0FmdGVyQXBwZW5kU2xpZGUnLFxyXG4gICAgICAgIGluaXQ6ICdsZ0luaXQnLFxyXG4gICAgICAgIGhhc1ZpZGVvOiAnbGdIYXNWaWRlbycsXHJcbiAgICAgICAgY29udGFpbmVyUmVzaXplOiAnbGdDb250YWluZXJSZXNpemUnLFxyXG4gICAgICAgIHVwZGF0ZVNsaWRlczogJ2xnVXBkYXRlU2xpZGVzJyxcclxuICAgICAgICBhZnRlckFwcGVuZFN1Ykh0bWw6ICdsZ0FmdGVyQXBwZW5kU3ViSHRtbCcsXHJcbiAgICAgICAgYmVmb3JlT3BlbjogJ2xnQmVmb3JlT3BlbicsXHJcbiAgICAgICAgYWZ0ZXJPcGVuOiAnbGdBZnRlck9wZW4nLFxyXG4gICAgICAgIHNsaWRlSXRlbUxvYWQ6ICdsZ1NsaWRlSXRlbUxvYWQnLFxyXG4gICAgICAgIGJlZm9yZVNsaWRlOiAnbGdCZWZvcmVTbGlkZScsXHJcbiAgICAgICAgYWZ0ZXJTbGlkZTogJ2xnQWZ0ZXJTbGlkZScsXHJcbiAgICAgICAgcG9zdGVyQ2xpY2s6ICdsZ1Bvc3RlckNsaWNrJyxcclxuICAgICAgICBkcmFnU3RhcnQ6ICdsZ0RyYWdTdGFydCcsXHJcbiAgICAgICAgZHJhZ01vdmU6ICdsZ0RyYWdNb3ZlJyxcclxuICAgICAgICBkcmFnRW5kOiAnbGdEcmFnRW5kJyxcclxuICAgICAgICBiZWZvcmVOZXh0U2xpZGU6ICdsZ0JlZm9yZU5leHRTbGlkZScsXHJcbiAgICAgICAgYmVmb3JlUHJldlNsaWRlOiAnbGdCZWZvcmVQcmV2U2xpZGUnLFxyXG4gICAgICAgIGJlZm9yZUNsb3NlOiAnbGdCZWZvcmVDbG9zZScsXHJcbiAgICAgICAgYWZ0ZXJDbG9zZTogJ2xnQWZ0ZXJDbG9zZScsXHJcbiAgICAgICAgcm90YXRlTGVmdDogJ2xnUm90YXRlTGVmdCcsXHJcbiAgICAgICAgcm90YXRlUmlnaHQ6ICdsZ1JvdGF0ZVJpZ2h0JyxcclxuICAgICAgICBmbGlwSG9yaXpvbnRhbDogJ2xnRmxpcEhvcml6b250YWwnLFxyXG4gICAgICAgIGZsaXBWZXJ0aWNhbDogJ2xnRmxpcFZlcnRpY2FsJyxcclxuICAgICAgICBhdXRvcGxheTogJ2xnQXV0b3BsYXknLFxyXG4gICAgICAgIGF1dG9wbGF5U3RhcnQ6ICdsZ0F1dG9wbGF5U3RhcnQnLFxyXG4gICAgICAgIGF1dG9wbGF5U3RvcDogJ2xnQXV0b3BsYXlTdG9wJyxcclxuICAgIH07XG5cbiAgICB2YXIgcGFyYW0gPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iailcclxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrXSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmpvaW4oJyYnKTtcclxuICAgIH07XHJcbiAgICB2YXIgZ2V0VmltZW9VUkxQYXJhbXMgPSBmdW5jdGlvbiAoZGVmYXVsdFBhcmFtcywgdmlkZW9JbmZvKSB7XHJcbiAgICAgICAgaWYgKCF2aWRlb0luZm8gfHwgIXZpZGVvSW5mby52aW1lbylcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIHZhciB1cmxQYXJhbXMgPSB2aWRlb0luZm8udmltZW9bMl0gfHwgJyc7XHJcbiAgICAgICAgdXJsUGFyYW1zID1cclxuICAgICAgICAgICAgdXJsUGFyYW1zWzBdID09ICc/JyA/ICcmJyArIHVybFBhcmFtcy5zbGljZSgxKSA6IHVybFBhcmFtcyB8fCAnJztcclxuICAgICAgICB2YXIgZGVmYXVsdFBsYXllclBhcmFtcyA9IGRlZmF1bHRQYXJhbXNcclxuICAgICAgICAgICAgPyAnJicgKyBwYXJhbShkZWZhdWx0UGFyYW1zKVxyXG4gICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgIC8vIEZvciB2aW1lbyBsYXN0IHBhcm1zIGdldHMgcHJpb3JpdHkgaWYgZHVwbGljYXRlcyBmb3VuZFxyXG4gICAgICAgIHZhciB2aW1lb1BsYXllclBhcmFtcyA9IFwiP2F1dG9wbGF5PTAmbXV0ZWQ9MVwiICsgZGVmYXVsdFBsYXllclBhcmFtcyArIHVybFBhcmFtcztcclxuICAgICAgICByZXR1cm4gdmltZW9QbGF5ZXJQYXJhbXM7XHJcbiAgICB9O1xuXG4gICAgLyoqXHJcbiAgICAgKiBWaWRlbyBtb2R1bGUgZm9yIGxpZ2h0R2FsbGVyeVxyXG4gICAgICogU3VwcG9ydHMgSFRNTDUsIFlvdVR1YmUsIFZpbWVvLCB3aXN0aWEgdmlkZW9zXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIEByZWYgV2lzdGlhXHJcbiAgICAgKiBodHRwczovL3dpc3RpYS5jb20vc3VwcG9ydC9pbnRlZ3JhdGlvbnMvd29yZHByZXNzKEhvdyB0byBnZXQgdXJsKVxyXG4gICAgICogaHR0cHM6Ly93aXN0aWEuY29tL3N1cHBvcnQvZGV2ZWxvcGVycy9lbWJlZC1vcHRpb25zI3VzaW5nLWVtYmVkLW9wdGlvbnNcclxuICAgICAqIGh0dHBzOi8vd2lzdGlhLmNvbS9zdXBwb3J0L2RldmVsb3BlcnMvcGxheWVyLWFwaVxyXG4gICAgICogaHR0cHM6Ly93aXN0aWEuY29tL3N1cHBvcnQvZGV2ZWxvcGVycy9jb25zdHJ1Y3QtYW4tZW1iZWQtY29kZVxyXG4gICAgICogaHR0cDovL2pzZmlkZGxlLm5ldC94dm5tN3hMbS9cclxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudC92aWRlb1xyXG4gICAgICogaHR0cHM6Ly93aXN0aWEuY29tL3N1cHBvcnQvZW1iZWQtYW5kLXNoYXJlL3NoYXJpbmctdmlkZW9zXHJcbiAgICAgKiBodHRwczovL3ByaXZhdGUtc2hhcmluZy53aXN0aWEuY29tL21lZGlhcy9td2hydWxydWNqXHJcbiAgICAgKlxyXG4gICAgICogQHJlZiBZb3V0dWJlXHJcbiAgICAgKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL3BsYXllcl9wYXJhbWV0ZXJzI2VuYWJsZWpzYXBpXHJcbiAgICAgKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL2lmcmFtZV9hcGlfcmVmZXJlbmNlXHJcbiAgICAgKiBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2Jsb2cvYXV0b3BsYXkvI2lmcmFtZS1kZWxlZ2F0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHJlZiBWaW1lb1xyXG4gICAgICogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA0ODg5NDMvZWFzeS13YXktdG8tZ2V0LXZpbWVvLWlkLWZyb20tYS12aW1lby11cmxcclxuICAgICAqIGh0dHBzOi8vdmltZW8uemVuZGVzay5jb20vaGMvZW4tdXMvYXJ0aWNsZXMvMzYwMDAwMTIxNjY4LVN0YXJ0aW5nLXBsYXliYWNrLWF0LWEtc3BlY2lmaWMtdGltZWNvZGVcclxuICAgICAqIGh0dHBzOi8vdmltZW8uemVuZGVzay5jb20vaGMvZW4tdXMvYXJ0aWNsZXMvMzYwMDAxNDk0NDQ3LVVzaW5nLVBsYXllci1QYXJhbWV0ZXJzXHJcbiAgICAgKi9cclxuICAgIHZhciBWaWRlbyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBWaWRlbyhpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAvLyBnZXQgbGlnaHRHYWxsZXJ5IGNvcmUgcGx1Z2luIGluc3RhbmNlXHJcbiAgICAgICAgICAgIHRoaXMuY29yZSA9IGluc3RhbmNlO1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHZpZGVvU2V0dGluZ3MpLCB0aGlzLmNvcmUuc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBFdmVudCB0cmlnZ2VyZWQgd2hlbiB2aWRlbyB1cmwgZm91bmQgd2l0aG91dCBwb3N0ZXJcclxuICAgICAgICAgICAgICogQXBwZW5kIHZpZGVvIEhUTUxcclxuICAgICAgICAgICAgICogUGxheSBpZiBhdXRvcGxheUZpcnN0VmlkZW8gaXMgdHJ1ZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuaGFzVmlkZW8gKyBcIi52aWRlb1wiLCB0aGlzLm9uSGFzVmlkZW8uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLnBvc3RlckNsaWNrICsgXCIudmlkZW9cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRlbCA9IF90aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKF90aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubG9hZFZpZGVvT25Qb3N0ZXJDbGljaygkZWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuc2xpZGVJdGVtTG9hZCArIFwiLnZpZGVvXCIsIHRoaXMub25TbGlkZUl0ZW1Mb2FkLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAvLyBAZGVzYyBmaXJlZCBpbW1lZGlhdGVseSBiZWZvcmUgZWFjaCBzbGlkZSB0cmFuc2l0aW9uLlxyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5iZWZvcmVTbGlkZSArIFwiLnZpZGVvXCIsIHRoaXMub25CZWZvcmVTbGlkZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgLy8gQGRlc2MgZmlyZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgZWFjaCBzbGlkZSB0cmFuc2l0aW9uLlxyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5hZnRlclNsaWRlICsgXCIudmlkZW9cIiwgdGhpcy5vbkFmdGVyU2xpZGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBFdmVudCB0cmlnZ2VyZWQgd2hlbiBhIHNsaWRlIGlzIGNvbXBsZXRlbHkgbG9hZGVkXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIGxpZ2h0R2FsbGV5IGN1c3RvbSBldmVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5vblNsaWRlSXRlbUxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIF9hID0gZXZlbnQuZGV0YWlsLCBpc0ZpcnN0U2xpZGUgPSBfYS5pc0ZpcnN0U2xpZGUsIGluZGV4ID0gX2EuaW5kZXg7XHJcbiAgICAgICAgICAgIC8vIFNob3VsZCBjaGVjayB0aGUgYWN0aXZlIHNsaWRlIGFzIHdlbGwgYXMgdXNlciBtYXkgaGF2ZSBtb3ZlZCB0byBkaWZmZXJlbnQgc2xpZGUgYmVmb3JlIHRoZSBmaXJzdCBzbGlkZSBpcyBsb2FkZWRcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYXV0b3BsYXlGaXJzdFZpZGVvICYmXHJcbiAgICAgICAgICAgICAgICBpc0ZpcnN0U2xpZGUgJiZcclxuICAgICAgICAgICAgICAgIGluZGV4ID09PSB0aGlzLmNvcmUuaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIC8vIERlbGF5IGlzIGp1c3QgZm9yIHRoZSB0cmFuc2l0aW9uIGVmZmVjdCBvbiB2aWRlbyBsb2FkXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5sb2FkQW5kUGxheVZpZGVvKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU2hvdWxkIG5vdCBjYWxsIG9uIGZpcnN0IHNsaWRlLiBzaG91bGQgY2hlY2sgb25seSBpZiB0aGUgc2xpZGUgaXMgYWN0aXZlXHJcbiAgICAgICAgICAgIGlmICghaXNGaXJzdFNsaWRlICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLmF1dG9wbGF5VmlkZW9PblNsaWRlICYmXHJcbiAgICAgICAgICAgICAgICBpbmRleCA9PT0gdGhpcy5jb3JlLmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRBbmRQbGF5VmlkZW8oaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBFdmVudCB0cmlnZ2VyZWQgd2hlbiB2aWRlbyB1cmwgb3IgcG9zdGVyIGZvdW5kXHJcbiAgICAgICAgICogQXBwZW5kIHZpZGVvIEhUTUwgaXMgcG9zdGVyIGlzIG5vdCBnaXZlblxyXG4gICAgICAgICAqIFBsYXkgaWYgYXV0b3BsYXlGaXJzdFZpZGVvIGlzIHRydWVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gSmF2YXNjcmlwdCBFdmVudCBvYmplY3QuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLm9uSGFzVmlkZW8gPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIF9hID0gZXZlbnQuZGV0YWlsLCBpbmRleCA9IF9hLmluZGV4LCBzcmMgPSBfYS5zcmMsIGh0bWw1VmlkZW8gPSBfYS5odG1sNVZpZGVvLCBoYXNQb3N0ZXIgPSBfYS5oYXNQb3N0ZXI7XHJcbiAgICAgICAgICAgIGlmICghaGFzUG9zdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBbGwgZnVuY3Rpb25zIGFyZSBjYWxsZWQgc2VwYXJhdGVseSBpZiBwb3N0ZXIgZXhpc3QgaW4gbG9hZFZpZGVvT25Qb3N0ZXJDbGljayBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRWaWRlb3ModGhpcy5jb3JlLmdldFNsaWRlSXRlbShpbmRleCksIHtcclxuICAgICAgICAgICAgICAgICAgICBzcmM6IHNyYyxcclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzczogJ2xnLW9iamVjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWw1VmlkZW86IGh0bWw1VmlkZW8sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIEF1dG9tYXRpY2FsbHkgbmF2aWdhdGUgdG8gbmV4dCBzbGlkZSBvbmNlIHZpZGVvIHJlYWNoZXMgdGhlIGVuZC5cclxuICAgICAgICAgICAgICAgIHRoaXMuZ290b05leHRTbGlkZU9uVmlkZW9FbmQoc3JjLCBpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIGZpcmVkIGltbWVkaWF0ZWx5IGJlZm9yZSBlYWNoIHNsaWRlIHRyYW5zaXRpb24uXHJcbiAgICAgICAgICogUGF1c2UgdGhlIHByZXZpb3VzIHZpZGVvXHJcbiAgICAgICAgICogSGlkZSB0aGUgZG93bmxvYWQgYnV0dG9uIGlmIHRoZSBzbGlkZSBjb250YWlucyBZb3VUdWJlLCBWaW1lbywgb3IgV2lzdGlhIHZpZGVvcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gSmF2YXNjcmlwdCBFdmVudCBvYmplY3QuXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHByZXZJbmRleCAtIFByZXZpb3VzIGluZGV4IG9mIHRoZSBzbGlkZS5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBDdXJyZW50IGluZGV4IG9mIHRoZSBzbGlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5vbkJlZm9yZVNsaWRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvcmUubEdhbGxlcnlPbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZXZJbmRleCA9IGV2ZW50LmRldGFpbC5wcmV2SW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlVmlkZW8ocHJldkluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgZmlyZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgZWFjaCBzbGlkZSB0cmFuc2l0aW9uLlxyXG4gICAgICAgICAqIFBsYXkgdmlkZW8gaWYgYXV0b3BsYXlWaWRlb09uU2xpZGUgb3B0aW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEphdmFzY3JpcHQgRXZlbnQgb2JqZWN0LlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwcmV2SW5kZXggLSBQcmV2aW91cyBpbmRleCBvZiB0aGUgc2xpZGUuXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gQ3VycmVudCBpbmRleCBvZiB0aGUgc2xpZGVcclxuICAgICAgICAgKiBAdG9kbyBzaG91bGQgY2hlY2sgb24gb25TbGlkZUxvYWQgYXMgd2VsbCBpZiB2aWRlbyBpcyBub3QgbG9hZGVkIG9uIGFmdGVyIHNsaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLm9uQWZ0ZXJTbGlkZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgX2EgPSBldmVudC5kZXRhaWwsIGluZGV4ID0gX2EuaW5kZXgsIHByZXZJbmRleCA9IF9hLnByZXZJbmRleDtcclxuICAgICAgICAgICAgLy8gRG8gbm90IGNhbGwgb24gZmlyc3Qgc2xpZGVcclxuICAgICAgICAgICAgdmFyICRzbGlkZSA9IHRoaXMuY29yZS5nZXRTbGlkZUl0ZW0oaW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hdXRvcGxheVZpZGVvT25TbGlkZSAmJiBpbmRleCAhPT0gcHJldkluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmhhc0NsYXNzKCdsZy1jb21wbGV0ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmxvYWRBbmRQbGF5VmlkZW8oaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5sb2FkQW5kUGxheVZpZGVvID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciAkc2xpZGUgPSB0aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKGluZGV4KTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRHYWxsZXJ5SXRlbSA9IHRoaXMuY29yZS5nYWxsZXJ5SXRlbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudEdhbGxlcnlJdGVtLnBvc3Rlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkVmlkZW9PblBvc3RlckNsaWNrKCRzbGlkZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlWaWRlbyhpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBsYXkgSFRNTDUsIFlvdXR1YmUsIFZpbWVvIG9yIFdpc3RpYSB2aWRlb3MgaW4gYSBwYXJ0aWN1bGFyIHNsaWRlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEluZGV4IG9mIHRoZSBzbGlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5wbGF5VmlkZW8gPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sVmlkZW8oaW5kZXgsICdwbGF5Jyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYXVzZSBIVE1MNSwgWW91dHViZSwgVmltZW8gb3IgV2lzdGlhIHZpZGVvcyBpbiBhIHBhcnRpY3VsYXIgc2xpZGUuXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gSW5kZXggb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLnBhdXNlVmlkZW8gPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sVmlkZW8oaW5kZXgsICdwYXVzZScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLmdldFZpZGVvSHRtbCA9IGZ1bmN0aW9uIChzcmMsIGFkZENsYXNzLCBpbmRleCwgaHRtbDVWaWRlbykge1xyXG4gICAgICAgICAgICB2YXIgdmlkZW8gPSAnJztcclxuICAgICAgICAgICAgdmFyIHZpZGVvSW5mbyA9IHRoaXMuY29yZS5nYWxsZXJ5SXRlbXNbaW5kZXhdXHJcbiAgICAgICAgICAgICAgICAuX19zbGlkZVZpZGVvSW5mbyB8fCB7fTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRHYWxsZXJ5SXRlbSA9IHRoaXMuY29yZS5nYWxsZXJ5SXRlbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICB2YXIgdmlkZW9UaXRsZSA9IGN1cnJlbnRHYWxsZXJ5SXRlbS50aXRsZSB8fCBjdXJyZW50R2FsbGVyeUl0ZW0uYWx0O1xyXG4gICAgICAgICAgICB2aWRlb1RpdGxlID0gdmlkZW9UaXRsZSA/ICd0aXRsZT1cIicgKyB2aWRlb1RpdGxlICsgJ1wiJyA6ICcnO1xyXG4gICAgICAgICAgICB2YXIgY29tbW9uSWZyYW1lUHJvcHMgPSBcImFsbG93dHJhbnNwYXJlbmN5PVxcXCJ0cnVlXFxcIlxcbiAgICAgICAgICAgIGZyYW1lYm9yZGVyPVxcXCIwXFxcIlxcbiAgICAgICAgICAgIHNjcm9sbGluZz1cXFwibm9cXFwiXFxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuXFxuICAgICAgICAgICAgbW96YWxsb3dmdWxsc2NyZWVuXFxuICAgICAgICAgICAgd2Via2l0YWxsb3dmdWxsc2NyZWVuXFxuICAgICAgICAgICAgb2FsbG93ZnVsbHNjcmVlblxcbiAgICAgICAgICAgIG1zYWxsb3dmdWxsc2NyZWVuXCI7XHJcbiAgICAgICAgICAgIGlmICh2aWRlb0luZm8ueW91dHViZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpZGVvSWQgPSAnbGcteW91dHViZScgKyBpbmRleDtcclxuICAgICAgICAgICAgICAgIHZhciBzbGlkZVVybFBhcmFtcyA9IHZpZGVvSW5mby55b3V0dWJlWzJdXHJcbiAgICAgICAgICAgICAgICAgICAgPyB2aWRlb0luZm8ueW91dHViZVsyXSArICcmJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgICAgICAgICAvLyBGb3IgeW91dHViZSBmaXJzdCBwYXJtcyBnZXRzIHByaW9yaXR5IGlmIGR1cGxpY2F0ZXMgZm91bmRcclxuICAgICAgICAgICAgICAgIHZhciB5b3VUdWJlUGxheWVyUGFyYW1zID0gXCI/XCIgKyBzbGlkZVVybFBhcmFtcyArIFwid21vZGU9b3BhcXVlJmF1dG9wbGF5PTAmbXV0ZT0xJmVuYWJsZWpzYXBpPTFcIjtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXJQYXJhbXMgPSB5b3VUdWJlUGxheWVyUGFyYW1zICtcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5zZXR0aW5ncy55b3VUdWJlUGxheWVyUGFyYW1zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJyYnICsgcGFyYW0odGhpcy5zZXR0aW5ncy55b3VUdWJlUGxheWVyUGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICcnKTtcclxuICAgICAgICAgICAgICAgIHZpZGVvID0gXCI8aWZyYW1lIGFsbG93PVxcXCJhdXRvcGxheVxcXCIgaWQ9XCIgKyB2aWRlb0lkICsgXCIgY2xhc3M9XFxcImxnLXZpZGVvLW9iamVjdCBsZy15b3V0dWJlIFwiICsgYWRkQ2xhc3MgKyBcIlxcXCIgXCIgKyB2aWRlb1RpdGxlICsgXCIgc3JjPVxcXCIvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC9cIiArICh2aWRlb0luZm8ueW91dHViZVsxXSArIHBsYXllclBhcmFtcykgKyBcIlxcXCIgXCIgKyBjb21tb25JZnJhbWVQcm9wcyArIFwiPjwvaWZyYW1lPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvSW5mby52aW1lbykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpZGVvSWQgPSAnbGctdmltZW8nICsgaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyUGFyYW1zID0gZ2V0VmltZW9VUkxQYXJhbXModGhpcy5zZXR0aW5ncy52aW1lb1BsYXllclBhcmFtcywgdmlkZW9JbmZvKTtcclxuICAgICAgICAgICAgICAgIHZpZGVvID0gXCI8aWZyYW1lIGFsbG93PVxcXCJhdXRvcGxheVxcXCIgaWQ9XCIgKyB2aWRlb0lkICsgXCIgY2xhc3M9XFxcImxnLXZpZGVvLW9iamVjdCBsZy12aW1lbyBcIiArIGFkZENsYXNzICsgXCJcXFwiIFwiICsgdmlkZW9UaXRsZSArIFwiIHNyYz1cXFwiLy9wbGF5ZXIudmltZW8uY29tL3ZpZGVvL1wiICsgKHZpZGVvSW5mby52aW1lb1sxXSArIHBsYXllclBhcmFtcykgKyBcIlxcXCIgXCIgKyBjb21tb25JZnJhbWVQcm9wcyArIFwiPjwvaWZyYW1lPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvSW5mby53aXN0aWEpIHtcclxuICAgICAgICAgICAgICAgIHZhciB3aXN0aWFJZCA9ICdsZy13aXN0aWEnICsgaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyUGFyYW1zID0gcGFyYW0odGhpcy5zZXR0aW5ncy53aXN0aWFQbGF5ZXJQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVyUGFyYW1zID0gcGxheWVyUGFyYW1zID8gJz8nICsgcGxheWVyUGFyYW1zIDogJyc7XHJcbiAgICAgICAgICAgICAgICB2aWRlbyA9IFwiPGlmcmFtZSBhbGxvdz1cXFwiYXV0b3BsYXlcXFwiIGlkPVxcXCJcIiArIHdpc3RpYUlkICsgXCJcXFwiIHNyYz1cXFwiLy9mYXN0Lndpc3RpYS5uZXQvZW1iZWQvaWZyYW1lL1wiICsgKHZpZGVvSW5mby53aXN0aWFbNF0gKyBwbGF5ZXJQYXJhbXMpICsgXCJcXFwiIFwiICsgdmlkZW9UaXRsZSArIFwiIGNsYXNzPVxcXCJ3aXN0aWFfZW1iZWQgbGctdmlkZW8tb2JqZWN0IGxnLXdpc3RpYSBcIiArIGFkZENsYXNzICsgXCJcXFwiIG5hbWU9XFxcIndpc3RpYV9lbWJlZFxcXCIgXCIgKyBjb21tb25JZnJhbWVQcm9wcyArIFwiPjwvaWZyYW1lPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvSW5mby5odG1sNSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGh0bWw1VmlkZW9NYXJrdXAgPSAnJztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaHRtbDVWaWRlby5zb3VyY2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBodG1sNVZpZGVvTWFya3VwICs9IFwiPHNvdXJjZSBzcmM9XFxcIlwiICsgaHRtbDVWaWRlby5zb3VyY2VbaV0uc3JjICsgXCJcXFwiIHR5cGU9XFxcIlwiICsgaHRtbDVWaWRlby5zb3VyY2VbaV0udHlwZSArIFwiXFxcIj5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChodG1sNVZpZGVvLnRyYWNrcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYWNrQXR0cmlidXRlcyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhY2sgPSBodG1sNVZpZGVvLnRyYWNrc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModHJhY2sgfHwge30pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tBdHRyaWJ1dGVzICs9IGtleSArIFwiPVxcXCJcIiArIHRyYWNrW2tleV0gKyBcIlxcXCIgXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sNVZpZGVvTWFya3VwICs9IFwiPHRyYWNrIFwiICsgdHJhY2tBdHRyaWJ1dGVzICsgXCI+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGh0bWw1VmlkZW8udHJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9sb29wXzEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGh0bWw1VmlkZW9BdHRyc18xID0gJyc7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlkZW9BdHRyaWJ1dGVzXzEgPSBodG1sNVZpZGVvLmF0dHJpYnV0ZXMgfHwge307XHJcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh2aWRlb0F0dHJpYnV0ZXNfMSB8fCB7fSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbDVWaWRlb0F0dHJzXzEgKz0ga2V5ICsgXCI9XFxcIlwiICsgdmlkZW9BdHRyaWJ1dGVzXzFba2V5XSArIFwiXFxcIiBcIjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdmlkZW8gPSBcIjx2aWRlbyBjbGFzcz1cXFwibGctdmlkZW8tb2JqZWN0IGxnLWh0bWw1IFwiICsgKHRoaXMuc2V0dGluZ3MudmlkZW9qcyA/ICd2aWRlby1qcycgOiAnJykgKyBcIlxcXCIgXCIgKyBodG1sNVZpZGVvQXR0cnNfMSArIFwiPlxcbiAgICAgICAgICAgICAgICBcIiArIGh0bWw1VmlkZW9NYXJrdXAgKyBcIlxcbiAgICAgICAgICAgICAgICBZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBIVE1MNSB2aWRlby5cXG4gICAgICAgICAgICA8L3ZpZGVvPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2aWRlbztcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIC0gQXBwZW5kIHZpZGVvcyB0byB0aGUgc2xpZGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gc2xpZGUgZWxlbWVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWRlb1BhcmFtcyAtIFZpZGVvIHBhcmFtZXRlcnMsIENvbnRhaW5zIHNyYywgY2xhc3MsIGluZGV4LCBodG1sVmlkZW9cclxuICAgICAgICAgKi9cclxuICAgICAgICBWaWRlby5wcm90b3R5cGUuYXBwZW5kVmlkZW9zID0gZnVuY3Rpb24gKGVsLCB2aWRlb1BhcmFtcykge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb0h0bWwgPSB0aGlzLmdldFZpZGVvSHRtbCh2aWRlb1BhcmFtcy5zcmMsIHZpZGVvUGFyYW1zLmFkZENsYXNzLCB2aWRlb1BhcmFtcy5pbmRleCwgdmlkZW9QYXJhbXMuaHRtbDVWaWRlbyk7XHJcbiAgICAgICAgICAgIGVsLmZpbmQoJy5sZy12aWRlby1jb250JykuYXBwZW5kKHZpZGVvSHRtbCk7XHJcbiAgICAgICAgICAgIHZhciAkdmlkZW9FbGVtZW50ID0gZWwuZmluZCgnLmxnLXZpZGVvLW9iamVjdCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIGlmICh2aWRlb1BhcmFtcy5odG1sNVZpZGVvKSB7XHJcbiAgICAgICAgICAgICAgICAkdmlkZW9FbGVtZW50Lm9uKCdtb3VzZWRvd24ubGcudmlkZW8nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy52aWRlb2pzICYmICgoX2EgPSB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zW3ZpZGVvUGFyYW1zLmluZGV4XS5fX3NsaWRlVmlkZW9JbmZvKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaHRtbDUpKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2aWRlb2pzKCR2aWRlb0VsZW1lbnQuZ2V0KCksIHRoaXMuc2V0dGluZ3MudmlkZW9qc09wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdsaWdodEdhbGxlcnk6LSBNYWtlIHN1cmUgeW91IGhhdmUgaW5jbHVkZWQgdmlkZW9qcycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBWaWRlby5wcm90b3R5cGUuZ290b05leHRTbGlkZU9uVmlkZW9FbmQgPSBmdW5jdGlvbiAoc3JjLCBpbmRleCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHZpZGVvRWxlbWVudCA9IHRoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbShpbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctdmlkZW8tb2JqZWN0JylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgdmlkZW9JbmZvID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1tpbmRleF0uX19zbGlkZVZpZGVvSW5mbyB8fCB7fTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZ290b05leHRTbGlkZU9uVmlkZW9FbmQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2aWRlb0luZm8uaHRtbDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdmlkZW9FbGVtZW50Lm9uKCdlbmRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5nb1RvTmV4dFNsaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2aWRlb0luZm8udmltZW8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdmltZW8vcGxheWVyLmpzLyNlbmRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgVmltZW8uUGxheWVyKCR2aWRlb0VsZW1lbnQuZ2V0KCkpLm9uKCdlbmRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUuZ29Ub05leHRTbGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignbGlnaHRHYWxsZXJ5Oi0gTWFrZSBzdXJlIHlvdSBoYXZlIGluY2x1ZGVkIC8vZ2l0aHViLmNvbS92aW1lby9wbGF5ZXIuanMnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2aWRlb0luZm8ud2lzdGlhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll93cSA9IHdpbmRvdy5fd3EgfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0b2RvIEV2ZW50IGlzIGdldHRpZ24gdHJpZ2dlcmVkIG11bHRpcGxlIHRpbWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fd3EucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJHZpZGVvRWxlbWVudC5hdHRyKCdpZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25SZWFkeTogZnVuY3Rpb24gKHZpZGVvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW8uYmluZCgnZW5kJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLmdvVG9OZXh0U2xpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdsaWdodEdhbGxlcnk6LSBNYWtlIHN1cmUgeW91IGhhdmUgaW5jbHVkZWQgLy9mYXN0Lndpc3RpYS5jb20vYXNzZXRzL2V4dGVybmFsL0UtdjEuanMnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5jb250cm9sVmlkZW8gPSBmdW5jdGlvbiAoaW5kZXgsIGFjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgJHZpZGVvRWxlbWVudCA9IHRoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbShpbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctdmlkZW8tb2JqZWN0JylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgdmlkZW9JbmZvID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1tpbmRleF0uX19zbGlkZVZpZGVvSW5mbyB8fCB7fTtcclxuICAgICAgICAgICAgaWYgKCEkdmlkZW9FbGVtZW50LmdldCgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodmlkZW9JbmZvLnlvdXR1YmUpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHZpZGVvRWxlbWVudC5nZXQoKS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKFwie1xcXCJldmVudFxcXCI6XFxcImNvbW1hbmRcXFwiLFxcXCJmdW5jXFxcIjpcXFwiXCIgKyBhY3Rpb24gKyBcIlZpZGVvXFxcIixcXFwiYXJnc1xcXCI6XFxcIlxcXCJ9XCIsICcqJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJsaWdodEdhbGxlcnk6LSBcIiArIGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvSW5mby52aW1lbykge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVmltZW8uUGxheWVyKCR2aWRlb0VsZW1lbnQuZ2V0KCkpW2FjdGlvbl0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignbGlnaHRHYWxsZXJ5Oi0gTWFrZSBzdXJlIHlvdSBoYXZlIGluY2x1ZGVkIC8vZ2l0aHViLmNvbS92aW1lby9wbGF5ZXIuanMnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2aWRlb0luZm8uaHRtbDUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnZpZGVvanMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb2pzKCR2aWRlb0VsZW1lbnQuZ2V0KCkpW2FjdGlvbl0oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignbGlnaHRHYWxsZXJ5Oi0gTWFrZSBzdXJlIHlvdSBoYXZlIGluY2x1ZGVkIHZpZGVvanMnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkdmlkZW9FbGVtZW50LmdldCgpW2FjdGlvbl0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2aWRlb0luZm8ud2lzdGlhKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fd3EgPSB3aW5kb3cuX3dxIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0b2RvIEZpbmQgYSB3YXkgdG8gZGVzdHJveSB3aXN0aWEgcGxheWVyIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Ll93cS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICR2aWRlb0VsZW1lbnQuYXR0cignaWQnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25SZWFkeTogZnVuY3Rpb24gKHZpZGVvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb1thY3Rpb25dKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2xpZ2h0R2FsbGVyeTotIE1ha2Ugc3VyZSB5b3UgaGF2ZSBpbmNsdWRlZCAvL2Zhc3Qud2lzdGlhLmNvbS9hc3NldHMvZXh0ZXJuYWwvRS12MS5qcycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBWaWRlby5wcm90b3R5cGUubG9hZFZpZGVvT25Qb3N0ZXJDbGljayA9IGZ1bmN0aW9uICgkZWwsIGZvcmNlUGxheSkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBjaGVjayBzbGlkZSBoYXMgcG9zdGVyXHJcbiAgICAgICAgICAgIGlmICghJGVsLmhhc0NsYXNzKCdsZy12aWRlby1sb2FkZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgYWxyZWFkeSB2aWRlbyBlbGVtZW50IHByZXNlbnRcclxuICAgICAgICAgICAgICAgIGlmICghJGVsLmhhc0NsYXNzKCdsZy1oYXMtdmlkZW8nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRlbC5hZGRDbGFzcygnbGctaGFzLXZpZGVvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9odG1sID0gdm9pZCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfc3JjID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1t0aGlzLmNvcmUuaW5kZXhdLnNyYztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmlkZW8gPSB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zW3RoaXMuY29yZS5pbmRleF0udmlkZW87XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZGVvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9odG1sID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiB2aWRlbyA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKHZpZGVvKSA6IHZpZGVvO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmlkZW9Kc1BsYXllcl8xID0gdGhpcy5hcHBlbmRWaWRlb3MoJGVsLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogX3NyYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3M6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5jb3JlLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sNVZpZGVvOiBfaHRtbCxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvdG9OZXh0U2xpZGVPblZpZGVvRW5kKF9zcmMsIHRoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICR0ZW1wSW1nID0gJGVsLmZpbmQoJy5sZy1vYmplY3QnKS5maXJzdCgpLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0b2RvIG1ha2Ugc3VyZSBpdCBpcyB3b3JraW5nXHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLmZpbmQoJy5sZy12aWRlby1jb250JykuZmlyc3QoKS5hcHBlbmQoJHRlbXBJbWcpO1xyXG4gICAgICAgICAgICAgICAgICAgICRlbC5hZGRDbGFzcygnbGctdmlkZW8tbG9hZGluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZGVvSnNQbGF5ZXJfMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0pzUGxheWVyXzEucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9Kc1BsYXllcl8xLm9uKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vblZpZGVvTG9hZEFmdGVyUG9zdGVyQ2xpY2soJGVsLCBfdGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkZWwuZmluZCgnLmxnLXZpZGVvLW9iamVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignbG9hZC5sZyBlcnJvci5sZyBsb2FkZWRtZXRhZGF0YS5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vblZpZGVvTG9hZEFmdGVyUG9zdGVyQ2xpY2soJGVsLCBfdGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5VmlkZW8odGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChmb3JjZVBsYXkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVZpZGVvKHRoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5vblZpZGVvTG9hZEFmdGVyUG9zdGVyQ2xpY2sgPSBmdW5jdGlvbiAoJGVsLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2xnLXZpZGVvLWxvYWRlZCcpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlWaWRlbyhpbmRleCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBWaWRlby5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub2ZmKCcubGcudmlkZW8nKTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub2ZmKCcudmlkZW8nKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBWaWRlbztcclxuICAgIH0oKSk7XG5cbiAgICByZXR1cm4gVmlkZW87XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sZy12aWRlby51bWQuanMubWFwXG4iLCIvKiFcbiAqIGxpZ2h0Z2FsbGVyeSB8IDIuNC4wLWJldGEuMCB8IERlY2VtYmVyIDEydGggMjAyMVxuICogaHR0cDovL3d3dy5saWdodGdhbGxlcnlqcy5jb20vXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgU2FjaGluIE5lcmF2YXRoO1xuICogQGxpY2Vuc2UgR1BMdjNcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5sZ1JvdGF0ZSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIC8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG4gICAgUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbiAgICBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG4gICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG4gICAgUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbiAgICBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbiAgICBJTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuICAgIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbiAgICBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcbiAgICBQRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgICB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xuXG4gICAgLyoqXHJcbiAgICAgKiBMaXN0IG9mIGxpZ2h0R2FsbGVyeSBldmVudHNcclxuICAgICAqIEFsbCBldmVudHMgc2hvdWxkIGJlIGRvY3VtZW50ZWQgaGVyZVxyXG4gICAgICogQmVsb3cgaW50ZXJmYWNlcyBhcmUgdXNlZCB0byBidWlsZCB0aGUgd2Vic2l0ZSBkb2N1bWVudGF0aW9uc1xyXG4gICAgICogKi9cclxuICAgIHZhciBsR0V2ZW50cyA9IHtcclxuICAgICAgICBhZnRlckFwcGVuZFNsaWRlOiAnbGdBZnRlckFwcGVuZFNsaWRlJyxcclxuICAgICAgICBpbml0OiAnbGdJbml0JyxcclxuICAgICAgICBoYXNWaWRlbzogJ2xnSGFzVmlkZW8nLFxyXG4gICAgICAgIGNvbnRhaW5lclJlc2l6ZTogJ2xnQ29udGFpbmVyUmVzaXplJyxcclxuICAgICAgICB1cGRhdGVTbGlkZXM6ICdsZ1VwZGF0ZVNsaWRlcycsXHJcbiAgICAgICAgYWZ0ZXJBcHBlbmRTdWJIdG1sOiAnbGdBZnRlckFwcGVuZFN1Ykh0bWwnLFxyXG4gICAgICAgIGJlZm9yZU9wZW46ICdsZ0JlZm9yZU9wZW4nLFxyXG4gICAgICAgIGFmdGVyT3BlbjogJ2xnQWZ0ZXJPcGVuJyxcclxuICAgICAgICBzbGlkZUl0ZW1Mb2FkOiAnbGdTbGlkZUl0ZW1Mb2FkJyxcclxuICAgICAgICBiZWZvcmVTbGlkZTogJ2xnQmVmb3JlU2xpZGUnLFxyXG4gICAgICAgIGFmdGVyU2xpZGU6ICdsZ0FmdGVyU2xpZGUnLFxyXG4gICAgICAgIHBvc3RlckNsaWNrOiAnbGdQb3N0ZXJDbGljaycsXHJcbiAgICAgICAgZHJhZ1N0YXJ0OiAnbGdEcmFnU3RhcnQnLFxyXG4gICAgICAgIGRyYWdNb3ZlOiAnbGdEcmFnTW92ZScsXHJcbiAgICAgICAgZHJhZ0VuZDogJ2xnRHJhZ0VuZCcsXHJcbiAgICAgICAgYmVmb3JlTmV4dFNsaWRlOiAnbGdCZWZvcmVOZXh0U2xpZGUnLFxyXG4gICAgICAgIGJlZm9yZVByZXZTbGlkZTogJ2xnQmVmb3JlUHJldlNsaWRlJyxcclxuICAgICAgICBiZWZvcmVDbG9zZTogJ2xnQmVmb3JlQ2xvc2UnLFxyXG4gICAgICAgIGFmdGVyQ2xvc2U6ICdsZ0FmdGVyQ2xvc2UnLFxyXG4gICAgICAgIHJvdGF0ZUxlZnQ6ICdsZ1JvdGF0ZUxlZnQnLFxyXG4gICAgICAgIHJvdGF0ZVJpZ2h0OiAnbGdSb3RhdGVSaWdodCcsXHJcbiAgICAgICAgZmxpcEhvcml6b250YWw6ICdsZ0ZsaXBIb3Jpem9udGFsJyxcclxuICAgICAgICBmbGlwVmVydGljYWw6ICdsZ0ZsaXBWZXJ0aWNhbCcsXHJcbiAgICAgICAgYXV0b3BsYXk6ICdsZ0F1dG9wbGF5JyxcclxuICAgICAgICBhdXRvcGxheVN0YXJ0OiAnbGdBdXRvcGxheVN0YXJ0JyxcclxuICAgICAgICBhdXRvcGxheVN0b3A6ICdsZ0F1dG9wbGF5U3RvcCcsXHJcbiAgICB9O1xuXG4gICAgdmFyIHJvdGF0ZVNldHRpbmdzID0ge1xyXG4gICAgICAgIHJvdGF0ZTogdHJ1ZSxcclxuICAgICAgICByb3RhdGVTcGVlZDogNDAwLFxyXG4gICAgICAgIHJvdGF0ZUxlZnQ6IHRydWUsXHJcbiAgICAgICAgcm90YXRlUmlnaHQ6IHRydWUsXHJcbiAgICAgICAgZmxpcEhvcml6b250YWw6IHRydWUsXHJcbiAgICAgICAgZmxpcFZlcnRpY2FsOiB0cnVlLFxyXG4gICAgICAgIHJvdGF0ZVBsdWdpblN0cmluZ3M6IHtcclxuICAgICAgICAgICAgZmxpcFZlcnRpY2FsOiAnRmxpcCB2ZXJ0aWNhbCcsXHJcbiAgICAgICAgICAgIGZsaXBIb3Jpem9udGFsOiAnRmxpcCBob3Jpem9udGFsJyxcclxuICAgICAgICAgICAgcm90YXRlTGVmdDogJ1JvdGF0ZSBsZWZ0JyxcclxuICAgICAgICAgICAgcm90YXRlUmlnaHQ6ICdSb3RhdGUgcmlnaHQnLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xuXG4gICAgdmFyIFJvdGF0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBSb3RhdGUoaW5zdGFuY2UsICRMRykge1xyXG4gICAgICAgICAgICAvLyBnZXQgbGlnaHRHYWxsZXJ5IGNvcmUgcGx1Z2luIGluc3RhbmNlXHJcbiAgICAgICAgICAgIHRoaXMuY29yZSA9IGluc3RhbmNlO1xyXG4gICAgICAgICAgICB0aGlzLiRMRyA9ICRMRztcclxuICAgICAgICAgICAgLy8gZXh0ZW5kIG1vZHVsZSBkZWZhdWx0IHNldHRpbmdzIHdpdGggbGlnaHRHYWxsZXJ5IGNvcmUgc2V0dGluZ3NcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCByb3RhdGVTZXR0aW5ncyksIHRoaXMuY29yZS5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLmJ1aWxkVGVtcGxhdGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcm90YXRlSWNvbnMgPSAnJztcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZmxpcFZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgICAgICByb3RhdGVJY29ucyArPSBcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBpZD1cXFwibGctZmxpcC12ZXJcXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy5yb3RhdGVQbHVnaW5TdHJpbmdzWydmbGlwVmVydGljYWwnXSArIFwiXFxcIiBjbGFzcz1cXFwibGctZmxpcC12ZXIgbGctaWNvblxcXCI+PC9idXR0b24+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZmxpcEhvcml6b250YWwpIHtcclxuICAgICAgICAgICAgICAgIHJvdGF0ZUljb25zICs9IFwiPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGlkPVxcXCJsZy1mbGlwLWhvclxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnJvdGF0ZVBsdWdpblN0cmluZ3NbJ2ZsaXBIb3Jpem9udGFsJ10gKyBcIlxcXCIgY2xhc3M9XFxcImxnLWZsaXAtaG9yIGxnLWljb25cXFwiPjwvYnV0dG9uPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnJvdGF0ZUxlZnQpIHtcclxuICAgICAgICAgICAgICAgIHJvdGF0ZUljb25zICs9IFwiPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGlkPVxcXCJsZy1yb3RhdGUtbGVmdFxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnJvdGF0ZVBsdWdpblN0cmluZ3NbJ3JvdGF0ZUxlZnQnXSArIFwiXFxcIiBjbGFzcz1cXFwibGctcm90YXRlLWxlZnQgbGctaWNvblxcXCI+PC9idXR0b24+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mucm90YXRlUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHJvdGF0ZUljb25zICs9IFwiPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGlkPVxcXCJsZy1yb3RhdGUtcmlnaHRcXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy5yb3RhdGVQbHVnaW5TdHJpbmdzWydyb3RhdGVSaWdodCddICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1yb3RhdGUtcmlnaHQgbGctaWNvblxcXCI+PC9idXR0b24+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb3JlLiR0b29sYmFyLmFwcGVuZChyb3RhdGVJY29ucyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5yb3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkVGVtcGxhdGVzKCk7XHJcbiAgICAgICAgICAgIC8vIFNhdmUgcm90YXRlIGNvbmZpZyBmb3IgZWFjaCBpdGVtIHRvIHBlcnNpc3QgaXRzIHJvdGF0ZSwgZmxpcCB2YWx1ZXNcclxuICAgICAgICAgICAgLy8gZXZlbiBhZnRlciBuYXZpZ2F0aW5nIHRvIGRpZmVyZW50IHNsaWRlc1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlc0xpc3QgPSB7fTtcclxuICAgICAgICAgICAgLy8gZXZlbnQgdHJpZ2dlcmVkIGFmdGVyIGFwcGVuZGluZyBzbGlkZSBjb250ZW50XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmFmdGVyQXBwZW5kU2xpZGUgKyBcIi5yb3RhdGVcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBldmVudC5kZXRhaWwuaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW1hZ2VXcmFwID0gX3RoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0oaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWctd3JhcCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgICAgICBpbWFnZVdyYXAud3JhcCgnbGctaW1nLXJvdGF0ZScpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0oX3RoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltZy1yb3RhdGUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCBfdGhpcy5zZXR0aW5ncy5yb3RhdGVTcGVlZCArICdtcycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnI2xnLXJvdGF0ZS1sZWZ0JylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrLmxnJywgdGhpcy5yb3RhdGVMZWZ0LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgIC5maW5kKCcjbGctcm90YXRlLXJpZ2h0JylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrLmxnJywgdGhpcy5yb3RhdGVSaWdodC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnI2xnLWZsaXAtaG9yJylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrLmxnJywgdGhpcy5mbGlwSG9yaXpvbnRhbC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnI2xnLWZsaXAtdmVyJylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrLmxnJywgdGhpcy5mbGlwVmVydGljYWwuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIC8vIFJlc2V0IHJvdGF0ZSBvbiBzbGlkZSBjaGFuZ2VcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuYmVmb3JlU2xpZGUgKyBcIi5yb3RhdGVcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLnJvdGF0ZVZhbHVlc0xpc3RbZXZlbnQuZGV0YWlsLmluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnJvdGF0ZVZhbHVlc0xpc3RbZXZlbnQuZGV0YWlsLmluZGV4XSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGlwSG9yaXpvbnRhbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxpcFZlcnRpY2FsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUm90YXRlLnByb3RvdHlwZS5hcHBseVN0eWxlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICRpbWFnZSA9IHRoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltZy1yb3RhdGUnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgICRpbWFnZS5jc3MoJ3RyYW5zZm9ybScsICdyb3RhdGUoJyArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XS5yb3RhdGUgK1xyXG4gICAgICAgICAgICAgICAgJ2RlZyknICtcclxuICAgICAgICAgICAgICAgICcgc2NhbGUzZCgnICtcclxuICAgICAgICAgICAgICAgIHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdLmZsaXBIb3Jpem9udGFsICtcclxuICAgICAgICAgICAgICAgICcsICcgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W3RoaXMuY29yZS5pbmRleF0uZmxpcFZlcnRpY2FsICtcclxuICAgICAgICAgICAgICAgICcsIDEpJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLnJvdGF0ZUxlZnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdLnJvdGF0ZSAtPSA5MDtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVN0eWxlcygpO1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudHMobEdFdmVudHMucm90YXRlTGVmdCwge1xyXG4gICAgICAgICAgICAgICAgcm90YXRlOiB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XS5yb3RhdGUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUm90YXRlLnByb3RvdHlwZS5yb3RhdGVSaWdodCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W3RoaXMuY29yZS5pbmRleF0ucm90YXRlICs9IDkwO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50cyhsR0V2ZW50cy5yb3RhdGVSaWdodCwge1xyXG4gICAgICAgICAgICAgICAgcm90YXRlOiB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XS5yb3RhdGUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUm90YXRlLnByb3RvdHlwZS5nZXRDdXJyZW50Um90YXRpb24gPSBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgaWYgKCFlbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHN0ID0gdGhpcy4kTEcoZWwpLnN0eWxlKCk7XHJcbiAgICAgICAgICAgIHZhciB0bSA9IHN0LmdldFByb3BlcnR5VmFsdWUoJy13ZWJraXQtdHJhbnNmb3JtJykgfHxcclxuICAgICAgICAgICAgICAgIHN0LmdldFByb3BlcnR5VmFsdWUoJy1tb3otdHJhbnNmb3JtJykgfHxcclxuICAgICAgICAgICAgICAgIHN0LmdldFByb3BlcnR5VmFsdWUoJy1tcy10cmFuc2Zvcm0nKSB8fFxyXG4gICAgICAgICAgICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgnLW8tdHJhbnNmb3JtJykgfHxcclxuICAgICAgICAgICAgICAgIHN0LmdldFByb3BlcnR5VmFsdWUoJ3RyYW5zZm9ybScpIHx8XHJcbiAgICAgICAgICAgICAgICAnbm9uZSc7XHJcbiAgICAgICAgICAgIGlmICh0bSAhPT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gdG0uc3BsaXQoJygnKVsxXS5zcGxpdCgnKScpWzBdLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuZ2xlID0gTWF0aC5yb3VuZChNYXRoLmF0YW4yKHZhbHVlc1sxXSwgdmFsdWVzWzBdKSAqICgxODAgLyBNYXRoLlBJKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuZ2xlIDwgMCA/IGFuZ2xlICsgMzYwIDogYW5nbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLmZsaXBIb3Jpem9udGFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcm90YXRlRWwgPSB0aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0odGhpcy5jb3JlLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWctcm90YXRlJylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50Um90YXRpb24gPSB0aGlzLmdldEN1cnJlbnRSb3RhdGlvbihyb3RhdGVFbCk7XHJcbiAgICAgICAgICAgIHZhciByb3RhdGVBeGlzID0gJ2ZsaXBIb3Jpem9udGFsJztcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRSb3RhdGlvbiA9PT0gOTAgfHwgY3VycmVudFJvdGF0aW9uID09PSAyNzApIHtcclxuICAgICAgICAgICAgICAgIHJvdGF0ZUF4aXMgPSAnZmxpcFZlcnRpY2FsJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XVtyb3RhdGVBeGlzXSAqPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVN0eWxlcygpO1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudHMobEdFdmVudHMuZmxpcEhvcml6b250YWwsIHtcclxuICAgICAgICAgICAgICAgIGZsaXBIb3Jpem9udGFsOiB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XVtyb3RhdGVBeGlzXSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLmZsaXBWZXJ0aWNhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJvdGF0ZUVsID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1nLXJvdGF0ZScpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFJvdGF0aW9uID0gdGhpcy5nZXRDdXJyZW50Um90YXRpb24ocm90YXRlRWwpO1xyXG4gICAgICAgICAgICB2YXIgcm90YXRlQXhpcyA9ICdmbGlwVmVydGljYWwnO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFJvdGF0aW9uID09PSA5MCB8fCBjdXJyZW50Um90YXRpb24gPT09IDI3MCkge1xyXG4gICAgICAgICAgICAgICAgcm90YXRlQXhpcyA9ICdmbGlwSG9yaXpvbnRhbCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W3RoaXMuY29yZS5pbmRleF1bcm90YXRlQXhpc10gKj0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlTdHlsZXMoKTtcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnRzKGxHRXZlbnRzLmZsaXBWZXJ0aWNhbCwge1xyXG4gICAgICAgICAgICAgICAgZmxpcFZlcnRpY2FsOiB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XVtyb3RhdGVBeGlzXSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLnRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbiAoZXZlbnQsIGRldGFpbCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNvcmUuTEdlbC50cmlnZ2VyKGV2ZW50LCBkZXRhaWwpO1xyXG4gICAgICAgICAgICB9LCB0aGlzLnNldHRpbmdzLnJvdGF0ZVNwZWVkICsgMTApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUm90YXRlLnByb3RvdHlwZS5pc0ltYWdlT3JpZW50YXRpb25DaGFuZ2VkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcm90YXRlVmFsdWUgPSB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XTtcclxuICAgICAgICAgICAgdmFyIGlzUm90YXRlZCA9IE1hdGguYWJzKHJvdGF0ZVZhbHVlLnJvdGF0ZSkgJSAzNjAgIT09IDA7XHJcbiAgICAgICAgICAgIHZhciBpZkZsaXBwZWRIb3IgPSByb3RhdGVWYWx1ZS5mbGlwSG9yaXpvbnRhbCA8IDA7XHJcbiAgICAgICAgICAgIHZhciBpZkZsaXBwZWRWZXIgPSByb3RhdGVWYWx1ZS5mbGlwVmVydGljYWwgPCAwO1xyXG4gICAgICAgICAgICByZXR1cm4gaXNSb3RhdGVkIHx8IGlmRmxpcHBlZEhvciB8fCBpZkZsaXBwZWRWZXI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLmNsb3NlR2FsbGVyeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbWFnZU9yaWVudGF0aW9uQ2hhbmdlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleCkuY3NzKCdvcGFjaXR5JywgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZXNMaXN0ID0ge307XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFVuYmluZCBhbGwgZXZlbnRzIGFkZGVkIGJ5IGxpZ2h0R2FsbGVyeSByb3RhdGUgcGx1Z2luXHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9mZignLmxnLnJvdGF0ZScpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vZmYoJy5yb3RhdGUnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBSb3RhdGU7XHJcbiAgICB9KCkpO1xuXG4gICAgcmV0dXJuIFJvdGF0ZTtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxnLXJvdGF0ZS51bWQuanMubWFwXG4iLCJmdW5jdGlvbiByYWl5c19nZXRfZm9ybV9kYXRhKGZvcm1fZWxlKSB7XG4gICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCBmb3JtX2VsZSApO1xuICAgICAgICAgIFxuICAgIHZhciBmZCA9IEFycmF5LmZyb20oZm9ybURhdGEuZW50cmllcygpKS5yZWR1Y2UoKG1lbW8sIHBhaXIpID0+ICh7XG4gICAgICAgIC4uLm1lbW8sXG4gICAgICAgIFtwYWlyWzBdXTogcGFpclsxXSxcbiAgICB9KSwge30pO1xuXG4gICAgcmV0dXJuIGZkO1xufVxuXG5mdW5jdGlvbiByYWl5c19wdXNoX2hpc3RvcnkoIGRhdGEgPSB7fSkge1xuICAgIHZhciBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgdmFyIHN0cnBhdGg9Jyc7XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgdmFyIGl0ID0gZGF0YVsgcHJvcGVydHkgXTtcblxuICAgICAgICBpZiAoaXQgIT0gJycgJiYgdHlwZW9mIGl0ICE9ICd1bmRlZmluZWQnICYmIHByb3BlcnR5ICE9ICdPbkZpcnN0TG9hZCcgJiYgdHlwZW9mIGl0ICE9ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KHByb3BlcnR5LCBpdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaGlzdG9yeS5wdXNoU3RhdGUoZGF0YSwgJycsICcvYWxsLXlhY2h0LXNlYXJjaD8nK3NlYXJjaFBhcmFtcy50b1N0cmluZygpKTtcbn0iLCJ2YXIgcmFpX3lzcF9hcGk9e307XG5cbiAgICByYWlfeXNwX2FwaS5jYWxsX2FwaT1mdW5jdGlvbihtZXRob2QsIHBhdGgsIHBhc3NpbmdfZGF0YSkge1xuICAgICAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiB0aGlzLnN0YXR1cyA9PSAyMDApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2VEYXRhID0gSlNPTi5wYXJzZSggdGhpcy5yZXNwb25zZVRleHQgKTtcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlRGF0YSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0dFVCc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhc3NpbmdfZGF0YS5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBwYXNzaW5nX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KHByb3BlcnR5LCBwYXNzaW5nX2RhdGFbIHByb3BlcnR5IF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgX3F1ZXN0aW9uTWFyaz1zZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIHJhaV95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wicmFpeXMvXCIrIHBhdGggKyAoKF9xdWVzdGlvbk1hcmsgIT0gJycpPyc/JytzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTonJyksIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLnNlbmQoKTtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1BPU1QnOlxuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLm9wZW4oXCJQT1NUXCIsIHJhaV95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wicmFpeXMvXCIrIHBhdGgsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeShwYXNzaW5nX2RhdGEpKTtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcblxuICAgIH07IiwidmFyIHlzcF90ZW1wbGF0ZXM9e307XG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQ9e307XG5cdFxuXHR5c3BfdGVtcGxhdGVzLnlhY2h0LmdyaWQ9ZnVuY3Rpb24odmVzc2VsKSB7XG5cdFx0bGV0IG1ldGVycz1wYXJzZUludCh2ZXNzZWwuTGVuZ3RoT3ZlcmFsbCkgKiAwLjMwNDg7XG5cblx0XHRyZXR1cm4gYFxuXHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXJlc3VsdC1ncmlkLWl0ZW1cIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2UtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGltZyBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2VcIiBzcmM9XCIke3Zlc3NlbC5JbWFnZXNbMF0gPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6ICcnfVwiIGFsdD1cInlhY2h0LWltYWdlXCIgbG9hZGluZz1cImxhenlcIiAvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWdlbmVyYWwtaW5mby1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtdGl0bGUtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8aDYgY2xhc3M9XCJ5YWNodC10aXRsZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnJ30gJHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJyd9ICR7dmVzc2VsLk1vZGVsID8gdmVzc2VsLk1vZGVsIDogJyd9ICR7dmVzc2VsLkJvYXROYW1lID8gdmVzc2VsLkJvYXROYW1lIDogJyd9PC9oNj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5mby1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmZvXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPlllYXI8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkNhYmluczwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5DYWJpbnNDb3VudE51bWVyaWMgPyB2ZXNzZWwuQ2FiaW5zQ291bnROdW1lcmljIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+QnVpbGRlcjwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5MZW5ndGg8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTGVuZ3RoT3ZlcmFsbCA/IHZlc3NlbC5MZW5ndGhPdmVyYWxsICsgXCIgLyBcIiArIG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcHJpY2UtZGV0YWlscy1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1wcmljZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1wcmljZVwiPiR7dmVzc2VsLlByaWNlID8gJyQnICsgdmVzc2VsLlByaWNlLnNsaWNlKDAsIC0zKSA6ICdDb250YWN0IFVzIEZvciBQcmljZSd9PC9wPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzcz1cInlhY2h0LWRldGFpbHNcIiBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdFx0RGV0YWlsc1xuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cdH07XG5cblx0eXNwX3RlbXBsYXRlcy55YWNodC5saXN0PWZ1bmN0aW9uKHZlc3NlbCkge1xuXHRcdGxldCBtZXRlcnM9cGFyc2VJbnQodmVzc2VsLkxlbmd0aE92ZXJhbGwpICogMC4zMDQ4O1xuXG5cdFx0cmV0dXJuIGBcblx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1yZXN1bHQtZ3JpZC1pdGVtIGxpc3Qtdmlld1wiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZVwiIHNyYz1cIiR7IHZlc3NlbC5JbWFnZXNbMF0gPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6ICcnIH1cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1nZW5lcmFsLWluZm8tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXRpdGxlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGg2IGNsYXNzPVwieWFjaHQtdGl0bGVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJyd9ICR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICcnfSAke3Zlc3NlbC5Nb2RlbCA/IHZlc3NlbC5Nb2RlbCA6ICcnfSAke3Zlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICcnfTwvaDY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZm8tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5ZZWFyPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5DYWJpbnM8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuQ2FiaW5zQ291bnROdW1lcmljID8gdmVzc2VsLkNhYmluc0NvdW50TnVtZXJpYyA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkJ1aWxkZXI8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+TGVuZ3RoPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLkxlbmd0aE92ZXJhbGwgPyB2ZXNzZWwuTGVuZ3RoT3ZlcmFsbCArIFwiIC8gXCIgKyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXByaWNlLWRldGFpbHMtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcHJpY2UtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtcHJpY2VcIj4ke3Zlc3NlbC5QcmljZSA/ICckJyArIHZlc3NlbC5QcmljZS5zbGljZSgwLCAtMykgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnfTwvcD5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGEgY2xhc3M9XCJ5YWNodC1kZXRhaWxzXCIgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHRcdERldGFpbHNcblx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXHR9O1xuXG5cdHlzcF90ZW1wbGF0ZXMubm9SZXN1bHRzPWZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxiPk5vIFJlc3VsdHM8L2I+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgIH07XG5cbiIsIlxuZnVuY3Rpb24geXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKGRhdGEpIHtcblxuICAgIGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93JykuaHRtbCgnJyk7XG5cbiAgICAvLyBHRVQgQU5EIFdSSVRFXG4gICAgcmV0dXJuIHJhaV95c3BfYXBpLmNhbGxfYXBpKFwiUE9TVFwiLCBcInlhY2h0c1wiLCBkYXRhKS50aGVuKGZ1bmN0aW9uKGRhdGFfcmVzdWx0KSB7XG5cbiAgICAgICAgalF1ZXJ5KCcjdG90YWwtcmVzdWx0cycpLnRleHQobmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1JTicsIHsgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzOiAzIH0pLmZvcm1hdChkYXRhX3Jlc3VsdC50b3RhbCkpO1xuXG4gICAgICAgIGlmIChkYXRhX3Jlc3VsdC50b3RhbCA+IDApIHtcblxuICAgICAgICAgICAgZGF0YV9yZXN1bHQucmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEudmlldyAhPSAndW5kZWZpbmVkJyAmJiBkYXRhLnZpZXcgPT0gJ2xpc3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93JykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0Lmxpc3QoaXRlbSwgZGF0YSkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93JykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0LmdyaWQoaXRlbSwgZGF0YSkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gcmFpeXNfcHVzaF9oaXN0b3J5KGRhdGEpO1xuXG4gICAgICAgICAgICBqUXVlcnkoJyN5YWNodHMtcGFnaW5hdGlvbicpLnBhZ2luYXRpb24oe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBkYXRhX3Jlc3VsdC50b3RhbCxcbiAgICAgICAgICAgICAgICBpdGVtc09uUGFnZTogMTIsXG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IGRhdGEucGFnZV9pbmRleCxcbiAgICAgICAgICAgICAgICBwcmV2VGV4dDogJzwnLFxuICAgICAgICAgICAgICAgIG5leHRUZXh0OiAnPicsXG4gICAgICAgICAgICAgICAgaHJlZlRleHRQcmVmaXg6ICc/cGFnZV9pbmRleD0nLFxuICAgICAgICAgICAgICAgIG9uUGFnZUNsaWNrOiBmdW5jdGlvbihwYWdlTnVtYmVyLCBldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPXBhZ2VOdW1iZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgLypqUXVlcnkoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0pLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAoalF1ZXJ5KFwiLnNlYXJjaC1mb3ItcGFnZVwiKS5vZmZzZXQoKS50b3ApXG4gICAgICAgICAgICAgICAgICAgIH0sIDI1MCk7Ki9cblxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybURhdGFPYmplY3QgPSByYWl5c19nZXRfZm9ybV9kYXRhKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJykgKTtcblxuICAgICAgICAgICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoZm9ybURhdGFPYmplY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBqUXVlcnkoJyN5YWNodHMtcGFnaW5hdGlvbicpLmh0bWwoJycpO1xuXG4gICAgICAgICAgICBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdycpLmFwcGVuZCh5c3BfdGVtcGxhdGVzLm5vUmVzdWx0cygpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGFfcmVzdWx0O1xuXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG5cbiAgICB9KTtcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgbGV0IHlhY2h0U2VhcmNoQW5kUmVzdWx0cz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJyk7XG5cblxuICAgIGlmICh5YWNodFNlYXJjaEFuZFJlc3VsdHMpIHtcbiAgICAgICAgeWFjaHRTZWFyY2hBbmRSZXN1bHRzLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHJhaXlzX2dldF9mb3JtX2RhdGEoZXZlbnQudGFyZ2V0KTtcblxuICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKTtcbiAgICAgICAgfSk7IFxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT12aWV3XVtmb3JtPXlzcC15YWNodC1zZWFyY2gtZm9ybV0sIHNlbGVjdFtuYW1lPXNvcnRCeV1bZm9ybT15c3AteWFjaHQtc2VhcmNoLWZvcm1dJykuZm9yRWFjaCgoZWVlZSkgPT4ge1xuICAgICAgICAgICAgZWVlZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHJhaXlzX2dldF9mb3JtX2RhdGEoIGUudGFyZ2V0LmZvcm0gKTtcblxuICAgICAgICAgICAgICAgIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlciggcGFyYW1zICk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlc3RvcmUgRmllbGRzXG4gICAgICAgIGxldCBVUkxSRUY9bmV3IFVSTChsb2NhdGlvbi5ocmVmKTsgLy8gbWF5YmUgZm9yIGEgcmUtZG9cblxuICAgICAgICBsZXQgZm9ybUlucHV0cz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC15YWNodC1zZWFyY2gtZm9ybVwiXScpO1xuXG4gICAgICAgIGZvcm1JbnB1dHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5wdXQgPSBlbGU7XG5cbiAgICAgICAgICAgIGxldCBuYW1lID0gZWxlLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG4gICAgICAgICAgICBsZXQgdXJsVmFsID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoIG5hbWUgKTtcblxuICAgICAgICAgICAgaWYgKHVybFZhbCAhPSAnJyAmJiB1cmxWYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiBpbnB1dC50eXBlID09ICdjaGVja2JveCcgJiYgaW5wdXQudmFsdWUgPT0gdXJsVmFsICkge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHVybFZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEZpbGwgTGlzdCBPcHRpb25zXG4gICAgICAgIGxldCBGaWxsTGlzdHM9W107XG4gICAgICAgIGxldCBsaXN0RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGF0YWxpc3RbZGF0YS1maWxsLWxpc3RdXCIpO1xuXG4gICAgICAgIGxpc3RFbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgIEZpbGxMaXN0cy5wdXNoKGVsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1saXN0JykpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpKCdQT1NUJywgJ2xpc3Qtb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxMaXN0c30pLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGxhYmVsIGluIHJPcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGF0YWxpc3RbZGF0YS1maWxsLWxpc3Q9J1wiKyBsYWJlbCArXCInXVwiKTtcblxuICAgICAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBiO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5hcHBlbmQob3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gRmlsbCBvcHRpb25zXG4gICAgICAgIGxldCBGaWxsT3B0aW9ucz1bXTtcbiAgICAgICAgbGV0IHNlbGVjdG9yRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zXVwiKTtcblxuICAgICAgICBzZWxlY3RvckVsZW1lbnRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgRmlsbE9wdGlvbnMucHVzaChlbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtb3B0aW9ucycpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByYWlfeXNwX2FwaS5jYWxsX2FwaSgnUE9TVCcsICdkcm9wZG93bi1vcHRpb25zJywge2xhYmVsczogRmlsbE9wdGlvbnN9KS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFtkYXRhLWZpbGwtb3B0aW9ucz0nXCIrIGxhYmVsICtcIiddXCIpO1xuXG4gICAgICAgICAgICAgICAgck9wdGlvbnNbbGFiZWxdLmZvckVhY2goZnVuY3Rpb24oYikge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiO1xuXG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmFkZChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBVUkxSRUYgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuICAgICAgICAgICAgICAgIGxldCBVcmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbGFiZWwgKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoVXJsVmFsICE9ICcnICYmIFVybFZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gVXJsVmFsOyBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFJlbmRlciBZYWNodHMgRm9yIFBhZ2UgTG9hZFxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHJhaXlzX2dldF9mb3JtX2RhdGEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpKTtcblxuICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKTsgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59KTsiXX0=
