class Api::ProfilebioController < ApplicationController
    def create
        @profilebio = ProfileBio.new(bio_params)
        if @profilebio.save
            @profilebios = ProfileBio.all
            render :index
        else
            render json: @profilebio.errors.full_messages, status: 422
        end
    end

    def update
        @profilebio = ProfileBio.find(params[:id])
        if (@profilebio)
            if @profilebio.update(bio_params)
                @profilebios = ProfileBio.all
                render :index
            else
                render json: @profilebio.errors.full_messages, status: 422
            end
        else
            render json: ["PROFILE BIO NOT FOUND"], status: 404
        end
    end

    def index
        @profilebios = ProfileBio.all
        if (@profilebios)
            render :index
        else
            render json: ["PROFILE BIO WAS NOT FOUND!"], status: 404
        end
    end

    private

    def bio_params
        params.require(:profilebio).permit(
            :user_id,
            :user_bio
        )
    end
end
