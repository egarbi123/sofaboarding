class Api::RoomsController < ApplicationController
    def index
        @rooms = Rooms.all
        render :index
    end

    def create
        @room = Rooms.new(room_params)        
        if @room.save!
            @rooms = Rooms.all
            render :index
        end
    end

    def show
        @room = Room.find(params[:room_id])
        render 
    end

    private

    def room_params
        params.require(:room).permit(:title)
    end
end