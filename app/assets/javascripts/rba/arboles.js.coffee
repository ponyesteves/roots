ready = ->
	if $('#con_arbol').val() == 'true'
		jQuery.fn.arbolInit()
	jQuery.fn.gridRequest()

jQuery.fn.gridRequest = (query) ->
	nombres = ['id','nombre', 'modelo']
	propiedades = [['Nombre','20%'],['Modelo','20%']]
	jQuery.fn.gridPrepDatos(nombres, propiedades)
	
$(document).on('page:load', ready)
$(document).ready(ready)