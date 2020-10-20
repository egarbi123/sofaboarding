@rooms.each do |room|
    json.partial! 'rooms/room', room: room
end