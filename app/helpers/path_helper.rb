module PathHelper
    def helper_link rules
        json_rules = rules.to_json
        script = "window.onload = function(){
                      //clientFormCreate(org, \"#{rules[0].condition}\", \"#{json_rules}\");
                      clientFormCreate(org, \"#{rules[0].condition}\");
                  };"

        puts "----------------------==========================-------------------------"
        puts json_rules

        javascript_tag script
    end
end
