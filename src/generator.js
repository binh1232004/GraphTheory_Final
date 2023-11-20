import Draw from "./draw";
import {Graph,Node, Edge} from "./graph";
import CNS from "./constants";

class MazeGenerator{
    constructor(canvas){
        this._ctx = canvas.getContext("2d");
        this.draw = new Draw(canvas, this._ctx);

        //undirected graph to add random edge weight
        this.graph = new Graph();



        this.frontier = [];



        this.tree = {};

    }


    setupGrid(){
        //Initialize graph 
        const graph = this.graph;
        for(let r = 0; r < CNS.NUMROWS; r++){
            graph._collection[r] = [];
            for(let c = 0; c < CNS.NUMCOLS; c++){
                graph._collection[r][c] = new Node(c, r);
            }
        }       

        for(let r = 0; r < CNS.NUMROWS; r++){
            for(let c = 0; c < CNS.NUMCOLS; c++){
                if(r !== CNS.NUMROWS - 1){
                    //Assign edge to south directions 
                    //Include nodeStart, nodeEnd and weight of that node
                    graph._collection[r][c]._neighbors[CNS.DIRECTIONS.SOUTH] = 
                     new Edge(graph._collection[r][c], graph._collection[r+1][c]);
                     
                    graph._collection[r+1][c]._neighbors[CNS.DIRECTIONS.NORTH] = 
                     new Edge(graph._collection[r+1][c], graph._collection[r][c],
                       graph._collection[r][c]._neighbors[CNS.DIRECTIONS.SOUTH]._weight);
                }

                if(c !== CNS.NUMCOLS - 1){
                    graph._collection[r][c].neighbors[CNS.DIRECTIONS.EAST] = 
                     new Edge(graph._collection[r][c], graph._collection[r][c+1]);

                    graph._collection[r][c+1].neighbors[CNS.DIRECTIONS.WEST] = 
                     new Edge(graph._collection[r][c+1], graph_collection[r][c],
                      graph._collection[r][c]._neighbors[CNS.DIRECTIONS.EAST]._weight);
                }
            }
        }
    }
}
export default MazeGenerator;
