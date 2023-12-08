# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    transient do
      skip_confirmation { true }
      role { 'agent' }
      auto_offline { true }
      account { nil }
      inviter { nil }
    end

    provider { 'email' }
    uid { SecureRandom.uuid }
    email { "jane.doe@hey.com" }
    password { "SecretPassword123" }
    password_confirmation {'SecretPassword123'}
    name { "Jane"}

    after(:build) do |user, evaluator|
      user.skip_confirmation! if evaluator.skip_confirmation
      if evaluator.account
        create(:account_user, user: user, account: evaluator.account, role: evaluator.role, inviter: evaluator.inviter,
                              auto_offline: evaluator.auto_offline)
      end
    end
  end
end


# FactoryBot.define do
#   factory(:user) do
#     email { "jane.doe@hey.com" }
#     password { "SecretPassword123" }
#     name { "Jane"}

#     after(:build) do |user, evaluator|
#       user.skip_confirmation! if evaluator.skip_confirmation
#     end
#   end
# end