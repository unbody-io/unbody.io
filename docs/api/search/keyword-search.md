---
title: Keyword Search
__path__: >-
  [{"title":"Docs","route":"/docs"},{"title":"API","route":"/docs/api"},{"title":"Search","route":"/docs/api/search"},{"title":"Keyword
  Search","route":"/docs/api/search/keyword-search"}]
---

Keyword search is a method that allows users to search your data based on specific keywords. Unlike [semantic search](/docs/api/semantic-search) which focuses on the meaning of the search query, keyword search relies on exact matches of the keywords used in the search query.

This method is best to use when you want to provide quick and straightforward search results. It is especially effective when dealing with large databases where users are familiar with the specific keywords used within the data.

### Syntax

Keyword search can be operated on an any object's `string` or `string[]` field. Here's how:

Unbody SDK

GraphQL

## Examples

### Example 1 - Google Drive / Google Docs

Unbody SDK

GraphQL

### Example 3 - Any text block

Unbody SDK

GraphQL

### Example 4 - Google Drive / Google Docs - specific fields

Unbody SDK

GraphQL

## Arguments

| arguments | Type | Default | Description |
| --- | --- | --- | --- |
| query \* | string, string\[\] |  |  |
| fields | string\[\] |  | Specify which fields to search, |

[Semantic Search](/docs/api/search/semantic-search "Semantic Search")[Hybrid Search](/docs/api/search/hybrid-search "Hybrid Search")