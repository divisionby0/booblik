var TimeRange = (function () {
    function TimeRange(start, finish, loop) {
        if (loop === void 0) { loop = null; }
        this.start = start;
        this.finish = finish;
        this.loop = loop;
    }
    TimeRange.prototype.getStart = function () {
        return this.start;
    };
    TimeRange.prototype.getFinish = function () {
        return this.finish;
    };
    TimeRange.prototype.getLoop = function () {
        return this.loop;
    };
    return TimeRange;
}());
//# sourceMappingURL=TimeRange.js.map