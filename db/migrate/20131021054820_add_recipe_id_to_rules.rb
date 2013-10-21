class AddRecipeIdToRules < ActiveRecord::Migration
  def change
    add_column :rules, :recipe_id, :integer
  end
end
