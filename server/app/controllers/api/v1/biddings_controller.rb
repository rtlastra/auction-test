class Api::V1::BiddingsController < Api::V1::ApplicationController
  before_action :set_bidding, only: %i[ show update destroy ]
  before_action :authorize_request

  def index
    authorize Bidding
    biddings = Bidding.where(status: :registered)
    render_json_response(biddings)
  end

  def show
    authorize Bidding
    records = HistoricUserBidding.where(id: @bidding.id)
    data = {
      biddings: @bidding,
      users_history: records
    }
    render_json_response(data)
  end

  def create
    authorize Bidding
    @bidding = Bidding.new(create_bidding_params)
    if @bidding.save
      render_json_response(@bidding)
    else
      render_json_api_general_error(@bidding.errors.full_messages, :unprocessable_entity)
    end
  end

  def update
    authorize Bidding
    if (update_bidding_params[:actual_price].to_i > @bidding.actual_price.to_i && update_bidding_params[:actual_price].to_i > @bidding.starting_price.to_i)
      if @bidding.update(update_bidding_params)
        HistoricUserBidding.create!(user_id: update_bidding_params[:user_id], bidding_id: @bidding.id, status: @bidding.status)
        message = 'Oferta realizada actualizada exitosamente'
        render_json_response(message)
      else
        render_json_api_general_error(@bidding.errors.full_messages, :unprocessable_entity)
      end
    else
      render_json_api_general_error('El valor a ofertar tiene que ser mayor al actual', :unprocessable_entity)
    end
  end

  def destroy
    authorize Bidding
    @bidding.destroy
    message = 'Subasta eliminada exitosamente'
    render_json_response(message)
  end

  private
    def set_bidding
      @bidding = Bidding.find(params[:id])
    end

    def create_bidding_params
      params.permit(:initial_date, :final_date, :starting_price, :status, :name, :description)
    end

    def update_bidding_params
      params.permit(:actual_price, :user_id)
    end
end
