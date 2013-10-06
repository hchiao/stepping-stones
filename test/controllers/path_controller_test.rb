require 'test_helper'

class PathControllerTest < ActionController::TestCase
  test "should get show_path" do
    get :show_path
    assert_response :success
  end

  test "should get customize_path" do
    get :customize_path
    assert_response :success
  end

  test "should get parse_path" do
    get :parse_path
    assert_response :success
  end

end
