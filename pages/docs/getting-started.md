# Getting Started
---
> 🔔 **A Quick Note to Our Users:**
>
> We're in the process of refining and expanding our documentation to offer you a comprehensive guide to Unbody. Meanwhile, this page aims to provide crucial initial insights for our early adopters to get started seamlessly. Your patience and support mean the world to us. Feedback, questions, or suggestions? Feel free to reach out to us via email at [hello@unbody.io](mailto:hello@unbody.io) or join our vibrant community on [Discord](https://discord.gg/VVdcEhDs). Thank you for being a part of our journey!

Unbody introduces a third-generation content management system. The first generation of CMSs, like WordPress, tightly coupled content with presentation. The second generation brought us headless CMS, decoupling the two but still bounding us to specific interfaces. Unbody, however, takes it a step further. It's both headless and bodyless, meaning you're not tethered to any specific interface.

But more than just a CMS, Unbody's true power lies in its use of advanced AI and machine learning for context-aware content enhancement and augmentation.

## How unbody operates

### **1. Initial Set-up via the Unbody Dashboard**

To begin harnessing the capabilities of Unbody, start by navigating to the [Unbody Dashboard](https://app.unbody.io). This intuitive interface will guide you through the process of integrating and managing your content sources.

**Here's a step-by-step walkthrough:**

1. **User Login:** Begin by logging into the dashboard.

2. **Project Creation:** Once logged in, your first action is to create a 'project'. Think of a project as a defined workspace or a domain under which you'll be grouping and managing your content sources.

3. **Source Integration:**
    - Every project can be connected to one or multiple sources. A source, in the context of Unbody, refers to the platform or location where your content is stored. Presently, Unbody supports Google Drive and Google Calendar as primary sources, with additional integrations in the pipeline.
    - To add a source, select the "Create Source" option. This will present a dialog box with three clear steps:
        1. **Select Provider:** Choose where your content is currently hosted (e.g., Google Drive).
        2. **Connect to Provider:** Authorize Unbody to access and manage the content from the selected provider.
        3. **Set Entry Point:** Define where Unbody should begin reading your content. For instance, if you're using Google Drive, the entry point might be a specific folder. If it's Google Calendar, it could be a specific agenda.

4. **Initialization:**
    - After setting up the source, head to the newly created source page and click on "Initialize".
    - This action prompts Unbody to index all the content found at the specified entry point. Once the initialization is complete, the dashboard will display the number of records successfully processed. Your content is now primed and ready for the Unbody magic.

5. **Starting with GraphQL Playground:**
    - A recommended first step for developers post-setup is to explore the GraphQL playground available under your project tabs. This gives you a firsthand experience of how queries are structured and responses are fetched.
    - Remember, interactions with the GraphQL API are orchestrated at the project level, not the source level. This is crucial because a single project might encapsulate multiple sources, offering you a consolidated data handling experience.

With these steps, you've successfully set the stage to supercharge your content management with Unbody. Happy developing!

### **2. Automatic Content Aggregation:**

Once connected, Unbody initiates a real-time sync with the specified content sources. It continuously monitors these platforms for updates, ensuring that the most recent content versions are always available for processing.

### **3. Content Enhancement Pipeline:**

Upon syncing, Unbody activates its content enhancement mechanisms:

- **For Textual Data**:
    - The text gets vectorized and stored in a dedicated vector database.
    - NLP tools kick in for concept extraction and SEO tag generation, enriching the content's metadata.
    - Additionally, a summary is automatically generated, offering users quick insights into the content.
- **For Images**:
    - Images undergo real-time, on-the-fly transformations.
    - Automated captioning is applied, while also vectorizing the image for features like visual similarity-based searches.
- **For Audio & Video**:
    - Unbody processes these formats to auto-generate transcriptions, using reliable models like Whisper from OpenAI. These transcriptions, too, are stored in our vector database, aiding in improved search capabilities.

### **4. Structured Content Presentation:**

Post-enhancement, content is logically segmented into specific blocks: `TextBlock`, `ImageBlock`, `VideoBlock`, and `AudioBlock`. This structure allows for precise content retrievals and adaptability in presenting the content to end-users.

### **5. Developer Interactions:**

Now that your content is primed, you can harness Unbody's powerful APIs:

- **Content API (GraphQL)**: This is your primary interaction point for content-related queries, including semantic search capabilities.
- **Media APIs**: Fetch, adapt, and present image, video, or audio content through specialized endpoints.

## Interacting with Unbody's API Endpoints

### a. Content-API (GraphQL)

Ensure the necessary headers are added to your requests:

```json
{
  "Authorization": "Bearer <TOKEN_GENERATED_IN_UNBODY_DASHBOARD>",
  "X-Project-Id": "YOUR_PROJECT_ID"
}

```

**Examples**

- **Basic Query - Fetching GoogleDoc details**:

  Retrieve the name and text content of a GoogleDoc.

    ```graphql
    query {
       Get {
         GoogleDoc {
           originalName
           text
         }
       }
    }
    
    ```

- **Retrieve Media Blocks**:

  Access URLs and attributes from ImageBlock and AudioFile.

    ```graphql
    query {
       Get {
         ImageBlock{
           url
           alt
           width
         }
         AudioFile{
           url
           size
           ext
         }
       }
    }
    
    ```

- **Semantic Search**:

  Discover text blocks conceptually tied to "fashion".

    ```graphql
    query {
       Get {
         TextBlock(
           nearText:{
             concepts: ["fashion"]
           }
         ){
           text
         }
       }
    }
    
    ```

- **Advanced Q&A**:

  Extract an answer regarding a specific query.

    ```graphql
    query {
       Get {
         GoogleDoc(
           ask:{
             question: "What is Unbody's core feature?"
             properties: "text"
           }
         ){
           _additional{
             answer{
               result
             }
           }
         }
       }
    }
    
    ```

- **Hybrid Search**:

  A combination of query and condition to fine-tune data retrieval.

    ```graphql
    query {
       Get {
         GoogleDoc(
           hybrid:{
             query: "innovation"
             alpha:0.5
           }
           where:{
             operator: ContainsAny
             valueString: "*/2023/*"
             path: "pathString"
           }
         ){
           _additional{
             answer{
               result
             }
           }
         }
       }
    }
    
    ```


### b. Image API (IMGIX)

Unbody's integration with IMGIX allows for extensive image manipulation capabilities. Here's a breakdown of its capabilities with practical examples:

- **Resize an Image**:

  **`https://images.cdn.unbody.io/image.jpg?w=500&h=300`**

- **Crop to Fit Specific Dimensions**:

  **`https://images.cdn.unbody.io/image.jpg?w=500&h=300&fit=crop`**

- **Change Image Format (to WebP, for instance)**:

  **`https://images.cdn.unbody.io/image.jpg?fm=webp`**

- **Apply a Sepia Filter**:

  **`https://images.cdn.unbody.io/image.jpg?sepia=100`**

- **Rotate an Image**:

  **`https://images.cdn.unbody.io/image.jpg?rot=45`**

- **Blur an Image**:

  **`https://images.cdn.unbody.io/image.jpg?blur=20`**

- **Adjust Brightness**:

  **`https://images.cdn.unbody.io/image.jpg?bri=50`**

- **Overlay Text on an Image**:

  **`https://images.cdn.unbody.io/image.jpg?txt=Unbody&txt-size=42&txt-color=FFF`**


### c. Video & Audio API (Mux 🔜)

Unbody leverages Mux for efficient streaming. Once your media is on Mux, you can fetch or manipulate it with ease. For instance:

- **Thumbnail Generation**:

  Generate a thumbnail from a video at a specific timestamp:

  **`https://stream.unbody.io/{PLAYBACK_ID}/thumbnail.jpg?time=30`**

- **GIF Generation**:

  Create a GIF from a segment of the video:

  **`https://stream.unbody.io/{PLAYBACK_ID}/animated.gif?start=10&end=20`**

- **Video Clipping**:

  Retrieve a specific segment of the video:

  **`https://stream.unbody.io/{PLAYBACK_ID}.m3u8?start=30&end=60`**

- **Audio-only Stream**:

  Extract just the audio from the video:

  **`https://stream.unbody.io/{PLAYBACK_ID}/audio.m3u8`**

- **Overlay Text on Video**:

  Overlay subtitles or any text on the video:

  **`https://stream.unbody.io/{PLAYBACK_ID}.m3u8?text="Unbody"&size=42&color=FFF`**

- **Change Video Speed**:

  Play the video at a different speed (e.g., 1.5x):

  **`https://stream.unbody.io/{PLAYBACK_ID}.m3u8?speed=1.5`**