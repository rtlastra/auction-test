class CreateHistoricUserBiddings < ActiveRecord::Migration[5.2]
  def change
    create_table :historic_user_biddings do |t|
      t.integer :user_id
      t.integer :bidding_id
      t.integer :status

      t.timestamps
    end
  end
end
