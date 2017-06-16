///<reference path="TimeRange.ts"/>
class Scene{
    protected zoomInStartTime:number;
    protected zoomOutFinishTime:number;
    protected loopFinishTime:number;
    protected loopStartTime:number;
    private id:string;
    
    constructor(id:string, zoomInStartTime:number, loopStartTime:number, loopFinishTime:number, zoomOutFinishTime:number){
        this.id = id;
        this.zoomInStartTime = zoomInStartTime;
        this.zoomOutFinishTime = zoomOutFinishTime;
        this.loopStartTime = loopStartTime;
        this.loopFinishTime = loopFinishTime;
    }
    
    public getId():string{
        return this.id;
    }
    
    public getRange():TimeRange{
        return new TimeRange(this.zoomInStartTime, this.zoomOutFinishTime, new TimeRange(this.loopStartTime, this.loopFinishTime));
    }
    
    /*
    public getZoomInRange():TimeRange{
        return new TimeRange(this.zoomInStartTime, this.loopStartTime);
    }
    public getZoomOutRange():TimeRange{
        return new TimeRange(this.loopFinishTime, this.zoomOutFinishTime);
    }
    public getLoopRange():TimeRange{
        return new TimeRange(this.loopStartTime, this.loopFinishTime);
    }
    */
}
