/*
Priority Queue
  Implemented with a min binary heap. Root element is the smallest
  value and is highest in priority.
  Each element is created with a Node class.
  enqueue() accepts a node and adds it to the piority queue
  dequeue() removes the root node that has the lowest priority
*/


class Node {
  constructor(val, priority){
    this.val = val;
    this.priority = priority;
  }
}


class PriorityQueue {
  values = [];

  setValues(val){
    this.values = val;  
  }

  /*
    Returns the parent index for this child index
  */
  getParentIndex(index){
    return Math.floor((index-1)/2);
  }

  /*
    Create a Node object and insert it into the heap
  */
  enqueue(value, priority){
    const newNode = new Node(value, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  /*
    Bubble up the last value that was newly inserted
    to keep the max value at the root
  */
  bubbleUp(){
    let idx = this.values.length - 1; //last index of array
    const elem = this.values[idx]; 

    //Get the parent element's value
    let parentIdx = this.getParentIndex(idx);
    let parentElem = this.values[parentIdx];

    //Keep bubbling up value until it reaches index 0
    //At index 0, stop the bubbling process
    while (idx > 0 && parentElem.priority > elem.priority){
      //swap the parent and child elements
      this.values[idx] = parentElem;
      this.values[parentIdx] = elem;

      //Get the new parent for the new position of the child element
      idx = parentIdx;
      parentIdx = this.getParentIndex(idx);
      parentElem = this.values[parentIdx];
    }
    
  }

  /*
    dequeue()
    Remove the root node
    Insert the the last element at the root position
    Update the tree to maintain max heap property
      Make the element sink down to the correct spot by swapping
      it with its larger child.
  */
  dequeue(){
    //Heap is empty 
    if (!this.values.length) return null;

    //min node to return
    const min = this.values[0]; //get the first element
    //Replace root element with the last element
    const last = this.values.pop();
    //If there are more elements in the heap
    if (this.values.length) {
      //Put the last element at the root and fix the heap
      this.values[0] = last;
      //Sink the root value to the correct position for the heap
      this.sinkDown();
    }
    //console.log("min: ", min);
    return min;
  }

  /*
    sinkDown()
    Take the current root element and find its correct position in the heap
    by swapping it with its children if it is smaller
  */
  sinkDown(){
    //Sink down the root element to its correct position in the heap   
    let idx = 0;
    let elem = this.values[0];
    const length = this.values.length;
    while (true){
      //Get the child nodes
      let leftIdx = (2 * idx) + 1;
      let rightIdx = (2 * idx) + 2;
      let leftChild = null,
          rightChild = null;
      let swapElemIdx = null;

      //If indices are valid get the element at that index
      if (leftIdx < length){
        leftChild = this.values[leftIdx];
        if (leftChild.priority < elem.priority)
          swapElemIdx = leftIdx;

      }
      if (rightIdx < length){
        rightChild = this.values[rightIdx];
        //Handle two cases: rightChild has higher priority than element or
        //rightChild has higher priority than leftChild from previous swap
        if ((!swapElemIdx && rightChild.priority < elem.priority) || 
            (swapElemIdx && rightChild.priority < leftChild.priority))
        {
          swapElemIdx = rightIdx;
        }
      }

      //if we didn't swap elements exit
      if (swapElemIdx === null) break;

      //Swap elements and update idx to the new position
      [this.values[swapElemIdx], this.values[idx]] = 
          [this.values[idx], this.values[swapElemIdx]];
      idx = swapElemIdx;

    }


  }

}


const ER = new PriorityQueue();
ER.enqueue("common cold", 10);
ER.enqueue("covid", 5);
ER.enqueue("broken bone", 4);
ER.enqueue("gall bladder surgery", 3);
ER.enqueue("car accident", 2);
ER.enqueue("glass in foot", 7);
console.log(ER);

console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());