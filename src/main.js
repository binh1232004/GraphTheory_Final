import Draw from "./draw";
import CNS from "./constants";
import MazeGenerator from "./generator";


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const draw = new Draw(canvas, ctx);
canvas.width = CNS.WIDTH;
canvas.height = CNS.HEIGHT;
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("generate").addEventListener("click", generateMaze);
    document.getElementById("randomize").addEventListener("click", randomizeStartAndEnd);

    generateMaze();
})

let intervalId;
let graph;
let minSpanTree;


let searchAlgorithm = {searching: 0};
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

}

function randomizeStartAndEnd(){
    if(searchAlgorithm.searching) 
        return;

    const randomNodes = function randomNodes(){
        //pick random 1 value in arrray n
        const pick = n => n[Math.floor(Math.random() * n.length)];
        //Get the arrary of pos(x, y) in MST
        const nodes = Object.keys(minSpanTree); 
        let choiceOne, choiceTwo;
        while(choiceOne === choiceTwo){
            choiceOne = pick(nodes.slice(0, 50);
            //Slice(1 val) = beginning with amount of val
            choiceTwo = pick(nodes.slice(1250));

        }
        // [(x, y), (z, t)]
        return [choiceOne, choiceTwo];
    };




        if(minSpanTree.progress === CNS.PROGRESS){
            [start, end] = randomNodes();
            ctx.putImageData(graph._image, 0, 0);
            draw.drawEnds([start, end]);
        }
    
}
