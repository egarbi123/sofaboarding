@profilebios.each do |bio|
    json.set! bio.user_id do
        json.extract! bio, :id, :user_id, :user_bio
    end
end
