---
title: "From Query to Context: Building Agentic RAG with Unbody's JSON Endpoint"
publishDate: "2025-03-05"
author: "amir"
---

I recently spoke at [**AI Thinkers Abu Dhabi**](https://abu-dhabi.aitinkerers.org/p/ai-tinkerers-abu-dhabi-meetup-3-feb-2025) about building robust RAG (Retrieval-Augmented Generation) systems. A key takeaway was that a naive approach to RAG—just dumping a user’s query into a semantic search and feeding results into a prompt—often isn’t enough. Real user queries can be nuanced:

> **“I need an Italian dish for two people, no sausage, and it should be ready in under 30 minutes!”**

A naive system might not correctly parse all these constraints. That’s where **Agentic RAG** comes in. By **parsing** the query into structured parameters (like “no sausage,” “under 30 minutes,” “Italian dish,” etc.), we can do more precise retrieval and generate a better final answer.

Let’s see how to do this with **Unbody**—step by step.

### Prerequisites

1. You have a **Unbody** project set up with your data (e.g., a collection of recipes) already ingested and indexed.

2. You have your **API key** and **Project ID** from the Unbody dashboard.

⚠️`If you haven’t set this up yet, check out the `[`Unbody docs`](https://docs.unbody.io/)` for a quick start on creating a project and uploading your data.`

### Initializing the Unbody Client

That’s it! Now you can start calling Unbody’s APIs to **search**, **filter**, and **generate**.

## Understanding Your Data

Before you write any code, you must know your data. In our example, we’re working with a collection of recipes. Knowing the schema tells us exactly which parameters we can extract from a user’s query. For instance, our data schema might look like this:

This schema tells us what information is available for each recipe. Knowing these fields lets us decide which parts of the user’s query should be parsed and parameterized. For example, if a user says,

> “I want an Italian dish with no sausage and ready in under 30 minutes”

we know to extract the **concept** (Italian dish), **ingredients to exclude** (sausage), and a **time constraint** (30 minutes).

## Naive RAG vs. Agentic RAG

RAG stands for Retrieval-Augmented Generation and consists of two main parts: Retrieval and Generation. The retrieval part is crucial because that's where you gather the context and information based on which the model can generate whatever is needed. Let me walk you through two different approaches:

### Naive RAG

A straightforward RAG approach might do this:

1. Take the user’s entire query (e.g. _“Italian dish, no sausage, 30 minutes max”_).

2. Pass it to `.search.about(...)`.

3. Feed the top documents into a text-generation prompt.

This works for simple queries but fails when the user has multiple constraints. The system doesn’t actually _understand_ the **user’s intention**; it just tries to match the entire text in a semantic way, which can lead to incomplete or irrelevant results.

### Agentic RAG

With an **Agentic** approach, we:

1. **Parse** the user’s query into structured parameters.

2. **Apply** filters to our knowledge base (e.g., “exclude sausage,” “max 30 minutes,” “Italian”).

3. **Generate** the final response using only the truly relevant documents.

The general syntax we will be using is going to be with Unbdoy’s chain syntax methods which is going to be like this

## Parsing the User Query into Parameters

Imagine the user types something like:

> “I want an Italian pasta with no sausage.”

To translate this into a proper RAG query, we need to extract three pieces of information:

1. Main keywords or concepts from the user's query to apply to semantic search `.search.about(...concepts)`

2. Any specific filters to pass to the where function `.where(...filters)`

3. The prompt or task description `.generate(task)`

To do this, we will be using [Unbody’s generative JSON endpoint](https://docs.unbody.io/generative-api/json-gen) which utlitize the [Zod library](https://github.com/colinhacks/zod) under the hood in order to validate and define the output of the model.

the general syntax is like the following. Unbody’s generative JSON receives two argumenst; a set of messages with role definition and a zod schema.

In Zod schema basicly we can define what the shape of enearive json should be like. Let’s start with the **concepts** field. Here’s a small snippet where we define a schema for just the concepts field using Zod:

- We’re expecting an array of strings (or `null` if nothing is extracted).

- The `.describe()` method adds a note so that anyone reading the code knows that this field represents the main search terms.

Next, we need to capture ingredients that the user wants to include. We do it the same way:

- Again, an array of strings (or `null`).

- The description clarifies that this field is for ingredients the user explicitly wants in the recipe.

## Build the Complete Schema

Now, let’s expand our schema by adding all the fields we expect from the query. This might include:

- **concepts** (main search terms)

- **includeIngredients** (ingredients to include)

- **excludeIngredients** (ingredients to exclude)

- **includeCuisineTypes** (preferred cuisine types)

- **totalTimeMinutesMax** (a maximum time constraint)

Here’s the full Zod schema with descriptions for every field:

Now that our schema is complete, lets create a function called `queryParser` and integrate the entire logic inot it.

Here’s the complete `parseQuery` function:

**Summery:**

- We pass our complete `querySchema` to the generative endpoint.

- The system message instructs the model to analyze the query.

- The returned payload (after validation) gives us a well-structured object containing all the extracted parameters.

In this snippet, the model processes the user’s input and returns a structured JSON object that you can later use to build precise queries.

If the query is:

> “Find me an Italian pasta with no sausage”

the returned JSON might look like this:

## From Parsed Parameters to a Complete RAG Query

Now that we’ve parsed the query into detailed parameters, it’s time to build the final RAG pipeline. Our pipeline consists of three parts:

1. **Semantic Search** using `.search.about(...)`

2. **Filtering** using `.where(...)`

3. **Generation** using `.generate.fromMany(...)`

Let’s break each piece down.

### Semantic Search with `.search.about()`

We want to search based on the main concepts extracted. If the model successfully extracts a non-empty array of concepts, we use that. Otherwise, we fallback to the full query.

This snippet ensures that our semantic search is as focused as possible by prioritizing specific keywords.

### Building the Filters with `.where()`

Now comes the slightly more complex part: turning each extracted filter into a proper “where” clause.

If the query has an `includeIngredients` array, we want to add a filter like:

But—what if `includeIngredients` isn’t provided? We only want to add this filter when it exists. So we use a conditional:

We conditionally spread the filter into our query. If `includeIngredients` exists, we include the filter; if not, we simply add an empty array.

Next, if the query specifies ingredients to exclude (for example, “no sausage”), we want to add a filter for each item:

Each ingredient that should be excluded is mapped into a `NotEqual` filter, and we conditionally add these only if they exist.

For cuisine types:

For the time constraint:

**Combining All Filters Using the ****`And`**** Operator**

Finally, we combine all these filters into a single query:

This final combined filter checks each parameter and only adds a condition if that parameter exists.

### Generating the Final Answer with `.generate.fromMany()`

After we’ve retrieved and filtered our documents, we use the generation step to produce a final, coherent answer:

The system message instructs the model to consider the retrieved results (indicated by `{$}`) when generating the response. The user message reiterates the original query for context.

## Bringing It All Together: The Complete RAG Pipeline

Here’s what the full API handler might look like (for example, in a Next.js project):

_Summary of the Flow:_

1. **Parsing:**

   The user’s free-form query is processed by `parseQuery()`, which returns a structured object with parameters like concepts, include/exclude ingredients, cuisine types, and time constraints.

2. **Retrieval:**

   With these parameters, we build our search query:

   - **Semantic Search:** `.search.about(...)` focuses on the extracted concepts.

   - **Filtering:** `.where(...)` applies each filter conditionally using the `And` operator.

   - **Limiting:** `.autocut(3)` keeps our result set manageable.

3. **Generation:**

   Finally, `.generate.fromMany(...)` produces a coherent answer that integrates the retrieved documents.

### Watch the Demo

Check out the full demo of this Agentic RAG system in action on YouTube:

### Get the Source Code

Interested in digging into the code? You can find the complete source code on GitHub:

<https://github.com/unbody-io/example-next.js/tree/recipes>

## Final Thoughts

In wrapping up, remember that by breaking down a complex query into its essential parts, you empower your application to truly understand your users. With Unbody’s Agentic RAG approach, you’re not just matching keywords—you’re capturing intention, filtering precisely, and generating meaningful, context-aware responses.

**Ready to build smarter, AI-native applications?**

- **Dive In:** Experiment with the sample code and start tailoring your own Agentic RAG pipeline.

- **Explore:** Check out the Unbody documentation for further insights and advanced use cases.

- **Join the Conversation:** We’d love to see what you create! Share your projects, ideas, or questions on our community forums or social channels.

- **Get Involved:** If you’re passionate about AI-native development, consider joining our open-source community and help shape the future of intelligent applications.

Happy building, and let’s push the boundaries of what our applications can do together!