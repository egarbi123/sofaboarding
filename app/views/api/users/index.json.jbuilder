@users.each do |user|
    json.set! user.id do 
        json.extract! user, :name, :email, :id, :profile_picture
        json.profilePicUrl user.profile_picture.attached? ? url_for(user.profile_picture) : false
    end
end