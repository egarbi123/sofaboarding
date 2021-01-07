class Api::FriendshipsController < ApplicationController
    def create
        @friendship = Friendship.new(friendship_params)
        if @frienship.save
            render json: ['Friendship successful'], status: 200
        else
            render json: ['Friendship unsuccessful'], status: 422
        end
    end

    def destroy
        @friendship = Friendship.find_by(friendship_params)
        if @friendship.destroy
            render json: ['Unfriend successful'], status: 200
        else
            render json: ['Sorry, but unfriending was unsuccessful'], status: 422
        end
    end

    private

    def friendship_params
        params.require(:friendship).permit(:user_id, :friend_id)
    end
end
