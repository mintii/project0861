class UsersController < ApplicationController
  # helper SessionsHelper
  # before_action :find_user, only: [:new, :create]
def new
  @user = User.new
  render :layout => false
end

def show
  if session[:user_id]
    @start_new_game = User.find(session[:user_id]).meteorites.length == 0
    @user = User.find(session[:user_id])
    render 'users/map.html.erb'
  else
    redirect_to 'users#index'
  end
end

def index
  @user = User.new
  highscore_data = User.all.sort { |a,b| a.families.length <=> b.families.length }[0..4]
  p highscore_data
  @highscores = []
  @highscore_names = []
  (0..4).each do |rank|
    if highscore_data[rank]
      @highscores[rank] = highscore_data[rank].families.length
      @highscore_names[rank] = highscore_data[rank].username
    else
      @highscores[rank] = 0
      @highscore_names[rank] = "Your Name Could Go Here!"
    end
  end
  p @highscores
  p @highscore_names

  if session[:user_id]
    redirect_to user_path(id: session[:user_id])
  end
end

def create
  @user = User.new(user_params)
  if @user.save
    @start_new_game = true
    session[:user_id] = @user.id
    render 'users/map.html.erb'
  else
    render "new"
  end
end

private

  def user_params
    params.require(:user).permit(:username, :password)
  end

  def find_user
    @user = User.find(params[:id])
  end

end
