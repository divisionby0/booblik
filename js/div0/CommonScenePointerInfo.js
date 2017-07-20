///<reference path="../lib/jqueryTS/jquery.d.ts"/>
///<reference path="events/EventBus.ts"/>
var CommonScenePointerInfo = (function () {
    function CommonScenePointerInfo() {
        var _this = this;
        this.baseFontSize = 1.5;
        this.coefficient = 1;
        this.baseWidth = 960;
        //private baseImageWidth:number = 45;
        this.baseImageWidth = 60;
        this.baseImageHeight = 60;
        this.$j = jQuery.noConflict();
        EventBus.addEventListener("ON_RESIZE", function (dimensions) { return _this.onResize(dimensions); });
    }
    CommonScenePointerInfo.prototype.onResize = function (dimensions) {
        this.dimensions = dimensions;
        this.coefficient = dimensions.width / this.baseWidth;
        this.$j(".pointerInfoContent").css("font-size", this.baseFontSize * this.coefficient + "em");
        this.$j("#pointerInfoImage").width(this.baseImageWidth * this.coefficient);
        this.$j("#pointerInfoImage").height(this.baseImageHeight * this.coefficient);
        //console.log("pointer bounds: ",this.$j("#pointerInfoImage").width(), this.$j("#pointerInfoImage").height());
        this.$j("#pointerInfoIconContainer").css({ left: this.dimensions.left + this.dimensions.width - this.$j("#pointerInfoImage").width() * 3.6, top: this.dimensions.top + this.dimensions.height - this.$j("#pointerInfoImage").height() * 1.6 });
    };
    return CommonScenePointerInfo;
}());
//# sourceMappingURL=CommonScenePointerInfo.js.map