(function(){$.fn.gridInit=function(i,r,d,o){var e,n,a,t,s;return a="true"===$("#con_arbol").val()?void 0===d||""===d?"?nodo=raiz":"?nodo="+d:void 0===d||""===d?"":d,$("#cargando").css("display","block"),$("#jqxgrid").jqxGrid("destroy"),$(".panelGrid").append('<div id="jqxgrid"></div>'),s=$("#controller_full_path").val()+".json"+a,t={datatype:"json",datafields:i,id:"id",url:s},e=new $.jqx.dataAdapter(t),n={height:"100%",source:e,ready:function(){return $("#jqxgrid").jqxGrid("localizestrings",$.fn.gridLoc()),$("#gridpagerlistjqxgrid").css("width","auto"),$("#cargando").css("display","none"),$("#jqxgrid").on("groupschanged",function(){return $("#jqxgrid").jqxGrid("sortby",i[0].name,"asc")}),$("#jqxgrid").on("rowdoubleclick",function(i){var r,d;return r=i.args,d=r.rowindex,$.fn.editaRow(d)})},columnsresize:!0,columns:r,width:"100%",groupable:!0,sortable:!0,selectionmode:"multiplerowsextended",filterable:!0,pageable:!0,pagesizeoptions:["500","1000","5000"],pagesize:500,groupsexpandedbydefault:!1},$("#jqxgrid").jqxGrid(n),void 0!==o?$("#jqxgrid").on("bindingcomplete",function(){return $("#jqxgrid").jqxGrid("addgroup",o),$("#jqxgrid").jqxGrid("sortby",i[0].name,"asc")}):void 0}}).call(this);