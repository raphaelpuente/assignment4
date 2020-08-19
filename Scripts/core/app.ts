(function(){
    
    //#region - objects
    
        //stage, assets and game objects
        let stage: createjs.Stage;
        let assets: createjs.LoadQueue;
        let slotMachineBackground: Core.GameObject;
        let leftReel: Core.GameObject;
        let middleReel: Core.GameObject;
        let rightReel: Core.GameObject;
        let betLine: Core.GameObject;
        
        //buttons
        let spinButton: UIObjects.Button;
        let bet1Button: UIObjects.Button;
        let bet10Button: UIObjects.Button;
        let bet100Button: UIObjects.Button;
        let betMaxButton: UIObjects.Button;
        let clearButton: UIObjects.Button;
        let quitButton: UIObjects.Button;
        
        //labels
        let jackpotLabel: UIObjects.Label;
        let creditLabel: UIObjects.Label;
        let winningLabel: UIObjects.Label;
        let betLabel: UIObjects.Label;
        let winMessage: UIObjects.Label;
        let lossMessage: UIObjects.Label;
        let turnsLabel: UIObjects.Label;
        let winRatioLabel: UIObjects.Label;

    //#endregion
    
    //#region - symbols
        let grapes = 0;
        let bananas = 0;
        let oranges = 0;
        let cherries = 0;
        let bars = 0;
        let bells = 0;
        let sevens = 0;
        let blanks = 0;
    //#endregion

    //#region - variables for the slot machine
        let playerMoney = 1000;
        let winnings = 0;
        let jackpot = 5000;
        let turn = 0;
        let playerBet = 0;
        let winNumber = 0;
        let lossNumber = 0;
        let spinResult;
        let fruits = "";
        let winRatio = 0;
    //#endregion

    //#region - manifest
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
        {id:"spinButton", src:"./Assets/spinButton.png"},
        {id:"clearButton", src:"./Assets/clearButton.png"},
        {id:"quitButton", src:"./Assets/quitButton.png"}
    ];
    //#endregion

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
 
    function resetFruitTally():void 
    {
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
    
    function resetAll():void
    {
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

    function checkJackPot():void
    {
        /* compare two random values */
        let jackPotTry = Math.floor(Math.random() * 51 + 1);
        let jackPotWin = Math.floor(Math.random() * 51 + 1);
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
        winMessage = new UIObjects.Label("You won!","30px","Consoles","#FF0000",Config.Screen.CENTER_X+250,Config.Screen.CENTER_Y,true);
        stage.addChild(winMessage);
        resetFruitTally();
        checkJackPot();
    }

    function showLossMessage() {
        playerMoney -= playerBet;
        stage.removeChild(lossMessage);
        stage.removeChild(winMessage);
        lossMessage = new UIObjects.Label("You lost!","30px","Consoles","#FF0000",Config.Screen.CENTER_X+250,Config.Screen.CENTER_Y,true);
        stage.addChild(lossMessage);
        resetFruitTally();
    }

    function checkRange(value:number, lowerBounds:number, upperBounds:number):number | boolean {
        if (value >= lowerBounds && value <= upperBounds)
        {
            return value;
        }
        else {
            return !value;
        }
    }
    
    function Reels():string[] {
        let betLine = [" ", " ", " "];
        let outCome = [0, 0, 0];
    
        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27):  // 41.5% probability
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
    
    function determineWinnings()
    {
        if (blanks == 0)
        {
            if (grapes == 3) {
                winnings = playerBet * 10;
            }
            else if(bananas == 3) {
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
        else
        {
            lossNumber++;
            showLossMessage();
        }
        
    }
    
    function buildInterface():void
    {
        //background image
       slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X,Config.Screen.CENTER_Y,true);
       stage.addChild(slotMachineBackground);

       //spin button
       spinButton = new UIObjects.Button("spinButton",Config.Screen.CENTER_X+135,Config.Screen.CENTER_Y+176,true);
       stage.addChild(spinButton);

       //bet1 button
       bet1Button = new UIObjects.Button("bet1Button",Config.Screen.CENTER_X-135,Config.Screen.CENTER_Y+176,true);
       stage.addChild(bet1Button);
       
       //bet10 button
       bet10Button = new UIObjects.Button("bet10Button",Config.Screen.CENTER_X-67.5,Config.Screen.CENTER_Y+176,true);
       stage.addChild(bet10Button);

       //bet100 button
       bet100Button = new UIObjects.Button("bet100Button",Config.Screen.CENTER_X,Config.Screen.CENTER_Y+176,true);
       stage.addChild(bet100Button);
       
       //betMax button
       betMaxButton = new UIObjects.Button("betMaxButton",Config.Screen.CENTER_X+67.5,Config.Screen.CENTER_Y+176,true);
       stage.addChild(betMaxButton);

       //clear button
       clearButton = new UIObjects.Button("clearButton",Config.Screen.CENTER_X-128,Config.Screen.CENTER_Y-185,true);
       stage.addChild(clearButton);
       
       //clear button
       quitButton = new UIObjects.Button("quitButton",Config.Screen.CENTER_X+128,Config.Screen.CENTER_Y-185,true);
       stage.addChild(quitButton);

       //jackpot label
       jackpotLabel = new UIObjects.Label(jackpot.toString(),"20px","Consoles","#FF0000",Config.Screen.CENTER_X,68,true);
       stage.addChild(jackpotLabel);
       
              //credits label
       creditLabel = new UIObjects.Label(playerMoney.toString(),"20px","Consoles","#FFFFFF",Config.Screen.CENTER_X-95,351,true);
       stage.addChild(creditLabel);

       //winnings label
       winningLabel = new UIObjects.Label(winnings.toString(),"20px","Consoles","#FFFFFF",Config.Screen.CENTER_X+95,351,true);
       stage.addChild(winningLabel);
       
       //left reel
       leftReel = new Core.GameObject("bell",Config.Screen.CENTER_X-79,Config.Screen.CENTER_Y-8,true);
       stage.addChild(leftReel);
       
       //middle reel
       middleReel = new Core.GameObject("banana",Config.Screen.CENTER_X-1,Config.Screen.CENTER_Y-8,true);
       stage.addChild(middleReel);

       //right reel
       rightReel = new Core.GameObject("bar",Config.Screen.CENTER_X+77,Config.Screen.CENTER_Y-8,true);
       stage.addChild(rightReel);

       //bet line
       betLine = new Core.GameObject("bet_line",Config.Screen.CENTER_X,Config.Screen.CENTER_Y-13,true);
       stage.addChild(betLine);    
    }

    function interfaceLogic():void
    {
       


        bet1Button.on("click", Update=>{
            stage.removeChild(betLabel);
            playerBet = 1;
            console.log(playerBet);
            betLabel = new UIObjects.Label(playerBet.toString(),"20px","Consoles","#FFFFFF",Config.Screen.CENTER_X,351,true);
            stage.addChild(betLabel);
        });

        bet10Button.on("click", Update=>{
            stage.removeChild(betLabel);
            playerBet = 10;
            console.log(playerBet);
            betLabel = new UIObjects.Label(playerBet.toString(),"20px","Consoles","#FFFFFF",Config.Screen.CENTER_X,351,true);
            stage.addChild(betLabel);
        });

        bet100Button.on("click", Update=>{
            stage.removeChild(betLabel);
            playerBet = 100;
            console.log(playerBet);
            betLabel = new UIObjects.Label(playerBet.toString(),"20px","Consoles","#FFFFFF",Config.Screen.CENTER_X,351,true);
            stage.addChild(betLabel);
        });


        betMaxButton.on("click", Update=>{
            stage.removeChild(betLabel);
            playerBet = playerMoney;
            console.log(playerBet);
            betLabel = new UIObjects.Label(playerBet.toString(),"20px","Consoles","#FFFFFF",Config.Screen.CENTER_X,351,true);
            stage.addChild(betLabel);
        });

        clearButton.on("click", ()=>{
            resetAll();
            alert("You reseted the game!")

            creditLabel = new UIObjects.Label(playerMoney.toString(),"20px","Consoles","#FFFFFF",Config.Screen.CENTER_X-95,351,true);
            stage.addChild(creditLabel);

            winningLabel = new UIObjects.Label(winnings.toString(),"20px","Consoles","#FFFFFF",Config.Screen.CENTER_X+95,351,true);
            stage.addChild(winningLabel);

        });

        quitButton.on("click", ()=>{
            
            if (confirm("Do you want to close the game?"))
            {
                window.close();
            }
            else
            {
                console.log("The game was about to be closed, but my friend here decided to keep on playing!")
            }

        });
    


    
        spinButton.on("click", Update=>{
            let reels = Reels();

            leftReel.image = assets.getResult(reels[0]) as HTMLImageElement;
            middleReel.image = assets.getResult(reels[1]) as HTMLImageElement;
            rightReel.image = assets.getResult(reels[2]) as HTMLImageElement;

            //updating the credit Label
            stage.removeChild(creditLabel);
            creditLabel = new UIObjects.Label(playerMoney.toString(),"20px","Consoles","#FFFFFF",Config.Screen.CENTER_X-95,351,true);
            stage.addChild(creditLabel);
     
            stage.removeChild(winningLabel);
            winningLabel = new UIObjects.Label(winnings.toString(),"20px","Consoles","#FFFFFF",Config.Screen.CENTER_X+95,351,true);
            stage.addChild(winningLabel);

            //updating the turns label
            stage.removeChild(turnsLabel);
            turnsLabel = new UIObjects.Label("Turn: "+turn,"20px","Consoles","#000000",Config.Screen.CENTER_X+230,Config.Screen.CENTER_Y+25,true);
            stage.addChild(turnsLabel);
            
            //updating the winratio label
            stage.removeChild(winRatioLabel);
            winRatioLabel = new UIObjects.Label("Ratio: "+(winRatio * 100).toFixed(2)+"%","20px","Consoles","#000000",Config.Screen.CENTER_X+255,Config.Screen.CENTER_Y+50,true);
            stage.addChild(winRatioLabel);

            if (playerMoney == 0)
            {
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

    function Main():void
    {
        buildInterface();
        interfaceLogic();   
    }

    window.addEventListener("load",Preload);

})();