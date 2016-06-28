class Meteorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :family

  # maybe make a method here that takes the meteorite's type and automatically associate it
  # with a family.

end
