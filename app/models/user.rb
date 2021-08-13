class User < ApplicationRecord
    validates :name, presence: true
    validates :password_digest, presence: true
    validates :email, :session_token, uniqueness: true, presence: true

    has_many :room_memberships,
        foreign_key: :user_id,
        class_name: :room_membership

    has_many :event_memberships,
        foreign_key: :user_id,
        class_name: :event_membership

    has_many :friend_requests_as_requestor,
        foreign_key: :requestor_id,
        class_name: :FriendRequest

    has_many :friend_requests_as_receiver,
        foreign_key: :receiver_id,
        class_name: :FriendRequest

    has_many :friendships,
        foreign_key: :friend_id,
        class_name: :Friendship
    
    has_many :friends,
        foreign_key: :user_id,
        class_name: :Friendship

    has_many :rooms,
        through: :room_memberships,
        source: :rooms

    has_one :user_profile,
        foreign_key: :user_id,
        class_name: :ProfileBio

    has_many :messages, dependent: :destroy

    has_one_attached :profile_picture

    attr_reader :password

    after_initialize :ensure_session_token
    
    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil if user == nil
        user.is_password?(password) ? user : nil
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save!
        self.session_token
    end
end
