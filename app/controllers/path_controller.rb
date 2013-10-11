class PathController < ApplicationController
  def show_path
      @answers_array = params[:answers_array]
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

  Inf = 1.0/0.0
  def parse_client
    ruleValidTo = (1..Inf).each {|x| break x-1 if params.member?("rule" + x.to_s) == false }
    @answers = (1..ruleValidTo).inject([]) {|x,y| x << params["rule" + y.to_s]}
    redirect_to path_show_path_path(answers_array: @answers)
  end

end
