///<reference path="../lib/jqueryTS/jquery.d.ts"/>
///<reference path="events/EventBus.ts"/>
var SceneBackButton = (function () {
    function SceneBackButton() {
        var _this = this;
        this.coefficient = 1;
        this.baseWidth = 960;
        this.baseImageWidth = 64;
        this.baseImageHeight = 64;
        this.$j = jQuery.noConflict();
        EventBus.addEventListener("ON_RESIZE", function (dimensions) { return _this.onResize(dimensions); });
    }
    SceneBackButton.prototype.onResize = function (dimensions) {
        this.dimensions = dimensions;
        this.coefficient = dimensions.width / this.baseWidth;
        this.$j("#zoomOutMagnifierImage").width(this.baseImageWidth * this.coefficient);
        this.$j("#zoomOutMagnifierImage").height(this.baseImageHeight * this.coefficient);
        this.$j(".overlay_back_button").css({ left: this.dimensions.left + this.dimensions.width - this.$j("#zoomOutMagnifierImage").width() - this.$j("#zoomOutMagnifierImage").width() / 14, top: this.dimensions.top + this.dimensions.height - this.$j("#zoomOutMagnifierImage").height() - this.$j("#zoomOutMagnifierImage").height() / 16 });
    };
    return SceneBackButton;
}());
//# sourceMappingURL=SceneBackButton.js.map