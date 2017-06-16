///<reference path="../lib/jqueryTS/jquery.d.ts"/>
class ShowZoomOutButton{

    private $j:any;
    
    constructor(id:string){
        this.$j = jQuery.noConflict();
        
        this.$j("#zoomOutButton"+id).show();
    }
}
