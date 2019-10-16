let grid;
let dfGrid = 16;
let opacity;
let container = document.getElementById("container");
let clear = document.getElementById("clear");
let newGrid = document.getElementById("newGrid");
let black = document.getElementById("black");
let colorful = document.getElementById("colorful");
let shader = document.getElementById("shader");


createGrid(dfGrid);
clear.addEventListener("click", clearGrid);
newGrid.addEventListener("click", changeGrid);
black.addEventListener("click", e => {
  changeBrush(1)
});
colorful.addEventListener("click", e => {
  changeBrush(2)
});
shader.addEventListener("click", e => {
  changeBrush(3)
});


function createGrid(dim) {
  for (var i = 0; i < dim * dim; i++) {

    grid = document.createElement("div");
    grid.classList.add("grid");
    grid.style.width = 480 / dim + "px";
    grid.style.height = 480 / dim + "px";
    grid.style.float = "left";
    grid.style.boxShadow = "0px 0px 0px 1px black inset";
    grid.style.opacity = 1;
    container.appendChild(grid);
    changeBrush(2);
  }
}


function changeToBlack() {
  this.style.backgroundColor = "black";
}

function changeToShader() {

  opacity = Number(this.style.opacity);
  if (this.style.backgroundColor !== "black") {
    this.style.opacity = 0.1;
    this.style.background = "black";
  }
  if (opacity < 1) {
    this.style.opacity = opacity + 0.1;
  }
}


function changeToColorful() {

  var a = Math.random() * 256;
  var b = Math.random() * 256;
  var c = Math.random() * 256;
  this.style.backgroundColor = "rgb(" + a + "," + b + "," + c + ")";

}

function clearGrid() {

  const squares = document.querySelectorAll(".grid");
  squares.forEach(grid => {
    grid.style.background = "white";
    grid.style.opacity = 1;
  });
}


function changeGrid() {
  let number = prompt("enter a number between 1-64", 16);
  if (number >= 1 && number <= 64) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    createGrid(number);
  } else {
    alert("it's not a valid number");
    changeGrid();
  }
}


function changeBrush(brushType) {

  const grids = document.querySelectorAll(".grid");
  grids.forEach ( grid => {
    grid.removeEventListener("mouseover", changeToBlack);
    grid.removeEventListener("mouseover", changeToColorful);
    grid.removeEventListener("mouseover", changeToShader);

    switch (brushType) {
      case 1:
        grid.addEventListener("mouseover", changeToBlack);
        break;
      case 2:
        grid.addEventListener("mouseover", changeToColorful);
        break;
      case 3:
        grid.addEventListener("mouseover", changeToShader);
        break;
      default:
        console.log("Not a valid bursh type");
        return;
        break;
    }
  });
}
