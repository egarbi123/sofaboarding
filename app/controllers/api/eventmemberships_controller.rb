class Api::EventmembershipsController < ApplicationController
    def create
        @eventMembership = EventMembership.new(eventMembership_params)
        if @eventMembership.save!
            @allEventMemberships = EventMembership.all
            render :index
        end
    end

    def index
        @allEventMemberships = EventMembership.all
        render :index
    end

    private

    def eventMembership_params
        params.require(:membership).permit(:user_id, :event_id, :owner)
    end
end
