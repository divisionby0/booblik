var $ = jQuery.noConflict();
$( document ).ready(function($)
{
    var pathArray = location.href.split( '/' );
    var protocol = pathArray[0];
    var host = pathArray[2];
    var url = protocol + '//' + host;
    
    var isIOS = MobileDetector.detectIsIOS();
    
    if(isIOS){
        window.location.replace("http://"+host+"/ios.html");
    }
    else{
        window.location.replace("http://"+host+"/normal.html");
    }
});
