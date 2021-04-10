class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :last_name
      t.integer :role_id, foreign_key: true
      t.string :email
      t.string :password_digest
      t.string :username
      
      t.timestamps
    end
  end
end
