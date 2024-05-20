---
title: The only API you need to build AI-Native Apps - Unbody
---
Keyword search is a method that allows users to search your data based on specific keywords. Unlike [semantic search](/docs/api/semantic-search) which focuses on the meaning of the search query, keyword search relies on exact matches of the keywords used in the search query.

This method is best to use when you want to provide quick and straightforward search results. It is especially effective when dealing with large databases where users are familiar with the specific keywords used within the data.

### Syntax[](#syntax)

Keyword search can be operated on an any object's `string` or `string[]` field. Here's how:

Unbody SDK

GraphQL

```
unbody.get.<object_name>.search.find("query", {...options})
```

## Examples[](#examples)

### Example 1 - Google Drive / Google Docs[](#example-1---google-drive--google-docs)

Unbody SDK

GraphQL

```
const {data: {payload}} = await unbody.get
    .googleDoc
    .search
    .find("specific keyword");
 
// payload is an array of GoogleDocs that match "specific keyword"
```

### Example 3 - Any text block[](#example-3---any-text-block)

Unbody SDK

GraphQL

```
const {data: {payload}} = await unbody.get
    .textBlock
    .search
    .find("specific keyword");
 
// payload is an array of textBlocks that match "specific keyword"
// this search includes all types of objects available in the sources of your project
// so the result here can be a mixed from Google Docs, Markdown files on Google Drive and/or some Github Repos
```

### Example 4 - Google Drive / Google Docs - specific fields[](#example-4---google-drive--google-docs---specific-fields)

Unbody SDK

GraphQL

```
const {data: {payload}} = await unbody.get
    .googleDoc
    .search
    .find("specific keyword", ["title", "autoSummary"]);
 
// payload is an array of GoogleDocs that match "specific keyword" - but here the search only is executed over two specifiec fields; "title" and "autoSummary"
```

## Arguments[](#arguments)

| arguments | Type | Default | Description |
| --- | --- | --- | --- |
| query \* | string, string\[\] |  |  |
| fields | string\[\] |  | Specify which fields to search, |

[Semantic Search](/docs/api/search/semantic-search "Semantic Search")[Hybrid Search](/docs/api/search/hybrid-search "Hybrid Search")