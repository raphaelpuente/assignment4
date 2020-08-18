(function(){

    let stage: createjs.Stage;
    let assets: createjs.LoadQueue;
    let slotMachineBackground: Core.GameObject;
    let spinBotton: UIObjects.Button;
    let bet1Button: UIObjects.Button;
    let bet10Button: UIObjects.Button;
    let bet100Button: UIObjects.Button;
    let betMaxButton: UIObjects.Button;
    let jackpotLabel: UIObjects.Label;
    let creditLabel: UIObjects.Label;
    let winningLabel: UIObjects.Label;

    let manifest: Core.Item[] = [
        {id:"background", src:"./Assets/background.png"},
        {id:"banana", src:"./Assets/banana.gif"},
        {id:"bar", src:"./Assets/bar.gif"},
        {id:"bell", src:"./Assets/bell.gif"},
        {id:"bet_line", src:"./Assets/bet_line.gif"},
        {id:"bet1Button", src:"./Assets/bet1Button.png"},
        {id:"bet10Button", src:"./Assets/bet10Button.png"},
        {id:"bet100Button", src:"./Assets/bet100Button.png"},
        {id:"betMaxButton", src:"./Assets/betMaxButton.png"},
        {id:"blank", src:"./Assets/blank.gif"},
        {id:"cherry", src:"./Assets/cherry.gif"},
        {id:"grapes", src:"./Assets/grapes.gif"},
        {id:"orange", src:"./Assets/orange.gif"},
        {id:"seven", src:"./Assets/seven.gif"},
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
       let centerX = 320;
       let centerY = 240;
       
       //background image
       slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X,Config.Screen.CENTER_Y,true);
       stage.addChild(slotMachineBackground);

       //spin button
       spinBotton = new UIObjects.Button("spinButton",Config.Screen.CENTER_X+135,Config.Screen.CENTER_Y+176,true);
       stage.addChild(spinBotton);
       spinBotton.on("click", ()=>{
        console.log("Clicked Spin Button");
       });

       //bet1 button
       bet1Button = new UIObjects.Button("bet1Button",Config.Screen.CENTER_X-135,Config.Screen.CENTER_Y+176,true);
       stage.addChild(bet1Button);
       bet1Button.on("click", ()=>{
        console.log("Clicked Bet1 Button");
       });
       
       //bet10 button
       bet10Button = new UIObjects.Button("bet10Button",Config.Screen.CENTER_X-67.5,Config.Screen.CENTER_Y+176,true);
       stage.addChild(bet10Button);
       bet10Button.on("click", ()=>{
        console.log("Clicked Bet10 Button");
       });

       //bet100 button
       bet100Button = new UIObjects.Button("bet100Button",Config.Screen.CENTER_X,Config.Screen.CENTER_Y+176,true);
       stage.addChild(bet100Button);
       bet100Button.on("click", ()=>{
           console.log("Clicked Bet100 Button");
       });
       
       //betMax button
       betMaxButton = new UIObjects.Button("betMaxButton",Config.Screen.CENTER_X+67.5,Config.Screen.CENTER_Y+176,true);
       stage.addChild(betMaxButton);
       betMaxButton.on("click", ()=>{
        console.log("Clicked BetMax Button");
       });

       //jackpot label
       jackpotLabel = new UIObjects.Label("999999999","20px","Consoles","#FF0000",Config.Screen.CENTER_X,68,true);
       stage.addChild(jackpotLabel);
       
       //credits label
       creditLabel = new UIObjects.Label("999999999","20px","Consoles","#FFFFFF",Config.Screen.CENTER_X-95,351,true);
       stage.addChild(creditLabel);

       //winnings label
       winningLabel = new UIObjects.Label("999999999","20px","Consoles","#FFFFFF",Config.Screen.CENTER_X+95,351,true);
       stage.addChild(winningLabel);
       
       //bet label
       winningLabel = new UIObjects.Label("99999","20px","Consoles","#FFFFFF",Config.Screen.CENTER_X,351,true);
       stage.addChild(winningLabel);
    }

    window.addEventListener("load",Preload);

})();