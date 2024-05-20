---
title: The only API you need to build AI-Native Apps - Unbody
---
# Start building with Unbody

Unbody is essentially an API that primarily utilizes a GraphQL interface. To interact with Unbody, you can either use GraphQL queries directly or employ one of the SDKs provided. Access to any of the endpoints, whether through direct GraphQL queries or SDKs, requires an API key.

### Obtain an API key[](#obtain-an-api-key)

Let's begin by creating an API key. Start from your dashboard and navigate to your project page. You'll see three tabs at the top labeled `sources`, `graphql`, and `settings`. Click on the `settings` tab to navigate to the settings page. Here, locate the `developer-settings` sub-page. This is where you can create an `API-key`.

Now, using this API key together with the `project-id` you can send requests to the API.

This is how you can authorize your API calls.

Unbody SDK

CURL

Vanilla JS

Using Unbody typescript client all you need to create a new instance of Unbody SKD we will be using this instance in order to make all various API calls.

unbody.ts

```
const unbody = new Unbody({
    apiKey: "<API_KEY>",
    projectId: "<PROJECT_ID>",
});
```

### Make Your First API Call[](#make-your-first-api-call)

Below is a guide tailored to the type of sources and files in your projects. Please follow the steps that apply to your situation.

[

![Google Drive with Google Docs](/provider-icons/Drive.svg)

Google Drive with Google Docs

Choose this option if you have a Google Drive with Google Docs.





](/docs/get-started/step-2-building/build-with-googledrive)[

![Discord Channel with Messages](/provider-icons/Discord.svg)

Discord Channel with Messages

Choose this option if you have a Discord Channel with Messages.





](/docs/get-started/step-2-building/build-with-discord)[

![Github Issues with Comments](/provider-icons/Github.svg)

Github Issues with Comments

Choose this option if you have a Github Issues with Comments.





](/docs/get-started/step-2-building/build-with-github)[

![Text Blocks](/icons/menu-board.svg)

Text Blocks

Choose this option if you want to work with text blocks regardless of their sources.





](/docs/get-started/step-2-building/build-with-textblocks)

[Step 1 - Setup](/docs/get-started/step-1-setup "Step 1 - Setup")[With Google Drive](/docs/get-started/step-2-building/build-with-googledrive "With Google Drive")