class User < ApplicationRecord
  has_secure_password

  #Validations
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, presence: true, uniqueness: true
  validates :password,
            length: { minimum: 6 },
            if: -> { new_record? || !password.nil? }
        
  #Associations
  belongs_to :role, required: true
  has_many :historic_user_biddings
  has_many :schedulings
  has_many :permissions, through: :role, source: :permissions
end
 