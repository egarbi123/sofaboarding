class Api::MessagesController < ApplicationController
    def index
        @messages = Rooms.find(params[:roomId]).messages
        render 'api/messages/index'
    end

    private

    def message_params
        params.require(:message).permit(:body, :user_id, :room_id)
    end
end
