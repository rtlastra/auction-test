class Api::V1::ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  include ResponseRenderer

  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue
      render_json_api_general_error(['unauthorized'], :unauthorized)
    end
  end

  def is_admin?
    @current_user.role == Role.find_by_name('admin')
  end
end