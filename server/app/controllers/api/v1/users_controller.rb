class Api::V1::UsersController < Api::V1::ApplicationController
  before_action :set_user, only: %i[ show update destroy ]
  before_action :authorize_request, except: :create

  def index
    data = {
      users: User.all
    }
    render_json_response(data)
  end

  def show
    data = {
      username: @user.username,
      biddings: @user.historic_user_biddings
    }
    render_json_response(data)
  end

  def create
    @user = User.new(user_params)
    if @user.save
      data = {
        message: 'Usuario creado exitosamente'
      }
      render_json_response(data)
    else
      render_json_api_general_error(@user.errors.full_messages, :unprocessable_entity)
    end
  end

  def update
    if @user.update(user_params)
      data = {
        message: 'Usuario actualizado exitosamente'
      }
      render_json_response(data)
    else
      render_json_api_general_error(@user.errors.full_messages, :unprocessable_entity)
    end
  end

  def destroy
    @user.destroy
    data = {
      message: 'Usuario eliminado exitosamente'
    }
    render_json_response(data)
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.permit(:name, :last_name, :email, :password, :role_id, :username)
    end
end
