let mos_raw, plane_raw, bird_raw, drag_raw;
let mosquitos, airplanes, birds, dragons = {};

const THRESH = 800;
const MOSQUITO = 0, AIRPLANE = 1, BIRD = 2, DRAGON = 3;


let nn;

function preload(){
    mos_raw = loadStrings('mosquito.txt');
    plane_raw = loadStrings('airplane.txt');
    bird_raw = loadStrings('bird.txt');
    drag_raw = loadStrings('dragon.txt');
    
}

function setup() {
    // Prepare the data
    mosquitos = prepareData(mos_raw, MOSQUITO);
    airplanes = prepareData(plane_raw, AIRPLANE);
    birds = prepareData(bird_raw, BIRD);
    dragons = prepareData(drag_raw, DRAGON);

    

    let training = [];
    training = training.concat(mosquitos.training);
    training = training.concat(airplanes.training);
    training = training.concat(birds.training);
    training = training.concat(dragons.training);

    let testing = [];
    testing = testing.concat(mosquitos.testing);
    testing = testing.concat(airplanes.testing);
    testing = testing.concat(birds.testing);
    //testing = testing.concat(dragons.testing);
    //console.log(testing);
    
    console.log("Training Data: 800*4")
    console.log("Testing Data: 200*4")

    // Train for 10 epochs
    for(let i = 1; i < 11; i++){
        let nodes = i*50;
        console.log("No. of nodes: " + nodes)
        for(let j = 1; j < 11; j++){
            nn = new NeuralNetwork(784, nodes, 4);
            trainEpoch(training);
            console.log("Epoch " + j + ":");
            // Test the data
            let percent = testAll(testing);
            console.log("% correct: " + percent*100 + "%");
        }
    }
    // createCanvas(400, 400);
    // background(0);
    // let img = createImage(28, 28);
    // img.loadPixels();
    // for(let i = 0; i < 784; i++){
    //     let val = airplanes_testing[0][i];
    //     img.pixels[i*4 + 0] = val;
    //     img.pixels[i*4 + 1] = val;
    //     img.pixels[i*4 + 2] = val;
    //     img.pixels[i*4 + 3] = 255;
        
    // }
    // img.updatePixels();
    // image(img, 200, 200);

    
}

function draw() {

}

function prepareData(data, label){
    let target = {
        "testing": [],
        "training": []
    };
    for(let i = 0; i < data.length; i++){
        if(i < THRESH){
            target.training.push(int(data[i].split(",")));
            target.training[i].label = label;
        }
        else{
            target.testing.push(int(data[i].split(",")));
            target.testing[i - THRESH].label = label;
        }
        
    }

    return target;
}

function trainEpoch(training){
    
    shuffle(training, true);
    // Train for one epoch
    //data = training[0];
    for(let i = 0; i < training.length; i++){
        let data = training[i];
        let inputs = data.map(x => x / 255.0);
        let label = training[i].label;
        let outputs = [0, 0, 0, 0];
        outputs[label] = 1;
        //console.log(outputs);
        nn.train(inputs, outputs);
        // console.log(inputs);
        // console.log(label);
    }


}

function testAll(testing){
    let correct = 0;
    //console.log(testing)
    //let data = testing[0];
    for(let i = 0; i < testing.length; i++){
        let data = testing[i];
        let inputs = data.map(x => x / 255.0);
        let label = testing[i].label;
        
        let guess = nn.predict(inputs);
        //console.log(guess);

        let m = max(guess);
        let classification = guess.indexOf(m);
        //console.log("Guess: " + classification);
        //console.log(label);

        if(classification === label){
            correct++;
            // console.log(i);
            // console.log("Guess: " + classification);
            // console.log(label);
            // console.log(correct);
        }

        // console.log(inputs);
    }
    //console.log(correct);
    //let percent = correct / testing.length;
    
    return correct / testing.length;
}