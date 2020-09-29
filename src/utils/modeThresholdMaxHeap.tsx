interface ModeThreshold {
  value: number;
  n: number;
}

export class MaxHeap {
  heap: ModeThreshold[];

  constructor() {
    /* Initialing the array heap and adding a dummy element at index 0 */
    this.heap = [{ value: 0, n: 0 }];
  }

  getMax() {
    /* Accessing the max element at index 1 in the heap array */
    return this.heap[1].value;
  }

  insert(value: number, n: number) {
    const elem: ModeThreshold = {
      value: value,
      n: n,
    };
    /* Inserting the new node at the end of the heap array */
    this.heap.push(elem);

    /* Finding the correct position for the new node */

    if (this.heap.length > 1) {
      let current = this.heap.length - 1; //last inserted element
      let parent = Math.floor(current / 2); //its parent

      /* Traversing up the parent node until the current node (current) is greater than the parent (current/2)*/
      while (current > 1 && this.heap[parent].n < this.heap[current].n) {
        /* Swapping the two nodes*/
        const aux = this.heap[parent];
        this.heap[parent] = this.heap[current];
        this.heap[current] = aux;

        current = Math.floor(current / 2);
        parent = Math.floor(current / 2);
      }
    }
  }
}
