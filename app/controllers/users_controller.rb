class UsersController < ApplicationController
def new
  @user = User.new
  render :layout => false
end

def show
  if session[:user_id]
    render "users/map.html.erb"
  else
    redirect_to 'users#index'
  end
end

def index #SPLASH PAGE!!
  @user = User.new
  render 'users/index'
end

def create
  @user = User.new(user_params)
  if @user.save
    redirect_to '/'
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
