json.array!(@rco_asientos) do |rco_asiento|
  json.extract! rco_asiento, :id, :cotizacion, :desc
  json.moneda rco_asiento.moneda.nombre
  json.fecha rco_asiento.fecha.strftime("%d/%m/%Y")
  registros = rco_asiento.registros 
  importe = registros.sum(:debe)
  json.importe importe

end
