
let cannonAngle;
let projectile;
let projectiles = [];
let gravity;
let origin;
let theta = 0;
let obstacles = [];

function setup(){
    createCanvas(windowWidth, windowHeight);

    cannonAngle = -PI/4;
    gravity = createVector(0, 0.2);
    origin = createVector(width*0.2-62, height*0.3 - 15);

}

function draw(){
    background(220);

    if(frameCount%60 == 0){
        obstacles.push(new Obstacles());
    }
    //draw cliff
    stroke(110);
    fill(110);
    push()
    beginShape()
        fill(110);
        let y = height*0.3;
        while(y < height){
            vertex(width*0.2 + 2*sin(y/5), y);
            y++;
        }
        vertex(0, height);
        vertex(0, height*0.3);
        vertex(width*0.2, height*0.3);

    endShape()
    pop()
    //draw Projectiles
    for(let idx in projectiles){
        let dist = p5.Vector.sub(origin, projectiles[idx].pos);

        if(dist.magSq() > 50*50){
            projectiles[idx].fire = true;
            projectiles[idx].applyGravity();
        }
        projectiles[idx].update();
        projectiles[idx].show();

        if(projectiles[idx].pos.y > height+200){
            projectiles.splice(idx, 1);
        }
    }

    //draw Cannon
    stroke(0);
    fill(0);
    rect(width*0.2-25, height*0.3, -55, -10);
    triangle(width*0.2-70, height*0.3-10, width*0.2-50, height*0.3-10, width*0.2-60, height*0.3-25);
    push()
    translate(width*0.2-62, height*0.3 - 10);
    rotate(cannonAngle);
    rect(0, 5, 50, -20);
    pop()

    if(keyIsDown(UP_ARROW)){
        cannonAngle -= 0.1;
    }
    else if(keyIsDown(DOWN_ARROW)){
        cannonAngle += 0.1;
    }
    cannonAngle = constrain(cannonAngle, -PI, 0);

    //draw obstacles
    push()
    stroke(0);
    for(let idx in obstacles){
        obstacles[idx].update();
        obstacles[idx].show();

        if(obstacles[idx].pos.x <= width*0.2){
            obstacles.splice(idx, 1);
        }
    }
    pop()

    //draw wave
    push()
    fill(51, 51, 153);
    beginShape()
        let x = width*0.2;
        let inc = theta;
        while(x < width){
            vertex(x, height-50+5*sin(TWO_PI/30 + inc));
            x++;
            inc += TWO_PI/300;
        }


        vertex(width, height);
        vertex(width*0.2, height);
    endShape()
    pop()

    theta += 0.1;
}

function keyPressed(){
    if(key == ' '){
        let fire = p5.Vector.fromAngle(cannonAngle);
        fire.setMag(12);
        projectile = random(1)>0.5?new Projectile(width*0.2-60, height*0.3 - 15):new SpringBob(width*0.2-60, height*0.3 - 15);
        projectile.applyForce(fire);
        projectiles.push(projectile);
    }
}
