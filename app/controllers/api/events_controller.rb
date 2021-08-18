class Api::EventsController < ApplicationController
    def create
        @event = Event.new(event_params)
        if @event.save
            user_id = current_user.id
            event_id = @event.id
            @eventMembership_params = { "user_id" => user_id, "event_id" => event_id, "owner" => true}
            puts @eventMembership_params
            @eventMembership = EventMembership.new(@eventMembership_params)
            if @eventMembership.save!
                @events = Event.all
                @allEventMemberships = EventMembership.all
                render :allofit
            end
        else
            render json: @event.errors.full_messages, status: 422
        end
    end

    def update
        @event = Event.find(params[:id])
        if (@event)
            if @event.update(event_params)
                @events = Event.all
                render :index
            else
                render json: @event.errors.full_messages, status: 422
            end
        else
            render json: ["EVENT NOT FOUND"], status: 404
        end
    end

    def index
        @events = Event.all
        if (@events)
            render :index
        else
            render json: ["EVENTS NOT FOUND!"], status: 404
        end
    end

    def destroy
        @event = Event.find(params[:id])
        if @event.destroy
            @events = Event.all
            render :index, status: 200
        else
            render :event, status: 422
        end
    end

    private

    def event_params
        params.require(:event).permit(
            :name,
            :description,
            :date,
            :time
        )
    end
end
