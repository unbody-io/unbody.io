---
title: QnA
__path__: >-
  [{"title":"Docs","route":"/docs"},{"title":"API","route":"/docs/api"},{"title":"QnA","route":"/docs/api/q-n-a"}]
---

# Generative QnA

Generative Q&A leverages the `ask{}` operator to directly extract answers from data objects, offering an intuitive querying tool for developers. This feature is accessible through our GraphQL interface or directly via our JavaScript SDK, making it versatile for different development environments.

The `ask{}` operator allows you to input a question directly into the query, and Unbody returns the specific answer, streamlining the process of extracting precise information from large datasets.

## Using the `ask{}` Operator

Here's how to structure your queries using the `ask{}` operator in both GraphQL and the JavaScript SDK to effectively use the Generative Q&A feature:

Unbody SDK (JavaScript)

GraphQL

### Example 1 - Generative Q&A for Document Retrieval

Unbody SDK (JavaScript)

GraphQL

### Understanding the Response

Both the JavaScript SDK and GraphQL responses for an `ask{}` query include detailed information about the answer:

Unbody SDK (JavaScript)

GraphQL

## Summary

Generative Q&A provides a direct method to query and extract specific answers using natural language questions, making it ideal for obtaining precise information quickly and efficiently. Both the JavaScript SDK and GraphQL offer robust support for implementing this feature.

[Generative](/docs/api/generative "Generative")[Get](/docs/api/query-methods/get "Get")