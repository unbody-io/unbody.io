---
title: The only API you need to build AI-Native Apps - Unbody
---
### Start with simple data-retrieving[](#start-with-simple-data-retrieving)

Start by retrieving all `TextBlock` entries from your source.

Unbody SDK

GraphQL

```
const {data: {payload}} = await unbody.get
.textBlock
.exec()
```

## 

Sample Response

### Perform a semantic search[](#perform-a-semantic-search)

Next, perform a semantic search on these text blocks by adding `.search.about` to the command. To streamline the payload, use the `select` method to specify exactly what fields should be included in the response.

Unbody SDK

GraphQL

```
const {data: {payload}} = await unbody.get
    .textBlock
    .search
    .about("your search query")
    .select("text", "tagName")
    .exec()
```

## 

Sample Response

The response is smaller, containing only `text` and `tagName` due to the `select` method. It also includes an `_additional` field which provides information on the search, including `certainty` and `distance` which indicate the relevancy and accuracy of the result.

### Time for Some Generative Tasks[](#time-for-some-generative-tasks)

Now that we understand semantic search and data retrieval, let's enhance the existing code by adding generative features.

Unbody SDK

GraphQl

```
const {data: {generate}} = await unbody.get
    .textBlock
    .search
    .about("a search query")
    .limit(2)
    .select("text")
    .generate
    .fromMany(
        "Your prompt goes here",
        ["text", "html", "footnotes"]
    )
    .exec()
```

## 

Sample Response

[With GitHub](/docs/get-started/step-2-building/build-with-github "With GitHub")[Integrating with Next.Js](/docs/starters/nextjs "Integrating with Next.Js")