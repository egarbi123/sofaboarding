class MessagesBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    p 'IN PERFORM'
    # p message
    # p message.room_id
    @room = Rooms.find_by(id: message.room_id)
    p @room
    p message.body
    RoomsChannel.broadcast_to @room, {
    # ActionCable.server.broadcast (@room, {
      body: message.body,
      user_id: message.user_id,
      room_id: message.room_id,
      created_at: message.created_at
    }
    # Do something later
  end
end
