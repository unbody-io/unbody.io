---
title: The only API you need to build AI-Native Apps - Unbody
---
Similarity Record is a way to see how alike objects are. You can use this to find objects that look like a specific one. For instance, if you have many Google Docs, you can use this to find docs that are like Doc A. In the past, you had to look at things like keywords or topics to find similar items. But with similarity search in Unbxd, this isn't necessary. You can compare the whole document.

## Syntax[](#syntax)

Similarity search can be performed on any object. Here's how:

Unbody SDK

GraphQL

```
unbody.get.<object_name>.search.similar.record(objectId, {...options})
```

## Examples[](#examples)

### Example 1 - Google Drive / Google Docs[](#example-1---google-drive--google-docs)

Find Google Docs that are similar to a specific Google Doc.

Unbody SDK

GraphQL

```
unbody.get
    .googleDoc
    .search
    .similar
    .record("specificDocId");
```

### Example 2 - Discord / Discord messages[](#example-2---discord--discord-messages)

Unbody SDK

GraphQL

```
unbody.get
    .discordMessage
    .search
    .similar
    .record("specificMessageId");
 
// payload is an array of DiscordMessages that are similar to the specific message with id "specificMessageId"
```

### Example 3 - Any text block[](#example-3---any-text-block)

Unbody SDK

GraphQL

```
unbody.get
    .textBlock
    .search
    .similar
    .record("specificTextBlockId");
 
// payload is an array of textBlocks that are similar to the specific text block with id "specificTextBlockId"
// this search includes all types of objects available in the sources of your project
// so the result here can be a mixed from Google Docs, Markdown files on Google Drive and/or some Github Repos
```

## Arguments[](#arguments)

| arguments | Type | Default | Description |  |
| --- | --- | --- | --- | --- |
| id | string |  | The ID of the object you want to find similar items to. |  |
| certainty | float |  | Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). |  |
| distance | float |  | The required degree of similarity between an object's characteristics and the provided filter values |  |
|  |  |  |  |  |
| beacon | string |  | Concept identifier in the beacon format |  |

[Visual Similarity](/docs/api/search/visual-similarity "Visual Similarity")[Generative](/docs/api/generative "Generative")