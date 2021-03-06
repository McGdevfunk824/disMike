class Message < ApplicationRecord
  validates :body, :author_id, :messagable_id, :messagable_type, presence: true
  # validates :author_id, uniqueness: { scope: [:messagable_id, :messagable_type] }

  belongs_to :messagable, polymorphic: true

  # belongs_to :channel,
  #   class_name: :Channel,
  #   primary_key: :id,
  #   foreign_key: :channel_id

  belongs_to :author,
    class_name: :User,
    primary_key: :id,
    foreign_key: :author_id

  has_many :readers,
    through: :messagable,
    source: :subscribers

  def broadcast(user)
    BroadcastMessageJob.perform_now self, user
  end
end
