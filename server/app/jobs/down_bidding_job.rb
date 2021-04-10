class DownBiddingJob < ApplicationJob
  queue_as :default

  def perform(bidding)
    bidding.update(status: :finished)
  end
end
