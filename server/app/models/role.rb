class Role < ApplicationRecord
  #validations
  validates :name, presence: true

  #Associations
  has_and_belongs_to_many :permissions
end
