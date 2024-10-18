# Strings

Strings are a fundamental data type in most programming languages, used to represent text. A string is essentially a sequence of characters.

## Table of Contents
- [Strings](#strings)
  - [Table of Contents](#table-of-contents)
  - [Basic Concepts](#basic-concepts)
  - [Creating Strings](#creating-strings)
  - [Accessing String Characters](#accessing-string-characters)
  - [Modifying Strings](#modifying-strings)
  - [Common String Operations](#common-string-operations)
    - [Concatenation](#concatenation)
    - [Substrings](#substrings)
    - [Changing Case](#changing-case)
    - [Trimming Whitespace](#trimming-whitespace)
  - [String Methods](#string-methods)
    - [`indexOf()`](#indexof)
    - [`includes()`](#includes)
    - [`split()`](#split)
    - [`replace()`](#replace)
    - [`repeat()`](#repeat)
  - [String Performance](#string-performance)
  - [Practice Problems](#practice-problems)
    - [Reverse a String](#reverse-a-string)
    - [Check if a String is a Palindrome](#check-if-a-string-is-a-palindrome)
    - [Count the Number of Vowels in a String](#count-the-number-of-vowels-in-a-string)
    - [Find the Longest Word in a String](#find-the-longest-word-in-a-string)
  - [Further Reading](#further-reading)

## Basic Concepts

A string is a sequence of characters, where each character is a single unit of text. In many programming languages, strings are immutable, meaning once they are created, their content cannot be changed.

Key characteristics of strings:
- Can store text and special characters
- Are often immutable
- Have a fixed length once created

## Creating Strings

Here's how you can create strings in JavaScript:

```javascript
// Using single quotes
let singleQuoteStr = 'Hello, World!';

// Using double quotes
let doubleQuoteStr = "Hello, World!";

// Using backticks (template literals)
let templateLiteralStr = `Hello, ${name}!`;
```

## Accessing String Characters

You can access individual characters of a string using their index (starting from 0):

```javascript
let str = 'JavaScript';

console.log(str[0]); // Output: 'J'
console.log(str[4]); // Output: 'S'
console.log(str[str.length - 1]); // Output: 't' (last character)
```

Alternatively, you can use the `.charAt()` method:

```javascript
console.log(str.charAt(0)); // Output: 'J'
```

## Modifying Strings

Strings in JavaScript are immutable, meaning you cannot modify the content of a string after it’s created. Instead, you can create a new string based on an operation:

```javascript
let str = 'Hello, World!';
let newStr = str.replace('World', 'JavaScript');
console.log(newStr); // Output: 'Hello, JavaScript!'
```

You can also concatenate strings to form new ones:

```javascript
let greeting = 'Hello';
let name = 'Alice';

let message = greeting + ', ' + name + '!';
console.log(message); // Output: 'Hello, Alice!'
```

## Common String Operations

### Concatenation

You can concatenate (join) strings using the `+` operator or template literals:

```javascript
let firstName = 'John';
let lastName = 'Doe';

let fullName = firstName + ' ' + lastName;
console.log(fullName); // Output: 'John Doe'

let greeting = `Hello, ${firstName} ${lastName}!`;
console.log(greeting); // Output: 'Hello, John Doe!'
```

### Substrings

You can extract parts of a string using the `slice()`, `substring()`, or `substr()` methods:

```javascript
let str = 'JavaScript';

console.log(str.slice(0, 4)); // Output: 'Java'
console.log(str.substring(4, 10)); // Output: 'Script'
console.log(str.substr(4, 6)); // Output: 'Script'
```

### Changing Case

Use the `.toUpperCase()` and `.toLowerCase()` methods to change the case of a string:

```javascript
let text = 'Hello';

console.log(text.toUpperCase()); // Output: 'HELLO'
console.log(text.toLowerCase()); // Output: 'hello'
```

### Trimming Whitespace

Remove leading and trailing whitespace using the `.trim()` method:

```javascript
let str = '   Hello, World!   ';
console.log(str.trim()); // Output: 'Hello, World!'
```

## YouTube Tutorial

[YouTube Tutorial](https://www.youtube.com/watch?v=uKKEdtNU5II)

## String Methods

JavaScript provides many useful methods for working with strings. Here are some examples:

### `indexOf()`

Find the position of the first occurrence of a substring:

```javascript
let str = 'JavaScript is awesome!';
console.log(str.indexOf('is')); // Output: 11
```

### `includes()`

Check if a string contains a substring:

```javascript
let str = 'JavaScript is awesome!';
console.log(str.includes('awesome')); // Output: true
```

### `split()`

Split a string into an array of substrings based on a separator:

```javascript
let str = 'apple, banana, orange';
let fruits = str.split(', ');
console.log(fruits); // Output: ['apple', 'banana', 'orange']
```

### `replace()`

Replace occurrences of a substring with another substring:

```javascript
let str = 'Hello, World!';
let newStr = str.replace('World', 'JavaScript');
console.log(newStr); // Output: 'Hello, JavaScript!'
```

### `repeat()`

Repeat a string a specified number of times:

```javascript
let str = 'Ha! ';
console.log(str.repeat(3)); // Output: 'Ha! Ha! Ha! '
```

## String Performance

- Accessing characters: O(1)
- Searching for a substring: O(n)
- Concatenation: O(n) (depends on string size)
- Creating substrings: O(n)

## Practice Problems

### Reverse a String

Write a function that reverses a string without using built-in methods like `reverse()`:

```javascript
function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log(reverseString('hello')); // Output: 'olleh'
```

### Check if a String is a Palindrome

Write a function that checks if a string is a palindrome (reads the same forward and backward):

```javascript
function isPalindrome(str) {
  let cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleanedStr === cleanedStr.split('').reverse().join('');
}

console.log(isPalindrome('A man, a plan, a canal, Panama')); // Output: true
```

### Count the Number of Vowels in a String

Create a function that counts the number of vowels in a given string:

```javascript
function countVowels(str) {
  let vowels = 'aeiouAEIOU';
  let count = 0;
  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

console.log(countVowels('hello')); // Output: 2
```

### Find the Longest Word in a String

Write a function that returns the longest word in a sentence:

```javascript
function findLongestWord(sentence) {
  let words = sentence.split(' ');
  let longestWord = '';

  for (let word of words) {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }

  return longestWord;
}

console.log(findLongestWord('The quick brown fox jumps over the lazy dog')); // Output: 'jumps'
```

## Further Reading

- [MDN Web Docs: String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [JavaScript.info: Strings](https://javascript.info/string)
- [GeeksforGeeks: Strings in JavaScript](https://www.geeksforgeeks.org/strings-in-javascript/)
