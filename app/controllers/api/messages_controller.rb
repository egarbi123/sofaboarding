class Api::MessagesController < ApplicationController
    # def create
    #     message = Message.new(message_params)
    #     room = Room.find(message_params[:room_id])
    #     if message.save
    #         # serialized_data = ActiveModelSerializers::Adapter::Json.new(
    #         #     MessageSerializer.new(message)
    #         # ).serializable_hash
    #         MessagesChannel.broadcast_to room, 
    #         head :ok
    #     end   
    # end

    def create
        p 'in create'
        @message = Message.new(message_params)
        p message_params
        if @message.save!
            p 'in save'
            # @messages = Rooms.find(params[:room_id]).messages
            @messages = Rooms.find(message_params[:room_id])
            render 'api/messages/index'
            head :ok
            p @messages
            # render :index
            # render 'sucks'
        end
    end

    def index
        p 'in index -->'
        p params
        @messages = Rooms.find(params[:roomId]).messages
        p @messages
        p 'right after messages in controller :)'
        render 'chat/messages/index'
    end

    private

    def message_params
        params.require(:message).permit(:body, :user_id, :room_id)
    end
end
