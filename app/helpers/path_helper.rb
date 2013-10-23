module PathHelper
    def helper_load_recipe recipe_num
        script = "
            var ready = function() {
                getRules("+recipe_num+");
            };
            $(document).ready(ready);
            //$(document).on('page:load', ready);"
        javascript_tag script
    end
end
