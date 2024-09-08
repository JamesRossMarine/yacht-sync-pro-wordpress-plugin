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
  return "\n\t\t\t<div class=\"yacht-result-grid-item\" data-post-id=\"".concat(vessel._postID, "\" data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t<div class=\"yacht-main-image-container\">\n\t\t\t\t\t<a class=\"yacht-details\" href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t<img class=\"yacht-main-image\" src=\"").concat(vessel.Images ? vessel.Images[0].Uri : rai_yacht_sync.assets_url + 'images/default-yacht-image.jpeg', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t\t\t<svg class=\"like-me love\" xmlns=\"http://www.w3.org/2000/svg\" width=\"57\" height=\"54\" viewBox=\"0 0 57 54\" fill=\"none\"  data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t\t\t  <g filter=\"url(#filter0_d_2888_4333)\">\n\t\t\t\t\t\t    <path d=\"M34.7028 11.5755C36.2094 11.5755 37.6251 12.1699 38.6898 13.2488L38.8223 13.383C41.0206 15.6116 41.0206 19.2375 38.8223 21.466L38.0992 22.199L27.4995 32.9442L18.4883 23.808L16.9011 22.199L16.178 21.466C13.9797 19.2375 13.9797 15.6116 16.178 13.383L16.3083 13.2509C17.3739 12.1708 18.79 11.5759 20.2962 11.5764C21.8023 11.5764 23.2176 12.1708 24.2819 13.2492L25.005 13.9822L27.4991 16.5101L29.9928 13.9818L30.7158 13.2488C31.7801 12.1699 33.1962 11.5755 34.7028 11.5755ZM34.7028 8C32.357 8 30.0112 8.9068 28.2222 10.7204L27.4991 11.4534L26.776 10.7204C24.9878 8.90723 22.642 8.00043 20.297 8C17.9508 8 15.605 8.90723 13.8147 10.7221L13.6844 10.8542C10.1046 14.4832 10.1046 20.3645 13.6844 23.9935L14.4074 24.7265L15.9946 26.3354L27.4995 38L40.5933 24.7265L41.3164 23.9935C44.8945 20.3663 44.8945 14.4814 41.3164 10.8542L41.1839 10.72C39.3945 8.9068 37.0486 8 34.7028 8Z\" fill=\"white\"></path>\n\t\t\t\t\t\t  </g>\n\t\t\t\t\t\t  <defs>\n\t\t\t\t\t\t    <filter id=\"filter0_d_2888_4333\" x=\"-0.000488281\" y=\"0\" width=\"57.0005\" height=\"54\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n\t\t\t\t\t\t      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood>\n\t\t\t\t\t\t      <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"></feColorMatrix>\n\t\t\t\t\t\t      <feOffset dx=\"1\" dy=\"4\"></feOffset>\n\t\t\t\t\t\t      <feGaussianBlur stdDeviation=\"6\"></feGaussianBlur>\n\t\t\t\t\t\t      <feComposite in2=\"hardAlpha\" operator=\"out\"></feComposite>\n\t\t\t\t\t\t      <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"></feColorMatrix>\n\t\t\t\t\t\t      <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_2888_4333\"></feBlend>\n\t\t\t\t\t\t      <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_2888_4333\" result=\"shape\"></feBlend>\n\t\t\t\t\t\t    </filter>\n\t\t\t\t\t\t  </defs>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t").concat(vessel.CompanyName === rai_yacht_sync.company_name ? "<div class=\"company-banner\"><img src=\"".concat(rai_yacht_sync.company_logo, "\"></div>") : '', "\n\t\t\t\t\t</a>\t\n\t\t\t\t</div>\n\t\t\t\t<div class=\"yacht-general-info-container\">\n\t\t\t\t\t<div class=\"yacht-title-container\">\n\t\t\t\t\t\t<a class=\"yacht-details\" href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t\t<h6 class=\"yacht-title\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', " ").concat(vessel.BoatName ? vessel.BoatName : '', "</h6>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-info-container\">\n\t\t\t\t\t\t<div class=\"yacht-info\">\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Year</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.ModelYear ? vessel.ModelYear : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Cabins</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.CabinsCountNumeric ? vessel.CabinsCountNumeric : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Builder</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.MakeString ? vessel.MakeString : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Length</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(length, "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Compare</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\"><input type=\"checkbox\" class=\"compare_toggle\" name=\"compare\" value=\"").concat(vessel._postID, "\" /></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-price-details-container\">\n\t\t\t\t\t\t<div class=\"yacht-price-container\">\n\t\t\t\t\t\t\t<p class=\"yacht-price\">").concat(price, "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<button class=\"yacht-download-button\" type=\"button\" data-modal=\"#single-share\">Contact</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS1wYWdpbmF0aW9uLmpzIiwianF1ZXJ5LW1vZGFsLmpzIiwid2hhdGV2ZXIuanMiLCJjb21tb24uanMiLCJhcGktY2xpZW50LmpzIiwidGVtcGxhdGVzLmpzIiwiZmlsbC1maWVsZHMuanMiLCJ5YWNodFNlYXJjaFRhZ3MuanMiLCJ5YWNodFNlYXJjaExvdmVkLmpzIiwieWFjaHRTZWFyY2hDb21wYXJlLmpzIiwieWFjaHRTZWFyY2guanMiLCJsZWFkcy5qcyJdLCJuYW1lcyI6WyIkIiwibWV0aG9kcyIsImluaXQiLCJvcHRpb25zIiwibyIsImV4dGVuZCIsIml0ZW1zIiwiaXRlbXNPblBhZ2UiLCJwYWdlcyIsImRpc3BsYXllZFBhZ2VzIiwiZWRnZXMiLCJjdXJyZW50UGFnZSIsInVzZUFuY2hvcnMiLCJocmVmVGV4dFByZWZpeCIsImhyZWZUZXh0U3VmZml4IiwicHJldlRleHQiLCJuZXh0VGV4dCIsImVsbGlwc2VUZXh0IiwiZWxsaXBzZVBhZ2VTZXQiLCJjc3NTdHlsZSIsImxpc3RTdHlsZSIsImxhYmVsTWFwIiwic2VsZWN0T25DbGljayIsIm5leHRBdEZyb250IiwiaW52ZXJ0UGFnZU9yZGVyIiwidXNlU3RhcnRFZGdlIiwidXNlRW5kRWRnZSIsIm9uUGFnZUNsaWNrIiwicGFnZU51bWJlciIsImV2ZW50Iiwib25Jbml0Iiwic2VsZiIsIk1hdGgiLCJjZWlsIiwiaGFsZkRpc3BsYXllZCIsImVhY2giLCJhZGRDbGFzcyIsImRhdGEiLCJfZHJhdyIsImNhbGwiLCJzZWxlY3RQYWdlIiwicGFnZSIsIl9zZWxlY3RQYWdlIiwicHJldlBhZ2UiLCJuZXh0UGFnZSIsImdldFBhZ2VzQ291bnQiLCJzZXRQYWdlc0NvdW50IiwiY291bnQiLCJnZXRDdXJyZW50UGFnZSIsImRlc3Ryb3kiLCJlbXB0eSIsImRyYXdQYWdlIiwicmVkcmF3IiwiZGlzYWJsZSIsImRpc2FibGVkIiwiZW5hYmxlIiwidXBkYXRlSXRlbXMiLCJuZXdJdGVtcyIsIl9nZXRQYWdlcyIsInVwZGF0ZUl0ZW1zT25QYWdlIiwiZ2V0SXRlbXNPblBhZ2UiLCJpbnRlcnZhbCIsIl9nZXRJbnRlcnZhbCIsImkiLCJ0YWdOYW1lIiwicHJvcCIsImF0dHIiLCIkcGFuZWwiLCJhcHBlbmRUbyIsIl9hcHBlbmRJdGVtIiwidGV4dCIsImNsYXNzZXMiLCJzdGFydCIsImVuZCIsIm1pbiIsImFwcGVuZCIsImJlZ2luIiwibWF4IiwiX2VsbGlwc2VDbGljayIsInBhZ2VJbmRleCIsIm9wdHMiLCIkbGluayIsIiRsaW5rV3JhcHBlciIsIiR1bCIsImZpbmQiLCJsZW5ndGgiLCJjbGljayIsIiRlbGxpcCIsInBhcmVudCIsInJlbW92ZUNsYXNzIiwiJHRoaXMiLCJ2YWwiLCJwYXJzZUludCIsInByZXYiLCJodG1sIiwiZm9jdXMiLCJzdG9wUHJvcGFnYXRpb24iLCJrZXl1cCIsIndoaWNoIiwiYmluZCIsImZuIiwicGFnaW5hdGlvbiIsIm1ldGhvZCIsImNoYXJBdCIsImFwcGx5IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFyZ3VtZW50cyIsIl90eXBlb2YiLCJlcnJvciIsImpRdWVyeSIsImZhY3RvcnkiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIndpbmRvdyIsImRvY3VtZW50IiwidW5kZWZpbmVkIiwibW9kYWxzIiwiZ2V0Q3VycmVudCIsInNlbGVjdEN1cnJlbnQiLCJzZWxlY3RlZCIsIiRibG9ja2VyIiwidG9nZ2xlQ2xhc3MiLCJ5c3BfbW9kYWwiLCJlbCIsInJlbW92ZSIsInRhcmdldCIsIiRib2R5IiwiZGVmYXVsdHMiLCJkb0ZhZGUiLCJpc05hTiIsImZhZGVEdXJhdGlvbiIsImNsb3NlRXhpc3RpbmciLCJpc0FjdGl2ZSIsImNsb3NlIiwicHVzaCIsImlzIiwiYW5jaG9yIiwidGVzdCIsIiRlbG0iLCJvcGVuIiwibW9kYWwiLCJlbG0iLCJzaG93U3Bpbm5lciIsInRyaWdnZXIiLCJBSkFYX1NFTkQiLCJnZXQiLCJkb25lIiwiQUpBWF9TVUNDRVNTIiwiY3VycmVudCIsIm9uIiwiQ0xPU0UiLCJoaWRlU3Bpbm5lciIsIkFKQVhfQ09NUExFVEUiLCJmYWlsIiwiQUpBWF9GQUlMIiwicG9wIiwiY29uc3RydWN0b3IiLCJtIiwiYmxvY2siLCJibHVyIiwic2V0VGltZW91dCIsInNob3ciLCJmYWRlRGVsYXkiLCJvZmYiLCJlc2NhcGVDbG9zZSIsImNsaWNrQ2xvc2UiLCJlIiwidW5ibG9jayIsImhpZGUiLCJCRUZPUkVfQkxPQ0siLCJfY3R4IiwiY3NzIiwiYmxvY2tlckNsYXNzIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJCTE9DSyIsIm5vdyIsImZhZGVPdXQiLCJjaGlsZHJlbiIsIkJFRk9SRV9PUEVOIiwic2hvd0Nsb3NlIiwiY2xvc2VCdXR0b24iLCJjbG9zZUNsYXNzIiwiY2xvc2VUZXh0IiwibW9kYWxDbGFzcyIsImRpc3BsYXkiLCJPUEVOIiwiQkVGT1JFX0NMT1NFIiwiX3RoaXMiLCJBRlRFUl9DTE9TRSIsInNwaW5uZXIiLCJzcGlubmVySHRtbCIsIiRhbmNob3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlYWR5IiwiY29uc29sZSIsImxvZyIsImRhdGFfbW9kYWwiLCJjb3B5TGluayIsImNvcHlUZXh0IiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3QiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImV4ZWNDb21tYW5kIiwiYWxlcnQiLCJ2YWx1ZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsIm1hcCIsInMiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0cmluZyIsImpvaW4iLCJlbnVtZXJhYmxlIiwicmFpeXNfZ2V0X2Zvcm1fZGF0YSIsImZvcm1fZWxlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImZkIiwiZnJvbUVudHJpZXMiLCJlbnRyaWVzIiwiX2kiLCJfT2JqZWN0JGVudHJpZXMiLCJfT2JqZWN0JGVudHJpZXMkX2kiLCJfc2xpY2VkVG9BcnJheSIsImZJbmRleCIsImZpZWxkIiwiVmFsQXJyYXkiLCJnZXRBbGwiLCJyYWl5c19zZXRfZm9ybV90b19kYXRhIiwiaW5wdXREYXRhIiwiZm9ybUEiLCJxdWVyeVNlbGVjdG9yIiwiZm9ybUIiLCJyZXNldCIsImZvcm1JbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZSIsImlucHV0IiwibmFtZSIsImdldEF0dHJpYnV0ZSIsImhhc1ByZXR0eSIsImlzQXJyYXkiLCJoUCIsInR5cGUiLCJjaGVja2VkIiwicmFpeXNfcHVzaF9oaXN0b3J5Iiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwic3RycGF0aCIsInByb3BlcnR5IiwiaXQiLCJzZXQiLCJ0b1N0cmluZyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJyYWlfeWFjaHRfc3luYyIsInlhY2h0X3NlYXJjaF91cmwiLCJyYWlfeXNwX2FwaSIsImNhbGxfYXBpIiwicGF0aCIsInBhc3NpbmdfZGF0YSIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZURhdGEiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJfcXVlc3Rpb25NYXJrIiwid3BfcmVzdF91cmwiLCJzZW5kIiwic2V0UmVxdWVzdEhlYWRlciIsInN0cmluZ2lmeSIsInlzcF90ZW1wbGF0ZXMiLCJ5YWNodCIsImdyaWQiLCJ2ZXNzZWwiLCJwYXJhbXMiLCJtZXRlcnMiLCJOb21pbmFsTGVuZ3RoIiwicHJpY2UiLCJldXJvcGVfb3B0aW9uX3BpY2tlZCIsInRvRml4ZWQiLCJZU1BfRXVyb1ZhbCIsImNvbmNhdCIsIkludGwiLCJOdW1iZXJGb3JtYXQiLCJtaW5pbXVtRnJhY3Rpb25EaWdpdHMiLCJmb3JtYXQiLCJjdXJyZW5jeSIsIllTUF9VU0RWYWwiLCJfcG9zdElEIiwiRG9jdW1lbnRJRCIsIl9saW5rIiwiSW1hZ2VzIiwiVXJpIiwiYXNzZXRzX3VybCIsIkNvbXBhbnlOYW1lIiwiY29tcGFueV9uYW1lIiwiY29tcGFueV9sb2dvIiwiTW9kZWxZZWFyIiwiTWFrZVN0cmluZyIsIk1vZGVsIiwiQm9hdE5hbWUiLCJDYWJpbnNDb3VudE51bWVyaWMiLCJsaXN0IiwiUHJpY2UiLCJldXJvX2NfYyIsImNvbXBhcmVfcHJldmlldyIsIm5vUmVzdWx0cyIsInlhY2h0X3RhZyIsImxhYmVsIiwibmV4dF90ZXh0IiwicHJldl90ZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVsZV9xdWlja19zZWFyY2giLCJGaWxsT3B0aW9ucyIsInNlbGVjdG9yRWxlbWVudHMiLCJsYWJlbHMiLCJ0aGVuIiwick9wdGlvbnMiLCJfbG9vcCIsIlNlbGVjdG9yRWxlIiwiYiIsIm9wdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJVUkxSRUYiLCJVUkwiLCJsb2NhdGlvbiIsImhyZWYiLCJVcmxWYWwiLCJzdHJwYXRocyIsInJlcGxhY2UiLCJ5YWNodF9zZWFyY2hfcGFnZV9pZCIsInBhdGhzIiwicHJldHR5X3VybF9wYXRoX3BhcmFtcyIsInBoYXNlX3BhdGgiLCJvbmx5X3ZhbHMiLCJlYWNoV29yZENhcGl0YWxpemUiLCJ5c3BfbWFrZVNlYXJjaFRhZ3MiLCJ0YWdzRWxlIiwidGUiLCJpbm5lckhUTUwiLCJ5c3BfdGFnc19ub3RfcHJpbnQiLCJfbG9vcDIiLCJwYXJhbUtleSIsImlubmVyVGV4dCIsImhhc0F0dHJpYnV0ZSIsImluZGV4T2YiLCJlbGVJbnB1dCIsIm5ld1RhZ0VsZSIsInRhZ1ZhbCIsInNlbGVjdGVkSW5kZXgiLCJtYXRjaCIsImVsZVVuaXQiLCJjbGFzc05hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInlzcFRhZ0VsZSIsImtleSIsImN1cnJlbnRUYXJnZXQiLCJpbnB1dEVsZXMiLCJlbGVJIiwiZm9ybSIsInJlcXVlc3RTdWJtaXQiLCJ5c3BfbWFya0xvdmVkVmVzc2VsIiwiZWxlX2NhcmQiLCJ5YWNodElkIiwiaGFzQ2xhc3MiLCJ5c3BfYWRkTG92ZWRWZXNzZWwiLCJ5c3BfcmVtb3ZlTG92ZWRWZXNzZWwiLCJ5c195YWNodHNfbG92ZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibG92ZWRWZXNzZWxzIiwic2V0SXRlbSIsImluZGV4ZWQiLCJzcGxpY2UiLCJZU1BfVmVzc2VsQ29tcGFyZUxpc3QiLCJ5c3BfcmVzdG9yZUNvbXBhcmVzIiwiY29tcGFyZV9wb3N0X2lkcyIsInlzcF9tYWtlQ29tcGFyZUxpbmtvdXQiLCJ5c3BfbWFrZUNvbXBhcmVWZXNzZWwiLCJjaGFuZ2UiLCJ5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCIsInlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0IiwiZGF0YV9yZXN1bHQiLCJyZXN1bHRzIiwiaXRlbSIsImVsZV9wcmV2aWV3IiwieXNwQmVmb3JlWWFjaHRTZWFyY2giLCJFdmVudCIsInlzcEFmdGVyWWFjaHRTZWFyY2giLCJ5c3BBZnRlclJlbmRlcmluZ1lhY2h0IiwieXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyIiwiY2xhc3NMaXN0IiwidGl0bGUiLCJTRU8iLCJoZWFkaW5nIiwiZ3B0X3AiLCJtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMiLCJ0b3RhbCIsImN1cnJlbnRVUkwiLCJkb250X3B1c2giLCJ2aWV3IiwidmVzc2VsSW5mbyIsInBhZ2VfaW5kZXgiLCJSZWdFeHAiLCJmb3JtRGF0YU9iamVjdCIsImRvY3VtZW50RWxlbWVudCIsImJvZHkiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJkaXNwYXRjaEV2ZW50IiwiRmlsbExpc3RzIiwibGlzdEVsZW1lbnRzIiwibGlzdE5lZWRlZEVsZW1lbnRzIiwiaW5wdXRfZWxlIiwibGlzdF9pZCIsImVsZV9saXN0IiwiX2xvb3AzIiwieWFjaHRTZWFyY2hBbmRSZXN1bHRzIiwib21zZSIsInN0eWxlIiwib3ZlcmZsb3dZIiwiYXBpX2RhdGEiLCJlbGVSZXNldCIsImVsZUNoZWNrIiwiZWxlVmlld09wdGlvbiIsImlucHV0X25hbWUiLCJvbmx5X3ZhbHNfYXJyYXkiLCJvdiIsInVybFZhbCIsIl9sb29wNCIsImxvdmVkX3lhY2h0cyIsInlzX29ubHlfdGhlc2UiLCJtb2JpbGVGb3JtIiwiaGFuZGxlU3VibWl0IiwiYXBpRW5kcG9pbnQiLCJzdWNjZXNzTWVzc2FnZSIsInBhcmVudEVsZW1lbnQiLCJ5YWNodEZvcm1zIiwiZkVsZSIsImJyb2tlckZvcm1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQSxVQUFBQSxDQUFBLEVBQUE7RUFFQSxJQUFBQyxPQUFBLEdBQUE7SUFDQUMsSUFBQSxFQUFBLFNBQUFBLEtBQUFDLE9BQUEsRUFBQTtNQUNBLElBQUFDLENBQUEsR0FBQUosQ0FBQSxDQUFBSyxNQUFBLENBQUE7UUFDQUMsS0FBQSxFQUFBLENBQUE7UUFDQUMsV0FBQSxFQUFBLENBQUE7UUFDQUMsS0FBQSxFQUFBLENBQUE7UUFDQUMsY0FBQSxFQUFBLENBQUE7UUFDQUMsS0FBQSxFQUFBLENBQUE7UUFDQUMsV0FBQSxFQUFBLENBQUE7UUFDQUMsVUFBQSxFQUFBLElBQUE7UUFDQUMsY0FBQSxFQUFBLFFBQUE7UUFDQUMsY0FBQSxFQUFBLEVBQUE7UUFDQUMsUUFBQSxFQUFBLE1BQUE7UUFDQUMsUUFBQSxFQUFBLE1BQUE7UUFDQUMsV0FBQSxFQUFBLFVBQUE7UUFDQUMsY0FBQSxFQUFBLElBQUE7UUFDQUMsUUFBQSxFQUFBLGFBQUE7UUFDQUMsU0FBQSxFQUFBLEVBQUE7UUFDQUMsUUFBQSxFQUFBLEVBQUE7UUFDQUMsYUFBQSxFQUFBLElBQUE7UUFDQUMsV0FBQSxFQUFBLEtBQUE7UUFDQUMsZUFBQSxFQUFBLEtBQUE7UUFDQUMsWUFBQSxFQUFBLElBQUE7UUFDQUMsVUFBQSxFQUFBLElBQUE7UUFDQUMsV0FBQSxFQUFBLFNBQUFBLFlBQUFDLFVBQUEsRUFBQUMsS0FBQSxFQUFBO1VBQ0E7VUFDQTtRQUFBLENBQ0E7UUFDQUMsTUFBQSxFQUFBLFNBQUFBLE9BQUEs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LENBQUE7QUFDQSxDQUFBLENBQUEiLCJmaWxlIjoiZ2xvYmFsUGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIC8qKlxuKiBzaW1wbGVQYWdpbmF0aW9uLmpzIHYxLjZcbiogQSBzaW1wbGUgalF1ZXJ5IHBhZ2luYXRpb24gcGx1Z2luLlxuKiBodHRwOi8vZmxhdml1c21hdGlzLmdpdGh1Yi5jb20vc2ltcGxlUGFnaW5hdGlvbi5qcy9cbipcbiogQ29weXJpZ2h0IDIwMTIsIEZsYXZpdXMgTWF0aXNcbiogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuKiBodHRwOi8vZmxhdml1c21hdGlzLmdpdGh1Yi5jb20vbGljZW5zZS5odG1sXG4qL1xuXG4oZnVuY3Rpb24oJCl7XG5cblx0dmFyIG1ldGhvZHMgPSB7XG5cdFx0aW5pdDogZnVuY3Rpb24ob3B0aW9ucykge1xuXHRcdFx0dmFyIG8gPSAkLmV4dGVuZCh7XG5cdFx0XHRcdGl0ZW1zOiAxLFxuXHRcdFx0XHRpdGVtc09uUGFnZTogMSxcblx0XHRcdFx0cGFnZXM6IDAsXG5cdFx0XHRcdGRpc3BsYXllZFBhZ2VzOiA1LFxuXHRcdFx0XHRlZGdlczogMixcblx0XHRcdFx0Y3VycmVudFBhZ2U6IDAsXG5cdFx0XHRcdHVzZUFuY2hvcnM6IHRydWUsXG5cdFx0XHRcdGhyZWZUZXh0UHJlZml4OiAnI3BhZ2UtJyxcblx0XHRcdFx0aHJlZlRleHRTdWZmaXg6ICcnLFxuXHRcdFx0XHRwcmV2VGV4dDogJ1ByZXYnLFxuXHRcdFx0XHRuZXh0VGV4dDogJ05leHQnLFxuXHRcdFx0XHRlbGxpcHNlVGV4dDogJyZoZWxsaXA7Jyxcblx0XHRcdFx0ZWxsaXBzZVBhZ2VTZXQ6IHRydWUsXG5cdFx0XHRcdGNzc1N0eWxlOiAnbGlnaHQtdGhlbWUnLFxuXHRcdFx0XHRsaXN0U3R5bGU6ICcnLFxuXHRcdFx0XHRsYWJlbE1hcDogW10sXG5cdFx0XHRcdHNlbGVjdE9uQ2xpY2s6IHRydWUsXG5cdFx0XHRcdG5leHRBdEZyb250OiBmYWxzZSxcblx0XHRcdFx0aW52ZXJ0UGFnZU9yZGVyOiBmYWxzZSxcblx0XHRcdFx0dXNlU3RhcnRFZGdlIDogdHJ1ZSxcblx0XHRcdFx0dXNlRW5kRWRnZSA6IHRydWUsXG5cdFx0XHRcdG9uUGFnZUNsaWNrOiBmdW5jdGlvbihwYWdlTnVtYmVyLCBldmVudCkge1xuXHRcdFx0XHRcdC8vIENhbGxiYWNrIHRyaWdnZXJlZCB3aGVuIGEgcGFnZSBpcyBjbGlja2VkXG5cdFx0XHRcdFx0Ly8gUGFnZSBudW1iZXIgaXMgZ2l2ZW4gYXMgYW4gb3B0aW9uYWwgcGFyYW1ldGVyXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9uSW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Ly8gQ2FsbGJhY2sgdHJpZ2dlcmVkIGltbWVkaWF0ZWx5IGFmdGVyIGluaXRpYWxpemF0aW9uXG5cdFx0XHRcdH1cblx0XHRcdH0sIG9wdGlvbnMgfHwge30pO1xuXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRcdG8ucGFnZXMgPSBvLnBhZ2VzID8gby5wYWdlcyA6IE1hdGguY2VpbChvLml0ZW1zIC8gby5pdGVtc09uUGFnZSkgPyBNYXRoLmNlaWwoby5pdGVtcyAvIG8uaXRlbXNPblBhZ2UpIDogMTtcblx0XHRcdGlmIChvLmN1cnJlbnRQYWdlKVxuXHRcdFx0XHRvLmN1cnJlbnRQYWdlID0gby5jdXJyZW50UGFnZSAtIDE7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdG8uY3VycmVudFBhZ2UgPSAhby5pbnZlcnRQYWdlT3JkZXIgPyAwIDogby5wYWdlcyAtIDE7XG5cdFx0XHRvLmhhbGZEaXNwbGF5ZWQgPSBvLmRpc3BsYXllZFBhZ2VzIC8gMjtcblxuXHRcdFx0dGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLmFkZENsYXNzKG8uY3NzU3R5bGUgKyAnIHNpbXBsZS1wYWdpbmF0aW9uJykuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwoc2VsZik7XG5cdFx0XHR9KTtcblxuXHRcdFx0by5vbkluaXQoKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHNlbGVjdFBhZ2U6IGZ1bmN0aW9uKHBhZ2UpIHtcblx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBwYWdlIC0gMSk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0cHJldlBhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPiAwKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgLSAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPCBvLnBhZ2VzIC0gMSkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlICsgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRuZXh0UGFnZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA8IG8ucGFnZXMgLSAxKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgKyAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPiAwKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgLSAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGdldFBhZ2VzQ291bnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLnBhZ2VzO1xuXHRcdH0sXG5cblx0XHRzZXRQYWdlc0NvdW50OiBmdW5jdGlvbihjb3VudCkge1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJykucGFnZXMgPSBjb3VudDtcblx0XHR9LFxuXG5cdFx0Z2V0Q3VycmVudFBhZ2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5jdXJyZW50UGFnZSArIDE7XG5cdFx0fSxcblxuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLmVtcHR5KCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0ZHJhd1BhZ2U6IGZ1bmN0aW9uIChwYWdlKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5jdXJyZW50UGFnZSA9IHBhZ2UgLSAxO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0cmVkcmF3OiBmdW5jdGlvbigpe1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGRpc2FibGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRlbmFibGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0dXBkYXRlSXRlbXM6IGZ1bmN0aW9uIChuZXdJdGVtcykge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uaXRlbXMgPSBuZXdJdGVtcztcblx0XHRcdG8ucGFnZXMgPSBtZXRob2RzLl9nZXRQYWdlcyhvKTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdH0sXG5cblx0XHR1cGRhdGVJdGVtc09uUGFnZTogZnVuY3Rpb24gKGl0ZW1zT25QYWdlKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5pdGVtc09uUGFnZSA9IGl0ZW1zT25QYWdlO1xuXHRcdFx0by5wYWdlcyA9IG1ldGhvZHMuX2dldFBhZ2VzKG8pO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgMCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Z2V0SXRlbXNPblBhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLml0ZW1zT25QYWdlO1xuXHRcdH0sXG5cblx0XHRfZHJhdzogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXJcdG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKSxcblx0XHRcdFx0aW50ZXJ2YWwgPSBtZXRob2RzLl9nZXRJbnRlcnZhbChvKSxcblx0XHRcdFx0aSxcblx0XHRcdFx0dGFnTmFtZTtcblxuXHRcdFx0bWV0aG9kcy5kZXN0cm95LmNhbGwodGhpcyk7XG5cblx0XHRcdHRhZ05hbWUgPSAodHlwZW9mIHRoaXMucHJvcCA9PT0gJ2Z1bmN0aW9uJykgPyB0aGlzLnByb3AoJ3RhZ05hbWUnKSA6IHRoaXMuYXR0cigndGFnTmFtZScpO1xuXG5cdFx0XHR2YXIgJHBhbmVsID0gdGFnTmFtZSA9PT0gJ1VMJyA/IHRoaXMgOiAkKCc8dWwnICsgKG8ubGlzdFN0eWxlID8gJyBjbGFzcz1cIicgKyBvLmxpc3RTdHlsZSArICdcIicgOiAnJykgKyAnPjwvdWw+JykuYXBwZW5kVG8odGhpcyk7XG5cblx0XHRcdC8vIEdlbmVyYXRlIFByZXYgbGlua1xuXHRcdFx0aWYgKG8ucHJldlRleHQpIHtcblx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsICFvLmludmVydFBhZ2VPcmRlciA/IG8uY3VycmVudFBhZ2UgLSAxIDogby5jdXJyZW50UGFnZSArIDEsIHt0ZXh0OiBvLnByZXZUZXh0LCBjbGFzc2VzOiAncHJldid9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgTmV4dCBsaW5rIChpZiBvcHRpb24gc2V0IGZvciBhdCBmcm9udClcblx0XHRcdGlmIChvLm5leHRUZXh0ICYmIG8ubmV4dEF0RnJvbnQpIHtcblx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsICFvLmludmVydFBhZ2VPcmRlciA/IG8uY3VycmVudFBhZ2UgKyAxIDogby5jdXJyZW50UGFnZSAtIDEsIHt0ZXh0OiBvLm5leHRUZXh0LCBjbGFzc2VzOiAnbmV4dCd9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgc3RhcnQgZWRnZXNcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKGludGVydmFsLnN0YXJ0ID4gMCAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmKG8udXNlU3RhcnRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgZW5kID0gTWF0aC5taW4oby5lZGdlcywgaW50ZXJ2YWwuc3RhcnQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGVuZDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG8uZWRnZXMgPCBpbnRlcnZhbC5zdGFydCAmJiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBvLmVkZ2VzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5lbmQgPCBvLnBhZ2VzICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYoby51c2VTdGFydEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBiZWdpbiA9IE1hdGgubWF4KG8ucGFnZXMgLSBvLmVkZ2VzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gby5wYWdlcyAtIDE7IGkgPj0gYmVnaW47IGktLSkge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKG8ucGFnZXMgLSBvLmVkZ2VzID4gaW50ZXJ2YWwuZW5kICYmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBpbnRlcnZhbCBsaW5rc1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRmb3IgKGkgPSBpbnRlcnZhbC5zdGFydDsgaSA8IGludGVydmFsLmVuZDsgaSsrKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKGkgPSBpbnRlcnZhbC5lbmQgLSAxOyBpID49IGludGVydmFsLnN0YXJ0OyBpLS0pIHtcblx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgZW5kIGVkZ2VzXG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5lbmQgPCBvLnBhZ2VzICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYgKG8ucGFnZXMgLSBvLmVkZ2VzID4gaW50ZXJ2YWwuZW5kICYmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihvLnVzZUVuZEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBiZWdpbiA9IE1hdGgubWF4KG8ucGFnZXMgLSBvLmVkZ2VzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gYmVnaW47IGkgPCBvLnBhZ2VzOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGludGVydmFsLnN0YXJ0ID4gMCAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmIChvLmVkZ2VzIDwgaW50ZXJ2YWwuc3RhcnQgJiYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgby5lZGdlcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoby51c2VFbmRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgZW5kID0gTWF0aC5taW4oby5lZGdlcywgaW50ZXJ2YWwuc3RhcnQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gZW5kIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBOZXh0IGxpbmsgKHVubGVzcyBvcHRpb24gaXMgc2V0IGZvciBhdCBmcm9udClcblx0XHRcdGlmIChvLm5leHRUZXh0ICYmICFvLm5leHRBdEZyb250KSB7XG5cdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCAhby5pbnZlcnRQYWdlT3JkZXIgPyBvLmN1cnJlbnRQYWdlICsgMSA6IG8uY3VycmVudFBhZ2UgLSAxLCB7dGV4dDogby5uZXh0VGV4dCwgY2xhc3NlczogJ25leHQnfSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvLmVsbGlwc2VQYWdlU2V0ICYmICFvLmRpc2FibGVkKSB7XG5cdFx0XHRcdG1ldGhvZHMuX2VsbGlwc2VDbGljay5jYWxsKHRoaXMsICRwYW5lbCk7XG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0X2dldFBhZ2VzOiBmdW5jdGlvbihvKSB7XG5cdFx0XHR2YXIgcGFnZXMgPSBNYXRoLmNlaWwoby5pdGVtcyAvIG8uaXRlbXNPblBhZ2UpO1xuXHRcdFx0cmV0dXJuIHBhZ2VzIHx8IDE7XG5cdFx0fSxcblxuXHRcdF9nZXRJbnRlcnZhbDogZnVuY3Rpb24obykge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c3RhcnQ6IE1hdGguY2VpbChvLmN1cnJlbnRQYWdlID4gby5oYWxmRGlzcGxheWVkID8gTWF0aC5tYXgoTWF0aC5taW4oby5jdXJyZW50UGFnZSAtIG8uaGFsZkRpc3BsYXllZCwgKG8ucGFnZXMgLSBvLmRpc3BsYXllZFBhZ2VzKSksIDApIDogMCksXG5cdFx0XHRcdGVuZDogTWF0aC5jZWlsKG8uY3VycmVudFBhZ2UgPiBvLmhhbGZEaXNwbGF5ZWQgPyBNYXRoLm1pbihvLmN1cnJlbnRQYWdlICsgby5oYWxmRGlzcGxheWVkLCBvLnBhZ2VzKSA6IE1hdGgubWluKG8uZGlzcGxheWVkUGFnZXMsIG8ucGFnZXMpKVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0X2FwcGVuZEl0ZW06IGZ1bmN0aW9uKHBhZ2VJbmRleCwgb3B0cykge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLCBvcHRpb25zLCAkbGluaywgbyA9IHNlbGYuZGF0YSgncGFnaW5hdGlvbicpLCAkbGlua1dyYXBwZXIgPSAkKCc8bGk+PC9saT4nKSwgJHVsID0gc2VsZi5maW5kKCd1bCcpO1xuXG5cdFx0XHRwYWdlSW5kZXggPSBwYWdlSW5kZXggPCAwID8gMCA6IChwYWdlSW5kZXggPCBvLnBhZ2VzID8gcGFnZUluZGV4IDogby5wYWdlcyAtIDEpO1xuXG5cdFx0XHRvcHRpb25zID0ge1xuXHRcdFx0XHR0ZXh0OiBwYWdlSW5kZXggKyAxLFxuXHRcdFx0XHRjbGFzc2VzOiAnJ1xuXHRcdFx0fTtcblxuXHRcdFx0aWYgKG8ubGFiZWxNYXAubGVuZ3RoICYmIG8ubGFiZWxNYXBbcGFnZUluZGV4XSkge1xuXHRcdFx0XHRvcHRpb25zLnRleHQgPSBvLmxhYmVsTWFwW3BhZ2VJbmRleF07XG5cdFx0XHR9XG5cblx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZChvcHRpb25zLCBvcHRzIHx8IHt9KTtcblxuXHRcdFx0aWYgKHBhZ2VJbmRleCA9PSBvLmN1cnJlbnRQYWdlIHx8IG8uZGlzYWJsZWQpIHtcblx0XHRcdFx0aWYgKG8uZGlzYWJsZWQgfHwgb3B0aW9ucy5jbGFzc2VzID09PSAncHJldicgfHwgb3B0aW9ucy5jbGFzc2VzID09PSAnbmV4dCcpIHtcblx0XHRcdFx0XHQkbGlua1dyYXBwZXIuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JGxpbmtXcmFwcGVyLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkbGluayA9ICQoJzxzcGFuIGNsYXNzPVwiY3VycmVudFwiPicgKyAob3B0aW9ucy50ZXh0KSArICc8L3NwYW4+Jyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoby51c2VBbmNob3JzKSB7XG5cdFx0XHRcdFx0JGxpbmsgPSAkKCc8YSBocmVmPVwiJyArIG8uaHJlZlRleHRQcmVmaXggKyAocGFnZUluZGV4ICsgMSkgKyBvLmhyZWZUZXh0U3VmZml4ICsgJ1wiIGNsYXNzPVwicGFnZS1saW5rXCI+JyArIChvcHRpb25zLnRleHQpICsgJzwvYT4nKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkbGluayA9ICQoJzxzcGFuID4nICsgKG9wdGlvbnMudGV4dCkgKyAnPC9zcGFuPicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCRsaW5rLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRcdFx0XHRyZXR1cm4gbWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHNlbGYsIHBhZ2VJbmRleCwgZXZlbnQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdGlvbnMuY2xhc3Nlcykge1xuXHRcdFx0XHQkbGluay5hZGRDbGFzcyhvcHRpb25zLmNsYXNzZXMpO1xuXHRcdFx0fVxuXG5cdFx0XHQkbGlua1dyYXBwZXIuYXBwZW5kKCRsaW5rKTtcblxuXHRcdFx0aWYgKCR1bC5sZW5ndGgpIHtcblx0XHRcdFx0JHVsLmFwcGVuZCgkbGlua1dyYXBwZXIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2VsZi5hcHBlbmQoJGxpbmtXcmFwcGVyKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3NlbGVjdFBhZ2U6IGZ1bmN0aW9uKHBhZ2VJbmRleCwgZXZlbnQpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmN1cnJlbnRQYWdlID0gcGFnZUluZGV4O1xuXHRcdFx0aWYgKG8uc2VsZWN0T25DbGljaykge1xuXHRcdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gby5vblBhZ2VDbGljayhwYWdlSW5kZXggKyAxLCBldmVudCk7XG5cdFx0fSxcblxuXG5cdFx0X2VsbGlwc2VDbGljazogZnVuY3Rpb24oJHBhbmVsKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKSxcblx0XHRcdFx0JGVsbGlwID0gJHBhbmVsLmZpbmQoJy5lbGxpcHNlJyk7XG5cdFx0XHQkZWxsaXAuYWRkQ2xhc3MoJ2NsaWNrYWJsZScpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0JGVsbGlwLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGlmICghby5kaXNhYmxlKSB7XG5cdFx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcblx0XHRcdFx0XHRcdHZhbCA9IChwYXJzZUludCgkdGhpcy5wYXJlbnQoKS5wcmV2KCkudGV4dCgpLCAxMCkgfHwgMCkgKyAxO1xuXHRcdFx0XHRcdCR0aGlzXG5cdFx0XHRcdFx0XHQuaHRtbCgnPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIxXCIgbWF4PVwiJyArIG8ucGFnZXMgKyAnXCIgc3RlcD1cIjFcIiB2YWx1ZT1cIicgKyB2YWwgKyAnXCI+Jylcblx0XHRcdFx0XHRcdC5maW5kKCdpbnB1dCcpXG5cdFx0XHRcdFx0XHQuZm9jdXMoKVxuXHRcdFx0XHRcdFx0LmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdC8vIHByZXZlbnQgaW5wdXQgbnVtYmVyIGFycm93cyBmcm9tIGJ1YmJsaW5nIGEgY2xpY2sgZXZlbnQgb24gJGVsbGlwXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5rZXl1cChmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50LndoaWNoID09PSAxMyAmJiB2YWwgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gZW50ZXIgdG8gYWNjZXB0XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCh2YWw+MCkmJih2YWw8PW8ucGFnZXMpKVxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbChzZWxmLCB2YWwgLSAxKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChldmVudC53aGljaCA9PT0gMjcpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBlc2NhcGUgdG8gY2FuY2VsXG5cdFx0XHRcdFx0XHRcdFx0JGVsbGlwLmVtcHR5KCkuaHRtbChvLmVsbGlwc2VUZXh0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5iaW5kKCdibHVyJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cdFx0XHRcdFx0XHRcdGlmICh2YWwgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHNlbGYsIHZhbCAtIDEpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCRlbGxpcC5lbXB0eSgpLmh0bWwoby5lbGxpcHNlVGV4dCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9O1xuXG5cdCQuZm4ucGFnaW5hdGlvbiA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuXG5cdFx0Ly8gTWV0aG9kIGNhbGxpbmcgbG9naWNcblx0XHRpZiAobWV0aG9kc1ttZXRob2RdICYmIG1ldGhvZC5jaGFyQXQoMCkgIT0gJ18nKSB7XG5cdFx0XHRyZXR1cm4gbWV0aG9kc1ttZXRob2RdLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ29iamVjdCcgfHwgIW1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIG1ldGhvZHMuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkLmVycm9yKCdNZXRob2QgJyArICBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5wYWdpbmF0aW9uJyk7XG5cdFx0fVxuXG5cdH07XG5cbn0pKGpRdWVyeSk7IiwiLypcbiAgICBBIHNpbXBsZSBqUXVlcnkgbW9kYWwgKGh0dHA6Ly9naXRodWIuY29tL2t5bGVmb3gvanF1ZXJ5LW1vZGFsKVxuICAgIFZlcnNpb24gMC45LjJcbiovXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAvLyBNYWtpbmcgeW91ciBqUXVlcnkgcGx1Z2luIHdvcmsgYmV0dGVyIHdpdGggbnBtIHRvb2xzXG4gIC8vIGh0dHA6Ly9ibG9nLm5wbWpzLm9yZy9wb3N0LzExMjcxMjE2OTgzMC9tYWtpbmcteW91ci1qcXVlcnktcGx1Z2luLXdvcmstYmV0dGVyLXdpdGgtbnBtXG4gIGlmKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCB3aW5kb3csIGRvY3VtZW50KTtcbiAgfVxuICBlbHNlIHtcbiAgICBmYWN0b3J5KGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCk7XG4gIH1cbn0oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG5cbiAgdmFyIG1vZGFscyA9IFtdLFxuICAgICAgZ2V0Q3VycmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbW9kYWxzLmxlbmd0aCA/IG1vZGFsc1ttb2RhbHMubGVuZ3RoIC0gMV0gOiBudWxsO1xuICAgICAgfSxcbiAgICAgIHNlbGVjdEN1cnJlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBzZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGk9bW9kYWxzLmxlbmd0aC0xOyBpPj0wOyBpLS0pIHtcbiAgICAgICAgICBpZiAobW9kYWxzW2ldLiRibG9ja2VyKSB7XG4gICAgICAgICAgICBtb2RhbHNbaV0uJGJsb2NrZXIudG9nZ2xlQ2xhc3MoJ2N1cnJlbnQnLCFzZWxlY3RlZCkudG9nZ2xlQ2xhc3MoJ2JlaGluZCcsc2VsZWN0ZWQpO1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAkLnlzcF9tb2RhbCA9IGZ1bmN0aW9uKGVsLCBvcHRpb25zKSB7XG4gICAgdmFyIHJlbW92ZSwgdGFyZ2V0O1xuICAgIHRoaXMuJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sICQueXNwX21vZGFsLmRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICB0aGlzLm9wdGlvbnMuZG9GYWRlID0gIWlzTmFOKHBhcnNlSW50KHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24sIDEwKSk7XG4gICAgdGhpcy4kYmxvY2tlciA9IG51bGw7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZUV4aXN0aW5nKVxuICAgICAgd2hpbGUgKCQueXNwX21vZGFsLmlzQWN0aXZlKCkpXG4gICAgICAgICQueXNwX21vZGFsLmNsb3NlKCk7IC8vIENsb3NlIGFueSBvcGVuIG1vZGFscy5cbiAgICBtb2RhbHMucHVzaCh0aGlzKTtcbiAgICBpZiAoZWwuaXMoJ2EnKSkge1xuICAgICAgdGFyZ2V0ID0gZWwuYXR0cignaHJlZicpO1xuICAgICAgdGhpcy5hbmNob3IgPSBlbDtcbiAgICAgIC8vU2VsZWN0IGVsZW1lbnQgYnkgaWQgZnJvbSBocmVmXG4gICAgICBpZiAoL14jLy50ZXN0KHRhcmdldCkpIHtcbiAgICAgICAgdGhpcy4kZWxtID0gJCh0YXJnZXQpO1xuICAgICAgICBpZiAodGhpcy4kZWxtLmxlbmd0aCAhPT0gMSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuJGVsbSk7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgLy9BSkFYXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRlbG0gPSAkKCc8ZGl2PicpO1xuICAgICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLiRlbG0pO1xuICAgICAgICByZW1vdmUgPSBmdW5jdGlvbihldmVudCwgbW9kYWwpIHsgbW9kYWwuZWxtLnJlbW92ZSgpOyB9O1xuICAgICAgICB0aGlzLnNob3dTcGlubmVyKCk7XG4gICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9TRU5EKTtcbiAgICAgICAgJC5nZXQodGFyZ2V0KS5kb25lKGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICBpZiAoISQueXNwX21vZGFsLmlzQWN0aXZlKCkpIHJldHVybjtcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfU1VDQ0VTUyk7XG4gICAgICAgICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgICAgICAgY3VycmVudC4kZWxtLmVtcHR5KCkuYXBwZW5kKGh0bWwpLm9uKCQueXNwX21vZGFsLkNMT1NFLCByZW1vdmUpO1xuICAgICAgICAgIGN1cnJlbnQuaGlkZVNwaW5uZXIoKTtcbiAgICAgICAgICBjdXJyZW50Lm9wZW4oKTtcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfQ09NUExFVEUpO1xuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9GQUlMKTtcbiAgICAgICAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcbiAgICAgICAgICBjdXJyZW50LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgbW9kYWxzLnBvcCgpOyAvLyByZW1vdmUgZXhwZWN0ZWQgbW9kYWwgZnJvbSB0aGUgbGlzdFxuICAgICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9DT01QTEVURSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbG0gPSBlbDtcbiAgICAgIHRoaXMuYW5jaG9yID0gZWw7XG4gICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLiRlbG0pO1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICB9O1xuXG4gICQueXNwX21vZGFsLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogJC55c3BfbW9kYWwsXG5cbiAgICBvcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBtID0gdGhpcztcbiAgICAgIHRoaXMuYmxvY2soKTtcbiAgICAgIHRoaXMuYW5jaG9yLmJsdXIoKTtcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBtLnNob3coKTtcbiAgICAgICAgfSwgdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiAqIHRoaXMub3B0aW9ucy5mYWRlRGVsYXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICB9XG4gICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleWRvd24ubW9kYWwnKS5vbigna2V5ZG93bi5tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDI3ICYmIGN1cnJlbnQub3B0aW9ucy5lc2NhcGVDbG9zZSkgY3VycmVudC5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNsaWNrQ2xvc2UpXG4gICAgICAgIHRoaXMuJGJsb2NrZXIuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gdGhpcylcbiAgICAgICAgICAgICQueXNwX21vZGFsLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICBtb2RhbHMucG9wKCk7XG4gICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgaWYgKCEkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKVxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleWRvd24ubW9kYWwnKTtcbiAgICB9LFxuXG4gICAgYmxvY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkVGT1JFX0JMT0NLLCBbdGhpcy5fY3R4KCldKTtcbiAgICAgIHRoaXMuJGJvZHkuY3NzKCdvdmVyZmxvdycsJ2hpZGRlbicpO1xuICAgICAgdGhpcy4kYmxvY2tlciA9ICQoJzxkaXYgY2xhc3M9XCInICsgdGhpcy5vcHRpb25zLmJsb2NrZXJDbGFzcyArICcgYmxvY2tlciBjdXJyZW50XCI+PC9kaXY+JykuYXBwZW5kVG8odGhpcy4kYm9keSk7XG4gICAgICBzZWxlY3RDdXJyZW50KCk7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuZG9GYWRlKSB7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIuY3NzKCdvcGFjaXR5JywwKS5hbmltYXRlKHtvcGFjaXR5OiAxfSwgdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbik7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5CTE9DSywgW3RoaXMuX2N0eCgpXSk7XG4gICAgfSxcblxuICAgIHVuYmxvY2s6IGZ1bmN0aW9uKG5vdykge1xuICAgICAgaWYgKCFub3cgJiYgdGhpcy5vcHRpb25zLmRvRmFkZSlcbiAgICAgICAgdGhpcy4kYmxvY2tlci5mYWRlT3V0KHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24sIHRoaXMudW5ibG9jay5iaW5kKHRoaXMsdHJ1ZSkpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIuY2hpbGRyZW4oKS5hcHBlbmRUbyh0aGlzLiRib2R5KTtcbiAgICAgICAgdGhpcy4kYmxvY2tlci5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy4kYmxvY2tlciA9IG51bGw7XG4gICAgICAgIHNlbGVjdEN1cnJlbnQoKTtcbiAgICAgICAgaWYgKCEkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKVxuICAgICAgICAgIHRoaXMuJGJvZHkuY3NzKCdvdmVyZmxvdycsJycpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkJFRk9SRV9PUEVOLCBbdGhpcy5fY3R4KCldKTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2hvd0Nsb3NlKSB7XG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24gPSAkKCc8YSBocmVmPVwiI2Nsb3NlLW1vZGFsXCIgcmVsPVwibW9kYWw6Y2xvc2VcIiBjbGFzcz1cImNsb3NlLW1vZGFsICcgKyB0aGlzLm9wdGlvbnMuY2xvc2VDbGFzcyArICdcIj4nICsgdGhpcy5vcHRpb25zLmNsb3NlVGV4dCArICc8L2E+Jyk7XG4gICAgICAgIHRoaXMuJGVsbS5hcHBlbmQodGhpcy5jbG9zZUJ1dHRvbik7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbG0uYWRkQ2xhc3ModGhpcy5vcHRpb25zLm1vZGFsQ2xhc3MpLmFwcGVuZFRvKHRoaXMuJGJsb2NrZXIpO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmRvRmFkZSkge1xuICAgICAgICB0aGlzLiRlbG0uY3NzKHtvcGFjaXR5OiAwLCBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ30pLmFuaW1hdGUoe29wYWNpdHk6IDF9LCB0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsbS5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5PUEVOLCBbdGhpcy5fY3R4KCldKTtcbiAgICB9LFxuXG4gICAgaGlkZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5CRUZPUkVfQ0xPU0UsIFt0aGlzLl9jdHgoKV0pO1xuICAgICAgaWYgKHRoaXMuY2xvc2VCdXR0b24pIHRoaXMuY2xvc2VCdXR0b24ucmVtb3ZlKCk7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmRvRmFkZSkge1xuICAgICAgICB0aGlzLiRlbG0uZmFkZU91dCh0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkFGVEVSX0NMT1NFLCBbX3RoaXMuX2N0eCgpXSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZWxtLmhpZGUoMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5BRlRFUl9DTE9TRSwgW190aGlzLl9jdHgoKV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkNMT1NFLCBbdGhpcy5fY3R4KCldKTtcbiAgICB9LFxuXG4gICAgc2hvd1NwaW5uZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuc2hvd1NwaW5uZXIpIHJldHVybjtcbiAgICAgIHRoaXMuc3Bpbm5lciA9IHRoaXMuc3Bpbm5lciB8fCAkKCc8ZGl2IGNsYXNzPVwiJyArIHRoaXMub3B0aW9ucy5tb2RhbENsYXNzICsgJy1zcGlubmVyXCI+PC9kaXY+JylcbiAgICAgICAgLmFwcGVuZCh0aGlzLm9wdGlvbnMuc3Bpbm5lckh0bWwpO1xuICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy5zcGlubmVyKTtcbiAgICAgIHRoaXMuc3Bpbm5lci5zaG93KCk7XG4gICAgfSxcblxuICAgIGhpZGVTcGlubmVyOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnNwaW5uZXIpIHRoaXMuc3Bpbm5lci5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgLy9SZXR1cm4gY29udGV4dCBmb3IgY3VzdG9tIGV2ZW50c1xuICAgIF9jdHg6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHsgZWxtOiB0aGlzLiRlbG0sICRlbG06IHRoaXMuJGVsbSwgJGJsb2NrZXI6IHRoaXMuJGJsb2NrZXIsIG9wdGlvbnM6IHRoaXMub3B0aW9ucywgJGFuY2hvcjogdGhpcy5hbmNob3IgfTtcbiAgICB9XG4gIH07XG5cbiAgJC55c3BfbW9kYWwuY2xvc2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSkgcmV0dXJuO1xuICAgIGlmIChldmVudCkgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcbiAgICBjdXJyZW50LmNsb3NlKCk7XG4gICAgcmV0dXJuIGN1cnJlbnQuJGVsbTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGlmIHRoZXJlIGN1cnJlbnRseSBpcyBhbiBhY3RpdmUgbW9kYWxcbiAgJC55c3BfbW9kYWwuaXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG1vZGFscy5sZW5ndGggPiAwO1xuICB9O1xuXG4gICQueXNwX21vZGFsLmdldEN1cnJlbnQgPSBnZXRDdXJyZW50O1xuXG4gICQueXNwX21vZGFsLmRlZmF1bHRzID0ge1xuICAgIGNsb3NlRXhpc3Rpbmc6IHRydWUsXG4gICAgZXNjYXBlQ2xvc2U6IHRydWUsXG4gICAgY2xpY2tDbG9zZTogdHJ1ZSxcbiAgICBjbG9zZVRleHQ6ICdDbG9zZScsXG4gICAgY2xvc2VDbGFzczogJycsXG4gICAgbW9kYWxDbGFzczogXCJ5c3AtbW9kYWxcIixcbiAgICBibG9ja2VyQ2xhc3M6IFwianF1ZXJ5LW1vZGFsXCIsXG4gICAgc3Bpbm5lckh0bWw6ICc8ZGl2IGNsYXNzPVwicmVjdDFcIj48L2Rpdj48ZGl2IGNsYXNzPVwicmVjdDJcIj48L2Rpdj48ZGl2IGNsYXNzPVwicmVjdDNcIj48L2Rpdj48ZGl2IGNsYXNzPVwicmVjdDRcIj48L2Rpdj4nLFxuICAgIHNob3dTcGlubmVyOiB0cnVlLFxuICAgIHNob3dDbG9zZTogdHJ1ZSxcbiAgICBmYWRlRHVyYXRpb246IG51bGwsICAgLy8gTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGUgZmFkZSBhbmltYXRpb24gdGFrZXMuXG4gICAgZmFkZURlbGF5OiAxLjAgICAgICAgIC8vIFBvaW50IGR1cmluZyB0aGUgb3ZlcmxheSdzIGZhZGUtaW4gdGhhdCB0aGUgbW9kYWwgYmVnaW5zIHRvIGZhZGUgaW4gKC41ID0gNTAlLCAxLjUgPSAxNTAlLCBldGMuKVxuICB9O1xuXG4gIC8vIEV2ZW50IGNvbnN0YW50c1xuICAkLnlzcF9tb2RhbC5CRUZPUkVfQkxPQ0sgPSAnbW9kYWw6YmVmb3JlLWJsb2NrJztcbiAgJC55c3BfbW9kYWwuQkxPQ0sgPSAnbW9kYWw6YmxvY2snO1xuICAkLnlzcF9tb2RhbC5CRUZPUkVfT1BFTiA9ICdtb2RhbDpiZWZvcmUtb3Blbic7XG4gICQueXNwX21vZGFsLk9QRU4gPSAnbW9kYWw6b3Blbic7XG4gICQueXNwX21vZGFsLkJFRk9SRV9DTE9TRSA9ICdtb2RhbDpiZWZvcmUtY2xvc2UnO1xuICAkLnlzcF9tb2RhbC5DTE9TRSA9ICdtb2RhbDpjbG9zZSc7XG4gICQueXNwX21vZGFsLkFGVEVSX0NMT1NFID0gJ21vZGFsOmFmdGVyLWNsb3NlJztcbiAgJC55c3BfbW9kYWwuQUpBWF9TRU5EID0gJ21vZGFsOmFqYXg6c2VuZCc7XG4gICQueXNwX21vZGFsLkFKQVhfU1VDQ0VTUyA9ICdtb2RhbDphamF4OnN1Y2Nlc3MnO1xuICAkLnlzcF9tb2RhbC5BSkFYX0ZBSUwgPSAnbW9kYWw6YWpheDpmYWlsJztcbiAgJC55c3BfbW9kYWwuQUpBWF9DT01QTEVURSA9ICdtb2RhbDphamF4OmNvbXBsZXRlJztcblxuICAkLmZuLnlzcF9tb2RhbCA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgbmV3ICQueXNwX21vZGFsKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBBdXRvbWF0aWNhbGx5IGJpbmQgbGlua3Mgd2l0aCByZWw9XCJtb2RhbDpjbG9zZVwiIHRvLCB3ZWxsLCBjbG9zZSB0aGUgbW9kYWwuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5tb2RhbCcsICdhW3JlbH49XCJtb2RhbDpjbG9zZVwiXScsICQueXNwX21vZGFsLmNsb3NlKTtcbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLm1vZGFsJywgJ2FbcmVsfj1cIm1vZGFsOm9wZW5cIl0nLCBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCh0aGlzKS5tb2RhbCgpO1xuICB9KTtcbn0pKTsiLCJqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICBcbiAgalF1ZXJ5KCdbZGF0YS1tb2RhbF0nKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCdmdWNrIG1lICcpO1xuXG4gICAgdmFyIGRhdGFfbW9kYWwgPSBqUXVlcnkodGhpcykuZGF0YSgnbW9kYWwnKTtcblxuICAgIGpRdWVyeSggZGF0YV9tb2RhbCApLnlzcF9tb2RhbCh7XG4gICAgXHRjbG9zZVRleHQ6ICdYJyxcbiAgICAgIG1vZGFsQ2xhc3M6ICd5c3AtbW9kYWwtb3BlbicsXG4gICAgICBjbG9zZUNsYXNzOiAneXNwLW1vZGVsLWNsb3NlJ1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBjb3B5TGluaygpIHtcblxuICB2YXIgY29weVRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvcHlMaW5rSW5wdXRcIik7XG5cbiAgY29weVRleHQuc2VsZWN0KCk7XG4gIGNvcHlUZXh0LnNldFNlbGVjdGlvblJhbmdlKDAsIDk5OTk5KTtcblxuICBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XG5cbiAgYWxlcnQoXCJDb3BpZWQgdGhlIGxpbms6IFwiICsgY29weVRleHQudmFsdWUpO1xufSIsIk9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdHJpbmcucHJvdG90eXBlLCAnZWFjaFdvcmRDYXBpdGFsaXplJywge1xuICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9Mb3dlckNhc2UoKVxuICAgIC5zcGxpdCgnICcpXG4gICAgLm1hcCgocykgPT4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc3Vic3RyaW5nKDEpKVxuICAgIC5qb2luKCcgJyk7XG4gIH0sXG4gIGVudW1lcmFibGU6IGZhbHNlXG59KTtcblxuZnVuY3Rpb24gcmFpeXNfZ2V0X2Zvcm1fZGF0YShmb3JtX2VsZSkge1xuICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSggZm9ybV9lbGUgKTtcblxuICAgIGxldCBmZD1PYmplY3QuZnJvbUVudHJpZXMoZm9ybURhdGEuZW50cmllcygpKTtcblxuICAgIGZvciAoY29uc3QgW2ZJbmRleCwgZmllbGRdIG9mIE9iamVjdC5lbnRyaWVzKGZkKSkge1xuXG4gICAgICAgIGxldCBWYWxBcnJheSA9IGZvcm1EYXRhLmdldEFsbChmSW5kZXgpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgVmFsQXJyYXlbMV0gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGZkWyBmSW5kZXggXSA9IFZhbEFycmF5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZkWyBmSW5kZXggXSA9PSAnJykge1xuICAgICAgICAgICAgZGVsZXRlIGZkW2ZJbmRleF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmQ7XG59XG5cbmZ1bmN0aW9uIHJhaXlzX3NldF9mb3JtX3RvX2RhdGEoaW5wdXREYXRhKSB7XG5cbiAgICBsZXQgZm9ybUE9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpO1xuICAgIGxldCBmb3JtQj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybScpO1xuXG4gICAgZm9ybUEucmVzZXQoKTtcbiAgICBmb3JtQi5yZXNldCgpO1xuXG4gICAgbGV0IGZvcm1JbnB1dHM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AteWFjaHQtc2VhcmNoLWZvcm1cIl0sICN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm1cIl0nKTtcblxuICAgIGZvcm1JbnB1dHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgIGxldCBpbnB1dCA9IGVsZTtcblxuICAgICAgICBsZXQgbmFtZSA9IGVsZS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICBsZXQgaGFzUHJldHR5ID0gaW5wdXREYXRhWyBuYW1lIF07XG5cbiAgICAgICAvLyBjb25zb2xlLmxvZyhoYXNQcmV0dHkpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgaGFzUHJldHR5ICE9ICdudWxsJyAmJiB0eXBlb2YgaGFzUHJldHR5ICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGhhc1ByZXR0eSkpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgICAgICAgICBoYXNQcmV0dHkuZm9yRWFjaCgoaFApID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoUCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaGFzUHJldHR5ICkge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUgIT0gJ2NoZWNrYm94JyAmJiBpbnB1dC50eXBlICE9ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBoYXNQcmV0dHk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByYWl5c19wdXNoX2hpc3RvcnkoIGRhdGEgPSB7fSApIHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgIGxldCBzdHJwYXRoPScnO1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGxldCBpdCA9IGRhdGFbIHByb3BlcnR5IF07XG5cblxuICAgICAgICBpZiAoaXQgIT0gJycgJiYgdHlwZW9mIGl0ICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBpdCA9PSAnc3RyaW5nJyAmJiBwcm9wZXJ0eSAhPSAnT25GaXJzdExvYWQnICYmIHR5cGVvZiBpdCAhPSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChwcm9wZXJ0eSwgaXQpO1xuXG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgrXCJcIitwcm9wZXJ0eSsnLScrKGl0LnRvU3RyaW5nKCkuc3BsaXQoJyAnKS5qb2luKCctJykpKycvJztcbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXQpKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KHByb3BlcnR5LCBpdCk7XG5cbiAgICAgICAgICAgIGl0ID0gaXQubWFwKChwcm9wKSA9PiB7IHJldHVybiBwcm9wLnRvU3RyaW5nKCkuc3BsaXQoJyAnKS5qb2luKCctJyk7IH0pO1xuXG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgrXCJcIitwcm9wZXJ0eSsnLScrKCBpdC5qb2luKFwiK1wiKSApKycvJztcbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aC50b0xvd2VyQ2FzZSgpOyAgXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy9oaXN0b3J5LnB1c2hTdGF0ZShkYXRhLCAnJywgcmFpX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3VybCsnPycrc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCkpO1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKGRhdGEsICcnLCByYWlfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfdXJsK3N0cnBhdGgpO1xuXG4gICAgcmV0dXJuIHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF91cmwrc3RycGF0aDsgICAgXG59XG5cbiIsInZhciByYWlfeXNwX2FwaT17fTtcblxuICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpPWZ1bmN0aW9uKG1ldGhvZCwgcGF0aCwgcGFzc2luZ19kYXRhKSB7XG4gICAgICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZURhdGEgPSBKU09OLnBhcnNlKCB0aGlzLnJlc3BvbnNlVGV4dCApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VEYXRhKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnR0VUJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFzc2luZ19kYXRhLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHBhc3NpbmdfZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQocHJvcGVydHksIHBhc3NpbmdfZGF0YVsgcHJvcGVydHkgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBfcXVlc3Rpb25NYXJrPXNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgcmFpX3lhY2h0X3N5bmMud3BfcmVzdF91cmwrXCJyYWl5cy9cIisgcGF0aCArICgoX3F1ZXN0aW9uTWFyayAhPSAnJyk/Jz8nK3NlYXJjaFBhcmFtcy50b1N0cmluZygpOicnKSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2VuZCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnUE9TVCc6XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAub3BlbihcIlBPU1RcIiwgcmFpX3lhY2h0X3N5bmMud3BfcmVzdF91cmwrXCJyYWl5cy9cIisgcGF0aCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KHBhc3NpbmdfZGF0YSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfTsiLCJ2YXIgeXNwX3RlbXBsYXRlcz17fTtcblx0eXNwX3RlbXBsYXRlcy55YWNodD17fTtcblx0XG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQuZ3JpZD1mdW5jdGlvbih2ZXNzZWwsIHBhcmFtcykge1xuXHRcdGxldCBtZXRlcnMgPSBwYXJzZUludCh2ZXNzZWwuTm9taW5hbExlbmd0aCkgKiAwLjMwNDg7XG5cblx0XHRsZXQgcHJpY2UgPSAnJztcblx0XHRsZXQgbGVuZ3RoID0gJyc7XG5cblx0XHRpZiAocmFpX3lhY2h0X3N5bmMuZXVyb3BlX29wdGlvbl9waWNrZWQgPT0gXCJ5ZXNcIikge1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblx0XHRcdHByaWNlID0gKHR5cGVvZiB2ZXNzZWwuWVNQX0V1cm9WYWwgIT0gJ3VuZGVmaW5lZCcgJiYgdmVzc2VsLllTUF9FdXJvVmFsID4gMCkgPyBg4oKsJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQodmVzc2VsLllTUF9FdXJvVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0fSBcblx0XHRlbHNlIHtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gdmVzc2VsLk5vbWluYWxMZW5ndGggKyBcIiAvIFwiICsgbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cblx0XHRcdGlmIChwYXJhbXMuY3VycmVuY3kgPT0gJ0V1cicpIHtcblx0XHRcdFx0cHJpY2UgPSAodHlwZW9mIHZlc3NlbC5ZU1BfVVNEVmFsICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5ZU1BfVVNEVmFsID4gMCkgPyBg4oKsJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQodmVzc2VsLllTUF9FdXJvVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cHJpY2UgPSAodHlwZW9mIHZlc3NlbC5ZU1BfVVNEVmFsICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5ZU1BfVVNEVmFsID4gMCkgPyBgJCR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHZlc3NlbC5ZU1BfVVNEVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gYFxuXHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXJlc3VsdC1ncmlkLWl0ZW1cIiBkYXRhLXBvc3QtaWQ9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCIgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2UtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGEgY2xhc3M9XCJ5YWNodC1kZXRhaWxzXCIgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZVwiIHNyYz1cIiR7dmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogcmFpX3lhY2h0X3N5bmMuYXNzZXRzX3VybCArICdpbWFnZXMvZGVmYXVsdC15YWNodC1pbWFnZS5qcGVnJ31cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblx0XHRcdFx0XHRcdDxzdmcgY2xhc3M9XCJsaWtlLW1lIGxvdmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCI1N1wiIGhlaWdodD1cIjU0XCIgdmlld0JveD1cIjAgMCA1NyA1NFwiIGZpbGw9XCJub25lXCIgIGRhdGEteWFjaHQtaWQ9XCIkeyB2ZXNzZWwuRG9jdW1lbnRJRCB9XCI+XG5cdFx0XHRcdFx0XHQgIDxnIGZpbHRlcj1cInVybCgjZmlsdGVyMF9kXzI4ODhfNDMzMylcIj5cblx0XHRcdFx0XHRcdCAgICA8cGF0aCBkPVwiTTM0LjcwMjggMTEuNTc1NUMzNi4yMDk0IDExLjU3NTUgMzcuNjI1MSAxMi4xNjk5IDM4LjY4OTggMTMuMjQ4OEwzOC44MjIzIDEzLjM4M0M0MS4wMjA2IDE1LjYxMTYgNDEuMDIwNiAxOS4yMzc1IDM4LjgyMjMgMjEuNDY2TDM4LjA5OTIgMjIuMTk5TDI3LjQ5OTUgMzIuOTQ0MkwxOC40ODgzIDIzLjgwOEwxNi45MDExIDIyLjE5OUwxNi4xNzggMjEuNDY2QzEzLjk3OTcgMTkuMjM3NSAxMy45Nzk3IDE1LjYxMTYgMTYuMTc4IDEzLjM4M0wxNi4zMDgzIDEzLjI1MDlDMTcuMzczOSAxMi4xNzA4IDE4Ljc5IDExLjU3NTkgMjAuMjk2MiAxMS41NzY0QzIxLjgwMjMgMTEuNTc2NCAyMy4yMTc2IDEyLjE3MDggMjQuMjgxOSAxMy4yNDkyTDI1LjAwNSAxMy45ODIyTDI3LjQ5OTEgMTYuNTEwMUwyOS45OTI4IDEzLjk4MThMMzAuNzE1OCAxMy4yNDg4QzMxLjc4MDEgMTIuMTY5OSAzMy4xOTYyIDExLjU3NTUgMzQuNzAyOCAxMS41NzU1Wk0zNC43MDI4IDhDMzIuMzU3IDggMzAuMDExMiA4LjkwNjggMjguMjIyMiAxMC43MjA0TDI3LjQ5OTEgMTEuNDUzNEwyNi43NzYgMTAuNzIwNEMyNC45ODc4IDguOTA3MjMgMjIuNjQyIDguMDAwNDMgMjAuMjk3IDhDMTcuOTUwOCA4IDE1LjYwNSA4LjkwNzIzIDEzLjgxNDcgMTAuNzIyMUwxMy42ODQ0IDEwLjg1NDJDMTAuMTA0NiAxNC40ODMyIDEwLjEwNDYgMjAuMzY0NSAxMy42ODQ0IDIzLjk5MzVMMTQuNDA3NCAyNC43MjY1TDE1Ljk5NDYgMjYuMzM1NEwyNy40OTk1IDM4TDQwLjU5MzMgMjQuNzI2NUw0MS4zMTY0IDIzLjk5MzVDNDQuODk0NSAyMC4zNjYzIDQ0Ljg5NDUgMTQuNDgxNCA0MS4zMTY0IDEwLjg1NDJMNDEuMTgzOSAxMC43MkMzOS4zOTQ1IDguOTA2OCAzNy4wNDg2IDggMzQuNzAyOCA4WlwiIGZpbGw9XCJ3aGl0ZVwiPjwvcGF0aD5cblx0XHRcdFx0XHRcdCAgPC9nPlxuXHRcdFx0XHRcdFx0ICA8ZGVmcz5cblx0XHRcdFx0XHRcdCAgICA8ZmlsdGVyIGlkPVwiZmlsdGVyMF9kXzI4ODhfNDMzM1wiIHg9XCItMC4wMDA0ODgyODFcIiB5PVwiMFwiIHdpZHRoPVwiNTcuMDAwNVwiIGhlaWdodD1cIjU0XCIgZmlsdGVyVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz1cInNSR0JcIj5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUZsb29kIGZsb29kLW9wYWNpdHk9XCIwXCIgcmVzdWx0PVwiQmFja2dyb3VuZEltYWdlRml4XCI+PC9mZUZsb29kPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQ29sb3JNYXRyaXggaW49XCJTb3VyY2VBbHBoYVwiIHR5cGU9XCJtYXRyaXhcIiB2YWx1ZXM9XCIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMFwiIHJlc3VsdD1cImhhcmRBbHBoYVwiPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZU9mZnNldCBkeD1cIjFcIiBkeT1cIjRcIj48L2ZlT2Zmc2V0PlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj1cIjZcIj48L2ZlR2F1c3NpYW5CbHVyPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQ29tcG9zaXRlIGluMj1cImhhcmRBbHBoYVwiIG9wZXJhdG9yPVwib3V0XCI+PC9mZUNvbXBvc2l0ZT5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9XCJtYXRyaXhcIiB2YWx1ZXM9XCIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI1IDBcIj48L2ZlQ29sb3JNYXRyaXg+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVCbGVuZCBtb2RlPVwibm9ybWFsXCIgaW4yPVwiQmFja2dyb3VuZEltYWdlRml4XCIgcmVzdWx0PVwiZWZmZWN0MV9kcm9wU2hhZG93XzI4ODhfNDMzM1wiPjwvZmVCbGVuZD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUJsZW5kIG1vZGU9XCJub3JtYWxcIiBpbj1cIlNvdXJjZUdyYXBoaWNcIiBpbjI9XCJlZmZlY3QxX2Ryb3BTaGFkb3dfMjg4OF80MzMzXCIgcmVzdWx0PVwic2hhcGVcIj48L2ZlQmxlbmQ+XG5cdFx0XHRcdFx0XHQgICAgPC9maWx0ZXI+XG5cdFx0XHRcdFx0XHQgIDwvZGVmcz5cblx0XHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHRcdFx0JHt2ZXNzZWwuQ29tcGFueU5hbWUgPT09IHJhaV95YWNodF9zeW5jLmNvbXBhbnlfbmFtZSA/IGA8ZGl2IGNsYXNzPVwiY29tcGFueS1iYW5uZXJcIj48aW1nIHNyYz1cIiR7cmFpX3lhY2h0X3N5bmMuY29tcGFueV9sb2dvfVwiPjwvZGl2PmAgOiAnJ31cblx0XHRcdFx0XHQ8L2E+XHRcblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1nZW5lcmFsLWluZm8tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXRpdGxlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGEgY2xhc3M9XCJ5YWNodC1kZXRhaWxzXCIgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHRcdDxoNiBjbGFzcz1cInlhY2h0LXRpdGxlXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICcnfSAke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnJ30gJHt2ZXNzZWwuTW9kZWwgPyB2ZXNzZWwuTW9kZWwgOiAnJ30gJHt2ZXNzZWwuQm9hdE5hbWUgPyB2ZXNzZWwuQm9hdE5hbWUgOiAnJ308L2g2PlxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmZvLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZm9cIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+WWVhcjwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+Q2FiaW5zPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLkNhYmluc0NvdW50TnVtZXJpYyA/IHZlc3NlbC5DYWJpbnNDb3VudE51bWVyaWMgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5CdWlsZGVyPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkxlbmd0aDwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke2xlbmd0aH08L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5Db21wYXJlPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImNvbXBhcmVfdG9nZ2xlXCIgbmFtZT1cImNvbXBhcmVcIiB2YWx1ZT1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiAvPjwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcHJpY2UtZGV0YWlscy1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1wcmljZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1wcmljZVwiPiR7cHJpY2V9PC9wPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCJ5YWNodC1kb3dubG9hZC1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1tb2RhbD1cIiNzaW5nbGUtc2hhcmVcIj5Db250YWN0PC9idXR0b24+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YDtcblx0fTtcblxuXHR5c3BfdGVtcGxhdGVzLnlhY2h0Lmxpc3Q9ZnVuY3Rpb24odmVzc2VsKSB7XG5cdFx0bGV0IG1ldGVycyA9IHBhcnNlSW50KHZlc3NlbC5Ob21pbmFsTGVuZ3RoKSAqIDAuMzA0ODtcblx0XHRsZXQgcHJpY2UgPSAnJztcblxuXHRcdGlmICh0eXBlb2YgdmVzc2VsLlByaWNlID09ICdzdHJpbmcnKSB7XG5cdFx0XHRsZXQgcHJpY2UgPSB2ZXNzZWwuUHJpY2Uuc2xpY2UoMCwgLTMpO1xuXHRcdH1cblx0XHRcblx0XHRsZXQgbGVuZ3RoID0gJyc7XG5cdFx0XG5cdFx0aWYocmFpX3lhY2h0X3N5bmMuZXVyb3BlX29wdGlvbl9waWNrZWQgPT0gXCJ5ZXNcIil7XG5cdFx0XHRsZW5ndGggPSB2ZXNzZWwuTm9taW5hbExlbmd0aCA/IG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnO1xuXHRcdFx0cHJpY2UgPSB2ZXNzZWwuUHJpY2UgPyBg4oKsICR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KChwYXJzZUludCh2ZXNzZWwuUHJpY2Uuc2xpY2UoMCwgLTMpKSAqIHJhaV95YWNodF9zeW5jLmV1cm9fY19jKSl9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gdmVzc2VsLk5vbWluYWxMZW5ndGggKyBcIiAvIFwiICsgbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cdFx0XHRwcmljZSA9IHZlc3NlbC5QcmljZSA/IGAkICR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHBhcnNlSW50KHZlc3NlbC5QcmljZS5zbGljZSgwLCAtMykpKX1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJ1xuXHRcdH1cblxuXHRcdHJldHVybiBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcmVzdWx0LWdyaWQtaXRlbSBsaXN0LXZpZXdcIiBkYXRhLXBvc3QtaWQ9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1tYWluLWltYWdlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdDxhIGNsYXNzPVwieWFjaHQtZGV0YWlsc1wiIGhyZWY9XCIkeyB2ZXNzZWwuX2xpbmsgfVwiPlxuXHRcdFx0XHRcdFx0PGltZyBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2VcIiBzcmM9XCIke3Zlc3NlbC5JbWFnZXMgPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6IHZlc3NlbC5JbWFnZXMgPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6IHJhaV95YWNodF9zeW5jLmFzc2V0c191cmwgKyAnaW1hZ2VzL2RlZmF1bHQteWFjaHQtaW1hZ2UuanBlZyd9XCIgYWx0PVwieWFjaHQtaW1hZ2VcIiBsb2FkaW5nPVwibGF6eVwiIC8+XG5cdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWdlbmVyYWwtaW5mby1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtdGl0bGUtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzcz1cInlhY2h0LWRldGFpbHNcIiBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdFx0PGg2IGNsYXNzPVwieWFjaHQtdGl0bGVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJyd9ICR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICcnfSAke3Zlc3NlbC5Nb2RlbCA/IHZlc3NlbC5Nb2RlbCA6ICcnfSAke3Zlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICcnfTwvaDY+XG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZm8tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5ZZWFyPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5DYWJpbnM8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuQ2FiaW5zQ291bnROdW1lcmljID8gdmVzc2VsLkNhYmluc0NvdW50TnVtZXJpYyA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkJ1aWxkZXI8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+TGVuZ3RoPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7bGVuZ3RofTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcHJpY2UtZGV0YWlscy1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1wcmljZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1wcmljZVwiPiR7cHJpY2V9PC9wPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwieWFjaHQtZG93bmxvYWQtYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtbW9kYWw9XCIjc2luZ2xlLXNoYXJlXCI+Q29udGFjdDwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0XG5cdFx0YDtcblx0fTtcblxuXHR5c3BfdGVtcGxhdGVzLnlhY2h0LmNvbXBhcmVfcHJldmlldyA9IGZ1bmN0aW9uKHZlc3NlbCwgcGFyYW1zKSB7XG5cblx0XHRyZXR1cm4gYFxuXG5cdFx0XHQ8ZGl2IGNsYXNzPVwieXNwLXlhY2h0LWNvbXBhcmUtcHJldmlld1wiIGRhdGEtcG9zdC1pZD1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiBkYXRhLXlhY2h0LWlkPVwiJHsgdmVzc2VsLkRvY3VtZW50SUQgfVwiPlx0XHRcdFxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cInJlbW92ZS1mcm9tLWNvbXBhcmVcIj5cblx0XHRcdFx0XHQ8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHRcdFx0XHQ8cmVjdCB4PVwiMC41XCIgeT1cIjAuNVwiIHdpZHRoPVwiMjNcIiBoZWlnaHQ9XCIyM1wiIHJ4PVwiMTEuNVwiIHN0cm9rZT1cIiM2QjcwNzNcIi8+XG5cdFx0XHRcdFx0PHBhdGggZD1cIk04LjI2ODc2IDE0LjkzNDZDOC4wNDkwOSAxNS4xNTQzIDguMDQ5MDkgMTUuNTEwNCA4LjI2ODc2IDE1LjczMDFDOC40ODg0MyAxNS45NDk4IDguODQ0NTggMTUuOTQ5OCA5LjA2NDI1IDE1LjczMDFMOC4yNjg3NiAxNC45MzQ2Wk0xMi4zOTc2IDEyLjM5NjhDMTIuNjE3MyAxMi4xNzcxIDEyLjYxNzMgMTEuODIwOSAxMi4zOTc2IDExLjYwMTNDMTIuMTc3OSAxMS4zODE2IDExLjgyMTggMTEuMzgxNiAxMS42MDIxIDExLjYwMTNMMTIuMzk3NiAxMi4zOTY4Wk0xMS42MDE4IDExLjYwMTZDMTEuMzgyMSAxMS44MjEzIDExLjM4MjEgMTIuMTc3NCAxMS42MDE4IDEyLjM5NzFDMTEuODIxNCAxMi42MTY4IDEyLjE3NzYgMTIuNjE2OCAxMi4zOTczIDEyLjM5NzFMMTEuNjAxOCAxMS42MDE2Wk0xNS43MzA2IDkuMDYzNzZDMTUuOTUwMyA4Ljg0NDA5IDE1Ljk1MDMgOC40ODc5NCAxNS43MzA2IDguMjY4MjdDMTUuNTEwOSA4LjA0ODYgMTUuMTU0OCA4LjA0ODYgMTQuOTM1MSA4LjI2ODI3TDE1LjczMDYgOS4wNjM3NlpNMTIuMzk3MyAxMS42MDEzQzEyLjE3NzYgMTEuMzgxNiAxMS44MjE0IDExLjM4MTYgMTEuNjAxOCAxMS42MDEzQzExLjM4MjEgMTEuODIwOSAxMS4zODIxIDEyLjE3NzEgMTEuNjAxOCAxMi4zOTY4TDEyLjM5NzMgMTEuNjAxM1pNMTQuOTM1MSAxNS43MzAxQzE1LjE1NDggMTUuOTQ5OCAxNS41MTA5IDE1Ljk0OTggMTUuNzMwNiAxNS43MzAxQzE1Ljk1MDMgMTUuNTEwNCAxNS45NTAzIDE1LjE1NDMgMTUuNzMwNiAxNC45MzQ2TDE0LjkzNTEgMTUuNzMwMVpNMTEuNjAyMSAxMi4zOTcxQzExLjgyMTggMTIuNjE2OCAxMi4xNzc5IDEyLjYxNjggMTIuMzk3NiAxMi4zOTcxQzEyLjYxNzMgMTIuMTc3NCAxMi42MTczIDExLjgyMTMgMTIuMzk3NiAxMS42MDE2TDExLjYwMjEgMTIuMzk3MVpNOS4wNjQyNSA4LjI2ODI3QzguODQ0NTggOC4wNDg2IDguNDg4NDMgOC4wNDg2IDguMjY4NzYgOC4yNjgyN0M4LjA0OTA5IDguNDg3OTQgOC4wNDkwOSA4Ljg0NDA5IDguMjY4NzYgOS4wNjM3Nkw5LjA2NDI1IDguMjY4MjdaTTkuMDY0MjUgMTUuNzMwMUwxMi4zOTc2IDEyLjM5NjhMMTEuNjAyMSAxMS42MDEzTDguMjY4NzYgMTQuOTM0Nkw5LjA2NDI1IDE1LjczMDFaTTEyLjM5NzMgMTIuMzk3MUwxNS43MzA2IDkuMDYzNzZMMTQuOTM1MSA4LjI2ODI3TDExLjYwMTggMTEuNjAxNkwxMi4zOTczIDEyLjM5NzFaTTExLjYwMTggMTIuMzk2OEwxNC45MzUxIDE1LjczMDFMMTUuNzMwNiAxNC45MzQ2TDEyLjM5NzMgMTEuNjAxM0wxMS42MDE4IDEyLjM5NjhaTTEyLjM5NzYgMTEuNjAxNkw5LjA2NDI1IDguMjY4MjdMOC4yNjg3NiA5LjA2Mzc2TDExLjYwMjEgMTIuMzk3MUwxMi4zOTc2IDExLjYwMTZaXCIgZmlsbD1cIiM2QjcwNzNcIi8+XG5cdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdDwvc3Bhbj5cblxuXG5cdFx0XHRcdDxpbWcgY2xhc3M9XCJ5YWNodC1tYWluLWltYWdlXCIgc3JjPVwiJHt2ZXNzZWwuSW1hZ2VzID8gdmVzc2VsLkltYWdlc1swXS5VcmkgOiByYWlfeWFjaHRfc3luYy5hc3NldHNfdXJsICsgJ2ltYWdlcy9kZWZhdWx0LXlhY2h0LWltYWdlLmpwZWcnfVwiIGFsdD1cInlhY2h0LWltYWdlXCIgbG9hZGluZz1cImxhenlcIiAvPlxuXG5cdFx0XHRcdDxoNiBjbGFzcz1cInlhY2h0LXRpdGxlXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICcnfSAke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnJ30gJHt2ZXNzZWwuTW9kZWwgPyB2ZXNzZWwuTW9kZWwgOiAnJ30gJHt2ZXNzZWwuQm9hdE5hbWUgPyB2ZXNzZWwuQm9hdE5hbWUgOiAnJ308L2g2PlxuXG5cdFx0XHQ8L2Rpdj5cblxuXHRcdGA7XG5cblx0fTtcblxuXHR5c3BfdGVtcGxhdGVzLm5vUmVzdWx0cz1mdW5jdGlvbigpIHtcblxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8Yj5ObyBSZXN1bHRzPC9iPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG5cbiAgICB9O1xuXG5cbiAgICB5c3BfdGVtcGxhdGVzLnlhY2h0X3RhZyA9IGZ1bmN0aW9uKGxhYmVsLCB2YWx1ZSkge1xuXG4gICAgXHRyZXR1cm4gYFxuICAgIFx0XHQ8c3Bhbj5cblx0ICAgIFx0XHQke3ZhbHVlfVxuXG5cdCAgICBcdFx0PGltZyBzcmM9XCIke3JhaV95YWNodF9zeW5jLmFzc2V0c191cmx9L2ltYWdlcy9yZW1vdmUtdGFnLnBuZ1wiPlxuXHRcdFx0PC9zcGFuPlxuICAgIFx0YDtcbiAgICB9O1xuXG4gICAgeXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uID0ge307XG4gICAgXG4gICAgXHR5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24ubmV4dF90ZXh0ID0gYD5gO1xuXG4gICAgXHR5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24ucHJldl90ZXh0ID0gYDxgO1xuXG4iLCJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG5cdGxldCBlbGVfcXVpY2tfc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC1xdWljay1zZWFyY2gtZm9ybScpO1xuXG5cdGlmIChlbGVfcXVpY2tfc2VhcmNoKSB7XG5cdFx0Ly8gRmlsbCBvcHRpb25zXG5cdCAgICBsZXQgRmlsbE9wdGlvbnM9W107XG5cdCAgICBsZXQgc2VsZWN0b3JFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIueXNwLXF1aWNrLXNlYXJjaC1mb3JtIHNlbGVjdFtkYXRhLWZpbGwtb3B0aW9uc11cIik7XG5cblx0ICAgIHNlbGVjdG9yRWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgRmlsbE9wdGlvbnMucHVzaChlbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtb3B0aW9ucycpKTtcblx0ICAgIH0pO1xuXHQgICAgXG5cdCAgICByYWlfeXNwX2FwaS5jYWxsX2FwaSgnUE9TVCcsICdkcm9wZG93bi1vcHRpb25zJywge2xhYmVsczogRmlsbE9wdGlvbnN9KS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG5cdCAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuXHQgICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnlzcC1xdWljay1zZWFyY2gtZm9ybSBzZWxlY3RbZGF0YS1maWxsLW9wdGlvbnM9J1wiKyBsYWJlbCArXCInXVwiKTtcblx0ICAgICAgICAgICAgbGV0IG5hbWUgPSBTZWxlY3RvckVsZVswXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuXHQgICAgICAgICAgICByT3B0aW9uc1tsYWJlbF0uZm9yRWFjaChmdW5jdGlvbihiKSB7XG5cdCAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICAgICAgICAgIFx0bGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJPUFRJT05cIik7XG5cblx0XHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcblx0XHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG5cblx0ICAgICAgICAgICAgICAgICAgICBlbGUuYWRkKG9wdGlvbik7XG5cdCAgICAgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgbGV0IFVSTFJFRiA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG5cdCAgICAgICAgICAgIGxldCBVcmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbmFtZSApO1xuXG5cdCAgICAgICAgICAgIGxldCBzdHJwYXRocz13aW5kb3cubG9jYXRpb24uaHJlZjtcblxuXHQgICAgICAgICAgICBzdHJwYXRocz1zdHJwYXRocy5yZXBsYWNlKHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF9wYWdlX2lkLCAnJyk7XG5cblx0ICAgICAgICAgICAgbGV0IHBhdGhzID0gc3RycGF0aHMuc3BsaXQoXCIvXCIpO1xuXG5cdCAgICAgICAgICAgIGxldCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zPXt9O1xuXG5cdCAgICAgICAgICAgIHBhdGhzLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuXG5cdCAgICAgICAgICAgICAgICBpZiAocGF0aCAhPSAnJykge1xuXHQgICAgICAgICAgICAgICAgICAgIGxldCBwaGFzZV9wYXRoID0gcGF0aC5zcGxpdCgnLScpO1xuXHQgICAgICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHM9cGhhc2VfcGF0aC5zbGljZSgxKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV09b25seV92YWxzLmpvaW4oJyAnKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgXG5cdCAgICAgICAgICAgIGlmIChVcmxWYWwgIT0gJycgJiYgVXJsVmFsICE9IG51bGwpIHtcblx0ICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFVybFZhbCk7XG5cblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgVXJsVmFsID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgVXJsVmFsID0gVXJsVmFsLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBVcmxWYWw7IFxuXHQgICAgICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgfVxuXG5cblx0ICAgICAgICAgICAgbGV0IGhhc1ByZXR0eSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXTtcblxuXHQgICAgICAgICAgICBjb25zb2xlLmxvZyggcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdKTtcblxuXHQgICAgICAgICAgICBpZiAoaGFzUHJldHR5ICE9ICcnICYmIGhhc1ByZXR0eSAhPSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBoYXNQcmV0dHk7IFxuXHQgICAgICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0pXG5cdH1cbn0pOyIsImZ1bmN0aW9uIHlzcF9tYWtlU2VhcmNoVGFncyggZGF0YSApIHtcblxuXHRsZXQgdGFnc0VsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3Atc2VhcmNoLXRhZ3MnKTtcbiAgICAgICAgXG4gICAgaWYgKHRhZ3NFbGUpIHtcbiAgICAgICAgdGFnc0VsZS5mb3JFYWNoKGZ1bmN0aW9uKHRlKSB7XG4gICAgICAgICAgICB0ZS5pbm5lckhUTUw9XCJcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgeXNwX3RhZ3Nfbm90X3ByaW50ID0gWydwYWdlX2luZGV4JywgJyddO1xuXG4gICAgICAgIGZvciAobGV0IHBhcmFtS2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbD0nJztcblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj0nKyBwYXJhbUtleSArJ10nKSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGFiZWw9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGFiZWxbZm9yPScrIHBhcmFtS2V5ICsnXScpLmlubmVyVGV4dDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKltuYW1lPScrIHBhcmFtS2V5ICsnXScpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbbmFtZT0nKyBwYXJhbUtleSArJ10nKS5oYXNBdHRyaWJ1dGUoJ2xhYmVsJykpIHtcblxuICAgICAgICAgICAgICAgIGxhYmVsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbbmFtZT0nKyBwYXJhbUtleSArJ10nKS5nZXRBdHRyaWJ1dGUoJ2xhYmVsJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0YWdzRWxlLmZvckVhY2goZnVuY3Rpb24odGUpIHtcblxuICAgICAgICAgICAgICAgIGlmICh5c3BfdGFnc19ub3RfcHJpbnQuaW5kZXhPZiggcGFyYW1LZXkgKSA9PSAtMSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lPScrIHBhcmFtS2V5ICsnXScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVJbnB1dCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VGFnRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YWdWYWwgPSBkYXRhW3BhcmFtS2V5XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVJbnB1dC50YWdOYW1lID09ICdTRUxFQ1QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCA9IGVsZUlucHV0Lm9wdGlvbnNbIGVsZUlucHV0LnNlbGVjdGVkSW5kZXggXS5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtS2V5Lm1hdGNoKCdwcmljZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCA9ICckJyt0YWdWYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtS2V5Lm1hdGNoKCdsZW5ndGgnKSAmJiBwYXJhbUtleSAhPSAnbGVuZ3RodW5pdCcpICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsZVVuaXQgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybSBbbmFtZT1sZW5ndGh1bml0XTpjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISBlbGVVbml0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlVW5pdCA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIFtuYW1lPWxlbmd0aHVuaXRdJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnVmFsID0gdGFnVmFsICsnICc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZVVuaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCArPSBlbGVVbml0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLmNsYXNzTmFtZSA9ICdidG4gYnRuLXByaW1hcnkgYnRuLXNtIHlzcC10YWcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBsYWJlbCAhPSBudWxsICYmIGxhYmVsICE9ICdudWxsJyAmJiBsYWJlbCAhPSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYWdFbGUuaW5uZXJIVE1MID0geXNwX3RlbXBsYXRlcy55YWNodF90YWcobGFiZWwsIHRhZ1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYWdFbGUuaW5uZXJIVE1MID0geXNwX3RlbXBsYXRlcy55YWNodF90YWcoJycsIHRhZ1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLnNldEF0dHJpYnV0ZSgna2V5JywgcGFyYW1LZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlLmFwcGVuZENoaWxkKCBuZXdUYWdFbGUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXRhZ1trZXk9XCInKyBwYXJhbUtleSArJ1wiXScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygoJy55c3AtdGFnW2tleT1cIicrIHBhcmFtS2V5ICsnXCJdJykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3Bhbi55c3AtdGFnW2tleT1cIicrIHBhcmFtS2V5ICsnXCJdJykuZm9yRWFjaChmdW5jdGlvbih5c3BUYWdFbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5c3BUYWdFbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgna2V5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dEVsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIHNlbGVjdFtuYW1lPScrIGtleSArJ10sIC55c3AteWFjaHQtc2VhcmNoLWZvcm0gaW5wdXRbbmFtZT0nKyBrZXkgKyddJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0RWxlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RWxlcy5mb3JFYWNoKGZ1bmN0aW9uKGVsZUkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVsZUkudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoZWxlSS50eXBlID09ICdjaGVja2JveCcgfHwgZWxlSS50eXBlID09ICdyYWRpbycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZUkuY2hlY2tlZD1mYWxzZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlSS52YWx1ZT0nJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZXNbMF0uZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG59IiwiZnVuY3Rpb24geXNwX21hcmtMb3ZlZFZlc3NlbCggZWxlX2NhcmQgKSB7XG5cbiAgICBqUXVlcnkoJy5sb3ZlJywgZWxlX2NhcmQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgICAgICBqUXVlcnkodGhpcykudG9nZ2xlQ2xhc3MoJ2xvdmVkJyk7XG5cbiAgICAgICAgbGV0IHlhY2h0SWQgPSBqUXVlcnkodGhpcykuZGF0YSgneWFjaHQtaWQnKTtcbiAgICBcbiAgICAgICAgaWYgKCBqUXVlcnkodGhpcykuaGFzQ2xhc3MoJ2xvdmVkJykgKSB7XG4gICAgICAgICAgICB5c3BfYWRkTG92ZWRWZXNzZWwoeWFjaHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB5c3BfcmVtb3ZlTG92ZWRWZXNzZWwoeWFjaHRJZCk7XG5cbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSByYWl5c19nZXRfZm9ybV9kYXRhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0nKSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1zLnlzX3lhY2h0c19sb3ZlZCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGVsZV9jYXJkLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSAhPSBcIlwiKSB7XG5cbiAgICAgICAgbGV0IGxvdmVkVmVzc2VscyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykpO1xuXG4gICAgICAgIGlmIChsb3ZlZFZlc3NlbHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgbG92ZWRWZXNzZWxzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeWFjaHRJZCA9IGVsZV9jYXJkLmRhdGEoJ3lhY2h0LWlkJyk7XG5cbiAgICAgICAgaWYgKGxvdmVkVmVzc2Vscy5pbmRleE9mKCB5YWNodElkICkgIT0gLTEpIHtcblxuICAgICAgICAgICAgZWxlX2NhcmQuYWRkQ2xhc3MoJ2xvdmVkJyk7XG5cbiAgICAgICAgICAgIGpRdWVyeSgnLmxvdmUnLCBlbGVfY2FyZCkuYWRkQ2xhc3MoJ2xvdmVkJyk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZnVuY3Rpb24geXNwX2FkZExvdmVkVmVzc2VsKCB5YWNodElkICkge1xuXG4gICAgbGV0IGxvdmVkVmVzc2VscyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykpO1xuXG5cbiAgICAgICAgaWYgKGxvdmVkVmVzc2VscyA9PSBudWxsKSB7XG4gICAgICAgICAgICBsb3ZlZFZlc3NlbHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgaWYgKGxvdmVkVmVzc2Vscy5pbmRleE9mKCB5YWNodElkICkgPT0gLTEpIHtcblxuICAgICAgICBsb3ZlZFZlc3NlbHMucHVzaCh5YWNodElkKTtcblxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gYWxyZWFkeSBhZGRlZFxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGxvdmVkVmVzc2VscyApO1xuICAgIFxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwieXNwX2xvdmVkX3Zlc3NlbHNcIiwgSlNPTi5zdHJpbmdpZnkobG92ZWRWZXNzZWxzKSk7XG5cbn0gXG5cbmZ1bmN0aW9uIHlzcF9yZW1vdmVMb3ZlZFZlc3NlbCggeWFjaHRJZCApIHtcblxuICAgIGxldCBsb3ZlZFZlc3NlbHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpKTtcblxuXG4gICAgICAgIGlmIChsb3ZlZFZlc3NlbHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgbG92ZWRWZXNzZWxzID0gW107XG4gICAgICAgIH1cblxuICAgIGxldCBpbmRleGVkID0gbG92ZWRWZXNzZWxzLmluZGV4T2YoIHlhY2h0SWQgKTtcblxuICAgIGNvbnNvbGUubG9nKGluZGV4ZWQpO1xuXG4gICAgaWYgKGluZGV4ZWQgIT0gLTEpIHtcblxuICAgICAgICBkZWxldGUgbG92ZWRWZXNzZWxzW2luZGV4ZWRdOyAgICAgICAgXG4gICAgICAgIGxvdmVkVmVzc2Vscy5zcGxpY2UoaW5kZXhlZCwgMSk7XG5cblxuXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBhbHJlYWR5IGFkZGVkXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2cobG92ZWRWZXNzZWxzICk7XG4gICAgXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ5c3BfbG92ZWRfdmVzc2Vsc1wiLCBKU09OLnN0cmluZ2lmeShsb3ZlZFZlc3NlbHMpKTtcblxufSIsInZhciBZU1BfVmVzc2VsQ29tcGFyZUxpc3Q9W107XG5cblxuZnVuY3Rpb24geXNwX3Jlc3RvcmVDb21wYXJlcygpIHtcbiAgICBsZXQgVVJMUkVGPW5ldyBVUkwobG9jYXRpb24uaHJlZik7IC8vIG1heWJlIGZvciBhIHJlLWRvXG4gICAgbGV0IGNvbXBhcmVfcG9zdF9pZHMgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggJ3Jlc3RvcmVfdG9fY29tcGFyZScgKTsgXG5cbiAgICBjb25zb2xlLmxvZyh0eXBlb2YgY29tcGFyZV9wb3N0X2lkcyk7XG4gICAgY29uc29sZS5sb2coY29tcGFyZV9wb3N0X2lkcyk7XG5cbiAgICBpZiAodHlwZW9mIGNvbXBhcmVfcG9zdF9pZHMgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgWVNQX1Zlc3NlbENvbXBhcmVMaXN0ID0gY29tcGFyZV9wb3N0X2lkcy5zcGxpdCgnLCcpO1xuICAgIFxuXG4gICAgICAgIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKTtcbiAgICB9XG5cblxuXG59XG5cblxuZnVuY3Rpb24geXNwX21ha2VDb21wYXJlVmVzc2VsKGVsZV9jYXJkKSB7XG5cdCBcblx0IGpRdWVyeSgnLmNvbXBhcmVfdG9nZ2xlJywgZWxlX2NhcmQpLmNoYW5nZShmdW5jdGlvbihlKSB7XG5cdCBcdGNvbnNvbGUubG9nKCdob3dkeScpO1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnRvZ2dsZUNsYXNzKCdhcm1lZCcpO1xuXG4gICAgICAgIGxldCB5YWNodElkID0gZWxlX2NhcmQuZGF0YSgncG9zdC1pZCcpO1xuICAgIFxuICAgICAgICBpZiAoIGpRdWVyeSh0aGlzKS5oYXNDbGFzcygnYXJtZWQnKSApIHtcbiAgICAgICAgICAgIHlzcF9hZGRWZXNzZWxUb0NvbXBhcmVMaXN0KHlhY2h0SWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeXNwX3JlbW92ZVZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgbGV0IHlhY2h0SWQgPSBlbGVfY2FyZC5kYXRhKCdwb3N0LWlkJyk7XG5cbiAgICBpZiAoWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmluZGV4T2YoIHlhY2h0SWQgKSAhPSAtMSAgfHwgWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmluZGV4T2YoIHlhY2h0SWQudG9TdHJpbmcoKSApICE9IC0xICkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdoZWxsbyB3b3JsZCByZXN0b3JlZCcpO1xuXG4gICAgICAgIGVsZV9jYXJkLmFkZENsYXNzKCdhcm1lZCcpO1xuXG4gICAgICAgIGpRdWVyeSgnLmNvbXBhcmVfdG9nZ2xlJywgZWxlX2NhcmQpLmFkZENsYXNzKCdhcm1lZCcpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblxuICAgIH1cblxufVxuXG5mdW5jdGlvbiB5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKSB7XG5cbiAgICBpZiAoWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmluZGV4T2YoIHlhY2h0SWQgKSA9PSAtMSkge1xuXG4gICAgXHRZU1BfVmVzc2VsQ29tcGFyZUxpc3QucHVzaCh5YWNodElkKTtcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKTtcbn1cbiAgICBcbmZ1bmN0aW9uIHlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0KHlhY2h0SWQpIHtcblx0bGV0IGluZGV4ZWQgPSBZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZCApXG5cblx0aWYgKCBpbmRleGVkICE9IC0xKSB7XG5cbiAgICBcdGRlbGV0ZSBZU1BfVmVzc2VsQ29tcGFyZUxpc3RbaW5kZXhlZF07ICAgICAgICBcbiAgICAgICAgWVNQX1Zlc3NlbENvbXBhcmVMaXN0LnNwbGljZShpbmRleGVkLCAxKTtcbiAgXHRcdFxuICAgIH1cblxuICAgIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKTtcbn1cblxuZnVuY3Rpb24geXNwX21ha2VDb21wYXJlTGlua291dCgpIHtcblxuICAgIGlmIChZU1BfVmVzc2VsQ29tcGFyZUxpc3QubGVuZ3RoID49IDIpIHtcbiAgICBcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0JykuaHJlZj1yYWlfeWFjaHRfc3luYy53cF9yZXN0X3VybCtcInJhaXlzL2NvbXBhcmUvP3Bvc3RJRD1cIitZU1BfVmVzc2VsQ29tcGFyZUxpc3Quam9pbignLCcpO1xuXG4gICAgXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneXNwX2NvbXBhcmVfbGlua291dCcpLmlubmVySFRNTD1gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCI+Q29tcGFyZSAoICR7WVNQX1Zlc3NlbENvbXBhcmVMaXN0Lmxlbmd0aH0gKTwvYnV0dG9uPmA7XG4gICAgICAgIFxuICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAgJ3Bvc3RfX2luJzogWVNQX1Zlc3NlbENvbXBhcmVMaXN0LFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiByYWlfeXNwX2FwaS5jYWxsX2FwaShcIlBPU1RcIiwgXCJ5YWNodHNcIiwgcGFyYW1zKS50aGVuKGZ1bmN0aW9uKGRhdGFfcmVzdWx0KSB7XG5cbiAgICAgICAgICAgIGRhdGFfcmVzdWx0LnJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLWNvbXBhcmUtcHJldmlld3MnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQuY29tcGFyZV9wcmV2aWV3KGl0ZW0sIHBhcmFtcykgKTtcblxuICAgICAgICAgICAgICAgIGxldCBlbGVfcHJldmlldyA9IGpRdWVyeSgnI3lzcC1jb21wYXJlLXByZXZpZXdzIFtkYXRhLXBvc3QtaWQ9JysgaXRlbS5fcG9zdElEICsnXScpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGpRdWVyeSgnLnJlbW92ZS1mcm9tLWNvbXBhcmUnLCBlbGVfcHJldmlldykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoZWxsbycpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsZV9jYXJkID0galF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cgW2RhdGEtcG9zdC1pZD0nKyBpdGVtLl9wb3N0SUQgKyddJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcuY29tcGFyZV90b2dnbGUnLCBlbGVfY2FyZCkucHJvcCgnY2hlY2tlZCcsIGZhbHNlKS5yZW1vdmVDbGFzcygnYXJtZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICB5c3BfcmVtb3ZlVmVzc2VsVG9Db21wYXJlTGlzdChpdGVtLl9wb3N0SUQpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCk7XG5cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGpRdWVyeSgnI3lzcC1jb21wYXJlLXByZXZpZXdzJykuaHRtbCgnJyk7XG4gICAgICAgIGpRdWVyeSgnI3lzcF9jb21wYXJlX2xpbmtvdXQnKS5odG1sKCcnKTtcbiAgICB9XG5cblxuXG5cbn1cbiIsImNvbnN0IHlzcEJlZm9yZVlhY2h0U2VhcmNoID0gbmV3IEV2ZW50KFwieXNwLWJlZm9yZS1zdWJtaXR0aW5nLXlhY2h0LXNlYXJjaFwiKTtcbmNvbnN0IHlzcEFmdGVyWWFjaHRTZWFyY2ggPSBuZXcgRXZlbnQoXCJ5c3AtYWZ0ZXItc3VibWl0dGluZy15YWNodC1zZWFyY2hcIik7XG5jb25zdCB5c3BBZnRlclJlbmRlcmluZ1lhY2h0ID0gbmV3IEV2ZW50KFwieXNwLWFmdGVyLXJlbmRlcmluZy15YWNodC1zZWFyY2hcIik7XG5cbmZ1bmN0aW9uIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlcihkYXRhKSB7XG5cbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICAgIGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93JykuaHRtbCgnJyk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXJlc3VsdC1zZWN0aW9uJykuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGVkJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1yZXN1bHQtc2VjdGlvbicpLmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmcnKTtcblxuICAgIHJhaXlzX3NldF9mb3JtX3RvX2RhdGEoIGRhdGEgKTtcblxuICAgIHlzcF9tYWtlU2VhcmNoVGFncyggZGF0YSApO1xuXG4gICAgLy8gR0VUIEFORCBXUklURVxuICAgIHJldHVybiByYWlfeXNwX2FwaS5jYWxsX2FwaShcIlBPU1RcIiwgXCJ5YWNodHNcIiwgZGF0YSkudGhlbihmdW5jdGlvbihkYXRhX3Jlc3VsdCkge1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtcmVzdWx0LXNlY3Rpb24nKS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtcmVzdWx0LXNlY3Rpb24nKS5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKTtcblxuICAgICAgICBkb2N1bWVudC50aXRsZSA9IGRhdGFfcmVzdWx0LlNFTy50aXRsZTtcbiAgICAgICAgalF1ZXJ5KCcjeXNwLXNlYXJjaC1oZWFkaW5nJykudGV4dChkYXRhX3Jlc3VsdC5TRU8uaGVhZGluZyk7XG4gICAgICAgIGpRdWVyeSgnI3lzcC1zZWFyY2gtcGFyYWdyYXBoJykudGV4dChkYXRhX3Jlc3VsdC5TRU8uZ3B0X3ApO1xuXG4gICAgICAgIGpRdWVyeSgnI3RvdGFsLXJlc3VsdHMnKS50ZXh0KG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tSU4nLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogMyB9KS5mb3JtYXQoZGF0YV9yZXN1bHQudG90YWwpKTtcblxuICAgICAgICBsZXQgY3VycmVudFVSTD1udWxsO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5kb250X3B1c2ggPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRVUkw9cmFpeXNfcHVzaF9oaXN0b3J5KCBkYXRhICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50VVJMID0gbG9jYXRpb24uaHJlZjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgalF1ZXJ5KCcjeWFjaHRzLXBhZ2luYXRpb24nKS5odG1sKCcnKTtcblxuICAgICAgICBpZiAoZGF0YV9yZXN1bHQudG90YWwgPiAwKSB7XG5cbiAgICAgICAgICAgIGRhdGFfcmVzdWx0LnJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnZpZXcgIT0gJ3VuZGVmaW5lZCcgJiYgZGF0YS52aWV3LnRvTG93ZXJDYXNlKCkgPT0gJ2xpc3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93JykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0Lmxpc3QoaXRlbSwgZGF0YSkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93JykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0LmdyaWQoaXRlbSwgZGF0YSkgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZWxlX2NhcmQgPSBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdyBbZGF0YS1wb3N0LWlkPScrIGl0ZW0uX3Bvc3RJRCArJ10nKTtcblxuICAgICAgICAgICAgICAgIGpRdWVyeSgnW2RhdGEtbW9kYWxdJywgZWxlX2NhcmQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgdmVzc2VsSW5mbyA9IGl0ZW0uTW9kZWxZZWFyICsgJyAnICsgaXRlbS5NYWtlU3RyaW5nICsgJyAnICsgaXRlbS5Cb2F0TmFtZTtcblxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyN5YXRjaEhpZGRlbicpLnZhbCh2ZXNzZWxJbmZvKTtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRhdGFfbW9kYWwgPSBqUXVlcnkodGhpcykuZGF0YSgnbW9kYWwnKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBqUXVlcnkoIGRhdGFfbW9kYWwgKS55c3BfbW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICBjbG9zZVRleHQ6ICdYJyxcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxDbGFzczogJ3lzcC1tb2RhbC1vcGVuJyxcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGFzczogJ3lzcC1tb2RlbC1jbG9zZSdcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgeXNwX21hcmtMb3ZlZFZlc3NlbCggZWxlX2NhcmQgKTsgICAgIFxuICAgICAgICAgICAgICAgIHlzcF9tYWtlQ29tcGFyZVZlc3NlbCggZWxlX2NhcmQgKTsgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGpRdWVyeSgnI3lhY2h0cy1wYWdpbmF0aW9uJykucGFnaW5hdGlvbih7XG4gICAgICAgICAgICAgICAgaXRlbXM6IGRhdGFfcmVzdWx0LnRvdGFsLFxuICAgICAgICAgICAgICAgIGl0ZW1zT25QYWdlOiAxMixcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogZGF0YS5wYWdlX2luZGV4LFxuICAgICAgICAgICAgICAgIHByZXZUZXh0OiB5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24ucHJldl90ZXh0LFxuICAgICAgICAgICAgICAgIG5leHRUZXh0OiB5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24ubmV4dF90ZXh0LFxuICAgICAgICAgICAgICAgIGVkZ2VzOiA0LFxuICAgICAgICAgICAgICAgIGRpc3BsYXllZFBhZ2VzOiA0LFxuICAgICAgICAgICAgICAgIGhyZWZUZXh0UHJlZml4OiBjdXJyZW50VVJMLnJlcGxhY2UobmV3IFJlZ0V4cChcInBhZ2VfaW5kZXgtKFxcXFxkKikoLylcIiwgXCJnXCIpLCBcIlwiKSsncGFnZV9pbmRleC0nLFxuICAgICAgICAgICAgICAgIGhyZWZUZXh0U3VmZml4OiAnLycsXG4gICAgICAgICAgICAgICAgb25QYWdlQ2xpY2s6IGZ1bmN0aW9uKHBhZ2VOdW1iZXIsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybSBpbnB1dFtuYW1lPXBhZ2VfaW5kZXhdJykudmFsdWU9cGFnZU51bWJlcjtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybURhdGFPYmplY3QgPSByYWl5c19nZXRfZm9ybV9kYXRhKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJykgKTtcblxuICAgICAgICAgICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoZm9ybURhdGFPYmplY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93JykuYXBwZW5kKHlzcF90ZW1wbGF0ZXMubm9SZXN1bHRzKCkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBqUXVlcnkoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0pLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAoalF1ZXJ5KFwiLnNjcm9sbC10by1oZXJlLW9uLXlhY2h0LXNlYXJjaFwiKS5vZmZzZXQoKS50b3ApXG4gICAgICAgIH0sIDI1MCk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybTpub3QoI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0pJykuZGlzcGF0Y2hFdmVudCh5c3BBZnRlclJlbmRlcmluZ1lhY2h0KTtcblxuICAgICAgICByZXR1cm4gZGF0YV9yZXN1bHQ7XG5cbiAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcblxuICAgIH0pO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgIC8vIEZpbGwgTGlzdCBPcHRpb25zXG4gICAgbGV0IEZpbGxMaXN0cz1bXTtcbiAgICBsZXQgbGlzdEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRhdGFsaXN0W2RhdGEtZmlsbC1saXN0XVwiKTtcbiAgICBsZXQgbGlzdE5lZWRlZEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0W2xpc3RdXCIpO1xuXG4gICAgbGlzdEVsZW1lbnRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICBGaWxsTGlzdHMucHVzaChlbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtbGlzdCcpKTtcbiAgICB9KTtcblxuICAgIGxpc3ROZWVkZWRFbGVtZW50cy5mb3JFYWNoKChpbnB1dF9lbGUpID0+IHtcblxuICAgICAgICBpbnB1dF9lbGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgICAgICBsZXQgbGlzdF9pZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2xpc3QnKTtcblxuICAgICAgICAgICAgbGV0IGVsZV9saXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRhdGFsaXN0I1wiK2xpc3RfaWQpO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA8PSAzKSB7XG5cbiAgICAgICAgICAgICAgICByYWlfeXNwX2FwaS5jYWxsX2FwaShcbiAgICAgICAgICAgICAgICAgICAgJ1BPU1QnLCBcbiAgICAgICAgICAgICAgICAgICAgJ2xpc3Qtb3B0aW9ucy13aXRoLXZhbHVlJywgXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsczogWyBlbGVfbGlzdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1saXN0JykgXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGF0YWxpc3RbZGF0YS1maWxsLWxpc3Q9J1wiKyBsYWJlbCArXCInXVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0pO1xuXG4gICAgfSlcbiAgICBcbi8qICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpKCdQT1NUJywgJ2xpc3Qtb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxMaXN0c30pLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcbiAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRhdGFsaXN0W2RhdGEtZmlsbC1saXN0PSdcIisgbGFiZWwgK1wiJ11cIik7XG5cbiAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGUuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuKi9cbiAgICBsZXQgeWFjaHRTZWFyY2hBbmRSZXN1bHRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm06bm90KCN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtKScpO1xuXG4gICAgaWYgKHlhY2h0U2VhcmNoQW5kUmVzdWx0cykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Blbi1tb2JpbGUtc2VhcmNoJykuZm9yRWFjaCgob21zZSkgPT4ge1xuICAgICAgICAgICAgb21zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3Atc3VwZXItbW9iaWxlLXNlYXJjaCcpLnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3dZPSdoaWRkZW4nO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuYWRkKCd5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1vcGVuJyk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9iaWxlLXNlYXJjaCcpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9iaWxlLXNlYXJjaCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1zdXBlci1tb2JpbGUtc2VhcmNoJykuc3R5bGUuZGlzcGxheT0nbm9uZSc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93WT0ndW5zZXQnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QucmVtb3ZlKCd5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1vcGVuJyk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICB5YWNodFNlYXJjaEFuZFJlc3VsdHMuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KHlzcEJlZm9yZVlhY2h0U2VhcmNoKTtcblxuICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPTE7XG5cbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSByYWl5c19nZXRfZm9ybV9kYXRhKGUudGFyZ2V0KTtcblxuICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKS50aGVuKGZ1bmN0aW9uKGFwaV9kYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KHlzcEFmdGVyWWFjaHRTZWFyY2gpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTsgXG5cbiAgICAgICAgeWFjaHRTZWFyY2hBbmRSZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LnN1Ym1pdC1vbi1jaGFuZ2UnKS5mb3JFYWNoKChlbGVJbnB1dCkgPT4ge1xuICAgICAgICAgICAgZWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHlhY2h0U2VhcmNoQW5kUmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPXJlc2V0XScpLmZvckVhY2goKGVsZVJlc2V0KSA9PiB7XG4gICAgICAgICAgICBlbGVSZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInlzX2NvbXBhbnlfb25seVwiXScpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwieXNfY29tcGFueV9vbmx5XCJdJykuZm9yRWFjaChmdW5jdGlvbihlbGVDaGVjaykge1xuICAgICAgICAgICAgICAgIGVsZUNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT12aWV3XVtmb3JtPXlzcC15YWNodC1zZWFyY2gtZm9ybV0sIHNlbGVjdFtuYW1lPXNvcnRieV1bZm9ybT15c3AteWFjaHQtc2VhcmNoLWZvcm1dJykuZm9yRWFjaCgoZWxlVmlld09wdGlvbikgPT4ge1xuICAgICAgICAgICAgZWxlVmlld09wdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBpY2stYWxsJykuZm9yRWFjaChmdW5jdGlvbihlbGUpIHtcbiAgICAgICAgICAgIGVsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIGxldCBpbnB1dF9uYW1lID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwiJysgaW5wdXRfbmFtZSArJ1wiXScpLmZvckVhY2goKGVsZUlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZUlucHV0LmNoZWNrZWQ9ZmFsc2U7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFBSRVRUWSBVUkxcbiAgICAgICAgbGV0IHN0cnBhdGhzPXdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgICAgIHN0cnBhdGhzPXN0cnBhdGhzLnJlcGxhY2UocmFpX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3BhZ2VfaWQsICcnKTtcblxuICAgICAgICBsZXQgcGF0aHMgPSBzdHJwYXRocy5zcGxpdChcIi9cIik7XG5cbiAgICAgICAgbGV0IHByZXR0eV91cmxfcGF0aF9wYXJhbXM9e307XG5cbiAgICAgICAgcGF0aHMuZm9yRWFjaChmdW5jdGlvbihwYXRoKSB7XG5cbiAgICAgICAgICAgIGlmIChwYXRoICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBoYXNlX3BhdGggPSBwYXRoLnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgbGV0IG9ubHlfdmFscz1waGFzZV9wYXRoLnNsaWNlKDEpO1xuXG4gICAgICAgICAgICAgICAgb25seV92YWxzPW9ubHlfdmFscy5qb2luKCcgJykuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IG9ubHlfdmFsc19hcnJheT0ob25seV92YWxzLnNwbGl0KCcrJykpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvbmx5X3ZhbHNfYXJyYXlbMV0gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb25seV92YWxzID0gb25seV92YWxzX2FycmF5Lm1hcCgob3YpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvdi5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhvbmx5X3ZhbHMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV09b25seV92YWxzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2cocHJldHR5X3VybF9wYXRoX3BhcmFtcyk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSBGaWVsZHNcblxuICAgICAgICBsZXQgVVJMUkVGPW5ldyBVUkwobG9jYXRpb24uaHJlZik7IC8vIG1heWJlIGZvciBhIHJlLWRvXG5cbiAgICAgICAgbGV0IGZvcm1JbnB1dHM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AteWFjaHQtc2VhcmNoLWZvcm1cIl0sICN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm1cIl0nKTtcblxuICAgICAgICBmb3JtSW5wdXRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGlucHV0ID0gZWxlO1xuXG4gICAgICAgICAgICBsZXQgbmFtZSA9IGVsZS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICAgICAgbGV0IHVybFZhbCA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCBuYW1lICk7XG4gICAgICAgICAgICAgICAgLy8gdXJsVmFsID0gO1xuICAgXG5cbiAgICAgICAgICAgIGxldCBoYXNQcmV0dHkgPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF07XG5cbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYXNQcmV0dHkgIT0gJ251bGwnICYmIHR5cGVvZiBoYXNQcmV0dHkgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGhhc1ByZXR0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhoYXNQcmV0dHkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGhhc1ByZXR0eS5mb3JFYWNoKChoUCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoUCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaGFzUHJldHR5ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUgIT0gJ2NoZWNrYm94JyAmJiBpbnB1dC50eXBlICE9ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gaGFzUHJldHR5O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHVybFZhbCAhPSAnJyAmJiB1cmxWYWwgIT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmxWYWwgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsVmFsID0gdXJsVmFsLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSB1cmxWYWwgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZSAhPSAnY2hlY2tib3gnICYmIGlucHV0LnR5cGUgIT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHVybFZhbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSBDb21wYXJlXG4gICAgICAgICB5c3BfcmVzdG9yZUNvbXBhcmVzKCk7XG5cbiAgICAgICAgLy8gRmlsbCBvcHRpb25zXG4gICAgICAgIGxldCBGaWxsT3B0aW9ucz1bXTtcbiAgICAgICAgbGV0IHNlbGVjdG9yRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zXVwiKTtcblxuICAgICAgICBzZWxlY3RvckVsZW1lbnRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgRmlsbE9wdGlvbnMucHVzaChlbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtb3B0aW9ucycpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByYWlfeXNwX2FwaS5jYWxsX2FwaSgnUE9TVCcsICdkcm9wZG93bi1vcHRpb25zJywge2xhYmVsczogRmlsbE9wdGlvbnN9KS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFtkYXRhLWZpbGwtb3B0aW9ucz0nXCIrIGxhYmVsICtcIiddXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coU2VsZWN0b3JFbGUpO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBTZWxlY3RvckVsZVswXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUuYWRkKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IFVSTFJFRiA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgICAgICAgbGV0IFVybFZhbCA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCBuYW1lICk7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3RycGF0aHM9d2luZG93LmxvY2F0aW9uLmhyZWY7XG5cbiAgICAgICAgICAgICAgICBzdHJwYXRocz1zdHJwYXRocy5yZXBsYWNlKHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF9wYWdlX2lkLCAnJyk7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSBzdHJwYXRocy5zcGxpdChcIi9cIik7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5X3VybF9wYXRoX3BhcmFtcz17fTtcblxuICAgICAgICAgICAgICAgIHBhdGhzLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXRoICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGhhc2VfcGF0aCA9IHBhdGguc3BsaXQoJy0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHM9cGhhc2VfcGF0aC5zbGljZSgxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXT1vbmx5X3ZhbHMuam9pbignICcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoVXJsVmFsICE9ICcnICYmIFVybFZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coVXJsVmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIFVybFZhbCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVXJsVmFsID0gVXJsVmFsLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBVcmxWYWw7IFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlLnZhbHVlID09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gVXJsVmFsLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGhhc1ByZXR0eSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXTtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzUHJldHR5ICE9ICcnICYmIGhhc1ByZXR0eSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gaGFzUHJldHR5OyBcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS52YWx1ZSA9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IGhhc1ByZXR0eS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFJlbmRlciBZYWNodHMgRm9yIFBhZ2UgTG9hZFxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHJhaXlzX2dldF9mb3JtX2RhdGEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuXG4gICAgICAgICAgICAvLyBMaWtlZCAvIExvdmVkIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMueXNfeWFjaHRzX2xvdmVkICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgbG92ZWRfeWFjaHRzID0gSlNPTi5wYXJzZSggbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykgKTtcblxuICAgICAgICAgICAgICAgIGlmIChsb3ZlZF95YWNodHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMueXNfb25seV90aGVzZSA9IGxvdmVkX3lhY2h0cy5qb2luKCcsJyk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy55c19vbmx5X3RoZXNlPVwiMCwwLDBcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKTsgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBtb2JpbGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0nKTtcblxuICAgICAgICBpZiAobW9iaWxlRm9ybSkge1xuICAgICAgICAgICAgbW9iaWxlRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPTE7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXN1cGVyLW1vYmlsZS1zZWFyY2gnKS5zdHlsZS5kaXNwbGF5PSdub25lJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3dZPSd1bnNldCc7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7ICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoIHBhcmFtcyApO1xuXG4gICAgICAgICAgICB9KTsgXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgIH1cblxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChlLCBhcGlFbmRwb2ludCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGZvcm1EYXRhID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7XG4gICAgICAgIGxldCBzdWNjZXNzTWVzc2FnZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnN1Y2Nlc3MtbWVzc2FnZScpO1xuICAgICAgICBjb25zb2xlLmxvZyhmb3JtRGF0YSlcbiAgICAgICAgcmFpX3lzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIGFwaUVuZHBvaW50LCBmb3JtRGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGFfcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgc3VjY2Vzc01lc3NhZ2Uuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgeWFjaHRGb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaW5nbGUteWFjaHQtZGV0aWxzLWxlYWQnKTtcbiAgICB5YWNodEZvcm1zLmZvckVhY2goKGZFbGUpID0+IHtcbiAgICAgICAgZkVsZS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVTdWJtaXQoZSwgXCJ5YWNodC1sZWFkc1wiKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgYnJva2VyRm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2luZ2xlLWJyb2tlci1kZXRpbHMtbGVhZCcpO1xuICAgIGJyb2tlckZvcm1zLmZvckVhY2goKGZFbGUpID0+IHtcbiAgICAgICAgZkVsZS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVTdWJtaXQoZSwgXCJicm9rZXItbGVhZHNcIik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=
