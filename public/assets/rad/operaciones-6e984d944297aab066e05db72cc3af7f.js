(function(){var a,e,t,r,i,o,n,c,s,p,d,l,u,_,h,f,m,v,g,b,w,x,k,y;x=function(){switch("true"===$("#con_arbol").val()&&$.fn.arbolInit(),$.fn.gridRequest(),$(".calcularValores").change(function(){return c({})}),$("#rad_operacion_operaciontipo_id").change(function(){return m("I"),b("O"),t()}),$("#rad_operacion_organizacion_id").change(function(){return e()}),$("#action_name").val()){case"new":t();break;case"edit":case"create":$.fn.defineUiXOpTipo()}return $(".agregar_campos_D, .agregar_campos_H").click(function(){var e,t,r,i;return i=(new Date).getTime(),r=new RegExp($(this).data("id"),"g"),null!==$(this).attr("class").match(/agregar_campos_D/g)?(e=".row.debe",t="ContainerDebe"):(e=".row.haber",t="ContainerHaber"),0!==$(e).length?($(e+":last").after($(this).data("fields").replace(r,i)),$(e+":last select").empty().append($(e+":first select option").clone()).trigger("chosen:updated")):$("#container."+t).append($(this).data("fields").replace(r,i)),$.fn.initChosen(),a(!1),k($("#rad_operacion_rdosxmes").prop("checked")),!1}),$("form").on("click",".simil_agrega_campos_D",function(){return $(".agregar_campos_D").click(),!1}),$("form").on("click",".simil_agrega_campos_H",function(){return $(".agregar_campos_H").click(),!1}),$("form").on("click",".quitar_campos",function(){return $(this).parent().prev("input[type=hidden]").val("1"),$(this).closest(".row").find("input.valor").val(0),$(this).closest(".row").find("input._destroy").val("true"),$(this).closest(".row").hide(),s(),$(".chosen-single:visible")[1].focus(),!1}),$("#rad_operacion_rdosxmes").click(function(){return k($(this).prop("checked"))})},a=function(a){var e;return e=".row."+String(d()),a===!0&&s(),$(e+" input[name*=valor], #rad_operacion_rdosxmes").change(function(){return s()})},i=function(){var a,e,t,r;return e=void 0,t=0,r=-1,a=[],$.each(w(),function(){var i;return i=$(this).data("cuenta"),i===e?t+=parseFloat($(this).data("disponible")):(r+=1,t=parseFloat($(this).data("disponible"))),a[r]={cuenta:i,disponible:t},e=i}),a},w=function(){return $("#aplicaciones option:selected").sort(function(a,e){return $(a).data("cuenta")-$(e).data("cuenta")})},o=function(){var a,e,t,r;if(e=i(),t=f(),r=function(){return $(".row."+t).each(function(a){return $("select."+t,this).val(e[a].cuenta),$("input[type=text]."+t,this).val(e[a].disponible.toFixed(2))}),$(".row."+t+" select").trigger("chosen:updated")},e.length!==$(".row."+t).length)for($(".row."+t).not(":first").empty(),a=e.length;a-=1;)$("a.agregar_campos_"+t[0].toUpperCase()).click();return r()},t=function(){return $.ajax({type:"POST",url:$("#root_path").val()+"rco/cuentas/x_operacion_tipo",data:{operaciontipo_codigo:l()},dataType:"script"})},e=function(){var a;switch($("#action_name").val()){case"edit":a={saldo_tipo:f(),rad_operacion_id:u()};break;case"new":case"create":a={saldo_tipo:f(),organizacion_id:_()}}return $.ajax({type:"POST",url:$("#root_path").val()+"rad/operaciones/compatibles",data:a,dataType:"script"})},r=function(a,e){var t,r;return t="reg_"+a.attr("id"),r=parseFloat("undefined"===a.data("aplicado")||"onSelect"===e?a.data("disponible"):a.data("aplicado")),$("#compatiblesImporte").append("<span>Ref "+a.data("desc")+"</span><input id="+t+" name="+t+' type="text" value="'+r+'">'),$("#compatiblesImporte input").change(function(){return n()})},c=function(a){var e,t,r,i,o,n,c;switch(n="#rad_operacion_",i=$(n+"importe").val(),t=$(n+"cuotas").val(),o=$(n+"cuotaimporte").val(o),l()){case-3:case 2:case-1:e="input.haber";break;case 1:case-2:case 3:e="input.debe"}switch(h()){case!0:c=(t*o).toFixed(2),r="importe",$(e).val(o),$("input."+f()).val(o);break;case!1:c=(i/t).toFixed(2),r="cuotaimporte","edita_registros"===a.solicitante?($("input."+d()).val(i),$("input."+f()).val(i)):$(e).val(i)}return $(n+r).val(c)},n=function(){return $("#rad_operacion_importe").val(0),$("#compatiblesImporte input").each(function(){var a,e,t;return a=$(this).attr("id").substr(4),t=$("#aplicaciones #"+a),parseFloat($(this).val())>parseFloat(t.data("disponible"))&&$(this).val(t.data("disponible")),e=parseFloat($("#rad_operacion_importe").val())+parseFloat($(this).val()),$("#rad_operacion_importe").val(e.toFixed(2)),t.val(a+", "+$(this).val()),o(),c({solicitante:"edita_registros"})})},s=function(){var a,e,t;switch(a=".row."+String(d()),t=0,$.each($(a+" input[name*=valor]"),function(){var a;return a=0,""!==$(this).val()&&(a=$(this).val()),t+=parseFloat(a)}),h()){case!0:e="cuotaimporte";break;case!1:e="importe"}return $("#rad_operacion_"+e).val(t.toFixed(2)).change()},p=function(a){switch(a){case"debe":return $(".row.debe:first select option:selected").val();case"haber":return $(".row.haber:first select option:selected").val()}},f=function(){var a;switch(l()){case 1:case-2:case 3:return a="debe";case-3:case 2:case-1:return a="haber"}},d=function(){var a;switch(l()){case-3:case 2:case-1:return a="debe";case 1:case-2:case 3:return a="haber";case 0:return a="movimiento_fondos"}},_=function(){return $("#rad_operacion_organizacion_id").val()},u=function(){return $("#rad_operacion_id").val()},h=function(){return $("#rad_operacion_rdosxmes").prop("checked")},l=function(){return $("#rad_operacion_operaciontipo_id option:selected").data("codigo")},v=function(){var a,e,t;return t=d(),a=!0,$("a.simil_agrega_campos_D, a.agregar_campos_D, .debe a.quitar_campos").show(),$("a.simil_agrega_campos_H, a.agregar_campos_H, .haber a.quitar_campos, .debe a.quitar_campos:first").hide(),"movimiento_fondos"!==t&&"edit"!==$("#action_name").val()&&$(".row."+t).not(":first").remove(),$("input.debe").prop("readonly",e+!a),$("input.haber").prop("readonly",a),$("[readonly]").prop("tabindex",-1)},m=function(a){var e;return e=y(a),$("#rad_operacion_cuotas, #rad_operacion_cuotaimporte").prop("readonly",!e)},b=function(a){var e;return e=y(a),$("#rad_operacion_rdosxmes").prop("disabled",!e),$("#rad_operacion_rdosxmes").prop("checked",e),k(!e)},g=function(a){switch(a){case"I":return $("#rad_operacion_organizacion_id").prop("disabled",!1).parent().show();case"O":return $("#rad_operacion_organizacion_id").prop("disabled",!0).parent().hide()}},k=function(a){var e;return a===!0&&(e="Valor mensual"),a===!1&&(e="Valor"),$("input[name*=valor]").attr("placeholder",e)},y=function(a){switch(a){case"I":return!0;case"O":return!1}},$.fn.cargaCompatibles=function(a){return $("#compatibles").empty(),$("#compatiblesImporte").empty(),0!==a.length?($("#compatibles").append('<span>Aplicar</span><select  data-placeholder="Seleccionar registros" id="aplicaciones" name="aplicaciones[]" multiple></select>'),$.each(a,function(){var a;return a='<option id="'+this.id+'" value="'+this.id+", "+this.disponible+'" data-disponible="'+this.disponible+'"data-aplicado="'+this.aplicadoATransaccion+'"data-cuenta="'+this.cuenta_id+'"data-desc="'+this.desc+'">'+this.desc+" -- disp: "+this.disponible+" -- venc: "+this.fecha+"</option>",$("#aplicaciones").append(a)}),$("#aplicaciones").change(function(){return $("#compatiblesImporte").empty(),$("#aplicaciones option:selected").each(function(){return r($(this),"onSelect")}),n(),$("#compatiblesImporte input").focus()}),$.fn.initChosen()):void 0},$.fn.defineUiXOpTipo=function(){var t;if(t=l(),0===t)m("O"),b("O"),g("O");else switch(g("I"),e(),t){case 3:case-3:b("I");break;default:b("0")}return v(),a(!0),$("a.agregar_campos_D, a.agregar_campos_H").prop("tabindex",-1)},$.fn.gridRequest=function(a){var e,t;return e=["id","fecha","tipo","importe","desc","cuotaimporte"],t=[["Fecha","20%"],["Tipo","auto"],["Importe","20%"],["desc","auto","Descripci\xf3n"],["cuotaimporte","auto","Cuota"]],$.fn.gridPrepDatos(e,t,a)},$.fn.seleccionaAplicados=function(a){return $("#aplicaciones "+a).prop("selected",!0).trigger("chosen:updated"),$.each($("#aplicaciones "+a),function(){return r($(this),"onRecord")})},$(document).on("page:load",x),$(document).ready(x)}).call(this);