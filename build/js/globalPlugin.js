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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS1wYWdpbmF0aW9uLmpzIiwianF1ZXJ5LW1vZGFsLmpzIiwid2hhdGV2ZXIuanMiLCJjb21tb24uanMiLCJhcGktY2xpZW50LmpzIiwidGVtcGxhdGVzLmpzIiwiZmlsbC1maWVsZHMuanMiLCJ5YWNodFNlYXJjaFRhZ3MuanMiLCJ5YWNodFNlYXJjaExvdmVkLmpzIiwieWFjaHRTZWFyY2hDb21wYXJlLmpzIiwieWFjaHRTZWFyY2guanMiLCJsZWFkcy5qcyJdLCJuYW1lcyI6WyIkIiwibWV0aG9kcyIsImluaXQiLCJvcHRpb25zIiwibyIsImV4dGVuZCIsIml0ZW1zIiwiaXRlbXNPblBhZ2UiLCJwYWdlcyIsImRpc3BsYXllZFBhZ2VzIiwiZWRnZXMiLCJjdXJyZW50UGFnZSIsInVzZUFuY2hvcnMiLCJocmVmVGV4dFByZWZpeCIsImhyZWZUZXh0U3VmZml4IiwicHJldlRleHQiLCJuZXh0VGV4dCIsImVsbGlwc2VUZXh0IiwiZWxsaXBzZVBhZ2VTZXQiLCJjc3NTdHlsZSIsImxpc3RTdHlsZSIsImxhYmVsTWFwIiwic2VsZWN0T25DbGljayIsIm5leHRBdEZyb250IiwiaW52ZXJ0UGFnZU9yZGVyIiwidXNlU3RhcnRFZGdlIiwidXNlRW5kRWRnZSIsIm9uUGFnZUNsaWNrIiwicGFnZU51bWJlciIsImV2ZW50Iiwib25Jbml0Iiwic2VsZiIsIk1hdGgiLCJjZWlsIiwiaGFsZkRpc3BsYXllZCIsImVhY2giLCJhZGRDbGFzcyIsImRhdGEiLCJfZHJhdyIsImNhbGwiLCJzZWxlY3RQYWdlIiwicGFnZSIsIl9zZWxlY3RQYWdlIiwicHJldlBhZ2UiLCJuZXh0UGFnZSIsImdldFBhZ2VzQ291bnQiLCJzZXRQYWdlc0NvdW50IiwiY291bnQiLCJnZXRDdXJyZW50UGFnZSIsImRlc3Ryb3kiLCJlbXB0eSIsImRyYXdQYWdlIiwicmVkcmF3IiwiZGlzYWJsZSIsImRpc2FibGVkIiwiZW5hYmxlIiwidXBkYXRlSXRlbXMiLCJuZXdJdGVtcyIsIl9nZXRQYWdlcyIsInVwZGF0ZUl0ZW1zT25QYWdlIiwiZ2V0SXRlbXNPblBhZ2UiLCJpbnRlcnZhbCIsIl9nZXRJbnRlcnZhbCIsImkiLCJ0YWdOYW1lIiwicHJvcCIsImF0dHIiLCIkcGFuZWwiLCJhcHBlbmRUbyIsIl9hcHBlbmRJdGVtIiwidGV4dCIsImNsYXNzZXMiLCJzdGFydCIsImVuZCIsIm1pbiIsImFwcGVuZCIsImJlZ2luIiwibWF4IiwiX2VsbGlwc2VDbGljayIsInBhZ2VJbmRleCIsIm9wdHMiLCIkbGluayIsIiRsaW5rV3JhcHBlciIsIiR1bCIsImZpbmQiLCJsZW5ndGgiLCJjbGljayIsIiRlbGxpcCIsInBhcmVudCIsInJlbW92ZUNsYXNzIiwiJHRoaXMiLCJ2YWwiLCJwYXJzZUludCIsInByZXYiLCJodG1sIiwiZm9jdXMiLCJzdG9wUHJvcGFnYXRpb24iLCJrZXl1cCIsIndoaWNoIiwiYmluZCIsImZuIiwicGFnaW5hdGlvbiIsIm1ldGhvZCIsImNoYXJBdCIsImFwcGx5IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFyZ3VtZW50cyIsIl90eXBlb2YiLCJlcnJvciIsImpRdWVyeSIsImZhY3RvcnkiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIndpbmRvdyIsImRvY3VtZW50IiwidW5kZWZpbmVkIiwibW9kYWxzIiwiZ2V0Q3VycmVudCIsInNlbGVjdEN1cnJlbnQiLCJzZWxlY3RlZCIsIiRibG9ja2VyIiwidG9nZ2xlQ2xhc3MiLCJ5c3BfbW9kYWwiLCJlbCIsInJlbW92ZSIsInRhcmdldCIsIiRib2R5IiwiZGVmYXVsdHMiLCJkb0ZhZGUiLCJpc05hTiIsImZhZGVEdXJhdGlvbiIsImNsb3NlRXhpc3RpbmciLCJpc0FjdGl2ZSIsImNsb3NlIiwicHVzaCIsImlzIiwiYW5jaG9yIiwidGVzdCIsIiRlbG0iLCJvcGVuIiwibW9kYWwiLCJlbG0iLCJzaG93U3Bpbm5lciIsInRyaWdnZXIiLCJBSkFYX1NFTkQiLCJnZXQiLCJkb25lIiwiQUpBWF9TVUNDRVNTIiwiY3VycmVudCIsIm9uIiwiQ0xPU0UiLCJoaWRlU3Bpbm5lciIsIkFKQVhfQ09NUExFVEUiLCJmYWlsIiwiQUpBWF9GQUlMIiwicG9wIiwiY29uc3RydWN0b3IiLCJtIiwiYmxvY2siLCJibHVyIiwic2V0VGltZW91dCIsInNob3ciLCJmYWRlRGVsYXkiLCJvZmYiLCJlc2NhcGVDbG9zZSIsImNsaWNrQ2xvc2UiLCJlIiwidW5ibG9jayIsImhpZGUiLCJCRUZPUkVfQkxPQ0siLCJfY3R4IiwiY3NzIiwiYmxvY2tlckNsYXNzIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJCTE9DSyIsIm5vdyIsImZhZGVPdXQiLCJjaGlsZHJlbiIsIkJFRk9SRV9PUEVOIiwic2hvd0Nsb3NlIiwiY2xvc2VCdXR0b24iLCJjbG9zZUNsYXNzIiwiY2xvc2VUZXh0IiwibW9kYWxDbGFzcyIsImRpc3BsYXkiLCJPUEVOIiwiQkVGT1JFX0NMT1NFIiwiX3RoaXMiLCJBRlRFUl9DTE9TRSIsInNwaW5uZXIiLCJzcGlubmVySHRtbCIsIiRhbmNob3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlYWR5IiwiY29uc29sZSIsImxvZyIsImRhdGFfbW9kYWwiLCJjb3B5TGluayIsImNvcHlUZXh0IiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3QiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImV4ZWNDb21tYW5kIiwiYWxlcnQiLCJ2YWx1ZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsIm1hcCIsInMiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0cmluZyIsImpvaW4iLCJlbnVtZXJhYmxlIiwicmFpeXNfZ2V0X2Zvcm1fZGF0YSIsImZvcm1fZWxlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImZkIiwiZnJvbUVudHJpZXMiLCJlbnRyaWVzIiwiX2kiLCJfT2JqZWN0JGVudHJpZXMiLCJfT2JqZWN0JGVudHJpZXMkX2kiLCJfc2xpY2VkVG9BcnJheSIsImZJbmRleCIsImZpZWxkIiwiVmFsQXJyYXkiLCJnZXRBbGwiLCJyYWl5c19zZXRfZm9ybV90b19kYXRhIiwiaW5wdXREYXRhIiwiZm9ybUEiLCJxdWVyeVNlbGVjdG9yIiwiZm9ybUIiLCJyZXNldCIsImZvcm1JbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZSIsImlucHV0IiwibmFtZSIsImdldEF0dHJpYnV0ZSIsImhhc1ByZXR0eSIsImlzQXJyYXkiLCJoUCIsInR5cGUiLCJjaGVja2VkIiwicmFpeXNfcHVzaF9oaXN0b3J5Iiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwic3RycGF0aCIsInByb3BlcnR5IiwiaXQiLCJzZXQiLCJ0b1N0cmluZyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJyYWlfeWFjaHRfc3luYyIsInlhY2h0X3NlYXJjaF91cmwiLCJyYWlfeXNwX2FwaSIsImNhbGxfYXBpIiwicGF0aCIsInBhc3NpbmdfZGF0YSIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZURhdGEiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJfcXVlc3Rpb25NYXJrIiwid3BfcmVzdF91cmwiLCJzZW5kIiwic2V0UmVxdWVzdEhlYWRlciIsInN0cmluZ2lmeSIsInlzcF90ZW1wbGF0ZXMiLCJ5YWNodCIsImdyaWQiLCJ2ZXNzZWwiLCJwYXJhbXMiLCJtZXRlcnMiLCJOb21pbmFsTGVuZ3RoIiwicHJpY2UiLCJldXJvcGVfb3B0aW9uX3BpY2tlZCIsInRvRml4ZWQiLCJZU1BfRXVyb1ZhbCIsImNvbmNhdCIsIkludGwiLCJOdW1iZXJGb3JtYXQiLCJtaW5pbXVtRnJhY3Rpb25EaWdpdHMiLCJmb3JtYXQiLCJjdXJyZW5jeSIsIllTUF9VU0RWYWwiLCJfcG9zdElEIiwiRG9jdW1lbnRJRCIsIl9saW5rIiwiSW1hZ2VzIiwiVXJpIiwiYXNzZXRzX3VybCIsIkNvbXBhbnlOYW1lIiwiY29tcGFueV9uYW1lIiwiY29tcGFueV9sb2dvIiwiTW9kZWxZZWFyIiwiTWFrZVN0cmluZyIsIk1vZGVsIiwiQm9hdE5hbWUiLCJDYWJpbnNDb3VudE51bWVyaWMiLCJsaXN0IiwiUHJpY2UiLCJldXJvX2NfYyIsImNvbXBhcmVfcHJldmlldyIsIm5vUmVzdWx0cyIsInlhY2h0X3RhZyIsImxhYmVsIiwibmV4dF90ZXh0IiwicHJldl90ZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVsZV9xdWlja19zZWFyY2giLCJGaWxsT3B0aW9ucyIsInNlbGVjdG9yRWxlbWVudHMiLCJsYWJlbHMiLCJ0aGVuIiwick9wdGlvbnMiLCJfbG9vcCIsIlNlbGVjdG9yRWxlIiwiYiIsIm9wdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJVUkxSRUYiLCJVUkwiLCJsb2NhdGlvbiIsImhyZWYiLCJVcmxWYWwiLCJzdHJwYXRocyIsInJlcGxhY2UiLCJ5YWNodF9zZWFyY2hfcGFnZV9pZCIsInBhdGhzIiwicHJldHR5X3VybF9wYXRoX3BhcmFtcyIsInBoYXNlX3BhdGgiLCJvbmx5X3ZhbHMiLCJlYWNoV29yZENhcGl0YWxpemUiLCJ5c3BfbWFrZVNlYXJjaFRhZ3MiLCJ0YWdzRWxlIiwidGUiLCJpbm5lckhUTUwiLCJ5c3BfdGFnc19ub3RfcHJpbnQiLCJfbG9vcDIiLCJwYXJhbUtleSIsImlubmVyVGV4dCIsImhhc0F0dHJpYnV0ZSIsImluZGV4T2YiLCJlbGVJbnB1dCIsIm5ld1RhZ0VsZSIsInRhZ1ZhbCIsInNlbGVjdGVkSW5kZXgiLCJtYXRjaCIsImVsZVVuaXQiLCJjbGFzc05hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInlzcFRhZ0VsZSIsImtleSIsImN1cnJlbnRUYXJnZXQiLCJpbnB1dEVsZXMiLCJlbGVJIiwiZm9ybSIsInJlcXVlc3RTdWJtaXQiLCJ5c3BfbWFya0xvdmVkVmVzc2VsIiwiZWxlX2NhcmQiLCJ5YWNodElkIiwiaGFzQ2xhc3MiLCJ5c3BfYWRkTG92ZWRWZXNzZWwiLCJ5c3BfcmVtb3ZlTG92ZWRWZXNzZWwiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibG92ZWRWZXNzZWxzIiwic2V0SXRlbSIsImluZGV4ZWQiLCJzcGxpY2UiLCJZU1BfVmVzc2VsQ29tcGFyZUxpc3QiLCJ5c3BfcmVzdG9yZUNvbXBhcmVzIiwiY29tcGFyZV9wb3N0X2lkcyIsInlzcF9tYWtlQ29tcGFyZUxpbmtvdXQiLCJ5c3BfbWFrZUNvbXBhcmVWZXNzZWwiLCJjaGFuZ2UiLCJ5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCIsInlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0IiwiZGF0YV9yZXN1bHQiLCJyZXN1bHRzIiwiaXRlbSIsImVsZV9wcmV2aWV3IiwieXNwQmVmb3JlWWFjaHRTZWFyY2giLCJFdmVudCIsInlzcEFmdGVyWWFjaHRTZWFyY2giLCJ5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIiLCJjbGFzc0xpc3QiLCJ0aXRsZSIsIlNFTyIsImhlYWRpbmciLCJncHRfcCIsIm1heGltdW1TaWduaWZpY2FudERpZ2l0cyIsInRvdGFsIiwiY3VycmVudFVSTCIsImRvbnRfcHVzaCIsInZpZXciLCJ2ZXNzZWxJbmZvIiwicGFnZV9pbmRleCIsIlJlZ0V4cCIsImZvcm1EYXRhT2JqZWN0IiwiZG9jdW1lbnRFbGVtZW50IiwiYm9keSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsIkZpbGxMaXN0cyIsImxpc3RFbGVtZW50cyIsImxpc3ROZWVkZWRFbGVtZW50cyIsImlucHV0X2VsZSIsImxpc3RfaWQiLCJlbGVfbGlzdCIsIl9sb29wMyIsInlhY2h0U2VhcmNoQW5kUmVzdWx0cyIsIm9tc2UiLCJzdHlsZSIsIm92ZXJmbG93WSIsImRpc3BhdGNoRXZlbnQiLCJhcGlfZGF0YSIsImVsZVJlc2V0IiwiZWxlQ2hlY2siLCJlbGVWaWV3T3B0aW9uIiwiaW5wdXRfbmFtZSIsIm9ubHlfdmFsc19hcnJheSIsIm92IiwidXJsVmFsIiwiX2xvb3A0IiwieXNfeWFjaHRzX2xvdmVkIiwibG92ZWRfeWFjaHRzIiwieXNfb25seV90aGVzZSIsIm1vYmlsZUZvcm0iLCJoYW5kbGVTdWJtaXQiLCJhcGlFbmRwb2ludCIsInN1Y2Nlc3NNZXNzYWdlIiwicGFyZW50RWxlbWVudCIsInlhY2h0Rm9ybXMiLCJmRWxlIiwiYnJva2VyRm9ybXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFBLFVBQUFBLENBQUEsRUFBQTtFQUVBLElBQUFDLE9BQUEsR0FBQTtJQUNBQyxJQUFBLEVBQUEsU0FBQUEsS0FBQUMsT0FBQSxFQUFBO01BQ0EsSUFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLE1BQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxXQUFBLEVBQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxjQUFBLEVBQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxXQUFBLEVBQUEsQ0FBQTtRQUNBQyxVQUFBLEVBQUEsSUFBQTtRQUNBQyxjQUFBLEVBQUEsUUFBQTtRQUNBQyxjQUFBLEVBQUEsRUFBQTtRQUNBQyxRQUFBLEVBQUEsTUFBQTtRQUNBQyxRQUFBLEVBQUEsTUFBQTtRQUNBQyxXQUFBLEVBQUEsVUFBQTtRQUNBQyxjQUFBLEVBQUEsSUFBQTtRQUNBQyxRQUFBLEVBQUEsYUFBQTtRQUNBQyxTQUFBLEVBQUEsRUFBQTtRQUNBQyxRQUFBLEVBQUEsRUFBQTtRQUNBQyxhQUFBLEVBQUEsSUFBQTtRQUNBQyxXQUFBLEVBQUEsS0FBQTtRQUNBQyxlQUFBLEVBQUEsS0FBQTtRQUNBQyxZQUFBLEVBQUEsSUFBQTtRQUNBQyxVQUFBLEVBQUEsSUFBQTtRQUNBQyxXQUFBLEVBQUEsU0FBQUEsWUFBQUMsVUFBQSxFQUFBQyxLQUFBLEVBQUE7VUFDQTtVQUNBO1FBQUEsQ0FDQTtRQUNBQyxNQUFBLEVBQUEsU0FBQUEsT0FBQSxFQUFBO1VBQ0E7UUFBQTtNQUVBLENBQUEs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Q0FBQW1ULEtBQUEsQ0FBQXZQLE9BQUEsR0FBQSxNQUFBO0lBQ0EsQ0FBQSxDQUFBLFNBQ0EsQ0FBQSxVQUFBOUUsS0FBQSxFQUFBO01BQ0F3RixPQUFBLENBQUFDLEdBQUEsQ0FBQXpGLEtBQUEsQ0FBQTtJQUNBLENBQUEsQ0FBQTtFQUNBO0VBRUEsSUFBQXlWLFVBQUEsR0FBQWxWLFFBQUEsQ0FBQTZILGdCQUFBLENBQUEsMkJBQUEsQ0FBQTtFQUNBcU4sVUFBQSxDQUFBcE4sT0FBQSxDQUFBLFVBQUFxTixJQUFBLEVBQUE7SUFDQUEsSUFBQSxDQUFBakksZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQTlKLENBQUEsRUFBQTtNQUNBMFIsWUFBQSxDQUFBMVIsQ0FBQSxFQUFBLGFBQUEsQ0FBQTtJQUNBLENBQUEsQ0FBQTtFQUNBLENBQUEsQ0FBQTtFQUVBLElBQUFnUyxXQUFBLEdBQUFwVixRQUFBLENBQUE2SCxnQkFBQSxDQUFBLDRCQUFBLENBQUE7RUFDQXVOLFdBQUEsQ0FBQXROLE9BQUEsQ0FBQSxVQUFBcU4sSUFBQSxFQUFBO0lBQ0FBLElBQUEsQ0FBQWpJLGdCQUFBLENBQUEsUUFBQSxFQUFBLFVBQUE5SixDQUFBLEVBQUE7TUFDQTBSLFlBQUEsQ0FBQTFSLENBQUEsRUFBQSxjQUFBLENBQUE7SUFDQSxDQUFBLENBQUE7RUFDQSxDQUFBLENBQUE7QUFDQSxDQUFBLENBQUEiLCJmaWxlIjoiZ2xvYmFsUGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIC8qKlxuKiBzaW1wbGVQYWdpbmF0aW9uLmpzIHYxLjZcbiogQSBzaW1wbGUgalF1ZXJ5IHBhZ2luYXRpb24gcGx1Z2luLlxuKiBodHRwOi8vZmxhdml1c21hdGlzLmdpdGh1Yi5jb20vc2ltcGxlUGFnaW5hdGlvbi5qcy9cbipcbiogQ29weXJpZ2h0IDIwMTIsIEZsYXZpdXMgTWF0aXNcbiogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuKiBodHRwOi8vZmxhdml1c21hdGlzLmdpdGh1Yi5jb20vbGljZW5zZS5odG1sXG4qL1xuXG4oZnVuY3Rpb24oJCl7XG5cblx0dmFyIG1ldGhvZHMgPSB7XG5cdFx0aW5pdDogZnVuY3Rpb24ob3B0aW9ucykge1xuXHRcdFx0dmFyIG8gPSAkLmV4dGVuZCh7XG5cdFx0XHRcdGl0ZW1zOiAxLFxuXHRcdFx0XHRpdGVtc09uUGFnZTogMSxcblx0XHRcdFx0cGFnZXM6IDAsXG5cdFx0XHRcdGRpc3BsYXllZFBhZ2VzOiA1LFxuXHRcdFx0XHRlZGdlczogMixcblx0XHRcdFx0Y3VycmVudFBhZ2U6IDAsXG5cdFx0XHRcdHVzZUFuY2hvcnM6IHRydWUsXG5cdFx0XHRcdGhyZWZUZXh0UHJlZml4OiAnI3BhZ2UtJyxcblx0XHRcdFx0aHJlZlRleHRTdWZmaXg6ICcnLFxuXHRcdFx0XHRwcmV2VGV4dDogJ1ByZXYnLFxuXHRcdFx0XHRuZXh0VGV4dDogJ05leHQnLFxuXHRcdFx0XHRlbGxpcHNlVGV4dDogJyZoZWxsaXA7Jyxcblx0XHRcdFx0ZWxsaXBzZVBhZ2VTZXQ6IHRydWUsXG5cdFx0XHRcdGNzc1N0eWxlOiAnbGlnaHQtdGhlbWUnLFxuXHRcdFx0XHRsaXN0U3R5bGU6ICcnLFxuXHRcdFx0XHRsYWJlbE1hcDogW10sXG5cdFx0XHRcdHNlbGVjdE9uQ2xpY2s6IHRydWUsXG5cdFx0XHRcdG5leHRBdEZyb250OiBmYWxzZSxcblx0XHRcdFx0aW52ZXJ0UGFnZU9yZGVyOiBmYWxzZSxcblx0XHRcdFx0dXNlU3RhcnRFZGdlIDogdHJ1ZSxcblx0XHRcdFx0dXNlRW5kRWRnZSA6IHRydWUsXG5cdFx0XHRcdG9uUGFnZUNsaWNrOiBmdW5jdGlvbihwYWdlTnVtYmVyLCBldmVudCkge1xuXHRcdFx0XHRcdC8vIENhbGxiYWNrIHRyaWdnZXJlZCB3aGVuIGEgcGFnZSBpcyBjbGlja2VkXG5cdFx0XHRcdFx0Ly8gUGFnZSBudW1iZXIgaXMgZ2l2ZW4gYXMgYW4gb3B0aW9uYWwgcGFyYW1ldGVyXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9uSW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Ly8gQ2FsbGJhY2sgdHJpZ2dlcmVkIGltbWVkaWF0ZWx5IGFmdGVyIGluaXRpYWxpemF0aW9uXG5cdFx0XHRcdH1cblx0XHRcdH0sIG9wdGlvbnMgfHwge30pO1xuXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRcdG8ucGFnZXMgPSBvLnBhZ2VzID8gby5wYWdlcyA6IE1hdGguY2VpbChvLml0ZW1zIC8gby5pdGVtc09uUGFnZSkgPyBNYXRoLmNlaWwoby5pdGVtcyAvIG8uaXRlbXNPblBhZ2UpIDogMTtcblx0XHRcdGlmIChvLmN1cnJlbnRQYWdlKVxuXHRcdFx0XHRvLmN1cnJlbnRQYWdlID0gby5jdXJyZW50UGFnZSAtIDE7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdG8uY3VycmVudFBhZ2UgPSAhby5pbnZlcnRQYWdlT3JkZXIgPyAwIDogby5wYWdlcyAtIDE7XG5cdFx0XHRvLmhhbGZEaXNwbGF5ZWQgPSBvLmRpc3BsYXllZFBhZ2VzIC8gMjtcblxuXHRcdFx0dGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLmFkZENsYXNzKG8uY3NzU3R5bGUgKyAnIHNpbXBsZS1wYWdpbmF0aW9uJykuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwoc2VsZik7XG5cdFx0XHR9KTtcblxuXHRcdFx0by5vbkluaXQoKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHNlbGVjdFBhZ2U6IGZ1bmN0aW9uKHBhZ2UpIHtcblx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBwYWdlIC0gMSk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0cHJldlBhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPiAwKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgLSAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPCBvLnBhZ2VzIC0gMSkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlICsgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRuZXh0UGFnZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA8IG8ucGFnZXMgLSAxKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgKyAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPiAwKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgLSAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGdldFBhZ2VzQ291bnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLnBhZ2VzO1xuXHRcdH0sXG5cblx0XHRzZXRQYWdlc0NvdW50OiBmdW5jdGlvbihjb3VudCkge1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJykucGFnZXMgPSBjb3VudDtcblx0XHR9LFxuXG5cdFx0Z2V0Q3VycmVudFBhZ2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5jdXJyZW50UGFnZSArIDE7XG5cdFx0fSxcblxuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLmVtcHR5KCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0ZHJhd1BhZ2U6IGZ1bmN0aW9uIChwYWdlKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5jdXJyZW50UGFnZSA9IHBhZ2UgLSAxO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0cmVkcmF3OiBmdW5jdGlvbigpe1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGRpc2FibGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRlbmFibGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0dXBkYXRlSXRlbXM6IGZ1bmN0aW9uIChuZXdJdGVtcykge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uaXRlbXMgPSBuZXdJdGVtcztcblx0XHRcdG8ucGFnZXMgPSBtZXRob2RzLl9nZXRQYWdlcyhvKTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdH0sXG5cblx0XHR1cGRhdGVJdGVtc09uUGFnZTogZnVuY3Rpb24gKGl0ZW1zT25QYWdlKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5pdGVtc09uUGFnZSA9IGl0ZW1zT25QYWdlO1xuXHRcdFx0by5wYWdlcyA9IG1ldGhvZHMuX2dldFBhZ2VzKG8pO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgMCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Z2V0SXRlbXNPblBhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLml0ZW1zT25QYWdlO1xuXHRcdH0sXG5cblx0XHRfZHJhdzogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXJcdG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKSxcblx0XHRcdFx0aW50ZXJ2YWwgPSBtZXRob2RzLl9nZXRJbnRlcnZhbChvKSxcblx0XHRcdFx0aSxcblx0XHRcdFx0dGFnTmFtZTtcblxuXHRcdFx0bWV0aG9kcy5kZXN0cm95LmNhbGwodGhpcyk7XG5cblx0XHRcdHRhZ05hbWUgPSAodHlwZW9mIHRoaXMucHJvcCA9PT0gJ2Z1bmN0aW9uJykgPyB0aGlzLnByb3AoJ3RhZ05hbWUnKSA6IHRoaXMuYXR0cigndGFnTmFtZScpO1xuXG5cdFx0XHR2YXIgJHBhbmVsID0gdGFnTmFtZSA9PT0gJ1VMJyA/IHRoaXMgOiAkKCc8dWwnICsgKG8ubGlzdFN0eWxlID8gJyBjbGFzcz1cIicgKyBvLmxpc3RTdHlsZSArICdcIicgOiAnJykgKyAnPjwvdWw+JykuYXBwZW5kVG8odGhpcyk7XG5cblx0XHRcdC8vIEdlbmVyYXRlIFByZXYgbGlua1xuXHRcdFx0aWYgKG8ucHJldlRleHQpIHtcblx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsICFvLmludmVydFBhZ2VPcmRlciA/IG8uY3VycmVudFBhZ2UgLSAxIDogby5jdXJyZW50UGFnZSArIDEsIHt0ZXh0OiBvLnByZXZUZXh0LCBjbGFzc2VzOiAncHJldid9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgTmV4dCBsaW5rIChpZiBvcHRpb24gc2V0IGZvciBhdCBmcm9udClcblx0XHRcdGlmIChvLm5leHRUZXh0ICYmIG8ubmV4dEF0RnJvbnQpIHtcblx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsICFvLmludmVydFBhZ2VPcmRlciA/IG8uY3VycmVudFBhZ2UgKyAxIDogby5jdXJyZW50UGFnZSAtIDEsIHt0ZXh0OiBvLm5leHRUZXh0LCBjbGFzc2VzOiAnbmV4dCd9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgc3RhcnQgZWRnZXNcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKGludGVydmFsLnN0YXJ0ID4gMCAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmKG8udXNlU3RhcnRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgZW5kID0gTWF0aC5taW4oby5lZGdlcywgaW50ZXJ2YWwuc3RhcnQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGVuZDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG8uZWRnZXMgPCBpbnRlcnZhbC5zdGFydCAmJiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBvLmVkZ2VzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5lbmQgPCBvLnBhZ2VzICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYoby51c2VTdGFydEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBiZWdpbiA9IE1hdGgubWF4KG8ucGFnZXMgLSBvLmVkZ2VzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gby5wYWdlcyAtIDE7IGkgPj0gYmVnaW47IGktLSkge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKG8ucGFnZXMgLSBvLmVkZ2VzID4gaW50ZXJ2YWwuZW5kICYmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBpbnRlcnZhbCBsaW5rc1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRmb3IgKGkgPSBpbnRlcnZhbC5zdGFydDsgaSA8IGludGVydmFsLmVuZDsgaSsrKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKGkgPSBpbnRlcnZhbC5lbmQgLSAxOyBpID49IGludGVydmFsLnN0YXJ0OyBpLS0pIHtcblx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgZW5kIGVkZ2VzXG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5lbmQgPCBvLnBhZ2VzICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYgKG8ucGFnZXMgLSBvLmVkZ2VzID4gaW50ZXJ2YWwuZW5kICYmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihvLnVzZUVuZEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBiZWdpbiA9IE1hdGgubWF4KG8ucGFnZXMgLSBvLmVkZ2VzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gYmVnaW47IGkgPCBvLnBhZ2VzOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGludGVydmFsLnN0YXJ0ID4gMCAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmIChvLmVkZ2VzIDwgaW50ZXJ2YWwuc3RhcnQgJiYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgby5lZGdlcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoby51c2VFbmRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgZW5kID0gTWF0aC5taW4oby5lZGdlcywgaW50ZXJ2YWwuc3RhcnQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gZW5kIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBOZXh0IGxpbmsgKHVubGVzcyBvcHRpb24gaXMgc2V0IGZvciBhdCBmcm9udClcblx0XHRcdGlmIChvLm5leHRUZXh0ICYmICFvLm5leHRBdEZyb250KSB7XG5cdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCAhby5pbnZlcnRQYWdlT3JkZXIgPyBvLmN1cnJlbnRQYWdlICsgMSA6IG8uY3VycmVudFBhZ2UgLSAxLCB7dGV4dDogby5uZXh0VGV4dCwgY2xhc3NlczogJ25leHQnfSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvLmVsbGlwc2VQYWdlU2V0ICYmICFvLmRpc2FibGVkKSB7XG5cdFx0XHRcdG1ldGhvZHMuX2VsbGlwc2VDbGljay5jYWxsKHRoaXMsICRwYW5lbCk7XG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0X2dldFBhZ2VzOiBmdW5jdGlvbihvKSB7XG5cdFx0XHR2YXIgcGFnZXMgPSBNYXRoLmNlaWwoby5pdGVtcyAvIG8uaXRlbXNPblBhZ2UpO1xuXHRcdFx0cmV0dXJuIHBhZ2VzIHx8IDE7XG5cdFx0fSxcblxuXHRcdF9nZXRJbnRlcnZhbDogZnVuY3Rpb24obykge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c3RhcnQ6IE1hdGguY2VpbChvLmN1cnJlbnRQYWdlID4gby5oYWxmRGlzcGxheWVkID8gTWF0aC5tYXgoTWF0aC5taW4oby5jdXJyZW50UGFnZSAtIG8uaGFsZkRpc3BsYXllZCwgKG8ucGFnZXMgLSBvLmRpc3BsYXllZFBhZ2VzKSksIDApIDogMCksXG5cdFx0XHRcdGVuZDogTWF0aC5jZWlsKG8uY3VycmVudFBhZ2UgPiBvLmhhbGZEaXNwbGF5ZWQgPyBNYXRoLm1pbihvLmN1cnJlbnRQYWdlICsgby5oYWxmRGlzcGxheWVkLCBvLnBhZ2VzKSA6IE1hdGgubWluKG8uZGlzcGxheWVkUGFnZXMsIG8ucGFnZXMpKVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0X2FwcGVuZEl0ZW06IGZ1bmN0aW9uKHBhZ2VJbmRleCwgb3B0cykge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLCBvcHRpb25zLCAkbGluaywgbyA9IHNlbGYuZGF0YSgncGFnaW5hdGlvbicpLCAkbGlua1dyYXBwZXIgPSAkKCc8bGk+PC9saT4nKSwgJHVsID0gc2VsZi5maW5kKCd1bCcpO1xuXG5cdFx0XHRwYWdlSW5kZXggPSBwYWdlSW5kZXggPCAwID8gMCA6IChwYWdlSW5kZXggPCBvLnBhZ2VzID8gcGFnZUluZGV4IDogby5wYWdlcyAtIDEpO1xuXG5cdFx0XHRvcHRpb25zID0ge1xuXHRcdFx0XHR0ZXh0OiBwYWdlSW5kZXggKyAxLFxuXHRcdFx0XHRjbGFzc2VzOiAnJ1xuXHRcdFx0fTtcblxuXHRcdFx0aWYgKG8ubGFiZWxNYXAubGVuZ3RoICYmIG8ubGFiZWxNYXBbcGFnZUluZGV4XSkge1xuXHRcdFx0XHRvcHRpb25zLnRleHQgPSBvLmxhYmVsTWFwW3BhZ2VJbmRleF07XG5cdFx0XHR9XG5cblx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZChvcHRpb25zLCBvcHRzIHx8IHt9KTtcblxuXHRcdFx0aWYgKHBhZ2VJbmRleCA9PSBvLmN1cnJlbnRQYWdlIHx8IG8uZGlzYWJsZWQpIHtcblx0XHRcdFx0aWYgKG8uZGlzYWJsZWQgfHwgb3B0aW9ucy5jbGFzc2VzID09PSAncHJldicgfHwgb3B0aW9ucy5jbGFzc2VzID09PSAnbmV4dCcpIHtcblx0XHRcdFx0XHQkbGlua1dyYXBwZXIuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JGxpbmtXcmFwcGVyLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkbGluayA9ICQoJzxzcGFuIGNsYXNzPVwiY3VycmVudFwiPicgKyAob3B0aW9ucy50ZXh0KSArICc8L3NwYW4+Jyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoby51c2VBbmNob3JzKSB7XG5cdFx0XHRcdFx0JGxpbmsgPSAkKCc8YSBocmVmPVwiJyArIG8uaHJlZlRleHRQcmVmaXggKyAocGFnZUluZGV4ICsgMSkgKyBvLmhyZWZUZXh0U3VmZml4ICsgJ1wiIGNsYXNzPVwicGFnZS1saW5rXCI+JyArIChvcHRpb25zLnRleHQpICsgJzwvYT4nKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkbGluayA9ICQoJzxzcGFuID4nICsgKG9wdGlvbnMudGV4dCkgKyAnPC9zcGFuPicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCRsaW5rLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRcdFx0XHRyZXR1cm4gbWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHNlbGYsIHBhZ2VJbmRleCwgZXZlbnQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdGlvbnMuY2xhc3Nlcykge1xuXHRcdFx0XHQkbGluay5hZGRDbGFzcyhvcHRpb25zLmNsYXNzZXMpO1xuXHRcdFx0fVxuXG5cdFx0XHQkbGlua1dyYXBwZXIuYXBwZW5kKCRsaW5rKTtcblxuXHRcdFx0aWYgKCR1bC5sZW5ndGgpIHtcblx0XHRcdFx0JHVsLmFwcGVuZCgkbGlua1dyYXBwZXIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2VsZi5hcHBlbmQoJGxpbmtXcmFwcGVyKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3NlbGVjdFBhZ2U6IGZ1bmN0aW9uKHBhZ2VJbmRleCwgZXZlbnQpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmN1cnJlbnRQYWdlID0gcGFnZUluZGV4O1xuXHRcdFx0aWYgKG8uc2VsZWN0T25DbGljaykge1xuXHRcdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gby5vblBhZ2VDbGljayhwYWdlSW5kZXggKyAxLCBldmVudCk7XG5cdFx0fSxcblxuXG5cdFx0X2VsbGlwc2VDbGljazogZnVuY3Rpb24oJHBhbmVsKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKSxcblx0XHRcdFx0JGVsbGlwID0gJHBhbmVsLmZpbmQoJy5lbGxpcHNlJyk7XG5cdFx0XHQkZWxsaXAuYWRkQ2xhc3MoJ2NsaWNrYWJsZScpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0JGVsbGlwLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGlmICghby5kaXNhYmxlKSB7XG5cdFx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcblx0XHRcdFx0XHRcdHZhbCA9IChwYXJzZUludCgkdGhpcy5wYXJlbnQoKS5wcmV2KCkudGV4dCgpLCAxMCkgfHwgMCkgKyAxO1xuXHRcdFx0XHRcdCR0aGlzXG5cdFx0XHRcdFx0XHQuaHRtbCgnPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIxXCIgbWF4PVwiJyArIG8ucGFnZXMgKyAnXCIgc3RlcD1cIjFcIiB2YWx1ZT1cIicgKyB2YWwgKyAnXCI+Jylcblx0XHRcdFx0XHRcdC5maW5kKCdpbnB1dCcpXG5cdFx0XHRcdFx0XHQuZm9jdXMoKVxuXHRcdFx0XHRcdFx0LmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdC8vIHByZXZlbnQgaW5wdXQgbnVtYmVyIGFycm93cyBmcm9tIGJ1YmJsaW5nIGEgY2xpY2sgZXZlbnQgb24gJGVsbGlwXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5rZXl1cChmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50LndoaWNoID09PSAxMyAmJiB2YWwgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gZW50ZXIgdG8gYWNjZXB0XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCh2YWw+MCkmJih2YWw8PW8ucGFnZXMpKVxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbChzZWxmLCB2YWwgLSAxKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChldmVudC53aGljaCA9PT0gMjcpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBlc2NhcGUgdG8gY2FuY2VsXG5cdFx0XHRcdFx0XHRcdFx0JGVsbGlwLmVtcHR5KCkuaHRtbChvLmVsbGlwc2VUZXh0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5iaW5kKCdibHVyJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cdFx0XHRcdFx0XHRcdGlmICh2YWwgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHNlbGYsIHZhbCAtIDEpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCRlbGxpcC5lbXB0eSgpLmh0bWwoby5lbGxpcHNlVGV4dCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9O1xuXG5cdCQuZm4ucGFnaW5hdGlvbiA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuXG5cdFx0Ly8gTWV0aG9kIGNhbGxpbmcgbG9naWNcblx0XHRpZiAobWV0aG9kc1ttZXRob2RdICYmIG1ldGhvZC5jaGFyQXQoMCkgIT0gJ18nKSB7XG5cdFx0XHRyZXR1cm4gbWV0aG9kc1ttZXRob2RdLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ29iamVjdCcgfHwgIW1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIG1ldGhvZHMuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkLmVycm9yKCdNZXRob2QgJyArICBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5wYWdpbmF0aW9uJyk7XG5cdFx0fVxuXG5cdH07XG5cbn0pKGpRdWVyeSk7IiwiLypcbiAgICBBIHNpbXBsZSBqUXVlcnkgbW9kYWwgKGh0dHA6Ly9naXRodWIuY29tL2t5bGVmb3gvanF1ZXJ5LW1vZGFsKVxuICAgIFZlcnNpb24gMC45LjJcbiovXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAvLyBNYWtpbmcgeW91ciBqUXVlcnkgcGx1Z2luIHdvcmsgYmV0dGVyIHdpdGggbnBtIHRvb2xzXG4gIC8vIGh0dHA6Ly9ibG9nLm5wbWpzLm9yZy9wb3N0LzExMjcxMjE2OTgzMC9tYWtpbmcteW91ci1qcXVlcnktcGx1Z2luLXdvcmstYmV0dGVyLXdpdGgtbnBtXG4gIGlmKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCB3aW5kb3csIGRvY3VtZW50KTtcbiAgfVxuICBlbHNlIHtcbiAgICBmYWN0b3J5KGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCk7XG4gIH1cbn0oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG5cbiAgdmFyIG1vZGFscyA9IFtdLFxuICAgICAgZ2V0Q3VycmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbW9kYWxzLmxlbmd0aCA/IG1vZGFsc1ttb2RhbHMubGVuZ3RoIC0gMV0gOiBudWxsO1xuICAgICAgfSxcbiAgICAgIHNlbGVjdEN1cnJlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBzZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGk9bW9kYWxzLmxlbmd0aC0xOyBpPj0wOyBpLS0pIHtcbiAgICAgICAgICBpZiAobW9kYWxzW2ldLiRibG9ja2VyKSB7XG4gICAgICAgICAgICBtb2RhbHNbaV0uJGJsb2NrZXIudG9nZ2xlQ2xhc3MoJ2N1cnJlbnQnLCFzZWxlY3RlZCkudG9nZ2xlQ2xhc3MoJ2JlaGluZCcsc2VsZWN0ZWQpO1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAkLnlzcF9tb2RhbCA9IGZ1bmN0aW9uKGVsLCBvcHRpb25zKSB7XG4gICAgdmFyIHJlbW92ZSwgdGFyZ2V0O1xuICAgIHRoaXMuJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sICQueXNwX21vZGFsLmRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICB0aGlzLm9wdGlvbnMuZG9GYWRlID0gIWlzTmFOKHBhcnNlSW50KHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24sIDEwKSk7XG4gICAgdGhpcy4kYmxvY2tlciA9IG51bGw7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZUV4aXN0aW5nKVxuICAgICAgd2hpbGUgKCQueXNwX21vZGFsLmlzQWN0aXZlKCkpXG4gICAgICAgICQueXNwX21vZGFsLmNsb3NlKCk7IC8vIENsb3NlIGFueSBvcGVuIG1vZGFscy5cbiAgICBtb2RhbHMucHVzaCh0aGlzKTtcbiAgICBpZiAoZWwuaXMoJ2EnKSkge1xuICAgICAgdGFyZ2V0ID0gZWwuYXR0cignaHJlZicpO1xuICAgICAgdGhpcy5hbmNob3IgPSBlbDtcbiAgICAgIC8vU2VsZWN0IGVsZW1lbnQgYnkgaWQgZnJvbSBocmVmXG4gICAgICBpZiAoL14jLy50ZXN0KHRhcmdldCkpIHtcbiAgICAgICAgdGhpcy4kZWxtID0gJCh0YXJnZXQpO1xuICAgICAgICBpZiAodGhpcy4kZWxtLmxlbmd0aCAhPT0gMSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuJGVsbSk7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgLy9BSkFYXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRlbG0gPSAkKCc8ZGl2PicpO1xuICAgICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLiRlbG0pO1xuICAgICAgICByZW1vdmUgPSBmdW5jdGlvbihldmVudCwgbW9kYWwpIHsgbW9kYWwuZWxtLnJlbW92ZSgpOyB9O1xuICAgICAgICB0aGlzLnNob3dTcGlubmVyKCk7XG4gICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9TRU5EKTtcbiAgICAgICAgJC5nZXQodGFyZ2V0KS5kb25lKGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICBpZiAoISQueXNwX21vZGFsLmlzQWN0aXZlKCkpIHJldHVybjtcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfU1VDQ0VTUyk7XG4gICAgICAgICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgICAgICAgY3VycmVudC4kZWxtLmVtcHR5KCkuYXBwZW5kKGh0bWwpLm9uKCQueXNwX21vZGFsLkNMT1NFLCByZW1vdmUpO1xuICAgICAgICAgIGN1cnJlbnQuaGlkZVNwaW5uZXIoKTtcbiAgICAgICAgICBjdXJyZW50Lm9wZW4oKTtcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfQ09NUExFVEUpO1xuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9GQUlMKTtcbiAgICAgICAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcbiAgICAgICAgICBjdXJyZW50LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgbW9kYWxzLnBvcCgpOyAvLyByZW1vdmUgZXhwZWN0ZWQgbW9kYWwgZnJvbSB0aGUgbGlzdFxuICAgICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9DT01QTEVURSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbG0gPSBlbDtcbiAgICAgIHRoaXMuYW5jaG9yID0gZWw7XG4gICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLiRlbG0pO1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICB9O1xuXG4gICQueXNwX21vZGFsLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogJC55c3BfbW9kYWwsXG5cbiAgICBvcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBtID0gdGhpcztcbiAgICAgIHRoaXMuYmxvY2soKTtcbiAgICAgIHRoaXMuYW5jaG9yLmJsdXIoKTtcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBtLnNob3coKTtcbiAgICAgICAgfSwgdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiAqIHRoaXMub3B0aW9ucy5mYWRlRGVsYXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICB9XG4gICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleWRvd24ubW9kYWwnKS5vbigna2V5ZG93bi5tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDI3ICYmIGN1cnJlbnQub3B0aW9ucy5lc2NhcGVDbG9zZSkgY3VycmVudC5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNsaWNrQ2xvc2UpXG4gICAgICAgIHRoaXMuJGJsb2NrZXIuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gdGhpcylcbiAgICAgICAgICAgICQueXNwX21vZGFsLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICBtb2RhbHMucG9wKCk7XG4gICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgaWYgKCEkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKVxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleWRvd24ubW9kYWwnKTtcbiAgICB9LFxuXG4gICAgYmxvY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkVGT1JFX0JMT0NLLCBbdGhpcy5fY3R4KCldKTtcbiAgICAgIHRoaXMuJGJvZHkuY3NzKCdvdmVyZmxvdycsJ2hpZGRlbicpO1xuICAgICAgdGhpcy4kYmxvY2tlciA9ICQoJzxkaXYgY2xhc3M9XCInICsgdGhpcy5vcHRpb25zLmJsb2NrZXJDbGFzcyArICcgYmxvY2tlciBjdXJyZW50XCI+PC9kaXY+JykuYXBwZW5kVG8odGhpcy4kYm9keSk7XG4gICAgICBzZWxlY3RDdXJyZW50KCk7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuZG9GYWRlKSB7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIuY3NzKCdvcGFjaXR5JywwKS5hbmltYXRlKHtvcGFjaXR5OiAxfSwgdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbik7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5CTE9DSywgW3RoaXMuX2N0eCgpXSk7XG4gICAgfSxcblxuICAgIHVuYmxvY2s6IGZ1bmN0aW9uKG5vdykge1xuICAgICAgaWYgKCFub3cgJiYgdGhpcy5vcHRpb25zLmRvRmFkZSlcbiAgICAgICAgdGhpcy4kYmxvY2tlci5mYWRlT3V0KHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24sIHRoaXMudW5ibG9jay5iaW5kKHRoaXMsdHJ1ZSkpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIuY2hpbGRyZW4oKS5hcHBlbmRUbyh0aGlzLiRib2R5KTtcbiAgICAgICAgdGhpcy4kYmxvY2tlci5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy4kYmxvY2tlciA9IG51bGw7XG4gICAgICAgIHNlbGVjdEN1cnJlbnQoKTtcbiAgICAgICAgaWYgKCEkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKVxuICAgICAgICAgIHRoaXMuJGJvZHkuY3NzKCdvdmVyZmxvdycsJycpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkJFRk9SRV9PUEVOLCBbdGhpcy5fY3R4KCldKTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2hvd0Nsb3NlKSB7XG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24gPSAkKCc8YSBocmVmPVwiI2Nsb3NlLW1vZGFsXCIgcmVsPVwibW9kYWw6Y2xvc2VcIiBjbGFzcz1cImNsb3NlLW1vZGFsICcgKyB0aGlzLm9wdGlvbnMuY2xvc2VDbGFzcyArICdcIj4nICsgdGhpcy5vcHRpb25zLmNsb3NlVGV4dCArICc8L2E+Jyk7XG4gICAgICAgIHRoaXMuJGVsbS5hcHBlbmQodGhpcy5jbG9zZUJ1dHRvbik7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbG0uYWRkQ2xhc3ModGhpcy5vcHRpb25zLm1vZGFsQ2xhc3MpLmFwcGVuZFRvKHRoaXMuJGJsb2NrZXIpO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmRvRmFkZSkge1xuICAgICAgICB0aGlzLiRlbG0uY3NzKHtvcGFjaXR5OiAwLCBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ30pLmFuaW1hdGUoe29wYWNpdHk6IDF9LCB0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsbS5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5PUEVOLCBbdGhpcy5fY3R4KCldKTtcbiAgICB9LFxuXG4gICAgaGlkZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5CRUZPUkVfQ0xPU0UsIFt0aGlzLl9jdHgoKV0pO1xuICAgICAgaWYgKHRoaXMuY2xvc2VCdXR0b24pIHRoaXMuY2xvc2VCdXR0b24ucmVtb3ZlKCk7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmRvRmFkZSkge1xuICAgICAgICB0aGlzLiRlbG0uZmFkZU91dCh0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkFGVEVSX0NMT1NFLCBbX3RoaXMuX2N0eCgpXSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZWxtLmhpZGUoMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5BRlRFUl9DTE9TRSwgW190aGlzLl9jdHgoKV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkNMT1NFLCBbdGhpcy5fY3R4KCldKTtcbiAgICB9LFxuXG4gICAgc2hvd1NwaW5uZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuc2hvd1NwaW5uZXIpIHJldHVybjtcbiAgICAgIHRoaXMuc3Bpbm5lciA9IHRoaXMuc3Bpbm5lciB8fCAkKCc8ZGl2IGNsYXNzPVwiJyArIHRoaXMub3B0aW9ucy5tb2RhbENsYXNzICsgJy1zcGlubmVyXCI+PC9kaXY+JylcbiAgICAgICAgLmFwcGVuZCh0aGlzLm9wdGlvbnMuc3Bpbm5lckh0bWwpO1xuICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy5zcGlubmVyKTtcbiAgICAgIHRoaXMuc3Bpbm5lci5zaG93KCk7XG4gICAgfSxcblxuICAgIGhpZGVTcGlubmVyOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnNwaW5uZXIpIHRoaXMuc3Bpbm5lci5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgLy9SZXR1cm4gY29udGV4dCBmb3IgY3VzdG9tIGV2ZW50c1xuICAgIF9jdHg6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHsgZWxtOiB0aGlzLiRlbG0sICRlbG06IHRoaXMuJGVsbSwgJGJsb2NrZXI6IHRoaXMuJGJsb2NrZXIsIG9wdGlvbnM6IHRoaXMub3B0aW9ucywgJGFuY2hvcjogdGhpcy5hbmNob3IgfTtcbiAgICB9XG4gIH07XG5cbiAgJC55c3BfbW9kYWwuY2xvc2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSkgcmV0dXJuO1xuICAgIGlmIChldmVudCkgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcbiAgICBjdXJyZW50LmNsb3NlKCk7XG4gICAgcmV0dXJuIGN1cnJlbnQuJGVsbTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGlmIHRoZXJlIGN1cnJlbnRseSBpcyBhbiBhY3RpdmUgbW9kYWxcbiAgJC55c3BfbW9kYWwuaXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG1vZGFscy5sZW5ndGggPiAwO1xuICB9O1xuXG4gICQueXNwX21vZGFsLmdldEN1cnJlbnQgPSBnZXRDdXJyZW50O1xuXG4gICQueXNwX21vZGFsLmRlZmF1bHRzID0ge1xuICAgIGNsb3NlRXhpc3Rpbmc6IHRydWUsXG4gICAgZXNjYXBlQ2xvc2U6IHRydWUsXG4gICAgY2xpY2tDbG9zZTogdHJ1ZSxcbiAgICBjbG9zZVRleHQ6ICdDbG9zZScsXG4gICAgY2xvc2VDbGFzczogJycsXG4gICAgbW9kYWxDbGFzczogXCJ5c3AtbW9kYWxcIixcbiAgICBibG9ja2VyQ2xhc3M6IFwianF1ZXJ5LW1vZGFsXCIsXG4gICAgc3Bpbm5lckh0bWw6ICc8ZGl2IGNsYXNzPVwicmVjdDFcIj48L2Rpdj48ZGl2IGNsYXNzPVwicmVjdDJcIj48L2Rpdj48ZGl2IGNsYXNzPVwicmVjdDNcIj48L2Rpdj48ZGl2IGNsYXNzPVwicmVjdDRcIj48L2Rpdj4nLFxuICAgIHNob3dTcGlubmVyOiB0cnVlLFxuICAgIHNob3dDbG9zZTogdHJ1ZSxcbiAgICBmYWRlRHVyYXRpb246IG51bGwsICAgLy8gTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGUgZmFkZSBhbmltYXRpb24gdGFrZXMuXG4gICAgZmFkZURlbGF5OiAxLjAgICAgICAgIC8vIFBvaW50IGR1cmluZyB0aGUgb3ZlcmxheSdzIGZhZGUtaW4gdGhhdCB0aGUgbW9kYWwgYmVnaW5zIHRvIGZhZGUgaW4gKC41ID0gNTAlLCAxLjUgPSAxNTAlLCBldGMuKVxuICB9O1xuXG4gIC8vIEV2ZW50IGNvbnN0YW50c1xuICAkLnlzcF9tb2RhbC5CRUZPUkVfQkxPQ0sgPSAnbW9kYWw6YmVmb3JlLWJsb2NrJztcbiAgJC55c3BfbW9kYWwuQkxPQ0sgPSAnbW9kYWw6YmxvY2snO1xuICAkLnlzcF9tb2RhbC5CRUZPUkVfT1BFTiA9ICdtb2RhbDpiZWZvcmUtb3Blbic7XG4gICQueXNwX21vZGFsLk9QRU4gPSAnbW9kYWw6b3Blbic7XG4gICQueXNwX21vZGFsLkJFRk9SRV9DTE9TRSA9ICdtb2RhbDpiZWZvcmUtY2xvc2UnO1xuICAkLnlzcF9tb2RhbC5DTE9TRSA9ICdtb2RhbDpjbG9zZSc7XG4gICQueXNwX21vZGFsLkFGVEVSX0NMT1NFID0gJ21vZGFsOmFmdGVyLWNsb3NlJztcbiAgJC55c3BfbW9kYWwuQUpBWF9TRU5EID0gJ21vZGFsOmFqYXg6c2VuZCc7XG4gICQueXNwX21vZGFsLkFKQVhfU1VDQ0VTUyA9ICdtb2RhbDphamF4OnN1Y2Nlc3MnO1xuICAkLnlzcF9tb2RhbC5BSkFYX0ZBSUwgPSAnbW9kYWw6YWpheDpmYWlsJztcbiAgJC55c3BfbW9kYWwuQUpBWF9DT01QTEVURSA9ICdtb2RhbDphamF4OmNvbXBsZXRlJztcblxuICAkLmZuLnlzcF9tb2RhbCA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgbmV3ICQueXNwX21vZGFsKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBBdXRvbWF0aWNhbGx5IGJpbmQgbGlua3Mgd2l0aCByZWw9XCJtb2RhbDpjbG9zZVwiIHRvLCB3ZWxsLCBjbG9zZSB0aGUgbW9kYWwuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5tb2RhbCcsICdhW3JlbH49XCJtb2RhbDpjbG9zZVwiXScsICQueXNwX21vZGFsLmNsb3NlKTtcbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLm1vZGFsJywgJ2FbcmVsfj1cIm1vZGFsOm9wZW5cIl0nLCBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCh0aGlzKS5tb2RhbCgpO1xuICB9KTtcbn0pKTsiLCJqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICBcbiAgalF1ZXJ5KCdbZGF0YS1tb2RhbF0nKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCdmdWNrIG1lICcpO1xuXG4gICAgdmFyIGRhdGFfbW9kYWwgPSBqUXVlcnkodGhpcykuZGF0YSgnbW9kYWwnKTtcblxuICAgIGpRdWVyeSggZGF0YV9tb2RhbCApLnlzcF9tb2RhbCh7XG4gICAgXHRjbG9zZVRleHQ6ICdYJyxcbiAgICAgIG1vZGFsQ2xhc3M6ICd5c3AtbW9kYWwtb3BlbicsXG4gICAgICBjbG9zZUNsYXNzOiAneXNwLW1vZGVsLWNsb3NlJ1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBjb3B5TGluaygpIHtcblxuICB2YXIgY29weVRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvcHlMaW5rSW5wdXRcIik7XG5cbiAgY29weVRleHQuc2VsZWN0KCk7XG4gIGNvcHlUZXh0LnNldFNlbGVjdGlvblJhbmdlKDAsIDk5OTk5KTtcblxuICBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XG5cbiAgYWxlcnQoXCJDb3BpZWQgdGhlIGxpbms6IFwiICsgY29weVRleHQudmFsdWUpO1xufSIsIk9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdHJpbmcucHJvdG90eXBlLCAnZWFjaFdvcmRDYXBpdGFsaXplJywge1xuICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9Mb3dlckNhc2UoKVxuICAgIC5zcGxpdCgnICcpXG4gICAgLm1hcCgocykgPT4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc3Vic3RyaW5nKDEpKVxuICAgIC5qb2luKCcgJyk7XG4gIH0sXG4gIGVudW1lcmFibGU6IGZhbHNlXG59KTtcblxuZnVuY3Rpb24gcmFpeXNfZ2V0X2Zvcm1fZGF0YShmb3JtX2VsZSkge1xuICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSggZm9ybV9lbGUgKTtcblxuICAgIGxldCBmZD1PYmplY3QuZnJvbUVudHJpZXMoZm9ybURhdGEuZW50cmllcygpKTtcblxuICAgIGZvciAoY29uc3QgW2ZJbmRleCwgZmllbGRdIG9mIE9iamVjdC5lbnRyaWVzKGZkKSkge1xuXG4gICAgICAgIGxldCBWYWxBcnJheSA9IGZvcm1EYXRhLmdldEFsbChmSW5kZXgpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgVmFsQXJyYXlbMV0gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGZkWyBmSW5kZXggXSA9IFZhbEFycmF5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZkWyBmSW5kZXggXSA9PSAnJykge1xuICAgICAgICAgICAgZGVsZXRlIGZkW2ZJbmRleF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmQ7XG59XG5cbmZ1bmN0aW9uIHJhaXlzX3NldF9mb3JtX3RvX2RhdGEoaW5wdXREYXRhKSB7XG5cbiAgICBsZXQgZm9ybUE9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpO1xuICAgIGxldCBmb3JtQj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybScpO1xuXG4gICAgZm9ybUEucmVzZXQoKTtcbiAgICBmb3JtQi5yZXNldCgpO1xuXG4gICAgbGV0IGZvcm1JbnB1dHM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AteWFjaHQtc2VhcmNoLWZvcm1cIl0sICN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm1cIl0nKTtcblxuICAgIGZvcm1JbnB1dHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgIGxldCBpbnB1dCA9IGVsZTtcblxuICAgICAgICBsZXQgbmFtZSA9IGVsZS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICBsZXQgaGFzUHJldHR5ID0gaW5wdXREYXRhWyBuYW1lIF07XG5cbiAgICAgICAvLyBjb25zb2xlLmxvZyhoYXNQcmV0dHkpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgaGFzUHJldHR5ICE9ICdudWxsJyAmJiB0eXBlb2YgaGFzUHJldHR5ICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGhhc1ByZXR0eSkpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgICAgICAgICBoYXNQcmV0dHkuZm9yRWFjaCgoaFApID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoUCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaGFzUHJldHR5ICkge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUgIT0gJ2NoZWNrYm94JyAmJiBpbnB1dC50eXBlICE9ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBoYXNQcmV0dHk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByYWl5c19wdXNoX2hpc3RvcnkoIGRhdGEgPSB7fSApIHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgIGxldCBzdHJwYXRoPScnO1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGxldCBpdCA9IGRhdGFbIHByb3BlcnR5IF07XG5cblxuICAgICAgICBpZiAoaXQgIT0gJycgJiYgdHlwZW9mIGl0ICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBpdCA9PSAnc3RyaW5nJyAmJiBwcm9wZXJ0eSAhPSAnT25GaXJzdExvYWQnICYmIHR5cGVvZiBpdCAhPSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChwcm9wZXJ0eSwgaXQpO1xuXG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgrXCJcIitwcm9wZXJ0eSsnLScrKGl0LnRvU3RyaW5nKCkuc3BsaXQoJyAnKS5qb2luKCctJykpKycvJztcbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXQpKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KHByb3BlcnR5LCBpdCk7XG5cbiAgICAgICAgICAgIGl0ID0gaXQubWFwKChwcm9wKSA9PiB7IHJldHVybiBwcm9wLnRvU3RyaW5nKCkuc3BsaXQoJyAnKS5qb2luKCctJyk7IH0pO1xuXG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgrXCJcIitwcm9wZXJ0eSsnLScrKCBpdC5qb2luKFwiK1wiKSApKycvJztcbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aC50b0xvd2VyQ2FzZSgpOyAgXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy9oaXN0b3J5LnB1c2hTdGF0ZShkYXRhLCAnJywgcmFpX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3VybCsnPycrc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCkpO1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKGRhdGEsICcnLCByYWlfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfdXJsK3N0cnBhdGgpO1xuXG4gICAgcmV0dXJuIHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF91cmwrc3RycGF0aDsgICAgXG59XG5cbiIsInZhciByYWlfeXNwX2FwaT17fTtcblxuICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpPWZ1bmN0aW9uKG1ldGhvZCwgcGF0aCwgcGFzc2luZ19kYXRhKSB7XG4gICAgICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZURhdGEgPSBKU09OLnBhcnNlKCB0aGlzLnJlc3BvbnNlVGV4dCApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VEYXRhKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnR0VUJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFzc2luZ19kYXRhLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHBhc3NpbmdfZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQocHJvcGVydHksIHBhc3NpbmdfZGF0YVsgcHJvcGVydHkgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBfcXVlc3Rpb25NYXJrPXNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgcmFpX3lhY2h0X3N5bmMud3BfcmVzdF91cmwrXCJyYWl5cy9cIisgcGF0aCArICgoX3F1ZXN0aW9uTWFyayAhPSAnJyk/Jz8nK3NlYXJjaFBhcmFtcy50b1N0cmluZygpOicnKSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2VuZCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnUE9TVCc6XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAub3BlbihcIlBPU1RcIiwgcmFpX3lhY2h0X3N5bmMud3BfcmVzdF91cmwrXCJyYWl5cy9cIisgcGF0aCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KHBhc3NpbmdfZGF0YSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfTsiLCJ2YXIgeXNwX3RlbXBsYXRlcz17fTtcblx0eXNwX3RlbXBsYXRlcy55YWNodD17fTtcblx0XG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQuZ3JpZD1mdW5jdGlvbih2ZXNzZWwsIHBhcmFtcykge1xuXHRcdGxldCBtZXRlcnMgPSBwYXJzZUludCh2ZXNzZWwuTm9taW5hbExlbmd0aCkgKiAwLjMwNDg7XG5cblx0XHRsZXQgcHJpY2UgPSAnJztcblx0XHRsZXQgbGVuZ3RoID0gJyc7XG5cblx0XHRpZiAocmFpX3lhY2h0X3N5bmMuZXVyb3BlX29wdGlvbl9waWNrZWQgPT0gXCJ5ZXNcIikge1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblx0XHRcdHByaWNlID0gKHR5cGVvZiB2ZXNzZWwuWVNQX0V1cm9WYWwgIT0gJ3VuZGVmaW5lZCcgJiYgdmVzc2VsLllTUF9FdXJvVmFsID4gMCkgPyBg4oKsJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQodmVzc2VsLllTUF9FdXJvVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0fSBcblx0XHRlbHNlIHtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gdmVzc2VsLk5vbWluYWxMZW5ndGggKyBcIiAvIFwiICsgbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cblx0XHRcdGlmIChwYXJhbXMuY3VycmVuY3kgPT0gJ0V1cicpIHtcblx0XHRcdFx0cHJpY2UgPSAodHlwZW9mIHZlc3NlbC5ZU1BfVVNEVmFsICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5ZU1BfVVNEVmFsID4gMCkgPyBg4oKsJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQodmVzc2VsLllTUF9FdXJvVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cHJpY2UgPSAodHlwZW9mIHZlc3NlbC5ZU1BfVVNEVmFsICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5ZU1BfVVNEVmFsID4gMCkgPyBgJCR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHZlc3NlbC5ZU1BfVVNEVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gYFxuXHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXJlc3VsdC1ncmlkLWl0ZW1cIiBkYXRhLXBvc3QtaWQ9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCIgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2UtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGEgY2xhc3M9XCJ5YWNodC1kZXRhaWxzXCIgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZVwiIHNyYz1cIiR7dmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogcmFpX3lhY2h0X3N5bmMuYXNzZXRzX3VybCArICdpbWFnZXMvZGVmYXVsdC15YWNodC1pbWFnZS5qcGVnJ31cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblx0XHRcdFx0XHRcdCR7dmVzc2VsLkNvbXBhbnlOYW1lID09PSByYWlfeWFjaHRfc3luYy5jb21wYW55X25hbWUgPyBgPGRpdiBjbGFzcz1cImNvbXBhbnktYmFubmVyXCI+PGltZyBzcmM9XCIke3JhaV95YWNodF9zeW5jLmNvbXBhbnlfbG9nb31cIj48L2Rpdj5gIDogJyd9XG5cdFx0XHRcdFx0PC9hPlx0XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtZ2VuZXJhbC1pbmZvLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC10aXRsZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxhIGNsYXNzPVwieWFjaHQtZGV0YWlsc1wiIGhyZWY9XCIkeyB2ZXNzZWwuX2xpbmsgfVwiPlxuXHRcdFx0XHRcdFx0XHQ8aDYgY2xhc3M9XCJ5YWNodC10aXRsZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnJ30gJHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJyd9ICR7dmVzc2VsLk1vZGVsID8gdmVzc2VsLk1vZGVsIDogJyd9ICR7dmVzc2VsLkJvYXROYW1lID8gdmVzc2VsLkJvYXROYW1lIDogJyd9PC9oNj5cblx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5mby1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmZvXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPlllYXI8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkNhYmluczwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5DYWJpbnNDb3VudE51bWVyaWMgPyB2ZXNzZWwuQ2FiaW5zQ291bnROdW1lcmljIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+QnVpbGRlcjwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5MZW5ndGg8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHtsZW5ndGh9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+Q29tcGFyZTwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJjb21wYXJlX3RvZ2dsZVwiIG5hbWU9XCJjb21wYXJlXCIgdmFsdWU9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCIgLz48L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXByaWNlLWRldGFpbHMtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcHJpY2UtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtcHJpY2VcIj4ke3ByaWNlfTwvcD5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwieWFjaHQtZG93bmxvYWQtYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtbW9kYWw9XCIjc2luZ2xlLXNoYXJlXCI+Q29udGFjdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cImxvdmVcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5MaWtlZDwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cdH07XG5cblx0eXNwX3RlbXBsYXRlcy55YWNodC5saXN0PWZ1bmN0aW9uKHZlc3NlbCkge1xuXHRcdGxldCBtZXRlcnMgPSBwYXJzZUludCh2ZXNzZWwuTm9taW5hbExlbmd0aCkgKiAwLjMwNDg7XG5cdFx0bGV0IHByaWNlID0gJyc7XG5cblx0XHRpZiAodHlwZW9mIHZlc3NlbC5QcmljZSA9PSAnc3RyaW5nJykge1xuXHRcdFx0bGV0IHByaWNlID0gdmVzc2VsLlByaWNlLnNsaWNlKDAsIC0zKTtcblx0XHR9XG5cdFx0XG5cdFx0bGV0IGxlbmd0aCA9ICcnO1xuXHRcdFxuXHRcdGlmKHJhaV95YWNodF9zeW5jLmV1cm9wZV9vcHRpb25fcGlja2VkID09IFwieWVzXCIpe1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblx0XHRcdHByaWNlID0gdmVzc2VsLlByaWNlID8gYOKCrCAke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdCgocGFyc2VJbnQodmVzc2VsLlByaWNlLnNsaWNlKDAsIC0zKSkgKiByYWlfeWFjaHRfc3luYy5ldXJvX2NfYykpfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZW5ndGggPSB2ZXNzZWwuTm9taW5hbExlbmd0aCA/IHZlc3NlbC5Ob21pbmFsTGVuZ3RoICsgXCIgLyBcIiArIG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnO1xuXHRcdFx0cHJpY2UgPSB2ZXNzZWwuUHJpY2UgPyBgJCAke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdChwYXJzZUludCh2ZXNzZWwuUHJpY2Uuc2xpY2UoMCwgLTMpKSl9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSdcblx0XHR9XG5cblx0XHRyZXR1cm4gYFxuXHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXJlc3VsdC1ncmlkLWl0ZW0gbGlzdC12aWV3XCIgZGF0YS1wb3N0LWlkPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8YSBjbGFzcz1cInlhY2h0LWRldGFpbHNcIiBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdDxpbWcgY2xhc3M9XCJ5YWNodC1tYWluLWltYWdlXCIgc3JjPVwiJHt2ZXNzZWwuSW1hZ2VzID8gdmVzc2VsLkltYWdlc1swXS5VcmkgOiB2ZXNzZWwuSW1hZ2VzID8gdmVzc2VsLkltYWdlc1swXS5VcmkgOiByYWlfeWFjaHRfc3luYy5hc3NldHNfdXJsICsgJ2ltYWdlcy9kZWZhdWx0LXlhY2h0LWltYWdlLmpwZWcnfVwiIGFsdD1cInlhY2h0LWltYWdlXCIgbG9hZGluZz1cImxhenlcIiAvPlxuXHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1nZW5lcmFsLWluZm8tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXRpdGxlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGEgY2xhc3M9XCJ5YWNodC1kZXRhaWxzXCIgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHRcdDxoNiBjbGFzcz1cInlhY2h0LXRpdGxlXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICcnfSAke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnJ30gJHt2ZXNzZWwuTW9kZWwgPyB2ZXNzZWwuTW9kZWwgOiAnJ30gJHt2ZXNzZWwuQm9hdE5hbWUgPyB2ZXNzZWwuQm9hdE5hbWUgOiAnJ308L2g2PlxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmZvLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZm9cIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+WWVhcjwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+Q2FiaW5zPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLkNhYmluc0NvdW50TnVtZXJpYyA/IHZlc3NlbC5DYWJpbnNDb3VudE51bWVyaWMgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5CdWlsZGVyPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkxlbmd0aDwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke2xlbmd0aH08L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXByaWNlLWRldGFpbHMtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcHJpY2UtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtcHJpY2VcIj4ke3ByaWNlfTwvcD5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cInlhY2h0LWRvd25sb2FkLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBkYXRhLW1vZGFsPVwiI3NpbmdsZS1zaGFyZVwiPkNvbnRhY3Q8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdFxuXHRcdGA7XG5cdH07XG5cblx0eXNwX3RlbXBsYXRlcy55YWNodC5jb21wYXJlX3ByZXZpZXcgPSBmdW5jdGlvbih2ZXNzZWwsIHBhcmFtcykge1xuXG5cdFx0cmV0dXJuIGBcblxuXHRcdFx0PGRpdiBjbGFzcz1cInlzcC15YWNodC1jb21wYXJlLXByZXZpZXdcIiBkYXRhLXBvc3QtaWQ9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCIgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5cdFx0XHRcblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyZW1vdmUtZnJvbS1jb21wYXJlXCI+XG5cdFx0XHRcdFx0PHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0XHRcdFx0PHJlY3QgeD1cIjAuNVwiIHk9XCIwLjVcIiB3aWR0aD1cIjIzXCIgaGVpZ2h0PVwiMjNcIiByeD1cIjExLjVcIiBzdHJva2U9XCIjNkI3MDczXCIvPlxuXHRcdFx0XHRcdDxwYXRoIGQ9XCJNOC4yNjg3NiAxNC45MzQ2QzguMDQ5MDkgMTUuMTU0MyA4LjA0OTA5IDE1LjUxMDQgOC4yNjg3NiAxNS43MzAxQzguNDg4NDMgMTUuOTQ5OCA4Ljg0NDU4IDE1Ljk0OTggOS4wNjQyNSAxNS43MzAxTDguMjY4NzYgMTQuOTM0NlpNMTIuMzk3NiAxMi4zOTY4QzEyLjYxNzMgMTIuMTc3MSAxMi42MTczIDExLjgyMDkgMTIuMzk3NiAxMS42MDEzQzEyLjE3NzkgMTEuMzgxNiAxMS44MjE4IDExLjM4MTYgMTEuNjAyMSAxMS42MDEzTDEyLjM5NzYgMTIuMzk2OFpNMTEuNjAxOCAxMS42MDE2QzExLjM4MjEgMTEuODIxMyAxMS4zODIxIDEyLjE3NzQgMTEuNjAxOCAxMi4zOTcxQzExLjgyMTQgMTIuNjE2OCAxMi4xNzc2IDEyLjYxNjggMTIuMzk3MyAxMi4zOTcxTDExLjYwMTggMTEuNjAxNlpNMTUuNzMwNiA5LjA2Mzc2QzE1Ljk1MDMgOC44NDQwOSAxNS45NTAzIDguNDg3OTQgMTUuNzMwNiA4LjI2ODI3QzE1LjUxMDkgOC4wNDg2IDE1LjE1NDggOC4wNDg2IDE0LjkzNTEgOC4yNjgyN0wxNS43MzA2IDkuMDYzNzZaTTEyLjM5NzMgMTEuNjAxM0MxMi4xNzc2IDExLjM4MTYgMTEuODIxNCAxMS4zODE2IDExLjYwMTggMTEuNjAxM0MxMS4zODIxIDExLjgyMDkgMTEuMzgyMSAxMi4xNzcxIDExLjYwMTggMTIuMzk2OEwxMi4zOTczIDExLjYwMTNaTTE0LjkzNTEgMTUuNzMwMUMxNS4xNTQ4IDE1Ljk0OTggMTUuNTEwOSAxNS45NDk4IDE1LjczMDYgMTUuNzMwMUMxNS45NTAzIDE1LjUxMDQgMTUuOTUwMyAxNS4xNTQzIDE1LjczMDYgMTQuOTM0NkwxNC45MzUxIDE1LjczMDFaTTExLjYwMjEgMTIuMzk3MUMxMS44MjE4IDEyLjYxNjggMTIuMTc3OSAxMi42MTY4IDEyLjM5NzYgMTIuMzk3MUMxMi42MTczIDEyLjE3NzQgMTIuNjE3MyAxMS44MjEzIDEyLjM5NzYgMTEuNjAxNkwxMS42MDIxIDEyLjM5NzFaTTkuMDY0MjUgOC4yNjgyN0M4Ljg0NDU4IDguMDQ4NiA4LjQ4ODQzIDguMDQ4NiA4LjI2ODc2IDguMjY4MjdDOC4wNDkwOSA4LjQ4Nzk0IDguMDQ5MDkgOC44NDQwOSA4LjI2ODc2IDkuMDYzNzZMOS4wNjQyNSA4LjI2ODI3Wk05LjA2NDI1IDE1LjczMDFMMTIuMzk3NiAxMi4zOTY4TDExLjYwMjEgMTEuNjAxM0w4LjI2ODc2IDE0LjkzNDZMOS4wNjQyNSAxNS43MzAxWk0xMi4zOTczIDEyLjM5NzFMMTUuNzMwNiA5LjA2Mzc2TDE0LjkzNTEgOC4yNjgyN0wxMS42MDE4IDExLjYwMTZMMTIuMzk3MyAxMi4zOTcxWk0xMS42MDE4IDEyLjM5NjhMMTQuOTM1MSAxNS43MzAxTDE1LjczMDYgMTQuOTM0NkwxMi4zOTczIDExLjYwMTNMMTEuNjAxOCAxMi4zOTY4Wk0xMi4zOTc2IDExLjYwMTZMOS4wNjQyNSA4LjI2ODI3TDguMjY4NzYgOS4wNjM3NkwxMS42MDIxIDEyLjM5NzFMMTIuMzk3NiAxMS42MDE2WlwiIGZpbGw9XCIjNkI3MDczXCIvPlxuXHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHQ8L3NwYW4+XG5cblxuXHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZVwiIHNyYz1cIiR7dmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogcmFpX3lhY2h0X3N5bmMuYXNzZXRzX3VybCArICdpbWFnZXMvZGVmYXVsdC15YWNodC1pbWFnZS5qcGVnJ31cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblxuXHRcdFx0XHQ8aDYgY2xhc3M9XCJ5YWNodC10aXRsZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnJ30gJHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJyd9ICR7dmVzc2VsLk1vZGVsID8gdmVzc2VsLk1vZGVsIDogJyd9ICR7dmVzc2VsLkJvYXROYW1lID8gdmVzc2VsLkJvYXROYW1lIDogJyd9PC9oNj5cblxuXHRcdFx0PC9kaXY+XG5cblx0XHRgO1xuXG5cdH07XG5cblx0eXNwX3RlbXBsYXRlcy5ub1Jlc3VsdHM9ZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGI+Tm8gUmVzdWx0czwvYj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgfTtcblxuXG4gICAgeXNwX3RlbXBsYXRlcy55YWNodF90YWcgPSBmdW5jdGlvbihsYWJlbCwgdmFsdWUpIHtcblxuICAgIFx0cmV0dXJuIGBcbiAgICBcdFx0PHNwYW4+XG5cdCAgICBcdFx0JHt2YWx1ZX1cblxuXHQgICAgXHRcdDxpbWcgc3JjPVwiJHtyYWlfeWFjaHRfc3luYy5hc3NldHNfdXJsfS9pbWFnZXMvcmVtb3ZlLXRhZy5wbmdcIj5cblx0XHRcdDwvc3Bhbj5cbiAgICBcdGA7XG4gICAgfTtcblxuICAgIHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbiA9IHt9O1xuICAgIFxuICAgIFx0eXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uLm5leHRfdGV4dCA9IGA+YDtcblxuICAgIFx0eXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uLnByZXZfdGV4dCA9IGA8YDtcblxuIiwiXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuXHRsZXQgZWxlX3F1aWNrX3NlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AtcXVpY2stc2VhcmNoLWZvcm0nKTtcblxuXHRpZiAoZWxlX3F1aWNrX3NlYXJjaCkge1xuXHRcdC8vIEZpbGwgb3B0aW9uc1xuXHQgICAgbGV0IEZpbGxPcHRpb25zPVtdO1xuXHQgICAgbGV0IHNlbGVjdG9yRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnlzcC1xdWljay1zZWFyY2gtZm9ybSBzZWxlY3RbZGF0YS1maWxsLW9wdGlvbnNdXCIpO1xuXG5cdCAgICBzZWxlY3RvckVsZW1lbnRzLmZvckVhY2goKGVsZSkgPT4ge1xuXHQgICAgICAgIEZpbGxPcHRpb25zLnB1c2goZWxlLmdldEF0dHJpYnV0ZSgnZGF0YS1maWxsLW9wdGlvbnMnKSk7XG5cdCAgICB9KTtcblx0ICAgIFxuXHQgICAgcmFpX3lzcF9hcGkuY2FsbF9hcGkoJ1BPU1QnLCAnZHJvcGRvd24tb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxPcHRpb25zfSkudGhlbihmdW5jdGlvbihyT3B0aW9ucykge1xuXHQgICAgICAgIGZvciAobGV0IGxhYmVsIGluIHJPcHRpb25zKSB7XG5cblx0ICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi55c3AtcXVpY2stc2VhcmNoLWZvcm0gc2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zPSdcIisgbGFiZWwgK1wiJ11cIik7XG5cdCAgICAgICAgICAgIGxldCBuYW1lID0gU2VsZWN0b3JFbGVbMF0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cblx0ICAgICAgICAgICAgck9wdGlvbnNbbGFiZWxdLmZvckVhY2goZnVuY3Rpb24oYikge1xuXHQgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgICAgICAgICBcdGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG5cdFx0ICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG5cdFx0ICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgZWxlLmFkZChvcHRpb24pO1xuXHQgICAgICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIGxldCBVUkxSRUYgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuXHQgICAgICAgICAgICBsZXQgVXJsVmFsID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoIG5hbWUgKTtcblxuXHQgICAgICAgICAgICBsZXQgc3RycGF0aHM9d2luZG93LmxvY2F0aW9uLmhyZWY7XG5cblx0ICAgICAgICAgICAgc3RycGF0aHM9c3RycGF0aHMucmVwbGFjZShyYWlfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfcGFnZV9pZCwgJycpO1xuXG5cdCAgICAgICAgICAgIGxldCBwYXRocyA9IHN0cnBhdGhzLnNwbGl0KFwiL1wiKTtcblxuXHQgICAgICAgICAgICBsZXQgcHJldHR5X3VybF9wYXRoX3BhcmFtcz17fTtcblxuXHQgICAgICAgICAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uKHBhdGgpIHtcblxuXHQgICAgICAgICAgICAgICAgaWYgKHBhdGggIT0gJycpIHtcblx0ICAgICAgICAgICAgICAgICAgICBsZXQgcGhhc2VfcGF0aCA9IHBhdGguc3BsaXQoJy0nKTtcblx0ICAgICAgICAgICAgICAgICAgICBsZXQgb25seV92YWxzPXBoYXNlX3BhdGguc2xpY2UoMSk7XG5cblx0ICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dPW9ubHlfdmFscy5qb2luKCcgJyk7XG5cblx0ICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXS5lYWNoV29yZENhcGl0YWxpemUoKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICBpZiAoVXJsVmFsICE9ICcnICYmIFVybFZhbCAhPSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhVcmxWYWwpO1xuXG5cdCAgICAgICAgICAgICAgICBpZiAodHlwZW9mIFVybFZhbCA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgIFVybFZhbCA9IFVybFZhbC5lYWNoV29yZENhcGl0YWxpemUoKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gVXJsVmFsOyBcblx0ICAgICAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIH1cblxuXG5cdCAgICAgICAgICAgIGxldCBoYXNQcmV0dHkgPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF07XG5cblx0ICAgICAgICAgICAgY29uc29sZS5sb2coIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXSk7XG5cblx0ICAgICAgICAgICAgaWYgKGhhc1ByZXR0eSAhPSAnJyAmJiBoYXNQcmV0dHkgIT0gbnVsbCkge1xuXHQgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gaGFzUHJldHR5OyBcblx0ICAgICAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9KVxuXHR9XG59KTsiLCJmdW5jdGlvbiB5c3BfbWFrZVNlYXJjaFRhZ3MoIGRhdGEgKSB7XG5cblx0bGV0IHRhZ3NFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXNlYXJjaC10YWdzJyk7XG4gICAgICAgIFxuICAgIGlmICh0YWdzRWxlKSB7XG4gICAgICAgIHRhZ3NFbGUuZm9yRWFjaChmdW5jdGlvbih0ZSkge1xuICAgICAgICAgICAgdGUuaW5uZXJIVE1MPVwiXCI7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdmFyIHlzcF90YWdzX25vdF9wcmludCA9IFsncGFnZV9pbmRleCcsICcnXTtcblxuICAgICAgICBmb3IgKGxldCBwYXJhbUtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBsZXQgbGFiZWw9Jyc7XG5cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsYWJlbFtmb3I9JysgcGFyYW1LZXkgKyddJykpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxhYmVsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj0nKyBwYXJhbUtleSArJ10nKS5pbm5lclRleHQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbbmFtZT0nKyBwYXJhbUtleSArJ10nKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqW25hbWU9JysgcGFyYW1LZXkgKyddJykuaGFzQXR0cmlidXRlKCdsYWJlbCcpKSB7XG5cbiAgICAgICAgICAgICAgICBsYWJlbD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqW25hbWU9JysgcGFyYW1LZXkgKyddJykuZ2V0QXR0cmlidXRlKCdsYWJlbCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdGFnc0VsZS5mb3JFYWNoKGZ1bmN0aW9uKHRlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoeXNwX3RhZ3Nfbm90X3ByaW50LmluZGV4T2YoIHBhcmFtS2V5ICkgPT0gLTEpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZT0nKyBwYXJhbUtleSArJ10nKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlSW5wdXQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1RhZ0VsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFnVmFsID0gZGF0YVtwYXJhbUtleV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlSW5wdXQudGFnTmFtZSA9PSAnU0VMRUNUJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWwgPSBlbGVJbnB1dC5vcHRpb25zWyBlbGVJbnB1dC5zZWxlY3RlZEluZGV4IF0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbUtleS5tYXRjaCgncHJpY2UnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWwgPSAnJCcrdGFnVmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbUtleS5tYXRjaCgnbGVuZ3RoJykgJiYgcGFyYW1LZXkgIT0gJ2xlbmd0aHVuaXQnKSAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbGVVbml0ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gW25hbWU9bGVuZ3RodW5pdF06Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEgZWxlVW5pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZVVuaXQgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybSBbbmFtZT1sZW5ndGh1bml0XScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCA9IHRhZ1ZhbCArJyAnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVVbml0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWwgKz0gZWxlVW5pdC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhZ0VsZS5jbGFzc05hbWUgPSAnYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbSB5c3AtdGFnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbGFiZWwgIT0gbnVsbCAmJiBsYWJlbCAhPSAnbnVsbCcgJiYgbGFiZWwgIT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLmlubmVySFRNTCA9IHlzcF90ZW1wbGF0ZXMueWFjaHRfdGFnKGxhYmVsLCB0YWdWYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLmlubmVySFRNTCA9IHlzcF90ZW1wbGF0ZXMueWFjaHRfdGFnKCcnLCB0YWdWYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhZ0VsZS5zZXRBdHRyaWJ1dGUoJ2tleScsIHBhcmFtS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZS5hcHBlbmRDaGlsZCggbmV3VGFnRWxlICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC10YWdba2V5PVwiJysgcGFyYW1LZXkgKydcIl0nKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coKCcueXNwLXRhZ1trZXk9XCInKyBwYXJhbUtleSArJ1wiXScpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4ueXNwLXRhZ1trZXk9XCInKyBwYXJhbUtleSArJ1wiXScpLmZvckVhY2goZnVuY3Rpb24oeXNwVGFnRWxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeXNwVGFnRWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2tleScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXRFbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC15YWNodC1zZWFyY2gtZm9ybSBzZWxlY3RbbmFtZT0nKyBrZXkgKyddLCAueXNwLXlhY2h0LXNlYXJjaC1mb3JtIGlucHV0W25hbWU9Jysga2V5ICsnXScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dEVsZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZXMuZm9yRWFjaChmdW5jdGlvbihlbGVJKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbGVJLnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGVsZUkudHlwZSA9PSAnY2hlY2tib3gnIHx8IGVsZUkudHlwZSA9PSAncmFkaW8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVJLmNoZWNrZWQ9ZmFsc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZUkudmFsdWU9Jyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRFbGVzWzBdLmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxufSIsImZ1bmN0aW9uIHlzcF9tYXJrTG92ZWRWZXNzZWwoIGVsZV9jYXJkICkge1xuXG4gICAgalF1ZXJ5KCcubG92ZScsIGVsZV9jYXJkKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnRvZ2dsZUNsYXNzKCdsb3ZlZCcpO1xuXG4gICAgICAgIGxldCB5YWNodElkID0galF1ZXJ5KHRoaXMpLmRhdGEoJ3lhY2h0LWlkJyk7XG4gICAgXG4gICAgICAgIGlmICggalF1ZXJ5KHRoaXMpLmhhc0NsYXNzKCdsb3ZlZCcpICkge1xuICAgICAgICAgICAgeXNwX2FkZExvdmVkVmVzc2VsKHlhY2h0SWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeXNwX3JlbW92ZUxvdmVkVmVzc2VsKHlhY2h0SWQpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSAhPSBcIlwiKSB7XG5cbiAgICAgICAgbGV0IGxvdmVkVmVzc2VscyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykpO1xuXG4gICAgICAgIGlmIChsb3ZlZFZlc3NlbHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgbG92ZWRWZXNzZWxzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeWFjaHRJZCA9IGVsZV9jYXJkLmRhdGEoJ3lhY2h0LWlkJyk7XG5cbiAgICAgICAgaWYgKGxvdmVkVmVzc2Vscy5pbmRleE9mKCB5YWNodElkICkgIT0gLTEpIHtcblxuICAgICAgICAgICAgZWxlX2NhcmQuYWRkQ2xhc3MoJ2xvdmVkJyk7XG5cbiAgICAgICAgICAgIGpRdWVyeSgnLmxvdmUnLCBlbGVfY2FyZCkuYWRkQ2xhc3MoJ2xvdmVkJyk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZnVuY3Rpb24geXNwX2FkZExvdmVkVmVzc2VsKCB5YWNodElkICkge1xuXG4gICAgbGV0IGxvdmVkVmVzc2VscyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykpO1xuXG5cbiAgICAgICAgaWYgKGxvdmVkVmVzc2VscyA9PSBudWxsKSB7XG4gICAgICAgICAgICBsb3ZlZFZlc3NlbHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgaWYgKGxvdmVkVmVzc2Vscy5pbmRleE9mKCB5YWNodElkICkgPT0gLTEpIHtcblxuICAgICAgICBsb3ZlZFZlc3NlbHMucHVzaCh5YWNodElkKTtcblxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gYWxyZWFkeSBhZGRlZFxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGxvdmVkVmVzc2VscyApO1xuICAgIFxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwieXNwX2xvdmVkX3Zlc3NlbHNcIiwgSlNPTi5zdHJpbmdpZnkobG92ZWRWZXNzZWxzKSk7XG5cbn0gXG5cbmZ1bmN0aW9uIHlzcF9yZW1vdmVMb3ZlZFZlc3NlbCggeWFjaHRJZCApIHtcblxuICAgIGxldCBsb3ZlZFZlc3NlbHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpKTtcblxuXG4gICAgICAgIGlmIChsb3ZlZFZlc3NlbHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgbG92ZWRWZXNzZWxzID0gW107XG4gICAgICAgIH1cblxuICAgIGxldCBpbmRleGVkID0gbG92ZWRWZXNzZWxzLmluZGV4T2YoIHlhY2h0SWQgKTtcblxuICAgIGNvbnNvbGUubG9nKGluZGV4ZWQpO1xuXG4gICAgaWYgKGluZGV4ZWQgIT0gLTEpIHtcblxuICAgICAgICBkZWxldGUgbG92ZWRWZXNzZWxzW2luZGV4ZWRdOyAgICAgICAgXG4gICAgICAgIGxvdmVkVmVzc2Vscy5zcGxpY2UoaW5kZXhlZCwgMSk7XG5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGFscmVhZHkgYWRkZWRcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhsb3ZlZFZlc3NlbHMgKTtcbiAgICBcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInlzcF9sb3ZlZF92ZXNzZWxzXCIsIEpTT04uc3RyaW5naWZ5KGxvdmVkVmVzc2VscykpO1xuXG59IiwidmFyIFlTUF9WZXNzZWxDb21wYXJlTGlzdD1bXTtcblxuXG5mdW5jdGlvbiB5c3BfcmVzdG9yZUNvbXBhcmVzKCkge1xuICAgIGxldCBVUkxSRUY9bmV3IFVSTChsb2NhdGlvbi5ocmVmKTsgLy8gbWF5YmUgZm9yIGEgcmUtZG9cbiAgICBsZXQgY29tcGFyZV9wb3N0X2lkcyA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCAncmVzdG9yZV90b19jb21wYXJlJyApOyBcblxuICAgIGNvbnNvbGUubG9nKHR5cGVvZiBjb21wYXJlX3Bvc3RfaWRzKTtcbiAgICBjb25zb2xlLmxvZyhjb21wYXJlX3Bvc3RfaWRzKTtcblxuICAgIGlmICh0eXBlb2YgY29tcGFyZV9wb3N0X2lkcyA9PSAnc3RyaW5nJykge1xuICAgICAgICBZU1BfVmVzc2VsQ29tcGFyZUxpc3QgPSBjb21wYXJlX3Bvc3RfaWRzLnNwbGl0KCcsJyk7XG4gICAgXG5cbiAgICAgICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xuICAgIH1cblxuXG5cbn1cblxuXG5mdW5jdGlvbiB5c3BfbWFrZUNvbXBhcmVWZXNzZWwoZWxlX2NhcmQpIHtcblx0IFxuXHQgalF1ZXJ5KCcuY29tcGFyZV90b2dnbGUnLCBlbGVfY2FyZCkuY2hhbmdlKGZ1bmN0aW9uKGUpIHtcblx0IFx0Y29uc29sZS5sb2coJ2hvd2R5Jyk7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgICAgICBqUXVlcnkodGhpcykudG9nZ2xlQ2xhc3MoJ2FybWVkJyk7XG5cbiAgICAgICAgbGV0IHlhY2h0SWQgPSBlbGVfY2FyZC5kYXRhKCdwb3N0LWlkJyk7XG4gICAgXG4gICAgICAgIGlmICggalF1ZXJ5KHRoaXMpLmhhc0NsYXNzKCdhcm1lZCcpICkge1xuICAgICAgICAgICAgeXNwX2FkZFZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB5c3BfcmVtb3ZlVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBsZXQgeWFjaHRJZCA9IGVsZV9jYXJkLmRhdGEoJ3Bvc3QtaWQnKTtcblxuICAgIGlmIChZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZCApICE9IC0xICB8fCBZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZC50b1N0cmluZygpICkgIT0gLTEgKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2hlbGxvIHdvcmxkIHJlc3RvcmVkJyk7XG5cbiAgICAgICAgZWxlX2NhcmQuYWRkQ2xhc3MoJ2FybWVkJyk7XG5cbiAgICAgICAgalF1ZXJ5KCcuY29tcGFyZV90b2dnbGUnLCBlbGVfY2FyZCkuYWRkQ2xhc3MoJ2FybWVkJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHlzcF9hZGRWZXNzZWxUb0NvbXBhcmVMaXN0KHlhY2h0SWQpIHtcblxuICAgIGlmIChZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZCApID09IC0xKSB7XG5cbiAgICBcdFlTUF9WZXNzZWxDb21wYXJlTGlzdC5wdXNoKHlhY2h0SWQpO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xufVxuICAgIFxuZnVuY3Rpb24geXNwX3JlbW92ZVZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCkge1xuXHRsZXQgaW5kZXhlZCA9IFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkIClcblxuXHRpZiAoIGluZGV4ZWQgIT0gLTEpIHtcblxuICAgIFx0ZGVsZXRlIFlTUF9WZXNzZWxDb21wYXJlTGlzdFtpbmRleGVkXTsgICAgICAgIFxuICAgICAgICBZU1BfVmVzc2VsQ29tcGFyZUxpc3Quc3BsaWNlKGluZGV4ZWQsIDEpO1xuICBcdFx0XG4gICAgfVxuXG4gICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xufVxuXG5mdW5jdGlvbiB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCkge1xuXG4gICAgaWYgKFlTUF9WZXNzZWxDb21wYXJlTGlzdC5sZW5ndGggPj0gMikge1xuICAgIFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lzcF9jb21wYXJlX2xpbmtvdXQnKS5ocmVmPXJhaV95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wicmFpeXMvY29tcGFyZS8/cG9zdElEPVwiK1lTUF9WZXNzZWxDb21wYXJlTGlzdC5qb2luKCcsJyk7XG5cbiAgICBcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0JykuaW5uZXJIVE1MPWA8YnV0dG9uIHR5cGU9XCJidXR0b25cIj5Db21wYXJlICggJHtZU1BfVmVzc2VsQ29tcGFyZUxpc3QubGVuZ3RofSApPC9idXR0b24+YDtcbiAgICAgICAgXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAncG9zdF9faW4nOiBZU1BfVmVzc2VsQ29tcGFyZUxpc3QsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHJhaV95c3BfYXBpLmNhbGxfYXBpKFwiUE9TVFwiLCBcInlhY2h0c1wiLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24oZGF0YV9yZXN1bHQpIHtcblxuICAgICAgICAgICAgZGF0YV9yZXN1bHQucmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBqUXVlcnkoJyN5c3AtY29tcGFyZS1wcmV2aWV3cycpLmFwcGVuZCggeXNwX3RlbXBsYXRlcy55YWNodC5jb21wYXJlX3ByZXZpZXcoaXRlbSwgcGFyYW1zKSApO1xuXG4gICAgICAgICAgICAgICAgbGV0IGVsZV9wcmV2aWV3ID0galF1ZXJ5KCcjeXNwLWNvbXBhcmUtcHJldmlld3MgW2RhdGEtcG9zdC1pZD0nKyBpdGVtLl9wb3N0SUQgKyddJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcucmVtb3ZlLWZyb20tY29tcGFyZScsIGVsZV9wcmV2aWV3KS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hlbGxvJyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlX2NhcmQgPSBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdyBbZGF0YS1wb3N0LWlkPScrIGl0ZW0uX3Bvc3RJRCArJ10nKTtcblxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJy5jb21wYXJlX3RvZ2dsZScsIGVsZV9jYXJkKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnJlbW92ZUNsYXNzKCdhcm1lZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0KGl0ZW0uX3Bvc3RJRCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKTtcblxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgalF1ZXJ5KCcjeXNwLWNvbXBhcmUtcHJldmlld3MnKS5odG1sKCcnKTtcbiAgICAgICAgalF1ZXJ5KCcjeXNwX2NvbXBhcmVfbGlua291dCcpLmh0bWwoJycpO1xuICAgIH1cblxuXG5cblxufVxuIiwiY29uc3QgeXNwQmVmb3JlWWFjaHRTZWFyY2ggPSBuZXcgRXZlbnQoXCJ5c3AtYmVmb3JlLXN1Ym1pdHRpbmcteWFjaHQtc2VhcmNoXCIpO1xuY29uc3QgeXNwQWZ0ZXJZYWNodFNlYXJjaCA9IG5ldyBFdmVudChcInlzcC1hZnRlci1zdWJtaXR0aW5nLXlhY2h0LXNlYXJjaFwiKTtcblxuZnVuY3Rpb24geXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKGRhdGEpIHtcblxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5odG1sKCcnKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtcmVzdWx0LXNlY3Rpb24nKS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkZWQnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXJlc3VsdC1zZWN0aW9uJykuY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpO1xuXG4gICAgcmFpeXNfc2V0X2Zvcm1fdG9fZGF0YSggZGF0YSApO1xuXG4gICAgeXNwX21ha2VTZWFyY2hUYWdzKCBkYXRhICk7XG5cbiAgICAvLyBHRVQgQU5EIFdSSVRFXG4gICAgcmV0dXJuIHJhaV95c3BfYXBpLmNhbGxfYXBpKFwiUE9TVFwiLCBcInlhY2h0c1wiLCBkYXRhKS50aGVuKGZ1bmN0aW9uKGRhdGFfcmVzdWx0KSB7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1yZXN1bHQtc2VjdGlvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1yZXN1bHQtc2VjdGlvbicpLmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xuXG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gZGF0YV9yZXN1bHQuU0VPLnRpdGxlO1xuICAgICAgICBqUXVlcnkoJyN5c3Atc2VhcmNoLWhlYWRpbmcnKS50ZXh0KGRhdGFfcmVzdWx0LlNFTy5oZWFkaW5nKTtcbiAgICAgICAgalF1ZXJ5KCcjeXNwLXNlYXJjaC1wYXJhZ3JhcGgnKS50ZXh0KGRhdGFfcmVzdWx0LlNFTy5ncHRfcCk7XG5cbiAgICAgICAgalF1ZXJ5KCcjdG90YWwtcmVzdWx0cycpLnRleHQobmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1JTicsIHsgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzOiAzIH0pLmZvcm1hdChkYXRhX3Jlc3VsdC50b3RhbCkpO1xuXG4gICAgICAgIGxldCBjdXJyZW50VVJMPW51bGw7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLmRvbnRfcHVzaCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY3VycmVudFVSTD1yYWl5c19wdXNoX2hpc3RvcnkoIGRhdGEgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRVUkwgPSBsb2NhdGlvbi5ocmVmO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBqUXVlcnkoJyN5YWNodHMtcGFnaW5hdGlvbicpLmh0bWwoJycpO1xuXG4gICAgICAgIGlmIChkYXRhX3Jlc3VsdC50b3RhbCA+IDApIHtcblxuICAgICAgICAgICAgZGF0YV9yZXN1bHQucmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEudmlldyAhPSAndW5kZWZpbmVkJyAmJiBkYXRhLnZpZXcudG9Mb3dlckNhc2UoKSA9PSAnbGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQubGlzdChpdGVtLCBkYXRhKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQuZ3JpZChpdGVtLCBkYXRhKSApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBlbGVfY2FyZCA9IGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93IFtkYXRhLXBvc3QtaWQ9JysgaXRlbS5fcG9zdElEICsnXScpO1xuXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCdbZGF0YS1tb2RhbF0nLCBlbGVfY2FyZCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCB2ZXNzZWxJbmZvID0gaXRlbS5Nb2RlbFllYXIgKyAnICcgKyBpdGVtLk1ha2VTdHJpbmcgKyAnICcgKyBpdGVtLkJvYXROYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lhdGNoSGlkZGVuJykudmFsKHZlc3NlbEluZm8pO1xuXG4gICAgICAgICAgICAgICAgICB2YXIgZGF0YV9tb2RhbCA9IGpRdWVyeSh0aGlzKS5kYXRhKCdtb2RhbCcpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIGpRdWVyeSggZGF0YV9tb2RhbCApLnlzcF9tb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlVGV4dDogJ1gnLFxuICAgICAgICAgICAgICAgICAgICBtb2RhbENsYXNzOiAneXNwLW1vZGFsLW9wZW4nLFxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsYXNzOiAneXNwLW1vZGVsLWNsb3NlJ1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB5c3BfbWFya0xvdmVkVmVzc2VsKCBlbGVfY2FyZCApOyAgICAgXG4gICAgICAgICAgICAgICAgeXNwX21ha2VDb21wYXJlVmVzc2VsKCBlbGVfY2FyZCApOyAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgalF1ZXJ5KCcjeWFjaHRzLXBhZ2luYXRpb24nKS5wYWdpbmF0aW9uKHtcbiAgICAgICAgICAgICAgICBpdGVtczogZGF0YV9yZXN1bHQudG90YWwsXG4gICAgICAgICAgICAgICAgaXRlbXNPblBhZ2U6IDEyLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBkYXRhLnBhZ2VfaW5kZXgsXG4gICAgICAgICAgICAgICAgcHJldlRleHQ6IHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5wcmV2X3RleHQsXG4gICAgICAgICAgICAgICAgbmV4dFRleHQ6IHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5uZXh0X3RleHQsXG4gICAgICAgICAgICAgICAgZWRnZXM6IDQsXG4gICAgICAgICAgICAgICAgZGlzcGxheWVkUGFnZXM6IDQsXG4gICAgICAgICAgICAgICAgaHJlZlRleHRQcmVmaXg6IGN1cnJlbnRVUkwucmVwbGFjZShuZXcgUmVnRXhwKFwicGFnZV9pbmRleC0oXFxcXGQqKSgvKVwiLCBcImdcIiksIFwiXCIpKydwYWdlX2luZGV4LScsXG4gICAgICAgICAgICAgICAgaHJlZlRleHRTdWZmaXg6ICcvJyxcbiAgICAgICAgICAgICAgICBvblBhZ2VDbGljazogZnVuY3Rpb24ocGFnZU51bWJlciwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIGlucHV0W25hbWU9cGFnZV9pbmRleF0nKS52YWx1ZT1wYWdlTnVtYmVyO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3JtRGF0YU9iamVjdCA9IHJhaXlzX2dldF9mb3JtX2RhdGEoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0nKSApO1xuXG4gICAgICAgICAgICAgICAgICAgIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlcihmb3JtRGF0YU9iamVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5hcHBlbmQoeXNwX3RlbXBsYXRlcy5ub1Jlc3VsdHMoKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGpRdWVyeShbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSkuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IChqUXVlcnkoXCIuc2Nyb2xsLXRvLWhlcmUtb24teWFjaHQtc2VhcmNoXCIpLm9mZnNldCgpLnRvcClcbiAgICAgICAgfSwgMjUwKTtcblxuICAgICAgICByZXR1cm4gZGF0YV9yZXN1bHQ7XG5cbiAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcblxuICAgIH0pO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgIC8vIEZpbGwgTGlzdCBPcHRpb25zXG4gICAgbGV0IEZpbGxMaXN0cz1bXTtcbiAgICBsZXQgbGlzdEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRhdGFsaXN0W2RhdGEtZmlsbC1saXN0XVwiKTtcbiAgICBsZXQgbGlzdE5lZWRlZEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0W2xpc3RdXCIpO1xuXG4gICAgbGlzdEVsZW1lbnRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICBGaWxsTGlzdHMucHVzaChlbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtbGlzdCcpKTtcbiAgICB9KTtcblxuICAgIGxpc3ROZWVkZWRFbGVtZW50cy5mb3JFYWNoKChpbnB1dF9lbGUpID0+IHtcblxuICAgICAgICBpbnB1dF9lbGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgICAgICBsZXQgbGlzdF9pZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2xpc3QnKTtcblxuICAgICAgICAgICAgbGV0IGVsZV9saXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRhdGFsaXN0I1wiK2xpc3RfaWQpO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA8PSAzKSB7XG5cbiAgICAgICAgICAgICAgICByYWlfeXNwX2FwaS5jYWxsX2FwaShcbiAgICAgICAgICAgICAgICAgICAgJ1BPU1QnLCBcbiAgICAgICAgICAgICAgICAgICAgJ2xpc3Qtb3B0aW9ucy13aXRoLXZhbHVlJywgXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsczogWyBlbGVfbGlzdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1saXN0JykgXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGF0YWxpc3RbZGF0YS1maWxsLWxpc3Q9J1wiKyBsYWJlbCArXCInXVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0pO1xuXG4gICAgfSlcbiAgICBcbi8qICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpKCdQT1NUJywgJ2xpc3Qtb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxMaXN0c30pLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcbiAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRhdGFsaXN0W2RhdGEtZmlsbC1saXN0PSdcIisgbGFiZWwgK1wiJ11cIik7XG5cbiAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGUuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuKi9cbiAgICBsZXQgeWFjaHRTZWFyY2hBbmRSZXN1bHRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm06bm90KCN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtKScpO1xuXG4gICAgaWYgKHlhY2h0U2VhcmNoQW5kUmVzdWx0cykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Blbi1tb2JpbGUtc2VhcmNoJykuZm9yRWFjaCgob21zZSkgPT4ge1xuICAgICAgICAgICAgb21zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3Atc3VwZXItbW9iaWxlLXNlYXJjaCcpLnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3dZPSdoaWRkZW4nO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuYWRkKCd5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1vcGVuJyk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9iaWxlLXNlYXJjaCcpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9iaWxlLXNlYXJjaCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1zdXBlci1tb2JpbGUtc2VhcmNoJykuc3R5bGUuZGlzcGxheT0nbm9uZSc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93WT0ndW5zZXQnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QucmVtb3ZlKCd5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1vcGVuJyk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICB5YWNodFNlYXJjaEFuZFJlc3VsdHMuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KHlzcEJlZm9yZVlhY2h0U2VhcmNoKTtcblxuICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPTE7XG5cbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSByYWl5c19nZXRfZm9ybV9kYXRhKGUudGFyZ2V0KTtcblxuICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKS50aGVuKGZ1bmN0aW9uKGFwaV9kYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KHlzcEFmdGVyWWFjaHRTZWFyY2gpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTsgXG5cbiAgICAgICAgeWFjaHRTZWFyY2hBbmRSZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LnN1Ym1pdC1vbi1jaGFuZ2UnKS5mb3JFYWNoKChlbGVJbnB1dCkgPT4ge1xuICAgICAgICAgICAgZWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHlhY2h0U2VhcmNoQW5kUmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPXJlc2V0XScpLmZvckVhY2goKGVsZVJlc2V0KSA9PiB7XG4gICAgICAgICAgICBlbGVSZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInlzX2NvbXBhbnlfb25seVwiXScpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwieXNfY29tcGFueV9vbmx5XCJdJykuZm9yRWFjaChmdW5jdGlvbihlbGVDaGVjaykge1xuICAgICAgICAgICAgICAgIGVsZUNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT12aWV3XVtmb3JtPXlzcC15YWNodC1zZWFyY2gtZm9ybV0sIHNlbGVjdFtuYW1lPXNvcnRieV1bZm9ybT15c3AteWFjaHQtc2VhcmNoLWZvcm1dJykuZm9yRWFjaCgoZWxlVmlld09wdGlvbikgPT4ge1xuICAgICAgICAgICAgZWxlVmlld09wdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBpY2stYWxsJykuZm9yRWFjaChmdW5jdGlvbihlbGUpIHtcbiAgICAgICAgICAgIGVsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIGxldCBpbnB1dF9uYW1lID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwiJysgaW5wdXRfbmFtZSArJ1wiXScpLmZvckVhY2goKGVsZUlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZUlucHV0LmNoZWNrZWQ9ZmFsc2U7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFBSRVRUWSBVUkxcbiAgICAgICAgbGV0IHN0cnBhdGhzPXdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgICAgIHN0cnBhdGhzPXN0cnBhdGhzLnJlcGxhY2UocmFpX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3BhZ2VfaWQsICcnKTtcblxuICAgICAgICBsZXQgcGF0aHMgPSBzdHJwYXRocy5zcGxpdChcIi9cIik7XG5cbiAgICAgICAgbGV0IHByZXR0eV91cmxfcGF0aF9wYXJhbXM9e307XG5cbiAgICAgICAgcGF0aHMuZm9yRWFjaChmdW5jdGlvbihwYXRoKSB7XG5cbiAgICAgICAgICAgIGlmIChwYXRoICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBoYXNlX3BhdGggPSBwYXRoLnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgbGV0IG9ubHlfdmFscz1waGFzZV9wYXRoLnNsaWNlKDEpO1xuXG4gICAgICAgICAgICAgICAgb25seV92YWxzPW9ubHlfdmFscy5qb2luKCcgJykuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IG9ubHlfdmFsc19hcnJheT0ob25seV92YWxzLnNwbGl0KCcrJykpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvbmx5X3ZhbHNfYXJyYXlbMV0gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb25seV92YWxzID0gb25seV92YWxzX2FycmF5Lm1hcCgob3YpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvdi5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhvbmx5X3ZhbHMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV09b25seV92YWxzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2cocHJldHR5X3VybF9wYXRoX3BhcmFtcyk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSBGaWVsZHNcblxuICAgICAgICBsZXQgVVJMUkVGPW5ldyBVUkwobG9jYXRpb24uaHJlZik7IC8vIG1heWJlIGZvciBhIHJlLWRvXG5cbiAgICAgICAgbGV0IGZvcm1JbnB1dHM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AteWFjaHQtc2VhcmNoLWZvcm1cIl0sICN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm1cIl0nKTtcblxuICAgICAgICBmb3JtSW5wdXRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGlucHV0ID0gZWxlO1xuXG4gICAgICAgICAgICBsZXQgbmFtZSA9IGVsZS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICAgICAgbGV0IHVybFZhbCA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCBuYW1lICk7XG4gICAgICAgICAgICAgICAgLy8gdXJsVmFsID0gO1xuICAgXG5cbiAgICAgICAgICAgIGxldCBoYXNQcmV0dHkgPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF07XG5cbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYXNQcmV0dHkgIT0gJ251bGwnICYmIHR5cGVvZiBoYXNQcmV0dHkgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGhhc1ByZXR0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhoYXNQcmV0dHkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGhhc1ByZXR0eS5mb3JFYWNoKChoUCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoUCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaGFzUHJldHR5ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUgIT0gJ2NoZWNrYm94JyAmJiBpbnB1dC50eXBlICE9ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gaGFzUHJldHR5O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHVybFZhbCAhPSAnJyAmJiB1cmxWYWwgIT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmxWYWwgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsVmFsID0gdXJsVmFsLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSB1cmxWYWwgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZSAhPSAnY2hlY2tib3gnICYmIGlucHV0LnR5cGUgIT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHVybFZhbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSBDb21wYXJlXG4gICAgICAgICB5c3BfcmVzdG9yZUNvbXBhcmVzKCk7XG5cbiAgICAgICAgLy8gRmlsbCBvcHRpb25zXG4gICAgICAgIGxldCBGaWxsT3B0aW9ucz1bXTtcbiAgICAgICAgbGV0IHNlbGVjdG9yRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zXVwiKTtcblxuICAgICAgICBzZWxlY3RvckVsZW1lbnRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgRmlsbE9wdGlvbnMucHVzaChlbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtb3B0aW9ucycpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByYWlfeXNwX2FwaS5jYWxsX2FwaSgnUE9TVCcsICdkcm9wZG93bi1vcHRpb25zJywge2xhYmVsczogRmlsbE9wdGlvbnN9KS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFtkYXRhLWZpbGwtb3B0aW9ucz0nXCIrIGxhYmVsICtcIiddXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coU2VsZWN0b3JFbGUpO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBTZWxlY3RvckVsZVswXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUuYWRkKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IFVSTFJFRiA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgICAgICAgbGV0IFVybFZhbCA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCBuYW1lICk7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3RycGF0aHM9d2luZG93LmxvY2F0aW9uLmhyZWY7XG5cbiAgICAgICAgICAgICAgICBzdHJwYXRocz1zdHJwYXRocy5yZXBsYWNlKHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF9wYWdlX2lkLCAnJyk7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSBzdHJwYXRocy5zcGxpdChcIi9cIik7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5X3VybF9wYXRoX3BhcmFtcz17fTtcblxuICAgICAgICAgICAgICAgIHBhdGhzLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXRoICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGhhc2VfcGF0aCA9IHBhdGguc3BsaXQoJy0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHM9cGhhc2VfcGF0aC5zbGljZSgxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXT1vbmx5X3ZhbHMuam9pbignICcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoVXJsVmFsICE9ICcnICYmIFVybFZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coVXJsVmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIFVybFZhbCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVXJsVmFsID0gVXJsVmFsLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBVcmxWYWw7IFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlLnZhbHVlID09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gVXJsVmFsLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGhhc1ByZXR0eSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXTtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzUHJldHR5ICE9ICcnICYmIGhhc1ByZXR0eSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gaGFzUHJldHR5OyBcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS52YWx1ZSA9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IGhhc1ByZXR0eS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFJlbmRlciBZYWNodHMgRm9yIFBhZ2UgTG9hZFxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHJhaXlzX2dldF9mb3JtX2RhdGEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuXG4gICAgICAgICAgICAvLyBMaWtlZCAvIExvdmVkIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMueXNfeWFjaHRzX2xvdmVkICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgbG92ZWRfeWFjaHRzID0gSlNPTi5wYXJzZSggbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykgKTtcblxuICAgICAgICAgICAgICAgIGlmIChsb3ZlZF95YWNodHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMueXNfb25seV90aGVzZSA9IGxvdmVkX3lhY2h0cy5qb2luKCcsJyk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy55c19vbmx5X3RoZXNlPVwiMCwwLDBcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKTsgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBtb2JpbGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0nKTtcblxuICAgICAgICBpZiAobW9iaWxlRm9ybSkge1xuICAgICAgICAgICAgbW9iaWxlRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPTE7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXN1cGVyLW1vYmlsZS1zZWFyY2gnKS5zdHlsZS5kaXNwbGF5PSdub25lJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3dZPSd1bnNldCc7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7ICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoIHBhcmFtcyApO1xuXG4gICAgICAgICAgICB9KTsgXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgIH1cblxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChlLCBhcGlFbmRwb2ludCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGZvcm1EYXRhID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7XG4gICAgICAgIGxldCBzdWNjZXNzTWVzc2FnZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnN1Y2Nlc3MtbWVzc2FnZScpO1xuICAgICAgICBjb25zb2xlLmxvZyhmb3JtRGF0YSlcbiAgICAgICAgcmFpX3lzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIGFwaUVuZHBvaW50LCBmb3JtRGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGFfcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgc3VjY2Vzc01lc3NhZ2Uuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgeWFjaHRGb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaW5nbGUteWFjaHQtZGV0aWxzLWxlYWQnKTtcbiAgICB5YWNodEZvcm1zLmZvckVhY2goKGZFbGUpID0+IHtcbiAgICAgICAgZkVsZS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVTdWJtaXQoZSwgXCJ5YWNodC1sZWFkc1wiKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgYnJva2VyRm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2luZ2xlLWJyb2tlci1kZXRpbHMtbGVhZCcpO1xuICAgIGJyb2tlckZvcm1zLmZvckVhY2goKGZFbGUpID0+IHtcbiAgICAgICAgZkVsZS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVTdWJtaXQoZSwgXCJicm9rZXItbGVhZHNcIik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=
