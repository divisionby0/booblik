///<reference path="../lib/jqueryTS/jquery.d.ts"/>
var PathHoverListener = (function () {
    function PathHoverListener() {
        var _this = this;
        this.$j = jQuery.noConflict();
        this.$j(".SVGHoverablePath").mouseover(function (event) { return _this.onSVGMouseOver(event); });
        this.$j(".SVGHoverablePath").mouseout(function (event) { return _this.onSVGMouseOut(event); });
    }
    PathHoverListener.prototype.onSVGMouseOver = function (event) {
        this.$j(event.target).attr("style", "stroke:'#3f4141'; fill-opacity:0.4; cursor:-webkit-zoom-out");
    };
    PathHoverListener.prototype.onSVGMouseOut = function (event) {
        this.$j(event.target).attr("style", "fill-opacity:0");
    };
    return PathHoverListener;
}());
//# sourceMappingURL=PathHoverListener.js.map