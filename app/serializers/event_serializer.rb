class EventSerializer
  include JSONAPI::Serializer
  attributes :name, :description, :datetime, :location, :image, :image_url, :organizer
end
