class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.boolean :host_status, null: false
      t.boolean :ver_payment, null: false
      t.boolean :ver_phone, null: false
      t.boolean :ver_id, null: false
      t.boolean :ver_address, null: false
      t.integer :age
      t.string :gender
      t.string :city
      t.string :address
      t.string :occupation
      t.string :education
      t.string :acceptance_rate
      t.text :countries_lived
      t.text :countries_visited
      t.text :languages_list
      t.text :bio_main
      t.text :bio_whyCS
      t.text :bio_interests_list
      t.text :bio_interests_more
      t.text :bio_share_host
      t.text :bio_share_guest
      t.text :bio_favorites
      t.text :bio_amazing
      t.text :bio_teach
      t.timestamps
    end
    add_index :users, :email
    add_index :users, :session_token
  end
end
