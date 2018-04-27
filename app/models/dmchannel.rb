class Dmchannel < ApplicationRecord

  has_many: :subscriptions,
    class_name: :Dmchannel,
    primary_key: :id,
    foreign_key: :dm_id

  has_many: :subsribers,
    through: :subscriptions,
    source: :user

  has_many: :messages,
    class_name: :Message,
    primary_key: :id,
    foreign_key: :dm_id
