// Game will be represented by a 2D Array
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

// Randomize position of 2 pieces upon game start
function newGame() {
  let positions = makeOptionsArray(2);

  for (let n = 0; n < positions.length; n++) {
    grid[positions[n][0]][positions[n][1]].number = 2;
  }
}

function makeOptionsArray(num) {
  let options = [];
  let result = [];

  // Options is an array that stores the index of each sq.
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].number == 0) {
        options.push([i, j]);
      }
    }
  }

  for (let n = 0; n < num; n++) {
    // Selects two squares
    let index = floor(random(options.length));
    let choice = options[index];
    let i = choice[0];
    let j = choice[1];
    // Deletes that spot so it's no longer an option
    options.splice(index, 1);
    // Adds the choice to the result
    result.push([i, j]);
  }
  return result;
}

function newPiece() {
  emptySpot = makeOptionsArray(1);
  grid[emptySpot[0][0]][emptySpot[0][1]].number = 2;
}

function slideTilesUp() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      currTile = grid[i][j];

      if (currTile.number > 0 && j > 0) {
        // Sliding only occurs on non-blank tiles that are not on the edge
        distFromEdge = 0;
        for (let h = j; h > 0; h--) {
          // Setting a tile's distance from the edge in # of squares
          distFromEdge++;
        }

        distFromClosestTile = 0;
        // Setting a tile's distance from the closest tile
        for (let h = 1; h < distFromEdge + 1; h++) {
          if (grid[i][j - h].number > 0) {
            distFromClosestTile = h;
            break;
          } else {
            distFromClosestTile = null;
            // Null means there is no adjacent tile
          }
        }

        if (distFromClosestTile == null) {
          // Open column
          grid[i][j - distFromEdge].number = currTile.number;
          currTile.number = 0;
        }

        if (currTile.number == grid[i][j - distFromClosestTile].number) {
          // Combine with nearest tile of the same number
          grid[i][j - distFromClosestTile].number = currTile.number * 2;
          currTile.number = 0;
        } else {
          // If the tiles are different, move it one before
          grid[i][j - distFromClosestTile + 1].number = currTile.number;

          if (distFromClosestTile != 1) {
            currTile.number = 0;
          }
        }
      }
    }
  }
  newPiece();
}

function slideTilesDown() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      currTile = grid[i][j];

      if (currTile.number > 0 && j < 3) {
        // Sliding only occurs on non-blank tiles that are not on the edge
        distFromEdge = 0;
        for (let h = j; h < 3; h++) {
          // Setting a tile's distance from the edge in # of squares
          distFromEdge++;
        }

        distFromClosestTile = 0;
        // Setting a tile's distance from the closest tile
        for (let h = 1; h < distFromEdge + 1; h++) {
          if (grid[i][j + h].number > 0) {
            distFromClosestTile = h;
            break;
          } else {
            distFromClosestTile = null;
            // Null means there is no adjacent tile
          }
        }

        if (distFromClosestTile == null) {
          // Open column
          grid[i][j + distFromEdge].number = currTile.number;
          currTile.number = 0;
        }

        if (currTile.number == grid[i][j + distFromClosestTile].number) {
          // Combine with nearest tile of the same number
          grid[i][j + distFromClosestTile].number = currTile.number * 2;
          currTile.number = 0;
        } else {
          // If the tiles are different, move it one before
          grid[i][j + distFromClosestTile - 1].number = currTile.number;

          if (distFromClosestTile != 1) {
            currTile.number = 0;
          }
        }
      }
    }
  }
  newPiece();
}

function slideTilesLeft() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      currTile = grid[i][j];

      if (currTile.number > 0 && i > 0) {
        // Sliding only occurs on non-blank tiles that are not on the edge
        distFromEdge = 0;
        for (let h = i; h > 0; h--) {
          // Setting a tile's distance from the edge in # of squares
          distFromEdge++;
        }

        distFromClosestTile = 0;
        // Setting a tile's distance from the closest tile
        for (let h = 1; h < distFromEdge + 1; h++) {
          if (grid[i - h][j].number > 0) {
            distFromClosestTile = h;
            break;
          } else {
            distFromClosestTile = null;
            // Null means there is no adjacent tile
          }
        }

        if (distFromClosestTile == null) {
          // Open column
          grid[i - distFromEdge][j].number = currTile.number;
          currTile.number = 0;
        }

        if (currTile.number == grid[i - distFromClosestTile][j].number) {
          // Combine with nearest tile of the same number
          grid[i - distFromClosestTile][j].number = currTile.number * 2;
          currTile.number = 0;
        } else {
          // If the tiles are different, move it one before
          grid[i - distFromClosestTile + 1][j].number = currTile.number;

          if (distFromClosestTile != 1) {
            currTile.number = 0;
          }
        }
      }
    }
  }
  newPiece();
}

function slideTilesRight() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      currTile = grid[i][j];

      if (currTile.number > 0 && i < 3) {
        // Sliding only occurs on non-blank tiles that are not on the edge
        distFromEdge = 0;
        for (let h = i; h < 3; h++) {
          // Setting a tile's distance from the edge in # of squares
          distFromEdge++;
        }

        distFromClosestTile = 0;
        // Setting a tile's distance from the closest tile
        for (let h = 1; h < distFromEdge + 1; h++) {
          if (grid[i + h][j].number > 0) {
            distFromClosestTile = h;
            break;
          } else {
            distFromClosestTile = null;
            // Null means there is no adjacent tile
          }
        }

        if (distFromClosestTile == null) {
          // Open column
          grid[i + distFromEdge][j].number = currTile.number;
          currTile.number = 0;
        }

        if (currTile.number == grid[i + distFromClosestTile][j].number) {
          // Combine with nearest tile of the same number
          grid[i + distFromClosestTile][j].number = currTile.number * 2;
          currTile.number = 0;
        } else {
          // If the tiles are different, move it one before
          grid[i + distFromClosestTile - 1][j].number = currTile.number;

          if (distFromClosestTile != 1) {
            currTile.number = 0;
          }
        }
      }
    }
  }
  newPiece();
}

let grid;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(255);
  grid = make2DArray(4, 4);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // Each square is initiated as object
      grid[i][j] = new Tile(i * boxSize, j * boxSize, 0);
    }
  }

  newGame();
}

function draw() {
  // Grid continuously updated
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

function keyPressed() {
  if (key == "w" || keyCode == UP_ARROW) {
    slideTilesUp();
  }

  if (key == "a" || keyCode == LEFT_ARROW) {
    slideTilesLeft();
  }

  if (key == "s" || keyCode == DOWN_ARROW) {
    slideTilesDown();
  }

  if (key == "d" || keyCode == RIGHT_ARROW) {
    slideTilesRight();
  }
}
