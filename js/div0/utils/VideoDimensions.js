var VideoDimensions = (function(){
    return{
        getDimensions:function(video){
            // Ratio of the video's intrisic dimensions
            var videoRatio = video.videoWidth / video.videoHeight;
            // The width and height of the video element
            var width = video.offsetWidth;
            var height = video.offsetHeight;
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
