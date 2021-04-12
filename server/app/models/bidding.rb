class Bidding < ApplicationRecord
  #validations
  validates :initial_date, presence: true
  validates :final_date, presence: true
  validates :starting_price, presence: true
  validates :name, presence: true
  validates :description, presence: true
  #Associations
  belongs_to :user, required: false

  enum status: [:registered, :finished]

  after_create_commit do
    time = ((final_date - initial_date) / 1.minutes)
    DownBiddingJob.set(wait: time.minutes).perform_later(self)
  end
end
