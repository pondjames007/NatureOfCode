let style;
let styleData;
let contentImg;
let styleChosen;
let canvas = document.createElement("canvas");
            canvas.width = 640;
            canvas.height = 640;
            canvas.id = "baseImage";
let count = 0;

function setup(){
    let a = createCanvas(640, 640);

    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
    
        if(msg.message == "image"){
            contentImg = msg.element;
            var div = document.createElement('div');
            div.innerHTML = msg.element;

            loadImage(div.firstChild.src, (img)=>{
                image(img, 0, 0);
                saveCanvas(a, "content", "jpg");
                console.log("done");             
            });
            
        }
        
    });



}


