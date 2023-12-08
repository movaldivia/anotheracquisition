Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  root 'homepage#index'
  get '/app/*params', to: 'homepage#index'
  post '/api/events', to: 'events#create'
  get '/api/events', to: 'events#index'
  get '/api/events/:id', to: 'events#show'
  put '/api/events', to: 'events#update'
  delete '/api/events', to: 'events#destroy'

  post '/api/events/join', to: 'events#join'
  post '/api/events/unjoin', to: 'events#unjoin'
  # Get events joined by a user
  get '/users/:user_id/events/joined', to: 'events#joined', as: 'user_events_joined'

  # Get events created by a user
  # get '/users/:user_id/events/created', to: 'events#created', as: 'user_events_created'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
