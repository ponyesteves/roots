(function(){var a;a=function(){var a,t;return""===$("#filtro_desde").val()&&$("#filtro_desde").val($.fn.primerDiaDelMesActual()),""===$("#filtro_hasta").val()&&$("#filtro_hasta").val($.fn.ultimoDiaDelMesActual()),a=$("#filtro_desde").val(),t=$("#filtro_hasta").val(),$.fn.agregarFiltros([["desde","date",a],["hasta","date",t]])},$(document).on("page:load",a),$(document).ready(a)}).call(this);