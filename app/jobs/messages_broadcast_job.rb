class MessagesBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast `rooms_channel#{params[:room_id]}`, message: ActiveSupport::JSON.decode(render_message(message))
    # Do something later
  end

  private
  
  def render_message(message)
    ApplicationController.renderer.render(partial: 'messages/message.json.jbuilder', locals: { message: message })
  end
end
