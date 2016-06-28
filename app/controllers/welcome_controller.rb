class WelcomeController < ApplicationController
  def index
    if session[:user_id]
      render 'welcome/map.html.erb'
    else
      redirect_to 'welcome#entrance'
    end
  end


end
