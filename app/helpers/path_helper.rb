module PathHelper
    def helper_load_recipe
        script = "
            var ready = function() {
                getRules();
            };
            $(document).ready(ready);
            //$(document).on('page:load', ready);"
        javascript_tag script
    end
end
