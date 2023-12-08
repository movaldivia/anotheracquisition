# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    provider { 'email' }
    uid { SecureRandom.uuid }
    email { "jane.doe@hey.com" }
    password { "SecretPassword123" }
    password_confirmation {'SecretPassword123'}
    name { "Jane"}
  end
end