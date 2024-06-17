---
title: With Discord
__path__: >-
  [{"title":"Docs","route":"/docs"},{"title":"Get
  Started","route":"/docs/get-started"},{"title":"Step 2 -
  Building","route":"/docs/get-started/step-2-building"},{"title":"With
  Discord","route":"/docs/get-started/step-2-building/build-with-discord"}]
---

# Make your first API call with Discord messages

Assuming you've already has gone through the [step 1](/docs/get-started/step-1-setup) and [step 2](/docs/get-started/step-2-building), let's now make your first API call with Discord messages.

## Start with simple data-retrieving

Start by retrieving all messages from your designated Discord channel.

Unbody SDK

GraphQl

## 

Sample Response

The response is a JSON array that includes the latest `100` Discord messages. Each item in the array is a `DiscordMessage` object containing default fields. You can adjust the returned fields using the `select` method.

### Perform a semantic search

Next, perform a semantic search on these messages by adding `.search.about` to the command. To streamline the payload, use the `select` method to specify exactly what fields should be included in the response.

Unbody SDK

GraphQl

## 

Sample Response

The response is more focused, containing only `content` due to the `select` command. It also includes an `_additional` field that provides information on the search, including `certainty` and `distance` which indicate the relevancy and accuracy of the result.

### Time for Some Generative Tasks

Now that we understand semantic search and data retrieval, let's enhance the existing code by adding generative features.

This can be achieved by appending the `generate` command to the chain. For this guide, we'll use the `grouping` method. This method is used when we have a set of messages that we want to group. Then, we ask the AI model to generate something based on the combined content of these messages.

Unbody SDK

GraphQl

## 

Sample Response

## Next?

You can now dive into more advanced features or get started with one of our starter templates.

## Advance Features

[With Google Drive](/docs/get-started/step-2-building/build-with-googledrive "With Google Drive")[With GitHub](/docs/get-started/step-2-building/build-with-github "With GitHub")