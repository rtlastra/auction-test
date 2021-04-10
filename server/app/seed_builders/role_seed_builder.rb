class RoleSeedBuilder < ApplicationSeedBuilder
  def create
    Role.create(name: 'admin') unless Role.find_by_name('admin').present?
    Role.create(name: 'seller') unless Role.find_by_name('seller').present?
    # Add permissions to roles
    Role.find_by_name(:admin).permissions = Permission.all
  end
end
