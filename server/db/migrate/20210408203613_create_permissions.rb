class CreatePermissions < ActiveRecord::Migration[5.2]
  def change
    create_table :permissions do |t|
      t.string :action
      t.string :description

      t.timestamps
    end
  end
end
