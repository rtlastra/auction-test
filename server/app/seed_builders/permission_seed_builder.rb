class PermissionSeedBuilder < ApplicationSeedBuilder
  def create
    Permission.create(action: 'sign_in', description: 'Ingresar a la plataforma') unless Permission.find_by_action('sign_in').present?
    Permission.create(action: 'can_list_biddings', description: 'Listar subastas') unless Permission.find_by_action('can_list_biddings').present?
    Permission.create(action: 'can_update_bidding', description: 'Actualizar subasta') unless Permission.find_by_action('can_update_bidding').present?
    Permission.create(action: 'can_show_bidding', description: 'Detalle subasta') unless Permission.find_by_action('can_show_bidding').present?
    Permission.create(action: 'can_destroy_bidding', description: 'Eliminar una subasta') unless Permission.find_by_action('can_destroy_bidding').present?
    Permission.create(action: 'can_create_bidding', description: 'Actualizar subasta') unless Permission.find_by_action('can_create_bidding').present?
    Permission.create(action: 'can_list_users', description: 'Listar usuarios') unless Permission.find_by_action('can_list_users').present?
    Permission.create(action: 'can_update_user', description: 'Actualizar usuario') unless Permission.find_by_action('can_update_user').present?
    Permission.create(action: 'can_show_user', description: 'Detalle usuario') unless Permission.find_by_action('can_show_user').present?
    Permission.create(action: 'can_destroy_user', description: 'Eliminar usuario') unless Permission.find_by_action('can_destroy_user').present?
  end
end