class PathController < ApplicationController
  def show_path
      @answers_array = params[:answers_array]
      if @answers_array.nil? then 
          @answers_array = []
      end
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
    puts "====================================================="
    puts params

    @answers = []
    ruleValidTo = (1..Inf).each {|x| break x-1 if params.member?("rule" + x.to_s) == false }


    @answers = (1..ruleValidTo).inject([]) do |x,y|
        string = "rule"+y.to_s
        x << params[string]
    end

    puts @answers

    redirect_to path_show_path_path(answers_array: @answers)
  end

end
