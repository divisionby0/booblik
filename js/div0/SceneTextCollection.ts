///<reference path="collections/Map.ts"/>
///<reference path="SceneText.ts"/>
///<reference path="events/EventBus.ts"/>
///<reference path="../lib/jqueryTS/jquery.d.ts"/>

class SceneTextCollection{
    private collection:Map<SceneText>;
    private $j:any;
    private coefficient:number = 1;
    private dimensions:any;
    
    private headerBaseFontSize:number = 30;
    private baseWidth:number = 960;
    private logoBaseWidth:number = 315;
    private logoBaseHeight:number = 47;
    private logoWidth:number;
    private containerId:string;
    private sceneTextContainerHeight:number;
    private currentSceneId:string = "intro";
    private sceneTextBounds:number[];
    private sceneBaseTextContentMarginTop:number = -28;
    private sceneBaseTextContentParagraphMarginTop:number = -3;

    constructor(containerId:string){
        this.$j = jQuery.noConflict();
        this.collection = new Map<SceneText>("texts");
        this.containerId=containerId;
        this.createTexts();
        EventBus.addEventListener("ON_RESIZE", (dimensions)=>this.onResize(dimensions));
        EventBus.addEventListener("ON_ENTER_FULLSCREEN", ()=>this.onEnterFullscreen());
    }
    
    public showText(sceneId:string):void{
        //this.currentSceneId = sceneId;
        var sceneText:SceneText = this.collection.get(sceneId);
        this.sceneTextBounds = sceneText.getPosition();
        var sceneTextContent:string = sceneText.getText();

        var currentText:string = this.$j("#"+this.containerId).html();
        var recodedString:string = currentText.replace(/"/g, '\'');

        if(sceneTextContent!=recodedString){
            this.currentSceneId = sceneId;
            this.$j("#"+this.containerId).html(sceneTextContent);
            this.resizeText();
            this.moveText();
        }
    }

    public hideText():void{
        //this.$j("#"+this.containerId).fadeOut(()=>this.onFadeOutTextComplete());
        this.$j("#"+this.containerId).html("");
    }
    private onFadeOutTextComplete():void {
        this.$j("#"+this.containerId).html("");
    }

    private onEnterFullscreen():void {
        this.$j("#"+this.containerId).css("z-index", 2147483647);
    }
    
    private createTexts():void{
        this.collection.add("intro", new SceneText("<p class='sceneTextHeader' id='sceneTextHeader' style='text-align:center; margin-bottom: 10px !important; color: #186637 !important;'><b>Цикл производства</b></p><div class='logoImage'><img src='../../assets/logo_small.png' id='nutriliteLogo'></div>", [0,0], 30, 0.5));
        this.collection.add("1", new SceneText("<p class='sceneTextHeader' id='sceneTextHeader'><b>Центр оптимального здоровья NUTRILITE</b></p><div class='sceneTextContent'>В Буэна-Парке, Калифорния, США, на площади равной примерно 3 250 кв.метров расположена штаб квартира Института Здоровья NUTRILITE. Центр обеспечивает первоклассные помещения для обучения, с улучшенным центром оценки состояния здоровья. На продукты NUTRILITE получено более 100 патентов.</div>", [20,310, 620], 30, 20));
        this.collection.add("2", new SceneText("<p class='sceneTextHeader' id='sceneTextHeader'><b>Исследование экосистемы</b></p><div class='sceneTextContent'>Мы заботимся о наших растениях в тесном сотрудничестве с природой:<p>- Хищные птицы помогают контролировать численность птиц и грызунов, нападающих на вырощенный урожай.</p><p>- Для уничтожения таких вредителей как тля, войлочник и белокрылка на поля выпускают божьих коровок</p><p>- Ручная прополка с помощью мотыги - прекрасный способ борьбы с сорняками, который до сих пор считается самым надежным в мире</p><p>- Выпас скота в междурядье сокращает количество сорных растений и обогащает почву питательными веществами биологического происхождения</p>", [20,210, 550], 30, 18));
        this.collection.add("3", new SceneText("<p class='sceneTextHeader' id='sceneTextHeader'><b>Ферма органических удобрений</b></p><div class='sceneTextContent''>На фермах NUTRILITE проиходит очень тщательный контроль всего цикла производства от почвы до готового продукта:<p>- органический компост, полученный из перегнивших растительных материалов, обогащенной почвы, улучшает баланс полезных веществ в почве</p> <p>- земляные черви. Играют ключевую роль в оздоровлении почвы, потому что они обогащают ее, пропуская через себя и насыщая гумусом</p></div>", [20,190, 530], 30, 22));
        this.collection.add("4", new SceneText("<p class='sceneTextHeader' id='sceneTextHeader'><b>Наблюдение за культурами</b></p><div class='sceneTextContent' >Наши фермы Нутрилайт занимаются выращиванием всего необходимого для производства продуктов NUTRILITE: эхинацеи, ромашки и многих других необходимых для производства продуктов</div>", [20,10, 530], 33, 24));
        this.collection.add("5", new SceneText("<p class='sceneTextHeader' id='sceneTextHeader'><b>Программа разведения</b></p><div class='sceneTextContent'>На опытных фермах NUTRILITE выращивают:<p>- ацеролу,</p><p>- гранаты,</p><p>- розмарин,</p><p>- морковь,</p><p>- и многие другие ингредиенты для наших продуктов</p></div>", [20,10, 530], 33, 24));
        this.collection.add("6", new SceneText("<p class='sceneTextHeader' id='sceneTextHeader'><b>Сбор урожая</b></p><div class='sceneTextContent'>На наших фермах растения собираются в тот период, когда содержание фитонутриентов в них находится на пике, чтобы из них получились растительные концентраты высочайшего качества, поэтому наше производство соответствует стандарту GMP ('Надлежащая производственная практика')</div>", [20,10, 550], 33, 24));
        this.collection.add("7", new SceneText("<p class='sceneTextHeader' id='sceneTextHeader'><b>Хранилище для сбора продуктов</b></p><div class='sceneTextContent'>Для оптимального сохранения всех уникальных свойств создано специальное хранилище NUTRILITE</div>", [20,10, 550], 33, 25));
        this.collection.add("8", new SceneText("<p class='sceneTextHeader' id='sceneTextHeader'><b>Распылительная сушка</b></p><div class='sceneTextContent'>Растения собираются и отправляются на дегидрацию. С этого момента начинается переработка с помощью запатентованного процесса бланширования и сушки, сохраняющее полезные и питательные вещества.</div>", [340,-5, 620], 33, 24));
        this.collection.add("9", new SceneText("<p class='sceneTextHeader' id='sceneTextHeader'><b>Сырье, концентраты</b></p><div class='sceneTextContent'>После того как растение высушено оно проходит процесс измельчения где его превращают в мельчайшие частицы, не воздействуя на пищевой состав. Чтобы изготовить 1 кг концентрата требуется 14 кг вишни ацеролы.</div>", [340,-5, 620], 33, 24));
        this.collection.add("10", new SceneText("<p class='sceneTextHeader' id='sceneTextHeader'><b>Экспертная лаборатория</b></p><div class='sceneTextContent'>При переработке растения используются целиком, включая семена и кожуру, которые содержат ценные питательные вещества. Витамины и минералы комбинируются с фитонутриентами полученными из более чем 145 видов растений. При этом все наши продукты проходят ежемесячную экспертизу.</div>", [470,-5, 470], 33, 25));
        this.collection.add("11", new SceneText("<p class='sceneTextHeader' id='sceneTextHeader'><b>Производственная система отслеживания</b></p><div class='sceneTextContent'>Все растительные материалы проходят карантин и строгое тестирование.  Чтобы обеспечить безопасность и эффективность продукта, проводится более 15 000 тестов ежемесячно!</div>", [290,314, 610], 34, 24));
    }

    private onResize(dimensions:any):void {
        this.dimensions = dimensions;
        this.coefficient = dimensions.width/this.baseWidth;
        this.resizeText();
        this.moveText();
    }

    private resizeText():void{
        this.logoWidth = this.logoBaseWidth*this.coefficient;

        var baseHeaderFontSize:number = this.collection.get(this.currentSceneId).getHeaderFontSize();
        var newHeaderFontSize:number = baseHeaderFontSize*this.coefficient;

        this.$j("#sceneTextHeader").css("font-size", newHeaderFontSize+"px");
        this.$j("#nutriliteLogo").width(this.logoWidth);
        this.$j("#nutriliteLogo").height(this.logoBaseHeight*this.coefficient);

        this.sceneTextContainerHeight = this.$j("#sceneTextContainer").outerHeight();
    }

    private moveText():void {
        if(this.currentSceneId){
            if(this.currentSceneId == "intro"){
                this.$j("#sceneTextContainer").css({left:this.dimensions.left+this.dimensions.width/2 - this.logoWidth/2, top:this.dimensions.top + this.dimensions.height/2 - this.sceneTextContainerHeight/2});
            }
            else{
                var contentLeft:number = this.sceneTextBounds[0];
                var contentTop:number = this.sceneTextBounds[1];
                var contentWidth:number = this.sceneTextBounds[2];
                var baseContentFontSize:number = this.collection.get(this.currentSceneId).getContentFontSize();

                console.log(contentLeft, contentTop, contentWidth, baseContentFontSize);

                var newContentLeft:number = contentLeft*this.coefficient;
                var newContentTop:number = contentTop*this.coefficient;
                var newContentWidth:number = contentWidth*this.coefficient;
                var newContentFontSize:number = baseContentFontSize*this.coefficient;

                var newContentMarginTop:number = this.sceneBaseTextContentMarginTop*this.coefficient;

                this.$j(".sceneTextContent").css("font-size", newContentFontSize+"px");
                this.$j("#sceneTextContainer").css({left:this.dimensions.left+ newContentLeft, top:this.dimensions.top + newContentTop});
                this.$j(".sceneTextContent").width(newContentWidth);
                this.$j(".sceneTextContent").css('margin-top',newContentMarginTop+"px");
                this.$j(".sceneTextContent > p").css('margin-top',this.sceneBaseTextContentParagraphMarginTop+"px");
                this.$j(".sceneTextContent > p").css('margin-bottom',this.sceneBaseTextContentParagraphMarginTop+"px");
            }
        }
    }
}
