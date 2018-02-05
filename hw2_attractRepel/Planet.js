class Planet{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.mass = random(2, 10);
        this.isAttract = random() >= 0.5;
    }

    show(){
        if(this.isAttract == true){
            stroke(255,0,0);
        }
        else{
            stroke(0,255,0);
        }
        strokeWeight(this.mass);
        point(this.pos.x, this.pos.y);
    }
}
