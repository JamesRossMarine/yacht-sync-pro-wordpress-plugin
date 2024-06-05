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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS1wYWdpbmF0aW9uLmpzIiwianF1ZXJ5LW1vZGFsLmpzIiwid2hhdGV2ZXIuanMiLCJjb21tb24uanMiLCJhcGktY2xpZW50LmpzIiwidGVtcGxhdGVzLmpzIiwiZmlsbC1maWVsZHMuanMiLCJ5YWNodFNlYXJjaFRhZ3MuanMiLCJ5YWNodFNlYXJjaExvdmVkLmpzIiwieWFjaHRTZWFyY2hDb21wYXJlLmpzIiwieWFjaHRTZWFyY2guanMiLCJsZWFkcy5qcyJdLCJuYW1lcyI6WyIkIiwibWV0aG9kcyIsImluaXQiLCJvcHRpb25zIiwibyIsImV4dGVuZCIsIml0ZW1zIiwiaXRlbXNPblBhZ2UiLCJwYWdlcyIsImRpc3BsYXllZFBhZ2VzIiwiZWRnZXMiLCJjdXJyZW50UGFnZSIsInVzZUFuY2hvcnMiLCJocmVmVGV4dFByZWZpeCIsImhyZWZUZXh0U3VmZml4IiwicHJldlRleHQiLCJuZXh0VGV4dCIsImVsbGlwc2VUZXh0IiwiZWxsaXBzZVBhZ2VTZXQiLCJjc3NTdHlsZSIsImxpc3RTdHlsZSIsImxhYmVsTWFwIiwic2VsZWN0T25DbGljayIsIm5leHRBdEZyb250IiwiaW52ZXJ0UGFnZU9yZGVyIiwidXNlU3RhcnRFZGdlIiwidXNlRW5kRWRnZSIsIm9uUGFnZUNsaWNrIiwicGFnZU51bWJlciIsImV2ZW50Iiwib25Jbml0Iiwic2VsZiIsIk1hdGgiLCJjZWlsIiwiaGFsZkRpc3BsYXllZCIsImVhY2giLCJhZGRDbGFzcyIsImRhdGEiLCJfZHJhdyIsImNhbGwiLCJzZWxlY3RQYWdlIiwicGFnZSIsIl9zZWxlY3RQYWdlIiwicHJldlBhZ2UiLCJuZXh0UGFnZSIsImdldFBhZ2VzQ291bnQiLCJzZXRQYWdlc0NvdW50IiwiY291bnQiLCJnZXRDdXJyZW50UGFnZSIsImRlc3Ryb3kiLCJlbXB0eSIsImRyYXdQYWdlIiwicmVkcmF3IiwiZGlzYWJsZSIsImRpc2FibGVkIiwiZW5hYmxlIiwidXBkYXRlSXRlbXMiLCJuZXdJdGVtcyIsIl9nZXRQYWdlcyIsInVwZGF0ZUl0ZW1zT25QYWdlIiwiZ2V0SXRlbXNPblBhZ2UiLCJpbnRlcnZhbCIsIl9nZXRJbnRlcnZhbCIsImkiLCJ0YWdOYW1lIiwicHJvcCIsImF0dHIiLCIkcGFuZWwiLCJhcHBlbmRUbyIsIl9hcHBlbmRJdGVtIiwidGV4dCIsImNsYXNzZXMiLCJzdGFydCIsImVuZCIsIm1pbiIsImFwcGVuZCIsImJlZ2luIiwibWF4IiwiX2VsbGlwc2VDbGljayIsInBhZ2VJbmRleCIsIm9wdHMiLCIkbGluayIsIiRsaW5rV3JhcHBlciIsIiR1bCIsImZpbmQiLCJsZW5ndGgiLCJjbGljayIsIiRlbGxpcCIsInBhcmVudCIsInJlbW92ZUNsYXNzIiwiJHRoaXMiLCJ2YWwiLCJwYXJzZUludCIsInByZXYiLCJodG1sIiwiZm9jdXMiLCJzdG9wUHJvcGFnYXRpb24iLCJrZXl1cCIsIndoaWNoIiwiYmluZCIsImZuIiwicGFnaW5hdGlvbiIsIm1ldGhvZCIsImNoYXJBdCIsImFwcGx5IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFyZ3VtZW50cyIsIl90eXBlb2YiLCJlcnJvciIsImpRdWVyeSIsImZhY3RvcnkiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIndpbmRvdyIsImRvY3VtZW50IiwidW5kZWZpbmVkIiwibW9kYWxzIiwiZ2V0Q3VycmVudCIsInNlbGVjdEN1cnJlbnQiLCJzZWxlY3RlZCIsIiRibG9ja2VyIiwidG9nZ2xlQ2xhc3MiLCJ5c3BfbW9kYWwiLCJlbCIsInJlbW92ZSIsInRhcmdldCIsIiRib2R5IiwiZGVmYXVsdHMiLCJkb0ZhZGUiLCJpc05hTiIsImZhZGVEdXJhdGlvbiIsImNsb3NlRXhpc3RpbmciLCJpc0FjdGl2ZSIsImNsb3NlIiwicHVzaCIsImlzIiwiYW5jaG9yIiwidGVzdCIsIiRlbG0iLCJvcGVuIiwibW9kYWwiLCJlbG0iLCJzaG93U3Bpbm5lciIsInRyaWdnZXIiLCJBSkFYX1NFTkQiLCJnZXQiLCJkb25lIiwiQUpBWF9TVUNDRVNTIiwiY3VycmVudCIsIm9uIiwiQ0xPU0UiLCJoaWRlU3Bpbm5lciIsIkFKQVhfQ09NUExFVEUiLCJmYWlsIiwiQUpBWF9GQUlMIiwicG9wIiwiY29uc3RydWN0b3IiLCJtIiwiYmxvY2siLCJibHVyIiwic2V0VGltZW91dCIsInNob3ciLCJmYWRlRGVsYXkiLCJvZmYiLCJlc2NhcGVDbG9zZSIsImNsaWNrQ2xvc2UiLCJlIiwidW5ibG9jayIsImhpZGUiLCJCRUZPUkVfQkxPQ0siLCJfY3R4IiwiY3NzIiwiYmxvY2tlckNsYXNzIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJCTE9DSyIsIm5vdyIsImZhZGVPdXQiLCJjaGlsZHJlbiIsIkJFRk9SRV9PUEVOIiwic2hvd0Nsb3NlIiwiY2xvc2VCdXR0b24iLCJjbG9zZUNsYXNzIiwiY2xvc2VUZXh0IiwibW9kYWxDbGFzcyIsImRpc3BsYXkiLCJPUEVOIiwiQkVGT1JFX0NMT1NFIiwiX3RoaXMiLCJBRlRFUl9DTE9TRSIsInNwaW5uZXIiLCJzcGlubmVySHRtbCIsIiRhbmNob3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlYWR5IiwiY29uc29sZSIsImxvZyIsImRhdGFfbW9kYWwiLCJjb3B5TGluayIsImNvcHlUZXh0IiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3QiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImV4ZWNDb21tYW5kIiwiYWxlcnQiLCJ2YWx1ZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsIm1hcCIsInMiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0cmluZyIsImpvaW4iLCJlbnVtZXJhYmxlIiwicmFpeXNfZ2V0X2Zvcm1fZGF0YSIsImZvcm1fZWxlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImZkIiwiZnJvbUVudHJpZXMiLCJlbnRyaWVzIiwiX2kiLCJfT2JqZWN0JGVudHJpZXMiLCJfT2JqZWN0JGVudHJpZXMkX2kiLCJfc2xpY2VkVG9BcnJheSIsImZJbmRleCIsImZpZWxkIiwiVmFsQXJyYXkiLCJnZXRBbGwiLCJyYWl5c19zZXRfZm9ybV90b19kYXRhIiwiaW5wdXREYXRhIiwiZm9ybUEiLCJxdWVyeVNlbGVjdG9yIiwiZm9ybUIiLCJyZXNldCIsImZvcm1JbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZSIsImlucHV0IiwibmFtZSIsImdldEF0dHJpYnV0ZSIsImhhc1ByZXR0eSIsImlzQXJyYXkiLCJoUCIsInR5cGUiLCJjaGVja2VkIiwicmFpeXNfcHVzaF9oaXN0b3J5Iiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwic3RycGF0aCIsInByb3BlcnR5IiwiaXQiLCJzZXQiLCJ0b1N0cmluZyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJyYWlfeWFjaHRfc3luYyIsInlhY2h0X3NlYXJjaF91cmwiLCJyYWlfeXNwX2FwaSIsImNhbGxfYXBpIiwicGF0aCIsInBhc3NpbmdfZGF0YSIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZURhdGEiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJfcXVlc3Rpb25NYXJrIiwid3BfcmVzdF91cmwiLCJzZW5kIiwic2V0UmVxdWVzdEhlYWRlciIsInN0cmluZ2lmeSIsInlzcF90ZW1wbGF0ZXMiLCJ5YWNodCIsImdyaWQiLCJ2ZXNzZWwiLCJwYXJhbXMiLCJtZXRlcnMiLCJOb21pbmFsTGVuZ3RoIiwicHJpY2UiLCJldXJvcGVfb3B0aW9uX3BpY2tlZCIsInRvRml4ZWQiLCJZU1BfRXVyb1ZhbCIsImNvbmNhdCIsIkludGwiLCJOdW1iZXJGb3JtYXQiLCJtaW5pbXVtRnJhY3Rpb25EaWdpdHMiLCJmb3JtYXQiLCJjdXJyZW5jeSIsIllTUF9VU0RWYWwiLCJfcG9zdElEIiwiRG9jdW1lbnRJRCIsIl9saW5rIiwiSW1hZ2VzIiwiVXJpIiwiYXNzZXRzX3VybCIsIkNvbXBhbnlOYW1lIiwiY29tcGFueV9uYW1lIiwiY29tcGFueV9sb2dvIiwiTW9kZWxZZWFyIiwiTWFrZVN0cmluZyIsIk1vZGVsIiwiQm9hdE5hbWUiLCJDYWJpbnNDb3VudE51bWVyaWMiLCJsaXN0IiwiUHJpY2UiLCJldXJvX2NfYyIsImNvbXBhcmVfcHJldmlldyIsIm5vUmVzdWx0cyIsInlhY2h0X3RhZyIsImxhYmVsIiwibmV4dF90ZXh0IiwicHJldl90ZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVsZV9xdWlja19zZWFyY2giLCJGaWxsT3B0aW9ucyIsInNlbGVjdG9yRWxlbWVudHMiLCJsYWJlbHMiLCJ0aGVuIiwick9wdGlvbnMiLCJfbG9vcCIsIlNlbGVjdG9yRWxlIiwiYiIsIm9wdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJVUkxSRUYiLCJVUkwiLCJsb2NhdGlvbiIsImhyZWYiLCJVcmxWYWwiLCJzdHJwYXRocyIsInJlcGxhY2UiLCJ5YWNodF9zZWFyY2hfcGFnZV9pZCIsInBhdGhzIiwicHJldHR5X3VybF9wYXRoX3BhcmFtcyIsInBoYXNlX3BhdGgiLCJvbmx5X3ZhbHMiLCJlYWNoV29yZENhcGl0YWxpemUiLCJ5c3BfbWFrZVNlYXJjaFRhZ3MiLCJ0YWdzRWxlIiwidGUiLCJpbm5lckhUTUwiLCJ5c3BfdGFnc19ub3RfcHJpbnQiLCJfbG9vcDIiLCJwYXJhbUtleSIsImlubmVyVGV4dCIsImhhc0F0dHJpYnV0ZSIsImluZGV4T2YiLCJlbGVJbnB1dCIsIm5ld1RhZ0VsZSIsInRhZ1ZhbCIsInNlbGVjdGVkSW5kZXgiLCJtYXRjaCIsImVsZVVuaXQiLCJjbGFzc05hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInlzcFRhZ0VsZSIsImtleSIsImN1cnJlbnRUYXJnZXQiLCJpbnB1dEVsZXMiLCJlbGVJIiwiZm9ybSIsInJlcXVlc3RTdWJtaXQiLCJ5c3BfbWFya0xvdmVkVmVzc2VsIiwiZWxlX2NhcmQiLCJ5YWNodElkIiwiaGFzQ2xhc3MiLCJ5c3BfYWRkTG92ZWRWZXNzZWwiLCJ5c3BfcmVtb3ZlTG92ZWRWZXNzZWwiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibG92ZWRWZXNzZWxzIiwic2V0SXRlbSIsImluZGV4ZWQiLCJzcGxpY2UiLCJZU1BfVmVzc2VsQ29tcGFyZUxpc3QiLCJ5c3BfcmVzdG9yZUNvbXBhcmVzIiwiY29tcGFyZV9wb3N0X2lkcyIsInlzcF9tYWtlQ29tcGFyZUxpbmtvdXQiLCJ5c3BfbWFrZUNvbXBhcmVWZXNzZWwiLCJjaGFuZ2UiLCJ5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCIsInlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0IiwiZGF0YV9yZXN1bHQiLCJyZXN1bHRzIiwiaXRlbSIsImVsZV9wcmV2aWV3IiwieXNwQmVmb3JlWWFjaHRTZWFyY2giLCJFdmVudCIsInlzcEFmdGVyWWFjaHRTZWFyY2giLCJ5c3BBZnRlclJlbmRlcmluZ1lhY2h0IiwieXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyIiwiY2xhc3NMaXN0IiwidGl0bGUiLCJTRU8iLCJoZWFkaW5nIiwiZ3B0X3AiLCJtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMiLCJ0b3RhbCIsImN1cnJlbnRVUkwiLCJkb250X3B1c2giLCJ2aWV3IiwidmVzc2VsSW5mbyIsInBhZ2VfaW5kZXgiLCJSZWdFeHAiLCJmb3JtRGF0YU9iamVjdCIsImRvY3VtZW50RWxlbWVudCIsImJvZHkiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJkaXNwYXRjaEV2ZW50IiwiRmlsbExpc3RzIiwibGlzdEVsZW1lbnRzIiwibGlzdE5lZWRlZEVsZW1lbnRzIiwiaW5wdXRfZWxlIiwibGlzdF9pZCIsImVsZV9saXN0IiwiX2xvb3AzIiwieWFjaHRTZWFyY2hBbmRSZXN1bHRzIiwib21zZSIsInN0eWxlIiwib3ZlcmZsb3dZIiwiYXBpX2RhdGEiLCJlbGVSZXNldCIsImVsZUNoZWNrIiwiZWxlVmlld09wdGlvbiIsImlucHV0X25hbWUiLCJvbmx5X3ZhbHNfYXJyYXkiLCJvdiIsInVybFZhbCIsIl9sb29wNCIsInlzX3lhY2h0c19sb3ZlZCIsImxvdmVkX3lhY2h0cyIsInlzX29ubHlfdGhlc2UiLCJtb2JpbGVGb3JtIiwiaGFuZGxlU3VibWl0IiwiYXBpRW5kcG9pbnQiLCJzdWNjZXNzTWVzc2FnZSIsInBhcmVudEVsZW1lbnQiLCJ5YWNodEZvcm1zIiwiZkVsZSIsImJyb2tlckZvcm1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQSxVQUFBQSxDQUFBLEVBQUE7RUFFQSxJQUFBQyxPQUFBLEdBQUE7SUFDQUMsSUFBQSxFQUFBLFNBQUFBLEtBQUFDLE9BQUEsRUFBQTtNQUNBLElBQUFDLENBQUEsR0FBQUosQ0FBQSxDQUFBSyxNQUFBLENBQUE7UUFDQUMsS0FBQSxFQUFBLENBQUE7UUFDQUMsV0FBQSxFQUFBLENBQUE7UUFDQUMsS0FBQSxFQUFBLENBQUE7UUFDQUMsY0FBQSxFQUFBLENBQUE7UUFDQUMsS0FBQSxFQUFBLENBQUE7UUFDQUMsV0FBQSxFQUFBLENBQUE7UUFDQUMsVUFBQSxFQUFBLElBQUE7UUFDQUMsY0FBQSxFQUFBLFFBQUE7UUFDQUMsY0FBQSxFQUFBLEVBQUE7UUFDQUMsUUFBQSxFQUFBLE1BQUE7UUFDQUMsUUFBQSxFQUFBLE1BQUE7UUFDQUMsV0FBQSxFQUFBLFVBQUE7UUFDQUMsY0FBQSxFQUFBLElBQUE7UUFDQUMsUUFBQSxFQUFBLGFBQUE7UUFDQUMsU0FBQSxFQUFBLEVBQUE7UUFDQUMsUUFBQSxFQUFBLEVBQUE7UUFDQUMsYUFBQSxFQUFBLElBQUE7UUFDQUMsV0FBQSxFQUFBLEtBQUE7UUFDQUMsZUFBQSxFQUFBLEtBQUE7UUFDQUMsWUFBQSxFQUFBLElBQUE7UUFDQUMsVUFBQSxFQUFBLElBQUE7UUFDQUMsV0FBQSxFQUFBLFNBQUFBLFlBQUFDLFVBQUEsRUFBQUMsS0FBQSxFQUFBO1VBQ0E7VUFDQTtRQUFBLENBQ0E7UUFDQUMsTUFBQSxFQUFBLFNBQUFBLE9BQUEs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Q0FBQSxNQUFBLEVBQUEyTCxXQUFBLEVBQUF2TyxRQUFBLENBQUEsQ0FDQThHLElBQUEsQ0FBQSxVQUFBbUUsV0FBQSxFQUFBO01BQ0F1RCxjQUFBLENBQUFqQixLQUFBLENBQUF6UCxPQUFBLEdBQUEsT0FBQTtNQUNBbkIsQ0FBQSxDQUFBekMsTUFBQSxDQUFBcVQsS0FBQSxDQUFBelAsT0FBQSxHQUFBLE1BQUE7SUFDQSxDQUFBLENBQUEsU0FDQSxDQUFBLFVBQUE5RSxLQUFBLEVBQUE7TUFDQXdGLE9BQUEsQ0FBQUMsR0FBQSxDQUFBekYsS0FBQSxDQUFBO0lBQ0EsQ0FBQSxDQUFBO0VBQ0E7RUFFQSxJQUFBMFYsVUFBQSxHQUFBblYsUUFBQSxDQUFBNkgsZ0JBQUEsQ0FBQSwyQkFBQSxDQUFBO0VBQ0FzTixVQUFBLENBQUFyTixPQUFBLENBQUEsVUFBQXNOLElBQUEsRUFBQTtJQUNBQSxJQUFBLENBQUFsSSxnQkFBQSxDQUFBLFFBQUEsRUFBQSxVQUFBOUosQ0FBQSxFQUFBO01BQ0EyUixZQUFBLENBQUEzUixDQUFBLEVBQUEsYUFBQSxDQUFBO0lBQ0EsQ0FBQSxDQUFBO0VBQ0EsQ0FBQSxDQUFBO0VBRUEsSUFBQWlTLFdBQUEsR0FBQXJWLFFBQUEsQ0FBQTZILGdCQUFBLENBQUEsNEJBQUEsQ0FBQTtFQUNBd04sV0FBQSxDQUFBdk4sT0FBQSxDQUFBLFVBQUFzTixJQUFBLEVBQUE7SUFDQUEsSUFBQSxDQUFBbEksZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQTlKLENBQUEsRUFBQTtNQUNBMlIsWUFBQSxDQUFBM1IsQ0FBQSxFQUFBLGNBQUEsQ0FBQTtJQUNBLENBQUEsQ0FBQTtFQUNBLENBQUEsQ0FBQTtBQUNBLENBQUEsQ0FBQSIsImZpbGUiOiJnbG9iYWxQbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgLyoqXG4qIHNpbXBsZVBhZ2luYXRpb24uanMgdjEuNlxuKiBBIHNpbXBsZSBqUXVlcnkgcGFnaW5hdGlvbiBwbHVnaW4uXG4qIGh0dHA6Ly9mbGF2aXVzbWF0aXMuZ2l0aHViLmNvbS9zaW1wbGVQYWdpbmF0aW9uLmpzL1xuKlxuKiBDb3B5cmlnaHQgMjAxMiwgRmxhdml1cyBNYXRpc1xuKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4qIGh0dHA6Ly9mbGF2aXVzbWF0aXMuZ2l0aHViLmNvbS9saWNlbnNlLmh0bWxcbiovXG5cbihmdW5jdGlvbigkKXtcblxuXHR2YXIgbWV0aG9kcyA9IHtcblx0XHRpbml0OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cdFx0XHR2YXIgbyA9ICQuZXh0ZW5kKHtcblx0XHRcdFx0aXRlbXM6IDEsXG5cdFx0XHRcdGl0ZW1zT25QYWdlOiAxLFxuXHRcdFx0XHRwYWdlczogMCxcblx0XHRcdFx0ZGlzcGxheWVkUGFnZXM6IDUsXG5cdFx0XHRcdGVkZ2VzOiAyLFxuXHRcdFx0XHRjdXJyZW50UGFnZTogMCxcblx0XHRcdFx0dXNlQW5jaG9yczogdHJ1ZSxcblx0XHRcdFx0aHJlZlRleHRQcmVmaXg6ICcjcGFnZS0nLFxuXHRcdFx0XHRocmVmVGV4dFN1ZmZpeDogJycsXG5cdFx0XHRcdHByZXZUZXh0OiAnUHJldicsXG5cdFx0XHRcdG5leHRUZXh0OiAnTmV4dCcsXG5cdFx0XHRcdGVsbGlwc2VUZXh0OiAnJmhlbGxpcDsnLFxuXHRcdFx0XHRlbGxpcHNlUGFnZVNldDogdHJ1ZSxcblx0XHRcdFx0Y3NzU3R5bGU6ICdsaWdodC10aGVtZScsXG5cdFx0XHRcdGxpc3RTdHlsZTogJycsXG5cdFx0XHRcdGxhYmVsTWFwOiBbXSxcblx0XHRcdFx0c2VsZWN0T25DbGljazogdHJ1ZSxcblx0XHRcdFx0bmV4dEF0RnJvbnQ6IGZhbHNlLFxuXHRcdFx0XHRpbnZlcnRQYWdlT3JkZXI6IGZhbHNlLFxuXHRcdFx0XHR1c2VTdGFydEVkZ2UgOiB0cnVlLFxuXHRcdFx0XHR1c2VFbmRFZGdlIDogdHJ1ZSxcblx0XHRcdFx0b25QYWdlQ2xpY2s6IGZ1bmN0aW9uKHBhZ2VOdW1iZXIsIGV2ZW50KSB7XG5cdFx0XHRcdFx0Ly8gQ2FsbGJhY2sgdHJpZ2dlcmVkIHdoZW4gYSBwYWdlIGlzIGNsaWNrZWRcblx0XHRcdFx0XHQvLyBQYWdlIG51bWJlciBpcyBnaXZlbiBhcyBhbiBvcHRpb25hbCBwYXJhbWV0ZXJcblx0XHRcdFx0fSxcblx0XHRcdFx0b25Jbml0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQvLyBDYWxsYmFjayB0cmlnZ2VyZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgaW5pdGlhbGl6YXRpb25cblx0XHRcdFx0fVxuXHRcdFx0fSwgb3B0aW9ucyB8fCB7fSk7XG5cblx0XHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdFx0by5wYWdlcyA9IG8ucGFnZXMgPyBvLnBhZ2VzIDogTWF0aC5jZWlsKG8uaXRlbXMgLyBvLml0ZW1zT25QYWdlKSA/IE1hdGguY2VpbChvLml0ZW1zIC8gby5pdGVtc09uUGFnZSkgOiAxO1xuXHRcdFx0aWYgKG8uY3VycmVudFBhZ2UpXG5cdFx0XHRcdG8uY3VycmVudFBhZ2UgPSBvLmN1cnJlbnRQYWdlIC0gMTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0by5jdXJyZW50UGFnZSA9ICFvLmludmVydFBhZ2VPcmRlciA/IDAgOiBvLnBhZ2VzIC0gMTtcblx0XHRcdG8uaGFsZkRpc3BsYXllZCA9IG8uZGlzcGxheWVkUGFnZXMgLyAyO1xuXG5cdFx0XHR0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuYWRkQ2xhc3Moby5jc3NTdHlsZSArICcgc2ltcGxlLXBhZ2luYXRpb24nKS5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbChzZWxmKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRvLm9uSW5pdCgpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0c2VsZWN0UGFnZTogZnVuY3Rpb24ocGFnZSkge1xuXHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIHBhZ2UgLSAxKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRwcmV2UGFnZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA+IDApIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSAtIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA8IG8ucGFnZXMgLSAxKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgKyAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdG5leHRQYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlIDwgby5wYWdlcyAtIDEpIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA+IDApIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSAtIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Z2V0UGFnZXNDb3VudDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJykucGFnZXM7XG5cdFx0fSxcblxuXHRcdHNldFBhZ2VzQ291bnQ6IGZ1bmN0aW9uKGNvdW50KSB7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5wYWdlcyA9IGNvdW50O1xuXHRcdH0sXG5cblx0XHRnZXRDdXJyZW50UGFnZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLmN1cnJlbnRQYWdlICsgMTtcblx0XHR9LFxuXG5cdFx0ZGVzdHJveTogZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuZW1wdHkoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRkcmF3UGFnZTogZnVuY3Rpb24gKHBhZ2UpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmN1cnJlbnRQYWdlID0gcGFnZSAtIDE7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRyZWRyYXc6IGZ1bmN0aW9uKCl7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0ZGlzYWJsZTogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGVuYWJsZTogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHR1cGRhdGVJdGVtczogZnVuY3Rpb24gKG5ld0l0ZW1zKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5pdGVtcyA9IG5ld0l0ZW1zO1xuXHRcdFx0by5wYWdlcyA9IG1ldGhvZHMuX2dldFBhZ2VzKG8pO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZUl0ZW1zT25QYWdlOiBmdW5jdGlvbiAoaXRlbXNPblBhZ2UpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLml0ZW1zT25QYWdlID0gaXRlbXNPblBhZ2U7XG5cdFx0XHRvLnBhZ2VzID0gbWV0aG9kcy5fZ2V0UGFnZXMobyk7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCAwKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRnZXRJdGVtc09uUGFnZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJykuaXRlbXNPblBhZ2U7XG5cdFx0fSxcblxuXHRcdF9kcmF3OiBmdW5jdGlvbigpIHtcblx0XHRcdHZhclx0byA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLFxuXHRcdFx0XHRpbnRlcnZhbCA9IG1ldGhvZHMuX2dldEludGVydmFsKG8pLFxuXHRcdFx0XHRpLFxuXHRcdFx0XHR0YWdOYW1lO1xuXG5cdFx0XHRtZXRob2RzLmRlc3Ryb3kuY2FsbCh0aGlzKTtcblxuXHRcdFx0dGFnTmFtZSA9ICh0eXBlb2YgdGhpcy5wcm9wID09PSAnZnVuY3Rpb24nKSA/IHRoaXMucHJvcCgndGFnTmFtZScpIDogdGhpcy5hdHRyKCd0YWdOYW1lJyk7XG5cblx0XHRcdHZhciAkcGFuZWwgPSB0YWdOYW1lID09PSAnVUwnID8gdGhpcyA6ICQoJzx1bCcgKyAoby5saXN0U3R5bGUgPyAnIGNsYXNzPVwiJyArIG8ubGlzdFN0eWxlICsgJ1wiJyA6ICcnKSArICc+PC91bD4nKS5hcHBlbmRUbyh0aGlzKTtcblxuXHRcdFx0Ly8gR2VuZXJhdGUgUHJldiBsaW5rXG5cdFx0XHRpZiAoby5wcmV2VGV4dCkge1xuXHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgIW8uaW52ZXJ0UGFnZU9yZGVyID8gby5jdXJyZW50UGFnZSAtIDEgOiBvLmN1cnJlbnRQYWdlICsgMSwge3RleHQ6IG8ucHJldlRleHQsIGNsYXNzZXM6ICdwcmV2J30pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBOZXh0IGxpbmsgKGlmIG9wdGlvbiBzZXQgZm9yIGF0IGZyb250KVxuXHRcdFx0aWYgKG8ubmV4dFRleHQgJiYgby5uZXh0QXRGcm9udCkge1xuXHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgIW8uaW52ZXJ0UGFnZU9yZGVyID8gby5jdXJyZW50UGFnZSArIDEgOiBvLmN1cnJlbnRQYWdlIC0gMSwge3RleHQ6IG8ubmV4dFRleHQsIGNsYXNzZXM6ICduZXh0J30pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBzdGFydCBlZGdlc1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuc3RhcnQgPiAwICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYoby51c2VTdGFydEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBlbmQgPSBNYXRoLm1pbihvLmVkZ2VzLCBpbnRlcnZhbC5zdGFydCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgZW5kOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoby5lZGdlcyA8IGludGVydmFsLnN0YXJ0ICYmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIG8uZWRnZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGludGVydmFsLmVuZCA8IG8ucGFnZXMgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZihvLnVzZVN0YXJ0RWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGJlZ2luID0gTWF0aC5tYXgoby5wYWdlcyAtIG8uZWRnZXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSBvLnBhZ2VzIC0gMTsgaSA+PSBiZWdpbjsgaS0tKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoby5wYWdlcyAtIG8uZWRnZXMgPiBpbnRlcnZhbC5lbmQgJiYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIGludGVydmFsIGxpbmtzXG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGZvciAoaSA9IGludGVydmFsLnN0YXJ0OyBpIDwgaW50ZXJ2YWwuZW5kOyBpKyspIHtcblx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAoaSA9IGludGVydmFsLmVuZCAtIDE7IGkgPj0gaW50ZXJ2YWwuc3RhcnQ7IGktLSkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBlbmQgZWRnZXNcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKGludGVydmFsLmVuZCA8IG8ucGFnZXMgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZiAoby5wYWdlcyAtIG8uZWRnZXMgPiBpbnRlcnZhbC5lbmQgJiYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKG8udXNlRW5kRWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGJlZ2luID0gTWF0aC5tYXgoby5wYWdlcyAtIG8uZWRnZXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSBiZWdpbjsgaSA8IG8ucGFnZXM7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuc3RhcnQgPiAwICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYgKG8uZWRnZXMgPCBpbnRlcnZhbC5zdGFydCAmJiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBvLmVkZ2VzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihvLnVzZUVuZEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBlbmQgPSBNYXRoLm1pbihvLmVkZ2VzLCBpbnRlcnZhbC5zdGFydCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSBlbmQgLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIE5leHQgbGluayAodW5sZXNzIG9wdGlvbiBpcyBzZXQgZm9yIGF0IGZyb250KVxuXHRcdFx0aWYgKG8ubmV4dFRleHQgJiYgIW8ubmV4dEF0RnJvbnQpIHtcblx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsICFvLmludmVydFBhZ2VPcmRlciA/IG8uY3VycmVudFBhZ2UgKyAxIDogby5jdXJyZW50UGFnZSAtIDEsIHt0ZXh0OiBvLm5leHRUZXh0LCBjbGFzc2VzOiAnbmV4dCd9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG8uZWxsaXBzZVBhZ2VTZXQgJiYgIW8uZGlzYWJsZWQpIHtcblx0XHRcdFx0bWV0aG9kcy5fZWxsaXBzZUNsaWNrLmNhbGwodGhpcywgJHBhbmVsKTtcblx0XHRcdH1cblxuXHRcdH0sXG5cblx0XHRfZ2V0UGFnZXM6IGZ1bmN0aW9uKG8pIHtcblx0XHRcdHZhciBwYWdlcyA9IE1hdGguY2VpbChvLml0ZW1zIC8gby5pdGVtc09uUGFnZSk7XG5cdFx0XHRyZXR1cm4gcGFnZXMgfHwgMTtcblx0XHR9LFxuXG5cdFx0X2dldEludGVydmFsOiBmdW5jdGlvbihvKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRzdGFydDogTWF0aC5jZWlsKG8uY3VycmVudFBhZ2UgPiBvLmhhbGZEaXNwbGF5ZWQgPyBNYXRoLm1heChNYXRoLm1pbihvLmN1cnJlbnRQYWdlIC0gby5oYWxmRGlzcGxheWVkLCAoby5wYWdlcyAtIG8uZGlzcGxheWVkUGFnZXMpKSwgMCkgOiAwKSxcblx0XHRcdFx0ZW5kOiBNYXRoLmNlaWwoby5jdXJyZW50UGFnZSA+IG8uaGFsZkRpc3BsYXllZCA/IE1hdGgubWluKG8uY3VycmVudFBhZ2UgKyBvLmhhbGZEaXNwbGF5ZWQsIG8ucGFnZXMpIDogTWF0aC5taW4oby5kaXNwbGF5ZWRQYWdlcywgby5wYWdlcykpXG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRfYXBwZW5kSXRlbTogZnVuY3Rpb24ocGFnZUluZGV4LCBvcHRzKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsIG9wdGlvbnMsICRsaW5rLCBvID0gc2VsZi5kYXRhKCdwYWdpbmF0aW9uJyksICRsaW5rV3JhcHBlciA9ICQoJzxsaT48L2xpPicpLCAkdWwgPSBzZWxmLmZpbmQoJ3VsJyk7XG5cblx0XHRcdHBhZ2VJbmRleCA9IHBhZ2VJbmRleCA8IDAgPyAwIDogKHBhZ2VJbmRleCA8IG8ucGFnZXMgPyBwYWdlSW5kZXggOiBvLnBhZ2VzIC0gMSk7XG5cblx0XHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRcdHRleHQ6IHBhZ2VJbmRleCArIDEsXG5cdFx0XHRcdGNsYXNzZXM6ICcnXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoby5sYWJlbE1hcC5sZW5ndGggJiYgby5sYWJlbE1hcFtwYWdlSW5kZXhdKSB7XG5cdFx0XHRcdG9wdGlvbnMudGV4dCA9IG8ubGFiZWxNYXBbcGFnZUluZGV4XTtcblx0XHRcdH1cblxuXHRcdFx0b3B0aW9ucyA9ICQuZXh0ZW5kKG9wdGlvbnMsIG9wdHMgfHwge30pO1xuXG5cdFx0XHRpZiAocGFnZUluZGV4ID09IG8uY3VycmVudFBhZ2UgfHwgby5kaXNhYmxlZCkge1xuXHRcdFx0XHRpZiAoby5kaXNhYmxlZCB8fCBvcHRpb25zLmNsYXNzZXMgPT09ICdwcmV2JyB8fCBvcHRpb25zLmNsYXNzZXMgPT09ICduZXh0Jykge1xuXHRcdFx0XHRcdCRsaW5rV3JhcHBlci5hZGRDbGFzcygnZGlzYWJsZWQnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkbGlua1dyYXBwZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCRsaW5rID0gJCgnPHNwYW4gY2xhc3M9XCJjdXJyZW50XCI+JyArIChvcHRpb25zLnRleHQpICsgJzwvc3Bhbj4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvLnVzZUFuY2hvcnMpIHtcblx0XHRcdFx0XHQkbGluayA9ICQoJzxhIGhyZWY9XCInICsgby5ocmVmVGV4dFByZWZpeCArIChwYWdlSW5kZXggKyAxKSArIG8uaHJlZlRleHRTdWZmaXggKyAnXCIgY2xhc3M9XCJwYWdlLWxpbmtcIj4nICsgKG9wdGlvbnMudGV4dCkgKyAnPC9hPicpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRsaW5rID0gJCgnPHNwYW4gPicgKyAob3B0aW9ucy50ZXh0KSArICc8L3NwYW4+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JGxpbmsuY2xpY2soZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0XHRcdHJldHVybiBtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwoc2VsZiwgcGFnZUluZGV4LCBldmVudCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3B0aW9ucy5jbGFzc2VzKSB7XG5cdFx0XHRcdCRsaW5rLmFkZENsYXNzKG9wdGlvbnMuY2xhc3Nlcyk7XG5cdFx0XHR9XG5cblx0XHRcdCRsaW5rV3JhcHBlci5hcHBlbmQoJGxpbmspO1xuXG5cdFx0XHRpZiAoJHVsLmxlbmd0aCkge1xuXHRcdFx0XHQkdWwuYXBwZW5kKCRsaW5rV3JhcHBlcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZWxmLmFwcGVuZCgkbGlua1dyYXBwZXIpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfc2VsZWN0UGFnZTogZnVuY3Rpb24ocGFnZUluZGV4LCBldmVudCkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uY3VycmVudFBhZ2UgPSBwYWdlSW5kZXg7XG5cdFx0XHRpZiAoby5zZWxlY3RPbkNsaWNrKSB7XG5cdFx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvLm9uUGFnZUNsaWNrKHBhZ2VJbmRleCArIDEsIGV2ZW50KTtcblx0XHR9LFxuXG5cblx0XHRfZWxsaXBzZUNsaWNrOiBmdW5jdGlvbigkcGFuZWwpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdFx0byA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLFxuXHRcdFx0XHQkZWxsaXAgPSAkcGFuZWwuZmluZCgnLmVsbGlwc2UnKTtcblx0XHRcdCRlbGxpcC5hZGRDbGFzcygnY2xpY2thYmxlJykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0XHQkZWxsaXAuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0aWYgKCFvLmRpc2FibGUpIHtcblx0XHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxuXHRcdFx0XHRcdFx0dmFsID0gKHBhcnNlSW50KCR0aGlzLnBhcmVudCgpLnByZXYoKS50ZXh0KCksIDEwKSB8fCAwKSArIDE7XG5cdFx0XHRcdFx0JHRoaXNcblx0XHRcdFx0XHRcdC5odG1sKCc8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjFcIiBtYXg9XCInICsgby5wYWdlcyArICdcIiBzdGVwPVwiMVwiIHZhbHVlPVwiJyArIHZhbCArICdcIj4nKVxuXHRcdFx0XHRcdFx0LmZpbmQoJ2lucHV0Jylcblx0XHRcdFx0XHRcdC5mb2N1cygpXG5cdFx0XHRcdFx0XHQuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0Ly8gcHJldmVudCBpbnB1dCBudW1iZXIgYXJyb3dzIGZyb20gYnViYmxpbmcgYSBjbGljayBldmVudCBvbiAkZWxsaXBcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmtleXVwKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAoZXZlbnQud2hpY2ggPT09IDEzICYmIHZhbCAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBlbnRlciB0byBhY2NlcHRcblx0XHRcdFx0XHRcdFx0XHRpZiAoKHZhbD4wKSYmKHZhbDw9by5wYWdlcykpXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHNlbGYsIHZhbCAtIDEpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09PSAyNykge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGVzY2FwZSB0byBjYW5jZWxcblx0XHRcdFx0XHRcdFx0XHQkZWxsaXAuZW1wdHkoKS5odG1sKG8uZWxsaXBzZVRleHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmJpbmQoJ2JsdXInLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblx0XHRcdFx0XHRcdFx0aWYgKHZhbCAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwoc2VsZiwgdmFsIC0gMSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0JGVsbGlwLmVtcHR5KCkuaHRtbChvLmVsbGlwc2VUZXh0KTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH07XG5cblx0JC5mbi5wYWdpbmF0aW9uID0gZnVuY3Rpb24obWV0aG9kKSB7XG5cblx0XHQvLyBNZXRob2QgY2FsbGluZyBsb2dpY1xuXHRcdGlmIChtZXRob2RzW21ldGhvZF0gJiYgbWV0aG9kLmNoYXJBdCgwKSAhPSAnXycpIHtcblx0XHRcdHJldHVybiBtZXRob2RzW21ldGhvZF0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQuZXJyb3IoJ01ldGhvZCAnICsgIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LnBhZ2luYXRpb24nKTtcblx0XHR9XG5cblx0fTtcblxufSkoalF1ZXJ5KTsiLCIvKlxuICAgIEEgc2ltcGxlIGpRdWVyeSBtb2RhbCAoaHR0cDovL2dpdGh1Yi5jb20va3lsZWZveC9qcXVlcnktbW9kYWwpXG4gICAgVmVyc2lvbiAwLjkuMlxuKi9cblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gIC8vIE1ha2luZyB5b3VyIGpRdWVyeSBwbHVnaW4gd29yayBiZXR0ZXIgd2l0aCBucG0gdG9vbHNcbiAgLy8gaHR0cDovL2Jsb2cubnBtanMub3JnL3Bvc3QvMTEyNzEyMTY5ODMwL21ha2luZy15b3VyLWpxdWVyeS1wbHVnaW4td29yay1iZXR0ZXItd2l0aC1ucG1cbiAgaWYodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHdpbmRvdywgZG9jdW1lbnQpO1xuICB9XG4gIGVsc2Uge1xuICAgIGZhY3RvcnkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50KTtcbiAgfVxufShmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcblxuICB2YXIgbW9kYWxzID0gW10sXG4gICAgICBnZXRDdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBtb2RhbHMubGVuZ3RoID8gbW9kYWxzW21vZGFscy5sZW5ndGggLSAxXSA6IG51bGw7XG4gICAgICB9LFxuICAgICAgc2VsZWN0Q3VycmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIHNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAoaT1tb2RhbHMubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xuICAgICAgICAgIGlmIChtb2RhbHNbaV0uJGJsb2NrZXIpIHtcbiAgICAgICAgICAgIG1vZGFsc1tpXS4kYmxvY2tlci50b2dnbGVDbGFzcygnY3VycmVudCcsIXNlbGVjdGVkKS50b2dnbGVDbGFzcygnYmVoaW5kJyxzZWxlY3RlZCk7XG4gICAgICAgICAgICBzZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICQueXNwX21vZGFsID0gZnVuY3Rpb24oZWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgcmVtb3ZlLCB0YXJnZXQ7XG4gICAgdGhpcy4kYm9keSA9ICQoJ2JvZHknKTtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJC55c3BfbW9kYWwuZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIHRoaXMub3B0aW9ucy5kb0ZhZGUgPSAhaXNOYU4ocGFyc2VJbnQodGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiwgMTApKTtcbiAgICB0aGlzLiRibG9ja2VyID0gbnVsbDtcbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlRXhpc3RpbmcpXG4gICAgICB3aGlsZSAoJC55c3BfbW9kYWwuaXNBY3RpdmUoKSlcbiAgICAgICAgJC55c3BfbW9kYWwuY2xvc2UoKTsgLy8gQ2xvc2UgYW55IG9wZW4gbW9kYWxzLlxuICAgIG1vZGFscy5wdXNoKHRoaXMpO1xuICAgIGlmIChlbC5pcygnYScpKSB7XG4gICAgICB0YXJnZXQgPSBlbC5hdHRyKCdocmVmJyk7XG4gICAgICB0aGlzLmFuY2hvciA9IGVsO1xuICAgICAgLy9TZWxlY3QgZWxlbWVudCBieSBpZCBmcm9tIGhyZWZcbiAgICAgIGlmICgvXiMvLnRlc3QodGFyZ2V0KSkge1xuICAgICAgICB0aGlzLiRlbG0gPSAkKHRhcmdldCk7XG4gICAgICAgIGlmICh0aGlzLiRlbG0ubGVuZ3RoICE9PSAxKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kZWxtKTtcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAvL0FKQVhcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsbSA9ICQoJzxkaXY+Jyk7XG4gICAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuJGVsbSk7XG4gICAgICAgIHJlbW92ZSA9IGZ1bmN0aW9uKGV2ZW50LCBtb2RhbCkgeyBtb2RhbC5lbG0ucmVtb3ZlKCk7IH07XG4gICAgICAgIHRoaXMuc2hvd1NwaW5uZXIoKTtcbiAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX1NFTkQpO1xuICAgICAgICAkLmdldCh0YXJnZXQpLmRvbmUoZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSkgcmV0dXJuO1xuICAgICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9TVUNDRVNTKTtcbiAgICAgICAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcbiAgICAgICAgICBjdXJyZW50LiRlbG0uZW1wdHkoKS5hcHBlbmQoaHRtbCkub24oJC55c3BfbW9kYWwuQ0xPU0UsIHJlbW92ZSk7XG4gICAgICAgICAgY3VycmVudC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgIGN1cnJlbnQub3BlbigpO1xuICAgICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9DT01QTEVURSk7XG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX0ZBSUwpO1xuICAgICAgICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuICAgICAgICAgIGN1cnJlbnQuaGlkZVNwaW5uZXIoKTtcbiAgICAgICAgICBtb2RhbHMucG9wKCk7IC8vIHJlbW92ZSBleHBlY3RlZCBtb2RhbCBmcm9tIHRoZSBsaXN0XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX0NPTVBMRVRFKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsbSA9IGVsO1xuICAgICAgdGhpcy5hbmNob3IgPSBlbDtcbiAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuJGVsbSk7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH07XG5cbiAgJC55c3BfbW9kYWwucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiAkLnlzcF9tb2RhbCxcblxuICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG0gPSB0aGlzO1xuICAgICAgdGhpcy5ibG9jaygpO1xuICAgICAgdGhpcy5hbmNob3IuYmx1cigpO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmRvRmFkZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG0uc2hvdygpO1xuICAgICAgICB9LCB0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uICogdGhpcy5vcHRpb25zLmZhZGVEZWxheSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgIH1cbiAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5ZG93bi5tb2RhbCcpLm9uKCdrZXlkb3duLm1vZGFsJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMjcgJiYgY3VycmVudC5vcHRpb25zLmVzY2FwZUNsb3NlKSBjdXJyZW50LmNsb3NlKCk7XG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2xpY2tDbG9zZSlcbiAgICAgICAgdGhpcy4kYmxvY2tlci5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSB0aGlzKVxuICAgICAgICAgICAgJC55c3BfbW9kYWwuY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgIG1vZGFscy5wb3AoKTtcbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICBpZiAoISQueXNwX21vZGFsLmlzQWN0aXZlKCkpXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5ZG93bi5tb2RhbCcpO1xuICAgIH0sXG5cbiAgICBibG9jazogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5CRUZPUkVfQkxPQ0ssIFt0aGlzLl9jdHgoKV0pO1xuICAgICAgdGhpcy4kYm9keS5jc3MoJ292ZXJmbG93JywnaGlkZGVuJyk7XG4gICAgICB0aGlzLiRibG9ja2VyID0gJCgnPGRpdiBjbGFzcz1cIicgKyB0aGlzLm9wdGlvbnMuYmxvY2tlckNsYXNzICsgJyBibG9ja2VyIGN1cnJlbnRcIj48L2Rpdj4nKS5hcHBlbmRUbyh0aGlzLiRib2R5KTtcbiAgICAgIHNlbGVjdEN1cnJlbnQoKTtcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgdGhpcy4kYmxvY2tlci5jc3MoJ29wYWNpdHknLDApLmFuaW1hdGUoe29wYWNpdHk6IDF9LCB0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkJMT0NLLCBbdGhpcy5fY3R4KCldKTtcbiAgICB9LFxuXG4gICAgdW5ibG9jazogZnVuY3Rpb24obm93KSB7XG4gICAgICBpZiAoIW5vdyAmJiB0aGlzLm9wdGlvbnMuZG9GYWRlKVxuICAgICAgICB0aGlzLiRibG9ja2VyLmZhZGVPdXQodGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiwgdGhpcy51bmJsb2NrLmJpbmQodGhpcyx0cnVlKSk7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy4kYmxvY2tlci5jaGlsZHJlbigpLmFwcGVuZFRvKHRoaXMuJGJvZHkpO1xuICAgICAgICB0aGlzLiRibG9ja2VyLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLiRibG9ja2VyID0gbnVsbDtcbiAgICAgICAgc2VsZWN0Q3VycmVudCgpO1xuICAgICAgICBpZiAoISQueXNwX21vZGFsLmlzQWN0aXZlKCkpXG4gICAgICAgICAgdGhpcy4kYm9keS5jc3MoJ292ZXJmbG93JywnJyk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkVGT1JFX09QRU4sIFt0aGlzLl9jdHgoKV0pO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaG93Q2xvc2UpIHtcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbiA9ICQoJzxhIGhyZWY9XCIjY2xvc2UtbW9kYWxcIiByZWw9XCJtb2RhbDpjbG9zZVwiIGNsYXNzPVwiY2xvc2UtbW9kYWwgJyArIHRoaXMub3B0aW9ucy5jbG9zZUNsYXNzICsgJ1wiPicgKyB0aGlzLm9wdGlvbnMuY2xvc2VUZXh0ICsgJzwvYT4nKTtcbiAgICAgICAgdGhpcy4kZWxtLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsbS5hZGRDbGFzcyh0aGlzLm9wdGlvbnMubW9kYWxDbGFzcykuYXBwZW5kVG8odGhpcy4kYmxvY2tlcik7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuZG9GYWRlKSB7XG4gICAgICAgIHRoaXMuJGVsbS5jc3Moe29wYWNpdHk6IDAsIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snfSkuYW5pbWF0ZSh7b3BhY2l0eTogMX0sIHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZWxtLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLk9QRU4sIFt0aGlzLl9jdHgoKV0pO1xuICAgIH0sXG5cbiAgICBoaWRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkJFRk9SRV9DTE9TRSwgW3RoaXMuX2N0eCgpXSk7XG4gICAgICBpZiAodGhpcy5jbG9zZUJ1dHRvbikgdGhpcy5jbG9zZUJ1dHRvbi5yZW1vdmUoKTtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuZG9GYWRlKSB7XG4gICAgICAgIHRoaXMuJGVsbS5mYWRlT3V0KHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQUZURVJfQ0xPU0UsIFtfdGhpcy5fY3R4KCldKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRlbG0uaGlkZSgwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkFGVEVSX0NMT1NFLCBbX3RoaXMuX2N0eCgpXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQ0xPU0UsIFt0aGlzLl9jdHgoKV0pO1xuICAgIH0sXG5cbiAgICBzaG93U3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5zaG93U3Bpbm5lcikgcmV0dXJuO1xuICAgICAgdGhpcy5zcGlubmVyID0gdGhpcy5zcGlubmVyIHx8ICQoJzxkaXYgY2xhc3M9XCInICsgdGhpcy5vcHRpb25zLm1vZGFsQ2xhc3MgKyAnLXNwaW5uZXJcIj48L2Rpdj4nKVxuICAgICAgICAuYXBwZW5kKHRoaXMub3B0aW9ucy5zcGlubmVySHRtbCk7XG4gICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLnNwaW5uZXIpO1xuICAgICAgdGhpcy5zcGlubmVyLnNob3coKTtcbiAgICB9LFxuXG4gICAgaGlkZVNwaW5uZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuc3Bpbm5lcikgdGhpcy5zcGlubmVyLnJlbW92ZSgpO1xuICAgIH0sXG5cbiAgICAvL1JldHVybiBjb250ZXh0IGZvciBjdXN0b20gZXZlbnRzXG4gICAgX2N0eDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4geyBlbG06IHRoaXMuJGVsbSwgJGVsbTogdGhpcy4kZWxtLCAkYmxvY2tlcjogdGhpcy4kYmxvY2tlciwgb3B0aW9uczogdGhpcy5vcHRpb25zLCAkYW5jaG9yOiB0aGlzLmFuY2hvciB9O1xuICAgIH1cbiAgfTtcblxuICAkLnlzcF9tb2RhbC5jbG9zZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKCEkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKSByZXR1cm47XG4gICAgaWYgKGV2ZW50KSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuICAgIGN1cnJlbnQuY2xvc2UoKTtcbiAgICByZXR1cm4gY3VycmVudC4kZWxtO1xuICB9O1xuXG4gIC8vIFJldHVybnMgaWYgdGhlcmUgY3VycmVudGx5IGlzIGFuIGFjdGl2ZSBtb2RhbFxuICAkLnlzcF9tb2RhbC5pc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbW9kYWxzLmxlbmd0aCA+IDA7XG4gIH07XG5cbiAgJC55c3BfbW9kYWwuZ2V0Q3VycmVudCA9IGdldEN1cnJlbnQ7XG5cbiAgJC55c3BfbW9kYWwuZGVmYXVsdHMgPSB7XG4gICAgY2xvc2VFeGlzdGluZzogdHJ1ZSxcbiAgICBlc2NhcGVDbG9zZTogdHJ1ZSxcbiAgICBjbGlja0Nsb3NlOiB0cnVlLFxuICAgIGNsb3NlVGV4dDogJ0Nsb3NlJyxcbiAgICBjbG9zZUNsYXNzOiAnJyxcbiAgICBtb2RhbENsYXNzOiBcInlzcC1tb2RhbFwiLFxuICAgIGJsb2NrZXJDbGFzczogXCJqcXVlcnktbW9kYWxcIixcbiAgICBzcGlubmVySHRtbDogJzxkaXYgY2xhc3M9XCJyZWN0MVwiPjwvZGl2PjxkaXYgY2xhc3M9XCJyZWN0MlwiPjwvZGl2PjxkaXYgY2xhc3M9XCJyZWN0M1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJyZWN0NFwiPjwvZGl2PicsXG4gICAgc2hvd1NwaW5uZXI6IHRydWUsXG4gICAgc2hvd0Nsb3NlOiB0cnVlLFxuICAgIGZhZGVEdXJhdGlvbjogbnVsbCwgICAvLyBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoZSBmYWRlIGFuaW1hdGlvbiB0YWtlcy5cbiAgICBmYWRlRGVsYXk6IDEuMCAgICAgICAgLy8gUG9pbnQgZHVyaW5nIHRoZSBvdmVybGF5J3MgZmFkZS1pbiB0aGF0IHRoZSBtb2RhbCBiZWdpbnMgdG8gZmFkZSBpbiAoLjUgPSA1MCUsIDEuNSA9IDE1MCUsIGV0Yy4pXG4gIH07XG5cbiAgLy8gRXZlbnQgY29uc3RhbnRzXG4gICQueXNwX21vZGFsLkJFRk9SRV9CTE9DSyA9ICdtb2RhbDpiZWZvcmUtYmxvY2snO1xuICAkLnlzcF9tb2RhbC5CTE9DSyA9ICdtb2RhbDpibG9jayc7XG4gICQueXNwX21vZGFsLkJFRk9SRV9PUEVOID0gJ21vZGFsOmJlZm9yZS1vcGVuJztcbiAgJC55c3BfbW9kYWwuT1BFTiA9ICdtb2RhbDpvcGVuJztcbiAgJC55c3BfbW9kYWwuQkVGT1JFX0NMT1NFID0gJ21vZGFsOmJlZm9yZS1jbG9zZSc7XG4gICQueXNwX21vZGFsLkNMT1NFID0gJ21vZGFsOmNsb3NlJztcbiAgJC55c3BfbW9kYWwuQUZURVJfQ0xPU0UgPSAnbW9kYWw6YWZ0ZXItY2xvc2UnO1xuICAkLnlzcF9tb2RhbC5BSkFYX1NFTkQgPSAnbW9kYWw6YWpheDpzZW5kJztcbiAgJC55c3BfbW9kYWwuQUpBWF9TVUNDRVNTID0gJ21vZGFsOmFqYXg6c3VjY2Vzcyc7XG4gICQueXNwX21vZGFsLkFKQVhfRkFJTCA9ICdtb2RhbDphamF4OmZhaWwnO1xuICAkLnlzcF9tb2RhbC5BSkFYX0NPTVBMRVRFID0gJ21vZGFsOmFqYXg6Y29tcGxldGUnO1xuXG4gICQuZm4ueXNwX21vZGFsID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBuZXcgJC55c3BfbW9kYWwodGhpcywgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIEF1dG9tYXRpY2FsbHkgYmluZCBsaW5rcyB3aXRoIHJlbD1cIm1vZGFsOmNsb3NlXCIgdG8sIHdlbGwsIGNsb3NlIHRoZSBtb2RhbC5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLm1vZGFsJywgJ2FbcmVsfj1cIm1vZGFsOmNsb3NlXCJdJywgJC55c3BfbW9kYWwuY2xvc2UpO1xuICAkKGRvY3VtZW50KS5vbignY2xpY2subW9kYWwnLCAnYVtyZWx+PVwibW9kYWw6b3BlblwiXScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkKHRoaXMpLm1vZGFsKCk7XG4gIH0pO1xufSkpOyIsImpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIFxuICBqUXVlcnkoJ1tkYXRhLW1vZGFsXScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgY29uc29sZS5sb2coJ2Z1Y2sgbWUgJyk7XG5cbiAgICB2YXIgZGF0YV9tb2RhbCA9IGpRdWVyeSh0aGlzKS5kYXRhKCdtb2RhbCcpO1xuXG4gICAgalF1ZXJ5KCBkYXRhX21vZGFsICkueXNwX21vZGFsKHtcbiAgICBcdGNsb3NlVGV4dDogJ1gnLFxuICAgICAgbW9kYWxDbGFzczogJ3lzcC1tb2RhbC1vcGVuJyxcbiAgICAgIGNsb3NlQ2xhc3M6ICd5c3AtbW9kZWwtY2xvc2UnXG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGNvcHlMaW5rKCkge1xuXG4gIHZhciBjb3B5VGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29weUxpbmtJbnB1dFwiKTtcblxuICBjb3B5VGV4dC5zZWxlY3QoKTtcbiAgY29weVRleHQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgOTk5OTkpO1xuXG4gIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKTtcblxuICBhbGVydChcIkNvcGllZCB0aGUgbGluazogXCIgKyBjb3B5VGV4dC52YWx1ZSk7XG59IiwiT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0cmluZy5wcm90b3R5cGUsICdlYWNoV29yZENhcGl0YWxpemUnLCB7XG4gIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50b0xvd2VyQ2FzZSgpXG4gICAgLnNwbGl0KCcgJylcbiAgICAubWFwKChzKSA9PiBzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcy5zdWJzdHJpbmcoMSkpXG4gICAgLmpvaW4oJyAnKTtcbiAgfSxcbiAgZW51bWVyYWJsZTogZmFsc2Vcbn0pO1xuXG5mdW5jdGlvbiByYWl5c19nZXRfZm9ybV9kYXRhKGZvcm1fZWxlKSB7XG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCBmb3JtX2VsZSApO1xuXG4gICAgbGV0IGZkPU9iamVjdC5mcm9tRW50cmllcyhmb3JtRGF0YS5lbnRyaWVzKCkpO1xuXG4gICAgZm9yIChjb25zdCBbZkluZGV4LCBmaWVsZF0gb2YgT2JqZWN0LmVudHJpZXMoZmQpKSB7XG5cbiAgICAgICAgbGV0IFZhbEFycmF5ID0gZm9ybURhdGEuZ2V0QWxsKGZJbmRleCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBWYWxBcnJheVsxXSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgZmRbIGZJbmRleCBdID0gVmFsQXJyYXk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmRbIGZJbmRleCBdID09ICcnKSB7XG4gICAgICAgICAgICBkZWxldGUgZmRbZkluZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmZDtcbn1cblxuZnVuY3Rpb24gcmFpeXNfc2V0X2Zvcm1fdG9fZGF0YShpbnB1dERhdGEpIHtcblxuICAgIGxldCBmb3JtQT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJyk7XG4gICAgbGV0IGZvcm1CPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtJyk7XG5cbiAgICBmb3JtQS5yZXNldCgpO1xuICAgIGZvcm1CLnJlc2V0KCk7XG5cbiAgICBsZXQgZm9ybUlucHV0cz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC15YWNodC1zZWFyY2gtZm9ybVwiXSwgI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybVwiXScpO1xuXG4gICAgZm9ybUlucHV0cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgbGV0IGlucHV0ID0gZWxlO1xuXG4gICAgICAgIGxldCBuYW1lID0gZWxlLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG4gICAgICAgIGxldCBoYXNQcmV0dHkgPSBpbnB1dERhdGFbIG5hbWUgXTtcblxuICAgICAgIC8vIGNvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBoYXNQcmV0dHkgIT0gJ251bGwnICYmIHR5cGVvZiBoYXNQcmV0dHkgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaGFzUHJldHR5KSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICAgICAgICAgIGhhc1ByZXR0eS5mb3JFYWNoKChoUCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGhQICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoYXNQcmV0dHkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZSAhPSAnY2hlY2tib3gnICYmIGlucHV0LnR5cGUgIT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGhhc1ByZXR0eTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJhaXlzX3B1c2hfaGlzdG9yeSggZGF0YSA9IHt9ICkge1xuICAgIGxldCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgbGV0IHN0cnBhdGg9Jyc7XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgbGV0IGl0ID0gZGF0YVsgcHJvcGVydHkgXTtcblxuXG4gICAgICAgIGlmIChpdCAhPSAnJyAmJiB0eXBlb2YgaXQgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGl0ID09ICdzdHJpbmcnICYmIHByb3BlcnR5ICE9ICdPbkZpcnN0TG9hZCcgJiYgdHlwZW9mIGl0ICE9ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KHByb3BlcnR5LCBpdCk7XG5cbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aCtcIlwiK3Byb3BlcnR5KyctJysoaXQudG9TdHJpbmcoKS5zcGxpdCgnICcpLmpvaW4oJy0nKSkrJy8nO1xuICAgICAgICAgICAgc3RycGF0aD1zdHJwYXRoLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdCkpIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQocHJvcGVydHksIGl0KTtcblxuICAgICAgICAgICAgaXQgPSBpdC5tYXAoKHByb3ApID0+IHsgcmV0dXJuIHByb3AudG9TdHJpbmcoKS5zcGxpdCgnICcpLmpvaW4oJy0nKTsgfSk7XG5cbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aCtcIlwiK3Byb3BlcnR5KyctJysoIGl0LmpvaW4oXCIrXCIpICkrJy8nO1xuICAgICAgICAgICAgc3RycGF0aD1zdHJwYXRoLnRvTG93ZXJDYXNlKCk7ICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvL2hpc3RvcnkucHVzaFN0YXRlKGRhdGEsICcnLCByYWlfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfdXJsKyc/JytzZWFyY2hQYXJhbXMudG9TdHJpbmcoKSk7XG4gICAgaGlzdG9yeS5wdXNoU3RhdGUoZGF0YSwgJycsIHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF91cmwrc3RycGF0aCk7XG5cbiAgICByZXR1cm4gcmFpX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3VybCtzdHJwYXRoOyAgICBcbn1cblxuIiwidmFyIHJhaV95c3BfYXBpPXt9O1xuXG4gICAgcmFpX3lzcF9hcGkuY2FsbF9hcGk9ZnVuY3Rpb24obWV0aG9kLCBwYXRoLCBwYXNzaW5nX2RhdGEpIHtcbiAgICAgICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgPT0gMjAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9IEpTT04ucGFyc2UoIHRoaXMucmVzcG9uc2VUZXh0ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZURhdGEpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdHRVQnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXNzaW5nX2RhdGEubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gcGFzc2luZ19kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChwcm9wZXJ0eSwgcGFzc2luZ19kYXRhWyBwcm9wZXJ0eSBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIF9xdWVzdGlvbk1hcms9c2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCByYWlfeWFjaHRfc3luYy53cF9yZXN0X3VybCtcInJhaXlzL1wiKyBwYXRoICsgKChfcXVlc3Rpb25NYXJrICE9ICcnKT8nPycrc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk6JycpLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5zZW5kKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdQT1NUJzpcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5vcGVuKFwiUE9TVFwiLCByYWlfeWFjaHRfc3luYy53cF9yZXN0X3VybCtcInJhaXlzL1wiKyBwYXRoLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLnNlbmQoSlNPTi5zdHJpbmdpZnkocGFzc2luZ19kYXRhKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG5cbiAgICB9OyIsInZhciB5c3BfdGVtcGxhdGVzPXt9O1xuXHR5c3BfdGVtcGxhdGVzLnlhY2h0PXt9O1xuXHRcblx0eXNwX3RlbXBsYXRlcy55YWNodC5ncmlkPWZ1bmN0aW9uKHZlc3NlbCwgcGFyYW1zKSB7XG5cdFx0bGV0IG1ldGVycyA9IHBhcnNlSW50KHZlc3NlbC5Ob21pbmFsTGVuZ3RoKSAqIDAuMzA0ODtcblxuXHRcdGxldCBwcmljZSA9ICcnO1xuXHRcdGxldCBsZW5ndGggPSAnJztcblxuXHRcdGlmIChyYWlfeWFjaHRfc3luYy5ldXJvcGVfb3B0aW9uX3BpY2tlZCA9PSBcInllc1wiKSB7XG5cdFx0XHRsZW5ndGggPSB2ZXNzZWwuTm9taW5hbExlbmd0aCA/IG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnO1xuXHRcdFx0cHJpY2UgPSAodHlwZW9mIHZlc3NlbC5ZU1BfRXVyb1ZhbCAhPSAndW5kZWZpbmVkJyAmJiB2ZXNzZWwuWVNQX0V1cm9WYWwgPiAwKSA/IGDigqwke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdCh2ZXNzZWwuWVNQX0V1cm9WYWwpIH1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJztcblx0XHR9IFxuXHRcdGVsc2Uge1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyB2ZXNzZWwuTm9taW5hbExlbmd0aCArIFwiIC8gXCIgKyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblxuXHRcdFx0aWYgKHBhcmFtcy5jdXJyZW5jeSA9PSAnRXVyJykge1xuXHRcdFx0XHRwcmljZSA9ICh0eXBlb2YgdmVzc2VsLllTUF9VU0RWYWwgIT0gJ3VuZGVmaW5lZCcgJiYgdmVzc2VsLllTUF9VU0RWYWwgPiAwKSA/IGDigqwke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdCh2ZXNzZWwuWVNQX0V1cm9WYWwpIH1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJztcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRwcmljZSA9ICh0eXBlb2YgdmVzc2VsLllTUF9VU0RWYWwgIT0gJ3VuZGVmaW5lZCcgJiYgdmVzc2VsLllTUF9VU0RWYWwgPiAwKSA/IGAkJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQodmVzc2VsLllTUF9VU0RWYWwpIH1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJztcblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcmVzdWx0LWdyaWQtaXRlbVwiIGRhdGEtcG9zdC1pZD1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiBkYXRhLXlhY2h0LWlkPVwiJHsgdmVzc2VsLkRvY3VtZW50SUQgfVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8YSBjbGFzcz1cInlhY2h0LWRldGFpbHNcIiBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdDxpbWcgY2xhc3M9XCJ5YWNodC1tYWluLWltYWdlXCIgc3JjPVwiJHt2ZXNzZWwuSW1hZ2VzID8gdmVzc2VsLkltYWdlc1swXS5VcmkgOiByYWlfeWFjaHRfc3luYy5hc3NldHNfdXJsICsgJ2ltYWdlcy9kZWZhdWx0LXlhY2h0LWltYWdlLmpwZWcnfVwiIGFsdD1cInlhY2h0LWltYWdlXCIgbG9hZGluZz1cImxhenlcIiAvPlxuXHRcdFx0XHRcdFx0JHt2ZXNzZWwuQ29tcGFueU5hbWUgPT09IHJhaV95YWNodF9zeW5jLmNvbXBhbnlfbmFtZSA/IGA8ZGl2IGNsYXNzPVwiY29tcGFueS1iYW5uZXJcIj48aW1nIHNyYz1cIiR7cmFpX3lhY2h0X3N5bmMuY29tcGFueV9sb2dvfVwiPjwvZGl2PmAgOiAnJ31cblx0XHRcdFx0XHQ8L2E+XHRcblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1nZW5lcmFsLWluZm8tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXRpdGxlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGEgY2xhc3M9XCJ5YWNodC1kZXRhaWxzXCIgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHRcdDxoNiBjbGFzcz1cInlhY2h0LXRpdGxlXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICcnfSAke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnJ30gJHt2ZXNzZWwuTW9kZWwgPyB2ZXNzZWwuTW9kZWwgOiAnJ30gJHt2ZXNzZWwuQm9hdE5hbWUgPyB2ZXNzZWwuQm9hdE5hbWUgOiAnJ308L2g2PlxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmZvLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZm9cIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+WWVhcjwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+Q2FiaW5zPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLkNhYmluc0NvdW50TnVtZXJpYyA/IHZlc3NlbC5DYWJpbnNDb3VudE51bWVyaWMgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5CdWlsZGVyPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkxlbmd0aDwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke2xlbmd0aH08L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5Db21wYXJlPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImNvbXBhcmVfdG9nZ2xlXCIgbmFtZT1cImNvbXBhcmVcIiB2YWx1ZT1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiAvPjwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcHJpY2UtZGV0YWlscy1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1wcmljZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1wcmljZVwiPiR7cHJpY2V9PC9wPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCJ5YWNodC1kb3dubG9hZC1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1tb2RhbD1cIiNzaW5nbGUtc2hhcmVcIj5Db250YWN0PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwibG92ZVwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXlhY2h0LWlkPVwiJHsgdmVzc2VsLkRvY3VtZW50SUQgfVwiPkxpa2VkPC9idXR0b24+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YDtcblx0fTtcblxuXHR5c3BfdGVtcGxhdGVzLnlhY2h0Lmxpc3Q9ZnVuY3Rpb24odmVzc2VsKSB7XG5cdFx0bGV0IG1ldGVycyA9IHBhcnNlSW50KHZlc3NlbC5Ob21pbmFsTGVuZ3RoKSAqIDAuMzA0ODtcblx0XHRsZXQgcHJpY2UgPSAnJztcblxuXHRcdGlmICh0eXBlb2YgdmVzc2VsLlByaWNlID09ICdzdHJpbmcnKSB7XG5cdFx0XHRsZXQgcHJpY2UgPSB2ZXNzZWwuUHJpY2Uuc2xpY2UoMCwgLTMpO1xuXHRcdH1cblx0XHRcblx0XHRsZXQgbGVuZ3RoID0gJyc7XG5cdFx0XG5cdFx0aWYocmFpX3lhY2h0X3N5bmMuZXVyb3BlX29wdGlvbl9waWNrZWQgPT0gXCJ5ZXNcIil7XG5cdFx0XHRsZW5ndGggPSB2ZXNzZWwuTm9taW5hbExlbmd0aCA/IG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnO1xuXHRcdFx0cHJpY2UgPSB2ZXNzZWwuUHJpY2UgPyBg4oKsICR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KChwYXJzZUludCh2ZXNzZWwuUHJpY2Uuc2xpY2UoMCwgLTMpKSAqIHJhaV95YWNodF9zeW5jLmV1cm9fY19jKSl9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gdmVzc2VsLk5vbWluYWxMZW5ndGggKyBcIiAvIFwiICsgbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cdFx0XHRwcmljZSA9IHZlc3NlbC5QcmljZSA/IGAkICR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHBhcnNlSW50KHZlc3NlbC5QcmljZS5zbGljZSgwLCAtMykpKX1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJ1xuXHRcdH1cblxuXHRcdHJldHVybiBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcmVzdWx0LWdyaWQtaXRlbSBsaXN0LXZpZXdcIiBkYXRhLXBvc3QtaWQ9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1tYWluLWltYWdlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdDxhIGNsYXNzPVwieWFjaHQtZGV0YWlsc1wiIGhyZWY9XCIkeyB2ZXNzZWwuX2xpbmsgfVwiPlxuXHRcdFx0XHRcdFx0PGltZyBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2VcIiBzcmM9XCIke3Zlc3NlbC5JbWFnZXMgPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6IHZlc3NlbC5JbWFnZXMgPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6IHJhaV95YWNodF9zeW5jLmFzc2V0c191cmwgKyAnaW1hZ2VzL2RlZmF1bHQteWFjaHQtaW1hZ2UuanBlZyd9XCIgYWx0PVwieWFjaHQtaW1hZ2VcIiBsb2FkaW5nPVwibGF6eVwiIC8+XG5cdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWdlbmVyYWwtaW5mby1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtdGl0bGUtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzcz1cInlhY2h0LWRldGFpbHNcIiBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdFx0PGg2IGNsYXNzPVwieWFjaHQtdGl0bGVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJyd9ICR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICcnfSAke3Zlc3NlbC5Nb2RlbCA/IHZlc3NlbC5Nb2RlbCA6ICcnfSAke3Zlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICcnfTwvaDY+XG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZm8tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5ZZWFyPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5DYWJpbnM8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuQ2FiaW5zQ291bnROdW1lcmljID8gdmVzc2VsLkNhYmluc0NvdW50TnVtZXJpYyA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkJ1aWxkZXI8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+TGVuZ3RoPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7bGVuZ3RofTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcHJpY2UtZGV0YWlscy1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1wcmljZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1wcmljZVwiPiR7cHJpY2V9PC9wPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwieWFjaHQtZG93bmxvYWQtYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtbW9kYWw9XCIjc2luZ2xlLXNoYXJlXCI+Q29udGFjdDwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0XG5cdFx0YDtcblx0fTtcblxuXHR5c3BfdGVtcGxhdGVzLnlhY2h0LmNvbXBhcmVfcHJldmlldyA9IGZ1bmN0aW9uKHZlc3NlbCwgcGFyYW1zKSB7XG5cblx0XHRyZXR1cm4gYFxuXG5cdFx0XHQ8ZGl2IGNsYXNzPVwieXNwLXlhY2h0LWNvbXBhcmUtcHJldmlld1wiIGRhdGEtcG9zdC1pZD1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiBkYXRhLXlhY2h0LWlkPVwiJHsgdmVzc2VsLkRvY3VtZW50SUQgfVwiPlx0XHRcdFxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cInJlbW92ZS1mcm9tLWNvbXBhcmVcIj5cblx0XHRcdFx0XHQ8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHRcdFx0XHQ8cmVjdCB4PVwiMC41XCIgeT1cIjAuNVwiIHdpZHRoPVwiMjNcIiBoZWlnaHQ9XCIyM1wiIHJ4PVwiMTEuNVwiIHN0cm9rZT1cIiM2QjcwNzNcIi8+XG5cdFx0XHRcdFx0PHBhdGggZD1cIk04LjI2ODc2IDE0LjkzNDZDOC4wNDkwOSAxNS4xNTQzIDguMDQ5MDkgMTUuNTEwNCA4LjI2ODc2IDE1LjczMDFDOC40ODg0MyAxNS45NDk4IDguODQ0NTggMTUuOTQ5OCA5LjA2NDI1IDE1LjczMDFMOC4yNjg3NiAxNC45MzQ2Wk0xMi4zOTc2IDEyLjM5NjhDMTIuNjE3MyAxMi4xNzcxIDEyLjYxNzMgMTEuODIwOSAxMi4zOTc2IDExLjYwMTNDMTIuMTc3OSAxMS4zODE2IDExLjgyMTggMTEuMzgxNiAxMS42MDIxIDExLjYwMTNMMTIuMzk3NiAxMi4zOTY4Wk0xMS42MDE4IDExLjYwMTZDMTEuMzgyMSAxMS44MjEzIDExLjM4MjEgMTIuMTc3NCAxMS42MDE4IDEyLjM5NzFDMTEuODIxNCAxMi42MTY4IDEyLjE3NzYgMTIuNjE2OCAxMi4zOTczIDEyLjM5NzFMMTEuNjAxOCAxMS42MDE2Wk0xNS43MzA2IDkuMDYzNzZDMTUuOTUwMyA4Ljg0NDA5IDE1Ljk1MDMgOC40ODc5NCAxNS43MzA2IDguMjY4MjdDMTUuNTEwOSA4LjA0ODYgMTUuMTU0OCA4LjA0ODYgMTQuOTM1MSA4LjI2ODI3TDE1LjczMDYgOS4wNjM3NlpNMTIuMzk3MyAxMS42MDEzQzEyLjE3NzYgMTEuMzgxNiAxMS44MjE0IDExLjM4MTYgMTEuNjAxOCAxMS42MDEzQzExLjM4MjEgMTEuODIwOSAxMS4zODIxIDEyLjE3NzEgMTEuNjAxOCAxMi4zOTY4TDEyLjM5NzMgMTEuNjAxM1pNMTQuOTM1MSAxNS43MzAxQzE1LjE1NDggMTUuOTQ5OCAxNS41MTA5IDE1Ljk0OTggMTUuNzMwNiAxNS43MzAxQzE1Ljk1MDMgMTUuNTEwNCAxNS45NTAzIDE1LjE1NDMgMTUuNzMwNiAxNC45MzQ2TDE0LjkzNTEgMTUuNzMwMVpNMTEuNjAyMSAxMi4zOTcxQzExLjgyMTggMTIuNjE2OCAxMi4xNzc5IDEyLjYxNjggMTIuMzk3NiAxMi4zOTcxQzEyLjYxNzMgMTIuMTc3NCAxMi42MTczIDExLjgyMTMgMTIuMzk3NiAxMS42MDE2TDExLjYwMjEgMTIuMzk3MVpNOS4wNjQyNSA4LjI2ODI3QzguODQ0NTggOC4wNDg2IDguNDg4NDMgOC4wNDg2IDguMjY4NzYgOC4yNjgyN0M4LjA0OTA5IDguNDg3OTQgOC4wNDkwOSA4Ljg0NDA5IDguMjY4NzYgOS4wNjM3Nkw5LjA2NDI1IDguMjY4MjdaTTkuMDY0MjUgMTUuNzMwMUwxMi4zOTc2IDEyLjM5NjhMMTEuNjAyMSAxMS42MDEzTDguMjY4NzYgMTQuOTM0Nkw5LjA2NDI1IDE1LjczMDFaTTEyLjM5NzMgMTIuMzk3MUwxNS43MzA2IDkuMDYzNzZMMTQuOTM1MSA4LjI2ODI3TDExLjYwMTggMTEuNjAxNkwxMi4zOTczIDEyLjM5NzFaTTExLjYwMTggMTIuMzk2OEwxNC45MzUxIDE1LjczMDFMMTUuNzMwNiAxNC45MzQ2TDEyLjM5NzMgMTEuNjAxM0wxMS42MDE4IDEyLjM5NjhaTTEyLjM5NzYgMTEuNjAxNkw5LjA2NDI1IDguMjY4MjdMOC4yNjg3NiA5LjA2Mzc2TDExLjYwMjEgMTIuMzk3MUwxMi4zOTc2IDExLjYwMTZaXCIgZmlsbD1cIiM2QjcwNzNcIi8+XG5cdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdDwvc3Bhbj5cblxuXG5cdFx0XHRcdDxpbWcgY2xhc3M9XCJ5YWNodC1tYWluLWltYWdlXCIgc3JjPVwiJHt2ZXNzZWwuSW1hZ2VzID8gdmVzc2VsLkltYWdlc1swXS5VcmkgOiByYWlfeWFjaHRfc3luYy5hc3NldHNfdXJsICsgJ2ltYWdlcy9kZWZhdWx0LXlhY2h0LWltYWdlLmpwZWcnfVwiIGFsdD1cInlhY2h0LWltYWdlXCIgbG9hZGluZz1cImxhenlcIiAvPlxuXG5cdFx0XHRcdDxoNiBjbGFzcz1cInlhY2h0LXRpdGxlXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICcnfSAke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnJ30gJHt2ZXNzZWwuTW9kZWwgPyB2ZXNzZWwuTW9kZWwgOiAnJ30gJHt2ZXNzZWwuQm9hdE5hbWUgPyB2ZXNzZWwuQm9hdE5hbWUgOiAnJ308L2g2PlxuXG5cdFx0XHQ8L2Rpdj5cblxuXHRcdGA7XG5cblx0fTtcblxuXHR5c3BfdGVtcGxhdGVzLm5vUmVzdWx0cz1mdW5jdGlvbigpIHtcblxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8Yj5ObyBSZXN1bHRzPC9iPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG5cbiAgICB9O1xuXG5cbiAgICB5c3BfdGVtcGxhdGVzLnlhY2h0X3RhZyA9IGZ1bmN0aW9uKGxhYmVsLCB2YWx1ZSkge1xuXG4gICAgXHRyZXR1cm4gYFxuICAgIFx0XHQ8c3Bhbj5cblx0ICAgIFx0XHQke3ZhbHVlfVxuXG5cdCAgICBcdFx0PGltZyBzcmM9XCIke3JhaV95YWNodF9zeW5jLmFzc2V0c191cmx9L2ltYWdlcy9yZW1vdmUtdGFnLnBuZ1wiPlxuXHRcdFx0PC9zcGFuPlxuICAgIFx0YDtcbiAgICB9O1xuXG4gICAgeXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uID0ge307XG4gICAgXG4gICAgXHR5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24ubmV4dF90ZXh0ID0gYD5gO1xuXG4gICAgXHR5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24ucHJldl90ZXh0ID0gYDxgO1xuXG4iLCJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG5cdGxldCBlbGVfcXVpY2tfc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC1xdWljay1zZWFyY2gtZm9ybScpO1xuXG5cdGlmIChlbGVfcXVpY2tfc2VhcmNoKSB7XG5cdFx0Ly8gRmlsbCBvcHRpb25zXG5cdCAgICBsZXQgRmlsbE9wdGlvbnM9W107XG5cdCAgICBsZXQgc2VsZWN0b3JFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIueXNwLXF1aWNrLXNlYXJjaC1mb3JtIHNlbGVjdFtkYXRhLWZpbGwtb3B0aW9uc11cIik7XG5cblx0ICAgIHNlbGVjdG9yRWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgRmlsbE9wdGlvbnMucHVzaChlbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtb3B0aW9ucycpKTtcblx0ICAgIH0pO1xuXHQgICAgXG5cdCAgICByYWlfeXNwX2FwaS5jYWxsX2FwaSgnUE9TVCcsICdkcm9wZG93bi1vcHRpb25zJywge2xhYmVsczogRmlsbE9wdGlvbnN9KS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG5cdCAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuXHQgICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnlzcC1xdWljay1zZWFyY2gtZm9ybSBzZWxlY3RbZGF0YS1maWxsLW9wdGlvbnM9J1wiKyBsYWJlbCArXCInXVwiKTtcblx0ICAgICAgICAgICAgbGV0IG5hbWUgPSBTZWxlY3RvckVsZVswXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuXHQgICAgICAgICAgICByT3B0aW9uc1tsYWJlbF0uZm9yRWFjaChmdW5jdGlvbihiKSB7XG5cdCAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICAgICAgICAgIFx0bGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJPUFRJT05cIik7XG5cblx0XHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcblx0XHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG5cblx0ICAgICAgICAgICAgICAgICAgICBlbGUuYWRkKG9wdGlvbik7XG5cdCAgICAgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgbGV0IFVSTFJFRiA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG5cdCAgICAgICAgICAgIGxldCBVcmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbmFtZSApO1xuXG5cdCAgICAgICAgICAgIGxldCBzdHJwYXRocz13aW5kb3cubG9jYXRpb24uaHJlZjtcblxuXHQgICAgICAgICAgICBzdHJwYXRocz1zdHJwYXRocy5yZXBsYWNlKHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF9wYWdlX2lkLCAnJyk7XG5cblx0ICAgICAgICAgICAgbGV0IHBhdGhzID0gc3RycGF0aHMuc3BsaXQoXCIvXCIpO1xuXG5cdCAgICAgICAgICAgIGxldCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zPXt9O1xuXG5cdCAgICAgICAgICAgIHBhdGhzLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuXG5cdCAgICAgICAgICAgICAgICBpZiAocGF0aCAhPSAnJykge1xuXHQgICAgICAgICAgICAgICAgICAgIGxldCBwaGFzZV9wYXRoID0gcGF0aC5zcGxpdCgnLScpO1xuXHQgICAgICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHM9cGhhc2VfcGF0aC5zbGljZSgxKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV09b25seV92YWxzLmpvaW4oJyAnKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgXG5cdCAgICAgICAgICAgIGlmIChVcmxWYWwgIT0gJycgJiYgVXJsVmFsICE9IG51bGwpIHtcblx0ICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFVybFZhbCk7XG5cblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgVXJsVmFsID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgVXJsVmFsID0gVXJsVmFsLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBVcmxWYWw7IFxuXHQgICAgICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgfVxuXG5cblx0ICAgICAgICAgICAgbGV0IGhhc1ByZXR0eSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXTtcblxuXHQgICAgICAgICAgICBjb25zb2xlLmxvZyggcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdKTtcblxuXHQgICAgICAgICAgICBpZiAoaGFzUHJldHR5ICE9ICcnICYmIGhhc1ByZXR0eSAhPSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBoYXNQcmV0dHk7IFxuXHQgICAgICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0pXG5cdH1cbn0pOyIsImZ1bmN0aW9uIHlzcF9tYWtlU2VhcmNoVGFncyggZGF0YSApIHtcblxuXHRsZXQgdGFnc0VsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3Atc2VhcmNoLXRhZ3MnKTtcbiAgICAgICAgXG4gICAgaWYgKHRhZ3NFbGUpIHtcbiAgICAgICAgdGFnc0VsZS5mb3JFYWNoKGZ1bmN0aW9uKHRlKSB7XG4gICAgICAgICAgICB0ZS5pbm5lckhUTUw9XCJcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgeXNwX3RhZ3Nfbm90X3ByaW50ID0gWydwYWdlX2luZGV4JywgJyddO1xuXG4gICAgICAgIGZvciAobGV0IHBhcmFtS2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbD0nJztcblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj0nKyBwYXJhbUtleSArJ10nKSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGFiZWw9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGFiZWxbZm9yPScrIHBhcmFtS2V5ICsnXScpLmlubmVyVGV4dDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKltuYW1lPScrIHBhcmFtS2V5ICsnXScpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbbmFtZT0nKyBwYXJhbUtleSArJ10nKS5oYXNBdHRyaWJ1dGUoJ2xhYmVsJykpIHtcblxuICAgICAgICAgICAgICAgIGxhYmVsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbbmFtZT0nKyBwYXJhbUtleSArJ10nKS5nZXRBdHRyaWJ1dGUoJ2xhYmVsJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0YWdzRWxlLmZvckVhY2goZnVuY3Rpb24odGUpIHtcblxuICAgICAgICAgICAgICAgIGlmICh5c3BfdGFnc19ub3RfcHJpbnQuaW5kZXhPZiggcGFyYW1LZXkgKSA9PSAtMSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lPScrIHBhcmFtS2V5ICsnXScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVJbnB1dCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VGFnRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YWdWYWwgPSBkYXRhW3BhcmFtS2V5XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVJbnB1dC50YWdOYW1lID09ICdTRUxFQ1QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCA9IGVsZUlucHV0Lm9wdGlvbnNbIGVsZUlucHV0LnNlbGVjdGVkSW5kZXggXS5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtS2V5Lm1hdGNoKCdwcmljZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCA9ICckJyt0YWdWYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtS2V5Lm1hdGNoKCdsZW5ndGgnKSAmJiBwYXJhbUtleSAhPSAnbGVuZ3RodW5pdCcpICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsZVVuaXQgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybSBbbmFtZT1sZW5ndGh1bml0XTpjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISBlbGVVbml0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlVW5pdCA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIFtuYW1lPWxlbmd0aHVuaXRdJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnVmFsID0gdGFnVmFsICsnICc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZVVuaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCArPSBlbGVVbml0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLmNsYXNzTmFtZSA9ICdidG4gYnRuLXByaW1hcnkgYnRuLXNtIHlzcC10YWcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBsYWJlbCAhPSBudWxsICYmIGxhYmVsICE9ICdudWxsJyAmJiBsYWJlbCAhPSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYWdFbGUuaW5uZXJIVE1MID0geXNwX3RlbXBsYXRlcy55YWNodF90YWcobGFiZWwsIHRhZ1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYWdFbGUuaW5uZXJIVE1MID0geXNwX3RlbXBsYXRlcy55YWNodF90YWcoJycsIHRhZ1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLnNldEF0dHJpYnV0ZSgna2V5JywgcGFyYW1LZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlLmFwcGVuZENoaWxkKCBuZXdUYWdFbGUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXRhZ1trZXk9XCInKyBwYXJhbUtleSArJ1wiXScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygoJy55c3AtdGFnW2tleT1cIicrIHBhcmFtS2V5ICsnXCJdJykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3Bhbi55c3AtdGFnW2tleT1cIicrIHBhcmFtS2V5ICsnXCJdJykuZm9yRWFjaChmdW5jdGlvbih5c3BUYWdFbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5c3BUYWdFbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgna2V5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dEVsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIHNlbGVjdFtuYW1lPScrIGtleSArJ10sIC55c3AteWFjaHQtc2VhcmNoLWZvcm0gaW5wdXRbbmFtZT0nKyBrZXkgKyddJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0RWxlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RWxlcy5mb3JFYWNoKGZ1bmN0aW9uKGVsZUkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVsZUkudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoZWxlSS50eXBlID09ICdjaGVja2JveCcgfHwgZWxlSS50eXBlID09ICdyYWRpbycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZUkuY2hlY2tlZD1mYWxzZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlSS52YWx1ZT0nJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZXNbMF0uZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG59IiwiZnVuY3Rpb24geXNwX21hcmtMb3ZlZFZlc3NlbCggZWxlX2NhcmQgKSB7XG5cbiAgICBqUXVlcnkoJy5sb3ZlJywgZWxlX2NhcmQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgICAgICBqUXVlcnkodGhpcykudG9nZ2xlQ2xhc3MoJ2xvdmVkJyk7XG5cbiAgICAgICAgbGV0IHlhY2h0SWQgPSBqUXVlcnkodGhpcykuZGF0YSgneWFjaHQtaWQnKTtcbiAgICBcbiAgICAgICAgaWYgKCBqUXVlcnkodGhpcykuaGFzQ2xhc3MoJ2xvdmVkJykgKSB7XG4gICAgICAgICAgICB5c3BfYWRkTG92ZWRWZXNzZWwoeWFjaHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB5c3BfcmVtb3ZlTG92ZWRWZXNzZWwoeWFjaHRJZCk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpICE9IFwiXCIpIHtcblxuICAgICAgICBsZXQgbG92ZWRWZXNzZWxzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSk7XG5cbiAgICAgICAgaWYgKGxvdmVkVmVzc2VscyA9PSBudWxsKSB7XG4gICAgICAgICAgICBsb3ZlZFZlc3NlbHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB5YWNodElkID0gZWxlX2NhcmQuZGF0YSgneWFjaHQtaWQnKTtcblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzLmluZGV4T2YoIHlhY2h0SWQgKSAhPSAtMSkge1xuXG4gICAgICAgICAgICBlbGVfY2FyZC5hZGRDbGFzcygnbG92ZWQnKTtcblxuICAgICAgICAgICAgalF1ZXJ5KCcubG92ZScsIGVsZV9jYXJkKS5hZGRDbGFzcygnbG92ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5mdW5jdGlvbiB5c3BfYWRkTG92ZWRWZXNzZWwoIHlhY2h0SWQgKSB7XG5cbiAgICBsZXQgbG92ZWRWZXNzZWxzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSk7XG5cblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzID09IG51bGwpIHtcbiAgICAgICAgICAgIGxvdmVkVmVzc2VscyA9IFtdO1xuICAgICAgICB9XG5cbiAgICBpZiAobG92ZWRWZXNzZWxzLmluZGV4T2YoIHlhY2h0SWQgKSA9PSAtMSkge1xuXG4gICAgICAgIGxvdmVkVmVzc2Vscy5wdXNoKHlhY2h0SWQpO1xuXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBhbHJlYWR5IGFkZGVkXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2cobG92ZWRWZXNzZWxzICk7XG4gICAgXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ5c3BfbG92ZWRfdmVzc2Vsc1wiLCBKU09OLnN0cmluZ2lmeShsb3ZlZFZlc3NlbHMpKTtcblxufSBcblxuZnVuY3Rpb24geXNwX3JlbW92ZUxvdmVkVmVzc2VsKCB5YWNodElkICkge1xuXG4gICAgbGV0IGxvdmVkVmVzc2VscyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykpO1xuXG5cbiAgICAgICAgaWYgKGxvdmVkVmVzc2VscyA9PSBudWxsKSB7XG4gICAgICAgICAgICBsb3ZlZFZlc3NlbHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgbGV0IGluZGV4ZWQgPSBsb3ZlZFZlc3NlbHMuaW5kZXhPZiggeWFjaHRJZCApO1xuXG4gICAgY29uc29sZS5sb2coaW5kZXhlZCk7XG5cbiAgICBpZiAoaW5kZXhlZCAhPSAtMSkge1xuXG4gICAgICAgIGRlbGV0ZSBsb3ZlZFZlc3NlbHNbaW5kZXhlZF07ICAgICAgICBcbiAgICAgICAgbG92ZWRWZXNzZWxzLnNwbGljZShpbmRleGVkLCAxKTtcblxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gYWxyZWFkeSBhZGRlZFxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGxvdmVkVmVzc2VscyApO1xuICAgIFxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwieXNwX2xvdmVkX3Zlc3NlbHNcIiwgSlNPTi5zdHJpbmdpZnkobG92ZWRWZXNzZWxzKSk7XG5cbn0iLCJ2YXIgWVNQX1Zlc3NlbENvbXBhcmVMaXN0PVtdO1xuXG5cbmZ1bmN0aW9uIHlzcF9yZXN0b3JlQ29tcGFyZXMoKSB7XG4gICAgbGV0IFVSTFJFRj1uZXcgVVJMKGxvY2F0aW9uLmhyZWYpOyAvLyBtYXliZSBmb3IgYSByZS1kb1xuICAgIGxldCBjb21wYXJlX3Bvc3RfaWRzID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoICdyZXN0b3JlX3RvX2NvbXBhcmUnICk7IFxuXG4gICAgY29uc29sZS5sb2codHlwZW9mIGNvbXBhcmVfcG9zdF9pZHMpO1xuICAgIGNvbnNvbGUubG9nKGNvbXBhcmVfcG9zdF9pZHMpO1xuXG4gICAgaWYgKHR5cGVvZiBjb21wYXJlX3Bvc3RfaWRzID09ICdzdHJpbmcnKSB7XG4gICAgICAgIFlTUF9WZXNzZWxDb21wYXJlTGlzdCA9IGNvbXBhcmVfcG9zdF9pZHMuc3BsaXQoJywnKTtcbiAgICBcblxuICAgICAgICB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCk7XG4gICAgfVxuXG5cblxufVxuXG5cbmZ1bmN0aW9uIHlzcF9tYWtlQ29tcGFyZVZlc3NlbChlbGVfY2FyZCkge1xuXHQgXG5cdCBqUXVlcnkoJy5jb21wYXJlX3RvZ2dsZScsIGVsZV9jYXJkKS5jaGFuZ2UoZnVuY3Rpb24oZSkge1xuXHQgXHRjb25zb2xlLmxvZygnaG93ZHknKTtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgICAgIGpRdWVyeSh0aGlzKS50b2dnbGVDbGFzcygnYXJtZWQnKTtcblxuICAgICAgICBsZXQgeWFjaHRJZCA9IGVsZV9jYXJkLmRhdGEoJ3Bvc3QtaWQnKTtcbiAgICBcbiAgICAgICAgaWYgKCBqUXVlcnkodGhpcykuaGFzQ2xhc3MoJ2FybWVkJykgKSB7XG4gICAgICAgICAgICB5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0KHlhY2h0SWQpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGxldCB5YWNodElkID0gZWxlX2NhcmQuZGF0YSgncG9zdC1pZCcpO1xuXG4gICAgaWYgKFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkICkgIT0gLTEgIHx8IFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkLnRvU3RyaW5nKCkgKSAhPSAtMSApIHtcblxuICAgICAgICBjb25zb2xlLmxvZygnaGVsbG8gd29ybGQgcmVzdG9yZWQnKTtcblxuICAgICAgICBlbGVfY2FyZC5hZGRDbGFzcygnYXJtZWQnKTtcblxuICAgICAgICBqUXVlcnkoJy5jb21wYXJlX3RvZ2dsZScsIGVsZV9jYXJkKS5hZGRDbGFzcygnYXJtZWQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24geXNwX2FkZFZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCkge1xuXG4gICAgaWYgKFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkICkgPT0gLTEpIHtcblxuICAgIFx0WVNQX1Zlc3NlbENvbXBhcmVMaXN0LnB1c2goeWFjaHRJZCk7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCk7XG59XG4gICAgXG5mdW5jdGlvbiB5c3BfcmVtb3ZlVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKSB7XG5cdGxldCBpbmRleGVkID0gWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmluZGV4T2YoIHlhY2h0SWQgKVxuXG5cdGlmICggaW5kZXhlZCAhPSAtMSkge1xuXG4gICAgXHRkZWxldGUgWVNQX1Zlc3NlbENvbXBhcmVMaXN0W2luZGV4ZWRdOyAgICAgICAgXG4gICAgICAgIFlTUF9WZXNzZWxDb21wYXJlTGlzdC5zcGxpY2UoaW5kZXhlZCwgMSk7XG4gIFx0XHRcbiAgICB9XG5cbiAgICB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCk7XG59XG5cbmZ1bmN0aW9uIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKSB7XG5cbiAgICBpZiAoWVNQX1Zlc3NlbENvbXBhcmVMaXN0Lmxlbmd0aCA+PSAyKSB7XG4gICAgXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneXNwX2NvbXBhcmVfbGlua291dCcpLmhyZWY9cmFpX3lhY2h0X3N5bmMud3BfcmVzdF91cmwrXCJyYWl5cy9jb21wYXJlLz9wb3N0SUQ9XCIrWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmpvaW4oJywnKTtcblxuICAgIFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lzcF9jb21wYXJlX2xpbmtvdXQnKS5pbm5lckhUTUw9YDxidXR0b24gdHlwZT1cImJ1dHRvblwiPkNvbXBhcmUgKCAke1lTUF9WZXNzZWxDb21wYXJlTGlzdC5sZW5ndGh9ICk8L2J1dHRvbj5gO1xuICAgICAgICBcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICdwb3N0X19pbic6IFlTUF9WZXNzZWxDb21wYXJlTGlzdCxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcmFpX3lzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIFwieWFjaHRzXCIsIHBhcmFtcykudGhlbihmdW5jdGlvbihkYXRhX3Jlc3VsdCkge1xuXG4gICAgICAgICAgICBkYXRhX3Jlc3VsdC5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC1jb21wYXJlLXByZXZpZXdzJykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0LmNvbXBhcmVfcHJldmlldyhpdGVtLCBwYXJhbXMpICk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZWxlX3ByZXZpZXcgPSBqUXVlcnkoJyN5c3AtY29tcGFyZS1wcmV2aWV3cyBbZGF0YS1wb3N0LWlkPScrIGl0ZW0uX3Bvc3RJRCArJ10nKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5yZW1vdmUtZnJvbS1jb21wYXJlJywgZWxlX3ByZXZpZXcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGVsbG8nKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVfY2FyZCA9IGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93IFtkYXRhLXBvc3QtaWQ9JysgaXRlbS5fcG9zdElEICsnXScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnLmNvbXBhcmVfdG9nZ2xlJywgZWxlX2NhcmQpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSkucmVtb3ZlQ2xhc3MoJ2FybWVkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgeXNwX3JlbW92ZVZlc3NlbFRvQ29tcGFyZUxpc3QoaXRlbS5fcG9zdElEKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xuXG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBqUXVlcnkoJyN5c3AtY29tcGFyZS1wcmV2aWV3cycpLmh0bWwoJycpO1xuICAgICAgICBqUXVlcnkoJyN5c3BfY29tcGFyZV9saW5rb3V0JykuaHRtbCgnJyk7XG4gICAgfVxuXG5cblxuXG59XG4iLCJjb25zdCB5c3BCZWZvcmVZYWNodFNlYXJjaCA9IG5ldyBFdmVudChcInlzcC1iZWZvcmUtc3VibWl0dGluZy15YWNodC1zZWFyY2hcIik7XG5jb25zdCB5c3BBZnRlcllhY2h0U2VhcmNoID0gbmV3IEV2ZW50KFwieXNwLWFmdGVyLXN1Ym1pdHRpbmcteWFjaHQtc2VhcmNoXCIpO1xuY29uc3QgeXNwQWZ0ZXJSZW5kZXJpbmdZYWNodCA9IG5ldyBFdmVudChcInlzcC1hZnRlci1yZW5kZXJpbmcteWFjaHQtc2VhcmNoXCIpO1xuXG5mdW5jdGlvbiB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoZGF0YSkge1xuXG4gICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdycpLmh0bWwoJycpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1yZXN1bHQtc2VjdGlvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRlZCcpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtcmVzdWx0LXNlY3Rpb24nKS5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nJyk7XG5cbiAgICByYWl5c19zZXRfZm9ybV90b19kYXRhKCBkYXRhICk7XG5cbiAgICB5c3BfbWFrZVNlYXJjaFRhZ3MoIGRhdGEgKTtcblxuICAgIC8vIEdFVCBBTkQgV1JJVEVcbiAgICByZXR1cm4gcmFpX3lzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIFwieWFjaHRzXCIsIGRhdGEpLnRoZW4oZnVuY3Rpb24oZGF0YV9yZXN1bHQpIHtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXJlc3VsdC1zZWN0aW9uJykuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZycpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXJlc3VsdC1zZWN0aW9uJykuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XG5cbiAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBkYXRhX3Jlc3VsdC5TRU8udGl0bGU7XG4gICAgICAgIGpRdWVyeSgnI3lzcC1zZWFyY2gtaGVhZGluZycpLnRleHQoZGF0YV9yZXN1bHQuU0VPLmhlYWRpbmcpO1xuICAgICAgICBqUXVlcnkoJyN5c3Atc2VhcmNoLXBhcmFncmFwaCcpLnRleHQoZGF0YV9yZXN1bHQuU0VPLmdwdF9wKTtcblxuICAgICAgICBqUXVlcnkoJyN0b3RhbC1yZXN1bHRzJykudGV4dChuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLUlOJywgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDMgfSkuZm9ybWF0KGRhdGFfcmVzdWx0LnRvdGFsKSk7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRVUkw9bnVsbDtcblxuICAgICAgICBpZiAodHlwZW9mIGRhdGEuZG9udF9wdXNoID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjdXJyZW50VVJMPXJhaXlzX3B1c2hfaGlzdG9yeSggZGF0YSApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudFVSTCA9IGxvY2F0aW9uLmhyZWY7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGpRdWVyeSgnI3lhY2h0cy1wYWdpbmF0aW9uJykuaHRtbCgnJyk7XG5cbiAgICAgICAgaWYgKGRhdGFfcmVzdWx0LnRvdGFsID4gMCkge1xuXG4gICAgICAgICAgICBkYXRhX3Jlc3VsdC5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS52aWV3ICE9ICd1bmRlZmluZWQnICYmIGRhdGEudmlldy50b0xvd2VyQ2FzZSgpID09ICdsaXN0Jykge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdycpLmFwcGVuZCggeXNwX3RlbXBsYXRlcy55YWNodC5saXN0KGl0ZW0sIGRhdGEpICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdycpLmFwcGVuZCggeXNwX3RlbXBsYXRlcy55YWNodC5ncmlkKGl0ZW0sIGRhdGEpICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGVsZV9jYXJkID0galF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cgW2RhdGEtcG9zdC1pZD0nKyBpdGVtLl9wb3N0SUQgKyddJyk7XG5cbiAgICAgICAgICAgICAgICBqUXVlcnkoJ1tkYXRhLW1vZGFsXScsIGVsZV9jYXJkKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZlc3NlbEluZm8gPSBpdGVtLk1vZGVsWWVhciArICcgJyArIGl0ZW0uTWFrZVN0cmluZyArICcgJyArIGl0ZW0uQm9hdE5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeWF0Y2hIaWRkZW4nKS52YWwodmVzc2VsSW5mbyk7XG5cbiAgICAgICAgICAgICAgICAgIHZhciBkYXRhX21vZGFsID0galF1ZXJ5KHRoaXMpLmRhdGEoJ21vZGFsJyk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgalF1ZXJ5KCBkYXRhX21vZGFsICkueXNwX21vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VUZXh0OiAnWCcsXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsQ2xhc3M6ICd5c3AtbW9kYWwtb3BlbicsXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xhc3M6ICd5c3AtbW9kZWwtY2xvc2UnXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHlzcF9tYXJrTG92ZWRWZXNzZWwoIGVsZV9jYXJkICk7ICAgICBcbiAgICAgICAgICAgICAgICB5c3BfbWFrZUNvbXBhcmVWZXNzZWwoIGVsZV9jYXJkICk7ICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBqUXVlcnkoJyN5YWNodHMtcGFnaW5hdGlvbicpLnBhZ2luYXRpb24oe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBkYXRhX3Jlc3VsdC50b3RhbCxcbiAgICAgICAgICAgICAgICBpdGVtc09uUGFnZTogMTIsXG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IGRhdGEucGFnZV9pbmRleCxcbiAgICAgICAgICAgICAgICBwcmV2VGV4dDogeXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uLnByZXZfdGV4dCxcbiAgICAgICAgICAgICAgICBuZXh0VGV4dDogeXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uLm5leHRfdGV4dCxcbiAgICAgICAgICAgICAgICBlZGdlczogNCxcbiAgICAgICAgICAgICAgICBkaXNwbGF5ZWRQYWdlczogNCxcbiAgICAgICAgICAgICAgICBocmVmVGV4dFByZWZpeDogY3VycmVudFVSTC5yZXBsYWNlKG5ldyBSZWdFeHAoXCJwYWdlX2luZGV4LShcXFxcZCopKC8pXCIsIFwiZ1wiKSwgXCJcIikrJ3BhZ2VfaW5kZXgtJyxcbiAgICAgICAgICAgICAgICBocmVmVGV4dFN1ZmZpeDogJy8nLFxuICAgICAgICAgICAgICAgIG9uUGFnZUNsaWNrOiBmdW5jdGlvbihwYWdlTnVtYmVyLCBldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPXBhZ2VOdW1iZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1EYXRhT2JqZWN0ID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YSggZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpICk7XG5cbiAgICAgICAgICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKGZvcm1EYXRhT2JqZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdycpLmFwcGVuZCh5c3BfdGVtcGxhdGVzLm5vUmVzdWx0cygpKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgalF1ZXJ5KFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogKGpRdWVyeShcIi5zY3JvbGwtdG8taGVyZS1vbi15YWNodC1zZWFyY2hcIikub2Zmc2V0KCkudG9wKVxuICAgICAgICB9LCAyNTApO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm06bm90KCN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtKScpLmRpc3BhdGNoRXZlbnQoeXNwQWZ0ZXJSZW5kZXJpbmdZYWNodCk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGFfcmVzdWx0O1xuXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG5cbiAgICB9KTtcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBGaWxsIExpc3QgT3B0aW9uc1xuICAgIGxldCBGaWxsTGlzdHM9W107XG4gICAgbGV0IGxpc3RFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkYXRhbGlzdFtkYXRhLWZpbGwtbGlzdF1cIik7XG4gICAgbGV0IGxpc3ROZWVkZWRFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFtsaXN0XVwiKTtcblxuICAgIGxpc3RFbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgRmlsbExpc3RzLnB1c2goZWxlLmdldEF0dHJpYnV0ZSgnZGF0YS1maWxsLWxpc3QnKSk7XG4gICAgfSk7XG5cbiAgICBsaXN0TmVlZGVkRWxlbWVudHMuZm9yRWFjaCgoaW5wdXRfZWxlKSA9PiB7XG5cbiAgICAgICAgaW5wdXRfZWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAgICAgbGV0IGxpc3RfaWQgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdsaXN0Jyk7XG5cbiAgICAgICAgICAgIGxldCBlbGVfbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkYXRhbGlzdCNcIitsaXN0X2lkKTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPD0gMykge1xuXG4gICAgICAgICAgICAgICAgcmFpX3lzcF9hcGkuY2FsbF9hcGkoXG4gICAgICAgICAgICAgICAgICAgICdQT1NUJywgXG4gICAgICAgICAgICAgICAgICAgICdsaXN0LW9wdGlvbnMtd2l0aC12YWx1ZScsIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IFsgZWxlX2xpc3QuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtbGlzdCcpIF0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRhdGFsaXN0W2RhdGEtZmlsbC1saXN0PSdcIisgbGFiZWwgK1wiJ11cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByT3B0aW9uc1tsYWJlbF0uZm9yRWFjaChmdW5jdGlvbihiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmFwcGVuZChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9KTtcblxuICAgIH0pXG4gICAgXG4vKiAgICByYWlfeXNwX2FwaS5jYWxsX2FwaSgnUE9TVCcsICdsaXN0LW9wdGlvbnMnLCB7bGFiZWxzOiBGaWxsTGlzdHN9KS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG4gICAgICAgIGZvciAobGV0IGxhYmVsIGluIHJPcHRpb25zKSB7XG5cbiAgICAgICAgICAgIGxldCBTZWxlY3RvckVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkYXRhbGlzdFtkYXRhLWZpbGwtbGlzdD0nXCIrIGxhYmVsICtcIiddXCIpO1xuXG4gICAgICAgICAgICByT3B0aW9uc1tsYWJlbF0uZm9yRWFjaChmdW5jdGlvbihiKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG5cbiAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlLmFwcGVuZChvcHRpb24pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiovXG4gICAgbGV0IHlhY2h0U2VhcmNoQW5kUmVzdWx0cz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtOm5vdCgjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybSknKTtcblxuICAgIGlmICh5YWNodFNlYXJjaEFuZFJlc3VsdHMpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tbW9iaWxlLXNlYXJjaCcpLmZvckVhY2goKG9tc2UpID0+IHtcbiAgICAgICAgICAgIG9tc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXN1cGVyLW1vYmlsZS1zZWFyY2gnKS5zdHlsZS5kaXNwbGF5PSdibG9jayc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93WT0naGlkZGVuJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmFkZCgneXNwLW1vYmlsZS15YWNodC1zZWFyY2gtb3BlbicpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlLW1vYmlsZS1zZWFyY2gnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlLW1vYmlsZS1zZWFyY2gnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3Atc3VwZXItbW9iaWxlLXNlYXJjaCcpLnN0eWxlLmRpc3BsYXk9J25vbmUnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5zdHlsZS5vdmVyZmxvd1k9J3Vuc2V0JztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LnJlbW92ZSgneXNwLW1vYmlsZS15YWNodC1zZWFyY2gtb3BlbicpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgeWFjaHRTZWFyY2hBbmRSZXN1bHRzLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgZS50YXJnZXQuZGlzcGF0Y2hFdmVudCh5c3BCZWZvcmVZYWNodFNlYXJjaCk7XG5cbiAgICAgICAgICAgIGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9cGFnZV9pbmRleF0nKS52YWx1ZT0xO1xuXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7XG5cbiAgICAgICAgICAgIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlciggcGFyYW1zICkudGhlbihmdW5jdGlvbihhcGlfZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZGlzcGF0Y2hFdmVudCh5c3BBZnRlcllhY2h0U2VhcmNoKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7IFxuXG4gICAgICAgIHlhY2h0U2VhcmNoQW5kUmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dC5zdWJtaXQtb24tY2hhbmdlJykuZm9yRWFjaCgoZWxlSW5wdXQpID0+IHtcbiAgICAgICAgICAgIGVsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB5YWNodFNlYXJjaEFuZFJlc3VsdHMucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1yZXNldF0nKS5mb3JFYWNoKChlbGVSZXNldCkgPT4ge1xuICAgICAgICAgICAgZWxlUmVzZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJ5c19jb21wYW55X29ubHlcIl0nKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInlzX2NvbXBhbnlfb25seVwiXScpLmZvckVhY2goZnVuY3Rpb24oZWxlQ2hlY2spIHtcbiAgICAgICAgICAgICAgICBlbGVDaGVjay5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9dmlld11bZm9ybT15c3AteWFjaHQtc2VhcmNoLWZvcm1dLCBzZWxlY3RbbmFtZT1zb3J0YnldW2Zvcm09eXNwLXlhY2h0LXNlYXJjaC1mb3JtXScpLmZvckVhY2goKGVsZVZpZXdPcHRpb24pID0+IHtcbiAgICAgICAgICAgIGVsZVZpZXdPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5waWNrLWFsbCcpLmZvckVhY2goZnVuY3Rpb24oZWxlKSB7XG4gICAgICAgICAgICBlbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRfbmFtZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cIicrIGlucHV0X25hbWUgKydcIl0nKS5mb3JFYWNoKChlbGVJbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVJbnB1dC5jaGVja2VkPWZhbHNlO1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBQUkVUVFkgVVJMXG4gICAgICAgIGxldCBzdHJwYXRocz13aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICAgICAgICBzdHJwYXRocz1zdHJwYXRocy5yZXBsYWNlKHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF9wYWdlX2lkLCAnJyk7XG5cbiAgICAgICAgbGV0IHBhdGhzID0gc3RycGF0aHMuc3BsaXQoXCIvXCIpO1xuXG4gICAgICAgIGxldCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zPXt9O1xuXG4gICAgICAgIHBhdGhzLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuXG4gICAgICAgICAgICBpZiAocGF0aCAhPSAnJykge1xuICAgICAgICAgICAgICAgIGxldCBwaGFzZV9wYXRoID0gcGF0aC5zcGxpdCgnLScpO1xuICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHM9cGhhc2VfcGF0aC5zbGljZSgxKTtcblxuICAgICAgICAgICAgICAgIG9ubHlfdmFscz1vbmx5X3ZhbHMuam9pbignICcpLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHNfYXJyYXk9KG9ubHlfdmFscy5zcGxpdCgnKycpKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb25seV92YWxzX2FycmF5WzFdICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ubHlfdmFscyA9IG9ubHlfdmFsc19hcnJheS5tYXAoKG92KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3YuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cob25seV92YWxzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dPW9ubHlfdmFscztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHByZXR0eV91cmxfcGF0aF9wYXJhbXMpO1xuXG4gICAgICAgIC8vIFJlc3RvcmUgRmllbGRzXG5cbiAgICAgICAgbGV0IFVSTFJFRj1uZXcgVVJMKGxvY2F0aW9uLmhyZWYpOyAvLyBtYXliZSBmb3IgYSByZS1kb1xuXG4gICAgICAgIGxldCBmb3JtSW5wdXRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLXlhY2h0LXNlYXJjaC1mb3JtXCJdLCAjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtXCJdJyk7XG5cbiAgICAgICAgZm9ybUlucHV0cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IGVsZTtcblxuICAgICAgICAgICAgbGV0IG5hbWUgPSBlbGUuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgICAgIGxldCB1cmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbmFtZSApO1xuICAgICAgICAgICAgICAgIC8vIHVybFZhbCA9IDtcbiAgIFxuXG4gICAgICAgICAgICBsZXQgaGFzUHJldHR5ID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdO1xuXG4gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGFzUHJldHR5ICE9ICdudWxsJyAmJiB0eXBlb2YgaGFzUHJldHR5ICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShoYXNQcmV0dHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICAgICAgICAgICAgICBoYXNQcmV0dHkuZm9yRWFjaCgoaFApID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaFAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGhhc1ByZXR0eSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dC50eXBlICE9ICdjaGVja2JveCcgJiYgaW5wdXQudHlwZSAhPSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGhhc1ByZXR0eTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1cmxWYWwgIT0gJycgJiYgdXJsVmFsICE9IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdXJsVmFsID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybFZhbCA9IHVybFZhbC5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gdXJsVmFsICkge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUgIT0gJ2NoZWNrYm94JyAmJiBpbnB1dC50eXBlICE9ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB1cmxWYWw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlc3RvcmUgQ29tcGFyZVxuICAgICAgICAgeXNwX3Jlc3RvcmVDb21wYXJlcygpO1xuXG4gICAgICAgIC8vIEZpbGwgb3B0aW9uc1xuICAgICAgICBsZXQgRmlsbE9wdGlvbnM9W107XG4gICAgICAgIGxldCBzZWxlY3RvckVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFtkYXRhLWZpbGwtb3B0aW9uc11cIik7XG5cbiAgICAgICAgc2VsZWN0b3JFbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgIEZpbGxPcHRpb25zLnB1c2goZWxlLmdldEF0dHJpYnV0ZSgnZGF0YS1maWxsLW9wdGlvbnMnKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmFpX3lzcF9hcGkuY2FsbF9hcGkoJ1BPU1QnLCAnZHJvcGRvd24tb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxPcHRpb25zfSkudGhlbihmdW5jdGlvbihyT3B0aW9ucykge1xuICAgICAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIGxldCBTZWxlY3RvckVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWxlY3RbZGF0YS1maWxsLW9wdGlvbnM9J1wiKyBsYWJlbCArXCInXVwiKTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFNlbGVjdG9yRWxlKTtcblxuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gU2VsZWN0b3JFbGVbMF0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgICAgICAgICByT3B0aW9uc1tsYWJlbF0uZm9yRWFjaChmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJPUFRJT05cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmFkZChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBVUkxSRUYgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuICAgICAgICAgICAgICAgIGxldCBVcmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbmFtZSApO1xuXG4gICAgICAgICAgICAgICAgbGV0IHN0cnBhdGhzPXdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgICAgICAgICAgICAgc3RycGF0aHM9c3RycGF0aHMucmVwbGFjZShyYWlfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfcGFnZV9pZCwgJycpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gc3RycGF0aHMuc3BsaXQoXCIvXCIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eV91cmxfcGF0aF9wYXJhbXM9e307XG5cbiAgICAgICAgICAgICAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uKHBhdGgpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGF0aCAhPSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBoYXNlX3BhdGggPSBwYXRoLnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb25seV92YWxzPXBoYXNlX3BhdGguc2xpY2UoMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV09b25seV92YWxzLmpvaW4oJyAnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXS5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKFVybFZhbCAhPSAnJyAmJiBVcmxWYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFVybFZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBVcmxWYWwgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVybFZhbCA9IFVybFZhbC5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gVXJsVmFsOyBcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS52YWx1ZSA9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IFVybFZhbC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBoYXNQcmV0dHkgPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF07XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhc1ByZXR0eSAhPSAnJyAmJiBoYXNQcmV0dHkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IGhhc1ByZXR0eTsgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGUudmFsdWUgPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBoYXNQcmV0dHkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBSZW5kZXIgWWFjaHRzIEZvciBQYWdlIExvYWRcbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSByYWl5c19nZXRfZm9ybV9kYXRhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0nKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcblxuICAgICAgICAgICAgLy8gTGlrZWQgLyBMb3ZlZCBcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1zLnlzX3lhY2h0c19sb3ZlZCAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgbGV0IGxvdmVkX3lhY2h0cyA9IEpTT04ucGFyc2UoIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpICk7XG5cbiAgICAgICAgICAgICAgICBpZiAobG92ZWRfeWFjaHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnlzX29ubHlfdGhlc2UgPSBsb3ZlZF95YWNodHMuam9pbignLCcpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMueXNfb25seV90aGVzZT1cIjAsMCwwXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlciggcGFyYW1zICk7ICAgICAgIFxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgbW9iaWxlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtJyk7XG5cbiAgICAgICAgaWYgKG1vYmlsZUZvcm0pIHtcbiAgICAgICAgICAgIG1vYmlsZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9cGFnZV9pbmRleF0nKS52YWx1ZT0xO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1zdXBlci1tb2JpbGUtc2VhcmNoJykuc3R5bGUuZGlzcGxheT0nbm9uZSc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93WT0ndW5zZXQnO1xuXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHJhaXlzX2dldF9mb3JtX2RhdGEoZS50YXJnZXQpOyAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKTtcblxuICAgICAgICAgICAgfSk7IFxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICB9XG5cbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBoYW5kbGVTdWJtaXQoZSwgYXBpRW5kcG9pbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBmb3JtRGF0YSA9IHJhaXlzX2dldF9mb3JtX2RhdGEoZS50YXJnZXQpO1xuICAgICAgICBsZXQgc3VjY2Vzc01lc3NhZ2UgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWNjZXNzLW1lc3NhZ2UnKTtcbiAgICAgICAgY29uc29sZS5sb2coZm9ybURhdGEpXG4gICAgICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpKFwiUE9TVFwiLCBhcGlFbmRwb2ludCwgZm9ybURhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhX3Jlc3VsdCkge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3NNZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGV0IHlhY2h0Rm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2luZ2xlLXlhY2h0LWRldGlscy1sZWFkJyk7XG4gICAgeWFjaHRGb3Jtcy5mb3JFYWNoKChmRWxlKSA9PiB7XG4gICAgICAgIGZFbGUuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaGFuZGxlU3VibWl0KGUsIFwieWFjaHQtbGVhZHNcIik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgbGV0IGJyb2tlckZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpbmdsZS1icm9rZXItZGV0aWxzLWxlYWQnKTtcbiAgICBicm9rZXJGb3Jtcy5mb3JFYWNoKChmRWxlKSA9PiB7XG4gICAgICAgIGZFbGUuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaGFuZGxlU3VibWl0KGUsIFwiYnJva2VyLWxlYWRzXCIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19
