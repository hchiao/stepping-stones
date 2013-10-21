json.array!(@recipes) do |recipe|
  json.extract! recipe, :name
  json.url recipe_url(recipe, format: :json)
end
