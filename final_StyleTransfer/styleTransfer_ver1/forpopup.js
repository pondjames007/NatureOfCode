let styleChosen;
let styleData = chrome.extension.getURL("styledata/scream");;
let baseImg = chrome.extension.getURL("styleimages/content.jpg");
let styleBase = new ml5.StyleTransfer(styleData, ()=>{console.log("model loaded!")});

// choose style
let scream = document.getElementById("scream");
scream.src = chrome.extension.getURL("styleimages/scream.jpg");
scream.addEventListener("click", ()=>{
    console.log(scream.src);
    styleChosen = scream.src;
    styleData = chrome.extension.getURL("styledata/scream");
    styleBase = new ml5.StyleTransfer(styleData, ()=>{console.log("model loaded!")});
});

let udnie = document.getElementById("udnie");
udnie.src = chrome.extension.getURL("styleimages/udnie.jpg");
udnie.addEventListener("click", ()=>{
    console.log(udnie.src);
    styleChosen = udnie.src;
    styleData = chrome.extension.getURL("styledata/udnie");
    styleBase = new ml5.StyleTransfer(styleData, ()=>{console.log("model loaded!")});
});

let wave = document.getElementById("wave");
wave.src = chrome.extension.getURL("styleimages/wave.jpg");
wave.addEventListener("click", ()=>{
    console.log(wave.src);
    styleChosen = wave.src;
    styleData = chrome.extension.getURL("styledata/wave");
    styleBase = new ml5.StyleTransfer(styleData, ()=>{console.log("model loaded!")});
});


// decide the style
let button = document.getElementById("submit");
button.addEventListener("click", ()=>{

    let base = new Image();
    base.src = baseImg;
    base.width = 640;
    base.height = 640;

    
    console.log(baseImg);
    let context = document.getElementById("tmp").getContext('2d');
    context.drawImage(base, 0, 0, 640, 640);

    let dataURL = document.getElementById("tmp").toDataURL();

    document.getElementById("input").src = dataURL;
    document.getElementById("base").style.display = "block";

});

button.addEventListener("mouseenter", ()=>{

    let base = new Image();
    base.src = baseImg;
    base.width = 640;
    base.height = 640;

    

    let context = document.getElementById("tmp").getContext('2d');
    context.drawImage(base, 0, 0, 640, 640);

    let dataURL = document.getElementById("tmp").toDataURL();

    document.getElementById("input").src = dataURL;

});


// do style transfer
let transfer = document.getElementById("transfer");
transfer.addEventListener("click", ()=>{
    console.log("transfer");
    let dataURL = document.getElementById("tmp").toDataURL();

    let dataimg = document.getElementById("input")
    let style = styleBase.transfer(dataimg);
    console.log(style);
    document.getElementById("output").href = style.src;
    document.getElementById("transferred").src = style.src;
    document.getElementById("done").style.display = "block";

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "dotransfer", url: style.src});
    });
    
});
