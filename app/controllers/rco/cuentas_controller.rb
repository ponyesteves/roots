class Rco::CuentasController < ApplicationController
  before_action :set_rco_cuenta, only: [:show, :edit, :update, :destroy]
 
  # GET /rco/cuentas
  def index
    arbol_index(params[:nodo], empresagrupo_id: session[:empresagrupo_id], 
      flash_nodo: flash[:nodo])
    
    respond_to do |format|
      format.html
      format.json
      format.js {}
    end
  end

  # GET /rco/cuentas/1
  def show
  end

  # GET /rco/cuentas/new
  def new
    @rco_cuenta = Rco::Cuenta.new
    define_nodo(params[:nodo])
  end

  # GET /rco/cuentas/1/edit
  def edit
  end

  # POST /rco/cuentas
  def create
    @rco_cuenta = Rco::Cuenta.new(rco_cuenta_params)
    @rco_cuenta.empresagrupo_id = session[:empresagrupo_id]

    if @rco_cuenta.save
      ubica_en_nodo(params[:nodo])
      redirect_to rco_cuentas_path, notice: 'Cuenta guardado.'     
    else
      render action: 'new'
    end
  end

  # PATCH/PUT /rco/cuentas/1
  def update
    if @rco_cuenta.update(rco_cuenta_params)
      flash[:nodo] = @rco_cuenta.nodos.first.id rescue nil
      redirect_to rco_cuentas_path, notice: 'Cuenta actualizado.'
    else
      render action: 'edit'
    end
  end

  # DELETE /rco/cuentas/1
  def destroy
    @rco_cuenta.destroy
    redirect_to rco_cuentas_url, notice: 'Cuenta eliminado.'
  end

  def borrar_seleccion
    Rco::Cuenta.destroy(params[:ids]) 
    render nothing: true  
  end

  def cuentas_para_operacion
    eg = session[:empresagrupo_id]
    case params[:operaciontipo_codigo]
      when '-2' # Pagos
        @ctasDebe = Rco::Cuenta.xTipos([2.2], eg)
        @ctasHaber = Rco::Cuenta.xTipos([1.1], eg) 
      when '-1' # Egresos
        @ctasDebe = Rco::Cuenta.xTipos([5.0], eg)
        @ctasHaber = Rco::Cuenta.xTipos([1.1,1.2,2.2], eg)
      when '0' # Movimiento de fondos
        @ctasDebe = Rco::Cuenta.xTipos([1.1,1.2,2.2,3.0], eg)
        @ctasHaber = Rco::Cuenta.xTipos([1.1,1.2,2.2,3.0], eg)
      when '1' # Ingreso
        @ctasDebe = Rco::Cuenta.xTipos([1.1,1.2], eg)
        @ctasHaber = Rco::Cuenta.xTipos([4.0], eg)
      when '2' #Cobranza
        @ctasDebe = Rco::Cuenta.xTipos([1.1], eg)
        @ctasHaber = Rco::Cuenta.xTipos([1.2], eg)
    end 
  
    respond_to do |format|
      format.js {}
    end
  end  
 


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_rco_cuenta
      @rco_cuenta = Rco::Cuenta.find(params[:id])
    end



    # Only allow a trusted parameter "white list" through.
    def rco_cuenta_params
      params.require(:rco_cuenta).permit(:codigo, :nombre, 
        :estado, :desc, :cuentatipo_id, :empresagrupo_id)
    end
end
