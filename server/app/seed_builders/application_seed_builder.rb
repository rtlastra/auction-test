class ApplicationSeedBuilder
  def arraify(object)
    if object.respond_to?(:each)
      object
    else
      [object]
    end
  end
end