module ResponseRenderer
  def render_json_response(data, status: :ok)
    render json: {
      data: data
    }, status: status
  end

  def render_json_api_general_error(messages, status = :internal_server_error)
    render json: {
      errors: {
        status: status,
        base: messages
      }
    }, status: status
  end
end
