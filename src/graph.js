import CNS from "./constants";
class Graph{
    constructor(){
        this._collection = [];
    }
}
class Node{
    constructor(_x, _y){
        //Transform grid in mattrix into pixel in canvas;
        this._x = _x * CNS.BLOCKWIDTH;
        this._y = _y * CNS.BLOCKWIDTH;
        //neighbors include Edge (nodeStart, nodeEnd, weight)
        this._neighbors = [];
    }
}
class Edge{
    constructor(nodeFrom , nodeTo, weight = Math.random()){
        this._nodeFrom = nodeFrom;
        this._nodeTo = nodeTo;
        this._weight = weight; // 0 <= weight < 1
    }
}
export {Graph, Node, Edge};
