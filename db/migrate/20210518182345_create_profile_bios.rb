class CreateProfileBios < ActiveRecord::Migration[5.2]
  def change
    create_table :profile_bios do |t|
      t.text "user_bio"
      t.integer "user_id", null: false
      t.timestamps
    end
  end
end
