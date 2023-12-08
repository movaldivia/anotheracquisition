require 'rails_helper'
include ActionController::RespondWith

RSpec.describe 'Whether access is ocurring properly', type: :request do
  before(:each) do
    # @current_user = FactoryBot.create(:user)
    @user = FactoryBot.create(:user)
  end

  context 'context: general authentication via API, ' do
    it "doesn't give you anything if you don't log in" do
      get '/api/events'
      expect(response.status).to eq(401)
    end

    it 'user can get the events info' do
      get '/api/events', headers: @user.create_new_auth_token
      expect(response).to have_http_status(:success)
    end

  end
end
