---
title: The only API you need to build AI-Native Apps - Unbody
---
# Setup Unbody

This step will happen all on [Unbody’s dashboard (opens in a new tab)](https://app.unbody.io). Via the dashboard, you can manage anything about your account, subscription, projects, and more.

### Create a Project[](#create-a-project)

To begin using Unbody for a project, you first need to create a project space 😀. Essentially, each project serves as a separate container for your data. If you're managing distinct datasets for two different websites, you'll need two separate projects. However, if you're utilizing the same datasets across multiple applications, a single project is sufficient. ([learn more (opens in a new tab)](https://www.notion.so/Getting-started-7ea06be0e737441c8313a61d426ab53c?pvs=21))

On the dashboard homepage, click the "Create a new project" button. A dialogue will open where you need to name your project and set configurations for AI models and other features. You can either choose from one of the presets or navigate to the advanced panel for more flexibility. For this guide, select the `Generative OpenAI` preset. Click on `create project`. You'll automatically be redirected to the newly created project page.

### Add source(s)[](#add-sources)

You're now on the project page. Here, you can start adding data sources. A data source refers to the origin of your data (e.g., Google Drive, Discord Channel, or a Github Repository). Learn more about sources here. Click on "Add New Source" to open a dialog with four steps.

### Select a provider[](#select-a-provider)

Choose the platform where your content is stored. For example, if it's stored in Google Drive, select it as the content provider. Visit [providers](/docs/get-started/docs/providers) for more information.

### Connect Unbody to your source[](#connect-unbody-to-your-source)

Allow Unbody to access your content from the selected provider. Learn more about this on [our privacy page](/privacy).

### Set an entry point[](#set-an-entry-point)

Specify where Unbody should find your data on the chosen source. The entry points vary between source providers. For Google Drive, the entry point is a "folder," and for Discord, it's a "channel."

### Initialize Your Content[](#initialize-your-content)

Navigate to next step and click "initialize". Unbody will index the content from your entry point. Once the process is completed, the dashboard will display the number of records processed.

Please note that the time taken to index your content depends on the size of your content. You can only start interacting with your content once the indexing process is completed. Wait until the source status turns to idle and you see a certain number of records on your source card.

## Next[](#next)

Ready? let's move on to the next step.

[

![Start building with Unbody](/icons/arrow-right.svg)

Start building with Unbody

Learn how to start building with Unbody.





](/docs/get-started/step-2-building)

[Get Started](/docs/get-started "Get Started")[Step 2 - Building](/docs/get-started/step-2-building "Step 2 - Building")