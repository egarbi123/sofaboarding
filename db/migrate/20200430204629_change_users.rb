class ChangeUsers < ActiveRecord::Migration[5.2]
  def change
    remove_index :users, column: :email
    remove_index :users, column: :session_token
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
