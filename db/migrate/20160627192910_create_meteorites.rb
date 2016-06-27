class CreateMeteorites < ActiveRecord::Migration
  def change
    create_table :meteorites do |t|
      t.string :name
      t.string :story
      t.string :type

      t.timestamps null: false
    end
  end
end
