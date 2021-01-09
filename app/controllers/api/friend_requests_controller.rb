class Api::FriendRequestsController < ApplicationController
    def create
        @friendRequest = FriendRequest.new(friendRequest_params)
        if @friendRequest.save
            render json: ['Friend request sent.'], status: 200
        else
            render json: ['Friend request not sent.'], status: 422
        end
    end

    def destroy
        @friendRequest = FriendRequest.find_by(friendRequest_params)
        if @friendRequest.destroy
            render json: ["Friend request deleted successfully"], status: 200
        else
            render json: ["Unable to delete friend request"], status: 422
        end
    end

    private

    def friendRequest_params
        params.require(:friendRequest).permit(:user_id, :friend_id)
    end
end
