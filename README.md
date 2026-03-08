# 1. What is the difference between var, let, and const?
    1. Ans: The main difference between var, let, and const is how they handle scope, reassignment, and redeclaration.

    var: var is the older way to declare variables in JavaScript. It is function-scoped, which means it is accessible anywhere inside the function where it is declared. One problem with var is that it can be redeclared and updated, which can sometimes create unexpected bugs.

    let: let was introduced in ES6 (2015). It is block-scoped, meaning it only works inside the block { } where it is declared. Unlike var, it cannot be redeclared in the same scope, but its value can be updated.

    const: const was also introduced in ES6. It is also block-scoped, just like let. The difference is that a const variable cannot be reassigned after it is declared. However, if the variable stores an object or array, the contents inside it can still be modified.

    In modern JavaScript, developers usually prefer let and const instead of var because they help avoid common mistakes and make the code easier to understand.


# 2. What is the spread operator (...)?
    2. Ans: The spread operator (...) in JavaScript is used to expand or spread the elements of an array or object. It allows us to copy, combine, or pass elements more easily.


# 3. What is the difference between map(), filter(), and forEach()?
    3. Ans: map(), filter(), and forEach() are commonly used array methods in JavaScript, but they serve different purposes.

    forEach: forEach() is mainly used to iterate through each element of an array and perform a specific action. It does not return a new array. Instead, it simply executes the provided function for every element.

    map: map() is used when we want to transform the elements of an array. It applies a function to every element and returns a new array containing the modified values.

    filter: filter() is used to select elements from an array based on a condition. It returns a new array that contains only the elements that satisfy the given condition.

    In short, forEach() is used for iteration, map() is used for transforming data, and filter() is used for selecting elements based on a condition.


# 4. What is an arrow function?
    4. Ans: An Arrow Function is a modern and concise way to write functions in JavaScript. It was introduced in ES6 (2015). It provides a shorter syntax compared to traditional function expressions and handles the this keyword differently.


# 5. What are template literals?
    5. Ans: Template literals are a way to create strings in JavaScript using backticks (`) instead of quotes. They allow embedding variables or expressions directly inside the string using ${} and also support multi-line strings without extra syntax.