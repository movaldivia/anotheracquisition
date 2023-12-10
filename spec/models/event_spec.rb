# spec/models/event_spec.rb
require 'rails_helper'

RSpec.describe Event, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:datetime) }
    it { should validate_presence_of(:location) }
    it { should validate_presence_of(:image) }
  end

  describe 'associations' do
    it { should have_many(:event_attendances).dependent(:destroy) }
    it { should have_many(:assistants).through(:event_attendances).source(:user) }
    it { should belong_to(:owner).class_name('User') }
  end

  describe 'methods' do
    let(:user) { create(:user) } # Assuming you have a User factory

    it 'returns the organizer name' do
      event = create(:event, owner: user) # Assuming you have an Event factory
      expect(event.organizer).to eq(user.name)
    end

    it 'returns the image URL when image is attached' do
      event = create(:event, image: fixture_file_upload('spec/assets/avatar.png', 'image/png'))
      expect(event.image_url).to be_present
    end

  end

  describe 'as_json' do
    it 'returns JSON representation of the event' do
      event = create(:event) # Assuming you have an Event factory
      json_data = event.as_json
      expect(json_data).to include(
        'id', 'name', 'description', 'datetime', 'location',
        'created_at', 'updated_at', 'organizer'
      )
    end
  end
end