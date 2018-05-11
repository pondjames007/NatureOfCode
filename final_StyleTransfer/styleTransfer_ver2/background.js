let style;
let styleData = chrome.extension.getURL("styledata/scream");;
let contentImg;
let styleChosen;
let count = 0;
let styleBase;




chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
    if(msg.message == "style"){
        styleData = msg.styleData;   
    }
    if(msg.message == "image"){
        console.log(styleData);
        styleBase = new ml5.StyleTransfer(styleData, ()=>{
            console.log("model loaded!")
            chrome.tabs.captureVisibleTab((screenshot)=>{
                let imgPos = msg.imgPos;
                //console.log(window.width)
                let base = new Image();
                base.src = screenshot;
                console.log(base);
                base.onload = ()=>{
                    let canvas = document.createElement("canvas");
                    canvas.width = imgPos.width;
                    canvas.height = imgPos.height;
                    
        
                    let context = canvas.getContext('2d');
                    context.drawImage(base, imgPos.x*2, imgPos.y*2, imgPos.width*2, imgPos.height*2, 0, 0, imgPos.width, imgPos.height);
        
                    let dataURL = canvas.toDataURL();
                    // debugger;
                    let output = new Image(imgPos.width, imgPos.height) 
                    output.src = dataURL;
                    output.onload = ()=>{
                        
                        // debugger;
                        let style = styleBase.transfer(output);
        
                        sendResponse({url: style.src});
                    }
        
                    
                };
    
                
            });
        });
        
    }
   return true; 
});




// function setup(){
//     let a = createCanvas(640, 640);

//     chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
    
//         if(msg.message == "image"){
            
//             contentImg = msg.element;
//             var div = document.createElement('div');
//             div.innerHTML = msg.element;

//             loadImage(div.firstChild.src, (img)=>{
//                 image(img, 0, 0);
//                 saveCanvas(a, "content", "jpg");
//                 console.log("done");             
//             });
            
//         }
        
//     });



// }


