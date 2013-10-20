class Rule < ActiveRecord::Base
    acts_as_sane_tree order: "condition"
end
