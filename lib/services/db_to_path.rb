class DbToPath
    def to_path
        roots_array = Rule.all.select {|rule| rule.root?}
        rules = roots_array.map {|root| make_rule root}
        Rails.logger.debug "Extracted rules from db"
        return rules
    end

    private

    TRUE_BRANCH = 0
    FALSE_BRANCH = 1

    def make_rule root
        data = PathData.new(root.condition,
                            evaluate(root.children[TRUE_BRANCH]),
                            evaluate(root.children[FALSE_BRANCH]))
        return data
    end

    def evaluate node
        if node.descendants == {}
            return node.answer
        else
            return make_rule node
        end
    end
end
