class Rco::Moneda < ActiveRecord::Base
	include ModeloGlobales
  habtm_nodo
end
