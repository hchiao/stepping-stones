module PathHelper
    def helper_link rules

        count = 0
        inside = rules.inject("") do |string, rule|
            count = count + 1
            question = rule.condition
            string + "newQuestion(org, \"r" + count.to_s + "\", \"" + question + "\");"
        end

        script = "window.onload = function(){" + inside + "};"

        javascript_tag script
    end
end
