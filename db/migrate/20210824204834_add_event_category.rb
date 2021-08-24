class AddEventCategory < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :open, :boolean
  end
end
