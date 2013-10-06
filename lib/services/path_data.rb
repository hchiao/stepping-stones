class PathData
    attr_reader :condition, :true_path, :false_path

    def initialize(condition, true_path, false_path)
        @condition = condition
        @true_path = true_path
        @false_path = false_path
    end

    def lnr obj=self
        if obj == nil 
            return
        elsif obj.class == String
            return obj
        end

        "(" + lnr(obj.true_path) + " - " + obj.condition + " - " + lnr(obj.false_path) + ")"
    end

end
