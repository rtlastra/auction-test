class CreateJoinTableRolePermission < ActiveRecord::Migration[5.2]
  def change
    create_join_table :roles, :permissions do |t|
       t.index [:role_id, :permission_id]
       t.index [:permission_id, :role_id]
    end
  end
end
