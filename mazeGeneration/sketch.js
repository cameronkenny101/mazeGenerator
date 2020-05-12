var rows, cols;
var w = 40;
var grid = [];
var current;
var pathFinder;
var route;
var finish;
var stack = [];
var pathStack = [];

function setup() {
  createCanvas(1200, 600);
  cols = floor(width/w);
  rows = floor(height/w);

  for(var j = 0; j < rows; j++) {
    for(var i = 0; i < cols; i++) {
      var cell = new Cell(i,j);
      grid.push(cell);
    }
  }

  current = grid[Math.floor(Math.random() * rows)];
}

function draw() {
  background(250);
  for(var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();

  var next = current.checkNeighbours();
  if(next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;
  } else if(stack.length > 0) {
    current = stack.pop();
  }
  
  
}

function index(i, j) {
  if(i < 0 || j < 0 || i >= cols || j >= rows)
    return -1;
  return i + j * cols;
}

function Cell(i, j) {
   this.i = i;
   this.j = j;
   this.walls = [true, true, true, true];
   this.visited = false;

   this.down = function() {
     var goDown = grid[index(i, j + 1)];
     if(goDown && goDown.noBottomWall()) { 
      return goDown;
       
     }
    }

   this.r = function() {
     var goRight = grid[index(i + 1, j)];
     if(goRight && goRight.noLeftWall())
      return goRight;
   }

   this.noBottomWall = function() {
     if(this.walls[2] == true)
      return false;
     else
      return true;
   }
   this.noLeftWall = function () {
     if(this.walls[1] == true)
      return false;
     else
      return true;
   }

   this.checkNeighbours = function() {
     var neighbours = [];
     var top = grid[index(i, j - 1)];
     var right = grid[index(i + 1, j)];
     var bottom = grid[index(i, j + 1)];
     var left = grid[index(i - 1, j)];

      if(top &&!top.visited)
        neighbours.push(top);
      if(right && !right.visited)
        neighbours.push(right);
      if(bottom && !bottom.visited)
        neighbours.push(bottom);
      if(left && !left.visited)
        neighbours.push(left);

      if(neighbours.length > 0) {
        var r = floor(random(0, neighbours.length));
        return neighbours[r];
      }
   }
   this.highlight = function() {
     fill(0, 0, 150, 100);
   }

   this.path = function () {
     var x = this.i*w;
     var y = this.j*w;
     fill(0, 0, 0, 40);
     rect(x, y, w, w)
   }

   this.show = function() {
     var x = this.i*w;
     var y = this.j*w;
     stroke(0);
     strokeWeight(2);
     if(this.walls[0])
      line(x, y, x+w, y);
     if(this.walls[1])
      line(x+w, y, x+w, y+w);
     if(this.walls[2])
      line(x+w, y+ w, x, y+w);
     if(this.walls[3])
      line(x, y + w, x, y);

      if(this.visited) {
        noStroke();
        fill(100, 255, 250, 100);
        rect(x, y, w, w);
      }
     
   }
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if(x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if(x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if(y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if(y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

