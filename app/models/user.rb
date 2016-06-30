class User < ActiveRecord::Base
  has_secure_password
  has_many :meteorites
  scope :by_family, joins: :meteorites, group: "user.id", order: "COUNT(reviews.score) DESC"
  # set win boolean automatically to false, and then set to true when the player finds a family.

end
