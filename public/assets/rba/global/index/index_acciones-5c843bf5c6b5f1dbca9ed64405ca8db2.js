(function(){jQuery.fn.acciones=function(){return $("#borrar").click(function(){return $.ajax({type:"POST",url:$("#controller_full_path").val()+"/borrar_seleccion",data:{ids:jQuery.fn.getSelected()},dataType:"script",complete:function(){return $("#jqxgrid").jqxGrid("updatebounddata"),$("#jqxgrid").jqxGrid("clearselection")}})}),$("#nuevo").click(function(){var r;return r=""===$("#nodo_actual").val()?"":"?nodo="+$("#nodo_actual").val(),$(location).attr("href",$("#controller_full_path").val()+"/new"+r)})},jQuery.fn.editar=function(r){var t,e;return t=$("#jqxgrid").jqxGrid("getrowdata",r).id,e=$("#controller_full_path").val()+"/"+t+"/edit",$(location).attr("href",e)},jQuery.fn.getSelected=function(){var r,t;return r=$("#jqxgrid").jqxGrid("getselectedrowindexes"),t=[],$.each(r,function(e){return t.push($("#jqxgrid").jqxGrid("getrowdata",r[e]).id)}),t}}).call(this);