class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.text "description"
      t.string "date"
      t.string "time"
      

      t.timestamps
    end
  end
end
