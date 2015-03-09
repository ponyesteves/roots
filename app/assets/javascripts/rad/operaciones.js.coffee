ready = ->
	if $('#con_arbol').val() == 'true'
		$.fn.arbolInit()
	$.fn.gridRequest()
	$('.calcularValores').change ->
		calcularValores()
	$('#rad_operacion_operaciontipo_id').change ->
		interruptorCuotas(false); interruptorRdosxmes(true)
		actualizarCuentas(getTipoOpCodigo())
		$.fn.defineUiXOpTipo([getTipoOpCodigo(), undefined])
	switch $('#action_name').val()
		when 'new' then actualizarCuentas(getTipoOpCodigo())		
		when 'edit' then $.fn.defineUiXOpTipo([getTipoOpCodigo(), $('#rad_operacion_id').val()])
		when 'create' then $.fn.defineUiXOpTipo([getTipoOpCodigo(), undefined])
	$('.agregar_campos_D, .agregar_campos_H').click () ->
		time = new Date().getTime()
		regexp = new RegExp($(this).data('id'), 'g')
		if $(this).attr("class").match(/agregar_campos_D/g) != null
			afterRow = '.row.debe'
			containerClass = 'ContainerDebe'
		else
			afterRow = '.row.haber'
			containerClass = 'ContainerHaber'
		if $(afterRow).length != 0
			$(afterRow+':last').after($(this).data('fields').replace(regexp, time))
			$(afterRow+':last select').empty().append($(afterRow+':first select option').clone()).trigger("chosen:updated")
		else
			$("#container."+containerClass).append($(this).data('fields').replace(regexp, time)) 			
		$.fn.initChosen()
		activaCalculos()
		setPlaceHolder($('#rad_operacion_rdosxmes').prop('checked'))
		return false
	$('form').on 'click', '.simil_agrega_campos_D', () ->
		$('.agregar_campos_D').click()
		return false
	$('form').on 'click', '.simil_agrega_campos_H', () ->
		$('.agregar_campos_H').click()
		return false
	$('form').on 'click', '.quitar_campos', () ->
		$(this).parent().prev('input[type=hidden]').val('1')
		$(this).closest('.row').remove()
		$('.chosen-single:visible')[1].focus()
		return false
	$('#rad_operacion_rdosxmes').click () ->
		setPlaceHolder($(this).prop('checked'))
activaCalculos = () ->
	multilinea = '.row.' + String(getUbMultilinea())
	$(multilinea + ' input[name*=valor], #rad_operacion_rdosxmes').change ->
		total = 0
		$.each $(multilinea + ' input[name*=valor]'), () ->
			valor = 0
			valor = $(this).val() if $(this).val() != ""
			total += parseInt(valor)
		switch getRMes()
			when true then rm = 'cuotaimporte'
			when false then rm = 'importe'
		$('#rad_operacion_'+rm).val(total.toFixed(2)).change()
activaCuentasCompatiblesOnChange = (saldoTipo) ->
	switch saldoTipo
		when "debe" then (
			$('.row.debe select, .row.haber select').unbind("change")
			$('.row.debe select').change ->
				actualizarCompatibles(["buscaPorCta", getCuentaId("debe"),"debe"])
		)
		when "haber" then (
			$('.row.debe select, .row.haber select').unbind("change")
			$('.row.haber select').change ->
				actualizarCompatibles(["buscaPorCta", getCuentaId("haber"),"haber"])
		)
actualizarCuentas = (operaciontipo_codigo) ->
	$.ajax(
		type: "POST"
		url: $('#root_path').val() + 'rco/cuentas/x_operacion_tipo'
		data:
			operaciontipo_codigo: operaciontipo_codigo
		dataType: "script"
		)
actualizarCompatibles = (opcionesArray) ->
	if opcionesArray[0] == "buscaPorReg"
		data =
			rad_operacion_id: opcionesArray[1]
			saldoTipo: opcionesArray[2]
	else #buscaPorCta
		data = 
			saldoTipo: opcionesArray[2]
			cuenta_id: opcionesArray[1]
	$.ajax(
		type: "POST"
		url: $('#root_path').val() + 'rad/operaciones/compatibles'
		data: data
		dataType: "script"
    )
agregaEditorRegistro = (registro, momento) ->
	id = "reg_" + registro.attr("id")
	if registro.data("aplicado") == 'undefined' || momento == 'onSelect'
		valorEditorRegistro = registro.data("disponible")
	else
		valorEditorRegistro = registro.data("aplicado")
	$('#compatiblesImporte').append('<span>Ref '+registro.data("desc")+'</span><input id='+id+' name='+id+' type="text" value="' + valorEditorRegistro + '">')
	$('#compatiblesImporte input').change ->
		calculaImporteDesdeAplicaciones()
calcularValores = (obj) ->
	opTipo = $('#rad_operacion_operaciontipo_id option:selected').data('codigo')
	pf = '#rad_operacion_' #pf
	importe = $(pf + 'importe').val()
	cuotas = $(pf + 'cuotas').val()
	importeCuota = $(pf + 'cuotaimporte').val(importeCuota)
	switch opTipo
		when -3,-2,-1
			contraPartida = 'input.haber'
		when 1,2,3
			contraPartida = 'input.debe'
	switch getRMes()
		when true
	 		valorAActualizar = (cuotas * importeCuota).toFixed(2)
	 		idQueSeActualiza = 'importe'
	 		$(contraPartida).val(importeCuota)
 		when false
	 		valorAActualizar = (importe / cuotas).toFixed(2)
	 		idQueSeActualiza = 'cuotaimporte'
	 		$(contraPartida).val(importe)
	$(pf + idQueSeActualiza).val(valorAActualizar)
calculaImporteDesdeAplicaciones = () ->
	$('#rad_operacion_importe').val(0)
	$('#compatiblesImporte input').each ->
		id = $(this).attr("id").substr(4)
		opcion = $('#aplicaciones #' + id )
		$(this).val(opcion.data("disponible")) if parseFloat($(this).val()) > parseFloat(opcion.data("disponible"))
		importe = parseFloat($('#rad_operacion_importe').val()) + parseFloat($(this).val())
		$('#rad_operacion_importe').val(importe.toFixed(2))
		opcion.val(id + ', ' + $(this).val()) 
	$('#rad_operacion_importe').change()
getCuentaId = (saldoTipo) ->
	switch saldoTipo
		when "debe" then $('.row.debe:first select option:selected').val()
		when "haber" then $('.row.haber:first select option:selected').val()
getRMes = () ->
	$('#rad_operacion_rdosxmes').prop('checked')
getTipoOpCodigo = () ->
	$('#rad_operacion_operaciontipo_id option:selected').data('codigo')
getUbMultilinea = () ->
	switch getTipoOpCodigo()
		when -3, 2,-1
			saldoTipo = "debe"
		when 1,-2,3
			saldoTipo = "haber"
interruptorInputsYAgregarLinea = (queHabilito) ->
	if queHabilito == 'debe'
		posicion = true
		$('a.simil_agrega_campos_D, a.agregar_campos_D, .debe a.quitar_campos').show()
		$('a.simil_agrega_campos_H, a.agregar_campos_H, .haber a.quitar_campos, .debe a.quitar_campos:first').hide()
	else
		$('a.simil_agrega_campos_H, a.agregar_campos_H, .haber a.quitar_campos').show()
		$('a.simil_agrega_campos_D, a.agregar_campos_D, .debe a.quitar_campos, .haber a.quitar_campos:first').hide()
		posicion = false
	$('input.debe').prop('readonly',!posicion)
	$('input.haber').prop('readonly',posicion)
	$('[readonly]').prop('tabindex',-1)
interruptorCuotas = (posicion) ->
	$('#rad_operacion_cuotas, #rad_operacion_cuotaimporte').prop('readonly', posicion)
interruptorRdosxmes = (posicion) ->
	$('#rad_operacion_rdosxmes').prop('disabled', posicion)
	$('#rad_operacion_rdosxmes').prop('checked', !posicion)
	setPlaceHolder(!posicion)
setPlaceHolder = (posicion) ->
	placeHolder = "Valor mensual" if posicion == true
	placeHolder = "Valor" if posicion == false	
	$('input[name*=valor]').attr("placeholder", placeHolder)
$.fn.cargaCompatibles = (datos) ->
	$('#compatibles').empty()
	$('#compatiblesImporte').empty()
	if datos.length != 0
		$('#compatibles').append('<span>Aplicar</span><select  data-placeholder="Seleccionar registros" id="aplicaciones" name="aplicaciones[]" multiple></select>')
		$.each datos, (i) ->
			opcion = '<option id="'+ this.id + '" value="'+ this.id + ', ' + this.disponible + '" data-disponible="'+ this.disponible + '"' +
			'data-aplicado="'+ this.aplicadoATransaccion + '"' +
			'data-desc="'+this.desc+'">' + 
			this.desc + 
			' -- disp: '+ this.disponible +
			' -- venc: ' + this.fecha + 
			'</option>'
			$('#aplicaciones').append(opcion)
		$('#aplicaciones').change ->
			$('#compatiblesImporte').empty()
			$('#aplicaciones option:selected').each ->
				agregaEditorRegistro($(this),'onSelect')
			calculaImporteDesdeAplicaciones()
			$('#compatiblesImporte input').focus()
		$.fn.initChosen()
$.fn.defineUiXOpTipo = (opcionesArray) ->
	# [cuenta_id, saldoTipo] si es edit [rad_operacion_id]
	# opcionesArray [opCodigo, operacion_id (si es edit)]
	switch opcionesArray[0]
		#MOV DE FONDOS
		when 0 then interruptorCuotas(true); interruptorRdosxmes(true)
		#PROVISIÓN EGRESOS, EGRESOS Y COBRANZAS
		when -1, 2, -3 then (
			if opcionesArray[0] == -3
				interruptorRdosxmes(false)
			else
				interruptorRdosxmes(true)
			if opcionesArray[1] == undefined
				actualizarCompatibles(["buscaPorCta", getCuentaId("haber"),"haber"])
			else
				actualizarCompatibles(["buscaPorReg", opcionesArray[1], "haber"])
			activaCuentasCompatiblesOnChange("haber")
			interruptorInputsYAgregarLinea('debe')
			$('.row.haber').not(':first').remove()
		)
		#PROVISIÓN INGRESOS, INGRESOS Y PAGOS
		when 1, -2, 3 then (
			if opcionesArray[0] == 3
				interruptorRdosxmes(false)
			else
				interruptorRdosxmes(true) 
			if opcionesArray[1] == undefined
				actualizarCompatibles(["buscaPorCta", getCuentaId("debe"),"debe"])
			else
				actualizarCompatibles(["buscaPorReg", opcionesArray[1], "debe"])
			activaCuentasCompatiblesOnChange("debe")
			interruptorInputsYAgregarLinea('haber')
			$('.row.debe').not(':first').remove()
		)
	activaCalculos()
	$('a.agregar_campos_D, a.agregar_campos_H').prop('tabindex',-1)
$.fn.gridRequest = (query) ->
	nombres = ['id','fecha','tipo', 'importe','desc','cuotaimporte']
	propiedades = [['Fecha','20%'],['Tipo','auto'],['Importe','20%'],['desc','auto', 'Descripción'],['cuotaimporte','auto','Cuota']]
	$.fn.gridPrepDatos(nombres, propiedades, query)	
$.fn.seleccionaAplicados = (aplicados_ids) ->
	$('#aplicaciones ' + aplicados_ids).prop("selected", true).trigger("chosen:updated")
	$.each $('#aplicaciones ' + aplicados_ids), () ->
		agregaEditorRegistro($(this),'onRecord')
		
$(document).on('page:load', ready)
$(document).ready(ready)