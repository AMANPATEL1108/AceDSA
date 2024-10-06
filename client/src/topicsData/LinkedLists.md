# Linked Lists

A **Linked List** is a linear data structure where each element (node) contains a reference (or link) to the next node in the sequence. Unlike arrays, linked lists allow for efficient insertion and deletion operations, but accessing individual elements is slower because it requires traversing the list from the start.

## Table of Contents
1. [Basic Concepts](#basic-concepts)
2. [Types of Linked Lists](#types-of-linked-lists)
3. [Linked List Operations](#linked-list-operations)
4. [Implementation in JavaScript](#implementation-in-javascript)
5. [Common Problems](#common-problems)
6. [Time Complexity](#time-complexity)
7. [Practice Problems](#practice-problems)
8. [Further Reading](#further-reading)

## Basic Concepts

A **Linked List** consists of nodes. Each node contains two components:
1. **Data**: The actual value being stored.
2. **Next**: A pointer/reference to the next node in the list.

Key properties of linked lists:
- **Dynamic Size**: Linked lists can grow and shrink in size during program execution.
- **Non-Contiguous Memory Allocation**: Elements are not stored sequentially in memory.

## Types of Linked Lists

### 1. **Singly Linked List**
   Each node points to the next node and the last node points to `null`.

   ```plaintext
   [data|next] -> [data|next] -> [data|next] -> null
   ```

### 2. **Doubly Linked List**
   Each node has two references: one pointing to the next node and another pointing to the previous node.

   ```plaintext
   null <- [prev|data|next] <-> [prev|data|next] <-> [prev|data|next] -> null
   ```

### 3. **Circular Linked List**
   In a circular linked list, the last node points back to the first node, forming a loop.

   ```plaintext
   [data|next] -> [data|next] -> [data|next] --+
        ^                                      |
        +--------------------------------------+
   ```

## Linked List Operations

### 1. **Insertion**
   - **At Head**: Inserting a new node at the start of the list.
   - **At Tail**: Inserting a new node at the end of the list.
   - **At Position**: Inserting a new node at a specific position in the list.

### 2. **Deletion**
   - **From Head**: Removing the first node.
   - **From Tail**: Removing the last node.
   - **From Position**: Removing a node from a specific position.

### 3. **Traversal**
   Linked lists are traversed by starting at the head and visiting each node in sequence until the end.

### 4. **Searching**
   Finding a node that contains a specific value, by traversing through the linked list.

## Implementation in JavaScript

Here’s an example of how to implement a **Singly Linked List** in JavaScript:

### Node Definition

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null; // Points to the next node
  }
}
```

### Linked List Definition

```javascript
class LinkedList {
  constructor() {
    this.head = null; // Initially, the list is empty
  }

  // Insertion at the head
  insertAtHead(data) {
    let newNode = new Node(data);
    newNode.next = this.head; 
    this.head = newNode; // Update head to the new node
  }

  // Insertion at the tail
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

  // Traversing the linked list
  traverse() {
    let temp = this.head;
    while (temp !== null) {
      console.log(temp.data);
      temp = temp.next;
    }
  }

  // Deleting a node with specific value
  delete(data) {
    if (this.head === null) return; // List is empty

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

### Example Usage

```javascript
let ll = new LinkedList();
ll.insertAtHead(10);
ll.insertAtHead(20);
ll.insertAtTail(30);

ll.traverse(); // Output: 20 10 30

ll.delete(10);
ll.traverse(); // Output: 20 30
```

## Common Problems

1. **Reversing a Linked List**

   Reverse the pointers in a linked list so that the list is traversed in reverse order.

   ```javascript
   reverse() {
     let prev = null;
     let current = this.head;
     let next = null;

     while (current !== null) {
       next = current.next; // Store next node
       current.next = prev; // Reverse the link
       prev = current; // Move prev and current one step ahead
       current = next;
     }
     this.head = prev;
   }
   ```

2. **Detecting a Cycle in a Linked List**

   Use Floyd's Cycle Detection Algorithm (also known as the **Tortoise and Hare Algorithm**):
   
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

3. **Finding the Middle Element**

   Use two pointers, slow and fast. Move the slow pointer by one step and the fast pointer by two steps. When the fast pointer reaches the end, the slow pointer will be at the middle.
   
   ```javascript
   findMiddle() {
     let slow = this.head;
     let fast = this.head;

     while (fast !== null && fast.next !== null) {
       slow = slow.next;
       fast = fast.next.next;
     }
     return slow.data; // Middle element
   }
   ```

## Time Complexity

| Operation        | Time Complexity |
|------------------|-----------------|
| Insertion (Head) | O(1)            |
| Insertion (Tail) | O(n)            |
| Deletion (Head)  | O(1)            |
| Deletion (Tail)  | O(n)            |
| Traversal        | O(n)            |
| Searching        | O(n)            |

## Practice Problems

### 1. Reverse a Linked List

Write a function to reverse a linked list.

### 2. Detect a Cycle in a Linked List

Implement a function to detect if a linked list contains a cycle.

### 3. Find the Kth Node from the End

Write a function that returns the Kth node from the end of a linked list.

### 4. Merge Two Sorted Linked Lists

Given two sorted linked lists, merge them into one sorted linked list.

### 5. Remove Duplicates from a Sorted Linked List

Remove all duplicates from a sorted linked list.

## Further Reading

- GeeksforGeeks: Linked List (https://www.geeksforgeeks.org/data-structures/linked-list/)
- LeetCode: Linked List Problems (https://leetcode.com/tag/linked-list/)
- HackerRank: Linked Lists Practice (https://www.hackerrank.com/domains/tutorials/10-days-of-javascript)
