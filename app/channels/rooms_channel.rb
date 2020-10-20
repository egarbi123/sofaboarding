class RoomsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    # stream_from 'rooms_channel'
    # stream_from("rooms_#{params[:room_id]}")
    stream_from("rooms_channel")
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    # ActionCable.server.broadcast 'rooms_channel', message: data['message']
    # co
    user_id = data['user_id']
    room_id = data['room_id']
    message = data['message']

    raise 'No room_id' if room_id.blank?
    raise 'No Conversation found' if room.blank?
    raise 'No message!' if message.blank?

    Message.create!(
      room_id: room_id,
      user_id: user_id,
      body: message
    )
  end
end
