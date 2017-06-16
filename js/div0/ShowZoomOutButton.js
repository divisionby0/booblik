///<reference path="../lib/jqueryTS/jquery.d.ts"/>
var ShowZoomOutButton = (function () {
    function ShowZoomOutButton(id) {
        this.$j = jQuery.noConflict();
        this.$j("#zoomOutButton" + id).show();
    }
    return ShowZoomOutButton;
}());
//# sourceMappingURL=ShowZoomOutButton.js.map