class CacheImagesAjaxTesting{
    
    private $j:any;

    private cachedImagesCounter:number = 0;
    private totalImages:number = 128;
    private imagesCollection:any[] = new Array();
    private sources:string[] = new Array();

    constructor(){

        this.$j = jQuery.noConflict();

        console.log("ready");

        for(var i:number=0; i < this.totalImages; i++){
            var img = this.$j("<img style='position: absolute; z-index: 0;'/>");

            this.$j("#images").append(img);
            this.imagesCollection.push(img);
        }

        this.buildSources();
        this.preloadImage();
    }

    private buildSources():void{
        console.log("building sources...");
        for(var i:number=0; i < this.totalImages; i++){
            var imageUrl:string = this.buildImageUrl(i);
            //console.log("imageUrl: "+imageUrl);
            this.sources.push(imageUrl);
        }
    }

    private buildImageUrl(counter:number):string{
        var url:string = "assets/video/sequences/full/full_20fps_";

        var id:number = counter+1;

        if(id<10){
            url+=("00"+id);
        }
        else if(id>9 && id<100){
            url+="0"+id;
        }
        else{
            url+=id;
        }
        url+=".jpg";
        return url;
    }

    private preloadImage():void {
        console.log("start preloading image "+this.cachedImagesCounter+" ...");
        var img:any = this.imagesCollection[this.cachedImagesCounter];
        var imageSource = this.sources[this.cachedImagesCounter];
        img.attr('src', imageSource).on("load", ()=>this.imageCacheComplete(img));
    }

    private imageCacheComplete(img:any):void{
        console.log("image "+this.cachedImagesCounter+" cache complete");
        this.cachedImagesCounter++;
        if(this.cachedImagesCounter<this.totalImages){

            var procent:number =  Math.round(this.cachedImagesCounter/this.totalImages*100);
            console.log(procent);
            this.preloadImage();
        }
        else{
            console.log("IMAGES CACHE COMPLETE !!!");
        }
    }

    private showCacheProcent(procent:number):void{
        this.$j("#preloader").text(procent+"%");
    }
}
