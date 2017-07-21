var CacheImagesAjaxTesting = (function () {
    function CacheImagesAjaxTesting() {
        this.cachedImagesCounter = 0;
        this.totalImages = 128;
        this.imagesCollection = new Array();
        this.sources = new Array();
        this.$j = jQuery.noConflict();
        console.log("ready");
        for (var i = 0; i < this.totalImages; i++) {
            var img = this.$j("<img style='position: absolute; z-index: 0;'/>");
            this.$j("#images").append(img);
            this.imagesCollection.push(img);
        }
        this.buildSources();
        this.preloadImage();
    }
    CacheImagesAjaxTesting.prototype.buildSources = function () {
        console.log("building sources...");
        for (var i = 0; i < this.totalImages; i++) {
            var imageUrl = this.buildImageUrl(i);
            //console.log("imageUrl: "+imageUrl);
            this.sources.push(imageUrl);
        }
    };
    CacheImagesAjaxTesting.prototype.buildImageUrl = function (counter) {
        var url = "assets/video/sequences/full/full_20fps_";
        var id = counter + 1;
        if (id < 10) {
            url += ("00" + id);
        }
        else if (id > 9 && id < 100) {
            url += "0" + id;
        }
        else {
            url += id;
        }
        url += ".jpg";
        return url;
    };
    CacheImagesAjaxTesting.prototype.preloadImage = function () {
        var _this = this;
        console.log("start preloading image " + this.cachedImagesCounter + " ...");
        var img = this.imagesCollection[this.cachedImagesCounter];
        var imageSource = this.sources[this.cachedImagesCounter];
        img.attr('src', imageSource).on("load", function () { return _this.imageCacheComplete(img); });
    };
    CacheImagesAjaxTesting.prototype.imageCacheComplete = function (img) {
        console.log("image " + this.cachedImagesCounter + " cache complete");
        this.cachedImagesCounter++;
        if (this.cachedImagesCounter < this.totalImages) {
            var procent = Math.round(this.cachedImagesCounter / this.totalImages * 100);
            console.log(procent);
            this.preloadImage();
        }
        else {
            console.log("IMAGES CACHE COMPLETE !!!");
        }
    };
    CacheImagesAjaxTesting.prototype.showCacheProcent = function (procent) {
        this.$j("#preloader").text(procent + "%");
    };
    return CacheImagesAjaxTesting;
}());
//# sourceMappingURL=CacheImagesAjaxTesting.js.map