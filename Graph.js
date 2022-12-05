/* Graph.js
  - Implements the Graph data structure. 
  - Stores neighbors in an adjacency list 
  - Implements graph traversal algorithms: breadth first and depth first
*/

class Graph {
  constructor(){
    this.adjacencyList = {};
  }

  //Adds a vertex to the adjacency list
  addVertex (vertex){
    if (!this.adjacencyList[vertex])
      this.adjacencyList[vertex] = [];
    else
      throw new Error("Vertex already exists");
  }


  //Add an edge between two vertices
  addEdge (vertex1, vertex2){
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]){
      throw Error ("Invalid vertices provided");
    }    
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  //Remove an edge
  removeEdge (vertex1, vertex2){
    if (!this.adjacencyList[vertex1].includes(vertex2) ||
        !this.adjacencyList[vertex2].includes(vertex1)){
      throw new Error("Invalid vertices provided");
    }
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter (
      v => v !== vertex2);

    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter (
      v => v !== vertex1);
  }

  //Remove a vertex
  removeVertex(vertex){
    if (!this.adjacencyList[vertex])
      throw new Error(`Invalid vertex ${vertex}`);
    
    //Remove all edges connected to this vertex
    for (const v in this.adjacencyList[vertex]){
      this.removeEdge(vertex, v);
    }
    //Remove the vertex
    delete this.adjacencyList[vertex];
    
  }

  //DFS traversal of graph
  /*
    dfs_recursive(vertex):
      Create a result [] to hold each visited vertex
      Create a visited object to mark which vertices we visited
      
      In a helper dfs function:
        //Base case  
        If vertex is empty return

        //Recursive case
        Add vertex to the results list
        Mark this vertex as visited so we don't visit it again
        For each vertex in its adjacency list:
            If it hasn't been visited call dfs() on the neighbor
  */

  dfs_recursive = (vertex) => { 
    const result = [];
    const visited = {};
    
    console.log(this);    
    const dfs_helper = (v) => {
      
      //No vertex case
      if (!v) return null;
      //Mark this vertex as visited
      visited[v] = true;
      result.push(v);

      //Visit its neighbors if they haven't been visited
      this.adjacencyList[v].forEach( nbr => {
        //console.log(nbr);
        if (!visited[nbr]){
          return dfs_helper(nbr);
        }
      });
     
    }
    dfs_helper(vertex);
    return result;
  }  


  /*
    dfs_iterative(vertex)
      Create a stack(array) to track each vertex we need to visit
      Create a results array and a visited array
      Add the vertex to the stack and mark it as visited
      while the stack is not empty:
        Pop it off the stack and it it to results
        For each neighbor that is not visited:
          Mark it as visited
          Add each neighbor to the stack     
      return results array
  */

  dfs_iterative(vertex){
    if (!vertex) return vertex;
    const stack = [];
    const results = [];
    const visited = [];

    stack.push(vertex);
    visited[vertex] = true;

    while (stack.length){
      console.log(stack, results);
      const v = stack.pop();
      results.push(v);

      this.adjacencyList[v].forEach( nbr => {
        if (!visited[nbr]){
          visited[nbr] = true;
          stack.push(nbr);
        }
      });      
    }
    return results;
  }

  

  /*
    Breadth first traversal
    - If the vertex is empty return
    - Create result array and visited array to mark which vertex was visited
    - Create a queue to store each node to visit
    - Add the first vertex to the queue and mark it as visited
    - While the queue has items:
        - Get the first vertex in the queue and add it to result array
        - Add each neighbor that was not visited to the queue and mark
          it as visited
    - Return the result array
  */
  bfs_iterative (vertex){
    if (!vertex) return vertex;
    const result = [],
          visited = [],
          queue = [];
    
    queue.push(vertex);
    visited[vertex] = true;
    while (queue.length){
      const currVertex = queue.shift(); //get first item in queue
      result.push(currVertex);
      console.log(result);
      this.adjacencyList[currVertex].forEach(nbr => {
        if (!visited[nbr]){
          queue.push(nbr);
          visited[nbr] = true;
        }
      });
    }
    return result;
  }

}


let g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");

//Recursive dfs traversal of graph starting at A
res = g.dfs_recursive("A");
console.log(`DFS Recursive: ${res}`);

res = g.dfs_iterative("A");
console.log(`DFS iterative: ${res}`);

res = g.bfs_iterative("A");
console.log(`BFS iterative: ${res}`);
