class Rooms < ApplicationRecord
    validates :title, presence: true

    has_many :messages,
        foreign_key: :room_id,
        class_name: :Message,
        dependent: :destroy
        
    has_many :users, 
      through: :room_membership,
      source: :user
end
