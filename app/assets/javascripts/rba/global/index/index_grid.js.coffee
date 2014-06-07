jQuery.fn.grid = (col_nombres, col_props)->
	$("#cargando").css('display', 'block')
	$("#jqxgrid").jqxGrid('destroy')
	$(".panelGrid" ).append('<div id="jqxgrid"></div>')
	jQuery.fn.acciones()
	url = $('#controller_path').val() + '.json'
	source =
	datatype: "json"
	datafields: col_nombres
	id: 'id'
	url: url
	dataAdapter = new $.jqx.dataAdapter(source)
	$("#jqxgrid").jqxGrid
		source: dataAdapter,
		ready: ->
			$('#jqxgrid').jqxGrid('localizestrings', jQuery.fn.gridLoc())
			$('#gridpagerlistjqxgrid').css('width','auto')
			$('#cargando').css('display', 'none')    
			$('#jqxgrid').on 'groupschanged', () -> 
				$('#jqxgrid').jqxGrid('sortby', col_nombres[1].name, 'asc')
				#al agrupar debo ordenar para que el indexs quede correcto
		columnsresize: true,
		columns: col_props,
		width: '100%',
		groupable: true,
		sortable: true,
		# selectionmode: 'checkbox',
		selectionmode: 'multiplerows',
		filterable: true,
		pageable: true

