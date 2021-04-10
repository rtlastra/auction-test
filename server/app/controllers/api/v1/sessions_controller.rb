class Api::V1::SessionsController < Api::V1::ApplicationController
  def create
    user = User.find_by_username(params[:username])
    if ((user&.authenticate(params[:password]) && (can_login?(user))))
      token = JsonWebToken.encode(user_id: user.id)
      time = Time.now + 24.hours.to_i
      data = {
        token: token,
        exp: time.strftime("%m-%d-%Y %H:%M"),
        username: user.username,
        role: user.role
      }
      render_json_response(data)
    else
      render_json_api_general_error(['Autenticación invalida'], :unauthorized)
    end
  end

  def can_login?(user)
    user.permissions.include?(Permission.find_by_action('sign_in'))
  end
end