class RemoveColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :rooms, :room_membership_id, :integer
  end
end
