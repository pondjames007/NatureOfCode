
let particles = [];
let planets = [];

function setup() {
    createCanvas(400, 400);
    for(let i = 0; i < 10; i++){
      particles.push(new Particle());
    }

    planets.push(new Planet(100,100));
    planets.push(new Planet(100,300));
    planets.push(new Planet(300,100));
    planets.push(new Planet(300,300));

    //background(0);
}

function draw() {
    background(0);
    for(let i = 0; i < planets.length; i++){
        planets[i].show();
    }
    // for(planet of planets){
    //     planet.show();
    // }
    for(let i = 0; i < particles.length; i++){
        for(let j = 0; j < planets.length; j++){
            particles[i].attracted(planets[j]);
        }
        particles[i].update();
        particles[i].checkEdge();
        particles[i].show();
    }
}

function mousePressed(){
    planets.push(new Planet(mouseX, mouseY));
}
