class MeteoritesController < ApplicationController

  def determine_fam(params)
    if params[:family_id] == "L"
      return 1
    elsif params[:family_id] == "H"
      return 2
    elsif params[:family_id] == "I"
      return 3
    else
      return 4
    end
  end

  def create
    p "Hi I'm a meteorite WWWWWWWWWWWWWWWW"
    @meteorite = Meteorite.find_or_initialize_by(nasa_id: params[:nasa_id], family_id: determine_fam(params), user_id: current_user.id, defeated: true)
    p @meteorite
    @meteorite.save
    redirect_to root_path #start game
    # else
      #shit is fucked if this hits
    # end
  end

  # def new
  #   @meteorite = Meteorite.new
  # end
end
