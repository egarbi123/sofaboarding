class Event < ApplicationRecord
    validates :description, presence: true

    has_many :users,
        through: :event_membership,
        source: :user
end
