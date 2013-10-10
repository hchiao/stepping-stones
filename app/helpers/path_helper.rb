module PathHelper
    def helper_link rules

        makeForm = "getRules();"
        script = "window.onload = function(){" + makeForm + "};"

        javascript_tag script
    end
end
