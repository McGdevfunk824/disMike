
json.extract! channel, :id, :name, :server_id
json.serverId channel.server_id
json.message_ids channel.messages.pluck(:id).sort!
