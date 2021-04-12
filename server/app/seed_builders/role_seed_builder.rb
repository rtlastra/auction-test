class RoleSeedBuilder < ApplicationSeedBuilder
  def create
    Role.create(name: 'admin') unless Role.find_by_name('admin').present?
    Role.create(name: 'seller') unless Role.find_by_name('seller').present?
    # Add permissions to roles
    Role.find_by_name(:admin).permissions = Permission.all
    Role.find_by_name(:seller).permissions << Permission.find_by_action('sign_in')
    Role.find_by_name(:seller).permissions << Permission.find_by_action('can_update_bidding')
    Role.find_by_name(:seller).permissions << Permission.find_by_action('can_list_biddings')
    Role.find_by_name(:seller).permissions << Permission.find_by_action('can_show_bidding')
    Role.find_by_name(:seller).permissions << Permission.find_by_action('can_show_user')
  end
end
