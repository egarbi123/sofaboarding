class Api::MessagesController < ApplicationController
    def create
        @message = Message.new(message_params)
        if @message.save!
            room = Rooms.find(message_params["room_id"])
            p 'in message create'
            p room
            RoomsChannel.broadcast_to(room, {
                room_id: message_params["room_id"],
                user_id: message_params["user_id"],
                body: message_params["body"]
            })
            head :ok
        end
        # render :show
        # if @message.save!
        #     p 'successfully saved message'
        #     RoomsChannel.broadcast_to(room, {
        #         room_id: message_params["room_id"],
        #         user_id: message_params["user_id"],
        #         body: message_params["body"]
        #     })
        #     # @messages = Rooms.find(params[:room_id]).messages
        #     # @messages = Rooms.find(message_params[:room_id]).messages
        #     # render 'api/messages/index'
        #     # render 'api/messages/show'
            # head :ok  # render nothing
        #     # p @messages
        #     # render :index
        # end
    end

    def index
        # p 'in index -->'
        # p params
        @messages = Rooms.find(params[:roomId]).messages
        # p @messages
        # p 'right after messages in controller :)'
        render 'api/messages/index'
    end

    private

    def message_params
        params.require(:message).permit(:body, :user_id, :room_id)
    end
end
