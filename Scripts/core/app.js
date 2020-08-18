(function () {
    var stage;
    var assets;
    var slotMachineBackground;
    var spinBotton;
    var bet1Button;
    var bet10Button;
    var bet100Button;
    var betMaxButton;
    var jackpotLabel;
    var creditLabel;
    var winningLabel;
    var leftReel;
    var middleReel;
    var rightReel;
    var betLine;
    var manifest = [
        { id: "background", src: "./Assets/background.png" },
        { id: "banana", src: "./Assets/banana.gif" },
        { id: "bar", src: "./Assets/bar.gif" },
        { id: "bell", src: "./Assets/bell.gif" },
        { id: "bet_line", src: "./Assets/bet_line.gif" },
        { id: "bet1Button", src: "./Assets/bet1Button.png" },
        { id: "bet10Button", src: "./Assets/bet10Button.png" },
        { id: "bet100Button", src: "./Assets/bet100Button.png" },
        { id: "betMaxButton", src: "./Assets/betMaxButton.png" },
        { id: "blank", src: "./Assets/blank.gif" },
        { id: "cherry", src: "./Assets/cherry.gif" },
        { id: "grapes", src: "./Assets/grapes.gif" },
        { id: "orange", src: "./Assets/orange.gif" },
        { id: "seven", src: "./Assets/seven.gif" },
        { id: "spinButton", src: "./Assets/spinButton.png" }
    ];
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
        assets.loadManifest(manifest);
    }
    function Start() {
        console.log("App started...");
        var canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        Config.Globals.AssetManifest = assets;
        Main();
    }
    function Update() {
        stage.update();
    }
    function Main() {
        var centerX = 320;
        var centerY = 240;
        //background image
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true);
        stage.addChild(slotMachineBackground);
        //spin button
        spinBotton = new UIObjects.Button("spinButton", Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinBotton);
        spinBotton.on("click", function () {
            console.log("Clicked Spin Button");
        });
        //bet1 button
        bet1Button = new UIObjects.Button("bet1Button", Config.Screen.CENTER_X - 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet1Button);
        bet1Button.on("click", function () {
            console.log("Clicked Bet1 Button");
        });
        //bet10 button
        bet10Button = new UIObjects.Button("bet10Button", Config.Screen.CENTER_X - 67.5, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet10Button);
        bet10Button.on("click", function () {
            console.log("Clicked Bet10 Button");
        });
        //bet100 button
        bet100Button = new UIObjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet100Button);
        bet100Button.on("click", function () {
            console.log("Clicked Bet100 Button");
        });
        //betMax button
        betMaxButton = new UIObjects.Button("betMaxButton", Config.Screen.CENTER_X + 67.5, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);
        betMaxButton.on("click", function () {
            console.log("Clicked BetMax Button");
        });
        //jackpot label
        jackpotLabel = new UIObjects.Label("999999999", "20px", "Consoles", "#FF0000", Config.Screen.CENTER_X, 68, true);
        stage.addChild(jackpotLabel);
        //credits label
        creditLabel = new UIObjects.Label("999999999", "20px", "Consoles", "#FFFFFF", Config.Screen.CENTER_X - 95, 351, true);
        stage.addChild(creditLabel);
        //winnings label
        winningLabel = new UIObjects.Label("999999999", "20px", "Consoles", "#FFFFFF", Config.Screen.CENTER_X + 95, 351, true);
        stage.addChild(winningLabel);
        //bet label
        winningLabel = new UIObjects.Label("99999", "20px", "Consoles", "#FFFFFF", Config.Screen.CENTER_X, 351, true);
        stage.addChild(winningLabel);
        //left reel
        leftReel = new Core.GameObject("bell", Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 8, true);
        stage.addChild(leftReel);
        //middle reel
        middleReel = new Core.GameObject("banana", Config.Screen.CENTER_X - 1, Config.Screen.CENTER_Y - 8, true);
        stage.addChild(middleReel);
        //right reel
        rightReel = new Core.GameObject("bar", Config.Screen.CENTER_X + 77, Config.Screen.CENTER_Y - 8, true);
        stage.addChild(rightReel);
        //bet line
        betLine = new Core.GameObject("bet_line", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 13, true);
        stage.addChild(betLine);
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map