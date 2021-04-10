class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :name
      t.string :description
      t.integer :bidding_id, foreign_key: true
      
      t.timestamps
    end
  end
end
