class CreateSchedulings < ActiveRecord::Migration[5.2]
  def change
    create_table :schedulings do |t|
      t.integer :user_id
      t.integer :bidding_id
      t.integer :status
      t.date :appointment_date

      t.timestamps
    end
  end
end
