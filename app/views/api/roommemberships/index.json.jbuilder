@allRoomMemberships.each do |roomMembership|
    json.set! roomMembership.id do
        json.extract! roomMembership, :id, :user_id, :room_id
    end
end