!function(e){e.extend(e.jqx._jqxGrid.prototype,{_updatefilterrowui:function(t){for(var i=this.columns.records.length,r=0,l=this,a=0;i>a;a++){var s=this.columns.records[a],o=s.width;o<s.minwidth&&(o=s.minwidth),o>s.maxwidth&&(o=s.maxwidth);var n=e(this.filterrow[0].cells[a]);n.css("left",r);var d=!0;if(n.width()==o&&(d=!1),t&&(d=!0),n.width(o),n[0].left=r,s.hidden&&s.hideable?n.css("display","none"):r+=o,d)if(s.createfilterwidget&&"custom"==s.filtertype)s.createfilterwidget(s,n);else if(s.filterable){var f=function(t,i){var r=e(i.children()[0]);r.width(o-10),r.attr("disabled",t.disabled)};switch(s.filtertype){case"number":e(n.children()[0]).width(o),n.find("input").width(o-30),n.find("input").attr("disabled",l.disabled),e(n.find(".jqx-dropdownlist-state-normal")).jqxDropDownList({disabled:l.disabled});break;case"date":this.host.jqxDateTimeInput?e(n.children()[0]).jqxDateTimeInput({disabled:l.disabled,width:o-10}):f(this,n);break;case"textbox":case"default":f(this,n);break;case"list":case"checkedlist":this.host.jqxDropDownList?e(n.children()[0]).jqxDropDownList({disabled:l.disabled,width:o-10}):f(this,n);break;case"bool":case"boolean":this.host.jqxCheckBox?e(n.children()[0]).jqxCheckBox({disabled:l.disabled}):f(this,n)}}}var c=e(this.filterrow.children()[0]);c.width(parseInt(r)+2),c.height(this.filterrowheight)},clearfilterrow:function(){if(this._disablefilterrow=!0,this.columns.records){for(var t=this.columns.records.length,i=0;t>i;i++){var r=this.columns.records[i],l=e(this.filterrow[0].cells[i]);if(r.filterable){var a=function(t,i){var r=e(i.children()[0]);r.val(""),r[0]&&(t["_oldWriteText"+r[0].id]="")};switch(r.filtertype){case"number":l.find("input").val("");break;case"date":this.host.jqxDateTimeInput?e(l.children()[0]).jqxDateTimeInput("setDate",null):a(this,l);break;case"textbox":case"default":a(this,l);break;case"list":this.host.jqxDropDownList?e(l.children()[0]).jqxDropDownList("clearSelection"):a(this,l);break;case"checkedlist":this.host.jqxDropDownList?e(l.children()[0]).jqxDropDownList("checkAll",!1):a(this,l);break;case"bool":case"boolean":this.host.jqxCheckBox?e(l.children()[0]).jqxCheckBox({checked:null}):a(this,l)}}}this._disablefilterrow=!1}},_applyfilterfromfilterrow:function(){if(1!=this._disablefilterrow&&!this.disabled){for(var t=this.columns.records.length,i=this.that,r=0;t>r;r++){var l=new e.jqx.filter,a=this.columns.records[r];if(a.filterable&&null!==a.datafield){var s=i._getcolumntypebydatafield(a),o=i._getfiltertype(s),n=1,d=!0,f=(a.filtertype,function(e,t,r){var l=!0;if(e._filterwidget){var a=e._filterwidget.val();if(""!=a){var s="equal";if("stringfilter"==t)var s="contains";if("numericfilter"==t&&","==i.gridlocalization.decimalseparator&&a.indexOf(i.gridlocalization.decimalseparator)>=0&&(a=a.replace(i.gridlocalization.decimalseparator,".")),"stringfilter"!=t){var o=0;if(-1!=a.indexOf(">")&&(s="greater_than",o=1),-1!=a.indexOf("<")&&(s="less_than",o=1),-1!=a.indexOf("=")&&("greater_than"==s?(s="greater_than_or_equal",o=2):"less_than"==s?(s="less_than_or_equal",o=2):(s="equal",o=1)),0!=o&&(a=a.substring(o),a.length<1))return!1}if(void 0!=e.filtercondition&&(s=e.filtercondition),"datefilter"==t)var d=r.createfilter(t,a,s,null,e.cellsformat,i.gridlocalization);else var d=r.createfilter(t,a,s);r.addfilter(n,d)}else l=!1}return l});switch(a.filtertype){case"date":if(a._filterwidget.jqxDateTimeInput){var c=a._filterwidget.jqxDateTimeInput("getRange");if(null!=c&&null!=c.from&&null!=c.to){var h="GREATER_THAN_OR_EQUAL",p=new Date(0);p.setHours(0),p.setFullYear(c.from.getFullYear(),c.from.getMonth(),c.from.getDate());var u=new Date(0);u.setHours(0),u.setFullYear(c.to.getFullYear(),c.to.getMonth(),c.to.getDate()),u.setHours(c.to.getHours()),u.setMinutes(c.to.getMinutes()),u.setSeconds(c.to.getSeconds());var g=l.createfilter(o,p,h);l.addfilter(0,g);var m="LESS_THAN_OR_EQUAL",w=l.createfilter(o,u,m);l.addfilter(0,w)}else d=!1}else d=f(a,o,l);break;case"number":if(a._filterwidget){var c=a._filterwidget.find("input").val();","==i.gridlocalization.decimalseparator&&c.indexOf(i.gridlocalization.decimalseparator)>=0&&(c=c.replace(i.gridlocalization.decimalseparator,"."));var v=a._filterwidget.find(".filter").jqxDropDownList("selectedIndex"),x=l.getoperatorsbyfiltertype(o)[v];if(i.updatefilterconditions){var y=i.updatefilterconditions(o,l.getoperatorsbyfiltertype(o));void 0!=y&&l.setoperatorsbyfiltertype(o,y);var x=l.getoperatorsbyfiltertype(o)[v]}var b="NULL"==x||"NOT_NULL"==x,D="EMPTY"==x||"NOT_EMPTY"==x;void 0!=c&&c.length>0||b||D?(g=l.createfilter(o,new Number(c),x,null,a.cellsformat,i.gridlocalization),l.addfilter(0,g)):d=!1}else d=!1;break;case"textbox":case"default":d=f(a,o,l);break;case"bool":case"boolean":if(a._filterwidget.jqxCheckBox){var c=a._filterwidget.jqxCheckBox("checked");if(null!=c){var h="equal",q=l.createfilter(o,c,h);l.addfilter(n,q)}else d=!1}else d=f(a,o,l);break;case"list":var _=a._filterwidget.jqxDropDownList("listBox");if(_.selectedIndex>0){var j=_.getItem(_.selectedIndex),c=j.label,h="equal";""===c&&(h="NULL");var q=l.createfilter(o,c,h);l.addfilter(n,q)}else d=!1;break;case"checkedlist":if(a._filterwidget.jqxDropDownList){var _=a._filterwidget.jqxDropDownList("listBox"),k=_.getCheckedItems();if(0==k.length){for(var L=1;L<_.items.length;L++){var c=_.items[L].label,h="not_equal";""===c&&(h="NULL");var q=l.createfilter(o,c,h);l.addfilter(0,q)}d=!0}else if(k.length!=_.items.length)for(var L=0;L<k.length;L++){var c=k[L].label,h="equal";""===c&&(h="NULL");var q=l.createfilter(o,c,h);l.addfilter(n,q)}else d=!1}else d=f(a,o,l)}this._loading||(d?this.addfilter(a.displayfield,l,!1):this.removefilter(a.displayfield,!1))}}this._loading||this.applyfilters("filterrow")}},_updatefilterrow:function(){var t=e('<div style="position: relative;" id="row00'+this.element.id+'"></div>'),i=0,r=this.columns.records.length,l=this.toThemeProperty("jqx-grid-cell");l+=" "+this.toThemeProperty("jqx-grid-cell-pinned"),l+=" "+this.toThemeProperty("jqx-grid-cell-filter-row");var a=r+10,s=new Array,o=this.that;this.filterrow[0].cells=s,t.height(this.filterrowheight),this.filterrow.children().detach(),this.filterrow.append(t),this._filterrowcache||(this._filterrowcache=new Array),this._initcolumntypes();for(var n=!1,d=new Array,f=0;r>f;f++){var c=this.columns.records[f],h=c.width;h<c.minwidth&&(h=c.minwidth),h>c.maxwidth&&(h=c.maxwidth);var p=e('<div style="overflow: hidden; position: absolute; height: 100%;" class="'+l+'"></div>');t.append(p),p.css("left",i),this.rtl?(p.css("z-index",a++),p.css("border-left-width","1px")):p.css("z-index",a--),p.width(h),p[0].left=i,c.hidden&&c.hideable?p.css("display","none"):i+=h,s[s.length]=p[0];var u=!0;if(this.rtl){if(this.groupable){var g=this.showrowdetailscolumn&&this.rowdetails?1:0;this.groups.length+g+f>r-1&&(u=!1)}this.showrowdetailscolumn&&this.rowdetails&&f==r-1&&(u=!1)}else{if(this.groupable){var g=this.showrowdetailscolumn&&this.rowdetails?1:0;this.groups.length+g>f&&(u=!1)}this.showrowdetailscolumn&&this.rowdetails&&0==f&&(u=!1)}if(u)if("custom"==c.filtertype&&c.createfilterwidget){var m=function(){o._applyfilterfromfilterrow()};c.createfilterwidget(c,p,m)}else c.filterable&&(this._filterrowcache[c.datafield]?(n=!0,p.append(this._filterrowcache[c.datafield]),c._filterwidget=this._filterrowcache[c.datafield]):(this._addfilterwidget(c,p,h),d[c.datafield]=c._filterwidget))}this._filterrowcache=d,e.jqx.browser.msie&&e.jqx.browser.version<8&&t.css("z-index",a--),t.width(parseInt(i)+2),this.filterrow.addClass(l),this.filterrow.css("border-top-width","1px"),this.filterrow.css("border-right-width","0px"),n&&this._updatefilterrowui(!0)},_addfilterwidget:function(t,i,r){for(var l=this.that,a="",s=0;s<l.dataview.filters.length;s++){var o=l.dataview.filters[s];if(o.datafield&&o.datafield==t.datafield){a=o.filter.getfilters()[0].value;break}}var n=function(i,l){var s=e('<input autocomplete="off" type="textarea"/>');s[0].id=e.jqx.utilities.createId(),s.addClass(i.toThemeProperty("jqx-widget")),s.addClass(i.toThemeProperty("jqx-input")),s.addClass(i.toThemeProperty("jqx-rc-all")),s.addClass(i.toThemeProperty("jqx-widget-content")),i.rtl&&s.css("direction","rtl"),i.disabled&&s.attr("disabled",!0),s.attr("disabled",!1),s.appendTo(l),s.width(r-10),s.height(i.filterrowheight-10),s.css("margin","4px"),t.createfilterwidget&&t.createfilterwidget(t,l,s),t._filterwidget=s,s.focus(function(){return i.content[0].scrollLeft=0,setTimeout(function(){i.content[0].scrollLeft=0},10),i.focusedfilter=s,s.addClass(i.toThemeProperty("jqx-fill-state-focus")),!1}),s.blur(function(){s.removeClass(i.toThemeProperty("jqx-fill-state-focus"))}),s.keydown(function(e){"13"==e.keyCode&&i._applyfilterfromfilterrow(),s[0]._writeTimer&&clearTimeout(s[0]._writeTimer),s[0]._writeTimer=setTimeout(function(){i._loading||i["_oldWriteText"+s[0].id]!=s.val()&&(i._applyfilterfromfilterrow(),i["_oldWriteText"+s[0].id]=s.val())},800),i.focusedfilter=s}),i.host.removeClass("jqx-disableselect"),i.content.removeClass("jqx-disableselect"),s.val(a)};switch(null!=t.datatype&&("number"==t.filtertype&&("string"==t.datatype||"date"==t.datatype||"bool"==t.datatype)&&(t.filtertype="textbox"),"date"==t.filtertype&&("string"==t.datatype||"number"==t.datatype||"bool"==t.datatype)&&(t.filtertype="textbox"),"bool"==t.filtertype&&("string"==t.datatype||"number"==t.datatype||"date"==t.datatype)&&(t.filtertype="textbox")),t.filtertype){case"number":var d=e("<div></div>");d.width(i.width()),d.height(this.filterrowheight),i.append(d);var r=i.width()-20,f=function(t,i){var r=e('<input style="float: left;" autocomplete="off" type="textarea"/>');return l.rtl&&(r.css("float","right"),r.css("direction","rtl")),r[0].id=e.jqx.utilities.createId(),r.addClass(l.toThemeProperty("jqx-widget")),r.addClass(l.toThemeProperty("jqx-input")),r.addClass(l.toThemeProperty("jqx-rc-all")),r.addClass(l.toThemeProperty("jqx-widget-content")),r.appendTo(t),r.width(i-10),l.disabled&&r.attr("disabled",!0),r.attr("disabled",!1),r.height(l.filterrowheight-10),r.css("margin","4px"),r.css("margin-right","2px"),r.focus(function(){l.focusedfilter=r,r.addClass(l.toThemeProperty("jqx-fill-state-focus"))}),r.blur(function(){r.removeClass(l.toThemeProperty("jqx-fill-state-focus"))}),r.keydown(function(e){"13"==e.keyCode&&l._applyfilterfromfilterrow(),r[0]._writeTimer&&clearTimeout(r[0]._writeTimer),r[0]._writeTimer=setTimeout(function(){l._loading||l["_oldWriteText"+r[0].id]!=r.val()&&(l._applyfilterfromfilterrow(),l["_oldWriteText"+r[0].id]=r.val())},800),l.focusedfilter=r}),r.val(a),r};f(d,r);var c=l._getfiltersbytype("number"),h=e("<div class='filter' style='float: left;'></div>");h.css("margin-top","4px"),h.appendTo(d),l.rtl&&h.css("float","right");var p=0;if(null!=t.filtercondition){var u=c.indexOf(t.filtercondition);-1!=u&&(p=u)}h.jqxDropDownList({disabled:l.disabled,touchMode:l.touchmode,rtl:l.rtl,dropDownHorizontalAlignment:"right",enableBrowserBoundsDetection:!0,selectedIndex:p,width:18,height:21,dropDownHeight:150,dropDownWidth:170,source:c,theme:l.theme}),h.jqxDropDownList({selectionRenderer:function(){return""}}),h.jqxDropDownList("setContent",""),h.find(".jqx-dropdownlist-content").hide(),t.createfilterwidget&&t.createfilterwidget(t,i,d),t._filterwidget=d;var g=null;this.addHandler(h,"select",function(){var e=h.jqxDropDownList("getSelectedItem").label;t._filterwidget.find("input").val().length>0&&!l.refreshingfilter?l._applyfilterfromfilterrow():0!=t._filterwidget.find("input").val().length||l.refreshingfilter||("null"==g||"not null"==g||"null"==e||"not null"==e)&&l._applyfilterfromfilterrow(),g=e});break;case"textbox":case"default":default:n(this,i);break;case"none":break;case"date":if(this.host.jqxDateTimeInput){var m=e("<div></div>");m.css("margin","4px"),m.appendTo(i);var w={calendar:this.gridlocalization,todayString:this.gridlocalization.todaystring,clearString:this.gridlocalization.clearstring};m.jqxDateTimeInput({disabled:l.disabled,localization:w,rtl:l.rtl,showFooter:!0,formatString:t.cellsformat,selectionMode:"range",value:null,theme:this.theme,width:r-10,height:this.filterrowheight-10}),t.createfilterwidget&&t.createfilterwidget(t,i,m),t._filterwidget=m,this.addHandler(m,"valuechanged",function(){l.refreshingfilter||(l._applyfilterfromfilterrow(),l.focusedfilter=null)})}else n(this,i);break;case"list":case"checkedlist":if(this.host.jqxDropDownList){var v=this._getfilterdataadapter(t),x=!1,h=e("<div></div>");h.css("margin","4px");var y=t.datafield,b="checkedlist"==t.filtertype?!0:!1,D=150>r?220:"auto";v.dataBind();var q=v.records,_=q.length<8?!0:!1;x=_,h.appendTo(i),h.jqxDropDownList({disabled:l.disabled,touchMode:l.touchmode,rtl:l.rtl,checkboxes:b,dropDownWidth:D,source:v.records,autoDropDownHeight:_,theme:this.theme,width:r-10,height:this.filterrowheight-10,displayMember:t.displayfield,valueMember:y});var j=h.jqxDropDownList("listBox");if(b){h.jqxDropDownList({selectionRenderer:function(){return l.gridlocalization.filterselectstring}});var k=e('<span style="top: 2px; position: relative; color: inherit; border: none; background-color: transparent;">'+l.gridlocalization.filterselectstring+"</span>");if(k.addClass(this.toThemeProperty("jqx-item")),void 0!=j){x||j.host.height(200),j.insertAt(l.gridlocalization.filterselectallstring,0),h.jqxDropDownList("setContent",k);{var L=!0;new Array}j.checkAll(!1),l.addHandler(j.host,"checkChange",function(e){if(h[0]._selectionChanged=!0,L)if(e.args.label!=l.gridlocalization.filterselectallstring){L=!1,j.host.jqxListBox("checkIndex",0,!0,!1);var t=j.host.jqxListBox("getCheckedItems"),i=j.host.jqxListBox("getItems");1==t.length?j.host.jqxListBox("uncheckIndex",0,!0,!1):i.length!=t.length&&j.host.jqxListBox("indeterminateIndex",0,!0,!1),L=!0}else L=!1,e.args.checked?j.host.jqxListBox("checkAll",!1):j.host.jqxListBox("uncheckAll",!1),L=!0})}}else j.insertAt({label:this.gridlocalization.filterchoosestring,value:""},0),h.jqxDropDownList({selectedIndex:0});t.createfilterwidget&&t.createfilterwidget(t,i,h),t._filterwidget=h;{h.jqxDropDownList("dropdownlistWrapper")}"list"==t.filtertype?this.addHandler(h,"select",function(e){l.refreshingfilter||e.args&&"none"!=e.args.type&&(l._applyfilterfromfilterrow(),l.focusedfilter=null)}):this.addHandler(h,"close",function(){h[0]._selectionChanged&&(l._applyfilterfromfilterrow(),l.focusedfilter=null,h[0]._selectionChanged=!1)})}else n(this,i);break;case"bool":case"boolean":if(this.host.jqxCheckBox){var T=e('<div tabIndex=0 style="opacity: 0.99; position: absolute; top: 50%; left: 50%; margin-top: -7px; margin-left: -10px;"></div>');T.appendTo(i),T.jqxCheckBox({disabled:l.disabled,enableContainerClick:!1,animationShowDelay:0,animationHideDelay:0,hasThreeStates:!0,theme:this.theme,checked:null}),t.createfilterwidget&&t.createfilterwidget(t,i,T),a===!0||"true"==a?T.jqxCheckBox({checked:!0}):(a===!1||"false"==a)&&T.jqxCheckBox({checked:!1}),t._filterwidget=T,this.addHandler(T,"change",function(e){l.refreshingfilter||e.args&&(l.focusedfilter=null,l._applyfilterfromfilterrow())})}else n(this,i)}},_getfilterdataadapter:function(t){var i=this.source._source?!0:!1;if(i){var r={localdata:this.source.records,datatype:this.source.datatype,async:!1},l=this;dataadapter=new e.jqx.dataAdapter(r,{autoBind:!1,autoSort:!0,autoSortField:t.displayfield,async:!1,uniqueDataFields:[t.displayfield],beforeLoadComplete:function(e){var i=new Array;if(t.cellsformat){for(var r=l._getcolumntypebydatafield(t),a=0;a<e.length;a++){i.push(e[a]);var s=e[a][t.displayfield];e[a][t.displayfield+"JQValue"]=s,"date"===r?e[a][t.displayfield]=dataadapter.formatDate(s,t.cellsformat,l.gridlocalization):("number"===r||"float"===r||"int"===r)&&(e[a][t.displayfield]=dataadapter.formatNumber(s,t.cellsformat,l.gridlocalization))}return i}return e}})}else dataadapter=new e.jqx.dataAdapter(this.source,{autoBind:!1,uniqueDataFields:[t.displayfield],autoSort:!0,autoSortField:t.displayfield,async:!1});if(t.filteritems&&t.filteritems.length>0){var r={localdata:t.filteritems,datatype:this.source.datatype,async:!1};dataadapter=new e.jqx.dataAdapter(r,{autoBind:!1,async:!1})}else if(t.filteritems){if(t.filteritems._source)return t.filteritems._options.autoBind=!1,t.filteritems._options.async=!1,t.filteritems;if(e.isFunction(t.filteritems))return t.filteritems()}return dataadapter},refreshfilterrow:function(){if(this.showfilterrow){this.refreshingfilter=!0,this._updatefilterrowui(),this._updatelistfilters(!0,!0);for(var t=this.that,i=this.columns.records.length,r=0;i>r;r++){var l=this.columns.records[r];if(l.filterable&&l.filter){var a=l.filter.getfilters();if(a.length>0){var s=a[0].value,o=l._filterwidget,n=l._filterwidget.parent();if(null!=o)switch(l.filtertype){case"number":if(n.find("input").val(s),this.host.jqxDropDownList){var d=l.filter.getoperatorsbyfiltertype("numericfilter");o.find(".filter").jqxDropDownList("selectIndex",d.indexOf(a[0].condition))}break;case"date":if(this.host.jqxDateTimeInput){var s=l.filter.getfilterat(0).filtervalue;if(void 0!=s){if(l.filter.getfilterat(1))var f=l.filter.getfilterat(1).filtervalue;else f=s;e(n.children()[0]).jqxDateTimeInput("setRange",new Date(s),new Date(f))}}else o.val(s);break;case"textbox":case"default":o.val(s),t["_oldWriteText"+o[0].id]=s;break;case"bool":case"boolean":this.host.jqxCheckBox?e(n.children()[0]).jqxCheckBox({checked:s}):o.val(s)}}}}this.refreshingfilter=!1}},_destroyedfilters:function(){for(var t=(this.that,this.columns.records.length),i=0;t>i;i++){var r=this.columns.records[i];if(r.filterable){var l=r._filterwidget;if("list"==r.filtertype||"checkedlist"==r.filtertype)this.removeHandler(l,"select"),this.removeHandler(l,"close"),l.jqxDropDownList("destroy");else if("date"==r.filtertype)this.removeHandler(l,"valuechanged"),l.jqxDateTimeInput("destroy");else if("bool"==r.filtertype)this.removeHandler(l,"change"),l.jqxCheckBox("destroy");else if("number"==r.filtertype){var a=l.find(".jqx-input");this.removeHandler(a,"keydown");var s=e(l.children()[1]);s.jqxDropDownList("destroy")}else this.removeHandler(l,"keydown");l.remove()}}},_updatelistfilters:function(t,i){for(var r=this.that,l=this.columns.records.length,a=0;l>a;a++){var s=this.columns.records[a];if(s.filterable&&("list"==s.filtertype||"checkedlist"==s.filtertype)){var o=s._filterwidget;if(t){var n=this._getfilterdataadapter(s);o.jqxDropDownList({source:n});var d=o.jqxDropDownList("getItems"),f=!0;if(d.length!=n.records.length+1&&(f=!1),f)for(var c=1;c<d.length;c++)if(d[c].label!=n.records[c-1][s.displayfield]){f=!1;break}if(f&&!i)continue}else if(void 0==s.filter){o.jqxDropDownList("renderSelection");continue}var h="checkedlist"==s.filtertype?!0:!1,d=o.jqxDropDownList("getItems"),p=o.jqxDropDownList("listBox");if(o.jqxDropDownList("dataBind"),h){if(o.jqxDropDownList({selectionRenderer:function(){return r.gridlocalization.filterselectstring}}),p.insertAt(this.gridlocalization.filterselectallstring,0),o.jqxDropDownList("setContent",this.gridlocalization.filterselectstring),p.checkAll(!1),s.filter){for(var u=s.filter.getfilters(),c=0;c<p.items.length;c++){var g=p.items[c].label;e.each(u,function(){"NOT_EQUAL"==this.condition?g==this.value?p.uncheckIndex(c,!1,!1):p.checkIndex(c,!1,!1):"EQUAL"==this.condition&&(g==this.value?p.checkIndex(c,!1,!1):p.uncheckIndex(c,!1,!1))})}p._updateCheckedItems();var m=p.getCheckedItems().length;p.items.length!=m&&m>0&&p.host.jqxListBox("indeterminateIndex",0,!0,!1)}}else if(p.insertAt({label:this.gridlocalization.filterchoosestring,value:""},0),o.jqxDropDownList({selectedIndex:0}),s.filter){for(var u=s.filter.getfilters(),w=-1,c=0;c<p.items.length;c++){var g=p.items[c].label;e.each(u,function(){return"NOT_EQUAL"==this.condition?!0:g==this.value?(w=c,!1):void 0})}-1!=w&&p.selectIndex(w)}d.length<8?o.jqxDropDownList("autoDropDownHeight",!0):o.jqxDropDownList("autoDropDownHeight",!1)}}},_renderfiltercolumn:function(){var t=this.that;this.filterable&&e.each(this.columns.records,function(){var i=!1;t.autoshowfiltericon?this.filter?(e(this.filtericon).show(),i=!0):e(this.filtericon).hide():this.filterable&&(e(this.filtericon).show(),i=!0),"right"!=this.align||this.renderer||this.element&&(this.element.firstChild.firstChild.style.marginRight=i?"18px":"2px")})},_initcolumntypes:function(){if(this.columns&&this.columns.records){var t=this.source._source.datafields;if(t)for(var i=0;i<this.columns.records.length;i++){var r=this.columns.records[i];if(!r.datatype){var l="";e.each(t,function(){return this.name==r.displayfield?(this.type&&(l=this.type),!1):void 0}),r.datatype=""!=l?l:""}}}},_getcolumntypebydatafield:function(t){var i=this.that,r="string",l=i.source.datafields||(i.source._source?i.source._source.datafields:null);if(l){var a="";if(e.each(l,function(){return this.name==t.displayfield?(this.type&&(a=this.type),!1):void 0}),a)return a}if(null!=t){if(void 0==this.dataview.cachedrecords)return r;var s=null;if(this.virtualmode)e.each(this.dataview.cachedrecords,function(){return s=this[t.displayfield],!1});else{if(0==this.dataview.cachedrecords.length)return r;if(s=this.dataview.cachedrecords[0][t.displayfield],null!=s&&""==s.toString())return"string"}if(null!=s)if("boolean"==typeof s)r="boolean";else if(e.jqx.dataFormat.isNumber(s))r="number";else{var o=new Date(s);if("NaN"==o.toString()||"Invalid Date"==o.toString())if(e.jqx.dataFormat){if(o=e.jqx.dataFormat.tryparsedate(s),null!=o){if(o&&o.getFullYear()&&1970==o.getFullYear()&&0==o.getMonth()&&1==o.getDate()){var n=new Number(s);return isNaN(n)?"string":"number"}return"date"}r="string"}else r="string";else r="date"}}return r},_getfiltersbytype:function(e){var t=this.that,i="";switch(e){case"number":case"float":case"int":i=t.gridlocalization.filternumericcomparisonoperators;break;case"date":i=t.gridlocalization.filterdatecomparisonoperators;break;case"boolean":case"bool":i=t.gridlocalization.filterbooleancomparisonoperators;break;case"string":default:i=t.gridlocalization.filterstringcomparisonoperators}return i},_updatefilterpanel:function(t,i,r){(null==t||void 0==t)&&(t=this);var l=t._getcolumntypebydatafield(r),a=t._getfiltersbytype(l);if(!t.host.jqxDropDownList)throw new Error("jqxGrid: Missing reference to jqxdropdownlist.js.");var s=e(i),o=s.find("#filterclearbutton"+t.element.id),n=s.find("#filterbutton"+t.element.id),d=s.find("#filter1"+t.element.id),f=s.find("#filter2"+t.element.id),c=s.find("#filter3"+t.element.id),h=s.find(".filtertext1"+t.element.id),p=s.find(".filtertext2"+t.element.id);if(h.val(""),p.val(""),this.removeHandler(n,"click"),this.addHandler(n,"click",function(){t._buildfilter(t,i,r),t._closemenu()}),this.removeHandler(o,"click"),this.addHandler(o,"click",function(){t._clearfilter(t,i,r),t._closemenu()}),"default"===this.filtermode){if(d.jqxDropDownList("source")!=a&&(d.jqxDropDownList({enableBrowserBoundsDetection:!1,source:a}),c.jqxDropDownList({enableBrowserBoundsDetection:!1,source:a})),"boolean"==l||"bool"==l)d.jqxDropDownList({autoDropDownHeight:!0,selectedIndex:0}),c.jqxDropDownList({autoDropDownHeight:!0,selectedIndex:0});else{var u=!1;a&&a.length&&a.length<5&&(u=!0),d.jqxDropDownList({autoDropDownHeight:u,selectedIndex:2}),c.jqxDropDownList({autoDropDownHeight:u,selectedIndex:2})}f.jqxDropDownList({selectedIndex:0});var g=r.filter,m=new e.jqx.filter,w="";switch(l){case"number":case"int":case"float":case"decimal":w="numericfilter",y=m.getoperatorsbyfiltertype("numericfilter");break;case"boolean":case"bool":w="booleanfilter",y=m.getoperatorsbyfiltertype("booleanfilter");break;case"date":case"time":w="datefilter",y=m.getoperatorsbyfiltertype("datefilter");break;case"string":w="stringfilter",y=m.getoperatorsbyfiltertype("stringfilter")}if(null!=g){{var v=g.getfilterat(0),x=g.getfilterat(1);g.getoperatorat(0)}if(t.updatefilterconditions){var y=[],b=t.updatefilterconditions(w,y);if(void 0!=b){for(var D=0;D<b.length;D++)b[D]=b[D].toUpperCase();g.setoperatorsbyfiltertype(w,b),y=b}}var q=this.enableanimations?"default":"none";if(null!=v){var _=y.indexOf(v.comparisonoperator),j=v.filtervalue;h.val(j),d.jqxDropDownList({selectedIndex:_,animationType:q})}if(null!=x){var k=y.indexOf(x.comparisonoperator),L=x.filtervalue;p.val(L),c.jqxDropDownList({selectedIndex:k,animationType:q})}f.jqxDropDownList(void 0==g.getoperatorat(0)?{selectedIndex:0,animationType:q}:"and"==g.getoperatorat(0)||0==g.getoperatorat(0)?{selectedIndex:0}:{selectedIndex:1})}t.updatefilterpanel&&t.updatefilterpanel(d,c,f,h,p,n,o,g,w,y),h.focus(),setTimeout(function(){h.focus()},10)}else{var T=t._getfilterdataadapter(r),w=t._getfiltertype(l);d.jqxListBox(r.cellsformat?{displayMember:r.displayfield,valueMember:r.displayfield+"JQValue",source:T}:{displayMember:r.displayfield,valueMember:r.displayfield,source:T}),d.jqxListBox("insertAt",t.gridlocalization.filterselectallstring,0);var I=d.data().jqxListBox.instance;I.checkAll(!1);if(r.filter){I.uncheckAll(!1);for(var B=r.filter.getfilters(),C=0;C<I.items.length;C++){var z=I.items[C].value;e.each(B,function(){if("NOT_EQUAL"==this.condition){if(z!=this.value)return I.uncheckIndex(C,!1,!1),!1}else if("EQUAL"==this.condition&&z==this.value)return I.checkIndex(C,!1,!1),!1})}I._updateCheckedItems();var H=I.getCheckedItems().length;I.items.length!=H&&H>0&&I.host.jqxListBox("indeterminateIndex",0,!0,!1),H===I.items.length-1&&I.host.jqxListBox("checkIndex",0,!0,!1)}}},_getfiltertype:function(e){var t="stringfilter";switch(e){case"number":case"int":case"float":case"decimal":t="numericfilter";break;case"boolean":case"bool":t="booleanfilter";break;case"date":case"time":t="datefilter";break;case"string":t="stringfilter"}return t},_buildfilter:function(t,i,r){var l=e(i).find("#filter1"+t.element.id),a=e(i).find("#filter2"+t.element.id),s=e(i).find("#filter3"+t.element.id),o=e(i).find(".filtertext1"+t.element.id),n=e(i).find(".filtertext2"+t.element.id),d=o.val(),f=n.val(),c=t._getcolumntypebydatafield(r),h=(t._getfiltersbytype(c),new e.jqx.filter),p=t._getfiltertype(c);if("default"===t.filtermode){var u=l.jqxDropDownList("selectedIndex"),g=a.jqxDropDownList("selectedIndex"),m=s.jqxDropDownList("selectedIndex"),w=null,v=null;if(t.updatefilterconditions){var x=t.updatefilterconditions(p,h.getoperatorsbyfiltertype(p));void 0!=x&&h.setoperatorsbyfiltertype(p,x)}var y=!1,b=h.getoperatorsbyfiltertype(p)[u],s=h.getoperatorsbyfiltertype(p)[m],D="NULL"==b||"NOT_NULL"==b,q="EMPTY"==b||"NOT_EMPTY"==b;void 0==b&&(b=h.getoperatorsbyfiltertype(p)[0]),void 0==s&&(s=h.getoperatorsbyfiltertype(p)[0]),(d.length>0||D||q)&&(w=h.createfilter(p,d,b,null,r.cellsformat,t.gridlocalization),h.addfilter(g,w),y=!0);var _="NULL"==s||"NOT_NULL"==s,j="EMPTY"==s||"NOT_EMPTY"==s;if((f.length>0||_||j)&&(v=h.createfilter(p,f,s,null,r.cellsformat,t.gridlocalization),h.addfilter(g,v),y=!0),y){var k=r.displayfield;this.addfilter(k,h,!0)}else this._clearfilter(t,i,r)}else{var L=!1,T=l.data().jqxListBox.instance,I=T.getCheckedItems();if(0==I.length){for(var B=1;B<T.items.length;B++){var C=T.items[B].value,z="not_equal",H=h.createfilter(p,C,z,null);h.addfilter(0,H)}L=!0}else if(I.length!=T.items.length){L=!0;for(var B=0;B<I.length;B++)if(t.gridlocalization.filterselectallstring!==I[B].value){var C=I[B].value,z="equal",H=h.createfilter(p,C,z,null),A=1;h.addfilter(A,H)}}else L=!1;if(L){var k=r.displayfield;this.addfilter(k,h,!0)}else{var k=r.displayfield;this.removefilter(k,!0)}}},_clearfilter:function(e,t,i){var r=i.displayfield;this.removefilter(r,!0)},addfilter:function(e,t,i){if(this._loading)throw new Error("jqxGrid: "+this.loadingerrormessage);var r=this.getcolumn(e),l=this._getcolumn(e);void 0!=r&&null!=r&&(r.filter=t,l.filter=t,this.dataview.addfilter(e,t),1==i&&void 0!=i&&this.applyfilters("add"))},removefilter:function(e,t){if(this._loading)throw new Error("jqxGrid: "+this.loadingerrormessage);var i=this.getcolumn(e),r=this._getcolumn(e);void 0!=i&&null!=i&&null!=i.filter&&(this.dataview.removefilter(e,i.filter),i.filter=null,r.filter=null,(1==t||t!==!1)&&this.applyfilters("remove"))},applyfilters:function(t){if(this.dataview.filters.length>=0&&(this.virtualmode||!this.source.localdata)&&null!=this.source&&this.source.filter){var i=-1;this.pageable?(i=this.dataview.pagenum,this.dataview.pagenum=0):(this.vScrollInstance.setPosition(0),this.loadondemand=!0,this._renderrows(this.virtualsizeinfo)),this.pageable&&this.virtualmode&&(this.dataview.pagenum=0),this.source.filter(this.dataview.filters,this.dataview.records,this.dataview.records.length),this.pageable&&!this.virtualmode&&(this.dataview.pagenum=i)}if(this.dataview.clearsortdata&&this.dataview.clearsortdata(),this.virtualmode)return this.pageable&&(this.dataview.updateview(),this.gotopage&&this.gotopage(0)),this.rendergridcontent(!1,!1),this.showfilterrow&&"string"!=typeof t&&e.isEmptyObject(t)&&this.refreshfilterrow(),void this._raiseEvent(13,{filters:this.dataview.filters});this.selectedrowindexes,this.that;if(this.dataview.refresh(),this.dataview.clearsortdata&&this.sortcolumn&&this.sortdirection){var r=this.sortdirection.ascending?"asc":"desc";this._loading?this.sortby(this.sortcolumn,r,null,!1,!1):this.sortby(this.sortcolumn,r,null,!1)}this.pageable&&(this.dataview.updateview(),this.gotopage&&(this.gotopage(0),this.updatepagerdetails())),this._updaterowsproperties(),!this.groupable||this.groupable&&0==this.groups.length?(this._rowdetailscache=new Array,this.virtualsizeinfo=null,this._pagescache=new Array,this.columns&&this.columns.records&&this.columns.records.length>0&&!this.columns.records[0].filtericon&&(this.prerenderrequired=!0),this.rendergridcontent(!0,!1),this._updatecolumnwidths(),this._updatecellwidths(),this._renderrows(this.virtualsizeinfo),this.showaggregates&&this._updatecolumnsaggregates&&this._updatecolumnsaggregates()):(this._rowdetailscache=new Array,this._render(!0,!0,!1,!1,!1),this.showfilterrow&&this._updatefocusedfilter(),this._updatecolumnwidths(),this._updatecellwidths(),this._renderrows(this.virtualsizeinfo)),this.showfilterrow&&"string"!=typeof t&&e.isEmptyObject(t)&&this.refreshfilterrow(),this._raiseEvent(13,{filters:this.dataview.filters})},getfilterinformation:function(){for(var e=new Array,t=0;t<this.dataview.filters.length;t++){var i=this.getcolumn(this.dataview.filters[t].datafield);e[t]={filter:this.dataview.filters[t].filter,filtercolumn:i.datafield,filtercolumntext:i.text}}return e},clearfilters:function(t){var i=this.that;if(this.showfilterrow&&this.clearfilterrow(),this.columns.records){var r=1==t||t!==!1;e.each(this.columns.records,function(){i.removefilter(this.displayfield,!r)})}t!==!1&&(1==t||t!==!1)&&this.applyfilters("clear")},_destroyfilterpanel:function(){var t=e(e.find("#filterclearbutton"+this.element.id)),i=e(e.find("#filterbutton"+this.element.id)),r=e(e.find("#filter1"+this.element.id)),l=e(e.find("#filter2"+this.element.id)),a=e(e.find("#filter3"+this.element.id)),s=e(e.find(".filtertext1"+this.element.id)),o=e(e.find(".filtertext2"+this.element.id));s.length>0&&o.length>0&&(s.removeClass(),o.removeClass(),s.remove(),o.remove()),t.length>0&&(t.jqxButton("destroy"),i.jqxButton("destroy"),this.removeHandler(t,"click"),this.removeHandler(i,"click")),r.length>0&&r.jqxDropDownList("destroy"),l.length>0&&l.jqxDropDownList("destroy"),a.length>0&&a.jqxDropDownList("destroy")},_initfilterpanel:function(t,i,r,l){(null==t||void 0==t)&&(t=this),i[0].innerHTML="";var a=e("<div class='filter' style='margin-left: 7px;'></div>");i.append(a);var s=e("<div class='filter' style='margin-top: 3px; margin-bottom: 3px;'></div>");s.text(t.gridlocalization.filtershowrowstring);var o=e("<div class='filter' id='filter1"+t.element.id+"'></div>"),n=e("<div class='filter' id='filter2"+t.element.id+"' style='margin-bottom: 3px;'></div>"),d=e("<div class='filter' id='filter3"+t.element.id+"'></div>"),f=t._getcolumntypebydatafield(r);if(!o.jqxDropDownList)throw new Error("jqxGrid: jqxdropdownlist.js is not loaded.");var c=t._getfiltersbytype(f),h=e("<div class='filter'><input class='filtertext1"+t.element.id+"' style='height: 20px; margin-top: 3px; margin-bottom: 3px;' type='text'></input></div>"),p=h.find("input");p.addClass(this.toThemeProperty("jqx-input")),p.addClass(this.toThemeProperty("jqx-widget-content")),p.addClass(this.toThemeProperty("jqx-rc-all")),p.width(l-15);var u=e("<div class='filter'><input class='filtertext2"+t.element.id+"' style='height: 20px; margin-top: 3px;' type='text'></input></div>"),g=u.find("input");g.addClass(this.toThemeProperty("jqx-input")),g.addClass(this.toThemeProperty("jqx-widget-content")),g.addClass(this.toThemeProperty("jqx-rc-all")),g.width(l-15),t.rtl&&(p.css("direction","rtl"),g.css("direction","rtl"));var m=e("<div class='filter' style='height: 25px; margin-left: 20px; margin-top: 7px;'></div>"),w=e('<span tabIndex=0 id="filterbutton'+t.element.id+'" class="filterbutton" style="padding: 4px 12px; margin-left: 2px;">'+t.gridlocalization.filterstring+"</span>");
m.append(w);var v=e('<span tabIndex=0 id="filterclearbutton'+t.element.id+'" class="filterclearbutton" style="padding: 4px 12px; margin-left: 5px;">'+t.gridlocalization.filterclearstring+"</span>");m.append(v),w.jqxButton({height:20,theme:t.theme}),v.jqxButton({height:20,theme:t.theme});var x=function(e){if(e){if(-1!=e.text().indexOf("case sensitive")){var i=e.text();i=i.replace("case sensitive","match case"),e.text(i)}return e.css("font-family",t.host.css("font-family")),e.css("font-size",t.host.css("font-size")),e}return""};if("default"===this.filtermode){a.append(s),a.append(o),o.jqxDropDownList({_checkForHiddenParent:!1,rtl:t.rtl,enableBrowserBoundsDetection:!1,selectedIndex:2,width:l-15,height:20,dropDownHeight:150,dropDownWidth:l-15,selectionRenderer:x,source:c,theme:t.theme}),a.append(h);var y=new Array;y[0]=t.gridlocalization.filterandconditionstring,y[1]=t.gridlocalization.filterorconditionstring,n.jqxDropDownList({_checkForHiddenParent:!1,rtl:t.rtl,enableBrowserBoundsDetection:!1,autoDropDownHeight:!0,selectedIndex:0,width:60,height:20,source:y,selectionRenderer:x,theme:t.theme}),a.append(n),d.jqxDropDownList({_checkForHiddenParent:!1,rtl:t.rtl,enableBrowserBoundsDetection:!1,selectedIndex:2,width:l-15,height:20,dropDownHeight:150,dropDownWidth:l-15,selectionRenderer:x,source:c,theme:t.theme}),a.append(d),a.append(u)}else{a.append(s),a.append(o),o.jqxListBox({rtl:t.rtl,_checkForHiddenParent:!1,checkboxes:!0,selectedIndex:2,width:l-15,height:120,theme:t.theme});var b=!0;t.addHandler(o,"checkChange",function(e){if(b)if(e.args.label!=t.gridlocalization.filterselectallstring){b=!1,o.jqxListBox("checkIndex",0,!0,!1);var i=o.jqxListBox("getCheckedItems"),r=o.jqxListBox("getItems");1==i.length?o.jqxListBox("uncheckIndex",0,!0,!1):r.length!=i.length&&o.jqxListBox("indeterminateIndex",0,!0,!1),b=!0}else b=!1,e.args.checked?o.jqxListBox("checkAll",!1):o.jqxListBox("uncheckAll",!1),b=!0})}a.append(m),t.updatefilterpanel&&t.updatefilterpanel(o,d,n,h,u,w,v,null,null,c)}})}(jQuery);