let img, orig;
let flowField;
let imgRow = [];
let imgPixels = [];
let particles = [];
let showEdge = false;
let resolution = 16;

function preload() {
    img = loadImage('lena_bin.bmp');
    orig = loadImage('lena.bmp');
}

function setup() {
    let text1 = createP("Keep moving your mouse to add particles!");
    let text2 = createP("Spacebar: show edges");
    let text3 = createP("Enter/Return: refresh canvas");
    text1.position(10, 520);
    text2.position(10, 560);
    text3.position(10, 580);

    createCanvas(512, 512);

    img.loadPixels();
    console.log(img.pixels);

    for (let i = 0; i < img.pixels.length; i += 4) {
        let edge = {
            "grayScale": round(0.2989 * img.pixels[i] + 0.5870 * img.pixels[i + 1] + 0.1140 * img.pixels[i + 2]),
            "isOccupied": false
        }
        if (i % resolution != 0) edge.grayScale = 0;
        imgRow.push(edge);
        if (i != 0 && (i / 4) % 512 == 511) {
            imgPixels.push(imgRow);
            imgRow = [];
        }
    }



    console.log(imgPixels);


}

function draw() {

    if (particles.length < 3000) {
        background(220);
        for (particle of particles) {
            //console.log(particle.target);
            particle.seek();
            particle.update();
            particle.show();
        }

        let cnt = 0;
        if (showEdge == true) {
            for (let i = 0; i < imgPixels.length; i += 1) {
                for (let j = 0; j < imgPixels[i].length; j += 1) {
                    if (imgPixels[i][j].grayScale != 0) {
                        strokeWeight(2)
                        stroke(255, 0, 0);
                        point(j, i);
                        cnt++;
                    }

                }
            }
            console.log("total tagets: " + cnt);
        }
    }

    if (particles.length > 2500) {
        let alpha = map(particles.length, 2500, 3000, 0, 255);
        tint(255, alpha);
        image(orig, 0, 0);

    }
}

function mouseMoved() {
    mouseX = constrain(mouseX, 0, width);
    mouseY = constrain(mouseY, 0, height);
    if (particles.length < 3000) {
        //console.log(mouseX + "  " + mouseY);
        let newParticle = new Particle(mouseX, mouseY, pmouseX, pmouseY, imgPixels);
        if (!newParticle.target.equals(0, 0)) particles.push(newParticle);
        console.log(particles.length);
    }
}

function keyPressed() {
    if (key == ' ') {
        showEdge = !showEdge;
    }
    if (keyCode == RETURN || keyCode == ENTER) {

        particles = [];
        clear();
        if (showEdge == true) showEdge = false;
    }

}