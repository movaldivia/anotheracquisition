# spec/factories/events.rb

FactoryBot.define do
  factory :event do
    name { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    datetime { Faker::Time.forward(days: 10, period: :morning) }
    location { Faker::Address.city }
    organizer { Faker::Name.name }
  end
end
