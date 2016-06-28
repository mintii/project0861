class CreateMeteorites < ActiveRecord::Migration
  def change
    create_table :meteorites do |t|
      t.integer :nasa_id
      t.integer :family_id
      t.integer :user_id
      t.boolean :defeated

      t.timestamps null: false
    end
  end
end
