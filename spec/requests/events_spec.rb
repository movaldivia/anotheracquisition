require 'rails_helper'
include ActionController::RespondWith

RSpec.describe 'Whether access is ocurring properly', type: :request do
  before(:each) do
    @user = FactoryBot.create(:user)
    @owner = FactoryBot.create(:user)
    @event = FactoryBot.create(:event, owner: @owner)
    @other_event = FactoryBot.create(:event)
  end

  context 'context: events operations ' do
    it "only autheticated users can query events" do
      get '/api/events'
      expect(response.status).to eq(401)
    end

    it 'user can query events' do
      get '/api/events', headers: @user.create_new_auth_token
      expect(response).to have_http_status(:success)
      events = response.parsed_body
      expect(events['data']).to be_present
      expect(events['data'].length).to eq(2)
      expect(events['data'][1]['attributes']['name']).to eq(@event.name)
      expect(events['data'][0]['attributes']['name']).to eq(@other_event.name)
      expect(events['data'][0]['attributes']['description']).to eq(@other_event.description)
      expect(events['data'][0]['attributes']['location']).to eq(@other_event.location)
      expect(events['data'][0]['attributes']['organizer']).to eq(@other_event.organizer)
    end

    it 'user can join join to events and can query events that has joined' do
      get "/api/events?status=JOINED", headers: @user.create_new_auth_token
      expect(response).to have_http_status(:success)
      events = response.parsed_body
      expect(events['data'].length).to eq(0)
      params = {           id: @event.id,}
      post '/api/events/join', headers: @user.create_new_auth_token, params: params,as: :json
      expect(response).to have_http_status(:success)
      get "/api/events?status=JOINED", headers: @user.create_new_auth_token
      expect(response).to have_http_status(:success)
      events = response.parsed_body
      expect(events['data']).to be_present
      expect(events['data'].length).to eq(1)
      expect(events['data'][0]['attributes']['name']).to eq(@event.name)
    end

    it 'user can query events that has not joined' do
      get "/api/events?status=NOT_JOINED", headers: @user.create_new_auth_token
      expect(response).to have_http_status(:success)
      events = response.parsed_body
      expect(events['data'].length).to eq(2)
    end

    it 'owner can query their events' do
      get '/api/events/owner', headers: @owner.create_new_auth_token
      expect(response).to have_http_status(:success)
      events = response.parsed_body
      expect(events).to be_present
      expect(events.length).to eq(1)

      get '/api/events/owner', headers: @user.create_new_auth_token
      expect(response).to have_http_status(:success)
      events = response.parsed_body
      expect(events.length).to eq(0)
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

    it 'user can unjoin a event' do
      params = {id: @event.id}
      post '/api/events/unjoin', headers: @user.create_new_auth_token, params: params,as: :json
      expect(response).to have_http_status(:success)
    end

    it 'owner can update event' do
      params = { name: 'new_name'}
      put "/api/events/#{@event.id}", headers: @owner.create_new_auth_token, params: params, as: :json
      expect(response).to have_http_status(:success)
    end

    it 'owener can destroy event' do
      params = { id: @event.id}
      delete '/api/events', headers: @owner.create_new_auth_token, params: params, as: :json
      expect(response).to have_http_status(:success)
    end

    it 'user can not destroy event' do
      params = { id: @event.id}
      delete '/api/events', headers: @user.create_new_auth_token, params: params, as: :json
      expect(response).to have_http_status(:unauthorized)
    end

    it 'user can not update event' do
      params = { name: 'new_name'}
      put "/api/events/#{@event.id}", headers: @user.create_new_auth_token, params: params, as: :json
      expect(response).to have_http_status(:unauthorized)
    end

  end
end
