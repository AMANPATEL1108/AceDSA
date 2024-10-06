# Linked Lists

A **Linked List** is a linear data structure in which elements (nodes) are stored in a non-contiguous memory location. Each node points to the next node using a reference, making it a dynamic and efficient way to manage collections of data that frequently grow or shrink.

Unlike arrays, where elements are stored in contiguous memory locations, linked lists allow for easy insertion and deletion without reallocation or reorganization of the entire structure.

## Table of Contents
1. [Basic Concepts](#basic-concepts)
2. [Types of Linked Lists](#types-of-linked-lists)
3. [Linked List Operations](#linked-list-operations)
4. [Advantages and Disadvantages](#advantages-and-disadvantages)
5. [Common Variants of Linked Lists](#common-variants-of-linked-lists)
6. [Implementation in JavaScript](#implementation-in-javascript)
7. [Common Problems](#common-problems)
8. [Time Complexity](#time-complexity)
9. [Practice Problems](#practice-problems)
10. [Further Reading](#further-reading)

## Basic Concepts

A **Linked List** is made up of nodes. Each node consists of two parts:

1. **Data**: The actual value or data of the node.
2. **Next**: A reference or pointer to the next node in the list.

```plaintext
[data|next] -> [data|next] -> [data|next] -> null
```

### Key Terms:
- **Head**: The first node of the list.
- **Tail**: The last node of the list, whose `next` is `null`.
- **Null**: Represents the end of the linked list.

### Example Visualization

```plaintext
Head -> [10|next] -> [20|next] -> [30|null]
```

## Types of Linked Lists

### 1. **Singly Linked List**
   In a singly linked list, each node points only to the next node.

   ```plaintext
   Head -> [10|next] -> [20|next] -> [30|null]
   ```

### 2. **Doubly Linked List**
   In a doubly linked list, each node has two pointers: one to the next node and one to the previous node.

   ```plaintext
   null <- [prev|10|next] <-> [prev|20|next] <-> [prev|30|next] -> null
   ```

### 3. **Circular Linked List**
   In a circular linked list, the last node points back to the first node, forming a loop.

   ```plaintext
   [10|next] -> [20|next] -> [30|next] --+
       ^                                 |
       +---------------------------------+
   ```

### 4. **Doubly Circular Linked List**
   Similar to a circular linked list, but nodes also have a reference to the previous node, forming a bidirectional loop.

   ```plaintext
   null <- [prev|10|next] <-> [prev|20|next] <-> [prev|30|next] --+
          ^                                                    |
          +----------------------------------------------------+
   ```

## Linked List Operations

### 1. **Insertion**
   - **At the Head**: Add a new node at the beginning of the list.
   - **At the Tail**: Add a new node at the end of the list.
   - **At a Given Position**: Insert a node at a specific position in the list.

### 2. **Deletion**
   - **From the Head**: Remove the first node.
   - **From the Tail**: Remove the last node.
   - **From a Given Position**: Remove a node from a specific position in the list.

### 3. **Traversal**
   Traversal means visiting each node in the linked list, starting from the head and continuing until reaching the end of the list (or a condition is met).

### 4. **Searching**
   Involves finding a node with a particular value by traversing through the list.

### 5. **Reversing**
   Changing the direction of the links such that the last node becomes the head and the head becomes the last node.

## Advantages and Disadvantages

### Advantages:
1. **Dynamic Size**: The size of a linked list can grow or shrink at runtime.
2. **Efficient Insertions/Deletions**: Unlike arrays, no need to shift elements when inserting or deleting.

### Disadvantages:
1. **Slow Access Time**: Accessing an element requires traversing from the head, making it slower than arrays.
2. **Extra Memory**: Each node requires additional memory for storing a pointer/reference.

## Common Variants of Linked Lists

### 1. **Singly Linked List**
   - **Description**: Each node points to the next node.
   - **Use Cases**: Basic scenarios where elements are accessed sequentially.

### 2. **Doubly Linked List**
   - **Description**: Each node points to both the previous and next node.
   - **Use Cases**: Where bidirectional traversal or frequent insertions/deletions at both ends are required (e.g., browser history, undo functionality).

### 3. **Circular Linked List**
   - **Description**: The last node points to the first node.
   - **Use Cases**: Where there is a need for circular traversal, such as in round-robin scheduling.

## Implementation in JavaScript

### Node Definition

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;  // Points to the next node
    this.prev = null;  // For doubly linked list
  }
}
```

### Singly Linked List Implementation

```javascript
class SinglyLinkedList {
  constructor() {
    this.head = null;
  }

  // Insert at the head
  insertAtHead(data) {
    let newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Insert at the tail
  insertAtTail(data) {
    let newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
      return;
    }
    let temp = this.head;
    while (temp.next !== null) {
      temp = temp.next;
    }
    temp.next = newNode;
  }

  // Traverse and print the linked list
  traverse() {
    let temp = this.head;
    while (temp !== null) {
      console.log(temp.data);
      temp = temp.next;
    }
  }

  // Delete a node by value
  delete(data) {
    if (this.head === null) return;

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let temp = this.head;
    while (temp.next !== null && temp.next.data !== data) {
      temp = temp.next;
    }

    if (temp.next !== null) {
      temp.next = temp.next.next;
    }
  }
}
```

### Example Usage:

```javascript
let list = new SinglyLinkedList();
list.insertAtHead(10);
list.insertAtTail(20);
list.insertAtTail(30);

list.traverse(); // Output: 10 20 30

list.delete(20);
list.traverse(); // Output: 10 30
```

## Common Problems

### 1. **Reverse a Linked List**

Problem: Given the head of a singly linked list, reverse the linked list and return the new head.

Solution (JavaScript):

```javascript
reverse() {
  let prev = null;
  let current = this.head;
  let next = null;

  while (current !== null) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  this.head = prev;
}
```

### 2. **Detect a Cycle in a Linked List**

Problem: Determine if a linked list contains a cycle.

Solution (Using Floyd’s Cycle Detection Algorithm):

```javascript
hasCycle() {
  let slow = this.head;
  let fast = this.head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true; // Cycle detected
    }
  }
  return false; // No cycle
}
```

### 3. **Find the Middle of a Linked List**

Problem: Find the middle element of a singly linked list.

Solution:

```javascript
findMiddle() {
  let slow = this.head;
  let fast = this.head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow.data;
}
```

### 4. **Merge Two Sorted Linked Lists**

Problem: Given two sorted linked lists, merge them into one sorted list.

Solution:

```javascript
merge(list1, list2) {
  let dummy = new Node(-1);
  let current = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.data < list2.data) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  current.next = (list1 === null) ? list2 : list1;
  return dummy.next;
}
```

### 

5. **Remove Duplicates from a Sorted Linked List**

```javascript
removeDuplicates() {
  let current = this.head;

  while (current !== null && current.next !== null) {
    if (current.data === current.next.data) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
}
```

## Time Complexity

- **Insertion**: `O(1)` for insertion at the head; `O(n)` for insertion at the tail.
- **Deletion**: `O(1)` for deletion at the head; `O(n)` for general case.
- **Search**: `O(n)` as we might have to traverse the entire list.
- **Traversal**: `O(n)`.

## Practice Problems

1. [LeetCode - Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
2. [LeetCode - Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
3. [LeetCode - Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
4. [LeetCode - Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)
5. [GeeksforGeeks - Detect Loop in Linked List](https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/)

## Further Reading

- [GeeksforGeeks - Introduction to Linked List](https://www.geeksforgeeks.org/data-structures/linked-list/)
- [Programiz - Linked List Data Structure](https://www.programiz.com/dsa/linked-list)
- [LeetCode - Linked List Problems](https://leetcode.com/tag/linked-list/)
