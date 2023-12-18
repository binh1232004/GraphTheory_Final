import CNS from "./constants";
class Graph{
    constructor(){
        this._collection = [];//Include Nodes
    }
    /*
     source: string "x, y"
     target: string "x, y"
     pathData: array2D, 
        index: string (position of start node)
        value: array2D ([[Edge relavant to that node: Edge,
                          End Node: Node]])
     draw: draw
    */
    static reconstructPath(source, target, pathData, draw){
        let predecessor = target;
        //draw a new path from target to source with new color when complete searching
        while(predecessor !== source){
            draw.drawPath(pathData[predecessor], "solution", true);
            const [[leadingNode, previousNode]] = pathData[predecessor];
            predecessor = previousNode;
        }
        this._searching = 0; //used for file dijkstra, reset search = 0 == "no search"
        draw.drawEnds([source, target]);

    }

}
class Node{
    constructor(_x, _y){
        //Transform grid in mattrix into pixel in canvas;
        this._x = _x * CNS.BLOCKWIDTH;
        this._y = _y * CNS.BLOCKWIDTH;
        //neighbors include Edge (nodeStart, nodeEnd, weight), 4 directions : NEWS
        this._neighbors = [];//max neighbor is 4 which is edge
        this._visited = false;
        this._discovered = false;
    }
}
class Edge{
    //Math.random() = [0, 1)
    constructor(nodeFrom , nodeTo, weight = Math.random()){
        this._nodeFrom = nodeFrom;
        this._nodeTo = nodeTo;
        this._weight = weight; // 0 <= weight < 1
    }
}
export {Graph, Node, Edge};
