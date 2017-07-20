///<reference path="../lib/jqueryTS/jquery.d.ts"/>
///<reference path="events/EventBus.ts"/>
class CommonScenePointerInfo{
    private $j:any;
    private baseFontSize:number = 1.5;
    private coefficient:number = 1;
    private dimensions:any;
    private baseWidth:number = 960;
    //private baseImageWidth:number = 45;
    private baseImageWidth:number = 60;
    private baseImageHeight:number = 60;

    constructor(){
        this.$j = jQuery.noConflict();
        EventBus.addEventListener("ON_RESIZE", (dimensions)=>this.onResize(dimensions));
    }

    private onResize(dimensions:any):void{
        this.dimensions = dimensions;
        this.coefficient = dimensions.width/this.baseWidth;

        this.$j(".pointerInfoContent").css("font-size", this.baseFontSize*this.coefficient+"em");
        this.$j("#pointerInfoImage").width(this.baseImageWidth*this.coefficient);
        this.$j("#pointerInfoImage").height(this.baseImageHeight*this.coefficient);

        //console.log("pointer bounds: ",this.$j("#pointerInfoImage").width(), this.$j("#pointerInfoImage").height());

        this.$j("#pointerInfoIconContainer").css({left:this.dimensions.left+this.dimensions.width - this.$j("#pointerInfoImage").width()*3.6, top:this.dimensions.top + this.dimensions.height - this.$j("#pointerInfoImage").height()*1.6});

    }
}
