class Rba::SesionesController < ApplicationController
	skip_before_filter :validar_usuario

	def new
	end

	def create
		usuario = Rba::Usuario.find_by_usuario(params[:usuario])
		if usuario && usuario.authenticate(params[:password])
			session[:usuario_id] = usuario.id
			redirect_to rba_usuarios_url, :notice => "Adentro! Dijo Juan Carlos Saravia"
		else
			
			redirect_to root_url, :notice => "Usuario ó contraseña incorrectos"
		end
	end

	def salir
		session[:usuario_id] = nil
		redirect_to root_url
	end

end
