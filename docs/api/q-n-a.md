---
title: The only API you need to build AI-Native Apps - Unbody
---
# Generative QnA

Generative Q&A leverages the `ask{}` operator to directly extract answers from data objects, offering an intuitive querying tool for developers. This feature is accessible through our GraphQL interface or directly via our JavaScript SDK, making it versatile for different development environments.

The `ask{}` operator allows you to input a question directly into the query, and Unbody returns the specific answer, streamlining the process of extracting precise information from large datasets.

## Using the `ask{}` Operator[](#using-the-ask-operator)

Here's how to structure your queries using the `ask{}` operator in both GraphQL and the JavaScript SDK to effectively use the Generative Q&A feature:

Unbody SDK (JavaScript)

GraphQL

```
unbody.get.<object_name>.ask("Your question here", {
    properties: ["property1", "property2"],
    certainty: 0.75,
    rerank: true
})
```

### Example 1 - Generative Q&A for Document Retrieval[](#example-1---generative-qa-for-document-retrieval)

Unbody SDK (JavaScript)

GraphQL

```
unbody.get
.document
.ask("Who directed '2001: A Space Odyssey'?", {
    properties: ["summary"]
})
 
// This query returns the document's title where the answer is located
```

### Understanding the Response[](#understanding-the-response)

Both the JavaScript SDK and GraphQL responses for an `ask{}` query include detailed information about the answer:

Unbody SDK (JavaScript)

GraphQL

```
{
    "title": "2001: A Space Odyssey",
    "answer": {
        "hasAnswer": true,
        "result": "Stanley Kubrick",
        "summaryPosition": {
            "start": 15,
            "end": 54
        }
    }
}
```

## Summary[](#summary)

Generative Q&A provides a direct method to query and extract specific answers using natural language questions, making it ideal for obtaining precise information quickly and efficiently. Both the JavaScript SDK and GraphQL offer robust support for implementing this feature.

[Generative](/docs/api/generative "Generative")[Get](/docs/api/query-methods/get "Get")