# Arrays

Arrays are a fundamental data structure in programming. They allow you to store multiple values of the same type in a single variable.

## Table of Contents
1. [Basic Concepts](#basic-concepts)
2. [Creating Arrays](#creating-arrays)
3. [Accessing Array Elements](#accessing-array-elements)
4. [Modifying Arrays](#modifying-arrays)
5. [Common Array Operations](#common-array-operations)
6. [Array Methods](#array-methods)
7. [Multidimensional Arrays](#multidimensional-arrays)
8. [Array Performance](#array-performance)
9. [Practice Problems](#practice-problems)
10. [Further Reading](#further-reading)

## Basic Concepts

An array is a collection of elements, each identified by an index. In most programming languages, array indices start at 0.

Key characteristics of arrays:
- Fixed size (in many languages)
- Homogeneous elements (same data type)
- Contiguous memory allocation

## Creating Arrays

Here's how you can create an array in JavaScript:

```javascript
// Method 1: Array literal notation
let fruits = ['apple', 'banana', 'orange'];

// Method 2: Array constructor
let numbers = new Array(1, 2, 3, 4, 5);

// Method 3: Array.from() method
let chars = Array.from('hello');
```

## Accessing Array Elements

You can access array elements using their index:

```javascript
let fruits = ['apple', 'banana', 'orange'];

console.log(fruits[0]); // Output: 'apple'
console.log(fruits[1]); // Output: 'banana'
console.log(fruits[fruits.length - 1]); // Output: 'orange' (last element)
```

## Modifying Arrays

Arrays are mutable, meaning you can change their contents:

```javascript
let fruits = ['apple', 'banana', 'orange'];

// Changing an element
fruits[1] = 'grape';
console.log(fruits); // Output: ['apple', 'grape', 'orange']

// Adding an element to the end
fruits.push('kiwi');
console.log(fruits); // Output: ['apple', 'grape', 'orange', 'kiwi']
```

## Common Array Operations

### Adding Elements

To add an element to the end of an array, use the `push()` method:

```javascript
let fruits = ['apple', 'banana', 'orange'];
fruits.push('grape');
console.log(fruits); // Output: ['apple', 'banana', 'orange', 'grape']
```

To add an element to the beginning of an array, use the `unshift()` method:

```javascript
fruits.unshift('mango');
console.log(fruits); // Output: ['mango', 'apple', 'banana', 'orange', 'grape']
```

### Removing Elements

To remove the last element from an array, use the `pop()` method:

```javascript
let lastFruit = fruits.pop();
console.log(lastFruit); // Output: 'grape'
console.log(fruits); // Output: ['mango', 'apple', 'banana', 'orange']
```

To remove the first element from an array, use the `shift()` method:

```javascript
let firstFruit = fruits.shift();
console.log(firstFruit); // Output: 'mango'
console.log(fruits); // Output: ['apple', 'banana', 'orange']
```

## Array Methods

JavaScript provides many useful methods for working with arrays. Here are some examples:

### `map()`

Creates a new array with the results of calling a provided function on every element in the array.

```javascript
let numbers = [1, 2, 3, 4, 5];
let squared = numbers.map(num => num * num);
console.log(squared); // Output: [1, 4, 9, 16, 25]
```

### `filter()`

Creates a new array with all elements that pass the test implemented by the provided function.

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4, 6, 8, 10]
```

### `reduce()`

Executes a reducer function on each element of the array, resulting in a single output value.

```javascript
let numbers = [1, 2, 3, 4, 5];
let sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // Output: 15
```

### `forEach()`

Executes a provided function once for each array element.

```javascript
let fruits = ['apple', 'banana', 'orange'];
fruits.forEach(fruit => console.log(fruit));
// Output:
// apple
// banana
// orange
```

### `find()`

Returns the first element in the array that satisfies the provided testing function.

```javascript
let numbers = [1, 2, 3, 4, 5];
let firstEven = numbers.find(num => num % 2 === 0);
console.log(firstEven); // Output: 2
```

## Multidimensional Arrays

Arrays can contain other arrays, creating multidimensional arrays:

```javascript
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(matrix[1][1]); // Output: 5
```

## Array Performance

- Accessing elements by index: O(1)
- Searching for an element: O(n)
- Inserting/removing at the end: O(1)
- Inserting/removing at the beginning: O(n)

## Practice Problems

### Reverse an Array

Write a function that reverses an array without using the built-in `reverse()` method.

```javascript
function reverseArray(arr) {
  let reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}

console.log(reverseArray([1, 2, 3, 4, 5])); // Output: [5, 4, 3, 2, 1]
```

### Find the Second Largest Number

Implement a function that finds the second largest number in an array of integers.

```javascript
function findSecondLargest(arr) {
  let largest = arr[0];
  let secondLargest = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    } else if (arr[i] > secondLargest && arr[i] < largest) {
      secondLargest = arr[i];
    }
  }

  return secondLargest;
}

console.log(findSecondLargest([10, 5, 8, 12, 3, 7])); // Output: 10
```

### Merge Two Sorted Arrays

Create a function that merges two sorted arrays into a single sorted array.

```javascript
function mergeSortedArrays(arr1, arr2) {
  let merged = [];
  let i = 0, j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    merged.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    merged.push(arr2[j]);
    j++;
  }

  return merged;
}

console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6])); // Output: [1, 2, 3, 4, 5, 6]
```

## Further Reading

- [MDN Web Docs: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript.info: Arrays](https://javascript.info/array)
- [GeeksforGeeks: Arrays in JavaScript](https://www.geeksforgeeks.org/arrays-in-javascript/)
