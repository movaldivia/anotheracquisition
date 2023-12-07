require 'rails_helper'

RSpec.describe Event, type: :model do
  subject { described_class.new(
    name: "name",
    description: "description",
    datetime: DateTime.now,
    location: "location",
    organizer: "organizer"
  ) }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end
  it "is not valid without a name" do
    subject.name = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a description" do
    subject.description = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a datetime" do
    subject.datetime = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a location" do
    subject.location = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without an organizer" do
    subject.organizer = nil
    expect(subject).to_not be_valid
  end

  describe "Associations" do
    it { should have_many(:assistants).without_validating_presence }
  end
end


# validates_presence_of :name
# validates_presence_of :description
# validates_presence_of :datetime
# validates_presence_of :location
# validates_presence_of :organizer