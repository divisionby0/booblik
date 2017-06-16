///<reference path="events/EventBus.ts"/>
class ZoomOutButtonClickListener{

    private $j:any;
    
    constructor(){
        this.$j = jQuery.noConflict();
        this.$j(".zoomOutButton").click((event)=>this.onZoomOutClicked(event));
    }

    private onZoomOutClicked(event:any):void {
        EventBus.dispatchEvent("ZOOM_OUT_CLICKED", null);
    }
}
