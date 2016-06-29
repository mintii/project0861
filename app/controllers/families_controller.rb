class FamiliesController < ApplicationController
  def create
    @family = Family.find_or_initialize_by(rock_type: params[:rock_type])
    @family.save
      # redirect_to root_path #start game
    # else
      #shit is fucked if this hits
    # end
  end

  # def new
  #   @family = Family.new
  # end
end
