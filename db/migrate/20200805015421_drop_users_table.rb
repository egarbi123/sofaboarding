class DropUsersTable < ActiveRecord::Migration[5.2]
  def dropUsersTable
    drop_table :users
  end
end
