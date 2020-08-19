(function () {
    //#region - objects
    //stage, assets and game objects
    var stage;
    var assets;
    var slotMachineBackground;
    var leftReel;
    var middleReel;
    var rightReel;
    var betLine;
    //buttons
    var spinButton;
    var bet1Button;
    var bet10Button;
    var bet100Button;
    var betMaxButton;
    var clearButton;
    var quitButton;
    //labels
    var jackpotLabel;
    var creditLabel;
    var winningLabel;
    var betLabel;
    var winMessage;
    var lossMessage;
    var turnsLabel;
    var winRatioLabel;
    //#endregion
    //#region - symbols
    var grapes = 0;
    var bananas = 0;
    var oranges = 0;
    var cherries = 0;
    var bars = 0;
    var bells = 0;
    var sevens = 0;
    var blanks = 0;
    //#endregion
    //#region - variables for the slot machine
    var playerMoney = 1000;
    var winnings = 0;
    var jackpot = 5000;
    var turn = 0;
    var playerBet = 0;
    var winNumber = 0;
    var lossNumber = 0;
    var spinResult;
    var fruits = "";
    var winRatio = 0;
    //#endregion
    //#region - manifest
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
        { id: "spinButton", src: "./Assets/spinButton.png" },
        { id: "clearButton", src: "./Assets/clearButton.png" },
        { id: "quitButton", src: "./Assets/quitButton.png" }
    ];
    //#endregion
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
    function resetFruitTally() {
        //this function resets fruit tallies
        grapes = 0;
        bananas = 0;
        oranges = 0;
        cherries = 0;
        bars = 0;
        bells = 0;
        sevens = 0;
        blanks = 0;
    }
    function resetAll() {
        //this function resets the player stats
        playerMoney = 1000;
        winnings = 0;
        jackpot = 5000;
        turn = 0;
        playerBet = 0;
        winNumber = 0;
        lossNumber = 0;
        winRatio = 0;
        stage.removeChild(winMessage);
        stage.removeChild(lossMessage);
        stage.removeChild(turnsLabel);
        stage.removeChild(winRatioLabel);
        stage.removeChild(creditLabel);
        stage.removeChild(betLabel);
        stage.removeChild(winningLabel);
    }
    function checkJackPot() {
        /* compare two random values */
        var jackPotTry = Math.floor(Math.random() * 51 + 1);
        var jackPotWin = Math.floor(Math.random() * 51 + 1);
        if (jackPotTry == jackPotWin) {
            alert("You Won the $" + jackpot + " Jackpot!!");
            playerMoney += jackpot;
            jackpot = 1000;
        }
    }
    function showWinMessage() {
        playerMoney += winnings;
        stage.removeChild(lossMessage);
        stage.removeChild(winMessage);
        winMessage = new UIObjects.Label("You won!", "30px", "Consoles", "#FF0000", Config.Screen.CENTER_X + 250, Config.Screen.CENTER_Y, true);
        stage.addChild(winMessage);
        resetFruitTally();
        checkJackPot();
    }
    function showLossMessage() {
        playerMoney -= playerBet;
        stage.removeChild(lossMessage);
        stage.removeChild(winMessage);
        lossMessage = new UIObjects.Label("You lost!", "30px", "Consoles", "#FF0000", Config.Screen.CENTER_X + 250, Config.Screen.CENTER_Y, true);
        stage.addChild(lossMessage);
        resetFruitTally();
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
    function determineWinnings() {
        if (blanks == 0) {
            if (grapes == 3) {
                winnings = playerBet * 10;
            }
            else if (bananas == 3) {
                winnings = playerBet * 20;
            }
            else if (oranges == 3) {
                winnings = playerBet * 30;
            }
            else if (cherries == 3) {
                winnings = playerBet * 40;
            }
            else if (bars == 3) {
                winnings = playerBet * 50;
            }
            else if (bells == 3) {
                winnings = playerBet * 75;
            }
            else if (sevens == 3) {
                winnings = playerBet * 100;
            }
            else if (grapes == 2) {
                winnings = playerBet * 2;
            }
            else if (bananas == 2) {
                winnings = playerBet * 2;
            }
            else if (oranges == 2) {
                winnings = playerBet * 3;
            }
            else if (cherries == 2) {
                winnings = playerBet * 4;
            }
            else if (bars == 2) {
                winnings = playerBet * 5;
            }
            else if (bells == 2) {
                winnings = playerBet * 10;
            }
            else if (sevens == 2) {
                winnings = playerBet * 20;
            }
            else if (sevens == 1) {
                winnings = playerBet * 5;
            }
            else {
                winnings = playerBet * 1;
            }
            winNumber++;
            showWinMessage();
        }
        else {
            lossNumber++;
            showLossMessage();
        }
    }
    function buildInterface() {
        //background image
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true);
        stage.addChild(slotMachineBackground);
        //spin button
        spinButton = new UIObjects.Button("spinButton", Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinButton);
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
        //clear button
        clearButton = new UIObjects.Button("clearButton", Config.Screen.CENTER_X - 128, Config.Screen.CENTER_Y - 185, true);
        stage.addChild(clearButton);
        //clear button
        quitButton = new UIObjects.Button("quitButton", Config.Screen.CENTER_X + 128, Config.Screen.CENTER_Y - 185, true);
        stage.addChild(quitButton);
        //jackpot label
        jackpotLabel = new UIObjects.Label(jackpot.toString(), "20px", "Consoles", "#FF0000", Config.Screen.CENTER_X, 68, true);
        stage.addChild(jackpotLabel);
        //credits label
        creditLabel = new UIObjects.Label(playerMoney.toString(), "20px", "Consoles", "#FFFFFF", Config.Screen.CENTER_X - 95, 351, true);
        stage.addChild(creditLabel);
        //winnings label
        winningLabel = new UIObjects.Label(winnings.toString(), "20px", "Consoles", "#FFFFFF", Config.Screen.CENTER_X + 95, 351, true);
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
        bet1Button.on("click", function (Update) {
            stage.removeChild(betLabel);
            playerBet = 1;
            console.log(playerBet);
            betLabel = new UIObjects.Label(playerBet.toString(), "20px", "Consoles", "#FFFFFF", Config.Screen.CENTER_X, 351, true);
            stage.addChild(betLabel);
        });
        bet10Button.on("click", function (Update) {
            stage.removeChild(betLabel);
            playerBet = 10;
            console.log(playerBet);
            betLabel = new UIObjects.Label(playerBet.toString(), "20px", "Consoles", "#FFFFFF", Config.Screen.CENTER_X, 351, true);
            stage.addChild(betLabel);
        });
        bet100Button.on("click", function (Update) {
            stage.removeChild(betLabel);
            playerBet = 100;
            console.log(playerBet);
            betLabel = new UIObjects.Label(playerBet.toString(), "20px", "Consoles", "#FFFFFF", Config.Screen.CENTER_X, 351, true);
            stage.addChild(betLabel);
        });
        betMaxButton.on("click", function (Update) {
            stage.removeChild(betLabel);
            playerBet = playerMoney;
            console.log(playerBet);
            betLabel = new UIObjects.Label(playerBet.toString(), "20px", "Consoles", "#FFFFFF", Config.Screen.CENTER_X, 351, true);
            stage.addChild(betLabel);
        });
        clearButton.on("click", function () {
            resetAll();
            alert("You reseted the game!");
            creditLabel = new UIObjects.Label(playerMoney.toString(), "20px", "Consoles", "#FFFFFF", Config.Screen.CENTER_X - 95, 351, true);
            stage.addChild(creditLabel);
            winningLabel = new UIObjects.Label(winnings.toString(), "20px", "Consoles", "#FFFFFF", Config.Screen.CENTER_X + 95, 351, true);
            stage.addChild(winningLabel);
        });
        quitButton.on("click", function () {
            if (confirm("Do you want to close the game?")) {
                window.close();
            }
            else {
                console.log("The game was about to be closed, but my friend here decided to keep on playing!");
            }
        });
        spinButton.on("click", function (Update) {
            var reels = Reels();
            leftReel.image = assets.getResult(reels[0]);
            middleReel.image = assets.getResult(reels[1]);
            rightReel.image = assets.getResult(reels[2]);
            //updating the credit Label
            stage.removeChild(creditLabel);
            creditLabel = new UIObjects.Label(playerMoney.toString(), "20px", "Consoles", "#FFFFFF", Config.Screen.CENTER_X - 95, 351, true);
            stage.addChild(creditLabel);
            stage.removeChild(winningLabel);
            winningLabel = new UIObjects.Label(winnings.toString(), "20px", "Consoles", "#FFFFFF", Config.Screen.CENTER_X + 95, 351, true);
            stage.addChild(winningLabel);
            //updating the turns label
            stage.removeChild(turnsLabel);
            turnsLabel = new UIObjects.Label("Turn: " + turn, "20px", "Consoles", "#000000", Config.Screen.CENTER_X + 230, Config.Screen.CENTER_Y + 25, true);
            stage.addChild(turnsLabel);
            //updating the winratio label
            stage.removeChild(winRatioLabel);
            winRatioLabel = new UIObjects.Label("Ratio: " + (winRatio * 100).toFixed(2) + "%", "20px", "Consoles", "#000000", Config.Screen.CENTER_X + 255, Config.Screen.CENTER_Y + 50, true);
            stage.addChild(winRatioLabel);
            if (playerMoney == 0) {
                if (confirm("You ran out of Money! \nDo you want to play again?")) {
                    resetAll();
                }
            }
            else if (playerBet > playerMoney) {
                alert("You don't have enough Money to place that bet.");
            }
            else if (playerBet < 0) {
                alert("All bets must be a positive $ amount.");
            }
            else if (playerBet <= playerMoney) {
                spinResult = Reels();
                determineWinnings();
                turn++;
            }
            else {
                alert("Please enter a valid bet amount");
            }
        });
    }
    function Main() {
        buildInterface();
        interfaceLogic();
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map