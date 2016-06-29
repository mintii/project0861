class MeteoritesController < ApplicationController

  def determine_fam(params)
    if params[:family_id] == "L"
      return 1
    elsif params[:family_id] == "H"
      return 2
    elsif params[:family_id] == "I"
      return 3
    else # U
      return 4
    end
  end

  def create
    @meteorite = Meteorite.find_or_initialize_by(nasa_id: params[:nasa_id], family_id: determine_fam(params), user_id: current_user.id, defeated: true)
    @meteorite.save
    redirect_to root_path #start game
  end

  # def new
  #   @meteorite = Meteorite.new
  # end

  def index
    @meteorites = current_user.meteorites.to_json
    render json: @meteorites
  end
end
