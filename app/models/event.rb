class Event < ApplicationRecord
    validates_presence_of :name, :description, :datetime, :location
    has_many :event_attendances, dependent: :destroy
    has_many :assistants, through: :event_attendances, source: :user
    
    belongs_to :owner, class_name: 'User'

    def as_json(options = {})
      super(options.merge(only: [:id, :name, :description, :datetime, :location, :created_at, :updated_at], methods: [:organizer]))
    end
  
    def organizer
      owner.name
    end

end
