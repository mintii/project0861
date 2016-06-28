class CreateFamilies < ActiveRecord::Migration
  def change
    create_table :families do |t|
      t.string :rock_type

      t.timestamps null: false
    end
  end
end
