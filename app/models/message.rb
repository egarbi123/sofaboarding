class Message < ApplicationRecord
    validates :body, :user_id, :room_id, presence: true
    belongs_to :rooms,
      foreign_key: :room_id,
      class_name: :Rooms
    # after_create_commit { MessageBroadcastJob.perform_later(self) }
end
