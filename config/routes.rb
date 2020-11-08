Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount ActionCable.server => '/cable'
  # get "/newroom", to: 'static_pages#root'
  get "/newmessage", to: 'static_pages#root'
  get "/signup", to: 'static_pages#root'
  get "/login", to: 'static_pages#root'
  get "/users", to: 'static_pages#root'
  get "/profile", to: 'static_pages#root'
  get "/chat", to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update, :index]
    resource :session, only: [:create, :destroy]
    resources :rooms, only: [:create, :destroy, :index] do
      # resources :messages, only: [:create, :index]
    end
    resources :messages, only: [:create, :index]
  end
  root to: 'static_pages#root'
end
