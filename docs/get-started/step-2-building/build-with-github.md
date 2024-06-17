---
title: With GitHub
__path__: >-
  [{"title":"Docs","route":"/docs"},{"title":"Get
  Started","route":"/docs/get-started"},{"title":"Step 2 -
  Building","route":"/docs/get-started/step-2-building"},{"title":"With
  GitHub","route":"/docs/get-started/step-2-building/build-with-github"}]
---

# Step 2 / Make your first API call with Github Issues and its comments

Assuming you've already has gone through the [step 1](/docs/get-started/step-1-setup), let's now make your first API call with Github Issues and its comments.

## Start with simple data-retrieving

Start by retrieving all `Comment` from `GitHubIssue` entries from your source.

Unbody SDK

GraphQl

## 

Sample Response

### Perform a semantic search

Next, perform a semantic search on these issues/comments by adding `.search.about` to the command. To streamline the payload, use the `select` method to specify exactly what fields should be included in the response.

Unbody SDK

GraphQl

## 

Sample Response

The response is smaller, containing only `text` and `type` due to the `select` method. It also includes an `_additional` field that provides information on the search, including `certainty` and `distance` which indicate the relevancy and accuracy of the result.

### Time for Some Generative Tasks

Now that we understand semantic search and data retrieval, let's enhance the existing code by adding generative features.

Unbody SDK

GraphQl

## 

Sample Response

[With Discord](/docs/get-started/step-2-building/build-with-discord "With Discord")[With TextBlocks](/docs/get-started/step-2-building/build-with-textblocks "With TextBlocks")