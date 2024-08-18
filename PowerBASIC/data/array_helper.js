var ResultList = (function () {
    function ResultList() {
        this.arr = [[-1, -1]];
    }
    ResultList.prototype.indexOfId = function (id) {
        var result = -1;
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i][0] === id) {
                result = i;
                break;
            }
        }
        return result;
    };
    ResultList.prototype.clear = function () {
        this.arr = [[-1, -1]];
    };
    ResultList.prototype.add = function (id, score) {
        var i = this.indexOfId(id);
        if (i > -1)
            this.arr[i][1] += score;
        else {
            this.arr.push([id, score]);
        }
    };
    ResultList.prototype.count = function () {
        return this.arr.length;
    };
    ResultList.prototype.length = function () {
        return this.arr.length;
    };
    ResultList.prototype.sort = function () {
        this.arr.sort();
    };
    ResultList.prototype.sort2 = function () {
        // by default would sort by 1st dimension
        this.arr.sort(function (a, b) {
            return a[1] - b[1];
        });
    };
    ResultList.prototype.sort2Desc = function () {
        // by default would sort by 1st dimension
        this.arr.sort(function (a, b) {
            return b[1] - a[1];
        });
    };
    ResultList.prototype.getId = function (idx) {
        return this.arr[idx][0];
    };
    ResultList.prototype.getScore = function (idx) {
        return this.arr[idx][1];
    };
    ResultList.prototype.trace = function () {
        for (var i = 0; i < this.arr.length; i++) {
            console.log(this.arr[i][0] + ", " + this.arr[i][1]);
        }
    };
    return ResultList;
})();
var results = new ResultList();
