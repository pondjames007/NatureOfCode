class Walker {
  constructor() {
    this.x = floor(mouseX/10);
    this.y = floor(mouseY/10);
    this.color = color(random(255), random(255), random(255));
    // this.pos = createVector(width/2,height/2);
  }

  render(grid) {
    fill(this.color);
    rect(this.x*10, this.y*10, 10, 10);
    grid[this.x][this.y] = true;
    return grid;
  }

  step(grid) {
    let choice = floor(random(4));
    if (choice === 0) {
      this.x++;
      if(this.x < width/10){

          if(grid[this.x][this.y] == true){
            this.x--;
          }

      }
    } else if (choice == 1) {
      this.x--;
      if(this.x > 0){
        if(grid[this.x][this.y] == true){
          this.x++;
        }
      }
    } else if (choice == 2) {
      this.y++;
      if(this.y < height/10){
        if(grid[this.x][this.y] == true){
          this.y--;
        }
      }
    } else {
      this.y--;
      if(this.y > 0){
        if(grid[this.x][this.y] == true){
          this.y++;
        }
      }
    }
    this.x = constrain(this.x, 0, width/10 - 1);
    this.y = constrain(this.y, 0, height/10 - 1);
  }
}