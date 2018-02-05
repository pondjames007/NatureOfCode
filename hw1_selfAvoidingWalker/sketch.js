// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walker = [];
let grid = [];

function setup() {
  createCanvas(400, 400);
  //walker = new Walker();
  background(127);
  for(var i = 0; i < width/10; i++){
    grid.push(new Array());
    for(var j = 0; j < height/10; j++){
        grid[i].push(false);
    }
  }
  console.log(grid[0].length);
  console.log(grid.length);
}

function draw() {
  //background(127);
  for(let j = 0; j < walker.length; j++){
    //for (let i = 0; i < 500; i++) {
      grid = walker[j].render(grid);
    	//console.log(walker[j].x+" .  "+walker[j].y);
      walker[j].step(grid);
    //}
  }
}

function mouseClicked(){
 	 walker.push(new Walker());
}