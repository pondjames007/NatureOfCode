class Spring{
    constructor(a, b, k){
        this.a = a;
        this.b = b;
        this.k = k;
        this.len = 30;
    }

    update(){
        let force = p5.Vector.sub(this.a.pos, this.b.pos);
        let stretch = force.mag() - 30;
        force.normalize();
        let normalForce = createVector(-force.y, force.x);
        normalForce.setMag(0.5);
        
        force.mult(-1 * this.k * stretch);
        this.a.applyForce(force);
        this.b.applyForce(force.mult(-1));

        this.a.applyForce(normalForce);
        this.b.applyForce(normalForce.mult(-1));

    }

    show(){
        stroke(0);
        line(this.a.pos.x, this.a.pos.y, this.b.pos.x, this.b.pos.y);
    }
}
