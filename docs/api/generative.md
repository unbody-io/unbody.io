---
title: The only API you need to build AI-Native Apps - Unbody
---
# Generative Search

Generative Search utilizes large language models to transform query results into engaging narratives. This approach processes natural language to generate human-like outputs, suitable for enhancing user engagement with data-driven content.

For instance, if your data includes various historical events, users can simply enter a general prompt like "important events in the 20th century" and receive a narrative summarizing the events in an engaging manner. This method is beneficial for creating narrative content, resonating with human readers, and summarizing complex data into key insights.

## Techniques[](#techniques)

Generative Search can be applied using several techniques, which can be adapted depending on your application's needs:

Unbody SDK

GraphQl

```
unbody.get.<object_name>.generate.fromMany("data point", {...options})
// or
unbody.get.<object_name>.generate.fromOne("data point", {...options})
```

### Example 1 - Single Prompt Generative Search[](#example-1---single-prompt-generative-search)

Unbody SDK

GraphQl

```
unbody.get
    .textBlock
    .generate
    .fromOne("Transform this historical fact into a captivating tweet: {content}")
    .exec()
// The output is a custom tweet based on the historical fact provided
```

### Example 2 - Grouped Task Generative Search[](#example-2---grouped-task-generative-search)

Unbody SDK

GraphQl

```
unbody.get
    .textBlock
    .generate
    .fromMany(
        "Summarize the common traits of these Australian animals.",
        ["text"]
    )
    .exec()
// The output is a summary of common traits of Australian animals based on the text blocks provided
```

### Example 3 - Property Selection[](#example-3---property-selection)

Unbody SDK

GraphQl

```
unbody.get
    .textBlock
    .search
    .about("Innovations")
    .limit(3)
    .select("text")
    .generate
    .fromMany(
        "Highlight the most impactful aspects of these innovations.",
        ["text"]
    )
    .exec()
// The output focuses on the most impactful aspects of innovations, selected from the text provided
```

[Record Similarity](/docs/api/search/record-similarity "Record Similarity")[QnA](/docs/api/q-n-a "QnA")