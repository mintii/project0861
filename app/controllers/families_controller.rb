class FamiliesController < ApplicationController
  def create
    @family = Family.find_or_create_by(rock_type: params[:rock_type])
    redirect_to root_path #start game
  end

end
