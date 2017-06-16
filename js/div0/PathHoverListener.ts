///<reference path="../lib/jqueryTS/jquery.d.ts"/>
class PathHoverListener{

    private $j:any;
    
    constructor(){
        this.$j = jQuery.noConflict();
        this.$j(".SVGHoverablePath").mouseover((event)=>this.onSVGMouseOver(event));
        this.$j(".SVGHoverablePath").mouseout((event)=>this.onSVGMouseOut(event));
    }

    private onSVGMouseOver(event:any):void {
        this.$j(event.target).attr("style", "stroke:'#3f4141'; fill-opacity:0.4; cursor:-webkit-zoom-out");
    }
    private onSVGMouseOut(event:any):void {
        this.$j(event.target).attr("style", "fill-opacity:0");
    }
}
