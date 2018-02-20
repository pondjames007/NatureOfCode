class EleGroup{
    constructor(x, y, z, r, color){
        this.ele = [];
        let xDim = 5;
        let yDim = 5;
        let zDim = 5;
        for(let i = 0; i < xDim*yDim*zDim; i++){
            this.addEle(x+(i%xDim)*r, y+floor(i/zDim)%yDim*r, z+floor(i/yDim/zDim)*r, r, color);
        }
    }

    addEle(x, y, z, r, color){
        this.ele.push(new Element(x, y, z, r, color));
    }

    show(){
        push()
        //translate(50, 50, 0);
        //rotateX(millis()/1000);
        //rotateZ(millis()/1000);
        rotateY(millis()/1000);
        for(let element of this.ele){
            element.show();
        }
        pop()
    }

    shatter(){
        for(let element of this.ele){
            let force = p5.Vector.random3D();
            force.mult(10);
            element.applyForce(force);
        }
    }

    resume(){
        for(let element of this.ele){
            let force = element.vel.copy();
            force.normalize();
            force.mult(-10);
            element.applyForce(force);
        }
    }

    sphereTrans(){
        for(let element of this.ele){
            let force = element.pos.copy();
            force.normalize();
            force.mult(-5);
            //if()
            element.applyForce(force);
        }
    }

    update(){
        for(let element of this.ele){
            element.update();
        }

    }
}
