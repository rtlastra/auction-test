class CreateBiddings < ActiveRecord::Migration[5.2]
  def change
    create_table :biddings do |t|
      t.datetime :initial_date
      t.datetime :final_date
      t.decimal :starting_price
      t.decimal :actual_price
      t.integer :user_id, foreign_key: true
      t.integer :status
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
