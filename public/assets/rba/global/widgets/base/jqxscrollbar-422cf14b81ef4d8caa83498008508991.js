!function(t){t.jqx.jqxWidget("jqxScrollBar","",{}),t.extend(t.jqx._jqxScrollBar.prototype,{defineInstance:function(){this.height=null,this.width=null,this.vertical=!1,this.min=0,this.max=1e3,this.value=this.min,this.step=10,this.largestep=50,this.thumbMinSize=10,this.thumbSize=0,this.thumbStep="auto",this.roundedCorners="all",this.showButtons=!0,this.disabled=!1,this.touchMode="auto",this.touchModeStyle="auto",this.thumbTouchSize=0,this._triggervaluechanged=!0,this.rtl=!1,this.areaDownCapture=!1,this.areaUpCapture=!1,this._initialLayout=!1},createInstance:function(){this.render()},render:function(){this._mouseup=new Date;var e=this,s="<div id='jqxScrollOuterWrap' style='width:100%; height: 100%; align:left; border: 0px; valign:top; position: relative;'><div id='jqxScrollWrap' style='width:100%; height: 100%; left: 0px; top: 0px; align:left; valign:top; position: absolute;'><div id='jqxScrollBtnUp' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='jqxScrollAreaUp' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='jqxScrollThumb' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='jqxScrollAreaDown' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='jqxScrollBtnDown' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div></div></div>";if(t.jqx.utilities&&"hidden"==t.jqx.utilities.scrollBarButtonsVisibility&&(this.showButtons=!1),e.WinJS?MSApp.execUnsafeLocalFunction(function(){e.host.html(s)}):this.element.innerHTML=s,void 0!=this.width&&parseInt(this.width)>0&&this.host.width(parseInt(this.width)),void 0!=this.height&&parseInt(this.height)>0&&this.host.height(parseInt(this.height)),this.isPercentage=!1,null!=this.width&&-1!=this.width.toString().indexOf("%")&&(this.host.width(this.width),this.isPercentage=!0),null!=this.height&&-1!=this.height.toString().indexOf("%")&&(this.host.height(this.height),this.isPercentage=!0),this.isPercentage){var i=this;t.jqx.utilities.resize(this.host,function(){i._arrange()},!1)}this.thumbCapture=!1,this.scrollOuterWrap=t(this.element.firstChild),this.scrollWrap=t(this.scrollOuterWrap[0].firstChild),this.btnUp=t(this.scrollWrap[0].firstChild),this.areaUp=t(this.btnUp[0].nextSibling),this.btnThumb=t(this.areaUp[0].nextSibling),this.arrowUp=t("<div></div>"),this.arrowUp.appendTo(this.btnUp),this.areaDown=t(this.btnThumb[0].nextSibling),this.btnDown=t(this.areaDown[0].nextSibling),this.arrowDown=t("<div></div>"),this.arrowDown.appendTo(this.btnDown);var r=this.element.id;if(this.btnUp[0].id="jqxScrollBtnUp"+r,this.btnDown[0].id="jqxScrollBtnDown"+r,this.btnThumb[0].id="jqxScrollThumb"+r,this.areaUp[0].id="jqxScrollAreaUp"+r,this.areaDown[0].id="jqxScrollAreaDown"+r,this.scrollWrap[0].id="jqxScrollWrap"+r,this.scrollOuterWrap[0].id="jqxScrollOuterWrap"+r,!this.host.jqxRepeatButton)throw new Error("jqxScrollBar: Missing reference to jqxbuttons.js.");this.btnUp.jqxRepeatButton({_ariaDisabled:!0,overrideTheme:!0,disabled:this.disabled}),this.btnDown.jqxRepeatButton({_ariaDisabled:!0,overrideTheme:!0,disabled:this.disabled}),this.btnDownInstance=t.data(this.btnDown[0],"jqxRepeatButton").instance,this.btnUpInstance=t.data(this.btnUp[0],"jqxRepeatButton").instance,this.areaUp.jqxRepeatButton({_scrollAreaButton:!0,_ariaDisabled:!0,overrideTheme:!0}),this.areaDown.jqxRepeatButton({_scrollAreaButton:!0,_ariaDisabled:!0,overrideTheme:!0}),this.btnThumb.jqxButton({_ariaDisabled:!0,overrideTheme:!0,disabled:this.disabled}),this.propertyChangeMap.value=function(t,e,s,i){isNaN(i)||s!=i&&t.setPosition(parseFloat(i),!0)},this.propertyChangeMap.width=function(t){void 0!=t.width&&parseInt(t.width)>0&&(t.host.width(parseInt(t.width)),t._arrange())},this.propertyChangeMap.height=function(t){void 0!=t.height&&parseInt(t.height)>0&&(t.host.height(parseInt(t.height)),t._arrange())},this.propertyChangeMap.theme=function(t){t.setTheme()},this.propertyChangeMap.max=function(t,e,s,i){isNaN(i)||s!=i&&(t.max=parseInt(i),t.min>t.max&&(t.max=t.min+1),t._arrange(),t.setPosition(t.value))},this.propertyChangeMap.min=function(t,e,s,i){isNaN(i)||s!=i&&(t.min=parseInt(i),t.min>t.max&&(t.max=t.min+1),t._arrange(),t.setPosition(t.value))},this.propertyChangeMap.disabled=function(t,e,s,i){s!=i&&(i?t.host.addClass(t.toThemeProperty("jqx-fill-state-disabled")):t.host.removeClass(t.toThemeProperty("jqx-fill-state-disabled")),t.btnUp.jqxRepeatButton("disabled",t.disabled),t.btnDown.jqxRepeatButton("disabled",t.disabled),t.btnThumb.jqxButton("disabled",t.disabled))},this.propertyChangeMap.touchMode=function(t,e,s,i){s!=i&&(t._updateTouchBehavior(),i===!0?(t.showButtons=!1,t.refresh()):i===!1&&(t.showButtons=!0,t.refresh()))},this.buttonUpCapture=!1,this.buttonDownCapture=!1,this._updateTouchBehavior(),this.setPosition(this.value),this._addHandlers(),this.setTheme()},resize:function(t,e){this.width=t,this.height=e,this._arrange()},_updateTouchBehavior:function(){if(this.isTouchDevice=t.jqx.mobile.isTouchDevice(),1==this.touchMode){if(t.jqx.browser.msie&&t.jqx.browser.version<9)return void this.setTheme();this.isTouchDevice=!0,t.jqx.mobile.setMobileSimulator(this.btnThumb[0]),this._removeHandlers(),this._addHandlers(),this.setTheme()}else 0==this.touchMode&&(this.isTouchDevice=!1)},_addHandlers:function(){var e=this,s=!1;try{("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)&&(s=!0,this._touchSupport=!0)}catch(i){}if((e.isTouchDevice||s)&&(this.addHandler(this.btnThumb,t.jqx.mobile.getTouchEventName("touchend"),function(t){var s=e.toThemeProperty(e.vertical?"jqx-scrollbar-thumb-state-pressed":"jqx-scrollbar-thumb-state-pressed-horizontal"),i=e.toThemeProperty("jqx-fill-state-pressed");return e.btnThumb.removeClass(s),e.btnThumb.removeClass(i),e.disabled||e.handlemouseup(e,t),!1}),this.addHandler(this.btnThumb,t.jqx.mobile.getTouchEventName("touchstart"),function(t){if(!e.disabled){if(1==e.touchMode)t.clientX=t.originalEvent.clientX,t.clientY=t.originalEvent.clientY;else{var s=t;s.originalEvent.touches&&s.originalEvent.touches.length?(t.clientX=s.originalEvent.touches[0].clientX,t.clientY=s.originalEvent.touches[0].clientY):(t.clientX=t.originalEvent.clientX,t.clientY=t.originalEvent.clientY)}e.handlemousedown(t),t.preventDefault&&t.preventDefault()}}),t.jqx.mobile.touchScroll(this.element,e.max,function(t,s,i,r,o){if("visible"==e.host.css("visibility")){if(1==e.touchMode)o.clientX=o.originalEvent.clientX,o.clientY=o.originalEvent.clientY;else{var h=o;h.originalEvent.touches&&h.originalEvent.touches.length?(o.clientX=h.originalEvent.touches[0].clientX,o.clientY=h.originalEvent.touches[0].clientY):(o.clientX=o.originalEvent.clientX,o.clientY=o.originalEvent.clientY)}var a=e.toThemeProperty(e.vertical?"jqx-scrollbar-thumb-state-pressed":"jqx-scrollbar-thumb-state-pressed-horizontal");e.btnThumb.addClass(a),e.btnThumb.addClass(e.toThemeProperty("jqx-fill-state-pressed")),e.thumbCapture=!0,e.handlemousemove(o)}},e.element.id)),this.addHandler(this.btnUp,"click",function(){var t=e.step;e.rtl&&!e.vertical&&(t=-e.step),e.buttonUpCapture&&!e.isTouchDevice?e.disabled||e.setPosition(e.value-t):!e.disabled&&e.isTouchDevice&&e.setPosition(e.value-t)}),this.addHandler(this.btnDown,"click",function(){var t=e.step;e.rtl&&!e.vertical&&(t=-e.step),e.buttonDownCapture&&!e.isTouchDevice?e.disabled||e.setPosition(e.value+t):!e.disabled&&e.isTouchDevice&&e.setPosition(e.value+t)}),!this.isTouchDevice){try{if((""!=document.referrer||window.frameElement)&&null!=window.top&&window.top!=window.self){var r=null;if(window.parent&&document.referrer&&(r=document.referrer),r&&-1!=r.indexOf(document.location.host)){var o=function(t){e.disabled||e.handlemouseup(e,t)};window.top.document.addEventListener?window.top.document.addEventListener("mouseup",o,!1):window.top.document.attachEvent&&window.top.document.attachEvent("onmouseup",o)}}}catch(h){}this.addHandler(this.btnDown,"mouseup",function(t){if(!e.btnDownInstance.base.disabled&&e.buttonDownCapture){e.buttonDownCapture=!1,e.btnDown.removeClass(e.toThemeProperty("jqx-scrollbar-button-state-pressed")),e.btnDown.removeClass(e.toThemeProperty("jqx-fill-state-pressed")),e._removeArrowClasses("pressed","down"),e.handlemouseup(e,t);var s=e.step;return e.rtl&&!e.vertical&&(s=-e.step),e.setPosition(e.value+s),!1}}),this.addHandler(this.btnUp,"mouseup",function(t){if(!e.btnUpInstance.base.disabled&&e.buttonUpCapture){e.buttonUpCapture=!1,e.btnUp.removeClass(e.toThemeProperty("jqx-scrollbar-button-state-pressed")),e.btnUp.removeClass(e.toThemeProperty("jqx-fill-state-pressed")),e._removeArrowClasses("pressed","up"),e.handlemouseup(e,t);var s=e.step;return e.rtl&&!e.vertical&&(s=-e.step),e.setPosition(e.value-s),!1}}),this.addHandler(this.btnDown,"mousedown",function(){return e.btnDownInstance.base.disabled?void 0:(e.buttonDownCapture=!0,e.btnDown.addClass(e.toThemeProperty("jqx-fill-state-pressed")),e.btnDown.addClass(e.toThemeProperty("jqx-scrollbar-button-state-pressed")),e._addArrowClasses("pressed","down"),!1)}),this.addHandler(this.btnUp,"mousedown",function(){return e.btnUpInstance.base.disabled?void 0:(e.buttonUpCapture=!0,e.btnUp.addClass(e.toThemeProperty("jqx-fill-state-pressed")),e.btnUp.addClass(e.toThemeProperty("jqx-scrollbar-button-state-pressed")),e._addArrowClasses("pressed","up"),!1)})}var a="click";if(this.isTouchDevice&&(a=t.jqx.mobile.getTouchEventName("touchend")),this.addHandler(this.areaUp,a,function(){if(!e.disabled){var t=e.largestep;return e.rtl&&!e.vertical&&(t=-e.largestep),e.setPosition(e.value-t),!1}}),this.addHandler(this.areaDown,a,function(){if(!e.disabled){var t=e.largestep;return e.rtl&&!e.vertical&&(t=-e.largestep),e.setPosition(e.value+t),!1}}),this.addHandler(this.areaUp,"mousedown",function(){return e.disabled?void 0:(e.areaUpCapture=!0,!1)}),this.addHandler(this.areaDown,"mousedown",function(){return e.disabled?void 0:(e.areaDownCapture=!0,!1)}),this.addHandler(this.btnThumb,"mousedown",function(t){return e.disabled||e.handlemousedown(t),!1}),this.addHandler(this.btnThumb,"dragstart",function(){return!1}),this.addHandler(t(document),"mouseup."+this.element.id,function(t){e.disabled||e.handlemouseup(e,t)}),!this.isTouchDevice&&(this.mousemoveFunc=function(t){e.disabled||e.handlemousemove(t)},this.addHandler(t(document),"mousemove."+this.element.id,this.mousemoveFunc),this.addHandler(t(document),"mouseleave."+this.element.id,function(t){e.disabled||e.handlemouseleave(t)}),this.addHandler(t(document),"mouseenter."+this.element.id,function(t){e.disabled||e.handlemouseenter(t)}),!e.disabled)){this.addHandler(this.btnUp,"mouseenter",function(){e.disabled||e.btnUpInstance.base.disabled||1==e.touchMode||(e.btnUp.addClass(e.toThemeProperty("jqx-scrollbar-button-state-hover")),e.btnUp.addClass(e.toThemeProperty("jqx-fill-state-hover")),e._addArrowClasses("hover","up"))}),this.addHandler(this.btnUp,"mouseleave",function(){e.disabled||e.btnUpInstance.base.disabled||1==e.touchMode||(e.btnUp.removeClass(e.toThemeProperty("jqx-scrollbar-button-state-hover")),e.btnUp.removeClass(e.toThemeProperty("jqx-fill-state-hover")),e._removeArrowClasses("hover","up"))});var n=e.toThemeProperty("jqx-scrollbar-thumb-state-hover");e.vertical||(n=e.toThemeProperty("jqx-scrollbar-thumb-state-hover-horizontal")),this.addHandler(this.btnThumb,"mouseenter",function(){e.disabled||1==e.touchMode||(e.btnThumb.addClass(n),e.btnThumb.addClass(e.toThemeProperty("jqx-fill-state-hover")))}),this.addHandler(this.btnThumb,"mouseleave",function(){e.disabled||1==e.touchMode||(e.btnThumb.removeClass(n),e.btnThumb.removeClass(e.toThemeProperty("jqx-fill-state-hover")))}),this.addHandler(this.btnDown,"mouseenter",function(){e.disabled||e.btnDownInstance.base.disabled||1==e.touchMode||(e.btnDown.addClass(e.toThemeProperty("jqx-scrollbar-button-state-hover")),e.btnDown.addClass(e.toThemeProperty("jqx-fill-state-hover")),e._addArrowClasses("hover","down"))}),this.addHandler(this.btnDown,"mouseleave",function(){e.disabled||e.btnDownInstance.base.disabled||1==e.touchMode||(e.btnDown.removeClass(e.toThemeProperty("jqx-scrollbar-button-state-hover")),e.btnDown.removeClass(e.toThemeProperty("jqx-fill-state-hover")),e._removeArrowClasses("hover","down"))})}},destroy:function(){var e=this.btnUp,s=this.btnDown,i=this.btnThumb,r=(this.scrollWrap,this.areaUp),o=this.areaDown;this.arrowUp.remove(),delete this.arrowUp,this.arrowDown.remove(),delete this.arrowDown,o.removeClass(),r.removeClass(),s.removeClass(),e.removeClass(),i.removeClass(),e.jqxRepeatButton("destroy"),s.jqxRepeatButton("destroy"),r.jqxRepeatButton("destroy"),o.jqxRepeatButton("destroy"),i.jqxButton("destroy");var h=t.data(this.element,"jqxScrollBar");this._removeHandlers(),this.btnUp=null,this.btnDown=null,this.scrollWrap=null,this.areaUp=null,this.areaDown=null,this.scrollOuterWrap=null,delete this.mousemoveFunc,delete this.btnDownInstance,delete this.btnUpInstance,delete this.scrollOuterWrap,delete this.scrollWrap,delete this.btnDown,delete this.areaDown,delete this.areaUp,delete this.btnDown,delete this.btnUp,delete this.btnThumb,delete this.propertyChangeMap.value,delete this.propertyChangeMap.min,delete this.propertyChangeMap.max,delete this.propertyChangeMap.touchMode,delete this.propertyChangeMap.disabled,delete this.propertyChangeMap.theme,delete this.propertyChangeMap,h&&delete h.instance,this.host.removeData(),this.host.remove(),delete this.host,delete this.set,delete this.get,delete this.call,delete this.element},_removeHandlers:function(){this.removeHandler(this.btnUp,"mouseenter"),this.removeHandler(this.btnDown,"mouseenter"),this.removeHandler(this.btnThumb,"mouseenter"),this.removeHandler(this.btnUp,"mouseleave"),this.removeHandler(this.btnDown,"mouseleave"),this.removeHandler(this.btnThumb,"mouseleave"),this.removeHandler(this.btnUp,"click"),this.removeHandler(this.btnDown,"click"),this.removeHandler(this.btnDown,"mouseup"),this.removeHandler(this.btnUp,"mouseup"),this.removeHandler(this.btnDown,"mousedown"),this.removeHandler(this.btnUp,"mousedown"),this.removeHandler(this.areaUp,"mousedown"),this.removeHandler(this.areaDown,"mousedown"),this.removeHandler(this.areaUp,"click"),this.removeHandler(this.areaDown,"click"),this.removeHandler(this.btnThumb,"mousedown"),this.removeHandler(this.btnThumb,"dragstart"),this.removeHandler(t(document),"mouseup."+this.element.id),this.mousemoveFunc?this.removeHandler(t(document),"mousemove."+this.element.id,this.mousemoveFunc):this.removeHandler(t(document),"mousemove."+this.element.id),this.removeHandler(t(document),"mouseleave."+this.element.id),this.removeHandler(t(document),"mouseenter."+this.element.id)},_addArrowClasses:function(t,e){"pressed"==t&&(t="selected"),""!=t&&(t="-"+t),this.vertical?(("up"==e||void 0==e)&&this.arrowUp.addClass(this.toThemeProperty("jqx-icon-arrow-up"+t)),("down"==e||void 0==e)&&this.arrowDown.addClass(this.toThemeProperty("jqx-icon-arrow-down"+t))):(("up"==e||void 0==e)&&this.arrowUp.addClass(this.toThemeProperty("jqx-icon-arrow-left"+t)),("down"==e||void 0==e)&&this.arrowDown.addClass(this.toThemeProperty("jqx-icon-arrow-right"+t)))},_removeArrowClasses:function(t,e){"pressed"==t&&(t="selected"),""!=t&&(t="-"+t),this.vertical?(("up"==e||void 0==e)&&this.arrowUp.removeClass(this.toThemeProperty("jqx-icon-arrow-up"+t)),("down"==e||void 0==e)&&this.arrowDown.removeClass(this.toThemeProperty("jqx-icon-arrow-down"+t))):(("up"==e||void 0==e)&&this.arrowUp.removeClass(this.toThemeProperty("jqx-icon-arrow-left"+t)),("down"==e||void 0==e)&&this.arrowDown.removeClass(this.toThemeProperty("jqx-icon-arrow-right"+t)))},setTheme:function(){var e=this.btnUp,s=this.btnDown,i=this.btnThumb,r=this.scrollWrap,o=(this.areaUp,this.areaDown,this.arrowUp),h=this.arrowDown;this.scrollWrap[0].className=this.toThemeProperty("jqx-reset"),this.scrollOuterWrap[0].className=this.toThemeProperty("jqx-reset");var a=this.toThemeProperty("jqx-reset");this.areaDown[0].className=a,this.areaUp[0].className=a;var n=this.toThemeProperty("jqx-scrollbar")+" "+this.toThemeProperty("jqx-widget")+" "+this.toThemeProperty("jqx-widget-content");this.host.addClass(n),s[0].className=this.toThemeProperty("jqx-scrollbar-button-state-normal"),e[0].className=this.toThemeProperty("jqx-scrollbar-button-state-normal");var l="";if(this.vertical?(o[0].className=a+" "+this.toThemeProperty("jqx-icon-arrow-up"),h[0].className=a+" "+this.toThemeProperty("jqx-icon-arrow-down"),l=this.toThemeProperty("jqx-scrollbar-thumb-state-normal")):(o[0].className=a+" "+this.toThemeProperty("jqx-icon-arrow-left"),h[0].className=a+" "+this.toThemeProperty("jqx-icon-arrow-right"),l=this.toThemeProperty("jqx-scrollbar-thumb-state-normal-horizontal")),l+=" "+this.toThemeProperty("jqx-fill-state-normal"),i[0].className=l,this.disabled?(r.addClass(this.toThemeProperty("jqx-fill-state-disabled")),r.removeClass(this.toThemeProperty("jqx-scrollbar-state-normal"))):(r.addClass(this.toThemeProperty("jqx-scrollbar-state-normal")),r.removeClass(this.toThemeProperty("jqx-fill-state-disabled"))),"all"==this.roundedCorners)if(this.host.addClass(this.toThemeProperty("jqx-rc-all")),this.vertical){var d=t.jqx.cssroundedcorners("top");d=this.toThemeProperty(d),e.addClass(d);var u=t.jqx.cssroundedcorners("bottom");u=this.toThemeProperty(u),s.addClass(u)}else{var p=t.jqx.cssroundedcorners("left");p=this.toThemeProperty(p),e.addClass(p);var m=t.jqx.cssroundedcorners("right");m=this.toThemeProperty(m),s.addClass(m)}else{var c=t.jqx.cssroundedcorners(this.roundedCorners);c=this.toThemeProperty(c),elBtnUp.addClass(c),elBtnDown.addClass(c)}var c=t.jqx.cssroundedcorners(this.roundedCorners);c=this.toThemeProperty(c),i.hasClass(c)||i.addClass(c),this.isTouchDevice&&0!=this.touchModeStyle&&(this.showButtons=!1,i.addClass(this.toThemeProperty("jqx-scrollbar-thumb-state-normal-touch")))},isScrolling:function(){return void 0==this.thumbCapture||void 0==this.buttonDownCapture||void 0==this.buttonUpCapture||void 0==this.areaDownCapture||void 0==this.areaUpCapture?!1:this.thumbCapture||this.buttonDownCapture||this.buttonUpCapture||this.areaDownCapture||this.areaUpCapture},handlemousedown:function(t){if(void 0==this.thumbCapture||0==this.thumbCapture){this.thumbCapture=!0;var e=this.btnThumb;null!=e&&(e.addClass(this.toThemeProperty("jqx-fill-state-pressed")),e.addClass(this.vertical?this.toThemeProperty("jqx-scrollbar-thumb-state-pressed"):this.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal")))}this.dragStartX=t.clientX,this.dragStartY=t.clientY,this.dragStartValue=this.value},toggleHover:function(){},refresh:function(){this._arrange()},_setElementPosition:function(t,e,s){isNaN(e)||parseInt(t[0].style.left)!=parseInt(e)&&(t[0].style.left=e+"px"),isNaN(s)||parseInt(t[0].style.top)!=parseInt(s)&&(t[0].style.top=s+"px")},_setElementTopPosition:function(t,e){isNaN(e)||(t[0].style.top=e+"px")},_setElementLeftPosition:function(t,e){isNaN(e)||(t[0].style.left=e+"px")},handlemouseleave:function(){var t=this.btnUp,e=this.btnDown;if((this.buttonDownCapture||this.buttonUpCapture)&&(t.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")),e.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")),this._removeArrowClasses("pressed")),1==this.thumbCapture){var s=this.btnThumb,i=this.toThemeProperty(this.vertical?"jqx-scrollbar-thumb-state-pressed":"jqx-scrollbar-thumb-state-pressed-horizontal");s.removeClass(i),s.removeClass(this.toThemeProperty("jqx-fill-state-pressed"))}},handlemouseenter:function(){var t=this.btnUp,e=this.btnDown;if(this.buttonUpCapture&&(t.addClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")),t.addClass(this.toThemeProperty("jqx-fill-state-pressed")),this._addArrowClasses("pressed","up")),this.buttonDownCapture&&(e.addClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")),e.addClass(this.toThemeProperty("jqx-fill-state-pressed")),this._addArrowClasses("pressed","down")),1==this.thumbCapture){var s=this.btnThumb;s.addClass(this.vertical?this.toThemeProperty("jqx-scrollbar-thumb-state-pressed"):this.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal")),s.addClass(this.toThemeProperty("jqx-fill-state-pressed"))}},handlemousemove:function(t){var e=this.btnUp,s=this.btnDown,i=0;if(null!=s&&null!=e){if(null!=e&&null!=s&&void 0!=this.buttonDownCapture&&void 0!=this.buttonUpCapture&&(this.buttonDownCapture&&t.which==i?(s.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")),s.removeClass(this.toThemeProperty("jqx-fill-state-pressed")),this._removeArrowClasses("pressed","down"),this.buttonDownCapture=!1):this.buttonUpCapture&&t.which==i&&(e.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")),e.removeClass(this.toThemeProperty("jqx-fill-state-pressed")),this._removeArrowClasses("pressed","up"),this.buttonUpCapture=!1)),1!=this.thumbCapture)return!1;var r=this.btnThumb;if(t.which==i&&!this.isTouchDevice&&!this._touchSupport){this.thumbCapture=!1,this._arrange();var o=this.toThemeProperty(this.vertical?"jqx-scrollbar-thumb-state-pressed":"jqx-scrollbar-thumb-state-pressed-horizontal");return r.removeClass(o),r.removeClass(this.toThemeProperty("jqx-fill-state-pressed")),!0}void 0!=t.preventDefault&&t.preventDefault(),null!=t.originalEvent&&(t.originalEvent.mouseHandled=!0),void 0!=t.stopPropagation&&t.stopPropagation();var h=0;try{h=this.vertical?t.clientY-this.dragStartY:t.clientX-this.dragStartX;var a=this._btnAndThumbSize;this._btnAndThumbSize||(a=this.vertical?e.height()+s.height()+r.height():e.width()+s.width()+r.width());var n=(this.max-this.min)/(this.scrollBarSize-a);if("auto"!=this.thumbStep){if(h*=n,Math.abs(this.dragStartValue+h-this.value)>=parseInt(this.thumbStep)){var l=Math.round(parseInt(h)/this.thumbStep)*this.thumbStep;return this.setPosition(this.rtl&&!this.vertical?this.dragStartValue-l:this.dragStartValue+l),!1}return!1}h*=n;var l=h;this.rtl&&!this.vertical&&(l=-h),this.setPosition(this.dragStartValue+l)}catch(d){alert(d)}return!1}},handlemouseup:function(t,e){var s=!1;if(this.thumbCapture){this.thumbCapture=!1;var i=this.btnThumb,r=this.toThemeProperty(this.vertical?"jqx-scrollbar-thumb-state-pressed":"jqx-scrollbar-thumb-state-pressed-horizontal");i.removeClass(r),i.removeClass(this.toThemeProperty("jqx-fill-state-pressed")),s=!0,this._mouseup=new Date}if(this.areaDownCapture=this.areaUpCapture=!1,this.buttonUpCapture||this.buttonDownCapture){var o=this.btnUp,h=this.btnDown;this.buttonUpCapture=!1,this.buttonDownCapture=!1,o.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")),h.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed")),o.removeClass(this.toThemeProperty("jqx-fill-state-pressed")),h.removeClass(this.toThemeProperty("jqx-fill-state-pressed")),this._removeArrowClasses("pressed"),s=!0,this._mouseup=new Date}s&&(void 0!=e.preventDefault&&e.preventDefault(),null!=e.originalEvent&&(e.originalEvent.mouseHandled=!0),void 0!=e.stopPropagation&&e.stopPropagation())},setPosition:function(t,e){this.element;if((void 0==t||0/0==t)&&(t=this.min),t>=this.max&&(t=this.max),t<this.min&&(t=this.min),this.value!==t||1==e){if(t==this.max){var s=new jQuery.Event("complete");this.host.trigger(s)}var i=this.value;if(this._triggervaluechanged){var r=new jQuery.Event("valuechanged");r.previousValue=this.value,r.currentValue=t}this.value=t,this._positionelements(),this._triggervaluechanged&&this.host.trigger(r),this.valuechanged&&this.valuechanged({currentValue:this.value,previousvalue:i})}return t},_getThumbSize:function(t){var e=this.max-this.min,s=0;return e>1?s=t/(e+t)*t:1==e&&(s=t),this.thumbSize>0&&(s=this.thumbSize),s<this.thumbMinSize&&(s=this.thumbMinSize),Math.min(s,t)},_positionelements:function(){var t=(this.element,this.areaUp),e=this.areaDown,s=(this.btnUp,this.btnDown,this.btnThumb),i=(this.scrollWrap,this._height?this._height:this.host.height()),r=this._width?this._width:this.host.width(),o=this.vertical?r:i;this.showButtons||(o=0);var h=this.vertical?i:r;this.scrollBarSize=h;var a=this._getThumbSize(h-2*o);a=Math.round(a),a<this.thumbMinSize&&(a=this.thumbMinSize),(0/0==i||10>i)&&(i=10),(0/0==r||10>r)&&(r=10),o+=2,this.btnSize=o;var n=this._btnAndThumbSize;if(!this._btnAndThumbSize){var n=this.vertical?2*this.btnSize+s.outerHeight():2*this.btnSize+s.outerWidth();n=Math.round(n)}var l=(h-n)/(this.max-this.min)*(this.value-this.min);if(this.rtl&&!this.vertical&&(l=(h-n)/(this.max-this.min)*(this.max-this.value-this.min)),l=Math.round(l),0>l&&(l=0),this.vertical){var d=h-l-n;0>d&&(d=0),e[0].style.height=d+"px",t[0].style.height=l+"px",this._setElementTopPosition(t,o),this._setElementTopPosition(s,o+l),this._setElementTopPosition(e,o+l+a)}else t[0].style.width=l+"px",e[0].style.width=h-l-n>=0?h-l-n+"px":"0px",this._setElementLeftPosition(t,o),this._setElementLeftPosition(s,o+l),this._setElementLeftPosition(e,2+o+l+a)},_arrange:function(){if(this._initialLayout)return void(this._initialLayout=!1);var t=(this.element,this.areaUp),e=this.areaDown,s=this.btnUp,i=this.btnDown,r=this.btnThumb,o=this.scrollWrap,h=parseInt(this.element.style.height),a=parseInt(this.element.style.width);if(this.isPercentage)var h=this.host.height(),a=this.host.width();isNaN(h)&&(h=0),isNaN(a)&&(a=0),this._width=a,this._height=h;var n=this.vertical?a:h;this.showButtons||(n=0),s[0].style.width=n+"px",s[0].style.height=n+"px",i[0].style.width=n+"px",i[0].style.height=n+"px",this.vertical?o[0].style.width=a+2+"px":o[0].style.height=h+2+"px",this._setElementPosition(s,0,0);var l=n+2;this.vertical?this._setElementPosition(i,0,h-l):this._setElementPosition(i,a-l,0);var d=this.vertical?h:a;this.scrollBarSize=d;var u=this._getThumbSize(d-2*n);u=Math.round(u),u<this.thumbMinSize&&(u=this.thumbMinSize);var p=!1;this.isTouchDevice&&0!=this.touchModeStyle&&(p=!0),this.vertical?(r[0].style.width=a+"px",r[0].style.height=u+"px",p&&0!==this.thumbTouchSize&&(r.css({width:this.thumbTouchSize+"px"}),r.css("margin-left",(this.host.width()-this.thumbTouchSize)/2))):(r[0].style.width=u+"px",r[0].style.height=h+"px",p&&0!==this.thumbTouchSize&&(r.css({height:this.thumbTouchSize+"px"}),r.css("margin-top",(this.host.height()-this.thumbTouchSize)/2))),(0/0==h||10>h)&&(h=10),(0/0==a||10>a)&&(a=10),n+=2,this.btnSize=n;var m=this.vertical?2*this.btnSize+(2+parseInt(r[0].style.height)):2*this.btnSize+(2+parseInt(r[0].style.width));m=Math.round(m),this._btnAndThumbSize=m;var c=(d-m)/(this.max-this.min)*(this.value-this.min);if(this.rtl&&!this.vertical&&(c=(d-m)/(this.max-this.min)*(this.max-this.value-this.min)),c=Math.round(c),(c===-1/0||1/0==c)&&(c=0),isNaN(c)&&(c=0),0>c&&(c=0),this.vertical){var b=d-c-m;0>b&&(b=0),e[0].style.height=b+"px",e[0].style.width=a+"px",t[0].style.height=c+"px",t[0].style.width=a+"px";var v=parseInt(this.element.style.height);this.isPercentage&&(v=this.host.height()),r[0].style.visibility="inherit",v-3*parseInt(n)<0?r[0].style.visibility="hidden":m>v?r[0].style.visibility="hidden":"visible"==this.element.style.visibility&&(r[0].style.visibility="inherit"),this._setElementPosition(t,0,n),this._setElementPosition(r,0,n+c),this._setElementPosition(e,0,n+c+u)}else{c>0&&(t[0].style.width=c+"px"),h>0&&(t[0].style.height=h+"px");var w=d-c-m;0>w&&(w=0),e[0].style.width=w+"px",e[0].style.height=h+"px";var x=parseInt(this.element.style.width);this.isPercentage&&(x=this.host.width()),r[0].style.visibility="inherit",x-3*parseInt(n)<0?r[0].style.visibility="hidden":m>x?r[0].style.visibility="hidden":"visible"==this.element.style.visibility&&(r[0].style.visibility="inherit"),this._setElementPosition(t,n,0),this._setElementPosition(r,n+c,0),this._setElementPosition(e,2+n+c+u,0)}}})}(jQuery);