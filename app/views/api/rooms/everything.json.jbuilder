json.set! 'rooms' do
    @rooms.each do |room|
        json.set! room.id do
            json.extract! room, :title, :id
        end
    end
end

json.set! 'memberships' do
    @allRoomMemberships.each do |roomMembership|
        json.set! roomMembership.id do
            json.extract! roomMembership, :id, :user_id, :room_id
        end
    end
end