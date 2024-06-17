---
title: With TextBlocks
__path__: >-
  [{"title":"Docs","route":"/docs"},{"title":"Get
  Started","route":"/docs/get-started"},{"title":"Step 2 -
  Building","route":"/docs/get-started/step-2-building"},{"title":"With
  TextBlocks","route":"/docs/get-started/step-2-building/build-with-textblocks"}]
---

### Start with simple data-retrieving

Start by retrieving all `TextBlock` entries from your source.

Unbody SDK

GraphQL

## 

Sample Response

### Perform a semantic search

Next, perform a semantic search on these text blocks by adding `.search.about` to the command. To streamline the payload, use the `select` method to specify exactly what fields should be included in the response.

Unbody SDK

GraphQL

## 

Sample Response

The response is smaller, containing only `text` and `tagName` due to the `select` method. It also includes an `_additional` field which provides information on the search, including `certainty` and `distance` which indicate the relevancy and accuracy of the result.

### Time for Some Generative Tasks

Now that we understand semantic search and data retrieval, let's enhance the existing code by adding generative features.

Unbody SDK

GraphQl

## 

Sample Response

[With GitHub](/docs/get-started/step-2-building/build-with-github "With GitHub")[Integrating with Next.Js](/docs/starters/nextjs "Integrating with Next.Js")