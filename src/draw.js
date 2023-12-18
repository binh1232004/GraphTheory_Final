import CNS from "./constants"


class Draw{
    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx = ctx;
        //{"x y z t" : bool (edge)
        // "x | y" : bool (node)}
        this._draw = {};
    }
    resetState() {
        this._draw = {};
    }
   
    /*
      edge: Edge
      colorStep: float (progress of building maze)
      custumColor: string (Hex)
    */
    drawEdge(edge, colorStep){
        this._ctx.fillStyle = CNS.PRIMSCOLORS[colorStep];
        //Mid = (left + right) / 2
        this._ctx.fillRect(
            (edge._nodeFrom._x + edge._nodeTo._x) / 2,
            (edge._nodeFrom._y + edge._nodeTo._y) / 2,
            CNS.CELLSIZE, CNS.CELLSIZE
        );

    }
    /*
     node: Node
     colorStep: float (progress of building maze)
     customColor: color (used to fill color of firstNode)
    */
    drawNode(node, colorStep, customColor){
        //Get the position of that node
        const [x, y] = Draw.destructurePosition(node);
        //color of that node
        this._ctx.fillStyle = customColor || CNS.PRIMSCOLORS[colorStep];
        //Position and size of that node to fill in 
        this._ctx.fillRect(x, y, CNS.CELLSIZE, CNS.CELLSIZE);
    }


    /*
        Parameter: array include ["x, y", "z, t"] pos of node
     */
    drawEnds(nodes){
        //Used to split pos of that node into
        //[[x,y],
        // [z,t]
        // ]
        const startAndEnd = nodes.map(node => node.split(", "));
        const cellSize = [CNS.CELLSIZE * 2, CNS.CELLSIZE* 2];
        


      //  this._ctx.strokeStyle = CNS.SOLUTIONCOLOR;
      //  this._ctx.lineWidth = 2;
       this._ctx.fillStyle = CNS.STARTCOLOR;


        //Can cause bug because startAndEnd value in that is string, but somehow it casting int ?????????
        //... spread operator for the same value
        this._ctx.fillRect(startAndEnd[0][0], startAndEnd[0][1], ...cellSize)


       this._ctx.fillStyle = CNS.ENDCOLOR;
       this._ctx.fillRect(startAndEnd[1][0], startAndEnd[1][1], ...cellSize)


    }
    /*
        Nodes: array [[edge, node]]
            node: string "x, y"
            edge: Edge
        Style: string "visit" or "solution"
        force: bool used to force drawPath
    */
    drawPath(nodes, style, force){
        this._ctx.fillStyle = (style === "visit" ? CNS.VISITCOLOR : CNS.SOLUTIONCOLOR);
        nodes.forEach((node) => {
            //edgeId = "posXnodeFrom posYNodeFrom posXnodeTo posYnodeTo"
            const edgeId = `${node[0]._nodeFrom._x} ${node[0]._nodeFrom._y} ` + 
 `${node[0]._nodeTo._x} ${node[0]._nodeTo._y}`;
            //If not initialized in _draw
            if(!this._draw[edgeId] || force){
               this.drawEdge(node[0]);
                this._draw[edgeId] = true;
            }
            const [x, y] = Draw.destructurePosition(node[1]);
            const nodeId = `${x} | ${y}`;
            //"x | y"
            if(!this._draw[nodeId] || force){
                this._ctx.fillRect(x, y, CNS.CELLSIZE, CNS.CELLSIZE);
                this._draw[nodeId] = true;
            } 
       });
    }
    static destructurePosition(nodePosition){
        //  if bellow used to draw path 
        if(typeof nodePosition === "string")
            return nodePosition.split(", ");
        //get the x, y properties of Node
        return [nodePosition._x, nodePosition._y];
    }
}
export default Draw;    
