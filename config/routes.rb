Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  mount ActionCable.server => '/cable'

  get "/newmessage", to: 'static_pages#root'
  get "/signup", to: 'static_pages#root'
  get "/login", to: 'static_pages#root'
  get "/users", to: 'static_pages#root'
  get "/profile", to: 'static_pages#root'
  get "/chat", to: 'static_pages#root'
  get "/friendrequests", to: 'static_pages#root'
  get "/friendships", to: 'static_pages#root'
  get "/roommemberships", to: 'static_pages#root'
  get "/eventmemberships", to: 'static_pages#root'
  get "/:friendId", to: 'static_pages#root'
  get "/events", to: 'static_pages#root'

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update, :index]
    resource :session, only: [:create, :destroy]
    resources :rooms, only: [:create, :destroy, :index]
    resources :friendrequests, only: [:create, :index, :destroy]
    resources :friendships, only: [:create, :destroy, :index]
    resources :roommemberships, only: [:create, :index, :destroy]
    resources :messages, only: [:create, :index]
    resources :profilebio, only: [:create, :update, :index]
    resources :events, only: [:create, :update, :index, :destroy]
    resources :eventmemberships, only: [:create, :index, :destroy]
  end 
end
