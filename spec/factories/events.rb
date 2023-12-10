# spec/factories/events.rb
# spec/factories/events.rb
FactoryBot.define do
  factory :event do
    name { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    datetime { Faker::Time.forward(days: 30, period: :all) }
    location { Faker::Address.city }
    image { fixture_file_upload('spec/assets/avatar.png', 'image/png') } # Adjust the default image path as needed

    association :owner, factory: :user

    # Define any other traits or attributes as needed

    trait :with_attendees do
      transient do
        attendees_count { 5 }
      end

      after(:create) do |event, evaluator|
        create_list(:user, evaluator.attendees_count, events: [event])
      end
    end
  end
end
