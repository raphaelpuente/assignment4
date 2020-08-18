(function(){

    let stage: createjs.Stage;
    let assets: createjs.LoadQueue;
    let slotMachineBackground: Core.GameObject;

    let manifest: Core.Item[] = [
        {id:"background", src:"./Assets/background.png"},
        {id:"banana", src:"./Assets/banana.png"},
        {id:"bar", src:"./Assets/bar.png"},
        {id:"bell", src:"./Assets/bell.png"},
        {id:"bet_line", src:"./Assets/bet_line.png"},
        {id:"bet1Button", src:"./Assets/bet1Button.png"},
        {id:"bet10Button", src:"./Assets/bet10Button.png"},
        {id:"bet100Button", src:"./Assets/bet100Button.png"},
        {id:"betMaxButton", src:"./Assets/betMaxButton.png"},
        {id:"blank", src:"./Assets/blank.png"},
        {id:"cherry", src:"./Assets/cherry.png"},
        {id:"grapes", src:"./Assets/grapes.png"},
        {id:"orange", src:"./Assets/orange.png"},
        {id:"seven", src:"./Assets/seven.png"},
        {id:"spinButton", src:"./Assets/spinButton.png"}
    ];


    function Preload():void
    {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
        assets.loadManifest(manifest);
    }

    function Start():void
    {
        console.log("App started...");  
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);

        stage.enableMouseOver(20);

        Config.Globals.AssetManifest = assets;

        Main();
    }

    function Update():void
    {      
        stage.update();
    }
 

    function Main():void
    {
       slotMachineBackground = new Core.GameObject("background", 320,240,true);
       stage.addChild(slotMachineBackground);

    }

    window.addEventListener("load",Preload);

})();