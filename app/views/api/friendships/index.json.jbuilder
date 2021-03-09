@friendships.each do |friend|
    json.set! friend.id do
        json.extract! friend, :user_id, :friend_id, :id
    end
end