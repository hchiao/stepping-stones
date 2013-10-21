class PathToDb
    def to_db rules
        store_rules(rules)
        Rails.logger.debug "Stored Rules object to database."
    end

    private

    def store_rules rules
        rules.each {|rule| store_rule rule}
    end

    def store_rule rule_data
        root_node = Rule.create(extract_hash(rule_data))
        make_branches(root_node, rule_data)
    end

    def make_branch(parent, child_data)
        child_node = parent.children.create(extract_hash(child_data))
        make_branches(child_node, child_data)
    end

    def make_branches(parent, data)
        if data.class == PathData
            make_branch(parent, data.true_path) if data.true_path != nil
            make_branch(parent, data.false_path) if data.false_path != nil
        end
    end

    def extract_hash path_data
        data = {}
        if path_data.class == PathData
            data[:condition] = path_data.condition
        else
            data[:answer] = path_data
        end
        data
    end
end
