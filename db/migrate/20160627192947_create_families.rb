class CreateFamilies < ActiveRecord::Migration
  def change
    create_table :families do |t|
      t.string :type
      t.integer :member_id

      t.timestamps null: false
    end
  end
end
