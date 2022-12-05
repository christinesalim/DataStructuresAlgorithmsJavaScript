/*
Binary Heap
  Max binary heap: every child is smaller than the parent node. Top has
    the largest node.
  Min binary heap: every child is larger than the parent node. Top has the
    smallest heap.
  Each parent has at most two nodes
  No guarantees of ordering between siblings; left child doesn't have to be less than
    right child as in a BST
  Binary heap is as compact as possible; cannot have a lop sided tree
  Unlike a binary search tree, the right child is not always greater.
*/

//[41, 39, 33, 18, 27, 12, 55]
// 0   1   2   3   4   5    6

/*
              41
         39         33
      18    27   12    55
*/

class MaxBinaryHeap {
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

  insert(elem){
    this.values.push(elem);
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
    while (idx > 0 && parentElem < elem){
      //swap the parent and child elements
      this.values[idx] = parentElem;
      this.values[parentIdx] = elem;

      //Get the new parent for the new position of the child element
      idx = parentIdx;
      parentIdx = this.getParentIndex(idx);
      parentElem = this.values[parentIdx];
    }
    console.log(this.values);
  }

  /*
    extractMax()
    Remove the root node
    Insert the the last element at the root position
    Update the tree to maintain max heap property
      Make the element sink down to the correct spot by swapping
      it with its larger child.
  */
  extractMax(){
    //Heap is empty 
    if (!this.values.length) return null;

    //max node to return
    const max = this.values[0]; //get the first element
    //Replace root element with the last element
    const last = this.values.pop();
    //If there are more elements in the heap
    if (this.values.length) {
      //Put the last element at the root and fix the heap
      this.values[0] = last;
      //Sink the root value to the correct position for the heap
      this.sinkDown();
    }

    return max;
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
      let swapIdx = null;

      //If indices are valid get the element at that index
      if (leftIdx < length){
        leftChild = this.values[leftIdx];

        //Since this is a valid node, check if we need to swap it with elem
        if (leftChild > elem){
          swapIdx = leftIdx;
        }
      }
      if (rightIdx < length){
        rightChild = this.values[rightIdx];

        //If we also have a right node, is it greater than elem or
        //is it greater than the leftChild which is greater than elem
        //If the leftNode is at the right position, swapIdx is null
        if ((!swapIdx && rightChild > elem ) ||
            (swapIdx && rightChild > leftChild)){
          swapIdx = rightIdx;
        }
      }

      //no swaps done; heap has correct structure
      if (!swapIdx) break;

      //need to swap
      [this.values[swapIdx], this.values[idx]] = [this.values[idx], this.values[swapIdx]];
      idx = swapIdx; //update the new position of elem
    }


  }

}

let heap = new MaxBinaryHeap();
heap.setValues([41, 39, 32, 18, 27, 12]);
heap.insert(55);
heap.insert(33);
heap.insert(1);
heap.insert(199);

heap.setValues([55,39, 41, 18, 27, 12, 33]);
//console.log(heap);

console.log(`Max val: ${heap.extractMax()}`);
console.log(heap);
console.log(`Max val: ${heap.extractMax()}`);
console.log(`Max val: ${heap.extractMax()}`);
console.log(`Max val: ${heap.extractMax()}`);
console.log(`Max val: ${heap.extractMax()}`);
console.log(`Max val: ${heap.extractMax()}`);
console.log(`Max val: ${heap.extractMax()}`);
console.log(`Max val: ${heap.extractMax()}`);
console.log(heap);