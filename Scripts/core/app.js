(function () {
    var stage;
    var assets;
    var slotMachineBackground;
    var manifest = [
        { id: "background", src: "./Assets/background.png" },
        { id: "banana", src: "./Assets/banana.png" },
        { id: "bar", src: "./Assets/bar.png" },
        { id: "bell", src: "./Assets/bell.png" },
        { id: "bet_line", src: "./Assets/bet_line.png" },
        { id: "bet1Button", src: "./Assets/bet1Button.png" },
        { id: "bet10Button", src: "./Assets/bet10Button.png" },
        { id: "bet100Button", src: "./Assets/bet100Button.png" },
        { id: "betMaxButton", src: "./Assets/betMaxButton.png" },
        { id: "blank", src: "./Assets/blank.png" },
        { id: "cherry", src: "./Assets/cherry.png" },
        { id: "grapes", src: "./Assets/grapes.png" },
        { id: "orange", src: "./Assets/orange.png" },
        { id: "seven", src: "./Assets/seven.png" },
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
        slotMachineBackground = new Core.GameObject("background", 320, 240, true);
        stage.addChild(slotMachineBackground);
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map