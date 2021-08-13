class EditEventMemberships < ActiveRecord::Migration[5.2]
  def change
    add_column :event_memberships, :owner, :boolean
  end
end
