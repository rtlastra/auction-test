class PermissionSeedBuilder < ApplicationSeedBuilder
  def create
    Permission.create(action: 'sign_in', description: 'Ingresar a la plataforma') unless Permission.find_by_action('sign_in').present?
  end
end