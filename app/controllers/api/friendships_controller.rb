class Api::FriendshipsController < ApplicationController
    def create
        @friend_request = FriendRequest.find_by(friendRequest_params)
        if @friend_request.destroy
            @previousFriendship = Friendship.find_by(friendship_params);
            if @previousFriendship
                @friend = @previousFriendship
            end
            @reversePreviousFriendship = Friendship.find_by(backwardsFriends_params);
            if @reversePreviousFriendship
                @friend = @reversePreviousFriendship
            end
            if @friend
                render :friend, status: 409
            else
                @friend = Friendship.new(friendship_params)
                if @friend.save
                    render :friend, status: 200
                else
                    @friendships = Friendship.all
                    render :index, status: 422
                end
            end
            return
        end
    end

    def destroy
        @friendship = Friendship.find(params[:id])
        if @friendship.destroy
            @friendships = Friendship.all
            render :index, status: 200
        else
            render :friend, status: 422
        end
    end

    def index
        @friendships = Friendship.all
        render :index
    end

    private

    def friendship_params
        params.require(:friendship).permit(:user_id, :friend_id)
    end

    def backwardsFriends_params
        { "user_id" => friendship_params[:friend_id], "friend_id" => friendship_params[:user_id]}
    end

    def friendRequest_params
        { "requestor_id" => friendship_params[:friend_id], "receiver_id" => friendship_params[:user_id] }
    end

end
