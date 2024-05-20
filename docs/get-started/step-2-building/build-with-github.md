---
title: The only API you need to build AI-Native Apps - Unbody
---
# Step 2 / Make your first API call with Github Issues and its comments

Assuming you've already has gone through the [step 1](/docs/get-started/step-1-setup), let's now make your first API call with Github Issues and its comments.

## Start with simple data-retrieving[](#start-with-simple-data-retrieving)

Start by retrieving all `Comment` from `GitHubIssue` entries from your source.

Unbody SDK

GraphQl

```
    const {data: {payload}} = await unbody.get
    .githubComment
    .exec()
```

## 

Sample Response

### Perform a semantic search[](#perform-a-semantic-search)

Next, perform a semantic search on these issues/comments by adding `.search.about` to the command. To streamline the payload, use the `select` method to specify exactly what fields should be included in the response.

Unbody SDK

GraphQl

```
const {data: {payload}} = await unbody.get
    .githubComment
    .search
    .about("your search query")
    .select("text", "type")
    .exec()
```

## 

Sample Response

The response is smaller, containing only `text` and `type` due to the `select` method. It also includes an `_additional` field that provides information on the search, including `certainty` and `distance` which indicate the relevancy and accuracy of the result.

### Time for Some Generative Tasks[](#time-for-some-generative-tasks)

Now that we understand semantic search and data retrieval, let's enhance the existing code by adding generative features.

Unbody SDK

GraphQl

```
const {data: {generate}} = await unbody.get
    .githubComment
    .search
    .about("typescript")
    .limit(2)
    .select("text", "type", "html")
    .generate
    .fromMany(
        "What are the main issues about?",
        ["text", "type", "html"]
    )
    .exec()
```

## 

Sample Response

[With Discord](/docs/get-started/step-2-building/build-with-discord "With Discord")[With TextBlocks](/docs/get-started/step-2-building/build-with-textblocks "With TextBlocks")