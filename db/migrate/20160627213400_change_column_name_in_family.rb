class ChangeColumnNameInFamily < ActiveRecord::Migration
  def change
    remove_column :families, :type, :string
    add_column :families, :rock_type, :string
  end
end
