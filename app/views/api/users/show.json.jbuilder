# json.partial! 'api/users/user', user: @user
json.extract! @user, :id, :name, :email, :profile_picture
json.profilePicUrl @user.profile_picture.attached? ? url_for(@user.profile_picture) : false