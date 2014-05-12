class Rba::Usuario < ActiveRecord::Base
	has_secure_password
	validates_uniqueness_of :usuario
	validates_presence_of :usuario
	validates_presence_of :password, :on => :create

end