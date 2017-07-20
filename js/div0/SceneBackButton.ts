///<reference path="../lib/jqueryTS/jquery.d.ts"/>
///<reference path="events/EventBus.ts"/>
class SceneBackButton{
    private $j:any;
    private coefficient:number = 1;
    private dimensions:any;
    private baseWidth:number = 960;
    private baseImageWidth:number = 64;
    private baseImageHeight:number = 64;

    constructor(){
        this.$j = jQuery.noConflict();
        EventBus.addEventListener("ON_RESIZE", (dimensions)=>this.onResize(dimensions));
    }

    private onResize(dimensions:any):void {
        this.dimensions = dimensions;
        this.coefficient = dimensions.width/this.baseWidth;

        this.$j("#zoomOutMagnifierImage").width(this.baseImageWidth*this.coefficient);
        this.$j("#zoomOutMagnifierImage").height(this.baseImageHeight*this.coefficient);

        this.$j(".overlay_back_button").css({left:this.dimensions.left + this.dimensions.width - this.$j("#zoomOutMagnifierImage").width()- this.$j("#zoomOutMagnifierImage").width()/14, top:this.dimensions.top + this.dimensions.height - this.$j("#zoomOutMagnifierImage").height() - this.$j("#zoomOutMagnifierImage").height()/16});
    }
}
