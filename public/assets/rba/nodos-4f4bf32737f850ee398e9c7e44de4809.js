(function(){var r,o;o=function(){return"true"===$("#con_arbol").val()&&$.fn.arbolInit(),$.fn.gridRequest(),r()},$.fn.gridRequest=function(){var r,o,a;return o=["id","arbol","nombre","padre_id"],a=[["Id","auto"],["Arbol","auto"],["Nombre","auto"],["Padre_id","auto"]],r="arbol",$.fn.gridPrepDatos(o,a,void 0,r)},r=function(){var r;return $("#rba_nodo_padre_id").parent().hide(),r=$("#rba_nodo_padre_id").html(),$("#rba_nodo_arbol_id").change(function(){var o,a,d;return o=$("#rba_nodo_arbol_id :selected").text(),a=o.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g,"\\$1"),d=$(r).filter("optgroup[label='"+a+"']").html(),d?($("#rba_nodo_padre_id").html(d),$("#rba_nodo_padre_id").parent().show(),$("#rba_nodo_padre_id").trigger("chosen:updated")):($("#rba_nodo_padre_id").parent().hide(),$("#rba_nodo_padre_id").empty(),$("#rba_nodo_padre_id").trigger("chosen:updated"))}),"edit"===$("#action_name").val()?$("#rba_nodo_arbol_id").change():void 0},$(document).on("page:load",o),$(document).ready(o)}).call(this);