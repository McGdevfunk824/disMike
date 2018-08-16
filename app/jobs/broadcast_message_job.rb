class BroadcastMessageJob < ApplicationJob
  queue_as :default

  def perform(message, user)
    DirectChannel.broadcast_to user, command: 'fetch_message', options: { message: message }
  end

  private
  def render_message(message)
    ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
  end
end
