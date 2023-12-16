import Draw from "./draw";
import {Graph,Node, Edge} from "./graph";
import CNS from "./constants";

class MazeGenerator{
    constructor(canvas){
        this._ctx = canvas.getContext("2d");
        this._draw = new Draw(canvas, this._ctx);

        //undirected _graph to add random edge weight
        this._graph = new Graph();


        //frontier to contain neighbors of current cell
        this._frontier = [];
        


        //tree is a subset of adjaceny list
        //Key: node id, value: arrays of neighbors
        this._tree = {};
        this._image;
    }


    setupGrid(){
        //Initialize Grid in Graph
        //With 2457 nodes

        const graph = this._graph;
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
                     new Edge(graph._collection[r + 1][c], graph._collection[r][c],
                       graph._collection[r][c]._neighbors[CNS.DIRECTIONS.SOUTH]._weight);
                }

                if(c !== CNS.NUMCOLS - 1){
                    graph._collection[r][c]._neighbors[CNS.DIRECTIONS.EAST] = 
                     new Edge(graph._collection[r][c], graph._collection[r][c+1]);

                    graph._collection[r][c+1]._neighbors[CNS.DIRECTIONS.WEST] = 
                     new Edge(graph._collection[r][c + 1], graph._collection[r][c],
                      graph._collection[r][c]._neighbors[CNS.DIRECTIONS.EAST]._weight);
                }
            }
        }
    }



    prims(){
        let newEdge = new Edge(null, null, 1);
        
        for(let i = 0; i < this._frontier.length; i++){
            //Have if statement bellow to pop edge have two node discovered
            if(this._frontier[i]._nodeFrom._discovered && this._frontier[i]._nodeTo._discovered)
                this._frontier.splice(i, 1);
            else if(this._frontier[i]._weight < newEdge._weight && !this._frontier[i]._nodeTo._discovered)
                newEdge = this._frontier[i];

        }
        newEdge._nodeTo._discovered = true;
       Object.values(CNS.DIRECTIONS).forEach((direction) => { 
           // If neighbors of nodeTo exist
            if(
             (newEdge._nodeTo._neighbors[direction] !== undefined) &&
             (!newEdge._nodeTo._neighbors[direction]._nodeTo._discovered)
             )
                this._frontier.push(newEdge._nodeTo._neighbors[direction]);
    });


        const currentPos = `${newEdge._nodeFrom._x}, ${newEdge._nodeFrom._y}`;
            
        const nextPos = `${newEdge._nodeTo._x}, ${newEdge._nodeTo._y}`;


    
    //Tree include {posNodeX: [edge, nodeY]}
        //  .--.
        //  |
        //  |
        //  .

        if(this._tree[currentPos] === undefined)
            this._tree[currentPos] = [[newEdge, newEdge._nodeTo]];
        else
            this._tree[currentPos].push([newEdge, newEdge._nodeTo]);
    
    
        if(this._tree[nextPos] === undefined)
            this._tree[nextPos] = [[newEdge, newEdge._nodeFrom]];
        else
            this._tree[nextPos].push([newEdge, newEdge._nodeFrom]);
    
    
        let colorStep = (Object.keys(this._tree).length / CNS.PROGRESS);
        //colorStep is mutiple of 0.05
        //toward the end it will be greaner.
        colorStep = (Math.ceil(colorStep * 20) / 20).toFixed(2);
    
        // This is the reason why having BLOCKWIDTH
        // Each turn in Prim will draw two cell include node and edge
        this._draw.drawEdge(newEdge, colorStep);
        this._draw.drawNode(newEdge._nodeTo, colorStep);
    }
    

    

    //Node-Edge-Node-...-Node
    build(){
        //discovered = true dang o Vmst, discovered = false V
        const firstNode = this._graph._collection[0][0];
        this._graph._collection[0][0]._discovered = true;
        //It will spare one cell size for the last edge
        this._draw.drawNode(firstNode, null, CNS.PRIMSCOLORS[0.00]);

        //Push first neighbor edge of top left corner node
        this._frontier.push(this._graph._collection[0][0]._neighbors[CNS.DIRECTIONS.SOUTH]);
        this._frontier.push(this._graph._collection[0][0]._neighbors[CNS.DIRECTIONS.EAST]);
        

        //Tracking 
        this._tree.progress = 0;
        const time = 0;
        const self = this;
        //It will loop for 2456 that is the exact loop for Prim alogirthm to remove V from Vmst 
        const timer = setInterval(function(){
            self.prims();
            self._tree.progress += 1;
            //set time of Interval == 0 so that it can run as fast as the application in the web can
            if( self._tree.progress === CNS.PROGRESS){
                //Stop Interval not delete ID of Interval
                clearInterval(timer);
                //get the information of data of canvas size (x, y, width ,height)
                self._image = self._ctx.getImageData(0, 0, CNS.WIDTH, CNS.HEIGHT);
                //DOMHelper.buttonColorFill();
            }

    }, 0);
    //Return the id of that Interval
        return timer;
    }
}
export default MazeGenerator;
