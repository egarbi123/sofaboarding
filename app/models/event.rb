class Event < ApplicationRecord
    validates :name, presence: true

    has_many :users,
        through: :event_membership,
        source: :user
        
end
