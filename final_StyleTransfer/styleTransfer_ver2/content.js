let outputImg;
let styleChosen;
let count = 0;
let target;
let targetPos;
let screenImg;

// add event listener to all the images

document.body.addEventListener("click", (e)=>{
    console.log(e);
    
    if(e.path[1].nodeName == "A"){
        var a = e.path[1];
        if (a.getAttribute('data-did-transfer-style')) {
            return;
        } else {
            a.setAttribute('data-did-transfer-style',true);
        }
        e.stopPropagation();
        e.preventDefault();
        target = e.path[1].firstChild.firstChild.firstChild;
        target.removeAttribute("srcset");
        console.log(target);
        targetPos = target.getBoundingClientRect();
        console.log(targetPos);
        let windowSize = {width: window.innerWidth, height: window.innerHeight}
        console.log(windowSize);
        chrome.runtime.sendMessage({message: "image", element: target.outerHTML, imgPos: targetPos, windowSize: windowSize}, function(message){
            console.log(message);
            target.src=message.url;
        });

    }
    if(e.target.className == "_si7dy"){
        e.stopPropagation();
        target = e.target.parentElement.firstChild.firstChild;
        console.log(target);
        target.removeAttribute("srcset");
        targetPos = target.getBoundingClientRect();
        console.log(targetPos);
        let windowSize = {width: window.innerWidth, height: window.innerHeight}
        console.log(windowSize);
        chrome.runtime.sendMessage({message: "image", element: target.outerHTML, imgPos: targetPos, windowSize: windowSize}, function(message){
            console.log(message);
            target.src=message.url;
        });

    }
});

// receive data from popup
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){

    if(msg.message == "dotransfer"){
        console.log(target);

        target.src = msg.url;

    }

});


