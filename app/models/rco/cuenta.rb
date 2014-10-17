class Rco::Cuenta < ActiveRecord::Base
  include ModeloGlobales
  habtm_nodo
  belongs_to :cuentatipo
  has_many :registros
  belongs_to :empresagrupo, :class_name => "Rba::Empresagrupo"
  
  # def self.conSaldo(tipos, fecha, empresagrupo_id)
  # 	deEmpresaGrupoXId(empresagrupo_id).includes(:cuentatipo).
  # 	where('rco_cuentatipos.codigo in ( ? )', tipos).
  # 	joins(:registros).group('rco_cuentas.id').
  #   where('rco_registros.fecha <= :fecha', :fecha => fecha).
		# having('coalesce(sum(rco_registros.debe),0)-coalesce(sum(rco_registros.haber),0) != 0').
		# references(:cuentatipo,:registros)
  # end

  def self.tipos(tipos, empresagrupo_id)
    deEmpresaGrupoXId(empresagrupo_id).
    includes(:cuentatipo).
    where('rco_cuentatipos.codigo in (?)', tipos).references(:cuentatipo)
  end 
  
  def self.conSaldo(tipos, fecha, empresagrupo_id)
    tipos(tipos, empresagrupo_id).
    joins(:registros).group('rco_cuentas.id').
    where('rco_registros.fecha <= :fecha', :fecha => fecha).
    having('coalesce(sum(rco_registros.debe),0)-coalesce(sum(rco_registros.haber),0) != 0').
    references(:registros)
  end


  
end
