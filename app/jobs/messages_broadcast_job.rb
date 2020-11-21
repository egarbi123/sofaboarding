class MessagesBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    @room = Rooms.find_by(id: message.room_id)
    RoomsChannel.broadcast_to @room, {
      body: message.body,
      user_id: message.user_id,
      room_id: message.room_id,
      created_at: message.created_at,
      id: message.id
    }
  end
end
