
class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        @user.profile_picture.attach(io: File.open(Rails.root.join('app', 'assets', 'images', 'default_user.jpg')), filename: 'default_user.jpg')
        # debugger
        if @user.save
            sign_in!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def update
        @user = User.find(params[:id])
        if (@user)
            if @user.update(user_params)
                render :show
            else
                render json: @user.errors.full_messages, status: 422
            end
        else
            render json: ["User not found"], status: 404
        end
    end

    # def show
    #     @user = User.find(params[:id])
    #     if (@user)
    #         render :show
    #     else
    #         render json: ["The user was not found."], status: 404
    #     end
    # end
    
    def index
        @users = User.all
        render :index 
    end

    private

    def user_params
        puts params.inspect
        params.inspect
        params.require(:user).permit(
            :name, 
            :password, 
            :email,
            :profile_picture
        )
    end

end