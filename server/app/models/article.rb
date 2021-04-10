class Article < ApplicationRecord
  #Validations
  validates :name, presence: true
  validates :description, presence: true

  #Associations
  belongs_to :bidding, required: false
end
