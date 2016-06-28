class User < ActiveRecord::Base
  has_secure_password
  has_many :meteorites

  # set win boolean automatically to false, and then set to true when the player finds a family.

end
