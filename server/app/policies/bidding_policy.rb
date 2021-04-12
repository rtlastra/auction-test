class BiddingPolicy < ApplicationPolicy
  def index?
    user.has_permission?('can_list_biddings')
  end

  def show?
    user.has_permission?('can_show_bidding')
  end

  def update?
    user.has_permission?('can_update_bidding')
  end

  def create?
    user.has_permission?('can_create_bidding')
  end

  def destroy?
    user.has_permission?('can_destroy_bidding')
  end
end
