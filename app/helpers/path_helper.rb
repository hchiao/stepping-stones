module PathHelper
    def helper_link rules

        #count = 0
        #inside = rules.inject("") do |rule_calls, rule|
        #    count = count + 1
        #    question = rule.condition
        #    rule_calls + "newQuestion(org, \"r" + count.to_s + "\", \"" + question + "\");"
        #end

        #getRules = "getRules();"
        makeForm = "getRules();"
        script = "window.onload = function(){" + makeForm + "};"

        javascript_tag script
    end
end
