
let groups = [];
let flag = false;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let ring = [
      {
          pos: createVector(-1100,0,0),
          color: color(62, 118, 236)
      },
      {
          pos: createVector(0,0,0),
          color: color(0, 0, 0)
      },
      {
          pos: createVector(1100,0,0),
          color: color(255, 0, 0)
      },
      {
          pos: createVector(-550,550,0),
          color: color(255, 206, 1)
      },
      {
          pos: createVector(550,550,0),
          color: color(23, 154, 19)
      }
  ]

  for(let j = 0; j < 5; j ++){
      for(let i = 0; i < 12; i++){
        groups.push(new EleGroup(ring[j].pos.x + 500*sin(TWO_PI*i/12), ring[j].pos.y + 500*cos(TWO_PI*i/12), 0, 10, ring[j].color));

      }
  }

}

function draw() {
    background(100);
    translate(0, 0, -2000);
    for(let group of groups){
        group.show();
        group.update();
    }
}

function keyPressed(){
    if(key == " "){
        flag = !flag;
        for(let group of groups){
            if(flag == true){
                group.shatter();
            }
            else{
                group.resume();
                //group.sphereTrans();
            }
        }
    }
}
