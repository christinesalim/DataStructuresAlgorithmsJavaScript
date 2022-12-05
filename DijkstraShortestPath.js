/*
  Dijkstra's shortest path:
  - Begin with a start node
  - Find the shortest distance to neighbors from the start node. All distances initialized
    to infinity. Calculate the new shortest distance.
  - Update the shortest distance and previous node if we have a path to it that has lower weight
  - Mark the node as visited
  - Repeat the process for all unvisited nodes beginning with the shortest distance

*/

/*
  A simpler version of the PriorityQueue structure which uses an array
  and sorts it by priority each time an element is inserted or removed.
  Because the list is sorted each time the insert and delete operation 
  are O(nLogn). See PriorityQueue.js for a faster O(logN) implementation.
*/
class PriorityQueue{
  values = [];
  /*
    Add an item to the list and sort it by priority
  */
  enqueue(val, priority){
    this.values.push({val, priority});
    this.sort();
  }

  /*
  Sort the values[] array by its priority
  */
  sort(){
    this.values.sort((a, b) => (a.priority - b.priority));
  }

  /*
    Remove the highest priority item
  */
  dequeue(){
    return this.values.shift(); //return first element
  }

}


/*
  Implements a weighted graph where each edge has a weight associated with it.
*/
class WeightedGraph {
  adjacencyList = {};

  addVertex(vertex){
    //Add an empty list of neighbors to the adjacency list
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight){
    this.adjacencyList[vertex1].push({node: vertex2, weight});
    this.adjacencyList[vertex2].push({node: vertex1, weight});
  }

  /*
  DijkstraShortestPath() implements Dijkstra's shortest path alogrithm
  */
  DijkstraShortestPath(start, finish){
    const nodes = new PriorityQueue();
    const previous = {};
    const shortestDistances = {};
    const path = []; //return value of result
    let smallest;

    //Set up the initial state
    //Iterate over vertices in the adjacencyList object and set the
    //distances to other vertices to be infinity; but the start vertex
    //will have distance 0
    for(let vertex in this.adjacencyList){
      if (vertex === start){
        shortestDistances[vertex] = 0;
        //Add vertex and priority of 0 to the priority queue 
        nodes.enqueue(vertex, 0);//highest priority
      } else {
        shortestDistances[vertex] = Infinity;
        //Add vertex and priority of Infinity to the priority queue 
        nodes.enqueue(vertex, Infinity);
      }
      //Initialize the previous node to null
      previous[vertex] = null;
    }

    //Check the priority queue for nodes as long as there are nodes to visit
    while (nodes.values.length){
      //Get the node with the lowest distance from priority queue
      smallest = nodes.dequeue().val;
      //console.log("smallest", smallest);

      if (smallest === finish){
        //We reached the target node so we can stop 
        while (previous[smallest]){
          path.push(smallest);
          smallest = previous[smallest]; //get the next node in path
        }
        console.log("path", path);
        console.log(shortestDistances);
        console.log(previous);
        //Exit from while loop to return result
        break;
      }

      //Iterate over its neighbors
      if (smallest && shortestDistances[smallest] !== Infinity){
        //Visit this node's neighbors
        for (const neighbor of this.adjacencyList[smallest]){
          //console.log(neighbor);

          //Calculate distance to the neighbor from this node
          let candidateDistance = shortestDistances[smallest] +
                                  neighbor.weight;
          //Does the neighbor have a better candidate distance?                                  
          if (candidateDistance < shortestDistances[neighbor.node]){
            //update the distance to this better value
            shortestDistances[neighbor.node] = candidateDistance;

            //Update the previous node to indicate we came from it
            previous[neighbor.node] = smallest;

            //Add the node with the new priority
            nodes.enqueue(neighbor.node, candidateDistance);
          }
          //console.log("nodes", nodes);
        }
      }

    }

    console.log("Path in reverse", path);
    return (path.concat("A").reverse())

  }
}





const graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);

console.log(JSON.stringify(graph));
console.log(graph.DijkstraShortestPath("A", "E"));