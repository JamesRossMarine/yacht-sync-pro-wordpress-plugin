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
  return "\n\t\t\t<div class=\"yacht-result-grid-item list-view\" data-post-id=\"".concat(vessel._postID, "\" data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t<div class=\"yacht-main-image-container\">\n\t\t\t\t\t<a class=\"yacht-details\" href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t<img class=\"yacht-main-image\" src=\"").concat(vessel.Images ? vessel.Images[0].Uri : vessel.Images ? vessel.Images[0].Uri : rai_yacht_sync.assets_url + 'images/default-yacht-image.jpeg', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t\t\t<svg class=\"like-me love\" xmlns=\"http://www.w3.org/2000/svg\" width=\"57\" height=\"54\" viewBox=\"0 0 57 54\" fill=\"none\"  data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t\t\t  <g filter=\"url(#filter0_d_2888_4333)\">\n\t\t\t\t\t\t    <path d=\"M34.7028 11.5755C36.2094 11.5755 37.6251 12.1699 38.6898 13.2488L38.8223 13.383C41.0206 15.6116 41.0206 19.2375 38.8223 21.466L38.0992 22.199L27.4995 32.9442L18.4883 23.808L16.9011 22.199L16.178 21.466C13.9797 19.2375 13.9797 15.6116 16.178 13.383L16.3083 13.2509C17.3739 12.1708 18.79 11.5759 20.2962 11.5764C21.8023 11.5764 23.2176 12.1708 24.2819 13.2492L25.005 13.9822L27.4991 16.5101L29.9928 13.9818L30.7158 13.2488C31.7801 12.1699 33.1962 11.5755 34.7028 11.5755ZM34.7028 8C32.357 8 30.0112 8.9068 28.2222 10.7204L27.4991 11.4534L26.776 10.7204C24.9878 8.90723 22.642 8.00043 20.297 8C17.9508 8 15.605 8.90723 13.8147 10.7221L13.6844 10.8542C10.1046 14.4832 10.1046 20.3645 13.6844 23.9935L14.4074 24.7265L15.9946 26.3354L27.4995 38L40.5933 24.7265L41.3164 23.9935C44.8945 20.3663 44.8945 14.4814 41.3164 10.8542L41.1839 10.72C39.3945 8.9068 37.0486 8 34.7028 8Z\" fill=\"white\"></path>\n\t\t\t\t\t\t  </g>\n\t\t\t\t\t\t  <defs>\n\t\t\t\t\t\t    <filter id=\"filter0_d_2888_4333\" x=\"-0.000488281\" y=\"0\" width=\"57.0005\" height=\"54\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n\t\t\t\t\t\t      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood>\n\t\t\t\t\t\t      <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"></feColorMatrix>\n\t\t\t\t\t\t      <feOffset dx=\"1\" dy=\"4\"></feOffset>\n\t\t\t\t\t\t      <feGaussianBlur stdDeviation=\"6\"></feGaussianBlur>\n\t\t\t\t\t\t      <feComposite in2=\"hardAlpha\" operator=\"out\"></feComposite>\n\t\t\t\t\t\t      <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"></feColorMatrix>\n\t\t\t\t\t\t      <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_2888_4333\"></feBlend>\n\t\t\t\t\t\t      <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_2888_4333\" result=\"shape\"></feBlend>\n\t\t\t\t\t\t    </filter>\n\t\t\t\t\t\t  </defs>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"yacht-general-info-container\">\n\t\t\t\t\t<div class=\"yacht-title-container\">\n\t\t\t\t\t\t<a class=\"yacht-details\" href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t\t<h6 class=\"yacht-title\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', " ").concat(vessel.BoatName ? vessel.BoatName : '', "</h6>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-info-container\">\n\t\t\t\t\t\t<div class=\"yacht-info\">\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Year</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.ModelYear ? vessel.ModelYear : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Cabins</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.CabinsCountNumeric ? vessel.CabinsCountNumeric : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Builder</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(vessel.MakeString ? vessel.MakeString : 'N/A', "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Length</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\">").concat(length, "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"yacht-individual-container\">\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-title\">Compare</p>\n\t\t\t\t\t\t\t\t<p class=\"yacht-individual-value\"><input type=\"checkbox\" class=\"compare_toggle\" name=\"compare\" value=\"").concat(vessel._postID, "\" /></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"yacht-price-details-container\">\n\t\t\t\t\t\t<div class=\"yacht-price-container\">\n\t\t\t\t\t\t\t<p class=\"yacht-price\">").concat(price, "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<button class=\"yacht-download-button\" type=\"button\" data-modal=\"#single-share\">Contact</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t");
};
ysp_templates.yacht.compare_preview = function (vessel, params) {
  return "\n\n\t\t\t<div class=\"ysp-yacht-compare-preview\" data-post-id=\"".concat(vessel._postID, "\" data-yacht-id=\"").concat(vessel.DocumentID, "\">\t\t\t\n\t\t\t\t<span class=\"remove-from-compare\">\n\t\t\t\t\t<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t<rect x=\"0.5\" y=\"0.5\" width=\"23\" height=\"23\" rx=\"11.5\" stroke=\"#FFFFFF\"/>\n\t\t\t\t\t<path d=\"M8.26876 14.9346C8.04909 15.1543 8.04909 15.5104 8.26876 15.7301C8.48843 15.9498 8.84458 15.9498 9.06425 15.7301L8.26876 14.9346ZM12.3976 12.3968C12.6173 12.1771 12.6173 11.8209 12.3976 11.6013C12.1779 11.3816 11.8218 11.3816 11.6021 11.6013L12.3976 12.3968ZM11.6018 11.6016C11.3821 11.8213 11.3821 12.1774 11.6018 12.3971C11.8214 12.6168 12.1776 12.6168 12.3973 12.3971L11.6018 11.6016ZM15.7306 9.06376C15.9503 8.84409 15.9503 8.48794 15.7306 8.26827C15.5109 8.0486 15.1548 8.0486 14.9351 8.26827L15.7306 9.06376ZM12.3973 11.6013C12.1776 11.3816 11.8214 11.3816 11.6018 11.6013C11.3821 11.8209 11.3821 12.1771 11.6018 12.3968L12.3973 11.6013ZM14.9351 15.7301C15.1548 15.9498 15.5109 15.9498 15.7306 15.7301C15.9503 15.5104 15.9503 15.1543 15.7306 14.9346L14.9351 15.7301ZM11.6021 12.3971C11.8218 12.6168 12.1779 12.6168 12.3976 12.3971C12.6173 12.1774 12.6173 11.8213 12.3976 11.6016L11.6021 12.3971ZM9.06425 8.26827C8.84458 8.0486 8.48843 8.0486 8.26876 8.26827C8.04909 8.48794 8.04909 8.84409 8.26876 9.06376L9.06425 8.26827ZM9.06425 15.7301L12.3976 12.3968L11.6021 11.6013L8.26876 14.9346L9.06425 15.7301ZM12.3973 12.3971L15.7306 9.06376L14.9351 8.26827L11.6018 11.6016L12.3973 12.3971ZM11.6018 12.3968L14.9351 15.7301L15.7306 14.9346L12.3973 11.6013L11.6018 12.3968ZM12.3976 11.6016L9.06425 8.26827L8.26876 9.06376L11.6021 12.3971L12.3976 11.6016Z\" fill=\"#FFFFFF\"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</span>\n\n\n\t\t\t\t<img class=\"yacht-main-image\" src=\"").concat(vessel.Images ? vessel.Images[0].Uri : rai_yacht_sync.assets_url + 'images/default-yacht-image.jpeg', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t<a class=\"preview-link\" href=\"").concat(vessel._link, "\">\n\t\t\t\t\t<h6 class=\"yacht-title\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', " ").concat(vessel.BoatName ? vessel.BoatName : '', "</h6>\n\t\t\t\t</a>\n\n\t\t\t</div>\n\n\t\t");
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
    document.getElementById('ysp_compare_linkout_mobile').href = rai_yacht_sync.wp_rest_url + "raiys/compare/?postID=" + YSP_VesselCompareList.join(',');
    document.getElementById('ysp_compare_linkout_mobile').innerHTML = "<button type=\"button\">Compare ( ".concat(YSP_VesselCompareList.length, " )</button>");
    var params = {
      'post__in': YSP_VesselCompareList
    };
    return rai_ysp_api.call_api("POST", "yachts", params).then(function (data_result) {
      jQuery('#ysp-compare-previews').html('');
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
    jQuery('#ysp-search-paragraph').text(data_result.SEO.p);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS1wYWdpbmF0aW9uLmpzIiwianF1ZXJ5LW1vZGFsLmpzIiwid2hhdGV2ZXIuanMiLCJjb21tb24uanMiLCJhcGktY2xpZW50LmpzIiwidGVtcGxhdGVzLmpzIiwiZmlsbC1maWVsZHMuanMiLCJ5YWNodFNlYXJjaFRhZ3MuanMiLCJ5YWNodFNlYXJjaExvdmVkLmpzIiwieWFjaHRTZWFyY2hDb21wYXJlLmpzIiwieWFjaHRTZWFyY2guanMiLCJsZWFkcy5qcyJdLCJuYW1lcyI6WyIkIiwibWV0aG9kcyIsImluaXQiLCJvcHRpb25zIiwibyIsImV4dGVuZCIsIml0ZW1zIiwiaXRlbXNPblBhZ2UiLCJwYWdlcyIsImRpc3BsYXllZFBhZ2VzIiwiZWRnZXMiLCJjdXJyZW50UGFnZSIsInVzZUFuY2hvcnMiLCJocmVmVGV4dFByZWZpeCIsImhyZWZUZXh0U3VmZml4IiwicHJldlRleHQiLCJuZXh0VGV4dCIsImVsbGlwc2VUZXh0IiwiZWxsaXBzZVBhZ2VTZXQiLCJjc3NTdHlsZSIsImxpc3RTdHlsZSIsImxhYmVsTWFwIiwic2VsZWN0T25DbGljayIsIm5leHRBdEZyb250IiwiaW52ZXJ0UGFnZU9yZGVyIiwidXNlU3RhcnRFZGdlIiwidXNlRW5kRWRnZSIsIm9uUGFnZUNsaWNrIiwicGFnZU51bWJlciIsImV2ZW50Iiwib25Jbml0Iiwic2VsZiIsIk1hdGgiLCJjZWlsIiwiaGFsZkRpc3BsYXllZCIsImVhY2giLCJhZGRDbGFzcyIsImRhdGEiLCJfZHJhdyIsImNhbGwiLCJzZWxlY3RQYWdlIiwicGFnZSIsIl9zZWxlY3RQYWdlIiwicHJldlBhZ2UiLCJuZXh0UGFnZSIsImdldFBhZ2VzQ291bnQiLCJzZXRQYWdlc0NvdW50IiwiY291bnQiLCJnZXRDdXJyZW50UGFnZSIsImRlc3Ryb3kiLCJlbXB0eSIsImRyYXdQYWdlIiwicmVkcmF3IiwiZGlzYWJsZSIsImRpc2FibGVkIiwiZW5hYmxlIiwidXBkYXRlSXRlbXMiLCJuZXdJdGVtcyIsIl9nZXRQYWdlcyIsInVwZGF0ZUl0ZW1zT25QYWdlIiwiZ2V0SXRlbXNPblBhZ2UiLCJpbnRlcnZhbCIsIl9nZXRJbnRlcnZhbCIsImkiLCJ0YWdOYW1lIiwicHJvcCIsImF0dHIiLCIkcGFuZWwiLCJhcHBlbmRUbyIsIl9hcHBlbmRJdGVtIiwidGV4dCIsImNsYXNzZXMiLCJzdGFydCIsImVuZCIsIm1pbiIsImFwcGVuZCIsImJlZ2luIiwibWF4IiwiX2VsbGlwc2VDbGljayIsInBhZ2VJbmRleCIsIm9wdHMiLCIkbGluayIsIiRsaW5rV3JhcHBlciIsIiR1bCIsImZpbmQiLCJsZW5ndGgiLCJjbGljayIsIiRlbGxpcCIsInBhcmVudCIsInJlbW92ZUNsYXNzIiwiJHRoaXMiLCJ2YWwiLCJwYXJzZUludCIsInByZXYiLCJodG1sIiwiZm9jdXMiLCJzdG9wUHJvcGFnYXRpb24iLCJrZXl1cCIsIndoaWNoIiwiYmluZCIsImZuIiwicGFnaW5hdGlvbiIsIm1ldGhvZCIsImNoYXJBdCIsImFwcGx5IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFyZ3VtZW50cyIsIl90eXBlb2YiLCJlcnJvciIsImpRdWVyeSIsImZhY3RvcnkiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIndpbmRvdyIsImRvY3VtZW50IiwidW5kZWZpbmVkIiwibW9kYWxzIiwiZ2V0Q3VycmVudCIsInNlbGVjdEN1cnJlbnQiLCJzZWxlY3RlZCIsIiRibG9ja2VyIiwidG9nZ2xlQ2xhc3MiLCJ5c3BfbW9kYWwiLCJlbCIsInJlbW92ZSIsInRhcmdldCIsIiRib2R5IiwiZGVmYXVsdHMiLCJkb0ZhZGUiLCJpc05hTiIsImZhZGVEdXJhdGlvbiIsImNsb3NlRXhpc3RpbmciLCJpc0FjdGl2ZSIsImNsb3NlIiwicHVzaCIsImlzIiwiYW5jaG9yIiwidGVzdCIsIiRlbG0iLCJvcGVuIiwibW9kYWwiLCJlbG0iLCJzaG93U3Bpbm5lciIsInRyaWdnZXIiLCJBSkFYX1NFTkQiLCJnZXQiLCJkb25lIiwiQUpBWF9TVUNDRVNTIiwiY3VycmVudCIsIm9uIiwiQ0xPU0UiLCJoaWRlU3Bpbm5lciIsIkFKQVhfQ09NUExFVEUiLCJmYWlsIiwiQUpBWF9GQUlMIiwicG9wIiwiY29uc3RydWN0b3IiLCJtIiwiYmxvY2siLCJibHVyIiwic2V0VGltZW91dCIsInNob3ciLCJmYWRlRGVsYXkiLCJvZmYiLCJlc2NhcGVDbG9zZSIsImNsaWNrQ2xvc2UiLCJlIiwidW5ibG9jayIsImhpZGUiLCJCRUZPUkVfQkxPQ0siLCJfY3R4IiwiY3NzIiwiYmxvY2tlckNsYXNzIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJCTE9DSyIsIm5vdyIsImZhZGVPdXQiLCJjaGlsZHJlbiIsIkJFRk9SRV9PUEVOIiwic2hvd0Nsb3NlIiwiY2xvc2VCdXR0b24iLCJjbG9zZUNsYXNzIiwiY2xvc2VUZXh0IiwibW9kYWxDbGFzcyIsImRpc3BsYXkiLCJPUEVOIiwiQkVGT1JFX0NMT1NFIiwiX3RoaXMiLCJBRlRFUl9DTE9TRSIsInNwaW5uZXIiLCJzcGlubmVySHRtbCIsIiRhbmNob3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlYWR5IiwiY29uc29sZSIsImxvZyIsImRhdGFfbW9kYWwiLCJjb3B5TGluayIsImNvcHlUZXh0IiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3QiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImV4ZWNDb21tYW5kIiwiYWxlcnQiLCJ2YWx1ZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsIm1hcCIsInMiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0cmluZyIsImpvaW4iLCJlbnVtZXJhYmxlIiwicmFpeXNfZ2V0X2Zvcm1fZGF0YSIsImZvcm1fZWxlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImZkIiwiZnJvbUVudHJpZXMiLCJlbnRyaWVzIiwiX2kiLCJfT2JqZWN0JGVudHJpZXMiLCJfT2JqZWN0JGVudHJpZXMkX2kiLCJfc2xpY2VkVG9BcnJheSIsImZJbmRleCIsImZpZWxkIiwiVmFsQXJyYXkiLCJnZXRBbGwiLCJyYWl5c19zZXRfZm9ybV90b19kYXRhIiwiaW5wdXREYXRhIiwiZm9ybUEiLCJxdWVyeVNlbGVjdG9yIiwiZm9ybUIiLCJyZXNldCIsImZvcm1JbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZSIsImlucHV0IiwibmFtZSIsImdldEF0dHJpYnV0ZSIsImhhc1ByZXR0eSIsImlzQXJyYXkiLCJoUCIsInR5cGUiLCJjaGVja2VkIiwicmFpeXNfcHVzaF9oaXN0b3J5Iiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwic3RycGF0aCIsInByb3BlcnR5IiwiaXQiLCJzZXQiLCJ0b1N0cmluZyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJyYWlfeWFjaHRfc3luYyIsInlhY2h0X3NlYXJjaF91cmwiLCJyYWlfeXNwX2FwaSIsImNhbGxfYXBpIiwicGF0aCIsInBhc3NpbmdfZGF0YSIsInhodHRwIiwiWE1MSHR0cFJlcXVlc3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZURhdGEiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJfcXVlc3Rpb25NYXJrIiwid3BfcmVzdF91cmwiLCJzZW5kIiwic2V0UmVxdWVzdEhlYWRlciIsInN0cmluZ2lmeSIsInlzcF90ZW1wbGF0ZXMiLCJ5YWNodCIsImdyaWQiLCJ2ZXNzZWwiLCJwYXJhbXMiLCJtZXRlcnMiLCJOb21pbmFsTGVuZ3RoIiwicHJpY2UiLCJldXJvcGVfb3B0aW9uX3BpY2tlZCIsInRvRml4ZWQiLCJZU1BfRXVyb1ZhbCIsImNvbmNhdCIsIkludGwiLCJOdW1iZXJGb3JtYXQiLCJtaW5pbXVtRnJhY3Rpb25EaWdpdHMiLCJmb3JtYXQiLCJjdXJyZW5jeSIsIllTUF9VU0RWYWwiLCJfcG9zdElEIiwiRG9jdW1lbnRJRCIsIl9saW5rIiwiSW1hZ2VzIiwiVXJpIiwiYXNzZXRzX3VybCIsIkNvbXBhbnlOYW1lIiwiY29tcGFueV9uYW1lIiwiY29tcGFueV9sb2dvIiwiTW9kZWxZZWFyIiwiTWFrZVN0cmluZyIsIk1vZGVsIiwiQm9hdE5hbWUiLCJDYWJpbnNDb3VudE51bWVyaWMiLCJsaXN0IiwiUHJpY2UiLCJldXJvX2NfYyIsImNvbXBhcmVfcHJldmlldyIsIm5vUmVzdWx0cyIsInlhY2h0X3RhZyIsImxhYmVsIiwibmV4dF90ZXh0IiwicHJldl90ZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVsZV9xdWlja19zZWFyY2giLCJGaWxsT3B0aW9ucyIsInNlbGVjdG9yRWxlbWVudHMiLCJsYWJlbHMiLCJ0aGVuIiwick9wdGlvbnMiLCJfbG9vcCIsIlNlbGVjdG9yRWxlIiwiYiIsIm9wdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJVUkxSRUYiLCJVUkwiLCJsb2NhdGlvbiIsImhyZWYiLCJVcmxWYWwiLCJzdHJwYXRocyIsInJlcGxhY2UiLCJ5YWNodF9zZWFyY2hfcGFnZV9pZCIsInBhdGhzIiwicHJldHR5X3VybF9wYXRoX3BhcmFtcyIsInBoYXNlX3BhdGgiLCJvbmx5X3ZhbHMiLCJlYWNoV29yZENhcGl0YWxpemUiLCJ5c3BfbWFrZVNlYXJjaFRhZ3MiLCJ0YWdzRWxlIiwidGUiLCJpbm5lckhUTUwiLCJ5c3BfdGFnc19ub3RfcHJpbnQiLCJfbG9vcDIiLCJwYXJhbUtleSIsImlubmVyVGV4dCIsImhhc0F0dHJpYnV0ZSIsImluZGV4T2YiLCJlbGVJbnB1dCIsIm5ld1RhZ0VsZSIsInRhZ1ZhbCIsInNlbGVjdGVkSW5kZXgiLCJtYXRjaCIsImVsZVVuaXQiLCJjbGFzc05hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInlzcFRhZ0VsZSIsImtleSIsImN1cnJlbnRUYXJnZXQiLCJpbnB1dEVsZXMiLCJlbGVJIiwiZm9ybSIsInJlcXVlc3RTdWJtaXQiLCJ5c3BfbWFya0xvdmVkVmVzc2VsIiwiZWxlX2NhcmQiLCJ5YWNodElkIiwiaGFzQ2xhc3MiLCJ5c3BfYWRkTG92ZWRWZXNzZWwiLCJ5c3BfcmVtb3ZlTG92ZWRWZXNzZWwiLCJ5c195YWNodHNfbG92ZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibG92ZWRWZXNzZWxzIiwic2V0SXRlbSIsImluZGV4ZWQiLCJzcGxpY2UiLCJZU1BfVmVzc2VsQ29tcGFyZUxpc3QiLCJ5c3BfcmVzdG9yZUNvbXBhcmVzIiwiY29tcGFyZV9wb3N0X2lkcyIsInlzcF9tYWtlQ29tcGFyZUxpbmtvdXQiLCJ5c3BfbWFrZUNvbXBhcmVWZXNzZWwiLCJjaGFuZ2UiLCJ5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCIsInlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0IiwiZGF0YV9yZXN1bHQiLCJyZXN1bHRzIiwiaXRlbSIsImVsZV9wcmV2aWV3IiwieXNwQmVmb3JlWWFjaHRTZWFyY2giLCJFdmVudCIsInlzcEFmdGVyWWFjaHRTZWFyY2giLCJ5c3BBZnRlclJlbmRlcmluZ1lhY2h0IiwieXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyIiwiY2xhc3NMaXN0IiwidGl0bGUiLCJTRU8iLCJoZWFkaW5nIiwicCIsIm1heGltdW1TaWduaWZpY2FudERpZ2l0cyIsInRvdGFsIiwiY3VycmVudFVSTCIsImRvbnRfcHVzaCIsInZpZXciLCJ2ZXNzZWxJbmZvIiwicGFnZV9pbmRleCIsIlJlZ0V4cCIsImZvcm1EYXRhT2JqZWN0IiwiZG9jdW1lbnRFbGVtZW50IiwiYm9keSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsImRpc3BhdGNoRXZlbnQiLCJGaWxsTGlzdHMiLCJsaXN0RWxlbWVudHMiLCJsaXN0TmVlZGVkRWxlbWVudHMiLCJpbnB1dF9lbGUiLCJsaXN0X2lkIiwiZWxlX2xpc3QiLCJfbG9vcDMiLCJ5YWNodFNlYXJjaEFuZFJlc3VsdHMiLCJvbXNlIiwic3R5bGUiLCJvdmVyZmxvd1kiLCJhcGlfZGF0YSIsImVsZVJlc2V0IiwiZWxlQ2hlY2siLCJlbGVWaWV3T3B0aW9uIiwiaW5wdXRfbmFtZSIsIm9ubHlfdmFsc19hcnJheSIsIm92IiwidXJsVmFsIiwiX2xvb3A0IiwibG92ZWRfeWFjaHRzIiwieXNfb25seV90aGVzZSIsIm1vYmlsZUZvcm0iLCJoYW5kbGVTdWJtaXQiLCJhcGlFbmRwb2ludCIsInN1Y2Nlc3NNZXNzYWdlIiwicGFyZW50RWxlbWVudCIsInlhY2h0Rm9ybXMiLCJmRWxlIiwiYnJva2VyRm9ybXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFBLFVBQUFBLENBQUEsRUFBQTtFQUVBLElBQUFDLE9BQUEsR0FBQTtJQUNBQyxJQUFBLEVBQUEsU0FBQUEsS0FBQUMsT0FBQSxFQUFBO01BQ0EsSUFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLE1BQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxXQUFBLEVBQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxjQUFBLEVBQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxXQUFBLEVBQUEsQ0FBQTtRQUNBQyxVQUFBLEVBQUEsSUFBQTtRQUNBQyxjQUFBLEVBQUEsUUFBQTtRQUNBQyxjQUFBLEVBQUEsRUFBQTtRQUNBQyxRQUFBLEVBQUEsTUFBQTtRQUNBQyxRQUFBLEVBQUEsTUFBQTtRQUNBQyxXQUFBLEVBQUEsVUFBQTtRQUNBQyxjQUFBLEVBQUEsSUFBQTtRQUNBQyxRQUFBLEVBQUEsYUFBQTtRQUNBQyxTQUFBLEVBQUEsRUFBQTtRQUNBQyxRQUFBLEVBQUEsRUFBQTtRQUNBQyxhQUFBLEVBQUEsSUFBQTtRQUNBQyxXQUFBLEVBQUEsS0FBQTtRQUNBQyxlQUFBLEVBQUEsS0FBQTtRQUNBQyxZQUFBLEVBQUEsSUFBQTtRQUNBQyxVQUFBLEVBQUEsSUFBQTtRQUNBQyxXQUFBLEVBQUEsU0FBQUEsWUFBQUMsVUFBQSxFQUFBQyxLQUFBLEVBQUE7VUFDQTtVQUNBO1FBQUEsQ0FDQTtRQUNBQyxNQUFBLEVBQUEsU0FBQUEsT0FBQSxFQUFB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LE1BQUEsQ0FBQXRGLFlBQUEsQ0FBQTFHLEdBQUEsQ0FBQWtHLElBQUEsQ0FBQTtNQUNBOztNQUdBLElBQUFFLFNBQUEsR0FBQXFHLHNCQUFBLENBQUF2RyxJQUFBLENBQUE7O01BRUE7O01BRUEsSUFBQSxPQUFBRSxTQUFBLElBQUEsTUFBQSxJQUFBLE9BQUFBLFNBQUEsSUFBQSxXQUFBLEVBQUE7UUFFQSxJQUFBL0ksS0FBQSxDQUFBZ0osT0FBQSxDQUFBRCxTQUFBLENBQUEsRUFBQTtVQUNBOztVQUVBQSxTQUFBLENBQUFMLE9BQUEsQ0FBQSxVQUFBTyxFQUFBLEVBQUE7WUFFQSxJQUFBLE9BQUFMLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLFdBQUEsS0FBQU4sS0FBQSxDQUFBTSxJQUFBLElBQUEsVUFBQSxJQUFBTixLQUFBLENBQUFNLElBQUEsSUFBQSxPQUFBLENBQUEsSUFBQU4sS0FBQSxDQUFBRSxZQUFBLENBQUEsT0FBQSxDQUFBLElBQUFHLEVBQUEsRUFBQTtjQUNBTCxLQUFBLENBQUFPLE9BQUEsR0FBQSxJQUFBO1lBQ0E7VUFHQSxDQUFBLENBQUE7UUFFQSxDQUFBLE1BQ0E7VUFFQSxJQUFBLE9BQUFQLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLFdBQUEsS0FBQU4sS0FBQSxDQUFBTSxJQUFBLElBQUEsVUFBQSxJQUFBTixLQUFBLENBQUFNLElBQUEsSUFBQSxPQUFBLENBQUEsSUFBQU4sS0FBQSxDQUFBRSxZQUFBLENBQUEsT0FBQSxDQUFBLElBQUFDLFNBQUEsRUFBQTtZQUNBSCxLQUFBLENBQUFPLE9BQUEsR0FBQSxJQUFBO1VBQ0EsQ0FBQSxNQUNBLElBQUFQLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLFVBQUEsSUFBQU4sS0FBQSxDQUFBTSxJQUFBLElBQUEsT0FBQSxFQUFBO1lBQ0FOLEtBQUEsQ0FBQXJDLEtBQUEsR0FBQXdDLFNBQUE7VUFDQTtRQUVBO01BRUE7TUFFQSxJQUFBdU0sTUFBQSxJQUFBLEVBQUEsSUFBQUEsTUFBQSxJQUFBLElBQUEsRUFBQTtRQUVBLElBQUEsT0FBQUEsTUFB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Z0JBQUEsQ0FBQSwyQkFBQSxDQUFBO0VBQ0FzTixVQUFBLENBQUFyTixPQUFBLENBQUEsVUFBQXNOLElBQUEsRUFBQTtJQUNBQSxJQUFBLENBQUFsSSxnQkFBQSxDQUFBLFFBQUEsRUFBQSxVQUFBOUosQ0FBQSxFQUFBO01BQ0EyUixZQUFBLENBQUEzUixDQUFBLEVBQUEsYUFBQSxDQUFBO0lBQ0EsQ0FBQSxDQUFBO0VBQ0EsQ0FBQSxDQUFBO0VBRUEsSUFBQWlTLFdBQUEsR0FBQXJWLFFBQUEsQ0FBQTZILGdCQUFBLENBQUEsNEJBQUEsQ0FBQTtFQUNBd04sV0FBQSxDQUFBdk4sT0FBQSxDQUFBLFVBQUFzTixJQUFBLEVBQUE7SUFDQUEsSUFBQSxDQUFBbEksZ0JBQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQTlKLENBQUEsRUFBQTtNQUNBMlIsWUFBQSxDQUFBM1IsQ0FBQSxFQUFBLGNBQUEsQ0FBQTtJQUNBLENBQUEsQ0FBQTtFQUNBLENBQUEsQ0FBQTtBQUNBLENBQUEsQ0FBQSIsImZpbGUiOiJnbG9iYWxQbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgLyoqXG4qIHNpbXBsZVBhZ2luYXRpb24uanMgdjEuNlxuKiBBIHNpbXBsZSBqUXVlcnkgcGFnaW5hdGlvbiBwbHVnaW4uXG4qIGh0dHA6Ly9mbGF2aXVzbWF0aXMuZ2l0aHViLmNvbS9zaW1wbGVQYWdpbmF0aW9uLmpzL1xuKlxuKiBDb3B5cmlnaHQgMjAxMiwgRmxhdml1cyBNYXRpc1xuKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4qIGh0dHA6Ly9mbGF2aXVzbWF0aXMuZ2l0aHViLmNvbS9saWNlbnNlLmh0bWxcbiovXG5cbihmdW5jdGlvbigkKXtcblxuXHR2YXIgbWV0aG9kcyA9IHtcblx0XHRpbml0OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cdFx0XHR2YXIgbyA9ICQuZXh0ZW5kKHtcblx0XHRcdFx0aXRlbXM6IDEsXG5cdFx0XHRcdGl0ZW1zT25QYWdlOiAxLFxuXHRcdFx0XHRwYWdlczogMCxcblx0XHRcdFx0ZGlzcGxheWVkUGFnZXM6IDUsXG5cdFx0XHRcdGVkZ2VzOiAyLFxuXHRcdFx0XHRjdXJyZW50UGFnZTogMCxcblx0XHRcdFx0dXNlQW5jaG9yczogdHJ1ZSxcblx0XHRcdFx0aHJlZlRleHRQcmVmaXg6ICcjcGFnZS0nLFxuXHRcdFx0XHRocmVmVGV4dFN1ZmZpeDogJycsXG5cdFx0XHRcdHByZXZUZXh0OiAnUHJldicsXG5cdFx0XHRcdG5leHRUZXh0OiAnTmV4dCcsXG5cdFx0XHRcdGVsbGlwc2VUZXh0OiAnJmhlbGxpcDsnLFxuXHRcdFx0XHRlbGxpcHNlUGFnZVNldDogdHJ1ZSxcblx0XHRcdFx0Y3NzU3R5bGU6ICdsaWdodC10aGVtZScsXG5cdFx0XHRcdGxpc3RTdHlsZTogJycsXG5cdFx0XHRcdGxhYmVsTWFwOiBbXSxcblx0XHRcdFx0c2VsZWN0T25DbGljazogdHJ1ZSxcblx0XHRcdFx0bmV4dEF0RnJvbnQ6IGZhbHNlLFxuXHRcdFx0XHRpbnZlcnRQYWdlT3JkZXI6IGZhbHNlLFxuXHRcdFx0XHR1c2VTdGFydEVkZ2UgOiB0cnVlLFxuXHRcdFx0XHR1c2VFbmRFZGdlIDogdHJ1ZSxcblx0XHRcdFx0b25QYWdlQ2xpY2s6IGZ1bmN0aW9uKHBhZ2VOdW1iZXIsIGV2ZW50KSB7XG5cdFx0XHRcdFx0Ly8gQ2FsbGJhY2sgdHJpZ2dlcmVkIHdoZW4gYSBwYWdlIGlzIGNsaWNrZWRcblx0XHRcdFx0XHQvLyBQYWdlIG51bWJlciBpcyBnaXZlbiBhcyBhbiBvcHRpb25hbCBwYXJhbWV0ZXJcblx0XHRcdFx0fSxcblx0XHRcdFx0b25Jbml0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQvLyBDYWxsYmFjayB0cmlnZ2VyZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgaW5pdGlhbGl6YXRpb25cblx0XHRcdFx0fVxuXHRcdFx0fSwgb3B0aW9ucyB8fCB7fSk7XG5cblx0XHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdFx0by5wYWdlcyA9IG8ucGFnZXMgPyBvLnBhZ2VzIDogTWF0aC5jZWlsKG8uaXRlbXMgLyBvLml0ZW1zT25QYWdlKSA/IE1hdGguY2VpbChvLml0ZW1zIC8gby5pdGVtc09uUGFnZSkgOiAxO1xuXHRcdFx0aWYgKG8uY3VycmVudFBhZ2UpXG5cdFx0XHRcdG8uY3VycmVudFBhZ2UgPSBvLmN1cnJlbnRQYWdlIC0gMTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0by5jdXJyZW50UGFnZSA9ICFvLmludmVydFBhZ2VPcmRlciA/IDAgOiBvLnBhZ2VzIC0gMTtcblx0XHRcdG8uaGFsZkRpc3BsYXllZCA9IG8uZGlzcGxheWVkUGFnZXMgLyAyO1xuXG5cdFx0XHR0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuYWRkQ2xhc3Moby5jc3NTdHlsZSArICcgc2ltcGxlLXBhZ2luYXRpb24nKS5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbChzZWxmKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRvLm9uSW5pdCgpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0c2VsZWN0UGFnZTogZnVuY3Rpb24ocGFnZSkge1xuXHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIHBhZ2UgLSAxKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRwcmV2UGFnZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA+IDApIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSAtIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA8IG8ucGFnZXMgLSAxKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgKyAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdG5leHRQYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlIDwgby5wYWdlcyAtIDEpIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA+IDApIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSAtIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Z2V0UGFnZXNDb3VudDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJykucGFnZXM7XG5cdFx0fSxcblxuXHRcdHNldFBhZ2VzQ291bnQ6IGZ1bmN0aW9uKGNvdW50KSB7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5wYWdlcyA9IGNvdW50O1xuXHRcdH0sXG5cblx0XHRnZXRDdXJyZW50UGFnZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLmN1cnJlbnRQYWdlICsgMTtcblx0XHR9LFxuXG5cdFx0ZGVzdHJveTogZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuZW1wdHkoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRkcmF3UGFnZTogZnVuY3Rpb24gKHBhZ2UpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmN1cnJlbnRQYWdlID0gcGFnZSAtIDE7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRyZWRyYXc6IGZ1bmN0aW9uKCl7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0ZGlzYWJsZTogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGVuYWJsZTogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHR1cGRhdGVJdGVtczogZnVuY3Rpb24gKG5ld0l0ZW1zKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5pdGVtcyA9IG5ld0l0ZW1zO1xuXHRcdFx0by5wYWdlcyA9IG1ldGhvZHMuX2dldFBhZ2VzKG8pO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZUl0ZW1zT25QYWdlOiBmdW5jdGlvbiAoaXRlbXNPblBhZ2UpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLml0ZW1zT25QYWdlID0gaXRlbXNPblBhZ2U7XG5cdFx0XHRvLnBhZ2VzID0gbWV0aG9kcy5fZ2V0UGFnZXMobyk7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCAwKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRnZXRJdGVtc09uUGFnZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJykuaXRlbXNPblBhZ2U7XG5cdFx0fSxcblxuXHRcdF9kcmF3OiBmdW5jdGlvbigpIHtcblx0XHRcdHZhclx0byA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLFxuXHRcdFx0XHRpbnRlcnZhbCA9IG1ldGhvZHMuX2dldEludGVydmFsKG8pLFxuXHRcdFx0XHRpLFxuXHRcdFx0XHR0YWdOYW1lO1xuXG5cdFx0XHRtZXRob2RzLmRlc3Ryb3kuY2FsbCh0aGlzKTtcblxuXHRcdFx0dGFnTmFtZSA9ICh0eXBlb2YgdGhpcy5wcm9wID09PSAnZnVuY3Rpb24nKSA/IHRoaXMucHJvcCgndGFnTmFtZScpIDogdGhpcy5hdHRyKCd0YWdOYW1lJyk7XG5cblx0XHRcdHZhciAkcGFuZWwgPSB0YWdOYW1lID09PSAnVUwnID8gdGhpcyA6ICQoJzx1bCcgKyAoby5saXN0U3R5bGUgPyAnIGNsYXNzPVwiJyArIG8ubGlzdFN0eWxlICsgJ1wiJyA6ICcnKSArICc+PC91bD4nKS5hcHBlbmRUbyh0aGlzKTtcblxuXHRcdFx0Ly8gR2VuZXJhdGUgUHJldiBsaW5rXG5cdFx0XHRpZiAoby5wcmV2VGV4dCkge1xuXHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgIW8uaW52ZXJ0UGFnZU9yZGVyID8gby5jdXJyZW50UGFnZSAtIDEgOiBvLmN1cnJlbnRQYWdlICsgMSwge3RleHQ6IG8ucHJldlRleHQsIGNsYXNzZXM6ICdwcmV2J30pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBOZXh0IGxpbmsgKGlmIG9wdGlvbiBzZXQgZm9yIGF0IGZyb250KVxuXHRcdFx0aWYgKG8ubmV4dFRleHQgJiYgby5uZXh0QXRGcm9udCkge1xuXHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgIW8uaW52ZXJ0UGFnZU9yZGVyID8gby5jdXJyZW50UGFnZSArIDEgOiBvLmN1cnJlbnRQYWdlIC0gMSwge3RleHQ6IG8ubmV4dFRleHQsIGNsYXNzZXM6ICduZXh0J30pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBzdGFydCBlZGdlc1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuc3RhcnQgPiAwICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYoby51c2VTdGFydEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBlbmQgPSBNYXRoLm1pbihvLmVkZ2VzLCBpbnRlcnZhbC5zdGFydCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgZW5kOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoby5lZGdlcyA8IGludGVydmFsLnN0YXJ0ICYmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIG8uZWRnZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGludGVydmFsLmVuZCA8IG8ucGFnZXMgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZihvLnVzZVN0YXJ0RWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGJlZ2luID0gTWF0aC5tYXgoby5wYWdlcyAtIG8uZWRnZXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSBvLnBhZ2VzIC0gMTsgaSA+PSBiZWdpbjsgaS0tKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoby5wYWdlcyAtIG8uZWRnZXMgPiBpbnRlcnZhbC5lbmQgJiYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIGludGVydmFsIGxpbmtzXG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGZvciAoaSA9IGludGVydmFsLnN0YXJ0OyBpIDwgaW50ZXJ2YWwuZW5kOyBpKyspIHtcblx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAoaSA9IGludGVydmFsLmVuZCAtIDE7IGkgPj0gaW50ZXJ2YWwuc3RhcnQ7IGktLSkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBlbmQgZWRnZXNcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKGludGVydmFsLmVuZCA8IG8ucGFnZXMgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZiAoby5wYWdlcyAtIG8uZWRnZXMgPiBpbnRlcnZhbC5lbmQgJiYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKG8udXNlRW5kRWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGJlZ2luID0gTWF0aC5tYXgoby5wYWdlcyAtIG8uZWRnZXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSBiZWdpbjsgaSA8IG8ucGFnZXM7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuc3RhcnQgPiAwICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYgKG8uZWRnZXMgPCBpbnRlcnZhbC5zdGFydCAmJiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBvLmVkZ2VzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihvLnVzZUVuZEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBlbmQgPSBNYXRoLm1pbihvLmVkZ2VzLCBpbnRlcnZhbC5zdGFydCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSBlbmQgLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIE5leHQgbGluayAodW5sZXNzIG9wdGlvbiBpcyBzZXQgZm9yIGF0IGZyb250KVxuXHRcdFx0aWYgKG8ubmV4dFRleHQgJiYgIW8ubmV4dEF0RnJvbnQpIHtcblx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsICFvLmludmVydFBhZ2VPcmRlciA/IG8uY3VycmVudFBhZ2UgKyAxIDogby5jdXJyZW50UGFnZSAtIDEsIHt0ZXh0OiBvLm5leHRUZXh0LCBjbGFzc2VzOiAnbmV4dCd9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG8uZWxsaXBzZVBhZ2VTZXQgJiYgIW8uZGlzYWJsZWQpIHtcblx0XHRcdFx0bWV0aG9kcy5fZWxsaXBzZUNsaWNrLmNhbGwodGhpcywgJHBhbmVsKTtcblx0XHRcdH1cblxuXHRcdH0sXG5cblx0XHRfZ2V0UGFnZXM6IGZ1bmN0aW9uKG8pIHtcblx0XHRcdHZhciBwYWdlcyA9IE1hdGguY2VpbChvLml0ZW1zIC8gby5pdGVtc09uUGFnZSk7XG5cdFx0XHRyZXR1cm4gcGFnZXMgfHwgMTtcblx0XHR9LFxuXG5cdFx0X2dldEludGVydmFsOiBmdW5jdGlvbihvKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRzdGFydDogTWF0aC5jZWlsKG8uY3VycmVudFBhZ2UgPiBvLmhhbGZEaXNwbGF5ZWQgPyBNYXRoLm1heChNYXRoLm1pbihvLmN1cnJlbnRQYWdlIC0gby5oYWxmRGlzcGxheWVkLCAoby5wYWdlcyAtIG8uZGlzcGxheWVkUGFnZXMpKSwgMCkgOiAwKSxcblx0XHRcdFx0ZW5kOiBNYXRoLmNlaWwoby5jdXJyZW50UGFnZSA+IG8uaGFsZkRpc3BsYXllZCA/IE1hdGgubWluKG8uY3VycmVudFBhZ2UgKyBvLmhhbGZEaXNwbGF5ZWQsIG8ucGFnZXMpIDogTWF0aC5taW4oby5kaXNwbGF5ZWRQYWdlcywgby5wYWdlcykpXG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRfYXBwZW5kSXRlbTogZnVuY3Rpb24ocGFnZUluZGV4LCBvcHRzKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsIG9wdGlvbnMsICRsaW5rLCBvID0gc2VsZi5kYXRhKCdwYWdpbmF0aW9uJyksICRsaW5rV3JhcHBlciA9ICQoJzxsaT48L2xpPicpLCAkdWwgPSBzZWxmLmZpbmQoJ3VsJyk7XG5cblx0XHRcdHBhZ2VJbmRleCA9IHBhZ2VJbmRleCA8IDAgPyAwIDogKHBhZ2VJbmRleCA8IG8ucGFnZXMgPyBwYWdlSW5kZXggOiBvLnBhZ2VzIC0gMSk7XG5cblx0XHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRcdHRleHQ6IHBhZ2VJbmRleCArIDEsXG5cdFx0XHRcdGNsYXNzZXM6ICcnXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoby5sYWJlbE1hcC5sZW5ndGggJiYgby5sYWJlbE1hcFtwYWdlSW5kZXhdKSB7XG5cdFx0XHRcdG9wdGlvbnMudGV4dCA9IG8ubGFiZWxNYXBbcGFnZUluZGV4XTtcblx0XHRcdH1cblxuXHRcdFx0b3B0aW9ucyA9ICQuZXh0ZW5kKG9wdGlvbnMsIG9wdHMgfHwge30pO1xuXG5cdFx0XHRpZiAocGFnZUluZGV4ID09IG8uY3VycmVudFBhZ2UgfHwgby5kaXNhYmxlZCkge1xuXHRcdFx0XHRpZiAoby5kaXNhYmxlZCB8fCBvcHRpb25zLmNsYXNzZXMgPT09ICdwcmV2JyB8fCBvcHRpb25zLmNsYXNzZXMgPT09ICduZXh0Jykge1xuXHRcdFx0XHRcdCRsaW5rV3JhcHBlci5hZGRDbGFzcygnZGlzYWJsZWQnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkbGlua1dyYXBwZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCRsaW5rID0gJCgnPHNwYW4gY2xhc3M9XCJjdXJyZW50XCI+JyArIChvcHRpb25zLnRleHQpICsgJzwvc3Bhbj4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvLnVzZUFuY2hvcnMpIHtcblx0XHRcdFx0XHQkbGluayA9ICQoJzxhIGhyZWY9XCInICsgby5ocmVmVGV4dFByZWZpeCArIChwYWdlSW5kZXggKyAxKSArIG8uaHJlZlRleHRTdWZmaXggKyAnXCIgY2xhc3M9XCJwYWdlLWxpbmtcIj4nICsgKG9wdGlvbnMudGV4dCkgKyAnPC9hPicpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRsaW5rID0gJCgnPHNwYW4gPicgKyAob3B0aW9ucy50ZXh0KSArICc8L3NwYW4+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JGxpbmsuY2xpY2soZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0XHRcdHJldHVybiBtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwoc2VsZiwgcGFnZUluZGV4LCBldmVudCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3B0aW9ucy5jbGFzc2VzKSB7XG5cdFx0XHRcdCRsaW5rLmFkZENsYXNzKG9wdGlvbnMuY2xhc3Nlcyk7XG5cdFx0XHR9XG5cblx0XHRcdCRsaW5rV3JhcHBlci5hcHBlbmQoJGxpbmspO1xuXG5cdFx0XHRpZiAoJHVsLmxlbmd0aCkge1xuXHRcdFx0XHQkdWwuYXBwZW5kKCRsaW5rV3JhcHBlcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZWxmLmFwcGVuZCgkbGlua1dyYXBwZXIpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfc2VsZWN0UGFnZTogZnVuY3Rpb24ocGFnZUluZGV4LCBldmVudCkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uY3VycmVudFBhZ2UgPSBwYWdlSW5kZXg7XG5cdFx0XHRpZiAoby5zZWxlY3RPbkNsaWNrKSB7XG5cdFx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvLm9uUGFnZUNsaWNrKHBhZ2VJbmRleCArIDEsIGV2ZW50KTtcblx0XHR9LFxuXG5cblx0XHRfZWxsaXBzZUNsaWNrOiBmdW5jdGlvbigkcGFuZWwpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdFx0byA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLFxuXHRcdFx0XHQkZWxsaXAgPSAkcGFuZWwuZmluZCgnLmVsbGlwc2UnKTtcblx0XHRcdCRlbGxpcC5hZGRDbGFzcygnY2xpY2thYmxlJykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0XHQkZWxsaXAuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0aWYgKCFvLmRpc2FibGUpIHtcblx0XHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxuXHRcdFx0XHRcdFx0dmFsID0gKHBhcnNlSW50KCR0aGlzLnBhcmVudCgpLnByZXYoKS50ZXh0KCksIDEwKSB8fCAwKSArIDE7XG5cdFx0XHRcdFx0JHRoaXNcblx0XHRcdFx0XHRcdC5odG1sKCc8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjFcIiBtYXg9XCInICsgby5wYWdlcyArICdcIiBzdGVwPVwiMVwiIHZhbHVlPVwiJyArIHZhbCArICdcIj4nKVxuXHRcdFx0XHRcdFx0LmZpbmQoJ2lucHV0Jylcblx0XHRcdFx0XHRcdC5mb2N1cygpXG5cdFx0XHRcdFx0XHQuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0Ly8gcHJldmVudCBpbnB1dCBudW1iZXIgYXJyb3dzIGZyb20gYnViYmxpbmcgYSBjbGljayBldmVudCBvbiAkZWxsaXBcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmtleXVwKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAoZXZlbnQud2hpY2ggPT09IDEzICYmIHZhbCAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBlbnRlciB0byBhY2NlcHRcblx0XHRcdFx0XHRcdFx0XHRpZiAoKHZhbD4wKSYmKHZhbDw9by5wYWdlcykpXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHNlbGYsIHZhbCAtIDEpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09PSAyNykge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGVzY2FwZSB0byBjYW5jZWxcblx0XHRcdFx0XHRcdFx0XHQkZWxsaXAuZW1wdHkoKS5odG1sKG8uZWxsaXBzZVRleHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmJpbmQoJ2JsdXInLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblx0XHRcdFx0XHRcdFx0aWYgKHZhbCAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwoc2VsZiwgdmFsIC0gMSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0JGVsbGlwLmVtcHR5KCkuaHRtbChvLmVsbGlwc2VUZXh0KTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH07XG5cblx0JC5mbi5wYWdpbmF0aW9uID0gZnVuY3Rpb24obWV0aG9kKSB7XG5cblx0XHQvLyBNZXRob2QgY2FsbGluZyBsb2dpY1xuXHRcdGlmIChtZXRob2RzW21ldGhvZF0gJiYgbWV0aG9kLmNoYXJBdCgwKSAhPSAnXycpIHtcblx0XHRcdHJldHVybiBtZXRob2RzW21ldGhvZF0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQuZXJyb3IoJ01ldGhvZCAnICsgIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LnBhZ2luYXRpb24nKTtcblx0XHR9XG5cblx0fTtcblxufSkoalF1ZXJ5KTsiLCIvKlxuICAgIEEgc2ltcGxlIGpRdWVyeSBtb2RhbCAoaHR0cDovL2dpdGh1Yi5jb20va3lsZWZveC9qcXVlcnktbW9kYWwpXG4gICAgVmVyc2lvbiAwLjkuMlxuKi9cblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gIC8vIE1ha2luZyB5b3VyIGpRdWVyeSBwbHVnaW4gd29yayBiZXR0ZXIgd2l0aCBucG0gdG9vbHNcbiAgLy8gaHR0cDovL2Jsb2cubnBtanMub3JnL3Bvc3QvMTEyNzEyMTY5ODMwL21ha2luZy15b3VyLWpxdWVyeS1wbHVnaW4td29yay1iZXR0ZXItd2l0aC1ucG1cbiAgaWYodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHdpbmRvdywgZG9jdW1lbnQpO1xuICB9XG4gIGVsc2Uge1xuICAgIGZhY3RvcnkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50KTtcbiAgfVxufShmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcblxuICB2YXIgbW9kYWxzID0gW10sXG4gICAgICBnZXRDdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBtb2RhbHMubGVuZ3RoID8gbW9kYWxzW21vZGFscy5sZW5ndGggLSAxXSA6IG51bGw7XG4gICAgICB9LFxuICAgICAgc2VsZWN0Q3VycmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIHNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAoaT1tb2RhbHMubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xuICAgICAgICAgIGlmIChtb2RhbHNbaV0uJGJsb2NrZXIpIHtcbiAgICAgICAgICAgIG1vZGFsc1tpXS4kYmxvY2tlci50b2dnbGVDbGFzcygnY3VycmVudCcsIXNlbGVjdGVkKS50b2dnbGVDbGFzcygnYmVoaW5kJyxzZWxlY3RlZCk7XG4gICAgICAgICAgICBzZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICQueXNwX21vZGFsID0gZnVuY3Rpb24oZWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgcmVtb3ZlLCB0YXJnZXQ7XG4gICAgdGhpcy4kYm9keSA9ICQoJ2JvZHknKTtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJC55c3BfbW9kYWwuZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIHRoaXMub3B0aW9ucy5kb0ZhZGUgPSAhaXNOYU4ocGFyc2VJbnQodGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiwgMTApKTtcbiAgICB0aGlzLiRibG9ja2VyID0gbnVsbDtcbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlRXhpc3RpbmcpXG4gICAgICB3aGlsZSAoJC55c3BfbW9kYWwuaXNBY3RpdmUoKSlcbiAgICAgICAgJC55c3BfbW9kYWwuY2xvc2UoKTsgLy8gQ2xvc2UgYW55IG9wZW4gbW9kYWxzLlxuICAgIG1vZGFscy5wdXNoKHRoaXMpO1xuICAgIGlmIChlbC5pcygnYScpKSB7XG4gICAgICB0YXJnZXQgPSBlbC5hdHRyKCdocmVmJyk7XG4gICAgICB0aGlzLmFuY2hvciA9IGVsO1xuICAgICAgLy9TZWxlY3QgZWxlbWVudCBieSBpZCBmcm9tIGhyZWZcbiAgICAgIGlmICgvXiMvLnRlc3QodGFyZ2V0KSkge1xuICAgICAgICB0aGlzLiRlbG0gPSAkKHRhcmdldCk7XG4gICAgICAgIGlmICh0aGlzLiRlbG0ubGVuZ3RoICE9PSAxKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kZWxtKTtcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAvL0FKQVhcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsbSA9ICQoJzxkaXY+Jyk7XG4gICAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuJGVsbSk7XG4gICAgICAgIHJlbW92ZSA9IGZ1bmN0aW9uKGV2ZW50LCBtb2RhbCkgeyBtb2RhbC5lbG0ucmVtb3ZlKCk7IH07XG4gICAgICAgIHRoaXMuc2hvd1NwaW5uZXIoKTtcbiAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX1NFTkQpO1xuICAgICAgICAkLmdldCh0YXJnZXQpLmRvbmUoZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSkgcmV0dXJuO1xuICAgICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9TVUNDRVNTKTtcbiAgICAgICAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcbiAgICAgICAgICBjdXJyZW50LiRlbG0uZW1wdHkoKS5hcHBlbmQoaHRtbCkub24oJC55c3BfbW9kYWwuQ0xPU0UsIHJlbW92ZSk7XG4gICAgICAgICAgY3VycmVudC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgIGN1cnJlbnQub3BlbigpO1xuICAgICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9DT01QTEVURSk7XG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX0ZBSUwpO1xuICAgICAgICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuICAgICAgICAgIGN1cnJlbnQuaGlkZVNwaW5uZXIoKTtcbiAgICAgICAgICBtb2RhbHMucG9wKCk7IC8vIHJlbW92ZSBleHBlY3RlZCBtb2RhbCBmcm9tIHRoZSBsaXN0XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX0NPTVBMRVRFKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsbSA9IGVsO1xuICAgICAgdGhpcy5hbmNob3IgPSBlbDtcbiAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuJGVsbSk7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH07XG5cbiAgJC55c3BfbW9kYWwucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiAkLnlzcF9tb2RhbCxcblxuICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG0gPSB0aGlzO1xuICAgICAgdGhpcy5ibG9jaygpO1xuICAgICAgdGhpcy5hbmNob3IuYmx1cigpO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmRvRmFkZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG0uc2hvdygpO1xuICAgICAgICB9LCB0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uICogdGhpcy5vcHRpb25zLmZhZGVEZWxheSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgIH1cbiAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5ZG93bi5tb2RhbCcpLm9uKCdrZXlkb3duLm1vZGFsJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMjcgJiYgY3VycmVudC5vcHRpb25zLmVzY2FwZUNsb3NlKSBjdXJyZW50LmNsb3NlKCk7XG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2xpY2tDbG9zZSlcbiAgICAgICAgdGhpcy4kYmxvY2tlci5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSB0aGlzKVxuICAgICAgICAgICAgJC55c3BfbW9kYWwuY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgIG1vZGFscy5wb3AoKTtcbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICBpZiAoISQueXNwX21vZGFsLmlzQWN0aXZlKCkpXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5ZG93bi5tb2RhbCcpO1xuICAgIH0sXG5cbiAgICBibG9jazogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5CRUZPUkVfQkxPQ0ssIFt0aGlzLl9jdHgoKV0pO1xuICAgICAgdGhpcy4kYm9keS5jc3MoJ292ZXJmbG93JywnaGlkZGVuJyk7XG4gICAgICB0aGlzLiRibG9ja2VyID0gJCgnPGRpdiBjbGFzcz1cIicgKyB0aGlzLm9wdGlvbnMuYmxvY2tlckNsYXNzICsgJyBibG9ja2VyIGN1cnJlbnRcIj48L2Rpdj4nKS5hcHBlbmRUbyh0aGlzLiRib2R5KTtcbiAgICAgIHNlbGVjdEN1cnJlbnQoKTtcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgdGhpcy4kYmxvY2tlci5jc3MoJ29wYWNpdHknLDApLmFuaW1hdGUoe29wYWNpdHk6IDF9LCB0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkJMT0NLLCBbdGhpcy5fY3R4KCldKTtcbiAgICB9LFxuXG4gICAgdW5ibG9jazogZnVuY3Rpb24obm93KSB7XG4gICAgICBpZiAoIW5vdyAmJiB0aGlzLm9wdGlvbnMuZG9GYWRlKVxuICAgICAgICB0aGlzLiRibG9ja2VyLmZhZGVPdXQodGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiwgdGhpcy51bmJsb2NrLmJpbmQodGhpcyx0cnVlKSk7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy4kYmxvY2tlci5jaGlsZHJlbigpLmFwcGVuZFRvKHRoaXMuJGJvZHkpO1xuICAgICAgICB0aGlzLiRibG9ja2VyLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLiRibG9ja2VyID0gbnVsbDtcbiAgICAgICAgc2VsZWN0Q3VycmVudCgpO1xuICAgICAgICBpZiAoISQueXNwX21vZGFsLmlzQWN0aXZlKCkpXG4gICAgICAgICAgdGhpcy4kYm9keS5jc3MoJ292ZXJmbG93JywnJyk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkVGT1JFX09QRU4sIFt0aGlzLl9jdHgoKV0pO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaG93Q2xvc2UpIHtcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbiA9ICQoJzxhIGhyZWY9XCIjY2xvc2UtbW9kYWxcIiByZWw9XCJtb2RhbDpjbG9zZVwiIGNsYXNzPVwiY2xvc2UtbW9kYWwgJyArIHRoaXMub3B0aW9ucy5jbG9zZUNsYXNzICsgJ1wiPicgKyB0aGlzLm9wdGlvbnMuY2xvc2VUZXh0ICsgJzwvYT4nKTtcbiAgICAgICAgdGhpcy4kZWxtLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsbS5hZGRDbGFzcyh0aGlzLm9wdGlvbnMubW9kYWxDbGFzcykuYXBwZW5kVG8odGhpcy4kYmxvY2tlcik7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuZG9GYWRlKSB7XG4gICAgICAgIHRoaXMuJGVsbS5jc3Moe29wYWNpdHk6IDAsIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snfSkuYW5pbWF0ZSh7b3BhY2l0eTogMX0sIHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZWxtLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLk9QRU4sIFt0aGlzLl9jdHgoKV0pO1xuICAgIH0sXG5cbiAgICBoaWRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkJFRk9SRV9DTE9TRSwgW3RoaXMuX2N0eCgpXSk7XG4gICAgICBpZiAodGhpcy5jbG9zZUJ1dHRvbikgdGhpcy5jbG9zZUJ1dHRvbi5yZW1vdmUoKTtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuZG9GYWRlKSB7XG4gICAgICAgIHRoaXMuJGVsbS5mYWRlT3V0KHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQUZURVJfQ0xPU0UsIFtfdGhpcy5fY3R4KCldKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRlbG0uaGlkZSgwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkFGVEVSX0NMT1NFLCBbX3RoaXMuX2N0eCgpXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQ0xPU0UsIFt0aGlzLl9jdHgoKV0pO1xuICAgIH0sXG5cbiAgICBzaG93U3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5zaG93U3Bpbm5lcikgcmV0dXJuO1xuICAgICAgdGhpcy5zcGlubmVyID0gdGhpcy5zcGlubmVyIHx8ICQoJzxkaXYgY2xhc3M9XCInICsgdGhpcy5vcHRpb25zLm1vZGFsQ2xhc3MgKyAnLXNwaW5uZXJcIj48L2Rpdj4nKVxuICAgICAgICAuYXBwZW5kKHRoaXMub3B0aW9ucy5zcGlubmVySHRtbCk7XG4gICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLnNwaW5uZXIpO1xuICAgICAgdGhpcy5zcGlubmVyLnNob3coKTtcbiAgICB9LFxuXG4gICAgaGlkZVNwaW5uZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuc3Bpbm5lcikgdGhpcy5zcGlubmVyLnJlbW92ZSgpO1xuICAgIH0sXG5cbiAgICAvL1JldHVybiBjb250ZXh0IGZvciBjdXN0b20gZXZlbnRzXG4gICAgX2N0eDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4geyBlbG06IHRoaXMuJGVsbSwgJGVsbTogdGhpcy4kZWxtLCAkYmxvY2tlcjogdGhpcy4kYmxvY2tlciwgb3B0aW9uczogdGhpcy5vcHRpb25zLCAkYW5jaG9yOiB0aGlzLmFuY2hvciB9O1xuICAgIH1cbiAgfTtcblxuICAkLnlzcF9tb2RhbC5jbG9zZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKCEkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKSByZXR1cm47XG4gICAgaWYgKGV2ZW50KSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuICAgIGN1cnJlbnQuY2xvc2UoKTtcbiAgICByZXR1cm4gY3VycmVudC4kZWxtO1xuICB9O1xuXG4gIC8vIFJldHVybnMgaWYgdGhlcmUgY3VycmVudGx5IGlzIGFuIGFjdGl2ZSBtb2RhbFxuICAkLnlzcF9tb2RhbC5pc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbW9kYWxzLmxlbmd0aCA+IDA7XG4gIH07XG5cbiAgJC55c3BfbW9kYWwuZ2V0Q3VycmVudCA9IGdldEN1cnJlbnQ7XG5cbiAgJC55c3BfbW9kYWwuZGVmYXVsdHMgPSB7XG4gICAgY2xvc2VFeGlzdGluZzogdHJ1ZSxcbiAgICBlc2NhcGVDbG9zZTogdHJ1ZSxcbiAgICBjbGlja0Nsb3NlOiB0cnVlLFxuICAgIGNsb3NlVGV4dDogJ0Nsb3NlJyxcbiAgICBjbG9zZUNsYXNzOiAnJyxcbiAgICBtb2RhbENsYXNzOiBcInlzcC1tb2RhbFwiLFxuICAgIGJsb2NrZXJDbGFzczogXCJqcXVlcnktbW9kYWxcIixcbiAgICBzcGlubmVySHRtbDogJzxkaXYgY2xhc3M9XCJyZWN0MVwiPjwvZGl2PjxkaXYgY2xhc3M9XCJyZWN0MlwiPjwvZGl2PjxkaXYgY2xhc3M9XCJyZWN0M1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJyZWN0NFwiPjwvZGl2PicsXG4gICAgc2hvd1NwaW5uZXI6IHRydWUsXG4gICAgc2hvd0Nsb3NlOiB0cnVlLFxuICAgIGZhZGVEdXJhdGlvbjogbnVsbCwgICAvLyBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoZSBmYWRlIGFuaW1hdGlvbiB0YWtlcy5cbiAgICBmYWRlRGVsYXk6IDEuMCAgICAgICAgLy8gUG9pbnQgZHVyaW5nIHRoZSBvdmVybGF5J3MgZmFkZS1pbiB0aGF0IHRoZSBtb2RhbCBiZWdpbnMgdG8gZmFkZSBpbiAoLjUgPSA1MCUsIDEuNSA9IDE1MCUsIGV0Yy4pXG4gIH07XG5cbiAgLy8gRXZlbnQgY29uc3RhbnRzXG4gICQueXNwX21vZGFsLkJFRk9SRV9CTE9DSyA9ICdtb2RhbDpiZWZvcmUtYmxvY2snO1xuICAkLnlzcF9tb2RhbC5CTE9DSyA9ICdtb2RhbDpibG9jayc7XG4gICQueXNwX21vZGFsLkJFRk9SRV9PUEVOID0gJ21vZGFsOmJlZm9yZS1vcGVuJztcbiAgJC55c3BfbW9kYWwuT1BFTiA9ICdtb2RhbDpvcGVuJztcbiAgJC55c3BfbW9kYWwuQkVGT1JFX0NMT1NFID0gJ21vZGFsOmJlZm9yZS1jbG9zZSc7XG4gICQueXNwX21vZGFsLkNMT1NFID0gJ21vZGFsOmNsb3NlJztcbiAgJC55c3BfbW9kYWwuQUZURVJfQ0xPU0UgPSAnbW9kYWw6YWZ0ZXItY2xvc2UnO1xuICAkLnlzcF9tb2RhbC5BSkFYX1NFTkQgPSAnbW9kYWw6YWpheDpzZW5kJztcbiAgJC55c3BfbW9kYWwuQUpBWF9TVUNDRVNTID0gJ21vZGFsOmFqYXg6c3VjY2Vzcyc7XG4gICQueXNwX21vZGFsLkFKQVhfRkFJTCA9ICdtb2RhbDphamF4OmZhaWwnO1xuICAkLnlzcF9tb2RhbC5BSkFYX0NPTVBMRVRFID0gJ21vZGFsOmFqYXg6Y29tcGxldGUnO1xuXG4gICQuZm4ueXNwX21vZGFsID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBuZXcgJC55c3BfbW9kYWwodGhpcywgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIEF1dG9tYXRpY2FsbHkgYmluZCBsaW5rcyB3aXRoIHJlbD1cIm1vZGFsOmNsb3NlXCIgdG8sIHdlbGwsIGNsb3NlIHRoZSBtb2RhbC5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLm1vZGFsJywgJ2FbcmVsfj1cIm1vZGFsOmNsb3NlXCJdJywgJC55c3BfbW9kYWwuY2xvc2UpO1xuICAkKGRvY3VtZW50KS5vbignY2xpY2subW9kYWwnLCAnYVtyZWx+PVwibW9kYWw6b3BlblwiXScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkKHRoaXMpLm1vZGFsKCk7XG4gIH0pO1xufSkpOyIsImpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIFxuICBqUXVlcnkoJ1tkYXRhLW1vZGFsXScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgY29uc29sZS5sb2coJ2Z1Y2sgbWUgJyk7XG5cbiAgICB2YXIgZGF0YV9tb2RhbCA9IGpRdWVyeSh0aGlzKS5kYXRhKCdtb2RhbCcpO1xuXG4gICAgalF1ZXJ5KCBkYXRhX21vZGFsICkueXNwX21vZGFsKHtcbiAgICBcdGNsb3NlVGV4dDogJ1gnLFxuICAgICAgbW9kYWxDbGFzczogJ3lzcC1tb2RhbC1vcGVuJyxcbiAgICAgIGNsb3NlQ2xhc3M6ICd5c3AtbW9kZWwtY2xvc2UnXG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGNvcHlMaW5rKCkge1xuXG4gIHZhciBjb3B5VGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29weUxpbmtJbnB1dFwiKTtcblxuICBjb3B5VGV4dC5zZWxlY3QoKTtcbiAgY29weVRleHQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgOTk5OTkpO1xuXG4gIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKTtcblxuICBhbGVydChcIkNvcGllZCB0aGUgbGluazogXCIgKyBjb3B5VGV4dC52YWx1ZSk7XG59IiwiT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0cmluZy5wcm90b3R5cGUsICdlYWNoV29yZENhcGl0YWxpemUnLCB7XG4gIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50b0xvd2VyQ2FzZSgpXG4gICAgLnNwbGl0KCcgJylcbiAgICAubWFwKChzKSA9PiBzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcy5zdWJzdHJpbmcoMSkpXG4gICAgLmpvaW4oJyAnKTtcbiAgfSxcbiAgZW51bWVyYWJsZTogZmFsc2Vcbn0pO1xuXG5mdW5jdGlvbiByYWl5c19nZXRfZm9ybV9kYXRhKGZvcm1fZWxlKSB7XG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCBmb3JtX2VsZSApO1xuXG4gICAgbGV0IGZkPU9iamVjdC5mcm9tRW50cmllcyhmb3JtRGF0YS5lbnRyaWVzKCkpO1xuXG4gICAgZm9yIChjb25zdCBbZkluZGV4LCBmaWVsZF0gb2YgT2JqZWN0LmVudHJpZXMoZmQpKSB7XG5cbiAgICAgICAgbGV0IFZhbEFycmF5ID0gZm9ybURhdGEuZ2V0QWxsKGZJbmRleCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBWYWxBcnJheVsxXSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgZmRbIGZJbmRleCBdID0gVmFsQXJyYXk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmRbIGZJbmRleCBdID09ICcnKSB7XG4gICAgICAgICAgICBkZWxldGUgZmRbZkluZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmZDtcbn1cblxuZnVuY3Rpb24gcmFpeXNfc2V0X2Zvcm1fdG9fZGF0YShpbnB1dERhdGEpIHtcblxuICAgIGxldCBmb3JtQT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJyk7XG4gICAgbGV0IGZvcm1CPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtJyk7XG5cbiAgICBmb3JtQS5yZXNldCgpO1xuICAgIGZvcm1CLnJlc2V0KCk7XG5cbiAgICBsZXQgZm9ybUlucHV0cz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC15YWNodC1zZWFyY2gtZm9ybVwiXSwgI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybVwiXScpO1xuXG4gICAgZm9ybUlucHV0cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgbGV0IGlucHV0ID0gZWxlO1xuXG4gICAgICAgIGxldCBuYW1lID0gZWxlLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG4gICAgICAgIGxldCBoYXNQcmV0dHkgPSBpbnB1dERhdGFbIG5hbWUgXTtcblxuICAgICAgIC8vIGNvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBoYXNQcmV0dHkgIT0gJ251bGwnICYmIHR5cGVvZiBoYXNQcmV0dHkgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaGFzUHJldHR5KSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICAgICAgICAgIGhhc1ByZXR0eS5mb3JFYWNoKChoUCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGhQICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoYXNQcmV0dHkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZSAhPSAnY2hlY2tib3gnICYmIGlucHV0LnR5cGUgIT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGhhc1ByZXR0eTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJhaXlzX3B1c2hfaGlzdG9yeSggZGF0YSA9IHt9ICkge1xuICAgIGxldCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgbGV0IHN0cnBhdGg9Jyc7XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgbGV0IGl0ID0gZGF0YVsgcHJvcGVydHkgXTtcblxuXG4gICAgICAgIGlmIChpdCAhPSAnJyAmJiB0eXBlb2YgaXQgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGl0ID09ICdzdHJpbmcnICYmIHByb3BlcnR5ICE9ICdPbkZpcnN0TG9hZCcgJiYgdHlwZW9mIGl0ICE9ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KHByb3BlcnR5LCBpdCk7XG5cbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aCtcIlwiK3Byb3BlcnR5KyctJysoaXQudG9TdHJpbmcoKS5zcGxpdCgnICcpLmpvaW4oJy0nKSkrJy8nO1xuICAgICAgICAgICAgc3RycGF0aD1zdHJwYXRoLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdCkpIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQocHJvcGVydHksIGl0KTtcblxuICAgICAgICAgICAgaXQgPSBpdC5tYXAoKHByb3ApID0+IHsgcmV0dXJuIHByb3AudG9TdHJpbmcoKS5zcGxpdCgnICcpLmpvaW4oJy0nKTsgfSk7XG5cbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aCtcIlwiK3Byb3BlcnR5KyctJysoIGl0LmpvaW4oXCIrXCIpICkrJy8nO1xuICAgICAgICAgICAgc3RycGF0aD1zdHJwYXRoLnRvTG93ZXJDYXNlKCk7ICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvL2hpc3RvcnkucHVzaFN0YXRlKGRhdGEsICcnLCByYWlfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfdXJsKyc/JytzZWFyY2hQYXJhbXMudG9TdHJpbmcoKSk7XG4gICAgaGlzdG9yeS5wdXNoU3RhdGUoZGF0YSwgJycsIHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF91cmwrc3RycGF0aCk7XG5cbiAgICByZXR1cm4gcmFpX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3VybCtzdHJwYXRoOyAgICBcbn1cblxuIiwidmFyIHJhaV95c3BfYXBpPXt9O1xuXG4gICAgcmFpX3lzcF9hcGkuY2FsbF9hcGk9ZnVuY3Rpb24obWV0aG9kLCBwYXRoLCBwYXNzaW5nX2RhdGEpIHtcbiAgICAgICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgPT0gMjAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9IEpTT04ucGFyc2UoIHRoaXMucmVzcG9uc2VUZXh0ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZURhdGEpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdHRVQnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXNzaW5nX2RhdGEubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gcGFzc2luZ19kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChwcm9wZXJ0eSwgcGFzc2luZ19kYXRhWyBwcm9wZXJ0eSBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIF9xdWVzdGlvbk1hcms9c2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCByYWlfeWFjaHRfc3luYy53cF9yZXN0X3VybCtcInJhaXlzL1wiKyBwYXRoICsgKChfcXVlc3Rpb25NYXJrICE9ICcnKT8nPycrc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk6JycpLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5zZW5kKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdQT1NUJzpcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5vcGVuKFwiUE9TVFwiLCByYWlfeWFjaHRfc3luYy53cF9yZXN0X3VybCtcInJhaXlzL1wiKyBwYXRoLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLnNlbmQoSlNPTi5zdHJpbmdpZnkocGFzc2luZ19kYXRhKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG5cbiAgICB9OyIsInZhciB5c3BfdGVtcGxhdGVzPXt9O1xuXHR5c3BfdGVtcGxhdGVzLnlhY2h0PXt9O1xuXHRcblx0eXNwX3RlbXBsYXRlcy55YWNodC5ncmlkPWZ1bmN0aW9uKHZlc3NlbCwgcGFyYW1zKSB7XG5cdFx0bGV0IG1ldGVycyA9IHBhcnNlSW50KHZlc3NlbC5Ob21pbmFsTGVuZ3RoKSAqIDAuMzA0ODtcblxuXHRcdGxldCBwcmljZSA9ICcnO1xuXHRcdGxldCBsZW5ndGggPSAnJztcblxuXHRcdGlmIChyYWlfeWFjaHRfc3luYy5ldXJvcGVfb3B0aW9uX3BpY2tlZCA9PSBcInllc1wiKSB7XG5cdFx0XHRsZW5ndGggPSB2ZXNzZWwuTm9taW5hbExlbmd0aCA/IG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnO1xuXHRcdFx0cHJpY2UgPSAodHlwZW9mIHZlc3NlbC5ZU1BfRXVyb1ZhbCAhPSAndW5kZWZpbmVkJyAmJiB2ZXNzZWwuWVNQX0V1cm9WYWwgPiAwKSA/IGDigqwke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdCh2ZXNzZWwuWVNQX0V1cm9WYWwpIH1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJztcblx0XHR9IFxuXHRcdGVsc2Uge1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyB2ZXNzZWwuTm9taW5hbExlbmd0aCArIFwiIC8gXCIgKyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblxuXHRcdFx0aWYgKHBhcmFtcy5jdXJyZW5jeSA9PSAnRXVyJykge1xuXHRcdFx0XHRwcmljZSA9ICh0eXBlb2YgdmVzc2VsLllTUF9VU0RWYWwgIT0gJ3VuZGVmaW5lZCcgJiYgdmVzc2VsLllTUF9VU0RWYWwgPiAwKSA/IGDigqwke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdCh2ZXNzZWwuWVNQX0V1cm9WYWwpIH1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJztcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRwcmljZSA9ICh0eXBlb2YgdmVzc2VsLllTUF9VU0RWYWwgIT0gJ3VuZGVmaW5lZCcgJiYgdmVzc2VsLllTUF9VU0RWYWwgPiAwKSA/IGAkJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQodmVzc2VsLllTUF9VU0RWYWwpIH1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJztcblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtcmVzdWx0LWdyaWQtaXRlbVwiIGRhdGEtcG9zdC1pZD1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiBkYXRhLXlhY2h0LWlkPVwiJHsgdmVzc2VsLkRvY3VtZW50SUQgfVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8YSBjbGFzcz1cInlhY2h0LWRldGFpbHNcIiBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdDxpbWcgY2xhc3M9XCJ5YWNodC1tYWluLWltYWdlXCIgc3JjPVwiJHt2ZXNzZWwuSW1hZ2VzID8gdmVzc2VsLkltYWdlc1swXS5VcmkgOiByYWlfeWFjaHRfc3luYy5hc3NldHNfdXJsICsgJ2ltYWdlcy9kZWZhdWx0LXlhY2h0LWltYWdlLmpwZWcnfVwiIGFsdD1cInlhY2h0LWltYWdlXCIgbG9hZGluZz1cImxhenlcIiAvPlxuXHRcdFx0XHRcdFx0PHN2ZyBjbGFzcz1cImxpa2UtbWUgbG92ZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjU3XCIgaGVpZ2h0PVwiNTRcIiB2aWV3Qm94PVwiMCAwIDU3IDU0XCIgZmlsbD1cIm5vbmVcIiAgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5cblx0XHRcdFx0XHRcdCAgPGcgZmlsdGVyPVwidXJsKCNmaWx0ZXIwX2RfMjg4OF80MzMzKVwiPlxuXHRcdFx0XHRcdFx0ICAgIDxwYXRoIGQ9XCJNMzQuNzAyOCAxMS41NzU1QzM2LjIwOTQgMTEuNTc1NSAzNy42MjUxIDEyLjE2OTkgMzguNjg5OCAxMy4yNDg4TDM4LjgyMjMgMTMuMzgzQzQxLjAyMDYgMTUuNjExNiA0MS4wMjA2IDE5LjIzNzUgMzguODIyMyAyMS40NjZMMzguMDk5MiAyMi4xOTlMMjcuNDk5NSAzMi45NDQyTDE4LjQ4ODMgMjMuODA4TDE2LjkwMTEgMjIuMTk5TDE2LjE3OCAyMS40NjZDMTMuOTc5NyAxOS4yMzc1IDEzLjk3OTcgMTUuNjExNiAxNi4xNzggMTMuMzgzTDE2LjMwODMgMTMuMjUwOUMxNy4zNzM5IDEyLjE3MDggMTguNzkgMTEuNTc1OSAyMC4yOTYyIDExLjU3NjRDMjEuODAyMyAxMS41NzY0IDIzLjIxNzYgMTIuMTcwOCAyNC4yODE5IDEzLjI0OTJMMjUuMDA1IDEzLjk4MjJMMjcuNDk5MSAxNi41MTAxTDI5Ljk5MjggMTMuOTgxOEwzMC43MTU4IDEzLjI0ODhDMzEuNzgwMSAxMi4xNjk5IDMzLjE5NjIgMTEuNTc1NSAzNC43MDI4IDExLjU3NTVaTTM0LjcwMjggOEMzMi4zNTcgOCAzMC4wMTEyIDguOTA2OCAyOC4yMjIyIDEwLjcyMDRMMjcuNDk5MSAxMS40NTM0TDI2Ljc3NiAxMC43MjA0QzI0Ljk4NzggOC45MDcyMyAyMi42NDIgOC4wMDA0MyAyMC4yOTcgOEMxNy45NTA4IDggMTUuNjA1IDguOTA3MjMgMTMuODE0NyAxMC43MjIxTDEzLjY4NDQgMTAuODU0MkMxMC4xMDQ2IDE0LjQ4MzIgMTAuMTA0NiAyMC4zNjQ1IDEzLjY4NDQgMjMuOTkzNUwxNC40MDc0IDI0LjcyNjVMMTUuOTk0NiAyNi4zMzU0TDI3LjQ5OTUgMzhMNDAuNTkzMyAyNC43MjY1TDQxLjMxNjQgMjMuOTkzNUM0NC44OTQ1IDIwLjM2NjMgNDQuODk0NSAxNC40ODE0IDQxLjMxNjQgMTAuODU0Mkw0MS4xODM5IDEwLjcyQzM5LjM5NDUgOC45MDY4IDM3LjA0ODYgOCAzNC43MDI4IDhaXCIgZmlsbD1cIndoaXRlXCI+PC9wYXRoPlxuXHRcdFx0XHRcdFx0ICA8L2c+XG5cdFx0XHRcdFx0XHQgIDxkZWZzPlxuXHRcdFx0XHRcdFx0ICAgIDxmaWx0ZXIgaWQ9XCJmaWx0ZXIwX2RfMjg4OF80MzMzXCIgeD1cIi0wLjAwMDQ4ODI4MVwiIHk9XCIwXCIgd2lkdGg9XCI1Ny4wMDA1XCIgaGVpZ2h0PVwiNTRcIiBmaWx0ZXJVbml0cz1cInVzZXJTcGFjZU9uVXNlXCIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPVwic1JHQlwiPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT1cIjBcIiByZXN1bHQ9XCJCYWNrZ3JvdW5kSW1hZ2VGaXhcIj48L2ZlRmxvb2Q+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVDb2xvck1hdHJpeCBpbj1cIlNvdXJjZUFscGhhXCIgdHlwZT1cIm1hdHJpeFwiIHZhbHVlcz1cIjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwXCIgcmVzdWx0PVwiaGFyZEFscGhhXCI+PC9mZUNvbG9yTWF0cml4PlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlT2Zmc2V0IGR4PVwiMVwiIGR5PVwiNFwiPjwvZmVPZmZzZXQ+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPVwiNlwiPjwvZmVHYXVzc2lhbkJsdXI+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVDb21wb3NpdGUgaW4yPVwiaGFyZEFscGhhXCIgb3BlcmF0b3I9XCJvdXRcIj48L2ZlQ29tcG9zaXRlPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT1cIm1hdHJpeFwiIHZhbHVlcz1cIjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMFwiPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUJsZW5kIG1vZGU9XCJub3JtYWxcIiBpbjI9XCJCYWNrZ3JvdW5kSW1hZ2VGaXhcIiByZXN1bHQ9XCJlZmZlY3QxX2Ryb3BTaGFkb3dfMjg4OF80MzMzXCI+PC9mZUJsZW5kPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQmxlbmQgbW9kZT1cIm5vcm1hbFwiIGluPVwiU291cmNlR3JhcGhpY1wiIGluMj1cImVmZmVjdDFfZHJvcFNoYWRvd18yODg4XzQzMzNcIiByZXN1bHQ9XCJzaGFwZVwiPjwvZmVCbGVuZD5cblx0XHRcdFx0XHRcdCAgICA8L2ZpbHRlcj5cblx0XHRcdFx0XHRcdCAgPC9kZWZzPlxuXHRcdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdFx0XHQke3Zlc3NlbC5Db21wYW55TmFtZSA9PT0gcmFpX3lhY2h0X3N5bmMuY29tcGFueV9uYW1lID8gYDxkaXYgY2xhc3M9XCJjb21wYW55LWJhbm5lclwiPjxpbWcgc3JjPVwiJHtyYWlfeWFjaHRfc3luYy5jb21wYW55X2xvZ299XCI+PC9kaXY+YCA6ICcnfVxuXHRcdFx0XHRcdDwvYT5cdFxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWdlbmVyYWwtaW5mby1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtdGl0bGUtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzcz1cInlhY2h0LWRldGFpbHNcIiBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdFx0PGg2IGNsYXNzPVwieWFjaHQtdGl0bGVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJyd9ICR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICcnfSAke3Zlc3NlbC5Nb2RlbCA/IHZlc3NlbC5Nb2RlbCA6ICcnfSAke3Zlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICcnfTwvaDY+XG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZm8tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5ZZWFyPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5DYWJpbnM8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuQ2FiaW5zQ291bnROdW1lcmljID8gdmVzc2VsLkNhYmluc0NvdW50TnVtZXJpYyA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkJ1aWxkZXI8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+TGVuZ3RoPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7bGVuZ3RofTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkNvbXBhcmU8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY29tcGFyZV90b2dnbGVcIiBuYW1lPVwiY29tcGFyZVwiIHZhbHVlPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiIC8+PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1wcmljZS1kZXRhaWxzLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXByaWNlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LXByaWNlXCI+JHtwcmljZX08L3A+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cInlhY2h0LWRvd25sb2FkLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBkYXRhLW1vZGFsPVwiI3NpbmdsZS1zaGFyZVwiPkNvbnRhY3Q8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXHR9O1xuXG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQubGlzdD1mdW5jdGlvbih2ZXNzZWwpIHtcblx0XHRsZXQgbWV0ZXJzID0gcGFyc2VJbnQodmVzc2VsLk5vbWluYWxMZW5ndGgpICogMC4zMDQ4O1xuXHRcdGxldCBwcmljZSA9ICcnO1xuXG5cdFx0aWYgKHR5cGVvZiB2ZXNzZWwuUHJpY2UgPT0gJ3N0cmluZycpIHtcblx0XHRcdGxldCBwcmljZSA9IHZlc3NlbC5QcmljZS5zbGljZSgwLCAtMyk7XG5cdFx0fVxuXHRcdFxuXHRcdGxldCBsZW5ndGggPSAnJztcblx0XHRcblx0XHRpZihyYWlfeWFjaHRfc3luYy5ldXJvcGVfb3B0aW9uX3BpY2tlZCA9PSBcInllc1wiKXtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cdFx0XHRwcmljZSA9IHZlc3NlbC5QcmljZSA/IGDigqwgJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQoKHBhcnNlSW50KHZlc3NlbC5QcmljZS5zbGljZSgwLCAtMykpICogcmFpX3lhY2h0X3N5bmMuZXVyb19jX2MpKX1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyB2ZXNzZWwuTm9taW5hbExlbmd0aCArIFwiIC8gXCIgKyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblx0XHRcdHByaWNlID0gdmVzc2VsLlByaWNlID8gYCQgJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQocGFyc2VJbnQodmVzc2VsLlByaWNlLnNsaWNlKDAsIC0zKSkpfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGBcblx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1yZXN1bHQtZ3JpZC1pdGVtIGxpc3Qtdmlld1wiIGRhdGEtcG9zdC1pZD1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiBkYXRhLXlhY2h0LWlkPVwiJHsgdmVzc2VsLkRvY3VtZW50SUQgfVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8YSBjbGFzcz1cInlhY2h0LWRldGFpbHNcIiBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdDxpbWcgY2xhc3M9XCJ5YWNodC1tYWluLWltYWdlXCIgc3JjPVwiJHt2ZXNzZWwuSW1hZ2VzID8gdmVzc2VsLkltYWdlc1swXS5VcmkgOiB2ZXNzZWwuSW1hZ2VzID8gdmVzc2VsLkltYWdlc1swXS5VcmkgOiByYWlfeWFjaHRfc3luYy5hc3NldHNfdXJsICsgJ2ltYWdlcy9kZWZhdWx0LXlhY2h0LWltYWdlLmpwZWcnfVwiIGFsdD1cInlhY2h0LWltYWdlXCIgbG9hZGluZz1cImxhenlcIiAvPlxuXHRcdFx0XHRcdFx0PHN2ZyBjbGFzcz1cImxpa2UtbWUgbG92ZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjU3XCIgaGVpZ2h0PVwiNTRcIiB2aWV3Qm94PVwiMCAwIDU3IDU0XCIgZmlsbD1cIm5vbmVcIiAgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5cblx0XHRcdFx0XHRcdCAgPGcgZmlsdGVyPVwidXJsKCNmaWx0ZXIwX2RfMjg4OF80MzMzKVwiPlxuXHRcdFx0XHRcdFx0ICAgIDxwYXRoIGQ9XCJNMzQuNzAyOCAxMS41NzU1QzM2LjIwOTQgMTEuNTc1NSAzNy42MjUxIDEyLjE2OTkgMzguNjg5OCAxMy4yNDg4TDM4LjgyMjMgMTMuMzgzQzQxLjAyMDYgMTUuNjExNiA0MS4wMjA2IDE5LjIzNzUgMzguODIyMyAyMS40NjZMMzguMDk5MiAyMi4xOTlMMjcuNDk5NSAzMi45NDQyTDE4LjQ4ODMgMjMuODA4TDE2LjkwMTEgMjIuMTk5TDE2LjE3OCAyMS40NjZDMTMuOTc5NyAxOS4yMzc1IDEzLjk3OTcgMTUuNjExNiAxNi4xNzggMTMuMzgzTDE2LjMwODMgMTMuMjUwOUMxNy4zNzM5IDEyLjE3MDggMTguNzkgMTEuNTc1OSAyMC4yOTYyIDExLjU3NjRDMjEuODAyMyAxMS41NzY0IDIzLjIxNzYgMTIuMTcwOCAyNC4yODE5IDEzLjI0OTJMMjUuMDA1IDEzLjk4MjJMMjcuNDk5MSAxNi41MTAxTDI5Ljk5MjggMTMuOTgxOEwzMC43MTU4IDEzLjI0ODhDMzEuNzgwMSAxMi4xNjk5IDMzLjE5NjIgMTEuNTc1NSAzNC43MDI4IDExLjU3NTVaTTM0LjcwMjggOEMzMi4zNTcgOCAzMC4wMTEyIDguOTA2OCAyOC4yMjIyIDEwLjcyMDRMMjcuNDk5MSAxMS40NTM0TDI2Ljc3NiAxMC43MjA0QzI0Ljk4NzggOC45MDcyMyAyMi42NDIgOC4wMDA0MyAyMC4yOTcgOEMxNy45NTA4IDggMTUuNjA1IDguOTA3MjMgMTMuODE0NyAxMC43MjIxTDEzLjY4NDQgMTAuODU0MkMxMC4xMDQ2IDE0LjQ4MzIgMTAuMTA0NiAyMC4zNjQ1IDEzLjY4NDQgMjMuOTkzNUwxNC40MDc0IDI0LjcyNjVMMTUuOTk0NiAyNi4zMzU0TDI3LjQ5OTUgMzhMNDAuNTkzMyAyNC43MjY1TDQxLjMxNjQgMjMuOTkzNUM0NC44OTQ1IDIwLjM2NjMgNDQuODk0NSAxNC40ODE0IDQxLjMxNjQgMTAuODU0Mkw0MS4xODM5IDEwLjcyQzM5LjM5NDUgOC45MDY4IDM3LjA0ODYgOCAzNC43MDI4IDhaXCIgZmlsbD1cIndoaXRlXCI+PC9wYXRoPlxuXHRcdFx0XHRcdFx0ICA8L2c+XG5cdFx0XHRcdFx0XHQgIDxkZWZzPlxuXHRcdFx0XHRcdFx0ICAgIDxmaWx0ZXIgaWQ9XCJmaWx0ZXIwX2RfMjg4OF80MzMzXCIgeD1cIi0wLjAwMDQ4ODI4MVwiIHk9XCIwXCIgd2lkdGg9XCI1Ny4wMDA1XCIgaGVpZ2h0PVwiNTRcIiBmaWx0ZXJVbml0cz1cInVzZXJTcGFjZU9uVXNlXCIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPVwic1JHQlwiPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT1cIjBcIiByZXN1bHQ9XCJCYWNrZ3JvdW5kSW1hZ2VGaXhcIj48L2ZlRmxvb2Q+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVDb2xvck1hdHJpeCBpbj1cIlNvdXJjZUFscGhhXCIgdHlwZT1cIm1hdHJpeFwiIHZhbHVlcz1cIjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwXCIgcmVzdWx0PVwiaGFyZEFscGhhXCI+PC9mZUNvbG9yTWF0cml4PlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlT2Zmc2V0IGR4PVwiMVwiIGR5PVwiNFwiPjwvZmVPZmZzZXQ+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPVwiNlwiPjwvZmVHYXVzc2lhbkJsdXI+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVDb21wb3NpdGUgaW4yPVwiaGFyZEFscGhhXCIgb3BlcmF0b3I9XCJvdXRcIj48L2ZlQ29tcG9zaXRlPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT1cIm1hdHJpeFwiIHZhbHVlcz1cIjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMFwiPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUJsZW5kIG1vZGU9XCJub3JtYWxcIiBpbjI9XCJCYWNrZ3JvdW5kSW1hZ2VGaXhcIiByZXN1bHQ9XCJlZmZlY3QxX2Ryb3BTaGFkb3dfMjg4OF80MzMzXCI+PC9mZUJsZW5kPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQmxlbmQgbW9kZT1cIm5vcm1hbFwiIGluPVwiU291cmNlR3JhcGhpY1wiIGluMj1cImVmZmVjdDFfZHJvcFNoYWRvd18yODg4XzQzMzNcIiByZXN1bHQ9XCJzaGFwZVwiPjwvZmVCbGVuZD5cblx0XHRcdFx0XHRcdCAgICA8L2ZpbHRlcj5cblx0XHRcdFx0XHRcdCAgPC9kZWZzPlxuXHRcdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWdlbmVyYWwtaW5mby1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtdGl0bGUtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzcz1cInlhY2h0LWRldGFpbHNcIiBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdFx0PGg2IGNsYXNzPVwieWFjaHQtdGl0bGVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJyd9ICR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICcnfSAke3Zlc3NlbC5Nb2RlbCA/IHZlc3NlbC5Nb2RlbCA6ICcnfSAke3Zlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICcnfTwvaDY+XG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZm8tY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5mb1wiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5ZZWFyPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnTi9BJ308L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtdGl0bGVcIj5DYWJpbnM8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuQ2FiaW5zQ291bnROdW1lcmljID8gdmVzc2VsLkNhYmluc0NvdW50TnVtZXJpYyA6ICdOL0EnfTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkJ1aWxkZXI8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+JHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJ04vQSd9PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LWluZGl2aWR1YWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXRpdGxlXCI+TGVuZ3RoPC9wPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC12YWx1ZVwiPiR7bGVuZ3RofTwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwieWFjaHQtaW5kaXZpZHVhbC10aXRsZVwiPkNvbXBhcmU8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJ5YWNodC1pbmRpdmlkdWFsLXZhbHVlXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY29tcGFyZV90b2dnbGVcIiBuYW1lPVwiY29tcGFyZVwiIHZhbHVlPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiIC8+PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ5YWNodC1wcmljZS1kZXRhaWxzLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInlhY2h0LXByaWNlLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cInlhY2h0LXByaWNlXCI+JHtwcmljZX08L3A+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cInlhY2h0LWRvd25sb2FkLWJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBkYXRhLW1vZGFsPVwiI3NpbmdsZS1zaGFyZVwiPkNvbnRhY3Q8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdFxuXHRcdGA7XG5cdH07XG5cblx0eXNwX3RlbXBsYXRlcy55YWNodC5jb21wYXJlX3ByZXZpZXcgPSBmdW5jdGlvbih2ZXNzZWwsIHBhcmFtcykge1xuXG5cdFx0cmV0dXJuIGBcblxuXHRcdFx0PGRpdiBjbGFzcz1cInlzcC15YWNodC1jb21wYXJlLXByZXZpZXdcIiBkYXRhLXBvc3QtaWQ9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCIgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5cdFx0XHRcblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyZW1vdmUtZnJvbS1jb21wYXJlXCI+XG5cdFx0XHRcdFx0PHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0XHRcdFx0PHJlY3QgeD1cIjAuNVwiIHk9XCIwLjVcIiB3aWR0aD1cIjIzXCIgaGVpZ2h0PVwiMjNcIiByeD1cIjExLjVcIiBzdHJva2U9XCIjRkZGRkZGXCIvPlxuXHRcdFx0XHRcdDxwYXRoIGQ9XCJNOC4yNjg3NiAxNC45MzQ2QzguMDQ5MDkgMTUuMTU0MyA4LjA0OTA5IDE1LjUxMDQgOC4yNjg3NiAxNS43MzAxQzguNDg4NDMgMTUuOTQ5OCA4Ljg0NDU4IDE1Ljk0OTggOS4wNjQyNSAxNS43MzAxTDguMjY4NzYgMTQuOTM0NlpNMTIuMzk3NiAxMi4zOTY4QzEyLjYxNzMgMTIuMTc3MSAxMi42MTczIDExLjgyMDkgMTIuMzk3NiAxMS42MDEzQzEyLjE3NzkgMTEuMzgxNiAxMS44MjE4IDExLjM4MTYgMTEuNjAyMSAxMS42MDEzTDEyLjM5NzYgMTIuMzk2OFpNMTEuNjAxOCAxMS42MDE2QzExLjM4MjEgMTEuODIxMyAxMS4zODIxIDEyLjE3NzQgMTEuNjAxOCAxMi4zOTcxQzExLjgyMTQgMTIuNjE2OCAxMi4xNzc2IDEyLjYxNjggMTIuMzk3MyAxMi4zOTcxTDExLjYwMTggMTEuNjAxNlpNMTUuNzMwNiA5LjA2Mzc2QzE1Ljk1MDMgOC44NDQwOSAxNS45NTAzIDguNDg3OTQgMTUuNzMwNiA4LjI2ODI3QzE1LjUxMDkgOC4wNDg2IDE1LjE1NDggOC4wNDg2IDE0LjkzNTEgOC4yNjgyN0wxNS43MzA2IDkuMDYzNzZaTTEyLjM5NzMgMTEuNjAxM0MxMi4xNzc2IDExLjM4MTYgMTEuODIxNCAxMS4zODE2IDExLjYwMTggMTEuNjAxM0MxMS4zODIxIDExLjgyMDkgMTEuMzgyMSAxMi4xNzcxIDExLjYwMTggMTIuMzk2OEwxMi4zOTczIDExLjYwMTNaTTE0LjkzNTEgMTUuNzMwMUMxNS4xNTQ4IDE1Ljk0OTggMTUuNTEwOSAxNS45NDk4IDE1LjczMDYgMTUuNzMwMUMxNS45NTAzIDE1LjUxMDQgMTUuOTUwMyAxNS4xNTQzIDE1LjczMDYgMTQuOTM0NkwxNC45MzUxIDE1LjczMDFaTTExLjYwMjEgMTIuMzk3MUMxMS44MjE4IDEyLjYxNjggMTIuMTc3OSAxMi42MTY4IDEyLjM5NzYgMTIuMzk3MUMxMi42MTczIDEyLjE3NzQgMTIuNjE3MyAxMS44MjEzIDEyLjM5NzYgMTEuNjAxNkwxMS42MDIxIDEyLjM5NzFaTTkuMDY0MjUgOC4yNjgyN0M4Ljg0NDU4IDguMDQ4NiA4LjQ4ODQzIDguMDQ4NiA4LjI2ODc2IDguMjY4MjdDOC4wNDkwOSA4LjQ4Nzk0IDguMDQ5MDkgOC44NDQwOSA4LjI2ODc2IDkuMDYzNzZMOS4wNjQyNSA4LjI2ODI3Wk05LjA2NDI1IDE1LjczMDFMMTIuMzk3NiAxMi4zOTY4TDExLjYwMjEgMTEuNjAxM0w4LjI2ODc2IDE0LjkzNDZMOS4wNjQyNSAxNS43MzAxWk0xMi4zOTczIDEyLjM5NzFMMTUuNzMwNiA5LjA2Mzc2TDE0LjkzNTEgOC4yNjgyN0wxMS42MDE4IDExLjYwMTZMMTIuMzk3MyAxMi4zOTcxWk0xMS42MDE4IDEyLjM5NjhMMTQuOTM1MSAxNS43MzAxTDE1LjczMDYgMTQuOTM0NkwxMi4zOTczIDExLjYwMTNMMTEuNjAxOCAxMi4zOTY4Wk0xMi4zOTc2IDExLjYwMTZMOS4wNjQyNSA4LjI2ODI3TDguMjY4NzYgOS4wNjM3NkwxMS42MDIxIDEyLjM5NzFMMTIuMzk3NiAxMS42MDE2WlwiIGZpbGw9XCIjRkZGRkZGXCIvPlxuXHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHQ8L3NwYW4+XG5cblxuXHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZVwiIHNyYz1cIiR7dmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogcmFpX3lhY2h0X3N5bmMuYXNzZXRzX3VybCArICdpbWFnZXMvZGVmYXVsdC15YWNodC1pbWFnZS5qcGVnJ31cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblx0XHRcdFx0PGEgY2xhc3M9XCJwcmV2aWV3LWxpbmtcIiBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHQ8aDYgY2xhc3M9XCJ5YWNodC10aXRsZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnJ30gJHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJyd9ICR7dmVzc2VsLk1vZGVsID8gdmVzc2VsLk1vZGVsIDogJyd9ICR7dmVzc2VsLkJvYXROYW1lID8gdmVzc2VsLkJvYXROYW1lIDogJyd9PC9oNj5cblx0XHRcdFx0PC9hPlxuXG5cdFx0XHQ8L2Rpdj5cblxuXHRcdGA7XG5cblx0fTtcblxuXHR5c3BfdGVtcGxhdGVzLm5vUmVzdWx0cz1mdW5jdGlvbigpIHtcblxuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8Yj5ObyBSZXN1bHRzPC9iPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG5cbiAgICB9O1xuXG5cbiAgICB5c3BfdGVtcGxhdGVzLnlhY2h0X3RhZyA9IGZ1bmN0aW9uKGxhYmVsLCB2YWx1ZSkge1xuXG4gICAgXHRyZXR1cm4gYFxuICAgIFx0XHQ8c3Bhbj5cblx0ICAgIFx0XHQke3ZhbHVlfVxuXG5cdCAgICBcdFx0PGltZyBzcmM9XCIke3JhaV95YWNodF9zeW5jLmFzc2V0c191cmx9L2ltYWdlcy9yZW1vdmUtdGFnLnBuZ1wiPlxuXHRcdFx0PC9zcGFuPlxuICAgIFx0YDtcbiAgICB9O1xuXG4gICAgeXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uID0ge307XG4gICAgXG4gICAgXHR5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24ubmV4dF90ZXh0ID0gYD5gO1xuXG4gICAgXHR5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24ucHJldl90ZXh0ID0gYDxgO1xuXG4iLCJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG5cdGxldCBlbGVfcXVpY2tfc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC1xdWljay1zZWFyY2gtZm9ybScpO1xuXG5cdGlmIChlbGVfcXVpY2tfc2VhcmNoKSB7XG5cdFx0Ly8gRmlsbCBvcHRpb25zXG5cdCAgICBsZXQgRmlsbE9wdGlvbnM9W107XG5cdCAgICBsZXQgc2VsZWN0b3JFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIueXNwLXF1aWNrLXNlYXJjaC1mb3JtIHNlbGVjdFtkYXRhLWZpbGwtb3B0aW9uc11cIik7XG5cblx0ICAgIHNlbGVjdG9yRWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgRmlsbE9wdGlvbnMucHVzaChlbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtb3B0aW9ucycpKTtcblx0ICAgIH0pO1xuXHQgICAgXG5cdCAgICByYWlfeXNwX2FwaS5jYWxsX2FwaSgnUE9TVCcsICdkcm9wZG93bi1vcHRpb25zJywge2xhYmVsczogRmlsbE9wdGlvbnN9KS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG5cdCAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuXHQgICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnlzcC1xdWljay1zZWFyY2gtZm9ybSBzZWxlY3RbZGF0YS1maWxsLW9wdGlvbnM9J1wiKyBsYWJlbCArXCInXVwiKTtcblx0ICAgICAgICAgICAgbGV0IG5hbWUgPSBTZWxlY3RvckVsZVswXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuXHQgICAgICAgICAgICByT3B0aW9uc1tsYWJlbF0uZm9yRWFjaChmdW5jdGlvbihiKSB7XG5cdCAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICAgICAgICAgIFx0bGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJPUFRJT05cIik7XG5cblx0XHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcblx0XHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG5cblx0ICAgICAgICAgICAgICAgICAgICBlbGUuYWRkKG9wdGlvbik7XG5cdCAgICAgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgbGV0IFVSTFJFRiA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG5cdCAgICAgICAgICAgIGxldCBVcmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbmFtZSApO1xuXG5cdCAgICAgICAgICAgIGxldCBzdHJwYXRocz13aW5kb3cubG9jYXRpb24uaHJlZjtcblxuXHQgICAgICAgICAgICBzdHJwYXRocz1zdHJwYXRocy5yZXBsYWNlKHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF9wYWdlX2lkLCAnJyk7XG5cblx0ICAgICAgICAgICAgbGV0IHBhdGhzID0gc3RycGF0aHMuc3BsaXQoXCIvXCIpO1xuXG5cdCAgICAgICAgICAgIGxldCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zPXt9O1xuXG5cdCAgICAgICAgICAgIHBhdGhzLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuXG5cdCAgICAgICAgICAgICAgICBpZiAocGF0aCAhPSAnJykge1xuXHQgICAgICAgICAgICAgICAgICAgIGxldCBwaGFzZV9wYXRoID0gcGF0aC5zcGxpdCgnLScpO1xuXHQgICAgICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHM9cGhhc2VfcGF0aC5zbGljZSgxKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV09b25seV92YWxzLmpvaW4oJyAnKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgXG5cdCAgICAgICAgICAgIGlmIChVcmxWYWwgIT0gJycgJiYgVXJsVmFsICE9IG51bGwpIHtcblx0ICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFVybFZhbCk7XG5cblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgVXJsVmFsID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgVXJsVmFsID0gVXJsVmFsLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBVcmxWYWw7IFxuXHQgICAgICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgfVxuXG5cblx0ICAgICAgICAgICAgbGV0IGhhc1ByZXR0eSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXTtcblxuXHQgICAgICAgICAgICBjb25zb2xlLmxvZyggcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdKTtcblxuXHQgICAgICAgICAgICBpZiAoaGFzUHJldHR5ICE9ICcnICYmIGhhc1ByZXR0eSAhPSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBoYXNQcmV0dHk7IFxuXHQgICAgICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0pXG5cdH1cbn0pOyIsImZ1bmN0aW9uIHlzcF9tYWtlU2VhcmNoVGFncyggZGF0YSApIHtcblxuXHRsZXQgdGFnc0VsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3Atc2VhcmNoLXRhZ3MnKTtcbiAgICAgICAgXG4gICAgaWYgKHRhZ3NFbGUpIHtcbiAgICAgICAgdGFnc0VsZS5mb3JFYWNoKGZ1bmN0aW9uKHRlKSB7XG4gICAgICAgICAgICB0ZS5pbm5lckhUTUw9XCJcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgeXNwX3RhZ3Nfbm90X3ByaW50ID0gWydwYWdlX2luZGV4JywgJyddO1xuXG4gICAgICAgIGZvciAobGV0IHBhcmFtS2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbD0nJztcblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj0nKyBwYXJhbUtleSArJ10nKSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGFiZWw9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGFiZWxbZm9yPScrIHBhcmFtS2V5ICsnXScpLmlubmVyVGV4dDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKltuYW1lPScrIHBhcmFtS2V5ICsnXScpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbbmFtZT0nKyBwYXJhbUtleSArJ10nKS5oYXNBdHRyaWJ1dGUoJ2xhYmVsJykpIHtcblxuICAgICAgICAgICAgICAgIGxhYmVsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbbmFtZT0nKyBwYXJhbUtleSArJ10nKS5nZXRBdHRyaWJ1dGUoJ2xhYmVsJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0YWdzRWxlLmZvckVhY2goZnVuY3Rpb24odGUpIHtcblxuICAgICAgICAgICAgICAgIGlmICh5c3BfdGFnc19ub3RfcHJpbnQuaW5kZXhPZiggcGFyYW1LZXkgKSA9PSAtMSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lPScrIHBhcmFtS2V5ICsnXScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVJbnB1dCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VGFnRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YWdWYWwgPSBkYXRhW3BhcmFtS2V5XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVJbnB1dC50YWdOYW1lID09ICdTRUxFQ1QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCA9IGVsZUlucHV0Lm9wdGlvbnNbIGVsZUlucHV0LnNlbGVjdGVkSW5kZXggXS5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtS2V5Lm1hdGNoKCdwcmljZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCA9ICckJyt0YWdWYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtS2V5Lm1hdGNoKCdsZW5ndGgnKSAmJiBwYXJhbUtleSAhPSAnbGVuZ3RodW5pdCcpICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsZVVuaXQgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybSBbbmFtZT1sZW5ndGh1bml0XTpjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISBlbGVVbml0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlVW5pdCA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIFtuYW1lPWxlbmd0aHVuaXRdJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnVmFsID0gdGFnVmFsICsnICc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZVVuaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCArPSBlbGVVbml0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLmNsYXNzTmFtZSA9ICdidG4gYnRuLXByaW1hcnkgYnRuLXNtIHlzcC10YWcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBsYWJlbCAhPSBudWxsICYmIGxhYmVsICE9ICdudWxsJyAmJiBsYWJlbCAhPSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYWdFbGUuaW5uZXJIVE1MID0geXNwX3RlbXBsYXRlcy55YWNodF90YWcobGFiZWwsIHRhZ1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYWdFbGUuaW5uZXJIVE1MID0geXNwX3RlbXBsYXRlcy55YWNodF90YWcoJycsIHRhZ1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLnNldEF0dHJpYnV0ZSgna2V5JywgcGFyYW1LZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlLmFwcGVuZENoaWxkKCBuZXdUYWdFbGUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXRhZ1trZXk9XCInKyBwYXJhbUtleSArJ1wiXScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygoJy55c3AtdGFnW2tleT1cIicrIHBhcmFtS2V5ICsnXCJdJykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3Bhbi55c3AtdGFnW2tleT1cIicrIHBhcmFtS2V5ICsnXCJdJykuZm9yRWFjaChmdW5jdGlvbih5c3BUYWdFbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5c3BUYWdFbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgna2V5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dEVsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIHNlbGVjdFtuYW1lPScrIGtleSArJ10sIC55c3AteWFjaHQtc2VhcmNoLWZvcm0gaW5wdXRbbmFtZT0nKyBrZXkgKyddJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0RWxlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RWxlcy5mb3JFYWNoKGZ1bmN0aW9uKGVsZUkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVsZUkudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoZWxlSS50eXBlID09ICdjaGVja2JveCcgfHwgZWxlSS50eXBlID09ICdyYWRpbycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZUkuY2hlY2tlZD1mYWxzZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlSS52YWx1ZT0nJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZXNbMF0uZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG59IiwiZnVuY3Rpb24geXNwX21hcmtMb3ZlZFZlc3NlbCggZWxlX2NhcmQgKSB7XG5cbiAgICBqUXVlcnkoJy5sb3ZlJywgZWxlX2NhcmQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgICAgICBqUXVlcnkodGhpcykudG9nZ2xlQ2xhc3MoJ2xvdmVkJyk7XG5cbiAgICAgICAgbGV0IHlhY2h0SWQgPSBqUXVlcnkodGhpcykuZGF0YSgneWFjaHQtaWQnKTtcbiAgICBcbiAgICAgICAgaWYgKCBqUXVlcnkodGhpcykuaGFzQ2xhc3MoJ2xvdmVkJykgKSB7XG4gICAgICAgICAgICB5c3BfYWRkTG92ZWRWZXNzZWwoeWFjaHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB5c3BfcmVtb3ZlTG92ZWRWZXNzZWwoeWFjaHRJZCk7XG5cbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSByYWl5c19nZXRfZm9ybV9kYXRhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0nKSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1zLnlzX3lhY2h0c19sb3ZlZCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGVsZV9jYXJkLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSAhPSBcIlwiKSB7XG5cbiAgICAgICAgbGV0IGxvdmVkVmVzc2VscyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykpO1xuXG4gICAgICAgIGlmIChsb3ZlZFZlc3NlbHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgbG92ZWRWZXNzZWxzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeWFjaHRJZCA9IGVsZV9jYXJkLmRhdGEoJ3lhY2h0LWlkJyk7XG5cbiAgICAgICAgaWYgKGxvdmVkVmVzc2Vscy5pbmRleE9mKCB5YWNodElkICkgIT0gLTEpIHtcblxuICAgICAgICAgICAgZWxlX2NhcmQuYWRkQ2xhc3MoJ2xvdmVkJyk7XG5cbiAgICAgICAgICAgIGpRdWVyeSgnLmxvdmUnLCBlbGVfY2FyZCkuYWRkQ2xhc3MoJ2xvdmVkJyk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZnVuY3Rpb24geXNwX2FkZExvdmVkVmVzc2VsKCB5YWNodElkICkge1xuXG4gICAgbGV0IGxvdmVkVmVzc2VscyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykpO1xuXG5cbiAgICAgICAgaWYgKGxvdmVkVmVzc2VscyA9PSBudWxsKSB7XG4gICAgICAgICAgICBsb3ZlZFZlc3NlbHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgaWYgKGxvdmVkVmVzc2Vscy5pbmRleE9mKCB5YWNodElkICkgPT0gLTEpIHtcblxuICAgICAgICBsb3ZlZFZlc3NlbHMucHVzaCh5YWNodElkKTtcblxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gYWxyZWFkeSBhZGRlZFxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGxvdmVkVmVzc2VscyApO1xuICAgIFxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwieXNwX2xvdmVkX3Zlc3NlbHNcIiwgSlNPTi5zdHJpbmdpZnkobG92ZWRWZXNzZWxzKSk7XG5cbn0gXG5cbmZ1bmN0aW9uIHlzcF9yZW1vdmVMb3ZlZFZlc3NlbCggeWFjaHRJZCApIHtcblxuICAgIGxldCBsb3ZlZFZlc3NlbHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpKTtcblxuXG4gICAgICAgIGlmIChsb3ZlZFZlc3NlbHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgbG92ZWRWZXNzZWxzID0gW107XG4gICAgICAgIH1cblxuICAgIGxldCBpbmRleGVkID0gbG92ZWRWZXNzZWxzLmluZGV4T2YoIHlhY2h0SWQgKTtcblxuICAgIGNvbnNvbGUubG9nKGluZGV4ZWQpO1xuXG4gICAgaWYgKGluZGV4ZWQgIT0gLTEpIHtcblxuICAgICAgICBkZWxldGUgbG92ZWRWZXNzZWxzW2luZGV4ZWRdOyAgICAgICAgXG4gICAgICAgIGxvdmVkVmVzc2Vscy5zcGxpY2UoaW5kZXhlZCwgMSk7XG5cblxuXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBhbHJlYWR5IGFkZGVkXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2cobG92ZWRWZXNzZWxzICk7XG4gICAgXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ5c3BfbG92ZWRfdmVzc2Vsc1wiLCBKU09OLnN0cmluZ2lmeShsb3ZlZFZlc3NlbHMpKTtcblxufSIsInZhciBZU1BfVmVzc2VsQ29tcGFyZUxpc3Q9W107XG5cblxuZnVuY3Rpb24geXNwX3Jlc3RvcmVDb21wYXJlcygpIHtcbiAgICBsZXQgVVJMUkVGPW5ldyBVUkwobG9jYXRpb24uaHJlZik7IC8vIG1heWJlIGZvciBhIHJlLWRvXG4gICAgbGV0IGNvbXBhcmVfcG9zdF9pZHMgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggJ3Jlc3RvcmVfdG9fY29tcGFyZScgKTsgXG5cbiAgICBjb25zb2xlLmxvZyh0eXBlb2YgY29tcGFyZV9wb3N0X2lkcyk7XG4gICAgY29uc29sZS5sb2coY29tcGFyZV9wb3N0X2lkcyk7XG5cbiAgICBpZiAodHlwZW9mIGNvbXBhcmVfcG9zdF9pZHMgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgWVNQX1Zlc3NlbENvbXBhcmVMaXN0ID0gY29tcGFyZV9wb3N0X2lkcy5zcGxpdCgnLCcpO1xuICAgIFxuXG4gICAgICAgIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKTtcbiAgICB9XG5cblxuXG59XG5cblxuZnVuY3Rpb24geXNwX21ha2VDb21wYXJlVmVzc2VsKGVsZV9jYXJkKSB7XG5cdCBcblx0IGpRdWVyeSgnLmNvbXBhcmVfdG9nZ2xlJywgZWxlX2NhcmQpLmNoYW5nZShmdW5jdGlvbihlKSB7XG5cdCBcdGNvbnNvbGUubG9nKCdob3dkeScpO1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnRvZ2dsZUNsYXNzKCdhcm1lZCcpO1xuXG4gICAgICAgIGxldCB5YWNodElkID0gZWxlX2NhcmQuZGF0YSgncG9zdC1pZCcpO1xuICAgIFxuICAgICAgICBpZiAoIGpRdWVyeSh0aGlzKS5oYXNDbGFzcygnYXJtZWQnKSApIHtcbiAgICAgICAgICAgIHlzcF9hZGRWZXNzZWxUb0NvbXBhcmVMaXN0KHlhY2h0SWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeXNwX3JlbW92ZVZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgbGV0IHlhY2h0SWQgPSBlbGVfY2FyZC5kYXRhKCdwb3N0LWlkJyk7XG5cbiAgICBpZiAoWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmluZGV4T2YoIHlhY2h0SWQgKSAhPSAtMSAgfHwgWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmluZGV4T2YoIHlhY2h0SWQudG9TdHJpbmcoKSApICE9IC0xICkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdoZWxsbyB3b3JsZCByZXN0b3JlZCcpO1xuXG4gICAgICAgIGVsZV9jYXJkLmFkZENsYXNzKCdhcm1lZCcpO1xuXG4gICAgICAgIGpRdWVyeSgnLmNvbXBhcmVfdG9nZ2xlJywgZWxlX2NhcmQpLmFkZENsYXNzKCdhcm1lZCcpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblxuICAgIH1cblxufVxuXG5mdW5jdGlvbiB5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKSB7XG5cbiAgICBpZiAoWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmluZGV4T2YoIHlhY2h0SWQgKSA9PSAtMSkge1xuXG4gICAgXHRZU1BfVmVzc2VsQ29tcGFyZUxpc3QucHVzaCh5YWNodElkKTtcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKTtcbn1cbiAgICBcbmZ1bmN0aW9uIHlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0KHlhY2h0SWQpIHtcblx0bGV0IGluZGV4ZWQgPSBZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZCApXG5cblx0aWYgKCBpbmRleGVkICE9IC0xKSB7XG5cbiAgICBcdGRlbGV0ZSBZU1BfVmVzc2VsQ29tcGFyZUxpc3RbaW5kZXhlZF07ICAgICAgICBcbiAgICAgICAgWVNQX1Zlc3NlbENvbXBhcmVMaXN0LnNwbGljZShpbmRleGVkLCAxKTtcbiAgXHRcdFxuICAgIH1cblxuICAgIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKTtcbn1cblxuZnVuY3Rpb24geXNwX21ha2VDb21wYXJlTGlua291dCgpIHtcblxuICAgIGlmIChZU1BfVmVzc2VsQ29tcGFyZUxpc3QubGVuZ3RoID49IDIpIHtcbiAgICBcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0JykuaHJlZj1yYWlfeWFjaHRfc3luYy53cF9yZXN0X3VybCtcInJhaXlzL2NvbXBhcmUvP3Bvc3RJRD1cIitZU1BfVmVzc2VsQ29tcGFyZUxpc3Quam9pbignLCcpO1xuICAgIFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lzcF9jb21wYXJlX2xpbmtvdXQnKS5pbm5lckhUTUw9YDxidXR0b24gdHlwZT1cImJ1dHRvblwiPkNvbXBhcmUgKCAke1lTUF9WZXNzZWxDb21wYXJlTGlzdC5sZW5ndGh9ICk8L2J1dHRvbj5gO1xuXG4gICAgXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneXNwX2NvbXBhcmVfbGlua291dF9tb2JpbGUnKS5ocmVmPXJhaV95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wicmFpeXMvY29tcGFyZS8/cG9zdElEPVwiK1lTUF9WZXNzZWxDb21wYXJlTGlzdC5qb2luKCcsJyk7XG4gICAgXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneXNwX2NvbXBhcmVfbGlua291dF9tb2JpbGUnKS5pbm5lckhUTUw9YDxidXR0b24gdHlwZT1cImJ1dHRvblwiPkNvbXBhcmUgKCAke1lTUF9WZXNzZWxDb21wYXJlTGlzdC5sZW5ndGh9ICk8L2J1dHRvbj5gO1xuICAgICAgICBcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICdwb3N0X19pbic6IFlTUF9WZXNzZWxDb21wYXJlTGlzdCxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcmFpX3lzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIFwieWFjaHRzXCIsIHBhcmFtcykudGhlbihmdW5jdGlvbihkYXRhX3Jlc3VsdCkge1xuXG4gICAgICAgICAgICBqUXVlcnkoJyN5c3AtY29tcGFyZS1wcmV2aWV3cycpLmh0bWwoJycpO1xuXG4gICAgICAgICAgICBkYXRhX3Jlc3VsdC5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC1jb21wYXJlLXByZXZpZXdzJykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0LmNvbXBhcmVfcHJldmlldyhpdGVtLCBwYXJhbXMpICk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZWxlX3ByZXZpZXcgPSBqUXVlcnkoJyN5c3AtY29tcGFyZS1wcmV2aWV3cyBbZGF0YS1wb3N0LWlkPScrIGl0ZW0uX3Bvc3RJRCArJ10nKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5yZW1vdmUtZnJvbS1jb21wYXJlJywgZWxlX3ByZXZpZXcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGVsbG8nKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVfY2FyZCA9IGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93IFtkYXRhLXBvc3QtaWQ9JysgaXRlbS5fcG9zdElEICsnXScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnLmNvbXBhcmVfdG9nZ2xlJywgZWxlX2NhcmQpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSkucmVtb3ZlQ2xhc3MoJ2FybWVkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgeXNwX3JlbW92ZVZlc3NlbFRvQ29tcGFyZUxpc3QoaXRlbS5fcG9zdElEKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xuXG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBqUXVlcnkoJyN5c3AtY29tcGFyZS1wcmV2aWV3cycpLmh0bWwoJycpO1xuICAgICAgICBqUXVlcnkoJyN5c3BfY29tcGFyZV9saW5rb3V0JykuaHRtbCgnJyk7XG4gICAgfVxuXG5cblxuXG59XG4iLCJjb25zdCB5c3BCZWZvcmVZYWNodFNlYXJjaCA9IG5ldyBFdmVudChcInlzcC1iZWZvcmUtc3VibWl0dGluZy15YWNodC1zZWFyY2hcIik7XG5jb25zdCB5c3BBZnRlcllhY2h0U2VhcmNoID0gbmV3IEV2ZW50KFwieXNwLWFmdGVyLXN1Ym1pdHRpbmcteWFjaHQtc2VhcmNoXCIpO1xuY29uc3QgeXNwQWZ0ZXJSZW5kZXJpbmdZYWNodCA9IG5ldyBFdmVudChcInlzcC1hZnRlci1yZW5kZXJpbmcteWFjaHQtc2VhcmNoXCIpO1xuXG5mdW5jdGlvbiB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoZGF0YSkge1xuXG4gICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdycpLmh0bWwoJycpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1yZXN1bHQtc2VjdGlvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRlZCcpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtcmVzdWx0LXNlY3Rpb24nKS5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nJyk7XG5cbiAgICByYWl5c19zZXRfZm9ybV90b19kYXRhKCBkYXRhICk7XG5cbiAgICB5c3BfbWFrZVNlYXJjaFRhZ3MoIGRhdGEgKTtcblxuICAgIC8vIEdFVCBBTkQgV1JJVEVcbiAgICByZXR1cm4gcmFpX3lzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIFwieWFjaHRzXCIsIGRhdGEpLnRoZW4oZnVuY3Rpb24oZGF0YV9yZXN1bHQpIHtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXJlc3VsdC1zZWN0aW9uJykuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZycpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLXJlc3VsdC1zZWN0aW9uJykuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XG5cbiAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBkYXRhX3Jlc3VsdC5TRU8udGl0bGU7XG4gICAgICAgIGpRdWVyeSgnI3lzcC1zZWFyY2gtaGVhZGluZycpLnRleHQoZGF0YV9yZXN1bHQuU0VPLmhlYWRpbmcpO1xuICAgICAgICBqUXVlcnkoJyN5c3Atc2VhcmNoLXBhcmFncmFwaCcpLnRleHQoZGF0YV9yZXN1bHQuU0VPLnApO1xuXG4gICAgICAgIGpRdWVyeSgnI3RvdGFsLXJlc3VsdHMnKS50ZXh0KG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tSU4nLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogMyB9KS5mb3JtYXQoZGF0YV9yZXN1bHQudG90YWwpKTtcblxuICAgICAgICBsZXQgY3VycmVudFVSTD1udWxsO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5kb250X3B1c2ggPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRVUkw9cmFpeXNfcHVzaF9oaXN0b3J5KCBkYXRhICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50VVJMID0gbG9jYXRpb24uaHJlZjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgalF1ZXJ5KCcjeWFjaHRzLXBhZ2luYXRpb24nKS5odG1sKCcnKTtcblxuICAgICAgICBpZiAoZGF0YV9yZXN1bHQudG90YWwgPiAwKSB7XG5cbiAgICAgICAgICAgIGRhdGFfcmVzdWx0LnJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnZpZXcgIT0gJ3VuZGVmaW5lZCcgJiYgZGF0YS52aWV3LnRvTG93ZXJDYXNlKCkgPT0gJ2xpc3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93JykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0Lmxpc3QoaXRlbSwgZGF0YSkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93JykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0LmdyaWQoaXRlbSwgZGF0YSkgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZWxlX2NhcmQgPSBqUXVlcnkoJyNzZWFyY2gtcmVzdWx0LXJvdyBbZGF0YS1wb3N0LWlkPScrIGl0ZW0uX3Bvc3RJRCArJ10nKTtcblxuICAgICAgICAgICAgICAgIGpRdWVyeSgnW2RhdGEtbW9kYWxdJywgZWxlX2NhcmQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgdmVzc2VsSW5mbyA9IGl0ZW0uTW9kZWxZZWFyICsgJyAnICsgaXRlbS5NYWtlU3RyaW5nICsgJyAnICsgaXRlbS5Cb2F0TmFtZTtcblxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyN5YXRjaEhpZGRlbicpLnZhbCh2ZXNzZWxJbmZvKTtcblxuICAgICAgICAgICAgICAgICAgdmFyIGRhdGFfbW9kYWwgPSBqUXVlcnkodGhpcykuZGF0YSgnbW9kYWwnKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBqUXVlcnkoIGRhdGFfbW9kYWwgKS55c3BfbW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICBjbG9zZVRleHQ6ICdYJyxcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxDbGFzczogJ3lzcC1tb2RhbC1vcGVuJyxcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGFzczogJ3lzcC1tb2RlbC1jbG9zZSdcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgeXNwX21hcmtMb3ZlZFZlc3NlbCggZWxlX2NhcmQgKTsgICAgIFxuICAgICAgICAgICAgICAgIHlzcF9tYWtlQ29tcGFyZVZlc3NlbCggZWxlX2NhcmQgKTsgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGpRdWVyeSgnI3lhY2h0cy1wYWdpbmF0aW9uJykucGFnaW5hdGlvbih7XG4gICAgICAgICAgICAgICAgaXRlbXM6IGRhdGFfcmVzdWx0LnRvdGFsLFxuICAgICAgICAgICAgICAgIGl0ZW1zT25QYWdlOiAxMixcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogZGF0YS5wYWdlX2luZGV4LFxuICAgICAgICAgICAgICAgIHByZXZUZXh0OiB5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24ucHJldl90ZXh0LFxuICAgICAgICAgICAgICAgIG5leHRUZXh0OiB5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24ubmV4dF90ZXh0LFxuICAgICAgICAgICAgICAgIGVkZ2VzOiA0LFxuICAgICAgICAgICAgICAgIGRpc3BsYXllZFBhZ2VzOiA0LFxuICAgICAgICAgICAgICAgIGhyZWZUZXh0UHJlZml4OiBjdXJyZW50VVJMLnJlcGxhY2UobmV3IFJlZ0V4cChcInBhZ2VfaW5kZXgtKFxcXFxkKikoLylcIiwgXCJnXCIpLCBcIlwiKSsncGFnZV9pbmRleC0nLFxuICAgICAgICAgICAgICAgIGhyZWZUZXh0U3VmZml4OiAnLycsXG4gICAgICAgICAgICAgICAgb25QYWdlQ2xpY2s6IGZ1bmN0aW9uKHBhZ2VOdW1iZXIsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybSBpbnB1dFtuYW1lPXBhZ2VfaW5kZXhdJykudmFsdWU9cGFnZU51bWJlcjtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybURhdGFPYmplY3QgPSByYWl5c19nZXRfZm9ybV9kYXRhKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJykgKTtcblxuICAgICAgICAgICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoZm9ybURhdGFPYmplY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGpRdWVyeSgnI3NlYXJjaC1yZXN1bHQtcm93JykuYXBwZW5kKHlzcF90ZW1wbGF0ZXMubm9SZXN1bHRzKCkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBqUXVlcnkoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0pLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAoalF1ZXJ5KFwiLnNjcm9sbC10by1oZXJlLW9uLXlhY2h0LXNlYXJjaFwiKS5vZmZzZXQoKS50b3ApXG4gICAgICAgIH0sIDI1MCk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybTpub3QoI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0pJykuZGlzcGF0Y2hFdmVudCh5c3BBZnRlclJlbmRlcmluZ1lhY2h0KTtcblxuICAgICAgICByZXR1cm4gZGF0YV9yZXN1bHQ7XG5cbiAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcblxuICAgIH0pO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgIC8vIEZpbGwgTGlzdCBPcHRpb25zXG4gICAgbGV0IEZpbGxMaXN0cz1bXTtcbiAgICBsZXQgbGlzdEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRhdGFsaXN0W2RhdGEtZmlsbC1saXN0XVwiKTtcbiAgICBsZXQgbGlzdE5lZWRlZEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0W2xpc3RdXCIpO1xuXG4gICAgbGlzdEVsZW1lbnRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICBGaWxsTGlzdHMucHVzaChlbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtbGlzdCcpKTtcbiAgICB9KTtcblxuICAgIGxpc3ROZWVkZWRFbGVtZW50cy5mb3JFYWNoKChpbnB1dF9lbGUpID0+IHtcblxuICAgICAgICBpbnB1dF9lbGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgICAgICBsZXQgbGlzdF9pZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2xpc3QnKTtcblxuICAgICAgICAgICAgbGV0IGVsZV9saXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRhdGFsaXN0I1wiK2xpc3RfaWQpO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA8PSAzKSB7XG5cbiAgICAgICAgICAgICAgICByYWlfeXNwX2FwaS5jYWxsX2FwaShcbiAgICAgICAgICAgICAgICAgICAgJ1BPU1QnLCBcbiAgICAgICAgICAgICAgICAgICAgJ2xpc3Qtb3B0aW9ucy13aXRoLXZhbHVlJywgXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsczogWyBlbGVfbGlzdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1saXN0JykgXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGF0YWxpc3RbZGF0YS1maWxsLWxpc3Q9J1wiKyBsYWJlbCArXCInXVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0pO1xuXG4gICAgfSlcbiAgICBcbi8qICAgIHJhaV95c3BfYXBpLmNhbGxfYXBpKCdQT1NUJywgJ2xpc3Qtb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxMaXN0c30pLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcbiAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRhdGFsaXN0W2RhdGEtZmlsbC1saXN0PSdcIisgbGFiZWwgK1wiJ11cIik7XG5cbiAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGUuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuKi9cbiAgICBsZXQgeWFjaHRTZWFyY2hBbmRSZXN1bHRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm06bm90KCN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtKScpO1xuXG4gICAgaWYgKHlhY2h0U2VhcmNoQW5kUmVzdWx0cykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Blbi1tb2JpbGUtc2VhcmNoJykuZm9yRWFjaCgob21zZSkgPT4ge1xuICAgICAgICAgICAgb21zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3Atc3VwZXItbW9iaWxlLXNlYXJjaCcpLnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3dZPSdoaWRkZW4nO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuYWRkKCd5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1vcGVuJyk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9iaWxlLXNlYXJjaCcpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9iaWxlLXNlYXJjaCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1zdXBlci1tb2JpbGUtc2VhcmNoJykuc3R5bGUuZGlzcGxheT0nbm9uZSc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93WT0ndW5zZXQnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QucmVtb3ZlKCd5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1vcGVuJyk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICB5YWNodFNlYXJjaEFuZFJlc3VsdHMuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KHlzcEJlZm9yZVlhY2h0U2VhcmNoKTtcblxuICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPTE7XG5cbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSByYWl5c19nZXRfZm9ybV9kYXRhKGUudGFyZ2V0KTtcblxuICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKS50aGVuKGZ1bmN0aW9uKGFwaV9kYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KHlzcEFmdGVyWWFjaHRTZWFyY2gpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTsgXG5cbiAgICAgICAgeWFjaHRTZWFyY2hBbmRSZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LnN1Ym1pdC1vbi1jaGFuZ2UnKS5mb3JFYWNoKChlbGVJbnB1dCkgPT4ge1xuICAgICAgICAgICAgZWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHlhY2h0U2VhcmNoQW5kUmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPXJlc2V0XScpLmZvckVhY2goKGVsZVJlc2V0KSA9PiB7XG4gICAgICAgICAgICBlbGVSZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInlzX2NvbXBhbnlfb25seVwiXScpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwieXNfY29tcGFueV9vbmx5XCJdJykuZm9yRWFjaChmdW5jdGlvbihlbGVDaGVjaykge1xuICAgICAgICAgICAgICAgIGVsZUNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT12aWV3XVtmb3JtPXlzcC15YWNodC1zZWFyY2gtZm9ybV0sIHNlbGVjdFtuYW1lPXNvcnRieV1bZm9ybT15c3AteWFjaHQtc2VhcmNoLWZvcm1dJykuZm9yRWFjaCgoZWxlVmlld09wdGlvbikgPT4ge1xuICAgICAgICAgICAgZWxlVmlld09wdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBpY2stYWxsJykuZm9yRWFjaChmdW5jdGlvbihlbGUpIHtcbiAgICAgICAgICAgIGVsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIGxldCBpbnB1dF9uYW1lID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwiJysgaW5wdXRfbmFtZSArJ1wiXScpLmZvckVhY2goKGVsZUlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZUlucHV0LmNoZWNrZWQ9ZmFsc2U7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFBSRVRUWSBVUkxcbiAgICAgICAgbGV0IHN0cnBhdGhzPXdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgICAgIHN0cnBhdGhzPXN0cnBhdGhzLnJlcGxhY2UocmFpX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3BhZ2VfaWQsICcnKTtcblxuICAgICAgICBsZXQgcGF0aHMgPSBzdHJwYXRocy5zcGxpdChcIi9cIik7XG5cbiAgICAgICAgbGV0IHByZXR0eV91cmxfcGF0aF9wYXJhbXM9e307XG5cbiAgICAgICAgcGF0aHMuZm9yRWFjaChmdW5jdGlvbihwYXRoKSB7XG5cbiAgICAgICAgICAgIGlmIChwYXRoICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBoYXNlX3BhdGggPSBwYXRoLnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgbGV0IG9ubHlfdmFscz1waGFzZV9wYXRoLnNsaWNlKDEpO1xuXG4gICAgICAgICAgICAgICAgb25seV92YWxzPW9ubHlfdmFscy5qb2luKCcgJykuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IG9ubHlfdmFsc19hcnJheT0ob25seV92YWxzLnNwbGl0KCcrJykpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvbmx5X3ZhbHNfYXJyYXlbMV0gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb25seV92YWxzID0gb25seV92YWxzX2FycmF5Lm1hcCgob3YpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvdi5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhvbmx5X3ZhbHMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV09b25seV92YWxzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2cocHJldHR5X3VybF9wYXRoX3BhcmFtcyk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSBGaWVsZHNcblxuICAgICAgICBsZXQgVVJMUkVGPW5ldyBVUkwobG9jYXRpb24uaHJlZik7IC8vIG1heWJlIGZvciBhIHJlLWRvXG5cbiAgICAgICAgbGV0IGZvcm1JbnB1dHM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AteWFjaHQtc2VhcmNoLWZvcm1cIl0sICN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm1cIl0nKTtcblxuICAgICAgICBmb3JtSW5wdXRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGlucHV0ID0gZWxlO1xuXG4gICAgICAgICAgICBsZXQgbmFtZSA9IGVsZS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICAgICAgbGV0IHVybFZhbCA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCBuYW1lICk7XG4gICAgICAgICAgICAgICAgLy8gdXJsVmFsID0gO1xuICAgXG5cbiAgICAgICAgICAgIGxldCBoYXNQcmV0dHkgPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF07XG5cbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYXNQcmV0dHkgIT0gJ251bGwnICYmIHR5cGVvZiBoYXNQcmV0dHkgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGhhc1ByZXR0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhoYXNQcmV0dHkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGhhc1ByZXR0eS5mb3JFYWNoKChoUCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoUCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaGFzUHJldHR5ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUgIT0gJ2NoZWNrYm94JyAmJiBpbnB1dC50eXBlICE9ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gaGFzUHJldHR5O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHVybFZhbCAhPSAnJyAmJiB1cmxWYWwgIT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmxWYWwgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsVmFsID0gdXJsVmFsLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSB1cmxWYWwgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZSAhPSAnY2hlY2tib3gnICYmIGlucHV0LnR5cGUgIT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHVybFZhbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSBDb21wYXJlXG4gICAgICAgICB5c3BfcmVzdG9yZUNvbXBhcmVzKCk7XG5cbiAgICAgICAgLy8gRmlsbCBvcHRpb25zXG4gICAgICAgIGxldCBGaWxsT3B0aW9ucz1bXTtcbiAgICAgICAgbGV0IHNlbGVjdG9yRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zXVwiKTtcblxuICAgICAgICBzZWxlY3RvckVsZW1lbnRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgRmlsbE9wdGlvbnMucHVzaChlbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtb3B0aW9ucycpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByYWlfeXNwX2FwaS5jYWxsX2FwaSgnUE9TVCcsICdkcm9wZG93bi1vcHRpb25zJywge2xhYmVsczogRmlsbE9wdGlvbnN9KS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFtkYXRhLWZpbGwtb3B0aW9ucz0nXCIrIGxhYmVsICtcIiddXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coU2VsZWN0b3JFbGUpO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBTZWxlY3RvckVsZVswXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUuYWRkKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IFVSTFJFRiA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgICAgICAgbGV0IFVybFZhbCA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCBuYW1lICk7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3RycGF0aHM9d2luZG93LmxvY2F0aW9uLmhyZWY7XG5cbiAgICAgICAgICAgICAgICBzdHJwYXRocz1zdHJwYXRocy5yZXBsYWNlKHJhaV95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF9wYWdlX2lkLCAnJyk7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSBzdHJwYXRocy5zcGxpdChcIi9cIik7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5X3VybF9wYXRoX3BhcmFtcz17fTtcblxuICAgICAgICAgICAgICAgIHBhdGhzLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXRoICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGhhc2VfcGF0aCA9IHBhdGguc3BsaXQoJy0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHM9cGhhc2VfcGF0aC5zbGljZSgxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXT1vbmx5X3ZhbHMuam9pbignICcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoVXJsVmFsICE9ICcnICYmIFVybFZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coVXJsVmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIFVybFZhbCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVXJsVmFsID0gVXJsVmFsLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBVcmxWYWw7IFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlLnZhbHVlID09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gVXJsVmFsLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGhhc1ByZXR0eSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXTtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzUHJldHR5ICE9ICcnICYmIGhhc1ByZXR0eSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gaGFzUHJldHR5OyBcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS52YWx1ZSA9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IGhhc1ByZXR0eS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIFJlbmRlciBZYWNodHMgRm9yIFBhZ2UgTG9hZFxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHJhaXlzX2dldF9mb3JtX2RhdGEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuXG4gICAgICAgICAgICAvLyBMaWtlZCAvIExvdmVkIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMueXNfeWFjaHRzX2xvdmVkICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgbG92ZWRfeWFjaHRzID0gSlNPTi5wYXJzZSggbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykgKTtcblxuICAgICAgICAgICAgICAgIGlmIChsb3ZlZF95YWNodHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMueXNfb25seV90aGVzZSA9IGxvdmVkX3lhY2h0cy5qb2luKCcsJyk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy55c19vbmx5X3RoZXNlPVwiMCwwLDBcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKTsgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBtb2JpbGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0nKTtcblxuICAgICAgICBpZiAobW9iaWxlRm9ybSkge1xuICAgICAgICAgICAgbW9iaWxlRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPTE7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXN1cGVyLW1vYmlsZS1zZWFyY2gnKS5zdHlsZS5kaXNwbGF5PSdub25lJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3dZPSd1bnNldCc7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7ICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoIHBhcmFtcyApO1xuXG4gICAgICAgICAgICB9KTsgXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgIH1cblxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChlLCBhcGlFbmRwb2ludCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGZvcm1EYXRhID0gcmFpeXNfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7XG4gICAgICAgIGxldCBzdWNjZXNzTWVzc2FnZSA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnN1Y2Nlc3MtbWVzc2FnZScpO1xuICAgICAgICBjb25zb2xlLmxvZyhmb3JtRGF0YSlcbiAgICAgICAgcmFpX3lzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIGFwaUVuZHBvaW50LCBmb3JtRGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGFfcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgc3VjY2Vzc01lc3NhZ2Uuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgeWFjaHRGb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaW5nbGUteWFjaHQtZGV0aWxzLWxlYWQnKTtcbiAgICB5YWNodEZvcm1zLmZvckVhY2goKGZFbGUpID0+IHtcbiAgICAgICAgZkVsZS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVTdWJtaXQoZSwgXCJ5YWNodC1sZWFkc1wiKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgYnJva2VyRm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2luZ2xlLWJyb2tlci1kZXRpbHMtbGVhZCcpO1xuICAgIGJyb2tlckZvcm1zLmZvckVhY2goKGZFbGUpID0+IHtcbiAgICAgICAgZkVsZS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBoYW5kbGVTdWJtaXQoZSwgXCJicm9rZXItbGVhZHNcIik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=
