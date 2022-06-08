// Each square is it's own object
function Tile(x, y, num) {
  this.x = x;
  this.y = y;
  this.number = num;
}

Tile.prototype.show = function () {
  push();
  fill(200);
  stroke(180);
  strokeWeight(15);
  rect(this.x, this.y, boxSize, boxSize);
  pop();

  // Squares with a non-zero number are overlayed over the board
  if (this.number > 0) {
    // Overlayed rectangle
    push();
    noStroke();
    fill(240- (this.number - 1) * 12, 240, 240); // Larger number = more yellow
    rect(this.x + 7, this.y + 7, boxSize - 15, boxSize - 15);
    pop();

    textAlign(CENTER);
    textSize(40);
    textStyle(BOLD);
    text(this.number, this.x + 50, this.y + 60);
  }
};

Tile.prototype.contains = function (x, y) {
  return x > this.x && x < this.x + boxSize && y > this.y && y < this.y + boxSize;
};
