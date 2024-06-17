---
title: >-
  How to build a Google Meet AI assistant app in 10 minutes with Unbody &
  AppSmith
authors:
  - name: Bobur Umurzokov
    link: https://www.linkedin.com/in/boburumurzokov/
    image: bobur.jpeg
audience_group: low-coders, no-coders
outline: >-
  Learn how to develop an AI meeting assistant app that processes video
  recordings from Google Meet, writes notes, captures action items, and
  generates summaries with almost no code.
seo_tags: >-
  No-code, Low-code AI APP, AI Assistant app, Google meet AI app, Google meet AI
  assistant,
category:
  - guide
subtitle: >-
  Learn how to develop an AI meeting assistant app that processes video
  recordings from Google Meet, writes notes, captures action items, and
  generates summaries with almost no code.
date: '2023-12-13T00:00:00.000Z'
image: images/blog/gmeet-ai-assistant-appsmith.png
__path__: >-
  [{"title":"Blog","route":"/blog"},{"title":"How to build a Google Meet AI
  assistant app in 10 minutes with Unbody &
  AppSmith","route":"/blog/gmeet-ai-assistant-appsmith"}]
---

December 13th, 2023 |

[Bobur Umurzokov](https://www.linkedin.com/in/boburumurzokov/)

# How to build a Google Meet AI assistant app in 10 minutes with Unbody & AppSmith

#### Learn how to develop an AI meeting assistant app that processes video recordings from Google Meet, writes notes, captures action items, and generates summaries with almost no code.

Effective communication and efficient meeting management are key to a team's success in the modern workplace. Recognizing this, we will develop an **AI-powered meeting assistant app** to transform Google Meet recordings into automatically generated meeting notes with key takeaways and action items. The blog post is tailored for every creator from developers to no-coders who are interested in the intersection of AI and productivity tools. It's particularly useful for those with limited AI-development experience and who want to build AI applications by using simple low-code tools like [Unbody (opens in a new tab)](https://www.unbody.io/) and [Appsmith (opens in a new tab)](https://www.appsmith.com/).

## Introducing the AI-powered meetings assistant app

Think about the app that connects your [Google Drive (opens in a new tab)](https://drive.google.com/drive/my-drive) where all your [Google Meet (opens in a new tab)](https://support.google.com/meet/answer/9308681?hl=en#zippy=%2Crequirements-to-record-a-video-meeting%2Clearn-how-to-record-a-meeting) video recordings are saved and automatically captures meeting audio transcriptions and generates meeting notes with key points and action items in real-time. You can fully engage in the conversation during the meeting without taking notes alone. If you are running late or can’t make the meeting, the app will still take notes. The app can make virtual meetings more productive including team leaders, project managers, developers, and anyone who regularly uses Google Meet can benefit from using it.

Of course, there are many existing solutions like [Otter.ai (opens in a new tab)](https://otter.ai/) or [Fathom (opens in a new tab)](https://fathom.video/) in the market. But in case you want to build a tool yourself and customize the output of it, then you are on the same page as me. To develop this application, we will use Unbody to convert input video transcriptions into intelligence/generative content and Appsmith to make it easy to design and build the UI of our app without extensive front-end coding. Let’s understand the role of each in the app.

**Unbody is the brain**

[Unbody (opens in a new tab)](https://unbody.io/) is at the heart of our tool behind knowledge insertion like audio transformation to transcripts and creating AI assistant summaries and knowledge delivery via GraphQL API. Using Unbody’s advanced AI-enabled transformation and [content analysis (opens in a new tab)](https://www.unbody.io/docs), our project identifies and magically extracts action items from meeting audio of any type. It converts them into structured content ensuring no critical information is missed.

Unbody can also aggregate and synchronize various types of files including text documents, PDFs, spreadsheets, images, and videos. For instance, a PDF file in Google Drive, an image shared in a Slack channel, or video files in a local folder can all be continuously synced to Unbody. Learn more about Unbody in the article: [All AI buzz in one endpoint, one line of code article (opens in a new tab)](https://www.unbody.io/blog/hello-world) by [Amir Houieh (opens in a new tab)](https://www.linkedin.com/in/amirhouieh/).

****Appsmith is our frontend****

[Appsmith (opens in a new tab)](https://www.appsmith.com/) is an open-source low-code platform designed to help developers build internal tools quickly and efficiently. It serves as the frontend of our app, providing a customizable and interactive dashboard for viewing meeting summaries and action items. Appsmith connects to the GraphQL exposed by Unbody as a data source, and fetches and displays data in [widgets (opens in a new tab)](https://docs.appsmith.com/reference/widgets).

Follow this [one-click demo (opens in a new tab)](https://app.appsmith.com/app/unbody-appsmith-graphql-showcase/report-6576eccbccfc99526bd6dbfc?branch=master) link to see the running app on Appsmith Cloud.

## **How it works**

All you need to do are:

1.  [Enable video recording (opens in a new tab)](https://support.google.com/meet/answer/9308681?hl=en) during your Google Meet sessions and recordings are uploaded automatically to the [My Drive > Meet Recordings folder (opens in a new tab)](https://drive.google.com/drive/my-drive) in your Google Drive.
2.  Connect Google Drive as a [content source (opens in a new tab)](https://www.unbody.io/docs/getting-started#3-connect-your-content-sources) to Unbody. Unbody fetches the latest changes on your drive upon any change detected. The Unbody’s [AI-powered engine (opens in a new tab)](https://www.unbody.io/docs) processes the content and indexes. For example, we use Unbody to extract key points and decisions from the video transcription.
3.  Retrieve the result from Unbody’s content API using GraphQL. You write custom GraphQL queries to get a summary of the meeting and identify specific action items. The GraphQL endpoint acts as a data interface between your video recordings in Google Drive and the Appsmith dashboard.
4.  Access the Appsmith dashboard to view the meeting summary and action items. The dashboard provides a real-time overview of all ongoing tasks and deadlines. The below picture illustrates the dashboard with example data:

_Meeting AI Assistant generated report on Appsmith dashboard_

See the following GIF to understand the whole process:

_The process of creating Google Meet AI Assistant app with Unbody_

## How to set up and run the project

The project source code for Appsmith UI with sample GraphQL queries has already been implemented and you can see the GitHub repository [https://github.com/Boburmirzo/unbody-appsmith-graphql-showcase (opens in a new tab)](https://github.com/Boburmirzo/unbody-appsmith-graphql-showcase). To set up the Unbody content API, connect to your own Google Drive, and run the UI, you need to follow this guide.

****Prerequisites****

1.  You use [Google Meet (opens in a new tab)](https://meet.google.com/) and [meet the requirements (opens in a new tab)](https://support.google.com/meet/answer/9308681?sjid=4784842763624137765-EU#zippy=%2Cmake-sure-your-google-drive-has-enough-space%2Clearn-how-to-record-a-meeting%2Crequirements-to-record-a-video-meeting) to record a video meeting.
2.  You have an Unbody account. [Create a new account (opens in a new tab)](https://app.unbody.io/) for free if you do not have it.
3.  You have an Appsmith account. [Sign up for a new account (opens in a new tab)](https://www.notion.so/496e3632e67644639760c70bad65ad93?pvs=21).
4.  You forked the [GitHub repo (opens in a new tab)](https://github.com/Boburmirzo/unbody-appsmith-graphql-showcase).

### Step 1: Activate a video recording in Google Meet

Once you are in the meeting, start a video recording and transcript in your Google Meet session.

Start the Google Meet recording to generate transcriptions for Unbody

Once the recording is stopped or the meeting ends, it is automatically saved to your Google Drive in a folder labeled "[Meet Recordings (opens in a new tab)](https://drive.google.com/drive/my-drive)”.

_Video recording is automatically saved to Google Drive_

### Step 2: Setting up the Unbody project

1.  **Access** your [Unbody Dashboard (opens in a new tab)](https://app.unbody.io/) and start with creating a new project. First you might want to configure the AI engines and features.

_Unbody Features setting_

Unbody uses an advanced AI technology known as large language models (LLMs) to interpret text input. These models come in various types and configurations, and Unbody provides a broad selection. We are going to use two features: [text-vectorizer (opens in a new tab)](https://www.unbody.io/docs/vectorizers/text-vectorizers) and [generative search (opens in a new tab)](https://www.unbody.io/docs/generative-search#generative-search-engines).

**Text vectorizer** transforms the transcription of your Google Meet videos into a format understandable to the AI. For the model choice to vectorize transcriptions, I recommend using the open-source and free [Contextionary (opens in a new tab)](https://www.unbody.io/docs/vectorizers/text-vectorizers#cohere-text2vec-cohere) option.

ℹ️

**More technical insight about Text Vectorizer**

It’s an algorithm that creates a vector representation of transcriptions. The vector representation is just floating point numbers like 5.5, 0.25, and - 1.2. The distance between two vectors measures their relatedness. Small distances suggest high relatedness and large distances suggest low relatedness. Unbody also indexes vector representations for easy search. Think of it as organizing books in a library so they're easy to find. Learn more about vector indexing [here (opens in a new tab)](https://www.unbody.io/docs/vectorizers/text-vectorizers).

After Unbody indexed the data, Unbody offered various [generative search (opens in a new tab)](https://www.unbody.io/docs/generative-search#generative-search-engines) engines —currently only ones from [OpenAI (opens in a new tab)](https://www.unbody.io/docs/generative-search#generative-search-engines) (ChatGPT) — to enable generative actions on top of your text materials. GPT is very good at understanding and using language in a way that's similar to humans. The engine helps us to summarize what was discussed in the meeting and identify any tasks or 'action items' that need to be done. It's like having an assistant who listens to your meetings and then tells you the key points and what needs to be done next. Unbody also supports other generative engines in the future, offering you more options to choose from.

2.  **Connect** to Google Drive and Google Calendar (optional if you also need event details included in the app).

_Unbody create a new project with data sources_

After you successfully connect to data sources, you should see Google Drive and Google Calendar in the sources list:

_Google Drive and Calendar are chosen data sources for Unbody_

### Step 4: Write GraphQL queries

Unbody has user user-friendly GraphQL playground, you can open the GraphQL tab and try existing queries in the repo that [extracts action items (opens in a new tab)](https://github.com/Boburmirzo/unbody-appsmith-graphql-showcase/blob/master/pages/Report/queries/Unbody_Action_Items_API/Unbody_Action_Items_API.txt) or [fetches event booking details (opens in a new tab)](https://github.com/Boburmirzo/unbody-appsmith-graphql-showcase/blob/master/pages/Report/queries/Unbody_Google_Calendar_API/Unbody_Google_Calendar_API.txt) from the Google Calendar or craft your new queries.

_Writing custom queries on Unbody GraphQL playground_

### Step 5: Setting up the frontend with Appsmith

Next, you bring the existing [Appsmith application (opens in a new tab)](https://github.com/Boburmirzo/unbody-appsmith-graphql-showcase) from the [GitHub repository (opens in a new tab)](https://github.com/Boburmirzo/unbody-appsmith-graphql-showcase). You import it to a new workspace in your Appsmith account. Follow the steps given in the [Import From Repository (opens in a new tab)](https://docs.appsmith.com/advanced-concepts/version-control-with-git/import-from-repository) on the Appsmith website.

> You can also install [Appsmith using Docker (opens in a new tab)](https://docs.appsmith.com/getting-started/setup/installation-guides/docker) on your local machine in addition to use cloud version of it.

Once the import is complete, you’ll see the canvas similar to this:

_Example of Appsmith canvas to build UI apps_

You can use the drag-and-drop interface to customize the dashboard. Modify or add widgets like tables, text boxes, and buttons as needed. Note that Appsmith doesn't export any secret configuration or header values used for connecting a data source such as Unbody `API_KEY`and `PROJECT_ID`. You need to find your [personal API key (opens in a new tab)](https://www.unbody.io/docs/api/authorization) and project ID generated in the Unbody Dashboard and configure manually in the data source headers similar to this:

_Connect Unbody as a data source to Appsmith_

As you can see, the project sets up a data source in Appsmith to connect to your Unbody GraphQL server. Use this to fetch meeting summaries and display them in the dashboard. Other API queries, UI pages, and widgets are automatically created after the import.

_Register Unbody GraphQL queries for Appsmith_

You can run the app by clicking the _**Preview**_ button on the top right of the screen and finally, you see the dashboard with all the data:

_Appsmith meeting AI assistant repo UI demo_

## **Conclusion**

You now have a fully functional application that can transform Google Meet video recordings into actionable summaries and tasks. AI-powered meeting report app is a good example of turning any content into an intelligible and queryable knowledge base. You utilized a RAG (Retrieval-Augmented Generation) approach to deliver an intuitive and powerful content interaction platform through a single GraphQL endpoint. Also, using an Appsmith’s low-code drag-and-drop interface, significantly reduced the time and effort typically required for such a full-stack task. For more advanced functionalities, both Unbody and Appsmith allow the use of [JavaScript (opens in a new tab)](https://docs.appsmith.com/write-code/reference/Built-in-JS-Libraries) and [TypeScript (opens in a new tab)](https://www.unbody.io/docs/libraries/overview), giving developers the flexibility to write custom logic.

## Next steps

This setup guide provides a basic framework, which you can expand and customize according to your specific requirements. In the application, you noticed that there is another non-finished page called ****Ask Meeting Notes.**** Apply the knowledge you learned in this article and implement a new GraphQL query using the [Generative Q&A (opens in a new tab)](https://www.unbody.io/docs/api/search/generative-qa) feature, [bringing data (opens in a new tab)](https://www.unbody.io/docs/api/search/generative-qa) to the output text widget. Users can search for specific information from the meetings in the search bar.

[AI for your data, from anywhere in any format.](/blog/ai-for-your-data "AI for your data, from anywhere in any format.")[AI in 2023: Paradoxical Advancement](/blog/ai-in-2023 "AI in 2023: Paradoxical Advancement")