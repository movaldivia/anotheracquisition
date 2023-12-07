class Event < ApplicationRecord
    has_many :event_attendances, dependent: :destroy
    has_many :users, through: :event_attendances
end
