class Particle{
    constructor(){
        this.pos = createVector(random(400), random(400));
        this.prev = this.pos;
        this.track = [];
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
    }

    update(){
        //this.vel.add(noise(this.acc.x), noise(this.acc.y));
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
        this.acc.mult(0);
    }

    show(){
        // Draw Everything (put background in setup())
        // stroke(255, 20);
        // strokeWeight(2);
        //line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

        // this.prev.x = this.pos.x;
        // this.prev.y = this.pos.y;
        //this.prev = this.pos;


        // Draw a part of track
        //this.track.push(this.pos); // it is not working
        this.track.push(createVector(this.pos.x, this.pos.y));
        stroke(255, 20);
        fill(255, 30);
        beginShape()
        for(let i = 0; i < this.track.length; i++){
            vertex(this.track[i].x, this.track[i].y);
        }
        endShape()
        if(this.track.length > 200){
            this.track.shift();
        }

        // for(let i = 1; i < this.track.length; i++){
        //     stroke(255, 100 - (this.track.length - i));
        //     strokeWeight(2);
        //     line(this.track[i].x, this.track[i].y, this.track[i-1].x, this.track[i-1].y);
        // }
        // if(this.track.length > 100){
        //     this.track.shift();
        // }
    }

    attracted(planet){
        let dir = p5.Vector.sub(planet.pos, this.pos);
        let dist = dir.mag();
        dist = constrain(dist, 5, 500);
        let G = 5;
        let force = G * (1 + planet.mass) / (dist * dist);
        if(planet.isAttract == false)
           dir.mult(-1);
        dir.setMag(force);
        //console.log(dir.mag());
        this.acc.add(dir);
    }

    checkEdge(){
        if(this.pos.x == 0 || this.pos.x == width){
            if(this.vel.mag() > 5)
                this.vel.setMag(this.vel.mag()/2);
            this.vel.x *= -1;
        }

        if(this.pos.y == 0 || this.pos.y == height){
            if(this.vel.mag() > 5)
                this.vel.setMag(this.vel.mag()/2);
            this.vel.y *= -1;
        }
    }
}
