---
title: The only API you need to build AI-Native Apps - Unbody
---
# Make your first API call with Google Docs

Assuming you've already has gone through the [step 1](/docs/get-started/step-1-setup) and [step 2](/docs/get-started/step-2-setup), let's now make your first API call with Google Docs.

## Start with simple data-retrieving[](#start-with-simple-data-retrieving)

Start by retrieving all `GoogleDoc` files from your source.

Unbody SDK

GraphQl

```
const {data: {payload}} = await unbody.get
    .googleDoc
    .exec()
```

## 

Sample Response

The response is a JSON array that includes the latest `100` Google Docs. Each item in the array is a `GoogleDoc` object containing default fields. You can adjust the returned fields using the `select` method.

### Perform a semantic search[](#perform-a-semantic-search)

Next, perform a semantic search on these documents by adding `.search.about` to the command. To streamline the payload, use the `select` method to specify exactly what fields should be included in the response.

Unbody SDK

GraphQl

```
const {data: {payload}} = await unbody.get
    .googleDoc
    .search
    .about("your search query")
    .select("title", "autoSummary")
    .exec()
```

## 

Sample Response

The response is smaller, containing only `title` and `autoSummary` due to the `select` command. It also includes an `_additional` field which provides information on the search, including `certainty` and `distance` which indicate the relevancy and accuracy of the result.

### Time for Some Generative Tasks[](#time-for-some-generative-tasks)

Now that we understand semantic search and data retrieval, let's enhance the existing code by adding generative features.

This can be achieved by appending the `generate` command to the chain. Generally, we have two methods for the `generate` command: single and group. For more details about the differences between these methods, refer to the generative search page. For this guide, we'll stick to the `grouping` method. This method is used when we have a set of documents that we want to group. Then, we ask the AI model to generate something based on the combined data/content of these documents.

So far, we've had a search function that returns a set of search results. Now, we want to group those results and apply a generative prompt. Here's how you can achieve this using `_additional{generate}` in GraphQL or the `.generate.fromMany` command in the JS client:

Unbody SDK

GraphQl

```
const {data: {generate}} = await unbody.get
    .googleDoc
    .search
    .about(context)
    .limit(2)
    .select("title", "autoSummary")
    .generate
    .fromMany(
        prompt,
        ["title", "autoSummary", "autoTopics"]
    )
    .exec()
```

In this code, we've incorporated two new methods. The `limit` method confines the results and context for the generative query to the top 2 results. The `generate` method enables the generative feature. It takes two arguments: the `prompt` and the properties from the GoogleDoc object. We're instructing the API to consider only the content inside the `["title", "autoSummary", "autoTopics"]` fields. More information about the generative function is available here.

## 

Sample Response

[Step 2 - Building](/docs/get-started/step-2-building "Step 2 - Building")[With Discord](/docs/get-started/step-2-building/build-with-discord "With Discord")