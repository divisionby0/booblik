///<reference path="../lib/jqueryTS/jquery.d.ts"/>
var HideZoomOutButton = (function () {
    function HideZoomOutButton() {
        this.$j = jQuery.noConflict();
        this.$j(".zoomOutButton").hide();
    }
    return HideZoomOutButton;
}());
//# sourceMappingURL=HideZoomOutButton.js.map