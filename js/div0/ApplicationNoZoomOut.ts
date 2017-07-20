///<reference path="Player.ts"/>
///<reference path="Scene.ts"/>
///<reference path="collections/Map.ts"/>
///<reference path="IntroScene.ts"/>
///<reference path="../lib/jqueryTS/jquery.d.ts"/>
///<reference path="PathHoverListener.ts"/>
///<reference path="ZoomOutButtonClickListener.ts"/>
///<reference path="ShowZoomOutButton.ts"/>
///<reference path="SceneTextCollection.ts"/>
///<reference path="SceneLeavesCollection.ts"/>
///<reference path="VideoSources.ts"/>
///<reference path="CommonScenePointerInfo.ts"/>
///<reference path="SceneBackButton.ts"/>
///<reference path="Application.ts"/>
///<reference path="VideoSourcesNoZoomOut.ts"/>
class ApplicationNoZoomOut extends Application{


    protected createVideoSources():void{
        this.videoSources = new VideoSourcesNoZoomOut();
    }
    
    protected createScenes():void {
        console.log("App no zoom out create scenes");
        this.scenes = new Map<Scene>('scenes');
        this.scenes.add("intro", new IntroScene("intro", 0, 0, 6.03, 6.03));

        this.scenes.add("1", new Scene("1", 6.44, 7.8, 13.26, 0));
        this.scenes.add("2", new Scene("2", 14.30, 15.26, 20.49, 0));
        this.scenes.add("3", new Scene("3", 21.49, 22.8, 28.4, 0));
        this.scenes.add("4", new Scene("4", 28.9, 30.2, 35.7, 0));
        this.scenes.add("5", new Scene("5", 36.2, 37.1, 42.8, 0));
        this.scenes.add("6", new Scene("6", 43.6, 44.4, 50.3, 0));
        this.scenes.add("7", new Scene("7", 50.9, 52, 57.8, 0));
        this.scenes.add("8", new Scene("8", 58.3, 59.2, 65.2, 0));
        this.scenes.add("9", new Scene("9", 65.7, 66.9, 72.4, 0));
        this.scenes.add("10", new Scene("10", 73, 74, 80, 0));

        this.scenes.add("11", new Scene("11", 80.6, 81.3, 87, 0));
    }
}
