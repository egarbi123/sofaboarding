class Api::FriendshipsController < ApplicationController
    def create
        # puts friendship_params
        # puts friendRequest_params
        @friend_request = FriendRequest.find_by(friendRequest_params)
        if @friend_request.destroy
            # @friendship = Friendship.new(friendship_params)
            # if @frienship.save
            #     render json: ['Friendship successful'], status: 200
            # else
            #     render json: ['Friendship unsuccessful'], status: 422
            # end
            @previousFriendship = Friendship.find_by(friendship_params);
            @reversePreviousFriendship = Friendship.find_by(backwardsFriends_params);
            if @previousFriendship
                render json: ['Friendship already exists'], status: 409
            else
                if @reversePreviousFriendship
                    render json: ['Friendship already exists'], status: 409
                else
                    @friendship = Friendship.new(friendship_params)
                    if @friendship.save
                        render json: ['Friendship successful'], status: 200
                    else
                        render json: ['Friendship unsuccessful'], status: 422
                    end
                end
            end
        end
        # render json: ['Friend request not found or destroyed'], status: 422
    end

    def destroy
        @friendship = Friendship.find_by(friendship_params)
        if @friendship.destroy
            render json: ['Unfriend successful'], status: 200
        else
            render json: ['Sorry, but unfriending was unsuccessful'], status: 422
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
