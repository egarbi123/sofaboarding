class RoomMembership < ApplicationRecord
    belongs_to :user,
        foreign_key: :user_id;
        class_name: :User

    belongs_to :room,
        foreign_key: :room_id,
        class_name: :Room
end
