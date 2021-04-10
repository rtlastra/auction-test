class Api::V1::BiddingsController < Api::V1::ApplicationController
  before_action :set_bidding, only: %i[ show update destroy ]
  before_action :authorize_request

  def index
    data = {
      biddings: Bidding.where(status: registered)
    }
    render_json_response(data)
  end

  def show
    records = HistoricUserBidding.where(id: @bidding.id)
    data = {
      biddings: @bidding,
      article: @bidding.article,
      users_history: records
    }
    render_json_response(data)
  end

  def create
    @bidding = Bidding.new(create_bidding_params)
    if @bidding.save
      data = {
        message: 'Subasta creada exitosamente'
      }
      render_json_response(data)
    else
      render_json_api_general_error(@bidding.errors.full_messages, :unprocessable_entity)
    end
  end

  def update
    if @bidding.update(update_bidding_params)
      HistoricUserBidding.create(user_id: update_bidding_params[:user_id], bidding_id: update_bidding_params[:bidding_id], status: update_bidding_params[:status])
      data = {
        message: 'Subasta actualizada exitosamente'
      }
      render_json_response(data)
    else
      render_json_api_general_error(@bidding.errors.full_messages, :unprocessable_entity)
    end
  end

  def destroy
    @bidding.destroy
    data = {
      message: 'Subasta eliminada exitosamente'
    }
    render_json_response(data)
  end

  private
    def set_bidding
      @bidding = Bidding.find(params[:id])
    end

    def create_bidding_params
      params.permit(:initial_date, :final_date, :starting_price, :article_id, :status)
    end

    def update_bidding_params
      params.permit(:actual_price, :user_id)
    end
end
