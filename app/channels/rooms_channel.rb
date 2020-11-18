class RoomsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    # stream_from 'rooms_channel'
    # stream_from("rooms_#{params[:room_id]}")
    @room = Rooms.find_by(id: params[:room_id])
    p 'IN ROOMSCHANNEL'
    p @room
    # stream_for @room
    stream_for @room
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def create(data)
    p 'IN CREATE ROOMSCHANNEL'
    p data
    # debugger
    # ActionCable.server.broadcast 'rooms_channel', message: data['message']
    user_id = data['user_id']
    room_id = data['room_id']
    message = data['body']

    raise 'No room_id' if room_id.blank?
    raise 'No user_id' if user_id.blank?
    raise 'No message!' if message.blank?

    Message.create!(
      room_id: room_id,
      user_id: user_id,
      body: message
    )
  end
end
