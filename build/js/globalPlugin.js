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
  if (YSP_VesselCompareList.indexOf(yachtId) != -1) {
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
      if (typeof params.ys_yachts_loved != 'undefined') {
        console.log(params.ys_yachts_loved);
        params.ys_only_these = JSON.parse(localStorage.getItem('ysp_loved_vessels')).join(',');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS1wYWdpbmF0aW9uLmpzIiwianF1ZXJ5LW1vZGFsLmpzIiwid2hhdGV2ZXIuanMiLCJjb21tb24uanMiLCJhcGktY2xpZW50LmpzIiwidGVtcGxhdGVzLmpzIiwiZmlsbC1maWVsZHMuanMiLCJ5YWNodFNlYXJjaFRhZ3MuanMiLCJ5YWNodFNlYXJjaExvdmVkLmpzIiwieWFjaHRTZWFyY2hDb21wYXJlLmpzIiwieWFjaHRTZWFyY2guanMiLCJsZWFkcy5qcyJdLCJuYW1lcyI6WyIkIiwibWV0aG9kcyIsImluaXQiLCJvcHRpb25zIiwibyIsImV4dGVuZCIsIml0ZW1zIiwiaXRlbXNPblBhZ2UiLCJwYWdlcyIsImRpc3BsYXllZFBhZ2VzIiwiZWRnZXMiLCJjdXJyZW50UGFnZSIsInVzZUFuY2hvcnMiLCJocmVmVGV4dFByZWZpeCIsImhyZWZUZXh0U3VmZml4IiwicHJldlRleHQiLCJuZXh0VGV4dCIsImVsbGlwc2VUZXh0IiwiZWxsaXBzZVBhZ2VTZXQiLCJjc3NTdHlsZSIsImxpc3RTdHlsZSIsImxhYmVsTWFwIiwic2VsZWN0T25DbGljayIsIm5leHRBdEZyb250IiwiaW52ZXJ0UGFnZU9yZGVyIiwidXNlU3RhcnRFZGdlIiwidXNlRW5kRWRnZSIsIm9uUGFnZUNsaWNrIiwicGFnZU51bWJlciIsImV2ZW50Iiwib25Jbml0Iiwic2VsZiIsIk1hdGgiLCJjZWlsIiwiaGFsZkRpc3BsYXllZCIsImVhY2giLCJhZGRDbGFzcyIsImRhdGEiLCJfZHJhdyIsImNhbGwiLCJzZWxlY3RQYWdlIiwicGFnZSIsIl9zZWxlY3RQYWdlIiwicHJldlBhZ2UiLCJuZXh0UGFnZSIsImdldFBhZ2VzQ291bnQiLCJzZXRQYWdlc0NvdW50IiwiY291bnQiLCJnZXRDdXJyZW50UGFnZSIsImRlc3Ryb3kiLCJlbXB0eSIsImRyYXdQYWdlIiwicmVkcmF3IiwiZGlzYWJsZSIsImRpc2FibGVkIiwiZW5hYmxlIiwidXBkYXRlSXRlbXMiLCJuZXdJdGVtcyIsIl9nZXRQYWdlcyIsInVwZGF0ZUl0ZW1zT25QYWdlIiwiZ2V0SXRlbXNPblBhZ2UiLCJpbnRlcnZhbCIsIl9nZXRJbnRlcnZhbCIsImkiLCJ0YWdOYW1lIiwicHJvcCIsImF0dHIiLCIkcGFuZWwiLCJhcHBlbmRUbyIsIl9hcHBlbmRJdGVtIiwidGV4dCIsImNsYXNzZXMiLCJzdGFydCIsImVuZCIsIm1pbiIsImFwcGVuZCIsImJlZ2luIiwibWF4IiwiX2VsbGlwc2VDbGljayIsInBhZ2VJbmRleCIsIm9wdHMiLCIkbGluayIsIiRsaW5rV3JhcHBlciIsIiR1bCIsImZpbmQiLCJsZW5ndGgiLCJjbGljayIsIiRlbGxpcCIsInBhcmVudCIsInJlbW92ZUNsYXNzIiwiJHRoaXMiLCJ2YWwiLCJwYXJzZUludCIsInByZXYiLCJodG1sIiwiZm9jdXMiLCJzdG9wUHJvcGFnYXRpb24iLCJrZXl1cCIsIndoaWNoIiwiYmluZCIsImZuIiwicGFnaW5hdGlvbiIsIm1ldGhvZCIsImNoYXJBdCIsImFwcGx5IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFyZ3VtZW50cyIsIl90eXBlb2YiLCJlcnJvciIsImpRdWVyeSIsImZhY3RvcnkiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIndpbmRvdyIsImRvY3VtZW50IiwidW5kZWZpbmVkIiwibW9kYWxzIiwiZ2V0Q3VycmVudCIsInNlbGVjdEN1cnJlbnQiLCJzZWxlY3RlZCIsIiRibG9ja2VyIiwidG9nZ2xlQ2xhc3MiLCJ5c3BfbW9kYWwiLCJlbCIsInJlbW92ZSIsInRhcmdldCIsIiRib2R5IiwiZGVmYXVsdHMiLCJkb0ZhZGUiLCJpc05hTiIsImZhZGVEdXJhdGlvbiIsImNsb3NlRXhpc3RpbmciLCJpc0FjdGl2ZSIsImNsb3NlIiwicHVzaCIsImlzIiwiYW5jaG9yIiwidGVzdCIsIiRlbG0iLCJvcGVuIiwibW9kYWwiLCJlbG0iLCJzaG93U3Bpbm5lciIsInRyaWdnZXIiLCJBSkFYX1NFTkQiLCJnZXQiLCJkb25lIiwiQUpBWF9TVUNDRVNTIiwiY3VycmVudCIsIm9uIiwiQ0xPU0UiLCJoaWRlU3Bpbm5lciIsIkFKQVhfQ09NUExFVEUiLCJmYWlsIiwiQUpBWF9GQUlMIiwicG9wIiwiY29uc3RydWN0b3IiLCJtIiwiYmxvY2siLCJibHVyIiwic2V0VGltZW91dCIsInNob3ciLCJmYWRlRGVsYXkiLCJvZmYiLCJlc2NhcGVDbG9zZSIsImNsaWNrQ2xvc2UiLCJlIiwidW5ibG9jayIsImhpZGUiLCJCRUZPUkVfQkxPQ0siLCJfY3R4IiwiY3NzIiwiYmxvY2tlckNsYXNzIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJCTE9DSyIsIm5vdyIsImZhZGVPdXQiLCJjaGlsZHJlbiIsIkJFRk9SRV9PUEVOIiwic2hvd0Nsb3NlIiwiY2xvc2VCdXR0b24iLCJjbG9zZUNsYXNzIiwiY2xvc2VUZXh0IiwibW9kYWxDbGFzcyIsImRpc3BsYXkiLCJPUEVOIiwiQkVGT1JFX0NMT1NFIiwiX3RoaXMiLCJBRlRFUl9DTE9TRSIsInNwaW5uZXIiLCJzcGlubmVySHRtbCIsIiRhbmNob3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlYWR5IiwiY29uc29sZSIsImxvZyIsImRhdGFfbW9kYWwiLCJjb3B5TGluayIsImNvcHlUZXh0IiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3QiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImV4ZWNDb21tYW5kIiwiYWxlcnQiLCJ2YWx1ZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsIm1hcCIsInMiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0cmluZyIsImpvaW4iLCJlbnVtZXJhYmxlIiwicmFpeXNfZ2V0X2Zvcm1fZGF0YSIsImZvcm1fZWxlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImZkIiwiZnJvbUVudHJpZXMiLCJlbnRyaWVzIiwiX2kiLCJfT2JqZWN0JGVudHJpZXMiLCJfT2JqZWN0JGVudHJpZXMkX2kiLCJfc2xpY2VkVG9BcnJheSIsImZJbmRleCIsImZpZWxkIiwiVmFsQXJyYXkiLCJnZXRBbGwiLCJyYWl5c19zZXRfZm9ybV90b19kYXRhIiwiaW5wdXREYXRhIiwiZm9ybUEiLCJxdWVyeVNlbGVjdG9yIiwiZm9ybUIiLCJyZXNldCIsImZvcm1JbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZSIsImlucHV0IiwibmFtZSIsImdldEF0dHJpYnV0ZSIsImhhc1ByZXR0eSIsImlzQXJyYXkiLCJoUCIsInR5cGUiLCJjaGVja2VkIiwicmFpeXNfcHVzaF9oaXN0b3J5Iiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwic3RycGF0aCIsInByb3BlcnR5IiwiaXQiLCJzZXQiLCJ0b1N0cmluZyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJyYWlfeWFjaHRfc3luYyIsInlhY2h0X3NlYXJjaF91cmwiLCJyYWlfeXNwX2FwaSIsImNhbGxfYXBpIiwicGF0aCIsInBhc3NpbmdfZGF0YSIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZURhdGEiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJfcXVlc3Rpb25NYXJrIiwid3BfcmVzdF91cmwiLCJzZW5kIiwic2V0UmVxdWVzdEhlYWRlciIsInN0cmluZ2lmeSIsInlzcF90ZW1wbGF0ZXMiLCJ5YWNodCIsImdyaWQiLCJ2ZXNzZWwiLCJwYXJhbXMiLCJtZXRlcnMiLCJOb21pbmFsTGVuZ3RoIiwicHJpY2UiLCJldXJvcGVfb3B0aW9uX3BpY2tlZCIsInRvRml4ZWQiLCJZU1BfRXVyb1ZhbCIsImNvbmNhdCIsIkludGwiLCJOdW1iZXJGb3JtYXQiLCJtaW5pbXVtRnJhY3Rpb25EaWdpdHMiLCJmb3JtYXQiLCJjdXJyZW5jeSIsIllTUF9VU0RWYWwiLCJfcG9zdElEIiwiRG9jdW1lbnRJRCIsIl9saW5rIiwiSW1hZ2VzIiwiVXJpIiwiYXNzZXRzX3VybCIsIkNvbXBhbnlOYW1lIiwiY29tcGFueV9uYW1lIiwiY29tcGFueV9sb2dvIiwiTW9kZWxZZWFyIiwiTWFrZVN0cmluZyIsIk1vZGVsIiwiQm9hdE5hbWUiLCJDYWJpbnNDb3VudE51bWVyaWMiLCJsaXN0IiwiUHJpY2UiLCJldXJvX2NfYyIsImNvbXBhcmVfcHJldmlldyIsIm5vUmVzdWx0cyIsInlhY2h0X3RhZyIsImxhYmVsIiwibmV4dF90ZXh0IiwicHJldl90ZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVsZV9xdWlja19zZWFyY2giLCJGaWxsT3B0aW9ucyIsInNlbGVjdG9yRWxlbWVudHMiLCJsYWJlbHMiLCJ0aGVuIiwick9wdGlvbnMiLCJfbG9vcCIsIlNlbGVjdG9yRWxlIiwiYiIsIm9wdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJVUkxSRUYiLCJVUkwiLCJsb2NhdGlvbiIsImhyZWYiLCJVcmxWYWwiLCJzdHJwYXRocyIsInJlcGxhY2UiLCJ5YWNodF9zZWFyY2hfcGFnZV9pZCIsInBhdGhzIiwicHJldHR5X3VybF9wYXRoX3BhcmFtcyIsInBoYXNlX3BhdGgiLCJvbmx5X3ZhbHMiLCJlYWNoV29yZENhcGl0YWxpemUiLCJ5c3BfbWFrZVNlYXJjaFRhZ3MiLCJ0YWdzRWxlIiwidGUiLCJpbm5lckhUTUwiLCJ5c3BfdGFnc19ub3RfcHJpbnQiLCJfbG9vcDIiLCJwYXJhbUtleSIsImlubmVyVGV4dCIsImhhc0F0dHJpYnV0ZSIsImluZGV4T2YiLCJlbGVJbnB1dCIsIm5ld1RhZ0VsZSIsInRhZ1ZhbCIsInNlbGVjdGVkSW5kZXgiLCJtYXRjaCIsImVsZVVuaXQiLCJjbGFzc05hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInlzcFRhZ0VsZSIsImtleSIsImN1cnJlbnRUYXJnZXQiLCJpbnB1dEVsZXMiLCJlbGVJIiwiZm9ybSIsInJlcXVlc3RTdWJtaXQiLCJ5c3BfbWFya0xvdmVkVmVzc2VsIiwiZWxlX2NhcmQiLCJ5YWNodElkIiwiaGFzQ2xhc3MiLCJ5c3BfYWRkTG92ZWRWZXNzZWwiLCJ5c3BfcmVtb3ZlTG92ZWRWZXNzZWwiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibG92ZWRWZXNzZWxzIiwic2V0SXRlbSIsImluZGV4ZWQiLCJzcGxpY2UiLCJZU1BfVmVzc2VsQ29tcGFyZUxpc3QiLCJ5c3BfbWFrZUNvbXBhcmVWZXNzZWwiLCJjaGFuZ2UiLCJ5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCIsInlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0IiwieXNwX21ha2VDb21wYXJlTGlua291dCIsImRhdGFfcmVzdWx0IiwicmVzdWx0cyIsIml0ZW0iLCJlbGVfcHJldmlldyIsInlzcEJlZm9yZVlhY2h0U2VhcmNoIiwiRXZlbnQiLCJ5c3BBZnRlcllhY2h0U2VhcmNoIiwieXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyIiwiY2xhc3NMaXN0IiwidGl0bGUiLCJTRU8iLCJoZWFkaW5nIiwiZ3B0X3AiLCJtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMiLCJ0b3RhbCIsImN1cnJlbnRVUkwiLCJkb250X3B1c2giLCJ2aWV3IiwidmVzc2VsSW5mbyIsInBhZ2VfaW5kZXgiLCJSZWdFeHAiLCJmb3JtRGF0YU9iamVjdCIsImRvY3VtZW50RWxlbWVudCIsImJvZHkiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJGaWxsTGlzdHMiLCJsaXN0RWxlbWVudHMiLCJsaXN0TmVlZGVkRWxlbWVudHMiLCJpbnB1dF9lbGUiLCJsaXN0X2lkIiwiZWxlX2xpc3QiLCJfbG9vcDMiLCJ5YWNodFNlYXJjaEFuZFJlc3VsdHMiLCJvbXNlIiwic3R5bGUiLCJvdmVyZmxvd1kiLCJkaXNwYXRjaEV2ZW50IiwiYXBpX2RhdGEiLCJlbGVSZXNldCIsImVsZUNoZWNrIiwiZWxlVmlld09wdGlvbiIsImlucHV0X25hbWUiLCJvbmx5X3ZhbHNfYXJyYXkiLCJvdiIsInVybFZhbCIsIl9sb29wNCIsInlzX3lhY2h0c19sb3ZlZCIsInlzX29ubHlfdGhlc2UiLCJtb2JpbGVGb3JtIiwiaGFuZGxlU3VibWl0IiwiYXBpRW5kcG9pbnQiLCJzdWNjZXNzTWVzc2FnZSIsInBhcmVudEVsZW1lbnQiLCJ5YWNodEZvcm1zIiwiZkVsZSIsImJyb2tlckZvcm1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQSxVQUFBQSxDQUFBLEVBQUE7RUFFQSxJQUFBQyxPQUFBLEdBQUE7SUFDQUMsSUFBQSxFQUFBLFNBQUFBLEtBQUFDLE9BQUEsRUFBQTtNQUNBLElBQUFDLENBQUEsR0FBQUosQ0FBQSxDQUFBSyxNQUFBLENBQUE7UUFDQUMsS0FBQSxFQUFBLENBQUE7UUFDQUMsV0FBQSxFQUFBLENBQUE7UUFDQUMsS0FBQSxFQUFBLENBQUE7UUFDQUMsY0FBQSxFQUFBLENBQUE7UUFDQUMsS0FBQSxFQUFBLENBQUE7UUFDQUMsV0FBQSxFQUFBLENBQUE7UUFDQUMsVUFBQSxFQUFBLElBQUE7UUFDQUMsY0FBQSxFQUFBLFFBQUE7UUFDQUMsY0FBQSxFQUFBLEVBQUE7UUFDQUMsUUFBQSxFQUFBLE1BQUE7UUFDQUMsUUFBQSxFQUFBLE1BQUE7UUFDQUMsV0FBQSxFQUFBLFVBQUE7UUFDQUMsY0FBQSxFQUFBLElBQUE7UUFDQUMsUUFBQSxFQUFBLGFBQUE7UUFDQUMsU0FBQSxFQUFBLEVBQUE7UUFDQUMsUUFBQSxFQUFBLEVBQUE7UUFDQUMsYUFBQSxFQUFBLElBQUE7UUFDQUMsV0FBQSxFQUFBLEtBQUE7UUFDQUMsZUFBQSxFQUFBLEtBQUE7UUFDQUMsWUFBQSxFQUFBLElBQUE7UUFDQUMsVUFBQSxFQUFBLElBQUE7UUFDQUMsV0FBQSxFQUFBLFNBQUFBLFlBQUFDLFVBQUEsRUFBQUMsS0FBQSxFQUFBO1VBQ0E7VUFDQTtRQUFBLENBQ0E7UUFDQUMsTUFBQSxFQUFBLFNBQUFBLE9BQUEsRUFBQTtVQUNBO1FBQUE7TUFFQSxDQUFBLEVBQUEzQixPQUFBLElBQUEsQ0FBQSxDQUFBLENBQUE7TUFFQSxJQUFBNEIsSUFBQSxHQUFBLElB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QUFBRSxZQUFBLENBQUEsT0FBQSxDQUFBLElBQUFHLEVBQUEsRUFBQTtjQUNBTCxLQUFBLENBQUFPLE9BQUEsR0FBQSxJQUFBO1lBQ0E7VUFHQSxDQUFBLENBQUE7UUFFQSxDQUFBLE1BQ0E7VUFFQSxJQUFBLE9BQUFQLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLFdBQUEsS0FBQU4sS0FBQSxDQUFBTSxJQUFBLElBQUEsVUFBQSxJQUFBTixLQUFBLENBQUFNLElBQUEsSUFBQSxPQUFBLENBQUEsSUFBQU4sS0FBQSxDQUFBRSxZQUFBLENBQUEsT0FBQSxDQUFBLElBQUFDLFNBQUEsRUFBQTtZQUNBSCxLQUFBLENBQUFPLE9BQUEsR0FBQSxJQUFBO1VBQ0EsQ0FBQSxNQUNBLElBQUFQLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLFVBQUEsSUFBQU4sS0FBQSxDQUFBTSxJQUFBLElBQUEsT0FBQSxFQUFBO1lBQ0FOLEtBQUEsQ0FBQXJDLEtBQUEsR0FBQXdDLFNBQUE7VUFDQTtRQUVBO01BRUE7TUFFQSxJQUFBbU0sTUFBQSxJQUFBLEVBQUEsSUFBQUEsTUFBQSxJQUFBLElBQUEsRUFBQTtRQUVBLElBQUEsT0FBQUEsTUFBQSxJQUFBLFFBQUEsRUFBQTtVQUNBQSxNQUFBLEdBQUFBLE1BQUEsQ0FBQTNGLGtCQUFBLENBQUEsQ0FBQTtRQUNBO1FBRUEsSUFBQSxPQUFBM0csS0FBQSxDQUFBTSxJQUFBLElBQUEsV0FBQSxLQUFBTixLQUFBLENBQUFNLElBQUEsSUFBQSxVQUFBLElBQUFOLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLE9BQUEsQ0FBQSxJQUFBTixLQUFBLENBQUFFLFlBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQW9NLE1BQUEsRUFBQTtVQUNBdE0sS0FBQSxDQUFBTyxPQUFBLEdBQUEsSUFBQTtRQUNBLENBQUEsTUFDQSxJQUFBUCxLQUFBLENBQUFNLElBQUEsSUFBQSxVQUFBLElBQUFOLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLE9BQUEsRUFBQTtVQUNBTixLQUFBLENBQUFyQyxLQUFBLEdBQUEyTyxNQUFBO1FBQ0E7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aW5hdGlvbi5qcyB2MS42XG4qIEEgc2ltcGxlIGpRdWVyeSBwYWdpbmF0aW9uIHBsdWdpbi5cbiogaHR0cDovL2ZsYXZpdXNtYXRpcy5naXRodWIuY29tL3NpbXBsZVBhZ2luYXRpb24uanMvXG4qXG4qIENvcHlyaWdodCAyMDEyLCBGbGF2aXVzIE1hdGlzXG4qIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiogaHR0cDovL2ZsYXZpdXNtYXRpcy5naXRodWIuY29tL2xpY2Vuc2UuaHRtbFxuKi9cblxuKGZ1bmN0aW9uKCQpe1xuXG5cdHZhciBtZXRob2RzID0ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0XHRcdHZhciBvID0gJC5leHRlbmQoe1xuXHRcdFx0XHRpdGVtczogMSxcblx0XHRcdFx0aXRlbXNPblBhZ2U6IDEsXG5cdFx0XHRcdHBhZ2VzOiAwLFxuXHRcdFx0XHRkaXNwbGF5ZWRQYWdlczogNSxcblx0XHRcdFx0ZWRnZXM6IDIsXG5cdFx0XHRcdGN1cnJlbnRQYWdlOiAwLFxuXHRcdFx0XHR1c2VBbmNob3JzOiB0cnVlLFxuXHRcdFx0XHRocmVmVGV4dFByZWZpeDogJyNwYWdlLScsXG5cdFx0XHRcdGhyZWZUZXh0U3VmZml4OiAnJyxcblx0XHRcdFx0cHJldlRleHQ6ICdQcmV2Jyxcblx0XHRcdFx0bmV4dFRleHQ6ICdOZXh0Jyxcblx0XHRcdFx0ZWxsaXBzZVRleHQ6ICcmaGVsbGlwOycsXG5cdFx0XHRcdGVsbGlwc2VQYWdlU2V0OiB0cnVlLFxuXHRcdFx0XHRjc3NTdHlsZTogJ2xpZ2h0LXRoZW1lJyxcblx0XHRcdFx0bGlzdFN0eWxlOiAnJyxcblx0XHRcdFx0bGFiZWxNYXA6IFtdLFxuXHRcdFx0XHRzZWxlY3RPbkNsaWNrOiB0cnVlLFxuXHRcdFx0XHRuZXh0QXRGcm9udDogZmFsc2UsXG5cdFx0XHRcdGludmVydFBhZ2VPcmRlcjogZmFsc2UsXG5cdFx0XHRcdHVzZVN0YXJ0RWRnZSA6IHRydWUsXG5cdFx0XHRcdHVzZUVuZEVkZ2UgOiB0cnVlLFxuXHRcdFx0XHRvblBhZ2VDbGljazogZnVuY3Rpb24ocGFnZU51bWJlciwgZXZlbnQpIHtcblx0XHRcdFx0XHQvLyBDYWxsYmFjayB0cmlnZ2VyZWQgd2hlbiBhIHBhZ2UgaXMgY2xpY2tlZFxuXHRcdFx0XHRcdC8vIFBhZ2UgbnVtYmVyIGlzIGdpdmVuIGFzIGFuIG9wdGlvbmFsIHBhcmFtZXRlclxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbkluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdC8vIENhbGxiYWNrIHRyaWdnZXJlZCBpbW1lZGlhdGVseSBhZnRlciBpbml0aWFsaXphdGlvblxuXHRcdFx0XHR9XG5cdFx0XHR9LCBvcHRpb25zIHx8IHt9KTtcblxuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0XHRvLnBhZ2VzID0gby5wYWdlcyA/IG8ucGFnZXMgOiBNYXRoLmNlaWwoby5pdGVtcyAvIG8uaXRlbXNPblBhZ2UpID8gTWF0aC5jZWlsKG8uaXRlbXMgLyBvLml0ZW1zT25QYWdlKSA6IDE7XG5cdFx0XHRpZiAoby5jdXJyZW50UGFnZSlcblx0XHRcdFx0by5jdXJyZW50UGFnZSA9IG8uY3VycmVudFBhZ2UgLSAxO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRvLmN1cnJlbnRQYWdlID0gIW8uaW52ZXJ0UGFnZU9yZGVyID8gMCA6IG8ucGFnZXMgLSAxO1xuXHRcdFx0by5oYWxmRGlzcGxheWVkID0gby5kaXNwbGF5ZWRQYWdlcyAvIDI7XG5cblx0XHRcdHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5hZGRDbGFzcyhvLmNzc1N0eWxlICsgJyBzaW1wbGUtcGFnaW5hdGlvbicpLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHNlbGYpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG8ub25Jbml0KCk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRzZWxlY3RQYWdlOiBmdW5jdGlvbihwYWdlKSB7XG5cdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgcGFnZSAtIDEpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHByZXZQYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlID4gMCkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlIC0gMSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlIDwgby5wYWdlcyAtIDEpIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0bmV4dFBhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPCBvLnBhZ2VzIC0gMSkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlICsgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlID4gMCkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlIC0gMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRnZXRQYWdlc0NvdW50OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5wYWdlcztcblx0XHR9LFxuXG5cdFx0c2V0UGFnZXNDb3VudDogZnVuY3Rpb24oY291bnQpIHtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLnBhZ2VzID0gY291bnQ7XG5cdFx0fSxcblxuXHRcdGdldEN1cnJlbnRQYWdlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJykuY3VycmVudFBhZ2UgKyAxO1xuXHRcdH0sXG5cblx0XHRkZXN0cm95OiBmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5lbXB0eSgpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGRyYXdQYWdlOiBmdW5jdGlvbiAocGFnZSkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uY3VycmVudFBhZ2UgPSBwYWdlIC0gMTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHJlZHJhdzogZnVuY3Rpb24oKXtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRkaXNhYmxlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0ZW5hYmxlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZUl0ZW1zOiBmdW5jdGlvbiAobmV3SXRlbXMpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLml0ZW1zID0gbmV3SXRlbXM7XG5cdFx0XHRvLnBhZ2VzID0gbWV0aG9kcy5fZ2V0UGFnZXMobyk7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHR9LFxuXG5cdFx0dXBkYXRlSXRlbXNPblBhZ2U6IGZ1bmN0aW9uIChpdGVtc09uUGFnZSkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uaXRlbXNPblBhZ2UgPSBpdGVtc09uUGFnZTtcblx0XHRcdG8ucGFnZXMgPSBtZXRob2RzLl9nZXRQYWdlcyhvKTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIDApO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGdldEl0ZW1zT25QYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5pdGVtc09uUGFnZTtcblx0XHR9LFxuXG5cdFx0X2RyYXc6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyXHRvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyksXG5cdFx0XHRcdGludGVydmFsID0gbWV0aG9kcy5fZ2V0SW50ZXJ2YWwobyksXG5cdFx0XHRcdGksXG5cdFx0XHRcdHRhZ05hbWU7XG5cblx0XHRcdG1ldGhvZHMuZGVzdHJveS5jYWxsKHRoaXMpO1xuXG5cdFx0XHR0YWdOYW1lID0gKHR5cGVvZiB0aGlzLnByb3AgPT09ICdmdW5jdGlvbicpID8gdGhpcy5wcm9wKCd0YWdOYW1lJykgOiB0aGlzLmF0dHIoJ3RhZ05hbWUnKTtcblxuXHRcdFx0dmFyICRwYW5lbCA9IHRhZ05hbWUgPT09ICdVTCcgPyB0aGlzIDogJCgnPHVsJyArIChvLmxpc3RTdHlsZSA/ICcgY2xhc3M9XCInICsgby5saXN0U3R5bGUgKyAnXCInIDogJycpICsgJz48L3VsPicpLmFwcGVuZFRvKHRoaXMpO1xuXG5cdFx0XHQvLyBHZW5lcmF0ZSBQcmV2IGxpbmtcblx0XHRcdGlmIChvLnByZXZUZXh0KSB7XG5cdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCAhby5pbnZlcnRQYWdlT3JkZXIgPyBvLmN1cnJlbnRQYWdlIC0gMSA6IG8uY3VycmVudFBhZ2UgKyAxLCB7dGV4dDogby5wcmV2VGV4dCwgY2xhc3NlczogJ3ByZXYnfSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIE5leHQgbGluayAoaWYgb3B0aW9uIHNldCBmb3IgYXQgZnJvbnQpXG5cdFx0XHRpZiAoby5uZXh0VGV4dCAmJiBvLm5leHRBdEZyb250KSB7XG5cdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCAhby5pbnZlcnRQYWdlT3JkZXIgPyBvLmN1cnJlbnRQYWdlICsgMSA6IG8uY3VycmVudFBhZ2UgLSAxLCB7dGV4dDogby5uZXh0VGV4dCwgY2xhc3NlczogJ25leHQnfSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIHN0YXJ0IGVkZ2VzXG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5zdGFydCA+IDAgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZihvLnVzZVN0YXJ0RWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGVuZCA9IE1hdGgubWluKG8uZWRnZXMsIGludGVydmFsLnN0YXJ0KTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBlbmQ7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChvLmVkZ2VzIDwgaW50ZXJ2YWwuc3RhcnQgJiYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgby5lZGdlcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuZW5kIDwgby5wYWdlcyAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmKG8udXNlU3RhcnRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgYmVnaW4gPSBNYXRoLm1heChvLnBhZ2VzIC0gby5lZGdlcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IG8ucGFnZXMgLSAxOyBpID49IGJlZ2luOyBpLS0pIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChvLnBhZ2VzIC0gby5lZGdlcyA+IGludGVydmFsLmVuZCAmJiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgaW50ZXJ2YWwgbGlua3Ncblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0Zm9yIChpID0gaW50ZXJ2YWwuc3RhcnQ7IGkgPCBpbnRlcnZhbC5lbmQ7IGkrKykge1xuXHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yIChpID0gaW50ZXJ2YWwuZW5kIC0gMTsgaSA+PSBpbnRlcnZhbC5zdGFydDsgaS0tKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIGVuZCBlZGdlc1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuZW5kIDwgby5wYWdlcyAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmIChvLnBhZ2VzIC0gby5lZGdlcyA+IGludGVydmFsLmVuZCAmJiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoby51c2VFbmRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgYmVnaW4gPSBNYXRoLm1heChvLnBhZ2VzIC0gby5lZGdlcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IGJlZ2luOyBpIDwgby5wYWdlczsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5zdGFydCA+IDAgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZiAoby5lZGdlcyA8IGludGVydmFsLnN0YXJ0ICYmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIG8uZWRnZXMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKG8udXNlRW5kRWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGVuZCA9IE1hdGgubWluKG8uZWRnZXMsIGludGVydmFsLnN0YXJ0KTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IGVuZCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgTmV4dCBsaW5rICh1bmxlc3Mgb3B0aW9uIGlzIHNldCBmb3IgYXQgZnJvbnQpXG5cdFx0XHRpZiAoby5uZXh0VGV4dCAmJiAhby5uZXh0QXRGcm9udCkge1xuXHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgIW8uaW52ZXJ0UGFnZU9yZGVyID8gby5jdXJyZW50UGFnZSArIDEgOiBvLmN1cnJlbnRQYWdlIC0gMSwge3RleHQ6IG8ubmV4dFRleHQsIGNsYXNzZXM6ICduZXh0J30pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoby5lbGxpcHNlUGFnZVNldCAmJiAhby5kaXNhYmxlZCkge1xuXHRcdFx0XHRtZXRob2RzLl9lbGxpcHNlQ2xpY2suY2FsbCh0aGlzLCAkcGFuZWwpO1xuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdF9nZXRQYWdlczogZnVuY3Rpb24obykge1xuXHRcdFx0dmFyIHBhZ2VzID0gTWF0aC5jZWlsKG8uaXRlbXMgLyBvLml0ZW1zT25QYWdlKTtcblx0XHRcdHJldHVybiBwYWdlcyB8fCAxO1xuXHRcdH0sXG5cblx0XHRfZ2V0SW50ZXJ2YWw6IGZ1bmN0aW9uKG8pIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHN0YXJ0OiBNYXRoLmNlaWwoby5jdXJyZW50UGFnZSA+IG8uaGFsZkRpc3BsYXllZCA/IE1hdGgubWF4KE1hdGgubWluKG8uY3VycmVudFBhZ2UgLSBvLmhhbGZEaXNwbGF5ZWQsIChvLnBhZ2VzIC0gby5kaXNwbGF5ZWRQYWdlcykpLCAwKSA6IDApLFxuXHRcdFx0XHRlbmQ6IE1hdGguY2VpbChvLmN1cnJlbnRQYWdlID4gby5oYWxmRGlzcGxheWVkID8gTWF0aC5taW4oby5jdXJyZW50UGFnZSArIG8uaGFsZkRpc3BsYXllZCwgby5wYWdlcykgOiBNYXRoLm1pbihvLmRpc3BsYXllZFBhZ2VzLCBvLnBhZ2VzKSlcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdF9hcHBlbmRJdGVtOiBmdW5jdGlvbihwYWdlSW5kZXgsIG9wdHMpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcywgb3B0aW9ucywgJGxpbmssIG8gPSBzZWxmLmRhdGEoJ3BhZ2luYXRpb24nKSwgJGxpbmtXcmFwcGVyID0gJCgnPGxpPjwvbGk+JyksICR1bCA9IHNlbGYuZmluZCgndWwnKTtcblxuXHRcdFx0cGFnZUluZGV4ID0gcGFnZUluZGV4IDwgMCA/IDAgOiAocGFnZUluZGV4IDwgby5wYWdlcyA/IHBhZ2VJbmRleCA6IG8ucGFnZXMgLSAxKTtcblxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0dGV4dDogcGFnZUluZGV4ICsgMSxcblx0XHRcdFx0Y2xhc3NlczogJydcblx0XHRcdH07XG5cblx0XHRcdGlmIChvLmxhYmVsTWFwLmxlbmd0aCAmJiBvLmxhYmVsTWFwW3BhZ2VJbmRleF0pIHtcblx0XHRcdFx0b3B0aW9ucy50ZXh0ID0gby5sYWJlbE1hcFtwYWdlSW5kZXhdO1xuXHRcdFx0fVxuXG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQob3B0aW9ucywgb3B0cyB8fCB7fSk7XG5cblx0XHRcdGlmIChwYWdlSW5kZXggPT0gby5jdXJyZW50UGFnZSB8fCBvLmRpc2FibGVkKSB7XG5cdFx0XHRcdGlmIChvLmRpc2FibGVkIHx8IG9wdGlvbnMuY2xhc3NlcyA9PT0gJ3ByZXYnIHx8IG9wdGlvbnMuY2xhc3NlcyA9PT0gJ25leHQnKSB7XG5cdFx0XHRcdFx0JGxpbmtXcmFwcGVyLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRsaW5rV3JhcHBlci5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JGxpbmsgPSAkKCc8c3BhbiBjbGFzcz1cImN1cnJlbnRcIj4nICsgKG9wdGlvbnMudGV4dCkgKyAnPC9zcGFuPicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG8udXNlQW5jaG9ycykge1xuXHRcdFx0XHRcdCRsaW5rID0gJCgnPGEgaHJlZj1cIicgKyBvLmhyZWZUZXh0UHJlZml4ICsgKHBhZ2VJbmRleCArIDEpICsgby5ocmVmVGV4dFN1ZmZpeCArICdcIiBjbGFzcz1cInBhZ2UtbGlua1wiPicgKyAob3B0aW9ucy50ZXh0KSArICc8L2E+Jyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JGxpbmsgPSAkKCc8c3BhbiA+JyArIChvcHRpb25zLnRleHQpICsgJzwvc3Bhbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkbGluay5jbGljayhmdW5jdGlvbihldmVudCl7XG5cdFx0XHRcdFx0cmV0dXJuIG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbChzZWxmLCBwYWdlSW5kZXgsIGV2ZW50KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcHRpb25zLmNsYXNzZXMpIHtcblx0XHRcdFx0JGxpbmsuYWRkQ2xhc3Mob3B0aW9ucy5jbGFzc2VzKTtcblx0XHRcdH1cblxuXHRcdFx0JGxpbmtXcmFwcGVyLmFwcGVuZCgkbGluayk7XG5cblx0XHRcdGlmICgkdWwubGVuZ3RoKSB7XG5cdFx0XHRcdCR1bC5hcHBlbmQoJGxpbmtXcmFwcGVyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGYuYXBwZW5kKCRsaW5rV3JhcHBlcik7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9zZWxlY3RQYWdlOiBmdW5jdGlvbihwYWdlSW5kZXgsIGV2ZW50KSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5jdXJyZW50UGFnZSA9IHBhZ2VJbmRleDtcblx0XHRcdGlmIChvLnNlbGVjdE9uQ2xpY2spIHtcblx0XHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG8ub25QYWdlQ2xpY2socGFnZUluZGV4ICsgMSwgZXZlbnQpO1xuXHRcdH0sXG5cblxuXHRcdF9lbGxpcHNlQ2xpY2s6IGZ1bmN0aW9uKCRwYW5lbCkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdFx0XHRvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyksXG5cdFx0XHRcdCRlbGxpcCA9ICRwYW5lbC5maW5kKCcuZWxsaXBzZScpO1xuXHRcdFx0JGVsbGlwLmFkZENsYXNzKCdjbGlja2FibGUnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcblx0XHRcdCRlbGxpcC5jbGljayhmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRpZiAoIW8uZGlzYWJsZSkge1xuXHRcdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHRcdFx0XHR2YWwgPSAocGFyc2VJbnQoJHRoaXMucGFyZW50KCkucHJldigpLnRleHQoKSwgMTApIHx8IDApICsgMTtcblx0XHRcdFx0XHQkdGhpc1xuXHRcdFx0XHRcdFx0Lmh0bWwoJzxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIG1heD1cIicgKyBvLnBhZ2VzICsgJ1wiIHN0ZXA9XCIxXCIgdmFsdWU9XCInICsgdmFsICsgJ1wiPicpXG5cdFx0XHRcdFx0XHQuZmluZCgnaW5wdXQnKVxuXHRcdFx0XHRcdFx0LmZvY3VzKClcblx0XHRcdFx0XHRcdC5jbGljayhmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHQvLyBwcmV2ZW50IGlucHV0IG51bWJlciBhcnJvd3MgZnJvbSBidWJibGluZyBhIGNsaWNrIGV2ZW50IG9uICRlbGxpcFxuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQua2V5dXAoZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cdFx0XHRcdFx0XHRcdGlmIChldmVudC53aGljaCA9PT0gMTMgJiYgdmFsICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGVudGVyIHRvIGFjY2VwdFxuXHRcdFx0XHRcdFx0XHRcdGlmICgodmFsPjApJiYodmFsPD1vLnBhZ2VzKSlcblx0XHRcdFx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwoc2VsZiwgdmFsIC0gMSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT09IDI3KSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gZXNjYXBlIHRvIGNhbmNlbFxuXHRcdFx0XHRcdFx0XHRcdCRlbGxpcC5lbXB0eSgpLmh0bWwoby5lbGxpcHNlVGV4dCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQuYmluZCgnYmx1cicsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAodmFsICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbChzZWxmLCB2YWwgLSAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQkZWxsaXAuZW1wdHkoKS5odG1sKG8uZWxsaXBzZVRleHQpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fTtcblxuXHQkLmZuLnBhZ2luYXRpb24gPSBmdW5jdGlvbihtZXRob2QpIHtcblxuXHRcdC8vIE1ldGhvZCBjYWxsaW5nIGxvZ2ljXG5cdFx0aWYgKG1ldGhvZHNbbWV0aG9kXSAmJiBtZXRob2QuY2hhckF0KDApICE9ICdfJykge1xuXHRcdFx0cmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QpIHtcblx0XHRcdHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JC5lcnJvcignTWV0aG9kICcgKyAgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkucGFnaW5hdGlvbicpO1xuXHRcdH1cblxuXHR9O1xuXG59KShqUXVlcnkpOyIsIi8qXG4gICAgQSBzaW1wbGUgalF1ZXJ5IG1vZGFsIChodHRwOi8vZ2l0aHViLmNvbS9reWxlZm94L2pxdWVyeS1tb2RhbClcbiAgICBWZXJzaW9uIDAuOS4yXG4qL1xuXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgLy8gTWFraW5nIHlvdXIgalF1ZXJ5IHBsdWdpbiB3b3JrIGJldHRlciB3aXRoIG5wbSB0b29sc1xuICAvLyBodHRwOi8vYmxvZy5ucG1qcy5vcmcvcG9zdC8xMTI3MTIxNjk4MzAvbWFraW5nLXlvdXItanF1ZXJ5LXBsdWdpbi13b3JrLWJldHRlci13aXRoLW5wbVxuICBpZih0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgIGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgd2luZG93LCBkb2N1bWVudCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgZmFjdG9yeShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQpO1xuICB9XG59KGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuXG4gIHZhciBtb2RhbHMgPSBbXSxcbiAgICAgIGdldEN1cnJlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG1vZGFscy5sZW5ndGggPyBtb2RhbHNbbW9kYWxzLmxlbmd0aCAtIDFdIDogbnVsbDtcbiAgICAgIH0sXG4gICAgICBzZWxlY3RDdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChpPW1vZGFscy5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG4gICAgICAgICAgaWYgKG1vZGFsc1tpXS4kYmxvY2tlcikge1xuICAgICAgICAgICAgbW9kYWxzW2ldLiRibG9ja2VyLnRvZ2dsZUNsYXNzKCdjdXJyZW50Jywhc2VsZWN0ZWQpLnRvZ2dsZUNsYXNzKCdiZWhpbmQnLHNlbGVjdGVkKTtcbiAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgJC55c3BfbW9kYWwgPSBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuICAgIHZhciByZW1vdmUsIHRhcmdldDtcbiAgICB0aGlzLiRib2R5ID0gJCgnYm9keScpO1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkLnlzcF9tb2RhbC5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zLmRvRmFkZSA9ICFpc05hTihwYXJzZUludCh0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uLCAxMCkpO1xuICAgIHRoaXMuJGJsb2NrZXIgPSBudWxsO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VFeGlzdGluZylcbiAgICAgIHdoaWxlICgkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKVxuICAgICAgICAkLnlzcF9tb2RhbC5jbG9zZSgpOyAvLyBDbG9zZSBhbnkgb3BlbiBtb2RhbHMuXG4gICAgbW9kYWxzLnB1c2godGhpcyk7XG4gICAgaWYgKGVsLmlzKCdhJykpIHtcbiAgICAgIHRhcmdldCA9IGVsLmF0dHIoJ2hyZWYnKTtcbiAgICAgIHRoaXMuYW5jaG9yID0gZWw7XG4gICAgICAvL1NlbGVjdCBlbGVtZW50IGJ5IGlkIGZyb20gaHJlZlxuICAgICAgaWYgKC9eIy8udGVzdCh0YXJnZXQpKSB7XG4gICAgICAgIHRoaXMuJGVsbSA9ICQodGFyZ2V0KTtcbiAgICAgICAgaWYgKHRoaXMuJGVsbS5sZW5ndGggIT09IDEpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLiRlbG0pO1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIC8vQUpBWFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZWxtID0gJCgnPGRpdj4nKTtcbiAgICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kZWxtKTtcbiAgICAgICAgcmVtb3ZlID0gZnVuY3Rpb24oZXZlbnQsIG1vZGFsKSB7IG1vZGFsLmVsbS5yZW1vdmUoKTsgfTtcbiAgICAgICAgdGhpcy5zaG93U3Bpbm5lcigpO1xuICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfU0VORCk7XG4gICAgICAgICQuZ2V0KHRhcmdldCkuZG9uZShmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgaWYgKCEkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKSByZXR1cm47XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX1NVQ0NFU1MpO1xuICAgICAgICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuICAgICAgICAgIGN1cnJlbnQuJGVsbS5lbXB0eSgpLmFwcGVuZChodG1sKS5vbigkLnlzcF9tb2RhbC5DTE9TRSwgcmVtb3ZlKTtcbiAgICAgICAgICBjdXJyZW50LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgY3VycmVudC5vcGVuKCk7XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX0NPTVBMRVRFKTtcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfRkFJTCk7XG4gICAgICAgICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgICAgICAgY3VycmVudC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgIG1vZGFscy5wb3AoKTsgLy8gcmVtb3ZlIGV4cGVjdGVkIG1vZGFsIGZyb20gdGhlIGxpc3RcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfQ09NUExFVEUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWxtID0gZWw7XG4gICAgICB0aGlzLmFuY2hvciA9IGVsO1xuICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kZWxtKTtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfTtcblxuICAkLnlzcF9tb2RhbC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6ICQueXNwX21vZGFsLFxuXG4gICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbSA9IHRoaXM7XG4gICAgICB0aGlzLmJsb2NrKCk7XG4gICAgICB0aGlzLmFuY2hvci5ibHVyKCk7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuZG9GYWRlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbS5zaG93KCk7XG4gICAgICAgIH0sIHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24gKiB0aGlzLm9wdGlvbnMuZmFkZURlbGF5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgfVxuICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXlkb3duLm1vZGFsJykub24oJ2tleWRvd24ubW9kYWwnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAyNyAmJiBjdXJyZW50Lm9wdGlvbnMuZXNjYXBlQ2xvc2UpIGN1cnJlbnQuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jbGlja0Nsb3NlKVxuICAgICAgICB0aGlzLiRibG9ja2VyLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHRoaXMpXG4gICAgICAgICAgICAkLnlzcF9tb2RhbC5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgbW9kYWxzLnBvcCgpO1xuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSlcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXlkb3duLm1vZGFsJyk7XG4gICAgfSxcblxuICAgIGJsb2NrOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkJFRk9SRV9CTE9DSywgW3RoaXMuX2N0eCgpXSk7XG4gICAgICB0aGlzLiRib2R5LmNzcygnb3ZlcmZsb3cnLCdoaWRkZW4nKTtcbiAgICAgIHRoaXMuJGJsb2NrZXIgPSAkKCc8ZGl2IGNsYXNzPVwiJyArIHRoaXMub3B0aW9ucy5ibG9ja2VyQ2xhc3MgKyAnIGJsb2NrZXIgY3VycmVudFwiPjwvZGl2PicpLmFwcGVuZFRvKHRoaXMuJGJvZHkpO1xuICAgICAgc2VsZWN0Q3VycmVudCgpO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmRvRmFkZSkge1xuICAgICAgICB0aGlzLiRibG9ja2VyLmNzcygnb3BhY2l0eScsMCkuYW5pbWF0ZSh7b3BhY2l0eTogMX0sIHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkxPQ0ssIFt0aGlzLl9jdHgoKV0pO1xuICAgIH0sXG5cbiAgICB1bmJsb2NrOiBmdW5jdGlvbihub3cpIHtcbiAgICAgIGlmICghbm93ICYmIHRoaXMub3B0aW9ucy5kb0ZhZGUpXG4gICAgICAgIHRoaXMuJGJsb2NrZXIuZmFkZU91dCh0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uLCB0aGlzLnVuYmxvY2suYmluZCh0aGlzLHRydWUpKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLiRibG9ja2VyLmNoaWxkcmVuKCkuYXBwZW5kVG8odGhpcy4kYm9keSk7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIgPSBudWxsO1xuICAgICAgICBzZWxlY3RDdXJyZW50KCk7XG4gICAgICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSlcbiAgICAgICAgICB0aGlzLiRib2R5LmNzcygnb3ZlcmZsb3cnLCcnKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5CRUZPUkVfT1BFTiwgW3RoaXMuX2N0eCgpXSk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnNob3dDbG9zZSkge1xuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gJCgnPGEgaHJlZj1cIiNjbG9zZS1tb2RhbFwiIHJlbD1cIm1vZGFsOmNsb3NlXCIgY2xhc3M9XCJjbG9zZS1tb2RhbCAnICsgdGhpcy5vcHRpb25zLmNsb3NlQ2xhc3MgKyAnXCI+JyArIHRoaXMub3B0aW9ucy5jbG9zZVRleHQgKyAnPC9hPicpO1xuICAgICAgICB0aGlzLiRlbG0uYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24pO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLmFkZENsYXNzKHRoaXMub3B0aW9ucy5tb2RhbENsYXNzKS5hcHBlbmRUbyh0aGlzLiRibG9ja2VyKTtcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgdGhpcy4kZWxtLmNzcyh7b3BhY2l0eTogMCwgZGlzcGxheTogJ2lubGluZS1ibG9jayd9KS5hbmltYXRlKHtvcGFjaXR5OiAxfSwgdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRlbG0uY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuT1BFTiwgW3RoaXMuX2N0eCgpXSk7XG4gICAgfSxcblxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkVGT1JFX0NMT1NFLCBbdGhpcy5fY3R4KCldKTtcbiAgICAgIGlmICh0aGlzLmNsb3NlQnV0dG9uKSB0aGlzLmNsb3NlQnV0dG9uLnJlbW92ZSgpO1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgdGhpcy4kZWxtLmZhZGVPdXQodGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5BRlRFUl9DTE9TRSwgW190aGlzLl9jdHgoKV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsbS5oaWRlKDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQUZURVJfQ0xPU0UsIFtfdGhpcy5fY3R4KCldKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5DTE9TRSwgW3RoaXMuX2N0eCgpXSk7XG4gICAgfSxcblxuICAgIHNob3dTcGlubmVyOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLnNob3dTcGlubmVyKSByZXR1cm47XG4gICAgICB0aGlzLnNwaW5uZXIgPSB0aGlzLnNwaW5uZXIgfHwgJCgnPGRpdiBjbGFzcz1cIicgKyB0aGlzLm9wdGlvbnMubW9kYWxDbGFzcyArICctc3Bpbm5lclwiPjwvZGl2PicpXG4gICAgICAgIC5hcHBlbmQodGhpcy5vcHRpb25zLnNwaW5uZXJIdG1sKTtcbiAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuc3Bpbm5lcik7XG4gICAgICB0aGlzLnNwaW5uZXIuc2hvdygpO1xuICAgIH0sXG5cbiAgICBoaWRlU3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zcGlubmVyKSB0aGlzLnNwaW5uZXIucmVtb3ZlKCk7XG4gICAgfSxcblxuICAgIC8vUmV0dXJuIGNvbnRleHQgZm9yIGN1c3RvbSBldmVudHNcbiAgICBfY3R4OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7IGVsbTogdGhpcy4kZWxtLCAkZWxtOiB0aGlzLiRlbG0sICRibG9ja2VyOiB0aGlzLiRibG9ja2VyLCBvcHRpb25zOiB0aGlzLm9wdGlvbnMsICRhbmNob3I6IHRoaXMuYW5jaG9yIH07XG4gICAgfVxuICB9O1xuXG4gICQueXNwX21vZGFsLmNsb3NlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoISQueXNwX21vZGFsLmlzQWN0aXZlKCkpIHJldHVybjtcbiAgICBpZiAoZXZlbnQpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgY3VycmVudC5jbG9zZSgpO1xuICAgIHJldHVybiBjdXJyZW50LiRlbG07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBpZiB0aGVyZSBjdXJyZW50bHkgaXMgYW4gYWN0aXZlIG1vZGFsXG4gICQueXNwX21vZGFsLmlzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBtb2RhbHMubGVuZ3RoID4gMDtcbiAgfTtcblxuICAkLnlzcF9tb2RhbC5nZXRDdXJyZW50ID0gZ2V0Q3VycmVudDtcblxuICAkLnlzcF9tb2RhbC5kZWZhdWx0cyA9IHtcbiAgICBjbG9zZUV4aXN0aW5nOiB0cnVlLFxuICAgIGVzY2FwZUNsb3NlOiB0cnVlLFxuICAgIGNsaWNrQ2xvc2U6IHRydWUsXG4gICAgY2xvc2VUZXh0OiAnQ2xvc2UnLFxuICAgIGNsb3NlQ2xhc3M6ICcnLFxuICAgIG1vZGFsQ2xhc3M6IFwieXNwLW1vZGFsXCIsXG4gICAgYmxvY2tlckNsYXNzOiBcImpxdWVyeS1tb2RhbFwiLFxuICAgIHNwaW5uZXJIdG1sOiAnPGRpdiBjbGFzcz1cInJlY3QxXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3QyXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3QzXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3Q0XCI+PC9kaXY+JyxcbiAgICBzaG93U3Bpbm5lcjogdHJ1ZSxcbiAgICBzaG93Q2xvc2U6IHRydWUsXG4gICAgZmFkZUR1cmF0aW9uOiBudWxsLCAgIC8vIE51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhlIGZhZGUgYW5pbWF0aW9uIHRha2VzLlxuICAgIGZhZGVEZWxheTogMS4wICAgICAgICAvLyBQb2ludCBkdXJpbmcgdGhlIG92ZXJsYXkncyBmYWRlLWluIHRoYXQgdGhlIG1vZGFsIGJlZ2lucyB0byBmYWRlIGluICguNSA9IDUwJSwgMS41ID0gMTUwJSwgZXRjLilcbiAgfTtcblxuICAvLyBFdmVudCBjb25zdGFudHNcbiAgJC55c3BfbW9kYWwuQkVGT1JFX0JMT0NLID0gJ21vZGFsOmJlZm9yZS1ibG9jayc7XG4gICQueXNwX21vZGFsLkJMT0NLID0gJ21vZGFsOmJsb2NrJztcbiAgJC55c3BfbW9kYWwuQkVGT1JFX09QRU4gPSAnbW9kYWw6YmVmb3JlLW9wZW4nO1xuICAkLnlzcF9tb2RhbC5PUEVOID0gJ21vZGFsOm9wZW4nO1xuICAkLnlzcF9tb2RhbC5CRUZPUkVfQ0xPU0UgPSAnbW9kYWw6YmVmb3JlLWNsb3NlJztcbiAgJC55c3BfbW9kYWwuQ0xPU0UgPSAnbW9kYWw6Y2xvc2UnO1xuICAkLnlzcF9tb2RhbC5BRlRFUl9DTE9TRSA9ICdtb2RhbDphZnRlci1jbG9zZSc7XG4gICQueXNwX21vZGFsLkFKQVhfU0VORCA9ICdtb2RhbDphamF4OnNlbmQnO1xuICAkLnlzcF9tb2RhbC5BSkFYX1NVQ0NFU1MgPSAnbW9kYWw6YWpheDpzdWNjZXNzJztcbiAgJC55c3BfbW9kYWwuQUpBWF9GQUlMID0gJ21vZGFsOmFqYXg6ZmFpbCc7XG4gICQueXNwX21vZGFsLkFKQVhfQ09NUExFVEUgPSAnbW9kYWw6YWpheDpjb21wbGV0ZSc7XG5cbiAgJC5mbi55c3BfbW9kYWwgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIG5ldyAkLnlzcF9tb2RhbCh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gQXV0b21hdGljYWxseSBiaW5kIGxpbmtzIHdpdGggcmVsPVwibW9kYWw6Y2xvc2VcIiB0bywgd2VsbCwgY2xvc2UgdGhlIG1vZGFsLlxuICAkKGRvY3VtZW50KS5vbignY2xpY2subW9kYWwnLCAnYVtyZWx+PVwibW9kYWw6Y2xvc2VcIl0nLCAkLnlzcF9tb2RhbC5jbG9zZSk7XG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5tb2RhbCcsICdhW3JlbH49XCJtb2RhbDpvcGVuXCJdJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQodGhpcykubW9kYWwoKTtcbiAgfSk7XG59KSk7IiwialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgXG4gIGpRdWVyeSgnW2RhdGEtbW9kYWxdJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygnZnVjayBtZSAnKTtcblxuICAgIHZhciBkYXRhX21vZGFsID0galF1ZXJ5KHRoaXMpLmRhdGEoJ21vZGFsJyk7XG5cbiAgICBqUXVlcnkoIGRhdGFfbW9kYWwgKS55c3BfbW9kYWwoe1xuICAgIFx0Y2xvc2VUZXh0OiAnWCcsXG4gICAgICBtb2RhbENsYXNzOiAneXNwLW1vZGFsLW9wZW4nLFxuICAgICAgY2xvc2VDbGFzczogJ3lzcC1tb2RlbC1jbG9zZSdcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuZnVuY3Rpb24gY29weUxpbmsoKSB7XG5cbiAgdmFyIGNvcHlUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3B5TGlua0lucHV0XCIpO1xuXG4gIGNvcHlUZXh0LnNlbGVjdCgpO1xuICBjb3B5VGV4dC5zZXRTZWxlY3Rpb25SYW5nZSgwLCA5OTk5OSk7XG5cbiAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xuXG4gIGFsZXJ0KFwiQ29waWVkIHRoZSBsaW5rOiBcIiArIGNvcHlUZXh0LnZhbHVlKTtcbn0iLCJPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RyaW5nLnByb3RvdHlwZSwgJ2VhY2hXb3JkQ2FwaXRhbGl6ZScsIHtcbiAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRvTG93ZXJDYXNlKClcbiAgICAuc3BsaXQoJyAnKVxuICAgIC5tYXAoKHMpID0+IHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnN1YnN0cmluZygxKSlcbiAgICAuam9pbignICcpO1xuICB9LFxuICBlbnVtZXJhYmxlOiBmYWxzZVxufSk7XG5cbmZ1bmN0aW9uIHJhaXlzX2dldF9mb3JtX2RhdGEoZm9ybV9lbGUpIHtcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoIGZvcm1fZWxlICk7XG5cbiAgICBsZXQgZmQ9T2JqZWN0LmZyb21FbnRyaWVzKGZvcm1EYXRhLmVudHJpZXMoKSk7XG5cbiAgICBmb3IgKGNvbnN0IFtmSW5kZXgsIGZpZWxkXSBvZiBPYmplY3QuZW50cmllcyhmZCkpIHtcblxuICAgICAgICBsZXQgVmFsQXJyYXkgPSBmb3JtRGF0YS5nZXRBbGwoZkluZGV4KTtcblxuICAgICAgICBpZiAodHlwZW9mIFZhbEFycmF5WzFdICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBmZFsgZkluZGV4IF0gPSBWYWxBcnJheTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmZFsgZkluZGV4IF0gPT0gJycpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBmZFtmSW5kZXhdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZkO1xufVxuXG5mdW5jdGlvbiByYWl5c19zZXRfZm9ybV90b19kYXRhKGlucHV0RGF0YSkge1xuXG4gICAgbGV0IGZvcm1BPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0nKTtcbiAgICBsZXQgZm9ybUI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0nKTtcblxuICAgIGZvcm1BLnJlc2V0KCk7XG4gICAgZm9ybUIucmVzZXQoKTtcblxuICAgIGxldCBmb3JtSW5wdXRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLXlhY2h0LXNlYXJjaC1mb3JtXCJdLCAjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtXCJdJyk7XG5cbiAgICBmb3JtSW5wdXRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICBsZXQgaW5wdXQgPSBlbGU7XG5cbiAgICAgICAgbGV0IG5hbWUgPSBlbGUuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgbGV0IGhhc1ByZXR0eSA9IGlucHV0RGF0YVsgbmFtZSBdO1xuXG4gICAgICAgLy8gY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICBpZiAodHlwZW9mIGhhc1ByZXR0eSAhPSAnbnVsbCcgJiYgdHlwZW9mIGhhc1ByZXR0eSAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShoYXNQcmV0dHkpKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhoYXNQcmV0dHkpO1xuXG4gICAgICAgICAgICAgICAgaGFzUHJldHR5LmZvckVhY2goKGhQKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaFAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGhhc1ByZXR0eSApIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dC50eXBlICE9ICdjaGVja2JveCcgJiYgaW5wdXQudHlwZSAhPSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gaGFzUHJldHR5O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmFpeXNfcHVzaF9oaXN0b3J5KCBkYXRhID0ge30gKSB7XG4gICAgbGV0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBsZXQgc3RycGF0aD0nJztcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBsZXQgaXQgPSBkYXRhWyBwcm9wZXJ0eSBdO1xuXG5cbiAgICAgICAgaWYgKGl0ICE9ICcnICYmIHR5cGVvZiBpdCAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgaXQgPT0gJ3N0cmluZycgJiYgcHJvcGVydHkgIT0gJ09uRmlyc3RMb2FkJyAmJiB0eXBlb2YgaXQgIT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQocHJvcGVydHksIGl0KTtcblxuICAgICAgICAgICAgc3RycGF0aD1zdHJwYXRoK1wiXCIrcHJvcGVydHkrJy0nKyhpdC50b1N0cmluZygpLnNwbGl0KCcgJykuam9pbignLScpKSsnLyc7XG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0KSkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChwcm9wZXJ0eSwgaXQpO1xuXG4gICAgICAgICAgICBpdCA9IGl0Lm1hcCgocHJvcCkgPT4geyByZXR1cm4gcHJvcC50b1N0cmluZygpLnNwbGl0KCcgJykuam9pbignLScpOyB9KTtcblxuICAgICAgICAgICAgc3RycGF0aD1zdHJwYXRoK1wiXCIrcHJvcGVydHkrJy0nKyggaXQuam9pbihcIitcIikgKSsnLyc7XG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgudG9Mb3dlckNhc2UoKTsgIFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vaGlzdG9yeS5wdXNoU3RhdGUoZGF0YSwgJycsIHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF91cmwrJz8nK3NlYXJjaFBhcmFtcy50b1N0cmluZygpKTtcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZShkYXRhLCAnJywgcmFpX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3VybCtzdHJwYXRoKTtcblxuICAgIHJldHVybiByYWlfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfdXJsK3N0cnBhdGg7ICAgIFxufVxuXG4iLCJ2YXIgcmFpX3lzcF9hcGk9e307XG5cbiAgICByYWlfeXNwX2FwaS5jYWxsX2FwaT1mdW5jdGlvbihtZXRob2QsIHBhdGgsIHBhc3NpbmdfZGF0YSkge1xuICAgICAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiB0aGlzLnN0YXR1cyA9PSAyMDApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2VEYXRhID0gSlNPTi5wYXJzZSggdGhpcy5yZXNwb25zZVRleHQgKTtcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlRGF0YSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0dFVCc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhc3NpbmdfZGF0YS5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBwYXNzaW5nX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KHByb3BlcnR5LCBwYXNzaW5nX2RhdGFbIHByb3BlcnR5IF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgX3F1ZXN0aW9uTWFyaz1zZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIHJhaV95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wicmFpeXMvXCIrIHBhdGggKyAoKF9xdWVzdGlvbk1hcmsgIT0gJycpPyc/JytzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTonJyksIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLnNlbmQoKTtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1BPU1QnOlxuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLm9wZW4oXCJQT1NUXCIsIHJhaV95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wicmFpeXMvXCIrIHBhdGgsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeShwYXNzaW5nX2RhdGEpKTtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcblxuICAgIH07IiwidmFyIHlzcF90ZW1wbGF0ZXM9e307XG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQ9e307XG5cdFxuXHR5c3BfdGVtcGxhdGVzLnlhY2h0LmdyaWQ9ZnVuY3Rpb24odmVzc2VsLCBwYXJhbXMpIHtcblx0XHRsZXQgbWV0ZXJzID0gcGFyc2VJbnQodmVzc2VsLk5vbWluYWxMZW5ndGgpICogMC4zMDQ4O1xuXG5cdFx0bGV0IHByaWNlID0gJyc7XG5cdFx0bGV0IGxlbmd0aCA9ICcnO1xuXG5cdFx0aWYgKHJhaV95YWNodF9zeW5jLmV1cm9wZV9vcHRpb25fcGlja2VkID09IFwieWVzXCIpIHtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cdFx0XHRwcmljZSA9ICh0eXBlb2YgdmVzc2VsLllTUF9FdXJvVmFsICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5ZU1BfRXVyb1ZhbCA+IDApID8gYOKCrCR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHZlc3NlbC5ZU1BfRXVyb1ZhbCkgfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnO1xuXHRcdH0gXG5cdFx0ZWxzZSB7XG5cdFx0XHRsZW5ndGggPSB2ZXNzZWwuTm9taW5hbExlbmd0aCA/IHZlc3NlbC5Ob21pbmFsTGVuZ3RoICsgXCIgLyBcIiArIG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnO1xuXG5cdFx0XHRpZiAocGFyYW1zLmN1cnJlbmN5ID09ICdFdXInKSB7XG5cdFx0XHRcdHByaWNlID0gKHR5cGVvZiB2ZXNzZWwuWVNQX1VTRFZhbCAhPSAndW5kZWZpbmVkJyAmJiB2ZXNzZWwuWVNQX1VTRFZhbCA+IDApID8gYOKCrCR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHZlc3NlbC5ZU1BfRXVyb1ZhbCkgfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHByaWNlID0gKHR5cGVvZiB2ZXNzZWwuWVNQX1VTRFZhbCAhPSAndW5kZWZpbmVkJyAmJiB2ZXNzZWwuWVNQX1VTRFZhbCA+IDApID8gYCQke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdCh2ZXNzZWwuWVNQX1VTRFZhbCkgfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnO1xuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGBcblx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1yZXN1bHQtZ3JpZC1pdGVtXCIgZGF0YS1wb3N0LWlkPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiIGRhdGEteWFjaHQtaWQ9XCIkeyB2ZXNzZWwuRG9jdW1lbnRJRCB9XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1tYWluLWltYWdlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdDxhIGNsYXNzPVwieWFjaHQtZGV0YWlsc1wiIGhyZWY9XCIkeyB2ZXNzZWwuX2xpbmsgfVwiPlxuXHRcdFx0XHRcdFx0PGltZyBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2VcIiBzcmM9XCIke3Zlc3NlbC5JbWFnZXMgPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6IHJhaV95YWNodF9zeW5jLmFzc2V0c191cmwgKyAnaW1hZ2VzL2RlZmF1bHQteWFjaHQtaW1hZ2UuanBlZyd9XCIgYWx0PVwieWFjaHQtaW1hZ2VcIiBsb2FkaW5nPVwibGF6eVwiIC8+XG5cdFx0XHRcdFx0XHQke3Zlc3NlbC5Db21wYW55TmFtZSA9PT0gcmFpX3lhY2h0X3N5bmMuY29tcGFueV9uYW1lID8gYDxkaXYgY2xhc3M9XCJjb21wYW55LWJhbm5lclwiPjxpbWcgc3JjPVwiJHtyYWlfeWFjaHRfc3luYy5jb21wYW55X2xvZ299XCI+PC9kaXY+YCA6ICcnfVxuXHRcdFx0XHRcdDwvYT5cdFxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWdlbmVyYWwtaW5mby1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtdGl0bGUtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzcz1cInlhY2h0LWRldGFpbHNcIiBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdFx0PGg2IGNsYXNzPVwieWFjaHQtdGl0bGVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJyd9ICR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICcnfSAke3Zlc3NlbC5Nb2RlbCA/IHZlc3NlbC5Nb2RlbCA6ICcnfSAke3Zlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICcnfTwvaDY+XG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZm8tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5ZZWFyPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5DYWJpbnM8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuQ2FiaW5zQ291bnROdW1lcmljID8gdmVzc2VsLkNhYmluc0NvdW50TnVtZXJpYyA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkJ1aWxkZXI8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+TGVuZ3RoPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7bGVuZ3RofTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkNvbXBhcmU8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY29tcGFyZV90b2dnbGVcIiBuYW1lPVwiY29tcGFyZVwiIHZhbHVlPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiIC8+PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1wcmljZS1kZXRhaWxzLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXByaWNlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LXByaWNlXCI+JHtwcmljZX08L3A+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cInlhY2h0LWRvd25sb2FkLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBkYXRhLW1vZGFsPVwiI3NpbmdsZS1zaGFyZVwiPkNvbnRhY3Q8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCJsb3ZlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEteWFjaHQtaWQ9XCIkeyB2ZXNzZWwuRG9jdW1lbnRJRCB9XCI+TGlrZWQ8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXHR9O1xuXG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQubGlzdD1mdW5jdGlvbih2ZXNzZWwpIHtcblx0XHRsZXQgbWV0ZXJzID0gcGFyc2VJbnQodmVzc2VsLk5vbWluYWxMZW5ndGgpICogMC4zMDQ4O1xuXHRcdGxldCBwcmljZSA9ICcnO1xuXG5cdFx0aWYgKHR5cGVvZiB2ZXNzZWwuUHJpY2UgPT0gJ3N0cmluZycpIHtcblx0XHRcdGxldCBwcmljZSA9IHZlc3NlbC5QcmljZS5zbGljZSgwLCAtMyk7XG5cdFx0fVxuXHRcdFxuXHRcdGxldCBsZW5ndGggPSAnJztcblx0XHRcblx0XHRpZihyYWlfeWFjaHRfc3luYy5ldXJvcGVfb3B0aW9uX3BpY2tlZCA9PSBcInllc1wiKXtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cdFx0XHRwcmljZSA9IHZlc3NlbC5QcmljZSA/IGDigqwgJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQoKHBhcnNlSW50KHZlc3NlbC5QcmljZS5zbGljZSgwLCAtMykpICogcmFpX3lhY2h0X3N5bmMuZXVyb19jX2MpKX1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyB2ZXNzZWwuTm9taW5hbExlbmd0aCArIFwiIC8gXCIgKyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblx0XHRcdHByaWNlID0gdmVzc2VsLlByaWNlID8gYCQgJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQocGFyc2VJbnQodmVzc2VsLlByaWNlLnNsaWNlKDAsIC0zKSkpfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGBcblx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1yZXN1bHQtZ3JpZC1pdGVtIGxpc3Qtdmlld1wiIGRhdGEtcG9zdC1pZD1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2UtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGEgY2xhc3M9XCJ5YWNodC1kZXRhaWxzXCIgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZVwiIHNyYz1cIiR7dmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogdmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogcmFpX3lhY2h0X3N5bmMuYXNzZXRzX3VybCArICdpbWFnZXMvZGVmYXVsdC15YWNodC1pbWFnZS5qcGVnJ31cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtZ2VuZXJhbC1pbmZvLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC10aXRsZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxhIGNsYXNzPVwieWFjaHQtZGV0YWlsc1wiIGhyZWY9XCIkeyB2ZXNzZWwuX2xpbmsgfVwiPlxuXHRcdFx0XHRcdFx0XHQ8aDYgY2xhc3M9XCJ5YWNodC10aXRsZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnJ30gJHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJyd9ICR7dmVzc2VsLk1vZGVsID8gdmVzc2VsLk1vZGVsIDogJyd9ICR7dmVzc2VsLkJvYXROYW1lID8gdmVzc2VsLkJvYXROYW1lIDogJyd9PC9oNj5cblx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5mby1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmZvXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPlllYXI8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkNhYmluczwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5DYWJpbnNDb3VudE51bWVyaWMgPyB2ZXNzZWwuQ2FiaW5zQ291bnROdW1lcmljIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+QnVpbGRlcjwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdmFsdWVcIj4ke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5MZW5ndGg8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHtsZW5ndGh9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1wcmljZS1kZXRhaWxzLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXByaWNlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LXByaWNlXCI+JHtwcmljZX08L3A+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCJ5YWNodC1kb3dubG9hZC1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1tb2RhbD1cIiNzaW5nbGUtc2hhcmVcIj5Db250YWN0PC9idXR0b24+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHRcblx0XHRgO1xuXHR9O1xuXG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQuY29tcGFyZV9wcmV2aWV3ID0gZnVuY3Rpb24odmVzc2VsLCBwYXJhbXMpIHtcblxuXHRcdHJldHVybiBgXG5cblx0XHRcdDxkaXYgY2xhc3M9XCJ5c3AteWFjaHQtY29tcGFyZS1wcmV2aWV3XCIgZGF0YS1wb3N0LWlkPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiIGRhdGEteWFjaHQtaWQ9XCIkeyB2ZXNzZWwuRG9jdW1lbnRJRCB9XCI+XHRcdFx0XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwicmVtb3ZlLWZyb20tY29tcGFyZVwiPlxuXHRcdFx0XHRcdDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdFx0XHRcdDxyZWN0IHg9XCIwLjVcIiB5PVwiMC41XCIgd2lkdGg9XCIyM1wiIGhlaWdodD1cIjIzXCIgcng9XCIxMS41XCIgc3Ryb2tlPVwiIzZCNzA3M1wiLz5cblx0XHRcdFx0XHQ8cGF0aCBkPVwiTTguMjY4NzYgMTQuOTM0NkM4LjA0OTA5IDE1LjE1NDMgOC4wNDkwOSAxNS41MTA0IDguMjY4NzYgMTUuNzMwMUM4LjQ4ODQzIDE1Ljk0OTggOC44NDQ1OCAxNS45NDk4IDkuMDY0MjUgMTUuNzMwMUw4LjI2ODc2IDE0LjkzNDZaTTEyLjM5NzYgMTIuMzk2OEMxMi42MTczIDEyLjE3NzEgMTIuNjE3MyAxMS44MjA5IDEyLjM5NzYgMTEuNjAxM0MxMi4xNzc5IDExLjM4MTYgMTEuODIxOCAxMS4zODE2IDExLjYwMjEgMTEuNjAxM0wxMi4zOTc2IDEyLjM5NjhaTTExLjYwMTggMTEuNjAxNkMxMS4zODIxIDExLjgyMTMgMTEuMzgyMSAxMi4xNzc0IDExLjYwMTggMTIuMzk3MUMxMS44MjE0IDEyLjYxNjggMTIuMTc3NiAxMi42MTY4IDEyLjM5NzMgMTIuMzk3MUwxMS42MDE4IDExLjYwMTZaTTE1LjczMDYgOS4wNjM3NkMxNS45NTAzIDguODQ0MDkgMTUuOTUwMyA4LjQ4Nzk0IDE1LjczMDYgOC4yNjgyN0MxNS41MTA5IDguMDQ4NiAxNS4xNTQ4IDguMDQ4NiAxNC45MzUxIDguMjY4MjdMMTUuNzMwNiA5LjA2Mzc2Wk0xMi4zOTczIDExLjYwMTNDMTIuMTc3NiAxMS4zODE2IDExLjgyMTQgMTEuMzgxNiAxMS42MDE4IDExLjYwMTNDMTEuMzgyMSAxMS44MjA5IDExLjM4MjEgMTIuMTc3MSAxMS42MDE4IDEyLjM5NjhMMTIuMzk3MyAxMS42MDEzWk0xNC45MzUxIDE1LjczMDFDMTUuMTU0OCAxNS45NDk4IDE1LjUxMDkgMTUuOTQ5OCAxNS43MzA2IDE1LjczMDFDMTUuOTUwMyAxNS41MTA0IDE1Ljk1MDMgMTUuMTU0MyAxNS43MzA2IDE0LjkzNDZMMTQuOTM1MSAxNS43MzAxWk0xMS42MDIxIDEyLjM5NzFDMTEuODIxOCAxMi42MTY4IDEyLjE3NzkgMTIuNjE2OCAxMi4zOTc2IDEyLjM5NzFDMTIuNjE3MyAxMi4xNzc0IDEyLjYxNzMgMTEuODIxMyAxMi4zOTc2IDExLjYwMTZMMTEuNjAyMSAxMi4zOTcxWk05LjA2NDI1IDguMjY4MjdDOC44NDQ1OCA4LjA0ODYgOC40ODg0MyA4LjA0ODYgOC4yNjg3NiA4LjI2ODI3QzguMDQ5MDkgOC40ODc5NCA4LjA0OTA5IDguODQ0MDkgOC4yNjg3NiA5LjA2Mzc2TDkuMDY0MjUgOC4yNjgyN1pNOS4wNjQyNSAxNS43MzAxTDEyLjM5NzYgMTIuMzk2OEwxMS42MDIxIDExLjYwMTNMOC4yNjg3NiAxNC45MzQ2TDkuMDY0MjUgMTUuNzMwMVpNMTIuMzk3MyAxMi4zOTcxTDE1LjczMDYgOS4wNjM3NkwxNC45MzUxIDguMjY4MjdMMTEuNjAxOCAxMS42MDE2TDEyLjM5NzMgMTIuMzk3MVpNMTEuNjAxOCAxMi4zOTY4TDE0LjkzNTEgMTUuNzMwMUwxNS43MzA2IDE0LjkzNDZMMTIuMzk3MyAxMS42MDEzTDExLjYwMTggMTIuMzk2OFpNMTIuMzk3NiAxMS42MDE2TDkuMDY0MjUgOC4yNjgyN0w4LjI2ODc2IDkuMDYzNzZMMTEuNjAyMSAxMi4zOTcxTDEyLjM5NzYgMTEuNjAxNlpcIiBmaWxsPVwiIzZCNzA3M1wiLz5cblx0XHRcdFx0XHQ8L3N2Zz5cblx0XHRcdFx0PC9zcGFuPlxuXG5cblx0XHRcdFx0PGltZyBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2VcIiBzcmM9XCIke3Zlc3NlbC5JbWFnZXMgPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6IHJhaV95YWNodF9zeW5jLmFzc2V0c191cmwgKyAnaW1hZ2VzL2RlZmF1bHQteWFjaHQtaW1hZ2UuanBlZyd9XCIgYWx0PVwieWFjaHQtaW1hZ2VcIiBsb2FkaW5nPVwibGF6eVwiIC8+XG5cblx0XHRcdFx0PGg2IGNsYXNzPVwieWFjaHQtdGl0bGVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJyd9ICR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICcnfSAke3Zlc3NlbC5Nb2RlbCA/IHZlc3NlbC5Nb2RlbCA6ICcnfSAke3Zlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICcnfTwvaDY+XG5cblx0XHRcdDwvZGl2PlxuXG5cdFx0YDtcblxuXHR9O1xuXG5cdHlzcF90ZW1wbGF0ZXMubm9SZXN1bHRzPWZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxiPk5vIFJlc3VsdHM8L2I+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgIH07XG5cblxuICAgIHlzcF90ZW1wbGF0ZXMueWFjaHRfdGFnID0gZnVuY3Rpb24obGFiZWwsIHZhbHVlKSB7XG5cbiAgICBcdHJldHVybiBgXG4gICAgXHRcdDxzcGFuPlxuXHQgICAgXHRcdCR7dmFsdWV9XG5cblx0ICAgIFx0XHQ8aW1nIHNyYz1cIiR7cmFpX3lhY2h0X3N5bmMuYXNzZXRzX3VybH0vaW1hZ2VzL3JlbW92ZS10YWcucG5nXCI+XG5cdFx0XHQ8L3NwYW4+XG4gICAgXHRgO1xuICAgIH07XG5cbiAgICB5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24gPSB7fTtcbiAgICBcbiAgICBcdHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5uZXh0X3RleHQgPSBgPmA7XG5cbiAgICBcdHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5wcmV2X3RleHQgPSBgPGA7XG5cbiIsIlxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cblx0bGV0IGVsZV9xdWlja19zZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXF1aWNrLXNlYXJjaC1mb3JtJyk7XG5cblx0aWYgKGVsZV9xdWlja19zZWFyY2gpIHtcblx0XHQvLyBGaWxsIG9wdGlvbnNcblx0ICAgIGxldCBGaWxsT3B0aW9ucz1bXTtcblx0ICAgIGxldCBzZWxlY3RvckVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi55c3AtcXVpY2stc2VhcmNoLWZvcm0gc2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zXVwiKTtcblxuXHQgICAgc2VsZWN0b3JFbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICBGaWxsT3B0aW9ucy5wdXNoKGVsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1vcHRpb25zJykpO1xuXHQgICAgfSk7XG5cdCAgICBcblx0ICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpKCdQT1NUJywgJ2Ryb3Bkb3duLW9wdGlvbnMnLCB7bGFiZWxzOiBGaWxsT3B0aW9uc30pLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcblx0ICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG5cdCAgICAgICAgICAgIGxldCBTZWxlY3RvckVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIueXNwLXF1aWNrLXNlYXJjaC1mb3JtIHNlbGVjdFtkYXRhLWZpbGwtb3B0aW9ucz0nXCIrIGxhYmVsICtcIiddXCIpO1xuXHQgICAgICAgICAgICBsZXQgbmFtZSA9IFNlbGVjdG9yRWxlWzBdLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG5cdCAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblx0ICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuXHQgICAgICAgICAgICAgICAgXHRsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuXHRcdCAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBiO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuXHQgICAgICAgICAgICAgICAgICAgIGVsZS5hZGQob3B0aW9uKTtcblx0ICAgICAgICAgICAgICAgIH0pO1xuXHQgICAgICAgICAgICB9KTtcblxuXHQgICAgICAgICAgICBsZXQgVVJMUkVGID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcblx0ICAgICAgICAgICAgbGV0IFVybFZhbCA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCBuYW1lICk7XG5cblx0ICAgICAgICAgICAgbGV0IHN0cnBhdGhzPXdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG5cdCAgICAgICAgICAgIHN0cnBhdGhzPXN0cnBhdGhzLnJlcGxhY2UocmFpX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3BhZ2VfaWQsICcnKTtcblxuXHQgICAgICAgICAgICBsZXQgcGF0aHMgPSBzdHJwYXRocy5zcGxpdChcIi9cIik7XG5cblx0ICAgICAgICAgICAgbGV0IHByZXR0eV91cmxfcGF0aF9wYXJhbXM9e307XG5cblx0ICAgICAgICAgICAgcGF0aHMuZm9yRWFjaChmdW5jdGlvbihwYXRoKSB7XG5cblx0ICAgICAgICAgICAgICAgIGlmIChwYXRoICE9ICcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbGV0IHBoYXNlX3BhdGggPSBwYXRoLnNwbGl0KCctJyk7XG5cdCAgICAgICAgICAgICAgICAgICAgbGV0IG9ubHlfdmFscz1waGFzZV9wYXRoLnNsaWNlKDEpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXT1vbmx5X3ZhbHMuam9pbignICcpO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0uZWFjaFdvcmRDYXBpdGFsaXplKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIH0pO1xuXHQgICAgICAgICAgICBcblx0ICAgICAgICAgICAgaWYgKFVybFZhbCAhPSAnJyAmJiBVcmxWYWwgIT0gbnVsbCkge1xuXHQgICAgICAgICAgICAgICAgY29uc29sZS5sb2coVXJsVmFsKTtcblxuXHQgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBVcmxWYWwgPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgICAgICBVcmxWYWwgPSBVcmxWYWwuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuXHQgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IFVybFZhbDsgXG5cdCAgICAgICAgICAgICAgICB9KTtcblxuXHQgICAgICAgICAgICB9XG5cblxuXHQgICAgICAgICAgICBsZXQgaGFzUHJldHR5ID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdO1xuXG5cdCAgICAgICAgICAgIGNvbnNvbGUubG9nKCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF0pO1xuXG5cdCAgICAgICAgICAgIGlmIChoYXNQcmV0dHkgIT0gJycgJiYgaGFzUHJldHR5ICE9IG51bGwpIHtcblx0ICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuXHQgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IGhhc1ByZXR0eTsgXG5cdCAgICAgICAgICAgICAgICB9KTtcblxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSlcblx0fVxufSk7IiwiZnVuY3Rpb24geXNwX21ha2VTZWFyY2hUYWdzKCBkYXRhICkge1xuXG5cdGxldCB0YWdzRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC1zZWFyY2gtdGFncycpO1xuICAgICAgICBcbiAgICBpZiAodGFnc0VsZSkge1xuICAgICAgICB0YWdzRWxlLmZvckVhY2goZnVuY3Rpb24odGUpIHtcbiAgICAgICAgICAgIHRlLmlubmVySFRNTD1cIlwiO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHZhciB5c3BfdGFnc19ub3RfcHJpbnQgPSBbJ3BhZ2VfaW5kZXgnLCAnJ107XG5cbiAgICAgICAgZm9yIChsZXQgcGFyYW1LZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgbGV0IGxhYmVsPScnO1xuXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGFiZWxbZm9yPScrIHBhcmFtS2V5ICsnXScpKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsYWJlbD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsYWJlbFtmb3I9JysgcGFyYW1LZXkgKyddJykuaW5uZXJUZXh0O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqW25hbWU9JysgcGFyYW1LZXkgKyddJykgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKltuYW1lPScrIHBhcmFtS2V5ICsnXScpLmhhc0F0dHJpYnV0ZSgnbGFiZWwnKSkge1xuXG4gICAgICAgICAgICAgICAgbGFiZWw9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKltuYW1lPScrIHBhcmFtS2V5ICsnXScpLmdldEF0dHJpYnV0ZSgnbGFiZWwnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHRhZ3NFbGUuZm9yRWFjaChmdW5jdGlvbih0ZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHlzcF90YWdzX25vdF9wcmludC5pbmRleE9mKCBwYXJhbUtleSApID09IC0xKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybSAqW25hbWU9JysgcGFyYW1LZXkgKyddJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZUlucHV0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdUYWdFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhZ1ZhbCA9IGRhdGFbcGFyYW1LZXldO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZUlucHV0LnRhZ05hbWUgPT0gJ1NFTEVDVCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnVmFsID0gZWxlSW5wdXQub3B0aW9uc1sgZWxlSW5wdXQuc2VsZWN0ZWRJbmRleCBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1LZXkubWF0Y2goJ3ByaWNlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnVmFsID0gJyQnK3RhZ1ZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1LZXkubWF0Y2goJ2xlbmd0aCcpICYmIHBhcmFtS2V5ICE9ICdsZW5ndGh1bml0JykgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWxlVW5pdCA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIFtuYW1lPWxlbmd0aHVuaXRdOmNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIGVsZVVuaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVVbml0ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gW25hbWU9bGVuZ3RodW5pdF0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWwgPSB0YWdWYWwgKycgJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlVW5pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnVmFsICs9IGVsZVVuaXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYWdFbGUuY2xhc3NOYW1lID0gJ2J0biBidG4tcHJpbWFyeSBidG4tc20geXNwLXRhZyc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGxhYmVsICE9IG51bGwgJiYgbGFiZWwgIT0gJ251bGwnICYmIGxhYmVsICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhZ0VsZS5pbm5lckhUTUwgPSB5c3BfdGVtcGxhdGVzLnlhY2h0X3RhZyhsYWJlbCwgdGFnVmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhZ0VsZS5pbm5lckhUTUwgPSB5c3BfdGVtcGxhdGVzLnlhY2h0X3RhZygnJywgdGFnVmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYWdFbGUuc2V0QXR0cmlidXRlKCdrZXknLCBwYXJhbUtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUuYXBwZW5kQ2hpbGQoIG5ld1RhZ0VsZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AtdGFnW2tleT1cIicrIHBhcmFtS2V5ICsnXCJdJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCgnLnlzcC10YWdba2V5PVwiJysgcGFyYW1LZXkgKydcIl0nKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzcGFuLnlzcC10YWdba2V5PVwiJysgcGFyYW1LZXkgKydcIl0nKS5mb3JFYWNoKGZ1bmN0aW9uKHlzcFRhZ0VsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlzcFRhZ0VsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdrZXknKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coa2V5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0RWxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gc2VsZWN0W25hbWU9Jysga2V5ICsnXSwgLnlzcC15YWNodC1zZWFyY2gtZm9ybSBpbnB1dFtuYW1lPScrIGtleSArJ10nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5wdXRFbGVzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRFbGVzLmZvckVhY2goZnVuY3Rpb24oZWxlSSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZWxlSS50eXBlICE9ICd1bmRlZmluZWQnICYmIChlbGVJLnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBlbGVJLnR5cGUgPT0gJ3JhZGlvJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlSS5jaGVja2VkPWZhbHNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVJLnZhbHVlPScnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RWxlc1swXS5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJmdW5jdGlvbiB5c3BfbWFya0xvdmVkVmVzc2VsKCBlbGVfY2FyZCApIHtcblxuICAgIGpRdWVyeSgnLmxvdmUnLCBlbGVfY2FyZCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgICAgIGpRdWVyeSh0aGlzKS50b2dnbGVDbGFzcygnbG92ZWQnKTtcblxuICAgICAgICBsZXQgeWFjaHRJZCA9IGpRdWVyeSh0aGlzKS5kYXRhKCd5YWNodC1pZCcpO1xuICAgIFxuICAgICAgICBpZiAoIGpRdWVyeSh0aGlzKS5oYXNDbGFzcygnbG92ZWQnKSApIHtcbiAgICAgICAgICAgIHlzcF9hZGRMb3ZlZFZlc3NlbCh5YWNodElkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHlzcF9yZW1vdmVMb3ZlZFZlc3NlbCh5YWNodElkKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykgIT0gXCJcIikge1xuXG4gICAgICAgIGxldCBsb3ZlZFZlc3NlbHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpKTtcblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzID09IG51bGwpIHtcbiAgICAgICAgICAgIGxvdmVkVmVzc2VscyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHlhY2h0SWQgPSBlbGVfY2FyZC5kYXRhKCd5YWNodC1pZCcpO1xuXG4gICAgICAgIGlmIChsb3ZlZFZlc3NlbHMuaW5kZXhPZiggeWFjaHRJZCApICE9IC0xKSB7XG5cbiAgICAgICAgICAgIGVsZV9jYXJkLmFkZENsYXNzKCdsb3ZlZCcpO1xuXG4gICAgICAgICAgICBqUXVlcnkoJy5sb3ZlJywgZWxlX2NhcmQpLmFkZENsYXNzKCdsb3ZlZCcpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHlzcF9hZGRMb3ZlZFZlc3NlbCggeWFjaHRJZCApIHtcblxuICAgIGxldCBsb3ZlZFZlc3NlbHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpKTtcblxuXG4gICAgICAgIGlmIChsb3ZlZFZlc3NlbHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgbG92ZWRWZXNzZWxzID0gW107XG4gICAgICAgIH1cblxuICAgIGlmIChsb3ZlZFZlc3NlbHMuaW5kZXhPZiggeWFjaHRJZCApID09IC0xKSB7XG5cbiAgICAgICAgbG92ZWRWZXNzZWxzLnB1c2goeWFjaHRJZCk7XG5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGFscmVhZHkgYWRkZWRcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhsb3ZlZFZlc3NlbHMgKTtcbiAgICBcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInlzcF9sb3ZlZF92ZXNzZWxzXCIsIEpTT04uc3RyaW5naWZ5KGxvdmVkVmVzc2VscykpO1xuXG59IFxuXG5mdW5jdGlvbiB5c3BfcmVtb3ZlTG92ZWRWZXNzZWwoIHlhY2h0SWQgKSB7XG5cbiAgICBsZXQgbG92ZWRWZXNzZWxzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSk7XG5cblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzID09IG51bGwpIHtcbiAgICAgICAgICAgIGxvdmVkVmVzc2VscyA9IFtdO1xuICAgICAgICB9XG5cbiAgICBsZXQgaW5kZXhlZCA9IGxvdmVkVmVzc2Vscy5pbmRleE9mKCB5YWNodElkICk7XG5cbiAgICBjb25zb2xlLmxvZyhpbmRleGVkKTtcblxuICAgIGlmIChpbmRleGVkICE9IC0xKSB7XG5cbiAgICAgICAgZGVsZXRlIGxvdmVkVmVzc2Vsc1tpbmRleGVkXTsgICAgICAgIFxuICAgICAgICBsb3ZlZFZlc3NlbHMuc3BsaWNlKGluZGV4ZWQsIDEpO1xuXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBhbHJlYWR5IGFkZGVkXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2cobG92ZWRWZXNzZWxzICk7XG4gICAgXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ5c3BfbG92ZWRfdmVzc2Vsc1wiLCBKU09OLnN0cmluZ2lmeShsb3ZlZFZlc3NlbHMpKTtcblxufSIsInZhciBZU1BfVmVzc2VsQ29tcGFyZUxpc3Q9W107XG5cbmZ1bmN0aW9uIHlzcF9tYWtlQ29tcGFyZVZlc3NlbChlbGVfY2FyZCkge1xuXHQgXG5cdCBqUXVlcnkoJy5jb21wYXJlX3RvZ2dsZScsIGVsZV9jYXJkKS5jaGFuZ2UoZnVuY3Rpb24oZSkge1xuXHQgXHRjb25zb2xlLmxvZygnaG93ZHknKTtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgICAgIGpRdWVyeSh0aGlzKS50b2dnbGVDbGFzcygnYXJtZWQnKTtcblxuICAgICAgICBsZXQgeWFjaHRJZCA9IGVsZV9jYXJkLmRhdGEoJ3Bvc3QtaWQnKTtcbiAgICBcbiAgICAgICAgaWYgKCBqUXVlcnkodGhpcykuaGFzQ2xhc3MoJ2FybWVkJykgKSB7XG4gICAgICAgICAgICB5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0KHlhY2h0SWQpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGxldCB5YWNodElkID0gZWxlX2NhcmQuZGF0YSgncG9zdC1pZCcpO1xuXG4gICAgaWYgKFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkICkgIT0gLTEpIHtcblxuICAgICAgICBlbGVfY2FyZC5hZGRDbGFzcygnYXJtZWQnKTtcblxuICAgICAgICBqUXVlcnkoJy5jb21wYXJlX3RvZ2dsZScsIGVsZV9jYXJkKS5hZGRDbGFzcygnYXJtZWQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHlzcF9hZGRWZXNzZWxUb0NvbXBhcmVMaXN0KHlhY2h0SWQpIHtcblxuICAgIGlmIChZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZCApID09IC0xKSB7XG5cbiAgICBcdFlTUF9WZXNzZWxDb21wYXJlTGlzdC5wdXNoKHlhY2h0SWQpO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xufVxuICAgIFxuZnVuY3Rpb24geXNwX3JlbW92ZVZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCkge1xuXHRsZXQgaW5kZXhlZCA9IFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkIClcblxuXHRpZiAoIGluZGV4ZWQgIT0gLTEpIHtcblxuICAgIFx0ZGVsZXRlIFlTUF9WZXNzZWxDb21wYXJlTGlzdFtpbmRleGVkXTsgICAgICAgIFxuICAgICAgICBZU1BfVmVzc2VsQ29tcGFyZUxpc3Quc3BsaWNlKGluZGV4ZWQsIDEpO1xuICBcdFx0XG4gICAgfVxuXG4gICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xufVxuXG5mdW5jdGlvbiB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCkge1xuXG4gICAgaWYgKFlTUF9WZXNzZWxDb21wYXJlTGlzdC5sZW5ndGggPj0gMikge1xuICAgIFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lzcF9jb21wYXJlX2xpbmtvdXQnKS5ocmVmPXJhaV95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wicmFpeXMvY29tcGFyZS8/cG9zdElEPVwiK1lTUF9WZXNzZWxDb21wYXJlTGlzdC5qb2luKCcsJyk7XG5cbiAgICBcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0JykuaW5uZXJIVE1MPWA8YnV0dG9uIHR5cGU9XCJidXR0b25cIj5Db21wYXJlICggJHtZU1BfVmVzc2VsQ29tcGFyZUxpc3QubGVuZ3RofSApPC9idXR0b24+YDtcbiAgICAgICAgXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAncG9zdF9faW4nOiBZU1BfVmVzc2VsQ29tcGFyZUxpc3QsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHJhaV95c3BfYXBpLmNhbGxfYXBpKFwiUE9TVFwiLCBcInlhY2h0c1wiLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24oZGF0YV9yZXN1bHQpIHtcblxuICAgICAgICAgICAgZGF0YV9yZXN1bHQucmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBqUXVlcnkoJyN5c3AtY29tcGFyZS1wcmV2aWV3cycpLmFwcGVuZCggeXNwX3RlbXBsYXRlcy55YWNodC5jb21wYXJlX3ByZXZpZXcoaXRlbSwgcGFyYW1zKSApO1xuXG4gICAgICAgICAgICAgICAgbGV0IGVsZV9wcmV2aWV3ID0galF1ZXJ5KCcjeXNwLWNvbXBhcmUtcHJldmlld3MgW2RhdGEtcG9zdC1pZD0nKyBpdGVtLl9wb3N0SUQgKyddJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcucmVtb3ZlLWZyb20tY29tcGFyZScsIGVsZV9wcmV2aWV3KS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hlbGxvJyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlX2NhcmQgPSBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdyBbZGF0YS1wb3N0LWlkPScrIGl0ZW0uX3Bvc3RJRCArJ10nKTtcblxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJy5jb21wYXJlX3RvZ2dsZScsIGVsZV9jYXJkKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnJlbW92ZUNsYXNzKCdhcm1lZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0KGl0ZW0uX3Bvc3RJRCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKTtcblxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgalF1ZXJ5KCcjeXNwLWNvbXBhcmUtcHJldmlld3MnKS5odG1sKCcnKTtcbiAgICAgICAgalF1ZXJ5KCcjeXNwX2NvbXBhcmVfbGlua291dCcpLmh0bWwoJycpO1xuICAgIH1cblxuXG5cblxufVxuIiwiY29uc3QgeXNwQmVmb3JlWWFjaHRTZWFyY2ggPSBuZXcgRXZlbnQoXCJ5c3AtYmVmb3JlLXN1Ym1pdHRpbmcteWFjaHQtc2VhcmNoXCIpO1xuY29uc3QgeXNwQWZ0ZXJZYWNodFNlYXJjaCA9IG5ldyBFdmVudChcInlzcC1hZnRlci1zdWJtaXR0aW5nLXlhY2h0LXNlYXJjaFwiKTtcblxuZnVuY3Rpb24geXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKGRhdGEpIHtcblxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5odG1sKCcnKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtcmVzdWx0LXNlY3Rpb24nKS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkZWQnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXJlc3VsdC1zZWN0aW9uJykuY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpO1xuXG4gICAgcmFpeXNfc2V0X2Zvcm1fdG9fZGF0YSggZGF0YSApO1xuXG4gICAgeXNwX21ha2VTZWFyY2hUYWdzKCBkYXRhICk7XG5cbiAgICAvLyBHRVQgQU5EIFdSSVRFXG4gICAgcmV0dXJuIHJhaV95c3BfYXBpLmNhbGxfYXBpKFwiUE9TVFwiLCBcInlhY2h0c1wiLCBkYXRhKS50aGVuKGZ1bmN0aW9uKGRhdGFfcmVzdWx0KSB7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1yZXN1bHQtc2VjdGlvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1yZXN1bHQtc2VjdGlvbicpLmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xuXG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gZGF0YV9yZXN1bHQuU0VPLnRpdGxlO1xuICAgICAgICBqUXVlcnkoJyN5c3Atc2VhcmNoLWhlYWRpbmcnKS50ZXh0KGRhdGFfcmVzdWx0LlNFTy5oZWFkaW5nKTtcbiAgICAgICAgalF1ZXJ5KCcjeXNwLXNlYXJjaC1wYXJhZ3JhcGgnKS50ZXh0KGRhdGFfcmVzdWx0LlNFTy5ncHRfcCk7XG5cbiAgICAgICAgalF1ZXJ5KCcjdG90YWwtcmVzdWx0cycpLnRleHQobmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1JTicsIHsgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzOiAzIH0pLmZvcm1hdChkYXRhX3Jlc3VsdC50b3RhbCkpO1xuXG4gICAgICAgIGxldCBjdXJyZW50VVJMPW51bGw7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLmRvbnRfcHVzaCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY3VycmVudFVSTD1yYWl5c19wdXNoX2hpc3RvcnkoIGRhdGEgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRVUkwgPSBsb2NhdGlvbi5ocmVmO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBqUXVlcnkoJyN5YWNodHMtcGFnaW5hdGlvbicpLmh0bWwoJycpO1xuXG4gICAgICAgIGlmIChkYXRhX3Jlc3VsdC50b3RhbCA+IDApIHtcblxuICAgICAgICAgICAgZGF0YV9yZXN1bHQucmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEudmlldyAhPSAndW5kZWZpbmVkJyAmJiBkYXRhLnZpZXcudG9Mb3dlckNhc2UoKSA9PSAnbGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQubGlzdChpdGVtLCBkYXRhKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQuZ3JpZChpdGVtLCBkYXRhKSApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBlbGVfY2FyZCA9IGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93IFtkYXRhLXBvc3QtaWQ9JysgaXRlbS5fcG9zdElEICsnXScpO1xuXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCdbZGF0YS1tb2RhbF0nLCBlbGVfY2FyZCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCB2ZXNzZWxJbmZvID0gaXRlbS5Nb2RlbFllYXIgKyAnICcgKyBpdGVtLk1ha2VTdHJpbmcgKyAnICcgKyBpdGVtLkJvYXROYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lhdGNoSGlkZGVuJykudmFsKHZlc3NlbEluZm8pO1xuXG4gICAgICAgICAgICAgICAgICB2YXIgZGF0YV9tb2RhbCA9IGpRdWVyeSh0aGlzKS5kYXRhKCdtb2RhbCcpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIGpRdWVyeSggZGF0YV9tb2RhbCApLnlzcF9tb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlVGV4dDogJ1gnLFxuICAgICAgICAgICAgICAgICAgICBtb2RhbENsYXNzOiAneXNwLW1vZGFsLW9wZW4nLFxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsYXNzOiAneXNwLW1vZGVsLWNsb3NlJ1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB5c3BfbWFya0xvdmVkVmVzc2VsKCBlbGVfY2FyZCApOyAgICAgXG4gICAgICAgICAgICAgICAgeXNwX21ha2VDb21wYXJlVmVzc2VsKCBlbGVfY2FyZCApOyAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgalF1ZXJ5KCcjeWFjaHRzLXBhZ2luYXRpb24nKS5wYWdpbmF0aW9uKHtcbiAgICAgICAgICAgICAgICBpdGVtczogZGF0YV9yZXN1bHQudG90YWwsXG4gICAgICAgICAgICAgICAgaXRlbXNPblBhZ2U6IDEyLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBkYXRhLnBhZ2VfaW5kZXgsXG4gICAgICAgICAgICAgICAgcHJldlRleHQ6IHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5wcmV2X3RleHQsXG4gICAgICAgICAgICAgICAgbmV4dFRleHQ6IHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5uZXh0X3RleHQsXG4gICAgICAgICAgICAgICAgZWRnZXM6IDQsXG4gICAgICAgICAgICAgICAgZGlzcGxheWVkUGFnZXM6IDQsXG4gICAgICAgICAgICAgICAgaHJlZlRleHRQcmVmaXg6IGN1cnJlbnRVUkwucmVwbGFjZShuZXcgUmVnRXhwKFwicGFnZV9pbmRleC0oXFxcXGQqKSgvKVwiLCBcImdcIiksIFwiXCIpKydwYWdlX2luZGV4LScsXG4gICAgICAgICAgICAgICAgaHJlZlRleHRTdWZmaXg6ICcvJyxcbiAgICAgICAgICAgICAgICBvblBhZ2VDbGljazogZnVuY3Rpb24ocGFnZU51bWJlciwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIGlucHV0W25hbWU9cGFnZV9pbmRleF0nKS52YWx1ZT1wYWdlTnVtYmVyO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3JtRGF0YU9iamVjdCA9IHJhaXlzX2dldF9mb3JtX2RhdGEoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0nKSApO1xuXG4gICAgICAgICAgICAgICAgICAgIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlcihmb3JtRGF0YU9iamVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgalF1ZXJ5KCcjc2VhcmNoLXJlc3VsdC1yb3cnKS5hcHBlbmQoeXNwX3RlbXBsYXRlcy5ub1Jlc3VsdHMoKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGpRdWVyeShbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSkuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IChqUXVlcnkoXCIuc2Nyb2xsLXRvLWhlcmUtb24teWFjaHQtc2VhcmNoXCIpLm9mZnNldCgpLnRvcClcbiAgICAgICAgfSwgMjUwKTtcblxuICAgICAgICByZXR1cm4gZGF0YV9yZXN1bHQ7XG5cbiAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcblxuICAgIH0pO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgIC8vIEZpbGwgTGlzdCBPcHRpb25zXG4gICAgbGV0IEZpbGxMaXN0cz1bXTtcbiAgICBsZXQgbGlzdEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRhdGFsaXN0W2RhdGEtZmlsbC1saXN0XVwiKTtcbiAgICBsZXQgbGlzdE5lZWRlZEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0W2xpc3RdXCIpO1xuXG4gICAgbGlzdEVsZW1lbnRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICBGaWxsTGlzdHMucHVzaChlbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtbGlzdCcpKTtcbiAgICB9KTtcblxuICAgIGxpc3ROZWVkZWRFbGVtZW50cy5mb3JFYWNoKChpbnB1dF9lbGUpID0+IHtcblxuICAgICAgICBpbnB1dF9lbGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgICAgICBsZXQgbGlzdF9pZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2xpc3QnKTtcblxuICAgICAgICAgICAgbGV0IGVsZV9saXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRhdGFsaXN0I1wiK2xpc3RfaWQpO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA8PSAzKSB7XG5cbiAgICAgICAgICAgICAgICByYWlfeXNwX2FwaS5jYWxsX2FwaShcbiAgICAgICAgICAgICAgICAgICAgJ1BPU1QnLCBcbiAgICAgICAgICAgICAgICAgICAgJ2xpc3Qtb3B0aW9ucy13aXRoLXZhbHVlJywgXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsczogWyBlbGVfbGlzdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1saXN0JykgXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGF0YWxpc3RbZGF0YS1maWxsLWxpc3Q9J1wiKyBsYWJlbCArXCInXVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0pO1xuXG4gICAgfSlcbiAgICBcbi8qICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpKCdQT1NUJywgJ2xpc3Qtb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxMaXN0c30pLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcbiAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRhdGFsaXN0W2RhdGEtZmlsbC1saXN0PSdcIisgbGFiZWwgK1wiJ11cIik7XG5cbiAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGUuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuKi9cbiAgICBsZXQgeWFjaHRTZWFyY2hBbmRSZXN1bHRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm06bm90KCN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtKScpO1xuXG4gICAgaWYgKHlhY2h0U2VhcmNoQW5kUmVzdWx0cykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Blbi1tb2JpbGUtc2VhcmNoJykuZm9yRWFjaCgob21zZSkgPT4ge1xuICAgICAgICAgICAgb21zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3Atc3VwZXItbW9iaWxlLXNlYXJjaCcpLnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3dZPSdoaWRkZW4nO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuYWRkKCd5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1vcGVuJyk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9iaWxlLXNlYXJjaCcpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9iaWxlLXNlYXJjaCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1zdXBlci1tb2JpbGUtc2VhcmNoJykuc3R5bGUuZGlzcGxheT0nbm9uZSc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93WT0ndW5zZXQnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QucmVtb3ZlKCd5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1vcGVuJyk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICB5YWNodFNlYXJjaEFuZFJlc3VsdHMuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KHlzcEJlZm9yZVlhY2h0U2VhcmNoKTtcblxuICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPTE7XG5cbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSByYWl5c19nZXRfZm9ybV9kYXRhKGUudGFyZ2V0KTtcblxuICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKS50aGVuKGZ1bmN0aW9uKGFwaV9kYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KHlzcEFmdGVyWWFjaHRTZWFyY2gpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTsgXG5cbiAgICAgICAgeWFjaHRTZWFyY2hBbmRSZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LnN1Ym1pdC1vbi1jaGFuZ2UnKS5mb3JFYWNoKChlbGVJbnB1dCkgPT4ge1xuICAgICAgICAgICAgZWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHlhY2h0U2VhcmNoQW5kUmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPXJlc2V0XScpLmZvckVhY2goKGVsZVJlc2V0KSA9PiB7XG4gICAgICAgICAgICBlbGVSZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInlzX2NvbXBhbnlfb25seVwiXScpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwieXNfY29tcGFueV9vbmx5XCJdJykuZm9yRWFjaChmdW5jdGlvbihlbGVDaGVjaykge1xuICAgICAgICAgICAgICAgIGVsZUNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT12aWV3XVtmb3JtPXlzcC15YWNodC1zZWFyY2gtZm9ybV0sIHNlbGVjdFtuYW1lPXNvcnRieV1bZm9ybT15c3AteWFjaHQtc2VhcmNoLWZvcm1dJykuZm9yRWFjaCgoZWxlVmlld09wdGlvbikgPT4ge1xuICAgICAgICAgICAgZWxlVmlld09wdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBpY2stYWxsJykuZm9yRWFjaChmdW5jdGlvbihlbGUpIHtcbiAgICAgICAgICAgIGVsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIGxldCBpbnB1dF9uYW1lID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwiJysgaW5wdXRfbmFtZSArJ1wiXScpLmZvckVhY2goKGVsZUlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZUlucHV0LmNoZWNrZWQ9ZmFsc2U7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFBSRVRUWSBVUkxcbiAgICAgICAgbGV0IHN0cnBhdGhzPXdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgICAgIHN0cnBhdGhzPXN0cnBhdGhzLnJlcGxhY2UocmFpX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3BhZ2VfaWQsICcnKTtcblxuICAgICAgICBsZXQgcGF0aHMgPSBzdHJwYXRocy5zcGxpdChcIi9cIik7XG5cbiAgICAgICAgbGV0IHByZXR0eV91cmxfcGF0aF9wYXJhbXM9e307XG5cbiAgICAgICAgcGF0aHMuZm9yRWFjaChmdW5jdGlvbihwYXRoKSB7XG5cbiAgICAgICAgICAgIGlmIChwYXRoICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBoYXNlX3BhdGggPSBwYXRoLnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgbGV0IG9ubHlfdmFscz1waGFzZV9wYXRoLnNsaWNlKDEpO1xuXG4gICAgICAgICAgICAgICAgb25seV92YWxzPW9ubHlfdmFscy5qb2luKCcgJykuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IG9ubHlfdmFsc19hcnJheT0ob25seV92YWxzLnNwbGl0KCcrJykpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvbmx5X3ZhbHNfYXJyYXlbMV0gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb25seV92YWxzID0gb25seV92YWxzX2FycmF5Lm1hcCgob3YpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvdi5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhvbmx5X3ZhbHMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV09b25seV92YWxzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2cocHJldHR5X3VybF9wYXRoX3BhcmFtcyk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSBGaWVsZHNcblxuICAgICAgICBsZXQgVVJMUkVGPW5ldyBVUkwobG9jYXRpb24uaHJlZik7IC8vIG1heWJlIGZvciBhIHJlLWRvXG5cbiAgICAgICAgbGV0IGZvcm1JbnB1dHM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AteWFjaHQtc2VhcmNoLWZvcm1cIl0sICN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm1cIl0nKTtcblxuICAgICAgICBmb3JtSW5wdXRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGlucHV0ID0gZWxlO1xuXG4gICAgICAgICAgICBsZXQgbmFtZSA9IGVsZS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICAgICAgbGV0IHVybFZhbCA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCBuYW1lICk7XG4gICAgICAgICAgICAgICAgLy8gdXJsVmFsID0gO1xuICAgXG5cbiAgICAgICAgICAgIGxldCBoYXNQcmV0dHkgPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF07XG5cbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYXNQcmV0dHkgIT0gJ251bGwnICYmIHR5cGVvZiBoYXNQcmV0dHkgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGhhc1ByZXR0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhoYXNQcmV0dHkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGhhc1ByZXR0eS5mb3JFYWNoKChoUCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoUCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaGFzUHJldHR5ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUgIT0gJ2NoZWNrYm94JyAmJiBpbnB1dC50eXBlICE9ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gaGFzUHJldHR5O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHVybFZhbCAhPSAnJyAmJiB1cmxWYWwgIT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmxWYWwgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsVmFsID0gdXJsVmFsLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSB1cmxWYWwgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZSAhPSAnY2hlY2tib3gnICYmIGlucHV0LnR5cGUgIT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHVybFZhbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRmlsbCBvcHRpb25zXG4gICAgICAgIGxldCBGaWxsT3B0aW9ucz1bXTtcbiAgICAgICAgbGV0IHNlbGVjdG9yRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zXVwiKTtcblxuICAgICAgICBzZWxlY3RvckVsZW1lbnRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgRmlsbE9wdGlvbnMucHVzaChlbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtb3B0aW9ucycpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByYWlfeXNwX2FwaS5jYWxsX2FwaSgnUE9TVCcsICdkcm9wZG93bi1vcHRpb25zJywge2xhYmVsczogRmlsbE9wdGlvbnN9KS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFtkYXRhLWZpbGwtb3B0aW9ucz0nXCIrIGxhYmVsICtcIiddXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coU2VsZWN0b3JFbGUpO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBTZWxlY3RvckVsZVswXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUuYWRkKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IFVSTFJFRiA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgICAgICAgbGV0IFVybFZhbCA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCBuYW1lICk7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3RycGF0aHM9d2luZG93LmxvY2F0aW9uLmhyZWY7XG5cbiAgICAgICAgICAgICAgICBzdHJwYXRocz1zdHJwYXRocy5yZXBsYWNlKHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF9wYWdlX2lkLCAnJyk7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSBzdHJwYXRocy5zcGxpdChcIi9cIik7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5X3VybF9wYXRoX3BhcmFtcz17fTtcblxuICAgICAgICAgICAgICAgIHBhdGhzLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXRoICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGhhc2VfcGF0aCA9IHBhdGguc3BsaXQoJy0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHM9cGhhc2VfcGF0aC5zbGljZSgxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXT1vbmx5X3ZhbHMuam9pbignICcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoVXJsVmFsICE9ICcnICYmIFVybFZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coVXJsVmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIFVybFZhbCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVXJsVmFsID0gVXJsVmFsLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBVcmxWYWw7IFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlLnZhbHVlID09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gVXJsVmFsLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGhhc1ByZXR0eSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXTtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzUHJldHR5ICE9ICcnICYmIGhhc1ByZXR0eSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gaGFzUHJldHR5OyBcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS52YWx1ZSA9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IGhhc1ByZXR0eS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFJlbmRlciBZYWNodHMgRm9yIFBhZ2UgTG9hZFxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHJhaXlzX2dldF9mb3JtX2RhdGEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtcy55c195YWNodHNfbG92ZWQgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcy55c195YWNodHNfbG92ZWQpO1xuXG4gICAgICAgICAgICAgICAgcGFyYW1zLnlzX29ubHlfdGhlc2U9SlNPTi5wYXJzZSggbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykgKS5qb2luKCcsJyk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKTsgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBtb2JpbGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0nKTtcblxuICAgICAgICBpZiAobW9iaWxlRm9ybSkge1xuICAgICAgICAgICAgbW9iaWxlRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPTE7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXN1cGVyLW1vYmlsZS1zZWFyY2gnKS5zdHlsZS5kaXNwbGF5PSdub25lJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3dZPSd1bnNldCc7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7ICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoIHBhcmFtcyApO1xuXG4gICAgICAgICAgICB9KTsgXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgIH1cblxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChlLCBhcGlFbmRwb2ludCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGZvcm1EYXRhID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7XG4gICAgICAgIGxldCBzdWNjZXNzTWVzc2FnZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnN1Y2Nlc3MtbWVzc2FnZScpO1xuICAgICAgICBjb25zb2xlLmxvZyhmb3JtRGF0YSlcbiAgICAgICAgcmFpX3lzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIGFwaUVuZHBvaW50LCBmb3JtRGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGFfcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgc3VjY2Vzc01lc3NhZ2Uuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgeWFjaHRGb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaW5nbGUteWFjaHQtZGV0aWxzLWxlYWQnKTtcbiAgICB5YWNodEZvcm1zLmZvckVhY2goKGZFbGUpID0+IHtcbiAgICAgICAgZkVsZS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVTdWJtaXQoZSwgXCJ5YWNodC1sZWFkc1wiKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgYnJva2VyRm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2luZ2xlLWJyb2tlci1kZXRpbHMtbGVhZCcpO1xuICAgIGJyb2tlckZvcm1zLmZvckVhY2goKGZFbGUpID0+IHtcbiAgICAgICAgZkVsZS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVTdWJtaXQoZSwgXCJicm9rZXItbGVhZHNcIik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=
