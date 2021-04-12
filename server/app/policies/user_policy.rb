class UserPolicy < ApplicationPolicy
  def index?
    user.has_permission?('can_list_users')
  end

  def show?
    user.has_permission?('can_show_user')
  end

  def update?
    user.has_permission?('can_update_user')
  end

  def destroy?
    user.has_permission?('can_destroy_user')
  end
end