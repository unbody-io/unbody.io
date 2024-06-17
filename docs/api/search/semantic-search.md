---
title: Semantic Search
__path__: >-
  [{"title":"Docs","route":"/docs"},{"title":"API","route":"/docs/api"},{"title":"Search","route":"/docs/api/search"},{"title":"Semantic
  Search","route":"/docs/api/search/semantic-search"}]
---

Semantic search is a method that lets users search data based on the meaning of their query. Users can use any form of natural human language and still get the same results. This differs from classic search, which relies on exact keyword matching.

For instance, if you've got a collection of documents about Quentin Tarantino, Maradona, and Elon Musk, the user doesn't need to type the full term "Quentin Tarantino" to find documents about him. Instead, they can enter phrases like "a movie director" or "who made Pulp Fiction" and still reach the same results. This method is best to use when you need to provide a more intuitive and user-friendly search experience, handle queries with ambiguity, or when you want to provide more relevant search results based on the context of the query.

## Syntax

You can perform semantic searches on virtually any text (`string`) field of any object. Here's how:

Unbody SDK

GraphQL

### Example 1 - Google Drive / Google Docs

Unbody SDK

GraphQL

### Example 2 - Discord / Discord messages

Unbody SDK

GraphQL

### Example 3 - Any text block

Unbody SDK

GraphQL

## Semantic Search: Advanced Guide

This guide is designed for developers who have a good grasp of the [basics of semantic search](/docs/api/search/semantic-search) and are ready to explore more sophisticated functionalities to enhance their search capabilities. Let’s dive in, folks!

We have already explained vector space in the previous doc. **`nearVector`** provides direct access to the vector space, allowing for precise navigation and customized search experiences. Here, we’ll explore advanced techniques and use cases to fully leverage this powerful feature.

### Fine-Tuning with moveTo and moveAwayFrom

**`moveTo`** and **`moveAwayFrom`** are very powerful advanced functionalities that enable you to steer your search query towards or away from specific concepts. You can probably sense how powerful this concept is which gives you precise control over your search results.

-   **Example: Balancing Concepts** For example, let us consider you’re searching for articles related to web development, but you want a balanced view, considering both frontend and backend perspectives. The example given below imitates the scenario.

Unbody SDK

GraphQL formatted

### Utilizing Custom Vectors

If you have access to custom words or document vectors, **`nearVector`** allows you to integrate them directly into your search queries.

Unbody SDK

GraphQl formatted

## Optimizing Search with Boosting and Filtering

Let us now have a look at how you can enhance your search results by boosting certain properties and applying filters to hone in on the most relevant data.

### Property Boosting

Some of the properties in the data are more relevant than others. You can boost the relevance of specific properties in your data to ensure they have a greater impact on the search results.

-   **Example: Boosting Titles**

Unbody SDK

GraphQl formatted

### Conditional Filtering

You can also apply filters to your semantic search queries. It helps to narrow down results based on specific conditions.

-   **Example: Filtering by Tags**

Unbody SDK

GraphQl formatted

[Search](/docs/api/search "Search")[Keyword Search](/docs/api/search/keyword-search "Keyword Search")