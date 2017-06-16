///<reference path="events/EventBus.ts"/>
var ZoomOutButtonClickListener = (function () {
    function ZoomOutButtonClickListener() {
        var _this = this;
        this.$j = jQuery.noConflict();
        this.$j(".zoomOutButton").click(function (event) { return _this.onZoomOutClicked(event); });
    }
    ZoomOutButtonClickListener.prototype.onZoomOutClicked = function (event) {
        EventBus.dispatchEvent("ZOOM_OUT_CLICKED", null);
    };
    return ZoomOutButtonClickListener;
}());
//# sourceMappingURL=ZoomOutButtonClickListener.js.map