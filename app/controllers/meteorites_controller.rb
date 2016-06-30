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
    @meteorite = Meteorite.find_or_create_by(nasa_id: params[:nasa_id], family_id: determine_fam(params), user_id: session[:user_id], defeated: true)
    redirect_to root_path
  end

  def index
    @meteorites = User.find(session[:user_id]).meteorites.to_json
    render json: @meteorites
  end
end
