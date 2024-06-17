---
title: Hybrid Search
__path__: >-
  [{"title":"Docs","route":"/docs"},{"title":"API","route":"/docs/api"},{"title":"Search","route":"/docs/api/search"},{"title":"Hybrid
  Search","route":"/docs/api/search/hybrid-search"}]
---

Hybrid search is a method that combines the benefits of both [semantic search](/docs/api/search/semantic-search) and [keyword search](/docs/api/search/keyword-search). This method provides users with comprehensive search results by considering both the meaning of the user's search query and the exact keywords used.

This method is best to use when you want to provide comprehensive and contextually relevant search results even when the user's search query contains both specific keywords and broader concepts.

## Syntax

Hybrid search can be performed on any text (`string`) field of any object. Here's how:

Unbody SDK

GraphQL

## Examples

### Example 1 - Google Drive / Google Docs

Unbody SDK

GraphQl

### Example 2 - Discord Messages

Unbody SDK

GraphQL

### Example 3 - Any text block

Unbody SDK

GraphQl

### Example 4 - Google Drive / Google Docs with specific fields

Unbody SDK

GraphQl

## Arguments

| arguments | Type | Default | Description |
| --- | --- | --- | --- |
| query | string |  | Query string |
| alpha | float |  | Search weight |
| fusionType | rankedFusion |  |  |
| relativeScoreFusion |  | Algorithm used for fusing results from vector and keyword search. |  |
| properties | string\[\] |  | Specify which fields to search |

## Advanced Hybrid Search

The advanced guide for Hybrid Search is helpful for those developers who are comfortable with the basics of Hybrid Search. If you haven’t had the chance to read the basics of Hybrid search, please visit [this page](/docs/api/search/hybrid-search).

## Fusion (Ranking) Method: Fine-Tune Your Results

When you're working with Hybrid Search, the way keyword and vector search results are combined can make a big difference. By default, Unbody uses `rankedFusion`, adding inverted ranks of both search methods. However, if you prefer, you can switch to `relativeScoreFusion` to add normalized scores instead. This option is especially useful when you want to prioritize the relevance of results.

The sample code given below demonstrates how you can do it.

Unbody SDK

GraphQl

## Target Specific Properties: Get Precise

💡

NOTE: This feature is available from v1.19.0 onwards

Unbody allows you to focus your search on specific fields of your data. you can target particular properties for the keyword portion of your search. Moreover, this doesn't affect the vector search, ensuring your semantic search remains broad and context-aware. Liked that? I guess, yesss!!

Take a look at the example given below.

Unbody SDK

GraphQl

## Boosting Properties: Give Priority Where Needed

Isn’t it true that some things deserve more attention than others? Well, the same is true for data. Sometimes, certain parts of your data might be more important than others. With property weighting, you can tell Unbody to give more importance to specific fields during the BM25 keyword search.

You can write a query as given below.

Unbody SDK

GraphQl

In the example given above, Unbody’s Hybrid Search considers matches in the title to be twice as important as matches in the content.

## Bring Your Own Vectors: Customized Semantic Search

Have you got your own vector? Great! You can provide it directly to the Hybrid Search and Unbody will use it for the vector part of the search. It will still consider your query string for the keyword search. This is perfect for when you have a very specific semantic context in mind.

The example given below shows you how you can form a query with your own vector.

Unbody SDK

GraphQl

## Add a Conditional Filter: Refine Your Search

You can add conditional filters to your hybrid search queries. These filters will refine the results without impacting the ranking. For example, if you want to search for articles about "coding in Python" but only if they are tagged as "tutorials", you can write the query as given below.

Unbody SDK

GraphQl

[Keyword Search](/docs/api/search/keyword-search "Keyword Search")[Visual Similarity](/docs/api/search/visual-similarity "Visual Similarity")