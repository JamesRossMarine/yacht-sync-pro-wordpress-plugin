"use strict";function _slicedToArray(t,e){return _arrayWithHoles(t)||_iterableToArrayLimit(t,e)||_unsupportedIterableToArray(t,e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function _iterableToArrayLimit(t,e){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=a){var n,s,i,o,r=[],c=!0,l=!1;try{if(i=(a=a.call(t)).next,0===e){if(Object(a)!==a)return;c=!1}else for(;!(c=(n=i.call(a)).done)&&(r.push(n.value),r.length!==e);c=!0);}catch(t){l=!0,s=t}finally{try{if(!c&&null!=a.return&&(o=a.return(),Object(o)!==o))return}finally{if(l)throw s}}return r}}function _arrayWithHoles(t){if(Array.isArray(t))return t}function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}function copyLink(){var t=document.getElementById("copyLinkInput");t.select(),t.setSelectionRange(0,99999),document.execCommand("copy"),alert("Copied the link: "+t.value)}function raiys_get_form_data(t){for(var e=new FormData(t),a=Object.fromEntries(e.entries()),n=0,s=Object.entries(a);n<s.length;n++){var i=_slicedToArray(s[n],2),o=i[0],r=(i[1],e.getAll(o));void 0!==r[1]&&(a[o]=r),""==a[o]&&delete a[o]}return a}function raiys_set_form_to_data(t){var e=document.querySelector(".ysp-yacht-search-form"),a=document.querySelector("#ysp-mobile-yacht-search-form");e.reset(),a.reset(),document.querySelectorAll('.ysp-yacht-search-form *[name], *[name][form="ysp-yacht-search-form"], #ysp-mobile-yacht-search-form *[name], *[name][form="ysp-mobile-yacht-search-form"]').forEach((function(e){var a=e,n=e.getAttribute("name"),s=t[n];"null"!=typeof s&&void 0!==s&&(Array.isArray(s)?s.forEach((function(t){void 0===a.type||"checkbox"!=a.type&&"radio"!=a.type||a.getAttribute("value")!=t||(a.checked=!0)})):void 0===a.type||"checkbox"!=a.type&&"radio"!=a.type||a.getAttribute("value")!=s?"checkbox"!=a.type&&"radio"!=a.type&&(a.value=s):a.checked=!0)}))}function raiys_push_history(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=new URLSearchParams,a="";for(var n in t){var s=t[n];""!=s&&void 0!==s&&"string"==typeof s&&"OnFirstLoad"!=n&&"object"!=_typeof(s)?(e.set(n,s),a=(a=a+""+n+"-"+s.toString().split(" ").join("-")+"/").toLowerCase()):Array.isArray(s)&&(e.set(n,s),a=(a=a+""+n+"-"+(s=s.map((function(t){return t.toString().split(" ").join("-")}))).join("+")+"/").toLowerCase())}return history.pushState(t,"",rai_yacht_sync.yacht_search_url+a),rai_yacht_sync.yacht_search_url+a}!function(t){var e={init:function(a){var n=t.extend({items:1,itemsOnPage:1,pages:0,displayedPages:5,edges:2,currentPage:0,useAnchors:!0,hrefTextPrefix:"#page-",hrefTextSuffix:"",prevText:"Prev",nextText:"Next",ellipseText:"&hellip;",ellipsePageSet:!0,cssStyle:"light-theme",listStyle:"",labelMap:[],selectOnClick:!0,nextAtFront:!1,invertPageOrder:!1,useStartEdge:!0,useEndEdge:!0,onPageClick:function(t,e){},onInit:function(){}},a||{}),s=this;return n.pages=n.pages?n.pages:Math.ceil(n.items/n.itemsOnPage)?Math.ceil(n.items/n.itemsOnPage):1,n.currentPage?n.currentPage=n.currentPage-1:n.currentPage=n.invertPageOrder?n.pages-1:0,n.halfDisplayed=n.displayedPages/2,this.each((function(){s.addClass(n.cssStyle+" simple-pagination").data("pagination",n),e._draw.call(s)})),n.onInit(),this},selectPage:function(t){return e._selectPage.call(this,t-1),this},prevPage:function(){var t=this.data("pagination");return t.invertPageOrder?t.currentPage<t.pages-1&&e._selectPage.call(this,t.currentPage+1):t.currentPage>0&&e._selectPage.call(this,t.currentPage-1),this},nextPage:function(){var t=this.data("pagination");return t.invertPageOrder?t.currentPage>0&&e._selectPage.call(this,t.currentPage-1):t.currentPage<t.pages-1&&e._selectPage.call(this,t.currentPage+1),this},getPagesCount:function(){return this.data("pagination").pages},setPagesCount:function(t){this.data("pagination").pages=t},getCurrentPage:function(){return this.data("pagination").currentPage+1},destroy:function(){return this.empty(),this},drawPage:function(t){var a=this.data("pagination");return a.currentPage=t-1,this.data("pagination",a),e._draw.call(this),this},redraw:function(){return e._draw.call(this),this},disable:function(){var t=this.data("pagination");return t.disabled=!0,this.data("pagination",t),e._draw.call(this),this},enable:function(){var t=this.data("pagination");return t.disabled=!1,this.data("pagination",t),e._draw.call(this),this},updateItems:function(t){var a=this.data("pagination");a.items=t,a.pages=e._getPages(a),this.data("pagination",a),e._draw.call(this)},updateItemsOnPage:function(t){var a=this.data("pagination");return a.itemsOnPage=t,a.pages=e._getPages(a),this.data("pagination",a),e._selectPage.call(this,0),this},getItemsOnPage:function(){return this.data("pagination").itemsOnPage},_draw:function(){var a,n=this.data("pagination"),s=e._getInterval(n);e.destroy.call(this);var i="UL"===("function"==typeof this.prop?this.prop("tagName"):this.attr("tagName"))?this:t("<ul"+(n.listStyle?' class="'+n.listStyle+'"':"")+"></ul>").appendTo(this);if(n.prevText&&e._appendItem.call(this,n.invertPageOrder?n.currentPage+1:n.currentPage-1,{text:n.prevText,classes:"prev"}),n.nextText&&n.nextAtFront&&e._appendItem.call(this,n.invertPageOrder?n.currentPage-1:n.currentPage+1,{text:n.nextText,classes:"next"}),n.invertPageOrder){if(s.end<n.pages&&n.edges>0){if(n.useStartEdge){var o=Math.max(n.pages-n.edges,s.end);for(a=n.pages-1;a>=o;a--)e._appendItem.call(this,a)}n.pages-n.edges>s.end&&n.pages-n.edges-s.end!=1?i.append('<li class="disabled"><span class="ellipse">'+n.ellipseText+"</span></li>"):n.pages-n.edges-s.end==1&&e._appendItem.call(this,s.end)}}else if(s.start>0&&n.edges>0){if(n.useStartEdge){var r=Math.min(n.edges,s.start);for(a=0;a<r;a++)e._appendItem.call(this,a)}n.edges<s.start&&s.start-n.edges!=1?i.append('<li class="disabled"><span class="ellipse">'+n.ellipseText+"</span></li>"):s.start-n.edges==1&&e._appendItem.call(this,n.edges)}if(n.invertPageOrder)for(a=s.end-1;a>=s.start;a--)e._appendItem.call(this,a);else for(a=s.start;a<s.end;a++)e._appendItem.call(this,a);if(n.invertPageOrder){if(s.start>0&&n.edges>0&&(n.edges<s.start&&s.start-n.edges!=1?i.append('<li class="disabled"><span class="ellipse">'+n.ellipseText+"</span></li>"):s.start-n.edges==1&&e._appendItem.call(this,n.edges),n.useEndEdge))for(a=(r=Math.min(n.edges,s.start))-1;a>=0;a--)e._appendItem.call(this,a)}else if(s.end<n.pages&&n.edges>0&&(n.pages-n.edges>s.end&&n.pages-n.edges-s.end!=1?i.append('<li class="disabled"><span class="ellipse">'+n.ellipseText+"</span></li>"):n.pages-n.edges-s.end==1&&e._appendItem.call(this,s.end),n.useEndEdge))for(a=o=Math.max(n.pages-n.edges,s.end);a<n.pages;a++)e._appendItem.call(this,a);n.nextText&&!n.nextAtFront&&e._appendItem.call(this,n.invertPageOrder?n.currentPage-1:n.currentPage+1,{text:n.nextText,classes:"next"}),n.ellipsePageSet&&!n.disabled&&e._ellipseClick.call(this,i)},_getPages:function(t){return Math.ceil(t.items/t.itemsOnPage)||1},_getInterval:function(t){return{start:Math.ceil(t.currentPage>t.halfDisplayed?Math.max(Math.min(t.currentPage-t.halfDisplayed,t.pages-t.displayedPages),0):0),end:Math.ceil(t.currentPage>t.halfDisplayed?Math.min(t.currentPage+t.halfDisplayed,t.pages):Math.min(t.displayedPages,t.pages))}},_appendItem:function(a,n){var s,i,o=this,r=o.data("pagination"),c=t("<li></li>"),l=o.find("ul");s={text:(a=a<0?0:a<r.pages?a:r.pages-1)+1,classes:""},r.labelMap.length&&r.labelMap[a]&&(s.text=r.labelMap[a]),s=t.extend(s,n||{}),a==r.currentPage||r.disabled?(r.disabled||"prev"===s.classes||"next"===s.classes?c.addClass("disabled"):c.addClass("active"),i=t('<span class="current">'+s.text+"</span>")):(i=r.useAnchors?t('<a href="'+r.hrefTextPrefix+(a+1)+r.hrefTextSuffix+'" class="page-link">'+s.text+"</a>"):t("<span >"+s.text+"</span>")).click((function(t){return e._selectPage.call(o,a,t)})),s.classes&&i.addClass(s.classes),c.append(i),l.length?l.append(c):o.append(c)},_selectPage:function(t,a){var n=this.data("pagination");return n.currentPage=t,n.selectOnClick&&e._draw.call(this),n.onPageClick(t+1,a)},_ellipseClick:function(a){var n=this,s=this.data("pagination"),i=a.find(".ellipse");i.addClass("clickable").parent().removeClass("disabled"),i.click((function(a){if(!s.disable){var o=t(this),r=(parseInt(o.parent().prev().text(),10)||0)+1;o.html('<input type="number" min="1" max="'+s.pages+'" step="1" value="'+r+'">').find("input").focus().click((function(t){t.stopPropagation()})).keyup((function(a){var o=t(this).val();13===a.which&&""!==o?o>0&&o<=s.pages&&e._selectPage.call(n,o-1):27===a.which&&i.empty().html(s.ellipseText)})).bind("blur",(function(a){var o=t(this).val();return""!==o&&e._selectPage.call(n,o-1),i.empty().html(s.ellipseText),!1}))}return!1}))}};t.fn.pagination=function(a){return e[a]&&"_"!=a.charAt(0)?e[a].apply(this,Array.prototype.slice.call(arguments,1)):"object"!==_typeof(a)&&a?void t.error("Method "+a+" does not exist on jQuery.pagination"):e.init.apply(this,arguments)}}(jQuery),function(t){"object"===("undefined"==typeof module?"undefined":_typeof(module))&&"object"===_typeof(module.exports)?t(require("jquery"),window,document):t(jQuery,window,document)}((function(t,e,a,n){var s=[],i=function(){return s.length?s[s.length-1]:null},o=function(){var t,e=!1;for(t=s.length-1;t>=0;t--)s[t].$blocker&&(s[t].$blocker.toggleClass("current",!e).toggleClass("behind",e),e=!0)};t.ysp_modal=function(e,a){var n,o;if(this.$body=t("body"),this.options=t.extend({},t.ysp_modal.defaults,a),this.options.doFade=!isNaN(parseInt(this.options.fadeDuration,10)),this.$blocker=null,this.options.closeExisting)for(;t.ysp_modal.isActive();)t.ysp_modal.close();if(s.push(this),e.is("a"))if(o=e.attr("href"),this.anchor=e,/^#/.test(o)){if(this.$elm=t(o),1!==this.$elm.length)return null;this.$body.append(this.$elm),this.open()}else this.$elm=t("<div>"),this.$body.append(this.$elm),n=function(t,e){e.elm.remove()},this.showSpinner(),e.trigger(t.ysp_modal.AJAX_SEND),t.get(o).done((function(a){if(t.ysp_modal.isActive()){e.trigger(t.ysp_modal.AJAX_SUCCESS);var s=i();s.$elm.empty().append(a).on(t.ysp_modal.CLOSE,n),s.hideSpinner(),s.open(),e.trigger(t.ysp_modal.AJAX_COMPLETE)}})).fail((function(){e.trigger(t.ysp_modal.AJAX_FAIL),i().hideSpinner(),s.pop(),e.trigger(t.ysp_modal.AJAX_COMPLETE)}));else this.$elm=e,this.anchor=e,this.$body.append(this.$elm),this.open()},t.ysp_modal.prototype={constructor:t.ysp_modal,open:function(){var e=this;this.block(),this.anchor.blur(),this.options.doFade?setTimeout((function(){e.show()}),this.options.fadeDuration*this.options.fadeDelay):this.show(),t(a).off("keydown.modal").on("keydown.modal",(function(t){var e=i();27===t.which&&e.options.escapeClose&&e.close()})),this.options.clickClose&&this.$blocker.click((function(e){e.target===this&&t.ysp_modal.close()}))},close:function(){s.pop(),this.unblock(),this.hide(),t.ysp_modal.isActive()||t(a).off("keydown.modal")},block:function(){this.$elm.trigger(t.ysp_modal.BEFORE_BLOCK,[this._ctx()]),this.$body.css("overflow","hidden"),this.$blocker=t('<div class="'+this.options.blockerClass+' blocker current"></div>').appendTo(this.$body),o(),this.options.doFade&&this.$blocker.css("opacity",0).animate({opacity:1},this.options.fadeDuration),this.$elm.trigger(t.ysp_modal.BLOCK,[this._ctx()])},unblock:function(e){!e&&this.options.doFade?this.$blocker.fadeOut(this.options.fadeDuration,this.unblock.bind(this,!0)):(this.$blocker.children().appendTo(this.$body),this.$blocker.remove(),this.$blocker=null,o(),t.ysp_modal.isActive()||this.$body.css("overflow",""))},show:function(){this.$elm.trigger(t.ysp_modal.BEFORE_OPEN,[this._ctx()]),this.options.showClose&&(this.closeButton=t('<a href="#close-modal" rel="modal:close" class="close-modal '+this.options.closeClass+'">'+this.options.closeText+"</a>"),this.$elm.append(this.closeButton)),this.$elm.addClass(this.options.modalClass).appendTo(this.$blocker),this.options.doFade?this.$elm.css({opacity:0,display:"inline-block"}).animate({opacity:1},this.options.fadeDuration):this.$elm.css("display","inline-block"),this.$elm.trigger(t.ysp_modal.OPEN,[this._ctx()])},hide:function(){this.$elm.trigger(t.ysp_modal.BEFORE_CLOSE,[this._ctx()]),this.closeButton&&this.closeButton.remove();var e=this;this.options.doFade?this.$elm.fadeOut(this.options.fadeDuration,(function(){e.$elm.trigger(t.ysp_modal.AFTER_CLOSE,[e._ctx()])})):this.$elm.hide(0,(function(){e.$elm.trigger(t.ysp_modal.AFTER_CLOSE,[e._ctx()])})),this.$elm.trigger(t.ysp_modal.CLOSE,[this._ctx()])},showSpinner:function(){this.options.showSpinner&&(this.spinner=this.spinner||t('<div class="'+this.options.modalClass+'-spinner"></div>').append(this.options.spinnerHtml),this.$body.append(this.spinner),this.spinner.show())},hideSpinner:function(){this.spinner&&this.spinner.remove()},_ctx:function(){return{elm:this.$elm,$elm:this.$elm,$blocker:this.$blocker,options:this.options,$anchor:this.anchor}}},t.ysp_modal.close=function(e){if(t.ysp_modal.isActive()){e&&e.preventDefault();var a=i();return a.close(),a.$elm}},t.ysp_modal.isActive=function(){return s.length>0},t.ysp_modal.getCurrent=i,t.ysp_modal.defaults={closeExisting:!0,escapeClose:!0,clickClose:!0,closeText:"Close",closeClass:"",modalClass:"ysp-modal",blockerClass:"jquery-modal",spinnerHtml:'<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div>',showSpinner:!0,showClose:!0,fadeDuration:null,fadeDelay:1},t.ysp_modal.BEFORE_BLOCK="modal:before-block",t.ysp_modal.BLOCK="modal:block",t.ysp_modal.BEFORE_OPEN="modal:before-open",t.ysp_modal.OPEN="modal:open",t.ysp_modal.BEFORE_CLOSE="modal:before-close",t.ysp_modal.CLOSE="modal:close",t.ysp_modal.AFTER_CLOSE="modal:after-close",t.ysp_modal.AJAX_SEND="modal:ajax:send",t.ysp_modal.AJAX_SUCCESS="modal:ajax:success",t.ysp_modal.AJAX_FAIL="modal:ajax:fail",t.ysp_modal.AJAX_COMPLETE="modal:ajax:complete",t.fn.ysp_modal=function(e){return 1===this.length&&new t.ysp_modal(this,e),this},t(a).on("click.modal",'a[rel~="modal:close"]',t.ysp_modal.close),t(a).on("click.modal",'a[rel~="modal:open"]',(function(e){e.preventDefault(),t(this).modal()}))})),jQuery(document).ready((function(){jQuery("[data-modal]").click((function(t){t.preventDefault(),console.log("fuck me ");var e=jQuery(this).data("modal");jQuery(e).ysp_modal({closeText:"X",modalClass:"ysp-modal-open",closeClass:"ysp-model-close"})}))})),Object.defineProperty(String.prototype,"eachWordCapitalize",{value:function(){return this.toLowerCase().split(" ").map((function(t){return t.charAt(0).toUpperCase()+t.substring(1)})).join(" ")},enumerable:!1});var rai_ysp_api={call_api:function(t,e,a){var n=new XMLHttpRequest;return new Promise((function(s,i){switch(n.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var t=JSON.parse(this.responseText);s(t)}},t){case"GET":var o=new URLSearchParams;if(0!=a.length)for(var r in a)o.set(r,a[r]);var c=o.toString();n.open("GET",rai_yacht_sync.wp_rest_url+"raiys/"+e+(""!=c?"?"+o.toString():""),!0),n.send();break;case"POST":n.open("POST",rai_yacht_sync.wp_rest_url+"raiys/"+e,!0),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(a))}}))}},ysp_templates={};function ysp_makeSearchTags(t){var e=document.querySelectorAll(".ysp-search-tags");if(e){e.forEach((function(t){t.innerHTML=""}));var a=["page_index",""],n=function(n){var s="";document.querySelector("label[for="+n+"]")?s=document.querySelector("label[for="+n+"]").innerText:document.querySelector("*[name="+n+"]")&&document.querySelector("*[name="+n+"]").hasAttribute("label")&&(s=document.querySelector("*[name="+n+"]").getAttribute("label")),e.forEach((function(e){if(-1==a.indexOf(n)){var i=document.querySelector(".ysp-yacht-search-form *[name="+n+"]");if(i){var o=document.createElement("span"),r=t[n];if("SELECT"==i.tagName&&(r=i.options[i.selectedIndex].innerText),n.match("price")&&(r="$"+r),n.match("length")&&"lengthunit"!=n){var c=document.querySelector(".ysp-yacht-search-form [name=lengthunit]:checked");c||(c=document.querySelector(".ysp-yacht-search-form [name=lengthunit]")),r+=" ",c&&(r+=c.value)}o.className="btn btn-primary btn-sm ysp-tag",o.innerHTML=null!=s&&"null"!=s&&""!=s?ysp_templates.yacht_tag(s,r):ysp_templates.yacht_tag("",r),o.setAttribute("key",n),e.appendChild(o),console.log(document.querySelector('.ysp-tag[key="'+n+'"]')),console.log('.ysp-tag[key="'+n+'"]'),document.querySelectorAll('span.ysp-tag[key="'+n+'"]').forEach((function(t){t.addEventListener("click",(function(t){console.log(t);var e=t.currentTarget.getAttribute("key");console.log(e);var a=document.querySelectorAll(".ysp-yacht-search-form select[name="+e+"], .ysp-yacht-search-form input[name="+e+"]");console.log(a),a.forEach((function(t){void 0===t.type||"checkbox"!=t.type&&"radio"!=t.type?t.value="":t.checked=!1})),t.currentTarget.remove(),a[0].form.requestSubmit()}))}))}}}))};for(var s in t)n(s)}}function ysp_markLovedVessel(t){if(jQuery(".love",t).click((function(e){e.preventDefault(),jQuery(this).toggleClass("loved");var a=jQuery(this).data("yacht-id");jQuery(this).hasClass("loved")?ysp_addLovedVessel(a):(ysp_removeLovedVessel(a),void 0!==raiys_get_form_data(document.querySelector(".ysp-yacht-search-form")).ys_yachts_loved&&t.remove())})),""!=localStorage.getItem("ysp_loved_vessels")){var e=JSON.parse(localStorage.getItem("ysp_loved_vessels"));null==e&&(e=[]);var a=t.data("yacht-id");-1!=e.indexOf(a)&&(t.addClass("loved"),jQuery(".love",t).addClass("loved"))}}function ysp_addLovedVessel(t){var e=JSON.parse(localStorage.getItem("ysp_loved_vessels"));null==e&&(e=[]),-1==e.indexOf(t)&&e.push(t),console.log(e),localStorage.setItem("ysp_loved_vessels",JSON.stringify(e))}function ysp_removeLovedVessel(t){var e=JSON.parse(localStorage.getItem("ysp_loved_vessels"));null==e&&(e=[]);var a=e.indexOf(t);console.log(a),-1!=a&&(delete e[a],e.splice(a,1)),console.log(e),localStorage.setItem("ysp_loved_vessels",JSON.stringify(e))}ysp_templates.yacht={},ysp_templates.yacht.grid=function(t,e){var a=.3048*parseInt(t.NominalLength),n="",s="";return"yes"==rai_yacht_sync.europe_option_picked?(s=t.NominalLength?a.toFixed(2)+" m":"N/A",n=void 0!==t.YSP_EuroVal&&t.YSP_EuroVal>0?"€".concat(new Intl.NumberFormat("en-us",{minimumFractionDigits:2}).format(t.YSP_EuroVal)):"Contact Us For Price"):(s=t.NominalLength?t.NominalLength+" / "+a.toFixed(2)+" m":"N/A",n="Eur"==e.currency?void 0!==t.YSP_USDVal&&t.YSP_USDVal>0?"€".concat(new Intl.NumberFormat("en-us",{minimumFractionDigits:2}).format(t.YSP_EuroVal)):"Contact Us For Price":void 0!==t.YSP_USDVal&&t.YSP_USDVal>0?"$".concat(new Intl.NumberFormat("en-us",{minimumFractionDigits:2}).format(t.YSP_USDVal)):"Contact Us For Price"),'\n\t\t\t<div class="yacht-result-grid-item" data-post-id="'.concat(t._postID,'" data-yacht-id="').concat(t.DocumentID,'">\n\t\t\t\t<div class="yacht-main-image-container">\n\t\t\t\t\t<a class="yacht-details" href="').concat(t._link,'">\n\t\t\t\t\t\t<img class="yacht-main-image" src="').concat(t.Images?t.Images[0].Uri:rai_yacht_sync.assets_url+"images/default-yacht-image.jpeg",'" alt="yacht-image" loading="lazy" />\n\t\t\t\t\t\t').concat(t.CompanyName===rai_yacht_sync.company_name?'<div class="company-banner"><img src="'.concat(rai_yacht_sync.company_logo,'"></div>'):"",'\n\t\t\t\t\t</a>\t\n\t\t\t\t</div>\n\t\t\t\t<div class="yacht-general-info-container">\n\t\t\t\t\t<div class="yacht-title-container">\n\t\t\t\t\t\t<a class="yacht-details" href="').concat(t._link,'">\n\t\t\t\t\t\t\t<h6 class="yacht-title">').concat(t.ModelYear?t.ModelYear:""," ").concat(t.MakeString?t.MakeString:""," ").concat(t.Model?t.Model:""," ").concat(t.BoatName?t.BoatName:"",'</h6>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="yacht-info-container">\n\t\t\t\t\t\t<div class="yacht-info">\n\t\t\t\t\t\t\t<div class="yacht-individual-container">\n\t\t\t\t\t\t\t\t<p class="yacht-individual-title">Year</p>\n\t\t\t\t\t\t\t\t<p class="yacht-individual-value">').concat(t.ModelYear?t.ModelYear:"N/A",'</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="yacht-individual-container">\n\t\t\t\t\t\t\t\t<p class="yacht-individual-title">Cabins</p>\n\t\t\t\t\t\t\t\t<p class="yacht-individual-value">').concat(t.CabinsCountNumeric?t.CabinsCountNumeric:"N/A",'</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="yacht-individual-container">\n\t\t\t\t\t\t\t\t<p class="yacht-individual-title">Builder</p>\n\t\t\t\t\t\t\t\t<p class="yacht-individual-value">').concat(t.MakeString?t.MakeString:"N/A",'</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="yacht-individual-container">\n\t\t\t\t\t\t\t\t<p class="yacht-individual-title">Length</p>\n\t\t\t\t\t\t\t\t<p class="yacht-individual-value">').concat(s,'</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="yacht-individual-container">\n\t\t\t\t\t\t\t\t<p class="yacht-individual-title">Compare</p>\n\t\t\t\t\t\t\t\t<p class="yacht-individual-value"><input type="checkbox" class="compare_toggle" name="compare" value="').concat(t._postID,'" /></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="yacht-price-details-container">\n\t\t\t\t\t\t<div class="yacht-price-container">\n\t\t\t\t\t\t\t<p class="yacht-price">').concat(n,'</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<button class="yacht-download-button" type="button" data-modal="#single-share">Contact</button>\n\t\t\t\t\t\t<button class="love" type="button" data-yacht-id="').concat(t.DocumentID,'">Liked</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t')},ysp_templates.yacht.list=function(t){var e=.3048*parseInt(t.NominalLength),a="";if("string"==typeof t.Price)t.Price.slice(0,-3);var n="";return"yes"==rai_yacht_sync.europe_option_picked?(n=t.NominalLength?e.toFixed(2)+" m":"N/A",a=t.Price?"€ ".concat(new Intl.NumberFormat("en-us",{minimumFractionDigits:2}).format(parseInt(t.Price.slice(0,-3))*rai_yacht_sync.euro_c_c)):"Contact Us For Price"):(n=t.NominalLength?t.NominalLength+" / "+e.toFixed(2)+" m":"N/A",a=t.Price?"$ ".concat(new Intl.NumberFormat("en-us",{minimumFractionDigits:2}).format(parseInt(t.Price.slice(0,-3)))):"Contact Us For Price"),'\n\t\t\t<div class="yacht-result-grid-item list-view" data-post-id="'.concat(t._postID,'">\n\t\t\t\t<div class="yacht-main-image-container">\n\t\t\t\t\t<a class="yacht-details" href="').concat(t._link,'">\n\t\t\t\t\t\t<img class="yacht-main-image" src="').concat(t.Images||t.Images?t.Images[0].Uri:rai_yacht_sync.assets_url+"images/default-yacht-image.jpeg",'" alt="yacht-image" loading="lazy" />\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t\t<div class="yacht-general-info-container">\n\t\t\t\t\t<div class="yacht-title-container">\n\t\t\t\t\t\t<a class="yacht-details" href="').concat(t._link,'">\n\t\t\t\t\t\t\t<h6 class="yacht-title">').concat(t.ModelYear?t.ModelYear:""," ").concat(t.MakeString?t.MakeString:""," ").concat(t.Model?t.Model:""," ").concat(t.BoatName?t.BoatName:"",'</h6>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="yacht-info-container">\n\t\t\t\t\t\t<div class="yacht-info">\n\t\t\t\t\t\t\t<div class="yacht-individual-container">\n\t\t\t\t\t\t\t\t<p class="yacht-individual-title">Year</p>\n\t\t\t\t\t\t\t\t<p class="yacht-individual-value">').concat(t.ModelYear?t.ModelYear:"N/A",'</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="yacht-individual-container">\n\t\t\t\t\t\t\t\t<p class="yacht-individual-title">Cabins</p>\n\t\t\t\t\t\t\t\t<p class="yacht-individual-value">').concat(t.CabinsCountNumeric?t.CabinsCountNumeric:"N/A",'</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="yacht-individual-container">\n\t\t\t\t\t\t\t\t<p class="yacht-individual-title">Builder</p>\n\t\t\t\t\t\t\t\t<p class="yacht-individual-value">').concat(t.MakeString?t.MakeString:"N/A",'</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="yacht-individual-container">\n\t\t\t\t\t\t\t\t<p class="yacht-individual-title">Length</p>\n\t\t\t\t\t\t\t\t<p class="yacht-individual-value">').concat(n,'</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="yacht-price-details-container">\n\t\t\t\t\t\t<div class="yacht-price-container">\n\t\t\t\t\t\t\t<p class="yacht-price">').concat(a,'</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button class="yacht-download-button" type="button" data-modal="#single-share">Contact</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t')},ysp_templates.yacht.compare_preview=function(t,e){return'\n\n\t\t\t<div class="ysp-yacht-compare-preview" data-post-id="'.concat(t._postID,'" data-yacht-id="').concat(t.DocumentID,'">\t\t\t\n\t\t\t\t<span class="remove-from-compare">\n\t\t\t\t\t<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t<rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#6B7073"/>\n\t\t\t\t\t<path d="M8.26876 14.9346C8.04909 15.1543 8.04909 15.5104 8.26876 15.7301C8.48843 15.9498 8.84458 15.9498 9.06425 15.7301L8.26876 14.9346ZM12.3976 12.3968C12.6173 12.1771 12.6173 11.8209 12.3976 11.6013C12.1779 11.3816 11.8218 11.3816 11.6021 11.6013L12.3976 12.3968ZM11.6018 11.6016C11.3821 11.8213 11.3821 12.1774 11.6018 12.3971C11.8214 12.6168 12.1776 12.6168 12.3973 12.3971L11.6018 11.6016ZM15.7306 9.06376C15.9503 8.84409 15.9503 8.48794 15.7306 8.26827C15.5109 8.0486 15.1548 8.0486 14.9351 8.26827L15.7306 9.06376ZM12.3973 11.6013C12.1776 11.3816 11.8214 11.3816 11.6018 11.6013C11.3821 11.8209 11.3821 12.1771 11.6018 12.3968L12.3973 11.6013ZM14.9351 15.7301C15.1548 15.9498 15.5109 15.9498 15.7306 15.7301C15.9503 15.5104 15.9503 15.1543 15.7306 14.9346L14.9351 15.7301ZM11.6021 12.3971C11.8218 12.6168 12.1779 12.6168 12.3976 12.3971C12.6173 12.1774 12.6173 11.8213 12.3976 11.6016L11.6021 12.3971ZM9.06425 8.26827C8.84458 8.0486 8.48843 8.0486 8.26876 8.26827C8.04909 8.48794 8.04909 8.84409 8.26876 9.06376L9.06425 8.26827ZM9.06425 15.7301L12.3976 12.3968L11.6021 11.6013L8.26876 14.9346L9.06425 15.7301ZM12.3973 12.3971L15.7306 9.06376L14.9351 8.26827L11.6018 11.6016L12.3973 12.3971ZM11.6018 12.3968L14.9351 15.7301L15.7306 14.9346L12.3973 11.6013L11.6018 12.3968ZM12.3976 11.6016L9.06425 8.26827L8.26876 9.06376L11.6021 12.3971L12.3976 11.6016Z" fill="#6B7073"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</span>\n\n\n\t\t\t\t<img class="yacht-main-image" src="').concat(t.Images?t.Images[0].Uri:rai_yacht_sync.assets_url+"images/default-yacht-image.jpeg",'" alt="yacht-image" loading="lazy" />\n\n\t\t\t\t<h6 class="yacht-title">').concat(t.ModelYear?t.ModelYear:""," ").concat(t.MakeString?t.MakeString:""," ").concat(t.Model?t.Model:""," ").concat(t.BoatName?t.BoatName:"","</h6>\n\n\t\t\t</div>\n\n\t\t")},ysp_templates.noResults=function(){return"\n            <div>\n                <b>No Results</b>\n            </div>\n        "},ysp_templates.yacht_tag=function(t,e){return"\n    \t\t<span>\n\t    \t\t".concat(e,'\n\n\t    \t\t<img src="').concat(rai_yacht_sync.assets_url,'/images/remove-tag.png">\n\t\t\t</span>\n    \t')},ysp_templates.pagination={},ysp_templates.pagination.next_text=">",ysp_templates.pagination.prev_text="<",document.addEventListener("DOMContentLoaded",(function(){if(document.querySelector(".ysp-quick-search-form")){var t=[];document.querySelectorAll(".ysp-quick-search-form select[data-fill-options]").forEach((function(e){t.push(e.getAttribute("data-fill-options"))})),rai_ysp_api.call_api("POST","dropdown-options",{labels:t}).then((function(t){var e=function(){var e=document.querySelectorAll(".ysp-quick-search-form select[data-fill-options='"+a+"']"),n=e[0].getAttribute("name");t[a].forEach((function(t){e.forEach((function(e){var a=document.createElement("OPTION");a.text=t,a.value=t,e.add(a)}))}));var s=new URL(location.href).searchParams.get(n),i=window.location.href,o=(i=i.replace(rai_yacht_sync.yacht_search_page_id,"")).split("/"),r={};o.forEach((function(t){if(""!=t){var e=t.split("-"),a=e.slice(1);r[e[0]]=a.join(" "),"string"==typeof r[e[0]]&&(r[e[0]]=r[e[0]].eachWordCapitalize())}})),""!=s&&null!=s&&(console.log(s),"string"==typeof s&&(s=s.eachWordCapitalize()),e.forEach((function(t){t.value=s})));var c=r[n];console.log(r[n]),""!=c&&null!=c&&e.forEach((function(t){t.value=c}))};for(var a in t)e()}))}}));var YSP_VesselCompareList=[];function ysp_restoreCompares(){var t=new URL(location.href).searchParams.get("restore_to_compare");console.log(_typeof(t)),console.log(t),"string"==typeof t&&(YSP_VesselCompareList=t.split(","),ysp_makeCompareLinkout())}function ysp_makeCompareVessel(t){jQuery(".compare_toggle",t).change((function(e){console.log("howdy"),e.preventDefault(),jQuery(this).toggleClass("armed");var a=t.data("post-id");jQuery(this).hasClass("armed")?ysp_addVesselToCompareList(a):ysp_removeVesselToCompareList(a)}));var e=t.data("post-id");-1==YSP_VesselCompareList.indexOf(e)&&-1==YSP_VesselCompareList.indexOf(e.toString())||(console.log("hello world restored"),t.addClass("armed"),jQuery(".compare_toggle",t).addClass("armed").prop("checked",!0))}function ysp_addVesselToCompareList(t){-1==YSP_VesselCompareList.indexOf(t)&&YSP_VesselCompareList.push(t),ysp_makeCompareLinkout()}function ysp_removeVesselToCompareList(t){var e=YSP_VesselCompareList.indexOf(t);-1!=e&&(delete YSP_VesselCompareList[e],YSP_VesselCompareList.splice(e,1)),ysp_makeCompareLinkout()}function ysp_makeCompareLinkout(){if(YSP_VesselCompareList.length>=2){document.getElementById("ysp_compare_linkout").href=rai_yacht_sync.wp_rest_url+"raiys/compare/?postID="+YSP_VesselCompareList.join(","),document.getElementById("ysp_compare_linkout").innerHTML='<button type="button">Compare ( '.concat(YSP_VesselCompareList.length," )</button>");var t={post__in:YSP_VesselCompareList};return rai_ysp_api.call_api("POST","yachts",t).then((function(e){e.results.forEach((function(e){jQuery("#ysp-compare-previews").append(ysp_templates.yacht.compare_preview(e,t));var a=jQuery("#ysp-compare-previews [data-post-id="+e._postID+"]");jQuery(".remove-from-compare",a).click((function(){console.log("hello");var t=jQuery("#search-result-row [data-post-id="+e._postID+"]");jQuery(".compare_toggle",t).prop("checked",!1).removeClass("armed"),ysp_removeVesselToCompareList(e._postID),ysp_makeCompareLinkout()}))}))}))}jQuery("#ysp-compare-previews").html(""),jQuery("#ysp_compare_linkout").html("")}var yspBeforeYachtSearch=new Event("ysp-before-submitting-yacht-search"),yspAfterYachtSearch=new Event("ysp-after-submitting-yacht-search"),yspAfterRenderingYacht=new Event("ysp-after-rendering-yacht-search");function ysp_yacht_search_and_reader(t){return console.log(t),jQuery("#search-result-row").html(""),document.querySelector("#search-result-section").classList.remove("loaded"),document.querySelector("#search-result-section").classList.add("loading"),raiys_set_form_to_data(t),ysp_makeSearchTags(t),rai_ysp_api.call_api("POST","yachts",t).then((function(e){document.querySelector("#search-result-section").classList.remove("loading"),document.querySelector("#search-result-section").classList.add("loaded"),document.title=e.SEO.title,jQuery("#ysp-search-heading").text(e.SEO.heading),jQuery("#ysp-search-paragraph").text(e.SEO.gpt_p),jQuery("#total-results").text(new Intl.NumberFormat("en-IN",{maximumSignificantDigits:3}).format(e.total));var a=null;return a=void 0===t.dont_push?raiys_push_history(t):location.href,jQuery("#yachts-pagination").html(""),e.total>0?(e.results.forEach((function(e){void 0!==t.view&&"list"==t.view.toLowerCase()?jQuery("#search-result-row").append(ysp_templates.yacht.list(e,t)):jQuery("#search-result-row").append(ysp_templates.yacht.grid(e,t));var a=jQuery("#search-result-row [data-post-id="+e._postID+"]");jQuery("[data-modal]",a).click((function(t){t.preventDefault();var a=e.ModelYear+" "+e.MakeString+" "+e.BoatName;jQuery("#yatchHidden").val(a);var n=jQuery(this).data("modal");jQuery(n).ysp_modal({closeText:"X",modalClass:"ysp-modal-open",closeClass:"ysp-model-close"})})),ysp_markLovedVessel(a),ysp_makeCompareVessel(a)})),jQuery("#yachts-pagination").pagination({items:e.total,itemsOnPage:12,currentPage:t.page_index,prevText:ysp_templates.pagination.prev_text,nextText:ysp_templates.pagination.next_text,edges:4,displayedPages:4,hrefTextPrefix:a.replace(new RegExp("page_index-(\\d*)(/)","g"),"")+"page_index-",hrefTextSuffix:"/",onPageClick:function(t,e){e.preventDefault(),document.querySelector(".ysp-yacht-search-form input[name=page_index]").value=t,ysp_yacht_search_and_reader(raiys_get_form_data(document.querySelector(".ysp-yacht-search-form")))}})):jQuery("#search-result-row").append(ysp_templates.noResults()),jQuery([document.documentElement,document.body]).animate({scrollTop:jQuery(".scroll-to-here-on-yacht-search").offset().top},250),document.querySelector(".ysp-yacht-search-form:not(#ysp-mobile-yacht-search-form)").dispatchEvent(yspAfterRenderingYacht),e})).catch((function(t){console.log(t)}))}document.addEventListener("DOMContentLoaded",(function(){var t=[],e=document.querySelectorAll("datalist[data-fill-list]"),a=document.querySelectorAll("input[list]");e.forEach((function(e){t.push(e.getAttribute("data-fill-list"))})),a.forEach((function(t){t.addEventListener("input",(function(t){var e=t.target.getAttribute("list"),a=document.querySelector("datalist#"+e);t.target.value.length<=3&&rai_ysp_api.call_api("POST","list-options-with-value",{labels:[a.getAttribute("data-fill-list")],value:t.target.value}).then((function(t){var e=function(){var e=document.querySelectorAll("datalist[data-fill-list='"+a+"']");e.forEach((function(t){t.innerHTML=""})),t[a].forEach((function(t){var a=document.createElement("OPTION");a.text=t,a.value=t,e.forEach((function(t){t.append(a)}))}))};for(var a in t)e()}))}))}));var n=document.querySelector(".ysp-yacht-search-form:not(#ysp-mobile-yacht-search-form)");if(n){document.querySelectorAll(".open-mobile-search").forEach((function(t){t.addEventListener("click",(function(t){document.querySelector("#ysp-super-mobile-search").style.display="block",document.querySelector("body").style.overflowY="hidden",document.querySelector("body").classList.add("ysp-mobile-yacht-search-open")}))})),document.querySelector("#close-mobile-search")&&document.querySelector("#close-mobile-search").addEventListener("click",(function(t){document.querySelector("#ysp-super-mobile-search").style.display="none",document.querySelector("body").style.overflowY="unset",document.querySelector("body").classList.remove("ysp-mobile-yacht-search-open")})),n.addEventListener("submit",(function(t){t.preventDefault(),t.target.dispatchEvent(yspBeforeYachtSearch),t.target.querySelector("input[name=page_index]").value=1,ysp_yacht_search_and_reader(raiys_get_form_data(t.target)).then((function(e){t.target.dispatchEvent(yspAfterYachtSearch)}))})),n.querySelectorAll("input.submit-on-change").forEach((function(t){t.addEventListener("change",(function(t){t.target.form.requestSubmit()}))})),n.querySelectorAll("input[type=reset]").forEach((function(t){t.addEventListener("click",(function(t){t.target.form.requestSubmit()}))})),document.querySelector('input[name="ys_company_only"]')&&document.querySelectorAll('input[name="ys_company_only"]').forEach((function(t){t.addEventListener("change",(function(t){t.target.form.requestSubmit()}))})),document.querySelectorAll("input[name=view][form=ysp-yacht-search-form], select[name=sortby][form=ysp-yacht-search-form]").forEach((function(t){t.addEventListener("change",(function(t){t.target.form.requestSubmit()}))})),document.querySelectorAll(".pick-all").forEach((function(t){t.addEventListener("click",(function(t){var e=t.target.getAttribute("name");document.querySelectorAll('input[name="'+e+'"]').forEach((function(t){t.checked=!1}))}))}));var s=window.location.href,i=(s=s.replace(rai_yacht_sync.yacht_search_page_id,"")).split("/"),o={};i.forEach((function(t){if(""!=t){var e=t.split("-"),a=e.slice(1),n=(a=a.join(" ").eachWordCapitalize()).split("+");void 0!==n[1]&&(a=n.map((function(t){return t.eachWordCapitalize()}))),o[e[0]]=a}}));var r=new URL(location.href);document.querySelectorAll('.ysp-yacht-search-form *[name], *[name][form="ysp-yacht-search-form"], #ysp-mobile-yacht-search-form *[name], *[name][form="ysp-mobile-yacht-search-form"]').forEach((function(t){var e=t,a=t.getAttribute("name"),n=r.searchParams.get(a),s=o[a];"null"!=typeof s&&void 0!==s&&(Array.isArray(s)?s.forEach((function(t){void 0===e.type||"checkbox"!=e.type&&"radio"!=e.type||e.getAttribute("value")!=t||(e.checked=!0)})):void 0===e.type||"checkbox"!=e.type&&"radio"!=e.type||e.getAttribute("value")!=s?"checkbox"!=e.type&&"radio"!=e.type&&(e.value=s):e.checked=!0),""!=n&&null!=n&&("string"==typeof n&&(n=n.eachWordCapitalize()),void 0===e.type||"checkbox"!=e.type&&"radio"!=e.type||e.getAttribute("value")!=n?"checkbox"!=e.type&&"radio"!=e.type&&(e.value=n):e.checked=!0)})),ysp_restoreCompares();var c=[];document.querySelectorAll("select[data-fill-options]").forEach((function(t){c.push(t.getAttribute("data-fill-options"))})),rai_ysp_api.call_api("POST","dropdown-options",{labels:c}).then((function(t){var e=function(){var e=document.querySelectorAll("select[data-fill-options='"+a+"']");console.log(e);var n=e[0].getAttribute("name");t[a].forEach((function(t){e.forEach((function(e){var a=document.createElement("OPTION");a.text=t,a.value=t,e.add(a)}))}));var s=new URL(location.href).searchParams.get(n),i=window.location.href,o=(i=i.replace(rai_yacht_sync.yacht_search_page_id,"")).split("/"),r={};o.forEach((function(t){if(""!=t){var e=t.split("-"),a=e.slice(1);r[e[0]]=a.join(" "),"string"==typeof r[e[0]]&&(r[e[0]]=r[e[0]].eachWordCapitalize())}})),""!=s&&null!=s&&("string"==typeof s&&(s=s.eachWordCapitalize()),e.forEach((function(t){t.value=s,""==t.value&&(t.value=s.toUpperCase())})));var c=r[n];""!=c&&null!=c&&e.forEach((function(t){t.value=c,""==t.value&&(t.value=c.toUpperCase())}))};for(var a in t)e()})).then((function(){var t=raiys_get_form_data(document.querySelector(".ysp-yacht-search-form"));if(console.log(t),void 0!==t.ys_yachts_loved){var e=JSON.parse(localStorage.getItem("ysp_loved_vessels"));e.length>0?t.ys_only_these=e.join(","):t.ys_only_these="0,0,0"}ysp_yacht_search_and_reader(t)}));var l=document.querySelector("#ysp-mobile-yacht-search-form");l&&l.addEventListener("submit",(function(t){t.preventDefault(),t.target.querySelector("input[name=page_index]").value=1,document.querySelector("#ysp-super-mobile-search").style.display="none",document.querySelector("body").style.overflowY="unset",ysp_yacht_search_and_reader(raiys_get_form_data(t.target))}))}})),document.addEventListener("DOMContentLoaded",(function(){function t(t,e){t.preventDefault();var a=raiys_get_form_data(t.target),n=t.target.parentElement.querySelector(".success-message");console.log(a),rai_ysp_api.call_api("POST",e,a).then((function(e){n.style.display="block",t.target.style.display="none"})).catch((function(t){console.log(t)}))}document.querySelectorAll(".single-yacht-detils-lead").forEach((function(e){e.addEventListener("submit",(function(e){t(e,"yacht-leads")}))})),document.querySelectorAll(".single-broker-detils-lead").forEach((function(e){e.addEventListener("submit",(function(e){t(e,"broker-leads")}))}))}));