class TimeRange{
    private start:number;
    private finish:number;
    private loop:TimeRange;
    
    constructor(start:number, finish:number, loop:TimeRange = null){
        this.start = start;
        this.finish = finish;
        this.loop = loop;
    }
    
    public getStart():number{
        return this.start;
    }
    public getFinish():number{
        return this.finish;
    }
    public getLoop():TimeRange{
        return this.loop;
    }
}