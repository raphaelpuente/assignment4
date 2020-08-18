(function () {
    var stage;
    var helloLabel;
    var clickButton;
    var assets;
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
        var canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        console.log("App started...");
        stage.enableMouseOver(20);
        Main();
    }
    function Update() {
        stage.update();
    }
    function Main() {
        helloLabel = new createjs.Text("Hello world", "40px Consolas", "#000000");
        helloLabel.regX = helloLabel.getMeasuredWidth() * 0.5;
        helloLabel.regY = helloLabel.getMeasuredHeight() * 0.5;
        helloLabel.x = 320;
        helloLabel.y = 240;
        stage.addChild(helloLabel);
        //buton
        clickButton = new createjs.Bitmap("/Assets/button.png");
        clickButton.regX = clickButton.getBounds().height * 0.5;
        clickButton.regY = clickButton.getBounds().width * 0.5;
        clickButton.x = 320;
        clickButton.y = 350;
        stage.addChild(clickButton);
        clickButton.on("click", function () {
            helloLabel.text = "Adios, mundo cruel!";
            helloLabel.regX = helloLabel.getMeasuredWidth() * 0.5;
            helloLabel.regY = helloLabel.getMeasuredHeight() * 0.5;
        });
        clickButton.on("mouseover", function () {
            clickButton.alpha = 0.7;
        });
        clickButton.on("mouseover", function () {
            clickButton.alpha = 1.0;
        });
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map