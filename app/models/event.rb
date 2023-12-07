class Event < ApplicationRecord
    validates_presence_of :name, :description, :datetime, :location, :organizer
    has_many :event_attendances, dependent: :destroy
    has_many :assistants, through: :event_attendances, source: :user
end
