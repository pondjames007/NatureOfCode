class Obstacles{
    constructor(){
        this.pos = createVector(width, height-50);
        this.vel = createVector(random(-1,-4), 0);
        this.type = floor(random(2));
        this.size = p5.Vector.random2D().mult(40);
        this.angle = 0;
        this.color = color(random(255), random(255), random(255));
    }

    update(){
        this.pos.add(this.vel);
        this.pos.x = constrain(this.pos.x, width*0.2, width);
    }

    show(){
        push()
        fill(this.color);
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        if(this.type == 0){
            rectMode(CENTER);
            rect(0, 0, this.size.x, this.size.y);
        }
        else{
            ellipseMode(CENTER);
            ellipse(0, 0, this.size.x, this.size.y);
        }
        pop()
        this.angle += 0.2;
    }
}
