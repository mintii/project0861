class Family < ActiveRecord::Base
  has_many :meteorites
  has_many :users, through: :meteorites
end
