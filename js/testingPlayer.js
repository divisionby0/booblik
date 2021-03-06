var $ = jQuery.noConflict();

$( document ).ready(function($)
{
    Logger.init();
    var ver = "0.3.3";
    log("TESTING PLAYER ready");
    log(ver);
    //var vid = document.getElementById("player");
    var vid;

    var video = document.getElementById('player');
    var actualDimensions;

    var isMobile = false;

    //EventBus.addEventListener("ON_PLAYER_METADATA_LOADED", onPlayerMetadataLoaded);
    video.addEventListener( "loadedmetadata", onMetadataLoaded, false );

    var application;

    function onPlayerMetadataLoaded(){
        onMetadataLoaded();
    }

    function onMetadataLoaded(){
        log("TESTING_PLAYER_onMetadataLoaded");
        vid = document.getElementById("player");
        //log("vid="+video);
        //$("#metadataContainer").html("<h1>Metadata loaded !!!</h1>");
        if(!application){
            application = new Application_iOS();
            application.init();
        }

        $("#startButton").show();
        isMobile = isMobileOrTablet();
        log("isMobile="+isMobile);
        log("isIOS="+isIOS());
        
        onResize();
        EventBus.dispatchEvent("ON_RESIZE", actualDimensions);
        EventBus.addEventListener("ON_ENTER_FULLSCREEN", onEnterFullscreen);
        EventBus.addEventListener("ON_EXIT_FULLSCREEN", onExitFullscreen);
    }

    function onResize(){
        var offsetHeight = vid.offsetHeight;
        actualDimensions = VideoDimensions.getDimensions(vid);
        var documentWidth = $( document ).width();

        var leftOffset = (documentWidth - actualDimensions.width)/2;
        var topOffset = (offsetHeight - actualDimensions.height)/2;

        log("documentWidth="+documentWidth);
        log("actualDimensions width: "+actualDimensions.width+"  height:"+actualDimensions.height+"  videoRatio: "+actualDimensions.vidRatio);

        actualDimensions.top = topOffset;
        actualDimensions.left = leftOffset;

        if(isMobile){
            $("#allZonesContainer").css({top: actualDimensions.top, width: actualDimensions.width, height: actualDimensions.height});
            $("#pointerInfoIconContainer").css({left:actualDimensions.width - $("#pointerInfoImage").width()*3.6, top:actualDimensions.top + actualDimensions.height - $("#pointerInfoImage").height()*1.6});
        }
        else{
            $("#allZonesContainer").css({top: actualDimensions.top, left: actualDimensions.left, width: actualDimensions.width, height: actualDimensions.height});
            $("#pointerInfoIconContainer").css({left:actualDimensions.left+actualDimensions.width - $("#pointerInfoImage").width()*3.6, top:actualDimensions.top + actualDimensions.height - $("#pointerInfoImage").height()*1.6});
        }

        //$("#allZonesContainer").css({top: actualDimensions.top, width: actualDimensions.width, height: actualDimensions.height});
        //$("#allZonesContainer").css({top: actualDimensions.top, left: actualDimensions.left, width: actualDimensions.width, height: actualDimensions.height});

        $("#player").css({top: 0, left: 0});

        $(".zoomOutButton").css({top: topOffset, left: leftOffset, width: actualDimensions.width, height: actualDimensions.height});
        $("#startButton").css({top: topOffset, left: leftOffset, width: actualDimensions.width - 3, height: actualDimensions.height - 3});

    }

    function changeDepth(){

        log("changing depth");

        $("#player").css("z-index", 2147483647);
        $("#startButton").css("z-index", 2147483647);
        $("#allZonesContainer").css("z-index", 2147483647);
        $("#logContainer").css("z-index", 2147483647);

        /*
        $("#player").css("z-index", 21473);
        $("#startButton").css("z-index", 21474);
        $("#allZonesContainer").css("z-index", 21475);
        $("#logContainer").css("z-index", 21476);
        */

        log("player depth: "+$("#player").css("z-index"));
        log("startButton depth: "+$("#startButton").css("z-index"));
        log("allZonesContainer depth: "+$("#allZonesContainer").css("z-index"));
        log("logContainer depth: "+$("#logContainer").css("z-index"));
    }

    function onEnterFullscreen() {
        log(" -- ON ENTER FULLSCREEN");
        onResize();
        changeDepth();
    }

    function onExitFullscreen(){
        log("-- ON EXIT FULLSCREEN");
        onResize();
        changeDepth();
    }

    function isMobileOrTablet(){
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }

    function isIOS(){
        var check = false;
        var check = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        return check;
    }

    function log(message){
        //console.log(message);
        EventBus.dispatchEvent("LOG_MESSAGE", message);
    }


    $( window ).resize(function() {
        log("onResize");
        onResize();
        changeDepth();
        EventBus.dispatchEvent("ON_RESIZE", actualDimensions);
    });
});