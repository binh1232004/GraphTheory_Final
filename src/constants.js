const WIDTH = 1008;
const HEIGHT = 624;

const CELLSIZE = 8;
const BLOCKWIDTH = CELLSIZE * 2;

const BGCOLOR = '#110b3c';
const NUMROWS = HEIGHT / BLOCKWIDTH;
const NUMCOLS = WIDTH / BLOCKWIDTH;
//39 rows and 63 cols

const DIRECTIONS = {
    NORTH: 0,//   0 
    SOUTH: 2,// 3 * 1 
    EAST: 1,//    2   
    WEST: 3,
}
export default {
  WIDTH,
  HEIGHT,
  BGCOLOR,
  CELLSIZE,
  BLOCKWIDTH,
  NUMROWS,
  NUMCOLS,
  DIRECTIONS,
};
