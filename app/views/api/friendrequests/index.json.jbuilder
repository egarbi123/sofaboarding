@allFriendRequests.each do |friendRequest|
    json.set! friendRequest.id do
        json.extract! friendRequest, :requestor_id, :receiver_id, :id
    end
end