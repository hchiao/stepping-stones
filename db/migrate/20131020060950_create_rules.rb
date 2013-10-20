class CreateRules < ActiveRecord::Migration
  def change
    create_table :rules do |t|
      t.integer :parent_id
      t.text :condition
      t.text :answer

      t.timestamps
    end
  end
end
