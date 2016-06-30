class UsersController < ApplicationController
  helper SessionsHelper
  # before_action :find_user, only: [:new, :create]
def new
  @user = User.new
  render :layout => false
end

def show
  if session[:user_id]
    @start_new_game = false
    @user = User.find(session[:user_id])
    render 'users/map.html.erb'
  else
    redirect_to 'users#index'
  end
end

def index
  @user = User.new
  if session[:user_id]
    render 'users/map'
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
