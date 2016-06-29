class MeteoritesController < ApplicationController
  def determine_fam(meteorite)
    if meteorite.recclass[0] == "L"
      return 1
    elsif meteorite.recclass[0] == "H"
      return 2
    elsif meteorite.recclass[0] == "I"
      return 3
    else
      return 4
    end

  end

  def create
    @meteorite = Meteorite.find_or_initialize_by(nasa_id: params[:nasa_id], family_id: determine_fam(params), user_id: current_user, defeated: true)
    @meteorite.save
      # redirect_to root_path #start game
    # else
      #shit is fucked if this hits
    # end
  end

  def new
    @meteorite = Meteorite.new
  end
end
