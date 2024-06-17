---
title: Visual Similarity
__path__: >-
  [{"title":"Docs","route":"/docs"},{"title":"API","route":"/docs/api"},{"title":"Search","route":"/docs/api/search"},{"title":"Visual
  Similarity","route":"/docs/api/search/visual-similarity"}]
---

This method can be particularly useful when you want to find images that have a similar aesthetic, color scheme, or subject matter. It works by comparing the visual characteristics of the images and determining how similar they are.

## Syntax

Visual similarity search can be performed on any 'imageBlock'. Here's how:

Unbody SDK

GraphQL

## Examples

-   Example 1 - image blocks
    
    ```
    const {data: {payload}} = await unbody.get.imageBlock.similar.image("image url or base64");
    // payload is an array of ImageBlocks that are visually similar to the specific image with id "specificImageId"
    ```
    

### Arguments

| arguments | Type | Default | Description |
| --- | --- | --- | --- |
| image | string |  | Image url or base64 |
| certainty | float |  | Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). |
| distance | float |  | The required degree of similarity between an image's visual characteristics and the provided filter values |

[Hybrid Search](/docs/api/search/hybrid-search "Hybrid Search")[Record Similarity](/docs/api/search/record-similarity "Record Similarity")