class ChangeRoomsTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :rooms, :user_id, :integer
    add_column :rooms, :room_membership_id, :integer
  end
end
