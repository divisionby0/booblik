class SceneText{

    private text:string;
    private position:number[];
    private contentFontSize:number;
    private headerFontSize:number;

    constructor(text:string, position:number[], headerFontSize:number, contentFontSize:number){
        this.text = text;
        this.position = position;
        this.contentFontSize = contentFontSize;
        this.headerFontSize = headerFontSize;
    }
    
    public getText():string{
        return this.text;
    }
    public getPosition():number[]{
        return this.position;
    }

    public getContentFontSize():number{
        return this.contentFontSize;
    }
    public getHeaderFontSize():number{
        return this.headerFontSize;
    }
}
