class Api::ProfilebioController < ApplicationController
    def create
        @profilebio = ProfileBio.new(bio_params)
        if @profilebio.save
            render :show
        else
            render json: @profilebio.errors.full_messages, status: 422
        end
    end

    def update
        @profilebio = ProfileBio.find(params[:id])
        if (@profilebio)
            if @profilebio.update(bio_params)
                render :show
            else
                render json: @profilebio.errors.full_messages, status: 422
            end
        else
            render json: ["PROFILE BIO NOT FOUND"], status: 404
        end
    end

    def show
        @profilebio = ProfileBio.find_by(user_id: params.require(:profilebio).permit(:user_id))
        if (@profilebio)
            render :show
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
