class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :user_id
      t.integer :map_id
      t.boolean :win

      t.timestamps null: false
    end
  end
end
