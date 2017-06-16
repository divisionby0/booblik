///<reference path="collections/Map.ts"/>
///<reference path="events/EventBus.ts"/>
///<reference path="../lib/jqueryTS/jquery.d.ts"/>
class SceneLeavesCollection{
    private collection:Map<string[]>;
    private $j:any;
    private leftTopLeaf:any;
    private rightTopLeaf:any;
    private leftBottomLeaf:any;
    private rightBottomLeaf:any;

    private baseWidth:number = 960;

    private leftTopLeafBaseWidth:number = 254;
    private rightTopLeafBaseWidth:number = 250;
    private leftBottomLeafBaseWidth:number = 123;
    private rightBottomLeafBaseWidth:number = 123;

    private coefficient:number = 1;
    private dimensions:any;
    
    constructor(){
        this.$j = jQuery.noConflict();
        this.collection = new Map<string[]>("leaves");
        this.create();
        this.createLeaves();
        EventBus.addEventListener("ON_RESIZE", (dimensions)=>this.onResize(dimensions));
        EventBus.addEventListener("ON_ENTER_FULLSCREEN", ()=>this.onEnterFullscreen());
    }

    public getLeaves(id:string):string[]{
        return this.collection.get(id);
    }

    private onEnterFullscreen():void {
        console.log("on enter fullscreen");
        this.$j(".leaf").css("z-index", 2147483647);
    }

    private create():void{
        this.collection.add("intro", ["leafTopLeft", "leafTopRight", "leafBottomLeft"]);
        this.collection.add("1", ["leafBottomRight"]);
        this.collection.add("2", ["leafBottomRight"]);
        this.collection.add("3", ["leafTopLeft"]);
        this.collection.add("4", ["leafBottomLeft"]);
        this.collection.add("5", ["leafBottomLeft"]);
        this.collection.add("6", ["leafBottomLeft"]);
        this.collection.add("7", ["leafTopRight"]);
        this.collection.add("8", ["leafTopLeft", "leafBottomRight"]);
        this.collection.add("9", ["leafBottomRight"]);
        this.collection.add("10", ["leafBottomRight"]);
        this.collection.add("11", ["leafTopRight"]);
    }

    private onResize(dimensions:any):void{
        this.dimensions = dimensions;
        //console.log("\nLeaves onResize ",dimensions);
        this.coefficient = dimensions.width/this.baseWidth;
        //console.log("coeff="+this.coefficient);
        this.resizeLeaves();
        this.moveLeaves();
    }

    private resizeLeaves():void{
        this.leftTopLeaf.css({width: this.leftTopLeafBaseWidth*this.coefficient});
        this.rightTopLeaf.css({width: this.rightTopLeafBaseWidth*this.coefficient});
        this.leftBottomLeaf.css({width: this.leftBottomLeafBaseWidth*this.coefficient});
        this.rightBottomLeaf.css({width: this.rightBottomLeafBaseWidth*this.coefficient});
    }
    private moveLeaves():void{
        this.leftTopLeaf.css({left:this.dimensions.left, top:this.dimensions.top});
        this.leftBottomLeaf.css({left:this.dimensions.left, top:this.dimensions.top + this.dimensions.height - this.leftBottomLeaf.height()});

        this.rightTopLeaf.css({left:this.dimensions.left+this.dimensions.width - this.rightTopLeaf.width(), top:this.dimensions.top});
        this.rightBottomLeaf.css({left:this.dimensions.left+this.dimensions.width - this.rightBottomLeaf.width(), top:this.dimensions.top + this.dimensions.height - this.rightBottomLeaf.height()});
    }

    private createLeaves():void {
        this.leftTopLeaf = this.$j("#leafTopLeft");
        this.rightTopLeaf = this.$j("#leafTopRight");
        this.leftBottomLeaf = this.$j("#leafBottomLeft");
        this.rightBottomLeaf = this.$j("#leafBottomRight");
    }


}
