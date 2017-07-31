var VideoDimensions = (function(){

    function log(message){
        EventBus.dispatchEvent("LOG_MESSAGE", message);
    }


    return{
        getDimensions:function(video){
            log("getDimensions video="+video);
            log("videoWidth="+video.videoWidth+"  videoHeight="+video.videoHeight);
            // Ratio of the video's intrisic dimensions
            var videoRatio = video.videoWidth / video.videoHeight;
            // The width and height of the video element
            var width = video.offsetWidth;
            var height = video.offsetHeight;

            log("videoRatio="+videoRatio);
            log("Dimentions width="+width+"  height="+height);
            // The ratio of the element's width to its height
            var elementRatio = width/height;
            // If the video element is short and wide
            if(elementRatio > videoRatio) width = height * videoRatio;
            // It must be tall and thin, or exactly equal to the original ratio
            else height = width / videoRatio;
            
            return {
                width: width,
                height: height,
                vidRatio:videoRatio
            };
        }
    }
})();
