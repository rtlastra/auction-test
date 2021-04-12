class User < ApplicationRecord
  has_secure_password

  #Validations
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, presence: true
  validates :password,
            length: { minimum: 6 },
            if: -> { new_record? || !password.nil? }
        
  #Associations
  belongs_to :role, required: true
  has_many :historic_user_biddings
  has_many :schedulings
  has_many :permissions, through: :role, source: :permissions

  after_initialize :init

    def init
      self.role_id  ||= Role.find_by_name('seller').id
      self.username ||= generate_username(self.name+' '+self.last_name) 
    end

    def generate_username(fullname)
      ActiveSupport::Inflector.transliterate(fullname) 
        .downcase
        .strip      
        .gsub(/[^a-z]/, '_')
        .gsub(/\A_+/, '')    
        .gsub(/_+\Z/, '') 
        .gsub(/_+/, '_')    
    end

    def has_permission?(action)
      permission = Permission.find_by(action: action)
      self.permissions.include?(permission)
    end
end