"use strict";

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}
class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
  }

  isEmpty(){
    if(this.front == null){
      return true;
    }
  }
//1. append to end, 2. append to end can be O(1) with a tail pointer
  enqueue(value){
    let newNode = new Node(value);

    if (this.isEmpty()) {
      this.front = newNode;
    } else{
      this.rear = newNode;
      this.rear.next = newNode;
    }
  }

//1. Go to the end of the list, 2. Put the tail's value in temp, 3. Point the prior node to null, 4. Return temp
  dequeue(){
    let newNode = new Node(value);
    if (this.isEmpty()) {
      this.front = newNode;
    } else {
      let temp = this.front;
    }
  }

  peekQueue(){
    if (this.isEmpty()){
      return;
    }else{
      return this.front.value;
    }
  }
}

module.exports = Queue;
