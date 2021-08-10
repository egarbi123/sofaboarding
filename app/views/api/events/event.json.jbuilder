json.set! @event.id do
    json.extract! @event, :name, :description, :date, :time
end