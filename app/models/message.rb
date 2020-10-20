class Message < ApplicationRecord
    validates :body, :user_id, :room_id, presence: true
    belongs_to :room,
        foreign_key: :room_id,
        class_name: :Room
    belongs_to :user
    after_create_commit { MessageBroadcastJob.perform_later(self) }
end
