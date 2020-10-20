class ChangeUsersDefaults < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :host_status, :boolean, :default => false
    change_column :users, :ver_payment, :boolean,  :default => false
    change_column :users, :ver_phone, :boolean, :default => false
    change_column :users, :ver_id, :boolean,  :default => false
    change_column :users, :ver_address, :boolean,  :default => false
  end
end
