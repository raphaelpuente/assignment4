(function(){

    let stage: createjs.Stage;
    let helloLabel: createjs.Text;
    let clickButton: createjs.Bitmap;

    function Start():void
    {
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick",Update);

        console.log("App started...");

        stage.enableMouseOver(20);

        Main();
    }

    function Update():void
    {
        
        
        stage.update();
    }
 

    function Main():void
    {
        helloLabel = new createjs.Text("Hello world","40px Consolas","#000000");
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

        clickButton.on("click", ()=>{
            helloLabel.text = "Adios, mundo cruel!";
            helloLabel.regX = helloLabel.getMeasuredWidth() * 0.5;
            helloLabel.regY = helloLabel.getMeasuredHeight() * 0.5;
        });

        clickButton.on("mouseover", ()=>{
            clickButton.alpha = 0.7;
        });

        clickButton.on("mouseover", ()=>{
            clickButton.alpha = 1.0;
        });   
    }

    window.addEventListener("load",Start);

})();