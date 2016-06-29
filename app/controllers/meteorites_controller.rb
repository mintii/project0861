class MeteoritesController < ApplicationController

  def create
    @meteorite = Meteorite.find_by(rock_type: params[:rock_type]) || Meteorite.create(params)
    if @meteorite.save
      redirect_to root_path #start game
    else
      #shit is fucked if this hits
    end
  end

  def new
    @meteorite = Meteorite.new
  end
end
