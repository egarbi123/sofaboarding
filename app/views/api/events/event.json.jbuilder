json.set! @event.id do
    json.extract! @event, :description, :date, :time
end