# frozen_string_literal: true

class User < ActiveRecord::Base
  include DeviseTokenAuth::Concerns::User

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  

  validates_presence_of :password, :email, :name
  validates_length_of :name, minimum: 1, maximum: 255

  has_many :event_attendances, dependent: :destroy
  has_many :joined_events, through: :event_attendances, source: :event
end
