///<reference path="../lib/jqueryTS/jquery.d.ts"/>
class HideZoomOutButton{

    private $j:any;

    constructor(){
        this.$j = jQuery.noConflict();
        this.$j(".zoomOutButton").hide();
    }
}
