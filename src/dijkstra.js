import { Graph } from './graph';



const PriorityQueue = require('js-priority-queue');
class Dijkstra{
    /* Graph: MST {"x, y" : [[Edge, node], [Edge, node]]}
       source || target : string "x, y" posNode
       draw: draw
    */
    constructor(graph, source, target, draw) {
        this._graph = graph;
        //Begin with this node
        this._source = source;
        //End with this node
        this._target = target;
        this._draw = draw;
    
        // 1: performing search, 0: waiting to search
        this._searching = 0;
        this._distances = {}; 
        this._previous = {};
        // use a priority queue in which vertices are sorted by their increasing cost (edge weights)
        const compareDistances = (node1, node2) => (
            this._distances[node1] - this._distances[node2]
        );
        //Increasing order in queue
        //When adding value largest will push to the end
        this._priorityQueue = new PriorityQueue({ comparator: compareDistances });
        this._id;
      }


    search(){
        //progress searching
        this._searching = 1;
        const graph = this._graph;
        const source = this._source;
        const distances = this._distances;
        const priorityQueue = this._priorityQueue;
        const previous = this._previous;
        const target = this._target;
        const draw = this._draw;
        distances[source] = 0;
        previous[source] = null;
        priorityQueue.queue(source);
        
        //Graph is MST have structure
        //  'x, y': [[Edge, Node], [Edge, Node],...]
        const timer = setInterval(() =>{
            if(priorityQueue.length){
                const currentNode = priorityQueue.dequeue();
                console.log(currentNode);
                const edgeToCurrentNode = graph[currentNode][0][0];
                this._draw.drawPath([[edgeToCurrentNode, currentNode]], "visit");
                //When starting mark source true
                if(!previous.length) 
                    edgeToCurrentNode._nodeFrom._visited = true;
               edgeToCurrentNode._nodeTo._visited = true;


                const neighbors = graph[currentNode];
                for(let i = 0; i < neighbors.length; i++){
                    //Node 
                    const neighborNode = neighbors[i][1];
                    //Edge
                    const neighborEdge = neighbors[i][0];
                    const neighborKey = `${neighborNode._x}, ${neighborNode._y}`;
                    

                    const distanceToNeighborNode = distances[currentNode] + neighborEdge._weight;
                    
                    if(distances[neighborKey] == undefined || distanceToNeighborNode < distances[neighborKey]){
                        priorityQueue.queue(neighborKey);
                        distances[neighborKey] = distanceToNeighborNode;
                        previous[neighborKey] = [[neighborEdge, currentNode]];
                    }


                    if(neighborKey == target){
                        clearInterval(timer);
                        this._id = "dijkstra";
                        return Graph.reconstructPath.bind(this)(source, target, previous, draw);
                    }
                        
                }
            }
        }, 10)
         

        return timer;
    }

      

}
export default Dijkstra;
