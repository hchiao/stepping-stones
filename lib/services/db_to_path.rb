class DbToPath
    def to_path
        rules = Rule.all
        puts "==========================================="
        puts "The rules from db: " + rules.to_a.to_s
    end
end
