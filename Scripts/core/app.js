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
    //symbols
    var grapes = 0;
    var bananas = 0;
    var oranges = 0;
    var cherries = 0;
    var bars = 0;
    var bells = 0;
    var sevens = 0;
    var blanks = 0;
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
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    function Reels() {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];
        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27): // 41.5% probability
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "grapes";
                    grapes++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "banana";
                    bananas++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "orange";
                    oranges++;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "cherry";
                    cherries++;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "bar";
                    bars++;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "bell";
                    bells++;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "seven";
                    sevens++;
                    break;
            }
        }
        return betLine;
    }
    function buildInterface() {
        //background image
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true);
        stage.addChild(slotMachineBackground);
        //spin button
        spinBotton = new UIObjects.Button("spinButton", Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinBotton);
        //bet1 button
        bet1Button = new UIObjects.Button("bet1Button", Config.Screen.CENTER_X - 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet1Button);
        //bet10 button
        bet10Button = new UIObjects.Button("bet10Button", Config.Screen.CENTER_X - 67.5, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet10Button);
        //bet100 button
        bet100Button = new UIObjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet100Button);
        //betMax button
        betMaxButton = new UIObjects.Button("betMaxButton", Config.Screen.CENTER_X + 67.5, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);
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
    function interfaceLogic() {
        //buttons logic
        spinBotton.on("click", function () {
            var reels = Reels();
            leftReel.image = assets.getResult(reels[0]);
            middleReel.image = assets.getResult(reels[1]);
            rightReel.image = assets.getResult(reels[2]);
        });
        bet1Button.on("click", function () {
            console.log("Clicked Bet1 Button");
        });
        bet10Button.on("click", function () {
            console.log("Clicked Bet10 Button");
        });
        bet100Button.on("click", function () {
            console.log("Clicked Bet100 Button");
        });
        betMaxButton.on("click", function () {
            console.log("Clicked BetMax Button");
        });
    }
    function Main() {
        buildInterface();
        interfaceLogic();
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map