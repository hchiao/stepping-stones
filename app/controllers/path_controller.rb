class PathController < ApplicationController
  def show_path
  end

  def customize_path
  end

  def parse_path
    rules = DynamicPath.new.parse(params)
    session[:rules] = rules
    redirect_to path_client_form_path
  end

  def client_form
    @rules = session[:rules]

  end

  def parse_client
    redirect_to path_show_path_path
  end

end
