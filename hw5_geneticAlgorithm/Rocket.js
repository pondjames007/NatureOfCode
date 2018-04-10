class Rocket {
    constructor(pos, dna) {
        this.pos = pos.copy();
        this.vel = createVector();
        this.acc = createVector();
        this.r = 4;
        this.finishTime = 0;
        this.recordTime = 0;
        this.hitBullet = false;
        this.fitness = 0;
        this.dna = dna;
        this.force = createVector();
    }

    display() {
        //background(255,0,0);
        //let theta = this.velocity.heading() + PI / 2;
        fill(0, 100);
        stroke(0);
        strokeWeight(1);
        push();
        translate(this.pos.x, this.pos.y);
        //rotate(theta);
    
        // Thrusters
        rectMode(CENTER);
        fill(0);
        rect(-this.r / 2, this.r * 2, this.r / 2, this.r);
        rect(this.r / 2, this.r * 2, this.r / 2, this.r);
    
        // Rocket body
        fill(175);
        beginShape(TRIANGLES);
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape();
    
        pop();
    }

    update() {
        this.vel.add(this.force);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.pos.x = constrain(this.pos.x, width*0.1, width*0.9);
        this.pos.y = constrain(this.pos.y, width*0.1, height*0.9);
    }

    applyForce(f) {
        this.acc.add(f);
    }
    
    run() {
        if (this.hitBullet == false) {
          //this.applyForce(this.force);
          this.update();
          this.display();
        }
        
    }

    checkTarget(bullets){
        if(this.hitBullet == false){
            for(let bullet of bullets){
                let d = dist(this.pos.x, this.pos.y, bullet.pos.x, bullet.pos.y);
                let force = p5.Vector.sub(this.pos, bullet.pos);
                force.normalize();
                force.setMag(this.dna.genes/d*0.01);
                this.force.add(force);
                if(d <= this.r + bullet.r){
                    this.hitBullet = true;
                }
                
            }
            
            this.finishTime++;
        }
        
    }

    calcFitness(elapseTime) {

        // Reward finishing faster and getting close
        this.fitness = (1 / (elapseTime - this.finishTime + 1));

        // Make the function exponential
        this.fitness = pow(this.fitness, 4);

    }

    getFitness(){
        return this.fitness;
    }
    
    getDNA(){
        return this.dna;
    }
  }