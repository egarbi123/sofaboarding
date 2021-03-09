class Api::FriendrequestsController < ApplicationController
    def create
        previousRequest = FriendRequest.find_by(friendRequest_params)
        if previousRequest
            render json: ['Friend request already sent.'], status: 409
        else
            @friendRequest = FriendRequest.new(friendRequest_params)
            if @friendRequest.save
                render :show , status: 200
            else
                render json: ['Friend request not sent.'], status: 422
            end
        end
    end

    def destroy
        puts 'in destroy'
        @friendRequest = FriendRequest.find(params[:id])
        if @friendRequest.destroy
            @allFriendRequests = FriendRequest.all
            render :index, status: 200
        else
            render json: ["Unable to delete friend request"], status: 422
        end
    end

    def index
        @allFriendRequests = FriendRequest.all
        render :index
    end

    private

    def friendRequest_params
        params.require(:friendRequest).permit(:requestor_id, :receiver_id)
    end
end
