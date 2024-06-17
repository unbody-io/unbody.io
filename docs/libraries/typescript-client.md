---
title: TypeScript Client
__path__: >-
  [{"title":"Docs","route":"/docs"},{"title":"Libraries","route":"/docs/libraries"},{"title":"TypeScript
  Client","route":"/docs/libraries/typescript-client"}]
---

This is the official Unbody client for typescript/javascript

## Installation

Install unbody ts-client with npm

```
  npm i @unbody-io/ts-client
```

## Usage/Examples

### Instantiate

```
import Unbody from '@unbody-io/ts-client'
 
const unbody = new Unbody({
  apiKey: 'your api key',
  projectId: 'your project key',
})
```

_note: using this on client-side of your application can lead to crawling your data!_

### Transformers

You can use this option to parse JSON strings in the response the way you want

```
import Unbody from '@unbody-io/ts-client'
 
const unbody = new Unbody({
  apiKey: 'your api key',
  projectId: 'your project key',
  GoogleDoc: {
    mentions(data: string): { [p: string]: any } {
      return {} // Any format you want
    },
  },
})
```

### Get methods

You can use this method to get data from any source that you have in Unbody panel

_note: examples are for `googleDoc` but you can replace that with other sources like `imageBlock`, `audioFile` etc..._

#### Get without any query

```
unbody.get.googleDoc
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Where - simple query using object param

```
unbody.get.googleDoc
  .where({ title: 'My google doc title' })
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Where - advance query using callback param

```
unbody.get.googleDoc
  .where(({ Like, GreaterThan }) => {
    return {
      title: Like('Document'),
      size: GreaterThan(20),
    }
  })
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Ask - simple usage

```
unbody.get.googleDoc
  .ask('What is the price of bitcoin?')
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Ask - selecting properties to look for your question response in

```
unbody.get.googleDoc
  .ask('What is the price of bitcoin?', ['summary'])
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

or you can just pass arguments as an object

```
unbody.get.googleDoc
  .ask({ question: 'What is the price of bitcoin?', properties: ['summary'] })
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Semantic search - simple usage

```
unbody.get.googleDoc
    .search
    .about('privacy and security')
    .exec()
    .then((response) => { console.log(response)})
    .catch((error) => {
        console.error(error)
    })
```

#### Semqantic search - specify the distance from the text

```
unbody.get.googleDoc
    .search
    .about('privacy and security', { distance: 1.5 })
    .exec()
    .then((response) => { console.log(response)})
    .catch((error) => {
        console.error(error)
    })
```

or you can just pass arguments as an object

```
unbody.get.googleDoc
  .search.about({ distance: 1.5, concepts: ['bitcoin', 'price'], ...etc })
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Near vector - simple usage

```
unbody.get.googleDoc
  .nearVector(1)
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Near vector - specify the distance from the text

```
unbody.get.googleDoc
  .nearVector(1, 0.5)
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

or you can just pass arguments as an object

```
unbody.get.googleDoc
  .nearText({ distance: 1.5, vector: [1, 20], ...etc })
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Group - simple usage

```
unbody.get.googleDoc
  .group(3.5)
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Group - specify the type

```
unbody.get.googleDoc
  .group(3.5, 'closest')
  .limit(10)
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

or you can just pass arguments as an object

```
unbody.get.googleDoc
  .group({ force: 3.5, type: 'closest' })
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Group By - simple usage

```
unbody.get.googleDoc
  .groupBy('title')
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Group By - specify the groups

```
unbody.get.googleDoc
  .groupBy('title', 3)
  .limit(10)
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

or you can just pass arguments as an object

```
unbody.get.googleDoc
  .group({ path: 'title', groups: 3, ...etc })
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Sort, Limit and Offset - using for pagination

```
unbody.get.googleDoc
  .limit(10)
  .offset(1)
  .sort('title', 'asc')
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Select - you can specify which fields to retrieve (by default all fields will be retrieved)

```
unbody.get.googleDoc
  .select('title', 'blocks.ImageBlock.alt')
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Additional - you can specify which additional fields to retrieve (by default all fields will be retrieved)

```
unbody.get.googleDoc
  .select('title', 'blocks.ImageBlock.alt')
  .exec()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```

### Aggregate methods

All the methods in `get` applies to this, except for `additional`

### Other methods in Get and Aggregate

You can use `getGraphQuery` and `getJsonQuery` for debugging purposes

[Overview](/docs/libraries/overview "Overview")[Overview](/docs/image-api/overview "Overview")