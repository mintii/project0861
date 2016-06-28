class UsersController < ApplicationController
  # before_action :find_user, only: [:new, :create]
def new
  @user = User.new
  render :layout => false
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
