import Draw from "./draw";
import CNS from "./constants";
import MazeGenerator from "./generator";
import Dijkstra from './dijkstra';
import "../web/style.css";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const draw = new Draw(canvas, ctx);
//SIZE of canvas
canvas.width = CNS.WIDTH;
canvas.height = CNS.HEIGHT;
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("generate").addEventListener("click", generateMaze);
    document.getElementById("randomize").addEventListener("click", randomizeStartAndEnd);
    document.getElementById("search-nav").addEventListener('click', doSearch);
    generateMaze();
})

let intervalId;
let graph;
let minSpanTree;

function generateMaze(){
    ctx.fillStyle = CNS.BGCOLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // x: The x-coordinate of the top-left corner of the rectangle.
    // y: The y-coordinate of the top-left corner of the rectangle.
    // width: The width of the rectangle.
    // height: The height of the rectangle.
    // clear Interval for each reps, cancel the last attempt to auto-click generate for not = CNS.PROGRESS
    clearInterval(intervalId);

    const doPrim = function doPrims(){
        const maze = new MazeGenerator(canvas);
        maze.setupGrid();
        const timerId = maze.build();
        graph = maze;
        minSpanTree = maze._tree;
        return timerId;
    };
    intervalId = doPrim();
    [start, end] = [null, null];
    searchAlgorithm._searching = 0;

}
// when `randomize` is not called, use top-left & bottom-right corners as start & end points


function randomizeStartAndEnd(){
    if(searchAlgorithm._searching) 
        return;

    const randomNodes = function randomNodes(){
        //pick random 1 value in arrray n
        const pick = n => n[Math.floor(Math.random() * n.length)];
        //Get the arrary of pos(x, y) in MST
        //minSpanTree == _tree (file MazeGenerator)
        //nodes = ["x, y", "z, t"]
        const nodes = Object.keys(minSpanTree); 
        let choiceOne, choiceTwo;
        while(choiceOne === choiceTwo){
            choiceOne = pick(nodes.slice(0, 50));
            //Slice(1 val) = beginning with amount of val
            choiceTwo = pick(nodes.slice(1250));

        }
        // [(x, y), (z, t)]
        return [choiceOne, choiceTwo];
    };




        if(minSpanTree.progress === CNS.PROGRESS){
            [start, end] = randomNodes();
            //Fix add multi random start and end
            ctx.putImageData(graph._image, 0, 0);
            draw.drawEnds([start, end]);
        }
    
}

//string "x, y" which is position of that node
let start, end;
const searchTypes = {
    dijkstra: Dijkstra,
};
let searchAlgorithm = { _searching: 0 };





function defaultStartAndEnd() {
    start = "0, 0";
    //Because origin is top-left
    end = `${CNS.WIDTH - CNS.BLOCKWIDTH}, ${CNS.HEIGHT - CNS.BLOCKWIDTH}`;
}
  
function drawStartAndEnd() {
    //generateMaze() assign start,  end == null
    // if user not click randomize but click traversal, start and end = default
    if (!start || !end)
        defaultStartAndEnd();
    draw.drawEnds([start, end]);
}
function resetSearch() {
    clearInterval(intervalId);
    Object.keys(minSpanTree).forEach((position) => {
      if (minSpanTree[position].length !== undefined) {
        //MST [edge, nodeTo]
        minSpanTree[position].forEach(n => n[1]._visited = false);
      }
    });
  }


function doSearch(event){
    const id = event.target.id; 
    if(id === "search-nav")
        return;
    //If that graph is complete
    if (graph._image) {
        //Reset maze when none searching 
        ctx.putImageData(graph._image, 0, 0);
        draw.resetState();
        drawStartAndEnd();
        resetSearch();
    
        searchAlgorithm = new searchTypes[id](
          minSpanTree,
          start,
          end,
          draw,
        );

        //Method in searchAlgorithm: dijkstra
        intervalId = searchAlgorithm.search();
      }
}
