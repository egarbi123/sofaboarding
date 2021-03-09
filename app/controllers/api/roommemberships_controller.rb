class Api::RoommembershipsController < ApplicationController
    def create
        previousMembership = RoomMembership.find_by(roomMembership_params)
        if previousMembership
            render json: ['Room membership already exists!'], status: 422
        else
            @roomMembership = RoomMembership.new(roomMembership_params)
            if @roomMembership.save
                render json: ['Room membership created'], status: 200
            else
                render json: ['Unable to create room membership. Sorry!'], status: 422
            end
        end
    end

    def destroy
        @roomMembership = RoomMembership.find(params[:id])
        if @roomMembership.destroy
            render json: ["Friend request deleted successfully"], status: 200
        else
            render json: ["Unable to delete friend request"], status: 422
        end
    end

    def index
        @allRoomMemberships = RoomMembership.all
        render :index
    end

    private

    def roomMembership_params
        params.require(:membership).permit(:user_id, :room_id)
    end
end
