---
title: Record Similarity
__path__: >-
  [{"title":"Docs","route":"/docs"},{"title":"API","route":"/docs/api"},{"title":"Search","route":"/docs/api/search"},{"title":"Record
  Similarity","route":"/docs/api/search/record-similarity"}]
---

Similarity Record is a way to see how alike objects are. You can use this to find objects that look like a specific one. For instance, if you have many Google Docs, you can use this to find docs that are like Doc A. In the past, you had to look at things like keywords or topics to find similar items. But with similarity search in Unbxd, this isn't necessary. You can compare the whole document.

## Syntax

Similarity search can be performed on any object. Here's how:

Unbody SDK

GraphQL

## Examples

### Example 1 - Google Drive / Google Docs

Find Google Docs that are similar to a specific Google Doc.

Unbody SDK

GraphQL

### Example 2 - Discord / Discord messages

Unbody SDK

GraphQL

### Example 3 - Any text block

Unbody SDK

GraphQL

## Arguments

| arguments | Type | Default | Description |  |
| --- | --- | --- | --- | --- |
| id | string |  | The ID of the object you want to find similar items to. |  |
| certainty | float |  | Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). |  |
| distance | float |  | The required degree of similarity between an object's characteristics and the provided filter values |  |
|  |  |  |  |  |
| beacon | string |  | Concept identifier in the beacon format |  |

[Visual Similarity](/docs/api/search/visual-similarity "Visual Similarity")[Generative](/docs/api/generative "Generative")