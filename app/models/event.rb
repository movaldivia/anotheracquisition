class Event < ApplicationRecord
    has_one_attached :image

    validates_presence_of :name, :description, :datetime, :location, :image
    has_many :event_attendances, dependent: :destroy
    has_many :assistants, through: :event_attendances, source: :user
    
    belongs_to :owner, class_name: 'User'
    

    def as_json(options = {})
      super(options.merge(only: [:id, :name, :description, :datetime, :location, :created_at, :updated_at], methods: [:organizer]))
    end
  
    def organizer
      owner.name
    end

    def image_url
      Rails.application.routes.url_helpers.url_for(image) if image.attached?
    end

end
