class Api::RoommembershipsController < ApplicationController
    def create
        previousMembership = RoomMembership.find_by(roomMembership_params)
        puts previousMembership
        if previousMembership
            @allRoomMemberships = RoomMembership.all
            render :index, status: 422
        else
            @roomMembership = RoomMembership.new(roomMembership_params)
            if @roomMembership.save
                @allRoomMemberships = RoomMembership.all
                render :index, status: 200
            else
                @allRoomMemberships = RoomMembership.all
                render :index, status: 422
            end
        end
    end

    def destroy
        @roomMembership = RoomMembership.find(params[:id])
        if @roomMembership.destroy
            @allRoomMemberships = RoomMembership.all
            render :index, status: 200
        else
            @allRoomMemberships = RoomMembership.all
            render :index, status: 422
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
