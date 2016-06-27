class ChangeColumnNameInMeteorites < ActiveRecord::Migration
  def change
    remove_column :meteorites, :type, :string
    add_column :meteorites, :rock_type, :string
  end
end
