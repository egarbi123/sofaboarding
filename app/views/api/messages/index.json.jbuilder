# json.messages(Message.limit(25).order("created_at DESC").load.reverse) do |message|
#     json.partial! 'messages/message', message: message
# end

@messages.each do |message|
    json.set! message.id do
        json.extract! message, :id, :body, :user_id, :created_at, :room_id
    end
end