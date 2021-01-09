class FriendRequest < ApplicationRecord
    validates :requestor_id, :receiver_id, presence: true

    belongs_to :user,
        foreign_key: :requestor_id,
        class_name: :User

    belongs_to :user,
        foreign_key: :receiver_id,
        class_name: :User
end
