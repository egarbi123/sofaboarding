class Chat::RoomsController < ApplicationController
    def index
        @rooms = Room.all
        render 'chat/rooms/index'
    end

    def create
        @room = Room.new(room_params)
        if @room.save
            
        end
    end

    private

    def room_params
        params.require(:room).permit(:title)
    end
end