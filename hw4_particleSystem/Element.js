class Element{
    constructor(x, y, z, r, color){
        this.pos = createVector(x, y, z);
        this.vel = createVector();
        this.acc = createVector();
        this.r = r;
        this.orig = createVector(x, y, z);
        this.color = color;
    }

    show(){
        stroke(0);
        //noStroke();
        fill(this.color);
        push()
        translate(this.pos.x, this.pos.y, this.pos.z);
        //rotateX(45);
        //rotateY(45);
        box(this.r);
        pop();
    }

    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.mult(0.95);

    }

    applyForce(force){
        this.acc.add(force);
    }


}
