class CreateRoomMembership < ActiveRecord::Migration[5.2]
  def change
    create_table :room_memberships do |t|
      t.integer :user_id, null: false
      t.integer :room_id, null: false
    end
    add_index :room_memberships, :user_id
  end
end
