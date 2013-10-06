class DynamicPath
    Inf = 1.0/0.0

    def parse hash
        makeRules hash
    end

    private

    def makeRules hash
        ruleValidTo = (1..Inf).each {|x| break x-1 if hash.member?("r" + x.to_s + "c1") == false }
        ruleNames = (1..ruleValidTo).map { |x| "r" + x.to_s }
        rules = ruleNames.map {|x| makeRule x, 1, hash }
        rules
    end

    def makeRule path, level, hash
        data = PathData.new(hash[path + "c" + level.to_s], 
                            evaluate(path + "t" + level.to_s, level, hash),
                            evaluate(path + "f" + level.to_s, level, hash))
        return data
    end

    def evaluate path, level, hash
        if hash.member? path + "a"
            return hash[path + "a"]
        elsif hash.member? path + "c" + (level + 1).to_s
            return makeRule path, level + 1, hash
        else
            raise IndexError, "Path: " + path + " - Child not Rule or Ans"
        end
    end
end
