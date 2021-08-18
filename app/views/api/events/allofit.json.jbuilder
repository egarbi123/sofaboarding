json.set! 'events' do
    @events.each do |event|
        json.set! event.id do
            json.extract! event, :id, :name, :description, :date, :time
        end
    end
end 

json.set! 'eventMemberships' do
    @allEventMemberships.each do |eventMembership|
        json.set! eventMembership.id do
            json.extract! eventMembership, :id, :user_id, :event_id, :owner
        end
    end
end
