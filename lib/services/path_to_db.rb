class PathToDb
    def to_db(recipe_name, rules)
        store_rules(recipe_name, rules)
        Rails.logger.debug "Stored Rules object to database."
    end

    private

    def store_rules(recipe_name, rules)
        recipe = Recipe.create(name: recipe_name)
        rules.each {|rule| store_rule(recipe, rule)}
    end

    def store_rule(recipe, rule_data)
        root_node = recipe.rules.create(extract_hash(rule_data))
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
