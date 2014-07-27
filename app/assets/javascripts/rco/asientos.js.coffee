ready = ->
	if $('#con_arbol').val() == 'true'
		$.fn.arbolInit()
	$.fn.gridRequest()
	sumInicial()
	ActSumDebe()
	ActSumHaber()
	submitOn(false)

	$('#rco_asiento_moneda_id').change () ->
		cot = $('#rco_asiento_moneda_id option:selected').data('cot')
		$('#rco_asiento_cotizacion').val(cot)
	
	$('input, textarea').change () ->
		controlBoton()
	
	$('.agregar_campos').click () ->
    time = new Date().getTime()
    regexp = new RegExp($(this).data('id'), 'g')
    $('#container').append($(this).data('fields').replace(regexp, time))
    $.fn.activarCalcular()
    $.fn.initChosen()
    $('.chosen-single:visible').last().focus()

	$('form').on 'click', '.simil_agrega_campos', () ->
		$('.agregar_campos').click()
	
	$('form').on 'click', '.quitar_campos', () ->
		$(this).parent().prev('input[type=hidden]').val('1')
		$(this).closest('.row').hide()
		sumInicial()
		controlBoton()
		$('.chosen-single:visible')[1].focus()

$.fn.gridRequest = (query) ->
	nombres = ['id','fecha','desc','importe','moneda','cotizacion']
	propiedades = [['Fecha','auto'],['desc','auto','Descripcion'],['Importe','auto'],
	['Moneda','auto'],['Cotizacion','auto']]
	$.fn.gridPrepDatos(nombres, propiedades, query)

sumInicial = () ->
	sumDebe()
	sumHaber()
	difDebeHaber()

ActSumDebe = () ->
	$('form').on 'change', '.debe', () ->
		controlBoton()
		sumDebe()
		difDebeHaber()
				
ActSumHaber = () ->
	$('form').on 'change', '.haber', () ->
		controlBoton()
		sumHaber()
		difDebeHaber()

sumDebe = () ->
	$('#debe').val(0)
	$('.debe:visible').each ->
		$('#debe').val(parseFloat($('#debe').val()) + parseFloat($(this).val()))

sumHaber = () ->
	$('#haber').val(0)
	$('.haber:visible').each ->
		$('#haber').val(parseFloat($('#haber').val()) + parseFloat($(this).val()))

difDebeHaber = () ->
	$('#diferencia').val($('#debe').val() - $('#haber').val())

submitOn = (valor) ->
	if valor == true
		$("input[type=submit]").removeAttr("disabled")
	else	
		$("input[type=submit]").attr("disabled", "disabled")

controlBoton = () ->
	if $('#debe').val() == $('#haber').val() && $('#debe').val() != ""
		submitOn(true)
	else
		submitOn(false)

$(document).on('page:load', ready)
$(document).ready(ready)