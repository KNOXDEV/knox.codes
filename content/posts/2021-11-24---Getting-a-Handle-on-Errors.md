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
    // will throw a compilation error because the IOException isn't wrapped in a try-catch
    openFile("file.txt");
}
```

Checked exceptions are a way to add potentially thrown exceptions to a function signature.
Then, the Java compiler will refuse to compile your program if you do not handle that exception (via a try-catch) in the
places where that function is called. 

The value of this point is contentious among less experienced programmers,
who are often annoyed when they are forced to write error handlers for cases that they don't want to consider.
That said, over time and with experience, most programmers appreciate this behavior, as it avoids unexpected issues
in the long run.

Even so, the most common exceptions you'll face in Java are the unchecked ones,
such as ArrayIndexOutOfBounds and NullPointerException.
These errors must be checked for manually, or they will cause a runtime crash.

The latter pops up in some places where instead of throwing an exception for an unhandled case,
the function will instead simply return `null`,
which is essentially a mechanism by which certain reference type checks can be neglected.
Posthumously, this has been referred to as the [billion dollar mistake](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/)
due to how null references tend to become a vehicle by which dealing with an unhandled case (and most exceptions) can be deferred.

Omitting such error handling logic leads to expensive bugs and program instability in the long run.
It is much more productive to use the compiler to force the programmer to consider all cases when the program is being written.

## Golang

Golang takes a unique approach. The designers of Golang (which *happens* to include one of the original developers of C,
Ken Thompson) decided to **not add support for exceptions** in Golang, for some reasons mentioned in the C++ section above.

The convention then is to return error values from the function alongside the function's results.
Fortunately, unlike C, Golang at least provides a standard [`error` interface](https://go.dev/blog/error-handling-and-go)
rather than just throwing around magic numbers. In addition, the sugary syntactical support for tuples in Golang
makes this paradigm simple to declare and work with:

```go
// in the errorable function:
func Sqrt(f float64) (float64, error) {
    if f < 0 {
        return 0, errors.New("math: square root of negative number")
    }
// ...
// in the caller:
    f, err := Sqrt(-1)
    if err != nil {
        fmt.Println(err)
    }
}
```

Unfortunately, much like C, this does *not* force the programmer to check for errors before proceeding with the values
returned from such a function (although it will raise a warning in certain circumstances, thank goodness).

In addition, especially in the above circumstances,
Golang employs the null reference by another name: the [nil reference](https://medium.com/@ishagirdhar/nil-in-golang-aaa16565a5be). 
This suffers from a lot of the same downsides discussed above.

After some time and a bit of feedback from developers, Golang also implemented an exception-like control flow called
[panic-defer-recover](https://go.dev/blog/defer-panic-and-recover). However, while this construct can be used to mirror
the control flow of exceptions, the designers of Golang have made it very clear this is not the intended use.
Instead, it's only intended to be used for resource cleanup. Read the linked article for more information.

## JavaScript

JavaScript, in all its wondrous dialects and in typical fashion, offers the naive developer many an option for dealing
with unexpected behavior. It's first class treatment is that of our familiar foe, **exceptions**.
These are handled via the usual `try-catch` syntax, so I choose to not review that here.

JavaScript has an interesting relationship with asynchronous code, which also needs to handle errors.
In the *Olden Times*, this was facilitated by the use of [callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function).

By **convention**, a word I've learned to scorn and dread, these callbacks would accept one parameter, the "result",
if the operation was successful. If unsuccessful, these callbacks would receive two parameters,
one of which was the "err" object storing information about any issues that were encountered. 
This "return value" convention is similar to Golang's.

Then, while revolutionizing the way asynchronous code was written in JavaScript,
**[promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)**
were also a mechanism by which failable operations could fail more elegantly:

```js
asyncFunction()
    .then((result) => doSomething(result))
    .catch((err) => console.log(err));
```

This syntax supports transparent error propagation. If either `asyncFunction` or `doSomething` throws an error,
both will call the function provided to the `catch` block with the corresponding error. 
Internally, this Promise functionality uses a simple `try-catch` block.

The major downside to this flow is the same ones discussed in previous examples:
if the possible error cases are not explicitly handled via a `catch`, nothing will happen when the code is run, 
all the way up until an error actually occurs, which will result in a crash.
That said, it is common for JS linters such as ESLint to
[support requiring promises](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-floating-promises.md)
with catch statements. This can go a long way to making your code more robust against errors...

### TypeScript

But how could we forget JavaScript's younger, but much cooler brother, TypeScript?

By itself, 
 
## Rust

Rust handles errors in a way that is actually similar to promises. Most functions that can error will return a `Result`
object that can either be `Ok` or `Err`.