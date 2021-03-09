class Api::RoomsController < ApplicationController
    def index
        @rooms = Rooms.all
        # p @rooms
        render :index
    end

    def create
        @room = Rooms.new(room_params)        
        if @room.save!
            puts 'in room save'
            user_id = current_user.id
            room_id = @room.id
            roomMembership_params = { "user_id" => user_id, "room_id" => room_id }
            @roomMembership = RoomMembership.new(roomMembership_params)
            if @roomMembership.save!
                puts 'in room membership save'
                @rooms = Rooms.all
                render :index
            end
        end
    end

    def show
        @room = Rooms.find(params[:room_id])
        render :show
    end

    private

    def room_params
        params.require(:room).permit(:title)
    end
end