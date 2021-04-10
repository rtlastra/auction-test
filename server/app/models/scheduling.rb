class Scheduling < ApplicationRecord
  #validations
  validates :user_id, presence: true
  validates :bidding_id, presence: true, uniqueness: true
  validates :status, presence: true
  validates :appointment_date, presence: true

  #Associations
  belongs_to :user
  belongs_to :bidding
end
