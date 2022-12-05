/*
 Bubble Sort implementation.
 For each value in the list, compare the two values.
 If the left side value is greater than the right side swap them so that
 the large value eventually bubbles up to the end of the list.
*/


function bubbleSort(list){
  console.log("Original list", list);
  let swapped;
  //stop swapping early so that we don't go past elements already sorted
  //in the inner loop
  for (let i = list.length; i > 0; i--){
    swapped = false;
    for (let j = 0; j < i-1; j++){
      console.log(j, list);
      if (list[j] > list[j+1]){
        [list[j], list[j+1]] = [list[j+1], list[j]]; //swap the values
        swapped = true;
        console.log("swapped ",j);
      }
    }
    //if (!swapped) break;//break out of looping early if list is sorted
  }
  return list;
}
const unsortedList = [37,45,29,8];
const unsortedList2 = [1,2,3,5,4];

console.log(bubbleSort(unsortedList));   