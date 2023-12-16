//Size of canvas
const WIDTH = 1008;
const HEIGHT = 624;
//Size of one block in canvas, one Block contains 2 cell 
const CELLSIZE = 8;
const BLOCKWIDTH = CELLSIZE * 2;

const BGCOLOR = '#110b3c';
const NUMROWS = HEIGHT / BLOCKWIDTH;
const NUMCOLS = WIDTH / BLOCKWIDTH;
//39 rows and 63 cols
const PRIMSCOLORS = {
  0.00: '#f5fff9', 0.05: '#e4feef', 0.10: '#dbf7e7',
  0.15: '#c9fade', 0.20: '#bcf7d6', 0.25: '#b2f6d0',
  0.30: '#a9fcce', 0.35: '#98f5c1', 0.40: '#8effbf',
  0.45: '#82fcb8', 0.50: '#7ffcb7', 0.55: '#66fca7',
  0.60: '#55fb9d', 0.65: '#49ff98', 0.70: '#39f68b',
  0.75: '#38fc8d', 0.80: '#30fb88', 0.85: '#27fb83',
  0.90: '#1cfc7d', 0.95: '#1cfc7d', 1.00: '#1cfc7d',
};
//Color of random 2 node

//When searching is done
const SOLUTIONCOLOR = "#ffe600";//Yellow
//Random first node is yellow
const STARTCOLOR = "#ffe600";//Yellow
//Random second node is red
const ENDCOLOR = "#870741";//Weight Red
//In dijkstra, have visited node. This color display that
const VISITCOLOR = 'rgba(249, 63, 44, 0.92)';//Red



const DIRECTIONS = {
    NORTH: 0,//   0 
    SOUTH: 2,// 3 * 1 
    EAST: 1,//    2   
    WEST: 3,
}

//PROGRESS = 2456 
//Size of edge 
const PROGRESS = ((WIDTH * HEIGHT) / (BLOCKWIDTH ** 2)) - 1;

export default {
  WIDTH,
  HEIGHT,
  BGCOLOR,
  CELLSIZE,
  BLOCKWIDTH,
  NUMROWS,
  NUMCOLS,
  DIRECTIONS,
  PRIMSCOLORS,
  PROGRESS,
  SOLUTIONCOLOR,
  STARTCOLOR,
  ENDCOLOR,
  VISITCOLOR
};


