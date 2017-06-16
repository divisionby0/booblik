///<reference path="collections/Map.ts"/>
///<reference path="events/EventBus.ts"/>
///<reference path="../lib/jqueryTS/jquery.d.ts"/>
var SceneLeavesCollection = (function () {
    function SceneLeavesCollection() {
        var _this = this;
        this.baseWidth = 960;
        this.leftTopLeafBaseWidth = 254;
        this.rightTopLeafBaseWidth = 250;
        this.leftBottomLeafBaseWidth = 123;
        this.rightBottomLeafBaseWidth = 123;
        this.coefficient = 1;
        this.$j = jQuery.noConflict();
        this.collection = new Map("leaves");
        this.create();
        this.createLeaves();
        EventBus.addEventListener("ON_RESIZE", function (dimensions) { return _this.onResize(dimensions); });
        EventBus.addEventListener("ON_ENTER_FULLSCREEN", function () { return _this.onEnterFullscreen(); });
    }
    SceneLeavesCollection.prototype.getLeaves = function (id) {
        return this.collection.get(id);
    };
    SceneLeavesCollection.prototype.onEnterFullscreen = function () {
        console.log("on enter fullscreen");
        this.$j(".leaf").css("z-index", 2147483647);
    };
    SceneLeavesCollection.prototype.create = function () {
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
    };
    SceneLeavesCollection.prototype.onResize = function (dimensions) {
        this.dimensions = dimensions;
        //console.log("\nLeaves onResize ",dimensions);
        this.coefficient = dimensions.width / this.baseWidth;
        //console.log("coeff="+this.coefficient);
        this.resizeLeaves();
        this.moveLeaves();
    };
    SceneLeavesCollection.prototype.resizeLeaves = function () {
        this.leftTopLeaf.css({ width: this.leftTopLeafBaseWidth * this.coefficient });
        this.rightTopLeaf.css({ width: this.rightTopLeafBaseWidth * this.coefficient });
        this.leftBottomLeaf.css({ width: this.leftBottomLeafBaseWidth * this.coefficient });
        this.rightBottomLeaf.css({ width: this.rightBottomLeafBaseWidth * this.coefficient });
    };
    SceneLeavesCollection.prototype.moveLeaves = function () {
        this.leftTopLeaf.css({ left: this.dimensions.left, top: this.dimensions.top });
        this.leftBottomLeaf.css({ left: this.dimensions.left, top: this.dimensions.top + this.dimensions.height - this.leftBottomLeaf.height() });
        this.rightTopLeaf.css({ left: this.dimensions.left + this.dimensions.width - this.rightTopLeaf.width(), top: this.dimensions.top });
        this.rightBottomLeaf.css({ left: this.dimensions.left + this.dimensions.width - this.rightBottomLeaf.width(), top: this.dimensions.top + this.dimensions.height - this.rightBottomLeaf.height() });
    };
    SceneLeavesCollection.prototype.createLeaves = function () {
        this.leftTopLeaf = this.$j("#leafTopLeft");
        this.rightTopLeaf = this.$j("#leafTopRight");
        this.leftBottomLeaf = this.$j("#leafBottomLeft");
        this.rightBottomLeaf = this.$j("#leafBottomRight");
    };
    return SceneLeavesCollection;
}());
//# sourceMappingURL=SceneLeavesCollection.js.map