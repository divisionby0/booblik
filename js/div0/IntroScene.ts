///<reference path="Scene.ts"/>
class IntroScene extends Scene{
    
    constructor(id:string, zoomInStartTime:number, loopStartTime:number, loopFinishTime:number, zoomOutFinishTime:number){
        super(id, zoomInStartTime, loopStartTime, loopFinishTime, zoomOutFinishTime);
    }


    public getRange():TimeRange{
        return new TimeRange(0, this.zoomOutFinishTime, new TimeRange(this.loopStartTime, this.loopFinishTime));
    }
}
