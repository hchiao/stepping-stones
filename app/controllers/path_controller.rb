class PathController < ApplicationController
  def show_path
      @stuff = params[:stuff]
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
    respond_to do |format|
        format.html
        format.json {render json: @rules.to_json}
    end
  end

  def parse_client
    puts "====================================================="
    puts params

    @answers = []
    #TODO 1..10  ->  1..Inf
    (1..10).each do |x|
        string = "rule" + x.to_s
        @answers << params[string]
    end

    puts @answers

    redirect_to path_show_path_path(stuff: @answers)
  end

end
