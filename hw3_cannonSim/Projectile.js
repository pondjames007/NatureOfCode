class Projectile{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
        this.mass = random(1,3);
        this.radius = 3*this.mass;
        //this.type = random(3);
    }

    show(){
        stroke(0);
        fill(100);
        push()
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, this.radius*2);
        pop()
    }

    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyGravity(){
        this.acc.add(0,0.2);
    }

    applyForce(force){
        this.acc.add(force.div(this.mass));
    }
}

class SpringBob{
    constructor(x, y){
        this.a = new Projectile(x, y);
        this.b = new Projectile(x-1, y+1);
        this.k = new Spring(this.a, this.b, 0.5);
        this.fire = false;
        this.pos = createVector(x,y);
    }

    show(){
        this.k.show();
        this.a.show();
        this.b.show();
    }

    update(){
        if(this.fire == true){
            this.k.update();
        }
        this.a.update();
        this.b.update();
        // let aPos = p5.Vector.mult(this.a.pos, this.a.mass/(this.a.mass+this.b.mass));
        // let bPos = p5.Vector.mult(this.b.pos, this.b.mass/(this.a.mass+this.b.mass));
        this.pos = this.a.mass > this.b.mass ? this.a.pos:this.b.pos;
    }

    applyForce(force){
        this.a.applyForce(force);
        this.b.applyForce(force);
    }

    applyGravity(){
        this.a.applyGravity();
        this.b.applyGravity();
    }
}
