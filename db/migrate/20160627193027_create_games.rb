class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :user_id
      t.string :map
      # Some sort of data would be saved here to reference where in the map the player is currently.
      # For example, we may want to include a collection of the meteorites the player has defeated
      # since it contains info of where the player is within the game.

      t.boolean :win

      t.timestamps null: false
    end
  end
end
