module PathHelper
    def helper_link rules
        script = "window.onload = function(){
                      clientFormCreate(org, \"myquestion\");
                      //alert(\"#{rules[0].class}\");
                  };"

        javascript_tag script
    end
end
