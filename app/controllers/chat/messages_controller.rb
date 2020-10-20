class Chat::MessagesController < ApplicationController
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

    def index
        @messages = Room.find(params[:room_id]).messsages
        render 'chat/messages/index'
    end

    private

    def message_params
        params.require(:message).permit(:body, :user_id, :room_id)
    end
end
