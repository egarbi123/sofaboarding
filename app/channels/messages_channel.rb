class MessagesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    # room = Room.find(1)
    # stream_for room
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
