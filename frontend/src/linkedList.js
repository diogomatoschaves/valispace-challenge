/**
 * Created by diogomatoschaves on 30/11/2018.
 */

class Node {
  constructor(value){
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value)
    } else {
      let node = this.root
      while (true) {
        if (value < node.value) {
          if (!node.left) {
            node.left = new Node(value)
            break
          } else {
            node = node.left
          }
        } else {
          if (!node.right) {
            node.right = new Node(value)
            break
          } else {
            node = node.right
          }
        }
      }
    }
  }

  lookup(value) {
    let node = this.root
    while (true) {
      if (value == node.value) {
        return node
      } else if (value < node.value) {
        if (!node.left) {
          return null
        } else {
          node = node.left
        }
      } else {
        if (!node.right) {
          return null
        } else {
          node = node.right
        }
      }
    }
  }
}