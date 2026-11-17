var SearchEngine = (function () {
    function SearchEngine() {
        this.results = new ResultList();
        this.hl_str = "";
    }
    SearchEngine.prototype.isMatch = function (word, term) {
        if (word.indexOf(term) != -1)
            return true;
        else
            return false;
    };
    SearchEngine.prototype.search = function (s) {
        this.results.clear();
        var input = s.split(/ +/);
        this.hl_str = "?highlight=1";
        var _results = new Array();
        for (var i = 0; i < input.length; i++) {
            _results.push(new ResultList());
            this.hl_str += "," + input[i];
        }
        for (var i = 0; i < input.length; i++)
            for (var j = 0; j < searchArr.length; j += 2) {
                if (this.isMatch(searchArr[j], input[i])) {
                    for (var k = 0; k < searchArr[j + 1].length; k++) {
                        _results[i].add(searchArr[j + 1][k][0], searchArr[j + 1][k][1]);
                    }
                }
            }
        for (var i = 0; i < _results.length; i++) {
        }
        for (var i = 0; i < _results[0].count(); i++) {
            var occ = 1;
            var score = _results[0].getScore(i);
            var id = _results[0].getId(i);
            for (var j = 1; j < input.length; j++) {
                var idx = _results[j].indexOfId(id);
                if (idx > -1) {
                    occ += 1;
                    score += _results[j].getScore(idx);
                }
            }
            if (occ === input.length)
                this.results.add(id, score);
        }
        this.results.sort2Desc();
        //this.results.trace();
    };
    return SearchEngine;
})();
