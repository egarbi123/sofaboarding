@rooms.each do |room|
    json.set! room.id do
        json.extract! room, :title, :id
    end
end