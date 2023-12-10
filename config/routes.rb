Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  root 'homepage#index'

  # SPA
  get '/app/*params', to: 'homepage#index'

  # API Events
  post '/api/events', to: 'events#create'
  get '/api/events', to: 'events#index'
  get '/api/events/owner', to: 'events#index_from_owner'
  get '/api/events/:id', to: 'events#show'
  put '/api/events/:id', to: 'events#update'
  delete '/api/events', to: 'events#destroy'
  post '/api/events/join', to: 'events#join'
  post '/api/events/unjoin', to: 'events#unjoin'

  get "up" => "rails/health#show", as: :rails_health_check
end
