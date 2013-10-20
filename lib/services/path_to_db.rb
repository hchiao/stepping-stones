class PathToDb
    def toDb rules
        puts "===================================================="
        store_rules(rules)
        Rails.logger.debug "Stored Rules object to database."
    end

    private

    def store_rules rules
        store_rule rules.first
    end

    def store_rule rule_data
        root_node = Rule.create(extract_hash(rule_data))
        make_branches(root_node, rule_data)
    end

    def make_branch(parent, child_data)
        puts "----------------------------make_branch------------------------------------"
        child_node = parent.children.create(extract_hash(child_data))
        parent.children.create(extract_hash(child_data))
        make_branches(child_node, child_data)
    end

    def make_branches(parent, data)
        puts "----------------------------make_branches------------------------------------"
        puts "data: " + data.class.to_s
        if data.class == PathData
            make_branch(parent, data.true_path) if data.true_path != nil
            make_branch(parent, data.false_path) if data.false_path != nil
        end
    end

    def extract_hash path_data
        data = {}
        #data[:condition] = path_data.condition
        data
    end
end
