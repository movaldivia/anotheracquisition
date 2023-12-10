require 'rails_helper'
include ActionController::RespondWith

RSpec.describe 'Whether access is ocurring properly', type: :request do
  before(:each) do
    @user = FactoryBot.create(:user)
    @event = FactoryBot.create(:event)
  end

  context 'context: events operations ' do
    it "only autheticated users can query events" do
      get '/api/events'
      expect(response.status).to eq(401)
    end

    it 'user can query events' do
      get '/api/events', headers: @user.create_new_auth_token
      expect(response).to have_http_status(:success)
    end

    it 'user can query events that has joined' do
      get "/api/events?status=JOINED", headers: @user.create_new_auth_token
      expect(response).to have_http_status(:success)
    end

    it 'user can get event info' do
      get "/api/events/#{@event.id}", headers: @user.create_new_auth_token
      expect(response).to have_http_status(:success)
    end

    it 'user can join a event' do
      params = {           id: @event.id,}
      post '/api/events/join', headers: @user.create_new_auth_token, params: params,as: :json
      expect(response).to have_http_status(:success)
    end

    # To do validate that user has joined before
    it 'user can unjoin a event' do
      params = {id: @event.id}
      post '/api/events/unjoin', headers: @user.create_new_auth_token, params: params,as: :json
      expect(response).to have_http_status(:success)
    end

    it 'user can update event' do
      params = { name: 'new_name'}
      put "/api/events/#{@event.id}", headers: @user.create_new_auth_token, params: params, as: :json
      expect(response).to have_http_status(:success)
    end

    it 'user can destroy event' do
      params = { id: @event.id}
      delete '/api/events', headers: @user.create_new_auth_token, params: params, as: :json
      expect(response).to have_http_status(:success)
    end

  end
end
