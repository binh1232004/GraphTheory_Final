import Draw from "./draw";
import CNS from "./constants";
import MazeGenerator from "./generator";



const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const draw = new Draw(canvas, ctx);
canvas.width = CNS.WIDTH;
canvas.height = CNS.HEIGHT;
document.addEventListener("DOMContentLoaded", () => {
    generateMaze();
})

let intervalId;

function generateMaze(){
    ctx.fillStyle = CNS.BGCOLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // x: The x-coordinate of the top-left corner of the rectangle.
    // y: The y-coordinate of the top-left corner of the rectangle.
    // width: The width of the rectangle.
    // height: The height of the rectangle.
    clearInterval(intervalId);
  // The clearInterval() function takes one argument: the timer ID returned by the setInterval() function to stop the setInterval repeating 

    const doPrim = function doPrims(){
        const maze = new MazeGenerator();
    }



}

