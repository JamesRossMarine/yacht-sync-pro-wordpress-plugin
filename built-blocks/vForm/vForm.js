!function(){"use strict";var e={n:function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,{a:n}),n},d:function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.element,n=window.wp.blocks,r=window.wp.blockEditor,o=window.wp.serverSideRender,c=e.n(o);(0,n.registerBlockType)("ysp-blocks/vform-block",{icon:"universal-access-alt",attributes:{},edit:function(e){return(0,t.createElement)("div",{...(0,r.useBlockProps)()},(0,t.createElement)(c(),{block:"ysp-blocks/vform-block",attributes:e.attributes}))},save:function(e){return null}})}();