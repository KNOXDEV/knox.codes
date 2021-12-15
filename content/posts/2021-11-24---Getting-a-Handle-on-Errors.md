---
title: Getting a Handle on Errors
date: "2021-12-14T00:00:00.000Z"
template: "post"
draft: true
slug: "getting-a-handle-on-errors"
category: "Software Design"
tags:
  - "Education"
  - "Software engineering"
  - "Best practices"
description: "Computers fail all the time. Surprising, programming languages handle errors in completely different ways. Which approach is the best?"
---

People mostly suck at programming. 

It is often said (by my college math professor, for instance), computers are the world's fastest idiots.
They can only ever do what you tell them to, and much like Amelia Bedelia,
aren't exactly going to pick up on "what you mean".

**Programming is therefore a form of communication!** Between the human and the computer, sure,
but *first and foremost* between a human and their fellow programmers.
And much like communication between people, it's important to be able to correct yourself when errors occur.

> In this short post, I take a look at how some popular programming languages
> give the author tooling to recover from expected (or even unexpected) errors while your program runs.
  
Let's start with the simplest possible example,
the undefeated systems programming champion of 50 years running...
  
## C

This section will be short.
**C has no official support for error handling whatsoever.** Not cool, C.

Not to say that C doesn't have errors.
Beyond the usual errors that can be thrown at you due to syntax, semantics, and linking, after a program is compiled,
the only official "errors" you'll encounter in runtime are those explicitly written into the control flow,
or [a very small set](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/errno.h.html) of illegal hardware operations.

Basically, if you:
1. have a binary with invalid opcodes (should never happen unintentionally),
2. you divide by zero (can happen if you're not careful),
3. you read/write invalid memory locations (literally all the time),

...the CPU will perform its duties as a dirty snitch and switch context to the OS,
who will most likely choose to reward your program with capital punishment.

Otherwise, you must anticipate edge cases yourself.
For expected errors, one idiomatic approach for many standard library functions is to **return NULL**,
or even sometimes -1 (seemly at random).

```c
FILE *filePointer;
filePointer = fopen("file.txt", "w");

if(filePointer == NULL)
    // handle error here
```

### C++

Does the world's greatest and easiest to use language, C++, make any improvement on its strict subset?
Actually, yes. C++ at least supports **exceptions**.

```cpp
try {
    // throw an exception by either triggering a C error..
    int a = 5 / 0;
    // ...throwing it explicitly...
    throw new Exception("Arbitrary Error");
    // or by calling another function that throws an exception
    functionThatThrowsAnException();
} catch (Exception e) {
    // handle here
}
```

You utilize this error-handling behavior by wrapping the code that might trigger an error in a `try`
block. All `try` blocks have an accompanying `catch` statement (or perhaps multiple) that handles an error of a certain type.

> **Side note**: If an error is thrown outside a try block, the normal C behavior (ie getting merc'd) takes over.

One of the (many) criticisms of C++ stems from the complexity of the `try-catch` block. It has two major issues:

1. `try-catch` is the most convoluted and atypical of all control flow structures, and has been shown to be very difficult for programmers to reason about.
2. throwing an exception in a function does *not* force the caller of that function to handle it, which may lead to unexpected program crashes.

## Java

Java also supports exceptions via `try-catch`, with essentially identical syntax, so I won't go over it.
What Java introduces aside from this is **checked exceptions**.

```java
openFile(String path) throws IOException {
    //
}
//...
main() {
    // will throw a compilation error because the IOException isn't handled
    openFile("file.txt");
}
```

The second point is contentious among less experienced programmers,
who are often annoying when they are forced to write error handlers for cases that they don't need to consider.

## Golang



## JavaScript

### TypeScript
 
## Rust

Rust handles errors in a way that is actually similar to promises. Most functions that can error will return a `Result`
object that can either be `Ok` or `Err`.