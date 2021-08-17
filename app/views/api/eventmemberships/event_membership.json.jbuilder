json.set! @eventMembership.id do
    json.extract! @eventMembership, :id, :user_id, :event_id, :owner
end