class HistoricUserBidding < ApplicationRecord
  validates :user_id, presence: true
  validates :bidding_id, presence: true
  validates :status, presence: true

  #Associations
  belongs_to :user
end
