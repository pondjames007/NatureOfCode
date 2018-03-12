class Particle {
    constructor(x, y, px, py, imgPixels) {
        this.pos = createVector(x, y);
        this.vel = createVector(x - px, y - py);
        this.vel.limit(10);
        this.acc = createVector();
        this.maxSpeed = 3;
        this.maxForce = 0.2;
        this.target = this.findTarget(imgPixels);
        //this.target = createVector(512 / 2, 512 / 2);
    }

    show() {
        strokeWeight(3);
        stroke(0);
        point(this.pos.x, this.pos.y);
    }

    update() {
        this.vel.add(this.acc);
        //this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    findTarget(imgPixels) {
        let r = 1;
        let target = createVector();
        while (r <= 512) {
            for (let i = this.pos.y - r; i <= this.pos.y + r; i += r) {
                for (let j = this.pos.x - r; j <= this.pos.x + r; j += r) {
                    if (i >= 0 && i < imgPixels.length && j >= 0 && j < imgPixels.length) {
                        //console.log(i + "  " + j);
                        if (imgPixels[i][j].grayScale != 0 && imgPixels[i][j].isOccupied == false) {
                            target.set(j, i);
                            imgPixels[i][j].isOccupied = true;
                            return target;
                        }

                    }
                }

            }
            r++;
            //console.log(r);
        }

        return target;
    }

    seek() {
        let direction = p5.Vector.sub(this.target, this.pos);
        //direction.setMag(this.maxSpeed);
        let d = direction.mag();

        if (d < 50) {
            let m = map(d, 0, 100, 0, this.maxSpeed);
            direction.setMag(m);
        } else {
            direction.setMag(this.maxSpeed);
        }

        let steer = p5.Vector.sub(direction, this.vel);
        steer.limit(this.maxForce);

        this.applyForce(steer);
    }

}