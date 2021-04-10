class Permission < ApplicationRecord
  #validations
  validates :action, presence: true
  validates :description, presence: true

  #Associations
  has_and_belongs_to_many :roles
end
