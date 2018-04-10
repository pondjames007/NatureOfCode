let rocket;
let population;
let bullets = [];
let lifeTime = 500;
let elapseTime = 0;
let mutationRate = 0.02;

function setup() {
    createCanvas(windowWidth, windowHeight);
    pos = createVector(width/2, height-100);
    


    for(let i = 0; i < 200; i++){
        bullets.push(new Particle(random(100, width-100), random(100, height-100)));
    }

    population = new Population(mutationRate, 50);


}

function draw() {
    background(200);
    
    for(let i in bullets){
        bullets[i].update();
        if(bullets[i].pos.x <= -10 || bullets[i].pos.x >= width+10 || bullets[i].pos.y <= -10 || bullets[i].pos.y >= height+10){
            bullets.splice(i, 1);
            bullets.push(new Particle(random(100, width-100), random(100, height-100)));
        }
        else{
            bullets[i].show();
        }
    }

    if(population.isFinished() == true){
        population.calcFitness(elapseTime);
        population.selection();
        population.reproduction();
        elapseTime = 0;
    }
    else{
        population.live(bullets);
        elapseTime++;
    }
    
    // Display some info
  fill(0);
  noStroke();
  text("Generation #: " + population.getGenerations(), 10, 18);
  text("Record time: " + elapseTime, 10, 54);
}


