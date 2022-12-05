/*
  For a Directed Acyclyic Graph (DAG) we can perform a topological sort
  where if there is an edge u->v then u is listed before v in the graph
  traversal.
  The adjacency list determines the edges in the graph. Since it is directed
  the edge only appears once.
  The indegree count is used to remember the number of nodes that lead to
  this node. For courses, this means that each in-degree is a prerequisite
  course that needs to be taken first.
  This function implements Kahn's algorithm to begin traversing the graph
  by starting with nodes that have in-degree 0. These nodes don't have any
  edges coming into them and can be the start nodes. 
    A queue is used to perform BFS traversal; when the queue is empty there
    are no more nodes we can visit
    All nodes with indegree = 0 are added to the queue
    To visit a node, it is removed from the front of the queue
    and is added to the result list.
    Its neighbors are updated to decrement the indegree count since the edge
    to this node is removed from the graph

*/

function performTopologicalSort(numCourses, prerequisites){
    const adjList = buildAdjList(numCourses, prerequisites);
    const inDegreeArr = buildInDegreeCounts(adjList);
    const queue = []; //track all courses with no prereqs
    const topoRes = [];

    //Populate queue with all 0 degree courses (no prereqs)
    for (let i = 0; i < numCourses; i++){
        //ith course has no prereqs
        if (inDegreeArr[i] === 0) queue.push(i);
    }

    //console.log("queue", queue);
    //Traverse in BFS way through courses
    while(queue.length){
        const curr = queue.shift(); //get element from front
        console.log("visited course", curr);
        topoRes.push(curr);
        console.log("topoRes", topoRes);
        //Visit adjacent courses
        const nbrList = adjList[curr];
        //console.log("nbrList", nbrList);
        for(const nbrCrs of nbrList){
            inDegreeArr[nbrCrs]--;
            if (inDegreeArr[nbrCrs] === 0){
                queue.push(nbrCrs); //doesn't have any more prereqs
            }
        }
    }

    //console.log("topoRes", topoRes);
    //check if we visited all courses
    if (topoRes.length === numCourses)
        return true;
    return false;
    
};

const buildAdjList = (n, edges) => {
    //A list of lists: adjList has n elements and each starts with its own empty []
    //const adjList = Array.from({length: n}, ()=> []);
    const adjList = new Array(n).fill(0).map((x)=> [] );
    console.log("adjList init", adjList);
    for (const [dst, src] of edges){
        adjList[src].push(dst);        
    }
    //console.log("adjList", adjList);
    return adjList;
}

const buildInDegreeCounts = (adjList) => {
    const inDegreeArr = new Array(adjList.length).fill(0);
    for (const course of adjList){
        for (const prereq of course){
            //Increment the prereq count that this course needs
            inDegreeArr[prereq]++; 
        }
    }
    //console.log("inDegree", inDegreeArr);
    return inDegreeArr;
}

let numCourses = 2;
let prerequisites = [[1,0]];
console.log(performTopologicalSort(numCourses, prerequisites));

prerequisites = [[1,0],[0,1]];
console.log(performTopologicalSort(numCourses, prerequisites));
