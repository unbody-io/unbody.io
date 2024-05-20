---
title: The only API you need to build AI-Native Apps - Unbody
---
# Make your first API call with Discord messages

Assuming you've already has gone through the [step 1](/docs/get-started/step-1-setup) and [step 2](/docs/get-started/step-2-building), let's now make your first API call with Discord messages.

## Start with simple data-retrieving[](#start-with-simple-data-retrieving)

Start by retrieving all messages from your designated Discord channel.

Unbody SDK

GraphQl

```
const {data: {payload}} = await unbody.get
    .discordMessage
    .exec()
```

## 

Sample Response

The response is a JSON array that includes the latest `100` Discord messages. Each item in the array is a `DiscordMessage` object containing default fields. You can adjust the returned fields using the `select` method.

### Perform a semantic search[](#perform-a-semantic-search)

Next, perform a semantic search on these messages by adding `.search.about` to the command. To streamline the payload, use the `select` method to specify exactly what fields should be included in the response.

Unbody SDK

GraphQl

```
const {data: {payload}} = await unbody.get
    .discordMessage
    .search
    .about("your search query")
    .select("content")
    .exec()
```

## 

Sample Response

The response is more focused, containing only `content` due to the `select` command. It also includes an `_additional` field that provides information on the search, including `certainty` and `distance` which indicate the relevancy and accuracy of the result.

### Time for Some Generative Tasks[](#time-for-some-generative-tasks)

Now that we understand semantic search and data retrieval, let's enhance the existing code by adding generative features.

This can be achieved by appending the `generate` command to the chain. For this guide, we'll use the `grouping` method. This method is used when we have a set of messages that we want to group. Then, we ask the AI model to generate something based on the combined content of these messages.

Unbody SDK

GraphQl

```
const {data: {generate}} = await unbody.get
    .discordMessage
    .search
    .about("a movie director")
    .limit(2)
    .select("content")
    .generate
    .fromMany(
        "your prompt here",
        ["content"]
    )
    .exec()
```

## 

Sample Response

## Next?[](#next)

You can now dive into more advanced features or get started with one of our starter templates.

## Advance Features[](#advance-features)

[With Google Drive](/docs/get-started/step-2-building/build-with-googledrive "With Google Drive")[With GitHub](/docs/get-started/step-2-building/build-with-github "With GitHub")