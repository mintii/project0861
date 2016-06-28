class MeteoritesController < ApplicationController

  def new
    if request.xhr?
      p request
    end
  end
end
