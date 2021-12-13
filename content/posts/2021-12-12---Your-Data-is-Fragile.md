---
title: Your Data is Fragile
date: "2021-12-12T00:00:00.000Z"
template: "post"
draft: false
slug: "your-data-is-fragile"
category: "Software Design"
tags:
  - "Education"
  - "Software engineering"
  - "Best practices"
description: "The road to a populated database is paved with half-truths and missing information. How can we correctly tolerate intermediate, invalid states?"
---

This topic is a little on the complicated side,
and is written from the perspective of a software system designer, so bare with me.

When building a service or website, whether you're Google or a small startup, everybody has to worry about the data they manage.
In way, you can consider most websites to just be an interface by which your data, which they store, is changed. 
Tangentially, this way of thinking about programs is called **data-oriented programming**, but we'll write about that another day.

Most data on a particular platform has valid and invalid states.
Sometimes these validations are simple to describe.
For example, on most websites, `10000 BC` is an invalid birth year, and `&^%(*&&` is an invalid name.

Sometimes, however, validation can get a lot more complicated than that.
And unfortunately, input from a user must *always* be validated before using and serving up to other users,
so there's no way around figuring out when and how to do data validation for your web service. 

If web services didn't validate API requests properly, you can only imagine the garbage data that would fill your
favorite social media platforms, crashes and bugs would abound as your browser attempts to parse invalid and even malicious
information from the backend servers. 

Let's say my web service, Canvas ([the popular Learning Management System](https://github.com/instructure/canvas-lms)),
exposes a web API for user browsers to interact with and make requests. 

There's two types of validation I must perform on user requests:

1. **Syntactic Validation** - ensuring that what comes in can be parsed and understood at all.
2. **Semantic Validation** - *after* making sure the request can be parsed, does this request create any invalid state?

You can think of syntactic validation as making sure you're speaking English, and using correct spelling and grammar.
semantic validation is interpreting the *meaning* of the sentence and making sure it's a request we want support.

In practice, the former is done almost entirely automatically;
when building a web service, you'll describe the expected structure of
your request using Swagger, OpenAPI, or just plain [json-schema](https://json-schema.org/).
In this way, the documentation you create for your API
can also be applied to existing endpoints as a one-liner validation of the request structure.

If `ClassMeeting.yaml` exists as a valid json-schema declaration of the expected request body, 
validation within your endpoint code might look like this:

```js
function patch(req) {
    // will throw an error if a syntactically invalid body is provided
	verifySchema(req.body, 'ClassMeeting');
} 
```

However, many endpoints on your API will need to implement additional **semantic validation**.

The most common example of this is just **authorization**:
An instructor can make a syntactically valid request to create a lecture note in another class,
but if the instructor is not actually a part of that class, that operation should be disallowed.

That said, this is not the only kind of semantic validation you'll encounter.
The underlying definition is that semantic validation requires knowledge of existing application state,
which is a large reason of why stateless technologies like json-schema cannot handle these cases.

## semantic validation of a single resource

The solution to implementing semantic validation seems simple:
just add additional so-called "business logic" at your **create** and **update** endpoints for the resources in question,
to ensure that *at no point, the user creates a resource with an invalid state*.

For example, if we need to ensure that a `ClassMeeting`'s `startTime` must always come before its `endTime`
(a reasonable requirement), simply reject the request if that requirement is not met.

```js
function patch(req) {
    // ...
    // we will also error if the requested startTime is after the endTime
    if(req.body.startTime > req.body.endTime)
      throw new Error("startTime must occur before endTime");
} 
```

In practice, this works very effectively for small resources that are not dependent on other data,
but you start running into issues when you need to validate **large collections of interdependent data**.

> **Side note**: This can also break down if you allow **partial updates** of a single resource with interdependent fields,
> for the exact same reasons. Imagine if we could send an update request that only updates the startTime.
> Finish reading and then think about why this would be a problem.

## why this can break at scale

Consider the example of a Meeting resource, but now let's introduce a new restriction (that is hopefully still reasonable):
**no two meetings can overlap**.

This validation is also a semantic one, but its applied not over a single resource, but **an entire collection of them**.
This makes our business logic more complicated due to the types of requests we accept.

It's easy enough to compare a collection of Meetings and ensure there's no overlap,
but the question for the developer becomes *when* is it appropriate to apply this validation?
If you apply the validation when the individual Meeting resource is created and updated,
we will have to pull all the other Meetings from the database to compare it to.

```js
function patch(req) {
    // ...
    // fetch all class meetings from the db to compare to
    const meetings = ClassMeetings.findAll();
    // complicated overlap check
    if(meetings.some(meeting => meeting.startTime < req.body.startTime && meeting.endTime > req.body.startTime
      || meeting.startTime < req.body.endTime && meeting.endTime > req.body.endTime))
      throw new Error("no meetings can overlap");
} 
```

This is an underlying theme in many semantic validation problems:
**often, you will need to fetch additional context from the database to complete your validation**.
This is usually undesirable for performance and complexity reasons,
but in some small cases, may simply be the cost of doing business.

Another aspect to consider is error reporting.
We can convey to the client that the "no overlaps" error was encountered fairly easily,
but if we want to convey more helpful information such as *which item presented a conflict*,
error reporting quickly becomes much more complicated,
and the client must also shoulder the burden of interpreting these complex errors in a user-friendly way.

> **Side note**: Not only this, but this kind of validation can also interfere with the client's form submission flow:
> The client must usually remember to resubmit the rejected Meeting resource once the issue is corrected.
> This could happen when the rejected Meeting is modified, **or** when the conflicting meeting is modified,
> which might happen in a completely different view.
> It's possible that the site design will not even allow for a good way to correct these kinds of errors without starting over.

Often, if the data in question is complex and has a lot of different fields,
the user has no way to get their client to remember their invalid data unless its submitted successfully.
If the user closes their browser, all their unsubmitted data is lost.
For a small object like a meeting, this might be an acceptable amount of local state to risk losing,
but if its ten meeting objects, or if it's an entire assignment with many child questions that all need to be semantically validated,
it becomes more and more important to allow the backend to accept **intermediate, temporarily invalid state**.

## allow invalid intermediate states to address semantic validation

Rather than forcing the user to solve a [Tower of Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi)
problem of trying to reach the desired final state without any invalid intermediate states,
in certain cases the backend should allow semantically invalid data to be saved and committed.

I'll propose two different paradigms for allowing our API endpoints to support this, but they are **incompatible**.

### the collection update paradigm

This one is the simplest: *don't allow the client to submit any create or update requests*.
This might sound counterintuitive, but this approach can be highly appropriate for small data sets.

Instead, we allow the client to submit a `replaceAll` request for the entire collection, like so.

```typescript
PUT /classes/[classID]/meetings
```

In the body of this request, the client provides an array of every meeting belonging to this class.
All others currently stored are deleted and replaced. Every time the client wants to update one meeting,
they must send every meeting in the collection, new and old ones.

This makes it trivial for the backend to verify the semantic validity of the entire collection,
without any additional requests to the database for more information.

#### pros
* validation is easy and usually doesn't require additional DB requests.
* implementation is simplified, this endpoint replaces your **create**, **update**, and **delete** endpoints.
* the client can now easily provide a "Cancel/Save" operation. If saved, the **replaceAll** endpoint is called.
  If cancelled, the client data is thrown away and the last saved state is restored.

#### cons
* quickly becomes impractical with large resources or large collections.
* pretty much all of your validation has to be done at the time of submission,
  even if there are certain validations that don't need to be done at the collection level.
* if the user leaves the page without saving, they will lose their edits.

### the draft / publish paradigm

In the draft / publish approach, we add a field to the **parent resource that manages the collection** called `isPublished`
that will be set to false on newly created resources. When a resource is not published or "is a draft",
it does not need to be semantically valid when it is created or updated. Instead, there is an extra step after updating
called **publishing** that is required to make the changes visible to other clients.

```typescript
POST /classes/[classID]/publish
```

This will toggle the publishing of a particular class, which will validate the meetings that belong to it in the process.

#### pros
* allows incremental changes using the typical endpoints, **create**, **update**, and **delete**.
* easily supports massive collections of complicated data.
* semantic validation is implemented in only one place: the publish endpoint.
* you can still provide simple semantic validation that doesn't have dependencies at the resource level.
* if the user leaves the page their progress is saved.

#### cons
* creates another problem: to allow updating *after a resource has been published*,
  the server must either *start* disallowing all new changes,
  or require the user to "unpublish" the resource before updates can be made.
* you cannot provide the user with a "Cancel/Save" functionality at the collection level since each resource is incrementally saved.
* harder to implement.
* you still have to implement all the usual endpoints and test them.

## summary

Do you *need* one of these strategies to implement validation of your resource collection?
Not necessarily, you should need to meet the requirements first. Here's a simple flow chart:

1. Does your resource require semantic validation with dependencies on other resources? If not,
   then you don't even have to worry about this nonsense! Otherwise, proceed to step 2.
2. Is your resource collection too big for a single request? If so, use the **draft / publish paradigm**.
   Otherwise, use the **collection update paradigm**.

This conversation is based on some challenges I faced while building data models for certain complicated web services.
That said, I find that the principles of these observations are relevant in many other types of systems,
and shares some similarities with discussions on concurrency and consistency.

These are the same problems that any large organization has probably spent a lot of time trying to solve,
so the more fluent you are, the better you'll be at software design.
