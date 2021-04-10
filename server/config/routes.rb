Rails.application.routes.draw do
  namespace :api, defaults: { format: :json }, path: "/" do
    namespace :v1 do
      resources :users
      resources :sessions, only: %i[create]
      resources :biddings
    end
  end
end