json.messages(Message.limit(25).order("created_at DESC").load.reverse) do |message|
    json.partial! 'messages/message', message: message
end