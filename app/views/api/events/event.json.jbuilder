json.set! @event.id do
    json.extract! @event, :id, :name, :description, :date, :time
end