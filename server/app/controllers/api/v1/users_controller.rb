class Api::V1::UsersController < Api::V1::ApplicationController
  before_action :set_user, only: %i[ show update destroy ]
  before_action :authorize_request, except: :create

  def index
    authorize User
    users = User.all
    render_json_response(users)
  end

  def show
    authorize User
    data = {
      username: @user.username,
      biddings: @user.historic_user_biddings
    }
    render_json_response(data)
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render_json_response(@user)
    else
      render_json_api_general_error(@user.errors.full_messages, :unprocessable_entity)
    end
  end

  def update
    authorize User
    if @user.update(user_params)
      message = 'Usuario actualizado exitosamente'
      render_json_response(message)
    else
      render_json_api_general_error(@user.errors.full_messages, :unprocessable_entity)
    end
  end

  def destroy
    authorize User
    @user.destroy
    message = 'Usuario eliminado exitosamente'
    render_json_response(message)
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.permit(:name, :last_name, :email, :password)
    end
end
