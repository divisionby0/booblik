var Logger = (function(){

    var $ = jQuery.noConflict();

    function onLogMessage(message){
        $("#logTextArea").append(message+"\n");
    }
    
    return{
        init:function(){
            EventBus.addEventListener("LOG_MESSAGE", onLogMessage);
        }
    }
})();






